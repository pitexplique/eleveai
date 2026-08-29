// lib/profil-eleve/computeProfil.ts
//
// Calcule le profil d'un élève (Niveau + Comportement + recommandations) et
// l'upsert dans la table `profil_eleve` (snapshot par élève, comme bulletins).
// Recalculé à chaque sauvegarde de résultat (app/api/resultats) et lisible via
// /api/profil-eleve.
//
// Choix d'architecture (cf. réflexion « matrice profil élève ») :
//   - La maîtrise vivante du coach est ÉPHÉMÈRE (en mémoire de session). On la
//     RECONSTRUIT ici depuis l'historique PERSISTÉ `resultats_tutor` (seule table
//     avec notion_id + score_sur_20), pondérée par la récence → durable.
//   - Recommandations RULE-BASED : pas d'appel IA externe (données de mineurs →
//     souveraineté RGPD), déterministe, explicable, coût nul.
//
// Ne doit être importé que côté serveur (clé service role).

import "server-only";
import { createClient } from "@supabase/supabase-js";
import { prenomCourt } from "@/lib/prenom";
import { niveauPublic } from "@/lib/classe";
import { fetchCatalogue, type ActionCatalogue } from "@/lib/server/catalogue";
import type {
  ProfilEleve,
  NotionMastery,
  MatiereMastery,
  CarteReco,
  RecoDuJour,
  StatutEngagement,
} from "./types";

const JOUR = 24 * 60 * 60 * 1000;

// Demi-vie de la pondération par récence : un passage vieux de 30 jours pèse
// moitié moins qu'un passage d'aujourd'hui (la maîtrise récente prime).
const DEMI_VIE_JOURS = 30;

// Seuils de maîtrise (0–100).
const SEUIL_FAIBLE = 55; // en dessous → à renforcer
const SEUIL_FORT = 80; // au dessus → point fort

// P0 « Ré-engager » : seuil d'absence (jours). Monté à 14 j (fondateur, 05/07/2026)
// car 7 j faisait basculer presque tous les élèves sur « reprendre le rythme »
// pendant les vacances (un test live sur Marina l'a confirmé) : on laisse deux
// semaines avant de « ré-engager », le temps reste en Progresser/Renforcer.
// Réglable ici, à la main du prof.
const SEUIL_ABSENCE_JOURS = 14;

// Série « vivante » à partir de ce nombre de jours d'affilée (sinon pas d'enjeu).
const SERIE_MINI = 2;

// ⚠️ Drapeau SAISONNIER : true pendant les vacances (repasser à false à la
// rentrée — cf. checklist maintenance « fraîcheur des contenus saisonniers »).
// Repassé à FALSE le 29/08/2026 : la rentrée de La Réunion est mi-août, et le
// drapeau était resté levé. Tant qu'il l'était, le 🧭 sortait le cahier de
// vacances un jour sur sept à chaque élève, en pleine période de cours.
// ⚠️ L'EFFET EST DIFFÉRÉ : /api/profil-eleve sert le SNAPSHOT `profil_eleve`
// déjà calculé, et ne le recalcule que s'il n'existe pas. Les profils écrits
// avant aujourd'hui gardent donc leur reco jusqu'à la prochaine activité de
// l'élève — c'est elle qui déclenche mettreAJourProfil().
const EN_VACANCES = false;

// En vacances, le CAHIER (📥 hors-ligne) apparaît dans le 🧭 — PAS tous les jours,
// et JAMAIS pour tout le monde le même jour : chaque élève a SON jour de la semaine
// (réparti par hachage de son code), et ne le voit donc qu'~1 jour sur 7. Le reste
// du temps, le 🧭 explore une voie neuve (anti-bulle préservé).
// (⚠️ ancienne « bouée par engagement » RETIRÉE : en vacances l'engagement chute
//  pour presque tous → elle sortait le cahier à quasi tout le monde.)
function jourCahierEleve(code: string): number {
  let h = 0;
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) % 7;
  return h; // 0–6, jour de la semaine propre à cet élève
}

// Tables scannées pour l'ENGAGEMENT (created_at seulement). resultats_tutor y est
// aussi mais on le charge à part (pour la maîtrise), on ne le redouble donc pas.
// La valeur = le `type` du catalogue correspondant (sert aux formats déjà touchés).
const TABLES_ACTIVITE: Record<string, string> = {
  resultats_parcours_maths: "parcours",
  resultats_parcours_english: "parcours",
  resultats_parcours_espagnol: "parcours",
  resultats_parcours_francais: "parcours",
  resultats_parcours_ia: "parcours",
  resultats_calcul_rapide: "calcul-rapide",
  resultats_defis_jour: "defi",
  resultats_english_maths: "autre",
  resultats_dictee: "dictee",
};

type TutorRow = {
  matiere: string;
  notion_id: string;
  score_sur_20: number;
  t: number; // epoch ms
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
function jourCle(t: number): string {
  return new Date(t).toISOString().slice(0, 10);
}

// notion_id « proportionnalite_tableau » → « Proportionnalite tableau ».
// Libellé lisible faute de dictionnaire de notions côté serveur (rule-based v1).
function libelleNotion(notionId: string): string {
  const s = notionId.replace(/_/g, " ").trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : notionId;
}

// Lit tout l'historique coach (resultats_tutor) d'un élève : la SEULE source
// avec une granularité par notion (notion_id + score_sur_20).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchTutor(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  codeEtablissement: string,
  codeUtilisateur: string
): Promise<TutorRow[]> {
  const { data, error } = await supabase
    .from("resultats_tutor")
    .select("matiere, notion_id, score_sur_20, created_at")
    .eq("code_etablissement", codeEtablissement)
    .eq("code_utilisateur", codeUtilisateur)
    .order("created_at", { ascending: false })
    .limit(5000);
  if (error || !data) return [];

  const out: TutorRow[] = [];
  for (const r of data as Record<string, unknown>[]) {
    const matiere = String(r.matiere ?? "").trim();
    const notion_id = String(r.notion_id ?? "").trim();
    const score = Number(r.score_sur_20);
    const t = new Date(r.created_at as string).getTime();
    if (!matiere || !notion_id) continue;
    if (!Number.isFinite(score) || !Number.isFinite(t)) continue;
    out.push({ matiere, notion_id, score_sur_20: clamp(score, 0, 20), t });
  }
  return out;
}

// Récupère les timestamps d'activité (created_at) de toutes les autres tables
// de résultats + les connexions → engagement (jours actifs, série). Renvoie aussi
// l'ensemble des `type` de catalogue déjà pratiqués (formats touchés → exploration).
async function fetchActiviteTimestamps(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  codeEtablissement: string,
  codeUtilisateur: string
): Promise<{ ts: number[]; typesTouches: Set<string> }> {
  const tables = [...Object.keys(TABLES_ACTIVITE), "connexions"];
  const lots = await Promise.all(
    tables.map(async (table) => {
      const { data, error } = await supabase
        .from(table)
        .select("created_at")
        .eq("code_etablissement", codeEtablissement)
        .eq("code_utilisateur", codeUtilisateur)
        .order("created_at", { ascending: false })
        .limit(2000);
      if (error || !data) return { table, ts: [] as number[] };
      const ts = (data as Record<string, unknown>[])
        .map((r) => new Date(r.created_at as string).getTime())
        .filter((t) => Number.isFinite(t));
      return { table, ts };
    })
  );

  const typesTouches = new Set<string>();
  for (const { table, ts } of lots) {
    if (ts.length > 0 && TABLES_ACTIVITE[table]) typesTouches.add(TABLES_ACTIVITE[table]);
  }
  return { ts: lots.flatMap((l) => l.ts), typesTouches };
}

// Maîtrise par notion = moyenne des score_sur_20 (ramenés /100) pondérée par la
// récence (demi-vie DEMI_VIE_JOURS). Regroupe par matiere::notion_id.
function calculerMaitrise(rows: TutorRow[], now: number): NotionMastery[] {
  const groupes = new Map<string, TutorRow[]>();
  for (const r of rows) {
    const cle = `${r.matiere}::${r.notion_id}`;
    const arr = groupes.get(cle) ?? [];
    arr.push(r);
    groupes.set(cle, arr);
  }

  const notions: NotionMastery[] = [];
  for (const [cle, list] of groupes) {
    const [matiere, notionId] = cle.split("::");
    let sommeP = 0;
    let sommeW = 0;
    let dernier = 0;
    for (const r of list) {
      const ageJours = Math.max(0, (now - r.t) / JOUR);
      const w = Math.pow(0.5, ageJours / DEMI_VIE_JOURS);
      sommeP += w * (r.score_sur_20 * 5); // /20 → /100
      sommeW += w;
      if (r.t > dernier) dernier = r.t;
    }
    if (sommeW <= 0) continue;
    notions.push({
      matiere,
      notionId,
      libelle: libelleNotion(notionId),
      mastery: Math.round(clamp(sommeP / sommeW, 0, 100)),
      nb: list.length,
      dernier: dernier ? new Date(dernier).toISOString() : null,
    });
  }
  return notions;
}

function agregerParMatiere(notions: NotionMastery[]): MatiereMastery[] {
  const parMat = new Map<string, NotionMastery[]>();
  for (const n of notions) {
    const arr = parMat.get(n.matiere) ?? [];
    arr.push(n);
    parMat.set(n.matiere, arr);
  }
  return [...parMat.entries()]
    .map(([matiere, list]) => ({
      matiere,
      mastery: Math.round(
        list.reduce((s, n) => s + n.mastery, 0) / list.length
      ),
      nb: list.reduce((s, n) => s + n.nb, 0),
    }))
    .sort((a, b) => (b.mastery ?? -1) - (a.mastery ?? -1));
}

function statutEngagement(joursDepuis: number | null): StatutEngagement {
  if (joursDepuis === null) return "nouveau";
  if (joursDepuis <= 7) return "actif";
  if (joursDepuis <= 21) return "ralenti";
  return "inactif";
}

// Score d'engagement 0–100, modèle « attaque rapide / relâche lente » (enveloppe) :
// chaque jour ACTIF fait bondir le score vers 100 (comble ATTAQUE % de l'écart) ;
// chaque jour VIDE l'érode par décroissance exponentielle (demi-vie DEMI_VIE).
// → la régularité paie vite, un oubli ne casse pas tout, une vraie coupure
// redescend en pente douce. MESURE, pas récompense (non addictif, transparent).
// Ex. 3 j d'affilée ≈ 88 ; 1 oubli ≈ −5 ; 2 sem d'arrêt ≈ 44 ; 1 mois ≈ 20.
const ENGAGEMENT_ATTAQUE = 0.5; // part de l'écart au max comblée par jour actif
const ENGAGEMENT_DEMI_VIE_JOURS = 14; // demi-vie de l'érosion quand on lâche
const ENGAGEMENT_FENETRE_JOURS = 120; // au-delà, la contribution est négligeable

function calculerEngagement(joursActifs: Set<string>, now: number): number {
  if (joursActifs.size === 0) return 0;
  const decroissance = Math.pow(0.5, 1 / ENGAGEMENT_DEMI_VIE_JOURS);
  const cle = (t: number) => new Date(t).toISOString().slice(0, 10);
  let e = 0;
  // Du plus ancien jour de la fenêtre jusqu'à aujourd'hui.
  for (let i = ENGAGEMENT_FENETRE_JOURS; i >= 0; i--) {
    if (joursActifs.has(cle(now - i * JOUR))) e += (100 - e) * ENGAGEMENT_ATTAQUE;
    else e *= decroissance;
  }
  return Math.round(e);
}

// Série = jours d'affilée avec activité, finissant AUJOURD'HUI ou HIER (une série
// dont le dernier jour est hier est encore « sauvable » aujourd'hui). Renvoie aussi
// si l'élève a déjà agi aujourd'hui (→ inutile de lui proposer de sauver la série).
function calculerSerie(
  joursActifs: Set<string>,
  now: number
): { serie: number; faitAujourdhui: boolean } {
  const cle = (t: number) => new Date(t).toISOString().slice(0, 10);
  const faitAujourdhui = joursActifs.has(cle(now));
  // Point de départ : aujourd'hui si actif, sinon hier si actif, sinon série nulle.
  let curseur = now;
  if (!faitAujourdhui) {
    if (!joursActifs.has(cle(now - JOUR))) return { serie: 0, faitAujourdhui };
    curseur = now - JOUR;
  }
  let serie = 0;
  while (joursActifs.has(cle(curseur))) {
    serie++;
    curseur -= JOUR;
  }
  return { serie, faitAujourdhui };
}

// ── Sélection dans le catalogue (les règles filtrent par ÉTIQUETTES) ───────────
const actifs = (cat: ActionCatalogue[]) => cat.filter((a) => a.actif);

// Une action précise par son id (si active) — ex. dictée, cahier de vacances.
function actionParId(cat: ActionCatalogue[], id: string): ActionCatalogue | null {
  return actifs(cat).find((a) => a.id === id) ?? null;
}

// Action courte + quotidienne la plus ATTRAYANTE → victoire facile/fun (P0, P1).
function actionCourteFun(cat: ActionCatalogue[]): ActionCatalogue | null {
  return (
    actifs(cat)
      .filter((a) => a.duree === "court" && a.rythme === "quotidien")
      .sort((a, b) => b.attrait - a.attrait)[0] ?? null
  );
}

// Meilleure action de démarrage (P5, cold-start) = valeur × intérêt max.
function actionDefaut(cat: ActionCatalogue[]): ActionCatalogue | null {
  return actifs(cat).sort((a, b) => b.valeur_interet - a.valeur_interet)[0] ?? null;
}

// Exploration (🧭 P4) : une voie NEUVE = matière cœur jamais travaillée (via coach)
// OU format jamais essayé, hors matière de la carte principale. On priorise une
// matière cœur neuve, puis on départage par valeur × intérêt (« amené par un
// format aimé »).
function actionExplore(
  cat: ActionCatalogue[],
  matieresTouchees: Set<string>,
  typesTouches: Set<string>,
  exclureMatiere: string | undefined
): ActionCatalogue | null {
  const coeur = new Set(MATIERES_COEUR);
  const estMatiereNeuve = (a: ActionCatalogue) =>
    coeur.has(a.matiere) && !matieresTouchees.has(a.matiere);
  const candidats = actifs(cat).filter(
    (a) =>
      a.matiere !== exclureMatiere &&
      (estMatiereNeuve(a) || !typesTouches.has(a.type))
  );
  return (
    candidats.sort((a, b) => {
      const an = estMatiereNeuve(a) ? 1 : 0;
      const bn = estMatiereNeuve(b) ? 1 : 0;
      if (an !== bn) return bn - an;
      return b.valeur_interet - a.valeur_interet;
    })[0] ?? null
  );
}

// Coachs de LANGUES : niveau CECRL (a1…c1). Les autres coachs : niveau scolaire
// (6e, cm2…). On n'attache un ?classe= au lien QUE s'il correspond au système du
// coach — sinon on l'omet (le coach demandera/reprendra le niveau lui-même).
// Évite le piège « espagnol?classe=5e » ou « maths?classe=a1 ».
const LANGUES_CECRL = new Set(["anglais", "espagnol", "ia"]);
function niveauPourCoach(matiere: string, niveau: string | null): string | null {
  if (!niveau) return null;
  const estCECRL = /^[abc][12]$/.test(niveau);
  return LANGUES_CECRL.has(matiere) === estCECRL ? niveau : null;
}

// Lien d'une action ; ajoute ?classe= pour les coachs (atterrir au bon niveau).
function lienAction(a: ActionCatalogue, niveau: string | null): string {
  const n = niveauPourCoach(a.matiere, niveau);
  if (a.route.startsWith("/coach-ia/") && n) {
    return `${a.route}?classe=${encodeURIComponent(n)}`;
  }
  return a.route;
}

// Matières « cœur » ayant un coach dédié, dans l'ordre où on les propose à
// l'exploration. (economie existe mais reste secondaire → hors liste explo.)
const MATIERES_COEUR = ["maths", "francais", "anglais", "espagnol", "ia"];
const LABEL_MATIERE: Record<string, string> = {
  maths: "Maths",
  francais: "Français",
  anglais: "Anglais",
  espagnol: "Espagnol",
  ia: "IA",
  economie: "Économie",
};
function labelMatiere(m: string): string {
  return LABEL_MATIERE[m] ?? m.charAt(0).toUpperCase() + m.slice(1);
}

// Lien vers le coach d'une matière. `niveau` est DÉJÀ normalisé (ex. « 6e »,
// « cm2 ») ; on le passe en ?classe= comme l'accueil, pour atterrir au bon niveau.
function lienCoach(matiere: string, niveau: string | null): string {
  const n = niveauPourCoach(matiere, niveau);
  const q = n ? `?classe=${encodeURIComponent(n)}` : "";
  return `/coach-ia/${encodeURIComponent(matiere)}${q}`;
}

// Construit le rendez-vous du matin : 2 cartes RULE-BASED, échelle P0→P5.
//
// 🔥 PRINCIPALE — 1re règle qui matche gagne le slot :
//   P0 Ré-engager  — absent ≥ SEUIL_ABSENCE_JOURS → victoire facile/fun, PAS de lacune.
//   P1 Sauver série— série vivante + rien fait aujourd'hui → action courte du jour.
//   P2 Remédier    — une notion fragile → coach ciblé.
//   P3 Progresser  — sa notion la plus solide → flow, on vise plus haut.
//   P5 Défaut      — cold-start (aucune donnée) → meilleure action (valeur × intérêt).
// 🧭 ALTERNATIVE (P4) — explorer une voie neuve (matière/format jamais touché) ;
//   remplit TOUJOURS le second slot.
//
// Les cartes « fun » (P0/P1), « démarrer » (P5) et « explorer » (P4) piochent une
// action réelle du CATALOGUE via ses étiquettes (durée/rythme/rôle/valeur/attrait) ;
// repli sur des routes en dur si le catalogue est indisponible.
function construireRecoDuJour(args: {
  catalogue: ActionCatalogue[];
  notions: NotionMastery[];
  faibles: NotionMastery[];
  joursDepuis: number | null;
  serie: number;
  faitAujourdhui: boolean;
  matieresTouchees: Set<string>;
  typesTouches: Set<string>;
  niveau: string | null;
  montrerCahier: boolean;
}): RecoDuJour {
  const {
    catalogue, notions, faibles, joursDepuis, serie, faitAujourdhui,
    matieresTouchees, typesTouches, niveau, montrerCahier,
  } = args;

  let principale: CarteReco;

  // ── P0 — Ré-engager : absent depuis un moment. Fun, sans lacune. ────────────
  if (joursDepuis !== null && joursDepuis >= SEUIL_ABSENCE_JOURS) {
    // Dictée d'abord : 2 min, transversale, sans enjeu = le geste le plus doux
    // pour revenir. À défaut, la meilleure action courte + quotidienne.
    const a = actionParId(catalogue, "dictee-du-jour") ?? actionCourteFun(catalogue);
    principale = {
      slot: "principale", emoji: "🔥", ton: "warn",
      categorie: "Reprendre le rythme",
      titre: "On reprend en douceur ?",
      message: a
        ? `Ça fait ${joursDepuis} jours — un petit « ${a.label} », deux minutes, sans pression, et c'est reparti. 😊`
        : `Ça fait ${joursDepuis} jours — un mot à écouter et écrire, deux minutes, et c'est reparti. 😊`,
      cta: a ? `${a.label} →` : "Faire la dictée →",
      lien: a ? lienAction(a, niveau) : "/dictee-du-jour",
      matiere: a?.matiere,
    };
  }
  // ── P1 — Sauver la série : série vivante, rien fait aujourd'hui. ────────────
  else if (serie >= SERIE_MINI && !faitAujourdhui) {
    const a = actionCourteFun(catalogue);
    principale = {
      slot: "principale", emoji: "🔥", ton: "fire",
      categorie: "Garde ta série",
      titre: `Ne casse pas ta série de ${serie} jours 🔥`,
      message: a
        ? `${serie} jours d'affilée, bravo ! Un petit « ${a.label} » aujourd'hui et la flamme continue.`
        : `${serie} jours d'affilée, bravo ! Une action rapide aujourd'hui et la flamme continue.`,
      cta: a ? `${a.label} →` : "Faire la dictée →",
      lien: a ? lienAction(a, niveau) : "/dictee-du-jour",
      matiere: a?.matiere,
    };
  }
  // ── P2 — Remédier : une notion fragile. ─────────────────────────────────────
  else if (faibles.length > 0) {
    const n = faibles[0];
    principale = {
      slot: "principale", emoji: "🔥", ton: "warn",
      categorie: "À renforcer",
      titre: `Reprends « ${n.libelle} »`,
      message: `Ta maîtrise en ${labelMatiere(n.matiere)} sur ce point est autour de ${n.mastery}/100. Un tour avec le coach et tu remontes vite.`,
      cta: "Renforcer →",
      lien: lienCoach(n.matiere, niveau),
      matiere: n.matiere,
      notionId: n.notionId,
    };
  }
  // ── P3 — Progresser : sa notion la plus solide → flow. ──────────────────────
  else if (notions.length > 0) {
    const n = [...notions].sort((a, b) => b.mastery - a.mastery)[0];
    // Déjà solide (≥ SEUIL_FORT) : « vise plus haut » sonnerait faux sur un 99.
    // On félicite et on oriente vers une nouvelle notion (le coach en sert une
    // autre). On n'affiche PAS le libellé brut de la notion (souvent technique).
    const maitrisee = n.mastery >= SEUIL_FORT;
    principale = {
      slot: "principale", emoji: "🔥", ton: "fire",
      categorie: "Progresser",
      titre: maitrisee
        ? `Tu maîtrises ${labelMatiere(n.matiere)}`
        : `Continue en ${labelMatiere(n.matiere)}`,
      message: maitrisee
        ? `Déjà ${n.mastery}/100 en ${labelMatiere(n.matiere)} — bravo ! On passe à une nouvelle notion ?`
        : `Tu es bien lancé en ${labelMatiere(n.matiere)} (${n.mastery}/100) — on enchaîne et on vise plus haut ?`,
      cta: maitrisee ? "Nouvelle notion →" : "Continuer →",
      lien: lienCoach(n.matiere, niveau),
      matiere: n.matiere,
      notionId: n.notionId,
    };
  }
  // ── P5 — Défaut : cold-start, aucune donnée. ────────────────────────────────
  else {
    const a = actionDefaut(catalogue);
    principale = {
      slot: "principale", emoji: "🔥", ton: "fire",
      categorie: "Commencer",
      titre: "Lance-toi aujourd'hui",
      message: a
        ? `Un bon point de départ : « ${a.label} »${a.description ? ` — ${a.description}` : ""}`
        : "Un premier pas facile et fun : le défi du jour t'attend.",
      cta: a ? `${a.label} →` : "Voir le défi →",
      lien: a ? lienAction(a, niveau) : "/defis-du-jour",
      matiere: a?.matiere,
    };
  }

  // ── 🧭 P4 — Explorer une voie neuve / (le jour cahier de l'élève) ───────────
  // `montrerCahier` est vrai ~1 jour/semaine, propre à chaque élève. Sinon explore.
  const cahier = montrerCahier ? actionParId(catalogue, "cahier-vacances") : null;

  let alternative: CarteReco;
  const exp = cahier
    ? null
    : actionExplore(catalogue, matieresTouchees, typesTouches, principale.matiere);

  if (cahier) {
    alternative = {
      slot: "alternative", emoji: "🧭", ton: "compass",
      categorie: "En vacances",
      titre: `📥 ${cahier.label}`,
      message: cahier.description
        ? `${cahier.description} Idéal pour garder le rythme cet été, même hors connexion.`
        : "Ton cahier de vacances : à faire sur écran ou à imprimer, même sans connexion.",
      cta: "Ouvrir le cahier →",
      lien: lienAction(cahier, niveau),
      matiere: cahier.matiere,
    };
  } else if (exp) {
    alternative = {
      slot: "alternative", emoji: "🧭", ton: "compass",
      categorie: "Explorer",
      titre: `Découvre : ${exp.label}`,
      message: exp.description
        ? `Une voie que tu n'as pas encore explorée. ${exp.description}`
        : `Tu n'as pas encore essayé « ${exp.label} » — et si tu tentais aujourd'hui ?`,
      cta: "Découvrir →",
      lien: lienAction(exp, niveau),
      matiere: exp.matiere,
    };
  } else {
    // Repli sans catalogue : matière cœur jamais faite, sinon le catalogue complet.
    const matiereEvitee = MATIERES_COEUR.find(
      (m) => !matieresTouchees.has(m) && m !== principale.matiere
    );
    alternative = matiereEvitee
      ? {
          slot: "alternative", emoji: "🧭", ton: "compass",
          categorie: "Explorer",
          titre: `Découvre ${labelMatiere(matiereEvitee)}`,
          message: `Tu n'as pas encore essayé le coach ${labelMatiere(matiereEvitee)} — et si tu tentais une nouvelle voie aujourd'hui ?`,
          cta: "Découvrir →",
          lien: lienCoach(matiereEvitee, niveau),
          matiere: matiereEvitee,
        }
      : {
          slot: "alternative", emoji: "🧭", ton: "compass",
          categorie: "Découvrir",
          titre: "Explore le catalogue",
          message:
            "Coachs, parcours, défis, concours, cahiers… trouve une activité que tu n'as pas encore faite.",
          cta: "Explorer →",
          lien: "/explorer",
        };
  }

  return { principale, alternative };
}

// Calcule le profil complet d'un élève.
export async function computeProfil(args: {
  codeEtablissement: string;
  codeUtilisateur: string;
  nom?: string | null;
  classe?: string | null;
}): Promise<ProfilEleve | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const now = Date.now();

  const [tutor, activite, catalogue] = await Promise.all([
    fetchTutor(supabase, args.codeEtablissement, args.codeUtilisateur),
    fetchActiviteTimestamps(supabase, args.codeEtablissement, args.codeUtilisateur),
    // Catalogue tolérant : si la table est absente/vide, la reco retombe sur ses
    // routes en dur (le profil reste calculable).
    fetchCatalogue().catch(() => [] as ActionCatalogue[]),
  ]);
  const timestamps = activite.ts;

  // --- Niveau ---
  const notions = calculerMaitrise(tutor, now);
  const parMatiere = agregerParMatiere(notions);
  const global =
    notions.length > 0
      ? Math.round(notions.reduce((s, n) => s + n.mastery, 0) / notions.length)
      : null;
  const pointsForts = notions
    .filter((n) => n.mastery >= SEUIL_FORT)
    .sort((a, b) => b.mastery - a.mastery)
    .slice(0, 5);
  const pointsFaibles = notions
    .filter((n) => n.mastery < SEUIL_FAIBLE)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 5);

  // --- Comportement ---
  // Toute activité compte : passages coach (tutor) + autres tables + connexions.
  const tousTs = [...timestamps, ...tutor.map((r) => r.t)];
  // reduce plutôt que Math.max(...spread) : un élève très actif peut avoir des
  // milliers de timestamps → le spread risquerait un dépassement d'arguments.
  const derniereActivite = tousTs.length
    ? tousTs.reduce((m, t) => (t > m ? t : m), tousTs[0])
    : null;
  const joursDepuis =
    derniereActivite === null
      ? null
      : Math.floor((now - derniereActivite) / JOUR);
  const joursActifs = new Set(tousTs.map(jourCle));
  const joursActifs30 = new Set(
    tousTs.filter((t) => t >= now - 30 * JOUR).map(jourCle)
  ).size;
  const statut = statutEngagement(joursDepuis);
  const { serie, faitAujourdhui } = calculerSerie(joursActifs, now);
  const engagement = calculerEngagement(joursActifs, now);

  // --- Prénom (repli e-mail → « Élève », comme le bulletin) ---
  const prenomBrut = prenomCourt(args.nom);
  const prenom = prenomBrut.includes("@") ? "Élève" : prenomBrut;

  // Matières déjà travaillées (au coach) → exploration « voie neuve ».
  const matieresTouchees = new Set(notions.map((n) => n.matiere));
  // Formats (types catalogue) déjà pratiqués : autres tables + coach si tutor.
  const typesTouches = new Set(activite.typesTouches);
  if (tutor.length > 0) typesTouches.add("coach");
  // Niveau normalisé pour les liens coach (?classe=…), ex. « 6°C » → « 6e ».
  // ⚠️ Les coachs de LANGUES (anglais/espagnol/ia) travaillent par niveau CECRL
  // (a1, a2, b1…), pas par niveau scolaire. La classe stockée dans le profil peut
  // donc être « a1 » (dernière activité = espagnol) : niveauPublic() ne la
  // reconnaît pas → renverrait null → lien coach sans niveau. On garde donc le
  // niveau CECRL tel quel, sinon on réduit au niveau scolaire public.
  const classeBrute = (args.classe ?? "").trim();
  const niveauNorm = /^[abc][12]$/i.test(classeBrute)
    ? classeBrute.toLowerCase()
    : niveauPublic(args.classe)?.toLowerCase() ?? null;

  const reco_du_jour = construireRecoDuJour({
    catalogue,
    notions,
    faibles: pointsFaibles,
    joursDepuis,
    serie,
    faitAujourdhui,
    matieresTouchees,
    typesTouches,
    niveau: niveauNorm,
    // Cahier dans le 🧭 : seulement les vacances, et seulement LE jour de la
    // semaine propre à cet élève → ~1×/sem, jamais tout le monde en même temps.
    montrerCahier:
      EN_VACANCES &&
      new Date(now).getUTCDay() === jourCahierEleve(args.codeUtilisateur),
  });

  return {
    prenom,
    classe: args.classe ?? null,
    niveau_public: niveauPublic(args.classe),
    computed_at: new Date(now).toISOString(),
    niveau: {
      global,
      points_forts: pointsForts,
      points_faibles: pointsFaibles,
      par_matiere: parMatiere,
    },
    comportement: {
      statut,
      jours_depuis_activite: joursDepuis,
      jours_actifs_30: joursActifs30,
      total_activites: tousTs.length,
      derniere_activite:
        derniereActivite === null
          ? null
          : new Date(derniereActivite).toISOString(),
      serie,
      fait_aujourdhui: faitAujourdhui,
      engagement,
    },
    reco_du_jour,
  };
}

// Recalcule le profil et l'upsert dans `profil_eleve`. Tolérant : ne lève jamais
// (l'appelant — /api/resultats — ne doit pas voir sa sauvegarde échouer si le
// profil ne se met pas à jour, ex. table absente). Renvoie true si écrit.
export async function mettreAJourProfil(args: {
  codeEtablissement: string;
  codeUtilisateur: string;
  nom?: string | null;
  classe?: string | null;
}): Promise<boolean> {
  try {
    const profil = await computeProfil(args);
    if (!profil) return false;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return false;
    const supabase = createClient(url, key);
    const { error } = await supabase.from("profil_eleve").upsert(
      {
        code_etablissement: args.codeEtablissement,
        code_utilisateur: args.codeUtilisateur,
        data: profil,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "code_etablissement,code_utilisateur" }
    );
    return !error;
  } catch {
    return false;
  }
}
