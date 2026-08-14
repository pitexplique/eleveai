// lib/tutor-v4/questionBank/seconde/francais/verbe-valeurs.bank.ts
//
// LE VERBE EN SECONDE : TEMPS, ASPECT, MODE — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de seconde générale et technologique, arrêté du
// 17 janvier 2019 modifié par le JORF du 8 octobre 2020, deuxième point de
// l'étude de la langue travaillé DÈS LA CLASSE DE SECONDE :
//   « Le verbe : valeurs temporelles, aspectuelles, modales ; concordance des
//   temps. Jusqu'au cycle 4, le verbe fait l'objet d'une approche
//   principalement morphologique et sémantique ; PARVENUS AU LYCÉE, LES ÉLÈVES
//   DOIVENT DONC ÊTRE CAPABLES D'IDENTIFIER UNE FORME VERBALE. On peut insister
//   sur les phénomènes de concordance, sur le rôle des temps dans la
//   structuration des récits et sur la modalisation du propos. »
//
// ⭐⭐ C'EST LA PHRASE QUI COMMANDE TOUT LE FICHIER. Identifier une forme
// verbale est l'ACQUIS D'ENTRÉE en seconde, pas l'objectif. Aucune question ne
// demande donc « à quel temps est ce verbe ? » — la 3e le fait déjà, et bien.
// Ce qui est neuf au lycée, c'est le partage entre TEMPS (quand l'action se
// situe), ASPECT (comment elle se déroule) et MODE (comment celui qui parle la
// présente). Trois questions différentes sur une seule forme.
//
// ⛔ QCM uniquement, QUATRE propositions.
// ⚠️ AUCUNE RÉPONSE D'UN MÊME POOL NE DOIT S'EMBOITER — règle apprise le
// 13/08. « Achevée » et « qui vient de s'achever » se cochent l'une l'autre ;
// « hypothèse » et « supposition » aussi. Les pools ci-dessous ont été écrits
// pour que les lignes s'excluent deux à deux, quitte à être plus longues.
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

type Cas = { readonly phrase: string; readonly forme: string; readonly rep: string };

/* =============================================================================
   1. TEMPS OU ASPECT ?  (2de_verbe_temps_aspect)
   ---------------------------------------------------------------------------
   Le TEMPS situe l'action sur une ligne : avant, pendant, après le moment où
   l'on parle. L'ASPECT dit tout autre chose : comment l'action se déroule —
   commencée, en cours, achevée, répétée. Une même forme porte les deux, et
   c'est le second que le collège n'a pas nommé.
   ⚠️ Les six lignes du pool s'excluent deux à deux : une action qui commence
   n'est pas en cours, une action achevée ne touche pas à sa fin.
   ========================================================================== */

const ASPECTS: readonly string[] = [
  "que l'action est achevée",
  "que l'action est en cours",
  "que l'action commence",
  "que l'action touche à sa fin sans être achevée",
  "que l'action se répète",
  "que l'action n'a pas encore commencé",
];

const CAS_ASPECT: readonly Cas[] = [
  { phrase: "Quand nous sommes arrivés, il avait déjà mangé.", forme: "avait mangé", rep: "que l'action est achevée" },
  { phrase: "Il mangeait tranquillement quand la porte s'ouvrit.", forme: "mangeait", rep: "que l'action est en cours" },
  { phrase: "Elle se met à écrire dès qu'elle rentre.", forme: "se met à écrire", rep: "que l'action commence" },
  { phrase: "Il finissait de relire sa copie quand la cloche sonna.", forme: "finissait de relire", rep: "que l'action touche à sa fin sans être achevée" },
  { phrase: "Chaque matin, elle relisait ses notes avant le cours.", forme: "relisait", rep: "que l'action se répète" },
  { phrase: "Elle va partir dans quelques minutes.", forme: "va partir", rep: "que l'action n'a pas encore commencé" },
  { phrase: "Nous avons terminé le travail hier soir.", forme: "avons terminé", rep: "que l'action est achevée" },
  { phrase: "Il était en train de traverser la cour.", forme: "était en train de traverser", rep: "que l'action est en cours" },
  { phrase: "Le vent commençait à souffler sur la baie.", forme: "commençait à souffler", rep: "que l'action commence" },
  { phrase: "Le jour achevait de se lever sur les champs.", forme: "achevait de se lever", rep: "que l'action touche à sa fin sans être achevée" },
  { phrase: "Tous les étés, ils descendaient à la rivière.", forme: "descendaient", rep: "que l'action se répète" },
  { phrase: "Le train est sur le point d'entrer en gare.", forme: "est sur le point d'entrer", rep: "que l'action n'a pas encore commencé" },
  { phrase: "Dès qu'il eut fermé la porte, le silence revint.", forme: "eut fermé", rep: "que l'action est achevée" },
  { phrase: "Elle lisait encore lorsque je me suis endormi.", forme: "lisait", rep: "que l'action est en cours" },
  { phrase: "Il se remettait à peine à travailler.", forme: "se remettait à travailler", rep: "que l'action commence" },
  { phrase: "Le mardi, ils allaient au marché de Saint-Pierre.", forme: "allaient", rep: "que l'action se répète" },
];

/* =============================================================================
   2. ACHEVÉE PAR RAPPORT À QUOI ?  (2de_verbe_accompli)
   ---------------------------------------------------------------------------
   L'accompli n'est pas le passé. « J'aurai terminé quand tu arriveras » est au
   FUTUR et pourtant accompli : l'action sera finie au moment dont la phrase
   parle. C'est ce décalage que l'élève doit voir, et le collège ne le demande
   pas.
   ========================================================================== */

const REPERES_ACCOMPLI: readonly string[] = [
  "elle sera achevée avant le moment dont parle la phrase",
  "elle était achevée avant le moment dont parle la phrase",
  "elle est achevée au moment où l'on parle",
  "elle n'est pas achevée : elle se déroule encore",
  "elle n'a pas commencé au moment dont parle la phrase",
];

const CAS_ACCOMPLI: readonly Cas[] = [
  { phrase: "Quand tu arriveras, j'aurai terminé mon devoir.", forme: "aurai terminé", rep: "elle sera achevée avant le moment dont parle la phrase" },
  { phrase: "Quand tu es arrivé, je terminais mon devoir.", forme: "terminais", rep: "elle n'est pas achevée : elle se déroule encore" },
  { phrase: "Lorsqu'il entra, elle avait rangé toutes ses affaires.", forme: "avait rangé", rep: "elle était achevée avant le moment dont parle la phrase" },
  { phrase: "Lorsqu'il entra, elle rangeait ses affaires.", forme: "rangeait", rep: "elle n'est pas achevée : elle se déroule encore" },
  { phrase: "J'ai relu la consigne : je peux commencer.", forme: "ai relu", rep: "elle est achevée au moment où l'on parle" },
  { phrase: "Dès que la cloche aura sonné, nous partirons.", forme: "aura sonné", rep: "elle sera achevée avant le moment dont parle la phrase" },
  { phrase: "Il allait sortir quand le téléphone sonna.", forme: "allait sortir", rep: "elle n'a pas commencé au moment dont parle la phrase" },
  { phrase: "Nous avions déjà quitté la salle quand l'orage éclata.", forme: "avions quitté", rep: "elle était achevée avant le moment dont parle la phrase" },
  { phrase: "Elle écrit sa lettre en ce moment même.", forme: "écrit", rep: "elle n'est pas achevée : elle se déroule encore" },
  { phrase: "Le jury a délibéré : les résultats sont affichés.", forme: "a délibéré", rep: "elle est achevée au moment où l'on parle" },
  { phrase: "Quand vous relirez ces lignes, j'aurai quitté l'ile.", forme: "aurai quitté", rep: "elle sera achevée avant le moment dont parle la phrase" },
  { phrase: "Il était sur le point de répondre quand on l'interrompit.", forme: "était sur le point de répondre", rep: "elle n'a pas commencé au moment dont parle la phrase" },
  { phrase: "Elle eut fini de parler, et personne ne bougea.", forme: "eut fini", rep: "elle était achevée avant le moment dont parle la phrase" },
  { phrase: "Les élèves travaillent encore à cette heure-ci.", forme: "travaillent", rep: "elle n'est pas achevée : elle se déroule encore" },
  { phrase: "J'ai compris votre remarque, je la note.", forme: "ai compris", rep: "elle est achevée au moment où l'on parle" },
];

/* =============================================================================
   3. CE QUE LES TEMPS FONT AU RÉCIT  (2de_verbe_temps_recit)
   ---------------------------------------------------------------------------
   « le rôle des temps dans la structuration des récits », dit le programme.
   L'imparfait et le passé simple ne se distinguent pas par leur ancienneté :
   ils se répartissent le travail. L'un tient le décor, l'autre fait avancer.
   ⚠️ Chaque ligne du pool nomme un RÔLE, jamais un temps : répondre « c'est
   l'imparfait » serait redire l'énoncé.
   ========================================================================== */

const ROLES_RECIT: readonly string[] = [
  "il pose le cadre dans lequel l'action va se produire",
  "il fait avancer l'histoire d'un cran",
  "il dit ce qui se faisait d'habitude, avant l'épisode raconté",
  "il montre une action en train de se dérouler quand une autre survient",
  "il commente les faits depuis le moment où l'on écrit",
];

const CAS_RECIT: readonly Cas[] = [
  { phrase: "La nuit tombait sur le port. Les lampes s'allumaient une à une.", forme: "tombait", rep: "il pose le cadre dans lequel l'action va se produire" },
  { phrase: "Il hésita, puis frappa trois coups à la porte.", forme: "frappa", rep: "il fait avancer l'histoire d'un cran" },
  { phrase: "Chaque dimanche, ils marchaient jusqu'au phare.", forme: "marchaient", rep: "il dit ce qui se faisait d'habitude, avant l'épisode raconté" },
  { phrase: "Elle lisait près de la fenêtre quand on sonna.", forme: "lisait", rep: "il montre une action en train de se dérouler quand une autre survient" },
  { phrase: "La chaleur était lourde, le ciel bas, la rue déserte.", forme: "était", rep: "il pose le cadre dans lequel l'action va se produire" },
  { phrase: "Le capitaine se leva et sortit sans un mot.", forme: "sortit", rep: "il fait avancer l'histoire d'un cran" },
  { phrase: "Autrefois, on descendait la rivière en barque.", forme: "descendait", rep: "il dit ce qui se faisait d'habitude, avant l'épisode raconté" },
  { phrase: "Ils dinaient encore lorsque l'orage éclata.", forme: "dinaient", rep: "il montre une action en train de se dérouler quand une autre survient" },
  { phrase: "On voit ici combien ce personnage se trompe sur lui-même.", forme: "voit", rep: "il commente les faits depuis le moment où l'on écrit" },
  { phrase: "Le vent se leva d'un coup et emporta la bâche.", forme: "emporta", rep: "il fait avancer l'histoire d'un cran" },
  { phrase: "La maison sentait le café et le pain chaud.", forme: "sentait", rep: "il pose le cadre dans lequel l'action va se produire" },
  { phrase: "Tous les soirs, sa mère lui racontait la même histoire.", forme: "racontait", rep: "il dit ce qui se faisait d'habitude, avant l'épisode raconté" },
  { phrase: "Il traversait la cour quand la cloche sonna.", forme: "traversait", rep: "il montre une action en train de se dérouler quand une autre survient" },
  { phrase: "Ce récit nous montre à quel point le silence pèse.", forme: "montre", rep: "il commente les faits depuis le moment où l'on écrit" },
  { phrase: "Elle ouvrit la lettre, la parcourut, puis la reposa.", forme: "parcourut", rep: "il fait avancer l'histoire d'un cran" },
];

/* =============================================================================
   4. LES VALEURS DU PRÉSENT  (2de_verbe_present_valeur)
   ---------------------------------------------------------------------------
   ⚠️ « présent de narration » et « présent historique » désignent des emplois
   très voisins : ils s'emboitent, donc UNE SEULE ligne les recouvre ici,
   formulée par l'effet — « raconter un fait passé comme s'il se déroulait ».
   ========================================================================== */

const VALEURS_PRESENT: readonly string[] = [
  "il dit ce qui se passe au moment où l'on parle",
  "il énonce ce qui reste vrai en tout temps",
  "il rapporte une habitude",
  "il raconte un fait passé comme s'il se déroulait sous nos yeux",
  "il annonce un fait tout proche à venir",
];

const CAS_PRESENT: readonly Cas[] = [
  { phrase: "Regarde : il pleut sur la baie.", forme: "pleut", rep: "il dit ce qui se passe au moment où l'on parle" },
  { phrase: "L'eau bout à cent degrés au niveau de la mer.", forme: "bout", rep: "il énonce ce qui reste vrai en tout temps" },
  { phrase: "Le samedi, elle prend le bus de sept heures.", forme: "prend", rep: "il rapporte une habitude" },
  { phrase: "En 1789, le peuple prend la Bastille.", forme: "prend", rep: "il raconte un fait passé comme s'il se déroulait sous nos yeux" },
  { phrase: "Je pars dans dix minutes, ne m'attends pas.", forme: "pars", rep: "il annonce un fait tout proche à venir" },
  { phrase: "Qui sème le vent récolte la tempête.", forme: "sème", rep: "il énonce ce qui reste vrai en tout temps" },
  { phrase: "J'écris ces lignes en pensant à toi.", forme: "écris", rep: "il dit ce qui se passe au moment où l'on parle" },
  { phrase: "Tous les matins, il descend chercher le pain.", forme: "descend", rep: "il rapporte une habitude" },
  { phrase: "Soudain la porte s'ouvre, et l'homme entre sans frapper.", forme: "s'ouvre", rep: "il raconte un fait passé comme s'il se déroulait sous nos yeux" },
  { phrase: "Nous arrivons demain par le premier vol.", forme: "arrivons", rep: "il annonce un fait tout proche à venir" },
  { phrase: "La Terre tourne autour du Soleil.", forme: "tourne", rep: "il énonce ce qui reste vrai en tout temps" },
  { phrase: "Chaque hiver, la rivière déborde au même endroit.", forme: "déborde", rep: "il rapporte une habitude" },
  { phrase: "Écoute, on frappe à la porte.", forme: "frappe", rep: "il dit ce qui se passe au moment où l'on parle" },
  { phrase: "En 1610, Galilée observe les satellites de Jupiter.", forme: "observe", rep: "il raconte un fait passé comme s'il se déroulait sous nos yeux" },
  { phrase: "Je te rappelle ce soir, promis.", forme: "rappelle", rep: "il annonce un fait tout proche à venir" },
];

/* =============================================================================
   5. LA VALEUR MODALE  (2de_verbe_valeur_modale)
   ---------------------------------------------------------------------------
   Le mode ne dit ni quand ni comment : il dit COMMENT CELUI QUI PARLE PRÉSENTE
   L'ACTION — comme un fait, comme une éventualité, comme une information
   qu'il ne garantit pas.
   ⚠️ « hypothèse » et « supposition » s'emboitent : chaque ligne précise donc
   ce qui la distingue — condition exprimée dans la phrase, ou supposition sur
   ce qui se passe en ce moment.
   ========================================================================== */

const VALEURS_MODALES: readonly string[] = [
  "une information rapportée que celui qui parle ne garantit pas",
  "un fait soumis à une condition exprimée dans la phrase",
  "une demande adoucie par politesse",
  "une supposition sur ce qui se passe au moment où l'on parle",
  "un fait seulement envisagé, que rien ne donne pour réel",
  "une action présentée comme certaine à venir",
];

const CAS_MODAL: readonly Cas[] = [
  { phrase: "Selon les premiers témoins, le feu serait parti de la cuisine.", forme: "serait parti", rep: "une information rapportée que celui qui parle ne garantit pas" },
  { phrase: "Si j'avais le temps, je relirais tout le chapitre.", forme: "relirais", rep: "un fait soumis à une condition exprimée dans la phrase" },
  { phrase: "Pourriez-vous répéter la consigne, s'il vous plait ?", forme: "pourriez", rep: "une demande adoucie par politesse" },
  { phrase: "Il n'est pas encore là : il aura manqué son bus.", forme: "aura manqué", rep: "une supposition sur ce qui se passe au moment où l'on parle" },
  { phrase: "Je crains qu'il ne soit trop tard pour s'inscrire.", forme: "soit", rep: "un fait seulement envisagé, que rien ne donne pour réel" },
  { phrase: "Le train partira à sept heures précises.", forme: "partira", rep: "une action présentée comme certaine à venir" },
  { phrase: "D'après le journal, la décision aurait été prise hier.", forme: "aurait été prise", rep: "une information rapportée que celui qui parle ne garantit pas" },
  { phrase: "Si tu partais maintenant, tu arriverais avant la nuit.", forme: "arriverais", rep: "un fait soumis à une condition exprimée dans la phrase" },
  { phrase: "Je voudrais vous poser une question.", forme: "voudrais", rep: "une demande adoucie par politesse" },
  { phrase: "Il faut que chacun rende sa copie avant midi.", forme: "rende", rep: "un fait seulement envisagé, que rien ne donne pour réel" },
  { phrase: "Elle ne répond pas : elle sera déjà partie.", forme: "sera partie", rep: "une supposition sur ce qui se passe au moment où l'on parle" },
  { phrase: "Nous vous répondrons dès la semaine prochaine.", forme: "répondrons", rep: "une action présentée comme certaine à venir" },
  { phrase: "Le suspect se serait enfui par les toits, affirme la police.", forme: "se serait enfui", rep: "une information rapportée que celui qui parle ne garantit pas" },
  { phrase: "J'aimerais savoir où se trouve la salle B12.", forme: "aimerais", rep: "une demande adoucie par politesse" },
  { phrase: "Bien qu'il pleuve, la sortie est maintenue.", forme: "pleuve", rep: "un fait seulement envisagé, que rien ne donne pour réel" },
  { phrase: "Si le vent tombait, nous sortirions le bateau.", forme: "sortirions", rep: "un fait soumis à une condition exprimée dans la phrase" },
];

/* =============================================================================
   6. LA MODALISATION  (2de_verbe_modalisation)
   ---------------------------------------------------------------------------
   « la modalisation du propos », dit le programme — et c'est l'entrée la plus
   utile de toutes, parce qu'elle sert directement à lire la presse et les
   textes d'idées. La question n'est plus grammaticale : QUE S'ENGAGE À DIRE
   CELUI QUI PARLE ?
   ⚠️ Les lignes du pool disent chacune un degré d'engagement différent, et
   aucune n'est un cas particulier d'une autre.
   ========================================================================== */

const ENGAGEMENTS: readonly string[] = [
  "il affirme le fait sans aucune réserve",
  "il juge le fait probable sans le donner pour sûr",
  "il attribue le fait à quelqu'un d'autre sans le reprendre à son compte",
  "il prend ses distances avec le mot lui-même",
  "il présente le fait comme une obligation, non comme une réalité",
  "il tient le fait pour douteux",
];

const CAS_MODALISATION: readonly Cas[] = [
  { phrase: "La réunion aura lieu jeudi à quatorze heures.", forme: "aura lieu", rep: "il affirme le fait sans aucune réserve" },
  { phrase: "Le projet sera sans doute reporté à septembre.", forme: "sans doute", rep: "il juge le fait probable sans le donner pour sûr" },
  { phrase: "Selon la direction, les travaux seraient terminés.", forme: "selon la direction, seraient", rep: "il attribue le fait à quelqu'un d'autre sans le reprendre à son compte" },
  { phrase: "On nous promet une « réforme historique ».", forme: "les guillemets", rep: "il prend ses distances avec le mot lui-même" },
  { phrase: "Chaque candidat doit remettre son dossier avant lundi.", forme: "doit remettre", rep: "il présente le fait comme une obligation, non comme une réalité" },
  { phrase: "Il est peu probable que la salle soit libre à cette heure.", forme: "peu probable", rep: "il tient le fait pour douteux" },
  { phrase: "Le collège compte quatre cent douze élèves cette année.", forme: "compte", rep: "il affirme le fait sans aucune réserve" },
  { phrase: "La météo annonce probablement de la pluie en fin de journée.", forme: "probablement", rep: "il juge le fait probable sans le donner pour sûr" },
  { phrase: "D'après les riverains, le bruit durerait toute la nuit.", forme: "d'après les riverains, durerait", rep: "il attribue le fait à quelqu'un d'autre sans le reprendre à son compte" },
  { phrase: "Ils réclament ce qu'ils appellent une « mise au point ».", forme: "ce qu'ils appellent", rep: "il prend ses distances avec le mot lui-même" },
  { phrase: "Il faudrait que le dossier soit relu avant l'envoi.", forme: "il faudrait", rep: "il présente le fait comme une obligation, non comme une réalité" },
  { phrase: "Rien ne dit que cette mesure changera quoi que ce soit.", forme: "rien ne dit que", rep: "il tient le fait pour douteux" },
  { phrase: "Le train part à six heures douze.", forme: "part", rep: "il affirme le fait sans aucune réserve" },
  { phrase: "Cette hypothèse semble tenir la route.", forme: "semble", rep: "il juge le fait probable sans le donner pour sûr" },
  { phrase: "Le communiqué évoque une « simple mise à jour ».", forme: "les guillemets", rep: "il prend ses distances avec le mot lui-même" },
  { phrase: "J'ai du mal à croire que la salle ait été fermée sans prévenir.", forme: "j'ai du mal à croire", rep: "il tient le fait pour douteux" },
];

export const verbeValeursSecondeBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "2de_verbe_temps_aspect_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_temps_aspect",
    difficulty: 2,
    theme: "neutral",
    hint: "Ne cherche pas QUAND l'action se situe : cherche COMMENT elle se déroule.",
    tags: ["seconde", "grammaire", "verbe", "aspect", "template"],
    generate: () => {
      const c = randomChoice(CAS_ASPECT);
      return {
        text: `« ${c.phrase} »\n\nQue dit la forme « ${c.forme} » de la façon dont l'action se déroule ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, ASPECTS),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une forme verbale porte deux informations à la fois. Le temps la situe : avant, pendant ou après le moment où l'on parle. L'aspect dit son déroulement : commencée, en cours, achevée, répétée. Ce sont deux questions distinctes sur la même forme.",
          "Demande-toi d'abord si l'action est finie ou non, puis si elle démarre, dure ou se répète. Le moment où elle se place n'entre pas dans cette réponse.",
          `Dans « ${c.phrase} », la forme « ${c.forme} » indique ${c.rep}.`,
          `Elle indique ${c.rep}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_accompli_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_accompli",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère d'abord le moment dont la phrase parle, puis demande-toi si l'action est finie À CE MOMENT-LÀ.",
    tags: ["seconde", "grammaire", "verbe", "aspect", "template"],
    generate: () => {
      const c = randomChoice(CAS_ACCOMPLI);
      return {
        text: `« ${c.phrase} »\n\nOù en est l'action exprimée par « ${c.forme} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, REPERES_ACCOMPLI),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'accompli n'est pas le passé. « J'aurai terminé quand tu arriveras » est au futur, et pourtant l'action y est présentée comme finie : elle le sera au moment dont la phrase parle. Les formes composées marquent l'accompli, les formes simples ne le marquent pas.",
          "Trouve le repère que la phrase installe — un autre verbe, une date, le moment où l'on parle — puis place l'action par rapport à lui.",
          `Ici, « ${c.forme} » présente l'action ainsi : ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_temps_recit_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_temps_recit",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi si l'histoire avance à cet endroit, ou si elle s'arrête pour montrer quelque chose.",
    tags: ["seconde", "grammaire", "verbe", "récit", "template"],
    generate: () => {
      const c = randomChoice(CAS_RECIT);
      return {
        text: `« ${c.phrase} »\n\nQuel rôle « ${c.forme} » joue-t-il dans le récit ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, ROLES_RECIT),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un récit, les temps se répartissent le travail. L'un tient le décor, les habitudes et les actions qui durent ; l'autre fait surgir les évènements et pousse l'histoire en avant. Le présent, lui, peut sortir du récit pour commenter.",
          "Supprime le verbe par la pensée : si l'histoire perd une étape, il faisait avancer. Si elle perd seulement une image, il tenait le décor.",
          `Ici, « ${c.forme} » fait ceci : ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_present_valeur_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_present_valeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Le présent ne dit pas toujours « maintenant ». Regarde ce qui l'entoure : une date, un adverbe, une habitude.",
    tags: ["seconde", "grammaire", "verbe", "présent", "template"],
    generate: () => {
      const c = randomChoice(CAS_PRESENT);
      return {
        text: `« ${c.phrase} »\n\nQuelle valeur le présent « ${c.forme} » prend-il ici ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, VALEURS_PRESENT),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le présent est le temps le moins fixe du français : il dit le moment où l'on parle, mais aussi ce qui vaut toujours, ce qui se répète, ce qui va arriver, et même le passé qu'on veut rendre vivant.",
          "Cherche l'indice autour du verbe : une date renvoie au passé raconté, un adverbe de fréquence à l'habitude, un complément de temps à venir au futur proche.",
          `Ici, le contexte tranche : ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_valeur_modale_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_valeur_modale",
    difficulty: 3,
    theme: "neutral",
    hint: "La question n'est pas « quand ? » mais « celui qui parle donne-t-il cela pour vrai ? ».",
    tags: ["seconde", "grammaire", "verbe", "mode", "template"],
    generate: () => {
      const c = randomChoice(CAS_MODAL);
      return {
        text: `« ${c.phrase} »\n\nQue présente la forme « ${c.forme} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, VALEURS_MODALES),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La valeur modale dit comment celui qui parle présente l'action : comme un fait, comme une éventualité, comme une information qu'il ne garantit pas, comme une demande adoucie. Une même forme change de valeur selon ce qui l'entoure.",
          "Cherche l'indice qui accompagne le verbe : une source citée, une condition en si, une formule de politesse, une expression de doute.",
          `Ici, « ${c.forme} » présente ${c.rep}.`,
          `C'est ${c.rep}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_modalisation_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_modalisation",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi ce que celui qui écrit accepterait de signer, et ce dont il se protège.",
    tags: ["seconde", "grammaire", "verbe", "modalisation", "template"],
    generate: () => {
      const c = randomChoice(CAS_MODALISATION);
      return {
        text: `« ${c.phrase} »\n\nÀ quoi « ${c.forme} » engage-t-il celui qui écrit ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, ENGAGEMENTS),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Modaliser, c'est régler la distance entre soi et ce qu'on avance. Le conditionnel, les adverbes de doute, les verbes comme sembler ou devoir, les guillemets et les sources citées servent tous à cela — et lire la presse commence là.",
          "Retire la marque et relis : si la phrase devient une affirmation nette, c'est que la marque servait à s'en protéger.",
          `Ici, « ${c.forme} » fait que ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },
];
