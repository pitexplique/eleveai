// lib/tutor-v4/questionBank/ce1/francais/copie-fluente.bank.ts
//
// La copie fluente du CE1, écrite à la main. Six micro-compétences.
//
// CE QU'ELLE REMPLACE : deux énoncés pour six micro-compétences — « Quel mot
// est écrit correctement ? », dont les pièges se fabriquaient en écrivant le
// mot À L'ENVERS (« maison » → « nosiam »), et « Quelle phrase est écrite avec
// une majuscule et un point ? », toujours la même, avec « canape » sans accent.
// Une anagramme ne trompe personne : un enfant qui copie ne renverse pas les
// lettres, il en SAUTE.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Copier sans erreur quatre à cinq phrases courtes à l'issue de la
//     période 1, cinq ou six lignes à partir de la période 3, une dizaine de
//     lignes en fin d'année » ;
//   — « Choisir sa stratégie de copie : lettre à lettre, syllabe, mot, groupe
//     de mots » ;
//   — « Se relire et corriger son orthographe après la copie » ;
//   — « Respecter la mise en page du modèle ».
//
// LE PIÈGE DE LA NOTION, et c'est celui que tous les enfants font : ON SE
// RELIT SUR SON PROPRE TEXTE, pas sur le modèle. On relit ce qu'on croit avoir
// écrit, et le mot sauté reste invisible. Se relire, c'est comparer les deux —
// mot à mot, le doigt sur le modèle.
//
// L'AUTRE PIÈGE : copier lettre à lettre est LENT et donne plus de fautes que
// copier par groupes de mots. Un bon copieur regarde moins souvent le modèle,
// pas plus souvent.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/* ── Les erreurs de copie ────────────────────────────────────────────────────
   ⚠️ Écrites à la main, et ce sont de VRAIES erreurs de copie : un mot sauté,
   une lettre oubliée, un accent perdu, une majuscule tombée, un point manquant.
   Le générateur commun renversait le mot — « maison » → « nosiam ». Personne
   n'écrit ça en copiant. */

type Copie = {
  readonly modele: string;
  readonly copie: string;
  readonly erreur: string;
};

const COPIES: readonly Copie[] = [
  { modele: "Le margouillat grimpe sur le mur.", copie: "Le margouillat grimpe sur mur.", erreur: "un mot a été sauté" },
  { modele: "Chaque matin, Léa ramasse des mangues.", copie: "Chaque matin Léa ramasse des mangues.", erreur: "la virgule a été oubliée" },
  { modele: "Papa prépare un cari le dimanche.", copie: "Papa prepare un cari le dimanche.", erreur: "un accent a été oublié" },
  { modele: "Les enfants jouent dans la cour.", copie: "les enfants jouent dans la cour.", erreur: "la majuscule du début a été oubliée" },
  { modele: "La pirogue glisse sur le lagon.", copie: "La pirogue glisse sur le lagon", erreur: "le point de la fin a été oublié" },
  { modele: "Le pêcheur range ses filets.", copie: "Le pêcheur range ses filet.", erreur: "une lettre a été oubliée à la fin d'un mot" },
  { modele: "Mamie raconte une histoire le soir.", copie: "Mamie raconte une histoire soir.", erreur: "un mot a été sauté" },
  { modele: "Les letchis sont mûrs en décembre.", copie: "Les letchis sont murs en décembre.", erreur: "un accent a été oublié" },
  { modele: "Tom range son cartable après l'école.", copie: "Tom range son cartable après l'ecole.", erreur: "un accent a été oublié" },
  { modele: "Une mangue mûre tombe dans l'herbe.", copie: "Une mangue mûre tombe dans herbe.", erreur: "un mot a été sauté" },
  { modele: "Le vent secoue les branches du manguier.", copie: "Le vent secoue les branche du manguier.", erreur: "une lettre a été oubliée à la fin d'un mot" },
  { modele: "Où est mon cahier bleu ?", copie: "Où est mon cahier bleu.", erreur: "le signe de la fin a été changé" },
  { modele: "Quel beau lagon !", copie: "Quel beau lagon.", erreur: "le signe de la fin a été changé" },
  { modele: "La maitresse écrit la date au tableau.", copie: "La maitresse écrit la date tableau.", erreur: "un mot a été sauté" },
  { modele: "Nous partons à la plage samedi.", copie: "Nous partons a la plage samedi.", erreur: "un accent a été oublié" },
  { modele: "Les oiseaux chantent dès le lever du jour.", copie: "Les oiseau chantent dès le lever du jour.", erreur: "une lettre a été oubliée à la fin d'un mot" },
  { modele: "Le chien de Léa aboie devant la porte.", copie: "Le chien de Léa aboie la porte.", erreur: "un mot a été sauté" },
  { modele: "Les cousins mangent sous le manguier.", copie: "Les cousins mangent le manguier.", erreur: "un mot a été sauté" },
  { modele: "La tortue remonte le sable de la plage.", copie: "La tortue remonte le sable la plage.", erreur: "un mot a été sauté" },
  { modele: "Nous escaladons le piton avant midi.", copie: "Nous escaladons piton avant midi.", erreur: "un mot a été sauté" },
  { modele: "Le maitre écrit la date au tableau noir.", copie: "Le maitre écrit la date au tableau noir", erreur: "le point de la fin a été oublié" },
  { modele: "Après la pluie, la ravine gronde fort.", copie: "Après la pluie la ravine gronde fort.", erreur: "la virgule a été oubliée" },
  { modele: "Papa allume le feu sous la marmite.", copie: "Papa allume le feu la marmite.", erreur: "un mot a été sauté" },
  { modele: "Les élèves récitent la poésie du jour.", copie: "Les élèves récitent poésie du jour.", erreur: "un mot a été sauté" },
  { modele: "Le pêcheur pousse sa pirogue sur le sable.", copie: "Le pêcheur pousse pirogue sur le sable.", erreur: "un mot a été sauté" },
];

const ERREURS: readonly string[] = [
  "un mot a été sauté",
  "la virgule a été oubliée",
  "un accent a été oublié",
  "la majuscule du début a été oubliée",
  "le point de la fin a été oublié",
  "une lettre a été oubliée à la fin d'un mot",
  "le signe de la fin a été changé",
];

/* ── Les stratégies de copie ─────────────────────────────────────────────── */

type Strategie = {
  readonly nom: string;
  readonly quand: string;
};

const STRATEGIES: readonly Strategie[] = [
  { nom: "lettre par lettre", quand: "pour un mot tout nouveau, qu'on n'a jamais écrit" },
  { nom: "syllabe par syllabe", quand: "pour un mot long qu'on lit encore en le découpant" },
  { nom: "mot par mot", quand: "pour un mot qu'on sait déjà lire d'un coup" },
  { nom: "groupe de mots par groupe de mots", quand: "pour une phrase qu'on comprend bien, quand on copie vite et sans faute" },
  { nom: "la phrase entière", quand: "pour une phrase courte qu'on a bien en tête, quand on est déjà à l'aise" },
  { nom: "en épelant dans sa tête", quand: "pour un mot dont on n'est pas sûr de l'orthographe" },
];

/* ── Les jalons du BO ────────────────────────────────────────────────────── */

const JALONS: readonly { readonly moment: string; readonly attendu: string }[] = [
  { moment: "à la fin de la première période", attendu: "quatre à cinq phrases courtes" },
  { moment: "à partir de la troisième période", attendu: "cinq ou six lignes" },
  { moment: "à la fin de l'année de CE1", attendu: "une dizaine de lignes" },
  { moment: "à la fin du CP", attendu: "trois ou quatre phrases" },
  { moment: "à la fin du CE2", attendu: "une dizaine de lignes avec une mise en page complexe" },
];

/** Ce qu'il faut garder du modèle, en plus des mots eux-mêmes. */
const MISE_EN_PAGE: readonly { readonly element: string; readonly pourquoi: string }[] = [
  { element: "les retours à la ligne", pourquoi: "dans un poème, ce sont eux qui font les vers" },
  { element: "les paragraphes", pourquoi: "chaque paragraphe annonce une nouvelle idée" },
  { element: "le titre, écrit à part", pourquoi: "il annonce le texte et ne se mélange pas avec lui" },
  { element: "les tirets d'une liste", pourquoi: "ils montrent qu'il s'agit d'étapes séparées" },
  { element: "la majuscule de chaque début de ligne d'un poème", pourquoi: "elle fait partie de la façon dont le poème est écrit" },
  { element: "les guillemets", pourquoi: "ils montrent qu'on rapporte les mots de quelqu'un" },
];

export const copieFluenteBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_COPIE_MOT
  ========================================================= */
  {
    kind: "template",
    id: "ce1_copie_mot_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_mot",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare le modèle et la copie, mot à mot, du début à la fin.",
    tags: ["ce1", "copie", "mot", "template"],
    generate: () => {
      const c = randomChoice(COPIES);
      const juste = Math.random() < 0.4;
      const ecrit = juste ? c.modele : c.copie;
      return {
        text: `Modèle : « ${c.modele} »\nCopie : « ${ecrit} »\n\nLa copie est-elle exacte ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Copier sans erreur, c'est écrire exactement ce qui est écrit : mêmes mots, mêmes lettres, mêmes accents, même ponctuation.",
          "Pose ton doigt sur le modèle et fais-le glisser mot à mot, en lisant ta copie en même temps.",
          juste
            ? "Ici, tout est identique : chaque mot, chaque accent, chaque signe."
            : `Ici, ${c.erreur}. Il fallait écrire « ${c.modele} »`,
          juste ? "Oui, la copie est exacte." : `Non : ${c.erreur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COPIE_PHRASE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_copie_phrase_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde les deux bouts de la phrase : la majuscule, et le signe de la fin.",
    tags: ["ce1", "copie", "phrase", "template"],
    generate: () => {
      const c = randomChoice(COPIES);
      const autres = shuffle(ERREURS.filter((e) => e !== c.erreur)).slice(0, 3);
      return {
        text: `Modèle : « ${c.modele} »\nCopie : « ${c.copie} »\n\nQu'est-ce qui ne va pas dans la copie ?`,
        format: "qcm" as const,
        choices: makeChoices(c.erreur, autres),
        expected: [c.erreur],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase copiée doit garder sa majuscule, tous ses mots, tous ses accents et son signe de fin.",
          "Compare les deux bouts d'abord — la majuscule et le point — puis les mots du milieu, un par un.",
          `Ici, ${c.erreur}. La bonne copie est « ${c.modele} »`,
          `L'erreur : ${c.erreur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COPIE_STRATEGIES
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_copie_strategies_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_strategies",
    difficulty: 3,
    theme: "neutral",
    text: "Deux élèves copient la même phrase. L'un regarde le modèle après chaque LETTRE, l'autre après chaque GROUPE DE MOTS. Lequel fait le moins de fautes ?",
    format: "qcm",
    choices: [
      "Celui qui copie par groupes de mots : il garde le sens en tête",
      "Celui qui copie lettre par lettre : il regarde plus souvent",
      "Les deux font autant de fautes",
      "Cela dépend de la couleur du stylo",
    ],
    expected: ["Celui qui copie par groupes de mots : il garde le sens en tête"],
    comparator: "mcq_exact",
    hint: "Copier lettre par lettre, c'est perdre le sens de la phrase.",
    explanation: exp(
      "On peut copier lettre à lettre, syllabe à syllabe, mot à mot, ou par groupes de mots. Plus on prend gros, plus on va vite et plus on est juste.",
      "Lis un groupe de mots, ferme les yeux, redis-le dans ta tête, puis écris-le sans regarder.",
      "Lettre par lettre, on ne comprend plus ce qu'on écrit : on saute des lettres sans le voir. Par groupes, la phrase reste dans la tête et se corrige toute seule.",
      "Celui qui copie par groupes de mots.",
    ),
    tags: ["ce1", "copie", "strategies", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_copie_strategies_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_strategies",
    difficulty: 2,
    theme: "neutral",
    hint: "Plus le mot est facile, plus on peut en prendre d'un coup.",
    tags: ["ce1", "copie", "strategies", "template"],
    generate: () => {
      const s = randomChoice(STRATEGIES);
      const autres = STRATEGIES.filter((x) => x.nom !== s.nom).map((x) => x.quand);
      return {
        text: `Quand utilise-t-on la copie « ${s.nom} » ?`,
        format: "qcm" as const,
        choices: makeChoices(s.quand, autres),
        expected: [s.quand],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Il y a quatre façons de copier, de la plus lente à la plus rapide : lettre, syllabe, mot, groupe de mots.",
          "Choisis la plus grande que tu peux tenir en mémoire sans te tromper.",
          `On copie ${s.nom} ${s.quand}.`,
          `On l'utilise ${s.quand}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COPIE_PARAGRAPHE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_copie_paragraphe_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_paragraphe",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux phrases, une seule faute. Compare-les l'une après l'autre.",
    tags: ["ce1", "copie", "paragraphe", "template"],
    generate: () => {
      const a = randomChoice(COPIES);
      const b = randomChoice(COPIES.filter((x) => x.modele !== a.modele));
      const premiereFausse = Math.random() < 0.5;
      const modele = `${a.modele} ${b.modele}`;
      const copie = premiereFausse ? `${a.copie} ${b.modele}` : `${a.modele} ${b.copie}`;
      const faute = premiereFausse ? a : b;
      return {
        text: `Modèle :\n« ${modele} »\n\nCopie :\n« ${copie} »\n\nDans quelle phrase se trouve l'erreur ?`,
        format: "qcm" as const,
        choices: shuffle([
          premiereFausse ? a.copie : b.copie,
          premiereFausse ? b.modele : a.modele,
        ]),
        expected: [faute.copie],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Sur un paragraphe, on ne compare pas tout d'un coup : on prend une phrase à la fois.",
          "Termine la première phrase entièrement avant de regarder la seconde.",
          `L'erreur est dans « ${faute.copie} » : ${faute.erreur}. Il fallait écrire « ${faute.modele} »`,
          `La phrase fautive est « ${faute.copie} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COPIE_RELIRE — le piège de la notion
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_copie_relire_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_relire",
    difficulty: 3,
    theme: "neutral",
    text: "Tu as fini de copier. Comment te relis-tu pour trouver tes erreurs ?",
    format: "qcm",
    choices: [
      "Je compare ma copie au modèle, mot à mot, le doigt dessus",
      "Je relis ma copie toute seule, sans regarder le modèle",
      "Je relis seulement la dernière phrase",
      "Je demande à mon voisin",
    ],
    expected: ["Je compare ma copie au modèle, mot à mot, le doigt dessus"],
    comparator: "mcq_exact",
    hint: "Un mot sauté ne se voit pas quand on relit seulement ce qu'on a écrit.",
    explanation: exp(
      "Se relire après une copie, c'est comparer deux textes — pas en relire un seul.",
      "Pose un doigt sur le modèle, un doigt sur ta copie, et avance mot à mot en même temps.",
      "Relue toute seule, « Le margouillat grimpe sur mur » se lit sans qu'on bute : la tête remet le mot manquant à la place. Face au modèle, le trou saute aux yeux.",
      "Je compare ma copie au modèle, mot à mot.",
    ),
    tags: ["ce1", "copie", "relire", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_copie_relire_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_relire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le mot manquant ne se voit pas tout seul : il se voit en comparant.",
    tags: ["ce1", "copie", "relire", "template"],
    generate: () => {
      const c = randomChoice(COPIES.filter((x) => x.erreur === "un mot a été sauté"));
      const motsModele = c.modele.replace(/[.?!]$/, "").split(" ");
      const motsCopie = c.copie.replace(/[.?!]$/, "").split(" ");
      const manquant =
        motsModele.find((m, i) => motsCopie[i] !== m) ?? motsModele[motsModele.length - 1];
      const autres = motsCopie.filter((m) => m !== manquant).slice(0, 3);
      return {
        text: `Modèle : « ${c.modele} »\nCopie : « ${c.copie} »\n\nQuel mot manque dans la copie ?`,
        format: "qcm" as const,
        choices: makeChoices(manquant, autres),
        expected: [manquant],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot sauté est l'erreur de copie la plus fréquente, et la plus difficile à voir sur son propre texte.",
          "Avance sur les deux textes en même temps, un doigt sur chacun. Là où ils se décalent, tu as trouvé.",
          `« ${manquant} » est dans le modèle et pas dans la copie. Relue toute seule, la copie ne choque pas : c'est bien pour ça qu'il faut comparer.`,
          `Le mot manquant est « ${manquant} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COPIE_MISE_EN_PAGE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_copie_mise_en_page_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_mise_en_page",
    difficulty: 2,
    theme: "neutral",
    hint: "Le BO donne trois repères dans l'année, et ils grandissent.",
    tags: ["ce1", "copie", "mise-en-page", "template"],
    generate: () => {
      const j = randomChoice(JALONS);
      const autres = JALONS.filter((x) => x.attendu !== j.attendu).map((x) => x.attendu);
      return {
        text: `Au CE1, combien de texte doit-on savoir copier sans erreur ${j.moment} ?`,
        format: "qcm" as const,
        choices: makeChoices(j.attendu, [...autres, "une page entière"]),
        expected: [j.attendu],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La copie s'allonge au fil de l'année : quelques phrases, puis quelques lignes, puis une dizaine.",
          "Ce n'est pas la vitesse qui compte d'abord, c'est de ne pas faire de faute sur la longueur demandée.",
          `${j.moment}, on attend ${j.attendu}. En fin d'année, on copie une dizaine de lignes en gardant la mise en page du modèle.`,
          `On attend ${j.attendu}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_copie_mise_en_page_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_mise_en_page",
    difficulty: 3,
    theme: "neutral",
    hint: "Un texte ne se lit pas seulement avec ses mots : sa forme dit quelque chose aussi.",
    tags: ["ce1", "copie", "mise-en-page", "template"],
    generate: () => {
      const m = randomChoice(MISE_EN_PAGE);
      const autres = MISE_EN_PAGE.filter((x) => x.element !== m.element).map((x) => x.pourquoi);
      return {
        text: `En copiant, pourquoi faut-il garder ${m.element} du modèle ?`,
        format: "qcm" as const,
        choices: makeChoices(m.pourquoi, autres),
        expected: [m.pourquoi],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Respecter la mise en page, c'est garder la FORME du texte, pas seulement ses mots.",
          "Regarde le modèle de loin, avant d'écrire : sa forme se voit avant qu'on le lise.",
          `On garde ${m.element} parce que ${m.pourquoi}.`,
          `Parce que ${m.pourquoi}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_copie_strategies_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_strategies",
    difficulty: 3,
    theme: "neutral",
    hint: "Plus on prend gros d'un coup, plus on va vite — mais il faut pouvoir le retenir.",
    tags: ["ce1", "copie", "strategies", "template"],
    generate: () => {
      const s = randomChoice(STRATEGIES);
      const autres = STRATEGIES.filter((x) => x.nom !== s.nom).map((x) => x.nom);
      return {
        text: `Quelle stratégie de copie choisis-tu ${s.quand} ?`,
        format: "qcm" as const,
        choices: makeChoices(s.nom, autres),
        expected: [s.nom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On ne copie pas toujours de la même façon : la stratégie dépend de ce qu'on a devant soi.",
          "Demande-toi ce que tu peux retenir d'un coup sans te tromper, et prends exactement ça.",
          `${s.quand.charAt(0).toUpperCase() + s.quand.slice(1)}, on copie ${s.nom}.`,
          `On copie ${s.nom}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_copie_mise_en_page_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce1_copie_mise_en_page",
    difficulty: 3,
    theme: "neutral",
    text: "Le modèle est un poème écrit en quatre lignes courtes. Tu le copies en une seule longue ligne. Est-ce une bonne copie ?",
    format: "qcm",
    choices: [
      "Non : il faut aussi respecter la façon dont le texte est disposé",
      "Oui, puisque tous les mots y sont",
      "Oui, si l'écriture est jolie",
      "Non, mais seulement si c'est un poème",
    ],
    expected: ["Non : il faut aussi respecter la façon dont le texte est disposé"],
    comparator: "mcq_exact",
    hint: "Chez un poème, les retours à la ligne font partie du texte.",
    explanation: exp(
      "Copier, ce n'est pas seulement recopier les mots : c'est aussi garder la mise en page — les retours à la ligne, les paragraphes, les titres.",
      "Regarde d'abord la FORME du modèle, avant d'écrire le premier mot.",
      "Un poème écrit à la suite n'est plus un poème : on ne voit plus les vers. La disposition dit quelque chose, elle aussi.",
      "Non : il faut aussi respecter la disposition.",
    ),
    tags: ["ce1", "copie", "mise-en-page", "methode", "qcm"],
  },
];
