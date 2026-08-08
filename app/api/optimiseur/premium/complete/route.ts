// app/api/optimiseur/premium/complete/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { reponseNonConnecte, sessionFromRequest } from "@/lib/server/requireSession";
import { openai } from "@/lib/openai";
import { getSession, deleteSession } from "@/lib/premiumSessionStore";

/** ✅ Retire tout ancien bloc Premium pour éviter l’empilement */
function stripPremiumBlock(input: string) {
  const s = String(input || "").replace(/^\uFEFF/, "");
  return s
    .replace(/\n?===\s*PRÉCISIONS\s*\(Optimiseur Premium\)\s*===([\s\S]*)$/i, "")
    .trim();
}

function yesNoNormalize(s: string) {
  const v = (s || "").trim().toLowerCase();
  if (["oui", "yes", "ok", "d'accord", "dac"].includes(v)) return "oui";
  if (["non", "no"].includes(v)) return "non";
  return (s || "").trim();
}

/** ✅ On renvoie des champs structurés, pas un bloc append */
function premiumFields(session: any) {
  const answers = session?.answers || {};
  const questions = session?.questions || [];

  const byGap: Record<string, string> = {};
  for (const q of questions) {
    const a = String(answers[q.id] ?? "").trim();
    if (a) byGap[String(q.gap || q.id)] = a;
  }

  const fields: Array<{ key: string; value: string }> = [];
  if (byGap.clarity) fields.push({ key: "clarity", value: byGap.clarity });
  if (byGap.context) fields.push({ key: "context", value: byGap.context });
  if (byGap.compliance)
    fields.push({ key: "compliance", value: yesNoNormalize(byGap.compliance) });
  if (byGap.structure) fields.push({ key: "structure", value: byGap.structure });
  if (byGap.robustness) fields.push({ key: "robustness", value: byGap.robustness });

  // fallback (si jamais gap absent)
  if (!fields.length) {
    for (const q of questions) {
      const a = String(answers[q.id] ?? "").trim();
      if (a) fields.push({ key: String(q.gap || q.id), value: a });
    }
  }

  return fields;
}

export async function POST(req: Request) {
  try {
    if (!sessionFromRequest(req)) return reponseNonConnecte();

    const body = await req.json().catch(() => ({}));
    const sessionId = String(body?.sessionId || "").trim();

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId manquant." }, { status: 400 });
    }

    const session = getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session introuvable." }, { status: 404 });
    }

    const basePrompt = stripPremiumBlock(session.prompt);
    const fields = premiumFields(session);

    // ✅ Si rien à intégrer, on renvoie juste la base propre
    if (!fields.length) {
      deleteSession(sessionId);
      return NextResponse.json({
        improvedPrompt: basePrompt,
        changes: ["Aucune précision Premium renseignée → prompt nettoyé (sans append)."],
        estimatedScoreAfter: Number(session?.scoreReport?.score ?? 18),
      });
    }

    // ✅ Réécriture LLM : intégrer au bon endroit, sans bloc "PRÉCISIONS"
    const resp = await openai.responses.create({
      model: session.model || "gpt-4o-mini",
      temperature: 0,
      input: [
        {
          role: "system",
          content:
            "Tu es un assistant de réécriture de prompts pédagogiques.\n" +
            "But: intégrer les précisions Premium DANS le prompt (durée, modalité, garde-fous, etc.) au bon endroit.\n" +
            "Contraintes:\n" +
            "- Ne pose aucune question.\n" +
            "- N'ajoute pas de blabla.\n" +
            "- Évite les doublons (si déjà présent, harmonise).\n" +
            "- Corrige les fautes évidentes (ex: indicviduel -> individuel).\n" +
            "- Sortie: UNIQUEMENT le prompt final (pas de bloc 'PRÉCISIONS (Optimiseur Premium)').",
        },
        {
          role: "user",
          content:
            `PROMPT BASE:\n${basePrompt}\n\n` +
            `PRÉCISIONS (JSON):\n${JSON.stringify(fields, null, 2)}\n\n` +
            `CONTEXTE:\n- Public=${session.audience}\n- Type=${session.type}\n\n` +
            `RÈGLE:\n- Si compliance='oui': ajoute explicitement un garde-fou "neutralité / pas de données personnelles / cadre scolaire".\n`,
        },
      ],
    });

    const improvedPrompt = String((resp as any).output_text || "").trim();
    if (!improvedPrompt) {
      return NextResponse.json({ error: "Réécriture vide." }, { status: 500 });
    }

    deleteSession(sessionId);

    return NextResponse.json({
      improvedPrompt,
      changes: [
        "Intégration Premium directement dans le prompt (au bon endroit, sans append).",
        "Anti-doublons + corrections mineures.",
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