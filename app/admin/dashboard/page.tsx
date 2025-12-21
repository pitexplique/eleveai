import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("admin-auth")?.value === "true";

  if (!isAuthed) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <p className="text-sm text-slate-400">
              Accès direction – supervision EleveAI
            </p>
          </div>

          {/* 🔓 Bouton logout */}
          <AdminLogoutButton />
        </header>

        {/* 🧭 Zone métier (placeholder) */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-lg font-semibold">Vue générale</h2>
          <div className="text-sm text-slate-300">
            <p>Du texte d’intro…</p>
            <ul className="mt-2 list-disc pl-5">
              <li>indicateurs d’usage (élèves / profs / parents)</li>
              <li>accès aux tables Supabase</li>
              <li>logs, historique, IP uniques</li>
              <li>gestion presets & abonnements</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}



