// ─── Couche « fixed » imprimable · Français CM2 ──────────────────────────────
// Le builder cycle 3 (buildCycle3FrancaisBank) ne produit QUE des items
// kind:"template" (générés à la volée, QCM/short, sans figure) → testDeSurvie
// (qui ne garde que les "fixed" sans canvas/audio) serait VIDE sur toutes les
// notions. Cette couche ajoute donc des QCM FIXES imprimables, ≥5 par notion,
// couvrant min(5, nb micros) micros distincts, difficulté 1→3.
//
// Items LEVÉS/ADAPTÉS des pools statiques du builder (LECTURE, DOCUMENT, OEUVRE,
// ECRITURE, ORAL, VOC_*, PHRASE_SIMPLE, SUJET_VERBE, GN, ACCORD_GN,
// ACCORD_SUJET_VERBE, HOMOPHONES, CONJ_*) puis VÉRIFIÉS À LA MAIN (orthographe,
// accords, une seule bonne réponse). Les items de conjugaison
// présent/imparfait/futur/infinitif sont écrits à la main (le builder les
// produit en paramétrique, sans pool statique). ⚠️ La notion phrase_complexe
// n'est PAS routée par le builder (questionForNotion tombe sur LECTURE par
// défaut) → ses items sont écrits À LA MAIN (propositions, coordination,
// pronoms relatifs qui/que/où, phrase simple vs complexe).
//
// Pitch un cran AU-DESSUS du CM1 (fin de primaire) et items DISTINCTS du CM1.
//
// Fusionnés dans francaisCm2QuestionBank (index.ts) → enrichissent AUSSI le
// coach ; importés BRUTS dans le data.ts du guide de survie.

import type { TutorBankItemFixedV4 } from "@/lib/tutor-v4/types";

// Fabrique un QCM fixe (comparateur mcq_exact). `choices` est un ordre FIGÉ
// (pas de shuffle à l'exécution) : la bonne réponse est placée à des positions
// variées d'un item à l'autre pour éviter tout « toujours A ».
function qcm(
  id: string,
  notionId: string,
  microId: string,
  difficulty: 1 | 2 | 3,
  text: string,
  choices: string[],
  correct: string,
  explanation: string
): TutorBankItemFixedV4 {
  return {
    kind: "fixed",
    id,
    niveau: "cm2",
    matiere: "francais",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    text,
    format: "qcm",
    choices,
    expected: [correct],
    comparator: "mcq_exact",
    explanation,
    tags: ["cm2", notionId, microId, "francais", "fixed", "guide"],
  };
}

export const francaisCm2FixedBank: TutorBankItemFixedV4[] = [
  // ── 1. Fluence et lecture à voix haute ─────────────────────────────────────
  qcm(
    "cm2_fr_fixed_fluence_1",
    "fluence_lecture",
    "cm2_flue_unites_syntaxiques",
    1,
    "Pour lire à voix haute « Quand la nuit tomba, les villageois rentrèrent chez eux », où fais-tu une petite pause ?",
    ["après « tomba », à la virgule", "entre « la » et « nuit »", "au milieu du mot « villageois »", "on ne fait jamais de pause"],
    "après « tomba », à la virgule",
    "La virgule marque la fin d'un groupe de sens : on y fait une petite pause, jamais à l'intérieur d'un mot."
  ),
  qcm(
    "cm2_fr_fixed_fluence_2",
    "fluence_lecture",
    "cm2_flue_texte_long",
    2,
    "Lis : « Depuis le phare, Lucas voyait la tempête approcher. Les vagues grossissaient et le vent hurlait de plus en plus fort. » Que va-t-il probablement se passer ?",
    ["la mer va se calmer aussitôt", "la tempête va arriver sur la côte", "le soleil va se lever", "Lucas va se baigner"],
    "la tempête va arriver sur la côte",
    "Les vagues qui grossissent et le vent qui hurle annoncent l'arrivée de la tempête."
  ),
  qcm(
    "cm2_fr_fixed_fluence_3",
    "fluence_lecture",
    "cm2_flue_120_mots",
    2,
    "Lire « autour de 120 mots par minute », cela veut dire...",
    ["lire le plus vite possible sans comprendre", "lire un seul mot chaque minute", "lire à un bon rythme, sans se presser ni traîner", "lire seulement 120 mots en tout"],
    "lire à un bon rythme, sans se presser ni traîner",
    "Un bon rythme de lecture reste fluide et permet de comprendre : ni trop vite, ni trop lentement."
  ),
  qcm(
    "cm2_fr_fixed_fluence_4",
    "lecture_voix_haute",
    "cm2_flue_mise_en_voix",
    3,
    "Pour mettre en voix « — Au secours ! Le feu ! » cria le pompier, il faut lire cette phrase...",
    ["d'une voix douce et lente", "en chuchotant", "sans aucune expression", "avec une voix forte et pressée"],
    "avec une voix forte et pressée",
    "Les points d'exclamation et le verbe « cria » demandent une voix forte et rapide, qui montre l'urgence."
  ),
  qcm(
    "cm2_fr_fixed_fluence_5",
    "lecture_voix_haute",
    "cm2_flue_plaisir_lire",
    3,
    "Pour lire une histoire à des plus jeunes et leur donner envie d'écouter, le mieux est de...",
    ["lire très vite pour finir vite", "mettre le ton et respecter les pauses", "lire tout bas", "sauter les passages difficiles"],
    "mettre le ton et respecter les pauses",
    "Lire avec expression et faire des pauses rend l'histoire vivante et agréable à écouter."
  ),

  // ── 2. Comprendre textes et documents complexes ────────────────────────────
  qcm(
    "cm2_fr_fixed_comp_1",
    "comprehension_textes",
    "cm2_comp_autonomie",
    1,
    "Quand tu ne comprends pas un passage en lisant seul, le mieux est de...",
    ["relire le passage lentement", "sauter tout le reste du texte", "fermer le livre", "changer d'histoire"],
    "relire le passage lentement",
    "Relire calmement un passage difficile aide à le comprendre sans abandonner la lecture."
  ),
  qcm(
    "cm2_fr_fixed_comp_2",
    "comprehension_textes",
    "cm2_comp_essentiel",
    1,
    "Restituer l'essentiel d'un texte, c'est...",
    ["recopier tout le texte", "apprendre par cœur la première phrase", "inventer une autre histoire", "dire les idées principales en peu de mots"],
    "dire les idées principales en peu de mots",
    "L'essentiel, ce sont les idées les plus importantes, redites brièvement."
  ),
  qcm(
    "cm2_fr_fixed_comp_3",
    "comprehension_textes",
    "cm2_comp_implicite",
    2,
    "Lis : « Kévin sortit de l'eau, rangea ses lunettes dans son sac et remit son maillot trempé. » Que vient de faire Kévin ?",
    ["il a fait du vélo", "il a nagé", "il a dormi", "il a mangé"],
    "il a nagé",
    "Les lunettes, le maillot trempé et l'eau sont des indices : Kévin a nagé (information implicite)."
  ),
  qcm(
    "cm2_fr_fixed_comp_4",
    "comprehension_textes",
    "cm2_comp_genres",
    2,
    "Un texte écrit en vers, avec des rimes et des strophes, est...",
    ["un article de journal", "une recette", "un poème", "un mode d'emploi"],
    "un poème",
    "Les vers, les rimes et les strophes sont les marques du poème."
  ),
  qcm(
    "cm2_fr_fixed_comp_5",
    "comprehension_documents",
    "cm2_doc_composite",
    2,
    "Dans un documentaire, à quoi sert surtout un schéma légendé ?",
    ["à raconter une histoire drôle", "à donner la fin d'un roman", "à montrer et expliquer par l'image", "à remplacer le titre"],
    "à montrer et expliquer par l'image",
    "Un schéma avec sa légende explique par le dessin ce que le texte dit avec des mots."
  ),
  qcm(
    "cm2_fr_fixed_comp_6",
    "comprehension_documents",
    "cm2_doc_croiser_infos",
    3,
    "Une affiche dit que le musée ouvre à 9 h ; une autre qu'il est fermé le mardi. Peux-tu le visiter mardi à 10 h ?",
    ["oui, dès 9 h", "oui, mais seulement à 10 h", "oui, tous les jours", "non, il est fermé le mardi"],
    "non, il est fermé le mardi",
    "On croise les deux informations : même ouvert à 9 h, le musée est fermé le mardi."
  ),

  // ── 3. Lire une œuvre et construire une culture littéraire ─────────────────
  qcm(
    "cm2_fr_fixed_oeuvre_1",
    "lecture_oeuvres",
    "cm2_oeuvre_theme",
    1,
    "Le sujet principal dont parle une histoire (l'amitié, le courage, la peur...) s'appelle...",
    ["le thème", "le titre", "la couverture", "l'éditeur"],
    "le thème",
    "Le thème est le grand sujet traité par l'œuvre."
  ),
  qcm(
    "cm2_fr_fixed_oeuvre_2",
    "lecture_oeuvres",
    "cm2_oeuvre_experience",
    2,
    "Relier une lecture à son expérience, c'est...",
    [
      "raconter l'histoire à quelqu'un qui ne l'a pas lue",
      "penser à un moment de sa vie qui ressemble à l'histoire",
      "chercher si l'auteur a vraiment vécu cette histoire",
      "dire si on a aimé le livre et expliquer pourquoi",
    ],
    "penser à un moment de sa vie qui ressemble à l'histoire",
    "On relie l'histoire à ce qu'on a soi-même vécu ou ressenti."
  ),
  qcm(
    "cm2_fr_fixed_oeuvre_3",
    "lecture_oeuvres",
    "cm2_oeuvre_reference",
    2,
    "« Cette histoire de renard rusé me fait penser au Roman de Renart. » Que fait le lecteur ?",
    ["il invente une suite", "il corrige des fautes", "il relie l'œuvre à une autre qu'il connaît", "il compte les personnages"],
    "il relie l'œuvre à une autre qu'il connaît",
    "Relier une œuvre à une autre référence culturelle enrichit la lecture."
  ),
  qcm(
    "cm2_fr_fixed_oeuvre_4",
    "culture_lecteur",
    "cm2_oeuvre_choix",
    2,
    "Pour bien choisir un livre à lire, une bonne raison est de dire :",
    ["« Je le choisis parce que le sujet m'intéresse. »", "« Je le prends au hasard. »", "« Je le choisis parce qu'il est lourd. »", "« Je ne sais pas pourquoi. »"],
    "« Je le choisis parce que le sujet m'intéresse. »",
    "Choisir une œuvre, c'est pouvoir justifier son choix par une vraie raison."
  ),
  qcm(
    "cm2_fr_fixed_oeuvre_5",
    "culture_lecteur",
    "cm2_oeuvre_carnet",
    3,
    "Pour tenir un carnet de lecture bien organisé, on note pour chaque livre...",
    ["seulement la couleur de la couverture", "le prix et le poids", "le titre, l'auteur et son avis", "rien du tout"],
    "le titre, l'auteur et son avis",
    "Un carnet organisé garde le titre, l'auteur et ce qu'on a pensé de chaque lecture."
  ),

  // ── 4. Produire, organiser et réviser des écrits ───────────────────────────
  qcm(
    "cm2_fr_fixed_ecrit_1",
    "ecriture_preparer",
    "cm2_ecrit_copie",
    1,
    "Pour copier vite et sans erreur un texte long, le mieux est de...",
    ["mémoriser un groupe de mots puis l'écrire", "copier une lettre à la fois en relevant les yeux à chaque lettre", "copier sans jamais relire", "inventer les mots difficiles"],
    "mémoriser un groupe de mots puis l'écrire",
    "Copier par groupes de mots va plus vite et évite les erreurs."
  ),
  qcm(
    "cm2_fr_fixed_ecrit_2",
    "ecriture_preparer",
    "cm2_ecrit_plan",
    1,
    "Avant d'écrire un texte, faire un plan, c'est...",
    ["ranger ses idées dans l'ordre", "choisir la couleur du stylo", "compter les lignes", "dessiner la marge"],
    "ranger ses idées dans l'ordre",
    "Le plan sert à organiser ses idées avant de rédiger."
  ),
  qcm(
    "cm2_fr_fixed_ecrit_3",
    "ecriture_preparer",
    "cm2_ecrit_notes",
    2,
    "Prendre des notes pour retenir une leçon, c'est écrire...",
    ["chaque phrase entière deux fois", "les mots importants, en abrégé", "seulement la date", "rien, on retient tout de tête"],
    "les mots importants, en abrégé",
    "De bonnes notes gardent l'essentiel avec peu de mots."
  ),
  qcm(
    "cm2_fr_fixed_ecrit_4",
    "ecriture_produire",
    "cm2_ecrit_paragraphe",
    2,
    "Quand on change d'idée dans un texte, on...",
    [
      "ajoute un titre pour annoncer la nouvelle partie",
      "va à la ligne pour commencer un nouveau paragraphe",
      "met un point-virgule pour marquer la séparation",
      "continue à la suite, en changeant de connecteur",
    ],
    "va à la ligne pour commencer un nouveau paragraphe",
    "Chaque nouvelle idée mérite un nouveau paragraphe, en allant à la ligne."
  ),
  qcm(
    "cm2_fr_fixed_ecrit_5",
    "ecriture_produire",
    "cm2_ecrit_varie",
    2,
    "Pour écrire un dialogue entre deux personnages, on utilise surtout...",
    ["des chiffres", "des tirets et des guillemets", "des titres", "une seule très longue phrase"],
    "des tirets et des guillemets",
    "Le dialogue se marque par des tirets et des guillemets qui montrent qui parle."
  ),
  qcm(
    "cm2_fr_fixed_ecrit_6",
    "ecriture_reviser",
    "cm2_ecrit_reviser",
    3,
    "Pour enrichir la phrase « Le chien court. », on peut écrire...",
    [
      "Le chien court, le chien court, le chien court.",
      "Le grand chien noir court dans le jardin.",
      "Le chien court vite et le chat dort tranquille.",
      "Le chien qui court est un chien qui court.",
    ],
    "Le grand chien noir court dans le jardin.",
    "Enrichir un texte, c'est ajouter des précisions (adjectifs, compléments) tout en gardant une phrase correcte."
  ),

  // ── 5. Écouter, présenter et argumenter ────────────────────────────────────
  qcm(
    "cm2_fr_fixed_oral_1",
    "oral_ecouter",
    "cm2_oral_ecouter",
    1,
    "Écouter un exposé pour en retenir l'idée principale, c'est...",
    ["repérer ce dont on parle le plus", "compter les mots prononcés", "regarder ailleurs", "penser à autre chose"],
    "repérer ce dont on parle le plus",
    "Écouter pour comprendre, c'est retenir le sujet principal et quelques détails."
  ),
  qcm(
    "cm2_fr_fixed_oral_2",
    "oral_ecouter",
    "cm2_oral_reformuler",
    2,
    "Synthétiser ce qu'un camarade vient de dire, c'est...",
    ["répéter chaque mot exactement", "le redire en plus court, avec l'essentiel", "ajouter une nouvelle histoire", "dire le contraire"],
    "le redire en plus court, avec l'essentiel",
    "Synthétiser, c'est reformuler brièvement en gardant l'idée importante."
  ),
  qcm(
    "cm2_fr_fixed_oral_3",
    "oral_echanger",
    "cm2_oral_presenter",
    2,
    "Pour présenter un exposé sur les volcans, il vaut mieux employer...",
    ["des mots vagues comme « le truc », « la chose »", "des mots précis comme « lave », « cratère », « éruption »", "aucun mot difficile", "seulement des gestes"],
    "des mots précis comme « lave », « cratère », « éruption »",
    "Un exposé clair emploie le vocabulaire précis du sujet."
  ),
  qcm(
    "cm2_fr_fixed_oral_4",
    "oral_echanger",
    "cm2_oral_argumenter",
    2,
    "Pour appuyer ton avis « Ce livre est drôle », tu ajoutes...",
    // Trois VRAIS sophismes à la place de trois blagues — répétition, ralliement,
    // argument de nombre. On gagne l'équilibre des longueurs ET l'exercice.
    [
      "une deuxième fois ton avis, en parlant plus fort",
      "un exemple : « la scène du gâteau m'a fait rire »",
      "que beaucoup de gens trouvent ce livre drôle",
      "l'avis d'un camarade qui pense la même chose",
    ],
    "un exemple : « la scène du gâteau m'a fait rire »",
    "Un bon argument s'appuie sur une preuve ou un exemple précis."
  ),
  qcm(
    "cm2_fr_fixed_oral_5",
    "oral_echanger",
    "cm2_oral_debat",
    3,
    "Dans un débat réglé, quand on n'est pas d'accord, on...",
    ["coupe la parole pour crier plus fort", "se moque de l'autre", "attend son tour et explique poliment son désaccord", "quitte la salle"],
    "attend son tour et explique poliment son désaccord",
    "Un débat réglé demande d'écouter, d'attendre son tour et de justifier son avis avec respect."
  ),

  // ── 6. Vocabulaire, nuances et orthographe lexicale ────────────────────────
  qcm(
    "cm2_fr_fixed_voc_1",
    "vocabulaire_emploi",
    "cm2_voc_orthographe",
    1,
    "Quelle est l'orthographe correcte ?",
    ["exercisse", "exersice", "exercice", "exercicce"],
    "exercice",
    "On mémorise l'orthographe des mots fréquents : « exercice », avec un « c » puis un « c » qui se prononce [s]."
  ),
  qcm(
    "cm2_fr_fixed_voc_2",
    "vocabulaire_sens",
    "cm2_voc_contexte",
    2,
    "Dans « La vieille cabane était vétuste et menaçait de s'écrouler », vétuste veut dire...",
    ["neuf et solide", "vieux et abîmé", "propre et rangé", "grand et clair"],
    "vieux et abîmé",
    "Le contexte « menaçait de s'écrouler » montre que vétuste veut dire vieux et abîmé."
  ),
  qcm(
    "cm2_fr_fixed_voc_3",
    "vocabulaire_formation",
    "cm2_voc_famille_prefixe_suffixe",
    2,
    "Avec le préfixe « in- », que veut dire « invisible » ?",
    ["qu'on voit très bien", "qu'on ne peut pas voir", "qu'on voit deux fois", "qu'on voit la nuit"],
    "qu'on ne peut pas voir",
    "Le préfixe « in- » exprime le contraire : invisible = qu'on ne peut pas voir."
  ),
  qcm(
    "cm2_fr_fixed_voc_4",
    "vocabulaire_sens",
    "cm2_voc_polysemie",
    2,
    "Quelle phrase utilise « opération » au sens des mathématiques ?",
    ["Le chirurgien a réussi l'opération.", "L'addition est une opération.", "L'opération de police a duré une heure.", "Le magasin lance une opération commerciale."],
    "L'addition est une opération.",
    "Le mot « opération » a plusieurs sens ; ici, « addition » montre le sens mathématique."
  ),
  qcm(
    "cm2_fr_fixed_voc_5",
    "vocabulaire_emploi",
    "cm2_voc_reemploi",
    2,
    "Quelle phrase emploie correctement le mot « généreux » ?",
    ["Un homme généreux partage ce qu'il a.", "Le généreux est posé sur la table.", "Il court généreux le matin.", "Généreux bleu la maison."],
    "Un homme généreux partage ce qu'il a.",
    "On réemploie un mot dans une phrase où il a du sens : « généreux » qualifie une personne qui donne."
  ),
  qcm(
    "cm2_fr_fixed_voc_6",
    "vocabulaire_sens",
    "cm2_voc_nuance",
    3,
    "Pour dire qu'on a très peur, quel mot est le plus fort ?",
    ["inquiet", "surpris", "terrifié", "gêné"],
    "terrifié",
    "« Terrifié » marque une peur très intense, plus forte que « inquiet »."
  ),

  /* ── 6 bis. Sens figuré, niveaux de langue, racines, composition, homonymes ──
     Ajoutés le 15/08/2026. Deux sources qui se recoupent : les « Attendus de
     fin d'année de CM2 » réclament racines latines et grecques, homonymie et
     composition ; et l'évaluation nationale de 6ᵉ mesure le niveau de langue
     et le sens figuré, sur lesquels les écarts au national sont les plus
     lourds de toute l'épreuve de lexique (26 % contre 57 %, 64 % contre 82 %).
     Trois items fixes par micro-compétence : c'est le seuil sous lequel
     `auditer-banque` annonce une répétition garantie. */

  qcm(
    "cm2_fr_fixed_voc_figure_1",
    "vocabulaire_sens",
    "cm2_voc_sens_figure",
    2,
    "Dans « Elle a dévoré ce livre en une soirée », le verbe « dévorer » est employé...",
    ["au sens propre", "au sens figuré", "comme un nom", "comme un adjectif"],
    "au sens figuré",
    "On ne mange pas un livre : quand le verbe ne peut pas être pris au pied de la lettre, il est au sens figuré."
  ),
  qcm(
    "cm2_fr_fixed_voc_figure_2",
    "vocabulaire_sens",
    "cm2_voc_sens_figure",
    2,
    "Que veut dire l'expression « avoir le cœur sur la main » ?",
    ["être très généreux", "avoir mal au cœur", "tenir un objet dans la main", "avoir peur"],
    "être très généreux",
    "Une expression imagée ne se comprend pas mot à mot : la main qui donne dit la générosité."
  ),
  qcm(
    "cm2_fr_fixed_voc_figure_3",
    "vocabulaire_sens",
    "cm2_voc_sens_figure",
    3,
    "Dans quelle phrase « brûler » est-il employé au sens PROPRE ?",
    ["Il brûle d'impatience.", "Le feu de camp brûle depuis une heure.", "Elle a brûlé les étapes.", "Ce comédien brûle les planches."],
    "Le feu de camp brûle depuis une heure.",
    "Le sens propre est le sens premier, celui qu'on peut voir : ici, une vraie flamme."
  ),

  qcm(
    "cm2_fr_fixed_voc_registre_1",
    "vocabulaire_emploi",
    "cm2_voc_niveau_langue",
    1,
    "Parmi ces mots, lequel appartient au langage familier ?",
    ["livre", "bouquin", "ouvrage", "roman"],
    "bouquin",
    "« Bouquin » se dit entre amis, pas dans un devoir : c'est le registre familier."
  ),
  qcm(
    "cm2_fr_fixed_voc_registre_2",
    "vocabulaire_emploi",
    "cm2_voc_niveau_langue",
    2,
    "Tu écris une lettre au maire de ta commune. Quelle formulation choisis-tu ?",
    ["Faut que vous regardiez mon truc.", "Répondez-moi vite s'il vous plaît.", "Je vous prie de bien vouloir examiner ma demande.", "Jetez un œil à ma demande."],
    "Je vous prie de bien vouloir examiner ma demande.",
    "On adapte le niveau de langue à qui l'on s'adresse : à une autorité, on écrit en langage soutenu."
  ),
  qcm(
    "cm2_fr_fixed_voc_registre_3",
    "vocabulaire_emploi",
    "cm2_voc_niveau_langue",
    3,
    "Range du plus familier au plus soutenu : voiture, bagnole, automobile.",
    ["voiture, bagnole, automobile", "bagnole, voiture, automobile", "automobile, voiture, bagnole", "bagnole, automobile, voiture"],
    "bagnole, voiture, automobile",
    "Familier, courant, soutenu : c'est l'ordre du registre, pas celui de la longueur du mot."
  ),

  qcm(
    "cm2_fr_fixed_voc_racine_1",
    "vocabulaire_formation",
    "cm2_voc_racines",
    2,
    "Dans « bibliothèque », que veut dire la racine grecque « biblio » ?",
    ["maison", "livre", "école", "papier"],
    "livre",
    "« Biblio » veut dire livre et « thèque » rangement : une bibliothèque range des livres."
  ),
  qcm(
    "cm2_fr_fixed_voc_racine_2",
    "vocabulaire_formation",
    "cm2_voc_racines",
    2,
    "Dans « aquarium » et « aquatique », que désigne la racine latine « aqua » ?",
    ["le verre", "le poisson", "l'eau", "le sable"],
    "l'eau",
    "Une racine commune éclaire toute une famille de mots : « aqua », c'est l'eau."
  ),
  qcm(
    "cm2_fr_fixed_voc_racine_3",
    "vocabulaire_formation",
    "cm2_voc_racines",
    3,
    "« Télé » veut dire « loin ». Que fait donc un téléphone ?",
    ["il montre des images", "il sonne très fort", "il porte la voix au loin", "il enregistre des sons"],
    "il porte la voix au loin",
    "« Télé » (loin) et « phone » (voix) : le mot dit lui-même à quoi il sert."
  ),

  qcm(
    "cm2_fr_fixed_voc_compose_1",
    "vocabulaire_formation",
    "cm2_voc_composition",
    1,
    "Quel mot est formé par composition, c'est-à-dire par la réunion de deux mots ?",
    ["portail", "porte-monnaie", "portier", "portable"],
    "porte-monnaie",
    "Un mot composé réunit deux mots qui existent seuls : porte et monnaie."
  ),
  qcm(
    "cm2_fr_fixed_voc_compose_2",
    "vocabulaire_formation",
    "cm2_voc_composition",
    2,
    "Lequel de ces mots N'EST PAS un mot composé ?",
    ["grand-père", "arc-en-ciel", "grandeur", "sous-marin"],
    "grandeur",
    "« Grandeur » vient de « grand » et du suffixe -eur : c'est une dérivation, pas une composition."
  ),
  qcm(
    "cm2_fr_fixed_voc_compose_3",
    "vocabulaire_formation",
    "cm2_voc_composition",
    2,
    "Que désigne le mot composé « ouvre-boîte » ?",
    ["une boîte qui s'ouvre seule", "un outil qui sert à ouvrir des boîtes", "une boîte ouverte", "une personne qui range des boîtes"],
    "un outil qui sert à ouvrir des boîtes",
    "Dans un mot composé formé d'un verbe et d'un nom, le premier dit l'action et le second sur quoi elle porte."
  ),

  qcm(
    "cm2_fr_fixed_voc_homonyme_1",
    "vocabulaire_formation",
    "cm2_voc_homonymie",
    1,
    "« Le ver, le verre, le vert » : ces mots sont...",
    ["des synonymes", "des homonymes", "des antonymes", "des mots de la même famille"],
    "des homonymes",
    "Les homonymes se prononcent de la même façon mais n'ont ni le même sens ni la même orthographe."
  ),
  qcm(
    "cm2_fr_fixed_voc_homonyme_2",
    "vocabulaire_formation",
    "cm2_voc_homonymie",
    2,
    "Quel mot est l'homonyme de « conte », une histoire ?",
    ["contre", "comté", "compte", "content"],
    "compte",
    "Même prononciation, sens différent : un conte se raconte, un compte se calcule."
  ),
  qcm(
    "cm2_fr_fixed_voc_homonyme_3",
    "vocabulaire_formation",
    "cm2_voc_homonymie",
    3,
    "Lequel de ces couples N'EST PAS un couple d'homonymes ?",
    ["mer / mère", "cour / cours", "grand / grande", "temps / tant"],
    "grand / grande",
    "« Grand » et « grande » sont le même mot au masculin et au féminin, pas deux mots différents."
  ),

  // ── 7. Phrase, groupes, accords et homophones ──────────────────────────────
  qcm(
    "cm2_fr_fixed_gram_1",
    "grammaire_phrase",
    "cm2_gram_phrase_simple",
    1,
    "Combien de verbes conjugués contient une phrase simple ?",
    ["un seul", "deux", "trois", "aucun"],
    "un seul",
    "Une phrase simple est construite autour d'un seul verbe conjugué."
  ),
  qcm(
    "cm2_fr_fixed_gram_2",
    "grammaire_phrase",
    "cm2_gram_sujet_verbe",
    1,
    "Dans « Chaque matin, les coqs du village chantent », quel est le verbe conjugué ?",
    ["matin", "coqs", "chantent", "village"],
    "chantent",
    "Le verbe conjugué est le mot qui change avec le temps : « chantent »."
  ),
  qcm(
    "cm2_fr_fixed_gram_3",
    "grammaire_complements",
    "cm2_gram_complements",
    2,
    "Dans « Le soir, Léa lit un roman », quel groupe peut être supprimé sans casser la phrase ?",
    ["un roman", "Léa", "Le soir", "lit"],
    "Le soir",
    "« Le soir » est un complément circonstanciel : on peut le supprimer, la phrase reste correcte."
  ),
  qcm(
    "cm2_fr_fixed_gram_4",
    "grammaire_groupe_nominal",
    "cm2_gram_gn",
    2,
    "Dans « une tarte aux pommes toute chaude », quelles sont les expansions du nom « tarte » ?",
    ["« une » seulement", "« aux pommes » et « toute chaude »", "« tarte » seulement", "il n'y en a pas"],
    "« aux pommes » et « toute chaude »",
    "Les expansions précisent le nom noyau « tarte » : « aux pommes » et « toute chaude »."
  ),
  qcm(
    "cm2_fr_fixed_gram_5",
    "grammaire_accords",
    "cm2_orth_accord_gn",
    2,
    "Quel groupe nominal est correctement accordé ?",
    ["de grande fenêtres ouvertes", "de grandes fenêtres ouvertes", "de grandes fenêtre ouverte", "de grandes fenêtres ouvert"],
    "de grandes fenêtres ouvertes",
    "Tout le groupe s'accorde au féminin pluriel : « grandes », « fenêtres » et « ouvertes »."
  ),
  qcm(
    "cm2_fr_fixed_gram_6",
    "grammaire_accords",
    "cm2_orth_sujet_verbe",
    3,
    "Choisis la forme correcte : « Les élèves de la classe ___ à la cantine. »",
    ["mange", "manges", "mangent", "mangeons"],
    "mangent",
    "Le sujet est « les élèves » (pluriel), même s'il est suivi de « de la classe » : le verbe prend « -ent »."
  ),
  qcm(
    "cm2_fr_fixed_gram_7",
    "grammaire_accords",
    "cm2_orth_homophones",
    3,
    "Homophones « a » / « à » : choisis la phrase correcte.",
    ["Papa à rangé la voiture a sa place.", "Papa a rangé la voiture à sa place.", "Papa à rangé la voiture à sa place.", "Papa a rangé la voiture a sa place."],
    "Papa a rangé la voiture à sa place.",
    "« a » est le verbe avoir (on peut dire « avait ») ; « à » est un petit mot invariable qui indique le lieu."
  ),

  // ── 8. Se repérer dans la phrase complexe (écrit à la main) ────────────────
  qcm(
    "cm2_fr_fixed_complexe_1",
    "phrase_complexe",
    "cm2_complexe_propositions",
    1,
    "Combien de verbes conjugués dans « Quand la cloche sonne, les élèves rentrent en classe » ?",
    ["1", "2", "0", "3"],
    "2",
    "« sonne » et « rentrent » sont deux verbes conjugués : la phrase est complexe (deux propositions)."
  ),
  qcm(
    "cm2_fr_fixed_complexe_2",
    "phrase_complexe",
    "cm2_complexe_coordination",
    1,
    "Quelle phrase est une phrase simple (un seul verbe conjugué) ?",
    ["Le soleil brille et les enfants jouent.", "Le soleil brille sur la plage.", "Quand il pleut, je reste à la maison.", "Il lit un livre puis il dort."],
    "Le soleil brille sur la plage.",
    "« Le soleil brille sur la plage. » n'a qu'un verbe conjugué (« brille ») : c'est une phrase simple."
  ),
  qcm(
    "cm2_fr_fixed_complexe_3",
    "phrase_complexe",
    "cm2_complexe_coordination",
    2,
    "Dans « Il pleut mais nous sortons quand même », quel petit mot relie les deux propositions ?",
    ["il", "pleut", "mais", "quand même"],
    "mais",
    "« mais » est un mot de liaison (coordination) qui relie les deux propositions."
  ),
  qcm(
    "cm2_fr_fixed_complexe_4",
    "phrase_complexe",
    "cm2_complexe_pronom_relatif",
    2,
    "Complète : « La fille ___ chante est ma cousine. »",
    ["que", "qui", "où", "quand"],
    "qui",
    "« qui » relie la précision au nom « fille » et fait l'action de chanter : c'est le sujet du verbe."
  ),
  qcm(
    "cm2_fr_fixed_complexe_5",
    "phrase_complexe",
    "cm2_complexe_pronom_relatif",
    2,
    "Dans « Voici le livre que j'ai adoré », le mot « que » sert à...",
    [
      "remplacer le nom pour éviter de le répéter",
      "relier une précision au mot « livre »",
      "introduire une question sur le livre choisi",
      "marquer la comparaison entre deux livres",
    ],
    "relier une précision au mot « livre »",
    "« que » est un pronom relatif : il relie la proposition « j'ai adoré » au nom « livre »."
  ),
  qcm(
    "cm2_fr_fixed_complexe_6",
    "phrase_complexe",
    "cm2_complexe_propositions",
    3,
    "Dans « Je mets un manteau parce qu'il fait froid », quelle partie donne la cause ?",
    ["Je mets un manteau", "un manteau", "parce qu'il fait froid", "il"],
    "parce qu'il fait froid",
    "« parce qu'il fait froid » est la proposition qui explique la cause, introduite par « parce que »."
  ),

  // ── 9. Conjugaison et valeur des temps (écrit à la main) ───────────────────
  qcm(
    "cm2_fr_fixed_conj_1",
    "conjugaison_temps_simples",
    "cm2_conj_infinitif_groupe",
    1,
    "Quel est l'infinitif du verbe dans « Nous finissons notre travail » ?",
    ["finissons", "finir", "fini", "finira"],
    "finir",
    "L'infinitif est la forme non conjuguée : « finir » (verbe du 2e groupe, en -ir)."
  ),
  qcm(
    "cm2_fr_fixed_conj_2",
    "conjugaison_temps_simples",
    "cm2_conj_present",
    2,
    "Choisis la forme correcte au présent : « Nous ___ nos devoirs. »",
    ["faisons", "faisez", "faison", "faires"],
    "faisons",
    "Le verbe faire est irrégulier : au présent avec « nous », on écrit « nous faisons »."
  ),
  qcm(
    "cm2_fr_fixed_conj_3",
    "conjugaison_temps_simples",
    "cm2_conj_imparfait",
    2,
    "Choisis la forme correcte à l'imparfait : « Nous ___ dans le jardin. »",
    ["jouons", "jouions", "joueons", "jouyons"],
    "jouions",
    "À l'imparfait, avec « nous », le verbe jouer se termine par « -ions » : nous jouions."
  ),
  qcm(
    "cm2_fr_fixed_conj_4",
    "conjugaison_temps_simples",
    "cm2_conj_futur",
    2,
    "Choisis la forme correcte au futur : « Demain, tu ___ tes clés. »",
    ["prendra", "prendras", "prends", "prendrras"],
    "prendras",
    "Au futur, avec « tu », le verbe prendre devient « prendras » : demain, tu prendras."
  ),
  qcm(
    "cm2_fr_fixed_conj_5",
    "conjugaison_recit",
    "cm2_conj_passe_compose",
    2,
    "Choisis la forme correcte au passé composé : « Elles ___ à la maison. » (verbe rentrer)",
    ["sont rentré", "sont rentrées", "ont rentrées", "sont rentrer"],
    "sont rentrées",
    "Avec l'auxiliaire être, le participe passé s'accorde avec le sujet : « elles sont rentrées »."
  ),
  qcm(
    "cm2_fr_fixed_conj_6",
    "conjugaison_recit",
    "cm2_conj_passe_simple_intro",
    3,
    "Dans « Le loup entra dans la bergerie », à quel temps est le verbe « entra » ?",
    ["au présent", "au futur", "au passé simple", "à l'imparfait"],
    "au passé simple",
    "« entra » est une forme du passé simple, le temps du récit pour une action passée et brève."
  ),
  qcm(
    "cm2_fr_fixed_conj_7",
    "conjugaison_recit",
    "cm2_conj_valeur_temps",
    3,
    "Dans « Il lisait tranquillement quand la porte claqua », quel verbe raconte l'action soudaine ?",
    ["lisait", "claqua", "tranquillement", "porte"],
    "claqua",
    "L'imparfait « lisait » pose le décor ; le passé simple « claqua » marque l'action soudaine."
  ),
];
