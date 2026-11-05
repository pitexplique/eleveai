// PROBLÈMES DE RECHERCHE ET MOTIFS (05/11/2026). Trous du programme de CM2 :
// cm2-N-problemes-5 (dénombrer), -6 (optimiser), -7 (toutes les solutions),
// cm2-N-algebre-6 (motif : l'étape lointaine sans tout dessiner).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, exp, gabarits, melange, qcm, qcmN, un, v } from "./trous-outils";

/* ───────────────────────── probleme_denombrement ───────────────────────── */
const de = gabarits("probleme_denombrement", "probleme", ["denombrer"]);
const expProduit = (a: number, b: number, c?: number) => {
  const t = c ? a * b * c : a * b;
  return exp(
    "on compte toutes les façons de faire un choix, puis un autre.",
    `pour chaque premier choix, il y a les mêmes choix ensuite : on multiplie, on n'ajoute pas.`,
    c ? `${a} × ${b} × ${c} = ${t}.` : `${a} × ${b} = ${t}.`,
    `il y a ${t} possibilités.`,
  );
};
const fauxP = (a: number, b: number, c = 1) => {
  const t = a * b * c;
  return [a + b + (c > 1 ? c : 0), t + 1, t - 1, t + a, a * b, t * 2, t + 2].filter((f) => f !== t && f > 0);
};
const COMBIEN = ["Combien de possibilités ?", "Combien de choix différents ?", "Combien de façons différentes ?", "Combien de possibilités en tout ?", "Combien cela fait-il de choix ?"];
const P = (d: number) => entre(2, d);
const LETTRES = ["A", "B", "C", "D", "E"];
const couples = [["chapeaux", "pulls"], ["pantalons", "t-shirts"], ["jupes", "vestes"], ["shorts", "maillots"], ["casquettes", "sacs"], ["robes", "foulards"]];
const triples = [["chapeaux", "pulls", "pantalons"], ["casquettes", "t-shirts", "shorts"], ["vestes", "jupes", "écharpes"], ["sacs", "gourdes", "cartes"], ["bonnets", "gants", "manteaux"]];
const couleurs = (n: number) => melange(["rouge", "bleu", "vert", "jaune", "noir", "gris"]).slice(0, n);
const probleme_denombrement: TutorBankItemV4[] = [
  de(1, "Pour chaque pantalon, compte toutes les tenues. Puis multiplie.", () => {
    const [x, y] = un(couples);
    const a = P(5);
    const b = P(6);
    return qcmN(a * b, fauxP(a, b), expProduit(a, b), `${v(["On a", "Il y a", "Voici"])} ${a} ${x} et ${b} ${y}. ${v(["On prend un objet de chaque sorte.", "On choisit un objet de chaque sorte.", "On garde un objet de chaque sorte."])} ${v(COMBIEN)}`);
  }),
  de(1, "Chaque ligne est un premier choix, chaque colonne un deuxième : compte les cases.", () => {
    const a = P(4);
    const b = P(5);
    const lignes = LETTRES.slice(0, a);
    const cols = Array.from({ length: b }, (_, i) => String(i + 1));
    const figure: CanvasFigure = { kind: "tableau_donnees", title: "Les codes", headers: ["Lettre", ...cols], rows: lignes.map((l) => ({ values: [l, ...cols.map(() => "")] })), display: { compact: true } };
    return qcmN(a * b, fauxP(a, b), expProduit(a, b), v(["Un code est fait d'une lettre et d'un chiffre.", "Chaque case du tableau est un code : une lettre, puis un chiffre.", "Une case de ce tableau donne un code différent."], ["Combien de codes différents ?", "Combien de codes en tout ?", "Combien de codes possibles ?", "Combien de cases à remplir ?", "Combien de codes peut-on faire ?"]), figure);
  }),
  de(1, "Une lettre, puis un chiffre : multiplie.", () => {
    const a = P(5);
    const b = P(5);
    const l = LETTRES.slice(0, a);
    const c = melange([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, b).sort((x, y) => x - y);
    return qcmN(a * b, fauxP(a, b), expProduit(a, b), `${v(["Un code a une lettre et un chiffre.", "Un code : une lettre, puis un chiffre.", "On écrit un code avec une lettre et un chiffre."])} Lettres : ${l.join(", ")}. Chiffres : ${c.join(", ")}. ${v(["Combien de codes différents ?", "Combien de codes en tout ?", "Combien de codes possibles ?", "Combien de codes peut-on faire ?"])}`);
  }),
  de(2, "Trois choix : multiplie les trois nombres.", () => {
    const [x, y, z] = un(triples);
    const a = P(3);
    const b = P(4);
    const c = P(3);
    return qcmN(a * b * c, fauxP(a, b, c), expProduit(a, b, c), `${v(["On a", "Il y a", "Voici"])} ${a} ${x}, ${b} ${y} et ${c} ${z}. ${v(["On prend un objet de chaque sorte.", "On choisit un objet de chaque sorte.", "On garde un objet de chaque sorte."])} ${v(COMBIEN)}`);
  }),
  de(2, "Pour le premier chiffre, tous sont possibles. Pour le deuxième, un de moins.", () => {
    const n = entre(3, 5);
    const c = melange([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, n).sort((x, y) => x - y);
    const t = n * (n - 1);
    return qcmN(t, [n * n, n, n + n - 1, t + 1, t - 1, n + 1].filter((f) => f !== t), exp("un nombre à deux chiffres s'écrit avec un chiffre des dizaines et un chiffre des unités.", "on choisit les dizaines, puis les unités parmi les chiffres restants.", `${n} × ${n - 1} = ${t}.`, `on peut écrire ${t} nombres.`), `${v(["On a les chiffres", "Voici les chiffres", "On prend les chiffres"])} ${c.join(", ")}. ${v(["Avec deux chiffres différents,", "Sans répéter un chiffre,", "Sans utiliser deux fois le même chiffre,"])} ${v(["combien de nombres à deux chiffres peut-on écrire ?", "combien de nombres à deux chiffres existe-t-il ?", "combien de nombres à deux chiffres trouve-t-on ?"])}`);
  }),
  de(2, "Ici un chiffre peut se répéter : le même nombre de choix à chaque place.", () => {
    const n = entre(2, 5);
    const c = melange([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, n).sort((x, y) => x - y);
    const t = n * n;
    return qcmN(t, [n * (n - 1), n + n, t + 1, t - 1, n, t + n].filter((f) => f !== t), exp("un nombre à deux chiffres s'écrit avec un chiffre des dizaines et un chiffre des unités.", "le même chiffre peut revenir : il y a autant de choix aux dizaines et aux unités.", `${n} × ${n} = ${t}.`, `on peut écrire ${t} nombres.`), `${v(["On a les chiffres", "Voici les chiffres", "On prend les chiffres"])} ${c.join(", ")}. ${v(["On peut répéter un chiffre.", "Un chiffre peut revenir deux fois.", "Le même chiffre peut servir deux fois."])} ${v(["Combien de nombres à deux chiffres peut-on écrire ?", "Combien de nombres à deux chiffres existe-t-il ?", "Combien de nombres à deux chiffres trouve-t-on ?"])}`);
  }),
  de(3, "Pour chaque premier choix, il y a tous les autres : multiplie.", () => {
    const a = entre(2, 6);
    const b = entre(2, 6);
    const C = un([
      `Un restaurant propose ${a} entrées et ${b} plats. Combien de menus différents avec une entrée et un plat ?`, `Un glacier a ${a} sortes de cornets et ${b} parfums. Combien de glaces différentes à un parfum ?`, `Un vélo existe en ${a} couleurs et ${b} tailles. Combien de modèles différents ?`,
      `Une équipe a ${a} gardiens et ${b} capitaines possibles. Combien de duos différents ?`, `Une pièce de théâtre a ${a} décors et ${b} costumes pour le héros. Combien de mises en scène différentes ?`, `Un programmeur teste ${a} fonds d'écran et ${b} musiques. Combien de versions du jeu ?`,
      `Un fleuriste a ${a} sortes de vases et ${b} sortes de fleurs. Combien de bouquets différents, avec un vase et une sorte de fleurs ?`, `Une marque de sport fait ${a} modèles de chaussures et ${b} coloris. Combien de chaussures différentes ?`, `Une boulangère prépare ${a} sortes de pains et ${b} garnitures. Combien de sandwichs différents, avec un pain et une garniture ?`, `Une musicienne choisit ${a} instruments et ${b} morceaux. Combien de choix différents d'un instrument et d'un morceau ?`,
    ]);
    return qcmN(a * b, fauxP(a, b), expProduit(a, b), `${v(["", "Réfléchis bien.", "Fais un petit schéma.", "Prends ton temps."])} ${C}`.trim());
  }),
  de(3, "Trois choix de suite : multiplie les trois nombres.", () => {
    const a = entre(2, 4);
    const b = entre(2, 4);
    const c = entre(2, 3);
    const C = un([
      `Un menu a ${a} entrées, ${b} plats et ${c} desserts. Combien de menus différents ?`, `Un personnage de jeu peut porter ${a} chapeaux, ${b} tenues ou ${c} sacs à dos, un de chaque sorte. Combien de personnages différents ?`, `Une voiture existe en ${a} couleurs, ${b} moteurs et ${c} intérieurs. Combien de modèles ?`,
      `Un robot se fabrique avec une tête parmi ${a}, un corps parmi ${b} et des jambes parmi ${c}. Combien de robots différents ?`, `Un sac existe en ${a} formes, ${b} couleurs et ${c} tailles. Combien de sacs différents ?`, `Une pizza se choisit parmi ${a} pâtes, ${b} sauces et ${c} fromages. Combien de pizzas différentes ?`, `Un voyage se choisit parmi ${a} départs, ${b} escales et ${c} arrivées. Combien de vols différents ?`, `Une affiche se choisit parmi ${a} images, ${b} titres et ${c} couleurs. Combien d'affiches différentes ?`,
    ]);
    return qcmN(a * b * c, fauxP(a, b, c), expProduit(a, b, c), `${v(["", "Réfléchis bien.", "Fais un petit schéma.", "Prends ton temps."])} ${C}`.trim());
  }),
  de(3, "Un chemin = une route, puis une autre : multiplie.", () => {
    const a = entre(2, 5);
    const b = entre(2, 5);
    const [X, Y, Z] = un([["la maison", "la gare", "le stade"], ["le port", "le village", "la plage"], ["l'école", "le parc", "la piscine"], ["le camping", "le pont", "le lac"], ["le marché", "la place", "le musée"], ["la ferme", "la forêt", "le sommet"], ["l'aéroport", "l'hôtel", "le centre-ville"], ["le refuge", "le col", "la cascade"]]);
    return qcmN(a * b, fauxP(a, b), expProduit(a, b), `Il y a ${a} routes entre ${X} et ${Y}, puis ${b} routes entre ${Y} et ${Z}. ${v(["Combien de chemins différents pour aller de", "Combien de trajets différents pour aller de", "Combien d'itinéraires différents pour aller de"])} ${X} à ${Z} ?`.replace(/à le /, "au ").replace(/de le /, "du "));
  }),
];

/* ───────────────────────── probleme_toutes_solutions ───────────────────────── */
const ts = gabarits("probleme_toutes_solutions", "probleme", ["recherche"]);
const AVEC_DIV = [6, 8, 10, 12, 14, 15, 16, 18, 20, 21, 24, 28, 30, 32, 36, 40];
const paires = (n: number) => {
  const l: [number, number][] = [];
  for (let a = 1; a * a <= n; a++) if (n % a === 0) l.push([a, n / a]);
  return l;
};
const expRect = (n: number) => {
  const l = paires(n);
  return exp(`l'aire d'un rectangle à côtés entiers, c'est longueur × largeur.`, "on essaie 1, puis 2, puis 3… sans oublier de cas, jusqu'à ce que les côtés se croisent.", l.map(([a, b]) => `${a} × ${b}`).join(" ; ") + ".", `il y a ${l.length} solutions.`);
};
/** Les solutions de a × p + b × q = N (a, b ≥ 0). */
const solBoites = (N: number, p: number, q: number) => {
  const l: [number, number][] = [];
  for (let a = 0; a * p <= N; a++) if ((N - a * p) % q === 0) l.push([a, (N - a * p) / q]);
  return l;
};
const expBoites = (N: number, p: number, q: number) => {
  const l = solBoites(N, p, q);
  return exp("on cherche toutes les façons d'obtenir le total exact.", `on essaie 0 boîte de ${p}, puis 1, puis 2… et on regarde si le reste se fait avec des boîtes de ${q}.`, l.map(([a, b]) => `${a} × ${p} + ${b} × ${q} = ${N}`).join(" ; ") + ".", l.length > 1 ? `il y a ${l.length} solutions.` : `il y a 1 solution.`);
};
/** Tirage : au moins une solution. */
const tireBoites = (mini = 1): { N: number; p: number; q: number } => {
  for (;;) {
    const [p, q] = un([[6, 10], [4, 6], [2, 5], [3, 5], [4, 10], [2, 7], [3, 4], [5, 8]]);
    const N = entre(12, 60);
    if (solBoites(N, p, q).length >= mini) return { N, p, q };
  }
};
const FACONS = ["Combien de solutions y a-t-il ?", "Combien de façons différentes ?", "Combien de solutions trouve-t-on ?", "Combien de solutions en tout ?", "Combien de possibilités ?"];
const fauxN = (t: number) => [t + 1, t + 2, t - 1, t + 3, t - 2, t * 2].filter((f) => f !== t && f >= 0);
const probleme_toutes_solutions: TutorBankItemV4[] = [
  ts(1, "Commence par 1 et 7, puis 2 et 6… Arrête quand les nombres se croisent.", () => {
    const n = entre(5, 16);
    const t = Math.floor(n / 2);
    const l = Array.from({ length: t }, (_, i) => `${i + 1} + ${n - i - 1}`);
    return qcmN(t, fauxN(t), exp("on cherche toutes les sommes de deux nombres entiers qui donnent le total.", "on essaie le plus petit nombre possible, puis le suivant.", l.join(" ; ") + ".", `il y a ${t} façons.`), `${v(["On écrit", "On veut écrire", "On cherche à écrire"])} ${n} ${v(["comme une somme de deux nombres sans zéro.", "comme la somme de deux entiers sans zéro."])} ${v(["L'ordre ne compte pas.", "Peu importe l'ordre.", "On ne change pas l'ordre pour compter."])} ${v(FACONS)}`);
  }),
  ts(1, "Calcule chaque produit proposé.", () => {
    const n = un(AVEC_DIV);
    const [a, b] = un(paires(n).filter(([x]) => x > 1).concat(paires(n).slice(0, 1)));
    const faux = (x: number, y: number) => `${x} × ${y}`;
    const l = [faux(a + 1, b), faux(a, b + 1), faux(a + 1, b + 1), faux(a + 2, b), faux(a, b + 2)].filter((c) => { const [x, y] = c.split(" × ").map(Number); return x * y !== n; });
    return qcm(faux(a, b), l, expRect(n), v(["", "Calcule chaque produit.", "Vérifie chaque calcul.", "Un seul convient."], [`Quel calcul donne ${n} ?`, `Lequel de ces produits vaut ${n} ?`, `Quel produit est égal à ${n} ?`, `Lequel donne ${n} ?`, `Choisis un produit égal à ${n}.`]));
  }),
  ts(1, "Cherche toutes les paires de nombres dont le produit est l'aire.", () => {
    const n = un(AVEC_DIV);
    const t = paires(n).length;
    return qcmN(t, fauxN(t), expRect(n), `${v(["Un rectangle a une aire de", "On dessine un rectangle d'aire", "On veut un rectangle de"])} ${n} cm². ${v(["Ses côtés sont des nombres entiers de cm.", "Ses côtés mesurent un nombre entier de cm."])} ${v(["Combien de rectangles différents ?", "Combien de formes de rectangles ?", "Combien de rectangles possibles ?"])}`);
  }),
  ts(2, "Calcule le total de chaque proposition.", () => {
    const { N, p, q } = tireBoites();
    const [a, b] = un(solBoites(N, p, q));
    const bo = (k: number) => (k > 1 ? "boîtes" : "boîte");
    const s = (x: number, y: number) => `${x} ${bo(x)} de ${p} et ${y} ${bo(y)} de ${q}`;
    const ok = (x: number, y: number) => x * p + y * q !== N;
    const l = [[a + 1, b], [a, b + 1], [Math.max(0, a - 1), b + 1], [a + 1, Math.max(0, b - 1)], [a + 2, b], [b, a]].filter(([x, y]) => ok(x, y)).map(([x, y]) => s(x, y));
    return qcm(s(a, b), l, expBoites(N, p, q), `${v(["On veut", "Il faut", "On a besoin de"])} ${N} ${v(["objets", "unités", "pièces"])} ${v(["exactement.", "tout juste.", "pile."])} ${v(["Quelle solution marche ?", "Quelle solution convient ?", "Laquelle donne le bon total ?", "Quel choix est juste ?"])}`);
  }),
  ts(2, "Essaie 0 boîte, 1 boîte, 2 boîtes… de la première sorte.", () => {
    const { N, p, q } = tireBoites();
    const t = solBoites(N, p, q).length;
    return qcmN(t, fauxN(t), expBoites(N, p, q), `${v(["Des boîtes contiennent", "On a des boîtes de", "Il existe des boîtes de"])} ${p} ou ${q} objets. ${v(["On veut", "Il faut"])} ${N} objets, ${v(["toutes les boîtes pleines.", "sans boîte à moitié vide."])} ${v(["On peut prendre une seule sorte de boîtes.", "Une seule sorte peut suffire."])} ${v(FACONS)}`);
  }),
  ts(2, "Cherche le produit qui n'est pas encore dans la liste.", () => {
    let n = un(AVEC_DIV);
    while (paires(n).length < 3) n = un(AVEC_DIV);
    const l = paires(n);
    const manque = un(l);
    const vus = l.filter((x) => x !== manque).map(([a, b]) => `${a} × ${b}`);
    const f = [`${manque[0] + 1} × ${manque[1]}`, `${manque[0]} × ${manque[1] + 1}`, `${manque[0] + 1} × ${manque[1] + 1}`, `${manque[0] + 2} × ${manque[1]}`].filter((c) => { const [x, y] = c.split(" × ").map(Number); return x * y !== n; });
    return qcm(`${manque[0]} × ${manque[1]}`, f, expRect(n), `${v(["On cherche tous les produits égaux à", "Voici la recherche des produits égaux à", "On liste les produits égaux à"])} ${n}. ${v(["Déjà trouvés :", "Déjà écrits :", "On a :"])} ${vus.join(" ; ")}. ${v(["Lequel manque ?", "Quel produit manque ?", "Quel produit faut-il ajouter ?", "Quelle solution a-t-on oubliée ?"])}`);
  }),
  ts(3, "Essaie toutes les quantités de la première sorte.", () => {
    const { N, p, q } = tireBoites();
    const t = solBoites(N, p, q).length;
    const C = un([
      `Une boulangère range ${N} gâteaux dans des boîtes de ${p} ou de ${q}, toutes pleines`, `Un fermier place ${N} œufs dans des boîtes de ${p} ou de ${q}, toutes pleines`, `Un entraîneur répartit ${N} joueurs en équipes de ${p} ou de ${q}, sans personne à part`, `Un restaurant place ${N} clients à des tables de ${p} ou de ${q}, toutes pleines`,
      `On paie exactement ${N} € avec des billets de ${p} € ou de ${q} €`, `Un libraire range ${N} livres sur des étagères de ${p} ou de ${q}, toutes pleines`, `Un car de ${N} touristes se divise en groupes de ${p} ou de ${q}`, `Une pépiniériste plante ${N} arbres en rangées de ${p} ou de ${q}`, `Un musicien range ${N} partitions en classeurs de ${p} ou de ${q}, tous pleins`, `Une infirmière répartit ${N} doses dans des boîtes de ${p} ou de ${q}, toutes pleines`,
    ]);
    return qcmN(t, fauxN(t), expBoites(N, p, q), `${C}. Une seule sorte peut suffire. ${v(FACONS)}`);
  }),
  ts(3, "Liste tous les rectangles possibles, puis compte.", () => {
    const n = un(AVEC_DIV);
    const t = paires(n).length;
    const C = un([`Une école a ${n} tables carrées à placer en un seul rectangle plein`, `Un jardinier a ${n} dalles carrées à poser en un rectangle plein`, `Un carreleur a ${n} carreaux à poser en un rectangle plein`, `Un chef d'orchestre range ${n} musiciens en rangs égaux, formant un rectangle`, `Un professeur range ${n} élèves en rangs égaux, formant un rectangle`, `Une agricultrice plante ${n} pieds de vanille en rangs égaux, formant un rectangle`, `Une chorale de ${n} chanteurs se place en rangs égaux, formant un rectangle`, `Un artiste colle ${n} photos carrées en un rectangle plein`]);
    return qcmN(t, fauxN(t), expRect(n), `${C}. ${v(["Combien de rectangles différents ?", "Combien de formes possibles ?", "Combien de rectangles sont possibles ?"])}`);
  }),
  ts(3, "Le chiffre des dizaines ne vaut jamais 0.", () => {
    const s = entre(3, 12);
    const l: number[] = [];
    for (let d = 1; d <= 9; d++) for (let u = 0; u <= 9; u++) if (d + u === s) l.push(10 * d + u);
    const t = l.length;
    const O = un(["Le code d'un cadenas", "Le numéro d'un casier", "Le code d'un coffre", "Le numéro d'un dossard", "Le code d'une porte", "Le numéro d'une chambre", "La plaque d'un vélo", "Le code d'un jeu"]);
    return qcmN(t, fauxN(t), exp("on cherche tous les nombres à deux chiffres dont les chiffres ont cette somme.", "on essaie le chiffre des dizaines 1, puis 2, puis 3…", l.join(" ; ") + ".", `il y a ${t} nombres.`), `${O} ${v(["est un nombre à deux chiffres", "s'écrit avec un nombre à deux chiffres"])}, sans zéro devant. La somme de ses chiffres vaut ${s}. ${v(["Combien de nombres sont possibles ?", "Combien de possibilités ?", "Combien de nombres conviennent ?"])}`);
  }),
];

/* ───────────────────────── probleme_optimisation ───────────────────────── */
const op = gabarits("probleme_optimisation", "probleme", ["recherche"]);
const moinsDe = (N: number, p: number, q: number) => Math.min(...solBoites(N, p, q).map(([a, b]) => a + b));
const expMin = (N: number, p: number, q: number) => {
  const m = moinsDe(N, p, q);
  const s = solBoites(N, p, q).find(([a, b]) => a + b === m)!;
  return exp("on cherche la solution avec le moins de paquets.", `on prend le plus possible de paquets de ${Math.max(p, q)}, et on vérifie que le reste tombe juste.`, `${s[0]} × ${p} + ${s[1]} × ${q} = ${N}, soit ${s[0]} + ${s[1]} = ${m} paquets.`, `il faut au moins ${m} paquets.`);
};
const tireMin = () => {
  for (;;) {
    const [p, q] = un([[5, 2], [6, 4], [10, 3], [5, 3], [4, 3], [8, 5], [10, 4], [6, 5], [9, 2]]);
    const N = entre(10, 45);
    if (solBoites(N, p, q).length >= 2) return { N, p, q };
  }
};
const fauxMin = (N: number, p: number, q: number) => {
  const m = moinsDe(N, p, q);
  const tous = solBoites(N, p, q).map(([a, b]) => a + b);
  return [...tous, m + 1, m + 2, m + 3].filter((f) => f !== m);
};
const maxAire = (P_: number) => {
  let m = 0;
  for (let L = 1; L < P_ / 2; L++) m = Math.max(m, L * (P_ / 2 - L));
  return m;
};
const expAire = (P_: number, u: string) => {
  const s = P_ / 2;
  const l = Array.from({ length: Math.floor(s / 2) }, (_, i) => `${s - i - 1} × ${i + 1} = ${(s - i - 1) * (i + 1)}`);
  return exp(`longueur + largeur = la moitié du périmètre, soit ${s} ${u}.`, "on essaie tous les rectangles et on compare leurs aires.", l.join(" ; ") + ".", `la plus grande aire est ${maxAire(P_)} ${u}². Plus le rectangle ressemble à un carré, plus l'aire est grande.`);
};
const fauxAire = (P_: number) => {
  const m = maxAire(P_);
  const s = P_ / 2;
  return [(s - 1) * 1, (s - 2) * 2, P_, s, m - 1, m + 1, (s - 3) * 3].filter((f) => f !== m && f > 0);
};
const probleme_optimisation: TutorBankItemV4[] = [
  op(1, "Prends le plus possible de gros paquets, sans dépasser, et regarde si le reste tombe juste.", () => {
    const { N, p, q } = tireMin();
    const m = moinsDe(N, p, q);
    return qcmN(m, fauxMin(N, p, q), expMin(N, p, q), `${v(["Il y a des paquets de", "On a des paquets de", "On trouve des paquets de"])} ${p} et de ${q}. ${v(["On veut", "Il faut", "On cherche"])} ${N} objets ${v(["tout juste.", "exactement.", "pile."])} ${v(["Quel est le plus petit nombre de paquets ?", "Combien de paquets au minimum ?", "Combien de paquets, au moins ?", "Quel est le nombre minimum de paquets ?"])}`, undefined, "paquets");
  }),
  op(1, "Calcule le prix de la même quantité des deux façons.", () => {
    const k = un([3, 4, 5, 6, 10]);
    const u = entre(2, 6);
    const lot = k * u + un([-2, -1, 1, 2]);
    const moins = lot < k * u;
    const O = un(["cahiers", "balles", "stylos", "cartes", "gommes", "sachets", "biscuits", "crayons"]);
    return qcm(moins ? "Le lot" : "À l'unité", [moins ? "À l'unité" : "Le lot"], exp("on compare le prix de la même quantité.", `on calcule le prix de ${k} objets à l'unité.`, `${k} × ${u} = ${k * u} € ; le lot coûte ${lot} €.`, moins ? "le lot est moins cher." : "à l'unité, c'est moins cher."), `${v(["Un objet coûte", "À l'unité, le prix est", "Le prix d'un objet est"])} ${u} €. ${v(["Un lot de", "Le paquet de"])} ${k} ${O} coûte ${lot} €. ${v(["Quel est le moins cher ?", "Quel choix coûte le moins ?", "Que choisir pour payer le moins ?"])}`);
  }),
  op(1, "Divise, puis garde le nombre entier : on ne peut pas acheter un demi-objet.", () => {
    const u = entre(3, 9);
    const t = entre(20, 90);
    const m = Math.floor(t / u);
    return qcmN(m, [m + 1, m - 1, m + 2, t - u, u].filter((f) => f !== m && f > 0), exp("on cherche le plus grand nombre d'objets qu'on peut payer.", `on cherche combien de fois ${u} va dans ${t}.`, `${m} × ${u} = ${m * u} ; ${m + 1} × ${u} = ${(m + 1) * u}, c'est trop.`, `au plus ${m} objets.`), `${v(["On a", "Il reste", "Le budget est de"])} ${t} €. ${v(["Un objet coûte", "Le prix d'un objet est"])} ${u} €. ${v(["Combien d'objets au maximum ?", "Combien d'objets, au plus ?", "Quel est le plus grand nombre d'objets ?"])}`);
  }),
  op(2, "Essaie tous les rectangles : longueur + largeur = la moitié du périmètre.", () => {
    const P_ = 2 * entre(6, 20);
    return qcmN(maxAire(P_), fauxAire(P_), expAire(P_, "cm"), `${v(["Un rectangle a un périmètre de", "On dessine un rectangle de périmètre", "On veut un rectangle de périmètre"])} ${P_} cm. ${v(["Ses côtés sont des nombres entiers de cm.", "Ses côtés mesurent un nombre entier de cm."])} ${v(["Quelle est la plus grande aire possible ?", "Quelle aire peut-il avoir au maximum ?", "Quelle est son aire la plus grande ?"])}`, undefined, "cm²");
  }),
  op(2, "Calcule le prix de toute la quantité avec chaque offre.", () => {
    const [a, b] = un([[3, 5], [2, 3], [2, 5], [4, 5], [3, 4], [5, 6]]);
    const N = a * b * un([1, 2]);
    let pa = entre(2, 9);
    let pb = entre(2, 9) + 1;
    while ((N / a) * pa === (N / b) * pb) { pa = entre(2, 9); pb = entre(3, 10); }
    const ta = (N / a) * pa;
    const tb = (N / b) * pb;
    const m = Math.min(ta, tb);
    const [L1, L2] = un([["Un lot de", "Un autre lot de"], ["Une offre :", "Une autre offre :"], ["Un paquet de", "Un autre paquet de"]]);
    return qcmN(m, [Math.max(ta, tb), m + a, m - 1, m + b, m + 1].filter((f) => f > 0), exp("on calcule ce que coûte toute la quantité avec chaque offre.", "on compte le nombre de lots, puis on multiplie par le prix du lot.", `${N} ÷ ${a} = ${N / a} lots, ${N / a} × ${pa} = ${ta} € ; ${N} ÷ ${b} = ${N / b} lots, ${N / b} × ${pb} = ${tb} €.`, `la dépense la plus petite est ${m} €.`), `${L1} ${a} objets à ${pa} €. ${L2} ${b} objets à ${pb} €. ${v(["Il faut", "On veut", "On cherche"])} ${N} objets. ${v(["Quelle est la plus petite dépense ?", "Quelle somme paie-t-on au minimum, avec une seule offre ?", "Quel est le prix le plus bas, avec une seule offre ?"])}`, undefined, "€");
  }),
  op(2, "Prends d'abord le plus de grosses pièces possible.", () => {
    const N = entre(8, 39);
    const c5 = Math.floor(N / 5);
    const reste = N - 5 * c5;
    const c2 = Math.floor(reste / 2);
    const c1 = reste - 2 * c2;
    const m = c5 + c2 + c1;
    return qcmN(m, [m + 1, m + 2, m - 1, N, c5, m + 3].filter((f) => f !== m && f > 0), exp("on veut le moins de pièces possible.", "on prend le plus possible de pièces de 5 €, puis de 2 €, puis de 1 €.", `${c5} × 5 + ${c2} × 2 + ${c1} × 1 = ${N}.`, `il faut ${m} pièces.`), `${v(["On a des pièces de", "Il y a des pièces de", "On utilise des pièces de"])} 1 €, 2 € et 5 €. ${v(["On veut payer", "Il faut payer", "Le prix est"])} ${N} €. ${v(["Combien de pièces, au minimum ?", "Quel est le plus petit nombre de pièces ?", "Combien de pièces, au moins ?"])}`, undefined, "pièces");
  }),
  op(3, "Prends le plus possible de grands, et vérifie que le reste tombe juste.", () => {
    const { N, p, q } = tireMin();
    const m = moinsDe(N, p, q);
    const C = un([
      `Une boulangère range ${N} gâteaux dans des boîtes de ${p} ou de ${q}, toutes pleines. Combien de boîtes au minimum ?`, `Un déménageur transporte ${N} cartons par camions de ${p} ou de ${q}, tous pleins. Combien de camions au minimum ?`, `Un club emmène ${N} enfants en voitures de ${p} ou de ${q} places, toutes pleines. Combien de voitures au minimum ?`, `Une pâtissière dispose ${N} éclairs sur des plateaux de ${p} ou de ${q}, tous pleins. Combien de plateaux au minimum ?`,
      `On place ${N} invités à des tables de ${p} ou de ${q}, toutes pleines. Combien de tables au minimum ?`, `Une pêcheuse range ${N} poissons dans des caisses de ${p} ou de ${q}, toutes pleines. Combien de caisses au minimum ?`, `Un coursier livre ${N} colis par tournées de ${p} ou de ${q}, toutes pleines. Combien de tournées au minimum ?`, `Une technicienne range ${N} câbles dans des bacs de ${p} ou de ${q}, tous pleins. Combien de bacs au minimum ?`,
    ]);
    return qcmN(m, fauxMin(N, p, q), expMin(N, p, q), C);
  }),
  op(3, "Compare : tout à l'unité, un carnet et des tickets, ou plusieurs carnets.", () => {
    const u = un([2, 3]);
    const k = un([10, 5]);
    const c = k * u - un([2, 3, 4, 5]);
    const N = k * entre(1, 3) + entre(1, k - 1);
    let m = Infinity;
    for (let a = 0; a * k <= N + k; a++) m = Math.min(m, a * c + Math.max(0, N - a * k) * u);
    const O = un(["trajets de bus", "entrées à la piscine", "séances de cinéma", "voyages en tram", "tours de manège", "repas à la cantine", "entrées au musée", "cours de danse"]);
    return qcmN(m, [N * u, m + u, m + c, m - 1, m + 1].filter((f) => f > 0), exp("on cherche la façon de payer la moins chère.", "on compare les solutions avec 0, 1, 2… carnets.", `${N} × ${u} = ${N * u} € sans carnet. Le meilleur choix coûte ${m} €.`, `le prix le plus bas est ${m} €.`), `Une unité coûte ${u} €. Un carnet de ${k} coûte ${c} €. On veut ${N} ${O}. ${v(["Quel est le prix le plus bas ?", "Quelle est la plus petite dépense ?", "Combien paie-t-on au minimum ?"])}`, undefined, "€");
  }),
  op(3, "Essaie tous les rectangles avec ce périmètre.", () => {
    const P_ = 2 * entre(6, 25);
    const C = un([`Un éleveur a ${P_} m de grillage pour un enclos à poules`, `Une jardinière a ${P_} m de bordure pour un potager`, `Un fermier a ${P_} m de clôture pour ses chèvres`, `Une architecte dessine un jardin de ${P_} m de tour`, `Une école met ${P_} m de barrière autour d'un coin de cour`, `Un paysagiste pose ${P_} m de haie autour d'une pelouse`, `Un maçon construit ${P_} m de muret autour d'un bassin`, `Un organisateur tend ${P_} m de ruban autour d'une scène`]);
    return qcmN(maxAire(P_), fauxAire(P_), expAire(P_, "m"), `${C}. La forme est un rectangle, ses côtés sont des nombres entiers de mètres. ${v(["Quelle est la plus grande aire possible ?", "Quelle aire peut-on avoir au maximum ?", "Quelle est l'aire la plus grande ?"])}`, undefined, "m²");
  }),
];

/* ───────────────────────── algebre_motif_rang ───────────────────────── */
const mo = gabarits("algebre_motif_rang", "algebre", ["motif"]);
/** Les étapes 1, 2, 3 en petits carrés : colonnes de a carrés (a × n), plus b carrés à part. */
function dessinMotif(a: number, b: number): CanvasFigure {
  const filledCells: [number, number][] = [];
  const h = Math.max(a, b);
  let col = 0;
  for (let n = 1; n <= 3; n++) {
    for (let c = 0; c < n; c++, col++) for (let r = 0; r < a; r++) filledCells.push([h - 1 - r, col]);
    if (b > 0) { for (let r = 0; r < b; r++) filledCells.push([h - 1 - r, col]); col++; }
    col++; // une colonne vide entre deux étapes
  }
  return { kind: "figure_libre", size: { cellSize: 16 }, grid: { rows: h, cols: col - 1, filledCells }, display: { showGrid: false, showFilled: true } } as CanvasFigure;
}
const tireMotif = () => ({ a: entre(2, 5), b: entre(0, 3) });
const s = (a: number, b: number, n: number) => a * n + b;
const suite = (a: number, b: number) => `Étape 1 : ${s(a, b, 1)} carrés ; étape 2 : ${s(a, b, 2)} carrés ; étape 3 : ${s(a, b, 3)} carrés.`;
const expMo = (a: number, b: number, n: number, nom = "carrés") =>
  exp(
    `à chaque étape, on ajoute ${a} ${nom}.`,
    `à l'étape ${n}, il y a ${n} fois ${a} ${nom}${b ? `, plus ${b} au départ` : ""}. Pas besoin de dessiner toutes les étapes.`,
    `${a} × ${n}${b ? ` + ${b}` : ""} = ${s(a, b, n)}.`,
    `il y a ${s(a, b, n)} ${nom} à l'étape ${n}.`,
  );
const fauxMo = (a: number, b: number, n: number) => {
  const r = s(a, b, n);
  return [s(a, b, 1) * n, a * n, r + a, r - a, r + 1, r - 1, s(a, b, 3) + n].filter((f) => f !== r && f > 0);
};
const AVANT = ["Regarde les étapes.", "Un motif grandit.", "Voici un motif qui grandit.", "Observe le motif.", "Ce motif s'agrandit."];
const CTX = [
  { e: "carré", o: "allumettes", a: 3, b: 1, q: "Des allumettes forment des carrés en ligne" }, { e: "table", o: "places", a: 2, b: 2, q: "Des tables carrées sont collées en ligne" }, { e: "triangle", o: "allumettes", a: 2, b: 1, q: "Des allumettes forment des triangles en ligne" }, { e: "maille", o: "perles", a: 4, b: 2, q: "Un collier s'allonge maille après maille" },
  { e: "hexagone", o: "bâtonnets", a: 5, b: 1, q: "Des bâtonnets forment des hexagones en ligne" }, { e: "section", o: "poteaux", a: 1, b: 1, q: "Une clôture avance section après section" }, { e: "wagon", o: "roues", a: 4, b: 6, q: "Un train a une locomotive et des wagons" }, { e: "étage", o: "fenêtres", a: 6, b: 2, q: "Un immeuble a une entrée vitrée et des étages" },
  { e: "rangée", o: "plants", a: 7, b: 3, q: "Un potager s'agrandit rangée après rangée" }, { e: "semaine", o: "euros", a: 5, b: 8, q: "Une tirelire contient déjà un peu d'argent et grandit chaque semaine" },
];
const lignes = (c: (typeof CTX)[number]) => [1, 2, 3].map((n) => `${n} ${c.e}${n > 1 ? (c.e.endsWith("x") ? "" : "s") : ""} : ${s(c.a, c.b, n)} ${c.o}`).join(" ; ");
const algebre_motif_rang: TutorBankItemV4[] = [
  mo(1, "Regarde de combien le nombre augmente à chaque étape.", () => {
    const { a, b } = tireMotif();
    return qcmN(s(a, b, 4), [s(a, b, 3), s(a, b, 3) + 1, s(a, b, 3) + 2, s(a, b, 4) + a, s(a, b, 4) + 1].filter((f) => f !== s(a, b, 4)), expMo(a, b, 4), `${v(AVANT)} ${suite(a, b)} ${v(["Combien de carrés à l'étape 4 ?", "Combien y en a-t-il à l'étape 4 ?", "Et à l'étape 4 ?", "Quel nombre pour l'étape 4 ?", "Combien de carrés faut-il à l'étape 4 ?"])}`);
  }),
  mo(1, "Compte les carrés de chaque étape sur le dessin : ajoute toujours autant.", () => {
    const { a, b } = tireMotif();
    return qcmN(s(a, b, 4), [s(a, b, 3), s(a, b, 3) + 1, s(a, b, 4) + a, s(a, b, 4) - 1, s(a, b, 4) + 1], expMo(a, b, 4), `${v(AVANT)} ${v(["Le dessin montre les étapes 1, 2 et 3.", "On voit les étapes 1, 2 et 3.", "De gauche à droite : étapes 1, 2, 3."])} ${v(["Combien de carrés à l'étape 4 ?", "Combien y en aura-t-il à l'étape 4 ?", "Quel nombre pour l'étape 4 ?"])}`, dessinMotif(a, b));
  }),
  mo(1, "Fais la différence entre deux étapes qui se suivent.", () => {
    const { a, b } = tireMotif();
    return qcmN(a, [a + 1, a - 1, a + 2, b + a + 1, s(a, b, 1)].filter((f) => f > 0 && f !== a), expMo(a, b, 4), v(AVANT, ["De gauche à droite : étapes 1, 2, 3.", "On voit les étapes 1, 2 et 3."], ["Combien de carrés ajoute-t-on à chaque étape ?", "De combien le motif grandit-il à chaque étape ?", "Combien de carrés de plus à chaque étape ?", "Quel nombre de carrés s'ajoute à chaque étape ?"]), dessinMotif(a, b));
  }),
  mo(2, "Trouve ce qu'on ajoute à chaque étape, puis multiplie par le numéro de l'étape.", () => {
    const { a, b } = tireMotif();
    const n = un([10, 12, 15, 20, 25]);
    return qcmN(s(a, b, n), fauxMo(a, b, n), expMo(a, b, n), `${v(AVANT)} ${suite(a, b)} ${v(["Combien de carrés à l'étape", "Combien y en a-t-il à l'étape", "Quel nombre pour l'étape", "Sans dessiner, combien à l'étape"])} ${n} ?`);
  }),
  mo(2, "Le numéro de l'étape dit combien de fois on ajoute le même nombre.", () => {
    const { a, b } = tireMotif();
    const n = un([10, 12, 15, 20, 25]);
    return qcmN(s(a, b, n), fauxMo(a, b, n), expMo(a, b, n), `${v(AVANT)} ${v(["Le dessin montre les étapes 1, 2 et 3.", "On voit les étapes 1, 2 et 3.", "De gauche à droite : étapes 1, 2, 3."])} ${v(["Sans dessiner, combien de carrés à l'étape", "Sans tout dessiner, combien de carrés à l'étape", "Sans dessin de plus, quel nombre pour l'étape"])} ${n} ?`, dessinMotif(a, b));
  }),
  mo(2, "Ce qu'on ajoute × le numéro de l'étape, plus ce qu'il y a au départ.", () => {
    const a = entre(2, 5);
    const b = entre(1, 3);
    const n = un([10, 20, 30, 50, 100]);
    const c = (x: number, y: number) => (y ? `${x} × ${n} + ${y}` : `${x} × ${n}`);
    const f = [c(a, 0), c(a + b, 0), c(a, b + 1), c(a + 1, b), `${n} + ${b}`, c(b, a)].filter((t) => t !== c(a, b));
    return qcm(c(a, b), f, expMo(a, b, n), `${v(AVANT)} ${suite(a, b)} ${v(["Quel calcul donne le nombre de carrés à l'étape", "Quel calcul donne le résultat à l'étape", "Quel calcul permet de trouver l'étape", "Quel calcul convient pour l'étape"])} ${n} ?`);
  }),
  mo(3, "Trouve ce qu'on ajoute à chaque fois, puis multiplie.", () => {
    const c = un(CTX);
    const n = un([10, 12, 15, 20, 25]);
    return qcmN(s(c.a, c.b, n), fauxMo(c.a, c.b, n), expMo(c.a, c.b, n, c.o), `${c.q}. ${cap2(lignes(c))}. ${v(["Combien pour", "Quel nombre pour", "Combien en faut-il pour"])} ${n} ${c.e}s ?`, undefined, c.o);
  }),
  mo(3, "Retire ce qu'il y a au départ, puis divise par ce qu'on ajoute.", () => {
    const c = un(CTX);
    const n = entre(6, 30);
    const r = s(c.a, c.b, n);
    return qcmN(n, [n + 1, n - 1, n + 2, Math.round(r / c.a) + 2, r - c.a].filter((f) => f !== n && f > 0), exp(`à chaque fois, on ajoute ${c.a} ${c.o}.`, `on retire ce qu'il y a au départ (${c.b}), puis on cherche combien de fois ${c.a} y va.`, `${r} − ${c.b} = ${r - c.b} ; ${r - c.b} ÷ ${c.a} = ${n}.`, `il y a ${n} ${c.e}s.`), `${c.q}. ${cap2(lignes(c))}. ${v(["On compte", "On trouve", "Il y a"])} ${r} ${c.o}. ${v(["Combien y a-t-il de", "Quel est le nombre de", "Combien compte-t-on de"])} ${c.e}s ?`);
  }),
  mo(3, "Vérifie avec le calcul : ce qu'on ajoute × le numéro + le départ.", () => {
    const c = un(CTX);
    const n = un([10, 20, 30, 50]);
    const juste = s(c.a, c.b, n);
    const oui = Math.random() < 0.5;
    const annonce = oui ? juste : un([s(c.a, c.b, 1) * n, c.a * n, juste + c.a, juste - c.a].filter((f) => f !== juste));
    return qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"], expMo(c.a, c.b, n, c.o), `${c.q}. ${cap2(lignes(c))}. ${v(["On annonce", "Un élève annonce", "Quelqu'un annonce"])} ${annonce} ${c.o} pour ${n} ${c.e}s. ${v(["Est-ce juste ?", "A-t-on raison ?", "Ce nombre est-il juste ?"])}`);
  }),
];
function cap2(t: string) { return t.charAt(0).toUpperCase() + t.slice(1); }

export const problemesRechercheBank: TutorBankItemV4[] = [
  ...probleme_denombrement,
  ...probleme_toutes_solutions,
  ...probleme_optimisation,
  ...algebre_motif_rang,
];
