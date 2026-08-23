// ─── La demi-droite graduée (6e) ───────────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (23/08/2026). Deux objectifs du programme de 6e
// n'avaient AUCUNE micro, et c'est le même geste dans les deux :
//   · « Placer sur une demi-droite graduée un point dont l'abscisse est un
//     nombre décimal. Repérer un nombre décimal sur une demi-droite graduée. »
//     [6e-N-entiers-7, p. 2]
//   · « Placer une fraction sur une demi-droite graduée dans des cas simples.
//     Graduer un segment de longueur donnée. » [6e-N-fractions-3, p. 5]
//
// ⭐ UNE NOTION À PART, ET NON DEUX MICROS DISPERSÉES. La demi-droite graduée
// n'est pas un accessoire des décimaux ni un accessoire des fractions : c'est
// l'objet qui les réunit. Le programme du cycle 3 le demande au CM1, au CM2 et
// en 6e, pour les entiers PUIS les décimaux PUIS les fractions — le BO dit même
// à quoi elle sert : « le repérage de points sur une demi-droite graduée par des
// fractions contribue à donner aux fractions le statut de NOMBRES, qui
// s'intercalent entre les nombres entiers déjà connus ». C'est là que 3/4 cesse
// d'être « trois parts sur quatre » pour devenir un nombre qui a une place.
//
// ⚠️ ON NE PEUT PAS FAIRE GLISSER UN POINT dans le coach. « Placer » se pose
// donc à l'envers : la droite porte plusieurs points nommés, et l'élève désigne
// celui qui convient. Le raisonnement est le même — il faut situer le nombre
// avant de répondre — mais la main ne trace pas.
//
// ⚠️ `DroiteGradueeCanvas` ne sait pas dessiner de graduations INTERMÉDIAIRES :
// tous ses traits portent leur valeur, et au-delà de cinq ou six les étiquettes
// se chevauchent (son SVG est enfermé dans un `max-w-[320px]`). On gradue donc
// par pas larges — 0,2 · 0,25 · 0,5 — et on place les points ENTRE deux
// graduations. C'est l'exercice classique du manuel : lire une abscisse qui
// n'est pas écrite. Une demi-droite graduée en dixièmes demanderait d'apprendre
// des traits secondaires au composant.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function entierAleatoire(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function virgule(n: number | string) {
  return String(n).replace(".", ",");
}

function explDroite(calcul: string) {
  return (
    "Définition : sur une demi-droite graduée, chaque point est repéré par un seul nombre, son ABSCISSE — et chaque nombre a une seule place.\n\n" +
    "Méthode : on cherche d'abord ce que vaut UN intervalle entre deux graduations, puis on compte les intervalles depuis l'origine.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/**
 * La demi-droite graduée.
 *
 * ⚠️ `pas` est l'écart entre deux graduations ÉTIQUETÉES — il n'y en a pas
 * d'autres. Rester à cinq ou six graduations, sinon les valeurs se chevauchent.
 */
function droite(
  min: number,
  max: number,
  pas: number,
  points: { value: number; label?: string; color?: string }[] = []
) {
  return {
    kind: "number_line" as const,
    min,
    max,
    step: pas,
    points,
    display: {
      showTicks: true,
      showValues: true,
      showPoints: points.length > 0,
      showPointLabels: points.length > 0,
      showZero: true,
    },
    size: { width: 340, height: 130 },
  };
}

export const demiDroiteBank: TutorBankItemV4[] = [
  // =========================
  // ABSCISSE_LIRE — lire l'abscisse d'un point marqué
  // =========================
  {
    kind: "fixed",
    id: "abscisse_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'abscisse du point A ?",
    format: "short",
    expected: ["0,5", "0.5", "0,50", "0.50"],
    comparator: "number_equal",
    hint: "A est exactement au milieu de 0,4 et 0,6.",
    explanation: explDroite(
      "Les graduations vont de 0,2 en 0,2. A se trouve entre 0,4 et 0,6, et à égale distance des deux : son abscisse est le milieu de ces deux nombres, soit 0,5. On écrit A(0,5)."
    ),
    tags: ["demi_droite_graduee", "lire", "canvas", "short"],
    canvas: droite(0, 1, 0.2, [{ value: 0.5, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_lire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'abscisse du point B ?",
    format: "short",
    expected: ["3,7", "3.7", "3,70", "3.70"],
    comparator: "number_equal",
    hint: "Un intervalle vaut 0,2 : B est à mi-chemin entre 3,6 et 3,8.",
    explanation: explDroite(
      "Ici la demi-droite est montrée entre 3 et 4, avec des graduations de 0,2 en 0,2. B est entre 3,6 et 3,8, au milieu : son abscisse est 3,7. Une abscisse n'a pas besoin d'être écrite sur la droite pour exister."
    ),
    tags: ["demi_droite_graduee", "lire", "canvas", "short"],
    canvas: droite(3, 4, 0.2, [{ value: 3.7, label: "B" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_lire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'abscisse du point C ?",
    format: "qcm",
    choices: ["0,3", "3", "1,5", "0,03"],
    expected: ["0,3"],
    comparator: "mcq_exact",
    hint: "Ne compte pas les traits : regarde ce qui est écrit dessous.",
    explanation: explDroite(
      "C est entre les graduations 0,2 et 0,4, au milieu : son abscisse est 0,3. Le piège est de répondre « 3 » en comptant les graduations depuis l'origine au lieu de lire leur valeur — compter les traits donne un RANG, pas une abscisse."
    ),
    tags: ["demi_droite_graduee", "lire", "piege", "canvas", "qcm"],
    canvas: droite(0, 1, 0.2, [{ value: 0.3, label: "C" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_lire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'abscisse du point D ?",
    format: "short",
    expected: ["2,5", "2.5", "2,50", "2.50"],
    comparator: "number_equal",
    hint: "Les graduations sont ici des unités entières.",
    explanation: explDroite(
      "Les graduations valent 1 : 0, 1, 2, 3, 4, 5. D est entre 2 et 3, au milieu, donc son abscisse est 2,5. Entre deux entiers voisins il y a bien un nombre — c'est ce que la demi-droite montre, et c'est pourquoi elle sert à comprendre les décimaux."
    ),
    tags: ["demi_droite_graduee", "lire", "canvas", "short"],
    canvas: droite(0, 5, 1, [{ value: 2.5, label: "D" }]),
  },
  {
    kind: "template",
    id: "abscisse_lire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche les deux graduations qui encadrent le point, puis leur milieu.",
    tags: ["demi_droite_graduee", "lire", "template"],
    generate: () => {
      const debut = entierAleatoire(0, 6);
      // Le point tombe entre deux graduations, jamais dessus : sinon il n'y a
      // rien à lire, la valeur est déjà écrite sous le trait.
      const rang = entierAleatoire(0, 4);
      const abscisse = Number((debut + rang * 0.2 + 0.1).toFixed(1));
      const bas = Number((debut + rang * 0.2).toFixed(1));
      const haut = Number((bas + 0.2).toFixed(1));
      const nom = ["A", "B", "C", "D", "E"][entierAleatoire(0, 4)];

      return {
        text: `Quelle est l'abscisse du point ${nom} ?`,
        format: "short",
        expected: [virgule(abscisse), String(abscisse)],
        comparator: "number_equal",
        explanation: explDroite(
          `Les graduations vont de 0,2 en 0,2. ${nom} se trouve entre ${virgule(bas)} et ${virgule(haut)}, à égale distance des deux : son abscisse est ${virgule(abscisse)}. On écrit ${nom}(${virgule(abscisse)}).`
        ),
        canvas: droite(debut, debut + 1, 0.2, [{ value: abscisse, label: nom }]),
      };
    },
  },
  {
    kind: "template",
    id: "abscisse_lire_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "Parle de ce que vaut UN intervalle avant de parler du point.",
    tags: ["demi_droite_graduee", "lire", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique la méthode pour lire l'abscisse d'un point qui ne tombe pas sur une graduation.",
          mots: ["intervalle", "vaut", "encadrent", "milieu", "partage", "graduations"],
          r: "On regarde d'abord ce que vaut UN intervalle : on prend deux graduations écrites et on fait la différence — de 0,4 à 0,6 il y a 0,2. On repère ensuite les deux graduations qui encadrent le point. S'il est au milieu, son abscisse est le milieu des deux nombres ; sinon on partage l'intervalle en parts égales et on compte. Lire une abscisse commence toujours par lire l'échelle.",
        },
        {
          q: "Un élève dit que l'abscisse d'un point est 3 parce que c'est la troisième graduation après l'origine. Explique son erreur.",
          mots: ["rang", "valeur", "compte", "échelle", "echelle", "0,2", "graduation"],
          r: "Il confond le RANG de la graduation et sa VALEUR. La troisième graduation n'a pas pour abscisse 3 : tout dépend de ce que vaut un intervalle. Si les graduations vont de 0,2 en 0,2, la troisième est à 0,6. Compter les traits ne suffit jamais — il faut d'abord lire ce qu'un trait vaut.",
        },
        {
          q: "Pourquoi dit-on que chaque point d'une demi-droite graduée a UNE SEULE abscisse ?",
          mots: ["une place", "unique", "seul", "distance", "origine"],
          r: "Parce que l'abscisse mesure la distance du point à l'origine, avec l'unité choisie sur la droite. Un point est à une distance et une seule de l'origine : il ne peut donc porter qu'un nombre. Et inversement, chaque nombre a une place et une seule. C'est ce qui fait de la demi-droite graduée une image fidèle des nombres.",
        },
      ];
      const c = cas[entierAleatoire(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: explDroite(c.r),
      };
    },
  },

  // =========================
  // ABSCISSE_PLACER — désigner le point qui porte une abscisse donnée
  //
  // ⚠️ Le coach ne permet pas de faire glisser un point : « placer » se pose
  // donc à l'envers. L'élève doit tout de même situer le nombre avant de
  // répondre — c'est le même raisonnement, sans le tracé.
  // =========================
  {
    kind: "fixed",
    id: "abscisse_placer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel point a pour abscisse 0,5 ?",
    format: "qcm",
    choices: ["B", "A", "C", "aucun des trois"],
    expected: ["B"],
    comparator: "mcq_exact",
    hint: "0,5 est la moitié de 1 : cherche le milieu de la droite.",
    explanation: explDroite(
      "0,5 est la moitié de 1, donc le point cherché est à mi-chemin entre 0 et 1 : c'est B. A est à 0,1, tout près de l'origine, et C à 0,9, tout près de 1."
    ),
    tags: ["demi_droite_graduee", "placer", "canvas", "qcm"],
    canvas: droite(0, 1, 0.2, [
      { value: 0.1, label: "A" },
      { value: 0.5, label: "B" },
      { value: 0.9, label: "C" },
    ]),
  },
  {
    kind: "fixed",
    id: "abscisse_placer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 4,
    theme: "neutral",
    text: "Quel point a pour abscisse 2,3 ?",
    format: "qcm",
    choices: ["A", "B", "C", "aucun des trois"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "2,3 est entre 2,2 et 2,4 — attention, 2,03 n'est pas au même endroit.",
    explanation: explDroite(
      "2,3 se place entre les graduations 2,2 et 2,4, au milieu : c'est A. B est à 2,7 et C à 3,1. Le piège serait de chercher 2,3 tout près de 2, en le confondant avec 2,03 — mais 3 dixièmes, c'est déjà presque un tiers de l'unité."
    ),
    tags: ["demi_droite_graduee", "placer", "canvas", "qcm"],
    canvas: droite(2, 3.2, 0.2, [
      { value: 2.3, label: "A" },
      { value: 2.7, label: "B" },
      { value: 3.1, label: "C" },
    ]),
  },
  {
    kind: "fixed",
    id: "abscisse_placer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une demi-droite graduée où les graduations vont de 0,5 en 0,5, entre quelles graduations se place le nombre 4,2 ?",
    format: "qcm",
    choices: ["entre 4 et 4,5", "entre 4,5 et 5", "entre 3,5 et 4", "exactement sur 4,5"],
    expected: ["entre 4 et 4,5"],
    comparator: "mcq_exact",
    hint: "4,2 dépasse-t-il 4,5 ?",
    explanation: explDroite(
      "4,2 est plus grand que 4 et plus petit que 4,5, puisque 2 dixièmes font moins que 5 dixièmes. Il se place donc entre les graduations 4 et 4,5, un peu avant le milieu de cet intervalle."
    ),
    tags: ["demi_droite_graduee", "placer", "qcm"],
  },
  {
    kind: "template",
    id: "abscisse_placer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Situe le nombre entre deux graduations avant de regarder les points.",
    tags: ["demi_droite_graduee", "placer", "template"],
    generate: () => {
      const debut = entierAleatoire(0, 5);
      // Trois positions distinctes parmi cinq creux possibles, pour que les
      // étiquettes ne se chevauchent jamais.
      const creux = [0, 1, 2, 3, 4];
      const choisis: number[] = [];
      while (choisis.length < 3) {
        const c = creux[entierAleatoire(0, creux.length - 1)];
        if (!choisis.includes(c)) choisis.push(c);
      }
      choisis.sort((a, b) => a - b);

      const valeurs = choisis.map((c) => Number((debut + c * 0.2 + 0.1).toFixed(1)));
      const noms = ["A", "B", "C"];
      const cible = entierAleatoire(0, 2);
      const abscisse = valeurs[cible];
      const bas = Number((abscisse - 0.1).toFixed(1));
      const haut = Number((abscisse + 0.1).toFixed(1));

      return {
        text: `Quel point a pour abscisse ${virgule(abscisse)} ?`,
        format: "qcm",
        choices: ["A", "B", "C", "aucun des trois"],
        expected: [noms[cible]],
        comparator: "mcq_exact",
        explanation: explDroite(
          `${virgule(abscisse)} se place entre les graduations ${virgule(bas)} et ${virgule(haut)}, à égale distance des deux : c'est ${noms[cible]}. Les deux autres points ont pour abscisses ${valeurs
            .filter((_, i) => i !== cible)
            .map((v) => virgule(v))
            .join(" et ")}.`
        ),
        canvas: droite(
          debut,
          debut + 1,
          0.2,
          valeurs.map((v, i) => ({ value: v, label: noms[i] }))
        ),
      };
    },
  },
  {
    kind: "template",
    id: "abscisse_placer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis d'abord entre quels nombres tu cherches, ensuite où exactement.",
    tags: ["demi_droite_graduee", "placer", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique comment tu t'y prends pour placer 2,7 sur une demi-droite graduée de 0 à 5, graduée d'unité en unité.",
          mots: ["entre 2 et 3", "sept", "dixièmes", "dixiemes", "partage", "10"],
          r: "Je repère d'abord entre quels entiers il tombe : 2,7 est entre 2 et 3, puisque sa partie entière est 2. Je partage ensuite l'intervalle de 2 à 3 en dix parts égales, car il s'agit de dixièmes, et je compte sept de ces parts à partir de 2. Le point est donc nettement plus près de 3 que de 2.",
        },
        {
          q: "Deux élèves placent 0,4 et 0,04 sur la même demi-droite graduée de 0 à 1. Explique lequel est le plus proche de l'origine, et pourquoi.",
          mots: ["0,04", "centième", "centieme", "plus petit", "dix fois", "proche"],
          r: "0,04 est bien plus proche de l'origine. 0,4 vaut 4 dixièmes, presque la moitié de l'unité ; 0,04 ne vaut que 4 centièmes, soit dix fois moins. Sur une droite graduée de 0 à 1, 0,4 se voit très bien, alors que 0,04 est collé à l'origine — c'est un des intérêts de la droite : elle rend l'écart visible.",
        },
        {
          q: "Pourquoi une demi-droite graduée aide-t-elle à comprendre qu'entre 1,2 et 1,3 il y a d'autres nombres ?",
          mots: ["intervalle", "partager", "encore", "centième", "centieme", "infinité", "infinite"],
          r: "Parce qu'entre les deux graduations il reste un intervalle, et qu'un intervalle peut toujours se partager. En le coupant en dix, on fait apparaître 1,21 ; 1,22 ; … ; 1,29. En recoupant l'un d'eux, on en fait apparaître dix autres. La droite montre qu'il reste toujours de la place, alors que la seule écriture à virgule ne le dit pas.",
        },
      ];
      const c = cas[entierAleatoire(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: explDroite(c.r),
      };
    },
  },

  // =========================
  // ABSCISSE_FRACTION — repérer et placer une fraction
  //
  // ⭐ C'est ici que la fraction devient un NOMBRE : le BO dit que le repérage
  // sur la demi-droite « contribue à donner aux fractions le statut de nombres,
  // qui s'intercalent entre les nombres entiers déjà connus ».
  // =========================
  {
    kind: "fixed",
    id: "abscisse_fraction_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "L'unité est partagée en quatre parts égales. Quelle fraction a pour abscisse le point A ?",
    format: "short",
    expected: ["3/4", "0,75", "0.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte combien de quarts il y a de l'origine jusqu'à A.",
    explanation: explDroite(
      "De 0 à 1, l'unité est partagée en quatre parts égales : chaque graduation vaut un quart. A est sur la troisième, donc à trois quarts de l'origine : son abscisse est 3/4, qui s'écrit aussi 0,75."
    ),
    tags: ["demi_droite_graduee", "fraction", "canvas", "short"],
    canvas: droite(0, 1, 0.25, [{ value: 0.75, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_fraction_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 4,
    theme: "neutral",
    text: "L'unité est partagée en deux parts égales. Quelle fraction a pour abscisse le point B ?",
    format: "short",
    expected: ["3/2", "1,5", "1.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte les demis depuis l'origine, sans t'arrêter à 1.",
    explanation: explDroite(
      "Chaque graduation vaut un demi. De l'origine jusqu'à B, on compte trois demis : l'abscisse de B est 3/2. C'est une fraction plus grande que 1, et la droite le montre — elle ne s'arrête pas à l'unité. On peut aussi l'écrire 1 + 1/2, ou 1,5."
    ),
    tags: ["demi_droite_graduee", "fraction", "canvas", "short"],
    canvas: droite(0, 2, 0.5, [{ value: 1.5, label: "B" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_fraction_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 4,
    theme: "neutral",
    text: "Entre quels deux entiers consécutifs se place la fraction 7/4 sur une demi-droite graduée ?",
    format: "qcm",
    choices: ["entre 1 et 2", "entre 0 et 1", "entre 3 et 4", "entre 7 et 8"],
    expected: ["entre 1 et 2"],
    comparator: "mcq_exact",
    hint: "Combien de quarts font une unité entière ?",
    explanation: explDroite(
      "Quatre quarts font 1, et huit quarts font 2. Or 7/4 est entre 4/4 et 8/4 : il se place donc entre 1 et 2, tout près de 2. Le piège est de regarder le 7 et de chercher vers 7 — mais le numérateur compte des QUARTS, pas des unités."
    ),
    tags: ["demi_droite_graduee", "fraction", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "abscisse_fraction_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 3,
    theme: "neutral",
    text: "Quel point a pour abscisse 1/4 ?",
    format: "qcm",
    choices: ["A", "B", "C", "aucun des trois"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Un quart, c'est la première graduation après l'origine.",
    explanation: explDroite(
      "L'unité est partagée en quatre : la première graduation après 0 vaut 1/4, soit 0,25. C'est A. B est sur 2/4 = 0,5 et C sur 3/4 = 0,75."
    ),
    tags: ["demi_droite_graduee", "fraction", "canvas", "qcm"],
    canvas: droite(0, 1, 0.25, [
      { value: 0.25, label: "A" },
      { value: 0.5, label: "B" },
      { value: 0.75, label: "C" },
    ]),
  },
  {
    kind: "template",
    id: "abscisse_fraction_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les parts depuis l'origine : c'est le numérateur.",
    tags: ["demi_droite_graduee", "fraction", "template"],
    generate: () => {
      const denominateur = [2, 4, 5][entierAleatoire(0, 2)];
      const pas = 1 / denominateur;
      // Le numérateur dépasse parfois le dénominateur : le BO demande
      // explicitement les fractions supérieures à 1.
      const numerateur = entierAleatoire(1, 2 * denominateur - 1);
      const abscisse = Number((numerateur * pas).toFixed(4));
      const max = numerateur > denominateur ? 2 : 1;

      return {
        text: `L'unité est partagée en ${denominateur} parts égales. Quelle fraction a pour abscisse le point A ?`,
        format: "short",
        expected: [`${numerateur}/${denominateur}`, virgule(abscisse), String(abscisse)],
        comparator: "fraction_decimal_equivalent",
        explanation: explDroite(
          `Chaque graduation vaut 1/${denominateur}. De l'origine jusqu'à A, on en compte ${numerateur} : l'abscisse de A est ${numerateur}/${denominateur}${
            numerateur > denominateur
              ? `, une fraction plus grande que 1 puisque ${denominateur}/${denominateur} vaut déjà 1`
              : ""
          }. En écriture décimale, cela fait ${virgule(abscisse)}.`
        ),
        canvas: droite(0, max, pas, [{ value: abscisse, label: "A" }]),
      };
    },
  },
  {
    kind: "template",
    id: "abscisse_fraction_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 5,
    theme: "neutral",
    hint: "Une fraction n'est pas seulement une part de gâteau : c'est un nombre qui a une place.",
    tags: ["demi_droite_graduee", "fraction", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique comment placer 5/4 sur une demi-droite graduée, et pourquoi c'est possible même si 5 est plus grand que 4.",
          mots: ["quarts", "quatre", "1", "au-delà", "au dela", "cinq", "dépasse", "depasse"],
          r: "Je partage chaque unité en quatre parts égales, puis je compte cinq de ces quarts depuis l'origine. Les quatre premiers m'amènent exactement sur 1 ; le cinquième me fait dépasser l'unité. 5/4 se place donc un quart après 1. Rien n'oblige une fraction à rester en dessous de 1 : la droite continue, et les quarts aussi.",
        },
        {
          q: "En quoi placer des fractions sur une demi-droite graduée montre-t-il qu'une fraction est un NOMBRE, et pas seulement un morceau ?",
          mots: ["place", "nombre", "entre", "entiers", "intercale", "comparer"],
          r: "Un morceau de gâteau n'a pas de place sur une droite : il n'est ni avant ni après un autre. Une fraction, si — elle occupe un point précis, entre deux entiers, et on peut dire laquelle est la plus grande en regardant qui est le plus à droite. C'est ce qui la fait entrer dans la famille des nombres : elle s'intercale entre les entiers qu'on connaissait déjà.",
        },
        {
          q: "Explique pourquoi 2/4 et 1/2 sont au même endroit sur une demi-droite graduée.",
          mots: ["même point", "meme point", "égales", "egales", "moitié", "moitie", "partage"],
          r: "Prendre deux parts sur quatre ou une part sur deux revient à couvrir exactement la même longueur depuis l'origine : dans les deux cas on est à la moitié de l'unité. Les deux écritures désignent donc le MÊME point, donc le même nombre. La droite le rend évident, alors que les deux écritures n'ont aucun chiffre en commun.",
        },
      ];
      const c = cas[entierAleatoire(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: explDroite(c.r),
      };
    },
  },

  // =========================
  // ABSCISSE_GRADUER — graduer un segment de longueur donnée
  //
  // Objectif du BO écrit tel quel : « Graduer un segment de longueur donnée ».
  // Le geste est l'inverse des précédents : on ne lit plus une graduation, on la
  // FABRIQUE — ce qui oblige à calculer le pas.
  // =========================
  {
    kind: "fixed",
    id: "abscisse_graduer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 2,
    theme: "neutral",
    text: "Tu dois graduer un segment de 12 cm en quarts. Tous les combien de centimètres places-tu une graduation ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Partage la longueur totale par le nombre de parts.",
    explanation: explDroite(
      "Graduer en quarts, c'est partager le segment en 4 parts ÉGALES : 12 ÷ 4 = 3 cm. On place donc une graduation tous les 3 cm — à 3, 6 et 9 cm — ce qui fait trois traits à l'intérieur, plus les deux extrémités."
    ),
    tags: ["demi_droite_graduee", "graduer", "short"],
  },
  {
    kind: "fixed",
    id: "abscisse_graduer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 3,
    theme: "neutral",
    text: "Un segment de 10 cm est gradué en cinquièmes. À quelle distance de l'origine se trouve la graduation 3/5 ? (Réponds en cm.)",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Combien mesure un cinquième de 10 cm ?",
    explanation: explDroite(
      "Un cinquième de 10 cm vaut 10 ÷ 5 = 2 cm. La graduation 3/5 est la troisième : elle se trouve donc à 3 × 2 = 6 cm de l'origine. On vérifie que 5 × 2 = 10 cm, soit bien le segment entier."
    ),
    tags: ["demi_droite_graduee", "graduer", "short"],
  },
  {
    kind: "fixed",
    id: "abscisse_graduer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de traits faut-il tracer À L'INTÉRIEUR d'un segment pour le partager en 4 parts égales ?",
    format: "qcm",
    choices: ["3", "4", "5", "2"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Les deux extrémités sont déjà là : elles ne se tracent pas.",
    explanation: explDroite(
      "Pour obtenir 4 parts, il faut 3 coupures à l'intérieur : les deux extrémités du segment existent déjà. C'est le même comptage que les poteaux d'une clôture — il y a toujours une séparation de moins que de parts. Répondre 4 est l'erreur la plus fréquente."
    ),
    tags: ["demi_droite_graduee", "graduer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "abscisse_graduer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un pas = la longueur totale divisée par le nombre de parts.",
    tags: ["demi_droite_graduee", "graduer", "template"],
    generate: () => {
      const parts = [2, 3, 4, 5, 6][entierAleatoire(0, 4)];
      const pas = entierAleatoire(2, 6);
      const longueur = parts * pas;
      const rang = entierAleatoire(1, parts - 1);

      return {
        text: `Un segment de ${longueur} cm est gradué en ${parts} parts égales. À quelle distance de l'origine se trouve la graduation ${rang}/${parts} ? (Réponds en cm.)`,
        format: "short",
        expected: [String(rang * pas)],
        comparator: "number_equal",
        explanation: explDroite(
          `Une part vaut ${longueur} ÷ ${parts} = ${pas} cm. La graduation ${rang}/${parts} est la ${rang}e : elle se trouve à ${rang} × ${pas} = ${rang * pas} cm de l'origine. Vérification : ${parts} × ${pas} = ${longueur} cm, le segment entier.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "abscisse_graduer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique le calcul du pas, puis le comptage des traits.",
    tags: ["demi_droite_graduee", "graduer", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique comment graduer en tiers un segment de 15 cm, sans essayer au hasard.",
          mots: ["divise", "3", "5", "égales", "egales", "deux traits", "part"],
          r: "Je cherche d'abord ce que vaut UNE part : le segment fait 15 cm et je veux 3 parts égales, donc chaque part mesure 15 ÷ 3 = 5 cm. Je place ensuite une graduation à 5 cm et une autre à 10 cm — deux traits seulement, car les deux extrémités sont déjà là. Je vérifie que la dernière part va bien de 10 à 15 cm.",
        },
        {
          q: "Pourquoi faut-il UN trait de moins que le nombre de parts quand on gradue un segment ?",
          mots: ["extrémités", "extremites", "déjà", "deja", "séparation", "separation", "un de moins"],
          r: "Parce que les traits sont des séparations entre les parts, et non les parts elles-mêmes. Les deux bouts du segment existent déjà : ils ne sont pas à tracer. Pour 4 parts il n'y a que 3 endroits où couper, comme il y a un intervalle de moins que de poteaux dans une clôture. Compter les traits comme s'ils étaient les parts donne toujours un de trop.",
        },
        {
          q: "Un segment doit être gradué en quarts, mais sa longueur ne se divise pas en un nombre entier de centimètres. Explique ce qu'on fait.",
          mots: ["décimal", "decimal", "millimètre", "millimetre", "divise", "quand même", "quand meme"],
          r: "On divise quand même : le pas n'a aucune obligation d'être un nombre entier de centimètres. Un segment de 10 cm gradué en quarts donne des parts de 10 ÷ 4 = 2,5 cm, que la règle sait mesurer puisqu'elle porte les millimètres. C'est justement à ça que servent les nombres décimaux — mesurer quand les entiers ne suffisent plus.",
        },
      ];
      const c = cas[entierAleatoire(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: explDroite(c.r),
      };
    },
  },
];
