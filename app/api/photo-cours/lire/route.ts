// app/api/photo-cours/lire/route.ts
//
// ÉTAPE 1 — la machine dit ce qu'elle a lu. Elle ne produit rien encore.
//
// ⚠️ RGPD : l'image traverse cette route et n'y reste pas. Aucun insert de la
// photo, aucun bucket, aucun log de son contenu. Le TEXTE relu, lui, est
// enregistré à l'étape suivante — quand la personne l'a validé (voir
// supabase/photo_cours.sql).

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { PROMPT_LECTURE } from "@/lib/photo-cours/prompts";
import { clean, tropDAppels, verifierCompteConnecte } from "@/lib/photo-cours/auth";
import { journaliserUsage } from "@/lib/photo-cours/journal";
import { publicDuCompte, type LectureCours, type Signalement } from "@/lib/photo-cours/types";

const MODELE = "gpt-4.1-mini";

// La photo arrive compressée par le navigateur (voir lib/photo-cours/compresser).
// Ce plafond est la ceinture : Vercel refuse les corps de requête au-delà de
// ~4,5 Mo, et une photo de cahier bien compressée pèse 200 à 600 Ko.
const TAILLE_MAX = 4_000_000;

/** Les signalements arrivent du modèle : on ne fait confiance à aucune forme. */
function signalements(brut: unknown): Signalement[] {
  if (!Array.isArray(brut)) return [];
  return brut
    .map((s) => {
      // Tolérant : le modèle rend parfois une chaîne au lieu de l'objet.
      if (typeof s === "string") return { ou: "", quoi: s };
      if (s && typeof s === "object") {
        const o = s as Record<string, unknown>;
        return {
          ou: typeof o.ou === "string" ? o.ou : "",
          quoi: typeof o.quoi === "string" ? o.quoi : "",
        };
      }
      return { ou: "", quoi: "" };
    })
    .filter((s) => s.quoi.trim().length > 0)
    .slice(0, 12);
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
      image?: string;
      classe?: string;
      matiere?: string;
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

    const contexte = [
      clean(body.classe, 40) && `classe de ${clean(body.classe, 40)}`,
      clean(body.matiere, 40) && `matière : ${clean(body.matiere, 40)}`,
    ]
      .filter(Boolean)
      .join(", ");

    const completion = await openai.chat.completions.create({
      model: MODELE,
      // 0 : on veut la MÊME lecture à chaque fois. Rien à inventer ici.
      temperature: 0,
      max_tokens: 2500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: PROMPT_LECTURE },
        {
          role: "user",
          content: [
            {
              type: "text",
              // ⭐ LE CONTEXTE AIDE À LIRE, PAS À JUGER (13/08). La classe et
              // la matière sont désormais demandées AVANT la photo, donc
              // disponibles ici. Savoir qu'on lit des maths de 4ᵉ lève des
              // ambiguïtés qu'aucune relecture ne rattrape : un « x » de
              // multiplication contre une inconnue, un « 1 » contre un « l ».
              // ⛔ On répète l'interdiction dans la même phrase : le contexte
              // ne doit surtout pas devenir une autorisation de compléter le
              // cours avec ce qu'on attend d'une classe de ce niveau.
              text: contexte
                ? `Lis ce cours. Contexte donné par la personne : ${contexte}. Il ne sert qu'à mieux DÉCHIFFRER l'écriture — tu ne complètes toujours rien, tu ne corriges toujours rien.`
                : "Lis ce cours.",
            },
            // detail "high" : en "low" le modèle ne distingue pas un exposant
            // d'un facteur, ni le haut du bas d'une fraction — ce qui est
            // précisément ce qu'on lui demande de voir.
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
      const parsed = JSON.parse(brut) as Record<string, unknown>;
      lecture = {
        texte: typeof parsed.texte === "string" ? parsed.texte : "",
        niveau: (parsed.niveau as string) || null,
        notion: (parsed.notion as string) || null,
        matiere: (parsed.matiere as string) || null,
        zonesIllisibles: Array.isArray(parsed.zonesIllisibles)
          ? parsed.zonesIllisibles
              .filter((z): z is string => typeof z === "string")
              .slice(0, 12)
          : [],
        manques: signalements(parsed.manques),
        erreursProbables: signalements(parsed.erreursProbables),
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
    // ⛔ Ni la photo ni le cours lu ne partent ici — voir journal.ts.
    // Pas de `await` : la statistique ne fait pas attendre la personne.
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

    return NextResponse.json({
      lecture,
      // Le public vient du COMPTE, jamais d'un paramètre du navigateur : c'est
      // lui qui décide si on a le droit de compléter le cours ou non.
      public: publicDuCompte(auth.typeUtilisateur),
      // Pré-remplit la classe sur l'écran de relecture. `null` pour un prof ou
      // un parent — à eux, on la demande.
      classeDuCompte: auth.classe,
    });
  } catch (error) {
    console.error("Erreur /api/photo-cours/lire :", error);
    return NextResponse.json(
      { error: "Impossible de lire cette photo pour le moment." },
      { status: 500 }
    );
  }
}
