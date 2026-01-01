// app/contact/ContactClient.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const EMAIL = "contact@eleveai.fr";

// WhatsApp
const WHATSAPP_DISPLAY = "+262 06 92 74 29 58";
const WHATSAPP_COPY = "+262692742958";
const WHATSAPP_WA_ME = `https://wa.me/${WHATSAPP_COPY.replace("+", "")}`;

// Booking
const BOOKING_URL = "https://link.sparkdigitalinc.com/widget/bookings/revbrandcall";

// Communauté
const COMMUNITY_URL = "/communaute";

type Role =
  | "Parent"
  | "Élève"
  | "Enseignant"
  | "Direction/Établissement"
  | "Partenaire"
  | "Autre";

export default function ContactClient() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

  // Mini-formulaire -> mailto / whatsapp pré-rempli (sans backend)
  const [role, setRole] = useState<Role>("Parent");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");

  async function copy(text: string, kind: "email" | "whatsapp") {
    try {
      // Clipboard nécessite souvent https + contexte sécurisé
      if (!window.isSecureContext) throw new Error("Not secure context");
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

  const mailtoHref = useMemo(() => {
    const subject = `[EleveAI] Contact — ${role}${name ? ` — ${name}` : ""}`;
    const bodyLines = [
      `Rôle : ${role}`,
      name ? `Nom : ${name}` : undefined,
      org ? `Établissement / Organisation : ${org}` : undefined,
      "",
      "Message :",
      message || "(décris ici ta demande)",
      "",
      "—",
      "Note : Merci de ne pas envoyer d’informations personnelles sensibles (adresse complète, identité complète d’un enfant, etc.).",
    ].filter(Boolean) as string[];

    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;
  }, [role, name, org, message]);

  const whatsappPrefilled = useMemo(() => {
    const txt =
      `Bonjour, je vous contacte via EleveAI.\n` +
      `Rôle : ${role}\n` +
      (name ? `Nom : ${name}\n` : "") +
      (org ? `Établissement/Organisation : ${org}\n` : "") +
      `\nMessage : ${message || "(décris ici ta demande)"}`;

    return `${WHATSAPP_WA_ME}?text=${encodeURIComponent(txt)}`;
  }, [role, name, org, message]);

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
            Parents, enseignants, établissements, partenaires : cette page sert à poser une
            question, signaler un problème, proposer une amélioration ou discuter d’une
            collaboration.
          </p>

          {/* CTA rapides */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0047B6] text-white text-sm font-semibold hover:bg-[#003894] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0047B6]"
            >
              📅 Réserver un échange avec delphine ou fréderic (15-30 minutes)
            </a>

            <Link
              href={COMMUNITY_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-900 text-sm font-semibold hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              💬 Aller sur la communauté
            </Link>
          </div>

          <p className="text-xs text-gray-500">
            EleveAI accompagne la réflexion et le travail pédagogique. L’IA n’est jamais
            utilisée “à la place” de l’élève ou de l’enseignant.
          </p>
        </header>

        {/* Bloc "Quel type de demande ?" */}
        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">
            Quel type de demande ?
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Parents / Élèves</p>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>• question d’usage</li>
                <li>• contenu inadapté / erreur</li>
                <li>• suggestion d’amélioration</li>
              </ul>
            </div>

            <div className="rounded-xl border border-emerald-200 p-4">
              <p className="font-semibold text-emerald-800">
                Enseignants / Établissements
              </p>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>• échange sur l’IA en classe</li>
                <li>• expérimentation établissement</li>
                <li>• présentation / partenariat</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mini-formulaire -> mailto */}
        <section className="bg-white/95 border border-sky-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">
            Écrire un message (recommandé)
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">Vous êtes :</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <option>Parent</option>
                <option>Élève</option>
                <option>Enseignant</option>
                <option>Direction/Établissement</option>
                <option>Partenaire</option>
                <option>Autre</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">
                Nom (optionnel)
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                placeholder="Votre nom"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-800">
                Établissement / organisation (optionnel)
              </label>
              <input
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                placeholder="Nom de l’établissement / organisation"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-800">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                placeholder="Décrivez votre contexte et votre demande (pédagogie, technique, collaboration)…"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-[#0047B6] text-white hover:bg-[#003894] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0047B6]"
            >
              ✉️ Ouvrir l’e-mail préparé
            </a>

            <a
              href={whatsappPrefilled}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              💬 Ouvrir WhatsApp (message préparé)
            </a>
          </div>

          <p className="text-xs text-gray-500">
            Merci de ne pas envoyer d’informations personnelles sensibles (adresse complète,
            identité complète d’un enfant, etc.). Les échanges restent centrés sur la pédagogie,
            la technique et le projet EleveAI.
          </p>

          <p className="text-xs text-gray-500">
            WhatsApp : disponible pour les messages écrits (parents, professeurs, partenaires).
            Pas de communication directe avec les élèves.
          </p>
        </section>

        {/* Coordonnées simples (copie rapide) */}
        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">
            Coordonnées (copie rapide)
          </h2>

          {/* Email */}
          <div className="space-y-2">
            <p className="text-sm text-gray-700">📩 E-mail :</p>
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
                aria-label="Copier l'adresse email"
                className={[
                  "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  copiedEmail
                    ? "bg-emerald-600 text-white focus-visible:outline-emerald-400"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:outline-slate-400",
                ].join(" ")}
              >
                {copiedEmail ? "✅ Copié" : "📋 Copier"}
              </button>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <p className="text-sm text-gray-700">📱 WhatsApp (Réunion) :</p>

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
                aria-label="Copier le numéro WhatsApp"
                className={[
                  "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  copiedWhatsapp
                    ? "bg-emerald-600 text-white focus-visible:outline-emerald-400"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:outline-slate-400",
                ].join(" ")}
              >
                {copiedWhatsapp ? "✅ Copié" : "📋 Copier"}
              </button>
            </div>
          </div>
        </section>

        {/* Retour */}
        <div className="pt-2">
          <Link
            href="/accueil"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            ← Retour à l’accueil EleveAI
          </Link>
        </div>
      </div>
    </main>
  );
}
