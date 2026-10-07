// ─── Le repérage dans le temps et les durées (6e) ──────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). « Le repérage dans le temps et
// les durées » est un chapitre entier du programme de 6e — trois objectifs
// d'apprentissage — et le coach n'en avait AUCUNE micro. Ni horaire, ni durée,
// ni conversion. Le canvas `duree` existait pourtant depuis des mois (horloge,
// double horloge, affichage digital, frise) : le dessin était prêt, les
// questions n'ont jamais été écrites.
//
// Les objectifs, mot pour mot (Exemples pour la mise en œuvre des programmes,
// 6e, 2025, p. 10-11) :
//   · « Effectuer des calculs sur des horaires et des durées » ;
//   · « Résoudre des problèmes impliquant des horaires, des durées » ;
//   · « Convertir des durées ».
//
// Et les exemples de réussite que le BO cite, tous repris ici :
//   la séance de cinéma de 17 h 40 qui dure 110 minutes · la durée hebdomadaire
//   de cours · le tableau des bus · « combien font 609 h en semaines, jours et
//   heures ? » · « combien font 34 990 s en heures, minutes et secondes ? » ·
//   « est-il plus long d'emprunter sur 76 mois ou sur 5 ans ? » ·
//   0,5 h = 30 min · 0,25 h = 15 min · 0,75 h = 45 min · 0,1 h = 6 min.
//
// ⭐ LA DIFFICULTÉ DU CHAPITRE TIENT EN UNE LIGNE : le temps ne se compte pas en
// base dix. 8 h 50 + 20 min ne fait pas 8 h 70, et 1,30 h ne vaut pas 1 h 30.
// Chaque micro porte au moins un item sur ce point — c'est là que l'élève tombe.
//
// ⭐ CHAQUE MICRO A SES GÉNÉRATEURS (règle d'or : dix variantes minimum, sinon
// l'élève retombe sur la même question en dix minutes), dont un qui pose une
// question OUVERTE — sans gabarit, une question ouverte se répète elle aussi.

import type { TutorBankItemV4, DureeCanvasData } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "./entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : une durée est un écart entre deux instants ; un horaire est un instant.\n\n" +
    "Méthode : on compte en heures, minutes et secondes — jamais en base dix : 1 h = 60 min et 1 min = 60 s.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/** hh h mm, à la française — et « 9 h » tout court quand il n'y a pas de minute. */
function hhmm(h: number, m: number) {
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

/** Deux horloges côte à côte : le début et la fin, donc la durée entre les deux. */
function deuxHorloges(
  debut: { h: number; m: number },
  fin: { h: number; m: number }
): DureeCanvasData {
  return {
    kind: "duree",
    variant: "double_horloge",
    start: { hour: debut.h, minute: debut.m, label: "début" },
    end: { hour: fin.h, minute: fin.m, label: "fin" },
    display: { showNumbers: true, showLabels: true },
  };
}

/** L'affichage digital : l'heure telle qu'on la lit sur un écran. */
function digital(texte: string, label?: string): DureeCanvasData {
  return { kind: "duree", variant: "digital", digital: { text: texte, label } };
}

/**
 * La frise : la durée devient une LONGUEUR, découpée en étapes.
 * C'est le dessin qui fait comprendre pourquoi on passe par l'heure ronde
 * (de 17 h 40 à 18 h, puis de 18 h à 19 h 30) au lieu de poser une soustraction.
 */
function frise(
  debut: string,
  fin: string,
  etapes: { label: string; minutes: number; color?: string }[]
): DureeCanvasData {
  return {
    kind: "duree",
    variant: "frise",
    frise: { startLabel: debut, endLabel: fin, steps: etapes },
    display: { showLabels: true },
  };
}

// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 05/10 : 6 à 17
// squelettes par micro, 10 à 18 répétitions sur 20. Chaque gabarit compose une
// situation × une tournure × un prénom. Correcteurs : correcteurs/durees.ts.
// Conventions d'écriture (le correcteur s'en sert pour relire) : un HORAIRE
// s'écrit « 17 h 40 » (jamais « 17 h » seul dans un énoncé tiré : minutes de 5
// à 55) ; une DURÉE porte toujours son unité : « 50 min », « 1 h 05 min »,
// « 2 heures ». Jamais de fraction : « trois quarts d'heure », pas « 3/4 h ».

const il = (p: Prenom) => (p.f ? "elle" : "il");
const Il = (p: Prenom) => (p.f ? "Elle" : "Il");
const deux = (n: number) => String(n).padStart(2, "0");
/** Une durée en minutes → « 45 min », « 2 heures », « 1 h 05 min ». */
function ecrireDuree(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return h === 1 ? "1 heure" : `${h} heures`;
  return `${h} h ${deux(m)} min`;
}
/** Les écritures acceptées d'une durée (en minutes). */
function formesDuree(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return [`${m} min`, `${m} minutes`];
  const heures = h === 1 ? "heure" : "heures";
  if (m === 0) return [`${h} ${heures}`, `${h} h`, `${total} min`, `${total} minutes`];
  const f = [`${h} h ${deux(m)} min`, `${h} h ${deux(m)}`, `${h}h${deux(m)}`, `${h} ${heures} ${m} minutes`, `${h} h ${m} min`, `${total} min`, `${total} minutes`];
  return [...new Set(f)];
}
/** Les écritures acceptées d'un horaire. */
function formesHoraire(h: number, m: number) {
  const f = [hhmm(h, m), `${h}h${deux(m)}`, `${h}:${deux(m)}`, `${h} h ${deux(m)}`];
  if (m === 0) f.push(`${h}h`, `${h} heures`);
  if (m > 0 && m < 10) f.push(`${h} h ${m}`, `${h}h${m}`);
  return [...new Set(f)];
}
const hm = (t: number) => hhmm(Math.floor(t / 60) % 24, t % 60);
const majuscule = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ----- CALCULER : un horaire, une durée, l'autre horaire.
type Activite = { nom: string; f: boolean; min: number; max: number; hMin: number; hMax: number };
const ACTIVITES: Activite[] = [
  { nom: "le film", f: false, min: 80, max: 150, hMin: 14, hMax: 21 },
  { nom: "le match de foot", f: false, min: 90, max: 110, hMin: 14, hMax: 20 },
  { nom: "la séance de piscine", f: true, min: 30, max: 90, hMin: 9, hMax: 17 },
  { nom: "le cours de musique", f: false, min: 30, max: 75, hMin: 9, hMax: 18 },
  { nom: "la randonnée", f: true, min: 90, max: 240, hMin: 8, hMax: 14 },
  { nom: "la cuisson du gâteau", f: true, min: 25, max: 55, hMin: 10, hMax: 18 },
  { nom: "le trajet en train", f: false, min: 40, max: 200, hMin: 7, hMax: 19 },
  { nom: "la sieste du chat", f: true, min: 20, max: 120, hMin: 12, hMax: 16 },
  { nom: "l’atelier de bricolage", f: false, min: 45, max: 120, hMin: 9, hMax: 16 },
  { nom: "la partie de jeu de société", f: true, min: 25, max: 100, hMin: 14, hMax: 20 },
  { nom: "le concert", f: false, min: 60, max: 150, hMin: 18, hMax: 21 },
  { nom: "la balade à vélo", f: true, min: 30, max: 150, hMin: 9, hMax: 17 },
  { nom: "la visite du zoo", f: true, min: 90, max: 210, hMin: 9, hMax: 14 },
  { nom: "l’entraînement de basket", f: false, min: 60, max: 120, hMin: 14, hMax: 19 },
  { nom: "l’émission de sciences", f: true, min: 25, max: 60, hMin: 17, hMax: 20 },
  { nom: "le trajet en bus", f: false, min: 15, max: 70, hMin: 7, hMax: 18 },
  { nom: "le spectacle de danse", f: false, min: 60, max: 120, hMin: 15, hMax: 20 },
  { nom: "la sortie au musée", f: true, min: 60, max: 180, hMin: 9, hMax: 15 },
  { nom: "la course d’orientation", f: true, min: 40, max: 120, hMin: 9, hMax: 16 },
  { nom: "la cuisson de la tarte", f: true, min: 30, max: 50, hMin: 11, hMax: 19 },
];
const pron = (a: Activite) => (a.f ? "elle" : "il");

/** ★1 : dans la même heure (ou jusqu'à l'heure ronde). ★2 : on passe l'heure. ★3 : on recule, ou durée en h et min. */
/** Les activités qui peuvent durer moins d'une heure (★1, erreur « 8 h 70 »). */
const COURTES = ACTIVITES.filter((x) => x.min <= 30);
function genCalculer(etoile: 1 | 2 | 3, sorte?: "fin" | "duree" | "debut") {
  const a = pick(etoile === 1 ? COURTES : ACTIVITES);
  const p = pick(PRENOMS);
  const s = sorte ?? (etoile === 3 ? pick(["debut", "debut", "fin", "duree"] as const) : pick(["fin", "duree"] as const));
  let debut: number;
  let d: number;
  for (;;) {
    const h1 = randomInt(a.hMin, a.hMax);
    const m1 = randomInt(1, 11) * 5;
    debut = h1 * 60 + m1;
    if (etoile === 1) {
      d = randomInt(1, Math.floor((60 - m1) / 5)) * 5;
      if (d < a.min) continue;
    } else d = randomInt(a.min, a.max);
    const fin = debut + d;
    if (etoile >= 2 && Math.floor(fin / 60) === h1) continue; // on doit passer l'heure
    if (fin % 60 === 0) continue; // l'horaire tiré garde ses minutes (« 15 h 20 », jamais « 15 h »)
    if (fin >= 23 * 60 + 55) continue;
    break;
  }
  const fin = debut + d;
  const A = majuscule(a.nom);
  const D = etoile === 3 ? ecrireDuree(d) : `${d} min`;
  if (s === "fin") {
    const text = pick([
      `${A} commence à ${hm(debut)} et dure ${D}.\nÀ quelle heure se termine-t-${pron(a)} ?`,
      `${p.nom} commence ${a.nom} à ${hm(debut)}. ${majuscule(pron(a))} dure ${D}.\nÀ quelle heure ${p.nom} aura-t-${il(p)} fini ?`,
      `${A} débute à ${hm(debut)}. ${majuscule(pron(a))} dure ${D}.\nCalcule l’heure de fin.`,
      `Il est ${hm(debut)}. ${p.nom} commence ${a.nom}, qui dure ${D}.\nQuelle heure sera-t-il à la fin ?`,
    ]);
    return {
      text,
      format: "short" as const,
      expected: formesHoraire(Math.floor(fin / 60), fin % 60),
      comparator: "exact_text" as const,
      explanation: expl(Math.floor(fin / 60) === Math.floor(debut / 60) || fin % 60 === 0
        ? `${hm(debut)} + ${D} = ${hm(fin)}.`
        : `On avance d’abord jusqu’à l’heure ronde : de ${hm(debut)} à ${Math.floor(debut / 60) + 1} h, il y a ${60 - (debut % 60)} min. Il reste ${ecrireDuree(d - (60 - (debut % 60)))} à ajouter : on arrive à ${hm(fin)}.`),
      canvas: digital(`${Math.floor(debut / 60)}:${deux(debut % 60)}`, "début"),
    };
  }
  if (s === "debut") {
    const text = pick([
      `${A} se termine à ${hm(fin)}. ${majuscule(pron(a))} a duré ${D}.\nÀ quelle heure a-t-${pron(a)} commencé ?`,
      `${p.nom} finit ${a.nom} à ${hm(fin)}. ${majuscule(pron(a))} a duré ${D}.\nÀ quelle heure ${p.nom} a-t-${il(p)} commencé ?`,
      `${A} finit à ${hm(fin)} et dure ${D}.\nCalcule l’heure du début.`,
    ]);
    return {
      text,
      format: "short" as const,
      expected: formesHoraire(Math.floor(debut / 60), debut % 60),
      comparator: "exact_text" as const,
      explanation: expl(`On recule de ${D} à partir de ${hm(fin)} : ${hm(fin)} − ${D} = ${hm(debut)}.`),
      canvas: digital(`${Math.floor(fin / 60)}:${deux(fin % 60)}`, "fin"),
    };
  }
  const text = pick([
    `${A} commence à ${hm(debut)} et se termine à ${hm(fin)}.\nCombien de temps dure-t-${pron(a)} ?`,
    `${p.nom} commence ${a.nom} à ${hm(debut)} et le termine à ${hm(fin)}.\nQuelle est la durée ?`.replace("le termine", a.f ? "la termine" : "le termine"),
    `Début : ${hm(debut)}. Fin : ${hm(fin)}.\nCalcule la durée ${a.nom.startsWith("le ") ? "du " + a.nom.slice(3) : "de " + a.nom}.`,
    `${A} débute à ${hm(debut)}. ${p.nom} regarde l’horloge à la fin : ${hm(fin)}.\nCombien de temps a duré ${a.nom} ?`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: formesDuree(d),
    comparator: "number_equal" as const,
    explanation: expl(Math.floor(fin / 60) === Math.floor(debut / 60)
      ? `De ${hm(debut)} à ${hm(fin)}, il y a ${d} min.`
      : `De ${hm(debut)} à ${Math.floor(debut / 60) + 1} h : ${60 - (debut % 60)} min. Puis de ${Math.floor(debut / 60) + 1} h à ${hm(fin)} : ${ecrireDuree(fin - (Math.floor(debut / 60) + 1) * 60)}. En tout : ${ecrireDuree(d)}.`),
    canvas: deuxHorloges({ h: Math.floor(debut / 60), m: debut % 60 }, { h: Math.floor(fin / 60), m: fin % 60 }),
  };
}

/** ★4 : l'erreur de « base dix » d'un camarade, à corriger. */
function genCalculerErreur() {
  const p = pick(PRENOMS);
  if (Math.random() < 0.5) {
    const a = pick(COURTES);
    // 8 h 50 + 20 min « = 8 h 70 ».
    for (;;) {
      const h = randomInt(Math.max(7, a.hMin), Math.min(21, a.hMax));
      const m = randomInt(7, 11) * 5;
      const d = randomInt(Math.max(2, 13 - m / 5), Math.min(11, 19 - m / 5)) * 5;
      if (m + d < 65 || m + d > 95 || d < a.min) continue;
      const fin = h * 60 + m + d;
      return {
        text: pick([
          `${p.nom} calcule la fin ${a.nom.startsWith("le ") ? "du " + a.nom.slice(3) : "de " + a.nom} : ${hm(h * 60 + m)} + ${d} min. ${Il(p)} écrit « ${h} h ${m + d} ».\nQuelle est la bonne heure de fin ?`,
          `${majuscule(a.nom)} commence à ${hm(h * 60 + m)} et dure ${d} min. ${p.nom} annonce : « fin à ${h} h ${m + d} ».\nCorrige : à quelle heure ${a.nom} se termine-t-${pron(a)} ?`,
          `Sur son cahier, ${p.nom} a écrit : ${hm(h * 60 + m)} + ${d} min = ${h} h ${m + d}.\nQuelle heure faut-il écrire à la place ?`,
        ]),
        format: "short" as const,
        expected: formesHoraire(Math.floor(fin / 60), fin % 60),
        comparator: "exact_text" as const,
        explanation: expl(`${m} + ${d} = ${m + d} minutes, mais une heure n’en contient que 60. ${m + d} min = 1 h ${deux(m + d - 60)} min. Donc ${hm(h * 60 + m)} + ${d} min = ${hm(fin)}.`),
      };
    }
  }
  // 10 h 20 − 8 h 45 « = 1 h 75 » (retenue de 100 au lieu de 60).
  const a = pick(ACTIVITES.filter((x) => x.max >= 90));
  for (;;) {
    const h1 = randomInt(Math.max(7, a.hMin), Math.min(19, a.hMax));
    const m1 = randomInt(5, 11) * 5;
    const h2 = h1 + randomInt(1, 3);
    const m2 = randomInt(1, m1 / 5 - 1) * 5;
    if (m2 >= m1 || m2 + 100 - m1 < 60) continue; // l'erreur doit se voir : plus de 60 « minutes »
    const faux = `${h2 - 1 - h1} h ${m2 + 100 - m1} min`;
    const d = h2 * 60 + m2 - (h1 * 60 + m1);
    if (d < a.min || d > a.max) continue;
    return {
      text: pick([
        `${majuscule(a.nom)} va de ${hm(h1 * 60 + m1)} à ${hm(h2 * 60 + m2)}. ${p.nom} pose une soustraction et trouve ${faux}.\nQuelle est la vraie durée ?`,
        `${p.nom} calcule la durée ${a.nom.startsWith("le ") ? "du " + a.nom.slice(3) : "de " + a.nom}, de ${hm(h1 * 60 + m1)} à ${hm(h2 * 60 + m2)}. ${Il(p)} trouve ${faux}.\nCorrige son résultat.`,
        `De ${hm(h1 * 60 + m1)} à ${hm(h2 * 60 + m2)}, ${p.nom} trouve ${faux}. C’est faux : une heure ne vaut pas 100 minutes.\nQuelle est la bonne durée ?`,
      ]),
      format: "short" as const,
      expected: formesDuree(d),
      comparator: "number_equal" as const,
      explanation: expl(`On passe par l’heure ronde. De ${hm(h1 * 60 + m1)} à ${h1 + 1} h : ${60 - m1} min. De ${h1 + 1} h à ${hm(h2 * 60 + m2)} : ${ecrireDuree(h2 * 60 + m2 - (h1 + 1) * 60)}. En tout : ${ecrireDuree(d)}.`),
      canvas: deuxHorloges({ h: h1, m: m1 }, { h: h2, m: m2 }),
    };
  }
}

// ----- CONVERTIR : 1 h = 60 min, 1 min = 60 s, 1 jour = 24 h, 1 semaine = 7 jours, 1 an = 12 mois.
type UniteTemps = "s" | "min" | "h" | "jours" | "semaines" | "mois" | "ans";
const NOM_TEMPS: Record<UniteTemps, [string, string]> = {
  s: ["seconde", "secondes"], min: ["minute", "minutes"], h: ["heure", "heures"],
  jours: ["jour", "jours"], semaines: ["semaine", "semaines"], mois: ["mois", "mois"], ans: ["an", "ans"],
};
/** « 1 heure », « 3 heures », « 1 an », « 5 ans ». */
const qte = (n: number, u: UniteTemps) => `${n} ${NOM_TEMPS[u][n === 1 ? 0 : 1]}`;
/** Écriture courte d'une réponse : « 180 min », « 240 s », « 72 h », « 14 jours », « 36 mois ». */
const court = (n: number, u: UniteTemps) => (u === "s" || u === "min" || u === "h" ? `${n} ${u}` : qte(n, u));
type Paire = { g: UniteTemps; p: UniteTemps; k: number; kMax: number; ctx: ((pr: Prenom, d: string) => string)[] };
const PAIRES_TEMPS: Paire[] = [
  { g: "h", p: "min", k: 60, kMax: 9, ctx: [
    (_pr, d) => `Le tournoi de foot dure ${d}.`, (pr, d) => `La randonnée ${de(pr.nom)} dure ${d}.`,
    (pr, d) => `En voiture, le trajet des vacances ${de(pr.nom)} dure ${d}.`, (_pr, d) => `La fête de l’école dure ${d}.` ] },
  { g: "min", p: "s", k: 60, kMax: 9, ctx: [
    (pr, d) => `${pr.nom} fait la planche pendant ${d}.`, (_pr, d) => `La chanson préférée de la classe dure ${d}.`,
    (_pr, d) => `La pause entre deux matchs dure ${d}.`, (pr, d) => `${pr.nom} se brosse les dents pendant ${d}.` ] },
  { g: "jours", p: "h", k: 24, kMax: 9, ctx: [
    (pr, d) => `Le camp scout ${de(pr.nom)} dure ${d}.`, (_pr, d) => `La tempête a duré ${d}.`,
    (_pr, d) => `Les graines de haricot germent en ${d}.`, (_pr, d) => `La croisière dure ${d}.` ] },
  { g: "semaines", p: "jours", k: 7, kMax: 9, ctx: [
    (_pr, d) => `Les vacances d’été durent ${d}.`, (pr, d) => `Le stage de natation ${de(pr.nom)} dure ${d}.`,
    (_pr, d) => `Les œufs de la poule éclosent après ${d}.`, (_pr, d) => `Le chantier du gymnase dure ${d}.` ] },
  { g: "ans", p: "mois", k: 12, kMax: 9, ctx: [
    (pr, d) => `Le chien ${de(pr.nom)} a ${d}.`, (pr, d) => `${pr.nom} joue du piano depuis ${d}.`,
    (_pr, d) => `Le contrat de location du vélo dure ${d}.`, (pr, d) => `${pr.nom} habite dans sa ville depuis ${d}.` ] },
];
/** « de minutes », « d’heures », « d’ans ». */
const deNom = (u: UniteTemps) => (/^[aeiouh]/.test(NOM_TEMPS[u][1]) ? `d’${NOM_TEMPS[u][1]}` : `de ${NOM_TEMPS[u][1]}`);
const QUESTIONS_CONV = [
  (u: UniteTemps) => `Combien cela fait-il ${deNom(u)} ?`,
  (u: UniteTemps) => `Écris cette durée en ${NOM_TEMPS[u][1]}.`,
  (u: UniteTemps) => `Combien ${deNom(u)} cela représente-t-il ?`,
  (u: UniteTemps) => `Convertis cette durée en ${NOM_TEMPS[u][1]}.`,
];
/** ★1 : k grandes unités → petites unités. */
function genConvertirSimple() {
  const c = pick(PAIRES_TEMPS);
  const pr = pick(PRENOMS);
  const n = randomInt(2, c.kMax);
  const r = n * c.k;
  const text = Math.random() < 0.75
    ? `${pick(c.ctx)(pr, qte(n, c.g))}\n${pick(QUESTIONS_CONV)(c.p)}`
    : pick([`Complète : ${qte(n, c.g)} = … ${NOM_TEMPS[c.p][1]}`, `Combien y a-t-il ${deNom(c.p)} dans ${qte(n, c.g)} ?`]);
  return {
    text,
    format: "short" as const,
    expected: [...new Set([court(r, c.p), qte(r, c.p)])],
    comparator: "number_equal" as const,
    explanation: expl(`1 ${NOM_TEMPS[c.g][0]} = ${court(c.k, c.p)}. Donc ${qte(n, c.g)} = ${n} × ${c.k} = ${court(r, c.p)}.`),
  };
}
/** « a grandes et b petites » (b < k), avec ses écritures acceptées. */
function composee(a: number, b: number, c: Paire) {
  const bb = c.p === "min" || c.p === "s" ? deux(b) : String(b);
  const principale = c.p === "min" || c.p === "s" ? `${court(a, c.g)} ${bb} ${c.p}` : `${court(a, c.g)} ${court(b, c.p)}`;
  const f = [principale, `${qte(a, c.g)} ${qte(b, c.p)}`, `${qte(a, c.g)} et ${qte(b, c.p)}`, `${court(a, c.g)} ${court(b, c.p)}`];
  if (c.g === "h") f.push(`${a}h${bb}`, `${a} h ${bb}`);
  if (c.g === "min") f.push(`${a}min${bb}s`, `${a} min ${bb}`);
  return [...new Set(f)];
}
/** ★2 : minutes → h et min (ou secondes → min et s), et l'inverse. ★3 : heures → jours et heures, jours → semaines et jours, mois → ans et mois. */
function genConvertirCompose(etoile: 2 | 3, sens: "decomposer" | "regrouper") {
  const choix = etoile === 2 ? PAIRES_TEMPS.slice(0, 2) : PAIRES_TEMPS.slice(2);
  const c = pick(choix);
  const pr = pick(PRENOMS);
  const a = randomInt(1, etoile === 2 ? 5 : 6);
  const b = randomInt(1, c.k - 1);
  const total = a * c.k + b;
  const ctxPetit = (d: string) => pick(c.ctx)(pr, d);
  if (sens === "decomposer") {
    return {
      text: Math.random() < 0.75
        ? `${ctxPetit(qte(total, c.p))}\n${pick([
            `Écris cette durée en ${NOM_TEMPS[c.g][1]} et ${NOM_TEMPS[c.p][1]}.`,
            `Combien cela fait-il ${deNom(c.g)} et ${deNom(c.p)} ?`,
            `Convertis cette durée en ${NOM_TEMPS[c.g][1]} et ${NOM_TEMPS[c.p][1]}.`,
          ])}`
        : `Écris ${qte(total, c.p)} en ${NOM_TEMPS[c.g][1]} et ${NOM_TEMPS[c.p][1]}.`,
      format: "short" as const,
      expected: composee(a, b, c),
      comparator: "exact_text" as const,
      explanation: expl(`On cherche combien de fois ${c.k} va dans ${total} : ${a} × ${c.k} = ${a * c.k} et il reste ${total} − ${a * c.k} = ${b}. Donc ${qte(total, c.p)} = ${qte(a, c.g)} et ${qte(b, c.p)}.`),
    };
  }
  return {
    text: Math.random() < 0.75
      ? `${ctxPetit(`${qte(a, c.g)} et ${qte(b, c.p)}`)}\n${pick(QUESTIONS_CONV)(c.p)}`
      : `Écris ${qte(a, c.g)} et ${qte(b, c.p)} en ${NOM_TEMPS[c.p][1]}.`,
    format: "short" as const,
    expected: [...new Set([court(total, c.p), qte(total, c.p)])],
    comparator: "number_equal" as const,
    explanation: expl(`${qte(a, c.g)} = ${a} × ${c.k} = ${court(a * c.k, c.p)}. On ajoute ${court(b, c.p)} : ${a * c.k} + ${b} = ${court(total, c.p)}.`),
  };
}
/** ★3 : laquelle de deux durées est la plus longue ? (unités différentes) */
function genConvertirComparer() {
  const c = pick(PAIRES_TEMPS);
  const pr = pick(PRENOMS);
  for (;;) {
    const n = randomInt(2, 8);
    const autre = n * c.k + randomInt(-Math.floor(c.k / 2), Math.floor(c.k / 2));
    if (autre === n * c.k || autre <= 0) continue;
    const A = qte(n, c.g);
    const B = qte(autre, c.p);
    const plusLong = autre > n * c.k ? B : A;
    return {
      text: pick([
        `${pr.nom} hésite entre deux durées : ${A} ou ${B}.\nLaquelle est la plus longue ?`,
        `Une activité dure ${A}. Une autre dure ${B}.\nLaquelle dure le plus longtemps ?`,
        `Quelle durée est la plus longue : ${B} ou ${A} ?`,
      ]),
      format: "qcm" as const,
      choices: shuffle([A, B, "les deux durées sont égales"]),
      expected: [plusLong],
      comparator: "mcq_exact" as const,
      explanation: expl(`${A} = ${n} × ${c.k} = ${court(n * c.k, c.p)}. On compare ${court(n * c.k, c.p)} et ${court(autre, c.p)} : la plus longue est ${plusLong}.`),
    };
  }
}
/** ★4 : trois unités (secondes → h, min, s ; heures → semaines, jours, heures). */
function genConvertirTrois() {
  const pr = pick(PRENOMS);
  if (Math.random() < 0.5) {
    const h = randomInt(1, 9);
    const m = randomInt(1, 59);
    const s = randomInt(1, 59);
    const total = h * 3600 + m * 60 + s;
    const T = String(total).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return {
      text: `${pick([
        `Le chronomètre ${de(pr.nom)} affiche ${T} secondes.`,
        `La course de relais ${de(pr.nom)} a duré ${T} secondes.`,
        `Le film d’animation ${de(pr.nom)} a duré ${T} secondes de tournage.`,
        `${pr.nom} a joué de la musique pendant ${T} secondes cette semaine.`,
        `La tablette ${de(pr.nom)} a compté ${T} secondes de lecture.`,
        `${pr.nom} a observé les étoiles pendant ${T} secondes.`,
      ])}\n${pick([
        "Écris cette durée en heures, minutes et secondes.",
        "Convertis cette durée en heures, minutes et secondes.",
        "Combien cela fait-il d’heures, de minutes et de secondes ?",
      ])}`,
      format: "short" as const,
      expected: [`${h} h ${deux(m)} min ${deux(s)} s`, `${h} h ${m} min ${s} s`, `${h}h${deux(m)}min${deux(s)}s`, `${h} h ${deux(m)} min ${deux(s)}`],
      comparator: "exact_text" as const,
      explanation: expl(`1 h = 3 600 s. ${h} × 3 600 = ${String(h * 3600).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} et il reste ${total - h * 3600} s. Puis ${m} × 60 = ${m * 60} et il reste ${s} s. Donc ${T} s = ${h} h ${deux(m)} min ${deux(s)} s.`),
    };
  }
  const sem = randomInt(1, 4);
  const j = randomInt(1, 6);
  const h = randomInt(1, 23);
  const total = sem * 168 + j * 24 + h;
  return {
    text: `${pick([
      `L’expédition en bateau ${de(pr.nom)} dure ${total} heures.`,
      `Dans le livre ${de(pr.nom)}, la fusée met ${total} heures à rejoindre la station spatiale.`,
      `Le colis ${de(pr.nom)} a voyagé pendant ${total} heures.`,
      `${pr.nom} a suivi la migration des oiseaux pendant ${total} heures.`,
      `Le voilier de l’oncle ${de(pr.nom)} a navigué ${total} heures.`,
      `La plante ${de(pr.nom)} a fleuri après ${total} heures.`,
    ])}\n${pick([
      "Écris cette durée en semaines, jours et heures.",
      "Convertis cette durée en semaines, jours et heures.",
      "Combien cela fait-il de semaines, de jours et d’heures ?",
    ])}`,
    format: "short" as const,
    expected: [`${qte(sem, "semaines")} ${qte(j, "jours")} ${qte(h, "h")}`, `${qte(sem, "semaines")}, ${qte(j, "jours")} et ${qte(h, "h")}`, `${qte(sem, "semaines")} ${qte(j, "jours")} ${h} h`],
    comparator: "exact_text" as const,
    explanation: expl(`1 jour = 24 h et 1 semaine = 7 jours = 168 h. ${total} ÷ 24 : ${sem * 7 + j} × 24 = ${(sem * 7 + j) * 24} et il reste ${h} h. Puis ${sem * 7 + j} jours = ${sem} × 7 + ${j}. Donc ${total} h = ${qte(sem, "semaines")}, ${qte(j, "jours")} et ${qte(h, "h")}.`),
  };
}

// ----- DÉCIMALE : 0,5 h = 30 min, 0,25 h = 15 min, 0,1 h = 6 min.
const virgule = (v: number) => String(v).replace(".", ",");
const CTX_DECIMALE: ((p: Prenom, d: string) => string)[] = [
  (p, d) => `La randonnée ${de(p.nom)} dure ${d}.`,
  (p, d) => `Le GPS annonce à ${p.nom} un trajet de ${d}.`,
  (p, d) => `Le tableur du club de ${p.nom} indique ${d} d’entraînement.`,
  (p, d) => `Le film que regarde ${p.nom} dure ${d}.`,
  (p, d) => `La calculatrice ${de(p.nom)} affiche ${d} pour le trajet.`,
  (p, d) => `Pour la recette ${de(p.nom)}, la pâte repose ${d}.`,
  (p, d) => `Le vol en avion ${de(p.nom)} dure ${d}.`,
  (p, d) => `La séance de piscine ${de(p.nom)} dure ${d}.`,
  (p, d) => `${p.nom} lit ${d} par jour pendant les vacances.`,
  (p, d) => `Le site de la gare indique à ${p.nom} un voyage de ${d}.`,
  (p, d) => `La montre de sport ${de(p.nom)} compte ${d} de vélo.`,
  (p, d) => `${p.nom} a jardiné ${d} ce week-end.`,
];
/** Une durée décimale en heures, selon l'étoile : demis (★1), quarts (★2), dixièmes (★3). */
function dureeDecimale(etoile: 1 | 2 | 3) {
  const h = randomInt(0, 3);
  const partie = etoile === 1 ? 0.5 : etoile === 2 ? pick([0.25, 0.75]) : randomInt(1, 9) / 10;
  if (etoile === 3 && partie === 0.5) return dureeDecimale(3);
  return { v: h + partie, min: Math.round((h + partie) * 60) };
}
function genDecimale(etoile: 1 | 2 | 3) {
  const p = pick(PRENOMS);
  const { v, min } = dureeDecimale(etoile);
  const ctx = pick(CTX_DECIMALE);
  const methode = etoile === 1
    ? "0,5 h, c’est une demi-heure, soit 30 min."
    : etoile === 2
      ? "0,25 h, c’est un quart d’heure (15 min) ; 0,75 h, ce sont trois quarts d’heure (45 min)."
      : "0,1 h, c’est un dixième d’heure : 60 ÷ 10 = 6 min.";
  const sens = pick(["min", "hmin", "inverse"] as const);
  if (sens === "inverse" && min >= 60) {
    return {
      text: `${ctx(p, ecrireDuree(min))}\n${pick([
        "Écris cette durée en heures, avec une virgule.",
        "Quelle est cette durée en heures, sous forme décimale ?",
        "Écris cette durée sous forme décimale, en heures.",
      ])}`,
      format: "short" as const,
      expected: [`${virgule(v)} h`, `${virgule(v)} heures`],
      comparator: "number_equal" as const,
      explanation: expl(`${methode} ${min % 60} min = ${virgule(arrondi2((min % 60) / 60))} h. Donc ${ecrireDuree(min)} = ${virgule(v)} h.`),
    };
  }
  if (sens === "hmin" && min >= 60) {
    return {
      text: `${ctx(p, `${virgule(v)} h`)}\n${pick(["Écris cette durée en heures et minutes.", "Combien cela fait-il d’heures et de minutes ?"])}`,
      format: "short" as const,
      expected: formesDuree(min).filter((f) => !/^\d+ min/.test(f)),
      comparator: "number_equal" as const,
      explanation: expl(`${methode} ${virgule(v)} h = ${Math.floor(v)} h + ${virgule(arrondi2(v - Math.floor(v)))} h = ${ecrireDuree(min)}.`),
    };
  }
  return {
    text: `${ctx(p, `${virgule(v)} h`)}\n${pick(["Combien de minutes cela fait-il ?", "Écris cette durée en minutes.", "Combien de minutes cela représente-t-il ?"])}`,
    format: "short" as const,
    expected: [`${min} min`, `${min} minutes`],
    comparator: "number_equal" as const,
    explanation: expl(`${methode} ${virgule(v)} h = ${virgule(v)} × 60 min = ${min} min.`),
  };
}
const arrondi2 = (x: number) => Math.round(x * 100) / 100;
/** ★4 : le piège « 1,3 h = 1 h 30 min ». */
function genDecimalePiege() {
  const p = pick(PRENOMS);
  const h = randomInt(1, 4);
  if (Math.random() < 0.5) {
    const d = pick([1, 2, 3, 4, 5]); // la fausse lecture « 1 h 30 min » reste un horaire possible
    const v = h + d / 10;
    const min = h * 60 + d * 6;
    return {
      text: pick([
        `${p.nom} lit « ${virgule(v)} h » et pense que cela fait ${h} h ${d}0 min.\nQuelle est la vraie durée, en heures et minutes ?`,
        `Sur l’écran du club, ${p.nom} voit ${virgule(v)} h. ${Il(p)} croit que c’est ${h} h ${d}0 min.\nCorrige : combien d’heures et de minutes ?`,
        `${virgule(v)} h, est-ce ${h} h ${d}0 min ? ${p.nom} hésite.\nÉcris ${virgule(v)} h en heures et minutes.`,
      ]),
      format: "short" as const,
      expected: formesDuree(min).filter((f) => !/^\d+ min/.test(f)),
      comparator: "number_equal" as const,
      explanation: expl(`Le chiffre après la virgule compte des dixièmes d’heure, pas des minutes. 0,${d} h = ${d} × 6 = ${d * 6} min. Donc ${virgule(v)} h = ${ecrireDuree(min)}, et non ${h} h ${d}0 min.`),
    };
  }
  const m = pick([15, 30, 45, 6, 12, 18, 24, 36, 42, 48, 54]);
  const juste = arrondi2(h + m / 60);
  const faux = [virgule(arrondi2(h + m / 100)), virgule(arrondi2(h + 0.5)), virgule(arrondi2(h + 0.25)), virgule(arrondi2(h + 0.75)), virgule(arrondi2(h + 0.6))]
    .filter((x) => x !== virgule(juste));
  const choix = [virgule(juste), ...shuffle([...new Set(faux)]).slice(0, 3)].map((x) => `${x} h`);
  return {
    text: pick([
      `${p.nom} a couru ${h} h ${deux(m)} min.\nQuelle écriture décimale est égale à cette durée ?`,
      `Pour son tableau, ${p.nom} doit écrire ${h} h ${deux(m)} min en heures, avec une virgule.\nQuelle est la bonne écriture ?`,
      `Quelle écriture est égale à ${h} h ${deux(m)} min ? ${p.nom} doit choisir.`,
    ]),
    format: "qcm" as const,
    choices: shuffle(choix),
    expected: [`${virgule(juste)} h`],
    comparator: "mcq_exact" as const,
    explanation: expl(`${m} min = ${m} ÷ 60 h = ${virgule(arrondi2(m / 60))} h. Donc ${h} h ${deux(m)} min = ${virgule(juste)} h. Attention : ${h},${deux(m)} h serait faux, car une heure ne fait pas 100 minutes.`),
  };
}

// ----- PROBLÈMES
const SERIES: { quoi: string; min: number[]; ctx: (p: Prenom, n: number, d: number) => string }[] = [
  { quoi: "séances", min: [40, 45, 50, 55], ctx: (p, n, d) => `Le club de natation ${de(p.nom)} propose ${n} séances de ${d} min ce trimestre.` },
  { quoi: "épisodes", min: [22, 25, 26, 42, 45], ctx: (p, n, d) => `${p.nom} regarde une série : ${n} épisodes de ${d} min.` },
  { quoi: "chansons", min: [3, 4, 5], ctx: (p, n, d) => `L’album préféré ${de(p.nom)} compte ${n} chansons de ${d} min.` },
  { quoi: "leçons", min: [30, 35, 45], ctx: (p, n, d) => `${p.nom} prend ${n} leçons de guitare de ${d} min.` },
  { quoi: "séances", min: [55, 60, 90], ctx: (p, n, d) => `Au théâtre, la troupe ${de(p.nom)} répète pendant ${n} séances de ${d} min.` },
  { quoi: "tours", min: [3, 4, 6], ctx: (p, n, d) => `À la fête foraine, ${p.nom} fait ${n} tours de grande roue de ${d} min.` },
  { quoi: "séances", min: [45, 50, 60], ctx: (p, n, d) => `${p.nom} va au club d’escalade : ${n} séances de ${d} min.` },
  { quoi: "épisodes", min: [20, 30, 35], ctx: (p, n, d) => `${p.nom} écoute ${n} épisodes d’un podcast de sciences, de ${d} min chacun.` },
];
const TRAJETS: { a: string; b: (p: Prenom, d: number) => string; d1: [number, number]; d2: [number, number] }[] = [
  { a: "marche jusqu’à la gare", b: (_p, d) => `le train roule ${d} min`, d1: [8, 25], d2: [30, 95] },
  { a: "attend le bus", b: (_p, d) => `le trajet en bus dure ${d} min`, d1: [5, 15], d2: [15, 50] },
  { a: "roule à vélo jusqu’au lac", b: (p, d) => `${il(p)} fait le tour du lac à pied en ${d} min`, d1: [20, 45], d2: [35, 80] },
  { a: "prend le métro", b: (p, d) => `${il(p)} marche jusqu’au musée en ${d} min`, d1: [15, 35], d2: [5, 15] },
  { a: "prépare son sac", b: (_p, d) => `le trajet en voiture dure ${d} min`, d1: [10, 20], d2: [25, 75] },
  { a: "fait ses devoirs", b: (p, d) => `${il(p)} joue au foot pendant ${d} min`, d1: [25, 50], d2: [40, 70] },
  { a: "range sa chambre", b: (p, d) => `${il(p)} lit une bande dessinée pendant ${d} min`, d1: [15, 30], d2: [20, 45] },
];
function genProblemeDurees(etoile: 3 | 4) {
  const p = pick(PRENOMS);
  const famille = etoile === 3 ? pick(["serie", "trajet"] as const) : pick(["temps", "tard", "pauses"] as const);
  if (famille === "serie") {
    const s = pick(SERIES);
    const d = pick(s.min);
    const n = randomInt(d < 10 ? 8 : 3, d < 10 ? 20 : 14);
    const total = n * d;
    if (total < 60) return genProblemeDurees(etoile);
    return {
      text: `${s.ctx(p, n, d)}\n${pick(["Quelle est la durée totale, en heures et minutes ?", "Combien de temps cela fait-il en tout ? Réponds en heures et minutes.", "Calcule la durée totale en heures et minutes."])}`,
      format: "short" as const,
      expected: formesDuree(total).filter((f) => !/^\d+ min/.test(f)),
      comparator: "number_equal" as const,
      explanation: expl(`${n} × ${d} = ${total} minutes. Puis ${total} = ${Math.floor(total / 60)} × 60 + ${total % 60} : la durée totale est ${ecrireDuree(total)}.`),
    };
  }
  if (famille === "trajet") {
    const t = pick(TRAJETS);
    const debut = randomInt(7 * 12 + 1, 17 * 12 - 1) * 5;
    const d1 = randomInt(t.d1[0], t.d1[1]);
    const d2 = randomInt(t.d2[0], t.d2[1]);
    const fin = debut + d1 + d2;
    if (debut % 60 === 0 || fin % 60 === 0) return genProblemeDurees(etoile);
    return {
      text: `À ${hm(debut)}, ${p.nom} ${t.a} : cela prend ${d1} min. Ensuite, ${t.b(p, d2)}.\n${pick([`À quelle heure ${p.nom} a-t-${il(p)} fini ?`, "Quelle heure est-il à la fin ?", "Calcule l’heure de fin."])}`,
      format: "short" as const,
      expected: formesHoraire(Math.floor(fin / 60), fin % 60),
      comparator: "exact_text" as const,
      explanation: expl(`${d1} + ${d2} = ${d1 + d2} min, soit ${ecrireDuree(d1 + d2)}. ${hm(debut)} + ${ecrireDuree(d1 + d2)} = ${hm(fin)}.`),
    };
  }
  if (famille === "temps") {
    const [aLieu, leLieu] = pick([
      ["à l’arrêt de bus", "l’arrêt de bus"], ["à la gare", "la gare"], ["au stade", "le stade"], ["à la piscine", "la piscine"],
      ["au cinéma", "le cinéma"], ["au collège", "le collège"], ["à la salle de concert", "la salle de concert"],
    ]);
    const now = randomInt(7 * 12 + 1, 18 * 12 - 1) * 5 + randomInt(0, 4);
    const trajet = randomInt(8, 40);
    const marge = pick([-1, 1]) * randomInt(2, 12);
    const depart = now + trajet + marge;
    if (now % 60 === 0 || depart % 60 === 0 || depart <= now + 5) return genProblemeDurees(etoile);
    const ok = marge > 0;
    return {
      text: pick([
        `Il est ${hm(now)}. ${p.nom} met ${trajet} min pour aller ${aLieu}. Le rendez-vous est à ${hm(depart)}.\n${p.nom} sera-t-${il(p)} à temps ?`,
        `${p.nom} part à ${hm(now)} pour ${leLieu}, à ${trajet} min de chez ${p.f ? "elle" : "lui"}. Il faut y être à ${hm(depart)}.\nArrivera-t-${il(p)} à temps ?`,
        `Le départ est prévu à ${hm(depart)} devant ${leLieu}. ${p.nom} quitte la maison à ${hm(now)} et marche ${trajet} min.\nSera-t-${il(p)} à temps ?`,
      ]),
      format: "qcm" as const,
      choices: ["oui", "non"],
      expected: [ok ? "oui" : "non"],
      comparator: "mcq_exact" as const,
      explanation: expl(`${hm(now)} + ${trajet} min = ${hm(now + trajet)}. Le rendez-vous est à ${hm(depart)} : ${p.nom} arrive ${Math.abs(marge)} min ${ok ? "avant, donc à temps" : "après, donc en retard"}.`),
    };
  }
  if (famille === "tard") {
    const lieu = pick(["au cinéma", "à la gare", "au match", "au concert", "chez sa grand-mère", "à l’entraînement", "au musée"]);
    const rdv = randomInt(9 * 12 + 1, 20 * 12 - 1) * 5;
    const prep = randomInt(2, 8) * 5;
    const trajet = randomInt(10, 55);
    const debut = rdv - prep - trajet;
    if (rdv % 60 === 0 || debut % 60 === 0) return genProblemeDurees(etoile);
    return {
      text: `${p.nom} doit être ${lieu} à ${hm(rdv)}. ${Il(p)} met ${prep} min à se préparer, puis le trajet dure ${trajet} min.\n${pick([`À quelle heure doit-${il(p)} commencer à se préparer, au plus tard ?`, "Quelle est l’heure limite pour commencer à se préparer ?"])}`,
      format: "short" as const,
      expected: formesHoraire(Math.floor(debut / 60), debut % 60),
      comparator: "exact_text" as const,
      explanation: expl(`On recule : ${prep} + ${trajet} = ${prep + trajet} min. ${hm(rdv)} − ${ecrireDuree(prep + trajet)} = ${hm(debut)}.`),
    };
  }
  // Des séances avec des pauses entre elles.
  const quoi = pick(["cours", "matchs", "ateliers", "épreuves"]);
  const n = randomInt(2, 4);
  const d = pick([25, 30, 40, 45, 50, 55]);
  const pause = pick([5, 10, 15]);
  const debut = randomInt(8 * 12 + 1, 15 * 12 - 1) * 5;
  const fin = debut + n * d + (n - 1) * pause;
  if (debut % 60 === 0 || fin % 60 === 0) return genProblemeDurees(etoile);
  return {
    text: `Le tournoi ${de(p.nom)} commence à ${hm(debut)}. Il y a ${n} ${quoi} de ${d} min, avec une pause de ${pause} min entre deux ${quoi}.\n${pick(["À quelle heure le tournoi se termine-t-il ?", `À quelle heure ${p.nom} aura-t-${il(p)} fini ?`])}`.replace("Le tournoi", quoi === "cours" ? "La journée" : "Le tournoi").replace("le tournoi se termine-t-il", quoi === "cours" ? "la journée se termine-t-elle" : "le tournoi se termine-t-il"),
    format: "short" as const,
    expected: formesHoraire(Math.floor(fin / 60), fin % 60),
    comparator: "exact_text" as const,
    explanation: expl(`${n} × ${d} = ${n * d} min de ${quoi}, et ${n - 1} pause${n > 2 ? "s" : ""} de ${pause} min : ${(n - 1) * pause} min. En tout ${n * d + (n - 1) * pause} min, soit ${ecrireDuree(n * d + (n - 1) * pause)}. ${hm(debut)} + ${ecrireDuree(n * d + (n - 1) * pause)} = ${hm(fin)}.`),
  };
}

// ----- DÉFIS
/** « Défi : le réveil… », « Défi : Inès… » (minuscule après les deux-points, sauf un prénom). */
function defi(s: string) {
  const premier = s.split(/[\s’]/)[0];
  return `Défi : ${PRENOMS.some((p) => p.nom === premier) ? s : s.charAt(0).toLowerCase() + s.slice(1)}`;
}
/** ★4 : une même durée répétée n fois à partir d'un horaire. */
function genDefiRepete() {
  const p = pick(PRENOMS);
  for (;;) {
    const cas = randomInt(0, 4);
    const debut = randomInt((cas === 0 ? 6 : 9) * 12 + 1, (cas === 0 ? 8 : 18) * 12 - 1) * 5 + (cas === 0 ? 0 : randomInt(0, 4));
    const n = randomInt(3, 9);
    const k = cas === 0 ? pick([5, 7, 9, 10]) : cas === 4 ? pick([12, 15, 20]) : randomInt(6, 25);
    const fin = debut + n * k;
    if (debut % 60 === 0 || fin % 60 === 0 || fin >= 22 * 60) continue;
    const textes = [
      `Le réveil ${de(p.nom)} sonne à ${hm(debut)}. ${Il(p)} appuie ${n} fois sur « répéter », qui décale la sonnerie de ${k} min à chaque fois.\nÀ quelle heure le réveil sonne-t-il pour de bon ?`,
      `À ${hm(debut)}, ${p.nom} commence une course de karting : ${n} fois le même circuit, de ${k} min chacun.\nÀ quelle heure ${p.nom} a-t-${il(p)} fini ?`,
      `Le manège démarre à ${hm(debut)}. Un tour dure ${k} min et ${p.nom} reste pour ${n} fois de suite.\nÀ quelle heure ${p.nom} descend-${il(p)} du manège ?`,
      `À ${hm(debut)}, ${p.nom} enfourne des cookies : ${n} fois une plaque de ${k} min, l’une après l’autre.\nÀ quelle heure la dernière plaque est-elle cuite ?`,
      `Un bus passe devant chez ${p.nom} à ${hm(debut)}, puis toutes les ${k} min. ${p.nom} laisse passer ce bus et attend ${n} fois ${k} min.\nÀ quelle heure passe le bus qu’${il(p)} prend ?`,
    ];
    return {
      text: defi(textes[cas]),
      format: "short" as const,
      expected: formesHoraire(Math.floor(fin / 60), fin % 60),
      comparator: "exact_text" as const,
      explanation: expl(`${n} × ${k} = ${n * k} min, soit ${ecrireDuree(n * k)}. ${hm(debut)} + ${ecrireDuree(n * k)} = ${hm(fin)}.`),
    };
  }
}
const SOIREES: { quoi: string; f: boolean }[] = [
  { quoi: "l’émission de sciences", f: true }, { quoi: "le film du soir", f: false },
  { quoi: "la nuit d’observation des étoiles", f: true }, { quoi: "la fête du nouvel an", f: true },
  { quoi: "le trajet en bus de nuit", f: false }, { quoi: "la veillée du camp", f: true },
  { quoi: "le concert en plein air", f: false }, { quoi: "la traversée en ferry", f: true },
];
/** ★5 : on passe minuit (en avançant, ou en reculant). */
function genDefiMinuit() {
  const p = pick(PRENOMS);
  const s = pick(SOIREES);
  const pr = s.f ? "elle" : "il";
  for (;;) {
    const debut = randomInt(20 * 12 + 1, 23 * 12 + 11) * 5;
    const d = randomInt(60, 260);
    const fin = debut + d;
    if (fin <= 24 * 60 || debut % 60 === 0 || fin % 60 === 0 || fin >= 30 * 60) continue;
    const D = Math.random() < 0.5 ? `${d} min` : ecrireDuree(d);
    if (Math.random() < 0.65) {
      return {
        text: `Défi : ${pick([
          `${s.quoi} commence à ${hm(debut)} et dure ${D}.\nÀ quelle heure se termine-t-${pr} ?`,
          `${p.nom} commence ${s.quoi} à ${hm(debut)}. ${majuscule(pr)} dure ${D}.\nÀ quelle heure ${p.nom} aura-t-${il(p)} fini ?`,
        ])}`,
        format: "short" as const,
        expected: formesHoraire(Math.floor(fin / 60) - 24, fin % 60),
        comparator: "exact_text" as const,
        explanation: expl(`De ${hm(debut)} à minuit, il y a ${ecrireDuree(24 * 60 - debut)}. Il reste ${ecrireDuree(fin - 24 * 60)} après minuit : ${pr} se termine à ${hm(fin)}, le lendemain.`),
      };
    }
    return {
      text: `Défi : ${pick([
        `${s.quoi} se termine à ${hm(fin)}, après minuit. ${majuscule(pr)} a duré ${D}.\nÀ quelle heure a-t-${pr} commencé ?`,
        `${p.nom} finit ${s.quoi} à ${hm(fin)}, en pleine nuit. ${majuscule(pr)} a duré ${D}.\nÀ quelle heure a-t-${pr} commencé ?`,
      ])}`,
      format: "short" as const,
      expected: formesHoraire(Math.floor(debut / 60), debut % 60),
      comparator: "exact_text" as const,
      explanation: expl(`De minuit à ${hm(fin)}, il y a ${ecrireDuree(fin - 24 * 60)}. Il faut encore reculer de ${ecrireDuree(d - (fin - 24 * 60))} avant minuit : début à ${hm(debut)}, la veille.`),
    };
  }
}
/** ★5 : sur plusieurs jours (« parti jeudi à 22 h 15, 23 h 45 min de course »). */
const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
function genDefiJours() {
  const p = pick(PRENOMS);
  for (;;) {
    const j = randomInt(0, 6);
    const debut = randomInt(6 * 12 + 1, 22 * 12 + 11) * 5;
    const d = randomInt(18 * 12, 44 * 12) * 5 + pick([0, 5, 10]);
    const fin = debut + d;
    if (debut % 60 === 0 || fin % 60 === 0 || d % 60 === 0) continue;
    const jf = (j + Math.floor(fin / 1440)) % 7;
    const hf = fin % 1440;
    const bon = `${JOURS[jf]} à ${hm(hf)}`;
    const leurres = [
      `${JOURS[(jf + 6) % 7]} à ${hm(hf)}`,
      `${JOURS[(jf + 1) % 7]} à ${hm(hf)}`,
      `${JOURS[jf]} à ${hm((hf + 60) % 1440)}`,
      `${JOURS[jf]} à ${hm((hf + 1380) % 1440)}`,
    ].filter((x) => x !== bon);
    const contexte = pick([
      `La sœur ${de(p.nom)} court un trail en montagne. Elle part le ${JOURS[j]} à ${hm(debut)} et court pendant ${ecrireDuree(d)}.`,
      `${p.nom} part en car le ${JOURS[j]} à ${hm(debut)}. Le voyage dure ${ecrireDuree(d)}.`,
      `Le bateau de l’oncle ${de(p.nom)} quitte le port le ${JOURS[j]} à ${hm(debut)}. La traversée dure ${ecrireDuree(d)}.`,
      `Le colis ${de(p.nom)} part de l’entrepôt le ${JOURS[j]} à ${hm(debut)}. Il voyage pendant ${ecrireDuree(d)}.`,
      `L’équipe ${de(p.nom)} lance une expérience de sciences le ${JOURS[j]} à ${hm(debut)}. Elle dure ${ecrireDuree(d)}.`,
    ]);
    return {
      text: `${defi(contexte)}\nQuel jour et à quelle heure est-ce fini ?`,
      format: "qcm" as const,
      choices: shuffle([bon, ...shuffle(leurres).slice(0, 3)]),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation: expl(`24 h font un jour entier. ${ecrireDuree(d)} = ${Math.floor(d / 1440) ? `${Math.floor(d / 1440)} jour et ` : ""}${ecrireDuree(d % 1440)}. ${JOURS[j]} ${hm(debut)} + ${ecrireDuree(d)} = ${bon}.`),
    };
  }
}

export const dureesBank: TutorBankItemV4[] = [
  // =========================
  // DUREE_CALCULER — un instant, une durée, l'autre instant
  // =========================
  {
    kind: "fixed",
    id: "duree_calculer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Une séance de cinéma commence à 17 h 40 et dure 110 minutes. À quelle heure se termine-t-elle ?",
    format: "short",
    expected: ["19 h 30", "19h30", "19:30", "19h 30"],
    comparator: "contains_keyword",
    hint: "Commence par écrire 110 minutes en heures et minutes.",
    explanation: expl(
      "110 min = 60 min + 50 min = 1 h 50 min. On avance d'abord jusqu'à l'heure ronde : de 17 h 40 à 18 h, il y a 20 min. Il reste 1 h 30 min à ajouter : 18 h + 1 h 30 = 19 h 30."
    ),
    tags: ["duree_temps", "calculer", "canvas"],
    canvas: frise("17 h 40", "19 h 30", [
      { label: "jusqu'à 18 h", minutes: 20 },
      { label: "1 h 30 de plus", minutes: 90 },
    ]),
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 1,
    theme: "neutral",
    text: "Un cours commence à 8 h 15 et se termine à 9 h 10. Combien de temps dure-t-il ?",
    format: "short",
    expected: ["55 min", "55 minutes", "55"],
    comparator: "contains_keyword",
    hint: "Passe par 9 h : de 8 h 15 à 9 h, puis de 9 h à 9 h 10.",
    explanation: expl(
      "De 8 h 15 à 9 h, il y a 45 min. De 9 h à 9 h 10, il y a 10 min. La durée du cours est 45 + 10 = 55 min."
    ),
    tags: ["duree_temps", "calculer", "canvas"],
    canvas: deuxHorloges({ h: 8, m: 15 }, { h: 9, m: 10 }),
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Un train part à 14 h 25 et arrive à 16 h 05. Quelle est la durée du trajet ?",
    format: "short",
    expected: ["1 h 40", "1h40", "100 min", "100 minutes"],
    comparator: "contains_keyword",
    hint: "De 14 h 25 à 16 h 25, il y a 2 h — c'est trop de 20 minutes.",
    explanation: expl(
      "De 14 h 25 à 15 h, il y a 35 min. De 15 h à 16 h, il y a 1 h. De 16 h à 16 h 05, il y a 5 min. Total : 35 min + 1 h + 5 min = 1 h 40 min."
    ),
    tags: ["duree_temps", "calculer", "short"],
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un film se termine à 22 h 10. Il a duré 1 h 55. À quelle heure a-t-il commencé ?",
    format: "short",
    expected: ["20 h 15", "20h15", "20:15"],
    comparator: "contains_keyword",
    hint: "On recule : d'abord 1 h, puis 55 min.",
    explanation: expl(
      "On recule de 1 h : 22 h 10 − 1 h = 21 h 10. Puis de 55 min : de 21 h 10 on recule 10 min jusqu'à 21 h, puis encore 45 min, ce qui donne 20 h 15."
    ),
    tags: ["duree_temps", "calculer", "short"],
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève écrit : 8 h 50 + 20 min = 8 h 70. A-t-il raison ?",
    format: "qcm",
    choices: [
      "non : 60 minutes font une heure, donc c'est 9 h 10",
      "oui : on additionne les minutes entre elles",
      "non : c'est 8 h 10",
      "oui, mais il faudrait écrire 8,70 h",
    ],
    expected: ["non : 60 minutes font une heure, donc c'est 9 h 10"],
    comparator: "mcq_exact",
    hint: "Une horloge ne compte pas jusqu'à 100.",
    explanation: expl(
      "50 + 20 = 70 minutes, mais une heure n'en contient que 60. On échange 60 min contre 1 h : 70 min = 1 h 10 min. Donc 8 h 50 + 20 min = 9 h 10."
    ),
    tags: ["duree_temps", "calculer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Il est 17 h 22. Lis l'affichage et donne l'heure qu'il sera dans 50 minutes.",
    format: "short",
    expected: ["18 h 12", "18h12", "18:12"],
    comparator: "contains_keyword",
    hint: "De 17 h 22 à 18 h, il y a 38 minutes.",
    explanation: expl(
      "De 17 h 22 à 18 h, il y a 38 min. Il reste 50 − 38 = 12 min à ajouter après 18 h : il sera 18 h 12."
    ),
    tags: ["duree_temps", "calculer", "canvas"],
    canvas: digital("17:22", "maintenant"),
  },
  {
    kind: "template",
    id: "duree_calculer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe par l'heure ronde : c'est le chemin le plus court.",
    tags: ["duree_temps", "calculer", "template"],
    generate: () => genCalculer(2, "fin"),
  },
  {
    kind: "template",
    id: "duree_calculer_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte les minutes une à une, ou de 5 en 5.",
    tags: ["duree_temps", "calculer", "template"],
    generate: () => genCalculer(1),
  },
  {
    kind: "template",
    id: "duree_calculer_tpl_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour reculer, enlève d’abord les heures, puis les minutes en passant par l’heure ronde.",
    tags: ["duree_temps", "calculer", "template"],
    generate: () => genCalculer(3),
  },
  {
    kind: "template",
    id: "duree_calculer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte d'abord jusqu'à l'heure ronde suivante.",
    tags: ["duree_temps", "calculer", "template"],
    generate: () => genCalculer(2, "duree"),
  },
  {
    kind: "template",
    id: "duree_calculer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Une heure vaut 60 minutes, pas 100 : passe par l’heure ronde.",
    tags: ["duree_temps", "calculer", "template", "piege"],
    // 06/10/2026 : la question ouverte (3 phrases fixes) devient l'erreur d'un
    // camarade, tirée au hasard — même idée (le temps n'est pas en base dix).
    generate: () => genCalculerErreur(),
  },

  // =========================
  // DUREE_CONVERTIR
  // =========================
  {
    kind: "fixed",
    id: "duree_convertir_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de minutes dans 3 heures ?",
    format: "short",
    expected: ["180"],
    comparator: "number_equal",
    hint: "1 h = 60 min.",
    explanation: expl("3 × 60 = 180 minutes."),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 3 h 20 min en minutes.",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "On convertit les heures, puis on ajoute les minutes restantes.",
    explanation: expl("3 h = 3 × 60 = 180 min. On ajoute les 20 min : 180 + 20 = 200 minutes."),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 150 minutes en heures et minutes.",
    format: "short",
    expected: ["2 h 30", "2h30", "2 h 30 min"],
    comparator: "contains_keyword",
    hint: "Combien de fois 60 tient-il dans 150 ?",
    explanation: expl(
      "150 ÷ 60 = 2 et il reste 30, car 2 × 60 = 120 et 150 − 120 = 30. Donc 150 min = 2 h 30 min."
    ),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Combien font 34 990 secondes en heures, minutes et secondes ?",
    format: "short",
    expected: ["9 h 43 min 10 s", "9 h 43 min 10", "9h43min10s", "9 h 43 10"],
    comparator: "contains_keyword",
    hint: "Une heure vaut 3 600 secondes.",
    explanation: expl(
      "34 990 ÷ 3 600 = 9, car 9 × 3 600 = 32 400, et il reste 34 990 − 32 400 = 2 590 s. Puis 2 590 ÷ 60 = 43, car 43 × 60 = 2 580, et il reste 10 s. Donc 34 990 s = 9 h 43 min 10 s."
    ),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Combien font 609 heures en semaines, jours et heures ?",
    format: "short",
    expected: ["3 semaines 4 jours 9 heures", "3 semaines, 4 jours et 9 heures", "3 4 9"],
    comparator: "contains_keyword",
    hint: "Un jour vaut 24 h, une semaine 7 jours.",
    explanation: expl(
      "609 ÷ 24 = 25 jours et il reste 9 h (25 × 24 = 600). Puis 25 ÷ 7 = 3 semaines et il reste 4 jours (3 × 7 = 21). Donc 609 h = 3 semaines, 4 jours et 9 heures."
    ),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Est-il plus long d'emprunter de l'argent sur 76 mois ou sur 5 ans ?",
    format: "qcm",
    choices: [
      "sur 76 mois, car 5 ans ne font que 60 mois",
      "sur 5 ans, car 5 ans font 80 mois",
      "c'est la même durée",
      "on ne peut pas comparer des mois et des années",
    ],
    expected: ["sur 76 mois, car 5 ans ne font que 60 mois"],
    comparator: "mcq_exact",
    hint: "Mets les deux durées dans la même unité.",
    explanation: expl(
      "5 ans = 5 × 12 = 60 mois. On compare alors 76 mois et 60 mois : l'emprunt sur 76 mois est le plus long, de 16 mois."
    ),
    tags: ["duree_temps", "convertir", "qcm"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de secondes dans 4 minutes ?",
    format: "short",
    expected: ["240"],
    comparator: "number_equal",
    hint: "1 min = 60 s.",
    explanation: expl("4 × 60 = 240 secondes."),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "template",
    id: "duree_convertir_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par 60 : le quotient donne les heures, le reste les minutes.",
    tags: ["duree_temps", "convertir", "template"],
    generate: () => genConvertirCompose(2, "decomposer"),
  },
  {
    kind: "template",
    id: "duree_convertir_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    hint: "1 h = 60 min, 1 min = 60 s, 1 jour = 24 h, 1 semaine = 7 jours, 1 an = 12 mois.",
    tags: ["duree_temps", "convertir", "template"],
    generate: () => genConvertirSimple(),
  },
  {
    kind: "template",
    id: "duree_convertir_tpl_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets les deux durées dans la même unité avant de comparer ou de regrouper.",
    tags: ["duree_temps", "convertir", "template"],
    generate: () => (Math.random() < 0.35 ? genConvertirComparer() : genConvertirCompose(3, pick(["decomposer", "regrouper"] as const))),
  },
  {
    kind: "template",
    id: "duree_convertir_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "On convertit les heures en minutes, puis on ajoute le reste.",
    tags: ["duree_temps", "convertir", "template"],
    generate: () => genConvertirCompose(2, "regrouper"),
  },
  {
    kind: "template",
    id: "duree_convertir_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par la plus grande unité : combien de fois 3 600 s (ou 168 h) ? Puis continue avec le reste.",
    tags: ["duree_temps", "convertir", "template"],
    // 06/10/2026 : la question ouverte (3 phrases fixes) devient la conversion
    // en trois unités du BO (« 34 990 s en h, min et s », « 609 h en semaines… »), tirée au hasard.
    generate: () => genConvertirTrois(),
  },

  // =========================
  // DUREE_DECIMALE — l'écriture décimale d'une durée
  // =========================
  {
    kind: "fixed",
    id: "duree_decimale_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de minutes valent 0,5 h ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "0,5 h, c'est la moitié d'une heure.",
    explanation: expl("0,5 h = 1/2 h, soit la moitié de 60 minutes : 30 min."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de minutes valent 0,25 h ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "0,25 h, c'est un quart d'heure.",
    explanation: expl("0,25 h = 1/4 h, soit le quart de 60 minutes : 60 ÷ 4 = 15 min."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de minutes valent 0,75 h ?",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "0,75 h, ce sont trois quarts d'heure.",
    explanation: expl("0,75 h = 3/4 h, soit 3 × 15 = 45 min."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de minutes valent 0,1 h ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "0,1 h, c'est le dixième d'une heure.",
    explanation: expl("0,1 h = 1/10 h, soit 60 ÷ 10 = 6 min."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 3,
    theme: "neutral",
    text: "L'écriture 1,30 h désigne-t-elle la même durée que 1 h 30 min ?",
    format: "qcm",
    choices: [
      "non : 1,30 h vaut 1 h 18 min",
      "oui : ce sont deux façons d'écrire la même durée",
      "non : 1,30 h vaut 1 h 03 min",
      "oui, à condition d'écrire 1,3 h sans le zéro",
    ],
    expected: ["non : 1,30 h vaut 1 h 18 min"],
    comparator: "mcq_exact",
    hint: "Le chiffre après la virgule compte des dixièmes d'heure, pas des minutes.",
    explanation: expl(
      "1,30 h = 1,3 h = 1 h + 0,3 h. Or 0,3 h = 3 × 6 = 18 min. Donc 1,30 h = 1 h 18 min, et non 1 h 30 min (qui s'écrirait 1,5 h)."
    ),
    tags: ["duree_temps", "decimale", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 1 h 30 min sous forme décimale, en heures.",
    format: "short",
    expected: ["1,5", "1.5", "1,5 h"],
    comparator: "number_equal",
    hint: "30 minutes, c'est une demi-heure.",
    explanation: expl("30 min = 0,5 h, donc 1 h 30 min = 1,5 h."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "template",
    id: "duree_decimale_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 3,
    theme: "neutral",
    hint: "Un dixième d'heure vaut 6 minutes.",
    tags: ["duree_temps", "decimale", "template"],
    generate: () => genDecimale(3),
  },
  {
    kind: "template",
    id: "duree_decimale_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 1,
    theme: "neutral",
    hint: "0,5 h, c’est une demi-heure : 30 minutes.",
    tags: ["duree_temps", "decimale", "template"],
    generate: () => genDecimale(1),
  },
  {
    kind: "template",
    id: "duree_decimale_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 2,
    theme: "neutral",
    hint: "0,25 h, c’est un quart d’heure : 15 minutes. 0,75 h, ce sont trois quarts d’heure : 45 minutes.",
    tags: ["duree_temps", "decimale", "template"],
    generate: () => genDecimale(2),
  },
  {
    kind: "template",
    id: "duree_decimale_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 4,
    theme: "neutral",
    hint: "Le chiffre après la virgule compte des dixièmes d’heure, pas des minutes.",
    tags: ["duree_temps", "decimale", "template", "piege"],
    // 06/10/2026 : la question ouverte (3 phrases fixes) devient le piège
    // « 1,3 h = 1 h 30 min » tiré au hasard, dans les deux sens.
    generate: () => genDecimalePiege(),
  },

  // =========================
  // DUREE_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "duree_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Il est 17 h 26. D'après le tableau, quel est le prochain bus au départ ?",
    format: "qcm",
    choices: ["le 185, à 17 h 54", "le 303, à 17 h 42", "le 321, à 17 h 50", "le 70, à 17 h 30"],
    expected: ["le 70, à 17 h 30"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit horaire qui vient APRÈS 17 h 26.",
    explanation: expl(
      "On écarte les départs déjà passés (17 h 24 et 17 h 25). Parmi ceux qui restent — 17 h 30, 17 h 42, 17 h 50, 17 h 54 — le plus proche est 17 h 30 : c'est le bus 70."
    ),
    tags: ["duree_temps", "probleme", "canvas"],
    canvas: {
      kind: "tableau_donnees",
      headers: ["Bus", "Heure de départ"],
      rows: [
        { values: ["70", "17 h 30"] },
        { values: ["179", "17 h 25"] },
        { values: ["185", "17 h 54"] },
        { values: ["303", "17 h 42"] },
        { values: ["321", "17 h 50"] },
        { values: ["325", "17 h 24"] },
      ],
      questionLabel: "Il est 17 h 26.",
    },
  },
  {
    kind: "fixed",
    id: "duree_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Il est 17 h 26. Un ami te prévient qu'il te rejoint dans 12 minutes. Pourrez-vous prendre ensemble le bus 303, qui part à 17 h 42 ?",
    format: "qcm",
    choices: [
      "oui : il arrive à 17 h 38, soit 4 minutes avant le départ",
      "non : il arrive à 17 h 38, soit après le départ",
      "oui : il arrive à 17 h 48, juste à temps",
      "non : il arrive à 17 h 44, soit 2 minutes trop tard",
    ],
    expected: ["oui : il arrive à 17 h 38, soit 4 minutes avant le départ"],
    comparator: "mcq_exact",
    hint: "Calcule d'abord son heure d'arrivée.",
    explanation: expl(
      "17 h 26 + 12 min = 17 h 38. Le bus part à 17 h 42, soit 4 minutes plus tard : vous pouvez le prendre ensemble."
    ),
    tags: ["duree_temps", "probleme", "qcm"],
  },
  {
    kind: "fixed",
    id: "duree_probleme_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève a 26 heures de cours par semaine, en séances de 55 minutes. Quelle est la durée hebdomadaire réelle de ses cours, en heures et minutes ?",
    format: "short",
    expected: ["23 h 50", "23h50", "1430 min"],
    comparator: "contains_keyword",
    hint: "26 séances de 55 minutes, puis on convertit.",
    explanation: expl(
      "26 × 55 = 1 430 minutes. Puis 1 430 ÷ 60 = 23 et il reste 50 (23 × 60 = 1 380). La durée réelle est 23 h 50 min — soit un peu plus de 2 heures de moins que les « 26 heures » annoncées."
    ),
    tags: ["duree_temps", "probleme", "short"],
  },
  {
    kind: "template",
    id: "duree_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne (ou multiplie) les durées en minutes, puis convertis en heures et minutes.",
    tags: ["duree_temps", "probleme", "template"],
    generate: () => genProblemeDurees(3),
  },
  {
    kind: "template",
    id: "duree_probleme_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais la somme des durées, puis avance (ou recule) à partir de l’horaire connu.",
    tags: ["duree_temps", "probleme", "template"],
    generate: () => genProblemeDurees(4),
  },

  // =========================
  // DUREE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "duree_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un réveil sonne à 6 h 30. On appuie trois fois sur « répéter », qui décale la sonnerie de 9 minutes à chaque fois. À quelle heure sonne-t-il pour de bon ?",
    format: "short",
    expected: ["6 h 57", "6h57"],
    comparator: "contains_keyword",
    hint: "Trois fois neuf minutes.",
    explanation: expl("3 × 9 = 27 minutes. 6 h 30 + 27 min = 6 h 57."),
    tags: ["duree_temps", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "duree_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un film commence à 23 h 20 et dure 1 h 50. À quelle heure se termine-t-il ?",
    format: "short",
    expected: ["1 h 10", "1h10", "01:10"],
    comparator: "contains_keyword",
    hint: "Attention : on passe minuit.",
    explanation: expl(
      "De 23 h 20 à minuit, il y a 40 min. Il reste 1 h 50 − 40 min = 1 h 10 après minuit. Le film se termine à 1 h 10 du matin, le lendemain."
    ),
    tags: ["duree_temps", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "duree_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "À La Réunion, la course de la Diagonale des Fous a été terminée en 23 h 45 min par le vainqueur, parti à 22 h 00 le jeudi. À quelle heure est-il arrivé, et quel jour ?",
    format: "qcm",
    choices: [
      "vendredi à 21 h 45",
      "vendredi à 22 h 45",
      "jeudi à 21 h 45",
      "samedi à 21 h 45",
    ],
    expected: ["vendredi à 21 h 45"],
    comparator: "mcq_exact",
    hint: "23 h 45, c'est 15 minutes de moins qu'une journée entière.",
    explanation: expl(
      "Une journée fait 24 h. 23 h 45 min, c'est 15 minutes de moins : l'arrivée est donc 15 minutes AVANT 22 h le lendemain, soit vendredi à 21 h 45."
    ),
    tags: ["duree_temps", "defi", "974", "qcm"],
  },
  {
    kind: "template",
    id: "duree_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte d'abord ce qu'il reste jusqu'à minuit.",
    tags: ["duree_temps", "defi", "template"],
    generate: () => genDefiMinuit(),
  },
  {
    kind: "template",
    id: "duree_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie d’abord la durée par le nombre de fois, puis avance à partir de l’horaire.",
    tags: ["duree_temps", "defi", "template"],
    generate: () => genDefiRepete(),
  },
  {
    kind: "template",
    id: "duree_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une journée fait 24 h : enlève d’abord les journées entières, puis avance l’heure.",
    tags: ["duree_temps", "defi", "template"],
    // 06/10/2026 : la question ouverte (3 phrases fixes) devient une durée sur
    // plusieurs jours, tirée au hasard (comme la Diagonale des Fous du BO).
    generate: () => genDefiJours(),
  },
];
