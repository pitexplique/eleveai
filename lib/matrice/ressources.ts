// lib/matrice/ressources.ts
//
// L'INVENTAIRE. C'est le cœur du produit, et le seul fichier du chantier
// qu'une machine ne peut pas écrire à la place d'un prof.
//
// ⚠️ LES STATUTS CI-DESSOUS SONT UNE PROPOSITION, PAS UNE VALIDATION.
// Ils ont été posés à partir des routes réellement présentes dans le dépôt et
// de ce qui a déjà tourné en classe. Frédéric doit les relire un par un :
// « validee » veut dire QU'IL l'a relue, « testee_eleves » qu'une classe l'a
// réellement utilisée. Tant qu'il ne l'a pas fait, une ressource ne devrait
// pas dépasser « a_verifier ».
//
// RÈGLE : seules `validee` et `testee_eleves` sortent du moteur. Une nouvelle
// ressource naît en `a_verifier` — donc invisible. C'est volontaire : on ne
// recommande jamais ce que personne n'a relu.
//
// ⭐ DEUX CHAMPS AJOUTÉS LE 07/08 : `type` et `resultat`.
//   — `type` dit CE QUE C'EST (un parcours, une fiche, une machine) ;
//   — `resultat` dit CE QUE ÇA REND (un score, une progression, un corrigé).
// Ils ne changent rien pour un élève : ils font exister le filtre du
// professeur, « les ressources que mes élèves peuvent vraiment faire, et dont
// je verrai quelque chose revenir ». Une ressource sans `resultat` n'est pas
// moins bonne — elle ne remonte simplement rien, et il faut le savoir avant de
// la donner à faire.

import { CAHIERS, GUIDES } from "./guides";
import type { ProfilId, RessourceEleveAI, StatutRessource } from "./types";

/** Le statut d'une ressource qu'on vient d'ajouter. Ne PAS le changer. */
export const STATUT_PAR_DEFAUT: StatutRessource = "a_verifier";

/** Les seuls statuts que le moteur accepte de recommander. */
export const STATUTS_PUBLIABLES: StatutRessource[] = ["validee", "testee_eleves"];

/**
 * ⭐ LES PORTES ÉCRITES — l'ordre des cartes quand la personne n'a RIEN dit.
 *
 * Le moteur classe au score, et c'est la bonne règle dès qu'une notion ou une
 * intention est exprimée : il répond alors à une demande. Mais sur le premier
 * écran, personne n'a rien demandé — le commentaire du moteur le dit déjà,
 * « on montre les portes de son niveau ». Or « les mieux classées » n'est pas
 * la même chose que « les bonnes » : le calcul rapide arrivait premier chez le
 * parent parce qu'il porte `testee_eleves` (+1), pas parce qu'un parent vient
 * chercher ça.
 *
 * Frédéric, 12/08 : « Espace parents en premier, coach en 2°, photographier
 * un cours en troisième ». Trois portes, dans cet ordre, et le score reprend
 * la main dès qu'on lui parle.
 *
 * ⚠️ Un id absent des candidats est simplement sauté (mauvais profil, statut
 * non publiable) : cette liste ne force jamais l'affichage d'une ressource
 * qui n'a pas passé les filtres.
 *
 * ⛔ N'écrire une liste ici que si l'ordre au score est FAUX pour ce profil.
 * Ailleurs, le score fait mieux que nous.
 *
 * ── TROIS FORMES D'ENTRÉE ───────────────────────────────────────────────────
 *   « photo-cours »  un id précis ;
 *   « type:coach »   la mieux classée de ce TYPE — c'est ce qu'il faut pour
 *                    « le coach », parce qu'il y en a cinq et que celui qui
 *                    convient dépend de la matière cliquée. Un id figé aurait
 *                    donné le coach de maths à un élève venu pour l'espagnol ;
 *   « * »            la mieux classée qui reste, quelle qu'elle soit. C'est
 *                    le TROU laissé au score.
 *
 * Frédéric, 12/08, pour l'élève à partir de la 6ᵉ : « Coach en 1er, en 2de
 * position ce que tu veux en fonction de la classe, et en 3ᵉ photo du cours ».
 * La place du milieu reste donc au moteur : c'est là que la saison, le niveau
 * et les évaluations nationales font leur travail, et ils le font mieux
 * qu'une liste écrite en août.
 */
const PORTES_ELEVE_DES_LA_6E = ["type:coach", "*", "photo-cours"];

export const PORTES_ECRITES: Partial<Record<ProfilId, string[]>> = {
  parent: ["espace-parents", "coach-maths", "photo-cours"],
  // ⛔ Rien avant la 6ᵉ : « photo-cours » n'est pas ouverte au primaire, et
  // sans elle ces listes ne diraient rien de plus que le score.
  "6e": PORTES_ELEVE_DES_LA_6E,
  "5e": PORTES_ELEVE_DES_LA_6E,
  "4e": PORTES_ELEVE_DES_LA_6E,
  "3e": PORTES_ELEVE_DES_LA_6E,
  seconde: PORTES_ELEVE_DES_LA_6E,
  premiere: PORTES_ELEVE_DES_LA_6E,
  terminale: PORTES_ELEVE_DES_LA_6E,
};

export const RESSOURCES: RessourceEleveAI[] = [
  // ── Le coach ───────────────────────────────────────────────────────────
  {
    id: "coach-maths",
    titre: "Le coach maths",
    promesse: "Une question à la fois, corrigée, avec l'explication quand on se trompe.",
    url: "/coach-ia/maths",
    // ⭐ « prof » AJOUTE LE 08/08. Un enseignant ne voyait NI le coach NI les
    // parcours : les deux ressources qui gardent une trace du travail des
    // eleves etaient invisibles a celui qui les leur donne. C'est exactement
    // la demande « trouver une ressource utilisable par mes eleves, avec un
    // resultat a la cle » (point 12 de la refonte).
    // ⭐ « parent » AJOUTÉ LE 12/08. Il ne voyait PAS le coach — la ressource
    // la plus utilisée du site était invisible à l'adulte assis à côté de
    // l'enfant, exactement comme le professeur avant le 08/08. Un parent ne
    // vient pas s'entraîner pour lui : il vient voir ce que son enfant fait,
    // et refaire une question avec lui.
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof", "parent"],
    matiere: "maths",
    notions: ["*"],
    // « preparer » aussi : un élève qui a un contrôle vendredi vient s'entraîner
    // au coach — c'est même la première chose à lui proposer.
    intentions: ["comprendre", "entrainer", "corriger", "preparer"],
    type: "coach",
    resultat: "progression",
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
    accepteNotion: "maths",
  },
  {
    id: "coach-francais",
    titre: "Le coach français",
    promesse: "Repérer l'erreur d'abord, corriger ensuite.",
    url: "/coach-ia/francais",
    /* ⛔ PAS « seconde » ICI, ET C'EST MESURÉ (18/08/2026). Ses banques
       existent, mais 90 de ses 96 micros lèvent « Aucune paire disponible » au
       coach : un seul item par micro, quand le mode complet en oppose deux.
       Le PARCOURS de 2de, lui, marche et il est déclaré plus bas.
       Contrôle : `scripts/verifier-demarrage.ts seconde francais`. */
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"],
    matiere: "francais",
    notions: ["conjugaison", "grammaire", "orthographe", "lecture", "vocabulaire"],
    intentions: ["comprendre", "entrainer", "corriger", "preparer"],
    type: "coach",
    resultat: "progression",
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
    accepteNotion: "francais",
  },
  {
    id: "coach-anglais",
    titre: "Le coach anglais",
    promesse: "Du A1 au B2, chacun à son rythme.",
    // ⚠️ /coach-ia/english-maths, pas /tutor-v4?matiere=anglais : sans classe,
    // le tutor retombe sur la 6e en maths (normalizeClasse a sa whitelist).
    // Le sommaire, lui, ouvre bien la bonne matière.
    url: "/coach-ia/english-maths",
    niveaux: ["6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "anglais",
    notions: ["anglais"],
    intentions: ["comprendre", "entrainer"],
    type: "coach",
    resultat: "progression",
    statut: "validee",
  },
  {
    // Manquait à l'inventaire jusqu'au 06/08 : le bouton « Espagnol » n'ouvrait
    // que la dictée du jour, alors que le coach existe depuis des mois.
    id: "coach-espagnol",
    titre: "Le coach espagnol",
    promesse: "Du A1 au B2, chacun à son rythme.",
    url: "/coach-ia/espagnol",
    // ⭐ LA 6ᵉ EST DEDANS (tranché par Frédéric le 06/08). La LV2 commence
    // officiellement en 5ᵉ, et l'espagnol ne sortait donc pas pour un 6ᵉ — ce
    // qui était juste sur le papier et faux dans une salle : les classes
    // bilangues font de l'espagnol dès la 6ᵉ, et le coach est en A1→B2, pas en
    // niveaux de classe. On ne descend PAS plus bas : au primaire, la LV1 est
    // l'anglais et rien d'autre.
    niveaux: ["6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "espagnol",
    notions: ["espagnol"],
    intentions: ["comprendre", "entrainer", "preparer"],
    type: "coach",
    resultat: "progression",
    statut: "validee",
  },
  {
    id: "coach-ia",
    titre: "Le coach IA",
    promesse: "Comprendre ce qu'est vraiment une intelligence artificielle.",
    url: "/coach-ia/ia",
    // ⭐ DU CM1 À LA TERMINALE (16/08/2026). Frédéric : « la matière IA a
    // disparu » — écran de 5ᵉ à l'appui — puis, quand je proposais la 6ᵉ :
    // « le coach pour la matière IA n'est pas fait par classe mais par niveau ! »
    //
    // Ce n'était pas un masquage (MATIERES_MASQUEES est vide depuis le 07/08),
    // c'était ARITHMÉTIQUE : l'IA n'existait qu'à partir de la 4ᵉ, un 5ᵉ n'avait
    // donc aucune ressource d'IA, et la rangée des matières — qui se déduit des
    // ressources — n'avait rien à afficher. Le mécanisme a bien fonctionné ; ce
    // sont les niveaux déclarés ici qui étaient faux.
    //
    // 🔑 ET LA RAISON DE FOND EST CELLE DE FRÉDÉRIC : CE COACH N'EST PAS RANGÉ
    // PAR CLASSE. Sa banque est en A1 → C1 (questionBank/{a1,a2,b1,b2,c1}/ia)
    // et `IA_CLASSES` dans app/coach-ia/[matiere]/page.tsx ne contient pas une
    // seule classe. Écrire « à partir de la 4ᵉ » revenait donc à traduire en
    // classes une échelle qui n'en a pas — la même erreur que pour l'espagnol
    // et l'anglais, qui sont aussi en niveaux du cadre européen.
    //
    // ⚠️ LE CM1 N'EST PAS UN PLANCHER DE CONTENU, C'EST UN PLANCHER DE LECTURE.
    // Le A1 se lit (« Avec tes mots : qu'est-ce qu'une intelligence
    // artificielle ? »), mais il se lit seul, en QCM, sans image — au CP, au
    // CE1 et au CE2, on apprend encore à déchiffrer. Une ligne suffit le jour
    // où une banque d'IA leur sera écrite.
    // ⭐ « prof » ET « parent » AUSSI (16/08, Frédéric : « si un élève, prof ou
    // parent coche IA, tu affiches coach IA et parcours IA dans les encarts »).
    // C'est la même correction que pour le coach de maths le 08/08 puis le
    // 12/08 : sans ces deux mots, un enseignant qui clique « IA » n'obtient
    // rien du tout — la matière existe pour lui dans la rangée, et la réponse
    // en dessous est vide.
    niveaux: [
      "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale",
      "prof", "parent",
    ],
    matiere: "ia",
    notions: ["ia"],
    intentions: ["comprendre", "decouvrir"],
    type: "coach",
    resultat: "progression",
    statut: "validee",
  },
  {
    // ⭐ TROUVÉ PAR L'AUDIT DU 16/08/2026 (Frédéric : « et vérifier le fichier
    // ressources.ts »). La page est en production, elle a son titre, sa
    // description et ses trente jours — et elle n'était dans l'inventaire de
    // personne. Un 3ᵉ qui écrivait « je prépare le brevet » recevait
    // l'évaluation nationale et les cahiers de vacances : ce qu'on avait de
    // mieux, faute d'avoir déclaré ce qu'on avait de juste.
    // 🔑 C'est la cinquième fois : une ressource absente ne casse rien, ne lève
    // aucune erreur, ne fait tomber aucun garde-fou. Elle est simplement
    // invisible, et seule la LECTURE du dossier app/ la retrouve.
    // ⚠️ Pas de `resultat` : ni fetch ni localStorage dans CoachBrevetClient —
    // rien ne remonte, et le dire vaut mieux que de le supposer.
    id: "coach-brevet",
    titre: "Le coach Brevet",
    promesse: "Trente jours pour arriver au brevet de maths sans trou.",
    url: "/coach-brevet",
    niveaux: ["3e"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["preparer", "entrainer"],
    type: "coach",
    statut: "validee",
  },
  {
    // Le jumeau du précédent, en Terminale : même absence, même correction.
    id: "coach-bac-spe",
    titre: "Le coach Bac spé maths",
    promesse: "Vingt et un jours : calcul rapide, pièges classiques, sujets express.",
    url: "/coach-bac-spe",
    niveaux: ["terminale"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["preparer", "entrainer"],
    type: "coach",
    statut: "validee",
  },
  {
    id: "parcours",
    titre: "Les parcours",
    promesse: "Une série guidée qui monte en difficulté, du début à la fin.",
    url: "/parcours",
    // « prof » aussi — voir la note sur le coach maths.
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["tester", "entrainer", "preparer"],
    type: "parcours",
    resultat: "score",
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  // Les parcours des AUTRES matières. Ils existaient tous en route, aucun
  // n'était dans l'inventaire : « Espagnol » n'ouvrait que la dictée du jour,
  // et le parcours restait invisible à qui ne connaissait pas son adresse.
  {
    id: "parcours-francais",
    titre: "Les parcours de français",
    promesse: "Une série guidée qui monte en difficulté, du début à la fin.",
    url: "/parcours-francais",
    // ⭐ « seconde » ajoutée le 18/08/2026, en même temps que le sélecteur de
    // classe de `/parcours-francais`. Les deux doivent bouger ensemble : ici
    // c'est l'AUDIENCE de l'encart, là-bas ce que l'élève peut cliquer.
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde"],
    matiere: "francais",
    notions: ["conjugaison", "grammaire", "orthographe", "lecture", "vocabulaire"],
    intentions: ["tester", "entrainer", "preparer"],
    type: "parcours",
    resultat: "score",
    statut: "validee",
  },
  {
    id: "parcours-anglais",
    titre: "Les parcours d'anglais",
    promesse: "L'anglais et les maths dans la même série.",
    url: "/parcours-english-maths",
    niveaux: ["6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "anglais",
    notions: ["anglais"],
    intentions: ["tester", "entrainer", "preparer"],
    type: "parcours",
    resultat: "score",
    statut: "validee",
  },
  {
    id: "parcours-espagnol",
    titre: "Les parcours d'espagnol",
    promesse: "Une série guidée qui monte en difficulté, du début à la fin.",
    url: "/parcours-espagnol",
    // 6ᵉ incluse, comme le coach : voir la note sur `coach-espagnol`.
    niveaux: ["6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "espagnol",
    notions: ["espagnol"],
    intentions: ["tester", "entrainer", "preparer"],
    type: "parcours",
    resultat: "score",
    statut: "validee",
  },
  {
    id: "parcours-ia",
    titre: "Les parcours d'IA",
    promesse: "Comprendre l'intelligence artificielle en la pratiquant.",
    url: "/parcours-ia",
    // Mêmes niveaux que le coach d'IA, et pour la même raison : la banque est
    // en A1 → C1, pas en classes. Les deux se suivent — une matière qui
    // s'ouvre avec un seul de ses deux outils est une matière à moitié
    // ouverte, et c'est l'autre moitié qu'on cherchera.
    niveaux: [
      "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale",
      "prof", "parent",
    ],
    matiere: "ia",
    notions: ["ia"],
    intentions: ["tester", "entrainer", "decouvrir", "comprendre"],
    type: "parcours",
    resultat: "score",
    statut: "validee",
  },
  {
    // ⚠️ `/espace-profs`, ET C'EST LA SEULE (08/08). Trois routes existaient en
    // parallèle — `/enseignants`, `/espace-profs`, `/profs` — sans aucune
    // redirection entre elles, et Google en affichait DEUX comme rubriques du
    // site sous le résultat de marque : deux emplacements sur cinq pour le même
    // public. Frédéric a tranché le nom qui survit ; les deux autres partent
    // en 301 (voir next.config.ts).
    id: "espace-enseignants",
    titre: "L'espace enseignant",
    promesse: "Le suivi élève par élève, et les ressources à donner.",
    url: "/espace-profs",
    niveaux: ["prof"],
    notions: ["*"],
    intentions: ["enseigner", "suivre", "comprendre"],
    type: "page",
    statut: "validee",
  },
  {
    // ⭐ AJOUTÉ LE 08/08 (Frédéric : « il faudra dans la matrice ressources
    // rajouter espace-profs et prompt pédagogique si on clique sur profs en
    // page d'accueil »). L'outil tournait depuis des mois sous le nom
    // `/optimiseur` — un mot que personne ne cherche — et n'était donc proposé
    // à aucun enseignant.
    // ⚠️ RÉSERVÉ AUX CONNECTÉS : la page affiche un mur si `!eleve`. On le
    // propose quand même, parce que la connexion est gratuite et que la
    // ressource est réelle — mais il faut le savoir avant de s'étonner.
    // ⏭️ Il sert AUSSI aux élèves ; l'ouvrir à leurs niveaux est une décision
    // à prendre, pas un oubli.
    id: "prompt-pedagogique",
    titre: "Écrire un prompt pédagogique",
    promesse: "Votre demande est notée sur 20, complétée, puis réécrite.",
    url: "/prompt-pedagogique",
    niveaux: ["prof"],
    notions: ["*"],
    intentions: ["enseigner"],
    type: "page",
    statut: "validee",
  },

  {
    // Manquait à l'inventaire (Frédéric, 06/08 : « si les élèves sont
    // connectés ils voient leurs notes »). Un élève qui demandait « où j'en
    // suis » ne trouvait rien, alors que la page existe et l'attend.
    // ⏳ À terme, l'enseignant y suivra les notes de coach et de parcours de
    // ses élèves, matière par matière — c'est le chantier du dashboard prof.
    id: "dashboard-eleve",
    titre: "Mes résultats",
    promesse: "Tes notes de coach et de parcours, matière par matière.",
    url: "/dashboard-eleve",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    notions: ["*"],
    intentions: ["suivre"],
    type: "suivi",
    resultat: "progression",
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },

  // ── Les rituels ────────────────────────────────────────────────────────
  {
    id: "calcul-rapide",
    titre: "Le calcul rapide",
    promesse: "Cinq minutes, chrono, et on recommence demain.",
    url: "/calcul-rapide",
    // ⭐ TOUTE LA SCOLARITÉ, du CP à la Terminale (chantier du 07/08).
    // Cette ligne doit correspondre EXACTEMENT aux niveaux servis par
    // `app/calcul-rapide/CalculRapideClient.tsx` — un niveau annoncé ici sans
    // banque derrière, c'est une impasse servie à un élève ; un niveau servi
    // par la page mais absent d'ici n'est jamais recommandé à personne (c'est
    // ce qui est arrivé à « Terminale spé », en ligne depuis toujours).
    //   ⭐ CP, CE1, CE2 ENTRENT — chacun a désormais ses deux semaines. Les
    //      énoncés y sont des signes plutôt que des phrases : au CP, on ne
    //      lit pas encore.
    //   ⭐ SECONDE et PREMIÈRE ENTRENT — c'était le trou le plus visible : la
    //      page sautait de la 3e à la Terminale alors que le coach couvre tout.
    //   ⭐ « parent » = le mode « Calculs du quotidien », écrit pour des
    //      adultes — souvent celui qui est assis à côté de l'enfant.
    niveaux: [
      "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e",
      "seconde", "premiere", "terminale", "parent",
    ],
    matiere: "maths",
    notions: ["calcul"],
    intentions: ["rituel", "entrainer"],
    type: "rituel",
    resultat: "score",
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  {
    id: "dictee-du-jour",
    titre: "La dictée du jour",
    promesse: "Cinq mots dictés, chaque jour, avec la série qui monte.",
    url: "/dictee-du-jour",
    // ⭐ LE LYCÉE ENTRE (07/08, Frédéric : « tu as oublié français dans
    // matières ! »). Ce n'était pas un trou de contenu mais un OUBLI DE
    // DÉCLARATION — exactement le même que « Terminale spé » pour le calcul
    // rapide, et il coûtait beaucoup plus cher : le français DISPARAISSAIT
    // entièrement de la rangée des matières en Première et en Terminale.
    // (En Seconde il tenait encore, par le repli sur les ressources de 3ᵉ.)
    //
    // Vérifié avant d'ouvrir, pas supposé : `lib/dictee-du-jour/parNiveau.ts`
    // dérive ses niveaux du Dico et dit « CP → Terminale, SANS TROU » ;
    // `motsDeLaClasse` rend 30 mots en 2ⁿᵈᵉ, 30 en 1ʳᵉ, 60 en Terminale, et
    // `classeVersNiveau` traduit déjà seconde / premiere-spe / terminale-spe.
    //
    // ⭐ LES ADULTES ENTRENT (16/08, Frédéric : « ça peut être utile à la
    // maison et en classe »). Un parent qui cherche un rituel du soir et un
    // enseignant qui cherche cinq minutes de rentrée demandent la même chose
    // que l'élève — la dictée ne leur était simplement pas DÉCLARÉE, comme le
    // lycée avant le 07/08. Rien à coder derrière : la page ne demande aucun
    // compte, et le sélecteur « 🎓 Ta classe » couvre déjà CP → Terminale,
    // donc un adulte tombe sur le bon niveau quel que soit l'enfant ou la
    // classe dont il parle.
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof", "parent"],
    // ⭐ ELLE RESTE « FRANÇAIS », ET C'EST MESURÉ (16/08). Passée en
    // `transversal` pour être trouvable au-delà du français, elle a coûté plus
    // qu'elle ne rapportait : `transversal` est un JOKER, pas une compétence,
    // donc elle perdait le bonus du spécialiste sur son propre terrain et
    // sortait du top 3 sur « dictée » et « orthographe » (25/40 au lieu de
    // 40/40). En prime elle arrivait 1ʳᵉ sur les chips Anglais, Espagnol et IA,
    // devant les coachs de ces matières — et elle n'a pas un mot d'informatique.
    // La dictée n'est pas transversale : c'est une ressource DE FRANÇAIS qui
    // pioche son vocabulaire dans les autres matières. La déclaration doit dire
    // ça. L'élargissement passe par `notions` (ci-dessous), pas par la matière.
    matiere: "francais",
    // ⭐ TOUTES NOTIONS (16/08). C'était ICI le vrai verrou, pas la matière :
    // `moteur.ts:299` écarte toute ressource qui ne déclare pas la notion lue,
    // et la dictée n'en déclarait qu'une. « les fractions », « vocabulaire de
    // maths », « la Révolution » ne la trouvaient donc jamais — alors qu'elle
    // dicte précisément ces mots-là, via le Dico de la classe.
    // ⛔ NE PAS remplacer par une liste de notions : elle piocherait dans tout
    // le Dico (CP → Terminale, 9 matières), la liste serait fausse le jour où
    // le Dico s'enrichit. `"*"` dit la vérité — et le moteur la range comme il
    // faut : générique vaut +1, une notion nommée +5, donc la dictée reste
    // DERRIÈRE le coach sur « les fractions ». Elle devient trouvable, pas
    // envahissante.
    // ⛔ GARDER `orthographe` À CÔTÉ DU JOKER, et ce n'est pas une redondance.
    // Avec `["*"]` seul, mesuré : taper « dictée » ne la trouvait PLUS — elle
    // perdait le +5 de la notion nommée pour le +1 du générique et sortait du
    // top 3, cassant le cas principal pour élargir les cas rares. Les deux
    // ensemble donnent +5 quand on demande l'orthographe, +1 partout ailleurs.
    notions: ["orthographe", "*"],
    intentions: ["rituel", "entrainer"],
    type: "rituel",
    resultat: "score",
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  {
    id: "anglais-du-jour",
    titre: "L'anglais du jour",
    promesse: "Cinq mots par jour, entendus et écrits.",
    url: "/anglais-du-jour",
    // ⭐ IL DESCEND JUSQU'AU CP (07/08). Frédéric : « à chaque fois tu
    // m'enlèves les matières anglais et espagnol » — au CE2, la rangée ne
    // montrait que français et maths, et ce n'était pas un masquage mais un
    // trou d'inventaire. Deux raisons de le combler :
    //   — l'anglais est LV1 dès le CP au programme, ce n'est pas une avance ;
    //   — le répertoire commence au A1 (lib/repertoire/anglais.ts, banque
    //     englishA1QuestionBank), donc il y a vraiment du contenu derrière.
    //     Cinq mots par jour avec le son ne demandent aucun prérequis.
    // ⛔ L'ESPAGNOL NE DESCEND PAS, et ce n'est pas un oubli : Frédéric a
    // tranché le 06/08 qu'au primaire la LV1 est l'anglais et rien d'autre.
    // Une ligne suffira le jour où il en décidera autrement.
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "anglais",
    notions: ["anglais"],
    intentions: ["rituel"],
    type: "rituel",
    resultat: "score",
    statut: "validee",
  },
  {
    id: "espagnol-du-jour",
    titre: "L'espagnol du jour",
    promesse: "Cinq mots par jour, entendus et écrits.",
    url: "/espagnol-du-jour",
    // 6ᵉ incluse, comme le coach : voir la note sur `coach-espagnol`.
    // Cinq mots par jour ne demandent aucun prérequis de programme.
    niveaux: ["6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "espagnol",
    notions: ["espagnol"],
    intentions: ["rituel"],
    type: "rituel",
    resultat: "score",
    statut: "validee",
  },
  {
    id: "defis-du-jour",
    titre: "Les défis du jour",
    promesse: "Un défi, des points, et on voit qui suit.",
    url: "/defis-du-jour",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e"],
    notions: ["*"],
    intentions: ["decouvrir", "rituel"],
    type: "defi",
    resultat: "score",
    statut: "validee",
  },

  // ── Préparer une échéance ──────────────────────────────────────────────
  {
    id: "eval-nat-6e-maths",
    titre: "Évaluation nationale 6e — maths",
    promesse: "Au rythme réel de l'épreuve : une minute par question.",
    url: "/evaluation-nationale-college/6e-maths",
    niveaux: ["6e", "cm2"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["preparer"],
    type: "evaluation",
    resultat: "score",
    statut: "validee",
  },
  {
    id: "eval-nat-6e-francais",
    titre: "Évaluation nationale 6e — français",
    promesse: "Au rythme réel de l'épreuve : une minute par question.",
    url: "/evaluation-nationale-college/6e-francais",
    niveaux: ["6e", "cm2"],
    matiere: "francais",
    notions: ["*"],
    intentions: ["preparer"],
    type: "evaluation",
    resultat: "score",
    statut: "validee",
  },
  {
    id: "eval-nat-4e-maths",
    titre: "Évaluation nationale 4e — maths",
    promesse: "Au rythme réel de l'épreuve : une minute par question.",
    url: "/evaluation-nationale-college/4e-maths",
    niveaux: ["4e"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["preparer"],
    type: "evaluation",
    resultat: "score",
    statut: "validee",
  },
  {
    id: "eval-nat-4e-francais",
    titre: "Évaluation nationale 4e — français",
    promesse: "Au rythme réel de l'épreuve : une minute par question.",
    url: "/evaluation-nationale-college/4e-francais",
    niveaux: ["4e"],
    matiere: "francais",
    notions: ["*"],
    intentions: ["preparer"],
    type: "evaluation",
    resultat: "score",
    statut: "validee",
  },

  {
    // ⭐ L'ÉVALUATION DE LA MATIÈRE IA (ajoutée le 16/08/2026 par l'audit).
    // La page tourne, le chef d'établissement l'avait déjà en action écrite
    // (actions.ts) — mais elle n'était dans l'inventaire de personne, donc
    // invisible à l'élève qui la passe et au professeur qui la donne.
    //
    // Frédéric, 16/08 : « tu peux aussi parcours qui est une évaluation ».
    // C'est exactement la troisième porte de l'IA : le coach explique, le
    // parcours entraîne et note, celle-ci rend un PROFIL DE COMPÉTENCES sur les
    // trois domaines du référentiel Pix (fondements, usages, enjeux).
    //
    // ⚠️ 4ᵉ ET AU-DESSUS, alors que le coach d'IA descend au CM1 : ici le
    // découpage EST scolaire — `EvalPixIaClient` ne connaît que deux modes,
    // « collège » et « lycée », et le référentiel Pix vise le cycle 4 puis le
    // lycée. Le niveau se choisit sur la page ; on ne le devine pas.
    id: "eval-pix-ia",
    titre: "Éval blanche Pix IA",
    promesse: "Les trois domaines du référentiel, et le profil de compétences à la fin.",
    url: "/eval-pix-ia",
    niveaux: ["4e", "3e", "seconde", "premiere", "terminale", "prof", "direction"],
    matiere: "ia",
    notions: ["ia"],
    intentions: ["preparer", "tester"],
    type: "evaluation",
    resultat: "score",
    statut: "validee",
  },

  // ── Les guides de survie ───────────────────────────────────────────────
  // ⭐ LA LISTE N'EST PLUS ICI (07/08) : elle vit dans lib/matrice/guides.ts,
  // parce que le menu de l'élève connecté en a besoin lui aussi et qu'un même
  // catalogue écrit à deux endroits finit toujours par diverger. Ici on ne fait
  // que les habiller en ressources.
  ...GUIDES.map((g): RessourceEleveAI => ({
    id: `guide-${g.slug}`,
    titre: `Guide de survie — ${g.libelle}`,
    promesse: "Ce qu'il faut avoir en tête, ramassé sur une page à imprimer.",
    url: `/guide-de-survie/${g.slug}`,
    niveaux: [...g.niveaux],
    matiere: g.matiere,
    // ⭐ « guides » EN TÊTE (07/08). Taper « guide de survie » dans la barre
    // renvoyait l'évaluation nationale : aucun mot de la phrase n'était
    // reconnu, le moteur repliait sur le niveau, et le coup de pouce de saison
    // faisait le reste. On demandait un guide, on recevait une épreuve.
    notions:
      g.matiere === "francais"
        ? ["guides", "conjugaison", "grammaire", "orthographe", "*"]
        : g.matiere === "anglais"
          ? ["guides", "anglais"]
          : ["guides", "*"],
    intentions: ["preparer", "comprendre"],
    type: "guide",
    // Une page à imprimer ne remonte rien, et c'est très bien : elle sert au
    // moment où l'on n'a pas d'écran. Le champ le dit plutôt que de le taire.
    statut: "validee",
  })),

  // Les cahiers de vacances — le dossier app/cahier-vacances/ fait foi.
  //
  // ⭐ LE PRIMAIRE ENTRE (07/08, Frédéric : « on n'a pas branché le cahier de
  // vacances dans la matrice pour tous les niveaux »). Cinq cahiers existaient
  // en ligne — vers le CP, le CE1, le CE2, le CM1, le CM2 — et AUCUN n'était
  // dans l'inventaire. Un CP, un CE1, un CE2 n'avaient donc pas un seul cahier
  // à se voir proposer, alors que les cahiers font l'essentiel du trafic du
  // site. C'est le genre de trou qu'on ne voit pas : rien ne casse, la page
  // répond, elle n'est simplement jamais recommandée.
  //
  // ⚠️ Le titre dit d'où l'on vient, les niveaux disent à qui on parle :
  // « vers le CE1 » s'adresse à un enfant qui sort du CP, donc `["cp","ce1"]`.
  // Même convention que les cahiers du collège, déjà en place.
  // ⚠️ LA LISTE VIT DANS guides.ts, comme celle des guides de survie. Elle
  // sert à deux endroits — l'inventaire ci-dessous et la pastille « Cahiers »
  // de l'entrée — et deux copies d'un même catalogue finissent toujours par
  // diverger d'une ligne, celle qu'on vient d'ajouter d'un seul côté.
  ...CAHIERS.map((c): RessourceEleveAI => ({
    id: `cahier-${c.slug}`,
    titre: `Cahier de vacances — ${c.libelle}`,
    promesse: "À imprimer, avec les corrigés.",
    url: `/cahier-vacances/${c.slug}`,
    niveaux: [...c.niveaux],
    // Même correction que les guides : « cahier de vacances » tapé dans la
    // barre ne trouvait rien et repartait sur l'évaluation nationale.
    notions: ["cahiers", "*"],
    intentions: ["preparer", "entrainer"],
    type: "cahier",
    resultat: "corrige",
    statut: "validee",
  })),
  {
    // Le cahier de MATHS seul (app/cahier-vacances/maths), qui rejoue les
    // défis de Picto Maths sur le collège. ⚠️ Il ne couvre PAS les mêmes
    // niveaux que /picto-maths (CP→CM2) : sa page annonce CM2→3e.
    // `famille` les rend exclusifs : ce sont les mêmes vingt-cinq défis, et
    // les proposer tous les deux dans la même réponse serait proposer deux
    // fois la même chose sous deux noms.
    id: "cahier-maths",
    titre: "Cahier de vacances de maths",
    promesse: "Vingt-cinq défis « un dessin, une question », corrigés, à imprimer.",
    url: "/cahier-vacances/maths",
    // ⭐ « prof » AUSSI (Frédéric, 08/08) — même correction que pour
    // « Les maths en vrai ». C'est la version COLLÈGE des défis Picto, et
    // l'enseignant est son premier public : un dessin projeté, une question,
    // pas une ligne à lire. Il était le seul à ne pas la voir.
    niveaux: ["cm2", "6e", "5e", "4e", "3e", "prof"],
    matiere: "maths",
    // « picto » nommé ici aussi : un prof qui a vu les défis au primaire les
    // cherche sous ce nom-là, et tombait alors sur la version CP→CM2.
    notions: ["cahiers", "picto", "calcul", "geometrie", "grandeurs", "*"],
    intentions: ["preparer", "entrainer", "decouvrir", "enseigner"],
    type: "cahier",
    resultat: "corrige",
    famille: "picto",
    statut: "validee",
  },
  {
    id: "concours-avenir",
    titre: "Concours Avenir",
    promesse: "Dix épreuves blanches, sans jamais deux fois la même question.",
    url: "/concours-avenir",
    niveaux: ["terminale"],
    matiere: "maths",
    // ⭐ « concours » EXPLICITEMENT (07/08). Avec `["*"]` seul, elle sortait
    // comme n'importe quelle ressource générique de Terminale ; taper
    // « concours avenir » ne la faisait pas remonter d'un rang. Nommer la
    // notion lui donne les 5 points du moteur — elle passe alors devant le
    // coach, ce qui est exactement ce qu'on veut quand on l'a appelée par son
    // nom.
    notions: ["concours", "*"],
    intentions: ["preparer"],
    type: "evaluation",
    resultat: "score",
    statut: "validee",
  },
  {
    // ⭐ MANQUAIT À L'INVENTAIRE (ajoutée le 07/08). La page existe en
    // production depuis des mois — Frédéric : « tu as même concours général ! »
    // — et aucun élève ne pouvait la trouver depuis l'entrée.
    // ⚠️ C'est une préparation COLLÈGE, pas le concours général du lycée :
    // `app/concours-general/ConcoursGeneralClient.tsx` déclare
    // `niveaux = ["6e","5e","4e","3e"]`. Le nom prête à confusion, le dossier
    // fait foi.
    id: "concours-general",
    titre: "Concours général — collège",
    promesse: "Vingt défis pour chercher, visualiser et expliquer, comme aux olympiades.",
    url: "/concours-general",
    niveaux: ["6e", "5e", "4e", "3e"],
    matiere: "maths",
    notions: ["concours", "*"],
    // « decouvrir » aussi : on n'y va pas seulement pour préparer une échéance,
    // on y va parce que ce sont des maths qui ne ressemblent pas au cours.
    intentions: ["preparer", "decouvrir", "entrainer"],
    type: "defi",
    resultat: "score",
    statut: "validee",
  },

  // ── Comprendre une notion ──────────────────────────────────────────────
  //
  // ⏳ L'AUDIT DU 16/08/2026 A TROUVÉ TROIS NIVEAUX DE FICHES EN LIGNE ET NON
  // DÉCLARÉS — CM2, 5ᵉ, 4ᵉ — plus les fiches d'IA (`app/fiches-cours/ia`). Je
  // les avais ajoutées ; Frédéric les a retirées le jour même : « fiches de
  // cours pas complète, c'est un autre chantier auquel je réfléchis ».
  //
  // 🔑 Et c'est la bonne décision, pour la raison qui gouverne tout ce fichier :
  // une ressource déclarée est une ressource PROMISE. Une collection à moitié
  // écrite tient la promesse au hasard des notions — l'élève qui tombe sur le
  // trou n'en conclut pas que la fiche manque, il en conclut que le site ment.
  // ⛔ NE PAS LES REMETTRE avant que le chantier des fiches soit tranché.
  {
    id: "fiches-maths-6e",
    titre: "Fiches de cours — maths 6e",
    promesse: "La notion expliquée court, avec un exemple.",
    url: "/fiches-cours/maths/6e",
    niveaux: ["6e"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["comprendre"],
    type: "fiche",
    statut: "validee",
  },
  {
    id: "fiches-maths-3e",
    titre: "Fiches de cours — maths 3e",
    promesse: "La notion expliquée court, avec un exemple.",
    url: "/fiches-cours/maths/3e",
    niveaux: ["3e"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["comprendre"],
    type: "fiche",
    statut: "validee",
  },
  {
    id: "fiches-maths-premiere",
    titre: "Fiches de cours — maths Première spé",
    promesse: "La notion expliquée court, avec un exemple.",
    url: "/fiches-cours/maths/premiere-spe",
    niveaux: ["premiere"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["comprendre"],
    type: "fiche",
    statut: "validee",
  },
  {
    id: "dico",
    titre: "Le dico des mots et des gestes",
    promesse: "Le mot de la consigne qu'on n'a pas compris.",
    url: "/dico",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e"],
    notions: ["vocabulaire"],
    intentions: ["comprendre"],
    type: "fiche",
    statut: "validee",
  },

  // ── Découvrir ──────────────────────────────────────────────────────────
  {
    id: "picto-maths",
    titre: "Picto maths — 974",
    promesse: "Vingt-cinq défis en images, sans une ligne à lire.",
    url: "/picto-maths",
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2"],
    matiere: "maths",
    notions: ["picto", "calcul", "geometrie", "grandeurs"],
    intentions: ["decouvrir", "entrainer"],
    type: "defi",
    resultat: "corrige",
    // Les mêmes vingt-cinq défis que « Cahier de vacances de maths ».
    famille: "picto",
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  {
    id: "maths-974",
    titre: "Les maths en vrai — 974",
    promesse: "Là où les maths sortent dehors, sur l'île.",
    url: "/maths-974",
    // ⭐ « prof » AUSSI (Frédéric, 06/08) : c'est la ressource qu'un enseignant
    // cherche pour accrocher une séance au réel. Elle n'était proposée qu'aux
    // élèves — le premier public à qui elle sert était le seul à ne pas la voir.
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["decouvrir", "enseigner"],
    type: "video",
    statut: "validee",
  },
  {
    // Les vidéos par notion sont encore peu nombreuses : plutôt que d'en
    // inventorier trois et de faire croire à une bibliothèque, on renvoie à la
    // chaîne. Le jour où il y en aura assez, elles entreront une par une.
    id: "chaine-youtube",
    titre: "Les vidéos d'EleveAI",
    promesse: "Les maths de l'île en images, sur la chaîne.",
    url: "https://www.youtube.com/@eleveai974",
    externe: true,
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof", "parent"],
    matiere: "maths",
    notions: ["videos", "*"],
    intentions: ["decouvrir", "comprendre"],
    type: "video",
    statut: "validee",
  },
  {
    id: "carte-974",
    titre: "La carte des maths de l'île",
    promesse: "Chaque endroit de l'île a son calcul.",
    url: "/carte",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["decouvrir", "enseigner"],
    type: "defi",
    statut: "validee",
  },

  // ── Les machines ───────────────────────────────────────────────────────
  // Elles ne sortent QUE si on demande à découvrir, expérimenter ou
  // comprendre en profondeur. Depuis l'accueil-catalogue, elles ne servaient
  // presque jamais : ce n'était pas leur qualité qui manquait, c'était le
  // moment. Un prof qui prépare une séance en est le meilleur client.
  ...([
    ["lagon", "Le lagon de l'Ermitage", "Le lagon en chiffres, entre tes mains.", ["proportionnalite", "statistiques", "grandeurs"]],
    ["cyclone", "Le simulateur de cyclone", "Un cyclone, et ce qu'il faut savoir compter avant.", ["proportionnalite", "statistiques", "grandeurs"]],
    ["volcan", "La machine de la Fournaise", "Le volcan en chiffres, à faire varier soi-même.", ["proportionnalite", "grandeurs", "statistiques"]],
    ["barrage", "Le barrage", "L'eau qu'on retient, et ce qu'elle produit.", ["proportionnalite", "grandeurs", "fonctions"]],
    ["energie", "L'énergie de l'effort", "Ce que ton corps dépense, en vrai.", ["proportionnalite", "grandeurs", "fonctions"]],
    ["sucre", "Le sucre de la canne", "De la canne au sucre, en proportions.", ["proportionnalite", "grandeurs"]],
    ["fromage", "La fromagerie", "Du lait au fromage, tout est affaire de rapport.", ["proportionnalite", "grandeurs"]],
    // ⭐ L'HÔTEL MANQUAIT (15/08/2026). Né le 05/08 d'une rencontre à
    // Terre-Sainte, il avait sa page, son adresse courte /hotel et sa carte
    // dans /simulateurs — mais aucune entrée ici. « Dis-nous ce que tu
    // cherches » ne pouvait donc PAS le proposer, à personne, jamais.
    ["hotel", "L'hôtel Le Terre Sainte", "La vraie grille d'un hôtel de Saint-Pierre, saison par saison.", ["proportionnalite", "statistiques", "grandeurs"]],
    ["epsilon", "La machine des epsilons", "Des epsilons qui finissent par engendrer des infinis.", ["suites", "fonctions"]],
  ] as const).map(([slug, titre, promesse, notions]): RessourceEleveAI => ({
    id: `simulateur-${slug}`,
    titre,
    promesse,
    url: `/simulateur-${slug}`,
    niveaux: ["cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof"],
    matiere: "maths",
    notions: [...notions, "machines"],
    intentions: ["decouvrir", "comprendre", "enseigner"],
    type: "machine",
    // Elles ne s'invitent pas : il faut avoir demandé à découvrir, à
    // manipuler, ou nommé une machine. Sinon un lycéen qui vient de dire son
    // niveau ouvrait sur « la machine des epsilons ».
    surDemande: true,
    // Une seule machine par réponse : les huit sont interchangeables du point
    // de vue de qui cherche, et trois simulateurs d'affilée valent moins
    // qu'une machine + le réel + la chaîne.
    famille: "machines",
    statut: "validee",
  })),

  // ── Les machines DU CÔTÉ MATHS ─────────────────────────────────────────
  // Même famille que les précédentes — ce sont des machines à régler — mais
  // le sujet n'est plus l'île, c'est la notion elle-même. Elles vivaient au
  // catalogue /simulateurs sans exister ici : six machines écrites, en ligne,
  // indexées, et introuvables par la seule porte qui sait à qui les proposer.
  //
  // ⚠️ LES NIVEAUX SONT DANS LE TUPLE, contrairement aux machines du réel qui
  // les partagent. Une équation différentielle ne se propose pas à un CM2 ;
  // le lagon, si. C'est toute la différence entre les deux familles.
  ...([
    ["loi-normale", "La courbe en cloche", "La planche de Galton, et la cloche qui apparaît toute seule.", ["statistiques", "probabilites"], ["premiere", "terminale", "prof"]],
    ["exponentielle", "L'exponentielle en miroir", "Celle qui monte, et la courbe de l'oubli qui descend.", ["exponentielle", "fonctions", "suites"], ["premiere", "terminale", "prof"]],
    ["loi-pareto", "Le but qui sort de la moyenne", "Là où naissent les records, loin de la moyenne.", ["statistiques", "probabilites"], ["premiere", "terminale", "prof"]],
    ["diagonale-des-fous", "La Diagonale des Fous", "La réserve du coureur qui se vide, au carré de l'effort.", ["fonctions", "derivees"], ["terminale", "prof"]],
    ["aiguille-de-kakeya", "L'aiguille de Kakeya", "Le demi-tour le plus économe — médaille Fields 2026.", ["geometrie"], ["seconde", "premiere", "terminale", "prof"]],
    ["dimension-du-volcan", "La dimension du volcan", "La rugosité du rempart de la Fournaise, mesurée par un nombre.", ["geometrie", "grandeurs"], ["seconde", "premiere", "terminale", "prof"]],
  ] as const).map(([slug, titre, promesse, notions, niveaux]): RessourceEleveAI => ({
    id: slug,
    titre,
    promesse,
    url: `/${slug}`,
    niveaux: [...niveaux],
    matiere: "maths",
    notions: [...notions, "machines"],
    intentions: ["decouvrir", "comprendre", "enseigner"],
    type: "machine",
    surDemande: true,
    famille: "machines",
    statut: "validee",
  })),
  {
    id: "loi-performance",
    titre: "La loi de la performance",
    promesse: "Un neurone qui décide, expliqué du CP à la Terminale.",
    url: "/loi-performance",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "maths",
    notions: ["fonctions", "statistiques", "ia"],
    intentions: ["decouvrir", "comprendre"],
    type: "machine",
    statut: "validee",
  },
  {
    id: "bulles",
    titre: "Pourquoi les bulles sont rondes",
    promesse: "Une question d'enfant, une réponse de mathématicienne.",
    url: "/pourquoi-les-bulles-sont-rondes",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "maths",
    notions: ["geometrie", "grandeurs"],
    intentions: ["decouvrir"],
    type: "machine",
    statut: "validee",
  },
  {
    // La porte vers TOUTES les machines. Elle n'a pas de famille : elle sort
    // donc À CÔTÉ d'une machine, pas à sa place — on montre une machine, et
    // on dit où sont les autres.
    id: "toutes-les-machines",
    titre: "Toutes les machines",
    promesse: "Le lagon, le volcan, la canne, le barrage : à régler soi-même.",
    url: "/simulateurs",
    niveaux: ["cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof"],
    matiere: "maths",
    notions: ["machines", "*"],
    intentions: ["decouvrir", "comprendre", "enseigner"],
    type: "machine",
    surDemande: true,
    statut: "validee",
  },
  {
    id: "explorer",
    titre: "Explorer",
    promesse: "Tout ce qu'il y a à voir, quand on ne sait pas quoi chercher.",
    url: "/explorer",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    notions: ["*"],
    intentions: ["decouvrir"],
    type: "page",
    statut: "validee",
  },

  // ── Les adultes ────────────────────────────────────────────────────────
  {
    id: "espace-parents",
    titre: "L'espace parents",
    promesse: "Ce que fait votre enfant, et comment l'accompagner.",
    url: "/espace-parents",
    niveaux: ["parent"],
    notions: ["*"],
    intentions: ["suivre", "comprendre"],
    type: "page",
    statut: "validee",
  },
  {
    // ⭐ POUR LE PARENT (Frédéric, 12/08 : « essentielle pour aider son
    // enfant », puis « lorsque son fils prend mal son cours, ça peut vraiment
    // l'aider »). Il a le cahier sous les yeux le soir, il ne comprend pas
    // toujours la leçon, et il ne peut pas inventer des exercices dessus.
    //
    // ⚠️ LA PROMESSE NE DIT PAS QU'ON RÉPARE UN COURS MAL PRIS, et c'est
    // volontaire. Jeanne (SVT) et les élèves de Frédéric disent la même chose
    // le même jour : ils prennent mal le cours. Mais la machine lit ce qui est
    // écrit — elle ne devine pas la moitié qui manque. Tant qu'elle ne sait
    // pas SIGNALER les trous (chantier du 13/08), la carte promet ce qu'elle
    // tient : des exercices sur la page telle qu'elle est.
    //
    // ⚠️ `validee` et pas `testee_eleves` : le bandeau de la carte se décide
    // là-dessus et dirait « testée en classe » pour une fonction née ce
    // matin. Elle porte « vérifiée » — c'est vrai, et c'est tout ce qu'on peut
    // en dire. On changera le jour où une classe s'en sera servie.
    //
    // ⚠️ Sa place en TROISIÈME ne vient pas du score : elle est écrite dans
    // PORTES_PARENT plus bas. Sans ça, le calcul rapide la doublait (+1 pour
    // `testee_eleves`).
    //
    // ⭐ ET L'ÉLÈVE, DÈS LA 6ᵉ (Frédéric, 12/08, après Jeanne — prof de SVT —
    // et ses propres élèves : « ils prennent mal le cours et veulent réviser
    // avec une photo de leur page »). Pas avant : au primaire le cours tient
    // en quatre lignes au tableau, et ce qui sort d'ici est écrit pour un
    // adulte.
    //
    // ⛔ PAS pour le prof : chez lui la chip de la matrice suffit, et Frédéric
    // a explicitement écarté la carte le 12/08 (« on touche à rien, c'est dans
    // les chips »).
    id: "photo-cours",
    titre: "Photographier un cours",
    promesse: "Photographiez la page du cahier : elle devient des exercices à faire ensemble.",
    url: "/photo-cours",
    niveaux: ["6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "parent"],
    matiere: "transversal",
    notions: ["*"],
    intentions: ["comprendre", "entrainer", "preparer"],
    type: "machine",
    statut: "validee",
    icone: "camera",
  },
  {
    id: "cahier-aider",
    titre: "Aider mon enfant",
    promesse: "Des activités à faire ensemble, sans être prof.",
    url: "/cahier-vacances/aider-mon-enfant",
    niveaux: ["parent"],
    notions: ["*"],
    intentions: ["comprendre", "entrainer"],
    type: "cahier",
    resultat: "corrige",
    statut: "validee",
  },
  {
    id: "dashboard-prof",
    titre: "Le tableau de bord de la classe",
    promesse: "Qui a travaillé, sur quoi, et où ça coince.",
    url: "/dashboard-prof",
    niveaux: ["prof"],
    notions: ["*"],
    // « suivre » SEULEMENT (06/08). Avec « enseigner », il sortait en tête sur
    // « une activité pour ma classe » — un prof qui prépare sa séance ne
    // demande pas son tableau de bord. Il le demandera en disant « où en sont
    // mes élèves », et là il sera premier.
    // ⏳ Le chantier du dashboard prof est en cours ; il y suivra les notes de
    // coach et de parcours, matière par matière.
    intentions: ["suivre"],
    type: "suivi",
    resultat: "progression",
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  {
    id: "programme-seo",
    titre: "Les programmes, classe par classe",
    promesse: "Ce qui est au programme, et ce qu'on a pour l'entraîner.",
    url: "/programme/6e",
    niveaux: ["prof", "parent"],
    notions: ["*"],
    intentions: ["enseigner", "comprendre"],
    type: "page",
    statut: "validee",
  },
  // ⚠️ L'ORDRE COMPTE POUR LA DIRECTION : à score égal, le moteur garde l'ordre
  // de ce fichier. L'espace établissement passe donc devant le tableau de bord
  // (Frédéric, 05/08) — un chef d'établissement qui arrive veut d'abord savoir
  // ce que c'est, comment ça se déploie et ce que ça coûte ; le suivi vient
  // après, quand ses classes sont inscrites.
  {
    id: "espace-ecoles",
    titre: "L'espace établissement",
    promesse: "Financement, RGPD, déploiement : tout ce qu'il faut avant de dire oui.",
    url: "/espace-ecoles",
    niveaux: ["direction"],
    notions: ["*"],
    intentions: ["suivre", "enseigner", "comprendre"],
    type: "page",
    statut: "validee",
  },
  {
    // Ce qui l'intéresse vraiment (Frédéric, 03/08) : il est jugé là-dessus.
    id: "eval-nationales-hub",
    titre: "Les évaluations nationales",
    promesse: "Ce sur quoi l'établissement est attendu, et de quoi s'y préparer.",
    url: "/evaluation-nationale-college",
    niveaux: ["direction", "prof", "parent"],
    notions: ["*"],
    intentions: ["preparer", "suivre", "enseigner", "comprendre"],
    type: "evaluation",
    resultat: "score",
    statut: "validee",
  },
  {
    id: "dashboard-principal",
    titre: "Le tableau de bord de l'établissement",
    promesse: "L'activité de l'établissement, en un écran.",
    url: "/dashboard-principal",
    niveaux: ["direction"],
    notions: ["*"],
    intentions: ["suivre"],
    type: "suivi",
    resultat: "progression",
    statut: "validee",
  },
];
