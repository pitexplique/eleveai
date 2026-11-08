// Ce que vaut un code, AVANT de se connecter (08/11/2026) : la personne sait tout de suite
// si elle a mal recopié, et ce que le code lui donnera. Rien n'est consommé ici.
import { NextResponse } from "next/server";
import { normaliserCode, signeAmbigu } from "@/lib/codes-abonnement";
import { adminSupabase } from "@/lib/server/abonnement";
import { essaiLocal, lireCode } from "@/lib/server/codes-abonnement";
import { clientIp, rateLimitOk } from "@/lib/server/rateLimit";

export async function POST(req: Request) {
  const corps = await req.json().catch(() => ({}));
  const saisie = typeof corps.code === "string" ? corps.code.slice(0, 40) : "";
  const code = normaliserCode(saisie);
  if (!code) {
    const signe = signeAmbigu(saisie);
    return NextResponse.json({
      etat: "forme",
      message: signe
        ? `Le signe « ${signe} » n'existe dans aucun code : ni 0, ni O, ni 1, ni I, ni L. Vérifiez ce signe sur votre carte ou votre courriel.`
        : "Un code s'écrit comme MARGO-7KQ4-X2PD : 8 lettres et chiffres après MARGO.",
    });
  }
  // Contre qui essaierait des codes au hasard : 20 essais par quart d'heure et par adresse.
  if (!essaiLocal() && !(await rateLimitOk(adminSupabase(), `code-verifier:${clientIp(req)}`, 20, 900))) {
    return NextResponse.json({ etat: "trop", message: "Trop d'essais. Réessayez dans un quart d'heure." }, { status: 429 });
  }
  try {
    const info = await lireCode(code);
    if (!info) return NextResponse.json({ etat: "inconnu", code, essai: essaiLocal() });
    return NextResponse.json({ etat: info.utilise ? "utilise" : "valide", code, ...info, essai: essaiLocal() });
  } catch (e) {
    console.error("/api/code/verifier :", (e as Error).message);
    return NextResponse.json({ etat: "panne", message: "Le code n'a pas pu être vérifié. Réessayez dans un instant." }, { status: 500 });
  }
}
