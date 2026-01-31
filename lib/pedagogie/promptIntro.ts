// lib/pedagogie/promptIntro.ts

export type MainCategoryId = "seance" | "exercices" | "evaluation" | "correction" | "methodes";

export type MainCategoryMeta = {
  id: MainCategoryId;
  label: string;
  emoji: string;
  hint: string;
};

export type PromptIntroOptions = {
  classe?: string;
  matiere?: string;
  mainCategory: MainCategoryId;
  meta?: MainCategoryMeta;
  includeMetaLine?: boolean;
};

/**
 * Déduit le niveau (primaire / collège / lycée / supérieur) à partir du champ "classe"
 * Heuristique volontairement tolérante : accepte CP/CE1..., 6e..3e, seconde/première/terminale,
 * et BTS/BUT/Licence/Master/CPGE/IUT/Université...
 */
function getNiveauScolaireFromClasse(classeRaw?: string): "primaire" | "college" | "lycee" | "superieur" {
  const c = (classeRaw || "").toLowerCase().trim();

  // ✅ Supérieur (prioritaire si on trouve un marqueur)
  if (
    c.includes("bts") ||
    c.includes("but") ||
    c.includes("iut") ||
    c.includes("licence") ||
    c.includes("master") ||
    c.includes("univers") ||
    c.includes("cpge") ||
    c.includes("prépa") ||
    c.includes("prepa") ||
    c.includes("dut") ||
    c.includes("ingénieur") ||
    c.includes("ingenieur") ||
    c.includes("post-bac") ||
    c.includes("post bac")
  ) {
    return "superieur";
  }

  // ✅ Primaire
  if (
    c === "cp" ||
    c === "ce1" ||
    c === "ce2" ||
    c === "cm1" ||
    c === "cm2" ||
    c.includes("maternelle") ||
    c.includes("petite section") ||
    c.includes("moyenne section") ||
    c.includes("grande section") ||
    c.includes("ps") ||
    c.includes("ms") ||
    c.includes("gs")
  ) {
    return "primaire";
  }

  // ✅ Lycée
  if (
    c.includes("seconde") ||
    c.includes("2nde") ||
    c === "2de" ||
    c.includes("première") ||
    c.includes("1ere") ||
    c.includes("1re") ||
    c.includes("terminale") ||
    c.includes("tle") ||
    c.includes("1ère") ||
    c.includes("2nde")
  ) {
    return "lycee";
  }

  // ✅ Collège (par défaut si on détecte 6e..3e)
  if (c.includes("6e") || c.includes("5e") || c.includes("4e") || c.includes("3e")) {
    return "college";
  }

  // ✅ Fallback : collège (c’est le plus “neutre” pour EleveAI actuellement)
  return "college";
}

function getEtablissementLabel(niveau: "primaire" | "college" | "lycee" | "superieur"): string {
  switch (niveau) {
    case "primaire":
      return "à l’école primaire";
    case "college":
      return "au collège";
    case "lycee":
      return "au lycée";
    case "superieur":
      return "dans l’enseignement supérieur";
  }
}

export function buildPromptIntro(opts: PromptIntroOptions): string {
  const classe = opts.classe || "collège";
  const matiere = opts.matiere || "la discipline";

  const niveau = getNiveauScolaireFromClasse(opts.classe);
  const etablissementLabel = getEtablissementLabel(niveau);

  const metaLine =
    opts.includeMetaLine && opts.meta
      ? `${opts.meta.emoji} ${opts.meta.label} — ${opts.meta.hint}\n\n`
      : "";

  switch (opts.mainCategory) {
    case "seance":
      return (
        metaLine +
        `Cadre pédagogique :\n` +
        `Tu interviens comme enseignant expert en ${matiere}.\n` +
        `Ta mission est de concevoir une séance ou une séquence structurée destinée à des élèves de ${classe},\n` +
        `avec un déroulé clair, des étapes courtes, des temps de mise en commun et un bilan final.\n\n`
      );

    case "exercices":
      return (
        metaLine +
        `Cadre d’entraînement :\n` +
        `Tu interviens comme enseignant de ${matiere} ${etablissementLabel}.\n` +
        `Ta mission est de proposer des exercices progressifs destinés à des élèves de ${classe},\n` +
        `avec une différenciation explicite (base / standard / défi), des attendus clairs et des corrigés exploitables.\n\n`
      );

    case "evaluation":
      return (
        metaLine +
        `Cadre d’évaluation pédagogique :\n` +
        `Tu interviens comme enseignant de ${matiere} ${etablissementLabel}.\n` +
        `Ta mission est de produire une évaluation destinée à des élèves de ${classe},\n` +
        `avec des consignes univoques, des critères de réussite clairs, une différenciation explicite et un barème lisible.\n\n`
      );

    case "correction":
      return (
        metaLine +
        `Cadre de correction :\n` +
        `Tu interviens comme enseignant de ${matiere} ${etablissementLabel}.\n` +
        `Ta mission est de produire un corrigé structuré destiné à des élèves de ${classe},\n` +
        `avec des étapes numérotées, des justifications explicites et les erreurs fréquentes à éviter.\n\n`
      );

    case "methodes":
      return (
        metaLine +
        `Cadre méthodologique :\n` +
        `Tu produis une fiche méthode claire et progressive en ${matiere} pour des élèves de ${classe}.\n` +
        `La fiche présente une démarche structurée, des exemples simples et les erreurs fréquentes.\n\n`
      );

    default:
      return (
        metaLine +
        `Contexte pédagogique :\n` +
        `Production destinée à des élèves de ${classe} en ${matiere}, dans le respect des programmes officiels français.\n\n`
      );
  }
}


