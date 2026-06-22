// lib/tutor-v4/questionBank/a2/ia/index.ts
//
// Coach IA - Niveau A2 « J'utilise » (utiliser l'IA pour apprendre)
//
// REGLE DE DESIGN (option D, comme A1 / maths seconde) :
//   - fixed   : reperes, bons exemples, idees-cles a fixer.
//   - template: variete (pools vrai-faux / mises en situation / choix du meilleur prompt).
//   - QCM dominant avec de VRAIS distracteurs (le moteur melange les choix).
//   - short UNIQUEMENT numerique non ambigu (comptage).
//   - pas de format `open` pour l'instant (clavier mobile).
//
// 3 notions / 11 micro-competences, ~10 questions par micro, difficultes 1->5.

import type { TutorBankItemV4, TutorBankItemTemplateV4 } from "@/lib/tutor-v4/types";

// --------------------------------------------------------------------------
// Helpers (memes patterns que la banque A1)
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
    niveau: "a2",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint ?? "Pense a une bonne facon d'utiliser l'IA pour apprendre.",
    tags: ["a2", "ia", "vrai-faux", "template"],
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
          "On utilise l'IA pour comprendre et progresser, jamais pour penser a notre place.",
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
    niveau: "a2",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint,
    tags: ["a2", "ia", "situation", "template"],
    generate: () => {
      const s = pick(opts.pool);
      return {
        text: s.q,
        format: "qcm",
        choices: [s.correct, ...s.wrong],
        expected: [s.correct],
        comparator: "mcq_exact",
        explanation: exp(`Bonne reponse : ${s.correct}`, s.why, "On garde l'objectif d'apprendre, pas seulement d'avoir la reponse.", s.correct),
      };
    },
  };
}

// --------------------------------------------------------------------------
// NOTION 1 — Ecrire un bon prompt
// --------------------------------------------------------------------------

const promptClair: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_promptclair_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_prompt_clair",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce qu'un « prompt » bien ecrit ?",
    format: "qcm",
    choices: [
      "Une demande claire qui dit precisement ce que je veux obtenir.",
      "Un seul mot vague, au hasard.",
      "Une phrase tres longue et confuse.",
      "Le nom de l'IA, sans rien d'autre.",
    ],
    expected: ["Une demande claire qui dit precisement ce que je veux obtenir."],
    comparator: "mcq_exact",
    hint: "Clair et precis = meilleur resultat.",
    explanation: exp(
      "Un bon prompt est clair et precis sur l'objectif.",
      "Plus la demande est nette, plus la reponse est utile.",
      "« Explique le theoreme de Pythagore en 3 phrases simples » est clair.",
      "Bon prompt = demande claire et precise."
    ),
    tags: ["a2", "ia", "prompt", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_promptclair_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_prompt_clair",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces demandes, laquelle est le MEILLEUR prompt ?",
    format: "qcm",
    choices: [
      "« Donne-moi 3 idees pour commencer une lettre de motivation de stage. »",
      "« lettre. »",
      "« fais un truc. »",
      "« aide. »",
    ],
    expected: ["« Donne-moi 3 idees pour commencer une lettre de motivation de stage. »"],
    comparator: "mcq_exact",
    hint: "Lequel dit clairement quoi, combien, pour quoi ?",
    explanation: exp(
      "Le meilleur prompt precise la tache, la quantite et le but.",
      "« 3 idees », « lettre de motivation », « stage » : tout est clair.",
      "Les autres sont trop vagues : l'IA ne sait pas quoi faire.",
      "Un bon prompt dit quoi, combien et pour quoi."
    ),
    tags: ["a2", "ia", "prompt", "qcm"],
  },
  scenarioTemplate({
    id: "a2_ia_promptclair_scn",
    microId: "ia_a2_prompt_clair",
    notionId: "ia_a2_prompts",
    difficulty: 2,
    hint: "Choisis la demande la plus claire et precise.",
    pool: [
      {
        q: "Tu veux reviser les verbes irreguliers anglais. Quel prompt est le meilleur ?",
        correct: "« Donne-moi une liste de 10 verbes irreguliers anglais courants avec leur traduction. »",
        wrong: ["« anglais. »", "« verbes stp. »"],
        why: "Il precise la tache (liste), la quantite (10) et le sujet (verbes irreguliers + traduction).",
      },
      {
        q: "Tu prepares un expose sur le volcan de La Reunion. Quel prompt est le meilleur ?",
        correct: "« Resume en 5 points simples ce qu'est le Piton de la Fournaise. »",
        wrong: ["« volcan. »", "« raconte. »"],
        why: "Il dit le format (5 points), le niveau (simples) et le sujet precis.",
      },
      {
        q: "Tu n'as pas compris les fractions. Quel prompt est le meilleur ?",
        correct: "« Explique-moi comment additionner deux fractions, etape par etape, avec un exemple. »",
        wrong: ["« fractions. »", "« maths dur. »"],
        why: "Il precise la tache, le format (etapes) et demande un exemple.",
      },
    ],
  }),
  vraiFauxTemplate({
    id: "a2_ia_promptclair_vf",
    microId: "ia_a2_prompt_clair",
    notionId: "ia_a2_prompts",
    difficulty: 2,
    pool: [
      { t: "Plus un prompt est precis, meilleure est la reponse en general.", ok: true, ex: "La precision aide l'IA a viser juste." },
      { t: "Un prompt d'un seul mot vague donne toujours une excellente reponse.", ok: false, ex: "Trop vague : l'IA doit deviner et se trompe souvent de but." },
      { t: "Dire le format voulu (liste, etapes...) aide a obtenir ce qu'on veut.", ok: true, ex: "Le format guide la forme de la reponse." },
      { t: "Indiquer l'objectif (pour quoi je fais ca) ameliore la reponse.", ok: true, ex: "Le but oriente le contenu vers ce qui est utile." },
    ],
  }),
];

const contexteNiveau: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_contexte_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_contexte_niveau",
    difficulty: 1,
    theme: "neutral",
    text: "Pourquoi est-ce utile de dire ton niveau a l'IA (ex. « je suis en 5e ») ?",
    format: "qcm",
    choices: [
      "Pour qu'elle adapte ses explications a ce que je peux comprendre.",
      "Pour qu'elle refuse de repondre.",
      "Cela ne sert strictement a rien.",
      "Pour qu'elle reponde plus lentement.",
    ],
    expected: ["Pour qu'elle adapte ses explications a ce que je peux comprendre."],
    comparator: "mcq_exact",
    hint: "Le contexte aide l'IA a se mettre a ton niveau.",
    explanation: exp(
      "Donner ton niveau permet une reponse adaptee.",
      "L'IA choisit alors un vocabulaire et des exemples a ta portee.",
      "« Explique-moi en mots simples, je suis en 5e » donne une reponse plus claire.",
      "Le contexte (niveau) = explications adaptees."
    ),
    tags: ["a2", "ia", "contexte", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_contexte_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_contexte_niveau",
    difficulty: 2,
    theme: "neutral",
    text: "Quel ajout donne le plus de CONTEXTE utile a ta demande ?",
    format: "qcm",
    choices: [
      "« Je suis en 4e, explique simplement et donne un exemple de la vie courante. »",
      "« Reponds. »",
      "« Vite. »",
      "« Peu importe comment. »",
    ],
    expected: ["« Je suis en 4e, explique simplement et donne un exemple de la vie courante. »"],
    comparator: "mcq_exact",
    hint: "Le contexte = niveau + attentes.",
    explanation: exp(
      "Le bon contexte precise qui tu es et ce que tu attends.",
      "Niveau (4e) + style (simple) + exemple concret : l'IA cible mieux.",
      "Resultat : une explication a ta portee, avec un exemple parlant.",
      "Contexte utile = niveau + attentes claires."
    ),
    tags: ["a2", "ia", "contexte", "qcm"],
  },
  vraiFauxTemplate({
    id: "a2_ia_contexte_vf",
    microId: "ia_a2_contexte_niveau",
    notionId: "ia_a2_prompts",
    difficulty: 2,
    pool: [
      { t: "Donner mon niveau aide l'IA a adapter ses explications.", ok: true, ex: "Elle ajuste vocabulaire et exemples a ma portee." },
      { t: "Le contexte ne change jamais la qualite de la reponse.", ok: false, ex: "Au contraire : plus de contexte = reponse plus adaptee." },
      { t: "Je peux demander une reponse « en mots simples » ou « plus detaillee ».", ok: true, ex: "On peut regler le niveau de detail selon son besoin." },
      { t: "Preciser la matiere et le chapitre aide l'IA a viser juste.", ok: true, ex: "Le sujet exact evite les reponses a cote." },
    ],
  }),
  scenarioTemplate({
    id: "a2_ia_contexte_scn",
    microId: "ia_a2_contexte_niveau",
    notionId: "ia_a2_prompts",
    difficulty: 3,
    hint: "Quelle demande donne le contexte le plus utile ?",
    pool: [
      {
        q: "Tu veux une explication adaptee. Quelle formulation est la meilleure ?",
        correct: "« Je suis en 6e et je debute : explique avec des mots simples et un schema decrit. »",
        wrong: ["« Explique. »", "« Niveau expert, sois technique. » (alors que tu debutes)"],
        why: "Annoncer son niveau reel et ses attentes donne une reponse vraiment adaptee.",
      },
      {
        q: "Tu prepares un controle de SVT sur la digestion. Quel contexte ajouter ?",
        correct: "« Je suis en 5e, controle de SVT sur la digestion : fais-moi un resume simple en 6 lignes. »",
        wrong: ["« digestion. »", "« un texte. »"],
        why: "Niveau + matiere + sujet + format = l'IA cible exactement ton besoin.",
      },
    ],
  }),
];

const expliquerAutrement: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_autrement_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_expliquer_autrement",
    difficulty: 1,
    theme: "neutral",
    text: "Tu n'as pas compris l'explication de l'IA. Quelle est la bonne reaction ?",
    format: "qcm",
    choices: [
      "Lui demander de reexpliquer autrement, plus simplement ou avec un exemple.",
      "Abandonner tout de suite.",
      "Recopier sans comprendre.",
      "Conclure que c'est impossible a comprendre.",
    ],
    expected: ["Lui demander de reexpliquer autrement, plus simplement ou avec un exemple."],
    comparator: "mcq_exact",
    hint: "On peut toujours demander une autre explication.",
    explanation: exp(
      "On peut demander a l'IA d'expliquer differemment.",
      "Une autre formulation ou un exemple aide souvent a comprendre.",
      "« Reexplique avec une image de la vie courante » fonctionne bien.",
      "Pas compris ? -> demander une autre explication."
    ),
    tags: ["a2", "ia", "reexpliquer", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_autrement_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_expliquer_autrement",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle demande aide le mieux a comprendre une notion difficile ?",
    format: "qcm",
    choices: [
      "« Explique-moi ca comme si j'avais 10 ans, avec une comparaison simple. »",
      "« Encore. »",
      "« Non. »",
      "« Ecris plus. »",
    ],
    expected: ["« Explique-moi ca comme si j'avais 10 ans, avec une comparaison simple. »"],
    comparator: "mcq_exact",
    hint: "Demander une comparaison/analogie aide beaucoup.",
    explanation: exp(
      "Demander une comparaison simple rend une notion accessible.",
      "L'analogie relie l'inconnu a quelque chose de familier.",
      "« Comme si j'avais 10 ans » force une explication tres simple.",
      "Demander une analogie simple = mieux comprendre."
    ),
    tags: ["a2", "ia", "reexpliquer", "qcm"],
  },
  vraiFauxTemplate({
    id: "a2_ia_autrement_vf",
    microId: "ia_a2_expliquer_autrement",
    notionId: "ia_a2_prompts",
    difficulty: 2,
    pool: [
      { t: "Je peux demander a l'IA d'expliquer la meme notion d'une autre facon.", ok: true, ex: "Changer d'angle ou d'exemple aide a comprendre." },
      { t: "Si je ne comprends pas, je dois forcement abandonner.", ok: false, ex: "On peut demander une reformulation, un exemple, un schema decrit." },
      { t: "Demander une comparaison de la vie courante facilite la comprehension.", ok: true, ex: "Les analogies relient l'abstrait au concret." },
      { t: "Demander « explique plus simplement » est une bonne strategie.", ok: true, ex: "On ajuste le niveau jusqu'a comprendre." },
    ],
  }),
];

const reformulerRelancer: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_reformuler_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_reformuler_relancer",
    difficulty: 2,
    theme: "neutral",
    text: "La reponse de l'IA est trop longue et hors sujet. Que fais-tu ?",
    format: "qcm",
    choices: [
      "Je relance en precisant : « plus court, et reste sur le sujet X ».",
      "Je garde la reponse hors sujet telle quelle.",
      "Je recommence tout sur une autre IA sans rien changer.",
      "Je conclus que l'IA est inutilisable.",
    ],
    expected: ["Je relance en precisant : « plus court, et reste sur le sujet X »."],
    comparator: "mcq_exact",
    hint: "On affine la demande au lieu d'abandonner.",
    explanation: exp(
      "On peut relancer en precisant ce qui n'allait pas.",
      "Indiquer la longueur et le recadrage corrige souvent la reponse.",
      "« Trop long : resume en 3 phrases sur le sujet X » fonctionne.",
      "Reponse imparfaite -> reformuler/preciser, pas abandonner."
    ),
    tags: ["a2", "ia", "iteration", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_reformuler_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_reformuler_relancer",
    difficulty: 1,
    theme: "neutral",
    text: "« Reformuler » sa demande a l'IA, ca veut dire :",
    format: "qcm",
    choices: [
      "Redire ma demande autrement, en la rendant plus claire ou plus precise.",
      "Eteindre l'ordinateur.",
      "Copier la reponse.",
      "Changer de matiere.",
    ],
    expected: ["Redire ma demande autrement, en la rendant plus claire ou plus precise."],
    comparator: "mcq_exact",
    hint: "Reformuler = redire mieux.",
    explanation: exp(
      "Reformuler, c'est reecrire sa demande de facon plus efficace.",
      "On corrige ce qui manquait : precision, format, longueur, contexte.",
      "Passer de « parle du climat » a « 3 causes du rechauffement, simple ».",
      "Reformuler = redire la demande en mieux."
    ),
    tags: ["a2", "ia", "iteration", "qcm"],
  },
  scenarioTemplate({
    id: "a2_ia_reformuler_scn",
    microId: "ia_a2_reformuler_relancer",
    notionId: "ia_a2_prompts",
    difficulty: 3,
    hint: "Quelle relance corrige le mieux le probleme ?",
    pool: [
      {
        q: "La reponse est trop compliquee pour toi. Quelle relance est la meilleure ?",
        correct: "« C'est trop complique, reexplique plus simplement avec un exemple. »",
        wrong: ["« ok merci » (et je laisse tomber).", "« recommence » (sans rien preciser)."],
        why: "On dit ce qui ne va pas (trop complique) et ce qu'on veut (simple + exemple).",
      },
      {
        q: "L'IA a oublie une partie de ta demande. Quelle relance choisir ?",
        correct: "« Tu as oublie la partie B : complete avec la partie B, stp. »",
        wrong: ["Tout reposter a l'identique.", "Abandonner la partie B."],
        why: "On pointe precisement le manque pour que l'IA complete.",
      },
    ],
  }),
  vraiFauxTemplate({
    id: "a2_ia_reformuler_vf",
    microId: "ia_a2_reformuler_relancer",
    notionId: "ia_a2_prompts",
    difficulty: 2,
    pool: [
      { t: "Si la reponse ne convient pas, je peux preciser et relancer.", ok: true, ex: "L'echange est iteratif : on affine jusqu'au bon resultat." },
      { t: "Une seule tentative est toujours suffisante.", ok: false, ex: "Souvent, une relance precise ameliore nettement la reponse." },
      { t: "Dire ce qui n'allait pas aide l'IA a corriger.", ok: true, ex: "Le retour precis guide la nouvelle reponse." },
    ],
  }),
];

const exempleFormat: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_format_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_exemple_format",
    difficulty: 1,
    theme: "neutral",
    text: "Tu veux une reponse facile a relire pour reviser. Que demandes-tu ?",
    format: "qcm",
    choices: [
      "Un format clair : « presente-le sous forme de liste a puces ».",
      "« Ecris tout en un seul gros paragraphe. »",
      "« Ne mets aucun ordre. »",
      "« Melange tout. »",
    ],
    expected: ["Un format clair : « presente-le sous forme de liste a puces »."],
    comparator: "mcq_exact",
    hint: "Demander un format aide a relire.",
    explanation: exp(
      "Demander un format precis rend la reponse plus utile.",
      "Une liste ou un tableau se relit et se memorise plus facilement.",
      "« Sous forme de liste a puces » ou « en tableau » structure la reponse.",
      "Demander un format (liste, tableau, etapes) aide a apprendre."
    ),
    tags: ["a2", "ia", "format", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_format_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_prompts",
    microId: "ia_a2_exemple_format",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi demander un EXEMPLE a l'IA ?",
    format: "qcm",
    choices: [
      "Parce qu'un exemple concret aide a comprendre et a appliquer la regle.",
      "Parce que c'est interdit de comprendre.",
      "Pour rendre la reponse plus fausse.",
      "Cela n'aide jamais.",
    ],
    expected: ["Parce qu'un exemple concret aide a comprendre et a appliquer la regle."],
    comparator: "mcq_exact",
    hint: "Un exemple rend la regle concrete.",
    explanation: exp(
      "Un exemple rend une regle abstraite plus concrete.",
      "On voit comment l'appliquer pour de vrai.",
      "« Donne un exemple resolu » apres une regle de grammaire ou de maths.",
      "Demander un exemple = mieux comprendre et appliquer."
    ),
    tags: ["a2", "ia", "format", "qcm"],
  },
  scenarioTemplate({
    id: "a2_ia_format_scn",
    microId: "ia_a2_exemple_format",
    notionId: "ia_a2_prompts",
    difficulty: 2,
    hint: "Quel format demander selon le besoin ?",
    pool: [
      {
        q: "Tu veux comparer 3 personnages d'un roman. Quel format demander ?",
        correct: "« Fais-moi un tableau qui compare les 3 personnages. »",
        wrong: ["« Ecris un long texte sans structure. »", "« Mets tout en vrac. »"],
        why: "Un tableau met en parallele et se relit tres facilement.",
      },
      {
        q: "Tu veux apprendre une methode de calcul. Quel format demander ?",
        correct: "« Donne-moi la methode etape par etape, avec un exemple resolu. »",
        wrong: ["« Donne juste le resultat. »", "« Sans aucune etape. »"],
        why: "Les etapes + un exemple resolu permettent de refaire seul ensuite.",
      },
    ],
  }),
  vraiFauxTemplate({
    id: "a2_ia_format_vf",
    microId: "ia_a2_exemple_format",
    notionId: "ia_a2_prompts",
    difficulty: 1,
    pool: [
      { t: "Demander un format (liste, tableau, etapes) rend la reponse plus utile.", ok: true, ex: "La structure aide a relire et a memoriser." },
      { t: "Un exemple concret aide a comprendre une regle.", ok: true, ex: "Il montre comment appliquer la regle pour de vrai." },
      { t: "Le format de la reponse n'a aucune importance pour reviser.", ok: false, ex: "Une bonne mise en forme facilite nettement la revision." },
    ],
  }),
];

// --------------------------------------------------------------------------
// NOTION 2 — Reviser et s'entrainer avec l'IA
// --------------------------------------------------------------------------

const ficheRevision: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_fiche_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_reviser",
    microId: "ia_a2_fiche_revision",
    difficulty: 1,
    theme: "neutral",
    text: "Comment demander une bonne fiche de revision a l'IA ?",
    format: "qcm",
    choices: [
      "« Fais une fiche de revision claire sur le chapitre X, avec les points cles. »",
      "« revise. »",
      "« fiche. »",
      "« quelque chose. »",
    ],
    expected: ["« Fais une fiche de revision claire sur le chapitre X, avec les points cles. »"],
    comparator: "mcq_exact",
    hint: "Precise le chapitre + ce que tu veux dedans.",
    explanation: exp(
      "Une bonne demande precise le sujet et le contenu attendu.",
      "Chapitre + points cles + clarte = fiche utile.",
      "On peut ajouter « avec des definitions et 2 exemples ».",
      "Fiche utile = sujet precis + points cles demandes."
    ),
    tags: ["a2", "ia", "revision", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_fiche_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_reviser",
    microId: "ia_a2_fiche_revision",
    difficulty: 2,
    theme: "neutral",
    text: "Une fois la fiche generee, quelle est la meilleure habitude ?",
    format: "qcm",
    choices: [
      "La relire, verifier et la completer avec mes mots.",
      "L'apprendre par coeur sans la lire.",
      "Supposer qu'elle est parfaite et complete.",
      "Ne jamais la verifier.",
    ],
    expected: ["La relire, verifier et la completer avec mes mots."],
    comparator: "mcq_exact",
    hint: "La fiche est un point de depart, pas une verite gravee.",
    explanation: exp(
      "Une fiche d'IA est un brouillon a verifier et s'approprier.",
      "La relire et la reformuler aide a memoriser et a reperer les erreurs.",
      "Tu compares avec ton cours et tu corriges si besoin.",
      "Fiche d'IA = a verifier et a s'approprier."
    ),
    tags: ["a2", "ia", "revision", "qcm"],
  },
  vraiFauxTemplate({
    id: "a2_ia_fiche_vf",
    microId: "ia_a2_fiche_revision",
    notionId: "ia_a2_reviser",
    difficulty: 2,
    pool: [
      { t: "Preciser le chapitre rend la fiche de revision plus utile.", ok: true, ex: "L'IA cible alors le bon contenu." },
      { t: "Une fiche generee par l'IA n'a jamais besoin d'etre verifiee.", ok: false, ex: "Elle peut contenir des oublis ou des erreurs : on la verifie." },
      { t: "Reformuler la fiche avec mes mots aide a memoriser.", ok: true, ex: "Reecrire active la memoire et la comprehension." },
      { t: "Comparer la fiche a mon cours est une bonne idee.", ok: true, ex: "Cela permet de reperer les manques et les erreurs." },
    ],
  }),
];

const quizEntrainement: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_quiz_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_reviser",
    microId: "ia_a2_quiz_entrainement",
    difficulty: 1,
    theme: "neutral",
    text: "Comment demander un quiz pour t'entrainer ?",
    format: "qcm",
    choices: [
      "« Pose-moi 5 questions sur le chapitre X, une a la fois, et corrige mes reponses. »",
      "« quiz. »",
      "« donne les reponses tout de suite. »",
      "« fais mes devoirs. »",
    ],
    expected: ["« Pose-moi 5 questions sur le chapitre X, une a la fois, et corrige mes reponses. »"],
    comparator: "mcq_exact",
    hint: "Demande des questions, pas les reponses toutes faites.",
    explanation: exp(
      "Un bon quiz = des questions a une a la fois, puis correction.",
      "Tu t'entraines activement au lieu de lire les reponses.",
      "« une a la fois » t'oblige a chercher avant de voir la correction.",
      "Quiz utile = je reponds d'abord, l'IA corrige ensuite."
    ),
    tags: ["a2", "ia", "quiz", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_quiz_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_reviser",
    microId: "ia_a2_quiz_entrainement",
    difficulty: 2,
    theme: "neutral",
    text: "Pendant un quiz d'entrainement avec l'IA, la bonne attitude est :",
    format: "qcm",
    choices: [
      "Chercher la reponse moi-meme avant de regarder la correction.",
      "Demander la reponse sans reflechir.",
      "Copier la correction sans la lire.",
      "Sauter toutes les questions.",
    ],
    expected: ["Chercher la reponse moi-meme avant de regarder la correction."],
    comparator: "mcq_exact",
    hint: "L'entrainement marche si je cherche d'abord.",
    explanation: exp(
      "S'entrainer, c'est chercher avant de verifier.",
      "L'effort de rappel est ce qui fait progresser.",
      "Tu reponds, puis l'IA te dit si c'est juste et pourquoi.",
      "Je cherche d'abord, je verifie ensuite."
    ),
    tags: ["a2", "ia", "quiz", "qcm"],
  },
  vraiFauxTemplate({
    id: "a2_ia_quiz_vf",
    microId: "ia_a2_quiz_entrainement",
    notionId: "ia_a2_reviser",
    difficulty: 2,
    pool: [
      { t: "Demander des questions une a la fois aide a s'entrainer activement.", ok: true, ex: "On cherche avant de voir la correction." },
      { t: "Le mieux est de demander directement toutes les reponses.", ok: false, ex: "Sans effort de recherche, on ne progresse pas." },
      { t: "Se tromper pendant un quiz d'entrainement, c'est utile pour apprendre.", ok: true, ex: "L'erreur montre ce qu'il faut revoir." },
      { t: "Je peux demander a l'IA d'augmenter la difficulte des questions.", ok: true, ex: "On adapte le quiz a sa progression." },
    ],
  }),
];

const faireExpliquerErreur: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_erreur_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_reviser",
    microId: "ia_a2_faire_expliquer_erreur",
    difficulty: 1,
    theme: "neutral",
    text: "Tu t'es trompe a un exercice. Quelle est la meilleure demande a l'IA ?",
    format: "qcm",
    choices: [
      "« Explique-moi pourquoi ma reponse est fausse et comment corriger. »",
      "« Donne juste la bonne reponse, sans explication. »",
      "« Fais l'exercice a ma place. »",
      "« Dis-moi que j'ai raison quand meme. »",
    ],
    expected: ["« Explique-moi pourquoi ma reponse est fausse et comment corriger. »"],
    comparator: "mcq_exact",
    hint: "Comprendre l'erreur > avoir la reponse.",
    explanation: exp(
      "Demander l'explication de l'erreur fait vraiment progresser.",
      "Comprendre POURQUOI on s'est trompe evite de refaire l'erreur.",
      "L'IA pointe l'etape ratee et montre la correction.",
      "Comprendre son erreur = ne plus la refaire."
    ),
    tags: ["a2", "ia", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_erreur_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_reviser",
    microId: "ia_a2_faire_expliquer_erreur",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi comprendre son erreur est-il plus utile que recopier la bonne reponse ?",
    format: "qcm",
    choices: [
      "Parce que ca evite de refaire la meme erreur la prochaine fois.",
      "Parce que recopier prend moins de place.",
      "Parce que la bonne reponse est toujours fausse.",
      "Cela n'a aucune importance.",
    ],
    expected: ["Parce que ca evite de refaire la meme erreur la prochaine fois."],
    comparator: "mcq_exact",
    hint: "On apprend de l'erreur comprise.",
    explanation: exp(
      "Comprendre l'erreur traite la cause, pas seulement le symptome.",
      "Tu sais alors quoi faire face a un exercice similaire.",
      "Recopier la reponse ne dit pas POURQUOI tu t'es trompe.",
      "Erreur comprise = progres durable."
    ),
    tags: ["a2", "ia", "erreur", "qcm"],
  },
  vraiFauxTemplate({
    id: "a2_ia_erreur_vf",
    microId: "ia_a2_faire_expliquer_erreur",
    notionId: "ia_a2_reviser",
    difficulty: 2,
    pool: [
      { t: "Demander pourquoi je me suis trompe aide a progresser.", ok: true, ex: "On corrige la cause de l'erreur, pas juste la reponse." },
      { t: "Recopier la bonne reponse suffit pour ne plus se tromper.", ok: false, ex: "Sans comprendre, on refait souvent la meme erreur." },
      { t: "Une erreur bien comprise est une occasion d'apprendre.", ok: true, ex: "Elle montre exactement ce qu'il faut revoir." },
    ],
  }),
];

const aideSansTriche: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_aide_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_reviser",
    microId: "ia_a2_aide_sans_triche",
    difficulty: 2,
    theme: "neutral",
    text: "Tu bloques sur un devoir maison. Comment demander de l'aide sans tricher ?",
    format: "qcm",
    choices: [
      "« Donne-moi un indice pour demarrer, sans faire l'exercice a ma place. »",
      "« Fais tout l'exercice et je recopie. »",
      "« Donne la reponse finale, je ne lis pas. »",
      "« Ecris mon devoir en entier. »",
    ],
    expected: ["« Donne-moi un indice pour demarrer, sans faire l'exercice a ma place. »"],
    comparator: "mcq_exact",
    hint: "Un indice aide ; faire a ta place, non.",
    explanation: exp(
      "Demander un indice garde l'effort de ton cote.",
      "Tu avances avec un coup de pouce, sans deleguer ta reflexion.",
      "« Juste une piste pour la 1re etape » au lieu de la solution complete.",
      "Aide oui, faire a ma place non."
    ),
    tags: ["a2", "ia", "integrite", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_aide_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_reviser",
    microId: "ia_a2_aide_sans_triche",
    difficulty: 1,
    theme: "neutral",
    text: "« Deleguer sa pensee » a l'IA, ca veut dire :",
    format: "qcm",
    choices: [
      "La laisser reflechir et decider a ma place, sans que je comprenne.",
      "Lui demander un simple indice.",
      "Verifier une de mes idees.",
      "Lui demander d'expliquer une notion.",
    ],
    expected: ["La laisser reflechir et decider a ma place, sans que je comprenne."],
    comparator: "mcq_exact",
    hint: "Deleguer = ne plus penser soi-meme.",
    explanation: exp(
      "Deleguer sa pensee = arreter de reflechir et tout confier a l'IA.",
      "C'est le piege a eviter : on n'apprend plus rien.",
      "Demander un indice ou une explication, ce n'est PAS deleguer.",
      "Garder sa pensee = rester celui qui reflechit."
    ),
    tags: ["a2", "ia", "integrite", "qcm"],
  },
  scenarioTemplate({
    id: "a2_ia_aide_scn",
    microId: "ia_a2_aide_sans_triche",
    notionId: "ia_a2_reviser",
    difficulty: 3,
    hint: "Choisis l'aide qui te fait travailler, pas celle qui travaille a ta place.",
    pool: [
      {
        q: "Devoir maison de maths difficile : quelle demande est saine ?",
        correct: "« Verifie mon raisonnement et dis-moi ou je me trompe. »",
        wrong: ["« Fais l'exercice, je recopie. »", "« Donne juste le resultat final. »"],
        why: "Faire verifier son propre travail garde l'effort et l'apprentissage de ton cote.",
      },
      {
        q: "Redaction a rendre : quelle utilisation de l'IA est honnete ?",
        correct: "« Donne-moi 3 idees de plan, je redige moi-meme. »",
        wrong: ["« Ecris la redaction entiere a ma place. »", "« Je copie-colle ta reponse comme la mienne. »"],
        why: "S'aider d'idees tout en redigeant soi-meme reste honnete et formateur.",
      },
    ],
  }),
];

// --------------------------------------------------------------------------
// NOTION 3 — Apprendre vraiment, sans tricher
// --------------------------------------------------------------------------

const integriteTriche: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_integrite_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_apprendre_honnete",
    microId: "ia_a2_integrite_triche",
    difficulty: 1,
    theme: "neutral",
    text: "Quel usage de l'IA t'aide vraiment a apprendre ?",
    format: "qcm",
    choices: [
      "M'en servir pour comprendre, puis faire le travail moi-meme.",
      "Copier sa reponse et la rendre comme la mienne.",
      "Lui faire faire tous mes devoirs.",
      "Ne plus jamais reflechir.",
    ],
    expected: ["M'en servir pour comprendre, puis faire le travail moi-meme."],
    comparator: "mcq_exact",
    hint: "Apprendre = comprendre puis faire soi-meme.",
    explanation: exp(
      "L'IA aide a comprendre ; c'est toi qui fais le travail.",
      "Copier sans comprendre, c'est tricher et ne rien apprendre.",
      "Comprendre la methode, puis l'appliquer seul : voila le bon usage.",
      "Comprendre avec l'IA, faire par soi-meme."
    ),
    tags: ["a2", "ia", "integrite", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_integrite_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_apprendre_honnete",
    microId: "ia_a2_integrite_triche",
    difficulty: 2,
    theme: "neutral",
    text: "Rendre un texte ecrit entierement par l'IA comme si c'etait le tien, c'est :",
    format: "qcm",
    choices: [
      "De la triche : ce n'est pas ton travail et tu n'apprends rien.",
      "Une tres bonne methode de travail.",
      "Toujours autorise et conseille.",
      "Sans aucune importance.",
    ],
    expected: ["De la triche : ce n'est pas ton travail et tu n'apprends rien."],
    comparator: "mcq_exact",
    hint: "Faire passer le travail de l'IA pour le sien = triche.",
    explanation: exp(
      "Presenter le travail de l'IA comme le sien est une tricherie.",
      "Tu ne progresses pas et tu trompes ton enseignant.",
      "L'IA peut aider a preparer, mais le rendu doit etre ton travail.",
      "Le travail rendu doit etre le mien."
    ),
    tags: ["a2", "ia", "integrite", "qcm"],
  },
  scenarioTemplate({
    id: "a2_ia_integrite_scn",
    microId: "ia_a2_integrite_triche",
    notionId: "ia_a2_apprendre_honnete",
    difficulty: 2,
    hint: "Aide pour apprendre = oui ; faire a ma place = triche.",
    pool: [
      {
        q: "Quel usage est honnete et formateur ?",
        correct: "Demander a l'IA d'expliquer une notion, puis refaire l'exercice seul.",
        wrong: ["Copier-coller sa reponse dans mon devoir.", "Lui faire ecrire tout mon expose."],
        why: "Comprendre puis produire soi-meme reste honnete et fait progresser.",
      },
      {
        q: "Ton ami veut copier la reponse de l'IA pour le controle. Que lui dis-tu ?",
        correct: "« Sers-t'en pour comprendre, mais fais le travail toi-meme. »",
        wrong: ["« Copie, personne ne verra. »", "« Donne-moi aussi la reponse a copier. »"],
        why: "L'integrite, c'est utiliser l'IA pour apprendre, pas pour tricher.",
      },
    ],
  }),
  vraiFauxTemplate({
    id: "a2_ia_integrite_vf",
    microId: "ia_a2_integrite_triche",
    notionId: "ia_a2_apprendre_honnete",
    difficulty: 2,
    pool: [
      { t: "Utiliser l'IA pour comprendre puis faire soi-meme, c'est honnete.", ok: true, ex: "Tu apprends et le travail reste le tien." },
      { t: "Rendre le texte de l'IA comme le mien, c'est tricher.", ok: true, ex: "Ce n'est pas mon travail et je n'apprends rien." },
      { t: "Copier l'IA sans comprendre aide a reussir sur le long terme.", ok: false, ex: "On ne progresse pas et on se fait piéger au controle." },
    ],
  }),
];

const verifierAvantUtiliser: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a2_ia_verifier_1",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_apprendre_honnete",
    microId: "ia_a2_verifier_avant_utiliser",
    difficulty: 1,
    theme: "neutral",
    text: "Avant d'utiliser une info donnee par l'IA dans un devoir, tu dois :",
    format: "qcm",
    choices: [
      "La verifier (cours, source fiable) car l'IA peut se tromper.",
      "La recopier sans rien verifier.",
      "Supposer qu'elle est forcement exacte.",
      "L'utiliser seulement si elle est longue.",
    ],
    expected: ["La verifier (cours, source fiable) car l'IA peut se tromper."],
    comparator: "mcq_exact",
    hint: "Reflexe : je verifie avant d'utiliser.",
    explanation: exp(
      "On verifie une info d'IA avant de s'en servir.",
      "L'IA donne une reponse probable, parfois fausse (hallucination).",
      "On croise avec le cours ou une source fiable.",
      "Je verifie avant d'utiliser."
    ),
    tags: ["a2", "ia", "verification", "qcm"],
  },
  {
    kind: "fixed",
    id: "a2_ia_verifier_2",
    niveau: "a2",
    matiere: "ia",
    notionId: "ia_a2_apprendre_honnete",
    microId: "ia_a2_verifier_avant_utiliser",
    difficulty: 2,
    theme: "neutral",
    text: "Comment verifier simplement une info donnee par l'IA ?",
    format: "qcm",
    choices: [
      "La comparer avec mon cours ou une source fiable.",
      "Demander a l'IA si elle est sure, et m'en contenter.",
      "Ne rien faire, c'est forcement vrai.",
      "Choisir la reponse la plus longue.",
    ],
    expected: ["La comparer avec mon cours ou une source fiable."],
    comparator: "mcq_exact",
    hint: "Croiser avec une source fiable.",
    explanation: exp(
      "Verifier, c'est croiser l'info avec une source sure.",
      "Le cours, un manuel, un site fiable permettent de confirmer.",
      "Demander a l'IA « es-tu sure ? » ne suffit pas : elle peut se tromper en restant sure.",
      "Verifier = comparer avec une source fiable."
    ),
    tags: ["a2", "ia", "verification", "qcm"],
  },
  vraiFauxTemplate({
    id: "a2_ia_verifier_vf",
    microId: "ia_a2_verifier_avant_utiliser",
    notionId: "ia_a2_apprendre_honnete",
    difficulty: 2,
    pool: [
      { t: "Une info importante d'IA doit etre verifiee avant d'etre utilisee.", ok: true, ex: "L'IA peut se tromper, meme en ayant l'air sure." },
      { t: "Comparer avec mon cours est une bonne facon de verifier.", ok: true, ex: "Une source fiable confirme ou infirme l'info." },
      { t: "Si l'IA dit qu'elle est sure, l'info est forcement vraie.", ok: false, ex: "L'assurance ne prouve pas l'exactitude." },
      { t: "Verifier prend du temps, donc ca ne sert a rien.", ok: false, ex: "Verifier evite de rendre une erreur : ca vaut le coup." },
    ],
  }),
];

// --------------------------------------------------------------------------
// Banque complete A2
// --------------------------------------------------------------------------

export const iaA2QuestionBank: TutorBankItemV4[] = [
  // Notion 1 - Ecrire un bon prompt
  ...promptClair,
  ...contexteNiveau,
  ...expliquerAutrement,
  ...reformulerRelancer,
  ...exempleFormat,
  // Notion 2 - Reviser et s'entrainer avec l'IA
  ...ficheRevision,
  ...quizEntrainement,
  ...faireExpliquerErreur,
  ...aideSansTriche,
  // Notion 3 - Apprendre vraiment, sans tricher
  ...integriteTriche,
  ...verifierAvantUtiliser,
];

export function getIaA2QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = iaA2QuestionBank;

  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);

  return bank;
}
