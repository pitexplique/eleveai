// lib/matrice/metiers.ts
//
// ⭐⭐ LA MATRICE DE CORRESPONDANCE MÉTIERS (08/11/2026).
//
// Frédéric : « les mathématiques sont transversales » et « un des buts de
// l'apprentissage est d'évoquer des vocations ». Cette matrice relie chaque
// notion de maths du coach (lib/matrice/notions.generated.ts) à des métiers
// réels qui s'en servent, pour que le coach, les vidéos et /passions montrent
// « à quoi ça sert ».
//
// Trois fichiers, une seule porte (celle-ci) :
//   - metiers-catalogue.ts : les métiers (deux genres, centres d'intérêt, études) ;
//   - metiers-college.ts   : 6e et 4e notion par notion (ses classes) ;
//   - metiers-familles.ts  : les autres classes, par familles et renvois.
// Une MICRO hérite des métiers de sa notion.
// Contrôle : npx tsx scripts/verifier-metiers.ts (couverture, genres, 974).

import { METIERS, type LienMetier, type Metier, type MetierId } from "./metiers-catalogue";
import { METIERS_4E, METIERS_6E } from "./metiers-college";
import { FAMILLES_METIERS, RENVOIS, type FamilleMetiers, type Renvoi } from "./metiers-familles";

export { METIERS, type LienMetier, type Metier, type MetierId };

/** Ce qu'on affiche : le métier au bon genre, et ce qu'il fait de la notion. */
export type MetierMontre = {
  id: MetierId;
  /** « ingénieure du son » ou « ingénieur du son », selon le lien. */
  nom: string;
  /** La phrase complète : « La pâtissière coupe une tarte en 8… ». */
  phrase: string;
  usage: string;
  centres: string[];
  etudes: Metier["etudes"];
  enVideo: boolean;
  reunion: boolean;
};

const DIRECT: Record<string, Record<string, LienMetier[]>> = { "6e": METIERS_6E, "4e": METIERS_4E };

/** Le renvoi d'une notion : l'id exact, sinon le plus long préfixe « xxx* ». */
export function renvoiDe(classe: string, notionId: string): Renvoi | null {
  const table = RENVOIS[classe];
  if (!table) return null;
  if (table[notionId]) return table[notionId];
  let meilleur: { long: number; r: Renvoi } | null = null;
  for (const [cle, r] of Object.entries(table)) {
    if (!cle.endsWith("*")) continue;
    const prefixe = cle.slice(0, -1);
    if (notionId.startsWith(prefixe) && (!meilleur || prefixe.length > meilleur.long)) meilleur = { long: prefixe.length, r };
  }
  return meilleur?.r ?? null;
}

/** Les liens bruts d'une notion (sans tri), [] si la notion n'est pas couverte. */
export function liensDeLaNotion(classe: string, notionId: string): LienMetier[] {
  const direct = DIRECT[classe]?.[notionId];
  if (direct) return direct;
  const r = renvoiDe(classe, notionId);
  if (!r) return [];
  const m = /^(6e|4e):(.+)$/.exec(r);
  if (m) return DIRECT[m[1]]?.[m[2]] ?? [];
  return FAMILLES_METIERS[r as FamilleMetiers] ?? [];
}

/** « La » / « Le » / « L' » devant le nom du métier. */
function article(nom: string, genre: "f" | "m") {
  if (/^[aeéèêiîoôuhAEÉIOU]/.test(nom)) return "L'";
  return genre === "f" ? "La " : "Le ";
}

function montrer(l: LienMetier): MetierMontre {
  const met = METIERS[l.metier];
  const nom = met[l.genre];
  return {
    id: l.metier,
    nom,
    phrase: `${article(nom, l.genre)}${nom} ${l.usage}`,
    usage: l.usage,
    centres: met.centres,
    etudes: met.etudes,
    enVideo: !!l.enVideo,
    reunion: !!l.reunion,
  };
}

/**
 * LES MÉTIERS À MONTRER POUR UNE NOTION.
 *
 * `passions` : celles de /passions (« sport », « sport:lutte », « autre:… ») —
 * les métiers qui partagent un centre d'intérêt de l'élève passent devant,
 * l'ordre écrit reste celui du reste.
 */
export function metiersDeLaNotion(
  classe: string,
  notionId: string,
  options: { passions?: string[] | null; limite?: number } = {},
): MetierMontre[] {
  const centresEleve = new Set((options.passions ?? []).map((p) => p.split(":")[0]));
  const liste = liensDeLaNotion(classe, notionId).map(montrer);
  const rang = (m: MetierMontre) => (m.centres.some((c) => centresEleve.has(c)) ? 0 : 1);
  const triee = liste.map((m, i) => ({ m, i })).sort((a, b) => rang(a.m) - rang(b.m) || a.i - b.i).map((x) => x.m);
  return options.limite ? triee.slice(0, options.limite) : triee;
}

/** Une micro hérite de sa notion (pas de métiers propres aux micros pour l'instant). */
export function metiersDeLaMicro(
  classe: string,
  notionId: string,
  _microId: string,
  options: { passions?: string[] | null; limite?: number } = {},
): MetierMontre[] {
  return metiersDeLaNotion(classe, notionId, options);
}

/**
 * LE CHEMIN INVERSE, pour /passions : à partir d'un centre d'intérêt, les
 * notions d'une classe où un métier de ce centre apparaît.
 */
export function notionsDuCentre(classe: string, notionIds: string[], centre: string) {
  return notionIds
    .map((id) => ({ notionId: id, metiers: metiersDeLaNotion(classe, id).filter((m) => m.centres.includes(centre)) }))
    .filter((x) => x.metiers.length > 0);
}
