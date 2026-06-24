import type { Metadata } from "next";
import FicheCoursIa, { type FicheIaData } from "@/components/fiches/FicheCoursIa";

export const metadata: Metadata = {
  title: "Fiche IA — Utiliser une IA générative",
  description:
    "Écrire un bon prompt, itérer, vérifier les réponses et rester responsable. Fiche de cours IA (référentiel Pix, domaine Usages).",
};

export const fiche: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.2",
  titre: "Utiliser une IA générative",
  intro:
    "Une IA générative (comme un agent conversationnel) produit du texte, des images ou du code à partir d'une consigne appelée « prompt ». Bien l'utiliser, c'est savoir lui demander, vérifier ses réponses et rester responsable.",
  identite: [
    { label: "Prérequis", valeur: "Savoir formuler une consigne" },
    { label: "Idée clé", valeur: "Un bon prompt = précis + contexte" },
    { label: "Réflexe", valeur: "Toujours vérifier la réponse" },
  ],
  aQuoiCaSert:
    "Résumer un texte, traduire, trouver des idées, faire expliquer autrement une notion, s'entraîner avant un contrôle, rédiger un plan d'exposé. L'IA générative est un assistant — utile si on garde la main.",
  leSavaisTu:
    "Une IA générative ne « sait » pas si c'est vrai : elle prédit, mot après mot, la suite la plus probable. Elle peut donc inventer une information fausse présentée comme vraie — on appelle ça une hallucination.",
  notions: [
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
  pointsCles: {
    titre: "La recette d'un bon prompt",
    lignes: [
      { cle: "Contexte", detail: "Dis qui tu es et pour quoi : « Je suis en 4e, pour un exposé… »" },
      { cle: "Tâche", detail: "Donne un verbe d'action clair : résume, explique, compare, traduis…" },
      { cle: "Contraintes", detail: "Précise les limites : longueur, niveau, langue, ce qu'il faut éviter." },
      { cle: "Format", detail: "Indique la forme voulue : liste, tableau, plan en 3 parties, paragraphe court." },
    ],
    callout:
      "Exemple complet : « Je suis en 6e (contexte). Résume ce texte (tâche) en 5 phrases simples, sans mots compliqués (contraintes), sous forme de liste à puces (format). »",
  },
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
      question: "Réécris ce prompt pour qu'il soit efficace : « parle-moi des dinosaures ».",
      correction:
        "Par exemple : « Je suis en 6e. Explique en 5 phrases simples pourquoi les dinosaures ont disparu, avec un exemple. » (contexte + tâche + format)",
    },
    {
      question: "Une IA t'affirme une date précise pour un exposé noté. Quel est le bon réflexe ?",
      correction:
        "Vérifier cette date dans une source fiable (manuel, encyclopédie, site sérieux) avant de l'utiliser : l'IA peut se tromper.",
    },
    {
      question: "La réponse de l'IA est correcte mais trop compliquée. Que fais-tu ?",
      correction:
        "Tu itères : « Explique plus simplement, pour un élève de 6e, avec un exemple du quotidien. »",
    },
    {
      question: "Tu veux que l'IA t'aide pour un devoir. Quelles informations ne dois-tu PAS lui donner ?",
      correction:
        "Aucune donnée personnelle ou sensible : nom complet, adresse, numéro, mot de passe, informations privées sur toi ou les autres.",
    },
  ],
};

export default function UtiliserIaGenerativePage() {
  return <FicheCoursIa fiche={fiche} />;
}
