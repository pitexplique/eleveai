"use client";

import Link from "next/link";
import { useState } from "react";

const EMAIL = "contact@eleveai.fr";
const WHATSAPP_DISPLAY = "+262 06 92 74 29 58";
const WHATSAPP_WA_ME = "https://wa.me/262692742958";
const WHATSAPP_COPY = "+262692742958";

export default function ContactClient() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

  async function copy(text: string, kind: "email" | "whatsapp") {
    try {
      await navigator.clipboard.writeText(text);
      if (kind === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedWhatsapp(true);
        setTimeout(() => setCopiedWhatsapp(false), 2000);
      }
    } catch (e) {
      console.error(e);
      alert("Impossible de copier automatiquement. Copie manuellement.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* En-tête */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>📩</span>
            <span>Contact EleveAI</span>
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Nous contacter
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-xl">
            Cette page permet aux parents, enseignants et partenaires de prendre
            contact à propos du projet EleveAI : questions, retours, idées
            d’amélioration ou propositions de collaboration.
          </p>
        </header>

        {/* Bloc parents / élèves */}
        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">
            Pour les parents et les élèves
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Vous pouvez nous écrire si :
          </p>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• vous avez une question sur l’utilisation d’EleveAI ;</li>
            <li>• vous avez constaté un contenu inadapté ou une erreur ;</li>
            <li>• vous souhaitez proposer une amélioration ou une idée.</li>
          </ul>
        </section>

        {/* Bloc enseignants / institutions */}
        <section className="bg-white/95 border border-emerald-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-emerald-700">
            Pour les enseignants et les institutions
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            EleveAI est pensé comme un projet éducatif local, en dialogue avec les
            pratiques de classe et les cadres institutionnels.
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            N’hésitez pas à nous contacter pour :
          </p>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• échanger sur l’usage de l’IA en classe ;</li>
            <li>• proposer une expérimentation dans un établissement ;</li>
            <li>• demander une présentation du projet ;</li>
            <li>• discuter d’un partenariat ou d’un soutien.</li>
          </ul>
        </section>

        {/* Coordonnées */}
        <section className="bg-white/95 border border-sky-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">
            Comment nous contacter ?
          </h2>

          {/* Email */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-gray-700">📩 Par e-mail :</p>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="font-semibold text-[#0047B6] underline underline-offset-2"
              >
                {EMAIL}
              </a>

              <button
                type="button"
                onClick={() => copy(EMAIL, "email")}
                className={[
                  "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  copiedEmail
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200",
                ].join(" ")}
              >
                {copiedEmail ? "✅ Copié" : "📋 Copier"}
              </button>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <p className="text-sm sm:text-base text-gray-700">
              📱 WhatsApp (Réunion) :
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={WHATSAPP_WA_ME}
                className="font-semibold text-[#0047B6] underline underline-offset-2 hover:text-[#003894]"
                target="_blank"
                rel="noreferrer"
              >
                {WHATSAPP_DISPLAY}
              </a>

              <button
                type="button"
                onClick={() => copy(WHATSAPP_COPY, "whatsapp")}
                className={[
                  "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  copiedWhatsapp
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200",
                ].join(" ")}
              >
                {copiedWhatsapp ? "✅ Copié" : "📋 Copier"}
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Disponible pour les messages écrits (parents, professeurs,
              partenaires). Pas de communication directe avec les élèves pour des
              raisons de sécurité.
            </p>
          </div>

          <p className="text-xs text-gray-500 pt-3">
            Merci de ne pas envoyer d’informations personnelles sensibles
            (adresse complète, identité complète d’un enfant, etc.). Les échanges
            restent centrés sur la pédagogie, la technique et le projet EleveAI.
          </p>
        </section>

        {/* Retour */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0047B6] text-white text-sm font-semibold hover:bg-[#003894]"
          >
            ← Retour à l’accueil EleveAI
          </Link>
        </div>
      </div>
    </main>
  );
}
