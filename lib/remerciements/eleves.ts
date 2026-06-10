// lib/remerciements/eleves.ts

export type EleveRemercie = {
  prenom: string;
  action: string;
  meta?: string | null;
};

export const elevesRemercies: EleveRemercie[] = [
  { prenom: "Zelie",   action: "Participation active",                 meta: "Participation active" },
  { prenom: "Elena",   action: "Enbglish-maths + page de garde",       meta: null                   },
  { prenom: "Emma",    action: "Définition du prix à 1,90 € par mois", meta: null                   },
  { prenom: "Éléna",   action: "Participation active",                 meta: "Participation active" },
  { prenom: "Adele",   action: "Participation active",                 meta: "Participation active" },
  { prenom: "Maëlle",  action: "Participation active",                 meta: "Participation active" },
  { prenom: "Arthur",  action: "Participation active",                 meta: "Participation active" },
  { prenom: "Ben",     action: "Participation active",                 meta: "Participation active" },
  { prenom: "Enzo",    action: "Participation active",                 meta: "Participation active" },
  { prenom: "Keïla",   action: "Participation active",                 meta: "Participation active" },
  { prenom: "Tamara",  action: "Participation active",                 meta: "Participation active" },
  { prenom: "Gaëtan",  action: "Participation active",                 meta: "Participation active" },
  { prenom: "Simon",   action: "Rajouter du game",                     meta: "Participation active" },
];
