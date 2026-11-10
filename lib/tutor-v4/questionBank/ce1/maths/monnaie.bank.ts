// lib/tutor-v4/questionBank/ce1/maths/monnaie.bank.ts
//
// La monnaie du CE1, écrite à la main. C'est la notion que le constructeur
// commun servait le plus mal : mesuré le 09/08/2026, « Constituer une somme en
// euros » recevait « Un ruban mesure 61 cm. On ajoute 21 cm. Quelle est sa
// nouvelle longueur ? ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, tableau CE1) — six attendus, et ils
// vont plus loin qu'on ne croit pour un CE1 :
//   — connaître le lien entre les euros et les centimes ;
//   — déterminer la valeur d'un ensemble de pièces et de billets ;
//   — comparer les valeurs de deux ensembles ;
//   — constituer une somme donnée avec des euros ET des centimes ;
//   — simuler un achat, rendre la monnaie ;
//   — connaître le SENS DE L'ÉCRITURE À VIRGULE d'une somme d'argent.
// 📅 Jalon du programme : « Les centimes d'euro sont introduits au plus tard en
// période 2. » Avant, on reste aux euros entiers.
//
// ⭐ 10/11/2026 — EUROS ENTIERS D'ABORD. Consigne du cycle 2 : « euros entiers
// au CP/CE1, centimes au CE2 ». Les centimes ne restent donc que dans les deux
// micros qui les nomment (« euros et centimes », « écriture à virgule ») et
// dans quelques défis et items figés d'origine. Tout le reste — valeur d'un
// tas, comparer, constituer, rendre, problèmes — se joue en euros entiers,
// avec le DESSIN des pièces et des billets (canvas `monnaie`). Le dessin
// n'additionne jamais : la somme cherchée n'est jamais écrite.
//
// LE PIÈGE DE LA NOTION, celui qui coûte le plus cher plus tard : écrire
// « 4 euros et 5 centimes » 4,5 € au lieu de 4,05 €. Le chiffre des centimes
// occupe DEUX places, comme les dizaines et les unités d'un nombre.
// Second piège, à tout âge : compter les PIÈCES au lieu de leur VALEUR.
//
// ⚠️ La virgule est réservée à la monnaie. Les longueurs et les masses
// s'écrivent « 2 m 50 cm », jamais « 2,50 m ».
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas. Les réponses en euros sont
// donc écrites en `qcm` quand elles portent une virgule.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  BILLETS,
  court,
  de,
  deuxEnfants,
  direTas,
  exp,
  maj,
  monnaie,
  pl,
  porteMonnaies,
  qcm,
  que,
  quelquun,
  randomChoice,
  randomInt,
  rendreMinimal,
  shuffle,
  somme,
  tas,
  tasAuHasard,
  tirer,
  type Personne,
  type Valeur,
} from "./outils-nombres-ce1";

/** Écriture à virgule d'une somme : les centimes occupent TOUJOURS deux places. */
function euros(e: number, c: number) {
  return `${e},${String(c).padStart(2, "0")} €`;
}

/** Les achats d'un enfant de 7 ans, prix en euros entiers. */
type Achat = { quoi: string; lieu: string; min: number; max: number };
const ACHATS: readonly Achat[] = [
  { quoi: "un ballon", lieu: "au magasin de sport", min: 5, max: 15 },
  { quoi: "une glace", lieu: "chez le glacier", min: 2, max: 4 },
  { quoi: "un livre", lieu: "à la librairie", min: 4, max: 12 },
  { quoi: "un cahier", lieu: "à la papeterie", min: 1, max: 3 },
  { quoi: "un gâteau", lieu: "à la pâtisserie", min: 8, max: 18 },
  { quoi: "un ticket de manège", lieu: "à la fête foraine", min: 2, max: 3 },
  { quoi: "un ticket de cirque", lieu: "à l'entrée du chapiteau", min: 8, max: 15 },
  { quoi: "une peluche", lieu: "à la kermesse", min: 6, max: 17 },
  { quoi: "un sachet de graines", lieu: "à la jardinerie", min: 2, max: 4 },
  { quoi: "une boîte de crayons", lieu: "à la papeterie", min: 3, max: 7 },
  { quoi: "un jeu de cartes", lieu: "au magasin de jouets", min: 4, max: 9 },
  { quoi: "un ananas", lieu: "au marché", min: 2, max: 4 },
  { quoi: "un jus de fruits", lieu: "à la buvette de la piscine", min: 1, max: 3 },
  { quoi: "un puzzle de dinosaures", lieu: "au magasin de jouets", min: 7, max: 15 },
  { quoi: "une petite voiture", lieu: "au magasin de jouets", min: 3, max: 6 },
  { quoi: "un cerf-volant", lieu: "à la plage", min: 6, max: 12 },
  { quoi: "une maquette de fusée", lieu: "au musée de l'espace", min: 9, max: 19 },
  { quoi: "un bracelet de perles", lieu: "au marché", min: 2, max: 6 },
  { quoi: "un samoussa", lieu: "au camion-bar", min: 1, max: 2 },
];
const prixDe = (a: Achat, max = 99) => randomInt(a.min, Math.min(a.max, max));
/** Des achats plus chers, pour les prix de 15 à 50 €. */
const GROS_ACHATS: readonly Achat[] = [
  { quoi: "une trottinette", lieu: "au magasin de sport", min: 25, max: 49 },
  { quoi: "un jeu de société", lieu: "au magasin de jouets", min: 15, max: 35 },
  { quoi: "un sac à dos", lieu: "au supermarché", min: 15, max: 30 },
  { quoi: "des rollers", lieu: "au magasin de sport", min: 25, max: 48 },
  { quoi: "un maillot de foot", lieu: "au magasin de sport", min: 18, max: 40 },
  { quoi: "une boîte de briques à construire", lieu: "au magasin de jouets", min: 20, max: 48 },
  { quoi: "un costume de pirate", lieu: "à la boutique de déguisements", min: 15, max: 30 },
  { quoi: "un aquarium", lieu: "à l'animalerie", min: 25, max: 45 },
];
/** Un achat dont le prix habituel contient ce prix (pas de gâteau à 36 €). */
const objetA = (prix: number): Achat => {
  const ok = [...ACHATS, ...GROS_ACHATS].filter((x) => x.min <= prix && prix <= x.max);
  return ok.length ? randomChoice(ok) : prix > 20 ? randomChoice(GROS_ACHATS) : randomChoice(ACHATS);
};
const coute = (prix: number) => {
  const o = objetA(prix);
  return `${maj(o.quoi)} coûte ${prix} € ${o.lieu}.`;
};

/** Les phrases qui présentent un porte-monnaie dessiné. */
const introTas = (p: Personne, sienne = false) =>
  randomChoice([
    ...(sienne ? [] : ["Pic le paille-en-queue a trouvé ce trésor dans son nid.", "Le capitaine pirate a caché cet argent dans son coffre."]),
    `Voici le porte-monnaie ${de(p.nom)}.`,
    `${p.nom} vide sa tirelire.`,
    `${p.nom} a gagné cet argent à la kermesse.`,
    `Mamie a donné cet argent à ${p.nom}.`,
    `Dans la poche ${de(p.nom)}, il y a cet argent.`,
    `${p.nom} a cassé sa tirelire en forme de cochon.`,
  ]);

const Q_TOTAL = [
  "Combien d'euros y a-t-il en tout ?",
  "Quelle somme cela fait-il, en euros ?",
  "Combien cela fait-il d'euros ?",
  "Compte l'argent : combien d'euros ?",
];

/** Le dessin d'un tas : billets puis pièces, ou mélangés (plus dur). */
const dessin = (valeurs: readonly (number | Valeur)[], trier = true) => monnaie(tas(valeurs, trier));

export const monnaieBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_MONNAIE_EUROS_CENTIMES — 1 € = 100 centimes
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_euros_centimes_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimes dans 1 euro ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "C'est le même nombre que de centimètres dans un mètre.",
    explanation: exp(
      "1 euro vaut 100 centimes.",
      "On se rappelle du mot : « centime » commence comme « cent ».",
      "Il faut 100 pièces de 1 centime pour faire 1 euro. C'est le même « centi » que dans centimètre : 100 centimètres font 1 mètre.",
      "1 € = 100 centimes.",
    ),
    tags: ["ce1", "monnaie", "centimes", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_euros_centimes_tpl_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 1,
    theme: "neutral",
    hint: "1 euro, c'est 100 centimes.",
    tags: ["ce1", "monnaie", "centimes", "template", "canvas"],
    generate: () =>
      tirer([
        // La pièce de 1 € : combien de centimes ?
        () => {
          const p = quelquun();
          return court(
            `${randomChoice([`${p.nom} a cette pièce de 1 euro.`, `Voici la pièce ${de(p.nom)}.`, `Pic le paille-en-queue a trouvé cette pièce.`, `${p.nom} montre cette pièce à la maîtresse.`])} ${randomChoice(["Combien de centimes vaut-elle ?", "Elle vaut combien de centimes ?", "Combien de centimes faut-il pour la remplacer ?"])}`,
            100,
            exp("1 euro vaut 100 centimes.", "« Centime » commence comme « cent ».", "1 € = 100 centimes.", "Elle vaut 100 centimes."),
            dessin(["1e"]),
          );
        },
        // Laquelle vaut 100 centimes ?
        () => {
          const p = quelquun();
          return qcm(
            `${randomChoice([`${p.nom} cherche la pièce qui vaut 100 centimes.`, "Une de ces pièces vaut 100 centimes.", `${p.nom} doit payer 100 centimes avec une seule pièce.`])} Laquelle est-ce ?`,
            "la pièce de 1 €",
            ["la pièce de 10 centimes", "la pièce de 1 centime", "la pièce de 2 €", "la pièce de 50 centimes"],
            exp("1 euro vaut 100 centimes.", "On cherche la pièce qui vaut 100 centimes.", "100 centimes = 1 €.", "C'est la pièce de 1 €."),
            dessin(shuffle(["1e", "10c", "1c", "2e"] as Valeur[]), false),
          );
        },
        // 100 centimes, c'est combien d'euros ?
        () => {
          const p = quelquun();
          return court(
            randomChoice([
              `${p.nom} a 100 centimes. Combien d'euros cela fait-il ?`,
              `100 centimes, c'est combien d'euros ?`,
              `${p.nom} a 100 pièces de 1 centime. Combien d'euros a-t-${p.il} ?`,
              `${p.nom} échange 100 centimes contre des euros. Combien d'euros reçoit-${p.il} ?`,
            ]),
            1,
            exp("1 euro vaut 100 centimes.", "100 centimes font un euro tout rond.", "100 centimes = 1 €.", "Cela fait 1 euro."),
          );
        },
      ]),
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_euros_centimes_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 2,
    theme: "neutral",
    text: "Combien faut-il de pièces de 50 centimes pour faire 1 euro ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "50 centimes, c'est la moitié d'un euro.",
    explanation: exp(
      "1 euro vaut 100 centimes.",
      "On cherche combien de fois 50 tient dans 100.",
      "50 + 50 = 100. Deux pièces de 50 centimes font donc 1 euro : chacune est une moitié d'euro.",
      "Il faut 2 pièces.",
    ),
    tags: ["ce1", "monnaie", "centimes", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_euros_centimes_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « 10 pièces de 10 centimes, ça fait 10 euros ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, cela fait 1 euro",
      "oui",
      "non, cela fait 100 euros",
      "non, cela fait 10 centimes",
    ],
    expected: ["non, cela fait 1 euro"],
    comparator: "mcq_exact",
    hint: "Compte les centimes d'abord : 10 fois 10 centimes.",
    explanation: exp(
      "1 euro vaut 100 centimes.",
      "On compte d'abord tout en centimes, puis on regarde si on atteint 100.",
      "10 pièces de 10 centimes font 100 centimes. Et 100 centimes, c'est 1 euro, pas 10 euros : il a gardé le nombre de pièces au lieu de compter la valeur.",
      "Non : cela fait 1 euro.",
    ),
    tags: ["ce1", "monnaie", "centimes", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_euros_centimes_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de fois la pièce tient-elle dans 100 centimes ?",
    tags: ["ce1", "monnaie", "centimes", "template", "canvas"],
    generate: () =>
      tirer([
        // Combien de pièces de X centimes pour 1 € ?
        () => {
          const p = quelquun();
          const piece = randomChoice([10, 20, 50] as const);
          const nb = 100 / piece;
          return court(
            `${randomChoice([`${p.nom} veut échanger sa pièce de 1 € contre des pièces de ${piece} centimes.`, `Le marchand n'a que des pièces de ${piece} centimes pour remplacer cette pièce de 1 €.`, `Pic le paille-en-queue veut changer cette pièce de 1 € en pièces de ${piece} centimes.`])} Combien de pièces ${randomChoice(["faut-il", "obtient-on", "reçoit-on"])} ?`,
            nb,
            exp(
              "1 euro vaut 100 centimes.",
              "On cherche combien de fois la pièce tient dans 100 centimes.",
              `${Array.from({ length: nb }, () => piece).join(" + ")} = 100.`,
              `Il en faut ${nb}.`,
            ),
            dessin(["1e"]),
          );
        },
        // Ce qui manque pour faire 1 €.
        () => {
          const p = quelquun();
          const pieces = randomChoice([[50, 20], [50, 20, 20], [20, 20, 10], [50, 10, 10, 10], [20, 20, 20, 10], [50, 20, 10], [10, 10, 10, 10, 10]]);
          const total = somme(pieces);
          return court(
            `${randomChoice([`${p.nom} a ces pièces.`, `Voici les centimes ${de(p.nom)}.`, `${p.nom} compte ses centimes.`])} Combien de centimes lui manque-t-il pour avoir 1 euro ?`,
            100 - total,
            exp(
              "1 euro vaut 100 centimes.",
              "On compte les centimes, puis on complète jusqu'à 100.",
              `${pieces.join(" + ")} = ${total}. ${total} + ${100 - total} = 100.`,
              `Il manque ${100 - total} centimes.`,
            ),
            dessin(pieces.map((x) => `${x}c` as Valeur)),
          );
        },
        // Des pièces de 2 € en centimes.
        () => {
          const p = quelquun();
          const k = randomInt(2, 4);
          return court(
            `${randomChoice([`${p.nom} a ces pièces de 2 €.`, `Voici les pièces ${de(p.nom)}.`, `${p.nom} a gagné ces pièces au loto de l'école.`])} Combien de centimes cela fait-il ?`,
            k * 200,
            exp(
              "1 euro vaut 100 centimes, donc une pièce de 2 € vaut 200 centimes.",
              "On compte les euros, puis on les change en centimes.",
              `${k} pièces de 2 € = ${k * 2} €. ${k * 2} × 100 = ${k * 200} centimes.`,
              `Cela fait ${k * 200} centimes.`,
            ),
            dessin(Array.from({ length: k }, () => "2e" as Valeur)),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_monnaie_euros_centimes_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque euro vaut 100 centimes : compte de cent en cent.",
    tags: ["ce1", "monnaie", "centimes", "template", "canvas"],
    generate: () =>
      tirer([
        // Des pièces de 1 € dessinées → centimes.
        () => {
          const p = quelquun();
          const e = randomInt(2, 6);
          return court(
            `${randomChoice([`${p.nom} a ces pièces de 1 €.`, `Voici les pièces ${de(p.nom)}.`, `${p.nom} a trouvé ces pièces sous son lit.`, `${p.nom} a gagné ces pièces à la kermesse.`, `Pic le paille-en-queue a rapporté ces pièces.`])} ${randomChoice(["Combien de centimes cela fait-il ?", "Combien de centimes valent-elles en tout ?", "Elles valent combien de centimes ?"])}`,
            e * 100,
            exp("1 euro vaut 100 centimes.", "On compte de cent en cent, une fois par pièce.", `${Array.from({ length: e }, (_, i) => (i + 1) * 100).join(", ")}.`, `Cela fait ${e * 100} centimes.`),
            dessin(Array.from({ length: e }, () => "1e" as Valeur)),
          );
        },
        // Des euros écrits → centimes.
        () => {
          const p = quelquun();
          const e = randomInt(2, 9);
          return court(
            randomChoice([
              `Combien de centimes valent ${e} euros ?`,
              `${p.nom} a ${e} euros. Combien de centimes cela fait-il ?`,
              `${p.nom} dit : « J'ai ${e} €. » Combien de centimes a-t-${p.il} ?`,
              `${p.nom} veut changer ${e} € en pièces de 1 centime. Combien de pièces aura-t-${p.il} ?`,
              `La tirelire ${de(p.nom)} contient ${e} €. Combien de centimes cela fait-il ?`,
            ]),
            e * 100,
            exp("1 euro vaut 100 centimes.", "On compte 100 centimes par euro.", `${e} × 100 = ${e * 100}.`, `${e} euros valent ${e * 100} centimes.`),
          );
        },
        // Des centimes → des euros.
        () => {
          const p = quelquun();
          const e = randomInt(2, 9);
          return court(
            randomChoice([
              `${e * 100} centimes, c'est combien d'euros ?`,
              `${p.nom} a ${e * 100} centimes dans sa tirelire. Combien d'euros cela fait-il ?`,
              `${p.nom} a compté ${e * 100} centimes. Combien d'euros a-t-${p.il} ?`,
              `${p.nom} demande : ${e * 100} centimes, c'est combien d'euros ?`,
              `Le marchand échange ${e * 100} centimes contre des pièces de 1 €. Combien de pièces donne-t-il ?`,
            ]),
            e,
            exp("1 euro vaut 100 centimes.", "On compte combien de fois 100 tient dans le nombre.", `${e * 100} = ${e} × 100.`, `Cela fait ${e} euros.`),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_MONNAIE_VIRGULE — le sens de l'écriture à virgule
     LE piège de la notion : « 4 euros et 5 centimes » écrit
     4,5 € au lieu de 4,05 €. Les centimes tiennent DEUX places.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_virgule_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 3,
    theme: "neutral",
    text: "Comment écrit-on « 4 euros et 5 centimes » avec une virgule ?",
    format: "qcm",
    choices: ["4,05 €", "4,5 €", "4,50 €", "45 €"],
    expected: ["4,05 €"],
    comparator: "mcq_exact",
    hint: "Après la virgule, il y a toujours DEUX chiffres : les dizaines de centimes, puis les centimes.",
    explanation: exp(
      "Dans une somme d'argent, les deux chiffres après la virgule sont les centimes.",
      "On écrit les euros devant la virgule, puis les centimes derrière, sur deux places.",
      "5 centimes, c'est zéro dizaine de centimes et 5 centimes : on écrit 05. Cela donne 4,05 €. Écrire 4,5 € voudrait dire 50 centimes, dix fois plus.",
      "On écrit 4,05 €.",
    ),
    tags: ["ce1", "monnaie", "virgule", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_virgule_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 2,
    theme: "neutral",
    text: "Sur l'étiquette d'un pain, il est écrit 1,20 €. Combien cela fait-il de centimes en plus de l'euro ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Ce qui est écrit après la virgule, ce sont les centimes.",
    explanation: exp(
      "Dans une somme d'argent, ce qui est écrit après la virgule compte les centimes.",
      "On sépare : devant la virgule les euros, derrière les centimes.",
      "1,20 € se lit « 1 euro et 20 centimes ». Le 1 est devant la virgule, le 20 derrière.",
      "Il y a 20 centimes en plus de l'euro.",
    ),
    tags: ["ce1", "monnaie", "virgule"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_virgule_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui coûte le plus cher : 3,07 € ou 3,7 € ?",
    format: "qcm",
    choices: ["3,7 €", "3,07 €", "c'est le même prix", "on ne peut pas savoir"],
    expected: ["3,7 €"],
    comparator: "mcq_exact",
    hint: "Compte les centimes de chaque prix : 07, c'est sept centimes.",
    explanation: exp(
      "Après la virgule, le premier chiffre compte les dizaines de centimes, le second les centimes.",
      "On lit chaque prix en euros et en centimes avant de comparer.",
      "3,07 € fait 3 euros et 7 centimes. 3,7 € fait 3 euros et 70 centimes. 70 centimes, c'est dix fois plus que 7 centimes.",
      "3,7 € coûte plus cher.",
    ),
    tags: ["ce1", "monnaie", "virgule", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_virgule_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 4,
    theme: "neutral",
    hint: "Moins de 10 centimes : il faut un zéro juste après la virgule.",
    tags: ["ce1", "monnaie", "virgule", "piege", "template", "canvas"],
    generate: () =>
      tirer([
        // Les pièces dessinées → l'écriture à virgule.
        () => {
          const p = quelquun();
          const e = randomInt(1, 5);
          const cents = randomChoice([[5], [2], [1, 2], [5, 2], [5, 1], [2, 2, 1], [5, 2, 2], [10], [20], [50], [20, 5], [10, 5], [50, 5]]);
          const c = somme(cents);
          const pieces = [...rendreMinimal(e), ...cents.map((x) => `${x}c` as Valeur)];
          const bonne = euros(e, c);
          return qcm(
            `${randomChoice([`Voici le porte-monnaie ${de(p.nom)}.`, `${p.nom} a posé ces pièces sur la table.`, `Pic le paille-en-queue a trouvé ces pièces.`, `${p.nom} paie la boulangère avec ces pièces.`, `${p.nom} a vidé sa poche.`])} ${randomChoice(["Comment écrit-on cette somme avec une virgule ?", "Quelle écriture à virgule donne cette somme ?"])}`,
            bonne,
            [c < 10 ? `${e},${c} €` : `${e},${String(c).padStart(2, "0")[0]} €`, c < 10 ? `${e},${c}0 €` : euros(e, c / 10 < 10 ? Math.round(c / 10) : c), euros(e + 1, c), `${e}${c} €`, euros(c < 10 ? c : e + 2, e)],
            exp(
              "Dans une somme d'argent, les deux chiffres après la virgule comptent les centimes.",
              "On compte les euros, puis les centimes, et on écrit les centimes sur DEUX places.",
              `Euros : ${e}. Centimes : ${cents.join(" + ")} = ${c}. On écrit ${bonne}.`,
              `C'est ${bonne}.`,
            ),
            dessin(pieces),
          );
        },
        // « e euros et c centimes » avec c < 10.
        () => {
          const p = quelquun();
          const c = randomInt(1, 9);
          let e = randomInt(1, 9);
          if (e === c) e = (e % 9) + 1;
          const bonne = euros(e, c);
          const ctx = randomChoice([
            `Comment écrit-on « ${e} euros et ${c} centimes » avec une virgule ?`,
            `${p.nom} doit écrire le prix « ${e} euros et ${c} centimes ». Qu'écrit-${p.il} ?`,
            `La boulangère écrit « ${e} euros et ${c} centimes » sur l'étiquette. Quelle écriture est juste ?`,
            `Sur le carnet du marché, il faut écrire ${e} euros et ${c} centimes. Comment ?`,
          ]);
          return qcm(
            ctx,
            bonne,
            [`${e},${c} €`, `${e},${c}0 €`, euros(c, e), euros(e + 1, c)],
            exp(
              "Dans une somme d'argent, les deux chiffres après la virgule comptent les centimes.",
              "On écrit les euros devant la virgule, puis les centimes derrière, sur deux places.",
              `${c} centimes s'écrivent 0${c}. Écrire ${e},${c} € voudrait dire ${c}0 centimes, dix fois plus.`,
              `On écrit ${bonne}.`,
            ),
          );
        },
        // Lequel coûte le plus cher ?
        () => {
          const p = quelquun();
          const e = randomInt(1, 9);
          const c = randomInt(1, 9);
          const a = euros(e, c);
          const b = `${e},${c} €`;
          const plus = Math.random() < 0.5;
          return qcm(
            `${randomChoice([`${p.nom} hésite entre deux prix`, `Au marché, ${p.nom} voit deux étiquettes`, `Deux jouets pour ${p.nom}`, `${p.nom} compare deux glaces`, `${p.nom} compare deux cahiers`])} : ${shuffle([a, b]).join(" et ")}. ${plus ? "Lequel est le plus cher ?" : "Lequel est le moins cher ?"}`,
            plus ? b : a,
            [plus ? a : b, "c'est le même prix"],
            exp(
              "Après la virgule, le premier chiffre compte les dizaines de centimes, le second les centimes.",
              "On lit chaque prix en euros et en centimes avant de comparer.",
              `${a} = ${e} euros et ${c} centimes. ${b} = ${e} euros et ${c}0 centimes.`,
              `Le plus cher est ${b}.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_monnaie_virgule_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 3,
    theme: "neutral",
    hint: "Devant la virgule les euros, derrière les centimes.",
    tags: ["ce1", "monnaie", "virgule", "template"],
    generate: () => {
      const p = quelquun();
      const e = randomInt(1, 9);
      const c = randomChoice([10, 20, 25, 30, 40, 45, 50, 60, 75, 80, 90, 15, 35, 55, 65, 85, 95]);
      const prix = euros(e, c);
      const objet = randomChoice([
        "d'une glace", "d'un cahier", "d'une baguette", "d'un jus de fruits", "d'un stylo", "d'un sachet de graines",
        "d'une crêpe", "d'un ticket de bus", "d'une gomme", "d'un paquet de mouchoirs", "d'une carte postale", "d'une pomme d'amour",
      ]);
      const ctx = randomChoice([
        `L'étiquette ${objet} affiche ${prix}.`,
        `Au marché, le prix ${objet} est ${prix}.`,
        `${p.nom} lit le prix ${objet} : ${prix}.`,
        `Sur le ticket de caisse, le prix ${objet} est ${prix}.`,
      ]);
      return tirer([
        () =>
          court(
            `${ctx} ${randomChoice([`Combien de centimes y a-t-il en plus des ${e} ${pl(e, "euro", "euros")} ?`, "Combien de centimes sont écrits après la virgule ?"])}`,
            c,
            exp(
              "Dans une somme d'argent, ce qui est écrit après la virgule compte les centimes.",
              "On sépare : devant la virgule les euros, derrière les centimes.",
              `${prix} se lit « ${e} ${pl(e, "euro", "euros")} et ${c} centimes ».`,
              `Il y a ${c} centimes.`,
            ),
          ),
        () =>
          court(
            `${ctx} ${randomChoice(["Combien d'euros entiers coûte-t-il ?", "Combien d'euros sont écrits devant la virgule ?"])}`,
            e,
            exp(
              "Dans une somme d'argent, ce qui est devant la virgule compte les euros.",
              "On sépare : devant la virgule les euros, derrière les centimes.",
              `${prix} se lit « ${e} ${pl(e, "euro", "euros")} et ${c} centimes ».`,
              `Il y a ${e} ${pl(e, "euro", "euros")}.`,
            ),
          ),
        () =>
          qcm(
            `${randomChoice([`Comment lit-on ${prix} ?`, `${p.nom} lit ${prix} à voix haute. Que dit-${p.il} ?`, `Que veut dire ${prix} ?`])}`,
            `${e} ${pl(e, "euro", "euros")} et ${c} centimes`,
            [`${c} euros et ${e} centimes`, `${e} ${pl(e, "euro", "euros")} et ${c / 5 === Math.floor(c / 5) && c % 10 === 0 ? c / 10 : c + 10} centimes`, `${e * 100 + c} euros`, `${e + 1} euros et ${c} centimes`],
            exp(
              "Devant la virgule : les euros. Derrière : les centimes, sur deux chiffres.",
              "On lit chaque partie à son tour.",
              `${prix} : ${e} devant la virgule, ${c} derrière.`,
              `C'est ${e} ${pl(e, "euro", "euros")} et ${c} centimes.`,
            ),
          ),
      ]);
    },
  },

  /* =========================================================
     CE1_MONNAIE_VALEUR_ENSEMBLE — combien vaut ce tas ?
     Le piège : compter les PIÈCES au lieu de compter leur
     valeur. Trois pièces peuvent valoir plus que cinq.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_valeur_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_valeur_ensemble",
    difficulty: 4,
    theme: "neutral",
    text: "Léa a 4 pièces de 50 centimes. Kevin a 5 pièces de 20 centimes. Qui a le plus d'argent ?",
    format: "qcm",
    choices: [
      "Léa, qui a 2 €",
      "Kevin, qui a plus de pièces",
      "ils ont pareil",
      "Kevin, qui a 5 €",
    ],
    expected: ["Léa, qui a 2 €"],
    comparator: "mcq_exact",
    hint: "Compte la valeur, pas le nombre de pièces.",
    explanation: exp(
      "Ce qui compte, c'est la valeur écrite sur les pièces, pas leur nombre.",
      "On calcule chaque tas séparément, puis on compare.",
      "Léa : 50 + 50 + 50 + 50 = 200 centimes, donc 2 €. Kevin : 5 fois 20 centimes = 100 centimes, donc 1 €. Kevin a plus de pièces, mais moins d'argent.",
      "C'est Léa, avec 2 €.",
    ),
    tags: ["ce1", "monnaie", "valeur", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_valeur_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_valeur_ensemble",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par les billets, puis ajoute les pièces.",
    tags: ["ce1", "monnaie", "valeur", "template", "canvas"],
    generate: () =>
      tirer([
        // Le porte-monnaie dessiné.
        () => {
          const p = quelquun();
          const t = tasAuHasard(randomInt(3, 5), true, 20);
          const total = somme(t);
          return court(
            `${introTas(p)} ${randomChoice(Q_TOTAL)}`,
            total,
            exp(
              "La valeur d'un tas, c'est la somme des valeurs de chaque billet et de chaque pièce.",
              "On commence par les billets, les plus grands, puis on ajoute les pièces.",
              `${[...t].sort((a, b) => b - a).join(" + ")} = ${total}.`,
              `Il y a ${total} € en tout.`,
            ),
            dessin(t),
          );
        },
        // Le même, dit avec des mots.
        () => {
          const p = quelquun();
          const t = tasAuHasard(randomInt(2, 3), true, 50);
          const total = somme(t);
          return court(
            `${randomChoice([`Dans le porte-monnaie ${de(p.nom)}, il y a`, `${p.nom} a`, `Dans la tirelire ${de(p.nom)}, il y a`])} ${direTas(t)}. ${randomChoice(Q_TOTAL)}`,
            total,
            exp(
              "La valeur d'un tas, c'est la somme des valeurs de chaque billet et de chaque pièce.",
              "On commence par le plus grand, puis on ajoute le reste.",
              `${[...t].sort((a, b) => b - a).join(" + ")} = ${total}.`,
              `Il y a ${total} € en tout.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_monnaie_valeur_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_valeur_ensemble",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte la valeur, pas le nombre de pièces.",
    tags: ["ce1", "monnaie", "valeur", "piege", "template", "canvas"],
    generate: () =>
      tirer([
        // Un tas mélangé, plus gros.
        () => {
          const p = quelquun();
          const t = shuffle([...tasAuHasard(randomInt(5, 7), true, 50)]);
          const total = somme(t);
          return court(
            `${introTas(p)} Les pièces et les billets sont mélangés. ${randomChoice(Q_TOTAL)}`,
            total,
            exp(
              "La valeur d'un tas, c'est la somme des valeurs, pas le nombre d'objets.",
              "On range d'abord : les billets, puis les pièces de 2 €, puis celles de 1 €.",
              `${[...t].sort((a, b) => b - a).join(" + ")} = ${total}.`,
              `Il y a ${total} € en tout.`,
            ),
            dessin(t, false),
          );
        },
        // La pièce ou le billet caché.
        () => {
          const p = quelquun();
          const t = tasAuHasard(randomInt(3, 5), true, 20);
          const k = randomInt(0, t.length - 1);
          const total = somme(t);
          // On cache un exemplaire : on le sépare de son groupe.
          const cachee = t[k];
          const reste = [...t];
          reste.splice(k, 1);
          const els = [...tas(reste), { valeur: `${cachee}e` as Valeur, cache: true }];
          return court(
            `${randomChoice([`${p.nom} a ${total} € en tout.`, `Le porte-monnaie ${de(p.nom)} contient ${total} €.`, `Pic le paille-en-queue a ${total} € dans son nid.`])} ${randomChoice(["Que vaut la pièce ou le billet caché ?", "Combien d'euros vaut l'objet marqué « ? » ?"])}`,
            cachee,
            exp(
              "La valeur d'un tas, c'est la somme de toutes les valeurs.",
              "On compte ce qu'on voit, puis on cherche ce qui manque pour arriver au total.",
              `On voit ${somme(reste)} €. ${somme(reste)} + ${cachee} = ${total}.`,
              `L'objet caché vaut ${cachee} €.`,
            ),
            monnaie(els),
          );
        },
        // Des pièces de centimes (le piège nombre / valeur).
        () => {
          const p = quelquun();
          const piece = randomChoice([10, 20, 50] as const);
          const nb = randomChoice([2, 3, 4, 5]);
          const total = piece * nb;
          return court(
            `${randomChoice([`${p.nom} a ces pièces.`, `Voici les pièces ${de(p.nom)}.`, `${p.nom} a trouvé ces pièces dans sa poche.`])} Combien de centimes a-t-${p.il} en tout ?`,
            total,
            exp(
              "La valeur d'un tas de pièces, c'est la valeur d'une pièce répétée autant de fois qu'il y a de pièces.",
              "On compte de " + piece + " en " + piece + ".",
              `${Array.from({ length: nb }, (_, i) => piece * (i + 1)).join(", ")}${total % 100 === 0 ? ` : c'est ${total / 100} €` : ""}.`,
              `${maj(p.il)} a ${total} centimes.`,
            ),
            dessin(Array.from({ length: nb }, () => `${piece}c` as Valeur)),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_MONNAIE_COMPARER_ENSEMBLES — qui a le plus ?
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_comparer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_comparer_ensembles",
    difficulty: 3,
    theme: "neutral",
    text: "Kevin a deux pièces de 2 €. Naïla a un billet de 5 €. Qui a le plus d'argent ?",
    format: "qcm",
    choices: [
      "Naïla",
      "Kevin",
      "ils ont pareil",
      "celui qui a le plus d'objets, donc Kevin",
    ],
    expected: ["Naïla"],
    comparator: "mcq_exact",
    hint: "Calcule ce que vaut chaque tas avant de comparer.",
    explanation: exp(
      "Pour comparer deux tas d'argent, on calcule d'abord la valeur de chacun.",
      "On additionne à part, puis on compare les deux totaux.",
      "Kevin : 2 + 2 = 4 €. Naïla : 5 €. Kevin a deux pièces et Naïla un seul billet, mais 5 € est plus que 4 €.",
      "C'est Naïla qui a le plus.",
    ),
    tags: ["ce1", "monnaie", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_comparer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_comparer_ensembles",
    difficulty: 4,
    theme: "neutral",
    text: "Un billet de 5 € et une pièce de 50 centimes, ou cinq pièces de 1 € et deux pièces de 20 centimes. Quel tas vaut le plus ?",
    format: "qcm",
    choices: [
      "le premier tas",
      "le second tas",
      "les deux valent pareil",
      "le second, parce qu'il a plus de pièces",
    ],
    expected: ["le premier tas"],
    comparator: "mcq_exact",
    hint: "Compte les euros d'un côté, les centimes de l'autre.",
    explanation: exp(
      "Pour comparer deux tas, on calcule les euros et les centimes de chacun.",
      "On additionne d'abord les euros, puis les centimes, tas par tas.",
      "Premier tas : 5 € et 50 centimes, donc 5,50 €. Second tas : 5 € et 40 centimes, donc 5,40 €. Les euros sont les mêmes, ce sont les centimes qui décident : 50 > 40.",
      "Le premier tas vaut le plus.",
    ),
    tags: ["ce1", "monnaie", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_comparer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_comparer_ensembles",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule chaque porte-monnaie, puis compare les deux totaux.",
    tags: ["ce1", "monnaie", "comparer", "template", "canvas"],
    generate: () => {
      const [p, q] = deuxEnfants();
      // Le premier a PLUS de pièces ; souvent, c'est pourtant le second qui a le plus.
      let a = tasAuHasard(randomInt(4, 6), Math.random() < 0.4, 10);
      let b = tasAuHasard(randomInt(1, 3), true, 20);
      if (somme(a) === somme(b)) b = [...b, 1];
      if (Math.random() < 0.5) [a, b] = [b, a];
      const plus = Math.random() < 0.7;
      const gagnant = (plus ? somme(a) > somme(b) : somme(a) < somme(b)) ? p.nom : q.nom;
      // En mots, seulement quand les deux tas sont courts (sinon la phrase est trop longue).
      const enMots = tas(a).length + tas(b).length <= 4;
      const ex = exp(
        "Pour comparer deux tas d'argent, on calcule d'abord la valeur de chacun.",
        "On additionne chaque porte-monnaie à part, puis on compare. Le nombre de pièces ne compte pas.",
        `${p.nom} : ${somme(a)} €. ${q.nom} : ${somme(b)} €.`,
        `C'est ${gagnant}.`,
      );
      const question = plus ? "Qui a le plus d'argent ?" : "Qui a le moins d'argent ?";
      if (enMots && Math.random() < 0.4) {
        return qcm(`${p.nom} a ${direTas(a)}. ${q.nom} a ${direTas(b)}. ${question}`, gagnant, [p.nom, q.nom, "ils ont pareil"], ex);
      }
      return qcm(
        `${randomChoice(["Voici deux porte-monnaie.", "Les deux enfants vident leurs poches.", "Chacun a cassé sa tirelire.", `${p.nom} et ${q.nom} comptent leur argent.`, `${p.nom} et ${q.nom} reviennent de la kermesse.`])} ${question}`,
        gagnant,
        [p.nom, q.nom, "ils ont pareil"],
        ex,
        porteMonnaies([{ nom: p.nom, valeurs: a }, { nom: q.nom, valeurs: b }]),
      );
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_comparer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_comparer_ensembles",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les deux totaux, puis l'écart entre eux.",
    tags: ["ce1", "monnaie", "comparer", "template", "canvas"],
    generate: () => {
      const [p, q] = deuxEnfants();
      const a = tasAuHasard(randomInt(2, 5), true, 20);
      let b = tasAuHasard(randomInt(2, 5), true, 20);
      if (somme(a) === somme(b)) b = [...b, 2];
      const [riche, pauvre, tr, tp] = somme(a) > somme(b) ? [p, q, somme(a), somme(b)] : [q, p, somme(b), somme(a)];
      return tirer([
        () =>
          court(
            `${randomChoice(["Voici deux porte-monnaie.", "Les deux enfants comptent leur argent.", "Deux tirelires sont ouvertes."])} ${randomChoice([`Combien d'euros ${riche.nom} a-t-${riche.il} de plus ${que(pauvre.nom)} ?`, `Combien d'euros manque-t-il à ${pauvre.nom} pour avoir autant ${que(riche.nom)} ?`])}`,
            tr - tp,
            exp(
              "Pour comparer deux sommes, on calcule chacune, puis l'écart.",
              "On compte chaque porte-monnaie, puis on cherche ce qui manque au plus petit.",
              `${riche.nom} : ${tr} €. ${pauvre.nom} : ${tp} €. ${tp} + ${tr - tp} = ${tr}.`,
              `L'écart est de ${tr - tp} €.`,
            ),
            porteMonnaies([{ nom: p.nom, valeurs: a }, { nom: q.nom, valeurs: b }]),
          ),
        () => {
          const ecart = tr - tp;
          return qcm(
            `${p.nom} a ${somme(a)} €. Le porte-monnaie dessiné est celui ${de(q.nom)}. ${randomChoice(["Qui a le plus d'argent ?", "Qui peut acheter le jouet le plus cher ?"])}`,
            riche.nom,
            [p.nom, q.nom, "ils ont pareil"],
            exp(
              "On compte le porte-monnaie dessiné, puis on compare.",
              "Le nombre de pièces ne compte pas : seule la valeur compte.",
              `${q.nom} : ${somme(b)} €. ${p.nom} : ${somme(a)} €. Écart : ${ecart} €.`,
              `C'est ${riche.nom}.`,
            ),
            dessin(b),
          );
        },
      ]);
    },
  },

  /* =========================================================
     CE1_MONNAIE_CONSTITUER — fabriquer une somme donnée
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_constituer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_constituer",
    difficulty: 2,
    theme: "neutral",
    text: "Tu dois faire 7 € avec le moins de pièces et de billets possible. Que prends-tu ?",
    format: "qcm",
    choices: [
      "un billet de 5 € et une pièce de 2 €",
      "sept pièces de 1 €",
      "un billet de 5 € et deux pièces de 1 €",
      "trois pièces de 2 € et une de 1 €",
    ],
    expected: ["un billet de 5 € et une pièce de 2 €"],
    comparator: "mcq_exact",
    hint: "Commence toujours par la plus grande valeur possible.",
    explanation: exp(
      "Constituer une somme, c'est choisir des pièces et des billets dont le total fait exactement la somme.",
      "Pour en prendre le moins possible, on commence par la plus grande valeur qui rentre.",
      "5 € rentre dans 7 €, il reste 2 € : une seule pièce suffit. Cela fait deux objets. Les autres solutions donnent bien 7 €, mais avec plus de pièces.",
      "Un billet de 5 € et une pièce de 2 €.",
    ),
    tags: ["ce1", "monnaie", "constituer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_constituer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_constituer",
    difficulty: 4,
    theme: "neutral",
    text: "Tu dois payer 3,20 € exactement. Que prends-tu ?",
    format: "qcm",
    choices: [
      "une pièce de 2 €, une de 1 € et une de 20 centimes",
      "trois pièces de 1 € et deux de 10 centimes",
      "une pièce de 2 € et une de 1 €",
      "trois pièces de 1 € et une de 2 centimes",
    ],
    expected: ["une pièce de 2 €, une de 1 € et une de 20 centimes"],
    comparator: "mcq_exact",
    hint: "3,20 €, c'est 3 euros et 20 centimes. Fais les deux parties séparément.",
    explanation: exp(
      "Une somme à virgule se fabrique en deux morceaux : les euros, puis les centimes.",
      "On lit devant la virgule pour les euros, derrière pour les centimes.",
      "3,20 € fait 3 euros et 20 centimes. Pour 3 € : 2 € + 1 €. Pour 20 centimes : une pièce de 20 centimes. Trois pièces de 1 € et deux de 10 centimes donnent aussi le compte, mais avec cinq pièces au lieu de trois.",
      "Une pièce de 2 €, une de 1 € et une de 20 centimes.",
    ),
    tags: ["ce1", "monnaie", "constituer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_constituer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_constituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte ce qui est déjà posé, puis cherche ce qui manque.",
    tags: ["ce1", "monnaie", "constituer", "template", "canvas"],
    generate: () =>
      tirer([
        // Il manque une pièce ou un billet pour faire la somme.
        () => {
          const p = quelquun();
          const manque = randomChoice([1, 2, 5, 10] as const);
          const deja = tasAuHasard(randomInt(1, 3), Math.random() < 0.6, 10);
          const prix = somme(deja) + manque;
          const nom = (x: number) => (x >= 5 ? `un billet de ${x} €` : `une pièce de ${x} €`);
          return qcm(
            `${coute(prix)} ${p.nom} a déjà posé cet argent. ${randomChoice(["Que doit-" + p.il + " ajouter ?", "Quelle pièce ou quel billet manque ?"])}`,
            nom(manque),
            [1, 2, 5, 10, 20].filter((x) => x !== manque).map(nom),
            exp(
              "Constituer une somme, c'est compléter jusqu'au prix exact.",
              "On compte ce qui est posé, puis on cherche ce qui manque.",
              `Déjà posé : ${somme(deja)} €. ${somme(deja)} + ${manque} = ${prix}.`,
              `Il faut ajouter ${nom(manque)}.`,
            ),
            dessin(deja),
          );
        },
        // Quel porte-monnaie fait exactement la somme ?
        () => {
          const p = quelquun();
          const cible = randomInt(6, 25);
          const bon = rendreMinimal(cible);
          const faux1 = rendreMinimal(cible + randomChoice([1, 2]));
          const faux2 = rendreMinimal(cible - randomChoice([1, 2, 3]));
          const groupes = shuffle([
            { v: bon, ok: true },
            { v: faux1, ok: false },
            { v: faux2, ok: false },
          ]).map((g, i) => ({ ...g, nom: ["A", "B", "C"][i] }));
          const bonNom = groupes.find((g) => g.ok)!.nom;
          return qcm(
            `${randomChoice([`${p.nom} doit payer exactement ${cible} €.`, `Le ticket coûte ${cible} €.`, `${p.nom} veut offrir ${cible} € à sa sœur.`])} Quel porte-monnaie a juste la bonne somme ?`,
            `le porte-monnaie ${bonNom}`,
            ["le porte-monnaie A", "le porte-monnaie B", "le porte-monnaie C"],
            exp(
              "Constituer une somme, c'est réunir des pièces et des billets dont le total est exact.",
              "On compte chaque porte-monnaie, puis on garde celui qui fait la somme demandée.",
              groupes.map((g) => `${g.nom} : ${somme(g.v)} €`).join(". ") + ".",
              `C'est le porte-monnaie ${bonNom}.`,
            ),
            porteMonnaies(groupes.map((g) => ({ nom: g.nom, valeurs: g.v }))),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_monnaie_constituer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_constituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Prends d'abord le billet, puis complète avec des pièces.",
    tags: ["ce1", "monnaie", "constituer", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const billet = randomChoice([5, 10, 20] as const);
      const piece = randomChoice([1, 2] as const);
      const nb = randomInt(1, piece === 1 ? 5 : 4);
      const total = billet + piece * nb;
      const intro = randomChoice([
        `${p.nom} doit faire ${total} € avec ce billet et des pièces de ${piece} €.`,
        `${coute(total)} ${p.nom} pose ce billet, puis des pièces de ${piece} €.`,
        `${p.nom} veut mettre ${total} € dans sa tirelire. ${maj(p.il)} a déjà ce billet, et des pièces de ${piece} €.`,
      ]);
      return court(
        `${intro} ${randomChoice([`Combien de pièces de ${piece} € faut-il ?`, `Combien de pièces de ${piece} € ajoute-t-${p.il} ?`])}`,
        nb,
        exp(
          "Constituer une somme, c'est compléter jusqu'à la somme demandée.",
          "On pose d'abord le billet, puis on cherche ce qui manque.",
          `${total} - ${billet} = ${total - billet}. ${total - billet} €, c'est ${nb} ${pl(nb, "pièce", "pièces")} de ${piece} €.`,
          `Il faut ${nb} ${pl(nb, "pièce", "pièces")}.`,
        ),
        dessin([billet]),
      );
    },
  },

  /* =========================================================
     CE1_MONNAIE_RENDRE — simuler un achat, rendre la monnaie
     Rendre la monnaie, c'est compléter : on part du prix et on
     remonte jusqu'à ce qui a été donné.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_rendre_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_rendre",
    difficulty: 2,
    theme: "reunion",
    text: "Au camion-bar, un bonbon piment coûte 3 €. Tu donnes un billet de 5 €. Combien te rend-on, en euros ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "De 3 à 5, combien manque-t-il ?",
    explanation: exp(
      "Rendre la monnaie, c'est donner la différence entre ce qu'on a payé et le prix.",
      "On part du prix et on compte ce qui manque pour arriver à la somme donnée.",
      "De 3 à 5, il manque 2 : 3 + 2 = 5.",
      "On te rend 2 €.",
    ),
    tags: ["ce1", "monnaie", "rendre", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_rendre_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_rendre",
    difficulty: 4,
    theme: "neutral",
    text: "Un cahier coûte 2,50 €. Tu donnes 3 €. Combien te rend-on, en centimes ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "2,50 €, c'est 2 euros et 50 centimes. Combien manque-t-il pour 3 € ?",
    explanation: exp(
      "Rendre la monnaie, c'est compléter jusqu'à la somme donnée.",
      "On repart du prix et on ajoute ce qui manque pour arriver au compte.",
      "2 euros et 50 centimes, plus 50 centimes, font 3 euros. Il manquait donc 50 centimes.",
      "On te rend 50 centimes.",
    ),
    tags: ["ce1", "monnaie", "rendre", "piege"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_rendre_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_rendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte ce qui manque pour aller du prix jusqu'au billet.",
    tags: ["ce1", "monnaie", "rendre", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const a = randomChoice(ACHATS);
      const billet = randomChoice(BILLETS.filter((b) => b > a.min && b <= 20));
      const prix = prixDe(a, billet - 1);
      const rendu = billet - prix;
      const ex = exp(
        "Rendre la monnaie, c'est donner la différence entre la somme donnée et le prix.",
        "On part du prix et on compte ce qui manque pour arriver au billet.",
        `De ${prix} à ${billet}, il manque ${rendu} : ${prix} + ${rendu} = ${billet}.`,
        `On rend ${rendu} €.`,
      );
      return tirer([
        () =>
          court(
            `${coute(prix)} ${p.nom} paie avec ce billet. ${randomChoice([`Combien d'euros lui rend-on ?`, "Combien le vendeur rend-il, en euros ?", `Combien d'euros ${p.nom} récupère-t-${p.il} ?`])}`,
            rendu,
            ex,
            dessin([billet]),
          ),
        () =>
          court(
            `${maj(a.lieu)}, ${p.nom} achète ${a.quoi} à ${prix} €. ${maj(p.il)} donne un billet de ${billet} €. ${randomChoice(["Combien lui rend-on, en euros ?", "Quelle monnaie lui rend-on, en euros ?"])}`,
            rendu,
            ex,
          ),
      ]);
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_rendre_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_rendre",
    difficulty: 4,
    theme: "neutral",
    hint: "Monte du prix jusqu'à la somme donnée : d'abord jusqu'à la dizaine, puis le reste.",
    tags: ["ce1", "monnaie", "rendre", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      return tirer([
        // Un prix à deux chiffres, un grand billet.
        () => {
          const billet = randomChoice([20, 50] as const);
          const prix = randomInt(billet === 20 ? 11 : 21, billet - 3);
          const rendu = billet - prix;
          const dizSup = Math.ceil(prix / 10) * 10;
          return court(
            `${coute(prix)} ${p.nom} donne ce billet. ${randomChoice(["Combien lui rend-on, en euros ?", "Combien d'euros doit-on lui rendre ?"])}`,
            rendu,
            exp(
              "Rendre la monnaie, c'est compléter du prix jusqu'à la somme donnée.",
              "On monte d'abord jusqu'à la dizaine suivante, puis jusqu'au billet.",
              dizSup === prix ? `${prix} + ${rendu} = ${billet}.` : `${prix} + ${dizSup - prix} = ${dizSup}, puis ${dizSup} + ${billet - dizSup} = ${billet}. En tout : ${rendu}.`,
              `On lui rend ${rendu} €.`,
            ),
            dessin([billet]),
          );
        },
        // L'autre bout : on voit la monnaie rendue, on cherche le prix.
        () => {
          const billet = randomChoice([10, 20] as const);
          const rendu = randomInt(2, billet - 2);
          const prix = billet - rendu;
          return court(
            `${p.nom} paie ${objetA(prix).quoi} avec un billet de ${billet} €. Le vendeur lui rend cette monnaie. ${randomChoice(["Combien coûtait l'achat, en euros ?", "Quel était le prix, en euros ?"])}`,
            prix,
            exp(
              "Le prix plus la monnaie rendue font la somme donnée.",
              "On compte la monnaie rendue, puis on l'enlève au billet.",
              `Monnaie rendue : ${rendu} €. ${billet} - ${rendu} = ${prix}.`,
              `L'achat coûtait ${prix} €.`,
            ),
            dessin(rendreMinimal(rendu)),
          );
        },
      ]);
    },
  },

  /* =========================================================
     CE1_MONNAIE_PROBLEME — un problème de monnaie
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_probleme_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Malia achète un cahier à 3 € et un stylo à 2 €. Elle donne un billet de 10 €. Combien lui rend-on, en euros ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche d'abord ce qu'elle dépense en tout.",
    explanation: exp(
      "Un problème en deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On additionne les achats, puis on enlève ce total à la somme donnée.",
      "Les achats font 3 + 2 = 5 €. On rend 10 - 5 = 5 €.",
      "On lui rend 5 €.",
    ),
    tags: ["ce1", "monnaie", "probleme", "reunion", "deux_etapes"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_probleme_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Kevin a 8 €. Il veut acheter un jeu à 12 €. Combien lui manque-t-il ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Ce qui manque, c'est l'écart entre ce qu'il a et le prix.",
    explanation: exp(
      "Chercher ce qui manque, c'est chercher l'écart entre deux sommes.",
      "On part de ce qu'on a et on compte jusqu'au prix.",
      "De 8 à 12, il manque 4 : 8 + 4 = 12.",
      "Il lui manque 4 €.",
    ),
    tags: ["ce1", "monnaie", "probleme"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_probleme_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne d'abord les deux achats.",
    tags: ["ce1", "monnaie", "probleme", "deux_etapes", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const [a1, a2] = shuffle(ACHATS.filter((a) => a.min <= 8)).slice(0, 2);
      const prix1 = prixDe(a1, 9);
      const prix2 = prixDe(a2, 9);
      const total = prix1 + prix2;
      return tirer([
        // Deux achats, un billet : combien rend-on ?
        () => {
          const billet = total < 10 ? 10 : 20;
          const rendu = billet - total;
          return court(
            `${p.nom} achète ${a1.quoi} à ${prix1} € et ${a2.quoi} à ${prix2} €. ${maj(p.il)} donne un billet de ${billet} €. ${randomChoice(["Combien lui rend-on, en euros ?", "Quelle monnaie reçoit-" + p.il + ", en euros ?"])}`,
            rendu,
            exp(
              "Un problème en deux étapes se résout dans l'ordre.",
              "On additionne les achats, puis on cherche l'écart avec le billet.",
              `${prix1} + ${prix2} = ${total}. ${billet} - ${total} = ${rendu}.`,
              `On lui rend ${rendu} €.`,
            ),
          );
        },
        // Le porte-monnaie dessiné : que reste-t-il après deux achats ?
        () => {
          const avoir = rendreMinimal(total + randomInt(1, 9));
          const reste = somme(avoir) - total;
          return court(
            `${introTas(p, true)} ${maj(p.il)} achète ${a1.quoi} à ${prix1} € et ${a2.quoi} à ${prix2} €. Combien d'euros lui reste-t-il ?`,
            reste,
            exp(
              "Un problème en deux étapes se résout dans l'ordre.",
              "On compte l'argent, on additionne les achats, puis on enlève.",
              `Argent : ${somme(avoir)} €. Achats : ${prix1} + ${prix2} = ${total}. ${somme(avoir)} - ${total} = ${reste}.`,
              `Il lui reste ${reste} €.`,
            ),
            dessin(avoir),
          );
        },
      ]);
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_probleme_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce qui manque, c'est l'écart entre ce qu'on a et le prix.",
    tags: ["ce1", "monnaie", "probleme", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      return tirer([
        // Le porte-monnaie dessiné : combien manque-t-il ?
        () => {
          const avoir = tasAuHasard(randomInt(2, 4), Math.random() < 0.5, 10);
          const manque = randomInt(1, 9);
          const prix = somme(avoir) + manque;
          return court(
            `${introTas(p, true)} ${maj(p.il)} veut ${objetA(prix).quoi} à ${prix} €. Combien d'euros lui manque-t-il ?`,
            manque,
            exp(
              "Chercher ce qui manque, c'est chercher l'écart entre deux sommes.",
              "On compte l'argent, puis on compte jusqu'au prix.",
              `${p.nom} a ${somme(avoir)} €. ${somme(avoir)} + ${manque} = ${prix}.`,
              `Il lui manque ${manque} €.`,
            ),
            dessin(avoir),
          );
        },
        // En mots.
        () => {
          const possede = randomInt(3, 15);
          const manque = randomInt(2, 9);
          const prix = possede + manque;
          return court(
            `${p.nom} a ${possede} €. ${coute(prix)} ${randomChoice(["Combien d'euros lui manque-t-il ?", "Combien d'euros doit-" + p.il + " encore économiser ?"])}`,
            manque,
            exp(
              "Chercher ce qui manque, c'est chercher l'écart entre deux sommes.",
              "On part de ce qu'on a et on compte jusqu'au prix.",
              `De ${possede} à ${prix}, il manque ${manque} : ${possede} + ${manque} = ${prix}.`,
              `Il lui manque ${manque} €.`,
            ),
          );
        },
        // Ce qui reste après un achat.
        () => {
          const avoir = tasAuHasard(randomInt(2, 4), true, 20);
          const prix = randomInt(1, somme(avoir) - 1);
          return court(
            `${introTas(p, true)} ${maj(p.il)} achète ${objetA(prix).quoi} à ${prix} €. Combien d'euros lui reste-t-il ?`,
            somme(avoir) - prix,
            exp(
              "Ce qui reste, c'est ce qu'on avait moins ce qu'on dépense.",
              "On compte l'argent, puis on enlève le prix.",
              `${somme(avoir)} - ${prix} = ${somme(avoir) - prix}.`,
              `Il lui reste ${somme(avoir) - prix} €.`,
            ),
            dessin(avoir),
          );
        },
      ]);
    },
  },

  /* =========================================================
     CE1_MONNAIE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux enfants écrivent la même somme. Léa écrit 2,50 €, Kevin écrit « 250 centimes ». Qui a raison ?",
    format: "qcm",
    choices: [
      "les deux : c'est la même somme",
      "Léa seulement",
      "Kevin seulement",
      "aucun des deux",
    ],
    expected: ["les deux : c'est la même somme"],
    comparator: "mcq_exact",
    hint: "Transforme les 2 euros en centimes, puis ajoute.",
    explanation: exp(
      "Une même somme peut s'écrire en euros avec une virgule, ou tout en centimes.",
      "On ramène les deux écritures à la même unité, ici le centime.",
      "2 € = 200 centimes. On ajoute les 50 centimes : 200 + 50 = 250. Léa et Kevin ont écrit la même somme.",
      "Les deux ont raison.",
    ),
    tags: ["ce1", "monnaie", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Tu as 5 €. Un samoussa coûte 1 €. Peux-tu en acheter 6 ?",
    format: "qcm",
    choices: [
      "non, il en manque un : 6 samoussas coûtent 6 €",
      "oui, tout juste",
      "oui, et il te reste 1 €",
      "non, tu ne peux en acheter que 4",
    ],
    expected: ["non, il en manque un : 6 samoussas coûtent 6 €"],
    comparator: "mcq_exact",
    hint: "Combien coûtent 6 samoussas ? Compare à ce que tu as.",
    explanation: exp(
      "Pour savoir si on peut payer, on compare le prix total à ce qu'on a.",
      "On calcule d'abord le prix de tous les samoussas, puis on compare.",
      "6 samoussas à 1 € font 6 €. Or tu n'as que 5 € : il manque 1 €. Avec 5 €, tu peux en acheter 5.",
      "Non : il manque 1 €.",
    ),
    tags: ["ce1", "monnaie", "defi", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Combien de fois le prix tient-il dans ce que tu as ?",
    tags: ["ce1", "monnaie", "defi", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const prix = randomChoice([2, 3, 4, 5]);
      const nb = randomInt(2, 5);
      const reste = Math.random() < 0.4 ? randomInt(1, prix - 1) : 0;
      const total = prix * nb + reste;
      const objet = randomChoice([
        { un: "ticket de manège", des: "tickets de manège" },
        { un: "sachet de billes", des: "sachets de billes" },
        { un: "paquet de gommettes", des: "paquets de gommettes" },
        { un: "petit dinosaure en plastique", des: "petits dinosaures en plastique" },
        { un: "cornet de glace", des: "cornets de glace" },
        { un: "ballon de baudruche", des: "ballons de baudruche" },
        { un: "sachet de graines de tournesol", des: "sachets de graines de tournesol" },
        { un: "livre d'occasion", des: "livres d'occasion" },
      ]);
      const avecDessin = Math.random() < 0.5;
      const intro = avecDessin ? introTas(p, true) : `${p.nom} a ${total} €.`;
      const q = reste && Math.random() < 0.5
        ? { t: `Combien d'euros lui restera-t-il ${p.il === "il" ? "s'il" : "si elle"} en achète le plus possible ?`, r: reste, c: `${prix} × ${nb} = ${prix * nb}, il reste ${total} - ${prix * nb} = ${reste}.` }
        : { t: `Combien de ${objet.des} peut-${p.il} acheter, au plus ?`, r: nb, c: `${prix} × ${nb} = ${prix * nb}${reste ? `, et il reste ${reste} €, pas assez pour un de plus` : ""}.` };
      return court(
        `${intro} Un ${objet.un} coûte ${prix} €. ${q.t}`,
        q.r,
        exp(
          "Chercher combien de fois on peut payer, c'est faire des groupes de la taille du prix.",
          "On ajoute le prix encore et encore, sans dépasser ce qu'on a.",
          `${p.nom} a ${total} €. ${q.c}`,
          `La réponse est ${q.r}.`,
        ),
        avecDessin ? dessin(rendreMinimal(total)) : undefined,
      );
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par le plus grand billet qui rentre.",
    tags: ["ce1", "monnaie", "defi", "piege", "template"],
    generate: () =>
      tirer([
        // Le moins de pièces et de billets possible.
        () => {
          const p = quelquun();
          const n = randomInt(8, 99);
          const t = rendreMinimal(n);
          return court(
            randomChoice([
              `${p.nom} doit payer ${n} € avec le moins de pièces et de billets possible. Combien de pièces et billets lui faut-il ?`,
              `Défi : faire ${n} € avec le moins de pièces et de billets. Combien en faut-il ?`,
              `Le banquier du jeu doit donner ${n} € à ${p.nom}, avec le moins de billets et de pièces. Combien en donne-t-il ?`,
            ]),
            t.length,
            exp(
              "Pour prendre le moins d'objets possible, on commence par la plus grande valeur qui rentre.",
              "On prend le plus grand billet possible, puis on recommence avec ce qui reste.",
              `${n} = ${t.join(" + ")}.`,
              `Il en faut ${t.length}.`,
            ),
          );
        },
        // Euros et centimes : tout en centimes.
        () => {
          const p = quelquun();
          const e = randomInt(1, 6);
          const c = randomChoice([5, 10, 20, 25, 50] as const);
          const totalCentimes = e * 100 + c;
          const bonne = `${totalCentimes} centimes`;
          return qcm(
            randomChoice([`Combien de centimes vaut ${euros(e, c)} ?`, `${p.nom} veut écrire ${euros(e, c)} tout en centimes. Que trouve-t-${p.il} ?`]),
            bonne,
            [`${e * 10 + c} centimes`, `${e + c} centimes`, `${e * 100} centimes`, `${totalCentimes + 100} centimes`],
            exp(
              "1 euro vaut 100 centimes.",
              "On transforme d'abord les euros en centimes, puis on ajoute les centimes.",
              `${e} € = ${e * 100} centimes. ${e * 100} + ${c} = ${totalCentimes}.`,
              `${euros(e, c)} vaut ${totalCentimes} centimes.`,
            ),
          );
        },
      ]),
  },
];
