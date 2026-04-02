import type { Defi } from "../types";

export const defis: Defi[] = [

{
  id: "defi-1",
  question: "L’IA te dit que 2 × 3 = 5. Que dois-tu faire ?",
  choix: ["La croire", "Vérifier le calcul", "Copier", "Passer"],
  bonneReponse: "Vérifier le calcul",
  explication: "2 × 3 = 6, donc l’IA s’est trompée.",
  reflexion: "Toujours vérifier, même une réponse sûre.",
  theme: "ia-maths",
},

{
  id: "defi-2",
  question: "Un élève utilise l’IA pour répondre à 5 + 7 = 13. Que doit-il faire ?",
  choix: [
    "Faire confiance à l’IA",
    "Vérifier le calcul mentalement",
    "Copier la réponse",
    "Changer d’exercice"
  ],
  bonneReponse: "Vérifier le calcul mentalement",
  explication: "5 + 7 = 12, donc la réponse est fausse.",
  reflexion: "Même un calcul simple doit être vérifié par toi.",
  theme: "ia-maths",
},

{
  id: "defi-3",
  question: "Si tu ne comprends pas 1/2 + 1/2 = 1, as-tu appris ?",
  choix: ["Oui", "Non", "Parfois", "Toujours"],
  bonneReponse: "Non",
  explication: "Comprendre est essentiel.",
  reflexion: "Savoir ≠ comprendre.",
  theme: "reflexion",
},

{
  id: "defi-4",
  question: "0,9 + 0,1 = ?",
  choix: ["1", "0,10", "0,91", "1,1"],
  bonneReponse: "1",
  explication: "0,9 + 0,1 = 1",
  reflexion: "Attention aux décimaux.",
  theme: "maths",
},

{
  id: "defi-5",
  question: "Si l’IA fait tout à ta place, que perds-tu ?",
  choix: ["Du temps", "La réflexion", "La vitesse", "Rien"],
  bonneReponse: "La réflexion",
  explication: "Tu ne pratiques plus.",
  reflexion: "Apprendre = réfléchir.",
  theme: "ia",
},

{
  id: "defi-6",
  question: "10 × 0,1 = ?",
  choix: ["0", "10", "1", "100"],
  bonneReponse: "1",
  explication: "Tout × 0 = 0",
  reflexion: "Règle fondamentale.",
  theme: "maths",
},

{
  id: "defi-7",
  question: "L’IA donne une réponse. Que dois-tu faire ?",
  choix: ["Vérifier", "Copier", "Ignorer", "Changer"],
  bonneReponse: "Vérifier",
  explication: "Elle peut se tromper.",
  reflexion: "Esprit critique.",
  theme: "ia",
},

{
  id: "defi-8",
  question: "2 + 3 × 4 = ?",
  choix: ["14", "20", "10", "24"],
  bonneReponse: "14",
  explication: "2 + 12 = 14",
  reflexion: "Priorité ×.",
  theme: "maths",
},

{
  id: "defi-9",
  question: "Comprendre, c’est :",
  choix: ["Expliquer", "Copier", "Lire", "Regarder"],
  bonneReponse: "Expliquer",
  explication: "Si tu expliques, tu comprends.",
  reflexion: "Test ultime.",
  theme: "reflexion",
},

{
  id: "defi-10",
  question: "1 km = ? m",
  choix: ["100", "1000", "10", "10000"],
  bonneReponse: "1000",
  explication: "1 km = 1000 m",
  reflexion: "Conversion.",
  theme: "maths",
},

{
  id: "defi-11",
  question: "L’IA peut-elle se tromper ?",
  choix: ["Oui", "Non", "Jamais", "Toujours"],
  bonneReponse: "Oui",
  explication: "Elle peut faire des erreurs.",
  reflexion: "Rester critique.",
  theme: "ia",
},

{
  id: "defi-12",
  question: "3 × 4 = ?",
  choix: ["12", "10", "14", "8"],
  bonneReponse: "12",
  explication: "3 × 4 = 12",
  reflexion: "Base du calcul.",
  theme: "maths",
},

{
  id: "defi-13",
  question: "Apprendre demande :",
  choix: ["Effort", "Chance", "Vitesse", "Hasard"],
  bonneReponse: "Effort",
  explication: "Il faut travailler.",
  reflexion: "Progression.",
  theme: "reflexion",
},

{
  id: "defi-14",
  question: "0,5 = ?",
  choix: ["1/2", "1/5", "2/5", "5/10"],
  bonneReponse: "1/2",
  explication: "0,5 = 1/2",
  reflexion: "Lien fraction.",
  theme: "maths",
},

{
  id: "defi-15",
  question: "Pourquoi vérifier une réponse IA ?",
  choix: ["Elle peut être fausse", "Elle est lente", "Elle refuse", "Elle bloque"],
  bonneReponse: "Elle peut être fausse",
  explication: "Erreur possible.",
  reflexion: "Toujours vérifier.",
  theme: "ia",
},

{
  id: "defi-16",
  question: "10 ÷ 2 = ?",
  choix: ["5", "2", "10", "8"],
  bonneReponse: "5",
  explication: "10 ÷ 2 = 5",
  reflexion: "Division simple.",
  theme: "maths",
},

{
  id: "defi-17",
  question: "Si tu copies sans comprendre ?",
  choix: ["Tu apprends", "Tu ne comprends pas", "Tu progresses", "Tu gagnes"],
  bonneReponse: "Tu ne comprends pas",
  explication: "Compréhension essentielle.",
  reflexion: "Apprendre ≠ copier.",
  theme: "ia",
},

{
  id: "defi-18",
  question: "Somme des angles d’un triangle ?",
  choix: ["180°", "90°", "360°", "270°"],
  bonneReponse: "180°",
  explication: "Propriété.",
  reflexion: "À connaître.",
  theme: "maths",
},

{
  id: "defi-19",
  question: "Faire une erreur, c’est :",
  choix: ["Apprendre", "Perdre", "Échouer", "Inutile"],
  bonneReponse: "Apprendre",
  explication: "Les erreurs font progresser.",
  reflexion: "Important.",
  theme: "reflexion",
},

{
  id: "defi-20",
  question: "Plus vite = mieux apprendre ?",
  choix: ["Non", "Oui", "Toujours", "Souvent"],
  bonneReponse: "Non",
  explication: "Comprendre > vitesse",
  reflexion: "Prendre le temps.",
  theme: "reflexion",
},

];