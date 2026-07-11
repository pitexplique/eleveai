// lib/remerciements/eleves.ts

export type EleveRemercie = {
  prenom: string;
  action: string;
  meta?: string | null;
};

export const elevesRemercies: EleveRemercie[] = [
  { prenom: "Maëlle",  action: "Conception d'images et de vidéos",          meta: null                   },
  { prenom: "Zélie",   action: "Participation active",                      meta: null                   },
  { prenom: "Laszlo",  action: "Mettre de l'optimisme dans EleveAI",        meta: null                   },
  { prenom: "Éléna",   action: "English-maths & page de garde",             meta: null                   },
  { prenom: "Emma",    action: "Idée du tarif accessible",                  meta: null                   },
  { prenom: "Éléna",   action: "Très RGPD",                                 meta: null                   },
  { prenom: "Ayden",   action: "Repenser la page d'accueil",                meta: null                   },
  { prenom: "Elise",   action: "Chasseuse de bugs",                         meta: null                   },
  { prenom: "Luna",    action: "Lutte contre les stéréotypes",              meta: null                   },
  { prenom: "Séléna",  action: "L'œil du détail",                           meta: null                   },
  { prenom: "Adele",   action: "Parcours espagnol",                         meta: null                   },
  { prenom: "Maëlle",  action: "Conception d'images, super testeuse",       meta: null                   },
  { prenom: "Ben",     action: "Gestion des codes d'accès",                 meta: null                   },
  { prenom: "Kenzo",   action: "A lancé l'idée d'EleveAI multi-matières",   meta: "Participation active" },
  { prenom: "Keïla",   action: "Réflexion sur le tarif",                    meta: "Participation active" },
  { prenom: "Tamara",  action: "Gestion des bugs & regard pédagogique",     meta: null                   },
  { prenom: "Gaëtan",  action: "Mémoire du coach IA",                       meta: null                   },
  { prenom: "Eve",     action: "Précision des réponses",                    meta: null                   },
  { prenom: "Laure",   action: "Test du parcours maths",                    meta: null                   },
  { prenom: "Saroja",  action: "Test du coach français",                    meta: null                   },
  { prenom: "Simon",   action: "Rajouter du game",                          meta: "Participation active" },
  { prenom: "Gabrielle", action: "Idée des fiches de révision",             meta: "Participation active" },
  { prenom: "Arthur",  action: "Idées d'accessibilité, d'ergonomie & vision internationale", meta: "Participation active" },
  { prenom: "Victor",  action: "Idée du score de classe",                   meta: "Participation active" },
];
