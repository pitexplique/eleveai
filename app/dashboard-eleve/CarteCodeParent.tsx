"use client";

// Le code que l'élève donne à ses parents (05/11/2026). Le lien ne naît jamais sans lui.
// ⛔ Invisible pour les comptes d'établissement et tant que la vente n'est pas ouverte :
// la route répond `disponible: false`. Aucun prix ici : c'est l'espace de l'élève.
import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type Etat = { disponible: boolean; code?: string | null; expire?: string | null; parents?: number };

export default function CarteCodeParent() {
  const { eleve } = useEleve();
  const jeton = (eleve as { token?: string } | null)?.token;
  const [etat, setEtat] = useState<Etat | null>(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    if (!jeton) return;
    fetch("/api/suivi/code", { headers: { Authorization: `Bearer ${jeton}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setEtat(j))
      .catch(() => setEtat(null));
  }, [jeton]);

  if (!etat?.disponible) return null;

  async function creer() {
    setErreur("");
    const r = await fetch("/api/suivi/code", { method: "POST", headers: { Authorization: `Bearer ${jeton}` } });
    const j = await r.json().catch(() => ({}));
    if (j.code) setEtat((e) => ({ ...e, disponible: true, code: j.code, expire: j.expire }));
    else setErreur(j.error ?? "Le code n'a pas pu être créé.");
  }

  return (
    <section className="mt-6 rounded-[2rem] border border-sky-200 bg-white p-6 shadow-xl">
      <h2 className="text-xl font-black text-slate-900">👨‍👩‍👧 Mes parents</h2>
      <p className="mt-2 text-slate-700">
        Avec ce code, tes parents peuvent voir ton travail au coach : tes séances, tes résultats et ce qui est à revoir.
        Ne le donne qu&apos;à eux.
      </p>
      {(etat.parents ?? 0) > 0 && (
        <p className="mt-2 font-bold text-slate-900">
          {etat.parents === 1 ? "Un parent suit déjà ton travail." : `${etat.parents} parents suivent déjà ton travail.`}
        </p>
      )}
      {etat.code ? (
        <p className="mt-4 text-3xl font-black tracking-widest text-sky-800">{etat.code}</p>
      ) : (
        <button type="button" onClick={creer} className="mt-4 rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800">
          Créer un code pour mes parents
        </button>
      )}
      {etat.code && etat.expire && (
        <p className="mt-1 text-sm text-slate-500">Valable jusqu&apos;au {new Date(etat.expire).toLocaleDateString("fr-FR")}, une seule fois.</p>
      )}
      {erreur && <p role="alert" className="mt-3 font-bold text-rose-700">{erreur}</p>}
    </section>
  );
}
