// app/admin/dashboard/page.tsx
// redeploy: refonte dashboard admin + boucle réponses prof↔élève (2026-06-22)
export const dynamic = "force-dynamic";

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import AdminStatsClient from "./AdminStatsClient";
import AdminCallsClient from "./AdminCallsClient";
import AdminContactMessagesClient from "./AdminContactMessagesClient";
import MaintenanceChecklist from "./MaintenanceChecklist";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const isAuthed = verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);

  if (!isAuthed) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200 p-6">
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

        {/* Checklist de maintenance : la routine quotidienne / hebdo à tenir. */}
        <MaintenanceChecklist />

        {/* Statistiques agrégées + sélecteur de périmètre */}
        <AdminStatsClient />

        {/* Inscriptions aux calls « En direct » (lib/calls.ts + call_messages) */}
        <AdminCallsClient />

        <Link
          href="/admin/journal"
          className="block rounded-xl border border-amber-700 bg-amber-900/30 p-4 transition hover:bg-amber-900/50"
        >
          <p className="font-bold text-amber-300">🗞️ La régie du rédacteur en chef</p>
          <p className="mt-1 text-sm text-slate-400">
            La Une du journal (le carrousel de l&apos;accueil) : ajouter, masquer,
            réordonner les slides — publié immédiatement.
          </p>
        </Link>

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

        <Link
          href="/admin/newsletter"
          className="block rounded-xl border border-teal-700 bg-teal-900/30 p-4 transition hover:bg-teal-900/50"
        >
          <p className="font-bold text-teal-300">📣 Newsletter</p>
          <p className="mt-1 text-sm text-slate-400">
            Composer et envoyer les nouveautés aux comptes qui ont consenti —
            test, envoi de masse (Resend) et export CSV.
          </p>
        </Link>

        <Link
          href="/admin/ressources"
          className="block rounded-xl border border-rose-700 bg-rose-900/30 p-4 transition hover:bg-rose-900/50"
        >
          <p className="font-bold text-rose-300">🎬 Vidéos par notion</p>
          <p className="mt-1 text-sm text-slate-400">
            Attacher des vidéos YouTube aux notions du coach — elles s&apos;affichent
            en badge « ▶ Vidéo » à côté de la fiche.
          </p>
        </Link>

        <AdminContactMessagesClient />
      </div>
    </main>
  );
}


