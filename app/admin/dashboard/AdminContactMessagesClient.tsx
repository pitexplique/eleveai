// app/admin/dashboard/AdminContactMessagesClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { prenomCourt } from "@/lib/prenom";

type ContactMessage = {
  id: number;
  created_at: string;
  role: string;
  name: string | null;
  org: string | null;
  email: string | null;
  message: string;
  status: string;
  admin_notes: string | null;
  source: string | null;
  reponse: string | null;
  reponse_at: string | null;
  suspect_ia?: boolean;
  raison_ia?: string | null;
};

type SortOrder = "newest" | "oldest";
type StatusFilter = "all" | "new" | "in_progress" | "done";
type RoleFilter = "all" | ContactMessage["role"];
type SourceFilter = "all" | string;

// Libellés lisibles pour les sources connues (sinon on affiche la valeur brute).
const SOURCE_LABELS: Record<string, string> = {
  "eleve-message": "👩‍🎓 Messages d'élèves",
  contact: "Site (contact)",
};

function sourceLabel(source: string | null) {
  if (!source) return "—";
  return SOURCE_LABELS[source] ?? source;
}

export default function AdminContactMessagesClient() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ tri + filtres (simples)
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");

  async function loadMessages() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/admin/contact-messages");
      if (!res.ok) throw new Error("Erreur chargement messages");

      const data = await res.json();
      setMessages(Array.isArray(data) ? data : data?.data || []);
    } catch (e: any) {
      setError(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    await fetch("/api/admin/contact-messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadMessages();
  }

  // Brouillons de réponse, indexés par id de message.
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savingReply, setSavingReply] = useState<number | null>(null);

  async function saveReply(id: number, reponse: string) {
    setSavingReply(id);
    await fetch("/api/admin/contact-messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, reponse }),
    });
    await loadMessages();
    setSavingReply(null);
  }

  async function deleteMessage(id: number) {
    if (!confirm("Supprimer définitivement ce message ?")) return;
    // Retrait optimiste immédiat, puis suppression côté serveur.
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await fetch("/api/admin/contact-messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadMessages();
  }

  useEffect(() => {
    loadMessages();
  }, []);

  // ✅ options rôle dynamiques
  const roleOptions = useMemo(() => {
    const set = new Set<string>();
    for (const m of messages) set.add(m.role);
    return ["all", ...Array.from(set).sort()] as RoleFilter[];
  }, [messages]);

  // ✅ options source dynamiques (eleve-message, contact…)
  const sourceOptions = useMemo(() => {
    const set = new Set<string>();
    for (const m of messages) if (m.source) set.add(m.source);
    return ["all", ...Array.from(set).sort()] as SourceFilter[];
  }, [messages]);

  // Nombre de messages d'élèves non traités (pour le raccourci).
  const nbElevesNew = useMemo(
    () =>
      messages.filter((m) => m.source === "eleve-message" && m.status === "new")
        .length,
    [messages]
  );

  // ✅ messages affichés = filtres + tri
  const visibleMessages = useMemo(() => {
    let list = [...messages];

    if (statusFilter !== "all") {
      list = list.filter((m) => m.status === statusFilter);
    }

    if (roleFilter !== "all") {
      list = list.filter((m) => m.role === roleFilter);
    }

    if (sourceFilter !== "all") {
      list = list.filter((m) => m.source === sourceFilter);
    }

    list.sort((a, b) => {
      const ta = new Date(a.created_at).getTime();
      const tb = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? tb - ta : ta - tb;
    });

    return list;
  }, [messages, sortOrder, statusFilter, roleFilter, sourceFilter]);

  if (loading) return <p className="text-slate-400">Chargement des messages…</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">📩 Messages de contact</h2>
          <button
            type="button"
            onClick={() =>
              setSourceFilter((s) =>
                s === "eleve-message" ? "all" : "eleve-message"
              )
            }
            className={[
              "rounded-full px-3 py-1.5 text-xs font-bold transition",
              sourceFilter === "eleve-message"
                ? "bg-amber-500 text-white"
                : "bg-amber-500/15 text-amber-300 hover:bg-amber-500/25",
            ].join(" ")}
          >
            👩‍🎓 Messages d&apos;élèves
            {nbElevesNew > 0 ? (
              <span className="ml-1.5 rounded-full bg-pink-500 px-1.5 py-0.5 text-[10px] font-black text-white">
                {nbElevesNew}
              </span>
            ) : null}
          </button>
        </div>

        {/* ✅ barre tri/filtre ultra simple */}
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
          >
            <option value="all">Tous statuts</option>
            <option value="new">new</option>
            <option value="in_progress">in_progress</option>
            <option value="done">done</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
            className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
          >
            {roleOptions.map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "Tous rôles" : r}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as SourceFilter)}
            className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
          >
            {sourceOptions.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "Toutes sources" : sourceLabel(s)}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
          >
            <option value="newest">Plus récents</option>
            <option value="oldest">Plus anciens</option>
          </select>

          <button
            type="button"
            onClick={loadMessages}
            className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
          >
            ↻ Actualiser
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Affichés : <span className="text-slate-200 font-semibold">{visibleMessages.length}</span> /{" "}
        {messages.length}
      </p>

      {visibleMessages.length === 0 && (
        <p className="text-slate-400 text-sm">Aucun message avec ces filtres.</p>
      )}

      <div className="space-y-3">
        {visibleMessages.map((m) => (
          <div
            key={m.id}
            className={[
              "rounded-xl border p-4 space-y-2",
              m.source === "eleve-message"
                ? "border-amber-500/40 bg-amber-500/5"
                : "border-slate-800 bg-slate-950/50",
            ].join(" ")}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {/* Prénom seul, jamais le nom de famille (prenomCourt : « NOM Prénom »
                    → « Prénom »). Règle RGPD du site. */}
                <span className="text-sm font-semibold text-emerald-300">
                  {m.role}
                  {m.name ? ` — ${prenomCourt(m.name)}` : ""}
                </span>
                {m.source === "eleve-message" ? (
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    👩‍🎓 Élève
                  </span>
                ) : null}
                {m.suspect_ia ? (
                  <span
                    title={m.raison_ia ?? "Ressemble à un copier-collé d'IA"}
                    className="rounded-full bg-fuchsia-500/20 px-2 py-0.5 text-[10px] font-black text-fuchsia-300"
                  >
                    🤖 IA probable
                  </span>
                ) : null}
              </div>
              <div className="text-xs text-slate-400">
                {new Date(m.created_at).toLocaleString()}
              </div>
            </div>

            {m.org && <p className="text-xs text-slate-400">🏫 {m.org}</p>}
            {m.email && <p className="text-xs text-slate-300">✉️ {m.email}</p>}

            <p className="text-sm text-slate-200 whitespace-pre-wrap">{m.message}</p>

            {/* Réponse du prof */}
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  ✍️ Ma réponse
                </span>
                {m.reponse_at && (
                  <span className="text-[10px] font-semibold text-emerald-400">
                    envoyée le {new Date(m.reponse_at).toLocaleString()}
                  </span>
                )}
              </div>
              <textarea
                value={drafts[String(m.id)] ?? m.reponse ?? ""}
                onChange={(e) =>
                  setDrafts((d) => ({ ...d, [String(m.id)]: e.target.value }))
                }
                placeholder="Écris ta réponse à l'élève…"
                rows={2}
                className="mt-1.5 w-full resize-y rounded-md border border-slate-700 bg-slate-950/60 px-2.5 py-1.5 text-sm text-slate-100 placeholder-slate-500"
              />
              <div className="mt-1.5 flex justify-end">
                <button
                  onClick={() => saveReply(m.id, drafts[String(m.id)] ?? m.reponse ?? "")}
                  disabled={savingReply === m.id}
                  className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50"
                >
                  {savingReply === m.id ? "Enregistrement…" : "💬 Enregistrer la réponse"}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400">Statut :</span>

              {["new", "in_progress", "done"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(m.id, s)}
                  className={[
                    "px-2 py-1 text-xs rounded",
                    m.status === s
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}

              <button
                onClick={() => deleteMessage(m.id)}
                className="ml-auto rounded bg-red-500/15 px-2 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/30"
                title="Supprimer ce message"
              >
                🗑 Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
