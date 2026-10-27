"use client";

// « EN DIRECT » — pendant le cours, une tuile par élève, rafraîchie toutes les
// 15 secondes : ce qu'il fait (micro du coach, vidéo), depuis quand, et qui
// aller voir (trois erreurs de suite sur le même micro).
// Les gestes viennent de /api/activite (supabase/activite_eleve.sql).

import Link from "next/link";
import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type Geste = {
  created_at: string;
  code_utilisateur: string;
  type: "coach" | "video_debut" | "video_fin";
  ressource: string | null;
  libelle: string | null;
  juste: boolean | null;
};
type Donnees = {
  maintenant: string;
  classe: { nom_classe: string; code_etablissement: string };
  eleves: { code_utilisateur: string; nom: string | null }[];
  gestes: Geste[];
};

const ACTIF_MS = 3 * 60 * 1000;
const RAFRAICHIR_MS = 15 * 1000;

type Tuile = {
  code: string;
  prenom: string | null;
  etat: "actif" | "pause" | "rien";
  aider: boolean;
  depuisMin: number | null;
  enCours: string | null;
  reponses: number;
  justes: number;
  videosVues: number;
};

function tuileDe(
  code: string,
  nom: string | null,
  gestes: Geste[],
  maintenant: number,
): Tuile {
  const siens = gestes.filter((g) => g.code_utilisateur === code); // du plus récent au plus ancien
  const coach = siens.filter((g) => g.type === "coach");
  const dernier = siens[0];
  const prenom = nom && !/^Élève \d+$/.test(nom) ? nom : null;

  // Trois erreurs de suite sur le même micro : c'est l'élève à aller voir.
  const [a, b, c] = coach;
  const aider =
    !!a &&
    !!b &&
    !!c &&
    a.ressource === b.ressource &&
    b.ressource === c.ressource &&
    a.juste === false &&
    b.juste === false &&
    c.juste === false;

  let enCours: string | null = null;
  if (dernier?.type === "coach") {
    const surCeMicro = coach.filter((g) => g.ressource === dernier.ressource);
    const j = surCeMicro.filter((g) => g.juste).length;
    enCours = `🧮 ${dernier.libelle ?? dernier.ressource} — ${j}/${surCeMicro.length} juste${j > 1 ? "s" : ""}`;
  } else if (dernier?.type === "video_debut") {
    enCours = `▶️ Regarde : ${dernier.libelle ?? dernier.ressource}`;
  } else if (dernier?.type === "video_fin") {
    enCours = `✅ A vu : ${dernier.libelle ?? dernier.ressource}`;
  }

  const depuis = dernier
    ? maintenant - new Date(dernier.created_at).getTime()
    : null;
  return {
    code,
    prenom,
    etat: depuis === null ? "rien" : depuis < ACTIF_MS ? "actif" : "pause",
    aider,
    depuisMin: depuis === null ? null : Math.floor(depuis / 60000),
    enCours,
    reponses: coach.length,
    justes: coach.filter((g) => g.juste).length,
    videosVues: siens.filter((g) => g.type === "video_fin").length,
  };
}

const COULEURS = {
  actif: "border-emerald-400 bg-emerald-50",
  pause: "border-amber-400 bg-amber-50",
  rien: "border-slate-200 bg-slate-50 text-slate-400",
  aider: "border-red-500 bg-red-50 ring-2 ring-red-300",
};

export default function EnDirectClient() {
  const { eleve: user } = useEleve();
  const token = user?.token ?? null;
  const [donnees, setDonnees] = useState<Donnees | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const code = new URLSearchParams(window.location.search).get("code") ?? "";
    let annule = false;
    const charger = () =>
      fetch(`/api/prof/classes/direct?code=${encodeURIComponent(code)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((d) => {
          if (annule) return;
          if (!d?.ok)
            return setErreur(d?.error ?? "Impossible de charger la classe.");
          setErreur(null);
          setDonnees(d);
        })
        .catch(() => {
          /* hors-ligne un instant : on garde les tuiles et on réessaie */
        });
    charger();
    const t = setInterval(charger, RAFRAICHIR_MS);
    return () => {
      annule = true;
      clearInterval(t);
    };
  }, [token]);

  if (!user) return <p className="p-8">Connecte-toi pour suivre ta classe.</p>;
  if (erreur) return <p className="p-8 text-red-700">{erreur}</p>;
  if (!donnees) return <p className="p-8 text-slate-500">Chargement…</p>;

  const maintenant = new Date(donnees.maintenant).getTime();
  const tuiles = donnees.eleves.map((e) =>
    tuileDe(e.code_utilisateur, e.nom, donnees.gestes, maintenant),
  );
  const nbActifs = tuiles.filter((t) => t.etat === "actif").length;
  const nbAider = tuiles.filter((t) => t.aider).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1">
            <Link
              href="/prof/classes"
              className="text-sm font-semibold text-slate-600 hover:underline"
            >
              ← Mes classes
            </Link>
            <h1 className="text-3xl font-black text-slate-900">
              {donnees.classe.nom_classe} — en direct
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-700">
            🟢 {nbActifs} en activité · 🔴 {nbAider} à aider · mis à jour toutes
            les 15 s
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tuiles.map((t) => (
            <div
              key={t.code}
              className={`rounded-2xl border-2 p-3 ${t.aider ? COULEURS.aider : COULEURS[t.etat]}`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-mono text-lg font-black">{t.code}</p>
                <p className="text-xs font-semibold">
                  {t.aider
                    ? "🔴 à aider"
                    : t.etat === "actif"
                      ? "🟢 actif"
                      : t.etat === "pause"
                        ? `🟠 ${t.depuisMin} min`
                        : "⚪ rien"}
                </p>
              </div>
              {t.prenom && (
                <p className="truncate text-sm font-bold text-slate-800">
                  {t.prenom}
                </p>
              )}
              <p className="mt-1 line-clamp-2 text-sm text-slate-700">
                {t.enCours ?? "Pas encore commencé"}
              </p>
              {(t.reponses > 0 || t.videosVues > 0) && (
                <p className="mt-1 text-xs text-slate-500">
                  {[
                    t.reponses > 0 && `Coach ${t.justes}/${t.reponses}`,
                    t.videosVues > 0 && `vidéos vues ${t.videosVues}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Les 3 dernières heures. 🟢 un geste il y a moins de 3 min · 🟠 plus
          rien depuis · 🔴 trois erreurs de suite sur le même exercice :
          c&apos;est l&apos;élève à aller voir.
        </p>
      </div>
    </main>
  );
}
