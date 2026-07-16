// Désinscription newsletter (lien public inséré dans chaque email).
// GET /api/newsletter/unsubscribe?e=<email>&t=<jeton-hmac>
//   Jeton valide → passe users_email.accepte_newsletter à false, puis affiche
//   une page de confirmation. Aucune authentification (opt-out RGPD en 1 clic),
//   mais le jeton HMAC empêche de désinscrire l'adresse d'un tiers.

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyUnsubToken } from "@/lib/server/newsletterToken";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function page(title: string, message: string, ok: boolean): Response {
  const color = ok ? "#0d9488" : "#dc2626";
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex"/>
<title>${title} — EleveAI</title></head>
<body style="margin:0;font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#f8fafc;color:#0f172a">
<div style="max-width:480px;margin:12vh auto;padding:32px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;text-align:center">
<p style="font-size:28px;margin:0 0 8px">${ok ? "✅" : "⚠️"}</p>
<h1 style="font-size:20px;margin:0 0 8px;color:${color}">${title}</h1>
<p style="font-size:15px;line-height:1.6;color:#475569;margin:0 0 20px">${message}</p>
<a href="https://eleveai.fr" style="display:inline-block;background:#0d9488;color:#fff;text-decoration:none;font-weight:700;padding:10px 20px;border-radius:9999px">Retour sur eleveai.fr</a>
</div></body></html>`;
  return new Response(html, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: Request) {
  // Le paramètre cookies() force le rendu dynamique (pas de cache statique).
  await cookies();

  const url = new URL(req.url);
  const email = (url.searchParams.get("e") ?? "").trim().toLowerCase();
  const token = url.searchParams.get("t") ?? "";

  if (!email || !verifyUnsubToken(email, token)) {
    return page(
      "Lien invalide",
      "Ce lien de désinscription est invalide ou incomplet. Vous pouvez aussi gérer vos préférences depuis votre compte.",
      false
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("users_email")
    .update({ accepte_newsletter: false })
    .eq("email", email);

  if (error) {
    return page(
      "Oups",
      "Une erreur est survenue. Merci de réessayer plus tard.",
      false
    );
  }

  // L'email peut aussi être un abonné sans compte (coupon du journal) :
  // on coupe les DEUX sources. Tolérant si la table n'existe pas encore.
  try {
    await supabase
      .from("newsletter_abonnes")
      .update({ actif: false, updated_at: new Date().toISOString() })
      .eq("email", email);
  } catch {
    /* table absente : rien à couper */
  }

  return page(
    "Vous êtes désinscrit·e",
    "Vous ne recevrez plus les emails de nouveautés d'EleveAI. Vous gardez bien sûr l'accès à votre compte.",
    true
  );
}
