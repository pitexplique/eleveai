// app/admin/dashboard/page.tsx
// redeploy: refonte dashboard admin + boucle réponses prof↔élève (2026-06-22)
export const dynamic = "force-dynamic";

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import AdminStatsClient from "./AdminStatsClient";
import AdminContactMessagesClient from "./AdminContactMessagesClient";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const isAuthed = verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);

  if (!isAuthed) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <p className="text-sm text-slate-400">
              Accès direction – supervision EleveAI
            </p>
          </div>
          <AdminLogoutButton />
        </header>

        {/* Statistiques agrégées + sélecteur de périmètre */}
        <AdminStatsClient />

        <Link
          href="/admin/retours"
          className="block rounded-xl border border-emerald-700 bg-emerald-900/30 p-4 transition hover:bg-emerald-900/50"
        >
          <p className="font-bold text-emerald-300">📨 Tous les retours élèves</p>
          <p className="mt-1 text-sm text-slate-400">
            Avis (étoiles), bugs et idées envoyés depuis la page « Votre avis » —
            avec export CSV.
          </p>
        </Link>

        <AdminContactMessagesClient />
      </div>
    </main>
  );
}


