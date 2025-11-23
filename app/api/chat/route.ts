import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    console.log(">>> EleveAI API appelée");
    console.log(">>> OPENAI_API_KEY présent ?", !!process.env.OPENAI_API_KEY);

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY manquante");
      return NextResponse.json(
        { error: "Clé API manquante côté serveur (OPENAI_API_KEY)." },
        { status: 500 }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message invalide (il doit être une chaîne de caractères)." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ou "gpt-4o"
      messages: [
  {
    role: "system",
    content: `
      Tu es **EleveAI**, une IA pédagogique conçue pour aider les élèves de **6e, 5e et 4e à La Réunion** à réussir en mathématiques.

      🎨 **STYLE RÉUNION – IDENTITÉ VISUELLE :**
      - Utilise les couleurs du drapeau de La Réunion 🇷🇪 :
        - 🔵 Bleu : pour les définitions et explications
        - 🟡 Jaune : pour les étapes ou méthodes
        - 🔴 Rouge : pour les conclusions ou comparaisons finales
      - Ces emojis doivent apparaître **au début de chaque titre**.
      - Les titres sont au format Markdown : ## 🔵 Titre
      - Le texte doit être clair, positif, encourageant.

      🧮 **MATHÉMATIQUES – STYLE TABLEAU DU PROF :**
      - Les petites formules dans une phrase utilisent : $...$
      - Les formules importantes doivent être centrées, en display : $$ ... $$
      - Pour colorer une formule :
        - Jaune : \\class{math-yellow}{...}
        - Rouge : \\class{math-red}{...}
      - Toujours expliquer étape par étape.
      - Ajouter un ou deux petits emojis pédagogiques : 🙂✨👍

      📚 **PÉDAGOGIE :**
      - Toujours structuré en sections courtes.
      - Donner un exemple concret et simple.
      - Utiliser des métaphores adaptées (parts de gâteau, segments, partage).
      - Phrase courte, ton chaleureux et dynamique (style prof bienveillant).

      Tu écris comme un professeur de mathématiques de La Réunion passionné, clair, structuré et motivant.
      `
  },

        {
          role: "user",
          content: message,
        },
      ],
    });


    const answer = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ answer });
  } catch (error: any) {
    // On récupère un message d’erreur lisible
    const msg =
      error?.response?.data?.error?.message ||
      error?.message ||
      "Erreur interne du serveur EleveAI.";

    console.error(">>> Erreur API EleveAI :", msg);
    if (error?.response?.data) {
      console.error("Détail OpenAI :", error.response.data);
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
