/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « Vers le CM2 » (CM1 → CM2).                 */
/*  Fil conducteur : Ti Margo découvre son île — un tour nature et côtier de   */
/*  La Réunion en 6 étapes (douces, adaptées aux plus jeunes).                 */
/*  Niveau CM1. Semaine 1 témoin (5 jours) ; le reste viendra ensuite.         */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 étapes du parcours « Ti Margo découvre son île ». */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🏖️", lieu: "La plage et le lagon", intro: "Ti Margo part découvrir son île par la plage !" },
  { semaine: 2, etape: 2, emoji: "🐢", lieu: "Le récif et les tortues", intro: "Cap sur le récif, à la rencontre des tortues." },
  { semaine: 3, etape: 3, emoji: "🌴", lieu: "La forêt et les fleurs", intro: "On s'enfonce dans la forêt pleine de couleurs." },
  { semaine: 4, etape: 4, emoji: "💧", lieu: "La rivière et les cascades", intro: "On remonte la rivière jusqu'aux cascades." },
  { semaine: 5, etape: 5, emoji: "🛖", lieu: "Le marché et le village", intro: "Jour de marché : couleurs, odeurs et bonnes affaires !" },
  { semaine: 6, etape: 6, emoji: "🌅", lieu: "Le grand pique-nique", intro: "Dernière étape : pique-nique au point de vue, prêt pour le CM2 !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · La plage et le lagon ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Petit explorateur",
    maths: {
      calcul: [
        { q: "5 × 3 =", r: "15" },
        { q: "4 × 2 =", r: "8" },
        { q: "12 + 7 =", r: "19" },
        { q: "20 − 6 =", r: "14" },
        { q: "2 × 5 =", r: "10" },
      ],
      probleme: {
        enonce:
          "Sur la plage, Ti Margo ramasse 8 coquillages le matin et 6 l'après-midi. Combien en a-t-il en tout ?",
        correction: "8 + 6 = 14. Il a 14 coquillages.",
      },
      illu: { emoji: "🐚", label: "coquillages" },
    },
    francais: {
      regleTitre: "Le point et la majuscule",
      regle:
        "Une phrase commence par une majuscule et se termine par un point.",
      consigne: "Recopie en ajoutant la majuscule et le point.",
      items: ["ti margo aime la plage", "le lagon est calme", "les poissons nagent"],
      correction:
        "Ti Margo aime la plage. — Le lagon est calme. — Les poissons nagent.",
    },
    mot: {
      mot: "Addition",
      nature: "nom, maths",
      definition: "Une addition, c'est quand on ajoute des nombres ensemble.",
      exemple: "3 + 2 = 5 est une addition.",
    },
    geste: {
      titre: "Allumer l'ordinateur",
      texte: "On appuie sur le bouton « marche » pour démarrer l'ordinateur.",
    },
    defi: {
      enonce: "Quel nombre vient juste après 19 ?",
      correction: "20.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Ami du lagon",
    maths: {
      calcul: [
        { q: "3 × 4 =", r: "12" },
        { q: "5 × 5 =", r: "25" },
        { q: "15 + 10 =", r: "25" },
        { q: "18 − 9 =", r: "9" },
        { q: "10 × 2 =", r: "20" },
      ],
      probleme: {
        enonce:
          "Ti Margo a 12 billes. Il en donne la moitié à un ami. Combien lui en reste-t-il ?",
        correction: "La moitié de 12, c'est 6. Il lui reste 6 billes.",
      },
      illu: { emoji: "🪸", label: "corail" },
    },
    francais: {
      regleTitre: "Le verbe",
      regle:
        "Le verbe dit l'action ou ce que l'on est. Il change quand on change le temps.",
      consigne: "Entoure le verbe de chaque phrase.",
      items: ["Ti Margo nage.", "Les vagues roulent.", "Le soleil brille."],
      correction: "nage — roulent — brille.",
    },
    mot: {
      mot: "Moitié",
      nature: "nom, maths",
      definition: "La moitié, c'est quand on partage en deux parts égales.",
      exemple: "La moitié de 10, c'est 5.",
    },
    geste: {
      titre: "La souris",
      texte: "On déplace la souris pour bouger la flèche à l'écran.",
    },
    defi: {
      enonce: "Range ces nombres du plus petit au plus grand : 5, 2, 8.",
      correction: "2, 5, 8.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Œil de poisson",
    maths: {
      calcul: [
        { q: "6 × 2 =", r: "12" },
        { q: "4 × 5 =", r: "20" },
        { q: "23 + 14 =", r: "37" },
        { q: "30 − 12 =", r: "18" },
        { q: "3 × 3 =", r: "9" },
      ],
      probleme: {
        enonce:
          "Dans le lagon, Ti Margo voit 5 groupes de 4 poissons. Combien de poissons voit-il ?",
        correction: "5 × 4 = 20. Il voit 20 poissons.",
      },
      illu: { emoji: "🐠", label: "poissons du lagon" },
    },
    francais: {
      regleTitre: "Le sujet",
      regle:
        "Le sujet répond à la question « Qui est-ce qui ? » posée devant le verbe.",
      consigne: "Souligne le sujet de chaque phrase.",
      items: ["Ti Margo plonge.", "Les enfants jouent.", "Le crabe court."],
      correction: "Ti Margo — Les enfants — Le crabe.",
    },
    mot: {
      mot: "Dizaine",
      nature: "nom, maths",
      definition: "Une dizaine, c'est un paquet de dix unités.",
      exemple: "Dans 30, il y a 3 dizaines.",
    },
    geste: {
      titre: "Le clic gauche",
      texte:
        "On appuie une fois sur le bouton gauche de la souris pour choisir quelque chose.",
    },
    defi: {
      enonce: "Combien de pattes ont 3 chiens ?",
      correction: "12 pattes (3 × 4 = 12).",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Champion du sable",
    maths: {
      calcul: [
        { q: "7 × 2 =", r: "14" },
        { q: "5 × 4 =", r: "20" },
        { q: "16 + 16 =", r: "32" },
        { q: "25 − 10 =", r: "15" },
        { q: "4 × 4 =", r: "16" },
      ],
      probleme: {
        enonce:
          "Ti Margo remplit 9 seaux de sable, puis encore 7. Combien de seaux a-t-il remplis ?",
        correction: "9 + 7 = 16. Il a rempli 16 seaux.",
      },
      illu: { emoji: "🏖️", label: "château de sable" },
    },
    francais: {
      regleTitre: "Le pluriel des noms",
      regle: "Au pluriel, la plupart des noms prennent un -s.",
      consigne: "Écris ces groupes au pluriel.",
      items: ["un coquillage →", "une vague →", "un poisson →"],
      correction: "des coquillages — des vagues — des poissons.",
    },
    mot: {
      mot: "Double",
      nature: "nom, maths",
      definition: "Le double, c'est deux fois plus.",
      exemple: "Le double de 4, c'est 8.",
    },
    geste: {
      titre: "Le clavier",
      texte: "Le clavier sert à écrire des lettres et des chiffres.",
    },
    defi: {
      enonce: "Complète la suite : 2, 4, 6, … ?",
      correction: "8 : on ajoute 2 à chaque fois.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Cap sur le CM2",
    maths: {
      calcul: [
        { q: "8 × 2 =", r: "16" },
        { q: "3 × 5 =", r: "15" },
        { q: "40 + 20 =", r: "60" },
        { q: "50 − 20 =", r: "30" },
        { q: "10 × 3 =", r: "30" },
      ],
      probleme: {
        enonce: "Une glace coûte 2 €. Combien coûtent 3 glaces ?",
        correction: "3 × 2 = 6. Les 3 glaces coûtent 6 €.",
      },
      illu: { emoji: "🍦", label: "glace" },
    },
    francais: {
      regleTitre: "Masculin et féminin",
      regle: "Pour mettre un mot au féminin, on ajoute souvent un -e.",
      consigne: "Mets au féminin.",
      items: ["un ami →", "un marchand →", "un petit →"],
      correction: "une amie — une marchande — une petite.",
    },
    mot: {
      mot: "Différence",
      nature: "nom, maths",
      definition: "La différence, c'est le résultat d'une soustraction.",
      exemple: "La différence entre 9 et 4 est 5, car 9 − 4 = 5.",
    },
    geste: {
      titre: "L'écran",
      texte: "L'écran montre ce que fait l'ordinateur (textes, images, jeux).",
    },
    defi: {
      enonce: "Ti Margo a 4 coquillages, il en trouve 3 de plus. Combien en a-t-il ?",
      correction: "7 coquillages (4 + 3 = 7).",
    },
  },
];

/* Défis ★★★★★ (niveau expert) — un peu plus durs, mais à la portée d'un CM1. */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce:
      "Avec les chiffres 2 et 5, écris le plus grand nombre à 2 chiffres, puis le plus petit.",
    correction: "Le plus grand : 52. Le plus petit : 25.",
  },
  2: {
    enonce:
      "Ti Margo a 10 coquillages. Il en perd 3, puis en trouve 5. Combien en a-t-il maintenant ?",
    correction: "10 − 3 + 5 = 12. Il a 12 coquillages.",
  },
  3: {
    enonce: "Combien de fois le nombre 2 va-t-il dans 10 ?",
    correction: "5 fois, car 2 + 2 + 2 + 2 + 2 = 10.",
  },
  4: {
    enonce: "Quel nombre est juste au milieu entre 10 et 20 ?",
    correction: "15.",
  },
  5: {
    enonce: "J'ai 3 pièces qui font 6 € en tout. Quelles pièces ai-je ?",
    correction: "Trois pièces de 2 € (2 + 2 + 2 = 6).",
  },
};

/* Le carnet de Ti Margo — récit doux, jour après jour (Semaine 1 : la plage). */
export const carnet: Record<number, string> = {
  1: "Bonjour ! Je m'appelle Ti Margo. Aujourd'hui, je pars découvrir mon île. On commence par la plage : suis-moi !",
  2: "Le lagon est si calme ce matin. Je compte les coquillages dans le sable… il y en a partout !",
  3: "Je mets la tête sous l'eau : des poissons multicolores nagent autour de moi. Quelle merveille !",
  4: "On construit un grand château de sable avec des amis. Bien compter les seaux, c'est important !",
  5: "Quelle belle première étape ! Demain, on part voir les tortues près du récif. À tout à l'heure !",
};

/* « Le savais-tu ? » — ancrage local 🌺 / ouverture monde 🌍. */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "local", texte: "À La Réunion, il y a des plages de sable blanc et, près du volcan, des plages de sable noir !" },
  2: { portee: "monde", texte: "Un lagon est une eau calme protégée par un récif de corail ; on en trouve dans beaucoup d'îles du monde." },
  3: { portee: "local", texte: "Dans le lagon de l'Hermitage, les poissons sont protégés : on les regarde, mais on ne les attrape pas." },
  4: { portee: "monde", texte: "Le sable est fait de tout petits morceaux de roche et de coquillages, usés par la mer pendant très longtemps." },
  5: { portee: "local", texte: "À La Réunion, l'eau de la mer est chaude presque toute l'année : on peut se baigner même en hiver !" },
};
