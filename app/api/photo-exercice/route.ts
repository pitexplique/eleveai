// app/api/photo-exercice/route.ts
//
// UNE FEUILLE D'EXERCICES → LES CHEMINS DANS LE COACH.
//
// ⭐ 13/09/2026, Frédéric : « je veux que ma fille photographie son PDF ou le
// télécharge et que ça lui indique les chemins à suivre dans les coachs ».
// L'histoire d'origine : elle lui envoie sa feuille, et il cherche à la main
// le coach qui correspond.
//
// Ce que cette route fait : elle montre la feuille (photo OU PDF) au modèle
// avec le SOMMAIRE réel de la classe (lib/photo-exercice/catalogue.ts), et lui
// demande, exercice par exercice, quelle notion et quelles micro-compétences
// du coach s'en approchent. Elle ne lit pas le cours, ne corrige rien, ne
// produit rien : elle ouvre des portes qui existent.
//
// ⛔ SANS COMPTE — et c'est la différence avec /api/photo-cours. Un élève de
// seconde n'a pas de compte ici, et une porte fermée à clé n'est pas une
// porte. Le prix : la clé OpenAI est exposée à qui trouve l'URL. Les freins :
// une limite par adresse IP et par minute, une par jour, un plafond de taille,
// et un modèle « mini ». Si l'admin voit la facture bouger, TYPES_AUTORISES de
// photo-cours montre comment refermer.
//
// ⚠️ RGPD, même règle que photo-cours : la feuille traverse et ne reste pas.
// Aucun stockage, aucun log de son contenu. On journalise seulement des
// compteurs (classe, matière, nombre d'exercices reconnus, tokens).

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { clean } from "@/lib/photo-cours/auth";
import { niveauVersProfil } from "@/lib/photo-cours/coach";
import {
  classeValide,
  labelClasse,
  matiereValide,
  sommaire,
  sommaireEnTexte,
} from "@/lib/photo-exercice/catalogue";

const MODELE = "gpt-4.1-mini";

// En dessous, le rattachement est un « à peu près » : on ne l'ouvre pas.
const ADEQUATION_MIN = 60;

// Une photo compressée pèse 200 à 600 Ko ; un PDF d'une feuille, moins de
// 2 Mo. Vercel coupe à ~4,5 Mo de corps : on s'arrête avant, avec un message.
const TAILLE_MAX = 4_000_000;

// ── Freins par adresse ───────────────────────────────────────────────────────
// En mémoire, donc par instance et perdu au redémarrage : ça arrête la boucle
// accidentelle et le curieux, pas un attaquant décidé. Voir photo-cours/auth.ts.
const APPELS = new Map<string, number[]>();
const PAR_MINUTE = 6;
const PAR_JOUR = 40;

function tropDAppels(ip: string): "minute" | "jour" | null {
  const maintenant = Date.now();
  const recents = (APPELS.get(ip) ?? []).filter((t) => maintenant - t < 86_400_000);
  APPELS.set(ip, recents);
  if (recents.filter((t) => maintenant - t < 60_000).length >= PAR_MINUTE) return "minute";
  if (recents.length >= PAR_JOUR) return "jour";
  recents.push(maintenant);
  return null;
}

export type ExerciceReconnu = {
  numero: string;
  resume: string;
  notionId: string;
  notionLabel: string;
  micros: { id: string; label: string }[];
};

export type ReponsePhotoExercice = {
  classe: string;
  matiere: string;
  exercices: ExerciceReconnu[];
  /** Les exercices qui ne correspondent à aucune notion du coach — dits tels quels. */
  horsCatalogue: string[];
  /** Ce que le modèle a lu comme classe/matière sur la feuille, si ça diffère. */
  remarque: string | null;
};

function consigne(classeLabel: string, matiereLabel: string, sommaireTexte: string): string {
  return [
    `Tu reçois une feuille d'exercices (photo ou PDF) d'un élève de ${classeLabel}, en ${matiereLabel}.`,
    "Ta seule tâche : dire, pour CHAQUE exercice de la feuille, quelle notion du coach EleveAI",
    "et quelles micro-compétences de cette notion s'en approchent le plus.",
    "",
    "Tu choisis UNIQUEMENT dans le sommaire ci-dessous, en recopiant les identifiants EXACTEMENT.",
    "Tu ne résous pas les exercices. Tu ne complètes pas la feuille.",
    "",
    "⛔ LA RÈGLE QUI COMPTE : une notion n'est retenue que si la série du coach ENTRAÎNE VRAIMENT ce que",
    "l'exercice demande, avec les mêmes outils. « La plus proche » ne suffit pas. Un exercice qui utilise",
    "un outil absent du sommaire (par exemple des identités remarquables alors que le sommaire est celui",
    "d'une classe qui ne les voit pas encore) va dans `horsCatalogue`, et tu le dis dans `remarque`.",
    "Mieux vaut une liste vide qu'une porte qui ouvre sur autre chose.",
    "",
    "Réponds en JSON strict, sans commentaire :",
    "{",
    '  "classeLue": "la classe écrite sur la feuille, ou null",',
    '  "classeProbable": "la classe à laquelle ces exercices correspondent d\'après leur contenu (CP, CE1, …, 6e, 5e, 4e, 3e, seconde, premiere, terminale)",',
    '  "exercices": [',
    '    { "numero": "1", "resume": "ce que demande l\'exercice, en 12 mots maximum",',
    '      "notionId": "identifiant NOTION du sommaire", "microIds": ["1 à 3 identifiants MICRO de cette notion"],',
    '      "adequation": "un entier de 0 à 100 : à quel point la série du coach entraîne exactement cet exercice" }',
    "  ],",
    '  "horsCatalogue": ["résumé en 12 mots de chaque exercice sans notion dans le sommaire"],',
    '  "remarque": "une phrase pour l\'élève si la feuille ne correspond pas à la classe choisie, sinon null"',
    "}",
    "",
    "Un exercice = une entrée. Si la feuille numérote les exercices, garde sa numérotation.",
    "Si un exercice mêle deux notions, garde celle qui porte la question principale.",
    "",
    "SOMMAIRE DU COACH (identifiants exacts) :",
    sommaireTexte,
  ].join("\n");
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY manquant côté serveur." }, { status: 500 });
    }

    const ip = (req.headers.get("x-forwarded-for") ?? "inconnue").split(",")[0].trim();
    const frein = tropDAppels(ip);
    if (frein === "minute") {
      return NextResponse.json({ error: "Trop de feuilles d'affilée. Reprends dans une minute." }, { status: 429 });
    }
    if (frein === "jour") {
      return NextResponse.json({ error: "La limite du jour est atteinte pour cet appareil. À demain !" }, { status: 429 });
    }

    const body = (await req.json().catch(() => ({}))) as {
      image?: string;
      pdf?: string;
      classe?: string;
      matiere?: string;
    };

    const matiere = matiereValide(clean(body.matiere, 20));
    if (!matiere) {
      return NextResponse.json({ error: "Matière inconnue." }, { status: 400 });
    }
    const classe = classeValide(clean(body.classe, 20), matiere);
    if (!classe) {
      return NextResponse.json({ error: "Classe inconnue pour cette matière." }, { status: 400 });
    }

    const image = typeof body.image === "string" ? body.image : "";
    const pdf = typeof body.pdf === "string" ? body.pdf : "";
    const fichier = image || pdf;
    if (!fichier) {
      return NextResponse.json({ error: "Aucune feuille reçue." }, { status: 400 });
    }
    if (image && !image.startsWith("data:image/")) {
      return NextResponse.json({ error: "La photo n'est pas une image." }, { status: 400 });
    }
    if (pdf && !pdf.startsWith("data:application/pdf;base64,")) {
      return NextResponse.json({ error: "Le fichier n'est pas un PDF." }, { status: 400 });
    }
    if (fichier.length > TAILLE_MAX) {
      return NextResponse.json(
        { error: image ? "Photo trop lourde, reprends-la de moins près." : "PDF trop lourd (plus de 3 Mo)." },
        { status: 413 }
      );
    }

    const s = sommaire(classe, matiere);
    if (s.length === 0) {
      return NextResponse.json({ error: "Le coach n'a pas encore de séries pour cette classe." }, { status: 404 });
    }
    const parNotion = new Map(s.map((n) => [n.id, n]));
    const matiereLabel = matiere === "maths" ? "mathématiques" : "français";

    // La pièce jointe : une image (detail high, sinon un exposant se confond
    // avec un facteur) ou un PDF envoyé tel quel — le modèle lit les deux.
    // ⚠️ Le SDK 4.77 ne type pas encore la partie `file` : on passe par `any`
    // pour cette seule ligne, l'API, elle, l'accepte.
    // eslint-disable-next-line
    const piece: any = image
      ? { type: "image_url", image_url: { url: image, detail: "high" } }
      : { type: "file", file: { filename: "exercices.pdf", file_data: pdf } };

    const completion = await openai.chat.completions.create({
      model: MODELE,
      temperature: 0,
      max_tokens: 1500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: consigne(labelClasse(classe), matiereLabel, sommaireEnTexte(s)) },
        {
          role: "user",
          content: [{ type: "text", text: "Voici la feuille." }, piece],
        },
      ],
    });

    const brut = completion.choices[0]?.message?.content?.trim();
    if (!brut) {
      return NextResponse.json({ error: "Le lecteur n'a rien renvoyé." }, { status: 500 });
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(brut) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Lecture illisible côté serveur." }, { status: 500 });
    }

    // ── Validation : rien ne sort d'ici qui n'ouvre une vraie série ──────────
    const exercices: ExerciceReconnu[] = [];
    // Les exercices refusés côté serveur d'abord ; ceux que le modèle a
    // lui-même écartés ensuite, sans redire les mêmes (il lui arrive de mettre
    // un exercice dans les deux listes).
    const horsCatalogue: string[] = [];
    const horsModele: string[] = Array.isArray(parsed.horsCatalogue)
      ? parsed.horsCatalogue.filter((x): x is string => typeof x === "string" && x.trim().length > 0)
      : [];

    const bruts = Array.isArray(parsed.exercices) ? parsed.exercices.slice(0, 15) : [];
    for (const e of bruts) {
      if (!e || typeof e !== "object") continue;
      const o = e as Record<string, unknown>;
      const resume = clean(o.resume, 120) || "Exercice";
      const numero = clean(o.numero, 6) || String(exercices.length + horsCatalogue.length + 1);
      const notion = parNotion.get(clean(o.notionId, 120));
      const adequation = typeof o.adequation === "number" ? o.adequation : 0;
      if (!notion || adequation < ADEQUATION_MIN) {
        // ⛔ Identifiant hors sommaire, ou rattachement faible : l'exercice
        // est DIT hors catalogue, jamais rattaché à une notion par défaut.
        // Mesuré le 13/09 : une feuille d'identités remarquables annoncée en
        // 6e revenait rattachée à « Problèmes à nombres inconnus » — le
        // modèle prend « la plus proche » dès qu'on le laisse faire.
        horsCatalogue.push(`Exercice ${numero} : ${resume}`);
        continue;
      }
      const microIds = Array.isArray(o.microIds) ? o.microIds.filter((m): m is string => typeof m === "string") : [];
      const micros = notion.micros.filter((m) => microIds.includes(m.id)).slice(0, 3);
      exercices.push({ numero, resume, notionId: notion.id, notionLabel: notion.label, micros });
    }

    const debut = (s: string) => clean(s, 200).toLowerCase().replace(/^exercice \d+\s*:\s*/, "").split(" ").slice(0, 4).join(" ");
    const dejaDits = new Set(horsCatalogue.map(debut));
    for (const h of horsModele) {
      if (horsCatalogue.length >= 12) break;
      if (dejaDits.has(debut(h))) continue;
      horsCatalogue.push(h);
    }

    // La remarque du modèle d'abord ; sinon, la classe probable quand elle
    // contredit la classe choisie. Une feuille de seconde annoncée en 6e doit
    // le dire à l'élève, pas lui ouvrir des séries de 6e.
    // ⚠️ On compare des IDENTIFIANTS, pas des libellés : « première » rendu
    // par le modèle et « 1re spé maths » choisi par l'élève sont la même
    // classe. `niveauVersProfil` connaît toutes les façons de l'écrire.
    const remarqueModele = clean(parsed.remarque, 200);
    const classeProbable = clean(parsed.classeProbable, 40);
    const profilProbable = niveauVersProfil(classeProbable);
    const profilChoisi = classe.replace(/-spe$/, "");
    const remarque =
      remarqueModele ||
      (profilProbable && profilProbable !== profilChoisi
        ? `Ces exercices ressemblent plutôt à de la ${classeProbable.toLowerCase()} : vérifie la classe choisie.`
        : null);

    // Des compteurs, jamais le contenu (voir l'en-tête).
    console.info("[photo-exercice]", {
      classe,
      matiere,
      type: image ? "image" : "pdf",
      reconnus: exercices.length,
      horsCatalogue: horsCatalogue.length,
      inputTokens: completion.usage?.prompt_tokens ?? null,
      outputTokens: completion.usage?.completion_tokens ?? null,
    });

    const reponse: ReponsePhotoExercice = { classe, matiere, exercices, horsCatalogue, remarque };
    return NextResponse.json(reponse);
  } catch (error) {
    console.error("Erreur /api/photo-exercice :", error);
    return NextResponse.json({ error: "Impossible de lire cette feuille pour le moment." }, { status: 500 });
  }
}
