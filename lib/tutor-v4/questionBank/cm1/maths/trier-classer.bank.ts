// TRIER ET CLASSER, CM1 (05/11/2026) : Belgique (P3 à P6, ligne 4.1) et les pays voisins.
// Masqué en France (lib/tutor-v4/micros-masquees.ts). Critères successifs, trois ensembles
// avec intersection, arbre dichotomique. Aucune question ouverte, phrases courtes,
// ★1-★2 sans histoire, ★3 avec un métier. Les réponses se CALCULENT depuis les
// propriétés de ../../tri-donnees.ts, jamais écrites à la main.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { atelier, cap, entre, etapes, melange, qcm, qcmN, tournure, un } from "./trous-outils";
import {
  type ArbreTire,
  type Critere,
  type Domaine,
  type Noeud,
  type Objet,
  arbreEquilibre,
  arbrePeigne,
  changerFeuilles,
  contexte,
  deuxAuHasard,
  domaine,
  essayer,
  figureEnsembles,
  liste,
  questionDe,
  repartir,
  sat,
  suivre,
  tientSurLaFigure,
  troisAuHasard,
} from "../../tri-donnees";

/* ═════════════════ tri_criteres_successifs ═════════════════ */
const S = atelier("cm1", "trier_classer", "tri_criteres_successifs");

const garde = (l: Objet[], k: Critere) => l.filter((x) => sat(x, k));
const enleve = (l: Objet[], k: Critere) => l.filter((x) => !sat(x, k));
const DEPART = (l: Objet[]) => un([`Liste : ${liste(l)}.`, `Départ : ${liste(l)}.`, `On a : ${liste(l)}.`, `Voici : ${liste(l)}.`]);
const ON_GARDE = (k: Critere) => un([`On garde ceux qui ${k.pl}.`, `On ne garde que ceux qui ${k.pl}.`, `Restent ceux qui ${k.pl}.`]);
const ON_ENLEVE = (k: Critere) => un([`On enlève ceux qui ${k.pl}.`, `On retire ceux qui ${k.pl}.`, `On sort ceux qui ${k.pl}.`]);
const PUIS = (t: string) => `Puis : ${t.charAt(0).toLowerCase()}${t.slice(1)}`;

/** Une liste de 6, et des tris dont le résultat convient. Les listes se calculent. */
function tirerListe(nCrit: number, ok: (l: Objet[], crits: Critere[]) => boolean) {
  return essayer(() => {
    const d = domaine();
    if (d.criteres.length < nCrit) return null;
    const crits = melange([...d.criteres]).slice(0, nCrit);
    const l = melange([...d.objets()]).slice(0, 6);
    return ok(l, crits) && { d, crits, l };
  });
}

function quiReste(nCrit: 2 | 3, ctx: boolean, retirer = false) {
  const { d, crits, l } = tirerListe(nCrit, (x, cs) => {
    let r = x;
    let inutile = false;
    cs.forEach((k, i) => {
      const avant = r.length;
      r = retirer && i === 0 ? enleve(r, k) : garde(r, k);
      if (r.length === avant) inutile = true; // chaque tri doit retirer quelqu'un
    });
    return !inutile && r.length === 1;
  });
  let r = l;
  crits.forEach((k, i) => { r = retirer && i === 0 ? enleve(r, k) : garde(r, k); });
  const phrases = crits.map((k, i) => (retirer && i === 0 ? ON_ENLEVE(k) : ON_GARDE(k)));
  const texte = [DEPART(l), phrases[0], ...phrases.slice(1).map(PUIS), un(["Qui reste ?", "Qui reste à la fin ?", "Que reste-t-il ?", "Lequel reste ?"])].join(" ");
  return {
    text: (ctx ? `${contexte(d)} ` : "") + texte,
    ...qcm(r[0].nom, l.filter((x) => x !== r[0]).map((x) => x.nom)),
    explanation: etapes(`on fait les tris un par un, dans l'ordre.`, crits.map((k, i) => `Tri ${i + 1} : ${retirer && i === 0 ? "on enlève" : "on garde"} ceux qui ${k.pl}.`).join(" "), `Il reste : ${r[0].nom}.`),
  };
}

function combienReste(ctx: boolean, retirer: boolean) {
  const { d, crits, l } = tirerListe(2, (x, cs) => {
    const un1 = retirer ? enleve(x, cs[0]) : garde(x, cs[0]);
    const r = garde(un1, cs[1]);
    // Chaque tri doit retirer quelqu'un : sinon la phrase ne sert à rien.
    return r.length >= 1 && r.length <= 4 && un1.length < x.length && r.length < un1.length;
  });
  const un1 = retirer ? enleve(l, crits[0]) : garde(l, crits[0]);
  const r = garde(un1, crits[1]);
  return {
    text: (ctx ? `${contexte(d)} ` : "") + [DEPART(l), retirer ? ON_ENLEVE(crits[0]) : ON_GARDE(crits[0]), PUIS(ON_GARDE(crits[1])), un(["Combien en reste-t-il ?", "Il en reste combien ?", "Combien restent à la fin ?"])].join(" "),
    ...qcmN(r.length, [un1.length, r.length + 1, r.length + 2, l.length]),
    explanation: etapes(`on fait le premier tri, puis le deuxième.`, `Après le premier tri : ${un1.length ? liste(un1) : "personne"}. Après le deuxième : ${liste(r)}.`, `Il en reste ${r.length}.`),
  };
}

const memeTri = (a: Objet[], b: Objet[]) => a.length === b.length && a.every((x) => b.includes(x));

/** Quel critère donne ce résultat ? Les faux critères donneraient autre chose. */
function retrouver(ctx: boolean) {
  const { d, k, l, faux, r } = essayer(() => {
    const d = domaine();
    const k = un(d.criteres);
    const l = melange([...d.objets()]).slice(0, 6);
    const r = garde(l, k);
    const faux = d.criteres.filter((m) => m !== k && !memeTri(garde(l, m), r));
    return r.length >= 2 && r.length <= 4 && faux.length >= 2 && !d.criteres.some((m) => m !== k && memeTri(garde(l, m), r)) && { d, k, l, faux, r };
  });
  return {
    text: (ctx ? `${contexte(d)} ` : "") + `${DEPART(l)} ${un([`Après le tri : ${liste(r)}.`, `On garde : ${liste(r)}.`, `Il reste : ${liste(r)}.`])} ${un(["Quel critère a servi ?", "Quel est le critère ?", "Quel tri a été fait ?", "Sur quoi a-t-on trié ?"])}`,
    ...qcm(k.label, faux.map((m) => m.label)),
    explanation: etapes(`on essaie chaque critère sur la liste.`, `Ceux qui ${k.pl} : ${liste(r)}.`, `Le critère : ${k.label}.`),
  };
}

/** Deux tris, deux résultats : on demande le premier ou le deuxième critère. */
function retrouverEtape(ctx: boolean) {
  const t = essayer(() => {
    const d = domaine();
    const [a, b] = deuxAuHasard(d.criteres);
    const l = melange([...d.objets()]).slice(0, 6);
    const r1 = garde(l, a);
    const r2 = garde(r1, b);
    if (r1.length < 2 || r1.length === 6 || r2.length < 1 || r2.length === r1.length) return null;
    const etape = un([1, 2]);
    const [depart, arrivee, juste] = etape === 1 ? [l, r1, a] : [r1, r2, b];
    const donnent = d.criteres.filter((m) => memeTri(garde(depart, m), arrivee));
    const faux = d.criteres.filter((m) => !memeTri(garde(depart, m), arrivee));
    return donnent.length === 1 && faux.length >= 2 && { d, l, r1, r2, etape, juste, faux, depart, arrivee };
  });
  return {
    text: (ctx ? `${contexte(t.d)} ` : "") + `${DEPART(t.l)} ${un(["Tri 1", "Étape 1", "Premier tri"])} : ${liste(t.r1)}. ${un(["Tri 2", "Étape 2", "Deuxième tri"])} : ${liste(t.r2)}. ${t.etape === 1 ? un(["Quel critère au tri 1 ?", "Quel critère a servi en premier ?", "Comment a-t-on fait le premier tri ?"]) : un(["Quel critère au tri 2 ?", "Quel critère a servi ensuite ?", "Comment a-t-on fait le deuxième tri ?"])}`,
    ...qcm(t.juste.label, t.faux.map((m) => m.label)),
    explanation: etapes(`on compare la liste avant le tri et la liste après.`, `Avant : ${liste(t.depart)}. Après : ${liste(t.arrivee)}.`, `Le critère : ${t.juste.label}.`),
  };
}

function elimine(ctx: boolean) {
  const { d, crits, l } = tirerListe(2, (x, cs) => {
    const r1 = garde(x, cs[0]);
    return r1.length >= 2 && enleve(r1, cs[1]).length === 1 && garde(r1, cs[1]).length >= 1;
  });
  const r1 = garde(l, crits[0]);
  const parti = enleve(r1, crits[1])[0];
  return {
    text: (ctx ? `${contexte(d)} ` : "") + [DEPART(l), ON_GARDE(crits[0]), PUIS(ON_GARDE(crits[1])), un(["Qui part au deuxième tri ?", "Qui sort au deuxième tri ?", "Qui est retiré au deuxième tri ?"])].join(" "),
    ...qcm(parti.nom, l.filter((x) => x !== parti).map((x) => x.nom)),
    explanation: etapes(`on fait le premier tri, puis on regarde qui ne passe pas le deuxième.`, `Après le premier tri : ${liste(r1)}. ${cap(parti.le)} ${crits[1].neg}.`, `C'est : ${parti.nom}.`),
  };
}

const triSuccessifs: TutorBankItemV4[] = [
  S(1, 1, "Fais les tris un par un, dans l'ordre.", () => quiReste(2, false)),
  S(2, 1, "Fais le premier tri. Puis le deuxième. Puis compte.", () => combienReste(false, false)),
  S(3, 1, "Essaie chaque critère sur la liste.", () => retrouver(false)),
  S(4, 2, "Compare la liste avant le tri et après le tri.", () => retrouverEtape(false)),
  S(5, 2, "Fais le premier tri. Qui ne passe pas le deuxième ?", () => elimine(false)),
  S(6, 2, "« Enlever » : ceux qui répondent oui s'en vont.", () => quiReste(2, false, true)),
  S(7, 3, "Fais les trois tris, un par un.", () => quiReste(3, true)),
  S(8, 3, "Compare la liste avant le tri et après le tri.", () => retrouverEtape(true)),
  S(9, 3, "« Enlever » : ceux qui répondent oui s'en vont.", () => combienReste(true, true)),
];

/* ═════════════════ tri_ensembles_intersection ═════════════════ */
const I = atelier("cm1", "trier_classer", "tri_ensembles_intersection");
const HINT_I = "L'intersection, c'est là où les cercles se croisent.";
const LETTRE = ["A", "B", "C"];

type Trois = { d: Domaine; cs: Critere[]; l: Objet[]; fig: CanvasFigure; autres: Objet[] };

/** Trois ensembles nommés A, B, C : les éléments se placent par leurs propriétés. */
function troisEnsembles(condition: (z: Trois) => boolean): Trois {
  return essayer(() => {
    const d = domaine();
    if (d.criteres.length < 3) return null;
    const cs = troisAuHasard(d.criteres);
    const l = repartir(d, cs, 8, 10, 2);
    const fig = figureEnsembles(l, cs, cs.map((k, i) => `${LETTRE[i]} : ${k.label}`));
    const z: Trois = { d, cs, l, fig, autres: melange(d.objets().filter((x) => !l.some((y) => y.nom === x.nom) && x.nom.length <= 10)) };
    // Les noms longs sont écartés : il pouvait ne rester que « grand rond, petit rond » dans trois cercles.
    return l.length >= 5 && tientSurLaFigure(fig) && condition(z) && z;
  });
}
const et =(x: Objet, ...ks: Critere[]) => ks.every((k) => sat(x, k));
/** Le nom court d'une zone : « A et B », « C seulement », « Dans aucun ». */
function zone(x: Objet, cs: Critere[]): string {
  const dans = cs.flatMap((k, i) => (sat(x, k) ? [LETTRE[i]] : []));
  if (dans.length === 0) return "Dans aucun";
  if (dans.length === 3) return "Dans A, B et C";
  if (dans.length === 2) return `Dans ${dans[0]} et ${dans[1]}`;
  return `Dans ${dans[0]} seulement`;
}
const ZONES = ["Dans A seulement", "Dans B seulement", "Dans C seulement", "Dans A et B", "Dans A et C", "Dans B et C", "Dans A, B et C", "Dans aucun"];
const lis = ["Regarde le dessin.", "Lis le dessin.", "Observe les ensembles.", ""];

function quiDansDeux() {
  const [i, j] = deuxAuHasard([0, 1, 2]).sort() as [number, number];
  const z = troisEnsembles((y) => y.l.filter((x) => et(x, y.cs[i], y.cs[j])).length === 1 && y.l.length >= 5);
  const juste = z.l.find((x) => et(x, z.cs[i], z.cs[j]))!;
  return {
    text: tournure(lis, [`Qui est dans ${LETTRE[i]} et dans ${LETTRE[j]} ?`, `Qui est à la fois dans ${LETTRE[i]} et dans ${LETTRE[j]} ?`, `Trouve l'élément commun à ${LETTRE[i]} et à ${LETTRE[j]}.`, `Qui ${z.cs[i].label} et ${z.cs[j].label} ?`]),
    ...qcm(juste.nom, z.l.filter((x) => x !== juste).map((x) => x.nom)),
    canvas: z.fig,
    explanation: etapes(`on regarde là où les deux cercles se croisent.`, `${cap(juste.le)} ${z.cs[i].label}, et ${z.cs[j].label}.`, `La réponse est : ${juste.nom}.`),
  };
}

function combienDansUn() {
  const i = entre(0, 2);
  const z = troisEnsembles((y) => garde(y.l, y.cs[i]).length >= 2);
  const n = garde(z.l, z.cs[i]).length;
  return {
    text: un([`Combien sont dans ${LETTRE[i]} ?`, `Combien d'éléments dans ${LETTRE[i]} ?`, `Combien ${z.cs[i].pl} ?`, `Sur le dessin, combien ${z.cs[i].pl} ?`, `Dans le cercle ${LETTRE[i]}, il y en a combien ?`]),
    ...qcmN(n, [n + 1, n - 1, z.l.length, n + 2]),
    canvas: z.fig,
    explanation: etapes(`on compte tout le cercle ${LETTRE[i]}, avec ses intersections.`, `Dans ${LETTRE[i]} : ${liste(garde(z.l, z.cs[i]))}.`, `Il y en a ${n}.`),
  };
}

function dansLesTrois() {
  const z = troisEnsembles((y) => y.l.filter((x) => et(x, ...y.cs)).length === 1);
  const juste = z.l.find((x) => et(x, ...z.cs))!;
  return {
    text: tournure(lis, [`Qui est dans les trois ensembles ?`, `Qui est dans A, dans B et dans C ?`, `Qui est au centre du dessin ?`, `Trouve l'élément commun à A, B et C.`]),
    ...qcm(juste.nom, z.l.filter((x) => x !== juste).map((x) => x.nom)),
    canvas: z.fig,
    explanation: etapes(`on regarde au centre, là où les trois cercles se croisent.`, `${cap(juste.le)} ${z.cs[0].label}, ${z.cs[1].label}, et ${z.cs[2].label}.`, `La réponse est : ${juste.nom}.`),
  };
}

function deuxMaisPasTrois() {
  const [i, j, k] = melange([0, 1, 2]);
  const [p, r] = i < j ? [i, j] : [j, i];
  const z = troisEnsembles((y) => y.l.filter((x) => et(x, y.cs[p], y.cs[r]) && !sat(x, y.cs[k])).length === 1 && y.l.length >= 5);
  const juste = z.l.find((x) => et(x, z.cs[p], z.cs[r]) && !sat(x, z.cs[k]))!;
  return {
    text: tournure(lis, [`Qui est dans ${LETTRE[p]} et ${LETTRE[r]}, mais pas dans ${LETTRE[k]} ?`, `Qui est dans ${LETTRE[p]} et dans ${LETTRE[r]}, sans être dans ${LETTRE[k]} ?`, `Trouve l'élément de ${LETTRE[p]} et ${LETTRE[r]} qui n'est pas dans ${LETTRE[k]}.`]),
    ...qcm(juste.nom, z.l.filter((x) => x !== juste).map((x) => x.nom)),
    canvas: z.fig,
    explanation: etapes(`on regarde l'intersection de ${LETTRE[p]} et ${LETTRE[r]}, hors de ${LETTRE[k]}.`, `${cap(juste.le)} ${z.cs[p].label}, ${z.cs[r].label}, et ${z.cs[k].neg}.`, `La réponse est : ${juste.nom}.`),
  };
}

function combienIntersection(ctx: boolean) {
  const [i, j] = deuxAuHasard([0, 1, 2]).sort() as [number, number];
  const z = troisEnsembles((y) => y.l.filter((x) => et(x, y.cs[i], y.cs[j])).length >= 1);
  const n = z.l.filter((x) => et(x, z.cs[i], z.cs[j])).length;
  return {
    text: (ctx ? `${contexte(z.d)} ` : "") + un([`Combien sont dans ${LETTRE[i]} et dans ${LETTRE[j]} ?`, `Combien ${z.cs[i].pl} et ${z.cs[j].pl} ?`, `Dans l'intersection de ${LETTRE[i]} et ${LETTRE[j]}, il y en a combien ?`, `Combien sont à la fois dans ${LETTRE[i]} et dans ${LETTRE[j]} ?`]),
    ...qcmN(n, [n + 1, garde(z.l, z.cs[i]).length, garde(z.l, z.cs[j]).length, z.l.length]),
    canvas: z.fig,
    explanation: etapes(`on compte là où ${LETTRE[i]} et ${LETTRE[j]} se croisent, le centre aussi.`, `Dans les deux : ${liste(z.l.filter((x) => et(x, z.cs[i], z.cs[j])))}.`, `Il y en a ${n}.`),
  };
}

function ouVa(ctx: boolean) {
  const z = troisEnsembles((y) => y.autres.length > 0);
  const x = un(z.autres);
  const juste = zone(x, z.cs);
  return {
    text: (ctx ? `${contexte(z.d)} ` : "") + un([`Où va ${x.le} ?`, `Où placer ${x.le} ?`, `Où ranger ${x.le} ?`, `On ajoute ${x.le}. Dans quelle zone ?`]),
    ...qcm(juste, ZONES),
    canvas: z.fig,
    explanation: etapes(`on pose les trois questions.`, z.cs.map((k) => `${cap(x.le)} ${sat(x, k) ? k.label : k.neg}.`).join(" "), `La réponse : ${juste}.`),
  };
}

/* Les effectifs : chaque nombre dit combien d'enfants sont dans cette zone. */
const ACTIVITES: [string, string][] = [["football", "du football"], ["musique", "de la musique"], ["danse", "de la danse"], ["judo", "du judo"], ["théâtre", "du théâtre"], ["dessin", "du dessin"], ["natation", "de la natation"], ["chant", "du chant"], ["lecture", "de la lecture"], ["échecs", "des échecs"], ["cuisine", "de la cuisine"], ["robotique", "de la robotique"], ["jardinage", "du jardinage"], ["basket", "du basket"]];
const GENS: [string, string][] = [["enfants", "d'enfants"], ["élèves", "d'élèves"], ["jeunes", "de jeunes"], ["membres", "de membres"], ["inscrits", "d'inscrits"], ["participants", "de participants"]];
const LIEUX = ["Dans un club, on choisit ses activités.", "Une animatrice note les activités.", "Une enquête porte sur les activités.", "La directrice compte les groupes.", "Un centre de loisirs fait ses groupes.", "Un entraîneur prépare les groupes."];
const REGIONS: number[][] = [[0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2]];

function effectifs(question: "tout_a" | "a_et_b" | "seul_a" | "total") {
  const act = melange([...ACTIVITES]).slice(0, 3);
  const noms = act.map((x) => x[0]);
  const fait = act.map((x) => x[1]);
  const valeurs = REGIONS.map((r) => (r.length === 1 ? entre(2, 12) : entre(1, 6)));
  const dans = (i: number) => REGIONS.flatMap((r, k) => (r.includes(i) ? [valeurs[k]] : []));
  const fig: CanvasFigure = { kind: "ensembles", ensembles: noms, elements: REGIONS.map((r, k) => ({ nom: String(valeurs[k]), dans: r })) };
  const [gens, deGens] = un(GENS);
  const [i, j] = melange([0, 1, 2]);
  const total = valeurs.reduce((s, v) => s + v, 0);
  const intro = `${un(LIEUX)} ${un([`Chaque nombre dit combien ${deGens} sont dans cette zone.`, `Le dessin donne le nombre ${deGens} par zone.`, `Dans chaque zone : le nombre ${deGens}.`])}`;
  if (question === "tout_a") {
    const n = dans(i).reduce((s, v) => s + v, 0);
    return { text: `${intro} Combien ${deGens} font ${fait[i]} en tout ?`, ...qcmN(n, [valeurs[i], n + 2, total, n - 1]), canvas: fig, explanation: etapes(`on additionne toutes les zones du cercle « ${noms[i]} ».`, `${dans(i).join(" + ")} = ${n}.`, `${n} ${gens} font ${fait[i]}.`) };
  }
  if (question === "a_et_b") {
    const [p, r] = i < j ? [i, j] : [j, i];
    const l = REGIONS.flatMap((x, k) => (x.includes(p) && x.includes(r) ? [valeurs[k]] : []));
    const n = l.reduce((s, v) => s + v, 0);
    return { text: `${intro} Combien ${deGens} font ${fait[p]} et ${fait[r]} ?`, ...qcmN(n, [l[0], n + 2, dans(p).reduce((s, v) => s + v, 0), n + 1]), canvas: fig, explanation: etapes(`on additionne ce qui est dans les deux cercles, le centre aussi.`, `${l.join(" + ")} = ${n}.`, `${n} ${gens} font les deux.`) };
  }
  if (question === "seul_a") {
    const n = valeurs[i];
    return { text: `${intro} Combien ${deGens} font seulement ${fait[i]} ?`, ...qcmN(n, [dans(i).reduce((s, v) => s + v, 0), n + 1, n + 2, total]), canvas: fig, explanation: etapes(`on lit la zone où il n'y a que ce cercle.`, `Seulement ${noms[i]} : ${n}.`, `${n} ${gens}.`) };
  }
  return { text: `${intro} Combien ${deGens} en tout ?`, ...qcmN(total, [total - valeurs[6], total + valeurs[6], total - 1, total + 2]), canvas: fig, explanation: etapes(`on additionne chaque zone une seule fois.`, `${valeurs.join(" + ")} = ${total}.`, `${total} ${gens}.`) };
}

const triIntersection: TutorBankItemV4[] = [
  I(1, 1, HINT_I, () => quiDansDeux()),
  I(2, 1, "Compte tout le cercle, ses intersections aussi.", () => combienDansUn()),
  I(3, 1, "Au centre : dans les trois cercles à la fois.", () => dansLesTrois()),
  I(4, 2, "Regarde où deux cercles se croisent, hors du troisième.", () => deuxMaisPasTrois()),
  I(5, 2, HINT_I, () => combienIntersection(false)),
  I(6, 2, "Pose les trois questions : oui ou non ?", () => ouVa(false)),
  I(7, 3, "Pose les trois questions : oui ou non ?", () => ouVa(true)),
  I(8, 3, "Additionne toutes les zones du cercle.", () => effectifs("tout_a")),
  I(9, 3, "Additionne les zones communes aux deux cercles.", () => effectifs("a_et_b")),
  I(10, 3, "Une seule zone : celle où il n'y a que ce cercle.", () => effectifs("seul_a")),
  I(11, 3, "Additionne chaque zone une seule fois.", () => effectifs("total")),
];

/* ═════════════════ tri_arbre ═════════════════ */
const A = atelier("cm1", "trier_classer", "tri_arbre");
const CASES = ["Case A", "Case B", "Case C", "Case D"];

function tirerArbre(forme: "equilibre" | "peigne"): ArbreTire & { d: Domaine } {
  return essayer(() => {
    const d = domaine();
    const t = forme === "equilibre" ? arbreEquilibre(d) : arbrePeigne(d);
    return t && { ...t, d };
  });
}
const enCases = (r: Noeud) => changerFeuilles(r, (_, i) => CASES[i]);
const dessin = (racine: Noeud): CanvasFigure => ({ kind: "arbre_tri", racine });

/** Les questions vraiment posées à cet objet, avec ses réponses. */
const trajet = (t: ArbreTire, x: Objet) =>
  t.criteres
    .slice(0, suivre(t.racine, x)!.questions)
    .map((k) => `${cap(x.le)} ${sat(x, k) ? k.label : k.neg}.`)
    .join(" ");

function suivreArbre(forme: "equilibre" | "peigne", ctx: boolean) {
  const t = tirerArbre(forme);
  const x = un(t.objets);
  const racine = enCases(t.racine);
  const juste = suivre(racine, x)!.feuille;
  return {
    text: (ctx ? `${contexte(t.d)} ` : "") + tournure(["Suis l'arbre.", "Lis l'arbre.", "Regarde l'arbre.", ""], [`Où va ${x.le} ?`, `Où arrive ${x.le} ?`, `Dans quelle case va ${x.le} ?`, `Où ranger ${x.le} ?`]),
    ...qcm(juste, CASES),
    canvas: dessin(racine),
    explanation: etapes(`on répond à chaque question, de haut en bas.`, trajet(t, x), `${cap(x.le)} va en ${juste}.`),
  };
}

function lireFeuille() {
  const t = tirerArbre("equilibre");
  const [a, b] = t.criteres;
  const i = entre(0, 3);
  const x = t.objets[i];
  const pa = i < 2 ? a.label : a.neg;
  const pb = i % 2 === 0 ? b.label : b.neg;
  return {
    text: tournure(["Lis l'arbre.", "Suis les branches.", "Regarde l'arbre.", ""], [`${t.d.quel} ${pa} et ${pb} ?`, `Qui ${pa} et ${pb} ?`, `Trouve celui qui ${pa} et ${pb}.`]),
    ...qcm(x.nom, t.objets.filter((y) => y !== x).map((y) => y.nom)),
    canvas: dessin(t.racine),
    explanation: etapes(`on suit la branche de chaque réponse.`, `${cap(a.label)} ? ${i < 2 ? "oui" : "non"}. ${cap(b.label)} ? ${i % 2 === 0 ? "oui" : "non"}.`, `On arrive à : ${x.nom}.`),
  };
}

/** Une feuille est cachée : quel objet y arrive ? Les faux arrivent ailleurs. */
function completerFeuille(forme: "equilibre" | "peigne", ctx: boolean) {
  const t = tirerArbre(forme);
  const i = entre(0, 3);
  const x = t.objets[i];
  const racine = changerFeuilles(t.racine, (f, k) => (k === i ? "?" : f));
  return {
    text: (ctx ? `${contexte(t.d)} ` : "") + tournure(["Complète l'arbre.", "Une case est vide.", "Regarde l'arbre.", ""], [`Qui va à la place du « ? » ?`, `Que mettre à la place du « ? » ?`, `Qui arrive au « ? » ?`, `Qui ranger dans la case « ? » ?`]),
    ...qcm(x.nom, t.objets.filter((y) => y !== x).map((y) => y.nom)),
    canvas: dessin(racine),
    explanation: etapes(`on remonte les branches jusqu'au « ? ».`, trajet(t, x), `Au « ? » : ${x.nom}.`),
  };
}

/** Une question est cachée : celle qui sépare les feuilles de ses deux branches. */
function completerQuestion() {
  const { t, juste, faux, racine } = essayer(() => {
    const t = tirerArbre("equilibre");
    const r = t.racine as { question: string; oui: Noeud; non: Noeud };
    const separe = (m: Critere) => t.objets.slice(0, 2).every((x) => sat(x, m)) && t.objets.slice(2).every((x) => !sat(x, m));
    const faux = t.d.criteres.filter((m) => !separe(m));
    const justes = t.d.criteres.filter(separe);
    return justes.length === 1 && faux.length >= 2 && { t, juste: justes[0], faux, racine: { question: "?", oui: r.oui, non: r.non } as Noeud };
  });
  return {
    text: tournure(["Complète l'arbre.", "Regarde l'arbre.", "Lis les branches.", ""], [`Quelle question manque en haut ?`, `Quelle est la question du haut ?`, `Que demande-t-on au « ? » ?`, `Quelle question mettre à la place du « ? » ?`]),
    ...qcm(questionDe(juste), faux.map(questionDe)),
    canvas: dessin(racine),
    explanation: etapes(`on compare les deux côtés de l'arbre.`, `À gauche : ${liste(t.objets.slice(0, 2))}. À droite : ${liste(t.objets.slice(2))}.`, `La question : ${questionDe(juste)}`),
  };
}

function nombreDeQuestions() {
  const t = tirerArbre("peigne");
  const x = un(t.objets);
  const n = suivre(t.racine, x)!.questions;
  const nom = changerFeuilles(t.racine, (_, i) => CASES[i]);
  return {
    text: `${contexte(t.d)} ${un([`Combien de questions pour ranger ${x.le} ?`, `Il faut combien de questions pour ranger ${x.le} ?`, `Pour ${x.le}, on répond à combien de questions ?`])}`,
    ...qcm(`${n} question${n > 1 ? "s" : ""}`, ["1 question", "2 questions", "3 questions", "4 questions"]),
    canvas: dessin(nom),
    explanation: etapes(`on suit ${x.le} et on compte les questions.`, trajet(t, x), `Il faut ${n} question${n > 1 ? "s" : ""}.`),
  };
}

const triArbre: TutorBankItemV4[] = [
  A(1, 1, "Commence en haut. Oui à gauche, non à droite.", () => suivreArbre("equilibre", false)),
  A(2, 1, "Suis la branche de chaque réponse.", () => lireFeuille()),
  A(3, 1, "Remonte les branches jusqu'au « ? ».", () => completerFeuille("equilibre", false)),
  A(4, 2, "Commence en haut. Oui à gauche, non à droite.", () => suivreArbre("peigne", false)),
  A(5, 2, "Remonte les branches jusqu'au « ? ».", () => completerFeuille("peigne", false)),
  A(6, 2, "Qu'ont en commun ceux de gauche ? Ceux de droite ne l'ont pas.", () => completerQuestion()),
  A(7, 3, "Commence en haut. Oui à gauche, non à droite.", () => suivreArbre("peigne", true)),
  A(8, 3, "Remonte les branches jusqu'au « ? ».", () => completerFeuille("peigne", true)),
  A(9, 3, "Suis le chemin et compte les questions.", () => nombreDeQuestions()),
];

export const trierClasserBank: TutorBankItemV4[] = [...triSuccessifs, ...triIntersection, ...triArbre];
