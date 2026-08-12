// app/api/photo-cours/lire/route.ts
//
// ÉTAPE 1 — la machine dit ce qu'elle a lu. Elle ne produit rien encore.
//
// ⚠️ RGPD : l'image traverse cette route et n'y reste pas. Aucun insert, aucun
// bucket, aucun log de l'image. Une photo de cahier porte une écriture, souvent
// un prénom, parfois le nom d'un établissement — on ne conserve pas ça pour le
// confort d'un cache.

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { PROMPT_LECTURE } from "@/lib/photo-cours/prompts";
import { clean, tropDAppels, verifierCompteConnecte } from "@/lib/photo-cours/auth";
import { journaliserUsage } from "@/lib/photo-cours/journal";
import type { LectureCours } from "@/lib/photo-cours/types";

const MODELE = "gpt-4.1-mini";

// La photo arrive compressée par le navigateur (voir lib/photo-cours/compresser).
// Ce plafond est la ceinture : Vercel refuse les corps de requête au-delà de
// ~4,5 Mo, et une photo de cahier bien compressée pèse 200 à 600 Ko.
const TAILLE_MAX = 4_000_000;

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
      image?: string;
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
        { error: "Trop de photos d'affilée. Reprenez dans une minute." },
        { status: 429 }
      );
    }

    const image = typeof body.image === "string" ? body.image : "";
    if (!image.startsWith("data:image/")) {
      return NextResponse.json({ error: "Photo manquante." }, { status: 400 });
    }
    if (image.length > TAILLE_MAX) {
      return NextResponse.json(
        { error: "Photo trop lourde, reprenez-la de moins près." },
        { status: 413 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: MODELE,
      // 0 : on veut la MÊME lecture à chaque fois. Rien à inventer ici.
      temperature: 0,
      max_tokens: 2000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: PROMPT_LECTURE },
        {
          role: "user",
          content: [
            { type: "text", text: "Lis ce cours." },
            // detail "high" : en "low" le modèle ne distingue pas un exposant
            // d'un facteur, ce qui est précisément ce qu'on lui demande de voir.
            { type: "image_url", image_url: { url: image, detail: "high" } },
          ],
        },
      ],
    });

    const brut = completion.choices[0]?.message?.content?.trim();
    if (!brut) {
      return NextResponse.json(
        { error: "Le lecteur n'a rien renvoyé." },
        { status: 500 }
      );
    }

    let lecture: LectureCours;
    try {
      const parsed = JSON.parse(brut) as Partial<LectureCours>;
      lecture = {
        texte: typeof parsed.texte === "string" ? parsed.texte : "",
        niveau: parsed.niveau || null,
        notion: parsed.notion || null,
        matiere: parsed.matiere || null,
        zonesIllisibles: Array.isArray(parsed.zonesIllisibles)
          ? parsed.zonesIllisibles.filter((z): z is string => typeof z === "string")
          : [],
        // Pas de confiance annoncée = pas de confiance accordée : 0 déclenche
        // l'avertissement plutôt que de laisser passer une lecture muette.
        confiance:
          typeof parsed.confiance === "number"
            ? Math.max(0, Math.min(100, Math.round(parsed.confiance)))
            : 0,
      };
    } catch {
      return NextResponse.json(
        { error: "Lecture illisible côté serveur." },
        { status: 500 }
      );
    }

    if (!lecture.texte) {
      return NextResponse.json(
        { error: "Aucun texte n'a pu être lu sur cette photo." },
        { status: 422 }
      );
    }

    // « Qui l'utilise », visible dans l'admin (Frédéric, 12/08).
    // ⛔ Ni la photo ni le cours lu ne partent en base — voir journal.ts.
    // Pas de `await` : la statistique ne fait pas attendre le professeur.
    void journaliserUsage({
      codeEtablissement,
      codeUtilisateur,
      typeUtilisateur: auth.typeUtilisateur,
      nom: auth.nom,
      etape: "lecture",
      confiance: lecture.confiance,
      niveau: lecture.niveau,
      notion: lecture.notion,
      matiere: lecture.matiere,
      zonesIllisibles: lecture.zonesIllisibles.length,
    });

    return NextResponse.json({ lecture });
  } catch (error) {
    console.error("Erreur /api/photo-cours/lire :", error);
    return NextResponse.json(
      { error: "Impossible de lire cette photo pour le moment." },
      { status: 500 }
    );
  }
}
