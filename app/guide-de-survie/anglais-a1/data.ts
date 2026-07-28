// ─── Guide de survie · Anglais A1 (English Maths — CLIL) ─────────────────────
// L'anglais du coach EleveAI est du CLIL : de l'anglais À TRAVERS les matières
// (maths, sciences, éco-gestion, géographie, vie quotidienne) — pas un cours de
// grammaire isolé. Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/english/a1/notions.ts
// - checklists     = micro-compétences de microSkills.ts (reconnaître / produire)
// - test de survie = items "fixed" imprimables de la banque englishA1QuestionBank
//   (QCM en↔fr sans audio ni figure ; les items « listen »/dictée sont exclus
//   par testDeSurvie car ils portent un audioSrc). Mesuré : chaque notion a ≥10
//   items imprimables, aucune banque à compléter.
// ⚠️ Ici le bloc « formules » du KitNotion porte LES MOTS & PHRASES QUI SAUVENT
// (vocabulaire bilingue + structures de base, en toutes lettres, ZÉRO LaTeX).
// Condensés écrits et VÉRIFIÉS à la main (orthographe britannique, périmètre A1,
// faux-amis). 19 NOTIONS. matiere = "english-maths", coachClasse = "a1".

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/english/a1/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { englishA1QuestionBank } from "@/lib/tutor-v4/questionBank/a1/english";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  // ── Nombres ────────────────────────────────────────────────────────────────
  {
    id: "en_a1_digits",
    emoji: "🔢",
    titre: "Les chiffres · Digits",
    domaine: "Nombres",
    essentiel:
      "En anglais, on compte d'abord de **zéro à dix**. Ces petits mots reviennent partout : en calcul, en sport, pour donner son âge ou un prix. Il faut les reconnaître **à l'écrit** comme **à l'oral**, car plusieurs se ressemblent.",
    formules: [
      { label: "Compter de 0 à 5", latex: "**zero** zéro · **one** un · **two** deux · **three** trois · **four** quatre · **five** cinq" },
      { label: "Compter de 6 à 10", latex: "**six** six · **seven** sept · **eight** huit · **nine** neuf · **ten** dix" },
      { label: "Demander une quantité", latex: "« How many? » = combien ? On répond par un chiffre : « How many? — Three »" },
      { label: "Bien prononcer", latex: "Pour **three**, on met la langue entre les dents (le son « th »), pas « tri » ni « sri »" },
    ],
    reflexes: [
      { si: "je vois « How many? »", alors: "je réponds par un chiffre : one, two, three…" },
      { si: "je confonds « four » et « five »", alors: "je pense : four = 4 (avec un « r »), five = 5" },
      { si: "je dois dire « three » ou « three »", alors: "je place la langue entre les dents pour le son « th »" },
    ],
    pieges: [
      "Prononcer « three » comme « tri » : le son « th » n'existe pas en français, la langue passe entre les dents.",
      "Croire que « eight » se lit comme il s'écrit : le « gh » est muet, on dit « eït ».",
      "Confondre à l'oral « one » (un) et « won » : one se prononce « ouann ».",
    ],
    reel: "En vrai, quand tu comptes les vagues avant de te lancer au surf à Saint-Leu, tu peux t'entraîner à compter en anglais : one, two, three, go",
  },
  {
    id: "en_a1_numbers",
    emoji: "💯",
    titre: "Les grands nombres · Numbers",
    domaine: "Nombres",
    essentiel:
      "Après dix, on apprend les **dizaines** (twenty, thirty…), la **centaine** (hundred), le **millier** (thousand) et le **million**. En anglais, on relie les mots avec un trait d'union : **twenty-one** = vingt et un. C'est la base pour lire un prix, une date ou un score.",
    formules: [
      { label: "Les dizaines", latex: "**twenty** vingt · **thirty** trente · **forty** quarante · **fifty** cinquante" },
      { label: "Les grands nombres", latex: "**hundred** cent · **thousand** mille · **million** million" },
      { label: "Assembler un nombre", latex: "On relie avec un trait d'union : **twenty-one** = vingt et un ; **thirty-five** = trente-cinq" },
      { label: "Piège d'orthographe", latex: "**forty** s'écrit sans « u » (pas « fourty »), même si **four** en a un" },
    ],
    reflexes: [
      { si: "je veux écrire un nombre comme 21", alors: "je relie les mots avec un trait d'union : twenty-one" },
      { si: "j'hésite entre « thirteen » et « thirty »", alors: "-teen pour 13 à 19, -ty pour les dizaines (30, 40…)" },
      { si: "j'écris « forty »", alors: "je n'oublie pas : pas de « u », contrairement à four" },
    ],
    pieges: [
      "Confondre « thirteen » (13) et « thirty » (30) : -teen pour 13-19, -ty pour les dizaines. L'accent tonique change de place.",
      "Écrire « fourty » : ce mot n'existe pas, c'est « forty » sans « u ».",
      "Oublier le trait d'union : on écrit twenty-one, pas twenty one.",
    ],
    reel: "En vrai, le Piton des Neiges culmine à plus de three thousand mètres : de quoi réviser hundred, thousand et les grands nombres rien qu'en le regardant de loin",
  },
  // ── Calcul & langue des maths ──────────────────────────────────────────────
  {
    id: "en_a1_operations",
    emoji: "➕",
    titre: "Les opérations · Operations",
    domaine: "Calcul",
    essentiel:
      "Les quatre opérations se disent avec des mots simples : **plus**, **minus**, **times**, **divided by**, et le résultat vient après **equals**. Savoir les dire permet de lire un calcul à voix haute en anglais.",
    formules: [
      { label: "Les signes", latex: "**plus** plus (+) · **minus** moins (−) · **times** fois (×) · **divided by** divisé par (÷)" },
      { label: "Le résultat", latex: "**equals** égale (=) · **result** résultat" },
      { label: "Lire un calcul", latex: "« two plus three equals five » = 2 + 3 = 5" },
      { label: "Poser une question", latex: "« What is five minus two? » = combien font 5 − 2 ?" },
    ],
    reflexes: [
      { si: "je lis un calcul à voix haute", alors: "je nomme le signe : plus, minus, times, divided by, puis equals" },
      { si: "je vois le signe ×", alors: "je dis « times »" },
      { si: "je cherche le résultat", alors: "il vient après « equals »" },
    ],
    pieges: [
      "Croire que « times » veut dire « le temps » : ici c'est le signe × (fois). Le temps se dit « time ».",
      "Dire « égal » à la française : le mot anglais est « equals », avec un « s ».",
      "Confondre « minus » (moins, le signe) et « minute » : deux mots différents.",
    ],
    reel: "En vrai, au marché de Saint-Pierre, quand tu additionnes le prix de deux samoussas, tu fais un two plus two en anglais sans t'en rendre compte",
  },
  {
    id: "en_a1_comparisons",
    emoji: "⚖️",
    titre: "Comparer · Comparisons",
    domaine: "Calcul",
    essentiel:
      "Comparer, c'est dire si un nombre est **plus grand** (greater than), **plus petit** (less than) ou **égal** (equal to). On distingue aussi les nombres **pairs** (even) et **impairs** (odd). Attention à l'ordre : le plus grand vient en premier.",
    formules: [
      { label: "Comparer", latex: "**greater than** supérieur à (>) · **less than** inférieur à (<) · **equal to** égal à (=)" },
      { label: "Pair ou impair", latex: "**even** pair · **odd** impair" },
      { label: "Faire une phrase", latex: "« Five is greater than three » = 5 est plus grand que 3" },
      { label: "Reconnaître", latex: "« Eight is an even number » = 8 est un nombre pair" },
    ],
    reflexes: [
      { si: "je compare deux nombres", alors: "le plus grand d'abord : « five is greater than three »" },
      { si: "je vois le signe >", alors: "je lis « greater than » (supérieur à)" },
      { si: "un nombre finit par 0, 2, 4, 6, 8", alors: "il est « even » (pair) ; sinon il est « odd » (impair)" },
    ],
    pieges: [
      "Inverser l'ordre : « three is greater than five » est faux. Le plus grand vient toujours en premier.",
      "Croire que « odd » veut dire « bizarre » ici : en maths, odd = impair.",
      "Confondre « greater than » (supérieur à) et « greatest » (le plus grand) : à l'A1 on reste sur greater than / less than.",
    ],
    reel: "En vrai, quand tu compares l'altitude du Piton de la Fournaise et du Piton des Neiges, tu dis en anglais que l'un est greater than l'autre",
  },
  {
    id: "en_a1_shapes",
    emoji: "📐",
    titre: "Les formes · Shapes",
    domaine: "Géométrie",
    essentiel:
      "La géométrie de base : reconnaître les **formes** (triangle, carré, cercle…) et nommer leurs éléments (**côté**, **angle**, **sommet**). Beaucoup de mots ressemblent au français, ce qui aide à les retenir — mais leur prononciation, elle, change.",
    formules: [
      { label: "Les formes", latex: "**triangle** triangle · **square** carré · **rectangle** rectangle · **circle** cercle" },
      { label: "Les éléments", latex: "**point** point · **line** droite · **side** côté · **angle** angle · **vertex** sommet · **perimeter** périmètre" },
      { label: "Décrire une figure", latex: "« A triangle has three sides » = un triangle a trois côtés" },
      { label: "Nommer une forme", latex: "« It is a square » = c'est un carré" },
    ],
    reflexes: [
      { si: "je décris une forme", alors: "je commence par « It is a… » : It is a circle" },
      { si: "je compte les côtés d'un triangle", alors: "three sides (côtés) et three vertices (sommets)" },
      { si: "un mot ressemble au français (triangle, rectangle)", alors: "l'orthographe aide, mais je surveille la prononciation" },
    ],
    pieges: [
      "Croire que « square » désigne une place de ville : ici c'est le carré (la forme).",
      "Oublier que « vertex » (sommet) fait « vertices » au pluriel.",
      "Confondre « side » (côté d'une figure) et « size » (la taille) : deux mots proches, sens différents.",
    ],
    reel: "En vrai, les cases créoles ont souvent un toit en triangle et des fenêtres en rectangle : la géométrie anglaise est déjà dans ton quartier",
  },
  {
    id: "en_a1_verbs",
    emoji: "✏️",
    titre: "Les verbes des maths · Math verbs",
    domaine: "Langue des maths",
    essentiel:
      "Les **consignes** en maths sont des verbes à l'impératif : **add** (additionne), **count** (compte), **measure** (mesure), **draw** (trace). Les comprendre, c'est comprendre ce qu'un exercice demande de faire.",
    formules: [
      { label: "Les consignes (1/2)", latex: "**add** additionne · **subtract** soustrais · **count** compte · **measure** mesure" },
      { label: "Les consignes (2/2)", latex: "**draw** trace · **calculate** calcule · **find** trouve · **write** écris" },
      { label: "Lire une consigne", latex: "« Add the two numbers » = additionne les deux nombres" },
      { label: "Comprendre l'ordre", latex: "Le verbe est en premier : « Draw a circle » = trace un cercle" },
    ],
    reflexes: [
      { si: "une consigne commence par un verbe", alors: "c'est un ordre : Add…, Count…, Draw…" },
      { si: "je vois « find »", alors: "on me demande de trouver un résultat, pas de chercher un objet perdu" },
      { si: "je vois « measure »", alors: "je prends une règle et je mesure" },
    ],
    pieges: [
      "Confondre « draw » (tracer, dessiner) et « drawer » (un tiroir) : ça se ressemble, ce n'est pas pareil.",
      "Croire que « add » veut seulement dire « ajouter un objet » : en maths, add = additionner.",
      "Lire « find » comme « fouiller partout » : ici on demande de trouver un résultat.",
    ],
    reel: "En vrai, en cours de techno, quand la consigne dit draw ou measure, c'est exactement ce qu'on te demande de faire avec ta règle et ton crayon",
  },
  // ── Sport ──────────────────────────────────────────────────────────────────
  {
    id: "en_a1_sports",
    emoji: "⚽",
    titre: "Les sports · Sports",
    domaine: "Sport",
    essentiel:
      "Le vocabulaire des **sports** sert à parler de soi et de ses loisirs. Beaucoup de mots viennent de l'anglais (**football**, **tennis**, **rugby**). On emploie **play** avec les sports de balle, et **go** avec les autres.",
    formules: [
      { label: "Les sports (1/2)", latex: "**football** football · **basketball** basket-ball · **tennis** tennis · **rugby** rugby · **volleyball** volley-ball" },
      { label: "Les sports (2/2)", latex: "**athletics** athlétisme · **swimming** natation · **cycling** cyclisme · **running** course à pied · **surfing** surf" },
      { label: "Dire ce qu'on pratique", latex: "On emploie **play** avec les sports de balle : « I play football » = je joue au football" },
      { label: "Parler de ses goûts", latex: "« My favourite sport is surfing » = mon sport préféré est le surf" },
    ],
    reflexes: [
      { si: "je parle d'un sport de balle", alors: "j'emploie « play » : I play football, I play tennis" },
      { si: "je parle de natation ou de course", alors: "j'emploie « go » : I go swimming, I go running" },
      { si: "je dis mon sport préféré", alors: "« My favourite sport is… »" },
    ],
    pieges: [
      "Croire que « football » désigne le foot américain : en anglais britannique, football = le football (le foot).",
      "Mettre « play » partout : on dit « I go swimming », pas « I play swimming ».",
      "Oublier le -ing : ces sports se disent swimming, cycling, running, surfing.",
    ],
    reel: "En vrai, à La Réunion on pratique le surfing, le running sur le front de mer et le football au stade : trois mots d'anglais déjà dans ton emploi du temps",
  },
  {
    id: "en_a1_sport_measurements",
    emoji: "⏱️",
    titre: "Mesurer le sport · Sport measurements",
    domaine: "Sport",
    essentiel:
      "Pour mesurer une performance, on utilise des **unités** : **metre**, **kilometre**, **second**, **minute**, **kilogram**. Elles servent à décrire une course, un temps ou une distance.",
    formules: [
      { label: "Les distances", latex: "**metre** mètre · **centimetre** centimètre · **kilometre** kilomètre · **lap** tour de piste" },
      { label: "Le temps et le poids", latex: "**second** seconde · **minute** minute · **hour** heure · **kilogram** kilogramme" },
      { label: "Décrire une course", latex: "« The race is one hundred metres » = la course fait cent mètres" },
      { label: "Donner un temps", latex: "« He runs in ten seconds » = il court en dix secondes" },
    ],
    reflexes: [
      { si: "je donne une distance", alors: "metre, kilometre (orthographe britannique en -re)" },
      { si: "je donne un temps", alors: "second, minute, hour" },
      { si: "je parle d'un poids", alors: "kilogram (kg)" },
    ],
    pieges: [
      "Écrire « meter » à l'américaine : ici l'orthographe attendue est britannique, « metre ».",
      "Confondre « hour » (heure) et « our » (notre) : même prononciation, sens différent.",
      "Croire que « second » veut seulement dire « deuxième » : c'est aussi la seconde (le temps).",
    ],
    reel: "En vrai, le Grand Raid se court sur plus de cent kilometres : un bon moyen de retenir kilometre, hour et les mesures du sport",
  },
  // ── Sciences ───────────────────────────────────────────────────────────────
  {
    id: "en_a1_science_living",
    emoji: "🌱",
    titre: "Le vivant · Living world",
    domaine: "Sciences",
    essentiel:
      "Le vocabulaire du **vivant** : la **cellule**, la **plante** (avec ses **racines** et ses **feuilles**), l'**animal** et ses **organes**. Ces mots reviennent en SVT et dans les documentaires en anglais.",
    formules: [
      { label: "Le vivant (1/2)", latex: "**cell** cellule · **plant** plante · **animal** animal · **organ** organe · **body** corps" },
      { label: "Le vivant (2/2)", latex: "**leaf** feuille · **root** racine · **seed** graine · **fish** poisson · **bird** oiseau" },
      { label: "Décrire une plante", latex: "« A plant has roots and leaves » = une plante a des racines et des feuilles" },
      { label: "Classer", latex: "« A fish is an animal » = un poisson est un animal" },
    ],
    reflexes: [
      { si: "je décris une plante", alors: "roots (racines), leaves (feuilles), seed (graine)" },
      { si: "je classe un être vivant", alors: "plant (plante) ou animal (animal)" },
      { si: "je parle du plus petit élément du vivant", alors: "the cell (la cellule)" },
    ],
    pieges: [
      "Croire que « cell » veut dire « cellule de prison » : en SVT, cell = la cellule du vivant.",
      "Confondre « leaf » (feuille d'une plante) et une feuille de papier (a sheet).",
      "Oublier les pluriels : leaf → leaves, mais « fish » reste « fish ».",
    ],
    reel: "En vrai, dans un jardin créole tu observes des plants avec leurs roots et leurs leaves, et des birds qui viennent picorer les graines",
  },
  {
    id: "en_a1_science_earth",
    emoji: "🌍",
    titre: "La Terre · Earth",
    domaine: "Sciences",
    essentiel:
      "La Terre et le ciel : l'**eau**, l'**air**, le **sol**, les **roches**, mais aussi le **soleil**, la **lune** et les **étoiles**. Ces mots décrivent la météo et les paysages.",
    formules: [
      { label: "La Terre", latex: "**water** eau · **air** air · **soil** sol · **rock** roche · **volcano** volcan" },
      { label: "Le ciel", latex: "**sun** soleil · **moon** lune · **star** étoile · **cloud** nuage · **rain** pluie" },
      { label: "Décrire la météo", latex: "« Water falls as rain » = l'eau tombe sous forme de pluie" },
      { label: "Observer", latex: "« The sun gives light » = le soleil donne de la lumière" },
    ],
    reflexes: [
      { si: "je décris la météo", alors: "cloud (nuage), rain (pluie), sun (soleil)" },
      { si: "je parle du ciel la nuit", alors: "moon (lune) et stars (étoiles)" },
      { si: "je parle d'un volcan", alors: "volcano (au pluriel : volcanoes)" },
    ],
    pieges: [
      "Croire que « sun » (soleil) et « son » (fils) sont le même mot : même prononciation, sens différent.",
      "Confondre « rock » (une roche) et « rock » (la musique) : le contexte tranche.",
      "Écrire le pluriel de volcano « volcanos » : la forme attendue est « volcanoes ».",
    ],
    reel: "En vrai, quand un nuage crève sur les Hauts et que la rain tombe d'un coup, tu as sous les yeux le cycle de l'water en anglais",
  },
  // ── Économie & gestion ─────────────────────────────────────────────────────
  {
    id: "en_a1_money",
    emoji: "💶",
    titre: "L'argent · Money",
    domaine: "Économie & gestion",
    essentiel:
      "Parler d'**argent** : l'**euro** et le **centime**, le **prix**, la **pièce** et le **billet**, puis les verbes **buy**, **sell**, **pay**. Attention : « cent » en anglais veut dire un **centime**, pas cent.",
    formules: [
      { label: "L'argent", latex: "**euro** euro · **cent** centime · **price** prix · **coin** pièce · **note** billet" },
      { label: "Acheter et vendre", latex: "**buy** acheter · **sell** vendre · **pay** payer · **change** monnaie · **receipt** reçu" },
      { label: "Demander un prix", latex: "« How much is it? » = combien ça coûte ? — « It costs five euros »" },
      { label: "Rendre la monnaie", latex: "« Here is your change » = voici votre monnaie" },
    ],
    reflexes: [
      { si: "je demande un prix", alors: "« How much is it? »" },
      { si: "je vois le mot « cent »", alors: "en anglais c'est le centime, pas cent" },
      { si: "je paie et on me rend de l'argent", alors: "c'est « change » (la monnaie)" },
    ],
    pieges: [
      "Grand faux-ami : « cent » en anglais = un centime, pas cent (100). Cent se dit « a hundred ».",
      "Croire que « note » veut dire une note d'école : ici, note = un billet de banque.",
      "Confondre « buy » (acheter) et « by » (par) : même prononciation, sens différent.",
    ],
    reel: "En vrai, à la boutik du coin, quand tu paies un pain et qu'on te rend la monnaie, tu manipules des euros, des cents et des coins comme dans le cours d'anglais",
  },
  {
    id: "en_a1_family_budget",
    emoji: "💰",
    titre: "Le budget familial · Family budget",
    domaine: "Économie & gestion",
    essentiel:
      "Gérer un **budget** : le **revenu** (income) entre, les **dépenses** (rent, food, bills) sortent, et ce qui reste, on l'**épargne** (save). On apprend à dire ce qui est **gratuit** (free) ou **cher** (expensive).",
    formules: [
      { label: "Les dépenses", latex: "**rent** loyer · **food** nourriture · **bill** facture · **cost** coût" },
      { label: "Gérer", latex: "**income** revenu · **budget** budget · **save** épargner · **spend** dépenser · **free** gratuit · **expensive** cher" },
      { label: "Parler d'épargne", latex: "« We save money every month » = nous épargnons de l'argent chaque mois" },
      { label: "Comparer les prix", latex: "« This is too expensive » = c'est trop cher" },
    ],
    reflexes: [
      { si: "l'argent entre chaque mois", alors: "c'est le « income » (revenu)" },
      { si: "je mets de l'argent de côté", alors: "je « save » (épargne)" },
      { si: "quelque chose ne coûte rien", alors: "c'est « free » (gratuit)" },
    ],
    pieges: [
      "Croire que « free » veut dire « libre » ici : dans un budget, free = gratuit.",
      "Croire que « rent » veut dire « une rente » : rent = le loyer.",
      "Confondre « spend » (dépenser) et « spent » : spent est le passé de spend.",
    ],
    reel: "En vrai, aider à faire les courses de la semaine, c'est déjà gérer un budget : income, food, bills et ce qu'on arrive à save à la fin du mois",
  },
  // ── Géographie & voyage ────────────────────────────────────────────────────
  {
    id: "en_a1_countries",
    emoji: "🗺️",
    titre: "Pays & continents · Countries",
    domaine: "Géographie & voyage",
    essentiel:
      "Situer les **pays** et les **continents** : France, La Réunion, Madagascar, Maurice, et l'**Afrique**, l'**Europe**, l'**Asie**… On répond à la question « Where are you from? ».",
    formules: [
      { label: "Pays et îles", latex: "**France** France · **Réunion** La Réunion · **Madagascar** Madagascar · **Mauritius** Maurice · **India** Inde" },
      { label: "Les continents", latex: "**Africa** Afrique · **Europe** Europe · **Asia** Asie · **America** Amérique · **Australia** Australie" },
      { label: "Dire d'où l'on vient", latex: "« Where are you from? — I am from Réunion »" },
      { label: "Situer", latex: "« France is in Europe » = la France est en Europe" },
    ],
    reflexes: [
      { si: "on me demande d'où je viens", alors: "« I am from Réunion »" },
      { si: "je situe un pays", alors: "« France is in Europe »" },
      { si: "je parle d'un continent", alors: "Africa, Europe, Asia, America, Australia" },
    ],
    pieges: [
      "En anglais on écrit « Réunion » ; en français on garde La Réunion, avec l'accent.",
      "Confondre « Mauritius » (Maurice) et « Mauritania » (la Mauritanie) : deux endroits différents.",
      "Ajouter « the » devant un continent : on dit « in Africa », pas « in the Africa ».",
    ],
    reel: "En vrai, depuis La Réunion tu es à quelques heures d'avion de Madagascar et de Mauritius : de bons repères pour situer les pays en anglais",
  },
  {
    id: "en_a1_geography_basic",
    emoji: "⛰️",
    titre: "La géographie · Geography",
    domaine: "Géographie & voyage",
    essentiel:
      "Décrire un **paysage** : une **île**, une **montagne**, une **rivière**, la **mer** et l'**océan**, une **plage**, une **forêt**. À La Réunion, tous ces mots sont sous nos yeux.",
    formules: [
      { label: "Le relief et l'eau", latex: "**island** île · **mountain** montagne · **river** rivière · **sea** mer · **ocean** océan" },
      { label: "Les lieux", latex: "**beach** plage · **forest** forêt · **city** ville · **village** village · **road** route" },
      { label: "Décrire un lieu", latex: "« There is a mountain and a river » = il y a une montagne et une rivière" },
      { label: "Parler de chez soi", latex: "« Réunion is an island in the ocean » = La Réunion est une île dans l'océan" },
    ],
    reflexes: [
      { si: "je décris La Réunion", alors: "an island (une île), with mountains and beaches" },
      { si: "je parle de l'eau", alors: "river (rivière), sea (mer), ocean (océan)" },
      { si: "je situe une habitation", alors: "city (ville) ou village (village)" },
    ],
    pieges: [
      "Confondre « sea » (mer) et « see » (voir) : même prononciation, sens différent.",
      "Confondre « city » (une grande ville) et « village » (un petit village) : ce n'est pas la même taille.",
      "Croire que « road » (route) et « road »… se dit comme « rode » : le sens vient du contexte.",
    ],
    reel: "En vrai, La Réunion réunit une island, des mountains, des rivers et des beaches : presque tout le vocabulaire de géographie tient sur ton île",
  },
  // ── Vie quotidienne ────────────────────────────────────────────────────────
  {
    id: "en_a1_family",
    emoji: "👪",
    titre: "La famille · Family",
    domaine: "Vie quotidienne",
    essentiel:
      "Présenter sa **famille** : **father**, **mother**, **brother**, **sister**, mais aussi les grands-parents, l'oncle et la tante. On les emploie avec **my** : « this is my sister ».",
    formules: [
      { label: "Parents et enfants", latex: "**father** père · **mother** mère · **brother** frère · **sister** sœur · **son** fils · **daughter** fille" },
      { label: "La famille élargie", latex: "**grandfather** grand-père · **grandmother** grand-mère · **uncle** oncle · **aunt** tante" },
      { label: "Présenter quelqu'un", latex: "« This is my sister » = voici ma sœur" },
      { label: "Dire ce qu'on a", latex: "« I have two brothers » = j'ai deux frères" },
    ],
    reflexes: [
      { si: "je présente un membre de ma famille", alors: "« This is my… » : This is my mother" },
      { si: "je parle des parents de mes parents", alors: "grandfather, grandmother" },
      { si: "je dis combien j'ai de frères et sœurs", alors: "« I have one brother and two sisters »" },
    ],
    pieges: [
      "Faux-ami : en anglais, « parents » = le père et la mère seulement, pas toute la famille.",
      "Confondre « son » (fils) et « sun » (soleil) : même prononciation, sens différent.",
      "Écrire « grandfather » en deux mots : c'est un seul mot, grandfather, grandmother.",
    ],
    reel: "En vrai, un dimanche kabar en famille, tu peux présenter en anglais ton father, ta mother, tes brothers et tes sisters autour du cari",
  },
  {
    id: "en_a1_school",
    emoji: "🎒",
    titre: "L'école · School",
    domaine: "Vie quotidienne",
    essentiel:
      "Le matériel et la classe : **pen**, **pencil**, **book**, **bag**, **ruler**, et les objets de la salle (**table**, **chair**, **board**). Ce sont les premiers mots utiles chaque jour à l'école.",
    formules: [
      { label: "Le matériel", latex: "**pen** stylo · **pencil** crayon · **book** livre · **bag** sac · **ruler** règle" },
      { label: "La salle de classe", latex: "**table** table · **chair** chaise · **board** tableau · **classroom** salle de classe · **teacher** professeur" },
      { label: "Demander un objet", latex: "« Where is my bag? » = où est mon sac ?" },
      { label: "Une consigne de classe", latex: "« Open your book » = ouvre ton livre" },
    ],
    reflexes: [
      { si: "je demande où est un objet", alors: "« Where is my…? » : Where is my pen?" },
      { si: "le professeur donne un ordre", alors: "Open…, Close…, Write…" },
      { si: "je confonds « pen » et « pencil »", alors: "pen = stylo (encre), pencil = crayon (mine)" },
    ],
    pieges: [
      "Faux-ami : « library » = la bibliothèque, pas la librairie (qui se dit bookshop).",
      "Croire que « pen » veut dire « la peine » : pen = un stylo.",
      "Croire que « ruler » veut seulement dire « un dirigeant » : en classe, ruler = la règle.",
    ],
    reel: "En vrai, dans ton sac de cours il y a déjà un pen, un pencil, un book et une ruler : ta trousse parle anglais sans le savoir",
  },
  {
    id: "en_a1_colors",
    emoji: "🎨",
    titre: "Les couleurs · Colours",
    domaine: "Vie quotidienne",
    essentiel:
      "Nommer les **couleurs** : red, blue, green, yellow… On répond à « What colour is it? » par « It is red ». Attention à l'orthographe britannique : **colour** et **grey**.",
    formules: [
      { label: "Les couleurs (1/2)", latex: "**red** rouge · **blue** bleu · **green** vert · **yellow** jaune · **orange** orange" },
      { label: "Les couleurs (2/2)", latex: "**black** noir · **white** blanc · **pink** rose · **purple** violet · **grey** gris" },
      { label: "Demander la couleur", latex: "« What colour is it? — It is red »" },
      { label: "Décrire un objet", latex: "« My bag is blue » = mon sac est bleu" },
    ],
    reflexes: [
      { si: "on me demande la couleur", alors: "« It is… » : It is green" },
      { si: "j'écris « colour » ou « grey »", alors: "orthographe britannique : colour (pas color), grey (pas gray)" },
      { si: "je décris un objet", alors: "la couleur vient après « is » : My bag is red" },
    ],
    pieges: [
      "Écrire « color » et « gray » à l'américaine : l'orthographe attendue ici est britannique, colour et grey.",
      "Placer la couleur avant « is » : on dit « My bag is red », pas « My bag red is ».",
      "Croire que « purple » veut dire exactement pourpre : purple couvre le violet en général.",
    ],
    reel: "En vrai, un coucher de soleil sur le lagon de l'Ermitage mélange le orange, le pink et le purple : la palette des couleurs anglaises grandeur nature",
  },
  {
    id: "en_a1_body",
    emoji: "🧍",
    titre: "Le corps · Body",
    domaine: "Vie quotidienne",
    essentiel:
      "Nommer les **parties du corps** : la **tête** et le visage (eye, ear, mouth, nose), puis les membres (**hand**, **arm**, **leg**, **foot**). Utile chez le médecin ou en sport.",
    formules: [
      { label: "La tête", latex: "**head** tête · **eye** œil · **ear** oreille · **mouth** bouche · **nose** nez" },
      { label: "Le corps", latex: "**hand** main · **arm** bras · **leg** jambe · **foot** pied · **back** dos" },
      { label: "Montrer une partie", latex: "« This is my hand » = voici ma main" },
      { label: "Compter au pluriel", latex: "« I have two eyes » = j'ai deux yeux (eye → eyes, foot → feet)" },
    ],
    reflexes: [
      { si: "je montre une partie du corps", alors: "« This is my… » : This is my nose" },
      { si: "je parle des deux yeux ou des deux pieds", alors: "pluriels irréguliers : eye → eyes, foot → feet" },
      { si: "j'ai mal quelque part", alors: "« My head hurts » = j'ai mal à la tête" },
    ],
    pieges: [
      "Faux-ami : « arm » = le bras, pas une arme (qui se dit weapon).",
      "Oublier les pluriels irréguliers : foot → feet, tooth → teeth.",
      "Confondre « ear » (oreille) et « year » (année) : la prononciation les distingue.",
    ],
    reel: "En vrai, à l'entraînement de foot, quand le coach parle de tes legs, de tes feet et de ton back, il te donne du vocabulaire du corps en anglais",
  },
  {
    id: "en_a1_food",
    emoji: "🍎",
    titre: "La nourriture · Food",
    domaine: "Vie quotidienne",
    essentiel:
      "Parler de **nourriture** : le **pain**, le **riz**, les **fruits** et **légumes**, l'**eau**, le **lait**… On dit ses goûts avec « I like… » et « I don't like… ».",
    formules: [
      { label: "Les aliments", latex: "**bread** pain · **rice** riz · **fruit** fruit · **vegetable** légume · **meat** viande · **fish** poisson" },
      { label: "À boire et autres", latex: "**water** eau · **milk** lait · **egg** œuf · **juice** jus" },
      { label: "Dire ses goûts", latex: "« I like rice » = j'aime le riz ; « I don't like fish » = je n'aime pas le poisson" },
      { label: "Poser une question", latex: "« Do you like fruit? » = est-ce que tu aimes les fruits ?" },
    ],
    reflexes: [
      { si: "je dis ce que j'aime", alors: "« I like… » ; ce que je n'aime pas : « I don't like… »" },
      { si: "je propose à boire", alors: "water, milk, juice" },
      { si: "je pose une question sur les goûts", alors: "« Do you like…? »" },
    ],
    pieges: [
      "Confondre « meat » (viande) et « meet » (rencontrer) : même prononciation, sens différent.",
      "Oublier que « fish » reste « fish » au pluriel, alors que « egg » fait « eggs ».",
      "Croire que « juice » se prononce « juisse » : on dit « djouss ».",
    ],
    reel: "En vrai, un cari bien réunionnais réunit du rice, de la meat ou du fish et des vegetables : ton assiette est une leçon d'anglais",
  },
];

// Banque "fixed" imprimable groupée par notion (source des tests de survie).
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of englishA1QuestionBank) {
  (BANQUES[item.notionId] ??= []).push(item);
}

export const KIT_ANGLAIS_A1: KitData = {
  slug: "anglais-a1",
  titre: "Guide de survie · Anglais A1",
  baseline:
    "Tout l'anglais du niveau A1 en 19 fiches : les mots et phrases qui sauvent, les réflexes, les faux-amis à éviter — et un test corrigé par fiche. De l'anglais à travers les maths, les sciences, l'argent, la géographie et la vie de tous les jours. À imprimer, à glisser dans le classeur.",
  matiere: "english-maths",
  classeLabel: "A1",
  coachClasse: "a1",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
