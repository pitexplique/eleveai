export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import JournalAdminClient from "./JournalAdminClient";

export default async function JournalAdminPage() {
  const cookieStore = await cookies();
  if (!verifyAdminCookieValue(cookieStore.get("admin-auth")?.value)) {
    redirect("/admin");
  }
  return <JournalAdminClient />;
}
