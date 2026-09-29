// Recalcul indépendant de la feuille « Les nombres décimaux » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-decimal-nombre.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (numeration,
// demiDroite, grille, tableau), jamais recopiés ici : le script lit les rangs,
// compare, arrondit, encadre lui-même, puis cherche la réponse dans le corrigé.
// Chaque ligne du TABLEAU DE NUMÉRATION est relue chiffre par chiffre : quand
// son nom est un nombre, les chiffres doivent l'écrire.
// ⭐ Consigne de Frédéric (30/09) : des phrases de 12 mots en moyenne, 20 au
// plus. Le script compte les mots de chaque phrase des énoncés et des corrigés.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-decimal-nombre.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-decimal-nombre.tsx", "decimal_nombre", ["numeration", "demiDroite", "grille"], "6e");
const { c, e, vrai, verif, dit, enonceDit, dessin, appels, essai, feuille } = f;

/** « 1{,}5 », « 2,5 », « 1\,250 » → nombre. */
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(",", ".").replace(/\$/g, "").trim());
const r9 = (x) => Math.round(x * 1e9) / 1e9;
const svg = (v) => String(r9(v)).replace(".", ",");
/** L'arrondi à k chiffres après la virgule (le milieu monte). */
const arr = (x, k) => Math.round(r9(x * 10 ** k)) / 10 ** k;
/** Le chiffre de rang 10^-k (k = 1 : dixièmes) ; k = 0 : unités, k = -1 : dizaines. */
const chiffre = (x, k) => Math.floor(r9(x * 10 ** k)) % 10;
const memes = (a, b) => JSON.stringify([...a].map(r9).sort((x, y) => x - y)) === JSON.stringify([...b].map(r9).sort((x, y) => x - y));
const nombresDe = (texte) => [...texte.matchAll(/\$(\d+(?:\{,\}\d+)?)\$/g)].map((m) => nb(m[1]));

/* ═════ Les dessins, chacun pour lui-même ═════ */
const RANGS = ["C", "D", "U", "d", "c", "m"];
/** La valeur d'une ligne du tableau de numération. */
const valeur = (colonnes, chiffres) => {
  const u = colonnes.indexOf("U");
  const ent = chiffres.slice(0, u + 1).join("") || "0";
  const dec = chiffres.slice(u + 1).join("") || "0";
  return Number(`${ent}.${dec}`);
};
for (const { args } of appels("numeration").filter((a) => a.args)) {
  const [colonnes, lignes, surligne] = args;
  vrai(`numeration ${colonnes} : des rangs connus, dans l'ordre, six au plus`, colonnes.length <= 6 && colonnes.every((x, i) => i === 0 || RANGS.indexOf(x) === RANGS.indexOf(colonnes[i - 1]) + 1) && colonnes.includes("U"));
  vrai(`numeration ${colonnes} : la colonne surlignée existe`, surligne === undefined || colonnes.includes(surligne));
  const nom = Math.max(0, ...lignes.map((l) => (l.nom ?? "").length));
  const largeur = colonnes.length * 26 + (nom ? nom * 8 + 14 : 0);
  vrai(`numeration ${colonnes} : tient dans 230 px (${largeur})`, largeur <= 230);
  for (const li of lignes) {
    vrai(`numeration ${colonnes} : un chiffre par case (${li.chiffres})`, li.chiffres.length === colonnes.length && li.chiffres.every((x) => /^\d?$/.test(x)));
    if (li.nom && /^[\d,]+$/.test(li.nom)) vrai(`numeration : la ligne « ${li.nom} » écrit bien ce nombre`, valeur(colonnes, li.chiffres) === nb(li.nom));
  }
}
for (const { args } of appels("demiDroite").filter((a) => a.args)) {
  const [min, max, pas, points, opts = {}] = args;
  const nombres = opts.nombres ?? pas;
  const ecrits = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) {
    const v = r9(min + k * pas);
    if (Math.abs(v / nombres - Math.round(v / nombres)) < 1e-6) ecrits.push(v);
  }
  vrai(`demiDroite [${min} ; ${max}] : rien sous zéro`, min >= 0);
  vrai(`demiDroite [${min} ; ${max}] : ${ecrits.length} nombres écrits, de 2 à 11`, ecrits.length >= 2 && ecrits.length <= 11);
  const ecart = (nombres / (max - min)) * 252;
  vrai(`demiDroite [${min} ; ${max}] : les nombres écrits ne se touchent pas`, ecart >= Math.max(...ecrits.map((v) => svg(v).length)) * 8.6 + 4);
  vrai(`demiDroite [${min} ; ${max}] : pas plus de 60 graduations`, (max - min) / pas <= 60 + 1e-9);
  for (const p of points) vrai(`demiDroite [${min} ; ${max}] : point ${p.value} dans le cadre`, p.value >= min && p.value <= max);
}

/* ═════ Phrases courtes (Frédéric, 30/09 : « ils ont parfois du mal à LIRE ») ═════ */
{
  const phrases = [...feuille.enonces, ...feuille.corrections]
    .flatMap((txt) => txt.split("\\n"))
    .flatMap((l) => l.split(/(?<=[.!?])\s+| ; /))
    .map((p) => ({ p, n: p.replace(/\$[^$]*\$/g, "F").split(/\s+/).filter((m) => /[\p{L}\dF]/u.test(m)).length }))
    .filter((x) => x.n > 0);
  const moyenne = phrases.reduce((s, x) => s + x.n, 0) / phrases.length;
  console.log(`phrases : ${phrases.length}, ${moyenne.toFixed(1)} mots en moyenne, la plus longue ${Math.max(...phrases.map((x) => x.n))}`);
  vrai(`phrases de 13 mots en moyenne au plus (${moyenne.toFixed(1)})`, moyenne <= 13);
  for (const x of phrases) vrai(`phrase de ${x.n} mots, 20 au plus : « ${x.p.slice(0, 70)}… »`, x.n <= 20);
}

/** « a) $7{,}6$ » : le nombre de chaque ligne a), b)… de l'énoncé. */
const lignesAbc = (k) => e(k).split("\\n").filter((l) => /^[a-e]\) /.test(l));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const MOTS = { trois: 3, sept: 7, douze: 12, quatre: 4, "deux cent six": 206, quarante: 40, cinq: 5 };
  const RANG = { unités: 1, dixièmes: 0.1, centièmes: 0.01, millièmes: 0.001 };
  const xs = lignesAbc(1).map((l) =>
    r9(
      l.slice(3).replace(/\.$/, "").toLowerCase().split(" et ").reduce((s, morceau) => {
        const m = morceau.match(/^(.*) (unités|dixièmes|centièmes|millièmes)$/);
        if (!(m[1] in MOTS)) throw new Error(`mot inconnu : ${m[1]}`);
        return s + MOTS[m[1]] * RANG[m[2]];
      }, 0),
    ),
  );
  vrai(`1. quatre nombres lus (${xs})`, xs.length === 4);
  dit(1, `Réponse : ${xs.map((x, i) => `${"abcd"[i]}) $${t(x)}$`).join(" ; ")}.`);
  const [, lignes] = dessin("numeration", 1);
  vrai("1. le tableau écrit les quatre réponses", lignes.every((l, i) => nb(l.nom) === xs[i]));
  vrai("1. le zéro des dixièmes du b)", chiffre(xs[1], 1) === 0 && chiffre(xs[1], 2) === 4);
});
essai("2", () => {
  const xs = lignesAbc(2).map((l) => {
    const m = l.match(/\\dfrac\{([\d\\,]+)\}\{([\d\\,]+)\}/);
    return r9(nb(m[1]) / nb(m[2]));
  });
  dit(2, `Réponse : ${xs.map((x, i) => `${"abcd"[i]}) $${t(x)}$`).join(" ; ")}.`);
  dit(2, `$40$ dixièmes font $4$ unités. Il reste $3$ dixièmes : $${t(xs[0])}$.`);
  const [, lignes] = dessin("numeration", 2);
  vrai("2. le tableau écrit les quatre réponses", lignes.every((l, i) => nb(l.nom) === xs[i]));
});
essai("3", () => {
  const x = nombresDe(e(3))[0];
  const r = [chiffre(x, 1), chiffre(x, 2), chiffre(x, 3), chiffre(x, -1)];
  dit(3, `Réponse : ${r.map((d, i) => `${"abcd"[i]}) $${d}$`).join(" ; ")}.`);
  dit(3, `$${chiffre(x, 0)}$ unités, $${chiffre(x, -1)}$ dizaines`);
  const [col, lignes, surligne] = dessin("numeration", 3);
  vrai("3. le tableau écrit le nombre, dixièmes surlignés", valeur(col, lignes[0].chiffres) === x && surligne === "d");
});
essai("4", () => {
  const paires = lignesAbc(4).map((l) => nombresDe(l));
  const signes = paires.map(([a, b]) => (a < b ? "<" : a > b ? ">" : "="));
  dit(4, `Réponse : ${signes.map((s, i) => `${"abcd"[i]}) $${s}$`).join(" ; ")}.`);
  paires.slice(0, 3).forEach(([a, b], i) => dit(4, `Donc $${t(a)} ${signes[i]} ${t(b)}$.`));
  vrai("4. d) : égalité", signes[3] === "=");
  dit(4, "$3{,}40 = 3{,}4$.");
  const [col, lignes] = dessin("numeration", 4);
  vrai("4. le tableau montre le a)", memes(lignes.map((l) => valeur(col, l.chiffres)), paires[0]));
});
essai("5", () => {
  const xs = lignesAbc(5).map((l) => nombresDe(l)[0]);
  xs.forEach((x) => dit(5, `$${t(x)}$ : $${chiffre(x, 1)}$ dixièmes. J'arrondis à $${arr(x, 0)}$.`));
  dit(5, `Réponse : ${xs.map((x, i) => `${"abcd"[i]}) $${arr(x, 0)}$`).join(" ; ")}.`);
  vrai("5. 4,49 ne monte pas", arr(4.49, 0) === 4);
  const [min, max, , [p]] = dessin("demiDroite", 5);
  vrai("5. la droite montre le b) entre ses deux entiers", p.value === xs[1] && min === Math.floor(xs[1]) && max === Math.floor(xs[1]) + 1);
});
essai("6", () => {
  const xs = lignesAbc(6).map((l) => nombresDe(l)[0]);
  xs.slice(0, 3).forEach((x) => dit(6, `$${Math.floor(x)} < ${t(x)} < ${Math.floor(x) + 1}$.`));
  const d = xs[3], bas = Math.floor(r9(d * 10)) / 10;
  dit(6, `$${t(bas)} < ${t(d)} < ${t(r9(bas + 0.1))}$.`);
  dit(6, `Réponse : ${xs.slice(0, 3).map((x, i) => `${"abc"[i]}) $${Math.floor(x)}$ et $${Math.floor(x) + 1}$`).join(" ; ")} ; d) $${t(bas)}$ et $${t(r9(bas + 0.1))}$.`);
  const [min, max, , [p]] = dessin("demiDroite", 6);
  vrai("6. la droite montre le d)", p.value === d && min === bas && r9(max) === r9(bas + 0.1));
});
essai("7", () => {
  const [n] = dessin("grille", 7, "figure");
  enonceDit(7, "Il est coupé en $100$ petits carreaux.");
  dit(7, `$${n}$ carreaux sur $100$ sont coloriés : $\\dfrac{${n}}{100}$.`);
  dit(7, `$${n}$ centièmes s'écrivent $${t(n / 100)}$.`);
  dit(7, `Je vois $${Math.floor(n / 10)}$ colonnes pleines.`);
  dit(7, `c'est $${Math.floor(n / 10)}$ dixièmes et $${n % 10}$ centièmes.`);
});
essai("8", () => {
  const xs = nombresDe(e(8));
  const tri = [...xs].sort((a, b) => a - b);
  dit(8, `Réponse : $${tri.map(t).join(" < ")}$.`);
  dit(8, `$${tri.map((x) => Math.round(r9((x - 2) * 1000))).join(" < ")}$`);
  const [col, lignes] = dessin("numeration", 8);
  vrai("8. le tableau, rangé", lignes.every((l, i) => valeur(col, l.chiffres) === tri[i] && nb(l.nom) === tri[i]));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const x = nombresDe(e(9))[0];
  dit(9, `$${chiffre(x, -1)}$ dizaines, $${chiffre(x, 0)}$ unité, $${chiffre(x, 1)}$ dixièmes, $${chiffre(x, 2)}$ centièmes`);
  dit(9, `$${t(x)} = ${Math.floor(x)} + \\dfrac{${chiffre(x, 1)}}{10} + \\dfrac{${chiffre(x, 2)}}{100}$`);
  const b = r9(6 + 5 / 10 + 9 / 1000);
  enonceDit(9, "$6 + \\dfrac{5}{10} + \\dfrac{9}{1\\,000}$");
  dit(9, `$${t(b)}$.`);
  const dix = Math.floor(r9(x * 10));
  dit(9, `Il y a $${dix}$ dixièmes en tout.`);
  const [col, lignes] = dessin("numeration", 9);
  vrai("9. le tableau écrit a) et b)", valeur(col, lignes[0].chiffres) === x && valeur(col, lignes[1].chiffres) === b);
});
essai("10", () => {
  const eleves = [...e(10).matchAll(/([A-Z][a-z]+) : \$([^$]*)\$ m/g)].map((m) => ({ nom: m[1], x: nb(m[2]) }));
  vrai("10. quatre lancers lus", eleves.length === 4);
  const tri = [...eleves].sort((a, b) => b.x - a.x);
  dit(10, `c'est ${tri[0].nom}.`);
  dit(10, `$${tri.map((o) => t(o.x)).join(" > ")}$`);
  dit(10, `Réponse : a) ${tri[0].nom} ; b) ${tri.map((o) => o.nom).join(", ")} ; c) ${tri[0].nom}, ${tri[1].nom} et ${tri[2].nom}.`);
  const [, , , points] = dessin("demiDroite", 10);
  vrai("10. la droite porte chaque lancer", eleves.every((o) => points.some((p) => p.label === o.nom && p.value === o.x)));
});
essai("11", () => {
  const pi = 3.14159;
  enonceDit(11, "$3{,}14159\\ldots$");
  dit(11, `Réponse : a) $${t(arr(pi, 0))}$ ; b) $${t(arr(pi, 1))}$ ; c) $${t(arr(pi, 2))}$ ; d) $13{,}0$.`);
  const x = nombresDe(lignesAbc(11)[3])[0];
  vrai("11. 12,96 arrondi au dixième = 13", arr(x, 1) === 13);
  dit(11, `Je regarde les centièmes, $${chiffre(x, 2)}$. Je monte`);
  const [, , , [p]] = dessin("demiDroite", 11);
  vrai("11. la droite montre 12,96", p.value === x);
});
essai("12", () => {
  const bornes = lignesAbc(12).slice(0, 3).map((l) => nombresDe(l));
  const rep = c(12).split("Réponse :")[1];
  const [a, b, cc] = rep.split(" ; b) ").flatMap((s, i) => (i === 0 ? [s] : s.split(" ; c) ")));
  const exA = nombresDe(a), exB = nombresDe(b)[0], exC = nombresDe(cc)[0];
  vrai(`12. a) trois nombres entre ${bornes[0]}`, exA.length === 3 && exA.every((x) => x > bornes[0][0] && x < bornes[0][1]));
  vrai(`12. b) ${exB} entre ${bornes[1]}`, exB > bornes[1][0] && exB < bornes[1][1]);
  vrai(`12. c) ${exC} entre ${bornes[2]}`, exC > bornes[2][0] && exC < bornes[2][1]);
  dit(12, "d) non.");
  const [, , , points] = dessin("demiDroite", 12);
  vrai("12. la droite porte les trois nombres du a)", memes(points.map((p) => p.value), exA));
});
essai("13", () => {
  const st = Object.fromEntries([...e(13).matchAll(/Station ([A-C]) : \$([^$]*)\$ €/g)].map((m) => [m[1], nb(m[2])]));
  const tri = Object.entries(st).sort((a, b) => a[1] - b[1]);
  dit(13, `La moins chère est la station ${tri[0][0]}.`);
  dit(13, `b) $${tri.map(([, x]) => t(x)).join(" < ")}$.`);
  vrai("13. arrondi de A = prix de B", arr(st.A, 2) === st.B && st.A < st.B);
  dit(13, `je regarde les millièmes, $${chiffre(st.A, 3)}$. Je monte : $${t(arr(st.A, 2))}$ €.`);
  dit(13, `Réponse : a) la station ${tri[0][0]} ; b) ${tri.map(([n]) => n).join(", ")} ; c) $${t(arr(st.A, 2))}$ €.`);
  const [col, lignes] = dessin("numeration", 13);
  vrai("13. le tableau porte les trois prix, rangés", lignes.every((l, i) => l.nom === tri[i][0] && valeur(col, l.chiffres) === tri[i][1]));
});
essai("14", () => {
  const x = nombresDe(e(14))[0];
  const ent = Math.floor(x), cent = Math.round(r9(x * 100));
  dit(14, `La partie entière est $${ent}$. La partie décimale vaut $${cent % 100}$ centièmes, soit $${t(r9(x - ent))}$.`);
  dit(14, `Le chiffre des dixièmes est $${chiffre(x, 1)}$. Celui des centièmes est $${chiffre(x, 2)}$.`);
  const cc = t(cent);
  dit(14, `c'est $${cc}$ centièmes : $\\dfrac{${cc}}{100}$.`);
  dit(14, `$${t(x)} = ${ent} + \\dfrac{${chiffre(x, 1)}}{10} + \\dfrac{${chiffre(x, 2)}}{100}$.`);
  const [min, max, , [p]] = dessin("demiDroite", 14);
  vrai("14. la droite : entre les deux entiers", p.value === x && min === ent && max === ent + 1);
});
essai("15", () => {
  const [x, y] = lignesAbc(15).filter((l) => /\$/.test(l)).map((l) => nombresDe(l)[0]);
  const bx = Math.floor(r9(x * 10)) / 10;
  dit(15, `$${t(bx)} < ${t(x)} < ${t(r9(bx + 0.1))}$.`);
  dit(15, `Le milieu est $${t(r9(bx + 0.05))}$.`);
  dit(15, `Son arrondi au dixième est $${t(arr(x, 1))}$.`);
  const by = Math.floor(r9(y * 10)) / 10;
  dit(15, `$${t(by)} < ${t(y)} < ${t(r9(by + 0.1))}$.`);
  vrai("15. 0,952 arrondi au dixième = 1", arr(y, 1) === 1);
  const [, , , points] = dessin("demiDroite", 15);
  vrai("15. la droite : le nombre et le milieu", memes(points.map((p) => p.value), [x, r9(bx + 0.05)]));
});
essai("16", () => {
  const verites = [3.5 === 3.5, 0.8 < 0.75, false, 4.099 < 4.1, Number.isFinite(5)];
  dit(16, `Réponse : ${verites.map((v, i) => `${"abcde"[i]}) ${v ? "vrai" : "faux"}`).join(" ; ")}.`);
  vrai("16. c) 2,15 et 2,151 sont bien entre 2 et 3, et ne sont pas des dixièmes", 2.15 > 2 && 2.151 < 3);
  const [col, lignes] = dessin("numeration", 16);
  vrai("16. le tableau montre b) et d)", memes(lignes.map((l) => valeur(col, l.chiffres)), [0.8, 0.75, 4.099, 4.1]));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const filles = [...e(17).matchAll(/([A-Z][a-zéè]+) \$(\d+\{,\}\d+)\$/g)].map((m) => ({ nom: m[1], x: nb(m[2]) }));
  vrai("17. quatre temps lus", filles.length === 4);
  const tri = [...filles].sort((a, b) => a.x - b.x);
  dit(17, `$${tri.map((o) => t(o.x)).join(" < ")}$`);
  const ar = filles.map((o) => arr(o.x, 1));
  dit(17, `b) $${t(ar[0])}$ ; $${t(ar[1])}$ ; $${t(ar[2])}$ ; $${t(ar[3])}$ ; c)`);
  const egales = filles.filter((o, i) => ar.filter((a) => a === ar[i]).length > 1).map((o) => o.nom);
  dit(17, `c) ${egales.slice(0, -1).join(", ")} et ${egales.at(-1)} ;`);
  const lena = filles.find((o) => o.nom === "Léna").x, bl = Math.floor(r9(lena * 10)) / 10;
  dit(17, `d) $${t(bl)} < ${t(lena)} < ${t(r9(bl + 0.1))}$.`);
  dit(17, `Réponse : a) ${tri.map((o) => o.nom).join(", ")} ;`);
  const [, , , points] = dessin("demiDroite", 17);
  vrai("17. la droite porte chaque temps", filles.every((o) => points.some((p) => p.label === o.nom && p.value === o.x)));
});
essai("18", () => {
  const fruits = [...e(18).matchAll(/(pomme|poire|orange|kiwi) : \$([^$]*)\$ kg/gi)].map((m) => ({ nom: m[1].toLowerCase(), mil: Math.round(nb(m[2]) * 1000) }));
  vrai("18. quatre fruits lus", fruits.length === 4);
  const pomme = fruits.find((o) => o.nom === "pomme").mil;
  dit(18, `Le chiffre des centièmes est $${Math.floor(pomme / 10) % 10}$.`);
  const tri = [...fruits].sort((a, b) => a.mil - b.mil);
  dit(18, `$${tri.map((o) => o.mil).join(" < ")}$ : ${tri.map((o) => `l${o.nom === "orange" ? "'" : "e "}${o.nom}`.replace("le pomme", "la pomme").replace("le poire", "la poire")).join(", ")}.`);
  dit(18, `Je monte : $${t(Math.round(pomme / 10) / 100)}$ kg.`);
  const kiwi = fruits.find((o) => o.nom === "kiwi").mil;
  enonceDit(18, "« Le kiwi pèse $0{,}8$ kg. »");
  vrai("18. Tom se trompe d'un facteur dix", 800 === kiwi * 10);
  const [col, lignes] = dessin("numeration", 18);
  vrai("18. le tableau porte les fruits, rangés", lignes.every((l, i) => l.nom === tri[i].nom && Math.round(valeur(col, l.chiffres) * 1000) === tri[i].mil));
});
essai("19", () => {
  // Tous les nombres à deux chiffres après la virgule entre 0 et 10, en centièmes.
  const tous = Array.from({ length: 1001 }, (_, n) => n);
  const i12 = tous.filter((n) => Math.round(n / 100) === 5 && n > 500);
  const i3 = i12.filter((n) => n % 10 === 7);
  const i4 = i3.filter((n) => Math.floor(n / 10) % 10 % 2 === 1 && Math.floor(n / 10) % 10 > 2);
  dit(19, `il reste $${i3.map((n) => t(n / 100)).join("$ ; $")}$.`);
  vrai(`19. une seule solution (${i4})`, i4.length === 1);
  dit(19, `Réponse : je suis $${t(i4[0] / 100)}$.`);
  vrai("19. 5,57 : arrondi 6", Math.round(557 / 100) === 6);
  const [, , , points] = dessin("demiDroite", 19);
  vrai("19. la droite porte les candidats, la solution en vert", memes(points.map((p) => p.value), i3.map((n) => n / 100)) && points.find((p) => p.value === i4[0] / 100).color === f.constantes.VERT);
});
essai("20", () => {
  const [entete, ligne] = dessin("tableau", 20, "figure");
  const jours = { "lun.": "lundi", "mar.": "mardi", "mer.": "mercredi", "jeu.": "jeudi", "ven.": "vendredi" };
  const pluie = entete.slice(1).map((j, i) => ({ j: jours[j], x: ligne[i + 1] }));
  const tri = [...pluie].sort((a, b) => a.x - b.x);
  dit(20, `Réponse : a) ${tri.at(-1).j} ;`);
  dit(20, `b) $${tri.map((o) => t(o.x)).join(" < ")}$ : ${tri.map((o) => o.j).join(", ")}.`);
  const mardi = pluie.find((o) => o.j === "mardi").x;
  dit(20, `Je monte : $${t(arr(mardi, 1))}$ mm.`);
  const mer = pluie.find((o) => o.j === "mercredi").x, lun = pluie.find((o) => o.j === "lundi").x;
  dit(20, `Je cherche entre $${t(mer)}$ et $${t(lun)}$.`);
  vrai("20. 1,25 est entre mercredi et lundi", 1.25 > mer && 1.25 < lun && c(20).includes("$1{,}25$ mm"));
});

f.fin();
