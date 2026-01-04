// components/AdminLogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <button
      onClick={logout}
      className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
    >
      Déconnexion
    </button>
  );
}

