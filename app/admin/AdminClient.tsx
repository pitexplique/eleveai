// app/admin/AdminClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminClient() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh(); // ✅ important : force Next à relire les cookies côté serveur
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200">
      <div className="w-full max-w-sm bg-slate-900 p-6 rounded-xl border border-slate-700 space-y-4">
        <h1 className="text-xl font-bold text-center">🔐 Accès Direction</h1>

        <input
          type="password"
          placeholder="Mot de passe admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 focus:outline-none"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          Entrer
        </button>

        <p className="text-xs text-slate-400 text-center">Accès réservé – EleveAI</p>
      </div>
    </main>
  );
}
