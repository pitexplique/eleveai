// Statistiques agrégées pour le dashboard admin (/admin/dashboard).
// Protégée par le cookie admin signé (lib/server/adminAuth) : réservée au
// fondateur + principal pour l'instant. Lecture service-role (RLS actif).
//
// Périmètre via ?etab= :
//   - absent ou "all"     -> toute la plateforme (vue globale, défaut)
//   - <code_etablissement> -> un collège précis
//   - "INDEPENDANT"        -> comptes email « sans collège » (users_email)
//
// Agrège : comptes (acces_etablissement + users_email), 8 tables resultats_*,
// retours_eleves. Renvoie KPIs, répartition par module, engagement 7 jours,
// derniers avis, et la liste des établissements pour le sélecteur.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { detecterIA } from "@/lib/detection-ia";

export const dynamic = "force-dynamic";

const JOUR_MS = 24 * 60 * 60 * 1000;

// Les tables de résultats, regroupées par module pour le dashboard.
// Les 4 parcours comptent ensemble dans le module « parcours ».
//
// ⚠️ UNE TABLE QUI N'EST PAS ICI N'EXISTE PAS POUR L'ADMINISTRATION. Les
// épreuves blanches de l'évaluation nationale y ont manqué du 01/08 au 11/08 :
// elles enregistraient consciencieusement en base et n'apparaissaient nulle
// part — ni dans les KPI, ni dans « évaluation par module », ni dans
// l'engagement. Ajouter la table de résultats sans ajouter sa ligne ici, c'est
// se rendre aveugle à ce qu'on vient de construire.
const TABLES_RESULTATS: { table: string; module: string; hasScore: boolean }[] = [
  { table: "resultats_parcours_maths", module: "parcours", hasScore: true },
  { table: "resultats_parcours_english", module: "parcours", hasScore: true },
  { table: "resultats_parcours_espagnol", module: "parcours", hasScore: true },
  { table: "resultats_parcours_francais", module: "parcours", hasScore: true },
  { table: "resultats_calcul_rapide", module: "calcul", hasScore: true },
  { table: "resultats_defis_jour", module: "defis", hasScore: true },
  { table: "resultats_english_maths", module: "english", hasScore: true },
  { table: "resultats_dictee", module: "dictee", hasScore: true },
  { table: "resultats_langue_du_jour", module: "langue", hasScore: true },
  { table: "resultats_tutor", module: "coach", hasScore: false },
  {
    table: "resultats_evaluation_nationale",
    module: "evaluation",
    hasScore: true,
  },
];

type ResultRow = {
  module: string;
  code_etablissement: string | null;
  code_utilisateur: string | null;
  created_at: string;
  pct: number | null; // pourcentage 0-100 si calculable, sinon null
};

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Récupère toutes les lignes d'une table (Supabase plafonne à 1000/requête).
// Tolère l'absence de table (parcours optionnels) en renvoyant [].
async function fetchAll(
  supabase: ReturnType<typeof serviceClient>,
  table: string,
  select: string,
  etab?: string
): Promise<Record<string, unknown>[]> {
  const out: Record<string, unknown>[] = [];
  const LOT = 1000;
  const MAX = 50000;
  for (let start = 0; start < MAX; start += LOT) {
    let q = supabase
      .from(table)
      .select(select)
      .order("created_at", { ascending: false })
      .range(start, start + LOT - 1);
    if (etab) q = q.eq("code_etablissement", etab);

    const { data, error } = await q;
    if (error) return out; // table absente ou erreur : on ignore en silence
    out.push(...((data ?? []) as unknown as Record<string, unknown>[]));
    if (!data || data.length < LOT) break;
  }
  return out;
}

// Clé jour en heure LOCALE du serveur (pas UTC), pour que les buckets
// d'engagement coïncident avec les KPIs « aujourd'hui ».
function localDay(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function toPct(score: unknown, total: unknown): number | null {
  const s = Number(score);
  const t = Number(total);
  if (!Number.isFinite(s) || !Number.isFinite(t) || t <= 0) return null;
  return Math.round((s / t) * 100);
}

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (!verifyAdminCookieValue(cookieStore.get("admin-auth")?.value)) {
    return NextResponse.json(
      { ok: false, error: "Accès réservé à l'administration." },
      { status: 401 }
    );
  }

  const supabase = serviceClient();
  const url = new URL(req.url);
  const etabParam = (url.searchParams.get("etab") ?? "all").trim();
  const scope = etabParam === "" ? "all" : etabParam; // "all" | code | "INDEPENDANT"
  const isGlobal = scope === "all";
  const isIndependant = scope === "INDEPENDANT";
  // Filtre établissement appliqué aux requêtes (undefined = pas de filtre).
  const etabFilter = isGlobal ? undefined : scope;

  // 1) Comptes établissement (toujours chargés en entier pour le sélecteur).
  const accesAll = await fetchAll(
    supabase,
    "acces_etablissement",
    "code_etablissement, type_utilisateur, actif, classe"
  );

  // 2) Comptes email (table sans code établissement = « sans collège »).
  const usersEmail = await fetchAll(
    supabase,
    "users_email",
    "type_utilisateur, plan, source, accepte_newsletter"
  );

  // 3) Résultats (8 tables), filtrés par établissement selon le périmètre.
  const resultsByTable = await Promise.all(
    TABLES_RESULTATS.map((t) =>
      fetchAll(
        supabase,
        t.table,
        t.hasScore
          ? "code_etablissement, code_utilisateur, score, total, created_at"
          : "code_etablissement, code_utilisateur, score_sur_20, created_at",
        etabFilter
      )
    )
  );

  const rows: ResultRow[] = [];
  resultsByTable.forEach((data, i) => {
    const meta = TABLES_RESULTATS[i];
    for (const r of data) {
      rows.push({
        module: meta.module,
        code_etablissement: (r.code_etablissement as string) ?? null,
        code_utilisateur: (r.code_utilisateur as string) ?? null,
        created_at: r.created_at as string,
        pct: meta.hasScore
          ? toPct(r.score, r.total)
          : toPct(r.score_sur_20, 20),
      });
    }
  });

  // 4) Retours élèves (avis), filtrés par périmètre.
  const retours = await fetchAll(
    supabase,
    "retours_eleves",
    "id, type, note, message, prenom, classe, code_etablissement, traite, created_at, reponse, reponse_at",
    etabFilter
  );

  // 5) Connexions (journal de login) — source des « élèves connectés ».
  const connexions = await fetchAll(
    supabase,
    "connexions",
    "code_utilisateur, created_at",
    etabFilter
  );

  // Derniers connectés : petite requête DÉDIÉE (12 lignes), isolée des
  // compteurs ci-dessus. Ainsi, si une colonne d'affichage manquait en base,
  // seule cette liste serait vide — les chiffres « connectés » resteraient bons.
  let derniersConnectesRaw: Record<string, unknown>[] = [];
  {
    let q = supabase
      .from("connexions")
      .select("code_utilisateur, nom, classe, type_utilisateur, source, created_at")
      .order("created_at", { ascending: false })
      .limit(12);
    if (etabFilter) q = q.eq("code_etablissement", etabFilter);
    const { data } = await q;
    derniersConnectesRaw = (data ?? []) as Record<string, unknown>[];
  }

  // Navigation AGRÉGÉE (« où vont les élèves ») depuis pages_vues. Sans identité :
  // on n'a que la section + le code établissement. Table optionnelle → si absente,
  // fetchAll renvoie [] et l'encart s'affiche vide (pas d'erreur).
  // select '*' (et pas 'page, pays, created_at') pour rester robuste AVANT la
  // migration : si la colonne `pays` n'existe pas encore, '*' l'ignore au lieu
  // de renvoyer une erreur qui viderait aussi l'encart navigation.
  const pagesVues = await fetchAll(supabase, "pages_vues", "*", etabFilter);

  // ---- Sélecteur d'établissements (depuis acces_etablissement) ----
  const etabMap = new Map<string, { eleves: number; profs: number }>();
  for (const a of accesAll) {
    const code = (a.code_etablissement as string) ?? "";
    if (!code) continue;
    const e = etabMap.get(code) ?? { eleves: 0, profs: 0 };
    const type = a.type_utilisateur as string;
    if (type === "eleve") e.eleves += 1;
    else e.profs += 1; // prof + principal
    etabMap.set(code, e);
  }
  const etablissements = Array.from(etabMap.entries())
    .map(([code, c]) => ({ code, ...c }))
    .sort((a, b) => a.code.localeCompare(b.code));

  // ---- Comptes du périmètre ----
  const accesScope = isGlobal
    ? accesAll
    : isIndependant
      ? []
      : accesAll.filter((a) => a.code_etablissement === scope);

  const comptesEtab = {
    eleves: accesScope.filter((a) => a.type_utilisateur === "eleve").length,
    profs: accesScope.filter((a) => a.type_utilisateur === "prof").length,
    principaux: accesScope.filter((a) => a.type_utilisateur === "principal")
      .length,
  };

  // Comptes email comptés en global et en « sans collège » uniquement.
  const inclureEmail = isGlobal || isIndependant;
  const comptesEmail = {
    total: inclureEmail ? usersEmail.length : 0,
    paid: inclureEmail
      ? usersEmail.filter((u) => u.plan === "paid").length
      : 0,
    eleves: inclureEmail
      ? usersEmail.filter((u) => u.type_utilisateur === "eleve").length
      : 0,
    // Inscriptions venues du cahier de vacances (?from=cahier → source).
    cahier: inclureEmail
      ? usersEmail.filter((u) => u.source === "cahier-vacances").length
      : 0,
    // Consentements newsletter (utile pour l'envoi des nouveautés).
    newsletter: inclureEmail
      ? usersEmail.filter((u) => u.accepte_newsletter === true).length
      : 0,
  };

  const nbEtablissements = isGlobal ? etablissements.length : 1;

  // ---- Activités & temporalité ----
  const now = Date.now();
  const since7 = now - 7 * JOUR_MS;
  const since30 = now - 30 * JOUR_MS;
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);
  const startTodayMs = startToday.getTime();

  let activitesTotal = 0;
  let activitesAujourdhui = 0;
  let activites7j = 0;
  const MODULE_KEYS = ["parcours", "calcul", "defis", "english", "dictee", "langue", "coach"];
  const parModule: Record<string, number> = Object.fromEntries(
    MODULE_KEYS.map((k) => [k, 0])
  );
  // Somme et nombre des % par module, pour la moyenne (évaluation par module).
  const moduleScoreSum: Record<string, number> = Object.fromEntries(
    MODULE_KEYS.map((k) => [k, 0])
  );
  const moduleScoreN: Record<string, number> = Object.fromEntries(
    MODULE_KEYS.map((k) => [k, 0])
  );
  const pctList: number[] = [];

  // --- Activités (depuis les résultats) : volume, modules, moyenne ---
  for (const r of rows) {
    activitesTotal += 1;
    parModule[r.module] = (parModule[r.module] ?? 0) + 1;
    if (r.pct !== null) {
      pctList.push(r.pct);
      moduleScoreSum[r.module] = (moduleScoreSum[r.module] ?? 0) + r.pct;
      moduleScoreN[r.module] = (moduleScoreN[r.module] ?? 0) + 1;
    }

    const t = new Date(r.created_at).getTime();
    if (Number.isFinite(t)) {
      if (t >= startTodayMs) activitesAujourdhui += 1;
      if (t >= since7) activites7j += 1;
    }
  }

  // Moyenne (%) par module : null si aucune activité notée.
  const moyenneParModule: Record<string, number | null> = Object.fromEntries(
    MODULE_KEYS.map((k) => [
      k,
      moduleScoreN[k] > 0 ? Math.round(moduleScoreSum[k] / moduleScoreN[k]) : null,
    ])
  );

  // --- Connexions (depuis le journal de login) : élèves connectés ---
  // Engagement = nb d'élèves DISTINCTS connectés par jour (30 j, le client
  // affiche 7 ou 30). + ensembles distincts sur 7 / 30 j glissants.
  const engagement: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(startTodayMs - i * JOUR_MS);
    engagement.push({ date: localDay(d), count: 0 });
  }
  const engIndex = new Map(engagement.map((e, idx) => [e.date, idx]));
  const engSets: Set<string>[] = engagement.map(() => new Set<string>());
  const connectes7 = new Set<string>();
  const connectes30 = new Set<string>();
  const connectesAujourdSet = new Set<string>();

  for (const c of connexions) {
    const code = c.code_utilisateur as string | null;
    if (!code) continue;
    const t = new Date(c.created_at as string).getTime();
    if (!Number.isFinite(t)) continue;
    if (t >= startTodayMs) connectesAujourdSet.add(code);
    if (t >= since7) connectes7.add(code);
    if (t >= since30) connectes30.add(code);
    const idx = engIndex.get(localDay(new Date(c.created_at as string)));
    if (idx !== undefined) engSets[idx].add(code);
  }
  engagement.forEach((e, idx) => {
    e.count = engSets[idx].size;
  });

  // ---- Derniers connectés (login réel, triés du plus récent) ----
  const derniersConnectes = derniersConnectesRaw.map((c) => ({
    code_utilisateur: (c.code_utilisateur as string) ?? null,
    nom: (c.nom as string) ?? null,
    classe: (c.classe as string) ?? null,
    type: (c.type_utilisateur as string) ?? null,
    source: (c.source as string) ?? null,
    created_at: c.created_at as string,
  }));

  // Élèves DISTINCTS ayant enregistré au moins un résultat (≠ « connectés » :
  // ici c'est « ont fait et sauvegardé un exercice », pas « se sont loggés »).
  const elevesAvecResultats = new Set(
    rows.map((r) => r.code_utilisateur).filter((c): c is string => !!c)
  ).size;

  // Navigation agrégée : top des sections visitées (30 j), avec le sous-total 7 j.
  const nav30 = new Map<string, number>();
  const nav7 = new Map<string, number>();
  for (const p of pagesVues) {
    const page = p.page as string;
    if (!page) continue;
    const t = new Date(p.created_at as string).getTime();
    if (!Number.isFinite(t)) continue;
    if (t >= since30) nav30.set(page, (nav30.get(page) ?? 0) + 1);
    if (t >= since7) nav7.set(page, (nav7.get(page) ?? 0) + 1);
  }
  const navigation = {
    total30: Array.from(nav30.values()).reduce((s, n) => s + n, 0),
    topPages: Array.from(nav30.entries())
      .map(([page, count]) => ({ page, count, count7: nav7.get(page) ?? 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12),
  };

  // ---- Rituels de langue : usage « connecté OU NON » (demande Frédéric 25/07) ----
  // Non connecté = pas d'identité en base (le rituel vit en localStorage) → on
  // compte les OUVERTURES des pages via pages_vues (tout le monde). Le connecté,
  // lui, est un compte d'ÉLÈVES DISTINCTS ayant enregistré un résultat.
  const PAGES_LANGUE: Record<string, string> = {
    "/anglais-du-jour": "anglais",
    "/espagnol-du-jour": "espagnol",
  };
  const vuesLangue: Record<string, { vues30: number; vues7: number }> = {
    anglais: { vues30: 0, vues7: 0 },
    espagnol: { vues30: 0, vues7: 0 },
  };
  for (const p of pagesVues) {
    const langue = PAGES_LANGUE[p.page as string];
    if (!langue) continue;
    const t = new Date(p.created_at as string).getTime();
    if (!Number.isFinite(t)) continue;
    if (t >= since30) vuesLangue[langue].vues30 += 1;
    if (t >= since7) vuesLangue[langue].vues7 += 1;
  }
  // Élèves connectés DISTINCTS par langue : il faut la colonne `langue`, absente
  // des `rows` (select minimal) → petite requête dédiée sur les 30 j.
  const langueRows = await fetchAll(
    supabase,
    "resultats_langue_du_jour",
    "code_utilisateur, langue, created_at",
    etabFilter
  );
  const connectesLangue: Record<string, Set<string>> = {
    anglais: new Set(),
    espagnol: new Set(),
  };
  for (const r of langueRows) {
    const langue = r.langue as string;
    const code = r.code_utilisateur as string | null;
    if (!code || !connectesLangue[langue]) continue;
    const t = new Date(r.created_at as string).getTime();
    if (Number.isFinite(t) && t >= since30) connectesLangue[langue].add(code);
  }
  const rituelsLangue = {
    vues30: vuesLangue.anglais.vues30 + vuesLangue.espagnol.vues30,
    vues7: vuesLangue.anglais.vues7 + vuesLangue.espagnol.vues7,
    connectes: new Set([
      ...connectesLangue.anglais,
      ...connectesLangue.espagnol,
    ]).size,
    parLangue: {
      anglais: { ...vuesLangue.anglais, connectes: connectesLangue.anglais.size },
      espagnol: { ...vuesLangue.espagnol, connectes: connectesLangue.espagnol.size },
    },
  };

  // Répartition par PAYS (code ISO x-vercel-ip-country), 30 j + sous-total 7 j,
  // ET top des pages PAR pays : on peut lire, ex., sur quoi atterrissent les US
  // — la vue que Vercel réserve au plan Pro. '??' = pays inconnu (dev, avant
  // migration, ou en-tête absent).
  const pays30 = new Map<string, number>();
  const pays7 = new Map<string, number>();
  const pagesParPaysMap = new Map<string, Map<string, number>>();
  for (const p of pagesVues) {
    const pays = ((p.pays as string) || "??").toUpperCase();
    const page = p.page as string;
    const t = new Date(p.created_at as string).getTime();
    if (!Number.isFinite(t)) continue;
    if (t >= since30) {
      pays30.set(pays, (pays30.get(pays) ?? 0) + 1);
      if (page) {
        let m = pagesParPaysMap.get(pays);
        if (!m) {
          m = new Map<string, number>();
          pagesParPaysMap.set(pays, m);
        }
        m.set(page, (m.get(page) ?? 0) + 1);
      }
    }
    if (t >= since7) pays7.set(pays, (pays7.get(pays) ?? 0) + 1);
  }
  // Les vues SANS pays ('??') sont des lignes HISTORIQUES (écrites avant l'ajout
  // de la colonne `pays`) ou du dev local. Laissées dans le calcul, elles
  // écrasaient le classement (63 % d'« Inconnu ») et faussaient CHAQUE
  // pourcentage. On les sort du classement et on les expose à part, en note.
  const inconnus30 = pays30.get("??") ?? 0;
  const inconnus7 = pays7.get("??") ?? 0;
  pays30.delete("??");
  pays7.delete("??");

  const geo = {
    total30: Array.from(pays30.values()).reduce((s, n) => s + n, 0),
    inconnus30,
    inconnus7,
    parPays: Array.from(pays30.entries())
      .map(([pays, count]) => ({ pays, count, count7: pays7.get(pays) ?? 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15),
    topPagesParPays: Object.fromEntries(
      Array.from(pagesParPaysMap.entries()).map(([pays, m]) => [
        pays,
        Array.from(m.entries())
          .map(([page, count]) => ({ page, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8),
      ])
    ) as Record<string, { page: string; count: number }[]>,
  };

  const moyenneGenerale =
    pctList.length > 0
      ? Math.round(pctList.reduce((s, p) => s + p, 0) / pctList.length)
      : null;

  // ---- Avis ----
  const notes = retours
    .map((r) => Number(r.note))
    .filter((n) => Number.isFinite(n) && n > 0);
  const avis = {
    total: retours.length,
    nonTraites: retours.filter((r) => r.traite === false).length,
    noteMoyenne:
      notes.length > 0
        ? Math.round((notes.reduce((s, n) => s + n, 0) / notes.length) * 10) / 10
        : null,
    derniers: retours.slice(0, 8).map((r) => {
      const det = detecterIA(r.message as string | null);
      return {
        id: r.id,
        type: r.type,
        note: r.note,
        message: r.message,
        prenom: r.prenom,
        classe: r.classe,
        code_etablissement: r.code_etablissement,
        created_at: r.created_at,
        reponse: r.reponse ?? null,
        reponse_at: r.reponse_at ?? null,
        suspectIA: det.suspect,
        raisonIA: det.raison,
      };
    }),
  };

  return NextResponse.json({
    ok: true,
    scope,
    etablissements,
    kpis: {
      comptesEtab,
      comptesEmail,
      nbEtablissements,
      activitesTotal,
      activitesAujourdhui,
      activites7j,
      elevesAvecResultats,
      moyenneGenerale,
      connectesAujourdhui: connectesAujourdSet.size,
      connectes7j: connectes7.size,
      connectes30j: connectes30.size,
    },
    parModule,
    moyenneParModule,
    engagement,
    derniersConnectes,
    navigation,
    rituelsLangue,
    geo,
    avis,
  });
}
