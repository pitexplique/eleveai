// LE RÉPERTOIRE ANGLAIS — « 5 mots par jour » pour bâtir son vocabulaire,
// façon Duolingo mais À NOTRE FAÇON : on découvre le mot (avec le son), on le
// reconnaît, puis on le REVOIT à J+1, J+3, J+7… (la répétition espacée).
// Demande récurrente des utilisateurs (25/07/2026).
//
// LA SOURCE : le COACH d'anglais (banques tutor-v4 A1→B2), pas le Dico — c'est
// là qu'est le vrai volume (≈ 620 mots), déjà classés par niveau CECRL et
// SOUVENT accompagnés d'un mp3 enregistré (accent juste, mieux que la synthèse
// vocale). On récolte les mots via leurs exercices de TRADUCTION
// (« en_to_fr » / « fr_to_en ») : ça écarte tout seul les questions de maths
// posées en anglais (elles n'ont pas de micro de traduction).
//
// L'espagnol viendra sur le même moteur (répertoire/espagnol) — on commence par
// l'anglais parce que la voix anglaise du système est presque toujours là,
// contrairement à l'espagnol.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { englishA1QuestionBank } from "@/lib/tutor-v4/questionBank/a1/english";
import { englishA2QuestionBank } from "@/lib/tutor-v4/questionBank/a2/english";
import { englishB1QuestionBank } from "@/lib/tutor-v4/questionBank/b1/english";
import { englishB2QuestionBank } from "@/lib/tutor-v4/questionBank/b2/english";

export type NiveauCECRL = "A1" | "A2" | "B1" | "B2";

export type MotRepertoire = {
  id: string;
  /** Le mot anglais à retenir. */
  en: string;
  /** Son sens en français (l'indice de rappel). */
  fr: string;
  /** Le mp3 enregistré, si la banque en a un ; sinon on lira en synthèse vocale. */
  audio: string | null;
  niveau: NiveauCECRL;
  /** Le thème d'origine (colors, verbs, jobs…) — juste une étiquette. */
  theme: string;
};

// Le premier passage entre guillemets (droits ou français) d'un énoncé.
function premierEntreGuillemets(txt: string | undefined): string | null {
  if (!txt) return null;
  const m =
    txt.match(/"([^"]+)"/) ||
    txt.match(/[“”]([^“”]+)[“”]/) ||
    txt.match(/«\s*([^»]+?)\s*»/);
  return m ? m[1].trim() : null;
}

function themeDe(notionId: string | undefined): string {
  if (!notionId) return "";
  // en_a1_colors → colors · en_b2_macroeconomics → macroeconomics
  return notionId.replace(/^en_[a-z0-9]+_/, "").replace(/_/g, " ");
}

function recolte(bank: TutorBankItemV4[], niveau: NiveauCECRL): MotRepertoire[] {
  // 1) L'audio, indexé par mot anglais : les items « écouter/dictée » portent
  //    expected = [le mot anglais] et un audioSrc.
  const audioParEn = new Map<string, string>();
  for (const it of bank) {
    const src = (it as { audioSrc?: string }).audioSrc;
    const exp = (it as { expected?: string[] }).expected;
    if (src && exp && exp.length === 1) {
      const cle = exp[0].trim().toLowerCase();
      if (cle && !audioParEn.has(cle)) audioParEn.set(cle, src);
    }
  }

  // 2) Les paires mot↔sens, via les micros de traduction.
  const parMot = new Map<string, MotRepertoire>();
  for (const it of bank) {
    const micro = (it as { microId?: string }).microId ?? "";
    const exp = (it as { expected?: string[] }).expected;
    const text = (it as { text?: string }).text;
    if (!exp || exp.length !== 1) continue;

    let en = "";
    let fr = "";
    if (micro.includes("en_to_fr")) {
      const q = premierEntreGuillemets(text);
      if (!q) continue;
      en = q;
      fr = exp[0];
    } else if (micro.includes("fr_to_en")) {
      const q = premierEntreGuillemets(text);
      if (!q) continue;
      fr = q;
      en = exp[0];
    } else {
      continue;
    }

    en = en.trim();
    fr = fr.trim();
    // Un vrai mot/expression (pas un nombre, pas une formule).
    if (!en || !fr || /[0-9+\-=×÷]/.test(en)) continue;

    const cle = en.toLowerCase();
    if (parMot.has(cle)) continue;
    parMot.set(cle, {
      id: `${niveau}:${cle}`,
      en,
      fr,
      audio: audioParEn.get(cle) ?? null,
      niveau,
      theme: themeDe((it as { notionId?: string }).notionId),
    });
  }
  return [...parMot.values()];
}

// La banque agrégée A1→B2, dédoublonnée par mot (un mot vu en A1 ne réapparaît
// pas s'il est aussi listé plus haut → on garde le niveau le plus bas).
const PARMOT = new Map<string, MotRepertoire>();
for (const m of [
  ...recolte(englishA1QuestionBank, "A1"),
  ...recolte(englishA2QuestionBank, "A2"),
  ...recolte(englishB1QuestionBank, "B1"),
  ...recolte(englishB2QuestionBank, "B2"),
]) {
  const cle = m.en.toLowerCase();
  if (!PARMOT.has(cle)) PARMOT.set(cle, m);
}

export const MOTS_ANGLAIS: MotRepertoire[] = [...PARMOT.values()];
export const MOT_PAR_ID = new Map(MOTS_ANGLAIS.map((m) => [m.id, m]));
export const NB_MOTS = MOTS_ANGLAIS.length;

export const NIVEAUX_REPERTOIRE: { slug: string; label: string }[] = [
  { slug: "tous", label: "Tous" },
  { slug: "A1", label: "A1 · débutant" },
  { slug: "A2", label: "A2 · élémentaire" },
  { slug: "B1", label: "B1 · intermédiaire" },
  { slug: "B2", label: "B2 · avancé" },
];

export function nbMotsNiveau(niveau: string): number {
  return niveau === "tous"
    ? MOTS_ANGLAIS.length
    : MOTS_ANGLAIS.filter((m) => m.niveau === niveau).length;
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

// Un mélange FIXE par niveau : l'ordre dans lequel les mots sont servis, jour
// après jour, sans répétition avant d'avoir tout parcouru.
const MASTERS = new Map<string, MotRepertoire[]>();
function masterPour(niveau: string): MotRepertoire[] {
  const cache = MASTERS.get(niveau);
  if (cache) return cache;
  const src =
    niveau === "tous" ? MOTS_ANGLAIS : MOTS_ANGLAIS.filter((m) => m.niveau === niveau);
  const m = melange(src, mulberry32(20260125 + hashStr(niveau)));
  MASTERS.set(niveau, m);
  return m;
}

const JOUR0 = Date.UTC(2026, 0, 1);
function numeroDuJour(date: Date): number {
  const j = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((j - JOUR0) / 86_400_000);
}

/** Les N mots du jour d'un niveau : une fenêtre glissante dans son mélange fixe. */
export function getMotsDuJour(date: Date, n = 5, niveau = "tous"): MotRepertoire[] {
  const master = masterPour(niveau);
  if (master.length === 0) return [];
  const debut = (((numeroDuJour(date) * n) % master.length) + master.length) % master.length;
  const out: MotRepertoire[] = [];
  const pris = new Set<string>();
  for (let i = 0; i < master.length && out.length < n; i++) {
    const mot = master[(debut + i) % master.length];
    if (pris.has(mot.id)) continue;
    pris.add(mot.id);
    out.push(mot);
  }
  return out;
}

/** Un QCM à 4 choix : la bonne réponse + 3 leurres (mêmes niveaux d'abord), mélangés. */
export function choixQuiz(mot: MotRepertoire, k = 3): string[] {
  const rnd = mulberry32(hashStr(mot.id));
  const meme = MOTS_ANGLAIS.filter(
    (m) => m.niveau === mot.niveau && m.en.toLowerCase() !== mot.en.toLowerCase()
  );
  const autres = MOTS_ANGLAIS.filter((m) => m.en.toLowerCase() !== mot.en.toLowerCase());
  const pool = meme.length >= k ? meme : autres;
  const leurres = melange(pool, rnd)
    .slice(0, k)
    .map((m) => m.en);
  return melange([mot.en, ...leurres], rnd);
}

// La répétition espacée : on revoit un mot à J+1, J+3, J+7, J+16, J+35.
export const ESPACEMENT_JOURS = [1, 3, 7, 16, 35];

/** Un mot est-il « à revoir » aujourd'hui, vu sa dernière révision ? */
export function estAReviser(reviews: number, joursDepuisDerniere: number): boolean {
  const seuil = ESPACEMENT_JOURS[Math.min(reviews, ESPACEMENT_JOURS.length - 1)];
  return joursDepuisDerniere >= seuil;
}
