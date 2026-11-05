// AIGUILLES, PATRONS DU CUBE, HASARD EN DEUX ÉTAPES (05/11/2026). Trous du programme
// de CM2 : cm2-M-durees-2, cm2-G-solides-4, cm2-D-probabilites-6.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, exp, gabarits, melange, qcm, qcmN, un, v } from "./trous-outils";

/* ───────────────────────── duree_positionner_aiguilles ───────────────────────── */
const ai = gabarits("duree_positionner_aiguilles", "duree", ["horloge"]);
const hm = (h: number, m: number) => `${h} h ${String(m).padStart(2, "0")}`;
const tireH = () => ({ h: entre(1, 11), m: 5 * entre(1, 11) });
const horloge = (h: number, m: number): CanvasFigure => ({ kind: "duree", variant: "horloge", time: { hour: h, minute: m }, display: { showNumbers: true, showMinuteTicks: true, showDigital: false } } as CanvasFigure);
const lieuGrande = (m: number) => (m === 0 ? 12 : m / 5);
const lieuPetite = (h: number, m: number) => {
  const a = h % 12 === 0 ? 12 : h % 12;
  const b = a === 12 ? 1 : a + 1;
  return m === 0 ? `Sur le ${a}` : `Entre le ${a} et le ${b}`;
};
const expGrande = (m: number) => exp("la grande aiguille montre les minutes : chaque nombre du cadran vaut 5 minutes.", "on divise les minutes par 5.", `${m} ÷ 5 = ${m / 5}.`, `la grande aiguille est sur le ${lieuGrande(m)}.`);
const expPetite = (h: number, m: number) => exp("la petite aiguille montre les heures, et elle avance doucement pendant l'heure.", `à ${hm(h, m)}, l'heure ${h} a commencé et n'est pas finie.`, `${h} h est passé : elle a quitté le ${h % 12 === 0 ? 12 : h % 12}.`, `${lieuPetite(h, m).toLowerCase()}.`);
const fauxGrande = (m: number) => {
  const j = lieuGrande(m);
  return [j + 1, j - 1, m, j + 2, j + 3].filter((f) => f > 0 && f !== j);
};
const fauxPetite = (h: number, m: number) => {
  const a = h % 12 === 0 ? 12 : h % 12;
  const p = a === 1 ? 12 : a - 1;
  const b = a === 12 ? 1 : a + 1;
  return [`Sur le ${a}`, `Sur le ${b}`, `Entre le ${p} et le ${a}`, `Entre le ${a} et le ${b}`].filter((f) => f !== lieuPetite(h, m));
};
const PG = ["Où va la grande aiguille : sur quel nombre ?", "Sur quel nombre se place la grande aiguille ?", "La grande aiguille pointe sur quel nombre ?", "Sur quel nombre est la grande aiguille ?"];
const PP = ["Où est la petite aiguille ?", "Où se place la petite aiguille ?", "Où faut-il mettre la petite aiguille ?", "Où pointe la petite aiguille ?"];
const IL_EST = (t: string) => [`Il est ${t}.`, `L'horloge indique ${t}.`, `On veut afficher ${t}.`, `On règle l'horloge sur ${t}.`];
const dureePositionner: TutorBankItemV4[] = [
  ai(1, "Chaque nombre du cadran vaut 5 minutes.", () => {
    const { h, m } = tireH();
    return qcmN(lieuGrande(m), fauxGrande(m), expGrande(m), v(IL_EST(hm(h, m)), PG));
  }),
  ai(1, "Après l'heure pile, la petite aiguille a quitté le nombre de l'heure.", () => {
    const { h } = tireH();
    const m = un([0, 10, 15, 20, 30, 40, 45, 50]);
    return qcm(lieuPetite(h, m), fauxPetite(h, m), expPetite(h, m), v(IL_EST(hm(h, m)), PP));
  }),
  ai(1, "Lis d'abord la grande aiguille, puis la petite.", () => {
    const { h, m } = tireH();
    const oui = Math.random() < 0.5;
    const hA = oui ? h : (h % 11) + 1;
    const mA = oui ? m : m === 55 ? 25 : (m + 15 > 55 ? m - 15 : m + 15);
    return qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"], exp("la grande aiguille donne les minutes, la petite donne l'heure.", "on lit chaque aiguille et on compare.", `l'horloge montre ${hm(h, m)}.`, oui ? "c'est la même heure." : `ce n'est pas ${hm(hA, mA)}.`), `${v(["Regarde l'horloge.", "Lis cette horloge.", "Observe cette horloge."])} ${v([`Indique-t-elle ${hm(hA, mA)} ?`, `Est-il ${hm(hA, mA)} sur cette horloge ?`, `Cette horloge montre-t-elle ${hm(hA, mA)} ?`, `Peut-on lire ${hm(hA, mA)} ?`])}`, horloge(h, m));
  }),
  ai(2, "Grande aiguille pour les minutes : vérifie les deux aiguilles.", () => {
    const { h, m } = tireH();
    const bonA = Math.random() < 0.5;
    const autreH = (h + entre(2, 5)) % 12 || 12;
    const autreM = (m + 5 * entre(2, 5)) % 60 || 15;
    const faux = un([{ hour: autreH, minute: m }, { hour: h, minute: autreM }]);
    const start = { ...(bonA ? { hour: h, minute: m } : faux), label: "A" };
    const end = { ...(bonA ? faux : { hour: h, minute: m }), label: "B" };
    return qcm(bonA ? "L'horloge A" : "L'horloge B", [bonA ? "L'horloge B" : "L'horloge A"], exp("la grande aiguille donne les minutes, la petite donne l'heure.", "on lit chaque horloge.", `l'heure cherchée est ${hm(h, m)}.`, `c'est l'horloge ${bonA ? "A" : "B"}.`), v(["", "Lis bien les deux aiguilles.", "Regarde les deux horloges."], [`Quelle horloge indique ${hm(h, m)} ?`, `Laquelle montre ${hm(h, m)} ?`, `Sur quelle horloge lit-on ${hm(h, m)} ?`, `Où peut-on lire ${hm(h, m)} ?`]), { kind: "duree", variant: "double_horloge", start, end, display: { showNumbers: true, showMinuteTicks: true, showDigital: false } } as CanvasFigure);
  }),
  ai(2, "Après midi, enlève 12 pour trouver le nombre du cadran.", () => {
    const { h, m } = tireH();
    const H = h + 12;
    const petite = Math.random() < 0.5;
    if (petite) return qcm(lieuPetite(h, m), fauxPetite(h, m), exp("sur le cadran, 13 h se lit 1, 14 h se lit 2…", "on enlève 12.", `${H} − 12 = ${h}.`, `${lieuPetite(h, m).toLowerCase()}.`), v(IL_EST(hm(H, m)), PP));
    return qcmN(lieuGrande(m), fauxGrande(m), expGrande(m), v(IL_EST(hm(H, m)), PG));
  }),
  ai(2, "La trotteuse fait le tour en 60 secondes : chaque nombre vaut 5 secondes.", () => {
    const { h, m } = tireH();
    const s = 5 * entre(1, 11);
    return qcmN(s / 5, [s / 5 + 1, s / 5 - 1, s, s / 5 + 2, lieuGrande(m)].filter((f) => f > 0 && f !== s / 5), exp("la trotteuse montre les secondes : chaque nombre du cadran vaut 5 secondes.", "on divise les secondes par 5.", `${s} ÷ 5 = ${s / 5}.`, `la trotteuse est sur le ${s / 5}.`), `${v(["Il est", "L'horloge indique", "On lit"])} ${hm(h, m)} min ${s} s. ${v(["Sur quel nombre est la trotteuse ?", "La trotteuse pointe sur quel nombre ?", "Où est la trotteuse : sur quel nombre ?", "Sur quel nombre se place la trotteuse ?"])}`);
  }),
  ai(3, "Les minutes divisées par 5 donnent le nombre du cadran.", () => {
    const { h, m } = tireH();
    const H = un([h, h + 12]);
    const C = un(["Le film commence", "Le train part", "Le match commence", "Le spectacle commence", "La fusée décolle", "Le bus passe", "La marée monte", "Le concert commence", "Le cours de judo commence", "L'avion atterrit"]);
    return qcmN(lieuGrande(m), fauxGrande(m), expGrande(m), `${C} à ${hm(H, m)}. ${v(["On prépare l'horloge de l'école.", "On règle une pendule à cette heure.", "On met une horloge à cette heure."])} ${v(PG)}`);
  }),
  ai(3, "Elle a quitté le nombre de l'heure, sans arriver au suivant.", () => {
    const { h } = tireH();
    const m = un([10, 15, 20, 30, 40, 45, 50]);
    const H = un([h, h + 12]);
    const C = un(["Le réveil sonne", "Le gâteau sort du four", "La récréation commence", "La séance de piscine commence", "Le marché ouvre", "Le dîner est servi", "Le film finit", "Le feu d'artifice commence", "Le dernier bus part", "La visite commence"]);
    return qcm(lieuPetite(h, m), fauxPetite(h, m), expPetite(h, m), `${C} à ${hm(H, m)}. ${v(["On place les aiguilles d'une horloge à cette heure.", "On règle une pendule à cette heure.", "On met une horloge à cette heure."])} ${v(PP)}`);
  }),
  ai(3, "Le cadran est le même, le matin et l'après-midi.", () => {
    const { h, m } = tireH();
    const oui = Math.random() < 0.5;
    const hA = oui ? h + 12 : ((h + entre(1, 4) - 1) % 11) + 1 + 12;
    const P = un(["Une gardienne", "Un chef de gare", "Une élève", "Un horloger", "Une cuisinière", "Un pilote", "Une infirmière", "Un surveillant"]);
    const reel = oui || hA - 12 === h;
    return qcm(reel ? "Oui" : "Non", [reel ? "Non" : "Oui"], exp("sur le cadran, 13 h se lit 1, 14 h se lit 2…", "on enlève 12, puis on lit les aiguilles.", `${hA} − 12 = ${hA - 12}.`, reel ? `les aiguilles montrent bien ${hm(hA - 12, m)}.` : `les aiguilles montrent ${hm(h, m)}.`), `${P} ${v(["regarde cette horloge", "lit cette horloge", "observe ce cadran"])} l'après-midi. ${v([`Peut-il être ${hm(hA, m)} ?`, `Est-il ${hm(hA, m)} ?`, `Les aiguilles disent-elles ${hm(hA, m)} ?`])}`, horloge(h, m));
  }),
];

/* ───────────────────────── solide_patron_construire ───────────────────────── */
const pa = gabarits("solide_patron_construire", "solide", ["patron"]);
type Cases = [number, number][];
/** Les 11 patrons du cube. */
const PATRONS: Cases[] = [
  ...[[0, 0], [0, 1], [0, 2], [0, 3], [1, 1], [1, 2]].map(([a, b]) => [[1, 0], [1, 1], [1, 2], [1, 3], [0, a], [2, b]] as Cases),
  ...[1, 2, 3].map((c) => [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3], [2, c]] as Cases),
  [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]],
  [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3], [1, 4]],
];
/** Six carrés bien attachés qui ne se referment pas en cube. */
const NON_PATRONS: Cases[] = [
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]],
  [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [0, 1]],
  [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]],
  [[1, 0], [1, 1], [1, 2], [1, 3], [0, 0], [0, 3]],
  [[1, 0], [1, 1], [1, 2], [1, 3], [0, 0], [0, 1]],
  [[1, 0], [1, 1], [1, 2], [1, 3], [0, 1], [0, 2]],
  [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3], [2, 3]],
  [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1], [2, 2]],
  [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3], [2, 2]],
  [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2]],
  [[0, 1], [1, 0], [1, 1], [1, 2], [0, 2], [2, 1]],
];
/** Tourner, retourner, recaler en haut à gauche : la forme change d'allure, pas de nature. */
function tourne(c: Cases): Cases {
  const k = entre(0, 3);
  const miroir = Math.random() < 0.5;
  let l: Cases = c.map(([r, x]) => [r, miroir ? -x : x]);
  for (let i = 0; i < k; i++) l = l.map(([r, x]) => [x, -r]);
  const rm = Math.min(...l.map(([r]) => r));
  const cm = Math.min(...l.map(([, x]) => x));
  return l.map(([r, x]) => [r - rm, x - cm]);
}
/** Forme canonique : la plus petite écriture parmi ses 8 positions. */
function canon(c: Cases): string {
  const fs: string[] = [];
  for (const miroir of [false, true]) {
    let l: Cases = c.map(([r, x]) => [r, miroir ? -x : x]);
    for (let i = 0; i < 4; i++) {
      l = l.map(([r, x]) => [x, -r]);
      const rm = Math.min(...l.map(([r]) => r));
      const cm = Math.min(...l.map(([, x]) => x));
      fs.push(l.map(([r, x]) => [r - rm, x - cm]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).join(";"));
    }
  }
  return fs.sort()[0];
}
const CANONS = new Set(PATRONS.map(canon));
const estPatron = (c: Cases) => CANONS.has(canon(c));
const NOMS = ["A", "B", "C", "D"];
const expPatron = (nom: string) => exp("un patron de cube, c'est 6 carrés qui se referment en cube, sans face en double.", "on plie le dessin en pensée : pas de bloc de 4 carrés, pas plus de 4 carrés en ligne.", `seul ${nom} se referme sans trou ni superposition.`, `${nom} est un patron de cube.`);
/** Les faces obtenues en roulant le cube sur le patron : pour trouver la face opposée. */
function plier(c: Cases): Map<string, string> {
  const dep = c[0];
  const res = new Map<string, string>();
  type D = { h: string; b: string; n: string; s: string; e: string; o: string };
  const rec = (r: number, x: number, d: D) => {
    const k = `${r},${x}`;
    if (res.has(k)) return;
    res.set(k, d.b);
    if (c.some(([a, b]) => a === r && b === x + 1)) rec(r, x + 1, { h: d.o, b: d.e, n: d.n, s: d.s, e: d.h, o: d.b });
    if (c.some(([a, b]) => a === r && b === x - 1)) rec(r, x - 1, { h: d.e, b: d.o, n: d.n, s: d.s, e: d.b, o: d.h });
    if (c.some(([a, b]) => a === r + 1 && b === x)) rec(r + 1, x, { h: d.n, b: d.s, n: d.b, s: d.h, e: d.e, o: d.o });
    if (c.some(([a, b]) => a === r - 1 && b === x)) rec(r - 1, x, { h: d.s, b: d.n, n: d.h, s: d.b, e: d.e, o: d.o });
  };
  rec(dep[0], dep[1], { h: "h", b: "b", n: "n", s: "s", e: "e", o: "o" });
  return res;
}
const OPP: Record<string, string> = { h: "b", b: "h", n: "s", s: "n", e: "o", o: "e" };
/** La case en face d'une case donnée. */
function enFace(c: Cases, cle: [number, number]): [number, number] {
  const m = plier(c);
  const f = m.get(`${cle[0]},${cle[1]}`)!;
  for (const [k, val] of m) if (val === OPP[f]) { const [a, b] = k.split(",").map(Number); return [a, b]; }
  throw new Error("patron invalide");
}
const unPatron = () => tourne(un(PATRONS));
const unNonPatron = () => tourne(un(NON_PATRONS));
const dessin = (l: { nom?: string; cases: Cases; textes?: { case: [number, number]; texte: string }[]; places?: { case: [number, number]; texte: string }[] }[]): CanvasFigure => ({ kind: "patrons_cube", patrons: l } as CanvasFigure);
const CHOIX = (mot: string, n: number) => NOMS.slice(0, n).map((x) => `${mot} ${x}`);
const PLIE = ["", "Plie le dessin dans ta tête.", "Imagine le pliage.", "Six carrés ne suffisent pas toujours."];
const solidePatron: TutorBankItemV4[] = [
  pa(1, "Évite les blocs de 4 carrés et les lignes de plus de 4.", () => {
    const l = melange([unPatron(), ...melange(NON_PATRONS).slice(0, 3).map(tourne)]);
    const j = l.findIndex(estPatron);
    return qcm(`Le dessin ${NOMS[j]}`, CHOIX("Le dessin", 4).filter((_, i) => i !== j), expPatron(`le dessin ${NOMS[j]}`), v(PLIE, ["Lequel est un patron de cube ?", "Quel dessin peut se plier en cube ?", "Lequel se referme en cube ?", "Quel dessin donne un cube ?", "Avec lequel peut-on faire un cube ?"]), dessin(l.map((cases, i) => ({ nom: NOMS[i], cases }))));
  }),
  pa(1, "Imagine une face comme fond, et replie les autres autour.", () => {
    const oui = Math.random() < 0.5;
    const c = oui ? unPatron() : unNonPatron();
    return qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"], oui ? exp("un patron de cube se referme avec 6 faces.", "on choisit un fond et on replie les autres carrés autour.", "chaque carré trouve sa face.", "c'est un patron de cube.") : exp("un patron de cube se referme avec 6 faces.", "on choisit un fond et on replie les autres carrés autour.", "deux carrés arrivent sur la même face : il reste un trou.", "ce n'est pas un patron de cube."), v(PLIE, ["Ce dessin est-il un patron de cube ?", "Peut-on plier ce dessin en cube ?", "Ce dessin donne-t-il un cube ?", "Ce dessin se referme-t-il en cube ?", "Obtient-on un cube avec ce dessin ?"]), dessin([{ cases: c }]));
  }),
  pa(1, "Un cube a 6 faces carrées : chacune est un carré du patron.", () => {
    const C = un([{ q: "Combien de carrés a un patron de cube ?", r: 6 }, { q: "Combien de faces a un cube ?", r: 6 }, { q: "Combien de carrés faut-il pour un patron de cube ?", r: 6 }, { q: "Un cube a combien de faces ?", r: 6 }, { q: "Combien d'arêtes a un cube ?", r: 12 }, { q: "Un cube a combien d'arêtes ?", r: 12 }, { q: "Combien de sommets a un cube ?", r: 8 }, { q: "Un cube a combien de sommets ?", r: 8 }]);
    return qcmN(C.r, [4, 5, 6, 8, 10, 12, 16].filter((f) => f !== C.r), exp("un cube a 6 faces carrées, 12 arêtes et 8 sommets.", "on compte sur un vrai cube, ou sur un dé.", "6 faces, 12 arêtes, 8 sommets.", `la réponse est ${C.r}.`), `${v(["", "Pense à un dé.", "Imagine un dé.", "Regarde un dé dans ta tête."])} ${C.q}`.trim());
  }),
  pa(2, "Essaie chaque place : une seule referme le cube.", () => {
    for (;;) {
      const c = unPatron();
      const i = entre(0, 5);
      const reste = c.filter((_, k) => k !== i);
      const voisins: [number, number][] = [];
      for (const [r, x] of reste) for (const [a, b] of [[r + 1, x], [r - 1, x], [r, x + 1], [r, x - 1]] as const) if (!reste.some(([p, q]) => p === a && q === b) && !voisins.some(([p, q]) => p === a && q === b)) voisins.push([a, b]);
      const bons = voisins.filter((p) => estPatron([...reste, p]));
      const mauvais = voisins.filter((p) => !estPatron([...reste, p]));
      if (bons.length !== 1 || mauvais.length < 2) continue;
      const places = melange([bons[0], ...melange(mauvais).slice(0, 2)]);
      const j = places.findIndex((p) => p === bons[0]);
      return qcm(`La place ${j + 1}`, [1, 2, 3].filter((n) => n !== j + 1).map((n) => `La place ${n}`), exp("il manque un carré pour faire 6 faces.", "on essaie chaque place, en pliant le dessin en pensée.", `seule la place ${j + 1} referme le cube.`, `il faut le carré à la place ${j + 1}.`), v(["Il manque un carré.", "Ce patron a perdu un carré.", "Il reste un carré à placer."], ["Où le mettre pour faire un patron de cube ?", "Quelle place donne un patron de cube ?", "Quelle place permet de fermer le cube ?", "À quelle place faut-il le coller ?"]), dessin([{ cases: reste, places: places.map((p, k) => ({ case: p, texte: String(k + 1) })) }]));
    }
  }),
  pa(2, "Trois carrés en ligne : le premier et le troisième sont face à face.", () => {
    const c = unPatron();
    const nums = melange([1, 2, 3, 4, 5, 6]);
    const textes = c.map((k, i) => ({ case: k, texte: String(nums[i]) }));
    const i0 = entre(0, 5);
    const face = enFace(c, c[i0]);
    const ni = textes.find((t) => t.case[0] === face[0] && t.case[1] === face[1])!;
    return qcmN(Number(ni.texte), nums.filter((n) => n !== Number(ni.texte) && n !== nums[i0]), exp("deux faces opposées ne se touchent pas.", "on plie le patron en pensée. Dans une ligne de trois carrés, les deux bouts sont face à face.", `la face ${nums[i0]} arrive en face de la face ${ni.texte}.`, `c'est la face ${ni.texte}.`), v(["On plie ce patron en cube.", "On replie ce patron.", "Ce patron devient un cube."], [`Quelle face est en face de la face ${nums[i0]} ?`, `Quelle face se retrouve en face de la ${nums[i0]} ?`, `Quel nombre est opposé au ${nums[i0]} ?`, `Quelle est la face opposée au ${nums[i0]} ?`]), dessin([{ cases: c, textes }]));
  }),
  pa(2, "Un seul de ces dessins ne se referme pas.", () => {
    const l = melange([unNonPatron(), ...melange(PATRONS).slice(0, 3).map(tourne)]);
    const j = l.findIndex((c) => !estPatron(c));
    return qcm(`Le dessin ${NOMS[j]}`, CHOIX("Le dessin", 4).filter((_, i) => i !== j), expPatron("le dessin qui reste").replace(/seul .+\./, `le dessin ${NOMS[j]} ne se referme pas.`).replace(/Conclusion : .+$/, `Conclusion : ${`le dessin ${NOMS[j]} n'est pas un patron de cube.`}`), v(PLIE, ["Lequel n'est pas un patron de cube ?", "Quel dessin ne peut pas se plier en cube ?", "Lequel ne donne pas un cube ?", "Quel dessin ne se referme pas ?", "Avec lequel ne peut-on pas faire un cube ?"]), dessin(l.map((cases, i) => ({ nom: NOMS[i], cases }))));
  }),
  pa(3, "Une seule découpe se plie en cube.", () => {
    const l = melange([unPatron(), ...melange(NON_PATRONS).slice(0, 2).map(tourne)]);
    const j = l.findIndex(estPatron);
    const O = un(["Une fabrique de boîtes", "Un pâtissier", "Une décoratrice", "Un fabricant de dés", "Une élève", "Un imprimeur", "Une couturière de luxe", "Un fabricant de jouets"]);
    return qcm(`La découpe ${NOMS[j]}`, CHOIX("La découpe", 3).filter((_, i) => i !== j), expPatron(`la découpe ${NOMS[j]}`), `${O} ${v(["veut une boîte cubique", "prépare une boîte en forme de cube", "fabrique un cube en carton"])}. ${v(["Quelle découpe faut-il choisir ?", "Quelle découpe se plie en cube ?", "Avec quelle découpe y arrive-t-on ?"])}`, dessin(l.map((cases, i) => ({ nom: NOMS[i], cases }))));
  }),
  pa(3, "Sur un dé, deux faces opposées font toujours 7.", () => {
    const c = unPatron();
    const paires = [[1, 6], [2, 5], [3, 4]];
    const m = new Map<string, number>();
    const opp = melange(paires);
    let k = 0;
    for (const p of c) {
      const key = `${p[0]},${p[1]}`;
      if (m.has(key)) continue;
      const f = enFace(c, p);
      m.set(key, opp[k][0]);
      m.set(`${f[0]},${f[1]}`, opp[k][1]);
      k++;
    }
    const cache = un(c);
    const r = m.get(`${cache[0]},${cache[1]}`)!;
    const textes = c.map((p) => ({ case: p, texte: p === cache ? "?" : String(m.get(`${p[0]},${p[1]}`)) }));
    const f = enFace(c, cache);
    const vis = m.get(`${f[0]},${f[1]}`)!;
    return qcmN(r, [1, 2, 3, 4, 5, 6].filter((x) => x !== r), exp("sur un dé, deux faces opposées font 7.", "on cherche la face opposée à celle qui manque, en pliant le patron.", `la face opposée porte ${vis} : 7 − ${vis} = ${r}.`, `il faut écrire ${r}.`), `${v(["Un fabricant de dés prépare ce patron.", "Une élève dessine le patron d'un dé.", "Un jeu de société utilise ce patron de dé.", "Un imprimeur prépare ce patron de dé."])} ${v(["Deux faces opposées font toujours sept.", "Sur un dé, les faces opposées font sept."])} ${v(["Quel nombre écrire à la place du point d'interrogation ?", "Quel nombre manque ?", "Quel nombre remplace le point d'interrogation ?"])}`, dessin([{ cases: c, textes }]));
  }),
  pa(3, "Chaque face est un carré : côté × côté, puis × le nombre de faces.", () => {
    const a = un([2, 3, 4, 5, 6, 8, 10]);
    const ouvert = Math.random() < 0.5;
    const n = ouvert ? 5 : 6;
    const O = un(["Une boîte", "Un cube de rangement", "Un pot à crayons cubique", "Un coffre cubique", "Un paquet cadeau cubique", "Un bac cubique", "Un dé géant", "Une lanterne cubique"]);
    return qcmN(n * a * a, [a * a, 6 * a, 4 * a * a, (n === 5 ? 6 : 5) * a * a, 12 * a].filter((f) => f !== n * a * a), exp("le patron contient un carré par face.", `on calcule l'aire d'un carré, puis on multiplie par ${n} faces.`, `${a} × ${a} = ${a * a} ; ${a * a} × ${n} = ${n * a * a}.`, `il faut ${n * a * a} cm² de carton.`), `${O} a une arête de ${a} cm${ouvert ? ", sans couvercle" : ", avec toutes ses faces"}. ${v(["Quelle aire de carton faut-il ?", "Quelle est l'aire de son patron ?", "Quelle aire a son patron ?"])}`, undefined, "cm²");
  }),
];

/* ───────────────────────── probabilite_deux_etapes ───────────────────────── */
const pb = gabarits("probabilite_deux_etapes", "probabilite", ["hasard"]);
const cs = (a: number, b: number) => `${a} chance${a > 1 ? "s" : ""} sur ${b}`;
const CH = (a: number, b: number) => {
  const j = cs(a, b);
  return { j, f: [a + 1, a - 1, a + 2, a * 2, b - a].filter((x) => x > 0 && x <= b && x !== a).map((x) => cs(x, b)) };
};
const expDeux = (l: string[], fav: number) => exp("on écrit toutes les issues, dans l'ordre : première étape, puis deuxième étape.", "chaque issue a la même chance. On compte celles qui conviennent.", `${l.join(" ; ")}.`, `il y a ${fav} chance${fav > 1 ? "s" : ""} sur ${l.length}.`);
const ISSUES_PIECE = ["Pile puis Pile", "Pile puis Face", "Face puis Pile", "Face puis Face"];
const OBJETS_PIECE = ["une pièce", "un jeton Pile ou Face", "une pièce de monnaie"];
const arbre = (l1: string[], l2: string[]): CanvasFigure => ({ kind: "arbre_proba", racineEnfants: l1.map((a) => ({ label: a, enfants: l2.map((b) => ({ label: b })) })) });
const sortes = [["Pile", "Face"], ["Rouge", "Bleu"], ["Oui", "Non"]];
const LISTE2 = [["1", "2", "3"], ["Rouge", "Vert", "Bleu"], ["A", "B", "C"], ["1", "2", "3", "4"], ["Rouge", "Vert", "Bleu", "Noir"], ["A", "B", "C", "D"]];
/** Le tableau rempli de deux dés : les sommes sont calculées, pas écrites à la main. */
const tableauDes = (n: number): CanvasFigure => ({
  kind: "tableau_donnees",
  title: "La somme des deux dés",
  headers: ["+", ...Array.from({ length: n }, (_, i) => String(i + 1))],
  rows: Array.from({ length: n }, (_, i) => ({ values: [String(i + 1), ...Array.from({ length: n }, (_, j) => String(i + j + 2))] })),
  display: { compact: true },
});
const nbSomme = (n: number, s: number) => {
  let t = 0;
  for (let a = 1; a <= n; a++) for (let b = 1; b <= n; b++) if (a + b === s) t++;
  return t;
};
const expDes = (n: number, s: number) => exp("le tableau montre toutes les issues : chaque case a la même chance.", `il y a ${n} × ${n} = ${n * n} cases ; on compte celles qui valent ${s}.`, `${nbSomme(n, s)} cases valent ${s}.`, `il y a ${cs(nbSomme(n, s), n * n)}.`);
const COUL = ["rouge", "bleue", "verte", "jaune"];
const boules = (n: number, c: string) => (n > 1 ? `${n} boules ${c}s` : `1 boule ${c}`);
const probabiliteDeuxEtapes: TutorBankItemV4[] = [
  pb(1, "Pour chaque résultat du premier lancer, il y a deux résultats au deuxième.", () => {
    const o = un(OBJETS_PIECE);
    return qcmN(4, [2, 3, 6, 8], expDeux(ISSUES_PIECE, 4).replace(/Conclusion : .+$/, "Conclusion : il y a 4 issues."), `${v(["", "Écris toutes les issues.", "Pense aux deux lancers.", "Fais un arbre."])} ${v([`On lance ${o} deux fois.`, `On lance ${o}, puis on recommence.`])} ${v(["Combien d'issues y a-t-il ?", "Combien de résultats possibles ?", "Combien d'issues possibles ?", "Combien de résultats différents ?", "Combien de chemins dans l'arbre ?"])}`.trim());
  }),
  pb(1, "Compte les feuilles au bout de l'arbre.", () => {
    const l1 = un(sortes);
    const l2 = un(LISTE2);
    return qcmN(l1.length * l2.length, [l1.length + l2.length, l1.length * l2.length + 1, l1.length * l2.length - 1, l2.length, 2 * l1.length * l2.length], exp("chaque chemin de l'arbre est une issue.", "pour chaque branche de la première étape, il y a toutes les branches de la deuxième.", `${l1.length} × ${l2.length} = ${l1.length * l2.length}.`, `il y a ${l1.length * l2.length} issues.`), v(["Regarde cet arbre.", "Voici l'arbre d'une expérience en deux étapes.", "Cet arbre montre deux étapes."], ["Combien d'issues y a-t-il ?", "Combien de chemins compte-t-on ?", "Combien de résultats possibles ?", "Combien d'issues possibles ?"]), arbre(l1, l2));
  }),
  pb(1, "Écris les 4 issues, et compte celles qui conviennent.", () => {
    const C = un([
      { q: "d'obtenir deux fois Pile", a: 1 }, { q: "d'obtenir deux fois Face", a: 1 }, { q: "d'obtenir Pile puis Face", a: 1 }, { q: "d'obtenir Face puis Pile", a: 1 }, { q: "d'obtenir deux fois le même côté", a: 2 },
      { q: "d'obtenir une fois Pile et une fois Face", a: 2 }, { q: "d'obtenir au moins une fois Pile", a: 3 }, { q: "d'obtenir au moins une fois Face", a: 3 }, { q: "d'obtenir Pile au premier lancer", a: 2 }, { q: "d'obtenir Face au deuxième lancer", a: 2 },
    ]);
    const { j, f } = CH(C.a, 4);
    return qcm(j, f, expDeux(ISSUES_PIECE, C.a), `${v(["On lance une pièce deux fois.", "On lance deux fois une pièce.", "Une pièce est lancée deux fois."])} ${v(["Quelle est la chance", "Combien de chances y a-t-il", "Quelles sont les chances"])} ${C.q} ?`);
  }),
  pb(2, "Chaque case du tableau est une issue : compte les cases.", () => {
    const n = un([4, 6]);
    const s = entre(3, 2 * n - 1);
    const { j, f } = CH(nbSomme(n, s), n * n);
    return qcm(j, f, expDes(n, s), `${v(["Ce tableau donne la somme de deux dés", "Le tableau montre la somme de deux dés", "Voici les sommes de deux dés"])} à ${n} faces. ${v(["Quelle est la chance d'obtenir une somme de", "Quelles sont les chances d'obtenir", "Combien de chances d'avoir une somme de"])} ${s} ?`, tableauDes(n));
  }),
  pb(2, "Une boule du premier sac, une du second : multiplie pour avoir toutes les issues.", () => {
    const r1 = entre(1, 3);
    const a1 = entre(1, 3);
    const r2 = entre(1, 3);
    const a2 = entre(1, 3);
    const [C1, C2] = melange(COUL).slice(0, 2);
    const t = (r1 + a1) * (r2 + a2);
    const fav = r1 * r2;
    const { j, f } = CH(fav, t);
    return qcm(j, f, exp("on prend une boule de chaque sac.", "toutes les issues : boules du sac 1 × boules du sac 2. Celles qui conviennent : les deux de la bonne couleur.", `${r1 + a1} × ${r2 + a2} = ${t} ; ${r1} × ${r2} = ${fav}.`, `il y a ${cs(fav, t)}.`), `${v(["Le sac 1 contient", "Dans le sac 1, il y a"])} ${boules(r1, C1)} et ${boules(a1, C2)}. ${v(["Le sac 2 contient", "Dans le sac 2, il y a"])} ${boules(r2, C1)} et ${boules(a2, C2)}. ${v(["On tire une boule de chaque sac.", "On prend une boule dans chaque sac."])} ${v(["Quelle est la chance d'avoir deux boules", "Quelles sont les chances d'avoir deux boules"])} ${C1}s ?`);
  }),
  pb(2, "Compte les issues qui portent ce résultat, dans tout l'arbre.", () => {
    const l2 = un(LISTE2);
    const c = un(l2);
    const { j, f } = CH(2, 2 * l2.length);
    return qcm(j, f, exp("chaque chemin de l'arbre a la même chance.", `on compte les chemins qui finissent par ${c}.`, `${c} apparaît 2 fois sur ${2 * l2.length} chemins.`, `il y a ${cs(2, 2 * l2.length)}.`), `${v(["Regarde cet arbre.", "Voici un arbre.", "Cet arbre montre deux étapes."])} ${v(["Toutes les issues ont la même chance.", "Chaque chemin a la même chance."])} ${v(["Quelle est la chance de finir par", "Quelles sont les chances de finir par", "Combien de chances d'arriver sur"])} ${c} ?`, arbre(["Pile", "Face"], l2));
  }),
  pb(3, "Issues totales = nombre de cases × 2 ; compte celles qui gagnent.", () => {
    const n = un([4, 5, 6, 8, 10]);
    const g = entre(1, n - 1);
    const C = un(["Une roue de foire", "Une roue de loterie", "Une roue de kermesse", "Une roue de cirque", "Une roulette de classe", "Une roue de jeu télévisé", "Une roue de fête", "Une roue de quartier"]);
    const { j, f } = CH(g, 2 * n);
    return qcm(j, f, exp("on tourne la roue, puis on lance la pièce.", `il y a ${n} × 2 = ${2 * n} issues. Pour gagner, il faut une case gagnante ET Pile.`, `${g} × 1 = ${g}.`, `il y a ${cs(g, 2 * n)}.`), `${C} a ${n} cases égales, dont ${g} ${g > 1 ? "gagnantes" : "gagnante"}. On la tourne, puis on lance une pièce. Pour gagner, il faut une case gagnante et Pile. ${v(["Quelle est la chance de gagner ?", "Quelles sont les chances de gagner ?", "Combien de chances de gagner ?"])}`);
  }),
  pb(3, "Compare les nombres de chances : le plus grand gagne.", () => {
    const n = 6;
    let a = entre(3, 11);
    let b = entre(3, 11);
    while (nbSomme(n, a) === nbSomme(n, b)) { a = entre(3, 11); b = entre(3, 11); }
    const g = nbSomme(n, a) > nbSomme(n, b) ? a : b;
    const J = un([["Léa", "Noé"], ["Inès", "Tom"], ["Maya", "Sami"], ["Lina", "Hugo"], ["Zoé", "Enzo"], ["Jade", "Malo"], ["Awa", "Yanis"], ["Mila", "Théo"]]);
    return qcm(g === a ? J[0] : J[1], [g === a ? J[1] : J[0], "Ils ont les mêmes chances"], exp("on compte les cases du tableau pour chaque somme.", "plus il y a de cases, plus il y a de chances.", `somme ${a} : ${nbSomme(n, a)} cases ; somme ${b} : ${nbSomme(n, b)} cases.`, `${g === a ? J[0] : J[1]} a le plus de chances.`), `On lance deux dés. ${J[0]} gagne si la somme vaut ${a}. ${J[1]} gagne si la somme vaut ${b}. ${v(["Qui a le plus de chances ?", "Qui a le plus de chances de gagner ?", "Qui gagnera le plus souvent ?"])}`, tableauDes(6));
  }),
  pb(3, "Un menu au hasard : multiplie, puis compte les issues demandées.", () => {
    const a = entre(2, 4);
    const b = entre(2, 5);
    const C = un([
      { t: `Une cantine sert au hasard une entrée parmi ${a} et un dessert parmi ${b}`, q: "ton entrée préférée et ton dessert préféré" }, { t: `Une tenue est tirée au hasard : un haut parmi ${a} et un bas parmi ${b}`, q: "ton haut préféré et ton bas préféré" }, { t: `Une équipe tire au sort un capitaine parmi ${a} et un gardien parmi ${b}`, q: "ton capitaine préféré et ton gardien préféré" }, { t: `Un jeu choisit au hasard un décor parmi ${a} et un héros parmi ${b}`, q: "ton décor préféré et ton héros préféré" },
      { t: `Une sortie est tirée au sort : un lieu parmi ${a} et un jour parmi ${b}`, q: "ton lieu préféré et ton jour préféré" }, { t: `Un glacier sert au hasard un cornet parmi ${a} et un parfum parmi ${b}`, q: "ton cornet préféré et ton parfum préféré" }, { t: `Une classe tire un livre parmi ${a} et un film parmi ${b}`, q: "ton livre préféré et ton film préféré" }, { t: `Un robot choisit au hasard une musique parmi ${a} et une danse parmi ${b}`, q: "ta musique préférée et ta danse préférée" },
    ]);
    const { j, f } = CH(1, a * b);
    return qcm(j, f, exp("il y a une issue pour chaque paire.", "on multiplie les deux nombres de choix.", `${a} × ${b} = ${a * b}.`, `une seule issue convient : ${cs(1, a * b)}.`), `${C.t}. ${v(["Quelle est la chance d'avoir", "Quelles sont les chances d'avoir"])} ${C.q} ?`);
  }),
];

export const aiguillesPatronsProbasBank: TutorBankItemV4[] = [
  ...dureePositionner,
  ...solidePatron,
  ...probabiliteDeuxEtapes,
];
