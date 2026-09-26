// lib/automatismes/lecture.ts
//
// ⭐ La question LUE À VOIX HAUTE (Frédéric, 26/09 : « ils ne savent pas très
// bien lire, on devrait rajouter un audio comme dans le coach qui lit la
// question et les choix » — d'abord du CP à la 6e, puis « même pour tous : tu
// n'as pas envie de lire dans un bus mais d'écouter »).
//
// La voix est celle du navigateur (`speakText` du coach). Mais le coach lit le
// texte brut : sur une formule, la voix prononcerait « dollar, backslash,
// dfrac ». Ici, on traduit d'abord les formules en français parlé :
// « $\dfrac{3}{4}$ » → « 3 sur 4 », « $x^2$ » → « x au carré »,
// « $\sqrt{25}$ » → « racine carrée de 25 », « 12 cm² » → « 12 centimètres
// carrés », « AB » → « A B ».

import type { AutoQuestion } from "./types";

const UNITES: [RegExp, string][] = [
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
  [/\b(en|combien) L\b/g, "$1 litres"],
  [/\b(en|combien) min\b/g, "$1 minutes"],
  [/\b(en|combien) h\b/g, "$1 heures"],
  [/\b(en|combien) s\b/g, "$1 secondes"],
  [/\ben €/g, "en euros"],
];

/** « 1 centimètres » → « 1 centimètre » : au singulier après 0 et 1 (pas après 1,5). */
const UN_AU_SINGULIER = /(^|[^\d,])([01]) (kilomètre|hectomètre|décamètre|mètre|décimètre|centimètre|millimètre|kilogramme|gramme|litre|millilitre|centilitre|heure|minute|seconde|degré|euro)s\b/g;

/** Une formule LaTeX (sans ses $) en français parlé. */
function formuleEnMots(f: string): string {
  let s = f;
  // Les constructions imbriquées se déplient de l'intérieur : on répète.
  for (let i = 0; i < 4; i++) {
    s = s
      .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, " $1 sur $2 ")
      .replace(/\\sqrt\{([^{}]*)\}/g, " racine carrée de $1 ")
      .replace(/\\widehat\{([^{}]*)\}/g, " l'angle $1 ")
      .replace(/\\overrightarrow\{([^{}]*)\}/g, " vecteur $1 ")
      .replace(/\\text\{([^{}]*)\}/g, " $1 ")
      .replace(/\\(?:mathbf|mathrm|boldsymbol)\{([^{}]*)\}/g, " $1 ");
  }
  return s
    .replace(/_\{([^{}]*)\}/g, " indice $1 ")
    .replace(/_(\w)/g, " indice $1 ")
    .replace(/\\[,;:! ]/g, " ")
    .replace(/\^\{?2\}?/g, " au carré ")
    .replace(/\^\{?3\}?/g, " au cube ")
    .replace(/\^\{([^{}]*)\}/g, " puissance $1 ")
    .replace(/\^(-?\w)/g, " puissance $1 ")
    .replace(/\\times|×/g, " fois ")
    .replace(/\\div|÷/g, " divisé par ")
    .replace(/\\cdot/g, " fois ")
    .replace(/\\(?:ldots|dots)|…/g, " combien ")
    .replace(/\\leq?|⩽|≤/g, " inférieur ou égal à ")
    .replace(/\\geq?|⩾|≥/g, " supérieur ou égal à ")
    .replace(/\\neq|≠/g, " différent de ")
    .replace(/\\pi|π/g, " pi ")
    .replace(/\\(cos|sin|tan)/g, (_, t) => ({ cos: " cosinus ", sin: " sinus ", tan: " tangente " })[t as "cos" | "sin" | "tan"])
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
    .replace(/\$([^$]+)\$/g, (_, f) => ` ${formuleEnMots(f)} `)
    .replace(/[−–]/g, "-");
  // Les unités AVANT « ² » : sinon « cm² » deviendrait « cm au carré ».
  for (const [re, mot] of UNITES) s = s.replace(re, mot);
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
  s = s.replace(/([A-Z])'(?=[A-Z\s\]).,;:?!]|$)/g, "$1 prime ");
  // Des noms de points : « AB » se lit « A B », pas comme un mot.
  s = s.replace(/\b([A-Z]{2,4})\b/g, (m) => m.split("").join(" "));
  return s.replace(/\s+/g, " ").replace(/\s([.,;:?!])/g, "$1").trim();
}

/** Ce que le bouton « Écouter » lit : l'énoncé, puis les propositions d'un QCM. */
export function texteALire(q: AutoQuestion): string {
  const parts = [enMots(q.text)];
  if (q.format === "qcm" && q.choices?.length) {
    const lettres = ["A", "B", "C", "D", "E", "F"];
    parts.push(`Voici les réponses possibles. ${q.choices.map((c, i) => `Réponse ${lettres[i] ?? i + 1} : ${enMots(c)}`).join(". ")}.`);
  }
  return parts.join(" ");
}
