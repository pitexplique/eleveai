// LES PASSIONS DE L'ÉLÈVE, côté navigateur (30/10/2026).
//
// Frédéric : « même les non connectés, mais tu stockes les préférences pour les
// élèves connectés ». Donc :
//   - toujours dans le navigateur (localStorage), connecté ou non ;
//   - un élève connecté a SA clé (deux élèves sur le même poste de la salle
//     informatique ne se mélangent pas) et ses passions partent en base
//     (/api/passions), pour les retrouver sur un autre poste.
// Une passion = « sport », « sport:lutte » ou « autre:pétanque »
// (lib/videos/centres-interet.ts).

import type { Eleve } from "@/context/EleveContext";

const CLE_ANONYME = "eleveai_passions";
/** « Plus tard » : on ne redemande pas pendant la même visite. */
const CLE_PLUS_TARD = "eleveai_passions_plus_tard";

const cle = (eleve: Eleve | null | undefined) =>
  eleve?.code_eleve ? `${CLE_ANONYME}:${eleve.code_etablissement}:${eleve.code_eleve}` : CLE_ANONYME;

export function lirePassions(eleve: Eleve | null | undefined): string[] | null {
  try {
    const brut = localStorage.getItem(cle(eleve));
    return brut ? (JSON.parse(brut) as string[]) : null;
  } catch {
    return null;
  }
}

export async function enregistrerPassions(eleve: Eleve | null | undefined, passions: string[]) {
  try {
    localStorage.setItem(cle(eleve), JSON.stringify(passions));
  } catch {
    // navigation privée : tant pis, on garde au moins la base pour un connecté
  }
  if (!eleve?.token) return;
  await fetch("/api/passions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${eleve.token}` },
    body: JSON.stringify({ passions }),
  }).catch(() => null);
}

/** Pour un connecté : la base fait foi (autre poste) ; elle remplit le navigateur. */
export async function chargerPassions(eleve: Eleve | null | undefined): Promise<string[] | null> {
  const locales = lirePassions(eleve);
  if (!eleve?.token) return locales;
  const d = await fetch("/api/passions", { headers: { Authorization: `Bearer ${eleve.token}` } })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
  const enBase = (d?.passions as string[] | null | undefined) ?? null;
  if (enBase?.length) {
    try {
      localStorage.setItem(cle(eleve), JSON.stringify(enBase));
    } catch {}
    return enBase;
  }
  // Choisies sur ce poste avant que la table existe : on les envoie.
  if (locales?.length && d?.enBase) void enregistrerPassions(eleve, locales);
  return locales;
}

export function remettrePlusTard() {
  try {
    sessionStorage.setItem(CLE_PLUS_TARD, "1");
  } catch {}
}

export function aDitPlusTard() {
  try {
    return sessionStorage.getItem(CLE_PLUS_TARD) === "1";
  } catch {
    return false;
  }
}
