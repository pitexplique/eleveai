// Calcul du « bulletin de la classe » (17/11/2026), SANS IA — partagé par :
//   - /api/prof/classes/bulletin : le prof voit toute sa classe ;
//   - /api/eleve/ma-ligne : l'élève connecté voit SA ligne seulement.
// Une ligne par élève : moyenne du coach /20, séances, jours, QUAND il travaille
// (matin, après-midi, soir, week-end, heure de La Réunion), micros acquises /
// à revoir, appréciation à la 3e personne ; plus le classement de la semaine et
// du mois (podium + médailles par qualité).
// Sources : resultats_tutor (une ligne par séance, gardée) et activite_eleve
// (questions et vidéos, purgée à 30 jours). Côté serveur uniquement.

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { pseudosDeLaClasse } from "@/lib/server/pseudos";
import { getMicroLabelMap } from "@/lib/tutor-v4/catalog";
import { compteDansLaMoyenne } from "@/lib/moyenne/compteDansLaMoyenne";

const JOUR = 24 * 60 * 60 * 1000;
export const PERIODES: Record<string, number | null> = { "30j": 30, trim: 90, debut: null };

type Creneaux = { matin: number; apresMidi: number; soir: number; weekend: number };

// Heure de La Réunion (UTC+4, pas d'heure d'été).
function creneau(iso: string): { cle: keyof Creneaux; jour: string } {
  const d = new Date(new Date(iso).getTime() + 4 * 60 * 60 * 1000);
  const jour = d.toISOString().slice(0, 10);
  const js = d.getUTCDay();
  if (js === 0 || js === 6) return { cle: "weekend", jour };
  const h = d.getUTCHours();
  if (h >= 6 && h < 12) return { cle: "matin", jour };
  if (h >= 12 && h < 18) return { cle: "apresMidi", jour };
  return { cle: "soir", jour };
}

// PostgREST plafonne souvent à 1 000 lignes : on lit par pages.
async function toutLire<T>(
  fabrique: (de: number, a: number) => PromiseLike<{ data: T[] | null; error: unknown }>
): Promise<T[]> {
  const tout: T[] = [];
  for (let de = 0; de < 50_000; de += 1000) {
    const { data, error } = await fabrique(de, de + 999);
    if (error || !data) break;
    tout.push(...data);
    if (data.length < 1000) break;
  }
  return tout;
}

function virgule(n: number) {
  return n.toString().replace(".", ",");
}

function appreciation(e: {
  moyenne: number | null;
  seances: number;
  jours: number;
  joursPeriode: number;
  compris: string[];
  aRevoir: string[];
  maison: number;
}): string {
  if (e.seances === 0) return "Pas encore de travail enregistré sur le coach pendant cette période.";
  const p: string[] = [];
  const m = e.moyenne;
  if (m === null) p.push("Travail commencé sur le coach.");
  else if (m >= 16) p.push(`Très bon travail sur le coach (${virgule(m)}/20).`);
  else if (m >= 13) p.push(`Bon travail sur le coach (${virgule(m)}/20).`);
  else if (m >= 10) p.push(`Travail correct sur le coach (${virgule(m)}/20), à consolider.`);
  else p.push(`Des difficultés sur le coach (${virgule(m)}/20) : il faut persévérer.`);

  if (e.compris.length) p.push(`Acquis : ${e.compris.slice(0, 2).join(", ")}.`);
  if (e.aRevoir.length) p.push(`À revoir : ${e.aRevoir.slice(0, 2).join(", ")}.`);

  const regulier = e.jours >= Math.max(3, e.joursPeriode * 0.15);
  const maison = e.maison;
  if (regulier && maison > 0) p.push("Travail régulier, y compris à la maison : c'est très bien.");
  else if (regulier) p.push("Travail régulier en classe ; s'entraîner aussi à la maison aiderait.");
  else if (maison > 0) p.push("S'entraîne aussi à la maison ; viser plus de régularité.");
  else p.push("Un entraînement plus régulier, aussi à la maison, permettrait de progresser.");
  return p.join(" ");
}

type LigneTutor = {
  code_utilisateur: string;
  classe: string | null;
  matiere: string | null;
  score_sur_20: number | null;
  bonnes_reponses?: number | null;
  nb_tentatives?: number | null;
  details: any;
  created_at: string;
};
type LigneActivite = { code_utilisateur: string; type: string; juste: boolean | null; created_at: string };

// « ÉLÈVES DE LA SEMAINE / DU MOIS » — sans IA. Quantitatif : jours de travail,
// questions répondues, taux de justes. Qualitatif : progression des notes,
// micros acquises, travail à la maison. Il faut au moins 10 questions ou
// 2 séances pour concourir. Renvoie un PODIUM (3 premiers, avec leurs raisons)
// et une MÉDAILLE par qualité. La page /prof/classes/podium les projette en
// classe : prénoms et médailles seulement, jamais les notes.
type Stat = {
  code: string;
  nom: string;
  score: number;
  jours: number;
  questions: number;
  taux: number;
  progression: number;
  acquises: number;
  maison: number;
};

const MEDAILLES: { id: string; emoji: string; titre: string; valeur: (s: Stat) => number; texte: (s: Stat) => string; mini?: (s: Stat) => boolean }[] = [
  { id: "regularite", emoji: "📅", titre: "Régularité", valeur: (s) => s.jours, texte: (s) => `${s.jours} jour${s.jours > 1 ? "s" : ""} de travail` },
  { id: "perseverance", emoji: "💪", titre: "Persévérance", valeur: (s) => s.questions, texte: (s) => `${s.questions} questions` },
  { id: "precision", emoji: "🎯", titre: "Précision", valeur: (s) => s.taux, texte: (s) => `${Math.round(s.taux * 100)} % de justes`, mini: (s) => s.questions >= 20 && s.taux >= 0.5 /* 24/11 : plus de médaille à 24 % */ },
  { id: "progression", emoji: "📈", titre: "Progression", valeur: (s) => s.progression, texte: (s) => `+${virgule(s.progression)} points`, mini: (s) => s.progression >= 1 },
  { id: "micros", emoji: "🧩", titre: "Compétences acquises", valeur: (s) => s.acquises, texte: (s) => `${s.acquises} micro${s.acquises > 1 ? "s" : ""} acquise${s.acquises > 1 ? "s" : ""}`, mini: (s) => s.acquises >= 1 },
  { id: "maison", emoji: "🏠", titre: "Travail à la maison", valeur: (s) => s.maison, texte: (s) => `${s.maison} exercices le soir ou le week-end`, mini: (s) => s.maison >= 5 },
];

function classement(
  eleves: { code_utilisateur: string; nom: string | null; pseudo: string | null; classeEleve?: string | null }[],
  seances: LigneTutor[],
  activites: LigneActivite[],
  nbJours: number,
  pourEleve?: string
) {
  const depuis = Date.now() - nbJours * JOUR;
  const stats: Stat[] = [];
  for (const e of eleves) {
    const s = seances.filter((x) => x.code_utilisateur === e.code_utilisateur && new Date(x.created_at).getTime() >= depuis);
    const g = activites.filter(
      (x) => x.code_utilisateur === e.code_utilisateur && x.type === "coach" && new Date(x.created_at).getTime() >= depuis
    );
    if (g.length < 10 && s.length < 2) continue;
    const jours = new Set([...s, ...g].map((x) => creneau(x.created_at).jour)).size;
    // ⭐ 24/11/2026 — On comptait les séances ET les questions ensemble
    // (« 24 exercices » pour 21 questions + 3 séances) : les questions
    // seulement, ou les séances quand il n'y a pas de questions.
    const sourceMaison: { created_at: string }[] = g.length ? g : s;
    const maison = sourceMaison.filter((x) => {
      const c = creneau(x.created_at).cle;
      return c === "soir" || c === "weekend";
    }).length;
    const justes = g.filter((x) => x.juste === true).length;
    const taux = g.length ? justes / g.length : 0;
    const notes = s
      .filter((x) => compteDansLaMoyenne(x, e.classeEleve))
      .map((x) => x.score_sur_20)
      .filter((n): n is number => typeof n === "number");
    let progression = 0;
    if (notes.length >= 2) {
      const mi = Math.floor(notes.length / 2);
      const moy = (t: number[]) => t.reduce((a, b) => a + b, 0) / t.length;
      progression = Math.round((moy(notes.slice(mi)) - moy(notes.slice(0, mi))) * 10) / 10;
    }
    const micros: Record<string, { j: number; t: number }> = {};
    for (const x of s)
      for (const [id, sc] of Object.entries((x.details?.microScores ?? {}) as Record<string, any>)) {
        const cu = (micros[id] ??= { j: 0, t: 0 });
        cu.t += Number(sc?.attempts) || 0;
        cu.j += Number(sc?.success) || 0;
      }
    const acquises = Object.values(micros).filter((c) => c.t >= 3 && c.j / c.t >= 0.8).length;
    const score =
      jours * 10 +
      Math.min(g.length, 200) * 0.3 +
      (g.length >= 10 ? taux * 40 : 0) +
      Math.max(0, progression) * 5 +
      acquises * 8 +
      Math.min(maison, 30) * 0.5;
    stats.push({
      code: e.code_utilisateur,
      nom: e.nom && !/^Élève \d+$/.test(e.nom) ? e.nom : e.pseudo || e.nom || e.code_utilisateur,
      score,
      jours,
      questions: g.length,
      taux,
      progression,
      acquises,
      maison,
    });
  }

  const raisons = (s: Stat) => {
    const r = [`${s.jours} jour${s.jours > 1 ? "s" : ""} de travail`];
    if (s.questions) r.push(`${s.questions} questions, ${Math.round(s.taux * 100)} % de justes`);
    if (s.progression >= 1) r.push(`progresse de +${virgule(s.progression)} pts`);
    if (s.acquises) r.push(`${s.acquises} micro${s.acquises > 1 ? "s" : ""} acquise${s.acquises > 1 ? "s" : ""}`);
    if (s.maison >= 5) r.push("travaille aussi à la maison");
    return r;
  };
  const podium = [...stats]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => ({ code_utilisateur: s.code, nom: s.nom, raisons: raisons(s) }));

  // Une médaille par qualité ; on évite de tout donner au même élève quand
  // un autre la mérite presque autant (on préfère celui qui n'en a pas encore).
  const dejaMedailles = new Map<string, number>();
  const medailles = MEDAILLES.flatMap((m) => {
    const candidats = stats.filter((s) => (m.mini ? m.mini(s) : m.valeur(s) > 0)).sort((a, b) => m.valeur(b) - m.valeur(a));
    if (!candidats.length) return [];
    const max = m.valeur(candidats[0]);
    const proches = candidats.filter((s) => m.valeur(s) >= max * 0.9);
    const choisi = proches.find((s) => !dejaMedailles.has(s.code)) ?? candidats[0];
    dejaMedailles.set(choisi.code, (dejaMedailles.get(choisi.code) ?? 0) + 1);
    return [{ id: m.id, emoji: m.emoji, titre: m.titre, code_utilisateur: choisi.code, nom: choisi.nom, texte: m.texte(choisi) }];
  });

  // 🎖️ POUR L'ÉLÈVE SEUL (24/11/2026, tableau de bord) : ce qui lui manque
  // pour viser une médaille. Jamais renvoyé au prof ni projeté.
  let moi: ObjectifMedaille | null = null;
  if (pourEleve) {
    const s = stats.find((x) => x.code === pourEleve);
    if (!s) {
      const q = activites.filter(
        (x) => x.code_utilisateur === pourEleve && x.type === "coach" && new Date(x.created_at).getTime() >= depuis
      ).length;
      moi = { enCourse: false, manque: Math.max(1, 10 - q), unite: "questions", medaille: null };
    } else if (!medailles.some((m) => m.code_utilisateur === pourEleve)) {
      // La médaille la plus proche, en proportion de ce qui manque.
      const pistes = (
        [
          ["regularite", "jours", "📅 Régularité", (x: Stat) => x.jours],
          ["perseverance", "questions", "💪 Persévérance", (x: Stat) => x.questions],
          ["micros", "micros", "🧩 Compétences acquises", (x: Stat) => x.acquises],
        ] as const
      ).flatMap(([id, unite, nom, v]) => {
        const m = medailles.find((x) => x.id === id);
        const tenant = m && stats.find((x) => x.code === m.code_utilisateur);
        if (!tenant) return [];
        const manque = Math.max(1, v(tenant) - v(s) + 1);
        if (unite === "jours" && s.jours + manque > nbJours) return [];
        return [{ manque, unite, medaille: nom, part: manque / Math.max(1, v(tenant)) }];
      });
      pistes.sort((x, y) => x.part - y.part);
      const p = pistes[0];
      // Trop loin (plus de la moitié du chemin) : un objectif doux, sans chiffre qui décourage.
      moi =
        p && p.part <= 0.5 && !(p.unite === "questions" && p.manque > 50)
          ? { enCourse: true, manque: p.manque, unite: p.unite, medaille: p.medaille }
          : { enCourse: true, manque: 1, unite: "jours", medaille: null };
    }
  }

  return { podium, medailles, participants: stats.length, ...(pourEleve ? { moi } : {}) };
}

export type ObjectifMedaille = {
  enCourse: boolean;
  manque: number;
  unite: "questions" | "jours" | "micros";
  medaille: string | null;
};

export type LigneBulletin = Awaited<ReturnType<typeof calculerBulletinClasse>>["eleves"][number];

export async function calculerBulletinClasse(
  admin: SupabaseClient,
  code: string,
  niveau: string,
  periode: string,
  pourEleve?: string
) {
  const nbJours = PERIODES[periode] === undefined ? 90 : PERIODES[periode];
  const depuis = nbJours ? new Date(Date.now() - nbJours * JOUR).toISOString() : "2000-01-01T00:00:00Z";
  const depuisActivite = new Date(Date.now() - Math.min(nbJours ?? 30, 30) * JOUR).toISOString();

  const db = admin as SupabaseClient;
  const [eleves, seances, activites, pseudos] = await Promise.all([
    db
      .from("acces_etablissement")
      .select("code_utilisateur, nom, classe")
      .eq("code_etablissement", code)
      .eq("type_utilisateur", "eleve")
      .order("code_utilisateur"),
    toutLire<LigneTutor>((de, a) =>
      db
        .from("resultats_tutor")
        .select("code_utilisateur, classe, matiere, score_sur_20, bonnes_reponses, nb_tentatives, details, created_at")
        .eq("code_etablissement", code)
        .gte("created_at", depuis)
        .order("created_at", { ascending: true })
        .range(de, a)
    ),
    toutLire<LigneActivite>((de, a) =>
      db
        .from("activite_eleve")
        .select("code_utilisateur, type, juste, created_at")
        .eq("code_etablissement", code)
        .gte("created_at", depuisActivite)
        .order("created_at", { ascending: true })
        .range(de, a)
    ),
    pseudosDeLaClasse(admin, code),
  ]);

  // Libellés des micros, pris dans le catalogue de la classe de CHAQUE séance
  // (une 6e peut réviser des micros de CE2).
  const catalogues = new Map<string, Record<string, string>>();
  const libellesDe = (cl: string, mat: string) => {
    const k = `${cl}|${mat}`;
    if (!catalogues.has(k)) {
      try {
        catalogues.set(k, getMicroLabelMap(cl as any, mat as any));
      } catch {
        catalogues.set(k, {});
      }
    }
    return catalogues.get(k)!;
  };
  const libelles: Record<string, string> = { ...libellesDe(niveau, "maths") };
  for (const s of seances) {
    if (!s.classe) continue;
    for (const id of Object.keys(s.details?.microScores ?? {}))
      if (!libelles[id]) {
        const l = libellesDe(s.classe, s.matiere ?? "maths")[id];
        if (l) libelles[id] = l;
      }
  }

  // La régularité se juge sur les jours écoulés depuis le PREMIER travail de
  // la classe (une classe créée il y a 3 semaines n'a pas 90 jours d'histoire).
  const depuisPremier = Math.max(
    1,
    Math.ceil((Date.now() - new Date(seances[0]?.created_at ?? Date.now()).getTime()) / JOUR)
  );
  const joursPeriode = Math.min(nbJours ?? depuisPremier, depuisPremier);

  const lignes = (eleves.data ?? []).map((e) => {
    const siennes = seances.filter((s) => s.code_utilisateur === e.code_utilisateur);
    const gestes = activites.filter((a) => a.code_utilisateur === e.code_utilisateur);
    const creneaux: Creneaux = { matin: 0, apresMidi: 0, soir: 0, weekend: 0 };
    const jours = new Set<string>();
    const micros: Record<string, { j: number; t: number }> = {};
    // Moyenne PONDÉRÉE (23/11/2026) : toutes les bonnes réponses ÷ toutes les
    // questions × 20. Une séance d'une question ne pèse plus autant qu'une de 30.
    let justes = 0;
    let questions = 0;
    for (const s of siennes) {
      const c = creneau(s.created_at);
      creneaux[c.cle]++;
      jours.add(c.jour);
      // 🏋️ Une séance d'entraînement (choix de l'élève au coach, 23/11/2026)
      // ou faite dans une AUTRE classe que la sienne (24/11/2026) compte comme
      // travail, pas dans la moyenne. La classe de l'élève : celle de son
      // compte, sinon le niveau de la classe du prof.
      if (compteDansLaMoyenne(s, e.classe || niveau)) {
        const q = Number(s.nb_tentatives) || 0;
        if (q > 0) {
          questions += q;
          justes += Number(s.bonnes_reponses) || 0;
        }
      }
      for (const [id, sc] of Object.entries((s.details?.microScores ?? {}) as Record<string, any>)) {
        const t = Number(sc?.attempts) || 0;
        if (!t) continue;
        const cu = (micros[id] ??= { j: 0, t: 0 });
        cu.t += t;
        cu.j += Number(sc?.success) || 0;
      }
    }
    let maison = creneaux.soir + creneaux.weekend;
    for (const g of gestes) {
      const c = creneau(g.created_at);
      jours.add(c.jour);
      if (g.type === "coach" && (c.cle === "soir" || c.cle === "weekend")) maison++;
    }

    const nom = (id: string) => libelles[id] ?? id.replace(/_/g, " ");
    const compris: string[] = [];
    const aRevoir: string[] = [];
    for (const [id, c] of Object.entries(micros)) {
      if (c.t < 3) continue;
      const r = c.j / c.t;
      if (r >= 0.8) compris.push(nom(id));
      else if (r < 0.5) aRevoir.push(nom(id));
    }
    const moyenne = questions > 0 ? Math.round((justes / questions) * 200) / 10 : null;

    return {
      code_utilisateur: e.code_utilisateur,
      nom: e.nom,
      pseudo: pseudos.get(e.code_utilisateur) ?? null,
      classeEleve: (e.classe as string | null) || niveau,
      moyenne,
      seances: siennes.length,
      questions: gestes.filter((g) => g.type === "coach").length,
      videos: gestes.filter((g) => g.type === "video_fin").length,
      jours: jours.size,
      creneaux,
      compris,
      aRevoir,
      appreciation: appreciation({
        moyenne,
        seances: siennes.length,
        jours: jours.size,
        joursPeriode,
        compris,
        aRevoir,
        maison,
      }),
    };
  });

  return {
    periode,
    joursActivite: Math.min(nbJours ?? 30, 30),
    semaine: classement(lignes, seances, activites, 7, pourEleve),
    mois: classement(lignes, seances, activites, 30, pourEleve),
    eleves: lignes,
  };
}
