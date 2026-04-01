// 🔹 Contient la liste de tous les défis

import type { Defi } from "../types";

export const defis: Defi[] = [
  {
    id: "defi-1",
    question: "Si l’IA te donne toujours la réponse, que risques-tu de perdre ?",
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

    date: "2026-04-01", // 👉 défi affiché ce jour-là

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
];