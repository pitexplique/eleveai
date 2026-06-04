type BuildLearningVideoHrefArgs = {
  matiere?: string;
  niveau?: string;
  notionLabel?: string;
  notionId?: string | null;
  microLabel?: string;
  microId?: string | null;
  questionText?: string;
  type?: string;
};

const stopWords = new Set([
  "avec",
  "dans",
  "donne",
  "est",
  "les",
  "pour",
  "que",
  "quel",
  "quelle",
  "sans",
  "sur",
  "une",
  "des",
  "aux",
  "ton",
  "ta",
  "tes",
  "reponse",
  "calcule",
  "calculer",
]);

export function humanizeSearchId(value?: string | null) {
  return value
    ? value.replace(/[_-]/g, " ").replace(/\s+/g, " ").trim()
    : "";
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getQuestionKeywords(questionText?: string) {
  if (!questionText) return [];

  const words = normalizeSearchText(questionText)
    .split(" ")
    .filter((word) => word.length >= 4 && !stopWords.has(word));

  return [...new Set(words)].slice(0, 6);
}

export function buildLearningVideoHref({
  matiere = "maths",
  niveau,
  notionLabel,
  notionId,
  microLabel,
  microId,
  questionText,
  type,
}: BuildLearningVideoHrefArgs) {
  const query = [
    "video cours",
    matiere,
    niveau,
    notionLabel,
    microLabel,
    humanizeSearchId(notionId),
    humanizeSearchId(microId),
    type,
    ...getQuestionKeywords(questionText),
    "methode simple",
    "exercice corrige",
    "explication",
  ]
    .filter(Boolean)
    .join(" ");

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;
}
