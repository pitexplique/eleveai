// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ROLES = new Set([
  "Parent",
  "Élève",
  "Enseignant",
  "Direction/Établissement",
  "Partenaire",
  "Autre",
]);

const TOPICS = new Set([
  "Question",
  "Bug",
  "Idée d’amélioration",
  "Demande démo",
  "Partenariat",
  "Autre",
]);

const PRIORITIES = new Set(["Normal", "Important", "Urgent"]);

function asString(v: any) {
  return String(v ?? "").trim();
}

// Anti-spam IA ciblé sur les messages d'élèves (« Écris à ton prof »,
// source=eleve-message) : un message honnête tient en 200 mots, au-delà c'est un
// pavé copié-collé d'une IA. Le contact adulte (contact, avis-tarifs…) n'est pas
// limité — un vrai message peut être long. Cf. app/api/retours/route.ts.
const MAX_MOTS_ELEVE = 200;

function compterMots(s: string) {
  const t = s.trim();
  return t ? t.split(/\s+/).length : 0;
}

function validateEmailLoose(v: string) {
  if (!v) return true;
  if (v.length > 200) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const hp = asString(body.hp);
    if (hp) {
      return NextResponse.json({ ok: false, error: "Spam" }, { status: 400 });
    }

    const role = asString(body.role);
    const topic = asString(body.topic);
    const priority = asString(body.priority);

    const name = asString(body.name);
    const org = asString(body.org);
    const email = asString(body.email);
    const message = asString(body.message);
    const source = asString(body.source) || "contact";

    // Validation minimale
    if (!ROLES.has(role)) {
      return NextResponse.json({ ok: false, error: "Rôle invalide" }, { status: 400 });
    }
    if (!TOPICS.has(topic)) {
      return NextResponse.json({ ok: false, error: "Sujet invalide" }, { status: 400 });
    }
    if (!PRIORITIES.has(priority)) {
      return NextResponse.json({ ok: false, error: "Priorité invalide" }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ ok: false, error: "Message trop court" }, { status: 400 });
    }
    if (!validateEmailLoose(email)) {
      return NextResponse.json({ ok: false, error: "Email invalide" }, { status: 400 });
    }

    // (Optionnel) éviter les abus : taille max message
    if (message.length > 8000) {
      return NextResponse.json(
        { ok: false, error: "Message trop long" },
        { status: 400 }
      );
    }
    // Limite ciblée : messages d'élèves uniquement (anti-copier-coller d'IA).
    if (source === "eleve-message" && compterMots(message) > MAX_MOTS_ELEVE) {
      return NextResponse.json(
        {
          ok: false,
          error: `Ton message fait plus de ${MAX_MOTS_ELEVE} mots. Écris à ton prof avec tes propres mots, va à l'essentiel (les pavés copiés-collés d'une IA ne sont pas acceptés).`,
        },
        { status: 400 }
      );
    }

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );


    const { error } = await supabase.from("contact_messages").insert({
      role,
      topic,
      priority,
      name: name || null,
      org: org || null,
      email: email || null,
      message,
      source,
      status: "new",
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}



