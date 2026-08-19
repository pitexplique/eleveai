// lib/tutor-v4/questionBank/5e/francais/anaphore.bank.ts
//
// LA CHAÎNE ANAPHORIQUE EN 5ᵉ — écrite le 15/08/2026.
//
// ⭐ POURQUOI CE FICHIER EXISTE. L'évaluation nationale de 5ᵉ mesure
// « maîtriser la chaine anaphorique et l'emploi des pronoms représentants »
// sur six items. Les résultats 2025 d'un collège de l'île y donnent 19 %,
// 24 % et 43 % de réussite — le point le plus bas de tout le document,
// français et mathématiques confondus. Le coach, lui, savait faire
// identifier un pronom (`5e_gram_pronoms`) ; il ne demandait jamais ce que
// ce pronom REPREND.
//
// ⚠️ CE N'EST PAS LA MÊME COMPÉTENCE, et c'est tout le sujet. Dire que
// « celui-ci » est un pronom démonstratif, c'est une question de classe de
// mot, qui se règle sans lire la phrase d'avant. Dire que « celui-ci »
// désigne le marchand et non le voyageur, c'est une question de TEXTE. Un
// intitulé voisin n'est pas une couverture — même écart qu'entre « nuance de
// sens » et « niveau de langue ».
//
// ⚠️ SUR QUOI JE M'APPUIE, ET CE QUE JE NE PRÉTENDS PAS. Les attendus de fin
// de CM2 nomment « les substituts (ex : reprises pronominales) » parmi les
// indices sur lesquels l'élève s'appuie pour argumenter sa compréhension : la
// compétence est installée en amont du collège. Je ne cite EN REVANCHE aucun
// attendu du BO de mars 2026 mot à mot pour ces trois micros — ce sont
// l'évaluation officielle et les résultats mesurés qui les justifient, pas
// une ligne recopiée. À faire trancher par Frédéric.
//
// TROIS MICRO-COMPÉTENCES :
//   `5e_gram_anaphore_pronom`  — retrouver ce qu'un pronom reprend
//   `5e_gram_reprise_nominale` — reconnaître une reprise par un autre nom
//   `5e_gram_chaine_reference` — suivre la chaîne d'un bout à l'autre
//
// ⛔ AUCUN ITEM NE COMMENCE PAR « Une anaphore est… » : on donne le texte, et
// on demande ce que le mot y fait. Les définitions de cours ont été purgées du
// cycle 4 le 01/08/2026.
// ⛔ QCM uniquement, quatre propositions.
// ⚠️ Chaque énoncé est DISTINCT : le tirage des épreuves déduplique sur le
// texte, et des items qui partagent un intitulé se réduisent à un seul.
// ⚠️ LE DISTRACTEUR EST TOUJOURS UN AUTRE NOM DU TEXTE. Un piège pris hors du
// passage se repère sans le lire — et on mesurerait alors le hasard.

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

type Anaphore = {
  readonly passage: string;
  readonly mot: string;
  readonly reprend: string;
  readonly faux: readonly string[];
  readonly pourquoi: string;
};

type Reprise = {
  readonly passage: string;
  readonly groupe: string;
  readonly designe: string;
  readonly faux: readonly string[];
  readonly pourquoi: string;
};

type Chaine = {
  readonly passage: string;
  readonly question: string;
  readonly rep: string;
  readonly faux: readonly string[];
  readonly pourquoi: string;
};

/* =============================================================================
   1. CE QU'UN PRONOM REPREND
   ---------------------------------------------------------------------------
   Le pronom est donné, le texte aussi. La seule façon de répondre est de
   remonter. ⚠️ Les distracteurs sont TOUS des noms présents dans le passage,
   et compatibles en genre et en nombre chaque fois que c'est possible : si le
   genre suffit à trancher, on ne mesure plus la lecture mais l'accord.
   ========================================================================== */

const ANAPHORES: readonly Anaphore[] = [
  {
    passage:
      "Le marchand rencontra un voyageur sur la route de Cilaos. Celui-ci portait un sac trop lourd pour lui.",
    mot: "Celui-ci",
    reprend: "le voyageur",
    faux: ["le marchand", "le sac", "la route"],
    pourquoi:
      "« Celui-ci » désigne le plus proche des deux, celui qui vient d'être nommé : le voyageur.",
  },
  {
    passage:
      "Maëva tendit la lettre à sa grand-mère. Elle l'avait écrite la veille, sans rien dire à personne.",
    mot: "Elle",
    reprend: "Maëva",
    faux: ["sa grand-mère", "la lettre", "la veille"],
    pourquoi:
      "C'est Maëva qui a écrit : la suite de la phrase, « sans rien dire à personne », ne peut se rapporter qu'à elle.",
  },
  {
    passage:
      "Les pêcheurs remontèrent les filets. Ils étaient déchirés en trois endroits.",
    mot: "Ils",
    reprend: "les filets",
    faux: ["les pêcheurs", "les endroits", "les bateaux"],
    pourquoi:
      "Ce sont les filets qui peuvent être déchirés, pas les pêcheurs : c'est le sens qui tranche, les deux étant au masculin pluriel.",
  },
  {
    passage:
      "Le cyclone a traversé l'île en une nuit. Il a arraché les tôles du hangar.",
    mot: "Il",
    reprend: "le cyclone",
    faux: ["le hangar", "l'île", "la nuit"],
    pourquoi:
      "Seul le cyclone peut arracher des tôles. Le hangar est masculin lui aussi : c'est le sens qui décide, pas le genre.",
  },
  {
    passage:
      "Ludovic prêta sa canne à son cousin. Il la lui rendit cassée le lendemain.",
    mot: "lui",
    reprend: "Ludovic",
    faux: ["son cousin", "la canne", "le lendemain"],
    pourquoi:
      "« Il » est le cousin qui rend, « lui » est celui à qui l'on rend : Ludovic, le propriétaire.",
  },
  {
    passage:
      "La directrice reçut les parents dans son bureau. Elle leur expliqua la décision du conseil.",
    mot: "leur",
    reprend: "les parents",
    faux: ["la directrice", "le bureau", "le conseil"],
    pourquoi:
      "« Elle » est la directrice, qui parle ; « leur » désigne ceux à qui elle parle, les parents.",
  },
  {
    passage:
      "Nous avons planté deux manguiers derrière la case. Le plus jeune n'a pas résisté à la sécheresse.",
    mot: "Le plus jeune",
    reprend: "un des deux manguiers",
    faux: ["la case", "la sécheresse", "les deux manguiers"],
    pourquoi:
      "L'article défini et le superlatif renvoient à un élément déjà cité : l'un des deux manguiers, et un seul.",
  },
  {
    passage:
      "Sarah a rangé les livres et les cahiers. Elle les a posés sur l'étagère du haut.",
    mot: "les",
    reprend: "les livres et les cahiers",
    faux: ["les livres seulement", "les cahiers seulement", "les étagères"],
    pourquoi:
      "Le pronom reprend l'ensemble de ce qui a été rangé, pas une moitié : rien dans la phrase ne sépare les deux.",
  },
];

/* =============================================================================
   2. LA REPRISE PAR UN AUTRE NOM
   ---------------------------------------------------------------------------
   Une chaîne ne tient pas qu'avec des pronoms : « le chien » devient
   « l'animal », puis « la pauvre bête ». C'est la partie que les élèves voient
   le moins — le mot change complètement, rien ne signale que c'est le même.
   ========================================================================== */

const REPRISES: readonly Reprise[] = [
  {
    passage:
      "Un margouillat s'était glissé sous l'armoire. Le petit lézard ne bougeait plus.",
    groupe: "Le petit lézard",
    designe: "le margouillat",
    faux: ["l'armoire", "un autre animal", "la maison"],
    pourquoi:
      "Le nom change, la personne désignée non : un margouillat EST un lézard. C'est une reprise par un mot plus général.",
  },
  {
    passage:
      "Le Piton de la Fournaise est entré en éruption mardi. Le volcan a rejeté de la lave pendant douze heures.",
    groupe: "Le volcan",
    designe: "le Piton de la Fournaise",
    faux: ["la lave", "un autre volcan", "l'éruption"],
    pourquoi:
      "On reprend un nom propre par le nom commun qui dit ce qu'il est. Rien n'annonce un second volcan.",
  },
  {
    passage:
      "Madame Lucie soigne les plantes du quartier depuis quarante ans. La vieille dame connaît chaque feuille.",
    groupe: "La vieille dame",
    designe: "Madame Lucie",
    faux: ["une voisine", "les plantes", "le quartier"],
    pourquoi:
      "La reprise ajoute une information — l'âge — sans changer de personne. C'est le propre d'une reprise nominale.",
  },
  {
    passage:
      "Les élèves ont préparé une exposition sur les baleines. Le travail a duré trois semaines.",
    groupe: "Le travail",
    designe: "la préparation de l'exposition",
    faux: ["les élèves", "les baleines", "les trois semaines"],
    pourquoi:
      "Une reprise peut désigner une ACTION déjà racontée, pas seulement une personne ou un objet.",
  },
  {
    passage:
      "Un vieux camion s'est arrêté devant l'école. Le véhicule bloquait toute la rue.",
    groupe: "Le véhicule",
    designe: "le vieux camion",
    faux: ["l'école", "la rue", "un autre camion"],
    pourquoi:
      "« Véhicule » est plus général que « camion » : c'est la reprise la plus fréquente, et la moins repérée.",
  },
  {
    passage:
      "Naïla a trouvé une carapace de tortue sur la plage. L'objet était plus léger qu'elle ne pensait.",
    groupe: "L'objet",
    designe: "la carapace",
    faux: ["la tortue", "la plage", "Naïla"],
    pourquoi:
      "La reprise très générale — « l'objet », « la chose » — désigne le dernier élément dont on parlait.",
  },
  {
    passage:
      "Le professeur rendit les copies. La plupart des travaux étaient soignés.",
    groupe: "les travaux",
    designe: "les copies",
    faux: ["les élèves", "le professeur", "les notes"],
    pourquoi:
      "Deux mots différents pour la même chose. Rien d'autre n'a été rendu dans le passage.",
  },
  {
    passage:
      "Une odeur de vanille montait de la cuisine. Ce parfum réveilla toute la maison.",
    groupe: "Ce parfum",
    designe: "l'odeur de vanille",
    faux: ["la cuisine", "la maison", "la vanille seule"],
    pourquoi:
      "Le déterminant démonstratif « ce » signale à lui seul qu'on reprend quelque chose de déjà nommé.",
  },
];

/* =============================================================================
   3. SUIVRE LA CHAÎNE
   ---------------------------------------------------------------------------
   Le vrai exercice de l'évaluation : plusieurs reprises de suite, et une
   question qui oblige à les tenir toutes. C'est là que la réussite tombe à
   19 % — un élève peut réussir chaque maillon séparément et perdre le fil.
   ========================================================================== */

const CHAINES: readonly Chaine[] = [
  {
    passage:
      "Tante Aline a rapporté un poisson du marché. Elle l'a posé sur la table, puis elle est repartie. Quand elle est revenue, il avait disparu. Le chat dormait sous la véranda, l'air très satisfait.",
    question: "Dans « il avait disparu », de quoi parle-t-on ?",
    rep: "du poisson",
    faux: ["de tante Aline", "du chat", "du marché"],
    pourquoi:
      "Le poisson est le seul masculin singulier repris depuis le début : « un poisson », « l' », puis « il ».",
  },
  {
    passage:
      "Le facteur a déposé un colis devant la porte. Le paquet est resté là toute la journée. Personne ne l'a vu, sauf le voisin, qui n'a rien dit.",
    question: "Combien de mots différents désignent le colis dans ce passage ?",
    rep: "trois : « un colis », « le paquet », « l' »",
    faux: [
      "deux : « un colis » et « le paquet »",
      "un seul : « un colis »",
      "quatre, en comptant « le voisin »",
    ],
    pourquoi:
      "Une chaîne se compte : le nom qui introduit, les reprises nominales, et les pronoms. Ici trois maillons.",
  },
  {
    passage:
      "Mon grand-père gardait une vieille montre dans un tiroir. L'objet ne marchait plus depuis longtemps. Il ne voulait pourtant pas s'en séparer.",
    question: "Dans « Il ne voulait pas s'en séparer », qui est « il » et que désigne « en » ?",
    rep: "« il » = le grand-père, « en » = la montre",
    faux: [
      "« il » = la montre, « en » = le tiroir",
      "« il » = le tiroir, « en » = la montre",
      "« il » = le grand-père, « en » = le tiroir",
    ],
    pourquoi:
      "Deux chaînes courent en parallèle. Seul un être humain peut « vouloir » : « il » est le grand-père, et ce dont il ne se sépare pas est la montre.",
  },
  {
    passage:
      "Les pompiers sont arrivés les premiers. Ces hommes travaillaient depuis douze heures. Ils ont pourtant tenu jusqu'au matin.",
    question: "« Ces hommes » et « Ils » désignent-ils la même chose ?",
    rep: "oui, les deux désignent les pompiers",
    faux: [
      "non, « ils » désigne d'autres secours",
      "non, « ces hommes » désigne des habitants",
      "on ne peut pas le savoir",
    ],
    pourquoi:
      "Rien dans le passage n'introduit un nouveau groupe. Tant qu'aucun nouveau nom n'apparaît, la chaîne continue.",
  },
  {
    passage:
      "Sarah et Maëva ont monté la tente. Celle-ci s'est effondrée pendant la nuit. Elles ont dormi dans la voiture.",
    question: "Dans « Celle-ci s'est effondrée », de quoi parle-t-on ?",
    rep: "de la tente",
    faux: ["de Sarah", "de Maëva", "de la voiture"],
    pourquoi:
      "« Celle-ci » est au singulier : il ne peut pas reprendre « Sarah et Maëva ». Le seul féminin singulier disponible est la tente.",
  },
  {
    passage:
      "Le boulanger prépare le pain dès quatre heures. Cet artisan travaille pendant que le quartier dort. Ses clients ne le voient jamais à l'œuvre.",
    question: "Quelle expression NE désigne PAS le boulanger ?",
    rep: "« ses clients »",
    faux: ["« cet artisan »", "« le »", "« ses »"],
    pourquoi:
      "« Ses » et « le » renvoient au boulanger ; « cet artisan » le reprend. Les clients sont d'autres personnes.",
  },
];

export const anaphore5eBank: TutorBankItemV4[] = [
  /* ── 1. Ce qu'un pronom reprend ─────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_gram_anaphore_pronom_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_anaphore_pronom",
    difficulty: 2,
    theme: "reunion",
    hint: "Remonte le texte : le mot repris est presque toujours avant.",
    tags: ["5e", "grammaire", "anaphore", "template"],
    generate: () => {
      const a = randomChoice(ANAPHORES);
      return {
        text: `« ${a.passage} »\n\nQue reprend « ${a.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(a.reprend, a.faux),
        expected: [a.reprend],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un pronom ne dit rien tout seul : il tient sa place d'un mot déjà écrit, qu'on appelle son antécédent.",
          "Remplace le pronom par chacun des candidats et relis à voix basse. Un seul rend la phrase possible.",
          a.pourquoi,
          `« ${a.mot} » reprend ${a.reprend}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "5e_gram_anaphore_pronom_tpl_2",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_anaphore_pronom",
    difficulty: 3,
    theme: "reunion",
    hint: "Le genre et le nombre ne suffisent pas toujours : c'est souvent le sens qui tranche.",
    tags: ["5e", "grammaire", "anaphore", "template"],
    generate: () => {
      const a = randomChoice(ANAPHORES);
      return {
        text: `« ${a.passage} »\n\nSi l'on remplaçait « ${a.mot} » par le groupe de mots qu'il reprend, lequel faudrait-il écrire ?`,
        format: "qcm" as const,
        choices: makeChoices(a.reprend, a.faux),
        expected: [a.reprend],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le test du remplacement est le seul qui ne se trompe pas : le bon antécédent laisse une phrase qui se tient.",
          "Essaie chaque proposition à la place du pronom. Trois donnent une phrase bancale ou absurde.",
          a.pourquoi,
          `Il faudrait écrire ${a.reprend}.`,
        ),
      };
    },
  },

  /* ── 2. La reprise par un autre nom ─────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_gram_reprise_nominale_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_reprise_nominale",
    difficulty: 2,
    theme: "reunion",
    hint: "Le mot change, mais parle-t-on d'autre chose pour autant ?",
    tags: ["5e", "grammaire", "reprise", "template"],
    generate: () => {
      const r = randomChoice(REPRISES);
      return {
        text: `« ${r.passage} »\n\nQue désigne « ${r.groupe} » ?`,
        format: "qcm" as const,
        choices: makeChoices(r.designe, r.faux),
        expected: [r.designe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une reprise nominale redit la même chose avec un autre nom, souvent plus général : « un margouillat » devient « le lézard ».",
          "Demande-toi si un nouvel élément a été introduit. Si rien n'est apparu, c'est une reprise.",
          r.pourquoi,
          `« ${r.groupe} » désigne ${r.designe}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "5e_gram_reprise_nominale_tpl_2",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_reprise_nominale",
    difficulty: 3,
    theme: "reunion",
    hint: "Un déterminant défini ou démonstratif annonce presque toujours une reprise.",
    tags: ["5e", "grammaire", "reprise", "template"],
    generate: () => {
      const r = randomChoice(REPRISES);
      return {
        text: `« ${r.passage} »\n\nLe passage parle-t-il de deux choses différentes, ou d'une seule nommée deux fois ?`,
        format: "qcm" as const,
        choices: makeChoices(
          `d'une seule : « ${r.groupe} » reprend ${r.designe}`,
          [
            // ⚠️ La bonne réponse porte `r.designe`, le leurre ne le portait
            // pas : elle était plus longue À CHAQUE TIRAGE, quel que soit le
            // cas tiré. Le défaut était dans le GABARIT, pas dans les données.
            // Les deux lignes sont maintenant la même phrase et sa négation.
            `de deux : « ${r.groupe} » ne reprend pas ${r.designe}`,
            "de trois éléments tout à fait différents",
            "le texte ne permet pas du tout de le dire",
          ],
        ),
        expected: [`d'une seule : « ${r.groupe} » reprend ${r.designe}`],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Changer de mot n'est pas changer de chose. C'est ce qui rend les reprises nominales difficiles à suivre.",
          "Cherche si le texte a présenté un nouvel élément entre les deux. Sinon, c'est le même.",
          r.pourquoi,
          `Une seule chose, nommée deux fois.`,
        ),
      };
    },
  },

  /* ── 3. Suivre la chaîne ────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_gram_chaine_reference_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_chaine_reference",
    difficulty: 4,
    theme: "reunion",
    hint: "Reprends le passage depuis le début et note à chaque fois de qui l'on parle.",
    tags: ["5e", "grammaire", "anaphore", "chaine", "template"],
    generate: () => {
      const c = randomChoice(CHAINES);
      return {
        text: `« ${c.passage} »\n\n${c.question}`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, c.faux),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une chaîne de reprises, c'est la suite des mots qui désignent la même chose du début à la fin d'un texte : le nom qui l'introduit, les autres noms qui la redisent, et les pronoms.",
          "Relis en soulignant chaque mot qui parle de la même chose. Tant qu'aucun élément nouveau n'apparaît, la chaîne continue.",
          c.pourquoi,
          c.rep.charAt(0).toUpperCase() + c.rep.slice(1) + ".",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "5e_gram_chaine_reference_tpl_2",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_chaine_reference",
    difficulty: 4,
    theme: "reunion",
    hint: "Une chaîne se rompt dès qu'un élément nouveau entre dans le texte.",
    tags: ["5e", "grammaire", "anaphore", "chaine", "template"],
    generate: () => {
      const c = randomChoice(CHAINES);
      return {
        text: `« ${c.passage} »\n\nParmi ces réponses, laquelle est exacte ?\n\n${c.question}`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, c.faux),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Perdre le fil d'une chaîne, ce n'est pas ignorer une règle : c'est cesser de savoir de qui le texte parle.",
          "Avance phrase par phrase et redis à voix basse de quoi il est question. L'erreur se voit au moment où l'on hésite.",
          c.pourquoi,
          c.rep.charAt(0).toUpperCase() + c.rep.slice(1) + ".",
        ),
      };
    },
  },
];
