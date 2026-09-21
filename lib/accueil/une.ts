// LA UNE DE LA SEMAINE — ce que la bande de l'accueil montre, et rien d'autre.
//
// ── POURQUOI CE FICHIER EXISTE (20/09/2026) ──────────────────────────────────
// Frédéric : « sur la page d'accueil tu mettrais le short avec la feuille
// d'exercices et les séries du short », puis le bémol : « on essaie par semaine
// d'avoir, comme la baleine concerne le lycée, la même chose pour le collège et
// le primaire si disponible — comme un slide ».
//
// Une semaine = jusqu'à TROIS diapositives (lycée, collège, primaire). Chacune
// part d'un short déjà publié et mène à ce qui existe sur le site pour la même
// notion : la feuille d'exercices, la fiche de cours, les séries du coach.
//
// ⛔ UN LIEN N'EST ÉCRIT ICI QUE SI LA PAGE EXISTE. C'est la leçon de
// components/fiches/VideoNotion.tsx : une bande qui promettrait une feuille pas
// encore écrite ferait découvrir le vide après le clic. Pas de feuille → pas de
// ligne `feuille`, et le bouton n'apparaît pas.
//
// ── COMMENT CHANGER DE SEMAINE ───────────────────────────────────────────────
// On ajoute une entrée EN TÊTE de `UNES`. C'est la première qui s'affiche ; les
// suivantes sont l'archive. Si personne n'y touche, la dernière Une reste : la
// page ne se vide jamais toute seule.
// ⚠️ PAS DE CALCUL DE DATE, ET C'EST VOULU. Choisir la Une d'après `new Date()`
// donnerait un HTML prérendu (daté du déploiement) différent de celui du
// navigateur le lundi suivant — une erreur d'hydratation pour gagner une
// programmation dont personne n'a besoin : le site se déploie presque chaque
// jour. `semaine` n'est donc qu'un libellé affiché.
//
// ── LA VIGNETTE ──────────────────────────────────────────────────────────────
// Une image de NOTRE domaine (public/une/*.webp, ~10 Ko), jamais le lecteur
// YouTube : une iframe tire ~1 Mo de script avant le moindre clic (la note est
// dans app/fiches-ecriture/page.tsx), et une vignette servie par ytimg.com
// enverrait chaque visiteur de l'accueil chez Google sans qu'il ait rien
// demandé. Elle se fabrique depuis la miniature du short :
//   sharp(<miniature 1080×1920>).resize({ width: 216 }).webp({ quality: 78 })

export type CycleUne = "lycee" | "college" | "primaire";

export type GenreLienUne = "feuille" | "fiche" | "series";

export type LienUne = {
  genre: GenreLienUne;
  label: string;
  /** Le même, en deux mots, pour le téléphone : à 375 px les trois boutons
   *  doivent tenir sur UNE ligne, sinon la bande repousse le champ de saisie. */
  court: string;
  href: string;
};

export type DiapoUne = {
  cycle: CycleUne;
  /** L'onglet : « Lycée », « Collège », « Primaire ». */
  onglet: string;
  /** La phrase entière, telle qu'elle s'affiche. En maths elle complète le trou
   *  de « Les maths, ça sert à rien… sauf à ___ » — la phrase d'ouverture de
   *  cours de Frédéric, et la légende du même short sur Instagram. */
  accroche: string;
  /** La notion et son niveau, en petit : « Second degré · 1re spé ». */
  notion: string;
  short: {
    /** L'identifiant YouTube du short (ce qui suit /shorts/). */
    id: string;
    titre: string;
    /** Chemin sous /public — voir « LA VIGNETTE » en tête de fichier. */
    vignette: string;
  };
  liens: LienUne[];
};

export type Une = {
  /** Libellé affiché, rien de plus : « Semaine du 21 septembre ». */
  semaine: string;
  diapos: DiapoUne[];
};

// Les deux diapositives que la semaine du 21 septembre garde d'une Une à l'autre.
const COLLEGE_FRACTIONS: DiapoUne = {
  cycle: "college",
  onglet: "Collège",
  accroche: "Les maths, ça sert à rien… sauf à ne pas croire que 1/2 + 1/3 = 2/5.",
  notion: "Calculer avec des fractions · 5e",
  short: {
    id: "BsT5A1Brwxg",
    titre: "1/2 + 1/3 ne fait pas 2/5 — voici pourquoi",
    vignette: "/une/short-fractions-additionner.webp",
  },
  liens: [
    {
      genre: "feuille",
      label: "La feuille : 20 exercices",
      court: "20 exercices",
      href: "/fiches-exercices/maths/5e/fraction-calcul?from=une",
    },
    {
      genre: "fiche",
      label: "La fiche de cours",
      court: "La fiche",
      href: "/fiches-cours/maths/5e/fraction-calcul?from=une",
    },
    {
      genre: "series",
      label: "Les séries du coach",
      court: "Le coach",
      href: "/coach-ia/maths?classe=5e&notion=fraction&from=une",
    },
  ],
};

const PRIMAIRE_LETTRE_A: DiapoUne = {
  cycle: "primaire",
  onglet: "Primaire",
  accroche: "La belle écriture : le a, tracé devant toi, puis à repasser crayon en main.",
  notion: "Écrire le a en cursive · CP",
  short: {
    id: "I8stjojvTmg",
    titre: "La lettre a en cursive · droitier",
    vignette: "/une/short-lettre-a-droitier.webp",
  },
  liens: [
    {
      genre: "feuille",
      label: "La fiche d'écriture à imprimer",
      court: "La fiche d'écriture",
      href: "/fiches-ecriture/lettres/a?from=une",
    },
  ],
};

export const UNES: Une[] = [
  // ⭐ LE LYCÉE PASSE AUX NOMBRES RÉELS (21/09/2026). Frédéric : « pourquoi ne
  // ferait-on pas une vidéo lycée sur une contradiction ? », puis « ok 1er short,
  // et du coup on mettra à jour la page d'accueil ». C'est la notion qui ouvre
  // l'année de seconde (la valeur absolue s'enseigne en septembre) ; sa fiche et
  // sa feuille sont en ligne depuis le matin même. Le short « Sarah Knafo »
  // descend dans l'archive.
  // ⚠️ `notion=réels` : ce terme n'ouvre QU'UNE des 24 notions de seconde —
  // compté sur les libellés du coach avant d'écrire le lien (« valeur absolue »
  // en ouvre deux, « intervalle » trois).
  {
    semaine: "Semaine du 21 septembre",
    diapos: [
      {
        cycle: "lycee",
        onglet: "Lycée",
        accroche:
          "Les maths, ça sert à rien… sauf à savoir que 0,999… et 1 sont le même nombre.",
        notion: "Nombres réels et valeur absolue · 2de",
        short: {
          id: "rmsHC82_MoM",
          titre: "0,999… = 1 — et ce n'est pas un arrondi",
          vignette: "/une/short-0999-egale-1.webp",
        },
        liens: [
          {
            genre: "feuille",
            label: "La feuille : 20 exercices",
            court: "20 exercices",
            href: "/fiches-exercices/maths/seconde/reels-intervalles?from=une",
          },
          {
            genre: "fiche",
            label: "La fiche de cours",
            court: "La fiche",
            href: "/fiches-cours/maths/seconde/reels-intervalles?from=une",
          },
          {
            genre: "series",
            label: "Les séries du coach",
            court: "Le coach",
            href: "/coach-ia/maths?classe=seconde&notion=r%C3%A9els&from=une",
          },
        ],
      },
      COLLEGE_FRACTIONS,
      PRIMAIRE_LETTRE_A,
    ],
  },
  // ⭐ LE LYCÉE CHANGE EN COURS DE SEMAINE (20/09/2026 au soir). Frédéric : « à la
  // Une de eleveai on met une vidéo associée à un coach IA et feuille d'exercices,
  // comme avec les baleines » — le short « Sarah Knafo a-t-elle raison ? » suit
  // l'actualité, il n'attend pas lundi prochain. Collège et primaire ne bougent
  // pas ; la baleine passe dans l'entrée suivante, l'archive.
  // ⛔ PAS D'ÉTIQUETTE DE CLASSE UNIQUE : l'information chiffrée est au programme
  // de seconde ET du tronc commun de première.
  {
    semaine: "Semaine du 21 septembre",
    diapos: [
      {
        cycle: "lycee",
        onglet: "Lycée",
        accroche:
          "Les maths, ça sert à rien… sauf à vérifier ce que disent les politiques.",
        notion: "Pourcentages et évolutions · 2de et 1re",
        short: {
          id: "LaEHPPdKZHc",
          titre: "Sarah Knafo a-t-elle raison ? Oui… et non",
          vignette: "/une/short-fiche-de-paie.webp",
        },
        liens: [
          {
            genre: "feuille",
            label: "La feuille : 20 exercices",
            court: "20 exercices",
            href: "/fiches-exercices/maths/seconde/information-chiffree-evolutions?from=une",
          },
          {
            genre: "fiche",
            label: "La fiche et sa vidéo",
            court: "La fiche",
            href: "/fiches-cours/maths/seconde/information-chiffree-evolutions?from=une",
          },
          {
            genre: "series",
            label: "Les séries du coach",
            court: "Le coach",
            href: "/coach-ia/maths?classe=seconde&notion=information&from=une",
          },
        ],
      },
      COLLEGE_FRACTIONS,
      PRIMAIRE_LETTRE_A,
    ],
  },
  {
    semaine: "Semaine du 21 septembre",
    diapos: [
      {
        cycle: "lycee",
        onglet: "Lycée",
        accroche:
          "Les maths, ça sert à rien… sauf à savoir qui saute le plus haut, du dauphin ou de la baleine.",
        notion: "Second degré · 1re spé",
        short: {
          id: "RvgUjvT9fQQ",
          titre: "La baleine saute plus loin… mais le dauphin monte plus haut",
          vignette: "/une/short-second-degre-dauphin.webp",
        },
        liens: [
          {
            genre: "feuille",
            label: "La feuille : 20 exercices",
            court: "20 exercices",
            href: "/fiches-exercices/maths/premiere-spe/second-degre?from=une",
          },
          {
            genre: "fiche",
            label: "La fiche et ses vidéos",
            court: "La fiche",
            href: "/fiches-cours/maths/premiere-spe/second-degre?from=une",
          },
          {
            genre: "series",
            label: "Les séries du coach",
            court: "Le coach",
            href: "/coach-ia/maths?classe=premiere-spe&notion=second%20degr%C3%A9&from=une",
          },
        ],
      },
      // La feuille du collège est arrivée le soir même (Frédéric, 20/09 : « pour
      // le collège on fait la fiche fractions ») : le trio est complet.
      COLLEGE_FRACTIONS,
      PRIMAIRE_LETTRE_A,
    ],
  },
];

/** La Une affichée : la première du fichier. Voir « COMMENT CHANGER DE SEMAINE ». */
export const UNE_COURANTE: Une | undefined = UNES[0];
