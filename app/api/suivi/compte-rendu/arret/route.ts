// « Ne plus recevoir ce compte rendu » (06/11/2026). Sans connexion, grâce au jeton.
// ⚠️ GET ne fait qu'afficher une question : les messageries ouvrent les liens toutes
// seules pour les analyser, et n'importe quel GET désabonnerait le parent sans lui.
// POST arrête vraiment, et sert aussi au désabonnement en un clic des messageries.
import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/server/abonnement";
import { verifierJetonArret } from "@/lib/server/compteRenduJeton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function page(titre: string, corps: string, statut = 200) {
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex"/>
<title>${titre} — EleveAI</title></head>
<body style="margin:0;font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#f8fafc;color:#0f172a">
<div style="max-width:480px;margin:12vh 16px;padding:32px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;text-align:center">
<h1 style="font-size:20px;margin:0 0 12px">${titre}</h1>
${corps}
</div></body></html>`;
  return new Response(html, { status: statut, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

const INVALIDE = () =>
  page("Lien invalide", `<p style="color:#475569">Ce lien est incomplet. Vous pouvez aussi régler ce courriel depuis la page de suivi.</p>`, 400);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const u = url.searchParams.get("u") ?? "";
  const t = url.searchParams.get("t") ?? "";
  if (!verifierJetonArret(u, t)) return INVALIDE();
  const action = `/api/suivi/compte-rendu/arret?u=${encodeURIComponent(u)}&t=${encodeURIComponent(t)}`;
  return page(
    "Ne plus recevoir le compte rendu ?",
    `<p style="color:#475569">Votre abonnement ne change pas : la page de suivi reste ouverte.</p>
<form method="post" action="${action}"><button type="submit" style="background:#0369a1;color:#fff;border:0;font-weight:700;font-size:15px;padding:12px 24px;border-radius:9999px;cursor:pointer">Arrêter le courriel</button></form>`,
  );
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const u = url.searchParams.get("u") ?? "";
  if (!verifierJetonArret(u, url.searchParams.get("t") ?? "")) return INVALIDE();
  const { error } = await adminSupabase().from("abonnements").update({ compte_rendu: false }).eq("user_id", u);
  if (error) {
    console.error("compte rendu, arrêt :", error.message);
    return NextResponse.json({ error: "Réessayez dans un instant." }, { status: 500 });
  }
  return page(
    "C'est fait",
    `<p style="color:#475569">Vous ne recevrez plus ce courriel. Vous pouvez le remettre depuis <a href="/suivi" style="color:#0369a1">la page de suivi</a>.</p>`,
  );
}
