// app/api/retours/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TYPES = new Set(["bug", "idee", "avis"]);

const PAGES = new Set([
  "Accueil",
  "Coach Maths",
  "Coach Français",
  "Coach English",
  "Coach Espagnol",
  "Coach Économie",
  "Coach Brevet",
  "Parcours Maths",
  "Parcours Français",
  "Parcours English",
  "Parcours Espagnol",
  "Calcul rapide",
  "Défis du jour",
  "Tableau de bord élève",
  "Tout le site",
  "Autre",
]);

function asString(v: any) {
  return String(v ?? "").trim();
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

    const type = asString(body.type);
    const page = asString(body.page);
    const message = asString(body.message);
    const note = Number(body.note);

    const codeEtablissement = asString(body.code_etablissement);
    const codeEleve = asString(body.code_eleve);
    const authUserId = asString(body.auth_user_id);
    const email = asString(body.email);
    const prenom = asString(body.prenom);
    const classe = asString(body.classe);

    if (!TYPES.has(type)) {
      return NextResponse.json({ ok: false, error: "Type invalide" }, { status: 400 });
    }
    if (page && !PAGES.has(page)) {
      return NextResponse.json({ ok: false, error: "Page invalide" }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Décris ton retour en quelques mots (10 caractères minimum)." },
        { status: 400 }
      );
    }
    if (message.length > 3000) {
      return NextResponse.json({ ok: false, error: "Message trop long" }, { status: 400 });
    }
    if (type === "avis" && !(note >= 1 && note <= 5)) {
      return NextResponse.json(
        { ok: false, error: "Choisis une note entre 1 et 5 étoiles." },
        { status: 400 }
      );
    }
    if (authUserId && !UUID_RE.test(authUserId)) {
      return NextResponse.json({ ok: false, error: "Identifiant invalide" }, { status: 400 });
    }
    if (!validateEmailLoose(email)) {
      return NextResponse.json({ ok: false, error: "Email invalide" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from("retours_eleves").insert({
      type,
      page: page || null,
      message,
      note: type === "avis" ? note : null,
      code_etablissement: codeEtablissement.slice(0, 50) || null,
      code_eleve: codeEleve.slice(0, 50) || null,
      auth_user_id: authUserId || null,
      email: email || null,
      prenom: prenom.slice(0, 100) || null,
      classe: classe.slice(0, 20) || null,
      source: "votre-avis",
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
