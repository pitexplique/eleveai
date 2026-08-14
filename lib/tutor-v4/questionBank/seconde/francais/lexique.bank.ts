// lib/tutor-v4/questionBank/seconde/francais/lexique.bank.ts
//
// LE LEXIQUE EN SECONDE — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de seconde générale et technologique, arrêté du
// 17 janvier 2019 modifié par le JORF du 8 octobre 2020. « Lexique (CLASSES DE
// SECONDE ET PREMIÈRE) : […] le rappel des modes de néologie (dérivation,
// composition, emprunt, etc.) ou des relations lexicales (synonymie, antonymie,
// hyperonymie, etc.) peut guider ou éclairer ponctuellement l'exploration du
// lexique, celle-ci doit aussi se déployer au gré des rencontres avec les
// textes, HORS DU CADRE RIGIDE D'EXERCICES MÉCANIQUES. »
//
// Et au I : « un travail qui permet à l'élève d'enrichir son lexique, de
// structurer sa pensée PAR LE MOT LE PLUS JUSTE, de percevoir LA NUANCE d'une
// formule chez un auteur, d'en proposer une reformulation. »
//
// ⭐ D'où le parti pris : jamais « que veut dire ce mot ? » tout seul. Toujours
// un mot DANS une phrase, et la question porte sur ce qui se perdrait en le
// remplaçant. C'est la nuance qu'on travaille, pas le vocabulaire.
//
// ⛔ QCM, QUATRE propositions. ⛔ Aucune ligne morte : chaque ligne d'un pool
// est correcte quelque part — mesuré.
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

type Sens = { readonly mot: string; readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Formation = { readonly mot: string; readonly rep: string; readonly raison: string };
type Generique = { readonly liste: string; readonly bonne: string; readonly faux: readonly string[] };
type Nuance = { readonly phrase: string; readonly mot: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Contraire = { readonly mot: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Registre = { readonly contexte: string; readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* =============================================================================
   1. LIRE UN MOT CONSTRUIT  (2de_lex_derivation)
   ---------------------------------------------------------------------------
   Un mot construit se démonte : préfixe, radical, suffixe. Les quatre réponses
   proposent chaque fois des lectures voisines, dont une seule respecte à la
   fois le préfixe ET le suffixe.
   ========================================================================== */

const SENS_CONSTRUITS: readonly Sens[] = [
  { mot: "inaltérable", phrase: "Une amitié inaltérable les liait depuis l'enfance.", bonne: "que rien ne peut abimer", faux: ["qui s'abime peu à peu", "qu'on vient d'abimer", "qu'il faut protéger de l'usure"], raison: "in- nie, -able dit la possibilité : ce qui ne PEUT PAS être altéré" },
  { mot: "irréductible", phrase: "Il opposa une résistance irréductible.", bonne: "qu'on ne peut pas faire céder", faux: ["qu'on a fini par faire céder", "qui cède au moindre effort", "qui se réduit d'elle-même"], raison: "ir- nie, -ible dit la possibilité : ce qui ne peut être réduit" },
  { mot: "imprévisible", phrase: "Le temps y est imprévisible d'une heure à l'autre.", bonne: "qu'on ne peut pas annoncer à l'avance", faux: ["qu'on a annoncé à l'avance", "qui se répète toujours pareil", "qu'on aurait dû prévoir"], raison: "im- nie, -ible dit la possibilité : ce qui ne peut être prévu" },
  { mot: "malveillant", phrase: "Un silence malveillant accueillit sa réponse.", bonne: "qui veut du mal", faux: ["qui veut du bien", "qui ne veut rien de particulier", "qui a subi du mal"], raison: "mal- porte l'intention mauvaise, et le radical vient de vouloir" },
  { mot: "bienveillant", phrase: "Elle lui adressa un regard bienveillant.", bonne: "qui veut du bien", faux: ["qui veut du mal", "qui reste indifférent", "qui a reçu du bien"], raison: "bien- porte l'intention favorable, et le radical vient de vouloir" },
  { mot: "antidater", phrase: "Il a été accusé d'avoir antidaté le document.", bonne: "lui donner une date plus ancienne que la vraie", faux: ["lui donner une date plus récente que la vraie", "effacer entièrement la date", "vérifier la date d'un document"], raison: "anti- vaut ici « avant » : on place la date en amont de la vérité" },
  { mot: "transposer", phrase: "Il a transposé la scène dans le monde d'aujourd'hui.", bonne: "faire passer d'un cadre à un autre", faux: ["reproduire à l'identique", "supprimer ce qui gêne", "traduire mot à mot"], raison: "trans- dit le passage d'un côté à l'autre" },
  { mot: "indéfectible", phrase: "Il lui garda un soutien indéfectible.", bonne: "qui ne peut pas faire défaut", faux: ["qui fait souvent défaut", "qui a fini par faire défaut", "qu'il faut sans cesse renouveler"], raison: "in- nie, et le radical vient de « faire défaut »" },
  { mot: "insoupçonnable", phrase: "Sa probité était insoupçonnable.", bonne: "qu'on ne peut pas soupçonner", faux: ["qu'on soupçonne déjà", "qu'on a soupçonné à tort", "qui éveille naturellement les soupçons"], raison: "in- nie, -able dit la possibilité" },
  { mot: "démystifier", phrase: "L'enquête a démystifié cette légende.", bonne: "défaire ce qu'une croyance avait construit", faux: ["renforcer une croyance ancienne", "inventer une croyance nouvelle", "raconter une légende"], raison: "dé- défait l'action que porte le radical" },
  { mot: "reconsidérer", phrase: "Le jury a dû reconsidérer sa décision.", bonne: "examiner de nouveau", faux: ["examiner pour la première fois", "refuser d'examiner", "confirmer sans réexaminer"], raison: "re- dit la répétition de l'action" },
  { mot: "surestimer", phrase: "Il a surestimé le temps qu'il lui restait.", bonne: "évaluer au-dessus de ce qui est", faux: ["évaluer au-dessous de ce qui est", "évaluer avec exactitude", "refuser d'évaluer"], raison: "sur- marque l'excès par rapport à la juste mesure" },
  { mot: "sous-estimer", phrase: "Elle avait sous-estimé la difficulté du sujet.", bonne: "évaluer au-dessous de ce qui est", faux: ["évaluer au-dessus de ce qui est", "évaluer avec exactitude", "refuser d'évaluer"], raison: "sous- marque le défaut par rapport à la juste mesure" },
  { mot: "incontestable", phrase: "Le résultat est incontestable.", bonne: "qu'on ne peut pas discuter", faux: ["qu'on discute encore", "qu'on a fini par discuter", "qu'il faudrait discuter"], raison: "in- nie, -able dit la possibilité" },
  { mot: "prédire", phrase: "Personne n'avait prédit une telle affluence.", bonne: "dire à l'avance", faux: ["dire après coup", "dire à la place d'un autre", "redire ce qui a été dit"], raison: "pré- dit l'antériorité" },
  { mot: "dissoudre", phrase: "L'assemblée a été dissoute en janvier.", bonne: "défaire ce qui était réuni", faux: ["réunir ce qui était séparé", "renforcer ce qui existait", "remplacer par autre chose"], raison: "dis- marque la séparation" },
];

/* =============================================================================
   2. COMMENT LE MOT A-T-IL ÉTÉ FABRIQUÉ ?  (2de_lex_composition_emprunt)
   ---------------------------------------------------------------------------
   Les quatre modes de néologie, dont trois sont nommés par le programme. Le
   quatrième — l'abrègement — est ajouté parce qu'il est partout dans la langue
   des élèves, et parce qu'un pool de trois lignes donnerait 33 %.
   ========================================================================== */

const MODES: readonly string[] = [
  "par dérivation : un préfixe ou un suffixe ajouté à un radical",
  "par composition : deux mots réunis en un seul",
  "par emprunt : le mot vient d'une autre langue",
  "par abrègement : un mot plus long a été raccourci",
];

const FORMATIONS: readonly Formation[] = [
  { mot: "déraisonnable", rep: "par dérivation : un préfixe ou un suffixe ajouté à un radical", raison: "dé- et -able encadrent le radical « raison »" },
  { mot: "porte-parole", rep: "par composition : deux mots réunis en un seul", raison: "un verbe et un nom, tous deux existants, réunis" },
  { mot: "week-end", rep: "par emprunt : le mot vient d'une autre langue", raison: "le mot vient de l'anglais, gardé tel quel" },
  { mot: "cinéma", rep: "par abrègement : un mot plus long a été raccourci", raison: "raccourci de « cinématographe »" },
  { mot: "chef-d'œuvre", rep: "par composition : deux mots réunis en un seul", raison: "deux noms soudés par une préposition" },
  { mot: "algèbre", rep: "par emprunt : le mot vient d'une autre langue", raison: "le mot vient de l'arabe" },
  { mot: "métro", rep: "par abrègement : un mot plus long a été raccourci", raison: "raccourci de « métropolitain »" },
  { mot: "invraisemblable", rep: "par dérivation : un préfixe ou un suffixe ajouté à un radical", raison: "in- devant « vraisemblable »" },
  { mot: "sabre", rep: "par emprunt : le mot vient d'une autre langue", raison: "le mot vient du hongrois, par l'allemand" },
  { mot: "coffre-fort", rep: "par composition : deux mots réunis en un seul", raison: "un nom et un adjectif réunis en une unité" },
  { mot: "manif", rep: "par abrègement : un mot plus long a été raccourci", raison: "raccourci de « manifestation »" },
  { mot: "reconstruire", rep: "par dérivation : un préfixe ou un suffixe ajouté à un radical", raison: "re- devant « construire »" },
  { mot: "hamac", rep: "par emprunt : le mot vient d'une autre langue", raison: "le mot vient d'une langue des Caraïbes" },
  { mot: "sourd-muet", rep: "par composition : deux mots réunis en un seul", raison: "deux adjectifs réunis" },
  { mot: "prof", rep: "par abrègement : un mot plus long a été raccourci", raison: "raccourci de « professeur »" },
  { mot: "embellir", rep: "par dérivation : un préfixe ou un suffixe ajouté à un radical", raison: "en- et -ir encadrent le radical « bel »" },
];

/* =============================================================================
   3. DU PLUS LARGE AU PLUS ÉTROIT  (2de_lex_hyperonymie)
   ---------------------------------------------------------------------------
   L'hyperonyme englobe : tout chêne est un arbre, tout arbre est un végétal.
   Savoir remonter d'un cran, c'est savoir reformuler sans répéter — d'où
   l'utilité directe pour la contraction de texte.
   ========================================================================== */

const GENERIQUES: readonly Generique[] = [
  { liste: "chêne · végétal · arbre · chêne pédonculé", bonne: "végétal", faux: ["arbre", "chêne", "chêne pédonculé"] },
  { liste: "roman · récit · texte · roman policier", bonne: "texte", faux: ["récit", "roman", "roman policier"] },
  { liste: "sonnet · poème · texte littéraire · quatrain", bonne: "texte littéraire", faux: ["poème", "sonnet", "quatrain"] },
  { liste: "voilier · embarcation · catamaran · bateau", bonne: "embarcation", faux: ["bateau", "voilier", "catamaran"] },
  { liste: "colère · émotion · fureur · état intérieur", bonne: "état intérieur", faux: ["émotion", "colère", "fureur"] },
  { liste: "violon · instrument · instrument à cordes · objet", bonne: "objet", faux: ["instrument", "instrument à cordes", "violon"] },
  { liste: "tragédie · pièce de théâtre · œuvre · tragédie classique", bonne: "œuvre", faux: ["pièce de théâtre", "tragédie", "tragédie classique"] },
  { liste: "cyclone · phénomène météorologique · vent · phénomène naturel", bonne: "phénomène naturel", faux: ["phénomène météorologique", "vent", "cyclone"] },
  { liste: "métaphore · figure de style · procédé d'écriture · image", bonne: "procédé d'écriture", faux: ["figure de style", "image", "métaphore"] },
  { liste: "quotidien · publication · journal · journal régional", bonne: "publication", faux: ["journal", "quotidien", "journal régional"] },
  { liste: "chirurgien · personne · médecin · professionnel de santé", bonne: "personne", faux: ["professionnel de santé", "médecin", "chirurgien"] },
  { liste: "requiem · musique · œuvre musicale · messe chantée", bonne: "musique", faux: ["œuvre musicale", "messe chantée", "requiem"] },
  { liste: "alexandrin · vers · unité de texte · vers de douze syllabes", bonne: "unité de texte", faux: ["vers", "alexandrin", "vers de douze syllabes"] },
  { liste: "plaidoirie · discours · prise de parole · discours judiciaire", bonne: "prise de parole", faux: ["discours", "plaidoirie", "discours judiciaire"] },
  { liste: "goyavier · arbre fruitier · végétal · arbre", bonne: "végétal", faux: ["arbre", "arbre fruitier", "goyavier"] },
  { liste: "essai · texte d'idées · écrit · essai philosophique", bonne: "écrit", faux: ["texte d'idées", "essai", "essai philosophique"] },
];

/* =============================================================================
   4. LE SYNONYME QUI GARDE LA NUANCE  (2de_lex_nuance_synonyme)
   ---------------------------------------------------------------------------
   ⭐ Le cœur du programme : « structurer sa pensée par le mot le plus juste »,
   « percevoir la nuance d'une formule ». Les quatre propositions sont toutes
   des synonymes approximatifs ; une seule conserve exactement ce que le mot
   d'origine disait.
   ========================================================================== */

const NUANCES: readonly Nuance[] = [
  { phrase: "Il lui adressa une remarque acerbe.", mot: "acerbe", bonne: "mordante", faux: ["triste", "longue", "hésitante"], raison: "« acerbe » dit la blessure volontaire, l'attaque qui pique" },
  { phrase: "Elle prononça ces mots d'une voix atone.", mot: "atone", bonne: "sans relief", faux: ["très forte", "tremblante", "moqueuse"], raison: "« atone » dit l'absence de variation, pas l'émotion" },
  { phrase: "Son récit est empreint de nostalgie.", mot: "nostalgie", bonne: "regret d'un temps révolu", faux: ["peur de l'avenir", "colère contre le présent", "joie sans mélange"], raison: "la nostalgie regarde en arrière avec douceur, non avec colère" },
  { phrase: "Le ton du discours est véhément.", mot: "véhément", bonne: "emporté et passionné", faux: ["mesuré et prudent", "froid et technique", "hésitant et vague"], raison: "« véhément » dit la force de l'emportement" },
  { phrase: "Il fit une réponse évasive.", mot: "évasive", bonne: "qui évite de répondre vraiment", faux: ["qui répond avec précision", "qui répond avec brutalité", "qui refuse ouvertement de répondre"], raison: "l'évasif contourne : il ne refuse pas, il glisse" },
  { phrase: "Ses arguments sont spécieux.", mot: "spécieux", bonne: "séduisants mais faux", faux: ["solides et vérifiés", "compliqués mais justes", "faibles et maladroits"], raison: "le spécieux a l'apparence du vrai, et c'est là son danger" },
  { phrase: "Elle observa la scène, impassible.", mot: "impassible", bonne: "sans rien laisser paraitre", faux: ["visiblement bouleversée", "franchement amusée", "incapable de comprendre"], raison: "l'impassible ressent peut-être, mais ne montre rien" },
  { phrase: "Le paysage est austère.", mot: "austère", bonne: "dépouillé, sans ornement", faux: ["riche et coloré", "menaçant et hostile", "vaste et lumineux"], raison: "l'austère est nu, ce qui ne veut pas dire hostile" },
  { phrase: "Il tint des propos ambigus.", mot: "ambigus", bonne: "qui peuvent s'entendre de deux façons", faux: ["qui ne veulent rien dire du tout", "qui blessent volontairement", "qui sont trop longs pour être suivis"], raison: "l'ambigu a deux sens possibles, pas zéro" },
  { phrase: "Sa démarche est méthodique.", mot: "méthodique", bonne: "qui suit un ordre réfléchi", faux: ["qui va vite sans réfléchir", "qui hésite à chaque étape", "qui change de plan sans arrêt"], raison: "le méthodique suit un ordre, ce qui n'est ni la vitesse ni la lenteur" },
  { phrase: "Le texte s'achève sur une note amère.", mot: "amère", bonne: "marquée par la déception", faux: ["marquée par l'espoir", "marquée par l'indifférence", "marquée par la colère ouverte"], raison: "l'amertume est une déception rentrée, pas une colère criée" },
  { phrase: "Il avança une hypothèse plausible.", mot: "plausible", bonne: "qui peut se soutenir sans être prouvée", faux: ["qui est démontrée", "qui est manifestement fausse", "qui est impossible à comprendre"], raison: "le plausible tient debout sans être établi" },
  { phrase: "Sa réponse fut laconique.", mot: "laconique", bonne: "très brève", faux: ["très détaillée", "très violente", "très polie"], raison: "le laconique tient en peu de mots, sans rien dire de son ton" },
  { phrase: "Une lumière blafarde entrait par la fenêtre.", mot: "blafarde", bonne: "pâle et sans éclat", faux: ["vive et éclatante", "chaude et dorée", "changeante et mobile"], raison: "le blafard est pâle jusqu'à la tristesse" },
  { phrase: "Il resta circonspect devant cette offre.", mot: "circonspect", bonne: "prudent, sur ses gardes", faux: ["enthousiaste", "franchement hostile", "totalement indifférent"], raison: "le circonspect regarde autour de lui avant d'avancer" },
  { phrase: "Le personnage est velléitaire.", mot: "velléitaire", bonne: "qui veut sans jamais passer à l'acte", faux: ["qui agit sans réfléchir", "qui refuse d'agir par principe", "qui agit avec constance"], raison: "la velléité, c'est l'intention qui n'aboutit jamais" },
];

/* =============================================================================
   5. FORMER LE CONTRAIRE  (2de_lex_antonymie)
   ---------------------------------------------------------------------------
   ⚠️ La difficulté n'est pas de connaitre le préfixe mais de choisir le BON :
   « désorganisé » et « inorganisé » ne se valent pas, et « amoral » n'est pas
   « immoral ». Chaque cas ci-dessous a une seule forme reçue.
   ========================================================================== */

const CONTRAIRES: readonly Contraire[] = [
  /* ⚠️ Pour les mots en in-, les trois distracteurs sont les AUTRES formes du
     même préfixe. Mesuré le 14/08 : avec des préfixes différents (dé-, mé-, a-),
     la bonne réponse était la plus longue des quatre dans 88 % des tirages, et
     l'assimilation — la seule chose à savoir ici — n'était pas testée. */
  { mot: "légal", bonne: "illégal", faux: ["inlégal", "imlégal", "irlégal"], raison: "devant un l, le préfixe in- s'assimile et donne il-" },
  { mot: "responsable", bonne: "irresponsable", faux: ["inresponsable", "imresponsable", "ilresponsable"], raison: "devant un r, le préfixe in- s'assimile et donne ir-" },
  { mot: "possible", bonne: "impossible", faux: ["inpossible", "ilpossible", "irpossible"], raison: "devant p, b, m, le préfixe in- devient im-" },
  { mot: "content", bonne: "mécontent", faux: ["incontent", "décontent", "acontent"], raison: "mé- marque ici le défaut, le manque de satisfaction" },
  { mot: "faire", bonne: "défaire", faux: ["infaire", "méfaire", "afaire"], raison: "dé- annule l'action déjà accomplie" },
  { mot: "normal", bonne: "anormal", faux: ["innormal", "dénormal", "ménormal"], raison: "a- marque la privation, l'écart à la norme" },
  { mot: "connu", bonne: "inconnu", faux: ["déconnu", "méconnu", "aconnu"], raison: "in- nie simplement ; « méconnu » veut dire mal reconnu, ce n'est pas le contraire" },
  { mot: "monter", bonne: "démonter", faux: ["inmonter", "mémonter", "amonter"], raison: "dé- défait ce que le verbe avait fait" },
  { mot: "loyal", bonne: "déloyal", faux: ["inloyal", "méloyal", "aloyal"], raison: "dé- s'est fixé sur ce mot par l'usage" },
  { mot: "logique", bonne: "illogique", faux: ["inlogique", "imlogique", "irlogique"], raison: "devant un l, in- s'assimile et donne il-" },
  { mot: "réversible", bonne: "irréversible", faux: ["inréversible", "imréversible", "ilréversible"], raison: "devant un r, in- s'assimile et donne ir-" },
  { mot: "patient", bonne: "impatient", faux: ["inpatient", "ilpatient", "irpatient"], raison: "devant p, in- devient im-" },
  { mot: "content de soi", bonne: "mécontent de soi", faux: ["incontent de soi", "décontent de soi", "acontent de soi"], raison: "mé- marque le défaut, l'insatisfaction" },
  { mot: "brancher", bonne: "débrancher", faux: ["inbrancher", "mébrancher", "abrancher"], raison: "dé- défait l'action" },
  { mot: "politique", bonne: "apolitique", faux: ["inpolitique", "dépolitique", "mépolitique"], raison: "a- marque l'absence, non le contraire actif" },
  { mot: "mobile", bonne: "immobile", faux: ["inmobile", "ilmobile", "irmobile"], raison: "devant m, in- devient im-" },
];

/* =============================================================================
   6. LE MOT QUI CONVIENT AU CONTEXTE  (2de_lex_registre)
   ---------------------------------------------------------------------------
   « adapter son expression aux différentes situations de communication », dit
   le programme au chapitre de l'expression. Le mot juste n'est pas le mot
   savant : c'est celui que la situation appelle.
   ========================================================================== */

const REGISTRES: readonly Registre[] = [
  { contexte: "dans un compte rendu d'expérience", phrase: "Nous avons … que la température restait stable.", bonne: "constaté", faux: ["vu", "remarqué vite fait", "capté"], raison: "le compte rendu demande un verbe neutre et précis" },
  { contexte: "dans une lettre de candidature", phrase: "Je me permets de vous … ma candidature.", bonne: "soumettre", faux: ["balancer", "filer", "montrer vite"], raison: "la lettre officielle demande un registre soutenu" },
  { contexte: "dans un dialogue de roman entre deux amis", phrase: "— Tu … ce que je veux dire ?", bonne: "vois", faux: ["discernes", "appréhendes", "subodores"], raison: "un dialogue familier refuse le vocabulaire savant" },
  { contexte: "dans un article de presse", phrase: "Le maire a … la décision du conseil.", bonne: "annoncé", faux: ["balancé", "sorti", "lâché"], raison: "l'article d'information garde un registre courant et neutre" },
  { contexte: "dans un commentaire de texte", phrase: "L'auteur … ici une image saisissante.", bonne: "construit", faux: ["balance", "sort", "colle"], raison: "l'écrit scolaire demande un verbe d'analyse" },
  { contexte: "dans une plaidoirie", phrase: "Je vous … de considérer les faits.", bonne: "prie", faux: ["demande vite", "dis", "supplie en pleurant"], raison: "la plaidoirie demande une formule ferme et digne" },
  { contexte: "dans un message à un camarade", phrase: "Je … te voir demain.", bonne: "peux", faux: ["saurais", "serais à même de", "puis-je"], raison: "le message ordinaire refuse les tournures apprêtées" },
  { contexte: "dans une dissertation", phrase: "Cette lecture … d'être nuancée.", bonne: "mérite", faux: ["a besoin grave", "vaut le coup", "doit trop"], raison: "la dissertation demande un vocabulaire précis et retenu" },
  { contexte: "dans un compte rendu de lecture", phrase: "Le récit … sur une scène de départ.", bonne: "s'ouvre", faux: ["démarre", "attaque", "part"], raison: "l'écrit d'analyse préfère un verbe précis à un verbe familier" },
  { contexte: "dans un discours officiel", phrase: "Je tiens à vous … de votre présence.", bonne: "remercier", faux: ["dire merci pour", "faire un merci", "envoyer un merci"], raison: "le discours officiel emploie le verbe simple et juste" },
  { contexte: "dans une note d'intention de mise en scène", phrase: "Le décor … l'enfermement des personnages.", bonne: "suggère", faux: ["montre carrément", "balance", "fait voir vite"], raison: "la note d'intention décrit un effet, avec un verbe précis" },
  { contexte: "dans un échange oral entre élèves", phrase: "Je … pas d'accord avec toi.", bonne: "suis", faux: ["ne saurais être", "me trouve n'être", "demeure"], raison: "l'oral ordinaire refuse les tournures littéraires" },
  { contexte: "dans un essai", phrase: "Cette objection … d'être examinée.", bonne: "gagne", faux: ["a intérêt", "vaut le coup", "ferait bien"], raison: "l'essai garde un registre soutenu sans devenir précieux" },
  { contexte: "dans un article scientifique", phrase: "Les résultats … l'hypothèse de départ.", bonne: "confirment", faux: ["disent oui à", "vont dans le sens un peu", "collent avec"], raison: "l'écrit scientifique demande un verbe exact" },
  { contexte: "dans une lettre à un proche", phrase: "J'ai … à ton anniversaire toute la journée.", bonne: "pensé", faux: ["songé avec constance", "eu l'esprit occupé", "médité"], raison: "la lettre personnelle reste simple" },
  { contexte: "dans un exposé devant la classe", phrase: "Je vais vous … les trois formes de ce genre.", bonne: "présenter", faux: ["balancer", "sortir", "faire voir vite"], raison: "l'exposé demande un registre courant et clair" },
];

export const lexiqueSecondeBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "2de_lex_derivation_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "lexique_2de",
    microId: "2de_lex_derivation",
    difficulty: 2,
    theme: "neutral",
    hint: "Démonte le mot : préfixe, radical, suffixe. Une seule réponse respecte les trois.",
    tags: ["seconde", "lexique", "dérivation", "template"],
    generate: () => {
      const c = randomChoice(SENS_CONSTRUITS);
      return {
        text: `« ${c.phrase} »\n\nQue signifie « ${c.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot construit se démonte. Le préfixe oriente — in- et ir- nient, dé- défait, re- répète, sur- exagère, pré- anticipe. Le suffixe dit la classe et souvent la possibilité : -able et -ible signifient « qu'on peut ».",
          "Sépare les morceaux, traduis chacun, puis recompose. Si ta réponse oublie un morceau, elle est fausse.",
          `Ici, ${c.raison}.`,
          `« ${c.mot} » veut dire : ${c.bonne}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_lex_composition_emprunt_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "lexique_2de",
    microId: "2de_lex_composition_emprunt",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi si les morceaux du mot existent seuls, s'ils viennent d'ailleurs, ou si le mot a été coupé.",
    tags: ["seconde", "lexique", "néologie", "template"],
    generate: () => {
      const c = randomChoice(FORMATIONS);
      return {
        text: `Le mot « ${c.mot} »\n\nComment a-t-il été formé ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, MODES),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le programme nomme trois modes de néologie : la dérivation, la composition et l'emprunt. Il faut y ajouter l'abrègement, très vivant aujourd'hui. Dérivation : on ajoute autour d'un radical. Composition : on réunit deux mots qui existent seuls. Emprunt : le mot vient d'une autre langue. Abrègement : un mot long a été coupé.",
          "Essaie de séparer le mot en morceaux. Si les morceaux existent seuls, c'est une composition. S'ils n'existent qu'attachés, c'est une dérivation. Si le mot sonne étranger, cherche l'emprunt.",
          `Ici, ${c.raison}.`,
          `« ${c.mot} » est formé ${c.rep}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_lex_hyperonymie_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "lexique_2de",
    microId: "2de_lex_hyperonymie",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot dont on pourrait dire que tous les autres en sont des exemples.",
    tags: ["seconde", "lexique", "hyperonymie", "template"],
    generate: () => {
      const c = randomChoice(GENERIQUES);
      return {
        text: `${c.liste}\n\nLequel de ces mots englobe tous les autres ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un hyperonyme englobe : tout chêne est un arbre, tout arbre est un végétal. Les mots se rangent ainsi du plus large au plus étroit, et chaque cran vers le haut fait perdre de la précision tout en gagnant en portée.",
          "Teste avec la formule « tout X est un Y ». Le mot qui accepte tous les autres à la place de X est l'hyperonyme.",
          `Ici, chacun des trois autres mots désigne un cas particulier de « ${c.bonne} ».`,
          `C'est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_lex_nuance_synonyme_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "lexique_2de",
    microId: "2de_lex_nuance_synonyme",
    difficulty: 3,
    theme: "neutral",
    hint: "Les quatre réponses sont plausibles. Une seule garde exactement ce que le mot disait.",
    tags: ["seconde", "lexique", "nuance", "template"],
    generate: () => {
      const c = randomChoice(NUANCES);
      return {
        text: `« ${c.phrase} »\n\nQue veut dire « ${c.mot} » ici, exactement ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux mots proches ne disent jamais tout à fait la même chose. Le programme demande de « structurer sa pensée par le mot le plus juste » et de « percevoir la nuance d'une formule chez un auteur » : c'est cet écart-là qu'on travaille, pas la définition de dictionnaire.",
          "Remplace le mot par chaque proposition dans la phrase, puis demande-toi ce qui se perdrait. La bonne réponse est celle qui ne perd rien.",
          `Ici, ${c.raison}.`,
          `« ${c.mot} » veut dire : ${c.bonne}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_lex_antonymie_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "lexique_2de",
    microId: "2de_lex_antonymie",
    difficulty: 2,
    theme: "neutral",
    hint: "Le préfixe change de forme selon la lettre qui suit. Prononce à voix basse.",
    tags: ["seconde", "lexique", "antonymie", "template"],
    generate: () => {
      const c = randomChoice(CONTRAIRES);
      return {
        text: `Quel est le contraire de « ${c.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Former un antonyme par préfixation demande de choisir le bon préfixe, et le français en a plusieurs : in- qui nie, dé- qui défait, mé- qui marque le défaut, a- qui marque l'absence. Le préfixe in- change même de forme selon la lettre qui suit : il- devant l, ir- devant r, im- devant p, b et m.",
          "Prononce les quatre formes à voix basse : trois sonneront faux. C'est l'usage, pas la logique, qui a fixé le préfixe de chaque mot.",
          `Ici, ${c.raison}.`,
          `Le contraire est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_lex_registre_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "lexique_2de",
    microId: "2de_lex_registre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le mot juste n'est pas le mot le plus savant : c'est celui que la situation appelle.",
    tags: ["seconde", "lexique", "registre", "template"],
    generate: () => {
      const c = randomChoice(REGISTRES);
      return {
        text: `${c.contexte.charAt(0).toUpperCase()}${c.contexte.slice(1)} :\n« ${c.phrase} »\n\nQuel mot convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "« Adapter son expression aux différentes situations de communication » est l'une des compétences que le programme place au chapitre de l'expression écrite et orale. Un mot trop familier détonne dans un écrit officiel ; un mot trop savant détonne dans un dialogue.",
          "Demande-toi qui écrit, à qui, et pour quoi. Puis élimine ce qui est trop relâché, puis ce qui est trop apprêté.",
          `Ici, ${c.raison}.`,
          `Le mot attendu est « ${c.bonne} ».`,
        ),
      };
    },
  },
];
