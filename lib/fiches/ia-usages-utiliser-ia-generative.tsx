// ─── Fiche de cours IA : utiliser une IA générative (Usages) ───────────────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheGenerative
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 2.2), coulé dans le
// schéma FicheCoursData. La « formule » ici est la recette du bon prompt :
// contexte + tâche + contraintes + format.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheUtiliserIaGenerative: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "usages",
  notion: "utiliser-ia-generative",
  titre: "Utiliser une IA générative",
  accroche:
    "Une IA générative (comme un agent conversationnel) produit du texte, des images ou du code à partir d'une consigne appelée « prompt ». Bien l'utiliser, c'est savoir lui demander, vérifier ses réponses et rester responsable.",
  identite: [
    { label: "Prérequis", valeur: "Savoir formuler une consigne" },
    { label: "Idée clé", valeur: "Un bon prompt = précis + contexte" },
    { label: "Réflexe", valeur: "Toujours vérifier la réponse" },
  ],
  definition: {
    texte:
      "Une IA générative est une intelligence artificielle qui produit un contenu nouveau — texte, image, son ou code — à partir d'une consigne écrite appelée « prompt ». Elle ne « sait » pas si c'est vrai : elle prédit, mot après mot, la suite la plus probable, et peut donc inventer une information fausse présentée comme vraie (une hallucination).",
  },
  proprietes: [
    {
      titre: "Le contexte",
      texte: "Dis qui tu es et pour quoi : « Je suis en 4e, pour un exposé… »",
    },
    {
      titre: "La tâche",
      texte:
        "Donne un verbe d'action clair : résume, explique, compare, traduis…",
    },
    {
      titre: "Les contraintes",
      texte:
        "Précise les limites : longueur, niveau, langue, ce qu'il faut éviter.",
    },
    {
      titre: "Le format",
      texte:
        "Indique la forme voulue : liste, tableau, plan en 3 parties, paragraphe court.",
    },
  ],
  reel: {
    texte:
      "Résumer un texte, traduire, trouver des idées, faire expliquer autrement une notion, s'entraîner avant un contrôle, rédiger un plan d'exposé. L'IA générative est un assistant — utile si on garde la main.",
  },
  historique: {
    texte:
      "Le grand public a découvert les IA génératives fin 2022, avec le lancement de ChatGPT : environ 100 millions d'utilisateurs en deux mois, un record à l'époque. Depuis, ces assistants produisent aussi des images, du son et du code, et savoir bien les questionner est devenu une compétence à part entière — au point d'entrer dans le référentiel Pix.",
  },
  formule: {
    contexte: "La recette d'un bon prompt",
    expression: "contexte + tâche + contraintes + format",
    legende:
      "Exemple complet : « Je suis en 6e (contexte). Résume ce texte (tâche) en 5 phrases simples, sans mots compliqués (contraintes), sous forme de liste à puces (format). »",
  },
  methode: [
    {
      titre: "Écrire un bon prompt",
      texte:
        "Plus ta demande est précise et donne du contexte, plus la réponse colle à ton besoin. Un mot seul ne suffit pas.",
    },
    {
      titre: "Itérer",
      texte:
        "Si la réponse ne convient pas, reformule ou précise. On avance par allers-retours : « plus court », « avec un exemple »…",
    },
    {
      titre: "Vérifier",
      texte:
        "L'IA peut se tromper : on vérifie les infos importantes, et on ne lui confie jamais de données personnelles.",
    },
  ],
  usages: [
    {
      titre: "Comprendre et reformuler",
      detail:
        "Résumer un texte, traduire, ou faire expliquer autrement une notion qu'on n'a pas comprise.",
    },
    {
      titre: "Créer et organiser",
      detail:
        "Trouver des idées et rédiger un plan d'exposé — l'IA propose, tu choisis et tu rédiges.",
    },
    {
      titre: "S'entraîner",
      detail:
        "Se faire poser des questions avant un contrôle, puis vérifier ses réponses.",
    },
  ],
  exemples: [
    {
      titre: "Prompt trop vague → prompt précis",
      donnees: "Vague : « volcan ».",
      question: "Comment mieux demander ?",
      solution:
        "« Je suis en 6e. Explique en 5 phrases simples comment se forme un volcan, avec un exemple. » → contexte + tâche + format.",
    },
    {
      titre: "Itérer pour améliorer",
      donnees: "L'IA donne un texte trop long.",
      question: "Que faire ensuite ?",
      solution:
        "On relance : « Résume ta réponse en 3 phrases, pour un élève de 6e. » On affine sans tout réécrire.",
    },
  ],
  pieges: [
    "Tout croire sans vérifier : l'IA peut inventer des faits (hallucinations).",
    "Donner des données personnelles, sensibles ou confidentielles.",
    "Copier-coller la réponse sans la comprendre (et sans citer l'aide de l'IA).",
    "Écrire un prompt trop court ou trop vague.",
  ],
  aRetenir: [
    "Un bon prompt est précis, avec le contexte, la tâche et le format attendus.",
    "On progresse par itérations : on reformule jusqu'au bon résultat.",
    "On vérifie toujours les informations importantes en croisant les sources.",
    "On ne confie jamais de données personnelles à une IA en ligne.",
    "L'IA aide à apprendre, elle ne remplace pas ta réflexion.",
  ],
  entrainement: [
    {
      question:
        "Réécris ce prompt pour qu'il soit efficace : « parle-moi des dinosaures ».",
      correction:
        "Par exemple : « Je suis en 6e. Explique en 5 phrases simples pourquoi les dinosaures ont disparu, avec un exemple. » (contexte + tâche + format)",
    },
    {
      question:
        "Une IA t'affirme une date précise pour un exposé noté. Quel est le bon réflexe ?",
      correction:
        "Vérifier cette date dans une source fiable (manuel, encyclopédie, site sérieux) avant de l'utiliser : l'IA peut se tromper.",
    },
    {
      question: "La réponse de l'IA est correcte mais trop compliquée. Que fais-tu ?",
      correction:
        "Tu itères : « Explique plus simplement, pour un élève de 6e, avec un exemple du quotidien. »",
    },
    {
      question:
        "Tu veux que l'IA t'aide pour un devoir. Quelles informations ne dois-tu PAS lui donner ?",
      correction:
        "Aucune donnée personnelle ou sensible : nom complet, adresse, numéro, mot de passe, informations privées sur toi ou les autres.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesUtiliserIaGenerative: ClasseSlide[] = [];
