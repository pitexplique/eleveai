// lib/tutor-v4/questionBank/ce2/maths/probleme.bank.ts
//
// PÉRIMÈTRE BO : résolution de problèmes jusqu'à 10 000 (BO n° 41 du
// 31 octobre 2024, cycle 2). Le programme ne demande pas « des problèmes » : il
// en nomme SIX types, et trois d'entre eux n'existaient nulle part dans
// l'application avant le 05/08/2026 — la comparaison multiplicative, le produit
// cartésien, et le problème mixte à trois étapes.
//
//   1. additif en une étape, de type parties-tout
//   2. additif de comparaison en une étape
//   3. additif en deux étapes
//   4. multiplicatif en une étape
//   5. mixte en deux ou trois étapes
//   6. comparaison multiplicative en une étape, et produit cartésien
//
// ⚠️ Aucun résultat ni aucun piège ne descend sous zéro : les nombres relatifs
// entrent en 5e. On ne retire jamais plus qu'il n'y a.

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

function piegesPositifs(valeurs: readonly number[]): string[] {
  return valeurs.filter((v) => v > 0).map((v) => v.toLocaleString("fr-FR"));
}

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

// Les contextes commencent par leur article — « le marché de Saint-Pierre ».
// Quand ils ouvrent la phrase, il faut la majuscule, sinon l'énoncé s'écrit
// « la cantine avait 1 025 gâteaux ».
function majuscule(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// « de ananas » et « que Anaïs » ne s'écrivent pas : devant une voyelle,
// « de » et « que » s'élident.
function commenceParVoyelle(mot: string): boolean {
  return /^[aeiouéèêàîïôûùh]/i.test(mot);
}

function de(mot: string): string {
  return commenceParVoyelle(mot) ? `d'${mot}` : `de ${mot}`;
}

function que(mot: string): string {
  return commenceParVoyelle(mot) ? `qu'${mot}` : `que ${mot}`;
}

// « de le club » ne s'écrit pas non plus : de + le se contracte en du.
function duLieu(lieu: string): string {
  if (lieu.startsWith("le ")) return `du ${lieu.slice(3)}`;
  if (lieu.startsWith("l'")) return `de ${lieu}`;
  return `de ${lieu}`;
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string,
) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

function schemaBarre(data: Omit<SchemaBarreCanvasData, "kind">): SchemaBarreCanvasData {
  return { kind: "schema_barre", ...data };
}

// ============================================================
// CONTEXTES — l'île d'abord, puis l'école et la cour.
// Chaque contexte porte son objet au singulier et au pluriel : les énoncés se
// lisent alors sans faute d'accord, quel que soit le tirage.
// ============================================================

// Le genre voyage avec le contexte et avec le prénom. Sans lui, on écrit « La
// cantine avait 1 637 gâteaux. Il en reçoit 150 », et l'élève de CE2 lit une
// faute avant de lire un problème.
type Contexte = {
  lieu: string;
  objet: string;
  objets: string;
  feminin: boolean;
  theme: "neutral" | "reunion" | "sport" | "cuisine" | "jeux_video";
};

const CONTEXTES: Contexte[] = [
  { lieu: "le marché de Saint-Pierre", objet: "letchi", objets: "letchis", feminin: false, theme: "reunion" },
  { lieu: "la boutique du Tampon", objet: "samoussa", objets: "samoussas", feminin: true, theme: "reunion" },
  { lieu: "la plantation de Sainte-Rose", objet: "ananas", objets: "ananas", feminin: true, theme: "reunion" },
  { lieu: "le club de Saint-Denis", objet: "maillot", objets: "maillots", feminin: false, theme: "sport" },
  { lieu: "la bibliothèque de l'école", objet: "livre", objets: "livres", feminin: true, theme: "neutral" },
  { lieu: "la coopérative de la classe", objet: "cahier", objets: "cahiers", feminin: true, theme: "neutral" },
  { lieu: "la cantine", objet: "gâteau", objets: "gâteaux", feminin: true, theme: "cuisine" },
];

type Personne = { nom: string; feminin: boolean };

const PRENOMS: Personne[] = [
  { nom: "Léa", feminin: true },
  { nom: "Noé", feminin: false },
  { nom: "Maëva", feminin: true },
  { nom: "Ryan", feminin: false },
  { nom: "Anaïs", feminin: true },
  { nom: "Tom", feminin: false },
  { nom: "Naïla", feminin: true },
  { nom: "Ewan", feminin: false },
];

/** « il » ou « elle », selon le sujet. */
function pronom(feminin: boolean, majuscule = false): string {
  const p = feminin ? "elle" : "il";
  return majuscule ? p.charAt(0).toUpperCase() + p.slice(1) : p;
}

/** « Combien Maëva en a-t-elle ? » plutôt que « en a-t-il ou elle ? ». */
function aTIl(feminin: boolean): string {
  return feminin ? "a-t-elle" : "a-t-il";
}

export const problemeBank: TutorBankItemV4[] = [
  // ============================================================
  // ce2_probleme_choisir_operation — Choisir l'opération
  // ============================================================

  {
    kind: "template",
    id: "ce2_probleme_choisir_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_choisir_operation",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi si la quantité augmente, diminue, se répète ou se partage.",
    tags: ["ce2", "probleme", "choisir_operation", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const p = randomChoice(PRENOMS);

      const situations = [
        {
          text: `${p.nom} a ${randomInt(120, 480)} ${c.objets}. On lui en donne ${randomInt(20, 90)}. Combien en ${aTIl(p.feminin)} maintenant ?`,
          operation: "une addition",
          pourquoi: "la quantité augmente : on rassemble deux parts.",
        },
        {
          text: `${p.nom} a ${randomInt(200, 900)} ${c.objets}. ${pronom(p.feminin, true)} en donne ${randomInt(20, 90)}. Combien lui en reste-t-il ?`,
          operation: "une soustraction",
          pourquoi: "la quantité diminue : on enlève une part.",
        },
        {
          text: `${p.nom} range ${randomInt(3, 9)} paquets de ${randomInt(6, 12)} ${c.objets}. Combien y a-t-il ${de(c.objets)} en tout ?`,
          operation: "une multiplication",
          pourquoi: "la même quantité se répète plusieurs fois.",
        },
        {
          text: `${p.nom} partage ${randomInt(4, 9) * randomInt(4, 9)} ${c.objets} entre ${randomInt(4, 9)} camarades, à parts égales. Combien chacun en reçoit-il ?`,
          operation: "une division",
          pourquoi: "on partage un tout en parts égales.",
        },
      ];

      const s = randomChoice(situations);

      return {
        text: `${s.text}\n\nQuelle opération faut-il choisir ?`,
        format: "qcm",
        choices: shuffle([
          "une addition",
          "une soustraction",
          "une multiplication",
          "une division",
        ]),
        expected: [s.operation],
        comparator: "mcq_exact",
        explanation: exp(
          "Choisir l'opération, c'est reconnaître ce que fait l'énoncé à la quantité.",
          "On regarde si la quantité augmente, diminue, se répète à l'identique ou se partage en parts égales.",
          `Ici, ${s.pourquoi}`,
          `Il faut choisir ${s.operation}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_probleme_une_etape — Additif parties-tout
  // ============================================================

  {
    kind: "template",
    id: "ce2_probleme_une_etape_tpl_001_parties_tout",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_une_etape",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux parts qu'on rassemble : on additionne.",
    tags: ["ce2", "probleme", "parties_tout", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const a = randomInt(120, 3800);
      const b = randomInt(90, 2400);
      const total = a + b;

      return {
        text: `Le matin, ${c.lieu} vend ${formatNumber(a)} ${c.objets}. L'après-midi, ${pronom(c.feminin)} en vend ${formatNumber(b)}. Combien ${de(c.objets)} ont été vendus dans la journée ?`,
        format: "qcm",
        choices: makeChoices(
          formatNumber(total),
          piegesPositifs([a - b, total + 100, total - 100, total + 10, total - 10]),
        ),
        expected: [formatNumber(total)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème parties-tout donne deux parts et demande le tout.",
          "On rassemble les deux parts : c'est une addition.",
          `${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(total)}.`,
          `${formatNumber(total)} ${c.objets} ont été vendus dans la journée.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_une_etape_tpl_002_part_manquante",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_une_etape",
    difficulty: 3,
    theme: "neutral",
    hint: "On connaît le tout et une part : on cherche l'autre part.",
    tags: ["ce2", "probleme", "parties_tout", "part_manquante", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const total = randomInt(600, 4800);
      const part = randomInt(150, total - 150);
      const manque = total - part;

      return {
        text: `${majuscule(c.lieu)} a reçu ${formatNumber(total)} ${c.objets} en tout. ${formatNumber(part)} sont déjà rangés. Combien reste-t-il ${de(c.objets)} à ranger ?`,
        format: "qcm",
        choices: makeChoices(
          formatNumber(manque),
          piegesPositifs([total + part, manque + 100, manque - 100, part, manque + 10]),
        ),
        expected: [formatNumber(manque)],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on connaît le tout et une part, on cherche la part qui manque.",
          "On enlève la part connue du tout : c'est une soustraction.",
          `${formatNumber(total)} − ${formatNumber(part)} = ${formatNumber(manque)}.`,
          `Il reste ${formatNumber(manque)} ${c.objets} à ranger.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_probleme_comparaison — Additif de comparaison
  // Nouveau : le programme le distingue explicitement du parties-tout.
  // ============================================================

  {
    kind: "fixed",
    id: "ce2_probleme_comparaison_fixed_001_de_plus_que",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_comparaison",
    difficulty: 3,
    theme: "neutral",
    text: "Maëva a 340 billes. Elle en a 85 de plus que Ryan. Combien Ryan a-t-il de billes ?",
    format: "qcm",
    choices: ["255", "425", "85", "340"],
    expected: ["255"],
    comparator: "mcq_exact",
    hint: "« de plus que » ne veut pas dire qu'il faut ajouter : ici c'est Maëva qui en a le plus.",
    explanation: exp(
      "Un problème de comparaison relie deux quantités par un écart.",
      "On repère qui en a le plus. Ici c'est Maëva : pour trouver Ryan, on enlève l'écart.",
      "340 − 85 = 255.",
      "Ryan a 255 billes.",
    ),
    tags: ["ce2", "probleme", "comparaison", "qcm", "piege"],
  },

  {
    kind: "template",
    id: "ce2_probleme_comparaison_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_comparaison",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche d'abord qui en a le plus, puis décide s'il faut ajouter ou enlever.",
    tags: ["ce2", "probleme", "comparaison", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const [un, deux] = shuffle(PRENOMS).slice(0, 2);
      const petit = randomInt(120, 1800);
      const ecart = randomInt(40, 600);
      const grand = petit + ecart;

      // Deux formulations qui se ressemblent et n'appellent pas la même
      // opération : c'est exactement là que l'élève de CE2 trébuche.
      const versionPlus = randomChoice([true, false]);

      const texte = versionPlus
        ? `${un.nom} a ${formatNumber(grand)} ${c.objets}. ${pronom(un.feminin, true)} en a ${formatNumber(ecart)} de plus ${que(deux.nom)}. Combien ${deux.nom} en ${aTIl(deux.feminin)} ?`
        : `${un.nom} a ${formatNumber(petit)} ${c.objets}. ${pronom(un.feminin, true)} en a ${formatNumber(ecart)} de moins ${que(deux.nom)}. Combien ${deux.nom} en ${aTIl(deux.feminin)} ?`;

      const reponse = versionPlus ? petit : grand;

      return {
        text: texte,
        format: "qcm",
        choices: makeChoices(
          formatNumber(reponse),
          piegesPositifs([
            versionPlus ? grand + ecart : petit - ecart,
            versionPlus ? grand : petit,
            ecart,
            reponse + 100,
            reponse + 10,
          ]),
        ),
        expected: [formatNumber(reponse)],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un problème de comparaison, un écart sépare deux quantités.",
          versionPlus
            ? "« en a de plus que » : celui dont on parle en a le plus, donc on enlève l'écart pour trouver l'autre."
            : "« en a de moins que » : celui dont on parle en a le moins, donc on ajoute l'écart pour trouver l'autre.",
          versionPlus
            ? `${formatNumber(grand)} − ${formatNumber(ecart)} = ${formatNumber(petit)}.`
            : `${formatNumber(petit)} + ${formatNumber(ecart)} = ${formatNumber(grand)}.`,
          `${deux.nom} a ${formatNumber(reponse)} ${c.objets}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_probleme_deux_etapes
  // ============================================================

  {
    kind: "template",
    id: "ce2_probleme_deux_etapes_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_deux_etapes",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais un calcul, note le résultat, puis sers-t'en pour le second.",
    tags: ["ce2", "probleme", "deux_etapes", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const depart = randomInt(800, 4000);
      const recu = randomInt(150, 900);
      const vendu = randomInt(100, depart);
      const apresRecu = depart + recu;
      const final = apresRecu - vendu;

      return {
        text: `${majuscule(c.lieu)} avait ${formatNumber(depart)} ${c.objets}. ${pronom(c.feminin, true)} en reçoit ${formatNumber(recu)}, puis en vend ${formatNumber(vendu)}. Combien lui en reste-t-il ?`,
        format: "qcm",
        choices: makeChoices(
          formatNumber(final),
          piegesPositifs([
            apresRecu,
            depart - vendu,
            depart + recu + vendu,
            final + 100,
            final - 100,
          ]),
        ),
        expected: [formatNumber(final)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème à deux étapes demande deux calculs qui se suivent.",
          "On calcule d'abord ce qu'il y a après la réception, puis on enlève ce qui est vendu.",
          `${formatNumber(depart)} + ${formatNumber(recu)} = ${formatNumber(apresRecu)}, puis ${formatNumber(apresRecu)} − ${formatNumber(vendu)} = ${formatNumber(final)}.`,
          `Il reste ${formatNumber(final)} ${c.objets}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_probleme_trois_etapes — Mixte, nouveau au CE2
  // ============================================================

  {
    kind: "template",
    id: "ce2_probleme_trois_etapes_tpl_001_mixte",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_trois_etapes",
    difficulty: 5,
    theme: "neutral",
    hint: "Trois calculs : combien en tout, combien ajoutés, combien il reste.",
    tags: ["ce2", "probleme", "trois_etapes", "mixte", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const cartons = randomInt(4, 9);
      const parCarton = randomInt(12, 45);
      const enVrac = randomInt(20, 180);
      const total = cartons * parCarton + enVrac;
      const donnes = randomInt(30, total - 30);
      const reste = total - donnes;

      return {
        text: `${majuscule(c.lieu)} range ${cartons} cartons de ${parCarton} ${c.objets}, et ${formatNumber(enVrac)} ${c.objets} en vrac. ${pronom(c.feminin, true)} en donne ensuite ${formatNumber(donnes)}. Combien ${de(c.objets)} lui reste-t-il ?`,
        format: "qcm",
        choices: makeChoices(
          formatNumber(reste),
          piegesPositifs([
            total,
            cartons * parCarton,
            cartons * parCarton - donnes,
            total + donnes,
            reste + 100,
          ]),
        ),
        expected: [formatNumber(reste)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un problème mixte mêle plusieurs opérations différentes.",
          "On calcule le contenu des cartons, on ajoute le vrac, puis on enlève ce qui est donné.",
          `${cartons} × ${parCarton} = ${formatNumber(cartons * parCarton)} ; ${formatNumber(cartons * parCarton)} + ${formatNumber(enVrac)} = ${formatNumber(total)} ; ${formatNumber(total)} − ${formatNumber(donnes)} = ${formatNumber(reste)}.`,
          `Il reste ${formatNumber(reste)} ${c.objets}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_probleme_comparaison_multiplicative — Nouveau au CE2
  // « trois fois plus » n'est pas « trois de plus » : c'est tout le sujet.
  // ============================================================

  {
    kind: "fixed",
    id: "ce2_probleme_compmult_fixed_001_fois_plus",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_comparaison_multiplicative",
    difficulty: 4,
    theme: "neutral",
    text: "Tom a 7 billes. Noé en a 4 fois plus. Combien Noé a-t-il de billes ?",
    format: "qcm",
    choices: ["28", "11", "3", "7"],
    expected: ["28"],
    comparator: "mcq_exact",
    hint: "« 4 fois plus », ce n'est pas « 4 de plus ».",
    explanation: exp(
      "« Fois plus » compare par multiplication, pas par addition.",
      "On multiplie la quantité de départ par le nombre de fois.",
      "7 × 4 = 28. Si Noé en avait eu « 4 de plus », il en aurait eu 11 seulement.",
      "Noé a 28 billes.",
    ),
    tags: ["ce2", "probleme", "comparaison_multiplicative", "qcm", "piege"],
  },

  {
    kind: "template",
    id: "ce2_probleme_compmult_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_comparaison_multiplicative",
    difficulty: 4,
    theme: "neutral",
    hint: "« fois plus » multiplie, « fois moins » partage.",
    tags: ["ce2", "probleme", "comparaison_multiplicative", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const [un, deux] = shuffle(PRENOMS).slice(0, 2);
      const base = randomInt(6, 45);
      const fois = randomInt(3, 9);
      const grand = base * fois;

      const versionPlus = randomChoice([true, false]);
      const texte = versionPlus
        ? `${un.nom} a ${base} ${c.objets}. ${deux.nom} en a ${fois} fois plus. Combien ${deux.nom} en ${aTIl(deux.feminin)} ?`
        : `${un.nom} a ${formatNumber(grand)} ${c.objets}. ${deux.nom} en a ${fois} fois moins. Combien ${deux.nom} en ${aTIl(deux.feminin)} ?`;
      const reponse = versionPlus ? grand : base;

      return {
        text: texte,
        format: "qcm",
        choices: makeChoices(
          formatNumber(reponse),
          piegesPositifs([
            versionPlus ? base + fois : grand - fois,
            versionPlus ? base : grand,
            versionPlus ? grand + base : base + fois,
            reponse + fois,
            fois,
          ]),
        ),
        expected: [formatNumber(reponse)],
        comparator: "mcq_exact",
        explanation: exp(
          "« Fois plus » et « fois moins » comparent en multipliant ou en partageant, jamais en ajoutant.",
          versionPlus
            ? "« fois plus » : on multiplie la quantité de départ."
            : "« fois moins » : on partage la quantité de départ.",
          versionPlus
            ? `${base} × ${fois} = ${formatNumber(grand)}. Avec « ${fois} de plus », on aurait trouvé ${base + fois} seulement.`
            : `${formatNumber(grand)} ÷ ${fois} = ${base}. Avec « ${fois} de moins », on aurait trouvé ${grand - fois}.`,
          `${deux.nom} a ${formatNumber(reponse)} ${c.objets}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_probleme_produit_cartesien — Nouveau au CE2
  // Combien de couples différents peut-on former ?
  // ============================================================

  {
    kind: "template",
    id: "ce2_probleme_cartesien_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_produit_cartesien",
    difficulty: 4,
    theme: "neutral",
    hint: "Chaque choix du premier peut aller avec chaque choix du second.",
    tags: ["ce2", "probleme", "produit_cartesien", "template"],
    generate: () => {
      const situations = [
        { a: "tee-shirts", b: "shorts", quoi: "tenues différentes" },
        { a: "parfums de glace", b: "sortes de cornets", quoi: "glaces différentes" },
        { a: "sortes de pain", b: "garnitures", quoi: "sandwichs différents" },
        { a: "couleurs de stylo", b: "modèles de carnet", quoi: "assortiments différents" },
      ];
      const s = randomChoice(situations);
      const na = randomInt(3, 8);
      const nb = randomInt(3, 8);
      const total = na * nb;

      return {
        text: `Il y a ${na} ${s.a} et ${nb} ${s.b}. Combien ${de(s.quoi)} peut-on former ?`,
        format: "qcm",
        choices: makeChoices(
          String(total),
          piegesPositifs([na + nb, total + na, total - na, na * nb * 2, Math.abs(na - nb)]),
        ),
        expected: [String(total)],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand chaque élément d'un groupe peut se combiner avec chaque élément d'un autre, on compte toutes les paires possibles.",
          "On multiplie le nombre de choix du premier groupe par le nombre de choix du second.",
          `Chacun des ${na} ${s.a} peut aller avec chacun des ${nb} ${s.b} : ${na} × ${nb} = ${total}. En additionnant, on n'aurait trouvé que ${na + nb}.`,
          `On peut former ${total} ${s.quoi}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_probleme_schema_barre — Le schéma en barres
  // ============================================================

  {
    kind: "template",
    id: "ce2_probleme_schema_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_schema_barre",
    difficulty: 3,
    theme: "neutral",
    hint: "La barre entière est le tout ; les morceaux sont les parts.",
    tags: ["ce2", "probleme", "schema_barre", "template", "canvas"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const total = randomInt(400, 2400);
      const connue = randomInt(100, total - 100);
      const manque = total - connue;

      return {
        text: `Le schéma montre les ${c.objets} ${duLieu(c.lieu)}. Quel nombre remplace le point d'interrogation ?`,
        format: "qcm",
        choices: makeChoices(
          formatNumber(manque),
          piegesPositifs([total + connue, connue, manque + 100, manque - 100, total]),
        ),
        expected: [formatNumber(manque)],
        comparator: "mcq_exact",
        canvas: schemaBarre({
          title: `Les ${c.objets} ${duLieu(c.lieu)}`,
          total: formatNumber(total),
          parts: [
            { label: "Déjà rangés", value: formatNumber(connue) },
            { label: "À ranger", unknown: true },
          ],
          questionLabel: "Combien en reste-t-il à ranger ?",
        }),
        explanation: exp(
          "Un schéma en barres montre le tout au-dessus et les parts en dessous.",
          "On lit le tout, on lit la part connue, et on cherche la part qui manque.",
          `${formatNumber(total)} − ${formatNumber(connue)} = ${formatNumber(manque)}.`,
          `Le point d'interrogation vaut ${formatNumber(manque)}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_probleme_verifier — La vraisemblance
  // ============================================================

  {
    kind: "template",
    id: "ce2_probleme_verifier_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Sans calculer, demande-toi si le résultat peut être plus grand ou plus petit que le départ.",
    tags: ["ce2", "probleme", "vraisemblance", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const depart = randomInt(400, 2000);
      const enleve = randomInt(50, 300);
      const juste = depart - enleve;

      // Trois réponses impossibles, chacune pour une raison différente : plus
      // grande que le départ, égale au départ, ou égale à ce qu'on a enlevé.
      const absurdes = [
        {
          valeur: depart + enleve,
          pourquoi: `il est plus grand que le nombre de départ, alors qu'on a enlevé des ${c.objets}`,
        },
        { valeur: depart, pourquoi: "il est égal au nombre de départ, comme si on n'avait rien enlevé" },
        { valeur: enleve, pourquoi: "c'est le nombre enlevé, pas ce qui reste" },
      ];
      const faux = randomChoice(absurdes);

      return {
        text: `${majuscule(c.lieu)} avait ${formatNumber(depart)} ${c.objets} et en a donné ${formatNumber(enleve)}. Un élève répond ${formatNumber(faux.valeur)}. Cette réponse est-elle possible ?`,
        format: "qcm",
        choices: shuffle([
          "Non, elle est impossible",
          "Oui, elle est correcte",
          "On ne peut pas le savoir",
        ]),
        expected: ["Non, elle est impossible"],
        comparator: "mcq_exact",
        explanation: exp(
          "Vérifier la vraisemblance, c'est se demander si le résultat peut exister avant même de calculer.",
          "Quand on enlève, le résultat est forcément plus petit que le nombre de départ.",
          `Ici, ${faux.pourquoi}. La bonne réponse est ${formatNumber(depart)} − ${formatNumber(enleve)} = ${formatNumber(juste)}.`,
          "La réponse proposée est impossible.",
        ),
      };
    },
  },

  // ============================================================
  // ce2_probleme_defi — Le défi de la notion
  // ============================================================

  {
    kind: "template",
    id: "ce2_probleme_defi_tpl_001_partage_avec_reste",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte combien de paquets complets on peut faire, puis ce qui reste.",
    tags: ["ce2", "probleme", "defi", "partage", "reste", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const parBoite = randomInt(6, 12);
      const boites = randomInt(4, 15);
      const reste = randomInt(1, parBoite - 1);
      const total = boites * parBoite + reste;

      return {
        text: `${majuscule(c.lieu)} a ${formatNumber(total)} ${c.objets} à ranger dans des boîtes de ${parBoite}. Combien de boîtes seront complètes ?`,
        format: "qcm",
        choices: makeChoices(
          String(boites),
          piegesPositifs([boites + 1, reste, parBoite, boites - 1, boites + reste]),
        ),
        expected: [String(boites)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un partage ne tombe pas toujours juste : il reste parfois des objets qui ne remplissent pas une boîte.",
          "On cherche combien de fois la boîte tient dans le total, sans dépasser.",
          `${boites} × ${parBoite} = ${formatNumber(boites * parBoite)}, et il reste ${reste} ${c.objets} qui ne remplissent pas une boîte entière.`,
          `${boites} boîtes seront complètes.`,
        ),
      };
    },
  },
];
