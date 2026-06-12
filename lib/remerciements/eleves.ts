// lib/remerciements/eleves.ts

export type EleveRemercie = {
  prenom: string;
  action: string;
  meta?: string | null;
};

export const elevesRemercies: EleveRemercie[] = [
  { prenom: "Maëlle",  action: "Conception d'image et de vidéo",                       meta: null                   },
  { prenom: "Arthur",  action: "Architecte d'idées",                                   meta: null                   },
  { prenom: "Zelie",   action: "Participation active",                                 meta: "Participation active" },
  { prenom: "Laszlo",  action: "Mettre de l'optimisme dans EleveAI",                   meta: null                   },
  { prenom: "Elena",   action: "English-maths + page de garde",                        meta: null                   },
  { prenom: "Emma",    action: "4,90 € par mois avec code promo à 50 %",               meta: null                   },
  { prenom: "Éléna",   action: "Très RGPD",                                            meta: null                   },
  { prenom: "Ayden",   action: "Concepteur de scénarios",                              meta: null                   },
  { prenom: "Elise",   action: "Chasseuse de bugs",                                    meta: null                   },
  { prenom: "Luna",    action: "Lutte contre les stéréotypes",                         meta: null                   },
  { prenom: "Séléna",  action: "L'œil du détail",                                      meta: null                   },
  { prenom: "Adele",   action: "Parcours espagnol",                                    meta: null                   },
  { prenom: "Maëlle",  action: "Conception d'image et une des meilleures testeuses",   meta: null                   },
  { prenom: "Ben",     action: "Gestion des codes d'accès",                            meta: null                   },
  { prenom: "Kenzo",   action: "A lancé l'idée de eleveai.fr avec plusieurs matières", meta: "Participation active" },
  { prenom: "Keïla",   action: "Participation à la gestion du tarif",                  meta: "Participation active" },
  { prenom: "Tamara",  action: "Gestion des bugs et regard pédagogique",              meta: null                   },
  { prenom: "Gaëtan",  action: "Mémoire du coach IA",                                  meta: null                   },
  { prenom: "Eve",     action: "Précision des réponses",                               meta: null                   },
  { prenom: "Laure",   action: "Test du parcours maths",                               meta: null                   },
  { prenom: "Saroja",  action: "Test du coach français",                               meta: null                   },
  { prenom: "Simon",   action: "Rajouter du game",                                     meta: "Participation active" },
];
