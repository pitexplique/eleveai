// ─── Fiche de cours : utiliser les services de recommandation (IA · Usages 2.4) ─
// Fiche IA coulée dans le moule « en blocs » : le contenu de l'ancienne page
// (lib/fiches-ia.ts, ficheServices) vit ici sous forme de FicheCoursData. La
// page app/fiches-cours/ia/usages/services-de-recommandation n'est plus qu'un
// point d'entrée (SEO + rendu unifié).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

export const ficheServicesDeRecommandation: FicheCoursData = {
  matiere: "ia",
  matiereLabel: "IA",
  classe: "usages",
  notion: "services-de-recommandation",
  titre: "Utiliser les services de recommandation",
  accroche:
    "Vidéos, réseaux sociaux, achats en ligne : ces services s'adaptent à toi. C'est pratique, mais il faut savoir garder le contrôle.",
  identite: [
    { label: "Prérequis", valeur: "Algorithmes de recommandation" },
    { label: "Idée clé", valeur: "Pratique mais à surveiller" },
    { label: "Réflexe", valeur: "Diversifier ses sources" },
  ],
  definition: {
    texte:
      "Un service de recommandation est un service en ligne (vidéos, réseaux sociaux, boutiques) qui utilise un algorithme pour sélectionner et personnaliser les contenus proposés à chaque utilisateur, à partir de ses données : historique, clics, préférences.",
  },
  proprietes: [
    {
      titre: "Les avantages",
      texte:
        "Un filtrage personnalisé dans une offre énorme : tu gagnes du temps et tu découvres de nouveaux contenus.",
    },
    {
      titre: "Les limites",
      texte:
        "L'enfermement algorithmique et la « chambre d'écho » : tu vois surtout ce qui te ressemble déjà.",
    },
    {
      titre: "Garder le contrôle",
      texte:
        "Régler ses paramètres, gérer son historique, et explorer volontairement d'autres sources.",
    },
    {
      titre: "La posture de curiosité",
      texte:
        "Adopter une posture de curiosité : aller chercher par soi-même, au lieu de seulement suivre ce qui est proposé automatiquement.",
    },
  ],
  reel: {
    texte:
      "Profiter des avantages (gagner du temps, découvrir des contenus) tout en évitant les pièges (enfermement, perte de diversité des points de vue). Beaucoup de plateformes permettent de consulter et de modifier ton historique et tes préférences — mais ces options sont souvent bien cachées dans les paramètres.",
  },
  historique: {
    texte:
      "Les services de recommandation sont nés avec le commerce en ligne : dès la fin des années 1990, Amazon affiche « les clients qui ont acheté ceci ont aussi acheté… ». En 2006, Netflix lance un concours doté d'un million de dollars pour améliorer son algorithme de recommandation. Aujourd'hui, la majorité des vidéos regardées sur YouTube ou TikTok viennent de ces suggestions automatiques.",
  },
  methode: [
    {
      titre: "Avantage",
      texte: "Trouver plus vite ce qui t'intéresse.",
    },
    {
      titre: "Limite",
      texte: "Ne plus voir d'idées différentes des tiennes.",
    },
    {
      titre: "Paramètres",
      texte: "Gérer historique et préférences.",
    },
    {
      titre: "Curiosité",
      texte: "Explorer d'autres sources volontairement.",
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Sortir de la bulle",
      donnees: "Tu vois toujours les mêmes opinions sur ton fil.",
      question: "Que faire ?",
      solution:
        "Diversifier tes sources, suivre des comptes variés, et nettoyer ton historique dans les paramètres.",
    },
  ],
  pieges: [
    "Ne suivre qu'une seule source d'information.",
    "Croire que tout ce qui est proposé est neutre.",
    "Oublier qu'on peut régler les paramètres.",
  ],
  aRetenir: [
    "La personnalisation a des avantages et des limites.",
    "Risque : enfermement et chambre d'écho.",
    "On peut régler historique et préférences.",
    "Diversifier ses sources est essentiel.",
  ],
  entrainement: [
    {
      question: "Cite un avantage de la personnalisation des contenus.",
      correction: "Gagner du temps en trouvant plus vite ce qui t'intéresse.",
    },
    {
      question: "Cite un inconvénient de la personnalisation.",
      correction:
        "Ne plus être exposé à des idées ou contenus différents des siens.",
    },
    {
      question: "Comment garder un peu de contrôle sur tes recommandations ?",
      correction:
        "Consulter et modifier son historique et ses préférences dans les paramètres.",
    },
  ],
  coachHref: "/coach-ia/ia",
};

export const slidesServicesDeRecommandation: ClasseSlide[] = [];
