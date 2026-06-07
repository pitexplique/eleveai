import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Vie quotidienne — Jobs A2 ─────────────────────────────────────────────────
const WORDS = [
  { slug: "teacher",  en: "teacher",  fr: "enseignant",  audio: "/audio/english-maths/jobs/a2/teacher.mp3"  },
  { slug: "doctor",   en: "doctor",   fr: "médecin",     audio: "/audio/english-maths/jobs/a2/doctor.mp3"   },
  { slug: "engineer", en: "engineer", fr: "ingénieur",   audio: "/audio/english-maths/jobs/a2/engineer.mp3" },
  { slug: "nurse",    en: "nurse",    fr: "infirmier",   audio: "/audio/english-maths/jobs/a2/nurse.mp3"    },
  { slug: "farmer",   en: "farmer",   fr: "agriculteur", audio: "/audio/english-maths/jobs/a2/farmer.mp3"   },
  { slug: "police",   en: "police officer", fr: "policier", audio: "/audio/english-maths/jobs/a2/police.mp3" },
  { slug: "chef",     en: "chef",     fr: "cuisinier",   audio: "/audio/english-maths/jobs/a2/chef.mp3"     },
  { slug: "driver",   en: "driver",   fr: "chauffeur",   audio: "/audio/english-maths/jobs/a2/driver.mp3"   },
  { slug: "student",  en: "student",  fr: "élève",       audio: "/audio/english-maths/jobs/a2/student.mp3"  },
  { slug: "scientist",en: "scientist",fr: "scientifique",audio: "/audio/english-maths/jobs/a2/scientist.mp3"},
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

export const jobsA2Bank: TutorBankItemV4[] = WORDS.flatMap((word, idx) => [
  {
    kind: "fixed" as const,
    id: `en_a2_jobs_en_to_fr_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_jobs",
    microId: "en_a2_jobs_en_to_fr",
    difficulty: 1 as const,
    text: `What does "${word.en}" mean in French?`,
    format: "qcm" as const,
    choices: [word.fr, ...distractorsFr(word.fr, idx)],
    expected: [word.fr],
    comparator: "mcq_exact" as const,
    hint: `It's a job or profession.`,
    explanation: `"${word.en}" means "${word.fr}" in French.`,
    tags: ["jobs", "a2", "en_to_fr"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_jobs_fr_to_en_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_jobs",
    microId: "en_a2_jobs_fr_to_en",
    difficulty: 2 as const,
    text: `How do you say "${word.fr}" in English?`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 4)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    hint: `Think about jobs and professions.`,
    explanation: `"${word.fr}" is "${word.en}" in English.`,
    tags: ["jobs", "a2", "fr_to_en"],
  },
  {
    kind: "fixed" as const,
    id: `en_a2_jobs_listen_${word.slug}`,
    niveau: "a2" as const,
    matiere: "english-maths" as const,
    notionId: "en_a2_jobs",
    microId: "en_a2_jobs_listen",
    difficulty: 2 as const,
    text: `Listen and identify the job.`,
    format: "qcm" as const,
    choices: [word.en, ...distractorsEn(word.en, idx + 7)],
    expected: [word.en],
    comparator: "mcq_exact" as const,
    audioSrc: word.audio,
    hint: `Listen carefully.`,
    explanation: `The job you heard is "${word.en}" (${word.fr}).`,
    tags: ["jobs", "a2", "listen"],
  },
]);
