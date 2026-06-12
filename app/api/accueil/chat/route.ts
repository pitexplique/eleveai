import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { openai } from "@/lib/openai";

type AccueilChatBody = {
  codeEtablissement?: string;
  codeUtilisateur?: string;
  studentQuestion?: string;
  // Derniers échanges du fil (retour élève du 11/06/2026 : sans historique,
  // le coach resaluait et se répétait à chaque message).
  history?: Array<{ role?: string; content?: string }>;
};

const OPENAI_MODEL = "gpt-4.1-mini";

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

const supabaseAdmin =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: false } }
      )
    : null;

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY manquant cote serveur." },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as AccueilChatBody;
    const codeEtablissement = clean(body.codeEtablissement, 80);
    const codeUtilisateur = clean(body.codeUtilisateur, 80);
    const studentQuestion = clean(body.studentQuestion, 500);

    if (!codeEtablissement || !codeUtilisateur) {
      return NextResponse.json(
        { error: "Connexion eleve requise pour dialoguer." },
        { status: 401 }
      );
    }

    if (!studentQuestion) {
      return NextResponse.json(
        { error: "Question eleve manquante." },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Verification eleve indisponible cote serveur." },
        { status: 500 }
      );
    }

    const { data: eleve, error: eleveError } = await supabaseAdmin
      .from("acces_etablissement")
      .select("id, nom, type_utilisateur, actif")
      .eq("code_etablissement", codeEtablissement)
      .eq("code_utilisateur", codeUtilisateur)
      .eq("type_utilisateur", "eleve")
      .eq("actif", true)
      .maybeSingle();

    if (eleveError || !eleve) {
      return NextResponse.json(
        { error: "Compte eleve non autorise." },
        { status: 403 }
      );
    }

    const history = (Array.isArray(body.history) ? body.history : [])
      .slice(-8)
      .map((message) => ({
        role: message?.role === "coach" ? ("assistant" as const) : ("user" as const),
        content: clean(message?.content, 500),
      }))
      .filter((message) => message.content);

    // Retour de Gaetan (11/06/2026) : le coach redisait "Salut Gaetan" a chaque
    // message. On l'interdit explicitement des qu'il y a un historique, au lieu
    // de compter sur le modele pour le deviner.
    const conversationStarted = history.length > 0;
    const consigneSalutation = conversationStarted
      ? "La conversation a DEJA commence : ne dis NI bonjour NI le prenom de l'eleve, reponds directement a sa question."
      : "Tu peux saluer brievement l'eleve une seule fois, puis reponds a sa question.";

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      temperature: 0.2,
      max_tokens: 180,
      messages: [
        {
          role: "system",
          content: [
            "Tu es le coach EleveAI sur la page d'accueil.",
            `Tu reponds a un eleve connecte (${eleve.nom ?? codeUtilisateur}) qui pose une question rapide.`,
            "Reponds en francais simple, en 3 a 5 phrases maximum.",
            consigneSalutation,
            "Aide sans faire tout le travail a la place de l'eleve.",
            "Si la question demande un exercice precis, invite l'eleve a aller dans Parcours ou Coach IA.",
            "N'utilise pas de LaTeX.",
          ].join("\n"),
        },
        ...history,
        {
          role: "user",
          content: studentQuestion,
        },
      ],
    });

    const answer = completion.choices[0]?.message?.content?.trim();
    const inputTokens = completion.usage?.prompt_tokens ?? null;
    const outputTokens = completion.usage?.completion_tokens ?? null;
    const totalTokens = completion.usage?.total_tokens ?? null;

    if (!answer) {
      return NextResponse.json(
        { error: "Reponse vide du coach." },
        { status: 500 }
      );
    }

    const { error: logError } = await supabaseAdmin
      .from("questions_ia_parcours")
      .insert({
        acces_id: eleve.id,
        code_etablissement: codeEtablissement,
        code_utilisateur: codeUtilisateur,
        nom: eleve.nom ?? null,
        type_utilisateur: eleve.type_utilisateur,
        source: "accueil_chat",
        matiere: "general",
        classe: null,
        notion_label: "Accueil EleveAI",
        question_text: "Question libre depuis la page d'accueil",
        student_answer: null,
        expected_answer: null,
        explanation: null,
        student_question: studentQuestion,
        coach_answer: answer,
        model: OPENAI_MODEL,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        total_tokens: totalTokens,
      });

    if (logError) {
      console.error("Erreur log accueil_chat :", logError);
    }

    return NextResponse.json({
      answer,
      usage: {
        inputTokens,
        outputTokens,
        totalTokens,
      },
    });
  } catch (error) {
    console.error("Erreur /api/accueil/chat :", error);
    return NextResponse.json(
      { error: "Impossible de dialoguer avec le coach pour le moment." },
      { status: 500 }
    );
  }
}
