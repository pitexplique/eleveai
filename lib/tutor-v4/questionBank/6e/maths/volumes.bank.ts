import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const volumesBank: TutorBankItemV4[] = [
  // =========================
  // VOLUME_UNITE
  // =========================
  {
    kind: "fixed",
    id: "volume_unite_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est adaptée pour mesurer le volume d’un aquarium ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm³"],
    comparator: "mcq_exact",
    hint: "Un volume se mesure en unités “cubes”.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Le volume mesure l’espace occupé par un objet en trois dimensions. On utilise donc des unités cubes, ici cm³.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Quel symbole correspond à une unité de volume ?",
    format: "qcm",
    choices: ["m", "m²", "m³", "m/s"],
    expected: ["m³"],
    comparator: "mcq_exact",
    hint: "Le petit 3 indique un volume.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Une longueur s’écrit en m, une aire en m², et un volume en m³. L’exposant 3 correspond à trois dimensions.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Un volume se mesure plutôt en…",
    format: "qcm",
    choices: ["unités simples", "unités carrées", "unités cubes", "degrés"],
    expected: ["unités cubes"],
    comparator: "mcq_exact",
    hint: "On peut imaginer qu’on remplit avec des petits cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Pour mesurer un volume, on compte combien de petits cubes unités remplissent l’espace. On parle donc d’unités cubes.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Laquelle de ces écritures désigne un volume ?",
    format: "qcm",
    choices: ["12 cm", "12 cm²", "12 cm³", "12 g"],
    expected: ["12 cm³"],
    comparator: "mcq_exact",
    hint: "Regarde l’exposant.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("12 cm correspond à une longueur, 12 cm² à une aire, 12 g à une masse. Seule l’écriture 12 cm³ désigne un volume.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Pour mesurer le volume d’un grand bac à poissons à La Réunion, quelle unité peut-on utiliser ?",
    format: "qcm",
    choices: ["m", "m²", "m³", "cm"],
    expected: ["m³"],
    comparator: "mcq_exact",
    hint: "Un grand bac occupe un espace en trois dimensions.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Un grand bac prend de la place en longueur, largeur et hauteur. On mesure donc son volume en mètres cubes, notés m³.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "unite", "reunion", "qcm"],
  },

  // =========================
  // VOLUME_COMPTER
  // =========================
  {
    kind: "fixed",
    id: "volume_compter_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide est formé de 6 petits cubes identiques. Quel est son volume en cubes unités ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On compte simplement les cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Le volume en cubes unités correspond ici au nombre total de petits cubes. Comme il y en a 6, le volume est 6 cubes unités.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "compter"],
  },
  {
    kind: "fixed",
    id: "volume_compter_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Un empilement contient 10 cubes unités. Quel est son volume ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Le volume correspond ici au nombre de cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Chaque cube unité compte pour 1 unité de volume. Avec 10 cubes unités, le volume est donc 10.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "compter"],
  },
  {
    kind: "fixed",
    id: "volume_compter_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Un pavé est formé de 2 rangées de 4 cubes. Quel est son volume en cubes unités ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "2 × 4 cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Il y a 2 rangées de 4 cubes. Donc le nombre total de cubes est 2 × 4 = 8. Le volume est 8 cubes unités.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "compter"],
  },
  {
    kind: "fixed",
    id: "volume_compter_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide contient 12 cubes unités. Son volume vaut…",
    format: "qcm",
    choices: ["12", "6", "24", "3"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "On compte les cubes unités.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Le volume d’un solide construit avec des cubes unités est égal au nombre de cubes. Ici, 12 cubes donnent un volume de 12.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "compter", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_compter_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Un pavé est formé de 3 couches de 5 cubes chacune. Quel est son volume ?",
    format: "qcm",
    choices: ["8", "10", "15", "20"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "3 × 5 cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Chaque couche contient 5 cubes et il y a 3 couches. On calcule donc 3 × 5 = 15. Le volume est 15 cubes unités.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "compter", "qcm"],
  },

  // =========================
  // VOLUME_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "volume_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel volume est le plus grand : 8 cm³ ou 12 cm³ ?",
    format: "short",
    expected: ["12", "12 cm3", "12 cm³"],
    comparator: "contains_keyword",
    hint: "Compare les nombres 8 et 12.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Les deux volumes sont exprimés dans la même unité. Il suffit donc de comparer 8 et 12. Comme 12 est plus grand, 12 cm³ est le plus grand volume.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "comparer"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel volume est le plus petit : 15 cm³ ou 9 cm³ ?",
    format: "short",
    expected: ["9", "9 cm3", "9 cm³"],
    comparator: "contains_keyword",
    hint: "Compare les nombres 15 et 9.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Comme les unités sont les mêmes, on compare seulement les nombres. 9 est plus petit que 15, donc 9 cm³ est le plus petit volume.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "comparer"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel volume est le plus grand ?",
    format: "qcm",
    choices: ["7 cm³", "11 cm³", "9 cm³", "10 cm³"],
    expected: ["11 cm³"],
    comparator: "mcq_exact",
    hint: "Choisis le plus grand nombre.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Tous les volumes sont en cm³. Le plus grand nombre proposé est 11, donc le plus grand volume est 11 cm³.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un solide A contient 14 cubes. Un solide B contient 12 cubes. Lequel a le plus grand volume ?",
    format: "qcm",
    choices: ["A", "B", "Ils sont égaux", "On ne peut pas savoir"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Le plus de cubes donne le plus grand volume.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Le volume dépend ici du nombre de cubes unités. Le solide A contient 14 cubes contre 12 pour B, donc A a le plus grand volume.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Quel bac contient le plus : 18 cm³ ou 25 cm³ ?",
    format: "short",
    expected: ["25", "25 cm3", "25 cm³"],
    comparator: "contains_keyword",
    hint: "Le plus grand nombre donne le plus grand volume.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Comme les deux volumes sont donnés en cm³, on compare 18 et 25. Le plus grand est 25, donc le bac de 25 cm³ contient le plus.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "comparer", "reunion"],
  },

  // =========================
  // VOLUME_ASSEMBLAGE
  // =========================
  {
    kind: "fixed",
    id: "volume_assemblage_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "On assemble deux solides de 4 cubes et 3 cubes. Quel est le volume total ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "On additionne les cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Quand on assemble deux solides sans enlever de cubes, on additionne leurs volumes. Ici 4 + 3 = 7.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "assemblage"],
  },
  {
    kind: "fixed",
    id: "volume_assemblage_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "Un solide de 6 cubes est collé à un solide de 5 cubes. Quel est le volume total ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "6 + 5.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Le volume total est la somme des cubes des deux solides : 6 + 5 = 11.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "assemblage"],
  },
  {
    kind: "fixed",
    id: "volume_assemblage_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "On assemble 8 cubes et 4 cubes. Le volume total est…",
    format: "qcm",
    choices: ["4", "8", "12", "16"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Additionne 8 et 4.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Assembler 8 cubes et 4 cubes donne un total de 12 cubes. Le volume total est donc 12.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "assemblage", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_assemblage_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 4,
    theme: "neutral",
    text: "Un solide A de 10 cubes est coupé en deux morceaux de 4 cubes et 6 cubes. Si on réassemble les deux morceaux, quel volume retrouve-t-on ?",
    format: "qcm",
    choices: ["4", "6", "10", "14"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Le volume total reste le même.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Couper puis réassembler ne change pas le nombre total de cubes. Comme 4 + 6 = 10, on retrouve un volume de 10.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "assemblage", "qcm"],
  },

  // =========================
  // VOLUME_LIRE
  // =========================
  {
    kind: "fixed",
    id: "volume_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’écriture 18 cm³, quel est le volume ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Lis le nombre avant l’unité.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Dans 18 cm³, le nombre 18 indique la quantité de volume. Le volume vaut donc 18 cm³.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "lire"],
  },
  {
    kind: "fixed",
    id: "volume_lire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Le solide a un volume de 24 cm³. Combien cela représente-t-il de cubes unités de 1 cm³ ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "24 cm³ = 24 cubes de 1 cm³.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Un cube unité de 1 cm³ compte pour 1. Donc un volume de 24 cm³ correspond à 24 cubes unités.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "lire"],
  },
  {
    kind: "fixed",
    id: "volume_lire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans “9 m³”, le volume vaut…",
    format: "qcm",
    choices: ["3", "9", "27", "90"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "On lit directement le nombre.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Dans l’écriture 9 m³, le nombre qui donne la valeur du volume est 9.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "lire", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_lire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Quel solide a le plus grand volume ?",
    format: "qcm",
    choices: ["6 cm³", "14 cm³", "9 cm³", "12 cm³"],
    expected: ["14 cm³"],
    comparator: "mcq_exact",
    hint: "Lis le nombre avant l’unité.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Tous les volumes sont donnés dans la même unité. Le plus grand nombre est 14, donc le plus grand volume est 14 cm³.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "lire", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_lire_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 3,
    theme: "reunion",
    text: "Un bac de culture a un volume de 30 cm³. Combien de cubes unités cela représente-t-il ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Le nombre donne directement le volume en cubes unités de 1 cm³.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Si chaque cube unité vaut 1 cm³, alors 30 cm³ correspond à 30 cubes unités.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "lire", "reunion"],
  },

  // =========================
  // VOLUME_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "volume_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi une aire ne peut-elle pas s’exprimer en cm³ ?",
    format: "short",
    expected: ["aire", "cm²", "volume", "cm³"],
    comparator: "contains_keyword",
    hint: "Une aire est en 2 dimensions, un volume en 3 dimensions.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Une aire mesure une surface, donc une grandeur en 2 dimensions : elle s’exprime en cm². Un volume mesure un espace en 3 dimensions : il s’exprime en cm³.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "volume_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi un solide de 12 cubes a un volume plus grand qu’un solide de 9 cubes.",
    format: "short",
    expected: ["12", "9", "plus grand", "cubes"],
    comparator: "contains_keyword",
    hint: "Plus il y a de cubes, plus le volume est grand.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Le volume correspond ici au nombre de cubes unités. Comme 12 cubes est plus grand que 9 cubes, le solide de 12 cubes a le plus grand volume.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "volume_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple de volume compris entre 10 cm³ et 15 cm³.",
    format: "short",
    expected: ["11", "12", "13", "14"],
    comparator: "exact_text",
    hint: "Choisis un nombre strictement entre 10 et 15.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Un nombre compris strictement entre 10 et 15 peut être 11, 12, 13 ou 14. Chacun convient comme exemple.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "volume_defis_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, deux bacs de 18 cm³ et 12 cm³ sont réunis. Quel volume total obtient-on ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Additionne les deux volumes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Quand on réunit deux volumes, on les additionne. Ici 18 + 12 = 30 cm³.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
    tags: ["volumes", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - UNITE
  // =========================
  {
    kind: "template",
    id: "volume_unite_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    hint: "Un volume se mesure en unités cubes.",
    tags: ["volumes", "unite", "template"],
    generate: () => {
      const choices = shuffle(["cm³", "cm²", "cm", "kg"]);
      return {
        text: "Quelle unité est adaptée pour mesurer un volume ?",
        format: "qcm",
        choices,
        expected: ["cm³"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      ("Un volume mesure un espace en trois dimensions. On utilise donc une unité cube, ici cm³.") +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },
  {
    kind: "template",
    id: "volume_unite_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche l’écriture avec l’exposant 3.",
    tags: ["volumes", "unite", "template"],
    generate: () => {
      const good = ["m³", "cm³"][Math.floor(Math.random() * 2)];
      const badBase = good.startsWith("m")
        ? ["m", "m²", "m/s"]
        : ["cm", "cm²", "cm/s"];

      return {
        text: "Laquelle de ces écritures désigne un volume ?",
        format: "qcm",
        choices: shuffle([good, ...badBase]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`L’écriture correcte est ${good}, car un volume s’écrit avec un exposant 3.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },

  // =========================
  // TEMPLATES - COMPTER
  // =========================
  {
    kind: "template",
    id: "volume_compter_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    hint: "Le volume correspond au nombre de cubes unités.",
    tags: ["volumes", "compter", "template"],
    generate: () => {
      const n = randomInt(4, 15);
      return {
        text: `Un solide est formé de ${n} cubes unités. Quel est son volume ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Le volume est égal au nombre de cubes unités. Comme il y a ${n} cubes, le volume vaut ${n}.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },
  {
    kind: "template",
    id: "volume_compter_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le nombre de couches par le nombre de cubes par couche.",
    tags: ["volumes", "compter", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(3, 6);
      return {
        text: `Un solide a ${a} couches de ${b} cubes chacune. Quel est son volume ?`,
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Il y a ${a} couches de ${b} cubes. On calcule donc ${a} × ${b} = ${
          a * b
        }.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },
  {
    kind: "template",
    id: "volume_compter_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte ou multiplie les cubes.",
    tags: ["volumes", "compter", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(2, 5);
      const good = a * b;
      return {
        text: `Un pavé a ${a} rangées de ${b} cubes. Quel est son volume ?`,
        format: "qcm",
        choices: shuffle([
          String(good),
          String(good - 1),
          String(good + 1),
          String(a + b),
        ]),
        expected: [String(good)],
        comparator: "mcq_exact",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Le nombre total de cubes est ${a} × ${b} = ${good}. Le volume vaut donc ${good}.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },

  // =========================
  // TEMPLATES - COMPARER
  // =========================
  {
    kind: "template",
    id: "volume_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux nombres.",
    tags: ["volumes", "comparer", "template"],
    generate: () => {
      const a = randomInt(5, 20);
      let b = randomInt(5, 20);
      while (b === a) b = randomInt(5, 20);
      const good = Math.max(a, b);

      return {
        text: `Quel volume est le plus grand : ${a} cm³ ou ${b} cm³ ?`,
        format: "short",
        expected: [String(good), `${good} cm³`, `${good} cm3`],
        comparator: "contains_keyword",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Comme les deux volumes sont dans la même unité, on compare ${a} et ${b}. Le plus grand est ${good}.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },
  {
    kind: "template",
    id: "volume_comparer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le plus grand nombre correspond au plus grand volume.",
    tags: ["volumes", "comparer", "qcm", "template"],
    generate: () => {
      const values = shuffle([
        randomInt(6, 10),
        randomInt(11, 15),
        randomInt(16, 20),
        randomInt(21, 25),
      ]);
      const good = Math.max(...values);

      return {
        text: "Quel est le plus grand volume ?",
        format: "qcm",
        choices: values.map((v) => `${v} cm³`),
        expected: [`${good} cm³`],
        comparator: "mcq_exact",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Le plus grand des nombres proposés est ${good}. Le plus grand volume est donc ${good} cm³.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },

  // =========================
  // TEMPLATES - ASSEMBLAGE
  // =========================
  {
    kind: "template",
    id: "volume_assemblage_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les deux volumes.",
    tags: ["volumes", "assemblage", "template"],
    generate: () => {
      const a = randomInt(3, 10);
      const b = randomInt(2, 8);
      return {
        text: `On assemble un solide de ${a} cubes et un solide de ${b} cubes. Quel est le volume total ?`,
        format: "short",
        expected: [String(a + b)],
        comparator: "number_equal",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`On additionne les volumes : ${a} + ${b} = ${a + b}.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },
  {
    kind: "template",
    id: "volume_assemblage_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Le volume total est la somme des deux volumes.",
    tags: ["volumes", "assemblage", "qcm", "template"],
    generate: () => {
      const a = randomInt(4, 9);
      const b = randomInt(3, 7);
      const good = a + b;
      return {
        text: `On réunit un solide de ${a} cubes et un solide de ${b} cubes. Quel est le volume total ?`,
        format: "qcm",
        choices: shuffle([
          String(good),
          String(a),
          String(b),
          String(good + 2),
        ]),
        expected: [String(good)],
        comparator: "mcq_exact",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Le volume total est ${a} + ${b} = ${good}.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },

  // =========================
  // TEMPLATES - LIRE
  // =========================
  {
    kind: "template",
    id: "volume_lire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis le nombre avant l’unité.",
    tags: ["volumes", "lire", "template"],
    generate: () => {
      const n = randomInt(5, 30);
      return {
        text: `Dans l’écriture ${n} cm³, quel est le volume ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Dans ${n} cm³, le nombre qui indique la valeur du volume est ${n}.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },
  {
    kind: "template",
    id: "volume_lire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis le plus grand nombre si on demande le plus grand volume.",
    tags: ["volumes", "lire", "qcm", "template"],
    generate: () => {
      const values = shuffle([
        randomInt(6, 10),
        randomInt(11, 15),
        randomInt(16, 20),
        randomInt(21, 25),
      ]);
      const good = Math.max(...values);

      return {
        text: "Quel solide a le plus grand volume ?",
        format: "qcm",
        choices: values.map((v) => `${v} cm³`),
        expected: [`${good} cm³`],
        comparator: "mcq_exact",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Le plus grand nombre proposé est ${good}. Le plus grand volume est donc ${good} cm³.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "volume_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Relie le volume au nombre de cubes.",
    tags: ["volumes", "defi", "template"],
    generate: () => {
      const a = randomInt(8, 15);
      const b = randomInt(5, 12);
      const bigger = a > b ? a : b;

      return {
        text: `Deux solides contiennent ${a} cubes et ${b} cubes. Quel solide a le plus grand volume ?`,
        format: "short",
        expected: [String(bigger)],
        comparator: "contains_keyword",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Le solide qui contient le plus de cubes a le plus grand volume. Entre ${a} et ${b}, le plus grand est ${bigger}.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },
  {
    kind: "template",
    id: "volume_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Choisis un nombre strictement entre les deux bornes.",
    tags: ["volumes", "defi", "template"],
    generate: () => {
      const low = randomInt(8, 12);
      const high = low + randomInt(3, 6);
      const validAnswers: string[] = [];

      for (let n = low + 1; n < high; n++) {
        validAnswers.push(String(n));
      }

      return {
        text: `Donne un volume en cm³ plus grand que ${low} cm³ et plus petit que ${high} cm³.`,
        format: "short",
        expected: validAnswers,
        comparator: "exact_text",
        explanation: "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\nMéthode : on repère le solide, puis on compte les cubes unités ou on utilise la formule adaptée.\n\nCalcul : " +
      (`Il faut choisir un nombre strictement compris entre ${low} et ${high}. Par exemple : ${validAnswers.join(
          ", "
        )}.`) +
      "\n\nConclusion : on obtient le volume demandé avec une unité cube.",
      };
    },
  },
];