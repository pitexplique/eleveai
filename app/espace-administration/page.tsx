"use client";

import { useState } from "react";

export default function AdministrationPage() {
  // État pour les trois boutons copier
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-12">
        
        {/* ... toute ta partie HERO ... */}

        {/* ------------------------ */}
        {/* SECTION 2 : GENERATEUR */}
        {/* ------------------------ */}
        <section className="space-y-5 rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
          
          <h2 className="text-xl font-semibold text-slate-50">
            2. Générateur de prompts pour textes administratifs DYS-friendly & IA-friendly
          </h2>

          <div className="space-y-4">

            {/* PROMPT 1 */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-emerald-300">
                ✅ Message aux familles – version claire & DYS-friendly
              </h3>

              <p className="text-xs text-slate-300">
                Copier-coller ce prompt, puis ajouter votre texte brut à la fin :
              </p>

              {/* Prompt texte */}
              <pre
                className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800"
              >
{`Tu es un assistant spécialisé en communication scolaire.
Réécris le texte suivant pour des familles :
- phrases courtes ;
- vocabulaire simple, sans jargon administratif ;
- structure claire : objet, informations essentielles, démarches à suivre ;
- mise en forme avec des puces si nécessaire ;
- ton bienveillant et professionnel.

Texte à simplifier :
"COLLER ICI VOTRE TEXTE DE DÉPART"`}
              </pre>

              {/* Bouton copier */}
              <button
                onClick={() =>
                  handleCopy(
                    "prompt1",
                    `Tu es un assistant spécialisé en communication scolaire.
Réécris le texte suivant pour des familles :
- phrases courtes ;
- vocabulaire simple, sans jargon administratif ;
- structure claire : objet, informations essentielles, démarches à suivre ;
- mise en forme avec des puces si nécessaire ;
- ton bienveillant et professionnel.

Texte à simplifier :
"COLLER ICI VOTRE TEXTE DE DÉPART"`
                  )
                }
                className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                {copied === "prompt1" ? "✔ Copié !" : "📋 Copier"}
              </button>
            </div>

            {/* PROMPT 2 */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-sky-300">
                ✅ Version IA-friendly pour que les élèves puissent le faire expliquer par l’IA
              </h3>

              <p className="text-xs text-slate-300">
                Pour produire un texte bien structuré et facile à résumer :
              </p>

              <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`Réécris le texte suivant pour qu'il soit facile à traiter par une IA utilisée par un élève :
- structure le texte avec des titres et sous-titres clairs ;
- numérote les étapes importantes ;
- mets en évidence les dates, horaires, lieux et personnes clés ;
- évite les phrases de plus de 20 mots.

Texte à restructurer :
"COLLER ICI VOTRE TEXTE DE DÉPART"`}
              </pre>

              <button
                onClick={() =>
                  handleCopy(
                    "prompt2",
                    `Réécris le texte suivant pour qu'il soit facile à traiter par une IA utilisée par un élève :
- structure le texte avec des titres et sous-titres clairs ;
- numérote les étapes importantes ;
- mets en évidence les dates, horaires, lieux et personnes clés ;
- évite les phrases de plus de 20 mots.

Texte à restructurer :
"COLLER ICI VOTRE TEXTE DE DÉPART"`
                  )
                }
                className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                {copied === "prompt2" ? "✔ Copié !" : "📋 Copier"}
              </button>
            </div>

            {/* PROMPT 3 */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-amber-300">
                ✅ Convocation officielle + version simplifiée
              </h3>

              <p className="text-xs text-slate-300">
                Pour obtenir automatiquement une version formelle + une version simplifiée :
              </p>

              <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`À partir des informations ci-dessous, produis deux versions d'un même message :
1) Une version "courrier officiel" pour les archives de l'établissement.
2) Une version "explication simple pour les familles" :
   - phrases courtes,
   - informations essentielles d'abord,
   - ton bienveillant.

Informations à utiliser :
"COLLER ICI LES INFORMATIONS (date, lieu, motif, personne concernée, etc.)"`}
              </pre>

              <button
                onClick={() =>
                  handleCopy(
                    "prompt3",
                    `À partir des informations ci-dessous, produis deux versions d'un même message :
1) Une version "courrier officiel" pour les archives de l'établissement.
2) Une version "explication simple pour les familles" :
   - phrases courtes,
   - informations essentielles d'abord,
   - ton bienveillant.

Informations à utiliser :
"COLLER ICI LES INFORMATIONS (date, lieu, motif, personne concernée, etc.)"`
                  )
                }
                className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                {copied === "prompt3" ? "✔ Copié !" : "📋 Copier"}
              </button>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

