// Contrôle du LaTeX RENDU dans les énoncés du coach — à l'exécution.
//
// POURQUOI (18/08/2026). Le bandeau de correction rappelle désormais l'énoncé
// (`WrongAnswerPanel`, app/tutor-v4/TutorV4Client.tsx). Frédéric : « il ne faut
// pas de $ dans les formules, donc du latex quand c'est nécessaire », « je te
// parle surtout pour le coach maths ». D'où la question à trancher : les
// banques écrivent-elles un LaTeX que KaTeX sait rendre, ou reste-t-il des
// délimiteurs qui s'afficheront tels quels à l'élève ?
//
// ⛔ NE PAS LIRE LE SOURCE POUR RÉPONDRE À ÇA. Une première version de ce
// contrôle a compté les `${...}` d'interpolation TypeScript comme des
// délimiteurs mathématiques : elle annonçait 32 920 lignes fautives et 148
// fichiers « à $ impair » sur 275, c'est-à-dire du bruit à 100 %. Les énoncés
// n'existent qu'une fois `generate()` appelé — c'est là qu'on les mesure. Même
// leçon que `auditer-banque-runtime.ts` face à `auditer-banque.mjs`.
//
// CE QUE REMARK-MATH SAIT FAIRE, et qui définit donc ce qui est « fautif » :
//   - `$x+1$` → rendu. C'est la forme attendue.
//   - `$ x+1 $` → PAS rendu : un espace collé au délimiteur ouvrant annule la
//     formule, et l'élève voit les deux dollars.
//   - `\( x \)` → PAS rendu : ces délimiteurs ne sont pas activés.
//   - un `$` seul dans l'énoncé → délimiteur oublié, le dollar s'affiche.
// Un `$` peut aussi être une VRAIE monnaie (« 12 $ »), mais le coach chiffre en
// euros : un dollar isolé est donc traité comme une anomalie à regarder.
//
// Usage — tsx n'est pas une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/verifier-latex.ts
//   npx --yes tsx@4 scripts/verifier-latex.ts seconde premiere-spe
//   npx --yes tsx@4 scripts/verifier-latex.ts --matiere francais

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const CLASSES_MATHS = [
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere", "premiere-spe", "terminale-spe", "stmg", "adulte",
];

// Trois tirages par gabarit : un générateur qui n'écrit du LaTeX que dans
// certaines branches (« si a < 0 … ») ne se trahit pas au premier essai.
const TIRAGES = 3;

type Anomalie = {
  classe: string;
  id: string;
  genre: string;
  extrait: string;
};

function analyser(texte: string): string | null {
  if (!texte) return null;

  // ⚠️ LE CODE INLINE EST HORS D'ATTEINTE DE REMARK-MATH, et c'est ce qui sauve
  // les formules de tableur : dans `` `=B2*C$1` ``, le dollar s'affiche tel
  // quel. Sans cette ligne, l'instrument criait sur des textes parfaitement
  // corrects — premier réglage de l'étalon (18/08/2026).
  const horsCode = texte.replace(/`[^`]*`/g, "");

  if (/\\\(|\\\)/.test(horsCode)) return "délimiteurs \\( \\) — non rendus";

  // ⛔ L'ANGLE MORT QUI COMPTE LE PLUS, trouvé en relisant les échecs STMG.
  // `=$B$2*3` est un `$B$` PARFAITEMENT bien formé pour KaTeX : il le rend, en
  // italique, et les deux dollars disparaissent. Or ces dollars SONT le sujet
  // de la question — l'adressage absolu d'un tableur. Le test « reste-t-il un $
  // orphelin ? » ne pouvait donc pas le voir : rien n'est orphelin, tout est
  // avalé. Une référence de tableur se reconnaît à sa forme : lettres de
  // colonne encadrées, chiffre de ligne collé derrière.
  if (/\$[A-Z]{1,3}\$\d/.test(horsCode)) {
    return "référence de tableur ($B$2) : KaTeX avalera les deux dollars — écrire `=$B$2` entre accents graves";
  }

  // On retire les formules bien formées, puis on regarde ce qui reste.
  const restant = horsCode
    .replace(/\$\$[^$]+\$\$/g, "")
    .replace(/\$[^\s$][^$]*\$/g, "");

  if (restant.includes("$")) {
    if (/\$\s/.test(horsCode)) return "espace après le $ ouvrant — formule non rendue";
    return "$ isolé — délimiteur oublié";
  }

  return null;
}

function textesDe(item: TutorBankItemV4): string[] {
  const out: string[] = [];

  if (item.kind === "fixed") {
    out.push(item.text);
    if (item.choices) out.push(...item.choices);
    if (item.explanation) out.push(item.explanation);
    return out;
  }

  for (let i = 0; i < TIRAGES; i++) {
    try {
      const q = item.generate();
      out.push(q.text);
      if (q.choices) out.push(...q.choices);
      if (q.explanation) out.push(q.explanation);
    } catch {
      // Un générateur qui casse est le problème de `verifier-generateurs.mjs`,
      // pas celui-ci : on ne masque rien, on ne double pas l'alerte.
    }
  }

  return out;
}

async function main() {
  const args = process.argv.slice(2);
  const iMatiere = args.indexOf("--matiere");
  const matiere = iMatiere >= 0 ? args[iMatiere + 1] : "maths";
  const demandees = args.filter((a) => !a.startsWith("--") && a !== matiere);
  const classes = demandees.length > 0 ? demandees : CLASSES_MATHS;

  const anomalies: Anomalie[] = [];
  let nbItems = 0;
  let nbTextes = 0;

  for (const classe of classes) {
    const banque = await loadQuestionBankV4(classe, matiere);
    if (banque.length === 0) {
      console.log(`⚠️  ${classe} ${matiere} : banque vide (0 item)`);
      continue;
    }

    let anomaliesClasse = 0;

    for (const item of banque) {
      nbItems++;
      for (const texte of textesDe(item)) {
        nbTextes++;
        const genre = analyser(texte);
        if (genre) {
          anomaliesClasse++;
          if (anomalies.length < 40) {
            anomalies.push({
              classe,
              id: item.id,
              genre,
              extrait: texte.replace(/\n/g, " ⏎ ").slice(0, 120),
            });
          }
        }
      }
    }

    const verdict = anomaliesClasse === 0 ? "✅" : "❌";
    console.log(
      `${verdict} ${classe.padEnd(14)} ${String(banque.length).padStart(4)} items — ${anomaliesClasse} anomalie(s)`
    );
  }

  console.log(
    `\n${nbItems} items tirés, ${nbTextes} textes analysés (énoncés + choix + explications).`
  );

  if (anomalies.length === 0) {
    console.log("✅ Aucun $ ne s'affichera à l'élève : tout le LaTeX est rendu.");
    return;
  }

  console.log(`\n❌ ${anomalies.length} anomalie(s) — les 40 premières :\n`);
  for (const a of anomalies) {
    console.log(`  [${a.classe}] ${a.id}`);
    console.log(`     ${a.genre}`);
    console.log(`     « ${a.extrait} »`);
  }
  process.exitCode = 1;
}

void main();
