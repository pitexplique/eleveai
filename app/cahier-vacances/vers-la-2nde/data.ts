/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « En route vers la 2nde » (3e → 2nde).       */
/*  Fil conducteur : le grand zoom de Ti Margo — un voyage d'échelle, de       */
/*  l'infiniment petit (cellule, atome, quark) à l'infiniment grand (Terre,    */
/*  système solaire, galaxie, univers). Ultime élargissement de la collection :*/
/*  jardin → île → monde → cosmos → toutes les échelles de l'univers.          */
/*  Niveau 3e : révision (brevet) + avant-goût de la 2nde. La notation         */
/*  scientifique et les puissances de 10 servent de fil rouge (les échelles).  */
/*  Gestes numériques = prépa SNT (la matière de seconde).                     */
/*  ⚠️ Défis ★★★★★ pour les élèves HPI : raisonnement, ordres de grandeur,    */
/*     identités remarquables, dénombrement, énigmes — niveau lycée.           */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 échelles du grand zoom (une par semaine). */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🧍", lieu: "L'échelle humaine, le mètre", intro: "Ti Margo règle sa loupe magique : le voyage des échelles commence !" },
  { semaine: 2, etape: 2, emoji: "🔬", lieu: "L'infiniment petit : la cellule", intro: "On plonge dans le minuscule : cellules et molécules." },
  { semaine: 3, etape: 3, emoji: "⚛️", lieu: "L'atome et son noyau", intro: "Encore plus petit : le cœur de la matière." },
  { semaine: 4, etape: 4, emoji: "🌍", lieu: "La Terre et le système solaire", intro: "On dézoome : place à l'infiniment grand." },
  { semaine: 5, etape: 5, emoji: "🌌", lieu: "Les étoiles et la galaxie", intro: "Des milliards d'étoiles à perte de vue." },
  { semaine: 6, etape: 6, emoji: "♾️", lieu: "L'univers entier", intro: "Jusqu'au bout du visible… puis cap sur la 2nde !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · L'échelle humaine ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Explorateur des échelles",
    maths: {
      calcul: [
        { q: "3 × 10 puissance 6 =", r: "3000000" },
        { q: "10 puissance 3 × 10 puissance 2 =", r: "10 puissance 5" },
        { q: "2 puissance 10 =", r: "1024" },
        { q: "racine de 144 =", r: "12" },
        { q: "(−4) × (−5) =", r: "20" },
      ],
      probleme: {
        enonce: "Un humain mesure environ 1,8 m. Écris cette taille en notation scientifique, puis donne son ordre de grandeur.",
        correction: "1,8 m = 1,8 × 10 puissance 0 m ; ordre de grandeur : 1 m (10 puissance 0).",
      },
      illu: { emoji: "📏", label: "mètre" },
    },
    francais: {
      regleTitre: "Les genres littéraires",
      regle:
        "Quatre grands genres : le roman, le théâtre, la poésie et la littérature d'idées (essais, argumentation).",
      consigne: "Quel genre ?",
      items: ["un poème en vers", "une pièce avec des répliques", "un récit de fiction long"],
      correction: "poésie — théâtre — roman.",
    },
    mot: {
      mot: "Notation scientifique",
      nature: "expression, maths",
      definition: "On écrit un nombre sous la forme a × 10 puissance n, avec a entre 1 et 10.",
      exemple: "3 000 000 = 3 × 10 puissance 6.",
    },
    geste: {
      titre: "Qu'est-ce que la SNT",
      texte: "En 2nde, la SNT (Sciences Numériques et Technologie) étudie Internet, le Web, les données, les algorithmes… Ce cahier t'y prépare.",
    },
    defi: {
      enonce: "Combien vaut 10 puissance 5 ?",
      correction: "100 000 (cent mille).",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Maître de la mesure",
    maths: {
      calcul: [
        { q: "10 puissance −3 (=) en décimal", r: "0,001" },
        { q: "10 puissance −6 (=) en décimal", r: "0,000001" },
        { q: "10 puissance −1 =", r: "0,1" },
        { q: "1 ÷ 10 puissance 2 =", r: "0,01" },
        { q: "5 × 10 puissance −2 =", r: "0,05" },
      ],
      probleme: {
        enonce: "Un cheveu fait environ 0,1 mm de diamètre. Écris 0,1 mm en mètres, en notation scientifique. (1 mm = 10 puissance −3 m)",
        correction: "0,1 mm = 10 puissance −4 m (soit 0,0001 m).",
      },
      illu: { emoji: "🧍", label: "échelle humaine" },
    },
    francais: {
      regleTitre: "Le schéma narratif",
      regle:
        "Un récit suit souvent : situation initiale, élément perturbateur, péripéties, dénouement, situation finale.",
      consigne: "Quelle étape ?",
      items: ["Tout allait bien au village.", "Soudain, un orage éclata.", "Enfin, le calme revint."],
      correction: "situation initiale — élément perturbateur — situation finale.",
    },
    mot: {
      mot: "Puissance négative",
      nature: "expression, maths",
      definition: "10 puissance −n vaut 1 ÷ 10 puissance n : c'est un nombre tout petit.",
      exemple: "10 puissance −3 = 0,001.",
    },
    geste: {
      titre: "Internet : comment ça marche",
      texte: "Internet découpe les messages en petits « paquets » qui voyagent entre des machines repérées par leur adresse IP.",
    },
    defi: {
      enonce: "Écris 0,001 sous forme de puissance de 10.",
      correction: "10 puissance −3.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Voyageur du visible",
    maths: {
      calcul: [
        { q: "1 km = ? m", r: "1000" },
        { q: "1 m = ? mm", r: "1000" },
        { q: "1 mm = ? µm", r: "1000" },
        { q: "2,5 km = ? m", r: "2500" },
        { q: "10 puissance 3 × 10 puissance 3 =", r: "10 puissance 6" },
      ],
      probleme: {
        enonce: "Range du plus petit au plus grand : un humain (10 puissance 0 m), une cellule (10 puissance −5 m), une fourmi (10 puissance −3 m), un atome (10 puissance −10 m).",
        correction: "atome (10 puissance −10) < cellule (10 puissance −5) < fourmi (10 puissance −3) < humain (10 puissance 0).",
      },
      illu: { emoji: "👁️", label: "œil" },
    },
    francais: {
      regleTitre: "Les points de vue du narrateur",
      regle:
        "Interne (on suit un personnage), externe (témoin neutre), omniscient (le narrateur sait tout).",
      consigne: "Quel point de vue ?",
      items: ["Je sentis mon cœur battre.", "Il entra ; nul ne sut ses pensées.", "Pendant ce temps, à l'autre bout du monde, elle pleurait."],
      correction: "interne — externe — omniscient.",
    },
    mot: {
      mot: "Préfixe d'unité",
      nature: "nom, sciences",
      definition: "Des préfixes disent l'échelle : kilo (×1000), milli (÷1000), micro (÷un million), nano…",
      exemple: "1 micromètre (µm) = 10 puissance −6 m.",
    },
    geste: {
      titre: "Le Web : pages, liens, URL",
      texte: "Le Web est fait de pages reliées par des liens ; chaque page a une adresse (URL) et est écrite en HTML.",
    },
    defi: {
      enonce: "Combien de micromètres (µm) dans 1 millimètre ?",
      correction: "1 000 µm.",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Lecteur de cartes",
    maths: {
      calcul: [
        { q: "échelle 1/1000 : 5 cm → ? cm réel", r: "5000" },
        { q: "4 × 25 000 =", r: "100000" },
        { q: "100 000 cm = ? m", r: "1000" },
        { q: "1000 m = ? km", r: "1" },
        { q: "8 × 7 =", r: "56" },
      ],
      probleme: {
        enonce: "Sur une carte au 1/25 000, deux lieux sont distants de 4 cm. Quelle est la distance réelle ?",
        correction: "4 × 25 000 = 100 000 cm = 1 000 m = 1 km.",
      },
      illu: { emoji: "🗺️", label: "carte" },
    },
    francais: {
      regleTitre: "Les registres littéraires",
      regle:
        "Comique, tragique, pathétique, épique, lyrique, satirique : la tonalité d'un texte.",
      consigne: "Quel registre ?",
      items: ["Hélas ! tout est perdu, je vais mourir.", "Ô temps, suspends ton vol !", "Le héros terrassa mille ennemis."],
      correction: "tragique — lyrique — épique.",
    },
    mot: {
      mot: "Échelle",
      nature: "nom, maths",
      definition: "L'échelle relie les distances d'un plan aux distances réelles.",
      exemple: "Au 1/25 000, 1 cm sur la carte = 250 m en vrai.",
    },
    geste: {
      titre: "Navigateur et moteur de recherche",
      texte: "Le navigateur affiche les pages ; le moteur de recherche les retrouve parmi des milliards grâce à des mots-clés.",
    },
    defi: {
      enonce: "Au 1/25 000, que représentent 10 cm sur la carte ?",
      correction: "2,5 km (10 × 25 000 = 250 000 cm).",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "As des proportions",
    maths: {
      calcul: [
        { q: "× 1,2 = augmentation de", r: "20 %" },
        { q: "× 0,8 = diminution de", r: "20 %" },
        { q: "1,2 × 0,8 =", r: "0,96" },
        { q: "200 + 15 % =", r: "230" },
        { q: "150 − 10 % =", r: "135" },
      ],
      probleme: {
        enonce: "Un prix de 100 € augmente de 20 %, puis baisse de 20 %. Quel est le prix final ?",
        correction: "100 × 1,2 = 120 ; 120 × 0,8 = 96. Il vaut 96 € (on a perdu 4 % !).",
      },
      illu: { emoji: "⚖️", label: "proportions" },
    },
    francais: {
      regleTitre: "Les figures de style",
      regle:
        "Oxymore (mots opposés), litote (dire moins pour suggérer plus), euphémisme (adoucir).",
      consigne: "Nomme la figure.",
      items: ["une obscure clarté", "« Va, je ne te hais point » (= je t'aime)", "il nous a quittés (= il est mort)"],
      correction: "oxymore — litote — euphémisme.",
    },
    mot: {
      mot: "Coefficient multiplicateur",
      nature: "expression, maths",
      definition: "Une évolution se traduit par un coefficient : +20 % → × 1,2 ; −20 % → × 0,8.",
      exemple: "+20 % puis −20 % = × 1,2 × 0,8 = × 0,96.",
    },
    geste: {
      titre: "Comment un moteur classe les pages",
      texte: "Un algorithme (comme le PageRank) classe les pages selon leur contenu et le nombre de liens qui pointent vers elles.",
    },
    defi: {
      enonce: "Un objet baisse de 50 % puis augmente de 50 %. Retrouve-t-on le prix de départ ?",
      correction: "Non : × 0,5 × 1,5 = × 0,75, soit −25 %.",
    },
  },

  /* ===================== SEMAINE 2 · L'infiniment petit : la cellule ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Plongeur du minuscule",
    maths: {
      calcul: [
        { q: "2 puissance 4 =", r: "16" },
        { q: "2 puissance 6 =", r: "64" },
        { q: "10 puissance −5 × 10 puissance 2 =", r: "10 puissance −3" },
        { q: "3 × 2 puissance 3 =", r: "24" },
        { q: "racine de 81 =", r: "9" },
      ],
      probleme: {
        enonce: "Une bactérie se divise en 2 toutes les 20 minutes. À partir d'une seule, combien de bactéries après 2 heures ?",
        correction: "En 2 h, il y a 6 divisions : 2 puissance 6 = 64 bactéries.",
      },
      illu: { emoji: "🔬", label: "microscope" },
    },
    francais: {
      regleTitre: "La versification",
      regle:
        "Un vers de 12 syllabes est un alexandrin, de 10 un décasyllabe, de 8 un octosyllabe.",
      consigne: "Comment s'appelle un vers de…",
      items: ["12 syllabes →", "10 syllabes →", "8 syllabes →"],
      correction: "alexandrin — décasyllabe — octosyllabe.",
    },
    mot: {
      mot: "Puissance",
      nature: "nom, maths",
      definition: "Une puissance est une multiplication répétée : 2 puissance 6 = 2 × 2 × … (6 fois) = 64.",
      exemple: "Un doublement répété 6 fois multiplie par 2 puissance 6 = 64.",
    },
    geste: {
      titre: "Les réseaux sociaux et les données",
      texte: "Les réseaux sont souvent gratuits parce que ce sont tes données et ton attention qui sont « le produit ».",
    },
    defi: {
      enonce: "Combien vaut 2 puissance 8 ?",
      correction: "256.",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Maître des formules",
    maths: {
      calcul: [
        { q: "2(x + 3) =", r: "2x + 6" },
        { q: "x(x + 4) =", r: "x² + 4x" },
        { q: "(x + 2)(x + 5) =", r: "x² + 7x + 10" },
        { q: "3(2x − 1) =", r: "6x − 3" },
        { q: "5 × 5 =", r: "25" },
      ],
      probleme: {
        enonce: "Une lame de microscope carrée a un côté de (x + 4). Développe l'expression de son aire.",
        correction: "(x + 4)² = x² + 8x + 16.",
      },
      illu: { emoji: "🧬", label: "molécule" },
    },
    francais: {
      regleTitre: "Les images poétiques",
      regle:
        "La métaphore filée se prolonge sur plusieurs mots ; le symbole représente une idée (la colombe = la paix).",
      consigne: "Métaphore filée (M) ou symbole (S) ?",
      items: ["La colombe représente la paix.", "Sa vie est un fleuve qui serpente, se jette et s'apaise."],
      correction: "S — M.",
    },
    mot: {
      mot: "Développer",
      nature: "verbe, maths",
      definition: "Développer, c'est transformer un produit en somme.",
      exemple: "(x + 2)(x + 5) = x² + 7x + 10.",
    },
    geste: {
      titre: "Les données personnelles et le RGPD",
      texte: "La loi (RGPD) protège tes données : tu as le droit d'y accéder, de les corriger et de les faire effacer.",
    },
    defi: {
      enonce: "Développe (x + 3)(x − 2).",
      correction: "x² + x − 6.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Roi des identités",
    maths: {
      calcul: [
        { q: "(x + 1)² =", r: "x² + 2x + 1" },
        { q: "(x − 3)² =", r: "x² − 6x + 9" },
        { q: "(x + 5)(x − 5) =", r: "x² − 25" },
        { q: "(a + b)² = a² + 2ab + ", r: "b²" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "À l'aide d'une identité remarquable, développe (x + 6)².",
        correction: "(x + 6)² = x² + 2 × x × 6 + 6² = x² + 12x + 36.",
      },
      illu: { emoji: "➕", label: "calcul" },
    },
    francais: {
      regleTitre: "Le vocabulaire du théâtre",
      regle:
        "Réplique (ce que dit un personnage), tirade (longue réplique), monologue (seul), didascalie (indication scénique).",
      consigne: "Quel terme ?",
      items: ["(il sort, furieux)", "un personnage parle seul sur scène", "une très longue réplique"],
      correction: "didascalie — monologue — tirade.",
    },
    mot: {
      mot: "Identité remarquable",
      nature: "expression, maths",
      definition: "Des égalités utiles : (a+b)² = a² + 2ab + b² ; (a−b)² = a² − 2ab + b² ; (a+b)(a−b) = a² − b².",
      exemple: "(x + 6)² = x² + 12x + 36.",
    },
    geste: {
      titre: "La e-réputation",
      texte: "Ce que tu publies construit ta réputation en ligne ; au lycée comme plus tard, on peut la consulter.",
    },
    defi: {
      enonce: "Développe (x − 4)² avec une identité remarquable.",
      correction: "x² − 8x + 16.",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Factoriseur",
    maths: {
      calcul: [
        { q: "x² − 9 =", r: "(x − 3)(x + 3)" },
        { q: "x² − 1 =", r: "(x − 1)(x + 1)" },
        { q: "3x + 6 =", r: "3(x + 2)" },
        { q: "x² + 2x =", r: "x(x + 2)" },
        { q: "x² − 100 =", r: "(x − 10)(x + 10)" },
      ],
      probleme: {
        enonce: "Factorise x² − 49 à l'aide d'une identité remarquable.",
        correction: "x² − 49 = x² − 7² = (x − 7)(x + 7).",
      },
      illu: { emoji: "✖️", label: "factorisation" },
    },
    francais: {
      regleTitre: "Comédie et tragédie",
      regle:
        "La comédie fait rire et finit bien ; la tragédie met en scène la fatalité et finit mal.",
      consigne: "Comédie (C) ou tragédie (T) ?",
      items: ["Les amoureux se marient à la fin.", "Le héros, victime du destin, meurt."],
      correction: "C — T.",
    },
    mot: {
      mot: "Factoriser",
      nature: "verbe, maths",
      definition: "Factoriser, c'est transformer une somme en produit.",
      exemple: "x² − 9 = (x − 3)(x + 3).",
    },
    geste: {
      titre: "Les fake news et les sources",
      texte: "Avant de partager, on vérifie : qui publie, quand, et l'info est-elle confirmée par des sources fiables et indépendantes ?",
    },
    defi: {
      enonce: "Factorise x² − 64.",
      correction: "(x − 8)(x + 8).",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Chercheur d'inconnues",
    maths: {
      calcul: [
        { q: "2x + 3 = 11 → x =", r: "4" },
        { q: "5x − 2 = 13 → x =", r: "3" },
        { q: "3(x − 1) = 12 → x =", r: "5" },
        { q: "x/2 = 7 → x =", r: "14" },
        { q: "4x = 28 → x =", r: "7" },
      ],
      probleme: {
        enonce: "Résous l'équation 3(x − 2) = x + 4.",
        correction: "3x − 6 = x + 4 → 2x = 10 → x = 5.",
      },
      illu: { emoji: "🔍", label: "loupe" },
    },
    francais: {
      regleTitre: "L'argumentation",
      regle:
        "Thèse (l'idée défendue), arguments (les preuves), exemples (les illustrations).",
      consigne: "Thèse, argument ou exemple ?",
      items: ["Il faut protéger la nature.", "Elle nous fournit l'air et l'eau.", "Ainsi, la forêt amazonienne produit de l'oxygène."],
      correction: "thèse — argument — exemple.",
    },
    mot: {
      mot: "Équation",
      nature: "nom, maths",
      definition: "Une équation est une égalité avec une inconnue à trouver.",
      exemple: "3(x − 2) = x + 4 a pour solution x = 5.",
    },
    geste: {
      titre: "Bulles de filtres et recommandations",
      texte: "Les algorithmes te montrent surtout ce qui te plaît : on varie ses sources pour ne pas s'enfermer dans une « bulle ».",
    },
    defi: {
      enonce: "Résous 4x + 5 = 2x + 17.",
      correction: "x = 6 (2x = 12).",
    },
  },

  /* ===================== SEMAINE 3 · L'atome et son noyau ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Voyageur de l'atome",
    maths: {
      calcul: [
        { q: "10 puissance −10 (=) en mots", r: "très petit" },
        { q: "10 puissance −3 ÷ 10 puissance −10 =", r: "10 puissance 7" },
        { q: "10 puissance −9 = ? (nano)", r: "0,000000001" },
        { q: "5 × 10 puissance −10 × 2 =", r: "10 puissance −9" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Un atome fait environ 10 puissance −10 m. Combien en faut-il alignés pour atteindre 1 mm (10 puissance −3 m) ?",
        correction: "10 puissance −3 ÷ 10 puissance −10 = 10 puissance 7, soit dix millions d'atomes.",
      },
      illu: { emoji: "⚛️", label: "atome" },
    },
    francais: {
      regleTitre: "Argumentation directe et indirecte",
      regle:
        "Directe : on défend une idée ouvertement (essai). Indirecte : par une histoire (fable, conte, apologue).",
      consigne: "Directe (D) ou indirecte (I) ?",
      items: ["La fable « Le Loup et l'Agneau ».", "Un essai sur la liberté."],
      correction: "I — D.",
    },
    mot: {
      mot: "Ordre de grandeur",
      nature: "expression, maths",
      definition: "L'ordre de grandeur est la puissance de 10 la plus proche d'un nombre.",
      exemple: "Un atome : ordre de grandeur 10 puissance −10 m.",
    },
    geste: {
      titre: "Les données structurées",
      texte: "On range des données dans des tableaux (lignes, colonnes), par exemple un fichier .csv, pour les traiter ensuite.",
    },
    defi: {
      enonce: "Combien d'atomes (10 puissance −10 m) pour faire 1 m ?",
      correction: "10 puissance 10, soit dix milliards.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Maître des puissances",
    maths: {
      calcul: [
        { q: "10 puissance 5 × 10 puissance 3 =", r: "10 puissance 8" },
        { q: "10 puissance 7 ÷ 10 puissance 4 =", r: "10 puissance 3" },
        { q: "(10 puissance 3) puissance 2 =", r: "10 puissance 6" },
        { q: "10 puissance −2 × 10 puissance 5 =", r: "10 puissance 3" },
        { q: "2 puissance 5 =", r: "32" },
      ],
      probleme: {
        enonce: "Calcule (3 × 10 puissance 4) × (2 × 10 puissance 3), en notation scientifique.",
        correction: "3 × 2 = 6 et 10 puissance 4 × 10 puissance 3 = 10 puissance 7, donc 6 × 10 puissance 7.",
      },
      illu: { emoji: "🔟", label: "puissances" },
    },
    francais: {
      regleTitre: "Les connecteurs logiques",
      regle:
        "Cause (car, parce que), conséquence (donc, ainsi), opposition (mais, cependant), addition (de plus).",
      consigne: "Quel lien exprime…",
      items: ["cependant", "par conséquent", "en effet"],
      correction: "opposition — conséquence — explication.",
    },
    mot: {
      mot: "Lois des puissances",
      nature: "expression, maths",
      definition: "10 puissance a × 10 puissance b = 10 puissance (a+b) ; 10 puissance a ÷ 10 puissance b = 10 puissance (a−b).",
      exemple: "10 puissance 5 × 10 puissance 3 = 10 puissance 8.",
    },
    geste: {
      titre: "Traiter des données dans un tableur",
      texte: "Le tableur trie, filtre et calcule (=MOYENNE, =SOMME) : c'est l'outil de base pour analyser des données.",
    },
    defi: {
      enonce: "Calcule (4 × 10 puissance 6) ÷ (2 × 10 puissance 2).",
      correction: "2 × 10 puissance 4 (soit 20 000).",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Funambule des inégalités",
    maths: {
      calcul: [
        { q: "2x > 10 → x", r: "> 5" },
        { q: "x + 3 < 7 → x", r: "< 4" },
        { q: "x − 5 ≥ 0 → x", r: "≥ 5" },
        { q: "3x ≤ 12 → x", r: "≤ 4" },
        { q: "8 × 7 =", r: "56" },
      ],
      probleme: {
        enonce: "Résous l'inéquation 2x + 1 > 7.",
        correction: "2x > 6 → x > 3.",
      },
      illu: { emoji: "↔️", label: "inégalité" },
    },
    francais: {
      regleTitre: "L'analyse logique",
      regle:
        "Une proposition a un verbe conjugué. Elle peut être indépendante, principale ou subordonnée.",
      consigne: "Combien de propositions ?",
      items: ["Il lit un livre.", "Il lit quand il a le temps."],
      correction: "1 proposition — 2 propositions (principale + subordonnée).",
    },
    mot: {
      mot: "Inéquation",
      nature: "nom, maths",
      definition: "Une inéquation compare deux expressions avec <, >, ≤ ou ≥ ; sa solution est un ensemble de nombres.",
      exemple: "2x + 1 > 7 a pour solution x > 3.",
    },
    geste: {
      titre: "Un algorithme : variables et instructions",
      texte: "Un algorithme est une suite d'instructions ; une variable garde une valeur (un score, un compteur) pendant l'exécution.",
    },
    defi: {
      enonce: "Résous l'inéquation 3x − 2 < 13.",
      correction: "x < 5 (3x < 15).",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Lecteur d'intervalles",
    maths: {
      calcul: [
        { q: "entiers de [0 ; 3] :", r: "0, 1, 2, 3" },
        { q: "entiers de [−2 ; 1] :", r: "−2, −1, 0, 1" },
        { q: "3 appartient à [0 ; 3[ ?", r: "non" },
        { q: "borne fermée : crochet", r: "vers l'intérieur" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Donne tous les entiers de l'intervalle [−2 ; 3[.",
        correction: "−2, −1, 0, 1, 2 (le 3 est exclu : crochet ouvert).",
      },
      illu: { emoji: "📊", label: "intervalle" },
    },
    francais: {
      regleTitre: "Les propositions subordonnées",
      regle:
        "Relative (qui, que), conjonctive complétive (que), circonstancielle (quand, parce que…).",
      consigne: "Quel type ?",
      items: ["Le livre que je lis.", "Je pense qu'il a raison.", "Je lirai quand il fera nuit."],
      correction: "relative — complétive — circonstancielle.",
    },
    mot: {
      mot: "Intervalle",
      nature: "nom, maths",
      definition: "Un intervalle regroupe tous les nombres entre deux bornes ; un crochet fermé inclut la borne, ouvert l'exclut.",
      exemple: "[−2 ; 3[ contient −2 mais pas 3.",
    },
    geste: {
      titre: "Une boucle (for / while)",
      texte: "Une boucle répète des instructions un certain nombre de fois, ou tant qu'une condition reste vraie.",
    },
    defi: {
      enonce: "Combien d'entiers contient l'intervalle [1 ; 6] ?",
      correction: "6 entiers : 1, 2, 3, 4, 5, 6.",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Ami des fonctions",
    maths: {
      calcul: [
        { q: "f(x) = x² ; f(3) =", r: "9" },
        { q: "f(x) = x² ; f(−2) =", r: "4" },
        { q: "f(x) = 2x ; f(5) =", r: "10" },
        { q: "f(x) = x + 1 ; f(0) =", r: "1" },
        { q: "racine de 49 =", r: "7" },
      ],
      probleme: {
        enonce: "Pour la fonction f(x) = x², quels sont les antécédents de 9 ?",
        correction: "3 et −3, car 3² = 9 et (−3)² = 9.",
      },
      illu: { emoji: "📈", label: "fonction" },
    },
    francais: {
      regleTitre: "Les modes du verbe",
      regle:
        "Indicatif (réel), subjonctif (souhait, doute), conditionnel (hypothèse), impératif (ordre).",
      consigne: "Quel mode ?",
      items: ["Il faut que tu viennes.", "Je viendrais si je pouvais.", "Viens vite !"],
      correction: "subjonctif — conditionnel — impératif.",
    },
    mot: {
      mot: "Antécédent et image",
      nature: "expression, maths",
      definition: "Si f(a) = b, alors b est l'image de a, et a est un antécédent de b.",
      exemple: "Pour f(x) = x², l'image de 3 est 9 ; les antécédents de 9 sont 3 et −3.",
    },
    geste: {
      titre: "Une condition (if / else)",
      texte: "Une condition fait un choix dans un programme : « si la réponse est juste, alors… sinon… ».",
    },
    defi: {
      enonce: "Pour f(x) = x², que valent f(4) et f(−4) ?",
      correction: "16 dans les deux cas.",
    },
  },

  /* ===================== SEMAINE 4 · La Terre et le système solaire ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Voyageur de l'immense",
    maths: {
      calcul: [
        { q: "1,3 × 10 puissance 7 (=) chiffres", r: "13000000" },
        { q: "10 puissance 8 × 10 puissance 3 =", r: "10 puissance 11" },
        { q: "1,5 × 10 puissance 8 × 2 =", r: "3 × 10 puissance 8" },
        { q: "racine de 169 =", r: "13" },
        { q: "9 × 8 =", r: "72" },
      ],
      probleme: {
        enonce: "La Terre est à environ 150 000 000 km du Soleil. Écris cette distance en notation scientifique.",
        correction: "150 000 000 = 1,5 × 10 puissance 8 km.",
      },
      illu: { emoji: "🌍", label: "Terre" },
    },
    francais: {
      regleTitre: "La concordance des temps",
      regle: "On accorde le temps de la subordonnée à celui de la principale.",
      consigne: "Choisis le bon temps.",
      items: ["Il a dit qu'il (vient / venait).", "Je pense qu'il (réussira / réussirait)."],
      correction: "venait — réussira.",
    },
    mot: {
      mot: "Notation scientifique (grands nombres)",
      nature: "expression, maths",
      definition: "Pour un très grand nombre, on écrit a × 10 puissance n avec n positif.",
      exemple: "150 000 000 = 1,5 × 10 puissance 8.",
    },
    geste: {
      titre: "Python : les bases",
      texte: "Python est un langage de programmation simple : print() affiche, et on range des valeurs dans des variables.",
    },
    defi: {
      enonce: "Écris 6 400 000 (le rayon de la Terre en m) en notation scientifique.",
      correction: "6,4 × 10 puissance 6 m.",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Maître des affines",
    maths: {
      calcul: [
        { q: "f(x) = 3x + 2 ; f(0) =", r: "2" },
        { q: "f(x) = 3x + 2 ; f(4) =", r: "14" },
        { q: "f(x) = −2x + 1 ; f(3) =", r: "−5" },
        { q: "f(x) = x − 5 ; f(10) =", r: "5" },
        { q: "8 × 9 =", r: "72" },
      ],
      probleme: {
        enonce: "Une fonction affine vérifie f(0) = 4 et f(2) = 10. Donne f(x), puis calcule f(5).",
        correction: "b = 4 ; a = (10 − 4) ÷ 2 = 3, donc f(x) = 3x + 4 ; f(5) = 19.",
      },
      illu: { emoji: "📈", label: "droite" },
    },
    francais: {
      regleTitre: "Voix active et passive",
      regle: "À la voix passive, le sujet subit l'action (être + participe passé).",
      consigne: "Mets à la voix passive.",
      items: ["Galilée a observé les étoiles.", "Newton a découvert la gravité."],
      correction: "Les étoiles ont été observées par Galilée. — La gravité a été découverte par Newton.",
    },
    mot: {
      mot: "Fonction affine",
      nature: "expression, maths",
      definition: "Une fonction affine s'écrit f(x) = ax + b ; sa courbe est une droite.",
      exemple: "f(x) = 3x + 4 : f(0) = 4, f(5) = 19.",
    },
    geste: {
      titre: "Déboguer un programme",
      texte: "Quand un programme ne marche pas, on lit le message d'erreur et on cherche le « bug » ligne par ligne.",
    },
    defi: {
      enonce: "Pour f(x) = 3x + 4, résous f(x) = 19.",
      correction: "x = 5 (3x = 15).",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Explorateur des courbes",
    maths: {
      calcul: [
        { q: "f(x) = x² ; f(0) =", r: "0" },
        { q: "f(x) = x² ; f(5) =", r: "25" },
        { q: "f(x) = x² ; f(−5) =", r: "25" },
        { q: "f(x) = x² ; f(10) =", r: "100" },
        { q: "12 × 12 =", r: "144" },
      ],
      probleme: {
        enonce: "Pour la fonction carré f(x) = x², compare f(−3) et f(2). Que remarque-t-on ?",
        correction: "f(−3) = 9 et f(2) = 4 : un nombre négatif peut avoir une image plus grande qu'un positif. La fonction carré décroît avant 0, puis croît.",
      },
      illu: { emoji: "〽️", label: "parabole" },
    },
    francais: {
      regleTitre: "Le discours rapporté",
      regle:
        "Direct (guillemets), indirect (avec « que »), indirect libre (mêlé au récit, sans guillemets ni « que »).",
      consigne: "Direct, indirect ou indirect libre ?",
      items: ["Il dit : « Je pars. »", "Il dit qu'il part.", "Il regarda l'horizon. Partir, enfin !"],
      correction: "direct — indirect — indirect libre.",
    },
    mot: {
      mot: "Fonction carré",
      nature: "expression, maths",
      definition: "La fonction carré f(x) = x² : sa courbe est une parabole, toujours positive ou nulle.",
      exemple: "f(3) = 9 et f(−3) = 9.",
    },
    geste: {
      titre: "La localisation : GPS et satellites",
      texte: "Le GPS calcule ta position grâce aux signaux de plusieurs satellites : c'est de la géométrie dans l'espace.",
    },
    defi: {
      enonce: "Pour quels nombres f(x) = x² vaut-elle 0 ?",
      correction: "Seulement pour x = 0.",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Géomètre du plan",
    maths: {
      calcul: [
        { q: "milieu de 2 et 8 =", r: "5" },
        { q: "milieu de 0 et 6 =", r: "3" },
        { q: "milieu de −4 et 4 =", r: "0" },
        { q: "(1 + 5) ÷ 2 =", r: "3" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Dans un repère, A(1 ; 2) et B(5 ; 2). Quelles sont les coordonnées du milieu de [AB] ?",
        correction: "Milieu : moyenne des x et des y → ((1 + 5)/2 ; (2 + 2)/2) = (3 ; 2).",
      },
      illu: { emoji: "📐", label: "repère" },
    },
    francais: {
      regleTitre: "La modalisation",
      regle:
        "Modaliser, c'est exprimer un jugement ou un doute (peut-être, sans doute, il semble, hélas).",
      consigne: "Souligne le mot qui modalise.",
      items: ["Il viendra sans doute demain.", "Hélas, tout est fini.", "C'est peut-être vrai."],
      correction: "sans doute — Hélas — peut-être.",
    },
    mot: {
      mot: "Coordonnées",
      nature: "nom, maths",
      definition: "Dans un repère, un point est repéré par deux nombres : son abscisse (x) et son ordonnée (y).",
      exemple: "Le point A(1 ; 2) a pour abscisse 1 et ordonnée 2.",
    },
    geste: {
      titre: "La cartographie numérique",
      texte: "Des cartes en ligne (comme OpenStreetMap) sont construites à partir de données géographiques partagées.",
    },
    defi: {
      enonce: "Quel est le milieu de A(2 ; 6) et B(8 ; 0) ?",
      correction: "(5 ; 3).",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Arpenteur des distances",
    maths: {
      calcul: [
        { q: "3² + 4² =", r: "25" },
        { q: "racine de 25 =", r: "5" },
        { q: "6² + 8² =", r: "100" },
        { q: "racine de 100 =", r: "10" },
        { q: "5² + 12² =", r: "169" },
      ],
      probleme: {
        enonce: "Dans un repère, A(0 ; 0) et B(3 ; 4). Quelle est la distance AB ?",
        correction: "AB = racine de (3² + 4²) = racine de 25 = 5.",
      },
      illu: { emoji: "📍", label: "distance" },
    },
    francais: {
      regleTitre: "Types et formes de phrases",
      regle:
        "La négation peut être totale (ne… pas) ou partielle (ne… que, ne… personne).",
      consigne: "Négation totale (T) ou partielle (P) ?",
      items: ["Il ne dort pas.", "Il ne mange que des fruits.", "Personne n'est venu."],
      correction: "T — P — P.",
    },
    mot: {
      mot: "Distance dans un repère",
      nature: "expression, maths",
      definition: "La distance entre deux points se calcule avec Pythagore, à partir de leurs coordonnées.",
      exemple: "De (0;0) à (3;4) : racine de (3² + 4²) = 5.",
    },
    geste: {
      titre: "La photographie numérique : les pixels",
      texte: "Une image numérique est une grille de points colorés, les pixels : plus il y en a, plus l'image est nette.",
    },
    defi: {
      enonce: "Quelle est la distance entre A(0 ; 0) et B(6 ; 8) ?",
      correction: "10 (racine de 36 + 64 = racine de 100).",
    },
  },

  /* ===================== SEMAINE 5 · Les étoiles et la galaxie ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Voyageur des étoiles",
    maths: {
      calcul: [
        { q: "9,5 × 10 puissance 12 × 10 puissance 5 =", r: "9,5 × 10 puissance 17" },
        { q: "10 puissance 5 × 10 puissance 12 =", r: "10 puissance 17" },
        { q: "4 × 9,5 ≈", r: "38" },
        { q: "10 puissance 6 × 10 puissance 6 =", r: "10 puissance 12" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Une année-lumière vaut environ 9,5 × 10 puissance 12 km. La galaxie fait 100 000 années-lumière de large. Donne sa largeur en km (notation scientifique).",
        correction: "100 000 = 10 puissance 5, donc 10 puissance 5 × 9,5 × 10 puissance 12 = 9,5 × 10 puissance 17 km.",
      },
      illu: { emoji: "✨", label: "étoiles" },
    },
    francais: {
      regleTitre: "L'étymologie",
      regle:
        "Le latin et le grec forment beaucoup de mots savants : « bio » = vie, « logos » = science → biologie.",
      consigne: "Que signifie la racine ?",
      items: ["micro-", "macro-", "-scope"],
      correction: "petit — grand — instrument pour voir.",
    },
    mot: {
      mot: "Année-lumière",
      nature: "nom, sciences",
      definition: "C'est la distance parcourue par la lumière en un an : environ 9,5 × 10 puissance 12 km.",
      exemple: "L'étoile la plus proche est à 4 années-lumière.",
    },
    geste: {
      titre: "Une image : le codage RVB",
      texte: "Chaque pixel mélange du Rouge, du Vert et du Bleu : c'est le codage RVB qui crée toutes les couleurs.",
    },
    defi: {
      enonce: "La lumière met 8 minutes du Soleil à la Terre. La galaxie fait 100 000 années-lumière. Lequel est le plus grand voyage ?",
      correction: "La galaxie, de très loin : 100 000 ans contre 8 minutes !",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Pilote de vecteurs",
    maths: {
      calcul: [
        { q: "(+3 ; +2) répété 2 fois =", r: "(+6 ; +4)" },
        { q: "(+1 ; −1) + (+2 ; +3) =", r: "(+3 ; +2)" },
        { q: "3 × (+2 ; +1) =", r: "(+6 ; +3)" },
        { q: "(0 ; 0) + (+5 ; +5) =", r: "(+5 ; +5)" },
        { q: "9 × 6 =", r: "54" },
      ],
      probleme: {
        enonce: "Un vaisseau part de l'origine (0 ; 0). On lui applique le vecteur (+3 ; +2) trois fois de suite. Où arrive-t-il ?",
        correction: "3 × (+3 ; +2) = (+9 ; +6). Il arrive au point (9 ; 6).",
      },
      illu: { emoji: "➡️", label: "vecteur" },
    },
    francais: {
      regleTitre: "Champ lexical et champ sémantique",
      regle:
        "Le champ lexical = mots autour d'un thème ; le champ sémantique = les différents sens d'un mot.",
      consigne: "Quel thème relie ces mots (champ lexical) ?",
      items: ["étoile, galaxie, planète, orbite, comète"],
      correction: "le thème de l'espace / de l'astronomie.",
    },
    mot: {
      mot: "Vecteur",
      nature: "nom, maths",
      definition: "Un vecteur représente un déplacement : une direction, un sens et une longueur.",
      exemple: "Le vecteur (+3 ; +2) avance de 3 vers la droite et 2 vers le haut.",
    },
    geste: {
      titre: "Les métadonnées d'une photo",
      texte: "Une photo contient des données cachées (date, lieu GPS, appareil) : les métadonnées, qu'on peut effacer avant de partager.",
    },
    defi: {
      enonce: "Du point (1 ; 1), on applique le vecteur (+4 ; −2). Où arrive-t-on ?",
      correction: "(5 ; −1).",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Trigonaute",
    maths: {
      calcul: [
        { q: "cos 60° =", r: "0,5" },
        { q: "sin 30° =", r: "0,5" },
        { q: "adjacent 8, hyp 10 → cos =", r: "0,8" },
        { q: "opposé 6, hyp 10 → sin =", r: "0,6" },
        { q: "10 × 0,5 =", r: "5" },
      ],
      probleme: {
        enonce: "Dans un triangle rectangle, l'hypoténuse vaut 10 et un angle aigu 60°. Le côté opposé vaut hyp × sin 60° (sin 60° ≈ 0,87). Combien ?",
        correction: "10 × 0,87 ≈ 8,7.",
      },
      illu: { emoji: "📐", label: "triangle" },
    },
    francais: {
      regleTitre: "Dénotation et connotation",
      regle:
        "La dénotation = sens neutre du mot ; la connotation = ce qu'il évoque en plus.",
      consigne: "Donne une connotation du mot « nuit » (au-delà de « absence de jour »).",
      items: ["la nuit →"],
      correction: "le mystère, la peur, le repos, le rêve… (connotations possibles).",
    },
    mot: {
      mot: "Trigonométrie",
      nature: "nom, maths",
      definition: "Dans un triangle rectangle : cos = adjacent/hyp, sin = opposé/hyp, tan = opposé/adjacent.",
      exemple: "cos 60° = 0,5.",
    },
    geste: {
      titre: "Compression d'images et de fichiers",
      texte: "On compresse une image (JPEG) ou des fichiers (.zip) pour réduire leur poids et les envoyer plus vite.",
    },
    defi: {
      enonce: "Dans un triangle rectangle, l'hypoténuse vaut 8 et cos de l'angle vaut 0,5. Quel est le côté adjacent ?",
      correction: "4 (8 × 0,5).",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Géomètre des géants",
    maths: {
      calcul: [
        { q: "longueurs ×10 → aire ×", r: "100" },
        { q: "longueurs ×10 → volume ×", r: "1000" },
        { q: "10² =", r: "100" },
        { q: "10³ =", r: "1000" },
        { q: "7 × 9 =", r: "63" },
      ],
      probleme: {
        enonce: "On agrandit un objet : ses longueurs sont multipliées par 10. Par combien sont multipliés son aire et son volume ?",
        correction: "Aire ×10² = ×100 ; volume ×10³ = ×1000.",
      },
      illu: { emoji: "🔭", label: "télescope" },
    },
    francais: {
      regleTitre: "Périphrase, antithèse, gradation",
      regle:
        "Périphrase (« l'astre du jour » = le soleil), antithèse (idées opposées), gradation (intensité croissante).",
      consigne: "Nomme la figure.",
      items: ["« l'astre du jour »", "« Je vis, je meurs »", "« Il marche, court, s'envole »"],
      correction: "périphrase — antithèse — gradation.",
    },
    mot: {
      mot: "Agrandissement",
      nature: "nom, maths",
      definition: "Dans un agrandissement de rapport k, les aires sont multipliées par k² et les volumes par k³.",
      exemple: "Longueurs ×10 → aire ×100, volume ×1000.",
    },
    geste: {
      titre: "Les objets connectés",
      texte: "Montres, capteurs, maisons « intelligentes » contiennent de l'informatique embarquée et échangent des données.",
    },
    defi: {
      enonce: "On double les arêtes d'un cube. Par combien son volume est-il multiplié ?",
      correction: "Par 8 (2³).",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Statisticien cosmique",
    maths: {
      calcul: [
        { q: "médiane de 4, 7, 9 =", r: "7" },
        { q: "(8 + 12) ÷ 2 =", r: "10" },
        { q: "moyenne de 10, 20, 30 =", r: "20" },
        { q: "étendue de 5 et 18 =", r: "13" },
        { q: "8 × 7 =", r: "56" },
      ],
      probleme: {
        enonce: "Sept relevés rangés : 8, 12, 12, 14, 15, 18, 20. Donne la médiane et la moyenne.",
        correction: "Médiane = 4e valeur = 14 ; moyenne = 99 ÷ 7 ≈ 14,1.",
      },
      illu: { emoji: "📊", label: "statistiques" },
    },
    francais: {
      regleTitre: "L'écriture de soi",
      regle:
        "L'autobiographie raconte sa propre vie à la 1re personne, avec un pacte de sincérité.",
      consigne: "Autobiographie (A) ou fiction (F) ?",
      items: ["Je me souviens de mon enfance à La Réunion.", "Il était une fois un roi."],
      correction: "A — F.",
    },
    mot: {
      mot: "Médiane",
      nature: "nom, maths",
      definition: "La médiane partage une série rangée en deux moitiés de même effectif.",
      exemple: "Pour 8, 12, 14, 18, 20 : la médiane est 14.",
    },
    geste: {
      titre: "Le chiffrement des données",
      texte: "Le chiffrement rend un message illisible sans la clé : c'est ce qui protège tes mots de passe et tes paiements en ligne.",
    },
    defi: {
      enonce: "Quelle est la médiane de 5, 9, 9, 12, 20 ?",
      correction: "9 (la valeur du milieu).",
    },
  },

  /* ===================== SEMAINE 6 · L'univers entier ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Lecteur de l'univers",
    maths: {
      calcul: [
        { q: "étendue de 4 et 19 =", r: "15" },
        { q: "rang de Q1 pour 8 valeurs =", r: "2e" },
        { q: "rang de la médiane pour 8 valeurs =", r: "entre 4e et 5e" },
        { q: "(6 + 10) ÷ 2 =", r: "8" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Pour une série de 8 valeurs rangées, à quel rang se trouve le 1er quartile Q1 ?",
        correction: "Q1 est à la valeur de rang 8 ÷ 4 = 2 : c'est la 2e valeur. Q1 sépare le premier quart des données.",
      },
      illu: { emoji: "🌌", label: "galaxie" },
    },
    francais: {
      regleTitre: "Le commentaire littéraire",
      regle:
        "On analyse un texte : on relève un procédé (figure, registre) et on l'interprète (quel effet ?).",
      consigne: "Procédé ou interprétation ?",
      items: ["« une métaphore de la mer »", "« qui suggère l'immensité du voyage »"],
      correction: "procédé — interprétation.",
    },
    mot: {
      mot: "Quartile",
      nature: "nom, maths",
      definition: "Les quartiles partagent une série rangée en quatre quarts (Q1, médiane, Q3).",
      exemple: "Q1 sépare le premier quart des valeurs.",
    },
    geste: {
      titre: "Mot de passe robuste et double auth",
      texte: "Un mot de passe long et unique, plus un code reçu sur le téléphone (double authentification) : la meilleure protection.",
    },
    defi: {
      enonce: "Quelle est l'étendue de la série 6, 11, 4, 19, 9 ?",
      correction: "15 (19 − 4).",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Maître du hasard",
    maths: {
      calcul: [
        { q: "P(6) sur un dé =", r: "1/6" },
        { q: "P(pile) =", r: "1/2" },
        { q: "P(somme 7 avec 2 dés) =", r: "1/6" },
        { q: "P(somme 12 avec 2 dés) =", r: "1/36" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "On lance deux dés et on additionne. Quelle est la probabilité d'obtenir une somme de 7 ?",
        correction: "6 façons (1-6, 2-5, 3-4, 4-3, 5-2, 6-1) sur 36 → 6/36 = 1/6.",
      },
      illu: { emoji: "🎲", label: "dés" },
    },
    francais: {
      regleTitre: "La dissertation",
      regle:
        "On répond à une question par un plan (thèse, antithèse, synthèse), avec une introduction et une conclusion.",
      consigne: "Introduction, développement ou conclusion ?",
      items: ["On annonce le sujet et la problématique.", "On défend des arguments avec des exemples.", "On répond à la question et on ouvre."],
      correction: "introduction — développement — conclusion.",
    },
    mot: {
      mot: "Fréquence",
      nature: "nom, maths",
      definition: "La fréquence d'un résultat = nombre de fois où il sort ÷ nombre total d'essais ; elle s'approche de la probabilité.",
      exemple: "Sur 600 lancers d'un dé, le 6 sort environ 100 fois (fréquence ≈ 1/6).",
    },
    geste: {
      titre: "L'intelligence artificielle : principes",
      texte: "Une IA apprend à partir de très nombreux exemples ; elle prédit, mais elle ne « comprend » pas vraiment.",
    },
    defi: {
      enonce: "On lance un dé. Quelle est la probabilité d'obtenir un multiple de 3 ?",
      correction: "2/6 = 1/3 (les résultats 3 et 6).",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "Arithméticien des astres",
    maths: {
      calcul: [
        { q: "PGCD(12, 18) =", r: "6" },
        { q: "PGCD(8, 20) =", r: "4" },
        { q: "168 ÷ 12 =", r: "14" },
        { q: "180 ÷ 12 =", r: "15" },
        { q: "nombres premiers < 10 :", r: "2, 3, 5, 7" },
      ],
      probleme: {
        enonce: "Simplifie la fraction 168/180 en utilisant le PGCD.",
        correction: "PGCD(168, 180) = 12 ; 168/180 = 14/15.",
      },
      illu: { emoji: "🔢", label: "arithmétique" },
    },
    francais: {
      regleTitre: "Analyser un texte argumentatif",
      regle:
        "On repère la thèse, les arguments et la stratégie : convaincre par la raison ou persuader par l'émotion.",
      consigne: "Convaincre (raison) ou persuader (émotion) ?",
      items: ["« Les chiffres le prouvent : … »", "« Imaginez la souffrance de ces enfants… »"],
      correction: "convaincre — persuader.",
    },
    mot: {
      mot: "PGCD",
      nature: "nom, maths",
      definition: "Le plus grand diviseur commun à deux nombres ; il sert à rendre une fraction irréductible.",
      exemple: "PGCD(168, 180) = 12 → 168/180 = 14/15.",
    },
    geste: {
      titre: "Esprit critique face à l'IA générative",
      texte: "Une IA peut inventer des réponses fausses avec assurance : on vérifie toujours, et on ne copie pas sans comprendre.",
    },
    defi: {
      enonce: "Quel est le PGCD de 24 et 36 ?",
      correction: "12.",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Presque en 2nde",
    maths: {
      calcul: [
        { q: "10 puissance 28 ÷ 10 puissance 11 =", r: "10 puissance 17" },
        { q: "10 puissance 27 − 10 puissance (−18) (écart d'exposants)", r: "45" },
        { q: "(−2)² + 3 × (−1) =", r: "1" },
        { q: "racine de 196 =", r: "14" },
        { q: "2 puissance 6 =", r: "64" },
      ],
      probleme: {
        enonce: "On compte environ 10 puissance 28 atomes dans un corps humain et 10 puissance 11 étoiles dans la galaxie. Combien de fois plus d'atomes que d'étoiles ?",
        correction: "10 puissance 28 ÷ 10 puissance 11 = 10 puissance 17 fois. L'infiniment petit dépasse l'imagination !",
      },
      illu: { emoji: "♾️", label: "infini" },
    },
    francais: {
      regleTitre: "Révision : la grammaire pour le lycée",
      regle: "Classes, fonctions, propositions, modes : les bases pour analyser tout texte.",
      consigne: "Conjugue au conditionnel présent (3e pers. sing.).",
      items: ["pouvoir →", "savoir →", "faire →"],
      correction: "il pourrait — il saurait — il ferait.",
    },
    mot: {
      mot: "Ordre de grandeur",
      nature: "expression, maths",
      definition: "Comparer des ordres de grandeur, c'est comparer des puissances de 10.",
      exemple: "10 puissance 28 atomes contre 10 puissance 11 étoiles : 10 puissance 17 fois plus.",
    },
    geste: {
      titre: "L'empreinte écologique du numérique",
      texte: "Vidéos, stockage, IA consomment beaucoup d'énergie : trier ses fichiers et limiter le superflu, ça compte pour la planète.",
    },
    defi: {
      enonce: "Combien d'ordres de grandeur séparent 10 puissance 3 et 10 puissance 9 ?",
      correction: "6 ordres de grandeur.",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour la 2nde ! 🎓",
    maths: {
      calcul: [
        { q: "27 − (−18) =", r: "45" },
        { q: "10 puissance 27 (=) en mots", r: "très grand" },
        { q: "3,8 × 10 puissance 13 (=) chiffres avant 10", r: "3,8" },
        { q: "2 puissance 10 =", r: "1024" },
        { q: "racine de 225 =", r: "15" },
      ],
      probleme: {
        enonce: "Du quark (≈ 10 puissance −18 m) à l'univers observable (≈ 10 puissance 27 m), combien d'ordres de grandeur séparent les deux ?",
        correction: "27 − (−18) = 45 ordres de grandeur. Tout l'univers tient en 45 puissances de 10 !",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Le grand bilan (cap sur le lycée)",
      regle:
        "Tu sais analyser un texte, argumenter, reconnaître les genres et les figures : tu es prêt pour la 2nde !",
      consigne: "Rédige un paragraphe argumenté (4-5 phrases) : « La science fait-elle rêver ? »",
      items: ["(à toi d'écrire !)"],
      correction: "Réponse libre — une thèse, des arguments, des exemples, des connecteurs, et une langue soignée.",
    },
    mot: {
      mot: "Bilan",
      nature: "nom",
      definition: "Faire le bilan, c'est mesurer le chemin parcouru et tout ce qu'on a appris.",
      exemple: "Du jardin au cosmos : quel beau voyage, direction la 2nde !",
    },
    geste: {
      titre: "Citoyen numérique au lycée",
      texte: "Internet, Web, données, algorithmes, IA, esprit critique : tu as les bases de la SNT. Bienvenue au lycée !",
    },
    defi: {
      enonce: "Combien d'échelles différentes Ti Margo a-t-il explorées dans ce grand zoom ?",
      correction: "6 échelles, de l'humain à l'univers en passant par l'atome.",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — pour les élèves HPI : ordres de grandeur,   */
/*  identités remarquables, dénombrement, géométrie repérée, probabilités —   */
/*  niveau lycée. Plusieurs jouent sur le vertige des échelles.               */
/* -------------------------------------------------------------------------- */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce: "Un cheveu fait environ 0,1 mm de large, un atome environ 0,1 nm. Combien d'atomes côte à côte dans la largeur d'un cheveu ? (1 mm = 10 puissance 6 nm)",
    correction: "Environ 1 000 000 (un million). (0,1 mm = 10 puissance 5 nm ; ÷ 0,1 nm = 10 puissance 6.)",
  },
  2: {
    enonce: "Range par taille croissante : une cellule (10 puissance −5 m), un atome (10 puissance −10 m), un humain (10 puissance 0 m), une fourmi (10 puissance −3 m).",
    correction: "atome < cellule < fourmi < humain (10 puissance −10 < 10 puissance −5 < 10 puissance −3 < 10 puissance 0).",
  },
  3: {
    enonce: "La Terre fait environ 1,3 × 10 puissance 7 m de diamètre, un humain 2 m. Combien d'humains alignés pour traverser la Terre ?",
    correction: "Environ 6,5 × 10 puissance 6, soit 6,5 millions d'humains.",
  },
  4: {
    enonce: "Sur une carte au 1/25 000, deux villes sont à 4 cm. Quelle distance réelle, en km ?",
    correction: "1 km. (4 × 25 000 = 100 000 cm = 1 000 m = 1 km.)",
  },
  5: {
    enonce: "Un prix augmente de 20 % puis baisse de 20 %. Quel est le coefficient global, et a-t-on retrouvé le prix de départ ?",
    correction: "× 0,96, soit −4 % : non, le prix a baissé de 4 %. (1,2 × 0,8 = 0,96.)",
  },
  6: {
    enonce: "Une bactérie se divise en 2 toutes les 20 minutes. À partir d'une seule, combien après 4 heures ?",
    correction: "4 096. (12 divisions en 4 h : 2 puissance 12 = 4 096.)",
  },
  7: {
    enonce: "Développe (x + 5)(x − 5), puis (x + 5)². Quelle différence entre les deux résultats ?",
    correction: "x² − 25 et x² + 10x + 25. La différence est 10x + 50.",
  },
  8: {
    enonce: "Sans calculatrice, calcule 102 × 98 à l'aide d'une identité remarquable.",
    correction: "9 996. (102 × 98 = (100 + 2)(100 − 2) = 100² − 2² = 10 000 − 4 = 9 996.)",
  },
  9: {
    enonce: "Factorise x² − 6x + 9, puis x² − 49.",
    correction: "(x − 3)² ; et (x − 7)(x + 7).",
  },
  10: {
    enonce: "Résous 5(x − 1) = 2(x + 4).",
    correction: "x = 13/3. (5x − 5 = 2x + 8 → 3x = 13 → x = 13/3 ≈ 4,33.)",
  },
  11: {
    enonce: "Un atome fait environ 10 puissance −10 m. Combien en faut-il alignés pour faire 1 cm (10 puissance −2 m) ?",
    correction: "10 puissance 8, soit cent millions d'atomes.",
  },
  12: {
    enonce: "Calcule (6 × 10 puissance 5) × (5 × 10 puissance 8), en notation scientifique.",
    correction: "3 × 10 puissance 14. (6 × 5 = 30 = 3 × 10 ; 10 × 10 puissance 13 = 10 puissance 14.)",
  },
  13: {
    enonce: "Résous l'inéquation −2x + 1 > 7. Attention au sens de l'inégalité !",
    correction: "x < −3. (−2x > 6 ; en divisant par −2, on change le sens : x < −3.)",
  },
  14: {
    enonce: "Combien d'entiers contient l'intervalle [−5 ; 5] ? Et l'intervalle ]−5 ; 5[ ?",
    correction: "11 entiers pour [−5 ; 5] ; 9 entiers pour ]−5 ; 5[ (on enlève −5 et 5).",
  },
  15: {
    enonce: "Pour f(x) = x², quels sont les antécédents de 100 ? Et de −4 ?",
    correction: "Antécédents de 100 : 10 et −10. De −4 : aucun (un carré n'est jamais négatif).",
  },
  16: {
    enonce: "La lumière met 8 min du Soleil à la Terre, et 4 ans jusqu'à l'étoile la plus proche. Combien de fois plus loin est l'étoile ? (1 an ≈ 5 × 10 puissance 5 min)",
    correction: "Environ 2,6 × 10 puissance 5, soit 260 000 fois. (4 ans = 2 × 10 puissance 6 min ; ÷ 8 ≈ 2,6 × 10 puissance 5.)",
  },
  17: {
    enonce: "Une fonction affine vérifie f(1) = 5 et f(3) = 11. Donne f(x), puis résous f(x) = 20.",
    correction: "f(x) = 3x + 2 ; f(x) = 20 → x = 6. (a = (11 − 5)/(3 − 1) = 3 ; b = 5 − 3 = 2.)",
  },
  18: {
    enonce: "Pour la fonction carré, est-il vrai que « plus x est grand, plus x² est grand » ? Justifie avec un exemple.",
    correction: "Non, pas pour les négatifs : (−5)² = 25 > (−2)² = 4, alors que −5 < −2. La fonction carré décroît sur les négatifs.",
  },
  19: {
    enonce: "Dans un repère, A(−1 ; 4) et B(5 ; −2). Quelles sont les coordonnées du milieu de [AB] ?",
    correction: "(2 ; 1). (Milieu : ((−1 + 5)/2 ; (4 + (−2))/2) = (2 ; 1).)",
  },
  20: {
    enonce: "Dans un repère, A(1 ; 2) et B(4 ; 6). Quelle est la distance AB ?",
    correction: "5. (AB = racine de ((4−1)² + (6−2)²) = racine de (9 + 16) = racine de 25 = 5.)",
  },
  21: {
    enonce: "Une année-lumière ≈ 9,5 × 10 puissance 12 km. L'univers observable fait ≈ 9 × 10 puissance 10 années-lumière. Donne son rayon en km (ordre de grandeur).",
    correction: "Environ 10 puissance 24 km. (9 × 10 puissance 10 × 9,5 × 10 puissance 12 ≈ 8,5 × 10 puissance 23 ≈ 10 puissance 24.)",
  },
  22: {
    enonce: "On applique le vecteur (+2 ; +3) cinq fois de suite au point (1 ; 1). Où arrive-t-on ?",
    correction: "(11 ; 16). (1 + 5×2 = 11 ; 1 + 5×3 = 16.)",
  },
  23: {
    enonce: "Dans un triangle rectangle, un angle aigu vaut 30° et l'hypoténuse 12. Que valent les deux autres côtés ? (sin 30° = 0,5, cos 30° ≈ 0,87)",
    correction: "Côté opposé à 30° : 12 × 0,5 = 6 ; côté adjacent : 12 × 0,87 ≈ 10,4.",
  },
  24: {
    enonce: "Une maquette de planète est au 1/1 000 000 d'un astre de 1 000 km de diamètre. Quel diamètre pour la maquette ?",
    correction: "1 m. (1 000 km = 10 puissance 9 mm ; ÷ 10 puissance 6 = 10 puissance 3 mm = 1 m.)",
  },
  25: {
    enonce: "La moyenne de 6 nombres est 15. On ajoute un 7e nombre et la moyenne devient 16. Quel est ce 7e nombre ?",
    correction: "22. (Total de 6 : 90 ; total de 7 : 112 ; 112 − 90 = 22.)",
  },
  26: {
    enonce: "Une série rangée a 12 valeurs. À quels rangs se trouvent Q1, la médiane et Q3 ?",
    correction: "Q1 au rang 3 (12÷4), médiane entre les 6e et 7e, Q3 au rang 9 (3×12÷4).",
  },
  27: {
    enonce: "On lance deux dés. Quelle est la probabilité que le produit des deux résultats soit pair ?",
    correction: "3/4. (Le produit est impair seulement si les deux dés sont impairs : 3×3 = 9 cas sur 36 = 1/4 ; donc pair = 1 − 1/4 = 3/4.)",
  },
  28: {
    enonce: "Trouve le PGCD de 252 et 360, puis simplifie 252/360.",
    correction: "PGCD 36 ; 252/360 = 7/10.",
  },
  29: {
    enonce: "On estime 10 puissance 28 atomes dans un humain et 10 puissance 24 grains de sable sur Terre. Lequel est le plus grand, et combien de fois ?",
    correction: "Il y a plus d'atomes dans un seul humain : 10 puissance 4 = 10 000 fois plus que de grains de sable sur toute la Terre !",
  },
  30: {
    enonce: "Du quark (10 puissance −18 m) à l'univers (10 puissance 27 m), il y a 45 ordres de grandeur. Si chaque « zoom » multiplie par 10, combien de zooms pour aller de l'un à l'autre ?",
    correction: "45 zooms. (Chaque facteur 10 = un ordre de grandeur ; 27 − (−18) = 45.)",
  },
};

/* Le carnet de Ti Margo — récit émerveillé, du minuscule à l'immense. */
export const carnet: Record<number, string> = {
  1: "Aujourd'hui commence le plus vertigineux des voyages : explorer toutes les échelles de l'univers ! J'ai une loupe magique qui zoome à l'infini, dans les deux sens. On part de ma taille, un petit mètre. Prêt à plonger ? Tu viens ?",
  2: "Je regarde un de mes cheveux : si fin ! Et pourtant, des milliers d'atomes y tiendraient côte à côte. Le tout petit cache des mondes entiers.",
  3: "Je range les choses par taille : moi, une fourmi, une cellule, un atome. À chaque cran, on divise par mille, par dix mille. C'est fou comme le monde est étagé !",
  4: "Je déplie une carte. Quelques centimètres ici valent des kilomètres en vrai. Les échelles, on en a besoin partout pour comprendre.",
  5: "Je joue avec les pourcentages au marché. Augmenter puis baisser ne ramène pas au départ : drôle de surprise ! Les nombres ont leur logique secrète.",
  6: "Je règle la loupe sur « minuscule »… et hop, je plonge dans une goutte d'eau ! Des cellules partout, qui se divisent en deux, encore et encore. La vie grouille !",
  7: "Je dessine une molécule géante sur ma feuille. Avec mes lettres et mes parenthèses, je « développe » des formules. Les maths sont une langue magnifique.",
  8: "J'apprends des formules magiques : les identités remarquables. Un carré, et hop, trois termes apparaissent ! C'est presque un tour de magie.",
  9: "Maintenant je fais l'inverse : je « factorise », je remets en paquet. Développer, factoriser : deux chemins, un même monde.",
  10: "Je cherche une inconnue, comme un détective. Un x se cache dans l'équation… et je le trouve ! Quelle satisfaction.",
  11: "La loupe descend encore : voici l'atome ! Un noyau minuscule, des électrons autour. Il faudrait dix millions d'atomes pour faire un millimètre. Vertige !",
  12: "Je jongle avec les puissances de 10. Multiplier, c'est additionner les exposants. Tout devient simple et élégant à cette échelle.",
  13: "Je découvre les inégalités. Attention au piège : quand on divise par un nombre négatif, le sens change ! Il faut rester vigilant.",
  14: "Je range les nombres dans des intervalles, comme dans des boîtes. Crochet fermé, crochet ouvert : chaque détail compte.",
  15: "Je rencontre les fonctions : on donne un nombre, elles en rendent un autre. Comme une petite machine. J'adore leur logique.",
  16: "Je remonte la loupe vers le grand ! Voici la Terre, énorme : cent cinquante millions de kilomètres jusqu'au Soleil. Quel changement d'échelle !",
  17: "Je trace des droites dans un repère. Une fonction affine, c'est une route bien droite. Je peux prévoir où elle va.",
  18: "La fonction carré dessine une jolie courbe : la parabole. Étonnant, un nombre négatif peut donner une grande image !",
  19: "Je place des points dans le ciel, comme une carte des étoiles. Chacun a ses coordonnées. Je trouve même le milieu de deux étoiles !",
  20: "Je mesure la distance entre deux points grâce à Pythagore. De si loin, tout devient géométrie. Le ciel est un grand repère.",
  21: "La loupe explose vers l'immense : les étoiles, par milliards ! La galaxie fait cent mille années-lumière. Les nombres deviennent gigantesques.",
  22: "Je guide mon vaisseau avec des vecteurs : une direction, une longueur, et hop, je me déplace d'étoile en étoile.",
  23: "J'utilise la trigonométrie pour viser une étoile lointaine. Un petit angle, et je sais où pointer. Magique !",
  24: "J'agrandis une maquette par dix : son aire est multipliée par cent, son volume par mille ! Les échelles réservent toujours des surprises.",
  25: "Je note les températures des étoiles et j'en fais des statistiques. Médiane, moyenne… mettre de l'ordre dans l'immensité, ça aide à comprendre.",
  26: "Me voici devant l'univers entier, parsemé de galaxies. Je le décris avec des quartiles, comme un océan de lumière. Quelle beauté !",
  27: "Je joue aux dés avec les étoiles : quelles sont les chances ? Le hasard aussi obéit à des lois. Rien n'est totalement imprévisible.",
  28: "Je décompose les grands nombres en facteurs premiers, comme on démonte une horloge. Tout est fait de petites briques.",
  29: "Je compare l'infiniment petit et l'infiniment grand : il y a plus d'atomes dans mon corps que d'étoiles dans la galaxie ! J'en ai le souffle coupé.",
  30: "Du quark à l'univers, j'ai traversé 45 puissances de 10. Quel voyage, du jardin jusqu'aux confins du cosmos ! Me voilà prêt pour la 2nde. Merci d'avoir zoomé avec moi jusqu'au bout : on a réussi, ensemble ! 🎓",
};

/* « Le savais-tu ? » — ancrage local 🌺 / ouverture monde 🌍, au fil des échelles. */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "monde", texte: "Le film « Powers of Ten » (1977) montre un zoom du corps humain jusqu'aux galaxies, puis jusqu'aux atomes : exactement ce voyage !" },
  2: { portee: "monde", texte: "Un cheveu fait environ 0,1 mm de large ; on pourrait y aligner près d'un million d'atomes." },
  3: { portee: "monde", texte: "Notre corps est fait d'environ 30 000 milliards de cellules, chacune trop petite pour être vue à l'œil nu." },
  4: { portee: "local", texte: "Pour cartographier le relief de La Réunion, on utilise des cartes à différentes échelles, du sentier à l'île entière." },
  5: { portee: "monde", texte: "Une hausse puis une baisse du même pourcentage ne se compensent jamais exactement : c'est un piège classique." },
  6: { portee: "monde", texte: "Certaines bactéries se divisent toutes les 20 minutes : d'une seule, on dépasserait le milliard en une dizaine d'heures." },
  7: { portee: "monde", texte: "Les molécules sont des assemblages d'atomes : l'eau, c'est deux atomes d'hydrogène et un d'oxygène (H2O)." },
  8: { portee: "monde", texte: "Les identités remarquables étaient déjà connues des mathématiciens grecs, il y a plus de 2 000 ans." },
  9: { portee: "monde", texte: "Factoriser sert partout : c'est la base du chiffrement qui protège tes données sur Internet." },
  10: { portee: "monde", texte: "Le mot « algèbre » vient de l'arabe « al-jabr » : la science de résoudre les équations." },
  11: { portee: "monde", texte: "Un atome est surtout fait de vide : si le noyau était une bille au centre d'un stade, les électrons seraient aux tribunes." },
  12: { portee: "monde", texte: "Les puissances de 10 permettent d'écrire aussi bien la taille d'un atome que la distance d'une galaxie." },
  13: { portee: "monde", texte: "Diviser une inégalité par un nombre négatif inverse son sens : une règle qu'on n'oublie jamais après s'être trompé une fois !" },
  14: { portee: "monde", texte: "La notion d'intervalle sert à décrire un ensemble de mesures, par exemple une température « entre 20 et 25 °C »." },
  15: { portee: "monde", texte: "Les fonctions servent à modéliser le monde : la trajectoire d'une fusée, la croissance d'une population…" },
  16: { portee: "monde", texte: "La Terre est à 150 millions de km du Soleil ; cette distance s'appelle une « unité astronomique »." },
  17: { portee: "local", texte: "Une fonction affine décrit par exemple le prix d'un abonnement : une part fixe, plus un montant par mois." },
  18: { portee: "monde", texte: "La trajectoire d'un objet qu'on lance suit une parabole, la courbe de la fonction carré." },
  19: { portee: "local", texte: "Depuis l'observatoire du Maïdo, à La Réunion, on repère les astres par leurs coordonnées dans le ciel." },
  20: { portee: "monde", texte: "Le théorème de Pythagore, vieux de 2 500 ans, sert encore à calculer des distances dans l'espace." },
  21: { portee: "monde", texte: "La lumière d'étoiles lointaines met des milliers d'années à nous parvenir : on les voit telles qu'elles étaient dans le passé." },
  22: { portee: "monde", texte: "Les vecteurs servent en physique à décrire les forces, les vitesses et les déplacements." },
  23: { portee: "monde", texte: "C'est grâce à la trigonométrie qu'on a mesuré la distance de la Lune et du Soleil, bien avant les fusées." },
  24: { portee: "monde", texte: "En agrandissant un objet, le volume grandit beaucoup plus vite que la surface : c'est pourquoi les géants n'existent pas vraiment." },
  25: { portee: "monde", texte: "Les astronomes classent les étoiles selon leur température et leur lumière, à l'aide de statistiques." },
  26: { portee: "monde", texte: "L'univers observable contiendrait environ 2 000 milliards de galaxies." },
  27: { portee: "monde", texte: "Le calcul des probabilités est né au XVIIe siècle… autour de jeux de dés !" },
  28: { portee: "monde", texte: "Tout nombre entier se décompose de façon unique en facteurs premiers : c'est le « théorème fondamental de l'arithmétique »." },
  29: { portee: "local", texte: "À La Réunion, on étudie aussi bien l'infiniment petit (la matière du volcan) que l'infiniment grand (le ciel du Maïdo)." },
  30: { portee: "monde", texte: "En 2nde, la SNT et les sciences t'emmèneront justement de l'atome aux galaxies : ce cahier t'a ouvert la route. Bon décollage !" },
};
