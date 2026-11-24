// 💬 LE MOT PERSONNEL DE TI MARGO (24/11/2026). Frédéric : « le plus dur,
// c'est que chaque élève doit recevoir un message personnel : qu'est-ce qu'il
// doit faire ? Si on arrive à faire ça, on est le roi du monde ».
//
// Sans IA : des règles simples, tirées de SES séances (/api/mes-notions).
// Phrases courtes (≤ 16 mots) : les 6e lisent difficilement.
//   1. une série ratée récemment (≥ 3 essais, moins de la moitié juste) → on la retravaille ;
//   2. sinon la série où il s'est arrêté → on continue ;
//   3. sinon une série réussie → bravo, la suite ;
//   4. rien du tout → on commence par le coach.
// Longue absence (≥ 7 jours) : « Je t'ai attendu ! » devant.

export type NotionEleve = {
  cle: string; // « 6e|fractions »
  titre: string;
  classe: string;
  notionId: string;
  derniere: string; // ISO
  micros: { id: string; libelle: string; j?: number; t?: number }[];
};

export type Reprise = { cle: string; microId: string } | null;

export type ConseilTiMargo = {
  texte: string;
  bouton: string;
  href: string;
  humeur: "bravo" | "encouragement" | "salut";
};

const MICRO_EXERCICES = "_fiches_exercices"; // comme app/api/mes-notions

function quand(iso: string, maintenant: number): string {
  const jours = Math.floor((maintenant - new Date(iso).getTime()) / 86_400_000);
  if (jours <= 0) return "Aujourd'hui";
  if (jours === 1) return "Hier";
  return `Il y a ${jours} jours`;
}

function lienCoach(classe: string, notion: string, microId?: string) {
  const base = `/coach/serie?classe=${encodeURIComponent(classe)}&matiere=maths&notion=${encodeURIComponent(notion)}`;
  return microId ? `${base}&microId=${encodeURIComponent(microId)}&display=simple` : base;
}

export function conseilTiMargo(args: {
  notions: NotionEleve[];
  titres: Record<string, string>;
  reprise: Reprise;
  classe: string | null;
  maintenant?: number;
}): ConseilTiMargo {
  const { notions, titres, reprise, classe } = args;
  const maintenant = args.maintenant ?? Date.now();

  const recentes = [...notions].sort((a, b) => b.derniere.localeCompare(a.derniere));
  const plusRecente = recentes[0]?.derniere ?? null;
  const absent =
    plusRecente && maintenant - new Date(plusRecente).getTime() >= 7 * 86_400_000 ? "Je t'ai attendu ! " : "";

  // 1. Une série difficile, dans les 2 notions les plus récentes.
  for (const n of recentes.slice(0, 2)) {
    const dure = n.micros
      .filter((m) => m.id !== MICRO_EXERCICES && (m.t ?? 0) >= 3 && (m.j ?? 0) / (m.t ?? 1) < 0.5)
      .sort((a, b) => (a.j ?? 0) / (a.t ?? 1) - (b.j ?? 0) / (b.t ?? 1))[0];
    if (dure) {
      return {
        texte: `${absent}${quand(n.derniere, maintenant)}, « ${dure.libelle} » était difficile (${dure.j ?? 0} sur ${dure.t}). On le retravaille ensemble ?`,
        bouton: "On le retravaille",
        href: lienCoach(n.classe, n.notionId, dure.id),
        humeur: "encouragement",
      };
    }
  }

  // 2. La série où il s'est arrêté.
  if (reprise) {
    const [c, notion] = reprise.cle.split("|");
    if (c && notion) {
      const n = notions.find((x) => x.cle === reprise.cle);
      const micro = n?.micros.find((m) => m.id === reprise.microId)?.libelle;
      const titre = micro ?? titres[reprise.cle] ?? n?.titre;
      return {
        texte: titre
          ? `${absent}Tu en étais à « ${titre} ». On continue ?`
          : `${absent}On reprend là où tu en étais ?`,
        bouton: "On continue",
        href: lienCoach(c, notion, reprise.microId),
        humeur: "salut",
      };
    }
  }

  // 3. Une série réussie : bravo, et la suite.
  const n0 = recentes[0];
  if (n0) {
    const belle = n0.micros.find((m) => m.id !== MICRO_EXERCICES && (m.t ?? 0) >= 3 && (m.j ?? 0) / (m.t ?? 1) >= 0.8);
    return {
      texte: belle
        ? `${absent}Bravo pour « ${belle.libelle} » ! Passons à la suite.`
        : `${absent}On continue « ${n0.titre} » ?`,
      bouton: "On y va",
      href: lienCoach(n0.classe, n0.notionId),
      humeur: belle ? "bravo" : "salut",
    };
  }

  // 4. Première fois.
  return {
    texte: "Bienvenue ! Commence par quelques exercices avec le coach.",
    bouton: "On commence",
    href: classe ? `/coach-ia/maths?classe=${encodeURIComponent(classe)}` : "/coach-ia/maths",
    humeur: "salut",
  };
}

/** La notion la plus faible : bulle « À retravailler » autour du nuage. */
export function notionARetravailler(notions: NotionEleve[]): { titre: string; href: string } | null {
  let pire: { n: NotionEleve; taux: number } | null = null;
  for (const n of notions) {
    let j = 0;
    let t = 0;
    for (const m of n.micros) {
      j += m.j ?? 0;
      t += m.t ?? 0;
    }
    if (t < 3) continue;
    // La notion entière est fragile (< 60 %), OU une de ses séries est ratée
    // (≥ 3 essais, < 50 %) : « 2 sur 6 » ne doit pas se cacher dans la moyenne.
    const taux = j / t;
    const serieRatee = n.micros.some((m) => (m.t ?? 0) >= 3 && (m.j ?? 0) / (m.t ?? 1) < 0.5);
    if ((taux < 0.6 || serieRatee) && (!pire || taux < pire.taux)) pire = { n, taux };
  }
  return pire ? { titre: pire.n.titre, href: lienCoach(pire.n.classe, pire.n.notionId) } : null;
}
