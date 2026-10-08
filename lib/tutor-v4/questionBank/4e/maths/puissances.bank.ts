// lib/tutor-v4/questionBank/4e/maths/puissances.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026. Le programme du cycle 4 (BOEN n° 31 du
// 30 juillet 2020, p. 130-131) porte trois puces que la 4e ne couvrait pas :
// « Puissance d'un nombre (exposants entiers, positifs ou négatifs) »,
// « Notation scientifique », et « Effectuer des calculs numériques simples
// impliquant des puissances ». Le mot « puissance » avait ZÉRO occurrence dans
// les vingt banques de la classe.
//
// ⛔ CALIBRAGE 4e, ET IL EST ÉCRIT DANS LE BO : « la mise en acte de produits et
// de quotients de puissances de même base résulte de l'application de la
// DÉFINITION plutôt que de celle d'une formule ». Donc AUCUN item n'énonce
// a^m × a^n = a^(m+n) : quand un produit de même base apparaît, l'explication
// réécrit le produit en entier. Les formules restent en 3e.
//
// ⭐ LES EXPOSANTS SONT EN UNICODE (10³, 10⁻³), PAS EN LaTeX — et c'est un
// CHOIX, pas une contrainte. Le coach rend bien le LaTeX : `MarkdownMath`
// (`components/MarkdownMath.tsx`) enveloppe le texte de la question, les choix
// et le retour, dans `TutorV4Client.tsx` comme dans `TutorSimpleView.tsx`.
// ⚠️ Vérifié le 28/08 après m'être trompé : une recherche de « katex » dans
// `app/tutor-v4/` et `lib/tutor-v4/components/` ne trouve rien, parce que le
// composant vit ailleurs et ne porte pas ce nom. Ne pas conclure d'une absence
// de résultat.
//
// POURQUOI L'UNICODE MALGRÉ TOUT, en trois raisons :
//   · il se rend PARTOUT — coach, fiche, PDF —, y compris aux deux endroits où
//     le LaTeX ne se rend PAS : les libellés à l'intérieur d'un canvas (tracés
//     en `<text>` SVG) et les diapos du mode classe (`ModeClasse.tsx` n'a aucun
//     rendu KaTeX, le code serait projeté en clair au tableau) ;
//   · `MarkdownMath` interprète AUSSI le markdown : un `*` ou un `_` au milieu
//     d'une phrase change le rendu en silence. Moins de balisage, moins de
//     surface d'accident ;
//   · dans le source TypeScript, le LaTeX exige `$\\frac{…}$` avec DEUX
//     antislashs — avec un seul, `\f` est l'échappement « saut de page » et
//     l'antislash disparaît à la compilation, sans erreur ni alerte du
//     typecheck. Un exposant Unicode n'a pas ce piège.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS
// PARTICULIÈRES — a⁰ = 1, a¹ = a, 10⁰ = 1, la définition du domaine de la
// mantisse — parce que ce sont des cas uniques, pas des familles.
//
// ⛔⛔ 30/09/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré : 4 à 25
// squelettes d'énoncé par micro, 7 à 17 répétitions sur une série de 20. Chaque
// gabarit compose désormais une TOURNURE (« Calcule », « Que vaut… ? »,
// « On pose A = … », « Complète… ») × une FORME d'expression (base chiffrée ou
// lettre, parenthèses, ordre des facteurs, somme, différence, quotient) × pour
// une partie des tirages une SITUATION courte (cadenas, cube, carrelage, unités
// de mesure, populations, distances, bactéries, tournoi…).
// ⚠️ L'instrument (scripts/mesurer-squelettes-coach.ts) remplace les chiffres
// ASCII par « # » mais PAS les exposants Unicode : « #³ » et « #⁴ » y comptent
// pour deux squelettes. La variété visée ici est celle des PHRASES, exposants
// neutralisés — c'est ce que l'élève reconnaît.
// La Réunion reste un contexte parmi d'autres (une coulée de lave, deux
// sommets), pas le décor.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ Un gabarit dont deux pièges coïncident sur certains tirages afficherait
// deux fois la même ligne. On écarte les doublons ET la bonne réponse, puis on
// coupe à trois : d'où la nécessité de fournir PLUS de quatre leurres.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** 12 → « ¹² », −3 → « ⁻³ ». Le coach n'ayant pas de KaTeX, l'exposant est un caractère. */
const CHIFFRES_HAUT = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"] as const;
function exposant(n: number): string {
  const signe = n < 0 ? "⁻" : "";
  return (
    signe +
    String(Math.abs(n))
      .split("")
      .map((c) => CHIFFRES_HAUT[Number(c)])
      .join("")
  );
}

// ⚠️ `toLocaleString("fr-FR")` sépare les milliers par une espace INSÉCABLE
// (U+00A0) ou une espace fine insécable (U+202F) selon l'environnement. Deux
// caractères invisibles, qui feraient échouer la comparaison entre un choix de
// QCM et sa réponse attendue sans qu'on voie pourquoi. On les ramène à l'espace
// ordinaire, et la regex les désigne par leur CODE — collés dans le source, ils
// seraient impossibles à relire.
function fr(n: number): string {
  if (Number.isInteger(n))
    return n.toLocaleString("fr-FR").replace(/[  ]/g, " ");
  return String(n).replace(".", ",");
}

/** 10⁻⁴ → « 0,0001 », sans notation exponentielle du moteur JS. */
function petitDecimal(k: number): string {
  return "0," + "0".repeat(k - 1) + "1";
}

const EXPLIQUE = (calcul: string, conclusion: string) =>
  "Définition : une puissance résume une multiplication répétée d’un même nombre : aⁿ, c’est a écrit n fois en facteur.\n\n" +
  "Méthode : on revient à la définition et on écrit le produit en entier — en 4e, on n’applique aucune formule sur les exposants.\n\n" +
  `Calcul : ${calcul}\n\n` +
  `Conclusion : ${conclusion}`;

/* ---------------------------------------------------------------------------
   Les TOURNURES partagées. Une lettre (« On pose A = … ») ou un prénom
   (« Dans son exercice, Inès… ») ne change pas la question — ce sont les
   phrases autour qui changent, et elles sont nombreuses.
--------------------------------------------------------------------------- */
const LETTRES = ["A", "B", "C", "D", "E", "F", "G", "K", "M", "N", "P", "R"] as const;
const VARIABLES = ["x", "a", "t", "n", "y", "b", "z"] as const;
const PRENOMS = [
  "Inès", "Lucas", "Maëlys", "Yanis", "Chloé", "Noah",
  "Léa", "Sacha", "Emma", "Rayan", "Jade", "Mathis",
] as const;

const puiss = (b: string | number, n: number) => `${b}${exposant(n)}`;
/** 10ᵏ, mais « 10 » tout court pour k = 1 : personne n'écrit 10¹ dans un calcul. */
const dix = (k: number) => (k === 1 ? "10" : `10${exposant(k)}`);
/** −64 avec le vrai signe moins, pour l'AFFICHAGE (la réponse attendue garde « -64 »). */
const rel = (n: number) => fr(n).replace("-", "−");
/** « de » devant un nom sans article, avec élision : « de bactéries », « d’abonnés ». */
const deNu = (n: string) => (/^[aeiouyéèêh]/i.test(n) ? "d’" + n : "de " + n);

/** Les façons de demander la VALEUR d'une expression `e`. */
function demandeValeur(e: string, qcm = false): string {
  const L = randomChoice(LETTRES);
  const p = randomChoice(PRENOMS);
  const communes = [
    `Calcule ${e}.`,
    `Donne la valeur de ${e}.`,
    `Que vaut ${e} ?`,
    `Combien vaut ${e} ?`,
    `Effectue ${e}.`,
    `Quelle est la valeur de ${e} ?`,
    `Détermine la valeur de ${e}.`,
    `Sans calculatrice, calcule ${e}.`,
    `On pose ${L} = ${e}. Calcule ${L}.`,
    `Soit ${L} = ${e}. Que vaut ${L} ?`,
    `Complète l’égalité : ${e} = …`,
    `Au tableau, le professeur écrit ${e}. Quel nombre cette écriture désigne-t-elle ?`,
    `Dans son exercice, ${p} doit calculer ${e}. Quel est le bon résultat ?`,
    `Écris ${e} sous la forme d’un seul nombre.`,
    `Trouve le nombre égal à ${e}.`,
    `Donne le résultat de ${e}.`,
    `Quel nombre obtient-on en calculant ${e} ?`,
    `Que donne le calcul de ${e} ?`,
    `Trouve la valeur exacte de ${e}.`,
    `Sans poser d’opération compliquée, calcule ${e}.`,
    `Réponds par un nombre : combien fait ${e} ?`,
    `${p} a oublié sa calculatrice. Aide-${p === "Inès" || p === "Maëlys" || p === "Chloé" || p === "Léa" || p === "Emma" || p === "Jade" ? "la" : "le"} à calculer ${e}.`,
    `Pour vérifier un exercice, calcule ${e}.`,
  ];
  const seulementQcm = [
    `Parmi les réponses proposées, laquelle est égale à ${e} ?`,
    `${e} est égal à :`,
    `Quel nombre est égal à ${e} ?`,
    `${p} hésite entre plusieurs résultats pour ${e}. Lequel est juste ?`,
  ];
  return randomChoice(qcm ? [...communes, ...seulementQcm] : communes);
}

/* ---------------------------------------------------------------------------
   SITUATIONS où une puissance apparaît d'elle-même : b écrit n fois en facteur.
--------------------------------------------------------------------------- */
function situationsPuissance(b: number, n: number): string[] {
  const p = puiss(b, n);
  const s: string[] = [
    `Un cadenas a ${n} molettes, chacune portant ${b} symboles. Le nombre de combinaisons possibles est ${p}. Combien y en a-t-il ?`,
    `Une chaîne de messages : chaque personne transfère le message à ${b} nouvelles personnes. À la ${n}e vague, ${p} personnes le reçoivent. Combien cela fait-il de personnes ?`,
    `Un questionnaire compte ${n} questions, avec ${b} réponses possibles pour chacune. On peut le remplir de ${p} façons. Combien de façons cela représente-t-il ?`,
    `Chez une plante, chaque tige se divise en ${b} nouvelles tiges. Après ${n} divisions, une tige en a donné ${p}. Combien de tiges cela fait-il ?`,
    `Un code secret s’écrit avec ${n} caractères choisis parmi ${b} symboles. Il existe ${p} codes. Combien y en a-t-il ?`,
    `Un jeu d’aventure propose ${b} choix à chaque étape. Après ${n} étapes, il existe ${p} parcours différents. Combien de parcours cela fait-il ?`,
    `Pour une mosaïque, on découpe un carreau en ${b} morceaux, puis chaque morceau en ${b}, et ainsi de suite : ${n} découpages en tout, soit ${p} morceaux. Combien de morceaux obtient-on ?`,
  ];
  if (n === 2)
    s.push(
      `Un carré a pour côté ${b} cm. Son aire est ${p} cm². Calcule cette aire.`,
      `Un potager carré mesure ${b} m de côté. Son aire, en m², vaut ${p}. Combien vaut-elle ?`,
      `Une terrasse est couverte de ${b} rangées de ${b} dalles, soit ${p} dalles. Combien y a-t-il de dalles ?`,
      `Une grille de mots croisés a ${b} lignes et ${b} colonnes, soit ${p} cases. Combien de cases compte-t-elle ?`,
      `Un verger est planté de ${b} rangées de ${b} arbres, soit ${p} arbres. Calcule ce nombre d’arbres.`
    );
  if (n === 3)
    s.push(
      `Un cube a des arêtes de ${b} cm. Son volume est ${p} cm³. Calcule ce volume.`,
      `Un carton contient ${b} couches de ${b} rangées de ${b} boîtes, soit ${p} boîtes. Combien de boîtes contient-il ?`,
      `Un aquarium cubique mesure ${b} dm de côté. Il contient ${p} litres d’eau. Combien de litres cela fait-il ?`,
      `Une cantine propose ${b} entrées, ${b} plats et ${b} desserts : on peut composer ${p} repas différents. Combien de repas cela fait-il ?`,
      `Un grand cube est formé de petits cubes, ${b} le long de chaque arête : il en compte ${p}. Combien de petits cubes cela fait-il ?`
    );
  if ([4, 6, 8].includes(b))
    s.push(
      `On lance ${n} fois un dé à ${b} faces. Il y a ${p} suites de résultats possibles. Combien cela fait-il ?`
    );
  return s;
}

/* ---------------------------------------------------------------------------
   PUISSANCES DE 10 dans la vie courante. `f` reçoit le nombre DÉJÀ écrit —
   « 10³ » quand on demande la valeur, « 1 000 » quand on demande la puissance.
--------------------------------------------------------------------------- */
const FAITS_DIX: { k: number; f: (n: string) => string }[] = [
  { k: 2, f: (n) => `Un mètre compte ${n} centimètres.` },
  { k: 2, f: (n) => `Un euro vaut ${n} centimes.` },
  { k: 2, f: (n) => `Un siècle dure ${n} ans.` },
  { k: 3, f: (n) => `Un kilomètre compte ${n} mètres.` },
  { k: 3, f: (n) => `Un kilogramme vaut ${n} grammes.` },
  { k: 3, f: (n) => `Un litre contient ${n} millilitres.` },
  { k: 3, f: (n) => `Un millénaire dure ${n} ans.` },
  { k: 4, f: (n) => `Un hectare mesure ${n} m².` },
  { k: 4, f: (n) => `Un mètre carré contient ${n} cm².` },
  { k: 5, f: (n) => `Une chevelure compte environ ${n} cheveux.` },
  { k: 5, f: (n) => `Un kilomètre compte ${n} centimètres.` },
  { k: 6, f: (n) => `Un kilomètre compte ${n} millimètres.` },
  { k: 6, f: (n) => `Un mètre cube contient ${n} cm³.` },
  { k: 6, f: (n) => `Un mégaoctet contient ${n} octets.` },
  { k: 7, f: (n) => `Dix kilomètres font ${n} millimètres.` },
  { k: 7, f: (n) => `Une très grande agglomération compte environ ${n} habitants.` },
  { k: 8, f: (n) => `Un kilomètre carré contient ${n} dm².` },
  { k: 8, f: (n) => `Un hectare contient ${n} cm².` },
  { k: 9, f: (n) => `Un milliard s’écrit ${n}.` },
  { k: 9, f: (n) => `Un gigaoctet contient ${n} octets.` },
  { k: 9, f: (n) => `Un kilomètre compte ${n} micromètres.` },
];

/** Petites unités : 10⁻ᵏ dans la vie courante (k de 1 à 6). */
const FAITS_DIX_NEGATIF: { k: number; f: (n: string) => string }[] = [
  { k: 1, f: (n) => `Un décilitre vaut ${n} litre.` },
  { k: 1, f: (n) => `Un décimètre vaut ${n} mètre.` },
  { k: 2, f: (n) => `Un centimètre vaut ${n} mètre.` },
  { k: 2, f: (n) => `Un centime vaut ${n} euro.` },
  { k: 2, f: (n) => `Un centilitre vaut ${n} litre.` },
  { k: 3, f: (n) => `Un millimètre vaut ${n} mètre.` },
  { k: 3, f: (n) => `Un milligramme vaut ${n} gramme.` },
  { k: 3, f: (n) => `Une milliseconde vaut ${n} seconde.` },
  { k: 4, f: (n) => `Une feuille de papier a une épaisseur d’environ ${n} mètre.` },
  { k: 4, f: (n) => `Une balance de laboratoire pèse au ${n} gramme près.` },
  { k: 5, f: (n) => `Un globule rouge mesure environ ${n} mètre de diamètre.` },
  { k: 5, f: (n) => `Un grain de pollen mesure environ ${n} mètre.` },
  { k: 6, f: (n) => `Un micromètre vaut ${n} mètre.` },
  { k: 6, f: (n) => `Un microgramme vaut ${n} gramme.` },
  { k: 6, f: (n) => `Une petite bactérie mesure environ ${n} mètre.` },
];

export const puissancesBank: TutorBankItemV4[] = [
  /* =========================================================================
     PUISSANCE_COMPRENDRE — l'écriture, et les deux valeurs particulières
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_comprendre_tpl_1_developper",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "L’exposant compte combien de fois la base apparaît en facteur.",
    tags: ["puissance", "ecriture", "template"],
    generate: () => {
      const litteral = Math.random() < 0.35;
      const nb = randomInt(2, 9);
      const base = litteral ? randomChoice(VARIABLES) : String(nb);
      const exp = randomInt(2, 6);
      const p = puiss(base, exp);
      const produit = Array(exp).fill(base).join(" × ");
      const L = randomChoice(LETTRES);
      const prenom = randomChoice(PRENOMS);
      const tournures = [
        `Écris ${p} sous forme de produit.`,
        `Écris ${p} comme une multiplication répétée.`,
        `Quel produit l’écriture ${p} résume-t-elle ?`,
        `Réécris ${p} sans exposant, sous forme d’un produit de facteurs égaux.`,
        `Que signifie ${p} ? Écris le produit correspondant.`,
        `Traduis la puissance ${p} en produit.`,
        `On pose ${L} = ${p}. Écris ${L} sous forme de produit.`,
        `Complète, sans calculer : ${p} = …`,
        `Sans rien calculer, écris ${p} en produit.`,
        `Au tableau, le professeur écrit ${p}. Quel produit cette écriture désigne-t-elle ?`,
        `${prenom} a lu ${p} dans son manuel. Écris le produit que cela représente.`,
        `Dans ${p}, repère la base et l’exposant, puis écris le produit correspondant.`,
      ];
      if (litteral)
        tournures.push(
          `Dans une formule, on trouve ${p}. Écris-le sous forme de produit.`,
          `Réécris l’expression ${p} en écrivant la lettre ${base} autant de fois qu’il le faut.`
        );
      else {
        if (exp === 2)
          tournures.push(
            `Un carré a pour côté ${base} cm ; son aire s’écrit ${p} cm². Écris ${p} sous forme de produit.`
          );
        if (exp === 3)
          tournures.push(
            `Le volume d’un cube d’arête ${base} cm s’écrit ${p} cm³. Écris ${p} sous forme de produit.`
          );
        tournures.push(
          `Un cadenas a ${exp} molettes portant chacune ${base} symboles : il existe ${p} combinaisons. Écris ${p} sous forme de produit.`
        );
      }
      // ⚠️ Un élève ne tape pas « × » au clavier. `contains_keyword` teste
      // les variantes avec `some()`, donc on accepte aussi « x » et « * ».
      // Avec la lettre x comme base, la variante « xxx » serait illisible : on
      // ne garde alors que « * » et « × » sans espace.
      const variantes = [
        produit,
        produit.replace(/ × /g, "×"),
        produit.replace(/ × /g, "*"),
        produit.replace(/ × /g, " * "),
      ];
      if (base !== "x")
        variantes.push(produit.replace(/ × /g, "x"), produit.replace(/ × /g, " x "));
      return {
        text: randomChoice(tournures),
        format: "short",
        expected: variantes,
        // ⛔ 30/09/2026 : `contains_keyword` acceptait CINQ facteurs pour 5⁴ (la réponse CONTIENT le produit attendu). Comparaison exacte, variantes d'écriture gardées.
        comparator: "exact_text",
        explanation: EXPLIQUE(
          `${p} = ${produit}.`,
          `${base} apparaît ${exp} fois en facteur.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_comprendre_tpl_2_condenser",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte combien de fois le nombre est écrit.",
    tags: ["puissance", "ecriture", "qcm", "template"],
    generate: () => {
      const litteral = Math.random() < 0.35;
      const nb = randomInt(2, 9);
      const base = litteral ? randomChoice(VARIABLES) : String(nb);
      const exp = randomInt(3, 6);
      const produit = Array(exp).fill(base).join(" × ");
      const correct = puiss(base, exp);
      const L = randomChoice(LETTRES);
      const prenom = randomChoice(PRENOMS);
      const tournures = [
        `Comment s’écrit ${produit} avec une puissance ?`,
        `Écris ${produit} sous la forme d’une puissance.`,
        `Quelle puissance est égale à ${produit} ?`,
        `Simplifie l’écriture de ${produit} à l’aide d’un exposant.`,
        `Quelle écriture condensée correspond à ${produit} ?`,
        `On pose ${L} = ${produit}. Écris ${L} avec un exposant.`,
        `${prenom} trouve l’écriture ${produit} trop longue. Comment l’écrire avec un exposant ?`,
        `Remplace ${produit} par une puissance.`,
        `Parmi ces écritures, laquelle est égale à ${produit} ?`,
        `Le produit ${produit} s’écrit plus court. Laquelle de ces écritures convient ?`,
        `Dans un calcul, on rencontre ${produit}. Quelle puissance faut-il écrire à la place ?`,
      ];
      if (!litteral && exp === 3)
        tournures.push(
          `Pour calculer le volume d’un cube d’arête ${base} cm, ${prenom} écrit ${produit}. Comment l’écrire avec une puissance ?`
        );
      if (litteral)
        tournures.push(
          `En calcul littéral, comment écrire ${produit} plus simplement ?`
        );
      const wrongs = litteral
        ? [
            // ⚠️ Le piège du calcul littéral : x × x × x n'est pas 3x.
            `${exp}${base}`,
            puiss(base, exp - 1),
            puiss(base, exp + 1),
            `${base} × ${exp}`,
            `${base} + ${exp}`,
          ]
        : [
            // ⚠️ Le piège central : confondre l'exposant et le produit base × exposant.
            puiss(exp, nb),
            puiss(base, exp - 1),
            puiss(base, exp + 1),
            `${nb * exp}`,
            `${base} × ${exp}`,
          ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: EXPLIQUE(
          `${base} est écrit ${exp} fois, donc ${produit} = ${correct}.` +
            (litteral ? ` ⚠️ ${exp}${base} voudrait dire ${Array(exp).fill(base).join(" + ")} : c’est une somme, pas un produit.` : ""),
          `La BASE est le nombre répété, l’EXPOSANT compte les facteurs.`
        ),
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE — donc figée. a⁰ = 1 ne se déduit d'aucun produit
    // écrit en entier : c'est une convention, et elle se retient.
    kind: "fixed",
    id: "4e_puissance_comprendre_fixed_exposant_zero",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 7⁰ ?",
    format: "qcm",
    choices: ["0", "1", "7", "70"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Un nombre non nul élevé à la puissance 0 donne toujours la même chose.",
    explanation:
      "Définition : pour tout nombre a non nul, a⁰ = 1. C’est une convention, choisie pour que les écritures restent cohérentes.\n\n" +
      "Méthode : on ne compte pas de facteurs ici — on applique la convention.\n\n" +
      "Calcul : 7⁰ = 1.\n\n" +
      "Conclusion : l’exposant 0 ne donne jamais 0 ; il donne 1.",
    tags: ["puissance", "ecriture", "valeur_particuliere", "qcm"],
  },
  {
    // ⭐ VALEUR PARTICULIÈRE — figée pour la même raison.
    kind: "fixed",
    id: "4e_puissance_comprendre_fixed_exposant_un",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 12¹ ?",
    format: "qcm",
    choices: ["1", "12", "24", "121"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Un seul facteur.",
    explanation:
      "Définition : l’exposant compte les facteurs. Avec l’exposant 1, il n’y a qu’un seul facteur.\n\n" +
      "Méthode : on écrit le produit, qui se réduit au nombre lui-même.\n\n" +
      "Calcul : 12¹ = 12.\n\n" +
      "Conclusion : a¹ = a, pour tout nombre a.",
    tags: ["puissance", "ecriture", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PUISSANCE_CALCULER — la valeur, et le piège du signe
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_calculer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris le produit en entier, puis calcule pas à pas.",
    tags: ["puissance", "calcul", "template"],
    generate: () => {
      const base = randomInt(2, 9);
      const exp = randomInt(2, 4);
      const valeur = base ** exp;
      const produit = Array(exp).fill(String(base)).join(" × ");
      const p = puiss(base, exp);
      const text =
        Math.random() < 0.45
          ? randomChoice(situationsPuissance(base, exp))
          : demandeValeur(p);
      return {
        text,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: EXPLIQUE(`${p} = ${produit} = ${fr(valeur)}.`, `${p} = ${fr(valeur)}.`),
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_calculer_tpl_2_piege_multiplication",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : l’exposant n’est pas un facteur.",
    tags: ["puissance", "calcul", "piege", "qcm", "template"],
    generate: () => {
      const base = randomInt(3, 9);
      const exp = randomInt(2, 3);
      const valeur = base ** exp;
      const p = puiss(base, exp);
      const text =
        Math.random() < 0.45
          ? randomChoice(situationsPuissance(base, exp))
          : demandeValeur(p, true);
      return {
        text,
        format: "qcm",
        choices: makeChoices(String(valeur), [
          // L'erreur la plus fréquente : base × exposant.
          String(base * exp),
          String(base + exp),
          String(base ** (exp + 1)),
          String(base ** (exp - 1)),
          String(valeur + base),
        ]),
        expected: [String(valeur)],
        comparator: "mcq_exact",
        explanation: EXPLIQUE(
          `${p} = ${Array(exp).fill(String(base)).join(" × ")} = ${valeur}. ` +
            `⚠️ ${base} × ${exp} = ${base * exp} est l’erreur à éviter : l’exposant COMPTE les facteurs, il n’en est pas un.`,
          `${p} = ${valeur}.`
        ),
      };
    },
  },
  {
    // ⭐ LE PIÈGE DU SIGNE, et c'est celui qui coûte le plus cher en 4e :
    // (−2)³ et −2³ ne sont pas la même écriture. Les parenthèses décident.
    kind: "template",
    id: "4e_puissance_calculer_tpl_3_signe",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si le signe moins est DANS la parenthèse ou devant elle.",
    tags: ["puissance", "calcul", "relatif", "signe", "qcm", "template"],
    generate: () => {
      const base = randomInt(2, 6);
      const exp = randomInt(2, 3);
      const avecParentheses = Math.random() < 0.5;
      const puissance = base ** exp;
      const signeNegatif = exp % 2 === 1;
      const correct = avecParentheses
        ? signeNegatif
          ? -puissance
          : puissance
        : -puissance;
      const ecriture = avecParentheses ? `(−${base})${exposant(exp)}` : `−${base}${exposant(exp)}`;
      const autre = avecParentheses ? `−${base}${exposant(exp)}` : `(−${base})${exposant(exp)}`;
      const prenom = randomChoice(PRENOMS);
      const tournures = [
        demandeValeur(ecriture, true),
        demandeValeur(ecriture, true),
        `Attention aux parenthèses : que vaut ${ecriture} ?`,
        `${prenom} confond ${ecriture} et ${autre}. Quelle est la valeur de ${ecriture} ?`,
        `On compare ${ecriture} et ${autre}. Quelle est la valeur de la première écriture ?`,
        `Calcule ${ecriture} en faisant attention au signe.`,
      ];
      const produit = Array(exp).fill(`(−${base})`).join(" × ");
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(rel(correct), [
          rel(-correct),
          rel(puissance + base),
          rel(-(puissance + base)),
          rel(base * exp),
          rel(-(base * exp)),
        ]),
        expected: [rel(correct)],
        comparator: "mcq_exact",
        explanation: avecParentheses
          ? "Définition : les parenthèses enferment le signe, donc c’est (−" +
            base +
            ") qui est répété en facteur.\n\n" +
            "Méthode : on écrit le produit en entier et on compte les signes moins.\n\n" +
            `Calcul : (−${base})${exposant(exp)} = ${produit} = ${rel(correct)}. ` +
            `Il y a ${exp} facteurs négatifs, donc le résultat est ${signeNegatif ? "négatif" : "positif"}.\n\n` +
            `Conclusion : un nombre négatif élevé à une puissance ${signeNegatif ? "impaire reste négatif" : "paire devient positif"}.`
          : "Définition : sans parenthèses, la puissance porte sur " +
            base +
            " seul, et le signe moins reste devant.\n\n" +
            "Méthode : on calcule d’abord la puissance, on applique le signe ensuite.\n\n" +
            `Calcul : −${base}${exposant(exp)} = −(${Array(exp).fill(String(base)).join(" × ")}) = ${rel(correct)}.\n\n` +
            `Conclusion : −${base}${exposant(exp)} et (−${base})${exposant(exp)} ne sont pas la même écriture.`,
      };
    },
  },

  /* =========================================================================
     PUISSANCE_EXPOSANT_NEGATIF — le BO l'exige : « positifs OU NÉGATIFS »
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_exposant_negatif_tpl_1_fraction",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_exposant_negatif",
    difficulty: 3,
    theme: "neutral",
    hint: "Un exposant négatif annonce un inverse.",
    tags: ["puissance", "exposant_negatif", "qcm", "template"],
    generate: () => {
      const base = randomInt(2, 6);
      const exp = randomInt(2, 4);
      const valeur = base ** exp;
      const p = puiss(base, -exp);
      const fraction = `1/${valeur}`;
      const L = randomChoice(LETTRES);
      const prenom = randomChoice(PRENOMS);
      const explication =
        "Définition : un exposant négatif ne rend pas le nombre négatif — il désigne l’INVERSE de la puissance.\n\n" +
        `Méthode : a⁻ⁿ se lit « un divisé par aⁿ ».\n\n` +
        `Calcul : ${p} = 1 ÷ ${puiss(base, exp)} = 1 ÷ ${valeur} = 1/${valeur}.\n\n` +
        `Conclusion : ${p} est un nombre POSITIF, plus petit que 1.`;

      // ⭐ SENS RETOUR, un tirage sur trois : la fraction est donnée, on cherche
      // la puissance. ⛔ Aucun leurre d'une AUTRE base : 4⁻² vaut aussi 1/16.
      if (Math.random() < 0.33) {
        const tournuresRetour = [
          `Écris ${fraction} comme une puissance de ${base}.`,
          `Quelle puissance de ${base} est égale à ${fraction} ?`,
          `${fraction} s’écrit, avec une puissance de ${base} :`,
          `On pose ${L} = ${fraction}. Écris ${L} comme une puissance de ${base}.`,
          `${prenom} veut écrire ${fraction} avec un exposant, en gardant la base ${base}. Quelle écriture convient ?`,
        ];
        return {
          text: randomChoice(tournuresRetour),
          format: "qcm",
          choices: makeChoices(p, [
            puiss(base, exp),
            `−${puiss(base, exp)}`,
            puiss(base, -(exp + 1)),
            puiss(base, -(exp - 1)),
            `(−${base})${exposant(exp)}`,
          ]),
          expected: [p],
          comparator: "mcq_exact",
          explanation: explication,
        };
      }

      const tournures = [
        `Écris ${p} sous forme de fraction.`,
        `Quelle fraction est égale à ${p} ?`,
        `${p} est égal à :`,
        `Donne l’écriture fractionnaire de ${p}.`,
        `Parmi ces nombres, lequel vaut ${p} ?`,
        `On pose ${L} = ${p}. Quelle fraction vaut ${L} ?`,
        `Écris ${p} sans exposant négatif, sous forme de fraction.`,
        `Complète : ${p} = …`,
        `${prenom} affirme que ${p} est un nombre négatif. Quelle est en réalité la valeur de ${p} ?`,
        `Chaque filtre d’une station d’épuration ne laisse passer qu’une particule sur ${base}. Après ${exp} filtres, la part qui passe est ${p}. Écris-la sous forme de fraction.`,
        `Une solution est diluée ${exp} fois : chaque dilution divise la concentration par ${base}. La concentration est alors multipliée par ${p}. Écris ce nombre sous forme de fraction.`,
        `Les longueurs d’une photo sont divisées par ${base}, ${exp} fois de suite : elles sont donc multipliées par ${p}. Écris ce nombre sous forme de fraction.`,
      ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(fraction, [
          `−1/${valeur}`,
          `−${valeur}`,
          `1/${base * exp}`,
          `${valeur}`,
          `1/${base ** (exp + 1)}`,
        ]),
        expected: [fraction],
        comparator: "mcq_exact",
        explanation: explication,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_exposant_negatif_tpl_2_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_exposant_negatif",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les chiffres après la virgule : l’exposant les donne.",
    tags: ["puissance", "exposant_negatif", "dix", "template"],
    generate: () => {
      const k = randomInt(1, 6);
      const p = `10${exposant(-k)}`;
      // Un tirage sur trois : un chiffre devant la puissance (3 × 10⁻²).
      const chiffre = Math.random() < 0.33 ? randomInt(2, 9) : 1;
      const decimal = "0," + "0".repeat(k - 1) + chiffre;
      const e = chiffre === 1 ? p : `${chiffre} × ${p}`;
      const L = randomChoice(LETTRES);
      const tournures = [
        `Écris ${e} sous forme décimale.`,
        `Quelle est l’écriture décimale de ${e} ?`,
        `Donne ${e} en écriture décimale.`,
        `Que vaut ${e} ? Réponds par un nombre décimal.`,
        `On pose ${L} = ${e}. Écris ${L} sous forme décimale.`,
        `Convertis ${e} en nombre décimal.`,
        `Complète avec un nombre décimal : ${e} = …`,
        `Sans calculatrice, écris ${e} avec une virgule.`,
      ];
      if (chiffre === 1) {
        tournures.push(
          `${p} = 1 ÷ 10${exposant(k)}. Quel nombre décimal est-ce ?`,
          `${p} est l’inverse de 10${exposant(k)}. Écris-le sous forme décimale.`
        );
        const faits = FAITS_DIX_NEGATIF.filter((x) => x.k === k);
        for (const fait of faits)
          tournures.push(
            `${fait.f(p)} Écris ce nombre sous forme décimale.`,
            `${fait.f(p)} Quelle est l’écriture décimale de ${p} ?`
          );
      }
      return {
        text: randomChoice(tournures),
        format: "short",
        // « 0.01 » se tape aussi : `number_equal` l'accepte sans variante écrite.
        expected: [decimal],
        // ⛔ 30/09/2026 : `contains_keyword` acceptait « 0,035 » pour 0,03 (la réponse CONTIENT l'attendu).
        comparator: "number_equal",
        explanation:
          "Définition : 10⁻ᵏ est l’inverse de 10ᵏ.\n\n" +
          "Méthode : on écrit l’inverse, puis on pose la virgule.\n\n" +
          `Calcul : 10${exposant(-k)} = 1 ÷ 10${exposant(k)} = 1 ÷ ${fr(10 ** k)} = ${petitDecimal(k)}` +
          (chiffre === 1 ? `.\n\n` : `, donc ${chiffre} × ${p} = ${chiffre} × ${petitDecimal(k)} = ${decimal}.\n\n`) +
          `Conclusion : l’exposant −${k} donne ${k} chiffre${k > 1 ? "s" : ""} après la virgule.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : l'exposant −1, c'est exactement l'inverse.
    kind: "fixed",
    id: "4e_puissance_exposant_negatif_fixed_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_exposant_negatif",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut 4⁻¹ ?",
    format: "qcm",
    choices: ["−4", "1/4", "−1/4", "0,4"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "L’exposant −1 désigne l’inverse.",
    explanation:
      "Définition : a⁻¹ est l’inverse de a, c’est-à-dire 1 ÷ a.\n\n" +
      "Méthode : on écrit l’inverse, rien de plus.\n\n" +
      "Calcul : 4⁻¹ = 1 ÷ 4 = 1/4 = 0,25.\n\n" +
      "Conclusion : l’exposant −1 donne l’inverse, jamais l’opposé. 4⁻¹ n’est pas −4.",
    tags: ["puissance", "exposant_negatif", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PUISSANCE_DIX — la charnière vers la notation scientifique
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_dix_tpl_1_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "L’exposant compte les zéros.",
    tags: ["puissance", "dix", "template"],
    generate: () => {
      const k = randomInt(2, 8);
      const p = `10${exposant(k)}`;
      const L = randomChoice(LETTRES);
      const tournures = [
        `Combien vaut ${p} ?`,
        `Écris ${p} en chiffres.`,
        `Quelle est l’écriture décimale de ${p} ?`,
        `Écris ${p} sans exposant.`,
        `Calcule ${p}.`,
        `Donne la valeur de ${p}.`,
        `On pose ${L} = ${p}. Écris ${L} en chiffres.`,
        `Complète : ${p} = …`,
        `Écris le nombre ${p} comme on l’écrit d’habitude.`,
        `Donne l’écriture décimale de ${p}.`,
        `Que vaut ${p} ?`,
        `Quel nombre entier s’écrit ${p} ?`,
        `Le professeur écrit ${p} au tableau. De quel nombre s’agit-il ?`,
        `Dans son cahier, ${randomChoice(PRENOMS)} a écrit ${p}. Quel nombre cela représente-t-il ?`,
        `Traduis ${p} en un nombre écrit avec des zéros.`,
      ];
      const faits = FAITS_DIX.filter((x) => x.k === k).flatMap((fait) => [
        `${fait.f(p)} Écris ce nombre en chiffres.`,
        `${fait.f(p)} Combien vaut ${p} ?`,
        `${fait.f(p)} Écris ${p} sans exposant.`,
        `${fait.f(p)} Quelle est l’écriture décimale de ce nombre ?`,
        `${fait.f(p)} Écris ${p} avec tous ses zéros.`,
      ]);
      return {
        text: randomChoice(Math.random() < 0.5 ? faits : tournures),
        format: "short",
        expected: [String(10 ** k), fr(10 ** k)],
        comparator: "number_equal",
        explanation:
          "Définition : 10ᵏ, c’est 10 écrit k fois en facteur.\n\n" +
          "Méthode : chaque facteur 10 rend le nombre dix fois plus grand : 10, 100, 1 000…\n\n" +
          `Calcul : ${p} = 1 suivi de ${k} zéros = ${fr(10 ** k)}.\n\n` +
          `Conclusion : l’exposant d’une puissance de 10 COMPTE LES ZÉROS.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_dix_tpl_2_ecrire",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les zéros : c’est l’exposant.",
    tags: ["puissance", "dix", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 9);
      const correct = `10${exposant(k)}`;
      const n = fr(10 ** k);
      const L = randomChoice(LETTRES);
      const prenom = randomChoice(PRENOMS);
      const tournures = [
        `Écris ${n} comme une puissance de 10.`,
        `Quelle puissance de 10 est égale à ${n} ?`,
        `${n} s’écrit, avec une puissance de 10 :`,
        `On pose ${L} = ${n}. Écris ${L} sous la forme 10ⁿ.`,
        `Remplace ${n} par une puissance de 10.`,
        `${prenom} compte les zéros de ${n}. Quelle puissance de 10 doit-on écrire ?`,
        `Quelle écriture avec un exposant correspond à ${n} ?`,
      ];
      for (const fait of FAITS_DIX.filter((x) => x.k === k))
        tournures.push(
          `${fait.f(n)} Écris ${n} comme une puissance de 10.`,
          `${fait.f(n)} Quelle puissance de 10 est égale à ce nombre ?`
        );
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(correct, [
          `10${exposant(k + 1)}`,
          `10${exposant(k - 1)}`,
          `10${exposant(-k)}`,
          `${k}${exposant(10)}`,
          `10 × ${k}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une puissance de 10 s’écrit 1 suivi d’autant de zéros que l’exposant.\n\n" +
          "Méthode : on compte les zéros du nombre.\n\n" +
          `Calcul : ${n} porte ${k} zéros, donc ${n} = 10${exposant(k)}.\n\n` +
          `Conclusion : ${n} = 10${exposant(k)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_dix_tpl_3_multiplier",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par 10ᵏ décale la virgule vers la droite.",
    tags: ["puissance", "dix", "decimal", "template"],
    generate: () => {
      const mantisse = randomChoice([2.5, 3.4, 7.2, 1.8, 6.1, 4.7, 9.3, 1.2, 5.6, 8.5]);
      const k = randomInt(2, 4);
      const resultat = Math.round(mantisse * 10 ** k * 10) / 10;
      const naturel = `${fr(mantisse)} × 10${exposant(k)}`;
      // L'ordre inversé (10ᵏ × 2,5) ne sert qu'aux calculs nus : en situation,
      // on écrit la grandeur comme on la lit.
      const situe = Math.random() < 0.5;
      const e = !situe && Math.random() < 0.3 ? `10${exposant(k)} × ${fr(mantisse)}` : naturel;
      // ⭐ SITUATIONS, chacune avec les exposants qui la gardent plausible.
      const toutes: { ks: number[]; f: (x: string) => string }[] = [
        { ks: [2, 3, 4], f: (x) => `Une commune compte ${x} habitants.` },
        { ks: [2, 3, 4], f: (x) => `Une usine remplit ${x} bouteilles par jour.` },
        { ks: [2, 3, 4], f: (x) => `Un site internet reçoit ${x} visites par semaine.` },
        { ks: [2, 3, 4], f: (x) => `Un réservoir contient ${x} litres d’eau.` },
        { ks: [2, 3, 4], f: (x) => `Une bibliothèque possède ${x} livres.` },
        { ks: [3, 4], f: (x) => `Une ruche abrite ${x} abeilles.` },
        { ks: [3, 4], f: (x) => `Une chanson a été écoutée ${x} fois.` },
        { ks: [2, 3], f: (x) => `Un randonneur parcourt ${x} mètres dans la matinée.` },
        { ks: [3], f: (x) => `Un avion vole à ${x} mètres d’altitude.` },
        { ks: [3, 4], f: (x) => `Un champ de blé produit ${x} kilogrammes de grain.` },
        { ks: [2, 3], f: (x) => `Un cycliste gravit un col sur ${x} mètres.` },
        { ks: [3, 4], f: (x) => `Un marathon a réuni ${x} coureurs.` },
        { ks: [2, 3], f: (x) => `Un jardin partagé récolte ${x} kilogrammes de légumes par an.` },
        { ks: [3, 4], f: (x) => `Un parc éolien fournit ${x} kilowattheures en une journée.` },
      ];
      const situations = toutes.filter((s) => s.ks.includes(k));
      const fins = [
        `Écris ce nombre sans puissance de 10.`,
        `Combien cela fait-il ?`,
        `Quel est ce nombre en écriture décimale ?`,
        `Calcule ${e}.`,
      ];
      const text = situe
        ? `${randomChoice(situations).f(e)} ${randomChoice(fins)}`
        : demandeValeur(e);
      return {
        text,
        format: "short",
        expected: [String(resultat), fr(resultat)],
        comparator: "number_equal",
        explanation:
          "Définition : multiplier par 10ᵏ, c’est multiplier k fois par 10.\n\n" +
          "Méthode : multiplier par 10 rend chaque chiffre dix fois plus grand : les unités deviennent des dizaines, les dixièmes des unités. La virgule se retrouve un rang plus à droite.\n\n" +
          `Calcul : ${fr(mantisse)} × 10${exposant(k)} = ${fr(mantisse)} multiplié ${k} fois par 10 = ${fr(resultat)}.\n\n` +
          `Conclusion : ${e} = ${fr(resultat)}.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : 10⁰, le pivot entre exposants positifs et négatifs.
    kind: "fixed",
    id: "4e_puissance_dix_fixed_zero",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 10⁰ ?",
    format: "qcm",
    choices: ["0", "1", "10", "100"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Aucun zéro à écrire.",
    explanation:
      "Définition : l’exposant d’une puissance de 10 compte les zéros. Avec l’exposant 0, il n’y en a aucun.\n\n" +
      "Méthode : on applique la convention a⁰ = 1.\n\n" +
      "Calcul : 10⁰ = 1.\n\n" +
      "Conclusion : 10⁰ = 1, et c’est le pivot entre les exposants positifs et négatifs.",
    tags: ["puissance", "dix", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PUISSANCE_NOTATION_SCIENTIFIQUE
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_notation_scientifique_tpl_1_grand",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_notation_scientifique",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul chiffre non nul avant la virgule.",
    tags: ["puissance", "scientifique", "qcm", "template"],
    generate: () => {
      // Trois chiffres significatifs, le dernier non nul (pas de « 2,50 »).
      const chiffres = [randomInt(1, 9), randomInt(0, 9), randomInt(1, 9)];
      const k = randomInt(3, 7);
      const mantisse = `${chiffres[0]},${chiffres[1]}${chiffres[2]}`;
      const valeurEntiere =
        (chiffres[0] * 100 + chiffres[1] * 10 + chiffres[2]) * 10 ** (k - 2);
      const N = fr(valeurEntiere);
      const correct = `${mantisse} × 10${exposant(k)}`;
      const L = randomChoice(LETTRES);
      const prenom = randomChoice(PRENOMS);
      // ⭐ SITUATIONS, chacune avec les exposants qui la gardent plausible.
      const situations: { ks: number[]; f: string }[] = [
        { ks: [3, 4, 5], f: `Une ville compte ${N} habitants.` },
        { ks: [6, 7], f: `Un pays compte ${N} habitants.` },
        { ks: [3, 4, 5], f: `Deux villes sont distantes de ${N} mètres.` },
        { ks: [7], f: `Le cœur d’un adulte bat environ ${N} fois en un an.` },
        { ks: [4, 5, 6], f: `Une usine fabrique ${N} pièces par an.` },
        { ks: [5, 6], f: `Un satellite tourne à ${N} mètres d’altitude.` },
        { ks: [3, 4, 5, 6, 7], f: `Une vidéo a été vue ${N} fois.` },
        { ks: [4, 5, 6], f: `Une forêt compte ${N} arbres.` },
        { ks: [3, 4, 5, 6, 7], f: `Un fichier pèse ${N} octets.` },
        { ks: [5, 6, 7], f: `Une sonde spatiale a parcouru ${N} kilomètres.` },
        { ks: [4, 5, 6], f: `Une fourmilière abrite ${N} fourmis.` },
        { ks: [5, 6, 7], f: `Une éruption du Piton de la Fournaise a rejeté ${N} m³ de lave.` },
        { ks: [5, 6, 7], f: `Une centrale solaire produit ${N} kilowattheures par an.` },
        { ks: [4, 5], f: `Un festival de musique a vendu ${N} billets.` },
        { ks: [3, 4, 5], f: `Un étang contient ${N} m³ d’eau.` },
      ].filter((s) => s.ks.includes(k));
      const fins = [
        `Écris ce nombre en notation scientifique.`,
        `Quelle est sa notation scientifique ?`,
        `Comment ce nombre s’écrit-il en notation scientifique ?`,
        `Choisis l’écriture scientifique de ce nombre.`,
      ];
      const nues = [
        `Écris ${N} en notation scientifique.`,
        `Quelle est la notation scientifique de ${N} ?`,
        `Parmi ces écritures, laquelle est la notation scientifique de ${N} ?`,
        `${N} s’écrit, en notation scientifique :`,
        `On pose ${L} = ${N}. Écris ${L} en notation scientifique.`,
        `Donne l’écriture scientifique de ${N}.`,
        `Aide ${prenom} à écrire ${N} en notation scientifique : quelle écriture choisir ?`,
      ];
      const text =
        Math.random() < 0.5
          ? `${randomChoice(situations).f} ${randomChoice(fins)}`
          : randomChoice(nues);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${chiffres[0]}${chiffres[1]},${chiffres[2]} × 10${exposant(k - 1)}`,
          `${mantisse} × 10${exposant(k + 1)}`,
          `${mantisse} × 10${exposant(k - 1)}`,
          `0,${chiffres[0]}${chiffres[1]}${chiffres[2]} × 10${exposant(k + 1)}`,
          `${mantisse} × 10${exposant(-k)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la notation scientifique s’écrit a × 10ⁿ, avec un seul chiffre NON NUL avant la virgule — autrement dit 1 ⩽ a < 10.\n\n" +
          "Méthode : on place la virgule après le premier chiffre, puis on compte de combien de rangs elle s’est déplacée.\n\n" +
          `Calcul : ${N} = ${mantisse} × 10${exposant(k)}.\n\n` +
          `Conclusion : ${chiffres[0]}${chiffres[1]},${chiffres[2]} × 10${exposant(k - 1)} vaut le même nombre, mais ce n’est PAS la notation scientifique : sa mantisse dépasse 10.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_notation_scientifique_tpl_2_petit",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_notation_scientifique",
    difficulty: 4,
    theme: "neutral",
    hint: "Un nombre plus petit que 1 donne un exposant négatif.",
    tags: ["puissance", "scientifique", "exposant_negatif", "qcm", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(1, 9);
      const k = randomInt(2, 5);
      const mantisse = `${a},${b}`;
      const decimal = "0," + "0".repeat(k - 1) + a + b;
      const correct = `${mantisse} × 10${exposant(-k)}`;
      const L = randomChoice(LETTRES);
      const prenom = randomChoice(PRENOMS);
      // ⭐ Petites grandeurs, chacune avec les exposants qui la gardent plausible.
      const situations: { ks: number[]; f: string }[] = [
        { ks: [4], f: `L’épaisseur d’une feuille de papier est d’environ ${decimal} m.` },
        { ks: [3, 4], f: `Un grain de sable mesure ${decimal} m.` },
        { ks: [4, 5], f: `Le diamètre d’un cheveu est d’environ ${decimal} m.` },
        { ks: [5], f: `Une goutte d’eau a un volume d’environ ${decimal} L.` },
        { ks: [5], f: `Un grain de riz pèse environ ${decimal} kg.` },
        { ks: [5], f: `Une goutte de pluie pèse environ ${decimal} kg.` },
        { ks: [3], f: `Une vis d’horlogerie mesure ${decimal} m.` },
        { ks: [3], f: `Une coccinelle mesure environ ${decimal} m.` },
        { ks: [3], f: `Un moustique pèse environ ${decimal} g.` },
        { ks: [5], f: `Un grain de pollen mesure environ ${decimal} m.` },
        { ks: [2], f: `Un timbre mesure ${decimal} m de large.` },
        { ks: [2], f: `Un orage a laissé une hauteur de pluie de ${decimal} m.` },
        { ks: [2, 3], f: `Un écrou de vélo mesure ${decimal} m de large.` },
        { ks: [4], f: `Un fil de pêche a un diamètre de ${decimal} m.` },
      ].filter((s) => s.ks.includes(k));
      const fins = [
        `Écris ce nombre en notation scientifique.`,
        `Quelle est sa notation scientifique ?`,
        `Comment ce nombre s’écrit-il en notation scientifique ?`,
        `Choisis l’écriture scientifique de ce nombre.`,
      ];
      const nues = [
        `Écris ${decimal} en notation scientifique.`,
        `Quelle est la notation scientifique de ${decimal} ?`,
        `${decimal} s’écrit, en notation scientifique :`,
        `On pose ${L} = ${decimal}. Écris ${L} en notation scientifique.`,
        `Donne l’écriture scientifique de ${decimal}.`,
        `${prenom} doit écrire ${decimal} en notation scientifique. Quelle écriture est la bonne ?`,
      ];
      const text =
        situations.length && Math.random() < 0.55
          ? `${randomChoice(situations).f} ${randomChoice(fins)}`
          : randomChoice(nues);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${mantisse} × 10${exposant(k)}`,
          `${mantisse} × 10${exposant(-(k + 1))}`,
          `${mantisse} × 10${exposant(-(k - 1))}`,
          `0,${a}${b} × 10${exposant(-(k - 1))}`,
          `−${mantisse} × 10${exposant(k)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : a × 10ⁿ avec 1 ⩽ a < 10. Pour un nombre plus petit que 1, l’exposant est négatif.\n\n" +
          "Méthode : on déplace la virgule jusqu’après le premier chiffre non nul, et on compte les rangs franchis.\n\n" +
          `Calcul : ${decimal} = ${mantisse} × 10${exposant(-k)}.\n\n` +
          "Conclusion : l’exposant négatif dit que le nombre est PLUS PETIT que 1 — il ne le rend pas négatif.",
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : la définition elle-même, le domaine de la mantisse.
    kind: "fixed",
    id: "4e_puissance_notation_scientifique_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_notation_scientifique",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces écritures, laquelle est une notation scientifique ?",
    format: "qcm",
    choices: [
      "12,5 × 10³",
      "1,25 × 10⁴",
      "0,125 × 10⁵",
      "125 × 10²",
    ],
    expected: ["1,25 × 10⁴"],
    comparator: "mcq_exact",
    hint: "Un seul chiffre non nul avant la virgule.",
    explanation:
      "Définition : une notation scientifique s’écrit a × 10ⁿ avec 1 ⩽ a < 10.\n\n" +
      "Méthode : on regarde uniquement le nombre placé devant le × .\n\n" +
      "Calcul : 12,5 et 125 sont trop grands, 0,125 est trop petit. Seul 1,25 est compris entre 1 et 10.\n\n" +
      "Conclusion : les quatre écritures désignent le même nombre, 12 500 — une seule est scientifique.",
    tags: ["puissance", "scientifique", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PUISSANCE_COMPARER — puce « comparer, ranger … ou scientifique »
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_comparer_tpl_1_exposants",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "En notation scientifique, on compare d’abord les exposants.",
    tags: ["puissance", "scientifique", "comparer", "qcm", "template"],
    generate: () => {
      const a = randomChoice([1.2, 2.5, 3.7, 4.1, 6.8, 8.4, 9.6]);
      const b = randomChoice([1.1, 2.9, 3.3, 5.2, 7.5, 8.8, 9.1]);
      const na = randomInt(2, 6);
      const nb = na + randomChoice([1, 2, 3]);
      const grand = `${fr(b)} × 10${exposant(nb)}`;
      const petit = `${fr(a)} × 10${exposant(na)}`;
      const q = poserComparaison(grand, petit);
      return {
        text: q.text,
        format: "qcm",
        choices: shuffle([grand, petit]),
        expected: [q.attendu],
        comparator: "mcq_exact",
        explanation:
          "Définition : en notation scientifique, la mantisse est toujours entre 1 et 10.\n\n" +
          "Méthode : c’est donc l’EXPOSANT qui décide en premier ; on ne compare les mantisses que si les exposants sont égaux.\n\n" +
          `Calcul : ${nb} > ${na}, donc ${grand} > ${petit}.\n\n` +
          `Conclusion : la réponse est ${q.attendu}.` +
          (a > b
            ? ` Une mantisse plus grande ne suffit pas — ${fr(a)} dépasse ${fr(b)}, et pourtant ${petit} est le plus petit.`
            : ""),
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_comparer_tpl_2_mantisses",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand les exposants sont les mêmes, tout se joue devant le × .",
    tags: ["puissance", "scientifique", "comparer", "qcm", "template"],
    generate: () => {
      const petitM = randomChoice([1.4, 2.2, 3.6, 4.9, 5.1, 6.3]);
      const grandM = Math.round((petitM + randomChoice([0.5, 1.2, 2.3, 3.1])) * 10) / 10;
      const n = randomInt(2, 7);
      const grand = `${fr(grandM)} × 10${exposant(n)}`;
      const petit = `${fr(petitM)} × 10${exposant(n)}`;
      const q = poserComparaison(grand, petit);
      return {
        text: q.text,
        format: "qcm",
        choices: shuffle([grand, petit]),
        expected: [q.attendu],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux nombres écrits avec le MÊME exposant se comparent par leur mantisse.\n\n" +
          "Méthode : les puissances de 10 étant identiques, elles ne départagent rien.\n\n" +
          `Calcul : les deux portent 10${exposant(n)} ; il reste à comparer ${fr(petitM)} et ${fr(grandM)}, et ${fr(petitM)} < ${fr(grandM)}.\n\n` +
          `Conclusion : ${grand} > ${petit}, donc la réponse est ${q.attendu}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_comparer_tpl_3_ranger",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Range d’abord par exposant, puis par mantisse.",
    tags: ["puissance", "scientifique", "ranger", "qcm", "template"],
    generate: () => {
      // Deux nombres partagent un exposant, le troisième a un exposant différent
      // (plus grand ou plus petit) : il faut regarder les deux critères.
      const n = randomInt(3, 6);
      const m1 = randomChoice([1.5, 2.4, 3.8]);
      const m2 = randomChoice([4.2, 5.6, 6.9]);
      const n3 = n + randomChoice([-2, -1, 1, 2]);
      const m3 = randomChoice([1.5, 2.4, 3.8, 4.2, 5.6, 6.9, 7.3, 8.1]);
      const nombres = [
        { v: m1 * 10 ** n, s: `${fr(m1)} × 10${exposant(n)}` },
        { v: m2 * 10 ** n, s: `${fr(m2)} × 10${exposant(n)}` },
        { v: m3 * 10 ** n3, s: `${fr(m3)} × 10${exposant(n3)}` },
      ];
      const croissant = Math.random() < 0.6;
      const tries = [...nombres].sort((x, y) => (croissant ? x.v - y.v : y.v - x.v));
      const sep = croissant ? " < " : " > ";
      const correct = tries.map((x) => x.s).join(sep);
      const [A, B, C] = shuffle(nombres).map((x) => x.s);
      const perms = [
        [A, B, C], [A, C, B], [B, A, C], [B, C, A], [C, A, B], [C, B, A],
      ].map((p) => p.join(sep));
      const liste = `${A} ; ${B} ; ${C}`;
      const ordre = croissant ? "croissant" : "décroissant";
      const dePetit = croissant ? "du plus petit au plus grand" : "du plus grand au plus petit";
      const contextes = [
        `Trois étoiles sont situées à ${liste} kilomètres de la Terre. Range ces distances ${dePetit}.`,
        `Trois vidéos ont été vues ${liste} fois. Range ces nombres de vues ${dePetit}.`,
        `Trois fichiers pèsent ${liste} octets. Range ces tailles ${dePetit}.`,
        `Trois lacs contiennent ${liste} m³ d’eau. Range ces volumes ${dePetit}.`,
        `Trois sondes ont parcouru ${liste} kilomètres. Range ces distances ${dePetit}.`,
        `Trois pays comptent ${liste} habitants. Range ces populations ${dePetit}.`,
        `Trois forêts comptent ${liste} arbres. Range ces nombres ${dePetit}.`,
      ];
      const nues = [
        `Range dans l’ordre ${ordre} : ${liste}.`,
        `Classe ces nombres dans l’ordre ${ordre} : ${liste}.`,
        `Quel est le bon rangement ${dePetit} de ${liste} ?`,
        `Ordonne ${dePetit} les nombres ${liste}.`,
      ];
      return {
        text: randomChoice(Math.random() < 0.5 ? contextes : nues),
        format: "qcm",
        choices: makeChoices(correct, perms),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : ranger, c’est comparer deux à deux.\n\n" +
          "Méthode : l’exposant décide d’abord ; à exposant égal, on compare les mantisses.\n\n" +
          `Calcul : on regarde les puissances 10${exposant(n)} et 10${exposant(n3)}, puis, pour les deux nombres en 10${exposant(n)}, ${fr(m1)} < ${fr(m2)}.\n\n` +
          `Conclusion : ${correct}.`,
      };
    },
  },

  /* =========================================================================
     PUISSANCE_CALCUL — ⛔ par la DÉFINITION, jamais par une formule
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_calcul_tpl_1_produit_dix",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris chaque puissance en clair, puis calcule.",
    tags: ["puissance", "calcul", "dix", "template"],
    generate: () => {
      const forme = randomChoice(["produit", "produit", "trois", "fois_dix", "quotient"] as const);
      let e: string;
      let valeur: number;
      let calcul: string;
      let situations: string[] = [];
      if (forme === "produit") {
        const p = randomInt(2, 4);
        const q = randomInt(2, 4);
        e = `10${exposant(p)} × 10${exposant(q)}`;
        valeur = 10 ** (p + q);
        calcul = `${e} = ${fr(10 ** p)} × ${fr(10 ** q)} = ${fr(valeur)}. Le résultat porte ${p} + ${q} = ${p + q} zéros.`;
        const P = `10${exposant(p)}`;
        const Q = `10${exposant(q)}`;
        situations = [
          `Un entrepôt contient ${P} cartons de ${Q} boîtes chacun. Combien de boîtes cela fait-il ? (Calcule ${e}.)`,
          `Un serveur stocke ${P} dossiers de ${Q} fichiers chacun. Calcule le nombre total de fichiers, ${e}.`,
          `Une imprimerie tire ${P} exemplaires d’un livre de ${Q} pages. Combien de pages imprime-t-elle en tout ?`,
          `Une plantation compte ${P} rangées de ${Q} plants. Combien de plants y a-t-il ?`,
          `Un stade vend ${P} billets à ${Q} centimes l’un. Combien de centimes encaisse-t-il ?`,
        ];
      } else if (forme === "trois") {
        const p = randomInt(1, 3);
        const q = randomInt(1, 2);
        const r = randomInt(1, 3);
        e = `${dix(p)} × ${dix(q)} × ${dix(r)}`;
        valeur = 10 ** (p + q + r);
        calcul = `${e} = ${fr(10 ** p)} × ${fr(10 ** q)} × ${fr(10 ** r)} = ${fr(valeur)}. Le résultat porte ${p} + ${q} + ${r} = ${p + q + r} zéros.`;
      } else if (forme === "fois_dix") {
        const p = randomInt(3, 7);
        e = Math.random() < 0.5 ? `10${exposant(p)} × 10` : `10 × 10${exposant(p)}`;
        valeur = 10 ** (p + 1);
        calcul = `${e} = ${fr(10 ** p)} × 10 = ${fr(valeur)}. Il y a ${p} + 1 = ${p + 1} facteurs 10 : 1 suivi de ${p + 1} zéros.`;
      } else {
        const q = randomInt(1, 3);
        const p = q + randomInt(2, 4);
        e = `10${exposant(p)} ÷ ${dix(q)}`;
        valeur = 10 ** (p - q);
        calcul = `${e} = ${fr(10 ** p)} ÷ ${fr(10 ** q)} = ${fr(valeur)}. En effet ${fr(10 ** q)} × ${fr(valeur)} = ${fr(10 ** p)} : il reste ${p} − ${q} = ${p - q} facteurs 10.`;
        const P = `10${exposant(p)}`;
        const Q = dix(q);
        situations = [
          `On partage ${P} euros entre ${Q} personnes. Combien chacune reçoit-elle ? (Calcule ${e}.)`,
          `Un réservoir de ${P} litres est vidé avec des seaux de ${Q} litres. Combien de seaux faut-il ?`,
          `${P} graines sont réparties en sachets de ${Q} graines. Combien de sachets obtient-on ?`,
          `Un rouleau de ${P} millimètres est coupé en morceaux de ${Q} millimètres. Combien de morceaux obtient-on ?`,
        ];
      }
      const text =
        situations.length && Math.random() < 0.45
          ? randomChoice(situations)
          : demandeValeur(e);
      return {
        text,
        format: "short",
        expected: [String(valeur), fr(valeur)],
        comparator: "number_equal",
        explanation:
          "Définition : 10ᵖ est 10 écrit p fois en facteur, c’est-à-dire 1 suivi de p zéros.\n\n" +
          "Méthode : ⛔ en 4e, on n’applique AUCUNE formule sur les exposants — on écrit chaque puissance en entier.\n\n" +
          `Calcul : ${calcul}\n\n` +
          `Conclusion : ${e} = ${fr(valeur)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_calcul_tpl_2_mixte",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule chaque puissance séparément avant de multiplier.",
    tags: ["puissance", "calcul", "qcm", "template"],
    generate: () => {
      const base = randomInt(2, 5);
      const exp = randomInt(2, 3);
      const k = randomInt(1, 3);
      const valeur = base ** exp * 10 ** k;
      const B = puiss(base, exp);
      const D = dix(k);
      const e = Math.random() < 0.3 ? `${D} × ${B}` : `${B} × ${D}`;
      const situations = [
        `Un magasin reçoit ${B} colis contenant chacun ${D} articles. Combien d’articles reçoit-il ? (Calcule ${e}.)`,
        `Une ferme a ${B} rangées de ${D} pieds de salade. Combien de pieds cela fait-il ?`,
        `Un club achète ${B} lots de ${D} balles. Combien de balles a-t-il ?`,
        `Une chorale enregistre ${B} chansons, chacune écoutée ${D} fois. Combien d’écoutes cela fait-il ?`,
      ];
      if (exp === 3 && k === 3)
        situations.push(
          `Une cuve cubique a ${base} m d’arête : son volume est ${B} m³, et 1 m³ vaut ${D} litres. Combien de litres contient-elle ? (Calcule ${B} × ${D}.)`
        );
      const text =
        Math.random() < 0.4 ? randomChoice(situations) : demandeValeur(e, true);
      return {
        text,
        format: "qcm",
        choices: makeChoices(fr(valeur), [
          fr(base * exp * 10 ** k),
          fr(base ** exp * 10 ** (k + 1)),
          fr(base ** exp * 10 ** (k - 1)),
          fr(base ** (exp + 1) * 10 ** k),
          fr((base + 10) ** exp),
        ]),
        expected: [fr(valeur)],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque puissance se calcule à part, puis on multiplie les résultats.\n\n" +
          "Méthode : les bases sont différentes — rien ne se regroupe.\n\n" +
          `Calcul : ${B} = ${base ** exp} et ${D} = ${fr(10 ** k)}, donc ${base ** exp} × ${fr(10 ** k)} = ${fr(valeur)}.\n\n` +
          `Conclusion : ${e} = ${fr(valeur)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_calcul_tpl_3_somme",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Les puissances d’abord, puis les multiplications, puis les additions et soustractions.",
    tags: ["puissance", "calcul", "piege", "template"],
    generate: () => {
      const forme = randomChoice([
        "somme", "difference", "coef", "parenthese", "produit", "dix", "meme_base",
      ] as const);
      let e: string;
      let valeur: number;
      let calcul: string;
      let piege: string;
      let situations: string[] = [];
      if (forme === "somme" || forme === "difference") {
        const a = randomInt(2, 6);
        let b = randomInt(2, 6);
        if (b === a) b = a === 6 ? 2 : a + 1;
        const ea = randomInt(2, 3);
        const eb = randomInt(2, 3);
        const A = puiss(a, ea);
        const Bp = puiss(b, eb);
        if (forme === "somme") {
          e = `${A} + ${Bp}`;
          valeur = a ** ea + b ** eb;
          calcul = `${A} = ${a ** ea} et ${Bp} = ${b ** eb}, donc ${a ** ea} + ${b ** eb} = ${valeur}.`;
          if (ea === 2 && eb === 2)
            situations = [
              `Deux carrés ont pour côtés ${a} cm et ${b} cm. La somme de leurs aires, en cm², est ${e}. Calcule-la.`,
              `Deux dalles carrées mesurent ${a} dm et ${b} dm de côté. Leur surface totale, en dm², vaut ${e}. Combien vaut-elle ?`,
            ];
          if (ea === 3 && eb === 3)
            situations = [
              `Deux cubes ont pour arêtes ${a} cm et ${b} cm. Leur volume total, en cm³, est ${e}. Calcule-le.`,
              `Deux caisses cubiques mesurent ${a} dm et ${b} dm d’arête. Elles contiennent en tout ${e} litres. Combien de litres cela fait-il ?`,
            ];
        } else {
          e = `${A} − ${Bp}`;
          valeur = a ** ea - b ** eb;
          calcul = `${A} = ${a ** ea} et ${Bp} = ${b ** eb}, donc ${a ** ea} − ${b ** eb} = ${rel(valeur)}.`;
          if (ea === 2 && eb === 2 && a > b)
            situations = [
              `On découpe un carré de ${b} cm de côté dans un carré de ${a} cm de côté. L’aire restante, en cm², est ${e}. Calcule-la.`,
            ];
        }
        piege = `⚠️ On n’additionne jamais les exposants dans une somme ou une différence.`;
      } else if (forme === "coef") {
        const c = randomInt(2, 5);
        const b = randomInt(2, 4);
        const eb = randomInt(2, 4);
        const d = randomInt(1, 9);
        const plus = Math.random() < 0.5;
        const B = puiss(b, eb);
        e = plus ? `${c} × ${B} + ${d}` : `${d} + ${c} × ${B}`;
        valeur = c * b ** eb + d;
        calcul = `${B} = ${b ** eb}, puis ${c} × ${b ** eb} = ${c * b ** eb}, puis ${c * b ** eb} + ${d} = ${valeur}.`;
        piege = `⚠️ ${c} × ${B} n’est pas (${c} × ${b})${exposant(eb)} : la puissance porte sur ${b} seul.`;
      } else if (forme === "parenthese") {
        const a = randomInt(1, 4);
        const b = randomInt(1, 4);
        const ex = randomInt(2, 3);
        e = `(${a} + ${b})${exposant(ex)}`;
        valeur = (a + b) ** ex;
        calcul = `d’abord la parenthèse : ${a} + ${b} = ${a + b}, puis ${puiss(a + b, ex)} = ${Array(ex).fill(String(a + b)).join(" × ")} = ${valeur}.`;
        piege = `⚠️ (${a} + ${b})${exposant(ex)} n’est pas ${puiss(a, ex)} + ${puiss(b, ex)} = ${a ** ex + b ** ex}.`;
        if (ex === 2)
          situations = [
            `Un carré de ${a} m de côté est agrandi : on allonge chaque côté de ${b} m. Sa nouvelle aire, en m², est ${e}. Calcule-la.`,
          ];
        if (ex === 3)
          situations = [
            `Un cube de ${a} dm d’arête est agrandi : on allonge chaque arête de ${b} dm. Son nouveau volume, en dm³, est ${e}. Calcule-le.`,
          ];
      } else if (forme === "produit") {
        const a = randomInt(2, 3);
        const ea = randomInt(2, 3);
        const b = randomInt(2, 5);
        const eb = 2;
        const A = puiss(a, ea);
        const Bp = puiss(b, eb);
        e = `${A} × ${Bp}`;
        valeur = a ** ea * b ** eb;
        calcul = `${A} = ${a ** ea} et ${Bp} = ${b ** eb}, donc ${a ** ea} × ${b ** eb} = ${valeur}.`;
        piege = `⚠️ Les bases sont différentes : rien ne se regroupe, on calcule chaque puissance.`;
      } else if (forme === "dix") {
        const p = randomInt(3, 6);
        const q = randomInt(2, p - 1);
        const plus = Math.random() < 0.6;
        e = plus ? `10${exposant(p)} + 10${exposant(q)}` : `10${exposant(p)} − 10${exposant(q)}`;
        valeur = plus ? 10 ** p + 10 ** q : 10 ** p - 10 ** q;
        calcul = `10${exposant(p)} = ${fr(10 ** p)} et 10${exposant(q)} = ${fr(10 ** q)}, donc ${fr(10 ** p)} ${plus ? "+" : "−"} ${fr(10 ** q)} = ${fr(valeur)}.`;
        piege = `⚠️ Le résultat n’est pas ${dix(plus ? p + q : p - q)} : dans une ${plus ? "somme" : "différence"}, on ne touche pas aux exposants.`;
        situations = plus
          ? [
              `Un vendeur encaisse 10${exposant(p)} euros le matin et 10${exposant(q)} euros l’après-midi. Combien encaisse-t-il en tout ? (Calcule ${e}.)`,
            ]
          : [
              `Un réservoir contient 10${exposant(p)} litres ; on en retire 10${exposant(q)}. Combien de litres reste-t-il ? (Calcule ${e}.)`,
            ];
      } else {
        const a = randomInt(2, 4);
        const ea = 2;
        const eb = 3;
        e = Math.random() < 0.5 ? `${puiss(a, ea)} + ${puiss(a, eb)}` : `${puiss(a, eb)} + ${puiss(a, ea)}`;
        valeur = a ** ea + a ** eb;
        calcul = `${puiss(a, ea)} = ${a ** ea} et ${puiss(a, eb)} = ${a ** eb}, donc la somme vaut ${a ** ea + a ** eb}.`;
        piege = `⚠️ Même base, mais c’est une SOMME : le résultat n’est pas ${puiss(a, 5)} = ${a ** 5}.`;
      }
      const text =
        situations.length && Math.random() < 0.4
          ? randomChoice(situations)
          : demandeValeur(e);
      return {
        text,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation:
          "Définition : une puissance est une multiplication répétée — elle se calcule AVANT les multiplications, additions et soustractions qui l’entourent (sauf parenthèses).\n\n" +
          `Méthode : on calcule chaque puissance, puis on termine le calcul dans l’ordre des priorités. ${piege}\n\n` +
          `Calcul : ${calcul}\n\n` +
          `Conclusion : ${e} = ${rel(valeur)}.`,
      };
    },
  },

  /* =========================================================================
     PUISSANCE_DEFI — des situations, pas des calculs nus
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_defi_tpl_1_doublement",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Doubler n fois, c’est multiplier par 2 n fois.",
    tags: ["puissance", "defi", "probleme", "template"],
    generate: () => {
      const n = randomInt(4, 10);
      // ⭐ Chaque croissance : un départ plausible, une phrase, des questions.
      const CROISSANCES: {
        departs: number[];
        debut: (d: number) => string;
        questions: (n: number) => string[];
        nom: string;
      }[] = [
        {
          departs: [1, 2, 5, 10],
          debut: (d) => `Une colonie compte ${d} bactérie${d > 1 ? "s" : ""}, et leur nombre double chaque heure.`,
          questions: (n) => [`Combien de bactéries y a-t-il après ${n} heures ?`, `Au bout de ${n} heures, combien la colonie compte-t-elle de bactéries ?`],
          nom: "bactéries",
        },
        {
          departs: [1, 2, 3, 5],
          debut: (d) => `Dans une ville, ${d} personne${d > 1 ? "s" : ""} ${d > 1 ? "connaissent" : "connaît"} une rumeur ; chaque jour, le nombre de personnes au courant double.`,
          questions: (n) => [`Combien de personnes sont au courant après ${n} jours ?`, `Au bout de ${n} jours, combien de personnes connaissent la rumeur ?`],
          nom: "personnes",
        },
        {
          departs: [1, 2],
          debut: (d) => `Des nénuphars couvrent ${d} m² d’un étang, et la surface couverte double chaque semaine.`,
          questions: (n) => [`Quelle surface, en m², couvrent-ils après ${n} semaines ?`, `Combien de mètres carrés sont couverts au bout de ${n} semaines ?`],
          nom: "m²",
        },
        {
          departs: [5, 10, 20, 50],
          debut: (d) => `Une chaîne vidéo démarre avec ${d} abonnés, et ce nombre double chaque mois.`,
          questions: (n) => [`Combien d’abonnés compte-t-elle après ${n} mois ?`, `Au bout de ${n} mois, quel est le nombre d’abonnés ?`],
          nom: "abonnés",
        },
        {
          departs: [1, 2, 4],
          debut: (d) => `On observe ${d} cellule${d > 1 ? "s" : ""} au microscope ; à chaque division, le nombre de cellules double.`,
          questions: (n) => [`Combien de cellules obtient-on après ${n} divisions ?`, `Après ${n} divisions, combien de cellules y a-t-il ?`],
          nom: "cellules",
        },
        {
          departs: [2, 3, 5, 10],
          debut: (d) => `Un virus informatique a infecté ${d} ordinateurs, et le nombre d’ordinateurs infectés double chaque heure.`,
          questions: (n) => [`Combien d’ordinateurs sont infectés après ${n} heures ?`, `Au bout de ${n} heures, combien d’ordinateurs sont touchés ?`],
          nom: "ordinateurs",
        },
        {
          departs: [1, 2, 3],
          debut: (d) => `Sur la première case d’un échiquier, on pose ${d} grain${d > 1 ? "s" : ""} de riz, puis on double le nombre de grains à chaque case suivante.`,
          questions: (n) => [`Combien de grains y a-t-il sur la case n° ${n + 1}, après ${n} doublements ?`],
          nom: "grains",
        },
        {
          departs: [1, 2, 5],
          debut: (d) => `Dans un bassin, les algues couvrent ${d} m², et cette surface double chaque jour.`,
          questions: (n) => [`Quelle surface, en m², les algues couvrent-elles après ${n} jours ?`],
          nom: "m²",
        },
        {
          departs: [1, 3, 5],
          debut: (d) => `Un message est partagé par ${d} personne${d > 1 ? "s" : ""} le premier jour, et le nombre de partages double chaque jour.`,
          questions: (n) => [`Combien de partages compte-t-on le jour n° ${n + 1}, après ${n} doublements ?`],
          nom: "partages",
        },
      ];
      const c = randomChoice(CROISSANCES);
      const depart = randomChoice(c.departs);
      const total = depart * 2 ** n;
      const q = randomChoice([
        ...c.questions(n),
        `Calcule le nombre ${deNu(c.nom === "m²" ? "mètres carrés" : c.nom)} après ${n} doublements.`,
      ]);
      return {
        text: `${c.debut(depart)} ${q}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : doubler, c’est multiplier par 2. Doubler n fois, c’est multiplier par 2ⁿ.\n\n" +
          "Méthode : on part de la valeur initiale et on multiplie par la puissance de 2.\n\n" +
          `Calcul : ${n} doublements, donc ${depart} × 2${exposant(n)} = ${depart} × ${fr(2 ** n)} = ${fr(total)}.\n\n` +
          `Conclusion : on obtient ${fr(total)} ${c.nom}. ⚠️ Ce n’est pas ${depart} × 2 × ${n}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_defi_tpl_2_ordre_scientifique",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris la grandeur en notation scientifique : la puissance de 10 s’y lit.",
    tags: ["puissance", "defi", "scientifique", "qcm", "template"],
    generate: () => {
      // `clair` : la valeur écrite sans puissance, pour le sens « à toi d'écrire ».
      const cas = randomChoice([
        { objet: "la distance Terre-Lune", valeur: "3,8 × 10⁵ km", clair: "384 000 km", n: 5 },
        { objet: "le diamètre de la Terre", valeur: "1,3 × 10⁴ km", clair: "12 700 km", n: 4 },
        { objet: "la distance Terre-Soleil", valeur: "1,5 × 10⁸ km", clair: "150 000 000 km", n: 8 },
        { objet: "la longueur de La Réunion", valeur: "7,1 × 10¹ km", clair: "71 km", n: 1 },
        { objet: "la hauteur du Piton des Neiges", valeur: "3,1 × 10⁰ km", clair: "3,1 km", n: 0 },
        { objet: "la hauteur de l’Everest", valeur: "8,8 × 10³ m", clair: "8 849 m", n: 3 },
        { objet: "la population de la France", valeur: "6,8 × 10⁷ habitants", clair: "68 000 000 habitants", n: 7 },
        { objet: "la population mondiale", valeur: "8,1 × 10⁹ habitants", clair: "8 100 000 000 habitants", n: 9 },
        { objet: "la longueur de la Seine", valeur: "7,8 × 10² km", clair: "777 km", n: 2 },
        { objet: "le diamètre de la Lune", valeur: "3,5 × 10³ km", clair: "3 474 km", n: 3 },
        { objet: "la vitesse de la lumière", valeur: "3,0 × 10⁵ km/s", clair: "300 000 km/s", n: 5 },
        { objet: "le tour de la Terre", valeur: "4,0 × 10⁴ km", clair: "40 000 km", n: 4 },
        { objet: "la hauteur de la tour Eiffel", valeur: "3,3 × 10² m", clair: "330 m", n: 2 },
        { objet: "le nombre de secondes dans une journée", valeur: "8,6 × 10⁴ s", clair: "86 400 s", n: 4 },
        { objet: "la hauteur du mont Blanc", valeur: "4,8 × 10³ m", clair: "4 806 m", n: 3 },
        { objet: "le rayon du Soleil", valeur: "7,0 × 10⁵ km", clair: "696 000 km", n: 5 },
        { objet: "le nombre de battements du cœur en un jour", valeur: "1,0 × 10⁵ battements", clair: "100 000 battements", n: 5 },
        { objet: "la longueur de la Loire", valeur: "1,0 × 10³ km", clair: "1 006 km", n: 3 },
      ]);
      const correct = `10${exposant(cas.n)}`;
      const direct = Math.random() < 0.55;
      const tournures = direct
        ? [
            `On donne ${cas.objet} : ${cas.valeur}. Quelle puissance de 10 situe cette grandeur ?`,
            `En notation scientifique, ${cas.objet} s’écrit ${cas.valeur}. Quelle puissance de 10 y lit-on ?`,
            `${cas.valeur} : c’est ${cas.objet}. Quelle puissance de 10 donne la taille de ce nombre ?`,
            `Pour ${cas.objet}, un manuel donne ${cas.valeur}. Quelle puissance de 10 retient-on ?`,
          ]
        : [
            `${cas.objet.charAt(0).toUpperCase() + cas.objet.slice(1)} vaut environ ${cas.clair}. En notation scientifique, quelle puissance de 10 apparaît ?`,
            `On donne ${cas.objet} : environ ${cas.clair}. Écrite en notation scientifique, cette valeur contient quelle puissance de 10 ?`,
            `Environ ${cas.clair} : c’est ${cas.objet}. Quelle puissance de 10 figure dans sa notation scientifique ?`,
          ];
      return {
        text: randomChoice(tournures),
        format: "qcm",
        choices: makeChoices(correct, [
          `10${exposant(cas.n + 1)}`,
          `10${exposant(cas.n + 2)}`,
          `10${exposant(Math.max(0, cas.n - 1))}`,
          `10${exposant(-cas.n)}`,
          `10${exposant(cas.n + 3)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : en notation scientifique, la puissance de 10 situe la taille du nombre ; la mantisse, entre 1 et 10, ne fait qu’affiner.\n\n" +
          (direct
            ? "Méthode : on lit l’exposant, sans refaire le calcul.\n\n"
            : "Méthode : on écrit la valeur en notation scientifique, puis on lit l’exposant.\n\n") +
          `Calcul : ${cas.clair} ≈ ${cas.valeur}, qui porte 10${exposant(cas.n)}.\n\n` +
          `Conclusion : pour ${cas.objet}, la puissance de 10 est 10${exposant(cas.n)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_defi_tpl_3_pliage",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Chaque étape double le nombre : c’est une puissance de 2.",
    tags: ["puissance", "defi", "probleme", "qcm", "template"],
    generate: () => {
      const n = randomInt(5, 12);
      const total = 2 ** n;
      // ⭐ Situations où chaque étape DOUBLE : le résultat est 2ⁿ.
      const SITUATIONS: { debut: string; questions: string[]; etape: string; nom: string }[] = [
        {
          debut: `On plie une feuille de papier en deux, ${n} fois de suite.`,
          questions: ["Combien d’épaisseurs obtient-on ?", "Combien d’épaisseurs de papier la pile compte-t-elle alors ?"],
          etape: "pliage", nom: "épaisseurs",
        },
        {
          debut: `On coupe une feuille en deux, on superpose les morceaux, et on recommence : ${n} coupes en tout.`,
          questions: ["Combien de morceaux obtient-on ?", "Combien de morceaux la pile compte-t-elle à la fin ?"],
          etape: "coupe", nom: "morceaux",
        },
        {
          debut: `Chacun a 2 parents, 4 grands-parents, 8 arrière-grands-parents…`,
          questions: [`Combien d’ancêtres compte-t-on à la ${n}e génération avant soi ?`, `À la ${n}e génération en remontant, combien d’ancêtres a-t-on ?`],
          etape: "génération", nom: "ancêtres",
        },
        {
          debut: `Un tournoi de tennis à élimination directe se joue en ${n} tours : à chaque tour, la moitié des joueurs est éliminée, jusqu’au vainqueur.`,
          questions: ["Combien de joueurs y a-t-il au départ ?", "Combien de joueurs faut-il inscrire au premier tour ?"],
          etape: "tour", nom: "joueurs",
        },
        {
          debut: `On lance une pièce ${n} fois de suite et on note pile ou face à chaque lancer.`,
          questions: ["Combien de suites de résultats sont possibles ?", "Combien de suites différentes peut-on noter ?"],
          etape: "lancer", nom: "suites",
        },
        {
          debut: `Une rangée compte ${n} interrupteurs, chacun allumé ou éteint.`,
          questions: ["Combien de positions différentes existe-t-il ?", "De combien de façons peut-on régler la rangée ?"],
          etape: "interrupteur", nom: "positions",
        },
        {
          debut: `Un code binaire s’écrit avec ${n} chiffres, chacun égal à 0 ou à 1.`,
          questions: ["Combien de codes différents peut-on écrire ?", "Combien de codes existe-t-il ?"],
          etape: "chiffre", nom: "codes",
        },
        {
          debut: `Un œuf fécondé se divise en deux cellules, puis chaque cellule se divise à son tour, et ainsi de suite : ${n} étapes de division en tout.`,
          questions: ["Combien de cellules obtient-on ?", "Combien de cellules l’embryon compte-t-il alors ?"],
          etape: "division", nom: "cellules",
        },
        {
          debut: `Un questionnaire compte ${n} questions auxquelles on répond par vrai ou faux.`,
          questions: ["De combien de façons peut-on le remplir ?", "Combien de grilles de réponses différentes existe-t-il ?"],
          etape: "question", nom: "façons",
        },
        {
          debut: `Une chaîne d’entraide démarre : une personne prévient 2 personnes (1re vague), puis chaque personne prévenue prévient à son tour 2 nouvelles personnes.`,
          questions: [`Combien de personnes sont prévenues à la ${n}e vague ?`, `À la ${n}e vague, combien de nouvelles personnes reçoivent le message ?`],
          etape: "vague", nom: "personnes",
        },
      ];
      const s = randomChoice(SITUATIONS);
      return {
        text: `${s.debut} ${randomChoice(s.questions)}`,
        format: "qcm",
        choices: makeChoices(fr(total), [
          fr(2 * n),
          fr(n ** 2),
          fr(2 ** (n - 1)),
          fr(2 ** (n + 1)),
          fr(total + n),
        ]),
        expected: [fr(total)],
        comparator: "mcq_exact",
        explanation:
          `Définition : à chaque ${s.etape}, le nombre de ${s.nom} est multiplié par 2.\n\n` +
          `Méthode : ${n} étapes, c’est ${n} multiplications par 2, donc 2${exposant(n)}.\n\n` +
          `Calcul : 2${exposant(n)} = ${fr(total)}.\n\n` +
          `Conclusion : ${fr(total)} ${s.nom}. ⚠️ 2 × ${n} = ${2 * n} est l’erreur classique — chaque étape double, elle n’ajoute pas 2.`,
      };
    },
  },
];

/* ---------------------------------------------------------------------------
   Poser une comparaison de deux nombres écrits en notation scientifique :
   on demande le plus grand OU le plus petit, nu ou en situation.
--------------------------------------------------------------------------- */
function poserComparaison(grand: string, petit: string): { text: string; attendu: string } {
  const veutGrand = Math.random() < 0.6;
  const [x, y] = shuffle([grand, petit]);
  const attendu = veutGrand ? grand : petit;
  const CONTEXTES: { intro: string; g: string; p: string }[] = [
    { intro: `Deux étoiles sont situées à ${x} km et à ${y} km de la Terre.`, g: "Quelle est la distance de l’étoile la plus éloignée ?", p: "Quelle est la distance de l’étoile la plus proche ?" },
    { intro: `Deux vidéos ont été vues ${x} fois et ${y} fois.`, g: "Quel est le plus grand nombre de vues ?", p: "Quel est le plus petit nombre de vues ?" },
    { intro: `Deux pays comptent ${x} et ${y} habitants.`, g: "Quelle est la population la plus grande ?", p: "Quelle est la population la plus petite ?" },
    { intro: `Deux fichiers pèsent ${x} octets et ${y} octets.`, g: "Quelle est la taille du fichier le plus lourd ?", p: "Quelle est la taille du fichier le plus léger ?" },
    { intro: `Deux sondes spatiales ont parcouru ${x} km et ${y} km.`, g: "Quelle est la plus longue distance parcourue ?", p: "Quelle est la plus courte distance parcourue ?" },
    { intro: `Deux lacs contiennent ${x} m³ et ${y} m³ d’eau.`, g: "Quel est le plus grand volume ?", p: "Quel est le plus petit volume ?" },
    { intro: `Deux usines remplissent ${x} et ${y} bouteilles par an.`, g: "Quelle est la plus grande production ?", p: "Quelle est la plus petite production ?" },
    { intro: `Deux plages comptent environ ${x} et ${y} grains de sable par mètre carré.`, g: "Quel est le plus grand de ces deux nombres ?", p: "Quel est le plus petit de ces deux nombres ?" },
    { intro: `Deux chansons ont été écoutées ${x} et ${y} fois.`, g: "Quel est le plus grand nombre d’écoutes ?", p: "Quel est le plus petit nombre d’écoutes ?" },
    { intro: `Deux éruptions volcaniques ont rejeté ${x} m³ et ${y} m³ de lave.`, g: "Quel est le plus grand volume de lave ?", p: "Quel est le plus petit volume de lave ?" },
    { intro: `Deux forêts comptent ${x} et ${y} feuilles d’arbres.`, g: "Quel est le plus grand nombre de feuilles ?", p: "Quel est le plus petit nombre de feuilles ?" },
    { intro: `Deux budgets s’élèvent à ${x} € et ${y} €.`, g: "Quel est le budget le plus élevé ?", p: "Quel est le budget le plus faible ?" },
    { intro: `Deux galaxies sont à ${x} et ${y} années-lumière de nous.`, g: "Quelle est la plus grande de ces distances ?", p: "Quelle est la plus petite de ces distances ?" },
    { intro: `Deux cultures de bactéries comptent ${x} et ${y} cellules.`, g: "Quelle culture est la plus peuplée ? Donne son effectif.", p: "Quelle culture est la moins peuplée ? Donne son effectif." },
    { intro: `Deux fleuves déversent ${x} et ${y} litres d’eau par jour dans la mer.`, g: "Quel est le plus grand débit ?", p: "Quel est le plus petit débit ?" },
    { intro: `Deux sites internet ont reçu ${x} et ${y} visites cette année.`, g: "Quel site a reçu le plus de visites ? Donne ce nombre.", p: "Quel site a reçu le moins de visites ? Donne ce nombre." },
    { intro: `Deux réservoirs de barrage contiennent ${x} et ${y} litres.`, g: "Quelle est la plus grande contenance ?", p: "Quelle est la plus petite contenance ?" },
    { intro: `Deux pays ont produit ${x} et ${y} kilowattheures d’électricité solaire.`, g: "Quelle est la production la plus forte ?", p: "Quelle est la production la plus faible ?" },
  ];
  if (Math.random() < 0.5) {
    const c = randomChoice(CONTEXTES);
    return { text: `${c.intro} ${veutGrand ? c.g : c.p}`, attendu };
  }
  const mot = veutGrand ? "grand" : "petit";
  const comp = veutGrand ? "supérieur" : "inférieur";
  const nues = [
    `Lequel de ces deux nombres est le plus ${mot} : ${x} ou ${y} ?`,
    `Quel est le plus ${mot} nombre : ${x} ou ${y} ?`,
    `Compare ${x} et ${y} : lequel est le plus ${mot} ?`,
    `Entre ${x} et ${y}, lequel est ${comp} à l’autre ?`,
    `Sans calculatrice, trouve le plus ${mot} des nombres ${x} et ${y}.`,
    `On donne ${x} et ${y}. Quel est le plus ${mot} ?`,
    `${x} ou ${y} : lequel est ${comp} à l’autre ?`,
    `Voici deux nombres en notation scientifique : ${x} et ${y}. Choisis le plus ${mot}.`,
    `${randomChoice(PRENOMS)} doit repérer le plus ${mot} des deux nombres ${x} et ${y}. Lequel est-ce ?`,
    `Coche le nombre le plus ${mot} : ${x} ou ${y}.`,
    `Parmi ${x} et ${y}, quel nombre est le plus ${mot} ?`,
  ];
  return { text: randomChoice(nues), attendu };
}
