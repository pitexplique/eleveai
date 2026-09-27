// lib/lecture-en-mots.ts
//
// ⭐ UN TEXTE D'ÉNONCÉ EN FRANÇAIS PARLÉ, pour la synthèse vocale du navigateur.
//
// Écrit le 26/09 pour les automatismes (testé sur 15 540 questions), puis
// sorti ici pour que le coach en profite : le bouton « Écouter » et la lecture
// automatique passaient le texte BRUT à la voix, qui prononçait « dollar,
// backslash, dfrac » sur chaque formule.
//
// « $\dfrac{3}{4}$ » → « 3 sur 4 », « $x^2$ » → « x au carré »,
// « $\sqrt{25}$ » → « racine carrée de 25 », « 12 cm² » → « 12 centimètres
// carrés », « AB » → « A B », « P_A(B) » → « P de B sachant A ».
//
// ⛔ FRANÇAIS SEULEMENT : les coachs d'anglais et d'espagnol lisent leur texte
// tel quel (voir `buildReadableQuestion` dans app/coach/serie/ListenButton.tsx).

const UNITE_SEULE: Record<string, string> = {
  km: "kilomètres", m: "mètres", dm: "décimètres", cm: "centimètres", mm: "millimètres",
  kg: "kilogrammes", g: "grammes", L: "litres", mL: "millilitres", cL: "centilitres",
  min: "minutes", h: "heures", s: "secondes",
};

const UNITES: [RegExp, string | ((m: string, u: string) => string)][] = [
  [/\bkm\/h\b/g, " kilomètres par heure"],
  [/\bm\/s²/g, " mètres par seconde au carré"],
  [/\bm\/s\b/g, " mètres par seconde"],
  [/\bm³\/s\b/g, " mètres cubes par seconde"],
  [/\bcm²/g, " centimètres carrés"],
  [/\bdm²/g, " décimètres carrés"],
  [/\bkm²/g, " kilomètres carrés"],
  [/\bmm²/g, " millimètres carrés"],
  [/\bm²/g, " mètres carrés"],
  [/\bcm³/g, " centimètres cubes"],
  [/\bdm³/g, " décimètres cubes"],
  [/\bm³/g, " mètres cubes"],
  [/(\d)\s?km\b/g, "$1 kilomètres"],
  [/(\d)\s?hm\b/g, "$1 hectomètres"],
  [/(\d)\s?dam\b/g, "$1 décamètres"],
  [/(\d)\s?dm\b/g, "$1 décimètres"],
  [/(\d)\s?cm\b/g, "$1 centimètres"],
  [/(\d)\s?mm\b/g, "$1 millimètres"],
  [/(\d)\s?m\b/g, "$1 mètres"],
  [/(\d)\s?kg\b/g, "$1 kilogrammes"],
  [/(\d)\s?g\b/g, "$1 grammes"],
  [/(\d)\s?mL\b/g, "$1 millilitres"],
  [/(\d)\s?cL\b/g, "$1 centilitres"],
  [/(\d)\s?L\b/g, "$1 litres"],
  [/(\d)\s?min\b/g, "$1 minutes"],
  [/(\d)\s?h\s?(\d\d)\b/g, "$1 heures $2"],
  [/(\d)\s?h\b/g, "$1 heures"],
  [/(\d)\s?s\b/g, "$1 secondes"],
  [/(\d)\s?€/g, "$1 euros"],
  // « en cm », « combien m » : l'unité seule, sans nombre devant
  [/\b(en|combien) km\b/g, "$1 kilomètres"],
  [/\b(en|combien) m\b/g, "$1 mètres"],
  [/\b(en|combien) dm\b/g, "$1 décimètres"],
  [/\b(en|combien) cm\b/g, "$1 centimètres"],
  [/\b(en|combien) mm\b/g, "$1 millimètres"],
  [/\b(en|combien) kg\b/g, "$1 kilogrammes"],
  [/\b(en|combien) g\b/g, "$1 grammes"],
  // …mais « la figure en L » est une forme, pas un volume.
  [/(?<!(?:figure|forme|pièce|équerre|tétromino)s? )\b(en|combien) L\b/g, "$1 litres"],
  [/\b(en|combien) min\b/g, "$1 minutes"],
  [/\b(en|combien) h\b/g, "$1 heures"],
  [/\b(en|combien) s\b/g, "$1 secondes"],
  [/\ben €/g, "en euros"],
  // « (cm) », « (kg) » : l'unité rappelée entre parenthèses
  [/\((km|m|dm|cm|mm|kg|g|L|mL|cL|min|h|s)\)/g, (_m: string, u: string) => `(${UNITE_SEULE[u]})`],
];

/** « 1 centimètres » → « 1 centimètre » : au singulier après 0 et 1 (pas après 1,5). */
const UN_AU_SINGULIER = /(^|[^\d,])([01]) (kilomètre|hectomètre|décamètre|mètre|décimètre|centimètre|millimètre|kilogramme|gramme|litre|millilitre|centilitre|heure|minute|seconde|degré|euro)s\b/g;

/** Une formule LaTeX (sans ses $) en français parlé. */
function formuleEnMots(f: string): string {
  let s = f
    // « 0{,}5 » : la virgule décimale protégée, qui doit rester collée.
    .replace(/\{,\}/g, ",")
    .replace(/\\(?:left|right)\b/g, "")
    // « 49\ \text{cm}^2 » : l'unité rendue à « cm² », que la liste des unités lit
    .replace(/\\(?:text|mathrm)\{\s*(km|m|dm|cm|mm)\s*\}\^\{?([23])\}?/g, (_m, u: string, p: string) => ` ${u}${p === "2" ? "²" : "³"}`)
    .replace(/-\s*\\infty/g, " moins l'infini ").replace(/\+\s*\\infty/g, " plus l'infini ")
    // « \binom{4}{2} » : « 2 parmi 4 » ; « X \sim \mathcal{B}(n ; p) »
    .replace(/\\binom\{([^{}]*)\}\{([^{}]*)\}/g, " $2 parmi $1 ")
    .replace(/\\sim\s*\\mathcal\{B\}/g, " suit la loi binomiale ")
    .replace(/\\sim(?![a-zA-Z])/g, " suit ")
    .replace(/\\mapsto/g, " associe ")
    // « \int_0^3 » : « intégrale de 0 à 3 de »
    .replace(/\\int_\{?([^{}\s^]+)\}?\^\{?([^{}\s]+?)\}?(?=[\s(\\])/g, " intégrale de $1 à $2 de ")
    .replace(/\\(?:iff|Leftrightarrow|Longleftrightarrow)(?![a-zA-Z])|⟺|⇔/g, " équivaut à ")
    .replace(/\\(?:Rightarrow|implies|Longrightarrow)(?![a-zA-Z])|⟹|⇒/g, " donc ")
    // « 60^\circ » ; « 14^{e} », « 3^\text{e} » (un rang)
    .replace(/\^\{?\\circ\}?/g, " degrés ")
    .replace(/(\d)\^\{?(?:\\text\{)?(e|er|re|ère)\}?\}?/g, "$1$2 ")
    // « \lim_{x \to 0^+} » : « limite quand x tend vers 0 plus de »
    .replace(/\\lim_\{([^{}]*?)\\to\s*([^{}]*)\}/g, " limite quand $1 tend vers $2 de ")
    .replace(/\^\+/g, " plus ").replace(/\^-(?![\w{])/g, " moins ").replace(/\^\*/g, " étoile ")
    // « \vec{u} \cdot \vec{v} » se lit « u scalaire v » ; « \|\vec{u}\| », « norme de u »
    .replace(/(\\vec\{[^{}]*\}|\\overrightarrow\{[^{}]*\})\s*\\cdot\s*(\\vec\{[^{}]*\}|\\overrightarrow\{[^{}]*\})/g, "$1 scalaire $2")
    .replace(/\\\|\s*([^|]*?)\s*\\\|/g, " norme de $1 ");
  // Les constructions imbriquées se déplient de l'intérieur : on répète.
  for (let i = 0; i < 4; i++) {
    s = s
      .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, " $1 sur $2 ")
      .replace(/\\sqrt\{([^{}]*)\}/g, " racine carrée de $1 ")
      .replace(/\\widehat\{([^{}]*)\}/g, " l'angle $1 ")
      .replace(/\\(?:overrightarrow|vec)\{([^{}]*)\}/g, " vecteur $1 ")
      .replace(/\\text\{([^{}]*)\}/g, " $1 ")
      .replace(/\\(?:mathbf|mathrm|mathbb|boldsymbol|operatorname)\{([^{}]*)\}/g, " $1 ")
      // Un exposant qui contient lui-même un exposant : « e^{x^2} »
      .replace(/\^(?:\{2\}|2(?!\d))/g, " au carré ")
      .replace(/\^(?:\{3\}|3(?!\d))/g, " au cube ")
      .replace(/\^\{([^{}]*)\}/g, " puissance $1 ");
  }
  return s
    .replace(/_\{([^{}]*)\}/g, " indice $1 ")
    .replace(/_(\w)/g, " indice $1 ")
    .replace(/\\[,;:! ]/g, " ")
    .replace(/\^(-?\w)/g, " puissance $1 ")
    .replace(/\\times(?![a-zA-Z])|×/g, " fois ")
    .replace(/\\div(?![a-zA-Z])|÷/g, " divisé par ")
    .replace(/\\cdot(?![a-zA-Z])/g, " fois ")
    .replace(/\\(?:ldots|dots|cdots)|…/g, " combien ")
    .replace(/\\leq?(?![a-zA-Z])|\\leqslant|⩽|≤/g, " inférieur ou égal à ")
    .replace(/\\geq?(?![a-zA-Z])|\\geqslant|⩾|≥/g, " supérieur ou égal à ")
    .replace(/\\neq?(?![a-zA-Z])|≠/g, " différent de ")
    .replace(/\\approx(?![a-zA-Z])|≈/g, " environ ")
    .replace(/\\to(?![a-zA-Z])/g, " tend vers ")
    .replace(/\\in(?![a-zA-Z])|∈/g, " appartient à ")
    .replace(/\\pi(?![a-zA-Z])|π/g, " pi ")
    .replace(/\\(cos|sin|tan)(?![a-zA-Z])/g, (_, t) => ({ cos: " cosinus ", sin: " sinus ", tan: " tangente " })[t as "cos" | "sin" | "tan"])
    .replace(/\\ln(?![a-zA-Z])/g, " l n ")
    .replace(/\\(alpha|beta|gamma|delta|Delta|theta|lambda|mu|sigma|omega)(?![a-zA-Z])/g, " $1 ")
    .replace(/\\infty/g, " l'infini ")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}]/g, " ");
}

/** Un texte d'énoncé (avec ses $…$) en français parlé. */
export function enMots(texte: string): string {
  let s = texte
    // Probabilité conditionnelle : « P_A(B) » se lit « P de B sachant A »
    // (et « P_{\overline{A}}(B) », « P de B sachant non A »)
    .replace(/P_\{?\s*(?:\\overline\{([A-Z])\}|([A-Z]))\s*\}?\s*\(([^()]*)\)/g, (_m, barre, a, b) => ` P de ${b} sachant ${barre ? `non ${barre}` : a} `)
    .replace(/\\overline\{([A-Z])\}/g, " $1 barre ")
    .replace(/\s?°C\b/g, " degrés")
    .replace(/```[a-z]*\n?/g, " ")
    .replace(/\*\*/g, "")
    // Tableur (STMG) : dans « `$B$2` » ou « C$9 », le « $ » est un vrai dollar.
    .replace(/`([^`]*)`/g, (_m, code: string) => code.replace(/\$/g, " dollar "))
    .replace(/\$?\b([A-Z]{1,2})\$(\d+)\b/g, (m: string, col: string, lig: string) => `${m.startsWith("$") ? " dollar " : " "}${col} dollar ${lig} `)
    // Un trou à compléter : « un angle droit mesure ___ degrés »
    .replace(/_{2,}/g, " combien ")
    .replace(/\\%/g, "%")
    .replace(/\$([^$]+)\$/g, (_, f) => ` ${formuleEnMots(f)} `)
    .replace(/[−–]/g, "-");
  // ⭐ Le coach écrit aussi du LaTeX SANS dollars, surtout dans les choix et
  // la réponse attendue (« x^2 », « \dfrac{\sqrt{3}}{2} ») : le même
  // traducteur passe sur le reste. Sans effet sur un texte ordinaire, qui n'a
  // ni « \ », ni « ^ », ni « _ », ni accolades.
  s = formuleEnMots(s);
  // Les unités AVANT « ² » : sinon « cm² » deviendrait « cm au carré ».
  for (const [re, mot] of UNITES) s = typeof mot === "string" ? s.replace(re, mot) : s.replace(re, mot);
  s = s
    // Hors formule : « 3/4 », « x² », « × », « ÷ », « … »
    .replace(/(\d)\s*\/\s*(\d)/g, "$1 sur $2")
    .replace(/²/g, " au carré").replace(/³/g, " au cube")
    .replace(/×/g, " fois ").replace(/÷/g, " divisé par ")
    .replace(/…/g, " combien ")
    .replace(/√/g, " racine carrée de ")
    .replace(/°/g, " degrés")
    .replace(/(\d)\s?%/g, "$1 pour cent")
    // Un nombre négatif ou une soustraction
    .replace(/(^|[\s(=;])-\s?(\d)/g, "$1moins $2")
    .replace(/\s-\s/g, " moins ")
    .replace(/\s\+\s/g, " plus ")
    .replace(/\s=\s|=/g, " égale ")
    .replace(/\s<\s/g, " inférieur à ").replace(/\s>\s/g, " supérieur à ");
  s = s.replace(/\s+/g, " ").replace(UN_AU_SINGULIER, "$1$2 $3").replace(/(^|[^\d,])([01] \p{L}+) (carré|cube)s\b/gu, "$1$2 $3");
  // Hors formule aussi : « u_n », « 0,5\,u_n »
  s = s.replace(/_\{([^{}]*)\}/g, " indice $1 ").replace(/_(\w)/g, " indice $1 ").replace(/\\[,;:! ]/g, " ");
  // « PAS » en capitales pour insister : un mot, pas des noms de points.
  s = s.replace(/\b(PAS|NE|NON|OUI|ET|OU|SANS|AVANT|APRÈS|DIFFÉRENTS|TOUS|RIEN)\b/g, (m) => m.toLowerCase());
  // « A' », « F' » : « A prime » — mais pas « L'égalité » ni « D'après ».
  // Et « L'IA », « D'EDF » sont des élisions : pas de prime après L, D, J…
  s = s.replace(/([A-Z])'(?=[A-Z\s\]).,;:?!]|$)/g, (m: string, l: string, i: number, t: string) =>
    /[LDJMNSTC]/.test(l) && /[A-Z]/.test(t[i + 2] ?? "") && !/[A-Z]/.test(t[i - 1] ?? "") ? m : `${l} prime `);
  // Des noms de points : « AB » se lit « A B », pas comme un mot.
  s = s.replace(/\b([A-Z]{2,4})\b/g, (m) => m.split("").join(" "));
  // « les vecteurs \vec{u} et… » : pas « les vecteurs vecteur u »
  s = s.replace(/\b(vecteurs?) vecteur\b/g, "$1");
  return s.replace(/\s+/g, " ").replace(/\s([.,;:?!])/g, "$1").trim();
}
