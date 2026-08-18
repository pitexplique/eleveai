// lib/tutor-v4/questionBank/seconde/francais/concordance-temps.bank.ts
//
// LA CONCORDANCE DES TEMPS EN SECONDE — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de seconde générale et technologique, arrêté du
// 17 janvier 2019 modifié par le JORF du 8 octobre 2020 : « Le verbe : valeurs
// temporelles, aspectuelles, modales ; CONCORDANCE DES TEMPS (dès la classe de
// seconde). […] On peut insister sur les phénomènes de concordance. »
//
// ⭐ TOUTES LES QUESTIONS D'ICI SONT DES TRANSFORMATIONS. Le programme nomme au
// IV les exercices attendus — « transformation de phrases, reformulation » — et
// la concordance s'y prête mieux que tout : on donne un état de la phrase, on
// demande l'autre. Aucune question ne fait nommer un temps.
//
// ⛔ QCM uniquement, QUATRE propositions.
// ⛔ L'IMPARFAIT DU SUBJONCTIF N'EST JAMAIS DONNÉ COMME LA FORME « CORRECTE »
// à produire : en français d'aujourd'hui il relève du style soutenu, et
// l'imposer serait enseigner une faute de registre. Il apparait seulement dans
// des phrases littéraires, où l'on demande l'EFFET qu'il produit.
// ⚠️ Tables typées à la main, jamais en `as const`.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

type Trou = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Transposition = { readonly phrase: string; readonly mot: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* =============================================================================
   1. LE TEMPS QUE LA PRINCIPALE COMMANDE  (2de_conc_principale_subordonnee)
   ---------------------------------------------------------------------------
   Quand la principale bascule au passé, la subordonnée suit : le présent
   devient imparfait, le futur devient conditionnel, le passé composé devient
   plus-que-parfait. C'est ce « futur dans le passé » qui résiste le plus.
   ========================================================================== */

const SUBORDONNEES: readonly Trou[] = [
  { phrase: "Il m'a dit qu'il … le lendemain matin.", bonne: "viendrait", faux: ["viendra", "vient", "soit venu"], raison: "la principale est au passé : le futur y devient conditionnel présent" },
  { phrase: "Il me dit qu'il … demain matin.", bonne: "viendra", faux: ["viendrait", "venait", "soit venu"], raison: "la principale est au présent : le futur reste au futur" },
  { phrase: "Elle croyait que la salle … déjà occupée.", bonne: "était", faux: ["est", "sera", "soit"], raison: "la principale est au passé : le présent y devient imparfait" },
  { phrase: "Elle croit que la salle … déjà occupée.", bonne: "est", faux: ["était", "fût", "serait"], raison: "la principale est au présent : rien ne bascule" },
  { phrase: "Nous pensions qu'ils … avant l'orage.", bonne: "étaient partis", faux: ["sont partis", "seront partis", "soient partis"], raison: "action antérieure à une principale au passé : plus-que-parfait" },
  { phrase: "Le professeur annonça que le devoir … la semaine suivante.", bonne: "aurait lieu", faux: ["aura lieu", "a lieu", "ait lieu"], raison: "futur vu depuis un passé : conditionnel présent" },
  { phrase: "Le professeur annonce que le devoir … la semaine prochaine.", bonne: "aura lieu", faux: ["aurait lieu", "avait lieu", "ait lieu"], raison: "principale au présent : le futur reste au futur" },
  { phrase: "Je savais qu'elle … la vérité depuis longtemps.", bonne: "connaissait", faux: ["connait", "connaitra", "connaisse"], raison: "principale au passé : le présent y devient imparfait" },
  { phrase: "Il expliqua qu'il … la consigne deux fois.", bonne: "avait relu", faux: ["a relu", "relira", "ait relu"], raison: "action antérieure à une principale au passé : plus-que-parfait" },
  { phrase: "On nous avait promis que le bus … à sept heures.", bonne: "passerait", faux: ["passera", "passe", "passât"], raison: "futur vu depuis un passé : conditionnel présent" },
  { phrase: "Elle m'écrit qu'elle … bien arrivée.", bonne: "est", faux: ["était", "sera", "fût"], raison: "principale au présent : rien ne bascule" },
  { phrase: "Elle m'écrivit qu'elle … bien arrivée.", bonne: "était", faux: ["est", "sera", "fût"], raison: "principale au passé : le présent y devient imparfait" },
  { phrase: "Ils espéraient que le vent … avant la nuit.", bonne: "tomberait", faux: ["tombera", "tombe", "tombât"], raison: "futur vu depuis un passé : conditionnel présent" },
  { phrase: "Je remarquai qu'il … déjà tout rangé.", bonne: "avait", faux: ["a", "aura", "ait"], raison: "action antérieure à une principale au passé : plus-que-parfait" },
  { phrase: "Chacun sait que la mer … à cet endroit.", bonne: "monte", faux: ["montait", "montera", "montât"], raison: "principale au présent, fait toujours vrai : présent" },

  /* ⚠️ CINQ CAS À BONNE RÉPONSE COURTE, ajoutés le 14/08 après mesure. La
     concordance allonge naturellement les formes attendues — conditionnel,
     plus-que-parfait — et la bonne réponse se trouvait être la plus longue des
     quatre dans 68 % des tirages. Un élève pouvait répondre à la taille, sans
     lire la principale. Ces cas rétablissent l'équilibre. */
  { phrase: "Il affirme qu'il … tout relu avant de rendre.", bonne: "a", faux: ["avait", "aurait", "eût"], raison: "principale au présent : le passé composé reste tel quel" },
  { phrase: "Je vois bien qu'elle … prête depuis un moment.", bonne: "est", faux: ["était", "serait", "aurait été"], raison: "principale au présent : rien ne bascule" },
  { phrase: "Tout le monde comprend qu'il … raison.", bonne: "a", faux: ["avait", "aurait", "eût"], raison: "principale au présent : le présent reste au présent" },
  { phrase: "Elle sait que la salle … au fond du couloir.", bonne: "est", faux: ["était", "serait", "aurait été"], raison: "principale au présent : rien ne bascule" },
  { phrase: "On raconte qu'il … né sur cette ile.", bonne: "est", faux: ["était", "serait", "aurait été"], raison: "principale au présent, fait donné pour acquis : présent" },
];

/* =============================================================================
   2. MARQUER LE RAPPORT VOULU  (2de_conc_reperes)
   ---------------------------------------------------------------------------
   ⚠️ La question ne demande PAS de nommer le rapport : trois valeurs
   — antériorité, simultanéité, postériorité — donneraient trois lignes, et
   un QCM à trois lignes se réussit une fois sur trois au hasard. On inverse
   donc : le rapport est DONNÉ dans la question, et l'élève choisit la forme
   qui le marque. Quatre formes, 25 %.
   ========================================================================== */

const REPERES: readonly Trou[] = [
  { phrase: "Il ferma la porte. Il … la clé dans sa poche AVANT ce geste.", bonne: "avait glissé", faux: ["glissa", "glissait", "glisserait"], raison: "pour marquer qu'une action précède une autre action passée, on emploie le plus-que-parfait" },
  { phrase: "Il ferma la porte. Il … dans le couloir EN MÊME TEMPS.", bonne: "sifflait", faux: ["avait sifflé", "siffla", "sifflerait"], raison: "pour marquer qu'une action dure pendant qu'une autre survient, on emploie l'imparfait" },
  { phrase: "Il ferma la porte. Il … la lumière APRÈS ce geste.", bonne: "éteignit", faux: ["avait éteint", "éteignait", "éteindrait"], raison: "pour marquer la succession dans un récit au passé simple, on emploie le passé simple" },
  { phrase: "Quand tu arriveras, je … AVANT ton arrivée.", bonne: "serai parti", faux: ["pars", "partirai", "partais"], raison: "pour marquer qu'une action sera finie avant un moment futur, on emploie le futur antérieur" },
  { phrase: "Quand tu arriveras, je … EN MÊME TEMPS que toi.", bonne: "partirai", faux: ["serai parti", "pars", "partais"], raison: "deux actions futures simultanées se mettent toutes deux au futur" },
  { phrase: "Elle relut sa copie. Elle … la consigne AVANT de la relire.", bonne: "avait souligné", faux: ["souligna", "soulignait", "soulignerait"], raison: "action antérieure à une action passée : plus-que-parfait" },
  { phrase: "Elle relut sa copie. Elle … la salle APRÈS cette relecture.", bonne: "quitta", faux: ["avait quitté", "quittait", "quitterait"], raison: "succession dans un récit au passé simple : passé simple" },
  { phrase: "Dès que la cloche … , les élèves sortiront.", bonne: "aura sonné", faux: ["sonne", "sonnera", "sonnait"], raison: "l'action doit être finie avant l'autre : futur antérieur" },
  { phrase: "Il annonça qu'il … le dossier APRÈS la réunion.", bonne: "enverrait", faux: ["avait envoyé", "envoya", "envoyait"], raison: "action à venir vue depuis un passé : conditionnel présent" },
  { phrase: "Nous étions déjà dehors. La pluie … pendant tout le trajet.", bonne: "tombait", faux: ["était tombée", "tomba", "tomberait"], raison: "action qui dure en arrière-plan : imparfait" },
  { phrase: "Le jury délibéra. Les candidats … la salle AVANT cette délibération.", bonne: "avaient quitté", faux: ["quittèrent", "quittaient", "quitteraient"], raison: "action antérieure à une action passée : plus-que-parfait" },
  { phrase: "Lorsque tu liras ces lignes, j'… l'ile depuis longtemps.", bonne: "aurai quitté", faux: ["quitte", "quitterai", "quittais"], raison: "action finie avant un moment futur : futur antérieur" },
  { phrase: "Il entra. Tout le monde … déjà assis AVANT son entrée.", bonne: "s'était assis", faux: ["s'assit", "s'asseyait", "s'assiérait"], raison: "action antérieure à une action passée : plus-que-parfait" },
  { phrase: "Il entra, salua, puis … à sa place.", bonne: "s'installa", faux: ["s'était installé", "s'installait", "s'installerait"], raison: "succession d'actions dans un récit : passé simple" },
  { phrase: "Aussitôt que nous … , nous te préviendrons.", bonne: "serons arrivés", faux: ["arrivons", "arriverons", "arrivions"], raison: "l'arrivée doit être accomplie avant l'appel : futur antérieur" },
];

/* =============================================================================
   3. LE RÉCIT BASCULE AU PASSÉ  (2de_conc_recit_au_passe)
   ---------------------------------------------------------------------------
   Exercice de transposition pure : on donne le récit au présent, on demande ce
   que devient une forme précise une fois le récit mis au passé.
   ⚠️ Le verbe visé est NOMMÉ dans la question — règle du 13/08 : dès qu'un
   énoncé porte deux formes candidates, on dit laquelle on interroge.
   ========================================================================== */

const TRANSPOSITIONS_RECIT: readonly Transposition[] = [
  { phrase: "Il entre et voit que la salle est vide.", mot: "est", bonne: "était", faux: ["fut", "avait été", "serait"], raison: "l'état qui dure en arrière-plan passe à l'imparfait" },
  { phrase: "Il entre et voit que la salle est vide.", mot: "entre", bonne: "entra", faux: ["entrait", "était entré", "entrerait"], raison: "l'action qui fait avancer le récit passe au passé simple" },
  { phrase: "Elle ouvre la lettre, puis s'assoit sans rien dire.", mot: "s'assoit", bonne: "s'assit", faux: ["s'asseyait", "s'était assise", "s'assiérait"], raison: "action ponctuelle qui fait avancer le récit : passé simple" },
  { phrase: "Le vent souffle fort et la mer monte peu à peu.", mot: "monte", bonne: "montait", faux: ["monta", "était montée", "monterait"], raison: "processus qui dure : imparfait" },
  { phrase: "Il sait qu'on l'attend dehors.", mot: "attend", bonne: "attendait", faux: ["attendit", "avait attendu", "attendrait"], raison: "état simultané, dans une principale au passé : imparfait" },
  { phrase: "Elle promet qu'elle reviendra avant la nuit.", mot: "reviendra", bonne: "reviendrait", faux: ["revenait", "revint", "était revenue"], raison: "futur vu depuis un passé : conditionnel présent" },
  { phrase: "Il remarque que la porte a été forcée.", mot: "a été forcée", bonne: "avait été forcée", faux: ["fut forcée", "était forcée", "serait forcée"], raison: "action antérieure à un passé : plus-que-parfait" },
  { phrase: "Le capitaine donne un ordre et le bateau vire de bord.", mot: "vire", bonne: "vira", faux: ["virait", "avait viré", "virerait"], raison: "action ponctuelle qui fait avancer le récit : passé simple" },
  { phrase: "La pluie tombe depuis le matin et les rues sont désertes.", mot: "sont", bonne: "étaient", faux: ["furent", "avaient été", "seraient"], raison: "état d'arrière-plan : imparfait" },
  { phrase: "Il comprend enfin ce que son père lui a expliqué.", mot: "a expliqué", bonne: "avait expliqué", faux: ["expliqua", "expliquait", "aurait expliqué"], raison: "action antérieure à un passé : plus-que-parfait" },
  { phrase: "Elle annonce qu'elle partira le lendemain.", mot: "partira", bonne: "partirait", faux: ["partait", "partit", "était partie"], raison: "futur vu depuis un passé : conditionnel présent" },
  { phrase: "Le train ralentit, puis s'arrête en pleine campagne.", mot: "s'arrête", bonne: "s'arrêta", faux: ["s'arrêtait", "s'était arrêté", "s'arrêterait"], raison: "action ponctuelle : passé simple" },
  { phrase: "Personne ne bouge, car chacun craint de se tromper.", mot: "craint", bonne: "craignait", faux: ["craignit", "avait craint", "craindrait"], raison: "état qui dure : imparfait" },
  { phrase: "Il ferme le carnet où il note ses observations.", mot: "note", bonne: "notait", faux: ["nota", "avait noté", "noterait"], raison: "habitude en arrière-plan : imparfait" },
  { phrase: "Le jour se lève quand ils atteignent le sommet.", mot: "atteignent", bonne: "atteignirent", faux: ["atteignaient", "avaient atteint", "atteindraient"], raison: "action ponctuelle qui survient : passé simple" },
];

/* =============================================================================
   4. DU DISCOURS DIRECT AU DISCOURS INDIRECT  (2de_conc_discours_rapporte)
   ---------------------------------------------------------------------------
   Trois choses bougent à la fois : les personnes, les temps, et les repères de
   temps et de lieu. « demain » devient « le lendemain », « ici » devient « là ».
   Le programme range cet exercice dans la « transformation de phrases ».
   ========================================================================== */

const RAPPORTE: readonly Transposition[] = [
  { phrase: "Il m'a dit : « Je viendrai demain. »", mot: "demain", bonne: "le lendemain", faux: ["demain", "hier", "aujourd'hui"], raison: "le repère se détache du moment de la parole : demain devient le lendemain" },
  { phrase: "Il m'a dit : « Je viendrai demain. »", mot: "je viendrai", bonne: "qu'il viendrait", faux: ["qu'il viendra", "qu'il venait", "qu'il vienne"], raison: "principale au passé : le futur devient conditionnel, et je devient il" },
  { phrase: "Elle a répondu : « Je suis fatiguée. »", mot: "je suis", bonne: "qu'elle était", faux: ["qu'elle est", "qu'elle fut", "qu'elle soit"], raison: "principale au passé : le présent devient imparfait" },
  { phrase: "Il a expliqué : « J'ai tout relu hier. »", mot: "hier", bonne: "la veille", faux: ["hier", "demain", "ce jour-là"], raison: "le repère se détache du moment de la parole : hier devient la veille" },
  { phrase: "Il a expliqué : « J'ai tout relu. »", mot: "j'ai relu", bonne: "qu'il avait tout relu", faux: ["qu'il a tout relu", "qu'il relut tout", "qu'il ait tout relu"], raison: "principale au passé : le passé composé devient plus-que-parfait" },
  { phrase: "Elle a demandé : « Où est la salle B12 ? »", mot: "où est", bonne: "où était la salle B12", faux: ["où est la salle B12", "où fut la salle B12", "où soit la salle B12"], raison: "l'interrogation devient indirecte et le présent passe à l'imparfait" },
  { phrase: "Le professeur a annoncé : « Nous partons ici même. »", mot: "ici", bonne: "là", faux: ["ici", "ailleurs", "là-bas"], raison: "le repère de lieu se détache de la situation de parole" },
  { phrase: "Il m'a dit : « Ferme la porte. »", mot: "ferme", bonne: "de fermer la porte", faux: ["que je ferme la porte", "que je fermais la porte", "que je fermerais la porte"], raison: "un ordre rapporté se construit avec de suivi de l'infinitif" },
  { phrase: "Elle a écrit : « Je pars aujourd'hui. »", mot: "aujourd'hui", bonne: "ce jour-là", faux: ["aujourd'hui", "la veille", "le lendemain"], raison: "le repère se détache du moment de la parole" },
  { phrase: "Il a affirmé : « Je ne savais rien. »", mot: "je ne savais", bonne: "qu'il n'avait rien su", faux: ["qu'il ne savait rien", "qu'il ne sut rien", "qu'il ne sache rien"], raison: "l'imparfait de la parole rapportée, antérieur au récit, passe au plus-que-parfait" },
  { phrase: "Elle a demandé : « Est-ce que tu viens ? »", mot: "est-ce que tu viens", bonne: "si je venais", faux: ["si je viens", "que je vienne", "si je vins"], raison: "l'interrogation totale devient une subordonnée en si, au temps qui convient" },
  { phrase: "Il a promis : « Je te rappellerai. »", mot: "je te rappellerai", bonne: "qu'il me rappellerait", faux: ["qu'il me rappellera", "qu'il me rappelait", "qu'il me rappelle"], raison: "principale au passé : le futur devient conditionnel" },
  { phrase: "Elle a dit : « Ce livre est à moi. »", mot: "à moi", bonne: "à elle", faux: ["à moi", "à toi", "à nous"], raison: "les personnes changent de repère avec le changement de locuteur" },
  { phrase: "Il a lancé : « Sortez tous ! »", mot: "sortez", bonne: "de sortir", faux: ["que nous sortons", "que nous sortions", "que nous sortirions"], raison: "un ordre rapporté se construit avec de suivi de l'infinitif" },
  { phrase: "Elle a soupiré : « Je n'y arriverai jamais. »", mot: "je n'y arriverai", bonne: "qu'elle n'y arriverait jamais", faux: ["qu'elle n'y arrivera jamais", "qu'elle n'y arrivait jamais", "qu'elle n'y arrive jamais"], raison: "principale au passé : le futur devient conditionnel" },

  /* ⚠️ TROIS CAS À BONNE RÉPONSE COURTE, ajoutés le 14/08 après mesure : les
     transpositions de temps allongent la réponse, et la bonne se trouvait être
     la plus longue des quatre dans 60 % des tirages. Ces trois-là portent sur
     les PERSONNES, dont les formes sont toutes brèves. */
  { phrase: "Il a dit : « Je viendrai avec toi. »", mot: "je", bonne: "il", faux: ["elle", "on", "tu"], raison: "celui qui parle devient troisième personne dans le récit qui le rapporte" },
  { phrase: "Elle a dit : « Mon frère arrive demain. »", mot: "mon", bonne: "son", faux: ["ton", "leur", "notre"], raison: "le possessif change avec la personne qui rapporte" },
  { phrase: "Ils ont dit : « Nous restons jusqu'au bout. »", mot: "nous", bonne: "ils", faux: ["elles", "eux", "on"], raison: "le pronom sujet passe à la troisième personne du pluriel" },
];

/* =============================================================================
   5. LE TEMPS DU SUBJONCTIF  (2de_conc_subjonctif)
   ---------------------------------------------------------------------------
   ⛔ En français d'aujourd'hui, le subjonctif n'a que DEUX temps vivants : le
   présent, pour ce qui est simultané ou à venir, et le passé, pour ce qui est
   déjà accompli. L'imparfait et le plus-que-parfait du subjonctif appartiennent
   au style soutenu — on ne les fait jamais produire ici. Deux items les
   présentent dans des phrases littéraires, et l'on demande alors l'EFFET, non
   la correction.
   ========================================================================== */

/* ═══════════ LES TABLES DES SECONDS ITEMS (18/08/2026) ═══════════
   Le coach en mode complet oppose deux énoncés : il faut deux items par micro,
   et d'ANGLES différents. Les cinq premiers items de ce fichier font tous le
   même geste — on donne la phrase, l'élève choisit ou transpose une forme. Les
   cinq suivants prennent le chemin inverse : on remonte de la forme au rapport
   qu'elle marque, on ramène un récit du passé au présent, on retrouve les
   paroles derrière le discours indirect, on cherche ce qui déclenche un mode.
   ⚠️ Longueurs de réponses tenues voisines dès l'écriture : sur la banque du
   verbe, deux items écrits sans cette précaution sortaient à +27 caractères
   d'avance au contrôle de devinabilité. */

type Rapport = { readonly phrase: string; readonly mot: string; readonly rep: string };
type Retour = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Declencheur = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* 2 bis. LA FORME EST ÉCRITE, LE RAPPORT EST À LIRE (2de_conc_reperes)
   Le premier item donne le rapport en majuscules et fait choisir la forme.
   Celui-ci fait l'inverse, et c'est plus difficile : rien n'est annoncé, il faut
   lire la terminaison pour retrouver l'ordre des actions. */
const RAPPORTS: readonly string[] = [
  "antérieure, dans le passé",
  "simultanée, dans le passé",
  "postérieure, dans le passé",
  "antérieure, dans le futur",
  "simultanée, dans le futur",
  "postérieure, vue depuis le passé",
];

const LECTURES_RAPPORT: readonly Rapport[] = [
  { phrase: "Il ferma la porte. Il avait glissé la clé dans sa poche.", mot: "avait glissé", rep: "antérieure, dans le passé" },
  { phrase: "Il ferma la porte. Il sifflait dans le couloir.", mot: "sifflait", rep: "simultanée, dans le passé" },
  { phrase: "Il ferma la porte, puis éteignit la lumière.", mot: "éteignit", rep: "postérieure, dans le passé" },
  { phrase: "Quand tu arriveras, je serai déjà parti.", mot: "serai parti", rep: "antérieure, dans le futur" },
  { phrase: "Quand tu arriveras, nous partirons ensemble.", mot: "partirons", rep: "simultanée, dans le futur" },
  { phrase: "Il annonça qu'il enverrait le dossier.", mot: "enverrait", rep: "postérieure, vue depuis le passé" },
  { phrase: "Dès que la cloche aura sonné, les élèves sortiront.", mot: "aura sonné", rep: "antérieure, dans le futur" },
  { phrase: "Elle relut sa copie. Elle avait souligné la consigne.", mot: "avait souligné", rep: "antérieure, dans le passé" },
  { phrase: "Nous étions dehors. La pluie tombait sans discontinuer.", mot: "tombait", rep: "simultanée, dans le passé" },
  { phrase: "Lorsque tu liras ces lignes, j'aurai quitté l'ile.", mot: "aurai quitté", rep: "antérieure, dans le futur" },
  { phrase: "Elle promit qu'elle reviendrait avant la nuit.", mot: "reviendrait", rep: "postérieure, vue depuis le passé" },
  { phrase: "Il entra, salua, puis s'installa à sa place.", mot: "s'installa", rep: "postérieure, dans le passé" },
  { phrase: "Le jury délibéra. Les candidats avaient quitté la salle.", mot: "avaient quitté", rep: "antérieure, dans le passé" },
  { phrase: "Pendant que nous parlerons, ils prépareront la salle.", mot: "prépareront", rep: "simultanée, dans le futur" },
  { phrase: "Il jura qu'il ne recommencerait plus jamais.", mot: "recommencerait", rep: "postérieure, vue depuis le passé" },
  { phrase: "La cloche sonna. Les élèves sortirent en silence.", mot: "sortirent", rep: "postérieure, dans le passé" },
];

/* 3 bis. LE RÉCIT REMONTE AU PRÉSENT (2de_conc_recit_au_passe)
   ⭐ Le premier item descend du présent vers le passé ; celui-ci remonte. Le
   sens du trajet compte : à la descente, l'élève applique une règle apprise ; à
   la remontée, il doit reconnaitre d'abord quel PLAN portait la forme, puisque
   passé simple et imparfait retombent tous deux sur le présent. */
const TRANSPOSITIONS_PRESENT: readonly Transposition[] = [
  { phrase: "Il entra et vit que la salle était vide.", mot: "entra", bonne: "entre", faux: ["entrait", "est entré", "entrera"], raison: "le passé simple du récit retombe sur le présent de narration" },
  { phrase: "Il entra et vit que la salle était vide.", mot: "était", bonne: "est", faux: ["fut", "a été", "sera"], raison: "l'imparfait d'arrière-plan retombe lui aussi sur le présent" },
  { phrase: "Elle ouvrit la lettre, puis s'assit sans rien dire.", mot: "s'assit", bonne: "s'assoit", faux: ["s'asseyait", "s'est assise", "s'assiéra"], raison: "action ponctuelle du récit : présent de narration" },
  { phrase: "Le vent soufflait fort et la mer montait peu à peu.", mot: "montait", bonne: "monte", faux: ["monta", "est montée", "montera"], raison: "le processus qui durait passe au présent" },
  { phrase: "Il savait qu'on l'attendait dehors.", mot: "attendait", bonne: "attend", faux: ["attendit", "a attendu", "attendra"], raison: "la subordonnée suit la principale, qui est passée au présent" },
  { phrase: "Elle promit qu'elle reviendrait avant la nuit.", mot: "reviendrait", bonne: "reviendra", faux: ["revient", "revenait", "est revenue"], raison: "le conditionnel de futur dans le passé redevient un futur simple" },
  { phrase: "Il remarqua que la porte avait été forcée.", mot: "avait été forcée", bonne: "a été forcée", faux: ["fut forcée", "est forcée", "sera forcée"], raison: "le plus-que-parfait, antérieur au récit, redevient passé composé" },
  { phrase: "Le train ralentit, puis s'arrêta en pleine campagne.", mot: "s'arrêta", bonne: "s'arrête", faux: ["s'arrêtait", "s'est arrêté", "s'arrêtera"], raison: "action ponctuelle : présent de narration" },
  { phrase: "Personne ne bougeait, car chacun craignait de se tromper.", mot: "craignait", bonne: "craint", faux: ["craignit", "a craint", "craindra"], raison: "l'état qui durait passe au présent" },
  { phrase: "Le jour se levait quand ils atteignirent le sommet.", mot: "atteignirent", bonne: "atteignent", faux: ["atteignaient", "ont atteint", "atteindront"], raison: "l'événement qui survient passe au présent de narration" },
  { phrase: "Il comprit enfin ce que son père lui avait expliqué.", mot: "avait expliqué", bonne: "a expliqué", faux: ["expliqua", "explique", "expliquera"], raison: "l'antériorité se marque au présent par le passé composé" },
  { phrase: "Il ferma le carnet où il notait ses observations.", mot: "notait", bonne: "note", faux: ["nota", "a noté", "notera"], raison: "l'habitude d'arrière-plan passe au présent" },
];

/* 4 bis. RETROUVER LES PAROLES (2de_conc_discours_rapporte)
   Le premier item va du direct vers l'indirect. Celui-ci remonte au direct, et
   c'est le geste du commentaire : sous une parole rapportée, retrouver ce qui a
   été dit. ⚠️ Les trois leurres ne changent qu'UNE chose chacun — le temps, la
   personne, ou le repère. L'élève ne peut donc pas éliminer à l'oreille : il
   doit vérifier les trois. */
const RETOURS_DIRECT: readonly Retour[] = [
  { phrase: "Il m'a dit qu'il viendrait le lendemain.", bonne: "« Je viendrai demain. »", faux: ["« Je viendrais demain. »", "« Je viendrai le lendemain. »", "« Il viendra demain. »"], raison: "le conditionnel redevient futur, « le lendemain » redevient « demain », « il » redevient « je »" },
  { phrase: "Elle a répondu qu'elle était fatiguée.", bonne: "« Je suis fatiguée. »", faux: ["« J'étais fatiguée. »", "« Elle est fatiguée. »", "« Je serai fatiguée. »"], raison: "l'imparfait du discours indirect correspond à un présent dans les paroles" },
  { phrase: "Il a expliqué qu'il avait tout relu la veille.", bonne: "« J'ai tout relu hier. »", faux: ["« J'avais tout relu hier. »", "« J'ai tout relu la veille. »", "« Il a tout relu hier. »"], raison: "le plus-que-parfait redevient passé composé et « la veille » redevient « hier »" },
  { phrase: "Elle a demandé où était la salle B12.", bonne: "« Où est la salle B12 ? »", faux: ["« Où était la salle B12 ? »", "« Où sera la salle B12 ? »", "« Où fut la salle B12 ? »"], raison: "l'interrogation indirecte à l'imparfait correspond à un présent" },
  { phrase: "Il m'a dit de fermer la porte.", bonne: "« Ferme la porte. »", faux: ["« Je ferme la porte. »", "« Tu fermeras la porte. »", "« Il faut fermer la porte. »"], raison: "« de » suivi de l'infinitif rapporte un ordre : c'était un impératif" },
  { phrase: "Elle a demandé si je venais.", bonne: "« Est-ce que tu viens ? »", faux: ["« Est-ce que je viens ? »", "« Est-ce que tu venais ? »", "« Est-ce qu'il vient ? »"], raison: "« si » rapporte une question totale ; « je » du récit répond à « tu » des paroles" },
  { phrase: "Il a promis qu'il me rappellerait.", bonne: "« Je te rappellerai. »", faux: ["« Je te rappellerais. »", "« Il me rappellera. »", "« Je te rappelle. »"], raison: "le conditionnel redevient futur, et les personnes s'échangent" },
  { phrase: "Elle a dit que ce livre était à elle.", bonne: "« Ce livre est à moi. »", faux: ["« Ce livre était à moi. »", "« Ce livre est à elle. »", "« Ce livre sera à moi. »"], raison: "le possessif revient à la première personne, le temps au présent" },
  { phrase: "Elle a soupiré qu'elle n'y arriverait jamais.", bonne: "« Je n'y arriverai jamais. »", faux: ["« Je n'y arriverais jamais. »", "« Elle n'y arrivera jamais. »", "« Je n'y arrive jamais. »"], raison: "conditionnel du récit, futur dans les paroles" },
  { phrase: "Il a affirmé qu'il n'avait rien su.", bonne: "« Je ne savais rien. »", faux: ["« Je n'ai rien su. »", "« Il ne savait rien. »", "« Je ne saurai rien. »"], raison: "le plus-que-parfait rapporte ici un imparfait des paroles" },
];

/* 5 bis. QU'EST-CE QUI IMPOSE LE SUBJONCTIF ? (2de_conc_subjonctif)
   Le premier item fait choisir le TEMPS du subjonctif. Celui-ci demande sa
   CAUSE : ce n'est pas le verbe subordonné qui décide de son mode, c'est ce qui
   l'introduit. ⚠️ Les quatre propositions sont des groupes de la phrase, de
   longueur voisine — dont le verbe au subjonctif lui-même, qui est l'effet et
   non la cause. C'est le piège utile. */
const DECLENCHEURS: readonly Declencheur[] = [
  { phrase: "Je doute qu'il ait déjà terminé son devoir.", bonne: "je doute que", faux: ["il ait terminé", "déjà terminé", "son devoir"], raison: "un verbe de doute impose le subjonctif dans la subordonnée" },
  { phrase: "Il faut que chacun rende sa copie avant midi.", bonne: "il faut que", faux: ["chacun rende", "rende sa copie", "avant midi"], raison: "« il faut que » exprime la nécessité : le fait n'est pas réalisé" },
  { phrase: "Bien qu'il pleuve encore, la sortie est maintenue.", bonne: "bien que", faux: ["il pleuve", "est maintenue", "la sortie"], raison: "les conjonctions de concession appellent le subjonctif" },
  { phrase: "Je souhaite qu'il vienne demain sans faute.", bonne: "je souhaite que", faux: ["vienne sans faute", "il vienne demain", "demain sans faute"], raison: "un verbe de volonté impose le subjonctif" },
  { phrase: "Je regrette qu'elle soit partie sans prévenir.", bonne: "je regrette que", faux: ["elle soit partie", "partie sans prévenir", "sans prévenir"], raison: "un verbe de sentiment impose le subjonctif" },
  { phrase: "Pour qu'il comprenne, répète la consigne lentement.", bonne: "pour que", faux: ["il comprenne", "la consigne", "répète lentement"], raison: "le but s'exprime au subjonctif : il n'est pas encore atteint" },
  { phrase: "Avant qu'il ne parte, dis-lui la vérité.", bonne: "avant que", faux: ["il ne parte", "dis-lui", "la vérité"], raison: "« avant que » situe l'action dans le non-encore-réalisé" },
  { phrase: "Il est possible qu'elle réussisse l'examen.", bonne: "il est possible que", faux: ["elle réussisse", "réussisse l'examen", "l'examen"], raison: "une tournure de possibilité impose le subjonctif" },
  { phrase: "Quoi qu'il arrive, nous resterons ensemble.", bonne: "quoi que", faux: ["il arrive", "nous resterons", "ensemble"], raison: "les tours concessifs en « quoi que » appellent le subjonctif" },
  { phrase: "Je ne pense pas qu'il ait raison sur ce point.", bonne: "je ne pense pas que", faux: ["il ait raison", "raison sur ce point", "sur ce point"], raison: "un verbe d'opinion à la forme négative fait basculer au subjonctif" },
  { phrase: "Jusqu'à ce que la nuit tombe, ils attendirent.", bonne: "jusqu'à ce que", faux: ["la nuit tombe", "ils attendirent", "la nuit"], raison: "la limite temporelle non atteinte appelle le subjonctif" },
];

/* 1 bis. LA CONCORDANCE EST ROMPUE, OÙ ? (2de_conc_principale_subordonnee)
   Le premier item propose des formes et en fait choisir une. Celui-ci pose une
   phrase déjà écrite, et fautive : rien ne signale où regarder. C'est le geste
   de la relecture, celui qui sert vraiment en copie.
   ⚠️ La faute est TOUJOURS dans la subordonnée, jamais dans la principale : la
   règle veut que ce soit la principale qui commande. Une table où l'on
   corrigerait tantôt l'une tantôt l'autre enseignerait le contraire. */
const RUPTURES: readonly Declencheur[] = [
  { phrase: "Il croyait que Paul est parti la veille.", bonne: "est parti", faux: ["croyait", "la veille", "Paul"], raison: "après une principale au passé, l'antériorité se marque au plus-que-parfait : « était parti »" },
  { phrase: "Elle savait qu'il viendra le lendemain.", bonne: "viendra", faux: ["savait", "le lendemain", "il"], raison: "un futur vu depuis le passé se met au conditionnel : « viendrait »" },
  { phrase: "Je pensais qu'il a raison sur ce point.", bonne: "a", faux: ["pensais", "sur ce point", "raison"], raison: "après une principale au passé, le simultané se met à l'imparfait : « avait »" },
  { phrase: "Il annonça qu'il partira très bientôt.", bonne: "partira", faux: ["annonça", "très bientôt", "il"], raison: "futur vu depuis le passé : « partirait »" },
  { phrase: "Nous espérions qu'elle réussira son épreuve.", bonne: "réussira", faux: ["espérions", "son épreuve", "elle"], raison: "futur vu depuis le passé : « réussirait »" },
  { phrase: "Il ignorait que la salle est déjà fermée.", bonne: "est", faux: ["ignorait", "déjà fermée", "la salle"], raison: "simultané dans le passé : « était »" },
  { phrase: "Elle raconta qu'elle a vu la mer une fois.", bonne: "a vu", faux: ["raconta", "une fois", "la mer"], raison: "antérieur à un passé : « avait vu »" },
  { phrase: "Il jura qu'il ne recommencera plus jamais.", bonne: "recommencera", faux: ["jura", "plus jamais", "il"], raison: "futur vu depuis le passé : « recommencerait »" },
  { phrase: "Je croyais que tu seras là pour l'ouverture.", bonne: "seras", faux: ["croyais", "pour l'ouverture", "tu"], raison: "futur vu depuis le passé : « serais »" },
  { phrase: "Ils comprirent que le train est déjà passé.", bonne: "est", faux: ["comprirent", "déjà passé", "le train"], raison: "antérieur à un passé : « était »" },
  { phrase: "Elle sentait que quelque chose va arriver.", bonne: "va", faux: ["sentait", "quelque chose", "arriver"], raison: "futur proche vu depuis le passé : « allait »" },
];

const SUBJONCTIFS: readonly Trou[] = [
  { phrase: "Je doute qu'il … déjà terminé son devoir.", bonne: "ait", faux: ["a", "avait", "aurait"], raison: "l'action est présentée comme accomplie : subjonctif passé" },
  { phrase: "Je souhaite qu'il … demain sans faute.", bonne: "vienne", faux: ["vient", "viendra", "viendrait"], raison: "l'action est à venir : subjonctif présent" },
  { phrase: "Il faut que chacun … sa copie avant midi.", bonne: "rende", faux: ["rend", "rendra", "rendrait"], raison: "l'action est à venir : subjonctif présent" },
  { phrase: "Je regrette qu'elle … sans nous prévenir.", bonne: "soit partie", faux: ["est partie", "était partie", "serait partie"], raison: "l'action est déjà accomplie : subjonctif passé" },
  { phrase: "Bien qu'il … encore, la sortie est maintenue.", bonne: "pleuve", faux: ["pleut", "pleuvra", "pleuvrait"], raison: "fait envisagé et simultané : subjonctif présent" },
  { phrase: "Nous partirons avant que la nuit ne … .", bonne: "tombe", faux: ["tombera", "tombait", "tomberait"], raison: "l'action est postérieure : subjonctif présent" },
  { phrase: "Je crains qu'ils n'… la consigne.", bonne: "aient mal compris", faux: ["ont mal compris", "avaient mal compris", "auraient mal compris"], raison: "l'action est déjà accomplie : subjonctif passé" },
  { phrase: "Il est possible que la salle … libre à cette heure.", bonne: "soit", faux: ["est", "sera", "serait"], raison: "fait envisagé, simultané : subjonctif présent" },
  { phrase: "Elle est heureuse que tu … la question toi-même.", bonne: "aies posé", faux: ["as posé", "avais posé", "aurais posé"], raison: "l'action est accomplie : subjonctif passé" },
  { phrase: "Je ne pense pas qu'il … capable de mentir.", bonne: "soit", faux: ["est", "sera", "serait"], raison: "fait envisagé, simultané : subjonctif présent" },
  { phrase: "Pourvu qu'ils … avant l'orage !", bonne: "arrivent", faux: ["arrivent bientôt tous", "arriveront", "arriveraient"], raison: "souhait tourné vers l'avenir : subjonctif présent" },
  { phrase: "Je suis surpris qu'elle ne m'… rien dit.", bonne: "ait", faux: ["a", "avait", "aurait"], raison: "l'action est accomplie : subjonctif passé" },
  { phrase: "Il attend que le silence … complet pour commencer.", bonne: "soit", faux: ["est", "sera", "serait"], raison: "fait attendu, donc envisagé : subjonctif présent" },
  { phrase: "C'est le meilleur travail que j'… cette année.", bonne: "aie lu", faux: ["ai lu", "avais lu", "aurais lu"], raison: "après un superlatif, le subjonctif s'impose ; l'action est accomplie" },
  { phrase: "Il fallait qu'il vînt avant la nuit.", bonne: "cette forme relève du style soutenu", faux: ["cette forme est fautive", "cette forme est la seule correcte aujourd'hui", "cette forme marque une action à venir"], raison: "l'imparfait du subjonctif n'est plus employé que dans un registre soutenu ou littéraire" },
  { phrase: "Elle eût voulu qu'on la laissât seule.", bonne: "cette forme relève du style soutenu", faux: ["cette forme est fautive", "cette forme est la seule correcte aujourd'hui", "cette forme marque une action à venir"], raison: "l'imparfait du subjonctif n'est plus employé que dans un registre soutenu ou littéraire" },
];

export const concordanceTempsSecondeBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "2de_conc_principale_subordonnee_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_principale_subordonnee",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde d'abord le temps de la principale. C'est lui qui commande tout le reste.",
    tags: ["seconde", "grammaire", "concordance", "template"],
    generate: () => {
      const c = randomChoice(SUBORDONNEES);
      return {
        text: `« ${c.phrase} »\n\nQuelle forme convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le temps de la subordonnée se règle sur celui de la principale. Si la principale bascule au passé, tout suit : le présent devient imparfait, le futur devient conditionnel, le passé composé devient plus-que-parfait.",
          "Repère le verbe de la principale, puis demande-toi si l'action de la subordonnée est avant, pendant ou après lui.",
          `Ici, ${c.raison} : on écrit « ${c.bonne} ».`,
          `C'est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_conc_reperes_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_reperes",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rapport voulu est écrit en majuscules dans la phrase : choisis la forme qui le marque.",
    tags: ["seconde", "grammaire", "concordance", "template"],
    generate: () => {
      const c = randomChoice(REPERES);
      return {
        text: `« ${c.phrase} »\n\nQuelle forme marque le rapport demandé ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Trois rapports sont possibles entre deux actions : l'une précède l'autre, elles se déroulent ensemble, ou l'une suit l'autre. Chaque rapport a ses formes : les temps composés marquent l'antériorité, l'imparfait la durée en arrière-plan, le passé simple la succession.",
          "Place les deux actions sur une ligne, puis choisis la forme qui dit ce que tu viens de placer.",
          `Ici, ${c.raison}.`,
          `C'est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_conc_recit_au_passe_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_recit_au_passe",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi si le verbe fait avancer l'histoire ou s'il tient le décor : les deux ne basculent pas au même temps.",
    tags: ["seconde", "grammaire", "concordance", "récit", "template"],
    generate: () => {
      const c = randomChoice(TRANSPOSITIONS_RECIT);
      return {
        text: `« ${c.phrase} »\n\nOn récrit ce récit au passé. Que devient « ${c.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un récit au présent ne bascule pas d'un bloc. Les verbes qui font avancer l'histoire passent au passé simple ; ceux qui tiennent le décor ou disent une habitude passent à l'imparfait ; ceux qui renvoient à un moment antérieur passent au plus-que-parfait.",
          "Avant de choisir, demande-toi ce que le verbe faisait dans le récit au présent. Son rôle ne change pas ; seule sa forme change.",
          `Ici, ${c.raison}.`,
          `« ${c.mot} » devient « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_conc_discours_rapporte_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_discours_rapporte",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois choses bougent en même temps : les personnes, les temps, et les repères de temps et de lieu.",
    tags: ["seconde", "grammaire", "concordance", "discours rapporté", "template"],
    generate: () => {
      const c = randomChoice(RAPPORTE);
      return {
        text: `« ${c.phrase} »\n\nOn rapporte ces paroles au discours indirect. Que devient « ${c.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Passer au discours indirect détache les paroles de la situation où elles ont été dites. Les personnes changent de repère, les temps se règlent sur le verbe introducteur, et les mots qui pointaient le moment ou le lieu de la parole se transforment : demain devient le lendemain, ici devient là.",
          "Demande-toi qui parle, quand il parle, et où il se trouve — puis récris comme si tu étais ailleurs et plus tard.",
          `Ici, ${c.raison}.`,
          `« ${c.mot} » devient « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_conc_subjonctif_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_subjonctif",
    difficulty: 3,
    theme: "neutral",
    hint: "Le subjonctif n'a que deux temps vivants : le présent pour ce qui vient, le passé pour ce qui est déjà fait.",
    tags: ["seconde", "grammaire", "concordance", "subjonctif", "template"],
    generate: () => {
      const c = randomChoice(SUBJONCTIFS);
      const litteraire = c.bonne.startsWith("cette forme");
      return {
        text: litteraire
          ? `« ${c.phrase} »\n\nQue dire de la forme verbale de la subordonnée ?`
          : `« ${c.phrase} »\n\nQuelle forme convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "En français d'aujourd'hui, le subjonctif n'a que deux temps en usage : le présent, pour ce qui est simultané ou à venir, et le passé, pour ce qui est déjà accompli. L'imparfait et le plus-que-parfait du subjonctif existent, mais ils appartiennent au style soutenu et ne se produisent plus.",
          "Demande-toi si l'action de la subordonnée est déjà faite au moment dont parle la principale. Si oui, subjonctif passé ; sinon, subjonctif présent.",
          `Ici, ${c.raison}.`,
          litteraire ? `${c.bonne.charAt(0).toUpperCase()}${c.bonne.slice(1)}.` : `On écrit « ${c.bonne} ».`,
      ),
      };
    },
  },

  /* ══════════════ LES SECONDS ITEMS ══════════════ */

  {
    kind: "template",
    id: "2de_conc_principale_subordonnee_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_principale_subordonnee",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère d'abord le temps de la principale. La faute est toujours du côté de la subordonnée.",
    tags: ["seconde", "grammaire", "concordance", "relecture", "template"],
    generate: () => {
      const c = randomChoice(RUPTURES);
      return {
        text: `« ${c.phrase} »\n\nCette phrase ne respecte pas la concordance des temps. Quel élément est fautif ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La concordance n'est pas une politesse : c'est un rapport. Le verbe de la principale fixe un repère, et la subordonnée se règle sur lui. Quand la principale est au passé, le simultané se met à l'imparfait, l'antérieur au plus-que-parfait, et ce qui devait venir au conditionnel.",
          "Ne relis pas la phrase d'une traite. Isole la principale, note son temps, puis reviens à la subordonnée et demande-toi si sa forme dit bien le rapport voulu.",
          `Ici, ${c.raison}.`,
          `Le mot fautif est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_conc_reperes_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_reperes",
    difficulty: 4,
    theme: "neutral",
    hint: "Rien n'est annoncé cette fois. La terminaison seule dit dans quel ordre les deux actions se rangent.",
    tags: ["seconde", "grammaire", "concordance", "repères", "template"],
    generate: () => {
      const c = randomChoice(LECTURES_RAPPORT);
      return {
        text: `« ${c.phrase} »\n\nQuel rapport la forme « ${c.mot} » marque-t-elle avec l'autre verbe ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, RAPPORTS),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque forme composée porte un rapport d'ordre : le plus-que-parfait dit l'antériorité dans le passé, le futur antérieur l'antériorité dans le futur, l'imparfait la simultanéité passée, le conditionnel présent ce qui devait venir quand on regarde depuis le passé.",
          "Repère les deux verbes, puis demande-toi lequel se produit en premier. La forme composée est presque toujours celle qui vient avant.",
          `Ici, « ${c.mot} » situe l'action comme ${c.rep}.`,
          `L'action est ${c.rep}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_conc_recit_au_passe_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_recit_au_passe",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : le passé simple et l'imparfait retombent tous deux sur le présent. Ce n'est pas un aller-retour mécanique.",
    tags: ["seconde", "grammaire", "concordance", "récit", "template"],
    generate: () => {
      const c = randomChoice(TRANSPOSITIONS_PRESENT);
      return {
        text: `« ${c.phrase} »\n\nOn récrit ce récit au présent de narration. Que devient « ${c.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le présent de narration rapproche le récit du lecteur : les événements semblent se produire sous ses yeux. Tout le système bascule avec lui — le passé simple et l'imparfait deviennent des présents, le plus-que-parfait devient un passé composé, le conditionnel de futur dans le passé redevient un futur.",
          "Demande-toi ce que la forme disait : un événement, un décor, une antériorité, un avenir. Puis choisis la forme qui dit la même chose depuis le présent.",
          `Ici, ${c.raison}.`,
          `« ${c.mot} » devient « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_conc_discours_rapporte_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_discours_rapporte",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois choses ont bougé quand on a rapporté ces paroles. Vérifie-les une par une : la personne, le temps, le repère.",
    tags: ["seconde", "grammaire", "concordance", "discours rapporté", "template"],
    generate: () => {
      const c = randomChoice(RETOURS_DIRECT);
      return {
        text: `« ${c.phrase} »\n\nQuelles ont été les paroles exactes ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Rapporter des paroles déplace trois choses à la fois : les personnes suivent celui qui rapporte, les temps reculent d'un cran quand le verbe introducteur est au passé, et les repères se détachent du moment de la parole. Remonter au discours direct, c'est défaire ces trois déplacements — c'est ce qu'on fait en commentant une citation.",
          "Traite-les séparément. Qui parlait ? Quel temps correspond à celui du récit ? Et à quel repère renvoie « la veille » ou « le lendemain » ?",
          `Ici, ${c.raison}.`,
          `Les paroles étaient : ${c.bonne}`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_conc_subjonctif_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "concordance_temps_2de",
    microId: "2de_conc_subjonctif",
    difficulty: 3,
    theme: "neutral",
    hint: "Le verbe au subjonctif est l'effet, pas la cause. Cherche ce qui l'introduit.",
    tags: ["seconde", "grammaire", "concordance", "subjonctif", "template"],
    generate: () => {
      const c = randomChoice(DECLENCHEURS);
      return {
        text: `« ${c.phrase} »\n\nQuel élément impose le subjonctif ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le subjonctif ne se choisit pas : il est commandé. Trois familles le déclenchent — les verbes de volonté, de sentiment et de doute ; les tournures impersonnelles de nécessité ou de possibilité ; et certaines conjonctions, celles du but, de la concession et de la limite temporelle. Le point commun : le fait n'est pas donné comme réalisé.",
          "Remonte de la subordonnée vers ce qui l'introduit. Si tu remplaces l'introducteur par « il est certain que », le subjonctif tombe — c'est bien lui qui le tenait.",
          `Ici, ${c.raison}.`,
          `C'est « ${c.bonne} » qui l'impose.`,
        ),
      };
    },
  },
];
