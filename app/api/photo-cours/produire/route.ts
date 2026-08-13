// app/api/photo-cours/produire/route.ts
//
// ÉTAPE 2 — à partir du cours RELU ET CORRIGÉ par la personne.
//
// ⭐ L'image n'arrive pas jusqu'ici. Ce que reçoit cette route, c'est du texte
// que quelqu'un a eu sous les yeux et validé. C'est ce qui rend la production
// défendable : si elle se trompe, ce n'est plus parce que la machine a mal vu.
//
// ⭐ ET LE PUBLIC VIENT DU COMPTE, PAS DU NAVIGATEUR. C'est lui qui décide si
// on a le droit de COMPLÉTER le cours (élève, parent) ou si on doit s'en tenir
// strictement à ce qui est écrit (professeur). Laisser le client le choisir,
// c'est laisser n'importe qui obtenir le prompt du professeur — et surtout,
// c'est perdre la seule garantie qu'on donne aux profs.

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { promptProduction } from "@/lib/photo-cours/prompts";
import { clean, tropDAppels, verifierCompteConnecte } from "@/lib/photo-cours/auth";
import {
  enregistrerCours,
  enregistrerProduction,
  journaliserUsage,
} from "@/lib/photo-cours/journal";
import { pontsPour } from "@/lib/photo-cours/coach";
import { contexteProgramme } from "@/lib/photo-cours/programme";
import { productionValide, publicDuCompte } from "@/lib/photo-cours/types";

const MODELE = "gpt-4.1-mini";

// Frédéric, 12/08 : « on peut modifier max-tokens si tu veux ».
// 2000 (la valeur d'agent-prof) coupait une série d'exercices AVEC son corrigé
// en plein milieu. 4000 laisse passer une séance complète ; au-delà, ce n'est
// plus une fiche, c'est un chapitre que personne ne relit.
const MAX_TOKENS = 4000;

// Jumelle de nettoyerLatex() dans /api/agent-prof. ⏳ À factoriser dans lib/
// le jour où l'on touchera à agent-prof — pas avant : on ne modifie pas une
// route qui tourne pour faire de la place à une qui commence.
function nettoyerLatex(texte: string): string {
  if (!texte) return texte;
  let t = texte;
  t = t.replace(/\\frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g, "$1/$2");
  t = t.replace(/\$\$([^$]+)\$\$/g, "$1");
  t = t.replace(/\$([^$]+)\$/g, "$1");
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
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY manquant côté serveur." },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as {
      codeEtablissement?: string;
      codeUtilisateur?: string;
      texte?: string;
      type?: string;
      niveau?: string;
      matiere?: string;
      notion?: string;
      precisions?: string;
      confiance?: number;
      compteurs?: { illisibles?: number; manques?: number; erreurs?: number };
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
        { error: "Trop de demandes d'affilée. Reprenez dans une minute." },
        { status: 429 }
      );
    }

    const texte = clean(body.texte, 12000);
    if (!texte) {
      return NextResponse.json(
        { error: "Le cours relu est vide." },
        { status: 400 }
      );
    }

    const pub = publicDuCompte(auth.typeUtilisateur);
    const type = productionValide(pub, body.type);

    // ⭐ La classe et la matière sont CONFIRMÉES sur l'écran de relecture —
    // « fraction en 5e et en 4e, ce n'est pas la même » (Frédéric, 12/08). On
    // retombe sur celle du compte quand la personne n'a rien dit.
    const niveau = clean(body.niveau, 40) || auth.classe || "";
    const matiere = clean(body.matiere, 40);
    const notion = clean(body.notion, 120);
    const precisions = clean(body.precisions, 600);

    const completion = await openai.chat.completions.create({
      model: MODELE,
      temperature: 0.4,
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: "system",
          // ⭐ LE PROGRAMME DE LA CLASSE, GLISSÉ DANS LA CONSIGNE (13/08).
          // ⛔ INVISIBLE À L'UTILISATEUR, et c'est voulu — Frédéric : « personne
          // ne doit le voir à part nous, c'est un gage de qualité ». On ne
          // décore pas la page d'un tampon « conforme au BO » : on met la
          // conformité DANS le travail, et elle se voit au résultat.
          // Voir lib/photo-cours/programme.ts : écrire « respecte le Bulletin
          // Officiel » ne rend rien conforme ; donner la liste réelle des
          // notions de la classe, si.
          content: [promptProduction(pub, type), contexteProgramme({ classe: niveau, matiere })]
            .filter(Boolean)
            .join("\n\n"),
        },
        {
          role: "user",
          content: [
            `Classe : ${niveau || "non précisée"}`,
            `Matière : ${matiere || "non précisée"}`,
            `Notion : ${notion || "non précisée"}`,
            "",
            "LE COURS, RELU ET VALIDÉ :",
            "---",
            texte,
            "---",
            "",
            precisions
              ? `Ce qui est demandé en plus :\n${precisions}`
              : "Aucune demande particulière.",
          ].join("\n"),
        },
      ],
    });

    const brut = completion.choices[0]?.message?.content?.trim() || "";
    if (!brut) {
      return NextResponse.json({ error: "Réponse vide." }, { status: 500 });
    }

    const output = nettoyerLatex(brut);

    // ⭐ LES PONTS AVANT TOUT : quand la notion existe dans les banques, ce
    // qu'on vient de générer vaut moins que le coach, qui est relu, calibré,
    // et qui laisse une trace dans le tableau de bord.
    const ponts = pontsPour({
      texte,
      niveau,
      notion,
      matiere,
      classeDuCompte: auth.classe,
    });

    // On garde le cours relu et sa production, pour pouvoir y revenir.
    // ⚠️ Sans `await` bloquant la réponse : perdre l'archive ne doit jamais
    // coûter le travail de la personne.
    const id = await enregistrerCours({
      codeEtablissement,
      codeUtilisateur,
      typeUtilisateur: auth.typeUtilisateur,
      nom: auth.nom,
      publicVise: pub,
      niveau,
      matiere,
      notion,
      texte,
      confiance: typeof body.confiance === "number" ? body.confiance : null,
      zonesIllisibles: body.compteurs?.illisibles ?? 0,
      manques: body.compteurs?.manques ?? 0,
      erreursProbables: body.compteurs?.erreurs ?? 0,
    }).catch(() => null);

    if (id) {
      void enregistrerProduction({
        photoCoursId: id,
        codeUtilisateur,
        typeProduction: type,
        contenu: output,
      });
    }

    void journaliserUsage({
      codeEtablissement,
      codeUtilisateur,
      typeUtilisateur: auth.typeUtilisateur,
      nom: auth.nom,
      etape: "production",
      typeProduction: type,
      niveau,
      notion,
      matiere,
      modele: MODELE,
      inputTokens: completion.usage?.prompt_tokens ?? null,
      outputTokens: completion.usage?.completion_tokens ?? null,
    });

    return NextResponse.json({ output, ponts, id });
  } catch (error) {
    console.error("Erreur /api/photo-cours/produire :", error);
    return NextResponse.json(
      { error: "Impossible de produire ce document pour le moment." },
      { status: 500 }
    );
  }
}
