// app/api/photo-cours/livre/route.ts
//
// LE TÉLÉCHARGEMENT — le cours et son document, en EPUB.
//
// ⚠️ `runtime = "nodejs"` EXPLICITE : la fabrique lit Ti Margo sur le disque
// (`fs`) et produit un zip. Sur le runtime Edge, `node:fs` n'existe pas et la
// route casserait à la première requête, pas au build.
//
// ⚠️ On ne rappelle AUCUN modèle ici : le document a déjà été produit et payé.
// Cette route ne fait que mettre en forme ce que le navigateur lui renvoie.
// C'est aussi ce qui la rend inoffensive — la faire tourner en boucle ne coûte
// que du CPU, pas des tokens.

import { NextResponse } from "next/server";
import { clean, tropDAppels, verifierCompteConnecte } from "@/lib/photo-cours/auth";
import { fabriquerEpub, nomDeFichier } from "@/lib/photo-cours/epub";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      codeEtablissement?: string;
      codeUtilisateur?: string;
      cours?: string;
      document?: string;
      intitule?: string;
      classe?: string;
      matiere?: string;
      notion?: string;
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

    if (tropDAppels(`livre:${codeEtablissement}:${codeUtilisateur}`)) {
      return NextResponse.json(
        { error: "Trop de téléchargements d'affilée." },
        { status: 429 }
      );
    }

    const cours = clean(body.cours, 12000);
    const document = clean(body.document, 30000);
    if (!cours || !document) {
      return NextResponse.json(
        { error: "Rien à mettre dans le livre." },
        { status: 400 }
      );
    }

    const intitule = clean(body.intitule, 80) || "Le travail";
    const classe = clean(body.classe, 40);
    const matiere = clean(body.matiere, 40);
    const notion = clean(body.notion, 120);

    const octets = await fabriquerEpub({
      cours,
      document,
      intitule,
      classe,
      matiere,
      notion,
      // La date est passée par l'appelant : la fabrique reste pure.
      date: new Date(),
    });

    return new Response(octets as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/epub+zip",
        "Content-Disposition": `attachment; filename="${nomDeFichier({ notion, classe, intitule })}"`,
        // ⛔ Aucun cache : le livre porte le cours de quelqu'un.
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Erreur /api/photo-cours/livre :", error);
    return NextResponse.json(
      { error: "Impossible de fabriquer le livre." },
      { status: 500 }
    );
  }
}
