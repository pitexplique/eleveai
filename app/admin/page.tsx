// app/admin/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import AdminContactMessagesClient from "./dashboard/AdminContactMessagesClient";


export default async function AdminDashboardPage() {
  const cookieStore = await cookies(); // ✅ pas de await
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
            <p className="text-sm text-slate-400">Accès direction – supervision EleveAI</p>
          </div>
          <AdminLogoutButton />
        </header>

        {/* ✅ Messages contact */}
        <AdminContactMessagesClient />

        {/* (tu peux garder ton bloc Vue générale après) */}
      </div>
    </main>
  );
}


