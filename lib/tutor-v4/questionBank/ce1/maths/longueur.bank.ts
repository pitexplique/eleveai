// lib/tutor-v4/questionBank/ce1/maths/longueur.bank.ts
//
// Les longueurs du CE1, écrites à la main. Jusqu'ici les cinq
// micro-compétences passaient par le constructeur commun, qui aiguille sur la
// NOTION : « tracer un segment » et « comparer des longueurs » recevaient le
// même « Un ruban mesure 25 cm. On ajoute 22 cm… ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, tableau CE1) — et il est plus étroit
// que celui du CE2, qu'il ne faut donc PAS recopier :
//   — trois unités seulement : le mètre, le centimètre et le kilomètre. Le
//     décimètre et le millimètre arrivent au CE2. Aucune question ne doit les
//     faire apparaître, même dans un piège ;
//   — pas de tableau de conversion : on passe par les relations, 1 m = 100 cm
//     et 1 km = 1 000 m ;
//   — pas d'écriture à virgule. On écrit « 2 m 50 cm », jamais « 2,50 m ». La
//     virgule est réservée à la monnaie ;
//   — les nombres restent dans le millier.
//
// LE PIÈGE DE LA NOTION, celui qu'ils font tous : comparer les NOMBRES au lieu
// des longueurs. « 90 cm est plus long que 1 m, parce que 90 est plus grand
// que 1. » Il revient dans comparer, dans convertir et dans les défis.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce1/maths/index.ts) : un CE1 clique, il ne tape pas.
// Les réponses numériques en `short` deviennent cliquables toutes seules —
// l'unité écrite après le nombre est conservée par le convertisseur.

import type { NumberLineCanvasData, ObjetId, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
}

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function numberLine(data: Omit<NumberLineCanvasData, "kind">): NumberLineCanvasData {
  return { kind: "number_line", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Les trois unités du CE1, de la plus petite à la plus grande. */
const UNITES = [
  { abrev: "cm", nom: "centimètre", pluriel: "centimètres" },
  { abrev: "m", nom: "mètre", pluriel: "mètres" },
  { abrev: "km", nom: "kilomètre", pluriel: "kilomètres" },
] as const;

/* =========================================================
   LES GABARITS (10/11/2026) — situations × tournures × nombres
   ---------------------------------------------------------
   ⛔ Mesure du 10/11 : 5 à 12 squelettes par micro, 10 à 18
   répétitions sur 20. Chaque gabarit tire maintenant une
   FAMILLE, un objet du monde d'un enfant de 7 ans et une
   tournure. Dessins : la RÈGLE (`number_line` de 0 à 15, les
   points « début » et « fin » posés sur ses graduations), la
   BARRE (`schema_barre`, des mètres mis bout à bout, la part
   cherchée en « ? ») et l'OBJET dessiné (`objets`) pour savoir
   de quoi on parle avant de lire le mot.
   ⛔ Jamais de `schema_barre` qui mélange m et cm dans ses
   valeurs : il met les parts à l'échelle de leur NOMBRE, et
   « 1 m » à côté de « 90 cm » dessinerait 1 plus court que 90.
   Mesure : scripts/mesurer-squelettes-coach.ts ce1 longueur.
========================================================= */

type Q = TutorGeneratedQuestionV4;
type Enfant = { nom: string; il: "il" | "elle" };

const ENFANTS: readonly Enfant[] = [
  { nom: "Nina", il: "elle" }, { nom: "Téo", il: "il" }, { nom: "Zoé", il: "elle" },
  { nom: "Ravi", il: "il" }, { nom: "Lou", il: "elle" }, { nom: "Malo", il: "il" },
  { nom: "Inès", il: "elle" }, { nom: "Sacha", il: "il" }, { nom: "Amir", il: "il" },
  { nom: "Jade", il: "elle" }, { nom: "Naïa", il: "elle" }, { nom: "Tom", il: "il" },
  { nom: "Lina", il: "elle" }, { nom: "Yanis", il: "il" },
];
const enfant = () => randomChoice(ENFANTS);
/** « de Nina », « d'Amir ». */
const deNom = (nom: string) => (/^[AEIOUYÉÈÎ]/.test(nom) ? `d'${nom}` : `de ${nom}`);
/** « du toboggan », « de la piscine », « d'un livre ». */
const deLe = (x: string) =>
  x.startsWith("le ") ? `du ${x.slice(3)}` : x.startsWith("les ") ? `des ${x.slice(4)}` : /^(un|une) /.test(x) ? `d'${x}` : `de ${x}`;
function deuxEnfants(): [Enfant, Enfant] {
  const a = enfant();
  let b = enfant();
  while (b.nom === a.nom) b = enfant();
  return [a, b];
}
const tirer = (familles: readonly (() => Q)[]): Q => randomChoice(familles)();
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function qcm(text: string, bonne: string, pieges: readonly string[], explanation: string, canvas?: Q["canvas"]): Q {
  return {
    text,
    format: "qcm",
    choices: makeChoices(bonne, pieges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

function gab(id: string, microId: string, difficulty: 1 | 2 | 3 | 4 | 5, hint: string, generate: () => Q, tags: string[] = []): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["ce1", "longueur", "template", ...tags],
    generate,
  };
}

/** « 1 000 » : l'espace des milliers. */
const nb = (n: number) => (n >= 1000 ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, "0")}` : String(n));

/** La règle de l'écolier : de 0 à 15 cm, les points posés sur ses graduations. */
const regle = (points: { value: number; label: string; color?: string }[]): Q["canvas"] =>
  numberLine({ min: 0, max: 15, step: 1, points });

/** Des mètres mis bout à bout, ce qu'on cherche en « ? ». */
const metresBoutABout = (n: number, total: string, label = "1 m"): Q["canvas"] => ({
  kind: "schema_barre",
  total,
  parts: Array.from({ length: n }, () => ({ label, value: label })),
  display: { showTotal: true, showPartLabels: false, showValues: true },
});

/** De petits objets qu'on mesure à la règle (en cm, de 2 à 15). */
const PETITS: readonly { nom: string; le: string }[] = [
  { nom: "crayon", le: "le crayon" }, { nom: "clé", le: "la clé" }, { nom: "gomme", le: "la gomme" },
  { nom: "ver de terre", le: "le ver de terre" }, { nom: "chenille", le: "la chenille" },
  { nom: "plume de Pic", le: "la plume de Pic" }, { nom: "brindille", le: "la brindille" },
  { nom: "feutre", le: "le feutre" }, { nom: "petit poisson", le: "le petit poisson" },
  { nom: "coquillage", le: "le coquillage" }, { nom: "bâton de colle", le: "le bâton de colle" },
  { nom: "dinosaure en plastique", le: "le dinosaure en plastique" }, { nom: "ruban", le: "le ruban" },
  { nom: "pinceau", le: "le pinceau" }, { nom: "trombone géant", le: "le trombone géant" },
  { nom: "carotte du lapin", le: "la carotte du lapin" },
];

/** Des choses à mesurer, chacune avec SON unité et une longueur plausible. */
type Chose = { le: string; u: "cm" | "m" | "km"; v: number; dessin?: ObjetId };
const CHOSES: readonly Chose[] = [
  { le: "un crayon", u: "cm", v: 15 },
  { le: "une clé", u: "cm", v: 6, dessin: "cle" },
  { le: "un livre", u: "cm", v: 25, dessin: "livre" },
  { le: "une banane", u: "cm", v: 20, dessin: "banane" },
  { le: "une pomme", u: "cm", v: 8, dessin: "pomme" },
  { le: "une tasse", u: "cm", v: 10, dessin: "tasse" },
  { le: "un papillon", u: "cm", v: 6, dessin: "papillon" },
  { le: "un poisson rouge", u: "cm", v: 8, dessin: "poisson" },
  { le: "un cartable", u: "cm", v: 40, dessin: "cartable" },
  { le: "un ballon de foot", u: "cm", v: 22, dessin: "ballon" },
  { le: "une chaussure d'enfant", u: "cm", v: 20 },
  { le: "une cuillère", u: "cm", v: 15 },
  { le: "une voiture", u: "m", v: 4, dessin: "voiture" },
  { le: "un grand arbre", u: "m", v: 10, dessin: "arbre" },
  { le: "une maison", u: "m", v: 8, dessin: "maison" },
  { le: "un bateau de pêche", u: "m", v: 10, dessin: "bateau" },
  { le: "une girafe", u: "m", v: 5 },
  { le: "la piscine", u: "m", v: 25 },
  { le: "le tableau de la classe", u: "m", v: 3 },
  { le: "un autobus", u: "m", v: 12 },
  { le: "un lit", u: "m", v: 2 },
  { le: "le toboggan du parc", u: "m", v: 3 },
  { le: "la route jusqu'à la ville voisine", u: "km", v: 10 },
  { le: "une randonnée en montagne", u: "km", v: 8 },
  { le: "le trajet en train jusqu'à la mer", u: "km", v: 300 },
  { le: "le tour du lac à vélo", u: "km", v: 5 },
  { le: "la course du marathon", u: "km", v: 42 },
];
const dessinDe = (c: Chose): Q["canvas"] =>
  c.dessin ? { kind: "objets", elements: [{ quoi: c.dessin, label: c.le.replace(/^un |^une |^le |^la /, "") }], mode: "couleur" } : undefined;

const NOM_UNITE: Record<"cm" | "m" | "km", string> = { cm: "le centimètre", m: "le mètre", km: "le kilomètre" };
const PLURIEL_UNITE: Record<"cm" | "m" | "km", string> = { cm: "centimètres", m: "mètres", km: "kilomètres" };

/** Ce qui se mesure en mètres et se compare : rubans, cordes, trains… */
type Long = { le: string; nom: string; f: boolean; des: string };
const LONGS: readonly Long[] = [
  { le: "le ruban", nom: "Ruban", f: false, des: "rubans" },
  { le: "la corde à sauter", nom: "Corde à sauter", f: true, des: "cordes à sauter" },
  { le: "l'écharpe", nom: "Écharpe", f: true, des: "écharpes" },
  { le: "la guirlande", nom: "Guirlande", f: true, des: "guirlandes" },
  { le: "la ficelle du cerf-volant", nom: "Ficelle de cerf-volant", f: true, des: "ficelles de cerf-volant" },
  { le: "le train en bois", nom: "Train en bois", f: false, des: "trains en bois" },
  { le: "le tuyau d'arrosage", nom: "Tuyau d'arrosage", f: false, des: "tuyaux d'arrosage" },
  { le: "le serpent en papier", nom: "Serpent en papier", f: false, des: "serpents en papier" },
  { le: "le drapeau des pirates", nom: "Drapeau de pirate", f: false, des: "drapeaux de pirates" },
  { le: "la laisse du chien", nom: "Laisse de chien", f: true, des: "laisses de chien" },
];
const deQui = (L: Long, p: Enfant) => `${L.le} ${deNom(p.nom)}`;
const long_ = (L: Long, plus: boolean) => (plus ? (L.f ? "longue" : "long") : L.f ? "courte" : "court");
const leLa = (L: Long) => (L.f ? "la" : "le");

const GABARITS: TutorBankItemV4[] = [
  /* ---------- MESURER AVEC LA RÈGLE ---------- */
  gab("ce1_longueur_mesurer_tpl_3", "ce1_longueur_mesurer_cm_m", 1, "Le début est sur le 0 : lis le nombre au bout.", () => {
    const o = randomChoice(PETITS);
    const fin = randomInt(2, 10);
    return qcm(
      `${maj(o.le)} commence au 0. ${randomChoice([
        `Combien mesure ${o.le} ?`,
        "Lis sa longueur sur la règle.",
        "Quelle est sa longueur ?",
      ])}`,
      `${fin} cm`,
      [`${fin + 1} cm`, `${fin - 1} cm`, `${fin} m`, `${fin + 2} cm`],
      exp(
        "Mesurer, c'est compter les centimètres en partant de 0.",
        "Le début est sur le 0 : on lit la graduation au bout.",
        `Le bout est sur la graduation ${fin}.`,
        `${maj(o.le)} mesure ${fin} cm.`,
      ),
      regle([{ value: 0, label: "début", color: "#2563eb" }, { value: fin, label: "fin", color: "#ef4444" }]),
    );
  }, ["mesurer", "canvas"]),
  gab("ce1_longueur_mesurer_tpl_2", "ce1_longueur_mesurer_cm_m", 2, "Petit objet : en centimètres. Grand comme une porte : en mètres.", () =>
    tirer([
      () => {
        const o = randomChoice(PETITS);
        const fin = randomInt(6, 15);
        const p = enfant();
        return qcm(
          `${p.nom} mesure ${o.le} depuis le 0. ${randomChoice([
            "Combien de centimètres ?",
            `Quelle longueur lit-${p.il} ?`,
            "Lis la longueur.",
          ])}`,
          `${fin} cm`,
          [`${fin + 1} cm`, `${fin - 1} cm`, `${fin} m`, `${fin + 10} cm`],
          exp(
            "Mesurer, c'est compter les centimètres en partant de 0.",
            "Le début est sur le 0 : on lit la graduation au bout.",
            `Le bout est sur la graduation ${fin}.`,
            `${maj(o.le)} mesure ${fin} cm.`,
          ),
          regle([{ value: 0, label: "début", color: "#2563eb" }, { value: fin, label: "fin", color: "#ef4444" }]),
        );
      },
      () => {
        const c = randomChoice(CHOSES.filter((x) => x.u !== "km"));
        return qcm(
          `${randomChoice(["Pour mesurer", "On veut mesurer", "Ravi veut mesurer", "Zoé veut mesurer"])} ${c.le}. ${randomChoice([
            "Quelle unité choisit-on ?",
            "En quelle unité ?",
            "Centimètres ou mètres ?",
          ])}`,
          NOM_UNITE[c.u],
          ["le centimètre", "le mètre", "le kilomètre"],
          exp(
            "Le centimètre sert aux petits objets, le mètre aux grandes choses.",
            "On imagine l'objet : tient-il sur une règle ?",
            c.u === "cm" ? `${maj(c.le)} tient sur une règle.` : `${maj(c.le)} est bien plus grand qu'une règle.`,
            `On choisit ${NOM_UNITE[c.u]}.`,
          ),
          dessinDe(c),
        );
      },
    ]), ["mesurer", "canvas"]),
  gab("ce1_longueur_mesurer_tpl_1", "ce1_longueur_mesurer_cm_m", 3, "Le début n'est pas sur 0 : compte les centimètres entre les deux bouts.", () => {
    const o = randomChoice(PETITS);
    const debut = randomInt(1, 5);
    const long = randomInt(3, 9);
    const fin = debut + long;
    const p = enfant();
    return qcm(
      `${randomChoice([
        `${p.nom} a mal posé la règle.`,
        `La règle ${deNom(p.nom)} a glissé.`,
        `${p.nom} ne part pas du 0.`,
      ])} ${randomChoice([`Combien mesure ${o.le} ?`, "Quelle est la vraie longueur ?", "Combien de centimètres, vraiment ?"])}`,
      `${long} cm`,
      [`${fin} cm`, `${long + 1} cm`, `${debut} cm`, `${long - 1} cm`],
      exp(
        "Une longueur, c'est le nombre de centimètres entre les deux bouts.",
        "On compte les centimètres de la graduation du début jusqu'à celle de la fin.",
        `De ${debut} à ${fin}, il y a ${long} centimètres (${fin} − ${debut} = ${long}).`,
        `${maj(o.le)} mesure ${long} cm, pas ${fin} cm.`,
      ),
      regle([{ value: debut, label: "début", color: "#2563eb" }, { value: fin, label: "fin", color: "#ef4444" }]),
    );
  }, ["mesurer", "piege", "canvas"]),

  /* ---------- COMPARER ---------- */
  gab("ce1_longueur_comparer_tpl_3", "ce1_longueur_comparer", 2, "Même unité : le plus grand nombre est la plus grande longueur.", () => {
    const [p, q] = deuxEnfants();
    const L = randomChoice(LONGS);
    const u = randomChoice(["m", "cm"] as const);
    const a = u === "m" ? randomInt(2, 9) : randomInt(20, 95);
    let b = u === "m" ? randomInt(2, 9) : randomInt(20, 95);
    if (b === a) b = a + 1;
    const plus = randomChoice([true, false]);
    const gagnant = (a > b) === plus ? p : q;
    return qcm(
      `${L.nom} : ${p.nom} ${a} ${u}, ${q.nom} ${b} ${u}. ${randomChoice([
        `Qui a ${leLa(L)} plus ${long_(L, plus)} ?`,
        `Quel enfant a ${leLa(L)} plus ${long_(L, plus)} ?`,
      ])}`,
      gagnant.nom,
      [p.nom, q.nom, "les deux pareil"],
      exp(
        "Quand deux longueurs sont dans la même unité, on compare les nombres.",
        `On cherche le nombre le plus ${plus ? "grand" : "petit"}.`,
        `${Math.max(a, b)} ${u} > ${Math.min(a, b)} ${u}.`,
        `C'est ${gagnant.nom}.`,
      ),
    );
  }, ["comparer"]),
  gab("ce1_longueur_comparer_tpl_1", "ce1_longueur_comparer", 3, "1 m = 100 cm : écris les deux longueurs en centimètres.", () => {
    const [p, q] = deuxEnfants();
    const L = randomChoice(LONGS);
    const m = randomInt(1, 6);
    const ecart = randomChoice([-30, -20, -10, -5, 5, 10, 20, 30]);
    const cm = m * 100 + ecart;
    const mGagne = m * 100 > cm;
    return tirer([
      () => qcm(
        `${randomChoice(["Qu'est-ce qui est le plus long", "Quelle est la plus grande longueur"])} : ${m} m ou ${cm} cm ?`,
        mGagne ? `${m} m` : `${cm} cm`,
        [`${m} m`, `${cm} cm`, "c'est pareil"],
        exp(
          "1 m = 100 cm. Pour comparer, on écrit tout dans la même unité.",
          "On écrit les mètres en centimètres.",
          `${m} m = ${m * 100} cm, et ${m * 100} ${mGagne ? ">" : "<"} ${cm}.`,
          `C'est ${mGagne ? `${m} m` : `${cm} cm`}.`,
        ),
        metresBoutABout(m, `${m} m = ? cm`),
      ),
      () => qcm(
        `${L.nom} : ${p.nom} ${m} m, ${q.nom} ${cm} cm. ${randomChoice([`Qui a ${leLa(L)} plus ${long_(L, true)} ?`, `Quel enfant a ${leLa(L)} plus ${long_(L, true)} ?`])}`,
        mGagne ? p.nom : q.nom,
        [p.nom, q.nom, "les deux pareil"],
        exp(
          "1 m = 100 cm. Pour comparer, on écrit tout dans la même unité.",
          "On écrit les mètres en centimètres, puis on compare.",
          `${m} m = ${m * 100} cm, et ${m * 100} ${mGagne ? ">" : "<"} ${cm}.`,
          `C'est ${mGagne ? p.nom : q.nom}.`,
        ),
        metresBoutABout(m, `${m} m = ? cm`),
      ),
    ]);
  }, ["comparer", "piege"]),
  gab("ce1_longueur_comparer_tpl_2", "ce1_longueur_comparer", 4, "Ne compare pas les nombres seuls : regarde d'abord l'unité.", () =>
    tirer([
      () => {
        const m = randomInt(2, 5);
        const vals = [`${m} m`, `${m * 100 - randomChoice([10, 20, 30])} cm`, `${randomInt(40, 95)} cm`];
        const cm = (s: string) => (s.endsWith(" m") ? Number(s.split(" ")[0]) * 100 : Number(s.split(" ")[0]));
        const plusLong = randomChoice([true, false]);
        const tri = [...vals].sort((x, y) => cm(x) - cm(y));
        const bonne = plusLong ? tri[2] : tri[0];
        const L = randomChoice(LONGS);
        return qcm(
          `${randomChoice([`Trois ${L.des} : ${shuffle(vals).join(", ")}.`, `${shuffle(vals).join(", ")}.`, `${enfant().nom} a trois ${L.des} : ${shuffle(vals).join(", ")}.`])} ${randomChoice([
            `Laquelle est la plus ${plusLong ? "longue" : "courte"} ?`,
            `Quelle est la plus ${plusLong ? "longue" : "courte"} ?`,
            `${plusLong ? "La plus longue" : "La plus courte"}, c'est laquelle ?`,
          ])}`,
          bonne,
          vals,
          exp(
            "Pour comparer des longueurs, on les écrit toutes dans la même unité.",
            "On écrit les mètres en centimètres (1 m = 100 cm).",
            `${vals.map((v) => `${v} = ${cm(v)} cm`).join(" ; ")}.`,
            `La plus ${plusLong ? "longue" : "courte"} est ${bonne}.`,
          ),
          metresBoutABout(m, `${m} m = ? cm`),
        );
      },
      () => {
        const p = enfant();
        const m = randomInt(2, 6);
        const cm = m * 100 - randomChoice([10, 20, 30, 50, 80]);
        return qcm(
          randomChoice([
            `${p.nom} dit : « ${cm} cm, c'est plus long que ${m} m. » A-t-${p.il} raison ?`,
            `Pour ${p.nom}, ${cm} cm est plus long que ${m} m. A-t-${p.il} raison ?`,
            `« ${cm} cm, c'est plus que ${m} m », dit ${p.nom}. Vrai ?`,
          ]),
          `non, ${m} m est plus long`,
          ["oui", `non, ${m} m est plus long`, "non, c'est la même longueur"],
          exp(
            "On ne compare pas des nombres écrits dans des unités différentes.",
            "On écrit les mètres en centimètres : 1 m = 100 cm.",
            `${m} m = ${m * 100} cm, et ${m * 100} > ${cm}.`,
            `${p.nom} se trompe : ${m} m est plus long.`,
          ),
          metresBoutABout(m, `${m} m = ? cm`),
        );
      },
    ]), ["comparer", "piege"]),

  /* ---------- CONVERTIR ---------- */
  gab("ce1_longueur_convertir_tpl_4", "ce1_longueur_convertir_simple", 1, "1 m = 100 cm, et 1 km = 1 000 m.", () =>
    tirer([
      () => {
        const p = enfant();
        const L = randomChoice(LONGS);
        return qcm(
          `${maj(deQui(L, p))} mesure 1 m. ${randomChoice(["Combien de centimètres cela fait-il ?", "Cela fait combien de centimètres ?", "Écris cette longueur en centimètres."])}`,
          "100 cm",
          ["10 cm", "1 000 cm", "1 cm", "50 cm"],
          exp("1 mètre, c'est 100 centimètres.", "On se souvient : 1 m = 100 cm.", "1 m = 100 cm.", "Cela fait 100 cm."),
          metresBoutABout(1, "? cm"),
        );
      },
      () => {
        const p = enfant();
        const quoi = randomChoice(["court", "marche", "roule à vélo", "nage", "fait du roller"]);
        return qcm(
          `${p.nom} ${quoi} 1 km. ${randomChoice(["Combien de mètres cela fait-il ?", "Cela fait combien de mètres ?"])}`,
          "1 000 m",
          ["100 m", "10 m", "10 000 m"],
          exp("Le kilomètre est la grande unité : « kilo » veut dire mille.", "On se souvient : 1 km = 1 000 m.", "1 km = 1 000 m.", "Cela fait 1 000 m."),
        );
      },
    ]), ["convertir", "canvas"]),
  gab("ce1_longueur_convertir_tpl_1", "ce1_longueur_convertir_simple", 2, "Chaque mètre vaut 100 cm : compte de 100 en 100.", () => {
    const n = randomInt(2, 6);
    const p = enfant();
    const L = randomChoice(LONGS);
    return qcm(
      `${randomChoice([`${maj(deQui(L, p))} mesure ${n} m.`, `${p.nom} met ${n} mètres de ruban bout à bout.`, `On aligne ${n} règles d'un mètre.`])} ${randomChoice([
        "Combien de centimètres cela fait-il ?",
        "Cela fait combien de centimètres ?",
        "Écris cette longueur en centimètres.",
      ])}`,
      `${n * 100} cm`,
      [`${n * 10} cm`, `${(n + 1) * 100} cm`, `${n * 1000} cm`, `${n} cm`],
      exp(
        "1 m = 100 cm.",
        "On compte 100 cm pour chaque mètre.",
        `${Array(n).fill("100").join(" + ")} = ${n * 100}.`,
        `${n} m = ${n * 100} cm.`,
      ),
      metresBoutABout(n, "? cm"),
    );
  }, ["convertir", "canvas"]),
  gab("ce1_longueur_convertir_tpl_2", "ce1_longueur_convertir_simple", 3, "Dans 100 cm, il y a 1 m : cherche combien de fois 100.", () => {
    const n = randomInt(2, 9);
    const p = enfant();
    const L = randomChoice(LONGS);
    return qcm(
      `${randomChoice([`${maj(deQui(L, p))} mesure ${n * 100} cm.`, `${p.nom} a mesuré ${n * 100} cm.`, `Une piste de course fait ${n * 100} cm.`])} ${randomChoice([
        "Combien de mètres cela fait-il ?",
        "Cela fait combien de mètres ?",
        "Écris cette longueur en mètres.",
      ])}`,
      `${n} m`,
      [`${n * 10} m`, `${n * 100} m`, `${n + 1} m`, `${n - 1} m`].filter((x) => x !== "0 m"),
      exp(
        "1 m = 100 cm.",
        "On cherche combien de fois 100 il y a dans le nombre de centimètres.",
        `${Array(n).fill("100").join(" + ")} = ${n * 100} : il y a ${n} fois 100.`,
        `${n * 100} cm = ${n} m.`,
      ),
    );
  }, ["convertir"]),
  // ⭐ 10/11/2026 — un second gabarit à ★2 et à ★3 : chacun n'en avait qu'un
  // (4 phrases revues sur 20). La question se prend ici par l'égalité à
  // compléter, puis par le nombre de règles d'un mètre.
  gab("ce1_longueur_convertir_tpl_5", "ce1_longueur_convertir_simple", 2, "Chaque mètre vaut 100 cm.", () => {
    const n = randomInt(2, 9);
    const p = enfant();
    const debut = randomChoice([
      `${p.nom} complète son cahier :`,
      `Sur le tableau, la maîtresse écrit :`,
      `Pic le paille-en-queue a caché un nombre :`,
      `Au jeu du trésor, la carte dit :`,
      `Dans le carnet de l'architecte, on lit :`,
      `Le jardinier note pour sa haie :`,
    ]);
    return qcm(
      `${debut} « ${n} m = … cm ». ${randomChoice(["Quel nombre manque ?", "Que faut-il écrire ?", "Complète."])}`,
      `${n * 100} cm`,
      [`${n * 10} cm`, `${n} cm`, `${n * 1000} cm`, `${(n + 1) * 100} cm`],
      exp("1 m = 100 cm.", "On compte 100 cm pour chaque mètre.", `${n} × 100 = ${n * 100}.`, `${n} m = ${n * 100} cm.`),
    );
  }, ["convertir"]),
  gab("ce1_longueur_convertir_tpl_6", "ce1_longueur_convertir_simple", 3, "Une règle d'un mètre, c'est 100 cm.", () => {
    const n = randomInt(2, 9);
    const p = enfant();
    const quoi = randomChoice([
      "le couloir de l'école", "la piste du cirque", "le filet de volley", "le quai de la gare",
      "la cour de récréation", "le toboggan géant", "la corde à sauter géante", "le potager",
      "le pont du bateau pirate", "la tente du camping", "la frise de la classe", "le tapis rouge",
    ]);
    return qcm(
      `${p.nom} mesure ${quoi} : ${n * 100} cm. ${randomChoice([
        "Combien de règles d'un mètre faut-il ?",
        "Combien de fois la règle d'un mètre ?",
      ])}`,
      `${n} règles`,
      [`${n * 10} règles`, `${n * 100} règles`, `${n + 1} règles`, `${n - 1} règles`].filter((x) => !x.startsWith("1 ") && !x.startsWith("0 ")),
      exp("1 m = 100 cm.", "On cherche combien de fois 100 cm il y a.", `${n * 100} cm = ${n} fois 100 cm.`, `Il faut ${n} règles d'un mètre.`),
    );
  }, ["convertir"]),
  gab("ce1_longueur_convertir_tpl_3", "ce1_longueur_convertir_simple", 4, "Les mètres font des centaines de centimètres ; ajoute les centimètres qui restent.", () => {
    const m = randomInt(1, 8);
    const c = randomInt(5, 95);
    const total = m * 100 + c;
    const quoi = randomChoice(["Un banc", "La table de la cantine", "Le tapis de gym", "Le serpent du zoo", "La cabane de Ravi", "Le dragon en papier", "Le bateau pirate en carton", "Un crocodile du zoo"]);
    const sens = randomChoice([true, false]);
    return sens
      ? qcm(
          `${quoi} mesure ${m} m ${c} cm. ${randomChoice(["Écris sa longueur en centimètres.", "Cela fait combien de centimètres ?", "Quelle est sa longueur en centimètres ?"])}`,
          `${total} cm`,
          [`${m + c} cm`, `${m * 10 + c} cm`, `${total + 100} cm`, `${m * 100} cm`],
          exp("1 m = 100 cm.", "On écrit les mètres en centimètres, puis on ajoute les centimètres.", `${m} m = ${m * 100} cm ; ${m * 100} + ${c} = ${total}.`, `Cela fait ${total} cm.`),
        )
      : qcm(
          `${quoi} mesure ${total} cm. ${randomChoice(["Comment l'écrire en mètres et centimètres ?", "Cela fait combien de mètres et de centimètres ?"])}`,
          `${m} m ${c} cm`,
          [`${total} m`, `${m + 1} m ${c} cm`, `${m} m ${c > 50 ? c - 10 : c + 10} cm`, `${Math.floor(total / 10)} m ${total % 10} cm`],
          exp("1 m = 100 cm.", "Les centaines de centimètres font des mètres.", `${total} = ${m * 100} + ${c} ; ${m * 100} cm = ${m} m.`, `${total} cm = ${m} m ${c} cm.`),
        );
  }, ["convertir"]),

  /* ---------- TRACER ---------- */
  gab("ce1_longueur_tracer_tpl_3", "ce1_longueur_tracer", 1, "On part toujours de la graduation 0.", () => {
    const p = enfant();
    const n = randomInt(3, 12);
    const quoi = randomChoice([
      "le chemin du trésor", "la queue de son cerf-volant", "le bâton de son bonhomme",
      "la route de son circuit", "le mât de son bateau", "la tige de sa fleur", "la piste de sa fusée", "le pont de son château",
    ]);
    return qcm(
      `${p.nom} trace ${quoi} : ${n} cm. ${randomChoice([
        `Sur quelle graduation part-${p.il} ?`,
        `Où pose-t-${p.il} le crayon au début ?`,
        "Où commence le trait sur la règle ?",
      ])}`,
      "sur la graduation 0",
      ["sur la graduation 1", "au bord de la règle", `sur la graduation ${n}`],
      exp(
        "Pour tracer un segment d'une longueur donnée, on part du 0 de la règle.",
        "On marque un point sur le 0, un autre sur la graduation voulue, puis on relie.",
        `Du 0 jusqu'à ${n}, il y a bien ${n} cm.`,
        "On part de la graduation 0.",
      ),
      regle([]),
    );
  }, ["tracer", "canvas"]),
  gab("ce1_longueur_tracer_tpl_4", "ce1_longueur_tracer", 2, "Départ sur le 0 : le point d'arrivée est sur la longueur voulue.", () => {
    const n = randomInt(3, 14);
    const p = enfant();
    const quoi = randomChoice(["la tige d'une fleur", "le mât d'un bateau", "une route", "la queue d'un cerf-volant", "un pont", "un serpent"]);
    return qcm(
      `${randomChoice([
        `Segment de ${n} cm, départ sur le 0.`,
        `${p.nom} trace ${n} cm depuis le 0.`,
        `${p.nom} part du 0 pour tracer ${n} cm.`,
        `${p.nom} dessine ${quoi} de ${n} cm, depuis le 0.`,
        `Pic veut un trait de ${n} cm. Il part du 0.`,
      ])} ${randomChoice([
        "Où mettre le deuxième point ?",
        "Sur quelle graduation s'arrêter ?",
        "Où finit le segment ?",
        "Où va le point d'arrivée ?",
        "Où s'arrête le trait ?",
      ])}`,
      `sur la graduation ${n}`,
      [`sur la graduation ${n + 1}`, `sur la graduation ${n - 1}`, `sur la graduation ${Math.min(15, n + 2)}`, "au bout de la règle"],
      exp(
        "Un segment de n cm va du 0 jusqu'à la graduation n.",
        "On compte les centimètres depuis le 0.",
        `De 0 à ${n}, il y a ${n} cm.`,
        `Le deuxième point va sur la graduation ${n}.`,
      ),
      regle([{ value: 0, label: "départ", color: "#2563eb" }]),
    );
  }, ["tracer", "canvas"]),
  gab("ce1_longueur_tracer_tpl_2", "ce1_longueur_tracer", 3, "Deux fois plus long : la même longueur, deux fois.", () =>
    tirer([
      () => {
        const p = enfant();
        const n = randomInt(2, 7);
        const fois = randomChoice([2, 2, 3]);
        return qcm(
          `${p.nom} a tracé un segment de ${n} cm. ${randomChoice([
            `${maj(p.il)} le veut ${fois === 2 ? "deux" : "trois"} fois plus long. Quelle longueur ?`,
            `Un segment ${fois === 2 ? "deux" : "trois"} fois plus long mesure… ?`,
          ])}`,
          `${n * fois} cm`,
          [`${n + fois} cm`, `${n * fois + 1} cm`, `${n} cm`, `${n * (fois + 1)} cm`],
          exp(
            `${fois === 2 ? "Deux" : "Trois"} fois plus long, c'est la même longueur mise ${fois} fois bout à bout.`,
            "On ajoute la longueur autant de fois qu'il le faut.",
            `${Array(fois).fill(n).join(" + ")} = ${n * fois}.`,
            `Il faut tracer ${n * fois} cm.`,
          ),
          { kind: "schema_barre", total: "?", parts: Array.from({ length: fois }, () => ({ label: `${n} cm`, value: `${n} cm` })), display: { showPartLabels: false } },
        );
      },
      () => {
        const p = enfant();
        const a = randomInt(3, 8);
        const b = randomInt(2, 6);
        return qcm(
          `${p.nom} trace un trait de ${a} cm, puis le prolonge de ${b} cm. ${randomChoice(["Combien mesure-t-il en tout ?", "Quelle longueur maintenant ?"])}`,
          `${a + b} cm`,
          [`${a + b + 1} cm`, `${a - b > 0 ? a - b : a + b - 1} cm`, `${a * b} cm`, `${a + b - 1} cm`].filter((x, i, t) => t.indexOf(x) === i),
          exp("Prolonger un trait, c'est ajouter une longueur au bout.", "On ajoute les deux longueurs.", `${a} + ${b} = ${a + b}.`, `Le trait mesure ${a + b} cm.`),
          { kind: "schema_barre", total: "?", parts: [{ label: "d'abord", value: `${a} cm` }, { label: "en plus", value: `${b} cm` }] },
        );
      },
    ]), ["tracer", "canvas"]),
  gab("ce1_longueur_tracer_tpl_1", "ce1_longueur_tracer", 4, "Si on ne part pas du 0, on ajoute la longueur au point de départ.", () => {
    const p = enfant();
    const debut = randomInt(1, 5);
    const n = randomInt(3, 9);
    return qcm(
      `${randomChoice([`${p.nom} a une règle cassée qui commence à ${debut}.`, `${p.nom} part de la graduation ${debut}.`])} ${randomChoice([
        `Pour ${n} cm, où s'arrêter ?`,
        `Pour ${n} cm, sur quelle graduation finir ?`,
      ])}`,
      `sur la graduation ${debut + n}`,
      [`sur la graduation ${n}`, `sur la graduation ${debut + n - 1}`, `sur la graduation ${debut + n + 1}`, `sur la graduation ${n - debut > 0 ? n - debut : n + 2}`],
      exp(
        "La longueur d'un segment, c'est le nombre de centimètres entre ses deux bouts.",
        "On avance de la longueur voulue à partir du point de départ.",
        `${debut} + ${n} = ${debut + n}.`,
        `Il faut s'arrêter sur la graduation ${debut + n}.`,
      ),
      regle([{ value: debut, label: "départ", color: "#2563eb" }]),
    );
  }, ["tracer", "piege", "canvas"]),

  /* ---------- LES UNITÉS ---------- */
  gab("ce1_longueur_unites_tpl_3", "ce1_longueur_unites", 1, "cm, c'est petit (un doigt). m, c'est un grand pas. km, c'est très long.", () =>
    tirer([
      () => {
        const petite = randomChoice([true, false]);
        return qcm(
          `${randomChoice(["Parmi ces unités", "Pic hésite entre ces unités", "Voici trois unités de longueur"])}. Quelle est la plus ${petite ? "petite" : "grande"} ?`,
          petite ? "le centimètre" : "le kilomètre",
          ["le centimètre", "le mètre", "le kilomètre"],
          exp(
            "Du plus petit au plus grand : le centimètre, le mètre, le kilomètre.",
            "On pense à une longueur de chaque : la largeur d'un doigt, un grand pas, une longue promenade.",
            "1 m = 100 cm et 1 km = 1 000 m.",
            `La plus ${petite ? "petite" : "grande"} est ${petite ? "le centimètre" : "le kilomètre"}.`,
          ),
        );
      },
      () => {
        const u = randomChoice(["cm", "m", "km"] as const);
        const ou = randomChoice(["sur une affiche", "sur un panneau", "dans un livre de pirates", "sur la boîte d'un jouet", "sur une carte au trésor", "sur le mètre du maçon"]);
        return qcm(
          `${enfant().nom} lit « ${u} » ${ou}. Que veut dire « ${u} » ?`,
          NOM_UNITE[u].replace(/^le /, ""),
          ["centimètre", "mètre", "kilomètre", "minute"],
          exp("Chaque unité a son symbole : cm, m, km.", "On reconnaît le symbole.", `« ${u} » est le symbole du ${NOM_UNITE[u].replace(/^le /, "")}.`, `« ${u} » veut dire ${NOM_UNITE[u].replace(/^le /, "")}.`),
        );
      },
    ]), ["unites"]),
  gab("ce1_longueur_unites_tpl_1", "ce1_longueur_unites", 2, "« kilo » veut dire mille ; « centi », c'est un centième.", () =>
    tirer([
      () => {
        const u = randomChoice(["cm", "m", "km"] as const);
        const p = enfant();
        return qcm(
          randomChoice([
            `Comment s'écrit « ${NOM_UNITE[u].replace(/^le /, "")} » en abrégé ?`,
            `${p.nom} veut écrire « ${NOM_UNITE[u].replace(/^le /, "")} » en court. Qu'écrit-${p.il} ?`,
          ]),
          u,
          ["cm", "m", "km", u === "cm" ? "c" : u === "km" ? "k" : "mt"],
          exp("Chaque unité a son symbole : cm, m, km.", "On garde les premières lettres de l'unité.", `${maj(NOM_UNITE[u].replace(/^le /, ""))} s'écrit « ${u} ».`, `On écrit « ${u} ».`),
        );
      },
      () => {
        const c = randomChoice(CHOSES);
        const p = enfant();
        return qcm(
          `${p.nom} lit : « ${c.le} mesure ${c.v} ${c.u} ». ${randomChoice(["Que veut dire l'unité écrite ?", "Quelle unité est écrite ?"])}`,
          PLURIEL_UNITE[c.u],
          ["centimètres", "mètres", "kilomètres"],
          exp("cm = centimètre, m = mètre, km = kilomètre.", "On lit le symbole après le nombre.", `« ${c.u} » veut dire ${PLURIEL_UNITE[c.u]}.`, `Ce sont des ${PLURIEL_UNITE[c.u]}.`),
          dessinDe(c),
        );
      },
    ]), ["unites", "canvas"]),
  gab("ce1_longueur_unites_tpl_2", "ce1_longueur_unites", 3, "Range : centimètre, puis mètre, puis kilomètre.", () =>
    tirer([
      () => {
        const [a, b] = shuffle(["cm", "m", "km"] as const).slice(0, 2) as ("cm" | "m" | "km")[];
        const ordre = { cm: 0, m: 1, km: 2 };
        const petite = randomChoice([true, false]);
        const bonne = (ordre[a] < ordre[b]) === petite ? a : b;
        return qcm(
          `Laquelle de ces deux unités est la plus ${petite ? "petite" : "grande"} : ${NOM_UNITE[a]} ou ${NOM_UNITE[b]} ?`,
          NOM_UNITE[bonne],
          [NOM_UNITE[a], NOM_UNITE[b], "elles sont pareilles"],
          exp("Du plus petit au plus grand : centimètre, mètre, kilomètre.", "On place les deux unités dans cet ordre.", "1 m = 100 cm ; 1 km = 1 000 m.", `C'est ${NOM_UNITE[bonne]}.`),
        );
      },
      () => {
        const cas = randomChoice([
          { q: "Combien de centimètres dans 1 mètre ?", r: "100", p: ["10", "1 000", "1"] },
          { q: "Combien de mètres dans 1 kilomètre ?", r: "1 000", p: ["100", "10", "10 000"] },
          { q: "Quelle unité vaut 100 centimètres ?", r: "le mètre", p: ["le kilomètre", "le centimètre"] },
          { q: "Quelle unité vaut 1 000 mètres ?", r: "le kilomètre", p: ["le centimètre", "le mètre"] },
        ]);
        return qcm(
          `${randomChoice(["Pic pose une colle :", "Question de Zoé :", "Petit défi :", "Téo demande :"])} ${cas.q}`,
          cas.r,
          cas.p,
          exp("1 m = 100 cm et 1 km = 1 000 m.", "On se souvient des deux relations.", "1 m = 100 cm ; 1 km = 1 000 m.", `La réponse est ${cas.r}.`),
          cas.q.includes("dans 1 mètre") ? metresBoutABout(1, "? cm") : undefined,
        );
      },
    ]), ["unites"]),

  /* ---------- CHOISIR L'UNITÉ ---------- */
  gab("ce1_longueur_choisir_unite_tpl_2", "ce1_longueur_choisir_unite", 2, "Tient sur une règle : cm. Grand comme une pièce : m. Il faut une voiture : km.", () => {
    const c = randomChoice(CHOSES);
    const p = enfant();
    return qcm(
      randomChoice([
        `Avec quelle unité mesure-t-on ${c.le} ?`,
        `${p.nom} veut mesurer ${c.le}. Quelle unité choisit-${p.il} ?`,
        `Pour dire la longueur ${deLe(c.le)}, quelle unité prendre ?`,
      ]),
      NOM_UNITE[c.u],
      ["le centimètre", "le mètre", "le kilomètre"],
      exp(
        "Le centimètre sert aux petits objets, le mètre aux grandes choses, le kilomètre aux longs trajets.",
        "On imagine la chose et sa taille.",
        `${maj(c.le)} mesure à peu près ${nb(c.v)} ${c.u}.`,
        `On choisit ${NOM_UNITE[c.u]}.`,
      ),
      dessinDe(c),
    );
  }, ["choisir", "canvas"]),
  gab("ce1_longueur_choisir_unite_tpl_1", "ce1_longueur_choisir_unite", 3, "Imagine l'objet : la phrase est-elle possible ?", () =>
    tirer([
      () => {
        const c = randomChoice(CHOSES);
        const faux = randomChoice((["cm", "m", "km"] as const).filter((u) => u !== c.u));
        const p = enfant();
        return qcm(
          `${p.nom} écrit : « ${c.le} mesure ${nb(c.v)} ${faux} ». ${randomChoice(["Quelle unité fallait-il écrire ?", "Quelle est la bonne unité ?"])}`,
          c.u,
          ["cm", "m", "km"],
          exp("L'unité doit aller avec la taille de la chose.", "On imagine la chose : ce nombre d'unités, est-ce possible ?", `${maj(c.le)} mesure ${nb(c.v)} ${c.u}, pas ${nb(c.v)} ${faux}.`, `Il fallait écrire « ${c.u} ».`),
          dessinDe(c),
        );
      },
      () => {
        const c = randomChoice(CHOSES);
        return qcm(
          `${randomChoice(["Complète", "Choisis l'unité", "Trouve le mot qui manque"])} : « ${c.le} mesure environ ${nb(c.v)} … ».`,
          PLURIEL_UNITE[c.u],
          ["centimètres", "mètres", "kilomètres"],
          exp("L'unité doit aller avec la taille de la chose.", "On essaie chaque unité et on garde celle qui a du sens.", `${nb(c.v)} ${PLURIEL_UNITE[c.u]}, c'est la taille ${deLe(c.le)}.`, `Il manque « ${PLURIEL_UNITE[c.u]} ».`),
          dessinDe(c),
        );
      },
    ]), ["choisir", "canvas"]),

  /* ---------- LONGUEURS DE RÉFÉRENCE ---------- */
  gab("ce1_longueur_references_tpl_1", "ce1_longueur_references", 2, "Repères : un doigt fait 1 cm de large, un grand pas fait 1 m.", () =>
    tirer([
      () => {
        const c = randomChoice(CHOSES.filter((x) => x.u !== "km"));
        const v = c.v;
        const autre = c.u === "cm" ? "m" : "cm";
        const p = enfant();
        return qcm(
          randomChoice([`Environ combien mesure ${c.le} ?`, `${p.nom} devine la longueur ${deLe(c.le)}. Que choisit-${p.il} ?`, `Quelle est la taille ${deLe(c.le)}, à peu près ?`]),
          `${v} ${c.u}`,
          [`${v} ${autre}`, `${v * 10} ${c.u}`, `${v} km`, `${Math.max(1, Math.round(v / 10))} ${c.u}`].filter((x) => x !== `${v} ${c.u}`),
          exp(
            "On compare à ce qu'on connaît : un doigt (1 cm), une règle (20 cm), un grand pas (1 m).",
            "On imagine la chose à côté d'un repère connu.",
            `${maj(c.le)} mesure environ ${v} ${c.u}.`,
            `Environ ${v} ${c.u}.`,
          ),
          dessinDe(c),
        );
      },
      () => {
        const cas = randomChoice([
          { q: "la largeur d'un doigt", r: "1 cm", p: ["1 m", "10 cm", "1 km"] },
          { q: "un grand pas d'adulte", r: "1 m", p: ["1 cm", "10 m", "1 km"] },
          { q: "la règle de la trousse", r: "20 cm", p: ["20 m", "2 cm", "200 cm"] },
          { q: "la hauteur de la porte de la classe", r: "2 m", p: ["2 cm", "20 m", "2 km"] },
          { q: "une pièce de 1 euro", r: "2 cm", p: ["2 m", "20 cm", "12 cm"] },
          { q: "un enfant de 7 ans", r: "1 m 20 cm", p: ["12 cm", "12 m", "3 m"] },
          { q: "un quart d'heure de marche", r: "1 km", p: ["1 m", "10 km", "100 m"] },
          { q: "une feuille de cahier", r: "30 cm", p: ["3 cm", "3 m", "30 m"] },
        ]);
        return qcm(
          randomChoice([`Environ combien mesure ${cas.q} ?`, `Quelle longueur va avec ${cas.q} ?`, `Pic se demande : combien mesure ${cas.q} ?`]),
          cas.r,
          cas.p,
          exp("Quelques repères aident à estimer : 1 cm, un doigt ; 1 m, un grand pas ; 1 km, un quart d'heure de marche.", "On imagine la chose et on la compare à un repère.", `${maj(cas.q)} : environ ${cas.r}.`, `C'est ${cas.r}.`),
        );
      },
    ]), ["references", "canvas"]),

  /* ---------- ESTIMER ---------- */
  gab("ce1_longueur_estimer_tpl_2", "ce1_longueur_estimer", 3, "Imagine la chose : la phrase est-elle possible ?", () =>
    tirer([
      () => {
        const c = randomChoice(CHOSES);
        const p = enfant();
        return qcm(
          `${randomChoice(["Estime : ", "Devinette : ", `${p.nom} estime : `])}${c.le} mesure environ ${nb(c.v)} … Quelle unité ?`,
          c.u,
          ["cm", "m", "km"],
          exp("Estimer, c'est trouver une longueur à peu près, sans mesurer.", "On essaie chaque unité et on garde celle qui a du sens.", `${nb(c.v)} ${c.u} va bien avec ${c.le}.`, `C'est « ${c.u} ».`),
          dessinDe(c),
        );
      },
      () => {
        const c = randomChoice(CHOSES.filter((x) => x.u !== "km"));
        const faux = c.u === "cm" ? "m" : "km";
        const p = enfant();
        return qcm(
          `${p.nom} dit : « ${c.le} mesure ${nb(c.v)} ${faux} ». Est-ce possible ?`,
          `non, c'est plutôt ${nb(c.v)} ${c.u}`,
          ["oui, c'est possible", `non, c'est plutôt ${nb(c.v)} ${c.u}`, `non, c'est plutôt ${nb(c.v)} ${faux === "m" ? "km" : "cm"}`],
          exp("Estimer, c'est vérifier qu'une longueur a du sens.", "On imagine la chose à côté d'un repère connu.", `${nb(c.v)} ${faux}, ce serait bien trop grand pour ${c.le}.`, `C'est plutôt ${nb(c.v)} ${c.u}.`),
          dessinDe(c),
        );
      },
    ]), ["estimer", "canvas"]),
  gab("ce1_longueur_estimer_tpl_1", "ce1_longueur_estimer", 4, "Ajoute la petite longueur jusqu'à atteindre la grande.", () => {
    const cas = randomChoice([
      { quoi: "un pas d'enfant", pl: "pas d'enfant", v: 50, total: randomChoice([1, 2, 3, 4]) },
      { quoi: "une règle", pl: "règles", v: 20, total: 1 },
      { quoi: "un crayon", pl: "crayons", v: 10, total: 1 },
      { quoi: "un grand pas", pl: "grands pas", v: 100, total: randomChoice([3, 5, 8]) },
      { quoi: "une baguette de pain", pl: "baguettes", v: 50, total: randomChoice([1, 2, 3]) },
      { quoi: "un serpent en peluche", pl: "serpents", v: 25, total: 1 },
    ]);
    const n = (cas.total * 100) / cas.v;
    const ou = randomChoice(["la cour", "le couloir", "la cabane", "le tapis", "le bateau pirate", "la piste du cirque"]);
    return qcm(
      `${maj(cas.quoi)} : environ ${cas.v} cm. ${maj(ou)} : ${cas.total} m. Combien de ${cas.pl} ?`,
      String(n),
      [String(n + 1), String(n * 2), String(Math.max(1, n - 1)), String(cas.total)].filter((x, i, t) => t.indexOf(x) === i),
      exp(
        "1 m = 100 cm.",
        `On reporte ${cas.v} cm jusqu'à arriver à ${cas.total * 100} cm.`,
        `${Array(n).fill(cas.v).join(" + ")} = ${cas.total * 100}.`,
        `Environ ${n} fois.`,
      ),
      metresBoutABout(cas.total, `${cas.total} m = ? cm`),
    );
  }, ["estimer", "canvas"]),

  /* ---------- DÉFIS ---------- */
  gab("ce1_longueur_defi_tpl_3", "ce1_longueur_defi", 4, "1 m = 100 cm : enlève ce que tu as déjà utilisé.", () => {
    const p = enfant();
    const utilise = randomChoice([20, 25, 30, 40, 45, 60, 65, 70, 75, 80]);
    const quoi = randomChoice(["de ruban", "de ficelle", "de laine", "de guirlande", "de corde", "de papier crépon"]);
    const reste = 100 - utilise;
    return qcm(
      `${p.nom} a 1 m ${quoi}. ${maj(p.il)} en coupe ${utilise} cm. Combien en reste-t-il ?`,
      `${reste} cm`,
      [`${reste + 10} cm`, `${utilise} cm`, `${Math.abs(utilise - 1)} cm`, `${reste - 10} cm`].filter((x, i, t) => t.indexOf(x) === i && x !== `${reste} cm`),
      exp("1 m = 100 cm.", "On cherche ce qu'il faut ajouter à la partie coupée pour faire 100 cm.", `${utilise} + ${reste} = 100.`, `Il reste ${reste} cm.`),
      { kind: "schema_barre", total: "1 m", parts: [{ label: "coupé", value: `${utilise} cm` }, { label: "reste", unknown: true }] },
    );
  }, ["defi", "canvas"]),
  gab("ce1_longueur_defi_tpl_1", "ce1_longueur_defi", 5, "1 m = 100 cm : combien de fois ce morceau tient-il dans 100 ?", () => {
    const morceau = randomChoice([10, 20, 25, 50]);
    const m = morceau === 10 ? 1 : randomChoice([1, 2]);
    const n = (m * 100) / morceau;
    const p = enfant();
    const quoi = randomChoice(["un ruban", "une ficelle", "une corde", "un fil de laine"]);
    const pour = randomChoice(["bracelets", "marque-pages", "colliers", "drapeaux", "morceaux"]);
    return qcm(
      `${p.nom} coupe ${quoi} de ${m} m en morceaux de ${morceau} cm. Combien de ${pour} ?`,
      String(n),
      [String(n + 1), String(n - 1), String(morceau / 5), String(m * 10)].filter((x, i, t) => t.indexOf(x) === i && x !== String(n) && x !== "0"),
      exp("1 m = 100 cm.", `On compte combien de fois ${morceau} cm tiennent dans ${m * 100} cm.`, `${Array(n).fill(morceau).join(" + ")} = ${m * 100}.`, `${maj(p.il)} peut couper ${n} morceaux.`),
      metresBoutABout(m, `${m} m = ? cm`),
    );
  }, ["defi", "canvas"]),
  gab("ce1_longueur_defi_tpl_2", "ce1_longueur_defi", 5, "Trouve d'abord la longueur du deuxième morceau, puis ajoute.", () => {
    const a = randomInt(20, 45);
    const plus = randomInt(5, 25);
    const b = a + plus;
    const quoi = randomChoice(["Planche", "Bâton", "Ruban", "Ficelle", "Carton"]);
    return qcm(
      `${quoi} 1 : ${a} cm. ${quoi} 2 : ${plus} cm de plus. ${randomChoice(["Ensemble, combien ?", "Bout à bout, combien ?"])}`,
      `${a + b} cm`,
      [`${b} cm`, `${2 * a} cm`, `${a + b + 10} cm`, `${a + b - 10} cm`],
      exp("Mettre bout à bout, c'est ajouter les longueurs.", "On calcule d'abord le second morceau, puis on ajoute les deux.", `Second : ${a} + ${plus} = ${b}. Ensemble : ${a} + ${b} = ${a + b}.`, `Ensemble, ils mesurent ${a + b} cm.`),
    );
  }, ["defi"]),
];

export const longueurBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_LONGUEUR_MESURER_CM_M — mesurer avec la règle
     Le piège d'ici : poser la règle n'importe où. Le zéro doit
     tomber sur le début du segment ; sinon il faut soustraire.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_mesurer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_mesurer_cm_m",
    difficulty: 1,
    theme: "neutral",
    text: "Pour mesurer un segment avec une règle graduée, où faut-il placer le début du segment ?",
    format: "qcm",
    choices: [
      "sur la graduation 0",
      "sur le bord de la règle",
      "sur la graduation 1",
      "n'importe où",
    ],
    expected: ["sur la graduation 0"],
    comparator: "mcq_exact",
    hint: "Le bord de la règle et le zéro ne sont pas toujours au même endroit.",
    explanation: exp(
      "Mesurer, c'est compter les graduations en partant de zéro.",
      "On pose le début du segment sur le 0, puis on lit le nombre à l'autre bout.",
      "Sur beaucoup de règles, le 0 est un peu après le bord en plastique. Si on part du bord, on compte des centimètres qui n'existent pas.",
      "On place le début du segment sur la graduation 0.",
    ),
    tags: ["ce1", "longueur", "mesurer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_mesurer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_mesurer_cm_m",
    difficulty: 3,
    theme: "neutral",
    text: "Le segment va de la graduation 2 à la graduation 9. Combien mesure-t-il, en cm ?",
    canvas: regle([{ value: 2, label: "début", color: "#2563eb" }, { value: 9, label: "fin", color: "#ef4444" }]),
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Ne lis pas 9 : compte les centimètres entre 2 et 9.",
    explanation: exp(
      "La mesure d'un segment, c'est l'écart entre les deux graduations, pas le nombre lu à l'arrivée.",
      "Quand la règle est décalée, on enlève la graduation de départ.",
      "9 - 2 = 7. Le segment mesure 7 cm. Les deux premiers centimètres de la règle sont en dehors du segment.",
      "Le segment mesure 7 cm.",
    ),
    tags: ["ce1", "longueur", "mesurer", "piege"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_mesurer_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_mesurer_cm_m",
    difficulty: 2,
    theme: "neutral",
    text: "On mesure la longueur d'une trousse. Quelle unité choisit-on ?",
    format: "qcm",
    choices: ["le centimètre", "le mètre", "le kilomètre", "le centimètre carré"],
    expected: ["le centimètre"],
    comparator: "mcq_exact",
    hint: "Une trousse tient dans la main : elle fait à peu près la largeur d'un cahier.",
    explanation: exp(
      "On choisit l'unité qui donne un nombre simple à dire.",
      "On imagine l'objet, puis on essaie les unités qu'on connaît : le centimètre, le mètre, le kilomètre.",
      "Une trousse mesure environ 20 cm. En mètres, il faudrait écrire une longueur plus petite que 1, et on ne sait pas encore le faire au CE1.",
      "On mesure une trousse en centimètres.",
    ),
    tags: ["ce1", "longueur", "mesurer", "qcm"],
  },

  /* =========================================================
     CE1_LONGUEUR_COMPARER — comparer des longueurs
     LE piège de la notion : comparer les nombres au lieu des
     longueurs. 90 cm contre 1 m, et l'élève choisit 90.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_comparer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus long : 1 m ou 90 cm ?",
    canvas: metresBoutABout(1, "1 m = ? cm"),
    format: "qcm",
    choices: ["1 m", "90 cm", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1 m"],
    comparator: "mcq_exact",
    hint: "Écris les deux longueurs dans la même unité avant de comparer.",
    explanation: exp(
      "On ne compare deux longueurs qu'après les avoir écrites dans la même unité.",
      "On transforme le mètre en centimètres, puis on compare les nombres.",
      "1 m = 100 cm. Et 100 cm, c'est plus long que 90 cm. Le nombre 90 est plus grand que 1, mais il compte des centimètres, pas des mètres.",
      "1 m est plus long que 90 cm.",
    ),
    tags: ["ce1", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_comparer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « 300 cm, c'est plus long que 4 m. » A-t-il raison ?",
    canvas: metresBoutABout(4, "4 m = ? cm"),
    format: "qcm",
    choices: [
      "non, 4 m font 400 cm",
      "oui",
      "non, 4 m font 40 cm",
      "on ne peut pas comparer des mètres et des centimètres",
    ],
    expected: ["non, 4 m font 400 cm"],
    comparator: "mcq_exact",
    hint: "Mets tout en centimètres, puis compare.",
    explanation: exp(
      "Un nombre tout seul ne dit rien : il faut regarder l'unité écrite à côté.",
      "On écrit les deux longueurs en centimètres, puis on compare.",
      "4 m = 400 cm. Et 300 cm, c'est moins que 400 cm. Il manque même 100 cm, c'est-à-dire 1 m entier.",
      "Non : 300 cm est plus court que 4 m.",
    ),
    tags: ["ce1", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_comparer_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_comparer",
    difficulty: 2,
    theme: "reunion",
    text: "Le filao mesure 8 m, le manguier 6 m. Lequel est le plus haut ?",
    canvas: { kind: "objets", elements: [{ quoi: "arbre", label: "filao" }, { quoi: "arbre", label: "manguier" }], mode: "couleur" },
    format: "qcm",
    choices: ["le filao", "le manguier", "ils sont pareils", "on ne peut pas savoir"],
    expected: ["le filao"],
    comparator: "mcq_exact",
    hint: "Les deux hauteurs sont en mètres : compare directement les nombres.",
    explanation: exp(
      "Quand deux longueurs sont écrites dans la même unité, on compare directement les nombres.",
      "On regarde l'unité : ici, les deux sont en mètres. On peut donc comparer 8 et 6.",
      "8 est plus grand que 6, et les deux arbres sont mesurés en mètres. Le filao dépasse le manguier de 2 m.",
      "Le filao est le plus haut.",
    ),
    tags: ["ce1", "longueur", "comparer", "reunion", "qcm"],
  },

  /* =========================================================
     CE1_LONGUEUR_CONVERTIR_SIMPLE — passer de m à cm
     Le programme dit : par les relations connues, pas par un
     tableau de conversion. Deux relations seulement au CE1 :
     1 m = 100 cm et 1 km = 1 000 m.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_convertir_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_convertir_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 mètre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Regarde le mètre de la classe : compte ses graduations.",
    explanation: exp(
      "1 mètre vaut 100 centimètres.",
      "On se rappelle du mètre en bois de la classe : il porte 100 petits traits.",
      "Le « centi » de centimètre veut dire cent. Il faut 100 centimètres bout à bout pour faire 1 mètre.",
      "1 m = 100 cm.",
    ),
    tags: ["ce1", "longueur", "convertir", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_convertir_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_convertir_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 m = 10 cm ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 m = 100 cm",
      "oui",
      "non, 1 m = 1 000 cm",
      "non, 1 m = 20 cm",
    ],
    expected: ["non, 1 m = 100 cm"],
    comparator: "mcq_exact",
    hint: "10 cm, c'est à peu près la largeur de ta main. Un mètre est bien plus long.",
    explanation: exp(
      "1 mètre vaut 100 centimètres.",
      "On vérifie avec un objet connu : 10 cm, c'est la largeur d'une main.",
      "Dix mains ne font pas un mètre. Il faut dix fois plus : 100 centimètres.",
      "Non : 1 m = 100 cm.",
    ),
    tags: ["ce1", "longueur", "convertir", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_convertir_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_convertir_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de mètres dans 1 kilomètre ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "« Kilo » veut dire mille.",
    explanation: exp(
      "1 kilomètre vaut 1 000 mètres.",
      "On lit le début du mot : « kilo » annonce mille.",
      "Un kilomètre, c'est mille mètres bout à bout. C'est le même « kilo » que dans kilogramme, qui vaut mille grammes.",
      "1 km = 1 000 m.",
    ),
    tags: ["ce1", "longueur", "convertir", "remarquable"],
  },

  /* =========================================================
     CE1_LONGUEUR_TRACER — tracer un segment de longueur donnée
     Tracer, c'est mesurer à l'envers : on place les deux points
     d'abord, on relie ensuite.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_tracer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Segment de 8 cm : ton premier point est sur le 0. Que fais-tu ensuite ?",
    canvas: regle([{ value: 0, label: "départ", color: "#2563eb" }]),
    format: "qcm",
    choices: [
      "je marque un point sur la graduation 8 et je relie les deux points",
      "je compte 8 traits après le bord de la règle",
      "je trace un trait au hasard puis je le mesure",
      "je marque un point sur la graduation 9 pour être sûr",
    ],
    expected: ["je marque un point sur la graduation 8 et je relie les deux points"],
    comparator: "mcq_exact",
    hint: "Tracer, c'est mesurer à l'envers : on place les deux points d'abord.",
    explanation: exp(
      "Tracer un segment d'une longueur donnée, c'est placer deux points puis les relier.",
      "On pose le 0 de la règle sur le premier point, on repère la graduation voulue, on marque le second point.",
      "Le premier point est sur le 0, le second sur le 8 : entre les deux, il y a bien 8 centimètres. On relie ensuite en suivant le bord de la règle.",
      "On marque un point sur la graduation 8, puis on relie.",
    ),
    tags: ["ce1", "longueur", "tracer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_tracer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_tracer",
    difficulty: 1,
    theme: "neutral",
    text: "Avec quel instrument trace-t-on un segment bien droit ?",
    format: "qcm",
    choices: ["la règle", "le compas", "la gomme", "la main"],
    expected: ["la règle"],
    comparator: "mcq_exact",
    hint: "C'est celui qui a des graduations et un bord bien droit.",
    explanation: exp(
      "Un segment est un trait droit qui va d'un point à un autre.",
      "On choisit l'instrument qui a un bord droit ET des graduations pour la longueur.",
      "La règle sert deux fois : son bord guide le crayon, ses graduations donnent la longueur. Le compas, lui, sert à tracer des cercles.",
      "On trace un segment avec la règle.",
    ),
    tags: ["ce1", "longueur", "tracer", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_tracer_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tracer 6 cm, Kevin part du bord de la règle, pas du 0. Que se passe-t-il ?",
    format: "qcm",
    choices: [
      "son segment ne fera pas exactement 6 cm",
      "son segment sera parfait",
      "son segment sera deux fois trop long",
      "il ne pourra pas tracer du tout",
    ],
    expected: ["son segment ne fera pas exactement 6 cm"],
    comparator: "mcq_exact",
    hint: "Sur beaucoup de règles, le 0 n'est pas tout au bord.",
    explanation: exp(
      "La longueur se compte à partir de la graduation 0, pas à partir du bord de la règle.",
      "On vérifie toujours où se trouve le 0 avant de commencer.",
      "Sur beaucoup de règles, il y a un petit morceau de plastique avant le 0. En partant du bord, Kevin ajoute ce morceau à son segment : il sera un peu trop long.",
      "Son segment ne fera pas exactement 6 cm.",
    ),
    tags: ["ce1", "longueur", "tracer", "piege", "qcm"],
  },

  /* =========================================================
     CE1_LONGUEUR_UNITES — connaître le m, le cm et le km
     Ce qui se joue ici : savoir laquelle est grande, laquelle
     est petite. Sans cet ordre, aucune conversion ne tient.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_unites_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi le mètre, le centimètre et le kilomètre, quelle est la plus PETITE unité ?",
    format: "qcm",
    choices: ["le centimètre", "le mètre", "le kilomètre", "elles sont pareilles"],
    expected: ["le centimètre"],
    comparator: "mcq_exact",
    hint: "C'est celle qui sert à mesurer un crayon.",
    explanation: exp(
      "Le centimètre est la plus petite des trois unités qu'on utilise au CE1.",
      "On range les unités de la plus petite à la plus grande : centimètre, mètre, kilomètre.",
      "Il faut 100 centimètres pour faire 1 mètre, et 1 000 mètres pour faire 1 kilomètre. Le centimètre est donc tout en bas.",
      "La plus petite est le centimètre.",
    ),
    tags: ["ce1", "longueur", "unites", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_unites_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_unites",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le mot « kilomètre », que veut dire « kilo » ?",
    format: "qcm",
    choices: ["mille", "cent", "dix", "un million"],
    expected: ["mille"],
    comparator: "mcq_exact",
    hint: "C'est le même « kilo » que dans kilogramme.",
    explanation: exp(
      "« Kilo » est un mot qui veut dire mille.",
      "On lit le début du mot pour savoir combien de fois l'unité est répétée.",
      "Un kilomètre, c'est mille mètres. C'est le même « kilo » que dans kilogramme, qui vaut mille grammes.",
      "« Kilo » veut dire mille.",
    ),
    tags: ["ce1", "longueur", "unites", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_unites_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_unites",
    difficulty: 2,
    theme: "neutral",
    text: "Comment écrit-on l'abréviation de « centimètre » ?",
    format: "qcm",
    choices: ["cm", "ct", "cme", "c"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Le m final dit « mètre », la lettre devant dit lequel.",
    explanation: exp(
      "Chaque unité de longueur a une abréviation, toujours écrite sans point et sans s.",
      "On garde la première lettre du début du mot, puis le m de mètre.",
      "« centi » donne le c, « mètre » donne le m : cela fait cm. On écrit 5 cm, jamais 5 cms.",
      "L'abréviation est cm.",
    ),
    tags: ["ce1", "longueur", "unites", "definition", "qcm"],
  },

  /* =========================================================
     CE1_LONGUEUR_CHOISIR_UNITE — l'unité la mieux adaptée
     On choisit l'unité qui donne un nombre commode : ni un
     nombre à sept chiffres, ni un nombre plus petit que 1.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_choisir_unite_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_choisir_unite",
    difficulty: 3,
    theme: "neutral",
    text: "« La porte de la classe mesure 2 cm de haut. » Quelle unité fallait-il écrire ?",
    format: "qcm",
    choices: ["le mètre", "le kilomètre", "le centimètre", "le gramme"],
    expected: ["le mètre"],
    comparator: "mcq_exact",
    hint: "2 cm, c'est à peu près la largeur de ton pouce.",
    explanation: exp(
      "Une unité mal choisie rend la phrase impossible, même si le nombre est bon.",
      "On compare avec un objet connu : 2 cm, c'est la largeur d'un pouce.",
      "Une porte de classe fait environ 2 m, c'est-à-dire 200 cm. Le nombre 2 était juste, c'est l'unité qui manquait.",
      "Il fallait écrire 2 m.",
    ),
    tags: ["ce1", "longueur", "choisir_unite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_choisir_unite_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_choisir_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Avec quelle unité mesure-t-on la distance entre Saint-Denis et Saint-Pierre ?",
    format: "qcm",
    choices: ["le kilomètre", "le mètre", "le centimètre", "le litre"],
    expected: ["le kilomètre"],
    comparator: "mcq_exact",
    hint: "C'est un trajet en voiture d'environ une heure et demie.",
    explanation: exp(
      "Pour les longues distances, on utilise le kilomètre.",
      "On imagine le nombre obtenu avec chaque unité, et on garde celle qui donne le nombre le plus court.",
      "Saint-Denis–Saint-Pierre fait environ 80 km. En mètres, cela ferait 80 000 m : personne ne dit une distance comme ça.",
      "On mesure cette distance en kilomètres.",
    ),
    tags: ["ce1", "longueur", "choisir_unite", "reunion", "qcm"],
  },

  /* =========================================================
     CE1_LONGUEUR_REFERENCES — les longueurs qu'on connaît
     Une référence, c'est une longueur qu'on a dans la tête et
     qui sert à juger toutes les autres.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_references_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_references",
    difficulty: 2,
    theme: "neutral",
    text: "Combien mesure à peu près un adulte ?",
    format: "qcm",
    choices: ["1 m 70 cm", "70 cm", "17 cm", "7 m"],
    expected: ["1 m 70 cm"],
    comparator: "mcq_exact",
    hint: "Il passe sous une porte sans se baisser, mais de justesse.",
    explanation: exp(
      "La taille d'un adulte est une référence très utile : elle sert à juger les hauteurs.",
      "On se met à côté d'un adulte et on compare.",
      "Un adulte mesure environ 1 m 70 cm, c'est-à-dire 170 cm. Une porte, un peu plus haute, fait environ 2 m.",
      "Un adulte mesure environ 1 m 70 cm.",
    ),
    tags: ["ce1", "longueur", "references", "qcm"],
  },

  /* =========================================================
     CE1_LONGUEUR_ESTIMER — estimer sans mesurer
     Estimer n'est pas deviner : c'est reporter une longueur
     qu'on connaît déjà.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_estimer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que son doigt fait 1 m de large. Qu'aurait-il dû dire ?",
    format: "qcm",
    choices: ["1 cm", "1 km", "10 m", "100 m"],
    expected: ["1 cm"],
    comparator: "mcq_exact",
    hint: "Combien de doigts pour faire la largeur de ta main ?",
    explanation: exp(
      "Une bonne référence permet de repérer tout de suite une estimation impossible.",
      "On compare le doigt à un objet connu : la règle graduée.",
      "Un doigt d'enfant fait environ 1 cm de large : dix doigts côte à côte font 10 cm, la largeur d'une main. Un mètre, ce serait cent doigts.",
      "Il aurait dû dire 1 cm.",
    ),
    tags: ["ce1", "longueur", "estimer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_estimer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_estimer",
    difficulty: 3,
    theme: "reunion",
    text: "La route du Littoral relie Saint-Denis à La Possession. Elle mesure environ 12 … ? Choisis l'unité.",
    format: "qcm",
    choices: ["km", "m", "cm", "kg"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "On la parcourt en voiture en un quart d'heure.",
    explanation: exp(
      "Pour un trajet en voiture, la bonne unité est le kilomètre.",
      "On compare à une référence : marcher 1 km prend environ un quart d'heure.",
      "12 m, ce serait la longueur d'un bus. La route du Littoral longe toute la falaise : c'est bien 12 km.",
      "Elle mesure environ 12 km.",
    ),
    tags: ["ce1", "longueur", "estimer", "reunion", "qcm"],
  },

  /* =========================================================
     CE1_LONGUEUR_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : décider si
     ça rentre, et voir qu'une même longueur s'écrit de deux
     façons.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Ruban de 1 m : tu coupes trois morceaux de 25 cm. En reste-t-il assez pour un quatrième ?",
    canvas: { kind: "schema_barre", total: "1 m", parts: [{ label: "1", value: "25 cm" }, { label: "2", value: "25 cm" }, { label: "3", value: "25 cm" }, { label: "reste", unknown: true }] },
    format: "qcm",
    choices: [
      "oui, tout juste",
      "non, il manque 25 cm",
      "oui, et il en restera encore",
      "non, il ne reste rien",
    ],
    expected: ["oui, tout juste"],
    comparator: "mcq_exact",
    hint: "Combien font trois morceaux de 25 cm ? Compare au mètre.",
    explanation: exp(
      "Pour savoir si ça rentre, on compare ce qu'on a déjà pris à ce qu'on avait au départ.",
      "On écrit le ruban en centimètres, puis on compte ce qui a été coupé.",
      "1 m = 100 cm. Trois morceaux font 25 + 25 + 25 = 75 cm. Il reste 100 - 75 = 25 cm : exactement de quoi faire le quatrième.",
      "Oui, tout juste : quatre morceaux de 25 cm font pile 1 m.",
    ),
    tags: ["ce1", "longueur", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Le même banc : Léa écrit 2 m, Kevin écrit 200 cm. Qui a raison ?",
    format: "qcm",
    choices: [
      "les deux : c'est la même longueur",
      "Léa seulement",
      "Kevin seulement",
      "aucun des deux",
    ],
    expected: ["les deux : c'est la même longueur"],
    comparator: "mcq_exact",
    hint: "Transforme les 2 m en centimètres.",
    explanation: exp(
      "Une même longueur peut s'écrire de deux façons, avec deux unités différentes.",
      "On ramène les deux écritures à la même unité, ici le centimètre.",
      "2 m = 200 cm, puisque 1 m = 100 cm. Léa et Kevin ont écrit la même longueur, avec des mots différents.",
      "Les deux ont raison.",
    ),
    tags: ["ce1", "longueur", "defi", "piege", "qcm"],
  },
  ...GABARITS,
];
