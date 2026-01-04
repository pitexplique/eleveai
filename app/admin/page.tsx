// app/admin/page.tsx
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("admin-auth")?.value === "true";

  // ✅ Si déjà connecté, on va direct au dashboard (sinon il peut boucler)
  if (isAuthed) {
    redirect("/admin/dashboard");
  }

  // ✅ Sinon on affiche le formulaire
  return <AdminClient />;
}



