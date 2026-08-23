// /formation-crpe — PRÉPARATION AUX MATHS DU CRPE, EN SALLE, À SAINT-PIERRE.
//
// ⚠️ L'URL EST EN MINUSCULES. Les routes Next sont sensibles à la casse :
// /formation-CRPE renverrait un 404. Si le sigle en capitales est indispensable
// à l'oral, il reste dans le titre de la page — pas dans l'adresse.
//
// ⛔ ET ELLE RESTE COURTE. La question s'est posée le 22/08 :
// `/formation-crpe-ile-de-la-reunion` mettrait le lieu dans l'adresse. Non, pour
// deux raisons. La première : les mots de l'URL pèsent très peu aujourd'hui face
// au titre, au H1 et au texte — et le lieu y est déjà partout. La seconde, qui
// tranche vraiment : cette adresse se DIT. Au téléphone, sur un message, sur une
// affiche en salle des profs. « eleveai.fr slash formation crpe » se retient ;
// « slash formation crpe île de la Réunion » ne se dit pas. Le référencement
// local se gagne dans le titre, pas dans le chemin.
//
// ⭐ OUVERTE LE 22/08/2026. Frédéric : « je suis déclaré URSSAF ». Le `noindex`
// et l'absence du sitemap tenaient au statut, et le statut est réglé — micro-
// entrepreneur depuis le 19/08. La page s'indexe, elle est au sitemap, et elle
// sort en encart chez l'adulte (`lib/matrice/ressources.ts`, PORTES_ADULTE).
//
// ⚠️ CE QUI N'EST PAS ENCORE RÉGLÉ, ET QUI SE VOIT DANS LE TEXTE : l'agrément
// formation. Vendre une « action de formation » ouvre un régime à part —
// déclaration d'activité (NDA) auprès de la DREETS, règlement intérieur,
// convention, feuilles d'émargement. Sans NDA : ni CPF ni financeur public.
// C'est pourquoi la page dit noir sur blanc « aucun financement CPF n'est
// possible aujourd'hui : vous payez directement ». Elle est donc juste EN
// L'ÉTAT, et le jour où le numéro d'agrément arrive, c'est cette ligne-là qu'on
// remplace — pas le `robots`, qui n'a plus lieu d'être.
//
// ⚠️ L'ACCORD DE L'HÔTEL RESTE À OBTENIR. La page est désormais publique et le
// nomme : `LIEU.nom = null` la fait retomber sur « Terre-Sainte, à Saint-Pierre »
// en une ligne, si jamais il fallait retirer le nom vite.
//
// ⭐ LE PARI DE LA PAGE : ne vendre que ce qui est rare. Le site est gratuit et
// se copie à coût nul ; un samedi matin en salle, non. C'est pourquoi la
// coupure d'été austral n'est pas cachée — elle est assumée, et c'est le site
// qui la couvre. Le payant, c'est la présence ; le gratuit, c'est le reste.
//
// ─────────────────────────────────────────────────────────────────────────────
// ⭐⭐ 23/08/2026 — LA PAGE PASSE EN THÈME CLAIR. C'EST LE CHANGEMENT DU JOUR.
//
// Frédéric a mis côte à côte cette page et celle d'un concurrent (ForProf) :
// « je sais qu'on n'est pas ForProf, mais la page est plus joyeuse ». Elle
// l'était, et sur un point qui n'a rien à voir avec les arguments : fond crème,
// cartes blanches, rose/cyan/orange, des visages. La nôtre était en bleu nuit —
// sérieuse, et froide.
//
// ⭐ CE N'EST PAS UN GOÛT NOUVEAU, C'EST LE MÊME RETOUR QU'EN JUIN. Les fiches
// de cours sont passées du noir au clair le 17/06 pour cette raison exacte —
// « le noir est triste ». Une page qui invite quelqu'un à venir un samedi matin
// ne peut pas être plus sombre que la fiche qu'on lui donnera sur place.
//
// ⛔⛔ ET ON NE COPIE PAS CE QUI FAIT LEUR JOIE À EUX. ForProf affiche « +7/10
// admis », « 25 % dans le top 15 », « 30 ans », « 95 % de satisfaction »,
// des témoignages filmés. Nous n'avons AUCUN de ces chiffres : la première
// session n'a pas eu lieu. Les inventer serait le seul vrai risque de cette
// page. La joie vient donc du TRAITEMENT — la lumière, la couleur, Ti Margo —
// et jamais d'une preuve qu'on n'a pas. Le jour où une promotion sera passée,
// ses résultats auront leur place ici ; pas avant.
//
// ⚠️ LE LANGAGE VISUEL VIENT DE LA MAISON, PAS DE ForProf : `/parents` et
// `/espace-profs` sont les deux autres pages qui s'adressent à des adultes et
// qui présentent une offre. Même recette — fond clair dégradé, cartes blanches,
// et UN seul bloc `#041B33` gardé en accent. On ne crée pas un troisième style.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.eleveai.fr";

// ─────────────────────────────────────────────────────────────────────────────
// LE LIEU.
//
// ✅ L'HÔTEL A CONFIRMÉ (22/08/2026). Son directeur est un ami de Frédéric et a
// donné son accord — la salle ne se loue pas facilement le samedi matin, l'hôtel
// y gagne autant que nous. C'était le dernier verrou : nommer une maison sur une
// page commerciale ne l'informe pas, ça l'engage, et il fallait donc son accord
// avant que la page devienne publique. Il existe.
//
// ⚠️ `nom: null` reste la sortie de secours : la page retombe alors sur
// « à Terre-Sainte, Saint-Pierre » sans rien casser ailleurs. Une amitié n'est
// pas un bail — si l'arrangement s'arrête, c'est UNE ligne à changer, pas la
// page à réécrire.
//
// ✅ `debut` / `fin` : 8 h – 12 h, CONFIRMÉ AVEC L'HÔTEL le 22/08/2026. La salle
// se loue à la matinée, d'où les 4 h. Le créneau n'était au départ qu'une
// déduction de « 50 € la matinée » ; il ne l'est plus. C'était la dernière
// hypothèse de la page — il n'en reste aucune, hors la date des écrits, qui ne
// dépend de personne ici.
//
// Deux champs et non une chaîne toute faite, parce que l'horaire s'écrit
// « 8 h – 12 h » dans un encart et « de 8 h à 12 h » dans une phrase : une seule
// source, deux rendus. Un candidat qui vient de Saint-Joseph organise son samedi
// sur cette ligne-là — si elle bouge, elle bouge ICI et nulle part ailleurs.
// ─────────────────────────────────────────────────────────────────────────────
const LIEU: {
  nom: string | null;
  quartier: string;
  ville: string;
  debut: string;
  fin: string;
} = {
  nom: "Hôtel Terre-Sainte",
  quartier: "Terre-Sainte",
  ville: "Saint-Pierre",
  debut: "8 h",
  fin: "12 h",
};

const HORAIRES_COURT = `${LIEU.debut} – ${LIEU.fin}`;
const HORAIRES_PHRASE = `de ${LIEU.debut} à ${LIEU.fin}`;

// « Hôtel Terre-Sainte, à Saint-Pierre » tant que l'accord tient ; « Terre-
// Sainte, à Saint-Pierre » sinon. Un seul endroit à changer.
const LIEU_COURT = LIEU.nom
  ? `${LIEU.nom}, ${LIEU.ville}`
  : `${LIEU.quartier}, ${LIEU.ville}`;
// ⚠️ Ne pas réintroduire le quartier ici : « l'Hôtel Terre-Sainte, dans le
// quartier de Terre-Sainte » se lit comme un bégaiement. Le nom le porte déjà.
const LIEU_LONG = LIEU.nom
  ? `l'${LIEU.nom}, à ${LIEU.ville}`
  : `${LIEU.quartier}, à ${LIEU.ville}`;

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️ LA DATE DU CONCOURS — HYPOTHÈSE, PAS UNE INFORMATION.
//
// Le calendrier officiel de la session 2027 sort à l'automne 2026. Tant que
// `confirme` vaut false, la page affiche « attendue » et jamais une date sèche :
// un candidat qui organise ses six mois sur une date fausse ne revient pas.
//
// ⚠️ À VÉRIFIER EN MÊME TEMPS QUE LA DATE : depuis la session 2026 le concours
// est placé en fin de licence. Si c'est confirmé pour 2027, le public n'est plus
// M1/M2 mais L3 — l'INSPÉ les prépare déjà, et l'argument de cette page devient
// « le samedi, en plus, sur les maths seules », pas « à la place de ».
// ─────────────────────────────────────────────────────────────────────────────
const CONCOURS = {
  libelle: "1ᵉʳ avril 2027",
  confirme: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// L'ARGENT — CE BLOC EST LE RAISONNEMENT, PAS LA PAGE.
//
// ⛔ RIEN DE CE CALCUL NE DOIT APPARAÎTRE À L'ÉCRAN. La page vend une offre ;
// un stagiaire n'a pas à lire la marge de celui à qui il paie 60 €. Les seuls
// chiffres publics sont le prix, ce qui est compris dedans, et le seuil.
//
// `horaire` : 15 €/h. Volontairement bas, et ce n'est pas une erreur — le levier
// n'est pas le tarif, c'est le nombre. À 8 stagiaires, l'heure de présence vaut
// 120 €. Monter à 20 €/h ferait perdre plus d'inscrits qu'il ne rapporterait.
//
// Les charges réelles d'une matinée, arrêtées le 22/08/2026 :
//   • salle de séminaire ........ 50 € la matinée (coût fixe)
//   • café ou thé ............... 2 € par personne (coût variable)
// Donc : net d'une séance = 58 € × inscrits − 50 €. Le point mort tombe à UN
// inscrit — la salle ne décide rien, contrairement à ce qu'on croyait d'abord.
//   3 inscrits → 124 €   5 → 240 €   8 → 414 €   15 → 820 €
//
// ⛔ LA VIENNOISERIE EST SORTIE DE L'OFFRE (Frédéric, 22/08 : « je peux payer le
// café ou le thé, mais pas plus »). Ne pas la réintroduire au motif que « ça
// ferait mieux » : ce serait 2 € de plus par personne et par samedi, soit 420 €
// sur le cycle à 15 inscrits, pour une ligne que personne ne vient chercher.
// ⚠️ Et ne pas réécrire « rien à sortir sur place » : c'est devenu faux dès
// qu'il y a une vitrine à côté. Une promesse d'intendance ratée coûte plus cher
// que l'intendance elle-même.
//
// ⚠️ `seuilOuverture` N'EST DONC PAS UN SEUIL FINANCIER, C'EST UN SEUIL
// PÉDAGOGIQUE : à trois, personne ne se corrige mutuellement et la séance perd
// ce qui fait sa valeur. C'est ce motif-là qui est écrit sur la page — l'autre
// serait vrai mais impubliable.
// ─────────────────────────────────────────────────────────────────────────────
const TARIF = {
  horaire: 15,
  heuresParSeance: 4,
  seuilOuverture: 5,
  plafondGroupe: 15,
};

const PRIX_SEANCE = TARIF.horaire * TARIF.heuresParSeance;

// ─────────────────────────────────────────────────────────────────────────────
// LES 14 SAMEDIS.
//
// ⭐ POURQUOI DEUX SÉANCES EN MARS ET PAS HUIT EN AUTOMNE : le découpage
// spontané mettait 8 samedis avant Noël et rien après le 13/03 — soit trois
// semaines de vide juste avant l'écrit, au moment exact où un candidat a besoin
// d'être tenu. Deux séances ont donc été déplacées de l'automne vers le 20 et le
// 27 mars. On révise moins longtemps, on révise plus près.
//
// ⛔⛔ LA PROGRESSION A ÉTÉ RELUE ET VALIDÉE PAR FRÉDÉRIC LE 22/08/2026
// (« les 14 séances sont parfaites »). Elle avait d'abord été écrite par la
// machine, ce qui était l'inverse du bon sens sur le seul contenu que seul un
// prof puisse ordonner — c'est réparé, et ça ne se refait pas. Ne rien
// réordonner, ne rien fusionner, ne rien « enrichir » : l'ordre des thèmes, ce
// qui mérite une matinée entière et ce qui n'en mérite pas, c'est un jugement
// de métier, pas une optimisation. Toute modification passe par lui.
//
// `bloc` : "automne" | "austral" (la coupure, aucune séance) | "finale".
// Les dates sont écrites en dur parce qu'elles sont *décidées*, pas calculées :
// un générateur de samedis produirait aussi ceux qui tombent en vacances.
// ─────────────────────────────────────────────────────────────────────────────
type Seance = {
  date: string;
  bloc: "automne" | "finale";
  titre: string;
  detail: string;
};

const SEANCES: Seance[] = [
  {
    date: "samedi 3 octobre",
    bloc: "automne",
    titre: "Où vous en êtes vraiment",
    detail:
      "Une épreuve d'entrée, corrigée sur place. Pas pour classer : pour savoir quelles séances comptent le plus pour vous, et lesquelles vous pourriez presque sauter.",
  },
  {
    date: "samedi 31 octobre",
    bloc: "automne",
    titre: "Nombres, fractions, décimaux",
    detail:
      "Le socle qui fait perdre des points partout ailleurs. Priorités, écritures fractionnaires, ordres de grandeur — et les erreurs d'élèves qu'on vous demandera d'analyser.",
  },
  {
    date: "samedi 7 novembre",
    bloc: "automne",
    titre: "Proportionnalité, pourcentages, échelles",
    detail:
      "Le thème le plus rentable du concours : il revient chaque année, sous quatre habillages différents. On apprend à reconnaître lequel avant de calculer.",
  },
  {
    date: "samedi 14 novembre",
    bloc: "automne",
    titre: "Arithmétique",
    detail:
      "Divisibilité, nombres premiers, PGCD et PPCM. Peu de technique, beaucoup de raisonnement — c'est là que se joue la différence entre un candidat qui calcule et un candidat qui démontre.",
  },
  {
    date: "samedi 21 novembre",
    bloc: "automne",
    titre: "Grandeurs et mesures",
    detail:
      "Conversions, périmètres, aires, volumes, durées. Le chapitre où l'on perd des points bêtement, et celui qu'on enseignera le plus souvent en classe.",
  },
  {
    date: "samedi 28 novembre",
    bloc: "automne",
    titre: "Géométrie plane",
    detail:
      "Triangles, quadrilatères, Thalès, Pythagore, constructions. On rédige une démonstration entière, ensemble, ligne par ligne.",
  },
  {
    date: "samedi 5 décembre",
    bloc: "automne",
    titre: "Espace, statistiques, probabilités",
    detail:
      "Solides et patrons, puis lecture et interprétation de données. Deux thèmes courts au concours, deux thèmes qu'on travaille rarement — donc rentables.",
  },
  {
    date: "samedi 12 décembre",
    bloc: "automne",
    titre: "Premier problème en conditions réelles",
    detail:
      "Un sujet complet, chronométré, corrigé le jour même. Vous partez en vacances en sachant précisément ce qu'il vous reste à faire.",
  },
  {
    date: "samedi 6 février",
    bloc: "finale",
    titre: "Analyser des productions d'élèves",
    detail:
      "La partie qui rapporte le plus de points et qu'on prépare le moins. Reconnaître une erreur, dire d'où elle vient, proposer une remédiation. C'est du métier, pas des maths.",
  },
  {
    date: "samedi 13 février",
    bloc: "finale",
    titre: "Algèbre et mise en équation",
    detail:
      "Traduire un énoncé en équation, puis savoir revenir à la question posée. L'aller-retour, pas la technique de résolution.",
  },
  {
    date: "samedi 20 février",
    bloc: "finale",
    titre: "Raisonner, démontrer, rédiger",
    detail:
      "Vrai ou faux et justifiez, contre-exemples, raisonnement par disjonction. Le correcteur note ce qui est écrit, pas ce qui était dans votre tête.",
  },
  {
    date: "samedi 27 février",
    bloc: "finale",
    titre: "Vos erreurs, et seulement les vôtres",
    detail:
      "Séance construite à partir de ce que le groupe a raté depuis octobre. Rien de générique : je prépare cette séance avec vos copies.",
  },
  {
    date: "samedi 20 mars",
    bloc: "finale",
    titre: "Épreuve blanche complète",
    detail:
      "Durée réelle, format réel, dans les conditions réelles. Copies ramassées, corrigées par mes soins, rendues annotées.",
  },
  {
    date: "samedi 27 mars",
    bloc: "finale",
    titre: "Correction, et les derniers pièges",
    detail:
      "Cinq jours avant l'écrit. On reprend l'épreuve blanche, on liste ce qui se joue encore, et on arrête d'apprendre pour ne plus faire que consolider.",
  },
];

const NB_SEANCES = SEANCES.length;
const NB_HEURES = NB_SEANCES * TARIF.heuresParSeance;
const PRIX_CYCLE = NB_SEANCES * PRIX_SEANCE;

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

// CE QUE ÇA N'EST PAS. Dit avant qu'on le découvre : un candidat au CRPE a déjà
// reçu trois offres cette semaine, et la seule chose qui le fasse s'arrêter,
// c'est quelqu'un qui annonce ses limites en premier.
const CE_QUE_CE_NEST_PAS = [
  "Une préparation complète au concours. Ici, ce sont les mathématiques, et rien d'autre. Le français, les oraux, le dossier : ce n'est pas moi.",
  "Un remplacement de l'INSPÉ ou du CNED. C'est le samedi, en plus, sur le point précis où beaucoup de candidats lâchent.",
  "Une formation certifiante. Il n'y a pas de diplôme au bout, et aucun financement CPF n'est possible aujourd'hui : vous payez directement, séance par séance.",
  "Un cours magistral. On fait des exercices, vous écrivez, je regarde vos copies. Si vous cherchez un amphithéâtre, ce sera mal payé pour vous.",
];

// ─────────────────────────────────────────────────────────────────────────────
// LES BORNES DU CYCLE, EN ISO — pour le balisage, et pour lui seul.
//
// ⚠️ ELLES DOIVENT SUIVRE `SEANCES` : c'est la date de la PREMIÈRE séance et
// celle de la DERNIÈRE. Elles sont écrites à part plutôt qu'ajoutées à chaque
// séance, précisément pour ne pas toucher au tableau validé — mais du coup rien
// ne les rattrape automatiquement. Si un samedi bouge en tête ou en queue,
// c'est ICI aussi.
//
// (3 octobre 2026 et 27 mars 2027 sont bien deux samedis — vérifié.)
// ─────────────────────────────────────────────────────────────────────────────
const CYCLE = {
  debut: "2026-10-03",
  fin: "2027-03-27",
};

// ─────────────────────────────────────────────────────────────────────────────
// LA FAQ — LES QUESTIONS QU'ON POSE AU TÉLÉPHONE, RÉPONDUES SUR LA PAGE.
//
// ⭐ Aucune de ces réponses n'invente quoi que ce soit : chacune se déduit de
// ce que la page dit déjà plus haut (pas de forfait, aucune avance, maths
// seules, pas de CPF, seuil de 5). C'est le principe — une FAQ qui ajoute des
// faits est une seconde page d'offre, et les deux finissent par se contredire.
//
// ⚠️ UNE SEULE RÉPONSE EST À CONFIRMER PAR FRÉDÉRIC : « Comment se règle la
// séance ». « Payable à la séance » est acté, mais le moyen (espèces, chèque,
// virement) ne l'est pas — la réponse reste donc sur le QUAND, jamais sur le
// COMMENT. Ne pas la préciser tant qu'il ne l'a pas dit.
//
// ⛔ PAS DE QUESTION SUR LE PARKING, L'ACCÈS EN BUS OU LA CLIMATISATION : on ne
// connaît pas la réponse, et une FAQ qui se trompe sur l'intendance coûte plus
// cher que l'absence de FAQ.
// ─────────────────────────────────────────────────────────────────────────────
const FAQ: { q: string; r: string }[] = [
  {
    q: "Je peux commencer en cours d'année ?",
    r: "Oui. Il n'y a pas de forfait annuel : vous payez les samedis où vous êtes là. Quelqu'un qui nous rejoint en février ne paie pas octobre.",
  },
  {
    q: "Je peux venir à une seule séance, juste pour voir ?",
    r: "Oui, et c'est la même raison. Une matinée, 60 €, et vous décidez ensuite. Il n'y a rien à signer et aucun engagement sur la suite.",
  },
  {
    q: "Comment se règle la séance ?",
    r: "Le jour même, sur place. Aucune avance à verser, aucun prélèvement, aucun abonnement : la séance se paie quand elle a eu lieu.",
  },
  {
    q: "Et si je rate un samedi ?",
    r: "Vous ne le payez pas, et il n'y a rien à rattraper auprès de moi : les fiches de cours et le coach du site couvrent le thème de la séance, gratuitement, quand vous voulez.",
  },
  {
    q: "C'est finançable par le CPF ?",
    r: "Non. Il n'y a pas de diplôme au bout et aucun financement CPF n'est possible aujourd'hui : vous payez directement, séance par séance. C'est dit ici plutôt qu'au téléphone.",
  },
  {
    q: "Vous préparez aussi le français, les oraux, le dossier ?",
    r: "Non. Ici ce sont les mathématiques, et rien d'autre. C'est une limite assumée : je préfère faire une épreuve correctement que quatre à moitié.",
  },
  {
    q: "Je suis en L3 — c'est pour moi ?",
    r: "Le concours se passe en fin de licence depuis la session 2026. Que vous soyez en L3, en master ou déjà en poste comme contractuel, la matinée est la même : on travaille l'épreuve de maths, pas votre cursus.",
  },
  {
    q: "Et si le groupe ne se forme pas ?",
    r: `En dessous de ${TARIF.seuilOuverture} inscrits, la session n'ouvre pas — pour une raison pédagogique, pas comptable. Vous êtes prévenu deux semaines avant le 3 octobre, et vous n'avez rien avancé.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LES DONNÉES STRUCTURÉES.
//
// ⭐ POURQUOI ELLES COMPTENT ICI PLUS QU'AILLEURS : c'est la seule page du site
// qui décrive une chose PHYSIQUE, DATÉE et PAYANTE. `Course` + `CourseInstance`
// + `Place` + `Offer`, c'est exactement le vocabulaire que Google attend pour
// rattacher une formation à une ville et à un prix — et « préparation CRPE
// Saint-Pierre » est une requête que trois personnes tapent, pas trois mille.
// Sans balisage, la page est un texte ; avec, c'est une offre localisée.
//
// ⚠️ LE BALISAGE NE DIT QUE CE QUE LA PAGE DIT. Le prix, le lieu, les bornes,
// le plafond de 15 : tout est repris des constantes du dessus, jamais saisi une
// seconde fois. Une donnée structurée qui contredit le texte visible est une
// pénalité, pas un bonus.
//
// ⚠️ `LIEU.nom = null` traverse jusqu'ici : le `Place` retombe sur le quartier,
// comme le reste de la page. C'est bien UNE ligne à changer, pas deux.
// ─────────────────────────────────────────────────────────────────────────────
function donneesStructurees() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Préparation aux mathématiques du CRPE — ${LIEU.ville}, La Réunion`,
    description:
      `${NB_SEANCES} matinées de ${TARIF.heuresParSeance} heures, d'octobre à fin mars, pour préparer ` +
      `l'épreuve écrite de mathématiques du concours de recrutement de professeurs des écoles. ` +
      `En présentiel à ${LIEU_LONG}, par un professeur de mathématiques en exercice.`,
    url: `${SITE_URL}/formation-crpe`,
    inLanguage: "fr-FR",
    teaches:
      "Mathématiques du CRPE : nombres et calcul, proportionnalité, arithmétique, grandeurs et mesures, géométrie, statistiques et probabilités, analyse de productions d'élèves.",
    educationalLevel: "Programme de l'école et du collège (CP à la troisième)",
    provider: {
      "@type": "Organization",
      name: "EleveAI",
      url: SITE_URL,
    },
    // ⚠️ `offers` est répété sur le Course ET sur l'instance : Google lit l'un
    // ou l'autre selon le type de résultat enrichi, et n'en déduit pas le
    // second. C'est le même prix aux deux endroits, tiré de la même constante.
    offers: {
      "@type": "Offer",
      price: PRIX_SEANCE,
      priceCurrency: "EUR",
      category: "Paid",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/formation-crpe#inscription`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      // 56 h au total, 4 h par matinée : les deux sont utiles, la première
      // pour comparer, la seconde pour se projeter sur un samedi.
      courseWorkload: `PT${NB_HEURES}H`,
      startDate: CYCLE.debut,
      endDate: CYCLE.fin,
      maximumAttendeeCapacity: TARIF.plafondGroupe,
      inLanguage: "fr-FR",
      location: {
        "@type": "Place",
        name: LIEU.nom ?? LIEU.quartier,
        address: {
          "@type": "PostalAddress",
          addressLocality: LIEU.ville,
          addressRegion: "La Réunion",
          addressCountry: "RE",
        },
      },
      instructor: {
        "@type": "Person",
        name: "Frédéric Lacoste",
        jobTitle: "Professeur de mathématiques",
      },
      offers: {
        "@type": "Offer",
        price: PRIX_SEANCE,
        priceCurrency: "EUR",
        category: "Paid",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/formation-crpe#inscription`,
      },
    },
  };
}

// La FAQ balisée à part : `FAQPage` est un type à lui seul, il ne s'imbrique
// pas dans `Course`. Même source que le bloc affiché — un seul tableau.
function donneesFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };
}

export const metadata: Metadata = {
  // Le layout ajoute déjà « — EleveAI » : pas de suffixe ici.
  // ⭐ « (La Réunion) » AJOUTÉ : la ville seule ne dit rien à qui cherche depuis
  // ailleurs, et c'est le TITRE qui porte le référencement local — pas l'adresse
  // de la page. Voir la note sur l'URL en tête de fichier.
  title: `Les maths du CRPE, le samedi, à ${LIEU.ville} (La Réunion)`,
  description:
    `${NB_SEANCES} samedis de ${TARIF.heuresParSeance} h pour préparer l'épreuve de mathématiques du CRPE, ` +
    `à ${LIEU_COURT} (La Réunion). ${eur(PRIX_SEANCE)} la matinée, payable à la séance, ` +
    `café compris. Par un professeur de mathématiques en exercice.`,
  // ⚠️ La canonique se déclare ICI et jamais dans le layout — sinon toutes les
  // pages du site hériteraient de celle-ci. Toujours avec le `www`.
  alternates: { canonical: `${SITE_URL}/formation-crpe` },
  // ⭐ PLUS DE `robots` : il portait `index: false` tant que le statut n'était
  // pas réglé. Il l'est (URSSAF, 19/08), la page s'indexe. Ne pas le remettre
  // « par prudence » — une page au sitemap ET en noindex dit deux choses
  // contraires à Google, et c'est le noindex qui gagne.

  // ⭐⭐ AJOUTÉ LE 23/08/2026 — LA PAGE SE PARTAGEAIT NUE.
  //
  // C'est le manque le plus bête et le plus cher de cette page. Une offre de
  // formation locale ne se découvre pas par une recherche : elle se transmet.
  // Un message WhatsApp entre candidats, un lien collé dans un groupe INSPÉ,
  // une affiche photographiée en salle des profs. Sans `openGraph`, tous ces
  // partages sortaient en lien brut — pas de titre, pas de visuel, pas de prix.
  //
  // ⚠️ ET IL FAUT DÉCLARER `images` ICI, EXPRESSÉMENT. Next NE FUSIONNE PAS les
  // champs imbriqués : déclarer `openGraph` dans une page REMPLACE entièrement
  // celui du layout, image comprise. Plusieurs pages du site déclarent leur
  // openGraph sans image et perdent donc `/preview.jpg` sans que ça se voie —
  // à traiter ailleurs, mais pas en le reproduisant ici.
  //
  // ⚠️ Le titre de partage n'est PAS celui de l'onglet : sur un fil de
  // discussion, la ville et le prix décident du clic, et « CRPE » seul ne dit
  // pas où. D'où « Saint-Pierre » et « 60 € » dès la première ligne.
  openGraph: {
    title: `Les maths du CRPE, le samedi à ${LIEU.ville} (La Réunion)`,
    description:
      `${NB_SEANCES} samedis de ${TARIF.heuresParSeance} h, d'octobre à fin mars. ` +
      `${eur(PRIX_SEANCE)} la matinée, payable à la séance, café compris. ` +
      `Groupe de ${TARIF.seuilOuverture} à ${TARIF.plafondGroupe}. Par un professeur de mathématiques en exercice.`,
    url: `${SITE_URL}/formation-crpe`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: `Préparation aux mathématiques du CRPE, ${NB_SEANCES} samedis à ${LIEU.ville}, La Réunion`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `Les maths du CRPE, le samedi à ${LIEU.ville} (La Réunion)`,
    description:
      `${NB_SEANCES} samedis de ${TARIF.heuresParSeance} h pour la seule épreuve de mathématiques. ` +
      `${eur(PRIX_SEANCE)} la matinée, sans forfait.`,
    images: ["/preview.jpg"],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LES TEINTES DES SÉANCES.
//
// ⭐ CINQ COULEURS QUI TOURNENT, ET C'EST LE CŒUR DU « PLUS JOYEUX ». Quatorze
// cartes strictement identiques se lisent comme un tableau administratif ; les
// mêmes quatorze cartes avec une pastille qui change de couleur se lisent comme
// un parcours. Rien d'autre ne change — ni la taille, ni l'ordre, ni le texte.
//
// ⚠️ LES CLASSES SONT ÉCRITES EN ENTIER, jamais construites par morceaux.
// `from-${c}-400` ne serait pas trouvé par Tailwind au build et la pastille
// sortirait grise. C'est l'idiome déjà utilisé par /cahier-vacances.
// ─────────────────────────────────────────────────────────────────────────────
const TEINTES = [
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
  "from-sky-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-fuchsia-500",
];

export default function FormationCrpePage() {
  const automne = SEANCES.filter((s) => s.bloc === "automne");
  const finale = SEANCES.filter((s) => s.bloc === "finale");

  return (
    // ⭐ FOND CLAIR ET CHAUD (23/08). Le dégradé va de l'ambre au bleu ciel en
    // passant par un rose très pâle : c'est un samedi matin à Saint-Pierre, pas
    // une salle de serveurs. `text-slate-900` sur ce fond tient largement le
    // contraste AA, ce que le blanc sur #041B33 tenait aussi — la lisibilité
    // n'était pas le problème, la température l'était.
    // ⚠️ `pb-28 sm:pb-12` : la barre d'action collante du téléphone recouvre le
    // bas de la page sur mobile. Sans cette réserve, elle masque le dernier lien.
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-amber-50 via-rose-50/40 to-sky-50 px-4 pb-28 pt-10 text-slate-900 sm:px-6 sm:pb-12 lg:px-8">
      {/* Les données structurées. Voir le commentaire de `donneesStructurees`
          plus haut : c'est la seule page du site qui décrive une chose
          physique, datée et payante. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesStructurees()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesFaq()) }}
      />

      {/* Halos pastel, très doux. Sur fond clair ils ne « décorent » pas : ils
          empêchent les grands aplats blancs de paraître vides entre les blocs. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-[-6%] h-[32rem] w-[32rem] rounded-full bg-amber-200/40 blur-[120px]" />
        <div className="absolute right-[-14%] top-[30%] h-[30rem] w-[30rem] rounded-full bg-rose-200/40 blur-[120px]" />
        <div className="absolute left-[6%] top-[70%] h-[30rem] w-[30rem] rounded-full bg-sky-200/40 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <p className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
          🏝️ {LIEU_COURT} · La Réunion · {NB_SEANCES} samedis
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
          Les maths du CRPE,{" "}
          {/* ⚠️ LA VILLE, PAS LE QUARTIER. « à Terre-Sainte » ne dit rien à
              quelqu'un de Saint-Denis ou de Saint-André, et c'est exactement
              celui-là qui doit décider s'il descend le samedi matin. Le
              quartier et le nom de l'hôtel sont juste au-dessus, dans le
              bandeau, et juste en dessous, dans le chapeau.
              ⭐ Le soulignement au trait épais est repris de la maison
              (/parents, /espace-profs) : il fait respirer un titre en gras
              sans ajouter une couleur de plus. */}
          <span className="relative whitespace-nowrap text-orange-600">
            le samedi matin
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-orange-300/70"
            />
          </span>{" "}
          à {LIEU.ville}
        </h1>

        <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-lg">
          {NB_SEANCES} matinées de {TARIF.heuresParSeance} heures, d&apos;octobre
          à fin mars, à {LIEU_LONG}, pour une seule épreuve&nbsp;: celle de
          mathématiques. Vous écrivez, je corrige vos copies, on recommence.
        </p>

        {/* ⭐⭐ LES DEUX BOUTONS DU HERO — LE MANQUE LE PLUS COÛTEUX DE LA PAGE
            AVANT LE 23/08. L'ancre `#inscription` existait depuis le premier
            jour et RIEN NE POINTAIT DESSUS : le téléphone n'apparaissait
            qu'après les 14 séances, le prix, le seuil et « ce que ce n'est
            pas ». Quelqu'un de convaincu par le chapeau n'avait nulle part où
            cliquer — il devait faire défiler toute l'offre pour trouver un
            numéro. C'est le genre de trou qui ne se voit pas en relisant le
            texte, seulement en regardant la page en entier.
            ⚠️ Le second bouton descend au calendrier plutôt qu'au prix : celui
            qui hésite veut savoir CE QU'ON FAIT, pas ce que ça coûte — le prix
            est déjà dans la carte du dessous. */}
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#inscription"
            className="rounded-2xl bg-orange-500 px-7 py-3.5 text-base font-black text-white shadow-lg shadow-orange-500/20 transition hover:scale-105 hover:bg-orange-400"
          >
            Retenir ma place →
          </a>
          <a
            href="#calendrier"
            className="rounded-2xl bg-white px-7 py-3.5 text-base font-black text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Voir les {NB_SEANCES} samedis
          </a>
        </div>

        {/* Les trois chiffres qui décident. Un candidat compare trois choses —
            combien d'heures, combien ça coûte, quand ça finit. Les lui donner
            au-dessus de la ligne de flottaison évite qu'il aille les chercher
            chez quelqu'un d'autre.
            ⚠️ CE SONT LES SEULS CHIFFRES DE LA PAGE, ET C'EST VOULU. Le
            concurrent en aligne cinq de plus — taux d'admis, satisfaction,
            ancienneté. Nous n'en avons aucun : la première session n'a pas eu
            lieu. Trois chiffres vrais valent mieux que huit dont cinq inventés. */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { k: `${NB_HEURES} h`, v: `${NB_SEANCES} samedis, ${HORAIRES_COURT}`, c: "text-sky-600" },
            { k: eur(PRIX_SEANCE), v: "la matinée, café compris — pas de forfait", c: "text-orange-600" },
            {
              k: CONCOURS.confirme ? CONCOURS.libelle : "printemps 2027",
              v: CONCOURS.confirme
                ? "date des écrits"
                : "écrits attendus — calendrier officiel à l'automne",
              c: "text-emerald-600",
            },
          ].map((c) => (
            <div
              key={c.k}
              className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"
            >
              <p className={`text-3xl font-black ${c.c}`}>{c.k}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                {c.v}
              </p>
            </div>
          ))}
        </div>

        {/* ⭐⭐ LE MALENTENDU QUI COÛTE LE PLUS CHER, ET QUI EST L'ARGUMENT DE
            LA PAGE (correction de Frédéric, 22/08).
            Un candidat se prépare à enseigner jusqu'au CM2 et croit donc réviser
            le programme du primaire. Or l'épreuve écrite de mathématiques du
            CRPE porte sur le programme de l'école ET du collège : Thalès,
            Pythagore, PGCD, mise en équation, probabilités y sont. C'est
            exactement l'écart qui fait rater l'épreuve à des gens qui savent
            enseigner.
            ⛔ NE PAS ÉCRIRE « le programme du primaire » AILLEURS SUR CETTE
            PAGE. Le premier jet le faisait, dans la citation et dans l'encart
            d'été austral, et ça sous-vendait la préparation autant que ça
            trompait le lecteur.
            ⚠️ La maquette a changé à la session 2026 : reverifier l'étendue
            exacte dans l'arrêté de la session 2027 quand il sortira, en même
            temps que la date des écrits. */}
        <div className="mt-8 rounded-3xl bg-rose-50 p-6 shadow-sm ring-1 ring-rose-200 sm:p-7">
          <h2 className="text-lg font-black text-rose-900 sm:text-xl">
            ⚠️ L&apos;épreuve va bien plus loin que ce que vous enseignerez
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
            Vous préparez un métier qui s&apos;arrête au CM2, mais
            l&apos;épreuve, elle, ne s&apos;arrête pas là&nbsp;: elle porte sur
            le programme de l&apos;école{" "}
            <strong className="text-rose-800">et du collège</strong>. Thalès,
            Pythagore, PGCD, mise en équation, probabilités — c&apos;est du
            programme de troisième, et c&apos;est dans le sujet. Beaucoup de
            candidats révisent le primaire, qu&apos;ils maîtrisent déjà, et se
            font sortir par un exercice de quatrième.
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
            C&apos;est précisément là que je peux servir&nbsp;: j&apos;enseigne
            les mathématiques au collège, et j&apos;écris les fiches de cours du
            primaire. Les deux bouts du programme de l&apos;épreuve, je les ai
            sous la main tous les jours.
          </p>
        </div>

        {/* Le mot de Frédéric : d'où vient la légitimité. Pas d'un organisme,
            de la salle de classe — et c'est exactement ce qu'un candidat qui a
            déjà échoué une fois vient chercher.
            ⭐ LA PHOTO GRANDIT (23/08). Elle faisait 56 px sur fond sombre, où
            elle se voyait à peine. C'est le seul visage de la page, et un
            visage est précisément ce que le concurrent aligne par dizaines.
            Nous n'en avons qu'un — raison de plus pour qu'il se voie. */}
        <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:flex-row sm:items-center sm:p-7">
          <Image
            src="/images/avatar-frederic-Lacoste.jpg"
            alt="Frédéric Lacoste, professeur de mathématiques à La Réunion, fondateur d'EleveAI"
            width={96}
            height={96}
            className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-amber-200 sm:h-24 sm:w-24"
          />
          <p className="text-sm font-semibold leading-7 text-slate-700">
            «&nbsp;J&apos;enseigne les mathématiques au collège, et j&apos;écris
            en ce moment les fiches de cours du primaire, du CP au CM2. Le
            programme sur lequel on vous interroge, du CP à la troisième, je suis
            en train de le relire ligne à ligne. C&apos;est de là que je vous
            prépare&nbsp;: pas d&apos;un manuel de concours, du programme
            réel.&nbsp;»
            <span className="mt-2 block text-xs font-black uppercase tracking-wide text-slate-400">
              — Frédéric Lacoste, professeur de mathématiques, fondateur d&apos;EleveAI
            </span>
          </p>
        </div>

        {/* ── LE CALENDRIER ──────────────────────────────────────────────── */}
        {/* ⭐ L'ANCRE `#calendrier` EST NOUVELLE (23/08) : c'est la cible du
            second bouton du hero. Sans elle il n'y avait aucun moyen de sauter
            l'introduction pour aller voir le programme. */}
        <h2 id="calendrier" className="mt-12 scroll-mt-24 text-2xl font-black sm:text-3xl">
          🗓️ Les {NB_SEANCES} samedis
        </h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Deux blocs, une coupure assumée au milieu. Vous savez dès aujourd&apos;hui
          ce que vous faites le 27 mars.
        </p>

        <p className="mt-6 text-xs font-black uppercase tracking-wide text-orange-600">
          Bloc 1 · octobre → décembre · {automne.length} séances
        </p>
        <ol className="mt-3 space-y-3">
          {automne.map((s, i) => (
            <SeanceLigne key={s.date} n={i + 1} s={s} />
          ))}
        </ol>

        {/* ⭐ LA COUPURE. Elle était le point faible du plan ; elle devient
            l'argument. Six semaines sans salle, ce n'est pas six semaines sans
            travail — c'est le moment où le site fait son métier, gratuitement.
            C'est aussi ce qui rend la ligne payante défendable : on ne facture
            que ce qui ne se copie pas. */}
        <div className="mt-6 rounded-3xl bg-emerald-50 p-6 shadow-sm ring-1 ring-emerald-200 sm:p-7">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
            Mi-décembre → fin janvier · aucune séance
          </p>
          <h3 className="mt-1 text-lg font-black text-emerald-950 sm:text-xl">
            L&apos;été austral&nbsp;: la salle ferme, le site reste ouvert
          </h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
            Six semaines de vacances à La Réunion, et personne ne viendra
            travailler un samedi de janvier. Alors on ne fait pas semblant&nbsp;:
            il n&apos;y a pas de séance, et il n&apos;y a rien à payer. Ce qui
            reste, en accès libre, c&apos;est tout le programme sur lequel on
            vous interroge — les fiches de cours{" "}
            <strong className="text-emerald-800">du CP à la troisième</strong>,
            et le coach pour s&apos;entraîner. Le collège surtout&nbsp;: c&apos;est
            là que se perdent les points, et c&apos;est là que l&apos;entretien
            compte. Vous entretenez, vous ne progressez pas&nbsp;: la progression
            reprend le 6 février.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/fiches-cours"
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-emerald-800 shadow-sm ring-1 ring-emerald-200 transition hover:bg-emerald-100"
            >
              Les fiches de cours →
            </Link>
            <Link
              href="/coach-maths-ia"
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-emerald-800 shadow-sm ring-1 ring-emerald-200 transition hover:bg-emerald-100"
            >
              Le coach, pour s&apos;entraîner →
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs font-black uppercase tracking-wide text-orange-600">
          Bloc 2 · février → mars · {finale.length} séances
        </p>
        <ol className="mt-3 space-y-3">
          {finale.map((s, i) => (
            <SeanceLigne key={s.date} n={automne.length + i + 1} s={s} />
          ))}
        </ol>

        {/* ── LE PRIX ────────────────────────────────────────────────────── */}
        <h2 className="mt-12 text-2xl font-black sm:text-3xl">
          💶 Le prix, et pourquoi il est à la séance
        </h2>

        <div className="mt-5 overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-amber-200">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 sm:p-7">
            <p className="text-5xl font-black text-slate-900 sm:text-6xl">
              {eur(PRIX_SEANCE)}{" "}
              <span className="ml-1 align-middle text-base font-bold text-slate-600">
                la séance de {TARIF.heuresParSeance} h ({TARIF.horaire} €/h)
              </span>
            </p>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
              Soit {eur(PRIX_CYCLE)} si vous venez aux {NB_SEANCES} séances. Mais
              il n&apos;y a pas de forfait annuel, et c&apos;est délibéré&nbsp;:
              quelqu&apos;un qui nous rejoint en février ne doit pas payer octobre,
              et quelqu&apos;un qui arrête en novembre ne doit pas payer mars. Vous
              payez les samedis où vous êtes là.
            </p>
          </div>

          {/* CE QUI EST COMPRIS. Le café n'est pas un détail d'intendance : il
              dit qu'une matinée de quatre heures a été pensée comme une matinée,
              avec une pause, et non comme un créneau qu'on subit. Il s'arrête
              là — voir le bloc TARIF : rien d'autre n'est promis, donc rien
              d'autre ne peut décevoir. */}
          <ul className="grid gap-3 p-6 sm:grid-cols-2 sm:p-7">
            {[
              `La salle, à ${LIEU.nom ? `l'${LIEU.nom}` : LIEU.quartier} — on vient, on s'assoit, on travaille.`,
              "Le café ou le thé de la pause, au milieu de la matinée.",
              "Les sujets, les corrigés et vos copies annotées de ma main.",
              "Les fiches et le coach du site, toute l'année, sans surcoût.",
            ].map((l) => (
              <li
                key={l}
                className="flex gap-2.5 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white"
                >
                  ✓
                </span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ⚠️ LE SEUIL — motif PÉDAGOGIQUE, pas comptable (voir le bloc TARIF).
            Il est public parce qu'un candidat préfère largement l'apprendre
            maintenant que le 3 octobre à 8 h devant une porte fermée. */}
        <div className="mt-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
          <h3 className="text-lg font-black text-slate-900">
            De {TARIF.seuilOuverture} à {TARIF.plafondGroupe} participants, pas plus
          </h3>
          <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
            En dessous de {TARIF.seuilOuverture}, on ne confronte plus rien&nbsp;:
            la moitié de ce qu&apos;on apprend un samedi vient de la copie du
            voisin, pas de la mienne. Si le groupe ne se forme pas, vous êtes
            prévenu deux semaines avant le 3 octobre et vous n&apos;avez rien
            avancé. Au-delà de {TARIF.plafondGroupe}, je ne peux plus corriger
            toutes les copies dans la séance — et c&apos;est précisément ce que
            vous venez chercher.
          </p>
        </div>

        {/* ⭐ SECOND APPEL, JUSTE APRÈS LE PRIX (23/08). C'est le moment exact
            où quelqu'un décide : il vient de lire combien ça coûte et ce qui est
            compris. L'envoyer chercher le téléphone six blocs plus bas, c'est
            lui laisser le temps de refermer l'onglet. */}
        <p className="mt-5 text-center">
          <a
            href="#inscription"
            className="inline-block rounded-2xl bg-orange-500 px-7 py-3.5 text-base font-black text-white shadow-lg shadow-orange-500/20 transition hover:scale-105 hover:bg-orange-400"
          >
            Retenir ma place pour le 3 octobre →
          </a>
        </p>

        {/* ── CE QUE ÇA N'EST PAS ────────────────────────────────────────── */}
        <div className="mt-10 rounded-3xl bg-slate-100 p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
          <h2 className="text-lg font-black text-slate-900 sm:text-xl">
            🚫 Ce que ce n&apos;est pas
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm font-semibold leading-7 text-slate-600">
            {CE_QUE_CE_NEST_PAS.map((l) => (
              <li key={l} className="flex gap-2.5">
                <span aria-hidden className="text-slate-400">
                  —
                </span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── LA FAQ ──────────────────────────────────────────────────────
            ⭐ NOUVELLE LE 23/08. Ce sont les questions qu'on pose au téléphone,
            et une page qui n'y répond pas transforme chacune en appel — ou,
            plus souvent, en abandon silencieux. Voir le tableau FAQ plus haut :
            aucune réponse n'introduit un fait qui ne soit déjà sur la page.
            ⚠️ `<details>` natif, sans JavaScript : la page reste un composant
            serveur, et les réponses sont dans le HTML dès le premier octet —
            donc lisibles par Google et par un lecteur d'écran même repliées. */}
        <h2 className="mt-12 text-2xl font-black sm:text-3xl">
          🙋 Les questions qu&apos;on me pose
        </h2>
        <div className="mt-5 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 open:ring-orange-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-slate-900">
                {f.q}
                <span
                  aria-hidden
                  className="shrink-0 text-xl font-black text-orange-500 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                {f.r}
              </p>
            </details>
          ))}
        </div>

        {/* ── CONTACT ─────────────────────────────────────────────────────
            Pas de formulaire : à ce stade, il n'y a rien à encaisser en ligne
            et une inscription se règle en trois phrases. Un formulaire
            ajouterait un délai entre l'envie et le contact.
            ⭐ C'EST LE SEUL BLOC SOMBRE DE LA PAGE, ET C'EST EXPRÈS. Sur douze
            blocs clairs, celui-ci s'arrête net sous l'œil — c'est la recette de
            /parents et /espace-profs, où le fond #041B33 ne sert jamais à
            décorer mais à désigner le seul endroit où l'on agit. */}
        <div
          id="inscription"
          className="mt-12 scroll-mt-24 rounded-3xl bg-[#041B33] p-6 text-white shadow-xl sm:p-8"
        >
          <h2 className="text-2xl font-black sm:text-3xl">
            Retenir votre place pour le 3 octobre
          </h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-white/75">
            Rendez-vous à {LIEU_LONG}, {HORAIRES_PHRASE}. Dites-moi où vous en
            êtes et ce que vous ratez d&apos;habitude en maths. Aucune avance à
            verser&nbsp;: on se compte, et la session s&apos;ouvre si nous sommes
            assez.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="tel:+262692742958"
              className="rounded-2xl bg-amber-400 px-6 py-3.5 text-base font-black text-[#041B33] shadow-lg transition hover:scale-105 hover:bg-amber-300"
            >
              📞 06 92 74 29 58
            </a>
            <a
              href="mailto:contact@eleveai.fr?subject=Pr%C3%A9paration%20CRPE%20-%20maths%20-%20Saint-Pierre"
              className="rounded-2xl bg-white/10 px-6 py-3.5 text-base font-black text-white ring-1 ring-white/25 transition hover:bg-white/20"
            >
              ✉️ contact@eleveai.fr
            </a>
          </div>
        </div>

        {/* ⭐ TI MARGO SIGNE LA PAGE (23/08). C'est notre équivalent des visages
            du concurrent, et il a un avantage sur eux : il est à nous. Il ne
            prouve rien — il dit seulement que derrière cette offre il y a le
            même site que les fiches et les cahiers, pas un organisme. Petit, en
            bas, après la décision : il accompagne, il ne vend pas. */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-slate-200 pt-8">
          <Image
            src="/cahier-vacances/ti-margo.png"
            alt="Ti Margo, le margouillat d'EleveAI, avec son crayon"
            width={1122}
            height={1402}
            sizes="44px"
            loading="lazy"
            className="h-11 w-auto"
          />
          <p className="text-center text-sm font-semibold text-slate-500">
            Une préparation écrite et tenue par un professeur de mathématiques en
            exercice, à La Réunion.
          </p>
          <Link
            href="/"
            className="mt-1 text-sm font-bold text-slate-500 underline underline-offset-2 hover:text-slate-800"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>

      {/* ⭐⭐ LA BARRE COLLANTE DU TÉLÉPHONE (23/08), `sm:hidden`.
          Sur mobile la page fait plusieurs écrans de haut et le seul moyen de
          joindre quelqu'un se trouvait tout en bas. Or c'est sur téléphone
          qu'on appelle — le lien `tel:` y est le seul qui aboutisse vraiment.
          La barre suit donc le lecteur du début à la fin.
          ⚠️ Elle impose la réserve `pb-28` sur le <main> : sans elle, elle
          recouvrirait le dernier lien de la page. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur sm:hidden">
        <a
          href="tel:+262692742958"
          className="flex-1 rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-black text-white"
        >
          📞 Appeler
        </a>
        <a
          href="#inscription"
          className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-black text-slate-800"
        >
          Retenir ma place
        </a>
      </div>
    </main>
  );
}

// Une séance = une ligne. Le numéro compte : un candidat qui hésite regarde
// d'abord combien il en reste après celle où il pourrait entrer.
//
// ⭐ LA PASTILLE PREND SA COULEUR DANS `TEINTES`, PAR SON RANG. Quatorze
// pastilles ambre alignées font une liste ; quatorze pastilles qui tournent
// font un parcours. C'est tout ce qui a changé le 23/08 — le texte, l'ordre et
// la structure des séances sont ceux que Frédéric a validés le 22.
function SeanceLigne({ n, s }: { n: number; s: Seance }) {
  const teinte = TEINTES[(n - 1) % TEINTES.length];
  return (
    <li className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${teinte} text-sm font-black text-white shadow-sm`}
      >
        {n}
      </span>
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-slate-400">
          {s.date}
        </p>
        <h3 className="mt-0.5 text-base font-black text-slate-900">{s.titre}</h3>
        <p className="mt-1.5 text-sm font-semibold leading-7 text-slate-600">
          {s.detail}
        </p>
      </div>
    </li>
  );
}
