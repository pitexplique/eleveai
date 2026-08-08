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
import type { RessourceEleveAI, StatutRessource } from "./types";

/** Le statut d'une ressource qu'on vient d'ajouter. Ne PAS le changer. */
export const STATUT_PAR_DEFAUT: StatutRessource = "a_verifier";

/** Les seuls statuts que le moteur accepte de recommander. */
export const STATUTS_PUBLIABLES: StatutRessource[] = ["validee", "testee_eleves"];

export const RESSOURCES: RessourceEleveAI[] = [
  // ── Le coach ───────────────────────────────────────────────────────────
  {
    id: "coach-maths",
    titre: "Le coach maths",
    promesse: "Une question à la fois, corrigée, avec l'explication quand tu te trompes.",
    url: "/coach-ia/maths",
    // ⭐ « prof » AJOUTE LE 08/08. Un enseignant ne voyait NI le coach NI les
    // parcours : les deux ressources qui gardent une trace du travail des
    // eleves etaient invisibles a celui qui les leur donne. C'est exactement
    // la demande « trouver une ressource utilisable par mes eleves, avec un
    // resultat a la cle » (point 12 de la refonte).
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof"],
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
    promesse: "Du A1 au B2, à ton rythme.",
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
    promesse: "Du A1 au B2, à ton rythme.",
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
    niveaux: ["4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "ia",
    notions: ["ia"],
    intentions: ["comprendre", "decouvrir"],
    type: "coach",
    resultat: "progression",
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
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e"],
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
    niveaux: ["4e", "3e", "seconde", "premiere", "terminale"],
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
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "francais",
    notions: ["orthographe"],
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
    promesse: "Le mot que tu n'as pas compris dans la consigne.",
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
    promesse: "Tout ce qu'il y a à voir, quand tu ne sais pas quoi chercher.",
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
