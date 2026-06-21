// lib/bulletin/types.ts
// Types du bulletin, partagés entre le calcul serveur (computeBulletin, server-only)
// et l'affichage client (components/bulletin). Aucun import serveur ici.

export type MatiereStat = {
  matiere: string;
  note: number | null; // /20, 1 décimale
  nb: number;
  progression: number | null; // points /20
};

export type PeriodeBulletin = {
  moyenne: number | null;
  progression: number | null;
  assiduite: { jours: number; niveau: string };
  matieres: MatiereStat[];
  appreciation: string;
};

export type PeriodeCle = "30j" | "trim" | "debut";

export type Bulletin = {
  prenom: string;
  classe: string | null;
  computed_at: string;
  periodes: Record<PeriodeCle, PeriodeBulletin>;
};
