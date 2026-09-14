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
  getAnneesNotions,
  sansMarqueurAnnee,
  type AnneeStmg,
  type Classe,
  type Matiere,
} from "@/lib/tutor-v4/catalog";

/**
 * Une entrée du sélecteur. `cle` est ce que le navigateur envoie ; `classe` est
 * la classe du coach. Les deux diffèrent pour la STMG : le coach n'a qu'un
 * paquet pour 1re et Tle, filtré par année (14/09, Frédéric : « STMG première
 * et terminale »), et la photo offre donc deux entrées sur ce seul paquet.
 */
export type EntreeClasse = {
  cle: string;
  classe: Classe;
  label: string;
  annee?: AnneeStmg;
};

/**
 * Les classes proposées, DE LA TERMINALE AU CP (14/09, Frédéric : « ordre
 * terminale cp oui ») — le même sens que la colonne du coach depuis le 13/09 :
 * le public du site est au lycée, il ne doit pas descendre une liste pour se
 * trouver. Lycée général, puis STMG (14/09 : « tu as oublié STMG », deux
 * entrées sur le paquet unique du coach), puis collège, puis primaire.
 */
export const CLASSES_PHOTO: EntreeClasse[] = [
  { cle: "terminale-spe", classe: "terminale-spe", label: "Terminale spé maths" },
  { cle: "premiere-spe", classe: "premiere-spe", label: "1re spé maths" },
  { cle: "premiere", classe: "premiere", label: "1re (tronc commun)" },
  { cle: "stmg-terminale", classe: "stmg", label: "Tle STMG", annee: "terminale" },
  { cle: "stmg-premiere", classe: "stmg", label: "1re STMG", annee: "premiere" },
  { cle: "seconde", classe: "seconde", label: "Seconde" },
  { cle: "3e", classe: "3e", label: "3e" },
  { cle: "4e", classe: "4e", label: "4e" },
  { cle: "5e", classe: "5e", label: "5e" },
  { cle: "6e", classe: "6e", label: "6e" },
  { cle: "cm2", classe: "cm2", label: "CM2" },
  { cle: "cm1", classe: "cm1", label: "CM1" },
  { cle: "ce2", classe: "ce2", label: "CE2" },
  { cle: "ce1", classe: "ce1", label: "CE1" },
  { cle: "cp", classe: "cp", label: "CP" },
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

export function classesPour(matiere: Matiere): EntreeClasse[] {
  if (matiere === "francais") return CLASSES_PHOTO.filter((c) => CLASSES_FRANCAIS.has(c.classe));
  return CLASSES_PHOTO;
}

export function matiereValide(brut: unknown): Matiere | null {
  const m = MATIERES_PHOTO.find((x) => x.id === brut);
  return m ? m.id : null;
}

/**
 * L'entrée qui correspond à une clé — ou à une classe du coach plus une
 * année, quand on arrive depuis le coach (`?classe=stmg&annee=premiere`).
 * `null` si rien ne correspond : on ne devine pas.
 */
export function classeValide(
  brut: unknown,
  matiere: Matiere,
  annee?: unknown,
): EntreeClasse | null {
  const entrees = classesPour(matiere);
  const parCle = entrees.find((x) => x.cle === brut);
  if (parCle) return parCle;
  return entrees.find((x) => x.classe === brut && (x.annee ?? null) === (annee || null)) ?? null;
}

export type NotionDuSommaire = {
  id: string;
  label: string;
  micros: { id: string; label: string }[];
};

/**
 * Les notions de l'entrée qui ont au moins une série : les autres n'ouvrent
 * rien. Pour une entrée à année (STMG), on garde les notions de cette année et
 * celles communes aux deux — la même règle que `gardeNotion` dans /coach-ia —
 * et on retire le marqueur « (Tle) » des libellés, comme le coach le fait.
 */
export function sommaire(entree: EntreeClasse, matiere: Matiere): NotionDuSommaire[] {
  const { classe, annee } = entree;
  const notions = getNotionOptions(classe, matiere);
  const micros = getNotionMicroMap(classe, matiere);
  const labelsNotions = getNotionLabelMap(classe, matiere);
  const labelsMicros = getMicroLabelMap(classe, matiere);
  const annees = annee ? getAnneesNotions(classe, matiere) : null;

  return notions
    .filter((id) => {
      if (!annees) return true;
      const a = annees[id];
      return a === undefined || a === annee;
    })
    .map((id) => {
      const brut = labelsNotions[id] ?? id;
      return {
        id,
        label: annees ? sansMarqueurAnnee(brut) : brut,
        micros: (micros[id] ?? []).map((m) => ({ id: m, label: labelsMicros[m] ?? m })),
      };
    })
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
