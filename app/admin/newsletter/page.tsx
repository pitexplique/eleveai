// app/admin/newsletter/page.tsx
// Composer et envoyer la newsletter aux comptes ayant consenti (accepte_newsletter).
export const dynamic = "force-dynamic";

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import NewsletterClient from "./NewsletterClient";

export default async function AdminNewsletterPage() {
  const cookieStore = await cookies();
  const isAuthed = verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);

  if (!isAuthed) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">📣 Newsletter</h1>
            <p className="text-sm text-slate-400">
              Envoyer les nouveautés aux comptes qui ont accepté.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              ← Dashboard
            </Link>
            <AdminLogoutButton />
          </div>
        </header>

        <NewsletterClient />
      </div>
    </main>
  );
}
