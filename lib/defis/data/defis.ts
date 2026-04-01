// 🔹 Contient la liste de tous les défis
// 🔹 Chaque défi peut avoir une image générée plus tard avec l'IA

import type { Defi } from "../types";

export const defis: Defi[] = [
  {
    id: "defi-1",
    question:
      "Si l’IA te donne toujours la réponse, que risques-tu de perdre ?",
    choix: [
      "Du temps",
      "La capacité de réfléchir",
      "L’envie de lire",
      "Rien du tout",
    ],
    bonneReponse: "La capacité de réfléchir",
    explication:
      "L’IA peut répondre vite, mais apprendre demande aussi de chercher et comprendre.",
    reflexion:
      "Penser est une compétence. Si on laisse toujours l’IA penser à notre place, on progresse moins.",
    theme: "ia-apprentissage",
    date: "2026-04-01",
    image: "",
  },

  {
    id: "defi-2",
    question: "Comment l’IA peut-elle aider à gérer l’eau à La Réunion ?",
    choix: [
      "En créant de l’eau",
      "En prévoyant les besoins et les fuites",
      "En remplaçant les canalisations",
      "En empêchant la pluie",
    ],
    bonneReponse: "En prévoyant les besoins et les fuites",
    explication:
      "L’IA analyse les données pour détecter les pertes et prévoir la consommation.",
    reflexion:
      "L’IA ne remplace pas les infrastructures. Elle aide à mieux décider.",
    theme: "ia-reunion",
    image: "",
  },

  {
    id: "defi-3",
    question: "Pourquoi faut-il parfois se méfier de l’IA ?",
    choix: [
      "Elle refuse de répondre",
      "Elle peut inventer des réponses",
      "Elle est trop lente",
      "Elle est compliquée",
    ],
    bonneReponse: "Elle peut inventer des réponses",
    explication:
      "L’IA peut produire des réponses plausibles mais incorrectes.",
    reflexion:
      "Une réponse doit être vérifiée, pas simplement acceptée.",
    theme: "ia-esprit-critique",
    image: "",
  },

  {
    id: "defi-4",
    question: "Quel est le meilleur usage de l’IA pour apprendre ?",
    choix: [
      "Copier directement la réponse",
      "Vérifier un raisonnement",
      "Éviter de réfléchir",
      "Faire le travail à sa place",
    ],
    bonneReponse: "Vérifier un raisonnement",
    explication:
      "L’IA est utile quand elle aide à reformuler, vérifier ou guider sans remplacer l’élève.",
    reflexion:
      "L’IA devient intéressante quand elle accompagne la pensée au lieu de la court-circuiter.",
    theme: "ia-apprentissage",
    image: "",
  },

  {
    id: "defi-5",
    question: "Pourquoi l’IA peut-elle être utile pour prévoir les cyclones ?",
    choix: [
      "Elle empêche les cyclones",
      "Elle analyse beaucoup de données météo",
      "Elle remplace les secours",
      "Elle protège directement les maisons",
    ],
    bonneReponse: "Elle analyse beaucoup de données météo",
    explication:
      "L’IA peut traiter rapidement des données météorologiques complexes pour aider à anticiper.",
    reflexion:
      "Prévoir ne veut pas dire empêcher. L’IA aide surtout à mieux se préparer.",
    theme: "ia-reunion",
    image: "",
  },

  {
    id: "defi-6",
    question: "Comment l’IA peut-elle aider à mieux gérer les déchets à La Réunion ?",
    choix: [
      "En faisant disparaître les déchets",
      "En optimisant le tri et la collecte",
      "En supprimant les emballages",
      "En les envoyant dans l’océan",
    ],
    bonneReponse: "En optimisant le tri et la collecte",
    explication:
      "L’IA peut aider à organiser les tournées, analyser les volumes et améliorer le tri.",
    reflexion:
      "L’IA améliore les systèmes, mais elle ne remplace pas les gestes humains.",
    theme: "ia-reunion",
    image: "",
  },

  {
    id: "defi-7",
    question: "Qu’est-ce que l’IA ne peut pas faire à ta place ?",
    choix: [
      "Calculer rapidement",
      "Écrire un texte",
      "Comprendre à ta place",
      "Donner une réponse",
    ],
    bonneReponse: "Comprendre à ta place",
    explication:
      "L’IA peut produire une réponse, mais la compréhension reste un travail personnel.",
    reflexion:
      "Apprendre, ce n’est pas recevoir une réponse : c’est transformer cette réponse en compréhension.",
    theme: "ia-apprentissage",
    image: "",
  },

  {
    id: "defi-8",
    question: "Pourquoi faut-il vérifier une réponse donnée par l’IA ?",
    choix: [
      "Parce qu’elle peut se tromper",
      "Parce qu’elle refuse toujours",
      "Parce qu’elle est interdite",
      "Parce qu’elle ne répond jamais",
    ],
    bonneReponse: "Parce qu’elle peut se tromper",
    explication:
      "L’IA peut donner une réponse convaincante sans qu’elle soit exacte.",
    reflexion:
      "L’esprit critique reste indispensable, même face à une réponse bien formulée.",
    theme: "ia-esprit-critique",
    image: "",
  },

  {
    id: "defi-9",
    question: "Comment l’IA peut-elle aider à réduire les embouteillages ?",
    choix: [
      "En supprimant les voitures",
      "En optimisant les feux et les trajets",
      "En fermant toutes les routes",
      "En empêchant les gens de sortir",
    ],
    bonneReponse: "En optimisant les feux et les trajets",
    explication:
      "L’IA peut analyser le trafic en temps réel et améliorer la circulation.",
    reflexion:
      "L’IA peut fluidifier, mais elle ne remplace pas les choix d’aménagement et de transport.",
    theme: "ia-reunion",
    image: "",
  },

  {
    id: "defi-10",
    question: "Quel rôle l’IA peut-elle jouer dans l’énergie à La Réunion ?",
    choix: [
      "Créer du soleil",
      "Optimiser la production et la consommation",
      "Remplacer les centrales",
      "Fabriquer de l’électricité sans installation",
    ],
    bonneReponse: "Optimiser la production et la consommation",
    explication:
      "L’IA peut aider à équilibrer les besoins, la production et le stockage de l’énergie.",
    reflexion:
      "L’IA optimise ce qui existe. Elle ne crée pas à elle seule les ressources.",
    theme: "ia-reunion",
    image: "",
  },

  {
    id: "defi-11",
    question: "Pourquoi l’IA peut-elle être utile dans un hôpital ?",
    choix: [
      "Parce qu’elle remplace tous les médecins",
      "Parce qu’elle aide à analyser certaines données",
      "Parce qu’elle soigne seule",
      "Parce qu’elle décide toujours mieux qu’un humain",
    ],
    bonneReponse: "Parce qu’elle aide à analyser certaines données",
    explication:
      "L’IA peut aider à repérer des signaux ou à analyser des résultats, mais elle ne remplace pas le jugement médical.",
    reflexion:
      "Dans les domaines sensibles, l’IA doit assister sans décider seule.",
    theme: "ia-societe",
    image: "",
  },

  {
    id: "defi-12",
    question: "Pourquoi bien poser sa question à l’IA est important ?",
    choix: [
      "Parce que l’IA lit dans les pensées",
      "Parce qu’une question floue donne souvent une réponse floue",
      "Parce que l’IA refuse les questions simples",
      "Parce que cela ne change rien",
    ],
    bonneReponse: "Parce qu’une question floue donne souvent une réponse floue",
    explication:
      "La qualité de la réponse dépend souvent de la clarté de la demande.",
    reflexion:
      "Apprendre à bien demander fait partie des compétences de l’ère de l’IA.",
    theme: "ia-apprentissage",
    image: "",
  },
];