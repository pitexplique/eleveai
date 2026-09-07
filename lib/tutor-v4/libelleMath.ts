// ─── Les formules dans les libellés du coach ──────────────────────────────────
//
// Frédéric, 07/09/2026 : « modifier coach pour y mettre katex dans certains cas ».
// La capture montrait la liste de seconde : « Utiliser (a+b)^2 = a^2 + 2ab + b^2 »,
// « Utiliser racine de a^2 = |a| ». Du code source projeté à une classe.
//
// ⛔ LE PIÈGE, ET C'EST LUI QUI DICTE TOUT CE FICHIER. Un libellé de micro n'est
// pas affiché à un seul endroit. Il part aussi :
//   · dans la RECHERCHE de la page coach (`.toLowerCase().includes(...)`) ;
//   · dans une URL de recherche YouTube (`youtubeSearchUrl`) ;
//   · dans un `aria-label`, lu par une synthèse vocale ;
//   · dans les CHECKLISTS IMPRIMABLES de `/guide-de-survie` (`kitHelpers`) ;
//   · dans le tuteur, l'admin, les bilans d'évaluation nationale.
// Écrire `$\sqrt{a^2}$` dans le libellé sans plus, c'est envoyer des dollars et
// des antislashs dans une URL, dans un PDF et dans une voix de synthèse. Même
// faute que celle du mode classe le 04/09 : trois décisions justes prises
// séparément, qui se contredisent une fois assemblées.
//
// ⭐ LA PARADE : UN SEUL POINT D'ENTRÉE, ET C'EST LE TEXTE QUI EST LE DÉFAUT.
// `catalog.ts` fait passer TOUS ses libellés par `libelleTexte()` — les 28
// points d'appel existants reçoivent donc du texte propre sans qu'on les
// touche. Seul l'affichage qui veut du KaTeX demande explicitement la source,
// par `getMicroLabelMathMap()`. On ne peut donc pas oublier un consommateur :
// c'est l'inverse, il faut le vouloir.
//
// ⚠️ DANS LE SOURCE TYPESCRIPT, IL FAUT DEUX ANTISLASHS : `"$\\sqrt{2}$"`.
// Avec un seul, `\s` n'a pas de sens et disparaît selon les cas, `\f` est un
// saut de page, `\b` un retour arrière — sans la moindre erreur de compilation.
//
// ⭐ LE VOCABULAIRE EST VOLONTAIREMENT PETIT. On n'écrit dans les libellés que
// ce que ce fichier sait retraduire en Unicode, et `scripts/verifier-libelles.mjs`
// le vérifie : après `libelleTexte`, il ne doit rester ni `$`, ni antislash, ni
// accolade nulle part. Une macro nouvelle s'ajoute ICI d'abord, dans les données
// ensuite.

/** Les macros du vocabulaire admis, et leur équivalent en texte. */
const MACROS: [RegExp, string][] = [
  [/\\mathbb\{N\}/g, "ℕ"],
  [/\\mathbb\{Z\}/g, "ℤ"],
  [/\\mathbb\{D\}/g, "𝔻"],
  [/\\mathbb\{Q\}/g, "ℚ"],
  [/\\mathbb\{R\}/g, "ℝ"],
  [/\\times/g, "×"],
  [/\\div/g, "÷"],
  [/\\pm/g, "±"],
  [/\\cup/g, "∪"],
  [/\\cap/g, "∩"],
  [/\\in\b/g, "∈"],
  [/\\subset/g, "⊂"],
  [/\\varnothing/g, "∅"],
  [/\\leqslant|\\leq|\\le\b/g, "≤"],
  [/\\geqslant|\\geq|\\ge\b/g, "≥"],
  [/\\neq|\\ne\b/g, "≠"],
  [/\\approx/g, "≈"],
  [/\\to\b/g, "→"],
  [/\\mapsto/g, "↦"],
  [/\\infty/g, "∞"],
  [/\\pi\b/g, "π"],
  [/\\Omega/g, "Ω"],
  [/\\alpha/g, "α"],
  [/\\cdot/g, "·"],
  [/\\circ\b/g, "°"],
  [/\\cos/g, "cos"],
  [/\\sin/g, "sin"],
  [/\\tan/g, "tan"],
  [/\\log/g, "log"],
  [/\\ln\b/g, "ln"],
  [/\\exp/g, "exp"],
  [/\\,|\\;|\\!|\\ /g, " "],
];

const EXPOSANTS: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶",
  "7": "⁷", "8": "⁸", "9": "⁹", "+": "⁺", "-": "⁻", "−": "⁻", "(": "⁽",
  ")": "⁾", n: "ⁿ", i: "ⁱ", x: "ˣ", y: "ʸ", a: "ᵃ", b: "ᵇ", c: "ᶜ",
  d: "ᵈ", e: "ᵉ", k: "ᵏ", m: "ᵐ", p: "ᵖ", t: "ᵗ",
};

/** `^2`, `^{-n}` → `²`, `⁻ⁿ` quand chaque signe a son exposant Unicode. */
function exposants(math: string): string {
  return math.replace(/\^\{([^{}]*)\}|\^(\S)/g, (tout, groupe, seul) => {
    const contenu: string = groupe ?? seul;
    const rendu = [...contenu].map((c) => EXPOSANTS[c]).join("");
    if (rendu.length !== contenu.length) return tout; // un signe manque : on garde `^`
    return rendu;
  });
}

/** Une formule LaTeX ramenée à du texte lisible, pour tout ce qui n'affiche pas. */
function formuleEnTexte(math: string): string {
  let t = math;
  // `\sqrt[3]{x}` avant `\sqrt{x}`, sinon le second mange le premier.
  t = t.replace(/\\sqrt\[3\]\{([^{}]*)\}/g, "∛$1");
  t = t.replace(/\\sqrt\{([^{}]*)\}/g, "√$1");
  // `\frac{a}{b}` → `a/b` : il n'existe pas de glyphe pour 6/15.
  t = t.replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2");
  for (const [motif, texte] of MACROS) t = t.replace(motif, texte);
  t = exposants(t);
  // Les accolades qui restent ne portaient qu'un groupement.
  t = t.replace(/[{}]/g, "");
  return t.replace(/\s+/g, " ").trim();
}

/**
 * Le libellé tel qu'on peut l'écrire PARTOUT : dans une URL, dans un PDF, dans
 * un `aria-label`, dans une comparaison de recherche. Identité sur un libellé
 * sans `$` — comme `TexteMath` l'est sur un texte de fiche sans formule.
 */
export function libelleTexte(label: string): string {
  if (!label || !label.includes("$")) return label;

  let sortie = "";
  let reste = label;
  while (reste.length > 0) {
    const debut = reste.indexOf("$");
    if (debut === -1) {
      sortie += reste;
      break;
    }
    const fin = reste.indexOf("$", debut + 1);
    if (fin === -1) {
      // Dollar orphelin : on ne devine pas, on rend le reste tel quel. Même
      // choix que `TexteMath`, et `verifier-libelles.mjs` signale le cas.
      sortie += reste;
      break;
    }
    sortie += reste.slice(0, debut);
    sortie += formuleEnTexte(reste.slice(debut + 1, fin));
    reste = reste.slice(fin + 1);
  }
  return sortie;
}

/** Y a-t-il une formule à confier à KaTeX ? */
export function porteUneFormule(label: string): boolean {
  if (!label) return false;
  const premier = label.indexOf("$");
  return premier !== -1 && label.indexOf("$", premier + 1) !== -1;
}
