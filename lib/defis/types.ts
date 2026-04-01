// 🔹 Définition du type "Defi"
// C’est le modèle que tous les défis doivent respecter

export type Defi = {
  id: string; // identifiant unique
  question: string; // question affichée
  choix: string[]; // réponses proposées (QCM)
  bonneReponse: string; // réponse correcte

  explication: string; // explication courte après réponse
  reflexion: string; // réflexion EleveAI (valeur pédagogique)

  theme: string; // ex: "ia-apprentissage", "ia-reunion"

  date?: string; // optionnel → permet de forcer le défi du jour (format: "YYYY-MM-DD")
  image?: string; // optionnel → chemin vers image (ex: "/images/defis/eau.jpg")
}; 