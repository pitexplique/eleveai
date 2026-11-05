import { NextResponse } from "next/server";
import { accesEnCours, compteDeLaRequete, estEnseignant, lireAbonnement } from "@/lib/server/abonnement";

export async function GET(req: Request) {
  const compte = await compteDeLaRequete(req);
  if (!compte) return NextResponse.json({ connecte: false, acces: false });
  const l = await lireAbonnement(compte.id);
  return NextResponse.json({
    connecte: true,
    enseignant: estEnseignant(compte),
    acces: estEnseignant(compte) || accesEnCours(l),
    formule: l?.formule ?? null,
    statut: l?.statut ?? "aucun",
    accesJusquau: l?.acces_jusquau ?? null,
    finProgrammee: l?.fin_programmee ?? false,
    portail: Boolean(l?.stripe_customer_id),
  });
}
