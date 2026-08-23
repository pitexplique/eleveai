// ─── Le programme de CM2, écrit comme une DONNÉE ───────────────────────────────
//
// ⛔ POURQUOI CE FICHIER EXISTE (23/08/2026). Même raison qu'en 6e : ce qui
// garantissait la conformité au programme, c'était une lecture humaine, et rien
// dans le dépôt ne la retenait ni ne la rejouait. Frédéric, le 22/08 : « je
// préfère utiliser une demi-journée ou deux à être bien adapté pour 6e, CM2,
// CM1, et après on fait les fiches ».
//
// ⭐ CE FICHIER SE LIT DANS LES DEUX SENS, et c'est tout son intérêt :
//   · un objectif sans micro   → un TROU : un élève n'a rien pour travailler ça ;
//   · une micro sans objectif  → du HORS-PROGRAMME.
// `scripts/verifier-bo.ts cm2` fait les deux lectures et refuse la seconde si
// elle n'est pas déclarée et justifiée dans `microsHorsProgrammeCm2Maths`.
//
// SOURCE DES INTITULÉS : « Programme de mathématiques pour le cycle 3 », MENESR.
// Les intitulés sont RECOPIÉS, jamais reformulés, et `page` renvoie à CE PDF.
//
// ⭐ SOURCE DES EXEMPLES DE RÉUSSITE : « Exemples pour la mise en œuvre des
// programmes — CM2, Mathématiques », MENESR 2025 (26 pages), envoyé par Frédéric
// le 23/08/2026. C'est le document jumeau de celui de la 6e : il ne change aucun
// objectif, mais il dit à quoi ressemble la réussite, et c'est LUI qu'il faut
// rouvrir avant d'écrire une micro. Les notes ci-dessous en citent l'essentiel.
//
// ⚠️ `micros: []` n'est pas un oubli, c'est un CONSTAT. Ne jamais y mettre une
// micro « qui s'en rapproche » pour faire passer le vérificateur au vert.
//
// ⛔⛔ CE QUE LA PREMIÈRE LECTURE A TROUVÉ, ET QUI COMPTE PLUS QUE LES TROUS :
// le programme du cours moyen INTERDIT explicitement trois choses que le coach
// enseigne aujourd'hui en CM2 — le tableau de proportionnalité, le coefficient
// de proportionnalité, et le rapporteur. Ce ne sont pas des oublis de couverture,
// ce sont des contenus à retirer ou à déplacer. Voir les dettes en bas de
// fichier, elles portent la citation exacte du BO.

import type { ObjectifBO } from "@/lib/tutor-v4/knowledge/maths/6e/bo-objectifs";

export const objectifsBOCm2Maths: ObjectifBO[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // NOMBRES, CALCUL ET RÉSOLUTION DE PROBLÈMES
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Les nombres entiers ───────────────────────────────────────────────────
  {
    id: "cm2-N-entiers-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif: "Connaître et utiliser les relations entre les unités de numération.",
    page: 9,
    micros: ["entier_decomposer"],
  },
  {
    id: "cm2-N-entiers-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif: "Connaître la suite écrite et la suite orale des nombres jusqu'à 999 999 999.",
    page: 9,
    micros: ["entier_lire"],
    note: "Le CM2 étend la numération aux millions, dizaines et centaines de millions — neuf chiffres.",
  },
  {
    id: "cm2-N-entiers-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif:
      "Connaître et utiliser diverses représentations d'un nombre et passer de l'une à l'autre.",
    page: 9,
    micros: ["entier_decomposer"],
  },
  {
    id: "cm2-N-entiers-4",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif: "Connaître la valeur des chiffres en fonction de leur position dans un nombre.",
    page: 9,
    micros: ["entier_decomposer"],
  },
  {
    id: "cm2-N-entiers-5",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif:
      "Comparer, encadrer, intercaler des nombres entiers en utilisant les symboles =, < et >.",
    page: 9,
    micros: ["entier_comparer"],
  },
  {
    id: "cm2-N-entiers-6",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif: "Ordonner des nombres dans l'ordre croissant ou décroissant.",
    page: 9,
    micros: ["entier_comparer"],
  },
  {
    id: "cm2-N-entiers-7",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif: "Placer des nombres et repérer des points sur une demi-droite graduée.",
    page: 9,
    micros: [],
    note: "⚠️ `fraction_droite` et `decimal_droite` existent, mais AUCUNE micro ne place un ENTIER sur une demi-droite graduée — et c'est le premier des trois usages que le programme en fait.",
  },
  {
    id: "cm2-N-entiers-8",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif:
      "Déterminer si un nombre entier inférieur ou égal à 10 est un diviseur d'un nombre entier donné ou si un nombre entier donné est un multiple d'un nombre entier inférieur ou égal à 10.",
    page: 9,
    micros: ["entier_multiple"],
    note: "⚠️ COUVERTURE PARTIELLE : `entier_multiple` ne pose que « 72 est-il un multiple de 8 ? ». Le sens DIVISEUR n'a aucun item — le mot n'apparaît dans la banque CM2 que comme terme d'une division posée.",
  },
  {
    id: "cm2-N-entiers-9",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif: "Déterminer des diviseurs d'un nombre entier inférieur ou égal à 100.",
    page: 9,
    micros: [],
  },
  {
    id: "cm2-N-entiers-10",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif: "Déterminer tous les diviseurs d'un nombre entier inférieur ou égal à 30.",
    page: 9,
    micros: [],
    note: "« TOUS les diviseurs » est un autre geste que « est-ce un diviseur ? » : il demande une recherche exhaustive et organisée.",
  },
  {
    id: "cm2-N-entiers-11",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif: "Déterminer les diviseurs communs à deux nombres entiers inférieurs ou égaux à 30.",
    page: 9,
    micros: [],
  },
  {
    id: "cm2-N-entiers-12",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres entiers",
    objectif: "Déterminer des multiples communs à deux nombres entiers inférieurs à 15.",
    page: 9,
    micros: [],
  },

  // ─── Les fractions ─────────────────────────────────────────────────────────
  {
    id: "cm2-N-fractions-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Interpréter, représenter, écrire et lire des fractions.",
    page: 10,
    micros: ["fraction_lire", "fraction_representer"],
  },
  {
    id: "cm2-N-fractions-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif:
      "Écrire une fraction supérieure à 1 comme la somme d'un entier et d'une fraction inférieure à 1.",
    page: 10,
    micros: ["fraction_mixte_ecrire"],
    note: "L'écriture mixte, redemandée en 6e (6e-N-fractions-8). Couvert le 23/08/2026. Exemple de réussite du BO : 58/7 = 56/7 + 2/7 = 8 + 2/7, en s'appuyant sur 7/7 = 1 et la table de 7.",
  },
  {
    id: "cm2-N-fractions-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif:
      "Écrire la somme d'un entier et d'une fraction inférieure à 1 comme une unique fraction.",
    page: 10,
    micros: ["fraction_mixte_regrouper"],
    note: "Le chemin inverse du précédent. Couvert le 23/08/2026 — avec l'item qui explique pourquoi le dénominateur ne change PAS : c'est l'unité dans laquelle on compte.",
  },
  {
    id: "cm2-N-fractions-4",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Encadrer une fraction entre deux nombres entiers consécutifs.",
    page: 10,
    micros: ["fraction_encadrer"],
    note: "Couvert le 23/08/2026. Exemple de réussite du BO : 43/8 = 5 × 8/8 + 3/8 = 5 + 3/8, donc 5 < 43/8 < 6. Le piège (lire le numérateur comme des unités, chercher 9/2 entre 9 et 10) a son item.",
  },
  {
    id: "cm2-N-fractions-5",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif:
      "Placer une fraction ou la somme d'un nombre entier et d'une fraction inférieure à un sur une demi-droite graduée.",
    page: 10,
    micros: ["fraction_droite"],
  },
  {
    id: "cm2-N-fractions-6",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif:
      "Repérer un point d'une demi-droite graduée par une fraction ou par la somme d'un nombre entier et d'une fraction.",
    page: 10,
    micros: ["fraction_droite"],
  },
  {
    id: "cm2-N-fractions-7",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Comparer des fractions.",
    page: 10,
    micros: ["fraction_comparer", "fraction_equivalente"],
  },
  {
    id: "cm2-N-fractions-8",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Additionner et soustraire des fractions.",
    page: 10,
    micros: [],
    note: "⚠️ Aucun item d'addition ou de soustraction de fractions dans toute la banque CM2 — vérifié le 23/08/2026.",
  },
  {
    id: "cm2-N-fractions-9",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Calculer le produit d'un entier et d'une fraction.",
    page: 10,
    micros: [],
  },
  {
    id: "cm2-N-fractions-10",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les fractions",
    objectif: "Déterminer une fraction d'une quantité ou d'une grandeur.",
    page: 10,
    micros: [],
    note: "Le BO donne les exemples : deux tiers de 12 €, trois quarts de 100 mètres.",
  },

  // ─── Les nombres décimaux ──────────────────────────────────────────────────
  {
    id: "cm2-N-decimaux-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif: "Interpréter, représenter, écrire et lire des fractions décimales.",
    page: 10,
    micros: ["fraction_decimale"],
  },
  {
    id: "cm2-N-decimaux-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif:
      "Connaître et utiliser les relations entre unités simples, dixièmes, centièmes et millièmes.",
    page: 10,
    micros: ["decimal_valeur_chiffre"],
    note: "Le CM2 étend l'étude aux MILLIÈMES (le CM1 s'arrêtait aux centièmes).",
  },
  {
    id: "cm2-N-decimaux-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif:
      "Placer une fraction décimale sur une demi-droite graduée et repérer un point d'une demi-droite graduée par une fraction décimale.",
    page: 10,
    micros: [],
    note: "⚠️ `fraction_droite` place des fractions et `decimal_droite` des écritures à virgule ; la FRACTION DÉCIMALE sur la droite n'est posée par ni l'une ni l'autre.",
  },
  {
    id: "cm2-N-decimaux-4",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif:
      "Écrire une fraction décimale supérieure à 1 comme la somme d'un nombre entier et d'une fraction décimale inférieure à 1.",
    page: 10,
    micros: [],
  },
  {
    id: "cm2-N-decimaux-5",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif:
      "Écrire une fraction décimale supérieure à 1 comme la somme d'un nombre entier et de fractions décimales ayant un numérateur inférieur à 10.",
    page: 10,
    micros: [],
    note: "C'est la décomposition canonique du BO : 35,78 = 35 + 7/10 + 8/100.",
  },
  {
    id: "cm2-N-decimaux-6",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif:
      "Comparer, encadrer, intercaler des fractions décimales en utilisant les symboles =, < et >.",
    page: 10,
    micros: [],
  },
  {
    id: "cm2-N-decimaux-7",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif: "Ordonner des fractions décimales dans l'ordre croissant ou décroissant.",
    page: 10,
    micros: [],
  },
  {
    id: "cm2-N-decimaux-8",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif:
      "Passer d'une écriture sous forme d'une fraction décimale ou de la somme de fractions décimales à une écriture à virgule et réciproquement.",
    page: 10,
    micros: ["decimal_fraction"],
  },
  {
    id: "cm2-N-decimaux-9",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif: "Interpréter, représenter, écrire et lire des nombres décimaux (écriture à virgule).",
    page: 10,
    micros: ["decimal_lire"],
  },
  {
    id: "cm2-N-decimaux-10",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif:
      "Placer un nombre décimal en écriture à virgule sur une demi-droite graduée et repérer un point d'une demi-droite graduée par un nombre en écriture à virgule.",
    page: 10,
    micros: ["decimal_droite"],
  },
  {
    id: "cm2-N-decimaux-11",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif: "Savoir donner la partie entière et l'arrondi à l'entier d'un nombre décimal.",
    page: 10,
    micros: ["decimal_arrondir"],
  },
  {
    id: "cm2-N-decimaux-12",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les nombres décimaux",
    objectif:
      "Comparer, encadrer, intercaler, ordonner par ordre croissant ou décroissant des nombres décimaux donnés par leur écriture à virgule en utilisant les symboles =, < et >.",
    page: 10,
    micros: ["decimal_comparer", "decimal_ordonner"],
    note: "⚠️ COUVERTURE PARTIELLE : comparer et ordonner sont là ; ENCADRER et INTERCALER un décimal ne sont posés nulle part.",
  },

  // ─── Le calcul mental ──────────────────────────────────────────────────────
  {
    id: "cm2-N-mental-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — mémoriser des faits numériques",
    objectif: "Connaître des faits numériques usuels avec des entiers.",
    page: 10,
    micros: ["calcul_mental", "multiplication_table"],
  },
  {
    id: "cm2-N-mental-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — mémoriser des faits numériques",
    objectif: "Connaître la moitié des nombres impairs jusqu'à 15.",
    page: 10,
    micros: [],
    note: "La moitié de 7 vaut 3,5 : c'est là que la moitié d'un impair fait apparaître un décimal.",
  },
  {
    id: "cm2-N-mental-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — mémoriser des faits numériques",
    objectif: "Connaître quelques relations entre des fractions usuelles.",
    page: 10,
    micros: [],
  },
  {
    id: "cm2-N-mental-4",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — mémoriser des faits numériques",
    objectif: "Connaître l'écriture décimale de fractions usuelles.",
    page: 10,
    micros: [],
    note: "1/4 = 0,25 ; 1/2 = 0,5 ; 3/4 = 0,75. `decimal_fraction` ne traite que les fractions DÉCIMALES (7/10), pas les fractions usuelles.",
  },
  {
    id: "cm2-N-mental-5",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — numération",
    objectif:
      "Ajouter ou soustraire un nombre entier à un nombre décimal lorsqu'il n'y a pas de retenue.",
    page: 11,
    micros: ["calcul_decimal_addition", "calcul_decimal_soustraction"],
  },
  {
    id: "cm2-N-mental-6",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — numération",
    objectif: "Ajouter un nombre entier à un nombre décimal lorsqu'il y a une retenue.",
    page: 11,
    micros: ["calcul_decimal_addition"],
  },
  {
    id: "cm2-N-mental-7",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — numération",
    objectif: "Multiplier un nombre décimal par 10, 100 ou 1 000.",
    page: 11,
    micros: ["multiplication_puissance_dix"],
  },
  {
    id: "cm2-N-mental-8",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — numération",
    objectif: "Diviser un nombre décimal par 10, 100 ou 1 000.",
    page: 11,
    micros: [],
    note: "⚠️ `multiplication_puissance_dix` ne fait que MULTIPLIER. La division par 10, 100, 1 000 n'a aucune micro — et c'est elle qui prépare la multiplication par 0,1 de la 6e.",
  },
  {
    id: "cm2-N-mental-9",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — procédures",
    objectif:
      "Ajouter deux nombres décimaux inférieurs à 10, s'écrivant avec au plus un chiffre après la virgule.",
    page: 11,
    micros: ["calcul_decimal_addition"],
  },
  {
    id: "cm2-N-mental-10",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — procédures",
    objectif: "Ajouter ou soustraire 8, 9, 18, 19, 28, 29, …, 98 ou 99 à un nombre.",
    page: 11,
    micros: ["calcul_mental"],
  },
  {
    id: "cm2-N-mental-11",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — procédures",
    objectif:
      "Multiplier un nombre entier, inférieur à 10, de dizaines, de centaines ou de milliers par un nombre entier, inférieur à 10, de dizaines, de centaines ou de milliers.",
    page: 11,
    micros: ["multiplication_mental"],
  },
  {
    id: "cm2-N-mental-12",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — procédures",
    objectif:
      "Utiliser la distributivité de la multiplication par rapport à l'addition dans des cas simples.",
    page: 11,
    micros: [],
    note: "12 × 7 = 10 × 7 + 2 × 7. C'est la procédure qui rend le calcul mental possible sur de grands nombres.",
  },
  {
    id: "cm2-N-mental-13",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — procédures",
    objectif: "Calculer le double d'un nombre décimal dans des cas simples.",
    page: 11,
    micros: [],
  },
  {
    id: "cm2-N-mental-14",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — procédures",
    objectif: "Calculer la moitié d'un nombre décimal dans des cas simples.",
    page: 11,
    micros: [],
  },
  {
    id: "cm2-N-mental-15",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — procédures",
    objectif: "Diviser un nombre entier par 4 ou par 8.",
    page: 11,
    micros: [],
    note: "Par moitiés successives : diviser par 4, c'est prendre deux fois la moitié.",
  },
  {
    id: "cm2-N-mental-16",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — procédures",
    objectif: "Multiplier un nombre par 5.",
    page: 11,
    micros: ["multiplication_mental"],
  },
  {
    id: "cm2-N-mental-17",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Le calcul mental — procédures",
    objectif: "Multiplier un nombre décimal par 50.",
    page: 11,
    micros: [],
  },

  // ─── Les quatre opérations ─────────────────────────────────────────────────
  {
    id: "cm2-N-operations-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les quatre opérations",
    objectif: "Estimer le résultat d'une opération.",
    page: 11,
    micros: [],
    note: "L'ordre de grandeur, qui sert à contrôler un résultat avant de le valider.",
  },
  {
    id: "cm2-N-operations-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les quatre opérations",
    objectif: "Savoir réaliser un calcul contenant une ou deux paires de parenthèses.",
    page: 11,
    micros: ["calcul_priorite"],
    note: "Le CM2 monte à DEUX paires de parenthèses (le CM1 n'en demandait qu'une).",
  },
  {
    id: "cm2-N-operations-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les quatre opérations",
    objectif: "Poser et effectuer la multiplication d'un nombre décimal par un nombre entier.",
    page: 11,
    micros: [],
    note: "⚠️ `multiplication_posee` ne pose que des multiplications d'ENTIERS. Le facteur décimal, nouveauté du CM2, n'a aucun item.",
  },
  {
    id: "cm2-N-operations-4",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les quatre opérations",
    objectif:
      "Poser et effectuer des divisions décimales avec un dividende entier et un diviseur à un chiffre.",
    page: 11,
    micros: [],
    note: "⚠️ `division_posee` s'arrête à la division euclidienne : poursuivre le calcul APRÈS la virgule n'est posé nulle part.",
  },
  {
    id: "cm2-N-operations-5",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Les quatre opérations",
    objectif:
      "Poser et effectuer des divisions décimales avec un dividende décimal et un diviseur à un chiffre.",
    page: 11,
    micros: [],
  },

  // ─── La résolution de problèmes ────────────────────────────────────────────
  {
    id: "cm2-N-problemes-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "La résolution de problèmes",
    objectif: "Résoudre des problèmes additifs en une ou plusieurs étapes.",
    page: 12,
    micros: ["probleme_une_etape", "probleme_plusieurs_etapes", "probleme_choisir_operation"],
  },
  {
    id: "cm2-N-problemes-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "La résolution de problèmes",
    objectif: "Résoudre des problèmes multiplicatifs de type « parties-tout » en une étape.",
    page: 12,
    micros: ["multiplication_probleme"],
  },
  {
    id: "cm2-N-problemes-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "La résolution de problèmes",
    objectif: "Résoudre des problèmes mixtes en plusieurs étapes.",
    page: 12,
    micros: ["probleme_plusieurs_etapes", "probleme_defi"],
  },
  {
    id: "cm2-N-problemes-4",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "La résolution de problèmes",
    objectif: "Résoudre des problèmes de comparaison multiplicative.",
    page: 12,
    micros: [],
    note: "« Trois fois plus », « quatre fois moins » — la structure que le BO nomme explicitement.",
  },
  {
    id: "cm2-N-problemes-5",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "La résolution de problèmes",
    objectif: "Résoudre des problèmes de dénombrement.",
    page: 12,
    micros: [],
  },
  {
    id: "cm2-N-problemes-6",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "La résolution de problèmes",
    objectif: "Résoudre des problèmes d'optimisation.",
    page: 12,
    micros: [],
  },
  {
    id: "cm2-N-problemes-7",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "La résolution de problèmes",
    objectif: "Résoudre des problèmes préparant à l'utilisation d'algorithmes.",
    page: 12,
    micros: [],
    note: "⚠️ CORRIGÉ le 23/08/2026 après lecture des exemples de réussite : il ne s'agit PAS de suivre un programme d'instructions, mais de « rechercher TOUTES les solutions vérifiant certaines conditions » en organisant sa recherche pour en assurer l'exhaustivité (les 100 œufs en boîtes de 6 et de 10, les rectangles d'aire 60 cm²). Aucune micro ne fait ça — `algo_programme` et `algo_repetition` exécutent des instructions, ce qui est un autre geste.",
  },

  // ─── Algèbre ───────────────────────────────────────────────────────────────
  {
    id: "cm2-N-algebre-1",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Algèbre",
    objectif: "Trouver le nombre manquant dans une égalité à trous.",
    page: 13,
    micros: ["algebre_completer_egalite", "algebre_egalite"],
    note: "Le BO donne l'exemple : « 178 − … = 6 × 8 ».",
  },
  {
    id: "cm2-N-algebre-2",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Algèbre",
    objectif: "Résoudre des problèmes algébriques.",
    page: 13,
    micros: ["algebre_nombre_inconnu", "algebre_schema_barre", "algebre_defi"],
  },
  {
    id: "cm2-N-algebre-3",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Algèbre",
    objectif: "Exécuter ou produire un programme de calcul.",
    page: 13,
    micros: ["algo_programme"],
    note: "⚠️ Le CM2 demande de PRODUIRE un programme, pas seulement de l'exécuter (le CM1 s'arrêtait à « exécuter »).",
  },
  {
    id: "cm2-N-algebre-4",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Algèbre",
    objectif: "Identifier et formuler une règle de calcul pour poursuivre une suite de nombres.",
    page: 13,
    micros: ["suite_regle", "suite_continuer", "suite_croissante_decroissante", "suite_defi"],
  },
  {
    id: "cm2-N-algebre-5",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Algèbre",
    objectif: "Identifier des régularités et poursuivre une suite de motifs évolutive.",
    page: 13,
    micros: ["algebre_motif"],
  },
  {
    id: "cm2-N-algebre-6",
    domaine: "Nombres, calcul et résolution de problèmes",
    chapitre: "Algèbre",
    objectif:
      "Trouver le nombre d'éléments pour une étape donnée dans une suite de motifs évolutive.",
    page: 13,
    micros: [],
    note: "⭐ C'est la STRUCTURE du motif — répondre pour l'étape 25 sans dessiner. Nouveauté du CM2, et l'objectif qui prépare directement `algebre_motif` de la 6e.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GRANDEURS ET MESURES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cm2-GM-aires-1",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif: "Comparer les aires de différentes figures planes.",
    page: 16,
    micros: ["aire_comprendre"],
  },
  {
    id: "cm2-GM-aires-2",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif: "Déterminer des aires.",
    page: 16,
    micros: ["aire_carre_rectangle", "aire_composer", "aire_defi"],
  },
  {
    id: "cm2-GM-aires-3",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif:
      "Connaître et utiliser les unités centimètre carré, décimètre carré et mètre carré pour exprimer des aires.",
    page: 16,
    micros: [],
  },
  {
    id: "cm2-GM-aires-4",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif: "Convertir des aires entre différentes unités.",
    page: 16,
    micros: [],
    note: "⚠️ Le BO du cours moyen précise que « les élèves n'utilisent pas de tableaux pour effectuer des conversions ; ils s'appuient sur les relations connues entre les unités en jeu ».",
  },
  {
    id: "cm2-GM-aires-5",
    domaine: "Grandeurs et mesures",
    chapitre: "Les aires",
    objectif: "Déterminer l'aire d'un carré ou d'un rectangle.",
    page: 16,
    micros: ["aire_carre_rectangle"],
    note: "⚠️ Le BO ajoute : « Il n'est pas attendu de mémorisation de formules de périmètres de figures planes au CM2 » — l'élève établit lui-même ses règles de calcul.",
  },
  {
    id: "cm2-GM-angles-1",
    domaine: "Grandeurs et mesures",
    chapitre: "Les angles",
    objectif: "Utiliser le lexique spécifique associé aux angles.",
    page: 16,
    micros: ["angle_reconnaitre", "angle_type"],
  },
  {
    id: "cm2-GM-angles-2",
    domaine: "Grandeurs et mesures",
    chapitre: "Les angles",
    objectif: "Comprendre et utiliser les notations des angles.",
    page: 16,
    micros: [],
  },
  {
    id: "cm2-GM-angles-3",
    domaine: "Grandeurs et mesures",
    chapitre: "Les angles",
    objectif: "Comparer des angles.",
    page: 16,
    micros: [],
    note: "⭐ SANS RAPPORTEUR : par superposition ou par report, le rapporteur ne relevant pas du CM2.",
  },
  {
    id: "cm2-GM-angles-4",
    domaine: "Grandeurs et mesures",
    chapitre: "Les angles",
    objectif:
      "Construire un angle égal à la somme de deux angles donnés ou un angle multiple d'un angle donné.",
    page: 16,
    micros: [],
  },
  {
    id: "cm2-GM-angles-5",
    domaine: "Grandeurs et mesures",
    chapitre: "Les angles",
    objectif: "Construire par pliage la moitié d'un angle donné.",
    page: 16,
    micros: [],
    note: "Le pliage, et non la bissectrice au compas — celle-ci arrive en 6e.",
  },
  {
    id: "cm2-GM-angles-6",
    domaine: "Grandeurs et mesures",
    chapitre: "Les angles",
    objectif: "Savoir qu'un angle droit mesure 90°.",
    page: 16,
    micros: ["angle_droit"],
    note: "Le degré est introduit au CM2 À PARTIR de la mesure de l'angle droit — c'est le seul repère chiffré attendu.",
  },
  {
    id: "cm2-GM-durees-1",
    domaine: "Grandeurs et mesures",
    chapitre: "Le repérage dans le temps et les durées",
    objectif: "Lire l'heure sur une horloge à aiguilles.",
    page: 16,
    micros: ["duree_lire"],
  },
  {
    id: "cm2-GM-durees-2",
    domaine: "Grandeurs et mesures",
    chapitre: "Le repérage dans le temps et les durées",
    objectif:
      "Positionner les aiguilles d'une horloge correspondant à une heure donnée en heure, minute et seconde.",
    page: 16,
    micros: [],
    note: "Le geste inverse de la lecture : `duree_lire` ne fait que lire.",
  },
  {
    id: "cm2-GM-durees-3",
    domaine: "Grandeurs et mesures",
    chapitre: "Le repérage dans le temps et les durées",
    objectif:
      "Comparer et mesurer des durées écoulées entre deux instants affichés sur une horloge (instants et durées sont exprimés en heure, minute et seconde).",
    page: 16,
    micros: ["duree_calculer"],
    note: "La SECONDE est la nouveauté du CM2 (le CM1 s'arrêtait à l'heure et à la minute).",
  },
  {
    id: "cm2-GM-durees-4",
    domaine: "Grandeurs et mesures",
    chapitre: "Le repérage dans le temps et les durées",
    objectif: "Résoudre des problèmes à une ou plusieurs étapes impliquant des durées.",
    page: 16,
    micros: ["duree_probleme", "duree_defi"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ESPACE ET GÉOMÉTRIE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cm2-G-plane-1",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif:
      "Utiliser le vocabulaire géométrique approprié dans le contexte d'apprentissage des notions correspondantes.",
    page: 21,
    micros: ["figure_reconnaitre", "droite_reconnaitre"],
  },
  {
    id: "cm2-G-plane-2",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif: "Utiliser les outils géométriques usuels : règle, règle graduée, équerre et compas.",
    page: 21,
    micros: ["droite_tracer", "figure_construire"],
  },
  {
    id: "cm2-G-plane-3",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif: "Connaître les notations et les codes usuels utilisés en géométrie.",
    page: 21,
    micros: [],
    note: "⚠️ Le BO précise qu'aucune connaissance des conventions (AB), [AB], AB n'est exigible au cours moyen : les consignes explicitent les symboles. Ce qui est attendu, c'est le CODAGE des angles droits et des longueurs égales.",
  },
  {
    id: "cm2-G-plane-4",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif: "Reconnaître et utiliser la notion de perpendicularité.",
    page: 21,
    micros: ["droite_perpendiculaire"],
  },
  {
    id: "cm2-G-plane-5",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif: "Reconnaître et utiliser la notion de parallélisme.",
    page: 21,
    micros: ["droite_parallele"],
  },
  {
    id: "cm2-G-plane-6",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif:
      "Décrire et reconnaître un cercle et un disque comme un ensemble de points caractérisés par leur distance à un point donné.",
    page: 21,
    micros: [],
    note: "⚠️ `figure_cercle` reconnaît le cercle comme une FORME. La définition par ensemble de points — la même qu'en 6e (6e-G-cercles-2) — n'est posée nulle part au CM2.",
  },
  {
    id: "cm2-G-plane-7",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif:
      "Reconnaître et nommer les figures suivantes en s'appuyant sur leur définition : triangle, triangle rectangle, triangle isocèle, triangle équilatéral, quadrilatère, carré, rectangle, losange, trapèze, trapèze rectangle, pentagone et hexagone.",
    page: 21,
    micros: ["figure_triangle", "figure_quadrilatere", "figure_reconnaitre"],
    note: "Le CM2 ajoute au CM1 le trapèze, le trapèze rectangle, le pentagone et l'hexagone.",
  },
  {
    id: "cm2-G-plane-8",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif:
      "Connaître les propriétés de parallélisme des côtés opposés, des égalités de longueurs et d'angles pour les figures usuelles : triangle rectangle, triangle isocèle, triangle équilatéral, carré, rectangle, losange, trapèze et trapèze rectangle.",
    page: 22,
    micros: ["figure_propriete"],
  },
  {
    id: "cm2-G-plane-9",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif:
      "Reproduire ou construire un carré, un rectangle, un triangle, un triangle rectangle ou un cercle ou des assemblages de ces figures sur tout support (papier quadrillé, pointé ou uni), avec une règle graduée, une équerre ou un compas.",
    page: 22,
    micros: ["figure_construire", "figure_cercle"],
  },
  {
    id: "cm2-G-plane-10",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif:
      "Construire une figure géométrique composée de segments, de droites, de polygones usuels et de cercles.",
    page: 22,
    micros: ["figure_construire"],
  },
  {
    id: "cm2-G-plane-11",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif: "Élaborer un programme de construction.",
    page: 22,
    micros: [],
    note: "⭐ Nouveauté du CM2 : au CM1 l'élève SUIT un programme de construction, au CM2 il en ÉCRIT un. C'est aussi de la pensée informatique.",
  },
  {
    id: "cm2-G-plane-12",
    domaine: "Espace et géométrie",
    chapitre: "La géométrie plane",
    objectif:
      "Construire, sur papier quadrillé, la figure symétrique d'une figure donnée par rapport à une droite verticale, horizontale ou une diagonale du quadrillage.",
    page: 22,
    micros: ["symetrie_construire", "symetrie_completer"],
    note: "Le CM2 ajoute la DIAGONALE du quadrillage (le CM1 s'arrêtait aux axes vertical et horizontal).",
  },
  {
    id: "cm2-G-solides-1",
    domaine: "Espace et géométrie",
    chapitre: "Les solides",
    objectif: "Nommer un cube, une boule, un pavé, un cône, une pyramide, un cylindre ou un prisme droit.",
    page: 22,
    micros: ["solide_reconnaitre"],
  },
  {
    id: "cm2-G-solides-2",
    domaine: "Espace et géométrie",
    chapitre: "Les solides",
    objectif:
      "Décrire un cube, un pavé, une pyramide ou un prisme droit en faisant référence à des propriétés et en utilisant le vocabulaire approprié.",
    page: 22,
    micros: ["solide_sommet_arete_face", "solide_face"],
  },
  {
    id: "cm2-G-solides-3",
    domaine: "Espace et géométrie",
    chapitre: "Les solides",
    objectif: "Reconnaître un patron d'un cube.",
    page: 22,
    micros: ["solide_patron"],
  },
  {
    id: "cm2-G-solides-4",
    domaine: "Espace et géométrie",
    chapitre: "Les solides",
    objectif: "Construire un patron d'un cube.",
    page: 22,
    micros: [],
    note: "⚠️ `solide_patron` ne fait que RECONNAÎTRE. Construire est un autre geste, et le BO le demande.",
  },
  {
    id: "cm2-G-solides-5",
    domaine: "Espace et géométrie",
    chapitre: "Les solides",
    objectif: "Reconnaître un patron d'un pavé.",
    page: 22,
    micros: ["solide_patron"],
  },
  {
    id: "cm2-G-deplacements-1",
    domaine: "Espace et géométrie",
    chapitre: "Déplacements dans l'espace",
    objectif: "Connaître et utiliser le vocabulaire lié aux déplacements.",
    page: 22,
    micros: ["reperage_deplacement"],
  },
  {
    id: "cm2-G-deplacements-2",
    domaine: "Espace et géométrie",
    chapitre: "Déplacements dans l'espace",
    objectif:
      "Comprendre, utiliser et produire une suite d'instructions qui décrivent un déplacement en utilisant un vocabulaire spatial précis.",
    page: 22,
    micros: ["algo_instruction", "algo_deplacement", "reperage_defi"],
  },
  {
    id: "cm2-G-deplacements-3",
    domaine: "Espace et géométrie",
    chapitre: "Déplacements dans l'espace",
    objectif: "Résoudre des problèmes portant sur des assemblages de cubes.",
    page: 22,
    micros: [],
    note: "Le même objectif reviendra en 6e sous le nom « voir dans l'espace des assemblages de cubes ».",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ORGANISATION ET GESTION DE DONNÉES ET PROBABILITÉS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cm2-D-donnees-1",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Organisation et gestion de données",
    objectif:
      "Recueillir des données et produire un tableau, un diagramme en barres ou un ensemble de points dans un repère pour présenter des données recueillies.",
    page: 25,
    micros: ["tableau_completer", "graphique_completer"],
    note: "⚠️ COUVERTURE PARTIELLE : compléter un tableau déjà tracé n'est pas RECUEILLIR des données puis PRODUIRE la représentation. Même trou qu'en 6e avant le 23/08.",
  },
  {
    id: "cm2-D-donnees-2",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Organisation et gestion de données",
    objectif:
      "Lire et interpréter les données d'un tableau, d'un diagramme en barres, d'un diagramme circulaire ou d'une courbe.",
    page: 25,
    micros: ["tableau_lire", "tableau_interpreter", "graphique_lire", "graphique_interpreter"],
  },
  {
    id: "cm2-D-donnees-3",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Organisation et gestion de données",
    objectif:
      "Résoudre des problèmes en une ou deux étapes en utilisant les données d'un tableau, d'un diagramme en barres, d'un diagramme circulaire ou d'une courbe.",
    page: 25,
    micros: ["tableau_defi", "graphique_defi"],
  },
  {
    id: "cm2-D-probabilites-1",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Les probabilités",
    objectif: "Identifier toutes les issues possibles lors d'une expérience aléatoire simple.",
    page: 25,
    micros: ["probabilite_roue_de_sac"],
  },
  {
    id: "cm2-D-probabilites-2",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Les probabilités",
    objectif:
      "Identifier toutes les issues réalisant un évènement dans une expérience aléatoire simple.",
    page: 25,
    micros: [],
    note: "La différence entre les issues POSSIBLES et celles qui réalisent l'ÉVÈNEMENT — c'est elle qui rend le quotient a/b calculable.",
  },
  {
    id: "cm2-D-probabilites-3",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Les probabilités",
    objectif:
      "Dans une situation d'équiprobabilité, lors d'une expérience aléatoire simple, exprimer la probabilité d'un évènement sous la forme « a chances sur b ».",
    page: 25,
    micros: [],
    note: "⭐ C'est l'objectif qui prépare directement la 6e, où « a chances sur b » devient le quotient a/b.",
  },
  {
    id: "cm2-D-probabilites-4",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Les probabilités",
    objectif: "Comparer des probabilités dans des cas simples.",
    page: 25,
    micros: ["probabilite_comparer"],
  },
  {
    id: "cm2-D-probabilites-5",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Les probabilités",
    objectif:
      "Comprendre la notion d'indépendance lors de la répétition de la même expérience aléatoire.",
    page: 25,
    micros: [],
    note: "⭐ Le BO l'écrit ainsi : les élèves « prennent conscience que le dé ne se souvient pas du résultat sorti lors du lancer précédent ». C'est le piège du joueur, posé dès le CM2.",
  },
  {
    id: "cm2-D-probabilites-6",
    domaine: "Organisation et gestion de données et probabilités",
    chapitre: "Les probabilités",
    objectif:
      "Dans des situations d'équiprobabilité, recenser toutes les issues possibles d'une expérience aléatoire en deux étapes dans un tableau ou dans un arbre afin de déterminer des probabilités.",
    page: 25,
    micros: [],
    note: "Le tableau à double entrée et l'arbre, sur une expérience à DEUX épreuves.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LA PROPORTIONNALITÉ
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cm2-P-proportionnalite-1",
    domaine: "La proportionnalité",
    chapitre: "La proportionnalité",
    objectif: "Identifier une situation de proportionnalité.",
    page: 27,
    micros: ["prop_reconnaitre"],
  },
  {
    id: "cm2-P-proportionnalite-2",
    domaine: "La proportionnalité",
    chapitre: "La proportionnalité",
    objectif: "Savoir résoudre un problème de proportionnalité.",
    page: 27,
    micros: ["prop_probleme", "prop_quatrieme", "prop_defi"],
    note: "⛔⛔ LE BO BORNE LES PROCÉDURES, ET LE COACH LES DÉPASSE : « Seuls des raisonnements fondés sur les propriétés de linéarité pour la multiplication et pour l'addition sont attendus ; ni l'utilisation du coefficient de proportionnalité, ni le recours au “produit en croix” ne sont enseignés au cours moyen. » Voir les dettes `prop_tableau`, `prop_coefficient` et `prop_quatrieme`.",
  },
];

/**
 * Les micros du CM2 qui ne servent aucun objectif du programme.
 *
 * ⚠️ Une dette n'est pas une erreur : un réinvestissement du CM1 est légitime.
 * Mais elle doit être DÉCLARÉE et JUSTIFIÉE, sinon le hors-programme se réinstalle
 * en silence — c'est exactement ce que ce fichier existe pour empêcher.
 */
export const microsHorsProgrammeCm2Maths: { micro: string; raison: string }[] = [
  // ── ⛔⛔ À TRANCHER : le BO les EXCLUT nommément du cours moyen ────────────
  {
    micro: "prop_tableau",
    raison:
      "⚠️ LE LIBELLÉ EST HORS PROGRAMME, PAS LES ITEMS — vérifié le 23/08/2026. Le BO écrit : « les élèves n'utilisent pas de tableaux de proportionnalité au cours moyen » (p. 27). Or les items de cette micro raisonnent par LINÉARITÉ (« 8 personnes, c'est 2 fois plus que 4 ») et par PASSAGE À L'UNITÉ — exactement ce que le BO demande. Il suffit donc de la RENOMMER, pas de la supprimer.",
  },
  {
    micro: "prop_coefficient",
    raison:
      "⛔⛔ CONTRAIRE AU BO. « Ni l'utilisation du coefficient de proportionnalité, ni le recours au “produit en croix” ne sont enseignés au cours moyen » (p. 27). À retirer ou à déplacer.",
  },
  {
    micro: "angle_mesurer",
    raison:
      "⛔⛔ CONTRAIRE AU BO. « L'utilisation d'un instrument de mesure des angles (rapporteur) ne relève pas du CM2 et sera introduite au collège » (p. 16). Au cours moyen on COMPARE des angles, on ne les mesure pas.",
  },

  // ── Hors programme du CM2, mais légitime : le pourcentage arrive en 6e ────
  {
    micro: "pourcentage_comprendre",
    raison:
      "Le pourcentage n'apparaît nulle part dans le programme du cours moyen : « connaître la définition d'un pourcentage » est un objectif de 6e. Anticipation à assumer ou à retirer.",
  },
  {
    micro: "pourcentage_fraction_decimal",
    raison: "Idem : le pourcentage est un objectif de 6e, pas de CM2.",
  },
  {
    micro: "pourcentage_calculer",
    raison: "Idem : le pourcentage est un objectif de 6e, pas de CM2.",
  },
  {
    micro: "pourcentage_probleme",
    raison: "Idem : le pourcentage est un objectif de 6e, pas de CM2.",
  },
  {
    micro: "pourcentage_defi",
    raison: "Idem : le pourcentage est un objectif de 6e, pas de CM2.",
  },

  // ── Hors programme du CM2 : les échelles sont un objectif de 6e ───────────
  {
    micro: "echelle_comprendre",
    raison:
      "⚠️ Les échelles ne figurent pas au programme du cours moyen : « s'initier à la résolution de problèmes d'échelles » est un objectif de 6e (6e-P-proportionnalite-5). Anticipation à assumer ou à retirer.",
  },
  {
    micro: "echelle_distance_reelle",
    raison: "Idem : les échelles sont un objectif de 6e, pas de CM2.",
  },
  {
    micro: "echelle_distance_plan",
    raison: "Idem : les échelles sont un objectif de 6e, pas de CM2.",
  },
  { micro: "echelle_defi", raison: "Idem : les échelles sont un objectif de 6e, pas de CM2." },

  // ── Réinvestissements du CM1 et du cycle 2, légitimes ────────────────────
  {
    micro: "entier_arrondir",
    raison:
      "Réinvestissement. Le CM2 ne demande l'arrondi que pour les DÉCIMAUX (cm2-N-decimaux-11) ; arrondir un entier reste un appui utile.",
  },
  {
    micro: "entier_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "fraction_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "decimal_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "calcul_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "multiplication_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "division_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "figure_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "solide_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "symetrie_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "droite_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "angle_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "perimetre_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "probabilite_defi",
    raison: "Bloc de défis d'un chapitre couvert : il sert plusieurs objectifs à la fois.",
  },
  {
    micro: "division_sens",
    raison:
      "Réinvestissement du CM1 : le sens de la division n'est plus un objectif listé au CM2, mais il porte `division_posee` et les divisions décimales.",
  },
  {
    micro: "division_lien_multiplication",
    raison: "Réinvestissement : appui de la division posée et de la recherche de diviseurs.",
  },
  {
    micro: "division_reste",
    raison:
      "Réinvestissement du CM1. ⚠️ Au CM2, le programme demande de poursuivre la division APRÈS la virgule (divisions décimales) — le reste devient une étape, plus une fin.",
  },
  {
    micro: "division_posee",
    raison:
      "⚠️ Réinvestissement PARTIEL : la division euclidienne posée relève du CM1 ; le CM2 demande les divisions DÉCIMALES (cm2-N-operations-4 et -5), qui n'ont aucun item.",
  },
  {
    micro: "division_probleme",
    raison: "Réinvestissement : sert les problèmes multiplicatifs et de partage.",
  },
  {
    micro: "multiplication_posee",
    raison:
      "⚠️ Réinvestissement PARTIEL : la multiplication posée d'entiers relève du CM1 ; le CM2 demande le produit d'un DÉCIMAL par un entier (cm2-N-operations-3), qui n'a aucun item.",
  },
  {
    micro: "calcul_addition_posee",
    raison: "Réinvestissement du CM1 : l'addition posée d'entiers n'est plus un objectif listé.",
  },
  {
    micro: "calcul_soustraction_posee",
    raison: "Réinvestissement du CM1 : la soustraction posée d'entiers n'est plus un objectif listé.",
  },
  {
    micro: "probleme_rediger",
    raison:
      "Compétence transversale : le BO en fait une exigence permanente (« phase Répondre »), pas un objectif d'apprentissage listé.",
  },
  {
    micro: "algebre_relation",
    raison:
      "Réinvestissement : décrire une relation entre deux quantités prépare `algebre_nombre_inconnu` et la proportionnalité, sans être un objectif propre.",
  },
  {
    micro: "algo_logique",
    raison:
      "La pensée informatique n'est pas un domaine propre au cours moyen : elle est « intégrée à certains des domaines », et elle n'a donc AUCUN objectif à elle. Les suites logiques servent cm2-N-algebre-4.",
  },
  {
    micro: "algo_repetition",
    raison:
      "Idem : pas de domaine propre au cours moyen. La répétition sert les programmes de calcul (cm2-N-algebre-3) et les codages de déplacement (cm2-G-deplacements-2).",
  },
  {
    micro: "algo_defi",
    raison:
      "Bloc de défis d'un domaine qui n'a pas d'objectif propre au cours moyen. ⏳ Ce serait le bon endroit pour accrocher cm2-N-problemes-7 (chercher TOUTES les solutions), qui n'a aujourd'hui aucune micro.",
  },
  {
    micro: "reperage_quadrillage",
    raison:
      "Réinvestissement du CM1 (« Le repérage dans l'espace » y est un chapitre à part entière) ; au CM2 il ne reste que les déplacements.",
  },
  {
    micro: "reperage_coordonnees",
    raison:
      "Réinvestissement. ⚠️ Le repère apparaît toutefois dans cm2-D-donnees-1 (« un ensemble de points dans un repère »).",
  },
  {
    micro: "reperage_placer_point",
    raison: "Idem : réinvestissement, utile à la représentation de données dans un repère.",
  },
  {
    micro: "longueur_comparer",
    raison:
      "Réinvestissement du CM1 : « Les longueurs » y sont un chapitre à part entière. Le CM2 ne liste que les aires, les angles et les durées, mais le BO écrit que « les connaissances des grandeurs rencontrées précédemment se renforcent progressivement ».",
  },
  { micro: "longueur_convertir", raison: "Réinvestissement du CM1, comme ci-dessus." },
  { micro: "longueur_estimer", raison: "Réinvestissement du CM1, comme ci-dessus." },
  { micro: "longueur_defi", raison: "Réinvestissement du CM1, comme ci-dessus." },
  { micro: "masse_comparer", raison: "Réinvestissement du CM1 : « Les masses » y sont un chapitre." },
  { micro: "masse_convertir", raison: "Réinvestissement du CM1, comme ci-dessus." },
  { micro: "masse_estimer", raison: "Réinvestissement du CM1, comme ci-dessus." },
  { micro: "masse_defi", raison: "Réinvestissement du CM1, comme ci-dessus." },
  {
    micro: "contenance_comparer",
    raison: "Réinvestissement du CM1 : « Les contenances » y sont un chapitre.",
  },
  { micro: "contenance_convertir", raison: "Réinvestissement du CM1, comme ci-dessus." },
  { micro: "contenance_estimer", raison: "Réinvestissement du CM1, comme ci-dessus." },
  { micro: "contenance_defi", raison: "Réinvestissement du CM1, comme ci-dessus." },
  {
    micro: "duree_convertir",
    raison:
      "Réinvestissement : la conversion n'est pas un objectif listé au CM2, mais le système sexagésimal (heure, minute, seconde) la rend indispensable à cm2-GM-durees-3.",
  },
  {
    micro: "perimetre_comprendre",
    raison:
      "Réinvestissement du CM1 : « savoir ce qu'est le périmètre d'une figure plane » y est un objectif. Le CM2 ne liste plus les périmètres.",
  },
  { micro: "perimetre_triangle", raison: "Réinvestissement du CM1, comme ci-dessus." },
  { micro: "perimetre_quadrilatere", raison: "Réinvestissement du CM1, comme ci-dessus." },
  { micro: "perimetre_polygone", raison: "Réinvestissement du CM1, comme ci-dessus." },
  {
    micro: "aire_triangle_rectangle",
    raison:
      "⚠️ ANTICIPATION : le CM2 ne demande que l'aire du CARRÉ et du RECTANGLE (cm2-GM-aires-5). Le triangle rectangle relève du collège — à trancher.",
  },
  {
    micro: "symetrie_axe",
    raison:
      "Réinvestissement du CM1 : « reconnaître si une figure possède un ou plusieurs axes de symétrie » y est un objectif ; le CM2 ne liste que la CONSTRUCTION du symétrique.",
  },
  {
    micro: "symetrie_propriete",
    raison:
      "Anticipation : les propriétés de la symétrie axiale sont un objectif de 6e. Au CM2, la construction se fait sur quadrillage.",
  },
  {
    micro: "probabilite_vocabulaire",
    raison:
      "Réinvestissement du CM1 : « impossible, possible, certain, probable, peu probable » y est un objectif. Le CM2 passe au dénombrement des issues.",
  },
  {
    micro: "probabilite_hasard",
    raison:
      "Réinvestissement du CM1 : « identifier des expériences aléatoires » y est un objectif propre.",
  },
];
