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
// Les nombres restent dans le millier ; les prix en euros ENTIERS.
//
// ⛔ 10/11/2026 — LES SQUELETTES. Six micros servaient deux à vingt-six
// énoncés : chaque gabarit tire maintenant une histoire d'enfant (goûter,
// kermesse, pirates, ferme, fusée…) × une tournure × un prénom de la troupe,
// et prend la question par plusieurs bouts. Les dessins : le schéma en barre
// (le tout, les parties, le « ? »), un seul paquet, les jetons à partager,
// le porte-monnaie. Les micros déjà robustes (choisir l'opération,
// comparaison, défis) ne sont pas touchées. Outils : ./calcul-outils-ce1.ts.
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
  return melangeEnPlace([...items]);
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

import type { DifficultyLevel } from "@/lib/tutor-v4/types";
import {
  type Q,
  ri,
  rc,
  pile,
  maj,
  pl,
  court,
  qcmTexte,
  nombreOuQcm,
  enfant,
  deuxEnfants,
  chose,
  dessinUnPaquet,
  dessinJetons,
  dessinQuantite,
  dessinBarre,
  dessinArgent,
} from "./calcul-outils-ce1";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function gab(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce1",
    matiere: "maths",
    notionId: "probleme",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["ce1", "probleme", ...tags, "template"],
    generate,
  };
}

/* ---------------------------------------------------------
   LES HISTOIRES « PARTIES-TOUT » : deux parties d'un même tout.
   `p1`, `p2` : les étiquettes des parties sur le schéma.
--------------------------------------------------------- */
type Tout = {
  /** Les deux parties connues. */
  avant: (a: number, b: number) => string;
  /** Le tout connu. */
  total: (t: number) => string;
  /** Une partie connue (1 ou 2), dite en une phrase. */
  partie: (n: number, laquelle: 1 | 2) => string;
  /** La question sur une partie. */
  question: (laquelle: 1 | 2) => string;
  quoi: string;
  p1: string;
  p2: string;
};
function histoiresTout(): Tout[] {
  const p = enfant();
  const [x, y] = deuxEnfants();
  return [
    {
      avant: (a, b) => `Au goûter, ${p.nom} mange ${a} raisins verts et ${b} raisins noirs.`,
      total: (t) => `Au goûter, ${p.nom} mange ${t} raisins, des verts et des noirs.`,
      partie: (n, k) => `${n} sont ${k === 1 ? "verts" : "noirs"}.`,
      question: (k) => `Combien de raisins ${k === 1 ? "verts" : "noirs"} mange-t-${p.il} ?`,
      quoi: "raisins", p1: "verts", p2: "noirs",
    },
    {
      avant: (a, b) => `Dans la ferme, il y a ${a} poules et ${b} canards. ${p.nom} les compte.`,
      total: (t) => `Dans la ferme, ${p.nom} compte ${t} animaux : des poules et des canards.`,
      partie: (n, k) => `Il y a ${n} ${k === 1 ? "poules" : "canards"}.`,
      question: (k) => `Combien y a-t-il de ${k === 1 ? "poules" : "canards"} ?`,
      quoi: "animaux", p1: "poules", p2: "canards",
    },
    {
      avant: (a, b) => `${x.nom} a ${a} cartes de dinosaures et ${y.nom} en a ${b}.`,
      total: (t) => `${x.nom} et ${y.nom} ont ${t} cartes de dinosaures à eux deux.`,
      partie: (n, k) => `${k === 1 ? x.nom : y.nom} en a ${n}.`,
      question: (k) => `Combien de cartes ${k === 1 ? x.nom : y.nom} a-t-${k === 1 ? x.il : y.il} ?`,
      quoi: "cartes", p1: x.nom, p2: y.nom,
    },
    {
      avant: (a, b) => `${p.il === "elle" ? "La" : "Le"} pirate ${p.nom} cache ${a} pièces d'or dans un coffre et ${b} dans une grotte.`,
      total: (t) => `${p.il === "elle" ? "La" : "Le"} pirate ${p.nom} a caché ${t} pièces d'or, dans un coffre et dans une grotte.`,
      partie: (n, k) => `Il y en a ${n} dans ${k === 1 ? "le coffre" : "la grotte"}.`,
      question: (k) => `Combien de pièces d'or y a-t-il dans ${k === 1 ? "le coffre" : "la grotte"} ?`,
      quoi: "pièces d'or", p1: "coffre", p2: "grotte",
    },
    {
      avant: (a, b) => `À la kermesse, ${p.nom} vend ${a} crêpes le matin et ${b} l'après-midi.`,
      total: (t) => `À la kermesse, ${p.nom} vend ${t} crêpes dans la journée.`,
      partie: (n, k) => `${maj(p.il)} en vend ${n} ${k === 1 ? "le matin" : "l'après-midi"}.`,
      question: (k) => `Combien de crêpes vend-${p.il} ${k === 1 ? "le matin" : "l'après-midi"} ?`,
      quoi: "crêpes", p1: "matin", p2: "après-midi",
    },
    {
      avant: (a, b) => `Dans la bibliothèque de ${p.nom}, il y a ${a} albums et ${b} BD.`,
      total: (t) => `La bibliothèque de ${p.nom} a ${t} livres : des albums et des BD.`,
      partie: (n, k) => `Il y a ${n} ${k === 1 ? "albums" : "BD"}.`,
      question: (k) => `Combien y a-t-il ${k === 1 ? "d'albums" : "de BD"} ?`,
      quoi: "livres", p1: "albums", p2: "BD",
    },
    {
      avant: (a, b) => `Le jardinier plante ${a} tulipes et ${b} roses. ${p.nom} l'aide.`,
      total: (t) => `Le jardinier et ${p.nom} plantent ${t} fleurs : des tulipes et des roses.`,
      partie: (n, k) => `Ils plantent ${n} ${k === 1 ? "tulipes" : "roses"}.`,
      question: (k) => `Combien de ${k === 1 ? "tulipes" : "roses"} plantent-ils ?`,
      quoi: "fleurs", p1: "tulipes", p2: "roses",
    },
    {
      avant: (a, b) => `Au zoo, ${p.nom} voit ${a} singes dans le premier enclos et ${b} dans le second.`,
      total: (t) => `Au zoo, ${p.nom} voit ${t} singes dans deux enclos.`,
      partie: (n, k) => `Il y en a ${n} dans le ${k === 1 ? "premier" : "second"}.`,
      question: (k) => `Combien de singes y a-t-il dans le ${k === 1 ? "premier" : "second"} enclos ?`,
      quoi: "singes", p1: "enclos 1", p2: "enclos 2",
    },
    {
      avant: (a, b) => `Dans la fusée de ${p.nom}, il y a ${a} étoiles collées à gauche et ${b} à droite.`,
      total: (t) => `Dans la fusée de ${p.nom}, ${t} étoiles sont collées, à gauche et à droite.`,
      partie: (n, k) => `${n} sont ${k === 1 ? "à gauche" : "à droite"}.`,
      question: (k) => `Combien d'étoiles sont ${k === 1 ? "à gauche" : "à droite"} ?`,
      quoi: "étoiles", p1: "gauche", p2: "droite",
    },
    {
      avant: (a, b) => `Pic le paille-en-queue ramasse ${a} graines le matin et ${b} le soir. ${p.nom} le regarde.`,
      total: (t) => `Pic le paille-en-queue ramasse ${t} graines dans la journée. ${p.nom} le regarde.`,
      partie: (n, k) => `Il en ramasse ${n} ${k === 1 ? "le matin" : "le soir"}.`,
      question: (k) => `Combien de graines ramasse-t-il ${k === 1 ? "le matin" : "le soir"} ?`,
      quoi: "graines", p1: "matin", p2: "soir",
    },
    {
      avant: (a, b) => `À la piscine, ${p.nom} compte ${a} filles et ${b} garçons.`,
      total: (t) => `À la piscine, ${p.nom} compte ${t} enfants, des filles et des garçons.`,
      partie: (n, k) => `Il y a ${n} ${k === 1 ? "filles" : "garçons"}.`,
      question: (k) => `Combien y a-t-il de ${k === 1 ? "filles" : "garçons"} ?`,
      quoi: "enfants", p1: "filles", p2: "garçons",
    },
    {
      avant: (a, b) => `La boulangère a fait ${a} croissants et ${b} pains au chocolat. ${p.nom} les regarde.`,
      total: (t) => `La boulangère a fait ${t} viennoiseries : des croissants et des pains au chocolat. ${p.nom} les regarde.`,
      partie: (n, k) => `Il y a ${n} ${k === 1 ? "croissants" : "pains au chocolat"}.`,
      question: (k) => `Combien y a-t-il de ${k === 1 ? "croissants" : "pains au chocolat"} ?`,
      quoi: "viennoiseries", p1: "croissants", p2: "pains au choc.",
    },
    {
      avant: (a, b) => `Dans l'aquarium de ${p.nom}, il y a ${a} poissons rouges et ${b} poissons bleus.`,
      total: (t) => `L'aquarium de ${p.nom} a ${t} poissons, des rouges et des bleus.`,
      partie: (n, k) => `${n} sont ${k === 1 ? "rouges" : "bleus"}.`,
      question: (k) => `Combien de poissons sont ${k === 1 ? "rouges" : "bleus"} ?`,
      quoi: "poissons", p1: "rouges", p2: "bleus",
    },
  ];
}

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
          ? `« ${a} a ${grand} images. ${b} en a ${ecart} de plus que ${a}. Combien d'images a ${b} ? » Quelle opération faut-il faire ?`
          : `« ${a} a ${grand} images. ${a} en a ${ecart} de plus que ${b}. Combien d'images a ${b} ? » Quelle opération faut-il faire ?`,
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
  gab(
    "ce1_probleme_parties_tout_tpl_1",
    "ce1_probleme_add_sous",
    3,
    "Deux parties connues : on les réunit.",
    ["parties_tout"],
    () => {
      const h = rc(histoiresTout());
      const a = ri(12, 400);
      const b = ri(11, 300);
      const t = a + b;
      const explication = exp(
        "Un problème parties-tout met en jeu deux parties et leur total.",
        "Quand les deux parties sont connues, on les additionne pour trouver le tout.",
        `${a} + ${b} = ${t}.`,
        `Il y a ${t} ${h.quoi} en tout.`,
      );
      const q = rc([`Combien de ${h.quoi} en tout ?`, `Combien y a-t-il de ${h.quoi} en tout ?`, `Quel est le nombre total de ${h.quoi} ?`]);
      if (pile(0.15)) {
        const [x, y] = deuxEnfants();
        const m1 = ri(3, 30);
        const m2 = ri(3, 30);
        const d1 = dessinArgent(m1);
        const d2 = dessinArgent(m2);
        if (d1 && d2) {
          return nombreOuQcm(
            rc([`Voici l'argent de ${x.nom} et celui de ${y.nom}. Combien d'euros ont-ils à eux deux ?`, `${x.nom} et ${y.nom} vident leurs tirelires pour un cadeau. Combien d'euros ont-ils ensemble ?`]),
            m1 + m2,
            [m1 + m2 + 1, m1 + m2 - 1, m1 + m2 + 10, Math.abs(m1 - m2)],
            exp("Réunir deux sommes, c'est les additionner.", "On compte l'argent de chacun, puis on additionne.", `${x.nom} a ${m1} €, ${y.nom} a ${m2} €. ${m1} + ${m2} = ${m1 + m2}.`, `Ils ont ${m1 + m2} €.`),
            { kind: "monnaie", groupes: [{ nom: x.nom, elements: d1.elements! }, { nom: y.nom, elements: d2.elements! }] },
            "€",
          );
        }
      }
      return nombreOuQcm(
        `${h.avant(a, b)} ${q}`,
        t,
        [t + 10, t - 10, Math.abs(a - b), t + 1],
        explication,
        pile(0.7) ? dessinBarre({ total: "?", parts: [{ label: h.p1, value: String(a) }, { label: h.p2, value: String(b) }] }) : undefined,
      );
    },
  ),
  gab(
    "ce1_probleme_parties_tout_tpl_2",
    "ce1_probleme_add_sous",
    4,
    "Le tout est connu : enlève la partie que tu connais.",
    ["parties_tout", "canvas"],
    () => {
      const p = enfant();
      if (pile(0.35)) {
        // LE piège du programme : le mot « plus », et pourtant on soustrait.
        const gagne = ri(12, 90);
        const fin = ri(gagne + 20, 500);
        const avant = fin - gagne;
        const c = chose();
        return nombreOuQcm(
          rc([
            `${p.nom} gagne ${gagne} ${c.pl} à la récré. Maintenant, ${p.il} en a ${fin}. Combien en avait-${p.il} avant ?`,
            `Après avoir reçu ${gagne} ${c.pl} de plus, ${p.nom} en a ${fin}. Combien en avait-${p.il} au début ?`,
            `On a ajouté ${gagne} livres dans la bibliothèque de ${p.nom}. Il y en a maintenant ${fin}. Combien y en avait-il avant ?`,
            `Le train de ${p.nom} a pris ${gagne} voyageurs de plus à la gare. Il en a maintenant ${fin}. Combien en avait-il avant ?`,
          ]),
          avant,
          [fin + gagne, avant + 10, avant - 10, gagne],
          exp(
            "Le mot « plus » ne dit pas toujours d'additionner : c'est l'histoire qui décide.",
            "On cherche ce qu'il y avait AVANT le gain : un nombre plus petit que la fin.",
            `${fin} - ${gagne} = ${avant}. On vérifie : ${avant} + ${gagne} = ${fin}.`,
            `Il y en avait ${avant}.`,
          ),
          pile(0.5) ? dessinBarre({ total: String(fin), parts: [{ label: "avant", unknown: true }, { label: "gagnés", value: String(gagne) }] }) : undefined,
        );
      }
      const h = rc(histoiresTout());
      const t = ri(60, 800);
      const a = ri(20, t - 15);
      const b = t - a;
      const premiere = pile();
      return nombreOuQcm(
        `${h.total(t)} ${h.partie(premiere ? a : b, premiere ? 1 : 2)} ${h.question(premiere ? 2 : 1)}`,
        premiere ? b : a,
        [t + (premiere ? a : b), (premiere ? b : a) + 10, (premiere ? b : a) - 10],
        exp(
          "Un problème parties-tout met en jeu un total et ses deux parties.",
          "Quand le tout et une partie sont connus, on enlève la partie au tout.",
          `${t} - ${premiere ? a : b} = ${premiere ? b : a}. On vérifie : ${a} + ${b} = ${t}.`,
          `Il y en a ${premiere ? b : a}.`,
        ),
        pile(0.75)
          ? dessinBarre({ total: String(t), parts: [premiere ? { label: h.p1, value: String(a) } : { label: h.p1, unknown: true }, premiere ? { label: h.p2, unknown: true } : { label: h.p2, value: String(b) }] })
          : undefined,
      );
    },
  ),

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
        text: `${a} a ${grand} ${objet} et ${b} en a ${petit}. Combien en a ${a} de plus que ${b} ?`,
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
        text: `${a} a ${grand} € dans sa tirelire. ${a} a ${ecart} € de plus que ${b}. Combien d'euros a ${b} dans sa tirelire ?`,
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
  gab(
    "ce1_probleme_deux_etapes_tpl_1",
    "ce1_probleme_deux_etapes",
    4,
    "Cherche d'abord le total des achats.",
    ["deux_etapes"],
    () => {
      const p = enfant();
      const lieu = rc([
        { ou: "à la boulangerie", a: "une tarte", b: "un gâteau", vend: "la boulangère", il: "elle", pa: [8, 18], pb: [10, 25] },
        { ou: "à la librairie", a: "un livre", b: "une BD", vend: "le libraire", il: "il", pa: [5, 20], pb: [8, 15] },
        { ou: "au marché", a: "un panier de fraises", b: "un melon", vend: "la marchande", il: "elle", pa: [3, 8], pb: [2, 5] },
        { ou: "à la kermesse", a: "un ticket de manège", b: "une barbe à papa", vend: "le vendeur", il: "il", pa: [2, 5], pb: [2, 4] },
        { ou: "au magasin de jouets", a: "un ballon", b: "une petite voiture", vend: "le vendeur", il: "il", pa: [3, 15], pb: [3, 12] },
        { ou: "au zoo", a: "un ticket d'entrée", b: "une peluche de lion", vend: "la caissière", il: "elle", pa: [8, 20], pb: [6, 25] },
        { ou: "à la papeterie", a: "un cahier", b: "une trousse", vend: "la vendeuse", il: "elle", pa: [2, 6], pb: [4, 15] },
      ]);
      const prix1 = ri(lieu.pa[0], lieu.pa[1]);
      const prix2 = ri(lieu.pb[0], lieu.pb[1]);
      const donne = prix1 + prix2 < 20 && pile() ? 20 : prix1 + prix2 < 50 ? 50 : 100;
      const rendu = donne - prix1 - prix2;
      const explication = exp(
        "Un problème en deux étapes demande deux calculs, l'un après l'autre.",
        "On cherche d'abord le total des achats, puis on l'enlève à l'argent donné.",
        `${prix1} + ${prix2} = ${prix1 + prix2} €. Puis ${donne} - ${prix1 + prix2} = ${rendu} €.`,
        `On rend ${rendu} € à ${p.nom}.`,
      );
      const text = rc([
        `${maj(lieu.ou)}, ${p.nom} achète ${lieu.a} à ${prix1} € et ${lieu.b} à ${prix2} €. ${maj(p.il)} donne un billet de ${donne} €. Combien ${lieu.vend} doit-${lieu.il} lui rendre ?`,
        `${maj(lieu.ou)}, ${p.nom} paie ${lieu.a} (${prix1} €) et ${lieu.b} (${prix2} €). ${maj(p.il)} donne un billet de ${donne} €. Combien d'euros lui rend-on ?`,
        `${maj(lieu.ou)}, ${lieu.a} coûte ${prix1} € et ${lieu.b} ${prix2} €. ${p.nom} prend les deux et paie avec ${donne} €. Combien lui rend-on ?`,
      ]);
      const dessin = rc(["billet", "barre", "barre"] as const);
      return nombreOuQcm(
        text,
        rendu,
        [donne - prix1, donne - prix2, prix1 + prix2, rendu + 10].filter((x) => x !== rendu),
        explication,
        dessin === "billet"
          ? { kind: "monnaie", elements: [{ valeur: donne === 20 ? "20e" : donne === 50 ? "50e" : "100e" }] }
          : dessin === "barre"
            ? dessinBarre({ total: `${donne} €`, parts: [{ label: "1er achat", value: String(prix1) }, { label: "2e achat", value: String(prix2) }, { label: "rendu", unknown: true }] })
            : undefined,
        "€",
      );
    },
  ),
  gab(
    "ce1_probleme_deux_etapes_tpl_2",
    "ce1_probleme_deux_etapes",
    4,
    "Suis l'ordre de l'histoire : un calcul, puis l'autre.",
    ["deux_etapes"],
    () => {
      const p = enfant();
      const depart = pile(0.75) ? ri(12, 40) : ri(41, 60);
      const moins = ri(3, depart - 4);
      const plus = ri(3, 25);
      const fin = depart - moins + plus;
      const h = rc([
        { debut: `Il y avait ${depart} enfants dans le bus de ${p.nom}.`, e1: `Au premier arrêt, ${moins} enfants descendent.`, e2: `Au deuxième arrêt, ${plus} enfants montent.`, q: "Combien d'enfants y a-t-il dans le bus maintenant ?" },
        { debut: `${p.nom} a ${depart} billes.`, e1: `${maj(p.il)} en perd ${moins} à la récré.`, e2: `Puis ${p.il} en gagne ${plus}.`, q: `Combien de billes a-t-${p.il} maintenant ?` },
        { debut: `Dans l'aquarium de ${p.nom}, il y a ${depart} poissons.`, e1: `${moins} poissons partent dans un autre bac.`, e2: `Puis on en ajoute ${plus}.`, q: "Combien de poissons y a-t-il maintenant ?" },
        { debut: `${p.il === "elle" ? "La" : "Le"} pirate ${p.nom} a ${depart} pièces d'or.`, e1: `${maj(p.il)} en dépense ${moins}.`, e2: `Puis ${p.il} en trouve ${plus} dans un coffre.`, q: `Combien de pièces d'or a-t-${p.il} maintenant ?` },
        { debut: `Sur la branche, il y a ${depart} oiseaux.`, e1: `${moins} oiseaux s'envolent.`, e2: `Puis ${plus} oiseaux arrivent. ${p.nom} les compte.`, q: "Combien d'oiseaux y a-t-il sur la branche ?" },
        { debut: `${p.nom} a ${depart} images dans son album.`, e1: `${maj(p.il)} en donne ${moins} à son frère.`, e2: `Puis ${p.il} en achète ${plus}.`, q: `Combien d'images a-t-${p.il} maintenant ?` },
        { debut: `Le dragon garde ${depart} pierres précieuses.`, e1: `${p.nom} le chevalier en prend ${moins}.`, e2: `Puis le dragon en trouve ${plus} autres.`, q: "Combien de pierres le dragon garde-t-il maintenant ?" },
        { debut: `La fermière a ${depart} œufs.`, e1: `Elle en vend ${moins} à ${p.nom}.`, e2: `Puis ses poules en pondent ${plus}.`, q: "Combien d'œufs a-t-elle maintenant ?" },
        { debut: `À la piscine, ${depart} enfants nagent.`, e1: `${moins} enfants sortent de l'eau.`, e2: `Puis ${plus} enfants plongent. ${p.nom} recompte.`, q: "Combien d'enfants nagent maintenant ?" },
      ]);
      return nombreOuQcm(
        `${h.debut} ${h.e1} ${h.e2} ${h.q}`,
        fin,
        [depart + moins + plus, depart - moins - plus > 0 ? depart - moins - plus : fin + 10, fin + 10, fin - 1],
        exp(
          "Un problème en deux étapes se résout dans l'ordre où les choses se passent.",
          "On fait le premier changement, puis le second.",
          `${depart} - ${moins} = ${depart - moins}, puis ${depart - moins} + ${plus} = ${fin}.`,
          `Il y en a ${fin}.`,
        ),
        depart <= 40 && pile(0.8) ? dessinJetons(depart, undefined, "Au début") : undefined,
      );
    },
  ),

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
  gab(
    "ce1_probleme_multiplicatif_tpl_1",
    "ce1_probleme_multiplicatif",
    4,
    "Combien de fois la même quantité ?",
    ["multiplicatif"],
    () => {
      const p = enfant();
      const pq = rc([
        { un: "boîte", des: "boîtes", quoi: "œufs" },
        { un: "panier", des: "paniers", quoi: "pommes", objet: "pomme" as const },
        { un: "bocal", des: "bocaux", quoi: "poissons", objet: "poisson" as const },
        { un: "vase", des: "vases", quoi: "fleurs", objet: "fleur" as const },
        { un: "sachet", des: "sachets", quoi: "billes" },
        { un: "filet", des: "filets", quoi: "ballons", objet: "ballon" as const },
        { un: "page", des: "pages", quoi: "autocollants" },
        { un: "équipe", des: "équipes", quoi: "joueurs" },
        { un: "wagon", des: "wagons", quoi: "voyageurs" },
        { un: "étagère", des: "étagères", quoi: "livres", objet: "livre" as const },
        { un: "plateau", des: "plateaux", quoi: "cookies" },
        { un: "nid", des: "nids", quoi: "œufs de dinosaure" },
      ]);
      const parPart = rc([2, 3, 4, 5, 10] as const);
      const nbParts = ri(3, 10);
      const total = parPart * nbParts;
      const dessin = "objet" in pq && pq.objet && parPart <= 5 ? dessinUnPaquet(pq.objet, parPart, `1 ${pq.un}`) : pq.quoi === "billes" ? dessinJetons(parPart) : undefined;
      if (pile()) {
        const text = rc([
          `${p.nom} a ${nbParts} ${pq.des} de ${parPart} ${pq.quoi}. Combien de ${pq.quoi} en tout ?`,
          `Il y a ${nbParts} ${pq.des}. Dans chaque ${pq.un}, ${p.nom} compte ${parPart} ${pq.quoi}. Combien de ${pq.quoi} en tout ?`,
          `${p.nom} prépare ${nbParts} ${pq.des} de ${parPart} ${pq.quoi}. Combien de ${pq.quoi} cela fait-il ?`,
        ]);
        return nombreOuQcm(
          dessin ? `Le dessin montre ce qu'il y a dans 1 ${pq.un}. ${text}` : text,
          total,
          [total + parPart, total - parPart, nbParts + parPart, total + 10],
          exp(
            "Quand un tout est fait de parts de même valeur, on multiplie.",
            "On repère la valeur d'une part et le nombre de parts.",
            `${nbParts} × ${parPart} = ${total}.`,
            `Il y a ${total} ${pq.quoi}.`,
          ),
          dessin,
        );
      }
      return nombreOuQcm(
        rc([
          `${p.nom} range ${total} ${pq.quoi} par ${pq.des} de ${parPart}. Combien de ${pq.des} remplit-${p.il} ?`,
          `On met ${parPart} ${pq.quoi} dans chaque ${pq.un}. ${p.nom} a ${total} ${pq.quoi}. Combien de ${pq.des} faut-il ?`,
          `Avec ${total} ${pq.quoi}, ${p.nom} fait des ${pq.des} de ${parPart}. Combien de ${pq.des} fait-${p.il} ?`,
        ]),
        nbParts,
        [nbParts + 1, nbParts - 1, total - parPart, parPart],
        exp(
          "Chercher le nombre de parts, c'est faire des groupements.",
          "On cherche combien de fois la valeur d'une part tient dans le total.",
          `${parPart} × ${nbParts} = ${total} : il faut ${nbParts} ${pq.des}.`,
          `Il faut ${nbParts} ${pq.des}.`,
        ),
        total <= 40 && pile(0.6) ? dessinJetons(total) : dessin,
      );
    },
  ),
  gab(
    "ce1_probleme_multiplicatif_tpl_2",
    "ce1_probleme_multiplicatif",
    4,
    "On partage équitablement : chacun reçoit la même chose.",
    ["multiplicatif", "partage"],
    () => {
      const p = enfant();
      const enfants = ri(2, 6);
      const parEnfant = ri(2, 10);
      const total = enfants * parEnfant;
      const c = chose();
      return nombreOuQcm(
        rc([
          `${enfants} enfants se partagent ${total} ${c.pl}. Chacun doit en avoir autant. Combien chaque enfant en reçoit-il ?`,
          `${p.nom} partage ${total} ${c.pl} entre ${enfants} amis, à parts égales. Combien chacun en a-t-il ?`,
          `Pour la kermesse, ${p.nom} range ${total} ${c.pl} dans ${enfants} boîtes, autant dans chacune. Combien par boîte ?`,
          `${p.il === "elle" ? "La" : "Le"} pirate ${p.nom} partage ${total} ${c.pl} entre ses ${enfants} matelots, à parts égales. Combien chacun en reçoit-il ?`,
          `La maîtresse de ${p.nom} distribue ${total} ${c.pl} à ${enfants} tables, autant à chaque table. Combien par table ?`,
        ]),
        parEnfant,
        [parEnfant + 1, parEnfant - 1, total - enfants, enfants],
        exp(
          "Chercher la valeur d'une part, c'est partager équitablement.",
          "On distribue un par un, à tour de rôle, ou on cherche le nombre qui, répété, redonne le total.",
          `${enfants} × ${parEnfant} = ${total} : chacun reçoit ${parEnfant} ${c.pl}.`,
          `Chacun reçoit ${parEnfant} ${c.pl}.`,
        ),
        pile(0.65) ? dessinQuantite(c, total) : undefined,
      );
    },
  ),

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
  gab(
    "ce1_probleme_mixte_tpl_1",
    "ce1_probleme_mixte",
    5,
    "Multiplication d'abord, soustraction ensuite.",
    ["mixte"],
    () => {
      const p = enfant();
      const combien = ri(2, 9);
      const prix = rc([2, 3, 4, 5] as const);
      const total = combien * prix;
      const quoi = rc(["crêpes", "cahiers", "bouteilles d'eau", "sachets de bonbons", "ballons", "petites voitures", "tickets de manège", "pots de peinture", "livres de coloriage"]);
      const lieu = rc(["à la kermesse", "au marché", "à la papeterie", "au magasin", "à la fête de l'école", "à la boutique du zoo"]);
      if (pile(0.5)) {
        const donne = total <= 20 ? 20 : 50;
        const rendu = donne - total;
        return nombreOuQcm(
          rc([
            `${maj(lieu)}, ${p.nom} achète ${combien} ${quoi} à ${prix} € pièce. ${maj(p.il)} donne un billet de ${donne} €. Combien lui rend-on ?`,
            `${p.nom} paie ${combien} ${quoi} à ${prix} € pièce avec ${donne} €. Combien d'euros lui rend-on ?`,
            `${maj(lieu)}, un objet coûte ${prix} €. ${p.nom} en prend ${combien} et paie avec un billet de ${donne} €. Combien lui rend-on ?`,
          ]),
          rendu,
          [donne - prix, total, rendu + prix, rendu + 1].filter((x) => x !== rendu),
          exp(
            "Un problème mixte demande deux calculs de natures différentes.",
            "On cherche d'abord le prix total par une multiplication, puis le rendu par une soustraction.",
            `${combien} × ${prix} = ${total} €. Puis ${donne} - ${total} = ${rendu} €.`,
            `On lui rend ${rendu} €.`,
          ),
          pile(0.5) ? { kind: "monnaie", elements: [{ valeur: donne === 20 ? "20e" : "50e" }] } : undefined,
          "€",
        );
      }
      // Le porte-monnaie dessiné : ce qu'il a, ce qu'il dépense, ce qui reste.
      const a = total + ri(1, 15);
      const dessin = dessinArgent(a);
      return nombreOuQcm(
        rc([
          `Voici le porte-monnaie de ${p.nom}. ${maj(p.il)} achète ${combien} ${quoi} à ${prix} € pièce. Combien d'euros lui reste-t-il ?`,
          `${p.nom} a ${a} €. ${maj(lieu)}, ${p.il} achète ${combien} ${quoi} à ${prix} € pièce. Combien lui reste-t-il ?`,
        ]),
        a - total,
        [a - prix, total, a - total + prix, a - total + 1],
        exp(
          "Un problème mixte demande deux calculs de natures différentes.",
          "On calcule d'abord la dépense (multiplication), puis ce qui reste (soustraction).",
          `${combien} × ${prix} = ${total} €. Puis ${a} - ${total} = ${a - total} €.`,
          `Il lui reste ${a - total} €.`,
        ),
        dessin,
        "€",
      );
    },
  ),
  gab(
    "ce1_probleme_mixte_tpl_2",
    "ce1_probleme_mixte",
    5,
    "Calcule d'abord les paquets, puis ajoute ou enlève le reste.",
    ["mixte"],
    () => {
      const p = enfant();
      const famille = rc(["deux_prix", "paquets_plus", "paquets_moins"] as const);
      if (famille === "deux_prix") {
        const nb = ri(2, 6);
        const prixA = rc([2, 3, 4] as const);
        const prixB = rc([1, 2, 5] as const);
        const total = nb * prixA + nb * prixB;
        const objets = rc([
          ["cahiers", "protège-cahiers", "À la papeterie"],
          ["crêpes", "jus de fruits", "À la kermesse"],
          ["tickets de cirque", "sachets de pop-corn", "Au cirque"],
          ["pots de fleurs", "sachets de graines", "Au marché"],
          ["ballons", "sifflets", "Au magasin de jouets"],
        ]);
        return nombreOuQcm(
          `${objets[2]}, les ${objets[0]} coûtent ${prixA} € pièce et les ${objets[1]} ${prixB} €. ${p.nom} achète ${nb} ${objets[0]} et autant de ${objets[1]}. Combien paie-t-${p.il} en tout ?`,
          total,
          [nb * prixA + prixB, nb * (prixA + prixB) + nb, total + prixA, prixA + prixB],
          exp(
            "Un problème mixte demande plusieurs calculs, qu'on organise avant de se lancer.",
            "On calcule le prix de chaque sorte d'objets, puis on additionne.",
            `${nb} × ${prixA} = ${nb * prixA} € et ${nb} × ${prixB} = ${nb * prixB} €. En tout : ${nb * prixA} + ${nb * prixB} = ${total} €.`,
            `${p.nom} paie ${total} €.`,
          ),
          undefined,
          "€",
        );
      }
      const k = ri(2, 6);
      const t = rc([2, 3, 4, 5, 10] as const);
      const extra = ri(2, 9);
      const plus = famille === "paquets_plus";
      const r = plus ? k * t + extra : k * t - extra;
      const h = rc([
        { a: `${p.nom} a ${k} sachets de ${t} billes`, plus: `et ${extra} billes dans sa poche`, moins: `et ${p.il} perd ${extra} billes`, quoi: "billes" },
        { a: `Pour la fête, ${p.nom} prépare ${k} assiettes de ${t} crêpes`, plus: `et ${extra} crêpes en plus pour la maîtresse`, moins: `mais le chien en mange ${extra}`, quoi: "crêpes" },
        { a: `Dans la ferme, il y a ${k} enclos de ${t} moutons`, plus: `et ${extra} moutons dans le pré`, moins: `mais ${extra} moutons se sauvent`, quoi: "moutons" },
        { a: `Pour le jeu de ${p.nom}, il y a ${k} équipes de ${t} enfants`, plus: `et ${extra} arbitres`, moins: `mais ${extra} enfants sont absents`, quoi: "personnes" },
        { a: `${p.il === "elle" ? "La" : "Le"} pirate ${p.nom} a ${k} coffres de ${t} pièces d'or`, plus: `et ${extra} pièces dans son chapeau`, moins: `mais ${p.il} en perd ${extra} dans la mer`, quoi: "pièces d'or" },
        { a: `La fusée de ${p.nom} a ${k} étages de ${t} hublots`, plus: `et ${extra} hublots sur le nez`, moins: `mais ${extra} hublots sont cassés`, quoi: plus ? "hublots" : "hublots en bon état" },
      ]);
      const dessin = t <= 5 && pile(0.6) ? dessinJetons(t, undefined, "Dans un seul paquet") : undefined;
      return nombreOuQcm(
        `${h.a}, ${plus ? h.plus : h.moins}. Combien de ${h.quoi} ${plus ? "en tout" : "reste-t-il"} ?`,
        r,
        [k * t, plus ? k + t + extra : k * t + extra, r + t, r + 1].filter((x) => x !== r && x > 0),
        exp(
          "Un problème mixte enchaîne une multiplication et une addition ou une soustraction.",
          "On calcule d'abord les paquets pareils, puis on ajoute ou on enlève le reste.",
          `${k} × ${t} = ${k * t}. Puis ${k * t} ${plus ? "+" : "-"} ${extra} = ${r}.`,
          `Cela fait ${r} ${h.quoi}.`,
        ),
        dessin,
      );
    },
  ),

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
  gab(
    "ce1_probleme_schema_tpl_2",
    "ce1_probleme_schema",
    3,
    "La barre entière, c'est le tout ; les morceaux, ce sont les parties.",
    ["schema", "canvas"],
    () => {
      const h = rc(histoiresTout());
      const a = ri(12, 300);
      const b = ri(11, 300);
      const t = a + b;
      const famille = rc(["que_represente", "quel_calcul", "valeur"] as const);
      const barre = dessinBarre({ total: "?", parts: [{ label: h.p1, value: String(a) }, { label: h.p2, value: String(b) }] });
      if (famille === "que_represente") {
        return qcmTexte(
          `${h.avant(a, b)} Sur ce schéma, que représente le point d'interrogation au-dessus de la barre ?`,
          `le nombre total de ${h.quoi}`,
          [`les ${h.quoi} « ${h.p1} » seulement`, `les ${h.quoi} « ${h.p2} » seulement`, `la différence entre les deux`],
          exp(
            "Un schéma en barre montre le tout au-dessus, et ses parties à l'intérieur.",
            "On lit d'abord la barre entière, puis les morceaux qui la composent.",
            `Les deux morceaux valent ${a} et ${b}. Le « ? » au-dessus, c'est la barre entière : tous les ${h.quoi}.`,
            `C'est le nombre total de ${h.quoi}.`,
          ),
          barre,
        );
      }
      if (famille === "quel_calcul") {
        return qcmTexte(
          `${h.avant(a, b)} Avec ce schéma, quel calcul donne le nombre total de ${h.quoi} ?`,
          `${a} + ${b}`,
          [a > b ? `${a} - ${b}` : `${b} - ${a}`, `${a} × ${b}`, `${a} + ${a}`],
          exp(
            "Quand on connaît les deux parties, le tout est leur somme.",
            "On réunit les deux morceaux de la barre.",
            `${a} + ${b} = ${t}.`,
            `On calcule ${a} + ${b}.`,
          ),
          barre,
        );
      }
      return nombreOuQcm(
        `${h.avant(a, b)} Le schéma montre l'histoire. Quelle valeur remplace le point d'interrogation ?`,
        t,
        [t + 10, t - 10, Math.abs(a - b)],
        exp(
          "Sur un schéma en barre, le tout est au-dessus et les parties à l'intérieur.",
          "Quand les deux parties sont connues, on les additionne.",
          `${a} + ${b} = ${t}.`,
          `Le point d'interrogation vaut ${t}.`,
        ),
        barre,
      );
    },
  ),
  gab(
    "ce1_probleme_schema_tpl_1",
    "ce1_probleme_schema",
    4,
    "Le point d'interrogation marque ce qu'on cherche.",
    ["schema", "canvas"],
    () => {
      const h = rc(histoiresTout());
      const t = ri(60, 700);
      const a = ri(20, t - 20);
      const b = t - a;
      const barre = dessinBarre({ total: String(t), parts: [{ label: h.p1, value: String(a) }, { label: h.p2, unknown: true }] });
      const famille = rc(["valeur", "valeur", "quel_calcul", "quelle_histoire"] as const);
      const explication = exp(
        "Sur un schéma en barre, le tout est écrit au-dessus et les parties à l'intérieur.",
        "Quand le tout et une partie sont connus, on enlève la partie au tout.",
        `${t} - ${a} = ${b}. On vérifie : ${a} + ${b} = ${t}.`,
        `Le point d'interrogation vaut ${b}.`,
      );
      if (famille === "valeur") {
        return nombreOuQcm(
          `${h.total(t)} ${rc([`Sur le schéma, la case « ${h.p1} » vaut ${a}.`, `La partie « ${h.p1} » compte ${a}.`])} ${rc(["Quelle valeur remplace le point d'interrogation ?", `Que vaut la case « ${h.p2} » ? Aide-toi du schéma.`])}`,
          b,
          [t + a, b + 10, b - 10],
          explication,
          barre,
        );
      }
      if (famille === "quel_calcul") {
        return qcmTexte(
          `${h.total(t)} Sur le schéma, la case « ${h.p1} » vaut ${a}. Quel calcul permet de trouver le point d'interrogation ?`,
          `${t} - ${a}`,
          [`${t} + ${a}`, `${a} - ${t}`, `${t} × ${a}`],
          explication,
          barre,
        );
      }
      return qcmTexte(
        `Ce schéma raconte une histoire de ${h.quoi}. Quelle question cherche-t-on ?`,
        `combien de ${h.quoi} sont « ${h.p2} »`,
        [`combien de ${h.quoi} il y a en tout`, `combien de ${h.quoi} sont « ${h.p1} »`, `combien de ${h.quoi} en plus`],
        exp(
          "Sur un schéma en barre, le « ? » marque ce qu'on cherche.",
          "On regarde où est placé le point d'interrogation.",
          `Le tout (${t}) et la partie « ${h.p1} » (${a}) sont connus. Le « ? » est sur la partie « ${h.p2} ».`,
          `On cherche combien de ${h.quoi} sont « ${h.p2} ».`,
        ),
        barre,
      );
    },
  ),

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
  gab(
    "ce1_probleme_reponse_tpl_2",
    "ce1_probleme_reponse",
    3,
    "Ta réponse doit dire de quoi on parle.",
    ["reponse"],
    () => {
      const p = enfant();
      const c = chose();
      const n = ri(3, 15);
      const famille = rc(["unite", "phrase"] as const);
      const explication = exp(
        "Répondre à un problème, c'est revenir à l'histoire, pas seulement donner un nombre.",
        "On relit la question pour savoir de quoi on parle.",
        `La question parle de ${c.pl} : la réponse est « ${n} ${c.pl} ».`,
        `On répond avec le nombre et l'unité.`,
      );
      if (famille === "unite") {
        return qcmTexte(
          rc([
            `${p.nom} compte ses ${c.pl} : la question est « Combien de ${c.pl} a-t-${p.il} ? ». Le calcul donne ${n}. Que doit-${p.il} écrire ?`,
            `Problème : « Combien de ${c.pl} ${p.nom} a-t-${p.il} ? ». Le calcul donne ${n}. Quelle réponse est la bonne ?`,
          ]),
          `${n} ${c.pl}`,
          [String(n), `${n} €`, `${n} enfants`, `${n} cm`],
          explication,
          pile(0.6) ? dessinQuantite(c, n) : undefined,
        );
      }
      return qcmTexte(
        rc([
          `${p.nom} a trouvé ${n}. La question était : « Combien de ${c.pl} reste-t-il ? ». Quelle phrase répond à la question ?`,
          `La question : « Combien de ${c.pl} reste-t-il ? ». ${p.nom} a calculé ${n}. Quelle est la bonne phrase-réponse ?`,
        ]),
        `Il reste ${n} ${c.pl}.`,
        [`Il reste ${n}.`, `Il y a ${n} ${c.pl} en plus.`, `Il reste ${n} €.`, `${maj(p.il)} a ${n + 1} ${c.pl}.`],
        explication,
        pile(0.5) ? dessinQuantite(c, n) : undefined,
      );
    },
  ),
  gab(
    "ce1_probleme_reponse_tpl_1",
    "ce1_probleme_reponse",
    4,
    "Relis la question : de quoi parle-t-elle ?",
    ["reponse"],
    () => {
      const p = enfant();
      const cas = rc([
        { histoire: `${p.nom} a 50 €. ${maj(p.il)} dépense une partie à la kermesse.`, question: "Combien d'euros lui reste-t-il ?", bonne: (n: number) => `Il lui reste ${n} €.`, faux: (n: number) => [`Il lui reste ${n} billes.`, `${maj(p.il)} a dépensé ${n} €.`, `Il lui reste ${n}.`] },
        { histoire: `Dans la classe de ${p.nom}, il y a des filles et des garçons.`, question: "Combien y a-t-il de garçons ?", bonne: (n: number) => `Il y a ${n} garçons.`, faux: (n: number) => [`Il y a ${n} enfants.`, `Il y a ${n} filles.`, `${n}.`] },
        { histoire: `La ficelle de ${p.nom} mesure 90 cm. ${maj(p.il)} en coupe un morceau.`, question: "Quelle longueur de ficelle reste-t-il ?", bonne: (n: number) => `Il reste ${n} cm de ficelle.`, faux: (n: number) => [`Il reste ${n} ficelles.`, `${maj(p.il)} a coupé ${n} cm.`, `Il reste ${n} €.`] },
        { histoire: `Le livre de ${p.nom} a des pages. ${maj(p.il)} en a lu une partie.`, question: "Combien de pages lui reste-t-il à lire ?", bonne: (n: number) => `Il lui reste ${n} pages à lire.`, faux: (n: number) => [`${maj(p.il)} a lu ${n} pages.`, `Il lui reste ${n} livres.`, `${n} minutes.`] },
        { histoire: `${p.il === "elle" ? "La" : "Le"} pirate ${p.nom} partage son trésor avec ses matelots.`, question: "Combien de pièces d'or reçoit chaque matelot ?", bonne: (n: number) => `Chaque matelot reçoit ${n} pièces d'or.`, faux: (n: number) => [`Il y a ${n} matelots.`, `Chaque matelot reçoit ${n} €.`, `${p.nom} garde ${n} pièces.`] },
        { histoire: `Au zoo, ${p.nom} compte les animaux de deux enclos.`, question: "Combien de singes y a-t-il en tout ?", bonne: (n: number) => `Il y a ${n} singes en tout.`, faux: (n: number) => [`Il y a ${n} enclos.`, `Il y a ${n} singes de plus.`, `${n}.`] },
        { histoire: `Le jardinier range des pots de fleurs sur des étagères.`, question: "Combien d'étagères faut-il ?", bonne: (n: number) => `Il faut ${n} étagères.`, faux: (n: number) => [`Il faut ${n} pots.`, `Il y a ${n} fleurs.`, `${n}.`] },
        { histoire: `Pic le paille-en-queue mange des graines toute la journée. ${p.nom} les compte.`, question: "Combien de graines Pic a-t-il mangées ?", bonne: (n: number) => `Pic a mangé ${n} graines.`, faux: (n: number) => [`Il reste ${n} graines.`, `Pic a mangé ${n} fois.`, `${n}.`] },
      ]);
      const n = ri(4, 45);
      return qcmTexte(
        rc([
          `${cas.histoire} ${cas.question} Le calcul donne ${n}. Quelle phrase répond à la question ?`,
          `${cas.histoire} On demande : « ${cas.question} » ${p.nom} trouve ${n}. Quelle est la bonne réponse ?`,
        ]),
        cas.bonne(n),
        cas.faux(n),
        exp(
          "Une réponse à un problème contient le nombre ET l'unité de la question.",
          "On relit la question pour savoir de quoi on parle, puis on répond par une phrase.",
          `La question demande : « ${cas.question} ». La réponse reprend ses mots : « ${cas.bonne(n)} »`,
          `La bonne réponse est : ${cas.bonne(n)}`,
        ),
      );
    },
  ),

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
