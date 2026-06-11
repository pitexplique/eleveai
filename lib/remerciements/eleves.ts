// lib/remerciements/eleves.ts

export type EleveRemercie = {
  prenom: string;
  action: string;
  meta?: string | null;
};

export const elevesRemercies: EleveRemercie[] = [
  { prenom: "Maëlle",  action: "Conception d'image et de vidéo",                              meta: null                   },
  { prenom: "Arthur",  action: "Vision globale",                                  meta: null                   },
  { prenom: "Zelie",   action: "Participation active",                            meta: "Participation active" },
  { prenom: "Laszlo",  action: "Mettre de l'optimisme dans EleveAI",              meta: null                   },
  { prenom: "Elena",   action: "English-maths + page de garde",                   meta: null                   },
  { prenom: "Emma",    action: "4,90 € par mois avec code promo à 50 %",          meta: null                   },
  { prenom: "Éléna",   action: "Très RGPD",                                       meta: null                   },
  { prenom: "Adele",   action: "Lutte contre les stéréotipe",                     meta: "Participation active" },
  { prenom: "Maëlle",  action: "Conception d'image et une des meilleure testeuse",     meta: null                   },
  { prenom: "Ben",     action: "Gestion des codes d'accès",                       meta: null                   },
  { prenom: "Enzo",    action: "A lanncé l'idée de eleveai.fr avec plusieurs matières",                            meta: "Participation active" },
  { prenom: "Keïla",   action: "Participation à la gestion du tarif",                            meta: "Participation active" },
  { prenom: "Tamara",  action: "Gestion des bugs",                                meta: null                   },
  { prenom: "Gaëtan",  action: "Participation active",                            meta: "Participation active" },
  { prenom: "Simon",   action: "Rajouter du game",                                meta: "Participation active" },
];
