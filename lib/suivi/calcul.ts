// Le rapport d'un enfant, calculé depuis ses séances du coach (05/11/2026).
// Mêmes seuils que le bilan du prof (app/prof/classes/bilan) : compris à 80 % de
// justes sur 3 réponses au moins, à revoir sous 50 %, en cours entre les deux.
// ⛔ Aucun accès à la base ici : la fonction se teste et sert aussi à /suivi/exemple.
import { getMicroLabelMap, getNotionMicroMap, notionLabel, type Classe } from "@/lib/tutor-v4/catalog";
import type { Bulletin } from "@/lib/bulletin/types";
import type { CompteSemaine, MicroRapport, NotionCarte, RapportEnfant } from "./types";

export type SeanceCoach = {
  created_at: string;
  classe: string | null;
  matiere: string | null;
  notion_id: string | null;
  nb_tentatives?: number | null;
  bonnes_reponses?: number | null;
  temps_sec?: number | null;
  details?: unknown;
};

type Cumul = { justes: number; reponses: number; derniere: number };
type Verdict = "compris" | "en-cours" | "a-revoir";

const JOUR = 24 * 60 * 60 * 1000;

function verdict(c: Cumul): Verdict {
  if (c.reponses < 3) return "en-cours";
  const r = c.justes / c.reponses;
  return r >= 0.8 ? "compris" : r < 0.5 ? "a-revoir" : "en-cours";
}

const microScores = (s: SeanceCoach) =>
  ((s.details as { microScores?: Record<string, { attempts?: number; success?: number }> } | null)?.microScores ?? {});

function compter(seances: SeanceCoach[]): CompteSemaine {
  const c: CompteSemaine = { seances: seances.length, questions: 0, justes: 0, jours: 0, minutes: 0 };
  const jours = new Set<string>();
  let secondes = 0;
  for (const s of seances) {
    jours.add(s.created_at.slice(0, 10));
    secondes += Number(s.temps_sec) || 0;
    const scores = Object.values(microScores(s));
    if (scores.length) {
      for (const m of scores) {
        c.questions += Number(m?.attempts) || 0;
        c.justes += Number(m?.success) || 0;
      }
    } else {
      c.questions += Number(s.nb_tentatives) || 0;
      c.justes += Number(s.bonnes_reponses) || 0;
    }
  }
  c.jours = jours.size;
  c.minutes = Math.round(secondes / 60);
  return c;
}

/** Le catalogue d'une classe, ou null si le coach ne la connaît pas (« 6C19 »…). */
function catalogue(classe: string, matiere: string) {
  try {
    const notions = getNotionMicroMap(classe as Classe, matiere as "maths");
    if (!Object.keys(notions).length) return null;
    return { notions, libelles: getMicroLabelMap(classe as Classe, matiere as "maths") };
  } catch {
    return null;
  }
}

function titreNotion(notion: string, classe: string, matiere: string) {
  try {
    return notionLabel(notion, classe as Classe, matiere as "maths");
  } catch {
    return notion;
  }
}

export function construireRapport(args: {
  prenom: string;
  classe: string | null;
  seances: SeanceCoach[];
  bulletin?: Bulletin | null;
  maintenant?: Date;
}): RapportEnfant {
  const maintenant = (args.maintenant ?? new Date()).getTime();
  const seances = [...args.seances].sort((a, b) => b.created_at.localeCompare(a.created_at));
  const age = (s: SeanceCoach) => maintenant - new Date(s.created_at).getTime();

  // Micro → cumul de toutes ses séances.
  const cumuls = new Map<string, Cumul & { classe: string; matiere: string; micro: string; notion: string }>();
  for (const s of seances) {
    if (!s.classe) continue;
    const matiere = s.matiere ?? "maths";
    for (const [micro, sc] of Object.entries(microScores(s))) {
      const reponses = Number(sc?.attempts) || 0;
      if (!reponses) continue;
      const cle = `${s.classe}|${matiere}|${micro}`;
      const c = cumuls.get(cle) ?? {
        classe: s.classe, matiere, micro, notion: s.notion_id ?? "",
        justes: 0, reponses: 0, derniere: new Date(s.created_at).getTime(),
      };
      c.reponses += reponses;
      c.justes += Number(sc?.success) || 0;
      cumuls.set(cle, c);
    }
  }

  const enMicro = (c: Cumul & { classe: string; matiere: string; micro: string; notion: string }): MicroRapport => {
    const cat = catalogue(c.classe, c.matiere);
    const notion = c.notion || Object.entries(cat?.notions ?? {}).find(([, ms]) => ms.includes(c.micro))?.[0] || "";
    return {
      id: c.micro,
      libelle: cat?.libelles[c.micro] ?? c.micro,
      notion: notion ? titreNotion(notion, c.classe, c.matiere) : "",
      justes: c.justes,
      reponses: c.reponses,
      href: notion
        ? `/coach/serie?classe=${encodeURIComponent(c.classe)}&matiere=${encodeURIComponent(c.matiere)}&notion=${encodeURIComponent(notion)}&microId=${encodeURIComponent(c.micro)}&display=simple`
        : null,
    };
  };

  const tous = [...cumuls.values()];
  const faibles = tous
    .filter((c) => verdict(c) === "a-revoir")
    // Le plus récent d'abord, puis celui qui a coûté le plus d'erreurs.
    .sort((a, b) => b.derniere - a.derniere || b.reponses - b.justes - (a.reponses - a.justes));
  const solides = tous.filter((c) => verdict(c) === "compris").sort((a, b) => b.derniere - a.derniere);

  // La carte : toutes les notions de maths de sa classe, travaillées ou non.
  const classeCarte = [args.classe, seances.find((s) => s.classe)?.classe].find((c) => c && catalogue(c, "maths")) ?? null;
  let carte: NotionCarte[] = [];
  if (classeCarte) {
    const cat = catalogue(classeCarte, "maths")!;
    carte = Object.entries(cat.notions)
      .filter(([, micros]) => micros.length)
      .map(([id, micros]) => {
        const n: NotionCarte = { id, titre: titreNotion(id, classeCarte, "maths"), total: micros.length, compris: 0, enCours: 0, aRevoir: 0 };
        for (const m of micros) {
          const c = cumuls.get(`${classeCarte}|maths|${m}`);
          if (!c) continue;
          const v = verdict(c);
          if (v === "compris") n.compris += 1;
          else if (v === "a-revoir") n.aRevoir += 1;
          else n.enCours += 1;
        }
        return n;
      });
  }

  const alertes: string[] = [];
  const derniere = seances[0]?.created_at ?? null;
  if (derniere) {
    const jours = Math.floor((maintenant - new Date(derniere).getTime()) / JOUR);
    if (jours >= 7) alertes.push(`${args.prenom} n'a pas travaillé au coach depuis ${jours} jours.`);
  }
  const recentes = faibles.filter((c) => maintenant - c.derniere < 14 * JOUR);
  const parNotion = new Map<string, number>();
  for (const c of recentes) if (c.notion) parNotion.set(`${c.classe}|${c.matiere}|${c.notion}`, (parNotion.get(`${c.classe}|${c.matiere}|${c.notion}`) ?? 0) + 1);
  for (const [cle, nb] of parNotion) {
    if (nb < 2) continue;
    const [classe, matiere, notion] = cle.split("|");
    alertes.push(`Décrochage possible sur « ${titreNotion(notion, classe, matiere)} » : ${nb} points à revoir ces deux dernières semaines.`);
  }

  return {
    prenom: args.prenom,
    classe: args.classe ?? classeCarte,
    derniereActivite: derniere,
    semaine: compter(seances.filter((s) => age(s) < 7 * JOUR)),
    semainePrecedente: compter(seances.filter((s) => age(s) >= 7 * JOUR && age(s) < 14 * JOUR)),
    alertes,
    aRevoir: faibles.slice(0, 3).map(enMicro),
    acquises: solides.slice(0, 5).map(enMicro),
    nbAcquises: solides.length,
    carte,
    bulletin: args.bulletin ?? null,
  };
}
