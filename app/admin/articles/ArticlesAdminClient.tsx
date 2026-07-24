"use client";

// LA RÉGIE DES RUBRIQUES — édition des articles (table journal_articles).
// Même philosophie que la régie de la Une : Frédéric édite ici, l'assistant
// édite en base — même table. Première rubrique : « Un peu de maths ».
// 💡 Une ANIMATION = un SVG animé dans le champ image (/images/….svg ou URL) :
// il joue tout seul dans la carte de l'accueil, comme le cœur ε → ∞.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Article = {
  id: string;
  rubrique: string;
  titre: string;
  accroche: string | null;
  image_url: string | null;
  lien: string;
  cta: string | null;
  actif: boolean;
  ordre: number;
};

const VIDE = {
  rubrique: "un-peu-de-maths",
  titre: "",
  accroche: "",
  image_url: "",
  lien: "",
  cta: "Lire →",
  ordre: 100,
};

// L'ÉDITO DU JOUR (24/07) — même table, rubrique 'edito'. Un clic prépare le
// formulaire : ordre 0 (le plus récent passe devant), lien « # » (l'édito n'a
// pas besoin de renvoi, la colonne est obligatoire), pas d'image.
const PRESETS: Record<string, { aide: string; valeurs: Partial<typeof VIDE> }> = {
  "un-peu-de-maths": {
    aide: "Une carte de la rubrique « Un peu de maths » (ordre croissant : 0 = en tête ; l'accueil en montre 3).",
    valeurs: { rubrique: "un-peu-de-maths", ordre: 0, cta: "Lire →" },
  },
  edito: {
    aide:
      "L'édito du jour, en haut à droite de la Une. Titre = le titre de l'édito ; " +
      "le CORPS va dans l'accroche, un paragraphe par bloc séparé d'une LIGNE VIDE " +
      "(le 1er se lit tout de suite, les suivants sous « Lire la suite »). Lien + bouton = " +
      "le renvoi de fin (laisse « # » et un bouton vide s'il n'y en a pas). Le plus récent " +
      "s'affiche, et sa date de création s'affiche à côté du mot « L'édito ».",
    valeurs: { rubrique: "edito", ordre: 0, lien: "#", cta: "", image_url: "" },
  },
};

const champ =
  "w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900";
const libelle = "mt-2 block text-[11px] font-black uppercase tracking-wide text-slate-500";

export default function ArticlesAdminClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [info, setInfo] = useState("");
  const [nouveau, setNouveau] = useState({ ...VIDE });
  const [enCours, setEnCours] = useState<string | null>(null);

  const charger = useCallback(async () => {
    setChargement(true);
    setErreur("");
    try {
      const res = await fetch("/api/admin/articles");
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur de chargement.");
      setArticles(data.items);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Erreur de chargement.");
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  function majLocal(id: string, patch: Partial<Article>) {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  async function appel(method: string, body: unknown) {
    const res = await fetch("/api/admin/articles", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "Échec.");
    return data;
  }

  async function creer() {
    setEnCours("nouveau");
    setErreur("");
    setInfo("");
    try {
      const data = await appel("POST", nouveau);
      setArticles((prev) => [...prev, data.item]);
      setNouveau({ ...VIDE });
      setInfo(`« ${data.item.titre} » publié ✓ (l'accueil est régénéré)`);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec de la création.");
    } finally {
      setEnCours(null);
    }
  }

  async function sauver(a: Article) {
    setEnCours(a.id);
    setErreur("");
    setInfo("");
    try {
      const data = await appel("PATCH", a);
      majLocal(a.id, data.item);
      setInfo(`« ${data.item.titre} » enregistré ✓`);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec de l'enregistrement.");
    } finally {
      setEnCours(null);
    }
  }

  async function basculer(a: Article) {
    setEnCours(a.id);
    setErreur("");
    try {
      const data = await appel("PATCH", { id: a.id, actif: !a.actif });
      majLocal(a.id, data.item);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec.");
    } finally {
      setEnCours(null);
    }
  }

  async function supprimer(a: Article) {
    if (!window.confirm(`Supprimer « ${a.titre} » ? (définitif — masquer suffit souvent)`)) return;
    setEnCours(a.id);
    setErreur("");
    try {
      await appel("DELETE", { id: a.id });
      setArticles((prev) => prev.filter((x) => x.id !== a.id));
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec de la suppression.");
    } finally {
      setEnCours(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl font-black text-slate-900">
            📰 La régie des rubriques — les articles
          </h1>
          <Link href="/admin/journal" className="text-sm font-bold text-blue-700 underline">
            → La régie de la Une (slides)
          </Link>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          Rubrique <b>un-peu-de-maths</b> = les cartes « Un peu de maths » de l&apos;accueil ·
          rubrique <b>edito</b> = <b>l&apos;édito du jour</b> (colonne de droite de la Une).
          💡 Pour une <b>animation</b> : mets un SVG animé dans le champ image
          (<code>/images/….svg</code> ou une URL) — il joue tout seul dans la carte.
          Chaque enregistrement régénère l&apos;accueil immédiatement.
        </p>

        {erreur && <p className="mt-3 rounded bg-red-100 px-3 py-2 text-sm font-bold text-red-800">{erreur}</p>}
        {info && <p className="mt-3 rounded bg-emerald-100 px-3 py-2 text-sm font-bold text-emerald-800">{info}</p>}

        {/* NOUVEL ARTICLE */}
        <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <h2 className="text-sm font-black uppercase tracking-wide text-blue-800">➕ Nouvel article</h2>
          {/* Deux gestes, pas un champ libre à deviner : « une carte » ou
              « l'édito du jour » — le formulaire se prépare tout seul. */}
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(PRESETS).map(([cle, p]) => (
              <button
                key={cle}
                type="button"
                onClick={() => setNouveau({ ...VIDE, ...p.valeurs })}
                className={`rounded px-3 py-1 text-xs font-black ${
                  nouveau.rubrique === cle
                    ? "bg-blue-700 text-white"
                    : "border border-blue-300 bg-white text-blue-800"
                }`}
              >
                {cle === "edito" ? "✍️ Écrire l'édito du jour" : "🧮 Une carte « Un peu de maths »"}
              </button>
            ))}
          </div>
          {PRESETS[nouveau.rubrique] && (
            <p className="mt-2 rounded bg-white/70 px-2 py-1.5 text-xs leading-5 text-slate-600">
              {PRESETS[nouveau.rubrique]?.aide}
            </p>
          )}
          <label className={libelle}>Titre *</label>
          <input className={champ} value={nouveau.titre} onChange={(e) => setNouveau({ ...nouveau, titre: e.target.value })} />
          <label className={libelle}>
            {nouveau.rubrique === "edito" ? "Le corps de l'édito (1 ligne vide entre les paragraphes)" : "Accroche"}
          </label>
          <textarea
            className={champ}
            rows={nouveau.rubrique === "edito" ? 8 : 2}
            value={nouveau.accroche}
            onChange={(e) => setNouveau({ ...nouveau, accroche: e.target.value })}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <label className={libelle}>Image / animation (URL ou /images/…)</label>
              <input className={champ} value={nouveau.image_url} placeholder="/images/mon-animation.svg" onChange={(e) => setNouveau({ ...nouveau, image_url: e.target.value })} />
            </div>
            <div>
              <label className={libelle}>Lien * (interne /… ou https://…)</label>
              <input className={champ} value={nouveau.lien} placeholder="/simulateur-epsilon" onChange={(e) => setNouveau({ ...nouveau, lien: e.target.value })} />
            </div>
            <div>
              <label className={libelle}>Bouton (CTA)</label>
              <input className={champ} value={nouveau.cta} onChange={(e) => setNouveau({ ...nouveau, cta: e.target.value })} />
            </div>
            <div>
              <label className={libelle}>Rubrique · ordre</label>
              <div className="flex gap-2">
                <input className={champ} value={nouveau.rubrique} onChange={(e) => setNouveau({ ...nouveau, rubrique: e.target.value })} />
                <input className={`${champ} w-24`} type="number" value={nouveau.ordre} onChange={(e) => setNouveau({ ...nouveau, ordre: Number(e.target.value) })} />
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={enCours === "nouveau" || !nouveau.titre.trim() || !nouveau.lien.trim()}
            onClick={creer}
            className="mt-3 rounded bg-blue-700 px-4 py-2 text-sm font-black text-white disabled:opacity-40"
          >
            {enCours === "nouveau" ? "Publication…" : "Publier l'article"}
          </button>
        </div>

        {/* LES ARTICLES */}
        {chargement ? (
          <p className="mt-6 text-sm text-slate-500">Chargement…</p>
        ) : articles.length === 0 ? (
          <p className="mt-6 rounded bg-amber-100 px-3 py-2 text-sm font-bold text-amber-900">
            Aucun article en base — la table <code>journal_articles</code> existe-t-elle ?
            (SQL : <code>supabase/journal_articles.sql</code>.) En attendant, l&apos;accueil
            affiche son article de repli (la machine des epsilons).
          </p>
        ) : (
          articles.map((a) => (
            <div key={a.id} className={`mt-4 rounded-xl border p-4 ${a.actif ? "border-slate-300 bg-white" : "border-slate-200 bg-slate-50 opacity-70"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                  {a.rubrique === "edito" ? "✍️ ÉDITO" : a.rubrique} · ordre {a.ordre}{" "}
                  {a.actif ? "" : "· MASQUÉ"}
                </p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => sauver(a)} disabled={enCours === a.id}
                    className="rounded bg-emerald-600 px-3 py-1 text-xs font-black text-white disabled:opacity-40">
                    Enregistrer
                  </button>
                  <button type="button" onClick={() => basculer(a)} disabled={enCours === a.id}
                    className="rounded bg-slate-600 px-3 py-1 text-xs font-black text-white disabled:opacity-40">
                    {a.actif ? "Masquer" : "Publier"}
                  </button>
                  <button type="button" onClick={() => supprimer(a)} disabled={enCours === a.id}
                    className="rounded bg-red-600 px-3 py-1 text-xs font-black text-white disabled:opacity-40">
                    Supprimer
                  </button>
                </div>
              </div>
              <label className={libelle}>Titre</label>
              <input className={champ} value={a.titre} onChange={(e) => majLocal(a.id, { titre: e.target.value })} />
              <label className={libelle}>
                {a.rubrique === "edito" ? "Le corps de l'édito (1 ligne vide entre les paragraphes)" : "Accroche"}
              </label>
              <textarea
                className={champ}
                rows={a.rubrique === "edito" ? 10 : 2}
                value={a.accroche ?? ""}
                onChange={(e) => majLocal(a.id, { accroche: e.target.value })}
              />
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className={libelle}>Image / animation</label>
                  <input className={champ} value={a.image_url ?? ""} onChange={(e) => majLocal(a.id, { image_url: e.target.value })} />
                </div>
                <div>
                  <label className={libelle}>Lien</label>
                  <input className={champ} value={a.lien} onChange={(e) => majLocal(a.id, { lien: e.target.value })} />
                </div>
                <div>
                  <label className={libelle}>Bouton (CTA)</label>
                  <input className={champ} value={a.cta ?? ""} onChange={(e) => majLocal(a.id, { cta: e.target.value })} />
                </div>
                <div>
                  <label className={libelle}>Rubrique · ordre</label>
                  <div className="flex gap-2">
                    <input className={champ} value={a.rubrique} onChange={(e) => majLocal(a.id, { rubrique: e.target.value })} />
                    <input className={`${champ} w-24`} type="number" value={a.ordre} onChange={(e) => majLocal(a.id, { ordre: Number(e.target.value) })} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
