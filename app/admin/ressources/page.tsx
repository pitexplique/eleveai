export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import RessourcesAdminClient from "./RessourcesAdminClient";

export default async function RessourcesAdminPage() {
  const cookieStore = await cookies();
  if (!verifyAdminCookieValue(cookieStore.get("admin-auth")?.value)) {
    redirect("/admin");
  }
  return <RessourcesAdminClient />;
}
