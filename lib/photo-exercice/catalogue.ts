// lib/photo-exercice/catalogue.ts
//
// LE SOMMAIRE DU COACH, DONNÉ AU MODÈLE — ET RIEN D'AUTRE.
//
// ⭐ 13/09/2026, Frédéric : « je veux que ma fille photographie son PDF ou le
// télécharge et que ça lui indique les chemins à suivre dans les coachs ».
//
// Le modèle ne DEVINE pas une notion : il CHOISIT dans la liste réelle des
// notions et micro-compétences de la classe, telle que le coach la sert. C'est
// la même source que la liste de /coach-ia (lib/tutor-v4/catalog), donc un
// identifiant rendu ici ouvre toujours une vraie série.
//
// ⛔ PAS DE REPLI SILENCIEUX. Un identifiant qui n'est pas dans le sommaire est
// rejeté côté serveur et l'exercice passe en « hors catalogue », dit tel quel
// à l'élève. Voir la mémoire « une notion inconnue sert la première du pack » :
// ce garde-fou-là est ici, pas dans le prompt.

import {
  getNotionOptions,
  getNotionMicroMap,
  getNotionLabelMap,
  getMicroLabelMap,
  type Classe,
  type Matiere,
} from "@/lib/tutor-v4/catalog";

/** Les classes proposées, dans l'ordre de la scolarité. */
export const CLASSES_PHOTO: { id: Classe; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
  { id: "6e", label: "6e" },
  { id: "5e", label: "5e" },
  { id: "4e", label: "4e" },
  { id: "3e", label: "3e" },
  { id: "seconde", label: "Seconde" },
  { id: "premiere", label: "1re (tronc commun)" },
  { id: "premiere-spe", label: "1re spé maths" },
  { id: "terminale-spe", label: "Terminale spé maths" },
];

/**
 * ⚠️ Le français n'est ouvert que là où sa banque est complète — même liste
 * que FRANCAIS_READY_CLASSES dans /coach-ia. Proposer la 1re en français
 * enverrait sur le `default:` du catalogue, c'est-à-dire sur une autre classe
 * sans le dire.
 */
const CLASSES_FRANCAIS = new Set<Classe>([
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde",
]);

export const MATIERES_PHOTO: { id: Matiere; label: string }[] = [
  { id: "maths", label: "Mathématiques" },
  { id: "francais", label: "Français" },
];

export function classesPour(matiere: Matiere): { id: Classe; label: string }[] {
  if (matiere === "francais") return CLASSES_PHOTO.filter((c) => CLASSES_FRANCAIS.has(c.id));
  return CLASSES_PHOTO;
}

export function matiereValide(brut: unknown): Matiere | null {
  const m = MATIERES_PHOTO.find((x) => x.id === brut);
  return m ? m.id : null;
}

export function classeValide(brut: unknown, matiere: Matiere): Classe | null {
  const c = classesPour(matiere).find((x) => x.id === brut);
  return c ? c.id : null;
}

export function labelClasse(classe: Classe): string {
  return CLASSES_PHOTO.find((c) => c.id === classe)?.label ?? classe;
}

export type NotionDuSommaire = {
  id: string;
  label: string;
  micros: { id: string; label: string }[];
};

/** Les notions de la classe qui ont au moins une série : les autres n'ouvrent rien. */
export function sommaire(classe: Classe, matiere: Matiere): NotionDuSommaire[] {
  const notions = getNotionOptions(classe, matiere);
  const micros = getNotionMicroMap(classe, matiere);
  const labelsNotions = getNotionLabelMap(classe, matiere);
  const labelsMicros = getMicroLabelMap(classe, matiere);

  return notions
    .map((id) => ({
      id,
      label: labelsNotions[id] ?? id,
      micros: (micros[id] ?? []).map((m) => ({ id: m, label: labelsMicros[m] ?? m })),
    }))
    .filter((n) => n.micros.length > 0);
}

/**
 * Le sommaire en texte, une ligne par notion et une par micro, avec les
 * identifiants EXACTS que le modèle doit recopier. Sur Maths seconde c'est
 * ~120 lignes, quelques milliers de tokens : c'est le prix d'une réponse qui
 * ouvre une vraie porte.
 */
export function sommaireEnTexte(s: NotionDuSommaire[]): string {
  return s
    .map((n) =>
      [`NOTION ${n.id} | ${n.label}`, ...n.micros.map((m) => `  MICRO ${m.id} | ${m.label}`)].join("\n")
    )
    .join("\n");
}
