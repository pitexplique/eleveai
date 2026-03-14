import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const proportionnaliteBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "prop_table_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 2 cahiers coûtent 4 €, combien coûtent 4 cahiers ?",
    format: "short",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "Si on double, le prix double.",
    tags: ["proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 stylos coûtent 6 €, combien coûtent 9 stylos ?",
    format: "short",
    expected: ["18", "18€", "18 €"],
    comparator: "number_equal",
    hint: "De 3 à 9, on multiplie par 3.",
    tags: ["proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, 3 samoussas coûtent 6 €. Combien coûtent 6 samoussas ?",
    format: "short",
    expected: ["12", "12€", "12 €"],
    comparator: "number_equal",
    hint: "Si on multiplie la quantité par 2, le prix aussi.",
    tags: ["proportionnalite", "tableau", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché forain, 2 ananas coûtent 8 €. Combien coûtent 6 ananas ?",
    format: "short",
    expected: ["24", "24€", "24 €"],
    comparator: "number_equal",
    hint: "De 2 à 6, on multiplie par 3.",
    tags: ["proportionnalite", "tableau", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_unit_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "neutral",
    text: "3 bonbons coûtent 6 €. Combien coûte 1 bonbon ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe à l’unité.",
    tags: ["proportionnalite", "unite"],
  },
  {
    kind: "fixed",
    id: "prop_unit_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "neutral",
    text: "5 cahiers coûtent 15 €. Combien coûte 1 cahier ?",
    format: "short",
    expected: ["3", "3€", "3 €"],
    comparator: "number_equal",
    hint: "Divise le prix total par 5.",
    tags: ["proportionnalite", "unite"],
  },
  {
    kind: "fixed",
    id: "prop_unit_fixed_cuisine_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour une recette, 4 yaourts coûtent 8 €. Combien coûte 1 yaourt ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Divise le prix total par le nombre de yaourts.",
    tags: ["proportionnalite", "unite", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_unit_fixed_cuisine_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour cuisiner, 6 œufs coûtent 12 €. Combien coûte 1 œuf ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe par l’unité.",
    tags: ["proportionnalite", "unite", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    text: "4 cahiers coûtent 8 €. Combien coûtent 2 cahiers ?",
    format: "short",
    expected: ["4", "4€", "4 €"],
    comparator: "number_equal",
    hint: "Si on divise par 2, le prix aussi.",
    tags: ["proportionnalite", "direct"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    text: "8 feutres coûtent 16 €. Combien coûtent 4 feutres ?",
    format: "short",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "4 est la moitié de 8.",
    tags: ["proportionnalite", "direct"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_sport_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    text: "Pendant un tournoi de foot, 6 bouteilles d’eau coûtent 12 €. Combien coûtent 3 bouteilles ?",
    format: "short",
    expected: ["6", "6€", "6 €"],
    comparator: "number_equal",
    hint: "Si on prend deux fois moins, on paie deux fois moins.",
    tags: ["proportionnalite", "direct", "sport"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_sport_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    text: "Pour un match, 10 maillots coûtent 50 €. Combien coûtent 5 maillots ?",
    format: "short",
    expected: ["25", "25€", "25 €"],
    comparator: "number_equal",
    hint: "Passe à la moitié.",
    tags: ["proportionnalite", "direct", "sport"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_jeuxvideo_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "jeux_video",
    text: "Dans un jeu vidéo, 2 potions coûtent 10 pièces. Combien coûtent 6 potions ?",
    format: "qcm",
    choices: ["20", "25", "30", "60"],
    expected: ["30"],
    comparator: "mcq_exact",
    hint: "De 2 à 6, on multiplie par 3.",
    tags: ["proportionnalite", "tableau", "jeux_video", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_jeuxvideo_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "jeux_video",
    text: "Dans un jeu vidéo, 4 coffres coûtent 12 pièces. Combien coûtent 8 coffres ?",
    format: "qcm",
    choices: ["16", "20", "24", "48"],
    expected: ["24"],
    comparator: "mcq_exact",
    hint: "De 4 à 8, on double.",
    tags: ["proportionnalite", "tableau", "jeux_video", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_unit_qcm_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 5 mangues coûtent 15 €. Combien coûte 1 mangue ?",
    format: "qcm",
    choices: ["2 €", "3 €", "4 €", "5 €"],
    expected: ["3 €", "3€", "3"],
    comparator: "mcq_exact",
    hint: "Passe par l’unité.",
    tags: ["proportionnalite", "unite", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_unit_qcm_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "reunion",
    text: "Au snack, 4 bouchons coûtent 8 €. Combien coûte 1 bouchon ?",
    format: "qcm",
    choices: ["1 €", "2 €", "3 €", "4 €"],
    expected: ["2 €", "2€", "2"],
    comparator: "mcq_exact",
    hint: "Divise 8 par 4.",
    tags: ["proportionnalite", "unite", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_direct_qcm_cuisine_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour cuisiner, 8 œufs coûtent 16 €. Combien coûtent 4 œufs ?",
    format: "qcm",
    choices: ["4 €", "6 €", "8 €", "12 €"],
    expected: ["8 €", "8€", "8"],
    comparator: "mcq_exact",
    hint: "4 est la moitié de 8.",
    tags: ["proportionnalite", "direct", "cuisine", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_direct_qcm_cuisine_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour une recette, 6 citrons coûtent 12 €. Combien coûtent 3 citrons ?",
    format: "qcm",
    choices: ["3 €", "4 €", "6 €", "9 €"],
    expected: ["6 €", "6€", "6"],
    comparator: "mcq_exact",
    hint: "3 est la moitié de 6.",
    tags: ["proportionnalite", "direct", "cuisine", "qcm"],
  },

  {
    kind: "template",
    id: "prop_table_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicateur.",
    tags: ["proportionnalite", "tableau", "template"],
    generate: () => {
      const a = [2, 3, 4][Math.floor(Math.random() * 3)];
      const coef = [2, 3, 4][Math.floor(Math.random() * 3)];
      const unitPrice = [2, 3, 4][Math.floor(Math.random() * 3)];
      const total = a * unitPrice;
      const targetQty = a * coef;
      const targetTotal = total * coef;

      return {
        text: `Si ${a} objets coûtent ${total} €, combien coûtent ${targetQty} objets ?`,
        format: "short",
        expected: [String(targetTotal), `${targetTotal}€`, `${targetTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère par combien on multiplie la quantité.",
    tags: ["proportionnalite", "tableau", "template"],
    generate: () => {
      const qty = [2, 3, 5][Math.floor(Math.random() * 3)];
      const coef = [2, 3][Math.floor(Math.random() * 2)];
      const unit = [2, 4, 5][Math.floor(Math.random() * 3)];
      const total = qty * unit;
      const newQty = qty * coef;
      const newTotal = total * coef;

      return {
        text: `${qty} billets coûtent ${total} €. Combien coûtent ${newQty} billets ?`,
        format: "short",
        expected: [String(newTotal), `${newTotal}€`, `${newTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    hint: "Si la quantité est multipliée, le prix aussi.",
    tags: ["proportionnalite", "tableau", "reunion", "template"],
    generate: () => {
      const qty = [2, 3, 4][Math.floor(Math.random() * 3)];
      const coef = [2, 3][Math.floor(Math.random() * 2)];
      const unit = [2, 3, 4][Math.floor(Math.random() * 3)];
      const total = qty * unit;
      const newQty = qty * coef;
      const newTotal = total * coef;

      return {
        text: `À La Réunion, ${qty} bouchons coûtent ${total} €. Combien coûtent ${newQty} bouchons ?`,
        format: "short",
        expected: [String(newTotal), `${newTotal}€`, `${newTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche le coefficient entre les deux quantités.",
    tags: ["proportionnalite", "tableau", "reunion", "template"],
    generate: () => {
      const qty = [2, 4, 5][Math.floor(Math.random() * 3)];
      const coef = [2, 3][Math.floor(Math.random() * 2)];
      const unit = [3, 4, 5][Math.floor(Math.random() * 3)];
      const total = qty * unit;
      const newQty = qty * coef;
      const newTotal = total * coef;

      return {
        text: `Au marché de Saint-Paul, ${qty} mangues coûtent ${total} €. Combien coûtent ${newQty} mangues ?`,
        format: "short",
        expected: [String(newTotal), `${newTotal}€`, `${newTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_sport_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "sport",
    hint: "Repère le coefficient entre les deux quantités.",
    tags: ["proportionnalite", "tableau", "sport", "template"],
    generate: () => {
      const qty = [2, 4, 5][Math.floor(Math.random() * 3)];
      const coef = [2, 3][Math.floor(Math.random() * 2)];
      const unit = [1, 2, 3][Math.floor(Math.random() * 3)];
      const total = qty * unit;
      const newQty = qty * coef;
      const newTotal = total * coef;

      return {
        text: `Pour un entraînement de sport, ${qty} gourdes coûtent ${total} €. Combien coûtent ${newQty} gourdes ?`,
        format: "short",
        expected: [String(newTotal), `${newTotal}€`, `${newTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_sport_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "sport",
    hint: "Même coefficient pour la quantité et le prix.",
    tags: ["proportionnalite", "tableau", "sport", "template"],
    generate: () => {
      const qty = [3, 4, 6][Math.floor(Math.random() * 3)];
      const coef = [2, 3][Math.floor(Math.random() * 2)];
      const unit = [2, 3, 4][Math.floor(Math.random() * 3)];
      const total = qty * unit;
      const newQty = qty * coef;
      const newTotal = total * coef;

      return {
        text: `Pour une équipe de basket, ${qty} maillots coûtent ${total} €. Combien coûtent ${newQty} maillots ?`,
        format: "short",
        expected: [String(newTotal), `${newTotal}€`, `${newTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie aussi le prix par le même coefficient.",
    tags: ["proportionnalite", "tableau", "qcm", "template"],
    generate: () => {
      const qty = [2, 3, 4][Math.floor(Math.random() * 3)];
      const coef = [2, 3][Math.floor(Math.random() * 2)];
      const unit = [2, 3, 4][Math.floor(Math.random() * 3)];
      const total = qty * unit;
      const targetQty = qty * coef;
      const good = total * coef;

      const choices = shuffle([
        String(good),
        String(good + unit),
        String(good + coef),
        String(total),
      ]);

      return {
        text: `Si ${qty} objets coûtent ${total} €, combien coûtent ${targetQty} objets ?`,
        format: "qcm",
        choices,
        expected: [String(good)],
        comparator: "mcq_exact",
      };
    },
  },
  {
    kind: "template",
    id: "prop_unit_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par le nombre d’objets.",
    tags: ["proportionnalite", "unite", "template"],
    generate: () => {
      const qty = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const unit = [2, 3, 4][Math.floor(Math.random() * 3)];
      const total = qty * unit;

      return {
        text: `${qty} objets coûtent ${total} €. Combien coûte 1 objet ?`,
        format: "short",
        expected: [String(unit), `${unit}€`, `${unit} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_unit_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe à l’unité.",
    tags: ["proportionnalite", "unite", "template"],
    generate: () => {
      const qty = [2, 4, 5, 6][Math.floor(Math.random() * 4)];
      const unit = [1, 2, 3, 4][Math.floor(Math.random() * 4)];
      const total = qty * unit;

      return {
        text: `${qty} stylos coûtent ${total} €. Combien coûte 1 stylo ?`,
        format: "short",
        expected: [String(unit), `${unit}€`, `${unit} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_unit_tpl_cuisine_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "cuisine",
    hint: "Passe par l’unité : partage le prix total.",
    tags: ["proportionnalite", "unite", "cuisine", "template"],
    generate: () => {
      const qty = [2, 4, 5, 6][Math.floor(Math.random() * 4)];
      const unit = [1, 2, 3][Math.floor(Math.random() * 3)];
      const total = qty * unit;

      return {
        text: `En cuisine, ${qty} yaourts coûtent ${total} €. Combien coûte 1 yaourt ?`,
        format: "short",
        expected: [String(unit), `${unit}€`, `${unit} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_unit_tpl_cuisine_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "cuisine",
    hint: "Divise le prix total par le nombre de citrons.",
    tags: ["proportionnalite", "unite", "cuisine", "template"],
    generate: () => {
      const qty = [3, 4, 6][Math.floor(Math.random() * 3)];
      const unit = [2, 3, 4][Math.floor(Math.random() * 3)];
      const total = qty * unit;

      return {
        text: `Pour une recette, ${qty} citrons coûtent ${total} €. Combien coûte 1 citron ?`,
        format: "short",
        expected: [String(unit), `${unit}€`, `${unit} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_unit_tpl_jeuxvideo_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "jeux_video",
    hint: "Divise par le nombre de potions.",
    tags: ["proportionnalite", "unite", "jeux_video", "template"],
    generate: () => {
      const qty = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const unit = [3, 4, 5][Math.floor(Math.random() * 3)];
      const total = qty * unit;

      return {
        text: `Dans un jeu vidéo, ${qty} potions coûtent ${total} pièces. Combien coûte 1 potion ?`,
        format: "short",
        expected: [String(unit)],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_unit_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_unit",
    difficulty: 2,
    theme: "neutral",
    hint: "Il faut partager le prix total par la quantité.",
    tags: ["proportionnalite", "unite", "qcm", "template"],
    generate: () => {
      const qty = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const unit = [2, 3, 4][Math.floor(Math.random() * 3)];
      const total = qty * unit;

      const choices = shuffle([
        String(unit),
        String(unit + 1),
        String(total),
        String(qty),
      ]);

      return {
        text: `${qty} objets coûtent ${total} €. Combien coûte 1 objet ?`,
        format: "qcm",
        choices,
        expected: [String(unit)],
        comparator: "mcq_exact",
      };
    },
  },
  {
    kind: "template",
    id: "prop_direct_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    hint: "Si la quantité diminue, le prix diminue dans la même proportion.",
    tags: ["proportionnalite", "direct", "template"],
    generate: () => {
      const qty = [4, 6, 8][Math.floor(Math.random() * 3)];
      const unit = [2, 3, 4][Math.floor(Math.random() * 3)];
      const total = qty * unit;
      const divisor = [2, 4][Math.floor(Math.random() * 2)];
      const targetQty = qty / divisor;
      const targetTotal = total / divisor;

      return {
        text: `Si ${qty} objets coûtent ${total} €, combien coûtent ${targetQty} objets ?`,
        format: "short",
        expected: [String(targetTotal), `${targetTotal}€`, `${targetTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_direct_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe à la moitié.",
    tags: ["proportionnalite", "direct", "template"],
    generate: () => {
      const qty = [6, 8, 10][Math.floor(Math.random() * 3)];
      const unit = [2, 3, 5][Math.floor(Math.random() * 3)];
      const total = qty * unit;
      const targetQty = qty / 2;
      const targetTotal = total / 2;

      return {
        text: `${qty} billets coûtent ${total} €. Combien coûtent ${targetQty} billets ?`,
        format: "short",
        expected: [String(targetTotal), `${targetTotal}€`, `${targetTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_direct_tpl_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "reunion",
    hint: "Passe d’abord à la moitié si besoin.",
    tags: ["proportionnalite", "direct", "reunion", "template"],
    generate: () => {
      const qty = [4, 6, 8][Math.floor(Math.random() * 3)];
      const unit = [2, 3][Math.floor(Math.random() * 2)];
      const total = qty * unit;
      const targetQty = qty / 2;
      const targetTotal = total / 2;

      return {
        text: `Sur un stand à La Réunion, ${qty} samoussas coûtent ${total} €. Combien coûtent ${targetQty} samoussas ?`,
        format: "short",
        expected: [String(targetTotal), `${targetTotal}€`, `${targetTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_direct_tpl_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "reunion",
    hint: "Quand la quantité est divisée par 2, le prix aussi.",
    tags: ["proportionnalite", "direct", "reunion", "template"],
    generate: () => {
      const qty = [6, 8, 10][Math.floor(Math.random() * 3)];
      const unit = [1, 2, 3][Math.floor(Math.random() * 3)];
      const total = qty * unit;
      const targetQty = qty / 2;
      const targetTotal = total / 2;

      return {
        text: `Au marché de Saint-Pierre, ${qty} mangues coûtent ${total} €. Combien coûtent ${targetQty} mangues ?`,
        format: "short",
        expected: [String(targetTotal), `${targetTotal}€`, `${targetTotal} €`],
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "prop_direct_qcm_sport_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    hint: "Si on divise la quantité par 2, on divise aussi le prix par 2.",
    tags: ["proportionnalite", "direct", "sport", "qcm", "template"],
    generate: () => {
      const qty = [4, 6, 8][Math.floor(Math.random() * 3)];
      const unit = [2, 3][Math.floor(Math.random() * 2)];
      const total = qty * unit;
      const targetQty = qty / 2;
      const good = total / 2;

      const choices = shuffle([
        String(good),
        String(good + 1),
        String(good + 2),
        String(total),
      ]);

      return {
        text: `Pour une équipe de sport, ${qty} maillots coûtent ${total} €. Combien coûtent ${targetQty} maillots ?`,
        format: "qcm",
        choices,
        expected: [String(good)],
        comparator: "mcq_exact",
      };
    },
  },
  {
    kind: "template",
    id: "prop_direct_qcm_sport_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    hint: "Passe à la moitié.",
    tags: ["proportionnalite", "direct", "sport", "qcm", "template"],
    generate: () => {
      const qty = [6, 8, 10][Math.floor(Math.random() * 3)];
      const unit = [2, 4][Math.floor(Math.random() * 2)];
      const total = qty * unit;
      const targetQty = qty / 2;
      const good = total / 2;

      const choices = shuffle([
        `${good}`,
        `${good + 2}`,
        `${total}`,
        `${targetQty}`,
      ]);

      return {
        text: `Pour un tournoi, ${qty} gourdes coûtent ${total} €. Combien coûtent ${targetQty} gourdes ?`,
        format: "qcm",
        choices,
        expected: [String(good)],
        comparator: "mcq_exact",
      };
    },
  },
];