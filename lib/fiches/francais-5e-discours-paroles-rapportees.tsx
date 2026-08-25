// ─── Fiche de cours : le discours direct et le discours indirect (5e) ─────────
// HUITIÈME FICHE DE FRANÇAIS DE LA 5e, et la dernière des cinq annoncées pour la
// classe. Elle referme « Grammaire de l'écrit, grammaire de l'oral » : les
// registres sont tenus par `discours_registres`, les paroles rapportées ici.
//
// ⚠️ RÉFÉRENCE : BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), « Annexe 1
// – Programme de français pour le cycle 4 », applicable en 5e à la RENTRÉE 2026.
// ⛔ Ne pas étendre à la 4e (2027) ni à la 3e (2028).
//
// ⭐ CE QUE LE BO DEMANDE, ET QUI COMMANDE LA FORME DE LA FICHE. Deux attendus,
// et le second n'est pas un exercice d'analyse : « Identifier des paroles
// rapportées aux discours direct et indirect » PUIS « INSÉRER des paroles au
// discours direct dans un texte ». On ne demande pas seulement de reconnaître,
// on demande d'écrire — donc la ponctuation du dialogue n'est pas un détail de
// mise en page, c'est la moitié de la notion.
//
// ⭐ LE CANVAS EST `phrase`, ET LES GUILLEMETS Y SONT DES MOTS COMME LES AUTRES.
// C'est le point qui fait tout : tant que la ponctuation est un signe qu'on
// « met », elle reste décorative. Posée en étiquette au même titre qu'un verbe,
// elle devient un élément de la phrase, qu'on peut montrer du doigt, mettre en
// relief, ou faire disparaître au passage à l'indirect. Le tiret de dialogue et
// le point d'exclamation sont traités pareil.
//
// ⛔ LES EXEMPLES VONT PAR PAIRES, TOUJOURS. Les mêmes paroles, une fois citées,
// une fois rapportées. C'est la règle des tables DISCOURS de la banque, et c'est
// la seule façon de montrer ce qui BOUGE au passage : le pronom, le temps,
// l'indication de temps et la ponctuation. Une phrase seule ne montre rien.
//
// Alignée sur lib/tutor-v4/knowledge/francais/5e/microSkills.ts (notionId
// `discours_paroles_rapportees`) et sur deux banques :
//   - la table DISCOURS et la table INSERER de
//     lib/tutor-v4/questionBank/5e/francais/vocabulaire-discours.bank.ts ;
//   - les six items `5e_discours_rapportees` de
//     lib/tutor-v4/questionBank/5e/francais/complements-etude-langue.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion, défi compris) :
// - 5e_discours_rapportees        → définition, propriété « Le verbe de parole
//                                   dit aussi comment on parle », méthode 1,
//                                   usage 1, exemple 1, piège 1,
//                                   entraînements 1 et 4
// - 5e_discours_direct_indirect   → figure, propriétés « On entend le
//                                   personnage », « C'est le narrateur qui
//                                   rapporte » et « Au passage, tout bouge »,
//                                   formule, méthode 2, usage 2, exemples 2 et
//                                   3, pièges 2 et 3, entraînements 2, 3 et 5,
//                                   le défi (exemple 5)
// - 5e_discours_inserer           → propriétés « Le verbe peut passer derrière »
//                                   et « Chaque réplique va à la ligne »,
//                                   méthode 3, usage 3, exemple 4, piège 4
//
// Les phrases sont CELLES DES BANQUES, sans exception : « Il dit : "Je pars
// demain." », « Il dit qu'il part le lendemain. », « Il murmura : "C'est
// fini." », « Il dit : "Je suis fatigué." », « Il dit qu'il était fatigué. »,
// « Le maitre annonça : "Le contrôle est reporté." », « Le maitre annonça que le
// contrôle était reporté. », « Elle demanda : "Qui a ouvert la porte ?" »,
// « Elle demanda qui avait ouvert la porte. », « "Je ne sais pas",
// répondit-elle. », « "Attends-moi !" cria-t-il. », « Il cria de l'attendre. »,
// « — Tu viens ? demanda-t-elle. », « Elle se demanda si elle avait bien fermé
// la porte. ».
//
// ⚠️ Contrôle passé — `npm run verifier:fiches`.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  titre?: string;
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        titre: opts.titre,
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

// Dans une carte, on EMPILE — jamais deux dessins côte à côte (REGLES § 2 ter).
function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les paroles de la banque, dessinées ──────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE, PREMIÈRE MOITIÉ. « Il dit : "Je pars demain." » ouvre
// la table DISCOURS : c'est la phrase que l'élève rencontrera en premier dans le
// coach, et les deux guillemets y sont en relief parce qu'ils sont le signal.
const phraseDirect = phrase({
  mots: [
    { texte: "Il" },
    { texte: "dit" },
    { texte: ":" },
    { texte: "«", focus: true },
    { texte: "Je" },
    { texte: "pars" },
    { texte: "demain" },
    { texte: "." },
    { texte: "»", focus: true },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe de parole" },
    { mots: [3, 8], label: "paroles citées" },
  ],
  legende: "Les mots du personnage, tels quels.",
});

// LA SECONDE MOITIÉ : les mêmes paroles, sans un seul guillemet. Le « qu' » est
// en relief à leur place — c'est lui qui ouvre maintenant la parole.
const phraseIndirect = phrase({
  mots: [
    { texte: "Il" },
    { texte: "dit" },
    { texte: "qu'", focus: true },
    { texte: "il" },
    { texte: "part" },
    { texte: "le" },
    { texte: "lendemain" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe de parole" },
    { mots: [2, 7], label: "proposition subordonnée" },
  ],
  legende: "Ni deux-points, ni guillemets.",
});

// ⭐ LA PAIRE QUI MONTRE CE QUI BOUGE. C'est l'item le plus dur de la banque
// (« Quelle transformation est correcte ? ») : deux changements OBLIGATOIRES,
// le pronom et le temps. Les deux mots concernés sont en relief dans les deux
// dessins, et il n'y a qu'à les comparer du regard.
const phraseFatigueDirect = phrase({
  mots: [
    { texte: "Il" },
    { texte: "dit" },
    { texte: ":" },
    { texte: "«" },
    { texte: "Je", focus: true },
    { texte: "suis", focus: true },
    { texte: "fatigué" },
    { texte: "." },
    { texte: "»" },
  ],
  groupes: [{ mots: [3, 8], label: "paroles citées" }],
  legende: "« Je », et le présent.",
});

const phraseFatigueIndirect = phrase({
  mots: [
    { texte: "Il" },
    { texte: "dit" },
    { texte: "qu'" },
    { texte: "il", focus: true },
    { texte: "était", focus: true },
    { texte: "fatigué" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 6], label: "proposition subordonnée" }],
  legende: "« il », et l'imparfait.",
});

// LE VERBE DE PAROLE NE FAIT PAS QU'ANNONCER : IL COLORE. « murmura » dit à la
// fois qu'on parle et comment — c'est l'item « s'indigner » de la banque, pris
// par l'autre bout.
const phraseMurmura = phrase({
  mots: [
    { texte: "Il" },
    { texte: "murmura", focus: true },
    { texte: ":" },
    { texte: "«" },
    { texte: "C'est" },
    { texte: "fini" },
    { texte: "." },
    { texte: "»" },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe de parole" },
    { mots: [3, 7], label: "paroles citées" },
  ],
  legende: "Il dit AUSSI comment on parle.",
});

// ⭐ L'INCISE : le verbe passe DERRIÈRE les paroles, et le sujet derrière le
// verbe. Le trait d'union se voit parce que « répondit-elle » est une seule
// étiquette — c'est bien un seul bloc, et non deux mots séparés.
const phraseIncise = phrase({
  mots: [
    { texte: "«" },
    { texte: "Je" },
    { texte: "ne" },
    { texte: "sais" },
    { texte: "pas" },
    { texte: "»" },
    { texte: "," },
    { texte: "répondit-elle", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 6], label: "paroles citées" },
    { mots: [7, 7], label: "incise" },
  ],
  legende: "Le verbe derrière, le sujet après lui.",
});

// LE SIGNE QUI RESTE DEDANS. Le point d'exclamation appartient aux paroles, pas
// à la phrase du narrateur : il se pose donc AVANT le guillemet fermant.
const phraseCriaTIl = phrase({
  mots: [
    { texte: "«" },
    { texte: "Attends-moi" },
    { texte: "!", focus: true },
    { texte: "»" },
    { texte: "cria-t-il" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "paroles citées" },
    { mots: [4, 4], label: "incise" },
  ],
  legende: "Le point d'exclamation reste dedans.",
});

// LE DESSIN DU DÉFI (REGLES § 2), seconde moitié : un ordre ne peut pas rester
// un ordre au discours indirect. « Attends-moi ! » devient « de l'attendre ».
const phraseAttendreIndirect = phrase({
  mots: [
    { texte: "Il" },
    { texte: "cria" },
    { texte: "de" },
    { texte: "l'" },
    { texte: "attendre", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe de parole" },
    { mots: [2, 5], label: "paroles rapportées" },
  ],
  legende: "L'ordre devient un infinitif.",
});

// LE TIRET, EN RELIEF. Dans un dialogue, il fait à lui seul le travail que les
// guillemets font ailleurs : il dit que quelqu'un d'AUTRE prend la parole.
const phraseDialogue = phrase({
  mots: [
    { texte: "—", focus: true },
    { texte: "Tu" },
    { texte: "viens" },
    { texte: "?" },
    { texte: "demanda-t-elle" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "prise de parole" },
    { mots: [4, 4], label: "incise" },
  ],
  legende: "Un tiret : quelqu'un d'autre parle.",
});

// LA QUESTION CITÉE GARDE SON POINT D'INTERROGATION…
const phraseQuestionDirecte = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "demanda" },
    { texte: ":" },
    { texte: "«" },
    { texte: "Qui" },
    { texte: "a" },
    { texte: "ouvert" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "?", focus: true },
    { texte: "»" },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe de parole" },
    { mots: [3, 10], label: "paroles citées" },
  ],
  legende: "La question est citée telle quelle.",
});

// … ET LE PERD EN PASSANT À L'INDIRECT. Le signe a disparu du dessin : c'est
// une absence qu'on voit, et non une règle qu'on croit.
const phraseQuestionIndirecte = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "demanda" },
    { texte: "qui", focus: true },
    { texte: "avait" },
    { texte: "ouvert" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe de parole" },
    { mots: [2, 7], label: "proposition subordonnée" },
  ],
  legende: "Le point d'interrogation a disparu.",
});

const phraseAnnonca = phrase({
  mots: [
    { texte: "Le" },
    { texte: "maitre" },
    { texte: "annonça" },
    { texte: ":", focus: true },
    { texte: "«" },
    { texte: "Le" },
    { texte: "contrôle" },
    { texte: "est" },
    { texte: "reporté" },
    { texte: "." },
    { texte: "»" },
  ],
  groupes: [
    { mots: [2, 2], label: "verbe de parole" },
    { mots: [4, 10], label: "paroles citées" },
  ],
  legende: "Verbe devant : deux-points, puis guillemets.",
});

const phraseAnnoncaIndirect = phrase({
  mots: [
    { texte: "Le" },
    { texte: "maitre" },
    { texte: "annonça" },
    { texte: "que", focus: true },
    { texte: "le" },
    { texte: "contrôle" },
    { texte: "était", focus: true },
    { texte: "reporté" },
    { texte: "." },
  ],
  groupes: [
    { mots: [2, 2], label: "verbe de parole" },
    { mots: [3, 8], label: "proposition subordonnée" },
  ],
  legende: "« que », et le présent passe à l'imparfait.",
});

const pieges = [
  "Poser le point final à l'extérieur des guillemets. Les paroles citées emportent leur ponctuation avec elles : on écrit « Il murmura : « C'est fini. » », le point AVANT le guillemet fermant.",
  "Garder les guillemets au discours indirect. « Il dit qu'il part le lendemain » n'en prend aucun, ni deux-points : les paroles sont devenues une proposition subordonnée.",
  "Oublier de changer le pronom et le temps. « Je suis fatigué » devient « qu'IL ÉTAIT fatigué » : deux transformations obligatoires, et « demain » devient « le lendemain ».",
  "Fermer le guillemet après l'incise. Dans « « Je ne sais pas », répondit-elle. », le guillemet se ferme après la dernière parole — l'incise appartient au narrateur, pas au personnage.",
];

const aRetenir = [
  "Au discours DIRECT, on entend le personnage : deux-points, guillemets, et ses mots tels qu'il les a dits.",
  "Au discours INDIRECT, c'est le narrateur qui rapporte : une proposition subordonnée, sans guillemets — et le pronom, le temps et l'indication de temps se déplacent.",
  "Dans un dialogue, chaque nouvelle prise de parole va à la ligne, précédée d'un tiret ; quand le verbe de parole suit les paroles, il forme une incise et son sujet passe derrière lui.",
];

export const ficheParolesRapportees5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "discours-paroles-rapportees",
  titre: "Le discours direct et le discours indirect (2026-2027)",
  accroche:
    "« Il dit : « Je pars demain. » » et « Il dit qu'il part le lendemain. » : les mêmes paroles, le même personnage, la même information. Entre les deux, quatre choses ont bougé — les guillemets, le pronom, le temps du verbe et le mot « demain ». Savoir passer de l'une à l'autre, c'est toute la notion.",
  identite: [
    { label: "Mots clés", valeur: "Discours direct, discours indirect, verbe de parole, incise" },
    { label: "Le secret", valeur: "Qui parle : le personnage, ou le narrateur ?" },
    { label: "Outil", valeur: "Chercher les guillemets, sinon chercher le « que »" },
  ],
  definition: {
    texte:
      "Rapporter des paroles, c'est raconter ce que quelqu'un a dit. Le français le fait de deux façons. Au discours DIRECT, on cite : un verbe de parole, deux-points, des guillemets, et les mots du personnage tels qu'il les a prononcés — « Il dit : « Je pars demain. » ». On l'entend parler. Au discours INDIRECT, on rapporte : les paroles passent dans une proposition subordonnée introduite par « que », par « si » ou par un mot interrogatif, sans guillemets ni deux-points — « Il dit qu'il part le lendemain. ». C'est le narrateur qui parle à sa place. Le passage de l'un à l'autre n'est jamais un simple changement de ponctuation : le pronom se déplace (« je » devient « il »), le temps recule (le présent devient imparfait, le futur devient conditionnel), et les repères de temps se recalculent depuis le récit (« demain » devient « le lendemain »).",
  },
  figure: {
    schema: pile(phraseDirect, phraseIndirect),
    legende:
      "Les mêmes paroles, deux fois. En haut, le discours direct : deux-points, puis un groupe entier ouvert et fermé par des guillemets — ils sont en relief parce qu'ils sont le signal. En bas, le discours indirect : les guillemets ont disparu, et c'est « qu' » qui ouvre la parole. Ce qui était une citation est devenu une proposition subordonnée.",
  },
  proprietes: [
    {
      titre: "Au direct, on entend le personnage",
      texte:
        "Deux-points, guillemets, et ses mots sans une retouche : la parole est citée.",
      schema: phraseDirect,
      micros: ["5e_discours_direct_indirect"],
    },
    {
      titre: "À l'indirect, c'est le narrateur qui rapporte",
      texte:
        "Les paroles deviennent une subordonnée, ouverte par « que », « si » ou un mot interrogatif.",
      schema: phraseIndirect,
      micros: ["5e_discours_direct_indirect"],
    },
    {
      titre: "Au passage, le pronom et le temps bougent",
      texte:
        "« Je suis fatigué » devient « qu'il était fatigué » : deux changements obligatoires.",
      schema: pile(phraseFatigueDirect, phraseFatigueIndirect),
      micros: ["5e_discours_rapportees", "5e_discours_direct_indirect"],
    },
    {
      titre: "Le verbe de parole dit aussi comment on parle",
      texte:
        "« murmura », « s'indigna », « cria » : il annonce la parole et la colore d'un coup.",
      schema: phraseMurmura,
      micros: ["5e_discours_rapportees"],
    },
    {
      titre: "Le verbe peut passer derrière les paroles",
      texte:
        "Il forme alors une incise, et son sujet passe derrière lui : « répondit-elle ».",
      schema: pile(phraseIncise, phraseCriaTIl),
      micros: ["5e_discours_inserer"],
    },
  ],
  reel: {
    texte:
      "C'est la différence entre citer quelqu'un et le résumer — et elle se joue tous les jours. Quand un journal écrit entre guillemets ce qu'une personne a dit, il s'engage : le moindre mot changé à l'intérieur des guillemets est une faute professionnelle, et c'est pour cela qu'on peut vérifier une citation. Hors des guillemets, le journaliste rapporte, donc il interprète. Même chose dans un message : « Il m'a dit : « J'arrive » » n'est pas « Il m'a dit qu'il arrivait » — la première rapporte une promesse, la seconde la met à distance. Repérer les guillemets d'un texte, c'est savoir quelles phrases appartiennent à quelqu'un et lesquelles appartiennent à celui qui écrit.",
  },
  historique: {
    texte:
      "Le mot « guillemet » vient d'un prénom : celui de Guillaume Le Bé, graveur de caractères parisien du XVIe siècle, à qui l'on attribue le signe. « Guillemet », c'est « petit Guillaume ». Chaque langue a ensuite choisi sa façon de citer : l'anglais met des apostrophes doubles autour de chaque réplique, l'allemand ouvre ses guillemets en bas, et le français, lui, préfère le tiret de dialogue — un signe qui ne se referme jamais, et qui laisse le lecteur suivre l'échange à la seule alternance des lignes. Quand tu lis un roman français, les répliques sont presque toujours au tiret ; quand tu lis une traduction, tu vois souvent les guillemets de la langue d'origine.",
  },
  formule: {
    contexte: "Le test qui tranche, en trois secondes.",
    expression: "des guillemets ? sinon : quel petit mot ouvre la suite ?",
    legende:
      "S'il y a des guillemets — ou un tiret en début de ligne —, les paroles sont citées : c'est du discours direct. S'il n'y en a pas, cherche le mot qui ouvre ce qui suit le verbe de parole : « que », « si », « qui », « pourquoi ». C'est une proposition subordonnée, donc du discours indirect. Et si le verbe de parole est placé APRÈS les paroles, c'est une incise : le sujet passe derrière lui, relié par un trait d'union.",
    schema: pile(phraseDirect, phraseIndirect),
  },
  methode: [
    {
      titre: "Je cherche les guillemets",
      texte:
        "S'ils y sont, ou un tiret en début de ligne, les paroles sont citées : c'est du direct.",
      schema: pile(phraseDirect, phraseIndirect),
      micros: ["5e_discours_direct_indirect"],
    },
    {
      titre: "Je regarde ce qui a bougé",
      texte:
        "Pronom, temps du verbe, indication de temps : au discours indirect, les trois se déplacent.",
      schema: pile(phraseFatigueDirect, phraseFatigueIndirect),
      micros: ["5e_discours_rapportees", "5e_discours_direct_indirect"],
    },
    {
      titre: "Je place la ponctuation d'après le verbe de parole",
      texte:
        "Devant les paroles : deux-points puis guillemets. Derrière : une incise, sujet inversé.",
      schema: pile(phraseMurmura, phraseIncise),
      micros: ["5e_discours_inserer"],
    },
  ],
  usages: [
    {
      titre: "Faire entendre un personnage",
      detail:
        "« Il murmura : « C'est fini. » » : le lecteur entend la voix, et le verbe lui dit sur quel ton.",
      schema: phraseMurmura,
      micros: ["5e_discours_rapportees"],
    },
    {
      titre: "Résumer ce qui a été dit",
      detail:
        "« Il dit qu'il part le lendemain » : on garde l'information et on abandonne les mots exacts.",
      schema: phraseIndirect,
      micros: ["5e_discours_direct_indirect"],
    },
    {
      titre: "Écrire un dialogue",
      detail:
        "« — Tu viens ? demanda-t-elle. » : chaque nouvelle prise de parole va à la ligne, avec son tiret.",
      schema: phraseDialogue,
      micros: ["5e_discours_inserer"],
    },
  ],
  exemples: [
    {
      titre: "Le verbe de parole est devant",
      donnees: "« Le maitre annonça : « Le contrôle est reporté. » »",
      schema: phraseAnnonca,
      micros: ["5e_discours_inserer"],
      question: "Quelle ponctuation la phrase demande-t-elle ?",
      solution:
        "Deux-points, puis un guillemet ouvrant, puis les paroles, puis le point, puis le guillemet fermant. L'ordre est toujours le même quand le verbe de parole précède : il annonce, les deux-points ouvrent, les guillemets encadrent. Le point final se met À L'INTÉRIEUR, parce qu'il termine la phrase du personnage et non celle du narrateur — c'est l'erreur la plus fréquente de tout le chapitre.",
    },
    {
      titre: "Les mêmes paroles, rapportées",
      donnees: "« Le maitre annonça que le contrôle était reporté. »",
      schema: phraseAnnoncaIndirect,
      micros: ["5e_discours_direct_indirect"],
      question: "Qu'est-ce qui a disparu, et qu'est-ce qui a changé ?",
      solution:
        "Les deux-points et les deux guillemets ont disparu ; « que » les remplace et ouvre une proposition subordonnée. Et le verbe a reculé d'un temps : « est reporté » devient « était reporté ». Ce recul n'est pas facultatif — le récit est au passé (« annonça »), donc tout ce qui est rapporté se règle sur lui. Compare les deux dessins : le groupe des paroles n'a pas changé de place, il a changé de nature.",
    },
    {
      titre: "La question qui perd son point",
      donnees: "« Elle demanda : « Qui a ouvert la porte ? » » puis « Elle demanda qui avait ouvert la porte. »",
      schema: pile(phraseQuestionDirecte, phraseQuestionIndirecte),
      micros: ["5e_discours_direct_indirect"],
      question: "Pourquoi le point d'interrogation disparaît-il ?",
      solution:
        "Parce qu'au discours indirect, la phrase n'est plus une question : c'est une phrase déclarative qui CONTIENT une question. On ne demande rien au lecteur, on raconte que quelqu'un a demandé. Le mot interrogatif « qui » reste, parce qu'il sert maintenant à ouvrir la subordonnée ; le signe, lui, s'en va, et le point final est un point ordinaire. Même chose avec « Viendras-tu avec nous ? », qui devient « Elle demanda s'il viendrait avec eux. » : le mot interrogatif est remplacé par « si », et le futur recule au conditionnel.",
    },
    {
      titre: "Où se ferme le guillemet ?",
      donnees: "« « Je ne sais pas », répondit-elle. » et « — Tu viens ? demanda-t-elle. »",
      schema: pile(phraseIncise, phraseDialogue),
      micros: ["5e_discours_inserer"],
      question: "Que fait le verbe de parole quand il passe derrière ?",
      solution:
        "Il devient une INCISE : il se détache par une virgule, et son sujet passe derrière lui, relié par un trait d'union — « répondit-elle », « demanda-t-elle ». Le guillemet, lui, se ferme après la dernière parole du personnage, JAMAIS après l'incise : celle-ci appartient au narrateur. Dans un dialogue, le tiret de début de ligne remplace le guillemet ouvrant, et il n'a pas de fermeture : c'est le retour à la ligne suivant qui fait le travail.",
    },
    {
      titre: "Le défi",
      donnees: "« « Attends-moi ! » cria-t-il. » puis « Il cria de l'attendre. »",
      schema: pile(phraseCriaTIl, phraseAttendreIndirect),
      micros: ["5e_discours_rapportees", "5e_discours_direct_indirect"],
      question: "Pourquoi l'ordre ne reste-t-il pas un ordre ?",
      solution:
        "Parce qu'un impératif ne peut pas entrer dans une subordonnée. Au direct, le personnage donne un ordre : « Attends-moi ! », avec son point d'exclamation à l'intérieur des guillemets. À l'indirect, le narrateur ne donne aucun ordre : il raconte qu'un ordre a été donné. L'impératif se transforme donc en INFINITIF, introduit par « de » — « il cria de l'attendre » —, le pronom « moi » devient « l' », et le point d'exclamation disparaît avec les guillemets. C'est la transformation la plus complète des sept paires de la banque : quatre choses changent à la fois.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      micros: ["5e_discours_direct_indirect", "5e_discours_inserer"],
      question: "« « Viendras-tu avec nous ? » demanda-t-elle. » Direct ou indirect ?",
      correction:
        "Direct. Les paroles sont citées entre guillemets, avec leur point d'interrogation, et le verbe de parole les suit en incise — sujet inversé, trait d'union.",
    },
    {
      micros: ["5e_discours_direct_indirect"],
      question: "Mets au discours indirect : « « Je ne sais pas », répondit-elle. »",
      correction:
        "« Elle répondit qu'elle ne savait pas. » Les guillemets tombent, « que » ouvre la subordonnée, « je » devient « elle », et le présent « sais » recule à l'imparfait « savait ». Le verbe de parole reprend sa place devant, avec son sujet dans l'ordre normal.",
    },
    {
      micros: ["5e_discours_direct_indirect"],
      question: "« Elle se demanda si elle avait bien fermé la porte. » Comment les paroles sont-elles rapportées ?",
      correction:
        "Au discours indirect. La question intérieure est intégrée dans une subordonnée introduite par « si », sans guillemets. Au direct, on écrirait : « Elle se demanda : « Ai-je bien fermé la porte ? » »",
    },
    {
      micros: ["5e_discours_rapportees"],
      question: "Quel verbe de parole indique que celui qui parle proteste : murmurer, chuchoter, répéter ou s'indigner ?",
      correction:
        "« S'indigner ». Le verbe introducteur ne sert pas qu'à annoncer : il colore la parole. « S'indigner » dit à la fois qu'on parle et qu'on n'accepte pas. « Murmurer » et « chuchoter » disent le volume, « répéter » dit qu'on redit.",
    },
    {
      micros: ["5e_discours_rapportees", "5e_discours_direct_indirect"],
      question: "Défi : mets au discours indirect « Il dit : « Je suis fatigué. » »",
      correction:
        "« Il dit qu'il était fatigué. » Deux changements obligatoires, et pas un de plus : le pronom « je » devient « il », et le présent « suis » passe à l'imparfait « était » puisque le récit est au passé. Attention aux fausses réponses : « qu'il est fatigué » oublie le temps, « que je suis fatigué » oublie le pronom, et « : qu'il était fatigué » garde des deux-points qui n'ont plus rien à annoncer.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesParolesRapportees5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les paroles rapportées - 5e",
    section: {
      type: "objectif",
      phrase: "Citer, ou rapporter",
      sousPhrase:
        "Reconnaître le discours direct et le discours indirect, passer de l'un à l'autre, et ponctuer un dialogue qu'on écrit soi-même.",
      encadre: {
        titre: "L'idée",
        texte: "Avec les guillemets, on entend le personnage. Sans eux, c'est le narrateur qui parle.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Dans un journal, ce qui est entre guillemets engage celui qui a parlé ; ce qui est dehors engage celui qui écrit. « Il m'a dit : « J'arrive » » n'est pas « Il m'a dit qu'il arrivait ».",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Guillemet » veut dire « petit Guillaume » : le signe est attribué à Guillaume Le Bé, graveur de caractères parisien du XVIe siècle. Le français, lui, préfère souvent le tiret de dialogue.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheParolesRapportees5e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Direct ou indirect ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Discours DIRECT",
        contenu:
          "« Il dit : « Je pars demain. » » Deux-points, guillemets, et les mots du personnage sans une retouche. On l'entend.",
      },
      droite: {
        variante: "info",
        titre: "Discours INDIRECT",
        contenu:
          "« Il dit qu'il part le lendemain. » Une proposition subordonnée, aucun guillemet. C'est le narrateur qui rapporte.",
      },
    },
  },
  {
    titre: "Ce qui bouge au passage",
    badge: "Trois déplacements",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le pronom et le temps",
        contenu: "« Je suis fatigué » devient « qu'il était fatigué » : le pronom change, le verbe recule d'un temps.",
      },
      droite: {
        variante: "info",
        titre: "Les repères de temps",
        contenu: "« demain » devient « le lendemain » : les repères se recalculent depuis le moment du récit.",
      },
    },
  },
  {
    titre: "La question perd son point",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Elle demanda : « Qui a ouvert la porte ? » » puis « Elle demanda qui avait ouvert la porte. »",
      question: "Pourquoi le point d'interrogation disparaît-il ?",
      correction:
        "La phrase n'est plus une question : elle raconte qu'une question a été posée. Le mot « qui » reste pour ouvrir la subordonnée, le signe s'en va.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "Le défi",
    badge: "Quatre changements d'un coup",
    section: {
      type: "exercice",
      enonce: "« « Attends-moi ! » cria-t-il. » puis « Il cria de l'attendre. »",
      question: "Pourquoi l'ordre ne reste-t-il pas un ordre ?",
      indice: "Un impératif ne peut pas entrer dans une subordonnée. Que devient-il alors ?",
      correction:
        "Un infinitif introduit par « de ». Le pronom « moi » devient « l' », le point d'exclamation et les guillemets disparaissent : quatre changements à la fois.",
    },
  },
];
