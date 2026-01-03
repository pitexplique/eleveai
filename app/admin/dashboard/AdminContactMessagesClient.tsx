"use client";

import { useEffect, useMemo, useState } from "react";

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
};

type SortOrder = "newest" | "oldest";
type StatusFilter = "all" | "new" | "in_progress" | "done";
type RoleFilter = "all" | ContactMessage["role"];

export default function AdminContactMessagesClient() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ tri + filtres (simples)
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

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

  useEffect(() => {
    loadMessages();
  }, []);

  // ✅ options rôle dynamiques
  const roleOptions = useMemo(() => {
    const set = new Set<string>();
    for (const m of messages) set.add(m.role);
    return ["all", ...Array.from(set).sort()] as RoleFilter[];
  }, [messages]);

  // ✅ messages affichés = filtres + tri
  const visibleMessages = useMemo(() => {
    let list = [...messages];

    if (statusFilter !== "all") {
      list = list.filter((m) => m.status === statusFilter);
    }

    if (roleFilter !== "all") {
      list = list.filter((m) => m.role === roleFilter);
    }

    list.sort((a, b) => {
      const ta = new Date(a.created_at).getTime();
      const tb = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? tb - ta : ta - tb;
    });

    return list;
  }, [messages, sortOrder, statusFilter, roleFilter]);

  if (loading) return <p className="text-slate-400">Chargement des messages…</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">📩 Messages de contact</h2>

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
            className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-emerald-300">
                {m.role}
                {m.name && ` — ${m.name}`}
              </div>
              <div className="text-xs text-slate-400">
                {new Date(m.created_at).toLocaleString()}
              </div>
            </div>

            {m.org && <p className="text-xs text-slate-400">🏫 {m.org}</p>}
            {m.email && <p className="text-xs text-slate-300">✉️ {m.email}</p>}

            <p className="text-sm text-slate-200 whitespace-pre-wrap">{m.message}</p>

            <div className="flex items-center gap-2 pt-2">
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
