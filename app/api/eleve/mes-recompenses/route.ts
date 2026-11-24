// 🏅 MES RÉCOMPENSES (24/11/2026, Frédéric : « mettre la médaille de l'élève
// dans son tableau de bord […] il faudra trouver autre chose pour les élèves
// inscrits par e-mail »). Calculé côté serveur.
//
// - Élève d'un ÉTABLISSEMENT : ses médailles et sa place sur le podium de sa
//   classe, MÊME calcul que /prof/classes/podium (lib/server/bulletinClasse.ts,
//   règle de classe des moyennes comprise). Sans médaille : ce qui lui manque
//   pour en viser une. ⛔ Jamais les autres élèves.
// - Élève inscrit par E-MAIL (INDEPENDANT, aucune classe) : des TROPHÉES
//   personnels, comparés à lui seul (paliers de bonnes réponses, jours de
//   suite, fruits du Jardin, meilleure semaine).

import { NextResponse } from "next/server";
import { verifySessionToken, ETABLISSEMENT_INDEPENDANT } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/classesProf";
import { calculerBulletinClasse } from "@/lib/server/bulletinClasse";
import { classeDeLEleve } from "@/lib/server/classeEleve";
import { compteDansLaMoyenne } from "@/lib/moyenne/compteDansLaMoyenne";

export const dynamic = "force-dynamic";

const JOUR = 24 * 60 * 60 * 1000;
const virgule = (n: number) => n.toString().replace(".", ",");
// Jour de La Réunion (UTC+4).
const jourDe = (iso: string) => new Date(new Date(iso).getTime() + 4 * 3600 * 1000).toISOString().slice(0, 10);

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const session = verifySessionToken(auth.startsWith("Bearer ") ? auth.slice(7) : "");
  if (!session) return NextResponse.json({ ok: false, error: "Session expirée." }, { status: 401 });
  if (session.type_utilisateur !== "eleve") return NextResponse.json({ ok: true, mode: null });

  const admin = supabaseAdmin();
  const code = session.code_etablissement;
  const moi = session.code_utilisateur;
  const classeEleve = await classeDeLEleve(admin, code, moi, session.classe ?? null);

  if (code === ETABLISSEMENT_INDEPENDANT) {
    return NextResponse.json({ ok: true, mode: "trophees", ...(await trophees(admin, moi, classeEleve)) });
  }

  // ── Établissement : le podium de la classe ──
  const { data: classe } = await admin
    .from("classes_prof")
    .select("niveau")
    .eq("code_etablissement", code)
    .maybeSingle();
  const niveau = (classe?.niveau as string | null) ?? classeEleve ?? "6e";
  const b = await calculerBulletinClasse(admin, code, niveau, "30j", moi);

  const recompenses: { emoji: string; titre: string; texte: string; periode: "semaine" | "mois"; grand: boolean }[] = [];
  const PLACE = ["", "🥇", "🥈", "🥉"];
  const NOM_PLACE = ["", "1ʳᵉ place", "2ᵉ place", "3ᵉ place"];
  for (const [periode, c] of [["semaine", b.semaine], ["mois", b.mois]] as const) {
    const quand = periode === "semaine" ? "cette semaine" : "ce mois-ci";
    const i = c.podium.findIndex((p) => p.code_utilisateur === moi);
    if (i >= 0)
      recompenses.push({
        emoji: PLACE[i + 1],
        titre: `${NOM_PLACE[i + 1]} du podium de ta classe ${quand}`,
        texte: c.podium[i].raisons.slice(0, 2).join(" · "),
        periode,
        grand: true,
      });
    for (const m of c.medailles.filter((x) => x.code_utilisateur === moi))
      recompenses.push({ emoji: m.emoji, titre: `Médaille ${m.titre} ${quand}`, texte: m.texte, periode, grand: false });
  }

  return NextResponse.json({
    ok: true,
    mode: "medailles",
    recompenses,
    objectif: recompenses.length ? null : (b.semaine as { moi?: unknown }).moi ?? null,
  });
}

// ── Les trophées personnels (élève inscrit par e-mail) ──
type Trophee = { id: string; emoji: string; titre: string; texte: string };

const PALIERS_JUSTES = [10, 50, 100, 250, 500, 1000, 2500, 5000];
const PALIERS_SUITE = [2, 3, 5, 7, 10, 15, 20, 30];
const PALIERS_FRUITS = [1, 3, 5, 10, 20, 40];

function palier(valeur: number, paliers: number[]) {
  const atteints = paliers.filter((p) => valeur >= p);
  return { atteint: atteints.at(-1) ?? null, prochain: paliers.find((p) => p > valeur) ?? null };
}

async function trophees(admin: ReturnType<typeof supabaseAdmin>, moi: string, classeEleve: string | null) {
  const seances: { score_sur_20: number | null; bonnes_reponses: number | null; nb_tentatives: number | null; classe: string | null; details: any; created_at: string }[] = [];
  for (let de = 0; de < 20_000; de += 1000) {
    const { data, error } = await admin
      .from("resultats_tutor")
      .select("score_sur_20, bonnes_reponses, nb_tentatives, classe, details, created_at")
      .eq("code_etablissement", ETABLISSEMENT_INDEPENDANT)
      .eq("code_utilisateur", moi)
      .order("created_at", { ascending: true })
      .range(de, de + 999);
    if (error || !data) break;
    seances.push(...(data as typeof seances));
    if (data.length < 1000) break;
  }

  const gagnes: Trophee[] = [];
  const prochains: (Trophee & { manque: number })[] = [];
  if (!seances.length) {
    prochains.push({ id: "premiere", emoji: "🚀", titre: "Première séance", texte: "Fais ta première séance au coach.", manque: 1 });
    return { gagnes, prochain: prochains[0], record: null };
  }
  gagnes.push({ id: "premiere", emoji: "🚀", titre: "Première séance", texte: `Le ${jourDe(seances[0].created_at).split("-").reverse().join("/")}` });

  // ✅ Bonnes réponses : tout le travail compte, entraînements compris.
  const justes = seances.reduce((a, s) => a + (Number(s.bonnes_reponses) || 0), 0);
  const pj = palier(justes, PALIERS_JUSTES);
  if (pj.atteint) gagnes.push({ id: "justes", emoji: "✅", titre: `${pj.atteint} bonnes réponses`, texte: `Tu en es à ${justes}.` });
  if (pj.prochain)
    prochains.push({ id: "justes", emoji: "✅", titre: `${pj.prochain} bonnes réponses`, texte: `Encore ${pj.prochain - justes} bonnes réponses.`, manque: (pj.prochain - justes) / pj.prochain });

  // 🔥 Jours de suite : sa plus longue série.
  const jours = [...new Set(seances.map((s) => jourDe(s.created_at)))].sort();
  let meilleure = 1;
  let serie = 1;
  for (let i = 1; i < jours.length; i++) {
    serie = Date.parse(jours[i]) - Date.parse(jours[i - 1]) === JOUR ? serie + 1 : 1;
    meilleure = Math.max(meilleure, serie);
  }
  const aujourdHui = jourDe(new Date().toISOString());
  const hier = jourDe(new Date(Date.now() - JOUR).toISOString());
  const enCours = jours.at(-1) === aujourdHui || jours.at(-1) === hier ? serie : 0;
  const ps = palier(meilleure, PALIERS_SUITE);
  if (ps.atteint) gagnes.push({ id: "suite", emoji: "🔥", titre: `${ps.atteint} jours de suite`, texte: `Ta plus longue série : ${meilleure} jours.` });
  if (ps.prochain) {
    const manque = ps.prochain - Math.max(enCours, 0);
    prochains.push({
      id: "suite",
      emoji: "🔥",
      titre: `${ps.prochain} jours de suite`,
      texte: enCours > 0 ? `Tu en es à ${enCours} : encore ${manque} jour${manque > 1 ? "s" : ""}.` : `Travaille ${ps.prochain} jours d'affilée.`,
      manque: manque / ps.prochain,
    });
  }

  // 🍎 Fruits du Jardin : un micro compris (3 essais ou plus, 80 % de justes).
  const micros: Record<string, { j: number; t: number }> = {};
  for (const s of seances)
    for (const [id, sc] of Object.entries((s.details?.microScores ?? {}) as Record<string, any>)) {
      const c = (micros[id] ??= { j: 0, t: 0 });
      c.t += Number(sc?.attempts) || 0;
      c.j += Number(sc?.success) || 0;
    }
  const fruits = Object.values(micros).filter((c) => c.t >= 3 && c.j / c.t >= 0.8).length;
  const pf = palier(fruits, PALIERS_FRUITS);
  if (pf.atteint) gagnes.push({ id: "fruits", emoji: "🍎", titre: `${pf.atteint} fruit${pf.atteint > 1 ? "s" : ""} au Jardin`, texte: `${fruits} micro${fruits > 1 ? "s" : ""} compris.` });
  if (pf.prochain) {
    const m = pf.prochain - fruits;
    prochains.push({ id: "fruits", emoji: "🍎", titre: `${pf.prochain} fruit${pf.prochain > 1 ? "s" : ""} au Jardin`, texte: `Encore ${m} micro${m > 1 ? "s" : ""} à réussir à 80 %.`, manque: m / pf.prochain });
  }

  // ⭐ Record : sa meilleure semaine (moyenne pondérée, 10 questions au moins,
  // séances de sa classe seulement, comme sa moyenne).
  const semaines = new Map<string, { j: number; q: number }>();
  for (const s of seances) {
    if (!compteDansLaMoyenne(s, classeEleve)) continue;
    const q = Number(s.nb_tentatives) || 0;
    if (!q) continue;
    const d = new Date(Date.parse(jourDe(s.created_at)));
    d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); // le lundi
    const k = d.toISOString().slice(0, 10);
    const c = semaines.get(k) ?? { j: 0, q: 0 };
    c.j += Number(s.bonnes_reponses) || 0;
    c.q += q;
    semaines.set(k, c);
  }
  let record: { note: string; semaine: string } | null = null;
  let best = -1;
  for (const [k, c] of semaines) {
    if (c.q < 10) continue;
    const n = Math.round((c.j / c.q) * 200) / 10;
    if (n >= best) {
      best = n;
      record = { note: `${virgule(n)}/20`, semaine: k.split("-").reverse().join("/") };
    }
  }

  // Un record sous 10/20 décourage plus qu'il n'aide : on le tait.
  if (best < 10) record = null;

  // Le prochain trophée : le plus proche (en proportion de ce qui reste).
  prochains.sort((a, b) => a.manque - b.manque);
  return { gagnes, prochain: prochains[0] ?? null, record };
}
