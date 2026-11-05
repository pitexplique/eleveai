// PROGRAMME 2026 DE PREMIÈRE, MODULE SPÉCIFIQUE (05/11/2026) : tests médicaux (faux
// négatifs, sensibilité, spécificité), loi des grands nombres par simulation, lecture
// d'un histogramme (la micro `auto_stat_lire_graphique` n'en faisait lire aucun).

import type { CanvasFigure, StatGraphCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, melange, mil, nL, qcm, un } from "../../lycee-commun";
import { gabaritsHistogramme } from "../../lycee-stats-commun";

const tplC = fabrique("premiere", "alea_conditionnelle_calcul", "1_");
const tplB = fabrique("premiere", "alea_bernoulli", "1_");
const tplS = fabrique("premiere", "auto_lire_statistiques", "1_");

/* ───── tests médicaux ───── */
const MALADIES = ["la grippe", "l'angine", "l'anémie", "l'allergie au pollen", "le diabète", "la rougeole", "la tuberculose", "l'hépatite B", "la dengue", "la varicelle", "le paludisme", "la coqueluche"];
/** « de la grippe », « de l'anémie », « du diabète ». */
const deM = (m: string) => (m.startsWith("le ") ? `du ${m.slice(3)}` : `de ${m}`);
type Test = { mal: string; p: number; se: number; sp: number };
function test(): Test {
  // Pourcentages choisis pour que tout tombe juste sur 10 000 personnes.
  return { mal: un(MALADIES), p: un([1, 2, 4, 5, 10, 20]), se: un([80, 85, 90, 95]), sp: un([80, 90, 95, 98]) };
}
const ENONCE = (t: Test) => `Dans une population, ${t.p} % des personnes ont ${t.mal}. Un test est positif chez ${t.se} % des malades, et négatif chez ${t.sp} % des personnes non malades.`;
const arbre = (t: Test): CanvasFigure =>
  ({
    kind: "arbre_proba",
    racineEnfants: [
      { label: "M", proba: fr(t.p / 100), enfants: [{ label: "T", proba: fr(t.se / 100) }, { label: "T̄", proba: fr(1 - t.se / 100) }] },
      { label: "M̄", proba: fr(1 - t.p / 100), enfants: [{ label: "T", proba: fr(1 - t.sp / 100) }, { label: "T̄", proba: fr(t.sp / 100) }] },
    ],
  }) as CanvasFigure;
const LEGENDE = " On note $M$ « être malade » et $T$ « avoir un test positif ».";
const DEF_T = "faux négatif : malade mais test négatif. Faux positif : non malade mais test positif. Sensibilité : part des malades dont le test est positif. Spécificité : part des non-malades dont le test est négatif.";

/* ───── simulations ───── */
type Sim = { s: string; ev: string; p: number; ech: string };
const SIMS: Sim[] = [
  { s: "On lance une pièce équilibrée.", ev: "obtenir pile", p: 50, ech: "lancers" },
  { s: "On fait tourner une roue partagée en quatre secteurs égaux, dont un rouge.", ev: "tomber sur le rouge", p: 25, ech: "tours de roue" },
  { s: "On tire une boule dans une urne de 10 boules, dont 3 vertes, et on la remet.", ev: "tirer une boule verte", p: 30, ech: "tirages" },
  { s: "Une machine produit des pièces, dont 20 % sont défectueuses.", ev: "tomber sur une pièce défectueuse", p: 20, ech: "pièces contrôlées" },
  { s: "Une joueuse réussit 70 % de ses lancers francs.", ev: "réussir le lancer", p: 70, ech: "lancers" },
  { s: "On tire une carte dans un jeu où 40 % des cartes sont rouges, et on la remet.", ev: "tirer une carte rouge", p: 40, ech: "tirages" },
  { s: "Un site enregistre un clic sur 10 publicités affichées.", ev: "obtenir un clic", p: 10, ech: "affichages" },
  { s: "Un généticien observe un caractère présent chez 60 % des graines.", ev: "observer le caractère", p: 60, ech: "graines" },
  { s: "Dans une ville, 80 % des bus arrivent à l'heure.", ev: "avoir un bus à l'heure", p: 80, ech: "bus observés" },
];
const PAS = [10, 50, 100, 500, 1000, 5000, 10000];
/** Une vraie simulation : la fréquence relevée à chaque palier, sans la retoucher. */
function courbeSimulee(p: number): StatGraphCanvasData {
  for (;;) {
    let n = 0;
    let k = 0;
    const data: { label: string; value: number }[] = [];
    for (const N of PAS) {
      for (; n < N; n++) if (Math.random() * 100 < p) k++;
      data.push({ label: String(N), value: Math.round((1000 * k) / N) / 10 });
    }
    // On garde un tirage où la fin de courbe se lit nettement (±1,5 point à la fin).
    if (Math.abs(data[data.length - 1].value - p) <= 1.5) return { kind: "stat_graph", graphType: "courbe", size: { width: 360, height: 240 }, data, display: { showValues: false, showLabels: true, showAxis: true, step: 10, axeY: "fréquence (%)" } };
  }
}
const DEF_G = "loi des grands nombres : plus on répète une expérience, plus la fréquence observée a des chances d'être proche de la probabilité.";

export const testsGrandsNombresBank: TutorBankItemV4[] = [
  /* ===== alea_cond_faux_negatifs ===== */
  tplC("alea_cond_faux_negatifs", 1, 1, "Le mot « positif » ou « négatif » décrit le test ; « faux » veut dire que le test se trompe.", () => {
    const m = un(MALADIES);
    const cas = un([
      { t: `Une personne atteinte ${deM(m)} a un test négatif.`, j: "un faux négatif" },
      { t: `Une personne qui n'a pas ${m} a un test positif.`, j: "un faux positif" },
      { t: `Une personne atteinte ${deM(m)} a un test positif.`, j: "un vrai positif" },
      { t: `Une personne qui n'a pas ${m} a un test négatif.`, j: "un vrai négatif" },
    ]);
    const t = cas.t;
    return qcm(`${t} ${un(["Comment appelle-t-on ce résultat ?", "De quel résultat s'agit-il ?", "Comment nomme-t-on ce cas ?"])}`, cas.j, ["un faux négatif", "un faux positif", "un vrai positif", "un vrai négatif"], expl(DEF_T, "on regarde si la personne est malade, puis ce que dit le test.", t, `c'est ${cas.j}.`));
  }),
  tplC("alea_cond_faux_negatifs", 2, 1, "Parmi les malades : test positif + test négatif = 100 %.", () => {
    const t = test();
    const sens = un([true, false]);
    if (sens) return court(`${un([`Un test de dépistage ${deM(t.mal)} a une sensibilité de ${t.se} %.`, `La sensibilité d'un test de dépistage ${deM(t.mal)} est de ${t.se} %.`])} ${un(["Quel pourcentage des malades auront un test négatif ?", "Quelle part des malades, en %, le test laisse-t-il passer ?", "Quel est le pourcentage de faux négatifs parmi les malades ?"])}`, 100 - t.se, expl(DEF_T, "parmi les malades, le test est soit positif, soit négatif.", `$100 - ${t.se} = ${100 - t.se}$.`, `$${100 - t.se}$ % des malades ont un test négatif.`), undefined, [`${100 - t.se} %`, `${100 - t.se}%`]);
    return court(`${un([`Un test de dépistage ${deM(t.mal)} a une spécificité de ${t.sp} %.`, `La spécificité d'un test de dépistage ${deM(t.mal)} est de ${t.sp} %.`])} ${un(["Quel pourcentage des personnes non malades auront un test positif ?", "Quelle part des non-malades, en %, a un test positif à tort ?", "Quel est le pourcentage de faux positifs parmi les non-malades ?"])}`, 100 - t.sp, expl(DEF_T, "parmi les non-malades, le test est soit négatif, soit positif.", `$100 - ${t.sp} = ${100 - t.sp}$.`, `$${100 - t.sp}$ % des non-malades ont un test positif.`), undefined, [`${100 - t.sp} %`, `${100 - t.sp}%`]);
  }),
  tplC("alea_cond_faux_negatifs", 3, 2, "Calcule d'abord le nombre de malades, puis ceux dont le test est négatif.", () => {
    const t = test();
    const N = un([10000, 20000, 50000, 100000]);
    const faux = un([true, false]);
    const n = faux ? (N * (t.p / 100) * (100 - t.se)) / 100 : (N * (1 - t.p / 100) * (100 - t.sp)) / 100;
    return court(`${ENONCE(t)} On teste ${mil(N)} personnes. ${faux ? un(["Combien de faux négatifs attend-on ?", "Combien de malades auront un test négatif ?"]) : un(["Combien de faux positifs attend-on ?", "Combien de personnes non malades auront un test positif ?"])}`, Math.round(n), expl(DEF_T, faux ? "on calcule le nombre de malades, puis la part de tests négatifs." : "on calcule le nombre de non-malades, puis la part de tests positifs.", faux ? `$${t.p}$ % de $${N}$, puis $${100 - t.se}$ % de ce résultat.` : `$${100 - t.p}$ % de $${N}$, puis $${100 - t.sp}$ % de ce résultat.`, `on attend $${Math.round(n)}$ ${faux ? "faux négatifs" : "faux positifs"}.`), arbre(t));
  }),
  tplC("alea_cond_faux_negatifs", 4, 2, "Sur un arbre, on multiplie les probabilités le long du chemin.", () => {
    const t = test();
    const faux = un([true, false]);
    const v = faux ? (t.p / 100) * (1 - t.se / 100) : (1 - t.p / 100) * (1 - t.sp / 100);
    return court(`${ENONCE(t)}${LEGENDE} ${faux ? un(["Quelle est la probabilité qu'une personne soit malade et ait un test négatif ?", "Calcule $P(M \\cap \\overline{T})$."]) : un(["Quelle est la probabilité qu'une personne soit non malade et ait un test positif ?", "Calcule $P(\\overline{M} \\cap T)$."])}`, v, expl("la probabilité d'un chemin est le produit des probabilités de ses branches.", "on suit le chemin sur l'arbre.", faux ? `$${nL(t.p / 100)} \\times ${nL(1 - t.se / 100)} = ${nL(v)}$.` : `$${nL(1 - t.p / 100)} \\times ${nL(1 - t.sp / 100)} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`), arbre(t));
  }),
  tplC("alea_cond_faux_negatifs", 5, 3, "Deux chemins mènent à un test négatif : additionne-les.", () => {
    const t = test();
    const neg = un([true, false]);
    const a = (t.p / 100) * (neg ? 1 - t.se / 100 : t.se / 100);
    const b = (1 - t.p / 100) * (neg ? t.sp / 100 : 1 - t.sp / 100);
    const v = a + b;
    return court(`${ENONCE(t)}${LEGENDE} ${neg ? un(["Quelle est la probabilité d'avoir un test négatif ?", "Calcule $P(\\overline{T})$."]) : un(["Quelle est la probabilité d'avoir un test positif ?", "Calcule $P(T)$."])}`, v, expl("probabilités totales : on additionne les probabilités de tous les chemins qui mènent à l'évènement.", "un chemin passe par $M$, l'autre par $\\overline{M}$.", `$${nL(a)} + ${nL(b)} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`), arbre(t));
  }),
  tplC("alea_cond_faux_negatifs", 6, 3, "Compte d'abord tous les tests du type voulu, puis la part de malades (ou de non-malades) parmi eux.", () => {
    const t = test();
    const pos = un([true, false]);
    const N = 100000;
    const mal = (N * t.p) / 100;
    const sain = N - mal;
    const [haut, bas] = pos ? [(sain * (100 - t.sp)) / 100, (mal * t.se) / 100 + (sain * (100 - t.sp)) / 100] : [(mal * (100 - t.se)) / 100, (mal * (100 - t.se)) / 100 + (sain * t.sp) / 100];
    const v = Math.round((1000 * haut) / bas) / 1000;
    return court(`${ENONCE(t)}${LEGENDE} ${pos ? "Une personne a un test positif. Quelle est la probabilité qu'elle ne soit pas malade, arrondie au millième ?" : "Une personne a un test négatif. Quelle est la probabilité qu'elle soit quand même malade, arrondie au millième ?"}`, v, expl("$P_T(M)$ et $P_M(T)$ sont deux probabilités différentes : le « parmi » change.", `on raisonne sur $${N}$ personnes : $${mal}$ malades et $${sain}$ non malades.`, `$${haut} \\div ${bas} \\approx ${nL(v)}$.`, `la probabilité vaut environ $${nL(v)}$.`), arbre(t));
  }),

  /* ===== alea_loi_grands_nombres ===== */
  tplB("alea_loi_grands_nombres", 1, 1, "Regarde la fin de la courbe, à droite : là où le nombre d'essais est très grand.", () => {
    const s = un(SIMS);
    const f = (x: number) => `Environ $${x}$ %`;
    const faux = [10, 20, 30, 40, 50, 60, 70, 80, 90].filter((x) => x !== s.p);
    return qcm(`${s.s} On simule l'expérience, et on relève la fréquence de l'évènement « ${s.ev} » selon le nombre de ${s.ech}. ${un(["Vers quelle valeur la fréquence se stabilise-t-elle ?", "Autour de quelle valeur la fréquence finit-elle par se stabiliser ?", "D'après la courbe, quelle valeur approche la fréquence pour un grand nombre d'essais ?"])}`, f(s.p), melange(faux).slice(0, 3).map(f), expl(DEF_G, "on lit la fin de la courbe.", `à droite, la courbe reste proche de $${s.p}$ %.`, `la fréquence se stabilise autour de $${s.p}$ %.`), courbeSimulee(s.p));
  }),
  tplB("alea_loi_grands_nombres", 2, 1, "La fréquence se rapproche de la probabilité, sans jamais être forcée de l'atteindre.", () => {
    const s = un(SIMS);
    const j = un([`Plus il y a de ${s.ech}, plus la fréquence a des chances d'être proche de $${s.p}$ %.`, `Avec beaucoup de ${s.ech}, la fréquence observée se rapproche de $${s.p}$ %.`]);
    return qcm(`${s.s} La probabilité de l'évènement « ${s.ev} » vaut $${s.p}$ %. ${un(["Quelle affirmation est juste ?", "Que dit la loi des grands nombres ?", "Laquelle de ces phrases est correcte ?"])}`, j, [`Avec 100 ${s.ech}, on obtient exactement $${s.p}$ % de réussites.`, `Après plusieurs échecs de suite, la réussite devient plus probable.`, `La fréquence s'éloigne de $${s.p}$ % quand on répète l'expérience.`, `La fréquence est la même, quel que soit le nombre de ${s.ech}.`], expl(DEF_G, "la fréquence varie d'une simulation à l'autre, mais se stabilise.", `elle se rapproche de $${s.p}$ %, sans être forcée de l'atteindre.`, j));
  }),
  tplB("alea_loi_grands_nombres", 3, 2, "Fréquence = nombre de fois où l'évènement arrive ÷ nombre d'essais.", () => {
    const s = un(SIMS);
    const N = un([50, 100, 200, 500, 1000, 2000]);
    const k = Math.round((N * (s.p + entre(-8, 8))) / 100);
    return court(`${s.s} Une simulation de ${mil(N)} ${s.ech} donne ${mil(k)} fois l'évènement « ${s.ev} ». ${un(["Quelle est la fréquence observée, en décimal ?", "Calcule la fréquence observée, sous forme décimale.", "Que vaut la fréquence de cet évènement, en décimal ?"])}`, k / N, expl("fréquence = nombre de réalisations ÷ nombre d'essais.", "on divise.", `$${k} \\div ${N} = ${nL(k / N)}$.`, `la fréquence est $${nL(k / N)}$.`), undefined, [`${fr((k / N) * 100)} %`, `${fr((k / N) * 100)}%`]);
  }),
  tplB("alea_loi_grands_nombres", 4, 2, "Quand la fréquence est stabilisée, on l'utilise comme probabilité : nombre attendu = fréquence × nombre d'essais.", () => {
    const s = un(SIMS);
    const M = un([200, 500, 1000, 2000, 5000]);
    const v = (s.p * M) / 100;
    return court(`${s.s} Une longue simulation montre une fréquence stabilisée autour de $${s.p}$ %. ${un([`Combien de fois peut-on s'attendre à « ${s.ev} » sur ${mil(M)} ${s.ech} ?`, `Sur ${mil(M)} ${s.ech}, combien de fois environ l'évènement « ${s.ev} » devrait-il se produire ?`])}`, v, expl(DEF_G, "on applique la fréquence stabilisée au nombre d'essais.", `$${s.p}$ % de $${M}$ font $${v}$.`, `on peut s'attendre à environ $${v}$ fois.`));
  }),
  tplB("alea_loi_grands_nombres", 5, 3, "Une petite simulation fluctue beaucoup. Une grande est plus proche de la probabilité.", () => {
    const s = un(SIMS);
    const N = melange([20, 50, 100]).slice(0, 2);
    const G = un([5000, 10000, 20000]);
    const A = `$${s.p + un([1, -1])}$ % sur ${mil(G)} ${s.ech}`;
    const autre = (n: number, d: number) => `$${s.p + d}$ % sur ${n} ${s.ech}`;
    return qcm(`${s.s} On veut estimer par simulation la probabilité de l'évènement « ${s.ev} ». Plusieurs simulations donnent des fréquences différentes. ${un(["Laquelle donne la meilleure estimation de la probabilité ?", "À quel résultat vaut-il mieux se fier ?", "Quel résultat estime le mieux la probabilité ?"])}`, A, [autre(N[0], un([-9, 9])), autre(N[1], un([-7, 7])), `$${s.p + un([-5, 5])}$ % sur 10 ${s.ech}`], expl(DEF_G, "on se fie à la simulation qui compte le plus d'essais.", `la plus longue porte sur $${G}$ essais.`, `on retient ${A}.`));
  }),
  tplB("alea_loi_grands_nombres", 6, 3, "`random()` donne un nombre entre 0 et 1 : il est inférieur à p avec la probabilité p.", () => {
    const s = un(SIMS);
    const p = String(s.p / 100);
    return qcm(`${s.s} On simule l'évènement « ${s.ev} » en Python : \`random()\` renvoie un nombre au hasard entre $0$ et $1$. ${un(["Quel test simule cet évènement ?", "Quelle condition simule cet évènement ?", "Quel test est vrai avec la bonne probabilité ?"])}`, `\`random() < ${p}\``, [`\`random() == ${p}\``, `\`random() < ${s.p}\``, `\`randint(0, 1) == ${p}\``, `\`random() > 1\``], expl("`random()` donne un nombre de $[0\\,;1[$ au hasard : il tombe sous $p$ avec la probabilité $p$.", "on compare le nombre tiré à la probabilité, écrite en décimal.", `la probabilité vaut $${s.p}$ %, soit $${nL(s.p / 100)}$.`, `le bon test est \`random() < ${p}\`.`));
  }),

  /* ===== auto_stat_lire_histogramme ===== */
  ...gabaritsHistogramme(tplS, "auto_stat_lire_histogramme"),
];
