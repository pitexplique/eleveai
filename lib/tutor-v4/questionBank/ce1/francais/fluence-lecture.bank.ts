// lib/tutor-v4/questionBank/ce1/francais/fluence-lecture.bank.ts
//
// La fluence de lecture du CE1, écrite à la main. Neuf micro-compétences.
//
// CE QU'ELLE REMPLACE, et c'est LA question cassée du constructeur commun.
// `fluence_lecture` était aiguillé vers le générateur de lecture syllabique
// écrit pour le CP, qui servait :
//
//     « Parmi ces syllabes, laquelle commence par la lettre b ? »
//     expected: ["ba"]   jeux de syllabes : ba/la/ma · ro/no/lo · fi/si/di
//
// Deux jeux sur trois ne contiennent AUCUNE syllabe commençant par b : deux
// fois sur trois, aucune proposition ne répond à la question. 1 053 tirages sur
// 51 300 étaient impossibles à réussir au CE1, et rien ne le signalait.
//
// La seconde question du même générateur ne valait pas mieux : « Quel mot est
// un mot très fréquent que tu dois reconnaitre sans déchiffrer ? », avec les
// QUATRE propositions tirées de la même liste de mots fréquents. Les quatre
// étaient justes ; une seule était acceptée, au hasard.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Lire à voix haute soixante-dix mots par minute en fin d'année » ;
//   — « Respecter tous les signes de ponctuation et les groupes de souffle » ;
//   — « Lire de manière expressive » ;
//   — « Décoder avec exactitude un mot nouveau ».
//
// ⚠️ LA FLUENCE SE MESURE À VOIX HAUTE, ET LE COACH N'ENTEND PAS. Ce qui est
// vérifiable sur un écran, c'est ce qui PRÉPARE la lecture à voix haute : les
// mots qu'on doit reconnaitre sans déchiffrer, l'endroit où l'on respire, ce
// que chaque signe de ponctuation demande à la voix, et le compte des mots par
// minute. Le reste se juge avec un chronomètre et un adulte à côté.
//
// ⛔ Aucune question de comptage de syllabes : « porte » fait une syllabe à
// Paris et souvent deux ici. Un enfant d'ici aurait faux à cause de son
// accent, pas de sa lecture.

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

/* ── Les mots à reconnaitre d'un coup d'œil ──────────────────────────────────
   ⚠️ Le générateur commun tirait les QUATRE propositions dans la même liste de
   mots fréquents : les quatre étaient justes. Ici, les pièges sont des mots
   RARES, qu'un CE1 doit déchiffrer — c'est ce qui rend la question posable. */

const MOTS_OUTILS: readonly string[] = [
  "le", "la", "les", "un", "une", "des", "est", "et", "dans", "avec",
  "pour", "sur", "sous", "mais", "que", "qui", "elle", "il", "nous", "vous",
  "son", "ses", "ce", "cette", "plus", "très", "bien", "tout", "chez", "sans",
];

const MOTS_RARES: readonly string[] = [
  "hippopotame", "kaléidoscope", "chrysanthème", "philosophie", "trampoline",
  "brouillard", "gymnastique", "hélicoptère", "vermicelle", "escarpolette",
  "aquarelle", "pittoresque", "carrefour", "engrenage", "rhinocéros",
];

/* ── Les mots nouveaux à déchiffrer ──────────────────────────────────────────
   Le découpage est écrit à la main : on ne le calcule pas, et on ne demande
   jamais de COMPTER les syllabes — voir l'en-tête. */

type MotNouveau = {
  readonly mot: string;
  readonly decoupe: string;
  readonly piege: string;
  readonly pourquoi: string;
};

const MOTS_NOUVEAUX: readonly MotNouveau[] = [
  { mot: "château", decoupe: "châ-teau", piege: "chat", pourquoi: "on lit « chat » et on s'arrête, au lieu d'aller jusqu'au bout" },
  { mot: "montagne", decoupe: "mon-ta-gne", piege: "monta", pourquoi: "le « gn » se lit d'un seul coup, pas g puis n" },
  { mot: "escalier", decoupe: "es-ca-lier", piege: "escale", pourquoi: "on devine sur le début au lieu de lire la fin" },
  { mot: "chirurgien", decoupe: "chi-rur-gien", piege: "chirurgi", pourquoi: "le « gien » se lit d'un bloc" },
  { mot: "aquarium", decoupe: "a-qua-rium", piege: "aquari", pourquoi: "le « qua » se lit « kwa », et le mot ne finit pas là" },
  { mot: "papillon", decoupe: "pa-pi-llon", piege: "papil", pourquoi: "le « ill » se lit d'un seul coup" },
  { mot: "grenouille", decoupe: "gre-nouille", piege: "grenou", pourquoi: "le « ouill » se lit ensemble, jusqu'au bout" },
  { mot: "bibliothèque", decoupe: "bi-blio-thè-que", piege: "biblio", pourquoi: "le mot est long : on le coupe, mais on le finit" },
  { mot: "tremblement", decoupe: "trem-ble-ment", piege: "tremble", pourquoi: "on s'arrête sur un mot connu caché dans le grand" },
  { mot: "photographie", decoupe: "pho-to-gra-phie", piege: "photo", pourquoi: "« photo » est dedans, mais ce n'est pas le mot entier" },
  { mot: "réfrigérateur", decoupe: "ré-fri-gé-ra-teur", piege: "réfrigéré", pourquoi: "on invente la fin au lieu de la lire" },
  { mot: "parapluie", decoupe: "pa-ra-pluie", piege: "para", pourquoi: "le mot continue après le préfixe" },
];

/* ── La ponctuation ──────────────────────────────────────────────────────── */

type Signe = {
  readonly signe: string;
  readonly nom: string;
  readonly voix: string;
};

const SIGNES: readonly Signe[] = [
  { signe: ".", nom: "le point", voix: "on s'arrête et la voix descend" },
  { signe: ",", nom: "la virgule", voix: "on marque une petite pause sans s'arrêter" },
  { signe: "?", nom: "le point d'interrogation", voix: "la voix monte à la fin" },
  { signe: "!", nom: "le point d'exclamation", voix: "la voix se soulève, on met de l'émotion" },
  { signe: "…", nom: "les points de suspension", voix: "on laisse la phrase en suspens" },
];

/* ── Les groupes de souffle ──────────────────────────────────────────────────
   La barre montre où l'on respire. Écrite à la main : elle se place entre les
   groupes de sens, pas au milieu d'un groupe. */

type GroupeSouffle = {
  readonly phrase: string;
  readonly bon: string;
  readonly mauvais: readonly string[];
};

const SOUFFLES: readonly GroupeSouffle[] = [
  {
    phrase: "Le margouillat grimpe sur le mur de la varangue.",
    bon: "Le margouillat / grimpe sur le mur / de la varangue.",
    mauvais: [
      "Le / margouillat grimpe sur / le mur de la varangue.",
      "Le margouillat grimpe / sur le / mur de la varangue.",
      "Le margouillat grimpe sur le / mur de / la varangue.",
    ],
  },
  {
    phrase: "Chaque matin, Léa ramasse des mangues dans le jardin.",
    bon: "Chaque matin, / Léa ramasse des mangues / dans le jardin.",
    mauvais: [
      "Chaque / matin, Léa ramasse / des mangues dans le jardin.",
      "Chaque matin, Léa / ramasse des / mangues dans le jardin.",
      "Chaque matin, Léa ramasse des / mangues dans / le jardin.",
    ],
  },
  {
    phrase: "Les enfants du voisin jouent dans la cour de l'école.",
    bon: "Les enfants du voisin / jouent / dans la cour de l'école.",
    mauvais: [
      "Les enfants / du voisin jouent dans / la cour de l'école.",
      "Les / enfants du voisin jouent dans la cour / de l'école.",
      "Les enfants du voisin jouent dans la / cour de / l'école.",
    ],
  },
  {
    phrase: "Le pêcheur pousse sa pirogue sur le sable encore froid.",
    bon: "Le pêcheur / pousse sa pirogue / sur le sable encore froid.",
    mauvais: [
      "Le pêcheur pousse / sa / pirogue sur le sable encore froid.",
      "Le / pêcheur pousse sa pirogue sur le / sable encore froid.",
      "Le pêcheur pousse sa pirogue sur / le sable / encore froid.",
    ],
  },
  {
    phrase: "Après la pluie, la ravine gronde au fond du ravin.",
    bon: "Après la pluie, / la ravine gronde / au fond du ravin.",
    mauvais: [
      "Après / la pluie, la ravine / gronde au fond du ravin.",
      "Après la / pluie, la ravine gronde au / fond du ravin.",
      "Après la pluie, la ravine gronde au fond / du / ravin.",
    ],
  },
  {
    phrase: "Mamie prépare un cari pour toute la famille.",
    bon: "Mamie / prépare un cari / pour toute la famille.",
    mauvais: [
      "Mamie prépare / un / cari pour toute la famille.",
      "Mamie prépare un / cari pour / toute la famille.",
      "Mamie prépare un cari pour toute / la / famille.",
    ],
  },
  {
    phrase: "Les letchis rouges tombent dans l'herbe du jardin.",
    bon: "Les letchis rouges / tombent / dans l'herbe du jardin.",
    mauvais: [
      "Les / letchis rouges tombent dans / l'herbe du jardin.",
      "Les letchis / rouges tombent dans l'herbe / du jardin.",
      "Les letchis rouges tombent dans l'herbe / du / jardin.",
    ],
  },
  {
    phrase: "Le maitre écrit la date au tableau de la classe.",
    bon: "Le maitre / écrit la date / au tableau de la classe.",
    mauvais: [
      "Le maitre écrit / la / date au tableau de la classe.",
      "Le / maitre écrit la date au / tableau de la classe.",
      "Le maitre écrit la date au tableau / de / la classe.",
    ],
  },
  {
    phrase: "Ce soir, la famille mange sous la varangue.",
    bon: "Ce soir, / la famille mange / sous la varangue.",
    mauvais: [
      "Ce / soir, la famille / mange sous la varangue.",
      "Ce soir, la / famille mange sous / la varangue.",
      "Ce soir, la famille mange sous la / varangue.",
    ],
  },
  {
    phrase: "La tortue remonte lentement le sable de la plage.",
    bon: "La tortue / remonte lentement / le sable de la plage.",
    mauvais: [
      "La / tortue remonte lentement le / sable de la plage.",
      "La tortue remonte / lentement le sable / de la plage.",
      "La tortue remonte lentement le sable de / la / plage.",
    ],
  },
  {
    phrase: "Les cousins bavardent longtemps sous le vieux manguier.",
    bon: "Les cousins / bavardent longtemps / sous le vieux manguier.",
    mauvais: [
      "Les / cousins bavardent longtemps sous / le vieux manguier.",
      "Les cousins bavardent / longtemps sous le / vieux manguier.",
      "Les cousins bavardent longtemps sous le vieux / manguier.",
    ],
  },
  {
    phrase: "Le vent secoue les branches depuis le petit matin.",
    bon: "Le vent / secoue les branches / depuis le petit matin.",
    mauvais: [
      "Le / vent secoue les / branches depuis le petit matin.",
      "Le vent secoue / les branches depuis / le petit matin.",
      "Le vent secoue les branches depuis le / petit / matin.",
    ],
  },
];

/* ── Les phrases à dire avec la bonne voix ─────────────────────────────────── */

const PHRASES_EXPRESSIVES: readonly { readonly signe: string; readonly phrase: string }[] = [
  { signe: ".", phrase: "Le margouillat grimpe sur le mur." },
  { signe: ".", phrase: "Papa prépare un cari le dimanche." },
  { signe: ".", phrase: "La pirogue glisse sur le lagon." },
  { signe: ".", phrase: "Les letchis tombent dans l'herbe." },
  { signe: ",", phrase: "Chaque matin, Léa ramasse des mangues." },
  { signe: ",", phrase: "Après la pluie, la ravine gronde." },
  { signe: ",", phrase: "Ce soir, nous mangeons sous la varangue." },
  { signe: ",", phrase: "Sur le sentier, les tamarins font de l'ombre." },
  { signe: "?", phrase: "Où est mon cahier ?" },
  { signe: "?", phrase: "Qui a pris la gomme ?" },
  { signe: "?", phrase: "Est-ce que le cari est prêt ?" },
  { signe: "?", phrase: "Combien de letchis as-tu ramassés ?" },
  { signe: "!", phrase: "Quel beau lagon !" },
  { signe: "!", phrase: "Comme le piton est haut !" },
  { signe: "!", phrase: "Que ce cari est bon !" },
  { signe: "!", phrase: "Quelle chaleur aujourd'hui !" },
];

/* ── Soixante-dix mots par minute ────────────────────────────────────────────
   Le repère chiffré du BO. On le fait calculer : c'est vérifiable sur un
   écran, et c'est exactement ce que l'élève chronomètre en classe. */

type Mesure = {
  readonly prenom: string;
  /** Écrit, jamais déduit du prénom : un prénom ne dit pas comment on parle
   *  de quelqu'un, et « Sarah » comme « Rémi » finissent par la même lettre
   *  que d'autres qui prennent l'autre pronom. */
  readonly pronom: string;
  readonly mots: number;
  readonly secondes: number;
  /** Le nombre de mots ramené à une minute entière. */
  readonly parMinute: number;
};

const MESURES: readonly Mesure[] = [
  { prenom: "Léa", pronom: "elle", mots: 30, secondes: 30, parMinute: 60 },
  { prenom: "Tom", pronom: "il", mots: 40, secondes: 30, parMinute: 80 },
  { prenom: "Sarah", pronom: "elle", mots: 35, secondes: 30, parMinute: 70 },
  { prenom: "Malik", pronom: "il", mots: 25, secondes: 30, parMinute: 50 },
  { prenom: "Nina", pronom: "elle", mots: 45, secondes: 30, parMinute: 90 },
  { prenom: "Karim", pronom: "il", mots: 60, secondes: 60, parMinute: 60 },
  { prenom: "Amina", pronom: "elle", mots: 75, secondes: 60, parMinute: 75 },
  { prenom: "Rémi", pronom: "il", mots: 20, secondes: 15, parMinute: 80 },
  { prenom: "Inès", pronom: "elle", mots: 15, secondes: 15, parMinute: 60 },
  { prenom: "Zoé", pronom: "elle", mots: 18, secondes: 15, parMinute: 72 },
];

export const fluenceLectureBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_FLUE_MOTS_CONNUS
  ========================================================= */
  {
    kind: "template",
    id: "ce1_flue_mots_connus_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_mots_connus",
    difficulty: 2,
    theme: "neutral",
    hint: "Certains mots reviennent dans toutes les phrases : on les reconnait sans les découper.",
    tags: ["ce1", "fluence", "mots-outils", "template"],
    generate: () => {
      const outil = randomChoice(MOTS_OUTILS);
      const rares = shuffle(MOTS_RARES).slice(0, 3);
      return {
        text: "Parmi ces mots, lequel se reconnait d'un seul coup d'œil, sans le découper ?",
        format: "qcm" as const,
        choices: makeChoices(outil, rares),
        expected: [outil],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quelques dizaines de mots reviennent dans presque toutes les phrases. Un bon lecteur les reconnait entiers, sans les déchiffrer.",
          "Demande-toi : est-ce que je l'ai déjà vu cent fois cette semaine ?",
          `« ${outil} » revient partout : il se lit d'un bloc. « ${rares[0]} » se rencontre rarement : il faut le découper pour le lire.`,
          `Le mot à reconnaitre d'un coup est « ${outil} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_flue_mots_connus_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_mots_connus",
    difficulty: 2,
    theme: "neutral",
    hint: "Un mot qu'on voit cent fois par jour ne se découpe plus.",
    tags: ["ce1", "fluence", "mots-outils", "template"],
    generate: () => {
      const courant = Math.random() < 0.5;
      const mot = courant ? randomChoice(MOTS_OUTILS) : randomChoice(MOTS_RARES);
      const bon = courant
        ? "il se reconnait d'un coup"
        : "il faut le découper pour le lire";
      return {
        text: `« ${mot} » : ce mot se reconnait-il d'un coup, ou faut-il le découper ?`,
        format: "qcm" as const,
        choices: ["il se reconnait d'un coup", "il faut le découper pour le lire"],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Lire vite, ce n'est pas déchiffrer vite : c'est déchiffrer de moins en moins souvent.",
          "Les mots très fréquents se photographient. Les mots rares se découpent, morceau par morceau.",
          courant
            ? `« ${mot} » est dans toutes les phrases : ton œil le prend entier.`
            : `« ${mot} » est rare : même un adulte le découpe la première fois.`,
          bon,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FLUE_CGP_COMPLEXES
  ========================================================= */
  {
    kind: "template",
    id: "ce1_flue_cgp_complexes_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_cgp_complexes",
    difficulty: 2,
    theme: "neutral",
    hint: "Certains groupes de lettres se lisent ensemble, d'un seul coup.",
    tags: ["ce1", "fluence", "cgp", "template"],
    generate: () => {
      const m = randomChoice(MOTS_NOUVEAUX);
      const autres = shuffle(MOTS_NOUVEAUX.filter((x) => x.mot !== m.mot))
        .slice(0, 3)
        .map((x) => x.decoupe);
      return {
        text: `Comment découpe-t-on le mot « ${m.mot} » pour le lire ?`,
        format: "qcm" as const,
        choices: makeChoices(m.decoupe, autres),
        expected: [m.decoupe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour lire un mot long, on le coupe en morceaux — mais jamais au milieu d'un groupe de lettres qui se lit ensemble.",
          "Repère d'abord les groupes qui se lisent d'un coup, puis coupe entre eux.",
          `${m.mot} → ${m.decoupe}. ${m.pourquoi}.`,
          `On découpe « ${m.decoupe} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FLUE_MOTS_NOUVEAUX — le piège de la lecture devinée
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_flue_mots_nouveaux_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_mots_nouveaux",
    difficulty: 3,
    theme: "neutral",
    text: "Tom voit le mot « château » et lit « chat ». Que s'est-il passé ?",
    format: "qcm",
    choices: [
      "Il a deviné sur le début, sans lire la fin",
      "Il a lu trop lentement",
      "Il a oublié la majuscule",
      "Le mot est mal écrit",
    ],
    expected: ["Il a deviné sur le début, sans lire la fin"],
    comparator: "mcq_exact",
    hint: "Regarde ce qu'il y a APRÈS « chat » dans le mot.",
    explanation: exp(
      "Deviner un mot sur ses premières lettres est l'erreur la plus fréquente quand on lit vite.",
      "Pose ton doigt sous le mot et fais-le glisser jusqu'au bout : ne t'arrête pas avant la dernière lettre.",
      "château commence comme chat, et ce n'est pas du tout le même mot. La vitesse ne vient pas de la devinette : elle vient de l'habitude.",
      "Il a deviné sur le début, sans lire la fin.",
    ),
    tags: ["ce1", "fluence", "mots-nouveaux", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_flue_mots_nouveaux_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_mots_nouveaux",
    difficulty: 3,
    theme: "neutral",
    hint: "Un mot connu se cache souvent au début d'un mot long. Ce n'est pas le bon.",
    tags: ["ce1", "fluence", "mots-nouveaux", "template"],
    generate: () => {
      const m = randomChoice(MOTS_NOUVEAUX);
      const autres = shuffle(MOTS_NOUVEAUX.filter((x) => x.mot !== m.mot))
        .slice(0, 2)
        .map((x) => x.piege);
      return {
        text: `Un élève lit « ${m.piege} » à la place de « ${m.mot} ». Quelle erreur a-t-il faite ?`,
        format: "qcm" as const,
        choices: shuffle([
          "Il s'est arrêté avant la fin du mot",
          "Il a lu le mot à l'envers",
          "Il a sauté la première lettre",
          "Il a lu un autre mot de la phrase",
        ]),
        expected: ["Il s'est arrêté avant la fin du mot"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Déchiffrer avec exactitude, c'est aller jusqu'à la dernière lettre — même quand on croit avoir reconnu le mot.",
          "Fais glisser ton doigt sous le mot entier avant de le dire.",
          `« ${m.piege} » est bien au début de « ${m.mot} », mais le mot ne s'arrête pas là. ${m.pourquoi}. Les mêmes erreurs se produisent avec « ${autres.join(" » et « ")} ».`,
          "Il s'est arrêté avant la fin du mot.",
        ),
      };
    },
  },

  /* =========================================================
     CE1_FLUE_PHRASE — la ponctuation
  ========================================================= */
  {
    kind: "template",
    id: "ce1_flue_phrase_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_phrase",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque signe demande quelque chose de précis à la voix.",
    tags: ["ce1", "fluence", "ponctuation", "template"],
    generate: () => {
      const s = randomChoice(SIGNES);
      const autres = SIGNES.filter((x) => x.signe !== s.signe).map((x) => x.voix);
      return {
        text: `Quand tu lis à voix haute et que tu vois « ${s.signe} » (${s.nom}), que fais-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(s.voix, autres),
        expected: [s.voix],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La ponctuation n'est pas une décoration : c'est la partition de la voix.",
          "Avant de lire une phrase à voix haute, repère ses signes du regard.",
          `Devant ${s.nom}, ${s.voix}. Sans ça, la phrase se dit d'un bloc et personne ne comprend.`,
          `Devant « ${s.signe} », ${s.voix}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_flue_phrase_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_phrase",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le dernier signe de la phrase.",
    tags: ["ce1", "fluence", "ponctuation", "template"],
    generate: () => {
      const s = randomChoice(SIGNES);
      const autres = SIGNES.filter((x) => x.nom !== s.nom).map((x) => x.nom);
      return {
        text: `Comment s'appelle le signe « ${s.signe} » ?`,
        format: "qcm" as const,
        choices: makeChoices(s.nom, autres),
        expected: [s.nom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque signe de ponctuation a un nom, et chacun demande autre chose à la voix.",
          "Apprends-les par paires : le signe, et ce qu'il fait faire à ta voix.",
          `« ${s.signe} » s'appelle ${s.nom} : ${s.voix}.`,
          `C'est ${s.nom}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FLUE_GROUPES_SOUFFLE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_flue_groupes_souffle_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_groupes_souffle",
    difficulty: 3,
    theme: "neutral",
    hint: "On respire entre deux groupes de mots qui vont ensemble, jamais au milieu.",
    tags: ["ce1", "fluence", "souffle", "template"],
    generate: () => {
      const g = randomChoice(SOUFFLES);
      return {
        text: `Les barres montrent où respirer. Quelle version se lit bien ?\n\n« ${g.phrase} »`,
        format: "qcm" as const,
        choices: makeChoices(g.bon, g.mauvais),
        expected: [g.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un groupe de souffle est un paquet de mots qui vont ensemble. On respire entre deux groupes, jamais au milieu.",
          "Lis la phrase dans ta tête et repère les paquets : qui fait l'action, ce qu'il fait, où et quand.",
          `« ${g.bon} » : chaque morceau tient debout tout seul. Couper ailleurs casse le sens, et l'auditeur perd le fil.`,
          `La bonne version est « ${g.bon} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FLUE_TEXTE_COURT
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_flue_texte_court_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_texte_court",
    difficulty: 2,
    theme: "neutral",
    text: "Avant de lire un texte à voix haute devant la classe, que vaut-il mieux faire ?",
    format: "qcm",
    choices: [
      "Le lire une fois dans sa tête, pour repérer les mots difficiles",
      "Se lancer tout de suite, sans regarder",
      "Apprendre le texte par cœur",
      "Lire seulement la première phrase",
    ],
    expected: ["Le lire une fois dans sa tête, pour repérer les mots difficiles"],
    comparator: "mcq_exact",
    hint: "Un lecteur qui trébuche est souvent un lecteur qui découvre le texte.",
    explanation: exp(
      "Lire à voix haute avec aisance demande de connaitre le texte avant de l'entendre sortir de sa bouche.",
      "Lis d'abord en silence : repère les mots longs, les noms propres, les endroits où respirer.",
      "Le BO demande une lecture « avec aisance ». L'aisance ne vient pas du hasard : elle vient de la première lecture, celle que personne n'entend.",
      "Il vaut mieux le lire une fois dans sa tête.",
    ),
    tags: ["ce1", "fluence", "texte-court", "methode", "qcm"],
  },

  {
    kind: "template",
    id: "ce1_flue_texte_court_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_texte_court",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère ce qui va te faire trébucher AVANT d'ouvrir la bouche.",
    tags: ["ce1", "fluence", "texte-court", "template"],
    generate: () => {
      const m = randomChoice(MOTS_NOUVEAUX);
      const outils = shuffle(MOTS_OUTILS).slice(0, 3);
      return {
        text: `Tu vas lire ce texte à voix haute devant la classe :\n\n« ${outils[0].charAt(0).toUpperCase() + outils[0].slice(1)} ${m.mot} est ${outils[1]} ${outils[2]} nous. »\n\nQuel mot vaut-il mieux préparer avant de lire ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, outils),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Lire un texte avec aisance, c'est avoir réglé les difficultés avant que la voix ne sorte.",
          "Parcours le texte du regard : les mots longs ou inconnus sont ceux qu'il faut préparer.",
          `« ${m.mot} » est le mot long : on le découpe d'abord dans sa tête — ${m.decoupe}. Les autres se reconnaissent d'un coup d'œil.`,
          `Le mot à préparer est « ${m.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FLUE_EXPRESSIVE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_flue_expressive_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_expressive",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis la phrase dans ta tête : qu'est-ce que ta voix devrait faire ?",
    tags: ["ce1", "fluence", "expressive", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_EXPRESSIVES);
      const s = SIGNES.find((x) => x.signe === p.signe) ?? SIGNES[0];
      const phrase = p.phrase;
      const autres = SIGNES.filter((x) => x.signe !== s.signe).map((x) => x.voix);
      return {
        text: `Comment lis-tu cette phrase à voix haute ?\n\n« ${phrase} »`,
        format: "qcm" as const,
        choices: makeChoices(s.voix, autres),
        expected: [s.voix],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Lire de manière expressive, c'est faire entendre ce que la phrase veut dire, pas seulement ses mots.",
          "Regarde le signe de la fin : c'est lui qui commande à ta voix.",
          `« ${phrase} » finit par ${s.nom} : ${s.voix}. Lue à plat, la même phrase ne dit plus rien.`,
          `On lit ainsi : ${s.voix}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_FLUE_70_MOTS — le repère chiffré du BO
  ========================================================= */
  {
    kind: "template",
    id: "ce1_flue_70_mots_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_70_mots",
    difficulty: 3,
    theme: "neutral",
    hint: "Ramène d'abord à une minute entière, puis compare à 70.",
    tags: ["ce1", "fluence", "70-mots", "template"],
    generate: () => {
      const m = randomChoice(MESURES);
      const facteur = 60 / m.secondes;
      return {
        text: `${m.prenom} lit ${m.mots} mots en ${m.secondes} secondes.\n\nCombien de mots lit-${m.pronom} en une minute ?`,
        format: "qcm" as const,
        choices: makeChoices(String(m.parMinute), [
          String(m.mots),
          String(m.parMinute + 10),
          String(m.parMinute - 10),
        ]),
        expected: [String(m.parMinute)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une minute fait soixante secondes. Pour comparer deux lecteurs, on ramène toujours à la minute entière.",
          `Regarde combien de fois ${m.secondes} secondes tiennent dans une minute, puis multiplie les mots par ce nombre.`,
          `${m.secondes} secondes × ${facteur} = 60 secondes. Donc ${m.mots} × ${facteur} = ${m.parMinute} mots par minute.`,
          `${m.prenom} lit ${m.parMinute} mots par minute.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_flue_70_mots_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_70_mots",
    difficulty: 3,
    theme: "neutral",
    hint: "Le BO demande 70 mots par minute en fin de CE1.",
    tags: ["ce1", "fluence", "70-mots", "template"],
    generate: () => {
      const m = randomChoice(MESURES);
      const atteint = m.parMinute >= 70;
      return {
        text: `En fin de CE1, on doit lire 70 mots par minute.\n\n${m.prenom} lit ${m.mots} mots en ${m.secondes} secondes. A-t-${m.pronom} atteint l'objectif ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: [atteint ? "oui" : "non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'objectif du CE1 est de soixante-dix mots par minute, lus correctement.",
          "Ramène d'abord la mesure à une minute entière, puis compare à 70.",
          `${m.mots} mots en ${m.secondes} secondes font ${m.parMinute} mots par minute. ${atteint ? `${m.parMinute} est bien au-dessus de 70.` : `${m.parMinute} est encore en dessous de 70 : il reste du chemin, et il se fait en lisant tous les jours.`}`,
          atteint ? "Oui, l'objectif est atteint." : "Non, pas encore.",
        ),
      };
    },
  },

  /* =========================================================
     CE1_FLUE_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "ce1_flue_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses : combien de mots par minute, et est-ce assez ?",
    tags: ["ce1", "fluence", "defi", "template"],
    generate: () => {
      const m = randomChoice(MESURES);
      const atteint = m.parMinute >= 70;
      const verdict = (ok: boolean) =>
        `l'objectif ${ok ? "est atteint" : "n'est pas encore atteint"}`;
      const bon = `${m.parMinute} mots par minute, et ${verdict(atteint)}`;
      // ⚠️ Quand la mesure dure déjà une minute, `mots` ÉGALE `parMinute` : le
      // troisième piège devenait alors mot pour mot la bonne réponse, et le
      // contrôle a signalé « proposition en double ». On dédoublonne les
      // NOMBRES avant d'en faire des phrases.
      const nombresFaux = [
        ...new Set([m.mots, m.parMinute + 10, Math.max(10, m.parMinute - 10)]),
      ].filter((n) => n !== m.parMinute);
      return {
        text: `${m.prenom} lit ${m.mots} mots en ${m.secondes} secondes. L'objectif du CE1 est de 70 mots par minute.\n\nQuelle réponse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${m.parMinute} mots par minute, et ${verdict(!atteint)}`,
          `${nombresFaux[0]} mots par minute, et ${verdict(nombresFaux[0] >= 70)}`,
          `${nombresFaux[1]} mots par minute, et ${verdict(nombresFaux[1] >= 70)}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse n'est juste que si les deux moitiés le sont : le calcul, ET la comparaison.",
          "Ramène à la minute, écris le nombre, puis seulement après compare-le à 70.",
          `${m.mots} mots en ${m.secondes} secondes → ${m.parMinute} mots par minute. ${m.parMinute} ${atteint ? "est supérieur ou égal à" : "est inférieur à"} 70.`,
          `La réponse juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_flue_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "fluence_lecture",
    microId: "ce1_flue_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève lit très vite, mais personne ne comprend ce qu'il raconte.\n\nQu'est-ce qui lui manque ?",
    format: "qcm",
    choices: [
      "Les pauses : il ne s'arrête ni aux points ni aux virgules.",
      // LE piège : croire que la vitesse est le but, et en redemander.
      "De la vitesse : il doit lire encore plus vite.",
      "Du volume : il doit lire plus fort.",
      "Des mots : le texte est trop court.",
    ],
    expected: ["Les pauses : il ne s'arrête ni aux points ni aux virgules."],
    comparator: "mcq_exact",
    hint: "Que fait-il des points et des virgules ?",
    explanation: exp(
      "Lire vite ne suffit pas : il faut respecter la ponctuation et respirer entre les groupes de mots.",
      "Repère les signes avant de lire, et fais une vraie pause à chacun.",
      "Une phrase lue d'un seul souffle arrive à l'auditeur comme un bloc. Ce sont les pauses qui découpent le sens — c'est pour ça que le BO demande la vitesse ET la ponctuation.",
      "Il lui manque les pauses : la ponctuation et les groupes de souffle.",
    ),
    tags: ["ce1", "fluence", "defi", "methode", "qcm"],
  },
];
