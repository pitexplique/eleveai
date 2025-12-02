"use client";

import { useState } from "react";
import { ADMIN_PROMPT_SECTIONS, AdminPrompt } from "@/data/adminPrompts";

export default function AdministrationPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const getAccentClasses = (accent: AdminPrompt["accent"]) => {
    switch (accent) {
      case "emerald":
        return {
          title: "text-emerald-300",
          border: "border-emerald-500/40",
        };
      case "sky":
        return {
          title: "text-sky-300",
          border: "border-sky-500/40",
        };
      case "amber":
        return {
          title: "text-amber-300",
          border: "border-amber-500/40",
        };
      case "violet":
        return {
          title: "text-violet-300",
          border: "border-violet-500/40",
        };
      case "rose":
        return {
          title: "text-rose-300",
          border: "border-rose-500/40",
        };
      case "indigo":
        return {
          title: "text-indigo-300",
          border: "border-indigo-500/40",
        };
      case "red":
        return {
          title: "text-red-300",
          border: "border-red-500/40",
        };
      case "cyan":
        return {
          title: "text-cyan-300",
          border: "border-cyan-500/40",
        };
      default:
        return {
          title: "text-slate-100",
          border: "border-slate-800",
        };
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* HERO */}
        <header className="space-y-3">
          <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
            Assistant administratif (IA) · Collèges & Lycées
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">
            Aider le secrétariat, la vie scolaire et la direction au quotidien
          </h1>
          <p className="text-sm text-slate-300">
            Cette page propose des modèles de prompts pour rédiger plus vite des messages
            clairs, bienveillants et conformes au cadre scolaire, à destination des familles,
            des élèves, des partenaires et de l’équipe interne.
          </p>

          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
              Besoins concrets rencontrés par l’administration
            </p>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5">
              <li>• Résumer des documents officiels de plusieurs pages pour les familles</li>
              <li>• Fiches de poste et modèles de courriers</li>
              <li>• Notes officielles (direction, CPE, secrétariat)</li>
              <li>• Réunions, conseils de classe, comptes rendus et convocations</li>
              <li>• Messages Pronote / ENT simples et lisibles</li>
              <li>• Documents RH, sécurité, organisation</li>
              <li>• Adaptations DYS & PAI administratives</li>
              <li>• Signalements et suivi interne</li>
              <li>• Communiqués aux parents après un événement sensible</li>
            </ul>
          </div>
        </header>

        {/* SECTIONS DE PROMPTS */}
        {ADMIN_PROMPT_SECTIONS.map((section) => (
          <section
            key={section.id}
            className="space-y-5 rounded-2xl bg-slate-900/40 border border-slate-800 p-6"
          >
            <h2 className="text-xl font-semibold text-slate-50">
              {section.title}
            </h2>
            <p className="text-xs text-slate-300">{section.description}</p>

            <div className="space-y-4">
              {section.prompts.map((prompt) => {
                const accentClasses = getAccentClasses(prompt.accent);
                return (
                  <div
                    key={prompt.id}
                    className={`rounded-xl bg-slate-900 border ${accentClasses.border} p-4 space-y-2`}
                  >
                    <h3
                      className={`text-sm font-semibold ${accentClasses.title}`}
                    >
                      {prompt.title}
                    </h3>
                    {prompt.subtitle && (
                      <p className="text-xs text-slate-300">
                        {prompt.subtitle}
                      </p>
                    )}

                    <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
                      {prompt.body}
                    </pre>

                    <button
                      onClick={() => handleCopy(prompt.id, prompt.body)}
                      className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
                    >
                      {copied === prompt.id ? "✔ Copié !" : "📋 Copier"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}



