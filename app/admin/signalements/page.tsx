// app/admin/signalements/page.tsx — ce que les gens ont trouvé cassé.
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import AdminSignalementsClient from "./AdminSignalementsClient";

export default async function AdminSignalementsPage() {
  const cookieStore = await cookies();
  const isAuthed = verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);

  if (!isAuthed) {
    redirect("/admin");
  }

  return <AdminSignalementsClient />;
}
