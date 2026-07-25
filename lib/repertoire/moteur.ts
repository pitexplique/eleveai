// LE MOTEUR DES RITUELS DE LANGUE — partagé par « l'anglais du jour » et
// « l'espagnol du jour » (même modèle, demande de Frédéric 25/07). Un mot, c'est
// un couple mot↔sens avec un niveau CECRL et, si la banque du coach en a un, un
// mp3. Le tirage est DÉTERMINISTE par date (fenêtre glissante) : tout le monde a
// les mêmes 5 mots le même jour, sans répétition avant d'avoir tout parcouru.

export type MotLangue = {
  id: string;
  /** Le mot dans la langue cible (anglais, espagnol…). */
  mot: string;
  /** Son sens en français (l'indice de rappel). */
  fr: string;
  /** Le mp3 enregistré, si la banque en a un ; sinon on lira en synthèse vocale. */
  audio: string | null;
  niveau: string;
  /** Le thème d'origine (colors, verbs, jobs…) — juste une étiquette. */
  theme: string;
};

export type Niveau = { slug: string; label: string };

// La répétition espacée : on revoit un mot à J+1, J+3, J+7, J+16, J+35.
export const ESPACEMENT_JOURS = [1, 3, 7, 16, 35];

/** Un mot est-il « à revoir » aujourd'hui, vu sa dernière révision ? */
export function estAReviser(reviews: number, joursDepuisDerniere: number): boolean {
  const seuil = ESPACEMENT_JOURS[Math.min(reviews, ESPACEMENT_JOURS.length - 1)];
  return joursDepuisDerniere >= seuil;
}

// ── Aléatoire DÉTERMINISTE (pas de Math.random : le rendu doit rester stable) ─
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function melange<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const JOUR0 = Date.UTC(2026, 0, 1);
function numeroDuJour(date: Date): number {
  const j = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((j - JOUR0) / 86_400_000);
}

export type Repertoire = {
  MOTS: MotLangue[];
  MOT_PAR_ID: Map<string, MotLangue>;
  NB: number;
  NIVEAUX: Niveau[];
  getMotsDuJour: (date: Date, n?: number, niveau?: string) => MotLangue[];
  choixQuiz: (mot: MotLangue, k?: number) => string[];
  nbMotsNiveau: (niveau: string) => number;
};

/** Fabrique un répertoire jouable à partir d'une banque de mots + ses niveaux. */
export function creerRepertoire(mots: MotLangue[], niveaux: Niveau[], graine = 20260125): Repertoire {
  const MOT_PAR_ID = new Map(mots.map((m) => [m.id, m]));

  // Un mélange FIXE par niveau : l'ordre dans lequel les mots sont servis, jour
  // après jour. Construits à la demande, puis mémorisés.
  const MASTERS = new Map<string, MotLangue[]>();
  function masterPour(niveau: string): MotLangue[] {
    const cache = MASTERS.get(niveau);
    if (cache) return cache;
    const src = niveau === "tous" ? mots : mots.filter((m) => m.niveau === niveau);
    const m = melange(src, mulberry32(graine + hashStr(niveau)));
    MASTERS.set(niveau, m);
    return m;
  }

  function getMotsDuJour(date: Date, n = 5, niveau = "tous"): MotLangue[] {
    const master = masterPour(niveau);
    if (master.length === 0) return [];
    const debut = (((numeroDuJour(date) * n) % master.length) + master.length) % master.length;
    const out: MotLangue[] = [];
    const pris = new Set<string>();
    for (let i = 0; i < master.length && out.length < n; i++) {
      const mot = master[(debut + i) % master.length];
      if (pris.has(mot.id)) continue;
      pris.add(mot.id);
      out.push(mot);
    }
    return out;
  }

  function choixQuiz(mot: MotLangue, k = 3): string[] {
    const rnd = mulberry32(hashStr(mot.id));
    const meme = mots.filter(
      (m) => m.niveau === mot.niveau && m.mot.toLowerCase() !== mot.mot.toLowerCase()
    );
    const autres = mots.filter((m) => m.mot.toLowerCase() !== mot.mot.toLowerCase());
    const pool = meme.length >= k ? meme : autres;
    const leurres = melange(pool, rnd)
      .slice(0, k)
      .map((m) => m.mot);
    return melange([mot.mot, ...leurres], rnd);
  }

  function nbMotsNiveau(niveau: string): number {
    return niveau === "tous" ? mots.length : mots.filter((m) => m.niveau === niveau).length;
  }

  return { MOTS: mots, MOT_PAR_ID, NB: mots.length, NIVEAUX: niveaux, getMotsDuJour, choixQuiz, nbMotsNiveau };
}

// Le harvester des banques du coach (tutor-v4) : on récolte les couples
// mot↔sens via les exercices de TRADUCTION (micros « xx_to_fr » / « fr_to_xx »),
// ce qui écarte tout seul les questions de maths posées dans la langue.
// `codeLangue` = « en » ou « es » (le préfixe des micros et des notionId).
type ItemBanque = {
  microId?: string;
  notionId?: string;
  text?: string;
  expected?: string[];
  audioSrc?: string;
};

function premierEntreGuillemets(txt: string | undefined): string | null {
  if (!txt) return null;
  const m =
    txt.match(/"([^"]+)"/) ||
    txt.match(/[“”]([^“”]+)[“”]/) ||
    txt.match(/«\s*([^»]+?)\s*»/);
  return m ? m[1].trim() : null;
}
function themeDe(notionId: string | undefined, codeLangue: string): string {
  if (!notionId) return "";
  return notionId.replace(new RegExp(`^${codeLangue}_[a-z0-9]+_`), "").replace(/_/g, " ");
}

export function recolterBanque(
  bank: ItemBanque[],
  niveau: string,
  codeLangue: string
): MotLangue[] {
  const versFr = `${codeLangue}_to_fr`;
  const frVers = `fr_to_${codeLangue}`;

  // L'audio, indexé par mot cible (items « écouter/dictée » : expected=[mot], audioSrc).
  const audioParMot = new Map<string, string>();
  for (const it of bank) {
    if (it.audioSrc && it.expected && it.expected.length === 1) {
      const cle = it.expected[0].trim().toLowerCase();
      if (cle && !audioParMot.has(cle)) audioParMot.set(cle, it.audioSrc);
    }
  }

  const parMot = new Map<string, MotLangue>();
  for (const it of bank) {
    const micro = it.microId ?? "";
    const exp = it.expected;
    if (!exp || exp.length !== 1) continue;

    let mot = "";
    let fr = "";
    if (micro.includes(versFr)) {
      const q = premierEntreGuillemets(it.text);
      if (!q) continue;
      mot = q;
      fr = exp[0];
    } else if (micro.includes(frVers)) {
      const q = premierEntreGuillemets(it.text);
      if (!q) continue;
      fr = q;
      mot = exp[0];
    } else {
      continue;
    }

    mot = mot.trim();
    fr = fr.trim();
    if (!mot || !fr || /[0-9+\-=×÷]/.test(mot)) continue;

    const cle = mot.toLowerCase();
    if (parMot.has(cle)) continue;
    parMot.set(cle, {
      id: `${niveau}:${cle}`,
      mot,
      fr,
      audio: audioParMot.get(cle) ?? null,
      niveau,
      theme: themeDe(it.notionId, codeLangue),
    });
  }
  return [...parMot.values()];
}

// Dédoublonne une liste de banques déjà récoltées (garde le niveau le plus bas).
export function fusionner(...listes: MotLangue[][]): MotLangue[] {
  const parMot = new Map<string, MotLangue>();
  for (const liste of listes) {
    for (const m of liste) {
      const cle = m.mot.toLowerCase();
      if (!parMot.has(cle)) parMot.set(cle, m);
    }
  }
  return [...parMot.values()];
}

export const NIVEAUX_CECRL: Niveau[] = [
  { slug: "tous", label: "Tous" },
  { slug: "A1", label: "A1 · débutant" },
  { slug: "A2", label: "A2 · élémentaire" },
  { slug: "B1", label: "B1 · intermédiaire" },
  { slug: "B2", label: "B2 · avancé" },
];
