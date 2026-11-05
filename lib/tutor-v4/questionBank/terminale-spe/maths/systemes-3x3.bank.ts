// SYSTÈMES 3 × 3 : système triangulaire, combinaison qui élimine, pivot de Gauss (05/11/2026). Hors
// programme français (registre `hors_france`) ; le 2 × 2 est en seconde (`systeme_cramer`). Lignes visées :
// Maroc, Belgique S6 3.2.2b, Sénégal 1re AL 3, Côte d'Ivoire 1re C1-L2.
// Le système se tire à partir de sa solution entière : tout tombe juste.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { T, court, entre, expl, fabrique, melange, phrase, qcm, somme, un } from "../../lycee-commun";

const tpl = fabrique("terminale-spe", "systemes_3x3", "tle_");
const M = "systeme_3x3_gauss";

const DEF = "Le pivot de Gauss élimine une inconnue à la fois : par combinaisons de lignes, on arrive à un système triangulaire, puis on remonte de la dernière ligne à la première.";

const LETTRES = [["x", "y", "z"], ["a", "b", "c"], ["u", "v", "w"], ["p", "q", "r"]] as const;
const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v) return v;
  }
};
type L = readonly [number, number, number, number];
/** Une ligne « 2x - y + 3z = 7 » ; un coefficient nul disparaît. */
function ligne(l: L, v: readonly string[]) {
  return `${somme([T(l[0], 1, v[0]), T(l[1], 1, v[1]), T(l[2], 1, v[2])])} = ${l[3]}`;
}
/** Le système écrit : le correcteur relit ce bloc. */
const sys = (ls: readonly L[], v: readonly string[]) => `$\\begin{cases} ${ls.map((l) => ligne(l, v)).join(" \\\\ ")} \\end{cases}$`;
const sol = () => [entre(-5, 6), entre(-5, 6), entre(-5, 6)] as const;
const second = (c: readonly number[], s: readonly number[]) => c[0] * s[0] + c[1] * s[1] + c[2] * s[2];
const fait = (c: readonly number[], s: readonly number[]): L => [c[0], c[1], c[2], second(c, s)];
const triplet = (s: readonly number[]) => `$(${s[0]}\\,;${s[1]}\\,;${s[2]})$`;

/** Système triangulaire : y, z puis z seul. */
function triangulaire(s: readonly number[]) {
  const c1 = [un([1, 1, 2, 3]), nz(-3, 3), nz(-3, 3)];
  const c2 = [0, un([1, 1, 2, -1, 3]), nz(-3, 3)];
  const c3 = [0, 0, un([1, 2, 3, -1, -2, 4])];
  return [fait(c1, s), fait(c2, s), fait(c3, s)] as const;
}
/** Système complet dont la 1re ligne a un pivot 1 ; l'élimination reste en entiers. */
function complet(s: readonly number[]) {
  for (;;) {
    const c1 = [1, nz(-3, 3), nz(-3, 3)];
    const k2 = un([-3, -2, -1, 1, 2, 3]);
    const k3 = un([-3, -2, -1, 1, 2, 3]);
    const c2 = [k2, k2 * c1[1] + nz(-3, 3), k2 * c1[2] + nz(-3, 3)];
    const c3 = [k3, k3 * c1[1] + nz(-3, 3), k3 * c1[2] + nz(-3, 3)];
    const det =
      c1[0] * (c2[1] * c3[2] - c2[2] * c3[1]) - c1[1] * (c2[0] * c3[2] - c2[2] * c3[0]) + c1[2] * (c2[0] * c3[1] - c2[1] * c3[0]);
    if (det === 0 || [...c2, ...c3].some((x) => Math.abs(x) > 12)) continue;
    return [fait(c1, s), fait(c2, s), fait(c3, s)] as const;
  }
}
const OPS = ["\\leftarrow", "\\to"];
const RESOUS = (s: string) => [
  `On considère le système :\n\n${s}\n\n`,
  `Soit le système :\n\n${s}\n\n`,
  `Voici un système :\n\n${s}\n\n`,
  `On veut résoudre :\n\n${s}\n\n`,
];
const comb = (k: number, i: number) => {
  const a = Math.abs(k);
  return `L_{${i}}${k < 0 ? " + " : " - "}${a === 1 ? "" : a}L_{1}`;
};

/* ★3 : trois relevés sur trois objets. Les phrases gardent toujours la même forme, relue par le correcteur. */
type Ctx = { intro: string; a: string; b: string; c: string; verbe: string; unite: string; q: (n: string) => string };
const CONTEXTES: Ctx[] = [
  { intro: "Une randonneuse pèse son sac selon trois chargements.", a: "gourdes", b: "boussoles", c: "lampes", verbe: "pèsent", unite: "hectogrammes", q: (n) => `Combien pèse une seule pièce parmi les ${n}, en hectogrammes ?` },
  { intro: "Un boulanger note la farine de trois fournées.", a: "pains", b: "brioches", c: "tartes", verbe: "demandent", unite: "hectogrammes de farine", q: (n) => `Quelle quantité de farine demande une seule pièce parmi les ${n}, en hectogrammes ?` },
  { intro: "Une ingénieure mesure la consommation de trois montages.", a: "moteurs", b: "capteurs", c: "écrans", verbe: "consomment", unite: "watts", q: (n) => `Combien de watts consomme un seul appareil parmi les ${n} ?` },
  { intro: "Un entraîneur compte les points de trois équipes.", a: "essais", b: "pénalités", c: "drops", verbe: "rapportent", unite: "points", q: (n) => `Combien de points vaut une seule action parmi les ${n} ?` },
  { intro: "Une musicienne chronomètre trois parties d'un concert.", a: "valses", b: "marches", c: "ballades", verbe: "durent", unite: "minutes", q: (n) => `Combien de minutes dure un seul morceau parmi les ${n} ?` },
  { intro: "Une botaniste relève l'eau donnée à trois parcelles.", a: "fougères", b: "orchidées", c: "palmiers", verbe: "reçoivent", unite: "décilitres", q: (n) => `Combien de décilitres reçoit une seule plante parmi les ${n} ?` },
  { intro: "Un développeur de jeu note l'énergie de trois assauts.", a: "épées", b: "boucliers", c: "potions", verbe: "valent", unite: "points d'énergie", q: (n) => `Combien de points d'énergie vaut un seul objet parmi les ${n} ?` },
  { intro: "Un technicien de son relève le temps de pose de trois scènes.", a: "enceintes", b: "micros", c: "projecteurs", verbe: "prennent", unite: "minutes", q: (n) => `Combien de minutes prend la pose d'un seul appareil parmi les ${n} ?` },
];

const gabarits: TutorBankItemV4[] = [
  /* ★1 */
  tpl(M, 1, 1, "Commence par la dernière ligne : elle n'a qu'une inconnue.", () => {
    const v = un(LETTRES);
    const s = sol();
    const t = triangulaire(s);
    return court(
      phrase(RESOUS(sys(t, v)), [`Que vaut $${v[2]}$ ?`, `Quelle valeur de $${v[2]}$ lit-on sur la dernière ligne ?`, `Lis la dernière ligne : que vaut $${v[2]}$ ?`, `Trouve $${v[2]}$.`, `Donne la valeur de $${v[2]}$.`]),
      s[2],
      expl(DEF, "La dernière ligne ne contient qu'une inconnue.", `$${ligne(t[2], v)}$.`, `$${v[2]} = ${s[2]}$.`),
    );
  }),
  tpl(M, 2, 1, "Remplace la valeur de la dernière ligne dans la deuxième.", () => {
    const v = un(LETTRES);
    const s = sol();
    const t = triangulaire(s);
    return court(
      phrase(RESOUS(sys(t, v)), [`Que vaut $${v[1]}$ ?`, `Remonte d'une ligne : que vaut $${v[1]}$ ?`, `Trouve $${v[1]}$.`, `Donne la valeur de $${v[1]}$.`, `Quelle est la valeur de $${v[1]}$ ?`]),
      s[1],
      expl(DEF, `On tire $${v[2]} = ${s[2]}$ de la dernière ligne.`, `On remplace dans $${ligne(t[1], v)}$.`, `$${v[1]} = ${s[1]}$.`),
    );
  }),
  tpl(M, 3, 1, "Remonte : la dernière ligne, puis la deuxième, puis la première.", () => {
    const v = un(LETTRES);
    const s = sol();
    const t = triangulaire(s);
    return qcm(
      phrase(RESOUS(sys(t, v)), ["Quelle est la solution ?", `Quel triplet $(${v.join("\\,;")})$ est solution ?`, "Quel est l'unique triplet solution ?", "Parmi ces triplets, lequel convient ?", "Remonte les lignes : quel triplet trouves-tu ?"]),
      triplet(s),
      [triplet([s[0] + 1, s[1], s[2]]), triplet([s[0], s[1] - 1, s[2]]), triplet([s[2], s[1], s[0] + 2]), triplet([-s[0] + 1, s[1], s[2]]), triplet([s[0], s[1], s[2] + 1])],
      expl(DEF, "On remonte de la dernière ligne à la première.", `$${v[2]} = ${s[2]}$, puis $${v[1]} = ${s[1]}$, puis $${v[0]} = ${s[0]}$.`, `La solution est ${triplet(s)}.`),
    );
  }),
  tpl(M, 4, 1, "Remplace dans chaque ligne : les trois doivent être justes.", () => {
    const v = un(LETTRES);
    const s = sol();
    const c = complet(s);
    return qcm(
      phrase(RESOUS(sys(c, v)), ["Lequel de ces triplets vérifie les trois équations ?", "Quel triplet est solution ?", "Sans résoudre, quel triplet convient ?", "En remplaçant, quel triplet est le bon ?", "Quel triplet rend les trois lignes vraies ?"]),
      triplet(s),
      [triplet([s[0] + 1, s[1], s[2]]), triplet([s[0], s[1] + 1, s[2]]), triplet([s[0], s[1], s[2] - 1]), triplet([s[1], s[0] + 1, s[2]]), triplet([s[0] - 1, s[1] + 1, s[2]])],
      expl(DEF, "Un triplet est solution s'il rend vraies les trois lignes.", `$${ligne(c[0], v)}$ est vraie pour ${triplet(s)}, comme les deux autres.`, `La solution est ${triplet(s)}.`),
    );
  }),
  /* ★2 */
  tpl(M, 5, 2, "Le coefficient de la première inconnue en L₁ est 1 : multiplie L₁ par celui de L₂.", () => {
    const v = un(LETTRES);
    const s = sol();
    const c = complet(s);
    const i = un([2, 3]);
    const k = c[i - 1][0];
    const fl = OPS[0];
    const ch = (kk: number) => `$L_{${i}} ${fl} ${comb(kk, i)}$`;
    return qcm(
      phrase(RESOUS(sys(c, v)), [`Quelle opération élimine $${v[0]}$ de la ligne $L_{${i}}$ ?`, `Quelle combinaison fait disparaître $${v[0]}$ de $L_{${i}}$ ?`, `Pour éliminer $${v[0]}$ de $L_{${i}}$, que faut-il faire ?`, `Quelle opération de Gauss annule le coefficient de $${v[0]}$ en $L_{${i}}$ ?`]),
      ch(k),
      [ch(-k), ch(k + 1), ch(k - 1 === 0 ? k + 2 : k - 1), ch(2 * k)],
      expl(DEF, `Le coefficient de $${v[0]}$ vaut 1 en $L_{1}$ et $${k}$ en $L_{${i}}$.`, `On retranche $${k}$ fois $L_{1}$.`, `L'opération est ${ch(k)}.`),
    );
  }),
  tpl(M, 6, 2, "Retranche la ligne multipliée, coefficient par coefficient.", () => {
    const v = un(LETTRES);
    const s = sol();
    const c = complet(s);
    const i = un([2, 3]);
    const k = c[i - 1][0];
    const r = c[i - 1].map((x, j) => x - k * c[0][j]);
    const eq = (b: number, d: number, e: number) => `$${somme([T(b, 1, v[1]), T(d, 1, v[2])])} = ${e}$`;
    return qcm(
      phrase(RESOUS(sys(c, v)), [`On fait $L_{${i}} \\leftarrow ${comb(k, i)}$. Quelle ligne obtient-on ?`, `Après $L_{${i}} \\leftarrow ${comb(k, i)}$, que devient $L_{${i}}$ ?`, `L'opération $L_{${i}} \\leftarrow ${comb(k, i)}$ donne quelle équation ?`, `Quelle équation sans $${v[0]}$ résulte de $L_{${i}} \\leftarrow ${comb(k, i)}$ ?`]),
      eq(r[1], r[2], r[3]),
      [eq(r[1], r[2], r[3] + 2), eq(r[1], -r[2], r[3]), eq(-r[1], r[2], r[3]), eq(c[i - 1][1] + k * c[0][1], c[i - 1][2] + k * c[0][2], c[i - 1][3] + k * c[0][3]), eq(r[1] + 1, r[2], r[3])],
      expl(DEF, `On calcule $L_{${i}} - (${k}) \\times L_{1}$, coefficient par coefficient.`, `Le coefficient de $${v[0]}$ s'annule.`, `On obtient ${eq(r[1], r[2], r[3])}.`),
    );
  }),
  tpl(M, 7, 2, "Élimine la première inconnue des lignes 2 et 3, puis la deuxième inconnue.", () => {
    const v = un(LETTRES);
    const s = sol();
    const c = complet(s);
    const i = entre(0, 2);
    return court(
      phrase(RESOUS(sys(c, v)), [`Résous-le, puis donne $${v[i]}$.`, `Applique le pivot de Gauss. Que vaut $${v[i]}$ ?`, `Par combinaisons de lignes, trouve $${v[i]}$.`, `Quelle est la valeur de $${v[i]}$ dans la solution ?`]),
      s[i],
      expl(DEF, `On élimine $${v[0]}$ de $L_{2}$ et $L_{3}$, puis $${v[1]}$ de la dernière ligne.`, `Le système triangulaire donne ${triplet(s)}.`, `$${v[i]} = ${s[i]}$.`),
    );
  }),
  tpl(M, 8, 2, "Résous, puis additionne les trois valeurs.", () => {
    const v = un(LETTRES);
    const s = sol();
    const c = complet(s);
    const coefs = [un([1, 2]), un([1, -1, 2]), un([1, -1, 3])];
    const f = somme(v.map((l, i) => T(coefs[i], 1, l)));
    const r = second(coefs, s);
    return court(
      phrase(RESOUS(sys(c, v)), [`Calcule $${f}$ pour la solution.`, `Résous-le, puis calcule $${f}$.`, `Que vaut $${f}$ pour le triplet solution ?`, `Une fois la solution trouvée, que donne $${f}$ ?`]),
      r,
      expl(DEF, "On résout par le pivot de Gauss.", `La solution est ${triplet(s)}.`, `$${f} = ${r}$.`),
    );
  }),
  /* ★3 */
  tpl(M, 9, 3, "Note x, y, z les valeurs d'un objet de chaque sorte, et écris une ligne par relevé.", () => {
    const c = un(CONTEXTES);
    const s = [entre(2, 15), entre(2, 15), entre(2, 15)];
    for (;;) {
      const l = [0, 1, 2].map(() => [entre(1, 5), entre(1, 5), entre(1, 5)]);
      const [a, b, d] = l;
      const det = a[0] * (b[1] * d[2] - b[2] * d[1]) - a[1] * (b[0] * d[2] - b[2] * d[0]) + a[2] * (b[0] * d[1] - b[1] * d[0]);
      if (det === 0) continue;
      const rel = l.map((x) => `${x[0]} ${c.a}, ${x[1]} ${c.b} et ${x[2]} ${c.c} ${c.verbe} ${second(x, s)} ${c.unite}`);
      const i = entre(0, 2);
      const nom = [c.a, c.b, c.c][i];
      return court(
        `${c.intro} ${rel.map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(". ")}. ${c.q(nom)}`,
        s[i],
        expl(DEF, "Chaque relevé donne une équation à trois inconnues.", `La solution est ${triplet(s)}.`, `Pour les ${nom}, la valeur est $${s[i]}$.`),
      );
    }
  }),
  tpl(M, 10, 3, "Chaque point donne une équation en a, b, c.", () => {
    for (;;) {
      const co = [nz(-3, 3), nz(-5, 5), entre(-6, 6)];
      const xs = melange([-2, -1, 0, 1, 2, 3]).slice(0, 3).sort((p, q) => p - q);
      const ps = xs.map((x) => ({ x, y: co[0] * x * x + co[1] * x + co[2] }));
      const pts = ps.map((p) => `$(${p.x}\\,;${p.y})$`);
      const quoi = un(["a", "b", "c"]);
      const idx = ["a", "b", "c"].indexOf(quoi);
      const ctx = un([
        `La trajectoire d'un ballon de basket suit une parabole $y = ax^{2} + bx + c$`,
        `Un jet d'eau de fontaine dessine une parabole $y = ax^{2} + bx + c$`,
        `Une architecte modélise une arche par une parabole $y = ax^{2} + bx + c$`,
        `Le saut d'un dauphin suit une parabole $y = ax^{2} + bx + c$`,
        `Une physicienne ajuste ses mesures par une parabole $y = ax^{2} + bx + c$`,
        `Un graphiste trace la bosse d'un logo par une parabole $y = ax^{2} + bx + c$`,
      ]);
      return court(
        `${ctx}, qui passe par les points ${pts[0]}, ${pts[1]} et ${pts[2]}. ${un([`Que vaut $${quoi}$ ?`, `Écris le système, puis donne $${quoi}$.`, `Trouve le coefficient $${quoi}$.`, `Par le pivot de Gauss, détermine $${quoi}$.`])}`,
        co[idx],
        expl(DEF, "Chaque point donne une équation $ax^{2} + bx + c = y$.", `Le système a pour solution ${triplet(co)}.`, `$${quoi} = ${co[idx]}$.`),
      );
    }
  }),
  tpl(M, 11, 3, "Si la dernière ligne devient 0 = 0 ou 0 = k, le système n'a pas qu'une solution.", () => {
    const v = un(LETTRES);
    const s = sol();
    const UNE = "Une seule solution";
    const AUCUNE = "Aucune solution";
    const INF = "Une infinité de solutions";
    for (;;) {
      const c1 = [1, nz(-3, 3), nz(-3, 3)];
      const c2 = [nz(-3, 3), nz(-3, 3), nz(-3, 3)];
      const genre = un([UNE, AUCUNE, INF]);
      let ls: L[];
      if (genre === UNE) {
        const c3 = [nz(-3, 3), nz(-3, 3), nz(-3, 3)];
        const det = c1[0] * (c2[1] * c3[2] - c2[2] * c3[1]) - c1[1] * (c2[0] * c3[2] - c2[2] * c3[0]) + c1[2] * (c2[0] * c3[1] - c2[1] * c3[0]);
        if (det === 0) continue;
        ls = [fait(c1, s), fait(c2, s), fait(c3, s)];
      } else {
        // La 3e ligne combine les deux premières ; le second membre décalé rend le système impossible.
        const k = un([1, 2, -1]);
        const c3 = c1.map((x, i) => x + k * c2[i]);
        if (c3.some((x) => x === 0) || (c2[0] === c1[0] && c2[1] === c1[1])) continue;
        const a = fait(c1, s);
        const b = fait(c2, s);
        ls = [a, b, [c3[0], c3[1], c3[2], a[3] + k * b[3] + (genre === AUCUNE ? nz(-4, 4) : 0)]];
        const ech = c2[0] * c1[1] - c2[1] * c1[0];
        if (ech === 0 && c2[0] * c1[2] - c2[2] * c1[0] === 0) continue;
      }
      return qcm(
        `${un(["Une équipe de recherche obtient ce système :", "Dans un modèle de circuit électrique, on trouve le système", "Une chimiste équilibre un mélange avec le système", "Un logiciel de planning aboutit au système", "Un programme de jeu vidéo calcule une position par le système"])}\n\n${sys(ls, v)}\n\n${un(["Combien de solutions a-t-il ?", "Que dire de ses solutions ?", "Combien de triplets le vérifient ?", "Comment se termine le pivot de Gauss, en nombre de solutions ?"])}`,
        genre,
        [UNE, AUCUNE, INF, "Exactement deux solutions"],
        expl(DEF, "On échelonne le système.", genre === UNE ? "On obtient un système triangulaire avec trois pivots." : genre === AUCUNE ? "La dernière ligne devient $0 = k$, avec $k$ non nul." : "La dernière ligne devient $0 = 0$.", `Réponse : ${genre.toLowerCase()}.`),
      );
    }
  }),
];

/** Le système a son paragraphe : la phrase qui suit ne garde pas l'espace de la jonction. */
export const systemes3x3Bank: TutorBankItemV4[] = gabarits.map((g) => ({
  ...g,
  generate: () => {
    const q = g.generate();
    return { ...q, text: q.text.replace(/\n\n /g, "\n\n") };
  },
}));
