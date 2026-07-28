// ─── Guide de survie · Français 4e (cycle 4) ────────────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/francais/4e/notions.ts
//   (générées par le module PARTAGÉ shared/buildCollegeFrancaisSources)
// - checklists     = micro-compétences de microSkills.ts (BO cycle 4)
// - test de survie = items "fixed" imprimables de la couche francais4eFixedBank
//   (le builder cycle 4 ne produit que des "template" → testDeSurvie serait vide
//   sans cette couche). Cette même couche enrichit aussi le coach (index.ts).
// Condensés écrits et VÉRIFIÉS à la main contre le BO cycle 4 (orthographe,
// accords, conjugaisons, périmètre 4e). 9 NOTIONS (dont analyse_discours).
// Perspective annuelle : « Jugement, valeurs et vérité » (roman du XIXe siècle,
// réalisme, fantastique, Lumières).
// ⚠️ Le bloc « formules » du KitNotion porte LES RÈGLES QUI SAUVENT (texte, pas
// de LaTeX) : lecture/jugement, mise en voix, culture, écriture, oral,
// vocabulaire, phrase, discours/registres, conjugaison.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/4e/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { francais4eFixedBank } from "@/lib/tutor-v4/questionBank/4e/francais/fixed.bank";
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
      "En 4e, comprendre un texte, c'est aussi **porter un jugement** : je distingue l'**apparence** et la **vraie nature** d'un personnage, je repère l'**ironie** et l'**implicite**, et je **justifie** mon interprétation. Face à un **roman réaliste** du XIXe, je relie le texte à la société qu'il peint.",
    formules: [
      { label: "Je dégage le sens et le jugement", latex: "Je cherche ce que l'auteur veut faire comprendre, souvent un jugement sur un personnage. Exemple : « derrière ses habits élégants, l'homme cachait un cœur dur » oppose l'apparence et la vraie nature." },
      { label: "Je repère l'ironie", latex: "L'ironie, c'est dire le contraire de ce qu'on pense. Exemple : « Quel beau travail ! », dit en repoussant la copie du bout des doigts, signifie en réalité que le travail est mauvais." },
      { label: "Je relève les indices de l'implicite", latex: "Un détail précis trahit ce qui n'est pas dit. Exemple : un personnage qui parle de générosité mais compte chaque pièce avant de la donner se montre hypocrite." },
      { label: "Je situe le roman réaliste", latex: "Le roman réaliste peint fidèlement une époque. Exemple : une ville qui gronde de fumée et de bruit, où les ouvriers entrent avant l'aube, montre la dureté du travail au XIXe siècle." },
      { label: "Je porte un jugement argumenté", latex: "Je donne un avis nuancé appuyé sur un acte du personnage. Exemple : « Ce personnage m'a semblé cruel, car il trahit son ami pour de l'argent. »" },
    ],
    reflexes: [
      { si: "un personnage dit le contraire de ce qu'il pense", alors: "je pense à l'ironie et je cherche le vrai sens" },
      { si: "l'apparence d'un personnage semble trop belle", alors: "je me demande ce qu'elle cache" },
      { si: "je lis un roman du XIXe siècle", alors: "je le relie à la société qu'il décrit" },
      { si: "je donne mon avis sur un personnage", alors: "j'appuie mon jugement sur un de ses actes" },
    ],
    pieges: [
      "Prendre l'ironie au premier degré : « Quel beau travail ! » peut vouloir dire le contraire. Je regarde le ton et les gestes pour trancher.",
      "Confondre ce qu'un personnage dit et ce qu'il fait : ses actes révèlent sa vraie nature, pas ses belles paroles.",
      "Juger sans preuve : « il est méchant » ne suffit pas. J'appuie mon jugement sur un acte précis du texte.",
    ],
    reel: "En vrai, quand tu lis un roman où un notable de Saint-Denis vante sa générosité tout en comptant ses pièces, tu comprends que l'auteur dénonce son hypocrisie sans jamais l'écrire",
  },
  {
    id: "lecture_voix_haute",
    emoji: "📢",
    titre: "Lire à voix haute",
    domaine: "Lecture",
    essentiel:
      "Lire à voix haute, c'est **interpréter** le texte. En 4e, je m'exerce sur la **tirade de théâtre** et les répliques : je fais entendre l'**émotion** et parfois l'**ironie** d'un personnage grâce à la **voix**, au **rythme** et au **regard**.",
    formules: [
      { label: "Je prépare l'émotion", latex: "Avant de lire une tirade, je comprends ce que ressent le personnage et je repère les phrases fortes. Exemple : dans une scène de colère, je repère les phrases où le ton doit monter." },
      { label: "Je fais entendre l'ironie", latex: "Quand un personnage feint la politesse tout en méprisant l'autre, mon ton fait entendre le contraire des mots. Exemple : « Quel plaisir de vous revoir » peut se dire d'une voix froide et cinglante." },
      { label: "Je suis la ponctuation", latex: "La voix monte au point d'interrogation, marque une pause au point, une petite pause à la virgule. Exemple : « Est-ce vraiment ce que vous croyez ? » se dit avec la voix qui monte à la fin." },
      { label: "Je varie le rythme", latex: "Je ralentis sur les passages graves, j'accélère sur l'action. Exemple : je dis lentement un aveu douloureux, plus vite une dispute animée." },
      { label: "Je lève les yeux", latex: "Je regarde le public pour tenir son attention, surtout à la fin des phrases importantes. Exemple : après une réplique forte, je lève les yeux une seconde vers l'auditoire." },
    ],
    reflexes: [
      { si: "je lis une réplique ironique", alors: "je fais entendre le contraire des mots par le ton" },
      { si: "le texte marque une forte émotion", alors: "j'adapte ma voix : plus fort pour la colère, plus bas pour la tristesse" },
      { si: "je vois un point d'interrogation", alors: "je fais monter la voix à la fin de la phrase" },
      { si: "une phrase est importante", alors: "je ralentis et je lève les yeux vers le public" },
    ],
    pieges: [
      "Lire une tirade d'une voix plate : le personnage devient sans vie. Il faut suivre ses émotions.",
      "Rater l'ironie en lisant tout au premier degré : je repère les fausses politesses et je change de ton.",
      "Lire trop vite pour finir : on perd le sens et l'émotion. Il faut respirer et varier le rythme.",
    ],
    reel: "En vrai, quand tu lis une réplique de comédie devant la classe à Saint-Benoît, tu forces le ton faussement poli pour faire entendre que le personnage se moque, comme un vrai comédien",
  },
  {
    id: "culture_litteraire",
    emoji: "📚",
    titre: "Culture littéraire",
    domaine: "Culture littéraire",
    essentiel:
      "En 4e, je découvre le **roman réaliste** du XIXe siècle, qui peint la société avec vérité, et le **récit fantastique**, qui joue sur le doute. Je situe les œuvres dans leur **époque** (le XIXe, mais aussi les **Lumières** du XVIIIe) et je les relie aux **valeurs** qu'elles défendent.",
    formules: [
      { label: "Je reconnais le roman réaliste", latex: "Le roman réaliste, chez Balzac ou Maupassant, peint fidèlement la société de son temps, ses métiers, ses injustices. Exemple : un roman qui décrit la misère des ouvriers du XIXe siècle." },
      { label: "Je reconnais le fantastique", latex: "Le récit fantastique fait hésiter entre une explication réelle et une explication surnaturelle. Exemple : un bruit dans une maison vide peut être le vent ou un fantôme, et le texte laisse le doute." },
      { label: "Je situe l'œuvre dans son époque", latex: "Je relie une œuvre à son siècle et à ses idées. Exemple : les romans réalistes datent du XIXe siècle ; les Lumières, au XVIIIe, défendent la raison et la tolérance." },
      { label: "Je relie les œuvres et les arts", latex: "Une même idée se retrouve dans le roman et dans un tableau ou une chanson. Exemple : un roman sur la misère ouvrière fait écho à un tableau du XIXe montrant des ouvriers." },
      { label: "Je tiens mon carnet de lecture", latex: "Après chaque œuvre, je note le titre, l'auteur, le genre, l'époque et mon jugement. Exemple : Le Horla, Maupassant, récit fantastique, j'ai aimé le doute qui grandit page après page." },
    ],
    reflexes: [
      { si: "un récit hésite entre le réel et le surnaturel", alors: "je reconnais le fantastique" },
      { si: "un roman peint fidèlement la société d'une époque", alors: "je pense au roman réaliste du XIXe siècle" },
      { si: "un texte défend la raison et la tolérance", alors: "je pense au mouvement des Lumières" },
      { si: "je viens de terminer une œuvre", alors: "je note son genre, son époque et mon jugement dans mon carnet" },
    ],
    pieges: [
      "Confondre le fantastique et le merveilleux : dans le merveilleux (le conte), le surnaturel est normal ; dans le fantastique, il fait douter et fait peur.",
      "Croire que le roman réaliste raconte des faits réels : il invente des personnages, mais peint fidèlement une société réelle.",
      "Oublier de situer l'œuvre : un roman réaliste appartient au XIXe siècle, les Lumières au XVIIIe. Je relie chaque œuvre à son époque.",
    ],
    reel: "En vrai, quand tu lis une nouvelle fantastique où une ombre semble suivre un promeneur sur le front de mer de Saint-Gilles, tu ne sais jamais si c'est la peur ou le surnaturel, et c'est ce doute qui fait le genre",
  },
  {
    id: "ecriture",
    emoji: "✍️",
    titre: "Écrire un texte",
    domaine: "Écriture",
    essentiel:
      "En 4e, j'écris des **récits** plus travaillés (dont le **fantastique**, qui installe le doute) et je **rédige un paragraphe argumenté** : je défends une **thèse** avec un **argument** et un **exemple**. Je me **relis** pour vérifier les accords, dont l'**accord du participe passé**.",
    formules: [
      { label: "Je construis un récit fantastique", latex: "Pour créer le doute, je distille des détails troublants sans tout expliquer. Exemple : au lieu de dire « c'était un fantôme », je décris une porte qui grince seule, une ombre qui passe, et je laisse le lecteur hésiter." },
      { label: "Je rédige un paragraphe argumenté", latex: "J'annonce ma thèse (mon opinion), je donne un argument (la raison), puis un exemple (la preuve). Exemple : « La lecture est utile (thèse), car elle enrichit le vocabulaire (argument) ; ainsi, en lisant des romans, on apprend des mots nouveaux (exemple). »" },
      { label: "Je réponds à une objection", latex: "Pour nuancer, je tiens compte de l'avis contraire avec un connecteur d'opposition. Exemple : « Certains trouvent la lecture ennuyeuse ; cependant, un bon roman se dévore. »" },
      { label: "J'accorde le participe passé avec avoir", latex: "Avec avoir, le participe s'accorde avec le complément d'objet direct s'il est placé avant le verbe. Exemple : « les lettres qu'elle a écrites » (le COD « qu' » est avant, donc écrites)." },
      { label: "Je me relis et je corrige", latex: "Je vérifie les accords, la ponctuation et l'enchaînement des idées, puis j'enrichis mon vocabulaire. Exemple : je remplace « dire » par « murmurer » ou « déclarer » selon le ton." },
    ],
    reflexes: [
      { si: "j'écris un récit fantastique", alors: "je crée le doute par des détails troublants, sans tout expliquer" },
      { si: "je dois défendre une opinion", alors: "j'écris une thèse, un argument, puis un exemple" },
      { si: "je veux répondre à un avis contraire", alors: "j'emploie un connecteur d'opposition comme cependant ou pourtant" },
      { si: "un participe passé est employé avec avoir", alors: "je cherche si un COD est placé avant le verbe pour l'accorder" },
    ],
    pieges: [
      "Tout expliquer dans un récit fantastique : le doute disparaît. Je distille des indices et je laisse planer le mystère.",
      "Donner un avis sans preuve : un paragraphe argumenté a besoin d'un argument ET d'un exemple, pas seulement d'une opinion répétée.",
      "Oublier l'accord du participe passé : « les lettres qu'elle a écrit » est faux ; le COD « qu' » est avant, donc « écrites ».",
    ],
    reel: "En vrai, quand tu écris une nouvelle où un randonneur du cirque de Mafate entend des pas derrière lui sans jamais voir personne, tu installes le doute par petites touches pour tenir ton lecteur",
  },
  {
    id: "oral",
    emoji: "🗣️",
    titre: "Prendre la parole",
    domaine: "Oral",
    essentiel:
      "En 4e, l'oral devient un **débat** : je **défends une opinion** avec un argument et un exemple, j'**écoute** les arguments des autres et je **réponds** sans agressivité. Je sais aussi **jouer** une scène, y compris une réplique **ironique**.",
    formules: [
      { label: "Je défends une opinion", latex: "Je donne mon avis, une raison et un exemple. Exemple : « Je pense qu'il faut lire chaque jour, car cela enrichit le vocabulaire : moi, j'ai appris beaucoup de mots en lisant des romans. »" },
      { label: "J'écoute les arguments", latex: "Pendant un débat, je note les arguments principaux de chacun pour pouvoir répondre. Exemple : après une intervention, je peux redire « Tu penses que… parce que… »." },
      { label: "Je réponds à l'avis contraire", latex: "Je reconnais le point de l'autre, puis je réponds avec un argument, sans me moquer. Exemple : « C'est vrai que c'est parfois difficile, cependant on progresse vite. »" },
      { label: "Je renforce mon argument", latex: "J'appuie mon idée sur un exemple précis et vérifiable. Exemple : au lieu de « c'est prouvé », je donne un fait concret ou je cite un exemple réel." },
      { label: "Je joue une réplique ironique", latex: "Quand je joue un personnage ironique, mon ton fait entendre le contraire des mots. Exemple : « Quelle bonne idée… » se dit d'une voix qui montre que je pense l'inverse." },
    ],
    reflexes: [
      { si: "je défends une idée dans un débat", alors: "je donne un argument ET un exemple précis" },
      { si: "quelqu'un défend l'avis contraire", alors: "je reconnais son point, puis je réponds calmement avec un argument" },
      { si: "je veux rendre mon argument plus fort", alors: "je l'appuie sur un exemple concret" },
      { si: "je joue un personnage ironique", alors: "je fais entendre par le ton le contraire de ce que je dis" },
    ],
    pieges: [
      "Hausser le ton pour avoir raison : ce n'est pas un argument. Je réponds calmement avec une raison.",
      "Répéter son opinion sans jamais l'appuyer : une idée sans argument ni exemple ne convainc pas.",
      "Couper la parole de l'autre : je l'écoute jusqu'au bout avant de répondre.",
    ],
    reel: "En vrai, quand tu débats en classe à Saint-Louis sur le temps passé devant les écrans, tu écoutes d'abord l'avis contraire, puis tu réponds « c'est vrai, cependant… » avec un exemple précis pour convaincre",
  },
  {
    id: "vocabulaire",
    emoji: "🔤",
    titre: "Le vocabulaire",
    domaine: "Étude de la langue",
    essentiel:
      "En 4e, j'enrichis mon vocabulaire du **jugement** et des **valeurs**. Je devine les mots savants grâce au **contexte**, je choisis des **synonymes précis**, et je comprends la **formation** des mots (le suffixe **-tion** forme des noms d'action).",
    formules: [
      { label: "Je devine grâce au contexte", latex: "Pour un mot difficile, je lis toute la phrase. Exemple : dans « ses propos étaient fallacieux, destinés à tromper », le contexte montre que fallacieux veut dire trompeur." },
      { label: "Le lexique du jugement", latex: "Des mots comme valeur, mérite, faute, vérité, hypocrisie appartiennent au champ lexical du jugement. Exemple : pour juger un personnage, j'emploie méprisant, loyal ou cruel selon ses actes." },
      { label: "Je choisis un synonyme précis", latex: "Je remplace un mot faible par un mot plus juste. Exemple : au lieu de « très triste », je dis « accablé » ; au lieu de « content », « satisfait » ou « ravi »." },
      { label: "La formation des mots savants", latex: "Le suffixe -tion transforme un verbe en nom d'action (libérer → libération) ; le préfixe in- marque souvent la négation (juste → injuste). Exemple : admiration vient d'admirer." },
      { label: "Le réemploi précis", latex: "J'emploie le mot nouveau dans une phrase à moi. Exemple : avec « méprisant », j'écris « il lança un regard méprisant à son adversaire »." },
    ],
    reflexes: [
      { si: "je ne connais pas un mot", alors: "je relis la phrase entière et je cherche des indices autour du mot" },
      { si: "je juge un personnage", alors: "je pioche dans le lexique du jugement : loyal, cruel, hypocrite, méprisant" },
      { si: "un mot est trop faible", alors: "je le remplace par un synonyme plus précis" },
      { si: "je vois le suffixe -tion", alors: "je pense à un nom qui désigne une action" },
    ],
    pieges: [
      "Employer un mot savant sans en connaître le sens exact : « fallacieux » veut dire trompeur, pas simplement « faux ». Je vérifie avant d'employer.",
      "Croire que deux synonymes sont identiques : « content » et « comblé » sont proches, mais « comblé » est bien plus fort. Je choisis selon le sens de ma phrase.",
      "Confondre le champ lexical (mots d'un même thème) et la famille de mots (même radical). Je me demande : idée commune ou racine commune ?",
    ],
    reel: "En vrai, quand tu décris un personnage de roman qui trahit ses amis, tu puises dans le champ lexical du jugement : hypocrisie, trahison, mépris et lâcheté",
  },
  {
    id: "grammaire_phrase",
    emoji: "🧩",
    titre: "Grammaire et accords",
    domaine: "Étude de la langue",
    essentiel:
      "En 4e, la phrase complexe se précise : je distingue les **propositions subordonnées** (**relative** introduite par qui/que/dont/où, **conjonctive** introduite par que). J'analyse les **expansions du nom** (dont le **complément du nom**) et l'**attribut du sujet**, et je maîtrise l'**accord du participe passé avec avoir**.",
    formules: [
      { label: "Je reconnais la subordonnée relative", latex: "La relative complète un nom et commence par un pronom relatif (qui, que, dont, où). Exemple : « Le livre que je lis est passionnant » : « que je lis » complète « livre »." },
      { label: "Je reconnais la subordonnée conjonctive", latex: "La conjonctive complète souvent un verbe et commence par « que ». Exemple : « Je sais que tu viendras » : « que tu viendras » complète « je sais »." },
      { label: "Le complément du nom", latex: "Un groupe introduit par une préposition peut compléter un nom. Exemple : « la maison de mes grands-parents » : « de mes grands-parents » est complément du nom « maison »." },
      { label: "L'attribut du sujet", latex: "Après un verbe d'état (être, sembler, paraître, devenir), l'adjectif est attribut du sujet. Exemple : « Ce voyageur semblait épuisé » : « épuisé » est attribut du sujet « voyageur »." },
      { label: "L'accord du participe passé avec avoir", latex: "Avec avoir, le participe s'accorde avec le complément d'objet direct placé AVANT le verbe. Exemple : « les lettres qu'elle a écrites » (COD avant → écrites) ; mais « elle a écrit des lettres » (COD après → pas d'accord)." },
    ],
    reflexes: [
      { si: "une proposition commence par qui, que, dont ou où et complète un nom", alors: "c'est une subordonnée relative" },
      { si: "un groupe introduit par une préposition complète un nom", alors: "c'est un complément du nom" },
      { si: "un adjectif suit un verbe d'état comme être ou sembler", alors: "c'est un attribut du sujet" },
      { si: "un participe passé est employé avec avoir", alors: "je cherche un COD placé avant le verbe pour l'accorder" },
    ],
    pieges: [
      "Confondre la subordonnée relative (complète un nom : « le livre que je lis ») et la conjonctive (complète un verbe : « je sais que tu viens »). Je regarde ce qu'elle complète.",
      "Oublier d'accorder le participe passé avec le COD antéposé : « les lettres qu'elle a écrit » est faux ; on écrit « écrites ».",
      "Accorder le participe avec le sujet quand l'auxiliaire est avoir : « elle a mangé » ne prend pas de -e, car avec avoir on n'accorde pas avec le sujet.",
    ],
    reel: "En vrai, quand tu écris « les letchis que j'ai cueillis au Tampon étaient délicieux », tu accordes « cueillis » avec « que » (les letchis, placé avant), comme le veut la règle du participe avec avoir",
  },
  {
    id: "analyse_discours",
    emoji: "💬",
    titre: "Discours et registres",
    domaine: "Étude de la langue",
    essentiel:
      "En 4e, je **change de registre** selon la situation (familier ↔ soutenu), je **transforme** le **discours direct** en **discours indirect** (en changeant pronoms et temps), et j'organise un **raisonnement** avec des **connecteurs logiques** (donc, cependant, par exemple).",
    formules: [
      { label: "Je change de registre", latex: "Je passe du familier au soutenu en changeant le vocabulaire et la tournure. Exemple : « File-moi ça ! » (familier) devient « Pourriez-vous me donner cela ? » (soutenu)." },
      { label: "Du discours direct au discours indirect", latex: "Je supprime les guillemets, j'ajoute « que » et j'adapte pronoms et temps. Exemple : Il dit : « Je suis fatigué. » devient Il dit qu'il était fatigué." },
      { label: "Je choisis le verbe introducteur", latex: "J'emploie le verbe qui convient à l'intention : demander pour une question, affirmer pour une déclaration, ordonner pour un ordre. Exemple : « Il demanda si nous venions. »" },
      { label: "J'organise mon raisonnement", latex: "Les connecteurs logiques relient les idées : donc (conséquence), car (cause), cependant (opposition), par exemple (illustration). Exemple : « Il pleuvait, donc nous sommes restés ; cependant, l'après-midi fut agréable. »" },
    ],
    reflexes: [
      { si: "je transforme un discours direct en indirect", alors: "j'enlève les guillemets, j'ajoute que et j'adapte les pronoms et les temps" },
      { si: "je rapporte une question", alors: "j'emploie le verbe demander et souvent « si »" },
      { si: "je veux montrer une conséquence", alors: "j'emploie le connecteur donc" },
      { si: "je veux nuancer avec un avis contraire", alors: "j'emploie un connecteur d'opposition comme cependant" },
    ],
    pieges: [
      "Oublier de changer le temps au discours indirect : on ne dit pas « Il a dit qu'il est fatigué » mais « qu'il était fatigué ».",
      "Garder les guillemets au discours indirect : ils appartiennent au discours direct seulement.",
      "Employer un connecteur pour un autre : « donc » marque la conséquence, « car » la cause, « cependant » l'opposition. Je choisis selon le lien entre les idées.",
    ],
    reel: "En vrai, quand tu rapportes à un ami ce que le professeur a annoncé à Saint-André, tu passes du discours direct au discours indirect en changeant « rendez le devoir » en « il fallait rendre le devoir », sans guillemets",
  },
  {
    id: "conjugaison",
    emoji: "🕰️",
    titre: "La conjugaison",
    domaine: "Étude de la langue",
    essentiel:
      "En 4e, j'élargis les temps : le **plus-que-parfait** dit une action antérieure à une autre action passée, le **conditionnel** exprime l'hypothèse ou la politesse. Je maîtrise le système « **si + imparfait → conditionnel présent** » et la **concordance des temps** dans le récit.",
    formules: [
      { label: "Le plus-que-parfait", latex: "Il exprime une action passée AVANT une autre action passée. Il se forme avec l'imparfait de être ou avoir + participe passé. Exemple : « Quand il arriva, elle était déjà partie » (partir avant d'arriver)." },
      { label: "Le conditionnel présent", latex: "Il exprime une action soumise à une condition, ou une demande polie. Exemple : « Je voudrais te parler » (politesse) ; « Je partirais si je pouvais » (condition)." },
      { label: "Le système hypothétique", latex: "« Si + imparfait » dans la subordonnée appelle le conditionnel présent dans la principale. Exemple : « Si j'avais le temps, je lirais ce livre. »" },
      { label: "La concordance dans le récit", latex: "Dans un récit au passé, j'articule imparfait (décor), passé simple (action) et plus-que-parfait (action antérieure). Exemple : « Il marchait ; soudain il aperçut la maison qu'il avait quittée. »" },
      { label: "J'accorde le participe avec être", latex: "Aux temps composés avec être, le participe s'accorde avec le sujet. Exemple : « Elles étaient parties » ; « Elles seraient revenues »." },
    ],
    reflexes: [
      { si: "je vois l'imparfait de être ou avoir suivi d'un participe passé", alors: "je pense au plus-que-parfait, l'action la plus ancienne" },
      { si: "une phrase commence par « Si » suivi de l'imparfait", alors: "la suite se met au conditionnel présent" },
      { si: "je fais une demande polie", alors: "j'emploie le conditionnel : je voudrais, pourrais-tu" },
      { si: "une action s'est passée avant une autre action passée", alors: "je la mets au plus-que-parfait" },
    ],
    pieges: [
      "Écrire « Si j'aurais » : c'est une faute classique. Après « si », on met l'imparfait, jamais le conditionnel : « Si j'avais… je pourrais ».",
      "Confondre le futur (je partirai) et le conditionnel (je partirais) : le conditionnel prend un -s et exprime une hypothèse ou la politesse.",
      "Oublier le plus-que-parfait pour l'action la plus ancienne : « Quand il arriva, elle partait » est flou ; « elle était déjà partie » est clair.",
    ],
    reel: "En vrai, quand tu racontes une sortie au volcan, tu écris « nous marchions depuis une heure quand nous vîmes le cratère que la brume avait caché jusque-là », en emboîtant imparfait, passé simple et plus-que-parfait",
  },
];

// Couche "fixed" imprimable groupée par notion (source des tests de survie).
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of francais4eFixedBank) {
  (BANQUES[item.notionId] ??= []).push(item);
}

export const KIT_FRANCAIS_4E: KitData = {
  slug: "francais-4e",
  titre: "Guide de survie · Français 4e",
  baseline:
    "Les 9 grands domaines du français en 4e en 9 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges — et un test corrigé par fiche. Pour lire, écrire, argumenter et juger au collège. À imprimer, à glisser dans le classeur.",
  matiere: "francais",
  classeLabel: "4e",
  coachClasse: "4e",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
