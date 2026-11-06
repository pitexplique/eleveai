// La vue du parent : ses enfants reliés et leurs rapports (05/11/2026).
// ⛔ Il faut un abonnement en cours, et le code donné par l'enfant pour relier un compte.
import { NextResponse } from "next/server";
import { accesEnCours, adminSupabase, compteDeLaRequete, lireAbonnement } from "@/lib/server/abonnement";
import { clientIp, rateLimitOk } from "@/lib/server/rateLimit";
import { ENFANTS_MAX, peutEtreRelie, rapportDeLEnfant } from "@/lib/server/suiviParent";

export const dynamic = "force-dynamic";

/** Le parent a payé ? `estEnseignant` n'ouvre que la vidéothèque, pas cette vue. */
async function parentAbonne(req: Request) {
  const compte = await compteDeLaRequete(req);
  if (!compte) return { erreur: NextResponse.json({ error: "Connexion requise." }, { status: 401 }) };
  if (!accesEnCours(await lireAbonnement(compte.id))) {
    return { erreur: NextResponse.json({ error: "Abonnement requis.", abonnement: false }, { status: 402 }) };
  }
  return { compte };
}

export async function GET(req: Request) {
  const { compte, erreur } = await parentAbonne(req);
  if (erreur) return erreur;
  const admin = adminSupabase();
  const { data, error } = await admin
    .from("enfants_parent")
    .select("code_etablissement, code_utilisateur")
    .eq("parent_user_id", compte.id)
    .order("created_at");
  if (error) {
    console.error("enfants_parent :", error.message);
    return NextResponse.json({ error: "Lecture impossible." }, { status: 500 });
  }
  const enfants = await Promise.all(
    (data ?? []).map(async (e) => ({
      cle: e.code_utilisateur as string,
      rapport: await rapportDeLEnfant(admin, e.code_etablissement, e.code_utilisateur),
    })),
  );
  const ligne = await lireAbonnement(compte.id);
  return NextResponse.json({ enfants, compteRendu: ligne?.compte_rendu ?? true });
}

export async function POST(req: Request) {
  const { compte, erreur } = await parentAbonne(req);
  if (erreur) return erreur;
  const admin = adminSupabase();
  // Le code se devine en essayant : on limite les essais.
  if (!(await rateLimitOk(admin, `suivi-code:${compte.id}:${clientIp(req)}`, 10, 600))) {
    return NextResponse.json({ error: "Trop d'essais : réessayez dans quelques minutes." }, { status: 429 });
  }
  const corps = await req.json().catch(() => ({}));
  const code = String(corps.code ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const { data: ligne } = await admin
    .from("codes_parent")
    .select("code_etablissement, code_utilisateur")
    .eq("code", code)
    .gt("expire_le", new Date().toISOString())
    .maybeSingle();
  if (!ligne || !peutEtreRelie(ligne.code_etablissement)) {
    return NextResponse.json({ error: "Ce code n'existe pas ou a expiré. Demandez-en un nouveau à votre enfant." }, { status: 404 });
  }
  const { count } = await admin
    .from("enfants_parent")
    .select("code_utilisateur", { count: "exact", head: true })
    .eq("parent_user_id", compte.id);
  if ((count ?? 0) >= ENFANTS_MAX) {
    return NextResponse.json({ error: `Vous pouvez relier ${ENFANTS_MAX} enfants au plus.` }, { status: 400 });
  }
  const { error } = await admin.from("enfants_parent").upsert({
    parent_user_id: compte.id,
    code_etablissement: ligne.code_etablissement,
    code_utilisateur: ligne.code_utilisateur,
  });
  if (error) {
    console.error("enfants_parent :", error.message);
    return NextResponse.json({ error: "Le lien n'a pas pu être créé." }, { status: 500 });
  }
  // Un code ne sert qu'une fois.
  await admin.from("codes_parent").delete().eq("code", code);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const compte = await compteDeLaRequete(req);
  if (!compte) return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  const corps = await req.json().catch(() => ({}));
  await adminSupabase()
    .from("enfants_parent")
    .delete()
    .eq("parent_user_id", compte.id)
    .eq("code_utilisateur", String(corps.cle ?? ""));
  return NextResponse.json({ ok: true });
}
