/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « En route vers la Terminale » (1re → Tle).  */
/*  Angle fort (demande fondateur) : COMPRENDRE QUE L'IA VA CHANGER LE MONDE,  */
/*  et que SI ON APPREND LES MATHS, C'EST POUR POSER SES IDÉES SUR LE PAPIER   */
/*  ET CHANGER LE MONDE. Fil rouge : l'IA, c'est des maths (probabilités,      */
/*  exponentielle, dérivées/optimisation = la « descente de gradient » qui     */
/*  fait apprendre l'IA). La colonne « français » bascule sur la PHILOSOPHIE   */
/*  (matière de Tle), parfaite pour penser l'IA, l'éthique, la responsabilité. */
/*  Niveau 1re : révision + avant-goût de la Tle spé maths. Gestes = l'IA en   */
/*  profondeur (fonctionnement, biais, éthique, créer avec, citoyenneté).      */
/*  Défis ★★★★★ = exigeants / ouverts (HPI, niveau Tle).                       */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 étapes vers l'IA et le monde de demain (une par semaine). */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🧮", lieu: "Les maths, ton langage pour créer", intro: "Apprendre les maths, c'est apprendre à poser ses idées et à agir." },
  { semaine: 2, etape: 2, emoji: "🤖", lieu: "L'IA, comment ça marche", intro: "Sous le capot de l'IA… il y a des mathématiques !" },
  { semaine: 3, etape: 3, emoji: "📈", lieu: "L'exponentielle et la croissance", intro: "Comprendre ce qui s'emballe : épidémies, données, idées." },
  { semaine: 4, etape: 4, emoji: "🎯", lieu: "Optimiser : comment l'IA apprend", intro: "La dérivée, la pente, l'erreur à minimiser : le secret de l'IA." },
  { semaine: 5, etape: 5, emoji: "🌍", lieu: "L'IA face aux grands défis", intro: "Santé, climat, justice : l'IA pour le bien, avec éthique." },
  { semaine: 6, etape: 6, emoji: "🚀", lieu: "Ton avenir : poser tes idées, changer le monde", intro: "Dernière étape : ton projet, puis cap sur la Terminale !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · Les maths, ton langage pour créer ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Penseur libre",
    maths: {
      calcul: [
        { q: "limite de 1/n quand n → +∞ =", r: "0" },
        { q: "limite de 2n quand n → +∞ =", r: "+∞" },
        { q: "2^10 =", r: "1024" },
        { q: "(−1)^n est-il borné ?", r: "oui" },
        { q: "5 × 5 =", r: "25" },
      ],
      probleme: {
        enonce: "Une suite est définie par u(n) = 1/n. Vers quelle valeur tend-elle quand n devient très grand ?",
        correction: "Vers 0 : plus n est grand, plus 1/n est proche de 0. On dit que la limite est 0.",
      },
      illu: { emoji: "🧠", label: "penser" },
    },
    francais: {
      regleTitre: "Qu'est-ce que la philosophie ?",
      regle:
        "La philosophie, c'est penser par soi-même, questionner ce qui semble évident et chercher la vérité.",
      consigne: "Question philosophique ou non ?",
      items: ["Quelle heure est-il ?", "Qu'est-ce qu'être libre ?", "Combien font 2 + 2 ?"],
      correction: "non — oui (philosophique) — non.",
    },
    mot: {
      mot: "Limite",
      nature: "nom, maths",
      definition: "La limite est la valeur dont une suite ou une fonction se rapproche.",
      exemple: "1/n tend vers 0 quand n → +∞.",
    },
    geste: {
      titre: "Comment fonctionne une IA",
      texte: "Une IA apprend à partir d'énormes quantités de données : elle repère des régularités, puis fait des prédictions.",
    },
    defi: {
      enonce: "Vers quoi tend 3 + 1/n quand n → +∞ ?",
      correction: "Vers 3.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Explorateur des limites",
    maths: {
      calcul: [
        { q: "lim 1/x quand x → +∞ =", r: "0" },
        { q: "lim x² quand x → +∞ =", r: "+∞" },
        { q: "lim 1/x quand x → 0+ =", r: "+∞" },
        { q: "f(x) = 2x + 1 ; f(3) =", r: "7" },
        { q: "5 × 5 =", r: "25" },
      ],
      probleme: {
        enonce: "Soit f(x) = 1/x. Que devient f(x) quand x devient très grand ? Et quand x s'approche de 0 par valeurs positives ?",
        correction: "f(x) → 0 quand x → +∞, et f(x) → +∞ quand x → 0+. La droite y = 0 est une asymptote.",
      },
      illu: { emoji: "➗", label: "limites" },
    },
    francais: {
      regleTitre: "La dissertation de philosophie",
      regle:
        "On problématise une question, puis on argumente par étapes (thèse, objection, dépassement), avec exemples et références.",
      consigne: "Quel élément d'un raisonnement ?",
      items: ["« La technique nous libère-t-elle ? »", "« Mais elle peut aussi nous asservir. »"],
      correction: "thèse (1re partie) — objection / antithèse.",
    },
    mot: {
      mot: "Asymptote",
      nature: "nom, maths",
      definition: "Une asymptote est une droite dont la courbe se rapproche de plus en plus, sans la toucher.",
      exemple: "Pour f(x) = 1/x, l'axe des x (y = 0) est une asymptote.",
    },
    geste: {
      titre: "Les réseaux de neurones",
      texte: "Une IA moderne imite (très grossièrement) le cerveau : des « neurones » connectés qui s'ajustent à force d'exemples.",
    },
    defi: {
      enonce: "Limite de 5 + 1/x quand x → +∞ ?",
      correction: "5.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Maître des dérivées",
    maths: {
      calcul: [
        { q: "dérivée de x² =", r: "2x" },
        { q: "dérivée de x³ =", r: "3x²" },
        { q: "dérivée de 5x =", r: "5" },
        { q: "dérivée de x² en 4 =", r: "8" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "Soit f(x) = x³. Quelle est sa fonction dérivée f'(x), et combien vaut f'(2) ?",
        correction: "f'(x) = 3x² ; f'(2) = 3 × 4 = 12.",
      },
      illu: { emoji: "📉", label: "dérivée" },
    },
    francais: {
      regleTitre: "L'explication de texte",
      regle:
        "On dégage la thèse de l'auteur, on suit son raisonnement et on l'analyse, sans le déformer.",
      consigne: "Vrai ou faux : on commence par donner son avis ?",
      items: ["On commence par donner son opinion ?"],
      correction: "Faux : on explique d'abord, fidèlement, ce que dit l'auteur.",
    },
    mot: {
      mot: "Dérivée",
      nature: "nom, maths",
      definition: "La dérivée mesure la vitesse de variation d'une fonction (la pente de la tangente).",
      exemple: "La dérivée de x³ est 3x².",
    },
    geste: {
      titre: "L'apprentissage automatique (machine learning)",
      texte: "Au lieu d'être programmée règle par règle, l'IA « apprend » seule les règles à partir d'exemples.",
    },
    defi: {
      enonce: "Dérivée de x² + 3x ?",
      correction: "2x + 3.",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Briseur d'équations",
    maths: {
      calcul: [
        { q: "2x + 3 = 11 → x =", r: "4" },
        { q: "x² − 9 = 0 → x =", r: "3 ou −3" },
        { q: "3x < 12 → x", r: "< 4" },
        { q: "x² = 16 → x =", r: "4 ou −4" },
        { q: "8 × 9 =", r: "72" },
      ],
      probleme: {
        enonce: "Résous l'inéquation 2x − 1 > 5.",
        correction: "2x > 6, donc x > 3.",
      },
      illu: { emoji: "🟰", label: "équation" },
    },
    francais: {
      regleTitre: "Notion : la conscience",
      regle:
        "La conscience, c'est savoir que l'on existe et réfléchir sur soi. « Je pense, donc je suis » (Descartes).",
      consigne: "Vrai ou faux : une IA est-elle consciente d'elle-même ?",
      items: ["Une IA est-elle consciente ?"],
      correction: "Non (à ce jour) : elle calcule, mais n'a pas conscience d'elle-même.",
    },
    mot: {
      mot: "Inéquation",
      nature: "nom, maths",
      definition: "Une inéquation compare deux expressions (<, >, ≤, ≥) ; sa solution est un ensemble de nombres.",
      exemple: "2x − 1 > 5 a pour solution x > 3.",
    },
    geste: {
      titre: "Les données d'entraînement",
      texte: "La qualité d'une IA dépend de ses données : nombreuses, variées et fiables, sinon elle apprend de travers.",
    },
    defi: {
      enonce: "Résous x² − 4 = 0.",
      correction: "x = 2 ou x = −2.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Modélisateur du réel",
    maths: {
      calcul: [
        { q: "100 × 2³ =", r: "800" },
        { q: "2^5 =", r: "32" },
        { q: "50 × 4 =", r: "200" },
        { q: "3 × 7 =", r: "21" },
        { q: "100 − 37 =", r: "63" },
      ],
      probleme: {
        enonce: "Une population de bactéries double chaque heure. À partir de 100, combien après 3 heures ? Modèle linéaire ou exponentiel ?",
        correction: "100 × 2³ = 800 ; c'est un modèle exponentiel (multiplication répétée, pas addition).",
      },
      illu: { emoji: "📈", label: "modèle" },
    },
    francais: {
      regleTitre: "Notion : la technique",
      regle:
        "La technique transforme le monde (outils, machines, IA). Elle peut libérer… ou asservir : tout dépend de l'usage.",
      consigne: "Bienfait ou risque de la technique ?",
      items: ["soigner grâce à l'IA", "surveiller les gens"],
      correction: "bienfait — risque.",
    },
    mot: {
      mot: "Modèle mathématique",
      nature: "expression, maths",
      definition: "Un modèle décrit une situation réelle par des fonctions ou des équations, pour la comprendre et la prévoir.",
      exemple: "La croissance bactérienne : modèle exponentiel.",
    },
    geste: {
      titre: "Les biais des IA",
      texte: "Une IA reflète ses données : si elles sont injustes ou incomplètes, ses décisions le seront aussi. On doit les corriger.",
    },
    defi: {
      enonce: "Un capital double chaque année à partir de 50 €. Combien après 2 ans ?",
      correction: "200 € (50 × 2² = 50 × 4).",
    },
  },

  /* ===================== SEMAINE 2 · L'IA, comment ça marche ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Apprenti de l'IA",
    maths: {
      calcul: [
        { q: "P(pile) =", r: "1/2" },
        { q: "P(2 piles) =", r: "1/4" },
        { q: "1/2 × 1/3 =", r: "1/6" },
        { q: "P(6 sur un dé) =", r: "1/6" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Une urne contient 3 boules rouges et 2 vertes. On tire 2 boules sans remise. Probabilité que la 2e soit rouge sachant que la 1re l'était ?",
        correction: "Après une rouge tirée, il reste 2 rouges sur 4 boules : 2/4 = 1/2.",
      },
      illu: { emoji: "🤖", label: "intelligence artificielle" },
    },
    francais: {
      regleTitre: "Notion : le travail",
      regle:
        "Le travail transforme la nature et nous-mêmes ; l'automatisation (IA, robots) interroge sa place.",
      consigne: "Vrai ou faux : si l'IA fait tout, le travail humain perd-il tout sens ?",
      items: ["Sans travail, l'humain perd-il un sens ?"],
      correction: "Question ouverte : le travail donne aussi identité et dignité — d'où le débat sur l'IA.",
    },
    mot: {
      mot: "Probabilité conditionnelle",
      nature: "expression, maths",
      definition: "La probabilité d'un événement sachant qu'un autre s'est produit. Au cœur des décisions de l'IA.",
      exemple: "P(2e rouge sachant 1re rouge) = 1/2.",
    },
    geste: {
      titre: "L'IA générative (texte, image, code)",
      texte: "Certaines IA créent du texte, des images ou du code : de puissants outils, mais qui peuvent se tromper ou copier.",
    },
    defi: {
      enonce: "Probabilité de tirer une rouge dans une urne de 4 rouges et 6 vertes ?",
      correction: "4/10 = 2/5.",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Stratège du hasard",
    maths: {
      calcul: [
        { q: "10 × 0,2 + 0 × 0,8 =", r: "2" },
        { q: "5 × 0,4 =", r: "2" },
        { q: "espérance E = somme des (valeur × proba)", r: "oui" },
        { q: "1 × 0,5 + 0 × 0,5 =", r: "0,5" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "À un jeu, on gagne 10 € avec une probabilité de 0,2, sinon rien. Quelle est l'espérance de gain ?",
        correction: "E = 10 × 0,2 + 0 × 0,8 = 2 €. En moyenne, on gagne 2 € par partie.",
      },
      illu: { emoji: "🌳", label: "arbre de probabilité" },
    },
    francais: {
      regleTitre: "Notion : la liberté",
      regle: "Être libre, est-ce faire ce qu'on veut, ou se donner ses propres règles (l'autonomie) ?",
      consigne: "Liberté véritable ou simple envie ?",
      items: ["suivre toutes ses pulsions", "choisir en connaissance de cause"],
      correction: "simple envie — vraie liberté (autonomie).",
    },
    mot: {
      mot: "Variable aléatoire",
      nature: "expression, maths",
      definition: "Une variable aléatoire associe un nombre à chaque résultat d'une expérience ; son espérance est sa « valeur moyenne ».",
      exemple: "Gain de 10 € avec p = 0,2 : espérance 2 €.",
    },
    geste: {
      titre: "Le prompt engineering",
      texte: "Bien « demander » à une IA (contexte, but, format précis) change radicalement la qualité de sa réponse.",
    },
    defi: {
      enonce: "Espérance : gagner 5 € avec une probabilité 0,4, sinon 0 ?",
      correction: "2 € (5 × 0,4).",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Maître de la binomiale",
    maths: {
      calcul: [
        { q: "2³ issues de 3 lancers =", r: "8" },
        { q: "exactement 2 piles sur 3 : nb de cas =", r: "3" },
        { q: "0,5² =", r: "0,25" },
        { q: "espérance binomiale n × p, n=10, p=0,5 =", r: "5" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "On lance 3 fois une pièce équilibrée. Quelle est la probabilité d'obtenir exactement 2 piles ?",
        correction: "3 cas favorables (PPF, PFP, FPP) sur 8 issues : 3/8.",
      },
      illu: { emoji: "🎲", label: "loi binomiale" },
    },
    francais: {
      regleTitre: "Notion : la vérité",
      regle:
        "Une vérité correspond aux faits. On la distingue de l'opinion et de la croyance.",
      consigne: "Vérité ou opinion ?",
      items: ["L'eau bout à 100 °C au niveau de la mer.", "Ce film est le meilleur de tous."],
      correction: "vérité (vérifiable) — opinion.",
    },
    mot: {
      mot: "Loi binomiale",
      nature: "expression, maths",
      definition: "Elle décrit le nombre de succès lors de n essais identiques et indépendants (pile/face, oui/non…).",
      exemple: "Sur 10 lancers, l'espérance du nombre de piles est 10 × 0,5 = 5.",
    },
    geste: {
      titre: "Vérifier ce que produit une IA",
      texte: "Une IA peut « halluciner » : inventer des faits faux avec aplomb. On recoupe toujours avec une source fiable.",
    },
    defi: {
      enonce: "Espérance du nombre de piles sur 10 lancers d'une pièce ?",
      correction: "5 (10 × 0,5).",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Statisticien éclairé",
    maths: {
      calcul: [
        { q: "(10 + 12 + 14) ÷ 3 =", r: "12" },
        { q: "(10 + 14) ÷ 2 =", r: "12" },
        { q: "étendue de 8 et 20 =", r: "12" },
        { q: "racine de 4 =", r: "2" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Notes : 10, 12, 14. Quelle est la moyenne ? Que mesure l'écart-type ?",
        correction: "Moyenne = 12. L'écart-type mesure la dispersion autour de la moyenne (ici, les notes s'écartent peu).",
      },
      illu: { emoji: "📊", label: "statistiques" },
    },
    francais: {
      regleTitre: "Notion : la justice",
      regle: "La justice cherche à donner à chacun son dû, dans l'égalité et l'équité.",
      consigne: "Égalité ou équité ?",
      items: ["la même chose pour tous", "adapter selon les besoins de chacun"],
      correction: "égalité — équité.",
    },
    mot: {
      mot: "Écart-type",
      nature: "nom, maths",
      definition: "L'écart-type mesure à quel point les valeurs s'éloignent de la moyenne (la dispersion).",
      exemple: "Des notes proches de la moyenne : petit écart-type.",
    },
    geste: {
      titre: "L'IA et le plagiat",
      texte: "Utiliser une IA pour comprendre, oui ; recopier sa production comme la sienne, c'est du plagiat. On crée AVEC, on ne copie pas.",
    },
    defi: {
      enonce: "Moyenne de 8, 12, 16, 20 ?",
      correction: "14.",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Dompteur de données",
    maths: {
      calcul: [
        { q: "10^3 × 10^3 =", r: "10^6" },
        { q: "1 000 000 =", r: "10^6" },
        { q: "1000 × 1/6 ≈", r: "167" },
        { q: "10^6 ÷ 10^3 =", r: "10^3" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Une IA est entraînée sur 1 000 000 d'images. Écris ce nombre en notation scientifique. Pourquoi tant de données ?",
        correction: "10^6. Plus les données sont nombreuses, variées et de qualité, mieux l'IA généralise à de nouveaux cas.",
      },
      illu: { emoji: "💾", label: "données" },
    },
    francais: {
      regleTitre: "Notion : le bonheur",
      regle:
        "Le bonheur est un état durable de satisfaction. Plaisir immédiat et bonheur durable ne sont pas identiques.",
      consigne: "Plaisir immédiat ou bonheur durable ?",
      items: ["manger un bon gâteau", "vivre une vie qui a du sens"],
      correction: "plaisir — bonheur durable.",
    },
    mot: {
      mot: "Donnée",
      nature: "nom, IA",
      definition: "Une donnée est une information (image, texte, chiffre) servant à entraîner ou nourrir une IA.",
      exemple: "Une IA d'images apprend sur des millions de photos.",
    },
    geste: {
      titre: "L'IA et le droit d'auteur",
      texte: "Les IA s'entraînent sur des œuvres existantes : un grand débat sur les droits des créateurs est en cours.",
    },
    defi: {
      enonce: "Écris 5 000 000 en notation scientifique.",
      correction: "5 × 10^6.",
    },
  },

  /* ===================== SEMAINE 3 · L'exponentielle et la croissance ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Ami de l'exponentielle",
    maths: {
      calcul: [
        { q: "e^0 =", r: "1" },
        { q: "e^1 ≈", r: "2,718" },
        { q: "(e^x)' =", r: "e^x" },
        { q: "e^x est-elle croissante ?", r: "oui" },
        { q: "2^10 =", r: "1024" },
      ],
      probleme: {
        enonce: "La fonction exponentielle e^x. Que vaut e^0 ? Et que vaut sa dérivée (e^x)' ?",
        correction: "e^0 = 1 ; (e^x)' = e^x. L'exponentielle est égale à sa propre dérivée : une fonction unique en son genre.",
      },
      illu: { emoji: "📈", label: "exponentielle" },
    },
    francais: {
      regleTitre: "Argumenter en philosophie",
      regle: "On défend une thèse, on envisage une objection, puis on dépasse pour nuancer.",
      consigne: "Thèse, objection ou dépassement ?",
      items: ["« L'IA est un progrès. »", "« Mais elle supprime des emplois. »", "« Tout dépend de la façon dont on l'encadre. »"],
      correction: "thèse — objection — dépassement.",
    },
    mot: {
      mot: "Fonction exponentielle",
      nature: "expression, maths",
      definition: "La fonction e^x, égale à sa propre dérivée ; elle décrit les croissances qui s'emballent.",
      exemple: "e^0 = 1 et (e^x)' = e^x.",
    },
    geste: {
      titre: "Les deepfakes (détecter le faux)",
      texte: "Des IA fabriquent des vidéos truquées très réalistes. On apprend à douter et à vérifier la source.",
    },
    defi: {
      enonce: "Que vaut e^0 ?",
      correction: "1.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Lecteur de croissances",
    maths: {
      calcul: [
        { q: "2^7 =", r: "128" },
        { q: "2^10 =", r: "1024" },
        { q: "2^20 ≈", r: "≈ 10^6" },
        { q: "100 × 2³ =", r: "800" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "Une rumeur se propage : chaque personne en informe 2 nouvelles par jour. À partir de 1 personne, combien après 10 jours (2^10) ?",
        correction: "1024. La croissance exponentielle est lente au début, puis explose : c'est foudroyant.",
      },
      illu: { emoji: "🦠", label: "propagation" },
    },
    francais: {
      regleTitre: "Opinion, croyance, savoir",
      regle:
        "L'opinion n'est pas prouvée ; la croyance repose sur la confiance ; le savoir est démontré ou vérifié.",
      consigne: "Opinion/croyance ou savoir ?",
      items: ["« Je crois qu'il fera beau. »", "« La Terre tourne autour du Soleil. »"],
      correction: "opinion/croyance — savoir.",
    },
    mot: {
      mot: "Croissance exponentielle",
      nature: "expression, maths",
      definition: "Une croissance où la quantité est multipliée (et non augmentée) à chaque étape : très lente, puis explosive.",
      exemple: "Doubler chaque jour : 2^10 = 1024 en 10 jours.",
    },
    geste: {
      titre: "L'IA et l'emploi",
      texte: "L'IA va transformer beaucoup de métiers : certains disparaissent, d'autres naissent. Apprendre à s'adapter est essentiel.",
    },
    defi: {
      enonce: "Combien font 2^10 ?",
      correction: "1024.",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Maître du logarithme",
    maths: {
      calcul: [
        { q: "ln(1) =", r: "0" },
        { q: "ln(e) =", r: "1" },
        { q: "log(1000) en base 10 =", r: "3" },
        { q: "log(100) en base 10 =", r: "2" },
        { q: "10^3 =", r: "1000" },
      ],
      probleme: {
        enonce: "Le logarithme népérien ln est la fonction inverse de l'exponentielle. Que valent ln(1) et ln(e) ?",
        correction: "ln(1) = 0 et ln(e) = 1. Le logarithme « défait » ce que fait l'exponentielle.",
      },
      illu: { emoji: "🔢", label: "logarithme" },
    },
    francais: {
      regleTitre: "Le raisonnement logique",
      regle:
        "La déduction va du général au particulier ; l'induction, des exemples vers une règle générale.",
      consigne: "Déduction ou induction ?",
      items: ["Tous les hommes sont mortels, donc Socrate l'est.", "Ces corbeaux sont noirs, donc tous le sont ?"],
      correction: "déduction (sûre) — induction (moins sûre).",
    },
    mot: {
      mot: "Logarithme",
      nature: "nom, maths",
      definition: "La fonction inverse de l'exponentielle ; elle transforme les très grands nombres en petites échelles.",
      exemple: "ln(1) = 0 ; log(1000) = 3.",
    },
    geste: {
      titre: "L'IA pour la santé",
      texte: "Des IA aident à détecter des maladies sur des images médicales, parfois plus tôt que l'œil humain — toujours sous contrôle d'un médecin.",
    },
    defi: {
      enonce: "Que vaut ln(1) ?",
      correction: "0.",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Voyageur des échelles",
    maths: {
      calcul: [
        { q: "log(100) =", r: "2" },
        { q: "log(1000) =", r: "3" },
        { q: "10 × 10 =", r: "100" },
        { q: "+2 magnitudes = énergie ×", r: "100" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "L'échelle de Richter (séismes) est logarithmique : +1 de magnitude = énergie ×10. Entre magnitude 4 et 6, combien de fois plus d'énergie ?",
        correction: "+2 magnitudes = 10 × 10 = 100 fois plus d'énergie.",
      },
      illu: { emoji: "📊", label: "échelle log" },
    },
    francais: {
      regleTitre: "Les raisonnements trompeurs (sophismes)",
      regle:
        "Un sophisme a l'air logique mais est faux : généralisation hâtive, attaque de la personne, fausse cause.",
      consigne: "Quelle erreur ?",
      items: ["« Il a tort, car il est jeune. »"],
      correction: "Attaque de la personne (et non de l'argument) : c'est un sophisme.",
    },
    mot: {
      mot: "Échelle logarithmique",
      nature: "expression, maths",
      definition: "Une échelle où chaque cran multiplie par 10 : elle range commodément des valeurs très différentes.",
      exemple: "Richter, décibels, pH : des échelles logarithmiques.",
    },
    geste: {
      titre: "L'IA pour le climat",
      texte: "Des IA analysent des données satellites pour prévoir le climat, repérer la déforestation, optimiser les énergies.",
    },
    defi: {
      enonce: "Entre magnitude 5 et 7, combien de fois plus d'énergie ?",
      correction: "100 fois.",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Tisseur de suites",
    maths: {
      calcul: [
        { q: "2, 6, 18 → raison =", r: "3" },
        { q: "3^4 =", r: "81" },
        { q: "1 + 1/2 + 1/4 + … =", r: "2" },
        { q: "raison de 5, 10, 20 =", r: "2" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Une suite géométrique de raison 1/2 : 1, 1/2, 1/4, 1/8… Vers quelle valeur tend la somme 1 + 1/2 + 1/4 + … ?",
        correction: "Vers 2 : la somme d'une infinité de termes peut être finie. Elle converge vers 2.",
      },
      illu: { emoji: "🔁", label: "suite géométrique" },
    },
    francais: {
      regleTitre: "Notion : le langage",
      regle: "Le langage permet de penser, de communiquer… mais aussi parfois de manipuler.",
      consigne: "Vrai ou faux : une IA qui « parle » comprend-elle ce qu'elle dit ?",
      items: ["Une IA comprend-elle vraiment le langage ?"],
      correction: "Non : elle manipule des mots de façon statistique, sans comprendre comme un humain.",
    },
    mot: {
      mot: "Suite géométrique",
      nature: "expression, maths",
      definition: "Une suite où l'on multiplie par une même raison ; si |raison| < 1, sa somme converge.",
      exemple: "1 + 1/2 + 1/4 + … = 2.",
    },
    geste: {
      titre: "L'éthique de l'IA",
      texte: "Transparence, équité, respect de la vie privée, contrôle humain : des principes pour une IA au service du bien.",
    },
    defi: {
      enonce: "Suite 3, 6, 12, 24… Quelle est la raison ?",
      correction: "2.",
    },
  },

  /* ===================== SEMAINE 4 · Optimiser : comment l'IA apprend ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Explorateur des pentes",
    maths: {
      calcul: [
        { q: "f' > 0 → f est", r: "croissante" },
        { q: "f' < 0 → f est", r: "décroissante" },
        { q: "f' = 0 →", r: "extremum possible" },
        { q: "dérivée de x² − 4x en 2 =", r: "0" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Soit f(x) = x² − 4x, de dérivée f'(x) = 2x − 4. Pour quelle valeur de x a-t-on f'(x) = 0 ? Que se passe-t-il alors ?",
        correction: "x = 2 ; la fonction atteint là son minimum (la dérivée s'annule en changeant de signe).",
      },
      illu: { emoji: "📉", label: "variations" },
    },
    francais: {
      regleTitre: "Notion : la nature et le vivant",
      regle: "La nature désigne ce qui existe sans l'homme ; la protéger est un enjeu éthique majeur.",
      consigne: "Naturel ou artificiel ?",
      items: ["une forêt", "un robot"],
      correction: "naturel — artificiel.",
    },
    mot: {
      mot: "Sens de variation",
      nature: "expression, maths",
      definition: "Le signe de la dérivée donne le sens de variation : positive → croissante, négative → décroissante.",
      exemple: "x² − 4x décroît puis croît, avec un minimum en x = 2.",
    },
    geste: {
      titre: "La protection des données (RGPD)",
      texte: "Tes données personnelles sont protégées par la loi : tu peux savoir ce qu'on détient sur toi, le corriger, le supprimer.",
    },
    defi: {
      enonce: "f'(x) = 2x − 6. Pour quelle valeur de x a-t-on f'(x) = 0 ?",
      correction: "x = 3.",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Architecte des courbes",
    maths: {
      calcul: [
        { q: "f'' > 0 → f est", r: "convexe" },
        { q: "f'' < 0 → f est", r: "concave" },
        { q: "x² est convexe ?", r: "oui" },
        { q: "(x²)'' =", r: "2" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Une courbe est convexe si elle « tourne vers le haut ». La parabole y = x² est-elle convexe ? Justifie.",
        correction: "Oui : sa dérivée seconde f''(x) = 2 est positive partout, donc la courbe est convexe.",
      },
      illu: { emoji: "〽️", label: "convexité" },
    },
    francais: {
      regleTitre: "Notion : l'art",
      regle: "L'art crée des œuvres qui touchent et font penser. Une IA qui « crée » est-elle artiste ?",
      consigne: "Question ouverte : une image générée par IA est-elle de l'art ?",
      items: ["Une œuvre faite par une IA est-elle de l'art ?"],
      correction: "Débat : il manque souvent l'intention et l'émotion d'un créateur humain. À discuter !",
    },
    mot: {
      mot: "Convexité",
      nature: "nom, maths",
      definition: "Une fonction est convexe si sa courbe tourne vers le haut (dérivée seconde positive).",
      exemple: "x² est convexe ; −x² est concave.",
    },
    geste: {
      titre: "La transparence des algorithmes",
      texte: "Savoir comment une décision automatique est prise (un crédit, une note) est un droit : on exige des algorithmes explicables.",
    },
    defi: {
      enonce: "La fonction −x² est-elle convexe ou concave ?",
      correction: "Concave (elle tourne vers le bas).",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Optimiseur",
    maths: {
      calcul: [
        { q: "x(10 − x) maximal pour x =", r: "5" },
        { q: "5 × 5 =", r: "25" },
        { q: "x(12 − x) maximal pour x =", r: "6" },
        { q: "6 × 6 =", r: "36" },
        { q: "dérivée nulle →", r: "extremum" },
      ],
      probleme: {
        enonce: "Deux nombres ont pour somme 10. Quel est leur produit maximal ? (On trouve le maximum là où la dérivée s'annule.)",
        correction: "25, pour 5 et 5. Le produit x(10 − x) est maximal au milieu.",
      },
      illu: { emoji: "🎯", label: "optimiser" },
    },
    francais: {
      regleTitre: "Notion : la science",
      regle: "La science cherche des lois vérifiables par l'expérience. Elle progresse en doutant.",
      consigne: "Scientifique ou non ?",
      items: ["une théorie qu'on peut tester", "une croyance qu'on ne peut pas vérifier"],
      correction: "scientifique — non scientifique.",
    },
    mot: {
      mot: "Optimisation",
      nature: "nom, maths",
      definition: "Trouver le meilleur résultat (maximum ou minimum), souvent là où la dérivée s'annule.",
      exemple: "Produit maximal de deux nombres de somme 10 : 25.",
    },
    geste: {
      titre: "L'IA et la démocratie",
      texte: "Des IA peuvent diffuser de fausses informations à grande échelle. Protéger le débat public est un enjeu citoyen.",
    },
    defi: {
      enonce: "Deux nombres de somme 12 : quel produit maximal ?",
      correction: "36 (6 et 6).",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Pilote du gradient",
    maths: {
      calcul: [
        { q: "pente > 0 → pour baisser, aller", r: "à gauche" },
        { q: "pente < 0 → pour baisser, aller", r: "à droite" },
        { q: "au minimum, la pente vaut", r: "0" },
        { q: "5 × 4 =", r: "20" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Pour apprendre, une IA minimise son erreur en « descendant la pente » de la courbe d'erreur (la descente de gradient). Si la pente (dérivée) est positive, faut-il augmenter ou diminuer x pour réduire l'erreur ?",
        correction: "Diminuer x : on se déplace dans le sens opposé à la pente. C'est exactement ainsi qu'une IA apprend, pas à pas, grâce aux dérivées !",
      },
      illu: { emoji: "⬇️", label: "descente de gradient" },
    },
    francais: {
      regleTitre: "Notion : l'État et le devoir",
      regle:
        "L'État organise la vie commune ; le devoir, c'est ce qu'on doit faire moralement, par-delà son intérêt.",
      consigne: "Intérêt personnel ou devoir moral ?",
      items: ["aider quelqu'un pour être récompensé", "aider parce que c'est juste"],
      correction: "intérêt — devoir.",
    },
    mot: {
      mot: "Descente de gradient",
      nature: "expression, IA",
      definition: "L'algorithme qui fait apprendre l'IA : suivre la pente (la dérivée) pour réduire l'erreur, pas à pas.",
      exemple: "Pente positive → on diminue x pour baisser l'erreur.",
    },
    geste: {
      titre: "Garder l'humain dans la boucle",
      texte: "Sur les décisions importantes (justice, santé), un humain doit toujours pouvoir comprendre et corriger l'IA.",
    },
    defi: {
      enonce: "Au sommet d'une colline (pente nulle), peut-on encore « descendre » localement ?",
      correction: "Non : pente nulle = extremum local, on ne descend plus dans son voisinage immédiat.",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Chasseur d'erreurs",
    maths: {
      calcul: [
        { q: "(3 − 5)² =", r: "4" },
        { q: "(5 − 5)² =", r: "0" },
        { q: "(7 − 4)² =", r: "9" },
        { q: "4² =", r: "16" },
        { q: "minimiser la somme des carrés", r: "oui" },
      ],
      probleme: {
        enonce: "Pour « coller » au mieux aux données, une IA minimise la somme des carrés des erreurs. Si elle prévoit 3 et la vraie valeur est 5, quelle est l'erreur au carré ?",
        correction: "(3 − 5)² = (−2)² = 4. On élève au carré pour que toutes les erreurs comptent positivement.",
      },
      illu: { emoji: "🎯", label: "minimiser l'erreur" },
    },
    francais: {
      regleTitre: "L'éthique",
      regle:
        "L'éthique réfléchit au bien et au mal de nos actions. L'IA pose de nouvelles questions éthiques.",
      consigne: "Vraie question éthique sur l'IA ?",
      items: ["« Qui est responsable si une voiture autonome a un accident ? »"],
      correction: "Oui : c'est une vraie question éthique (la responsabilité).",
    },
    mot: {
      mot: "Moindres carrés",
      nature: "expression, maths",
      definition: "Méthode qui ajuste un modèle aux données en minimisant la somme des carrés des écarts.",
      exemple: "Erreur (3 au lieu de 5) : (3 − 5)² = 4.",
    },
    geste: {
      titre: "Coder une IA simple (Python)",
      texte: "En quelques dizaines de lignes de Python, on peut entraîner une petite IA : comprendre, c'est déjà pouvoir créer.",
    },
    defi: {
      enonce: "Prévu 7, vraie valeur 4 : erreur au carré ?",
      correction: "9 ((7 − 4)²).",
    },
  },

  /* ===================== SEMAINE 5 · L'IA face aux grands défis ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Stratège des diagnostics",
    maths: {
      calcul: [
        { q: "1 % de 1000 =", r: "10" },
        { q: "99 % de 100 =", r: "99" },
        { q: "P(A sachant B) = P(A et B) ÷ P(B)", r: "oui" },
        { q: "0,5 × 0,5 =", r: "0,25" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Un test détecte une maladie rare. Même très fiable, beaucoup de tests positifs sont faux. Pourquoi est-ce crucial quand une IA pose un diagnostic ?",
        correction: "Si la maladie est rare, un test positif n'est pas une certitude : il faut combiner avec les probabilités conditionnelles (théorème de Bayes). Une IA médicale doit en tenir compte pour ne pas alarmer à tort.",
      },
      illu: { emoji: "🩺", label: "diagnostic" },
    },
    francais: {
      regleTitre: "La responsabilité",
      regle:
        "Être responsable, c'est répondre de ses actes. Avec l'IA, qui répond : le concepteur, l'utilisateur ?",
      consigne: "Vrai ou faux : une IA peut-elle être « responsable » comme un humain ?",
      items: ["Une IA est-elle responsable de ses actes ?"],
      correction: "Non : la responsabilité reste humaine (concepteurs, utilisateurs, décideurs).",
    },
    mot: {
      mot: "Faux positif",
      nature: "expression, maths",
      definition: "Un résultat « positif » alors que ce n'est pas le cas. Fréquent quand l'événement cherché est rare.",
      exemple: "Test positif sans la maladie : un faux positif.",
    },
    geste: {
      titre: "L'IA pour la santé (et ses limites)",
      texte: "L'IA aide au diagnostic, mais ne remplace pas le médecin : elle propose, l'humain décide et explique.",
    },
    defi: {
      enonce: "Si 1 personne sur 1000 est malade, un test positif est-il une certitude ?",
      correction: "Non, loin de là : il y a beaucoup de faux positifs.",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Esprit critique",
    maths: {
      calcul: [
        { q: "corrélation = causalité ?", r: "non" },
        { q: "8 × 7 =", r: "56" },
        { q: "5 × 5 =", r: "25" },
        { q: "2 faits liés → l'un cause l'autre ?", r: "pas forcément" },
        { q: "9 × 6 =", r: "54" },
      ],
      probleme: {
        enonce: "« Les ventes de glaces et les noyades augmentent ensemble l'été. » L'une cause-t-elle l'autre ? Quel est le vrai facteur ?",
        correction: "Non : corrélation n'est pas causalité. Le vrai facteur commun est la chaleur. Une IA mal conçue peut confondre les deux : l'esprit critique reste indispensable.",
      },
      illu: { emoji: "🔍", label: "esprit critique" },
    },
    francais: {
      regleTitre: "Le progrès",
      regle:
        "Le progrès technique n'est pas toujours un progrès humain : il faut le mettre au service du bien commun.",
      consigne: "Progrès technique ou progrès humain ?",
      items: ["une IA plus puissante", "une société plus juste et plus libre"],
      correction: "technique — humain.",
    },
    mot: {
      mot: "Corrélation",
      nature: "nom, maths",
      definition: "Deux grandeurs varient ensemble (corrélation) — mais cela ne prouve pas que l'une cause l'autre.",
      exemple: "Glaces et noyades : corrélées par la chaleur, sans lien de cause.",
    },
    geste: {
      titre: "L'éthique de l'IA (principes)",
      texte: "Une IA responsable est juste, transparente, respectueuse de la vie privée, et reste sous contrôle humain.",
    },
    defi: {
      enonce: "Deux choses augmentent ensemble : l'une cause-t-elle forcément l'autre ?",
      correction: "Non : corrélation n'est pas causalité.",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Maître des aires",
    maths: {
      calcul: [
        { q: "aire triangle base 4 hauteur 4 ÷ 2 =", r: "8" },
        { q: "aire sous y = x de 0 à 2 =", r: "2" },
        { q: "intégrale = aire (ou cumul)", r: "oui" },
        { q: "4 × 4 =", r: "16" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "L'intégrale calcule une aire ou un cumul. L'aire sous la droite y = x entre 0 et 4 forme un triangle. Quelle est cette aire ?",
        correction: "Triangle de base 4 et de hauteur 4 : 4 × 4 ÷ 2 = 8.",
      },
      illu: { emoji: "📐", label: "intégrale" },
    },
    francais: {
      regleTitre: "Le Grand Oral",
      regle:
        "On présente une question liée à ses spécialités, on argumente, on dialogue. La clarté et la conviction comptent.",
      consigne: "Bonne idée pour le Grand Oral ?",
      items: ["choisir une question qui te passionne", "réciter sans comprendre"],
      correction: "bonne idée — mauvaise idée.",
    },
    mot: {
      mot: "Intégrale",
      nature: "nom, maths",
      definition: "L'intégrale additionne une infinité de petits morceaux pour calculer une aire, un volume ou un cumul.",
      exemple: "Aire sous y = x de 0 à 4 : 8.",
    },
    geste: {
      titre: "L'IA pour le climat (modèles)",
      texte: "Des IA modélisent le climat et optimisent les réseaux d'énergie : un outil puissant pour la transition écologique.",
    },
    defi: {
      enonce: "Aire du triangle sous y = x entre 0 et 2 ?",
      correction: "2 (2 × 2 ÷ 2).",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Bâtisseur de primitives",
    maths: {
      calcul: [
        { q: "primitive de 2x =", r: "x²" },
        { q: "primitive de 1 =", r: "x" },
        { q: "primitive de x = x²/2", r: "oui" },
        { q: "(x²)' =", r: "2x" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Une primitive de f est une fonction F dont la dérivée est f. Quelle est une primitive de f(x) = 2x ?",
        correction: "F(x) = x², car (x²)' = 2x. (On peut aussi ajouter une constante.)",
      },
      illu: { emoji: "➕", label: "primitive" },
    },
    francais: {
      regleTitre: "Construire une problématique",
      regle:
        "Une bonne problématique transforme un sujet en vraie question, avec une tension à résoudre.",
      consigne: "Sujet ou problématique ?",
      items: ["« L'intelligence artificielle »", "« L'IA peut-elle penser à notre place ? »"],
      correction: "sujet — problématique.",
    },
    mot: {
      mot: "Primitive",
      nature: "nom, maths",
      definition: "Une primitive « remonte » de la dérivée à la fonction : F est une primitive de f si F' = f.",
      exemple: "Une primitive de 2x est x².",
    },
    geste: {
      titre: "La désinformation et l'IA",
      texte: "Les IA peuvent fabriquer de fausses informations crédibles ; on vérifie toujours avant de croire et de partager.",
    },
    defi: {
      enonce: "Une primitive de f(x) = 1 ?",
      correction: "F(x) = x.",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Géomètre de l'espace",
    maths: {
      calcul: [
        { q: "u(1;2;3) + v(2;0;1) =", r: "(3;2;4)" },
        { q: "norme de (3;0;0) =", r: "3" },
        { q: "u(1;1;1) + v(2;2;2) =", r: "(3;3;3)" },
        { q: "3² + 4² =", r: "25" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Dans l'espace, les vecteurs ont 3 coordonnées. Calcule u + v avec u(1 ; 2 ; 3) et v(2 ; 0 ; 1).",
        correction: "On additionne coordonnée par coordonnée : (3 ; 2 ; 4).",
      },
      illu: { emoji: "🧊", label: "espace 3D" },
    },
    francais: {
      regleTitre: "Citer un philosophe",
      regle:
        "Une référence (Descartes, Kant…) appuie une idée, à condition de l'avoir comprise, pas pour « faire joli ».",
      consigne: "Vrai ou faux : citer sans comprendre, est-ce utile ?",
      items: ["Citer un auteur sans le comprendre ?"],
      correction: "Faux : une référence ne vaut que si on l'explique et on l'utilise vraiment.",
    },
    mot: {
      mot: "Vecteur de l'espace",
      nature: "expression, maths",
      definition: "Dans l'espace, un vecteur a trois coordonnées (x ; y ; z).",
      exemple: "u(1 ; 2 ; 3) + v(2 ; 0 ; 1) = (3 ; 2 ; 4).",
    },
    geste: {
      titre: "L'IA et la 3D (robotique, vision)",
      texte: "Voitures autonomes, robots, imagerie médicale : l'IA « voit » et se repère dans un espace en trois dimensions.",
    },
    defi: {
      enonce: "u(1 ; 1 ; 1) + v(2 ; 2 ; 2) = ?",
      correction: "(3 ; 3 ; 3).",
    },
  },

  /* ===================== SEMAINE 6 · Ton avenir : changer le monde ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Navigateur 3D",
    maths: {
      calcul: [
        { q: "2 points définissent une", r: "droite" },
        { q: "3 points non alignés définissent un", r: "plan" },
        { q: "équation d'un plan : ax + by + cz + d =", r: "0" },
        { q: "7 × 7 =", r: "49" },
        { q: "5 × 6 =", r: "30" },
      ],
      probleme: {
        enonce: "Dans l'espace, combien de points faut-il pour définir une droite ? Et un plan ?",
        correction: "2 points pour une droite ; 3 points non alignés pour un plan.",
      },
      illu: { emoji: "✈️", label: "droites et plans" },
    },
    francais: {
      regleTitre: "L'esprit critique",
      regle:
        "Penser de façon critique : vérifier les sources, repérer les biais, ne pas tout croire (y compris une IA).",
      consigne: "Esprit critique ou crédulité ?",
      items: ["vérifier une info choc avant de la partager", "croire la 1re réponse d'une IA"],
      correction: "esprit critique — crédulité.",
    },
    mot: {
      mot: "Plan",
      nature: "nom, maths",
      definition: "Dans l'espace, un plan est défini par 3 points non alignés ; son équation est ax + by + cz + d = 0.",
      exemple: "Le sol d'une pièce est un plan.",
    },
    geste: {
      titre: "Penser l'IA (intelligence ≠ conscience)",
      texte: "Une IA peut être très performante sans avoir de conscience ni comprendre vraiment ce qu'elle fait.",
    },
    defi: {
      enonce: "Combien de points non alignés définissent un plan ?",
      correction: "3.",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Maître des forces",
    maths: {
      calcul: [
        { q: "u(1;2;2)·v(2;0;1) = 2+0+2 =", r: "4" },
        { q: "u(1;0;0)·v(0;1;0) =", r: "0" },
        { q: "perpendiculaires → produit scalaire =", r: "0" },
        { q: "2 × 3 =", r: "6" },
        { q: "5 × 5 =", r: "25" },
      ],
      probleme: {
        enonce: "Le produit scalaire dans l'espace : u·v = xx' + yy' + zz'. Calcule u·v avec u(1 ; 2 ; 2) et v(2 ; 0 ; 1).",
        correction: "1×2 + 2×0 + 2×1 = 4.",
      },
      illu: { emoji: "🧲", label: "produit scalaire" },
    },
    francais: {
      regleTitre: "La liberté à l'ère du numérique",
      regle:
        "Les algorithmes orientent nos choix (vidéos, infos). Garder sa liberté, c'est rester maître de son attention.",
      consigne: "Libre ou influencé ?",
      items: ["regarder ce que l'algorithme propose en boucle", "choisir consciemment ce qu'on regarde"],
      correction: "influencé — libre.",
    },
    mot: {
      mot: "Produit scalaire (espace)",
      nature: "expression, maths",
      definition: "u·v = xx' + yy' + zz'. S'il vaut 0, les vecteurs sont perpendiculaires.",
      exemple: "u(1 ; 0 ; 0)·v(0 ; 1 ; 0) = 0.",
    },
    geste: {
      titre: "Comparer avec l'IA (le produit scalaire !)",
      texte: "Les IA comparent textes et images en mesurant leur « ressemblance » avec un produit scalaire : les maths du cahier, en vrai.",
    },
    defi: {
      enonce: "u(1 ; 1 ; 0)·v(0 ; 0 ; 1) = ?",
      correction: "0 (les vecteurs sont perpendiculaires).",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "Sage des grands nombres",
    maths: {
      calcul: [
        { q: "6000 × 1/6 =", r: "1000" },
        { q: "600 × 1/2 =", r: "300" },
        { q: "plus n est grand, plus c'est", r: "précis" },
        { q: "1/6 × 1200 =", r: "200" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Loi des grands nombres : plus on répète une expérience, plus la fréquence observée s'approche de la probabilité. Sur 6000 lancers d'un dé, combien de 6 environ ?",
        correction: "Environ 1000 (6000 × 1/6). C'est pourquoi l'IA a besoin de beaucoup de données pour être fiable.",
      },
      illu: { emoji: "⚖️", label: "loi des grands nombres" },
    },
    francais: {
      regleTitre: "Révision : la méthode du bac",
      regle:
        "Dissertation et explication de texte demandent rigueur, problématique et exemples ; le Grand Oral, conviction et clarté.",
      consigne: "Quelle épreuve ?",
      items: ["répondre à une question par un plan argumenté", "présenter et défendre une question à l'oral"],
      correction: "dissertation — Grand Oral.",
    },
    mot: {
      mot: "Loi des grands nombres",
      nature: "expression, maths",
      definition: "Plus une expérience est répétée, plus la fréquence d'un résultat s'approche de sa probabilité.",
      exemple: "Sur 6000 lancers, environ 1000 « 6 ».",
    },
    geste: {
      titre: "Parcoursup et l'orientation",
      texte: "Le numérique structure ton orientation : on prépare ses choix, son dossier, sa lettre — avec sincérité et méthode.",
    },
    defi: {
      enonce: "Sur 600 lancers d'une pièce, combien de piles environ ?",
      correction: "Environ 300.",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Presque en Terminale",
    maths: {
      calcul: [
        { q: "e^0 =", r: "1" },
        { q: "ln(e) =", r: "1" },
        { q: "dérivée de x² =", r: "2x" },
        { q: "2^10 =", r: "1024" },
        { q: "racine de 144 =", r: "12" },
      ],
      probleme: {
        enonce: "Imagine une IA utile : par exemple, qui repère les zones de sécheresse à partir d'images satellites. Cite deux outils mathématiques qu'elle utilise.",
        correction: "Réponse libre — par exemple : les probabilités (classer les images), les dérivées et l'optimisation (apprendre), les statistiques (analyser les données).",
      },
      illu: { emoji: "🚀", label: "projet IA" },
    },
    francais: {
      regleTitre: "Penser l'IA",
      regle:
        "Une IA calcule très vite, mais a-t-elle une conscience, des intentions, une vraie compréhension ? Une grande question.",
      consigne: "Vrai ou faux : être « intelligent » suffit-il à être conscient ?",
      items: ["Intelligence = conscience ?"],
      correction: "Non : une IA peut être performante sans conscience ni compréhension réelle.",
    },
    mot: {
      mot: "Algorithme",
      nature: "nom, IA",
      definition: "Une suite finie d'instructions précises pour résoudre un problème ou prendre une décision.",
      exemple: "Une IA est un algorithme qui apprend de ses données.",
    },
    geste: {
      titre: "Créer un projet avec l'IA",
      texte: "L'IA est un formidable outil pour donner vie à une idée utile : à toi de garder la vision et le sens.",
    },
    defi: {
      enonce: "Cite une chose que l'IA fait grâce aux maths.",
      correction: "Réponse libre : reconnaître des images, traduire, prévoir la météo, conduire… toujours grâce aux probabilités, dérivées et statistiques.",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour la Terminale ! 🎓",
    maths: {
      calcul: [
        { q: "10 × 30 =", r: "300" },
        { q: "e^0 + ln(e) =", r: "2" },
        { q: "dérivée de x³ en 1 =", r: "3" },
        { q: "2^10 =", r: "1024" },
        { q: "racine de 169 =", r: "13" },
      ],
      probleme: {
        enonce: "Du CE2 à la Terminale, Ti Margo t'a accompagné dans 10 cahiers de 30 jours. Combien de jours d'aventure en tout ?",
        correction: "10 × 30 = 300 jours.",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Le grand bilan : une question pour changer le monde",
      regle:
        "Tu sais analyser, démontrer, argumenter, douter. Les maths et la philosophie te donnent le pouvoir de poser tes idées… et d'agir.",
      consigne: "Formule UNE grande question que tu aimerais résoudre pour rendre le monde meilleur.",
      items: ["(à toi de penser !)"],
      correction: "Réponse libre — une question claire, ambitieuse et utile. Le monde a besoin de tes idées.",
    },
    mot: {
      mot: "Bilan",
      nature: "nom",
      definition: "Faire le bilan, c'est mesurer le chemin parcouru… et préparer l'action.",
      exemple: "Du jardin du CE2 à l'IA : les maths pour comprendre, créer et changer le monde.",
    },
    geste: {
      titre: "Citoyen éclairé à l'ère de l'IA",
      texte: "Comprendre, vérifier, créer, rester maître : tu as les clés pour faire de l'IA une force pour le bien. À toi de jouer !",
    },
    defi: {
      enonce: "Quel grand message retiens-tu de ce cahier ?",
      correction: "Que les maths te donnent le pouvoir de comprendre l'IA, de poser tes idées et de changer le monde. À toi de l'inventer !",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — exigeants, parfois ouverts, niveau Tle.     */
/*  Plusieurs éclairent le fonctionnement de l'IA (croissance, gradient,      */
/*  faux positifs, grandes données).                                          */
/* -------------------------------------------------------------------------- */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce: "Une suite vérifie u(n) = (2n + 1)/n. Vers quelle limite tend-elle quand n → +∞ ?",
    correction: "Vers 2. (u(n) = 2 + 1/n, et 1/n → 0.)",
  },
  2: {
    enonce: "Pour f(x) = (3x − 1)/x, donne la limite en +∞. La courbe a-t-elle une asymptote ?",
    correction: "Limite 3 (f(x) = 3 − 1/x). La droite y = 3 est une asymptote horizontale.",
  },
  3: {
    enonce: "Donne la dérivée de f(x) = x³ − 3x, puis trouve où la pente est nulle.",
    correction: "f'(x) = 3x² − 3 ; pente nulle en x = 1 et x = −1.",
  },
  4: {
    enonce: "Résous x² − 5x + 6 = 0, puis l'inéquation x² − 5x + 6 < 0.",
    correction: "Racines 2 et 3 ; l'inéquation est vraie pour 2 < x < 3 (entre les racines).",
  },
  5: {
    enonce: "Une bactérie double toutes les 20 min. En partant d'une seule, combien après 4 heures ?",
    correction: "4096. (12 doublements : 2^12 = 4096.)",
  },
  6: {
    enonce: "On lance 2 dés. Sachant que la somme est paire, quelle est la probabilité qu'elle vaille 8 ?",
    correction: "5/18. (Sommes paires : 18 cas ; la somme 8 a 5 cas, d'où 5/18.)",
  },
  7: {
    enonce: "À un jeu, on gagne 30 € (p = 0,1), 10 € (p = 0,3), sinon 0 €. Le jeu coûte 8 € : est-il favorable ?",
    correction: "Espérance des gains : 30×0,1 + 10×0,3 = 6 €. Le jeu coûte 8 €, donc il est défavorable (on perd 2 € en moyenne).",
  },
  8: {
    enonce: "On lance 4 fois une pièce équilibrée. Quelle est la probabilité d'obtenir exactement 2 piles ?",
    correction: "6/16 = 3/8. (Il y a 6 façons d'obtenir 2 piles parmi 4, sur 16 issues.)",
  },
  9: {
    enonce: "La moyenne de 8 valeurs est 12. On retire la valeur 19. Quelle est la nouvelle moyenne ?",
    correction: "11. (Total 96 ; après retrait : 77 sur 7 valeurs = 11.)",
  },
  10: {
    enonce: "Une IA traite 2 × 10^9 paramètres. Combien cela fait-il de chiffres (ordre de grandeur), et comment l'écrire en toutes lettres ?",
    correction: "Environ 10 chiffres : 2 000 000 000, soit deux milliards.",
  },
  11: {
    enonce: "Résous l'équation e^x = 1, puis e^x = e².",
    correction: "x = 0 (car e^0 = 1) ; et x = 2.",
  },
  12: {
    enonce: "Une feuille de 0,1 mm est pliée 20 fois (croissance ×2). Quelle épaisseur, en ordre de grandeur ?",
    correction: "Environ 100 m ! (0,1 mm × 2^20 ≈ 0,1 × 10^6 mm = 10^5 mm = 100 m.) La croissance exponentielle est vertigineuse.",
  },
  13: {
    enonce: "Résous ln(x) = 0, puis ln(x) = 1.",
    correction: "x = 1 (car ln(1) = 0) ; et x = e (≈ 2,718).",
  },
  14: {
    enonce: "Le son double d'intensité tous les 3 décibels (environ). De combien de dB augmente une intensité ×8 ?",
    correction: "9 dB. (×8 = ×2 × ×2 × ×2, soit 3 + 3 + 3 = 9 dB.)",
  },
  15: {
    enonce: "Somme infinie : 1 + 1/3 + 1/9 + 1/27 + … Vers quelle valeur converge-t-elle ?",
    correction: "Vers 3/2. (Suite géométrique de raison 1/3 : somme = 1 ÷ (1 − 1/3) = 3/2.)",
  },
  16: {
    enonce: "Pour f(x) = x² − 6x + 5, trouve le minimum (valeur de x et de f).",
    correction: "Minimum en x = 3 (f'(x) = 2x − 6 = 0), et f(3) = 9 − 18 + 5 = −4.",
  },
  17: {
    enonce: "La fonction f(x) = x³ change de convexité : où se trouve son point d'inflexion ? (f''(x) = 6x)",
    correction: "En x = 0 : la dérivée seconde y change de signe (concave avant 0, convexe après).",
  },
  18: {
    enonce: "Avec 40 m de clôture et un mur sur un côté (3 côtés à clôturer), quelle est l'aire maximale de l'enclos ?",
    correction: "200 m². (20 m le long du mur × 10 m de profondeur ; aire maximale quand la longueur vaut la moitié de la clôture.)",
  },
  19: {
    enonce: "L'erreur d'une IA vaut E(x) = (x − 4)². Par « descente de gradient », vers quelle valeur de x converge-t-elle ?",
    correction: "Vers x = 4 : c'est là que l'erreur est minimale (E = 0) et que la pente s'annule.",
  },
  20: {
    enonce: "Une IA prévoit 3, 5, 8 ; les vraies valeurs sont 2, 5, 10. Quelle est la somme des carrés des erreurs ?",
    correction: "5. ((3−2)² + (5−5)² + (8−10)² = 1 + 0 + 4 = 5.)",
  },
  21: {
    enonce: "Une maladie touche 1 personne sur 1000. Un test est fiable à 99 %. Sur 1000 personnes (1 malade), combien de tests positifs environ, et combien de vrais malades parmi eux ?",
    correction: "Environ 1 vrai positif + ~10 faux positifs ≈ 11 positifs, dont 1 seul vraiment malade ! Un positif n'est donc PAS une certitude (idée de Bayes).",
  },
  22: {
    enonce: "Donne un exemple de corrélation sans causalité, autre que les glaces et les noyades.",
    correction: "Réponse libre — par exemple : le nombre de pompiers sur un incendie est corrélé aux dégâts, mais ce ne sont pas les pompiers qui causent les dégâts !",
  },
  23: {
    enonce: "Calcule l'aire sous la courbe y = x² entre 0 et 3 (l'intégrale vaut x³/3).",
    correction: "9. (3³/3 = 27/3 = 9.)",
  },
  24: {
    enonce: "Donne une primitive de f(x) = 3x² + 2x.",
    correction: "F(x) = x³ + x² (car (x³ + x²)' = 3x² + 2x).",
  },
  25: {
    enonce: "Dans l'espace, A(0;0;0), B(1;0;0), C(0;1;0). Le triangle ABC est-il dans un plan horizontal ? Quelle est son aire ?",
    correction: "Oui, dans le plan z = 0 ; aire = (1 × 1) ÷ 2 = 0,5.",
  },
  26: {
    enonce: "Deux plans ont pour équations z = 0 et z = 3. Se coupent-ils ? Pourquoi ?",
    correction: "Non : ils sont parallèles (même « hauteur » constante différente), ils ne se rencontrent jamais.",
  },
  27: {
    enonce: "Les vecteurs u(1;2;2) et v(2;1;a) sont perpendiculaires. Trouve a.",
    correction: "a = −2. (u·v = 2 + 2 + 2a = 0 → 2a = −4 → a = −2.)",
  },
  28: {
    enonce: "Une IA reconnaît un chiffre avec 95 % de réussite. Sur 1000 chiffres, combien d'erreurs en moyenne ? Et l'écart-type (binomiale, √(npq)) ?",
    correction: "50 erreurs en moyenne (1000 × 0,05) ; écart-type ≈ √(1000 × 0,05 × 0,95) ≈ 6,9.",
  },
  29: {
    enonce: "Imagine une IA qui aide à économiser l'eau d'agriculture. Quelle quantité mathématique faudrait-il MINIMISER, et laquelle MAXIMISER ?",
    correction: "Réponse libre — par exemple : minimiser les litres d'eau utilisés, tout en maximisant le rendement des cultures. Bien poser le problème (objectif + contraintes), c'est déjà la moitié de la solution.",
  },
  30: {
    enonce: "Formule une question mathématique précise au cœur d'un grand défi du monde (climat, santé, justice…) que ta génération pourrait résoudre.",
    correction: "Réponse libre — par exemple : « Comment optimiser la distribution de l'eau potable pour que personne n'en manque ? » Les maths transforment une intention en action.",
  },
};

/* Le carnet de Ti Margo — récit inspirant : les maths et l'IA pour agir. */
export const carnet: Record<number, string> = {
  1: "Dernière aventure, et peut-être la plus importante : comprendre comment l'intelligence artificielle va transformer le monde — et comment les maths te donnent le pouvoir d'agir. Car apprendre les maths, c'est apprendre à poser ses idées et à changer le monde. On y va ?",
  2: "Je regarde l'infini en face : une suite qui s'approche d'une limite sans jamais l'atteindre. Les maths apprivoisent même l'infini. Vertigineux, et magnifique.",
  3: "La dérivée mesure comment les choses changent. Comprendre le changement, c'est déjà pouvoir agir sur lui.",
  4: "Je résous, j'isole, je trouve. Chaque équation résolue, c'est une petite victoire de la raison sur le hasard.",
  5: "Je traduis le réel en modèle : une population, une épidémie, un climat. Modéliser, c'est commencer à comprendre — et à prévoir.",
  6: "Aujourd'hui, je soulève le capot de l'IA. Surprise : à l'intérieur, ce sont des maths ! Des probabilités, des fonctions, des données. L'IA, ce sont des mathématiques qui apprennent.",
  7: "Une IA « décide » avec des probabilités et des espérances. Elle ne devine pas : elle calcule le plus probable. Fascinant, et un peu déroutant.",
  8: "Pile ou face, encore et encore : la loi binomiale décrit ces répétitions. L'IA adore les répétitions et les statistiques.",
  9: "Moyenne, écart-type : je mesure le centre, mais aussi la dispersion. Pour décider juste, il faut voir toute l'image.",
  10: "Une IA apprend sur des millions de données. Plus elles sont nombreuses et justes, mieux elle voit le monde. Mais gare aux données biaisées : elles créent des IA injustes.",
  11: "Je rencontre l'exponentielle : elle est égale à sa propre dérivée ! Une fonction qui se nourrit d'elle-même. Quelle élégance.",
  12: "L'exponentielle, c'est la croissance qui s'emballe : une rumeur, une épidémie, une idée. Comprendre l'exponentielle, c'est comprendre notre époque.",
  13: "Le logarithme range les nombres géants sur une petite échelle. Il dompte le gigantesque — très utile pour les données et l'IA.",
  14: "Séismes, sons, données : tant de choses se mesurent en échelle logarithmique. Les maths donnent une règle commune au monde.",
  15: "Une infinité de morceaux dont la somme est finie : l'infini tient parfois dans le creux de la main. Les maths n'ont pas fini de me surprendre.",
  16: "Avec la dérivée, je lis les montées et les descentes d'une courbe. Savoir où ça monte, où ça descend : c'est piloter le changement.",
  17: "Convexe, concave : la forme d'une courbe raconte une histoire. La géométrie des fonctions est un langage à part entière.",
  18: "Optimiser : trouver le meilleur. Moins de gaspillage, plus d'efficacité. Les maths au service d'un monde plus sobre.",
  19: "Voici le secret de l'IA : pour apprendre, elle « descend la pente » de son erreur, pas à pas, grâce à la dérivée. La descente de gradient. L'IA apprend… comme on apprend de ses erreurs !",
  20: "L'IA cherche à coller au réel en minimisant ses erreurs au carré. Se tromper le moins possible : un bon principe, pour les machines comme pour nous.",
  21: "Un diagnostic, ce sont des probabilités conditionnelles. Une IA médicale doit les manier avec prudence : une erreur peut coûter cher.",
  22: "Attention : corrélation n'est pas causalité ! Deux choses liées ne s'expliquent pas forcément l'une l'autre. L'esprit critique reste irremplaçable, même face à l'IA.",
  23: "L'intégrale additionne une infinité de petits morceaux pour calculer une aire, un cumul, une énergie. Les maths font la somme du monde.",
  24: "Remonter de la dérivée à la fonction, c'est la primitive. Comme retrouver le chemin à partir des traces.",
  25: "Je passe à l'espace en trois dimensions : des vecteurs à trois nombres. La vision des robots et des IA vit dans cet espace-là.",
  26: "Droites et plans dans l'espace : la géométrie qui guide les avions, les satellites, les voitures autonomes.",
  27: "Le produit scalaire mesure l'angle entre deux directions. L'IA s'en sert pour comparer des images, des textes, des idées !",
  28: "La loi des grands nombres : plus on a de données, plus on s'approche de la vérité. C'est tout le secret de l'IA — et une belle leçon de patience.",
  29: "J'imagine mon projet : une IA utile, au service des autres et de la planète. Les maths m'en donnent les clés. Et toi, quelle idée veux-tu réaliser ?",
  30: "Quel voyage, du jardin du CE2 jusqu'à l'intelligence artificielle ! Tu sais maintenant calculer, raisonner, douter, créer. Les maths t'ont donné un super-pouvoir : poser tes idées sur le papier et changer le monde. L'IA va tout transformer — à toi d'en faire quelque chose de beau et de juste. Merci d'avoir pensé avec moi : maintenant, le monde t'attend ! 🎓",
};

/* « Le savais-tu ? » — l'IA, les grandes idées et le monde (local 🌺 / monde 🌍). */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "monde", texte: "Apprendre les maths, ce n'est pas calculer pour rien : c'est apprendre à raisonner, à modéliser et à inventer des solutions au monde réel." },
  2: { portee: "monde", texte: "La notion de limite, au cœur du calcul moderne, a mis des siècles à être bien définie : les grandes idées prennent du temps." },
  3: { portee: "monde", texte: "La dérivée, inventée par Newton et Leibniz, décrit le mouvement et le changement : la base de toute la physique." },
  4: { portee: "monde", texte: "Résoudre des équations a permis de prévoir le retour de comètes et de placer des satellites en orbite." },
  5: { portee: "monde", texte: "Modéliser une épidémie avec des maths aide les médecins à décider : combien de lits, de vaccins, de mesures." },
  6: { portee: "monde", texte: "L'intelligence artificielle n'est pas magique : ce sont des mathématiques (probabilités, fonctions, optimisation) appliquées à d'énormes données." },
  7: { portee: "monde", texte: "Une IA ne « comprend » pas : elle calcule la réponse la plus probable à partir de milliards d'exemples." },
  8: { portee: "monde", texte: "Alan Turing, mathématicien, posait dès 1950 la question : « une machine peut-elle penser ? »" },
  9: { portee: "monde", texte: "Les statistiques permettent de tester si un médicament marche vraiment, ou si ce n'est que le hasard." },
  10: { portee: "monde", texte: "Une IA entraînée sur des données biaisées reproduit les injustices : d'où l'importance de données justes et variées." },
  11: { portee: "monde", texte: "L'exponentielle décrit les intérêts composés, la radioactivité, la croissance des populations… et la diffusion d'une idée." },
  12: { portee: "monde", texte: "Une croissance exponentielle paraît lente au début, puis explose : c'est ce qui a surpris le monde lors des épidémies." },
  13: { portee: "monde", texte: "Le logarithme a été inventé pour simplifier les calculs des astronomes : il transforme les multiplications en additions." },
  14: { portee: "local", texte: "À La Réunion, les volcanologues du Piton de la Fournaise suivent l'activité sismique sur des échelles logarithmiques." },
  15: { portee: "monde", texte: "Une somme d'une infinité de termes peut donner un résultat fini : c'est le paradoxe de Zénon, résolu par les maths." },
  16: { portee: "monde", texte: "Étudier les variations d'une fonction, c'est ce que font les ingénieurs pour optimiser un moteur ou une aile d'avion." },
  17: { portee: "monde", texte: "La convexité sert en économie, en physique… et dans les IA, pour garantir qu'on trouve le meilleur réglage." },
  18: { portee: "monde", texte: "Optimiser, c'est le cœur de l'ingénierie : faire le plus avec le moins de ressources." },
  19: { portee: "monde", texte: "La « descente de gradient » est l'algorithme qui fait apprendre presque toutes les IA modernes : du pur calcul de dérivées !" },
  20: { portee: "monde", texte: "La méthode des moindres carrés, inventée par Gauss vers 1800, est encore utilisée par les IA d'aujourd'hui." },
  21: { portee: "monde", texte: "Le théorème de Bayes (probabilités conditionnelles) aide les IA médicales à ne pas se tromper de diagnostic." },
  22: { portee: "monde", texte: "« Corrélation n'est pas causalité » : une règle d'or pour ne pas se laisser tromper par les chiffres, ni par une IA." },
  23: { portee: "monde", texte: "L'intégrale calcule des aires, des volumes, des distances parcourues : indispensable en physique et en ingénierie." },
  24: { portee: "monde", texte: "Trouver une primitive, c'est « remonter le temps » d'une dérivée : utile pour reconstruire une trajectoire." },
  25: { portee: "monde", texte: "La géométrie dans l'espace permet aux voitures autonomes et aux robots de « voir » en trois dimensions." },
  26: { portee: "monde", texte: "Les satellites GPS calculent ta position grâce à la géométrie de droites et de plans dans l'espace." },
  27: { portee: "monde", texte: "Les IA qui comparent textes ou images utilisent le produit scalaire pour mesurer leur ressemblance." },
  28: { portee: "monde", texte: "La loi des grands nombres explique pourquoi les casinos gagnent toujours… et pourquoi l'IA a besoin de tant de données." },
  29: { portee: "local", texte: "De jeunes ingénieurs réunionnais développent des IA pour surveiller les requins, l'érosion des côtes ou l'énergie solaire." },
  30: { portee: "monde", texte: "Stephen Hawking disait que l'IA pourrait être « le meilleur ou le pire » pour l'humanité. Ce sera à ta génération d'en décider — et avec les maths, tu as les clés." },
};
