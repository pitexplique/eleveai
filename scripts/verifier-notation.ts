// Contrôle de la NOTATION EN CLAIR dans les textes du tuteur — à l'exécution.
//
// POURQUOI (14/09/2026). Frédéric, captures à l'appui : « dans certaines
// classes exponentielle s'écrit e^x et non pas avec l'écriture maths ». Un
// « e^x » à l'écran a trois causes qui ne se ressemblent pas dans le source :
//   · une formule écrite sans `$` (« Calculer 8^2 », « u_8 », « 1/x^4 ») ;
//   · un libellé de CANVAS SVG (« Les valeurs de 2^x ») — là, pas de KaTeX ;
//   · du code affiché tel quel : une explanation entre guillemets droits au
//     lieu d'accents graves (« ${signe > 0 ? '+' : '-'} » lu par l'élève), un
//     `/\cos|\sin/` à un seul antislash qui laissait « N(\sin\π - x) ».
//
// ⛔ AUCUN AUTRE VÉRIFICATEUR NE LES VOIT. `verifier-latex.ts` cherche les `$`
// mal formés : une formule qui n'a jamais eu de `$` lui est invisible.
// `verifier-libelles.ts` ne lit que les libellés de notions et de micros.
// Ici on génère les items (5 tirages par gabarit) et on cherche, HORS des
// `$…$` et du code inline : un `^`, une macro LaTeX, un indice `x_y`.
//
// ⭐ DEUX CANVAS SONT EN HTML ET RENDENT LE KaTeX par `TexteMath` :
// `tableau_signes` et `tableau_donnees` (lib/canvas/). Leurs chaînes se lisent
// comme de la prose. Les autres sont en SVG : un `$` s'y affiche tel quel, et
// c'est lui l'anomalie. Sans cette distinction, l'instrument criait 470 faux
// positifs sur les tableaux de signes de seconde.
//
// ⚠️ `expected` n'est PAS analysé : c'est ce que l'élève TAPE (« 5^8 »), pas
// ce qu'il lit.
//
// Usage — tsx n'est pas une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/verifier-notation.ts
//   npx --yes tsx@4 scripts/verifier-notation.ts seconde premiere-spe

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const CLASSES_MATHS = [
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere", "premiere-spe", "terminale-spe", "stmg", "adulte",
];

const TIRAGES = 5;
const CANVAS_HTML = new Set(["tableau_signes", "tableau_donnees"]);

type Texte = { champ: string; texte: string };

function chaines(obj: unknown, out: string[] = []): string[] {
  if (typeof obj === "string") out.push(obj);
  else if (Array.isArray(obj)) obj.forEach((o) => chaines(o, out));
  else if (obj && typeof obj === "object") Object.values(obj).forEach((o) => chaines(o, out));
  return out;
}

function textesDe(item: TutorBankItemV4): Texte[] {
  const out: Texte[] = [];
  const pousser = (q: {
    text: string;
    choices?: string[];
    hint?: string;
    explanation?: string;
    canvas?: { kind: string };
  }) => {
    out.push({ champ: "text", texte: q.text });
    (q.choices ?? []).forEach((c) => out.push({ champ: "choice", texte: c }));
    if (q.hint) out.push({ champ: "hint", texte: q.hint });
    if (q.explanation) out.push({ champ: "explanation", texte: q.explanation });
    if (q.canvas) {
      const champ = CANVAS_HTML.has(q.canvas.kind) ? `canvas-html:${q.canvas.kind}` : "canvas";
      chaines(q.canvas).forEach((s) => out.push({ champ, texte: s }));
    }
  };
  if (item.kind === "fixed") {
    pousser(item);
    return out;
  }
  for (let i = 0; i < TIRAGES; i++) {
    try {
      pousser({ hint: item.hint, ...item.generate() });
    } catch {
      // Un générateur qui casse est le problème de `verifier-generateurs.mjs`.
    }
  }
  return out;
}

function analyser(t: Texte): string | null {
  if (!t.texte) return null;

  if (t.champ === "canvas") {
    if (t.texte.includes("$")) return "canvas SVG : $ — KaTeX absent, le dollar s'affiche";
    if (/\^/.test(t.texte)) return "canvas SVG : ^ en clair — écrire l'exposant en Unicode (ˣ, ², ⁿ)";
    if (/\\[a-zA-Z]+/.test(t.texte)) return "canvas SVG : macro LaTeX";
    return null;
  }

  const hors = t.texte
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/\$\$[^$]+\$\$/g, "")
    .replace(/\$[^\s$][^$]*\$/g, "");

  if (/\^/.test(hors)) return "^ hors formule";
  if (/\\(frac|dfrac|sqrt|times|div|mapsto|ln|exp|cdot|le|ge|leq|geq|neq|infty|pi|sum|mathbb|overline|vec|widehat|text|approx)\b/.test(hors)) {
    return "macro LaTeX hors formule";
  }
  if (/(^|[^\w])[A-Za-z]_[A-Za-z0-9({]/.test(hors)) return "_ indice hors formule";
  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const iMatiere = args.indexOf("--matiere");
  const matiere = iMatiere >= 0 ? args[iMatiere + 1] : "maths";
  const demandees = args.filter((a) => !a.startsWith("--") && a !== matiere);
  const classes = demandees.length > 0 ? demandees : CLASSES_MATHS;

  const parGenre = new Map<string, { n: number; ex: string[] }>();
  let total = 0;

  for (const classe of classes) {
    const banque = await loadQuestionBankV4(classe, matiere);
    if (banque.length === 0) {
      console.log(`⚠️  ${classe} ${matiere} : banque vide (0 item)`);
      continue;
    }
    let n = 0;
    const vus = new Set<string>();
    for (const item of banque) {
      for (const t of textesDe(item)) {
        const g = analyser(t);
        if (!g) continue;
        n++;
        const cle = `${classe} · ${g}`;
        const e = parGenre.get(cle) ?? { n: 0, ex: [] };
        e.n++;
        const k = `${item.id}|${t.champ}`;
        if (!vus.has(k) && e.ex.length < 20) {
          vus.add(k);
          e.ex.push(`${item.id} [${t.champ}] « ${t.texte.replace(/\n/g, " ⏎ ").slice(0, 140)} »`);
        }
        parGenre.set(cle, e);
      }
    }
    total += n;
    console.log(`${n === 0 ? "✅" : "❌"} ${classe.padEnd(14)} ${String(banque.length).padStart(4)} items — ${n} texte(s) suspect(s)`);
  }

  if (total === 0) {
    console.log("\n✅ Aucune notation en clair hors des formules : tout ce que l'élève lit passe par KaTeX ou l'Unicode.");
    return;
  }
  for (const [cle, e] of parGenre) {
    console.log(`\n## ${cle} — ${e.n}`);
    e.ex.forEach((x) => console.log("  " + x));
  }
  process.exitCode = 1;
}

void main();
