// lib/tutor-v4/questionBank/ce1/maths/probleme.bank.ts
//
// La résolution de problèmes du CE1, écrite à la main. Le programme la place
// au cœur de l'activité mathématique : « les élèves doivent traiter au moins
// dix problèmes par semaine ».
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2). Cinq
// structures nommées, et pas une de plus :
//   — additifs en une étape, de type PARTIES-TOUT ;
//   — additifs de COMPARAISON en une étape ;
//   — additifs en DEUX étapes ;
//   — MULTIPLICATIFS en une étape — y compris les partages équitables :
//     chercher le nombre de parts, ou la valeur d'une part ;
//   — MIXTES en deux étapes, une additive et une multiplicative.
// ⚠️ Ni comparaison multiplicative ni produit cartésien : ce n'est pas le CE1.
//
// L'outil de modélisation nommé par le programme est le SCHÉMA EN BARRE, avec
// le déplacement sur un axe pour les transformations.
//
// LE PIÈGE DE LA NOTION, et le programme demande explicitement de l'entraîner :
// « des énoncés comportant le mot "plus" alors que l'opération à effectuer est
// une soustraction ». On automatise le mot-clé au lieu de comprendre l'histoire.
//
// Les nombres restent dans le millier.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"` — sauf ceux qui demandent quelle opération choisir. On écrit
// quand même en QCM : c'est plus sûr, et cela se clique aussi bien.

import type { SchemaBarreCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function schemaBarre(data: Omit<SchemaBarreCanvasData, "kind">): SchemaBarreCanvasData {
  return { kind: "schema_barre", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Prénoms et lieux de l'île, pour que les énoncés parlent d'ici. */
const PRENOMS = ["Malia", "Kevin", "Naïla", "Ryan", "Élia", "Noa"] as const;

export const problemeBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_PROBLEME_OPERATION — choisir l'opération
     LE piège : le mot « plus » dans un énoncé où il faut
     soustraire. Le programme demande de l'entraîner exprès.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_probleme_operation_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_operation",
    difficulty: 3,
    theme: "neutral",
    text: "« Léo a 188 billes. Lucie en a 75 de PLUS que Léo. Combien Lucie a-t-elle de billes ? » Quelle opération faut-il faire ?",
    format: "qcm",
    choices: ["une addition", "une soustraction", "une multiplication", "aucune"],
    expected: ["une addition"],
    comparator: "mcq_exact",
    hint: "Qui a le plus des deux ? C'est celui-là qu'on cherche.",
    explanation: exp(
      "Choisir l'opération, c'est comprendre l'histoire, pas repérer un mot.",
      "On se demande si la quantité cherchée est plus grande ou plus petite que celle qu'on connaît.",
      "Lucie a plus de billes que Léo : on cherche donc un nombre plus grand que 188. On ajoute : 188 + 75 = 263.",
      "Il faut faire une addition.",
    ),
    tags: ["ce1", "probleme", "operation", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_probleme_operation_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_operation",
    difficulty: 5,
    theme: "neutral",
    text: "« Léo a 188 billes. Il en a 75 de PLUS que Lucie. Combien Lucie a-t-elle de billes ? » Quelle opération faut-il faire ?",
    format: "qcm",
    choices: ["une soustraction", "une addition", "une multiplication", "aucune"],
    expected: ["une soustraction"],
    comparator: "mcq_exact",
    hint: "Attention : cette fois, c'est Léo qui en a le plus.",
    explanation: exp(
      "Le mot « plus » ne dit pas toujours qu'il faut additionner : c'est l'histoire qui décide.",
      "On repère qui possède le plus, puis on regarde qui on cherche.",
      "Ici, c'est Léo qui a 75 billes de plus. Lucie en a donc MOINS : on enlève. 188 - 75 = 113.",
      "Il faut faire une soustraction, malgré le mot « plus ».",
    ),
    tags: ["ce1", "probleme", "operation", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_probleme_operation_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_operation",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi si ce qu'on cherche est plus grand ou plus petit.",
    tags: ["ce1", "probleme", "operation", "piege", "template"],
    generate: () => {
      const [a, b] = shuffle(PRENOMS).slice(0, 2);
      const grand = randomInt(120, 400);
      const ecart = randomInt(20, 90);
      const versLeHaut = randomChoice([true, false]);
      const bonne = versLeHaut ? "une addition" : "une soustraction";
      return {
        text: versLeHaut
          ? `« ${a} a ${grand} images. ${b} en a ${ecart} de plus que ${a}. Combien ${b} a-t-il d'images ? » Quelle opération faut-il faire ?`
          : `« ${a} a ${grand} images. ${a} en a ${ecart} de plus que ${b}. Combien ${b} a-t-il d'images ? » Quelle opération faut-il faire ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          versLeHaut ? "une soustraction" : "une addition",
          "une multiplication",
          "il n'y a pas assez de renseignements",
          "il faut faire les deux",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le mot « plus » ne décide pas de l'opération : c'est l'histoire qui décide.",
          "On cherche qui possède le plus, puis on regarde de qui on parle dans la question.",
          versLeHaut
            ? `${b} en a plus que ${a} : on cherche un nombre plus grand que ${grand}, donc on ajoute.`
            : `C'est ${a} qui en a le plus. ${b} en a donc moins que ${grand} : on enlève.`,
          `Il faut faire ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROBLEME_ADD_SOUS — parties-tout en une étape
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_probleme_parties_tout_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_add_sous",
    difficulty: 3,
    theme: "neutral",
    text: "Dans mes deux coffres, j'ai 227 billes. J'en ai 113 dans mon coffre vert. Combien y en a-t-il dans le coffre rouge ?",
    format: "short",
    expected: ["114"],
    comparator: "number_equal",
    hint: "Le tout est connu, une partie aussi : cherche l'autre partie.",
    explanation: exp(
      "Un problème parties-tout met en jeu un total et ses deux parties.",
      "Quand le tout et une partie sont connus, on enlève la partie au tout.",
      "227 - 113 = 114. On vérifie : 113 + 114 = 227.",
      "Il y a 114 billes dans le coffre rouge.",
    ),
    canvas: schemaBarre({
      total: "227 billes",
      parts: [
        { label: "coffre vert", value: "113" },
        { label: "coffre rouge", unknown: true },
      ],
      display: { showTotal: true, showPartLabels: true, showValues: true },
    }),
    tags: ["ce1", "probleme", "parties_tout", "canvas"],
  },
  {
    kind: "template",
    id: "ce1_probleme_parties_tout_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_add_sous",
    difficulty: 3,
    theme: "reunion",
    hint: "Deux parties connues : on les réunit.",
    tags: ["ce1", "probleme", "parties_tout", "reunion", "template"],
    generate: () => {
      const qui = randomChoice(PRENOMS);
      const a = randomInt(50, 400);
      const b = randomInt(30, 300);
      const total = a + b;
      const contexte = randomChoice([
        { quoi: "letchis", ou: "dans le jardin de son papi" },
        { quoi: "coquillages", ou: "sur la plage de l'Étang-Salé" },
        { quoi: "graines de vacoa", ou: "au bord du sentier" },
      ]);
      return {
        text: `${qui} ramasse ${a} ${contexte.quoi} ${contexte.ou} le matin, et ${b} l'après-midi. Combien en a-t-${qui === "Kevin" || qui === "Ryan" || qui === "Noa" ? "il" : "elle"} ramassé en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème parties-tout met en jeu deux parties et leur total.",
          "Quand les deux parties sont connues, on les additionne pour trouver le tout.",
          `${a} + ${b} = ${total}.`,
          `${qui} en a ramassé ${total}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_probleme_parties_tout_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_add_sous",
    difficulty: 4,
    theme: "neutral",
    hint: "Le tout est connu : enlève la partie que tu connais.",
    tags: ["ce1", "probleme", "parties_tout", "template", "canvas"],
    generate: () => {
      const total = randomInt(150, 800);
      const partie = randomInt(40, total - 30);
      const reste = total - partie;
      const contexte = randomChoice([
        { objet: "photos", lieu: "un album", verbe: "contenir" },
        { objet: "livres", lieu: "une étagère", verbe: "contenir" },
        { objet: "images", lieu: "une boite", verbe: "contenir" },
      ]);
      return {
        text: `${contexte.lieu.charAt(0).toUpperCase()}${contexte.lieu.slice(1)} contient ${total} ${contexte.objet} en tout. ${partie} sont déjà rangées. Combien en reste-t-il à ranger ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème parties-tout met en jeu un total et ses deux parties.",
          "Quand le tout et une partie sont connus, on enlève la partie au tout.",
          `${total} - ${partie} = ${reste}. On vérifie : ${partie} + ${reste} = ${total}.`,
          `Il en reste ${reste} à ranger.`,
        ),
        canvas: schemaBarre({
          total: String(total),
          parts: [
            { label: "déjà rangées", value: String(partie) },
            { label: "à ranger", unknown: true },
          ],
          display: { showTotal: true, showPartLabels: true, showValues: true },
        }),
      };
    },
  },

  /* =========================================================
     CE1_PROBLEME_COMPARAISON — l'écart entre deux quantités
     Le programme le modélise par DEUX barres.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_probleme_comparaison_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_comparaison",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'école, il y a 111 garçons et 257 filles. Combien y a-t-il de filles de plus que de garçons ?",
    format: "short",
    expected: ["146"],
    comparator: "number_equal",
    hint: "L'écart, c'est ce qui sépare les deux nombres.",
    explanation: exp(
      "Un problème de comparaison cherche l'ÉCART entre deux quantités.",
      "On enlève la plus petite quantité à la plus grande.",
      "257 - 111 = 146. On vérifie : 111 + 146 = 257.",
      "Il y a 146 filles de plus que de garçons.",
    ),
    tags: ["ce1", "probleme", "comparaison"],
  },
  {
    kind: "template",
    id: "ce1_probleme_comparaison_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_comparaison",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche ce qui sépare les deux nombres.",
    tags: ["ce1", "probleme", "comparaison", "template"],
    generate: () => {
      const [a, b] = shuffle(PRENOMS).slice(0, 2);
      const petit = randomInt(40, 300);
      const ecart = randomInt(15, 150);
      const grand = petit + ecart;
      const objet = randomChoice(["billes", "images", "cartes", "autocollants"]);
      return {
        text: `${a} a ${grand} ${objet} et ${b} en a ${petit}. Combien ${a} en a-t-il de plus que ${b} ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème de comparaison cherche l'écart entre deux quantités.",
          "On enlève la plus petite quantité à la plus grande.",
          `${grand} - ${petit} = ${ecart}. On vérifie : ${petit} + ${ecart} = ${grand}.`,
          `${a} en a ${ecart} de plus.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_probleme_comparaison_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_comparaison",
    difficulty: 5,
    theme: "neutral",
    hint: "Celui dont on parle en dernier en a MOINS.",
    tags: ["ce1", "probleme", "comparaison", "piege", "template"],
    generate: () => {
      const [a, b] = shuffle(PRENOMS).slice(0, 2);
      const grand = randomInt(100, 500);
      const ecart = randomInt(20, 90);
      const petit = grand - ecart;
      return {
        text: `${a} a ${grand} € dans sa tirelire. ${a} a ${ecart} € de plus que ${b}. Combien ${b} a-t-il dans sa tirelire ?`,
        format: "short",
        expected: [String(petit)],
        comparator: "number_equal",
        explanation: exp(
          "Le mot « plus » ne dit pas qu'il faut additionner : il faut regarder de qui on parle.",
          "On repère celui qui en a le plus, puis on enlève l'écart pour trouver l'autre.",
          `C'est ${a} qui a le plus. ${b} en a donc moins : ${grand} - ${ecart} = ${petit}.`,
          `${b} a ${petit} €.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROBLEME_DEUX_ETAPES — deux calculs à la suite
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_probleme_deux_etapes_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_deux_etapes",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la bibliothèque de classe, il y a 83 livres. Le professeur en apporte 18 de plus. Les élèves en empruntent 27. Combien reste-t-il de livres ?",
    format: "short",
    expected: ["74"],
    comparator: "number_equal",
    hint: "Fais les choses dans l'ordre : d'abord ce qui arrive, ensuite ce qui part.",
    explanation: exp(
      "Un problème en deux étapes demande deux calculs, l'un après l'autre.",
      "On suit l'ordre de l'histoire : on ajoute ce qui arrive, on enlève ce qui part.",
      "83 + 18 = 101 livres. Puis 101 - 27 = 74.",
      "Il reste 74 livres.",
    ),
    tags: ["ce1", "probleme", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce1_probleme_deux_etapes_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_deux_etapes",
    difficulty: 4,
    theme: "reunion",
    hint: "Cherche d'abord le total des deux achats.",
    tags: ["ce1", "probleme", "deux_etapes", "reunion", "template"],
    generate: () => {
      const qui = randomChoice(PRENOMS);
      const prix1 = randomInt(3, 20);
      const prix2 = randomInt(3, 25);
      const donne = prix1 + prix2 <= 30 ? 50 : 100;
      const rendu = donne - prix1 - prix2;
      return {
        text: `${qui} achète une tarte à ${prix1} € et un gâteau à ${prix2} €. ${qui} donne un billet de ${donne} €. Combien la vendeuse doit-elle rendre ?`,
        format: "short",
        expected: [String(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème en deux étapes demande deux calculs, l'un après l'autre.",
          "On cherche d'abord le total des achats, puis on l'enlève à la somme donnée.",
          `${prix1} + ${prix2} = ${prix1 + prix2} €. Puis ${donne} - ${prix1 + prix2} = ${rendu} €.`,
          `Elle doit rendre ${rendu} €.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_probleme_deux_etapes_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_deux_etapes",
    difficulty: 4,
    theme: "neutral",
    hint: "Des enfants descendent, d'autres montent : suis l'ordre.",
    tags: ["ce1", "probleme", "deux_etapes", "template"],
    generate: () => {
      const depart = randomInt(20, 60);
      const descendent = randomInt(5, depart - 5);
      const montent = randomInt(3, 20);
      const fin = depart - descendent + montent;
      return {
        text: `Il y avait ${depart} enfants dans le bus. Au premier arrêt, ${descendent} enfants sont descendus. Au deuxième arrêt, ${montent} enfants sont montés. Combien y a-t-il d'enfants dans le bus maintenant ?`,
        format: "short",
        expected: [String(fin)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème en deux étapes se résout dans l'ordre où les choses se passent.",
          "On enlève ceux qui descendent, puis on ajoute ceux qui montent.",
          `${depart} - ${descendent} = ${depart - descendent}, puis ${depart - descendent} + ${montent} = ${fin}.`,
          `Il y a ${fin} enfants dans le bus.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROBLEME_MULTIPLICATIF — une étape
     Le programme y range TROIS questions : la valeur du tout,
     le nombre de parts, et la valeur d'une part.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_probleme_multiplicatif_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_multiplicatif",
    difficulty: 3,
    theme: "neutral",
    text: "Paul apporte 8 paquets de biscuits. Il y a 7 biscuits dans chaque paquet. Combien y a-t-il de biscuits en tout ?",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Huit fois sept.",
    explanation: exp(
      "Quand un tout est fait de plusieurs parts de MÊME valeur, on multiplie.",
      "On repère la valeur d'une part et le nombre de parts.",
      "8 paquets de 7 biscuits : 8 × 7 = 56.",
      "Il y a 56 biscuits.",
    ),
    tags: ["ce1", "probleme", "multiplicatif"],
  },
  {
    kind: "fixed",
    id: "ce1_probleme_multiplicatif_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_multiplicatif",
    difficulty: 4,
    theme: "neutral",
    text: "Il y a 60 élèves de CE1 dans l'école. La directrice constitue des équipes de 5 élèves. Combien y aura-t-il d'équipes ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Combien de fois 5 tient-il dans 60 ?",
    explanation: exp(
      "Chercher le nombre de parts, c'est faire des groupements.",
      "On cherche combien de fois la valeur d'une équipe tient dans le total.",
      "5 × 12 = 60 : il faut 12 équipes de 5 élèves pour placer les 60 élèves.",
      "Il y aura 12 équipes.",
    ),
    tags: ["ce1", "probleme", "multiplicatif", "groupement"],
  },
  {
    kind: "template",
    id: "ce1_probleme_multiplicatif_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_multiplicatif",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche combien de fois la part tient dans le tout.",
    tags: ["ce1", "probleme", "multiplicatif", "template"],
    generate: () => {
      const parPart = randomChoice([2, 5, 10] as const);
      const nbParts = randomInt(3, 12);
      const total = parPart * nbParts;
      const cherche = randomChoice(["tout", "parts"] as const);
      const contexte = randomChoice([
        { objet: "œufs", contenant: "boites" },
        { objet: "photos", contenant: "pages" },
        { objet: "gâteaux", contenant: "sachets" },
      ]);
      if (cherche === "tout") {
        return {
          text: `Il y a ${nbParts} ${contexte.contenant} de ${parPart} ${contexte.objet}. Combien de ${contexte.objet} en tout ?`,
          format: "short",
          expected: [String(total)],
          comparator: "number_equal",
          explanation: exp(
            "Quand un tout est fait de parts de même valeur, on multiplie.",
            "On repère la valeur d'une part et le nombre de parts.",
            `${nbParts} × ${parPart} = ${total}.`,
            `Il y a ${total} ${contexte.objet}.`,
          ),
        };
      }
      return {
        text: `On range ${total} ${contexte.objet} dans des ${contexte.contenant} de ${parPart}. Combien de ${contexte.contenant} faut-il ?`,
        format: "short",
        expected: [String(nbParts)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher le nombre de parts, c'est faire des groupements.",
          "On cherche combien de fois la valeur d'une part tient dans le total.",
          `${parPart} × ${nbParts} = ${total} : il faut ${nbParts} ${contexte.contenant}.`,
          `Il faut ${nbParts} ${contexte.contenant}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_probleme_multiplicatif_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_multiplicatif",
    difficulty: 4,
    theme: "neutral",
    hint: "On partage équitablement : chacun reçoit la même chose.",
    tags: ["ce1", "probleme", "multiplicatif", "partage", "template"],
    generate: () => {
      const enfants = randomInt(2, 6);
      const parEnfant = randomInt(3, 12);
      const total = enfants * parEnfant;
      const objet = randomChoice(["images", "bonbons", "billes", "autocollants"]);
      return {
        text: `${enfants} enfants se partagent ${total} ${objet}. Chacun doit en avoir autant. Combien chaque enfant reçoit-il de ${objet} ?`,
        format: "short",
        expected: [String(parEnfant)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher la valeur d'une part, c'est partager équitablement.",
          "On distribue le total en parts égales, une pour chaque enfant.",
          `${enfants} × ${parEnfant} = ${total} : chaque enfant reçoit ${parEnfant} ${objet}.`,
          `Chacun reçoit ${parEnfant} ${objet}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROBLEME_MIXTE — deux étapes, dont une multiplicative
     Le programme donne l'exemple : sept litres d'huile à deux
     euros le litre, payés avec vingt euros.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_probleme_mixte_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_mixte",
    difficulty: 5,
    theme: "neutral",
    text: "Abi achète 7 litres d'huile à 2 € le litre. Elle donne 20 € au vendeur. Combien le vendeur doit-il lui rendre ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche d'abord ce que coûte toute l'huile.",
    explanation: exp(
      "Un problème mixte demande deux calculs de natures différentes : une multiplication, puis une addition ou une soustraction.",
      "On cherche d'abord le prix total, puis ce qu'il faut rendre.",
      "7 × 2 = 14 €. Puis 20 - 14 = 6 €.",
      "Le vendeur doit rendre 6 €.",
    ),
    tags: ["ce1", "probleme", "mixte"],
  },
  {
    kind: "template",
    id: "ce1_probleme_mixte_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_mixte",
    difficulty: 5,
    theme: "reunion",
    hint: "Multiplication d'abord, soustraction ensuite.",
    tags: ["ce1", "probleme", "mixte", "reunion", "template"],
    generate: () => {
      const qui = randomChoice(PRENOMS);
      const combien = randomInt(3, 9);
      const prix = randomChoice([2, 3, 5] as const);
      const total = combien * prix;
      const donne = total <= 20 ? 20 : 50;
      const rendu = donne - total;
      const quoi = randomChoice(["samoussas", "bouteilles d'eau", "beignets", "sachets de bonbons"]);
      return {
        text: `${qui} achète ${combien} ${quoi} à ${prix} € pièce. ${qui} donne un billet de ${donne} €. Combien lui rend-on ?`,
        format: "short",
        expected: [String(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème mixte demande deux calculs de natures différentes.",
          "On cherche d'abord le prix total par une multiplication, puis le rendu par une soustraction.",
          `${combien} × ${prix} = ${total} €. Puis ${donne} - ${total} = ${rendu} €.`,
          `On lui rend ${rendu} €.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_probleme_mixte_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_mixte",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux sortes d'objets, deux multiplications à réunir.",
    tags: ["ce1", "probleme", "mixte", "template"],
    generate: () => {
      const nb = randomInt(3, 10);
      const prixA = randomChoice([2, 3, 4] as const);
      const prixB = randomChoice([1, 2, 5] as const);
      const total = nb * prixA + nb * prixB;
      return {
        text: `Un cahier coûte ${prixA} € et un protège-cahier ${prixB} €. Le professeur achète ${nb} cahiers et autant de protège-cahiers. Quel est le montant de la facture ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème mixte demande plusieurs calculs, qu'on organise avant de se lancer.",
          "On calcule le prix des cahiers, celui des protège-cahiers, puis on additionne.",
          `${nb} × ${prixA} = ${nb * prixA} € et ${nb} × ${prixB} = ${nb * prixB} €. En tout : ${nb * prixA} + ${nb * prixB} = ${total} €.`,
          `La facture est de ${total} €.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROBLEME_SCHEMA — le schéma en barre
     Le programme en fait l'outil de modélisation du CE1.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_probleme_schema_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_schema",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un schéma en barre, le grand nombre écrit AU-DESSUS de la barre entière, c'est…",
    format: "qcm",
    choices: [
      "le tout",
      "une des deux parties",
      "la réponse à la question",
      "le nombre le plus facile",
    ],
    expected: ["le tout"],
    comparator: "mcq_exact",
    hint: "La barre entière représente tout ce qu'on a.",
    explanation: exp(
      "Un schéma en barre montre le tout au-dessus, et ses parties à l'intérieur.",
      "On lit d'abord la barre entière, puis les morceaux qui la composent.",
      "Le nombre au-dessus dit combien vaut la barre entière : c'est le tout. Les morceaux à l'intérieur en sont les parties.",
      "C'est le tout.",
    ),
    tags: ["ce1", "probleme", "schema", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_probleme_schema_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_schema",
    difficulty: 4,
    theme: "neutral",
    hint: "Le point d'interrogation marque ce qu'on cherche.",
    tags: ["ce1", "probleme", "schema", "template", "canvas"],
    generate: () => {
      const total = randomInt(120, 600);
      const partie = randomInt(40, total - 40);
      const manque = total - partie;
      return {
        text: "Sur ce schéma en barre, quelle valeur remplace le point d'interrogation ?",
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Sur un schéma en barre, le tout est écrit au-dessus et les parties à l'intérieur.",
          "Quand le tout et une partie sont connus, on enlève la partie au tout.",
          `${total} - ${partie} = ${manque}. On vérifie : ${partie} + ${manque} = ${total}.`,
          `Le point d'interrogation vaut ${manque}.`,
        ),
        canvas: schemaBarre({
          total: String(total),
          parts: [
            { label: "connu", value: String(partie) },
            { label: "cherché", unknown: true },
          ],
          display: { showTotal: true, showPartLabels: true, showValues: true },
        }),
      };
    },
  },

  /* =========================================================
     CE1_PROBLEME_REPONSE — répondre avec l'unité
     La phase « Répondre » du programme : on quitte les
     mathématiques pour revenir à l'histoire.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_probleme_reponse_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_reponse",
    difficulty: 3,
    theme: "neutral",
    text: "Un problème demande combien il reste de billes. Un élève écrit seulement « 46 ». Que manque-t-il à sa réponse ?",
    format: "qcm",
    choices: [
      "l'unité : il reste 46 billes",
      "rien, le nombre suffit",
      "le calcul complet",
      "le nom de l'élève",
    ],
    expected: ["l'unité : il reste 46 billes"],
    comparator: "mcq_exact",
    hint: "46 quoi ? Des billes, des euros, des mètres ?",
    explanation: exp(
      "Répondre à un problème, c'est revenir à l'histoire de départ, pas seulement donner un nombre.",
      "On relit la question et on répond par une phrase qui contient l'unité.",
      "« 46 » tout seul ne dit rien : 46 billes, 46 euros et 46 mètres sont trois réponses différentes. On écrit « Il reste 46 billes ».",
      "Il manque l'unité.",
    ),
    tags: ["ce1", "probleme", "reponse", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_probleme_reponse_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_reponse",
    difficulty: 4,
    theme: "neutral",
    hint: "Relis la question : de quoi parle-t-elle ?",
    tags: ["ce1", "probleme", "reponse", "template"],
    generate: () => {
      const cas = randomChoice([
        { question: "Combien reste-t-il d'euros ?", unite: "euros", faux: ["billes", "mètres", "élèves"] },
        { question: "Combien y a-t-il d'élèves ?", unite: "élèves", faux: ["euros", "litres", "grammes"] },
        { question: "Quelle longueur reste-t-il ?", unite: "centimètres", faux: ["euros", "élèves", "kilogrammes"] },
        { question: "Combien pèse le sac ?", unite: "grammes", faux: ["euros", "centimètres", "élèves"] },
      ]);
      const n = randomInt(12, 400);
      const bonne = `${n} ${cas.unite}`;
      return {
        text: `Un problème demande : « ${cas.question} ». Le calcul donne ${n}. Quelle réponse est correcte ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          String(n),
          `${n} ${cas.faux[0]}`,
          `${n} ${cas.faux[1]}`,
          `${n} ${cas.faux[2]}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une réponse à un problème contient le nombre ET l'unité de la question.",
          "On relit la question pour savoir de quoi on parle.",
          `La question porte sur des ${cas.unite}. La réponse est donc « ${bonne} », et non un nombre tout seul.`,
          `La bonne réponse est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROBLEME_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : décider
     si le résultat trouvé est possible. C'est la phase de
     « régulation » que le programme demande.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_probleme_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un album peut contenir 350 photos. Lucie a 287 photos et Léo en a 72. L'album peut-il contenir toutes leurs photos ?",
    format: "qcm",
    choices: [
      "non, il en manque de la place pour 9 photos",
      "oui, il reste même de la place",
      "oui, tout juste",
      "on ne peut pas savoir",
    ],
    expected: ["non, il en manque de la place pour 9 photos"],
    comparator: "mcq_exact",
    hint: "Additionne les deux tas, puis compare à 350.",
    explanation: exp(
      "Pour savoir si ça rentre, on compare le total à la place disponible.",
      "On additionne les deux quantités, puis on compare au nombre de places.",
      "287 + 72 = 359. Or l'album ne contient que 350 photos : il en manque de la place pour 359 - 350 = 9.",
      "Non : il manque de la place pour 9 photos.",
    ),
    tags: ["ce1", "probleme", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_probleme_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève cherche combien de jetons rouges il y a dans une boite de 40 jetons. Il trouve 52. Que doit-il en penser ?",
    format: "qcm",
    choices: [
      "c'est impossible : une partie ne peut pas dépasser le tout",
      "c'est possible, il a bien calculé",
      "il faut recompter les jetons de la boite",
      "il n'y a pas assez de renseignements",
    ],
    expected: ["c'est impossible : une partie ne peut pas dépasser le tout"],
    comparator: "mcq_exact",
    hint: "Peut-il y avoir plus de jetons rouges que de jetons en tout ?",
    explanation: exp(
      "Après avoir calculé, on se demande toujours si le résultat est possible.",
      "On compare la réponse trouvée aux nombres de l'énoncé.",
      "La boite contient 40 jetons en tout. Les rouges en font partie : ils ne peuvent pas être 52. Le calcul est donc à refaire.",
      "C'est impossible : une partie ne peut pas dépasser le tout.",
    ),
    tags: ["ce1", "probleme", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_probleme_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce1_probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Additionne d'abord, compare ensuite.",
    tags: ["ce1", "probleme", "defi", "template"],
    generate: () => {
      const place = randomChoice([100, 200, 300, 500] as const);
      const a = randomInt(Math.floor(place / 2), place - 20);
      const depasse = randomChoice([true, false]);
      const b = depasse
        ? place - a + randomInt(5, 40)
        : Math.max(5, place - a - randomInt(5, 40));
      const total = a + b;
      const bonne = depasse
        ? `non, il manque de la place pour ${total - place}`
        : `oui, il reste de la place pour ${place - total}`;
      return {
        text: `Une boite peut contenir ${place} images. ${randomChoice(PRENOMS)} en a ${a} et ${randomChoice(PRENOMS)} en a ${b}. Peut-on tout ranger dans la boite ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          depasse
            ? `oui, il reste de la place pour ${Math.abs(place - total)}`
            : `non, il manque de la place pour ${Math.abs(total - place)}`,
          "oui, tout juste",
          "on ne peut pas savoir",
          "non, la boite est déjà pleine",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour savoir si ça rentre, on compare le total à la place disponible.",
          "On additionne les deux quantités, puis on compare au nombre de places.",
          `${a} + ${b} = ${total}. La boite contient ${place} images : ${depasse ? `il manque de la place pour ${total - place}` : `il reste de la place pour ${place - total}`}.`,
          bonne.charAt(0).toUpperCase() + bonne.slice(1) + ".",
        ),
      };
    },
  },
];
