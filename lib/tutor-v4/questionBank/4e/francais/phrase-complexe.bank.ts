// lib/tutor-v4/questionBank/4e/francais/phrase-complexe.bank.ts
//
// LA PHRASE COMPLEXE EN 4e — écrit le 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. C'est le programme ENCORE EN
// VIGUEUR pour la 4e : le nouveau BO du 5 mars 2026 ne l'atteindra qu'en
// septembre 2027. ⛔ Ne pas confondre avec le programme suivi par la 5e.
//
// NOTION NEUVE : `phrase_complexe`. La 4e ne l'avait pas — alors que le CM2 et
// la 6e en ont une — pendant que le programme lui consacre une section
// entière, « Fonctionnement de la phrase complexe ».
//
// PÉRIMÈTRE : « Distinguer phrase simple / complexe » ; « Connaître les notions
// de juxtaposition, coordination, subordination » ; « Analyser les positions
// des propositions subordonnées (conjonctive, interrogative indirecte,
// relative, infinitive, participiale) et leurs relations avec les autres
// constituants » ; « Comprendre la fonction grammaticale des propositions
// subordonnées dans la phrase » ; « Comprendre le fonctionnement de la
// proposition subordonnée relative et identifier la fonction du pronom relatif
// dans la subordonnée » ; « Analyser le rôle syntaxique des signes de
// ponctuation et utiliser ces signes à bon escient ».
//
// ⚠️ La 3e suit le MÊME programme jusqu'en 2028 et aurait besoin du même bloc,
// avec des cas plus difficiles. On ne lui recopie pas ces items : elle aura les
// siens.
//
// ⛔ QCM uniquement, quatre propositions.

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

type Cas = { readonly gauche: string; readonly droite: string };

/* =============================================================================
   1. SIMPLE, COMPLEXE, NON VERBALE
   ---------------------------------------------------------------------------
   On compte les VERBES CONJUGUÉS, pas les virgules ni la longueur. Une phrase
   de trois lignes peut être simple ; une phrase de six mots peut être complexe.
   ========================================================================== */

const SIMPLE_COMPLEXE: readonly Cas[] = [
  { gauche: "Le vieux pêcheur répara longuement son filet déchiré.", droite: "une phrase simple : un seul verbe conjugué" },
  { gauche: "Il rentra, il posa son sac, il s'assit.", droite: "une phrase complexe : trois propositions" },
  { gauche: "Quand la pluie cessa, nous sommes sortis.", droite: "une phrase complexe : deux propositions" },
  { gauche: "Quel silence dans la cour !", droite: "une phrase non verbale : aucun verbe conjugué" },
  { gauche: "Malgré la fatigue et le vent contraire, elle atteignit le sommet avant midi.", droite: "une phrase simple : un seul verbe conjugué" },
  { gauche: "Je crois qu'il viendra.", droite: "une phrase complexe : deux propositions" },
  { gauche: "Interdiction de stationner devant le portail.", droite: "une phrase non verbale : aucun verbe conjugué" },
  { gauche: "Il ouvrit la porte, entra dans la pièce sombre et alluma la lampe.", droite: "une phrase simple : un seul verbe conjugué" },
  { gauche: "Le vent se leva, les volets claquèrent, la maison trembla.", droite: "une phrase complexe : trois propositions" },
  { gauche: "Elle partit parce qu'elle était en retard.", droite: "une phrase complexe : deux propositions" },
  { gauche: "Fermeture annuelle du 1er au 15 août.", droite: "une phrase non verbale : aucun verbe conjugué" },
  { gauche: "Les enfants du village couraient pieds nus sur le sable brûlant.", droite: "une phrase simple : un seul verbe conjugué" },
  { gauche: "Il pleuvait, mais personne ne rentrait.", droite: "une phrase complexe : deux propositions" },
  { gauche: "Le maitre expliqua, les élèves écoutèrent, personne ne bougea.", droite: "une phrase complexe : trois propositions" },
  { gauche: "Quelle chaleur, ce matin !", droite: "une phrase non verbale : aucun verbe conjugué" },
];

const TOUTES_SORTES: readonly string[] = [...new Set(SIMPLE_COMPLEXE.map((s) => s.droite))];

/* =============================================================================
   2. JUXTAPOSITION, COORDINATION, SUBORDINATION
   ---------------------------------------------------------------------------
   ⚠️ Le piège des élèves : prendre « quand » ou « parce que » pour des mots de
   coordination. La coordination met deux propositions à ÉGALITÉ ; la
   subordination en met une SOUS l'autre.
   ========================================================================== */

const LIENS: readonly Cas[] = [
  { gauche: "Il rentra, il posa son sac.", droite: "la juxtaposition : les propositions sont séparées par la ponctuation" },
  { gauche: "Il rentra et il posa son sac.", droite: "la coordination : un mot de liaison met les propositions à égalité" },
  { gauche: "Il rentra dès qu'il posa son sac.", droite: "la subordination : une proposition dépend grammaticalement de l'autre" },
  { gauche: "Le vent se leva ; les volets claquèrent.", droite: "la juxtaposition : les propositions sont séparées par la ponctuation" },
  { gauche: "Le vent se leva, donc les volets claquèrent.", droite: "la coordination : un mot de liaison met les propositions à égalité" },
  { gauche: "Les volets claquèrent parce que le vent se leva.", droite: "la subordination : une proposition dépend grammaticalement de l'autre" },
  { gauche: "Elle appela, personne ne répondit.", droite: "la juxtaposition : les propositions sont séparées par la ponctuation" },
  { gauche: "Elle appela mais personne ne répondit.", droite: "la coordination : un mot de liaison met les propositions à égalité" },
  { gauche: "Elle appela bien qu'il fût tard.", droite: "la subordination : une proposition dépend grammaticalement de l'autre" },
  { gauche: "Je sais qu'il viendra.", droite: "la subordination : une proposition dépend grammaticalement de l'autre" },
  { gauche: "Il faut partir tôt, car la route est longue.", droite: "la coordination : un mot de liaison met les propositions à égalité" },
  { gauche: "Le jour tombait : la mer devenait noire.", droite: "la juxtaposition : les propositions sont séparées par la ponctuation" },
  { gauche: "Nous attendrons jusqu'à ce que le car arrive.", droite: "la subordination : une proposition dépend grammaticalement de l'autre" },
  { gauche: "Il ne dit rien ni ne bougea.", droite: "la coordination : un mot de liaison met les propositions à égalité" },
  // ⚠️ QUATRIÈME CATÉGORIE, ajoutée après mesure : la table n'en comptait que
  // trois, et le QCM ne sortait donc que trois propositions — un enfant qui
  // répond au hasard réussit une fois sur trois au lieu d'une sur quatre.
  // Ces phrases-là sont SIMPLES : un complément ou une énumération de groupes
  // n'est pas une proposition. C'est l'erreur que la virgule fait commettre.
  { gauche: "Il rentra chez lui avant la nuit.", droite: "aucun lien : la phrase ne compte qu'une seule proposition conjuguée" },
  { gauche: "Le vent, la pluie et le froid les arrêtèrent.", droite: "aucun lien : la phrase ne compte qu'une seule proposition conjuguée" },
  { gauche: "Malgré la fatigue, elle continua sans s'arrêter.", droite: "aucun lien : la phrase ne compte qu'une seule proposition conjuguée" },
];

const TOUS_LIENS: readonly string[] = [...new Set(LIENS.map((l) => l.droite))];

/* =============================================================================
   3. LES CINQ SORTES DE SUBORDONNÉES
   ---------------------------------------------------------------------------
   Les cinq que la terminologie du programme exige. La subordonnée est mise
   entre crochets dans l'énoncé, pour que la question porte sur son ESPÈCE et
   non sur son repérage.
   ========================================================================== */

const SUBORDONNEES: readonly Cas[] = [
  { gauche: "Je crois [qu'il viendra demain].", droite: "une subordonnée conjonctive, introduite par « que »" },
  { gauche: "Je me demande [s'il viendra demain].", droite: "une subordonnée interrogative indirecte" },
  { gauche: "Le livre [que tu m'as prêté] est passionnant.", droite: "une subordonnée relative, introduite par un pronom relatif" },
  { gauche: "J'entends [les oiseaux chanter] au petit matin.", droite: "une subordonnée infinitive, dont le verbe est à l'infinitif" },
  { gauche: "[Le repas terminé], nous sommes sortis.", droite: "une subordonnée participiale, dont le verbe est au participe" },
  { gauche: "Il affirme [que la mer est calme].", droite: "une subordonnée conjonctive, introduite par « que »" },
  { gauche: "Elle ignore [pourquoi le car a du retard].", droite: "une subordonnée interrogative indirecte" },
  { gauche: "La maison [où j'ai grandi] a été vendue.", droite: "une subordonnée relative, introduite par un pronom relatif" },
  { gauche: "Je regarde [le soleil se coucher] derrière le piton.", droite: "une subordonnée infinitive, dont le verbe est à l'infinitif" },
  { gauche: "[La nuit venue], le village s'éteignit.", droite: "une subordonnée participiale, dont le verbe est au participe" },
  { gauche: "Nous savons [qu'ils sont partis].", droite: "une subordonnée conjonctive, introduite par « que »" },
  { gauche: "Dis-moi [ce que tu comptes faire].", droite: "une subordonnée interrogative indirecte" },
  { gauche: "L'élève [qui a répondu] avait raison.", droite: "une subordonnée relative, introduite par un pronom relatif" },
  { gauche: "[Son travail achevé], il ferma le cahier.", droite: "une subordonnée participiale, dont le verbe est au participe" },
  { gauche: "On voit [les barques rentrer] au port.", droite: "une subordonnée infinitive, dont le verbe est à l'infinitif" },
];

const TOUTES_SUB: readonly string[] = [...new Set(SUBORDONNEES.map((s) => s.droite))];

/* =============================================================================
   4. LA FONCTION DE LA SUBORDONNÉE
   ---------------------------------------------------------------------------
   « Comprendre la FONCTION GRAMMATICALE des propositions subordonnées dans la
   phrase » : une subordonnée occupe une place que pourrait tenir un groupe
   nominal. C'est en la remplaçant qu'on trouve sa fonction.
   ========================================================================== */

const FONCTIONS: readonly Cas[] = [
  { gauche: "Je crois [qu'il viendra].", droite: "complément d'objet direct du verbe principal" },
  { gauche: "[Quand la cloche sonna], les élèves sortirent.", droite: "complément circonstanciel de temps du verbe principal" },
  { gauche: "Le livre [que tu m'as prêté] est passionnant.", droite: "complément de l'antécédent : elle complète un nom" },
  { gauche: "Il partit [parce que la nuit tombait].", droite: "complément circonstanciel de cause du verbe principal" },
  { gauche: "Elle affirme [qu'elle a tout vérifié].", droite: "complément d'objet direct du verbe principal" },
  { gauche: "[Dès que le car arriva], nous sommes montés.", droite: "complément circonstanciel de temps du verbe principal" },
  { gauche: "La maison [où j'ai grandi] a été vendue.", droite: "complément de l'antécédent : elle complète un nom" },
  { gauche: "Nous rentrons [puisque la pluie redouble].", droite: "complément circonstanciel de cause du verbe principal" },
  { gauche: "Je sais [que tu as raison].", droite: "complément d'objet direct du verbe principal" },
  { gauche: "[Pendant qu'il lisait], la nuit est tombée.", droite: "complément circonstanciel de temps du verbe principal" },
  { gauche: "L'élève [qui a répondu] s'est levé.", droite: "complément de l'antécédent : elle complète un nom" },
  { gauche: "Il se tut [car personne ne l'écoutait].", droite: "complément circonstanciel de cause du verbe principal" },
  { gauche: "Ils espèrent [que le vent tombera].", droite: "complément d'objet direct du verbe principal" },
  { gauche: "Le sentier [que nous avons suivi] montait dur.", droite: "complément de l'antécédent : elle complète un nom" },
];

const TOUTES_FONCTIONS: readonly string[] = [...new Set(FONCTIONS.map((f) => f.droite))];

/* =============================================================================
   5. LA FONCTION DU PRONOM RELATIF
   ---------------------------------------------------------------------------
   « identifier la fonction du pronom relatif DANS LA SUBORDONNÉE » — et non
   dans la phrase entière. C'est là que l'erreur se fait : on donne la fonction
   de l'antécédent au lieu de celle du pronom.
   ========================================================================== */

const RELATIFS: readonly Cas[] = [
  { gauche: "L'élève [qui a répondu] avait raison.", droite: "sujet du verbe, dans la subordonnée" },
  { gauche: "Le livre [que tu m'as prêté] est passionnant.", droite: "complément d'objet direct, dans la subordonnée" },
  { gauche: "La maison [où j'ai grandi] a été vendue.", droite: "complément circonstanciel de lieu, dans la subordonnée" },
  { gauche: "L'année [où nous sommes partis] fut la plus sèche.", droite: "complément circonstanciel de temps, dans la subordonnée" },
  { gauche: "Le pêcheur [qui rentrait] nous fit signe.", droite: "sujet du verbe, dans la subordonnée" },
  { gauche: "Le sentier [que nous avons suivi] montait dur.", droite: "complément d'objet direct, dans la subordonnée" },
  { gauche: "Le village [où le car s'arrête] est minuscule.", droite: "complément circonstanciel de lieu, dans la subordonnée" },
  { gauche: "Le jour [où elle est née] était un dimanche.", droite: "complément circonstanciel de temps, dans la subordonnée" },
  { gauche: "Les enfants [qui jouaient] se sont tus.", droite: "sujet du verbe, dans la subordonnée" },
  { gauche: "La lettre [qu'il a écrite] n'est jamais partie.", droite: "complément d'objet direct, dans la subordonnée" },
  { gauche: "La grotte [où ils se sont abrités] était sèche.", droite: "complément circonstanciel de lieu, dans la subordonnée" },
  { gauche: "Le soir [où l'orage éclata], tout le monde dormait.", droite: "complément circonstanciel de temps, dans la subordonnée" },
  { gauche: "L'homme [qui parle] est mon oncle.", droite: "sujet du verbe, dans la subordonnée" },
  { gauche: "Les photos [que j'ai prises] sont floues.", droite: "complément d'objet direct, dans la subordonnée" },
];

const TOUTES_RELATIF: readonly string[] = [...new Set(RELATIFS.map((r) => r.droite))];

/* =============================================================================
   6. LE RÔLE SYNTAXIQUE DE LA PONCTUATION
   ---------------------------------------------------------------------------
   « Analyser le RÔLE SYNTAXIQUE des signes de ponctuation » : pas la
   respiration, pas le ton — ce que le signe fait à la construction.
   ========================================================================== */

const PONCTUATION: readonly Cas[] = [
  { gauche: "Le vent se leva ; les volets claquèrent.", droite: "il juxtapose deux propositions, sans aucun mot de liaison" },
  { gauche: "Une seule chose l'inquiétait : la nuit tombait.", droite: "il annonce ce qui suit — explication, cause ou conséquence" },
  { gauche: "Ce matin-là, la mer était plate.", droite: "elle détache un complément placé en tête, avant le sujet" },
  { gauche: "Mon oncle, qui vivait à Cilaos, ne descendait jamais.", droite: "elles encadrent un groupe qu'on pourrait retirer sans dommage" },
  { gauche: "Il rentra, il posa son sac, il s'assit.", droite: "il juxtapose deux propositions, sans aucun mot de liaison" },
  { gauche: "La réponse était simple : personne n'avait vérifié.", droite: "il annonce ce qui suit — explication, cause ou conséquence" },
  { gauche: "Dès l'aube, les pêcheurs poussaient les barques.", droite: "elle détache un complément placé en tête, avant le sujet" },
  { gauche: "Le maitre (celui de l'an dernier) est revenu.", droite: "elles encadrent un groupe qu'on pourrait retirer sans dommage" },
  { gauche: "Le jour tombait ; la mer devenait noire.", droite: "il juxtapose deux propositions, sans aucun mot de liaison" },
  { gauche: "Il ne restait qu'une solution : attendre.", droite: "il annonce ce qui suit — explication, cause ou conséquence" },
  { gauche: "Au bout du chemin, la maison apparut.", droite: "elle détache un complément placé en tête, avant le sujet" },
  { gauche: "Sa sœur — la plus jeune — avait tout deviné.", droite: "elles encadrent un groupe qu'on pourrait retirer sans dommage" },
  { gauche: "Elle appela, personne ne répondit.", droite: "il juxtapose deux propositions, sans aucun mot de liaison" },
  { gauche: "Pendant la nuit, le vent avait tout emporté.", droite: "elle détache un complément placé en tête, avant le sujet" },
];

const TOUS_ROLES: readonly string[] = [...new Set(PONCTUATION.map((p) => p.droite))];

function gabarit(
  id: string,
  microId: string,
  table: readonly Cas[],
  pool: readonly string[],
  question: string,
  difficulty: 2 | 3,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "4e",
    matiere: "francais",
    notionId: "phrase_complexe",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `« ${c.gauche} »\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, pool),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `« ${c.gauche} » → ${c.droite}.`, `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`),
      };
    },
  };
}

export const phraseComplexe4eBank: TutorBankItemV4[] = [
  gabarit(
    "4e_phrc_simple_complexe_tpl_1",
    "4e_phrc_simple_complexe",
    SIMPLE_COMPLEXE,
    TOUTES_SORTES,
    "Quelle sorte de phrase est-ce ?",
    2,
    "Compte les VERBES CONJUGUÉS, pas les virgules ni les mots.",
    "Une phrase se classe sur le nombre de verbes conjugués : un seul, elle est simple ; deux ou plus, elle est complexe et compte autant de propositions ; aucun, elle est non verbale.",
    "Souligne chaque verbe conjugué. Les verbes à l'infinitif et les participes ne comptent pas. Une phrase longue avec un seul verbe reste simple.",
    ["4e", "phrase-complexe", "simple-complexe", "template"],
  ),
  gabarit(
    "4e_phrc_juxta_coord_sub_tpl_1",
    "4e_phrc_juxta_coord_sub",
    LIENS,
    TOUS_LIENS,
    "Comment les propositions sont-elles reliées ?",
    3,
    "« quand » et « parce que » ne coordonnent pas : ils subordonnent.",
    "Deux propositions se relient de trois façons : par un simple signe de ponctuation — la juxtaposition ; par un mot qui les met à égalité — la coordination ; ou par un mot qui met l'une sous l'autre — la subordination.",
    "Essaie de supprimer la seconde proposition. Si la première tient toute seule et que le mot de liaison part avec, c'est une subordonnée. Les coordonnants sont peu nombreux : mais, ou, et, donc, or, ni, car.",
    ["4e", "phrase-complexe", "juxtaposition", "coordination", "subordination", "template"],
  ),
  gabarit(
    "4e_phrc_subordonnees_tpl_1",
    "4e_phrc_subordonnees",
    SUBORDONNEES,
    TOUTES_SUB,
    "Quelle sorte de subordonnée est entre crochets ?",
    3,
    "Regarde par quoi elle commence, et à quel mode est son verbe.",
    "Le programme en nomme cinq : la conjonctive (introduite par « que »), l'interrogative indirecte (qui pose une question sans point d'interrogation), la relative (introduite par un pronom relatif et accrochée à un nom), l'infinitive (verbe à l'infinitif, sujet propre) et la participiale (verbe au participe, sujet propre).",
    "Deux indices suffisent presque toujours : le mot qui l'introduit, et le mode de son verbe. Si son verbe n'est ni à l'infinitif ni au participe, cherche le mot subordonnant.",
    ["4e", "phrase-complexe", "subordonnees", "template"],
  ),
  gabarit(
    "4e_phrc_fonction_subordonnee_tpl_1",
    "4e_phrc_fonction_subordonnee",
    FONCTIONS,
    TOUTES_FONCTIONS,
    "Quelle est la fonction de la subordonnée entre crochets ?",
    3,
    "Remplace la subordonnée par un groupe nominal : sa fonction apparait.",
    "Une subordonnée occupe dans la phrase une place que pourrait tenir un groupe nominal. Elle a donc une fonction, comme lui : complément d'objet, complément circonstanciel, ou complément d'un nom.",
    "Remplace-la par « cela », par « à ce moment-là », ou par un adjectif. Ce qui marche te donne la fonction.",
    ["4e", "phrase-complexe", "fonction", "template"],
  ),
  gabarit(
    "4e_phrc_pronom_relatif_tpl_1",
    "4e_phrc_pronom_relatif",
    RELATIFS,
    TOUTES_RELATIF,
    "Quelle est la fonction du pronom relatif DANS la subordonnée ?",
    3,
    "La fonction du pronom, pas celle de son antécédent dans la phrase.",
    "Le pronom relatif remplace son antécédent à l'intérieur de la subordonnée, et il y occupe une fonction propre — sujet, complément d'objet, complément circonstanciel. Cette fonction n'a rien à voir avec celle de l'antécédent dans la phrase principale.",
    "Récris la subordonnée seule, en remettant l'antécédent à la place du pronom : « le livre que tu m'as prêté » devient « tu m'as prêté le livre » — le livre y est complément d'objet direct.",
    ["4e", "phrase-complexe", "pronom-relatif", "template"],
  ),
  gabarit(
    "4e_phrc_ponctuation_tpl_1",
    "4e_phrc_ponctuation",
    PONCTUATION,
    TOUS_ROLES,
    "Quel est le rôle syntaxique du signe de ponctuation ?",
    3,
    "Ce que le signe fait à la CONSTRUCTION, pas à la respiration.",
    "La ponctuation a un rôle syntaxique : le point-virgule et la virgule juxtaposent, les deux-points annoncent, la virgule détache un complément déplacé, les parenthèses et les tirets encadrent un groupe qu'on pourrait retirer.",
    "Essaie de supprimer ce que le signe encadre, ou de remplacer le signe par un mot de liaison. Ce qui reste possible dit son rôle.",
    ["4e", "phrase-complexe", "ponctuation", "template"],
  ),
];
