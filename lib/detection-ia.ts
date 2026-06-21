// lib/detection-ia.ts
//
// Détection heuristique « ce retour ressemble-t-il à un copier-coller d'IA ? ».
// Utilisé pour SIGNALER (badge « 🤖 IA probable » dans le dashboard admin), pas
// pour bloquer : on ne pénalise jamais un vrai élève qui écrit maladroitement.
//
// Approche : signaux que les vrais élèves n'utilisent quasi jamais (markdown,
// listes « Idée 1 | … », JSON, jargon produit/IA, pavés > 200 mots), pondérés.
// Volontairement tolérant : un témoignage sincère un peu long n'est PAS flaggé.

const SEUIL_MOTS_PAVE = 200; // un avis honnête tient en 200 mots (cf. /api/retours)

function compterMots(s: string): number {
  const t = s.trim();
  return t ? t.split(/\s+/).length : 0;
}

// Signaux FORTS : presque jamais présents dans un retour d'élève authentique.
const MARQUEURS_FORTS: { re: RegExp; label: string }[] = [
  { re: /\bid[ée]e\s*\d+\s*[|:]/i, label: "liste « Idée N | … »" },
  { re: /\b[ée]tape\s*\d+\s*:/i, label: "« Étape N : … »" },
  { re: /^\s*\{[\s\S]*"[a-z_]+"\s*:/i, label: "bloc JSON" },
  { re: /```/, label: "bloc de code (```)" },
  { re: /\*\*[^*\n]+\*\*/, label: "gras markdown (**…**)" },
  { re: /(^|\n)\s*#{1,3}\s+\S/, label: "titre markdown (#)" },
  { re: /\bRAG\b/, label: "jargon « RAG »" },
  { re: /hallucination/i, label: "jargon « hallucination »" },
  { re: /prompt engineering/i, label: "jargon « prompt engineering »" },
  { re: /\bpersona\b/i, label: "jargon « persona »" },
  { re: /moteur socratique/i, label: "« moteur socratique »" },
  { re: /\[\s*ton\s*pr[ée]nom/i, label: "placeholder « [Ton Prénom] »" },
  { re: /en tant qu['’]?\s*ia\b/i, label: "« en tant qu'IA »" },
  { re: /piliers?\s+strat[ée]giques?/i, label: "« piliers stratégiques »" },
  { re: /micro-?innovations?/i, label: "« micro-innovations »" },
];

// Signaux FAIBLES : tournures d'IA polie/structurée. Il en faut plusieurs.
const MARQUEURS_FAIBLES: { re: RegExp; label: string }[] = [
  { re: /\bn['’]h[ée]sitez pas\b/i, label: "« n'hésitez pas »" },
  { re: /il est important de\b/i, label: "« il est important de »" },
  { re: /\bvoici (quelques|comment|une|les)\b/i, label: "« voici quelques… »" },
  { re: /\ben r[ée]sum[ée]\b/i, label: "« en résumé »" },
  { re: /\b[ée]cosyst[èe]me\b/i, label: "« écosystème »" },
  { re: /\bsynergies?\b/i, label: "« synergie »" },
  { re: /\bindispensable\b/i, label: "« indispensable »" },
  { re: /\bexhaustif(ve)?\b/i, label: "« exhaustif »" },
  { re: /\bfonctionnalit[ée]s?\s+avanc[ée]es?\b/i, label: "« fonctionnalités avancées »" },
  { re: /(^|\n)\s*\d+\.\s+\S/, label: "liste numérotée" },
  { re: /(^|\n)\s*[-*•]\s+.+(\n\s*[-*•]\s+.+){2,}/, label: "liste à puces (3+)" },
];

export type ResultatDetectionIA = {
  suspect: boolean;
  raison: string | null; // courte explication pour le prof (ou null si ok)
};

export function detecterIA(message: string | null | undefined): ResultatDetectionIA {
  const m = (message ?? "").trim();
  if (!m) return { suspect: false, raison: null };

  const raisons: string[] = [];

  const mots = compterMots(m);
  if (mots > SEUIL_MOTS_PAVE) raisons.push(`pavé de ${mots} mots`);

  const forts = MARQUEURS_FORTS.filter((x) => x.re.test(m));
  for (const f of forts) raisons.push(f.label);

  const faibles = MARQUEURS_FAIBLES.filter((x) => x.re.test(m));

  // Suspect si : pavé, OU ≥1 signal fort, OU ≥2 signaux faibles,
  // OU (assez long > 120 mots ET ≥1 signal faible).
  const suspect =
    mots > SEUIL_MOTS_PAVE ||
    forts.length >= 1 ||
    faibles.length >= 2 ||
    (mots > 120 && faibles.length >= 1);

  if (suspect && faibles.length) {
    raisons.push(faibles.map((f) => f.label).slice(0, 2).join(", "));
  }

  return {
    suspect,
    raison: suspect ? raisons.slice(0, 2).join(" · ") || "tournure d'IA" : null,
  };
}

// Raccourci booléen.
export function estProbablementIA(message: string | null | undefined): boolean {
  return detecterIA(message).suspect;
}
