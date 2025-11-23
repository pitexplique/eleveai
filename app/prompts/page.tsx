"use client";

import { useState, useMemo } from "react";
import prompts from "@/data/promptsProf.json";

const CLASSES = ["6e", "5e", "4e", "3e"] as const;
const MATIERES = ["Maths", "Français", "Histoire-Géo", "SVT", "Physique-Chimie", "Anglais", "Techno"] as const;
const NIVEAUX = [
  { id: "decouverte", label: "🟢 Je découvre", desc: "Pour revoir les bases tranquillement, avec beaucoup d’exemples." },
  { id: "progresse", label: "🟡 Je progresse", desc: "Pour travailler au niveau attendu dans ta classe." },
  { id: "challenge", label: "🔴 Je me challenge", desc: "Pour aller un peu plus loin avec des défis." },
] as const;

export default function PromptsPage() {
  const [classe, setClasse] = useState<string>("5e");
  const [matiere, setMatiere] = useState<string>("Maths");
  const [niveau, setNiveau] = useState<string>("decouverte");

  // Exemple de filtrage (à adapter à ton JSON plus tard)
  const filteredPrompts = useMemo(() => {
    return (prompts as any[]).filter((p) => {
      const okClasse = !classe || p.classe === classe;
      const okMatiere = !matiere || p.matiere === matiere.toLowerCase();
      const okNiveau = !niveau || p.niveau === niveau;
      return okClasse && okMatiere && okNiveau;
    });
  }, [classe, matiere, niveau]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Titre page */}
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0047B6]">
            📘 Prompts du prof – Toutes matières
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Choisis ta classe, ta matière et le type de défi que tu veux relever aujourd’hui.
            EleveAI te proposera des prompts adaptés, prêts à être utilisés dans le chat.
          </p>
        </header>

        {/* Bloc TON PROCHAIN DÉFI */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6] flex items-center gap-2">
              ✨ Ton prochain défi
            </h2>
            <p className="text-sm text-gray-600">
              Clique sur une option dans chaque ligne pour construire ton défi personnalisé.
            </p>
          </div>

          {/* Ligne CLASSE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                🧑‍🎓 Je suis en…
              </h3>
              <span className="text-xs text-gray-500">
                Choisis ta classe pour adapter le niveau.
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {CLASSES.map((c) => {
                const selected = classe === c;
                return (
                  <button
                    key={c}
                    onClick={() => setClasse(c)}
                    className={
                      "px-4 py-2 rounded-full text-sm font-semibold border transition " +
                      (selected
                        ? "bg-[#0047B6] text-white border-[#0047B6] shadow-sm"
                        : "bg-white text-gray-700 border-slate-200 hover:bg-slate-50")
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ligne MATIÈRE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                📚 Je veux travailler…
              </h3>
              <span className="text-xs text-gray-500">
                Choisis la matière que tu veux réviser.
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {MATIERES.map((m) => {
                const selected = matiere === m;
                return (
                  <button
                    key={m}
                    onClick={() => setMatiere(m)}
                    className={
                      "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition " +
                      (selected
                        ? "bg-[#FFD300] text-[#7A5A00] border-[#FFD300] shadow-sm"
                        : "bg-white text-gray-700 border-slate-200 hover:bg-slate-50")
                    }
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ligne NIVEAU / DÉFI */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                🎯 Aujourd’hui, j’ai envie d’un défi…
              </h3>
              <span className="text-xs text-gray-500">
                On reste dans la positivité : tu choisis ton type de défi.
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {NIVEAUX.map((n) => {
                const selected = niveau === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setNiveau(n.id)}
                    className={
                      "flex flex-col items-start text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition " +
                      (selected
                        ? "bg-sky-50 border-[#0047B6] shadow-sm"
                        : "bg-white border-slate-200 hover:bg-slate-50")
                    }
                  >
                    <span className="font-semibold">{n.label}</span>
                    <span className="text-[11px] sm:text-xs text-gray-600 mt-1">
                      {n.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Résumé sélection + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 mt-2">
            <div className="text-xs sm:text-sm text-gray-700">
              <div>
                <span className="font-semibold text-[#0047B6]">Ton choix : </span>
                <span>
                  {classe} • {matiere} •{" "}
                  {NIVEAUX.find((n) => n.id === niveau)?.label ?? ""}
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500">
                Les prompts ci-dessous sont filtrés en fonction de tes choix.
              </div>
            </div>

            <a
              href="#liste-prompts"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0047B6] text-white text-xs sm:text-sm font-semibold shadow hover:bg-[#003894] transition"
            >
              🔎 Voir les prompts adaptés
            </a>
          </div>
        </section>

        {/* Liste des prompts filtrés */}
        <section id="liste-prompts" className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">
            Prompts disponibles
          </h2>

          {filteredPrompts.length === 0 && (
            <p className="text-sm text-gray-600">
              Aucun prompt ne correspond encore à cette combinaison. Tu pourras en ajouter dans
              ton fichier <code>data/promptsProf.json</code>.
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {filteredPrompts.map((p: any) => (
              <article
                key={p.id}
                className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2 text-sm shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500">
                  <span>{p.classe} • {p.matiereLabel ?? p.matiere}</span>
                  <span>
                    {p.niveau === "decouverte"
                      ? "🟢 Je découvre"
                      : p.niveau === "progresse"
                      ? "🟡 Je progresse"
                      : "🔴 Je me challenge"}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800">{p.titre}</h3>
                <p className="text-xs text-gray-700 mb-3">{p.texte}</p>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => navigator.clipboard.writeText(p.texte)}
                    className="px-3 py-1 rounded-full bg-[#0047B6] text-white text-[11px] font-semibold hover:bg-[#003894] transition"
                  >
                    Copier le prompt
                  </button>
                  {/* Plus tard tu pourras brancher ça au chat */}
                  {/* <button className="px-3 py-1 rounded-full border border-slate-300 text-[11px] text-gray-700 hover:bg-slate-50">
                    Envoyer au chat
                  </button> */}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

