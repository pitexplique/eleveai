// lib/tutor-v4/questionBank/b1/ia/index.ts
//
// Coach IA - Niveau B1 « Je verifie et je me protege »
//
// REGLE DE DESIGN (option D, comme A1/A2/maths seconde) :
//   - fixed   : reperes, cas-types, idees-cles a fixer.
//   - template: variete (pools vrai-faux / mises en situation).
//   - QCM dominant avec de VRAIS distracteurs (le moteur melange les choix).
//   - short UNIQUEMENT numerique non ambigu (comptage).
//   - pas de format `open` pour l'instant (clavier mobile).
//
// 3 notions / 11 micro-competences, ~10 questions par micro, difficultes 1->5.
// Enjeux forts : esprit critique, sources, donnees personnelles, deepfakes,
// arnaques/hameconnage, plagiat, droits d'auteur.

import type { TutorBankItemV4, TutorBankItemTemplateV4 } from "@/lib/tutor-v4/types";

// --------------------------------------------------------------------------
// Helpers (memes patterns que A1/A2)
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
    niveau: "b1",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint ?? "Garde ton esprit critique et protege-toi.",
    tags: ["b1", "ia", "vrai-faux", "template"],
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
          "Verifier et se proteger sont deux reflexes a garder face a l'IA.",
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
    niveau: "b1",
    matiere: "ia",
    notionId: opts.notionId,
    microId: opts.microId,
    difficulty: opts.difficulty,
    theme: opts.theme ?? "neutral",
    hint: opts.hint,
    tags: ["b1", "ia", "situation", "template"],
    generate: () => {
      const s = pick(opts.pool);
      return {
        text: s.q,
        format: "qcm",
        choices: [s.correct, ...s.wrong],
        expected: [s.correct],
        comparator: "mcq_exact",
        explanation: exp(`Bonne reponse : ${s.correct}`, s.why, "On reflechit avant d'agir : verifier et se proteger.", s.correct),
      };
    },
  };
}

// --------------------------------------------------------------------------
// NOTION 1 — Verifier et garder l'esprit critique
// --------------------------------------------------------------------------

const repererDouteux: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_douteux_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_reperer_douteux",
    difficulty: 2,
    theme: "neutral",
    text: "Quel signe doit te rendre MEFIANT face a une info donnee par l'IA ?",
    format: "qcm",
    choices: [
      "Elle est tres precise (chiffres, citations) mais sans aucune source verifiable.",
      "Elle est ecrite dans un francais correct.",
      "Elle repond a ma question.",
      "Elle est presentee en liste.",
    ],
    expected: ["Elle est tres precise (chiffres, citations) mais sans aucune source verifiable."],
    comparator: "mcq_exact",
    hint: "Des details precis sans source = drapeau rouge.",
    explanation: exp(
      "Une info tres precise mais invérifiable doit alerter.",
      "Les IA peuvent inventer des chiffres ou des citations credibles (hallucination).",
      "Une « statistique exacte » sans source peut etre totalement fausse.",
      "Precis mais sans source verifiable = a verifier."
    ),
    tags: ["b1", "ia", "esprit-critique", "qcm"],
  },
  {
    kind: "fixed",
    id: "b1_ia_douteux_2",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_reperer_douteux",
    difficulty: 3,
    theme: "neutral",
    text: "L'IA cite un « livre » avec un titre et un auteur. Comment savoir s'il existe vraiment ?",
    format: "qcm",
    choices: [
      "Chercher ce titre dans un catalogue de bibliotheque ou un site fiable.",
      "Lui demander si elle est sure, et la croire.",
      "Supposer qu'il existe car le titre est credible.",
      "Ne rien faire.",
    ],
    expected: ["Chercher ce titre dans un catalogue de bibliotheque ou un site fiable."],
    comparator: "mcq_exact",
    hint: "On verifie l'existence ailleurs que dans l'IA.",
    explanation: exp(
      "On verifie l'existence d'une source en dehors de l'IA.",
      "L'IA peut inventer des references qui n'existent pas.",
      "Un catalogue de bibliotheque confirme (ou non) le livre.",
      "Verifier une reference = la chercher dans une source independante."
    ),
    tags: ["b1", "ia", "esprit-critique", "qcm"],
  },
  scenarioTemplate({
    id: "b1_ia_douteux_scn",
    microId: "ia_b1_reperer_douteux",
    notionId: "ia_b1_verification",
    difficulty: 3,
    hint: "Repere ce qui sent l'invention.",
    pool: [
      {
        q: "Quelle info merite le plus d'etre verifiee avant d'etre utilisee ?",
        correct: "« 73 % des collegiens font ceci » — sans aucune source citee.",
        wrong: ["« L'eau bout a 100 °C au niveau de la mer. »", "« Paris est la capitale de la France. »"],
        why: "Une statistique precise sans source est typiquement a verifier (possible invention).",
      },
      {
        q: "Quelle reponse de l'IA est la plus suspecte ?",
        correct: "Une citation attribuee a une personne celebre, introuvable ailleurs.",
        wrong: ["Une definition que je retrouve dans mon cours.", "Un fait connu et facile a confirmer."],
        why: "Une citation introuvable ailleurs est souvent une hallucination de l'IA.",
      },
    ],
  }),
  vraiFauxTemplate({
    id: "b1_ia_douteux_vf",
    microId: "ia_b1_reperer_douteux",
    notionId: "ia_b1_verification",
    difficulty: 2,
    pool: [
      { t: "Une IA peut inventer des chiffres ou des citations qui semblent vrais.", ok: true, ex: "C'est une hallucination : credible mais faux." },
      { t: "Si une info est bien ecrite, elle est forcement vraie.", ok: false, ex: "La forme soignee ne garantit pas l'exactitude." },
      { t: "Une info precise mais sans source verifiable doit etre verifiee.", ok: true, ex: "Le manque de source est un signal d'alerte." },
      { t: "Demander a l'IA si elle est sure suffit a prouver l'info.", ok: false, ex: "Elle peut se dire sure tout en se trompant." },
    ],
  }),
];

const sourcesFiables: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_sources_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_sources_fiables",
    difficulty: 2,
    theme: "neutral",
    text: "Laquelle est en general la source la PLUS fiable ?",
    format: "qcm",
    choices: [
      "Un site officiel ou un organisme reconnu (institution, encyclopedie serieuse).",
      "Un commentaire anonyme sous une video.",
      "Une rumeur partagee en story.",
      "Un message en chaine recu par messagerie.",
    ],
    expected: ["Un site officiel ou un organisme reconnu (institution, encyclopedie serieuse)."],
    comparator: "mcq_exact",
    hint: "Officiel/reconnu > anonyme.",
    explanation: exp(
      "Une source fiable est identifiable et reconnue.",
      "Un organisme officiel engage sa responsabilite sur ce qu'il publie.",
      "Un site .gouv ou une encyclopedie serieuse > un commentaire anonyme.",
      "Source fiable = identifiable et reconnue."
    ),
    tags: ["b1", "ia", "sources", "qcm"],
  },
  {
    kind: "fixed",
    id: "b1_ia_sources_2",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_sources_fiables",
    difficulty: 3,
    theme: "neutral",
    text: "Pour juger si une source est fiable, quelle question est la plus utile ?",
    format: "qcm",
    choices: [
      "Qui a ecrit ca, quand, et dans quel but ?",
      "Est-ce que le texte est long ?",
      "Est-ce qu'il y a des couleurs vives ?",
      "Est-ce que ca confirme ce que je voulais croire ?",
    ],
    expected: ["Qui a ecrit ca, quand, et dans quel but ?"],
    comparator: "mcq_exact",
    hint: "Auteur, date, intention.",
    explanation: exp(
      "Evaluer une source, c'est questionner l'auteur, la date et l'intention.",
      "Une info peut etre depassee, partiale ou ecrite pour te vendre quelque chose.",
      "« Qui ? quand ? pourquoi ? » revele beaucoup sur la fiabilite.",
      "Auteur + date + intention = test de fiabilite."
    ),
    tags: ["b1", "ia", "sources", "qcm"],
  },
  vraiFauxTemplate({
    id: "b1_ia_sources_vf",
    microId: "ia_b1_sources_fiables",
    notionId: "ia_b1_verification",
    difficulty: 2,
    pool: [
      { t: "Une source identifiable (auteur, organisme) est plus fiable qu'une source anonyme.", ok: true, ex: "On peut juger sa competence et sa responsabilite." },
      { t: "Tout ce qui est ecrit sur internet est fiable.", ok: false, ex: "N'importe qui peut publier n'importe quoi en ligne." },
      { t: "Verifier la date d'une info est parfois important.", ok: true, ex: "Une info peut etre vraie hier et fausse aujourd'hui." },
      { t: "Une info est fiable juste parce qu'elle me plait.", ok: false, ex: "Le biais de confirmation nous trompe : on verifie quand meme." },
    ],
  }),
];

const recouperSources: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_recouper_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_recouper_sources",
    difficulty: 2,
    theme: "neutral",
    text: "« Recouper » une information, ca veut dire :",
    format: "qcm",
    choices: [
      "Verifier qu'elle est confirmee par plusieurs sources independantes.",
      "La couper en deux.",
      "La recopier deux fois.",
      "La traduire dans une autre langue.",
    ],
    expected: ["Verifier qu'elle est confirmee par plusieurs sources independantes."],
    comparator: "mcq_exact",
    hint: "Plusieurs sources qui se confirment.",
    explanation: exp(
      "Recouper = confronter plusieurs sources independantes.",
      "Si plusieurs sources serieuses disent la meme chose, l'info est plus sure.",
      "Une seule source, surtout sans preuve, ne suffit pas.",
      "Recouper = confirmer par plusieurs sources independantes."
    ),
    tags: ["b1", "ia", "sources", "qcm"],
  },
  {
    kind: "fixed",
    id: "b1_ia_recouper_2",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_recouper_sources",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi vaut-il mieux plusieurs sources INDEPENDANTES qu'une seule ?",
    format: "qcm",
    choices: [
      "Parce que si elles se confirment sans se copier, l'info est plus sure.",
      "Parce que plus c'est long, plus c'est vrai.",
      "Parce qu'une source suffit toujours.",
      "Parce que les sources se valent toutes.",
    ],
    expected: ["Parce que si elles se confirment sans se copier, l'info est plus sure."],
    comparator: "mcq_exact",
    hint: "Independantes = elles ne se recopient pas entre elles.",
    explanation: exp(
      "Des sources independantes qui concordent renforcent la fiabilite.",
      "Si elles se recopient, l'erreur d'une seule se propage partout.",
      "Trois sites qui copient le meme post ne font pas trois preuves.",
      "Plusieurs sources independantes concordantes = plus sur."
    ),
    tags: ["b1", "ia", "sources", "qcm"],
  },
  scenarioTemplate({
    id: "b1_ia_recouper_scn",
    microId: "ia_b1_recouper_sources",
    notionId: "ia_b1_verification",
    difficulty: 3,
    hint: "Cherche la demarche qui confirme vraiment.",
    pool: [
      {
        q: "Une IA t'annonce une info surprenante. Quelle est la meilleure demarche ?",
        correct: "Chercher si plusieurs sources fiables et independantes la confirment.",
        wrong: ["La partager tout de suite a tout le monde.", "La croire car elle est surprenante."],
        why: "Recouper avec des sources independantes avant de diffuser evite de propager une fausse info.",
      },
      {
        q: "Trois pages disent la meme chose mais copient toutes le meme tweet. Conclusion ?",
        correct: "Ce n'est qu'une seule source en realite : il faut en trouver d'autres.",
        wrong: ["Ca fait 3 preuves, c'est sur.", "On peut conclure sans rien d'autre."],
        why: "Des sources qui se recopient ne sont pas independantes : l'erreur se propage.",
      },
    ],
  }),
];

const faitOpinionHypothese: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_foh_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_fait_opinion_hypothese",
    difficulty: 2,
    theme: "neutral",
    text: "Laquelle de ces phrases est un FAIT (verifiable) ?",
    format: "qcm",
    choices: [
      "« La Reunion est une ile de l'ocean Indien. »",
      "« La Reunion est la plus belle ile du monde. »",
      "« Il fera peut-etre beau demain. »",
      "« Ce film est nul. »",
    ],
    expected: ["« La Reunion est une ile de l'ocean Indien. »"],
    comparator: "mcq_exact",
    hint: "Un fait se verifie ; une opinion se discute.",
    explanation: exp(
      "Un fait est verifiable et ne depend pas du gout de chacun.",
      "« La plus belle » ou « nul » sont des opinions ; « peut-etre » est une hypothese.",
      "« Ile de l'ocean Indien » se verifie sur une carte.",
      "Fait = verifiable ; opinion = avis ; hypothese = supposition."
    ),
    tags: ["b1", "ia", "fait-opinion", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "b1_ia_foh_2",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_fait_opinion_hypothese",
    difficulty: 2,
    theme: "neutral",
    text: "« Il va sans doute pleuvoir cet apres-midi. » Cette phrase est :",
    format: "qcm",
    choices: [
      "Une hypothese (une supposition pas encore verifiee).",
      "Un fait certain.",
      "Une opinion sur le gout.",
      "Une preuve scientifique.",
    ],
    expected: ["Une hypothese (une supposition pas encore verifiee)."],
    comparator: "mcq_exact",
    hint: "« sans doute », « peut-etre » = supposition.",
    explanation: exp(
      "Une hypothese est une supposition a confirmer.",
      "« Sans doute » indique qu'on n'est pas encore sur.",
      "On saura cet apres-midi si l'hypothese se realise.",
      "Hypothese = supposition pas encore verifiee."
    ),
    tags: ["b1", "ia", "fait-opinion", "qcm"],
  },
  {
    kind: "template",
    id: "b1_ia_foh_tpl",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_fait_opinion_hypothese",
    difficulty: 3,
    theme: "neutral",
    hint: "Fait = verifiable ; opinion = avis/gout ; hypothese = supposition.",
    tags: ["b1", "ia", "fait-opinion", "template"],
    generate: () => {
      const items = [
        { p: "L'eau gele a 0 °C sous pression normale.", rep: "Un fait" },
        { p: "Le chocolat est le meilleur des desserts.", rep: "Une opinion" },
        { p: "Demain, l'equipe va probablement gagner.", rep: "Une hypothese" },
        { p: "Un triangle a trois cotes.", rep: "Un fait" },
        { p: "Ce jeu video est trop ennuyeux.", rep: "Une opinion" },
        { p: "Il y aura peut-etre moins de circulation ce soir.", rep: "Une hypothese" },
      ];
      const it = pick(items);
      return {
        text: `« ${it.p} »\n\nCette phrase est :`,
        format: "qcm",
        choices: ["Un fait", "Une opinion", "Une hypothese"],
        expected: [it.rep],
        comparator: "mcq_exact",
        explanation: exp(
          `« ${it.p} » -> ${it.rep.toLowerCase()}.`,
          "Un fait se verifie, une opinion exprime un gout/avis, une hypothese suppose.",
          "Les mots « meilleur », « ennuyeux » signalent une opinion ; « peut-etre », « probablement » une hypothese.",
          `${it.rep}.`
        ),
      };
    },
  },
];

const biaisEspritCritique: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_critique_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_biais_esprit_critique",
    difficulty: 2,
    theme: "neutral",
    text: "Une IA ecrit une reponse tres convaincante. Que dois-tu garder en tete ?",
    format: "qcm",
    choices: [
      "Convaincant ne veut pas dire vrai : je garde mon esprit critique.",
      "Si c'est convaincant, c'est forcement vrai.",
      "Je n'ai plus besoin de reflechir.",
      "Une IA n'a jamais de biais.",
    ],
    expected: ["Convaincant ne veut pas dire vrai : je garde mon esprit critique."],
    comparator: "mcq_exact",
    hint: "Le style persuasif n'est pas une preuve.",
    explanation: exp(
      "Une reponse persuasive n'est pas forcement exacte.",
      "Les IA ecrivent de facon fluide et assuree, vrai ou faux.",
      "On juge le contenu et les sources, pas le ton.",
      "Convaincant ne prouve rien : esprit critique."
    ),
    tags: ["b1", "ia", "esprit-critique", "qcm"],
  },
  {
    kind: "fixed",
    id: "b1_ia_critique_2",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_verification",
    microId: "ia_b1_biais_esprit_critique",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi une IA peut-elle presenter un point de vue de facon DESEQUILIBREE ?",
    format: "qcm",
    choices: [
      "Parce qu'elle reflete les biais de ses donnees d'entrainement.",
      "Parce qu'elle a des convictions personnelles.",
      "Parce qu'elle veut te nuire volontairement.",
      "Une IA est toujours parfaitement neutre.",
    ],
    expected: ["Parce qu'elle reflete les biais de ses donnees d'entrainement."],
    comparator: "mcq_exact",
    hint: "Les biais viennent des donnees.",
    explanation: exp(
      "Une IA peut etre desequilibree a cause des biais de ses donnees.",
      "Si les exemples penchent d'un cote, la reponse penche aussi.",
      "Sur un sujet polemique, mieux vaut confronter plusieurs points de vue.",
      "Biais des donnees -> reponses parfois desequilibrees."
    ),
    tags: ["b1", "ia", "esprit-critique", "qcm"],
  },
  vraiFauxTemplate({
    id: "b1_ia_critique_vf",
    microId: "ia_b1_biais_esprit_critique",
    notionId: "ia_b1_verification",
    difficulty: 2,
    pool: [
      { t: "Une reponse convaincante est forcement exacte.", ok: false, ex: "Le style persuasif n'est pas une preuve de verite." },
      { t: "Une IA peut etre biaisee a cause de ses donnees d'entrainement.", ok: true, ex: "Elle reproduit les desequilibres de ses exemples." },
      { t: "Sur un sujet sensible, confronter plusieurs points de vue est utile.", ok: true, ex: "Cela limite l'influence d'un seul angle biaise." },
      { t: "Garder son esprit critique, c'est juger le contenu, pas le ton.", ok: true, ex: "On regarde les faits et les sources, pas l'assurance." },
    ],
  }),
];

// --------------------------------------------------------------------------
// NOTION 2 — Securite et donnees personnelles
// --------------------------------------------------------------------------

const donneesPersonnelles: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_donnees_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_securite",
    microId: "ia_b1_donnees_personnelles",
    difficulty: 1,
    theme: "neutral",
    text: "Que NE faut-il PAS ecrire a une IA en ligne ?",
    format: "qcm",
    choices: [
      "Mon adresse exacte, mon numero, mes mots de passe.",
      "Une question de cours sur les fractions.",
      "Une demande d'explication d'un mot.",
      "Une demande de quiz d'entrainement.",
    ],
    expected: ["Mon adresse exacte, mon numero, mes mots de passe."],
    comparator: "mcq_exact",
    hint: "Tout ce qui permet de t'identifier ou d'acceder a tes comptes.",
    explanation: exp(
      "On ne partage pas ses donnees personnelles sensibles avec une IA.",
      "Ce que tu ecris peut etre stocke ou vu par d'autres.",
      "Adresse, telephone, mots de passe : a garder pour soi.",
      "Pas de donnees personnelles sensibles dans un chat IA."
    ),
    tags: ["b1", "ia", "securite", "qcm"],
  },
  {
    kind: "fixed",
    id: "b1_ia_donnees_2",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_securite",
    microId: "ia_b1_donnees_personnelles",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi eviter de donner des infos personnelles a une IA en ligne ?",
    format: "qcm",
    choices: [
      "Parce qu'elles peuvent etre enregistrees, reutilisees ou exposees.",
      "Parce que l'IA va tomber en panne.",
      "Parce que ca ralentit la reponse.",
      "Il n'y a aucune raison, c'est sans risque.",
    ],
    expected: ["Parce qu'elles peuvent etre enregistrees, reutilisees ou exposees."],
    comparator: "mcq_exact",
    hint: "Ce qui est ecrit en ligne peut etre conserve.",
    explanation: exp(
      "Les infos envoyees a une IA peuvent etre conservees ou exposees.",
      "Tu perds le controle de ce que tu partages en ligne.",
      "Une fuite de donnees peut servir a une arnaque ou a une usurpation.",
      "Donnees en ligne = controle perdu : on protege."
    ),
    tags: ["b1", "ia", "securite", "qcm"],
  },
  vraiFauxTemplate({
    id: "b1_ia_donnees_vf",
    microId: "ia_b1_donnees_personnelles",
    notionId: "ia_b1_securite",
    difficulty: 2,
    pool: [
      { t: "Je peux partager mon mot de passe avec une IA si je suis presse.", ok: false, ex: "Jamais : un mot de passe ne se partage avec personne ni aucun service." },
      { t: "Ce que j'ecris a une IA en ligne peut etre enregistre.", ok: true, ex: "On perd le controle des donnees envoyees en ligne." },
      { t: "Poser une question de cours sans info perso est sans risque.", ok: true, ex: "Tant qu'on ne donne pas de donnees identifiantes, c'est ok." },
      { t: "Donner l'adresse de mon domicile a un chatbot est une bonne idee.", ok: false, ex: "C'est une donnee sensible a ne pas exposer." },
    ],
  }),
];

const protegerInfos: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_proteger_short_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_securite",
    microId: "ia_b1_proteger_infos",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces 4 elements, combien sont des donnees personnelles a PROTEGER ?\n1) Mon mot de passe\n2) Mon adresse exacte\n3) La capitale de la France\n4) Mon numero de telephone\n\nDonne le nombre.",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "La capitale est une info publique.",
    explanation: exp(
      "Mot de passe, adresse et numero sont personnels : 3 a proteger.",
      "La capitale de la France est une info publique, pas une donnee perso.",
      "1, 2 et 4 sont a proteger ; 3 non.",
      "Reponse : 3."
    ),
    tags: ["b1", "ia", "securite", "short"],
  },
  {
    kind: "fixed",
    id: "b1_ia_proteger_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_securite",
    microId: "ia_b1_proteger_infos",
    difficulty: 2,
    theme: "neutral",
    text: "Tu veux faire relire un texte par une IA, mais il contient ton nom et ton adresse. Que fais-tu ?",
    format: "qcm",
    choices: [
      "Je retire ou remplace les infos personnelles avant de l'envoyer.",
      "Je l'envoie tel quel, tant pis.",
      "J'ajoute encore plus d'infos perso.",
      "Je mets aussi mon mot de passe au cas ou.",
    ],
    expected: ["Je retire ou remplace les infos personnelles avant de l'envoyer."],
    comparator: "mcq_exact",
    hint: "Anonymiser avant d'envoyer.",
    explanation: exp(
      "On enleve les donnees personnelles avant d'envoyer un texte a une IA.",
      "On garde ainsi le service tout en se protegeant.",
      "Remplacer « Lea Hoarau, 12 rue... » par « [Prenom], [adresse] ».",
      "Anonymiser avant d'envoyer = se proteger."
    ),
    tags: ["b1", "ia", "securite", "qcm"],
  },
  vraiFauxTemplate({
    id: "b1_ia_proteger_vf",
    microId: "ia_b1_proteger_infos",
    notionId: "ia_b1_securite",
    difficulty: 2,
    pool: [
      { t: "Un mot de passe doit rester secret, meme vis-a-vis d'une IA.", ok: true, ex: "Il ne se partage avec personne ni aucun service." },
      { t: "Une photo qui montre mon visage et mon college est une donnee a proteger.", ok: true, ex: "Elle permet de m'identifier et de me localiser." },
      { t: "Le nom d'un pays est une donnee personnelle.", ok: false, ex: "C'est une info publique, pas une donnee perso." },
      { t: "Avant d'envoyer un texte a une IA, je peux retirer mes infos perso.", ok: true, ex: "Anonymiser permet d'utiliser l'outil sans se mettre en danger." },
    ],
  }),
];

const deepfakeArnaque: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_deepfake_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_securite",
    microId: "ia_b1_deepfake_arnaque",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'un « deepfake » ?",
    format: "qcm",
    choices: [
      "Une image, une voix ou une video truquee par IA pour faire croire que c'est reel.",
      "Un jeu video tres profond.",
      "Une vraie video filmee normalement.",
      "Un type de mot de passe.",
    ],
    expected: ["Une image, une voix ou une video truquee par IA pour faire croire que c'est reel."],
    comparator: "mcq_exact",
    hint: "« deep » (IA) + « fake » (faux).",
    explanation: exp(
      "Un deepfake est un faux contenu (image, voix, video) fabrique par IA.",
      "Il imite une vraie personne pour tromper le spectateur.",
      "Une video ou une celebrite « dit » des choses qu'elle n'a jamais dites.",
      "Deepfake = faux contenu realiste fabrique par IA."
    ),
    tags: ["b1", "ia", "deepfake", "qcm"],
  },
  {
    kind: "fixed",
    id: "b1_ia_deepfake_2",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_securite",
    microId: "ia_b1_deepfake_arnaque",
    difficulty: 3,
    theme: "neutral",
    text: "Tu vois une video choc d'une personnalite. Quel reflexe est le bon ?",
    format: "qcm",
    choices: [
      "Verifier si des medias fiables en parlent avant d'y croire ou de la partager.",
      "La partager immediatement a tous mes contacts.",
      "Y croire car la video a l'air vraie.",
      "Conclure que toute video est forcement vraie.",
    ],
    expected: ["Verifier si des medias fiables en parlent avant d'y croire ou de la partager."],
    comparator: "mcq_exact",
    hint: "Une video peut etre truquee : on verifie avant de partager.",
    explanation: exp(
      "Devant un contenu choc, on verifie avant de croire ou de partager.",
      "Les deepfakes exploitent l'emotion pour se propager vite.",
      "Si aucun media serieux n'en parle, mefiance.",
      "Contenu choc = verifier avant de partager."
    ),
    tags: ["b1", "ia", "deepfake", "qcm"],
  },
  vraiFauxTemplate({
    id: "b1_ia_deepfake_vf",
    microId: "ia_b1_deepfake_arnaque",
    notionId: "ia_b1_securite",
    difficulty: 2,
    pool: [
      { t: "Une video peut etre entierement truquee par IA (deepfake).", ok: true, ex: "Image, voix et video peuvent etre fabriquees de facon realiste." },
      { t: "Si une video a l'air vraie, elle est forcement authentique.", ok: false, ex: "Les deepfakes sont concus pour paraitre reels." },
      { t: "Avant de partager un contenu choc, mieux vaut le verifier.", ok: true, ex: "On evite ainsi de propager une manipulation." },
      { t: "Les deepfakes peuvent servir a manipuler ou a arnaquer.", ok: true, ex: "Faux discours, fausse voix d'un proche pour tromper..." },
    ],
  }),
];

const arnaqueHameconnage: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_arnaque_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_securite",
    microId: "ia_b1_arnaque_hameconnage",
    difficulty: 2,
    theme: "neutral",
    text: "Tu recois un message : « Tu as gagne un telephone ! Clique et entre ton mot de passe. » C'est :",
    format: "qcm",
    choices: [
      "Une arnaque (hameconnage) : il ne faut pas cliquer ni rien donner.",
      "Un vrai cadeau a recuperer vite.",
      "Un message officiel sur de confiance.",
      "Une bonne occasion a partager.",
    ],
    expected: ["Une arnaque (hameconnage) : il ne faut pas cliquer ni rien donner."],
    comparator: "mcq_exact",
    hint: "Gain trop beau + demande de mot de passe = piege.",
    explanation: exp(
      "C'est un hameconnage : on te piege pour voler tes infos.",
      "Un gain « gratuit » qui demande un mot de passe est un signal d'arnaque.",
      "On ne clique pas et on ne donne aucune info ; on supprime/signale.",
      "Trop beau + demande d'infos = arnaque."
    ),
    tags: ["b1", "ia", "arnaque", "qcm"],
  },
  {
    kind: "fixed",
    id: "b1_ia_arnaque_2",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_securite",
    microId: "ia_b1_arnaque_hameconnage",
    difficulty: 3,
    theme: "neutral",
    text: "En quoi l'IA peut-elle rendre les arnaques plus dangereuses ?",
    format: "qcm",
    choices: [
      "Elle peut ecrire des messages sans fautes et imiter une voix pour mieux tromper.",
      "Elle rend les arnaques toujours plus faciles a reperer.",
      "Elle supprime toutes les arnaques.",
      "Elle n'a aucun effet sur les arnaques.",
    ],
    expected: ["Elle peut ecrire des messages sans fautes et imiter une voix pour mieux tromper."],
    comparator: "mcq_exact",
    hint: "Messages plus credibles, voix imitee...",
    explanation: exp(
      "L'IA peut fabriquer des arnaques plus credibles.",
      "Messages bien ecrits, faux site convaincant, voix imitee d'un proche.",
      "D'ou l'importance de verifier par un autre canal (appeler la personne).",
      "IA = arnaques plus credibles -> vigilance accrue."
    ),
    tags: ["b1", "ia", "arnaque", "qcm"],
  },
  scenarioTemplate({
    id: "b1_ia_arnaque_scn",
    microId: "ia_b1_arnaque_hameconnage",
    notionId: "ia_b1_securite",
    difficulty: 3,
    hint: "Quelle reaction te protege le mieux ?",
    pool: [
      {
        q: "Un message « de ta banque » demande ton code par lien. Que fais-tu ?",
        correct: "Je ne clique pas et je verifie en contactant la banque par un canal officiel.",
        wrong: ["Je clique et je saisis mon code.", "Je reponds avec mes informations."],
        why: "Une vraie banque ne demande pas un code par lien : on verifie par le canal officiel.",
      },
      {
        q: "Tu recois un appel avec la « voix » d'un proche qui reclame de l'argent en urgence. Reflexe ?",
        correct: "Raccrocher et rappeler le proche sur son vrai numero pour verifier.",
        wrong: ["Envoyer l'argent tout de suite.", "Donner mes coordonnees bancaires."],
        why: "La voix peut etre imitee par IA : on verifie par un autre canal avant d'agir.",
      },
    ],
  }),
];

// --------------------------------------------------------------------------
// NOTION 3 — Plagiat, droits et responsabilite
// --------------------------------------------------------------------------

const plagiatTriche: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_plagiat_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_responsabilite_numerique",
    microId: "ia_b1_plagiat_triche",
    difficulty: 2,
    theme: "neutral",
    text: "Le « plagiat », c'est :",
    format: "qcm",
    choices: [
      "Presenter le travail ou les idees d'un autre (ou d'une IA) comme les siens.",
      "Citer correctement une source.",
      "S'inspirer puis rediger soi-meme en citant.",
      "Poser une question a un professeur.",
    ],
    expected: ["Presenter le travail ou les idees d'un autre (ou d'une IA) comme les siens."],
    comparator: "mcq_exact",
    hint: "S'approprier le travail d'autrui = plagiat.",
    explanation: exp(
      "Le plagiat, c'est s'attribuer le travail d'autrui.",
      "Cela vaut aussi pour le texte produit par une IA.",
      "Copier sans citer = plagiat ; s'inspirer en citant = honnete.",
      "Plagiat = faire passer le travail d'un autre pour le sien."
    ),
    tags: ["b1", "ia", "plagiat", "qcm"],
  },
  {
    kind: "template",
    id: "b1_ia_plagiat_tpl",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_responsabilite_numerique",
    microId: "ia_b1_plagiat_triche",
    difficulty: 3,
    theme: "neutral",
    hint: "Aide autorisee / aide limite / triche : ou se situe la situation ?",
    tags: ["b1", "ia", "plagiat", "template"],
    generate: () => {
      const items = [
        { s: "Demander a l'IA d'expliquer une notion, puis rediger soi-meme.", rep: "Aide autorisee" },
        { s: "Faire ecrire toute la dissertation par l'IA et la rendre telle quelle.", rep: "Triche" },
        { s: "Copier-coller un paragraphe d'IA dans son devoir sans le dire.", rep: "Triche" },
        { s: "Utiliser l'IA pour corriger ses fautes, quand c'est autorise par le prof.", rep: "Aide autorisee" },
        { s: "Demander un plan a l'IA pour un devoir ou seul le travail perso est note.", rep: "Aide limite" },
      ];
      const it = pick(items);
      return {
        text: `Cette utilisation de l'IA correspond a :\n\n« ${it.s} »`,
        format: "qcm",
        choices: ["Aide autorisee", "Aide limite", "Triche"],
        expected: [it.rep],
        comparator: "mcq_exact",
        explanation: exp(
          `Ici : ${it.rep.toLowerCase()}.`,
          "Comprendre/corriger (si autorise) = aide ; rendre le travail de l'IA comme le sien = triche.",
          "En cas de doute, demande la regle a ton enseignant et cite l'usage de l'IA.",
          `${it.rep}.`
        ),
      };
    },
  },
  vraiFauxTemplate({
    id: "b1_ia_plagiat_vf",
    microId: "ia_b1_plagiat_triche",
    notionId: "ia_b1_responsabilite_numerique",
    difficulty: 2,
    pool: [
      { t: "Rendre un texte d'IA comme le mien, sans le dire, est du plagiat.", ok: true, ex: "Je m'attribue un travail qui n'est pas le mien." },
      { t: "S'inspirer d'une idee en citant sa source est honnete.", ok: true, ex: "Citer, c'est reconnaitre l'origine : pas de plagiat." },
      { t: "Les regles d'usage de l'IA peuvent changer selon le prof ou le devoir.", ok: true, ex: "On demande ce qui est autorise en cas de doute." },
      { t: "Copier sans citer est acceptable si personne ne le voit.", ok: false, ex: "Ca reste de la triche, et on n'apprend rien." },
    ],
  }),
];

const droitAuteurCiter: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "b1_ia_droit_1",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_responsabilite_numerique",
    microId: "ia_b1_droit_auteur_citer",
    difficulty: 2,
    theme: "neutral",
    text: "Tu utilises une image trouvee en ligne pour un projet public. Que dois-tu verifier ?",
    format: "qcm",
    choices: [
      "Si j'ai le droit de l'utiliser (licence) et a qui en attribuer l'origine.",
      "Rien, tout ce qui est en ligne est libre.",
      "Seulement si elle est jolie.",
      "Seulement sa taille en pixels.",
    ],
    expected: ["Si j'ai le droit de l'utiliser (licence) et a qui en attribuer l'origine."],
    comparator: "mcq_exact",
    hint: "En ligne ne veut pas dire libre de droits.",
    explanation: exp(
      "Une oeuvre en ligne reste protegee par le droit d'auteur.",
      "Il faut verifier la licence et crediter l'auteur.",
      "On cherche des images « libres de droits » ou on demande l'autorisation.",
      "En ligne ne veut pas dire libre : verifier la licence et citer."
    ),
    tags: ["b1", "ia", "droits", "qcm"],
  },
  {
    kind: "fixed",
    id: "b1_ia_droit_2",
    niveau: "b1",
    matiere: "ia",
    notionId: "ia_b1_responsabilite_numerique",
    microId: "ia_b1_droit_auteur_citer",
    difficulty: 2,
    theme: "neutral",
    text: "Quand l'IA t'a aide pour un travail, la bonne pratique est :",
    format: "qcm",
    choices: [
      "Le mentionner (dire comment l'IA a aide) si c'est demande ou utile.",
      "Le cacher absolument.",
      "Pretendre que tout vient de moi.",
      "Mettre l'IA comme unique autrice du devoir.",
    ],
    expected: ["Le mentionner (dire comment l'IA a aide) si c'est demande ou utile."],
    comparator: "mcq_exact",
    hint: "La transparence est la bonne pratique.",
    explanation: exp(
      "Etre transparent sur l'usage de l'IA est une bonne pratique.",
      "Cela respecte l'honnetete et les regles de plus en plus courantes.",
      "« Plan aide par une IA, redaction personnelle » est une mention honnete.",
      "Citer ses sources ET mentionner l'usage de l'IA."
    ),
    tags: ["b1", "ia", "droits", "qcm"],
  },
  vraiFauxTemplate({
    id: "b1_ia_droit_vf",
    microId: "ia_b1_droit_auteur_citer",
    notionId: "ia_b1_responsabilite_numerique",
    difficulty: 2,
    pool: [
      { t: "Une image trouvee en ligne est toujours libre d'utilisation.", ok: false, ex: "Elle est souvent protegee : il faut verifier la licence." },
      { t: "Citer ses sources est une marque d'honnetete et de serieux.", ok: true, ex: "On reconnait d'ou viennent les idees et les contenus." },
      { t: "Mentionner l'aide de l'IA quand c'est demande est une bonne pratique.", ok: true, ex: "La transparence devient une regle courante." },
      { t: "Respecter le droit d'auteur ne concerne pas les eleves.", ok: false, ex: "Tout le monde doit respecter les droits d'auteur." },
    ],
  }),
];

// --------------------------------------------------------------------------
// Banque complete B1
// --------------------------------------------------------------------------

export const iaB1QuestionBank: TutorBankItemV4[] = [
  // Notion 1 - Verifier et garder l'esprit critique
  ...repererDouteux,
  ...sourcesFiables,
  ...recouperSources,
  ...faitOpinionHypothese,
  ...biaisEspritCritique,
  // Notion 2 - Securite et donnees personnelles
  ...donneesPersonnelles,
  ...protegerInfos,
  ...deepfakeArnaque,
  ...arnaqueHameconnage,
  // Notion 3 - Plagiat, droits et responsabilite
  ...plagiatTriche,
  ...droitAuteurCiter,
];

export function getIaB1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = iaB1QuestionBank;

  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);

  return bank;
}
