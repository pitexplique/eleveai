// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Proportionnalité et
// pourcentages » de 3e (lib/fiches-exercices/maths-3e-proportionnalite.tsx).
//
//   node scripts/verifier-exercices-proportionnalite-3e.mjs
//
// Même règle que pour les autres feuilles : on ne relit pas le corrigé, on REFAIT
// le calcul à partir des DONNÉES DE L'ÉNONCÉ (recopiées ici), en fractions
// exactes, puis on exige que le résultat se LISE dans le corrigé — par sa PHRASE
// (« il reste $120 - 24 = 96$ »), pas par le nombre seul : un « 96 » traîne
// toujours quelque part dans un corrigé qui parle de 96.
//
// ⚠️ POURQUOI CE SCRIPT NE PASSE PAS PAR `lancer()` DU SOCLE : `controlesCommuns`
// lit les micros de SECONDE, écrites sur une ligne (`{ id: "…", label: "…",
// notionId: "…" }`). Celles de 3e sont écrites sur quatre lignes, et `lancer()`
// ne transmet pas la classe. Plutôt que de toucher un fichier partagé en plein
// chantier, ce script emprunte les briques pures du socle (fractions, lecture,
// vérificateur) et refait ici la passe et les contrôles négatifs — joués EN
// MÉMOIRE, comme là-bas : le fichier n'est jamais touché.

import fs from "node:fs";
import path from "node:path";
import { RACINE, Q, D, fois, div, plus, moins, egal, tex, lireFeuille, creerVerif } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-3e-proportionnalite.tsx";
const NOTION = "prop_proportionnalite";

/** Un prix : toujours deux décimales (`22{,}50`), ce que `tex()` ne fait pas. */
function prix(a) {
  const centimes = fois(a, Q(100));
  if (centimes.d !== 1n) throw new Error(`pas un nombre de centimes : ${a.n}/${a.d}`);
  const s = centimes.n.toString().padStart(3, "0");
  return `${s.slice(0, -2)}{,}${s.slice(-2)}`;
}
const pc = (p) => div(Q(p), Q(100));
const hausse = (p) => plus(Q(1), pc(p));
const baisse = (p) => moins(Q(1), pc(p));

function verifier(source, v) {
  const { corrections } = lireFeuille(source);
  const lit = (k, phrase, quoi) =>
    v.ok(`ex. ${k} — ${quoi}`, (corrections[k - 1] ?? "").includes(phrase), `phrase absente : ${phrase}`);

  v.titre("Niveau 1 — un seul geste");
  // 1. 2 kg → 7 €, 5 kg → 17,50 €, 8 kg → 28 €
  const q1 = [[2, "7"], [5, "17,5"], [8, "28"]].map(([m, p]) => div(D(p), Q(m)));
  v.ok("ex. 1 — les trois quotients sont égaux", q1.every((q) => egal(q, q1[0])));
  lit(1, `Le coefficient est $${tex(q1[0])}$`, `coefficient ${tex(q1[0])}`);
  lit(1, `$${prix(q1[0])}$ €`, "le prix du kilo");
  // 2. 4 → 10 ; 6 → a ; b → 35
  const k2 = div(Q(10), Q(4));
  lit(2, `$10 \\div 4 = ${tex(k2)}$`, "coefficient");
  lit(2, `$a = 6 \\times ${tex(k2)} = ${tex(fois(Q(6), k2))}$`, "a");
  lit(2, `$b = 35 \\div ${tex(k2)} = ${tex(div(Q(35), k2))}$`, "b");
  // 3. 3 kg → 13,50 € ; 5 kg ?
  const x3 = div(fois(D("13,5"), Q(5)), Q(3));
  lit(3, `Réponse : $5$ kg coûtent $${prix(x3)}$ €`, "quatrième proportionnelle");
  lit(3, `$13{,}50 \\div 3 = ${prix(div(D("13,5"), Q(3)))}$`, "prix du kilo");
  // 4. 15 % de 240
  lit(4, `Réponse : $15\\,\\%$ de $240$ font $${tex(fois(pc(15), Q(240)))}$`, "15 % de 240");
  // 5. 8 sur 25
  lit(5, `Réponse : $${tex(fois(div(Q(8), Q(25)), Q(100)))}\\,\\%$ de la classe`, "8 sur 25 en pourcentage");
  // 6. 60 € + 20 %
  lit(6, `Réponse : le nouveau prix est $${tex(fois(Q(60), hausse(20)))}$ €`, "60 € + 20 %");
  // 7. −35 % ; 80 €
  lit(7, `on multiplie par $${tex(baisse(35))}$`, "coefficient de −35 %");
  lit(7, `Réponse : le sac soldé coûte $${tex(fois(Q(80), baisse(35)))}$ €`, "prix soldé");
  lit(7, `On obtiendrait $${tex(fois(Q(80), pc(35)))}$ €`, "le montant de la réduction (piège)");
  // 8. 150 km en 2 h 30
  const h8 = plus(Q(2), div(Q(30), Q(60)));
  lit(8, `c'est $${tex(h8)}$ h`, "2 h 30 en heures");
  lit(8, `Réponse : la vitesse moyenne est $${tex(div(Q(150), h8))}$ km/h`, "vitesse");

  v.titre("Niveau 2 — type devoir");
  // 9. taxi : 3 € + 2 €/km
  const taxi = (d) => plus(Q(3), fois(Q(2), Q(d)));
  lit(9, `$3 + 2 \\times 1 = ${tex(taxi(1))}$ € ; $3 + 2 \\times 2 = ${tex(taxi(2))}$ € ; $3 + 2 \\times 5 = ${tex(taxi(5))}$ €`, "les trois courses");
  v.ok("ex. 9 — les quotients diffèrent bien", !egal(div(taxi(1), Q(1)), div(taxi(2), Q(2))));
  lit(9, `$7 \\div 2 = ${tex(div(taxi(2), Q(2)))}$`, "second quotient");
  lit(9, `$3 + 2 \\times 10 = ${tex(taxi(10))}$ €. Le double de $${tex(taxi(5))}$ € serait $${tex(fois(Q(2), taxi(5)))}$ €`, "10 km contre le double de 5 km");
  // 10. 12 L pour 200 km ; 350 km ?
  lit(10, `Réponse : elle consommera $${tex(div(fois(Q(12), Q(350)), Q(200)))}$ L`, "consommation");
  // 11. 40 % de 150
  lit(11, `Réponse : $40\\,\\%$ de $150$ font $${tex(fois(pc(40), Q(150)))}$`, "40 % de 150");
  // 12. jean 45 € −30 %
  const red12 = fois(pc(30), Q(45));
  lit(12, `Réponse : la réduction est de $${prix(red12)}$ €`, "réduction");
  lit(12, `Réponse : le jean soldé coûte $${prix(moins(Q(45), red12))}$ €`, "prix soldé");
  v.ok("ex. 12 — 45 × 0,70 redonne le prix soldé", egal(fois(Q(45), baisse(30)), moins(Q(45), red12)));
  // 13. 80 € → 92 €
  const k13 = div(Q(92), Q(80));
  lit(13, `$92 \\div 80 = ${tex(k13)}$`, "coefficient");
  lit(13, `Réponse : le prix a augmenté de $${tex(fois(moins(k13, Q(1)), Q(100)))}\\,\\%$`, "pourcentage d'augmentation");
  // 14. verre doseur : 80 cL, −25 % puis +25 %
  const v1 = fois(Q(80), baisse(25));
  const v2 = fois(v1, hausse(25));
  lit(14, `Réponse : il reste $80 - 20 = ${tex(v1)}$ cL`, "après avoir versé");
  lit(14, `Réponse : le verre contient $60 + 15 = ${tex(v2)}$ cL`, "après avoir rajouté");
  lit(14, `Réponse : il manque $${tex(moins(Q(80), v2))}$ cL`, "ce qui manque");
  lit(14, `$0{,}75 \\times 1{,}25 = ${tex(fois(baisse(25), hausse(25)))}$`, "coefficient global");
  // 15. robinet : 18 L en 1 min 30 s ; cuve de 150 L
  const debit = div(Q(18), plus(Q(1), div(Q(30), Q(60))));
  const duree15 = div(Q(150), debit);
  lit(15, `Réponse : le débit est de $${tex(debit)}$ L/min`, "débit");
  // (le corrigé écrit « $= 150 \div 12 = … » : la phrase cherchée ne commence pas par « $ »)
  lit(15, `150 \\div 12 = ${tex(duree15)}$ min`, "durée décimale");
  const sec15 = fois(moins(duree15, Q(12)), Q(60));
  lit(15, `Réponse : il faut $12$ min $${tex(sec15)}$ s`, "durée en minutes et secondes");
  // 16. bus : 27 km en 36 min
  const h16 = div(Q(36), Q(60));
  lit(16, `36 \\div 60 = ${tex(h16)}$ h`, "36 min en heures");
  lit(16, `Réponse : la vitesse moyenne du bus est $${tex(div(Q(27), h16))}$ km/h`, "vitesse");
  lit(16, `$27 \\div 36 = ${tex(div(Q(27), Q(36)))}$`, "le quotient du piège");

  v.titre("Niveau 3 — problèmes");
  // 17. la tablette : 100, +20 %, −20 %
  const t1 = fois(Q(100), hausse(20));
  const retires = fois(pc(20), t1);
  const t2 = moins(t1, retires);
  lit(17, `Réponse : le grand format compte $100 + 20 = ${tex(t1)}$ carrés`, "grand format");
  lit(17, `Réponse : on retire $${tex(retires)}$ carrés, il en reste $120 - 24 = ${tex(t2)}$`, "après la réduction");
  lit(17, `Réponse : il en manque $${tex(moins(Q(100), t2))}$`, "carrés manquants");
  const k17 = fois(hausse(20), baisse(20));
  lit(17, `$1{,}20 \\times 0{,}80 = ${tex(k17)}$. Réponse : multiplier par $${tex(k17)}$, c'est baisser de $${tex(fois(moins(Q(1), k17), Q(100)))}\\,\\%$`, "coefficient global et baisse");
  v.ok("ex. 17 — 100 × 0,96 redonne 96", egal(fois(Q(100), k17), t2));
  // Le DESSIN compte les mêmes carrés : 96 pleins, 4 manquants, 20 retirés.
  v.ok("ex. 17 — le dessin : 96 pleins, 4 manquants", /k < 96 \? "plein" : k < 100 \? "manque" : "retire"/.test(source));
  // 18. les abonnés : 1000, −20 %, +20 %
  const a1 = fois(Q(1000), baisse(20));
  const a2 = fois(a1, hausse(20));
  lit(18, `Réponse : elle a $${tex(a1)}$ abonnés fin janvier`, "fin janvier");
  lit(18, `Réponse : elle a $${tex(a2)}$ abonnés fin février`, "fin février");
  lit(18, `Réponse : il lui manque $${tex(moins(Q(1000), a2))}$ abonnés`, "abonnés manquants");
  const k18 = div(Q(1000), a1);
  lit(18, `$1\\,000 \\div 800 = ${tex(k18)}$. Réponse : il aurait fallu une hausse de $${tex(fois(moins(k18, Q(1)), Q(100)))}\\,\\%$`, "hausse nécessaire");
  // 19. la deuxième démarque : 90 €, −30 %, −20 %
  const p1 = fois(Q(90), baisse(30));
  const p2 = fois(p1, baisse(20));
  const p50 = fois(Q(90), baisse(50));
  lit(19, `Réponse : après la première démarque, le blouson coûte $${tex(p1)}$ €`, "première démarque");
  lit(19, `Réponse : le prix final est $${prix(p2)}$ €`, "prix final");
  lit(19, `il coûterait $${tex(p50)}$ €, soit $${prix(moins(p2, p50))}$ € de moins`, "vraie remise de 50 %");
  const k19 = fois(baisse(30), baisse(20));
  lit(19, `$0{,}70 \\times 0{,}80 = ${tex(k19)}$. Réponse : multiplier par $${tex(k19)}$, c'est baisser de $${tex(fois(moins(Q(1), k19), Q(100)))}\\,\\%$`, "baisse totale");
  // 20. l'aller-retour : 80 km à 80 km/h, puis à 40 km/h
  const aller = div(Q(80), Q(80));
  const retour = div(Q(80), Q(40));
  lit(20, `Aller : $80 \\div 80 = ${tex(aller)}$ h. Retour : $80 \\div 40 = ${tex(retour)}$ h`, "les deux durées");
  const moyenne = div(Q(160), plus(aller, retour));
  const arrondi = (Math.round((Number(moyenne.n) / Number(moyenne.d)) * 10) / 10).toFixed(1).replace(".", "{,}");
  lit(20, `$160 \\div 3 \\approx ${arrondi}$. Réponse : sa vitesse moyenne est d'environ $${arrondi}$ km/h`, "vitesse moyenne");
  const min60 = fois(div(Q(160), Q(60)), Q(60)); // durée à 60 km/h, en minutes
  v.ok("ex. 20 — à 60 km/h, 160 km prennent 2 h 40 min", egal(min60, Q(160)) && 160 === 2 * 60 + 40);
  lit(20, "prendraient $2$ h $40$ min, pas $3$ h", "le contrôle écrit");
}

/** Ce qui est vrai de toute feuille — la version 3e des contrôles du socle. */
function controles(source, v) {
  const f = lireFeuille(source);
  v.titre("Le texte de la feuille");
  v.ok("20 énoncés, 20 corrigés", f.enonces.length === 20 && f.corrections.length === 20, `${f.enonces.length} / ${f.corrections.length}`);
  v.ok("8 + 8 + 4 : le format arrêté", JSON.stringify(f.nbParSerie) === "[8,8,4]", JSON.stringify(f.nbParSerie));
  const impaires = f.textes.filter((t) => (t.match(/\$/g) ?? []).length % 2 === 1);
  v.ok(`dollars appariés dans ${f.textes.length} chaînes`, impaires.length === 0, impaires[0]?.slice(0, 120));
  const fuites = f.textes.filter((t) => /[\\^]/.test(t.replace(/\$[^$]*\$/g, "").replace(/\\n/g, "")));
  v.ok("aucune notation LaTeX hors formule", fuites.length === 0, fuites[0]?.slice(0, 120));
  // ⛔ Un « % » nu dans une formule est un COMMENTAIRE pour KaTeX : tout ce qui
  // suit disparaît. Dans `$…$`, il s'écrit toujours `\%`.
  const formules = f.textes.flatMap((t) => t.match(/\$[^$]*\$/g) ?? []);
  const pourcentNu = formules.filter((m) => /(^|[^\\])%/.test(m));
  v.ok(`aucun « % » nu dans ${formules.length} formules`, pourcentNu.length === 0, pourcentNu[0]);
  const lignesTableau = f.series.split("\n").filter((l) => /tableauProp\(|^\s*\["/.test(l));
  v.ok("aucun $ dans une case de tableau", lignesTableau.every((l) => !l.includes("$")), lignesTableau.find((l) => l.includes("$"))?.trim());
  const consignes = [...f.series.matchAll(/consigne: "((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  v.ok("aucune formule dans les 3 consignes (badge du mode classe)", consignes.length === 3 && consignes.every((t) => !/[$\\^]/.test(t)), consignes.find((t) => /[$\\^]/.test(t)));
  // ⛔ `figure` n'existe pas encore dans le dépôt : l'employer casserait le build.
  v.ok("aucun champ `figure` (absent du dépôt)", !/^\s*figure:/m.test(source));

  const cites = new Set([...source.matchAll(/micros: \[([^\]]*)\]/g)].flatMap((m) => (m[1].match(/"([^"]+)"/g) ?? []).map((s) => s.slice(1, -1))));
  const micros = fs.readFileSync(path.join(RACINE, "lib/tutor-v4/knowledge/maths/3e/microSkills.ts"), "utf8");
  // Le format de 3e : `id`, `label`, `notionId` sur trois lignes qui se suivent.
  const deLaNotion = [...micros.matchAll(/id: "([a-z0-9_]+)",\s*\n\s*label: "[^"]*",\s*\n\s*notionId: "([a-z0-9_]+)"/g)]
    .filter((m) => m[2] === NOTION)
    .map((m) => m[1]);
  v.ok(`${deLaNotion.length} micros lues pour ${NOTION}`, deLaNotion.length === 7, deLaNotion.join(", "));
  const sansExercice = deLaNotion.filter((id) => !cites.has(id));
  v.ok("chaque micro de la notion a un exercice", sansExercice.length === 0, sansExercice.join(", "));
  const horsNotion = [...cites].filter((id) => !deLaNotion.includes(id));
  v.ok(`${cites.size} micros citées, aucune d'une autre notion`, horsNotion.length === 0, horsNotion.join(", "));
}

/* ── La passe, puis les contrôles négatifs EN MÉMOIRE ────────────────────── */

const chemin = path.join(RACINE, FICHIER);
const source = fs.readFileSync(chemin, "utf8");
const passe = (src, bavard) => {
  const v = creerVerif(bavard);
  try {
    verifier(src, v);
  } catch (e) {
    v.ok("le recalcul s'exécute", false, String(e?.message ?? e));
  }
  controles(src, v);
  return v.erreurs();
};

console.log("\nProportionnalité et pourcentages — 3e");
const e = passe(source, true);
console.log(e ? `\n✗ ${e} divergence(s)` : "\n✓ les vingt corrigés sont recalculés sans écart");

// [ce qu'on casse, le morceau du SOURCE (antislashs doublés), son remplaçant]
const CASSES = [
  ["ex. 3 : un prix faux (22,50 → 23,50)", "Réponse : $5$ kg coûtent $22{,}50$ €", "Réponse : $5$ kg coûtent $23{,}50$ €"],
  ["ex. 5 : 32 % → 8 %", "Réponse : $32\\\\,\\\\%$ de la classe", "Réponse : $8\\\\,\\\\%$ de la classe"],
  ["ex. 7 : le piège pris pour la réponse (52 → 28)", "le sac soldé coûte $52$ €", "le sac soldé coûte $28$ €"],
  ["ex. 8 : 2 h 30 lu 2,30 h", "c'est $2{,}5$ h", "c'est $2{,}30$ h"],
  ["ex. 13 : +15 % → +12 %", "le prix a augmenté de $15\\\\,\\\\%$", "le prix a augmenté de $12\\\\,\\\\%$"],
  ["ex. 14 : le verre « revient » à 80 cL", "le verre contient $60 + 15 = 75$ cL", "le verre contient $60 + 20 = 80$ cL"],
  ["ex. 15 : 12,5 min lu 12 min 5 s", "il faut $12$ min $30$ s", "il faut $12$ min $5$ s"],
  ["ex. 17 : la tablette « revient » à 100", "il en reste $120 - 24 = 96$", "il en reste $120 - 20 = 100$"],
  ["ex. 17 : le dessin compte 100 carrés pleins", 'k < 96 ? "plein"', 'k < 100 ? "plein"'],
  ["ex. 18 : hausse nécessaire 25 % → 20 %", "il aurait fallu une hausse de $25\\\\,\\\\%$", "il aurait fallu une hausse de $20\\\\,\\\\%$"],
  ["ex. 19 : −44 % → −50 %", "c'est baisser de $44\\\\,\\\\%$, pas de", "c'est baisser de $50\\\\,\\\\%$, pas de"],
  ["ex. 20 : la moyenne des vitesses (53,3 → 60)", "est d'environ $53{,}3$ km/h", "est d'environ $60$ km/h"],
  ["un % nu dans une formule", "Calcule $15\\\\,\\\\%$ de $240$.", "Calcule $15\\\\,%$ de $240$."],
  ["une micro d'une autre notion", 'micros: ["prop_table"]', 'micros: ["thales_configuration"]'],
  ["un exercice en moins (8 + 8 + 3)", "\n          titre: \"L'aller-retour\",\n          enonce:", "\n          titre: \"L'aller-retour\",\n          enoncee:"],
];

console.log("\nContrôles négatifs — joués en mémoire, le fichier n'est jamais touché");
if (e > 0) {
  console.log("  ✗ NON PROBANTS : la passe sur le fichier propre n'est pas verte");
  process.exitCode = 1;
} else {
  let ratees = 0;
  for (const [quoi, avant, apres] of CASSES) {
    const occurrences = source.split(avant).length - 1;
    if (occurrences !== 1) {
      ratees++;
      console.log(`  ✗ NON joué (${occurrences} occurrence(s) du morceau) : ${quoi}`);
      continue;
    }
    const n = passe(source.replace(avant, apres), false);
    if (n > 0) console.log(`  ✓ attrapée (${n} écart${n > 1 ? "s" : ""}) : ${quoi}`);
    else {
      ratees++;
      console.log(`  ✗ PASSÉE INAPERÇUE : ${quoi}`);
    }
  }
  const intact = fs.readFileSync(chemin, "utf8") === source;
  if (!intact) ratees++;
  console.log(`  ${intact ? "✓" : "✗"} le fichier sur le disque est identique à l'octet`);
  console.log(ratees ? `\n✗ ${ratees} contrôle(s) négatif(s) en défaut` : `\n✓ ${CASSES.length} casses sur ${CASSES.length} attrapées`);
  process.exitCode = ratees ? 1 : 0;
}
