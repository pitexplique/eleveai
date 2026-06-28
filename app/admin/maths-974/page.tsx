export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import Maths974AdminClient from "./Maths974AdminClient";

export default async function Maths974AdminPage() {
  const cookieStore = await cookies();
  if (!verifyAdminCookieValue(cookieStore.get("admin-auth")?.value)) {
    redirect("/admin");
  }
  return <Maths974AdminClient />;
}
