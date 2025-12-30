/* ----------------------------------------
   CONSTANTES SCOLAIRES PARTAGÉES
---------------------------------------- */

type OptionSelect = { value: string; label: string; disabled?: boolean };
export const CLASSES = [
  // 🧒 École primaire
  { value: "CP", label: "CP" },
  { value: "CE1", label: "CE1" },
  { value: "CE2", label: "CE2" },
  { value: "CM1", label: "CM1" },
  { value: "CM2", label: "CM2" },

  // 🏫 Collège
  { value: "6e", label: "6e" },
  { value: "5e", label: "5e" },
  { value: "4e", label: "4e" },
  { value: "3e", label: "3e" },

  // 🎓 Lycée
  { value: "2de", label: "Seconde" },
  { value: "1re", label: "Première" },
  { value: "Tle", label: "Terminale" },

  // 🎓 Post-bac
  { value: "BTS1", label: "BTS 1re année" },
  { value: "BTS2", label: "BTS 2e année" },

  // 🧩 Niveaux regroupés (très utiles pour EleveAI)
  { value: "primaire", label: "Primaire (CP → CM2)" },
  { value: "college", label: "Collège (6e → 3e)" },
  { value: "lycee", label: "Lycée (Seconde → Terminale)" },
  { value: "postbac", label: "Post-bac (BTS)" },
] as const;

export const MATIERES: readonly OptionSelect[] = [
  // 📘 Fondamentaux
  { value: "", label: "📘 Fondamentaux", disabled: true },
  { value: "maths", label: "Mathématiques" },
  { value: "francais", label: "Français" },
  { value: "histoire-geo", label: "Histoire-Géographie" },
  { value: "physique-chimie", label: "Physique-Chimie" },
  { value: "svt", label: "SVT" },

  // ➕ Mathématiques – lycée
  { value: "", label: "➕ Mathématiques – Lycée", disabled: true },
  { value: "maths-spe-1re", label: "Mathématiques – Spécialité (Première)" },
  { value: "maths-spe-tle", label: "Mathématiques – Spécialité (Terminale)" },
  { value: "maths-complementaires", label: "Mathématiques complémentaires" },
  { value: "maths-expertes", label: "Mathématiques expertes" },

  // 🔬 Enseignement scientifique
  { value: "", label: "🔬 Enseignement scientifique", disabled: true },
  { value: "enseignement-scientifique", label: "Enseignement scientifique" },

  // 🌍 Langues vivantes
  { value: "", label: "🌍 Langues vivantes", disabled: true },
  { value: "anglais", label: "Anglais" },
  { value: "espagnol", label: "Espagnol" },
  { value: "allemand", label: "Allemand" },
  { value: "italien", label: "Italien" },
  { value: "portugais", label: "Portugais" },
  { value: "creole", label: "Créole" },
  { value: "autre-langue", label: "Autre langue vivante" },

  // 🧠 Sciences humaines & sociales
  { value: "", label: "🧠 Sciences humaines & sociales", disabled: true },
  { value: "philosophie", label: "Philosophie" },
  { value: "ses", label: "SES" },
  { value: "hggsp", label: "HGGSP" },
  { value: "geopolitique", label: "Géopolitique" },
  { value: "droit", label: "Droit" },
  { value: "management", label: "Management" },

  // 🔬 Sciences & technologie
  { value: "", label: "🔬 Sciences & technologie", disabled: true },
  { value: "technologie", label: "Technologie" },
  { value: "snt", label: "SNT" },
  { value: "nsi", label: "NSI" },
  { value: "sciences-ingenieur", label: "Sciences de l’ingénieur" },

  // 🎨 Arts
  { value: "", label: "🎨 Arts & expression", disabled: true },
  { value: "arts-plastiques", label: "Arts plastiques" },
  { value: "education-musicale", label: "Éducation musicale" },
  { value: "histoire-des-arts", label: "Histoire des arts" },

  // 🏃 EPS
  { value: "", label: "🏃 Corps & bien-être", disabled: true },
  { value: "eps", label: "EPS" },

  // 🧩 Primaire
  { value: "", label: "🧩 Primaire", disabled: true },
  { value: "questionner-le-monde", label: "Questionner le monde" },
  { value: "lecture-ecriture", label: "Lecture / Écriture" },
  { value: "calcul", label: "Calcul / Numération" },

  // 🧑‍💼 Pro / BTS
  { value: "", label: "🧑‍💼 Lycée pro / BTS", disabled: true },
  { value: "gestion", label: "Gestion" },
  { value: "comptabilite", label: "Comptabilité" },
  { value: "commerce", label: "Commerce / Vente" },
  { value: "marketing", label: "Marketing" },
  { value: "informatique", label: "Informatique" },

  // 🌱 Transversales
  { value: "", label: "🌱 Transversales", disabled: true },
  { value: "emi", label: "Éducation aux médias (EMI)" },
  { value: "edd", label: "Développement durable (EDD)" },
  { value: "orientation", label: "Orientation" },
  { value: "methodologie", label: "Méthodologie / Apprendre à apprendre" },

  // 🧩 Global
  { value: "", label: "────────", disabled: true },
  { value: "toutes", label: "Toutes les matières" },
] as const;

/* ----------------------------------------
   TYPES UTILES (optionnel mais propre)
---------------------------------------- */
// en haut du fichier (ou juste avant export const TACHES_PROF)

export const TACHES_PROF: readonly OptionSelect[] = [
  // ✅ PLANIFICATION PÉDAGOGIQUE
  { value: "", label: "📅 PLANIFICATION PÉDAGOGIQUE", disabled: true },
  { value: "plan_cours", label: "Plan de cours — Structurer une séquence pédagogique" },
  { value: "progression_annuelle", label: "Progression annuelle — Planification sur l'année scolaire" },
  { value: "sequence_pedagogique", label: "Séquence pédagogique — Planifier plusieurs séances articulées" },

  // ✅ ACTIVITÉS EN CLASSE
  { value: "", label: "🏫 ACTIVITÉS EN CLASSE", disabled: true },
  { value: "debat", label: "Débat — Organiser un débat argumenté" },
  { value: "fiche_activite", label: "Fiche d'activité — Créer une fiche d'exercices structurée" },
  { value: "jeu_role", label: "Jeu de rôle — Mettre en scène des situations pédagogiques" },
  { value: "jeu_educatif", label: "Jeu éducatif — Activité ludique d'apprentissage" },
  { value: "td", label: "Travaux dirigés (TD) — Encadrer un exercice guidé en classe" },
  { value: "tp", label: "Travaux pratiques (TP) — Réaliser des manipulations ou expérimentations" },

  // ✅ ÉVALUATION
  { value: "", label: "🧾 ÉVALUATION", disabled: true },
  { value: "devoir_dm", label: "Devoir / DM — Proposer un travail à la maison" },
  { value: "evaluation", label: "Évaluation — Concevoir une évaluation" },
  { value: "evaluation_formative", label: "Évaluation formative — Mesurer en continu pour ajuster l'enseignement" },
  { value: "grille_evaluation", label: "Grille d'évaluation — Outil d'évaluation critériée" },
  { value: "quiz_qcm", label: "Quiz / QCM — Construire un questionnaire auto-corrigé" },
  { value: "rubrique_competences", label: "Rubrique de compétences — Référentiel détaillé" },

  // ✅ PROJETS
  { value: "", label: "🧩 PROJETS", disabled: true },
  { value: "projet", label: "Projet — Concevoir un projet pédagogique" },
  { value: "projet_interdisciplinaire", label: "Projet interdisciplinaire — Croiser plusieurs matières sur un même objectif" },

  // ✅ DIFFÉRENCIATION ET REMÉDIATION
  { value: "", label: "🧠 DIFFÉRENCIATION & REMÉDIATION", disabled: true },
  { value: "differenciation", label: "Différenciation — Adapter aux besoins spécifiques" },
  { value: "remediation", label: "Remédiation — Proposer des activités de rattrapage ciblées" },

  // ✅ COMMUNICATION ET EXPRESSION
  { value: "", label: "🗣️ COMMUNICATION & EXPRESSION", disabled: true },
  { value: "correspondances", label: "Correspondances — Mettre en place des échanges (lettres, mails)" },
  { value: "lettre_motivation", label: "Lettre de motivation — Rédaction de lettre professionnelle" },
  { value: "presentation_orale", label: "Présentation orale — Structurer une prise de parole" },

  // ✅ CONTENUS ET EXPLICATIONS
  { value: "", label: "📚 CONTENUS & EXPLICATIONS", disabled: true },
  { value: "explication", label: "Explication — Expliquer un concept complexe" },
  { value: "fiche_methode", label: "Fiche méthode — Formaliser une méthode ou procédure" },
  { value: "presentation_support", label: "Présentation — Support de cours / présentation magistrale" },

  // ✅ SUPPORTS DE RÉVISION
  { value: "", label: "🧠 SUPPORTS DE RÉVISION", disabled: true },
  { value: "affichage_classe", label: "Affichage de classe — Support d'affichage permanent" },
  { value: "carte_mentale", label: "Carte mentale — Représentation visuelle des concepts" },
  { value: "fiche_revision", label: "Fiche de révision — Support de mémorisation et révision" },
  { value: "memo_eleve", label: "Mémo élève — Aide-mémoire" },
  { value: "synthese_cours", label: "Synthèse de cours — Résumé structuré des apprentissages" },

  // ✅ SUPPORTS MULTIMÉDIAS
  { value: "", label: "🎥 SUPPORTS MULTIMÉDIAS", disabled: true },
  { value: "infographie", label: "Infographie — Support visuel synthétique et attractif" },
  { value: "podcast_educatif", label: "Podcast éducatif — Contenu audio pédagogique" },
  { value: "video_pedagogique", label: "Vidéo pédagogique — Contenu multimédia pour l'apprentissage" },

  // ✅ CORRECTION ET SUIVI
  { value: "", label: "✅ CORRECTION & SUIVI", disabled: true },
  { value: "consignes_travail", label: "Consignes de travail — Instructions claires pour une activité" },
  { value: "corrige_detaille", label: "Corrigé détaillé — Correction explicative et pédagogique" },

  // ✅ ORIENTATION ET PARCOURS
  { value: "", label: "🧭 ORIENTATION & PARCOURS", disabled: true },
  { value: "cv_competences", label: "CV par compétences — CV axé compétences" },
  { value: "dossier_orientation", label: "Dossier d'orientation — Support pour l'orientation scolaire" },
  { value: "portfolio_eleve", label: "Portfolio élève — Recueil de travaux et réflexions" },
  { value: "rapport_stage", label: "Rapport de stage — Structure et contenu de rapport professionnel" },

  // ✅ SUIVI ET RÉFLEXION
  { value: "", label: "📝 SUIVI & RÉFLEXION", disabled: true },
  { value: "carnet_bord", label: "Carnet de bord — Suivi et réflexion sur les apprentissages" },
  { value: "journal_apprentissage", label: "Journal d'apprentissage — Réflexion métacognitive de l'élève" },

  // ✅ AUTRES
  { value: "", label: "➕ AUTRES", disabled: true },
  { value: "autre", label: "Autre — Usage personnalisé" },
] as const;

export type TacheProfValue = (typeof TACHES_PROF)[number]["value"];
export type ClasseValue = (typeof CLASSES)[number]["value"];
export type MatiereValue = (typeof MATIERES)[number]["value"];
