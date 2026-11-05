// L'élève crée le code qu'il donne à son parent (jeton de session élève).
import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/server/abonnement";
import { verifySessionToken } from "@/lib/server/session";
import { peutEtreRelie } from "@/lib/server/suiviParent";
import { abonnementDisponible } from "@/lib/stripe/serveur";

export const dynamic = "force-dynamic";

// Sans 0/O ni 1/I/L : un enfant le dicte, un parent le recopie.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const DUREE_JOURS = 7;

function session(req: Request) {
  const jeton = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return verifySessionToken(jeton);
}

export async function GET(req: Request) {
  const s = session(req);
  if (!s) return NextResponse.json({ error: "Session expirée." }, { status: 401 });
  if (!abonnementDisponible() || !peutEtreRelie(s.code_etablissement)) {
    return NextResponse.json({ disponible: false });
  }
  const admin = adminSupabase();
  const [code, parents] = await Promise.all([
    admin
      .from("codes_parent")
      .select("code, expire_le")
      .eq("code_etablissement", s.code_etablissement)
      .eq("code_utilisateur", s.code_utilisateur)
      .gt("expire_le", new Date().toISOString())
      .maybeSingle(),
    admin
      .from("enfants_parent")
      .select("parent_user_id", { count: "exact", head: true })
      .eq("code_etablissement", s.code_etablissement)
      .eq("code_utilisateur", s.code_utilisateur),
  ]);
  return NextResponse.json({
    disponible: true,
    code: code.data?.code ?? null,
    expire: code.data?.expire_le ?? null,
    parents: parents.count ?? 0,
  });
}

export async function POST(req: Request) {
  const s = session(req);
  if (!s) return NextResponse.json({ error: "Session expirée." }, { status: 401 });
  if (!abonnementDisponible() || !peutEtreRelie(s.code_etablissement)) {
    return NextResponse.json({ error: "Non disponible pour ce compte." }, { status: 403 });
  }
  const code = Array.from({ length: 8 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  const expire = new Date(Date.now() + DUREE_JOURS * 86400000).toISOString();
  const { error } = await adminSupabase().from("codes_parent").upsert(
    { code, code_etablissement: s.code_etablissement, code_utilisateur: s.code_utilisateur, expire_le: expire },
    { onConflict: "code_etablissement,code_utilisateur" },
  );
  if (error) {
    console.error("codes_parent :", error.message);
    return NextResponse.json({ error: "Le code n'a pas pu être créé." }, { status: 500 });
  }
  return NextResponse.json({ code, expire });
}
