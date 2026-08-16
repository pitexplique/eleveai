// La bonne réponse se voit-elle SANS RIEN SAVOIR ?
//
// POURQUOI CE SIXIÈME VÉRIFICATEUR (16/08/2026). Les cinq autres répondent
// chacun à une question honnête :
//   - auditer-banque.mjs      : y a-t-il de quoi ne pas se répéter ?
//   - verifier-banque.mjs     : l'item écrit à la main est-il utilisable ?
//   - verifier-generateurs.mjs: le gabarit tire-t-il des questions valides ?
//   - verifier-variete.mjs    : les textes sont-ils différents ?
//   - echantillon-banque.mjs  : les questions sont-elles VRAIMENT différentes ?
// Aucun ne demande si la bonne réponse se DEVINE. Et c'est exactement ce qui
// s'était installé dans le coach IA sans que rien ne s'allume :
//
//     « Pourquoi montrer un EXEMPLE du résultat voulu à l'IA ? »
//       · Pour qu'elle imite le style et le format que j'attends.   ← 55 car.
//       · Pour la perturber.                                        ← 19 car.
//       · Cela ne change rien du tout.                              ← 29 car.
//       · Pour qu'elle refuse de répondre.                          ← 33 car.
//
// L'élève n'a pas besoin de savoir ce qu'est un exemple dans un prompt : la
// phrase complète et raisonnable gagne, les trois autres sont des blagues.
// Il sort à 95 % d'un coach qui croit l'avoir évalué. Le score ment, donc le
// diagnostic ment, donc la remédiation vise à côté.
//
// ─────────────────────────────────────────────────────────────────────────────
// L'INSTRUMENT ET SON ÉTALON  (Frédéric, 16/08/2026 : « fais attention à
// l'instrument de mesure et à l'étalon, comme en qualité industrielle »)
//
// La première version de ce script a mesuré la MÊME banque à 88 % puis à 68 %
// selon qu'elle tirait les gabarits une fois ou trente. Le coupable n'était pas
// le hasard : elle comptait chaque TIRAGE comme une observation, si bien qu'un
// gabarit pesait n fois un item figé. Changer le réglage changeait la
// pondération, donc la grandeur elle-même. Un instrument qui rend deux valeurs
// pour un même objet ne mesure rien. Trois exigences en découlent, et le script
// les porte lui-même :
//
//   1. JUSTESSE — `--etalon` passe des banques FABRIQUÉES dont on connaît la
//      valeur vraie : une où la bonne réponse est délibérément la plus longue
//      (100 %), une aux longueurs égalisées (~1/nombre de choix, avance nulle),
//      une numérique. Si la mesure ne retombe pas dessus, l'instrument est
//      faux, et la sortie tombe AVANT d'avoir jugé la moindre banque réelle.
//
//   2. RÉPÉTABILITÉ ET REPRODUCTIBILITÉ — `--rr` conduit l'étude R&R.
//      RÉPÉTABILITÉ : même réglage, même session, on remesure la même banque.
//      C'est la dispersion propre de l'instrument, ici née du tirage sans
//      graine des gabarits.
//      REPRODUCTIBILITÉ : on change les conditions — le nombre de tirages, et
//      la session Node (processus séparé, autre suite de hasards). C'est ce
//      qui manquait à la première version : elle donnait 88 % à un tirage par
//      gabarit et 68 % à trente, sur la MÊME banque. Un instrument qui change
//      d'avis quand on change son réglage n'est pas reproductible.
//      Les deux sont comparées à une TOLÉRANCE — l'écart qu'on veut vraiment
//      détecter, entre une banque saine et une banque devinable — et le
//      rapport des deux dit si l'instrument est capable. Sous 10 % il l'est,
//      au-delà de 30 % il ne l'est pas.
//
//   3. SEUIL CALÉ, PAS CHOISI — `--distribution` mesure TOUTES les matières du
//      dépôt. Le seuil se lit sur ce que rendent les banques saines, il ne se
//      décrète pas. Les valeurs retenues figurent plus bas, avec la mesure qui
//      les justifie et sa date.
//
// CE QU'IL NE MESURE PAS. Ni la justesse ni la pertinence : un distracteur de
// bonne longueur peut rester idiot. C'est un détecteur de paresse d'écriture,
// pas un correcteur. Il dit « devinable », il ne dit pas « juste ».
//
// ⚠️ UNE BANQUE NUMÉRIQUE N'EST PAS FAUTIVE. En maths, « 1 234,5 » s'écrit
// plus long que « 12 » sans que personne l'ait voulu. D'où le double critère,
// et d'où l'étalon numérique.
//
// Usage : node --experimental-strip-types scripts/verifier-devinabilite.mjs [classe] [matiere] [tirages]
//         node --experimental-strip-types scripts/verifier-devinabilite.mjs --etalon
//         node --experimental-strip-types scripts/verifier-devinabilite.mjs --rr ia
//         node --experimental-strip-types scripts/verifier-devinabilite.mjs --distribution

import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

/* Sans ce hook, toute banque qui importe autre chose que des types ne se
   charge pas : Node ne résout pas l'alias `@/`. Voir scripts/lib/alias-loader.mjs. */
register("./lib/alias-loader.mjs", import.meta.url);

const DRAPEAUX = process.argv.slice(2).filter((a) => a.startsWith("--"));
const ARGS = process.argv.slice(2).filter((a) => !a.startsWith("--"));

const CLASSE = ARGS[0] || "toutes";
const MATIERE = ARGS[1] || "ia";
/* 120 — valeur ÉTALONNÉE, pas choisie (`--rr`, 16/08/2026). Une fois la
   grandeur redéfinie par ITEM et non par tirage (voir `mesurerBanque`), le
   réglage ne déplace plus la valeur, il ne fait que du bruit : la même banque
   rend +31,5 / +30,8 / +31,0 / +30,9 / +30,9 caractères à 1, 5, 20, 120 et
   360 tirages, pendant que l'écart-type tombe de 0,57 à 0,02.
   À 120 : répétabilité σ = 0,04 car. pour une tolérance de 18, soit 1,4 % —
   capable au sens industriel (< 10 %). Monter à 360 ne gagne plus rien. */
const TIRAGES = Number(ARGS[2]) || 120;

const RACINE = path.resolve("lib/tutor-v4/questionBank");

/* ── LES SEUILS, ET D'OÙ ILS VIENNENT ──────────────────────────────────────
   RELEVÉ DU 16/08/2026 sur les 39 banques du dépôt (`--distribution`), soit
   ~21 000 items. La population se sépare d'elle-même, sans qu'on ait à
   trancher :

     médiane des banques saines .................  26 %  ·  +3,1 car.
     9ᵉ décile ..................................  55 %  ·  +9,7 car.
     pire banque hors IA (français CE2) .........  54 %  · +22,3 car.
     ————————————— le fossé —————————————
     meilleure banque IA (b1) ...................  87 %  · +29,2 car.
     pire banque IA (a2) ........................  96 %  · +37,9 car.

   Sept caractères séparent le pire cas sain du meilleur cas fautif : le seuil
   se pose dans ce vide, à 25. Il n'a pas été choisi, il a été lu.
   ⚠️ À REFAIRE si les banques changent en masse — un seuil calé sur un état
   ancien ne mesure plus rien. */
const SEUIL_PART = 0.8;
const SEUIL_ECART = 15;
/* Entre le 9ᵉ décile des banques saines (+9,7) et le seuil de rupture, il
   reste une zone où l'on n'est plus dans la norme sans être fautif : le
   français de CE2 y est (+22,3). On le signale, on ne le fait pas tomber. */
const SEUIL_SURVEILLANCE = 15;
/* La part seule ne suffit pas. Un gabarit dont le pool contient quelques
   bonnes réponses courtes fait tomber la part sous 80 % alors que l'avance
   moyenne reste à trente caractères : la question se devine toujours, mais pas
   à tous les tirages. L'avance est le signal robuste. */
const SEUIL_ECART_SEUL = 25;

/** On ne liste que les items dont l'avance saute aux yeux. */
const SEUIL_ITEM = 20;

// ═══════════════════════════════════════════════════════════════════════════
// LA MESURE — une fonction pure, pour que l'étalon passe par le même chemin
// que les banques réelles. Un étalon qui emprunterait un autre code ne
// prouverait rien.
// ═══════════════════════════════════════════════════════════════════════════

/* La ponctuation et les espaces comptent dans ce que l'œil voit : on mesure la
   ligne telle qu'elle s'affiche, sans la nettoyer. */
function mesurerQuestion(q) {
  if (q.format !== "qcm" || !Array.isArray(q.choices)) return null;
  const bonne = q.expected?.[0];
  if (typeof bonne !== "string" || !q.choices.includes(bonne)) return null;
  if (q.choices.length < 3) return { pileOuFace: q.choices.length === 2 };

  const autres = q.choices.filter((c) => c !== bonne);
  if (!autres.length) return null;

  const maxAutres = Math.max(...autres.map((c) => c.length));
  const moyAutres = autres.reduce((s, c) => s + c.length, 0) / autres.length;

  return {
    pileOuFace: false,
    laPlusLongue: bonne.length > maxAutres,
    ecart: bonne.length - moyAutres,
  };
}

/**
 * Mesure une liste d'items (fixed ou template).
 *
 * ⚠️ CHAQUE ITEM PÈSE UN, ET UN SEUL. La première version comptait chaque
 * TIRAGE comme une observation : un item figé pesait 1, un gabarit pesait n.
 * Changer le nombre de tirages changeait donc la pondération, et avec elle la
 * grandeur mesurée — la banque c1 « valait » +47 caractères à quarante tirages
 * et +51 à cent vingt, sans qu'une ligne de contenu ait bougé. Une grandeur
 * qui dépend du réglage de l'instrument n'est pas une grandeur.
 * On calcule donc d'abord la valeur PROPRE de chaque item (moyenne de ses
 * tirages), puis la moyenne sur les items. Les tirages ne servent plus qu'à
 * estimer chaque item : ils réduisent le bruit, ils ne déplacent plus la cible.
 */
function mesurerBanque(liste, tirages = TIRAGES) {
  const stats = { n: 0, plusLongues: 0, ecart: 0, pileOuFace: 0, items: 0 };
  const pires = [];
  /* Les valeurs par item, chacune comptant pour une. */
  const partParItem = [];
  const ecartParItem = [];

  for (const item of liste) {
    stats.items += 1;

    const echantillon =
      item.kind === "fixed"
        ? [item]
        : Array.from({ length: tirages }, () => {
            try {
              return item.generate();
            } catch {
              return null;
            }
          }).filter(Boolean);

    let nItem = 0;
    let ecartItem = 0;
    let longuesItem = 0;
    /* Un vrai/faux ne se mesure pas en longueur : « Vrai » et « Faux » font
       quatre lettres. Il se compte à part, UNE FOIS par item — un gabarit tiré
       quarante fois reste un seul vrai/faux dans la banque. */
    let pileOuFaceItem = false;

    for (const q of echantillon) {
      const m = mesurerQuestion(q);
      if (!m) continue;
      if (m.pileOuFace) {
        pileOuFaceItem = true;
        continue;
      }
      stats.n += 1;
      nItem += 1;
      if (m.laPlusLongue) {
        stats.plusLongues += 1;
        longuesItem += 1;
      }
      stats.ecart += m.ecart;
      ecartItem += m.ecart;
    }

    if (pileOuFaceItem) stats.pileOuFace += 1;
    if (nItem) {
      partParItem.push(longuesItem / nItem);
      ecartParItem.push(ecartItem / nItem);
      if (ecartItem / nItem >= SEUIL_ITEM) {
        pires.push({ id: item.id, ecart: ecartItem / nItem, part: longuesItem / nItem });
      }
    }
  }

  stats.mesures = partParItem.length;
  stats.part = partParItem.length
    ? partParItem.reduce((s, x) => s + x, 0) / partParItem.length
    : null;
  stats.ecartMoyen = ecartParItem.length
    ? ecartParItem.reduce((s, x) => s + x, 0) / ecartParItem.length
    : null;

  return { stats, pires };
}

function resume(stats) {
  if (!stats.mesures) return null;
  return { part: stats.part, ecart: stats.ecartMoyen };
}

function enDefaut(r) {
  if (!r) return false;
  return (r.part >= SEUIL_PART && r.ecart >= SEUIL_ECART) || r.ecart >= SEUIL_ECART_SEUL;
}

/** Hors norme sans être fautif : on le montre, il ne fait pas tomber. */
function aSurveiller(r) {
  return Boolean(r) && !enDefaut(r) && r.ecart >= SEUIL_SURVEILLANCE;
}

function drapeau(r) {
  return enDefaut(r) ? "⛔" : aSurveiller(r) ? "🟠" : "🟢";
}

// ═══════════════════════════════════════════════════════════════════════════
// L'ÉTALON — des banques de valeur connue, fabriquées ici.
// ═══════════════════════════════════════════════════════════════════════════

function qcm(id, bonne, mauvaises) {
  return {
    kind: "fixed",
    id,
    format: "qcm",
    choices: [bonne, ...mauvaises],
    expected: [bonne],
  };
}

/* Étalon nº1 — le défaut pur. La bonne réponse est toujours la plus longue,
   avec une avance franche. Valeur vraie : 100 %, avance ≈ +40 caractères. */
const ETALON_DEVINABLE = Array.from({ length: 20 }, (_, i) =>
  qcm(`devinable_${i}`, `Une phrase complète et raisonnable qui explique vraiment pourquoi ${i}.`, [
    "Non.",
    "Jamais de la vie.",
    "Pour rire un peu.",
  ]),
);

/* Étalon nº2 — l'écriture saine. Quatre propositions de même longueur : la
   bonne ne se distingue plus. Valeur vraie : 0 % (aucune n'est LA plus
   longue, elles sont à égalité), avance ≈ 0. */
const ETALON_EGALISE = Array.from({ length: 20 }, (_, i) =>
  qcm(`egalise_${i}`, `Le modèle apprend sur des exemples annotés par des humains ${i}.`, [
    `Le modèle apprend en recopiant une encyclopédie vérifiée ${i}...`,
    `Le modèle apprend en interrogeant les internautes en direct ${i}`,
    `Le modèle apprend en appliquant des règles écrites à la main ${i}`,
  ]),
);

/* Étalon nº3 — le numérique innocent. Les longueurs varient parce que les
   nombres varient, sans intention. Valeur vraie : part moyenne, avance de
   l'ordre de un ou deux caractères. La sortie ne doit PAS tomber. */
const ETALON_NUMERIQUE = Array.from({ length: 20 }, (_, i) =>
  qcm(`nombre_${i}`, String(120 + i * 7), [String(119 + i * 7), String(121 + i * 7), String(130 + i * 7)]),
);

function verifierEtalon() {
  console.log("\nÉTALONNAGE DE L'INSTRUMENT");
  console.log("─".repeat(72));

  const cas = [
    {
      nom: "défaut pur (bonne réponse la plus longue)",
      liste: ETALON_DEVINABLE,
      partAttendue: [0.99, 1.0],
      ecartAttendu: [30, 60],
      doitTomber: true,
    },
    {
      nom: "écriture saine (longueurs égalisées)",
      liste: ETALON_EGALISE,
      partAttendue: [0.0, 0.05],
      ecartAttendu: [-3, 3],
      doitTomber: false,
    },
    {
      nom: "numérique innocent",
      liste: ETALON_NUMERIQUE,
      partAttendue: [0.0, 1.0],
      ecartAttendu: [-3, 3],
      doitTomber: false,
    },
  ];

  let faux = 0;

  for (const c of cas) {
    const r = resume(mesurerBanque(c.liste).stats);
    const partOk = r.part >= c.partAttendue[0] && r.part <= c.partAttendue[1];
    const ecartOk = r.ecart >= c.ecartAttendu[0] && r.ecart <= c.ecartAttendu[1];
    const tombeOk = enDefaut(r) === c.doitTomber;
    const ok = partOk && ecartOk && tombeOk;
    if (!ok) faux += 1;

    console.log(
      `${ok ? "🟢" : "⛔"} ${c.nom.padEnd(44)} ${String(Math.round(r.part * 100)).padStart(3)} % · ${r.ecart >= 0 ? "+" : ""}${r.ecart.toFixed(1)} car. · ${enDefaut(r) ? "tombe" : "passe"}`,
    );
    if (!ok) {
      console.log(
        `   attendu : ${Math.round(c.partAttendue[0] * 100)}-${Math.round(c.partAttendue[1] * 100)} % · ` +
          `${c.ecartAttendu[0]} à ${c.ecartAttendu[1]} car. · ${c.doitTomber ? "tombe" : "passe"}`,
      );
    }
  }

  if (faux) {
    console.log(
      `\n⛔ ${faux} étalon(s) hors tolérance : l'instrument est faux, ce qu'il dirait des\n` +
        `banques réelles ne vaut rien. Réparer l'instrument avant de juger le contenu.\n`,
    );
    process.exit(1);
  }
  console.log("\nL'instrument retombe sur ses trois étalons.\n");
}

// ═══════════════════════════════════════════════════════════════════════════
// CHARGEMENT DES BANQUES RÉELLES
// ═══════════════════════════════════════════════════════════════════════════

function items(mod) {
  const trouves = [];
  for (const valeur of Object.values(mod)) {
    if (!Array.isArray(valeur)) continue;
    for (const item of valeur) {
      if (item && typeof item === "object" && "kind" in item && "id" in item) {
        trouves.push(item);
      }
    }
  }
  return trouves;
}

function classesDisponibles(matiere) {
  return fs
    .readdirSync(RACINE, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((c) => fs.existsSync(path.join(RACINE, c, matiere)))
    .sort();
}

function matieresDisponibles() {
  const vues = new Set();
  for (const classe of fs.readdirSync(RACINE, { withFileTypes: true })) {
    if (!classe.isDirectory()) continue;
    for (const m of fs.readdirSync(path.join(RACINE, classe.name), { withFileTypes: true })) {
      if (m.isDirectory()) vues.add(m.name);
    }
  }
  return [...vues].sort();
}

const nonCouverts = [];

/** Charge les items d'une (classe, matière), index.ts EN DERNIER. */
async function chargerBanque(classe, matiere) {
  const dossier = path.join(RACINE, classe, matiere);
  if (!fs.existsSync(dossier)) return [];

  /* L'index en dernier, comme dans verifier-generateurs.mjs : les items qu'un
     vrai fichier expose gardent son nom, l'index rattrape le reste. */
  const fichiers = fs
    .readdirSync(dossier)
    .filter((f) => f.endsWith(".ts"))
    .sort(
      (a, b) =>
        Number(a.startsWith("index.")) - Number(b.startsWith("index.")) || a.localeCompare(b),
    );

  const idsVus = new Set();
  const liste = [];

  for (const fichier of fichiers) {
    let mod;
    try {
      mod = await import(pathToFileURL(path.join(dossier, fichier)).href);
    } catch (e) {
      nonCouverts.push({ classe, matiere, fichier, raison: e.message.split("\n")[0] });
      continue;
    }
    for (const item of items(mod)) {
      if (idsVus.has(item.id)) continue;
      idsVus.add(item.id);
      liste.push({ ...item, fichier });
    }
  }

  return liste;
}

// ═══════════════════════════════════════════════════════════════════════════
// LES MODES
// ═══════════════════════════════════════════════════════════════════════════

/* ── L'ÉTUDE R&R ───────────────────────────────────────────────────────────
   Vocabulaire de la mesure industrielle, appliqué tel quel :
     PIÈCES        les banques mesurées (a1…c1) — elles doivent différer entre
                   elles, sinon on n'a rien à quoi comparer le bruit.
     OPÉRATEURS    les sessions Node séparées. Un autre processus, c'est une
                   autre suite de hasards : c'est notre changement de
                   conditions, donc notre reproductibilité.
     RÉPÉTITIONS   plusieurs mesures dans la même session, réglage identique :
                   la répétabilité.
     TOLÉRANCE     l'écart qu'on veut détecter. Une banque saine tourne autour
                   de +7 caractères d'avance, une banque devinable au-delà de
                   +25 : la tolérance est l'intervalle entre les deux. Sans
                   elle, un écart-type ne veut rien dire — 2 caractères de
                   bruit sont négligeables ici et rédhibitoires ailleurs. */
const RR_TOLERANCE_ECART = 18; // caractères : de +7 (sain) à +25 (devinable)
const RR_TOLERANCE_PART = 35; // points de % : de 60 % (sain) à 95 % (devinable)
const RR_OPERATEURS = 3;
const RR_REPETITIONS = 3;

function moyenne(xs) {
  return xs.reduce((s, x) => s + x, 0) / xs.length;
}

function variance(xs) {
  if (xs.length < 2) return 0;
  const m = moyenne(xs);
  return xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1);
}

/**
 * Décomposition de la variance sur un plan croisé pièces × opérateurs.
 * `valeurs[piece][operateur]` = tableau des répétitions.
 */
function gageRR(valeurs, tolerance) {
  const pieces = Object.keys(valeurs);
  const operateurs = Object.keys(valeurs[pieces[0]]);

  // Répétabilité : la dispersion DANS une cellule, moyennée sur les cellules.
  const varIntra = [];
  for (const p of pieces) for (const o of operateurs) varIntra.push(variance(valeurs[p][o]));
  const ev2 = moyenne(varIntra);

  // Reproductibilité : ce que la moyenne par opérateur ajoute, une fois
  // retirée la part qui vient déjà du bruit de répétition.
  const moyParOperateur = operateurs.map((o) =>
    moyenne(pieces.flatMap((p) => valeurs[p][o])),
  );
  const av2 = Math.max(0, variance(moyParOperateur) - ev2 / (pieces.length * RR_REPETITIONS));

  // Variation entre pièces : le signal qu'on cherche à voir.
  const moyParPiece = pieces.map((p) => moyenne(operateurs.flatMap((o) => valeurs[p][o])));
  const pv2 = Math.max(0, variance(moyParPiece) - ev2 / (operateurs.length * RR_REPETITIONS));

  const ev = Math.sqrt(ev2);
  const av = Math.sqrt(av2);
  const grr = Math.sqrt(ev2 + av2);
  const tv = Math.sqrt(ev2 + av2 + pv2);

  return {
    ev,
    av,
    grr,
    pv: Math.sqrt(pv2),
    partDuTotal: tv > 0 ? grr / tv : 0,
    // Convention 6σ : l'étendue naturelle de la mesure, rapportée à ce qu'on
    // veut distinguer.
    partDeLaTolerance: (6 * grr) / tolerance,
  };
}

function verdictCapabilite(part) {
  if (part < 0.1) return { texte: "capable", drapeau: "🟢" };
  if (part < 0.3) return { texte: "acceptable selon l'enjeu", drapeau: "🟠" };
  return { texte: "NON capable", drapeau: "⛔" };
}

/** Mode interne : une session mesure et rend du JSON. Sert d'« opérateur ». */
async function modeMesureBrute() {
  const matiere = ARGS[0] || "ia";
  const tirages = Number(ARGS[1]) || TIRAGES;
  const sortie = {};
  for (const classe of classesDisponibles(matiere)) {
    const liste = await chargerBanque(classe, matiere);
    const r = [];
    for (let i = 0; i < RR_REPETITIONS; i++) {
      const m = resume(mesurerBanque(liste, tirages).stats);
      if (m) r.push({ part: m.part * 100, ecart: m.ecart });
    }
    if (r.length) sortie[classe] = r;
  }
  process.stdout.write(`\n@@JSON@@${JSON.stringify(sortie)}@@FIN@@\n`);
}

async function modeRR() {
  const { spawnSync } = await import("node:child_process");
  const matiere = ARGS[0] || "ia";

  console.log(`\nÉTUDE R&R · ${matiere.toUpperCase()} · ${TIRAGES} tirages par gabarit`);
  console.log("─".repeat(72));
  console.log(
    `${RR_OPERATEURS} sessions Node distinctes × ${RR_REPETITIONS} mesures, sur chaque banque.\n` +
      `Tolérance : ${RR_TOLERANCE_ECART} caractères d'avance (de +7 sain à +25 devinable).\n`,
  );

  /** valeurs[classe][operateur] = [répétitions] */
  const ecarts = {};
  const parts = {};

  for (let op = 0; op < RR_OPERATEURS; op++) {
    const res = spawnSync(
      process.execPath,
      [
        "--experimental-strip-types",
        "--no-warnings",
        process.argv[1],
        "--mesure-brute",
        matiere,
        String(TIRAGES),
      ],
      { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
    );
    const brut = res.stdout?.match(/@@JSON@@(.*)@@FIN@@/)?.[1];
    if (!brut) {
      console.error(`La session ${op + 1} n'a rien rendu.`);
      if (res.stderr) console.error(res.stderr.split("\n").slice(-6).join("\n"));
      process.exit(1);
    }
    for (const [classe, mesures] of Object.entries(JSON.parse(brut))) {
      (ecarts[classe] ??= {})[`op${op}`] = mesures.map((m) => m.ecart);
      (parts[classe] ??= {})[`op${op}`] = mesures.map((m) => m.part);
    }
    console.log(`  session ${op + 1}/${RR_OPERATEURS} mesurée`);
  }

  const classes = Object.keys(ecarts);
  if (classes.length < 2) {
    console.error("\nIl faut au moins deux banques pour comparer le bruit au signal.");
    process.exit(1);
  }

  console.log("\nAvance moyenne par banque et par session (caractères) :");
  console.log(
    `${"".padEnd(10)}${Array.from({ length: RR_OPERATEURS }, (_, i) => `session ${i + 1}`.padStart(12)).join("")}${"étendue".padStart(12)}`,
  );
  for (const c of classes) {
    const moyennes = Object.values(ecarts[c]).map((r) => moyenne(r));
    console.log(
      `${c.padEnd(10)}${moyennes.map((m) => m.toFixed(1).padStart(12)).join("")}` +
        `${(Math.max(...moyennes) - Math.min(...moyennes)).toFixed(1).padStart(12)}`,
    );
  }

  for (const [nom, valeurs, tol, unite] of [
    ["AVANCE", ecarts, RR_TOLERANCE_ECART, "car."],
    ["PART « LA PLUS LONGUE »", parts, RR_TOLERANCE_PART, "pts"],
  ]) {
    const rr = gageRR(valeurs, tol);
    const v = verdictCapabilite(rr.partDeLaTolerance);
    console.log(`\n── ${nom}`);
    console.log(`   répétabilité   σ = ${rr.ev.toFixed(2)} ${unite}   (même session, même réglage)`);
    console.log(`   reproductibilité σ = ${rr.av.toFixed(2)} ${unite}   (d'une session à l'autre)`);
    console.log(`   R&R            σ = ${rr.grr.toFixed(2)} ${unite}   · variation entre banques σ = ${rr.pv.toFixed(2)} ${unite}`);
    console.log(
      `   ${v.drapeau} R&R = ${(rr.partDeLaTolerance * 100).toFixed(1)} % de la tolérance ` +
        `(${(rr.partDuTotal * 100).toFixed(1)} % de la variation totale) → instrument ${v.texte}`,
    );
  }

  console.log(
    `\nReproductibilité au RÉGLAGE — la même banque, mesurée avec des nombres de\n` +
      `tirages différents. C'est le défaut qui avait échappé : un instrument qui\n` +
      `change d'avis quand on change son réglage ne mesure pas l'objet.\n`,
  );
  const temoin = classes[0];
  const liste = await chargerBanque(temoin, matiere);
  for (const t of [1, 5, 20, TIRAGES, TIRAGES * 3]) {
    const mesures = Array.from({ length: 5 }, () => resume(mesurerBanque(liste, t).stats));
    const e = mesures.map((m) => m.ecart);
    const p = mesures.map((m) => m.part * 100);
    console.log(
      `  ${String(t).padStart(4)} tirages · avance ${moyenne(e).toFixed(1)} car. (σ ${Math.sqrt(variance(e)).toFixed(2)}) · ` +
        `part ${moyenne(p).toFixed(1)} % (σ ${Math.sqrt(variance(p)).toFixed(2)})   [${temoin}]`,
    );
  }
  console.log();
}

async function modeDistribution() {
  console.log("\nDISTRIBUTION SUR TOUT LE DÉPÔT");
  console.log("─".repeat(72));
  console.log("Le seuil se lit sur ce que rendent les banques, il ne se décrète pas.\n");

  const lignes = [];
  for (const matiere of matieresDisponibles()) {
    for (const classe of classesDisponibles(matiere)) {
      const liste = await chargerBanque(classe, matiere);
      const r = resume(mesurerBanque(liste).stats);
      if (!r) continue;
      lignes.push({ matiere, classe, ...r, items: liste.length });
    }
  }

  lignes.sort((a, b) => b.ecart - a.ecart);
  for (const l of lignes) {
    console.log(
      `${drapeau(l)} ${`${l.matiere}/${l.classe}`.padEnd(24)} ${String(l.items).padStart(4)} items · ` +
        `${String(Math.round(l.part * 100)).padStart(3)} % · ${l.ecart >= 0 ? "+" : ""}${l.ecart.toFixed(1)} car.`,
    );
  }

  const sains = lignes.filter((l) => !enDefaut(l));
  if (sains.length) {
    const parts = sains.map((l) => l.part * 100).sort((a, b) => a - b);
    const ecarts = sains.map((l) => l.ecart).sort((a, b) => a - b);
    const q = (xs, p) => xs[Math.min(xs.length - 1, Math.floor(xs.length * p))];
    console.log(
      `\nSur les ${sains.length} banques qui passent : part médiane ${q(parts, 0.5).toFixed(0)} % ` +
        `(9ᵉ décile ${q(parts, 0.9).toFixed(0)} %) · avance médiane ${q(ecarts, 0.5).toFixed(1)} car. ` +
        `(9ᵉ décile ${q(ecarts, 0.9).toFixed(1)} car.)`,
    );
    console.log(
      `Seuils en vigueur : part ≥ ${Math.round(SEUIL_PART * 100)} % ET avance ≥ ${SEUIL_ECART} car., ` +
        `ou avance ≥ ${SEUIL_ECART_SEUL} car. seule.\n`,
    );
  }
}

async function modeVerification() {
  const classes =
    CLASSE === "toutes" || CLASSE === "all" ? classesDisponibles(MATIERE) : [CLASSE];

  console.log(`\nDEVINABILITÉ · ${MATIERE.toUpperCase()}`);
  console.log("─".repeat(72));
  console.log("La bonne réponse est-elle repérable à sa seule longueur ?\n");

  let rouges = 0;
  const tousPires = [];

  for (const classe of classes) {
    const dossier = path.join(RACINE, classe, MATIERE);
    if (!fs.existsSync(dossier)) {
      console.error(`Introuvable : ${dossier}`);
      process.exit(1);
    }
    const liste = await chargerBanque(classe, MATIERE);
    const { stats, pires } = mesurerBanque(liste);
    const r = resume(stats);

    if (!r) {
      console.log(`${classe.padEnd(10)} aucun QCM à trois propositions ou plus.`);
      continue;
    }
    const rouge = enDefaut(r);
    if (rouge) rouges += 1;
    for (const p of pires) {
      tousPires.push({ ...p, classe, fichier: liste.find((i) => i.id === p.id)?.fichier ?? "?" });
    }

    console.log(
      `${drapeau(r)} ${classe.padEnd(10)} ${String(stats.items).padStart(4)} items · ${String(stats.mesures).padStart(4)} QCM mesurés · ` +
        `la plus longue : ${String(Math.round(r.part * 100)).padStart(3)} % · avance moyenne : ${r.ecart >= 0 ? "+" : ""}${r.ecart.toFixed(1)} car.` +
        (stats.pileOuFace ? `  · ${stats.pileOuFace} vrai/faux` : ""),
    );
  }

  if (tousPires.length) {
    console.log(`\nLes items où l'avance dépasse ${SEUIL_ITEM} caractères :`);
    for (const p of tousPires.sort((a, b) => b.ecart - a.ecart).slice(0, 40)) {
      console.log(`   ${`${p.classe}/${p.fichier}`.padEnd(22)} ${p.id.padEnd(34)} +${p.ecart.toFixed(0)} car.`);
    }
    if (tousPires.length > 40) console.log(`   … et ${tousPires.length - 40} autres.`);
  }

  if (nonCouverts.length) {
    console.log("\nFichiers illisibles par ce script :");
    for (const n of nonCouverts) console.log(`   ${n.classe}/${n.fichier} — ${n.raison}`);
  }

  if (rouges) {
    console.log(
      `\n${rouges} banque(s) où la bonne réponse se devine à sa longueur. L'élève peut\n` +
        `réussir sans rien connaître : le score ne mesure plus ce qu'il sait.\n`,
    );
    process.exit(1);
  }

  console.log("\nAucune banque ne se laisse gagner à la longueur.\n");
}

// ═══════════════════════════════════════════════════════════════════════════

/* Le mode interne des sous-processus ne réimprime pas l'étalonnage : il parle
   en JSON à son orchestrateur, qui l'a déjà fait. */
if (DRAPEAUX.includes("--mesure-brute")) {
  await modeMesureBrute();
  process.exit(0);
}

/* L'étalon passe AVANT toute mesure réelle, dans tous les modes : un
   instrument faux qui juge du contenu fait plus de dégâts qu'un contrôle
   absent, parce qu'il rassure. */
verifierEtalon();

if (DRAPEAUX.includes("--etalon")) process.exit(0);
if (DRAPEAUX.includes("--rr")) await modeRR();
else if (DRAPEAUX.includes("--distribution")) await modeDistribution();
else await modeVerification();
