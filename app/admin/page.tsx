// app/admin/page.tsx
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);

  // ✅ Si déjà connecté, on va direct au dashboard (sinon il peut boucler)
  if (isAuthed) {
    redirect("/admin/dashboard");
  }

  // ✅ Sinon on affiche le formulaire
  return <AdminClient />;
}



