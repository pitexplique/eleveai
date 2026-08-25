// lib/tutor-v4/questionBank/3e/francais/socle-lexique-discours.bank.ts
//
// DES GÉNÉRATEURS POUR LE SOCLE — lexique et discours, huit micros.
// Écrit le 25/08/2026, en même temps que `socle-grammaire-conjugaison.bank.ts`.
//
// ⛔⛔ POURQUOI. Frédéric, le 25/08 : « IL FAUT DES GÉNÉRATEURS. Un élève doit
// pouvoir rester sans les mêmes questions pendant des minutes. » Ces huit micros
// passaient `verifier-variete.mjs` — parce qu'il additionne le fixe et le généré
// — en ne vivant réellement que de six à neuf énoncés :
//
//     3e_voc_reemploi            6 générés  ·  7 fixes
//     3e_discours_rapportees     6 générés  ·  7 fixes
//     3e_voc_contexte            7 générés  ·  8 fixes
//     3e_discours_registres      7 générés  ·  8 fixes
//     3e_discours_argumentatif   7 générés  ·  8 fixes
//     3e_voc_formation           8 générés  ·  7 fixes
//     3e_voc_orthographe         8 générés  ·  7 fixes
//     3e_voc_relations           9 générés  ·  7 fixes
//
// ⭐ Un `fixed` compte pour UNE question et ne se renouvelle jamais : la couche
// figée masquait le vide au lieu de le combler.
//
// ⛔ CE QUE CHAQUE TABLE NE REDIT PAS. Les huit tables sont neuves, et elles
// évitent aussi les banques de 3e déjà écrites : `vocabulaire.bank.ts` tient les
// modalisateurs, la nominalisation, le sens figuré, les connecteurs et
// l'histoire des mots ; `argumentation-presse.bank.ts` tient la thèse, les
// procédés pour convaincre et persuader, la titraille et l'image ;
// `ecriture-oral.bank.ts` tient les sophismes du débat.
//
// ⛔⛔ LA BONNE RÉPONSE NE DOIT PAS ÊTRE LA PLUS LONGUE : contrôle par
// `verifier-devinabilite-runtime.ts`, qui mesure l'écart avec le PLUS LONG
// LEURRE — pas l'étendue du pool.
//
// ⭐ DEUX, TROIS OU QUATRE PROPOSITIONS, quatre au maximum (Frédéric, 25/08).
//
// ⚠️ ORTHOGRAPHE : accents partout, majuscules comprises ; apostrophe droite
// (U+0027) ; rectifications de 1990 — « connaitre », « parait », « cout ».

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

/** Deux, trois ou quatre lignes — jamais plus, et jamais toujours la même. */
const TAILLES: readonly number[] = [2, 3, 3, 4, 4, 4];

function makeChoices(correct: string, wrongs: readonly string[]) {
  const taille = randomChoice(TAILLES);
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, taille - 1);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Cas = { readonly gauche: string; readonly droite: string };
type CasSeul = { readonly gauche: string; readonly droite: string; readonly leurres: readonly string[] };

/* =============================================================================
   1. LE MOT DEVINÉ PAR SA PHRASE               → 3e_voc_contexte
   ---------------------------------------------------------------------------
   « Inférer le sens d'un mot par le contexte. » Les sept énoncés générés
   portaient sur des mots courants (« limpide », « compacte », « serpentait »).
   Les mots retenus ici sont ceux des quatre questionnements de 3e — juger,
   dénoncer, s'engager —, et chaque phrase porte l'indice qui permet de trancher.
   ⭐ LE POOL EST FAIT DES QUINZE DÉFINITIONS ELLES-MÊMES : chaque leurre est la
   bonne réponse d'un autre mot. Il est donc toujours plausible, jamais absurde,
   et leurs longueurs se tiennent d'elles-mêmes.
   ========================================================================== */

const CONTEXTE: readonly Cas[] = [
  { gauche: "« Son ton péremptoire n'admettait pas la réplique. »\n\n« Péremptoire » veut dire :", droite: "qui tranche et n'attend plus aucune réponse" },
  { gauche: "« L'assemblée resta pusillanime devant la menace. »\n\n« Pusillanime » veut dire :", droite: "qui manque de courage en face du moindre risque" },
  { gauche: "« Il tint sur la direction des propos acerbes. »\n\n« Acerbe » veut dire :", droite: "d'une dureté qui blesse en très peu de mots" },
  { gauche: "« Ses arguments spécieux séduisirent la salle entière. »\n\n« Spécieux » veut dire :", droite: "qui parait juste sans l'être le moins du monde" },
  { gauche: "« Il déplora l'apathie générale de ses concitoyens. »\n\n« Apathie » veut dire :", droite: "l'absence complète de la moindre des réactions" },
  { gauche: "« Sa probité n'avait jamais été mise en doute. »\n\n« Probité » veut dire :", droite: "l'honnêteté qui ne transige jamais sur rien" },
  { gauche: "« L'orateur prit un ton sentencieux et un peu pesant. »\n\n« Sentencieux » veut dire :", droite: "qui parle comme s'il donnait toujours des leçons" },
  { gauche: "« La mesure fut jugée inique par tous les juristes. »\n\n« Inique » veut dire :", droite: "d'une injustice qui saute aux yeux de chacun" },
  { gauche: "« Il feignit une contrition qu'il n'éprouvait pas. »\n\n« Contrition » veut dire :", droite: "le regret bien sincère d'avoir vraiment mal agi" },
  { gauche: "« Ses adversaires le taxèrent de duplicité. »\n\n« Duplicité » veut dire :", droite: "le fait de jouer sur deux tableaux à la fois" },
  { gauche: "« Le texte est d'une concision remarquable. »\n\n« Concision » veut dire :", droite: "la façon de tout dire en vraiment peu de mots" },
  { gauche: "« Une clameur indignée monta de la foule. »\n\n« Clameur » veut dire :", droite: "un très grand cri poussé par toute une foule" },
  { gauche: "« Il rappela l'iniquité de cette loi avec véhémence. »\n\n« Véhémence » veut dire :", droite: "une force qui emporte tout à fait celui qui parle" },
  { gauche: "« Son récit était lacunaire : des années manquaient. »\n\n« Lacunaire » veut dire :", droite: "où il manque des morceaux tout à fait entiers" },
  { gauche: "« La foule, d'abord houleuse, finit par se disperser. »\n\n« Houleuse » veut dire :", droite: "une agitation qui menace de très mal tourner" },
];

const TOUS_CONTEXTES: readonly string[] = [...new Set(CONTEXTE.map((c) => c.droite))];

/* =============================================================================
   2. CE QUI RELIE DEUX MOTS                    → 3e_voc_relations
   ---------------------------------------------------------------------------
   « Identifier synonymie, antonymie, champ lexical et famille. » Les neuf
   énoncés générés demandaient un synonyme (« Quel est un synonyme de peur ? »).
   On demande ici de NOMMER LA RELATION, ce qui suppose de les distinguer toutes
   — et c'est là que les élèves confondent famille et champ lexical.
   ⭐ Une réponse dit qu'IL N'Y A PAS DE RELATION : « dent » et « dentelle » se
   ressemblent et n'ont rien en commun. Sans ce cas, l'élève apprend qu'une
   ressemblance de forme est toujours une parenté, ce qui est faux.
   ========================================================================== */

const RELATIONS: readonly Cas[] = [
  { gauche: "« véhément » et « virulent »", droite: "des synonymes : ils peuvent se remplacer dans la phrase" },
  { gauche: "« probité » et « honnêteté »", droite: "des synonymes : ils peuvent se remplacer dans la phrase" },
  { gauche: "« réfuter » et « démentir »", droite: "des synonymes : ils peuvent se remplacer dans la phrase" },
  { gauche: "« équitable » et « inique »", droite: "des antonymes : l'un dit exactement le contraire de l'autre" },
  { gauche: "« aveu » et « dénégation »", droite: "des antonymes : l'un dit exactement le contraire de l'autre" },
  { gauche: "« concision » et « verbiage »", droite: "des antonymes : l'un dit exactement le contraire de l'autre" },
  { gauche: "« verdict », « audience », « plaidoirie »", droite: "un même champ lexical : un seul domaine, sans se remplacer" },
  { gauche: "« tranchée », « obus », « permission »", droite: "un même champ lexical : un seul domaine, sans se remplacer" },
  { gauche: "« pétition », « tract », « banderole »", droite: "un même champ lexical : un seul domaine, sans se remplacer" },
  { gauche: "« juste », « justice », « injustement »", droite: "une même famille : ils sont tous bâtis sur le même radical" },
  { gauche: "« croire », « croyance », « incroyable »", droite: "une même famille : ils sont tous bâtis sur le même radical" },
  { gauche: "« terre », « enterrer », « souterrain »", droite: "une même famille : ils sont tous bâtis sur le même radical" },
  { gauche: "« dent » et « dentelle »", droite: "aucune relation : la ressemblance s'arrête à la seule forme" },
  { gauche: "« voler » (un objet) et « volume »", droite: "aucune relation : la ressemblance s'arrête à la seule forme" },
  { gauche: "« pain » et « pinède »", droite: "aucune relation : la ressemblance s'arrête à la seule forme" },
];

const TOUTES_RELATIONS: readonly string[] = [...new Set(RELATIONS.map((c) => c.droite))];

/* =============================================================================
   3. COMMENT LE MOT A ÉTÉ FABRIQUÉ             → 3e_voc_formation
   ---------------------------------------------------------------------------
   « Comprendre la formation des mots. » Les huit énoncés générés, comme les
   sept questions figées, demandaient le SENS d'un affixe (« que marque le
   préfixe pré- ? »). On demande ici le PROCÉDÉ : c'est ce qui permet de
   comprendre un mot qu'on n'a jamais lu, et le programme le nomme ainsi.
   ⛔ L'histoire des mots — emprunts anciens, évolutions de sens — est dans
   `vocabulaire.bank.ts`, micro `3e_voc_histoire_mots`. Ici, la fabrique.
   ========================================================================== */

const FORMATION: readonly Cas[] = [
  { gauche: "« désengager », à partir de « engager »", droite: "une dérivation par préfixe : la classe du mot ne change pas" },
  { gauche: "« antiesclavagiste », à partir de « esclavagiste »", droite: "une dérivation par préfixe : la classe du mot ne change pas" },
  { gauche: "« relire », à partir de « lire »", droite: "une dérivation par préfixe : la classe du mot ne change pas" },
  { gauche: "« dénonciation », à partir de « dénoncer »", droite: "une dérivation par suffixe : le mot change souvent de classe" },
  { gauche: "« courageusement », à partir de « courageux »", droite: "une dérivation par suffixe : le mot change souvent de classe" },
  { gauche: "« fiabilité », à partir de « fiable »", droite: "une dérivation par suffixe : le mot change souvent de classe" },
  { gauche: "« porte-parole »", droite: "un mot composé : deux mots entiers tiennent ensemble, soudés" },
  { gauche: "« sans-abri »", droite: "un mot composé : deux mots entiers tiennent ensemble, soudés" },
  { gauche: "« libre-échange »", droite: "un mot composé : deux mots entiers tiennent ensemble, soudés" },
  { gauche: "« un scanner », venu de l'anglais", droite: "un emprunt : le mot vient d'une autre langue presque tel quel" },
  { gauche: "« un algorithme », venu de l'arabe", droite: "un emprunt : le mot vient d'une autre langue presque tel quel" },
  { gauche: "« un bungalow », venu de l'hindi", droite: "un emprunt : le mot vient d'une autre langue presque tel quel" },
  { gauche: "« covoiturage », de « collectif » et « voiturage »", droite: "un mot-valise : deux mots coupés, puis recollés en un seul" },
  { gauche: "« courriel », de « courrier » et « électronique »", droite: "un mot-valise : deux mots coupés, puis recollés en un seul" },
  { gauche: "« franglais », de « français » et « anglais »", droite: "un mot-valise : deux mots coupés, puis recollés en un seul" },
];

const TOUTES_FORMATIONS: readonly string[] = [...new Set(FORMATION.map((c) => c.droite))];

/* =============================================================================
   4. LE MOT PRÉCIS À LA PLACE DU MOT VAGUE     → 3e_voc_reemploi
   ---------------------------------------------------------------------------
   « Réemployer un lexique précis à l'écrit ou à l'oral. » Les six énoncés
   générés vérifiaient qu'une phrase employait BIEN un mot donné. On fait ici
   l'inverse, et c'est le geste de celui qui écrit : partir de ce qu'on veut
   dire, et trouver le mot qui le dit exactement.
   ⛔ Les mots retenus sont ceux de l'argumentation, parce que c'est là que la
   3e écrit — et parce que « dénoncer », « déplorer », « concéder » et
   « réfuter » sont précisément ceux que les copies confondent.
   ========================================================================== */

const REEMPLOI: readonly Cas[] = [
  { gauche: "Tu veux dire qu'un auteur rend publique une injustice pour qu'elle cesse.", droite: "dénoncer : rendre publique une injustice pour la faire cesser" },
  { gauche: "Tu veux dire que le texte met au jour un scandale que l'on cachait.", droite: "dénoncer : rendre publique une injustice pour la faire cesser" },
  { gauche: "Tu veux dire qu'il regrette un fait qu'il ne peut pas changer.", droite: "déplorer : dire son regret d'un fait qu'on ne peut changer" },
  { gauche: "Tu veux dire qu'il constate une perte avec tristesse, et sans accuser.", droite: "déplorer : dire son regret d'un fait qu'on ne peut changer" },
  { gauche: "Tu veux dire qu'il montre par des raisons qu'une thèse est fausse.", droite: "réfuter : montrer par des raisons qu'une thèse est bien fausse" },
  { gauche: "Tu veux dire qu'il démonte l'argument adverse point par point.", droite: "réfuter : montrer par des raisons qu'une thèse est bien fausse" },
  { gauche: "Tu veux dire qu'il accorde un point à l'adversaire avant de reprendre.", droite: "concéder : accorder un point à l'adversaire avant de reprendre" },
  { gauche: "Tu veux dire qu'il reconnait une part de vérité chez celui qu'il combat.", droite: "concéder : accorder un point à l'adversaire avant de reprendre" },
  { gauche: "Tu veux dire qu'il atténue une affirmation trop tranchée.", droite: "nuancer : atténuer une affirmation qui serait trop tranchée" },
  { gauche: "Tu veux dire qu'il ajoute un « mais » qui empêche de généraliser.", droite: "nuancer : atténuer une affirmation qui serait trop tranchée" },
  { gauche: "Tu veux dire qu'il désigne quelqu'un publiquement comme coupable.", droite: "stigmatiser : désigner publiquement comme honteux ou coupable" },
  { gauche: "Tu veux dire que le texte marque un groupe entier d'un signe infamant.", droite: "stigmatiser : désigner publiquement comme honteux ou coupable" },
  { gauche: "Tu veux dire qu'il appuie sa thèse d'un fait qu'on peut contrôler.", droite: "étayer : appuyer une thèse sur un fait qu'on peut vérifier" },
  { gauche: "Tu veux dire qu'il ajoute enfin les preuves qui manquaient.", droite: "étayer : appuyer une thèse sur un fait qu'on peut vérifier" },
  { gauche: "Tu veux dire qu'il proteste avec force contre une décision injuste.", droite: "s'insurger : protester avec force contre ce qu'on juge injuste" },
];

const TOUS_REEMPLOIS: readonly string[] = [...new Set(REEMPLOI.map((c) => c.droite))];

/* =============================================================================
   5. LA GRAPHIE QUI SE DÉCIDE AU SENS          → 3e_voc_orthographe
   ---------------------------------------------------------------------------
   « Écrire avec justesse les mots étudiés. »
   ⚠️⚠️ LEURRES PROPRES À CHAQUE CAS (`CasSeul`) : la graphie fautive d'un autre
   mot ne piège personne. Chaque cas porte donc ses trois concurrentes, de
   longueur voisine — c'est ce qui garde la bonne réponse indevinable.
   ⛔ Les homophones GRAMMATICAUX (a/à, ou/où, ce/se) sont dans
   `orthographe-grammaticale.bank.ts`, micro `3e_orth_homophones`. Ici, ce sont
   les homophones LEXICAUX et les mots que la 3e écrit de travers.

   ⛔⛔ LES LEURRES SONT DES FAUTES, ET C'EST VOULU. C'est le seul endroit des
   banques de français où l'on écrit exprès « necessaire », « devouement »,
   « dilemne » ou « ocasion ». Le contrôle d'accents (`accents2.py`, écrit le
   25/08) les signale comme suspects, et il a raison de le faire : NE PAS LES
   CORRIGER. Un pool d'orthographe dont les leurres sont bien écrits n'interroge
   plus rien. Seule la ligne `droite` doit être juste.
   ========================================================================== */

const ORTHOGRAPHE: readonly CasSeul[] = [
  { gauche: "« Il travaille ___ que l'an dernier. »", droite: "davantage", leurres: ["d'avantage", "d'avantages", "davantages"] },
  { gauche: "« Il n'est pas ___ ignorer la loi. »", droite: "censé", leurres: ["sensé", "sencé", "sansé"] },
  { gauche: "« J'ai relu le texte deux, ___ trois fois. »", droite: "voire", leurres: ["voir", "vois", "voit"] },
  { gauche: "« ___ à moi, je préfère m'abstenir. »", droite: "Quant", leurres: ["Quand", "Qu'en", "Quantt"] },
  { gauche: "« Il est arrivé ___ que prévu. »", droite: "plus tôt", leurres: ["plutôt", "plustôt", "plus tot"] },
  { gauche: "« Le mur ___ sous les coups de bélier. »", droite: "résonnait", leurres: ["raisonnait", "résonait", "raisonait"] },
  { gauche: "« Ses ___ scolaires sont solides. »", droite: "acquis", leurres: ["acquits", "aquis", "acquies"] },
  { gauche: "« Le choix est un véritable ___ . »", droite: "dilemme", leurres: ["dilemne", "dilème", "dillemme"] },
  { gauche: "« En l'___ , la loi est parfaitement claire. »", droite: "occurrence", leurres: ["occurence", "ocurrence", "occurrance"] },
  { gauche: "« Le ___ du projet a pris du retard. »", droite: "développement", leurres: ["dévelopement", "dévellopement", "développemment"] },
  { gauche: "« Il a tranché ___ de toute pression. »", droite: "indépendamment", leurres: ["indépendament", "indépendemment", "indépandamment"] },
  { gauche: "« C'est une ___ à ne pas manquer. »", droite: "occasion", leurres: ["ocasion", "occassion", "occazion"] },
  { gauche: "« Il a fait preuve d'un grand ___ . »", droite: "dévouement", leurres: ["dévoument", "devouement", "dévouemment"] },
  { gauche: "« Cette précaution est ___ à la sécurité. »", droite: "nécessaire", leurres: ["necessaire", "néccessaire", "nécéssaire"] },
  { gauche: "« Il a jugé l'affaire avec ___ . »", droite: "discernement", leurres: ["discernemment", "dicernement", "discernnement"] },
];

/* =============================================================================
   6. CE QUE LE REGISTRE FAIT                   → 3e_discours_registres
   ---------------------------------------------------------------------------
   « Identifier ET AJUSTER les registres de langue. » Les sept énoncés générés
   demandaient de NOMMER le registre d'une phrase (« Salut, ça roule ? »
   appartient au registre…), ce qui se fait dès la 5e. L'attendu de fin de cycle
   est le second verbe : AJUSTER, donc savoir ce que le choix produit.
   ⭐ LES DEUX DERNIÈRES RÉPONSES SONT LE CŒUR DE LA 3e : un mélange de
   registres peut être voulu — il fait alors l'ironie — ou subi, et c'est la
   faute la plus fréquente des copies de brevet. Nommer la différence, c'est
   apprendre à se relire.
   ========================================================================== */

const REGISTRES: readonly Cas[] = [
  { gauche: "Dans un devoir, tu écris : « Ce personnage est vraiment sympa. »", droite: "un registre familier déplacé : il décrédibilise toute la copie" },
  { gauche: "Dans une copie, tu écris : « L'auteur se fout du lecteur. »", droite: "un registre familier déplacé : il décrédibilise toute la copie" },
  { gauche: "Tu rends un devoir où l'on lit : « C'est un truc bizarre. »", droite: "un registre familier déplacé : il décrédibilise toute la copie" },
  { gauche: "Tu écris : « L'auteur critique la société de son temps. »", droite: "un registre courant : il passe partout et ne se remarque pas" },
  { gauche: "Tu écris : « Le narrateur ne dit pas tout au lecteur. »", droite: "un registre courant : il passe partout et ne se remarque pas" },
  { gauche: "Tu écris : « Cette scène montre la peur du personnage. »", droite: "un registre courant : il passe partout et ne se remarque pas" },
  { gauche: "Une lettre s'achève sur « Veuillez agréer mes respectueuses salutations ».", droite: "un registre soutenu : il tient à distance et marque le respect" },
  { gauche: "Un texte écrit : « Nul n'ignore que cette mesure fut contestée. »", droite: "un registre soutenu : il tient à distance et marque le respect" },
  { gauche: "Un orateur commence par « Il m'échoit de vous entretenir de… ».", droite: "un registre soutenu : il tient à distance et marque le respect" },
  { gauche: "Un auteur écrit : « Sa Majesté daigna réclamer une seconde part de frites. »", droite: "un mélange voulu : c'est le décalage qui fabrique l'ironie" },
  { gauche: "Un texte parle des « augustes fainéants » qui gouvernent le pays.", droite: "un mélange voulu : c'est le décalage qui fabrique l'ironie" },
  { gauche: "Un romancier fait dire à un roi : « Bon, on fait quoi maintenant ? »", droite: "un mélange voulu : c'est le décalage qui fabrique l'ironie" },
  { gauche: "Ta copie dit : « L'auteur stigmatise ce système, c'est chaud pour eux. »", droite: "un mélange subi : la copie change de niveau sans le vouloir" },
  { gauche: "Ta copie dit : « Ce réquisitoire est super bien construit. »", droite: "un mélange subi : la copie change de niveau sans le vouloir" },
  { gauche: "Ta copie dit : « Nul ne conteste que ce mec avait raison. »", droite: "un mélange subi : la copie change de niveau sans le vouloir" },
];

const TOUS_REGISTRES: readonly string[] = [...new Set(REGISTRES.map((c) => c.droite))];

/* =============================================================================
   7. QUI PARLE, ET COMMENT ON LE SAIT          → 3e_discours_rapportees
   ---------------------------------------------------------------------------
   « Analyser et employer des paroles rapportées. » Les six énoncés générés
   opposaient direct et indirect. En 3e, ce sont les deux formes SANS MARQUE qui
   comptent : le discours indirect libre, où deux voix se superposent, et le
   discours narrativisé, où le récit dit qu'on a parlé sans donner les mots.
   ⭐ Une réponse dit qu'IL N'Y A AUCUNE PAROLE RAPPORTÉE : sans elle, l'élève
   apprend qu'une phrase de pensée est forcément du discours indirect libre, et
   il en trouve partout.
   ========================================================================== */

const RAPPORTEES: readonly Cas[] = [
  { gauche: "« Elle murmura : “Je n'ai rien vu de la soirée.” »", droite: "du discours direct : les mots exacts, que la ponctuation montre" },
  { gauche: "« — Vous mentez, dit-il sans élever la voix. »", droite: "du discours direct : les mots exacts, que la ponctuation montre" },
  { gauche: "« Le maire déclara : “Le sentier rouvrira lundi.” »", droite: "du discours direct : les mots exacts, que la ponctuation montre" },
  { gauche: "« Elle répondit qu'elle n'y croyait plus depuis longtemps. »", droite: "du discours indirect : les paroles passent dans une subordonnée" },
  { gauche: "« Il jura qu'il reviendrait dès le lendemain matin. »", droite: "du discours indirect : les paroles passent dans une subordonnée" },
  { gauche: "« On lui demanda s'il acceptait de témoigner au procès. »", droite: "du discours indirect : les paroles passent dans une subordonnée" },
  { gauche: "« Il s'arrêta net. Où allait-il donc, sans manteau, à cette heure ? »", droite: "du discours indirect libre : ni guillemets, ni subordonnée" },
  { gauche: "« Elle relut la lettre. Non, décidément, elle ne partirait pas. »", droite: "du discours indirect libre : ni guillemets, ni subordonnée" },
  { gauche: "« Il regarda le ciel. Demain, il ferait beau, il en était sûr. »", droite: "du discours indirect libre : ni guillemets, ni subordonnée" },
  { gauche: "« La direction a évoqué d'éventuelles suppressions de postes. »", droite: "du discours narrativisé : on dit qu'on a parlé, pas les mots" },
  { gauche: "« Ils discutèrent une heure durant du partage des terres. »", droite: "du discours narrativisé : on dit qu'on a parlé, pas les mots" },
  { gauche: "« Elle lui raconta longuement son voyage et ses déboires. »", droite: "du discours narrativisé : on dit qu'on a parlé, pas les mots" },
  { gauche: "« La pluie tombait sur les toits depuis le milieu de la nuit. »", droite: "aucune parole rapportée : c'est le narrateur qui parle seul" },
  { gauche: "« Le sentier montait, raide, entre deux murs de basalte. »", droite: "aucune parole rapportée : c'est le narrateur qui parle seul" },
  { gauche: "« Personne, ce soir-là, n'attendait plus rien de la réunion. »", droite: "aucune parole rapportée : c'est le narrateur qui parle seul" },
];

const TOUTES_RAPPORTEES: readonly string[] = [...new Set(RAPPORTEES.map((c) => c.droite))];

/* =============================================================================
   8. LA FIGURE QUI FAIT FORCE                  → 3e_discours_argumentatif
   ---------------------------------------------------------------------------
   « Repérer procédés du discours argumentatif. » Les sept énoncés générés
   portaient sur l'argument et les connecteurs — ce que tient déjà
   `argumentation-presse.bank.ts`. On prend ici l'angle qui manquait : les
   FIGURES par lesquelles un discours engagé prend sa force. Elles ne prouvent
   rien, et c'est justement ce qu'il faut savoir voir.
   ⛔ Les sophismes du débat — faux dilemme, pente savonneuse, homme de paille,
   preuve par l'usage — sont dans `ecriture-oral.bank.ts`, micro
   `3e_oral_argumenter`. Convaincre et persuader sont dans
   `argumentation-presse.bank.ts`.
   ========================================================================== */

const FIGURES: readonly Cas[] = [
  { gauche: "« Je vois des enfants sans école. Je vois des familles sans toit. Je vois un pays qui se tait. »", droite: "une anaphore : la même formule ouvre plusieurs phrases de suite" },
  { gauche: "« Rien pour les uns. Rien pour les autres. Rien pour personne. »", droite: "une anaphore : la même formule ouvre plusieurs phrases de suite" },
  { gauche: "« Assez de promesses, assez de rapports, assez de silence. »", droite: "une anaphore : la même formule ouvre plusieurs phrases de suite" },
  { gauche: "« On les a gênés, puis inquiétés, puis chassés, puis oubliés. »", droite: "une gradation : les termes montent en force l'un après l'autre" },
  { gauche: "« Un murmure, une rumeur, une clameur, un soulèvement. »", droite: "une gradation : les termes montent en force l'un après l'autre" },
  { gauche: "« Cela dérange, cela blesse, et pour finir cela tue. »", droite: "une gradation : les termes montent en force l'un après l'autre" },
  { gauche: "« Ici l'on décide de tout ; là-bas l'on subit tout. »", droite: "une antithèse : deux idées contraires sont mises face à face" },
  { gauche: "« Les uns votent les lois, les autres les endurent. »", droite: "une antithèse : deux idées contraires sont mises face à face" },
  { gauche: "« Beaucoup de discours, et pas la moindre décision. »", droite: "une antithèse : deux idées contraires sont mises face à face" },
  { gauche: "« Le froid, la faim, la peur, la boue, l'attente, le bruit, la nuit. »", droite: "une accumulation : les termes s'entassent pour faire le nombre" },
  { gauche: "« Rapports, commissions, groupes de travail, auditions, synthèses. »", droite: "une accumulation : les termes s'entassent pour faire le nombre" },
  { gauche: "« Il faudrait des routes, des ponts, des écoles, des médecins. »", droite: "une accumulation : les termes s'entassent pour faire le nombre" },
  { gauche: "« Je ne parlerai pas des sommes disparues, ni de qui les a prises. »", droite: "une prétérition : il annonce qu'il se taira, et parle quand même" },
  { gauche: "« Inutile de rappeler ici les promesses de l'an dernier. »", droite: "une prétérition : il annonce qu'il se taira, et parle quand même" },
  { gauche: "« Je passe sur les absences répétées, que chacun connait. »", droite: "une prétérition : il annonce qu'il se taira, et parle quand même" },
];

const TOUTES_FIGURES: readonly string[] = [...new Set(FIGURES.map((c) => c.droite))];

/* ========================================================================== */

function base(
  id: string,
  microId: string,
  notionId: string,
  difficulty: 2 | 3 | 4,
  hint: string,
  tags: readonly string[],
) {
  return {
    kind: "template" as const,
    id,
    niveau: "3e" as const,
    matiere: "francais" as const,
    notionId,
    microId,
    difficulty,
    theme: "neutral" as const,
    hint,
    tags: [...tags],
  };
}

function gabarit(
  id: string,
  microId: string,
  notionId: string,
  table: readonly Cas[],
  pool: readonly string[],
  question: string,
  difficulty: 2 | 3 | 4,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    ...base(id, microId, notionId, difficulty, hint, tags),
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.gauche}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, pool),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          definition,
          methode,
          `${c.gauche} → ${c.droite}.`,
          `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`,
        ),
      };
    },
  };
}

function gabaritSeul(
  id: string,
  microId: string,
  notionId: string,
  table: readonly CasSeul[],
  question: string,
  difficulty: 2 | 3 | 4,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    ...base(id, microId, notionId, difficulty, hint, tags),
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.gauche}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, c.leurres),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          definition,
          methode,
          `${c.gauche} → « ${c.droite} ».`,
          `La graphie correcte est « ${c.droite} ».`,
        ),
      };
    },
  };
}

export const socleLexiqueDiscours3eBank: TutorBankItemV4[] = [
  gabarit(
    "3e_voc_contexte_tpl_2",
    "3e_voc_contexte",
    "vocabulaire_sens",
    CONTEXTE,
    TOUS_CONTEXTES,
    "Que veut dire ce mot ?",
    3,
    "Tu n'as pas besoin de connaitre le mot : la phrase autour en dit assez.",
    "Inférer, c'est reconstruire un sens à partir de ce qui entoure le mot : le verbe qui le porte, ce qui le suit après les deux-points, l'opposition marquée par un « mais », ou la réaction qu'il provoque dans la phrase suivante.",
    "Remplace le mot inconnu par un blanc et relis la phrase entière. Puis demande-toi ce qui pourrait tenir dans ce blanc : il n'y a jamais beaucoup de candidats, et le contexte élimine les autres.",
    ["3e", "vocabulaire", "contexte", "template"],
  ),
  gabarit(
    "3e_voc_relations_tpl_2",
    "3e_voc_relations",
    "vocabulaire_sens",
    RELATIONS,
    TOUTES_RELATIONS,
    "Quelle relation relie ces mots ?",
    3,
    "Famille et champ lexical se confondent tout le temps : l'une est de forme, l'autre de sens.",
    "Deux mots peuvent se remplacer (synonymes), se contredire (antonymes), servir le même domaine sans se remplacer (champ lexical), ou partager un radical (famille). Et parfois ils se ressemblent sans aucun rapport : la forme ment.",
    "Fais le test du remplacement : si l'un peut prendre la place de l'autre dans la phrase, c'est un synonyme. Sinon, cherche le radical commun ; s'il n'y en a pas, c'est un champ lexical — ou rien du tout.",
    ["3e", "vocabulaire", "relations", "template"],
  ),
  gabarit(
    "3e_voc_formation_tpl_2",
    "3e_voc_formation",
    "vocabulaire_formation",
    FORMATION,
    TOUTES_FORMATIONS,
    "Comment ce mot a-t-il été fabriqué ?",
    2,
    "Essaie de couper le mot en morceaux. Ce que tu obtiens dit comment il a été fait.",
    "Un mot se fabrique de cinq façons : par préfixe, qui change le sens sans changer la classe ; par suffixe, qui change souvent la classe ; par composition, où deux mots entiers tiennent ensemble ; par emprunt à une autre langue ; ou par mot-valise, où deux mots coupés sont recollés.",
    "Coupe le mot et regarde les morceaux. S'ils sont deux mots entiers, c'est un composé ; si l'un des deux est tronqué, c'est un mot-valise ; si le morceau ajouté est devant, c'est un préfixe ; derrière, un suffixe.",
    ["3e", "vocabulaire", "formation", "template"],
  ),
  gabarit(
    "3e_voc_reemploi_tpl_2",
    "3e_voc_reemploi",
    "vocabulaire_orthographe",
    REEMPLOI,
    TOUS_REEMPLOIS,
    "Quel verbe dit cela exactement ?",
    3,
    "« Critiquer » et « parler de » ne disent rien. Cherche le verbe qui dit tout seul ce que tu veux dire.",
    "Réemployer un lexique précis, c'est remplacer une périphrase par le mot qui la contient. Dénoncer, déplorer, réfuter, concéder, nuancer, stigmatiser, étayer et s'insurger disent chacun une chose que les autres ne disent pas.",
    "Écris d'abord ta phrase avec tes mots à toi, même longue. Puis demande-toi s'il existe UN verbe qui dit tout cela. C'est ainsi qu'un lexique précis entre dans une copie — jamais en le plaquant à l'avance.",
    ["3e", "vocabulaire", "reemploi", "template"],
  ),
  gabaritSeul(
    "3e_voc_orthographe_tpl_2",
    "3e_voc_orthographe",
    "vocabulaire_orthographe",
    ORTHOGRAPHE,
    "Quelle graphie convient ?",
    3,
    "Demande-toi ce que le mot VEUT DIRE ici : la graphie suit le sens.",
    "Certaines graphies ne se retiennent pas, elles se raisonnent. « Censé » veut dire supposé, « sensé » veut dire raisonnable ; « plus tôt » s'oppose à « plus tard », « plutôt » veut dire de préférence ; « voire » veut dire et même. D'autres mots se retiennent par leur famille : « occurrence » double le r comme « courir ».",
    "Remplace le mot par sa définition dans la phrase. Si « supposé » convient, c'est « censé » ; si « plus tard » s'oppose, c'est « plus tôt ». Le sens tranche mieux que la mémoire.",
    ["3e", "vocabulaire", "orthographe", "template"],
  ),
  gabarit(
    "3e_discours_registres_tpl_2",
    "3e_discours_registres",
    "analyse_discours",
    REGISTRES,
    TOUS_REGISTRES,
    "Que produit ce choix de registre ?",
    3,
    "Un mélange de registres est soit une arme, soit une faute. Rien entre les deux.",
    "Le registre se choisit selon la situation. Le familier déplacé décrédibilise une copie ; le courant ne se remarque pas ; le soutenu marque la distance. Et le mélange fait l'ironie quand il est voulu, la faute quand il ne l'est pas.",
    "Relis-toi en te demandant : cette phrase, l'écrirais-tu à un adulte que tu ne connais pas ? Si non, elle n'a rien à faire dans une copie — sauf si tu l'as mise là exprès, et alors tu dois pouvoir dire pourquoi.",
    ["3e", "discours", "registres", "template"],
  ),
  gabarit(
    "3e_discours_rapportees_tpl_2",
    "3e_discours_rapportees",
    "analyse_discours",
    RAPPORTEES,
    TOUTES_RAPPORTEES,
    "Comment les paroles sont-elles rapportées ?",
    3,
    "Cherche les marques : guillemets, tiret, « que ». Puis demande-toi ce qui reste quand il n'y en a aucune.",
    "Quatre façons de rapporter, et une de ne pas le faire. Le discours direct garde les mots exacts et les marque ; l'indirect les fait passer dans une subordonnée ; l'indirect libre supprime les deux et superpose la voix du personnage à celle du narrateur ; le narrativisé dit qu'on a parlé, sans les mots.",
    "Regarde d'abord la ponctuation, puis le « que ». S'il n'y a ni l'un ni l'autre, demande-toi si la phrase pourrait être PENSÉE par le personnage : si oui, c'est de l'indirect libre ; si non, c'est le narrateur seul.",
    ["3e", "discours", "paroles-rapportees", "template"],
  ),
  gabarit(
    "3e_discours_argumentatif_tpl_2",
    "3e_discours_argumentatif",
    "analyse_discours",
    FIGURES,
    TOUTES_FIGURES,
    "Quelle figure ce passage emploie-t-il ?",
    4,
    "Aucune de ces figures ne prouve quoi que ce soit. Elles font entendre, c'est tout.",
    "Un discours engagé prend sa force par des figures. L'anaphore répète en tête de phrase ; la gradation fait monter les termes ; l'antithèse oppose deux idées face à face ; l'accumulation entasse pour faire nombre ; la prétérition annonce qu'elle se taira et parle quand même.",
    "Regarde la place des mots avant leur sens : ce qui revient au même endroit, ce qui monte, ce qui s'oppose, ce qui s'entasse. La figure se voit dans la forme, et c'est pour cela qu'elle s'entend à l'oral.",
    ["3e", "discours", "figures", "argumentation", "template"],
  ),
];
