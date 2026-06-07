import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Proof & logic vocabulary B2 ───────────────────────────────────────────────
const WORDS = [
  { slug: "theorem",      en: "theorem",      fr: "théorème",      audio: "/audio/english-maths/proof/b2/theorem.mp3"      },
  { slug: "lemma",        en: "lemma",        fr: "lemme",         audio: "/audio/english-maths/proof/b2/lemma.mp3"        },
  { slug: "hypothesis",   en: "hypothesis",   fr: "hypothèse",     audio: "/audio/english-maths/proof/b2/hypothesis.mp3"   },
  { slug: "corollary",    en: "corollary",    fr: "corollaire",    audio: "/audio/english-maths/proof/b2/corollary.mp3"    },
  { slug: "proof",        en: "proof",        fr: "démonstration", audio: "/audio/english-maths/proof/b2/proof.mp3"        },
  { slug: "conjecture",   en: "conjecture",   fr: "conjecture",    audio: "/audio/english-maths/proof/b2/conjecture.mp3"   },
  { slug: "induction",    en: "induction",    fr: "récurrence",    audio: "/audio/english-maths/proof/b2/induction.mp3"    },
  { slug: "contradiction",en: "contradiction",fr: "contradiction", audio: "/audio/english-maths/proof/b2/contradiction.mp3"},
] as const;

function distractorsFr(exclude: string, seed: number): string[] {
  const pool = WORDS.filter((w) => w.fr !== exclude).map((w) => w.fr);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}
function distractorsEn(exclude: string, seed: number): string[] {
  const pool = WORDS.filter((w) => w.en !== exclude).map((w) => w.en);
  const start = seed % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
}

export const proofB2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_b2_proof_en_to_fr_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_proof",
    microId: "en_b2_proof_en_to_fr",
    difficulty: 3 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a term used in mathematical proofs and logic.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["proof", "b2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_proof_fr_to_en_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_proof",
    microId: "en_b2_proof_fr_to_en",
    difficulty: 4 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 3)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about proof and logic vocabulary.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["proof", "b2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_b2_proof_listen_${word.slug}`,
    niveau: "b2" as const,
    matiere: "english-maths" as const,
    notionId: "en_b2_proof",
    microId: "en_b2_proof_listen",
    difficulty: 4 as const,
    text: `Listen and identify the proof term.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 6)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The term you heard is "${word.en}" (${word.fr}).`,
    tags: ["proof", "b2", "listen"],
  },
]);
