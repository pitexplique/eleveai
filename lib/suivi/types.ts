// Types de la vue parent, partagés avec l'affichage. Aucun import serveur ici.
import type { Bulletin } from "@/lib/bulletin/types";

export type CompteSemaine = { seances: number; questions: number; justes: number; jours: number; minutes: number };

export type MicroRapport = { id: string; libelle: string; notion: string; justes: number; reponses: number; href: string | null };

export type NotionCarte = { id: string; titre: string; total: number; compris: number; enCours: number; aRevoir: number };

export type RapportEnfant = {
  prenom: string;
  classe: string | null;
  derniereActivite: string | null;
  semaine: CompteSemaine;
  semainePrecedente: CompteSemaine;
  alertes: string[];
  aRevoir: MicroRapport[];
  acquises: MicroRapport[];
  nbAcquises: number;
  carte: NotionCarte[];
  bulletin: Bulletin | null;
};
