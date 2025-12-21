"use client";

export function AdminLogoutButton() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/admin-logout", { method: "POST" });
        window.location.href = "/admin";
      }}
      className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-900"
    >
      Déconnexion
    </button>
  );
}
