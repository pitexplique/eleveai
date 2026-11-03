// app/admin/aventure/page.tsx — les profs qui rejoignent l'aventure.
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import AdminAventureClient from "./AdminAventureClient";

export default async function AdminAventurePage() {
  const cookieStore = await cookies();
  const isAuthed = verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);

  if (!isAuthed) {
    redirect("/admin");
  }

  return <AdminAventureClient />;
}
