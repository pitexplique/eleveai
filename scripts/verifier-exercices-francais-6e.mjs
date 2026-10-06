// Le contrôle des feuilles d'exercices de FRANÇAIS de 6e (06/10/2026).
//
// Une feuille de français n'a pas de calcul à refaire : ce qui se vérifie, c'est
// la FORME que Frédéric a demandée et ce qui a déjà cassé ailleurs.
//   · le socle commun (`controlesCommuns`, matière français) : 20 = 8 + 8 + 4,
//     dollars, consignes sans formule, micros de la notion toutes servies ;
//   · chaque corrigé finit par « Réponse : », nomme son piège (⛔) et dit à
//     l'enfant qu'il a réussi (✅ — « l'enfant est heureux de réussir ») ;
//   · quatre problèmes TITRÉS, rappels de 2 à 4 lignes ;
//   · des FORMATS VARIÉS (« pas qu'une dictée : QCM, dictée, mots à entourer ») :
//     au moins quatre formats différents, dont une dictée ;
//   · au moins 12 dessins (figure ou schéma) et une ouverture ;
//   · des phrases courtes (public de 11 ans) : 22 mots au plus hors citation ;
//   · l'ÉLISION (« de Ibrahim », « que Inès » : attrapés sur le coach le 06/10) ;
//   · aucune phrase citée de la fiche de cours reprise telle quelle.
//
// Usage : node scripts/verifier-exercices-francais-6e.mjs <slug> [<slug>…]
//         (le notionId du coach = le slug avec des « _ »).

import fs from "node:fs";
import path from "node:path";
import { RACINE, controlesCommuns, creerVerif, lireFeuille } from "./verifier-exercices-commun.mjs";

const FORMATS = [
  ["QCM", /Choisis (la bonne|le bon)/],
  ["mots à entourer", /Entoure/],
  ["vrai ou faux", /Vrai ou faux/],
  ["dictée", /[Dd]ictée/],
  ["texte à corriger", /fautes?/],
  ["réécriture", /Récris/],
  ["texte à compléter", /Complète/],
  ["accorder", /Accorde/],
];

const VOYELLE = "aeiouyàâäéèêëîïôöùûü";
// ⚠️ Pas de lookbehind `(?<!\p{L})` : avec le drapeau `i`, il laissait passer
// « gran|de île » (mesuré le 06/10). Le mot doit commencer la chaîne ou suivre
// un blanc, un guillemet, une parenthèse ou un tiret.
const ELISION = new RegExp(`(?:^|[\\s«(—])(de|que|le|la|je|me|te|se|ne|ce|jusque|lorsque|puisque) (?=[${VOYELLE}])`, "gi");

function verifierUne(slug) {
  const fichier = `lib/fiches-exercices/francais-6e-${slug}.tsx`;
  const notionId = slug.replace(/-/g, "_");
  const source = fs.readFileSync(path.join(RACINE, fichier), "utf8");
  const f = lireFeuille(source);
  const v = creerVerif(true);
  console.log(`\n═══ ${fichier} (${notionId})`);

  controlesCommuns(v, source, { notionId, classe: "6e", matiere: "francais" });

  v.titre("Les corrigés, à hauteur d'enfant");
  const sansReponse = f.corrections.map((c, i) => (/Réponse ?:/.test(c) ? null : i + 1)).filter(Boolean);
  v.ok("chaque corrigé finit par « Réponse : »", sansReponse.length === 0, sansReponse.join(", "));
  const sansPiege = f.corrections.map((c, i) => (c.includes("⛔") ? null : i + 1)).filter(Boolean);
  v.ok("chaque corrigé nomme son piège (⛔)", sansPiege.length === 0, sansPiege.join(", "));
  const sansBravo = f.corrections.map((c, i) => (c.includes("✅") ? null : i + 1)).filter(Boolean);
  v.ok("chaque corrigé dit la réussite (✅)", sansBravo.length === 0, sansBravo.join(", "));
  const courts = f.corrections.map((c, i) => (c.split("\\n").length >= 4 ? null : i + 1)).filter(Boolean);
  v.ok("chaque corrigé a au moins 4 étapes", courts.length === 0, courts.join(", "));

  v.titre("La forme de la feuille");
  const titres = [...f.series.matchAll(/^\s*titre: "((?:[^"\\]|\\.)*)",\s*$/gm)].map((m) => m[1]);
  v.ok("3 séries titrées + 4 problèmes titrés", titres.length === 7, `${titres.length} titres`);
  const rappels = [...f.series.matchAll(/rappel: \[([\s\S]*?)\],/g)].map((m) => (m[1].match(/^\s*"/gm) ?? []).length);
  v.ok("rappels de 2 à 4 lignes", rappels.length === 3 && rappels.every((n) => n >= 2 && n <= 4), JSON.stringify(rappels));
  const formats = FORMATS.filter(([, re]) => f.enonces.some((e) => re.test(e))).map(([n]) => n);
  v.ok(`au moins 4 formats d'exercices (${formats.join(", ")})`, formats.length >= 4);
  v.ok("au moins une dictée", formats.includes("dictée"));
  const dessins = (f.series.match(/^\s*(figure|schema): /gm) ?? []).length;
  v.ok(`au moins 12 dessins (${dessins})`, dessins >= 12);
  v.ok("une ouverture en tête de feuille", /^\s*ouverture: /m.test(source));

  v.titre("La langue");
  // Les phrases hors citation : on retire le texte entre « » (les supports, les
  // dictées, les fautes exprès), puis on coupe aux points.
  const horsCitation = f.textes.map((t) => t.replace(/«[^»]*»/g, "« »").replace(/\\n/g, ". "));
  const longues = horsCitation
    .flatMap((t) => t.split(/(?<=[.!?:;])\s+/))
    .map((p) => p.trim())
    .filter((p) => p.split(/\s+/).filter((m) => /\p{L}/u.test(m)).length > 22);
  v.ok("aucune phrase de plus de 22 mots hors citation", longues.length === 0, longues.slice(0, 2).join(" | ").slice(0, 200));
  // ⛔ Les textes fautifs EXPRÈS (lettres, messages) sont entre « » : on ne lit
  // l'élision que hors citation, et dans les dictées (texte de la correction).
  const elisions = horsCitation.flatMap((t) => [...t.matchAll(ELISION)].map((m) => t.slice(Math.max(0, m.index - 12), m.index + 16)));
  v.ok("aucune élision oubliée (« de Inès »)", elisions.length === 0, elisions.slice(0, 3).join(" | "));

  const cours = path.join(RACINE, `lib/fiches/francais-6e-${slug}.tsx`);
  if (fs.existsSync(cours)) {
    const srcCours = fs.readFileSync(cours, "utf8");
    const citees = [...srcCours.matchAll(/«\s*([^»]{18,}?)\s*»/g)].map((m) => m[1].trim()).filter((s) => s.split(/\s+/).length >= 4);
    const reprises = [...new Set(citees.filter((c) => f.textes.some((t) => t.includes(c))))];
    v.ok(`aucune des ${citees.length} citations de la fiche de cours reprise`, reprises.length === 0, reprises.slice(0, 3).join(" | "));
  }
  return v.erreurs();
}

const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.log("Usage : node scripts/verifier-exercices-francais-6e.mjs <slug> [<slug>…]");
  process.exit(1);
}
let total = 0;
for (const s of slugs) total += verifierUne(s);
console.log(total ? `\n✗ ${total} écart(s)` : "\n✓ 0 fausses");
process.exitCode = total ? 1 : 0;
