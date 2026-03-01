// app/api/optimiseur/premium/complete/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/premiumSessionStore";

/** ✅ Retire tout ancien bloc Premium pour éviter l’empilement */
function stripPremiumBlock(input: string) {
  const s = String(input || "").replace(/^\uFEFF/, "");
  return s
    .replace(/\n?===\s*PRÉCISIONS\s*\(Valeria Premium\)\s*===([\s\S]*)$/i, "")
    .trim();
}

/** ✅ Format “champ: valeur” (on garde seulement la réponse) */
function formatPremiumFields(session: any) {
  const answers = session?.answers || {};
  const questions = session?.questions || [];

  // On utilise le "gap" comme clé de champ lisible
  const byGap: Record<string, string> = {};
  for (const q of questions) {
    const a = String(answers[q.id] ?? "").trim();
    if (a) byGap[String(q.gap || q.id)] = a;
  }

  const lines: string[] = [];
  if (byGap.clarity) lines.push(`- Niveau / thème / production : ${byGap.clarity}`);
  if (byGap.context) lines.push(`- Durée / matériel / modalité : ${byGap.context}`);
  if (byGap.compliance) lines.push(`- Cadre / garde-fous : ${byGap.compliance}`);
  if (byGap.structure) lines.push(`- Structure attendue : ${byGap.structure}`);
  if (byGap.robustness) lines.push(`- Critères mesurables : ${byGap.robustness}`);

  // fallback si jamais gap absent
  if (!lines.length) {
    for (const q of questions) {
      const a = String(answers[q.id] ?? "").trim();
      if (a) lines.push(`- ${q.gap || q.id} : ${a}`);
    }
  }

  return lines;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const sessionId = body?.sessionId;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId manquant." }, { status: 400 });
    }

    const session = getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session introuvable." }, { status: 404 });
    }

    const basePrompt = stripPremiumBlock(session.prompt);
    const fields = formatPremiumFields(session);

    const improvedPrompt = fields.length
      ? `${basePrompt}\n\n=== PRÉCISIONS (Valeria Premium) ===\n${fields.join("\n")}`.trim()
      : basePrompt;

    deleteSession(sessionId);

    return NextResponse.json({
      improvedPrompt,
      changes: [
        "Ajout de précisions Premium (réponses uniquement) pour renforcer clarté, contexte et testabilité.",
        "Nettoyage automatique des anciens blocs Premium pour éviter l’empilement.",
      ],
      estimatedScoreAfter: 20,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erreur premium complete." },
      { status: 500 },
    );
  }
}