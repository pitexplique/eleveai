// app/admin/beta-testeurs/page.tsx — les candidatures à la bêta.
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import AdminBetaClient from "./AdminBetaClient";

export default async function AdminBetaPage() {
  const cookieStore = await cookies();
  const isAuthed = verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);

  if (!isAuthed) {
    redirect("/admin");
  }

  return <AdminBetaClient />;
}
