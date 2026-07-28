// ─── Guide de survie · Anglais B2 (English Maths — CLIL) ─────────────────────
// B2 = niveau avancé : anglais À TRAVERS les matières, avec un vocabulaire
// académique (analyse, démonstration, sciences, macroéconomie, géopolitique).
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/english/b2/notions.ts
// - checklists     = micro-compétences de microSkills.ts (traduire EN↔FR)
// - test de survie = items "fixed" imprimables de englishB2QuestionBank
//   (QCM en↔fr ; les micros « listen » portent un audioSrc → exclus par
//   testDeSurvie). Mesuré : chaque notion a ≥16 items imprimables, aucune
//   banque à compléter.
// ⚠️ Bloc « formules » = LES MOTS & PHRASES QUI SAUVENT (vocabulaire bilingue +
// structures, en toutes lettres, ZÉRO LaTeX). Condensés écrits et vérifiés à la
// main (orthographe britannique, périmètre B2, faux-amis). 15 NOTIONS.
// matiere = "english-maths", coachClasse = "b2".

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/english/b2/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { englishB2QuestionBank } from "@/lib/tutor-v4/questionBank/b2/english";
import type { KitData, KitNotion } from "@/components/kit/types";

const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  // ── Langue des maths ───────────────────────────────────────────────────────
  {
    id: "en_b2_verbs",
    emoji: "🎓",
    titre: "Les verbes académiques · Maths verbs",
    domaine: "Langue des maths",
    essentiel:
      "Au niveau B2, les consignes touchent au **supérieur** : **prouver** (prove), **modéliser** (model), **dériver** (differentiate), **intégrer** (integrate), **converger** (converge). Le vocabulaire d'un cours de terminale et post-bac, en anglais.",
    formules: [
      { label: "Raisonner (1/2)", latex: "**prove** démontrer · **interpret** interpréter · **model** modéliser · **derive** dériver · **evaluate** évaluer" },
      { label: "Manipuler (2/2)", latex: "**differentiate** dériver · **integrate** intégrer · **converge** converger · **generalise** généraliser · **conjecture** conjecturer" },
      { label: "Une consigne", latex: "« Differentiate the function » = dérive la fonction" },
      { label: "Modéliser", latex: "« Model the situation with an equation » = modélise la situation par une équation" },
    ],
    reflexes: [
      { si: "je vois « differentiate »", alors: "je calcule la dérivée" },
      { si: "je vois « integrate »", alors: "je calcule l'intégrale (la primitive)" },
      { si: "je vois « converge »", alors: "je regarde vers quelle limite ça tend" },
    ],
    pieges: [
      "Faux-ami : « derive » = déduire, alors que « differentiate » = calculer la dérivée.",
      "Orthographe britannique : « generalise », « parametrise » avec un « s ».",
      "Confondre « converge » (tendre vers une limite) et « diverge » (partir à l'infini).",
    ],
    reel: "En vrai, quand tu modélises la vitesse d'un coureur du Grand Raid en fonction de la pente, tu fais du « model » et du « differentiate » comme en terminale, mais en anglais",
  },
  {
    id: "en_b2_proof",
    emoji: "♾️",
    titre: "Démontrer · Proof & logic",
    domaine: "Démonstration",
    essentiel:
      "La **démonstration** rigoureuse a son vocabulaire : le **théorème** (theorem), le **lemme** (lemma), l'**hypothèse** (hypothesis), le **corollaire**, la **récurrence** (induction) et le raisonnement par l'**absurde** (contradiction).",
    formules: [
      { label: "Les objets (1/2)", latex: "**theorem** théorème · **lemma** lemme · **corollary** corollaire · **hypothesis** hypothèse · **conjecture** conjecture" },
      { label: "Les méthodes (2/2)", latex: "**proof** démonstration · **induction** récurrence · **contradiction** contradiction" },
      { label: "Énoncer", latex: "« The theorem states that… » = le théorème affirme que…" },
      { label: "Par récurrence", latex: "« Prove by induction » = démontre par récurrence" },
    ],
    reflexes: [
      { si: "je démontre une propriété pour tout entier n", alors: "souvent par « induction » (récurrence)" },
      { si: "je suppose le contraire pour aboutir à l'impossible", alors: "c'est une preuve « by contradiction »" },
      { si: "je vois « lemma »", alors: "c'est un résultat intermédiaire qui sert à la démonstration" },
    ],
    pieges: [
      "Le pluriel de « hypothesis » est « hypotheses » ; celui de « lemma » est « lemmas » (ou lemmata).",
      "Confondre « theorem » (résultat démontré) et « conjecture » (résultat supposé, non prouvé).",
      "« proof » = la démonstration (pas « une preuve » au sens policier, qui se dit evidence).",
    ],
    reel: "En vrai, quand tu expliques par l'absurde pourquoi un sentier ne peut pas redescendre plus bas que la mer, tu fais une preuve « by contradiction » comme en cours de maths en anglais",
  },
  {
    id: "en_b2_analysis",
    emoji: "📈",
    titre: "L'analyse · Analysis",
    domaine: "Analyse",
    essentiel:
      "L'**analyse** (le calcul différentiel et intégral) en anglais : la **dérivée** (derivative), l'**intégrale**, la **limite**, l'**asymptote**, la **suite** (sequence) et la **série** (series), les notions de **continu** et **convergent**.",
    formules: [
      { label: "Les objets (1/2)", latex: "**derivative** dérivée · **integral** intégrale · **limit** limite · **asymptote** asymptote" },
      { label: "Suites & continuité (2/2)", latex: "**sequence** suite · **series** série · **continuous** continu · **convergent** convergent" },
      { label: "Une limite", latex: "« The limit as x tends to infinity » = la limite quand x tend vers l'infini" },
      { label: "Une suite", latex: "« A convergent sequence has a limit » = une suite convergente a une limite" },
    ],
    reflexes: [
      { si: "je parle du taux de variation instantané", alors: "la « derivative » (dérivée)" },
      { si: "je parle d'une droite dont la courbe s'approche sans la toucher", alors: "une « asymptote »" },
      { si: "je distingue liste ordonnée et somme", alors: "« sequence » (suite) contre « series » (série)" },
    ],
    pieges: [
      "Faux-amis : « sequence » = une suite (pas une « séquence »), « series » = une série (invariable au pluriel).",
      "Confondre « continuous » (continu, la fonction) et « continual » (répété) : en analyse c'est continuous.",
      "« integral » (l'intégrale) n'est pas « integer » (un entier).",
    ],
    reel: "En vrai, quand tu observes la température s'approcher d'un palier sans jamais l'atteindre au sommet du Piton, tu vois une « asymptote » et une « limit » de l'analyse en anglais",
  },
  // ── Sport ──────────────────────────────────────────────────────────────────
  {
    id: "en_b2_sport_verbs",
    emoji: "🏃",
    titre: "Modéliser le sport · Sport verbs",
    domaine: "Sport",
    essentiel:
      "Le sport de haut niveau se **modélise** : on **optimise** (optimise), on **maximise**, on **minimise**, on **simule** (simulate), on **prédit** (predict) et on **extrapole** des performances.",
    formules: [
      { label: "Modéliser (1/2)", latex: "**model** modéliser · **derive** dériver · **optimise** optimiser · **maximise** maximiser · **minimise** minimiser" },
      { label: "Prévoir (2/2)", latex: "**simulate** simuler · **predict** prédire · **extrapolate** extrapoler" },
      { label: "Optimiser", latex: "« Optimise the training load » = optimise la charge d'entraînement" },
      { label: "Prédire", latex: "« Predict the finishing time » = prédis le temps d'arrivée" },
    ],
    reflexes: [
      { si: "je cherche le meilleur résultat possible", alors: "j'« optimise » (maximise ou minimise)" },
      { si: "je prolonge une tendance au-delà des données", alors: "j'« extrapolate »" },
      { si: "je reproduis un phénomène par le calcul", alors: "je « simulate »" },
    ],
    pieges: [
      "Orthographe britannique : « optimise », « maximise », « minimise » avec un « s ».",
      "Confondre « predict » (prédire à l'avance) et « forecast » (prévoir, surtout la météo ou l'éco).",
      "« extrapolate » (prolonger au-delà) n'est pas « interpolate » (estimer entre deux points).",
    ],
    reel: "En vrai, quand un préparateur physique ajuste l'entraînement d'un athlète de Saint-Pierre pour battre son record, il « optimise » et « predict » exactement comme un modèle mathématique en anglais",
  },
  {
    id: "en_b2_sport_science",
    emoji: "🚀",
    titre: "La science du sport · Sport science",
    domaine: "Sport",
    essentiel:
      "La **physique** du sport de haut niveau : la **trajectoire**, le **projectile**, le **frottement** (friction), la **gravité**, la **quantité de mouvement** (momentum) et les énergies **cinétique** et **potentielle**.",
    formules: [
      { label: "Mouvement (1/2)", latex: "**trajectory** trajectoire · **projectile** projectile · **friction** frottement · **gravity** gravité · **resultant** résultante" },
      { label: "Énergie (2/2)", latex: "**momentum** quantité de mouvement · **kinetic energy** énergie cinétique · **potential energy** énergie potentielle" },
      { label: "Un lancer", latex: "« The projectile follows a parabola » = le projectile suit une parabole" },
      { label: "L'énergie", latex: "« Kinetic energy depends on speed » = l'énergie cinétique dépend de la vitesse" },
    ],
    reflexes: [
      { si: "je parle de l'énergie du mouvement", alors: "« kinetic energy » (cinétique)" },
      { si: "je parle de l'énergie stockée par la hauteur", alors: "« potential energy » (potentielle)" },
      { si: "je parle de ce qui freine un objet qui glisse", alors: "« friction » (frottement)" },
    ],
    pieges: [
      "Confondre « kinetic » (cinétique, liée à la vitesse) et « potential » (potentielle, liée à la position).",
      "« gravity » = la pesanteur (pas « la gravité » d'une situation, qui se dit seriousness).",
      "« projectile » se prononce « pro-djek-taïl » en anglais britannique.",
    ],
    reel: "En vrai, quand tu regardes un joueur de pétanque lancer sa boule sur la place de Saint-Paul, sa « trajectory », sa « gravity » et son « momentum » sont de la physique du sport en anglais",
  },
  {
    id: "en_b2_sport_data",
    emoji: "🗃️",
    titre: "Les données du sport · Sport data",
    domaine: "Sport",
    essentiel:
      "Analyser des performances, c'est de la **data science** : le **jeu de données** (dataset), la **distribution**, la **valeur aberrante** (outlier), la **régression**, la **corrélation** et le **nuage de points** (scatter plot).",
    formules: [
      { label: "Les données (1/2)", latex: "**dataset** jeu de données · **distribution** distribution · **outlier** valeur aberrante · **histogram** histogramme" },
      { label: "Analyser (2/2)", latex: "**regression** régression · **correlation** corrélation · **coefficient** coefficient · **scatter plot** nuage de points" },
      { label: "Une valeur extrême", latex: "« Remove the outlier from the dataset » = retire la valeur aberrante du jeu de données" },
      { label: "Un lien", latex: "« There is a strong correlation » = il y a une forte corrélation" },
    ],
    reflexes: [
      { si: "je repère une valeur très éloignée des autres", alors: "un « outlier »" },
      { si: "je mesure le lien entre deux variables", alors: "la « correlation »" },
      { si: "je place des couples de points sur un graphique", alors: "un « scatter plot »" },
    ],
    pieges: [
      "« correlation » n'est pas « causation » : une corrélation ne prouve pas une cause.",
      "Confondre « regression » (modéliser une tendance) et « correlation » (mesurer un lien).",
      "« data » est un pluriel : « the data show a trend ».",
    ],
    reel: "En vrai, quand tu compares les temps de tous les finishers du Grand Raid sur un graphique, tu cherches des « outliers », une « correlation » et une « regression », en anglais dans les données",
  },
  // ── Sciences ───────────────────────────────────────────────────────────────
  {
    id: "en_b2_science_biology",
    emoji: "🧬",
    titre: "La biologie · Biology",
    domaine: "Sciences",
    essentiel:
      "La **biologie** B2 : le **génome** (genome), la **mitose** (mitosis) et la **méiose** (meiosis), le **métabolisme**, l'**homéostasie** (homeostasis), le **catalyseur** (catalyst) et la **biodiversité**.",
    formules: [
      { label: "La cellule (1/2)", latex: "**genome** génome · **mitosis** mitose · **meiosis** méiose · **metabolism** métabolisme" },
      { label: "Régulation (2/2)", latex: "**homeostasis** homéostasie · **catalyst** catalyseur · **neural** neural · **biodiversity** biodiversité" },
      { label: "La division", latex: "« Mitosis produces two identical cells » = la mitose produit deux cellules identiques" },
      { label: "L'équilibre", latex: "« The body keeps homeostasis » = le corps maintient l'homéostasie" },
    ],
    reflexes: [
      { si: "je parle de la division qui copie une cellule", alors: "la « mitosis » (mitose)" },
      { si: "je parle du maintien de l'équilibre interne", alors: "l'« homeostasis »" },
      { si: "je parle de l'ensemble des gènes", alors: "le « genome »" },
    ],
    pieges: [
      "Confondre « mitosis » (mitose, cellules identiques) et « meiosis » (méiose, cellules reproductrices).",
      "Bien prononcer « homeostasis » (« ho-mi-o-sté-siss ») et « catalyst » (« ca-ta-liste »).",
      "« neural » (relatif aux neurones) n'est pas « neutral » (neutre).",
    ],
    reel: "En vrai, quand un lézard vert de Bourbon régule sa température au soleil, son corps maintient son « homeostasis » et son « metabolism », tout le vocabulaire bio B2 en anglais",
  },
  {
    id: "en_b2_science_chemistry",
    emoji: "⚗️",
    titre: "La chimie · Chemistry",
    domaine: "Sciences",
    essentiel:
      "La **chimie** B2 : l'**électrolyse** (electrolysis), le **titrage** (titration), l'**équilibre** (equilibrium), l'**entropie**, les **polymères** et **isomères**, la **stœchiométrie**.",
    formules: [
      { label: "Réactions (1/2)", latex: "**electrolysis** électrolyse · **titration** titrage · **equilibrium** équilibre · **entropy** entropie" },
      { label: "Molécules (2/2)", latex: "**polymer** polymère · **isomer** isomère · **oxidation state** degré d'oxydation · **stoichiometry** stœchiométrie" },
      { label: "Un équilibre", latex: "« The reaction reaches equilibrium » = la réaction atteint l'équilibre" },
      { label: "Le désordre", latex: "« Entropy always increases » = l'entropie augmente toujours" },
    ],
    reflexes: [
      { si: "je décompose un composé avec un courant électrique", alors: "une « electrolysis »" },
      { si: "je dose une solution goutte à goutte", alors: "une « titration » (un titrage)" },
      { si: "je parle du désordre d'un système", alors: "l'« entropy » (entropie)" },
    ],
    pieges: [
      "« titration » = le titrage, un dosage (pas un « titre » de journal).",
      "Confondre « polymer » (longue chaîne) et « isomer » (même formule, structure différente).",
      "Bien prononcer « stoichiometry » (« stoï-ki-o-mi-tri »).",
    ],
    reel: "En vrai, quand tu ajustes le pH d'un aquarium goutte à goutte à Saint-Denis, tu fais une « titration » et tu cherches l'« equilibrium », la chimie B2 en anglais",
  },
  {
    id: "en_b2_science_physics",
    emoji: "⚛️",
    titre: "La physique · Physics",
    domaine: "Sciences",
    essentiel:
      "La **physique** B2 : le **quantique** (quantum), l'**électromagnétique**, la **thermodynamique**, l'**interférence**, l'effet **photoélectrique**, la **fonction d'onde** et la **relativité**.",
    formules: [
      { label: "Ondes & champs (1/2)", latex: "**quantum** quantique · **electromagnetic** électromagnétique · **interference** interférence · **wave function** fonction d'onde" },
      { label: "Grandes théories (2/2)", latex: "**thermodynamics** thermodynamique · **photoelectric** photoélectrique · **relativity** relativité · **entropy** entropie" },
      { label: "Deux ondes", latex: "« The two waves create interference » = les deux ondes créent une interférence" },
      { label: "La relativité", latex: "« Relativity links space and time » = la relativité lie l'espace et le temps" },
    ],
    reflexes: [
      { si: "je parle de l'énergie par paquets (photons)", alors: "le « quantum » (quantique)" },
      { si: "je parle de la lumière et du magnétisme ensemble", alors: "l'« electromagnetic »" },
      { si: "je parle de deux ondes qui se superposent", alors: "l'« interference »" },
    ],
    pieges: [
      "Bien prononcer « quantum » (« kouonn-teum ») et « relativity » (« re-la-ti-vi-ti »).",
      "Le pluriel de « quantum » est « quanta » ; celui de « spectrum » est « spectra ».",
      "« thermodynamics » se construit sur « thermo » (chaleur) et « dynamics » (mouvement).",
    ],
    reel: "En vrai, quand tu vois des couleurs iriser à la surface d'une flaque d'huile sur un parking de Saint-Benoît, tu observes une « interference » de la lumière, la physique B2 en anglais",
  },
  // ── Économie & gestion ─────────────────────────────────────────────────────
  {
    id: "en_b2_macroeconomics",
    emoji: "💱",
    titre: "La macroéconomie · Macroeconomics",
    domaine: "Économie & gestion",
    essentiel:
      "La **macroéconomie** : la **politique monétaire** (monetary policy) et **budgétaire** (fiscal policy), le **déficit** et l'**excédent** (surplus), la **balance commerciale**, le **taux de change** (exchange rate) et la **dépréciation**.",
    formules: [
      { label: "Les politiques (1/2)", latex: "**monetary policy** politique monétaire · **fiscal policy** politique budgétaire · **deficit** déficit · **surplus** excédent" },
      { label: "Le commerce (2/2)", latex: "**trade balance** balance commerciale · **exchange rate** taux de change · **depreciation** dépréciation · **appreciation** appréciation" },
      { label: "Un déséquilibre", latex: "« The country runs a trade deficit » = le pays a un déficit commercial" },
      { label: "La monnaie", latex: "« The currency lost value: depreciation » = la monnaie a perdu de la valeur, c'est une dépréciation" },
    ],
    reflexes: [
      { si: "je parle de la banque centrale et des taux", alors: "la « monetary policy »" },
      { si: "je parle des impôts et des dépenses de l'État", alors: "la « fiscal policy »" },
      { si: "les dépenses dépassent les recettes", alors: "un « deficit » (le contraire : surplus)" },
    ],
    pieges: [
      "Confondre « monetary » (monétaire, la monnaie) et « fiscal » (budgétaire, l'État).",
      "Confondre « depreciation » (baisse de valeur d'une monnaie) et « appreciation » (hausse).",
      "« deficit » (déficit) est le contraire de « surplus » (excédent).",
    ],
    reel: "En vrai, quand l'euro monte ou baisse face au dollar et que cela change le prix des produits importés à La Réunion, tu vis en direct une « appreciation » ou une « depreciation », la macroéconomie en anglais",
  },
  {
    id: "en_b2_business",
    emoji: "💼",
    titre: "La finance d'entreprise · Business",
    domaine: "Économie & gestion",
    essentiel:
      "La **finance de marché** : l'**actionnaire** (shareholder), les **fonds propres** (equity), le **portefeuille** (portfolio), la **liquidité**, la **couverture** (hedge), le **produit dérivé** (derivative), l'**obligation** (bond) et le **rendement** (yield).",
    formules: [
      { label: "Détenir (1/2)", latex: "**shareholder** actionnaire · **equity** fonds propres · **portfolio** portefeuille · **liquidity** liquidité" },
      { label: "Les produits (2/2)", latex: "**hedge** couverture · **derivative** produit dérivé · **bond** obligation · **yield** rendement" },
      { label: "Un placement", latex: "« The bond pays a fixed yield » = l'obligation verse un rendement fixe" },
      { label: "Se protéger", latex: "« Investors hedge against risk » = les investisseurs se couvrent contre le risque" },
    ],
    reflexes: [
      { si: "je parle de celui qui détient des parts d'une société", alors: "un « shareholder »" },
      { si: "je parle d'un ensemble de placements", alors: "un « portfolio »" },
      { si: "je parle du gain rapporté par un placement", alors: "le « yield » (rendement)" },
    ],
    pieges: [
      "Faux-ami : « bond » = une obligation financière (pas un « bond » au sens saut).",
      "Confondre « equity » (fonds propres) et « debt » (dette).",
      "« derivative » en finance = un produit dérivé ; en maths, la dérivée. Le contexte tranche.",
    ],
    reel: "En vrai, quand une coopérative de planteurs de canne cherche à se protéger contre la chute du cours du sucre, elle utilise un « hedge » et pense « yield », le vocabulaire de la finance en anglais",
  },
  {
    id: "en_b2_eco_statistics",
    emoji: "📉",
    titre: "Les statistiques économiques · Eco statistics",
    domaine: "Économie & gestion",
    essentiel:
      "Les **statistiques économiques** : l'**indice** (index), l'**élasticité** (elasticity), la **prévision** (forecast), la **tendance** (trend), le **coefficient**, la **régression** et l'**indicateur**.",
    formules: [
      { label: "Mesurer (1/2)", latex: "**index** indice · **elasticity** élasticité · **coefficient** coefficient · **indicator** indicateur" },
      { label: "Prévoir (2/2)", latex: "**forecast** prévision · **trend** tendance · **regression** régression · **deviation** écart" },
      { label: "Une prévision", latex: "« The forecast shows growth » = la prévision annonce une croissance" },
      { label: "Une sensibilité", latex: "« Price elasticity of demand » = l'élasticité-prix de la demande" },
    ],
    reflexes: [
      { si: "je résume une évolution de prix par un seul nombre", alors: "un « index » (indice)" },
      { si: "je mesure la sensibilité de la demande au prix", alors: "l'« elasticity »" },
      { si: "j'annonce l'évolution future", alors: "un « forecast » (prévision)" },
    ],
    pieges: [
      "Le pluriel de « index » est « indices » (ou indexes) selon le contexte.",
      "Confondre « forecast » (prévision chiffrée) et « trend » (la tendance, la direction).",
      "« elasticity » garde ici son sens économique : la sensibilité au prix.",
    ],
    reel: "En vrai, quand l'INSEE publie l'indice des prix à La Réunion et sa tendance, tu lis des « index », des « forecasts » et des « indicators » en anglais dans les rapports internationaux",
  },
  // ── Géographie & voyage ────────────────────────────────────────────────────
  {
    id: "en_b2_geopolitics",
    emoji: "🌍",
    titre: "La géopolitique · Geopolitics",
    domaine: "Géographie & voyage",
    essentiel:
      "La **géopolitique** : la **souveraineté** (sovereignty), le **territoire**, le **conflit**, la **diplomatie**, le **traité** (treaty), la **mondialisation** (globalisation), les **alliances** et les **sanctions**.",
    formules: [
      { label: "Le pouvoir (1/2)", latex: "**sovereignty** souveraineté · **territory** territoire · **conflict** conflit · **treaty** traité · **alliance** alliance" },
      { label: "Le monde (2/2)", latex: "**diplomacy** diplomatie · **globalisation** mondialisation · **development** développement · **inequality** inégalité · **sanction** sanction" },
      { label: "Un accord", latex: "« The two countries signed a treaty » = les deux pays ont signé un traité" },
      { label: "La mondialisation", latex: "« Globalisation links economies » = la mondialisation relie les économies" },
    ],
    reflexes: [
      { si: "je parle du droit d'un État à se gouverner", alors: "la « sovereignty » (souveraineté)" },
      { si: "je parle d'un accord officiel entre États", alors: "un « treaty » (traité)" },
      { si: "je parle des relations pacifiques entre pays", alors: "la « diplomacy »" },
    ],
    pieges: [
      "Orthographe britannique : « globalisation » avec un « s ».",
      "« sanction » en anglais courant = une mesure de rétorsion (le sens « approbation » existe mais est rare).",
      "Confondre « sovereignty » (la souveraineté, l'autorité) et « sovereign » (le souverain).",
    ],
    reel: "En vrai, quand tu situes La Réunion comme territoire français dans l'océan Indien, entre grandes puissances, tu touches à la « sovereignty » et à la « diplomacy », la géopolitique en anglais",
  },
  {
    id: "en_b2_climate_science",
    emoji: "🌡️",
    titre: "La science du climat · Climate science",
    domaine: "Géographie & voyage",
    essentiel:
      "La **science du climat** : l'**effet de serre** (greenhouse effect), l'**empreinte carbone** (carbon footprint), le **niveau de la mer** (sea level), la **désertification**, le phénomène **El Niño**, la **couche d'ozone** et les **anomalies** de température.",
    formules: [
      { label: "Les causes (1/2)", latex: "**greenhouse effect** effet de serre · **carbon footprint** empreinte carbone · **ozone layer** couche d'ozone · **precipitation** précipitations" },
      { label: "Les effets (2/2)", latex: "**sea level** niveau de la mer · **desertification** désertification · **anomaly** anomalie · **El Niño** El Niño" },
      { label: "Une cause", latex: "« The greenhouse effect warms the planet » = l'effet de serre réchauffe la planète" },
      { label: "Un effet", latex: "« Rising sea level threatens islands » = la montée du niveau de la mer menace les îles" },
    ],
    reflexes: [
      { si: "je parle des gaz qui retiennent la chaleur", alors: "le « greenhouse effect »" },
      { si: "je parle du CO2 émis par une activité", alors: "l'« carbon footprint »" },
      { si: "je parle d'un écart par rapport à la normale", alors: "une « anomaly » (anomalie)" },
    ],
    pieges: [
      "« precipitation » = les précipitations (pluie, neige), pas la « précipitation » au sens de hâte.",
      "Confondre « weather » (le temps qu'il fait) et « climate » (le climat sur le long terme).",
      "« sea level » désigne le niveau moyen de la mer, la référence des altitudes.",
    ],
    reel: "En vrai, quand tu vois la mer grignoter une plage de l'Ouest année après année, tu observes la montée du « sea level » liée au « greenhouse effect », la science du climat en anglais",
  },
  {
    id: "en_b2_geo_statistics",
    emoji: "🧮",
    titre: "Les statistiques géo · Geo statistics",
    domaine: "Géographie & voyage",
    essentiel:
      "Les **statistiques géographiques** : la **densité** (density), le **taux d'urbanisation**, l'**IDH** (HDI), le **PIB par habitant** (GDP per capita), les **taux** de natalité, de mortalité et de migration.",
    formules: [
      { label: "Population (1/2)", latex: "**density** densité · **birth rate** taux de natalité · **death rate** taux de mortalité · **migration rate** taux de migration" },
      { label: "Développement (2/2)", latex: "**HDI** IDH · **GDP per capita** PIB par habitant · **urbanisation rate** taux d'urbanisation · **growth rate** taux de croissance" },
      { label: "La population", latex: "« High population density in the city » = forte densité de population en ville" },
      { label: "Le développement", latex: "« HDI measures development » = l'IDH mesure le développement" },
    ],
    reflexes: [
      { si: "je mesure le nombre d'habitants par kilomètre carré", alors: "la « density » (densité)" },
      { si: "je mesure le niveau de développement d'un pays", alors: "l'« HDI » (IDH)" },
      { si: "je compare la richesse par personne", alors: "le « GDP per capita »" },
    ],
    pieges: [
      "Les sigles se lisent lettre par lettre : « HDI » (Human Development Index), « GDP » (Gross Domestic Product).",
      "Confondre « birth rate » (natalité) et « growth rate » (croissance, qui dépend aussi des migrations).",
      "« density » de population n'est pas la densité d'un matériau en physique.",
    ],
    reel: "En vrai, quand tu compares la densité de population du littoral et des Hauts de La Réunion, ou son IDH à celui de Maurice, tu manipules « density », « HDI » et « GDP per capita » en anglais",
  },
];

// Banque "fixed" imprimable groupée par notion (source des tests de survie).
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of englishB2QuestionBank) {
  (BANQUES[item.notionId] ??= []).push(item);
}

export const KIT_ANGLAIS_B2: KitData = {
  slug: "anglais-b2",
  titre: "Guide de survie · Anglais B2",
  baseline:
    "Tout l'anglais du niveau B2 en 15 fiches : les mots et phrases qui sauvent, les réflexes, les faux-amis à éviter — et un test corrigé par fiche. De l'anglais à travers l'analyse, la démonstration, les sciences, la macroéconomie et la géopolitique, au niveau avancé. À imprimer, à glisser dans le classeur.",
  matiere: "english-maths",
  classeLabel: "B2",
  coachClasse: "b2",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
