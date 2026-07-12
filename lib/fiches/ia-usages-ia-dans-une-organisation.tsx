// ─── Fiche de cours IA : utiliser l'IA dans une organisation (Usages) ──────────
// Fiche « en blocs » : le contenu vient de l'ancienne ficheOrga
// (lib/fiches-ia.ts, référentiel Pix IA, compétence 2.5), coulé dans le
// schéma FicheCoursData. Pas de formule : la notion n'en a pas.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheIaDansUneOrganisation: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "usages",
  notion: "ia-dans-une-organisation",
  titre: "Utiliser l'IA dans une organisation",
  accroche:
    "Dans une entreprise, une association ou un établissement, l'IA peut aider — à condition de bien choisir les outils et de protéger les données.",
  identite: [
    { label: "Prérequis", valeur: "Usages de l'IA" },
    { label: "Idée clé", valeur: "Identifier le besoin, protéger les données" },
    { label: "Mot clé", valeur: "Charte d'usage" },
  ],
  definition: {
    texte:
      "Utiliser l'IA dans une organisation, c'est mettre un outil d'intelligence artificielle au service d'un besoin précis de l'entreprise, de l'association ou de l'établissement, en protégeant les données et en respectant les règles d'usage fixées en interne.",
  },
  proprietes: [
    {
      titre: "Le besoin",
      texte: "Tout part d'une question : quelle tâche veut-on améliorer ?",
    },
    {
      titre: "L'outil",
      texte:
        "On repère un outil qui intègre de l'IA et qui correspond vraiment au besoin.",
    },
    {
      titre: "Les données",
      texte:
        "La confidentialité des données et les conditions d'utilisation se vérifient avant d'adopter l'outil.",
    },
    {
      titre: "La charte",
      texte:
        "Une charte fixe les règles d'usage de l'IA dans l'organisation : tâches autorisées et précautions à prendre.",
    },
  ],
  reel: {
    texte:
      "Bien utiliser l'IA au travail : gagner du temps sur des tâches répétitives, tout en respectant la confidentialité et les règles de l'organisation.",
  },
  historique: {
    texte:
      "Fin novembre 2022, l'arrivée de ChatGPT a fait entrer l'IA générative dans les entreprises et les administrations en quelques mois. Dès 2023, beaucoup d'organisations ont rédigé des chartes internes d'usage de l'IA, et en 2024 l'Union européenne a adopté l'IA Act pour encadrer ces systèmes selon leur niveau de risque.",
  },
  methode: [
    {
      titre: "Identifier le besoin",
      texte:
        "Quelle tâche veut-on améliorer ? Gagner du temps, générer des contenus, analyser des données…",
    },
    {
      titre: "Choisir l'outil",
      texte:
        "Repérer un outil qui intègre de l'IA et correspond au besoin, en vérifiant données et conditions d'utilisation.",
    },
    {
      titre: "Encadrer l'usage",
      texte:
        "Une charte interne définit les tâches autorisées et les précautions à prendre sur les données.",
    },
  ],
  usages: [
    {
      titre: "Gagner du temps",
      detail:
        "Alléger des tâches répétitives, comme résumer des comptes-rendus de réunions.",
    },
    {
      titre: "Générer des contenus",
      detail:
        "Produire des textes ou des supports de travail — toujours à relire et vérifier avant de s'en servir.",
    },
    {
      titre: "Analyser des données",
      detail:
        "Faire ressortir des tendances ou des synthèses, sans jamais coller de données confidentielles dans une IA en ligne.",
    },
    {
      titre: "Fiabiliser avec le RAG",
      detail:
        "La génération augmentée par récupération (RAG) fait chercher l'IA dans une base de documents fiables avant de répondre, ce qui réduit les hallucinations sur ses propres documents.",
    },
  ],
  exemples: [
    {
      titre: "Résumer des comptes-rendus",
      donnees: "On veut gagner du temps sur des résumés de réunions.",
      question: "Quel point vérifier en priorité ?",
      solution:
        "La confidentialité des données et les conditions d'utilisation de l'outil.",
    },
  ],
  pieges: [
    "Coller des données personnelles ou confidentielles dans une IA en ligne.",
    "Adopter un outil sans lire les conditions d'utilisation.",
    "Croire les réponses sans les vérifier (hallucinations).",
  ],
  aRetenir: [
    "On part d'un besoin clair.",
    "On vérifie la confidentialité et les conditions.",
    "Une charte encadre l'usage de l'IA.",
    "Le RAG améliore la fiabilité sur ses propres documents.",
  ],
  entrainement: [
    {
      question: "Avant d'adopter un nouvel outil d'IA, que faut-il vérifier ?",
      correction:
        "Les conditions d'utilisation et les mentions légales sur les données.",
    },
    {
      question: "À quoi sert une charte d'usage de l'IA ?",
      correction:
        "À définir les règles d'utilisation autorisée de l'IA dans l'organisation.",
    },
    {
      question: "Qu'est-ce que le RAG (génération augmentée par récupération) ?",
      correction:
        "Faire chercher l'IA dans une base de documents fiables avant de répondre, pour réduire les hallucinations.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesIaDansUneOrganisation: ClasseSlide[] = [];
