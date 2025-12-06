// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔧 Nettoyage strict des notations LaTeX → texte simple
function nettoyerLatex(texte: string): string {
  if (!texte) return "";

  let t = texte;

  // \frac{a}{b} ou \frac {a} {b} → a/b
  t = t.replace(/\\frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g, "$1/$2");

  // \sqrt{x} → racine carrée de x
  t = t.replace(/\\sqrt\s*\{([^}]+)\}/g, "racine carrée de $1");

  // parenthèses LaTeX \left( \right) → normales
  t = t.replace(/\\left\(/g, "(").replace(/\\right\)/g, ")");

  // opérations et symboles fréquents
  t = t.replace(/\\times/g, "×");
  t = t.replace(/\\cdot/g, "·");
  t = t.replace(/\\div/g, "÷");

  // supprimer tous les blocs math $...$, $$...$$, \(...\), \[...\]
  t = t.replace(/\$\$([^$]+)\$\$/g, "$1");
  t = t.replace(/\$([^$]+)\$/g, "$1");
  t = t.replace(/\\\(([^)]+)\\\)/g, "$1");
  t = t.replace(/\\\[([\s\S]+?)\\\]/g, "$1");

  // enlever quelques commandes courantes qui traînent
  t = t.replace(/\\begin\{[^}]+\}/g, "");
  t = t.replace(/\\end\{[^}]+\}/g, "");
  t = t.replace(/\\[a-zA-Z]+/g, ""); // commande LaTeX isolée

  // espaces inutiles
  t = t.replace(/[ \t]+\n/g, "\n");
  t = t.trim();

  return t;
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "OPENAI_API_KEY manquant dans les variables d’environnement côté serveur.",
        },
        { status: 500 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const { message, latexMode } = body as {
      message?: string;
      latexMode?: boolean;
    };

    const question = (message || "").trim();

    if (!question) {
      return NextResponse.json(
        { error: "Le champ 'message' est obligatoire." },
        { status: 400 },
      );
    }

    // 🧠 Deux modes : élève (sans LaTeX) / prof (avec LaTeX)
    const systemPromptSansLatex = `
Tu es le tchat "EleveAI – Maths".

Public : surtout élèves de collège / lycée (système scolaire français), parfois leurs parents.
Objectif : expliquer les mathématiques clairement, étape par étape.

RÈGLE TRÈS IMPORTANTE : PAS DE LATEX.
- N'utilise jamais de LaTeX.
- N'écris pas \\frac{a}{b}, \\sqrt{x}, $$...$$, \\( ... \\), ni aucune commande LaTeX.
- Écris les fractions comme 2/5, 3/10, 7/8.
- Écris les puissances comme x^2, x^3, "x au carré", "x au cube".
- Ta réponse doit être directement copiable dans Word, Pronote, un ENT ou sur papier.

Adopte un ton bienveillant, pose parfois de petites questions de vérification, puis donne la réponse.
`.trim();

    const systemPromptLatexProf = `
Tu es le tchat "EleveAI – Maths (mode avancé pour professeurs)".

Public : professeurs de mathématiques ou de sciences (système scolaire français).
Contexte : ils peuvent réutiliser ta réponse dans LaTeX, Manim ou des fiches de cours.

- Tu peux utiliser LaTeX proprement (\\frac{}, \\sqrt{}, exposants, etc.).
- Structure ta réponse en sections, listes, étapes numérotées.
- Reste pédagogique et clair, mais tu peux aller plus vite sur les détails de base si la demande est avancée.

Si l'utilisateur demande du code (LaTeX, Manim, etc.), place-le dans des blocs de code markdown.
`.trim();

    const systemPrompt = latexMode ? systemPromptLatexProf : systemPromptSansLatex;

    // 🔥 Appel OpenAI optimisé (chat.completions, modèle mini)
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      temperature: 0.3,
      max_tokens: 800, // limite raisonnable pour réduire coût et latence
    });

    const brut = completion.choices[0]?.message?.content || "";

    // 🔍 Nettoyage seulement pour le mode "élève" (sans LaTeX)
    const answer = latexMode ? brut : nettoyerLatex(brut);

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Erreur /api/chat :", err);
    return NextResponse.json(
      { error: "Erreur lors de l'appel à EleveAI." },
      { status: 500 },
    );
  }
}
