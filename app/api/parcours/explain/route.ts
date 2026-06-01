import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { openai } from "@/lib/openai";

type ExplainBody = {
  codeEtablissement?: string;
  codeUtilisateur?: string;
  classe?: string;
  notionId?: string;
  notionLabel?: string;
  questionIndex?: number;
  questionText?: string;
  studentAnswer?: string;
  expectedAnswer?: string;
  explanation?: string;
  studentQuestion?: string;
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

    const body = (await req.json().catch(() => ({}))) as ExplainBody;
    const codeEtablissement = clean(body.codeEtablissement, 80);
    const codeUtilisateur = clean(body.codeUtilisateur, 80);
    const classe = clean(body.classe, 30);
    const notionId = clean(body.notionId, 120);
    const notionLabel = clean(body.notionLabel, 120);
    const questionIndex =
      typeof body.questionIndex === "number" &&
      Number.isInteger(body.questionIndex) &&
      body.questionIndex > 0
        ? body.questionIndex
        : null;
    const questionText = clean(body.questionText, 1200);
    const loggedQuestionText = [
      questionIndex ? `Question ${questionIndex}` : null,
      notionId ? `Notion id : ${notionId}` : null,
      questionText,
    ]
      .filter(Boolean)
      .join("\n");
    const studentAnswer = clean(body.studentAnswer, 300) || "Aucune reponse";
    const expectedAnswer = clean(body.expectedAnswer, 300) || "Non disponible";
    const explanation = clean(body.explanation, 1200);
    const studentQuestion = clean(body.studentQuestion, 500);

    if (!codeEtablissement || !codeUtilisateur) {
      return NextResponse.json(
        { error: "Connexion eleve requise pour poser une question." },
        { status: 401 }
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

    if (!studentQuestion || !questionText) {
      return NextResponse.json(
        { error: "Question eleve ou contexte manquant." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      temperature: 0.2,
      max_tokens: 220,
      messages: [
        {
          role: "system",
          content: [
            "Tu es un coach pedagogique EleveAI.",
            "Tu aides un eleve qui ne comprend pas une correction.",
            "Reponds en francais simple, adapte au niveau donne.",
            "Ne donne pas une lecon longue : 4 a 6 phrases maximum.",
            "Appuie-toi uniquement sur l'exercice, la reponse attendue et l'explication fournis.",
            "Si utile, donne un mini-exemple tres court.",
            "N'utilise pas de LaTeX.",
          ].join("\n"),
        },
        {
          role: "user",
          content: [
            `Classe : ${classe || "non precisee"}`,
            `Eleve connecte : ${eleve.nom ?? codeUtilisateur}`,
            `Notion : ${notionLabel || "non precisee"}`,
            "",
            "Exercice :",
            questionText,
            "",
            `Reponse de l'eleve : ${studentAnswer}`,
            `Reponse attendue : ${expectedAnswer}`,
            "",
            explanation ? `Explication initiale :\n${explanation}` : "Explication initiale : non disponible",
            "",
            `Question de l'eleve : ${studentQuestion}`,
          ].join("\n"),
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
        source: "parcours_correction_chat",
        matiere: "maths",
        classe: classe || null,
        notion_label: notionLabel || null,
        question_text: loggedQuestionText,
        student_answer: studentAnswer,
        expected_answer: expectedAnswer,
        explanation: explanation || null,
        student_question: studentQuestion,
        coach_answer: answer,
        model: OPENAI_MODEL,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        total_tokens: totalTokens,
      });

    if (logError) {
      console.error("Erreur log questions_ia_parcours :", logError);
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
    console.error("Erreur /api/parcours/explain :", error);
    return NextResponse.json(
      { error: "Impossible d'expliquer cette correction pour le moment." },
      { status: 500 }
    );
  }
}
