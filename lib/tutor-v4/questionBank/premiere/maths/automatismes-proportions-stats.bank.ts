// lib/tutor-v4/questionBank/premiere/maths/automatismes-proportions-stats.bank.ts
//
// Notions : auto_proportion, auto_partie_tout, auto_lire_statistiques,
//           auto_indicateurs (domaine BOP1AU) — auto_proba_base : voir
//           automatismes-probabilites.bank.ts
//
// Les derniers automatismes du programme. Tombés en juin 2026 :
//   · « 30 % de 150 est égal à » (Métropole) ;
//   · « 25 % de 250 est égal à » (Centres étrangers) ;
//   · « la médiane de 2 ; 3 ; 5 ; 4 ; 2 ; 3 » (Métropole) ;
//   · un dé truqué dont on cherche la probabilité manquante, sachant que la
//     somme des probabilités des issues vaut 1 (Asie).
//
// ⚠️ Sans calculatrice : les pourcentages sont des multiples de 5, et les
// séries statistiques comptent au plus sept valeurs.
//
// Les questions de lecture portent un diagramme ou une série affichée : on lit
// avant de calculer.

import { fusionnerRenfort, renfortPremiere } from "@/lib/tutor-v4/questionBank/seconde/maths/evolutions-lycee-renfort";
import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { CONTEXTES_SERIES, affirmationsSerie, tirerParts, trierAffirmations } from "./information-chiffree.bank";
import type { Affirmation, ContexteSerie } from "./information-chiffree.bank";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fr(n: number): string {
  const arrondi = Math.round(n * 1000000) / 1000000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/** La série, affichée en tableau : on la lit avant de la traiter. */
function canvasSerie(valeurs: number[], titre: string): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: ["", ...valeurs.map((_, i) => `n° ${i + 1}`)],
    rows: [{ label: "Valeur", values: valeurs }],
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   LIRE DES STATISTIQUES : GÉNÉRATEURS ROBUSTES (21/10/2026)
   Mesure du 21/10 : 1 gabarit par micro, 1 à 4 squelettes, 16 à 19 phrases
   déjà vues sur 20. Chaque gabarit tire un contexte (métier, domaine), une
   modalité et une tournure ; les graphiques ont un axe GRADUÉ, sans valeurs
   écrites quand la question est de LIRE. Les séries à un caractère viennent
   de information-chiffree.bank.ts (CONTEXTES_SERIES).
   ═══════════════════════════════════════════════════════════════════════ */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Un nombre en LaTeX, espace des milliers dès 10 000. */
function nb(n: number): string {
  const [ent, dec] = fr(n).split(",");
  const e = ent.length > 4 ? ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : ent;
  return dec ? `${e},${dec}` : e;
}

/** Quatre propositions DISTINCTES : la bonne + trois leurres différents d'elle. */
function choix4(correct: string, leurres: readonly string[]): string[] {
  const vus = new Set([correct]);
  const out: string[] = [];
  for (const l of leurres) if (!vus.has(l)) { vus.add(l); out.push(l); }
  return shuffle([correct, ...out.slice(0, 3)]);
}

/** « de » contracté devant l'article : « du score », « des ventes », « de la masse ». */
function du(s: string): string {
  return s.startsWith("le ") ? `du ${s.slice(3)}` : s.startsWith("les ") ? `des ${s.slice(4)}` : `de ${s}`;
}

function de(nom: string): string {
  return /^[aeiouyéèêàâîôûhAEIOUÉ]/.test(nom) ? `d'${nom}` : `de ${nom}`;
}

function gabStat(id: string, microId: string, difficulty: 1 | 2 | 3, hint: string, generate: () => TutorGeneratedQuestionV4, tags: string[] = []): TutorBankItemV4 {
  return {
    kind: "template",
    id: `premiere_${id}`,
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_lire_statistiques",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["premiere", "maths", "automatisme", "statistiques", "template", ...tags],
    generate,
  };
}

/** Une série tirée sur un axe gradué : valeurs multiples de `pas` (ou de pas/2). */
function serieGraduee(ctx: ContexteSerie, n: number, demi: boolean) {
  const pas = ctx.pas * 2;
  const unite = demi ? pas / 2 : pas;
  const kmax = Math.floor(ctx.max / unite);
  const kmin = Math.max(1, Math.ceil(ctx.min / unite));
  for (;;) {
    const valeurs = ctx.modalites.slice(0, n).map(() => randomInt(kmin, kmax) * unite);
    if (new Set(valeurs).size === n && (!demi || valeurs.some((v) => v % pas !== 0))) return { pas, valeurs, modalites: ctx.modalites.slice(0, n) };
  }
}

/* ─────────── Évolutions (courbes) ─────────── */

type ContexteEvolution = { intro: string; grandeur: string; unite: string; labels: string[]; min: number; max: number; pas: number; titre: string };

const MOIS6 = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin"];
const CONTEXTES_EVOLUTIONS: readonly ContexteEvolution[] = [
  { intro: "Une météorologue a relevé la température moyenne de chaque mois.", grandeur: "la température moyenne", unite: "°C", labels: MOIS6, min: 4, max: 24, pas: 2, titre: "Température moyenne (°C)" },
  { intro: "Une vidéaste suit le nombre d'abonnés de sa chaîne.", grandeur: "le nombre d'abonnés", unite: "milliers d'abonnés", labels: MOIS6, min: 10, max: 90, pas: 10, titre: "Abonnés (milliers)" },
  { intro: "Le président d'un club de rugby suit ses licenciés saison après saison.", grandeur: "le nombre de licenciés", unite: "licenciés", labels: ["2019", "2020", "2021", "2022", "2023", "2024"], min: 100, max: 400, pas: 50, titre: "Licenciés du club" },
  { intro: "Un cadre de santé a compté les passages aux urgences d'une semaine.", grandeur: "le nombre de passages", unite: "passages", labels: ["Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam.", "Dim."], min: 60, max: 200, pas: 20, titre: "Passages aux urgences" },
  { intro: "Une hydrologue suit la hauteur d'eau d'un lac de barrage.", grandeur: "la hauteur d'eau", unite: "m", labels: MOIS6, min: 10, max: 50, pas: 5, titre: "Hauteur d'eau (m)" },
  { intro: "Une artisane suit le chiffre d'affaires de sa boutique.", grandeur: "le chiffre d'affaires", unite: "milliers d'euros", labels: MOIS6, min: 4, max: 20, pas: 2, titre: "Chiffre d'affaires (milliers d'€)" },
  { intro: "Le programmateur d'un cinéma suit les entrées d'un film semaine après semaine.", grandeur: "le nombre d'entrées", unite: "entrées", labels: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4", "Sem. 5", "Sem. 6"], min: 200, max: 1200, pas: 100, titre: "Entrées du film" },
  { intro: "Un technicien suit la production des panneaux solaires d'un lycée.", grandeur: "la production", unite: "kWh", labels: MOIS6, min: 100, max: 600, pas: 50, titre: "Production solaire (kWh)" },
  { intro: "L'office de tourisme suit les nuitées de la saison.", grandeur: "le nombre de nuitées", unite: "centaines de nuitées", labels: ["Mai", "Juin", "Juil.", "Août", "Sept.", "Oct."], min: 10, max: 80, pas: 10, titre: "Nuitées (centaines)" },
  { intro: "Une apicultrice suit sa récolte de miel année après année.", grandeur: "la récolte", unite: "kg", labels: ["2019", "2020", "2021", "2022", "2023", "2024"], min: 20, max: 140, pas: 20, titre: "Récolte de miel (kg)" },
  { intro: "Un développeur de jeux vidéo suit les joueurs connectés un mercredi.", grandeur: "le nombre de joueurs connectés", unite: "milliers de joueurs", labels: ["14 h", "15 h", "16 h", "17 h", "18 h", "19 h"], min: 2, max: 30, pas: 2, titre: "Joueurs connectés (milliers)" },
  { intro: "Une gestionnaire de vélos en libre-service suit les locations de la semaine.", grandeur: "le nombre de locations", unite: "centaines de locations", labels: ["Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam.", "Dim."], min: 4, max: 30, pas: 2, titre: "Locations (centaines)" },
] as const;

function tirerEvolution(demi: boolean) {
  const ctx = pick(CONTEXTES_EVOLUTIONS);
  // Un pas impair ne se coupe pas en deux sans décimale : on reste alors sur les graduations.
  const unite = demi && ctx.pas % 2 === 0 ? ctx.pas / 2 : ctx.pas;
  const kmin = Math.ceil(ctx.min / unite);
  const kmax = Math.floor(ctx.max / unite);
  for (;;) {
    const valeurs = ctx.labels.map(() => randomInt(kmin, kmax) * unite);
    if (new Set(valeurs).size === valeurs.length) {
      const canvas: CanvasFigure = { kind: "stat_graph", graphType: "courbe", title: ctx.titre, data: ctx.labels.map((l, i) => ({ label: l, value: valeurs[i] })), display: { showValues: false, showLabels: true, showAxis: true, step: ctx.pas } };
      return { ctx, valeurs, canvas };
    }
  }
}

/* ═══════════════ auto_stat_lire_graphique ═══════════════ */

const ITEMS_STAT_LIRE: TutorBankItemV4[] = [
  gabStat("auto_stat_lire_barre", "auto_stat_lire_graphique", 1,
    "Repère la barre, va jusqu'à son sommet, puis lis la graduation sur l'axe vertical.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([4, 5]));
      const { pas, valeurs, modalites } = serieGraduee(ctx, n, false);
      const k = randomInt(0, n - 1);
      const type = pick(["barres", "batons"] as const);
      return {
        text: `${ctx.intro} ` + pick([
          `D'après le diagramme, combien compte-t-on ${de(ctx.unite)} pour « ${modalites[k]} » ?`,
          `Lis sur l'axe gradué la valeur correspondant à « ${modalites[k]} ».`,
          `Quelle est la hauteur de la ${type === "barres" ? "barre" : "ligne"} « ${modalites[k]} », en ${ctx.unite} ?`,
        ]),
        format: "short",
        expected: [String(valeurs[k])],
        comparator: "number_equal",
        canvas: { kind: "stat_graph", graphType: type, title: ctx.titre, data: modalites.map((m, i) => ({ label: m, value: valeurs[i] })), display: { showValues: false, showLabels: true, showAxis: true, step: pas } },
        explanation: exp(
          "Dans un diagramme en barres (ou en bâtons), la hauteur représente la valeur : elle se lit sur l'axe vertical gradué.",
          `On repère « ${modalites[k]} », puis on lit la graduation au niveau du sommet (l'axe va de $${nb(pas)}$ en $${nb(pas)}$).`,
          `Le sommet est au niveau de $${nb(valeurs[k])}$.`,
          `« ${modalites[k]} » : $${nb(valeurs[k])}$ ${ctx.unite}.`
        ),
      };
    }, ["diagramme", "short"]),

  gabStat("auto_stat_lire_milieu", "auto_stat_lire_graphique", 2,
    "Un sommet ENTRE deux graduations est à mi-chemin : ajoute la moitié du pas à la graduation du dessous.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([4, 5]));
      const { pas, valeurs, modalites } = serieGraduee(ctx, n, true);
      const milieux = valeurs.map((v, i) => (v % pas !== 0 ? i : -1)).filter((i) => i >= 0);
      const k = pick(milieux);
      return {
        text: `${ctx.intro} ` + pick([
          `Le sommet de la barre « ${modalites[k]} » tombe entre deux graduations. Quelle valeur représente-t-il, en ${ctx.unite} ?`,
          `Combien ${de(ctx.unite)} pour « ${modalites[k]} » ? (Lis précisément sur l'axe.)`,
        ]),
        format: "short",
        expected: [String(valeurs[k])],
        comparator: "number_equal",
        canvas: { kind: "stat_graph", graphType: "barres", title: ctx.titre, data: modalites.map((m, i) => ({ label: m, value: valeurs[i] })), display: { showValues: false, showLabels: true, showAxis: true, step: pas } },
        explanation: exp(
          "L'axe vertical est gradué régulièrement : entre deux graduations, le milieu vaut la moyenne des deux.",
          `On repère le pas de l'axe ($${nb(pas)}$), puis les deux graduations qui encadrent le sommet.`,
          `Le sommet est à mi-chemin entre $${nb(valeurs[k] - pas / 2)}$ et $${nb(valeurs[k] + pas / 2)}$ : $${nb(valeurs[k] - pas / 2)} + ${nb(pas / 2)} = ${nb(valeurs[k])}$.`,
          `« ${modalites[k]} » : $${nb(valeurs[k])}$ ${ctx.unite}.`
        ),
      };
    }, ["diagramme", "short"]),

  gabStat("auto_stat_lire_courbe", "auto_stat_lire_graphique", 2,
    "Repère le point de la date demandée, puis lis sa hauteur sur l'axe vertical.",
    () => {
      const { ctx, valeurs, canvas } = tirerEvolution(true);
      const k = randomInt(0, ctx.labels.length - 1);
      return {
        text: `${ctx.intro} ` + pick([
          `D'après la courbe, combien vaut ${ctx.grandeur} en « ${ctx.labels[k]} », en ${ctx.unite} ?`,
          `Lis sur le graphique ${ctx.grandeur} au point « ${ctx.labels[k]} ».`,
          `Quelle valeur la courbe donne-t-elle pour « ${ctx.labels[k]} » ? (en ${ctx.unite})`,
        ]),
        format: "short",
        expected: [String(valeurs[k])],
        comparator: "number_equal",
        canvas: { ...canvas, display: { ...(canvas as { display?: object }).display, highlightIndex: k } } as CanvasFigure,
        explanation: exp(
          "Une courbe d'évolution relie les valeurs dans l'ordre du temps ; chaque point se lit sur l'axe vertical.",
          `On repère « ${ctx.labels[k]} » sur l'axe horizontal, on monte jusqu'au point, et on lit sa hauteur (graduations de $${nb(ctx.pas)}$ en $${nb(ctx.pas)}$).`,
          `Le point « ${ctx.labels[k]} » est au niveau de $${nb(valeurs[k])}$.`,
          `${ctx.grandeur.charAt(0).toUpperCase() + ctx.grandeur.slice(1)} vaut $${nb(valeurs[k])}$ ${ctx.unite}.`
        ),
      };
    }, ["courbe", "short"]),
];

/* ═══════════════ auto_stat_graphiques_usuels ═══════════════ */

/** Affirmations chiffrées sur une évolution : hausses, baisses, maximum, écarts. */
function affirmationsEvolution(L: string[], V: number[], unite: string): Affirmation[] {
  const out: Affirmation[] = [];
  const M = (i: number) => `« ${L[i]} »`;
  const imax = V.indexOf(Math.max(...V));
  const imin = V.indexOf(Math.min(...V));
  for (let i = 0; i < L.length; i++) {
    out.push({ texte: `La valeur la plus haute est atteinte en ${M(i)}.`, vrai: i === imax, preuve: `le maximum, $${nb(V[imax])}$, est en ${M(imax)}` });
    out.push({ texte: `La valeur la plus basse est atteinte en ${M(i)}.`, vrai: i === imin, preuve: `le minimum, $${nb(V[imin])}$, est en ${M(imin)}` });
    if (i + 1 < L.length) {
      out.push({ texte: `Entre ${M(i)} et ${M(i + 1)}, la valeur augmente.`, vrai: V[i + 1] > V[i], preuve: `$${nb(V[i])}$ puis $${nb(V[i + 1])}$` });
      const d = Math.abs(V[i + 1] - V[i]);
      const dit = pick([d, d * 2, d + Math.max(1, Math.round(d / 2))]);
      out.push({ texte: `Entre ${M(i)} et ${M(i + 1)}, la valeur varie de $${nb(dit)}$ ${unite}.`, vrai: dit === d, preuve: `$${nb(Math.max(V[i], V[i + 1]))} - ${nb(Math.min(V[i], V[i + 1]))} = ${nb(d)}$` });
    }
    for (let j = i + 1; j < L.length; j++) {
      if (V[j] !== 2 * V[i]) out.push({ texte: `La valeur de ${M(j)} est au moins le double de celle de ${M(i)}.`, vrai: V[j] >= 2 * V[i], preuve: `$2 \\times ${nb(V[i])} = ${nb(2 * V[i])}$, à comparer à $${nb(V[j])}$` });
    }
  }
  return out;
}

const ITEMS_STAT_USUELS: TutorBankItemV4[] = [
  gabStat("auto_stat_usuels_calcul", "auto_stat_graphiques_usuels", 2,
    "Relève les valeurs utiles sur le graphique, puis fais le calcul demandé : une somme, un écart.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([3, 4, 5]));
      const { pas, valeurs, modalites } = serieGraduee(ctx, n, false);
      const [a, b] = shuffle(modalites.map((_, i) => i)).slice(0, 2);
      const genre = pick(["total", "ecart", "deux"] as const);
      const v = genre === "total" ? valeurs.reduce((s, x) => s + x, 0) : genre === "ecart" ? Math.abs(valeurs[a] - valeurs[b]) : valeurs[a] + valeurs[b];
      const question =
        genre === "total" ? pick([`Quel est le total, toutes modalités confondues, en ${ctx.unite} ?`, `Combien ${de(ctx.unite)} au total le diagramme représente-t-il ?`])
        : genre === "ecart" ? `Quel est l'écart entre « ${modalites[a]} » et « ${modalites[b]} », en ${ctx.unite} ?`
        : `Combien ${de(ctx.unite)} pour « ${modalites[a]} » et « ${modalites[b]} » réunis ?`;
      const calcul =
        genre === "total" ? `$${valeurs.map(nb).join(" + ")} = ${nb(v)}$`
        : genre === "ecart" ? `$${nb(Math.max(valeurs[a], valeurs[b]))} - ${nb(Math.min(valeurs[a], valeurs[b]))} = ${nb(v)}$`
        : `$${nb(valeurs[a])} + ${nb(valeurs[b])} = ${nb(v)}$`;
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: { kind: "stat_graph", graphType: "barres", title: ctx.titre, data: modalites.map((m, i) => ({ label: m, value: valeurs[i] })), display: { showValues: false, showLabels: true, showAxis: true, step: pas } },
        explanation: exp(
          "Un diagramme en barres se lit valeur par valeur ; un total ou un écart se CALCULE ensuite.",
          "On lit chaque hauteur utile sur l'axe gradué, puis on calcule.",
          `${calcul}.`,
          `La réponse est $${nb(v)}$ ${ctx.unite}.`
        ),
      };
    }, ["diagramme", "short"]),

  gabStat("auto_stat_usuels_camembert", "auto_stat_graphiques_usuels", 2,
    "Les parts d'un diagramme circulaire s'additionnent ; le tout fait 100 %.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([3, 4, 5]));
      const parts = tirerParts(n);
      const modalites = ctx.modalites.slice(0, n);
      const [a, b] = shuffle(modalites.map((_, i) => i)).slice(0, 2);
      const v = parts[a] + parts[b];
      return {
        text: `${ctx.intro} ` + pick([
          `Quelle part du total représentent « ${modalites[a]} » et « ${modalites[b]} » réunis ? (en %)`,
          `Ensemble, « ${modalites[a]} » et « ${modalites[b]} » font quel pourcentage du total ?`,
        ]),
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: { kind: "stat_graph", graphType: "camembert", title: `Répartition selon ${ctx.caractere} (en %)`, data: modalites.map((m, i) => ({ label: m, value: parts[i] })), display: { showLabels: true, valeursParts: true, pourcentages: true } },
        explanation: exp(
          "Un diagramme circulaire partage un tout en parts ; deux parts réunies s'additionnent.",
          "On lit les deux pourcentages, puis on les additionne.",
          `$${parts[a]} + ${parts[b]} = ${v}$.`,
          `Ensemble, ils font $${v}\\,\\%$ du total.`
        ),
      };
    }, ["diagramme", "short"]),

  gabStat("auto_stat_usuels_affirmation", "auto_stat_graphiques_usuels", 3,
    "Teste chaque affirmation par un calcul sur les valeurs lues.",
    () => {
      for (;;) {
        const { ctx, valeurs, canvas } = tirerEvolution(false);
        const chercher = pick([true, false]);
        const r = trierAffirmations(affirmationsEvolution(ctx.labels, valeurs, ctx.unite), chercher);
        if (!r) continue;
        return {
          text: `${ctx.intro} D'après la courbe ${du(ctx.grandeur)}, laquelle de ces affirmations est ${chercher ? "VRAIE" : "FAUSSE"} ?`,
          format: "qcm",
          choices: choix4(r.bonne.texte, r.leurres.map((x) => x.texte)),
          expected: [r.bonne.texte],
          comparator: "mcq_exact",
          canvas,
          explanation: exp(
            "Commenter une courbe, c'est énoncer des faits qu'on vérifie sur les valeurs lues : hausses, baisses, maximum, écarts.",
            `On lit les valeurs (axe de $${nb(ctx.pas)}$ en $${nb(ctx.pas)}$) : $${valeurs.map(nb).join(" ; ")}$, puis on teste chaque affirmation.`,
            [r.bonne, ...r.leurres].map((x) => `« ${x.texte} » → ${x.vrai ? "vrai" : "faux"} : ${x.preuve}.`).join("\n"),
            `L'affirmation ${chercher ? "vraie" : "fausse"} est : « ${r.bonne.texte} »`
          ),
        };
      }
    }, ["courbe"]),

  gabStat("auto_stat_usuels_batons", "auto_stat_graphiques_usuels", 3,
    "Une comparaison, une moitié, un double : chaque affirmation se vérifie par un calcul.",
    () => {
      for (;;) {
        const ctx = pick(CONTEXTES_SERIES);
        const n = Math.min(ctx.modalites.length, pick([4, 5]));
        const { pas, valeurs, modalites } = serieGraduee(ctx, n, false);
        const chercher = pick([true, false]);
        const r = trierAffirmations(affirmationsSerie(modalites, valeurs, ctx.unite), chercher);
        if (!r) continue;
        return {
          text: `${ctx.intro} D'après le diagramme en bâtons, laquelle de ces affirmations est ${chercher ? "VRAIE" : "FAUSSE"} ?`,
          format: "qcm",
          choices: choix4(r.bonne.texte, r.leurres.map((x) => x.texte)),
          expected: [r.bonne.texte],
          comparator: "mcq_exact",
          canvas: { kind: "stat_graph", graphType: "batons", title: ctx.titre, data: modalites.map((m, i) => ({ label: m, value: valeurs[i] })), display: { showValues: false, showLabels: true, showAxis: true, step: pas } },
          explanation: exp(
            "Commenter un diagramme, c'est énoncer des faits qu'on VÉRIFIE sur les valeurs lues.",
            `On lit les valeurs : $${valeurs.map(nb).join(" ; ")}$, puis on teste chaque affirmation.`,
            [r.bonne, ...r.leurres].map((x) => `« ${x.texte} » → ${x.vrai ? "vrai" : "faux"} : ${x.preuve}.`).join("\n"),
            `L'affirmation ${chercher ? "vraie" : "fausse"} est : « ${r.bonne.texte} »`
          ),
        };
      }
    }, ["diagramme"]),
];

/* ═══════════════ auto_stat_graphique_donnees ═══════════════ */

/** Un camembert en % et un total multiple de 20 : chaque effectif tombe juste. */
function camembertEtTotal(ctx: ContexteSerie, n: number) {
  const modalites = ctx.modalites.slice(0, n);
  const parts = tirerParts(n);
  let T = randomInt(3, 30) * 20;
  if (T === 100) T = 120;
  const effectifs = parts.map((p) => (T * p) / 100);
  const canvas: CanvasFigure = { kind: "stat_graph", graphType: "camembert", title: `Répartition selon ${ctx.caractere} (en %)`, data: modalites.map((m, i) => ({ label: m, value: parts[i] })), display: { showLabels: true, valeursParts: true, pourcentages: true } };
  return { modalites, parts, T, effectifs, canvas };
}

const ITEMS_STAT_DONNEES: TutorBankItemV4[] = [
  gabStat("auto_stat_donnees_effectif", "auto_stat_graphique_donnees", 2,
    "Un diagramme circulaire montre des PARTS : pour un effectif, applique le pourcentage au total.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([3, 4, 5]));
      const { modalites, parts, T, effectifs, canvas } = camembertEtTotal(ctx, n);
      const k = randomInt(0, n - 1);
      const v = effectifs[k];
      const bonne = `$${nb(v)}$`;
      return {
        text: `${ctx.intro} Il y a $${nb(T)}$ ${ctx.unite} en tout. ` + pick([
          `Combien ${de(ctx.unite)} correspondent à « ${modalites[k]} » ?`,
          `Retrouve la donnée cachée derrière le secteur « ${modalites[k]} » : combien ${de(ctx.unite)} ?`,
        ]),
        format: "qcm",
        choices: choix4(bonne, [`$${parts[k]}$`, `$${nb(T - v)}$`, `$${nb(v * 10)}$`, `$${nb(T / n)}$`]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas,
        explanation: exp(
          "Un diagramme circulaire donne des proportions : pour retrouver une donnée, on applique la proportion au total.",
          "On lit le pourcentage, puis on le multiplie par le total.",
          `$${nb(T)} \\times ${fr(parts[k] / 100)} = ${nb(v)}$.`,
          `« ${modalites[k]} » : $${nb(v)}$ ${ctx.unite}. ⚠️ $${parts[k]}$ est un pourcentage, pas un effectif.`
        ),
        choiceDiagnostics: [{ choice: `$${parts[k]}$`, cause: "a pris le pourcentage pour un effectif" }],
      };
    }, ["diagramme"]),

  gabStat("auto_stat_donnees_angle", "auto_stat_graphique_donnees", 3,
    "Pour dessiner un secteur : (effectif ÷ total) × 360°.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([3, 4, 5]));
      const { modalites, parts, T, effectifs } = camembertEtTotal(ctx, n);
      const k = randomInt(0, n - 1);
      const angle = parts[k] * 3.6;
      return {
        text: `${ctx.intro} On veut représenter le tableau par un diagramme circulaire. ` + pick([
          `Quel angle (en degrés) faut-il donner au secteur « ${modalites[k]} » ?`,
          `Le secteur « ${modalites[k]} » mesurera combien de degrés ?`,
        ]),
        format: "short",
        expected: [fr(angle)],
        comparator: "number_equal",
        canvas: { kind: "tableau_donnees", title: ctx.titre, headers: ["", ...modalites, "Total"], rows: [{ label: "Effectif", values: [...effectifs, T] }], display: { compact: true } },
        explanation: exp(
          "Dans un diagramme circulaire, l'angle d'un secteur est proportionnel à l'effectif : le total correspond à $360°$.",
          "On calcule la proportion de la modalité, puis on la multiplie par $360°$.",
          `$${nb(effectifs[k])} ÷ ${nb(T)} = ${fr(parts[k] / 100)}$, puis $${fr(parts[k] / 100)} \\times 360 = ${fr(angle)}$.`,
          `Le secteur « ${modalites[k]} » mesurera $${fr(angle)}°$.`
        ),
      };
    }, ["tableau", "short"]),

  gabStat("auto_stat_donnees_tableau", "auto_stat_graphique_donnees", 3,
    "Le graphique donne des %, le tableau des effectifs : convertis chaque part avec le total.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([3, 4]));
      const { modalites, parts, T, effectifs, canvas } = camembertEtTotal(ctx, n);
      const ligne = (vals: number[]) => modalites.map((m, i) => `${m} : ${nb(vals[i])}`).join(" ; ");
      const bonne = ligne(effectifs);
      const [a, b] = [0, 1];
      const echange = effectifs.map((v, i) => (i === a ? effectifs[b] : i === b ? effectifs[a] : v));
      const leurres = [ligne(parts), ligne(echange), ligne(effectifs.map((v) => v * 2))];
      return {
        text: `${ctx.intro} Le diagramme représente $${nb(T)}$ ${ctx.unite}. ` + pick([`Quel tableau d'effectifs lui correspond ?`, `Quelles sont les données de départ ?`]),
        format: "qcm",
        choices: choix4(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas,
        explanation: exp(
          "Passer du graphique aux données : chaque pourcentage s'applique au total.",
          "On convertit chaque part, puis on vérifie que les effectifs font bien le total.",
          modalites.map((m, i) => `${m} : $${nb(T)} \\times ${fr(parts[i] / 100)} = ${nb(effectifs[i])}$`).join(" ; ") + `. Somme : $${nb(T)}$.`,
          `Le tableau est : ${bonne}.`
        ),
      };
    }, ["diagramme"]),
];

const anciens: TutorBankItemV4[] = [
  /* ═══════════════ auto_prop_calculer / formes ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_prop_calculer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une proportion, c'est la partie divisée par le tout.",
    tags: ["premiere", "maths", "automatisme", "proportion", "template", "short"],
    generate: () => {
      const total = pick([20, 25, 40, 50] as const);
      const part = pick([5, 10, 15] as const).valueOf();
      const partie = Math.min(part, total - 5);
      const proportion = (partie / total) * 100;
      return {
        text:
          `Dans une classe de $${total}$ élèves, $${partie}$ sont demi-pensionnaires. ` +
          `Quelle proportion cela représente-t-il, en pourcentage ?`,
        format: "short",
        expected: [fr(proportion)],
        comparator: "number_equal",
        explanation: exp(
          "Une proportion est le quotient de la partie par le tout ; multiplié par $100$, il donne un pourcentage.",
          "On divise la partie par l'effectif total, puis on convertit.",
          `$\\dfrac{${partie}}{${total}} = ${fr(partie / total)}$, soit $${fr(proportion)}\\,\\%$.`,
          `Les demi-pensionnaires représentent $${fr(proportion)}\\,\\%$ de la classe.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_auto_prop_formes_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_formes",
    difficulty: 2,
    theme: "neutral",
    hint: "Une même proportion s'écrit en fraction, en décimal ou en pourcentage.",
    tags: ["premiere", "maths", "automatisme", "proportion", "template"],
    generate: () => {
      const cas = pick([
        { num: 1, den: 4, dec: 0.25, pct: 25 },
        { num: 1, den: 5, dec: 0.2, pct: 20 },
        { num: 3, den: 4, dec: 0.75, pct: 75 },
        { num: 1, den: 2, dec: 0.5, pct: 50 },
        { num: 3, den: 5, dec: 0.6, pct: 60 },
      ] as const);
      return {
        text: `Quelle écriture n'est PAS égale à $\\dfrac{${cas.num}}{${cas.den}}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(cas.pct)}$`, [
          `$${fr(cas.dec)}$`,
          `$${fr(cas.pct)}\\,\\%$`,
          `$\\dfrac{${cas.num * 2}}{${cas.den * 2}}$`,
        ]),
        expected: [`$${fr(cas.pct)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une proportion s'écrit de plusieurs façons équivalentes : fraction, décimal, pourcentage.",
          "On convertit chaque proposition et on repère l'intruse.",
          `$\\dfrac{${cas.num}}{${cas.den}} = ${fr(cas.dec)} = ${fr(cas.pct)}\\,\\%$, et $\\dfrac{${cas.num * 2}}{${cas.den * 2}}$ se simplifie en $\\dfrac{${cas.num}}{${cas.den}}$. ` +
            `Mais $${fr(cas.pct)}$ SANS le symbole $\\%$ vaut $${fr(cas.pct)}$, soit $${fr(cas.pct / cas.dec)}$ fois trop.`,
          `L'intruse est $${fr(cas.pct)}$ : sans le symbole pour cent, ce n'est plus la même chose du tout.`
        ),
      };
    },
  },

  /* ═══════════════ auto_prop_appliquer ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_prop_appliquer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_appliquer",
    difficulty: 2,
    theme: "neutral",
    hint: "$t\\,\\%$ d'un nombre, c'est ce nombre multiplié par $\\frac{t}{100}$.",
    tags: ["premiere", "maths", "automatisme", "pourcentage", "template", "short"],
    generate: () => {
      const taux = pick([20, 25, 30, 40, 60, 75] as const);
      const total = pick([80, 120, 150, 200, 250] as const);
      return {
        text: `Combien vaut $${taux}\\,\\%$ de $${total}$ ?`,
        format: "short",
        expected: [fr((total * taux) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Prendre $t\\,\\%$ d'une quantité, c'est la multiplier par $\\dfrac{t}{100}$.",
          "On convertit le pourcentage en décimal, puis on multiplie.",
          `$${taux}\\,\\% = ${fr(taux / 100)}$, donc $${total} \\times ${fr(taux / 100)} = ${fr((total * taux) / 100)}$.`,
          `$${taux}\\,\\%$ de $${total}$ vaut $${fr((total * taux) / 100)}$. ` +
            `(Métropole demandait $30\\,\\%$ de $150$, les Centres étrangers $25\\,\\%$ de $250$.)`
        ),
      };
    },
  },

  /* ═══════════════ auto_prop_partie_connaissant_tout ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_partie_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_partie_tout",
    microId: "auto_prop_partie_connaissant_tout",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique la proportion à l'effectif total.",
    tags: ["premiere", "maths", "automatisme", "pourcentage", "template", "short"],
    generate: () => {
      const total = pick([200, 400, 500, 800] as const);
      const taux = pick([15, 20, 35, 45] as const);
      return {
        text:
          `Un lycée compte $${total}$ élèves, dont $${taux}\\,\\%$ sont en terminale. ` +
          `Combien d'élèves de terminale y a-t-il ?`,
        format: "short",
        expected: [fr((total * taux) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Connaissant le tout et la proportion, on obtient la partie en multipliant.",
          "On applique le pourcentage à l'effectif total.",
          `$${total} \\times ${fr(taux / 100)} = ${fr((total * taux) / 100)}$.`,
          `Il y a $${fr((total * taux) / 100)}$ élèves de terminale.`
        ),
      };
    },
  },

  /* ═══════════════ auto_prop_tout_connaissant_partie ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_tout_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_partie_tout",
    microId: "auto_prop_tout_connaissant_partie",
    difficulty: 4,
    theme: "neutral",
    hint: "Ici c'est le TOUT qu'on cherche : on divise par la proportion.",
    tags: ["premiere", "maths", "automatisme", "pourcentage", "template", "short"],
    generate: () => {
      const taux = pick([20, 25, 40, 50] as const);
      const total = pick([200, 400, 500] as const);
      const partie = (total * taux) / 100;
      return {
        text:
          `Dans un lycée, $${taux}\\,\\%$ des élèves sont demi-pensionnaires, ce qui représente $${fr(partie)}$ élèves. ` +
          `Combien le lycée compte-t-il d'élèves au total ?`,
        format: "short",
        expected: [fr(total)],
        comparator: "number_equal",
        explanation: exp(
          "Si la partie vaut $t\\,\\%$ du tout, alors le tout s'obtient en DIVISANT la partie par $\\dfrac{t}{100}$.",
          "On divise, au lieu de multiplier.",
          `$\\dfrac{${fr(partie)}}{${fr(taux / 100)}} = ${fr(total)}$. Vérification : $${fr(total)} \\times ${fr(taux / 100)} = ${fr(partie)}$.`,
          `Le lycée compte $${fr(total)}$ élèves. ⚠️ Multiplier $${fr(partie)}$ par $${fr(taux / 100)}$ donnerait $${fr((partie * taux) / 100)}$, ` +
            `un nombre PLUS PETIT que la partie : impossible.`
        ),
      };
    },
  },

  /* ═══════════════ auto_prop_pourcentage_de_pourcentage ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_pct_de_pct_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_partie_tout",
    microId: "auto_prop_pourcentage_de_pourcentage",
    difficulty: 4,
    theme: "neutral",
    hint: "Un pourcentage d'un pourcentage se calcule en MULTIPLIANT les deux proportions.",
    tags: ["premiere", "maths", "automatisme", "pourcentage", "template", "short"],
    generate: () => {
      const t1 = pick([20, 40, 50, 60] as const);
      const t2 = pick([10, 25, 50] as const);
      const resultat = (t1 * t2) / 100;
      return {
        text:
          `Dans un lycée, $${t1}\\,\\%$ des élèves sont en seconde, et parmi eux $${t2}\\,\\%$ font du sport. ` +
          `Quel pourcentage des élèves DU LYCÉE sont des secondes sportifs ?`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Un pourcentage d'un pourcentage revient à multiplier les deux proportions, pas à les additionner ni à les soustraire.",
          "On convertit les deux taux en décimaux, on multiplie, puis on reconvertit.",
          `$${fr(t1 / 100)} \\times ${fr(t2 / 100)} = ${fr(resultat / 100)}$, soit $${fr(resultat)}\\,\\%$.`,
          `$${fr(resultat)}\\,\\%$ des élèves du lycée sont des secondes sportifs. ` +
            `Le résultat est toujours PLUS PETIT que chacun des deux pourcentages : une partie d'une partie.`
        ),
      };
    },
  },

  /* ═══════ lire des statistiques (générateurs plus haut) ═══════ */
  ...ITEMS_STAT_LIRE,
  ...ITEMS_STAT_USUELS,
  ...ITEMS_STAT_DONNEES,

  /* ═══════════════ auto_stat_moyenne ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_moyenne_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    hint: "Somme des valeurs, divisée par leur nombre.",
    tags: ["premiere", "maths", "automatisme", "moyenne", "template", "short"],
    generate: () => {
      const n = pick([5, 6] as const);
      const base = pick([6, 8, 9, 10, 11, 12, 14, 15] as const);
      const ecart = pick([1, 2, 3] as const);
      const valeurs = Array.from({ length: n }, (_, i) => base + ((i * ecart) % 5) - 2);
      const somme = valeurs.reduce((s, v) => s + v, 0);
      const moyenne = somme / n;
      return {
        text: `Quelle est la moyenne de la série ci-contre ?`,
        format: "short",
        expected: [fr(Math.round(moyenne * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasSerie(valeurs, "Série statistique"),
        explanation: exp(
          "La moyenne d'une série est la somme de ses valeurs divisée par leur nombre.",
          "On additionne, puis on divise par l'effectif.",
          `$${valeurs.join(" + ")} = ${somme}$, et $\\dfrac{${somme}}{${n}} = ${fr(Math.round(moyenne * 100) / 100)}$.`,
          `La moyenne vaut $${fr(Math.round(moyenne * 100) / 100)}$.`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_mediane ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_mediane_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_mediane",
    difficulty: 3,
    theme: "neutral",
    hint: "On RANGE d'abord la série dans l'ordre croissant. Avec un effectif pair, la médiane est la moyenne des deux valeurs centrales.",
    tags: ["premiere", "maths", "automatisme", "mediane", "template", "short"],
    generate: () => {
      // Effectif pair, comme au sujet de Métropole : 2 ; 3 ; 5 ; 4 ; 2 ; 3.
      const valeurs = shuffle([2, 2, 3, 3, 4, 5] as const).slice(0, 6);
      const triees = [...valeurs].sort((a, b) => a - b);
      const mediane = (triees[2] + triees[3]) / 2;
      return {
        text:
          `Voici les six dernières notes attribuées à un hôtel : ` +
          `$${valeurs.join(" \\, ; \\, ")}$. Quelle est la médiane de cette série ?`,
        format: "short",
        expected: [fr(mediane)],
        comparator: "number_equal",
        canvas: canvasSerie([...valeurs], "Les six notes, dans l'ordre où elles ont été données"),
        explanation: exp(
          "La médiane partage la série ordonnée en deux moitiés de même effectif.",
          "On range d'abord les valeurs dans l'ordre croissant. L'effectif étant PAIR, la médiane est la moyenne des deux valeurs centrales.",
          `Série ordonnée : $${triees.join(" \\, ; \\, ")}$. Les deux valeurs centrales sont $${triees[2]}$ et $${triees[3]}$, ` +
            `donc la médiane vaut $\\dfrac{${triees[2]} + ${triees[3]}}{2} = ${fr(mediane)}$.`,
          `La médiane est $${fr(mediane)}$. ⚠️ Oublier de ranger la série est l'erreur classique. ` +
            `(Question tombée à Métropole, juin 2026.)`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_quartiles ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_quartiles_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_quartiles",
    difficulty: 4,
    theme: "neutral",
    hint: "Le premier quartile est la plus petite valeur telle qu'au moins un quart de la série lui soit inférieur ou égal.",
    tags: ["premiere", "maths", "automatisme", "quartiles", "template", "short"],
    generate: () => {
      // Effectif 8 : Q1 est la 2ᵉ valeur (8/4 = 2). Les valeurs sont tirées,
      // pas seulement mélangées : le tableau affiche la série TRIÉE, donc un
      // simple mélange donnerait toujours le même énoncé.
      const depart = pick([2, 3, 4, 5, 6] as const);
      const pas = pick([1, 2, 3] as const);
      const bruit = pick([0, 1, 2] as const);
      const triees = Array.from({ length: 8 }, (_, i) => depart + i * pas + (i % 3 === 0 ? bruit : 0));
      const valeurs = triees;
      const q1 = triees[1];
      return {
        text:
          `Une série comporte $8$ valeurs, données ci-contre. ` +
          `Quel est son premier quartile $Q_1$ ?`,
        format: "short",
        expected: [String(q1)],
        comparator: "number_equal",
        canvas: canvasSerie([...triees], "Série rangée dans l'ordre croissant"),
        explanation: exp(
          "Le premier quartile $Q_1$ est la plus petite valeur de la série ordonnée telle qu'au moins $25\\,\\%$ des données lui soient inférieures ou égales.",
          "On calcule $\\dfrac{n}{4}$ ; si le résultat est entier, $Q_1$ est la valeur de ce rang.",
          `$\\dfrac{8}{4} = 2$, donc $Q_1$ est la $2^\\text{e}$ valeur de la série ordonnée, soit $${q1}$.`,
          `$Q_1 = ${q1}$ : un quart au moins des valeurs lui sont inférieures ou égales.`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_interpreter_indicateurs ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_auto_interpreter_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_interpreter_indicateurs",
    difficulty: 4,
    theme: "neutral",
    text:
      "Dans une entreprise, le salaire MOYEN est de $2\\,800$ € et le salaire MÉDIAN de $2\\,100$ €. " +
      "Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "Quelques salaires très élevés tirent la moyenne vers le haut",
      "La moitié des salariés gagnent $2\\,800$ €",
      "Tous les salaires sont compris entre $2\\,100$ € et $2\\,800$ €",
      "Il y a une erreur : la moyenne ne peut pas dépasser la médiane",
    ],
    expected: ["Quelques salaires très élevés tirent la moyenne vers le haut"],
    comparator: "mcq_exact",
    hint: "La médiane ne bouge pas quand une valeur extrême devient encore plus extrême. La moyenne, si.",
    explanation: exp(
      "La médiane partage l'effectif en deux ; la moyenne tient compte de la VALEUR de chaque donnée, y compris des valeurs extrêmes.",
      "On compare les deux indicateurs : un écart important signale une distribution déséquilibrée.",
      "Ici la moyenne dépasse la médiane de $700$ € : la moitié des salariés gagnent moins de $2\\,100$ €, mais quelques hauts salaires suffisent à relever la moyenne.",
      "Quelques salaires très élevés tirent la moyenne vers le haut. C'est pourquoi on publie souvent le salaire MÉDIAN : il résiste aux valeurs extrêmes."
    ),
    choiceDiagnostics: [
      {
        choice: "La moitié des salariés gagnent $2\\,800$ €",
        cause: "confond moyenne et médiane : c'est la médiane qui partage l'effectif en deux",
      },
    ],
    tags: ["premiere", "maths", "automatisme", "indicateurs", "esprit-critique"],
  },

  {
    kind: "template",
    id: "premiere_auto_interpreter_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_interpreter_indicateurs",
    difficulty: 4,
    theme: "neutral",
    hint: "La médiane ne bouge pas quand une valeur extrême devient plus extrême. La moyenne, si.",
    tags: ["premiere", "maths", "automatisme", "indicateurs", "template"],
    generate: () => {
      const cas = pick([
        {
          quoi: "les salaires d'une entreprise",
          unite: "€",
          moyenne: 2800,
          mediane: 2100,
          cause: "quelques salaires très élevés",
        },
        {
          quoi: "les loyers d'un quartier",
          unite: "€",
          moyenne: 950,
          mediane: 780,
          cause: "quelques loyers très élevés",
        },
        {
          quoi: "les temps de trajet des élèves d'un lycée",
          unite: "min",
          moyenne: 35,
          mediane: 22,
          cause: "quelques élèves venant de très loin",
        },
        {
          quoi: "les dons reçus par une association",
          unite: "€",
          moyenne: 140,
          mediane: 40,
          cause: "quelques dons très importants",
        },
      ] as const);
      return {
        text:
          `Pour ${cas.quoi}, la MOYENNE vaut $${cas.moyenne}$ ${cas.unite} et la MÉDIANE $${cas.mediane}$ ${cas.unite}. ` +
          `Que peut-on en déduire ?`,
        format: "qcm",
        choices: makeChoices(`${cas.cause} tirent la moyenne vers le haut`, [
          `la moitié des valeurs valent $${cas.moyenne}$ ${cas.unite}`,
          `toutes les valeurs sont comprises entre $${cas.mediane}$ et $${cas.moyenne}$ ${cas.unite}`,
          "il y a une erreur : la moyenne ne peut pas dépasser la médiane",
        ]),
        expected: [`${cas.cause} tirent la moyenne vers le haut`],
        comparator: "mcq_exact",
        explanation: exp(
          "La médiane partage l'effectif en deux ; la moyenne tient compte de la VALEUR de chaque donnée, y compris des valeurs extrêmes.",
          "On compare les deux indicateurs : un écart important signale une distribution déséquilibrée.",
          `Ici la moyenne dépasse la médiane de $${cas.moyenne - cas.mediane}$ ${cas.unite} : la moitié des valeurs sont sous $${cas.mediane}$, ` +
            `mais ${cas.cause} suffisent à relever la moyenne.`,
          `${cas.cause.charAt(0).toUpperCase()}${cas.cause.slice(1)} tirent la moyenne vers le haut. ` +
            `C'est pourquoi on publie souvent la MÉDIANE : elle résiste aux valeurs extrêmes.`
        ),
        choiceDiagnostics: [
          {
            choice: `la moitié des valeurs valent $${cas.moyenne}$ ${cas.unite}`,
            cause: "confond moyenne et médiane : c'est la médiane qui partage l'effectif en deux",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_stat_boites ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_auto_boites_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_boites",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un diagramme en boîte, que représente la LARGEUR de la boîte ?",
    format: "qcm",
    choices: [
      "L'écart interquartile, qui contient la moitié centrale des valeurs",
      "L'étendue totale de la série",
      "La moyenne de la série",
      "Le nombre de valeurs de la série",
    ],
    expected: ["L'écart interquartile, qui contient la moitié centrale des valeurs"],
    comparator: "mcq_exact",
    hint: "Les bords de la boîte sont $Q_1$ et $Q_3$.",
    explanation: exp(
      "Un diagramme en boîte représente cinq nombres : minimum, $Q_1$, médiane, $Q_3$, maximum.",
      "On repère ce que délimitent les bords de la boîte.",
      "Les bords sont $Q_1$ et $Q_3$ : entre eux se trouvent $50\\,\\%$ des valeurs, celles du milieu. Les moustaches, elles, vont jusqu'aux extrêmes.",
      "La largeur de la boîte est l'écart interquartile $Q_3 - Q_1$. Une boîte étroite signale des valeurs resserrées ; une boîte large, une série dispersée — c'est ce qui permet de COMPARER deux distributions d'un coup d'œil."
    ),
    tags: ["premiere", "maths", "automatisme", "boites"],
  },

  {
    kind: "template",
    id: "premiere_auto_boites_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_boites",
    difficulty: 4,
    theme: "neutral",
    hint: "Les bords de la boîte sont $Q_1$ et $Q_3$ ; les moustaches vont jusqu'aux extrêmes.",
    tags: ["premiere", "maths", "automatisme", "boites", "template"],
    generate: () => {
      const cas = pick([
        {
          question: "que représente la LARGEUR de la boîte ?",
          bonne: "l'écart interquartile, qui contient la moitié centrale des valeurs",
          pieges: [
            "l'étendue totale de la série",
            "la moyenne de la série",
            "le nombre de valeurs de la série",
          ],
          cle: "Les bords de la boîte sont $Q_1$ et $Q_3$ : entre eux se trouvent $50\\,\\%$ des valeurs.",
        },
        {
          question: "que représente le TRAIT à l'intérieur de la boîte ?",
          bonne: "la médiane",
          pieges: ["la moyenne", "le premier quartile", "l'étendue"],
          cle: "Le trait intérieur partage l'effectif en deux : c'est la médiane, pas la moyenne.",
        },
        {
          question: "que représentent les extrémités des MOUSTACHES ?",
          bonne: "le minimum et le maximum de la série",
          pieges: [
            "le premier et le troisième quartile",
            "la moyenne plus ou moins un écart",
            "les valeurs les plus fréquentes",
          ],
          cle: "Les moustaches vont jusqu'aux valeurs extrêmes ; ce sont les BORDS DE LA BOÎTE qui portent les quartiles.",
        },
        {
          question:
            "deux séries sont représentées : l'une a une boîte étroite, l'autre une boîte large. Que peut-on dire ?",
          bonne: "les valeurs de la première sont plus resserrées",
          pieges: [
            "la première a une moyenne plus élevée",
            "la première contient moins de valeurs",
            "les deux séries sont identiques",
          ],
          cle: "La largeur de la boîte mesure la DISPERSION de la moitié centrale, pas le niveau ni l'effectif.",
        },
      ] as const);
      return {
        text: `Sur un diagramme en boîte, ${cas.question}`,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un diagramme en boîte résume une série par cinq nombres : minimum, $Q_1$, médiane, $Q_3$, maximum.",
          "On repère à quel élément du dessin correspond chacun de ces cinq nombres.",
          cas.cle,
          `${cas.bonne.charAt(0).toUpperCase()}${cas.bonne.slice(1)}. ` +
            `C'est ce qui permet de COMPARER deux distributions d'un seul coup d'œil.`
        ),
      };
    },
  },

  // Les automatismes de probabilités (auto_proba_base) vivent dans
  // automatismes-probabilites.bank.ts depuis le 15/10/2026 (ids conservés).
];

// 28/10 : les micros de proportions et d'évolutions sont renforcées (générateurs
// à nombreuses tournures) ; leurs anciens gabarits et leurs « open » sont retirés.
export const automatismesProportionsStatsBank: TutorBankItemV4[] = fusionnerRenfort(anciens, renfortPremiere.filter((i) => i.notionId === "auto_proportion" || i.notionId === "auto_partie_tout"));
