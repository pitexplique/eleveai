// lib/tutor-v4/questionBank/4e/maths/nombres-premiers.bank.ts
//
// ⭐ NOTION OUVERTE LE 30/08/2026 : `nombre_premier`. Avec sa sœur
// `divisibilite`, elle ferme les dix puces ouvertes du chapitre du BO
// « Comprendre et utiliser les notions de divisibilité et de nombres
// premiers ».
//
// ⭐ LA FRACTURE AVEC `divisibilite` EST À SENS UNIQUE : décomposer un nombre
// en facteurs premiers a BESOIN des diviseurs et des critères, alors que
// reconnaître un multiple n'a aucun besoin des nombres premiers. C'est ce qui
// justifie deux notions plutôt qu'une de onze micros.
//
// ⭐⭐ LA NUANCE DU BO À NE PAS RATER : la LISTE à connaître s'arrête à 30
// (4e-A-divisibilite-4), mais la COMPÉTENCE demande de DÉTERMINER les premiers
// jusqu'à 100 (4e-A-divisibilite-7). Retenir et savoir trouver sont deux
// gestes différents, donc deux micros — `premier_definition` porte la liste,
// `premier_determiner` porte la méthode.
//
// ⭐ LE CRIBLE D'ÉRATOSTHÈNE EST LA MÉTHODE, et son arrêt est le vrai contenu :
// on s'arrête à 7 pour tester jusqu'à 100, parce que 11² dépasse déjà 100. Un
// élève qui teste tous les nombres jusqu'à 99 n'a pas compris le crible.
//
// ⚠️ 1 N'EST PAS PREMIER, et ce n'est pas une convention arbitraire : il n'a
// qu'UN seul diviseur, alors que la définition en demande exactement deux.
// L'item figé le traite comme la valeur particulière qu'il est.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS
// PARTICULIÈRES : le cas de 1, et le point d'arrêt du crible.
//
// ⭐⭐ 30/09/2026 — LES PHRASES CHANGENT, PAS SEULEMENT LES NOMBRES. Les élèves
// reconnaissaient la phrase (« Le nombre # est-il premier ? » revenait 18 fois
// sur 20). Chaque gabarit compose désormais une SITUATION (rangements en
// rectangle, groupes égaux, numéros de maisons, fractions « x sur y »…) × une
// TOURNURE. Mesure : scripts/mesurer-squelettes-coach.ts 4e nombre_premier.
// ⭐ La situation-mère du chapitre : ranger n objets en rectangle (au moins
// deux rangées de plus d'un objet) n'est possible que si n n'est PAS premier.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** Les vingt-cinq nombres premiers inférieurs à 100. */
const PREMIERS = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
] as const;

/** Ceux que le BO demande de connaître PAR CŒUR : jusqu'à 30. */
const PREMIERS_30 = PREMIERS.filter((p) => p <= 30);

function estPremier(n: number) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

/** La décomposition en facteurs premiers, écrite en clair. */
function decomposer(n: number): number[] {
  const f: number[] = [];
  let reste = n;
  for (const p of PREMIERS) {
    while (reste % p === 0) {
      f.push(p);
      reste /= p;
    }
    if (reste === 1) break;
  }
  if (reste > 1) f.push(reste);
  return f;
}

/** Le plus petit diviseur autre que 1 (n lui-même s'il est premier). */
function plusPetitDiviseur(n: number) {
  let d = 2;
  while (n % d !== 0) d++;
  return d;
}

const PRENOMS = [
  "Léa", "Hugo", "Inès", "Noah", "Chloé", "Yanis", "Manon", "Adam", "Jade",
  "Lucas", "Aïcha", "Théo", "Zoé", "Ilyes",
] as const;

/* ---------------------------------------------------------------------------
   LES SITUATIONS
--------------------------------------------------------------------------- */

// ⭐ RANGER n OBJETS EN RECTANGLE (ou en groupes égaux), au moins deux rangées
// de plus d'un objet : possible si et seulement si n n'est PAS premier. Chaque
// phrase porte elle-même la contrainte, pour que l'équivalence reste exacte.
// Plausibles de 11 à 250. Un seul contexte réunionnais (les samoussas).
const RANGEMENTS: readonly ((n: number) => string)[] = [
  (n) => `Pour un spectacle, on doit installer ${n} chaises en rangées toutes de même longueur, avec au moins deux rangées de plus d'une chaise.`,
  (n) => `Une jardinière veut planter ${n} salades en un rectangle d'au moins deux rangées, chacune de plus d'une salade.`,
  (n) => `Un carreleur a ${n} carreaux carrés et veut paver un rectangle sans en couper ni en laisser, avec au moins deux rangées de plus d'un carreau.`,
  (n) => `Pour un tournoi, ${n} sportifs doivent former plusieurs équipes de même effectif, d'au moins deux joueurs chacune.`,
  (n) => `Un pâtissier veut présenter ${n} macarons sur un buffet, en rangées égales : au moins deux rangées de plus d'un macaron.`,
  (n) => `Une photographe veut coller ${n} photos dans un album, le même nombre sur chaque page, sur au moins deux pages et à plus d'une photo par page.`,
  (n) => `Au laboratoire, ${n} tubes à essai doivent remplir exactement des portoirs identiques : au moins deux portoirs, d'au moins deux tubes chacun.`,
  (n) => `Un libraire veut empiler ${n} livres en piles de même hauteur : au moins deux piles, de plus d'un livre chacune.`,
  (n) => `Pour une sortie à vélo, ${n} cyclistes doivent partir en groupes de même taille : au moins deux groupes, d'au moins deux cyclistes.`,
  (n) => `Pour un cross, ${n} coureurs doivent être répartis en vagues de départ égales : au moins deux vagues, d'au moins deux coureurs.`,
  (n) => `Un orchestre de ${n} musiciens veut se placer en rangs égaux sur la scène, avec au moins deux rangs de plus d'un musicien.`,
  (n) => `Une association a ramassé ${n} sacs de déchets et veut les charger à parts égales dans au moins deux camionnettes, avec plus d'un sac par camionnette.`,
  (n) => `Un installateur doit poser ${n} panneaux solaires en un rectangle d'au moins deux rangées de plus d'un panneau.`,
  (n) => `Un marchand de samoussas en a préparé ${n} et veut les répartir en barquettes identiques : au moins deux barquettes, d'au moins deux samoussas.`,
  (n) => `Un paquet de ${n} cartes de collection doit être partagé entièrement et équitablement entre au moins deux amis, chacun recevant plus d'une carte.`,
  (n) => `Un informaticien veut afficher ${n} icônes dans une grille rectangulaire d'au moins deux lignes et deux colonnes, sans case vide.`,
];

/** Le lien entre la situation et la question « est-il premier ? ». */
const LIENS_RANGEMENT: readonly ((n: number) => string)[] = [
  (n) => `C'est possible seulement si ${n} n'est pas premier. `,
  () => "Tout dépend d'une seule question. ",
  () => "Avant de chercher un rangement, une vérification s'impose. ",
  () => "",
];

const QUESTIONS_EST_PREMIER: readonly ((n: number) => string)[] = [
  (n) => `Le nombre ${n} est-il premier ?`,
  (n) => `${n} est-il un nombre premier ?`,
  (n) => `Peut-on dire que ${n} est un nombre premier ?`,
  (n) => `Premier ou pas premier : que dire de ${n} ?`,
  (n) => `Décide si ${n} est un nombre premier.`,
];

const QUESTIONS_JUSTIFIER: readonly ((n: number) => string)[] = [
  (n) => `Le nombre ${n} est-il premier ? Justifie en testant les diviseurs utiles.`,
  (n) => `Teste seulement les diviseurs utiles : ${n} est-il premier ?`,
  (n) => `Quelle justification est correcte pour le nombre ${n} ?`,
  (n) => `Avec le moins de divisions possible, décide si ${n} est premier.`,
  (n) => `Choisis la bonne conclusion, avec sa raison, pour ${n}.`,
];

// Quatre nombres affichés côte à côte : des numéros, des nombres notés…
const SUPPORTS_LISTE: readonly ((l: string) => string)[] = [
  (l) => `Au tableau, le professeur a écrit : ${l}.`,
  (l) => `Sur une grille de loto, on a coché ${l}.`,
  (l) => `Les maillots de quatre joueuses portent les numéros ${l}.`,
  (l) => `Dans une rue, quatre maisons portent les numéros ${l}.`,
  (l) => `Quatre casiers du vestiaire portent les numéros ${l}.`,
  (l) => `Quatre bus de la ville ont pour numéros de ligne ${l}.`,
  (l) => `Dans une salle de cinéma, quatre fauteuils portent les numéros ${l}.`,
  (l) => `Lors d'une course, quatre dossards portent les numéros ${l}.`,
  (l) => `Dans un carnet de sciences, on a noté les nombres ${l}.`,
  (l) => `Quatre chambres d'un hôtel portent les numéros ${l}.`,
  (l) => `Sur une affiche de concours, on lit les nombres ${l}.`,
  (l) => `Dans un jeu de cartes numérotées, on a retourné ${l}.`,
  (l) => `Au marché, quatre étals portent les numéros ${l}.`,
];

// Une plage de numéros de a à b (a et b multiples de 10, donc jamais premiers :
// la question « combien » ne dépend pas de l'inclusion des bornes).
const SUPPORTS_PLAGE: readonly ((a: number, b: number) => string)[] = [
  (a, b) => `Les maisons d'une rue portent les numéros de ${a} à ${b}.`,
  (a, b) => `Dans une salle de cinéma, les fauteuils d'une rangée vont du numéro ${a} au numéro ${b}.`,
  (a, b) => `Au vestiaire d'un gymnase, les casiers sont numérotés de ${a} à ${b}.`,
  (a, b) => `Les dossards d'un groupe de coureurs vont de ${a} à ${b}.`,
  (a, b) => `Un hôtel numérote les chambres d'un étage de ${a} à ${b}.`,
  (a, b) => `Dans un parking, les places d'une allée vont de ${a} à ${b}.`,
  (a, b) => `Un recueil de chansons contient les morceaux numérotés de ${a} à ${b}.`,
  (a, b) => `Dans un jardin partagé, les parcelles portent les numéros de ${a} à ${b}.`,
  (a, b) => `Les pages ${a} à ${b} d'un manuel de sciences parlent des volcans.`,
  (a, b) => `Un bateau de croisière numérote ses cabines de ${a} à ${b}.`,
  (a, b) => `Au marché, les étals sont numérotés de ${a} à ${b}.`,
  (a, b) => `Dans une médiathèque, les étagères d'un rayon vont du numéro ${a} au numéro ${b}.`,
  (a, b) => `Pour une tombola, on a vendu les billets numérotés de ${a} à ${b}.`,
];

// Une part « num sur den » (num < den ⩽ 198), plausible pour chaque contexte.
const PROPORTIONS: readonly ((num: number, den: number) => string)[] = [
  (num, den) => `Au club de natation, ${num} nageurs sur ${den} font de la compétition.`,
  (num, den) => `Sur ${den} passagers d'un vol, ${num} voyagent avec un seul bagage.`,
  (num, den) => `Dans un potager de ${den} plants, ${num} sont des pieds de tomates.`,
  (num, den) => `Sur une playlist de ${den} morceaux, ${num} sont du jazz.`,
  (num, den) => `Sur ${den} élèves d'un collège interrogés, ${num} viennent à pied.`,
  (num, den) => `Sur ${den} déchets ramassés sur une plage, ${num} sont en plastique.`,
  (num, den) => `Sur ${den} graines semées en SVT, ${num} ont germé.`,
  (num, den) => `Sur un trajet à vélo de ${den} km, ${num} km se font sur une piste cyclable.`,
  (num, den) => `Un roman compte ${den} pages ; Léa en a déjà lu ${num}.`,
  (num, den) => `Dans une boîte de ${den} vis, ${num} sont cruciformes.`,
  (num, den) => `Sur ${den} jours d'ouverture, une boutique a fait des bénéfices pendant ${num} jours.`,
  (num, den) => `Sur ${den} tours de piste prévus à l'entraînement, un coureur en a déjà fait ${num}.`,
  (num, den) => `Un puzzle compte ${den} pièces ; ${num} sont déjà posées.`,
  (num, den) => `Sur ${den} randonneurs partis vers le Piton des Neiges, ${num} ont dormi au gîte.`,
];

// Des objets qu'on range en rectangle — une seule rangée compte aussi.
const OBJETS_RECTANGLE = [
  "chaises", "salades", "carreaux", "photos", "bouteilles", "macarons",
  "pots de fleurs", "panneaux solaires", "casiers", "tables", "cartes", "icônes",
] as const;

// Des personnes qu'on répartit en groupes de même effectif (mots masculins
// pluriels ou épicènes : « répartis » s'accorde toujours).
const PERSONNES = [
  "élèves", "coureurs", "choristes", "randonneurs", "joueurs", "bénévoles",
  "cyclistes", "musiciens",
] as const;

/* ---------------------------------------------------------------------------
   LES VRAI / FAUX DU DÉFI
--------------------------------------------------------------------------- */
const AFFIRMATIONS: readonly { phrase: string; vrai: boolean; pourquoi: string }[] = [
  { phrase: "Tous les nombres premiers sont impairs.", vrai: false, pourquoi: "2 est premier et pair — c'est le seul, mais il suffit." },
  { phrase: "Tous les nombres impairs sont premiers.", vrai: false, pourquoi: "9 est impair et vaut 3 × 3." },
  { phrase: "Le seul nombre premier pair est 2.", vrai: true, pourquoi: "tout autre nombre pair est divisible par 2, donc a au moins trois diviseurs." },
  { phrase: "Il existe un plus grand nombre premier.", vrai: false, pourquoi: "Euclide a démontré qu'il y en a une infinité, il y a plus de deux mille ans." },
  { phrase: "Un nombre premier n'a aucun diviseur.", vrai: false, pourquoi: "il en a deux : 1 et lui-même." },
  { phrase: "Deux nombres premiers différents n'ont aucun diviseur commun autre que 1.", vrai: true, pourquoi: "chacun n'a que 1 et lui-même comme diviseurs, et ils sont différents." },
  { phrase: "1 est le plus petit nombre premier.", vrai: false, pourquoi: "1 n'a qu'un seul diviseur ; le plus petit nombre premier est 2." },
  { phrase: "Le produit de deux nombres premiers n'est jamais premier.", vrai: true, pourquoi: "p × q est divisible par 1, par p, par q et par lui-même : au moins trois diviseurs." },
  { phrase: "La somme de deux nombres premiers est toujours paire.", vrai: false, pourquoi: "2 + 3 = 5, qui est impair." },
  { phrase: "Un nombre qui se termine par 7 est toujours premier.", vrai: false, pourquoi: "27 se termine par 7 et vaut 3 × 3 × 3." },
  { phrase: "Un nombre premier plus grand que 5 se termine par 1, 3, 7 ou 9.", vrai: true, pourquoi: "s'il se terminait par 0, 2, 4, 6 ou 8, il serait divisible par 2 ; par 5, il serait divisible par 5." },
  { phrase: "Tout nombre entier supérieur ou égal à 2 peut s'écrire comme un produit de nombres premiers.", vrai: true, pourquoi: "c'est la décomposition en facteurs premiers : on divise par le plus petit premier possible jusqu'à tomber sur 1." },
  { phrase: "Un nombre a une seule décomposition en facteurs premiers, à l'ordre des facteurs près.", vrai: true, pourquoi: "par exemple 12 = 2 × 2 × 3, et on ne peut pas l'écrire avec d'autres facteurs premiers." },
  { phrase: "Un nombre divisible par 6 ne peut pas être premier.", vrai: true, pourquoi: "il a au moins les diviseurs 1, 2, 3, 6 — et 6 lui-même n'est pas premier." },
  { phrase: "Le carré d'un nombre premier est encore premier.", vrai: false, pourquoi: "2 × 2 = 4, qui est divisible par 2." },
  { phrase: "Tout nombre premier plus grand que 2 est impair.", vrai: true, pourquoi: "un nombre pair plus grand que 2 a au moins trois diviseurs : 1, 2 et lui-même." },
  { phrase: "51 est un nombre premier.", vrai: false, pourquoi: "5 + 1 = 6, donc 51 est divisible par 3 : 51 = 3 × 17." },
  { phrase: "91 est un nombre premier.", vrai: false, pourquoi: "91 = 7 × 13." },
  { phrase: "Entre 20 et 30, il y a exactement deux nombres premiers.", vrai: true, pourquoi: "ce sont 23 et 29." },
  { phrase: "Les seuls entiers qui se suivent et sont tous deux premiers sont 2 et 3.", vrai: true, pourquoi: "de deux entiers qui se suivent, l'un est pair ; il ne peut être premier que s'il vaut 2." },
  { phrase: "Un nombre premier peut être divisible par 3.", vrai: true, pourquoi: "3 lui-même est premier et divisible par 3." },
  { phrase: "Si un nombre est premier, le nombre qui vaut 2 de plus l'est aussi.", vrai: false, pourquoi: "7 est premier, mais 7 + 2 = 9 = 3 × 3." },
  { phrase: "Pour savoir si 97 est premier, il suffit de tester 2, 3, 5 et 7.", vrai: true, pourquoi: "11 × 11 = 121 dépasse déjà 97." },
  { phrase: "Un nombre qui a exactement trois diviseurs est premier.", vrai: false, pourquoi: "un nombre premier en a exactement deux ; 4 en a trois (1, 2, 4) et n'est pas premier." },
];

export const nombresPremiersBank: TutorBankItemV4[] = [
  /* =========================================================================
     PREMIER_DEFINITION — la définition, et la liste jusqu'à 30
  ========================================================================= */
  {
    kind: "template",
    id: "4e_premier_definition_tpl_1_est_premier",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Un nombre premier a EXACTEMENT deux diviseurs : 1 et lui-même.",
    tags: ["premier", "definition", "qcm", "template"],
    generate: () => {
      const n = randomInt(11, 60);
      const premier = estPremier(n);
      const correct = premier ? "oui, il est premier" : "non, il n'est pas premier";
      // Le plus petit diviseur autre que 1, pour l'explication.
      const d = plusPetitDiviseur(n);
      const enSituation = Math.random() < 0.7;
      const question = randomChoice(QUESTIONS_EST_PREMIER)(n);
      const text = enSituation
        ? `${randomChoice(RANGEMENTS)(n)} ${randomChoice(LIENS_RANGEMENT)(n)}${question}`
        : `${randomChoice(["", "Sans calculatrice. ", "Question flash. ", "Rappel : un nombre premier a exactement deux diviseurs. "] as const)}${question}`;
      return {
        text,
        format: "qcm",
        choices: shuffle(["oui, il est premier", "non, il n'est pas premier"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre premier est un entier qui a EXACTEMENT deux diviseurs — 1 et lui-même.\n\n" +
          "Méthode : on cherche un diviseur autre que 1 et le nombre. Un seul suffit à conclure que le nombre n'est pas premier.\n\n" +
          (premier
            ? `Calcul : ${n} n'est divisible ni par 2, ni par 3, ni par 5, ni par 7 — et $11^2 = 121$ dépasse ${n}, donc inutile d'aller plus loin.\n\n`
            : `Calcul : $${n} \\div ${d} = ${n / d}$, sans reste. Il a donc au moins trois diviseurs : 1, ${d} et ${n}.\n\n`) +
          (enSituation
            ? premier
              ? `Dans la situation : c'est impossible, car ${n} ne s'écrit comme produit de deux entiers que sous la forme 1 × ${n}.\n\n`
              : `Dans la situation : c'est possible, par exemple ${d} × ${n / d} = ${n}.\n\n`
            : "") +
          `Conclusion : ${n} ${premier ? "EST" : "n'est PAS"} premier. ⭐ Il suffit de tester les nombres premiers dont le carré ne dépasse pas ${n}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_premier_definition_tpl_2_liste_30",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "La liste jusqu'à 30 est à connaître par cœur : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.",
    tags: ["premier", "definition", "liste", "qcm", "template"],
    generate: () => {
      // Deux sens : trouver l'intrus NON premier parmi trois premiers, ou le
      // SEUL premier parmi trois nombres qui ne le sont pas.
      const chercheNonPremier = Math.random() < 0.6;
      const NON_PREMIERS = [1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28] as const;
      let cible: number;
      let autres: number[];
      if (chercheNonPremier) {
        cible = randomChoice([9, 15, 21, 25, 27, 1, 33] as const);
        autres = shuffle([...PREMIERS_30]).slice(0, 3);
      } else {
        cible = randomChoice(PREMIERS_30);
        autres = shuffle([...NON_PREMIERS]).slice(0, 3);
      }
      const liste = shuffle([cible, ...autres]);
      const L = liste.join(", ");
      const prenom = randomChoice(PRENOMS);
      const correct = String(cible);
      const text = chercheNonPremier
        ? randomChoice([
            () => `${randomChoice(SUPPORTS_LISTE)(L)} ${randomChoice(["Lequel de ces nombres n'est PAS premier ?", "Un seul n'est pas premier : lequel ?", "Trouve l'intrus : le nombre qui n'est pas premier.", "Lequel de ces quatre nombres n'est pas un nombre premier ?"] as const)}`,
            () => `${randomChoice(SUPPORTS_LISTE)(L)} ${randomChoice(["Lequel de ces nombres n'est PAS premier ?", "Un seul n'est pas premier : lequel ?", "Trouve l'intrus : le nombre qui n'est pas premier.", "Lequel de ces quatre nombres n'est pas un nombre premier ?"] as const)}`,
            () => `Dans la liste ${L}, lequel n'est PAS un nombre premier ?`,
            () => `Un seul de ces nombres n'est pas premier : ${L}. Lequel ?`,
            () => `${prenom} affirme que ${L} sont tous des nombres premiers. Quel nombre contredit cette affirmation ?`,
          ])()
        : randomChoice([
            () => `${randomChoice(SUPPORTS_LISTE)(L)} ${randomChoice(["Lequel de ces nombres EST premier ?", "Un seul est premier : lequel ?", "Trouve le seul nombre premier.", "Lequel de ces quatre nombres est un nombre premier ?"] as const)}`,
            () => `${randomChoice(SUPPORTS_LISTE)(L)} ${randomChoice(["Lequel de ces nombres EST premier ?", "Un seul est premier : lequel ?", "Trouve le seul nombre premier.", "Lequel de ces quatre nombres est un nombre premier ?"] as const)}`,
            () => `Dans la liste ${L}, lequel est un nombre premier ?`,
            () => `Parmi ${L}, un seul est premier. Lequel ?`,
            () => `${prenom} dit qu'aucun des nombres ${L} n'est premier. Quel nombre contredit cette affirmation ?`,
          ])();
      const justifier = (x: number) =>
        x === 1 ? "1 n'a qu'UN seul diviseur" : `${x} = ${decomposer(x).join(" × ")}`;
      return {
        text,
        format: "qcm",
        choices: liste.map(String),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les nombres premiers jusqu'à 30 sont 2, 3, 5, 7, 11, 13, 17, 19, 23 et 29 — dix nombres, à connaître par cœur.\n\n" +
          (chercheNonPremier
            ? "Méthode : on cherche celui qui a un diviseur autre que 1 et lui-même.\n\n" +
              (cible === 1
                ? "Calcul : 1 n'a qu'UN seul diviseur, lui-même. Or la définition en demande exactement deux.\n\n"
                : `Calcul : ${cible} = ${decomposer(cible).join(" × ")}, il a donc plus de deux diviseurs.\n\n`) +
              `Conclusion : l'intrus est ${cible}. ⚠️ Les multiples de 3 impairs — 9, 15, 21, 27, 33 — sont les faux amis les plus fréquents : ils n'ont pas l'air composés parce qu'ils sont impairs.`
            : "Méthode : on écarte chaque nombre qui a un diviseur autre que 1 et lui-même ; il en reste un seul.\n\n" +
              `Calcul : ${autres.map(justifier).join(" ; ")}. En revanche, ${cible} n'est divisible que par 1 et par lui-même.\n\n` +
              `Conclusion : le nombre premier est ${cible}. ⚠️ 1 n'est pas premier, et un nombre impair n'est pas forcément premier.`),
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : 1 n'est pas premier, et ce n'est PAS une
    // convention arbitraire. Il n'a qu'un seul diviseur.
    kind: "fixed",
    id: "4e_premier_definition_fixed_un",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_definition",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre 1 est-il premier ?",
    format: "qcm",
    choices: [
      "non : il n'a qu'un seul diviseur, alors qu'il en faut deux",
      "oui : il n'est divisible que par 1 et par lui-même",
      "oui : c'est le premier de la liste",
      "non : les nombres premiers commencent à 3",
    ],
    expected: ["non : il n'a qu'un seul diviseur, alors qu'il en faut deux"],
    comparator: "mcq_exact",
    hint: "Compte VRAIMENT ses diviseurs. Combien en trouves-tu ?",
    explanation:
      "Définition : un nombre premier a EXACTEMENT deux diviseurs distincts.\n\n" +
      "Méthode : on compte les diviseurs de 1.\n\n" +
      "Calcul : les diviseurs de 1 sont… 1, et c'est tout. « 1 et lui-même » désignent ici le MÊME nombre : cela n'en fait qu'un.\n\n" +
      "Conclusion : ⭐ 1 n'est donc pas premier, et ce n'est pas une convention arbitraire. Si on l'acceptait, la décomposition en facteurs premiers cesserait d'être unique : on pourrait écrire $12 = 2 \\times 2 \\times 3$, mais aussi $1 \\times 2 \\times 2 \\times 3$, et ainsi de suite sans fin. ⚠️ Le plus petit nombre premier est 2 — et c'est aussi le seul qui soit pair.",
    tags: ["premier", "definition", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PREMIER_DETERMINER — le crible, et surtout son point d'arrêt
  ========================================================================= */
  {
    kind: "template",
    id: "4e_premier_determiner_tpl_1_tester",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_determiner",
    difficulty: 4,
    theme: "neutral",
    hint: "On teste 2, 3, 5, 7 — et on s'arrête dès que le carré du diviseur dépasse le nombre.",
    tags: ["premier", "determiner", "qcm", "template", "canvas"],
    generate: () => {
      const n = randomInt(53, 99);
      const premier = estPremier(n);
      const d = plusPetitDiviseur(n);
      const correct = premier
        ? "premier : aucun de 2, 3, 5, 7 ne le divise"
        : `pas premier : il est divisible par ${d}`;
      // ⚠️ Un leurre ne doit jamais être VRAI : « divisible par 3 » est juste
      // pour 54 aussi, même si la bonne réponse retenue est « par 2 ».
      const leurres = [
        "premier : aucun de 2, 3, 5, 7 ne le divise",
        ...[2, 3, 5, 7, 11]
          .filter((k) => n % k !== 0)
          .map((k) => `pas premier : il est divisible par ${k}`),
        "on ne peut pas savoir sans tout tester jusqu'à 99",
        ...(premier ? [] : ["premier : il n'est divisible que par 1 et par lui-même"]),
      ];
      const enSituation = Math.random() < 0.6;
      const question = randomChoice(QUESTIONS_JUSTIFIER)(n);
      const text = enSituation
        ? `${randomChoice(RANGEMENTS)(n)} ${randomChoice(LIENS_RANGEMENT)(n)}${question}`
        : question;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, leurres),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour savoir si un nombre est premier, il suffit de le tester par les nombres PREMIERS dont le carré ne le dépasse pas.\n\n" +
          "Méthode : jusqu'à 100, cela ne fait que quatre tests — 2, 3, 5 et 7. Car $11^2 = 121$, déjà au-delà de 100.\n\n" +
          (premier
            ? `Calcul : ${n} n'est divisible ni par 2 (il est impair), ni par 3 (somme des chiffres : ${String(n).split("").reduce((s, c) => s + Number(c), 0)}), ni par 5, ni par 7.\n\n`
            : `Calcul : $${n} \\div ${d} = ${n / d}$, sans reste.\n\n`) +
          (enSituation
            ? premier
              ? `Dans la situation : c'est impossible, ${n} ne s'écrit que 1 × ${n}.\n\n`
              : `Dans la situation : c'est possible, par exemple ${d} × ${n / d} = ${n}.\n\n`
            : "") +
          `Conclusion : ${correct}. ⭐ Quatre tests suffisent jusqu'à 100 — c'est tout l'intérêt de la méthode, et un élève qui teste jusqu'à 99 n'a pas compris le crible.`,
        canvas: {
          kind: "tableau_donnees",
          headers: ["on teste", "car"],
          rows: [
            { values: ["2", "2² = 4 ⩽ 100"] },
            { values: ["3", "3² = 9 ⩽ 100"] },
            { values: ["5", "5² = 25 ⩽ 100"] },
            { values: ["7", "7² = 49 ⩽ 100"] },
            { values: ["11 : inutile", "11² = 121 > 100"] },
          ],
          highlight: { row: 4 },
          caption: "quatre tests, et on s'arrête",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : le point d'arrêt du crible. C'est le vrai contenu
    // de la compétence « déterminer les premiers ⩽ 100 ».
    kind: "fixed",
    id: "4e_premier_determiner_fixed_arret",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_determiner",
    difficulty: 5,
    theme: "neutral",
    text: "Pour savoir si un nombre inférieur à 100 est premier, jusqu'où faut-il tester les diviseurs ?",
    format: "qcm",
    choices: [
      "jusqu'à 7, car 11² dépasse déjà 100",
      "jusqu'à 50, la moitié du nombre",
      "jusqu'à 99, il faut tout tester",
      "jusqu'à 10, car 10 × 10 = 100",
    ],
    expected: ["jusqu'à 7, car 11² dépasse déjà 100"],
    comparator: "mcq_exact",
    hint: "Si un nombre a un diviseur, il en a un second. Lequel des deux est le plus petit ?",
    explanation:
      "Définition : les diviseurs vont par PAIRES — si d divise n, alors n ÷ d le divise aussi.\n\n" +
      "Méthode : dans chaque paire, l'un des deux est plus petit que la racine carrée de n. Il suffit donc de tester jusque-là.\n\n" +
      "Calcul : pour un nombre inférieur à 100, on teste les nombres premiers dont le carré ne dépasse pas 100 : 2, 3, 5 et 7. Le suivant, 11, a pour carré 121 — au-delà.\n\n" +
      "Conclusion : ⭐ quatre tests suffisent, et c'est ce qui rend la méthode praticable. ⚠️ « Jusqu'à 10 » n'est pas faux mais fait tester 4, 6, 8, 9 et 10 pour rien : leurs diviseurs premiers ont déjà été essayés.",
    tags: ["premier", "determiner", "valeur_particuliere", "crible", "qcm"],
  },
  {
    kind: "template",
    id: "4e_premier_determiner_tpl_2_combien",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_determiner",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte-les dans la liste, dizaine par dizaine.",
    tags: ["premier", "determiner", "compter", "template"],
    generate: () => {
      // Bornes multiples de 10 : jamais premières, donc « entre » et « de… à »
      // donnent le même compte. Une ou deux dizaines.
      const k = randomInt(1, 9);
      const bas = k * 10;
      const haut = k <= 8 && Math.random() < 0.4 ? bas + 20 : bas + 10;
      const dedans = PREMIERS.filter((p) => p >= bas && p <= haut);
      const enSituation = Math.random() < 0.65;
      const text = enSituation
        ? `${randomChoice(SUPPORTS_PLAGE)(bas, haut)} ${randomChoice(["Combien de ces numéros sont des nombres premiers ?", "Parmi ces numéros, combien sont premiers ?", "Combien de numéros premiers compte cette série ?", "Combien de ces nombres sont premiers ?"] as const)}`
        : randomChoice([
            `Combien y a-t-il de nombres premiers entre ${bas} et ${haut} ?`,
            `Compte les nombres premiers compris entre ${bas} et ${haut}.`,
            `Entre ${bas} et ${haut}, combien de nombres sont premiers ?`,
            `De ${bas} à ${haut}, combien trouve-t-on de nombres premiers ?`,
          ] as const);
      return {
        text,
        format: "short",
        expected: [String(dedans.length)],
        comparator: "number_equal",
        explanation:
          "Définition : un nombre premier n'a que deux diviseurs, 1 et lui-même.\n\n" +
          "Méthode : dans chaque dizaine, on écarte d'emblée les nombres pairs et ceux qui finissent par 5 — il ne reste que quatre candidats à tester, par 3 et par 7.\n\n" +
          `Calcul : de ${bas} à ${haut}, les premiers sont ${dedans.length ? dedans.join(", ") : "… aucun"}.\n\n` +
          `Conclusion : il y en a ${dedans.length}. ⭐ Les nombres premiers se raréfient quand on monte : il y en a quatre entre 1 et 10, et un seul entre 90 et 100.`,
      };
    },
  },

  /* =========================================================================
     PREMIER_DECOMPOSER
  ========================================================================= */
  {
    kind: "template",
    id: "4e_premier_decomposer_tpl_1_produit",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_decomposer",
    difficulty: 4,
    theme: "neutral",
    hint: "On divise par le plus petit premier possible, encore et encore, jusqu'à tomber sur 1.",
    tags: ["premier", "decomposer", "qcm", "template", "canvas"],
    generate: () => {
      const n = randomChoice([
        36, 48, 54, 60, 72, 84, 90, 96, 100, 108, 120, 126, 132, 140, 150, 168,
        180, 198, 200, 210, 225, 250,
      ] as const);
      const f = decomposer(n);
      const correct = f.join(" × ");
      // Des décompositions plausibles mais fausses : un facteur non premier,
      // un facteur oublié, un produit qui ne redonne pas n.
      const avecCompose = [...f.slice(0, -2), f.slice(-2).reduce((a, b) => a * b, 1)].join(" × ");
      const enSituation = Math.random() < 0.6;
      const text = enSituation
        ? `${randomChoice(RANGEMENTS)(n)} ${randomChoice([
            `Pour trouver tous les rangements possibles, on décompose ${n} en facteurs premiers.`,
            `Avant de chercher, on écrit ${n} comme un produit de nombres premiers.`,
          ])} ${randomChoice(["Quelle est cette décomposition ?", "Laquelle de ces écritures est la bonne ?", "Choisis la bonne décomposition.", "Quelle écriture faut-il retenir ?"] as const)}`
        : randomChoice([
            `Décompose ${n} en produit de facteurs premiers.`,
            `Quelle est la décomposition de ${n} en facteurs premiers ?`,
            `Écris ${n} comme un produit de nombres premiers.`,
            `Laquelle de ces écritures est la décomposition de ${n} en facteurs premiers ?`,
            `Parmi ces produits, lequel décompose correctement ${n} en facteurs premiers ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          avecCompose,
          f.slice(1).join(" × "),
          [...f, 1].join(" × "),
          f.slice(0, -1).concat([f[f.length - 1] + 1]).join(" × "),
          `${n} × 1`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : décomposer un nombre, c'est l'écrire comme un produit de nombres PREMIERS — et cette écriture est unique.\n\n" +
          "Méthode : on divise par le plus petit premier possible, on recommence sur le quotient, jusqu'à obtenir 1.\n\n" +
          `Calcul : ${n} = ${correct}.\n\n` +
          (enSituation
            ? `Dans la situation : chaque diviseur de ${n} fabriqué avec ces facteurs donne un rangement, par exemple ${f[0]} × ${n / f[0]}.\n\n`
            : "") +
          `Conclusion : ⚠️ deux contrôles avant de conclure — chaque facteur doit être PREMIER, et leur produit doit redonner ${n}. Écrire 1 dans la décomposition ne sert à rien : $1 \\times$ n'importe quoi ne change rien.`,
        canvas: {
          kind: "tableau_donnees",
          headers: ["on divise", "par", "il reste"],
          rows: f.map((p, i) => ({
            values: [
              String(f.slice(i).reduce((a, b) => a * b, 1)),
              String(p),
              String(f.slice(i + 1).reduce((a, b) => a * b, 1)),
            ],
          })),
          highlight: { row: f.length - 1 },
          caption: "jusqu'à tomber sur 1",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_premier_decomposer_tpl_2_simplifier",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_decomposer",
    difficulty: 5,
    theme: "neutral",
    hint: "Décompose le haut et le bas, puis barre ce qui est commun.",
    tags: ["premier", "decomposer", "fraction", "template"],
    generate: () => {
      const k: number = randomChoice([6, 8, 9, 12, 14, 15, 18] as const);
      // a < b : une vraie part (« num sur den »), jamais une fraction égale à 1.
      let a: number;
      let b: number;
      do {
        a = randomChoice([2, 3, 4, 5, 7] as const);
        b = randomChoice([3, 5, 7, 9, 11] as const);
      } while (a >= b);
      const num = k * a;
      const den = k * b;
      // La fraction n'est irréductible que si a et b n'ont plus rien en commun.
      const pgcdAB = (() => {
        let x = a;
        let y = b;
        while (y) {
          const t = y;
          y = x % y;
          x = t;
        }
        return x;
      })();
      const na = a / pgcdAB;
      const nb = b / pgcdAB;
      const cible = Math.random() < 0.6 ? "numérateur" : "dénominateur";
      const reponse = cible === "numérateur" ? na : nb;
      const enSituation = Math.random() < 0.65;
      // ⛔ Pas de barre « 70/154 » (Frédéric, 06/10) : la fraction s'écrit en vraie
      // fraction, $\frac{70}{154}$, comme dans fractions.bank.ts.
      const F = `$\\frac{${num}}{${den}}$`;
      const text = enSituation
        ? `${randomChoice(PROPORTIONS)(num, den)} ${randomChoice([
            `Écris la fraction ${F} sous forme irréductible. Quel est son ${cible} ?`,
            `Cette part vaut ${F}. Simplifie-la au maximum et donne son ${cible}.`,
            `Quelle est la fraction irréductible égale à ${F} ? Donne son ${cible}.`,
          ])}`
        : randomChoice([
            `Rends la fraction ${F} irréductible. Donne le ${cible} de la fraction simplifiée.`,
            `Simplifie ${F} jusqu'à obtenir une fraction irréductible. Quel est son ${cible} ?`,
            `En décomposant ${num} et ${den} en facteurs premiers, rends ${F} irréductible. Quel ${cible} obtiens-tu ?`,
          ]);
      return {
        text,
        format: "short",
        expected: [String(reponse)],
        comparator: "number_equal",
        explanation:
          "Définition : une fraction est irréductible quand son numérateur et son dénominateur n'ont plus aucun diviseur commun autre que 1.\n\n" +
          "Méthode : on décompose le haut et le bas en facteurs premiers, puis on barre tous les facteurs communs.\n\n" +
          `Calcul : ${num} = ${decomposer(num).join(" × ")} et ${den} = ${decomposer(den).join(" × ")}. En barrant les facteurs communs, il reste $\\frac{${na}}{${nb}}$.\n\n` +
          `Conclusion : le ${cible} vaut ${reponse}. ⭐ C'est ici que la décomposition SERT : elle montre d'un coup tout ce qui peut se barrer, au lieu de simplifier par petits pas au hasard.`,
      };
    },
  },

  /* =========================================================================
     PREMIER_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_premier_defi_tpl_1_diviseurs_par_decomposition",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque facteur premier peut apparaître de 0 fois à son exposant.",
    tags: ["premier", "defi", "diviseurs", "template"],
    generate: () => {
      const n = randomChoice([
        12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 50, 60, 63, 72, 75, 80, 90,
        98, 100,
      ] as const);
      const f = decomposer(n);
      const F = f.join(" × ");
      // Le nombre de diviseurs se lit sur les exposants : (e1+1)(e2+1)…
      const exposants = new Map<number, number>();
      for (const p of f) exposants.set(p, (exposants.get(p) ?? 0) + 1);
      const nb = [...exposants.values()].reduce((a, e) => a * (e + 1), 1);
      const detail = [...exposants.entries()]
        .map(([p, e]) => `${p} apparaît ${e} fois, donc ${e} + 1 = ${e + 1} choix`)
        .join(" ; ");
      const situation = randomInt(0, 2);
      const text =
        situation === 0
          ? `On veut ranger ${n} ${randomChoice(OBJETS_RECTANGLE)} en rectangle (une seule rangée, ou des rangées d'un seul objet, comptent aussi). Sachant que ${n} = ${F}, ${randomChoice(["combien de nombres de rangées différents sont possibles ?", "combien de rectangles différents peut-on former, en comptant le nombre de rangées ?"])}`
          : situation === 1
            ? `${n} ${randomChoice(PERSONNES)} doivent être répartis en groupes de même effectif (un seul groupe, ou des groupes d'une personne, comptent aussi). Sachant que ${n} = ${F}, ${randomChoice(["combien d'effectifs de groupe sont possibles ?", "combien de tailles de groupe différentes peut-on choisir ?"])}`
            : randomChoice([
                `Le nombre ${n} se décompose en ${F}. Combien a-t-il de diviseurs en tout ?`,
                `On sait que ${n} = ${F}. Sans les lister, combien ${n} a-t-il de diviseurs ?`,
                `Sachant que ${n} = ${F}, compte ses diviseurs (1 et ${n} compris).`,
                `Combien de diviseurs possède ${n}, dont la décomposition est ${F} ?`,
                `${randomChoice(PRENOMS)} a trouvé que ${n} = ${F}. Combien ce nombre a-t-il de diviseurs ?`,
              ]);
      return {
        text,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation:
          "Définition : tout diviseur de n s'obtient en choisissant, pour chaque facteur premier, combien de fois on le prend — de 0 fois à son exposant.\n\n" +
          "Méthode : on compte les choix pour chaque facteur, puis on les multiplie.\n\n" +
          `Calcul : ${detail}. En tout : ${[...exposants.values()].map((e) => e + 1).join(" × ")} = ${nb}.\n\n` +
          (situation < 2
            ? `Dans la situation : chaque diviseur de ${n} donne exactement une possibilité, de 1 à ${n}.\n\n`
            : "") +
          `Conclusion : ${n} a ${nb} diviseurs. ⭐ On les a comptés SANS EN LISTER AUCUN — c'est exactement ce que la décomposition apporte, et c'est pourquoi elle mérite un chapitre.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_premier_defi_tpl_2_vrai_faux",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une affirmation générale se réfute par un seul contre-exemple.",
    tags: ["premier", "defi", "logique", "qcm", "template"],
    generate: () => {
      const cas = randomChoice(AFFIRMATIONS);
      const correct = cas.vrai ? "vrai" : "faux";
      const prenom = randomChoice(PRENOMS);
      const text = randomChoice([
        `« ${cas.phrase} » Vrai ou faux ?`,
        `Vrai ou faux : « ${cas.phrase} »`,
        `${prenom} affirme : « ${cas.phrase} » Cette affirmation est-elle vraie ou fausse ?`,
        `On lit dans un cahier : « ${cas.phrase} » Est-ce vrai ou faux ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(["vrai", "faux"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une affirmation générale est fausse dès qu'UN cas la contredit.\n\n" +
          "Méthode : on cherche d'abord un contre-exemple parmi les petits nombres premiers — 2 en fournit beaucoup, puisqu'il est le seul pair.\n\n" +
          `Calcul : ${cas.pourquoi}\n\n` +
          `Conclusion : c'est ${correct}. ⭐ 2 est le contre-exemple de presque toutes les fausses idées sur les nombres premiers : pensez-y d'abord.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_premier_defi_tpl_3_reconstituer",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Multiplie les facteurs entre eux.",
    tags: ["premier", "defi", "decomposer", "template"],
    generate: () => {
      // De deux à cinq facteurs, produit entre 30 et 1 000 : un calcul mental
      // de 4e, et un nombre plausible pour des pages ou des spectateurs.
      let f: number[];
      let n: number;
      do {
        const c = randomInt(2, 5);
        f = Array.from({ length: c }, () => randomChoice([2, 2, 3, 3, 5, 7, 11] as const));
        n = f.reduce((a, b) => a * b, 1);
      } while (n > 1000 || n < 30);
      f = shuffle(f);
      const F = f.join(" × ");
      const prenom = randomChoice(PRENOMS);
      const text = randomChoice([
        `Un nombre se décompose en ${F}. Quel est ce nombre ?`,
        `Quel nombre a pour décomposition en facteurs premiers ${F} ?`,
        `Calcule le nombre dont la décomposition en facteurs premiers est ${F}.`,
        `${prenom} a décomposé un nombre et a obtenu ${F}. Quel était ce nombre ?`,
        `${prenom} a choisi un nombre mystère qui s'écrit ${F}. Quel est ce nombre ?`,
        `Le code d'un cadenas est le nombre qui se décompose en ${F}. Quel est ce code ?`,
        `Le nombre de perles d'un collier se décompose en ${F}. Combien le collier a-t-il de perles ?`,
        `Le nombre de pages d'un livre se décompose en ${F}. Combien ce livre a-t-il de pages ?`,
        `Le nombre de spectateurs d'un concert de quartier se décompose en ${F}. Combien étaient-ils ?`,
        `Le nombre de graines d'un sachet se décompose en ${F}. Combien le sachet contient-il de graines ?`,
        `Dans un jeu d'énigmes, la réponse est le nombre qui s'écrit ${F}. Quelle est cette réponse ?`,
        `Le nombre de marches d'un sentier de montagne se décompose en ${F}. Combien y a-t-il de marches ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : la décomposition en facteurs premiers d'un nombre est un produit qui redonne ce nombre.\n\n" +
          "Méthode : on multiplie les facteurs, deux par deux, dans l'ordre qu'on veut.\n\n" +
          `Calcul : ${F} = ${n}.\n\n` +
          `Conclusion : le nombre est ${n}. ⭐ Refaire le produit est le CONTRÔLE de toute décomposition : si on ne retombe pas sur le nombre de départ, un facteur a été perdu ou ajouté.`,
      };
    },
  },
];
