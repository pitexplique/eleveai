// lib/tutor-v4/questionBank/cm2/maths/probleme.bank.ts
//
// Les PROBLÈMES du CM2 : cinq micros, sans vidéo (vocabulaire du cycle 3 :
// « chercher ce qu'on demande », « choisir l'opération », « phrase-réponse »,
// « les étapes », « vérifier que le résultat est cohérent »).
//
// ⭐ 14/11/2026 — GÉNÉRATEURS ET DESSINS, sur le modèle tout frais du CM1
// (`cm1/maths/problemes.bank.ts`). Avant : 4 à 9 squelettes par micro, 13 à 19
// répétitions sur 20 ; une phrase par gabarit (« Maya a … autocollants »), des
// QCM « oui / non », des questions ouvertes (retirées par
// `applyMathsKeyboardFree`). Maintenant : chaque gabarit tire une SITUATION
// (stade, musée, usine, youtubeuse, factrice, cheffe de cantine, électricien,
// couturière, randonneuse…) × une TOURNURE × des nombres de CM2 (grands
// nombres, prix et mesures décimales, quotients décimaux, durées), et la
// plupart posent leur figure : `schema_barre` (« ? » à la place de ce qu'on
// cherche), `calcul_pose`, `monnaie`, `duree` (frise, horloges).
// Les situations, les nombres et les fabricants sont dans `probleme-outils.ts`.
// ⛔ CM2 = zéro clavier : que des QCM (3 ou 4 choix), leurres = vraies erreurs.
// ⛔ Division : « ÷ ». Soustraction : « − ».

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  ARTICLES, AUTRE_UNITE, COLLECTIONS, ETAPES_3, ETAPES_4, GROUPES, LIEUX, OP_NOM,
  argent, au, barre, cap, choixN, de, deuxArticles, dessin, duree, egales, entre, etapesFrise, eu, exp, F, fr,
  frise, heure, melange, nk, pb, pbDureeEcart, pbDureeFin, pbEcart, pbFois, pbPartage, pbPartageDec,
  pbReste, pbTotal, pbComplement, pbGroupement, pbFoisDec, peut, pose, prenom, prix, Q, qcm, que, r2, tirer, un,
  type Pb, type Pb2,
} from "./probleme-outils";

type Gen = TutorGeneratedQuestionV4;

/* ───────────────────────── Les fabricants ───────────────────────── */

const atelier =
  (micro: string) =>
  (suffixe: string, difficulty: DifficultyLevel, hint: string, generate: () => Gen): TutorBankItemV4 => ({
    kind: "template",
    id: `cm2_probleme_${micro}_tpl_${suffixe}`,
    niveau: "cm2",
    matiere: "maths",
    notionId: "probleme",
    microId: `probleme_${micro}`,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "probleme", micro, "template"],
    generate,
  });

type Fixe = Omit<Extract<TutorBankItemV4, { kind: "fixed" }>, "kind" | "niveau" | "matiere" | "notionId" | "theme">;
const fixe = (f: Fixe): TutorBankItemV4 => ({ kind: "fixed", niveau: "cm2", matiere: "maths", notionId: "probleme", theme: "neutral", ...f });

const DEF_UN = "Un problème à une étape se résout avec un seul calcul.";
const DEF_DEUX = "Un problème à plusieurs étapes demande plusieurs calculs, dans le bon ordre.";

/* =========================================================
   PROBLEME_CHOISIR_OPERATION
========================================================= */
const CH = atelier("choisir_operation");
const Q_CALC = ["Quel calcul permet de répondre ?", "Quel calcul faut-il faire ?", "Choisis le bon calcul.", "Quel calcul écris-tu pour trouver la réponse ?", "Quel calcul donne la réponse ?"];
const Q_OP = ["Quelle opération faut-il faire ?", "Quelle opération choisis-tu ?", "Pour répondre, quelle opération faut-il ?"];

function choisirCalcul(p: Pb): Gen {
  return {
    text: `${p.enonce} ${p.question} ${un(Q_CALC)}`,
    ...qcm(p.calc, p.calcFaux),
    explanation: exp("Pour choisir l'opération, on se demande d'abord ce que l'on cherche.", p.methode, `${p.calc} = ${F(p.rep, p.u)}.`, `Le bon calcul est ${p.calc}.`),
    ...dessin(p.canvas),
  };
}
function choisirOperation(p: Pb): Gen {
  return {
    text: `${p.enonce} ${p.question} ${un(Q_OP)}`,
    ...qcm(OP_NOM[p.s], Object.values(OP_NOM)),
    explanation: exp("Pour choisir l'opération, on se demande d'abord ce que l'on cherche.", p.methode, `${p.calc} = ${F(p.rep, p.u)}.`, `Il faut faire ${OP_NOM[p.s]}.`),
    ...dessin(p.canvas, 0.7),
  };
}

const choisirItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_probleme_choisir_operation_fixed_1_addition",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    text: "Lina a 24 billes. Son ami lui donne 13 billes. Quelle opération permet de trouver combien de billes Lina a maintenant ?",
    format: "qcm",
    choices: ["24 + 13", "24 − 13", "24 × 13", "24 ÷ 13"],
    expected: ["24 + 13"],
    comparator: "mcq_exact",
    hint: "On ajoute des billes.",
    explanation: exp("Choisir l'opération, c'est comprendre ce que raconte le problème.", "Quand on reçoit une quantité, on l'ajoute : c'est une addition.", "24 + 13 = 37.", "L'opération correcte est 24 + 13."),
    tags: ["cm2", "probleme", "choisir_operation", "addition", "qcm"],
  }),
  fixe({
    id: "cm2_probleme_choisir_operation_fixed_2_soustraction",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    text: "Noé a 58 cartes. Il en donne 17. Quelle opération permet de trouver combien de cartes il lui reste ?",
    format: "qcm",
    choices: ["58 − 17", "58 + 17", "58 × 17", "58 ÷ 17"],
    expected: ["58 − 17"],
    comparator: "mcq_exact",
    hint: "Il donne des cartes : il en a moins après.",
    explanation: exp("Choisir l'opération, c'est repérer l'action du problème.", "Quand on donne une quantité, on l'enlève : c'est une soustraction.", "58 − 17 = 41.", "L'opération correcte est 58 − 17."),
    tags: ["cm2", "probleme", "choisir_operation", "soustraction", "qcm"],
  }),
  fixe({
    id: "cm2_probleme_choisir_operation_fixed_3_multiplication",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    text: "Une boîte contient 6 crayons. On a 8 boîtes identiques. Quelle opération permet de trouver le nombre total de crayons ?",
    format: "qcm",
    choices: ["6 × 8", "6 + 8", "8 − 6", "8 ÷ 6"],
    expected: ["6 × 8"],
    comparator: "mcq_exact",
    hint: "Il y a plusieurs groupes identiques.",
    explanation: exp("Des groupes égaux se comptent avec une multiplication.", "8 boîtes de 6 crayons : 6 répété 8 fois.", "6 × 8 = 48.", "L'opération correcte est 6 × 8."),
    tags: ["cm2", "probleme", "choisir_operation", "multiplication", "qcm"],
  }),
  fixe({
    id: "cm2_probleme_choisir_operation_fixed_4_division",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    text: "On partage 36 bonbons entre 4 enfants. Quelle opération permet de trouver combien de bonbons reçoit chaque enfant ?",
    format: "qcm",
    choices: ["36 ÷ 4", "36 × 4", "36 + 4", "36 − 4"],
    expected: ["36 ÷ 4"],
    comparator: "mcq_exact",
    hint: "On partage en parts égales.",
    explanation: exp("La division sert à partager en parts égales.", "On repère la quantité totale et le nombre de parts.", "36 ÷ 4 = 9.", "L'opération correcte est 36 ÷ 4."),
    tags: ["cm2", "probleme", "choisir_operation", "division", "qcm"],
  }),
  CH("g01_total", 1, "On réunit deux quantités : c'est un total.", () => choisirCalcul(pbTotal(1))),
  CH("g02_reste", 1, "On enlève une partie : que reste-t-il ?", () => choisirCalcul(pbReste(1))),
  CH("g03_groupes", 1, "Des groupes égaux : le même nombre plusieurs fois.", () => choisirCalcul(pbFois(1))),
  CH("g04_partage", 1, "On partage en parts égales.", () => choisirCalcul(pbPartage(1))),
  CH("g05_nom_quatre", 1, "Cherche-t-on un total, un reste, des groupes égaux ou un partage ?", () => choisirOperation(pb(["total", "reste", "fois", "partage"], 1))),
  CH("g06_ecart", 2, "« De plus » ne veut pas toujours dire addition : on compare.", () => choisirCalcul(pbEcart(2))),
  CH("g07_complement", 2, "Combien manque-t-il pour arriver à l'objectif ?", () => choisirCalcul(pbComplement(2))),
  CH("g08_groupement", 2, "Combien de groupes de même taille peut-on faire ?", () => choisirCalcul(pbGroupement(2))),
  CH("g09_comparer", 2, "« Fois plus » : on multiplie. « De plus que » : qui en a le plus ?", () => choisirCalcul(pb(["foisPlus", "plusQue"], 2))),
  CH("g10_prix", 2, "Des prix : on ajoute, on rend la monnaie, on répète un prix ou on le partage ?", () => choisirCalcul(pb(["prixTotal", "rendu", "foisDec", "partageDec"], 2))),
  CH("g11_mesures", 2, "Réunit-on deux mesures ou les compare-t-on ?", () => choisirCalcul(pb(["mesureTotal", "mesureEcart"], 2))),
  CH("g12_nom_pieges", 2, "Lis bien la question : comparer, compléter, grouper, partager ?", () => choisirOperation(pb(["ecart", "complement", "groupement", "partageDec", "foisDec", "rendu"], 2))),
];

/* =========================================================
   PROBLEME_UNE_ETAPE
========================================================= */
const UN1 = atelier("une_etape");
function resoudre(p: Pb): Gen {
  return {
    text: `${p.enonce} ${p.question}`,
    ...choixN(p.rep, p.faux, p.u, p.extra),
    explanation: exp(DEF_UN, p.methode, `${p.calc} = ${F(p.rep, p.u)}.`, p.phrase(Q(p.rep, p.u))),
    ...dessin(p.canvas),
  };
}

const uneEtapeItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_probleme_une_etape_fixed_1_addition",
    microId: "probleme_une_etape",
    difficulty: 1,
    text: "Dans une bibliothèque, il y a 128 livres sur une étagère et 74 livres sur une autre. Combien y a-t-il de livres au total ?",
    format: "qcm",
    choices: ["202 livres", "192 livres", "54 livres", "212 livres"],
    expected: ["202 livres"],
    comparator: "mcq_exact",
    hint: "On réunit les deux étagères : on additionne.",
    explanation: exp(DEF_UN, "On réunit deux quantités : on additionne.", "128 + 74 = 202.", "Il y a 202 livres au total."),
    tags: ["cm2", "probleme", "une_etape", "addition", "qcm"],
  }),
  fixe({
    id: "cm2_probleme_une_etape_fixed_2_soustraction",
    microId: "probleme_une_etape",
    difficulty: 1,
    text: "Un bus transporte 56 élèves. 18 élèves descendent. Combien reste-t-il d'élèves dans le bus ?",
    format: "qcm",
    choices: ["38 élèves", "74 élèves", "48 élèves", "42 élèves"],
    expected: ["38 élèves"],
    comparator: "mcq_exact",
    hint: "Des élèves descendent : il en reste moins.",
    explanation: exp(DEF_UN, "On enlève les élèves qui descendent : on soustrait.", "56 − 18 = 38.", "Il reste 38 élèves dans le bus."),
    tags: ["cm2", "probleme", "une_etape", "soustraction", "qcm"],
  }),
  fixe({
    id: "cm2_probleme_une_etape_fixed_3_multiplication",
    microId: "probleme_une_etape",
    difficulty: 2,
    text: "Une classe reçoit 7 paquets de 12 cahiers. Combien de cahiers reçoit-elle ?",
    format: "qcm",
    choices: ["84 cahiers", "19 cahiers", "72 cahiers", "96 cahiers"],
    expected: ["84 cahiers"],
    comparator: "mcq_exact",
    hint: "7 paquets identiques de 12 : on multiplie.",
    explanation: exp(DEF_UN, "Des groupes égaux : on multiplie.", "7 × 12 = 84.", "La classe reçoit 84 cahiers."),
    tags: ["cm2", "probleme", "une_etape", "multiplication", "qcm"],
  }),
  fixe({
    id: "cm2_probleme_une_etape_fixed_4_division",
    microId: "probleme_une_etape",
    difficulty: 2,
    text: "On partage 72 cartes en 8 paquets identiques. Combien y a-t-il de cartes par paquet ?",
    format: "qcm",
    choices: ["9 cartes", "8 cartes", "64 cartes", "80 cartes"],
    expected: ["9 cartes"],
    comparator: "mcq_exact",
    hint: "On partage en parts égales : on divise.",
    explanation: exp(DEF_UN, "On partage en 8 parts égales : on divise.", "72 ÷ 8 = 9.", "Il y a 9 cartes par paquet."),
    tags: ["cm2", "probleme", "une_etape", "division", "qcm"],
  }),
  fixe({
    id: "cm2_probleme_une_etape_fixed_5_erreur_operation",
    microId: "probleme_une_etape",
    difficulty: 3,
    text: "Un élève lit : « On partage 40 images entre 5 élèves. » Il calcule 40 × 5 = 200. Qu'en penses-tu ?",
    format: "qcm",
    choices: ["Il se trompe : il fallait calculer 40 ÷ 5.", "Il a raison : chaque élève a 200 images.", "Il se trompe : il fallait calculer 40 − 5.", "Il se trompe : il fallait calculer 40 + 5."],
    expected: ["Il se trompe : il fallait calculer 40 ÷ 5."],
    comparator: "mcq_exact",
    hint: "Partager en parts égales, c'est diviser.",
    explanation: exp(DEF_UN, "On partage : chaque élève a une part. Une part est plus petite que le tout.", "40 ÷ 5 = 8.", "Chaque élève reçoit 8 images ; 200 est impossible."),
    tags: ["cm2", "probleme", "une_etape", "erreur", "qcm"],
  }),
  UN1("g01_total", 1, "On réunit deux quantités : on additionne.", () => resoudre(pbTotal(1))),
  UN1("g02_reste", 1, "On enlève une partie : on soustrait.", () => resoudre(pbReste(1))),
  UN1("g03_groupes", 1, "Des groupes égaux : on multiplie.", () => resoudre(pbFois(1))),
  UN1("g04_partage", 1, "On partage en parts égales : on divise.", () => resoudre(pbPartage(1))),
  UN1("g05_grands_nombres", 2, "Ajoute-t-on ou enlève-t-on ? Pose le calcul en alignant les chiffres.", () => resoudre(pb(["total", "reste"], 2))),
  UN1("g06_prix", 2, "Virgule sous virgule : les euros avec les euros, les centimes avec les centimes.", () => resoudre(pb(["prixTotal", "rendu"], 2))),
  UN1("g07_prix_fois", 2, "Le même prix plusieurs fois : on multiplie le décimal.", () => resoudre(pbFoisDec(2))),
  UN1("g08_partage_decimal", 2, "Quand il reste quelque chose, on continue la division après la virgule.", () => resoudre(pbPartageDec(2))),
  UN1("g09_mesures", 2, "Virgule sous virgule ; on peut ajouter des zéros (8,5 = 8,50).", () => resoudre(pb(["mesureTotal", "mesureEcart"], 2))),
  UN1("g10_ecart", 3, "On compare : l'écart est une soustraction.", () => resoudre(pbEcart(3))),
  UN1("g11_complement", 3, "Ce qui manque = l'objectif moins ce qui est déjà fait.", () => resoudre(pbComplement(3))),
  UN1("g12_groupement", 3, "Combien de fois le groupe tient-il dans le total ? On divise.", () => resoudre(pbGroupement(3))),
  UN1("g13_comparer", 3, "« fois plus » : on multiplie ; « de plus que » : qui en a le plus ?", () => resoudre(pb(["foisPlus", "plusQue"], 3))),
  UN1("g14_heure_fin", 3, "Ajoute les heures, puis les minutes : 60 min = 1 h.", () => resoudre(pbDureeFin())),
  UN1("g15_duree", 3, "Avance jusqu'à l'heure pile, puis heure par heure.", () => resoudre(pbDureeEcart())),
];

/* =========================================================
   PROBLEME_PLUSIEURS_ETAPES
========================================================= */
const PL = atelier("plusieurs_etapes");
function resoudre2(p: Pb2): Gen {
  return {
    text: `${p.enonce} ${p.question}`,
    ...choixN(p.rep, p.faux, p.u, p.extra),
    explanation: exp(DEF_DEUX, "On cherche d'abord ce qu'on ne connaît pas encore, puis on répond à la question.", p.etapes, p.phrase(Q(p.rep, p.u))),
    ...dessin(p.canvas, 0.85),
  };
}
const Q_PREMIER = ["Quel calcul faut-il faire en premier ?", "Par quel calcul commencer ?", "Quelle est la première étape ?"];
function premierCalcul(p: Pb2): Gen {
  // Le dessin qui écrit déjà le premier calcul (« 6 × 24 ») donnerait la réponse.
  const c = p.canvas && !JSON.stringify(p.canvas).includes(p.premier) ? p.canvas : undefined;
  return {
    text: `${p.enonce} ${p.question} ${un(Q_PREMIER)}`,
    ...qcm(p.premier, p.premierFaux),
    explanation: exp(DEF_DEUX, "On commence par trouver la quantité qui manque pour répondre.", p.etapes, `On commence par ${p.premier}.`),
    ...dessin(c, 0.85),
  };
}

const plusieursItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_probleme_plusieurs_etapes_fixed_1_achat",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    text: "Éva achète 3 livres à 8 € chacun et une trousse à 6 €. Combien paie-t-elle au total ?",
    format: "qcm",
    choices: ["30 €", "24 €", "17 €", "42 €"],
    expected: ["30 €"],
    comparator: "mcq_exact",
    hint: "Calcule d'abord le prix des 3 livres.",
    explanation: exp(DEF_DEUX, "D'abord le prix des livres, puis on ajoute la trousse.", "3 × 8 = 24, puis 24 + 6 = 30.", "Éva paie 30 € au total."),
    tags: ["cm2", "probleme", "plusieurs_etapes", "achat", "qcm"],
  }),
  fixe({
    id: "cm2_probleme_plusieurs_etapes_fixed_2_reste",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    text: "Un club commande 5 sacs de 12 ballons. Il donne ensuite 18 ballons à une autre équipe. Combien de ballons lui reste-t-il ?",
    format: "qcm",
    choices: ["42 ballons", "60 ballons", "78 ballons", "30 ballons"],
    expected: ["42 ballons"],
    comparator: "mcq_exact",
    hint: "Calcule d'abord le nombre de ballons commandés.",
    explanation: exp(DEF_DEUX, "D'abord le total des sacs, puis on enlève les ballons donnés.", "5 × 12 = 60, puis 60 − 18 = 42.", "Il reste 42 ballons au club."),
    tags: ["cm2", "probleme", "plusieurs_etapes", "reste", "qcm"],
  }),
  PL("g01_gain_perte", 3, "D'abord ce qu'on a après l'ajout, puis on enlève.", () => resoudre2(ETAPES_3[0](3))),
  PL("g02_deja_plus_groupes", 3, "D'abord les groupes (multiplication), puis on ajoute ce qu'on avait.", () => resoudre2(ETAPES_3[1](3))),
  PL("g03_groupes_moins", 3, "D'abord le total des groupes, puis on enlève.", () => resoudre2(ETAPES_3[2](3))),
  PL("g04_achats", 3, "D'abord le prix des objets identiques, puis on ajoute l'autre achat.", () => resoudre2(ETAPES_3[3](3))),
  PL("g05_rendu", 3, "D'abord le prix à payer, puis ce qu'on rend sur le billet.", () => resoudre2(ETAPES_3[4](3))),
  PL("g06_premier_calcul", 3, "Que faut-il connaître avant de répondre ?", () => premierCalcul(un(ETAPES_3)(3))),
  PL("g07_recu_partage", 4, "D'abord tout réunir, puis partager.", () => resoudre2(ETAPES_4[0](4))),
  PL("g08_deux_groupes", 4, "Deux sortes de groupes : deux multiplications, puis une addition.", () => resoudre2(ETAPES_4[1](4))),
  PL("g09_objectif", 4, "D'abord ce qui est déjà fait, puis ce qui manque.", () => resoudre2(ETAPES_4[2](4))),
  PL("g10_arrivee", 4, "D'abord la durée totale, puis l'heure d'arrivée.", () => resoudre2(ETAPES_4[3](4))),
  PL("g11_prix_unitaire", 4, "D'abord le prix d'UN objet, puis le prix de plusieurs.", () => resoudre2(ETAPES_4[4](4))),
  PL("g12_mesure_reste", 4, "D'abord ce qu'on utilise, puis ce qui reste.", () => resoudre2(ETAPES_4[5](4))),
  PL("g13_premier_calcul", 4, "Que faut-il connaître avant de répondre ?", () => premierCalcul(un(ETAPES_4)(4))),
];

/* =========================================================
   PROBLEME_REDIGER — la phrase-réponse
========================================================= */
const RE = atelier("rediger");
const Q_PHRASE = ["Quelle phrase-réponse convient ?", "Choisis la bonne phrase-réponse.", "Quelle phrase répond bien à la question ?", "Quelle est la phrase-réponse correcte ?"];
const DEF_PHRASE = "Une phrase-réponse reprend la question, donne le bon nombre et son unité.";

function rediger(p: Pb, calculDonne: boolean): Gen {
  const juste = p.phrase(Q(p.rep, p.u));
  const temps = p.u === "h" || p.u === "durée";
  const fauxNb = [...new Set(p.faux.map(r2).filter((v) => v > 0 && v !== r2(p.rep) && (temps ? Number.isInteger(v) : true)))];
  const intro = calculDonne
    ? ` ${un([`Le calcul donne ${p.calc} = ${F(p.rep, p.u)}.`, `On a calculé : ${p.calc} = ${F(p.rep, p.u)}.`, `Le bon calcul est ${p.calc} = ${F(p.rep, p.u)}.`])}`
    : "";
  const sansUnite = temps ? [] : [p.phrase(F(p.rep, p.u))];
  const mauvaise = AUTRE_UNITE[p.u] ? [p.phrase(`${F(p.rep, p.u)} ${AUTRE_UNITE[p.u]}`)] : [];
  const brut = temps ? [] : [F(p.rep, p.u)];
  const autres = melange(fauxNb).slice(0, 2).map((v) => p.phrase(Q(v, p.u)));
  const faux = [...melange([...sansUnite, ...mauvaise, ...brut]).slice(0, 2), ...autres];
  return {
    text: `${p.enonce} ${p.question}${intro} ${un(Q_PHRASE)}`,
    ...qcm(juste, faux),
    explanation: exp(DEF_PHRASE, p.methode, `${p.calc} = ${F(p.rep, p.u)}.`, juste),
    ...dessin(p.canvas, 0.75),
  };
}
function rediger2(p: Pb2): Gen {
  const juste = p.phrase(Q(p.rep, p.u));
  const autres = p.faux.map(r2).filter((v) => v > 0 && v !== r2(p.rep) && v !== r2(p.inter));
  const inter = p.uInter ? [] : [p.phrase(Q(p.inter, p.u))];
  const sans = p.u === "h" ? [] : [p.phrase(F(p.rep, p.u))];
  return {
    text: `${p.enonce} ${p.question} ${un(Q_PHRASE)}`,
    ...qcm(juste, [...inter, ...sans, ...autres.slice(0, 2).map((v) => p.phrase(Q(v, p.u)))].slice(0, 3)),
    explanation: exp(DEF_PHRASE, "La phrase-réponse donne le résultat de la DERNIÈRE étape, pas celui de la première.", p.etapes, juste),
    ...dessin(p.canvas, 0.85),
  };
}

const redigerItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_probleme_rediger_fixed_1_phrase_reponse",
    microId: "probleme_rediger",
    difficulty: 2,
    text: "Quelle réponse est la mieux rédigée pour un problème dont le résultat est 36 élèves ?",
    format: "qcm",
    choices: ["Il y a 36 élèves.", "36", "élèves", "36 + élèves"],
    expected: ["Il y a 36 élèves."],
    comparator: "mcq_exact",
    hint: "Une réponse rédigée est une phrase complète avec l'unité.",
    explanation: exp(DEF_PHRASE, "On reprend le sens du problème et on ajoute l'unité.", "« Il y a 36 élèves. » est une phrase complète.", "La meilleure réponse est : Il y a 36 élèves."),
    tags: ["cm2", "probleme", "rediger", "phrase", "qcm"],
  }),
  fixe({
    id: "cm2_probleme_rediger_fixed_2_unite",
    microId: "probleme_rediger",
    difficulty: 2,
    text: "Dans une réponse de problème, pourquoi faut-il écrire l'unité ?",
    format: "qcm",
    choices: ["pour savoir de quoi on parle", "pour rendre le calcul plus long", "pour éviter d'écrire une phrase", "parce que l'unité remplace le calcul"],
    expected: ["pour savoir de quoi on parle"],
    comparator: "mcq_exact",
    hint: "36 € et 36 élèves ne veulent pas dire la même chose.",
    explanation: exp("L'unité précise la grandeur ou l'objet dont on parle.", "On regarde la question pour savoir quelle unité écrire.", "36 € n'a pas le même sens que 36 élèves ou 36 cm.", "L'unité rend la réponse claire."),
    tags: ["cm2", "probleme", "rediger", "unite", "qcm"],
  }),
  RE("g01_calcul_donne_ajout_retrait", 2, "La phrase reprend la question, avec le nombre ET l'unité.", () => rediger(pb(["total", "reste"], 1), true)),
  RE("g02_calcul_donne_groupes", 2, "La phrase reprend la question, avec le nombre ET l'unité.", () => rediger(pb(["fois", "partage"], 1), true)),
  RE("g03_calcul_donne_prix", 2, "Un prix s'écrit avec « € » : la phrase dit combien on paie, ou combien on rend.", () => rediger(pb(["prixTotal", "rendu", "foisDec"], 2), true)),
  RE("g04_calcul_donne_mesures", 2, "Attention à l'unité : km, m, kg ou L ?", () => rediger(pb(["mesureTotal", "mesureEcart", "partageDec"], 2), true)),
  RE("g05_comparer", 3, "Calcule d'abord, puis choisis la phrase qui répond à LA question posée.", () => rediger(pb(["ecart", "complement"], 3), false)),
  RE("g06_groupes_fois", 3, "Calcule d'abord, puis vérifie le nombre et l'unité.", () => rediger(pb(["groupement", "foisPlus", "plusQue"], 3), false)),
  RE("g07_decimaux", 3, "Calcule, puis vérifie la virgule ET l'unité.", () => rediger(pb(["foisDec", "partageDec", "mesureEcart", "rendu"], 3), false)),
  RE("g08_durees", 3, "Une heure (« à 16 h 05 ») ou une durée (« 1 h 35 min ») ?", () => rediger(pb(["dureeFin", "dureeEcart"], 3), false)),
  RE("g09_deux_etapes", 4, "La réponse est le résultat de la dernière étape.", () => rediger2(un(ETAPES_3)(3))),
  RE("g10_deux_etapes_plus", 4, "La réponse est le résultat de la dernière étape.", () => rediger2(un(ETAPES_4)(4))),
];

/* =========================================================
   PROBLEME_DEFI
========================================================= */
const DE = atelier("defi");

function d1TroisEtapes(): Gen {
  const c = tirer(GROUPES.filter((g) => g.rangement));
  const { s, il } = c.qui();
  let n: number;
  let k: number;
  let m: number;
  let q: number;
  let cc: number;
  do {
    [n, k] = nk(2, c);
    m = entre(3, 12);
    q = entre(10, Math.max(10, Math.floor((n * k) / m) - 5));
    cc = n * k - m * q;
  } while (cc < 5);
  const P = n * k;
  const R = m * q;
  return {
    text: `${cap(s)} reçoit ${n} ${c.contPl} de ${k} ${c.obj}. ${cap(il)} en garde ${fr(cc)}, puis ${il} partage le reste en ${m} parts égales. ${un([`Combien ${de(c.obj)} y a-t-il dans chaque part ?`, `Combien ${de(c.obj)} contient chaque part ?`])}`,
    ...choixN(q, [R, P % m === 0 ? P / m : P - cc - m, q + cc, P - cc], c.obj),
    explanation: exp(DEF_DEUX, "Trois étapes : le total, ce qui reste, puis le partage.", `${n} × ${k} = ${fr(P)} ; ${fr(P)} − ${fr(cc)} = ${fr(R)} ; ${fr(R)} ÷ ${m} = ${fr(q)}.`, `Il y a ${fr(q)} ${c.obj} dans chaque part.`),
    ...(peut(0.8) ? { canvas: barre([{ label: "gardés", value: fr(cc) }, ...(m <= 6 ? egales(m, { label: "part", unknown: true }) : [{ label: "part", unknown: true }, { label: `… ${m} parts` }])], `${n} × ${k}`, cap(c.obj)) } : {}),
  };
}

function d2Budget(): Gen {
  const { s, il } = prenom();
  const [A, B] = deuxArticles();
  const n = entre(2, 5);
  const p = prix(A.p);
  const q = prix(B.p);
  const cout = r2(n * p + q);
  const dispo = Math.max(5, Math.round(cout) + un([-7, -4, -2, 3, 5, 8, 11]));
  const phrase = (dd: number) => (Math.abs(dd) < 0.005 ? "Oui, c'est juste assez." : dd > 0 ? `Oui, il lui restera ${eu(dd)} €.` : `Non, il lui manque ${eu(-dd)} €.`);
  const dd = r2(dispo - cout);
  return {
    text: `${s} a ${dispo} €. ${cap(il)} veut acheter ${n} ${A.pl} à ${eu(p)} € ${A.le} et ${B.un} à ${eu(q)} €. ${un([`A-t-${il} assez d'argent ?`, `Peut-${il} tout acheter ?`, `Son argent suffit-il ?`])}`,
    ...qcm(phrase(dd), [phrase(r2(dispo - n * p)), phrase(r2(dispo - p - q)), phrase(-dd), phrase(r2(dd + 1))]),
    explanation: exp(DEF_DEUX, "On calcule ce que coûtent les achats, puis on compare avec l'argent qu'on a.", `${n} × ${eu(p)} = ${eu(n * p)} ; ${eu(n * p)} + ${eu(q)} = ${eu(cout)} € ; ${dd >= 0 ? `${dispo} − ${eu(cout)} = ${eu(dd)}` : `il manque ${eu(cout)} − ${dispo} = ${eu(-dd)}`}.`, phrase(dd)),
    ...(peut(0.8) ? { canvas: argent(dispo) } : {}),
  };
}

function d3PrixUnite(): Gen {
  const A = un(ARTICLES);
  let n1: number;
  let n2: number;
  let u1: number;
  let u2: number;
  do {
    n1 = entre(2, 8);
    n2 = entre(2, 8);
    u1 = prix(A.p);
    u2 = prix(A.p);
  } while (n1 === n2 || Math.abs(u1 - u2) < 0.2 || Math.abs(n1 * u1 - n2 * u2) < 0.5);
  const [L1, L2] = melange([...LIEUX]).slice(0, 2);
  const P1 = r2(n1 * u1);
  const P2 = r2(n2 * u2);
  const pron = A.f ? "elle" : "il";
  const [Lc, uc, Lo, uo] = u1 < u2 ? [L1, u1, L2, u2] : [L2, u2, L1, u1];
  const petitTotal = P1 < P2 ? L1 : L2;
  const faux = [`${cap(au(Lo))} : ${eu(uo)} € ${A.le}.`, "C'est le même prix aux deux endroits."];
  const nLo = Lo === L1 ? n1 : n2;
  const nLc = Lc === L1 ? n1 : n2;
  if (petitTotal !== Lc) faux.push(`${cap(au(petitTotal))}, car ${eu(Math.min(P1, P2))} € est le prix le plus bas.`);
  else if (nLo > nLc) faux.push(`${cap(au(Lo))}, car on y achète plus ${de(A.pl)}.`);
  return {
    text: `${cap(au(L1))}, ${n1} ${A.pl} coûtent ${eu(P1)} €. ${cap(au(L2))}, ${n2} ${A.pl} coûtent ${eu(P2)} €. ${un([`Où ${A.le} est-${pron} le moins cher ?`, `À quel endroit ${A.le} coûte-t-${pron} le moins cher ?`])}`,
    ...qcm(`${cap(au(Lc))} : ${eu(uc)} € ${A.le}.`, faux),
    explanation: exp("Pour comparer, on cherche le prix d'UN objet à chaque endroit.", "On divise chaque prix par le nombre d'objets.", `${eu(P1)} ÷ ${n1} = ${eu(u1)} € et ${eu(P2)} ÷ ${n2} = ${eu(u2)} €.`, `C'est ${au(Lc)} que ${A.le} est le moins cher : ${eu(uc)} €.`),
    ...(peut(0.6) ? { canvas: pose(P1, "÷", n1, "€") } : {}),
  };
}

function d4FoisPlusEnsemble(): Gen {
  const A = prenom();
  const B = prenom(A.s);
  const obj = un(COLLECTIONS);
  const k = entre(45, 380);
  const n = entre(2, 6);
  const elles = A.il === "elle" && B.il === "elle" ? "elles" : "ils";
  const rep = k + n * k;
  return {
    text: `${A.s} a ${k} ${obj}. ${B.s} en a ${n} fois plus. ${un([`Combien ${de(obj)} ont-${elles} ensemble ?`, `Combien ${de(obj)} ont-${elles} à ${elles === "elles" ? "elles" : "eux"} deux ?`])}`,
    ...choixN(rep, [n * k, k + n, n * k - k, k * n + n], obj),
    explanation: exp(DEF_DEUX, `D'abord ce qu'a ${B.s} (multiplication), puis on ajoute ce qu'a ${A.s}.`, `${n} × ${k} = ${fr(n * k)} ; ${fr(n * k)} + ${k} = ${fr(rep)}.`, `Ensemble, ${elles} ont ${fr(rep)} ${obj}.`),
    ...(peut(0.8) ? { canvas: barre([{ label: A.s, value: fr(k) }, { label: B.s, value: fr(k) }, ...egales(n - 1, { label: "", value: fr(k) })], "?", cap(obj)) } : {}),
  };
}

const JOURNEES = [
  { qui: "Inès", il: "elle", act: "ses devoirs", parts: ["de calcul", "de lecture", "d'anglais", "de sciences"] },
  { qui: "Le cuisinier", il: "il", act: "son repas", parts: ["d'épluchage", "de cuisson", "de dressage", "de vaisselle"] },
  { qui: "La sportive", il: "elle", act: "son entraînement", parts: ["d'échauffement", "de course", "de musculation", "d'étirements"] },
  { qui: "Le jardinier", il: "il", act: "sa journée", parts: ["de tonte", "de taille", "d'arrosage", "de plantation"] },
  { qui: "La pianiste", il: "elle", act: "sa répétition", parts: ["de gammes", "de solfège", "de morceaux", "d'improvisation"] },
  { qui: "Malik", il: "il", act: "son samedi", parts: ["de vélo", "de piscine", "de jeux", "de lecture"] },
  { qui: "L'infirmière", il: "elle", act: "sa tournée", parts: ["de route", "de soins", "de route encore", "de papiers"] },
  { qui: "La boulangère", il: "elle", act: "sa fournée", parts: ["de pétrissage", "de repos de la pâte", "de façonnage", "de cuisson"] },
] as const;
function d5Enchainement(): Gen {
  const J = un(JOURNEES);
  const t0 = entre(7, 16) * 60 + 5 * entre(0, 11);
  const nb = un([3, 3, 4]);
  const durees = Array.from({ length: nb }, () => 5 * entre(3, 11));
  const tot = durees.reduce((a, b) => a + b, 0);
  const fin = t0 + tot;
  const noms = J.parts.slice(0, nb);
  const liste = durees.map((d, i) => `${d} min ${noms[i]}`);
  const naif = (t0 % 60) + tot >= 60 ? [`${Math.floor(t0 / 60)} h ${(t0 % 60) + tot}`] : [];
  return {
    text: `${J.qui} commence ${J.act} à ${heure(t0)}. ${cap(J.il)} enchaîne ${liste.slice(0, -1).join(", ")} et ${liste[nb - 1]}. ${un([`À quelle heure finit-${J.il} ?`, `À quelle heure a-t-${J.il} terminé ?`])}`,
    ...choixN(fin, [fin - 60, fin + 60, t0 + tot - durees[nb - 1], fin + 10], "h", naif),
    explanation: exp(DEF_DEUX, "On additionne les durées, puis on ajoute le total à l'heure de début (60 min = 1 h).", `${durees.join(" + ")} = ${tot} min = ${duree(tot)} ; ${heure(t0)} + ${duree(tot)} = ${heure(fin)}.`, `${J.qui} finit à ${heure(fin)}.`),
    ...(peut(0.85) ? { canvas: frise(heure(t0), "?", etapesFrise(durees.map((d) => ({ label: `${d} min`, minutes: d }))), cap(J.act.replace(/^(ses|son|sa) /, ""))) } : {}),
  };
}

const TRANSPORTS = [
  { txt: (T: number, k: number) => `${fr(T)} élèves partent en classe verte. Un car a ${k} places.`, pl: "cars", ks: [45, 50, 55, 59] },
  { txt: (T: number, k: number) => `${fr(T)} supporters vont au match. Un bus peut transporter ${k} personnes.`, pl: "bus", ks: [42, 48, 52] },
  { txt: (T: number, k: number) => `${fr(T)} invités viennent au mariage. Une table accueille ${k} personnes.`, pl: "tables", ks: [10, 12, 14] },
  { txt: (T: number, k: number) => `${fr(T)} touristes visitent les grottes. Un bateau prend ${k} passagers.`, pl: "bateaux", ks: [18, 24, 35] },
  { txt: (T: number, k: number) => `${fr(T)} randonneurs dorment au refuge. Un dortoir a ${k} lits.`, pl: "dortoirs", ks: [12, 16, 18] },
  { txt: (T: number, k: number) => `La bibliothécaire range ${fr(T)} livres. Une étagère contient ${k} livres.`, pl: "étagères", ks: [25, 32, 40] },
  { txt: (T: number, k: number) => `Le photographe imprime ${fr(T)} photos. Un album contient ${k} photos.`, pl: "albums", ks: [24, 36, 48] },
  { txt: (T: number, k: number) => `L'apicultrice met ${fr(T)} pots de miel dans des cartons de ${k}.`, pl: "cartons", ks: [12, 15, 24] },
];
function d6ArrondiSup(): Gen {
  const tr = un(TRANSPORTS);
  const k = un(tr.ks);
  const q = entre(4, 28);
  const r = entre(1, k - 1);
  const T = q * k + r;
  return {
    text: `${tr.txt(T, k)} ${un([`Combien ${de(tr.pl)} faut-il au minimum ?`, `Au minimum, combien ${de(tr.pl)} faut-il ?`])}`,
    ...choixN(q + 1, [q, r, q + 2, k], tr.pl),
    explanation: exp("Dans une division, le reste compte aussi.", "On divise, puis on regarde le reste : il faut encore une place pour lui.", `${fr(T)} ÷ ${k} : ${q} et il reste ${r}. Il faut donc ${q} + 1 = ${q + 1}.`, `Il faut ${q + 1} ${tr.pl}.`),
    ...(peut(0.75) ? { canvas: pose(T, "÷", k) } : {}),
  };
}

function d7Reste(): Gen {
  const c = tirer(GROUPES.filter((g) => g.rangement && g.ks.some((x) => x >= 10)));
  const { s, il } = c.qui();
  const k = un(c.ks.filter((x) => x >= 10));
  const q = entre(12, 45);
  const r = entre(2, k - 1);
  const T = q * k + r;
  return {
    text: `${un([`${cap(s)} a ${fr(T)} ${c.obj}. ${cap(il)} fait des ${c.contPl} de ${k}.`, `${cap(s)} range ${fr(T)} ${c.obj} par ${k} dans des ${c.contPl}.`])} ${un([`Combien ${de(c.obj)} reste-t-il à la fin, en dehors des ${c.contPl} ?`, `Combien ${de(c.obj)} ne trouvent pas de place ?`])}`,
    ...choixN(r, [q, k - r, r + k, q + 1], c.obj),
    explanation: exp("Le reste d'une division, c'est ce qui ne suffit pas pour faire un groupe de plus.", `On cherche combien de fois ${k} tient dans ${fr(T)}.`, `${q} × ${k} = ${fr(q * k)} et ${fr(T)} − ${fr(q * k)} = ${r}.`, `Il reste ${r} ${c.obj}.`),
    ...(peut(0.75) ? { canvas: pose(T, "÷", k) } : {}),
  };
}

function d8SommeEcart(): Gen {
  const A = prenom();
  const B = prenom(A.s);
  const obj = un(COLLECTIONS);
  const b = entre(120, 950);
  const e = entre(25, 380);
  const T = 2 * b + e;
  const deux = A.il === "elle" && B.il === "elle" ? "à elles deux" : "à eux deux";
  const demandeA = peut(0.4);
  const rep = demandeA ? b + e : b;
  return {
    text: `${un([`${A.s} et ${B.s} ont ${fr(T)} ${obj} ${deux}.`, `Ensemble, ${A.s} et ${B.s} ont ${fr(T)} ${obj}.`])} ${A.s} en a ${e} de plus ${que(B.s)}. ${demandeA ? `Combien ${de(obj)} ${A.s} a-t-${A.il} ?` : `Combien ${de(obj)} ${B.s} a-t-${B.il} ?`}`,
    ...choixN(rep, [T % 2 === 0 ? T / 2 : T - e, T - e, demandeA ? b : b + e, T - b], obj),
    explanation: exp(
      "Un défi : on connaît la somme et l'écart.",
      `On enlève l'écart pour avoir deux parts égales, celle de ${B.s}.`,
      `${fr(T)} − ${e} = ${fr(2 * b)} ; ${fr(2 * b)} ÷ 2 = ${b}${demandeA ? ` ; ${b} + ${e} = ${b + e}` : ""}.`,
      `${demandeA ? A.s : B.s} a ${fr(rep)} ${obj}.`,
    ),
    ...(peut(0.8) ? { canvas: barre([{ label: B.s, unknown: true }, { label: A.s, unknown: true }, { label: "de plus", value: fr(e) }], fr(T), cap(obj)) } : {}),
  };
}

function d9PartagePrix(): Gen {
  const A = un(ARTICLES);
  let n: number;
  let m: number;
  let p: number;
  do {
    n = un([2, 4, 5]);
    m = entre(3, 9);
    p = prix(A.p);
  } while (Math.round(m * p * 100) % n !== 0 || m === n);
  const P = r2(m * p);
  const v = r2(P / n);
  const noms: string[] = [];
  while (noms.length < n) {
    const x = prenom().s;
    if (!noms.includes(x)) noms.push(x);
  }
  const qui = n <= 3 && peut(0.5) ? `${noms.slice(0, -1).join(", ")} et ${noms[n - 1]}` : `${n} amis`;
  return {
    text: `${qui} achètent ensemble ${m} ${A.pl} à ${eu(p)} € ${A.le}. ${un(["Ils partagent la dépense en parts égales.", "Chacun paie la même somme."])} ${un(["Combien paie chacun ?", "Quelle somme chacun paie-t-il ?"])}`,
    ...choixN(v, [P, p, r2(P - n), r2(v + p)], "€"),
    explanation: exp(DEF_DEUX, "D'abord le prix total, puis on le partage entre les amis.", `${m} × ${eu(p)} = ${eu(P)} € ; ${eu(P)} ÷ ${n} = ${eu(v)} €.`, `Chacun paie ${eu(v)} €.`),
    ...(peut(0.8) ? { canvas: barre(egales(n, { label: "", unknown: true }), `${m} × ${eu(p)} €`, "La dépense") } : {}),
  };
}

const OFFRES = [
  { lieu: "la piscine", carte: "une carte de 10 entrées", ticket: "l'entrée", t: [3.2, 5.4] as [number, number], nb: [6, 15] as [number, number] },
  { lieu: "le cinéma", carte: "une carte de 10 places", ticket: "la place", t: [7.5, 10.5] as [number, number], nb: [6, 14] as [number, number] },
  { lieu: "la patinoire", carte: "un abonnement de 10 séances", ticket: "la séance", t: [4.5, 7.5] as [number, number], nb: [5, 14] as [number, number] },
  { lieu: "le musée", carte: "un pass de 10 visites", ticket: "la visite", t: [5.5, 9.5] as [number, number], nb: [5, 13] as [number, number] },
  { lieu: "le bowling", carte: "une carte de 10 parties", ticket: "la partie", t: [4.2, 6.8] as [number, number], nb: [6, 15] as [number, number] },
];
function d10Offres(): Gen {
  const O = un(OFFRES);
  const { s, il } = prenom();
  const t = prix(O.t);
  const C = Math.round(t * 10 * un([0.7, 0.75, 0.8, 0.85]));
  const n = entre(...O.nb);
  // Au-delà de 10 entrées, on ajoute des tickets à l'unité.
  const avecCarte = r2(C + Math.max(0, n - 10) * t);
  const sans = r2(n * t);
  const ecart = r2(Math.abs(sans - avecCarte));
  const phrase = (carte: boolean, x: number) => (carte ? `La carte : ${eu(x)} € de moins.` : `Les tickets : ${eu(x)} € de moins.`);
  const carteMoins = avecCarte < sans;
  const juste = Math.abs(sans - avecCarte) < 0.005 ? "Les deux coûtent la même somme." : phrase(carteMoins, ecart);
  const plus = n > 10 ? ` ${il === "il" ? "S'il" : "Si elle"} vient plus de 10 fois, ${il} paie les fois en plus au prix normal.` : "";
  return {
    text: `${cap(au(O.lieu))}, ${O.ticket} coûte ${eu(t)} €, ou on achète ${O.carte} à ${C} €. ${s} va venir ${n} fois.${plus} ${un(["Quelle formule est la moins chère ?", "Que doit-il choisir pour payer le moins ?"]).replace("doit-il", `doit-${il}`)}`,
    ...qcm(juste, [phrase(!carteMoins, ecart), phrase(carteMoins, r2(Math.abs(10 * t - C))), "Les deux coûtent la même somme.", phrase(carteMoins, sans)]),
    explanation: exp(
      "Comparer deux formules, c'est calculer ce que coûte chacune pour le même nombre de venues.",
      "On calcule le prix avec les tickets, puis avec la carte, et on fait la différence.",
      `Tickets : ${n} × ${eu(t)} = ${eu(sans)} €. Carte : ${n > 10 ? `${C} + ${n - 10} × ${eu(t)} = ` : ""}${eu(avecCarte)} €. Écart : ${eu(ecart)} €.`,
      juste,
    ),
    ...(peut(0.6) ? { canvas: barre([{ label: "tickets", value: eu(sans) }, { label: "carte", value: eu(avecCarte) }], undefined, "Les deux formules (€)") } : {}),
  };
}

const defiItems: TutorBankItemV4[] = [
  fixe({
    id: "cm2_probleme_defi_fixed_1_bus",
    microId: "probleme_defi",
    difficulty: 4,
    text: "Pour une sortie, 92 élèves prennent des bus de 30 places. Combien de bus faut-il prévoir au minimum ?",
    format: "qcm",
    choices: ["4 bus", "3 bus", "2 bus", "30 bus"],
    expected: ["4 bus"],
    comparator: "mcq_exact",
    hint: "3 bus ne suffisent pas pour 92 élèves.",
    explanation: exp("Dans une division, le reste compte aussi.", "On divise, puis on regarde le reste : il faut encore une place pour lui.", "92 ÷ 30 : 3 et il reste 2. Il faut donc 3 + 1 = 4.", "Il faut prévoir 4 bus."),
    tags: ["cm2", "probleme", "defi", "division", "qcm"],
  }),
  DE("g01_trois_etapes", 4, "Trois étapes : le total, ce qui reste, puis le partage.", d1TroisEtapes),
  DE("g02_budget", 4, "Calcule le prix de tout, puis compare avec l'argent qu'on a.", d2Budget),
  DE("g03_prix_unite", 4, "Compare le prix d'UN objet, pas le prix total.", d3PrixUnite),
  DE("g04_fois_plus_ensemble", 4, "D'abord la part du second, puis on ajoute.", d4FoisPlusEnsemble),
  DE("g05_enchainement", 4, "Additionne les durées, puis ajoute-les à l'heure de début.", d5Enchainement),
  DE("g06_arrondi_superieur", 5, "Le reste compte : il faut une place de plus.", d6ArrondiSup),
  DE("g07_reste", 5, "Le reste, c'est ce qui ne suffit pas pour un groupe de plus.", d7Reste),
  DE("g08_somme_ecart", 5, "Enlève l'écart, puis partage en deux.", d8SommeEcart),
  DE("g09_partage_prix", 5, "D'abord le prix total, puis le partage.", d9PartagePrix),
  DE("g10_offres", 5, "Calcule le prix des deux formules pour le même nombre de venues.", d10Offres),
];

export const problemeBank: TutorBankItemV4[] = [...choisirItems, ...uneEtapeItems, ...plusieursItems, ...redigerItems, ...defiItems];
