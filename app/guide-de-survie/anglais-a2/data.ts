// ─── Guide de survie · Anglais A2 (English Maths — CLIL) ─────────────────────
// A2 = un cran au-dessus de l'A1 : anglais À TRAVERS les matières (maths plus
// techniques, sciences, éco-gestion, géographie, vie quotidienne). Contenu
// ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/english/a2/notions.ts
// - checklists     = micro-compétences de microSkills.ts (traduire EN↔FR)
// - test de survie = items "fixed" imprimables de englishA2QuestionBank
//   (QCM en↔fr ; les micros « listen » portent un audioSrc → exclus par
//   testDeSurvie). Mesuré : chaque notion a ≥16 items imprimables, aucune
//   banque à compléter.
// ⚠️ Bloc « formules » = LES MOTS & PHRASES QUI SAUVENT (vocabulaire bilingue +
// structures de base, en toutes lettres, ZÉRO LaTeX). Condensés écrits et
// vérifiés à la main (orthographe britannique, périmètre A2, faux-amis).
// 20 NOTIONS. matiere = "english-maths", coachClasse = "a2".

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/english/a2/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { englishA2QuestionBank } from "@/lib/tutor-v4/questionBank/a2/english";
import type { KitData, KitNotion } from "@/components/kit/types";

const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  // ── Langue des maths ───────────────────────────────────────────────────────
  {
    id: "en_a2_verbs",
    emoji: "🧮",
    titre: "Agir en maths · Maths verbs",
    domaine: "Langue des maths",
    essentiel:
      "Au niveau A2, les **consignes** de maths se précisent : on ne fait plus seulement additionner, on demande de **résoudre** (solve), **simplifier** (simplify), **arrondir** (round) ou **convertir** (convert). Reconnaître ces verbes, c'est comprendre exactement ce qu'un exercice attend.",
    formules: [
      { label: "Les verbes (1/2)", latex: "**subtract** soustraire · **multiply** multiplier · **divide** diviser · **round** arrondir · **compare** comparer" },
      { label: "Les verbes (2/2)", latex: "**solve** résoudre · **simplify** simplifier · **convert** convertir · **calculate** calculer · **check** vérifier" },
      { label: "Lire une consigne", latex: "« Solve the equation » = résous l'équation" },
      { label: "Arrondir", latex: "« Round to the nearest ten » = arrondis à la dizaine la plus proche" },
    ],
    reflexes: [
      { si: "une consigne dit « solve »", alors: "on me demande de résoudre (trouver l'inconnue)" },
      { si: "je vois « round »", alors: "j'arrondis (à la dizaine, à l'unité…)" },
      { si: "je vois « simplify »", alors: "je réduis la fraction ou l'expression" },
    ],
    pieges: [
      "Confondre « multiply » (multiplier, verbe) et « multiple » (un multiple, nom) : ce n'est pas le même mot.",
      "Croire que « round » veut seulement dire « rond » : en maths, round = arrondir.",
      "Confondre « divide » (l'ordre : divise) et « divided » (le participe : divided by).",
    ],
    reel: "En vrai, quand tu résous un problème de partage de letchis entre plusieurs personnes, tu fais du « divide » et du « check » sans le dire en anglais",
  },
  {
    id: "en_a2_expressions",
    emoji: "🟰",
    titre: "Les expressions maths · Maths expressions",
    domaine: "Langue des maths",
    essentiel:
      "Les énoncés de maths utilisent des **expressions** toutes faites : **la somme de** (the sum of), **la différence de**, **le produit de**, **le quotient de**. Chacune annonce une opération précise ; les repérer permet de traduire un problème en calcul.",
    formules: [
      { label: "Les opérations", latex: "**the sum of** la somme de · **the difference of** la différence de · **the product of** le produit de · **the quotient of** le quotient de" },
      { label: "Comparer & conclure", latex: "**equals** est égal à · **is greater than** est supérieur à · **is less than** est inférieur à · **the result is** le résultat est" },
      { label: "Lire un énoncé", latex: "« The sum of 3 and 4 is 7 » = la somme de 3 et 4 est 7" },
      { label: "Un produit", latex: "« The product of 2 and 5 equals 10 » = le produit de 2 et 5 est égal à 10" },
    ],
    reflexes: [
      { si: "je vois « the sum of »", alors: "c'est une addition (la somme)" },
      { si: "je vois « the product of »", alors: "c'est une multiplication (le produit)" },
      { si: "je lis un énoncé en anglais", alors: "je repère l'expression pour savoir quelle opération faire" },
    ],
    pieges: [
      "Confondre « sum » (la somme, addition) et « product » (le produit, multiplication) : deux opérations différentes.",
      "Confondre « difference » (soustraction) et « quotient » (division).",
      "Traduire « the result is » mot à mot « le résultat il est » : on dit « le résultat est ».",
    ],
    reel: "En vrai, quand tu calcules la somme des points d'un match de foot au stade de Saint-Denis, tu manipules « the sum of » et « the total » en direct",
  },
  // ── Nombres ────────────────────────────────────────────────────────────────
  {
    id: "en_a2_fractions",
    emoji: "🍰",
    titre: "Les fractions · Fractions",
    domaine: "Nombres",
    essentiel:
      "Le vocabulaire des **fractions** : le **numérateur** (numerator) au-dessus, le **dénominateur** (denominator) en dessous. On apprend à dire **un demi**, **un tiers**, **un quart**, et à rendre une fraction **irréductible**.",
    formules: [
      { label: "La fraction", latex: "**fraction** fraction · **numerator** numérateur · **denominator** dénominateur · **common denominator** dénominateur commun" },
      { label: "Les parts", latex: "**half** un demi · **third** un tiers · **quarter** un quart · **irreducible** irréductible" },
      { label: "Placer les termes", latex: "« The numerator is above the denominator » = le numérateur est au-dessus du dénominateur" },
      { label: "Dire une fraction", latex: "« one half, one third, one quarter » = un demi, un tiers, un quart" },
    ],
    reflexes: [
      { si: "je vois « numerator »", alors: "c'est le nombre du HAUT de la fraction" },
      { si: "je vois « denominator »", alors: "c'est le nombre du BAS de la fraction" },
      { si: "on me demande une fraction « irreducible »", alors: "je la simplifie au maximum" },
    ],
    pieges: [
      "Inverser numérateur et dénominateur : numerator = le haut, denominator = le bas.",
      "Confondre « quarter » (un quart) et le français « quart » : quarter s'écrit avec « er ».",
      "Croire que « half » fait « halfs » au pluriel : c'est « halves ».",
    ],
    reel: "En vrai, quand tu partages une tarte à l'ananas Victoria en quatre, chaque part est « one quarter » et deux parts font « one half » de la tarte",
  },
  // ── Géométrie ──────────────────────────────────────────────────────────────
  {
    id: "en_a2_geometry",
    emoji: "📐",
    titre: "La géométrie · Geometry",
    domaine: "Géométrie",
    essentiel:
      "La géométrie A2 va plus loin : on décrit les positions des droites (**parallèles**, **perpendiculaires**), les **angles droits**, les **diagonales**, la **symétrie** et les **axes**. Ces mots reviennent dans toutes les figures.",
    formules: [
      { label: "Positions & angles", latex: "**angle** angle · **right angle** angle droit · **parallel** parallèle · **perpendicular** perpendiculaire" },
      { label: "Autres éléments", latex: "**diagonal** diagonale · **axis** axe · **symmetry** symétrie · **polygon** polygone" },
      { label: "Décrire des droites", latex: "« Two parallel lines never meet » = deux droites parallèles ne se croisent jamais" },
      { label: "Un angle droit", latex: "« A square has four right angles » = un carré a quatre angles droits" },
    ],
    reflexes: [
      { si: "deux droites ne se croisent jamais", alors: "elles sont « parallel » (parallèles)" },
      { si: "deux droites forment un angle droit", alors: "elles sont « perpendicular »" },
      { si: "je vois « right angle »", alors: "c'est un angle de 90 degrés" },
    ],
    pieges: [
      "Croire que « right angle » veut dire « angle de droite » : right angle = angle droit (90°).",
      "Confondre « parallel » (parallèle) et « perpendicular » (perpendiculaire).",
      "Oublier que « axis » (axe) fait « axes » au pluriel.",
    ],
    reel: "En vrai, les rangées de cannes à sucre dans les champs du Sud sont « parallel », et les allées qui les coupent à angle droit sont « perpendicular » à ces rangées",
  },
  // ── Sport ──────────────────────────────────────────────────────────────────
  {
    id: "en_a2_sport_verbs",
    emoji: "🏃",
    titre: "Les gestes du sport · Sport verbs",
    domaine: "Sport",
    essentiel:
      "Les **actions** du sport : **courir** (run), **sauter** (jump), **lancer** (throw), **attraper** (catch), mais aussi **marquer** (score), **gagner** (win) et **s'entraîner** (train). De quoi raconter un match en anglais.",
    formules: [
      { label: "Les gestes", latex: "**run** courir · **jump** sauter · **throw** lancer · **catch** attraper · **kick** frapper (du pied)" },
      { label: "Compétition", latex: "**score** marquer · **win** gagner · **lose** perdre · **train** s'entraîner · **sprint** sprinter" },
      { label: "Raconter un match", latex: "« Our team won the match » = notre équipe a gagné le match" },
      { label: "Une capacité", latex: "« He can jump very high » = il sait sauter très haut" },
    ],
    reflexes: [
      { si: "je marque un point ou un but", alors: "j'emploie « score »" },
      { si: "je parle d'un entraînement", alors: "« train » (s'entraîner)" },
      { si: "je décris une action rapide", alors: "« sprint », « run », « jump »" },
    ],
    pieges: [
      "Confondre « win » (gagner un match) et « earn » (gagner de l'argent) : au sport, c'est win.",
      "Confondre « lose » (perdre) et « loose » (lâche, desserré) : lose n'a qu'un « o » au milieu.",
      "Croire que « kick » veut dire « donner un coup » en général : au foot, kick = frapper du pied.",
    ],
    reel: "En vrai, à l'entraînement de foot, quand tu essaies de « score a goal » ou de « catch the ball », tu emploies déjà les verbes du sport en anglais",
  },
  {
    id: "en_a2_sport_stats",
    emoji: "📊",
    titre: "Les stats du sport · Sport stats",
    domaine: "Sport",
    essentiel:
      "Pour analyser une performance, on utilise le vocabulaire des **statistiques** : le **score**, le **record**, la **moyenne** (average), le **classement** (ranking) et le **pourcentage**. C'est le langage des tableaux de résultats.",
    formules: [
      { label: "Le résultat", latex: "**score** score · **goal** but · **point** point · **record** record · **champion** champion" },
      { label: "L'analyse", latex: "**average** moyenne · **ranking** classement · **percentage** pourcentage · **total** total · **result** résultat" },
      { label: "Un record", latex: "« He broke the world record » = il a battu le record du monde" },
      { label: "Une moyenne", latex: "« The average score is fifteen » = la moyenne des scores est de quinze" },
    ],
    reflexes: [
      { si: "je calcule une moyenne", alors: "« average »" },
      { si: "je parle du meilleur temps jamais réalisé", alors: "« record »" },
      { si: "je situe une équipe dans le tableau", alors: "« ranking » (classement)" },
    ],
    pieges: [
      "Confondre « average » (la moyenne, qui se calcule) et « total » (la somme, qui s'additionne).",
      "Prononcer « champion » à la française : on dit « tcham-pieune ».",
      "Croire que « score » veut seulement dire « score de foot » : c'est aussi une note ou un total de points.",
    ],
    reel: "En vrai, quand tu suis le classement du Grand Raid, tu lis des « rankings », des « records » et des « averages » de temps en anglais dans les tableaux",
  },
  {
    id: "en_a2_sport_physics",
    emoji: "🚀",
    titre: "La physique du sport · Sport physics",
    domaine: "Sport",
    essentiel:
      "Le sport, c'est aussi de la **physique** : la **vitesse** (speed), la **distance**, le **temps**, la **hauteur** (height), la **force** et l'**accélération**. Ces mots relient l'EPS et les sciences en anglais.",
    formules: [
      { label: "Mesures", latex: "**speed** vitesse · **distance** distance · **time** temps · **weight** poids · **height** hauteur" },
      { label: "Physique", latex: "**force** force · **acceleration** accélération · **energy** énergie · **power** puissance · **velocity** vélocité" },
      { label: "Une formule clé", latex: "« Speed is distance divided by time » = la vitesse est la distance divisée par le temps" },
      { label: "Décrire un effort", latex: "« The runner needs more power » = le coureur a besoin de plus de puissance" },
    ],
    reflexes: [
      { si: "je calcule une vitesse", alors: "« speed » = distance divided by time" },
      { si: "je parle de la masse d'un objet", alors: "« weight » (poids)" },
      { si: "je décris un démarrage rapide", alors: "« acceleration »" },
    ],
    pieges: [
      "Confondre « speed » (vitesse) et « velocity » (vitesse avec une direction) : proches mais pas identiques.",
      "Croire que « power » veut seulement dire « pouvoir » : en physique, power = la puissance.",
      "Confondre « weight » (poids) et « wait » (attendre) : même prononciation, sens différent.",
    ],
    reel: "En vrai, quand tu chronomètres ta descente à vélo sur la route du volcan, tu mesures « speed », « distance » et « time » comme en cours de physique",
  },
  // ── Sciences ───────────────────────────────────────────────────────────────
  {
    id: "en_a2_science_biology",
    emoji: "🧬",
    titre: "La biologie · Biology",
    domaine: "Sciences",
    essentiel:
      "Le vocabulaire de la **biologie** : la **cellule** et son **noyau** (nucleus), les **organes** et l'**organisme**, puis les grandes fonctions du vivant : **photosynthèse**, **digestion**, **respiration**, **reproduction**.",
    formules: [
      { label: "Le vivant (1/2)", latex: "**cell** cellule · **nucleus** noyau · **tissue** tissu · **organ** organe · **organism** organisme" },
      { label: "Les fonctions", latex: "**reproduction** reproduction · **photosynthesis** photosynthèse · **digestion** digestion · **respiration** respiration · **evolution** évolution" },
      { label: "La photosynthèse", latex: "« Plants make food by photosynthesis » = les plantes fabriquent leur nourriture par la photosynthèse" },
      { label: "La cellule", latex: "« The cell is the unit of life » = la cellule est l'unité du vivant" },
    ],
    reflexes: [
      { si: "je parle du plus petit élément du vivant", alors: "« cell » (cellule)" },
      { si: "je parle de comment les plantes produisent leur énergie", alors: "« photosynthesis »" },
      { si: "je parle de la respiration", alors: "« respiration »" },
    ],
    pieges: [
      "Confondre « cell » (cellule) et « cell » (téléphone, cellule de prison) : le contexte SVT tranche.",
      "Croire que « organ » (organe) et « organism » (organisme) sont le même mot : l'organisme contient des organes.",
      "Mal placer l'accent de « photosynthesis » : il tombe sur la syllabe « syn ».",
    ],
    reel: "En vrai, quand tu observes un plant de géranium bourbon qui pousse au soleil, tu vois la « photosynthesis » et la « respiration » à l'œuvre",
  },
  {
    id: "en_a2_science_chemistry",
    emoji: "🧪",
    titre: "La chimie · Chemistry",
    domaine: "Sciences",
    essentiel:
      "La **chimie** en anglais : l'**atome** (atom), la **molécule**, l'**élément**, les **mélanges** (mixture) et **solutions**, et les trois états de la matière : **solide** (solid), **liquide** (liquid), **gaz** (gas).",
    formules: [
      { label: "La matière", latex: "**atom** atome · **molecule** molécule · **element** élément · **mixture** mélange · **solution** solution" },
      { label: "États & natures", latex: "**acid** acide · **metal** métal · **gas** gaz · **solid** solide · **liquid** liquide" },
      { label: "Un état", latex: "« Water is a liquid » = l'eau est un liquide" },
      { label: "Une molécule", latex: "« A molecule is made of atoms » = une molécule est faite d'atomes" },
    ],
    reflexes: [
      { si: "je parle de la plus petite particule d'un élément", alors: "« atom »" },
      { si: "je parle de plusieurs atomes liés", alors: "« molecule »" },
      { si: "je classe un état de la matière", alors: "« solid », « liquid » ou « gas »" },
    ],
    pieges: [
      "Confondre « mixture » (un mélange) et « solution » (tout est dissous).",
      "Croire que « gas » veut dire « essence » : en chimie, gas = le gaz (état) ; l'essence se dit petrol.",
      "Écrire « acide » à la française : en anglais, acid s'écrit sans « e » final.",
    ],
    reel: "En vrai, quand tu prépares un sirop en dissolvant du sucre dans l'eau, tu fabriques une « solution » où le sucre est le « solid » dissous",
  },
  {
    id: "en_a2_science_physics",
    emoji: "⚡",
    titre: "La physique · Physics",
    domaine: "Sciences",
    essentiel:
      "La **physique** en anglais : la **lumière** (light), le **son** (sound), les **ondes** (wave), la **température**, la **pression**, et l'électricité : **courant** (current), **circuit**, **tension** (voltage).",
    formules: [
      { label: "Ondes & mesures", latex: "**light** lumière · **sound** son · **wave** onde · **temperature** température · **pressure** pression" },
      { label: "Électricité", latex: "**current** courant · **voltage** tension · **magnet** aimant · **circuit** circuit · **energy** énergie" },
      { label: "Lumière et son", latex: "« Light travels faster than sound » = la lumière va plus vite que le son" },
      { label: "Un circuit", latex: "« The circuit needs a current » = le circuit a besoin d'un courant" },
    ],
    reflexes: [
      { si: "je parle de ce qui éclaire", alors: "« light »" },
      { si: "je parle de ce qui circule dans un fil électrique", alors: "« current » (courant)" },
      { si: "je parle de la mesure du chaud et du froid", alors: "« temperature »" },
    ],
    pieges: [
      "Confondre « current » (le courant électrique) et « current » (actuel) : le contexte physique tranche.",
      "Confondre « light » (lumière) et « light » (léger) : deux sens pour le même mot.",
      "Bien distinguer « sound » (le son) de « wave » (l'onde) : le son se propage par des ondes.",
    ],
    reel: "En vrai, quand tu entends le tonnerre après avoir vu l'éclair pendant un orage à Cilaos, tu vérifies que « light » va plus vite que « sound » dans l'air",
  },
  // ── Économie & gestion ─────────────────────────────────────────────────────
  {
    id: "en_a2_economy_basics",
    emoji: "📈",
    titre: "L'économie · Economy",
    domaine: "Économie & gestion",
    essentiel:
      "Les bases de l'**économie** : le **bénéfice** (profit) et la **perte** (loss), l'**impôt** (tax), la **remise** (discount), le **salaire** (salary) et la **facture** (invoice). Le vocabulaire d'une entreprise ou d'un commerce.",
    formules: [
      { label: "Gagner ou perdre", latex: "**profit** bénéfice · **loss** perte · **tax** impôt · **discount** remise · **interest** intérêt" },
      { label: "Payer & être payé", latex: "**salary** salaire · **invoice** facture · **deposit** dépôt · **refund** remboursement · **fee** frais" },
      { label: "Un bénéfice", latex: "« The shop made a profit » = le magasin a fait un bénéfice" },
      { label: "Une remise", latex: "« There is a 20% discount » = il y a une remise de 20%" },
    ],
    reflexes: [
      { si: "une entreprise gagne de l'argent", alors: "elle fait un « profit »" },
      { si: "il y a une baisse de prix", alors: "« discount » (remise)" },
      { si: "je parle de l'argent versé pour le travail", alors: "« salary »" },
    ],
    pieges: [
      "Confondre « profit » (bénéfice) et « benefit » (avantage, allocation) : au sens comptable, c'est profit.",
      "Croire que « fee » veut dire « fée » : fee = des frais. Et attention à « free » (gratuit).",
      "Confondre « loss » (la perte, nom) et « lost » (perdu, participe).",
    ],
    reel: "En vrai, quand un marchand du marché de Saint-Paul baisse son prix en fin de journée, il te fait un « discount » pour éviter une « loss » sur ses invendus",
  },
  {
    id: "en_a2_family_finance",
    emoji: "🏦",
    titre: "Les finances de la famille · Family finance",
    domaine: "Économie & gestion",
    essentiel:
      "Gérer l'argent d'un foyer : l'**épargne** (savings), les **dépenses** (expenses), le **prêt** (loan), l'**assurance** (insurance) et les **abonnements** (subscriptions). On apprend à parler d'un **compte** (account) et d'un **virement**.",
    formules: [
      { label: "Compte & argent", latex: "**savings** épargne · **expense** dépense · **account** compte · **credit** crédit · **transfer** virement" },
      { label: "Engagements", latex: "**loan** prêt · **mortgage** prêt immobilier · **insurance** assurance · **subscription** abonnement · **utility bill** facture d'énergie" },
      { label: "Épargner", latex: "« I put money into my savings account » = je mets de l'argent sur mon compte épargne" },
      { label: "Une facture", latex: "« We pay the bill every month » = nous payons la facture chaque mois" },
    ],
    reflexes: [
      { si: "je mets de l'argent de côté", alors: "« savings » (épargne)" },
      { si: "j'emprunte de l'argent", alors: "« loan » (prêt)" },
      { si: "je paie chaque mois pour un service", alors: "« subscription » (abonnement)" },
    ],
    pieges: [
      "Écrire « saving » au singulier pour l'épargne : au sens argent de côté, on dit savings (avec un « s »).",
      "Croire que « credit » ne désigne qu'un crédit scolaire : ici c'est le crédit bancaire.",
      "Confondre « expense » (une dépense, nom) et « expensive » (cher, adjectif).",
    ],
    reel: "En vrai, aider à préparer le budget de la maison, c'est jongler entre « savings », « expenses » et « bills » chaque mois",
  },
  {
    id: "en_a2_percentages_eco",
    emoji: "💹",
    titre: "Les pourcentages · Percentages",
    domaine: "Économie & gestion",
    essentiel:
      "Les **pourcentages** dans la vie économique : une **augmentation** (increase), une **diminution** (decrease), une **réduction**, un **taux** (rate). On distingue le montant **brut** (gross) du montant **net**.",
    formules: [
      { label: "Variations", latex: "**percentage** pourcentage · **rate** taux · **increase** augmentation · **decrease** diminution · **reduction** réduction" },
      { label: "Montants", latex: "**net** net · **gross** brut · **total** total · **VAT** TVA · **balance** solde" },
      { label: "Une hausse", latex: "« Prices increased by 10% » = les prix ont augmenté de 10%" },
      { label: "Brut et net", latex: "« The gross salary is before tax » = le salaire brut est avant impôt" },
    ],
    reflexes: [
      { si: "un prix monte", alors: "« increase » (augmentation)" },
      { si: "un prix baisse", alors: "« decrease » ou « reduction »" },
      { si: "je parle du montant avant impôt", alors: "« gross » (brut) ; après, « net »" },
    ],
    pieges: [
      "Confondre « increase » (hausse) et « decrease » (baisse) : in- monte, de- descend.",
      "Confondre « gross » (brut, avant déductions) et « net » (après déductions).",
      "Croire que « rate » veut dire « rat » : rate = un taux.",
    ],
    reel: "En vrai, quand un magasin affiche « -30% » pendant les soldes à Saint-Pierre, il annonce une « reduction » et un nouveau prix « net » en caisse",
  },
  // ── Géographie & voyage ────────────────────────────────────────────────────
  {
    id: "en_a2_travel",
    emoji: "✈️",
    titre: "Voyager · Travel",
    domaine: "Géographie & voyage",
    essentiel:
      "Le vocabulaire du **voyage** : l'**aéroport** (airport), le **vol** (flight), le **billet** (ticket), le **passeport**, les **bagages** (luggage) et l'**hôtel**. De quoi se débrouiller en déplacement.",
    formules: [
      { label: "À l'aéroport", latex: "**airport** aéroport · **flight** vol · **ticket** billet · **passport** passeport · **luggage** bagages" },
      { label: "Se déplacer", latex: "**hotel** hôtel · **train** train · **bus** bus · **taxi** taxi · **map** carte" },
      { label: "Demander son chemin", latex: "« Where is the airport? » = où est l'aéroport ?" },
      { label: "Réserver", latex: "« I booked a flight to Paris » = j'ai réservé un vol pour Paris" },
    ],
    reflexes: [
      { si: "je prends l'avion", alors: "« flight » (le vol), « airport » (l'aéroport)" },
      { si: "je voyage à l'étranger", alors: "« passport »" },
      { si: "je cherche mon chemin", alors: "« map » (une carte)" },
    ],
    pieges: [
      "Mettre « luggage » au pluriel : ce mot est invariable, on ne dit pas « luggages ».",
      "Croire que « travel » et « trip » sont pareils : travel = voyager (verbe), a trip = un voyage (nom).",
      "Confondre « ticket » (billet de transport) et « bill » (l'addition au restaurant).",
    ],
    reel: "En vrai, quand tu prends l'avion pour Maurice depuis Roland-Garros, tu passes par « airport », « passport », « luggage » et « flight » avant le décollage",
  },
  {
    id: "en_a2_geography",
    emoji: "🌐",
    titre: "La géographie · Geography",
    domaine: "Géographie & voyage",
    essentiel:
      "La **géographie** A2 : le **continent**, la **capitale** (capital), la **côte** (coast), le **climat** (climate), la **population** et la **frontière** (border). On décrit un territoire avec plus de précision.",
    formules: [
      { label: "Le territoire", latex: "**continent** continent · **capital** capitale · **coast** côte · **border** frontière · **population** population" },
      { label: "Reliefs & climat", latex: "**volcano** volcan · **coral reef** récif corallien · **lagoon** lagon · **climate** climat · **latitude** latitude" },
      { label: "Une capitale", latex: "« Paris is the capital of France » = Paris est la capitale de la France" },
      { label: "Un climat", latex: "« The island has a warm climate » = l'île a un climat chaud" },
    ],
    reflexes: [
      { si: "je nomme la ville principale d'un pays", alors: "« capital » (capitale)" },
      { si: "je décris le bord de mer", alors: "« coast » (côte)" },
      { si: "je parle du temps qu'il fait sur l'année", alors: "« climate » (climat)" },
    ],
    pieges: [
      "Confondre « capital » (capitale) et « capital » (une majuscule) : le contexte tranche.",
      "Confondre « coast » (la côte) et « cost » (le coût) : prononciation et sens différents.",
      "Confondre « climate » (le climat, sur l'année) et « weather » (le temps d'un jour).",
    ],
    reel: "En vrai, La Réunion a une « coast » bordée de « coral reefs » et de « lagoons », et un « climate » tropical : toute la géo A2 sous tes yeux",
  },
  {
    id: "en_a2_directions",
    emoji: "🧭",
    titre: "S'orienter · Directions",
    domaine: "Géographie & voyage",
    essentiel:
      "S'**orienter** et **guider** quelqu'un : les points cardinaux (**north**, **south**, **east**, **west**), la **gauche** et la **droite**, et les repères **near**, **far**, **between**, **opposite**.",
    formules: [
      { label: "Les points cardinaux", latex: "**north** nord · **south** sud · **east** est · **west** ouest" },
      { label: "Se repérer", latex: "**left** gauche · **right** droite · **near** près · **far** loin · **between** entre · **opposite** en face" },
      { label: "Guider quelqu'un", latex: "« Turn left, then go straight » = tourne à gauche, puis va tout droit" },
      { label: "Situer un lieu", latex: "« The shop is opposite the school » = le magasin est en face de l'école" },
    ],
    reflexes: [
      { si: "je donne un cap", alors: "north, south, east, west" },
      { si: "j'indique un chemin", alors: "« turn left », « turn right », « go straight »" },
      { si: "je situe un lieu par rapport à un autre", alors: "« near », « far », « opposite », « between »" },
    ],
    pieges: [
      "Confondre « left » (à gauche) et « left » (le passé de leave, quitté) : le contexte tranche.",
      "Confondre « east » (l'est) et le verbe « is » : east se prononce « iist ».",
      "Croire que « opposite » veut dire « opposé » seulement : ici, opposite = en face de.",
    ],
    reel: "En vrai, pour expliquer à un touriste comment aller du marché à la plage à Saint-Gilles, tu enchaînes « turn right », « go straight » et « it's near the sea » jusqu'au lagon",
  },
  // ── Vie quotidienne ────────────────────────────────────────────────────────
  {
    id: "en_a2_home",
    emoji: "🏠",
    titre: "La maison · Home",
    domaine: "Vie quotidienne",
    essentiel:
      "Décrire la **maison** : les pièces (**chambre**, **cuisine**, **salle de bain**, **salon**) et les éléments (**porte**, **fenêtre**, **lit**, **toit**). On situe chaque pièce par rapport aux autres.",
    formules: [
      { label: "Les pièces", latex: "**bedroom** chambre · **kitchen** cuisine · **bathroom** salle de bain · **living room** salon" },
      { label: "Les éléments", latex: "**door** porte · **window** fenêtre · **bed** lit · **sofa** canapé · **floor** sol · **roof** toit" },
      { label: "Situer une pièce", latex: "« The kitchen is next to the living room » = la cuisine est à côté du salon" },
      { label: "Compter les pièces", latex: "« There are two bedrooms » = il y a deux chambres" },
    ],
    reflexes: [
      { si: "je nomme la pièce où l'on cuisine", alors: "« kitchen »" },
      { si: "je nomme la pièce où l'on dort", alors: "« bedroom »" },
      { si: "je situe une pièce", alors: "« next to », « between », « upstairs »" },
    ],
    pieges: [
      "Confondre « bedroom » (chambre) et « bathroom » (salle de bain) : bed = lit, bath = bain.",
      "Écrire « living room » en un seul mot : ça s'écrit en deux mots.",
      "Oublier que « floor » veut dire à la fois « le sol » et « un étage » selon le contexte.",
    ],
    reel: "En vrai, quand tu décris ta case à un correspondant anglais, tu nommes « kitchen », « bedroom », « bathroom » et le « roof » en tôle",
  },
  {
    id: "en_a2_daily_verbs",
    emoji: "🗓️",
    titre: "Les verbes du quotidien · Daily verbs",
    domaine: "Vie quotidienne",
    essentiel:
      "Les **verbes du quotidien** à l'infinitif : **to eat**, **to drink**, **to sleep**, **to work**, **to play**, **to read**… Ils servent à raconter sa journée et ses habitudes au présent simple.",
    formules: [
      { label: "Les verbes (1/2)", latex: "**to eat** manger · **to drink** boire · **to sleep** dormir · **to work** travailler · **to play** jouer" },
      { label: "Les verbes (2/2)", latex: "**to read** lire · **to write** écrire · **to run** courir · **to walk** marcher · **to speak** parler" },
      { label: "Raconter sa journée", latex: "« I get up, then I eat breakfast » = je me lève, puis je prends le petit-déjeuner" },
      { label: "Dire ses goûts", latex: "« She likes to read and to write » = elle aime lire et écrire" },
    ],
    reflexes: [
      { si: "je décris ma journée", alors: "j'enchaîne les verbes : eat, work, play, sleep" },
      { si: "je cite un verbe à l'infinitif", alors: "« to » + verbe : to eat, to sleep" },
      { si: "je parle d'une habitude", alors: "présent simple : I eat, she eats" },
    ],
    pieges: [
      "Oublier le « s » à la 3e personne : « she eats », pas « she eat ».",
      "Confondre « read » présent (« riid ») et « read » passé (« red ») : même orthographe, prononciation différente.",
      "Confondre « walk » (marcher) et « work » (travailler) : une lettre change tout.",
    ],
    reel: "En vrai, raconter ta journée type en anglais — I eat, I go to school, I play, I sleep — c'est déjà réviser tous les verbes du quotidien",
  },
  {
    id: "en_a2_adjectives",
    emoji: "🔡",
    titre: "Les adjectifs · Adjectives",
    domaine: "Vie quotidienne",
    essentiel:
      "Les **adjectifs** de description : **grand** (big) et **petit** (small), **chaud** (hot) et **froid** (cold), **rapide** (fast) et **lent** (slow). En anglais, l'adjectif se place **avant** le nom.",
    formules: [
      { label: "Tailles & âges", latex: "**big** grand · **small** petit · **tall** grand (de taille) · **short** court · **old** vieux · **young** jeune" },
      { label: "Sensations & vitesse", latex: "**hot** chaud · **cold** froid · **fast** rapide · **slow** lent" },
      { label: "Décrire un contraste", latex: "« The elephant is big and the mouse is small » = l'éléphant est grand et la souris est petite" },
      { label: "Placer l'adjectif", latex: "« a fast red car » = une voiture rouge rapide (adjectif AVANT le nom)" },
    ],
    reflexes: [
      { si: "je décris quelque chose", alors: "l'adjectif se place AVANT le nom : a big house" },
      { si: "je compare deux tailles", alors: "big/small, tall/short" },
      { si: "je décris une température", alors: "hot/cold" },
    ],
    pieges: [
      "Placer l'adjectif après le nom comme en français : on dit « a red car », pas « a car red ».",
      "Confondre « big » (grand en taille ou en volume) et « tall » (grand en hauteur, pour une personne).",
      "L'adjectif anglais ne s'accorde jamais : « big houses », pas « bigs houses ».",
    ],
    reel: "En vrai, pour décrire le Piton de la Fournaise, tu dis qu'il est « big », « hot » et parfois « fast » quand la lave descend vite",
  },
  {
    id: "en_a2_jobs",
    emoji: "💼",
    titre: "Les métiers · Jobs",
    domaine: "Vie quotidienne",
    essentiel:
      "Les **métiers** : **enseignant** (teacher), **médecin** (doctor), **ingénieur** (engineer), **infirmier** (nurse), **agriculteur** (farmer)… On dit le métier de quelqu'un avec « She is a… » et son projet avec « I want to be a… ».",
    formules: [
      { label: "Les métiers (1/2)", latex: "**teacher** enseignant · **doctor** médecin · **engineer** ingénieur · **nurse** infirmier · **scientist** scientifique" },
      { label: "Les métiers (2/2)", latex: "**farmer** agriculteur · **police officer** policier · **chef** cuisinier · **driver** chauffeur · **student** élève" },
      { label: "Dire un métier", latex: "« She is a doctor » = elle est médecin (avec « a » en anglais)" },
      { label: "Parler de son avenir", latex: "« I want to be an engineer » = je veux devenir ingénieur" },
    ],
    reflexes: [
      { si: "je dis le métier de quelqu'un", alors: "« She is a doctor » (avec « a »)" },
      { si: "je parle de mon avenir", alors: "« I want to be a… »" },
      { si: "je nomme un métier de la santé", alors: "doctor, nurse" },
    ],
    pieges: [
      "Oublier l'article « a » : en anglais « He is a teacher », alors qu'en français « il est enseignant » (sans article).",
      "Confondre « chef » (cuisinier) et « chief » (chef, responsable) : chef = celui qui cuisine.",
      "Croire que « student » ne désigne que l'université : en anglais, student vaut aussi pour l'élève.",
    ],
    reel: "En vrai, quand tu demandes leur métier à tes proches — My mother is a nurse, my uncle is a farmer — tu révises les jobs en anglais",
  },
];

// Banque "fixed" imprimable groupée par notion (source des tests de survie).
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of englishA2QuestionBank) {
  (BANQUES[item.notionId] ??= []).push(item);
}

export const KIT_ANGLAIS_A2: KitData = {
  slug: "anglais-a2",
  titre: "Guide de survie · Anglais A2",
  baseline:
    "Tout l'anglais du niveau A2 en 20 fiches : les mots et phrases qui sauvent, les réflexes, les faux-amis à éviter — et un test corrigé par fiche. De l'anglais à travers les maths, les sciences, l'économie, la géographie et la vie quotidienne, un cran au-dessus de l'A1. À imprimer, à glisser dans le classeur.",
  matiere: "english-maths",
  classeLabel: "A2",
  coachClasse: "a2",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
