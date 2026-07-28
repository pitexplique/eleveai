// ─── Guide de survie · Anglais B1 (English Maths — CLIL) ─────────────────────
// B1 = niveau intermédiaire : anglais À TRAVERS les matières, avec un
// vocabulaire abstrait (algèbre, raisonnement, sciences, économie, géographie).
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/english/b1/notions.ts
// - checklists     = micro-compétences de microSkills.ts (traduire EN↔FR)
// - test de survie = items "fixed" imprimables de englishB1QuestionBank
//   (QCM en↔fr ; les micros « listen » portent un audioSrc → exclus par
//   testDeSurvie). Mesuré : chaque notion a ≥16 items imprimables, aucune
//   banque à compléter.
// ⚠️ Bloc « formules » = LES MOTS & PHRASES QUI SAUVENT (vocabulaire bilingue +
// structures, en toutes lettres, ZÉRO LaTeX). Condensés écrits et vérifiés à la
// main (orthographe britannique, périmètre B1, faux-amis). 16 NOTIONS.
// matiere = "english-maths", coachClasse = "b1".

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/english/b1/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { englishB1QuestionBank } from "@/lib/tutor-v4/questionBank/b1/english";
import type { KitData, KitNotion } from "@/components/kit/types";

const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  // ── Langue des maths ───────────────────────────────────────────────────────
  {
    id: "en_b1_verbs",
    emoji: "🧠",
    titre: "Les verbes du raisonnement · Maths verbs",
    domaine: "Langue des maths",
    essentiel:
      "Au niveau B1, les consignes de maths deviennent **abstraites** : on demande d'**estimer** (estimate), de **justifier** (justify), de **prouver** (prove) ou de **démontrer** (demonstrate). Ce sont les verbes du **raisonnement**, ceux d'un devoir rédigé.",
    formules: [
      { label: "Raisonner (1/2)", latex: "**estimate** estimer · **explain** expliquer · **justify** justifier · **prove** prouver · **demonstrate** démontrer" },
      { label: "Manipuler (2/2)", latex: "**expand** développer · **factorise** factoriser · **simplify** simplifier · **substitute** substituer · **evaluate** évaluer" },
      { label: "Une consigne type", latex: "« Justify your answer » = justifie ta réponse" },
      { label: "Démontrer", latex: "« Prove that the result is even » = démontre que le résultat est pair" },
    ],
    reflexes: [
      { si: "je vois « justify » ou « explain »", alors: "je rédige une phrase de raisonnement, pas juste un résultat" },
      { si: "je vois « expand »", alors: "je développe (j'enlève les parenthèses)" },
      { si: "je vois « factorise »", alors: "je mets en facteur" },
    ],
    pieges: [
      "Confondre « expand » (développer) et « expend » (dépenser) : en algèbre, c'est expand.",
      "Orthographe britannique : « factorise » et « analyse » avec un « s » (pas -ize à l'américaine).",
      "Croire que « prove » et « test » sont pareils : prove = démontrer rigoureusement.",
    ],
    reel: "En vrai, quand tu expliques à un camarade pourquoi le sentier du Piton passe par tel col, tu fais du « justify » et du « explain » comme dans un devoir de maths en anglais",
  },
  {
    id: "en_b1_algebra",
    emoji: "🔣",
    titre: "L'algèbre · Algebra",
    domaine: "Langue des maths",
    essentiel:
      "L'**algèbre** en anglais : l'**équation** (equation), la **variable**, le **coefficient**, mais aussi l'**inégalité** (inequality) et la **fonction** (function). Le vocabulaire pour lire et écrire une expression.",
    formules: [
      { label: "Les objets (1/2)", latex: "**equation** équation · **variable** variable · **coefficient** coefficient · **expression** expression" },
      { label: "Les objets (2/2)", latex: "**inequality** inégalité · **solution** solution · **formula** formule · **function** fonction" },
      { label: "Résoudre", latex: "« Solve the equation for x » = résous l'équation d'inconnue x" },
      { label: "Une fonction", latex: "« The function of x » = la fonction de x" },
    ],
    reflexes: [
      { si: "je vois « inequality »", alors: "il y a un signe < ou > (pas =)" },
      { si: "je vois « the coefficient of x »", alors: "c'est le nombre devant x" },
      { si: "on me demande « the solution »", alors: "c'est la valeur qui vérifie l'équation" },
    ],
    pieges: [
      "Le pluriel de « formula » est « formulae » (ou formulas) ; celui de « function » est « functions ».",
      "Confondre « expression » (sans signe égal) et « equation » (avec un signe égal).",
      "Croire que « variable » n'a qu'un sens courant : en algèbre, c'est l'inconnue (souvent x).",
    ],
    reel: "En vrai, quand tu calcules combien de sacs de ciment il faut pour un mur selon sa longueur, tu écris sans le savoir une « formula » avec une « variable » en anglais",
  },
  {
    id: "en_b1_statistics",
    emoji: "📊",
    titre: "Les statistiques · Statistics",
    domaine: "Statistiques",
    essentiel:
      "Les **statistiques** en anglais : la **moyenne** (mean), la **médiane** (median), le **mode**, l'**étendue** (range) et la **fréquence**. On parle aussi de **données** (data) et de **probabilité**.",
    formules: [
      { label: "Les indicateurs", latex: "**mean** moyenne · **median** médiane · **mode** mode · **range** étendue · **frequency** fréquence" },
      { label: "Les données", latex: "**data** données · **sample** échantillon · **probability** probabilité" },
      { label: "Calculer une moyenne", latex: "« The mean of the data is twelve » = la moyenne des données est douze" },
      { label: "Une probabilité", latex: "« The probability is one in six » = la probabilité est de une chance sur six" },
    ],
    reflexes: [
      { si: "je cherche la valeur centrale d'une série ordonnée", alors: "c'est la « median » (médiane)" },
      { si: "je calcule la somme divisée par le nombre", alors: "c'est le « mean » (moyenne)" },
      { si: "je vois « range »", alors: "c'est l'étendue (le maximum moins le minimum)" },
    ],
    pieges: [
      "Confondre « mean » (la moyenne) et « median » (la médiane) : deux indicateurs différents.",
      "« data » est un pluriel : on peut dire « the data are… ».",
      "Croire que « range » veut seulement dire « gamme » : en statistiques, range = l'étendue.",
    ],
    reel: "En vrai, quand tu compares les températures relevées sur une semaine à Cilaos, tu calcules leur « mean », leur « range » et parfois leur « median » comme en cours de stats",
  },
  {
    id: "en_b1_reasoning",
    emoji: "🔗",
    titre: "Raisonner & démontrer · Reasoning",
    domaine: "Langue des maths",
    essentiel:
      "Pour **rédiger** un raisonnement en anglais, on utilise des **connecteurs logiques** : **therefore** (donc), **given that** (étant donné que), **it follows that** (il s'ensuit que), **if and only if** (si et seulement si). Ce sont les charnières d'une démonstration.",
    formules: [
      { label: "Poser les données", latex: "**let x be** soit x · **given that** étant donné que · **we know that** on sait que" },
      { label: "Conclure", latex: "**therefore** donc · **it follows that** il s'ensuit que · **which gives** ce qui donne · **if and only if** si et seulement si" },
      { label: "Enchaîner", latex: "« We know that x = 2, therefore… » = on sait que x = 2, donc…" },
      { label: "Une équivalence", latex: "« A if and only if B » = A si et seulement si B" },
    ],
    reflexes: [
      { si: "je conclus une démonstration", alors: "j'écris « therefore » ou « it follows that »" },
      { si: "je pose une hypothèse", alors: "« given that » ou « we know that »" },
      { si: "je nomme une inconnue", alors: "« let x be… »" },
    ],
    pieges: [
      "Confondre « therefore » (donc, la conclusion) et « because » (parce que, la cause).",
      "Traduire « if and only if » par un simple « if » : c'est une équivalence, pas une simple condition.",
      "Traduire « let x be » mot à mot : cela veut dire « soit x », pas « laisse x être ».",
    ],
    reel: "En vrai, quand tu expliques pourquoi il faut partir tôt pour la Fournaise — given that la brume monte l'après-midi, therefore on part à l'aube — tu raisonnes déjà en anglais",
  },
  // ── Sport ──────────────────────────────────────────────────────────────────
  {
    id: "en_b1_sport_verbs",
    emoji: "🏃",
    titre: "Analyser le sport · Sport verbs",
    domaine: "Sport",
    essentiel:
      "Le sport de haut niveau, c'est de la **donnée** : on demande d'**analyser** (analyse), de **mesurer** (measure), de **comparer** (compare), d'**estimer** (estimate) et de **représenter** (plot) des performances.",
    formules: [
      { label: "Traiter les données (1/2)", latex: "**analyse** analyser · **measure** mesurer · **compare** comparer · **estimate** estimer · **calculate** calculer" },
      { label: "Traiter les données (2/2)", latex: "**convert** convertir · **plot** placer (un point) · **represent** représenter · **record** enregistrer · **compute** calculer" },
      { label: "Une consigne", latex: "« Analyse the runner's data » = analyse les données du coureur" },
      { label: "Tracer", latex: "« Plot the speed on the graph » = place la vitesse sur le graphique" },
    ],
    reflexes: [
      { si: "je vois « plot »", alors: "je place des points sur un graphique" },
      { si: "je vois « analyse »", alors: "j'étudie les données en détail" },
      { si: "je vois « convert »", alors: "je change d'unité (des km/h en m/s…)" },
    ],
    pieges: [
      "Orthographe britannique : « analyse » avec un « s » (pas analyze).",
      "Confondre « plot » (placer un point) et « plan » : plot = reporter sur un graphique.",
      "Confondre « record » (enregistrer, verbe) et « record » (un record, nom) : l'accent change de place.",
    ],
    reel: "En vrai, quand tu notes tes temps de course sur plusieurs semaines pour voir si tu progresses, tu fais du « record », du « compare » et du « analyse » en anglais",
  },
  {
    id: "en_b1_sport_physics",
    emoji: "🚀",
    titre: "La physique du sport · Sport physics",
    domaine: "Sport",
    essentiel:
      "Analyser un mouvement, c'est de la **physique** avancée : la **vitesse vectorielle** (velocity), l'**accélération**, la **quantité de mouvement** (momentum), le **déplacement** (displacement) et la **trajectoire**.",
    formules: [
      { label: "Le mouvement", latex: "**velocity** vitesse (vecteur) · **acceleration** accélération · **momentum** quantité de mouvement · **displacement** déplacement · **trajectory** trajectoire" },
      { label: "Ondes & forces", latex: "**frequency** fréquence · **amplitude** amplitude · **resistance** résistance" },
      { label: "Décrire un lancer", latex: "« The ball follows a curved trajectory » = le ballon suit une trajectoire courbe" },
      { label: "Vitesse vectorielle", latex: "« Velocity has a direction » = la vélocité a une direction" },
    ],
    reflexes: [
      { si: "je parle de la vitesse AVEC sa direction", alors: "« velocity » (pas juste speed)" },
      { si: "je parle du chemin suivi par un projectile", alors: "« trajectory »" },
      { si: "je parle de la masse fois la vitesse", alors: "« momentum » (quantité de mouvement)" },
    ],
    pieges: [
      "Confondre « speed » (vitesse, une valeur) et « velocity » (vitesse vectorielle, avec une direction).",
      "Confondre « displacement » (déplacement à vol d'oiseau) et « distance » (chemin réellement parcouru).",
      "Croire que « momentum » veut dire « moment » : c'est la quantité de mouvement.",
    ],
    reel: "En vrai, quand tu regardes un surfeur négocier une vague à Saint-Leu, sa « trajectory », sa « velocity » et son « momentum » sont exactement le vocabulaire de la physique en anglais",
  },
  {
    id: "en_b1_sport_stats",
    emoji: "📈",
    titre: "Les stats du sport · Sport stats",
    domaine: "Sport",
    essentiel:
      "Analyser des performances : la **moyenne** (mean), la **médiane**, la **variance**, l'**écart-type** (deviation), le **rapport** (ratio) et la **proportion**. Le langage des tableaux de résultats sportifs.",
    formules: [
      { label: "Position", latex: "**mean** moyenne · **median** médiane · **ratio** rapport · **proportion** proportion" },
      { label: "Dispersion", latex: "**variance** variance · **deviation** écart-type · **sample** échantillon · **distribution** distribution" },
      { label: "Comparer", latex: "« The ratio is two to one » = le rapport est de deux pour un" },
      { label: "La dispersion", latex: "« A small deviation means regular results » = un faible écart-type indique des résultats réguliers" },
    ],
    reflexes: [
      { si: "je mesure la dispersion des résultats", alors: "« deviation » (écart-type)" },
      { si: "je compare deux quantités", alors: "« ratio » (rapport)" },
      { si: "je prends un sous-ensemble représentatif", alors: "« sample » (échantillon)" },
    ],
    pieges: [
      "Confondre « deviation » (écart-type, une dispersion) et « difference » (un simple écart).",
      "Confondre « ratio » (rapport, une division) et « proportion » (une part d'un tout).",
      "Croire que « sample » veut dire « exemple » : en statistiques, sample = un échantillon.",
    ],
    reel: "En vrai, quand tu compares le nombre de paniers marqués par deux joueurs de basket au gymnase, tu calcules des « ratios » et des « means » comme dans un vrai carnet de stats",
  },
  // ── Sciences ───────────────────────────────────────────────────────────────
  {
    id: "en_b1_science_biology",
    emoji: "🧬",
    titre: "La biologie · Biology",
    domaine: "Sciences",
    essentiel:
      "La **biologie** B1 entre dans le détail du vivant : le **chromosome**, l'**enzyme**, la **protéine** (protein), la **mutation** et l'**hormone**, jusqu'à l'**écosystème** et les **anticorps** (antibodies).",
    formules: [
      { label: "La cellule", latex: "**chromosome** chromosome · **enzyme** enzyme · **protein** protéine · **membrane** membrane · **mutation** mutation" },
      { label: "Le corps & le milieu", latex: "**hormone** hormone · **antibody** anticorps · **ecosystem** écosystème" },
      { label: "Un rôle", latex: "« Enzymes speed up reactions » = les enzymes accélèrent les réactions" },
      { label: "La défense", latex: "« Antibodies fight infections » = les anticorps combattent les infections" },
    ],
    reflexes: [
      { si: "je parle de ce qui porte l'information génétique", alors: "« chromosome »" },
      { si: "je parle de ce qui accélère une réaction du corps", alors: "« enzyme »" },
      { si: "je parle de la défense immunitaire", alors: "« antibody » (anticorps)" },
    ],
    pieges: [
      "Bien prononcer « enzyme » (« enn-zaïm ») et « protein » (« prô-tiine »).",
      "Croire que « mutation » n'a qu'un sens de science-fiction : ici c'est un changement génétique.",
      "Le pluriel de « antibody » est « antibodies ».",
    ],
    reel: "En vrai, quand tu te fais vacciner avant un voyage, ton corps fabrique des « antibodies » : le vocabulaire de la biologie en anglais devient concret",
  },
  {
    id: "en_b1_science_chemistry",
    emoji: "⚗️",
    titre: "La chimie · Chemistry",
    domaine: "Sciences",
    essentiel:
      "La **chimie** B1 : l'**oxydation** (oxidation), la **réaction** (reaction), la **liaison** (bond), la **concentration**, le **composé** (compound), l'**ion** et l'**électron**, jusqu'au **tableau périodique**.",
    formules: [
      { label: "Réactions", latex: "**reaction** réaction · **oxidation** oxydation · **bond** liaison · **compound** composé · **concentration** concentration" },
      { label: "Particules", latex: "**ion** ion · **electron** électron · **periodic table** tableau périodique" },
      { label: "Une réaction", latex: "« Iron reacts with oxygen » = le fer réagit avec l'oxygène" },
      { label: "Une liaison", latex: "« Atoms share electrons in a bond » = les atomes partagent des électrons dans une liaison" },
    ],
    reflexes: [
      { si: "je parle de la rouille", alors: "c'est une « oxidation » (oxydation)" },
      { si: "je parle de ce qui lie deux atomes", alors: "un « bond » (liaison)" },
      { si: "je parle d'un atome chargé", alors: "un « ion »" },
    ],
    pieges: [
      "Confondre « compound » (un composé, plusieurs éléments) et « element » (un seul type d'atome).",
      "Confondre « bond » (liaison chimique) et « bond » (une obligation financière) : le contexte tranche.",
      "Bien lire « ion » (« aïe-onn ») et « electron » (« i-lek-tronn »).",
    ],
    reel: "En vrai, quand tu vois une barrière en fer rouiller près du bord de mer à cause du sel, tu observes une « oxidation » : la chimie en anglais est déjà sur la côte",
  },
  {
    id: "en_b1_science_physics",
    emoji: "🔬",
    titre: "La physique · Physics",
    domaine: "Sciences",
    essentiel:
      "La **physique** B1 : la **réfraction** (refraction), la **résistance**, la **tension** (voltage), le **spectre** (spectrum), le **rayonnement** (radiation), le **circuit** et le **nucléaire**.",
    formules: [
      { label: "Optique & ondes", latex: "**refraction** réfraction · **spectrum** spectre · **radiation** rayonnement · **frequency** fréquence" },
      { label: "Électricité & noyau", latex: "**resistance** résistance · **voltage** tension · **circuit** circuit · **nuclear** nucléaire" },
      { label: "La lumière", latex: "« Light bends by refraction » = la lumière se courbe par réfraction" },
      { label: "Un circuit", latex: "« Resistance limits the current » = la résistance limite le courant" },
    ],
    reflexes: [
      { si: "je parle de la lumière qui change de direction dans l'eau", alors: "« refraction » (réfraction)" },
      { si: "je parle des couleurs de l'arc-en-ciel", alors: "le « spectrum » (spectre)" },
      { si: "je parle de ce qui freine le courant", alors: "la « resistance »" },
    ],
    pieges: [
      "Confondre « voltage » (la tension) et « current » (le courant) : ce ne sont pas les mêmes grandeurs.",
      "Croire que « radiation » est toujours alarmant : ici c'est un terme neutre (rayonnement).",
      "Le pluriel de « spectrum » est « spectra ».",
    ],
    reel: "En vrai, quand tu vois un arc-en-ciel se former au-dessus de la cascade de Grand Galet, tu observes de la « refraction » et un « spectrum » de lumière, tout le vocabulaire de physique en anglais",
  },
  // ── Économie & gestion ─────────────────────────────────────────────────────
  {
    id: "en_b1_economy",
    emoji: "🏛️",
    titre: "L'économie · Economy",
    domaine: "Économie & gestion",
    essentiel:
      "L'**économie** B1 : l'**inflation**, la **récession**, le **PIB** (GDP), le **chômage** (unemployment), l'**offre** (supply) et la **demande** (demand), les **exportations** et **importations**.",
    formules: [
      { label: "Les grands indicateurs", latex: "**inflation** inflation · **recession** récession · **GDP** PIB · **unemployment** chômage · **growth** croissance" },
      { label: "Le marché", latex: "**market** marché · **supply** offre · **demand** demande · **export** exportation · **import** importation" },
      { label: "La hausse des prix", latex: "« Inflation raises prices » = l'inflation fait monter les prix" },
      { label: "Le marché", latex: "« Supply and demand set the price » = l'offre et la demande fixent le prix" },
    ],
    reflexes: [
      { si: "je parle de la richesse produite par un pays", alors: "le « GDP » (PIB)" },
      { si: "je parle d'une hausse générale des prix", alors: "l'« inflation »" },
      { si: "je parle de ce que le marché veut acheter", alors: "la « demand »" },
    ],
    pieges: [
      "Faux-ami : « demand » = la demande économique, mais le verbe « to demand » veut dire « exiger ».",
      "Confondre « import » (importer, faire entrer) et « export » (exporter, faire sortir).",
      "« GDP » se lit lettre par lettre (« dji-di-pi »), le sigle de Gross Domestic Product.",
    ],
    reel: "En vrai, quand le prix du carburant grimpe à la pompe à La Réunion, tu vois l'« inflation » et la loi de l'« supply and demand » à l'œuvre, en anglais dans les journaux",
  },
  {
    id: "en_b1_finance",
    emoji: "💹",
    titre: "La finance · Finance",
    domaine: "Économie & gestion",
    essentiel:
      "La **finance** d'entreprise : l'**investissement** (investment), le **capital**, l'**actif** (asset) et le **passif** (liability), le **chiffre d'affaires** (revenue), la **marge** (margin) et le **bilan** (balance sheet).",
    formules: [
      { label: "Investir", latex: "**investment** investissement · **capital** capital · **dividend** dividende · **asset** actif · **liability** passif" },
      { label: "Les résultats", latex: "**revenue** chiffre d'affaires · **margin** marge · **balance sheet** bilan" },
      { label: "Un bénéfice", latex: "« Revenue minus costs gives the profit » = le chiffre d'affaires moins les coûts donne le bénéfice" },
      { label: "Le bilan", latex: "« Assets and liabilities on the balance sheet » = l'actif et le passif au bilan" },
    ],
    reflexes: [
      { si: "je parle de ce que possède une entreprise", alors: "ses « assets » (actifs)" },
      { si: "je parle de ce qu'elle doit", alors: "ses « liabilities » (passifs)" },
      { si: "je parle de l'argent gagné avant les coûts", alors: "le « revenue » (chiffre d'affaires)" },
    ],
    pieges: [
      "Faux-ami : « revenue » = le chiffre d'affaires (pas le « revenu » d'un particulier, qui se dit income).",
      "Confondre « asset » (actif, ce qu'on possède) et « liability » (passif, ce qu'on doit).",
      "« balance sheet » (le bilan comptable) n'est pas « balance » (le solde d'un compte).",
    ],
    reel: "En vrai, quand une petite entreprise de Saint-Pierre calcule si elle gagne de l'argent, elle compare son « revenue » à ses coûts pour trouver sa « margin », en anglais dans les tableurs",
  },
  {
    id: "en_b1_family_management",
    emoji: "🧾",
    titre: "Gérer un foyer · Family management",
    domaine: "Économie & gestion",
    essentiel:
      "Gérer les finances d'un **foyer** (household) au niveau B1 : la **mensualité** (installment), le **taux d'intérêt** (interest rate), le **relevé de compte** (statement), la **retraite** (pension) et la **déclaration d'impôts** (tax return).",
    formules: [
      { label: "Le foyer", latex: "**household** foyer · **installment** mensualité · **interest rate** taux d'intérêt · **debit** débit · **allowance** allocation" },
      { label: "Papiers & avenir", latex: "**statement** relevé de compte · **pension** retraite · **tax return** déclaration d'impôts" },
      { label: "Un crédit", latex: "« We pay the loan in monthly installments » = nous remboursons le prêt par mensualités" },
      { label: "Les impôts", latex: "« I filled in my tax return » = j'ai rempli ma déclaration d'impôts" },
    ],
    reflexes: [
      { si: "je paie un prêt petit à petit", alors: "par « installments » (mensualités)" },
      { si: "je vérifie mes mouvements bancaires", alors: "sur le « statement » (relevé)" },
      { si: "je parle de l'argent reçu après la vie active", alors: "la « pension » (retraite)" },
    ],
    pieges: [
      "Faux-ami : « pension » = la retraite (pas une pension de famille, qui se dit guesthouse).",
      "Confondre « debit » (débit, l'argent qui sort) et « credit » (crédit, l'argent qui entre).",
      "Confondre « statement » (le relevé de compte) et son sens courant de « déclaration ».",
    ],
    reel: "En vrai, quand la famille prépare la déclaration d'impôts et vérifie le « statement » de la banque, elle manipule tout le vocabulaire du « household » en anglais",
  },
  // ── Géographie & voyage ────────────────────────────────────────────────────
  {
    id: "en_b1_physical_geography",
    emoji: "🗺️",
    titre: "La géographie physique · Physical geography",
    domaine: "Géographie & voyage",
    essentiel:
      "La **géographie physique** : le **relief**, l'**altitude**, la **longitude** et les **coordonnées**, l'**hémisphère**, l'**équateur** et les **tropiques**, mais aussi l'**érosion** et la **tectonique**.",
    formules: [
      { label: "Se repérer", latex: "**relief** relief · **altitude** altitude · **longitude** longitude · **coordinates** coordonnées · **equator** équateur" },
      { label: "La Terre", latex: "**hemisphere** hémisphère · **tropics** tropiques · **erosion** érosion · **sediment** sédiment · **tectonic** tectonique" },
      { label: "Une position", latex: "« Réunion is south of the equator » = La Réunion est au sud de l'équateur" },
      { label: "Le relief", latex: "« Erosion shapes the mountains » = l'érosion façonne les montagnes" },
    ],
    reflexes: [
      { si: "je donne une position exacte sur le globe", alors: "des « coordinates » (latitude et longitude)" },
      { si: "je parle de la ligne du milieu de la Terre", alors: "l'« equator » (équateur)" },
      { si: "je parle de l'usure des reliefs par l'eau", alors: "l'« erosion »" },
    ],
    pieges: [
      "Confondre « longitude » (est-ouest) et « latitude » (nord-sud).",
      "On parle de « the tropics » au pluriel pour désigner la zone tropicale.",
      "Bien prononcer « equator » (« i-koué-teur »), l'accent sur la deuxième syllabe.",
    ],
    reel: "En vrai, La Réunion est dans l'hémisphère Sud, sous les « tropics », et ses cirques racontent des millions d'années d'« erosion » : la géographie physique en anglais grandeur nature",
  },
  {
    id: "en_b1_travel_culture",
    emoji: "🌏",
    titre: "Voyage & culture · Travel & culture",
    domaine: "Géographie & voyage",
    essentiel:
      "Parler de **culture** et de **société** au niveau B1 : le **patrimoine** (heritage), le **tourisme**, la **tradition**, la **diversité**, la **migration**, l'**urbanisation** et l'**identité**.",
    formules: [
      { label: "Société", latex: "**heritage** patrimoine · **tradition** tradition · **diversity** diversité · **identity** identité · **custom** coutume" },
      { label: "Mouvements", latex: "**tourism** tourisme · **migration** migration · **urbanisation** urbanisation · **exchange** échange · **region** région" },
      { label: "Le patrimoine", latex: "« The island protects its heritage » = l'île protège son patrimoine" },
      { label: "La diversité", latex: "« Réunion is known for its diversity » = La Réunion est connue pour sa diversité" },
    ],
    reflexes: [
      { si: "je parle de ce qui se transmet de génération en génération", alors: "« tradition », « heritage », « custom »" },
      { si: "je parle du déplacement de populations", alors: "« migration »" },
      { si: "je parle de la croissance des villes", alors: "« urbanisation »" },
    ],
    pieges: [
      "Orthographe britannique : « urbanisation » avec un « s ».",
      "Confondre « heritage » (le patrimoine, ce dont on hérite collectivement) et « inheritance » (un héritage familial précis).",
      "Confondre « custom » (une coutume) et « costume » (un déguisement).",
    ],
    reel: "En vrai, la diversité de La Réunion — ses « traditions », son « heritage » créole, ses cultures venues par la « migration » — se raconte parfaitement avec le vocabulaire B1 en anglais",
  },
  {
    id: "en_b1_environment",
    emoji: "🌿",
    titre: "L'environnement · Environment",
    domaine: "Géographie & voyage",
    essentiel:
      "L'**environnement** au niveau B1 : l'**écosystème**, la **biodiversité**, la **déforestation**, la **pollution**, la **conservation** et le **changement climatique** (climate change), jusqu'à la **durabilité** (sustainability).",
    formules: [
      { label: "Les milieux", latex: "**ecosystem** écosystème · **biodiversity** biodiversité · **habitat** habitat · **species** espèce" },
      { label: "Menaces & solutions", latex: "**pollution** pollution · **deforestation** déforestation · **conservation** conservation · **renewable** renouvelable · **sustainability** durabilité" },
      { label: "Un enjeu global", latex: "« Climate change threatens species » = le changement climatique menace les espèces" },
      { label: "Protéger", latex: "« Renewable energy is more sustainable » = l'énergie renouvelable est plus durable" },
    ],
    reflexes: [
      { si: "je parle de la variété du vivant", alors: "« biodiversity »" },
      { si: "je parle du milieu de vie d'une espèce", alors: "son « habitat »" },
      { si: "je parle d'une énergie qui ne s'épuise pas", alors: "« renewable » (renouvelable)" },
    ],
    pieges: [
      "Le pluriel de « species » est « species » (le mot est invariable).",
      "Confondre « conservation » (la protection de la nature) et « conversation » (une discussion) : une lettre change tout.",
      "« deforestation » se construit sur « forest » : de- marque la disparition de la forêt.",
    ],
    reel: "En vrai, quand tu marches dans la forêt de Bébour, tu traverses un « ecosystem » d'une « biodiversity » rare que la « conservation » cherche à protéger, tout le vocabulaire B1 en anglais",
  },
];

// Banque "fixed" imprimable groupée par notion (source des tests de survie).
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of englishB1QuestionBank) {
  (BANQUES[item.notionId] ??= []).push(item);
}

export const KIT_ANGLAIS_B1: KitData = {
  slug: "anglais-b1",
  titre: "Guide de survie · Anglais B1",
  baseline:
    "Tout l'anglais du niveau B1 en 16 fiches : les mots et phrases qui sauvent, les réflexes, les faux-amis à éviter — et un test corrigé par fiche. De l'anglais à travers l'algèbre, le raisonnement, les sciences, l'économie et la géographie, au niveau intermédiaire. À imprimer, à glisser dans le classeur.",
  matiere: "english-maths",
  classeLabel: "B1",
  coachClasse: "b1",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
