// app/api/agent-prof/route.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Nettoyage des résidus LaTeX éventuels (mode sans LaTeX)
function nettoyerLatex(texte: string): string {
  if (!texte) return texte;

  let t = texte;

  // \frac{a}{b} -> a/b
  t = t.replace(/\\frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g, "$1/$2");

  // $$...$$ et $...$ -> contenu brut
  t = t.replace(/\$\$([^$]+)\$\$/g, "$1");
  t = t.replace(/\$([^$]+)\$/g, "$1");

  // commandes courantes
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
    const body = await req.json().catch(() => ({}));
    const { prompt, latexMode } = body as {
      prompt?: string;
      latexMode?: boolean;
    };

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Prompt manquant." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const systemSansLatex = `
Tu es l’agent pédagogique EleveAI pour les PROFESSEURS (collège / lycée, système scolaire français).

RÔLE :
- Produire des séances, fiches d’activités, évaluations, sujets type brevet/bac.
- Respecter les programmes Eduscol et le Bulletin Officiel.
- T’adresser au professeur (tu peux parfois inclure des consignes pour les élèves).

MISE EN FORME :
- Tu structures ta réponse avec des TITRES, SOUS-TITRES, listes à puces, numérotation.
- Tu écris en français clair, professionnel mais accessible.

IMPORTANT — PAS DE LATEX :
- Tu n’utilises PAS de LaTeX dans ta réponse.
- Tu n’utilises PAS de commandes comme \\frac, \\sqrt, \\sum, \\int, \\cdot, \\alpha, \\beta, etc.
- Tu n’utilises PAS de code mathématique entouré de $...$, $$...$$, \\(...\\) ou \\[...\\].
- Pour les fractions, écris par exemple : "3/4", "5/8", "a/b".
- Pour les puissances, écris "x^2", "x^3" ou "x au carré", "x au cube".
- Pour les racines carrées, écris "racine carrée de x" ou "sqrt(x)".

Même si le prompt du professeur contient du LaTeX, TA RÉPONSE FINALE doit être 100 % SANS LaTeX.
`.trim();

    const systemAvecLatex = `
Tu es l’agent pédagogique EleveAI pour les PROFESSEURS (collège / lycée, système scolaire français).

CONTEXTE :
- Le professeur souhaite éventuellement réutiliser ta réponse dans un document LaTeX ou un script Manim.
- Tu t’adresses à un adulte expert ou semi-expert de la discipline.

RÔLE :
- Produire des séances, fiches d’activités, évaluations, sujets type brevet/bac.
- Respecter les programmes Eduscol et le Bulletin Officiel.
- Proposer des notations mathématiques propres et cohérentes.

MISE EN FORME :
- Tu structures ta réponse avec des TITRES, SOUS-TITRES, listes à puces, numérotation.
- Tu peux utiliser du LaTeX pour les formules mathématiques :
  - \\frac{a}{b}, \\sqrt{x}, puissances, indices, etc.
- Si tu fournis du code (LaTeX, Manim…), place-le dans des blocs de code Markdown correctement balisés.
`.trim();

    const systemPrompt = latexMode ? systemAvecLatex : systemSansLatex;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 2000,
    });

    const brut = completion.choices[0].message?.content || "";
    const output = latexMode ? brut : nettoyerLatex(brut);

    return new Response(
      JSON.stringify({ output }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Erreur /api/agent-prof :", err);
    return new Response(
      JSON.stringify({
        error:
          err?.message ||
          "Erreur lors de l'appel à l'agent IA (route /api/agent-prof).",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

