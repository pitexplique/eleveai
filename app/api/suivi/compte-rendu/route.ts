// Le parent connecté active ou arrête son compte rendu depuis /suivi (06/11/2026).
import { NextResponse } from "next/server";
import { adminSupabase, compteDeLaRequete } from "@/lib/server/abonnement";

export async function POST(req: Request) {
  const compte = await compteDeLaRequete(req);
  if (!compte) return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  const corps = await req.json().catch(() => ({}));
  const { error } = await adminSupabase()
    .from("abonnements")
    .update({ compte_rendu: corps.actif === true })
    .eq("user_id", compte.id);
  if (error) {
    console.error("compte rendu, réglage :", error.message);
    return NextResponse.json({ error: "Le réglage n'a pas pu être enregistré." }, { status: 500 });
  }
  return NextResponse.json({ actif: corps.actif === true });
}
