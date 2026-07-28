// ─── Guide de survie · Français 3e (cycle 4, brevet) ────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/francais/3e/notions.ts
//   (générées par le module PARTAGÉ shared/buildCollegeFrancaisSources)
// - checklists     = micro-compétences de microSkills.ts (BO cycle 4)
// - test de survie = items "fixed" imprimables de la couche francais3eFixedBank
//   (le builder cycle 4 ne produit que des "template" → testDeSurvie serait vide
//   sans cette couche). Cette même couche enrichit aussi le coach (index.ts).
// Condensés écrits et VÉRIFIÉS à la main contre le BO cycle 4 (orthographe,
// accords, conjugaisons, périmètre 3e). 9 NOTIONS (dont analyse_discours).
// Perspective annuelle : « Engagement humaniste et émancipation » (témoignage,
// autobiographie, poésie engagée, humanisme). Niveau brevet.
// ⚠️ Le bloc « formules » du KitNotion porte LES RÈGLES QUI SAUVENT (texte, pas
// de LaTeX) : lecture/engagement, mise en voix, culture, écriture, oral,
// vocabulaire, phrase, discours/registres, conjugaison.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/3e/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { francais3eFixedBank } from "@/lib/tutor-v4/questionBank/3e/francais/fixed.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "lecture_comprehension",
    emoji: "🔎",
    titre: "Comprendre et interpréter",
    domaine: "Lecture",
    essentiel:
      "En 3e, comprendre un texte, c'est l'**interpréter avec nuance** et percevoir son **engagement**. Face à un **témoignage**, une **autobiographie** ou un **poème engagé**, je dégage la **thèse** défendue, je repère la **dénonciation** cachée derrière les mots et je **justifie** mon interprétation.",
    formules: [
      { label: "Je dégage le combat du texte", latex: "Un texte engagé défend une cause. Exemple : « Tant qu'un enfant sera privé d'école, notre combat continuera » appelle à défendre le droit à l'éducation." },
      { label: "Je repère la dénonciation implicite", latex: "L'auteur dénonce souvent sans le dire directement. Exemple : « Le discours parlait de paix, mais les usines fabriquaient des armes » dénonce l'hypocrisie par le contraste." },
      { label: "Je perçois l'émotion du témoignage", latex: "Un témoignage fait ressentir un moment vécu. Exemple : « Je me souviens du silence, ce matin-là » annonce, sous la retenue, un événement grave." },
      { label: "J'interprète avec nuance", latex: "Je ne réponds pas par oui ou non : je nuance et je justifie. Exemple : le poète condamne la guerre, mais garde de l'espoir dans la dernière strophe." },
      { label: "Je porte un jugement de lecteur fondé", latex: "Je donne un avis argumenté sur le texte et ses procédés. Exemple : « Ce poème m'a touché, car ses images fortes dénoncent la guerre sans jamais crier. »" },
    ],
    reflexes: [
      { si: "un texte défend une cause", alors: "je dégage la thèse et le combat qu'il porte" },
      { si: "un contraste sec oppose deux idées", alors: "je cherche l'injustice que l'auteur dénonce" },
      { si: "un narrateur dit « je » et raconte un souvenir grave", alors: "je pense au témoignage ou à l'autobiographie" },
      { si: "je donne mon avis sur un texte", alors: "je l'appuie sur un procédé précis du texte" },
    ],
    pieges: [
      "Prendre un texte engagé pour une simple information : « notre combat continuera » n'est pas un bulletin, c'est un appel. Je cherche la thèse défendue.",
      "Rater la dénonciation implicite : l'auteur critique souvent par le contraste ou l'ironie, sans l'écrire. Je lis entre les lignes.",
      "Répondre sans nuance : un texte peut à la fois dénoncer et espérer. Je nuance mon interprétation et je la justifie.",
    ],
    reel: "En vrai, quand tu lis un témoignage sur l'esclavage à La Réunion, tu comprends, derrière les faits racontés avec retenue, l'appel à ne jamais oublier et à défendre la liberté",
  },
  {
    id: "lecture_voix_haute",
    emoji: "📢",
    titre: "Lire à voix haute",
    domaine: "Lecture",
    essentiel:
      "En 3e, lire à voix haute, c'est **porter un message**. Sur un **poème engagé** ou un **monologue**, je **martèle le rythme**, je **mets en relief** les mots forts et j'utilise les **silences** pour faire résonner l'émotion et l'idée.",
    formules: [
      { label: "Je repère ce qui porte le message", latex: "Avant de lire, je repère les images fortes, les répétitions et les mots clés à faire entendre. Exemple : dans un poème de révolte, je souligne les verbes d'action et les mots de liberté." },
      { label: "Je martèle le rythme", latex: "Pour un texte engagé, j'appuie le rythme et je détache les mots forts. Exemple : je scande « Liberté, j'écris ton nom » en appuyant chaque mot important." },
      { label: "J'utilise les silences", latex: "Un court silence après une phrase forte la laisse résonner. Exemple : après « Ils n'ont pas eu le dernier mot », je marque une pause avant de reprendre." },
      { label: "Je suis la ponctuation", latex: "La voix monte à la question, marque une pause au point, une petite pause à la virgule. Exemple : « Qui oserait accepter cela ? » se dit avec la voix qui monte et un silence après." },
      { label: "Je lève les yeux vers le public", latex: "Sur les phrases clés, je regarde l'auditoire pour l'impliquer. Exemple : à la fin d'un vers de révolte, je lève les yeux pour prendre le public à témoin." },
    ],
    reflexes: [
      { si: "je lis un poème engagé", alors: "je martèle le rythme et je mets en relief les mots forts" },
      { si: "une phrase est très forte", alors: "je marque un court silence après pour la laisser résonner" },
      { si: "je vois une question rhétorique", alors: "je fais monter la voix et je regarde le public" },
      { si: "je lis un monologue triste", alors: "je ralentis et je baisse la voix pour l'émotion" },
    ],
    pieges: [
      "Lire un texte engagé d'une voix monotone : le message se perd. Il faut varier le rythme et appuyer les mots forts.",
      "Enchaîner sans jamais respirer : les silences font partie du sens. Je marque une pause après les phrases fortes.",
      "Lire trop vite pour finir : on n'entend plus rien. Je ralentis sur les passages importants.",
    ],
    reel: "En vrai, quand tu lis un poème de la Résistance devant la classe à Sainte-Marie, tu martèles les mots de liberté et tu marques un silence après chaque vers pour que le message frappe",
  },
  {
    id: "culture_litteraire",
    emoji: "📚",
    titre: "Culture littéraire",
    domaine: "Culture littéraire",
    essentiel:
      "En 3e, je découvre les textes de l'**engagement** : le **témoignage** (souvent sur les guerres du XXe siècle), l'**autobiographie**, où l'auteur raconte sa vie, et la **poésie engagée**, qui met les mots au service d'une **cause** et de l'**émancipation**.",
    formules: [
      { label: "Je reconnais le témoignage", latex: "Un témoin raconte ce qu'il a réellement vécu, souvent pour garder la mémoire. Exemple : un récit de déportation transmet une expérience réelle pour que l'on n'oublie pas." },
      { label: "Je reconnais l'autobiographie", latex: "Dans l'autobiographie, l'auteur, le narrateur et le personnage sont la même personne, qui dit « je ». Exemple : un écrivain qui raconte son enfance à la première personne." },
      { label: "Je reconnais la poésie engagée", latex: "La poésie engagée dénonce une injustice ou défend une cause. Exemple : un poème qui condamne la guerre ou célèbre la liberté." },
      { label: "Je situe l'œuvre dans son époque", latex: "Je relie une œuvre à son contexte. Exemple : la poésie de la Résistance a été écrite pendant la Seconde Guerre mondiale." },
      { label: "Je tiens mon carnet de lecture", latex: "Après chaque œuvre engagée, je note la cause défendue et ce que le texte m'a fait ressentir. Exemple : un poème de Paul Éluard, la liberté, il m'a donné de l'espoir." },
    ],
    reflexes: [
      { si: "un témoin raconte ce qu'il a réellement vécu", alors: "je reconnais un témoignage" },
      { si: "l'auteur dit « je » et raconte sa propre vie", alors: "je pense à l'autobiographie" },
      { si: "un poème défend une cause ou dénonce une injustice", alors: "je reconnais la poésie engagée" },
      { si: "je viens de lire un texte engagé", alors: "je note la cause défendue et mon ressenti dans mon carnet" },
    ],
    pieges: [
      "Confondre l'autobiographie et le roman : dans l'autobiographie, l'auteur raconte sa vraie vie ; dans le roman, il invente des personnages.",
      "Croire qu'un témoignage est un simple récit : il transmet une expérience réelle pour garder la mémoire et alerter.",
      "Oublier de situer l'œuvre : la poésie de la Résistance appartient à la Seconde Guerre mondiale. Je relie chaque texte à son époque.",
    ],
    reel: "En vrai, quand tu lis le témoignage d'un ancien engagé volontaire réunionnais, tu comprends que raconter, c'est déjà résister et transmettre la mémoire aux plus jeunes",
  },
  {
    id: "ecriture",
    emoji: "✍️",
    titre: "Écrire un texte",
    domaine: "Écriture",
    essentiel:
      "En 3e, j'écris pour **me raconter** et pour **convaincre**. Le texte **autobiographique** se dit à la première personne, au passé. Le texte **argumenté** défend une **thèse**, l'appuie sur des **arguments** et des **exemples**, et **réfute** l'avis contraire. Je **relis** la logique de mon raisonnement.",
    formules: [
      { label: "J'écris un texte autobiographique", latex: "Je raconte un souvenir à la première personne, au passé, en disant ce que j'ai ressenti. Exemple : « Ce jour-là, j'avais peur, mais je décidai d'avancer quand même. »" },
      { label: "Je construis une argumentation", latex: "J'annonce ma thèse, puis des arguments appuyés sur des exemples précis. Exemple : « L'école émancipe (thèse), car elle donne les moyens de choisir sa vie (argument) ; ainsi, apprendre à lire ouvre toutes les portes (exemple). »" },
      { label: "Je réfute la thèse adverse", latex: "Je tiens compte de l'avis contraire et j'y réponds avec un connecteur d'opposition. Exemple : « Certains pensent que c'est inutile ; au contraire, c'est ce qui rend libre. »" },
      { label: "J'emploie des images fortes", latex: "Pour un texte engagé, je choisis des images qui frappent. Exemple : « Une école fermée, c'est une porte close sur l'avenir. »" },
      { label: "Je relis la logique", latex: "Je vérifie que mes arguments s'enchaînent, que les connecteurs sont justes et que les accords sont corrects. Exemple : je vérifie qu'un « donc » introduit bien une conséquence, pas une cause." },
    ],
    reflexes: [
      { si: "j'écris sur un souvenir personnel", alors: "j'emploie la première personne et le passé" },
      { si: "je veux convaincre", alors: "j'écris une thèse, des arguments et des exemples précis" },
      { si: "je veux répondre à un avis contraire", alors: "je le réfute avec « au contraire » ou « pourtant »" },
      { si: "je me relis", alors: "je vérifie l'enchaînement des arguments et les connecteurs logiques" },
    ],
    pieges: [
      "Écrire une autobiographie à la troisième personne : le récit de soi se dit à la première personne, avec « je ».",
      "Défendre une thèse sans réfuter l'avis contraire : un bon texte argumenté répond aussi aux objections.",
      "Aligner des idées sans connecteurs : « donc », « cependant », « car » guident le lecteur. Sans eux, le raisonnement se perd.",
    ],
    reel: "En vrai, quand tu écris au brevet un texte pour défendre le droit de chaque enfant à étudier, tu donnes une thèse, un exemple concret, puis tu réfutes l'objection par un argument opposé",
  },
  {
    id: "oral",
    emoji: "🗣️",
    titre: "Prendre la parole",
    domaine: "Oral",
    essentiel:
      "En 3e, l'oral prépare l'**épreuve du brevet** : je **présente** un objet d'étude avec un **support** et des **exemples**, j'**argumente** avec des exemples vérifiables, j'**écoute** pour retenir thèse et arguments, et je sais **réfuter** un avis contraire.",
    formules: [
      { label: "Je présente à l'oral du brevet", latex: "J'annonce mon sujet, je m'appuie sur un support clair et je donne des exemples précis. Exemple : « Je vais présenter mon projet en trois parties », puis j'illustre chaque idée." },
      { label: "J'appuie mes arguments sur des exemples", latex: "Un argument devient solide avec un exemple concret et vérifiable. Exemple : au lieu de « c'est utile », je dis « grâce à ce stage, j'ai appris à travailler en équipe »." },
      { label: "J'écoute pour retenir l'essentiel", latex: "Quand quelqu'un parle, je retiens sa thèse et ses arguments pour pouvoir répondre. Exemple : après une intervention, je peux résumer « Tu défends… parce que… »." },
      { label: "Je réfute avec respect", latex: "Je réponds à l'avis contraire par un argument, sans agressivité. Exemple : « Je comprends ton point de vue ; au contraire, je pense que… »" },
      { label: "Je regarde mon public", latex: "Je lève les yeux, je parle fort et j'articule pour être compris de tous. Exemple : je regarde le jury à la fin de chaque idée importante." },
    ],
    reflexes: [
      { si: "je passe l'oral du brevet", alors: "je m'appuie sur un support clair et des exemples précis" },
      { si: "je veux rendre un argument fort", alors: "je l'appuie sur un exemple concret et vérifiable" },
      { si: "quelqu'un défend l'avis contraire", alors: "je le réfute calmement avec un argument" },
      { si: "j'écoute un exposé", alors: "je retiens la thèse et les arguments principaux" },
    ],
    pieges: [
      "Lire ses notes mot à mot sans lever les yeux : je dois regarder le jury et m'appuyer sur un support, pas réciter.",
      "Argumenter sans exemple : une idée générale ne convainc pas ; un exemple précis, si.",
      "Réfuter en haussant le ton : je réponds avec un argument, pas plus fort que l'autre.",
    ],
    reel: "En vrai, quand tu passes l'oral du brevet à Saint-Joseph, tu présentes ton projet avec un support clair, tu donnes un exemple concret vécu, et tu regardes le jury à chaque idée importante",
  },
  {
    id: "vocabulaire",
    emoji: "🔤",
    titre: "Le vocabulaire",
    domaine: "Étude de la langue",
    essentiel:
      "En 3e, j'enrichis mon vocabulaire de l'**engagement** et de l'**émancipation**. Je devine les mots par le **contexte**, je maîtrise le lexique de la **liberté** et du **combat**, et je comprends la **formation** des mots savants (préfixe **anti-**, mots abstraits en **-tion** ou **-isme**).",
    formules: [
      { label: "Je devine grâce au contexte", latex: "Pour un mot difficile, je lis toute la phrase. Exemple : dans « il dénonça avec véhémence l'injustice », le contexte montre que véhémence veut dire une force passionnée." },
      { label: "Le lexique de l'engagement", latex: "Des mots comme combat, cause, liberté, justice, émancipation appartiennent au champ lexical de l'engagement. Exemple : pour parler d'un militant, j'emploie défendre, lutter, revendiquer." },
      { label: "Les préfixes de l'opposition", latex: "Le préfixe anti- marque le fait d'être contre (antiesclavagiste = contre l'esclavage) ; in- ou im- marquent la négation (injuste, impossible). Exemple : antiraciste signifie qui lutte contre le racisme." },
      { label: "Les mots savants et abstraits", latex: "Le suffixe -tion forme des noms d'action (émanciper → émancipation) ; le suffixe -isme désigne une doctrine ou un mouvement (humanisme). Exemple : la liberté et l'égalité sont des noms abstraits." },
      { label: "Le réemploi précis", latex: "J'emploie le mot nouveau dans une phrase à moi. Exemple : avec « injustice », j'écris « le texte dénonce l'injustice faite aux plus faibles »." },
    ],
    reflexes: [
      { si: "je ne connais pas un mot dans un texte", alors: "je relis la phrase entière et je cherche des indices autour du mot" },
      { si: "je parle d'un combat ou d'une cause", alors: "je pioche dans le lexique de l'engagement : liberté, justice, lutte" },
      { si: "je vois le préfixe anti-", alors: "je pense au sens « contre »" },
      { si: "je vois le suffixe -isme", alors: "je pense à une doctrine ou un mouvement" },
    ],
    pieges: [
      "Employer un mot abstrait sans en saisir le sens : « émancipation » veut dire libération, pas simplement « changement ». Je vérifie.",
      "Confondre le champ lexical (mots d'un même thème) et la famille de mots (même radical). Je me demande : idée commune ou racine commune ?",
      "Écrire « conscience » ou « émancipation » au son : ces mots ont un « sc » ou des lettres qu'il faut mémoriser.",
    ],
    reel: "En vrai, quand tu écris un texte sur la lutte pour les droits, tu puises dans le champ lexical de l'engagement : liberté, égalité, justice et émancipation",
  },
  {
    id: "grammaire_phrase",
    emoji: "🧩",
    titre: "Grammaire et accords",
    domaine: "Étude de la langue",
    essentiel:
      "En 3e, je maîtrise les **subordonnées circonstancielles** (temps, cause, but, opposition, condition) et la **voix passive** (avec son **complément d'agent**). J'analyse le rôle de chaque proposition et je fais tous les **accords**, y compris à la voix passive.",
    formules: [
      { label: "Je reconnais la subordonnée de temps", latex: "Elle situe l'action dans le temps (quand, lorsque, avant que, dès que). Exemple : « Il partit avant que la nuit tombe » : « avant que la nuit tombe » exprime le temps." },
      { label: "Je reconnais la cause et le but", latex: "« parce que », « puisque », « comme » expriment la cause ; « pour que », « afin que » expriment le but. Exemple : « Il travaille pour qu'on le respecte » exprime le but." },
      { label: "Je reconnais l'opposition (concession)", latex: "« bien que », « quoique », « même si » expriment l'opposition. Exemple : « Bien qu'il soit tard, il continue » : la subordonnée exprime la concession." },
      { label: "Je transforme à la voix passive", latex: "À la voix passive, le sujet subit l'action ; celui qui agit devient complément d'agent (introduit par « par »). Exemple : « La police arrête le coupable » devient « Le coupable est arrêté par la police »." },
      { label: "J'accorde à la voix passive", latex: "Le participe passé s'accorde avec le sujet à la voix passive. Exemple : « Les décisions ont été prises » : « prises » s'accorde avec « les décisions » (féminin pluriel)." },
    ],
    reflexes: [
      { si: "une subordonnée répond à « quand ? »", alors: "c'est une circonstancielle de temps" },
      { si: "une subordonnée exprime le pourquoi", alors: "c'est une circonstancielle de cause (parce que, puisque)" },
      { si: "une subordonnée commence par bien que ou quoique", alors: "elle exprime l'opposition (la concession)" },
      { si: "le sujet subit l'action et « par » introduit celui qui agit", alors: "la phrase est à la voix passive" },
    ],
    pieges: [
      "Confondre la cause et le but : « parce que » explique pourquoi (la cause), « pour que » vise un objectif (le but). Je regarde le sens.",
      "Oublier d'accorder le participe à la voix passive : « les décisions ont été pris » est faux ; on écrit « prises », accordé avec le sujet.",
      "Croire que « bien que » exprime la cause : il exprime l'opposition. « Bien qu'il pleuve, il sort » veut dire « malgré la pluie ».",
    ],
    reel: "En vrai, quand tu écris « la route du littoral fut fermée par les autorités après l'éboulement », tu emploies la voix passive, et le participe « fermée » s'accorde avec le sujet féminin",
  },
  {
    id: "analyse_discours",
    emoji: "💬",
    titre: "Discours et registres",
    domaine: "Étude de la langue",
    essentiel:
      "En 3e, j'**adapte mon registre** à la situation et au public, je reconnais le **discours indirect libre** (les pensées d'un personnage mêlées au récit) et je maîtrise les **procédés de l'argumentation** : **question rhétorique**, **connecteurs logiques** et **réfutation** de la thèse adverse.",
    formules: [
      { label: "J'adapte mon registre", latex: "Je choisis mon langage selon la personne et la situation : familier entre amis, courant à soutenu pour convaincre un public. Exemple : un discours public reste clair et digne, jamais relâché." },
      { label: "Je reconnais le discours indirect libre", latex: "Il mêle les pensées d'un personnage au récit, sans « que » ni guillemets. Exemple : « Elle hésitait : partirait-elle vraiment ? » : ce sont ses pensées, glissées dans le récit." },
      { label: "La question rhétorique", latex: "C'est une fausse question qui n'attend pas de réponse : elle fait réagir et emporte l'adhésion. Exemple : « Qui oserait accepter une telle injustice ? »" },
      { label: "Je réfute la thèse adverse", latex: "Je réponds à l'avis contraire avec un connecteur d'opposition. Exemple : « Certains disent que c'est impossible ; au contraire, l'Histoire prouve qu'on peut changer les choses. »" },
    ],
    reflexes: [
      { si: "je m'adresse à un large public", alors: "je choisis un registre courant à soutenu, clair et digne" },
      { si: "les pensées d'un personnage sont glissées dans le récit sans guillemets", alors: "c'est du discours indirect libre" },
      { si: "une question n'attend pas de réponse", alors: "c'est une question rhétorique, pour convaincre" },
      { si: "je veux réfuter un avis contraire", alors: "j'emploie « au contraire » ou « pourtant »" },
    ],
    pieges: [
      "Écrire un texte de conviction dans un registre familier : pour convaincre un public, on choisit un registre soigné.",
      "Prendre une question rhétorique pour une vraie question : « Qui accepterait cela ? » ne demande pas de réponse, elle fait réagir.",
      "Oublier de réfuter la thèse adverse : un texte argumenté solide répond aussi aux objections, avec un connecteur d'opposition.",
    ],
    reel: "En vrai, quand tu écris un discours pour défendre l'environnement à La Réunion, tu emploies une question rhétorique comme « Qui voudrait d'un lagon sans corail ? » pour emporter l'adhésion de ton public",
  },
  {
    id: "conjugaison",
    emoji: "🕰️",
    titre: "La conjugaison",
    domaine: "Étude de la langue",
    essentiel:
      "En 3e, je maîtrise le **subjonctif** (après « il faut que », « pour que », « bien que »), le **conditionnel passé** (le regret, l'irréel du passé) et la **voix passive**. Je respecte la **concordance des temps** entre les propositions.",
    formules: [
      { label: "Le subjonctif", latex: "Il exprime le souhait, l'obligation ou le doute, après « que ». On l'emploie après « il faut que », « pour que », « bien que », « je veux que ». Exemple : « Il faut que tu viennes » ; « Je souhaite que tu sois heureux. »" },
      { label: "Le conditionnel passé", latex: "Il exprime un regret ou une action qui ne s'est pas réalisée. Il se forme avec le conditionnel de avoir ou être + participe passé. Exemple : « J'aurais aimé rester » (mais je ne suis pas resté)." },
      { label: "La voix passive", latex: "À la voix passive, le sujet subit l'action. Elle se forme avec l'auxiliaire être conjugué + participe passé. Exemple : « Le coupable a été arrêté par la police. »" },
      { label: "La concordance des temps", latex: "Le temps de la subordonnée s'accorde avec celui de la principale. Exemple : « Il dit qu'il viendra » (présent → futur) ; « Il disait qu'il viendrait » (passé → conditionnel)." },
      { label: "J'accorde le participe passé", latex: "Avec être (temps composés et voix passive), le participe s'accorde avec le sujet. Exemple : « Elles sont parties » ; « Les lois ont été votées. »" },
    ],
    reflexes: [
      { si: "je vois « il faut que », « pour que » ou « bien que »", alors: "j'emploie le subjonctif" },
      { si: "j'exprime un regret ou l'irréel du passé", alors: "j'emploie le conditionnel passé : j'aurais aimé, il aurait fallu" },
      { si: "le sujet subit l'action", alors: "j'emploie la voix passive avec l'auxiliaire être et le participe passé" },
      { si: "la principale est au passé", alors: "j'adapte le temps de la subordonnée (concordance des temps)" },
    ],
    pieges: [
      "Employer l'indicatif après « il faut que » : on ne dit pas « il faut que tu viens » mais « que tu viennes » (subjonctif).",
      "Confondre le conditionnel passé (« j'aurais aimé », un regret) et le plus-que-parfait (« j'avais aimé », une action antérieure).",
      "Oublier l'accord du participe à la voix passive : « les lois ont été voté » est faux ; on écrit « votées », accordé avec « les lois ».",
    ],
    reel: "En vrai, quand tu écris « il faut que nous protégions la forêt, car il aurait fallu agir plus tôt », tu emploies le subjonctif présent et le conditionnel passé pour dire la nécessité et le regret",
  },
];

// Couche "fixed" imprimable groupée par notion (source des tests de survie).
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of francais3eFixedBank) {
  (BANQUES[item.notionId] ??= []).push(item);
}

export const KIT_FRANCAIS_3E: KitData = {
  slug: "francais-3e",
  titre: "Guide de survie · Français 3e",
  baseline:
    "Les 9 grands domaines du français en 3e en 9 fiches, spécial brevet : l'essentiel, les règles qui sauvent, les réflexes, les pièges — et un test corrigé par fiche. Pour lire, écrire, argumenter et s'engager. À imprimer, à glisser dans le classeur.",
  matiere: "francais",
  classeLabel: "3e · brevet",
  coachClasse: "3e",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
