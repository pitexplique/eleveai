// app/contact/ContactClient.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const EMAIL_RECEIVER = "contact@eleveai.fr";

// WhatsApp
const WHATSAPP_DISPLAY = "+262 06 92 74 29 58";
const WHATSAPP_COPY = "+262692742958";
const WHATSAPP_WA_ME = `https://wa.me/${WHATSAPP_COPY.replace("+", "")}`;

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

  // Formulaire
  const [role, setRole] = useState<Role>("Parent");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState(""); // reply-to optionnel
  const [message, setMessage] = useState("");

  // Envoi
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState<string | null>(null);
  const [sentErr, setSentErr] = useState<string | null>(null);

  async function copy(text: string, kind: "email" | "whatsapp") {
    try {
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

  function validateEmailLoose(v: string) {
    const s = v.trim();
    if (!s) return true;
    if (s.length > 200) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }

  const whatsappPrefilled = useMemo(() => {
    const txt =
      `Bonjour, je vous contacte via EleveAI.\n` +
      `Rôle : ${role}\n` +
      (name ? `Nom : ${name}\n` : "") +
      (org ? `Établissement/Organisation : ${org}\n` : "") +
      (email ? `Email : ${email}\n` : "") +
      `\nMessage : ${message || "(décris ici ta demande)"}`;

    return `${WHATSAPP_WA_ME}?text=${encodeURIComponent(txt)}`;
  }, [role, name, org, email, message]);

  async function submit() {
    setSentOk(null);
    setSentErr(null);

    if (!message.trim() || message.trim().length < 10) {
      setSentErr("Écris un message un peu plus détaillé (au moins 10 caractères).");
      return;
    }
    if (!validateEmailLoose(email)) {
      setSentErr("Adresse email invalide.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name,
          org,
          email,
          message,
          hp: "", // honeypot anti-spam
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Erreur lors de l’envoi.");

      setSentOk("Message envoyé ✅ Merci !");
      setRole("Parent");
      setName("");
      setOrg("");
      setEmail("");
      setMessage("");
    } catch (e: any) {
      setSentErr(e?.message || "Erreur lors de l’envoi.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
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

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={COMMUNITY_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-900 text-sm font-semibold hover:bg-slate-200"
            >
              💬 Aller sur la communauté
            </Link>
          </div>

          <p className="text-xs text-gray-500">
            EleveAI accompagne la réflexion et le travail pédagogique. L’IA n’est jamais utilisée
            “à la place” de l’élève ou de l’enseignant.
          </p>
        </header>

        <section className="bg-white/95 border border-sky-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">Envoyer un message</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">Vous êtes :</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
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
              <label className="text-sm font-semibold text-slate-800">Nom (optionnel)</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                placeholder="Votre nom"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-800">
                Établissement / organisation (optionnel)
              </label>
              <input
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                placeholder="Nom de l’établissement / organisation"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-800">
                Votre email (optionnel, pour vous répondre)
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                placeholder="vous@exemple.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-800">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                placeholder="Décrivez votre contexte et votre demande…"
              />
            </div>

            {/* honeypot caché */}
            <div className="hidden">
              <label>Ne pas remplir</label>
              <input value="" readOnly />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={submit}
              disabled={sending}
              className={[
                "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
                sending
                  ? "bg-slate-300 text-slate-700"
                  : "bg-[#0047B6] text-white hover:bg-[#003894]",
              ].join(" ")}
            >
              {sending ? "Envoi…" : "📨 Envoyer"}
            </button>

            <a
              href={whatsappPrefilled}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              💬 Ouvrir WhatsApp
            </a>

            {sentOk && <span className="text-sm font-semibold text-emerald-700">{sentOk}</span>}
            {sentErr && <span className="text-sm font-semibold text-red-600">{sentErr}</span>}
          </div>

          <p className="text-xs text-gray-500">
            Merci de ne pas envoyer d’informations personnelles sensibles.
            WhatsApp : pas de communication directe avec les élèves.
          </p>
        </section>

        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">Coordonnées</h2>

          <div className="space-y-2">
            <p className="text-sm text-gray-700">📩 E-mail :</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#0047B6]">{EMAIL_RECEIVER}</span>
              <button
                type="button"
                onClick={() => copy(EMAIL_RECEIVER, "email")}
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

          <div className="space-y-2 pt-3 border-t border-slate-100">
            <p className="text-sm text-gray-700">📱 WhatsApp (Réunion) :</p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={WHATSAPP_WA_ME}
                className="font-semibold text-[#0047B6] underline underline-offset-2"
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

            <p className="text-xs text-gray-500 pt-2">
              Disponible pour les messages écrits (parents, professeurs, partenaires). Pas de communication
              directe avec les élèves.
            </p>
          </div>
        </section>

        <div className="pt-2">
          <Link
            href="/accueil"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
          >
            ← Retour à l’accueil EleveAI
          </Link>
        </div>
      </div>
    </main>
  );
}
