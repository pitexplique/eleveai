// lib/tutor-v4/question-banks/maths/cm2/nombres-entiers.bank.ts

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { atelier, qcm, qcmN, tournure } from "../../cm1/maths/trous-outils";
import {
  PAQUETS, PRENOMS, RANGS, VIE, arrondi, barrePaquets, chiffreDe, classes, decomposition, droiteN, entre, enLettres, etapes,
  explComparer, explEcrire, explLire, fauxEcrits, fr, melange, nombre, nombreClasses, singulier, tab, tabClasses, tabNum, tableDe, termes, un, voisins,
} from "./nombres-entiers-outils";

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* ════════════════════════════════════════════════════════════════════
   GABARITS DU 14/11/2026 — les six micros historiques de la notion
   (lire, comparer, décomposer, arrondir, multiples, défi).
   Avant : 2 à 5 squelettes par micro, 15 à 18 répétitions sur 20, aucun
   dessin, et des énoncés « À La Réunion » par défaut. Repris du modèle CM1
   (commit 13cffc60) et monté au CM2 : jusqu'au MILLIARD. Outils dans
   `nombres-entiers-outils.ts` :
     - le TABLEAU DE NUMÉRATION (une colonne par chiffre jusqu'à 9 chiffres,
       le tableau des CLASSES au-delà) : lire, comparer, décomposer ;
     - la DROITE GRADUÉE : arrondir, encadrer, les défis ;
     - la TABLE de k et la BARRE de paquets : les multiples.
   ⛔ Le dessin porte les données, jamais la réponse (tableau VIDE quand on
   demande d'écrire un nombre en chiffres).
   ⛔ Les leurres sont de vraies erreurs : classe écrite sans ses zéros,
   classe vide oubliée, chiffre et nombre de milliers confondus, tronquer au
   lieu d'arrondir, oublier la retenue au passage d'une classe…
   ════════════════════════════════════════════════════════════════════ */

const QUI_SUIS_JE = ["Qui suis-je ?", "Quel nombre suis-je ?", "Quel est ce nombre ?"];
const vide = (n: number) => (String(n).length > 9 ? tabClasses([null], { cols: 12 }) : tabNum([null], { cols: 9 }));
/** Le nom d'un rang dans une phrase : « 3 millions » plutôt que « 3 unités de millions ». */
const nomRang = (r: number, c: number) => (r === 6 ? (c > 1 ? "millions" : "million") : r === 9 ? (c > 1 ? "milliards" : "milliard") : c > 1 ? RANGS[r].nom : RANGS[r].un);

/* ═════════════════ entier_lire ═════════════════ */
const GL = atelier("cm2", "nombre_entier", "entier_lire", "cm2_");
const EN_CHIFFRES = ["Écris en chiffres : « {w} ».", "Comment s’écrit « {w} » en chiffres ?", "Quel nombre s’écrit « {w} » ?", "Choisis l’écriture en chiffres de « {w} ».", "« {w} » : quelle écriture en chiffres est juste ?", "Retrouve en chiffres le nombre « {w} »."];
const INTRO_L = ["Pense au tableau de numération.", "Une classe, c’est trois chiffres.", "Attention aux zéros.", "Le tableau peut t’aider.", "Millions, mille, unités : pense aux classes.", ""];
const HINT_ECRIRE = "Écris chaque classe (millions, mille, unités) avec trois chiffres : une place vide reçoit un zéro.";
const HINT_LIRE = "Lis chaque classe comme un nombre à trois chiffres, puis dis son nom : millions, mille…";

const entierLireGab: TutorBankItemV4[] = [
  GL(20, 1, HINT_ECRIRE, () => {
    const n = nombreClasses(un([6, 7]), 0.6);
    return { text: tournure(INTRO_L, EN_CHIFFRES).replace("{w}", enLettres(n)), ...qcmN(n, fauxEcrits(n), "", 1000), canvas: vide(n), explanation: explEcrire(n) };
  }),
  GL(21, 1, HINT_LIRE, () => {
    const n = nombreClasses(un([6, 7]), 0.6);
    return {
      text: tournure(["Le nombre {n} est rangé dans le tableau.", "Voici {n} dans le tableau.", "Regarde {n} dans le tableau.", "Observe le tableau : on y lit {n}.", "Dans le tableau, on a écrit {n}."], ["Comment se lit-il ?", "Comment l’écrit-on en lettres ?", "Quelle est son écriture en lettres ?", "Choisis la bonne lecture.", "Quelle phrase le lit correctement ?"]).replace("{n}", fr(n)),
      ...qcm(enLettres(n), fauxEcrits(n).map(enLettres)),
      canvas: tab([n]),
      explanation: explLire(n),
    };
  }),
  GL(22, 1, "Repère la colonne dans le tableau, puis lis le chiffre écrit dedans.", () => {
    const n = nombre(un([7, 8, 9]), 0.4);
    const k = String(n).length;
    const r = Math.random() < 0.7 ? entre(3, k - 1) : entre(0, 2);
    const c = chiffreDe(n, r);
    const nom = RANGS[r].nom;
    return {
      text: tournure(["Regarde le tableau.", "Observe le tableau.", "Chaque chiffre est dans sa colonne.", "Voici un tableau de numération.", ""], [`Dans {n}, quel est le chiffre des ${nom} ?`, `Quel est le chiffre des ${nom} de {n} ?`, `Quel chiffre est aux ${nom} dans {n} ?`, `Dans {n}, quel chiffre occupe la colonne des ${nom} ?`]).replace("{n}", fr(n)),
      ...qcm(String(c), [...String(n)].filter((x) => x !== String(c)).concat(String((c + 1) % 10), String((c + 9) % 10))),
      canvas: tabNum([n], { cols: 9 }),
      explanation: etapes(`on cherche la colonne des ${nom} dans le tableau.`, `dans ${fr(n)}, la colonne des ${nom} contient ${c}.`, `le chiffre des ${nom} est ${c}.`),
    };
  }),
  GL(23, 1, HINT_ECRIRE, () => {
    const c = un(VIE);
    const n = nombreClasses(entre(6, 7), 0.6);
    return {
      text: `${c.t.replace("{n}", `« ${enLettres(n)} »`)} ${un(["Comment écrit-on ce nombre en chiffres ?", "Écris ce nombre en chiffres.", "Quelle est son écriture en chiffres ?", "Choisis l’écriture en chiffres.", "Comment le noter en chiffres ?"])}`,
      ...qcmN(n, fauxEcrits(n), "", 1000),
      canvas: vide(n),
      explanation: explEcrire(n),
    };
  }),
  GL(29, 1, "Sépare le nombre en classes de trois chiffres, en partant de la droite.", () => {
    let n = nombre(un([7, 8, 9]), 0.3);
    let r = 0;
    for (let e = 0; e < 40; e++) {
      n = nombre(un([7, 8, 9]), 0.3);
      r = entre(0, String(n).length - 1);
      const d = String(chiffreDe(n, r));
      if (d !== "0" && String(n).split(d).length === 2) break;
    }
    const d = chiffreDe(n, r);
    const cl = Math.floor(r / 3);
    const noms = ["la classe des unités", "la classe des mille", "la classe des millions", "la classe des milliards"];
    return {
      text: tournure(["Regarde le tableau.", "Pense aux classes.", "Une classe, c’est trois chiffres.", ""], ["Dans {n}, dans quelle classe est le chiffre {d} ?", "Le chiffre {d} de {n} appartient à quelle classe ?", "Dans quelle classe se trouve le {d} de {n} ?", "À quelle classe appartient le chiffre {d} dans {n} ?"]).replace("{n}", fr(n)).replace(/\{d\}/g, String(d)),
      ...qcm(noms[cl], noms.filter((_, i) => i !== cl)),
      canvas: tabNum([n], { cols: 9 }),
      explanation: etapes(`on sépare ${fr(n)} en classes de trois chiffres, en partant de la droite : ${classes(n).join(" | ")}.`, `le chiffre ${d} est dans la colonne des ${RANGS[r].nom}.`, `il appartient à ${noms[cl]}.`),
    };
  }),
  GL(24, 2, HINT_ECRIRE, () => {
    const n = nombreClasses(un([8, 9, 10]), 0.9);
    return {
      text: tournure(["Un très grand nombre !", "Attention aux classes vides.", "Trois chiffres par classe.", "Prends le tableau.", ""], EN_CHIFFRES).replace("{w}", enLettres(n)),
      ...qcmN(n, fauxEcrits(n), "", 1000000),
      canvas: vide(n),
      explanation: explEcrire(n),
    };
  }),
  GL(25, 2, "Le chiffre des milliers est UN chiffre ; le nombre de milliers compte aussi tout ce qui est à sa gauche.", () => {
    const n = nombre(un([7, 8, 9]), 0.4);
    const r = un([2, 3, 4, 6]);
    const nom = r === 3 ? "milliers" : r === 6 ? "millions" : RANGS[r].nom;
    const juste = Math.floor(n / 10 ** r);
    return {
      text: tournure(["Regarde le tableau.", "Attention : nombre, pas chiffre.", "Observe bien.", ""], [`Combien y a-t-il de ${nom} en tout dans {n} ?`, `Quel est le nombre de ${nom} de {n} ?`, `Dans {n}, combien de ${nom} en tout ?`, `Combien de ${nom} contient {n} ?`]).replace("{n}", fr(n)),
      ...qcmN(juste, [chiffreDe(n, r), Math.floor(n / 10 ** (r + 1)), Math.floor(n / 10 ** (r - 1)), n % 10 ** (r + 1)], "", 1),
      canvas: tabNum([n], { cols: 9 }),
      explanation: etapes(`le CHIFFRE des ${nom} est ${chiffreDe(n, r)} ; le NOMBRE de ${nom} se lit avec tous les chiffres à sa gauche.`, `${fr(n)} : on cache les ${r} derniers chiffres et on lit ${fr(juste)}.`, `il y a ${fr(juste)} ${nom} en tout.`),
    };
  }),
  GL(26, 2, HINT_LIRE, () => {
    const c = un(VIE.filter((v) => v.k >= 8));
    const n = nombreClasses(entre(7, c.k), 0.7);
    return {
      text: `${c.t.replace("{n}", fr(n))} ${un(["Comment lit-on ce nombre ?", "Comment s’écrit ce nombre en lettres ?", "Quelle phrase dit ce nombre ?", "Comment le dire à voix haute ?", "Choisis sa lecture."])}`,
      ...qcm(enLettres(n), fauxEcrits(n).map(enLettres)),
      canvas: tab([n]),
      explanation: explLire(n),
    };
  }),
  GL(27, 2, "Écris le nombre en chiffres dans ta tête, classe par classe, puis compte ses zéros.", () => {
    let n = nombreClasses(un([7, 8, 9, 10]), 1);
    for (let e = 0; e < 20 && !String(n).includes("0"); e++) n = nombreClasses(un([7, 8, 9, 10]), 1);
    const z = [...String(n)].filter((x) => x === "0").length;
    return {
      text: un([`Pour écrire « {w} » en chiffres, combien de zéros faut-il ?`, `Combien de zéros écrit-on dans « {w} » en chiffres ?`, `« {w} » : combien de 0 y a-t-il en chiffres ?`, `En chiffres, « {w} » contient combien de zéros ?`]).replace("{w}", enLettres(n)),
      ...qcmN(z, [z + 1, z - 1, z + 2, z + 3, z - 2], "", 1),
      canvas: vide(n),
      explanation: etapes(`on écrit le nombre en chiffres, classe par classe : chaque place vide reçoit un zéro.`, `« ${enLettres(n)} » s’écrit ${fr(n)}.`, `il y a ${z} zéro${z > 1 ? "s" : ""}.`),
    };
  }),
  GL(28, 2, "Une classe complète, c’est toujours trois chiffres, même vide.", () => {
    const n = nombreClasses(un([7, 8, 9, 10]), 0.9);
    const k = String(n).length;
    const court = fauxEcrits(n).map((x) => String(x).length);
    return {
      text: un([`Combien de chiffres faut-il pour écrire « {w} » ?`, `En chiffres, « {w} » s’écrit avec combien de chiffres ?`, `« {w} » : combien de chiffres en tout ?`, `Combien de chiffres compte le nombre « {w} » ?`]).replace("{w}", enLettres(n)),
      ...qcmN(k, [...court, k - 1, k + 1, k - 3, k + 3], "", 1),
      canvas: vide(n),
      explanation: etapes(`on écrit le nombre classe par classe ; après la première classe, chaque classe a trois chiffres.`, `« ${enLettres(n)} » s’écrit ${fr(n)}.`, `il faut ${k} chiffres.`),
    };
  }),
];

/* ═════════════════ entier_comparer ═════════════════ */
const GC = atelier("cm2", "nombre_entier", "entier_comparer", "cm2_");
const HINT_COMP = "Compte d’abord les chiffres. S’il y en a autant, compare de gauche à droite.";

const entierComparerGab: TutorBankItemV4[] = [
  GC(30, 1, HINT_COMP, () => {
    let a: number;
    let b: number;
    const cas = Math.random();
    if (cas < 0.25) {
      const k = entre(6, 8);
      a = entre(6, 9) * 10 ** (k - 1) + entre(0, 10 ** (k - 1) - 1);
      b = 10 ** k + entre(0, 3 * 10 ** (k - 1));
    } else if (cas < 0.33) {
      a = nombre(entre(6, 9), 0.5);
      b = a;
    } else [a, b] = voisins(entre(6, 9), 2);
    if (Math.random() < 0.5) [a, b] = [b, a];
    const s = a > b ? ">" : a < b ? "<" : "=";
    return {
      text: tournure(["Compare ces deux nombres.", "Regarde les deux lignes du tableau.", "Compte d’abord les chiffres.", "Attention aux colonnes.", ""], ["Complète : {a} … {b}", "{a} … {b} : quel signe faut-il ?", "Quel signe va entre {a} et {b} ?", "Entre {a} et {b}, choisis <, > ou =."]).replace("{a}", fr(a)).replace("{b}", fr(b)),
      ...qcm(s, ["<", ">", "="]),
      canvas: tab([a, b]),
      explanation: etapes(`on compte les chiffres, puis on compare de gauche à droite.`, explComparer(a, b), `${fr(a)} ${s} ${fr(b)}.`),
    };
  }),
  GC(31, 1, HINT_COMP, () => {
    const ns = voisins(entre(6, 8));
    const grand = Math.random() < 0.5;
    const juste = grand ? Math.max(...ns) : Math.min(...ns);
    const mot = grand ? "grand" : "petit";
    return {
      text: tournure(["Voici quatre nombres.", "Regarde le tableau.", "Compare ces nombres colonne par colonne.", "Quatre nombres sont rangés dans le tableau.", ""], [`Quel est le plus ${mot} ?`, `Lequel est le plus ${mot} ?`, `Quel nombre est le plus ${mot} ?`, `Trouve le plus ${mot} de ces nombres.`]),
      ...qcm(fr(juste), ns.filter((x) => x !== juste).map(fr)),
      canvas: tab(ns),
      explanation: etapes(`ils ont tous autant de chiffres : on compare de gauche à droite, colonne par colonne.`, `rangés : ${[...ns].sort((x, y) => x - y).map(fr).join(" < ")}.`, `le plus ${mot} est ${fr(juste)}.`),
    };
  }),
  GC(32, 1, "Écris d’abord le nombre en lettres avec des chiffres, puis compare.", () => {
    let [a, b] = voisins(7, 2);
    if (Math.random() < 0.15) b = a;
    const s = a > b ? ">" : a < b ? "<" : "=";
    return {
      text: tournure(["Un nombre est écrit en lettres.", "Lis bien les deux nombres.", "Attention aux classes.", ""], ["Complète : « {w} » … {b}", "Quel signe va entre « {w} » et {b} ?", "« {w} » … {b} : quel est le bon signe ?"]).replace("{w}", enLettres(a)).replace("{b}", fr(b)),
      ...qcm(s, ["<", ">", "="]),
      canvas: tabNum([null, b], { cols: 9 }),
      explanation: etapes(`on écrit d’abord « ${enLettres(a)} » en chiffres : ${fr(a)}.`, explComparer(a, b), `« ${enLettres(a)} » ${s} ${fr(b)}.`),
    };
  }),
  GC(33, 2, "Range d’abord du plus petit au plus grand, en comparant de gauche à droite.", () => {
    const ns = voisins(entre(7, 10));
    const asc = [...ns].sort((x, y) => x - y);
    const croissant = Math.random() < 0.5;
    const bon = croissant ? asc : [...asc].reverse();
    const ecr = (l: number[]) => l.map(fr).join(" ; ");
    const echange = (l: number[], i: number) => {
      const t = [...l];
      [t[i], t[i + 1]] = [t[i + 1], t[i]];
      return t;
    };
    const ordre = croissant ? "croissant (du plus petit au plus grand)" : "décroissant (du plus grand au plus petit)";
    return {
      text: tournure(["Regarde le tableau.", "Compare colonne par colonne.", "Quatre grands nombres à ranger.", ""], [`Quel rangement est dans l’ordre ${ordre} ?`, `Range ces nombres dans l’ordre ${ordre}.`, `Choisis la liste rangée dans l’ordre ${ordre}.`]),
      ...qcm(ecr(bon), [ecr([...bon].reverse()), ecr(echange(bon, 1)), ecr(echange(bon, 0)), ecr(echange(bon, 2))]),
      canvas: tab(ns),
      explanation: etapes(`on compare les nombres de gauche à droite pour trouver le plus petit, puis le suivant…`, `${asc.map(fr).join(" < ")}.`, `dans l’ordre ${croissant ? "croissant" : "décroissant"} : ${ecr(bon)}.`),
    };
  }),
  GC(34, 2, HINT_COMP, () => {
    const c = un([
      { t: "Quatre pays comptent leurs habitants.", plus: "Quel pays a le plus d’habitants ?", moins: "Quel pays a le moins d’habitants ?", noms: ["Pays A", "Pays B", "Pays C", "Pays D", "Pays E"] },
      { t: "Des youtubeurs comparent leurs vues.", plus: "Qui a le plus de vues ?", moins: "Qui a le moins de vues ?", noms: PRENOMS },
      { t: "Des joueurs en ligne comparent leurs scores.", plus: "Qui a le meilleur score ?", moins: "Qui a le plus petit score ?", noms: PRENOMS },
      { t: "Des aéroports comptent leurs voyageurs de l’année.", plus: "Quel aéroport a eu le plus de voyageurs ?", moins: "Quel aéroport a eu le moins de voyageurs ?", noms: ["Aéroport Nord", "Aéroport Sud", "Aéroport Est", "Aéroport Ouest"] },
      { t: "Une entreprise note les kilomètres de ses avions.", plus: "Quel avion a volé le plus ?", moins: "Quel avion a volé le moins ?", noms: ["Avion bleu", "Avion rouge", "Avion vert", "Avion jaune"] },
      { t: "Des usines comptent les bouteilles fabriquées.", plus: "Quelle usine en a fabriqué le plus ?", moins: "Quelle usine en a fabriqué le moins ?", noms: ["Usine 1", "Usine 2", "Usine 3", "Usine 4"] },
      { t: "Des musées comptent leurs visiteurs depuis l’ouverture.", plus: "Quel musée a eu le plus de visiteurs ?", moins: "Quel musée a eu le moins de visiteurs ?", noms: ["Musée des sciences", "Musée de la mer", "Musée du jouet", "Musée de l’espace"] },
      { t: "Des sondes spatiales notent les kilomètres parcourus.", plus: "Quelle sonde a parcouru le plus ?", moins: "Quelle sonde a parcouru le moins ?", noms: ["Sonde Alpha", "Sonde Bêta", "Sonde Gamma", "Sonde Delta"] },
      { t: "Des maisons d’édition comptent leurs livres vendus.", plus: "Laquelle a vendu le plus de livres ?", moins: "Laquelle a vendu le moins de livres ?", noms: ["Édition Plume", "Édition Lune", "Édition Soleil", "Édition Étoile"] },
      { t: "Des chanteuses comptent les écoutes de leur chanson.", plus: "Quelle chanteuse a le plus d’écoutes ?", moins: "Quelle chanteuse a le moins d’écoutes ?", noms: PRENOMS.filter((_, i) => i % 2 === 0) },
      { t: "Des régions comptent leurs arbres plantés.", plus: "Quelle région en a planté le plus ?", moins: "Quelle région en a planté le moins ?", noms: ["Région Nord", "Région Sud", "Région Est", "Région Ouest"] },
      { t: "Des banques notent les euros prêtés dans l’année.", plus: "Quelle banque a prêté le plus ?", moins: "Quelle banque a prêté le moins ?", noms: ["Banque A", "Banque B", "Banque C", "Banque D"] },
    ]);
    const nb = entre(3, 4);
    const noms = melange([...c.noms]).slice(0, nb);
    const ns = voisins(entre(7, 9), nb);
    const plus = Math.random() < 0.5;
    const iJ = ns.indexOf(plus ? Math.max(...ns) : Math.min(...ns));
    return {
      text: `${c.t} ${plus ? c.plus : c.moins}`,
      ...qcm(noms[iJ], noms.filter((_, i) => i !== iJ)),
      canvas: tab(ns, { labels: noms }),
      explanation: etapes(`on compare les nombres de gauche à droite, colonne par colonne.`, `${[...ns].sort((x, y) => x - y).map(fr).join(" < ")}.`, `la réponse est ${noms[iJ]} (${fr(ns[iJ])}).`),
    };
  }),
  GC(35, 2, "Tous les autres chiffres sont pareils : seul le chiffre caché décide.", () => {
    const k = entre(7, 9);
    const plus = Math.random() < 0.5;
    let n = nombre(k, 0.3);
    const i = entre(1, k - 1);
    const s = String(n).split("");
    const d0 = plus ? entre(2, 8) : entre(1, 7);
    s[i] = String(d0);
    n = Number(s.join(""));
    const juste = plus ? entre(d0 + 1, 9) : entre(0, d0 - 1);
    const faux = plus ? [d0, d0 - 1, d0 - 2] : [d0, d0 + 1, d0 + 2];
    const cache = [...s];
    cache[i] = "▢";
    const grp = (t: string) => {
      const g: string[] = [];
      for (let j = t.length; j > 0; j -= 3) g.unshift(t.slice(Math.max(0, j - 3), j));
      return g.join(" ");
    };
    const A = grp(cache.join(""));
    const signe = plus ? ">" : "<";
    return {
      text: tournure(["Un chiffre est caché.", "Le carré cache un chiffre.", "Regarde le tableau.", ""], [`Quel chiffre peut remplacer ▢ pour que ${A} ${signe} {B} ?`, `Pour avoir ${A} ${signe} {B}, quel chiffre met-on dans ▢ ?`, `${A} ${signe} {B}. Quel chiffre peut se cacher sous ▢ ?`]).replace("{B}", fr(n)),
      ...qcm(String(juste), faux.map(String)),
      canvas: tabNum([cache.join(""), n], { cols: 9 }),
      explanation: etapes(`les chiffres sont les mêmes partout, sauf dans la colonne des ${RANGS[k - 1 - i].nom}.`, `il faut ▢ ${signe} ${d0} : ${juste} convient, ${d0} donnerait deux nombres égaux.`, `on peut mettre ${juste}.`),
    };
  }),
  GC(36, 2, "Un nombre compris entre deux autres est plus grand que le premier et plus petit que le second.", () => {
    const p = un([1000000, 100000]);
    const A = (p === 1000000 ? entre(2, 98) : entre(20, 989)) * p;
    const B = A + p;
    const m = p / 1000;
    const ok = A + entre(1, m - 1) * 1000 + entre(0, 999);
    const faux = [A - entre(1, m - 1) * 1000 - entre(0, 999), B + entre(1, m - 1) * 1000 + entre(0, 999), ...fauxEcrits(ok)].filter((f) => f < A || f > B);
    return {
      text: tournure(["Regarde la droite.", "Encadre chaque nombre.", "Compare avec les deux bornes.", ""], [`Quel nombre est compris entre ${fr(A)} et ${fr(B)} ?`, `Lequel de ces nombres est entre ${fr(A)} et ${fr(B)} ?`, `Quel nombre se place entre ${fr(A)} et ${fr(B)} sur la droite ?`, `Choisis le nombre plus grand que ${fr(A)} et plus petit que ${fr(B)}.`]),
      ...qcm(fr(ok), melange(faux).slice(0, 3).map(fr)),
      canvas: droiteN(A, B, p / 10, [A, A + p / 2, B], []),
      explanation: etapes(`on compare chaque nombre avec ${fr(A)} et avec ${fr(B)}.`, `${fr(A)} < ${fr(ok)} < ${fr(B)} ; les autres sont trop petits ou trop grands.`, `le nombre compris entre les deux est ${fr(ok)}.`),
    };
  }),
];

/* ═════════════════ entier_decomposer ═════════════════ */
const GD = atelier("cm2", "nombre_entier", "entier_decomposer", "cm2_");
const explDec = (n: number) => etapes(`chaque chiffre vaut selon sa colonne ; un zéro ne s’écrit pas dans la décomposition.`, `${fr(n)} = ${decomposition(n)}.`, `la décomposition est ${decomposition(n)}.`);
const decale = (n: number) => {
  const t = termes(n);
  const j = entre(0, t.length - 1);
  return [10, t[j] >= 10 ? 0.1 : 10].map((f) => t.map((v, i) => (i === j ? v * f : v)).map(fr).join(" + "));
};
const mult = (m: number) =>
  [...String(m)]
    .map((c, i, t) => ({ c: Number(c), p: 10 ** (t.length - 1 - i) }))
    .filter((x) => x.c > 0)
    .map((x) => `${x.c} × ${fr(x.p)}`)
    .join(" + ");

const entierDecomposerGab: TutorBankItemV4[] = [
  GD(40, 1, "Chaque chiffre vaut selon sa colonne : regarde le tableau.", () => {
    const n = nombreClasses(un([6, 7]), 0.6);
    return {
      text: tournure(["Regarde le tableau.", "Chaque chiffre a sa valeur.", "Pense aux colonnes.", ""], ["Quelle est la bonne décomposition de {n} ?", "Quelle addition est égale à {n} ?", "Comment décomposer {n} ?", "{n} = … Choisis la bonne décomposition."]).replace("{n}", fr(n)),
      ...qcm(decomposition(n), [...fauxEcrits(n).map(decomposition), ...decale(n)]),
      canvas: tabNum([n], { cols: 9 }),
      explanation: explDec(n),
    };
  }),
  GD(41, 1, "Range chaque nombre dans sa colonne, puis lis le résultat.", () => {
    const n = nombreClasses(un([6, 7]), 0.9);
    const expr = termes(n).map(fr).join(" + ");
    return {
      text: tournure(["Additionne les valeurs.", "Range les nombres dans le tableau.", "Pense aux colonnes.", ""], ["Complète : {e} = …", "Quel nombre fait {e} ?", "{e}, c’est quel nombre ?", "Calcule {e}."]).replace("{e}", expr),
      ...qcmN(n, fauxEcrits(n), "", 1000),
      canvas: tabNum(termes(n), { cols: String(n).length }),
      explanation: etapes(`chaque nombre va dans sa colonne ; une colonne vide reçoit un zéro.`, `${expr} = ${fr(n)}.`, `le nombre est ${fr(n)}.`),
    };
  }),
  GD(42, 1, "Regarde la colonne du chiffre : elle donne sa valeur.", () => {
    let n = nombre(un([6, 7, 8]), 0.4);
    let r = entre(2, String(n).length - 1);
    let d = chiffreDe(n, r);
    for (let e = 0; (d === 0 || String(n).split(String(d)).length > 2) && e < 40; e++) {
      n = nombre(un([6, 7, 8]), 0.4);
      r = entre(2, String(n).length - 1);
      d = chiffreDe(n, r);
    }
    const v = d * 10 ** r;
    return {
      text: tournure(["Pense au tableau.", "Regarde la colonne du chiffre.", "Chaque chiffre a sa valeur.", ""], ["Dans {n}, que vaut le chiffre {d} ?", "Quelle est la valeur du chiffre {d} dans {n} ?", "Le chiffre {d} de {n} vaut combien ?", "Dans {n}, combien vaut le {d} ?"]).replace("{n}", fr(n)).replace(/\{d\}/g, String(d)),
      ...qcmN(v, [d, d * 10 ** (r - 1), d * 10 ** (r + 1), d * 10 ** (r + 2)], "", 10 ** r),
      canvas: tabNum([n], { cols: 9 }),
      explanation: etapes(`le chiffre ${d} est dans la colonne des ${RANGS[r].nom}.`, `${d} ${RANGS[r].nom} = ${fr(v)}.`, `le chiffre ${d} vaut ${fr(v)}.`),
    };
  }),
  GD(43, 2, "Un chiffre × la valeur de sa colonne : 4 × 1 000 000, 5 × 1 000…", () => {
    const n = nombreClasses(un([7, 8]), 0.7);
    return {
      text: tournure(["Regarde le tableau.", "Pense aux colonnes.", ""], ["Quelle écriture est égale à {n} ?", "Décompose {n} avec des multiplications.", "Quelle décomposition de {n} est juste ?", "{n} = … Choisis la bonne écriture."]).replace("{n}", fr(n)),
      ...qcm(mult(n), fauxEcrits(n).map(mult)),
      canvas: tabNum([n], { cols: 9 }),
      explanation: etapes(`chaque chiffre est multiplié par la valeur de sa colonne.`, `${fr(n)} = ${mult(n)}.`, `la bonne écriture est ${mult(n)}.`),
    };
  }),
  GD(44, 2, "Place chaque chiffre dans sa colonne ; les colonnes vides reçoivent un zéro.", () => {
    const n = nombre(un([7, 8]), 1);
    const desc = [...String(n)]
      .map((c, i, t) => ({ c: Number(c), r: t.length - 1 - i }))
      .filter((x) => x.c > 0)
      .map((x) => `${x.c} ${nomRang(x.r, x.c)}`);
    const phrase = desc.length > 1 ? `${desc.slice(0, -1).join(", ")} et ${desc[desc.length - 1]}` : desc[0];
    const sansZero = Number(String(n).replace(/0/g, ""));
    return {
      text: un(["Quel nombre a {p} ?", "Écris le nombre qui a {p}.", "Je suis formé de {p}. Qui suis-je ?", "Quel nombre s’écrit avec {p} ?"]).replace("{p}", phrase),
      ...qcmN(n, [sansZero, ...fauxEcrits(n)], "", 1000),
      canvas: tabNum([null], { cols: 9 }),
      explanation: etapes(`on place chaque chiffre dans sa colonne ; les colonnes vides reçoivent un zéro.`, `${phrase} → ${fr(n)}.`, `le nombre est ${fr(n)}.`),
    };
  }),
  GD(45, 2, "Chaque classe se lit comme un nombre : des millions, des mille, des unités.", () => {
    let n = nombreClasses(un([7, 8, 9]), 0.5);
    let g = classes(n);
    let i = entre(0, 2);
    for (let e = 0; g[i] === 0 && e < 30; e++) {
      n = nombreClasses(un([7, 8, 9]), 0.5);
      g = classes(n);
      i = entre(0, 2);
    }
    const morceaux = [`${fr(g[0])} million${g[0] > 1 ? "s" : ""}`, `${fr(g[1])} mille`, `${fr(g[2])} unité${g[2] > 1 ? "s" : ""}`];
    const trou = morceaux.map((m, j) => (j === i ? m.replace(/^[\d\s]+/, "… ") : m));
    const faux = i === 0 ? [g[1], chiffreDe(n, 6), Math.floor(n / 100000), Math.floor(n / 1000)] : i === 1 ? [g[0], g[2], Math.floor(n / 1000), chiffreDe(n, 3)] : [g[1], n % 100, n % 10000, Math.floor(g[2] / 10)];
    return {
      text: un(["Complète : {n} = {t}.", "{n}, c’est {t}. Quel nombre manque ?", "Dans {n}, il y a {t}. Que met-on à la place des points ?"]).replace("{n}", fr(n)).replace("{t}", `${trou[0]}, ${trou[1]} et ${trou[2]}`),
      ...qcmN(g[i], faux, "", 1),
      canvas: tabClasses([n], { cols: 9 }),
      explanation: etapes(`on sépare le nombre en classes de trois chiffres : ${g.join(" | ")}.`, `${fr(n)} = ${morceaux.join(", ")}.`, `il manque ${fr(g[i])}.`),
    };
  }),
  GD(46, 2, "Les nombres ne sont pas dans l’ordre : range-les par colonne.", () => {
    const n = nombre(un([7, 8]), 1);
    const t = melange(termes(n));
    const expr = t.map(fr).join(" + ");
    const enLigne = Number(t.map((v) => String(v)[0]).join(""));
    return {
      text: tournure(["Attention à l’ordre.", "Range chaque nombre dans sa colonne.", "Les termes sont mélangés.", ""], ["Complète : {e} = …", "Quel nombre fait {e} ?", "{e}, c’est quel nombre ?", "Calcule {e}."]).replace("{e}", expr),
      ...qcmN(n, [enLigne, ...fauxEcrits(n)], "", 1000),
      canvas: tabNum(t, { cols: String(n).length }),
      explanation: etapes(`chaque nombre va dans sa colonne, quel que soit l’ordre de l’addition.`, `${expr} = ${decomposition(n)} = ${fr(n)}.`, `le nombre est ${fr(n)}.`),
    };
  }),
];

/* ═════════════════ entier_arrondir ═════════════════ */
const GA = atelier("cm2", "nombre_entier", "entier_arrondir", "cm2_");
const NOM_P: Record<number, string> = { 10: "à la dizaine près", 100: "à la centaine près", 1000: "au millier près", 10000: "à la dizaine de mille près", 100000: "à la centaine de mille près", 1000000: "au million près" };
const aP = (p: number) => NOM_P[p];
const AP = (p: number) => aP(p).charAt(0).toUpperCase() + aP(p).slice(1);
const rangP = (p: number) => Math.round(Math.log10(p)) - 1;

function arrondiQ(p: number, k: number) {
  let n = nombre(k, 0.3);
  if (Math.random() < 0.15) n = Math.floor(n / p) * p + p / 2; // le milieu : on arrondit au-dessus
  if (n % p === 0) n += entre(1, p - 1);
  const lo = Math.floor(n / p) * p;
  const juste = arrondi(n, p);
  const d = chiffreDe(n, rangP(p));
  return {
    n,
    lo,
    juste,
    faux: [lo === juste ? lo + p : lo, arrondi(n, p / 10), arrondi(n, p * 10), juste + p, lo - p],
    canvas: droiteN(lo, lo + p, p / 10, [lo, lo + p / 2, lo + p], [{ value: n, label: fr(n) }]),
    explanation: etapes(
      `on encadre : ${fr(lo)} < ${fr(n)} < ${fr(lo + p)}. On regarde le chiffre juste à droite (${RANGS[rangP(p)].nom}) : de 0 à 4 on garde, de 5 à 9 on monte.`,
      `le chiffre des ${RANGS[rangP(p)].nom} est ${d}${d >= 5 ? " ≥ 5 : on monte" : " < 5 : on garde"}.`,
      `${fr(n)} arrondi ${aP(p)} donne ${fr(juste)}.`,
    ),
  };
}
const ARR_Q = (p: number) => [`Arrondis {n} ${aP(p)}.`, `Quel est l’arrondi de {n} ${aP(p)} ?`, `{n}, arrondi ${aP(p)}, ça donne ?`, `Donne l’arrondi ${aP(p)} de {n}.`, `Quelle valeur approchée ${aP(p)} choisis-tu pour {n} ?`, `${AP(p)}, {n} vaut environ combien ?`];
const ARR_INTRO = ["Regarde la droite.", "Cherche le plus proche.", "Où est le nombre sur la droite ?", "Encadre d’abord le nombre.", "Pense au chiffre juste à droite.", "Le point montre le nombre.", "Aide-toi du milieu de la droite.", ""];
const hintArr = (p: number) => `${AP(p)} : regarde le chiffre juste à droite. De 0 à 4 on garde, de 5 à 9 on monte.`;

const entierArrondirGab: TutorBankItemV4[] = [
  ...([[1000, [6, 7]], [100000, [7, 8]], [1000000, [7, 8]]] as const).map(([p, ks], i) =>
    GA(50 + i, 2, hintArr(p), () => {
      const q = arrondiQ(p, un(ks));
      return { text: tournure(ARR_INTRO, ARR_Q(p)).replace("{n}", fr(q.n)), ...qcmN(q.juste, q.faux, "", p), canvas: q.canvas, explanation: q.explanation };
    }),
  ),
  GA(53, 2, "Regarde la droite : de quel côté le point est-il le plus près ?", () => {
    const p = un([1000, 10000, 100000, 1000000]);
    const q = arrondiQ(p, rangP(p) + entre(3, 4));
    let n = q.n;
    if (n === q.lo + p / 2) n += 1;
    const juste = arrondi(n, p);
    return {
      text: tournure(["Regarde la droite.", "Observe le point.", "Cherche le milieu.", "Compte les graduations.", ""], ["{n} est-il plus proche de {a} ou de {b} ?", "Entre {a} et {b}, de quel nombre {n} est-il le plus près ?", "{n} : plutôt {a} ou plutôt {b} ?", "Qui est le plus près de {n} : {a} ou {b} ?", "{n} est entre {a} et {b}. Duquel est-il le plus proche ?"]).replace("{n}", fr(n)).replace("{a}", fr(q.lo)).replace("{b}", fr(q.lo + p)),
      ...qcm(fr(juste), [fr(juste === q.lo ? q.lo + p : q.lo), "Il est juste au milieu"]),
      canvas: droiteN(q.lo, q.lo + p, p / 10, [q.lo, q.lo + p / 2, q.lo + p], [{ value: n, label: fr(n) }]),
      explanation: etapes(`le milieu de ${fr(q.lo)} et ${fr(q.lo + p)} est ${fr(q.lo + p / 2)}.`, `${fr(n)} est ${n < q.lo + p / 2 ? "avant" : "après"} le milieu.`, `${fr(n)} est plus proche de ${fr(juste)}.`),
    };
  }),
  GA(54, 3, "Regarde le chiffre juste à droite du rang demandé.", () => {
    const c = un(VIE.filter((v) => v.k >= 8));
    const p = un([100000, 1000000]);
    const q = arrondiQ(p, entre(7, c.k));
    return {
      text: `${c.t.replace("{n}", fr(q.n))} ${un([`${AP(p)}, cela fait environ combien ?`, `Arrondis ce nombre ${aP(p)}.`, `Quel est son arrondi ${aP(p)} ?`, `On veut un ordre de grandeur ${aP(p)}. Lequel ?`])}`,
      ...qcmN(q.juste, q.faux, "", p),
      canvas: q.canvas,
      explanation: q.explanation,
    };
  }),
  GA(55, 3, "À la dizaine de mille près : regarde le chiffre des unités de mille.", () => {
    const q = arrondiQ(10000, un([6, 7, 8]));
    return { text: tournure(ARR_INTRO, ARR_Q(10000)).replace("{n}", fr(q.n)), ...qcmN(q.juste, q.faux, "", 10000), canvas: q.canvas, explanation: q.explanation };
  }),
  GA(56, 3, "Un nombre qui s’arrondit à R est à moins d’une demi-graduation de R.", () => {
    const p = un([1000, 10000, 100000, 1000000]);
    const R = entre(3, 99) * p;
    const ok = R + un([-1, 1]) * entre(1, p / 2 - 1);
    const faux = [R + p / 2 + entre(0, p / 2 - 1), R - p / 2 - entre(1, p / 2 - 1), R + p + entre(1, p / 2 - 1), R - p - entre(1, p / 2 - 1)].filter((f) => f > 0 && arrondi(f, p) !== R);
    return {
      text: tournure(["Un seul nombre convient.", "Regarde la droite.", "Attention au milieu.", ""], [`Quel nombre a pour arrondi ${fr(R)} ${aP(p)} ?`, `Lequel s’arrondit à ${fr(R)} ${aP(p)} ?`, `${AP(p)}, quel nombre devient ${fr(R)} ?`]),
      ...qcm(fr(ok), faux.map(fr)),
      canvas: droiteN(R - p, R + p, p / 10, [R - p, R, R + p], []),
      explanation: etapes(`les nombres qui s’arrondissent à ${fr(R)} sont entre ${fr(R - p / 2)} (compris) et ${fr(R + p / 2)} (non compris).`, `${fr(ok)} est dans cet intervalle ; les autres s’arrondissent à un autre nombre.`, `la réponse est ${fr(ok)}.`),
    };
  }),
  GA(57, 3, "Arrondis au million près, puis compte les millions.", () => {
    const c = un(VIE.filter((v) => v.k >= 8));
    const q = arrondiQ(1000000, entre(8, Math.min(9, c.k)));
    const M = q.juste / 1000000;
    const tronque = Math.floor(q.n / 1000000);
    return {
      text: `${c.t.replace("{n}", fr(q.n))} ${un(["Cela fait environ combien de millions ?", "Environ combien de millions est-ce ?", "Au million près, combien de millions ?", "On l’annonce en millions, arrondi au million près. Combien ?"])}`,
      ...qcm(`${fr(M)} millions`, [tronque === M ? M + 1 : tronque, M * 10, Math.floor(q.n / 10000000), Math.floor(q.n / 100000)].filter((x) => x > 0).map((x) => `${fr(x)} millions`)),
      canvas: q.canvas,
      explanation: etapes(`on arrondit d’abord au million près : on regarde le chiffre des centaines de mille.`, `${fr(q.n)} ≈ ${fr(q.juste)}.`, `cela fait environ ${fr(M)} millions.`),
    };
  }),
];

/* ═════════════════ entier_multiple ═════════════════ */
const GM = atelier("cm2", "nombre_entier", "entier_multiple", "cm2_");
const pasMultiple = (k: number, max: number) => {
  let x = entre(k + 1, max);
  while (x % k === 0) x = entre(k + 1, max);
  return x;
};
const sommeChiffres = (n: number) => [...String(n)].reduce((a, c) => a + Number(c), 0);

const entierMultipleGab: TutorBankItemV4[] = [
  GM(60, 2, "Un multiple de k est dans la table de k : k × un nombre entier.", () => {
    const k = entre(3, 9);
    const m = k * entre(3, 12);
    return {
      text: tournure(["Pense à la table de {k}.", "Compte de {k} en {k}.", "Récite la table de {k}.", "Un seul nombre convient.", ""], ["Quel nombre est un multiple de {k} ?", "Lequel de ces nombres est un multiple de {k} ?", "Choisis le multiple de {k}.", "Quel nombre peut s’écrire {k} × … ?"]).replace(/\{k\}/g, String(k)),
      ...qcmN(m, [m + 1, m - 1, m + 2, m - 2, m + k - 1].filter((x) => x % k !== 0), "", 1),
      canvas: droiteN(0, 10 * k, k, [0, 5 * k, 10 * k], []),
      explanation: etapes(`un multiple de ${k} s’écrit ${k} × un nombre entier.`, `${fr(m)} = ${k} × ${m / k}.`, `${fr(m)} est un multiple de ${k}.`),
    };
  }),
  GM(61, 2, "Cherche le nombre dans la table : s’il y est, c’est un multiple.", () => {
    const k = entre(3, 9);
    const oui = Math.random() < 0.5;
    const m = oui ? k * entre(2, 10) : pasMultiple(k, 10 * k);
    return {
      text: tournure(["Regarde la table de {k}.", "Voici la table de {k}.", ""], ["{m} est-il un multiple de {k} ?", "{m} est-il dans la table de {k} ?", "Est-ce que {m} est un multiple de {k} ?", "Peut-on écrire {m} = {k} × … avec un nombre entier ?"]).replace(/\{k\}/g, String(k)).replace(/\{m\}/g, String(m)),
      ...qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"]),
      canvas: tableDe(k),
      explanation: etapes(`on cherche ${m} dans la table de ${k}.`, oui ? `${k} × ${m / k} = ${m}.` : `${k} × ${Math.floor(m / k)} = ${k * Math.floor(m / k)} et ${k} × ${Math.floor(m / k) + 1} = ${k * (Math.floor(m / k) + 1)} : ${m} n’y est pas.`, oui ? `${m} est un multiple de ${k}.` : `${m} n’est pas un multiple de ${k}.`),
    };
  }),
  GM(62, 2, "Trois nombres sont dans la table, un seul n’y est pas.", () => {
    const k = entre(3, 9);
    const qs = melange([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 3);
    const intrus = pasMultiple(k, 10 * k);
    return {
      text: tournure(["Regarde la table de {k}.", "Un intrus s’est caché.", "Trois nombres sont dans la table.", ""], ["Quel nombre n’est pas un multiple de {k} ?", "Lequel n’est pas dans la table de {k} ?", "Trouve le nombre qui n’est pas un multiple de {k}."]).replace(/\{k\}/g, String(k)),
      ...qcm(String(intrus), qs.map((q) => String(k * q))),
      canvas: tableDe(k),
      explanation: etapes(`on cherche chaque nombre dans la table de ${k}.`, `${qs.map((q) => `${k} × ${q} = ${k * q}`).join(" ; ")} ; ${intrus} n’y est pas.`, `l’intrus est ${intrus}.`),
    };
  }),
  GM(63, 2, "Regarde le chiffre des unités.", () => {
    const k = un([2, 5, 10, 100]);
    const base = nombre(un([6, 7]), 0.3);
    const fin = (u: number[]) => Math.floor(base / 100) * 100 + un(u);
    let juste: number;
    let faux: number[];
    let regle: string;
    if (k === 2) {
      juste = fin([10, 12, 34, 56, 78, 90, 24, 46]);
      faux = [fin([11, 13, 35]), fin([57, 79, 91]), fin([23, 45, 67])];
      regle = "un multiple de 2 se termine par 0, 2, 4, 6 ou 8";
    } else if (k === 5) {
      juste = fin([15, 25, 40, 65, 70, 85]);
      faux = [fin([12, 23, 34]), fin([46, 57, 68]), fin([51, 79, 93])];
      regle = "un multiple de 5 se termine par 0 ou 5";
    } else if (k === 10) {
      juste = fin([10, 20, 40, 60, 70, 90]);
      faux = [fin([15, 25, 35]), fin([1, 11, 21]), fin([55, 65, 75])];
      regle = "un multiple de 10 se termine par 0";
    } else {
      juste = Math.floor(base / 100) * 100;
      faux = [juste + un([10, 20, 30]), juste + un([50, 60]), juste + un([1, 5, 9])];
      regle = "un multiple de 100 se termine par 00";
    }
    const ns = melange([juste, ...faux]);
    return {
      text: tournure(["Regarde la fin des nombres.", "Pas besoin de calculer.", "Observe la colonne des unités.", ""], [`Quel nombre est un multiple de ${k} ?`, `Lequel de ces nombres est un multiple de ${k} ?`, `Choisis le multiple de ${k}.`]),
      ...qcm(fr(juste), faux.map(fr)),
      canvas: tabNum(ns, k === 100 ? {} : { colonne: 0 }),
      explanation: etapes(`${regle}.`, `${fr(juste)} se termine par ${String(juste).slice(k === 100 ? -2 : -1)}.`, `${fr(juste)} est un multiple de ${k}.`),
    };
  }),
  GM(64, 2, "Il ne doit rien rester : le nombre doit être dans la table.", () => {
    const c = un(PAQUETS);
    const k = entre(3, 9);
    const m = k * entre(4, 10);
    const pl = c.f ? "pleines" : "pleins";
    return {
      text: `${c.p.replace("{k}", String(k))} ${un([`Avec combien de ${c.obj} remplit-on des ${c.cont} ${pl} sans qu’il en reste ?`, `Quel nombre de ${c.obj} donne des ${c.cont} ${pl}, sans reste ?`, `Combien de ${c.obj} faut-il pour des ${c.cont} ${pl}, sans aucun reste ?`])}`,
      ...qcmN(m, [m + 1, m - 1, m + 2, m + k - 2].filter((x) => x % k !== 0), "", 1),
      canvas: barrePaquets(k, "?", singulier(c.cont)),
      explanation: etapes(`il ne reste rien si le nombre est un multiple de ${k}.`, `${fr(m)} = ${k} × ${m / k}.`, `${fr(m)} ${c.obj} conviennent.`),
    };
  }),
  GM(65, 3, "Additionne les chiffres : pour 3, la somme doit être dans la table de 3 ; pour 9, dans la table de 9.", () => {
    const k = un([3, 9]);
    const juste = k * entre(Math.ceil(1000 / k), Math.floor(99999 / k));
    const faux: number[] = [];
    for (const d of melange([1, 2, 4, 5, 7, 8, 10, 20, 100])) {
      const f = juste + d;
      if (f % k !== 0 && faux.length < 2) faux.push(f);
    }
    faux.push(k === 9 ? (juste % 2 ? juste + 3 : juste + 6) : juste + un([1, 2]) * 1000 + 1);
    const ok = faux.filter((f) => f % k !== 0);
    const ns = melange([juste, ...ok]);
    return {
      text: tournure(["Additionne les chiffres.", "Pense à la somme des chiffres.", "Pas besoin de poser la division.", ""], [`Quel nombre est un multiple de ${k} ?`, `Lequel de ces nombres est divisible par ${k} ?`, `Choisis le multiple de ${k}.`]),
      ...qcm(fr(juste), ok.map(fr)),
      canvas: tabNum(ns, { cols: 5 }),
      explanation: etapes(`un nombre est un multiple de ${k} si la somme de ses chiffres est un multiple de ${k}.`, `${[...String(juste)].join(" + ")} = ${sommeChiffres(juste)}, qui est dans la table de ${k}.`, `${fr(juste)} est un multiple de ${k}.`),
    };
  }),
  GM(66, 3, "Avance de k en k sur la droite jusqu’à dépasser le nombre.", () => {
    const k = un([6, 7, 8, 9, 11, 12, 15, 20, 25]);
    const n = pasMultiple(k, 9 * k);
    const apres = Math.ceil(n / k) * k;
    const avant = Math.floor(n / k) * k;
    const sens = Math.random() < 0.6;
    return {
      text: tournure(["Regarde la droite.", "On compte de {k} en {k}.", "Une grenouille saute de {k} en {k}.", ""], sens ? ["Quel est le multiple de {k} juste après {n} ?", "Après {n}, quel est le premier multiple de {k} ?", "Quel multiple de {k} vient juste après {n} ?"] : ["Quel est le multiple de {k} juste avant {n} ?", "Avant {n}, quel est le dernier multiple de {k} ?", "Quel multiple de {k} vient juste avant {n} ?"]).replace(/\{k\}/g, String(k)).replace("{n}", String(n)),
      ...(sens ? qcmN(apres, [avant, n + 1, apres + k, n + k], "", k) : qcmN(avant, [apres, n - 1, avant - k, n - k], "", k)),
      canvas: droiteN(0, 10 * k, k, [0, 5 * k, 10 * k], [{ value: n, label: String(n) }]),
      explanation: etapes(`on compte de ${k} en ${k} : ${avant} < ${n} < ${apres}.`, `${sens ? apres : avant} = ${k} × ${(sens ? apres : avant) / k}.`, `le multiple ${sens ? "suivant" : "précédent"} est ${sens ? apres : avant}.`),
    };
  }),
  GM(67, 3, "Regarde les deux ou trois derniers chiffres.", () => {
    const k = un([25, 50, 1000]);
    const base = Math.floor(nombre(un([5, 6, 7]), 0.3) / 1000) * 1000;
    const fin = (u: number[]) => base + un(u);
    let juste: number;
    let faux: number[];
    let regle: string;
    if (k === 25) {
      juste = fin([25, 50, 75, 100, 125, 250, 375, 500, 625, 750, 875]);
      faux = [fin([105, 215, 335, 445]), fin([120, 240, 360, 480]), fin([52, 57, 152, 205])];
      regle = "un multiple de 25 se termine par 00, 25, 50 ou 75";
    } else if (k === 50) {
      juste = fin([50, 100, 150, 250, 350, 450, 500, 650, 800, 950]);
      faux = [fin([25, 75, 125, 175]), fin([105, 205, 305]), fin([510, 520, 540, 560])];
      regle = "un multiple de 50 se termine par 00 ou 50";
    } else {
      juste = base;
      faux = [base + un([100, 200, 500, 900]), base + un([10, 50, 90]), base + un([1, 5, 9])];
      regle = "un multiple de 1 000 se termine par 000";
    }
    return {
      text: tournure(["Regarde la fin des nombres.", "Pas besoin de calculer.", "Observe les derniers chiffres.", ""], [`Quel nombre est un multiple de ${fr(k)} ?`, `Lequel de ces nombres est un multiple de ${fr(k)} ?`, `Choisis le multiple de ${fr(k)}.`]),
      ...qcm(fr(juste), faux.map(fr)),
      canvas: tabNum(melange([juste, ...faux])),
      explanation: etapes(`${regle}.`, `${fr(juste)} se termine par ${String(juste).slice(k === 1000 ? -3 : -2)}.`, `${fr(juste)} est un multiple de ${fr(k)}.`),
    };
  }),
  GM(68, 3, "Pas de reste si le nombre est un multiple : utilise le critère.", () => {
    const c = un(PAQUETS);
    const k = un([2, 3, 5, 9, 10]);
    const oui = Math.random() < 0.5;
    let N = entre(120, 2999);
    for (let e = 0; e < 50 && (N % k === 0) !== oui; e++) N = entre(120, 2999);
    if ((N % k === 0) !== oui) N = oui ? N - (N % k) : N - (N % k) + 1;
    const pl = c.f ? "pleines" : "pleins";
    const critere = k === 2 ? "un multiple de 2 se termine par 0, 2, 4, 6 ou 8" : k === 5 ? "un multiple de 5 se termine par 0 ou 5" : k === 10 ? "un multiple de 10 se termine par 0" : `un multiple de ${k} a une somme de chiffres dans la table de ${k}`;
    const preuve = k === 3 || k === 9 ? `${[...String(N)].join(" + ")} = ${sommeChiffres(N)}` : `${fr(N)} se termine par ${String(N).slice(-1)}`;
    return {
      text: `${c.t.replace("{N}", fr(N)).replace("{k}", String(k))} ${un([`Peut-on faire des ${c.cont} ${pl} sans qu’il reste de ${c.obj} ?`, `Tous les ${c.obj} trouvent-ils leur place, sans reste ?`, `Est-ce que ${fr(N)} est un multiple de ${k} ?`])}`,
      ...qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"]),
      canvas: barrePaquets(k, fr(N), singulier(c.cont)),
      explanation: etapes(`${critere}.`, `${preuve}.`, oui ? `${fr(N)} est un multiple de ${k} : il ne reste rien.` : `${fr(N)} n’est pas un multiple de ${k} : il reste des ${c.obj}.`),
    };
  }),
];

/* ═════════════════ entier_defi ═════════════════ */
const GF = atelier("cm2", "nombre_entier", "entier_defi", "cm2_");
const DEVINETTE = ["Devinette :", "Nombre mystère :", "Énigme du jour :", "Le code secret d’un coffre :", "Un jeu de piste :", "Le nombre caché d’une chasse au trésor :"];

const entierDefiGab: TutorBankItemV4[] = [
  GF(70, 3, "Utilise chaque indice l’un après l’autre et barre les nombres qui ne vont pas.", () => {
    const a = entre(10, 99) * 100000;
    const d = entre(1, 9);
    const u = entre(1, 9);
    const variante = Math.random() < 0.5;
    const juste = variante ? a + 10000 * d : a + 10000 * d + 1000 * u;
    const indices = variante ? `Je suis un multiple de 10 000. Mon chiffre des dizaines de mille est ${d}.` : `Je suis un multiple de 1 000. Mon chiffre des dizaines de mille est ${d} et mon chiffre des unités de mille est ${u}.`;
    const faux = variante ? [a + 10000 * d + 5000, a + 100000 + 10000 * d, a + 1000 * d, a - 100000 + 10000 * d] : [a + 10000 * u + 1000 * d, a + 100000 + 10000 * d + 1000 * u, a + 10000 * d, a + 10000 * d + 100 * u];
    return {
      text: `${un(DEVINETTE)} je suis plus grand que ${fr(a)} et plus petit que ${fr(a + 100000)}. ${indices} ${un(QUI_SUIS_JE)}`,
      ...qcm(fr(juste), faux.filter((f) => f !== juste).map(fr)),
      canvas: droiteN(a, a + 100000, 10000, [a, a + 50000, a + 100000], []),
      explanation: etapes(`on garde les nombres entre ${fr(a)} et ${fr(a + 100000)}, puis on applique les autres indices.`, variante ? `multiple de 10 000 → il finit par 0 000 ; dizaines de mille ${d} → ${fr(juste)}.` : `dizaines de mille ${d}, unités de mille ${u}, multiple de 1 000 → ${fr(juste)}.`, `le nombre est ${fr(juste)}.`),
    };
  }),
  GF(71, 3, "Des paquets égaux : divise le total par le nombre dans un paquet.", () => {
    const c = un(PAQUETS);
    const k = un([4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25]);
    const q = entre(8, 40);
    const N = k * q;
    const cpl = c.f ? "complètes" : "complets";
    return {
      text: `${c.t.replace("{N}", fr(N)).replace("{k}", String(k))} ${un([`Combien de ${c.cont} obtient-on ?`, `Combien de ${c.cont} ${cpl} y a-t-il ?`, `Combien de ${c.cont} faut-il ?`])}`,
      ...qcmN(q, [q + 1, q - 1, N - k, N + k, q * 2, q * 10], "", 1),
      canvas: barrePaquets(k, fr(N), singulier(c.cont)),
      explanation: etapes(`on cherche combien de fois ${k} dans ${fr(N)} : c’est une division.`, `${fr(N)} ÷ ${k} = ${q}, car ${k} × ${q} = ${fr(N)}.`, `on obtient ${q} ${c.cont}.`),
    };
  }),
  GF(72, 3, "Pour le plus grand, le plus grand chiffre devant. Pour le plus petit, jamais 0 devant.", () => {
    const L = un([5, 6]);
    const avecZero = Math.random() < 0.6;
    const ds = melange([...(avecZero ? [0] : []), ...melange([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, avecZero ? L - 1 : L)]);
    const desc = [...ds].sort((x, y) => y - x);
    const asc = [...ds].sort((x, y) => x - y);
    const minArr = asc[0] === 0 ? [asc[1], 0, ...asc.slice(2)] : asc;
    const grand = Math.random() < 0.5;
    const num = (l: number[]) => Number(l.join(""));
    const ech = (l: number[]) => num([...l.slice(0, L - 2), l[L - 1], l[L - 2]]);
    const juste = grand ? num(desc) : num(minArr);
    const faux = grand ? [ech(desc), num(minArr), num(ds), num([desc[1], desc[0], ...desc.slice(2)])] : [num(asc), ech(minArr), num(desc), num(ds)];
    const qui = un(PRENOMS);
    const mot = grand ? "grand" : "petit";
    const liste = ds.join(", ");
    return {
      text: `${tournure([`${qui} a ${L} étiquettes : ${liste}.`, `Voici ${L} étiquettes chiffres : ${liste}.`, `Le coffre de ${qui} utilise les chiffres ${liste}.`, `${qui} tire les chiffres ${liste}.`])} ${un([`Avec chaque chiffre une seule fois, quel est le plus ${mot} nombre de ${L} chiffres ?`, `Quel est le plus ${mot} nombre de ${L} chiffres qu’on peut écrire avec ces chiffres, une fois chacun ?`, `En utilisant chaque chiffre une fois, quel plus ${mot} nombre de ${L} chiffres obtient-on ?`])}`,
      ...qcm(fr(juste), faux.filter((f) => f !== juste).map(fr)),
      canvas: { kind: "tableau_donnees", title: "Les étiquettes", headers: ds.map(String), rows: [], display: { compact: true } } as CanvasFigure,
      explanation: etapes(grand ? `on place les chiffres du plus grand au plus petit.` : `on place les chiffres du plus petit au plus grand, mais 0 ne peut pas être devant : sinon le nombre n’a que ${L - 1} chiffres.`, grand ? `${desc.join(" > ")} → ${fr(juste)}.` : `${fr(juste)}.`, `le plus ${mot} nombre est ${fr(juste)}.`),
    };
  }),
  GF(73, 3, "Complète d’abord jusqu’à la dizaine de mille, puis jusqu’au nombre rond.", () => {
    const c = un(VIE);
    const M = Math.random() < 0.5 ? entre(1, 9) * 1000000 : entre(11, 99) * 100000;
    let ec = entre(11, 99) * 1000 + entre(1, 9) * 100;
    if (ec % 10000 === 0) ec += 1000;
    const n = M - ec;
    const up = Math.ceil(n / 10000) * 10000;
    return {
      text: `${c.t.replace("{n}", fr(n))} ${un([`Combien manque-t-il pour atteindre ${fr(M)} ?`, `Combien faut-il ajouter pour arriver à ${fr(M)} ?`, `Combien en manque-t-il pour faire ${fr(M)} ?`, `Quel écart reste-t-il jusqu’à ${fr(M)} ?`])}`,
      ...qcmN(ec, [ec + 10000, ec - 10000, ec + 100000, ec + 1000, ec - 1000], "", 1000),
      canvas: droiteN(M - 100000, M, 10000, [M - 100000, M - 50000, M], [{ value: n, label: fr(n) }]),
      explanation: etapes(`on avance jusqu’à la dizaine de mille suivante, puis jusqu’à ${fr(M)}.`, `${fr(n)} + ${fr(up - n)} = ${fr(up)} ; ${fr(up)} + ${fr(M - up)} = ${fr(M)}. En tout : ${fr(ec)}.`, `il manque ${fr(ec)}.`),
    };
  }),
  GF(74, 4, "Remplis le tableau colonne par colonne avec chaque indice.", () => {
    const m = entre(1, 4);
    const rel = [
      { v: 2 * m, t: "le double de celui des millions" },
      { v: m + 1, t: "un de plus que celui des millions" },
      { v: m, t: "le même que celui des millions" },
      { v: m + 2, t: "deux de plus que celui des millions" },
      { v: 3 * m, t: "le triple de celui des millions" },
    ].filter((x) => x.v <= 9);
    // Trois rangs portent une relation, les autres un chiffre écrit (ou 0).
    const avecRel = melange([0, 1, 2, 3, 4, 5]).slice(0, 3);
    const chiffres = Array.from({ length: 6 }, (_, i) => {
      if (avecRel.includes(i)) return un(rel);
      const v = Math.random() < 0.4 ? 0 : entre(1, 9);
      return { v, t: String(v) };
    });
    const n = Number(`${m}${chiffres.map((x) => x.v).join("")}`);
    const phrases = [`Mon chiffre des millions est ${m}.`, `Mes autres chiffres, dans l’ordre : ${chiffres.map((x, i) => `${RANGS[5 - i].nom}, ${x.t}`).join(" ; ")}.`];
    const s = String(n);
    const swap = Number(s.slice(0, 1) + s[2] + s[1] + s.slice(3));
    const swap2 = Number(s.slice(0, 4) + s[5] + s[4] + s.slice(6));
    return {
      text: `${un(DEVINETTE)} ${phrases.join(" ").replace(/^M/, "m")} ${un(QUI_SUIS_JE)}`,
      ...qcmN(n, [swap, swap2, ...fauxEcrits(n)], "", 10000),
      canvas: tabNum(["???????"], { cols: 7 }),
      explanation: etapes(`on remplit le tableau colonne par colonne avec chaque indice.`, `millions ${m} ; ${chiffres.map((x, i) => `${RANGS[5 - i].nom} ${x.v}`).join(" ; ")} → ${fr(n)}.`, `le nombre est ${fr(n)}.`),
    };
  }),
  GF(75, 4, "L’arrondi donne un intervalle ; les autres indices choisissent dedans.", () => {
    const R = entre(120, 9800) * 1000;
    const d = entre(0, 9);
    const juste = d >= 5 ? R - 1000 + 100 * d : R + 100 * d;
    const autre = d >= 5 ? R + 100 * d : R - 1000 + 100 * d;
    return {
      text: `${un(DEVINETTE)} arrondi au millier près, je deviens ${fr(R)}. Je suis un multiple de 100. Mon chiffre des centaines est ${d}. ${un(QUI_SUIS_JE)}`,
      ...qcm(fr(juste), [fr(autre), fr(juste + 50), fr(R + 10 * d), fr(juste + 1000)].filter((f) => f !== fr(juste))),
      canvas: droiteN(R - 1000, R + 1000, 100, [R - 1000, R, R + 1000], []),
      explanation: etapes(`les nombres qui s’arrondissent à ${fr(R)} vont de ${fr(R - 500)} à ${fr(R + 499)}.`, `multiple de 100 avec ${d} centaines dans cet intervalle : ${fr(juste)} (${fr(autre)} s’arrondit à ${fr(arrondi(autre, 1000))}).`, `le nombre est ${fr(juste)}.`),
    };
  }),
  GF(76, 4, "Range d’abord tous les nombres, puis compte les places.", () => {
    const c = un([
      { t: "Quatre joueurs d’un jeu en ligne comparent leurs scores.", u: "points" },
      { t: "Quatre youtubeurs comparent leurs vues de l’année.", u: "vues" },
      { t: "Quatre pilotes notent leurs kilomètres de carrière.", u: "km" },
      { t: "Quatre entreprises comptent leur chiffre d’affaires.", u: "€" },
      { t: "Quatre autrices comptent leurs livres vendus.", u: "livres" },
      { t: "Quatre apiculteurs estiment leurs abeilles.", u: "abeilles" },
      { t: "Quatre streameuses comptent les vues de leur chaîne.", u: "vues" },
      { t: "Quatre agricultrices comptent leurs kilos de blé.", u: "kg" },
      { t: "Quatre architectes comparent le prix de leurs projets.", u: "€" },
      { t: "Quatre chanteurs comptent leurs écoutes.", u: "écoutes" },
    ]);
    const noms = melange([...PRENOMS]).slice(0, 4);
    const ns = voisins(entre(7, 9));
    const desc = [...ns].sort((x, y) => y - x);
    const sens = Math.random() < 0.6;
    const place = entre(2, 3);
    const v = sens ? desc[place - 1] : desc[4 - place];
    const iJ = ns.indexOf(v);
    const rang = place === 2 ? "deuxième" : "troisième";
    const ordre = sens ? "grand au plus petit" : "petit au plus grand";
    return {
      text: `${c.t} ${un([`Qui est ${rang} si on range du plus ${ordre} ?`, `Du plus ${ordre}, qui arrive ${rang} ?`, `Qui occupe la ${rang} place, du plus ${ordre} ?`])}`,
      ...qcm(noms[iJ], noms.filter((_, i) => i !== iJ)),
      canvas: tab(ns, { labels: noms }),
      explanation: etapes(`on range les ${c.u} du plus ${ordre}, en comparant de gauche à droite.`, `${(sens ? desc : [...desc].reverse()).map(fr).join(sens ? " > " : " < ")}.`, `${rang} : ${noms[iJ]} (${fr(v)}).`),
    };
  }),
  GF(77, 4, "Le nombre de paquets COMPLETS, puis ce qui reste : moins qu’un paquet.", () => {
    const c = un(PAQUETS);
    const k = un([4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25]);
    const q = entre(8, 40);
    const r = entre(1, k - 1);
    const N = k * q + r;
    const reste = Math.random() < 0.4;
    const cpl = c.f ? "complètes" : "complets";
    return {
      text: `${c.t.replace("{N}", fr(N)).replace("{k}", String(k))} ${reste ? un([`Combien de ${c.obj} reste-t-il ?`, `Une fois les ${c.cont} ${cpl} ${c.f ? "faites" : "faits"}, combien de ${c.obj} restent ?`]) : un([`Combien de ${c.cont} ${cpl} obtient-on ?`, `Combien de ${c.cont} ${cpl} y a-t-il ?`])}`,
      ...(reste ? qcmN(r, [k - r, q, r + 1, r + k], "", 1) : qcmN(q, [q + 1, q - 1, r, q + r], "", 1)),
      canvas: barrePaquets(k, fr(N), singulier(c.cont)),
      explanation: etapes(`on cherche le plus grand multiple de ${k} qui ne dépasse pas ${fr(N)}.`, `${k} × ${q} = ${fr(k * q)} et ${fr(N)} − ${fr(k * q)} = ${r} (moins que ${k}).`, reste ? `il reste ${r} ${c.obj}.` : `on obtient ${q} ${c.cont} ${cpl}.`),
    };
  }),
];

/** cm2_entier_defi_tpl_003 : le nombre juste avant / juste après un nombre rond (le compteur qui tourne). */
function avantApres() {
  const X = un([entre(1, 9) * 1000000, entre(11, 99) * 100000, entre(2, 9) * 100000, entre(1, 9) * 1000000000, entre(11, 99) * 1000000]);
  const avant = Math.random() < 0.6;
  const Y = X - 1;
  const ctx = un(["Attention aux classes.", "Pense au compteur qui tourne.", "Un compteur kilométrique tourne.", "Le compteur de vues d’une vidéo avance.", "Le tableau peut t’aider.", ""]);
  return avant
    ? {
        text: `${ctx} ${un(["Quel nombre vient juste avant {X} ?", "Quel est le nombre qui précède {X} ?", "Que donne {X} − 1 ?", "Quel nombre écrit-on juste avant {X} ?"])}`.trim().replace("{X}", fr(X)),
        ...qcmN(Y, [X - 1000, X / 10 - 1, X + 1, X - 10], "", 1),
        canvas: tab([X]),
        explanation: etapes(`on enlève 1 : toutes les colonnes à 0 deviennent 9, et le premier chiffre baisse de 1.`, `${fr(X)} − 1 = ${fr(Y)}.`, `le nombre juste avant est ${fr(Y)}.`),
      }
    : {
        text: `${ctx} ${un(["Quel nombre vient juste après {Y} ?", "Quel est le nombre qui suit {Y} ?", "Que donne {Y} + 1 ?", "Quel nombre écrit-on juste après {Y} ?"])}`.trim().replace("{Y}", fr(Y)),
        ...qcmN(X, [X * 10, X / 10, Y - 1, Y + 10, X + 1000 - 1], "", 1),
        canvas: tab([Y]),
        explanation: etapes(`on ajoute 1 : les 9 deviennent 0 et on retient 1 dans la colonne suivante.`, `${fr(Y)} + 1 = ${fr(X)}.`, `le nombre juste après est ${fr(X)}.`),
      };
}

/** cm2_entier_defi_tpl_004 : ajouter 1 000, 10 000 ou 100 000 en passant une classe (la retenue). */
const AJOUTS: { t: string; q: string }[] = [
  { t: "Une youtubeuse a {n} abonnés. Elle en gagne {p}.", q: "Combien d’abonnés a-t-elle maintenant ?" },
  { t: "Le compteur d’un camion affiche {n} km. Le chauffeur roule encore {p} km.", q: "Que va afficher le compteur ?" },
  { t: "Dans un jeu vidéo, Enzo a {n} points. Il gagne {p} points.", q: "Combien de points a-t-il maintenant ?" },
  { t: "Un musée a reçu {n} visiteurs. Il en reçoit {p} de plus.", q: "Combien de visiteurs en tout ?" },
  { t: "Une ville compte {n} habitants. {P} personnes viennent s’y installer.", q: "Combien d’habitants compte-t-elle maintenant ?" },
  { t: "Un barrage contient {n} litres d’eau. La pluie en ajoute {p}.", q: "Combien de litres contient-il maintenant ?" },
  { t: "Une vidéo a {n} vues. Elle en gagne {p} dans la journée.", q: "Combien de vues a-t-elle le soir ?" },
  { t: "Une entreprise a {n} € sur son compte. Elle reçoit {p} €.", q: "Combien a-t-elle maintenant ?" },
  { t: "Une usine a fabriqué {n} bouchons. Elle en fabrique encore {p}.", q: "Combien de bouchons en tout ?" },
  { t: "Une agricultrice a récolté {n} kg de blé. Elle en récolte encore {p} kg.", q: "Combien de kilos en tout ?" },
];
function ajoutRetenue() {
  const r = un([3, 4, 5]);
  const p = 10 ** r;
  const haut = entre(1, 99);
  const neufs = un([1, 2]);
  const bas = entre(0, p - 1);
  const n = (haut * 10 ** neufs + (10 ** neufs - 1)) * p + bas;
  const juste = n + p;
  const c = un(AJOUTS);
  return {
    text: `${c.t.replace("{n}", fr(n)).replace(/\{[pP]\}/, fr(p))} ${c.q}`,
    ...qcmN(juste, [n + p * 10, n + p / 10, n + p - 10 * p, n + 100 * p, juste - 10 ** (r + neufs)], "", p),
    canvas: tab([n]),
    explanation: etapes(`on ajoute 1 dans la colonne des ${RANGS[r].nom} : un 9 devient 0 et on retient 1 dans la colonne suivante.`, `${fr(n)} + ${fr(p)} = ${fr(juste)}.`, `la réponse est ${fr(juste)}.`),
  };
}

export const nombresEntiersBank: TutorBankItemV4[] = [
  ...entierLireGab,
  ...entierComparerGab,
  ...entierDecomposerGab,
  ...entierArrondirGab,
  ...entierMultipleGab,
  ...entierDefiGab,
  // ============================================================
  // ENTIER_LIRE
  // Lire et écrire des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_lire_qcm_001",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « cinq mille deux cent quarante » ?",
    format: "qcm",
    choices: ["5 240", "5 024", "52 040", "524"],
    expected: ["5 240"],
    comparator: "mcq_exact",
    hint: "Repère les milliers, les centaines, les dizaines et les unités.",
    explanation: exp(
      "Lire un nombre entier, c’est reconnaître la valeur de chaque chiffre selon sa position.",
      "On sépare le nombre en classes : milliers, centaines, dizaines, unités.",
      "« cinq mille » donne 5 000 et « deux cent quarante » donne 240. Donc 5 000 + 240 = 5 240.",
      "Le nombre s’écrit 5 240."
    ),
    tags: ["cm2", "nombres_entiers", "lecture", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_entier_lire_short_002",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : « trente-deux mille quinze ».",
    format: "qcm",
    choices: ["32 015", "32 150", "3 215", "320 015"],
    expected: ["32 015"],
    comparator: "mcq_exact",
    hint: "Il y a 32 milliers et 15 unités.",
    explanation: exp(
      "Un nombre entier peut s’écrire avec des chiffres.",
      "On repère la classe des milliers puis la classe des unités.",
      "« trente-deux mille » = 32 000 et « quinze » = 15. Donc 32 000 + 15 = 32 015.",
      "Le nombre est 32 015."
    ),
    tags: ["cm2", "nombres_entiers", "lecture", "short"],
  },

  {
    kind: "template",
    id: "cm2_entier_lire_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis chaque classe comme un nombre à trois chiffres, puis dis son nom : milliards, millions, mille.",
    tags: ["cm2", "nombres_entiers", "lecture", "template"],
    // 14/11/2026 : trois exemples figés → la lecture d'un nombre jusqu'aux
    // milliards dans le tableau des classes.
    generate: () => {
      const n = nombreClasses(un([9, 10]), 0.8);
      return {
        text: tournure(["Voici un nombre dans le tableau des classes.", "Le tableau des classes montre un nombre.", "Lis le tableau des classes.", "Un très grand nombre est rangé par classes."], ["Comment se lit-il ?", "Quelle est son écriture en lettres ?", "Choisis la bonne lecture.", "Quelle phrase le dit correctement ?"]),
        ...qcm(enLettres(n), fauxEcrits(n).map(enLettres)),
        canvas: tabClasses([n]),
        explanation: explLire(n),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_entier_lire_open_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    // 14/11/2026 : l'énoncé affirmait un zéro aux centaines, faux (60 408 a 4 centaines).
    text: "Explique pourquoi le nombre 60 408 contient deux zéros.",
    format: "open",
    expected: ["dizaines", "milliers", "0", "aucune"],
    comparator: "contains_keyword",
    hint: "Regarde les colonnes des dizaines et des unités de mille.",
    explanation: exp(
      "Dans un nombre entier, chaque chiffre a une position : unités, dizaines, centaines, milliers...",
      "On lit les chiffres de droite à gauche pour repérer leur rang.",
      "Dans 60 408, les chiffres sont : 8 unités, 0 dizaine, 4 centaines, 0 millier, 6 dizaines de milliers.",
      "Les deux zéros montrent qu’il n’y a aucune dizaine et aucune unité de mille."
    ),
    tags: ["cm2", "nombres_entiers", "lecture", "rang", "open", "piege"],
  },

  // ============================================================
  // ENTIER_COMPARER
  // Comparer et ordonner des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_comparer_qcm_001",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["9 870", "9 708", "9 807", "9 078"],
    expected: ["9 870"],
    comparator: "mcq_exact",
    hint: "Compare chiffre par chiffre en partant de la gauche.",
    explanation: exp(
      "Comparer deux nombres entiers, c’est déterminer lequel est le plus petit ou le plus grand.",
      "On compare d’abord le nombre de chiffres. S’il est identique, on compare les chiffres de gauche à droite.",
      "Tous les nombres ont 4 chiffres et commencent par 9. On compare ensuite les centaines : 8 est plus grand que 7, 0 et 0.",
      "Le plus grand nombre est 9 870."
    ),
    tags: ["cm2", "nombres_entiers", "comparaison", "qcm"],
  },

 {
  kind: "fixed",
  id: "cm2_entier_comparer_qcm_002",
  niveau: "cm2",
  matiere: "maths",
  notionId: "nombre_entier",
  microId: "entier_comparer",
  difficulty: 1,
  theme: "neutral",
  text: "Complète : 45 098 ... 45 908",
  format: "qcm",
  choices: ["<", ">", "="],
  expected: ["<"],
  comparator: "mcq_exact",
  hint: "Les deux nombres commencent par 45. Compare ensuite les centaines.",
  explanation: exp(
    "Les signes < et > servent à comparer deux nombres.",
    "On compare les chiffres depuis la gauche.",
    "45 098 et 45 908 commencent tous les deux par 45. Ensuite, 0 centaine est plus petit que 9 centaines.",
    "On écrit donc 45 098 < 45 908."
  ),
  tags: ["cm2", "nombres_entiers", "comparaison", "symboles"],
},
  {
  kind: "template",
  id: "cm2_entier_comparer_tpl_003",
  niveau: "cm2",
  matiere: "maths",
  notionId: "nombre_entier",
  microId: "entier_comparer",
  difficulty: 2,
  theme: "neutral",
  hint: "Le nombre le plus grand n’est pas toujours celui qui contient le chiffre 9.",
  tags: ["cm2", "nombres_entiers", "comparaison", "template"],
  // 14/11/2026 : « À La Réunion, deux compteurs… » à chaque tirage (5 chiffres)
  // → des compteurs variés, jusqu'au milliard, qui diffèrent à un seul rang.
  generate: () => {
    const k = entre(7, 10);
    const a = nombre(k, 0.4);
    const r = entre(1, k - 2);
    const b = Math.random() < 0.1 ? a : Math.max(10 ** (k - 1), a + un([-1, 1]) * entre(1, 9) * 10 ** r);
    const correct = a > b ? ">" : a < b ? "<" : "=";
    const ctx = un([
      "Deux compteurs de vues sont dans le tableau.",
      "Deux pays comparent leurs habitants.",
      "Deux sondes spatiales comparent leurs kilomètres.",
      "Deux usines comparent leurs bouchons fabriqués.",
      "Deux chanteuses comparent leurs écoutes.",
      "Deux jeux vidéo comparent leurs téléchargements.",
      "Deux forêts comparent leurs arbres.",
      "Deux entreprises comparent leurs gains en euros.",
    ]);
    return {
      text: `${ctx} ${un(["Complète : {a} … {b}", "Quel signe va entre {a} et {b} ?", "{a} … {b} : choisis <, > ou =."])}`.replace("{a}", fr(a)).replace("{b}", fr(b)),
      ...qcm(correct, ["<", ">", "="]),
      canvas: tab([a, b]),
      explanation: etapes(`on compte les chiffres, puis on compare de gauche à droite.`, explComparer(a, b), `${fr(a)} ${correct} ${fr(b)}.`),
    };
  },
},
  {
    kind: "fixed",
    id: "cm2_entier_ordonner_qcm_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "8 045 < 8 405 < 8 450",
      "8 405 < 8 045 < 8 450",
      "8 450 < 8 405 < 8 045",
      "8 045 < 8 450 < 8 405",
    ],
    expected: ["8 045 < 8 405 < 8 450"],
    comparator: "mcq_exact",
    hint: "Ordre croissant signifie du plus petit au plus grand.",
    explanation: exp(
      "Ordonner des nombres, c’est les ranger du plus petit au plus grand ou du plus grand au plus petit.",
      "Pour l’ordre croissant, on commence par le plus petit.",
      "8 045 est plus petit que 8 405, et 8 405 est plus petit que 8 450.",
      "L’ordre croissant est : 8 045 < 8 405 < 8 450."
    ),
    tags: ["cm2", "nombres_entiers", "ordre_croissant", "qcm"],
  },

  // ============================================================
  // ENTIER_DECOMPOSER
  // Décomposer des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_decomposer_qcm_001",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la bonne décomposition de 4 582 ?",
    format: "qcm",
    choices: [
      "4 000 + 500 + 80 + 2",
      "4 000 + 50 + 80 + 2",
      "400 + 500 + 80 + 2",
      "4 000 + 500 + 8 + 2",
    ],
    expected: ["4 000 + 500 + 80 + 2"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre représente une valeur selon sa position.",
    explanation: exp(
      "Décomposer un nombre, c’est écrire la valeur de chacun de ses chiffres.",
      "On repère les milliers, centaines, dizaines et unités.",
      "Dans 4 582 : 4 vaut 4 000, 5 vaut 500, 8 vaut 80 et 2 vaut 2.",
      "Donc 4 582 = 4 000 + 500 + 80 + 2."
    ),
    tags: ["cm2", "nombres_entiers", "decomposition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_entier_decomposer_short_002",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 70 000 + 800 + 9 = ...",
    format: "qcm",
    choices: ["70 809", "70 890", "7 089", "78 009"],
    expected: ["70 809"],
    comparator: "mcq_exact",
    hint: "Il n’y a pas de milliers ni de dizaines : il faut garder les zéros.",
    explanation: exp(
      "Composer un nombre, c’est regrouper les valeurs de ses chiffres.",
      "On place chaque valeur dans la bonne colonne.",
      "70 000 + 800 + 9 = 70 809.",
      "Le nombre est 70 809."
    ),
    tags: ["cm2", "nombres_entiers", "composition", "zeros"],
  },

  {
    kind: "template",
    id: "cm2_entier_decomposer_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque chiffre vaut selon sa colonne ; les zéros ne s’écrivent pas dans la décomposition.",
    tags: ["cm2", "nombres_entiers", "decomposition", "template"],
    // 14/11/2026 : 4 chiffres seulement → les décompositions jusqu'au milliard.
    generate: () => {
      const n = nombreClasses(un([9, 10]), 0.7);
      return {
        text: tournure(["Regarde le tableau des classes.", "Un très grand nombre.", "Attention aux classes vides.", ""], ["Quelle addition est égale à {n} ?", "Quelle est la bonne décomposition de {n} ?", "{n} = … Choisis la bonne addition."]).replace("{n}", fr(n)),
        ...qcm(decomposition(n), [...fauxEcrits(n).map(decomposition), ...decale(n)]),
        canvas: tabClasses([n]),
        explanation: etapes(`chaque chiffre vaut selon sa colonne ; un zéro ne s’écrit pas dans la décomposition.`, `${fr(n)} = ${decomposition(n)}.`, `la décomposition est ${decomposition(n)}.`),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_entier_decomposer_open_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique l’erreur : un élève écrit 36 205 = 30 000 + 6 000 + 200 + 50.",
    format: "open",
    expected: ["5", "unités", "50", "dizaines"],
    comparator: "contains_keyword",
    hint: "Regarde le dernier chiffre de 36 205.",
    explanation: exp(
      "Chaque chiffre d’un nombre a une valeur selon sa position.",
      "Il faut vérifier les unités, dizaines, centaines, milliers...",
      "Dans 36 205, le dernier chiffre est 5 : il vaut 5 unités, pas 50.",
      "La bonne décomposition est 30 000 + 6 000 + 200 + 5."
    ),
    tags: ["cm2", "nombres_entiers", "decomposition", "erreur_frequente", "open"],
  },

  // ============================================================
  // ENTIER_ARRONDIR
  // Arrondir un nombre entier
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_arrondir_qcm_001",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’arrondi de 4 682 à la centaine près ?",
    format: "qcm",
    choices: ["4 700", "4 600", "4 680", "5 000"],
    expected: ["4 700"],
    comparator: "mcq_exact",
    hint: "Pour arrondir à la centaine, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir un nombre, c’est le remplacer par un nombre proche plus simple.",
      "Pour arrondir à la centaine, on regarde le chiffre des dizaines. S’il est 5 ou plus, on augmente la centaine.",
      "Dans 4 682, le chiffre des dizaines est 8. On arrondit donc vers le haut.",
      "L’arrondi à la centaine près est 4 700."
    ),
    tags: ["cm2", "nombres_entiers", "arrondi", "centaine"],
  },

  {
    kind: "fixed",
    id: "cm2_entier_arrondir_short_002",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 73 249 au millier près.",
    format: "qcm",
    choices: ["73 000", "73 200", "74 000", "70 000"],
    expected: ["73 000"],
    comparator: "mcq_exact",
    hint: "Pour arrondir au millier, regarde le chiffre des centaines.",
    explanation: exp(
      "Arrondir au millier près, c’est choisir le millier le plus proche.",
      "On regarde le chiffre des centaines.",
      "Dans 73 249, le chiffre des centaines est 2. Comme 2 < 5, on garde 73 milliers.",
      "L’arrondi est 73 000."
    ),
    tags: ["cm2", "nombres_entiers", "arrondi", "millier"],
  },

  {
    kind: "template",
    id: "cm2_entier_arrondir_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le chiffre juste à droite du rang demandé : de 0 à 4 on garde, de 5 à 9 on monte.",
    tags: ["cm2", "nombres_entiers", "arrondi", "template"],
    // 14/11/2026 : « Une association de La Réunion… » à chaque tirage → des
    // budgets variés, arrondis au million ou à la centaine de mille.
    generate: () => {
      const c = un([
        "Le budget d’un film est de {n} €.",
        "Un stade a coûté {n} €.",
        "Une fusée a coûté {n} €.",
        "Un pont a coûté {n} €.",
        "Un hôpital a coûté {n} €.",
        "La construction d’un collège coûte {n} €.",
        "Un jeu vidéo a rapporté {n} €.",
        "Un club de foot a vendu un joueur {n} €.",
        "Une ville dépense {n} € pour ses écoles.",
        "Un parc éolien a coûté {n} €.",
      ]);
      const p = un([100000, 1000000]);
      const q = arrondiQ(p, entre(7, 9));
      return {
        text: `${c.replace("{n}", fr(q.n))} ${un([`Arrondis cette somme ${aP(p)}.`, `Quel est son arrondi ${aP(p)} ?`, `${AP(p)}, cela fait environ combien d’euros ?`, `Un journaliste l’annonce ${aP(p)}. Quel nombre dit-il ?`])}`,
        ...qcmN(q.juste, q.faux, "€", p),
        canvas: q.canvas,
        explanation: q.explanation,
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_entier_arrondir_open_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 8 549 s’arrondit à 8 500 à la centaine près, et non à 8 600.",
    format: "open",
    expected: ["dizaines", "4", "inférieur", "5"],
    comparator: "contains_keyword",
    hint: "Pour la centaine, on regarde le chiffre des dizaines.",
    explanation: exp(
      "Pour arrondir à la centaine près, on regarde le chiffre des dizaines.",
      "Si le chiffre des dizaines est 0, 1, 2, 3 ou 4, on garde la centaine. S’il est 5 ou plus, on augmente.",
      "Dans 8 549, le chiffre des dizaines est 4. Comme 4 < 5, on garde 8 500.",
      "Donc 8 549 s’arrondit à 8 500 à la centaine près."
    ),
    tags: ["cm2", "nombres_entiers", "arrondi", "justification", "open"],
  },

  // ============================================================
  // ENTIER_MULTIPLE
  // Reconnaître les multiples d’un nombre
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_multiple_qcm_001",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un multiple de 6 ?",
    format: "qcm",
    choices: ["42", "44", "46", "50"],
    expected: ["42"],
    comparator: "mcq_exact",
    hint: "Un multiple de 6 est dans la table de 6.",
    explanation: exp(
      "Un multiple d’un nombre est un résultat obtenu dans sa table de multiplication.",
      "Pour savoir si 42 est un multiple de 6, on cherche si 42 est dans la table de 6.",
      "6 × 7 = 42.",
      "Donc 42 est un multiple de 6."
    ),
    tags: ["cm2", "nombres_entiers", "multiples", "qcm"],
  },
{
  kind: "fixed",
  id: "cm2_entier_multiple_qcm_002",
  niveau: "cm2",
  matiere: "maths",
  notionId: "nombre_entier",
  microId: "entier_multiple",
  difficulty: 2,
  theme: "neutral",
  text: "72 est-il un multiple de 8 ?",
  format: "qcm",
  choices: ["Oui", "Non"],
  expected: ["Oui"],
  comparator: "mcq_exact",
  hint: "Cherche si 72 apparaît dans la table de 8.",
  explanation: exp(
    "Un nombre est un multiple de 8 s’il peut s’écrire 8 × un entier.",
    "On utilise la table de 8.",
    "8 × 9 = 72.",
    "Oui, 72 est un multiple de 8."
  ),
  tags: ["cm2", "nombres_entiers", "multiples", "table"],
},

  {
    kind: "template",
    id: "cm2_entier_multiple_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte de k en k, ou cherche une multiplication k × … qui tombe juste.",
    tags: ["cm2", "nombres_entiers", "multiples", "template"],
    // 14/11/2026 : les tables de 11, 12, 15, 20 et 25 (au-delà des tables connues).
    generate: () => {
      const base = un([11, 12, 15, 20, 25]);
      const k = entre(3, 12);
      const m = base * k;
      const sens = un(["Compte de {b} en {b}.", "Pense à la table de {b}.", "Un seul nombre convient.", "Ajoute {b} à chaque fois.", ""]);
      return {
        text: `${sens} ${un(["Quel nombre est un multiple de {b} ?", "Lequel de ces nombres est dans la table de {b} ?", "Choisis le multiple de {b}.", "Quel nombre peut s’écrire {b} × … ?"])}`.trim().replace(/\{b\}/g, String(base)),
        ...qcmN(m, [m + 1, m + base - 1, m + 2, m + base + 1, m - 1, m + 10].filter((x) => x % base !== 0), "", 1),
        explanation: etapes(`un multiple de ${base} s’écrit ${base} × un nombre entier.`, `${base} × ${k} = ${m}.`, `${m} est un multiple de ${base}.`),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_entier_multiple_open_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 45 est un multiple de 5.",
    format: "open",
    expected: ["5", "9", "45"],
    comparator: "contains_keyword",
    hint: "Trouve une multiplication qui donne 45.",
    explanation: exp(
      "Un multiple de 5 est un nombre que l’on obtient dans la table de 5.",
      "On cherche une multiplication avec 5.",
      "5 × 9 = 45.",
      "Donc 45 est un multiple de 5."
    ),
    tags: ["cm2", "nombres_entiers", "multiples", "justification", "open"],
  },

  // ============================================================
  // ENTIER_DEFI
  // Résoudre un défi sur les nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_defi_qcm_001",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre entier. Je suis supérieur à 4 500, inférieur à 4 600, et multiple de 25. Quel nombre peut être la réponse ?",
    format: "qcm",
    choices: ["4 525", "4 510", "4 601", "4 499"],
    expected: ["4 525"],
    comparator: "mcq_exact",
    hint: "Vérifie les trois conditions une par une.",
    explanation: exp(
      "Un défi sur les nombres entiers demande souvent de vérifier plusieurs informations.",
      "On teste les conditions : intervalle, comparaison, multiple.",
      "4 525 est bien entre 4 500 et 4 600. C’est aussi un multiple de 25 car 25 × 181 = 4 525.",
      "La réponse possible est 4 525."
    ),
    tags: ["cm2", "nombres_entiers", "defi", "comparaison", "multiple"],
  },

  {
    kind: "fixed",
    id: "cm2_entier_defi_short_002",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un vendeur range 96 letchis dans des sachets de 8. Combien de sachets peut-il remplir ?",
    format: "qcm",
    choices: ["12", "11", "13", "88"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Cherche combien de fois 8 est contenu dans 96.",
    explanation: exp(
      "Résoudre un problème avec des entiers demande de choisir la bonne opération.",
      "Quand on partage une quantité en groupes égaux, on utilise une division.",
      "96 ÷ 8 = 12.",
      "Le vendeur peut remplir 12 sachets."
    ),
    tags: ["cm2", "nombres_entiers", "defi", "division", "reunion"],
  },

  {
    kind: "template",
    id: "cm2_entier_defi_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pense au compteur : les 9 passent à 0 (et les 0 à 9 quand on recule).",
    tags: ["cm2", "nombres_entiers", "defi", "suivant_precedent", "template"],
    // 14/11/2026 : « quel est son arrondi » (pas un défi) → le nombre juste
    // avant ou juste après un nombre rond : le compteur qui tourne.
    generate: () => avantApres(),
  },

  {
    kind: "template",
    id: "cm2_entier_defi_tpl_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Ajoute dans la bonne colonne ; si elle contient 9, elle passe à 0 et on retient 1.",
    tags: ["cm2", "nombres_entiers", "defi", "addition", "retenue"],
    // 14/11/2026 : « Pour une sortie à Mafate… » à chaque tirage → ajouter
    // 1 000, 10 000 ou 100 000 en passant une classe : la retenue.
    generate: () => ajoutRetenue(),
  },

  {
    kind: "fixed",
    id: "cm2_entier_defi_open_005",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Je suis un nombre entier à 4 chiffres. Mon chiffre des milliers est 3. Je suis plus grand que 3 500. Je suis un multiple de 10. Donne un exemple possible et explique.",
    format: "open",
    expected: ["3", "multiple", "10", "0"],
    comparator: "contains_keyword",
    hint: "Un multiple de 10 se termine par 0.",
    explanation: exp(
      "Un défi peut avoir plusieurs réponses possibles si toutes les conditions sont respectées.",
      "On vérifie chaque condition : nombre à 4 chiffres, commence par 3, plus grand que 3 500, multiple de 10.",
      "Par exemple, 3 620 convient : il a 4 chiffres, commence par 3, est plus grand que 3 500, et se termine par 0.",
      "Une réponse possible est 3 620, mais il y en a d’autres."
    ),
    tags: ["cm2", "nombres_entiers", "defi", "open", "raisonnement"],
  },
];