// app/api/photo-cours/produire/route.ts
//
// ÉTAPE 2 — à partir du cours RELU ET CORRIGÉ par le professeur.
//
// ⭐ L'image n'arrive pas jusqu'ici. Ce que reçoit cette route, c'est du texte
// que le professeur a eu sous les yeux et qu'il a validé. C'est ce qui rend la
// production défendable : si elle se trompe, ce n'est plus parce que la machine
// a mal vu.

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { promptProduction } from "@/lib/photo-cours/prompts";
import { clean, tropDAppels, verifierCompteConnecte } from "@/lib/photo-cours/auth";
import { journaliserUsage } from "@/lib/photo-cours/journal";
import { PRODUCTIONS } from "@/lib/photo-cours/types";

const MODELE = "gpt-4.1-mini";

// Frédéric, 12/08 : « on peut modifier max-tokens si tu veux ».
// 2000 (la valeur d'agent-prof) coupait une série d'exercices AVEC son corrigé
// en plein milieu. 4000 laisse passer une séance complète ; au-delà, ce n'est
// plus une fiche, c'est un chapitre que personne ne relit.
const MAX_TOKENS = 4000;

// Jumelle de nettoyerLatex() dans /api/agent-prof. ⏳ À factoriser dans
// lib/ quand la brique sera branchée pour de bon — pas avant : tant qu'on
// essaie, on ne touche pas à une route qui tourne déjà.
function nettoyerLatex(texte: string): string {
  if (!texte) return texte;
  let t = texte;
  t = t.replace(/\\frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g, "$1/$2");
  t = t.replace(/\$\$([^$]+)\$\$/g, "$1");
  t = t.replace(/\$([^$]+)\$/g, "$1");
  t = t.replace(/\\cdot/g, "·");
  t = t.replace(/\\times/g, "×");
  t = t.replace(/\\div/g, "÷");
  t = t.replace(/\\sqrt\{([^}]+)\}/g, "racine carrée de $1");
  t = t.replace(/\\left\(/g, "(");
  t = t.replace(/\\right\)/g, ")");
  return t;
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY manquant côté serveur." },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as {
      codeEtablissement?: string;
      codeUtilisateur?: string;
      texte?: string;
      type?: string;
      niveau?: string;
      notion?: string;
      precisions?: string;
      latexMode?: boolean;
    };

    const codeEtablissement = clean(body.codeEtablissement, 80);
    const codeUtilisateur = clean(body.codeUtilisateur, 80);

    const auth = await verifierCompteConnecte({
      codeEtablissement,
      codeUtilisateur,
    });
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    if (tropDAppels(`${codeEtablissement}:${codeUtilisateur}`)) {
      return NextResponse.json(
        { error: "Trop de demandes d'affilée. Reprenez dans une minute." },
        { status: 429 }
      );
    }

    const texte = clean(body.texte, 12000);
    if (!texte) {
      return NextResponse.json(
        { error: "Le cours relu est vide." },
        { status: 400 }
      );
    }

    const type = PRODUCTIONS.some((p) => p.id === body.type)
      ? (body.type as string)
      : "exercices";
    const niveau = clean(body.niveau, 40);
    const notion = clean(body.notion, 120);
    const precisions = clean(body.precisions, 600);
    const latexMode = body.latexMode === true;

    const completion = await openai.chat.completions.create({
      model: MODELE,
      temperature: 0.4,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: promptProduction(type, latexMode) },
        {
          role: "user",
          content: [
            `Niveau : ${niveau || "non précisé"}`,
            `Notion : ${notion || "non précisée"}`,
            "",
            "LE COURS DU PROFESSEUR (relu et validé par lui) :",
            "---",
            texte,
            "---",
            "",
            precisions
              ? `Ce que le professeur demande en plus :\n${precisions}`
              : "Aucune demande particulière.",
          ].join("\n"),
        },
      ],
    });

    const brut = completion.choices[0]?.message?.content?.trim() || "";
    if (!brut) {
      return NextResponse.json({ error: "Réponse vide." }, { status: 500 });
    }

    // Voir la note dans /lire : on trace l'usage, jamais le contenu.
    void journaliserUsage({
      codeEtablissement,
      codeUtilisateur,
      typeUtilisateur: auth.typeUtilisateur,
      nom: auth.nom,
      etape: "production",
      typeProduction: type,
      niveau,
      notion,
    });

    return NextResponse.json({
      output: latexMode ? brut : nettoyerLatex(brut),
    });
  } catch (error) {
    console.error("Erreur /api/photo-cours/produire :", error);
    return NextResponse.json(
      { error: "Impossible de produire ce document pour le moment." },
      { status: 500 }
    );
  }
}
