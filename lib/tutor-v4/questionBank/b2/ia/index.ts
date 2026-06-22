// lib/tutor-v4/questionBank/b2/ia/index.ts
//
// Coach IA - Niveau B2 « Je cree »
//
// REGLE DE DESIGN (option D, comme A1/A2/B1/maths seconde) :
//   - fixed   : reperes, methodes, idees-cles a fixer.
//   - template: variete (pools vrai-faux / mises en situation / classement).
//   - QCM dominant avec de VRAIS distracteurs (le moteur melange les choix).
//   - short UNIQUEMENT numerique non ambigu (comptage).
//   - pas de format `open` pour l'instant (clavier mobile).
//
// 3 notions / 11 micro-competences, ~10 questions par micro, difficultes 1->5.
// Theme : creer avec l'IA (prompt avance, iteration, production, qualite/responsabilite).

import type { TutorBankItemV4, TutorBankItemTemplateV4 } from "@/lib/tutor-v4/types";

// --------------------------------------------------------------------------
// Helpers (memes patterns que A1/A2/B1)
// --------------------------------------------------------------------------

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function exp(essentiel: string, pourquoi: string, exemple: string, retenir: string) {
  return (
    `L'essentiel : ${essentiel}\n\n` +
    `Pourquoi : ${pourquoi}\n\n` +
    `Exemple : ${exemple}\n\n` +
    `A retenir : ${retenir}`
  );
}

type VF = { t: string; ok: boolean; ex: string };

function vraiFauxTemplate(opts: {
  id: string;
  microId: string;
  notionId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  pool: VF[];
  hint?: string;
  theme?: TutorBankItemTemplateV4["theme"];
}): TutorBankItemTemplateV4 {
  return {
    kind: "template",
    id: opts.id,
    niveau: "b2",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint ?? "Pense a une production de qualite, verifiee et responsable.",
    tags: ["b2", "ia", "vrai-faux", "template"],
    generate: () => {
      const s = pick(opts.pool);
      return {
        text: `Vrai ou faux ?\n\n« ${s.t} »`,
        format: "qcm",
        choices: ["Vrai", "Faux"],
        expected: [s.ok ? "Vrai" : "Faux"],
        comparator: "mcq_exact",
        explanation: exp(
          s.ok ? "Cette affirmation est vraie." : "Cette affirmation est fausse.",
          s.ex,
          "Creer avec l'IA = piloter, verifier et assumer le resultat.",
          s.ok ? "Vrai." : "Faux."
        ),
      };
    },
  };
}

type ScenarioQ = { q: string; correct: string; wrong: string[]; why: string };

function scenarioTemplate(opts: {
  id: string;
  microId: string;
  notionId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  pool: ScenarioQ[];
  hint: string;
  theme?: TutorBankItemTemplateV4["theme"];
}): TutorBankItemTemplateV4 {
  return {
    kind: "template",
    id: opts.id,
    niveau: "b2",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint,
    tags: ["b2", "ia", "situation", "template"],
    generate: () => {
      const s = pick(opts.pool);
      return {
        text: s.q,
        format: "qcm",
        choices: [s.correct, ...s.wrong],
        expected: [s.correct],
        comparator: "mcq_exact",
        explanation: exp(`Bonne reponse : ${s.correct}`, s.why, "On cree avec methode, puis on verifie et on assume.", s.correct),
      };
    },
  };
}

// --------------------------------------------------------------------------
// NOTION 1 — Methode : prompt avance et iteration
// --------------------------------------------------------------------------

const promptStructure: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_structure_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_prompt_avance",
    microId: "ia_b2_prompt_structure",
    difficulty: 2,
    theme: "neutral",
    text: "Un prompt avance bien construit contient souvent :",
    format: "qcm",
    choices: [
      "Un role, un contexte, une tache, des contraintes et un format attendu.",
      "Un seul mot, sans rien d'autre.",
      "Uniquement le mot « svp ».",
      "La date du jour, c'est tout.",
    ],
    expected: ["Un role, un contexte, une tache, des contraintes et un format attendu."],
    comparator: "mcq_exact",
    hint: "Role + contexte + tache + contraintes + format.",
    explanation: exp(
      "Un bon prompt avance precise role, contexte, tache, contraintes et format.",
      "Chaque element guide l'IA vers exactement ce que tu veux.",
      "« Tu es prof d'histoire (role)... fais un quiz de 5 questions (tache+format)... ».",
      "Prompt avance = role + contexte + tache + contraintes + format."
    ),
    tags: ["b2", "ia", "prompt", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_structure_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_prompt_avance",
    microId: "ia_b2_prompt_structure",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le prompt « Tu es un journaliste sportif », que precise-t-on ?",
    format: "qcm",
    choices: [
      "Le role (le point de vue) que l'IA doit adopter.",
      "Le format de sortie.",
      "La longueur exacte du texte.",
      "La langue interdite.",
    ],
    expected: ["Le role (le point de vue) que l'IA doit adopter."],
    comparator: "mcq_exact",
    hint: "« Tu es un... » definit un role.",
    explanation: exp(
      "« Tu es un... » fixe le role/point de vue de l'IA.",
      "Le role oriente le ton et le vocabulaire de la reponse.",
      "Un « journaliste sportif » ecrira autrement qu'un « scientifique ».",
      "« Tu es un... » = definir le role."
    ),
    tags: ["b2", "ia", "prompt", "sport", "qcm"],
  },
  {
    kind: "template",
    id: "b2_ia_structure_tpl",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_prompt_avance",
    microId: "ia_b2_prompt_structure",
    difficulty: 3,
    theme: "neutral",
    hint: "Role / contexte / tache / contrainte / format : a quoi correspond ce morceau ?",
    tags: ["b2", "ia", "prompt", "template"],
    generate: () => {
      const items = [
        { p: "Tu es un professeur de SVT.", rep: "Le role" },
        { p: "Pour des eleves de 5e qui debutent.", rep: "Le contexte" },
        { p: "Redige un resume du chapitre.", rep: "La tache" },
        { p: "En 5 phrases maximum.", rep: "Une contrainte" },
        { p: "Presente-le sous forme de liste a puces.", rep: "Le format" },
      ];
      const it = pick(items);
      return {
        text: `Dans un prompt, a quoi correspond ce morceau ?\n\n« ${it.p} »`,
        format: "qcm",
        choices: ["Le role", "Le contexte", "La tache", "Une contrainte", "Le format"],
        expected: [it.rep],
        comparator: "mcq_exact",
        explanation: exp(
          `Ici : ${it.rep.toLowerCase()}.`,
          "Distinguer ces elements aide a ecrire des prompts complets et efficaces.",
          "Role (qui), contexte (pour qui/quoi), tache (quoi faire), contrainte (limites), format (forme).",
          `${it.rep}.`
        ),
      };
    },
  },
  vraiFauxTemplate({
    id: "b2_ia_structure_vf",
    microId: "ia_b2_prompt_structure",
    notionId: "ia_b2_prompt_avance",
    difficulty: 2,
    pool: [
      { t: "Donner un role a l'IA (« tu es... ») oriente le ton de la reponse.", ok: true, ex: "Le role guide le point de vue et le vocabulaire." },
      { t: "Preciser des contraintes (longueur, niveau) ameliore le resultat.", ok: true, ex: "Les contraintes cadrent la production." },
      { t: "Un prompt d'un seul mot vague donne toujours le meilleur resultat.", ok: false, ex: "Trop vague : l'IA doit deviner et s'eloigne du besoin." },
      { t: "Indiquer le format attendu fait partie d'un bon prompt avance.", ok: true, ex: "Le format structure la reponse comme on le veut." },
    ],
  }),
];

const iteration: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_iteration_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_prompt_avance",
    microId: "ia_b2_iteration",
    difficulty: 2,
    theme: "neutral",
    text: "« Iterer » avec l'IA pour ameliorer un resultat, ca veut dire :",
    format: "qcm",
    choices: [
      "Affiner pas a pas en redemandant des ameliorations precises.",
      "Tout recommencer de zero a chaque fois.",
      "Garder la premiere version quoi qu'il arrive.",
      "Changer de sujet.",
    ],
    expected: ["Affiner pas a pas en redemandant des ameliorations precises."],
    comparator: "mcq_exact",
    hint: "Iterer = ameliorer par etapes.",
    explanation: exp(
      "Iterer, c'est ameliorer progressivement le resultat.",
      "On garde ce qui marche et on corrige le reste, etape par etape.",
      "« C'est bien, mais raccourcis l'intro et ajoute un exemple. »",
      "Iterer = affiner pas a pas."
    ),
    tags: ["b2", "ia", "iteration", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_iteration_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_prompt_avance",
    microId: "ia_b2_iteration",
    difficulty: 3,
    theme: "neutral",
    text: "Une production IA est presque bonne mais l'intro est trop longue. Meilleure relance ?",
    format: "qcm",
    choices: [
      "« Garde tout, mais reduis l'introduction a 2 phrases. »",
      "« Recommence tout. »",
      "« Non. »",
      "« Change de sujet. »",
    ],
    expected: ["« Garde tout, mais reduis l'introduction a 2 phrases. »"],
    comparator: "mcq_exact",
    hint: "On corrige le point precis, on garde le reste.",
    explanation: exp(
      "On cible le point a corriger sans jeter ce qui marche.",
      "Une relance precise est plus efficace qu'un « recommence ».",
      "« Reduis l'intro a 2 phrases » garde le bon contenu et corrige le defaut.",
      "Iteration efficace = corriger le point precis."
    ),
    tags: ["b2", "ia", "iteration", "qcm"],
  },
  vraiFauxTemplate({
    id: "b2_ia_iteration_vf",
    microId: "ia_b2_iteration",
    notionId: "ia_b2_prompt_avance",
    difficulty: 2,
    pool: [
      { t: "On peut ameliorer une production IA en plusieurs etapes.", ok: true, ex: "L'iteration affine le resultat petit a petit." },
      { t: "Une relance precise (« raccourcis l'intro ») est plus utile qu'un vague « refais ».", ok: true, ex: "Elle dit exactement quoi changer." },
      { t: "La premiere version de l'IA est toujours la meilleure possible.", ok: false, ex: "On peut presque toujours l'ameliorer en iterant." },
    ],
  }),
];

const choisirVersion: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_version_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_prompt_avance",
    microId: "ia_b2_choisir_version",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi demander a l'IA plusieurs versions d'un texte ?",
    format: "qcm",
    choices: [
      "Pour comparer et choisir la meilleure selon mon objectif.",
      "Pour perdre du temps.",
      "Parce que la quantite vaut la qualite.",
      "Pour ne jamais decider.",
    ],
    expected: ["Pour comparer et choisir la meilleure selon mon objectif."],
    comparator: "mcq_exact",
    hint: "Plusieurs versions = un choix eclaire.",
    explanation: exp(
      "Generer plusieurs versions permet de comparer et de choisir.",
      "On garde celle qui colle le mieux au but vise.",
      "« Propose 3 titres » puis je choisis le plus clair.",
      "Plusieurs versions -> je compare et je choisis."
    ),
    tags: ["b2", "ia", "choix", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_version_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_prompt_avance",
    microId: "ia_b2_choisir_version",
    difficulty: 3,
    theme: "neutral",
    text: "Tu as 3 versions d'une affiche. Comment choisir la meilleure ?",
    format: "qcm",
    choices: [
      "En la jugeant sur des criteres (clarte, public vise, exactitude).",
      "En prenant la plus longue.",
      "En tirant au hasard.",
      "En prenant la premiere venue sans regarder.",
    ],
    expected: ["En la jugeant sur des criteres (clarte, public vise, exactitude)."],
    comparator: "mcq_exact",
    hint: "On choisit avec des criteres, pas au hasard.",
    explanation: exp(
      "On choisit en s'appuyant sur des criteres clairs.",
      "Cela rend le choix justifiable et adapte a l'objectif.",
      "Clarte, public, exactitude : une grille simple pour decider.",
      "Choisir = comparer selon des criteres."
    ),
    tags: ["b2", "ia", "choix", "qcm"],
  },
  vraiFauxTemplate({
    id: "b2_ia_version_vf",
    microId: "ia_b2_choisir_version",
    notionId: "ia_b2_prompt_avance",
    difficulty: 2,
    pool: [
      { t: "Comparer plusieurs versions aide a faire un meilleur choix.", ok: true, ex: "On retient celle qui sert le mieux l'objectif." },
      { t: "Choisir au hasard vaut mieux que choisir selon des criteres.", ok: false, ex: "Des criteres rendent le choix justifie et adapte." },
      { t: "Je dois pouvoir expliquer pourquoi j'ai choisi cette version.", ok: true, ex: "Justifier son choix montre qu'on a reflechi." },
    ],
  }),
];

const donnerExemples: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_exemples_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_prompt_avance",
    microId: "ia_b2_donner_exemples",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi montrer un EXEMPLE du resultat voulu a l'IA ?",
    format: "qcm",
    choices: [
      "Pour qu'elle imite le style et le format que j'attends.",
      "Pour la perturber.",
      "Cela ne change rien du tout.",
      "Pour qu'elle refuse de repondre.",
    ],
    expected: ["Pour qu'elle imite le style et le format que j'attends."],
    comparator: "mcq_exact",
    hint: "Un exemple montre la cible a viser.",
    explanation: exp(
      "Donner un exemple guide l'IA vers le style/format vise.",
      "Elle s'aligne sur le modele que tu lui montres.",
      "« Ecris dans ce style : [exemple] » donne un resultat plus proche.",
      "Montrer un exemple = guider le style attendu."
    ),
    tags: ["b2", "ia", "exemple", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_exemples_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_prompt_avance",
    microId: "ia_b2_donner_exemples",
    difficulty: 3,
    theme: "neutral",
    text: "Tu veux des slogans courts et percutants. Quelle methode aide le plus ?",
    format: "qcm",
    choices: [
      "Donner 1 ou 2 exemples de slogans que tu aimes, puis demander d'autres dans ce style.",
      "Demander « fais des slogans » sans aucun repere.",
      "Interdire tout exemple.",
      "Donner un texte sans rapport.",
    ],
    expected: ["Donner 1 ou 2 exemples de slogans que tu aimes, puis demander d'autres dans ce style."],
    comparator: "mcq_exact",
    hint: "Quelques exemples cadrent le style.",
    explanation: exp(
      "Fournir quelques exemples du style voulu oriente fortement la production.",
      "L'IA repere le ton, la longueur et le rythme attendus.",
      "2 slogans modeles -> les suivants leur ressemblent.",
      "Quelques exemples = production plus ciblee."
    ),
    tags: ["b2", "ia", "exemple", "qcm"],
  },
  vraiFauxTemplate({
    id: "b2_ia_exemples_vf",
    microId: "ia_b2_donner_exemples",
    notionId: "ia_b2_prompt_avance",
    difficulty: 2,
    pool: [
      { t: "Montrer un exemple du resultat voulu aide l'IA a s'aligner dessus.", ok: true, ex: "Elle imite le style et le format montres." },
      { t: "Donner des exemples ne sert jamais a rien.", ok: false, ex: "Au contraire, c'est l'un des leviers les plus efficaces." },
      { t: "Quelques exemples bien choisis cadrent mieux qu'une longue explication vague.", ok: true, ex: "L'exemple est concret et imitable directement." },
    ],
  }),
];

// --------------------------------------------------------------------------
// NOTION 2 — Production creative
// --------------------------------------------------------------------------

const creerContenu: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_contenu_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_production",
    microId: "ia_b2_creer_contenu",
    difficulty: 1,
    theme: "neutral",
    text: "Pour creer une affiche d'evenement avec l'IA, quel prompt est le meilleur ?",
    format: "qcm",
    choices: [
      "« Propose le texte d'une affiche pour un tournoi de foot le 5 juin, ton dynamique, 4 infos cles. »",
      "« affiche. »",
      "« fais un truc joli. »",
      "« sport. »",
    ],
    expected: ["« Propose le texte d'une affiche pour un tournoi de foot le 5 juin, ton dynamique, 4 infos cles. »"],
    comparator: "mcq_exact",
    hint: "Sujet + ton + infos cles.",
    explanation: exp(
      "Un bon prompt de creation precise le sujet, le ton et le contenu.",
      "L'IA produit alors une base directement utilisable.",
      "Tournoi + date + ton dynamique + 4 infos : tout est cadre.",
      "Creer = preciser sujet, ton et contenu attendu."
    ),
    tags: ["b2", "ia", "production", "sport", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_contenu_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_production",
    microId: "ia_b2_creer_contenu",
    difficulty: 2,
    theme: "neutral",
    text: "Apres avoir genere une affiche, quelle est la bonne suite ?",
    format: "qcm",
    choices: [
      "Verifier les infos (date, lieu) et l'ajuster avant de la diffuser.",
      "La diffuser aussitot sans relire.",
      "Supposer que tout est exact.",
      "Ne jamais la verifier.",
    ],
    expected: ["Verifier les infos (date, lieu) et l'ajuster avant de la diffuser."],
    comparator: "mcq_exact",
    hint: "On verifie avant de diffuser.",
    explanation: exp(
      "Une production IA se verifie et s'ajuste avant diffusion.",
      "Une date ou un lieu faux dans une affiche pose un vrai probleme.",
      "On controle les infos cles puis on corrige si besoin.",
      "Creer avec l'IA = verifier avant de diffuser."
    ),
    tags: ["b2", "ia", "production", "qcm"],
  },
  scenarioTemplate({
    id: "b2_ia_contenu_scn",
    microId: "ia_b2_creer_contenu",
    notionId: "ia_b2_production",
    difficulty: 2,
    hint: "Quel prompt produit le contenu le plus utile ?",
    pool: [
      {
        q: "Tu veux un quiz de revision avec l'IA. Quel prompt est le meilleur ?",
        correct: "« Cree un quiz de 8 questions sur la photosynthese, niveau 5e, avec les corrections. »",
        wrong: ["« quiz. »", "« pose des questions. »"],
        why: "Il precise sujet, nombre, niveau et la presence des corrections.",
      },
      {
        q: "Tu prepares une presentation sur l'ecologie. Quel prompt aide le plus ?",
        correct: "« Propose un plan de presentation en 5 parties sur le tri des dechets, pour des collegiens. »",
        wrong: ["« ecologie. »", "« presentation stp. »"],
        why: "Il donne le format (plan en 5 parties), le sujet precis et le public.",
      },
    ],
  }),
];

const prototypeSimple: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_prototype_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_production",
    microId: "ia_b2_prototype_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'une « maquette » (ou prototype simple) ?",
    format: "qcm",
    choices: [
      "Une premiere version simplifiee pour tester une idee.",
      "La version finale parfaite et terminee.",
      "Un document impossible a modifier.",
      "Le prix d'un produit.",
    ],
    expected: ["Une premiere version simplifiee pour tester une idee."],
    comparator: "mcq_exact",
    hint: "Maquette = brouillon pour tester.",
    explanation: exp(
      "Une maquette est une version simple qui sert a tester une idee.",
      "Elle permet d'avoir des retours avant d'investir trop de travail.",
      "Un croquis d'appli ou une page d'exemple est une maquette.",
      "Maquette = premiere version pour tester."
    ),
    tags: ["b2", "ia", "prototype", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_prototype_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_production",
    microId: "ia_b2_prototype_simple",
    difficulty: 3,
    theme: "neutral",
    text: "A quoi sert surtout une maquette faite avec l'aide de l'IA ?",
    format: "qcm",
    choices: [
      "A montrer l'idee et recueillir des retours pour l'ameliorer.",
      "A remplacer definitivement le travail humain.",
      "A cacher l'idee aux autres.",
      "A rendre l'idee impossible a changer.",
    ],
    expected: ["A montrer l'idee et recueillir des retours pour l'ameliorer."],
    comparator: "mcq_exact",
    hint: "Tester l'idee, recolter des retours.",
    explanation: exp(
      "La maquette sert a tester et a recueillir des retours.",
      "On ajuste l'idee grace aux remarques avant de finaliser.",
      "On montre la maquette a des camarades pour l'ameliorer.",
      "Maquette = tester et ameliorer grace aux retours."
    ),
    tags: ["b2", "ia", "prototype", "qcm"],
  },
  vraiFauxTemplate({
    id: "b2_ia_prototype_vf",
    microId: "ia_b2_prototype_simple",
    notionId: "ia_b2_production",
    difficulty: 2,
    pool: [
      { t: "Une maquette est une premiere version simplifiee pour tester une idee.", ok: true, ex: "Elle sert a obtenir des retours rapidement." },
      { t: "Une maquette doit etre parfaite et finale des le depart.", ok: false, ex: "Son but est justement d'evoluer avec les retours." },
      { t: "Les retours sur une maquette aident a l'ameliorer.", ok: true, ex: "On corrige avant d'investir trop de travail." },
    ],
  }),
];

const adapterPublic: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_public_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_production",
    microId: "ia_b2_adapter_public",
    difficulty: 2,
    theme: "neutral",
    text: "Tu ecris le meme message pour des CP et pour des adultes. Que dois-tu changer ?",
    format: "qcm",
    choices: [
      "Le ton, le vocabulaire et la longueur, selon le public.",
      "Rien : un seul texte pour tout le monde.",
      "Seulement la couleur du titre.",
      "Uniquement la date.",
    ],
    expected: ["Le ton, le vocabulaire et la longueur, selon le public."],
    comparator: "mcq_exact",
    hint: "On adapte au public vise.",
    explanation: exp(
      "Un bon contenu s'adapte a son public.",
      "Le ton et le vocabulaire ne sont pas les memes pour des CP ou des adultes.",
      "« Reecris ce texte pour des enfants de 6 ans » change tout.",
      "Adapter = ajuster ton, vocabulaire et longueur au public."
    ),
    tags: ["b2", "ia", "public", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_public_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_production",
    microId: "ia_b2_adapter_public",
    difficulty: 2,
    theme: "neutral",
    text: "Comment demander a l'IA d'adapter un texte a un public precis ?",
    format: "qcm",
    choices: [
      "« Reecris ce texte pour des eleves de 6e, ton simple et encourageant. »",
      "« Change-le. »",
      "« Fais mieux. »",
      "« Autre. »",
    ],
    expected: ["« Reecris ce texte pour des eleves de 6e, ton simple et encourageant. »"],
    comparator: "mcq_exact",
    hint: "Precise le public ET le ton.",
    explanation: exp(
      "On precise le public et le ton voulus.",
      "L'IA ajuste alors le niveau de langue et le style.",
      "Public (6e) + ton (simple, encourageant) = texte adapte.",
      "Adapter = dire le public et le ton attendus."
    ),
    tags: ["b2", "ia", "public", "qcm"],
  },
  vraiFauxTemplate({
    id: "b2_ia_public_vf",
    microId: "ia_b2_adapter_public",
    notionId: "ia_b2_production",
    difficulty: 2,
    pool: [
      { t: "On adapte le ton et le vocabulaire au public vise.", ok: true, ex: "Un message pour enfants differe d'un message pour adultes." },
      { t: "Un seul texte convient parfaitement a tous les publics.", ok: false, ex: "Le bon contenu s'ajuste a qui va le lire." },
      { t: "Preciser le public dans le prompt aide l'IA a adapter sa reponse.", ok: true, ex: "Elle regle alors le niveau de langue et le style." },
    ],
  }),
];

// --------------------------------------------------------------------------
// NOTION 3 — Qualite, verification et responsabilite
// --------------------------------------------------------------------------

const verifierAmeliorer: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_verifier_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_qualite_responsabilite",
    microId: "ia_b2_verifier_ameliorer",
    difficulty: 1,
    theme: "neutral",
    text: "Avant de diffuser un contenu cree avec l'IA, la bonne pratique est :",
    format: "qcm",
    choices: [
      "Verifier les faits, corriger les erreurs et soigner la qualite.",
      "Le publier tel quel sans relire.",
      "Supposer qu'il est parfait.",
      "Le diffuser plus c'est rapide mieux c'est.",
    ],
    expected: ["Verifier les faits, corriger les erreurs et soigner la qualite."],
    comparator: "mcq_exact",
    hint: "On controle avant de publier.",
    explanation: exp(
      "On verifie et on ameliore une production IA avant diffusion.",
      "L'IA peut faire des erreurs de fait ou de qualite.",
      "On relit, on corrige les dates/chiffres, on ameliore le style.",
      "Verifier et corriger avant de diffuser."
    ),
    tags: ["b2", "ia", "qualite", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_verifier_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_qualite_responsabilite",
    microId: "ia_b2_verifier_ameliorer",
    difficulty: 2,
    theme: "neutral",
    text: "Une presentation generee contient une « statistique » sans source. Que fais-tu ?",
    format: "qcm",
    choices: [
      "Je verifie le chiffre, et je le retire ou le source s'il est juste.",
      "Je le laisse, ca fait serieux.",
      "J'invente une source.",
      "Je le mets en plus gros pour qu'on le croie.",
    ],
    expected: ["Je verifie le chiffre, et je le retire ou le source s'il est juste."],
    comparator: "mcq_exact",
    hint: "Pas de chiffre non verifie dans une diffusion.",
    explanation: exp(
      "On ne diffuse pas un chiffre non verifie.",
      "L'IA peut inventer des statistiques credibles mais fausses.",
      "On verifie : si c'est juste on cite la source, sinon on retire.",
      "Chiffre sans source = a verifier avant diffusion."
    ),
    tags: ["b2", "ia", "qualite", "qcm"],
  },
  vraiFauxTemplate({
    id: "b2_ia_verifier_vf",
    microId: "ia_b2_verifier_ameliorer",
    notionId: "ia_b2_qualite_responsabilite",
    difficulty: 2,
    pool: [
      { t: "Une production IA doit etre verifiee et corrigee avant diffusion.", ok: true, ex: "Elle peut contenir des erreurs de fait ou de qualite." },
      { t: "Un chiffre donne par l'IA peut etre diffuse sans verification.", ok: false, ex: "Il peut etre invente : on verifie d'abord." },
      { t: "Ameliorer la qualite (clarte, mise en forme) fait partie du travail.", ok: true, ex: "Le rendu final reste sous ma responsabilite." },
    ],
  }),
];

const documenterRoleIa: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_documenter_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_qualite_responsabilite",
    microId: "ia_b2_documenter_role_ia",
    difficulty: 2,
    theme: "neutral",
    text: "« Documenter le role de l'IA » dans un projet, ca veut dire :",
    format: "qcm",
    choices: [
      "Expliquer ce que l'IA a produit et ce que j'ai modifie moi-meme.",
      "Cacher que l'IA a aide.",
      "Dire que tout vient de l'IA.",
      "Ne rien noter du tout.",
    ],
    expected: ["Expliquer ce que l'IA a produit et ce que j'ai modifie moi-meme."],
    comparator: "mcq_exact",
    hint: "Tracer la part de l'IA et la part humaine.",
    explanation: exp(
      "Documenter, c'est preciser ce qui vient de l'IA et ce que j'ai fait.",
      "C'est une marque d'honnetete et de serieux.",
      "« Plan genere par l'IA, textes reecrits et verifies par moi. »",
      "Documenter = tracer la part IA et la part humaine."
    ),
    tags: ["b2", "ia", "documenter", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_documenter_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_qualite_responsabilite",
    microId: "ia_b2_documenter_role_ia",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi documenter l'usage de l'IA dans un travail rendu ?",
    format: "qcm",
    choices: [
      "Pour rester honnete et permettre de comprendre comment le travail a ete fait.",
      "Pour tromper le correcteur.",
      "Cela n'a aucun interet.",
      "Pour rallonger artificiellement le devoir.",
    ],
    expected: ["Pour rester honnete et permettre de comprendre comment le travail a ete fait."],
    comparator: "mcq_exact",
    hint: "Transparence = confiance.",
    explanation: exp(
      "Documenter l'usage de l'IA, c'est etre transparent.",
      "Cela montre ta demarche et ce que tu as reellement apporte.",
      "De plus en plus d'enseignants le demandent explicitement.",
      "Documenter = transparence et honnetete."
    ),
    tags: ["b2", "ia", "documenter", "qcm"],
  },
  vraiFauxTemplate({
    id: "b2_ia_documenter_vf",
    microId: "ia_b2_documenter_role_ia",
    notionId: "ia_b2_qualite_responsabilite",
    difficulty: 2,
    pool: [
      { t: "Indiquer ce que l'IA a produit et ce que j'ai modifie est honnete.", ok: true, ex: "On distingue la part IA et la part humaine." },
      { t: "Documenter l'usage de l'IA est souvent demande dans les travaux.", ok: true, ex: "La transparence devient une regle courante." },
      { t: "Mieux vaut cacher qu'on a utilise une IA.", ok: false, ex: "La transparence est plus honnete et de plus en plus attendue." },
    ],
  }),
];

const droitsContenu: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_droits_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_qualite_responsabilite",
    microId: "ia_b2_droits_contenu",
    difficulty: 2,
    theme: "neutral",
    text: "Tu generes une image avec l'IA pour un concours. Quelle precaution prendre ?",
    format: "qcm",
    choices: [
      "Verifier les regles du concours sur l'IA et mentionner que l'image est generee.",
      "Pretendre que je l'ai dessinee a la main.",
      "L'utiliser sans me poser de question.",
      "Affirmer qu'aucune regle ne s'applique jamais.",
    ],
    expected: ["Verifier les regles du concours sur l'IA et mentionner que l'image est generee."],
    comparator: "mcq_exact",
    hint: "Regles d'usage + mention « generee par IA ».",
    explanation: exp(
      "Un contenu cree par IA pose des questions de droits et de mentions.",
      "Certaines regles interdisent ou encadrent les images generees.",
      "On verifie le reglement et on signale que l'image est generee par IA.",
      "Contenu IA = verifier les regles et le mentionner."
    ),
    tags: ["b2", "ia", "droits", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_droits_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_qualite_responsabilite",
    microId: "ia_b2_droits_contenu",
    difficulty: 3,
    theme: "neutral",
    text: "Tu demandes a l'IA une image « dans le style exact » d'un artiste vivant precis. Le souci possible ?",
    format: "qcm",
    choices: [
      "Imiter le style d'un artiste sans accord pose un probleme de respect et de droits.",
      "Aucun souci, on peut tout copier librement.",
      "C'est interdit de creer une image, toujours.",
      "Le seul souci est la taille du fichier.",
    ],
    expected: ["Imiter le style d'un artiste sans accord pose un probleme de respect et de droits."],
    comparator: "mcq_exact",
    hint: "Copier le travail d'autrui n'est pas neutre.",
    explanation: exp(
      "Reproduire le style precis d'un artiste sans accord pose un probleme.",
      "Cela touche au respect du travail et aux droits des createurs.",
      "Mieux vaut s'inspirer largement et creer quelque chose de personnel.",
      "Imiter un artiste precis sans accord = probleme de droits/respect."
    ),
    tags: ["b2", "ia", "droits", "qcm"],
  },
  vraiFauxTemplate({
    id: "b2_ia_droits_vf",
    microId: "ia_b2_droits_contenu",
    notionId: "ia_b2_qualite_responsabilite",
    difficulty: 2,
    pool: [
      { t: "Un contenu genere par IA peut poser des questions de droits.", ok: true, ex: "Usage, mentions, style copie : ce n'est pas neutre." },
      { t: "Mentionner qu'une image est generee par IA est une bonne pratique.", ok: true, ex: "La transparence evite de tromper le public." },
      { t: "On peut copier le style exact d'un artiste vivant sans aucun probleme.", ok: false, ex: "Cela touche au respect et aux droits du createur." },
      { t: "Tout ce que produit l'IA m'appartient sans aucune condition.", ok: false, ex: "Les regles d'usage varient et il faut s'en informer." },
    ],
  }),
];

const eviterDesinfo: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b2_ia_desinfo_1",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_qualite_responsabilite",
    microId: "ia_b2_eviter_desinfo",
    difficulty: 2,
    theme: "neutral",
    text: "Un camarade veut creer une fausse photo realiste d'un prof pour « faire une blague » en ligne. Que dire ?",
    format: "qcm",
    choices: [
      "Ne pas le faire : une fausse image peut nuire et tromper les gens.",
      "Le faire, c'est juste drole.",
      "La diffuser largement pour rire.",
      "L'utiliser pour humilier quelqu'un.",
    ],
    expected: ["Ne pas le faire : une fausse image peut nuire et tromper les gens."],
    comparator: "mcq_exact",
    hint: "Creer du faux realiste sur une personne = danger.",
    explanation: exp(
      "On ne cree pas de faux contenu realiste sur une personne.",
      "Cela peut nuire a sa reputation et tromper le public (desinformation).",
      "Une « blague » deepfake peut avoir de vraies consequences, y compris legales.",
      "Pas de faux contenu trompeur sur les gens."
    ),
    tags: ["b2", "ia", "desinformation", "qcm"],
  },
  {
    kind: "fixed",
    id: "b2_ia_desinfo_2",
    niveau: "b2",
    matiere: "ia",
    notionId: "ia_b2_qualite_responsabilite",
    microId: "ia_b2_eviter_desinfo",
    difficulty: 2,
    theme: "neutral",
    text: "Tu crees une image illustrative avec l'IA pour un article serieux. Bonne pratique ?",
    format: "qcm",
    choices: [
      "Indiquer que l'image est generee/illustrative pour ne pas tromper le lecteur.",
      "La faire passer pour une vraie photo de l'evenement.",
      "Affirmer qu'elle prouve un fait reel.",
      "La diffuser comme preuve authentique.",
    ],
    expected: ["Indiquer que l'image est generee/illustrative pour ne pas tromper le lecteur."],
    comparator: "mcq_exact",
    hint: "Ne pas faire passer du genere pour du reel.",
    explanation: exp(
      "On signale qu'une image est generee pour ne pas tromper.",
      "Faire passer une image IA pour une vraie photo, c'est desinformer.",
      "Une mention « image generee par IA » suffit a etre honnete.",
      "Image generee != preuve : on le signale."
    ),
    tags: ["b2", "ia", "desinformation", "qcm"],
  },
  vraiFauxTemplate({
    id: "b2_ia_desinfo_vf",
    microId: "ia_b2_eviter_desinfo",
    notionId: "ia_b2_qualite_responsabilite",
    difficulty: 2,
    pool: [
      { t: "Creer une fausse image realiste d'une personne pour tromper est irresponsable.", ok: true, ex: "Cela peut nuire et constituer de la desinformation." },
      { t: "Faire passer une image generee par IA pour une vraie photo, c'est honnete.", ok: false, ex: "C'est tromper le public : il faut le signaler." },
      { t: "Signaler qu'un visuel est genere par IA evite de desinformer.", ok: true, ex: "La transparence protege le lecteur." },
      { t: "Une « blague » deepfake n'a jamais de consequences.", ok: false, ex: "Elle peut blesser et avoir des suites, y compris legales." },
    ],
  }),
];

// --------------------------------------------------------------------------
// Banque complete B2
// --------------------------------------------------------------------------

export const iaB2QuestionBank: TutorBankItemV4[] = [
  // Notion 1 - Methode : prompt avance et iteration
  ...promptStructure,
  ...iteration,
  ...choisirVersion,
  ...donnerExemples,
  // Notion 2 - Production creative
  ...creerContenu,
  ...prototypeSimple,
  ...adapterPublic,
  // Notion 3 - Qualite, verification et responsabilite
  ...verifierAmeliorer,
  ...documenterRoleIa,
  ...droitsContenu,
  ...eviterDesinfo,
];

export function getIaB2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = iaB2QuestionBank;

  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);

  return bank;
}
