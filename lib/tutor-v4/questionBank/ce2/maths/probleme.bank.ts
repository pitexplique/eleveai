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

  // ============================================================
  // COMPLÉMENTS DU 09/08/2026 — dix micro-compétences n'avaient qu'une ou deux
  // questions. À la troisième, l'élève revoyait la première. Chaque ajout est
  // un GÉNÉRATEUR, et prend un angle que la banque n'avait pas : les structures
  // de problème que le BO nomme, avec ses propres exemples quand il en donne.
  // ============================================================

  {
    kind: "template",
    id: "ce2_probleme_choisir_tpl_002_groupes_ou_reunion",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_choisir_operation",
    difficulty: 4,
    theme: "reunion",
    hint: "Les parts sont-elles toutes pareilles, ou différentes ?",
    tags: ["ce2", "probleme", "choisir_operation", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const groupesEgaux = randomChoice([true, false]);
      const cartons = randomInt(4, 9);
      const parCarton = randomInt(12, 40);
      const autre = randomInt(120, 900);
      const bonne = groupesEgaux ? "une multiplication" : "une addition";
      return {
        text: groupesEgaux
          ? `${majuscule(c.lieu)} range ${cartons} cartons contenant chacun ${parCarton} ${c.objets}. Combien de ${c.objets} en tout ?\n\nQuelle opération faut-il choisir ?`
          : `${majuscule(c.lieu)} a ${formatNumber(autre)} ${c.objets} en réserve et ${formatNumber(parCarton)} ${c.objets} en rayon. Combien de ${c.objets} en tout ?\n\nQuelle opération faut-il choisir ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          groupesEgaux ? "une addition" : "une multiplication",
          "une soustraction",
          "une division",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une multiplication réunit des parts TOUTES ÉGALES ; une addition réunit des parts quelconques.",
          "On regarde si les quantités à réunir sont identiques ou non.",
          groupesEgaux
            ? `Les ${cartons} cartons contiennent tous ${parCarton} ${c.objets} : les parts sont égales, on multiplie. Additionner ${cartons} et ${parCarton} n'aurait aucun sens — l'un compte des cartons, l'autre des ${c.objets}.`
            : `Les deux quantités n'ont aucune raison d'être égales : on ne peut que les additionner. Multiplier reviendrait à croire qu'il y a ${formatNumber(autre)} paquets.`,
          `Il faut choisir ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_probleme_choisir_tpl_003_partage",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_choisir_operation",
    difficulty: 4,
    theme: "neutral",
    hint: "On connait le tout et on cherche une part : ce n'est pas une soustraction.",
    tags: ["ce2", "probleme", "choisir_operation", "piege", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const parts = randomInt(3, 9);
      const parPart = randomInt(11, 60);
      const total = parts * parPart;
      return {
        text: `${majuscule(c.lieu)} partage ${formatNumber(total)} ${c.objets} en ${parts} lots égaux. Combien de ${c.objets} dans chaque lot ?\n\nQuelle opération faut-il choisir ?`,
        format: "qcm",
        choices: makeChoices("une division", [
          "une soustraction",
          "une multiplication",
          "une addition",
        ]),
        expected: ["une division"],
        comparator: "mcq_exact",
        explanation: exp(
          "Partager un tout en parts égales, c'est diviser.",
          "On se demande ce qu'on connait — le tout — et ce qu'on cherche — une part.",
          `On connait le tout (${formatNumber(total)}) et le nombre de parts (${parts}) : on cherche la valeur d'une part, donc on divise. Soustraire ${parts} ne retirerait que ${parts} ${c.objets}, ce qui ne partage rien.`,
          "Il faut choisir une division.",
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_une_etape_tpl_003_etat_initial",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_une_etape",
    difficulty: 5,
    theme: "reunion",
    hint: "On cherche le DÉPART : il est forcément plus grand que ce qui reste.",
    tags: ["ce2", "probleme", "une_etape", "piege", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const reste = randomInt(400, 3000);
      const parti = randomInt(150, 1200);
      const depart = reste + parti;
      return {
        text: `${majuscule(c.lieu)} a vendu ${formatNumber(parti)} ${c.objets} ce matin. Il lui en reste ${formatNumber(reste)}. Combien de ${c.objets} y avait-il au départ ?`,
        format: "short",
        expected: [String(depart)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher l'état initial, c'est remonter le temps : on remet ce qui est parti.",
          "On réunit ce qui reste et ce qui a été vendu.",
          `${formatNumber(reste)} + ${formatNumber(parti)} = ${formatNumber(depart)}. Le mot « vendu » fait penser à une soustraction, mais c'est le DÉPART qu'on cherche : il est plus grand que ce qui reste.`,
          `Il y avait ${formatNumber(depart)} ${c.objets} au départ.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_comparaison_tpl_002_ecart",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_comparaison",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche l'écart entre les deux quantités.",
    tags: ["ce2", "probleme", "comparaison", "template"],
    generate: () => {
      const [a, b] = shuffle(PRENOMS).slice(0, 2);
      const c = randomChoice(CONTEXTES);
      const grand = randomInt(600, 4000);
      const petit = randomInt(120, grand - 100);
      const ecart = grand - petit;
      return {
        text: `${a.nom} a ${formatNumber(grand)} ${c.objets} et ${b.nom} en a ${formatNumber(petit)}. Combien ${a.nom} en a-t-${pronom(a.feminin)} de plus ${que(b.nom)} ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Comparer deux quantités, c'est chercher leur écart.",
          "On enlève la plus petite quantité à la plus grande.",
          `${formatNumber(grand)} − ${formatNumber(petit)} = ${formatNumber(ecart)}. Le mot « plus » apparait dans la question, et pourtant on soustrait : c'est la différence qu'on cherche.`,
          `${a.nom} en a ${formatNumber(ecart)} de plus.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_deux_etapes_tpl_002_le_reste",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_deux_etapes",
    difficulty: 5,
    theme: "neutral",
    hint: "Réunis d'abord les deux catégories connues.",
    tags: ["ce2", "probleme", "deux_etapes", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const a = randomInt(120, 900);
      const b = randomInt(80, 700);
      const reste = randomInt(100, 900);
      const total = a + b + reste;
      return {
        text: `${majuscule(c.lieu)} compte ${formatNumber(total)} ${c.objets} : ${formatNumber(a)} sont neufs, ${formatNumber(b)} sont abimés, et les autres sont à trier. Combien de ${c.objets} restent à trier ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand une part est décrite comme « les autres », on la trouve en enlevant au tout toutes les parts connues.",
          "On réunit d'abord les parts connues, puis on les enlève au total.",
          `Première étape : ${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(a + b)}. Deuxième étape : ${formatNumber(total)} − ${formatNumber(a + b)} = ${formatNumber(reste)}.`,
          `Il reste ${formatNumber(reste)} ${c.objets} à trier.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_probleme_deux_etapes_tpl_003_comparaison_puis_total",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_deux_etapes",
    difficulty: 5,
    theme: "neutral",
    hint: "Trouve d'abord ce que possède le second, puis réunis les deux.",
    tags: ["ce2", "probleme", "deux_etapes", "piege", "template"],
    generate: () => {
      // Le problème de comparaison qui demande le TOUT : le BO en fait une
      // structure à part, « nécessitant donc une étape supplémentaire ».
      const [a, b] = shuffle(PRENOMS).slice(0, 2);
      const c = randomChoice(CONTEXTES);
      const premier = randomInt(120, 900);
      const ecart = randomInt(20, 300);
      const second = premier + ecart;
      const total = premier + second;
      return {
        text: `${a.nom} a ${formatNumber(premier)} ${c.objets}. ${b.nom} en a ${formatNumber(ecart)} de plus ${que(a.nom)}. Combien les deux enfants ont-ils ${de(c.objets)} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème de comparaison qui demande le tout se résout en deux étapes.",
          "On calcule d'abord la quantité du second, puis on réunit les deux.",
          `Première étape : ${formatNumber(premier)} + ${formatNumber(ecart)} = ${formatNumber(second)}, ce que possède ${b.nom}. Deuxième étape : ${formatNumber(premier)} + ${formatNumber(second)} = ${formatNumber(total)}. Répondre ${formatNumber(premier + ecart)} serait s'arrêter à la première étape.`,
          `Ils ont ${formatNumber(total)} ${c.objets} en tout.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_trois_etapes_tpl_002_restaurant",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_trois_etapes",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque sorte de table donne son total de places, puis on réunit.",
    tags: ["ce2", "probleme", "trois_etapes", "template"],
    generate: () => {
      // L'exemple du BO, mot pour mot : « Dans un restaurant, il y a 4 tables
      // de 6 personnes et 7 tables de 4 personnes. »
      const grandes = randomInt(3, 9);
      const placesGrandes = randomInt(6, 10);
      const petites = randomInt(4, 12);
      const placesPetites = randomInt(2, 5);
      const total = grandes * placesGrandes + petites * placesPetites;
      return {
        text: `Dans un restaurant, il y a ${grandes} tables de ${placesGrandes} personnes et ${petites} tables de ${placesPetites} personnes. Combien ce restaurant peut-il recevoir de clients ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème mixte enchaine des multiplications et une addition.",
          "On calcule les places de chaque sorte de table, puis on réunit.",
          `${grandes} × ${placesGrandes} = ${grandes * placesGrandes} places aux grandes tables. ${petites} × ${placesPetites} = ${petites * placesPetites} places aux petites. En tout : ${grandes * placesGrandes} + ${petites * placesPetites} = ${total}.`,
          `Le restaurant peut recevoir ${total} clients.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_probleme_trois_etapes_tpl_003_achats",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_trois_etapes",
    difficulty: 5,
    theme: "reunion",
    hint: "Chaque achat d'abord, la dépense ensuite, le rendu en dernier.",
    tags: ["ce2", "probleme", "trois_etapes", "template"],
    generate: () => {
      const nbA = randomInt(3, 8);
      const prixA = randomInt(3, 12);
      const nbB = randomInt(2, 6);
      const prixB = randomInt(4, 15);
      const depense = nbA * prixA + nbB * prixB;
      const billet = Math.ceil((depense + 5) / 10) * 10;
      const rendu = billet - depense;
      return {
        text: `Au marché, on achète ${nbA} barquettes de letchis à ${prixA} € et ${nbB} paquets de samoussas à ${prixB} €. On paie avec ${billet} €. Combien rend-on ?`,
        format: "short",
        expected: [String(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à trois étapes se traite dans l'ordre où les choses se passent.",
          "On calcule chaque achat, on réunit, puis on cherche le rendu.",
          `Les letchis : ${nbA} × ${prixA} = ${nbA * prixA} €. Les samoussas : ${nbB} × ${prixB} = ${nbB * prixB} €. La dépense : ${nbA * prixA} + ${nbB * prixB} = ${depense} €. Le rendu : ${billet} − ${depense} = ${rendu} €.`,
          `On rend ${rendu} €.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_compmult_tpl_002_prix",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_comparaison_multiplicative",
    difficulty: 5,
    theme: "neutral",
    hint: "« Quatre fois plus cher » ne veut pas dire « quatre euros de plus ».",
    tags: ["ce2", "probleme", "comparaison_multiplicative", "piege", "template"],
    generate: () => {
      // L'exemple du BO : « Une trottinette coute quatre fois plus cher qu'un
      // casque. Le casque coute 32 €. »
      const prixPetit = randomInt(12, 60);
      const facteur = randomInt(3, 8);
      const prixGrand = prixPetit * facteur;
      const paire = randomChoice([
        { petit: "un casque", grand: "une trottinette" },
        { petit: "un cahier", grand: "un dictionnaire" },
        { petit: "un ballon", grand: "une paire de baskets" },
      ]);
      return {
        text: `${majuscule(paire.grand)} coute ${facteur} fois plus cher ${que(paire.petit.split(" ")[1] || paire.petit)}. ${majuscule(paire.petit)} coute ${prixPetit} €. Combien coute ${paire.grand} ?`,
        format: "short",
        expected: [String(prixGrand)],
        comparator: "number_equal",
        explanation: exp(
          "« Tant de fois plus » annonce une multiplication, pas une addition.",
          "On multiplie le prix connu par le facteur donné.",
          `${prixPetit} × ${facteur} = ${prixGrand}. Ajouter ${facteur} donnerait ${prixPetit + facteur} € : ce serait « ${facteur} euros de plus », ce qui n'est pas ce que dit l'énoncé.`,
          `${majuscule(paire.grand)} coute ${prixGrand} €.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_cartesien_tpl_002_trois_ensembles",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_produit_cartesien",
    difficulty: 5,
    theme: "neutral",
    hint: "On combine d'abord deux ensembles, puis on ajoute le troisième.",
    tags: ["ce2", "probleme", "produit_cartesien", "template"],
    generate: () => {
      // L'exemple du BO : le clown, ses chapeaux, ses tee-shirts, ses pantalons.
      const chapeaux = randomInt(2, 4);
      const tshirts = randomInt(2, 4);
      const pantalons = randomInt(2, 4);
      const total = chapeaux * tshirts * pantalons;
      return {
        text: `Pour se déguiser, un clown dispose de ${chapeaux} chapeaux, de ${tshirts} tee-shirts et de ${pantalons} pantalons. Combien de costumes différents peut-il faire ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque choix se combine avec tous les autres : on multiplie les possibilités.",
          "On combine deux ensembles, puis on multiplie par le troisième.",
          `Avec ${chapeaux} chapeaux et ${tshirts} tee-shirts, il y a déjà ${chapeaux * tshirts} débuts de costume. Chacun peut aller avec ${pantalons} pantalons : ${chapeaux * tshirts} × ${pantalons} = ${total}.`,
          `Il peut faire ${total} costumes différents.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_probleme_cartesien_tpl_003_ensemble_manquant",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_produit_cartesien",
    difficulty: 5,
    theme: "neutral",
    hint: "On connait le nombre de tenues et l'un des deux ensembles.",
    tags: ["ce2", "probleme", "produit_cartesien", "piege", "template"],
    generate: () => {
      const hauts = randomInt(3, 9);
      const bas = randomInt(3, 9);
      const tenues = hauts * bas;
      return {
        text: `Avec ses tee-shirts et ses ${bas} shorts, Naïla peut composer ${tenues} tenues différentes. Combien a-t-elle de tee-shirts ?`,
        format: "short",
        expected: [String(hauts)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre de tenues est le produit des deux ensembles : connaissant l'un, on retrouve l'autre.",
          "On cherche par combien multiplier le nombre connu pour obtenir le total.",
          `Chaque tee-shirt donne ${bas} tenues, une par short. Il faut donc ${hauts} tee-shirts, car ${hauts} × ${bas} = ${tenues}.`,
          `Elle a ${hauts} tee-shirts.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_schema_tpl_002_comparaison",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_schema_barre",
    difficulty: 5,
    theme: "neutral",
    hint: "La barre du haut est plus longue de l'écart : calcule-la avant le total.",
    tags: ["ce2", "probleme", "schema_barre", "template", "canvas"],
    generate: () => {
      // Le schéma du BO : « Léo a 188 billes. Lucie en a 75 de plus que Léo. »
      const [a, b] = shuffle(PRENOMS).slice(0, 2);
      const base = randomInt(80, 900);
      const ecart = randomInt(20, 200);
      const autre = base + ecart;
      const total = base + autre;
      return {
        text: `${a.nom} a ${formatNumber(base)} billes. ${b.nom} en a ${formatNumber(ecart)} de plus ${que(a.nom)}. Combien les deux enfants ont-ils de billes en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le schéma en barres montre l'écart comme un morceau ajouté à la barre la plus courte.",
          "On calcule la barre longue, puis on réunit les deux barres.",
          `${formatNumber(base)} + ${formatNumber(ecart)} = ${formatNumber(autre)} pour ${b.nom}. Puis ${formatNumber(base)} + ${formatNumber(autre)} = ${formatNumber(total)}.`,
          `Ils ont ${formatNumber(total)} billes en tout.`,
        ),
        canvas: schemaBarre({
          total: "?",
          parts: [
            { label: a.nom, value: formatNumber(base) },
            { label: b.nom, value: `${formatNumber(base)} + ${formatNumber(ecart)}` },
          ],
          display: { showTotal: true, showPartLabels: true, showValues: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_probleme_schema_tpl_003_parts_egales",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_schema_barre",
    difficulty: 4,
    theme: "neutral",
    hint: "La barre est coupée en parts toutes égales.",
    tags: ["ce2", "probleme", "schema_barre", "template", "canvas"],
    generate: () => {
      // Le second schéma du BO : six dictionnaires payés 72 €.
      const parts = randomInt(3, 8);
      const prixUnite = randomInt(6, 25);
      const total = parts * prixUnite;
      const objet = randomChoice(["dictionnaires", "ballons", "cahiers", "casques"]);
      return {
        text: `La maitresse a acheté ${parts} ${objet} pour la classe. Elle a payé ${total} €. Quel est le prix d'un seul ?`,
        format: "short",
        expected: [String(prixUnite)],
        comparator: "number_equal",
        explanation: exp(
          "Quand un tout se partage en parts égales, le schéma en barres montre des morceaux tous de la même taille.",
          "On cherche la valeur d'une part : on divise le tout par le nombre de parts.",
          `${total} ÷ ${parts} = ${prixUnite}, car ${parts} × ${prixUnite} = ${total}.`,
          `Un seul coute ${prixUnite} €.`,
        ),
        canvas: schemaBarre({
          total: `${total} €`,
          parts: Array.from({ length: parts }, () => ({ label: "?", unknown: true })),
          questionLabel: `${parts} ${objet}`,
          display: { showTotal: true, showPartLabels: true, showValues: false },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_verifier_tpl_002_part_plus_grande",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Une part ne peut jamais dépasser le tout dont elle fait partie.",
    tags: ["ce2", "probleme", "verifier", "piege", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const total = randomInt(500, 4000);
      const possible = randomChoice([true, false]);
      const trouve = possible ? randomInt(50, total - 50) : total + randomInt(50, 900);
      return {
        text: `${majuscule(c.lieu)} a ${formatNumber(total)} ${c.objets} en tout, dont une partie est déjà vendue. Un élève trouve ${formatNumber(trouve)} ${c.objets} vendus. Cette réponse est-elle possible ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [possible ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Avant d'écrire sa réponse, on vérifie qu'elle est possible : c'est la régulation.",
          "On compare le résultat trouvé au total donné par l'énoncé.",
          possible
            ? `${formatNumber(trouve)} est plus petit que ${formatNumber(total)} : c'est possible, il resterait ${formatNumber(total - trouve)} ${c.objets}.`
            : `${formatNumber(trouve)} est plus grand que ${formatNumber(total)}, le total. Une part ne peut pas dépasser le tout : le calcul est à refaire.`,
          possible ? "Oui, c'est possible." : "Non, ce n'est pas possible.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_probleme_verifier_tpl_003_somme_trop_petite",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_verifier",
    difficulty: 5,
    theme: "neutral",
    hint: "Une somme est toujours plus grande que chacun des deux nombres réunis.",
    tags: ["ce2", "probleme", "verifier", "piege", "template"],
    generate: () => {
      const a = randomInt(400, 2000);
      const b = randomInt(300, 1800);
      const possible = randomChoice([true, false]);
      const trouve = possible ? a + b : randomInt(Math.min(a, b) - 200, Math.min(a, b) - 20);
      return {
        text: `On réunit ${formatNumber(a)} et ${formatNumber(b)}. Un élève annonce ${formatNumber(trouve)}. Cette réponse est-elle possible ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [possible ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une somme de deux nombres positifs est plus grande que chacun d'eux.",
          "On compare le résultat annoncé aux deux nombres de départ, sans refaire le calcul.",
          possible
            ? `${formatNumber(trouve)} est plus grand que ${formatNumber(a)} et que ${formatNumber(b)} : la réponse tient debout, et le calcul le confirme.`
            : `${formatNumber(trouve)} est plus PETIT que ${formatNumber(Math.min(a, b))}, l'un des deux nombres réunis. C'est impossible : en ajoutant, on ne peut pas obtenir moins qu'au départ.`,
          possible ? "Oui, c'est possible." : "Non, ce n'est pas possible.",
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_probleme_defi_tpl_002_reste_du_partage",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche ce qui ne rentre dans aucune boite complète.",
    tags: ["ce2", "probleme", "defi", "template"],
    generate: () => {
      const parBoite = randomInt(6, 15);
      const boites = randomInt(5, 20);
      const reste = randomInt(1, parBoite - 1);
      const total = boites * parBoite + reste;
      const c = randomChoice(CONTEXTES);
      return {
        text: `${majuscule(c.lieu)} range ${formatNumber(total)} ${c.objets} dans des boites de ${parBoite}. Combien de ${c.objets} resteront en dehors des boites complètes ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Un partage ne tombe pas toujours juste : ce qui ne remplit pas une part entière s'appelle le reste.",
          "On remplit autant de boites complètes que possible, puis on regarde ce qui n'a pas trouvé de place.",
          `${boites} boites complètes contiennent ${boites} × ${parBoite} = ${formatNumber(boites * parBoite)} ${c.objets}. Il en restait ${formatNumber(total)} : ${formatNumber(total)} − ${formatNumber(boites * parBoite)} = ${reste}. Le reste est toujours plus petit que ${parBoite}, sinon on remplirait une boite de plus.`,
          `Il restera ${reste} ${c.objets}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_probleme_defi_tpl_003_reste_selon_histoire",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les derniers voyageurs ont-ils le droit de rester à quai ?",
    tags: ["ce2", "probleme", "defi", "piege", "template"],
    generate: () => {
      // Le même reste, deux réponses différentes : c'est l'histoire qui décide
      // s'il faut arrondir au-dessus ou en dessous.
      const parVehicule = randomInt(4, 9);
      const complets = randomInt(3, 12);
      const reste = randomInt(1, parVehicule - 1);
      const total = complets * parVehicule + reste;
      const transporter = randomChoice([true, false]);
      const bonne = transporter ? complets + 1 : complets;
      return {
        text: transporter
          ? `${total} élèves partent en sortie. Chaque voiture transporte ${parVehicule} élèves. Combien faut-il de voitures pour que TOUS partent ?`
          : `${total} élèves veulent jouer. Chaque équipe compte ${parVehicule} élèves. Combien d'équipes COMPLÈTES peut-on former ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Un partage avec reste ne se termine pas par un calcul mais par une décision : que fait-on du reste ?",
          "On calcule le nombre de parts complètes, puis on relit la question.",
          transporter
            ? `${complets} voitures pleines transportent ${complets * parVehicule} élèves. Il en reste ${reste}, qui ne peuvent pas rester sur place : il faut une voiture de plus, donc ${bonne}.`
            : `${complets} équipes complètes réunissent ${complets * parVehicule} élèves. Il en reste ${reste}, trop peu pour former une équipe entière : on en compte ${bonne}.`,
          transporter ? `Il faut ${bonne} voitures.` : `On peut former ${bonne} équipes complètes.`,
        ),
      };
    },
  },
];
