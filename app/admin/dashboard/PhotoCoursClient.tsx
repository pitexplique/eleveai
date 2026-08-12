"use client";

// app/admin/dashboard/PhotoCoursClient.tsx
//
// « Qui utilise Photographier un cours » — l'écran qui doit répondre à une
// seule question : est-ce que ça sert à quelqu'un, ou est-ce qu'on a construit
// pour nous ?
//
// D'où l'ordre d'affichage : les PERSONNES d'abord, le détail ensuite. Un
// total d'appels flatte ; une liste de trois noms dit la vérité.

import { useEffect, useState } from "react";

type Utilisateur = {
  codeUtilisateur: string;
  codeEtablissement: string | null;
  nom: string | null;
  typeUtilisateur: string | null;
  lectures: number;
  productions: number;
  derniere: string;
  notions: string[];
};

type Ligne = {
  id: string;
  created_at: string;
  code_utilisateur: string;
  nom: string | null;
  etape: "lecture" | "production";
  type_production: string | null;
  confiance: number | null;
  niveau: string | null;
  notion: string | null;
};

type Donnees = {
  ok: boolean;
  tableManquante?: boolean;
  error?: string;
  total?: number;
  lectures?: number;
  productions?: number;
  confianceMoyenne?: number | null;
  lecturesFaibles?: number;
  utilisateurs?: Utilisateur[];
  recents?: Ligne[];
};

function dateCourte(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PhotoCoursClient() {
  const [donnees, setDonnees] = useState<Donnees | null>(null);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    fetch("/api/admin/photo-cours")
      .then((r) => r.json())
      .then(setDonnees)
      .catch(() => setDonnees({ ok: false, error: "Chargement impossible." }));
  }, []);

  return (
    <section className="rounded-xl border border-violet-700 bg-violet-900/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-bold text-violet-300">📷 Photographier un cours</p>
          <p className="mt-1 text-sm text-slate-400">
            Qui s&apos;en sert, sur quelles notions, et si les photos sont
            lisibles.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          className="shrink-0 rounded-lg border border-violet-600 px-3 py-1 text-xs font-semibold text-violet-200 transition hover:bg-violet-800/40"
        >
          {ouvert ? "Replier" : "Voir le détail"}
        </button>
      </div>

      {!donnees && (
        <p className="mt-3 text-sm text-slate-500">Chargement…</p>
      )}

      {donnees?.tableManquante && (
        <p className="mt-3 rounded-lg border border-amber-700 bg-amber-900/30 px-3 py-2 text-sm text-amber-200">
          La table <code className="font-mono">photo_cours_usages</code> n&apos;existe
          pas encore. Exécute{" "}
          <code className="font-mono">supabase/photo_cours_usages.sql</code> dans
          l&apos;éditeur SQL de Supabase — sans elle, rien n&apos;est enregistré.
        </p>
      )}

      {donnees?.ok && (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Chiffre
              valeur={donnees.utilisateurs?.length ?? 0}
              label="personnes"
              accent
            />
            <Chiffre valeur={donnees.lectures ?? 0} label="photos lues" />
            <Chiffre valeur={donnees.productions ?? 0} label="documents produits" />
            <Chiffre
              valeur={
                donnees.confianceMoyenne === null ||
                donnees.confianceMoyenne === undefined
                  ? "—"
                  : `${donnees.confianceMoyenne}/100`
              }
              label="lisibilité moyenne"
            />
          </div>

          {(donnees.utilisateurs?.length ?? 0) === 0 && (
            <p className="mt-3 text-sm text-slate-400">
              Personne ne s&apos;en est encore servi.
            </p>
          )}

          {(donnees.lecturesFaibles ?? 0) > 0 && (
            <p className="mt-3 text-xs text-amber-300">
              {donnees.lecturesFaibles} photo
              {(donnees.lecturesFaibles ?? 0) > 1 ? "s" : ""} trop difficile
              {(donnees.lecturesFaibles ?? 0) > 1 ? "s" : ""} à lire (confiance
              sous 60). Si ce chiffre monte, c&apos;est la prise de vue
              qu&apos;il faut expliquer, pas le modèle qu&apos;il faut changer.
            </p>
          )}

          {ouvert && (
            <div className="mt-4 space-y-4">
              {/* Les personnes */}
              {(donnees.utilisateurs?.length ?? 0) > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[36rem] text-left text-xs">
                    <thead className="text-slate-400">
                      <tr>
                        <th className="pb-2 pr-3 font-semibold">Qui</th>
                        <th className="pb-2 pr-3 font-semibold">Compte</th>
                        <th className="pb-2 pr-3 font-semibold">Lectures</th>
                        <th className="pb-2 pr-3 font-semibold">Productions</th>
                        <th className="pb-2 pr-3 font-semibold">Dernière fois</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {donnees.utilisateurs?.map((u) => (
                        <tr
                          key={`${u.codeEtablissement}/${u.codeUtilisateur}`}
                          className="border-t border-slate-700/60"
                        >
                          <td className="py-2 pr-3">
                            <span className="font-semibold">
                              {u.nom || u.codeUtilisateur}
                            </span>
                            {u.notions.length > 0 && (
                              <span className="block text-[11px] text-slate-500">
                                {u.notions.slice(0, 3).join(" · ")}
                              </span>
                            )}
                          </td>
                          <td className="py-2 pr-3 font-mono text-[11px] text-slate-400">
                            {u.codeEtablissement}/{u.codeUtilisateur}
                            <span className="ml-1 text-slate-500">
                              ({u.typeUtilisateur || "?"})
                            </span>
                          </td>
                          <td className="py-2 pr-3">{u.lectures}</td>
                          <td className="py-2 pr-3">{u.productions}</td>
                          <td className="py-2 pr-3 text-slate-400">
                            {dateCourte(u.derniere)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Le détail, ligne à ligne */}
              {(donnees.recents?.length ?? 0) > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-slate-400">
                    Les dernières utilisations
                  </p>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {donnees.recents?.map((l) => (
                      <li key={l.id} className="border-t border-slate-700/40 pt-1">
                        <span className="text-slate-500">
                          {dateCourte(l.created_at)}
                        </span>{" "}
                        <span className="font-semibold text-slate-300">
                          {l.nom || l.code_utilisateur}
                        </span>{" "}
                        {l.etape === "lecture" ? (
                          <>
                            a photographié un cours
                            {l.notion ? ` (${l.notion})` : ""}
                            {typeof l.confiance === "number"
                              ? ` — lisibilité ${l.confiance}/100`
                              : ""}
                          </>
                        ) : (
                          <>
                            a produit : {l.type_production}
                            {l.notion ? ` (${l.notion})` : ""}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {donnees && !donnees.ok && !donnees.tableManquante && (
        <p className="mt-3 text-sm text-rose-300">{donnees.error}</p>
      )}
    </section>
  );
}

function Chiffre({
  valeur,
  label,
  accent,
}: {
  valeur: number | string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg bg-slate-900/60 px-3 py-2">
      <p
        className={[
          "text-xl font-bold",
          accent ? "text-violet-300" : "text-slate-200",
        ].join(" ")}
      >
        {valeur}
      </p>
      <p className="text-[11px] text-slate-500">{label}</p>
    </div>
  );
}
