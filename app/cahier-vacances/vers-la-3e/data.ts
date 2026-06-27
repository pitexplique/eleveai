/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « En route vers la 3e » (4e → 3e).           */
/*  Fil conducteur : le grand voyage spatial de Ti Margo, devenu astronaute —  */
/*  6 escales dans le système solaire (Lune → Mars → Jupiter → Saturne →       */
/*  les confins → les étoiles, puis retour sur Terre). Ultime « élargissement  */
/*  du voyage » : île → océan → monde → cosmos. Science-forward, pour l'année  */
/*  du brevet. Niveau 4e : révision + avant-goût de la 3e.                     */
/*  ⚠️ Défis ★★★★★ pensés pour les élèves HPI : raisonnement, arithmétique,   */
/*     dénombrement, énigmes — niveau brevet et au-delà, pas juste « plus dur ».*/
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 escales du voyage spatial (une par semaine). */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🌙", lieu: "La Lune, premier pas dans l'espace", intro: "Ti Margo quitte la Terre : le grand voyage spatial commence !" },
  { semaine: 2, etape: 2, emoji: "🔴", lieu: "Mars, la planète rouge", intro: "Cap sur Mars : déserts rouges et recherche d'eau." },
  { semaine: 3, etape: 3, emoji: "🟠", lieu: "Jupiter, la géante gazeuse", intro: "La plus grande planète et son cortège de lunes." },
  { semaine: 4, etape: 4, emoji: "🪐", lieu: "Saturne et ses anneaux", intro: "Le joyau du système solaire et ses anneaux de glace." },
  { semaine: 5, etape: 5, emoji: "☄️", lieu: "Les confins : Neptune et les comètes", intro: "Aux frontières glacées du système solaire." },
  { semaine: 6, etape: 6, emoji: "✨", lieu: "Les étoiles, puis retour sur Terre", intro: "Un saut vers les étoiles… avant la 3e et le brevet !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · La Lune ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Apprenti astronaute",
    maths: {
      calcul: [
        { q: "3 × 10 puissance 5 =", r: "300000" },
        { q: "10 puissance 4 × 10 puissance 3 =", r: "10 puissance 7" },
        { q: "2 puissance 5 =", r: "32" },
        { q: "−8 + 20 =", r: "12" },
        { q: "7 × 9 =", r: "63" },
      ],
      probleme: {
        enonce: "La Lune est à environ 384 000 km de la Terre. Écris cette distance en notation scientifique.",
        correction: "384 000 = 3,84 × 10 puissance 5 km.",
      },
      illu: { emoji: "🚀", label: "fusée" },
    },
    francais: {
      regleTitre: "Les classes de mots",
      regle:
        "Nom, verbe, adjectif, déterminant, pronom, adverbe, préposition, conjonction : huit grandes classes.",
      consigne: "Donne la classe du mot entre parenthèses.",
      items: ["il avance (rapidement)", "(vers) Mars", "(le) vaisseau"],
      correction: "adverbe — préposition — déterminant.",
    },
    mot: {
      mot: "Notation scientifique",
      nature: "expression, maths",
      definition: "On écrit un nombre sous la forme a × 10 puissance n, avec a entre 1 et 10.",
      exemple: "384 000 = 3,84 × 10 puissance 5.",
    },
    geste: {
      titre: "La certification Pix",
      texte: "En 3e, tu passes Pix : une certification des compétences numériques. Ce cahier t'y entraîne, geste après geste.",
    },
    defi: {
      enonce: "Combien vaut 10 puissance 6 ?",
      correction: "1 000 000 (un million).",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Marcheur lunaire",
    maths: {
      calcul: [
        { q: "3x + 5x =", r: "8x" },
        { q: "2(x + 4) =", r: "2x + 8" },
        { q: "7x − 3x + x =", r: "5x" },
        { q: "5(2x − 1) =", r: "10x − 5" },
        { q: "9 × 8 =", r: "72" },
      ],
      probleme: {
        enonce: "Un module pèse x kg ; on en assemble 3 identiques, plus 50 kg de matériel. Exprime la masse totale, réduite.",
        correction: "3x + 50 (kg).",
      },
      illu: { emoji: "🌙", label: "Lune" },
    },
    francais: {
      regleTitre: "Les fonctions dans la phrase",
      regle:
        "Sujet, COD, COI, attribut, complément circonstanciel : c'est le rôle du mot dans la phrase.",
      consigne: "Donne la fonction du groupe entre parenthèses.",
      items: ["Ti Margo pilote (la navette).", "Il devient (astronaute).", "(Dans l'espace), tout flotte."],
      correction: "COD — attribut du sujet — complément circonstanciel de lieu.",
    },
    mot: {
      mot: "Expression littérale",
      nature: "expression, maths",
      definition: "Une expression littérale utilise des lettres pour représenter des nombres.",
      exemple: "3x + 50 est une expression littérale.",
    },
    geste: {
      titre: "Évaluer la fiabilité d'une information",
      texte: "On se demande : qui parle, dans quel but, avec quelles preuves ? Et d'autres sources sérieuses confirment-elles ?",
    },
    defi: {
      enonce: "Réduis l'expression 6x + 3 − 2x + 7.",
      correction: "4x + 10.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Pilote de navette",
    maths: {
      calcul: [
        { q: "x + 7 = 12 → x =", r: "5" },
        { q: "3x = 21 → x =", r: "7" },
        { q: "2x + 1 = 9 → x =", r: "4" },
        { q: "x − 5 = 10 → x =", r: "15" },
        { q: "5x = 35 → x =", r: "7" },
      ],
      probleme: {
        enonce: "Je pense à un nombre, je le multiplie par 3 puis j'ajoute 4 : j'obtiens 25. Quel est ce nombre ?",
        correction: "3x + 4 = 25 → 3x = 21 → x = 7.",
      },
      illu: { emoji: "🛰️", label: "navette" },
    },
    francais: {
      regleTitre: "L'attribut du sujet",
      regle:
        "Après être, paraître, devenir, sembler…, l'attribut donne une qualité au sujet.",
      consigne: "Souligne l'attribut du sujet.",
      items: ["La Lune est grise.", "Ti Margo paraît courageux.", "Le voyage devient long."],
      correction: "grise — courageux — long.",
    },
    mot: {
      mot: "Inconnue",
      nature: "nom, maths",
      definition: "L'inconnue est le nombre cherché dans une équation, souvent noté x.",
      exemple: "Dans 3x + 4 = 25, l'inconnue x vaut 7.",
    },
    geste: {
      titre: "Identifier une source en ligne",
      texte: "Avant de citer un site, on cherche l'auteur, la date et l'organisme : un blog anonyme ne vaut pas un site officiel.",
    },
    defi: {
      enonce: "Résous 4x − 3 = 17.",
      correction: "x = 5 (4x = 20).",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Ingénieur de bord",
    maths: {
      calcul: [
        { q: "3² + 4² =", r: "25" },
        { q: "racine de 25 =", r: "5" },
        { q: "5² + 12² =", r: "169" },
        { q: "racine de 169 =", r: "13" },
        { q: "8² =", r: "64" },
      ],
      probleme: {
        enonce: "Un panneau solaire rectangulaire mesure 6 m sur 8 m. Quelle est la longueur de sa diagonale ?",
        correction: "diagonale² = 6² + 8² = 36 + 64 = 100 ; racine de 100 = 10. La diagonale mesure 10 m.",
      },
      illu: { emoji: "🧑‍🚀", label: "astronaute" },
    },
    francais: {
      regleTitre: "Les propositions subordonnées",
      regle:
        "Relative (qui, que…), conjonctive (que), circonstancielle (quand, parce que…) : elles dépendent d'une principale.",
      consigne: "Relative (R), conjonctive (C) ou circonstancielle (CC) ?",
      items: ["L'étoile qui brille.", "Il pense que c'est loin.", "Il part quand la nuit tombe."],
      correction: "R — C — CC.",
    },
    mot: {
      mot: "Hypoténuse",
      nature: "nom, maths",
      definition: "Dans un triangle rectangle, l'hypoténuse est le plus grand côté, face à l'angle droit.",
      exemple: "Côtés 6 et 8 → hypoténuse 10.",
    },
    geste: {
      titre: "Le droit d'auteur et les licences",
      texte: "Une image, une musique appartient à son auteur ; pour la réutiliser, on vérifie sa licence (libre ou non).",
    },
    defi: {
      enonce: "Un triangle rectangle a des côtés de 9 et 12. Quelle est son hypoténuse ?",
      correction: "15 (9² + 12² = 225 = 15²).",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Cap sur Mars",
    maths: {
      calcul: [
        { q: "40 000 ÷ 8 =", r: "5000" },
        { q: "12 × 2,5 =", r: "30" },
        { q: "300 × 60 =", r: "18000" },
        { q: "1/2 de 5000 =", r: "2500" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Une sonde file à 5 km/s. Quelle distance parcourt-elle en 1 minute (60 s) ?",
        correction: "5 × 60 = 300. Trois cents kilomètres.",
      },
      illu: { emoji: "🔴", label: "planète Mars" },
    },
    francais: {
      regleTitre: "Les subordonnées circonstancielles",
      regle:
        "Elles précisent le temps (quand), la cause (parce que), la conséquence (si bien que), le but (pour que).",
      consigne: "Temps, cause ou but ?",
      items: ["Il part parce qu'il rêve d'espace.", "Quand le moteur s'allume, tout vibre.", "Il s'entraîne pour que tout réussisse."],
      correction: "cause — temps — but.",
    },
    mot: {
      mot: "Coefficient de proportionnalité",
      nature: "expression, maths",
      definition: "C'est le nombre par lequel on multiplie pour passer d'une grandeur à l'autre.",
      exemple: "Distance = vitesse × temps : la vitesse est le coefficient.",
    },
    geste: {
      titre: "Citer ses sources dans un exposé",
      texte: "À la fin d'un exposé, on liste ses sources (auteur, titre, site, date) : c'est honnête et ça rend ton travail crédible.",
    },
    defi: {
      enonce: "Une fusée parcourt 18 000 km en 1 h. Quelle distance en 3 h à la même vitesse ?",
      correction: "54 000 km.",
    },
  },

  /* ===================== SEMAINE 2 · Mars ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Explorateur martien",
    maths: {
      calcul: [
        { q: "1/2 + 1/3 =", r: "5/6" },
        { q: "3/4 − 1/2 =", r: "1/4" },
        { q: "2/3 × 3/5 =", r: "2/5" },
        { q: "1/2 ÷ 1/4 =", r: "2" },
        { q: "5/6 − 1/6 =", r: "2/3" },
      ],
      probleme: {
        enonce: "Ti Margo a parcouru 1/3 du trajet vers Mars, puis 1/2 du trajet. Quelle fraction a-t-il faite ? Et combien reste-t-il ?",
        correction: "1/3 + 1/2 = 2/6 + 3/6 = 5/6 ; il reste 1/6.",
      },
      illu: { emoji: "🔴", label: "désert martien" },
    },
    francais: {
      regleTitre: "L'indicatif et ses temps",
      regle:
        "L'indicatif présente les faits réels : présent, imparfait, passé simple, futur, passé composé, plus-que-parfait.",
      consigne: "Quel temps ?",
      items: ["Il décolla.", "Il décollera.", "Il avait décollé."],
      correction: "passé simple — futur — plus-que-parfait.",
    },
    mot: {
      mot: "Fraction irréductible",
      nature: "expression, maths",
      definition: "Une fraction est irréductible quand on ne peut plus la simplifier.",
      exemple: "6/8 se simplifie en 3/4, qui est irréductible.",
    },
    geste: {
      titre: "La e-réputation",
      texte: "Ce que tu publies façonne ton image en ligne ; un jour, une école ou un employeur pourra la consulter.",
    },
    defi: {
      enonce: "Combien font 2/3 + 1/6 ?",
      correction: "5/6 (4/6 + 1/6).",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Géologue de Mars",
    maths: {
      calcul: [
        { q: "100 + 20 % =", r: "120" },
        { q: "80 − 25 % =", r: "60" },
        { q: "× 1,1 = augmentation de", r: "10 %" },
        { q: "× 0,5 = diminution de", r: "50 %" },
        { q: "15 % de 200 =", r: "30" },
      ],
      probleme: {
        enonce: "Une combinaison coûte 800 €, soldée à −30 %. Quel est le prix payé ?",
        correction: "30 % de 800 = 240 ; 800 − 240 = 560. Elle coûte 560 €.",
      },
      illu: { emoji: "🪨", label: "roche martienne" },
    },
    francais: {
      regleTitre: "Le subjonctif présent",
      regle: "Le subjonctif exprime le souhait, le doute, l'ordre : « il faut que je parte ».",
      consigne: "Conjugue au subjonctif présent.",
      items: ["que je (partir)", "qu'il (faire)", "que nous (être)"],
      correction: "que je parte — qu'il fasse — que nous soyons.",
    },
    mot: {
      mot: "Coefficient multiplicateur",
      nature: "expression, maths",
      definition: "Augmenter de 20 %, c'est multiplier par 1,2 ; baisser de 30 %, c'est multiplier par 0,7.",
      exemple: "800 € − 30 % = 800 × 0,7 = 560 €.",
    },
    geste: {
      titre: "Protéger ses comptes",
      texte: "Un mot de passe long et unique par site, plus la double authentification : c'est la meilleure protection.",
    },
    defi: {
      enonce: "Un prix de 50 € augmente de 40 %. Quel est le nouveau prix ?",
      correction: "70 € (50 × 1,4).",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Chercheur d'eau",
    maths: {
      calcul: [
        { q: "(−5) × (−4) =", r: "20" },
        { q: "(−18) ÷ 3 =", r: "−6" },
        { q: "−7 + (−8) =", r: "−15" },
        { q: "(−2) puissance 3 =", r: "−8" },
        { q: "12 − (−5) =", r: "17" },
      ],
      probleme: {
        enonce: "Sur Mars, il fait −20 °C le jour ; la nuit, la température chute encore de 60 °C. Quelle température la nuit ?",
        correction: "−20 − 60 = −80. Il fait −80 °C.",
      },
      illu: { emoji: "💧", label: "glace d'eau" },
    },
    francais: {
      regleTitre: "Le conditionnel",
      regle: "Le conditionnel exprime l'hypothèse, le rêve, la politesse : « j'irais bien sur Mars ».",
      consigne: "Conjugue au conditionnel présent.",
      items: ["aimer : je …", "aller : il …", "être : nous …"],
      correction: "j'aimerais — il irait — nous serions.",
    },
    mot: {
      mot: "Nombre relatif",
      nature: "nom, maths",
      definition: "Un nombre relatif est positif (+) ou négatif (−).",
      exemple: "−80 °C est une température relative.",
    },
    geste: {
      titre: "Reconnaître l'hameçonnage (phishing)",
      texte: "Un message qui imite ta banque ou un service et réclame tes identifiants est un piège : on ne clique pas, on signale.",
    },
    defi: {
      enonce: "Calcule (−3) × (−2) × (−5).",
      correction: "−30 (trois facteurs négatifs : résultat négatif).",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Cartographe du ciel",
    maths: {
      calcul: [
        { q: "180 − 90 − 30 =", r: "60" },
        { q: "cos 60° =", r: "0,5" },
        { q: "cos 0° =", r: "1" },
        { q: "6² =", r: "36" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "Dans un triangle rectangle, l'hypoténuse vaut 10 et un angle aigu 60°. Le côté adjacent à cet angle vaut hypoténuse × cos 60°. Combien ?",
        correction: "10 × cos 60° = 10 × 0,5 = 5.",
      },
      illu: { emoji: "🗺️", label: "carte du ciel" },
    },
    francais: {
      regleTitre: "L'impératif",
      regle: "L'impératif donne un ordre ou un conseil, sans sujet exprimé : « Attache ta ceinture ! ».",
      consigne: "Mets à l'impératif (2e personne du singulier).",
      items: ["regarder", "finir", "être prudent"],
      correction: "regarde — finis — sois prudent.",
    },
    mot: {
      mot: "Cosinus",
      nature: "nom, maths",
      definition: "Dans un triangle rectangle, le cosinus d'un angle = côté adjacent ÷ hypoténuse.",
      exemple: "cos 60° = 0,5.",
    },
    geste: {
      titre: "Les arnaques et la fraude en ligne",
      texte: "Promesse de gros gains, pression à payer vite : ce sont des signes d'arnaque. On vérifie et on n'envoie jamais d'argent.",
    },
    defi: {
      enonce: "Dans un triangle rectangle, un angle aigu vaut 30°, l'hypoténuse 8. Le côté opposé à 30° vaut la moitié de l'hypoténuse. Combien ?",
      correction: "4 (la moitié de 8).",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Cap sur Jupiter",
    maths: {
      calcul: [
        { q: "échelle ×3 : 5 cm →", r: "15 cm" },
        { q: "aire ×3² si longueurs ×3 =", r: "×9" },
        { q: "20 ÷ 4 =", r: "5" },
        { q: "8 × 9 =", r: "72" },
        { q: "1/4 de 200 =", r: "50" },
      ],
      probleme: {
        enonce: "Une maquette de sonde est agrandie 4 fois (chaque longueur ×4). Une antenne de 3 cm devient quelle longueur ?",
        correction: "3 × 4 = 12. Elle mesure 12 cm.",
      },
      illu: { emoji: "🔴", label: "Mars vue de l'espace" },
    },
    francais: {
      regleTitre: "La concordance des temps",
      regle:
        "Le temps de la subordonnée s'accorde avec celui de la principale : « Il dit qu'il part » / « Il a dit qu'il partait ».",
      consigne: "Choisis le bon temps.",
      items: ["Il pense qu'il (réussit/réussira) demain.", "Il croyait qu'il (part/partait)."],
      correction: "réussira — partait.",
    },
    mot: {
      mot: "Agrandissement",
      nature: "nom, maths",
      definition: "Dans un agrandissement de rapport k, les longueurs sont multipliées par k et les aires par k².",
      exemple: "Agrandissement ×3 : aire ×9.",
    },
    geste: {
      titre: "Les données personnelles et le RGPD",
      texte: "La loi te donne des droits : voir, corriger ou supprimer les données qu'un site détient sur toi.",
    },
    defi: {
      enonce: "Une photo est agrandie de telle sorte que ses longueurs triplent. Par combien son aire est-elle multipliée ?",
      correction: "Par 9 (3²).",
    },
  },

  /* ===================== SEMAINE 3 · Jupiter ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Navigateur des géantes",
    maths: {
      calcul: [
        { q: "(x + 2)(x + 3) =", r: "x² + 5x + 6" },
        { q: "(x + 1)(x + 4) =", r: "x² + 5x + 4" },
        { q: "(x + 5)(x + 2) =", r: "x² + 7x + 10" },
        { q: "2(x + 3) =", r: "2x + 6" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Un panneau carré de côté (x + 3) est agrandi en rectangle (x + 3)(x + 5). Développe cette aire.",
        correction: "(x + 3)(x + 5) = x² + 5x + 3x + 15 = x² + 8x + 15.",
      },
      illu: { emoji: "🟠", label: "Jupiter" },
    },
    francais: {
      regleTitre: "Voix active et voix passive",
      regle:
        "À la voix passive, le sujet subit l'action ; on emploie « être » + participe passé.",
      consigne: "Mets à la voix passive.",
      items: ["La fusée traverse l'espace.", "Les astronautes explorent Mars."],
      correction: "L'espace est traversé par la fusée. — Mars est explorée par les astronautes.",
    },
    mot: {
      mot: "Double distributivité",
      nature: "expression, maths",
      definition: "(a + b)(c + d) = ac + ad + bc + bd : chaque terme du 1er facteur multiplie chaque terme du 2e.",
      exemple: "(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6.",
    },
    geste: {
      titre: "Le tableur : formules et fonctions",
      texte: "Des fonctions comme =MOYENNE(A1:A10) ou =SI(...) calculent automatiquement à partir de tes données.",
    },
    defi: {
      enonce: "Développe (x + 4)(x + 6).",
      correction: "x² + 10x + 24.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Dompteur de tempêtes",
    maths: {
      calcul: [
        { q: "7x + 7y =", r: "7(x + y)" },
        { q: "5a + 10 =", r: "5(a + 2)" },
        { q: "3x + 6 =", r: "3(x + 2)" },
        { q: "4x − 8 =", r: "4(x − 2)" },
        { q: "8 × 7 =", r: "56" },
      ],
      probleme: {
        enonce: "L'aire totale de deux panneaux vaut 6x + 9. Factorise cette expression pour trouver une longueur commune.",
        correction: "6x + 9 = 3(2x + 3). Le facteur commun est 3.",
      },
      illu: { emoji: "🌀", label: "tempête de Jupiter" },
    },
    francais: {
      regleTitre: "Discours direct et indirect",
      regle: "Direct : paroles entre guillemets. Indirect : intégrées avec « que », sans guillemets.",
      consigne: "Mets au discours indirect.",
      items: ["Il dit : « Je décolle. »", "Elle demande : « Où va-t-on ? »"],
      correction: "Il dit qu'il décolle. — Elle demande où l'on va.",
    },
    mot: {
      mot: "Facteur commun",
      nature: "expression, maths",
      definition: "Factoriser, c'est mettre en évidence un facteur commun : ka + kb = k(a + b).",
      exemple: "6x + 9 = 3(2x + 3).",
    },
    geste: {
      titre: "Le tableur : un graphique pertinent",
      texte: "On choisit le bon graphique : barres pour comparer, courbe pour une évolution, secteurs pour des parts.",
    },
    defi: {
      enonce: "Factorise 12x + 18.",
      correction: "6(2x + 3).",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Ami des lunes",
    maths: {
      calcul: [
        { q: "2/5 de 15 =", r: "6" },
        { q: "3/4 de 20 =", r: "15" },
        { q: "si AM/AB = 2/5 et AB = 15, AM =", r: "6" },
        { q: "9 × 6 =", r: "54" },
        { q: "100 − 36 =", r: "64" },
      ],
      probleme: {
        enonce: "Deux droites parallèles coupent deux sécantes (Thalès) : AM/AB = 2/3 et AB = 18 cm. Combien vaut AM ?",
        correction: "AM = 2/3 × 18 = 12 cm.",
      },
      illu: { emoji: "🌑", label: "lune de Jupiter" },
    },
    francais: {
      regleTitre: "Le discours indirect libre",
      regle:
        "On rapporte les pensées sans guillemets ni « que », mêlées au récit : « Il regarda Mars. Comme elle était rouge ! ».",
      consigne: "Direct (D), indirect (I) ou indirect libre (IL) ?",
      items: ["Il pensa : « Quel voyage ! »", "Quel voyage, pensa-t-il !", "Il dit que le voyage était long."],
      correction: "D — IL — I.",
    },
    mot: {
      mot: "Théorème de Thalès",
      nature: "expression, maths",
      definition: "Avec deux droites parallèles coupant deux sécantes, les longueurs sont proportionnelles.",
      exemple: "AM/AB = AN/AC = MN/BC.",
    },
    geste: {
      titre: "Un document partagé et collaboratif",
      texte: "Plusieurs personnes écrivent le même document en ligne ; on choisit qui peut lire et qui peut modifier.",
    },
    defi: {
      enonce: "Avec Thalès, AM/AB = 3/4 et AB = 20. Combien vaut AM ?",
      correction: "15 (3/4 de 20).",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Maître de la gravité",
    maths: {
      calcul: [
        { q: "300 000 × 60 =", r: "18000000" },
        { q: "9 × 10 puissance 12 (=) chiffres après le 9 :", r: "12 zéros" },
        { q: "60 × 60 =", r: "3600" },
        { q: "1/2 de 18000000 =", r: "9000000" },
        { q: "7 × 9 =", r: "63" },
      ],
      probleme: {
        enonce: "La lumière va à 300 000 km/s. Quelle distance parcourt-elle en 1 minute (60 s) ?",
        correction: "300 000 × 60 = 18 000 000 km (dix-huit millions de kilomètres).",
      },
      illu: { emoji: "🧲", label: "gravité" },
    },
    francais: {
      regleTitre: "L'accord du participe passé avec avoir",
      regle:
        "Avec avoir, le participe s'accorde avec le COD seulement s'il est placé avant le verbe.",
      consigne: "Accorde le participe passé.",
      items: ["Les planètes qu'il a (visité).", "Il a (vu) les étoiles.", "La photo que j'ai (pris)."],
      correction: "visitées — vu — prise.",
    },
    mot: {
      mot: "Année-lumière",
      nature: "nom, maths",
      definition: "Une année-lumière est la distance parcourue par la lumière en un an : environ 9 500 milliards de km.",
      exemple: "L'étoile la plus proche est à 4 années-lumière.",
    },
    geste: {
      titre: "Algorithme : variables et instructions",
      texte: "Une variable garde une valeur (un score, une position) ; les instructions, dans l'ordre, font avancer le programme.",
    },
    defi: {
      enonce: "La lumière met 8 minutes pour aller du Soleil à la Terre. Quelle distance environ ? (300 000 km/s, 8 min = 480 s)",
      correction: "Environ 144 000 000 km (300 000 × 480).",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Cap sur Saturne",
    maths: {
      calcul: [
        { q: "10 puissance 3 × 10 puissance 4 =", r: "10 puissance 7" },
        { q: "10 puissance 5 ÷ 10 puissance 2 =", r: "10 puissance 3" },
        { q: "(10 puissance 2) puissance 3 =", r: "10 puissance 6" },
        { q: "2 puissance 3 × 2 puissance 2 =", r: "2 puissance 5" },
        { q: "5² =", r: "25" },
      ],
      probleme: {
        enonce: "Saturne est à environ 1,4 × 10 puissance 9 km du Soleil. Écris cette distance en entier.",
        correction: "1,4 × 10 puissance 9 = 1 400 000 000 km (un milliard quatre cents millions).",
      },
      illu: { emoji: "🟠", label: "Jupiter et ses lunes" },
    },
    francais: {
      regleTitre: "Les homophones grammaticaux",
      regle:
        "On choisit selon le sens : quand/quant/qu'en, leur/leurs, quel/qu'elle, ses/ces.",
      consigne: "Complète.",
      items: ["… il décolle, tout vibre (quand/quant).", "… à moi, je reste (quand/quant).", "… belle planète ! (quelle/qu'elle)"],
      correction: "Quand — Quant — Quelle.",
    },
    mot: {
      mot: "Puissance",
      nature: "nom, maths",
      definition: "Lois des puissances : 10^a × 10^b = 10^(a+b) ; 10^a ÷ 10^b = 10^(a−b).",
      exemple: "10 puissance 3 × 10 puissance 4 = 10 puissance 7.",
    },
    geste: {
      titre: "Algorithme : boucles et conditions",
      texte: "Une boucle répète des actions ; une condition (si… alors…) fait des choix. C'est la base de tout programme.",
    },
    defi: {
      enonce: "Combien vaut 10 puissance 6 ÷ 10 puissance 2 ?",
      correction: "10 puissance 4 (soit 10 000).",
    },
  },

  /* ===================== SEMAINE 4 · Saturne ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Voyageur des anneaux",
    maths: {
      calcul: [
        { q: "f(x) = 3x ; f(2) =", r: "6" },
        { q: "f(x) = 3x ; f(5) =", r: "15" },
        { q: "f(x) = 5x ; f(4) =", r: "20" },
        { q: "f(x) = 2x ; f(0) =", r: "0" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Une fonction linéaire vérifie f(2) = 6. Quel est son coefficient, et combien vaut f(10) ?",
        correction: "Coefficient 3 (car f(x) = 3x) ; f(10) = 30.",
      },
      illu: { emoji: "🪐", label: "Saturne" },
    },
    francais: {
      regleTitre: "Les figures de style",
      regle:
        "Comparaison (comme), métaphore, personnification, hyperbole : elles donnent de la force aux images.",
      consigne: "Nomme la figure.",
      items: ["La Lune, ronde comme une pièce.", "Un océan d'étoiles.", "Le vent solaire chante."],
      correction: "comparaison — métaphore — personnification.",
    },
    mot: {
      mot: "Fonction linéaire",
      nature: "expression, maths",
      definition: "Une fonction linéaire s'écrit f(x) = ax : elle traduit une situation proportionnelle.",
      exemple: "f(x) = 3x : f(2) = 6, f(5) = 15.",
    },
    geste: {
      titre: "Déboguer un programme",
      texte: "Quand un programme ne marche pas, on cherche l'erreur (le bug) pas à pas, et on la corrige.",
    },
    defi: {
      enonce: "Une fonction linéaire vérifie f(4) = 20. Combien vaut f(7) ?",
      correction: "35 (coefficient 5, f(x) = 5x).",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Funambule cosmique",
    maths: {
      calcul: [
        { q: "f(x) = 2x + 1 ; f(3) =", r: "7" },
        { q: "f(x) = 2x + 1 ; f(0) =", r: "1" },
        { q: "f(x) = x − 4 ; f(10) =", r: "6" },
        { q: "f(x) = 3x + 2 ; f(1) =", r: "5" },
        { q: "9 × 7 =", r: "63" },
      ],
      probleme: {
        enonce: "Un abonnement coûte 2 € par mois plus 5 € d'inscription : prix(m) = 2m + 5. Combien pour 6 mois ?",
        correction: "2 × 6 + 5 = 17. Dix-sept euros.",
      },
      illu: { emoji: "⭕", label: "anneaux" },
    },
    francais: {
      regleTitre: "Antithèse, gradation, anaphore",
      regle:
        "Antithèse : deux idées opposées. Gradation : intensité croissante. Anaphore : répétition en début de phrases.",
      consigne: "Nomme la figure.",
      items: ["L'ombre et la lumière.", "Il marche, il court, il s'envole.", "Partir, partir, toujours partir."],
      correction: "antithèse — gradation — anaphore.",
    },
    mot: {
      mot: "Fonction affine",
      nature: "expression, maths",
      definition: "Une fonction affine s'écrit f(x) = ax + b (a = coefficient, b = valeur de départ).",
      exemple: "f(x) = 2x + 1 : f(3) = 7.",
    },
    geste: {
      titre: "Comment fonctionne un moteur de recherche",
      texte: "Un algorithme classe des milliards de pages selon leur contenu et leur popularité : les premiers résultats ne sont pas « les vrais ».",
    },
    defi: {
      enonce: "Pour f(x) = 3x + 2, combien vaut f(10) ?",
      correction: "32.",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Lecteur d'orbites",
    maths: {
      calcul: [
        { q: "médiane de 3, 5, 9 =", r: "5" },
        { q: "médiane de 2, 4, 6, 8, 10 =", r: "6" },
        { q: "(3 + 5 + 7) ÷ 3 =", r: "5" },
        { q: "8 × 9 =", r: "72" },
        { q: "1/2 de 50 =", r: "25" },
      ],
      probleme: {
        enonce: "Sept relevés rangés : 3, 5, 8, 8, 9, 12, 20. Quelle est la médiane ?",
        correction: "La médiane est la valeur du milieu (4e sur 7), soit 8.",
      },
      illu: { emoji: "📊", label: "données d'orbite" },
    },
    francais: {
      regleTitre: "Mélioratif et péjoratif",
      regle: "Un terme mélioratif valorise (magnifique) ; un terme péjoratif dévalorise (médiocre).",
      consigne: "Mélioratif (M) ou péjoratif (P) ?",
      items: ["un exploit grandiose", "un travail bâclé", "une vue splendide"],
      correction: "M — P — M.",
    },
    mot: {
      mot: "Médiane",
      nature: "nom, maths",
      definition: "La médiane partage une série rangée en deux moitiés : autant de valeurs au-dessus qu'en dessous.",
      exemple: "Pour 3, 5, 8, 9, 12 : la médiane est 8.",
    },
    geste: {
      titre: "Les bulles de filtres",
      texte: "Les sites te montrent surtout ce qui te plaît : attention à ne pas voir qu'un seul point de vue.",
    },
    defi: {
      enonce: "Quelle est la médiane de 4, 7, 7, 10, 13 ?",
      correction: "7 (la valeur du milieu).",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Statisticien des étoiles",
    maths: {
      calcul: [
        { q: "(10 + 12 + 14) ÷ 3 =", r: "12" },
        { q: "étendue de 6 et 20 =", r: "14" },
        { q: "(8 + 8 + 8 + 8) ÷ 4 =", r: "8" },
        { q: "9 × 8 =", r: "72" },
        { q: "1/4 de 80 =", r: "20" },
      ],
      probleme: {
        enonce: "Cinq jours d'observation : 4, 6, 6, 9, 5 étoiles filantes. Quelle est la moyenne ?",
        correction: "(4 + 6 + 6 + 9 + 5) ÷ 5 = 30 ÷ 5 = 6 étoiles filantes en moyenne.",
      },
      illu: { emoji: "✨", label: "étoiles filantes" },
    },
    francais: {
      regleTitre: "L'étymologie et la formation des mots",
      regle:
        "Racines grecques et latines : « astro » = étoile, « naut » = navigateur → astronaute.",
      consigne: "Que signifie la racine ?",
      items: ["astro-", "géo-", "-naute"],
      correction: "étoile — Terre — navigateur.",
    },
    mot: {
      mot: "Étendue",
      nature: "nom, maths",
      definition: "L'étendue d'une série est l'écart entre la plus grande et la plus petite valeur.",
      exemple: "Pour 4, 6, 9 : étendue = 9 − 4 = 5.",
    },
    geste: {
      titre: "L'intelligence artificielle : forces et limites",
      texte: "Une IA aide vite, mais elle peut se tromper ou inventer : elle assiste, elle ne décide pas à ta place.",
    },
    defi: {
      enonce: "Moyenne de 11, 13 et 18 ?",
      correction: "14 (42 ÷ 3).",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Cap sur les confins",
    maths: {
      calcul: [
        { q: "P(6) sur un dé =", r: "1/6" },
        { q: "P(pile) =", r: "1/2" },
        { q: "P(pair sur un dé) =", r: "1/2" },
        { q: "P(rouge ; 2 sur 8) =", r: "1/4" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Une boîte contient 4 boules vertes et 6 bleues. Quelle est la probabilité de tirer une verte ?",
        correction: "4 chances sur 10, soit 4/10 = 2/5.",
      },
      illu: { emoji: "🪐", label: "anneaux de Saturne" },
    },
    francais: {
      regleTitre: "Les registres littéraires",
      regle:
        "Comique (faire rire), tragique (fatalité), pathétique (émouvoir), épique (exploits).",
      consigne: "Quel registre ?",
      items: ["Le héros affronte mille dangers.", "Hélas, tout est perdu.", "Il glisse sur une peau de banane."],
      correction: "épique — tragique — comique.",
    },
    mot: {
      mot: "Probabilité",
      nature: "nom, maths",
      definition: "La probabilité mesure la chance qu'un événement se produise, entre 0 et 1.",
      exemple: "Tirer une verte parmi 4 vertes sur 10 : 2/5.",
    },
    geste: {
      titre: "Vérifier une réponse d'IA, éviter le plagiat",
      texte: "On vérifie ce qu'une IA répond avec d'autres sources, et on réécrit avec ses mots : copier sans comprendre, c'est tricher.",
    },
    defi: {
      enonce: "On tire une carte au hasard dans un jeu de 52. Quelle est la probabilité d'obtenir un cœur ?",
      correction: "13/52 = 1/4.",
    },
  },

  /* ===================== SEMAINE 5 · Les confins ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Explorateur glacé",
    maths: {
      calcul: [
        { q: "diviseurs communs de 12 et 18 : le + grand =", r: "6" },
        { q: "PGCD(8, 12) =", r: "4" },
        { q: "PGCD(15, 25) =", r: "5" },
        { q: "24 ÷ 6 =", r: "4" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Ti Margo a 12 capteurs et 18 batteries ; il veut faire des lots identiques sans reste. Combien de lots au maximum ?",
        correction: "PGCD(12, 18) = 6. Il peut faire 6 lots (2 capteurs et 3 batteries chacun).",
      },
      illu: { emoji: "🧊", label: "planète glacée" },
    },
    francais: {
      regleTitre: "Le vers et les rimes",
      regle:
        "Les rimes se répondent en fin de vers : suivies (AABB), croisées (ABAB), embrassées (ABBA).",
      consigne: "Quel type de rimes ?",
      items: ["-oir, -oir, -eau, -eau", "-ant, -on, -ant, -on", "-er, -is, -is, -er"],
      correction: "AABB (suivies) — ABAB (croisées) — ABBA (embrassées).",
    },
    mot: {
      mot: "PGCD",
      nature: "nom, maths",
      definition: "Le PGCD est le plus grand diviseur commun à deux nombres.",
      exemple: "PGCD(12, 18) = 6.",
    },
    geste: {
      titre: "Les deepfakes et images générées",
      texte: "Des images et vidéos truquées par IA semblent réelles : on se méfie, surtout si elles surprennent ou choquent.",
    },
    defi: {
      enonce: "Quel est le PGCD de 84 et 120 ?",
      correction: "12 (84 = 2²×3×7, 120 = 2³×3×5, commun : 2²×3 = 12).",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Chasseur de comètes",
    maths: {
      calcul: [
        { q: "7 est-il premier ? (oui/non)", r: "oui" },
        { q: "9 est-il premier ?", r: "non" },
        { q: "le plus petit nombre premier =", r: "2" },
        { q: "13 est-il premier ?", r: "oui" },
        { q: "8 × 9 =", r: "72" },
      ],
      probleme: {
        enonce: "Décompose 60 en produit de facteurs premiers.",
        correction: "60 = 2 × 2 × 3 × 5 = 2² × 3 × 5.",
      },
      illu: { emoji: "☄️", label: "comète" },
    },
    francais: {
      regleTitre: "Strophes et rythme",
      regle:
        "Une strophe groupe des vers : distique (2), tercet (3), quatrain (4).",
      consigne: "Comment s'appelle une strophe de…",
      items: ["4 vers →", "3 vers →", "2 vers →"],
      correction: "quatrain — tercet — distique.",
    },
    mot: {
      mot: "Nombre premier",
      nature: "nom, maths",
      definition: "Un nombre premier n'a que deux diviseurs : 1 et lui-même.",
      exemple: "2, 3, 5, 7, 11… sont premiers ; 9 ne l'est pas (9 = 3 × 3).",
    },
    geste: {
      titre: "La désinformation et l'esprit critique",
      texte: "Face à une info spectaculaire, on croise les sources et on se méfie des thèses qui « expliquent tout » trop simplement.",
    },
    defi: {
      enonce: "Combien y a-t-il de nombres premiers inférieurs à 20 ?",
      correction: "8 : 2, 3, 5, 7, 11, 13, 17, 19.",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Géomètre du vide",
    maths: {
      calcul: [
        { q: "9² + 12² =", r: "225" },
        { q: "15² =", r: "225" },
        { q: "5² + 12² =", r: "169" },
        { q: "13² =", r: "169" },
        { q: "racine de 144 =", r: "12" },
      ],
      probleme: {
        enonce: "Un triangle a des côtés de 9, 12 et 15. Est-il rectangle ? Justifie avec la réciproque de Pythagore.",
        correction: "9² + 12² = 81 + 144 = 225 = 15². L'égalité est vraie, donc le triangle est rectangle.",
      },
      illu: { emoji: "📐", label: "triangle" },
    },
    francais: {
      regleTitre: "Argumenter : thèse et arguments",
      regle:
        "La thèse est l'idée défendue ; les arguments la justifient ; les exemples l'illustrent.",
      consigne: "Thèse, argument ou exemple ?",
      items: ["Voyager ouvre l'esprit.", "On y découvre d'autres cultures.", "Ainsi, Ti Margo a appris le japonais."],
      correction: "thèse — argument — exemple.",
    },
    mot: {
      mot: "Réciproque de Pythagore",
      nature: "expression, maths",
      definition: "Si, dans un triangle, le carré du plus grand côté = la somme des carrés des deux autres, alors il est rectangle.",
      exemple: "9² + 12² = 15² → triangle rectangle.",
    },
    geste: {
      titre: "Le cyberharcèlement (loi et réaction)",
      texte: "Le cyberharcèlement est puni par la loi. On garde des preuves, on ne répond pas, on bloque, on signale, on en parle.",
    },
    defi: {
      enonce: "Un triangle a des côtés de 8, 15 et 17. Est-il rectangle ?",
      correction: "Oui : 8² + 15² = 64 + 225 = 289 = 17².",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Trigonaute",
    maths: {
      calcul: [
        { q: "adjacent 8, hyp 10 → cos =", r: "0,8" },
        { q: "opposé 6, hyp 10 → sin =", r: "0,6" },
        { q: "20 × 0,5 =", r: "10" },
        { q: "sin 30° =", r: "0,5" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Une rampe de lancement fait un angle de 30° avec le sol. Elle mesure 20 m. Sa hauteur = 20 × sin 30°. Combien ?",
        correction: "20 × sin 30° = 20 × 0,5 = 10. La rampe atteint 10 m de haut.",
      },
      illu: { emoji: "📐", label: "rampe et angle" },
    },
    francais: {
      regleTitre: "Les connecteurs logiques",
      regle:
        "Ils structurent un raisonnement : d'abord, ensuite, enfin ; car, donc, cependant, en effet.",
      consigne: "Quel rôle ?",
      items: ["cependant", "donc", "en effet"],
      correction: "opposition — conséquence — explication.",
    },
    mot: {
      mot: "Sinus",
      nature: "nom, maths",
      definition: "Dans un triangle rectangle, le sinus d'un angle = côté opposé ÷ hypoténuse.",
      exemple: "sin 30° = 0,5.",
    },
    geste: {
      titre: "La nétiquette et l'e-mail",
      texte: "Un e-mail poli a un objet clair, une formule d'appel et de politesse : utile au collège comme plus tard.",
    },
    defi: {
      enonce: "Une tour projette une ombre de 8 m quand un bâton de 1 m projette une ombre de 0,5 m. Quelle est la hauteur de la tour ?",
      correction: "16 m (proportionnalité : 8 ÷ 0,5 = 16).",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Cap sur les étoiles",
    maths: {
      calcul: [
        { q: "volume ×2³ si rayon ×2 =", r: "×8" },
        { q: "2 × 2 × 2 =", r: "8" },
        { q: "3 × 3 × 3 =", r: "27" },
        { q: "3,14 × 100 =", r: "314" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Une planète sphérique voit son rayon doublé. Par combien son volume est-il multiplié ?",
        correction: "Par 8, car le volume d'une sphère dépend du cube du rayon (2³ = 8).",
      },
      illu: { emoji: "🌟", label: "étoile" },
    },
    francais: {
      regleTitre: "Écrire « je » : lettre et autobiographie",
      regle:
        "Dans une lettre ou un récit autobiographique, on écrit à la 1re personne, avec un destinataire ou des souvenirs.",
      consigne: "Autobiographie, récit ou lettre ?",
      items: ["Je me souviens de mon premier vol.", "Il décolla sans un mot.", "Cher ami, je t'écris de Mars."],
      correction: "autobiographie — récit — lettre.",
    },
    mot: {
      mot: "Sphère",
      nature: "nom, maths",
      definition: "La sphère est la surface d'une boule ; son volume dépend du cube du rayon.",
      exemple: "Rayon doublé → volume ×8.",
    },
    geste: {
      titre: "L'empreinte écologique du numérique",
      texte: "Vidéos, stockage, e-mails consomment de l'énergie : trier ses fichiers et limiter le streaming inutile, ça aide la planète.",
    },
    defi: {
      enonce: "Si on triple l'arête d'un cube, par combien son volume est-il multiplié ?",
      correction: "Par 27 (3³).",
    },
  },

  /* ===================== SEMAINE 6 · Les étoiles, puis retour ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Voyageur de lumière",
    maths: {
      calcul: [
        { q: "2 × 10 puissance 11 = ? zéros", r: "11 zéros" },
        { q: "9 500 milliards (≈) =", r: "9,5 × 10 puissance 12" },
        { q: "10 puissance 9 =", r: "1 milliard" },
        { q: "4 × 9 500 =", r: "38000" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "Notre galaxie compte environ 2 × 10 puissance 11 étoiles. Écris ce nombre en entier.",
        correction: "200 000 000 000, soit deux cents milliards d'étoiles.",
      },
      illu: { emoji: "💡", label: "lumière des étoiles" },
    },
    francais: {
      regleTitre: "La réécriture (exercice du brevet)",
      regle:
        "On transforme un texte : changer le temps, la personne ou le nombre, en gardant tous les accords.",
      consigne: "Réécris au pluriel : « Il regarde l'étoile qui brille. »",
      items: ["Il regarde l'étoile qui brille. →"],
      correction: "Ils regardent les étoiles qui brillent.",
    },
    mot: {
      mot: "Ordre de grandeur",
      nature: "expression, maths",
      definition: "L'ordre de grandeur est la puissance de 10 la plus proche d'un nombre.",
      exemple: "2 × 10 puissance 11 : ordre de grandeur 10 puissance 11.",
    },
    geste: {
      titre: "Sauvegarder et archiver",
      texte: "On sauvegarde souvent, dans le cloud et hors ligne, et on garde des versions : un fichier perdu peut être irremplaçable.",
    },
    defi: {
      enonce: "L'étoile la plus proche est à 4 années-lumière. À 1/10 000 de la vitesse de la lumière, combien de temps pour l'atteindre ?",
      correction: "40 000 ans (4 × 10 000).",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Astronome confirmé",
    maths: {
      calcul: [
        { q: "2x + 3 = 11 → x =", r: "4" },
        { q: "x + x + 2 = 10 → x =", r: "4" },
        { q: "3(x + 1) = 18 → x =", r: "5" },
        { q: "5x − 5 = 20 → x =", r: "5" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Deux capteurs identiques et un boîtier de 200 g pèsent 900 g en tout. Quelle est la masse d'un capteur ? (mets en équation)",
        correction: "2x + 200 = 900 → 2x = 700 → x = 350. Un capteur pèse 350 g.",
      },
      illu: { emoji: "🔭", label: "télescope" },
    },
    francais: {
      regleTitre: "La ponctuation du dialogue",
      regle:
        "On ouvre les guillemets, et on va à la ligne avec un tiret (—) à chaque changement de personne.",
      consigne: "Quels signes pour un dialogue ?",
      items: ["pour encadrer le dialogue →", "pour changer de personne →"],
      correction: "les guillemets (« ») — le tiret (—).",
    },
    mot: {
      mot: "Mise en équation",
      nature: "expression, maths",
      definition: "Mettre en équation, c'est traduire un problème par une égalité avec une inconnue.",
      exemple: "« 2 objets et 200 g font 900 g » → 2x + 200 = 900.",
    },
    geste: {
      titre: "Les formats ouverts",
      texte: "Un format ouvert (.pdf, .odt) s'ouvre partout, sans logiciel payant : pratique pour partager durablement.",
    },
    defi: {
      enonce: "La somme de trois nombres pairs consécutifs vaut 78. Quels sont-ils ?",
      correction: "24, 26 et 28 (le milieu est 78 ÷ 3 = 26).",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "Bâtisseur de maquettes",
    maths: {
      calcul: [
        { q: "50 ÷ 50 =", r: "1" },
        { q: "50³ =", r: "125000" },
        { q: "100 000 ÷ 125 000 =", r: "0,8" },
        { q: "aire ÷ 50² =", r: "÷ 2500" },
        { q: "8 × 7 =", r: "56" },
      ],
      probleme: {
        enonce: "Une maquette de fusée est à l'échelle 1/50. La vraie fusée mesure 50 m de haut. Quelle est la hauteur de la maquette ?",
        correction: "50 ÷ 50 = 1. La maquette mesure 1 m.",
      },
      illu: { emoji: "🛸", label: "maquette" },
    },
    francais: {
      regleTitre: "Enrichir une phrase",
      regle:
        "On ajoute des expansions (adjectif, complément du nom, relative) et des subordonnées pour préciser.",
      consigne: "Enrichis avec deux précisions : « La fusée décolle. »",
      items: ["La fusée décolle. →"],
      correction: "Par exemple : « La fusée argentée, que tous attendaient, décolle dans un grand bruit. »",
    },
    mot: {
      mot: "Échelle",
      nature: "nom, maths",
      definition: "Dans une réduction au 1/k, les longueurs sont divisées par k, et les volumes par k³.",
      exemple: "Échelle 1/50 : 50 m → 1 m.",
    },
    geste: {
      titre: "Sa trace numérique et son avenir",
      texte: "Tes traces en ligne durent : ce que tu publies aujourd'hui peut compter pour ton orientation et tes études demain.",
    },
    defi: {
      enonce: "À l'échelle 1/50, la vraie fusée contient 100 000 L. Quel volume contient la maquette ? (÷ 50³)",
      correction: "0,8 L (100 000 ÷ 125 000).",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Presque en 3ᵉ",
    maths: {
      calcul: [
        { q: "−3 + 5 × 2 =", r: "7" },
        { q: "(−2)² + 3 =", r: "7" },
        { q: "2 puissance 3 − 1 =", r: "7" },
        { q: "10 − 2 × (3 + 1) =", r: "2" },
        { q: "racine de 81 =", r: "9" },
      ],
      probleme: {
        enonce: "Calcule en respectant les priorités : 5 + 2 × (3² − 4).",
        correction: "3² = 9 ; 9 − 4 = 5 ; 2 × 5 = 10 ; 5 + 10 = 15.",
      },
      illu: { emoji: "🌍", label: "Terre vue de l'espace" },
    },
    francais: {
      regleTitre: "Révision : verbes irréguliers",
      regle: "Faire, aller, venir, prendre, vouloir, pouvoir : à connaître par cœur.",
      consigne: "Conjugue au présent (3e personne du singulier).",
      items: ["faire →", "aller →", "venir →"],
      correction: "il fait — il va — il vient.",
    },
    mot: {
      mot: "Priorités opératoires",
      nature: "expression, maths",
      definition: "On calcule d'abord les parenthèses et les puissances, puis × et ÷, enfin + et −.",
      exemple: "5 + 2 × (3² − 4) = 5 + 2 × 5 = 15.",
    },
    geste: {
      titre: "Être un citoyen numérique responsable",
      texte: "Vérifier, protéger ses données, respecter les autres, garder l'esprit critique : c'est tout l'enjeu de Pix.",
    },
    defi: {
      enonce: "Calcule (−3)² − 2 × (−4).",
      correction: "17 (9 + 8).",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour la 3ᵉ ! 🎓",
    maths: {
      calcul: [
        { q: "1 + 10 + 100 + 1000 + 10000 =", r: "11111" },
        { q: "3/4 de 200 =", r: "150" },
        { q: "−10 + 25 =", r: "15" },
        { q: "2 puissance 5 =", r: "32" },
        { q: "15 % de 300 =", r: "45" },
      ],
      probleme: {
        enonce: "Le voyage de Ti Margo a grandi à chaque cahier : île, océan, monde, espace. S'il a parcouru 1, puis 10, puis 100, puis 1 000, puis 10 000 unités, quelle distance totale ?",
        correction: "1 + 10 + 100 + 1 000 + 10 000 = 11 111 unités.",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Le grand bilan (cap sur le brevet)",
      regle:
        "Tu sais analyser, conjuguer, argumenter, reconnaître les figures et réécrire : tu es prêt pour la 3ᵉ et le brevet !",
      consigne: "Rédige un court paragraphe argumenté (3-4 phrases) : « Pourquoi voyager — vraiment ou en lisant — fait-il grandir ? »",
      items: ["(à toi d'écrire !)"],
      correction: "Réponse libre — une thèse claire, deux arguments, un exemple, des connecteurs, et des accords soignés.",
    },
    mot: {
      mot: "Bilan",
      nature: "nom",
      definition: "Faire le bilan, c'est mesurer le chemin parcouru et tout ce qu'on a appris.",
      exemple: "Quel beau bilan : direction la 3ᵉ et le brevet !",
    },
    geste: {
      titre: "Prêt pour la certification Pix",
      texte: "Recherche, sources, sécurité, données, code, citoyenneté : tu as fait le tour des compétences de Pix. Bravo !",
    },
    defi: {
      enonce: "Combien d'escales Ti Margo a-t-il faites dans le système solaire ?",
      correction: "6 escales (une par semaine), de la Lune aux étoiles.",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — pour les élèves HPI : raisonnement,         */
/*  arithmétique, dénombrement, énigmes — niveau brevet et au-delà. Plusieurs */
/*  sont teintés d'astronomie (vitesse de la lumière, gravité, échelles).     */
/* -------------------------------------------------------------------------- */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce: "La lumière met environ 1,28 seconde pour aller de la Terre à la Lune (384 000 km). Estime la vitesse de la lumière, en km/s.",
    correction: "Environ 300 000 km/s. (384 000 ÷ 1,28 ≈ 300 000.)",
  },
  2: {
    enonce: "Un nombre, multiplié par lui-même, donne 529. Quel est ce nombre ? (sans calculatrice : encadre-le d'abord)",
    correction: "23. (20² = 400, 25² = 625 ; en essayant, 23² = 529.)",
  },
  3: {
    enonce: "Combien d'entiers de 1 à 100 sont divisibles par 3 ou par 5 ?",
    correction: "47. (Par 3 : 33 ; par 5 : 20 ; par 15 : 6 ; 33 + 20 − 6 = 47.)",
  },
  4: {
    enonce: "Une fusée accélère : 1 km la 1re seconde, 3 km la 2e, 5 km la 3e… (les nombres impairs). Quelle distance totale après 10 secondes ?",
    correction: "100 km. (La somme des n premiers nombres impairs vaut n² : 10² = 100.)",
  },
  5: {
    enonce: "Deux vaisseaux quittent le même point en sens opposés, l'un à 8 km/s, l'autre à 12 km/s. Après combien de temps sont-ils à 1 000 km l'un de l'autre ?",
    correction: "50 s. (Ils s'éloignent à 8 + 12 = 20 km/s ; 1 000 ÷ 20 = 50.)",
  },
  6: {
    enonce: "Quel est le chiffre des unités de 7 puissance 100 ?",
    correction: "1. (Les unités de 7 puissance n suivent le cycle 7, 9, 3, 1 ; comme 100 est multiple de 4, on retombe sur 1.)",
  },
  7: {
    enonce: "Un prix baisse de 25 %. De quel pourcentage faut-il l'augmenter ensuite pour revenir au prix de départ ?",
    correction: "D'environ 33,3 %. (× 0,75 puis il faut × 4/3 pour revenir, soit + 33 %.)",
  },
  8: {
    enonce: "Sur une lune lointaine, la température passe de −18 °C à −53 °C en une nuit. De combien de degrés a-t-elle baissé ?",
    correction: "De 35 °C. (−53 − (−18) = −35.)",
  },
  9: {
    enonce: "Dans un triangle rectangle, un angle aigu vaut 30°. Montre, sans calculatrice, que le côté opposé à cet angle vaut la moitié de l'hypoténuse.",
    correction: "Un triangle rectangle d'angle 30° est la moitié d'un triangle équilatéral : le côté opposé au 30° est la moitié du côté de ce triangle, c'est-à-dire la moitié de l'hypoténuse.",
  },
  10: {
    enonce: "Une image de Jupiter est agrandie : chaque longueur est multipliée par 5. Par combien son aire est-elle multipliée ?",
    correction: "Par 25 (5²).",
  },
  11: {
    enonce: "Développe et réduis (x + 3)(x + 2) − x².",
    correction: "5x + 6. ((x² + 5x + 6) − x² = 5x + 6.)",
  },
  12: {
    enonce: "Factorise puis simplifie : (14x + 21) ÷ 7.",
    correction: "2x + 3. (14x + 21 = 7(2x + 3) ; ÷ 7 = 2x + 3.)",
  },
  13: {
    enonce: "Avec Thalès : AM = 6, AB = 15 et BC = 20. Les droites (MN) et (BC) sont parallèles. Combien vaut MN ?",
    correction: "8. (AM/AB = 6/15 = 2/5 ; MN = 2/5 × 20 = 8.)",
  },
  14: {
    enonce: "L'étoile Proxima est à 4 années-lumière. Une année-lumière vaut environ 9 500 milliards de km. À combien de km est Proxima, en notation scientifique ?",
    correction: "Environ 3,8 × 10 puissance 13 km. (4 × 9,5 × 10 puissance 12 = 38 × 10 puissance 12 = 3,8 × 10 puissance 13.)",
  },
  15: {
    enonce: "Combien vaut 2 puissance 10 × 5 puissance 10 ? (astuce : regroupe les facteurs)",
    correction: "10 puissance 10, soit 10 milliards. (2 puissance 10 × 5 puissance 10 = (2 × 5) puissance 10 = 10 puissance 10.)",
  },
  16: {
    enonce: "Une fonction linéaire vérifie f(6) = 15. Combien vaut f(10) ?",
    correction: "25. (Coefficient 15 ÷ 6 = 2,5 ; f(10) = 2,5 × 10 = 25.)",
  },
  17: {
    enonce: "Une fonction affine vérifie f(0) = 2 et f(1) = 5. Donne f(x), puis f(10).",
    correction: "f(x) = 3x + 2 ; f(10) = 32. (b = f(0) = 2 ; a = 5 − 2 = 3.)",
  },
  18: {
    enonce: "Pour la série 3, 5, 8, 8, 9, 12, 20, donne la médiane et la moyenne. Laquelle est la plus grande, et pourquoi ?",
    correction: "Médiane 8 ; moyenne 65 ÷ 7 ≈ 9,3. La moyenne est plus grande, car la valeur extrême 20 la « tire » vers le haut.",
  },
  19: {
    enonce: "Dans une série, on ajoute une valeur égale à la moyenne actuelle. La moyenne change-t-elle ? Justifie.",
    correction: "Non, elle reste identique : on ajoute autant au total qu'au nombre de valeurs, dans la même proportion.",
  },
  20: {
    enonce: "On lance deux dés et on multiplie les résultats. Quelle est la probabilité d'obtenir un produit pair ?",
    correction: "3/4. (Le produit est impair seulement si les deux dés sont impairs : 3 × 3 = 9 cas sur 36 = 1/4 ; donc pair = 1 − 1/4 = 3/4.)",
  },
  21: {
    enonce: "Ti Margo veut ranger 60 capteurs et 84 batteries en lots identiques, sans reste. Quel est le plus grand nombre de lots ?",
    correction: "12. (PGCD(60, 84) = 12 : chaque lot a 5 capteurs et 7 batteries.)",
  },
  22: {
    enonce: "Décompose 360 en produit de facteurs premiers.",
    correction: "360 = 2 puissance 3 × 3² × 5. (2 × 2 × 2 × 3 × 3 × 5.)",
  },
  23: {
    enonce: "Un triangle a des côtés 20, 21 et 29. Est-il rectangle ? Justifie.",
    correction: "Oui. (20² + 21² = 400 + 441 = 841 = 29² : d'après la réciproque de Pythagore, il est rectangle.)",
  },
  24: {
    enonce: "Une tour de 30 m projette une ombre de 18 m. Au même instant, un bâton projette une ombre de 1,2 m. Quelle est la hauteur du bâton ?",
    correction: "2 m. (30/18 = h/1,2 → h = 30 × 1,2 ÷ 18 = 2.)",
  },
  25: {
    enonce: "Une planète a un rayon double de celui d'une autre. Combien de fois plus de matière (volume) peut-elle contenir ?",
    correction: "8 fois. (Le volume d'une sphère dépend du cube du rayon : 2³ = 8.)",
  },
  26: {
    enonce: "On estime le nombre d'étoiles de l'univers observable à environ 10 puissance 22. Si on en comptait 1 000 par seconde, combien de temps faudrait-il (en années, ordre de grandeur) ?",
    correction: "Environ 3 × 10 puissance 11 ans, soit des centaines de milliards d'années. (10 puissance 22 ÷ 1 000 = 10 puissance 19 s ; ÷ 31 millions de s par an ≈ 3 × 10 puissance 11 ans.)",
  },
  27: {
    enonce: "Le double de l'âge de Ti Margo, augmenté de 5, égale son âge augmenté de 19. Quel âge a-t-il ?",
    correction: "14 ans. (2x + 5 = x + 19 → x = 14.)",
  },
  28: {
    enonce: "Une maquette est au 1/20 d'un satellite. Le vrai satellite a un volume de 16 000 L. Quel est le volume de la maquette ?",
    correction: "2 L. (Volume divisé par 20³ = 8 000 ; 16 000 ÷ 8 000 = 2 L.)",
  },
  29: {
    enonce: "Quel est le chiffre des unités du produit 1 × 2 × 3 × … × 10 ?",
    correction: "0. (Le produit contient les facteurs 2 et 5, donc 10 : il se termine par un zéro — en réalité par deux zéros.)",
  },
  30: {
    enonce: "Ti Margo a écrit un journal sur 4 cahiers (CM2, 6e, 5e, 4e), puis celui-ci (3e). S'il a écrit 30 pages par cahier, et qu'il relit tout en 5 minutes par cahier, combien de pages a-t-il écrites, et combien de temps pour tout relire ?",
    correction: "150 pages (5 × 30) ; 25 minutes de relecture (5 × 5).",
  },
};

/* Le carnet de Ti Margo — récit doux et émerveillé, escale après escale. */
export const carnet: Record<number, string> = {
  1: "Le plus grand voyage de tous commence aujourd'hui : je pars dans l'espace ! La fusée gronde, je suis cloué à mon siège, puis… la Terre rapetisse sous moi, toute bleue. C'est bouleversant. Tu montes à bord avec moi ?",
  2: "Je pose le pied sur la Lune ! Le sol est gris et poudreux, mes pas y restent gravés. Je bondis sans effort : ici, on pèse six fois moins. Quel silence, et quelle vue sur la Terre !",
  3: "Depuis la navette, je regarde notre planète tourner lentement. De si loin, plus de frontières : juste un monde bleu et fragile. On a tous la même maison.",
  4: "Je vérifie chaque instrument avant le grand saut vers Mars. Dans l'espace, la moindre erreur compte : je calcule, je recalcule. La rigueur, c'est ma sécurité.",
  5: "Adieu la Lune ! Le moteur s'allume, direction la planète rouge. Devant moi, des millions de kilomètres de vide étoilé. L'aventure ne fait que commencer.",
  6: "Mars enfin ! Tout est rouge : le sable, les rochers, même le ciel au coucher du soleil. Je roule doucement sur ce désert silencieux, le cœur battant.",
  7: "J'examine une drôle de roche, striée comme du bois. Mars a peut-être connu des rivières, autrefois. Imagine : de l'eau, ici, il y a très longtemps !",
  8: "La nuit tombe et le froid devient mordant : bien en dessous de zéro. Je me blottis dans la base, et je note tout. Un explorateur n'oublie aucun détail.",
  9: "Je dresse une carte du ciel martien. Deux petites lunes filent au-dessus de moi, Phobos et Deimos. Tout est nouveau, tout est à nommer.",
  10: "Dernier regard sur Mars avant de repartir. Là-bas brille un point énorme : Jupiter, la géante. Je n'en reviens pas de la distance à parcourir !",
  11: "Jupiter ! Elle est si grande qu'on y mettrait mille Terres. Ses bandes de nuages tourbillonnent comme une immense peinture vivante. Je reste sans voix.",
  12: "Une tempête plus large que notre planète tourne depuis des siècles : la Grande Tache rouge. La nature, ici, dépasse tout ce que j'imaginais.",
  13: "Jupiter a des dizaines de lunes ! Je m'approche d'Europe, couverte de glace. Dessous, peut-être, un océan caché. Et peut-être… la vie ?",
  14: "Je sens à peine la gravité changer près de la géante. Tout est question de masse et de distance. L'univers obéit à des lois si élégantes !",
  15: "Je quitte Jupiter, ébloui. Au loin scintille un anneau de lumière : Saturne approche. Chaque escale est plus belle que la précédente.",
  16: "Saturne ! Ses anneaux sont d'une beauté à couper le souffle, faits de milliards de morceaux de glace. On dirait un bijou suspendu dans le noir.",
  17: "Je longe les anneaux, prudemment, comme un funambule. Ils sont larges comme le ciel, mais minces comme une feuille. La nature est pleine de surprises.",
  18: "Je note les positions des lunes de Saturne, nuit après nuit. Mettre de l'ordre dans le ciel, c'est déjà commencer à le comprendre.",
  19: "Une pluie d'étoiles filantes traverse mon hublot. J'en compte, j'en compte… puis j'arrête, et je me contente d'admirer. Certains moments ne se calculent pas.",
  20: "Je m'éloigne de Saturne vers les confins glacés. Le Soleil n'est plus qu'une petite étoile parmi d'autres. Comme nous sommes petits, et chanceux !",
  21: "Aux confins du système solaire, tout est sombre et gelé. Neptune, d'un bleu profond, veille seule dans le froid. Quel calme étrange et magnifique.",
  22: "Une comète passe en traînant sa longue chevelure lumineuse. Elle vient de très loin et repartira pour des milliers d'années. Quelle vie de voyageuse !",
  23: "Je trace des figures dans le vide pour me repérer : triangles, angles, distances. Même au bout du monde, la géométrie reste mon amie.",
  24: "Je calcule l'angle exact pour viser ma prochaine trajectoire. Un petit angle, une immense différence à l'arrivée. La précision, encore et toujours.",
  25: "Devant moi, plus de planètes : seulement les étoiles, par milliards. Je prends une grande inspiration. Et si je faisais un petit saut jusqu'à elles ?",
  26: "Filer entre les étoiles… La lumière de certaines est partie il y a des millions d'années. En les regardant, je vois le passé de l'univers. Vertigineux !",
  27: "Mon télescope capte une galaxie lointaine, en spirale. Des milliards d'étoiles, et peut-être d'autres Ti Margo qui rêvent, là-bas. Qui sait ?",
  28: "Il est temps de rentrer. Je range mes maquettes et mes carnets. J'emporte dans ma tête plus d'images que je ne pourrai jamais en dessiner.",
  29: "La Terre réapparaît, petite bille bleue de plus en plus grande. Quelle joie de revenir ! Je me sens grandi, prêt pour la 3ᵉ… et pour le brevet.",
  30: "De retour, les pieds sur Terre et la tête dans les étoiles. Île, océan, monde, espace : quel chemin parcouru ensemble ! Te voilà prêt pour la 3ᵉ. Merci d'avoir voyagé avec moi jusqu'au bout : on a réussi, ensemble ! 🎓",
};

/* « Le savais-tu ? » — ancrage local 🌺 / ouverture monde 🌍, au fil du voyage. */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "local", texte: "À La Réunion, l'observatoire des Makes et le site du Maïdo profitent d'un ciel très pur : on y observe magnifiquement les étoiles." },
  2: { portee: "monde", texte: "Sur la Lune, on pèse environ 6 fois moins que sur Terre : un astronaute peut y faire de grands bonds." },
  3: { portee: "monde", texte: "Vue de l'espace, la Terre est surnommée « la bille bleue » : les océans couvrent plus de 70 % de sa surface." },
  4: { portee: "monde", texte: "Dans l'espace, il n'y a pas d'air : le son ne s'y propage pas. C'est le silence absolu." },
  5: { portee: "monde", texte: "Mars est parfois appelée la planète rouge à cause de la rouille (oxyde de fer) qui colore son sol." },
  6: { portee: "monde", texte: "Une journée sur Mars dure presque comme sur Terre : environ 24 h 37 min." },
  7: { portee: "monde", texte: "Des traces de rivières asséchées prouvent que de l'eau liquide a coulé sur Mars il y a très longtemps." },
  8: { portee: "monde", texte: "Sur Mars, les nuits peuvent descendre à −80 °C : il y fait bien plus froid que dans nos hivers." },
  9: { portee: "monde", texte: "Mars a deux petites lunes, Phobos et Deimos, dont les noms grecs signifient « peur » et « terreur »." },
  10: { portee: "local", texte: "Depuis La Réunion, dans l'hémisphère sud, on voit des étoiles invisibles d'Europe, comme la Croix du Sud." },
  11: { portee: "monde", texte: "Jupiter est si grande qu'elle pourrait contenir plus de 1 300 planètes Terre." },
  12: { portee: "monde", texte: "La Grande Tache rouge de Jupiter est une tempête plus large que la Terre, qui dure depuis des siècles." },
  13: { portee: "monde", texte: "Jupiter possède plus de 90 lunes connues ; l'une d'elles, Europe, cacherait un océan sous sa glace." },
  14: { portee: "monde", texte: "C'est la gravité, la même force qui fait tomber une pomme, qui retient les planètes autour du Soleil." },
  15: { portee: "monde", texte: "La lumière du Soleil met environ 8 minutes pour nous parvenir : on voit toujours le Soleil tel qu'il était 8 minutes plus tôt." },
  16: { portee: "monde", texte: "Les anneaux de Saturne sont faits de milliards de morceaux de glace et de roche, du grain de sable à la maison." },
  17: { portee: "monde", texte: "Les anneaux de Saturne s'étendent sur des centaines de milliers de km, mais ne font parfois que quelques mètres d'épaisseur." },
  18: { portee: "monde", texte: "Saturne compte plus de 140 lunes connues : c'est la planète qui en a le plus dans le système solaire." },
  19: { portee: "local", texte: "Les étoiles filantes sont de minuscules poussières qui brûlent dans l'atmosphère ; on les admire très bien depuis les hauteurs de La Réunion." },
  20: { portee: "monde", texte: "Aux confins du système solaire, le Soleil n'est plus qu'un point lumineux parmi les étoiles." },
  21: { portee: "monde", texte: "Neptune, la planète la plus lointaine, met 165 ans terrestres à faire un seul tour du Soleil." },
  22: { portee: "monde", texte: "Les comètes viennent des confins glacés et développent une longue « queue » lumineuse en s'approchant du Soleil." },
  23: { portee: "monde", texte: "La géométrie sert vraiment à naviguer dans l'espace : on calcule des angles et des distances pour viser une planète." },
  24: { portee: "monde", texte: "C'est avec la trigonométrie qu'on mesure la distance d'astres qu'on ne peut pas atteindre." },
  25: { portee: "monde", texte: "Notre Soleil est une étoile parmi des centaines de milliards, rien que dans notre galaxie." },
  26: { portee: "monde", texte: "Certaines étoiles sont si lointaines que leur lumière, partie il y a des millions d'années, nous arrive seulement maintenant." },
  27: { portee: "monde", texte: "Notre galaxie, la Voie lactée, contient environ 200 milliards d'étoiles… et ce n'est qu'une galaxie parmi des milliards." },
  28: { portee: "local", texte: "On peut faire de l'astronomie sans fusée : à La Réunion, un simple télescope révèle déjà les cratères de la Lune et les anneaux de Saturne." },
  29: { portee: "local", texte: "Plusieurs Réunionnais travaillent dans les sciences et l'espace : on peut rêver grand, même depuis une petite île." },
  30: { portee: "monde", texte: "En 3ᵉ, tu passeras le brevet et la certification Pix : ce cahier t'a entraîné pour les deux. À toi de jouer, et bon décollage !" },
};
