// lib/bulletin/computeBulletin.ts
//
// Calcule le « bulletin » d'un élève : notes /20 par matière, moyenne, assiduité,
// progression et une appréciation auto, pour 3 périodes (30 jours, trimestre
// ≈ 90 jours, depuis le début). Recalculé à chaque sauvegarde de résultat
// (app/api/resultats) et stocké dans la table `bulletins` (snapshot par élève).
//
// Ne doit être importé que côté serveur (clé service role).

import "server-only";
import { createClient } from "@supabase/supabase-js";
import { prenomCourt } from "@/lib/prenom";
import type { Bulletin, PeriodeBulletin, MatiereStat } from "./types";

const JOUR = 24 * 60 * 60 * 1000;

// Sources de résultats → matière + champ de note. Tout est ramené sur /20.
// matiere fixe quand la table est mono-matière ; sinon on lit la colonne `matiere`.
type Source = {
  table: string;
  matiere?: string;
  matiereField?: string;
  note20Field?: string; // déjà sur 20 (coach)
};
const SOURCES: Source[] = [
  { table: "resultats_parcours_maths", matiere: "maths" },
  { table: "resultats_parcours_english", matiere: "anglais" },
  { table: "resultats_parcours_espagnol", matiere: "espagnol" },
  { table: "resultats_parcours_francais", matiere: "francais" },
  { table: "resultats_calcul_rapide", matiereField: "matiere" },
  { table: "resultats_defis_jour", matiereField: "matiere" },
  { table: "resultats_english_maths", matiere: "anglais" },
  { table: "resultats_tutor", matiereField: "matiere", note20Field: "score_sur_20" },
];

const LABELS_MATIERE: Record<string, string> = {
  maths: "maths",
  francais: "français",
  anglais: "anglais",
  espagnol: "espagnol",
  eco: "éco",
  brevet: "brevet",
};

type Evenement = { matiere: string; note20: number; t: number };

export type { Bulletin, PeriodeBulletin, MatiereStat } from "./types";

function clamp20(n: number) {
  return Math.max(0, Math.min(20, n));
}
function round1(n: number) {
  return Math.round(n * 10) / 10;
}
function moyenne(notes: number[]): number | null {
  if (notes.length === 0) return null;
  return round1(notes.reduce((s, n) => s + n, 0) / notes.length);
}

// Progression = moyenne(2e moitié) − moyenne(1re moitié), triée par date.
// Demande un minimum de résultats pour avoir du sens.
function progression(evts: Evenement[]): number | null {
  if (evts.length < 6) return null;
  const tries = [...evts].sort((a, b) => a.t - b.t);
  const milieu = Math.floor(tries.length / 2);
  const m1 = moyenne(tries.slice(0, milieu).map((e) => e.note20));
  const m2 = moyenne(tries.slice(milieu).map((e) => e.note20));
  if (m1 === null || m2 === null) return null;
  return round1(m2 - m1);
}

function niveauAssiduite(jours: number, fenetreJours: number): string {
  // Seuils proportionnels à la fenêtre (≈ 1 connexion / 2 jours = assidu).
  if (jours >= fenetreJours * 0.4) return "Assidu";
  if (jours >= fenetreJours * 0.17) return "Régulier";
  return "À encourager";
}

function appreciation(p: {
  matieres: MatiereStat[];
  progression: number | null;
  assiduite: string;
}): string {
  const avecNote = p.matieres.filter((m) => m.note !== null && m.nb > 0);
  if (avecNote.length === 0) {
    return "Pas encore assez d'activités pour un vrai bilan — lance-toi, ça démarre vite et chaque exercice compte !";
  }
  const best = [...avecNote].sort((a, b) => (b.note ?? 0) - (a.note ?? 0))[0];
  const weak = [...avecNote].sort((a, b) => (a.note ?? 0) - (b.note ?? 0))[0];
  const lbl = (m: string) => LABELS_MATIERE[m] ?? m;

  const phrases: string[] = [];
  phrases.push(
    `Beau travail en ${lbl(best.matiere)} (${(best.note ?? 0)
      .toString()
      .replace(".", ",")}/20) !`
  );
  if (p.progression !== null && p.progression >= 0.5) {
    phrases.push(
      `Belle progression d'ensemble (+${p.progression
        .toString()
        .replace(".", ",")} pts), continue comme ça.`
    );
  }
  if (weak.matiere !== best.matiere && (weak.note ?? 20) < 12) {
    phrases.push(
      `Encore un peu d'entraînement en ${lbl(
        weak.matiere
      )} et tu décolles — tu es sur la bonne voie.`
    );
  }
  if (p.assiduite === "Assidu") {
    phrases.push("Ton assiduité fait la différence, bravo.");
  } else if (p.assiduite === "À encourager") {
    phrases.push("Connecte-toi un peu plus souvent, même 5 minutes par jour aident.");
  }
  return phrases.join(" ");
}

async function fetchEvenements(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  codeEtablissement: string,
  codeUtilisateur: string
): Promise<Evenement[]> {
  const lots = await Promise.all(
    SOURCES.map(async (src) => {
      const cols = ["created_at"];
      if (src.note20Field) cols.push(src.note20Field);
      else cols.push("score", "total");
      if (src.matiereField) cols.push(src.matiereField);

      const { data, error } = await supabase
        .from(src.table)
        .select(cols.join(", "))
        .eq("code_etablissement", codeEtablissement)
        .eq("code_utilisateur", codeUtilisateur)
        .order("created_at", { ascending: false })
        .limit(3000);
      if (error || !data) return [] as Evenement[];

      const out: Evenement[] = [];
      for (const r of data as Record<string, unknown>[]) {
        const matiere = src.matiere ?? String(r[src.matiereField as string] ?? "").trim();
        if (!matiere) continue;
        let note20: number | null = null;
        if (src.note20Field) {
          const v = Number(r[src.note20Field]);
          note20 = Number.isFinite(v) ? clamp20(v) : null;
        } else {
          const s = Number(r.score);
          const t = Number(r.total);
          if (Number.isFinite(s) && Number.isFinite(t) && t > 0) {
            note20 = clamp20((s / t) * 20);
          }
        }
        if (note20 === null) continue;
        const t = new Date(r.created_at as string).getTime();
        if (!Number.isFinite(t)) continue;
        out.push({ matiere, note20, t });
      }
      return out;
    })
  );
  return lots.flat();
}

async function joursConnexion(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  codeEtablissement: string,
  codeUtilisateur: string,
  depuis: number
): Promise<Set<string>> {
  const { data } = await supabase
    .from("connexions")
    .select("created_at")
    .eq("code_etablissement", codeEtablissement)
    .eq("code_utilisateur", codeUtilisateur)
    .gte("created_at", new Date(depuis).toISOString())
    .limit(5000);
  const jours = new Set<string>();
  for (const r of data ?? []) {
    jours.add(new Date(r.created_at as string).toISOString().slice(0, 10));
  }
  return jours;
}

function jourCle(t: number): string {
  return new Date(t).toISOString().slice(0, 10);
}

function calculerPeriode(
  evts: Evenement[],
  joursConnexion: Set<string>,
  fenetreJours: number
): PeriodeBulletin {
  const parMatiere = new Map<string, Evenement[]>();
  for (const e of evts) {
    const arr = parMatiere.get(e.matiere) ?? [];
    arr.push(e);
    parMatiere.set(e.matiere, arr);
  }
  const matieres: MatiereStat[] = [...parMatiere.entries()]
    .map(([matiere, list]) => ({
      matiere,
      note: moyenne(list.map((e) => e.note20)),
      nb: list.length,
      progression: progression(list),
    }))
    .sort((a, b) => (b.note ?? -1) - (a.note ?? -1));

  // Moyenne générale = moyenne des moyennes par matière (chaque matière pèse 1,
  // comme un vrai bulletin — pas pondérée par le nb d'exercices).
  const notesMat = matieres
    .map((m) => m.note)
    .filter((n): n is number => n !== null);
  const moy = moyenne(notesMat);

  // Progression générale = moyenne des progressions PAR MATIÈRE (chaque matière
  // comparée à elle-même) → évite le biais de mélange des matières.
  const progsMat = matieres
    .map((m) => m.progression)
    .filter((n): n is number => n !== null);
  const prog =
    progsMat.length > 0
      ? round1(progsMat.reduce((s, n) => s + n, 0) / progsMat.length)
      : null;

  // Assiduité = jours DISTINCTS avec activité réelle OU connexion (les connexions
  // seules sont trop rares : sessions persistantes non loguées).
  const joursActifs = new Set<string>(joursConnexion);
  for (const e of evts) joursActifs.add(jourCle(e.t));
  const jours = joursActifs.size;
  const niveau = niveauAssiduite(jours, fenetreJours);

  const appr = appreciation({ matieres, progression: prog, assiduite: niveau });
  return {
    moyenne: moy,
    progression: prog,
    assiduite: { jours, niveau },
    matieres,
    appreciation: appr,
  };
}

// Calcule le bulletin complet d'un élève (3 périodes).
export async function computeBulletin(args: {
  codeEtablissement: string;
  codeUtilisateur: string;
  nom?: string | null;
  classe?: string | null;
}): Promise<Bulletin | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const now = Date.now();

  const [evts, jours30, jours90, joursAll] = await Promise.all([
    fetchEvenements(supabase, args.codeEtablissement, args.codeUtilisateur),
    joursConnexion(supabase, args.codeEtablissement, args.codeUtilisateur, now - 30 * JOUR),
    joursConnexion(supabase, args.codeEtablissement, args.codeUtilisateur, now - 90 * JOUR),
    joursConnexion(supabase, args.codeEtablissement, args.codeUtilisateur, 0),
  ]);

  const dans = (depuis: number) => evts.filter((e) => e.t >= depuis);

  // Repli : un compte e-mail sans `nom` aurait l'e-mail comme « prénom »
  // (prenomCourt ne sait pas le réduire) → on affiche « Élève » à la place.
  const prenomBrut = prenomCourt(args.nom);
  const prenom = prenomBrut.includes("@") ? "Élève" : prenomBrut;

  return {
    prenom,
    classe: args.classe ?? null,
    computed_at: new Date(now).toISOString(),
    periodes: {
      "30j": calculerPeriode(dans(now - 30 * JOUR), jours30, 30),
      trim: calculerPeriode(dans(now - 90 * JOUR), jours90, 90),
      debut: calculerPeriode(evts, joursAll, 180),
    },
  };
}

// Recalcule le bulletin d'un élève et l'upsert dans la table `bulletins`.
// Tolérant : ne lève jamais (l'appelant — /api/resultats — ne doit pas voir sa
// sauvegarde échouer si le bulletin ne se met pas à jour). Renvoie true si écrit.
export async function mettreAJourBulletin(args: {
  codeEtablissement: string;
  codeUtilisateur: string;
  nom?: string | null;
  classe?: string | null;
}): Promise<boolean> {
  try {
    const bulletin = await computeBulletin(args);
    if (!bulletin) return false;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return false;
    const supabase = createClient(url, key);
    const { error } = await supabase.from("bulletins").upsert({
      code_etablissement: args.codeEtablissement,
      code_utilisateur: args.codeUtilisateur,
      data: bulletin,
      updated_at: new Date().toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
}
