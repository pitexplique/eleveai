// lib/programmes-pays/types.ts — la MATRICE DE CORRESPONDANCE MULTI-PAYS.
//
// Idée de Frédéric (22/10/2026) : plutôt que traduire le site en anglais,
// l'ADAPTER à chaque pays francophone (Ontario, Maroc, Madagascar…). Le coach
// ne change pas : chaque contenu du programme officiel d'un pays pointe vers
// des micros FRANÇAISES qui existent déjà (classe + id de micro). Ce qui ne
// pointe vers rien est un trou à combler.
//
// ⚠️ Données seules pour l'instant : rien n'est encore branché à l'interface.
// Vérifier les renvois : npx --yes tsx@4 scripts/couverture-programmes-pays.ts

import type { Classe } from "@/lib/tutor-v4/catalog";

/**
 * - complete   : nos micros couvrent le contenu ;
 * - partielle  : une partie est couverte, la note dit ce qui manque ;
 * - absente    : rien chez nous, micro(s) à écrire ;
 * - hors-coach : recherche, projet, discussion — ne se travaille pas en série
 *                d'exercices ; exclu du taux de couverture.
 */
export type Couverture = "complete" | "partielle" | "absente" | "hors-coach";

export type RenvoiMicro = { classe: Classe; micro: string };

export type ContenuPays = {
  /** Code officiel du pays (« B2.1 » en Ontario). */
  code: string;
  domaine: string;
  /** Texte officiel, abrégé si besoin, sans les exemples. */
  texte: string;
  couverture: Couverture;
  micros: RenvoiMicro[];
  note?: string;
};

export type ProgrammePays = {
  pays: "ontario" | "quebec" | "maroc" | "madagascar" | "etats-unis";
  /** Identifiant de l'année dans l'URL et la colonne des classes (« 9e »). */
  cle: string;
  /** Nom de l'année dans le pays (« 9e année »). */
  niveau: string;
  /** Code de cours quand il existe (« MTH1W »). */
  codeCours?: string;
  /** Classe française du même âge, pour l'orientation des familles. */
  equivalentFrance: Classe;
  source: string;
  version: string;
  contenus: ContenuPays[];
};
