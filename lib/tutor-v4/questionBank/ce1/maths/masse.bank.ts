// lib/tutor-v4/questionBank/ce1/maths/masse.bank.ts
//
// Les masses du CE1, écrites à la main. Même ossature que longueur.bank.ts —
// c'est voulu : les deux notions partagent le même piège, et un élève qui a
// compris l'un doit reconnaître l'autre.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, tableau CE1) :
//   — deux unités : le gramme et le kilogramme, avec leurs symboles g et kg.
//     PAS de tonne, pas de milligramme ;
//   — une seule relation à connaître : 1 kg = 1 000 g ;
//   — soupeser et comparer deux ou trois objets, avec ou sans balance ;
//   — quelques masses de référence, pour estimer.
//   — pas d'écriture à virgule : on écrit « 1 kg 500 g », jamais « 1,5 kg ».
//
// LE PIÈGE DE LA NOTION : comparer les NOMBRES au lieu des masses. « 900 g est
// plus lourd que 1 kg, parce que 900 est plus grand que 1. » Et son cousin, le
// plus vieux de tous : croire qu'un kilo de plumes pèse moins qu'un kilo de
// cailloux.
//
// ⛔ PAS DE CANVAS BALANCE. La variante `balance` fait pencher le fléau toute
// seule d'après le champ `grammes` : sur une question dont le piège est
// justement de convertir, le dessin donne la réponse avant que l'élève ait
// réfléchi. Seule la variante `estimation` est sûre — elle force l'étiquette
// de masse à ne pas s'afficher.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { MasseCanvasData, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
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

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function masseCanvas(data: Omit<MasseCanvasData, "kind">): MasseCanvasData {
  return { kind: "masse", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* =========================================================
   LES GABARITS (10/11/2026) — situations × tournures × nombres
   ---------------------------------------------------------
   ⛔ Mesure du 10/11 : 7 à 12 squelettes pour cinq micros sur
   sept, jusqu'à 19 répétitions sur 20. Chaque gabarit tire une
   FAMILLE, un objet du monde d'un enfant de 7 ans (marché,
   goûter, vétérinaire, boulangère…) et une tournure.
   ⛔ LES NOMBRES RESTENT DANS LE MILLIER : la seule conversion
   du CE1 est 1 kg = 1 000 g. « 3 kg = 3 000 g » ou « 2 kg 335 g »
   sortaient du programme ; ils sont retirés.
   ⭐ LA BALANCE REVIENT, MAIS SEULEMENT LÀ OÙ ELLE EST LA
   DONNÉE : « regarde la balance, lequel est le plus lourd ? »,
   ou une balance en équilibre dont on cherche un côté. Elle
   n'affiche alors aucune masse (`showMasses: false`) ou
   seulement celle des poids. Sur « 1 kg ou 900 g ? », le dessin
   reste une étiquette par objet (`objets`), sans fléau qui
   pencherait à la place de l'élève.
   Mesure : scripts/mesurer-squelettes-coach.ts ce1 masse.
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
function deuxEnfants(): [Enfant, Enfant] {
  const a = enfant();
  let b = enfant();
  while (b.nom === a.nom) b = enfant();
  return [a, b];
}
const tirer = (familles: readonly (() => Q)[]): Q => randomChoice(familles)();
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « 1 000 » : l'espace des milliers. */
const nb = (n: number) => (n >= 1000 ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, "0")}` : String(n));

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
    notionId: "masse",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["ce1", "masse", "template", ...tags],
    generate,
  };
}

/** Des choses à peser, avec une masse plausible (en grammes). */
type Chose = { le: string; court: string; icon: string; g: number; u: "g" | "kg" };
const CHOSES: readonly Chose[] = [
  { le: "une plume", court: "plume", icon: "🪶", g: 1, u: "g" },
  { le: "une feuille de papier", court: "feuille", icon: "📄", g: 5, u: "g" },
  { le: "un crayon", court: "crayon", icon: "✏️", g: 10, u: "g" },
  { le: "une gomme", court: "gomme", icon: "🧽", g: 20, u: "g" },
  { le: "un œuf", court: "œuf", icon: "🥚", g: 60, u: "g" },
  { le: "une carotte", court: "carotte", icon: "🥕", g: 80, u: "g" },
  { le: "une tablette de chocolat", court: "chocolat", icon: "🍫", g: 100, u: "g" },
  { le: "une banane", court: "banane", icon: "🍌", g: 120, u: "g" },
  { le: "une pomme", court: "pomme", icon: "🍎", g: 150, u: "g" },
  { le: "une orange", court: "orange", icon: "🍊", g: 200, u: "g" },
  { le: "un livre", court: "livre", icon: "📕", g: 300, u: "g" },
  { le: "un ballon de foot", court: "ballon", icon: "⚽", g: 400, u: "g" },
  { le: "une petite voiture", court: "petite voiture", icon: "🚗", g: 50, u: "g" },
  { le: "une brique de lait", court: "lait", icon: "🥛", g: 1000, u: "kg" },
  { le: "un sac de riz", court: "riz", icon: "🍚", g: 2000, u: "kg" },
  { le: "un cartable plein", court: "cartable", icon: "🎒", g: 3000, u: "kg" },
  { le: "un chat", court: "chat", icon: "🐈", g: 4000, u: "kg" },
  { le: "une pastèque", court: "pastèque", icon: "🍉", g: 5000, u: "kg" },
  { le: "une citrouille", court: "citrouille", icon: "🎃", g: 6000, u: "kg" },
  { le: "un vélo d'enfant", court: "vélo", icon: "🚲", g: 8000, u: "kg" },
  { le: "un chien", court: "chien", icon: "🐕", g: 10000, u: "kg" },
  { le: "une valise pleine", court: "valise", icon: "🧳", g: 15000, u: "kg" },
  { le: "un enfant de 7 ans", court: "enfant", icon: "🧒", g: 25000, u: "kg" },
];
const valeur = (c: Chose) => (c.u === "kg" ? c.g / 1000 : c.g);
const masseDe = (c: Chose) => `${valeur(c)} ${c.u}`;
/** Deux choses de masses bien différentes (au moins le double). */
function deuxChoses(): [Chose, Chose] {
  const a = randomChoice(CHOSES);
  let b = randomChoice(CHOSES);
  while (b === a || Math.max(a.g, b.g) < 2 * Math.min(a.g, b.g)) b = randomChoice(CHOSES);
  return [a, b];
}
const sansArticle = (le: string) => le.replace(/^(un|une) /, "");
const leLa = (le: string) => le.replace(/^un /, "le ").replace(/^une /, "la ").replace(/^(le|la) ([aeéèiouœ])/i, "l'$2");

/** La carte d'un objet (son dessin, son nom, sa masse si on la donne). */
const cartes = (objets: { label: string; icon: string; masse?: string }[], showMasses = true): Q["canvas"] =>
  masseCanvas({ variant: "objets", objets, display: { showMasses, showLabels: true } });

/** La balance qui penche : c'est la donnée de la question. */
const balance = (g: Chose, d: Chose): Q["canvas"] =>
  masseCanvas({
    variant: "balance",
    gauche: { label: sansArticle(g.le), icon: g.icon, grammes: g.g },
    droite: { label: sansArticle(d.le), icon: d.icon, grammes: d.g },
    display: { showMasses: false, showLabels: true, showComparison: false },
  });

/** Ce qu'on achète au marché, au poids. */
const MARCHE = [
  "de pommes", "de bananes", "de tomates", "de carottes", "de mangues", "de pommes de terre",
  "de cerises", "de fraises", "de raisin", "d'oranges", "de poires", "de courgettes", "de letchis", "de prunes",
];
const OU = [
  "au marché", "chez le primeur", "à la ferme", "au magasin bio", "chez la marchande de fruits",
  "pour le pique-nique", "pour la fête de l'école", "pour faire une tarte",
];
const PAQUETS = [
  "de farine", "de sucre", "de riz", "de pâtes", "de lentilles", "de graines pour Pic", "de croquettes pour le chat",
  "de café", "de bonbons", "de semoule", "de beurre", "de chocolat en poudre",
];

const GABARITS: TutorBankItemV4[] = [
  /* ---------- COMPARER ---------- */
  gab("ce1_masse_comparer_tpl_3", "ce1_masse_comparer", 1, "Le plateau qui descend porte l'objet le plus lourd.", () => {
    const [a, b] = deuxChoses();
    const [g, d] = randomChoice([true, false]) ? [a, b] : [b, a];
    const lourd = randomChoice([true, false]);
    const bonne = (g.g > d.g) === lourd ? g : d;
    const p = enfant();
    return qcm(
      `${randomChoice([`${p.nom} pose ${g.le} et ${d.le} sur la balance.`, "Regarde la balance.", `La vétérinaire prête sa balance à ${p.nom}.`, `Pic regarde la balance du marché.`])} ${randomChoice([
        `Lequel est le plus ${lourd ? "lourd" : "léger"} ?`,
        `Qu'est-ce qui est le plus ${lourd ? "lourd" : "léger"} ?`,
      ])}`,
      leLa(bonne.le),
      [leLa(g.le), leLa(d.le), "les deux pèsent pareil"],
      exp(
        "Sur une balance à deux plateaux, le plateau le plus lourd descend.",
        lourd ? "On regarde quel plateau est le plus bas." : "On regarde quel plateau est le plus haut.",
        `Le plateau le plus bas porte ${leLa((g.g > d.g ? g : d).le)}.`,
        `C'est ${leLa(bonne.le)}.`,
      ),
      balance(g, d),
    );
  }, ["comparer", "canvas"]),
  gab("ce1_masse_comparer_tpl_2", "ce1_masse_comparer", 2, "Même unité : le plus grand nombre est la plus grande masse.", () =>
    tirer([
      () => {
        const [a, b] = deuxChoses();
        const leger = randomChoice([true, false]);
        const bonne = (a.g < b.g) === leger ? a : b;
        return qcm(
          randomChoice([
            `Lequel est le plus ${leger ? "LÉGER" : "LOURD"} : ${a.le} ou ${b.le} ?`,
            `${enfant().nom} soupèse ${a.le} et ${b.le}. Qu'est-ce qui est le plus ${leger ? "léger" : "lourd"} ?`,
          ]),
          bonne.le,
          [a.le, b.le, "les deux pèsent pareil"],
          exp(
            "Pour comparer sans balance, on soupèse : on porte les deux objets et on sent lequel tire le plus.",
            `On imagine ${a.le} dans une main et ${b.le} dans l'autre.`,
            `${maj(a.le)} pèse environ ${masseDe(a)}, ${b.le} environ ${masseDe(b)}.`,
            `Le plus ${leger ? "léger" : "lourd"} est ${bonne.le}.`,
          ),
        );
      },
      () => {
        const [p, q] = deuxEnfants();
        const u = randomChoice(["kg", "g"] as const);
        const sac = u === "kg"
          ? randomChoice([{ q: "le cartable", f: false }, { q: "la valise", f: true }, { q: "le sac de sport", f: false }, { q: "le panier de fruits", f: false }, { q: "la citrouille", f: true }])
          : randomChoice([{ q: "le sachet de billes", f: false }, { q: "la trousse", f: true }, { q: "le goûter", f: false }, { q: "la boîte de crayons", f: true }, { q: "le doudou", f: false }]);
        const a = u === "kg" ? randomInt(2, 15) : randomInt(10, 90) * 10;
        let b = u === "kg" ? randomInt(2, 15) : randomInt(10, 90) * 10;
        if (b === a) b += u === "kg" ? 1 : 10;
        const lourd = randomChoice([true, false]);
        const gagnant = (a > b) === lourd ? p : q;
        const icon = randomChoice(["🎒", "🧳", "📦", "🧺"]);
        const adj = (lourd ? "lourd" : "léger").replace("léger", sac.f ? "légère" : "léger") + (lourd && sac.f ? "e" : "");
        return qcm(
          `${maj(sac.q)} ${deNom(p.nom)} pèse ${a} ${u}. ${sac.f ? "Celle" : "Celui"} ${deNom(q.nom)} pèse ${b} ${u}. ${randomChoice([
            `Qui a ${sac.q} ${sac.f ? "la" : "le"} plus ${adj} ?`,
            `Quel enfant a ${sac.q} ${sac.f ? "la" : "le"} plus ${adj} ?`,
          ])}`,
          gagnant.nom,
          [p.nom, q.nom, "les deux pareil"],
          exp(
            "Quand deux masses sont dans la même unité, on compare les nombres.",
            `On cherche le nombre le plus ${lourd ? "grand" : "petit"}.`,
            `${Math.max(a, b)} ${u} > ${Math.min(a, b)} ${u}.`,
            `C'est ${gagnant.nom}.`,
          ),
          cartes([{ label: p.nom, icon, masse: `${a} ${u}` }, { label: q.nom, icon, masse: `${b} ${u}` }]),
        );
      },
    ]), ["comparer", "canvas"]),
  gab("ce1_masse_comparer_tpl_1", "ce1_masse_comparer", 3, "1 kg = 1 000 g : écris les deux masses en grammes.", () => {
    const g = randomChoice([100, 200, 250, 300, 400, 500, 600, 700, 750, 800, 850, 900, 950, 990]);
    const egal = randomInt(1, 8) === 1;
    const grammes = egal ? 1000 : g;
    const p = enfant();
    const [x, y] = shuffle(["le melon", "le sac de pommes", "la boîte de jouets", "le paquet de farine", "le sac de billes", "le pot de miel", "la citrouille", "le panier de légumes"]).slice(0, 2);
    const ecritG = `${nb(grammes)} g`;
    return tirer([
      () => qcm(
        `${randomChoice(["Qu'est-ce qui est le plus lourd", "Quelle est la plus grande masse"])} : 1 kg ou ${ecritG} ?`,
        egal ? "c'est pareil" : "1 kg",
        ["1 kg", ecritG, "c'est pareil"],
        exp(
          "1 kg = 1 000 g. Pour comparer, on écrit tout dans la même unité.",
          "On écrit le kilogramme en grammes.",
          `1 kg = 1 000 g, et 1 000 ${egal ? "=" : ">"} ${grammes}.`,
          egal ? "C'est la même masse." : `C'est 1 kg : ${grammes} g pèse moins, même si ${grammes} est plus grand que 1.`,
        ),
        cartes([{ label: "1 kg", icon: "⚖️" }, { label: ecritG, icon: "⚖️" }], false),
      ),
      () => qcm(
        `${maj(x)} pèse 1 kg. ${maj(y)} pèse ${ecritG}. ${randomChoice(["Lequel est le plus lourd ?", `${p.nom} doit porter le plus lourd. Lequel ?`])}`,
        egal ? "ils pèsent pareil" : x,
        [x, y, "ils pèsent pareil"],
        exp(
          "1 kg = 1 000 g. Pour comparer, on écrit tout dans la même unité.",
          "On écrit le kilogramme en grammes, puis on compare.",
          `1 kg = 1 000 g, et 1 000 ${egal ? "=" : ">"} ${grammes}.`,
          egal ? "Ils pèsent pareil." : `C'est ${x}.`,
        ),
        cartes([{ label: x.replace(/^(le|la) /, ""), icon: "📦", masse: "1 kg" }, { label: y.replace(/^(le|la) /, ""), icon: "📦", masse: ecritG }]),
      ),
    ]);
  }, ["comparer", "piege", "canvas"]),
  gab("ce1_masse_comparer_tpl_4", "ce1_masse_comparer", 4, "Un kilo, c'est un kilo, quoi qu'on mette dans le sac.", () =>
    tirer([
      () => {
        const [a, b] = shuffle(["de plumes", "de cailloux", "de coton", "de pommes", "de bonbons", "de sable", "de feuilles", "de clous", "de pop-corn", "de farine"]).slice(0, 2);
        const p = enfant();
        const m = randomChoice(["1 kg", "500 g", "2 kg", "200 g"]);
        return qcm(
          `${randomChoice([`${p.nom} demande :`, "Pic pose une colle :", "Devinette :"])} qu'est-ce qui est le plus lourd, ${m} ${a} ou ${m} ${b} ?`,
          "les deux pèsent pareil",
          [`${m} ${a}`, `${m} ${b}`, "les deux pèsent pareil"],
          exp(
            "La masse dit combien pèse une chose, quelle que soit la matière.",
            "On regarde les nombres et les unités, pas ce qu'il y a dans le sac.",
            `${m} = ${m} : il faut juste plus ou moins de place.`,
            "Les deux pèsent pareil.",
          ),
        );
      },
      () => {
        const vals = shuffle([`1 kg`, `${randomChoice([600, 700, 800, 900])} g`, `${randomChoice([150, 200, 300, 400])} g`]);
        const enG = (s: string) => (s.endsWith("kg") ? 1000 : Number(s.split(" ")[0]));
        const lourd = randomChoice([true, false]);
        const tri = [...vals].sort((x, y) => enG(x) - enG(y));
        const bonne = lourd ? tri[2] : tri[0];
        const quoi = randomChoice(["Trois sacs", "Trois paquets", "Trois paniers", "Trois colis", "Trois boîtes"]);
        return qcm(
          `${quoi} pèsent ${vals.join(", ")}. ${randomChoice([`Lequel est le plus ${lourd ? "lourd" : "léger"} ?`, `Quelle est la masse la plus ${lourd ? "grande" : "petite"} ?`])}`,
          bonne,
          vals,
          exp(
            "Pour comparer des masses, on les écrit toutes dans la même unité.",
            "On écrit le kilogramme en grammes : 1 kg = 1 000 g.",
            vals.map((v) => `${v} = ${nb(enG(v))} g`).join(" ; ") + ".",
            `C'est ${bonne}.`,
          ),
          cartes(vals.map((v) => ({ label: v, icon: "📦" })), false),
        );
      },
    ]), ["comparer", "piege", "canvas"]),

  /* ---------- KILOGRAMME ET GRAMME ---------- */
  gab("ce1_masse_kg_g_tpl_3", "ce1_masse_kg_g", 1, "g = gramme (léger), kg = kilogramme (plus lourd).", () => {
    const u = randomChoice(["g", "kg"] as const);
    const c = randomChoice(CHOSES.filter((x) => x.u === u && x.g <= 5000));
    const ou = randomChoice(["l'étiquette", "le paquet", "la balance du marché", "le carnet de la vétérinaire", "la recette de gâteau", "l'affiche de la kermesse"]);
    return qcm(
      `Sur ${ou}, ${enfant().nom} lit « ${masseDe(c)} ». ${randomChoice([`Que veut dire « ${u} » ?`, `« ${u} », c'est quelle unité ?`])}`,
      u === "g" ? "gramme" : "kilogramme",
      ["gramme", "kilogramme", u === "g" ? "gâteau" : "kilomètre", "litre"],
      exp("Les masses se mesurent en grammes (g) et en kilogrammes (kg).", "On reconnaît le symbole écrit après le nombre.", `« ${u} » est le symbole du ${u === "g" ? "gramme" : "kilogramme"}.`, `« ${u} » veut dire ${u === "g" ? "gramme" : "kilogramme"}.`),
      cartes([{ label: sansArticle(c.le), icon: c.icon, masse: masseDe(c) }]),
    );
  }, ["unites", "canvas"]),
  gab("ce1_masse_kg_g_tpl_2", "ce1_masse_kg_g", 2, "Léger comme un fruit : en grammes. Lourd comme un chien : en kilogrammes.", () => {
    const c = randomChoice(CHOSES.filter((x) => x.g >= 5));
    const p = enfant();
    return qcm(
      randomChoice([
        `Avec quelle unité pèse-t-on ${c.le} ?`,
        `${p.nom} pèse ${c.le}. Quelle unité choisit-${p.il} ?`,
        `Pour dire combien pèse ${c.le}, gramme ou kilogramme ?`,
      ]),
      c.u === "g" ? "le gramme" : "le kilogramme",
      ["le gramme", "le kilogramme", "le mètre"],
      exp("Le gramme sert aux choses légères, le kilogramme aux choses lourdes.", "On imagine la chose dans sa main.", `${maj(c.le)} pèse environ ${masseDe(c)}.`, `On choisit ${c.u === "g" ? "le gramme" : "le kilogramme"}.`),
      cartes([{ label: sansArticle(c.le), icon: c.icon }], false),
    );
  }, ["unites", "canvas"]),
  gab("ce1_masse_kg_g_tpl_1", "ce1_masse_kg_g", 3, "1 kg = 1 000 g.", () =>
    tirer([
      () => {
        const p = enfant();
        const quoi = randomChoice(PAQUETS);
        return qcm(
          `${p.nom} achète un paquet ${quoi} de 1 kg. ${randomChoice(["Combien de grammes cela fait-il ?", "Cela fait combien de grammes ?", "Combien pèse-t-il en grammes ?"])}`,
          "1 000 g",
          ["100 g", "10 g", "500 g"],
          exp("1 kilogramme, c'est 1 000 grammes.", "On se souvient : « kilo » veut dire mille.", "1 kg = 1 000 g.", "Cela fait 1 000 g."),
          cartes([{ label: `paquet ${quoi}`, icon: "📦", masse: "1 kg" }]),
        );
      },
      () => qcm(
        `${randomChoice(["Quelle masse est égale à 1 kg ?", "Laquelle de ces masses pèse autant que 1 kg ?", "Pic cherche la masse égale à 1 kg. Laquelle ?"])}`,
        "1 000 g",
        ["100 g", "10 g", "1 g", "900 g"],
        exp("1 kilogramme, c'est 1 000 grammes.", "On cherche les grammes qui font un kilogramme.", "1 kg = 1 000 g.", "C'est 1 000 g."),
      ),
      () => {
        const p = enfant();
        return qcm(
          `${p.nom} dit : « 1 kg = ${randomChoice([100, 10])} g ». ${randomChoice([`A-t-${p.il} raison ?`, "Est-ce juste ?"])}`,
          "non, 1 kg = 1 000 g",
          ["oui", "non, 1 kg = 1 000 g", "non, 1 kg = 1 g"],
          exp("1 kilogramme, c'est 1 000 grammes.", "« kilo » veut dire mille.", "1 kg = 1 000 g.", "Non : 1 kg = 1 000 g."),
        );
      },
    ]), ["unites", "canvas"]),

  /* ---------- SOUPESER ---------- */
  gab("ce1_masse_soupeser_tpl_1", "ce1_masse_soupeser", 2, "Ce qui tire le plus sur la main, ou le plateau qui descend, c'est le plus lourd.", () =>
    tirer([
      () => {
        const [a, b] = deuxChoses();
        const p = enfant();
        const lourd = randomChoice([true, false]);
        const bonne = (a.g > b.g) === lourd ? a : b;
        return qcm(
          `${p.nom} tient ${a.le} dans une main et ${b.le} dans l'autre. ${randomChoice([
            `Quelle main sent le plus ${lourd ? "lourd" : "léger"} ?`,
            `Qu'est-ce qui est le plus ${lourd ? "lourd" : "léger"} ?`,
          ])}`,
          `celle avec ${bonne.le}`,
          [`celle avec ${a.le}`, `celle avec ${b.le}`, "les deux pareil"],
          exp("Soupeser, c'est porter pour sentir lequel pèse le plus.", "La main qui porte le plus lourd est tirée vers le bas.", `${maj(a.le)} pèse environ ${masseDe(a)}, ${b.le} environ ${masseDe(b)}.`, `C'est la main avec ${bonne.le}.`),
        );
      },
      () => {
        const [a, b] = deuxChoses();
        const [g, d] = randomChoice([true, false]) ? [a, b] : [b, a];
        return qcm(
          `${randomChoice(["Sur la balance, on pose", "Le chef cuisinier pose", "La boulangère pose", "Au marché, on pose"])} ${g.le} à gauche et ${d.le} à droite. ${randomChoice(["Quel plateau descend ?", "De quel côté la balance penche-t-elle ?"])}`,
          g.g > d.g ? "celui de gauche" : "celui de droite",
          ["celui de gauche", "celui de droite", "aucun, ils restent au même niveau"],
          exp("Sur une balance à deux plateaux, le plateau le plus lourd descend.", "On cherche l'objet le plus lourd.", `${maj((g.g > d.g ? g : d).le)} est le plus lourd.`, `C'est le plateau de ${g.g > d.g ? "gauche" : "droite"} qui descend.`),
        );
      },
      () => {
        const [a, b] = deuxChoses();
        const [g, d] = randomChoice([true, false]) ? [a, b] : [b, a];
        return qcm(
          `${randomChoice(["Regarde la balance.", "Pic regarde la balance du marché.", "Voici la balance de la classe."])} ${randomChoice(["Qu'est-ce qui est le plus lourd ?", "Lequel pèse le plus ?"])}`,
          leLa((g.g > d.g ? g : d).le),
          [leLa(g.le), leLa(d.le), "les deux pèsent pareil"],
          exp("Sur une balance à deux plateaux, le plateau le plus lourd descend.", "On regarde quel plateau est le plus bas.", `Le plateau le plus bas porte ${leLa((g.g > d.g ? g : d).le)}.`, `C'est ${leLa((g.g > d.g ? g : d).le)}.`),
          balance(g, d),
        );
      },
    ]), ["soupeser", "canvas"]),

  /* ---------- 1 kg = 1 000 g ---------- */
  gab("ce1_masse_relation_tpl_3", "ce1_masse_relation_kg_g", 1, "« kilo » veut dire mille : 1 kg = 1 000 g.", () => {
    const p = enfant();
    const c = randomChoice(["un sac de pommes", "une brique de lait", "un paquet de farine", "un melon", "un sac de croquettes", "une boîte de jouets"]);
    return qcm(
      `${randomChoice([`${p.nom} porte ${c} de 1 kg.`, `La balance indique 1 kg pour ${c}.`, `Au marché, ${c} pèse 1 kg.`])} ${randomChoice(["Combien de grammes cela fait-il ?", "Cela fait combien de grammes ?"])}`,
      "1 000 g",
      ["100 g", "10 g", "1 g", "10 000 g"],
      exp("1 kilogramme, c'est 1 000 grammes.", "« kilo » veut dire mille.", "1 kg = 1 000 g.", "Cela fait 1 000 g."),
    );
  }, ["relation"]),
  gab("ce1_masse_relation_tpl_1", "ce1_masse_relation_kg_g", 3, "Ajoute les petits paquets jusqu'à 1 000 g.", () => {
    const paquet = randomChoice([100, 200, 250, 500]);
    const n = 1000 / paquet;
    const p = enfant();
    const quoi = randomChoice(PAQUETS);
    return qcm(
      `${randomChoice([`${p.nom} veut 1 kg ${quoi}.`, `La recette demande 1 kg ${quoi}.`, `Pic veut 1 kg ${quoi}.`])} Les paquets font ${paquet} g. ${randomChoice(["Combien de paquets faut-il ?", "Combien de paquets prendre ?"])}`,
      String(n),
      [String(n + 1), String(n - 1), String(n * 2), String(paquet / 10)].filter((x, i, t) => x !== "0" && t.indexOf(x) === i),
      exp("1 kg = 1 000 g.", `On ajoute ${paquet} g jusqu'à arriver à 1 000 g.`, `${Array(n).fill(paquet).join(" + ")} = 1 000.`, `Il faut ${n} paquets.`),
      cartes([{ label: "1 paquet", icon: "📦", masse: `${paquet} g` }]),
    );
  }, ["relation", "canvas"]),
  gab("ce1_masse_relation_tpl_2", "ce1_masse_relation_kg_g", 4, "Les deux morceaux ensemble doivent faire 1 000 g.", () =>
    tirer([
      () => {
        const bonne = randomChoice([[500, 500], [600, 400], [700, 300], [750, 250], [800, 200], [900, 100], [250, 750]]);
        const pieges = [[500, 50], [900, 10], [600, 300], [700, 200], [400, 400]].filter((x) => x[0] + x[1] !== 1000);
        const p = enfant();
        const f = (x: number[]) => `${x[0]} g et ${x[1]} g`;
        return qcm(
          `${randomChoice([`${p.nom} met deux sacs sur la balance.`, "On pèse deux paquets ensemble.", "La boulangère pèse deux sacs de farine."])} ${randomChoice(["Quels sacs font 1 kg en tout ?", "Lesquels pèsent 1 kg ensemble ?"])}`,
          f(bonne),
          shuffle(pieges).slice(0, 3).map(f),
          exp("1 kg = 1 000 g.", "On ajoute les deux masses et on cherche 1 000.", `${bonne[0]} + ${bonne[1]} = 1 000.`, `C'est ${f(bonne)}.`),
        );
      },
      () => {
        const deja = randomChoice([100, 200, 300, 400, 500, 600, 700, 800, 900, 250, 750]);
        const p = enfant();
        return qcm(
          `${randomChoice([`Sur la balance ${deNom(p.nom)}, il y a ${deja} g ${randomChoice(MARCHE)}.`, `Le panier pèse ${deja} g.`])} ${randomChoice(["Combien faut-il ajouter pour arriver à 1 kg ?", "Combien de grammes manque-t-il pour faire 1 kg ?"])}`,
          `${1000 - deja} g`,
          [`${1000 - deja + 100} g`, `${100 - (deja % 100) || 10} g`, `${deja} g`, `${1000 - deja - 100} g`].filter((x, i, t) => t.indexOf(x) === i && x !== `${1000 - deja} g` && !x.startsWith("0") && !x.startsWith("-")),
          exp("1 kg = 1 000 g.", `On cherche ce qu'il faut ajouter à ${deja} pour arriver à 1 000.`, `${deja} + ${1000 - deja} = 1 000.`, `Il manque ${1000 - deja} g.`),
          masseCanvas({
            variant: "balance",
            gauche: { label: "1 kg", icon: "⚖️", masse: "1 kg" },
            droite: { label: `${deja} g + ?`, icon: "🧺" },
            display: { showMasses: true, showLabels: true, showComparison: false },
          }),
        );
      },
    ]), ["relation", "canvas"]),

  /* ---------- ESTIMER ---------- */
  gab("ce1_masse_estimer_tpl_1", "ce1_masse_estimer", 2, "Pense à des repères : un œuf, environ 60 g ; une brique de lait, 1 kg.", () => {
    const c = randomChoice(CHOSES.filter((x) => x.g >= 10));
    const v = valeur(c);
    const autre = c.u === "g" ? "kg" : "g";
    return qcm(
      randomChoice([`Environ combien pèse ${c.le} ?`, `${enfant().nom} devine la masse ${c.le.startsWith("un") ? "d'" + c.le : "de " + c.le}. Que choisir ?`, `Quelle masse va avec ${c.le} ?`]),
      `${v} ${c.u}`,
      [`${v} ${autre}`, `${v * 10} ${c.u}`, c.u === "g" ? `${Math.max(1, v / 10)} g` : `${v * 100} g`],
      exp("On estime une masse en la comparant à des repères connus.", "On imagine la chose dans sa main : léger comme un fruit, ou lourd comme un sac ?", `${maj(c.le)} pèse environ ${v} ${c.u}.`, `Environ ${v} ${c.u}.`),
      masseCanvas({ variant: "objets", objets: [{ label: sansArticle(c.le), icon: c.icon }], display: { showMasses: false, showLabels: true } }),
    );
  }, ["estimer", "canvas"]),
  gab("ce1_masse_estimer_tpl_3", "ce1_masse_estimer", 3, "Imagine la chose : la phrase est-elle possible ?", () =>
    tirer([
      () => {
        const c = randomChoice(CHOSES.filter((x) => x.g >= 10 && x.g <= 15000));
        const p = enfant();
        const faux = c.u === "g" ? "kg" : "g";
        return qcm(
          `${p.nom} écrit : « ${c.le} pèse ${valeur(c)} ${faux} ». ${randomChoice(["Est-ce possible ?", `A-t-${p.il} bien choisi l'unité ?`])}`,
          `non, c'est plutôt ${masseDe(c)}`,
          ["oui", `non, c'est plutôt ${masseDe(c)}`, `non, c'est plutôt ${valeur(c) * 10} ${faux}`],
          exp("L'unité doit aller avec la masse de la chose.", "On imagine la chose dans sa main.", `${valeur(c)} ${faux}, ce serait ${faux === "kg" ? "bien trop lourd" : "bien trop léger"} pour ${c.le}.`, `C'est plutôt ${masseDe(c)}.`),
          masseCanvas({ variant: "objets", objets: [{ label: sansArticle(c.le), icon: c.icon }], display: { showMasses: false, showLabels: true } }),
        );
      },
      () => {
        const c = randomChoice(CHOSES.filter((x) => x.g >= 10 && x.g <= 15000));
        return qcm(
          `${randomChoice(["Complète", "Trouve l'unité", "Choisis le bon mot"])} : « ${c.le} pèse environ ${valeur(c)} … ».`,
          c.u === "g" ? "grammes" : "kilogrammes",
          ["grammes", "kilogrammes", "mètres"],
          exp("L'unité doit aller avec la masse de la chose.", "On essaie chaque unité et on garde celle qui a du sens.", `${maj(c.le)} pèse environ ${masseDe(c)}.`, `Il manque « ${c.u === "g" ? "grammes" : "kilogrammes"} ».`),
          masseCanvas({ variant: "objets", objets: [{ label: sansArticle(c.le), icon: c.icon }], display: { showMasses: false, showLabels: true } }),
        );
      },
    ]), ["estimer", "canvas"]),
  gab("ce1_masse_estimer_tpl_2", "ce1_masse_estimer", 4, "Combien de fois cette masse tient-elle dans 1 000 g ?", () => {
    const cas = randomChoice([
      { quoi: "pot de confiture", icon: "🍯", g: 250 },
      { quoi: "pot de yaourt", icon: "🥛", g: 125 },
      { quoi: "paquet de beurre", icon: "🧈", g: 250 },
      { quoi: "sachet de bonbons", icon: "🍬", g: 100 },
      { quoi: "paquet de pâtes", icon: "🍝", g: 500 },
      { quoi: "pot de miel", icon: "🍯", g: 500 },
      { quoi: "sachet de graines", icon: "🌱", g: 200 },
      { quoi: "tablette de chocolat", icon: "🍫", g: 100 },
    ]);
    const n = 1000 / cas.g;
    const p = enfant();
    return qcm(
      `Un ${cas.quoi} pèse ${cas.g} g. ${randomChoice([`${p.nom} veut en avoir 1 kg. Combien en faut-il ?`, "Combien en faut-il pour faire 1 kg ?", "Combien en faut-il pour équilibrer 1 kg sur la balance ?"])}`.replace("Un tablette", "Une tablette"),
      String(n),
      [String(n + 1), String(n - 1), String(n * 2), String(n + 2)].filter((x) => x !== "0"),
      exp("1 kg = 1 000 g.", `On ajoute ${cas.g} g jusqu'à 1 000 g.`, `${Array(n).fill(cas.g).join(" + ")} = 1 000.`, `Il en faut ${n}.`),
      cartes([{ label: cas.quoi, icon: cas.icon, masse: `${cas.g} g` }]),
    );
  }, ["estimer", "canvas"]),

  /* ---------- PROBLÈMES ---------- */
  gab("ce1_masse_probleme_tpl_3", "ce1_masse_probleme", 2, "Même unité : on ajoute les nombres.", () => {
    const p = enfant();
    const [x, y] = shuffle(MARCHE).slice(0, 2);
    const a = randomInt(1, 6);
    const b = randomInt(1, 5);
    const ou = randomChoice(OU);
    return tirer([
      () => qcm(
        `${p.nom} achète ${a} kg ${x} et ${b} kg ${y} ${ou}. ${randomChoice([`Combien de kilogrammes porte-t-${p.il} en tout ?`, "Quelle masse cela fait-il en tout ?", "Combien pèsent ses courses ?"])}`,
        `${a + b} kg`,
        [`${a + b + 1} kg`, `${Math.abs(a - b) || 1} kg`, `${a + b} g`, `${a * b === a + b ? a + b + 2 : a * b} kg`],
        exp("Pour trouver la masse totale, on ajoute les masses.", "Les deux masses sont en kilogrammes : on ajoute les nombres.", `${a} + ${b} = ${a + b}.`, `Cela fait ${a + b} kg.`),
        cartes([{ label: x.replace(/^de |^d'/, ""), icon: "🧺", masse: `${a} kg` }, { label: y.replace(/^de |^d'/, ""), icon: "🧺", masse: `${b} kg` }]),
      ),
      () => {
        const animal = randomChoice([{ n: "le chiot", i: "🐕" }, { n: "le chaton", i: "🐈" }, { n: "le lapin", i: "🐇" }, { n: "le petit cochon", i: "🐖" }, { n: "l'agneau", i: "🐑" }]);
        const m1 = randomInt(2, 8);
        const plus = randomInt(1, 4);
        return qcm(
          `La vétérinaire pèse ${animal.n} : ${m1} kg. Un mois plus tard, il a pris ${plus} kg. ${randomChoice(["Combien pèse-t-il maintenant ?", "Quelle est sa nouvelle masse ?"])}`,
          `${m1 + plus} kg`,
          [`${m1 + plus + 1} kg`, `${m1 - plus > 0 ? m1 - plus : m1 + plus + 2} kg`, `${m1} kg`, `${m1 + plus} g`],
          exp("Prendre du poids, c'est ajouter de la masse.", "On ajoute ce qu'il a pris à sa masse de départ.", `${m1} + ${plus} = ${m1 + plus}.`, `Il pèse ${m1 + plus} kg.`),
          cartes([{ label: animal.n.replace(/^le |^l'/, ""), icon: animal.i, masse: `${m1} kg` }]),
        );
      },
    ]);
  }, ["probleme", "canvas"]),
  gab("ce1_masse_probleme_tpl_1", "ce1_masse_probleme", 3, "Tout en grammes : ajoute ou enlève, selon l'histoire.", () =>
    tirer([
      () => {
        const p = enfant();
        const [x, y] = shuffle(MARCHE).slice(0, 2);
        const a = randomInt(2, 6) * 50;
        const b = randomInt(2, 7) * 50;
        return qcm(
          `${p.nom} pèse ${a} g ${x} et ${b} g ${y}. ${randomChoice(["Combien de grammes en tout ?", "Quelle masse cela fait-il ensemble ?"])}`,
          `${a + b} g`,
          [`${a + b + 50} g`, `${a + b - 50} g`, `${Math.abs(a - b) || 50} g`, `${a + b} kg`],
          exp("Pour trouver la masse totale, on ajoute les masses.", "Les deux masses sont en grammes : on ajoute.", `${a} + ${b} = ${a + b}.`, `Cela fait ${a + b} g.`),
        );
      },
      () => {
        const p = enfant();
        const quoi = randomChoice(PAQUETS.slice(0, 6));
        const utilise = randomChoice([100, 200, 250, 300, 400, 450, 500, 600, 750]);
        const pour = randomChoice(["un gâteau", "des crêpes", "un pique-nique", "la fête de l'école", "le repas de la cantine", "des cookies"]);
        return qcm(
          `Un paquet ${quoi} pèse 1 kg. ${p.nom} en utilise ${utilise} g pour ${pour}. ${randomChoice(["Combien reste-t-il de grammes ?", "Quelle masse reste-t-il dans le paquet ?"])}`,
          `${1000 - utilise} g`,
          [`${utilise} g`, `${1000 - utilise + 100} g`, `${Math.abs(100 - utilise) || 900} g`, `${1000 - utilise - 50} g`].filter((x) => x !== `${1000 - utilise} g` && !x.startsWith("0") && !x.startsWith("-")),
          exp("1 kg = 1 000 g.", "On enlève ce qui a été utilisé : on cherche ce qui manque pour faire 1 000.", `${utilise} + ${1000 - utilise} = 1 000.`, `Il reste ${1000 - utilise} g.`),
        );
      },
      () => {
        const p1 = randomChoice([200, 300, 400, 500]);
        const p2 = randomChoice([50, 100, 150, 200]);
        const quoi = randomChoice([{ n: "le melon", i: "🍈" }, { n: "le chou", i: "🥬" }, { n: "l'ananas", i: "🍍" }, { n: "la citrouille", i: "🎃" }, { n: "le pain", i: "🍞" }]);
        return qcm(
          `La balance est en équilibre. D'un côté, ${quoi.n}. De l'autre, deux poids : ${p1} g et ${p2} g. ${randomChoice([`Combien pèse ${quoi.n} ?`, "Quelle est sa masse ?"])}`,
          `${p1 + p2} g`,
          [`${p1} g`, `${p1 + p2 + 100} g`, `${p1 - p2} g`, `${p1 + p2} kg`],
          exp("Quand la balance est en équilibre, les deux côtés pèsent pareil.", "On ajoute les poids.", `${p1} + ${p2} = ${p1 + p2}.`, `${maj(quoi.n)} pèse ${p1 + p2} g.`),
          masseCanvas({
            variant: "balance",
            gauche: { label: quoi.n.replace(/^(le|la) |^l'/, ""), icon: quoi.i, grammes: p1 + p2 },
            droite: { label: "poids", icon: "⚖️", masse: `${p1} g + ${p2} g`, grammes: p1 + p2 },
            display: { showMasses: true, showLabels: true, showComparison: false },
          }),
        );
      },
    ]), ["probleme", "canvas"]),
  gab("ce1_masse_probleme_tpl_2", "ce1_masse_probleme", 4, "Deux étapes : trouve d'abord une masse, puis l'autre.", () =>
    tirer([
      () => {
        const vide = randomChoice([100, 150, 200, 250, 300]);
        const dedans = randomChoice([200, 300, 400, 500, 600]);
        const p = enfant();
        const cont = randomChoice([{ q: "le panier", f: false }, { q: "le seau", f: false }, { q: "le sac", f: false }, { q: "la boîte", f: true }, { q: "la caisse", f: true }]);
        const fruit = randomChoice(MARCHE);
        return qcm(
          `${maj(cont.q)} vide pèse ${vide} g. ${p.nom} y met ${dedans} g ${fruit}. ${randomChoice([`Combien pèse ${cont.q} ${cont.f ? "pleine" : "plein"} ?`, "Quelle est la masse totale ?"])}`,
          `${vide + dedans} g`,
          [`${dedans} g`, `${vide + dedans + 100} g`, `${Math.abs(dedans - vide) || vide + dedans + 50} g`, `${vide + dedans - 50} g`],
          exp("La masse du contenant plein, c'est sa masse vide plus ce qu'on met dedans.", "On ajoute les deux masses.", `${vide} + ${dedans} = ${vide + dedans}.`, `Cela fait ${vide + dedans} g.`),
        );
      },
      () => {
        const n = randomInt(2, 4);
        const sachet = randomChoice([100, 150, 200, 250]);
        const p = enfant();
        const quoi = randomChoice(["de graines pour Pic", "de bonbons", "de billes", "de perles", "de noisettes"]);
        const total = n * sachet;
        return qcm(
          `${p.nom} a ${n} sachets ${quoi}. Chaque sachet pèse ${sachet} g. ${randomChoice(["Combien pèsent-ils en tout ?", "Quelle est la masse totale ?"])}`,
          `${total} g`,
          [`${sachet + n} g`, `${total + sachet} g`, `${total - sachet} g`, `${sachet} g`],
          exp("Plusieurs sachets de même masse : on ajoute la même masse plusieurs fois.", `On ajoute ${sachet} g ${n} fois.`, `${Array(n).fill(sachet).join(" + ")} = ${total}.`, `Cela fait ${total} g.`),
          cartes(Array.from({ length: n }, () => ({ label: "sachet", icon: "🛍️", masse: `${sachet} g` }))),
        );
      },
    ]), ["probleme", "canvas"]),

  /* ---------- DÉFIS ---------- */
  gab("ce1_masse_defi_tpl_2", "ce1_masse_defi", 4, "Pour faire 1 kg, il faut 1 000 g : cherche ce qui manque.", () => {
    const deja = randomChoice([150, 250, 350, 450, 550, 650, 750, 850, 950, 300, 700]);
    const p = enfant();
    const quoi = randomChoice(MARCHE);
    return qcm(
      `${randomChoice([`${p.nom} a déjà ${deja} g ${quoi} dans son sac.`, `Le chef cuisinier a ${deja} g ${quoi}.`, `Sur le plateau, il y a ${deja} g ${quoi}.`])} ${randomChoice(["Combien de grammes faut-il ajouter pour avoir 1 kg ?", "Combien manque-t-il pour arriver à 1 kg ?"])}`,
      `${1000 - deja} g`,
      [`${1000 - deja + 100} g`, `${1000 - deja - 100} g`, `${deja} g`, `${(100 - (deja % 100)) % 100 || 100} g`].filter((x, i, t) => t.indexOf(x) === i && x !== `${1000 - deja} g` && !x.startsWith("0") && !x.startsWith("-")),
      exp("1 kg = 1 000 g.", "On avance de centaine en centaine jusqu'à 1 000.", `${deja} + ${1000 - deja} = 1 000.`, `Il faut ajouter ${1000 - deja} g.`),
      { kind: "schema_barre", total: "1 kg", parts: [{ label: "déjà", value: `${deja} g` }, { label: "manque", unknown: true }] },
    );
  }, ["defi", "canvas"]),
  gab("ce1_masse_defi_tpl_1", "ce1_masse_defi", 5, "Remplace 1 kg par 1 000 g, puis réfléchis.", () =>
    tirer([
      () => {
        const paquet = randomChoice([100, 200, 250, 500]);
        const n = 1000 / paquet;
        const quoi = randomChoice(PAQUETS);
        const p = enfant();
        return qcm(
          `${p.nom} a ${n} paquets ${quoi} de ${paquet} g. ${randomChoice(["Est-ce que cela fait 1 kg ?", `A-t-${p.il} 1 kg en tout ?`])}`,
          "oui, tout juste",
          ["oui, tout juste", "non, il manque des grammes", "non, c'est plus que 1 kg"],
          exp("1 kg = 1 000 g.", "On ajoute la masse des paquets.", `${Array(n).fill(paquet).join(" + ")} = 1 000.`, "Oui : cela fait tout juste 1 kg."),
        );
      },
      () => {
        const [p, q] = deuxEnfants();
        const quoi = randomChoice(["le même sac", "la même citrouille", "le même paquet", "le même cartable", "la même valise"]);
        return qcm(
          `${p.nom} et ${q.nom} pèsent ${quoi}. ${p.nom} écrit 1 kg, ${q.nom} écrit 1 000 g. ${randomChoice(["Qui a raison ?", "Qui a écrit juste ?"])}`,
          "les deux : c'est la même masse",
          [`${p.nom} seulement`, `${q.nom} seulement`, "les deux : c'est la même masse", "aucun des deux"],
          exp("1 kg = 1 000 g : ce sont deux façons d'écrire la même masse.", "On écrit les deux masses dans la même unité.", "1 kg = 1 000 g.", "Les deux ont raison."),
        );
      },
      () => {
        const a = randomChoice([300, 400, 450, 600]);
        const b = randomChoice([200, 350, 500]);
        const total = a + b;
        const p = enfant();
        const ok = total >= 1000;
        return qcm(
          `${p.nom} veut 1 kg de fruits. ${maj(p.il)} a ${a} g de pommes et ${b} g de poires. ${randomChoice([`A-t-${p.il} assez ?`, "Cela fait-il 1 kg ?"])}`,
          total === 1000 ? "oui, tout juste" : ok ? "oui, et même un peu plus" : `non, il manque ${1000 - total} g`,
          ["oui, tout juste", "oui, et même un peu plus", `non, il manque ${Math.abs(1000 - total) || 100} g`, `non, il manque ${Math.abs(1000 - total) + 100} g`],
          exp("1 kg = 1 000 g.", "On ajoute les deux masses et on compare à 1 000 g.", `${a} + ${b} = ${total}${total === 1000 ? " = 1 000" : total > 1000 ? " > 1 000" : ` < 1 000 ; 1 000 − ${total} = ${1000 - total}`}.`, total >= 1000 ? "Oui, il en a assez." : `Non, il manque ${1000 - total} g.`),
        );
      },
    ]), ["defi"]),
];

export const masseBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_MASSE_COMPARER — comparer des masses
     LE piège : comparer les nombres au lieu des masses. Et
     celui des plumes, qui n'est pas un piège de calcul mais de
     bon sens.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_comparer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus lourd : 1 kg ou 900 g ?",
    format: "qcm",
    choices: ["1 kg", "900 g", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1 kg"],
    comparator: "mcq_exact",
    hint: "Écris les deux masses dans la même unité avant de comparer.",
    explanation: exp(
      "On ne compare deux masses qu'après les avoir écrites dans la même unité.",
      "On transforme le kilogramme en grammes, puis on compare les nombres.",
      "1 kg = 1 000 g. Et 1 000 g, c'est plus lourd que 900 g. Il manque même 100 g pour atteindre le kilo.",
      "1 kg est plus lourd que 900 g.",
    ),
    // ⛔ Pas de canvas balance : le fléau pencherait tout seul et l'élève
    // lirait la réponse sans jamais convertir.
    tags: ["ce1", "masse", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_comparer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus lourd : 1 kg de plumes ou 1 kg de cailloux ?",
    format: "qcm",
    choices: [
      "les deux pèsent pareil",
      "les cailloux",
      "les plumes",
      "on ne peut pas peser des plumes",
    ],
    expected: ["les deux pèsent pareil"],
    comparator: "mcq_exact",
    hint: "Relis bien : quelle masse est écrite devant chaque mot ?",
    explanation: exp(
      "La masse, c'est ce que la balance affiche. Elle ne dépend pas de la place que prend l'objet.",
      "On lit le nombre et l'unité, sans se laisser distraire par le nom de l'objet.",
      "Les deux font 1 kg, donc 1 000 g chacun. Il faut juste un très gros sac pour les plumes et un tout petit pour les cailloux : c'est la PLACE qui change, pas la masse.",
      "Les deux pèsent exactement pareil.",
    ),
    tags: ["ce1", "masse", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_comparer_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Sur une balance à deux plateaux, le plateau de gauche descend. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "ce qui est à gauche est plus lourd",
      "ce qui est à droite est plus lourd",
      "les deux pèsent pareil",
      "la balance est cassée",
    ],
    expected: ["ce qui est à gauche est plus lourd"],
    comparator: "mcq_exact",
    hint: "Pense à une balançoire : qui descend, le plus lourd ou le plus léger ?",
    explanation: exp(
      "Sur une balance à deux plateaux, le plateau le plus lourd descend.",
      "On regarde quel côté est le plus bas.",
      "C'est comme une balançoire dans la cour : celui qui pèse le plus descend et l'autre monte. Ici, c'est le plateau de gauche qui descend.",
      "Ce qui est à gauche est plus lourd.",
    ),
    tags: ["ce1", "masse", "comparer", "definition", "qcm"],
  },

  /* =========================================================
     CE1_MASSE_KG_G — le gramme, le kilogramme, et 1 kg = 1000 g
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_kg_g_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_kg_g",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on l'abréviation de « kilogramme » ?",
    format: "qcm",
    choices: ["kg", "kgr", "kilo", "k"],
    expected: ["kg"],
    comparator: "mcq_exact",
    hint: "Le k vient de « kilo », le g vient de « gramme ».",
    explanation: exp(
      "Chaque unité de masse a une abréviation, écrite sans point et sans s.",
      "On garde la première lettre de « kilo », puis celle de « gramme ».",
      "« kilo » donne le k, « gramme » donne le g : cela fait kg. On écrit 5 kg, jamais 5 kgs.",
      "L'abréviation est kg.",
    ),
    tags: ["ce1", "masse", "kg_g", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_kg_g_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_kg_g",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 kg = 100 g ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 kg = 1 000 g",
      "oui",
      "non, 1 kg = 10 g",
      "non, 1 kg = 500 g",
    ],
    expected: ["non, 1 kg = 1 000 g"],
    comparator: "mcq_exact",
    hint: "100 g, c'est une tablette de chocolat. Un kilo, c'est bien plus.",
    explanation: exp(
      "1 kilogramme vaut 1 000 grammes.",
      "On vérifie avec un objet connu : une tablette de chocolat pèse 100 g.",
      "Il faudrait dix tablettes de chocolat pour faire 1 kg. L'élève a confondu avec « cent » : ici, c'est « kilo », donc mille.",
      "Non : 1 kg = 1 000 g.",
    ),
    tags: ["ce1", "masse", "kg_g", "piege", "qcm"],
  },

  /* =========================================================
     CE1_MASSE_SOUPESER — trouver le plus lourd sans calculer
     Le premier attendu du programme, et il ne demande aucun
     nombre : on soupèse, ou on regarde la balance.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_soupeser_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_soupeser",
    difficulty: 1,
    theme: "neutral",
    text: "Tu tiens une gomme dans une main et un dictionnaire dans l'autre. Comment sais-tu lequel est le plus lourd ?",
    format: "qcm",
    choices: [
      "je soupèse les deux et je sens lequel tire le plus sur ma main",
      "je regarde lequel est le plus grand",
      "je regarde lequel a la plus belle couleur",
      "je compte les pages",
    ],
    expected: ["je soupèse les deux et je sens lequel tire le plus sur ma main"],
    comparator: "mcq_exact",
    hint: "Soupeser, c'est peser avec sa main.",
    explanation: exp(
      "Soupeser, c'est comparer deux masses avec ses mains, sans balance.",
      "On prend un objet dans chaque main et on sent lequel tire le plus vers le bas.",
      "Le dictionnaire tire beaucoup plus que la gomme : il est plus lourd. La taille ne suffit pas — un gros ballon est très léger.",
      "On soupèse les deux objets.",
    ),
    tags: ["ce1", "masse", "soupeser", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_soupeser_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_soupeser",
    difficulty: 3,
    theme: "neutral",
    text: "Un gros ballon de plage et une petite bille en fer. Lequel est le plus lourd ?",
    format: "qcm",
    choices: [
      "la bille en fer",
      "le ballon de plage",
      "les deux pèsent pareil",
      "le plus gros est toujours le plus lourd",
    ],
    expected: ["la bille en fer"],
    comparator: "mcq_exact",
    hint: "Le ballon est rempli d'air. L'air ne pèse presque rien.",
    explanation: exp(
      "La masse ne dépend pas de la taille : un objet peut être gros et très léger.",
      "On soupèse au lieu de regarder.",
      "Le ballon est rempli d'air, qui ne pèse presque rien. La bille est pleine de fer, une matière très lourde. La petite bille gagne.",
      "La bille en fer est plus lourde.",
    ),
    tags: ["ce1", "masse", "soupeser", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_soupeser_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_soupeser",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une balance à deux plateaux, les deux plateaux restent au même niveau. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "les deux objets ont la même masse",
      "celui de gauche est plus lourd",
      "celui de droite est plus lourd",
      "la balance ne marche pas",
    ],
    expected: ["les deux objets ont la même masse"],
    comparator: "mcq_exact",
    hint: "Sur une balançoire, quand personne ne descend, c'est que les deux pèsent pareil.",
    explanation: exp(
      "Une balance à deux plateaux compare deux masses : le plus lourd descend.",
      "On regarde si un plateau est plus bas que l'autre.",
      "Ici, aucun ne descend : aucun des deux n'est plus lourd. On dit que la balance est en équilibre.",
      "Les deux objets ont la même masse.",
    ),
    tags: ["ce1", "masse", "soupeser", "definition", "qcm"],
  },

  /* =========================================================
     CE1_MASSE_RELATION_KG_G — 1 kg = 1 000 g
     Le programme en fait un attendu à lui tout seul. Tout le
     reste de la notion s'appuie dessus.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_relation_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_relation_kg_g",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de grammes dans 1 kilogramme ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "« Kilo » veut dire mille.",
    explanation: exp(
      "1 kilogramme vaut 1 000 grammes.",
      "On lit le début du mot : « kilo » annonce mille.",
      "Un kilogramme, c'est mille grammes. C'est le même « kilo » que dans kilomètre, qui vaut mille mètres.",
      "1 kg = 1 000 g.",
    ),
    tags: ["ce1", "masse", "relation", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_relation_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_relation_kg_g",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de paquets de 500 g faut-il pour faire 1 kg ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "500 g, c'est la moitié du kilo.",
    explanation: exp(
      "1 kilogramme vaut 1 000 grammes.",
      "On cherche combien de fois 500 tient dans 1 000.",
      "500 + 500 = 1 000. Deux paquets de 500 g font donc 1 kg : chaque paquet est une moitié de kilo.",
      "Il faut 2 paquets.",
    ),
    tags: ["ce1", "masse", "relation", "remarquable"],
  },

  /* =========================================================
     CE1_MASSE_ESTIMER — les masses de référence
     Estimer n'est pas deviner : c'est comparer à une masse
     qu'on a déjà soulevée.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_estimer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Environ combien pèse une brique de lait pleine ?",
    format: "qcm",
    choices: ["1 kg", "1 g", "10 kg", "100 kg"],
    expected: ["1 kg"],
    comparator: "mcq_exact",
    hint: "On la soulève d'une seule main, sans effort.",
    explanation: exp(
      "Une masse de référence, c'est une masse qu'on connaît par cœur et qui aide à juger les autres.",
      "On prend un objet qu'on soulève tous les jours.",
      "Une brique de lait pleine pèse 1 kg, c'est-à-dire 1 000 g. C'est la référence la plus commode : elle tient dans une main.",
      "Elle pèse environ 1 kg.",
    ),
    tags: ["ce1", "masse", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_estimer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « ma trousse pèse 3 kg ». Est-ce possible ?",
    format: "qcm",
    choices: [
      "non, c'est bien trop lourd pour une trousse",
      "oui, c'est normal",
      "non, c'est bien trop léger",
      "on ne peut pas peser une trousse",
    ],
    expected: ["non, c'est bien trop lourd pour une trousse"],
    comparator: "mcq_exact",
    hint: "3 kg, c'est trois briques de lait. Tu les mettrais dans ta trousse ?",
    explanation: exp(
      "Une bonne référence permet de repérer tout de suite une estimation impossible.",
      "On compare la trousse à une masse connue : la brique de lait, qui fait 1 kg.",
      "3 kg, ce serait trois briques de lait dans la trousse. Une trousse pleine pèse plutôt 300 g, dix fois moins.",
      "Non, c'est bien trop lourd.",
    ),
    tags: ["ce1", "masse", "estimer", "piege", "qcm"],
  },

  /* =========================================================
     CE1_MASSE_PROBLEME — un problème simple de masses
     Une étape, deux au plus. On additionne ou on enlève, après
     avoir mis tout le monde dans la même unité.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_probleme_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Paul, maman achète 3 kg de letchis et 2 kg de mangues. Combien de kilogrammes porte-t-elle ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Les deux masses sont en kilogrammes : on peut additionner directement.",
    explanation: exp(
      "Pour trouver une masse totale, on additionne les masses.",
      "On vérifie d'abord que les deux sont écrites dans la même unité.",
      "Les deux sont en kilogrammes : 3 + 2 = 5.",
      "Elle porte 5 kg.",
    ),
    tags: ["ce1", "masse", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_probleme_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_probleme",
    difficulty: 4,
    theme: "neutral",
    // 10/11/2026 : « 300 g + 1 kg = 1 300 g » sortait du millier du CE1.
    text: "Un panier plein de pommes pèse 1 kg. Le panier vide pèse 300 g. Combien pèsent les pommes, en grammes ?",
    format: "short",
    expected: ["700"],
    comparator: "number_equal",
    hint: "Mets d'abord le kilo en grammes.",
    explanation: exp(
      "On ne calcule avec des masses que si elles sont écrites dans la même unité.",
      "On transforme le kilogramme en grammes, puis on enlève la masse du panier.",
      "1 kg = 1 000 g. Puis 300 + 700 = 1 000.",
      "Les pommes pèsent 700 g.",
    ),
    tags: ["ce1", "masse", "probleme", "piege"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_probleme_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un sac de farine pèse 1 kg. On en utilise 400 g pour un gâteau. Combien reste-t-il de grammes de farine ?",
    format: "short",
    expected: ["600"],
    comparator: "number_equal",
    hint: "1 kg, c'est 1 000 g. On enlève ce qui a été utilisé.",
    explanation: exp(
      "Chercher un reste, c'est enlever au total ce qui a été pris.",
      "On écrit d'abord le sac en grammes, puis on soustrait.",
      "1 kg = 1 000 g. Puis 1 000 - 400 = 600.",
      "Il reste 600 g de farine.",
    ),
    tags: ["ce1", "masse", "probleme"],
  },

  /* =========================================================
     CE1_MASSE_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : compléter
     jusqu'au kilo, et fabriquer une masse avec des paquets.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_masse_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un plateau, il y a 750 g de fruits. Combien de grammes faut-il ajouter pour atteindre 1 kg ?",
    format: "short",
    expected: ["250"],
    comparator: "number_equal",
    hint: "1 kg, c'est 1 000 g. Compte ce qui manque pour aller de 750 à 1 000.",
    explanation: exp(
      "Compléter jusqu'à une masse, c'est chercher ce qui manque.",
      "On écrit l'objectif dans la même unité, puis on cherche l'écart.",
      "1 kg = 1 000 g. De 750 à 1 000, il manque 250 : 750 + 250 = 1 000.",
      "Il faut ajouter 250 g.",
    ),
    tags: ["ce1", "masse", "defi"],
  },
  {
    kind: "fixed",
    id: "ce1_masse_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "masse",
    microId: "ce1_masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux enfants pèsent le même sac. Léa écrit 1 kg, Kevin écrit 1 000 g. Qui a raison ?",
    format: "qcm",
    choices: [
      "les deux : c'est la même masse",
      "Léa seulement",
      "Kevin seulement",
      "aucun des deux",
    ],
    expected: ["les deux : c'est la même masse"],
    comparator: "mcq_exact",
    hint: "Transforme le kilogramme en grammes.",
    explanation: exp(
      "Une même masse peut s'écrire de deux façons, avec deux unités différentes.",
      "On ramène les deux écritures à la même unité, ici le gramme.",
      "1 kg = 1 000 g. Léa et Kevin ont écrit la même masse, avec des unités différentes.",
      "Les deux ont raison.",
    ),
    tags: ["ce1", "masse", "defi", "piege", "qcm"],
  },
  ...GABARITS,
];
