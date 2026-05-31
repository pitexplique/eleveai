// Mathematical verbs grouped by CEFR language level.
// Each level has 6 words and 6 sentence-audio paths to generate once with ElevenLabs.

import type { EnglishMathsLanguageLevel, EnglishMathsWord } from "../types";

type VerbSource = {
  level: EnglishMathsLanguageLevel;
  slug: string;
  english: string;
  french: string;
  image: string;
  sentenceEn: string;
  sentenceFr: string;
};

const verbSources: VerbSource[] = [
  // A1 - consignes tres courtes
  {
    level: "A1",
    slug: "add",
    english: "add",
    french: "additionner / ajouter",
    image: "+",
    sentenceEn: "Add three and two.",
    sentenceFr: "Additionne trois et deux.",
  },
  {
    level: "A1",
    slug: "count",
    english: "count",
    french: "compter",
    image: "123",
    sentenceEn: "Count the sides.",
    sentenceFr: "Compte les cotes.",
  },
  {
    level: "A1",
    slug: "draw",
    english: "draw",
    french: "tracer / dessiner",
    image: "pen",
    sentenceEn: "Draw a triangle.",
    sentenceFr: "Trace un triangle.",
  },
  {
    level: "A1",
    slug: "compare",
    english: "compare",
    french: "comparer",
    image: "< >",
    sentenceEn: "Compare the numbers.",
    sentenceFr: "Compare les nombres.",
  },
  {
    level: "A1",
    slug: "measure",
    english: "measure",
    french: "mesurer",
    image: "cm",
    sentenceEn: "Measure the line.",
    sentenceFr: "Mesure la ligne.",
  },
  {
    level: "A1",
    slug: "check",
    english: "check",
    french: "verifier",
    image: "ok",
    sentenceEn: "Check your answer.",
    sentenceFr: "Verifie ta reponse.",
  },

  // A2 - operations et consignes scolaires courantes
  {
    level: "A2",
    slug: "subtract",
    english: "subtract",
    french: "soustraire",
    image: "-",
    sentenceEn: "Subtract two from five.",
    sentenceFr: "Soustrais deux de cinq.",
  },
  {
    level: "A2",
    slug: "multiply",
    english: "multiply",
    french: "multiplier",
    image: "x",
    sentenceEn: "Multiply four by three.",
    sentenceFr: "Multiplie quatre par trois.",
  },
  {
    level: "A2",
    slug: "divide",
    english: "divide",
    french: "diviser",
    image: "/",
    sentenceEn: "Divide twelve by four.",
    sentenceFr: "Divise douze par quatre.",
  },
  {
    level: "A2",
    slug: "order",
    english: "order",
    french: "ordonner / ranger",
    image: "1<2<3",
    sentenceEn: "Order the numbers.",
    sentenceFr: "Range les nombres.",
  },
  {
    level: "A2",
    slug: "calculate",
    english: "calculate",
    french: "calculer",
    image: "=",
    sentenceEn: "Calculate the answer.",
    sentenceFr: "Calcule la reponse.",
  },
  {
    level: "A2",
    slug: "solve",
    english: "solve",
    french: "resoudre",
    image: "?",
    sentenceEn: "Solve the problem.",
    sentenceFr: "Resous le probleme.",
  },

  // B1 - raisonnement et methode
  {
    level: "B1",
    slug: "estimate",
    english: "estimate",
    french: "estimer",
    image: "~",
    sentenceEn: "Estimate the result.",
    sentenceFr: "Estime le resultat.",
  },
  {
    level: "B1",
    slug: "explain",
    english: "explain",
    french: "expliquer",
    image: "why",
    sentenceEn: "Explain your method.",
    sentenceFr: "Explique ta methode.",
  },
  {
    level: "B1",
    slug: "justify",
    english: "justify",
    french: "justifier",
    image: "because",
    sentenceEn: "Justify your answer.",
    sentenceFr: "Justifie ta reponse.",
  },
  {
    level: "B1",
    slug: "simplify",
    english: "simplify",
    french: "simplifier",
    image: "=>",
    sentenceEn: "Simplify the fraction.",
    sentenceFr: "Simplifie la fraction.",
  },
  {
    level: "B1",
    slug: "convert",
    english: "convert",
    french: "convertir",
    image: "cm->m",
    sentenceEn: "Convert centimeters into meters.",
    sentenceFr: "Convertis les centimetres en metres.",
  },
  {
    level: "B1",
    slug: "represent",
    english: "represent",
    french: "representer",
    image: "graph",
    sentenceEn: "Represent the data in a graph.",
    sentenceFr: "Represente les donnees dans un graphique.",
  },

  // B2 - langage mathematique plus academique
  {
    level: "B2",
    slug: "prove",
    english: "prove",
    french: "demontrer / prouver",
    image: "QED",
    sentenceEn: "Prove that the statement is true.",
    sentenceFr: "Demontre que l'affirmation est vraie.",
  },
  {
    level: "B2",
    slug: "interpret",
    english: "interpret",
    french: "interpreter",
    image: "read",
    sentenceEn: "Interpret the graph.",
    sentenceFr: "Interprete le graphique.",
  },
  {
    level: "B2",
    slug: "model",
    english: "model",
    french: "modeliser",
    image: "model",
    sentenceEn: "Model the situation with an equation.",
    sentenceFr: "Modelise la situation avec une equation.",
  },
  {
    level: "B2",
    slug: "evaluate",
    english: "evaluate",
    french: "evaluer",
    image: "f(x)",
    sentenceEn: "Evaluate the expression.",
    sentenceFr: "Evalue l'expression.",
  },
  {
    level: "B2",
    slug: "approximate",
    english: "approximate",
    french: "approximer",
    image: "~",
    sentenceEn: "Approximate the value.",
    sentenceFr: "Approxime la valeur.",
  },
  {
    level: "B2",
    slug: "derive",
    english: "derive",
    french: "deriver / deduire",
    image: "d/dx",
    sentenceEn: "Derive the formula.",
    sentenceFr: "Deduire la formule.",
  },
];

export const englishMathsVerbsWords: EnglishMathsWord[] = verbSources.map(
  (verb) => ({
    id: `verbs_${verb.level.toLowerCase()}_${verb.slug}`,
    category: "verbs",
    languageLevel: verb.level,
    english: verb.english,
    french: verb.french,
    image: verb.image,
    audioWordSrc: `/audio/english-maths/verbs/${verb.level.toLowerCase()}/${verb.slug}.mp3`,
    audioSentenceSrc: `/audio/english-maths/verbs/${verb.level.toLowerCase()}/${verb.slug}-sentence.mp3`,
    sentenceEn: verb.sentenceEn,
    sentenceFr: verb.sentenceFr,
  })
);
