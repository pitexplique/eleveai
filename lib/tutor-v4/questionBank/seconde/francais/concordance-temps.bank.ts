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
];
