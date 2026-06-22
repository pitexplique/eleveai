// lib/tutor-v4/questionBank/a1/ia/index.ts
//
// Coach IA - Niveau A1 « Je comprends »
//
// REGLE DE DESIGN (option D, comme les banques maths seconde) :
//   - fixed   : definitions, cas remarquables, idees-cles a fixer.
//   - template: variete (tirage aleatoire dans des pools de situations / vrai-faux)
//               pour eviter que les eleves retombent toujours sur la meme question.
//   - QCM dominant (matiere de reflexion) avec de VRAIS distracteurs plausibles
//     (le moteur melange les choix : cf. shuffleChoices dans questionPairBuilder).
//   - short UNIQUEMENT pour une reponse numerique courte et non ambigue (comptage).
//   - pas de format `open` pour l'instant (clavier mobile).
//
// 3 notions / 11 micro-competences, ~10 questions par micro, difficultes 1->5.
// Contextes proches des eleves : La Reunion, sport, jeux video, ecologie.

import type { TutorBankItemV4, TutorBankItemTemplateV4 } from "@/lib/tutor-v4/types";

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Explication structuree commune. */
function exp(essentiel: string, pourquoi: string, exemple: string, retenir: string) {
  return (
    `L'essentiel : ${essentiel}\n\n` +
    `Pourquoi : ${pourquoi}\n\n` +
    `Exemple : ${exemple}\n\n` +
    `A retenir : ${retenir}`
  );
}

type VF = { t: string; ok: boolean; ex: string };

/**
 * Construit un item template « Vrai ou faux ? » qui tire une affirmation au hasard
 * dans un pool. Parfait pour travailler les idees recues sur l'IA.
 */
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
    niveau: "a1",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint ?? "Reflechis a ce qu'une IA est vraiment : un programme, pas une personne.",
    tags: ["a1", "ia", "vrai-faux", "template"],
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
          "On garde toujours son esprit critique face a l'IA.",
          s.ok ? "Vrai." : "Faux."
        ),
      };
    },
  };
}

type ScenarioQ = { q: string; correct: string; wrong: string[]; why: string };

/**
 * Construit un item template QCM a partir d'un pool de mises en situation
 * (une bonne reponse + plusieurs distracteurs plausibles).
 */
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
    niveau: "a1",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint,
    tags: ["a1", "ia", "situation", "template"],
    generate: () => {
      const s = pick(opts.pool);
      return {
        text: s.q,
        format: "qcm",
        choices: [s.correct, ...s.wrong],
        expected: [s.correct],
        comparator: "mcq_exact",
        explanation: exp(
          `Bonne reponse : ${s.correct}`,
          s.why,
          "On choisit l'action qui garde l'humain maitre de la decision.",
          s.correct
        ),
      };
    },
  };
}

// --------------------------------------------------------------------------
// NOTION 1 — Qu'est-ce que l'IA ?
// --------------------------------------------------------------------------

const expliquerIa: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_expliquer_def_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_expliquer_ia",
    difficulty: 1,
    theme: "neutral",
    text: "Avec tes mots : qu'est-ce qu'une intelligence artificielle (IA) ?",
    format: "qcm",
    choices: [
      "Un programme informatique qui apprend a partir d'exemples pour realiser des taches.",
      "Un robot vivant qui pense et ressent comme un humain.",
      "Une personne tres intelligente qui repond derriere l'ecran.",
      "Un objet magique qui sait absolument tout.",
    ],
    expected: ["Un programme informatique qui apprend a partir d'exemples pour realiser des taches."],
    comparator: "mcq_exact",
    hint: "L'IA est un programme, pas une personne ni de la magie.",
    explanation: exp(
      "Une IA est un programme informatique entraine sur beaucoup d'exemples.",
      "Elle repere des regularites dans ces exemples pour accomplir une tache (repondre, traduire, trier...).",
      "ChatGPT predit le mot suivant le plus probable ; il ne « comprend » pas comme toi.",
      "IA = programme qui apprend a partir de donnees."
    ),
    tags: ["a1", "ia", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_expliquer_def_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_expliquer_ia",
    difficulty: 2,
    theme: "neutral",
    text: "Une IA comme un assistant de discussion (chatbot) est-elle vivante ou consciente ?",
    format: "qcm",
    choices: [
      "Non : c'est un programme, il n'a ni conscience ni emotions.",
      "Oui : elle est vivante puisqu'elle parle.",
      "Oui : elle ressent de la joie quand on la remercie.",
      "Elle est a moitie humaine.",
    ],
    expected: ["Non : c'est un programme, il n'a ni conscience ni emotions."],
    comparator: "mcq_exact",
    hint: "Parler n'est pas etre vivant.",
    explanation: exp(
      "Une IA n'a ni conscience, ni emotions, ni volonte.",
      "Elle produit du texte qui ressemble a celui d'un humain, mais c'est un calcul.",
      "Quand elle ecrit « je suis content de t'aider », c'est une formule apprise, pas un ressenti.",
      "Une IA imite le langage, elle ne ressent rien."
    ),
    tags: ["a1", "ia", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_expliquer_def_3",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_expliquer_ia",
    difficulty: 2,
    theme: "jeux_video",
    text: "Dans un jeu video, les ennemis qui te poursuivent « tout seuls » sont pilotes par :",
    format: "qcm",
    choices: [
      "Un programme (parfois appele IA du jeu) qui suit des regles.",
      "Un vrai cerveau humain place dans la console.",
      "Le hasard pur, sans aucune regle.",
      "Un autre joueur cache quelque part.",
    ],
    expected: ["Un programme (parfois appele IA du jeu) qui suit des regles."],
    comparator: "mcq_exact",
    hint: "« IA du jeu » = comportement programme.",
    explanation: exp(
      "Les personnages non-joueurs sont controles par un programme.",
      "On l'appelle « IA » dans les jeux, mais ce sont surtout des regles et des calculs.",
      "Un ennemi « voit » le joueur et applique : si proche -> attaquer.",
      "L'IA d'un jeu est un programme, pas un humain."
    ),
    tags: ["a1", "ia", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_expliquer_def_4",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_expliquer_ia",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase explique le MIEUX, simplement, comment fonctionne une IA qui ecrit du texte ?",
    format: "qcm",
    choices: [
      "Elle calcule, mot apres mot, la suite la plus probable d'apres ce qu'elle a appris.",
      "Elle va chercher la phrase exacte dans une grande encyclopedie.",
      "Elle telephone a un expert humain qui dicte la reponse.",
      "Elle invente au hasard sans aucune logique.",
    ],
    expected: ["Elle calcule, mot apres mot, la suite la plus probable d'apres ce qu'elle a appris."],
    comparator: "mcq_exact",
    hint: "Pense a « mot le plus probable ».",
    explanation: exp(
      "Une IA de texte predit le mot suivant le plus probable.",
      "Elle a appris sur enormement de textes quels mots vont souvent ensemble.",
      "Apres « il fait beau, je vais a la... » elle propose « plage » car c'est probable.",
      "IA de texte = machine a predire le mot suivant."
    ),
    tags: ["a1", "ia", "definition", "qcm"],
  },
  vraiFauxTemplate({
    id: "a1_ia_expliquer_vf",
    microId: "ia_a1_expliquer_ia",
    notionId: "ia_a1_definition",
    difficulty: 2,
    pool: [
      { t: "Une IA est un programme entraine sur des exemples.", ok: true, ex: "C'est la definition meme d'une IA d'aujourd'hui." },
      { t: "Une IA a un cerveau humain a l'interieur.", ok: false, ex: "Il n'y a pas de cerveau : seulement des calculs sur un ordinateur." },
      { t: "Une IA ressent des emotions comme la peur ou la joie.", ok: false, ex: "Elle imite le langage des emotions mais n'en eprouve aucune." },
      { t: "Une IA peut realiser des taches sans etre vivante.", ok: true, ex: "Trier, traduire, repondre : ce sont des taches, pas une preuve de vie." },
      { t: "Le mot « intelligence » dans IA veut dire qu'elle est plus intelligente que tous les humains.", ok: false, ex: "C'est une intelligence tres specialisee et limitee, pas une intelligence generale superieure." },
    ],
  }),
  vraiFauxTemplate({
    id: "a1_ia_expliquer_vf2",
    microId: "ia_a1_expliquer_ia",
    notionId: "ia_a1_definition",
    difficulty: 3,
    pool: [
      { t: "Une IA comprend le sens des mots exactement comme un humain.", ok: false, ex: "Elle manipule des probabilites de mots, ce n'est pas la meme chose que comprendre." },
      { t: "Une IA peut donner une reponse differente a la meme question.", ok: true, ex: "Elle calcule des probabilites : la suite la plus probable peut varier." },
      { t: "Une IA fonctionne grace a un programme sur des ordinateurs puissants.", ok: true, ex: "Les grands modeles tournent sur des serveurs tres puissants." },
    ],
  }),
];

const distinguerOutils: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_distinguer_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_distinguer_outils",
    difficulty: 1,
    theme: "neutral",
    text: "Que fait surtout un MOTEUR DE RECHERCHE (comme Google) ?",
    format: "qcm",
    choices: [
      "Il trouve des pages web existantes qui correspondent a ma recherche.",
      "Il invente un texte nouveau mot par mot.",
      "Il calcule des operations mathematiques.",
      "Il reflechit a ma place et decide pour moi.",
    ],
    expected: ["Il trouve des pages web existantes qui correspondent a ma recherche."],
    comparator: "mcq_exact",
    hint: "Un moteur de recherche RENVOIE vers des pages qui existent deja.",
    explanation: exp(
      "Un moteur de recherche liste des pages web qui existent deja.",
      "Il ne fabrique pas de texte nouveau, il classe des liens.",
      "Tu cherches « volcan La Reunion » -> il propose des sites a lire.",
      "Moteur de recherche = il trouve des pages existantes."
    ),
    tags: ["a1", "ia", "distinguer", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_distinguer_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_distinguer_outils",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la difference principale entre une CALCULATRICE et une IA generative ?",
    format: "qcm",
    choices: [
      "La calculatrice donne un resultat exact et sur ; l'IA donne une reponse probable a verifier.",
      "Il n'y a aucune difference, c'est la meme chose.",
      "La calculatrice se trompe souvent, l'IA jamais.",
      "L'IA ne sert qu'a calculer des nombres.",
    ],
    expected: ["La calculatrice donne un resultat exact et sur ; l'IA donne une reponse probable a verifier."],
    comparator: "mcq_exact",
    hint: "L'une est exacte, l'autre est probable.",
    explanation: exp(
      "Une calculatrice applique des regles exactes : 7x8 fait toujours 56.",
      "Une IA generative propose une reponse probable, qui peut etre fausse.",
      "Demander un calcul a une IA est risque ; une calculatrice est sure.",
      "Calculatrice = exacte ; IA = probable, a verifier."
    ),
    tags: ["a1", "ia", "distinguer", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_distinguer_3",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_distinguer_outils",
    difficulty: 3,
    theme: "neutral",
    text: "Qu'est-ce qu'un HUMAIN peut faire qu'une IA ne fait pas vraiment ?",
    format: "qcm",
    choices: [
      "Comprendre une situation, ressentir, et etre responsable de ses choix.",
      "Ecrire tres vite un long texte.",
      "Repondre a beaucoup de questions a la suite.",
      "Traduire une phrase dans une autre langue.",
    ],
    expected: ["Comprendre une situation, ressentir, et etre responsable de ses choix."],
    comparator: "mcq_exact",
    hint: "Responsabilite, sens, emotions : cote humain.",
    explanation: exp(
      "L'humain comprend vraiment, ressent, et reste responsable.",
      "L'IA peut imiter ces choses, mais ne les vit pas et n'est pas responsable.",
      "Si un texte d'IA blesse quelqu'un, c'est l'humain qui l'a publie qui repond.",
      "L'humain garde le sens et la responsabilite."
    ),
    tags: ["a1", "ia", "distinguer", "qcm"],
  },
  scenarioTemplate({
    id: "a1_ia_distinguer_scn",
    microId: "ia_a1_distinguer_outils",
    notionId: "ia_a1_definition",
    difficulty: 2,
    hint: "Quel OUTIL est le mieux adapte a la tache ?",
    pool: [
      {
        q: "Tu veux le resultat EXACT de 348 x 27 pour un controle. Quel outil choisir ?",
        correct: "Une calculatrice : le resultat sera exact.",
        wrong: ["Une IA generative, sans verifier.", "Un moteur de recherche d'images."],
        why: "Pour un calcul exact, la calculatrice est l'outil sur ; l'IA peut se tromper.",
      },
      {
        q: "Tu cherches le site officiel de ton college. Quel outil est le plus adapte ?",
        correct: "Un moteur de recherche : il trouve la page qui existe deja.",
        wrong: ["Une IA, qui pourrait inventer une adresse.", "Une calculatrice."],
        why: "Trouver une page existante, c'est le role d'un moteur de recherche.",
      },
      {
        q: "Tu veux qu'on te resume un long texte avec tes mots. Quel outil ?",
        correct: "Une IA generative, puis je verifie le resume.",
        wrong: ["Une calculatrice.", "Un thermometre connecte."],
        why: "Reformuler/resumer du texte est typiquement une tache d'IA generative (a verifier).",
      },
      {
        q: "Une dispute eclate entre deux camarades : qui doit decider de la solution juste ?",
        correct: "Un humain responsable (adulte, eleves concernes).",
        wrong: ["Une IA, qui tranchera a notre place.", "Un moteur de recherche."],
        why: "Une decision qui engage des personnes reste une responsabilite humaine.",
      },
    ],
  }),
  vraiFauxTemplate({
    id: "a1_ia_distinguer_vf",
    microId: "ia_a1_distinguer_outils",
    notionId: "ia_a1_definition",
    difficulty: 2,
    pool: [
      { t: "Un moteur de recherche fabrique un texte nouveau a chaque fois.", ok: false, ex: "Non : il classe des pages qui existent deja. C'est l'IA generative qui fabrique du texte." },
      { t: "Une calculatrice donne un resultat sur pour une operation.", ok: true, ex: "Elle applique des regles exactes : pas d'approximation." },
      { t: "Une IA est toujours le meilleur outil pour tout.", ok: false, ex: "Selon la tache, calculatrice, moteur de recherche ou humain sont parfois bien meilleurs." },
      { t: "L'humain reste responsable de l'usage qu'il fait d'une IA.", ok: true, ex: "C'est toi qui choisis, verifies et publies : la responsabilite est humaine." },
    ],
  }),
];

const reconnaitreIa: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_reconnaitre_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_reconnaitre_ia",
    difficulty: 1,
    theme: "neutral",
    text: "Dans laquelle de ces situations utilises-tu (sans forcement le savoir) de l'IA ?",
    format: "qcm",
    choices: [
      "Les videos recommandees « pour toi » sur une appli de videos.",
      "Allumer la lumiere avec un interrupteur.",
      "Ouvrir une porte avec une cle.",
      "Ecrire avec un stylo sur une feuille.",
    ],
    expected: ["Les videos recommandees « pour toi » sur une appli de videos."],
    comparator: "mcq_exact",
    hint: "La « recommandation personnalisee » est faite par une IA.",
    explanation: exp(
      "Les recommandations « pour toi » sont calculees par une IA.",
      "Elle predit ce qui va te plaire d'apres ce que tu as deja regarde.",
      "Plus tu regardes de videos de basket, plus elle t'en propose.",
      "Recommandations personnalisees = IA."
    ),
    tags: ["a1", "ia", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_reconnaitre_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_reconnaitre_ia",
    difficulty: 2,
    theme: "neutral",
    text: "Ton telephone reconnait ton visage pour se deverrouiller. Cela utilise :",
    format: "qcm",
    choices: [
      "Une IA de reconnaissance d'images.",
      "Aucune technologie particuliere.",
      "Une simple calculatrice.",
      "Un moteur de recherche internet.",
    ],
    expected: ["Une IA de reconnaissance d'images."],
    comparator: "mcq_exact",
    hint: "Reconnaitre un visage = reconnaissance d'images.",
    explanation: exp(
      "La reconnaissance de visage est une IA entrainee sur des images.",
      "Elle a appris a reperer les traits d'un visage et a le comparer au tien.",
      "Filtres « selfie », tri automatique des photos : meme famille d'IA.",
      "Reconnaissance de visage/d'images = IA."
    ),
    tags: ["a1", "ia", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_reconnaitre_short_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_reconnaitre_ia",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces 4 usages, combien reposent sur de l'IA ?\n1) Recommandation de musique « pour toi »\n2) Traduction automatique d'un texte\n3) Additionner deux nombres a la calculatrice\n4) Assistant vocal qui comprend ta phrase\n\nDonne le nombre.",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte ceux qui « apprennent » ou « comprennent », pas le calcul simple.",
    explanation: exp(
      "Recommandation, traduction et assistant vocal reposent sur de l'IA : cela fait 3.",
      "L'addition a la calculatrice est un calcul exact, ce n'est pas de l'IA.",
      "1, 2 et 4 sont des IA ; 3 ne l'est pas.",
      "Reponse : 3."
    ),
    tags: ["a1", "ia", "reconnaitre", "short"],
  },
  scenarioTemplate({
    id: "a1_ia_reconnaitre_scn",
    microId: "ia_a1_reconnaitre_ia",
    notionId: "ia_a1_definition",
    difficulty: 2,
    hint: "Cherche « personnalise », « reconnait », « comprend la parole »...",
    pool: [
      {
        q: "Ou y a-t-il de l'IA dans cette liste ?",
        correct: "Le clavier qui propose le mot suivant pendant que tu ecris un SMS.",
        wrong: ["Le bouton « marche/arret » du telephone.", "L'horloge qui affiche l'heure."],
        why: "La suggestion du mot suivant est une petite IA de prediction de texte.",
      },
      {
        q: "Quel exemple utilise de l'IA ?",
        correct: "Un assistant vocal qui repond quand tu lui parles.",
        wrong: ["Une lampe de poche.", "Un reveil mecanique."],
        why: "Comprendre la parole et y repondre demande une IA.",
      },
      {
        q: "Laquelle de ces situations utilise de l'IA ?",
        correct: "Une appli qui detecte des spams (courriers indesirables) automatiquement.",
        wrong: ["Plier une feuille de papier.", "Brancher un cable."],
        why: "Trier automatiquement les spams est une IA entrainee sur des exemples de courriers.",
      },
      {
        q: "Ou se cache l'IA ?",
        correct: "Le filtre qui ajoute des oreilles de chat sur ton visage en video.",
        wrong: ["Le volume du son que tu montes a la main.", "La prise electrique."],
        why: "Le filtre suit ton visage en temps reel : c'est de la reconnaissance d'images (IA).",
      },
    ],
  }),
  vraiFauxTemplate({
    id: "a1_ia_reconnaitre_vf",
    microId: "ia_a1_reconnaitre_ia",
    notionId: "ia_a1_definition",
    difficulty: 2,
    pool: [
      { t: "Les recommandations « pour toi » sont choisies par une IA.", ok: true, ex: "Elle predit ce qui pourrait te plaire d'apres ton historique." },
      { t: "Allumer la tele avec la telecommande, c'est de l'IA.", ok: false, ex: "C'est un simple signal, sans apprentissage : ce n'est pas de l'IA." },
      { t: "La traduction automatique d'un texte utilise de l'IA.", ok: true, ex: "Les traducteurs modernes sont des IA entrainees sur beaucoup de textes." },
      { t: "Une IA peut etre presente sans qu'on s'en rende compte.", ok: true, ex: "Beaucoup d'applis utilisent de l'IA en arriere-plan (tri, reco, filtres)." },
    ],
  }),
];

const apprendDonnees: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_apprend_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_apprend_donnees",
    difficulty: 1,
    theme: "neutral",
    text: "Comment une IA « apprend »-elle a reconnaitre un chat sur une photo ?",
    format: "qcm",
    choices: [
      "On lui montre des milliers de photos d'exemples et elle repere ce qui fait un chat.",
      "Quelqu'un lui explique a l'oral ce qu'est un chat, une seule fois.",
      "Elle nait en sachant deja tout.",
      "Elle demande a un chat de se presenter.",
    ],
    expected: ["On lui montre des milliers de photos d'exemples et elle repere ce qui fait un chat."],
    comparator: "mcq_exact",
    hint: "Elle apprend a partir de beaucoup d'EXEMPLES.",
    explanation: exp(
      "Une IA apprend a partir de tres nombreux exemples : les donnees.",
      "En voyant des milliers de photos, elle repere les motifs communs (oreilles, moustaches...).",
      "Plus on lui montre d'exemples varies, mieux elle reconnait.",
      "IA = apprendre a partir d'exemples (des donnees)."
    ),
    tags: ["a1", "ia", "donnees", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_apprend_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_apprend_donnees",
    difficulty: 2,
    theme: "sport",
    text: "Une IA doit reconnaitre un ballon de foot sur des photos. Que lui faut-il pour bien apprendre ?",
    format: "qcm",
    choices: [
      "Beaucoup de photos variees de ballons (jour, nuit, herbe, salle...).",
      "Une seule photo d'un seul ballon.",
      "Aucune photo, juste de la chance.",
      "La regle du hors-jeu.",
    ],
    expected: ["Beaucoup de photos variees de ballons (jour, nuit, herbe, salle...)."],
    comparator: "mcq_exact",
    hint: "Des exemples NOMBREUX et VARIES.",
    explanation: exp(
      "Pour bien apprendre, une IA a besoin de beaucoup d'exemples varies.",
      "Avec un seul exemple, elle ne saura pas reconnaitre les autres cas.",
      "Si elle n'a vu que des ballons sur l'herbe, elle ratera ceux en salle.",
      "Donnees nombreuses et variees = meilleur apprentissage."
    ),
    tags: ["a1", "ia", "donnees", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_apprend_3",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_apprend_donnees",
    difficulty: 3,
    theme: "neutral",
    text: "Que sont les « donnees » qui servent a entrainer une IA ?",
    format: "qcm",
    choices: [
      "Les exemples (textes, images, sons, chiffres...) a partir desquels elle apprend.",
      "Les fils electriques de l'ordinateur.",
      "Le prix de l'ordinateur.",
      "Le nom de la personne qui l'a allumee.",
    ],
    expected: ["Les exemples (textes, images, sons, chiffres...) a partir desquels elle apprend."],
    comparator: "mcq_exact",
    hint: "Donnees = exemples pour apprendre.",
    explanation: exp(
      "Les donnees sont les exemples utilises pour l'entrainement.",
      "Ce peut etre des textes, des images, des sons, des nombres...",
      "Une IA de traduction apprend sur des millions de phrases traduites.",
      "Donnees = exemples d'entrainement."
    ),
    tags: ["a1", "ia", "donnees", "vocabulaire", "qcm"],
  },
  vraiFauxTemplate({
    id: "a1_ia_apprend_vf",
    microId: "ia_a1_apprend_donnees",
    notionId: "ia_a1_definition",
    difficulty: 2,
    pool: [
      { t: "Une IA apprend a partir d'exemples appeles donnees.", ok: true, ex: "C'est le principe meme de l'apprentissage automatique." },
      { t: "Plus les donnees sont nombreuses et variees, mieux l'IA apprend en general.", ok: true, ex: "La variete aide l'IA a bien generaliser a de nouveaux cas." },
      { t: "Une IA n'a besoin d'aucun exemple pour apprendre.", ok: false, ex: "Sans donnees, il n'y a rien a apprendre : les exemples sont indispensables." },
      { t: "Si on entraine une IA seulement sur des photos de jour, elle marchera parfaitement la nuit.", ok: false, ex: "Elle n'a jamais vu d'exemples de nuit : elle risque de se tromper." },
      { t: "Les donnees peuvent etre des textes, des images ou des sons.", ok: true, ex: "Tout type d'exemple numerise peut servir de donnee." },
    ],
  }),
  scenarioTemplate({
    id: "a1_ia_apprend_scn",
    microId: "ia_a1_apprend_donnees",
    notionId: "ia_a1_definition",
    difficulty: 3,
    hint: "Pense a la qualite et a la variete des exemples.",
    pool: [
      {
        q: "Une IA doit reconnaitre des fruits. On ne lui montre que des bananes. Que va-t-il se passer ?",
        correct: "Elle reconnaitra mal les autres fruits, faute d'exemples.",
        wrong: ["Elle reconnaitra parfaitement tous les fruits.", "Elle devinera les autres fruits par magie."],
        why: "Une IA n'apprend que ce qu'elle a vu : sans pommes en exemple, elle rate les pommes.",
      },
      {
        q: "Pour qu'une IA reconnaisse bien des chiens de toutes races, il faut :",
        correct: "Des exemples de beaucoup de races differentes.",
        wrong: ["Un seul exemple d'une seule race.", "Aucun exemple."],
        why: "La variete des exemples permet de bien reconnaitre tous les cas.",
      },
    ],
  }),
];

const prediction: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_prediction_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_prediction",
    difficulty: 2,
    theme: "neutral",
    text: "Quand une IA repond a ta question, sa reponse est :",
    format: "qcm",
    choices: [
      "Une reponse probable, qui peut etre fausse : je dois la verifier.",
      "Toujours la verite absolue.",
      "Toujours fausse.",
      "Une copie exacte d'un livre officiel.",
    ],
    expected: ["Une reponse probable, qui peut etre fausse : je dois la verifier."],
    comparator: "mcq_exact",
    hint: "Probable n'est pas la meme chose que sur.",
    explanation: exp(
      "Une IA produit une reponse probable, pas une verite garantie.",
      "Elle calcule ce qui est plausible, ce qui n'est pas toujours exact.",
      "Elle peut donner une date d'evenement fausse avec beaucoup d'assurance.",
      "Reponse d'IA = probable, a verifier."
    ),
    tags: ["a1", "ia", "prediction", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_prediction_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_definition",
    microId: "ia_a1_prediction",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi une IA peut-elle donner deux reponses differentes a la meme question ?",
    format: "qcm",
    choices: [
      "Parce qu'elle calcule des probabilites : plusieurs suites sont possibles.",
      "Parce qu'elle est de mauvaise humeur.",
      "Parce qu'elle ment expres.",
      "C'est impossible, elle repond toujours pareil.",
    ],
    expected: ["Parce qu'elle calcule des probabilites : plusieurs suites sont possibles."],
    comparator: "mcq_exact",
    hint: "Pense « plusieurs reponses probables ».",
    explanation: exp(
      "Une IA choisit parmi plusieurs suites probables.",
      "Selon le tirage, elle peut formuler la reponse autrement.",
      "Repose la meme question : la tournure change souvent.",
      "Plusieurs reponses probables -> reponses variables."
    ),
    tags: ["a1", "ia", "prediction", "qcm"],
  },
  vraiFauxTemplate({
    id: "a1_ia_prediction_vf",
    microId: "ia_a1_prediction",
    notionId: "ia_a1_definition",
    difficulty: 2,
    pool: [
      { t: "Tout ce qu'une IA ecrit est forcement vrai.", ok: false, ex: "Elle donne une reponse probable, qui peut etre fausse." },
      { t: "Une reponse d'IA doit etre verifiee avant d'etre utilisee.", ok: true, ex: "C'est la regle de base : on garde son esprit critique." },
      { t: "Une IA peut se tromper meme quand elle a l'air tres sure d'elle.", ok: true, ex: "L'assurance du ton ne garantit pas l'exactitude." },
      { t: "Une IA donne toujours exactement la meme phrase a la meme question.", ok: false, ex: "Elle calcule des probabilites : la formulation peut changer." },
    ],
  }),
  scenarioTemplate({
    id: "a1_ia_prediction_scn",
    microId: "ia_a1_prediction",
    notionId: "ia_a1_definition",
    difficulty: 3,
    hint: "Que faire d'une reponse d'IA avant d'y croire ?",
    pool: [
      {
        q: "Une IA t'affirme une date historique. Quelle est la bonne attitude ?",
        correct: "Verifier la date avec une source fiable avant d'y croire.",
        wrong: ["La recopier telle quelle, c'est forcement juste.", "La rejeter, une IA a toujours tort."],
        why: "Une reponse d'IA est probable : on la verifie, sans la croire aveuglement ni la rejeter en bloc.",
      },
      {
        q: "Une IA te donne une « citation » d'un auteur celebre. Que fais-tu ?",
        correct: "Je verifie que la citation existe vraiment avant de l'utiliser.",
        wrong: ["Je la mets dans mon expose sans verifier.", "Je suppose qu'une IA n'invente jamais."],
        why: "Les IA peuvent inventer des citations (hallucination) : verification obligatoire.",
      },
    ],
  }),
];

// --------------------------------------------------------------------------
// NOTION 2 — Ce que l'IA sait faire... et ses limites
// --------------------------------------------------------------------------

const exemplesQuotidiens: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_exemples_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_exemples_quotidiens",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est un exemple d'IA utile dans la vie de tous les jours ?",
    format: "qcm",
    choices: [
      "La traduction automatique d'un message dans une autre langue.",
      "Lacer ses chaussures.",
      "Faire bouillir de l'eau.",
      "Ranger sa chambre a la main.",
    ],
    expected: ["La traduction automatique d'un message dans une autre langue."],
    comparator: "mcq_exact",
    hint: "Cherche la tache faite par un programme intelligent.",
    explanation: exp(
      "La traduction automatique est un usage courant de l'IA.",
      "L'IA a appris a faire correspondre les phrases entre langues.",
      "Tu recois un message en anglais : l'appli te le traduit aussitot.",
      "Traduction automatique = exemple d'IA du quotidien."
    ),
    tags: ["a1", "ia", "exemples", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_exemples_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_exemples_quotidiens",
    difficulty: 2,
    theme: "neutral",
    text: "Dans quel METIER l'IA peut-elle deja aider aujourd'hui ?",
    format: "qcm",
    choices: [
      "Medecin : l'IA aide a reperer des anomalies sur des images medicales.",
      "Aucun metier, l'IA ne sert qu'aux jeux.",
      "Seulement les metiers de l'an 3000.",
      "Aucun, car l'IA n'existe pas vraiment.",
    ],
    expected: ["Medecin : l'IA aide a reperer des anomalies sur des images medicales."],
    comparator: "mcq_exact",
    hint: "L'IA assiste deja des professionnels (sante, transport...).",
    explanation: exp(
      "L'IA aide deja dans de nombreux metiers.",
      "Elle traite vite beaucoup d'informations pour assister l'humain.",
      "En medecine, elle signale des zones suspectes ; le medecin decide.",
      "L'IA est un outil d'aide dans beaucoup de metiers."
    ),
    tags: ["a1", "ia", "exemples", "metiers", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_exemples_short_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_exemples_quotidiens",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces 4 situations, combien sont des exemples d'IA ?\n1) Reconnaissance vocale d'un assistant\n2) Recommandation de series\n3) Allumer le four manuellement\n4) Filtre anti-spam des mails\n\nDonne le nombre.",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le four manuel n'apprend rien.",
    explanation: exp(
      "Reconnaissance vocale, recommandation et anti-spam sont des IA : 3.",
      "Allumer le four a la main est une action mecanique, sans IA.",
      "1, 2 et 4 sont des IA ; 3 ne l'est pas.",
      "Reponse : 3."
    ),
    tags: ["a1", "ia", "exemples", "short"],
  },
  scenarioTemplate({
    id: "a1_ia_exemples_scn",
    microId: "ia_a1_exemples_quotidiens",
    notionId: "ia_a1_usages_limites",
    difficulty: 2,
    hint: "Cherche la tache faite par une IA.",
    pool: [
      {
        q: "Quel exemple montre l'IA au service du quotidien ?",
        correct: "Une appli de meteo qui prevoit le temps a partir de donnees.",
        wrong: ["Regarder le ciel par la fenetre.", "Lire un calendrier en papier."],
        why: "La prevision meteo moderne s'appuie sur des modeles et de l'IA.",
      },
      {
        q: "Ou l'IA aide-t-elle dans les transports ?",
        correct: "Un GPS qui calcule le trajet le plus rapide selon le trafic.",
        wrong: ["Tourner le volant.", "Mettre de l'essence."],
        why: "Le calcul d'itineraire optimal en temps reel utilise de l'IA.",
      },
      {
        q: "Quel usage d'IA peut aider a l'ecole ?",
        correct: "Un coach qui propose des exercices adaptes a ton niveau.",
        wrong: ["Tailler son crayon.", "Coller une etiquette sur le cahier."],
        why: "Adapter les exercices au niveau de l'eleve est un usage d'IA pedagogique.",
      },
    ],
  }),
];

const erreurPossible: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_erreur_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_erreur_possible",
    difficulty: 2,
    theme: "neutral",
    text: "Une IA repond avec assurance, mais sa reponse est fausse. Comment appelle-t-on cela ?",
    format: "qcm",
    choices: [
      "Une hallucination : l'IA invente une information qui semble vraie.",
      "Une preuve qu'elle a toujours raison.",
      "Un bug d'electricite.",
      "Une blague volontaire de l'IA.",
    ],
    expected: ["Une hallucination : l'IA invente une information qui semble vraie."],
    comparator: "mcq_exact",
    hint: "Le mot exact commence par « hallu ».",
    explanation: exp(
      "Quand une IA invente une info plausible mais fausse, on parle d'hallucination.",
      "Elle vise le plausible, pas la verite : elle peut donc se tromper avec aplomb.",
      "Elle peut citer un livre qui n'existe pas, en y croyant.",
      "Hallucination = invention qui parait vraie."
    ),
    tags: ["a1", "ia", "erreur", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_erreur_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_erreur_possible",
    difficulty: 1,
    theme: "neutral",
    text: "Le ton d'une IA est tres sur d'elle. Est-ce une preuve que sa reponse est juste ?",
    format: "qcm",
    choices: [
      "Non : un ton assure ne garantit pas l'exactitude.",
      "Oui : si elle est sure, c'est forcement vrai.",
      "Oui, sauf le week-end.",
      "Cela depend de la couleur de l'ecran.",
    ],
    expected: ["Non : un ton assure ne garantit pas l'exactitude."],
    comparator: "mcq_exact",
    hint: "L'assurance n'est pas une preuve.",
    explanation: exp(
      "Le ton assure ne prouve rien sur l'exactitude.",
      "L'IA ecrit toujours de facon fluide et confiante, juste ou faux.",
      "Une reponse fausse peut etre formulee tres clairement.",
      "Ton sur d'elle ne veut pas dire reponse vraie."
    ),
    tags: ["a1", "ia", "erreur", "qcm"],
  },
  vraiFauxTemplate({
    id: "a1_ia_erreur_vf",
    microId: "ia_a1_erreur_possible",
    notionId: "ia_a1_usages_limites",
    difficulty: 2,
    pool: [
      { t: "Une IA peut inventer une information qui parait vraie (hallucination).", ok: true, ex: "Elle vise le plausible, donc elle peut inventer du faux credible." },
      { t: "Si une IA repond vite et clairement, c'est forcement exact.", ok: false, ex: "La clarte et la vitesse ne garantissent pas l'exactitude." },
      { t: "Verifier une reponse d'IA importante est une bonne habitude.", ok: true, ex: "C'est la regle : croiser avec une source fiable." },
      { t: "Une IA reconnait toujours toute seule quand elle se trompe.", ok: false, ex: "Souvent elle ne « sait » pas qu'elle a tort : c'est a l'humain de verifier." },
    ],
  }),
  scenarioTemplate({
    id: "a1_ia_erreur_scn",
    microId: "ia_a1_erreur_possible",
    notionId: "ia_a1_usages_limites",
    difficulty: 3,
    hint: "Que faire face a une reponse importante ?",
    pool: [
      {
        q: "Une IA te donne une info pour un expose note. Que fais-tu ?",
        correct: "Je verifie l'info avec une source fiable avant de la mettre.",
        wrong: ["Je la copie, l'IA ne se trompe jamais.", "Je ne verifie pas, ca prend trop de temps."],
        why: "Pour un usage important, on verifie : l'IA peut halluciner.",
      },
      {
        q: "Une IA invente le nom d'un livre qui n'existe pas. Comment l'eviter dans ton travail ?",
        correct: "Verifier que la source existe vraiment (catalogue, bibliotheque).",
        wrong: ["Faire confiance au titre, il a l'air vrai.", "Inventer d'autres titres a mon tour."],
        why: "On controle l'existence des sources pour eviter de propager une hallucination.",
      },
    ],
  }),
];

const biaisDonnees: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_biais_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_biais_donnees",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi une IA peut-elle etre injuste ou « biaisee » ?",
    format: "qcm",
    choices: [
      "Parce qu'elle apprend sur des donnees qui contiennent deja des prejuges ou des manques.",
      "Parce qu'elle deteste certaines personnes.",
      "Parce qu'elle est jalouse.",
      "Une IA n'est jamais injuste.",
    ],
    expected: ["Parce qu'elle apprend sur des donnees qui contiennent deja des prejuges ou des manques."],
    comparator: "mcq_exact",
    hint: "Le probleme vient souvent des DONNEES d'entrainement.",
    explanation: exp(
      "Un biais vient surtout des donnees d'entrainement.",
      "Si les exemples sont deformes ou incomplets, l'IA reproduit ces defauts.",
      "Entrainee surtout sur un seul groupe, elle marche moins bien pour les autres.",
      "Donnees biaisees -> IA biaisee."
    ),
    tags: ["a1", "ia", "biais", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_biais_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_biais_donnees",
    difficulty: 3,
    theme: "neutral",
    text: "Une IA de reconnaissance a surtout ete entrainee sur des visages d'un seul type. Consequence probable ?",
    format: "qcm",
    choices: [
      "Elle reconnaitra moins bien les visages des autres groupes.",
      "Elle reconnaitra tout le monde a la perfection.",
      "Elle deviendra plus rapide.",
      "Cela n'a aucun effet.",
    ],
    expected: ["Elle reconnaitra moins bien les visages des autres groupes."],
    comparator: "mcq_exact",
    hint: "Elle est meilleure sur ce qu'elle a le plus vu.",
    explanation: exp(
      "Une IA marche moins bien sur ce qu'elle a peu vu a l'entrainement.",
      "Des donnees peu variees creent des inegalites de performance.",
      "C'est un vrai probleme deja observe sur des systemes reels.",
      "Manque de variete -> resultats injustes."
    ),
    tags: ["a1", "ia", "biais", "qcm"],
  },
  vraiFauxTemplate({
    id: "a1_ia_biais_vf",
    microId: "ia_a1_biais_donnees",
    notionId: "ia_a1_usages_limites",
    difficulty: 2,
    pool: [
      { t: "Une IA peut reproduire des prejuges presents dans ses donnees.", ok: true, ex: "Elle apprend ce qu'on lui montre, defauts compris." },
      { t: "Une IA est forcement neutre et juste.", ok: false, ex: "Elle depend de ses donnees, qui peuvent etre biaisees." },
      { t: "Des donnees plus variees et representatives reduisent les biais.", ok: true, ex: "Mieux les groupes sont representes, plus l'IA est equitable." },
      { t: "Un biais d'IA n'a aucune consequence dans la vie reelle.", ok: false, ex: "Cela peut creer des injustices (recrutement, reconnaissance...)." },
    ],
  }),
];

const vocabulaireBase: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_vocab_donnee",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_vocabulaire_base",
    difficulty: 1,
    theme: "neutral",
    text: "Que designe le mot « donnee » en IA ?",
    format: "qcm",
    choices: [
      "Un exemple (texte, image, son, nombre) qui sert a entrainer ou nourrir l'IA.",
      "Le bouton qui allume l'ordinateur.",
      "Le resultat final affiche a l'ecran.",
      "Le nom de l'IA.",
    ],
    expected: ["Un exemple (texte, image, son, nombre) qui sert a entrainer ou nourrir l'IA."],
    comparator: "mcq_exact",
    hint: "Donnee = matiere premiere de l'IA.",
    explanation: exp(
      "Une donnee est un exemple utilise par l'IA.",
      "Les donnees sont la matiere premiere de l'apprentissage.",
      "Photos, phrases, sons : autant de donnees possibles.",
      "Donnee = exemple pour l'IA."
    ),
    tags: ["a1", "ia", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_vocab_prompt",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_vocabulaire_base",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'un « prompt » ?",
    format: "qcm",
    choices: [
      "La consigne (texte) que j'ecris a l'IA pour lui demander quelque chose.",
      "Le nom de l'entreprise qui fabrique l'IA.",
      "Une panne de l'IA.",
      "La reponse donnee par l'IA.",
    ],
    expected: ["La consigne (texte) que j'ecris a l'IA pour lui demander quelque chose."],
    comparator: "mcq_exact",
    hint: "C'est ce que TU ecris a l'IA.",
    explanation: exp(
      "Le prompt, c'est la consigne que tu donnes a l'IA.",
      "C'est l'entree ; la reponse de l'IA, c'est la sortie.",
      "« Resume ce texte en 3 phrases » est un prompt.",
      "Prompt = ta consigne a l'IA."
    ),
    tags: ["a1", "ia", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_vocab_modele",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_vocabulaire_base",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'un « modele » en IA ?",
    format: "qcm",
    choices: [
      "Le programme entraine qui a appris a partir des donnees.",
      "Une personne qui pose pour des photos.",
      "Une maquette en carton.",
      "Le clavier de l'ordinateur.",
    ],
    expected: ["Le programme entraine qui a appris a partir des donnees."],
    comparator: "mcq_exact",
    hint: "Le modele est le « cerveau » entraine de l'IA.",
    explanation: exp(
      "Le modele est le programme une fois entraine.",
      "C'est lui qui contient ce que l'IA a appris des donnees.",
      "ChatGPT repose sur un grand modele de langage.",
      "Modele = programme entraine de l'IA."
    ),
    tags: ["a1", "ia", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "a1_ia_vocab_match_tpl",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_usages_limites",
    microId: "ia_a1_vocabulaire_base",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe chaque mot a sa bonne definition.",
    tags: ["a1", "ia", "vocabulaire", "template"],
    generate: () => {
      const items = [
        { mot: "donnee", def: "un exemple qui sert a entrainer l'IA", faux: ["la reponse finale de l'IA", "le ton de la reponse"] },
        { mot: "prompt", def: "la consigne que j'ecris a l'IA", faux: ["le resultat affiche par l'IA", "le nom du modele"] },
        { mot: "modele", def: "le programme entraine de l'IA", faux: ["une panne electrique", "un exemple d'entrainement"] },
        { mot: "biais", def: "une injustice apprise dans les donnees", faux: ["une coupure de courant", "une question posee a l'IA"] },
        { mot: "hallucination", def: "une info inventee qui parait vraie", faux: ["une reponse toujours exacte", "un type de clavier"] },
      ];
      const it = pick(items);
      return {
        text: `Que veut dire le mot « ${it.mot} » en IA ?`,
        format: "qcm",
        choices: [it.def, ...it.faux],
        expected: [it.def],
        comparator: "mcq_exact",
        explanation: exp(
          `« ${it.mot} » : ${it.def}.`,
          "Connaitre ce vocabulaire aide a parler de l'IA avec precision.",
          "donnee = exemple ; prompt = consigne ; modele = programme entraine ; biais = injustice ; hallucination = invention.",
          `${it.mot} = ${it.def}.`
        ),
      };
    },
  },
];

// --------------------------------------------------------------------------
// NOTION 3 — Mon role et l'impact de l'IA
// --------------------------------------------------------------------------

const humainResponsable: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_resp_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_responsabilite_impact",
    microId: "ia_a1_humain_responsable",
    difficulty: 1,
    theme: "neutral",
    text: "Quand tu utilises une IA pour un travail, qui reste responsable du resultat rendu ?",
    format: "qcm",
    choices: [
      "Moi : je choisis, je verifie et je decide ce que je rends.",
      "L'IA, je n'ai rien a verifier.",
      "Personne.",
      "L'ordinateur tout seul.",
    ],
    expected: ["Moi : je choisis, je verifie et je decide ce que je rends."],
    comparator: "mcq_exact",
    hint: "L'IA est un outil ; le pilote, c'est toi.",
    explanation: exp(
      "L'humain garde la responsabilite de ce qu'il rend.",
      "L'IA propose, mais c'est toi qui valides et assumes.",
      "Si l'IA ecrit une erreur et que tu la rends, l'erreur est la tienne.",
      "C'est l'humain qui decide et qui est responsable."
    ),
    tags: ["a1", "ia", "responsabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_resp_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_responsabilite_impact",
    microId: "ia_a1_humain_responsable",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la bonne facon d'utiliser une IA pour apprendre ?",
    format: "qcm",
    choices: [
      "M'en servir pour comprendre, puis reflechir et verifier par moi-meme.",
      "Lui faire faire tout le travail sans rien comprendre.",
      "Recopier sa reponse sans la lire.",
      "Croire tout ce qu'elle dit sans reflechir.",
    ],
    expected: ["M'en servir pour comprendre, puis reflechir et verifier par moi-meme."],
    comparator: "mcq_exact",
    hint: "L'IA aide a apprendre, elle ne pense pas a ta place.",
    explanation: exp(
      "L'IA est une aide pour comprendre, pas un remplacant du cerveau.",
      "Si tu deleges tout, tu n'apprends rien et tu ne progresses pas.",
      "Demande-lui d'expliquer, puis refais l'exercice seul pour verifier.",
      "Garder l'objectif, la verification et la decision : c'est mon role."
    ),
    tags: ["a1", "ia", "responsabilite", "qcm"],
  },
  scenarioTemplate({
    id: "a1_ia_resp_scn",
    microId: "ia_a1_humain_responsable",
    notionId: "ia_a1_responsabilite_impact",
    difficulty: 2,
    hint: "Choisis l'attitude qui garde l'humain maitre.",
    pool: [
      {
        q: "Une IA te propose une reponse a un exercice. Quelle est la meilleure attitude ?",
        correct: "Comprendre la methode, puis refaire l'exercice par moi-meme.",
        wrong: ["Copier sans lire.", "Tout effacer et abandonner."],
        why: "L'IA aide a comprendre ; c'est en refaisant soi-meme qu'on apprend.",
      },
      {
        q: "Une IA ecrit un texte pour ton expose. Avant de le rendre, tu dois :",
        correct: "Le relire, le verifier et le corriger avec tes mots.",
        wrong: ["Le rendre sans le lire.", "Mettre le nom de l'IA comme auteur du travail note."],
        why: "Tu restes responsable : on verifie, on s'approprie, on assume le rendu.",
      },
      {
        q: "L'IA te donne un conseil important sur ta sante. Que fais-tu ?",
        correct: "J'en parle a un adulte ou a un professionnel de sante.",
        wrong: ["Je suis le conseil les yeux fermes.", "Je decide seul a partir de l'IA."],
        why: "Pour les decisions importantes, l'humain (et l'expert) garde la main.",
      },
    ],
  }),
  vraiFauxTemplate({
    id: "a1_ia_resp_vf",
    microId: "ia_a1_humain_responsable",
    notionId: "ia_a1_responsabilite_impact",
    difficulty: 2,
    pool: [
      { t: "C'est l'humain qui reste responsable de ce qu'il rend, meme avec l'aide d'une IA.", ok: true, ex: "Tu choisis, verifies et assumes le resultat." },
      { t: "Utiliser une IA dispense de reflechir.", ok: false, ex: "L'IA aide, mais c'est en reflechissant qu'on apprend." },
      { t: "Pour une decision importante, on peut s'aider de l'IA mais c'est l'humain qui tranche.", ok: true, ex: "L'IA conseille ; la decision reste humaine." },
      { t: "Recopier une reponse d'IA sans la comprendre aide a progresser.", ok: false, ex: "Sans comprehension, il n'y a pas d'apprentissage." },
    ],
  }),
];

const energieEnvironnement: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "a1_ia_energie_1",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_responsabilite_impact",
    microId: "ia_a1_energie_environnement",
    difficulty: 1,
    theme: "neutral",
    text: "L'IA fonctionne sur des ordinateurs tres puissants. Cela a quel impact ?",
    format: "qcm",
    choices: [
      "Cela consomme de l'electricite (et de l'eau pour refroidir) : un impact sur l'environnement.",
      "Aucun impact, l'IA ne consomme rien.",
      "Cela fabrique de l'electricite.",
      "Cela nettoie l'air.",
    ],
    expected: ["Cela consomme de l'electricite (et de l'eau pour refroidir) : un impact sur l'environnement."],
    comparator: "mcq_exact",
    hint: "Des serveurs puissants -> beaucoup d'energie.",
    explanation: exp(
      "Faire tourner l'IA demande des serveurs gourmands en electricite.",
      "On doit aussi les refroidir, ce qui consomme souvent de l'eau.",
      "Les centres de donnees ont une vraie empreinte ecologique.",
      "L'IA consomme de l'energie : ce n'est pas « gratuit » pour la planete."
    ),
    tags: ["a1", "ia", "ecologie", "qcm"],
  },
  {
    kind: "fixed",
    id: "a1_ia_energie_2",
    niveau: "a1",
    matiere: "ia",
    notionId: "ia_a1_responsabilite_impact",
    microId: "ia_a1_energie_environnement",
    difficulty: 2,
    theme: "neutral",
    text: "Quel geste reduit l'impact ecologique quand on utilise l'IA ?",
    format: "qcm",
    choices: [
      "Ne l'utiliser que quand c'est utile, avec des demandes claires.",
      "Lui envoyer le plus de requetes possibles pour rien.",
      "Relancer 50 fois la meme demande par jeu.",
      "Laisser l'IA tourner en boucle toute la nuit.",
    ],
    expected: ["Ne l'utiliser que quand c'est utile, avec des demandes claires."],
    comparator: "mcq_exact",
    hint: "Moins de requetes inutiles = moins d'energie.",
    explanation: exp(
      "Chaque requete consomme de l'energie : on evite le gaspillage.",
      "Des demandes claires evitent de relancer dix fois pour rien.",
      "Bien rediger sa demande du premier coup economise des calculs.",
      "Usage utile et requetes claires = moins d'energie gaspillee."
    ),
    tags: ["a1", "ia", "ecologie", "qcm"],
  },
  vraiFauxTemplate({
    id: "a1_ia_energie_vf",
    microId: "ia_a1_energie_environnement",
    notionId: "ia_a1_responsabilite_impact",
    difficulty: 2,
    pool: [
      { t: "Utiliser une IA consomme de l'energie.", ok: true, ex: "Les serveurs qui la font tourner consomment de l'electricite." },
      { t: "L'IA n'a aucun impact sur l'environnement.", ok: false, ex: "Electricite et refroidissement (eau) ont un cout ecologique reel." },
      { t: "Faire des demandes claires evite de relancer inutilement et economise de l'energie.", ok: true, ex: "Moins de requetes inutiles = moins de calculs = moins d'energie." },
      { t: "Relancer 30 fois la meme requete pour s'amuser est sans consequence.", ok: false, ex: "Chaque requete consomme : le gaspillage a un cout pour la planete." },
    ],
  }),
  scenarioTemplate({
    id: "a1_ia_energie_scn",
    microId: "ia_a1_energie_environnement",
    notionId: "ia_a1_responsabilite_impact",
    difficulty: 3,
    hint: "Quel choix limite le gaspillage d'energie ?",
    pool: [
      {
        q: "Tu as besoin d'une seule reponse a l'IA. Quel comportement est le plus eco-responsable ?",
        correct: "Rediger une demande claire pour obtenir une bonne reponse du premier coup.",
        wrong: ["Envoyer 20 demandes au hasard.", "Relancer sans cesse pour le plaisir."],
        why: "Une demande claire evite de multiplier les requetes, donc l'energie depensee.",
      },
      {
        q: "Pour un calcul simple (12 x 8), quel choix consomme le moins ?",
        correct: "Utiliser une calculatrice plutot qu'une grande IA.",
        wrong: ["Demander a une grande IA en ligne.", "Lancer plusieurs IA en meme temps."],
        why: "Une calculatrice est exacte et tres econome ; mobiliser une grande IA pour ca gaspille.",
      },
    ],
  }),
];

// --------------------------------------------------------------------------
// Banque complete A1
// --------------------------------------------------------------------------

export const iaA1QuestionBank: TutorBankItemV4[] = [
  // Notion 1 - Qu'est-ce que l'IA ?
  ...expliquerIa,
  ...distinguerOutils,
  ...reconnaitreIa,
  ...apprendDonnees,
  ...prediction,
  // Notion 2 - Ce que l'IA sait faire... et ses limites
  ...exemplesQuotidiens,
  ...erreurPossible,
  ...biaisDonnees,
  ...vocabulaireBase,
  // Notion 3 - Mon role et l'impact de l'IA
  ...humainResponsable,
  ...energieEnvironnement,
];

export function getIaA1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = iaA1QuestionBank;

  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);

  return bank;
}
