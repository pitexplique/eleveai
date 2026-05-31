export type ScoreModule =
  | "probleme-du-jour"
  | "calcul-rapide"
  | "lecon-du-jour"
  | "coach-ia"
  | "parcours";

export type ScoreEvent = {
  id: string;
  module: ScoreModule;
  points: number;
  reason: string;
  date: string;
};

const STORAGE_KEY = "eleveai_score_global_v1";

export function getScoreEvents(): ScoreEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getTotalScore() {
  return getScoreEvents().reduce((sum, event) => sum + event.points, 0);
}

export function addScore({
  module,
  points,
  reason,
}: {
  module: ScoreModule;
  points: number;
  reason: string;
}) {
  if (typeof window === "undefined") return 0;

  const events = getScoreEvents();

  const newEvent: ScoreEvent = {
    id: crypto.randomUUID(),
    module,
    points,
    reason,
    date: new Date().toISOString(),
  };

  const updated = [newEvent, ...events].slice(0, 100);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return getTotalScore();
}