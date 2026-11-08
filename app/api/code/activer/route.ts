// Utiliser un code : l'accès s'ouvre pour sa durée (08/11/2026). Un code ne sert qu'une fois.
// ⛔ Indépendant de VENTE.ouverte : Ulule a déjà encaissé, on ne vend rien ici.
import { NextResponse } from "next/server";
import { normaliserCode } from "@/lib/codes-abonnement";
import { adminSupabase, compteDeLaRequete } from "@/lib/server/abonnement";
import { compteEssai, essaiLocal, utiliserCode } from "@/lib/server/codes-abonnement";
import { rateLimitOk } from "@/lib/server/rateLimit";

export async function POST(req: Request) {
  const compte = compteEssai(req) ?? (await compteDeLaRequete(req));
  if (!compte) return NextResponse.json({ resultat: "connexion", error: "Connexion requise." }, { status: 401 });

  const corps = await req.json().catch(() => ({}));
  const code = typeof corps.code === "string" ? normaliserCode(corps.code.slice(0, 40)) : null;
  if (!code) return NextResponse.json({ resultat: "inconnu" }, { status: 404 });

  if (!essaiLocal() && !(await rateLimitOk(adminSupabase(), `code-activer:${compte.id}`, 10, 900))) {
    return NextResponse.json({ resultat: "trop" }, { status: 429 });
  }
  try {
    const r = await utiliserCode(code, compte);
    return NextResponse.json(r, { status: r.resultat === "inconnu" ? 404 : r.resultat === "deja_utilise" ? 409 : 200 });
  } catch (e) {
    console.error("/api/code/activer :", (e as Error).message);
    return NextResponse.json({ resultat: "panne" }, { status: 500 });
  }
}
