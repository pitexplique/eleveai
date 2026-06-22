// lib/tutor-v4/questionBank/c1/ia/index.ts
//
// Coach IA - Niveau C1 « Je mene un projet utile (responsable) »
//
// REGLE DE DESIGN (option D, comme A1/A2/B1/B2/maths seconde) :
//   - fixed   : reperes, methodes, idees-cles a fixer.
//   - template: variete (pools vrai-faux / mises en situation / classement).
//   - QCM dominant avec de VRAIS distracteurs (le moteur melange les choix).
//   - short UNIQUEMENT numerique non ambigu (comptage).
//   - pas de format `open` pour l'instant (clavier mobile).
//
// 3 notions / 11 micro-competences, ~10 questions par micro, difficultes 1->5.
// Theme : cadrer, concevoir de facon responsable, tester et presenter un projet IA.

import type { TutorBankItemV4, TutorBankItemTemplateV4 } from "@/lib/tutor-v4/types";

// --------------------------------------------------------------------------
// Helpers (memes patterns que A1/A2/B1/B2)
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
    niveau: "c1",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint ?? "Pense projet : utile, responsable, et pilote par l'humain.",
    tags: ["c1", "ia", "vrai-faux", "template"],
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
          "Un projet IA reussi est utile, responsable et reste sous controle humain.",
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
    niveau: "c1",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint,
    tags: ["c1", "ia", "situation", "template"],
    generate: () => {
      const s = pick(opts.pool);
      return {
        text: s.q,
        format: "qcm",
        choices: [s.correct, ...s.wrong],
        expected: [s.correct],
        comparator: "mcq_exact",
        explanation: exp(`Bonne reponse : ${s.correct}`, s.why, "On cadre, on concoit responsable, puis on teste et on assume.", s.correct),
      };
    },
  };
}

// --------------------------------------------------------------------------
// NOTION 1 — Cadrer un projet IA utile
// --------------------------------------------------------------------------

const problemeReel: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_probleme_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_cadrer_projet",
    microId: "ia_c1_probleme_reel",
    difficulty: 2,
    theme: "neutral",
    text: "Par quoi commence un bon projet IA ?",
    format: "qcm",
    choices: [
      "Par un probleme reel et un besoin precis d'utilisateurs.",
      "Par le choix de la techno la plus a la mode.",
      "Par le nom du projet.",
      "Par la couleur du logo.",
    ],
    expected: ["Par un probleme reel et un besoin precis d'utilisateurs."],
    comparator: "mcq_exact",
    hint: "On part du probleme, pas de l'outil.",
    explanation: exp(
      "Un projet utile part d'un probleme reel et d'un besoin.",
      "La technologie est un moyen, pas le point de depart.",
      "« Les eleves oublient leurs devoirs » -> besoin clair a resoudre.",
      "On part du probleme et du besoin, pas de l'outil."
    ),
    tags: ["c1", "ia", "cadrage", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_probleme_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_cadrer_projet",
    microId: "ia_c1_probleme_reel",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle formulation decrit le mieux un BESOIN utilisateur ?",
    format: "qcm",
    choices: [
      "« Les eleves veulent reviser vite avant un controle, sans se perdre. »",
      "« Il faut absolument utiliser une IA. »",
      "« On veut un projet impressionnant. »",
      "« On verra plus tard a quoi ca sert. »",
    ],
    expected: ["« Les eleves veulent reviser vite avant un controle, sans se perdre. »"],
    comparator: "mcq_exact",
    hint: "Un besoin parle de l'utilisateur et de son objectif.",
    explanation: exp(
      "Un besoin decrit l'utilisateur et ce qu'il cherche a accomplir.",
      "Cela guide tout le projet vers une vraie utilite.",
      "« Reviser vite sans se perdre » est un besoin concret et verifiable.",
      "Besoin = utilisateur + objectif concret."
    ),
    tags: ["c1", "ia", "cadrage", "qcm"],
  },
  scenarioTemplate({
    id: "c1_ia_probleme_scn",
    microId: "ia_c1_probleme_reel",
    notionId: "ia_c1_cadrer_projet",
    difficulty: 3,
    hint: "Cherche le projet qui part d'un vrai besoin.",
    pool: [
      {
        q: "Quel point de depart de projet est le plus solide ?",
        correct: "« Beaucoup d'eleves ne comprennent pas les consignes : aidons-les a les reformuler. »",
        wrong: ["« Faisons une IA, on trouvera l'usage apres. »", "« Copions un projet a la mode. »"],
        why: "Partir d'un probleme reel et d'un besoin clair donne un projet utile.",
      },
      {
        q: "Quelle idee de projet est la mieux cadree ?",
        correct: "« Les habitants veulent trier leurs dechets sans se tromper : aidons-les a identifier le bon bac. »",
        wrong: ["« Une IA ecologique, sans plus de details. »", "« Un truc avec des donnees. »"],
        why: "Le besoin (trier sans se tromper) est precis et oriente la suite du projet.",
      },
    ],
  }),
  vraiFauxTemplate({
    id: "c1_ia_probleme_vf",
    microId: "ia_c1_probleme_reel",
    notionId: "ia_c1_cadrer_projet",
    difficulty: 2,
    pool: [
      { t: "Un bon projet IA part d'un probleme reel et d'un besoin precis.", ok: true, ex: "L'utilite vient du probleme resolu, pas de la techno." },
      { t: "Choisir l'outil avant de connaitre le probleme est une bonne methode.", ok: false, ex: "On risque de construire une solution qui ne sert a personne." },
      { t: "Decrire l'utilisateur et son objectif aide a cadrer le projet.", ok: true, ex: "Le besoin guide toutes les decisions suivantes." },
    ],
  }),
];

const donneesRoleHumain: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_role_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_cadrer_projet",
    microId: "ia_c1_donnees_role_humain",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un projet IA, comment bien repartir les roles ?",
    format: "qcm",
    choices: [
      "L'IA propose/traite ; l'humain decide et reste responsable.",
      "L'IA decide tout, l'humain n'intervient jamais.",
      "Personne ne decide.",
      "L'humain execute les ordres de l'IA.",
    ],
    expected: ["L'IA propose/traite ; l'humain decide et reste responsable."],
    comparator: "mcq_exact",
    hint: "L'humain garde la decision.",
    explanation: exp(
      "L'IA assiste, l'humain decide et assume.",
      "Les decisions qui engagent des personnes restent humaines.",
      "L'IA trie des candidatures, mais c'est l'humain qui choisit.",
      "IA propose, humain decide."
    ),
    tags: ["c1", "ia", "role-humain", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_role_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_cadrer_projet",
    microId: "ia_c1_donnees_role_humain",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un projet « recommander des exercices », quelles DONNEES sont utiles ?",
    format: "qcm",
    choices: [
      "Les resultats passes de l'eleve et les notions du programme.",
      "La couleur preferee du developpeur.",
      "Le nom du chat de l'eleve.",
      "Aucune donnee, on devine.",
    ],
    expected: ["Les resultats passes de l'eleve et les notions du programme."],
    comparator: "mcq_exact",
    hint: "Quelles donnees servent vraiment a la tache ?",
    explanation: exp(
      "On choisit les donnees utiles a la tache visee.",
      "Recommander des exercices demande l'historique et le programme.",
      "Des donnees hors-sujet n'aident pas et alourdissent le projet.",
      "Bonnes donnees = celles qui servent la tache."
    ),
    tags: ["c1", "ia", "donnees", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_role_vf",
    microId: "ia_c1_donnees_role_humain",
    notionId: "ia_c1_cadrer_projet",
    difficulty: 2,
    pool: [
      { t: "Dans un projet bien concu, l'humain garde la decision finale.", ok: true, ex: "L'IA assiste, mais la responsabilite reste humaine." },
      { t: "On doit choisir les donnees vraiment utiles a la tache.", ok: true, ex: "Des donnees hors-sujet n'aident pas et posent des risques." },
      { t: "Mieux vaut laisser l'IA decider seule des choix importants.", ok: false, ex: "Les decisions qui engagent des personnes restent humaines." },
      { t: "Decrire qui decide quoi (IA / humain) fait partie du cadrage.", ok: true, ex: "Cela clarifie les responsabilites du projet." },
    ],
  }),
];

const criteresReussite: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_criteres_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_cadrer_projet",
    microId: "ia_c1_criteres_reussite",
    difficulty: 2,
    theme: "neutral",
    text: "Un « critere de reussite » d'un projet, c'est :",
    format: "qcm",
    choices: [
      "Une mesure claire qui dit si le projet atteint son but.",
      "Une impression vague que c'est bien.",
      "Le nombre de couleurs utilisees.",
      "La duree de la presentation.",
    ],
    expected: ["Une mesure claire qui dit si le projet atteint son but."],
    comparator: "mcq_exact",
    hint: "Un critere se mesure.",
    explanation: exp(
      "Un critere de reussite est une mesure verifiable du but.",
      "Sans critere, on ne peut pas savoir si le projet marche.",
      "« 8 eleves sur 10 trouvent l'outil utile » est un critere mesurable.",
      "Critere = mesure claire du succes."
    ),
    tags: ["c1", "ia", "criteres", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_criteres_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_cadrer_projet",
    microId: "ia_c1_criteres_reussite",
    difficulty: 3,
    theme: "neutral",
    text: "Lequel est un BON critere de reussite ?",
    format: "qcm",
    choices: [
      "« Le temps de revision baisse de 20 % pour la meme note. »",
      "« Le projet est trop bien. »",
      "« On a beaucoup travaille. »",
      "« Les gens ont l'air contents, peut-etre. »",
    ],
    expected: ["« Le temps de revision baisse de 20 % pour la meme note. »"],
    comparator: "mcq_exact",
    hint: "Mesurable et verifiable.",
    explanation: exp(
      "Un bon critere est mesurable et verifiable.",
      "Il permet de prouver, chiffres a l'appui, que le but est atteint.",
      "« -20 % de temps pour la meme note » est clair et testable.",
      "Bon critere = mesurable, pas une impression."
    ),
    tags: ["c1", "ia", "criteres", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_criteres_vf",
    microId: "ia_c1_criteres_reussite",
    notionId: "ia_c1_cadrer_projet",
    difficulty: 2,
    pool: [
      { t: "Un critere de reussite doit etre mesurable.", ok: true, ex: "Sinon on ne peut pas juger si le projet marche." },
      { t: "« C'est bien » est un critere de reussite suffisant.", ok: false, ex: "Trop vague : un critere doit se mesurer." },
      { t: "Definir les criteres avant de tester aide a evaluer objectivement.", ok: true, ex: "On sait d'avance ce qu'on cherche a obtenir." },
    ],
  }),
];

const solutionAdaptee: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_solution_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_cadrer_projet",
    microId: "ia_c1_solution_adaptee",
    difficulty: 2,
    theme: "neutral",
    text: "Faut-il toujours utiliser une IA pour resoudre un probleme ?",
    format: "qcm",
    choices: [
      "Non : parfois une solution simple (sans IA) est plus adaptee.",
      "Oui, l'IA est toujours la meilleure solution.",
      "Oui, meme si c'est inutile.",
      "Non, l'IA ne sert jamais a rien.",
    ],
    expected: ["Non : parfois une solution simple (sans IA) est plus adaptee."],
    comparator: "mcq_exact",
    hint: "L'IA n'est pas toujours la bonne reponse.",
    explanation: exp(
      "L'IA n'est pas toujours la meilleure solution.",
      "Une regle simple, une appli classique ou l'organisation suffisent parfois.",
      "Pour « rappeler une date », une alarme suffit : pas besoin d'IA.",
      "On verifie que l'IA est vraiment adaptee au probleme."
    ),
    tags: ["c1", "ia", "cadrage", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_solution_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_cadrer_projet",
    microId: "ia_c1_solution_adaptee",
    difficulty: 3,
    theme: "neutral",
    text: "Quand l'IA est-elle particulierement PERTINENTE ?",
    format: "qcm",
    choices: [
      "Quand il faut traiter beaucoup d'exemples ou reconnaitre des motifs complexes.",
      "Pour additionner deux nombres.",
      "Pour afficher l'heure.",
      "Pour allumer une lampe.",
    ],
    expected: ["Quand il faut traiter beaucoup d'exemples ou reconnaitre des motifs complexes."],
    comparator: "mcq_exact",
    hint: "Beaucoup de donnees, motifs complexes.",
    explanation: exp(
      "L'IA brille sur de grands volumes et des motifs complexes.",
      "Pour des taches simples et exactes, d'autres outils suffisent.",
      "Reconnaitre des milliers d'images : oui ; additionner : non.",
      "IA pertinente = donnees nombreuses, motifs complexes."
    ),
    tags: ["c1", "ia", "cadrage", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_solution_vf",
    microId: "ia_c1_solution_adaptee",
    notionId: "ia_c1_cadrer_projet",
    difficulty: 2,
    pool: [
      { t: "Parfois une solution simple sans IA est preferable.", ok: true, ex: "On choisit l'outil le plus adapte, pas le plus a la mode." },
      { t: "L'IA est toujours la meilleure solution a tout probleme.", ok: false, ex: "Pour des taches simples et exactes, d'autres outils suffisent." },
      { t: "L'IA est utile quand il y a beaucoup de donnees et des motifs complexes.", ok: true, ex: "C'est la qu'elle apporte une vraie valeur." },
    ],
  }),
];

// --------------------------------------------------------------------------
// NOTION 2 — Concevoir de facon responsable
// --------------------------------------------------------------------------

const risquesRegles: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_risques_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_conception_responsable",
    microId: "ia_c1_risques_regles",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi prevoir les RISQUES d'un projet IA des le depart ?",
    format: "qcm",
    choices: [
      "Pour proposer des regles de securite et limiter les degats possibles.",
      "Pour faire peur aux gens.",
      "Cela ne sert a rien.",
      "Pour rallonger la presentation.",
    ],
    expected: ["Pour proposer des regles de securite et limiter les degats possibles."],
    comparator: "mcq_exact",
    hint: "Anticiper = se proteger.",
    explanation: exp(
      "Anticiper les risques permet de prevoir des garde-fous.",
      "On limite ainsi les erreurs, les abus et les degats.",
      "Risque « donnees exposees » -> regle « anonymiser les donnees ».",
      "Prevoir les risques = poser des regles de securite."
    ),
    tags: ["c1", "ia", "risques", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_risques_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_conception_responsable",
    microId: "ia_c1_risques_regles",
    difficulty: 3,
    theme: "neutral",
    text: "Risque : « l'IA peut donner une mauvaise reponse ». Quelle regle de securite repond le mieux ?",
    format: "qcm",
    choices: [
      "Faire valider les reponses importantes par un humain avant action.",
      "Ignorer le risque.",
      "Cacher les erreurs aux utilisateurs.",
      "Supprimer le bouton « aide ».",
    ],
    expected: ["Faire valider les reponses importantes par un humain avant action."],
    comparator: "mcq_exact",
    hint: "Un garde-fou humain sur les decisions importantes.",
    explanation: exp(
      "A chaque risque, on associe une regle concrete.",
      "Une validation humaine evite qu'une erreur ait des consequences graves.",
      "« Verification humaine avant decision importante » est un bon garde-fou.",
      "Risque identifie -> regle concrete associee."
    ),
    tags: ["c1", "ia", "risques", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_risques_vf",
    microId: "ia_c1_risques_regles",
    notionId: "ia_c1_conception_responsable",
    difficulty: 2,
    pool: [
      { t: "Anticiper les risques permet de prevoir des regles de securite.", ok: true, ex: "On limite les degats avant qu'ils arrivent." },
      { t: "Ignorer les risques est une bonne strategie de projet.", ok: false, ex: "C'est s'exposer a des problemes evitables." },
      { t: "Une validation humaine peut servir de garde-fou.", ok: true, ex: "Elle bloque les erreurs avant des consequences graves." },
    ],
  }),
];

const ethiqueInclusion: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_ethique_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_conception_responsable",
    microId: "ia_c1_ethique_inclusion",
    difficulty: 2,
    theme: "neutral",
    text: "Pour qu'un projet IA soit EQUITABLE, il faut surtout :",
    format: "qcm",
    choices: [
      "Verifier qu'il fonctionne aussi bien pour tous les groupes d'utilisateurs.",
      "Le faire marcher pour un seul type de personnes.",
      "Ignorer ceux qu'il desavantage.",
      "Ne tester avec personne.",
    ],
    expected: ["Verifier qu'il fonctionne aussi bien pour tous les groupes d'utilisateurs."],
    comparator: "mcq_exact",
    hint: "Equite = bien marcher pour tout le monde.",
    explanation: exp(
      "Un projet equitable marche pour tous, sans desavantager un groupe.",
      "Les biais des donnees peuvent creer des injustices : on les surveille.",
      "On teste l'outil avec des profils varies pour reperer les ecarts.",
      "Equite = ca marche pour tous les groupes."
    ),
    tags: ["c1", "ia", "ethique", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_ethique_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_conception_responsable",
    microId: "ia_c1_ethique_inclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Penser l'INCLUSION dans un projet, c'est par exemple :",
    format: "qcm",
    choices: [
      "Le rendre utilisable par des personnes en situation de handicap.",
      "Le reserver aux experts.",
      "Compliquer l'acces volontairement.",
      "Ne penser qu'a soi.",
    ],
    expected: ["Le rendre utilisable par des personnes en situation de handicap."],
    comparator: "mcq_exact",
    hint: "Inclusion = accessible au plus grand nombre.",
    explanation: exp(
      "L'inclusion vise un outil utilisable par le plus grand nombre.",
      "Cela comprend l'accessibilite (handicap, langue, materiel).",
      "Sous-titres, gros contrastes, langage simple : des choix inclusifs.",
      "Inclusion = accessible a tous, y compris en situation de handicap."
    ),
    tags: ["c1", "ia", "ethique", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_ethique_vf",
    microId: "ia_c1_ethique_inclusion",
    notionId: "ia_c1_conception_responsable",
    difficulty: 2,
    pool: [
      { t: "Un projet equitable doit fonctionner pour tous les groupes d'utilisateurs.", ok: true, ex: "On surveille les biais pour eviter les injustices." },
      { t: "Penser a l'accessibilite (handicap, langue) fait partie d'un projet responsable.", ok: true, ex: "L'inclusion elargit l'utilite a plus de personnes." },
      { t: "Il est acceptable qu'une IA desavantage un groupe si elle aide les autres.", ok: false, ex: "L'equite demande de corriger ces desavantages." },
      { t: "Tester avec des profils varies aide a reperer les injustices.", ok: true, ex: "On voit si l'outil marche aussi bien pour chacun." },
    ],
  }),
];

const donneesEthique: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_donnethique_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_conception_responsable",
    microId: "ia_c1_donnees_ethique",
    difficulty: 2,
    theme: "neutral",
    text: "Tu veux utiliser les photos de camarades pour entrainer ton projet. Que faire d'abord ?",
    format: "qcm",
    choices: [
      "Demander leur consentement et respecter leur vie privee.",
      "Les prendre sans rien demander.",
      "Les diffuser publiquement.",
      "Les vendre.",
    ],
    expected: ["Demander leur consentement et respecter leur vie privee."],
    comparator: "mcq_exact",
    hint: "Consentement + vie privee.",
    explanation: exp(
      "Utiliser des donnees de personnes demande leur consentement.",
      "Le respect de la vie privee est une regle de base.",
      "On demande l'accord et on protege les donnees collectees.",
      "Donnees de personnes = consentement + vie privee."
    ),
    tags: ["c1", "ia", "donnees-ethique", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_donnethique_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_conception_responsable",
    microId: "ia_c1_donnees_ethique",
    difficulty: 3,
    theme: "neutral",
    text: "Quel usage des donnees est le plus RESPONSABLE dans un projet ?",
    format: "qcm",
    choices: [
      "Ne collecter que les donnees necessaires et les proteger.",
      "Collecter le maximum de donnees, au cas ou.",
      "Garder les donnees pour toujours, sans raison.",
      "Partager les donnees avec n'importe qui.",
    ],
    expected: ["Ne collecter que les donnees necessaires et les proteger."],
    comparator: "mcq_exact",
    hint: "Le minimum necessaire, bien protege.",
    explanation: exp(
      "On collecte le minimum de donnees utiles et on les protege.",
      "Moins de donnees inutiles = moins de risques en cas de fuite.",
      "On evite de tout garder « au cas ou » sans justification.",
      "Donnees responsables = strict necessaire + protection."
    ),
    tags: ["c1", "ia", "donnees-ethique", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_donnethique_vf",
    microId: "ia_c1_donnees_ethique",
    notionId: "ia_c1_conception_responsable",
    difficulty: 2,
    pool: [
      { t: "Utiliser les donnees de personnes demande leur consentement.", ok: true, ex: "Le respect de la vie privee est une regle de base." },
      { t: "Collecter le maximum de donnees « au cas ou » est responsable.", ok: false, ex: "On ne collecte que le necessaire pour limiter les risques." },
      { t: "Proteger les donnees collectees fait partie d'un projet ethique.", ok: true, ex: "Cela limite les degats en cas de fuite." },
    ],
  }),
];

const impactDurable: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_impact_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_conception_responsable",
    microId: "ia_c1_impact_durable",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi penser a l'impact ENVIRONNEMENTAL d'un projet IA ?",
    format: "qcm",
    choices: [
      "Parce que l'IA consomme de l'energie : un projet sobre est plus responsable.",
      "Parce que l'IA n'a aucun impact.",
      "Parce que ca rend le projet plus lent pour rien.",
      "Cela n'a aucun rapport avec un projet.",
    ],
    expected: ["Parce que l'IA consomme de l'energie : un projet sobre est plus responsable."],
    comparator: "mcq_exact",
    hint: "L'IA a un cout energetique.",
    explanation: exp(
      "Un projet responsable tient compte de son cout energetique.",
      "On peut viser la sobriete : modele adapte, requetes utiles.",
      "Choisir l'outil le plus leger qui fait le travail limite l'empreinte.",
      "Projet responsable = aussi sobre en energie."
    ),
    tags: ["c1", "ia", "ecologie", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_impact_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_conception_responsable",
    microId: "ia_c1_impact_durable",
    difficulty: 3,
    theme: "neutral",
    text: "Penser l'impact SOCIAL d'un projet IA, c'est se demander :",
    format: "qcm",
    choices: [
      "Qui pourrait etre aide, mais aussi qui pourrait etre desavantage ?",
      "Quelle est la couleur du bouton ?",
      "Combien de likes on aura ?",
      "Rien, l'impact social n'existe pas.",
    ],
    expected: ["Qui pourrait etre aide, mais aussi qui pourrait etre desavantage ?"],
    comparator: "mcq_exact",
    hint: "Effets positifs ET negatifs sur les gens.",
    explanation: exp(
      "L'impact social regarde les effets sur les personnes.",
      "Un projet peut aider certains et en penaliser d'autres.",
      "On anticipe ces effets pour ajuster et proteger.",
      "Impact social = qui est aide, qui pourrait etre lese."
    ),
    tags: ["c1", "ia", "impact-social", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_impact_vf",
    microId: "ia_c1_impact_durable",
    notionId: "ia_c1_conception_responsable",
    difficulty: 2,
    pool: [
      { t: "Un projet IA responsable tient compte de sa consommation d'energie.", ok: true, ex: "On vise la sobriete : outil adapte, requetes utiles." },
      { t: "L'impact social d'un projet ne merite jamais d'etre etudie.", ok: false, ex: "Un projet peut aider certains et en desavantager d'autres." },
      { t: "Choisir l'outil le plus leger qui fait le travail limite l'empreinte.", ok: true, ex: "Inutile de mobiliser un modele enorme pour une tache simple." },
    ],
  }),
];

// --------------------------------------------------------------------------
// NOTION 3 — Tester et presenter
// --------------------------------------------------------------------------

const testerAmeliorer: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_tester_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_responsabilite_pitch",
    microId: "ia_c1_tester_ameliorer",
    difficulty: 2,
    theme: "neutral",
    text: "A quoi sert de tester sa maquette avec de vrais utilisateurs ?",
    format: "qcm",
    choices: [
      "A reperer ce qui ne va pas et ameliorer le projet grace aux retours.",
      "A prouver qu'on a raison sans rien changer.",
      "A ignorer les avis des gens.",
      "A finir plus vite sans reflechir.",
    ],
    expected: ["A reperer ce qui ne va pas et ameliorer le projet grace aux retours."],
    comparator: "mcq_exact",
    hint: "Tester = apprendre des retours.",
    explanation: exp(
      "Tester sert a decouvrir les problemes reels et a s'ameliorer.",
      "Les retours des utilisateurs sont une mine d'informations.",
      "On observe ou ils bloquent, puis on corrige ces points.",
      "Tester = recueillir des retours pour ameliorer."
    ),
    tags: ["c1", "ia", "test", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_tester_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_responsabilite_pitch",
    microId: "ia_c1_tester_ameliorer",
    difficulty: 3,
    theme: "neutral",
    text: "Des testeurs disent tous se perdre au meme endroit. Que fais-tu ?",
    format: "qcm",
    choices: [
      "Je corrige ce point precis, puis je re-teste.",
      "J'ignore, ils n'ont pas compris.",
      "Je supprime le projet.",
      "Je ne change rien.",
    ],
    expected: ["Je corrige ce point precis, puis je re-teste."],
    comparator: "mcq_exact",
    hint: "Un retour repete = un vrai probleme a corriger.",
    explanation: exp(
      "Un probleme signale par plusieurs testeurs est reel.",
      "On corrige, puis on re-teste pour verifier l'amelioration.",
      "C'est la boucle tester -> ameliorer -> re-tester.",
      "Retour repete = corriger puis re-tester."
    ),
    tags: ["c1", "ia", "test", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_tester_vf",
    microId: "ia_c1_tester_ameliorer",
    notionId: "ia_c1_responsabilite_pitch",
    difficulty: 2,
    pool: [
      { t: "Tester avec de vrais utilisateurs aide a ameliorer le projet.", ok: true, ex: "Leurs retours revelent les vrais problemes." },
      { t: "Quand plusieurs testeurs bloquent au meme endroit, il faut corriger ce point.", ok: true, ex: "Un retour repete signale un probleme reel." },
      { t: "Les retours des utilisateurs doivent etre ignores.", ok: false, ex: "Ils sont precieux pour progresser." },
    ],
  }),
];

const pitchJury: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_pitch_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_responsabilite_pitch",
    microId: "ia_c1_pitch_jury",
    difficulty: 2,
    theme: "neutral",
    text: "Un bon « pitch » de projet presente surtout :",
    format: "qcm",
    choices: [
      "Le probleme, la solution, son utilite et comment elle marche, clairement.",
      "Uniquement des mots techniques compliques.",
      "Tout sauf le but du projet.",
      "Le plus de slides possible, sans ordre.",
    ],
    expected: ["Le probleme, la solution, son utilite et comment elle marche, clairement."],
    comparator: "mcq_exact",
    hint: "Probleme -> solution -> utilite, clairement.",
    explanation: exp(
      "Un bon pitch raconte clairement probleme, solution et utilite.",
      "Le jury doit comprendre vite pourquoi le projet compte.",
      "« Voici le probleme, voici notre solution, voici ce qu'elle apporte. »",
      "Pitch clair = probleme + solution + utilite."
    ),
    tags: ["c1", "ia", "pitch", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_pitch_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_responsabilite_pitch",
    microId: "ia_c1_pitch_jury",
    difficulty: 3,
    theme: "neutral",
    text: "Un membre du jury pose une question a laquelle tu n'as pas pense. Bonne attitude ?",
    format: "qcm",
    choices: [
      "Repondre honnetement, et dire ce que je verifierais ou ferais ensuite.",
      "Inventer une reponse fausse avec assurance.",
      "Refuser de repondre et me vexer.",
      "Faire semblant de ne pas entendre.",
    ],
    expected: ["Repondre honnetement, et dire ce que je verifierais ou ferais ensuite."],
    comparator: "mcq_exact",
    hint: "Honnetete + ouverture.",
    explanation: exp(
      "Face a une question imprevue, l'honnetete est la meilleure reponse.",
      "Reconnaitre une limite et proposer une suite montre de la maturite.",
      "« Bonne question, je verifierais X avant de trancher. »",
      "Pitch : repondre honnetement, montrer comment on irait plus loin."
    ),
    tags: ["c1", "ia", "pitch", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_pitch_vf",
    microId: "ia_c1_pitch_jury",
    notionId: "ia_c1_responsabilite_pitch",
    difficulty: 2,
    pool: [
      { t: "Un bon pitch explique clairement le probleme, la solution et son utilite.", ok: true, ex: "Le jury comprend vite pourquoi le projet compte." },
      { t: "Noyer le jury sous le jargon technique est une bonne strategie.", ok: false, ex: "La clarte vaut mieux que la complexite." },
      { t: "Repondre honnetement a une question imprevue est preferable a inventer.", ok: true, ex: "L'honnetete inspire confiance et montre de la maturite." },
    ],
  }),
];

const argumenterChoix: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "c1_ia_argument_1",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_responsabilite_pitch",
    microId: "ia_c1_argumenter_choix",
    difficulty: 2,
    theme: "neutral",
    text: "Le jury demande : « Pourquoi avoir choisi cette solution ? » Bonne reponse :",
    format: "qcm",
    choices: [
      "J'explique le besoin, les options envisagees et pourquoi celle-ci est la meilleure.",
      "« Parce que. »",
      "« Au hasard. »",
      "« Je ne sais pas, l'IA a choisi. »",
    ],
    expected: ["J'explique le besoin, les options envisagees et pourquoi celle-ci est la meilleure."],
    comparator: "mcq_exact",
    hint: "Justifier = relier le choix au besoin et aux alternatives.",
    explanation: exp(
      "Justifier un choix, c'est le relier au besoin et aux alternatives.",
      "Cela montre qu'on a reflechi et compare avant de decider.",
      "« On a compare A et B ; B repond mieux au besoin car... ».",
      "Argumenter = besoin + options + raison du choix."
    ),
    tags: ["c1", "ia", "argumentation", "qcm"],
  },
  {
    kind: "fixed",
    id: "c1_ia_argument_2",
    niveau: "c1",
    matiere: "ia",
    notionId: "ia_c1_responsabilite_pitch",
    microId: "ia_c1_argumenter_choix",
    difficulty: 3,
    theme: "neutral",
    text: "Le jury demande quels GARDE-FOUS tu as prevus. Que mets-tu en avant ?",
    format: "qcm",
    choices: [
      "Les risques identifies et les regles concretes pour les limiter.",
      "Le fait qu'il n'y a aucun risque.",
      "Que les regles ne servent a rien.",
      "Que l'humain ne controle jamais rien.",
    ],
    expected: ["Les risques identifies et les regles concretes pour les limiter."],
    comparator: "mcq_exact",
    hint: "Montrer risques + regles associees.",
    explanation: exp(
      "On valorise les risques anticipes et les regles posees.",
      "Cela prouve que le projet est pense de facon responsable.",
      "« Risque X -> regle Y (validation humaine, anonymisation...) ».",
      "Argumenter la responsabilite = risques + garde-fous concrets."
    ),
    tags: ["c1", "ia", "argumentation", "qcm"],
  },
  vraiFauxTemplate({
    id: "c1_ia_argument_vf",
    microId: "ia_c1_argumenter_choix",
    notionId: "ia_c1_responsabilite_pitch",
    difficulty: 2,
    pool: [
      { t: "Justifier un choix, c'est le relier au besoin et aux alternatives etudiees.", ok: true, ex: "Cela montre une vraie reflexion." },
      { t: "« Parce que c'est comme ca » est une bonne justification.", ok: false, ex: "Une justification s'appuie sur des raisons concretes." },
      { t: "Presenter ses garde-fous renforce la credibilite du projet.", ok: true, ex: "Cela prouve une conception responsable." },
      { t: "Savoir expliquer ses choix de donnees fait partie d'un bon projet.", ok: true, ex: "On montre pourquoi ces donnees et pas d'autres." },
    ],
  }),
];

// --------------------------------------------------------------------------
// Banque complete C1
// --------------------------------------------------------------------------

export const iaC1QuestionBank: TutorBankItemV4[] = [
  // Notion 1 - Cadrer un projet IA utile
  ...problemeReel,
  ...donneesRoleHumain,
  ...criteresReussite,
  ...solutionAdaptee,
  // Notion 2 - Concevoir de facon responsable
  ...risquesRegles,
  ...ethiqueInclusion,
  ...donneesEthique,
  ...impactDurable,
  // Notion 3 - Tester et presenter
  ...testerAmeliorer,
  ...pitchJury,
  ...argumenterChoix,
];

export function getIaC1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = iaC1QuestionBank;

  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);

  return bank;
}
