// app/contact/ContactClient.tsx
"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

const EMAIL_RECEIVER = "contact@eleveai.fr";

// WhatsApp (Réunion) — attention : numéro personnel, éviter le "trop visible"
const WHATSAPP_DISPLAY = "+262 06 92 74 29 58";
const WHATSAPP_COPY = "+262692742958";
const WHATSAPP_WA_ME = `https://wa.me/${WHATSAPP_COPY.replace("+", "")}`;

// ⛔ RIEN NE SE PROPOSE À UN ÉTABLISSEMENT DEPUIS LE 31/08/2026. Frédéric :
// « on n'a pas le droit de vendre à un établissement en tant que contractuel en
// CDI ». Ce fichier ouvrait le formulaire sur « Demande pilote établissement »
// avec le rôle « Direction / Établissement » — c'est-à-dire qu'il PROPOSAIT la
// démarche à qui n'était venu que poser une question.
// ⚠️ Le rôle « Direction / Établissement » RESTE dans la liste, et il le doit :
// un chef d'établissement a le droit d'écrire, et lui interdire de se nommer ne
// protégerait rien. Ce qui change, c'est qu'aucun choix par défaut ne l'y invite.
type Role =
  | "Professeur"
  | "Parent"
  | "Élève"
  | "Direction / Établissement"
  | "Autre";

type Topic =
  | "Question sur EleveAI"
  | "Bug"
  | "Idée d'amélioration"
  | "Partenariat / Rectorat"
  | "Autre";

type Priority = "Normal" | "Important" | "Urgent";

export default function ContactClient() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

  // Formulaire
  const [role, setRole] = useState<Role>("Professeur");
  const [topic, setTopic] = useState<Topic>("Question sur EleveAI");
  const [priority, setPriority] = useState<Priority>("Normal");

  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState(""); // reply-to optionnel
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState(""); // honeypot anti-spam
  const [source, setSource] = useState<string>("contact"); // page source (auto)

  // Envoi
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState<string | null>(null);
  const [sentErr, setSentErr] = useState<string | null>(null);

  useEffect(() => {
    // garde une trace de la page d'origine (utile en admin)
    try {
      setSource(window.location.pathname || "contact");
    } catch {
      setSource("contact");
    }
  }, []);

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
      `Sujet : ${topic}\n` +
      `Priorité : ${priority}\n` +
      (name ? `Nom : ${name}\n` : "") +
      (org ? `Établissement/Organisation : ${org}\n` : "") +
      (email ? `Email : ${email}\n` : "") +
      `\nMessage : ${message || "(décris ici ta demande)"}`;

    return `${WHATSAPP_WA_ME}?text=${encodeURIComponent(txt)}`;
  }, [role, topic, priority, name, org, email, message]);

  async function submit() {
    setSentOk(null);
    setSentErr(null);

    // honeypot rempli => bot
    if (hp.trim()) {
      setSentErr("Envoi bloqué (anti-spam).");
      return;
    }

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
          topic,
          priority,
          name,
          org,
          email,
          message,
          source,
          hp, // honeypot anti-spam
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Erreur lors de l'envoi.");

      setSentOk("Message envoyé ✅ Merci !");
      setRole("Professeur");
      setTopic("Question sur EleveAI");
      setPriority("Normal");
      setName("");
      setOrg("");
      setEmail("");
      setMessage("");
      setHp("");
      // source on garde
    } catch (e: any) {
      setSentErr(e?.message || "Erreur lors de l'envoi.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-200">
              📩 Contact EleveAI
            </span>
            {/* ⛔ « 🏫 Pilote établissements » retiré le 31/08/2026. Frédéric :
                « on n'a pas le droit de vendre à un établissement en tant que
                contractuel en CDI ». Une pastille qui annonce un pilote
                établissement EST une proposition, même sans prix affiché. */}
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 font-semibold text-slate-200">
              🏝️ La Réunion
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[3fr,2fr] items-start">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Nous contacter
                <span className="block text-emerald-300">Une question, un bug, une idée…</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Un professeur qui veut tester la plateforme avec sa classe ? Un parent avec une
                question ? Un élève bloqué sur un exercice ? Écrivez-nous.
              </p>

              {/* ⛔ Le bouton « 🏫 Offre établissements » menait à /espace-ecoles,
                  supprimée le 31/08/2026 : il n'y a pas d'offre établissement. */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href="/accueil"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold hover:bg-slate-800"
                >
                  ← Retour à l'accueil
                </Link>
              </div>
            </div>

            {/* 7 secondes : rassurer */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-900/10 p-4">
                <p className="text-sm font-semibold text-emerald-100">🔒 Règle simple</p>
                <p className="mt-1 text-xs text-emerald-50/90 leading-relaxed">
                  Pour toute demande liée aux élèves : pas d'échanges directs en privé.
                  On passe par le cadre (enseignant / parent / établissement).
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-sm font-semibold text-slate-100">🌿 Sobriété numérique</p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Si tu nous écris : donne le contexte et l'objectif. Un message précis → moins d'allers-retours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        {/* FORM */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">Envoyer un message</h2>
            <p className="text-xs text-slate-400">
              Astuce : "Contexte → objectif → ce que tu as déjà essayé → ce que tu attends".
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200">Vous êtes :</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
              >
                <option>Professeur</option>
                <option>Parent</option>
                <option>Élève</option>
                <option>Direction / Établissement</option>
                <option>Autre</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200">Sujet :</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as Topic)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
              >
                <option>Question sur EleveAI</option>
                <option>Bug</option>
                <option>Idée d'amélioration</option>
                <option>Partenariat / Rectorat</option>
                <option>Autre</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200">Priorité :</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
              >
                <option>Normal</option>
                <option>Important</option>
                <option>Urgent</option>
              </select>
              <p className="text-[11px] text-slate-500">
                "Urgent" = bug bloquant, ou classe en attente.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200">Nom (optionnel)</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
                placeholder="Votre nom"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-200">
                Établissement / organisation (optionnel)
              </label>
              <input
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
                placeholder="Nom de l'établissement / organisation"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-200">
                Votre email (optionnel, pour vous répondre)
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
                placeholder="vous@exemple.com"
                autoComplete="email"
              />
              <p className="text-[11px] text-slate-500">
                Si tu laisses vide, on répondra via la communauté si c'est pertinent.
              </p>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-200">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
                placeholder="Décrivez votre contexte et votre demande…"
              />
            </div>

            {/* honeypot caché */}
            <div className="hidden">
              <label>Ne pas remplir</label>
              <input value={hp} onChange={(e) => setHp(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={submit}
              disabled={sending}
              className={[
                "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition",
                sending ? "bg-slate-700 text-slate-300" : "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
              ].join(" ")}
            >
              {sending ? "Envoi…" : "📨 Envoyer"}
            </button>

            <a
              href={whatsappPrefilled}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold border border-emerald-500/40 bg-emerald-900/10 text-emerald-100 hover:bg-emerald-900/20"
            >
              💬 Ouvrir WhatsApp
            </a>

            {sentOk && <span className="text-sm font-semibold text-emerald-300">{sentOk}</span>}
            {sentErr && <span className="text-sm font-semibold text-red-300">{sentErr}</span>}
          </div>

          <p className="text-xs text-slate-500">
            Merci de ne pas envoyer d'informations personnelles sensibles.{" "}
            <span className="text-slate-400">
              WhatsApp : réservé aux parents, enseignants, partenaires (pas de communication directe avec les élèves).
            </span>
          </p>
        </section>

        {/* COORDONNÉES */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-100">Coordonnées</h2>

          <div className="space-y-2">
            <p className="text-sm text-slate-300">📩 E-mail</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-emerald-200">{EMAIL_RECEIVER}</span>
              <button
                type="button"
                onClick={() => copy(EMAIL_RECEIVER, "email")}
                className={[
                  "inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                  copiedEmail ? "bg-emerald-600 text-white" : "bg-slate-950/50 border border-slate-800 text-slate-200 hover:bg-slate-800",
                ].join(" ")}
              >
                {copiedEmail ? "✅ Copié" : "📋 Copier"}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Préféré pour tout ce qui demande une trace écrite.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            <p className="text-sm text-slate-300">📱 WhatsApp (Réunion)</p>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={WHATSAPP_WA_ME}
                className="font-semibold text-slate-100 underline underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                Ouvrir une conversation WhatsApp
              </a>

              <button
                type="button"
                onClick={() => copy(WHATSAPP_COPY, "whatsapp")}
                className={[
                  "inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                  copiedWhatsapp ? "bg-emerald-600 text-white" : "bg-slate-950/50 border border-slate-800 text-slate-200 hover:bg-slate-800",
                ].join(" ")}
              >
                {copiedWhatsapp ? "✅ Copié" : "📋 Copier le numéro"}
              </button>
            </div>

            <p className="text-xs text-slate-500 pt-2">
              Messages écrits (parents, professeurs, partenaires).{" "}
              <span className="text-slate-400">Pas de communication directe avec les élèves.</span>
            </p>

            <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                💡 Si tu es élève : passe par ton professeur / ton parent / la communauté.
                EleveAI est un cadre, pas un canal privé.
              </p>
            </div>

            <p className="text-[11px] text-slate-600 pt-2">
              WhatsApp affiché : {WHATSAPP_DISPLAY}
            </p>
          </div>
        </section>

        <div className="pt-2">
          <Link
            href="/accueil"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold hover:bg-slate-800"
          >
            ← Retour à l'accueil EleveAI
          </Link>
        </div>
      </div>
    </main>
  );
}

