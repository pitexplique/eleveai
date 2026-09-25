// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Multiples, diviseurs
// et division euclidienne » de 4e (lib/fiches-exercices/maths-4e-divisibilite.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE un quotient, un reste, une liste de
// diviseurs, un premier rendez-vous ; ici on les CHERCHE autrement :
// - le quotient et le reste par SOUSTRACTIONS RÉPÉTÉES (jamais `%` ni `/`) ;
// - les diviseurs en essayant 1, 2, 3… jusqu'au nombre lui-même ;
// - le premier multiple commun en balayant les multiples ;
// - les critères jamais appliqués : la divisibilité est TESTÉE par le reste ;
// - les jours de la semaine lus dans l'horloge de JavaScript (Date UTC).
// Chaque résultat est ensuite lu dans la phrase du corrigé. Les schémas
// (potences, frises, rectangles, grilles) sont relus dans le source et
// confrontés au même recalcul — et les VINGT corrigés doivent en avoir un.
//
//   node scripts/verifier-exercices-divisibilite-4e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Le calcul, par un autre chemin ─────────────────────────────────────── */

/** Quotient et reste par soustractions répétées. */
const division = (a, b) => {
  let q = 0;
  let r = a;
  while (r >= b) {
    r -= b;
    q++;
  }
  return [q, r];
};
const divise = (d, n) => division(n, d)[1] === 0;
const diviseurs = (n) => Array.from({ length: n }, (_, k) => k + 1).filter((d) => divise(d, n));
const multiples = (a, max) => {
  const m = [];
  for (let x = a; x <= max; x += a) m.push(x);
  return m;
};
/** Le premier multiple de a qui est aussi multiple de b : on balaie. */
const premierCommun = (a, b) => {
  let m = a;
  while (!divise(b, m)) m += a;
  return m;
};
const somme = (n) => String(n).split("").reduce((s, c) => s + Number(c), 0);
const oui = (x) => (x ? "oui" : "non");

/* ── L'écriture, comme dans la feuille ──────────────────────────────────── */

/** `4\,370` au-delà de 999, sinon le nombre nu. */
const fr = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
const d$ = (n) => `$${fr(n)}$`;
/** « $1$, $3$ et $5$ » */
const liste = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).map(d$).join(", ")} et ${d$(xs.at(-1))}` : d$(xs[0]));
/** « $1$, $3$, $5$ » */
const listeV = (xs) => xs.map(d$).join(", ");
/** « $0$, $2$ ou $4$ » */
const ou = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).map(d$).join(", ")} ou ${d$(xs.at(-1))}` : d$(xs[0]));
/** « $a = b \times q + r$ », q et r recalculés. */
const euclide = (a, b) => {
  const [q, r] = division(a, b);
  return `$${fr(a)} = ${b} \\times ${q} + ${r}$`;
};
/** Un nombre écrit « 4 370 » dans une case. */
const nb = (s) => Number(String(s).replace(/\s/g, ""));

/* ── Relire les schémas ──────────────────────────────────────────────────── */

/** Les arguments de chaque appel `nom(…)` du bloc (parenthèses équilibrées,
 *  chaînes sautées), parsés en JSON. */
function appels(bloc, nom) {
  const res = [];
  for (const m of bloc.matchAll(new RegExp(`\\b${nom}\\(`, "g"))) {
    let prof = 0;
    let chaine = false;
    let j = m.index + m[0].length - 1;
    for (; j < bloc.length; j++) {
      const c = bloc[j];
      if (chaine) {
        if (c === "\\") j++;
        else if (c === '"') chaine = false;
        continue;
      }
      if (c === '"') chaine = true;
      else if (c === "(") prof++;
      else if (c === ")" && --prof === 0) break;
    }
    const t = bloc
      .slice(m.index + m[0].length, j)
      .replace(/,(\s*\n\s*[\]}])/g, "$1")
      .replace(/,\s*$/, "");
    res.push(JSON.parse(`[${t}]`));
  }
  return res;
}
const grilles = (bloc) => appels(bloc, "grille").map(([entete, lignes, surligne = []]) => ({ entete, lignes, surligne }));

function verifier(source, v) {
  const { corrections, enonces, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const e = (k) => enonces[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const g = (k, i = 0) => grilles(b(k))[i];
  const grilleOk = (k, quoi, test, i = 0) => {
    const x = g(k, i);
    let ok = false;
    try {
      ok = !!x && test(x);
    } catch {
      ok = false;
    }
    v.ok(`${k}. le schéma : ${quoi}`, ok, x ? JSON.stringify(x.lignes).slice(0, 140) : "pas de grille");
  };
  /** Les colonnes « par d » d'une grille : chaque oui/non recalculé par le reste. */
  const casesPar = (x, nombre) =>
    x.lignes.every((l) => x.entete.every((h, j) => {
      const m = /^par (\d+)$/.exec(h);
      return !m || l[j] === oui(divise(Number(m[1]), nombre(l)));
    }));
  /** Les lignes surlignées d'une grille, comparées à un test. */
  const surligne = (x, test) => JSON.stringify(x.surligne) === JSON.stringify(x.lignes.map((l, i) => (test(l) ? i : -1)).filter((i) => i >= 0));
  /** La potence dessinée : a = b × q + r, 0 ⩽ r < b, par soustractions. */
  const potenceOk = (k, a, bb) => {
    const p = appels(b(k), "potence").find((x) => x[0] === a && x[1] === bb);
    const [q, r] = division(a, bb);
    v.ok(`${k}. la potence de ${a} par ${bb} : quotient ${q}, reste ${r}`, !!p && p[2] === q && p[3] === r, p ? JSON.stringify(p) : "absente");
  };
  const frise = (k) => appels(b(k), "frise")[0];
  const rect = (k) => appels(b(k), "rectangles")[0];

  /* ★ ─────────────────────────────────────────────────────────────────── */
  v.titre("★ Un seul geste");
  v.ok("1. 161 = 7 × 23 tombe juste", JSON.stringify(division(161, 7)) === "[23,0]" && e(1).includes("$161 = 7 \\times 23$"));
  dit(1, `$9 \\times ${division(117, 9)[0]} = 117$`);
  dit(1, `c) Je pose la division : ${euclide(68, 8)}`);
  const m15 = multiples(15, 140).filter((x) => x >= 100);
  dit(1, `Réponse : a) multiple, diviseur ; b) ${oui(divise(9, 117))} ; c) ${oui(divise(8, 68))} ; d) ${liste(m15)}.`, "la réponse");
  grilleOk(1, "chaque test : produit, reste et verdict recalculés", (x) =>
    x.lignes.every(([t, calc, reste, verdict]) => {
      const [a, d] = t.split(" par ").map(Number);
      const [f1, f2, p] = calc.split(/ × | = /).map(Number);
      return f1 === d && f1 * f2 === p && Number(reste) === division(a, d)[1] && a - p === Number(reste) && verdict === oui(divise(d, a));
    }),
  );
  grilleOk(1, "la table de 15 et les multiples entre 100 et 140 en rouge", (x) =>
    x.lignes.every(([k, p, ok]) => 15 * Number(k) === Number(p) && ok === oui(m15.includes(Number(p)))) && surligne(x, (l) => l[2] === "oui"),
  1);

  const nb2 = [4370, 8915, 6052, 7001];
  const par = (n, ds) => ds.filter((d) => divise(d, n));
  const dire = (n, ds, aucun) => {
    const p = par(n, ds);
    return p.length === 0 ? `par aucun des ${aucun}` : p.length === 1 ? `par $${p[0]}$ seulement` : `par ${liste(p)}`;
  };
  dit(2, `Réponse : ${nb2.map((n) => `${d$(n)} ${dire(n, [2, 5, 10], "trois")}`).join(" ; ")}.`, "la réponse, divisibilités testées par le reste");
  dit(2, `$${fr(6052)} = 2 \\times ${fr(division(6052, 2)[0])}$`);
  v.ok("2. 6 + 0 + 5 + 2 = 13, impair, et pourtant 6 052 est pair", somme(6052) === 13 && divise(2, 6052));
  grilleOk(2, "unités et oui/non, nombre par nombre", (x) =>
    x.lignes.every((l, i) => nb(l[0]) === nb2[i] && Number(l[1]) === nb2[i] % 10) && casesPar(x, (l) => nb(l[0])),
  );

  const nb3 = [5742, 2613, 8051, 30033];
  const lesDeux = nb3.filter((n) => divise(3, n) && divise(9, n));
  dit(3, `Réponse : ${lesDeux.map(d$).join(" et ")} par $3$ et par $9$ ; ${nb3.filter((n) => !lesDeux.includes(n)).map((n) => `${d$(n)} ${dire(n, [3, 9], "deux")}`).join(" ; ")}.`, "la réponse");
  for (const n of nb3) dit(3, `${somme(n)}$`, `${n} : somme des chiffres ${somme(n)}`);
  dit(3, `$${fr(30033)} = 9 \\times ${fr(division(30033, 9)[0])}$`);
  dit(3, `$${fr(2613)} = 3 \\times ${division(2613, 3)[0]}$, mais ${euclide(2613, 9)}`);
  grilleOk(3, "sommes des chiffres et oui/non", (x) =>
    x.lignes.every((l, i) => nb(l[0]) === nb3[i] && Number(l[1]) === somme(nb3[i])) && casesPar(x, (l) => nb(l[0])),
  );

  for (const [a, d] of [[627, 6], [239, 9]]) {
    dit(4, `Donc ${euclide(a, d).slice(0, -1)}`);
    potenceOk(4, a, d);
  }
  dit(4, `Réponse : ${euclide(627, 6)} ; ${euclide(239, 9)}.`, "la réponse");
  v.ok("4. le quotient sans son 0 donne 14, et 6 × 14 + 3 = 87", String(division(627, 6)[0]).replace("0", "") === "14" && 6 * 14 + 3 === 87);
  dit(4, "$6 \\times 14 + 3 = 87$");

  const ECR = /^(\d+) = (\d+) × (\d+) ([+−]) (\d+)$/;
  grilleOk(5, "chaque écriture : égalité, condition sur le reste, verdict", (x) =>
    x.lignes.every(([ecr, egalite, reste, verdict]) => {
      const [, a, d, q, s, r] = ECR.exec(ecr);
      const juste = Number(d) * Number(q) + (s === "+" ? 1 : -1) * Number(r) === Number(a);
      const condition = s === "+" && Number(r) < Number(d);
      return egalite === oui(juste) && reste === oui(condition) && verdict === oui(juste && condition);
    }) && surligne(x, (l) => l[3] === "oui"),
  );
  grilleOk(5, "les écritures du tableau sont celles de l'énoncé", (x) =>
    x.lignes.every(([ecr]) => e(5).includes(`$${ecr.replace(/×/g, "\\times").replace("−", "-")}$`)),
  );
  v.ok("5. seule a) est la division de 130 par 12", JSON.stringify(division(130, 12)) === "[10,10]");
  dit(5, `par $10$, c'est ${euclide(130, 10)}`);
  dit(5, "Réponse : seule l'écriture a)");

  const d45 = diviseurs(45);
  dit(6, `Réponse : ${liste(d45)} : six diviseurs.`, "la réponse");
  v.ok("6. six diviseurs, et 7 × 7 > 45 > 6 × 6", d45.length === 6 && 7 * 7 > 45 && 6 * 6 < 45);
  for (const d of [4, 6]) dit(6, euclide(45, d));
  const r6 = rect(6);
  v.ok("6. les rectangles : 45 carreaux chacun, et leurs côtés sont tous les diviseurs", !!r6 && r6[0].every(([l, co]) => l * co === 45 && l <= co) && JSON.stringify(r6[0].flat().sort((x, y) => x - y)) === JSON.stringify(d45), JSON.stringify(r6));

  const ch = [...Array(10).keys()];
  const n7 = (x) => 3580 + x;
  const a7 = ch.filter((x) => divise(5, n7(x)));
  const b7 = ch.filter((x) => divise(2, n7(x)));
  const c7 = ch.filter((x) => divise(10, n7(x)));
  const d7 = ch.filter((x) => divise(2, n7(x)) && !divise(5, n7(x)));
  dit(7, `Réponse : a) ${ou(a7)} ; b) ${ou(b7)} ; c) ${ou(c7)} ; d) ${ou(d7)}.`, "la réponse, en essayant les dix chiffres");
  dit(7, `Soit ${a7.map((x) => d$(n7(x))).join(" ou ")}.`);
  grilleOk(7, "les dix chiffres, oui/non recalculés, « par 2 pas par 5 » en rouge", (x) =>
    x.lignes.length === 10 && x.lignes.every((l, i) => Number(l[0]) === i) && casesPar(x, (l) => n7(Number(l[0]))) && surligne(x, (l) => d7.includes(Number(l[0]))),
  );

  const n8a = (x) => 2071 + 100 * x;
  const n8b = (x) => 406 + 10 * x;
  const a8 = ch.filter((x) => divise(9, n8a(x))).map(n8a);
  const b8 = ch.filter((x) => divise(3, n8b(x))).map(n8b);
  const c8 = b8.filter((n) => !divise(9, n));
  dit(8, `Réponse : a) ${ou(a8)} ; b) ${ou(b8)} ; c) ${liste(c8)}.`, "la réponse, en essayant les dix chiffres");
  dit(8, `$${fr(2871)} = 9 \\times ${division(2871, 9)[0]}$ et $486 = 9 \\times ${division(486, 9)[0]}$`);
  grilleOk(8, "sommes 4 + chiffre + 6 et oui/non, les chiffres du b) en rouge", (x) =>
    x.lignes.length === 10 && x.lignes.every((l, i) => Number(l[0]) === i && Number(l[1]) === somme(n8b(i))) && casesPar(x, (l) => n8b(Number(l[0]))) && surligne(x, (l) => b8.includes(n8b(Number(l[0])))),
  );

  /* ★★ ────────────────────────────────────────────────────────────────── */
  v.titre("★★ Type devoir");
  const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const jour = (an) => JOURS[new Date(Date.UTC(an, 0, 1)).getUTCDay()];
  const duree = (an) => (Date.UTC(an + 1, 0, 1) - Date.UTC(an, 0, 1)) / 86400000;
  v.ok(`9. l'horloge : 1er janvier 2027 = ${jour(2027)}, 2028 = ${jour(2028)}, 2029 = ${jour(2029)} ; ${duree(2027)} puis ${duree(2028)} jours`, e(9).includes(`2027 est un ${jour(2027)}`) && duree(2027) === 365 && duree(2028) === 366);
  v.ok("9. le reste de la division par 7 fait avancer le jour", [2027, 2028].every((an) => (JOURS.indexOf(jour(an)) + division(duree(an), 7)[1]) % 7 === JOURS.indexOf(jour(an + 1))));
  dit(9, `Donc ${euclide(365, 7).slice(0, -1)}`);
  dit(9, euclide(366, 7));
  potenceOk(9, 365, 7);
  dit(9, `Réponse : ${euclide(365, 7)}, soit $${division(365, 7)[0]}$ semaines et $${division(365, 7)[1]}$ jour ; le 1er janvier 2028 est un ${jour(2028)}, le 1er janvier 2029 un ${jour(2029)}.`, "la réponse");
  grilleOk(9, "jours dans l'année, reste par 7 et jour de la semaine", (x) =>
    x.lignes.every(([an, jours, reste, j]) => j === jour(Number(an)) && (jours === "—" || (Number(jours) === duree(Number(an)) && Number(reste) === division(duree(Number(an)), 7)[1]))),
  );

  const d84 = diviseurs(84);
  const d100 = diviseurs(100);
  dit(10, `Les diviseurs de $84$ sont ${liste(d84)} : il y en a $${d84.length}$`);
  dit(10, `Les diviseurs de $100$ sont ${liste(d100)} : il y en a $${d100.length}$`);
  v.ok("10. 100 a un nombre impair de diviseurs, 84 un nombre pair", d100.length % 2 === 1 && d84.length % 2 === 0);
  for (const [n, d] of [[84, 8], [100, 7], [100, 8]]) dit(10, euclide(n, d));
  dit(10, `Réponse : $84$ a $${d84.length}$ diviseurs, $100$ en a $${d100.length}$`, "la réponse");
  const paires = (x, n) => x.lignes.every(([p, prod]) => p.split(" × ").map(Number).reduce((s, y) => s * y, 1) === n && Number(prod) === n) && JSON.stringify([...new Set(x.lignes.flatMap(([p]) => p.split(" × ").map(Number)))].sort((y, z) => y - z)) === JSON.stringify(diviseurs(n));
  grilleOk(10, "les paires de 84 couvrent tous ses diviseurs", (x) => paires(x, 84));
  grilleOk(10, "les paires de 100 couvrent tous ses diviseurs, la paire carrée en rouge", (x) => paires(x, 100) && surligne(x, (l) => new Set(l[0].split(" × ")).size === 1), 1);

  const N = [...Array(2000).keys()].slice(1);
  const v11 = [
    N.every((n) => !divise(10, n) || divise(5, n)),
    N.every((n) => !divise(5, n) || divise(10, n)),
    N.every((n) => !divise(3, n) || divise(9, n)),
    N.every((n) => !divise(9, n) || divise(3, n)),
    multiples(7, 300).every((x) => multiples(7, 300).every((y) => divise(7, x + y))),
  ];
  v.ok("11. vrai, faux, faux, vrai, vrai (balayé jusqu'à 2 000)", JSON.stringify(v11) === "[true,false,false,true,true]");
  ["a", "b", "c", "d", "e"].forEach((l, i) => dit(11, `${l}) ${v11[i] ? "VRAI" : "FAUX"}.`));
  v.ok("11. 35 et 21 sont de vrais contre-exemples", divise(5, 35) && !divise(10, 35) && divise(3, 21) && !divise(9, 21));
  dit(11, euclide(35, 10));
  dit(11, euclide(21, 9));
  dit(11, `$14 + 21 = ${14 + 21} = 7 \\times ${division(35, 7)[0]}$`);
  dit(11, `Réponse : ${v11.map((x, i) => `${"abcde"[i]}) ${x ? "vrai" : "faux"}`).join(" ; ")}.`, "la réponse");
  grilleOk(11, "verdicts et contre-exemples du tableau", (x) =>
    x.lignes.every((l, i) => l[1] === (v11[i] ? "vrai" : "faux")) &&
    [1, 2].every((i) => {
      const [, a, d, q, , r] = ECR.exec(x.lignes[i][2]);
      return Number(d) * Number(q) + Number(r) === Number(a) && Number(r) > 0 && Number(r) < Number(d);
    }) && surligne(x, (l) => l[1] === "faux"),
  );

  const tous = (n) => [2, 3, 5, 9].every((d) => divise(d, n));
  const petit = [...Array(9000).keys()].map((i) => i + 1000).find(tous);
  const grand = [...Array(900).keys()].map((i) => 999 - i).find(tous);
  dit(12, `Réponse : a) ${d$(petit)} ; b) ${d$(grand)}.`, "la réponse, par balayage");
  dit(12, `pour ${d$(petit)} ($${String(petit).split("").join(" + ")} = ${somme(petit)}$)`);
  dit(12, `Donc ${euclide(petit, 9)}`);
  potenceOk(12, 1080, 9);
  grilleOk(12, "de 1 000 à 1 080 de dix en dix : sommes et verdicts", (x) =>
    x.lignes.every(([n, s, ok], i) => nb(n) === 1000 + 10 * i && Number(s) === somme(nb(n)) && ok === oui(divise(9, nb(n)))) && nb(x.lignes.at(-1)[0]) === petit && surligne(x, (l) => l[2] === "oui"),
  );

  const a13 = 13 * 17 + 9;
  v.ok("13. la division de 230 par 13 redonne 17 et 9", JSON.stringify(division(a13, 13)) === "[17,9]");
  dit(13, `$a = 13 \\times 17 + 9 = ${13 * 17} + 9 = ${a13}$`);
  potenceOk(13, a13, 13);
  const q17 = [...Array(500).keys()].filter((n) => division(n, 13)[0] === 17);
  dit(13, `Ce sont les $${q17.length}$ nombres de $${q17[0]}$ à $${q17.at(-1)}$`);
  dit(13, `$${q17.at(-1) + 1} = 13 \\times ${division(q17.at(-1) + 1, 13)[0]}$`);
  dit(13, `Réponse : a) $${a13}$ ; b) non ; c) les nombres de $${q17[0]}$ à $${q17.at(-1)}$.`, "la réponse");

  const [q14, r14] = division(412, 53);
  const cars = r14 > 0 ? q14 + 1 : q14;
  dit(14, `Réponse : ${euclide(412, 53)} ; il faut $${cars}$ cars, et $${cars * 53 - 412}$ places restent libres.`, "la réponse");
  dit(14, `$53 \\times ${cars} = ${cars * 53}$`);
  potenceOk(14, 412, 53);

  const d90 = diviseurs(90);
  const d75 = diviseurs(75);
  const com15 = d90.filter((d) => divise(d, 75));
  const max15 = com15.at(-1);
  dit(15, `Diviseurs de $90$ : ${listeV(d90)}.`);
  dit(15, `Diviseurs de $75$ : ${listeV(d75)}.`);
  dit(15, `Les diviseurs communs sont ${liste(com15)} ; le plus grand est $${max15}$`);
  dit(15, `$90 \\div ${max15} = ${division(90, max15)[0]}$ paires de gants et $75 \\div ${max15} = ${division(75, max15)[0]}$ sacs`);
  dit(15, euclide(75, 10));
  dit(15, euclide(75, 45));
  dit(15, `Réponse : $${max15}$ kits au plus, avec $${division(90, max15)[0]}$ paires de gants et $${division(75, max15)[0]}$ sacs chacun.`, "la réponse");
  grilleOk(15, "les trois listes du tableau sont les listes recalculées", (x) =>
    [d90, d75, com15].every((l, i) => x.lignes[i][1] === l.join(", ")) && JSON.stringify(x.surligne) === "[2]",
  );

  const rdv16 = premierCommun(90, 72);
  dit(16, `à chaque multiple de $72$ : ${listeV(multiples(72, 400))}.`);
  dit(16, `à chaque multiple de $90$ : ${listeV(multiples(90, 400))}.`);
  dit(16, `au plus petit : $${rdv16}$ secondes, soit $${division(rdv16, 60)[0]}$ minutes`);
  dit(16, `Inès a fait $${rdv16} \\div 72 = ${division(rdv16, 72)[0]}$ tours, Tom $${rdv16} \\div 90 = ${division(rdv16, 90)[0]}$ tours`);
  dit(16, `$${division(rdv16, 72)[0]} \\times 400 = ${fr(division(rdv16, 72)[0] * 400)}$ m`);
  dit(16, `$72 \\times 90 = ${fr(72 * 90)}$`);
  dit(16, `$${fr(72 * 90)} = ${rdv16} \\times ${division(72 * 90, rdv16)[0]}$`);
  dit(16, `Réponse : au bout de $${rdv16}$ secondes`, "la réponse");
  const f16 = frise(16);
  v.ok("16. la frise : multiples de 72 et 90 jusqu'à 400, le rendez-vous dedans", !!f16 && f16[0] === 400 && f16[1] === 72 && f16[2] === 90 && rdv16 <= f16[0], JSON.stringify(f16));

  /* ★★★ ───────────────────────────────────────────────────────────────── */
  v.titre("★★★ Problèmes");
  const P = [2, 3, 4, 5, 6];
  const pred12 = P.filter((p) => divise(p, 12));
  const rdv17 = premierCommun(13, 4);
  v.ok("17. aucun prédateur ne divise 13 ni 17", P.every((p) => !divise(p, 13) && !divise(p, 17)));
  dit(17, euclide(12, 5));
  for (const p of P) dit(17, euclide(13, p));
  for (const s of multiples(13, rdv17 - 1)) dit(17, euclide(s, 4));
  dit(17, `$${rdv17} = 4 \\times ${division(rdv17, 4)[0]}$`);
  dit(17, `Réponse : a) ${listeV(diviseurs(12))} : les prédateurs de ${liste(pred12)} ans ; b) ${liste(diviseurs(13))}, ${liste(diviseurs(17))} : aucun ; c) au bout de $${rdv17}$ ans, à la $${division(rdv17, 13)[0]}$e sortie.`, "la réponse");
  const f17 = frise(17);
  v.ok("17. la frise : 13 et 4, jusqu'à la première rencontre", !!f17 && f17[1] === 13 && f17[2] === 4 && f17[0] === rdv17, JSON.stringify(f17));

  const rdv18 = premierCommun(50, 15);
  const rdv18b = premierCommun(50, 25);
  dit(18, `Donc ${euclide(50, 15).slice(0, -1)}`);
  potenceOk(18, 50, 15);
  dit(18, `${multiples(15, rdv18).map(d$).join(", ")}…`, "la liste des multiples de 15");
  dit(18, euclide(100, 15));
  dit(18, `$${rdv18} = 15 \\times ${division(rdv18, 15)[0]}$ y est`);
  dit(18, `$50 \\times 15 = ${50 * 15}$`);
  dit(18, `$${50 * 15} = ${rdv18} \\times ${division(750, rdv18)[0]}$`);
  dit(18, `Réponse : a) $${division(50, 15)[0]}$ tours et $${division(50, 15)[1]}$ dents ; b) $${rdv18}$ dents, $${division(rdv18, 50)[0]}$ tours de plateau et $${division(rdv18, 15)[0]}$ tours de pignon ; c) $${rdv18b}$ dents, $${division(rdv18b, 50)[0]}$ tour de plateau et $${division(rdv18b, 25)[0]}$ de pignon.`, "la réponse");
  const f18 = frise(18);
  v.ok("18. la frise : 50 et 15, jusqu'à la première rencontre", !!f18 && f18[1] === 50 && f18[2] === 15 && f18[0] === rdv18, JSON.stringify(f18));

  const d96 = diviseurs(96);
  const bons = d96.filter((d) => d >= 5 && d <= 15);
  dit(19, `Les diviseurs de $96$ sont ${liste(d96)}.`);
  dit(19, euclide(96, 7));
  v.ok("19. 106 n'a aucun diviseur entre 5 et 15", diviseurs(106).every((d) => d < 5 || d > 15));
  for (const d of [3, 4, 5, 6, 7, 8, 9, 10]) dit(19, euclide(106, d));
  dit(19, `Avec des rangées de $12$ : ${euclide(106, 12)}`);
  const rangs = bons.map((d) => `$${division(96, d)[0]}$ rangées de $${d}$`);
  dit(19, `Réponse : ${rangs.slice(0, -1).join(", ")} ou ${rangs.at(-1)} ; avec $106$ panneaux, c'est impossible, et des rangées de $12$ donnent $${division(106, 12)[0]}$ rangées complètes et une de $${division(106, 12)[1]}$.`, "la réponse");
  const r19 = rect(19);
  v.ok("19. les rectangles dessinés : 96 panneaux, une rangée entre 5 et 15, toutes les installations", !!r19 && r19[0].every(([l, co]) => l * co === 96 && co >= 5 && co <= 15) && JSON.stringify(r19[0].map(([, co]) => co)) === JSON.stringify(bons), JSON.stringify(r19));

  const reste1 = (n) => [2, 3, 4, 5, 6].every((d) => division(n, d)[1] === 1);
  const oeufs = [...Array(400).keys()].filter((n) => n > 0 && reste1(n) && divise(7, n));
  const plusPetit = [...Array(1000).keys()].slice(1).find((m) => [2, 3, 4, 5, 6].every((d) => divise(d, m)));
  v.ok(`20. une seule solution sous 400 : ${oeufs}`, oeufs.length === 1);
  dit(20, `Le plus petit multiple commun est $${plusPetit}$`);
  dit(20, `Ses multiples jusqu'à $400$ : ${listeV(multiples(plusPetit, 400))}.`);
  const cand = multiples(plusPetit, 400).map((m) => m + 1);
  for (const n of cand) dit(20, euclide(n, 7));
  dit(20, euclide(30, 4));
  dit(20, `$${2 * 3 * 4 * 5 * 6}$ est un multiple commun`);
  dit(20, `Réponse : la marchande a $${oeufs[0]}$ œufs.`, "la réponse");
  potenceOk(20, oeufs[0], 7);
  grilleOk(20, "les candidats et leurs restes par 7", (x) =>
    JSON.stringify(x.lignes.map((l) => Number(l[0]))) === JSON.stringify(cand) &&
    x.lignes.every(([n, calc, r]) => {
      const [q, rr] = division(Number(n), 7);
      return calc === `7 × ${q} + ${rr}` && Number(r) === rr;
    }) && surligne(x, (l) => l[2] === "0"),
  );

  /* Les schémas ────────────────────────────────────────────────────────── */
  v.ok("tous les énoncés sont là", enonces.length === 20);
  const schemas = blocs.map((bl) => (bl.includes("schema:") ? bl.split("schema:")[1].split("micros:")[0] : ""));
  const avec = schemas.filter(Boolean).length;
  v.ok(`${avec} corrigés sur 20 ont leur schéma`, avec === 20, schemas.map((s, i) => (s ? "" : i + 1)).filter(Boolean).join(", "));
  // ⛔ Les schémas sont du HTML/SVG nu : ni `$`, ni `\`, ni `^` dans leurs cases.
  const sales = schemas.filter((s) => /[$\\^]/.test(s));
  v.ok("aucun $ ni LaTeX dans les schémas", sales.length === 0, sales[0]?.slice(0, 100));
  // Toute potence de la feuille est une vraie division euclidienne.
  const toutes = blocs.flatMap((bl) => appels(bl, "potence"));
  v.ok(`${toutes.length} potences : a = b × q + r et 0 ⩽ r < b, par soustractions`, toutes.length === 8 && toutes.every(([a, d, q, r]) => JSON.stringify(division(a, d)) === JSON.stringify([q, r])));
}

lancer({
  nom: "MULTIPLES, DIVISEURS ET DIVISION EUCLIDIENNE · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-divisibilite.tsx",
  notionId: "divisibilite",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : 8 déclaré diviseur de 68 dans le tableau", "[\"68 par 8\", \"8 × 8 = 64\", \"4\", \"non\"]", "[\"68 par 8\", \"8 × 8 = 64\", \"4\", \"oui\"]"],
    ["ex. 1 : 105 oublié", "d) $105$, $120$ et $135$.", "d) $120$ et $135$."],
    ["ex. 2 : 8 915 déclaré divisible par 10", "[\"8 915\", \"5\", \"non\", \"oui\", \"non\"]", "[\"8 915\", \"5\", \"non\", \"oui\", \"oui\"]"],
    ["ex. 3 : 2 613 déclaré divisible par 9", "$2\\\\,613$ par $3$ seulement", "$2\\\\,613$ par $3$ et par $9$"],
    ["ex. 4 : le 0 du quotient oublié dans la potence", "potence(627, 6, 104, 3)", "potence(627, 6, 14, 3)"],
    ["ex. 4 : le 0 du quotient oublié dans le texte", "Donc $627 = 6 \\\\times 104 + 3$", "Donc $627 = 6 \\\\times 14 + 3$"],
    ["ex. 5 : un reste de 22 accepté", "[\"130 = 12 × 9 + 22\", \"oui\", \"non\", \"non\"]", "[\"130 = 12 × 9 + 22\", \"oui\", \"oui\", \"oui\"]"],
    ["ex. 6 : la paire 5 × 9 oubliée dans les rectangles", "rectangles([[1, 45], [3, 15], [5, 9]], 5)", "rectangles([[1, 45], [3, 15]], 5)"],
    ["ex. 7 : le 0 gardé dans « par 2 mais pas par 5 »", "d) $2$, $4$, $6$ ou $8$.", "d) $0$, $2$, $4$, $6$ ou $8$."],
    ["ex. 8 : 486 déclaré non divisible par 9", "[\"8\", \"18\", \"oui\", \"oui\"]", "[\"8\", \"18\", \"oui\", \"non\"]"],
    ["ex. 9 : « un an plus tard, même jour »", "le 1er janvier 2028 est un samedi", "le 1er janvier 2028 est un vendredi"],
    ["ex. 9 : un reste de 8 dans la potence", "potence(365, 7, 52, 1)", "potence(365, 7, 51, 8)"],
    ["ex. 10 : 10 compté deux fois", "il y en a $9$", "il y en a $10$"],
    ["ex. 11 : par 3 donc par 9", "c) FAUX. $21$", "c) VRAI. $21$"],
    ["ex. 12 : 1 000 accepté", "Réponse : a) $1\\\\,080$ ; b) $990$.", "Réponse : a) $1\\\\,000$ ; b) $990$."],
    ["ex. 13 : le reste oublié", "= 221 + 9 = 230$", "= 221 + 9 = 221$"],
    ["ex. 14 : le quotient pris pour la réponse", "il faut $8$ cars", "il faut $7$ cars"],
    ["ex. 15 : 45 pris pour un diviseur commun", "[\"communs\", \"1, 3, 5, 15\"]", "[\"communs\", \"1, 3, 5, 15, 45\"]"],
    ["ex. 16 : une frise à 80 s", "frise(400, 72, 90,", "frise(400, 72, 80,"],
    ["ex. 16 : le produit pris pour le rendez-vous", "au bout de $360$ secondes", "au bout de $6\\\\,480$ secondes"],
    ["ex. 17 : la première sortie prise pour une rencontre", "c) au bout de $52$ ans, à la $4$e sortie.", "c) au bout de $13$ ans, à la $1$e sortie."],
    ["ex. 18 : 750 dents", "b) $150$ dents,", "b) $750$ dents,"],
    ["ex. 19 : rangées et panneaux échangés", "rectangles([[16, 6], [12, 8], [8, 12]], 6)", "rectangles([[16, 6], [12, 8], [6, 16]], 6)"],
    ["ex. 20 : un reste faux", "[\"301\", \"7 × 43 + 0\", \"0\"]", "[\"301\", \"7 × 43 + 0\", \"1\"]"],
    ["ex. 20 : 61 œufs", "la marchande a $301$ œufs", "la marchande a $61$ œufs"],
    ["un schéma retiré", "schema: potence(230, 13, 17, 9),", ""],
    ["une micro d'une autre notion", "micros: [\"div_lister_diviseurs\"],", "micros: [\"premier_decomposer\"],"],
    ["un $ dans un schéma", "[\"7 001\", \"1\", \"non\", \"non\", \"non\"]", "[\"$7 001$\", \"1\", \"non\", \"non\", \"non\"]"],
  ],
});
