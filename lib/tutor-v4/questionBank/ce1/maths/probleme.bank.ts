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
  de,
} from "./calcul-outils-ce1";

/** « que Noa », « qu'Élia ». */
const que = (nom: string) => (/^[aeiouyàâéèêëîïôœh]/i.test(nom) ? `qu'${nom}` : `que ${nom}`);
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
  // ⛔ 14/11/2026 — ÉNONCÉS COURTS : une demi-phrase de contexte, pas plus. Le
  // prof les trouvait trop longs pour des enfants de 7 ans (cible : 16 mots).
  return [
    {
      avant: (a, b) => `${p.nom} mange ${a} raisins verts et ${b} noirs.`,
      total: (t) => `${p.nom} mange ${t} raisins, verts ou noirs.`,
      partie: (n, k) => `${n} sont ${k === 1 ? "verts" : "noirs"}.`,
      question: (k) => `Combien sont ${k === 1 ? "verts" : "noirs"} ?`,
      quoi: "raisins", p1: "verts", p2: "noirs",
    },
    {
      avant: (a, b) => `À la ferme, il y a ${a} poules et ${b} canards.`,
      total: (t) => `À la ferme, il y a ${t} poules et canards.`,
      partie: (n, k) => `Il y a ${n} ${k === 1 ? "poules" : "canards"}.`,
      question: (k) => `Combien de ${k === 1 ? "poules" : "canards"} ?`,
      quoi: "animaux", p1: "poules", p2: "canards",
    },
    {
      avant: (a, b) => `${x.nom} a ${a} cartes et ${y.nom} en a ${b}.`,
      total: (t) => `${x.nom} et ${y.nom} ont ${t} cartes à eux deux.`,
      partie: (n, k) => `${k === 1 ? x.nom : y.nom} en a ${n}.`,
      question: (k) => `Combien en a ${k === 1 ? x.nom : y.nom} ?`,
      quoi: "cartes", p1: x.nom, p2: y.nom,
    },
    {
      avant: (a, b) => `Un pirate cache ${a} pièces au coffre et ${b} dans la grotte.`,
      total: (t) => `Un pirate cache ${t} pièces en deux endroits.`,
      partie: (n, k) => `${n} sont ${k === 1 ? "au coffre" : "dans la grotte"}.`,
      question: (k) => `Combien sont ${k === 1 ? "au coffre" : "dans la grotte"} ?`,
      quoi: "pièces", p1: "coffre", p2: "grotte",
    },
    {
      avant: (a, b) => `${p.nom} vend ${a} crêpes le matin et ${b} l'après-midi.`,
      total: (t) => `${p.nom} vend ${t} crêpes dans la journée.`,
      partie: (n, k) => `${maj(p.il)} en vend ${n} ${k === 1 ? "le matin" : "l'après-midi"}.`,
      question: (k) => `Combien en vend-${p.il} ${k === 1 ? "le matin" : "l'après-midi"} ?`,
      quoi: "crêpes", p1: "matin", p2: "après-midi",
    },
    {
      avant: (a, b) => `La bibliothèque a ${a} albums et ${b} BD.`,
      total: (t) => `La bibliothèque a ${t} livres : albums et BD.`,
      partie: (n, k) => `Il y a ${n} ${k === 1 ? "albums" : "BD"}.`,
      question: (k) => `Combien ${k === 1 ? "d'albums" : "de BD"} ?`,
      quoi: "livres", p1: "albums", p2: "BD",
    },
    {
      avant: (a, b) => `Le jardinier plante ${a} tulipes et ${b} roses.`,
      total: (t) => `Le jardinier plante ${t} fleurs : tulipes et roses.`,
      partie: (n, k) => `Il plante ${n} ${k === 1 ? "tulipes" : "roses"}.`,
      question: (k) => `Combien de ${k === 1 ? "tulipes" : "roses"} plante-t-il ?`,
      quoi: "fleurs", p1: "tulipes", p2: "roses",
    },
    {
      avant: (a, b) => `Au zoo, l'enclos 1 a ${a} singes, l'enclos 2 en a ${b}.`,
      total: (t) => `Au zoo, deux enclos ont ${t} singes.`,
      partie: (n, k) => `L'enclos ${k} en a ${n}.`,
      question: (k) => `Combien en a l'enclos ${k} ?`,
      quoi: "singes", p1: "enclos 1", p2: "enclos 2",
    },
    {
      avant: (a, b) => `La fusée a ${a} étoiles à gauche et ${b} à droite.`,
      total: (t) => `La fusée a ${t} étoiles, à gauche et à droite.`,
      partie: (n, k) => `${n} sont ${k === 1 ? "à gauche" : "à droite"}.`,
      question: (k) => `Combien sont ${k === 1 ? "à gauche" : "à droite"} ?`,
      quoi: "étoiles", p1: "gauche", p2: "droite",
    },
    {
      avant: (a, b) => `Pic l'oiseau ramasse ${a} graines le matin et ${b} le soir.`,
      total: (t) => `Pic l'oiseau ramasse ${t} graines par jour.`,
      partie: (n, k) => `Il en ramasse ${n} ${k === 1 ? "le matin" : "le soir"}.`,
      question: (k) => `Et ${k === 1 ? "le matin" : "le soir"}, combien ?`,
      quoi: "graines", p1: "matin", p2: "soir",
    },
    {
      avant: (a, b) => `À la piscine, il y a ${a} filles et ${b} garçons.`,
      total: (t) => `À la piscine, ${t} enfants nagent.`,
      partie: (n, k) => `Il y a ${n} ${k === 1 ? "filles" : "garçons"}.`,
      question: (k) => `Combien de ${k === 1 ? "filles" : "garçons"} ?`,
      quoi: "enfants", p1: "filles", p2: "garçons",
    },
    {
      avant: (a, b) => `La boulangère a fait ${a} croissants et ${b} pains au chocolat.`,
      total: (t) => `La boulangère a ${t} croissants et pains au chocolat.`,
      partie: (n, k) => `${n} sont des ${k === 1 ? "croissants" : "pains au chocolat"}.`,
      question: (k) => `Combien de ${k === 1 ? "croissants" : "pains au chocolat"} ?`,
      quoi: "viennoiseries", p1: "croissants", p2: "pains au choc.",
    },
    {
      avant: (a, b) => `L'aquarium a ${a} poissons rouges et ${b} bleus.`,
      total: (t) => `L'aquarium a ${t} poissons, rouges ou bleus.`,
      partie: (n, k) => `${n} sont ${k === 1 ? "rouges" : "bleus"}.`,
      question: (k) => `Combien sont ${k === 1 ? "rouges" : "bleus"} ?`,
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
    text: "Léo a 188 billes, Lucie 75 de PLUS que lui. Quelle opération pour les billes de Lucie ?",
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
    canvas: dessinBarre({
      total: "?",
      parts: [{ label: "comme Léo", value: "188" }, { label: "de plus", value: "75" }],
      questionLabel: "Les billes de Lucie",
    }),
    tags: ["ce1", "probleme", "operation", "canvas", "qcm"],
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
    text: "Léo a 188 billes, 75 de PLUS que Lucie. Quelle opération pour les billes de Lucie ?",
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
          ? `${a} a ${grand} images, ${b} ${ecart} de plus ${que(a)}. Quelle opération pour les images ${de(b)} ?`
          : `${a} a ${grand} images, ${ecart} de plus ${que(b)}. Quelle opération pour les images ${de(b)} ?`,
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
        // ⭐ Le schéma de la comparaison : le plus grand des deux est le TOUT,
        // l'écart en est un morceau. Où tombe le « ? » décide de l'opération.
        ...(pile(0.5)
          ? {
              canvas: versLeHaut
                ? dessinBarre({ total: "?", parts: [{ label: `comme ${a}`, value: String(grand) }, { label: "de plus", value: String(ecart) }], questionLabel: `Les images de ${b}` })
                : dessinBarre({ total: String(grand), parts: [{ label: `comme ${b}`, unknown: true }, { label: "de plus", value: String(ecart) }], questionLabel: `Les images de ${a}` }),
            }
          : {}),
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
    text: "J'ai 227 billes dans deux coffres, dont 113 dans le vert. Combien dans le coffre rouge ?",
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
      const q = rc([`Combien ${de(h.quoi)} en tout ?`, "Combien en tout ?", "Quel est le total ?"]);
      if (pile(0.15)) {
        const [x, y] = deuxEnfants();
        const m1 = ri(3, 30);
        const m2 = ri(3, 30);
        const d1 = dessinArgent(m1);
        const d2 = dessinArgent(m2);
        if (d1 && d2) {
          return nombreOuQcm(
            rc([`Voici l'argent de ${x.nom} et de ${y.nom}. Combien d'euros ont-ils à eux deux ?`, `${x.nom} et ${y.nom} vident leurs tirelires. Combien d'euros ont-ils ensemble ?`]),
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
            `${p.nom} gagne ${gagne} ${c.pl}. Maintenant, ${p.il} en a ${fin}. Combien en avait-${p.il} avant ?`,
            `${p.nom} reçoit ${gagne} ${c.pl} de plus et en a ${fin}. Combien en avait-${p.il} ?`,
            `On ajoute ${gagne} livres à la bibliothèque. Il y en a ${fin}. Combien y en avait-il avant ?`,
            `Le train prend ${gagne} voyageurs de plus. Il en a ${fin}. Combien en avait-il avant ?`,
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
    text: "L'école a 111 garçons et 257 filles. Combien de filles de plus que de garçons ?",
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
        text: `${a} a ${grand} ${objet} et ${b} ${petit}. Combien en a ${a} de plus ${que(b)} ?`,
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
        text: `${a} a ${grand} € dans sa tirelire, ${ecart} € de plus ${que(b)}. Combien d'euros a ${b} ?`,
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
    text: "La classe a 83 livres. On en apporte 18, on en emprunte 27. Combien en reste-t-il ?",
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
        { a: "une tarte", b: "un gâteau", pa: [8, 18], pb: [10, 25] },
        { a: "un livre", b: "une BD", pa: [5, 20], pb: [8, 15] },
        { a: "des fraises", b: "un melon", pa: [3, 8], pb: [2, 5] },
        { a: "une crêpe", b: "un jus", pa: [2, 5], pb: [2, 4] },
        { a: "un ballon", b: "une toupie", pa: [3, 15], pb: [3, 12] },
        { a: "un ticket", b: "une peluche", pa: [8, 20], pb: [6, 25] },
        { a: "un cahier", b: "une trousse", pa: [2, 6], pb: [4, 15] },
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
        `${maj(lieu.a)} : ${prix1} €. ${maj(lieu.b)} : ${prix2} €. ${p.nom} paie les deux avec ${donne} €. Combien lui rend-on ?`,
        `${p.nom} paie ${lieu.a} (${prix1} €) et ${lieu.b} (${prix2} €) avec ${donne} €. Combien lui rend-on ?`,
        `${maj(lieu.a)} coûte ${prix1} €, ${lieu.b} ${prix2} €. ${p.nom} achète les deux avec ${donne} €. Combien lui rend-on ?`,
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
        `Le bus transporte ${depart} enfants. ${moins} descendent, puis ${plus} montent. Combien sont dans le bus ?`,
        `${p.nom} a ${depart} billes. ${maj(p.il)} en perd ${moins}, puis en gagne ${plus}. Combien en a-t-${p.il} ?`,
        `L'aquarium a ${depart} poissons. On en retire ${moins}, puis en ajoute ${plus}. Combien de poissons maintenant ?`,
        `Un pirate a ${depart} pièces. Il en dépense ${moins}, puis en trouve ${plus}. Combien en a-t-il ?`,
        `${depart} oiseaux sont sur une branche. ${moins} s'envolent, puis ${plus} arrivent. Combien sont là maintenant ?`,
        `${p.nom} a ${depart} images. ${maj(p.il)} en donne ${moins}, puis en achète ${plus}. Combien en a-t-${p.il} ?`,
        `Un dragon a ${depart} pierres. Il en perd ${moins}, puis en trouve ${plus}. Combien en a-t-il ?`,
        `La fermière a ${depart} œufs. Elle en vend ${moins}, puis en ramasse ${plus}. Combien en a-t-elle ?`,
        `À la piscine, ${depart} enfants nagent. ${moins} sortent, puis ${plus} plongent. Combien nagent maintenant ?`,
      ]);
      return nombreOuQcm(
        h,
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
    text: "Paul apporte 8 paquets de 7 biscuits. Combien y a-t-il de biscuits en tout ?",
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
    text: "60 élèves de CE1 forment des équipes de 5. Combien y aura-t-il d'équipes ?",
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
          `${p.nom} a ${nbParts} ${pq.des} de ${parPart} ${pq.quoi}. Combien ${de(pq.quoi)} en tout ?`,
          `${nbParts} ${pq.des}, avec ${parPart} ${pq.quoi} dans chaque ${pq.un}. Combien ${de(pq.quoi)} en tout ?`,
          `${p.nom} prépare ${nbParts} ${pq.des} de ${parPart} ${pq.quoi}. Combien ${de(pq.quoi)} cela fait-il ?`,
        ]);
        return nombreOuQcm(
          text,
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
          `${p.nom} range ${total} ${pq.quoi} par ${pq.des} de ${parPart}. Combien ${de(pq.des)} remplit-${p.il} ?`,
          `On met ${parPart} ${pq.quoi} par ${pq.un}. ${p.nom} en a ${total}. Combien ${de(pq.des)} faut-il ?`,
          `Avec ${total} ${pq.quoi}, ${p.nom} fait des ${pq.des} de ${parPart}. Combien en fait-${p.il} ?`,
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
          `${enfants} enfants se partagent ${total} ${c.pl} à parts égales. Combien chacun en reçoit-il ?`,
          `${p.nom} partage ${total} ${c.pl} entre ${enfants} amis, à parts égales. Combien chacun en a-t-il ?`,
          `${p.nom} range ${total} ${c.pl} dans ${enfants} boîtes, autant dans chacune. Combien par boîte ?`,
          `Un pirate partage ${total} ${c.pl} entre ${enfants} matelots, à parts égales. Combien pour chacun ?`,
          `La maîtresse distribue ${total} ${c.pl} à ${enfants} tables, autant à chacune. Combien par table ?`,
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
    text: "Abi achète 7 litres d'huile à 2 € le litre. Elle paie avec 20 €. Combien lui rend-on ?",
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
      const quoi = rc(["crêpes", "cahiers", "stylos", "ballons", "gâteaux", "livres", "peluches", "glaces", "bouquets"]);
      const lieu = rc(["à la kermesse", "au marché", "à la papeterie", "au magasin", "à la fête", "au zoo"]);
      if (pile(0.5)) {
        const donne = total <= 20 ? 20 : 50;
        const rendu = donne - total;
        return nombreOuQcm(
          rc([
            `${p.nom} achète ${combien} ${quoi} à ${prix} € pièce. ${maj(p.il)} paie avec ${donne} €. Combien lui rend-on ?`,
            `${p.nom} paie ${combien} ${quoi} à ${prix} € pièce avec ${donne} €. Combien d'euros lui rend-on ?`,
            `${maj(lieu)}, ${combien} ${quoi} à ${prix} € pièce. ${p.nom} paie avec ${donne} €. Combien lui rend-on ?`,
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
          `Voici le porte-monnaie de ${p.nom}. ${maj(p.il)} achète ${combien} ${quoi} à ${prix} € pièce. Combien lui reste-t-il ?`,
          `${p.nom} a ${a} €. ${maj(p.il)} achète ${combien} ${quoi} à ${prix} € pièce. Combien lui reste-t-il ?`,
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
          ["cahiers", "stylos", "À la papeterie"],
          ["crêpes", "jus", "À la kermesse"],
          ["tickets", "glaces", "Au cirque"],
          ["plantes", "graines", "Au marché"],
          ["ballons", "sifflets", "Au magasin"],
        ]);
        return nombreOuQcm(
          `${objets[2]}, ${p.nom} achète ${nb} ${objets[0]} à ${prixA} € et ${nb} ${objets[1]} à ${prixB} €. Combien paie-t-${p.il} ?`,
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
      const plus = famille === "paquets_plus";
      // ⛔ 11/11/2026 — « 2 sachets de 2 billes, il en perd 9 » : le reste était
      // négatif. On n'enlève jamais plus que ce qu'il y a (il en reste au moins 2).
      const extra = ri(2, plus ? 9 : Math.min(9, k * t - 2));
      const r = plus ? k * t + extra : k * t - extra;
      const h = rc([
        { a: `${p.nom} a ${k} sachets de ${t} billes`, plus: `et ${extra} en poche`, moins: `mais en perd ${extra}`, quoi: "billes" },
        { a: `${p.nom} fait ${k} assiettes de ${t} crêpes`, plus: `et ${extra} de plus`, moins: `mais le chien en mange ${extra}`, quoi: "crêpes" },
        { a: `La ferme a ${k} enclos de ${t} moutons`, plus: `et ${extra} au pré`, moins: `mais ${extra} se sauvent`, quoi: "moutons" },
        { a: `Il y a ${k} équipes de ${t} enfants`, plus: `et ${extra} arbitres`, moins: `mais ${extra} enfants sont absents`, quoi: plus ? "personnes" : "enfants" },
        { a: `Un pirate a ${k} coffres de ${t} pièces`, plus: `et ${extra} autres`, moins: `mais en perd ${extra}`, quoi: "pièces" },
        { a: `La fusée a ${k} étages de ${t} hublots`, plus: `et ${extra} sur le nez`, moins: `mais ${extra} sont cassés`, quoi: plus ? "hublots" : "hublots en bon état" },
      ]);
      const dessin = t <= 5 && pile(0.6) ? dessinJetons(t, undefined, "Dans un seul paquet") : undefined;
      return nombreOuQcm(
        `${h.a}, ${plus ? h.plus : h.moins}. ${plus ? `Combien ${de(h.quoi)} en tout ?` : "Combien en reste-t-il ?"}`,
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
          `${h.avant(a, b)} Que montre le « ? » en haut ?`,
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
          `${h.avant(a, b)} Quel calcul donne le total ?`,
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
        `${h.avant(a, b)} Quel nombre remplace le « ? » ?`,
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
          `${h.total(t)} ${rc(["Quel nombre remplace le « ? » ?", `Que vaut la case « ${h.p2} » ?`, `« ${h.p1} » : ${a}. Que vaut le « ? » ?`])}`,
          b,
          [t + a, b + 10, b - 10],
          explication,
          barre,
        );
      }
      if (famille === "quel_calcul") {
        return qcmTexte(
          `${h.total(t)} Quel calcul trouve le « ? » ?`,
          `${t} - ${a}`,
          [`${t} + ${a}`, `${a} - ${t}`, `${t} × ${a}`],
          explication,
          barre,
        );
      }
      return qcmTexte(
        `Ce schéma raconte une histoire ${de(h.quoi)}. Que cherche-t-on ?`,
        `combien ${de(h.quoi)} sont « ${h.p2} »`,
        [`combien ${de(h.quoi)} il y a en tout`, `combien ${de(h.quoi)} sont « ${h.p1} »`, `combien ${de(h.quoi)} en plus`],
        exp(
          "Sur un schéma en barre, le « ? » marque ce qu'on cherche.",
          "On regarde où est placé le point d'interrogation.",
          `Le tout (${t}) et la partie « ${h.p1} » (${a}) sont connus. Le « ? » est sur la partie « ${h.p2} ».`,
          `On cherche combien ${de(h.quoi)} sont « ${h.p2} ».`,
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
    text: "On demande combien il reste de billes. Un élève répond seulement « 46 ». Que manque-t-il ?",
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
            `« Combien ${de(c.pl)} a ${p.nom} ? » Le calcul donne ${n}. Que faut-il écrire ?`,
            `Problème : « Combien ${de(c.pl)} ${p.nom} a-t-${p.il} ? » Le calcul donne ${n}. Quelle réponse choisir ?`,
          ]),
          `${n} ${c.pl}`,
          [String(n), `${n} €`, `${n} enfants`, `${n} cm`],
          explication,
          pile(0.6) ? dessinQuantite(c, n) : undefined,
        );
      }
      return qcmTexte(
        rc([
          `${p.nom} trouve ${n}. La question : « Combien ${de(c.pl)} reste-t-il ? » Quelle phrase répond ?`,
          `« Combien ${de(c.pl)} reste-t-il ? » ${p.nom} a calculé ${n}. Quelle phrase-réponse choisir ?`,
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
        { histoire: `${p.nom} a 50 € et en dépense une partie.`, question: "Combien d'euros lui reste-t-il ?", bonne: (n: number) => `Il lui reste ${n} €.`, faux: (n: number) => [`Il lui reste ${n} billes.`, `${maj(p.il)} a dépensé ${n} €.`, `Il lui reste ${n}.`] },
        { histoire: "La classe a des filles et des garçons.", question: "Combien de garçons ?", bonne: (n: number) => `Il y a ${n} garçons.`, faux: (n: number) => [`Il y a ${n} enfants.`, `Il y a ${n} filles.`, `${n}.`] },
        { histoire: "On coupe une ficelle de 90 cm.", question: "Quelle longueur reste-t-il ?", bonne: (n: number) => `Il reste ${n} cm de ficelle.`, faux: (n: number) => [`Il reste ${n} ficelles.`, `${maj(p.il)} a coupé ${n} cm.`, `Il reste ${n} €.`] },
        { histoire: `${p.nom} lit un livre.`, question: "Combien de pages lui reste-t-il à lire ?", bonne: (n: number) => `Il lui reste ${n} pages à lire.`, faux: (n: number) => [`${maj(p.il)} a lu ${n} pages.`, `Il lui reste ${n} livres.`, `${n} minutes.`] },
        { histoire: "Un pirate partage son or.", question: "Combien de pièces d'or reçoit chaque matelot ?", bonne: (n: number) => `Chaque matelot reçoit ${n} pièces d'or.`, faux: (n: number) => [`Il y a ${n} matelots.`, `Chaque matelot reçoit ${n} €.`, `${p.nom} garde ${n} pièces.`] },
        { histoire: "Au zoo, deux enclos.", question: "Combien de singes en tout ?", bonne: (n: number) => `Il y a ${n} singes en tout.`, faux: (n: number) => [`Il y a ${n} enclos.`, `Il y a ${n} singes de plus.`, `${n}.`] },
        { histoire: "Le jardinier range des pots sur des étagères.", question: "Combien d'étagères faut-il ?", bonne: (n: number) => `Il faut ${n} étagères.`, faux: (n: number) => [`Il faut ${n} pots.`, `Il y a ${n} fleurs.`, `${n}.`] },
        { histoire: "Pic l'oiseau mange des graines.", question: "Combien de graines Pic a-t-il mangées ?", bonne: (n: number) => `Pic a mangé ${n} graines.`, faux: (n: number) => [`Il reste ${n} graines.`, `Pic a mangé ${n} fois.`, `${n}.`] },
      ]);
      const n = ri(4, 45);
      return qcmTexte(
        rc([
          `« ${cas.question} » Le calcul donne ${n}. Quelle phrase répond ?`,
          `${cas.histoire} « ${cas.question} » ${p.nom} trouve ${n}. Quelle réponse ?`,
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
    text: "Un album a 350 places. Lucie a 287 photos, Léo 72. Tout rentre-t-il dans l'album ?",
    format: "qcm",
    choices: [
      "non, il manque de la place pour 9 photos",
      "oui, il reste même de la place",
      "oui, tout juste",
      "on ne peut pas savoir",
    ],
    expected: ["non, il manque de la place pour 9 photos"],
    comparator: "mcq_exact",
    hint: "Additionne les deux tas, puis compare à 350.",
    explanation: exp(
      "Pour savoir si ça rentre, on compare le total à la place disponible.",
      "On additionne les deux quantités, puis on compare au nombre de places.",
      "287 + 72 = 359. Or l'album ne contient que 350 photos : il en manque de la place pour 359 - 350 = 9.",
      "Non : il manque de la place pour 9 photos.",
    ),
    canvas: dessinBarre({
      total: "?",
      parts: [{ label: "Lucie", value: "287" }, { label: "Léo", value: "72" }],
      questionLabel: "L'album : 350 places",
    }),
    tags: ["ce1", "probleme", "defi", "canvas", "qcm"],
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
    text: "Dans une boite de 40 jetons, un élève compte 52 jetons rouges. Qu'en penser ?",
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
    canvas: dessinJetons(40, undefined, "La boite : 40 jetons en tout."),
    tags: ["ce1", "probleme", "defi", "piege", "canvas", "qcm"],
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
      const [x, y] = shuffle(PRENOMS).slice(0, 2);
      const bonne = depasse
        ? `non, il manque de la place pour ${total - place}`
        : `oui, il reste de la place pour ${place - total}`;
      return {
        text: `Une boite a ${place} places. ${x} a ${a} images, ${y} ${b}. Tout rentre-t-il dans la boite ?`,
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
        ...(pile(0.6)
          ? { canvas: dessinBarre({ total: "?", parts: [{ label: x, value: String(a) }, { label: y, value: String(b) }], questionLabel: `La boite : ${place} places` }) }
          : {}),
      };
    },
  },
];
