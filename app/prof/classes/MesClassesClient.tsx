"use client";

// « MES CLASSES » — le prof inscrit par e-mail crée ses classes ; le site
// fabrique un code de classe, un code par élève et un mot de passe simple
// (« TIGRE27 »). Les cartes à imprimer vivent sur /prof/cartes.
// Le pourquoi (périmètre par rattachement, pas par rôle) : supabase/classes_prof.sql.

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type EleveClasse = {
  code_utilisateur: string;
  nom: string | null;
  mot_de_passe: string | null;
  actif: boolean;
};

type Classe = {
  id: string;
  etablissement: string;
  nom_classe: string;
  niveau: string;
  code_etablissement: string;
  nb_eleves: number;
  eleves: EleveClasse[];
};

const NIVEAUX: { v: string; l: string }[] = [
  { v: "cp", l: "CP" },
  { v: "ce1", l: "CE1" },
  { v: "ce2", l: "CE2" },
  { v: "cm1", l: "CM1" },
  { v: "cm2", l: "CM2" },
  { v: "6e", l: "6e" },
  { v: "5e", l: "5e" },
  { v: "4e", l: "4e" },
  { v: "3e", l: "3e" },
  { v: "seconde", l: "Seconde" },
  { v: "premiere-spe", l: "Première" },
  { v: "terminale-spe", l: "Terminale" },
];

export default function MesClassesClient() {
  const { eleve: user } = useEleve();
  const token = user?.token ?? null;

  const [classes, setClasses] = useState<Classe[] | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [ouverte, setOuverte] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);

  const [etablissement, setEtablissement] = useState("");
  // ⭐ 27/10/2026 — Frédéric : « l'élève devrait taper 3 lettres max », « on peut
  // demander 5 lettres à la saisie tout simplement » : le sigle commence le code.
  const [sigle, setSigle] = useState("");
  const [nomClasse, setNomClasse] = useState("");
  const [niveau, setNiveau] = useState("6e");
  const [nbEleves, setNbEleves] = useState(30);

  // ⭐ 28/10 : un bouton qui ne réagit pas, c'est pire qu'un message. Sans
  // jeton (session ancienne ou simulée), on le DIT au lieu de rester muet.
  const SANS_JETON =
    "Ta session ne permet pas de créer de classe : déconnecte-toi puis reconnecte-toi avec ton adresse académique.";

  // Le bouton s'allume quand tout ce qui est obligatoire est rempli.
  const complet =
    etablissement.trim() !== "" &&
    nomClasse.trim() !== "" &&
    nbEleves >= 1 &&
    nbEleves <= 40;

  const charger = useCallback(async () => {
    if (!token) {
      setErreur(SANS_JETON);
      setClasses([]);
      return;
    }
    const res = await fetch("/api/prof/classes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok || !d?.ok) {
      setErreur(d?.error ?? "Impossible de charger tes classes.");
      setClasses([]);
      return;
    }
    setErreur(null);
    setClasses(d.classes ?? []);
    if (d.classes?.[0] && !etablissement)
      setEtablissement(d.classes[0].etablissement);
  }, [token, etablissement]);

  useEffect(() => {
    charger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function creer(e: FormEvent) {
    e.preventDefault();
    if (!token) {
      setErreur(SANS_JETON);
      return;
    }
    if (!complet || envoi) return;
    setEnvoi(true);
    setErreur(null);
    try {
      const res = await fetch("/api/prof/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          etablissement,
          sigle,
          nom_classe: nomClasse,
          niveau,
          nb_eleves: nbEleves,
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d?.ok) {
        setErreur(d?.error ?? "Création impossible.");
        return;
      }
      setNomClasse("");
      setOuverte(d.code_etablissement);
      await charger();
    } catch {
      setErreur("Le serveur ne répond pas. Vérifie ta connexion et réessaie.");
    } finally {
      setEnvoi(false);
    }
  }

  async function agir(code: string, body: Record<string, unknown>) {
    if (!token) return;
    const res = await fetch("/api/prof/classes/eleve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code_etablissement: code, ...body }),
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok || !d?.ok) setErreur(d?.error ?? "Modification impossible.");
    await charger();
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-black text-slate-900">Mes classes</h1>
          <p className="mt-4 text-slate-700">
            Connecte-toi avec ton adresse académique (prenom.nom@ac-…fr) pour
            créer tes classes.
          </p>
          <Link
            href="/auth/signin?type=prof&next=/prof/classes"
            className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-500"
          >
            Me connecter
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-black text-slate-900">Mes classes</h1>
        <p className="mt-2 text-slate-600">
          Crée une classe : le site fabrique le code de la classe, un code par
          élève et un mot de passe simple. Imprime les cartes et distribue-les.
        </p>

        {erreur && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {erreur}
          </p>
        )}

        <form
          id="nouvelle-classe"
          onSubmit={creer}
          className="mt-6 scroll-mt-24 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2"
        >
          <h2 className="text-lg font-black text-slate-900 sm:col-span-2">
            Nouvelle classe
          </h2>
          <label className="space-y-1 text-sm font-semibold text-slate-800">
            Établissement
            <input
              required
              value={etablissement}
              onChange={(e) => setEtablissement(e.target.value)}
              placeholder="Collège Saint-Joseph"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"
            />
          </label>
          <label className="space-y-1 text-sm font-semibold text-slate-800">
            Sigle (5 lettres au plus)
            <input
              value={sigle}
              onChange={(e) => setSigle(e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5))}
              placeholder="CSJ"
              maxLength={5}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono font-normal uppercase"
            />
            <span className="block text-xs font-normal text-slate-500">
              Le code que tapent les élèves commence par lui : {(sigle || "CSJ") + "6A"}. Vide : les initiales de
              l&apos;établissement.
            </span>
          </label>
          <label className="space-y-1 text-sm font-semibold text-slate-800">
            Nom de la classe
            <input
              required
              value={nomClasse}
              onChange={(e) => setNomClasse(e.target.value)}
              placeholder="6e A"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"
            />
          </label>
          <label className="space-y-1 text-sm font-semibold text-slate-800">
            Niveau
            <select
              value={niveau}
              onChange={(e) => setNiveau(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"
            >
              {NIVEAUX.map((n) => (
                <option key={n.v} value={n.v}>
                  {n.l}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm font-semibold text-slate-800">
            Nombre d&apos;élèves
            <input
              type="number"
              min={1}
              max={40}
              required
              value={nbEleves}
              onChange={(e) => setNbEleves(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"
            />
          </label>
          <div className="flex flex-col justify-end gap-1.5">
            {/* 28/10 (Frédéric) : gris tant qu'il manque un champ, en
                surbrillance quand tout est rempli, roue pendant la création. */}
            <button
              type="submit"
              disabled={!complet || envoi}
              aria-busy={envoi}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-bold transition ${
                envoi
                  ? "cursor-wait bg-emerald-600 text-white"
                  : complet
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-200 hover:bg-emerald-500"
                    : "cursor-not-allowed bg-slate-200 text-slate-500"
              }`}
            >
              {envoi && (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="4" />
                  <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              )}
              {envoi ? "Création de la classe…" : "Créer la classe"}
            </button>
            {!complet && !envoi && (
              <span className="text-center text-xs text-slate-500">
                Remplis l&apos;établissement, le nom de la classe et le nombre d&apos;élèves (1 à 40).
              </span>
            )}
          </div>
        </form>

        <section className="mt-8 space-y-4">
          {classes === null && <p className="text-slate-500">Chargement…</p>}
          {classes?.length === 0 && !erreur && (
            <p className="text-slate-500">
              Pas encore de classe. Crée la première ci-dessus.
            </p>
          )}
          {classes?.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <header className="flex flex-wrap items-center gap-3 p-5">
                <div className="flex-1">
                  <h2 className="text-xl font-black text-slate-900">
                    {c.nom_classe}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {c.etablissement} · {c.eleves.length} élèves · code de la
                    classe{" "}
                    <span className="font-mono font-black text-slate-900">
                      {c.code_etablissement}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/prof/classes/direct?code=${encodeURIComponent(c.code_etablissement)}`}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500"
                >
                  🟢 En direct
                </Link>
                <Link
                  href={`/prof/classes/bilan?code=${encodeURIComponent(c.code_etablissement)}`}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
                >
                  📊 Bilan
                </Link>
                <Link
                  href={`/prof/cartes?code=${encodeURIComponent(c.code_etablissement)}`}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-700"
                >
                  🖨️ Imprimer les cartes
                </Link>
                <button
                  onClick={() =>
                    setOuverte(
                      ouverte === c.code_etablissement
                        ? null
                        : c.code_etablissement,
                    )
                  }
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
                >
                  {ouverte === c.code_etablissement
                    ? "Masquer les élèves"
                    : "Voir les élèves"}
                </button>
              </header>

              {ouverte === c.code_etablissement && (
                <div className="border-t border-slate-200 p-5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-500">
                        <th className="py-1">Code élève</th>
                        <th className="py-1">Prénom (facultatif)</th>
                        <th className="py-1">Mot de passe</th>
                        <th className="py-1" />
                      </tr>
                    </thead>
                    <tbody>
                      {c.eleves.map((e) => (
                        <tr
                          key={e.code_utilisateur}
                          className="border-t border-slate-100"
                        >
                          <td className="py-1.5 font-mono font-bold">
                            {e.code_utilisateur}
                          </td>
                          <td className="py-1.5">
                            <input
                              defaultValue={e.nom ?? ""}
                              onBlur={(ev) => {
                                const v = ev.target.value.trim();
                                if (v !== (e.nom ?? "")) {
                                  agir(c.code_etablissement, {
                                    action: "prenom",
                                    code_utilisateur: e.code_utilisateur,
                                    nom: v,
                                  });
                                }
                              }}
                              className="w-full rounded border border-transparent px-2 py-1 hover:border-slate-200 focus:border-slate-300"
                            />
                          </td>
                          <td className="py-1.5 font-mono">{e.mot_de_passe}</td>
                          <td className="py-1.5 text-right">
                            <button
                              onClick={() =>
                                agir(c.code_etablissement, {
                                  action: "nouveau-mdp",
                                  code_utilisateur: e.code_utilisateur,
                                })
                              }
                              className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                            >
                              Nouveau mot de passe
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() =>
                      agir(c.code_etablissement, { action: "ajouter" })
                    }
                    className="mt-3 rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    + Ajouter un élève
                  </button>
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
