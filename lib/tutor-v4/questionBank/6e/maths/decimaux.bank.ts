import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// ═══════════════════════════════════════════════════════════════════════════
// LES GÉNÉRATEURS VARIÉS (06/10/2026)
//
// ⛔ Mesuré le 05/10 : 2 à 10 squelettes par micro. Les gabarits changeaient les
// NOMBRES mais gardaient la même PHRASE — l'élève reconnaissait la question.
// Chaque gabarit compose désormais une SITUATION × une TOURNURE × un PRÉNOM, et
// les micros de calcul pur varient la FORME (consigne, place de l'inconnue,
// nombre de termes). Chaque gabarit a son CORRECTEUR, qui relit le texte et
// refait le calcul : correcteurs/decimaux.ts.
//
// ⛔ Décision de Frédéric (05/10) : × 10, × 100 se justifient par la VALEUR DES
// CHIFFRES (chaque chiffre prend une valeur dix fois plus grande), PUIS le
// raccourci « la virgule se déplace ». Jamais « ajouter un zéro ».
// ═══════════════════════════════════════════════════════════════════════════

type Prenom = { nom: string; f: boolean };

const PRENOMS: Prenom[] = [
  { nom: "Inès", f: true },
  { nom: "Lucas", f: false },
  { nom: "Aya", f: true },
  { nom: "Noah", f: false },
  { nom: "Chloé", f: true },
  { nom: "Mamadou", f: false },
  { nom: "Léa", f: true },
  { nom: "Yanis", f: false },
  { nom: "Sofia", f: true },
  { nom: "Ethan", f: false },
  { nom: "Fatou", f: true },
  { nom: "Karim", f: false },
  { nom: "Maëlys", f: true },
  { nom: "Liam", f: false },
  { nom: "Jade", f: true },
  { nom: "Rayan", f: false },
  { nom: "Amina", f: true },
  { nom: "Tom", f: false },
  { nom: "Zoé", f: true },
  { nom: "Enzo", f: false },
  { nom: "Lina", f: true },
  { nom: "Nathan", f: false },
  { nom: "Mei", f: true },
  { nom: "Ilyes", f: false },
  { nom: "Manon", f: true },
  { nom: "Théo", f: false },
  { nom: "Anaïs", f: true },
  { nom: "Sacha", f: false },
  { nom: "Camille", f: true },
  { nom: "Kenji", f: false },
  { nom: "Nour", f: true },
  { nom: "Diego", f: false },
];

function choix<T>(t: readonly T[]): T {
  return t[Math.floor(Math.random() * t.length)];
}

function prenom(): Prenom {
  return choix(PRENOMS);
}

/** Deux prénoms différents. */
function deuxPrenoms(): [Prenom, Prenom] {
  const a = prenom();
  let b = prenom();
  while (b.nom === a.nom) b = prenom();
  return [a, b];
}

const voyelle = (p: Prenom) => /^[aeiouyàâäéèêëîïôöûü]/i.test(p.nom);
/** « d'Inès », « de Lucas ». */
const de = (p: Prenom) => (voyelle(p) ? `d'${p.nom}` : `de ${p.nom}`);
/** « qu'Inès », « que Lucas ». */
const que = (p: Prenom) => (voyelle(p) ? `qu'${p.nom}` : `que ${p.nom}`);
const il = (p: Prenom) => (p.f ? "elle" : "il");
const Il = (p: Prenom) => (p.f ? "Elle" : "Il");

/** Arrondi d'affichage : efface les erreurs de calcul en virgule flottante. */
function rond(n: number, d = 6) {
  return Number(n.toFixed(d));
}

/** Écriture française : virgule décimale, espace des milliers dès 1 000. */
function virg(n: number, decimales?: number) {
  const s = decimales === undefined ? String(rond(n)) : n.toFixed(decimales);
  const [e, d] = s.split(".");
  const entier = e.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return d ? `${entier},${d}` : entier;
}

/** Un prix : toujours deux chiffres après la virgule (« 3,50 € »). */
function prix(n: number) {
  return virg(n, 2);
}

/** Un décimal tiré entre `min` et `max`, avec EXACTEMENT `dec` chiffres après la virgule. */
function tirerDecimal(min: number, max: number, dec: number) {
  const f = Math.pow(10, dec);
  for (;;) {
    const k = entierAleatoire(Math.ceil(min * f), Math.floor(max * f));
    if (dec === 0 || k % 10 !== 0) return rond(k / f);
  }
}

const LETTRES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
/** « une unité », « trois dixièmes » — 1 à 9. */
function enLettres(n: number, rang: "unité" | "dixième" | "centième" | "millième") {
  const mot = n === 1 ? (rang === "unité" ? "une" : "un") : LETTRES[n];
  return `${mot} ${rang}${n > 1 ? "s" : ""}`;
}

/** Une question courte à réponse numérique (avec l'unité si l'énoncé en impose une). */
function courte(text: string, valeur: number, explication: string, unite = "", dec?: number): TutorGeneratedQuestionV4 {
  const v = virg(valeur, dec);
  return {
    text,
    format: "short",
    expected: unite ? [`${v} ${unite}`, v] : [v],
    comparator: "number_equal",
    explanation: explDecimal(explication),
  };
}

/** Un QCM : la bonne réponse et ses leurres, mélangés. */
function qcm(text: string, bonne: string, leurres: string[], explication: string): TutorGeneratedQuestionV4 {
  const autres = [...new Set(leurres)].filter((x) => x !== bonne).slice(0, 3);
  return {
    text,
    format: "qcm",
    choices: shuffle([bonne, ...autres]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explDecimal(explication),
  };
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function explDecimal(calcul: string) {
  return (
    "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
    "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

function entierAleatoire(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Le ZOOM entre deux voisins — la figure des micros « arrondir » et « encadrer ».
 *
 * ⚠️ `DroiteGradueeCanvas` enferme son SVG dans un `max-w-[320px]` : au-delà de
 * cinq ou six graduations, les étiquettes se chevauchent quelle que soit la
 * largeur du viewBox. On grade donc TRÈS peu — souvent les deux voisins et leur
 * milieu, qui est exactement ce qui décide de l'arrondi.
 */
function droiteZoom(
  bas: number,
  haut: number,
  pas: number,
  points: { value: number; label?: string }[]
) {
  return {
    kind: "number_line" as const,
    min: bas,
    max: haut,
    step: pas,
    points,
    display: {
      showTicks: true,
      showValues: true,
      showPoints: points.length > 0,
      showPointLabels: points.length > 0,
      showZero: true,
    },
    size: { width: 340, height: 120 },
  };
}

// ─── DECIMAL_LIRE_ECRIRE ─────────────────────────────────────────────────────
// Fraction décimale → nombre à virgule ; nombre dit en mots → en chiffres ;
// lire un nombre à virgule. La fraction décimale est ici l'OBJET d'étude.

const PARTS_DIXIEMES = [
  (p: Prenom, f: string) => `${p.nom} a mangé ${f} de la pizza.`,
  (p: Prenom, f: string) => `${p.nom} a peint ${f} de la clôture du jardin.`,
  (p: Prenom, f: string) => `La gourde ${de(p)} est remplie à ${f}.`,
  (p: Prenom, f: string) => `${p.nom} a lu ${f} de son livre.`,
  (p: Prenom, f: string) => `${p.nom} a parcouru ${f} du trajet à vélo.`,
  (p: Prenom, f: string) => `${p.nom} a rangé ${f} de ses cartes de foot.`,
  (p: Prenom, f: string) => `Le potager ${de(p)} est semé sur ${f} de sa surface.`,
  (p: Prenom, f: string) => `${p.nom} a téléchargé ${f} de son jeu.`,
  (p: Prenom, f: string) => `${p.nom} a construit ${f} de sa maquette de bateau.`,
  (p: Prenom, f: string) => `Le chien ${de(p)} a mangé ${f} de sa gamelle.`,
];

const MESURES_MOTS = [
  { u: "m", mot: "mètres", debut: (p: Prenom) => `Le saut ${de(p)} mesure` },
  { u: "kg", mot: "kilogrammes", debut: (p: Prenom) => `Le colis ${de(p)} pèse` },
  { u: "L", mot: "litres", debut: (p: Prenom) => `L'aquarium ${de(p)} contient` },
  { u: "km", mot: "kilomètres", debut: (p: Prenom) => `La balade à vélo ${de(p)} fait` },
  { u: "s", mot: "secondes", debut: (p: Prenom) => `Le temps ${de(p)} à la course est de` },
  { u: "m", mot: "mètres", debut: (p: Prenom) => `La corde à sauter ${de(p)} mesure` },
  { u: "kg", mot: "kilogrammes", debut: (p: Prenom) => `Le chat ${de(p)} pèse` },
  { u: "cm", mot: "centimètres", debut: (p: Prenom) => `La plante ${de(p)} mesure` },
];

function genLireEcrire(etoile: 1 | 2, enQcm = false): TutorGeneratedQuestionV4 {
  const p = prenom();
  if (enQcm) {
    const forme = choix(["fraction", "fraction", "lire"]);
    if (forme === "fraction") {
      const den = choix([10, 100]);
      const n = den === 10 ? entierAleatoire(1, 99) : entierAleatoire(1, 99);
      if (n % 10 === 0) return genLireEcrire(etoile, true);
      const f = `${n}/${den}`;
      const bonne = virg(n / den);
      const leurres = den === 10 ? [virg(n / 100), virg(n), `${n},10`] : [virg(n / 10), virg(n / 1000), `${n},100`];
      const intro = choix([
        `Quel nombre à virgule est égal à ${f} ?`,
        `${p.nom} hésite entre plusieurs écritures de ${f}. Laquelle est juste ?`,
        `Le professeur ${de(p)} écrit ${f} au tableau. Quel nombre à virgule ${p.nom} doit-${il(p)} écrire ?`,
        `Choisis l'écriture à virgule de ${f}.`,
        `${f} est égal à :`,
        `${p.nom} doit écrire ${f} avec une virgule. Que doit-${il(p)} écrire ?`,
      ]);
      return qcm(
        intro,
        bonne,
        leurres,
        `${f} signifie ${n} ${den === 10 ? "dixièmes" : "centièmes"}. ${
          den === 100
            ? `Le dernier chiffre de ${n} se place au rang des centièmes, le deuxième chiffre après la virgule`
            : `Le dernier chiffre de ${n} se place au rang des dixièmes, juste après la virgule`
        } : ${f} = ${bonne}. Écrire « ${n},${den} » est le piège : la virgule ne sépare pas le numérateur du dénominateur.`,
      );
    }
    // Lire : a,0c ou a,b — on choisit la bonne lecture parmi quatre.
    const a = entierAleatoire(2, 9);
    const c = entierAleatoire(1, 9);
    const avecZero = Math.random() < 0.6;
    const nombre = avecZero ? rond(a + c / 100) : rond(a + c / 10);
    const bonne = `${enLettres(a, "unité")} et ${enLettres(c, avecZero ? "centième" : "dixième")}`;
    const leurres = [
      `${enLettres(a, "unité")} et ${enLettres(c, avecZero ? "dixième" : "centième")}`,
      `${enLettres(c, "unité")} et ${enLettres(a, avecZero ? "centième" : "dixième")}`,
      `${enLettres(a, "unité")} et ${enLettres(c, "millième")}`,
    ];
    const intro = choix([
      `Comment se lit le nombre ${virg(nombre)} ?`,
      `${p.nom} lit le nombre ${virg(nombre)} à voix haute. Que dit-${il(p)} ?`,
      `Quelle phrase décrit le nombre ${virg(nombre)} ?`,
      `Le nombre ${virg(nombre)} est formé de :`,
    ]);
    return qcm(
      intro,
      bonne,
      leurres,
      `Dans ${virg(nombre)}, le chiffre ${a} est au rang des unités. ${
        avecZero
          ? `Juste après la virgule, le 0 occupe le rang des dixièmes : il n'y a aucun dixième. Le ${c} est au deuxième rang après la virgule, celui des centièmes`
          : `Le ${c} est juste après la virgule, au rang des dixièmes`
      }. On lit : ${bonne}.`,
    );
  }

  const forme = choix(etoile === 1 ? ["fraction", "lettres", "situation"] : ["fraction", "lettres", "decomposition", "mesure"]);

  if (forme === "fraction") {
    let n: number, den: number;
    if (etoile === 1) {
      den = 10;
      n = entierAleatoire(1, 9);
    } else {
      den = choix([10, 100, 100]);
      n = den === 10 ? entierAleatoire(11, 99) : choix([entierAleatoire(1, 99), entierAleatoire(101, 999)]);
      if (n % 10 === 0) n += 1;
    }
    const f = `${n}/${den}`;
    const v = rond(n / den);
    const text = choix([
      `Écris ${f} avec une virgule.`,
      `Quelle est l'écriture décimale de ${f} ?`,
      `Complète : ${f} = …`,
      `Donne ${f} sous la forme d'un nombre à virgule.`,
      `${p.nom} lit ${f} au tableau. Écris ce nombre avec une virgule.`,
      `Aide ${p.nom} : quelle est l'écriture décimale de ${f} ?`,
      `${p.nom} a trouvé ${f} dans son exercice. Comment l'écrire avec une virgule ?`,
      `Le professeur ${de(p)} lui demande d'écrire ${f} avec une virgule. Que doit-${il(p)} écrire ?`,
    ]);
    const rangNom = den === 10 ? "dixièmes" : "centièmes";
    const detail =
      n < den
        ? `${f} signifie ${n} ${rangNom}. Le dernier chiffre se place au rang des ${rangNom}${den === 100 ? ", le deuxième après la virgule" : ", juste après la virgule"}.`
        : `${f} signifie ${n} ${rangNom}. Or ${den} ${rangNom} font une unité : ${n} ${rangNom}, c'est ${Math.floor(n / den)} unité${Math.floor(n / den) > 1 ? "s" : ""} et ${n % den} ${rangNom}.`;
    return courte(text, v, `${detail} Donc ${f} = ${virg(v)}.`);
  }

  if (forme === "lettres") {
    const a = etoile === 1 ? choix([0, entierAleatoire(1, 9)]) : entierAleatoire(1, 9);
    const b = etoile === 1 ? entierAleatoire(1, 9) : choix([0, entierAleatoire(1, 9)]);
    const c = etoile === 1 ? 0 : entierAleatoire(1, 9);
    const morceaux = [
      a ? enLettres(a, "unité") : "",
      b ? enLettres(b, "dixième") : "",
      c ? enLettres(c, "centième") : "",
    ].filter(Boolean);
    const mots = morceaux.length === 1 ? morceaux[0] : morceaux.length === 2 ? morceaux.join(" et ") : `${morceaux[0]}, ${morceaux[1]} et ${morceaux[2]}`;
    const v = rond(a + b / 10 + c / 100);
    const text = choix([
      `Écris en chiffres : ${mots}.`,
      `Quel nombre s'écrit « ${mots} » ?`,
      `${p.nom} pense au nombre « ${mots} ». Écris-le avec une virgule.`,
      `Écris avec une virgule le nombre formé de ${mots}.`,
      `${p.nom} entend « ${mots} » à la radio. Écris ce nombre en chiffres.`,
      `Dans une dictée de nombres, ${p.nom} entend « ${mots} ». Que doit-${il(p)} écrire ?`,
    ]);
    return courte(
      text,
      v,
      `Chaque chiffre a sa place : les unités avant la virgule, puis les dixièmes, puis les centièmes.${
        c && !b ? " Il n'y a aucun dixième : on écrit 0 au rang des dixièmes pour que le chiffre des centièmes reste à sa place." : ""
      } On obtient ${virg(v)}.`,
    );
  }

  if (forme === "situation") {
    const n = entierAleatoire(1, 9);
    const f = `${n}/10`;
    const debut = choix(PARTS_DIXIEMES)(p, f);
    const text = `${debut} ${choix([
      "Écris cette fraction avec une virgule.",
      "Quel nombre à virgule correspond à cette fraction ?",
      `Écris ${f} sous forme décimale.`,
    ])}`;
    return courte(text, n / 10, `${f} signifie ${n} dixième${n > 1 ? "s" : ""}. Les dixièmes se placent juste après la virgule : ${f} = ${virg(n / 10)}.`);
  }

  if (forme === "decomposition") {
    const a = entierAleatoire(1, 19);
    const b = entierAleatoire(0, 9);
    const c = entierAleatoire(1, 9);
    const v = rond(a + b / 10 + c / 100);
    const somme = b ? `${a} + ${b}/10 + ${c}/100` : `${a} + ${c}/100`;
    const text = choix([
      `Écris avec une virgule : ${somme}.`,
      `Quel nombre est égal à ${somme} ?`,
      `Complète : ${somme} = …`,
      `${p.nom} a décomposé un nombre : ${somme}. Quel est ce nombre ?`,
      `Retrouve le nombre ${de(p)} : ${somme}.`,
    ]);
    return courte(
      text,
      v,
      `${a} unités, ${b} dixième${b > 1 ? "s" : ""} et ${c} centième${c > 1 ? "s" : ""}. On place chaque chiffre à son rang : ${virg(v)}.${b ? "" : " Le 0 au rang des dixièmes est indispensable."}`,
    );
  }

  // mesure : « 3 mètres et 45 centièmes de mètre »
  const m = choix(MESURES_MOTS);
  const a = entierAleatoire(1, 30);
  const rangMot = choix(["dixièmes", "centièmes"]);
  const k = rangMot === "dixièmes" ? entierAleatoire(2, 9) : choix([entierAleatoire(2, 9), entierAleatoire(11, 99)]);
  if (rangMot === "centièmes" && k % 10 === 0) return genLireEcrire(etoile);
  const v = rond(a + k / (rangMot === "dixièmes" ? 10 : 100));
  const text = `${m.debut(p)} ${a} ${m.mot} et ${k} ${rangMot}. ${choix([
    `Écris cette mesure en ${m.mot} avec une virgule.`,
    `Quelle est cette mesure, écrite avec une virgule ?`,
  ])}`;
  return courte(
    text,
    v,
    `${k} ${rangMot}${rangMot === "centièmes" && k < 10 ? ` : on écrit 0 au rang des dixièmes, puis ${k} au rang des centièmes` : ""}. La mesure s'écrit ${virg(v)} ${m.u}.`,
    m.u,
  );
}

// ─── DECIMAL_RANG ────────────────────────────────────────────────────────────

const NOMS_RANGS = ["dizaines", "unités", "dixièmes", "centièmes", "millièmes"] as const;
type NomRang = (typeof NOMS_RANGS)[number];

/** Le chiffre d'un nombre écrit « 12,764 » au rang demandé ; null s'il n'y en a pas. */
function chiffreAuRang(ecrit: string, rang: NomRang): string | null {
  const [e, d = ""] = ecrit.split(",");
  const k = NOMS_RANGS.indexOf(rang);
  if (k <= 1) return e[e.length - 1 - (1 - k)] ?? null;
  return d[k - 2] ?? null;
}

const MESURES_RANG = [
  { min: 8, max: 59, dec: 2, u: "s", debut: (p: Prenom, n: string) => `Le chronomètre ${de(p)} affiche ${n} s.` },
  { min: 1.2, max: 1.79, dec: 2, u: "m", debut: (p: Prenom, n: string) => `${p.nom} mesure ${n} m.` },
  { min: 2, max: 49, dec: 2, u: "€", debut: (p: Prenom, n: string) => `Les courses ${de(p)} coûtent ${n} €.` },
  { min: 5, max: 23, dec: 2, u: "kg", debut: (p: Prenom, n: string) => `La valise ${de(p)} pèse ${n} kg.` },
  { min: 2, max: 42, dec: 2, u: "km", debut: (p: Prenom, n: string) => `${p.nom} a couru ${n} km cette semaine.` },
  { min: 2, max: 6, dec: 2, u: "m", debut: (p: Prenom, n: string) => `Au saut en longueur, ${p.nom} a sauté ${n} m.` },
  { min: 0.3, max: 1.5, dec: 2, u: "L", debut: (p: Prenom, n: string) => `La gourde ${de(p)} contient ${n} L.` },
  { min: 10, max: 95, dec: 1, u: "cm", debut: (p: Prenom, n: string) => `Le tournesol ${de(p)} mesure ${n} cm.` },
  { min: 1, max: 3, dec: 2, u: "kg", debut: (p: Prenom, n: string) => `Sur la balance, le sac de farine ${de(p)} pèse ${n} kg.` },
  { min: 12, max: 98, dec: 1, u: "km", debut: (p: Prenom, n: string) => `Le compteur du vélo ${de(p)} indique ${n} km.` },
  { min: 1, max: 4, dec: 2, u: "kg", debut: (p: Prenom, n: string) => `Le poisson pêché par ${p.nom} pèse ${n} kg.` },
  { min: 20, max: 39, dec: 1, u: "°C", debut: (p: Prenom, n: string) => `L'eau de la piscine ${de(p)} est à ${n} °C.` },
  { min: 3, max: 9, dec: 2, u: "kg", debut: (p: Prenom, n: string) => `Le chat ${de(p)} pèse ${n} kg.` },
];

/** Un nombre de chiffres TOUS DIFFÉRENTS : la question « quel rang a le 6 ? » n'a qu'une réponse. */
function tirerSansDoublon(min: number, max: number, dec: number) {
  for (let k = 0; k < 200; k++) {
    const n = tirerDecimal(min, max, dec);
    const chiffres = virg(n, dec).replace(/[^\d]/g, "");
    if (new Set(chiffres).size === chiffres.length) return virg(n, dec);
  }
  return virg(tirerDecimal(min, max, dec), dec);
}

function genRang(etoile: 1 | 2 | 3): TutorGeneratedQuestionV4 {
  const p = prenom();
  const enSituation = Math.random() < 0.55;
  const m = choix(MESURES_RANG);
  const ecrit = enSituation
    ? tirerSansDoublon(m.min, m.max, m.dec)
    : tirerSansDoublon(etoile === 1 ? 1 : 10, etoile === 1 ? 9.99 : 99.999, etoile === 1 ? choix([1, 2]) : choix([2, 3]));
  const rangsPresents = NOMS_RANGS.filter((r) => chiffreAuRang(ecrit, r) !== null && (etoile > 1 || r !== "dizaines"));
  const rang = choix(etoile === 1 ? rangsPresents.filter((r) => r !== "millièmes") : rangsPresents);
  const chiffre = chiffreAuRang(ecrit, rang)!;
  const valeurDuChiffre = `${chiffre} ${rang.replace(/s$/, chiffre === "1" || chiffre === "0" ? "" : "s")}`;
  const expl = `Dans ${ecrit}, ${
    rang === "dizaines" || rang === "unités"
      ? `le chiffre des unités est juste avant la virgule, celui des dizaines juste avant lui`
      : `les dixièmes sont juste après la virgule, puis viennent les centièmes, puis les millièmes`
  }. Au rang des ${rang}, on lit ${chiffre} : ce chiffre vaut ${valeurDuChiffre}.`;

  if (etoile === 3 && Math.random() < 0.7) {
    // Le rang d'un chiffre donné (QCM).
    const choixRang = NOMS_RANGS.filter((r) => chiffreAuRang(ecrit, r) !== null && chiffreAuRang(ecrit, r) !== "0");
    const r = choix(choixRang);
    const d = chiffreAuRang(ecrit, r)!;
    const debut = enSituation ? `${m.debut(p, ecrit)} ` : "";
    const sujet = enSituation ? "ce nombre" : ecrit;
    if (Math.random() < 0.5) {
      const text =
        debut +
        choix([
          `À quel rang se trouve le chiffre ${d} dans ${sujet} ?`,
          `Quel est le rang du chiffre ${d} dans ${sujet} ?`,
          `Dans ${sujet}, le chiffre ${d} est au rang des…`,
        ]);
      const leurres = NOMS_RANGS.filter((x) => x !== r);
      return qcm(text, r, shuffle(leurres).slice(0, 3), `Dans ${ecrit}, le chiffre ${d} est au rang des ${r}. ${r === "dixièmes" ? "C'est le premier rang après la virgule." : r === "centièmes" ? "C'est le deuxième rang après la virgule." : r === "millièmes" ? "C'est le troisième rang après la virgule." : r === "unités" ? "C'est le chiffre juste avant la virgule." : "C'est le deuxième chiffre avant la virgule."}`);
    }
    const nomR = (x: NomRang) => `${d} ${d === "1" ? x.replace(/s$/, "") : x}`;
    const text =
      debut +
      choix([`Que vaut le chiffre ${d} dans ${sujet} ?`, `Dans ${sujet}, combien vaut le chiffre ${d} ?`, `Le chiffre ${d} de ${sujet} représente…`]);
    return qcm(
      text,
      nomR(r),
      shuffle(NOMS_RANGS.filter((x) => x !== r)).slice(0, 3).map(nomR),
      `Dans ${ecrit}, le chiffre ${d} est au rang des ${r} : il vaut ${nomR(r)}. Un chiffre ne vaut pas la même chose selon sa place.`,
    );
  }

  const text = enSituation
    ? `${m.debut(p, ecrit)} ${choix([
        `Quel est le chiffre des ${rang} ?`,
        `Quel chiffre est au rang des ${rang} ?`,
        `Donne le chiffre des ${rang} de ce nombre.`,
        `${p.nom} cherche le chiffre des ${rang}. Lequel est-ce ?`,
      ])}`
    : choix([
        `Dans ${ecrit}, quel chiffre est au rang des ${rang} ?`,
        `Quel est le chiffre des ${rang} de ${ecrit} ?`,
        `Donne le chiffre des ${rang} du nombre ${ecrit}.`,
        `${p.nom} écrit ${ecrit}. Quel chiffre a-t-${il(p)} écrit au rang des ${rang} ?`,
        `Repère le chiffre des ${rang} de ${ecrit}. Quel est-il ?`,
      ]);
  return { ...courte(text, Number(chiffre), expl) };
}

// ─── DECIMAL_COMPARER ────────────────────────────────────────────────────────

/** Deux décimaux différents de même partie entière `e`, plus durs à départager à mesure que l'étoile monte. */
function paireAComparer(e: number, etoile: number): [number, number] {
  const d1 = entierAleatoire(1, 9);
  let d2 = entierAleatoire(0, 9);
  while (d2 === d1) d2 = entierAleatoire(0, 9);
  if (etoile === 2) {
    // Mêmes dixièmes : tout se joue aux centièmes, avec des longueurs différentes.
    const c1 = entierAleatoire(1, 9);
    let c2 = entierAleatoire(0, 9);
    while (c2 === c1) c2 = entierAleatoire(0, 9);
    return shuffle([rond(e + d1 / 10 + c1 / 100), rond(e + d1 / 10 + c2 / 100 + entierAleatoire(1, 9) / 1000)]) as [number, number];
  }
  // Étoiles 1 et 3 : le piège « plus de chiffres = plus grand » (2,5 contre 2,45).
  const grand = Math.max(d1, d2);
  const petit = Math.min(d1, d2);
  return shuffle([rond(e + grand / 10), rond(e + petit / 10 + entierAleatoire(1, 9) / 100)]) as [number, number];
}

const DUELS = [
  { u: "m", min: 2, max: 5, sens: "max", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Au saut en longueur, ${A.nom} a sauté ${a} m et ${B.nom} ${b} m. Qui a sauté le plus loin ?` },
  { u: "s", min: 11, max: 19, sens: "min", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `À la course, ${A.nom} a mis ${a} s et ${B.nom} ${b} s. Qui a été le plus rapide ?` },
  { u: "m", min: 1, max: 1, sens: "max", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `${A.nom} mesure ${a} m et ${B.nom} ${b} m. Qui est le plus grand ?` },
  { u: "kg", min: 3, max: 8, sens: "min", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Le cartable ${de(A)} pèse ${a} kg, celui ${de(B)} ${b} kg. Qui a le cartable le plus léger ?` },
  { u: "€", min: 1, max: 4, sens: "min", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Pour son goûter, ${A.nom} a payé ${a} € et ${B.nom} ${b} €. Qui a payé le moins cher ?` },
  { u: "m", min: 12, max: 35, sens: "max", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Au lancer de balle, ${A.nom} a lancé à ${a} m et ${B.nom} à ${b} m. Qui a lancé le plus loin ?` },
  { u: "s", min: 31, max: 58, sens: "min", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `À la piscine, ${A.nom} nage une longueur en ${a} s et ${B.nom} en ${b} s. Qui nage le plus vite ?` },
  { u: "cm", min: 14, max: 48, sens: "max", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Le haricot ${de(A)} mesure ${a} cm, celui ${de(B)} ${b} cm. Qui a le haricot le plus haut ?` },
  { u: "L", min: 0, max: 1, sens: "max", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Pendant la randonnée, ${A.nom} a bu ${a} L d'eau et ${B.nom} ${b} L. Qui a bu le plus ?` },
  { u: "km", min: 4, max: 18, sens: "min", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Dimanche, ${A.nom} a roulé ${a} km à vélo et ${B.nom} ${b} km. Qui a roulé le moins ?` },
  { u: "kg", min: 1, max: 3, sens: "max", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `${A.nom} a pêché une truite de ${a} kg et ${B.nom} une truite de ${b} kg. Qui a pêché la plus lourde ?` },
  { u: "kg", min: 2, max: 6, sens: "max", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Au verger, ${A.nom} a cueilli ${a} kg de pommes et ${B.nom} ${b} kg. Qui en a cueilli le plus ?` },
  { u: "m", min: 1, max: 1, sens: "max", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Au saut en hauteur, ${A.nom} a franchi ${a} m et ${B.nom} ${b} m. Qui a sauté le plus haut ?` },
  { u: "s", min: 41, max: 59, sens: "min", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `En descente de ski, ${A.nom} a mis ${a} s et ${B.nom} ${b} s. Qui a été le plus rapide ?` },
  { u: "kg", min: 3, max: 6, sens: "max", phrase: (a: string, b: string, A: Prenom, B: Prenom) => `Le lapin ${de(A)} pèse ${a} kg et celui ${de(B)} ${b} kg. Quel lapin est le plus lourd : celui ${de(A)} ou celui ${de(B)} ?` },
] as const;

function explComparer(a: number, b: number) {
  const [x, y] = [virg(a), virg(b)];
  const ea = Math.floor(a), eb = Math.floor(b);
  if (ea !== eb) return `On compare d'abord les parties entières : ${ea} et ${eb}. Donc ${a > b ? `${x} > ${y}` : `${x} < ${y}`}.`;
  const da = Math.floor(rond(a * 10)) % 10, db = Math.floor(rond(b * 10)) % 10;
  if (da !== db)
    return `Les parties entières sont égales (${ea}). On compare les dixièmes : ${da} et ${db}. Donc ${a > b ? `${x} > ${y}` : `${x} < ${y}`}, même si l'un des deux a plus de chiffres après la virgule.`;
  return `Les parties entières (${ea}) et les dixièmes (${da}) sont égaux. On compare les centièmes, puis les millièmes si besoin : ${a > b ? `${x} > ${y}` : `${x} < ${y}`}. On peut écrire les deux nombres avec autant de chiffres après la virgule pour mieux voir.`;
}

function genComparer(etoile: 1 | 2 | 3, enQcm = false): TutorGeneratedQuestionV4 {
  const forme = enQcm
    ? choix(etoile === 3 ? ["ranger", "signe", "duel"] : ["signe", "duel", "duel"])
    : choix(etoile === 3 ? ["ranger", "pur", "duelNombre"] : ["pur", "duelNombre", "duelNombre"]);

  if (forme === "ranger") {
    const e = entierAleatoire(0, 12);
    const [a, b] = paireAComparer(e, 1);
    const [c, d] = paireAComparer(e, 2);
    const nb = [...new Set([a, b, c, d])];
    if (nb.length < 4) return genComparer(etoile, enQcm);
    const croissant = Math.random() < 0.5;
    const tri = [...nb].sort((x, y) => (croissant ? x - y : y - x));
    const sep = croissant ? " < " : " > ";
    const bonne = tri.map((x) => virg(x)).join(sep);
    const leurres = [
      [...nb].sort((x, y) => (croissant ? 1 : -1) * (String(x).length - String(y).length || x - y)).map((x) => virg(x)).join(sep),
      [...tri].reverse().map((x) => virg(x)).join(sep),
      [tri[1], tri[0], tri[2], tri[3]].map((x) => virg(x)).join(sep),
      [tri[0], tri[2], tri[1], tri[3]].map((x) => virg(x)).join(sep),
    ].filter((x) => x !== bonne);
    const p = prenom();
    const liste = shuffle(nb).map((x) => virg(x)).join(" ; ");
    const ordre = croissant ? "croissant (du plus petit au plus grand)" : "décroissant (du plus grand au plus petit)";
    const text = choix([
      `Range ces nombres dans l'ordre ${ordre} : ${liste}.`,
      `${p.nom} doit ranger dans l'ordre ${ordre} : ${liste}. Quel rangement est juste ?`,
      `Quel rangement dans l'ordre ${ordre} est correct ? Nombres : ${liste}.`,
    ]);
    return qcm(text, bonne, leurres, `Tous ont la même partie entière, ${e}. On compare les dixièmes, puis les centièmes, puis les millièmes — pas le nombre de chiffres. On obtient : ${bonne}.`);
  }

  const e = entierAleatoire(0, 15);
  const [a, b] = paireAComparer(e, etoile === 3 ? choix([1, 2]) : etoile);

  if (forme === "signe") {
    const egalite = etoile === 3 && Math.random() < 0.25;
    const y = egalite ? a : b;
    const yEcrit = egalite ? virg(a, String(a).split(".")[1]?.length ? String(a).split(".")[1].length + 1 : 1) : virg(b);
    const signe = egalite ? "=" : a > b ? ">" : "<";
    const p = prenom();
    const text = choix([
      `Complète avec <, > ou = : ${virg(a)} … ${yEcrit}`,
      `Quel signe faut-il écrire entre ${virg(a)} et ${yEcrit} ?`,
      `${p.nom} compare ${virg(a)} et ${yEcrit}. Quel signe doit-${il(p)} écrire entre les deux ?`,
      `Choisis le bon signe : ${virg(a)} … ${yEcrit}`,
    ]);
    return qcm(
      text,
      signe,
      ["<", ">", "="],
      egalite ? `${virg(a)} et ${yEcrit} sont le même nombre : un zéro à la fin de la partie décimale ne change pas la valeur. On écrit ${virg(a)} = ${yEcrit}.` : explComparer(a, y),
    );
  }

  if (forme === "duel" || forme === "duelNombre") {
    const d = choix(DUELS);
    const [A, B] = deuxPrenoms();
    const base = entierAleatoire(d.min, d.max);
    // Un prix garde deux chiffres après la virgule : pas de millièmes d'euro.
    // ⛔ 06/10/2026 : une mesure en situation a au plus deux chiffres après la virgule.
    // Étoile 2 : mêmes dixièmes, on départage aux centièmes (18,26 m contre 18,2 m).
    let [x, y] = paireAComparer(base, etoile === 3 || d.u === "€" ? 1 : etoile);
    if (etoile === 2 && d.u !== "€") {
      x = tirerDecimal(base, base + 0.99, 2);
      y = rond(Math.floor(rond(x * 10)) / 10 + (Math.random() < 0.4 ? 0 : entierAleatoire(0, 9) / 100));
      if (x === y) [x, y] = paireAComparer(base, 1);
      if (Math.random() < 0.5) [x, y] = [y, x];
    }
    const fmt = (n: number) => (d.u === "€" ? prix(n) : virg(n));
    const text = d.phrase(fmt(x), fmt(y), A, B);
    const gagnant = (d.sens === "max") === x > y ? A : B;
    const valeur = gagnant === A ? x : y;
    if (forme === "duel") {
      const lapin = text.startsWith("Le lapin");
      const bonne = lapin ? `celui ${de(gagnant)}` : gagnant.nom;
      const autre = lapin ? `celui ${de(gagnant === A ? B : A)}` : (gagnant === A ? B : A).nom;
      return qcm(text, bonne, [autre], `${explComparer(x, y)} La réponse est donc ${bonne}.`);
    }
    const qNombre = text.replace(/Qui[^?]*\?|Quel lapin[^?]*\?/, d.sens === "max" ? "Quelle est la plus grande des deux mesures ?" : "Quelle est la plus petite des deux mesures ?");
    return courte(qNombre, valeur, `${explComparer(x, y)} La ${d.sens === "max" ? "plus grande" : "plus petite"} mesure est ${fmt(valeur)} ${d.u}.`, d.u, d.u === "€" ? 2 : undefined);
  }

  // pur
  const p = prenom();
  const sens = choix(["grand", "petit"]);
  const rep = sens === "grand" ? Math.max(a, b) : Math.min(a, b);
  const text = choix([
    `Entre ${virg(a)} et ${virg(b)}, lequel est le plus ${sens} ?`,
    `Compare ${virg(a)} et ${virg(b)}. Écris le plus ${sens}.`,
    `${p.nom} hésite entre ${virg(a)} et ${virg(b)}. Lequel est le plus ${sens} ?`,
    `Donne le plus ${sens} de ces deux nombres : ${virg(a)} ; ${virg(b)}.`,
    `${p.nom} affirme que ${virg(a)} est plus ${sens} que ${virg(b)}. Écris le nombre qui est vraiment le plus ${sens}.`,
  ]);
  return courte(text, rep, `${explComparer(a, b)} Le plus ${sens} est ${virg(rep)}.`);
}

// ─── DECIMAL_DEFI ────────────────────────────────────────────────────────────
// Devinettes « qui suis-je ? », étiquettes à ranger, affirmations à juger,
// nombres à intercaler : on raisonne sur le RANG des chiffres.

const INTROS_DEVINETTE = [
  (p: Prenom) => `${p.nom} pense à un nombre.`,
  (p: Prenom) => `Voici la devinette ${de(p)}.`,
  (p: Prenom) => `${p.nom} propose une énigme à sa classe.`,
  (p: Prenom) => `Sur le tableau de la classe, ${p.nom} a écrit une devinette.`,
  (p: Prenom) => `${p.nom} cache un nombre dans une enveloppe.`,
  (p: Prenom) => `Au jeu du « qui suis-je ? », ${p.nom} donne ces indices.`,
];

function genDefi(etoile: 1 | 2 | 3 | 4 | 5): TutorGeneratedQuestionV4 {
  const p = prenom();
  const intro = choix(INTROS_DEVINETTE)(p);

  if (etoile === 1) {
    const rangs: NomRang[] = choix([
      ["unités", "dixièmes"],
      ["unités", "dixièmes", "centièmes"],
      ["dizaines", "unités", "dixièmes"],
      ["unités", "centièmes"],
    ] as NomRang[][]);
    const chiffres = rangs.map((r) => (r === "dizaines" || r === "centièmes" ? entierAleatoire(1, 9) : entierAleatoire(r === "dixièmes" && !rangs.includes("centièmes") ? 1 : 0, 9)));
    const val = rangs.reduce((s, r, i) => s + chiffres[i] * { dizaines: 10, unités: 1, dixièmes: 0.1, centièmes: 0.01, millièmes: 0.001 }[r], 0);
    const indices = shuffle(rangs.map((r, i) => `son chiffre des ${r} est ${chiffres[i]}`));
    const absents = rangs.includes("dixièmes") ? "" : " Il n'a pas de dixièmes.";
    const text = `${intro} Indices : ${indices.join(", ")}.${absents} ${choix(["Quel est ce nombre ?", "Écris ce nombre.", "Retrouve ce nombre."])}`;
    return courte(text, rond(val), `On place chaque chiffre à son rang : les unités juste avant la virgule, les dixièmes juste après, puis les centièmes.${absents ? " Sans dixièmes, on écrit 0 au rang des dixièmes." : ""} On obtient ${virg(rond(val))}.`);
  }

  if (etoile === 2) {
    const nb = choix([3, 4]);
    const chiffres: number[] = [];
    while (chiffres.length < nb) {
      const c = entierAleatoire(1, 9);
      if (!chiffres.includes(c)) chiffres.push(c);
    }
    const apres = choix(nb === 3 ? [1, 2] : [1, 2, 3]);
    const grand = Math.random() < 0.5;
    const tri = [...chiffres].sort((a, b) => (grand ? b - a : a - b));
    const s = tri.join("");
    const ecrit = `${s.slice(0, nb - apres)},${s.slice(nb - apres)}`;
    const liste = shuffle(chiffres).join(", ").replace(/, (\d)$/, " et $1");
    const text = `${p.nom} a des étiquettes : ${liste}, et une virgule. ${Il(p)} utilise chaque étiquette une fois et veut ${apres === 1 ? "un seul chiffre" : `${LETTRES[apres]} chiffres`} après la virgule. ${choix([
      `Quel est le plus ${grand ? "grand" : "petit"} nombre qu'${il(p)} peut écrire ?`,
      `Écris le plus ${grand ? "grand" : "petit"} nombre possible.`,
    ])}`;
    return courte(
      text,
      lireVirg(ecrit),
      `Le rang le plus fort est le plus à gauche. Pour le plus ${grand ? "grand" : "petit"} nombre, on y place le chiffre le plus ${grand ? "grand" : "petit"}, puis le suivant, et ainsi de suite : ${ecrit}.`,
    );
  }

  if (etoile === 3) {
    const e = entierAleatoire(1, 19);
    const sorte = choix(["compare", "zeroFin", "zeroMilieu", "rien"]);
    let affirme: string, vrai: boolean, expl: string;
    if (sorte === "compare") {
      const [a, b] = paireAComparer(e, 1);
      const [lg, ct] = String(a).length > String(b).length ? [a, b] : [b, a];
      affirme = `${virg(lg)} est plus grand que ${virg(ct)}, car il a plus de chiffres.`;
      vrai = lg > ct;
      expl = explComparer(lg, ct) + " Le nombre de chiffres après la virgule ne dit rien.";
    } else if (sorte === "zeroFin") {
      const d = entierAleatoire(1, 9);
      affirme = `${e},${d}0 est égal à ${e},${d}.`;
      vrai = true;
      expl = `Le 0 est au rang des centièmes : il compte 0 centième, il n'ajoute rien. ${e},${d}0 = ${e},${d}.`;
    } else if (sorte === "zeroMilieu") {
      const d = entierAleatoire(1, 9);
      affirme = `${e},0${d} est égal à ${e},${d}.`;
      vrai = false;
      expl = `Dans ${e},0${d}, le ${d} est au rang des centièmes ; dans ${e},${d}, il est au rang des dixièmes. Ce zéro décale le chiffre : ${e},0${d} < ${e},${d}.`;
    } else {
      const d = entierAleatoire(1, 8);
      affirme = `Il n'y a aucun nombre entre ${e},${d} et ${e},${d + 1}.`;
      vrai = false;
      expl = `${e},${d} = ${e},${d}0 et ${e},${d + 1} = ${e},${d + 1}0. Entre les deux, il y a ${e},${d}1 ; ${e},${d}5 ; ${e},${d}55… Il y en a autant qu'on veut.`;
    }
    let ami = prenom();
    while (ami.nom === p.nom) ami = prenom();
    const text = `${choix([`${p.nom} affirme :`, `${p.nom} dit à ${ami.nom} :`, `Dans son cahier, ${p.nom} a écrit :`])} « ${affirme} » ${choix(["Vrai ou faux ?", `${p.nom} a-t-${il(p)} raison ?`])}`;
    const oui = text.endsWith("raison ?") ? "Oui" : "Vrai";
    const non = oui === "Oui" ? "Non" : "Faux";
    return qcm(text, vrai ? oui : non, [vrai ? non : oui], expl);
  }

  if (etoile === 4) {
    const e = entierAleatoire(0, 15);
    const d = entierAleatoire(1, 7);
    const sorte = choix(["combien", "suivant", "precedent"]);
    if (sorte === "combien") {
      const d2 = entierAleatoire(d + 1, Math.min(9, d + 3));
      const n = (d2 - d) * 10 - 1;
      const text = `${choix([`${p.nom} cherche`, "Cherche", `${p.nom} et sa sœur cherchent`])} tous les nombres avec deux chiffres après la virgule compris entre ${e},${d} et ${e},${d2} (sans ces deux nombres). ${choix(["Combien y en a-t-il ?", "Combien en trouve-t-on ?"])}`;
      return courte(text, n, `${e},${d} = ${e},${d}0 et ${e},${d2} = ${e},${d2}0. Entre ${d * 10} centièmes et ${d2 * 10} centièmes (exclus), il y a ${d2 * 10 - d * 10 - 1} nombres : de ${e},${d}1 à ${virg(rond(e + d2 / 10 - 0.01), 2)}.`);
    }
    if (sorte === "suivant") {
      const v = rond(e + d / 10 + 0.01);
      const text = `${choix([`${p.nom} veut`, "On veut", `Le professeur ${de(p)} demande`])} le plus petit nombre à deux chiffres après la virgule qui soit plus grand que ${e},${d}. ${choix(["Quel est ce nombre ?", "Écris-le."])}`;
      return courte(text, v, `${e},${d} = ${e},${d}0. Le centième juste après est ${virg(v, 2)}.`);
    }
    const ent = entierAleatoire(1, 30);
    const v = rond(ent - 0.1);
    const text = `${choix([`${p.nom} cherche`, "Trouve", `Aide ${p.nom} à trouver`])} le plus grand nombre à un chiffre après la virgule qui soit plus petit que ${ent}. ${choix(["Quel est ce nombre ?", "Écris-le."])}`;
    return courte(text, v, `${ent} = ${ent},0. Le dixième juste avant est ${virg(v, 1)}.`);
  }

  // Étoile 5 : devinette à relations entre chiffres.
  for (;;) {
    const u = entierAleatoire(1, 9);
    const relT = choix([
      { t: 2 * u, txt: "est le double de mon chiffre des unités" },
      { t: 3 * u, txt: "est le triple de mon chiffre des unités" },
      { t: u + 1, txt: "vaut un de plus que mon chiffre des unités" },
      { t: u - 1, txt: "vaut un de moins que mon chiffre des unités" },
    ]);
    const t = relT.t;
    const relC = choix([
      { c: u + t, txt: "est la somme de mon chiffre des unités et de mon chiffre des dixièmes" },
      { c: 2 * t, txt: "est le double de mon chiffre des dixièmes" },
      { c: t - u, txt: "est la différence entre mon chiffre des dixièmes et mon chiffre des unités" },
      { c: u, txt: "est égal à mon chiffre des unités" },
    ]);
    const c = relC.c;
    if (t < 0 || t > 9 || c < 1 || c > 9) continue;
    const val = rond(u + t / 10 + c / 100);
    const text = `${intro} « Je suis compris entre ${u} et ${u + 1}. J'ai deux chiffres après la virgule. Mon chiffre des dixièmes ${relT.txt}. Mon chiffre des centièmes ${relC.txt}. » ${choix(["Qui suis-je ?", "Quel est ce nombre ?"])}`;
    return courte(text, val, `Compris entre ${u} et ${u + 1} : le chiffre des unités est ${u}. Les dixièmes valent donc ${t}, puis les centièmes ${c}. Le nombre est ${virg(val, 2)}.`);
  }
}

/** « 3,45 » → 3.45 (pour les nombres fabriqués en texte). */
function lireVirg(s: string) {
  return Number(s.replace(",", "."));
}

// ─── DECIMAL_ARRONDIR ────────────────────────────────────────────────────────

const RANGS_ARRONDI = [
  { nom: "à l'unité", dec: 0 },
  { nom: "au dixième", dec: 1 },
  { nom: "au centième", dec: 2 },
];

/** L'arrondi au rang `dec` (5 et plus : on monte), calculé sur des entiers. */
function arrondir(n: number, dec: number) {
  const f = Math.pow(10, dec);
  return rond(Math.floor(rond(n * f) + 0.5) / f);
}

const MESURES_ARRONDI = [
  { u: "€", min: 2, max: 60, dec: 2, rangs: [0], phrase: (p: Prenom, n: string) => `Le ticket de caisse ${de(p)} indique ${n} €.` },
  { u: "km", min: 3, max: 45, dec: 3, rangs: [0, 1], phrase: (p: Prenom, n: string) => `La balade à vélo ${de(p)} mesure ${n} km.` },
  { u: "s", min: 9, max: 59, dec: 2, rangs: [0, 1], phrase: (p: Prenom, n: string) => `Au chronomètre, ${p.nom} a mis ${n} s pour faire le tour du stade.` },
  { u: "m", min: 1, max: 1, dec: 3, rangs: [1, 2], phrase: (p: Prenom, n: string) => `${p.nom} mesure ${n} m.` },
  { u: "kg", min: 1, max: 4, dec: 3, rangs: [0, 1], phrase: (p: Prenom, n: string) => `Le melon acheté par ${p.nom} pèse ${n} kg.` },
  { u: "L", min: 2, max: 9, dec: 2, rangs: [0, 1], phrase: (p: Prenom, n: string) => `L'arrosoir ${de(p)} contient ${n} L d'eau.` },
  { u: "°C", min: 15, max: 32, dec: 1, rangs: [0], phrase: (p: Prenom, n: string) => `Le thermomètre du jardin ${de(p)} indique ${n} °C.` },
  { u: "m", min: 2, max: 5, dec: 2, rangs: [0, 1], phrase: (p: Prenom, n: string) => `Au saut en longueur, ${p.nom} a sauté ${n} m.` },
  { u: "cm", min: 8, max: 30, dec: 2, rangs: [0, 1], phrase: (p: Prenom, n: string) => `Avec sa règle, ${p.nom} mesure une feuille d'arbre : ${n} cm.` },
  { u: "kg", min: 2, max: 18, dec: 3, rangs: [0, 1, 2], phrase: (p: Prenom, n: string) => `Le colis ${que(p)} envoie pèse ${n} kg.` },
  { u: "km", min: 5, max: 21, dec: 3, rangs: [1, 2], phrase: (p: Prenom, n: string) => `La course nature ${de(p)} fait ${n} km.` },
  { u: "L", min: 0, max: 1, dec: 3, rangs: [1, 2], phrase: (p: Prenom, n: string) => `La bouteille de jus ${de(p)} contient ${n} L.` },
  { u: "kg", min: 3, max: 7, dec: 2, rangs: [0, 1], phrase: (p: Prenom, n: string) => `Chez le vétérinaire, le chat ${de(p)} pèse ${n} kg.` },
];

function explArrondi(n: number, dec: number, nomRang: string) {
  const f = Math.pow(10, dec);
  const bas = rond(Math.floor(rond(n * f)) / f);
  const haut = rond(bas + 1 / f);
  const suivant = Math.floor(rond(n * f * 10)) % 10;
  const r = arrondir(n, dec);
  return `Arrondir ${nomRang}, c'est choisir le plus proche des deux voisins : ${virg(n)} est entre ${virg(bas, dec)} et ${virg(haut, dec)}. Le chiffre juste après le rang demandé est ${suivant} : ${
    suivant >= 5 ? `5 ou plus, on monte à ${virg(haut, dec)}` : `moins de 5, on reste à ${virg(bas, dec)}`
  }. L'arrondi est ${virg(r)}.`;
}

function genArrondir(etoile: 2 | 3 | 4): TutorGeneratedQuestionV4 {
  const p = prenom();
  const m = choix(MESURES_ARRONDI);
  const enSituation = Math.random() < 0.6;
  // ⛔ 06/10/2026 (Frédéric) : une mesure en situation n'a jamais plus de deux
  // chiffres après la virgule. En situation, on arrondit donc à l'unité ou au
  // dixième ; le centième (qui exige trois chiffres) reste au calcul nu.
  const dec = enSituation
    ? choix((etoile === 2 ? [m.rangs[0]] : m.rangs).filter((r) => r < 2).concat(m.rangs[0] < 2 ? [] : [1]))
    : choix(etoile === 2 ? [0, 0, 1] : [0, 1, 2]);
  const rang = RANGS_ARRONDI[dec];
  // Le nombre porte au moins un chiffre après le rang demandé.
  const n = enSituation ? tirerDecimal(m.min, m.max + 0.99, Math.min(2, Math.max(m.dec, dec + 1))) : tirerDecimal(1, 60, Math.min(3, dec + choix([1, 2])));
  const ecrit = m.u === "€" && enSituation ? prix(n) : virg(n);
  const r = arrondir(n, dec);
  const f = Math.pow(10, dec);
  const bas = rond(Math.floor(rond(n * f)) / f);
  const haut = rond(bas + 1 / f);
  const nomRang = enSituation && m.u === "€" && dec === 0 ? "à l'euro près" : rang.nom;

  if (etoile === 4) {
    const sorte = choix(["parmi", "raison", "lequel"]);
    const tronc = bas;
    const autre = r === bas ? haut : bas;
    const autreRang = arrondir(n, dec === 2 ? 1 : dec + 1);
    if (sorte === "parmi") {
      const text = `${enSituation ? m.phrase(p, ecrit) + " " : ""}${choix([
        `Parmi ces nombres, lequel est l'arrondi ${enSituation ? "de cette mesure" : `de ${ecrit}`} ${nomRang} ?`,
        `${p.nom} doit arrondir ${enSituation ? "cette mesure" : ecrit} ${nomRang}. Quelle réponse est juste ?`,
      ])}`;
      return qcm(text, virg(r), [virg(autre, dec), virg(autreRang), virg(rond(tronc - 1 / f), dec)].filter((x) => lireVirg(x) !== r), `${explArrondi(n, dec, nomRang)} Attention : couper les chiffres (la troncature) ne donne pas toujours l'arrondi.`);
    }
    if (sorte === "raison") {
      const juste = Math.random() < 0.4;
      const propose = juste ? r : autre;
      const text = `${enSituation ? m.phrase(p, ecrit) + " " : ""}${p.nom} arrondit ${enSituation ? "cette mesure" : ecrit} ${nomRang} et trouve ${virg(propose, dec)}. ${choix([`A-t-${il(p)} raison ?`, "Est-ce juste ?"])}`;
      const oui = text.endsWith("raison ?") ? "Oui" : "Oui, c'est juste";
      const non = oui === "Oui" ? "Non" : "Non, c'est faux";
      return qcm(text, juste ? oui : non, [juste ? non : oui], explArrondi(n, dec, nomRang));
    }
    // Quel nombre a cet arrondi ?
    const cible = r;
    const bon = n;
    const leurres = [rond(haut + (n - bas)), rond(bas - (haut - n)), rond(cible + (r === bas ? 1 : -1) / f)].filter((x) => x > 0 && arrondir(x, dec) !== cible);
    const text = choix([
      `Quel nombre a pour arrondi ${rang.nom} ${virg(cible, dec)} ?`,
      `${p.nom} a arrondi un nombre ${rang.nom} et a trouvé ${virg(cible, dec)}. Quel était ce nombre ?`,
      `Lequel de ces nombres s'arrondit à ${virg(cible, dec)} ${rang.nom} ?`,
    ]);
    return qcm(text, virg(bon), leurres.map((x) => virg(x)), explArrondi(n, dec, rang.nom));
  }

  const text = enSituation
    ? `${m.phrase(p, ecrit)} ${choix([
        `Arrondis ce nombre ${nomRang}.`,
        `Quelle est sa valeur arrondie ${nomRang} ?`,
        `${p.nom} veut l'arrondir ${nomRang}. Que trouve-t-${il(p)} ?`,
      ])}`
    : choix([
        `Arrondis ${ecrit} ${nomRang}.`,
        `Que donne ${ecrit} arrondi ${nomRang} ?`,
        `${p.nom} arrondit ${ecrit} ${nomRang}. Que trouve-t-${il(p)} ?`,
        `Écris l'arrondi de ${ecrit} ${nomRang}.`,
      ]);
  return {
    ...courte(text, r, explArrondi(n, dec, nomRang), enSituation ? m.u : ""),
    canvas: droiteZoom(bas, haut, rond(1 / f / 2), [{ value: n, label: enSituation ? "M" : "A" }]),
  };
}

// ─── DECIMAL_ENCADRER ────────────────────────────────────────────────────────

function genEncadrer(etoile: 2 | 3 | 4): TutorGeneratedQuestionV4 {
  const p = prenom();
  const m = choix(MESURES_ARRONDI);
  const enSituation = Math.random() < 0.55;
  // ⛔ 06/10/2026 : en situation, deux chiffres après la virgule au plus (voir genArrondir).
  const dec = enSituation ? choix(etoile === 2 ? [0] : m.rangs.filter((r) => r < 2).concat(m.rangs[0] < 2 ? [] : [1])) : choix(etoile === 2 ? [0, 0, 1] : [0, 1, 2]);
  const rang = RANGS_ARRONDI[dec];
  const n = enSituation ? tirerDecimal(m.min, m.max + 0.99, Math.min(2, Math.max(m.dec, dec + 1))) : tirerDecimal(1, 60, Math.min(3, dec + choix([1, 2])));
  const f = Math.pow(10, dec);
  const bas = rond(Math.floor(rond(n * f)) / f);
  const haut = rond(bas + 1 / f);
  const ecrit = m.u === "€" && enSituation ? prix(n) : virg(n);
  const [B, H] = [virg(bas, dec), virg(haut, dec)];
  const expl = `Encadrer ${rang.nom}, c'est trouver les deux nombres consécutifs à ce rang qui entourent ${ecrit} : ${B} < ${ecrit} < ${H}. Ils ne diffèrent que d'${dec === 0 ? "une unité" : dec === 1 ? "un dixième" : "un centième"}.`;

  if (etoile === 4) {
    const sorte = choix(["lequel", "intercaler"]);
    if (sorte === "lequel") {
      const bonne = `${B} < ${ecrit} < ${H}`;
      const large = dec === 0 ? `${virg(bas)} < ${ecrit} < ${virg(bas + 2)}` : `${virg(rond(Math.floor(rond(n * f / 10)) * 10 / f), dec - 1)} < ${ecrit} < ${virg(rond(Math.floor(rond(n * f / 10)) * 10 / f + 10 / f), dec - 1)}`;
      const decale = `${H} < ${ecrit} < ${virg(rond(haut + 1 / f), dec)}`;
      const fin = `${virg(rond(Math.floor(rond(n * f * 10)) / f / 10), dec + 1)} < ${ecrit} < ${virg(rond(Math.floor(rond(n * f * 10)) / f / 10 + 1 / f / 10), dec + 1)}`;
      const text = `${enSituation ? m.phrase(p, ecrit) + " " : ""}${choix([
        `Quel est l'encadrement ${rang.nom} de ${enSituation ? "ce nombre" : ecrit} ?`,
        `${p.nom} doit encadrer ${enSituation ? "ce nombre" : ecrit} ${rang.nom}. Quelle ligne est juste ?`,
        `Lequel de ces encadrements de ${enSituation ? "ce nombre" : ecrit} est celui ${rang.nom} ?`,
      ])}`;
      return qcm(text, bonne, shuffle([large, decale, fin]), `${expl} Un encadrement plus large est vrai mais n'est pas ${rang.nom} ; un encadrement qui ne contient pas le nombre est faux.`);
    }
    // Intercaler un nombre entre deux voisins.
    const a = tirerDecimal(1, 30, 1);
    const b = rond(a + 0.1);
    const bon = rond(a + entierAleatoire(1, 9) / 100);
    const leurres = [rond(b + entierAleatoire(1, 9) / 100), rond(a - entierAleatoire(1, 9) / 100), rond(Math.floor(a) + (Math.round((a % 1) * 10)) / 100)];
    const [A, Bv] = [virg(a), virg(b)];
    const situations: [string, string][] = [
      [`Quel nombre est compris entre ${A} et ${Bv} ?`, ""],
      [`${p.nom} doit glisser un nombre entre ${A} et ${Bv}. Lequel convient ?`, ""],
      [`Lequel de ces nombres peut s'intercaler entre ${A} et ${Bv} ?`, ""],
      [`Sur sa règle, ${p.nom} veut tracer un trait entre ${A} cm et ${Bv} cm. Quelle mesure convient ?`, "cm"],
      [`Le colis ${de(p)} pèse plus de ${A} kg mais moins de ${Bv} kg. Quelle masse est possible ?`, "kg"],
      [`${p.nom} a couru plus de ${A} km mais moins de ${Bv} km. Quelle distance est possible ?`, "km"],
      [`Le temps ${de(p)} à la course est compris entre ${A} s et ${Bv} s. Quel temps est possible ?`, "s"],
      [`La bouteille ${de(p)} contient plus de ${A} L mais moins de ${Bv} L. Quelle quantité est possible ?`, "L"],
      [`Le poisson pêché par ${p.nom} pèse entre ${A} kg et ${Bv} kg. Quelle masse est possible ?`, "kg"],
      [`La planche coupée par ${p.nom} mesure entre ${A} m et ${Bv} m. Quelle longueur est possible ?`, "m"],
    ];
    const [text, u] = choix(situations);
    const avecU = (x: number) => (u ? `${virg(x)} ${u}` : virg(x));
    return qcm(text, avecU(bon), leurres.filter((x) => !(x > a && x < b)).map(avecU), `${virg(a)} = ${virg(a, 2)} et ${virg(b)} = ${virg(b, 2)}. Tous les centièmes de ${virg(rond(a + 0.01), 2)} à ${virg(rond(b - 0.01), 2)} sont entre les deux : ${virg(bon)} convient.`);
  }

  const manqueHaut = Math.random() < 0.5;
  const trou = manqueHaut ? `${B} < ${ecrit} < …` : `… < ${ecrit} < ${H}`;
  const text = enSituation
    ? `${m.phrase(p, ecrit)} ${choix([
        `Encadre ce nombre ${rang.nom} : ${trou}. Quel nombre remplace les points ?`,
        `${p.nom} l'encadre ${rang.nom} : ${trou}. Complète.`,
        `Complète cet encadrement ${rang.nom} : ${trou}.`,
      ])}`
    : choix([
        `Complète l'encadrement de ${ecrit} ${rang.nom} : ${trou}`,
        `${p.nom} encadre ${ecrit} ${rang.nom} : ${trou}. Que doit-${il(p)} écrire à la place des points ?`,
        `Encadrement ${rang.nom} : ${trou}. Quel nombre faut-il écrire ?`,
        `Trouve le nombre qui manque dans l'encadrement ${rang.nom} : ${trou}`,
      ]);
  return {
    ...courte(text, manqueHaut ? haut : bas, expl, "", dec),
    canvas: droiteZoom(bas, haut, rond(1 / f / 2), [{ value: n, label: enSituation ? "M" : "A" }]),
  };
}

// ─── DECIMAL_ADDITIONNER ─────────────────────────────────────────────────────

type SituationAdd = {
  u: string;
  dec: number;
  min: number;
  max: number;
  phrase: (p: Prenom, a: string, b: string) => string;
  questions: ((p: Prenom) => string)[];
};

const ADDITIONS: SituationAdd[] = [
  { u: "km", dec: 1, min: 2, max: 25, phrase: (p, a, b) => `${p.nom} roule ${a} km le matin et ${b} km l'après-midi.`, questions: [(p) => `Quelle distance a-t-${il(p)} parcourue en tout ?`, (p) => `Combien de kilomètres a-t-${il(p)} faits dans la journée ?`] },
  { u: "€", dec: 2, min: 1, max: 15, phrase: (p, a, b) => `${p.nom} achète un cahier à ${a} € et une trousse à ${b} €.`, questions: [(p) => `Combien paie-t-${il(p)} ?`, () => "Quel est le prix total ?"] },
  { u: "kg", dec: 2, min: 0.1, max: 1.9, phrase: (p, a, b) => `Pour un gâteau, ${p.nom} pèse ${a} kg de farine et ${b} kg de sucre.`, questions: [() => "Quelle masse cela fait-il en tout ?", () => "Combien de kilogrammes cela fait-il ensemble ?"] },
  { u: "L", dec: 2, min: 0.2, max: 1.9, phrase: (p, a, b) => `${p.nom} verse ${a} L de jus d'orange et ${b} L d'eau dans une carafe.`, questions: [() => "Combien de litres y a-t-il dans la carafe ?", (p) => `Quelle quantité de boisson obtient-${il(p)} ?`] },
  { u: "m", dec: 2, min: 0.5, max: 2.9, phrase: (p, a, b) => `${p.nom} met bout à bout une planche de ${a} m et une planche de ${b} m.`, questions: [(p) => `Quelle longueur obtient-${il(p)} ?`, () => "Quelle est la longueur totale ?"] },
  { u: "kg", dec: 1, min: 1, max: 12, phrase: (p, a, b) => `Dans son potager, ${p.nom} récolte ${a} kg de tomates puis ${b} kg de courgettes.`, questions: [(p) => `Quelle masse de légumes a-t-${il(p)} récoltée ?`] },
  { u: "kg", dec: 1, min: 4, max: 30, phrase: (p, a, b) => `${p.nom} a deux chiens : Rex pèse ${a} kg et Pilou ${b} kg.`, questions: [() => "Combien pèsent-ils ensemble ?", () => "Quelle est leur masse totale ?"] },
  { u: "km", dec: 1, min: 1, max: 9, phrase: (p, a, b) => `Le sentier ${de(p)} fait ${a} km jusqu'à la cascade, puis ${b} km jusqu'au refuge.`, questions: [() => "Quelle est la longueur totale du sentier ?", (p) => `Combien de kilomètres ${p.nom} marche-t-${il(p)} en tout ?`] },
  { u: "cL", dec: 1, min: 5, max: 40, phrase: (p, a, b) => `En sciences, ${p.nom} verse ${a} cL d'eau puis ${b} cL d'huile dans un bécher.`, questions: [() => "Combien de centilitres de liquide y a-t-il dans le bécher ?"] },
  { u: "cm", dec: 1, min: 1, max: 30, phrase: (p, a, b) => `La plante ${de(p)} mesure ${a} cm. En une semaine, elle grandit de ${b} cm.`, questions: [() => "Quelle est sa taille maintenant ?", () => "Combien mesure-t-elle à la fin de la semaine ?"] },
  { u: "m", dec: 2, min: 0.3, max: 2.5, phrase: (p, a, b) => `${p.nom} coupe un ruban de ${a} m et un autre de ${b} m pour emballer des cadeaux.`, questions: [(p) => `Quelle longueur de ruban a-t-${il(p)} utilisée ?`] },
  { u: "km", dec: 2, min: 0.5, max: 2.5, phrase: (p, a, b) => `À la piscine, ${p.nom} nage ${a} km lundi et ${b} km jeudi.`, questions: [(p) => `Quelle distance a-t-${il(p)} nagée cette semaine ?`] },
  { u: "km", dec: 1, min: 20, max: 300, phrase: (p, a, b) => `Pour aller chez sa tante, ${p.nom} fait ${a} km en train puis ${b} km en bus.`, questions: [() => "Quelle est la longueur du trajet ?", (p) => `Combien de kilomètres ${p.nom} parcourt-${il(p)} ?`] },
  { u: "kg", dec: 2, min: 0.5, max: 4, phrase: (p, a, b) => `L'étui de la guitare ${de(p)} pèse ${a} kg et la guitare ${b} kg.`, questions: [() => "Combien pèse la guitare dans son étui ?"] },
  { u: "€", dec: 2, min: 1, max: 9, phrase: (p, a, b) => `Au marché, ${p.nom} paie ${a} € de pommes et ${b} € de fraises.`, questions: [(p) => `Combien a-t-${il(p)} dépensé en tout ?`, () => "Quelle est la dépense totale ?"] },
  { u: "€", dec: 2, min: 0.8, max: 4, phrase: (p, a, b) => `Au snack, ${p.nom} prend un jus à ${a} € et un samoussa à ${b} €.`, questions: [() => "Quel est le prix total ?", (p) => `Combien ${p.nom} paie-t-${il(p)} ?`] },
];

const MANQUES: { u: string; dec: number; min: number; max: number; phrase: (p: Prenom, t: string, a: string) => string }[] = [
  { u: "km", dec: 1, min: 10, max: 60, phrase: (p, t, a) => `${p.nom} veut parcourir ${t} km à vélo en tout. ${Il(p)} a déjà roulé ${a} km. Combien de kilomètres lui reste-t-il à faire ?` },
  { u: "€", dec: 2, min: 5, max: 30, phrase: (p, t, a) => `${p.nom} a ${t} € en tout pour ses achats. ${Il(p)} a déjà dépensé ${a} €. Combien lui reste-t-il ?` },
  { u: "kg", dec: 2, min: 1, max: 3, phrase: (p, t, a) => `Pour la recette ${de(p)}, il faut ${t} kg de farine en tout. ${Il(p)} en a déjà ${a} kg. Combien de kilogrammes lui manque-t-il ?` },
  { u: "L", dec: 1, min: 20, max: 80, phrase: (p, t, a) => `L'aquarium ${de(p)} doit contenir ${t} L d'eau en tout. ${Il(p)} a déjà versé ${a} L. Combien de litres doit-${il(p)} encore verser ?` },
  { u: "km", dec: 1, min: 8, max: 25, phrase: (p, t, a) => `La randonnée ${de(p)} fait ${t} km en tout. ${Il(p)} a déjà marché ${a} km. Combien de kilomètres lui reste-t-il ?` },
  { u: "m", dec: 2, min: 3, max: 9, phrase: (p, t, a) => `${p.nom} veut une guirlande de ${t} m en tout. ${Il(p)} a déjà ${a} m de guirlande. Quelle longueur doit-${il(p)} ajouter ?` },
];

const explAddition = (termes: number[], s: number) =>
  `On pose l'addition en alignant les virgules : unités sous unités, dixièmes sous dixièmes, centièmes sous centièmes. On peut écrire ${virg(termes[0])} avec autant de chiffres après la virgule que les autres nombres, sa valeur ne change pas. ${termes.map((x) => virg(x)).join(" + ")} = ${virg(s)}.`;

function genAddition(etoile: 2 | 3 | 4 | 5): TutorGeneratedQuestionV4 {
  const p = prenom();
  const forme = choix(
    etoile === 2 ? ["pur", "situation", "situation", "situation"] : etoile === 3 ? ["pur", "trou", "situation", "situation"] : etoile === 4 ? ["pur3", "situation", "situation", "trou"] : ["manque", "manque", "trou", "pense"],
  );
  const decs = etoile === 2 ? [1, 1] : etoile === 3 ? shuffle([1, 2]) : shuffle([choix([0, 1]), 2]);

  if (forme === "situation") {
    const s = choix(ADDITIONS);
    const a = tirerDecimal(s.min, s.max, s.dec);
    const b = tirerDecimal(s.min, s.max, s.u === "€" ? 2 : Math.max(1, s.dec - (etoile === 2 ? 0 : choix([0, 1]))));
    const f = (x: number) => (s.u === "€" ? prix(x) : virg(x));
    const somme = rond(a + b);
    const text = `${s.phrase(p, f(a), f(b))} ${choix(s.questions)(p)}`;
    return courte(text, somme, explAddition([a, b], somme), s.u, s.u === "€" ? 2 : undefined);
  }

  if (forme === "manque") {
    const s = choix(MANQUES);
    const t = tirerDecimal(s.min, s.max, choix([0, s.dec]));
    const a = tirerDecimal(s.min / 4, t * 0.8, s.dec);
    const f = (x: number) => (s.u === "€" ? prix(x) : virg(x));
    const reste = rond(t - a);
    return courte(s.phrase(p, f(t), f(a)), reste, `On cherche ce qu'il faut ajouter à ${f(a)} pour obtenir ${f(t)} : ${f(a)} + … = ${f(t)}. On calcule ${f(t)} − ${f(a)} = ${f(reste)}. Vérification : ${f(a)} + ${f(reste)} = ${f(t)}.`, s.u, s.u === "€" ? 2 : undefined);
  }

  if (forme === "pense") {
    const a = tirerDecimal(0.5, 20, choix([1, 2]));
    const x = tirerDecimal(0.5, 20, choix([1, 2]));
    const c = rond(a + x);
    const si = p.f ? "Si elle" : "S'il";
    const text = choix([
      `${p.nom} pense à un nombre. ${si} lui ajoute ${virg(a)}, ${il(p)} obtient ${virg(c)}. Quel est ce nombre ?`,
      `Quel nombre faut-il ajouter à ${virg(a)} pour obtenir ${virg(c)} ?`,
      `${p.nom} cherche le nombre qu'il faut ajouter à ${virg(a)} pour obtenir ${virg(c)}. Quel est-il ?`,
    ]);
    return courte(text, x, `On cherche … tel que ${virg(a)} + … = ${virg(c)}. On calcule ${virg(c)} − ${virg(a)} = ${virg(x)}. Vérification : ${virg(a)} + ${virg(x)} = ${virg(c)}.`);
  }

  if (forme === "trou") {
    const a = tirerDecimal(0.5, 30, decs[0]);
    const x = tirerDecimal(0.5, 30, decs[1] || 1);
    const c = rond(a + x);
    const gauche = Math.random() < 0.5;
    const egalite = gauche ? `… + ${virg(a)} = ${virg(c)}` : `${virg(a)} + … = ${virg(c)}`;
    const text = choix([`Complète : ${egalite}`, `Quel nombre manque ? ${egalite}`, `${p.nom} a effacé un nombre : ${egalite}. Lequel ?`, `Trouve le nombre caché : ${egalite}`]);
    return courte(text, x, `Le nombre caché est ce qu'il faut ajouter à ${virg(a)} pour obtenir ${virg(c)} : ${virg(c)} − ${virg(a)} = ${virg(x)}. Vérification : ${virg(a)} + ${virg(x)} = ${virg(c)}.`);
  }

  // pur (2 termes) ou pur3 (3 termes)
  const termes = forme === "pur3" ? [tirerDecimal(1, 40, 2), tirerDecimal(1, 40, choix([0, 1])), tirerDecimal(0.1, 9, choix([1, 2]))] : [tirerDecimal(0.1, etoile === 2 ? 9 : 30, decs[0]), tirerDecimal(0.1, etoile === 2 ? 9 : 30, decs[1] || 1)];
  const ordre = shuffle(termes);
  const somme = rond(ordre.reduce((s, x) => s + x, 0));
  const expr = ordre.map((x) => virg(x)).join(" + ");
  const text = choix([
    `Donne la valeur de ${expr}.`,
    `Que vaut ${expr} ?`,
    `Complète : ${expr} = …`,
    `Effectue l'addition ${expr}.`,
    `${p.nom} calcule ${expr}. Quel résultat doit-${il(p)} trouver ?`,
    `Pose et calcule ${expr}.`,
  ]);
  return courte(text, somme, explAddition(ordre, somme));
}

// ─── DECIMAL_MULTIPLIER ──────────────────────────────────────────────────────

/** `grand` : les multiplicateurs 10 ou 100 plausibles dans ce contexte (100 pas oui, 100 ananas non). */
type SituationMul = { u: string; dec: number; min: number; max: number; grand?: number[]; phrase: (p: Prenom, n: string, a: string) => string };

/** Un nombre d'objets × la valeur d'un objet. `n` est écrit en chiffres, `a` avec son unité. */
const PRODUITS: SituationMul[] = [
  { u: "€", dec: 2, min: 0.5, max: 4, grand: [10], phrase: (p, n, a) => `${p.nom} achète ${n} cahiers à ${a} € l'un. Combien paie-t-${il(p)} ?` },
  { u: "km", dec: 1, min: 0.2, max: 2, phrase: (p, n, a) => `${p.nom} fait ${n} tours de piste de ${a} km. Quelle distance parcourt-${il(p)} ?` },
  { u: "L", dec: 1, min: 0.2, max: 2, phrase: (p, n, a) => `Une brique de jus contient ${a} L. ${p.nom} en achète ${n}. Combien de litres de jus cela fait-il ?` },
  { u: "kg", dec: 2, min: 0.2, max: 1, phrase: (p, n, a) => `Un pot de confiture pèse ${a} kg. ${p.nom} range ${n} pots dans un carton. Quelle est la masse des pots ?` },
  { u: "m", dec: 2, min: 0.2, max: 2, grand: [10], phrase: (p, n, a) => `${p.nom} coupe ${n} morceaux de ficelle de ${a} m chacun. Quelle longueur de ficelle utilise-t-${il(p)} ?` },
  { u: "€", dec: 2, min: 1, max: 2, grand: [10], phrase: (p, n, a) => `Un ticket de bus coûte ${a} €. ${p.nom} en achète ${n}. Combien dépense-t-${il(p)} ?` },
  { u: "cm", dec: 1, min: 14, max: 19, grand: [10, 100], phrase: (p, n, a) => `Une marche de l'escalier mesure ${a} cm de haut. ${p.nom} monte ${n} marches. De combien de centimètres est-${il(p)} monté${p.f ? "e" : ""} ?` },
  { u: "L", dec: 2, min: 0.2, max: 0.5, phrase: (p, n, a) => `Chaque jour, ${p.nom} boit ${a} L de lait. Combien en boit-${il(p)} en ${n} jours ?` },
  { u: "kg", dec: 2, min: 0.1, max: 0.3, grand: [10], phrase: (p, n, a) => `Une pomme pèse ${a} kg. ${p.nom} en met ${n} dans son panier. Quelle masse de pommes porte-t-${il(p)} ?` },
  { u: "m", dec: 2, min: 0.4, max: 0.8, grand: [10, 100], phrase: (p, n, a) => `Un pas ${de(p)} mesure ${a} m. ${Il(p)} fait ${n} pas. Quelle distance a-t-${il(p)} parcourue ?` },
  { u: "€", dec: 2, min: 1, max: 3, phrase: (p, n, a) => `Un paquet de graines coûte ${a} €. Pour son jardin, ${p.nom} en prend ${n}. Combien paie-t-${il(p)} ?` },
  { u: "€", dec: 2, min: 0.9, max: 1.5, grand: [10], phrase: (p, n, a) => `Une baguette coûte ${a} €. ${p.nom} en achète ${n} pour la fête de l'école. Quel est le prix total ?` },
  { u: "kg", dec: 2, min: 0.1, max: 0.5, phrase: (p, n, a) => `Un sachet de billes pèse ${a} kg. ${p.nom} a ${n} sachets. Combien pèsent tous ses sachets ?` },
  { u: "m", dec: 1, min: 1.5, max: 2.5, grand: [10, 100], phrase: (p, n, a) => `À vélo, ${p.nom} avance de ${a} m à chaque tour de pédale. ${Il(p)} fait ${n} tours de pédale. Quelle distance a-t-${il(p)} parcourue ?` },
  { u: "m", dec: 2, min: 1, max: 3, phrase: (p, n, a) => `Une planche mesure ${a} m. ${p.nom} en pose ${n} bout à bout. Quelle longueur obtient-${il(p)} ?` },
  { u: "€", dec: 2, min: 1.5, max: 4.5, phrase: (p, n, a) => `Au marché forain, un ananas coûte ${a} €. ${p.nom} en achète ${n}. Combien paie-t-${il(p)} ?` },
  { u: "g", dec: 1, min: 2, max: 9, grand: [10, 100], phrase: (p, n, a) => `${p.nom} empile ${n} feuilles de papier qui pèsent ${a} g chacune. Combien pèse la pile ?` },
];

const PUISSANCES = [
  { n: 10, nom: "dix", rangs: "d'un rang" },
  { n: 100, nom: "cent", rangs: "de deux rangs" },
  { n: 1000, nom: "mille", rangs: "de trois rangs" },
];

/** ⛔ Décision de Frédéric (05/10) : la VALEUR DES CHIFFRES d'abord, le raccourci ensuite. */
function explFois10(a: number, k: number) {
  const pu = PUISSANCES.find((x) => x.n === k)!;
  const r = rond(a * k);
  return `Multiplier par ${virg(k)}, c'est rendre chaque chiffre ${pu.nom} fois plus grand : ${
    k === 10 ? "les dixièmes deviennent des unités, les unités deviennent des dizaines" : k === 100 ? "les centièmes deviennent des unités, les dixièmes deviennent des dizaines" : "les millièmes deviennent des unités, les dixièmes deviennent des centaines"
  }. Chaque chiffre avance ${pu.rangs} vers la gauche dans le tableau des rangs. Raccourci : la virgule se déplace ${pu.rangs} vers la droite. ${virg(a)} × ${virg(k)} = ${virg(r)}.`;
}

function explProduit(a: number, n: number) {
  const decs = (String(a).split(".")[1] ?? "").length;
  const r = rond(a * n);
  if (!decs) return `${virg(a)} × ${virg(n)} = ${virg(r)}.`;
  const unite = decs === 1 ? "dixièmes" : decs === 2 ? "centièmes" : "millièmes";
  const entier = Math.round(a * 10 ** decs);
  return `${virg(a)}, c'est ${virg(entier)} ${unite}. ${virg(entier)} ${unite} × ${virg(n)} = ${virg(entier * n)} ${unite}, c'est-à-dire ${virg(r)}. Donc ${virg(a)} × ${virg(n)} = ${virg(r)}.`;
}

function genMultiplication(etoile: 3 | 4 | 5): TutorGeneratedQuestionV4 {
  const p = prenom();
  const forme = choix(etoile === 3 ? ["pur", "situation", "situation", "fois10"] : etoile === 4 ? ["pur", "situation", "fois10", "fois10s", "parCombien"] : ["deux", "deux", "situation", "fois10s"]);

  if (forme === "situation" || forme === "fois10s") {
    const s = choix(forme === "fois10s" ? PRODUITS.filter((x) => x.grand) : PRODUITS);
    const n = forme === "fois10s" ? choix(s.grand!) : entierAleatoire(2, etoile === 3 ? 9 : 15);
    const a = tirerDecimal(s.min, s.max, s.u === "€" ? 2 : etoile === 3 ? 1 : s.dec);
    const r = rond(a * n);
    const f = (x: number) => (s.u === "€" ? prix(x) : virg(x));
    return courte(s.phrase(p, virg(n), f(a)), r, forme === "fois10s" ? explFois10(a, n) : explProduit(a, n), s.u, s.u === "€" ? 2 : undefined);
  }

  if (forme === "deux") {
    const [n1, n2] = [entierAleatoire(2, 6), entierAleatoire(2, 6)];
    const [a1, a2] = [tirerDecimal(0.5, 4, 2), tirerDecimal(0.5, 4, 2)];
    const obj = choix([
      ["cahiers", "stylos"],
      ["croissants", "pains au chocolat"],
      ["billets de cinéma", "paquets de pop-corn"],
      ["balles de tennis", "bouteilles d'eau"],
      ["pots de peinture", "pinceaux"],
      ["sachets de graines", "pots de fleurs"],
    ]);
    const total = rond(n1 * a1 + n2 * a2);
    const text = `${p.nom} achète ${n1} ${obj[0]} à ${prix(a1)} € l'un et ${n2} ${obj[1]} à ${prix(a2)} € l'un. ${choix([`Combien paie-t-${il(p)} en tout ?`, "Quel est le prix total ?"])}`;
    return courte(text, total, `${n1} × ${prix(a1)} = ${prix(rond(n1 * a1))} € et ${n2} × ${prix(a2)} = ${prix(rond(n2 * a2))} €. En tout : ${prix(rond(n1 * a1))} + ${prix(rond(n2 * a2))} = ${prix(total)} €.`, "€", 2);
  }

  if (forme === "fois10") {
    const k = choix([10, 100, 1000]);
    const a = tirerDecimal(0.01, 99, choix([1, 2, 3]));
    const r = rond(a * k);
    const text = choix([
      `Que vaut ${virg(a)} × ${virg(k)} ?`,
      `Calcule ${virg(a)} × ${virg(k)} sans poser l'opération.`,
      `Complète : ${virg(a)} × ${virg(k)} = …`,
      `${p.nom} multiplie ${virg(a)} par ${virg(k)}. Que trouve-t-${il(p)} ?`,
      `Donne le résultat de ${virg(k)} × ${virg(a)}.`,
    ]);
    return courte(text, r, explFois10(a, k));
  }

  if (forme === "parCombien") {
    const k = choix([10, 100, 1000]);
    const a = tirerDecimal(0.01, 9, choix([2, 3]));
    const r = rond(a * k);
    const text = choix([
      `Par combien faut-il multiplier ${virg(a)} pour obtenir ${virg(r)} ?`,
      `Complète : ${virg(a)} × … = ${virg(r)}`,
      `${p.nom} a multiplié ${virg(a)} et a obtenu ${virg(r)}. Par quel nombre a-t-${il(p)} multiplié ?`,
    ]);
    return courte(text, k, `De ${virg(a)} à ${virg(r)}, chaque chiffre est devenu ${PUISSANCES.find((x) => x.n === k)!.nom} fois plus grand : il a avancé ${PUISSANCES.find((x) => x.n === k)!.rangs}. On a donc multiplié par ${virg(k)}.`);
  }

  // pur
  const n = entierAleatoire(2, etoile === 3 ? 9 : 12);
  const a = tirerDecimal(0.1, etoile === 3 ? 9 : 30, etoile === 3 ? 1 : choix([1, 2]));
  const r = rond(a * n);
  const [x, y] = Math.random() < 0.5 ? [virg(a), virg(n)] : [virg(n), virg(a)];
  const text = choix([
    `Que vaut ${x} × ${y} ?`,
    `Donne la valeur de ${x} × ${y}.`,
    `Complète : ${x} × ${y} = …`,
    `${p.nom} calcule ${x} × ${y}. Quel résultat doit-${il(p)} trouver ?`,
    `Pose et calcule ${x} × ${y}.`,
  ]);
  return courte(text, r, explProduit(a, n));
}

// ─── DECIMAL_DIVISER_PAR_ENTIER ──────────────────────────────────────────────

/** Un partage en parts égales : la quantité totale `a` est TOUJOURS écrite avant le nombre de parts `n`. */
const PARTAGES: { u: string; dec: number; qmin: number; qmax: number; phrase: (p: Prenom, a: string, n: string) => string }[] = [
  { u: "L", dec: 2, qmin: 0.1, qmax: 0.5, phrase: (p, a, n) => `${p.nom} partage ${a} L de jus entre ${n} verres, autant dans chacun. Combien de litres y a-t-il dans un verre ?` },
  { u: "m", dec: 2, qmin: 0.2, qmax: 3, phrase: (p, a, n) => `${p.nom} coupe une corde de ${a} m en ${n} morceaux égaux. Quelle est la longueur d'un morceau ?` },
  { u: "€", dec: 2, qmin: 5, qmax: 25, phrase: (p, a, n) => `Le repas coûte ${a} € en tout. ${p.nom} et ses amis le partagent en ${n} parts égales. Combien paie chacun ?` },
  { u: "kg", dec: 2, qmin: 0.5, qmax: 3, phrase: (p, a, n) => `${p.nom} répartit ${a} kg de terreau dans ${n} pots, la même masse dans chacun. Quelle masse met-${il(p)} dans un pot ?` },
  { u: "km", dec: 2, qmin: 0.2, qmax: 1, phrase: (p, a, n) => `${p.nom} a couru ${a} km en faisant ${n} tours de piste identiques. Quelle est la longueur d'un tour ?` },
  { u: "m", dec: 2, qmin: 0.4, qmax: 1.2, phrase: (p, a, n) => `Une planche de ${a} m est coupée en ${n} étagères de même longueur. Combien mesure une étagère ?` },
  { u: "kg", dec: 1, qmin: 0.5, qmax: 3, phrase: (p, a, n) => `Au verger, ${p.nom} partage ${a} kg de cerises entre ${n} paniers identiques. Quelle masse de cerises dans chaque panier ?` },
  { u: "L", dec: 2, qmin: 0.5, qmax: 1.5, phrase: (p, a, n) => `${p.nom} verse ${a} L d'eau dans ${n} bouteilles, autant dans chacune. Combien de litres contient une bouteille ?` },
  { u: "km", dec: 1, qmin: 5, qmax: 30, phrase: (p, a, n) => `${p.nom} parcourt ${a} km à vélo en ${n} jours, la même distance chaque jour. Combien de kilomètres fait-${il(p)} par jour ?` },
  { u: "€", dec: 2, qmin: 2, qmax: 12, phrase: (p, a, n) => `Une cagnotte de ${a} € est partagée entre ${n} enfants, dont ${p.nom}. Combien reçoit chaque enfant ?` },
  { u: "€", dec: 2, qmin: 0.8, qmax: 4, phrase: (p, a, n) => `${p.nom} a payé ${a} € pour ${n} cahiers identiques. Combien coûte un cahier ?` },
  { u: "kg", dec: 2, qmin: 1, qmax: 4, phrase: (p, a, n) => `Un sac de ${a} kg de pommes est réparti dans ${n} cagettes de même masse. Combien pèse une cagette ?` },
  { u: "g", dec: 1, qmin: 4, qmax: 12, phrase: (p, a, n) => `La tablette de chocolat ${de(p)} pèse ${a} g et compte ${n} carrés identiques. Combien pèse un carré ?` },
  { u: "cm", dec: 1, qmin: 2, qmax: 8, phrase: (p, a, n) => `${p.nom} partage une bande de papier de ${a} cm en ${n} parts égales. Quelle est la longueur d'une part ?` },
  { u: "L", dec: 1, qmin: 1.5, qmax: 6, phrase: (p, a, n) => `Pour le jardin, ${p.nom} verse ${a} L d'eau dans ${n} arrosoirs, autant dans chacun. Combien de litres par arrosoir ?` },
];

function explFois10Div(a: number, k: number) {
  const pu = PUISSANCES.find((x) => x.n === k)!;
  return `Diviser par ${virg(k)}, c'est rendre chaque chiffre ${pu.nom} fois plus petit : ${
    k === 10 ? "les dizaines deviennent des unités, les unités deviennent des dixièmes" : k === 100 ? "les centaines deviennent des unités, les unités deviennent des centièmes" : "les milliers deviennent des unités, les unités deviennent des millièmes"
  }. Chaque chiffre recule ${pu.rangs} vers la droite dans le tableau des rangs. Raccourci : la virgule se déplace ${pu.rangs} vers la gauche. ${virg(a)} ÷ ${virg(k)} = ${virg(rond(a / k))}.`;
}

function explQuotient(a: number, n: number, q: number) {
  const decs = (String(q).split(".")[1] ?? "").length;
  const unite = decs <= 1 ? "dixièmes" : "centièmes";
  const f = decs <= 1 ? 10 : 100;
  return `${virg(a)}, c'est ${virg(Math.round(a * f))} ${unite}. ${virg(Math.round(a * f))} ${unite} ÷ ${n} = ${virg(Math.round(q * f))} ${unite}, c'est-à-dire ${virg(q)}. Vérification : ${n} × ${virg(q)} = ${virg(a)}.`;
}

function genDivision(etoile: 3 | 4 | 5): TutorGeneratedQuestionV4 {
  const p = prenom();
  const forme = choix(
    etoile === 3 ? ["pur", "situation", "situation", "situation", "div10"] : etoile === 4 ? ["pur", "situation", "situation", "div10", "trou"] : ["situation", "situation", "situation", "parCombien", "trou"],
  );

  if (forme === "situation") {
    const s = choix(PARTAGES);
    const parDix = etoile > 3 && Math.random() < 0.3;
    const n = parDix ? 10 : entierAleatoire(2, etoile === 3 ? 5 : 9);
    const q = tirerDecimal(s.qmin, s.qmax, s.u === "€" ? 2 : etoile === 3 ? 1 : s.dec);
    const a = rond(q * n);
    const f = (x: number) => (s.u === "€" ? prix(x) : virg(x));
    return courte(s.phrase(p, f(a), virg(n)), q, parDix ? explFois10Div(a, 10) : explQuotient(a, n, q), s.u, s.u === "€" ? 2 : undefined);
  }

  if (forme === "div10" || forme === "parCombien") {
    const k = choix([10, 100, 1000]);
    // Au plus quatre chiffres après la virgule dans le résultat.
    const a = tirerDecimal(1, 999, k === 1000 ? choix([0, 1]) : choix([0, 1, 1, 2]));
    const r = rond(a / k);
    if (forme === "parCombien") {
      const text = choix([
        `Par combien faut-il diviser ${virg(a)} pour obtenir ${virg(r)} ?`,
        `${p.nom} a divisé ${virg(a)} et a obtenu ${virg(r)}. Par quel nombre a-t-${il(p)} divisé ?`,
        `Complète : ${virg(a)} ÷ … = ${virg(r)}`,
        `${p.nom} a effacé le diviseur : ${virg(a)} ÷ … = ${virg(r)}. Lequel était-ce ?`,
      ]);
      return courte(text, k, `De ${virg(a)} à ${virg(r)}, chaque chiffre est devenu ${PUISSANCES.find((x) => x.n === k)!.nom} fois plus petit : il a reculé ${PUISSANCES.find((x) => x.n === k)!.rangs}. On a donc divisé par ${virg(k)}.`);
    }
    const text = choix([
      `${p.nom} divise ${virg(a)} par ${virg(k)}. Que trouve-t-${il(p)} ?`,
      `Calcule ${virg(a)} ÷ ${virg(k)} sans poser l'opération.`,
      `Donne le résultat de ${virg(a)} ÷ ${virg(k)}.`,
      `De tête : ${virg(a)} ÷ ${virg(k)} = …`,
      `${p.nom} doit calculer ${virg(a)} ÷ ${virg(k)} de tête. Quel résultat trouve-t-${il(p)} ?`,
      `Écris le résultat de ${virg(a)} ÷ ${virg(k)} en pensant à la valeur de chaque chiffre.`,
    ]);
    return courte(text, r, explFois10Div(a, k));
  }

  const n = entierAleatoire(2, 9);
  const q = tirerDecimal(0.1, etoile === 3 ? 5 : 20, etoile === 3 ? 1 : choix([1, 2]));
  const a = rond(q * n);
  if (forme === "trou") {
    const text = choix([
      `Complète : ${n} × … = ${virg(a)}`,
      `Quel nombre multiplié par ${n} donne ${virg(a)} ?`,
      `${p.nom} cherche le nombre qui, multiplié par ${n}, donne ${virg(a)}. Quel est-il ?`,
      `${p.nom} a effacé un nombre : ${n} × … = ${virg(a)}. Lequel ?`,
      `Trouve le nombre caché : ${n} × … = ${virg(a)}`,
    ]);
    return courte(text, q, `On cherche … tel que ${n} × … = ${virg(a)}. C'est la division ${virg(a)} ÷ ${n}. ${explQuotient(a, n, q)}`);
  }
  const text = choix([
    `Que vaut ${virg(a)} ÷ ${n} ?`,
    `Donne la valeur de ${virg(a)} ÷ ${n}.`,
    `Complète : ${virg(a)} ÷ ${n} = …`,
    `${p.nom} calcule ${virg(a)} ÷ ${n}. Quel résultat doit-${il(p)} trouver ?`,
    `Pose et calcule ${virg(a)} ÷ ${n}.`,
  ]);
  return courte(text, q, explQuotient(a, n, q));
}

// ─── DECIMAL_CALCUL_DEFI ─────────────────────────────────────────────────────
// ⛔ Notion de calcul : AUCUNE barre de fraction pour une division (Frédéric,
// 06/10/2026). « 10 % de 60 », c'est « 60 ÷ 100 × 10 », jamais « 10/100 ».

/** `max` : la plus grande quantité plausible dans ce contexte. */
const MOITIES: { u: string; mot: "moitié" | "quart" | "double"; max: number; phrase: (p: Prenom, n: string) => string }[] = [
  { u: "L", mot: "moitié", max: 3, phrase: (p, n) => `${p.nom} boit la moitié d'une bouteille de ${n} L. Quelle quantité boit-${il(p)} ?` },
  { u: "km", mot: "moitié", max: 60, phrase: (p, n) => `Le trajet ${de(p)} fait ${n} km. ${Il(p)} s'arrête à la moitié du trajet. Combien de kilomètres a-t-${il(p)} faits ?` },
  { u: "m", mot: "moitié", max: 9, phrase: (p, n) => `${p.nom} coupe une ficelle de ${n} m en son milieu. Combien mesure chaque moitié ?` },
  { u: "€", mot: "moitié", max: 60, phrase: (p, n) => `${p.nom} a ${n} €. ${Il(p)} en dépense la moitié. Combien dépense-t-${il(p)} ?` },
  { u: "kg", mot: "moitié", max: 40, phrase: (p, n) => `Un sac de terreau pèse ${n} kg. ${p.nom} en utilise la moitié. Quelle masse utilise-t-${il(p)} ?` },
  { u: "m", mot: "quart", max: 11, phrase: (p, n) => `${p.nom} coupe le quart d'une planche de ${n} m. Combien mesure ce morceau ?` },
  { u: "€", mot: "quart", max: 50, phrase: (p, n) => `${p.nom} donne le quart de ses ${n} € d'économies à une association. Combien donne-t-${il(p)} ?` },
  { u: "L", mot: "quart", max: 30, phrase: (p, n) => `Une bassine contient ${n} L d'eau. ${p.nom} en verse le quart dans un seau. Combien de litres verse-t-${il(p)} ?` },
  { u: "km", mot: "double", max: 12, phrase: (p, n) => `Samedi, ${p.nom} a couru ${n} km. Dimanche, ${il(p)} court le double. Combien de kilomètres court-${il(p)} dimanche ?` },
  { u: "kg", mot: "double", max: 6, phrase: (p, n) => `Le chiot ${de(p)} pesait ${n} kg. Aujourd'hui, il pèse le double. Combien pèse-t-il ?` },
  { u: "m", mot: "double", max: 4, phrase: (p, n) => `La tente ${de(p)} mesure ${n} m de long. La grande tente mesure le double. Quelle est sa longueur ?` },
];

const POURCENTAGES: { u: string; min: number; max: number; phrase: (p: Prenom, b: string, t: number) => string }[] = [
  { u: "€", min: 20, max: 80, phrase: (p, b, t) => `Un jeu vidéo coûte ${b} €. Pendant les soldes, il y a ${t} % de réduction. De combien d'euros est la réduction ?` },
  { u: "€", min: 10, max: 60, phrase: (p, b, t) => `Au restaurant, l'addition ${de(p)} est de ${b} €. ${Il(p)} laisse ${t} % de pourboire. Combien vaut le pourboire ?` },
  { u: "€", min: 30, max: 120, phrase: (p, b, t) => `Un vélo coûte ${b} €. Le magasin fait une remise de ${t} %. Combien d'euros ${p.nom} économise-t-${il(p)} ?` },
  { u: "km", min: 10, max: 60, phrase: (p, b, t) => `La randonnée ${de(p)} fait ${b} km. ${Il(p)} a déjà fait ${t} % du parcours. Combien de kilomètres a-t-${il(p)} parcourus ?` },
  { u: "L", min: 20, max: 90, phrase: (p, b, t) => `L'aquarium ${de(p)} contient ${b} L. ${Il(p)} change ${t} % de l'eau. Combien de litres change-t-${il(p)} ?` },
  { u: "€", min: 15, max: 50, phrase: (p, b, t) => `${p.nom} gagne ${b} € en gardant des animaux. ${Il(p)} en met ${t} % dans sa tirelire. Combien d'euros met-${il(p)} de côté ?` },
  { u: "kg", min: 10, max: 40, phrase: (p, b, t) => `Le jardin ${de(p)} a donné ${b} kg de fruits. ${t} % sont des fraises. Combien de kilogrammes de fraises y a-t-il ?` },
];

/** a : le prix unitaire (€), b : la quantité ; bornes plausibles pour chacun. */
const GRANDEURS: { a: [number, number]; b: [number, number]; phrase: (p: Prenom, a: string, b: string) => string }[] = [
  { a: [1.6, 2.1], b: [15, 55], phrase: (p, a, b) => `Le litre d'essence coûte ${a} €. Le père ${de(p)} met ${b} L dans la voiture.` },
  { a: [1.5, 4.5], b: [1.5, 6], phrase: (p, a, b) => `Le kilogramme de tomates coûte ${a} €. ${p.nom} en achète ${b} kg.` },
  { a: [4, 15], b: [1.5, 6], phrase: (p, a, b) => `Un tissu coûte ${a} € le mètre. ${p.nom} en achète ${b} m pour un déguisement.` },
  { a: [4, 9], b: [1.5, 5], phrase: (p, a, b) => `Le kilogramme de cerises coûte ${a} €. ${p.nom} en cueille ${b} kg au verger.` },
  { a: [1.5, 6], b: [5, 30], phrase: (p, a, b) => `Le mètre de grillage coûte ${a} €. Pour son potager, ${p.nom} en achète ${b} m.` },
  { a: [2.5, 6], b: [1.5, 4], phrase: (p, a, b) => `Au marché, le kilogramme de pommes coûte ${a} €. ${p.nom} en prend ${b} kg.` },
  { a: [0.8, 2.5], b: [10, 40], phrase: (p, a, b) => `Le mètre de ruban coûte ${a} €. Pour décorer la classe, ${p.nom} en achète ${b} m.` },
];

function genCalculDefi(etoile: 1 | 2 | 3 | 4): TutorGeneratedQuestionV4 {
  const p = prenom();

  if (etoile === 1) {
    const s = choix(MOITIES);
    // Moitié : un entier impair, ou un décimal à dixièmes impairs (1,5 L → 0,75 L). Quart : un entier non multiple de 4.
    const impair = () => {
      for (;;) {
        const k = s.max >= 5 && Math.random() < 0.6 ? entierAleatoire(3, s.max) : entierAleatoire(10, s.max * 10) / 10;
        if (Math.round(k * 10) % 2 === 1 || (Number.isInteger(k) && k % 2 === 1)) return k;
      }
    };
    const quart = () => {
      for (;;) {
        const k = entierAleatoire(5, s.max);
        if (k % 4) return k;
      }
    };
    const n = s.mot === "double" ? tirerDecimal(1.1, s.max, 1) : s.mot === "moitié" ? impair() : quart();
    const r = s.mot === "double" ? rond(n * 2) : s.mot === "moitié" ? rond(n / 2) : rond(n / 4);
    const f = (x: number) => (s.u === "€" ? virg(x, x % 1 ? 2 : 0) : virg(x));
    const calcul = s.mot === "double" ? `${virg(n)} × 2 = ${virg(r)}` : s.mot === "moitié" ? `${virg(n)} ÷ 2 = ${virg(r)}` : `${virg(n)} ÷ 4 = ${virg(r)} (la moitié de la moitié)`;
    return courte(
      s.phrase(p, f(n)),
      r,
      `${s.mot === "double" ? "Le double, c'est × 2" : s.mot === "moitié" ? "La moitié, c'est ÷ 2" : "Le quart, c'est ÷ 4"} : ${calcul}.${s.mot === "double" ? " On double les unités et les dixièmes, sans oublier la retenue." : " Le partage ne tombe pas juste en nombres entiers : le résultat est un nombre décimal."}`,
      s.u,
      s.u === "€" ? 2 : undefined,
    );
  }

  if (etoile === 2 || etoile === 3) {
    const s = choix(POURCENTAGES);
    const t = choix(etoile === 2 ? [10, 50, 25] : [10, 20, 25, 50, 5, 30]);
    const b = entierAleatoire(s.min, s.max);
    const r = rond((b * t) / 100);
    const apres = etoile === 3 && /réduction|remise/.test(s.phrase(p, "1", 1)) && Math.random() < 0.6;
    const methode =
      t === 50 ? `50 %, c'est la moitié : ${b} ÷ 2 = ${virg(r)}.` : t === 25 ? `25 %, c'est le quart : ${b} ÷ 4 = ${virg(r)}.` : t === 10 ? `10 %, c'est le dixième : ${b} ÷ 10 = ${virg(r)}.` : `${t} % de ${b}, c'est ${b} ÷ 100 × ${t} = ${virg(r)}.`;
    if (apres) {
      const reste = rond(b - r);
      const text = s.phrase(p, String(b), t).replace(/ [^.]*\?$/, " " + choix(["Quel est le nouveau prix ?", `Combien ${p.nom} paie-t-${il(p)} au final ?`]));
      return courte(text, reste, `${methode} On retire cette somme : ${b} − ${prix(r)} = ${prix(reste)} €.`, "€", 2);
    }
    return courte(s.phrase(p, String(b), t), r, methode, s.u, s.u === "€" ? 2 : undefined);
  }

  // Étoile 4 : ordre de grandeur d'un produit de deux décimaux.
  const s = choix(GRANDEURS);
  const a = tirerDecimal(s.a[0], s.a[1], 2);
  const b = tirerDecimal(s.b[0], s.b[1], 1);
  const exact = a * b;
  const est = Math.round(a) * Math.round(b);
  const p10 = Math.pow(10, Math.floor(Math.log10(exact)));
  const bonne = Math.round(exact / p10) * p10;
  const fmt = (x: number) => `environ ${virg(x)} €`;
  const text = `${s.phrase(p, prix(a), virg(b))} ${choix(["Sans poser l'opération, quel est l'ordre de grandeur du prix ?", `${p.nom} veut savoir à peu près combien payer. Quel ordre de grandeur est juste ?`, "Quel prix est le plus proche du prix exact ?"])}`;
  return qcm(
    text,
    fmt(bonne),
    [fmt(rond(bonne / 10)), fmt(bonne * 10), fmt(bonne * 100)],
    `${prix(a)} est proche de ${Math.round(a)} et ${virg(b)} est proche de ${Math.round(b)}. ${Math.round(a)} × ${Math.round(b)} = ${est}. Le calcul exact donne ${virg(rond(exact, 3))} €, soit environ ${virg(bonne)} €. Un ordre de grandeur permet de vérifier la place de la virgule.`,
  );
}

// ─── DECIMAL_MULTIPLIER_PAR_01 ───────────────────────────────────────────────
// ⛔ Notion de calcul : « 0,1 », « un dixième », « ÷ 10 » — jamais « 1/10 ».

const FACTEURS_01 = [
  { ecrit: "0,1", v: 0.1, div: 10, nom: "un dixième", pu: PUISSANCES[0] },
  { ecrit: "0,01", v: 0.01, div: 100, nom: "un centième", pu: PUISSANCES[1] },
  { ecrit: "0,001", v: 0.001, div: 1000, nom: "un millième", pu: PUISSANCES[2] },
];

const PETITS: { f: string; u: string; nmax: number; phrase: (p: Prenom, n: string) => string }[] = [
  { f: "0,1", u: "mm", nmax: 400, phrase: (p, n) => `Une feuille de papier a une épaisseur de 0,1 mm. ${p.nom} empile ${n} feuilles. Quelle est l'épaisseur de la pile ?` },
  { f: "0,1", u: "g", nmax: 300, phrase: (p, n) => `Une perle pèse 0,1 g. ${p.nom} enfile ${n} perles sur un bracelet. Quelle est la masse des perles ?` },
  { f: "0,01", u: "€", nmax: 500, phrase: (p, n) => `Une pièce d'un centime vaut 0,01 €. ${p.nom} a ${n} pièces d'un centime dans sa tirelire. Combien d'euros cela fait-il ?` },
  // ⛔ 06/10/2026 : pas de « 0,001 kg » en situation (trois chiffres après la virgule) : × 0,001 reste au calcul nu.
  { f: "0,01", u: "m", nmax: 300, phrase: (p, n) => `Une fourmi mesure 0,01 m. ${p.nom} imagine ${n} fourmis en file, l'une derrière l'autre. Quelle longueur fait la file ?` },
  { f: "0,1", u: "mm", nmax: 300, phrase: (p, n) => `Une page du cahier ${de(p)} a une épaisseur de 0,1 mm. Le cahier a ${n} pages. Quelle est l'épaisseur des pages ?` },
  { f: "0,1", u: "€", nmax: 60, phrase: (p, n) => `Un bonbon coûte 0,10 €. ${p.nom} en achète ${n} pour la fête. Combien paie-t-${il(p)} ?` },
  { f: "0,1", u: "g", nmax: 200, phrase: (p, n) => `Une graine de tournesol pèse 0,1 g. ${p.nom} en donne ${n} à son hamster. Quelle masse de graines donne-t-${il(p)} ?` },
  { f: "0,1", u: "m", nmax: 90, phrase: (p, n) => `Chaque tour de manivelle fait monter le seau du puits de 0,1 m. ${p.nom} fait ${n} tours. De combien le seau est-il monté ?` },
  { f: "0,01", u: "kg", nmax: 90, phrase: (p, n) => `Un sachet de levure pèse 0,01 kg. Pour ses gâteaux, ${p.nom} en utilise ${n}. Quelle masse de levure utilise-t-${il(p)} ?` },
  { f: "0,01", u: "€", nmax: 300, phrase: (p, n) => `Un autocollant coûte 0,01 € à fabriquer. Le club ${de(p)} en fabrique ${n}. Combien cela coûte-t-il ?` },
];

function explFois01(n: number, F: (typeof FACTEURS_01)[number]) {
  const r = rond(n * F.v);
  return `${F.ecrit}, c'est ${F.nom}. Multiplier par ${F.ecrit}, c'est prendre ${F.nom} du nombre, donc le diviser par ${virg(F.div)} : chaque chiffre prend une valeur ${F.pu.nom} fois plus petite et recule ${F.pu.rangs} vers la droite dans le tableau des rangs. Raccourci : la virgule se déplace ${F.pu.rangs} vers la gauche. ${virg(n)} × ${F.ecrit} = ${virg(n)} ÷ ${virg(F.div)} = ${virg(r)}.`;
}

function genFois01(etoile: 2 | 3 | 4): TutorGeneratedQuestionV4 {
  const p = prenom();
  const forme = choix(etoile === 2 ? ["pur", "situation", "situation"] : etoile === 3 ? ["pur", "situation", "facteur", "situation"] : ["compare", "equivalent", "situation", "facteur"]);
  const F = choix(etoile === 2 ? FACTEURS_01.slice(0, 2) : FACTEURS_01);

  if (forme === "situation") {
    const s = choix(PETITS.filter((x) => etoile > 2 || x.f !== "0,001"));
    const Fs = FACTEURS_01.find((x) => x.ecrit === s.f)!;
    const n = entierAleatoire(12, s.nmax);
    const r = rond(n * Fs.v);
    return courte(s.phrase(p, virg(n)), r, explFois01(n, Fs), s.u, s.u === "€" ? 2 : undefined);
  }

  const n = Math.random() < 0.5 ? entierAleatoire(2, 999) : tirerDecimal(1, 99, 1);
  const r = rond(n * F.v);

  if (forme === "facteur") {
    const text = choix([
      `Complète : ${virg(n)} × … = ${virg(r)}`,
      `Par quel nombre (0,1 ; 0,01 ou 0,001) faut-il multiplier ${virg(n)} pour obtenir ${virg(r)} ?`,
      `${p.nom} a multiplié ${virg(n)} par 0,1, 0,01 ou 0,001 et a obtenu ${virg(r)}. Par lequel ?`,
      `Trouve le facteur caché : ${virg(n)} × … = ${virg(r)}`,
    ]);
    return courte(text, F.v, `De ${virg(n)} à ${virg(r)}, chaque chiffre a reculé ${F.pu.rangs} : le nombre est devenu ${F.pu.nom} fois plus petit. On a divisé par ${virg(F.div)}, c'est-à-dire multiplié par ${F.ecrit}.`);
  }

  if (forme === "compare") {
    const text = choix([
      `Sans calculer : ${virg(n)} × ${F.ecrit} est-il plus grand ou plus petit que ${virg(n)} ?`,
      `${p.nom} dit : « ${virg(n)} × ${F.ecrit} est plus grand que ${virg(n)}, car une multiplication agrandit. » En réalité, le résultat est :`,
      `Le résultat de ${virg(n)} × ${F.ecrit} est-il plus grand ou plus petit que ${virg(n)} ?`,
      `${p.nom} doit vérifier son calcul ${virg(n)} × ${F.ecrit}. Avant de calculer, que sait-${il(p)} du résultat ? Il est :`,
      `Au jeu du « plus ou moins », ${p.nom} demande : ${virg(n)} × ${F.ecrit}, c'est plus ou moins que ${virg(n)} ? Le résultat est :`,
    ]);
    return qcm(
      text,
      `plus petit que ${virg(n)}`,
      [`plus grand que ${virg(n)}`, `égal à ${virg(n)}`],
      `${F.ecrit} est plus petit que 1. Multiplier par un nombre plus petit que 1 rend le résultat plus petit : ${virg(n)} × ${F.ecrit} = ${virg(r)}. « Multiplier agrandit » n'est vrai que pour un facteur plus grand que 1.`,
    );
  }

  if (forme === "equivalent") {
    const text = choix([
      `Quel calcul donne le même résultat que ${virg(n)} × ${F.ecrit} ?`,
      `${p.nom} veut calculer ${virg(n)} × ${F.ecrit} autrement. Quel calcul peut-${il(p)} faire ?`,
      `${virg(n)} × ${F.ecrit} est égal à :`,
      `Pour calculer ${virg(n)} × ${F.ecrit} de tête, quel calcul ${p.nom} peut-${il(p)} faire à la place ?`,
      `Choisis le calcul qui remplace ${virg(n)} × ${F.ecrit}.`,
    ]);
    const autres = FACTEURS_01.filter((x) => x !== F);
    return qcm(
      text,
      `${virg(n)} ÷ ${virg(F.div)}`,
      [`${virg(n)} × ${virg(F.div)}`, ...autres.map((x) => `${virg(n)} ÷ ${virg(x.div)}`)],
      explFois01(n, F),
    );
  }

  const [x, y] = Math.random() < 0.7 ? [virg(n), F.ecrit] : [F.ecrit, virg(n)];
  const text = choix([
    `Que vaut ${x} × ${y} ?`,
    `Complète : ${x} × ${y} = …`,
    `Calcule ${x} × ${y} de tête.`,
    `${p.nom} prend ${F.nom} de ${virg(n)} : ${virg(n)} × ${F.ecrit} = … Que trouve-t-${il(p)} ?`,
    `Donne le résultat de ${x} × ${y}.`,
    `${p.nom} calcule ${x} × ${y}. Quel résultat doit-${il(p)} trouver ?`,
  ]);
  return courte(text, r, explFois01(n, F));
}

export const decimauxBank: TutorBankItemV4[] = [
  // =========================
  // DECIMAL_LIRE_ECRIRE
  // =========================
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 7/10",
    format: "short",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "fraction_decimal_equivalent",
    hint: "7 dixièmes = 0,7.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("7/10 signifie 7 dixièmes. Un dixième s’écrit 0,1, donc 7 dixièmes s’écrivent 0,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 3/10",
    format: "short",
    expected: ["0,3", "0.3", "0,30", "0.30"],
    comparator: "fraction_decimal_equivalent",
    hint: "3 dixièmes = 0,3.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("3/10 signifie 3 dixièmes. Cela s’écrit 0,3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 9/10",
    format: "short",
    expected: ["0,9", "0.9", "0,90", "0.90"],
    comparator: "fraction_decimal_equivalent",
    hint: "9 dixièmes = 0,9.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("9/10 signifie 9 dixièmes. Cela s’écrit 0,9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Écris en décimal : 25/10",
    format: "short",
    expected: ["2,5", "2.5", "2,50", "2.50"],
    comparator: "fraction_decimal_equivalent",
    hint: "25 dixièmes = 2 unités et 5 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("25/10 signifie 25 dixièmes. 20 dixièmes font 2 unités et il reste 5 dixièmes. Donc cela s’écrit 2,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 9/10 ?",
    format: "qcm",
    choices: ["0,09", "0,9", "9,0", "0,009"], // 08/10/2026 : « 0,900 » vaut 0,9, retiré
    expected: ["0,9"],
    comparator: "mcq_exact",
    hint: "9/10 signifie 9 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("9/10 signifie 9 dixièmes. L’écriture correcte est 0,9. 0,09 correspondrait à 9 centièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "ecriture", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 15/10 ?",
    format: "qcm",
    choices: ["1,5", "0,15", "15,0", "1,05"],
    expected: ["1,5"],
    comparator: "mcq_exact",
    hint: "15 dixièmes = 1,5.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("15/10 signifie 15 dixièmes. Cela fait 1 unité et 5 dixièmes, donc 1,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "ecriture", "qcm"],
  },

  // =========================
  // DECIMAL_RANG
  // =========================
  {
    kind: "fixed",
    id: "decimal_rang_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 1,
    theme: "neutral",
    text: "Dans 3,4, quel chiffre est au rang des dixièmes ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Le chiffre des dixièmes est juste après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 3,4, le chiffre placé juste après la virgule est 4. Il est donc au rang des dixièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 1,
    theme: "neutral",
    text: "Dans 5,83, quel chiffre est au rang des centièmes ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le chiffre des centièmes est le deuxième après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 5,83, le premier chiffre après la virgule est 8 pour les dixièmes, et le deuxième est 3 pour les centièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 12,764, quel chiffre est au rang des dixièmes ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le chiffre des dixièmes est le premier après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 12,764, le chiffre 7 est juste après la virgule. C’est donc le chiffre des dixièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 12,764, quel chiffre est au rang des millièmes ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Le chiffre des millièmes est le troisième après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 12,764, les chiffres après la virgule sont 7, 6 et 4. Le troisième, 4, est au rang des millièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 4,58, quel chiffre est au rang des dixièmes ?",
    format: "qcm",
    choices: ["4", "5", "8", "0"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Regarde le premier chiffre après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 4,58, le premier chiffre après la virgule est 5. Il est donc au rang des dixièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "rang", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le rang du chiffre 6 dans 3,264 ?",
    format: "qcm",
    choices: ["dixièmes", "centièmes", "millièmes", "unités"],
    expected: ["centièmes"],
    comparator: "mcq_exact",
    hint: "Après la virgule : 2 = dixièmes, 6 = centièmes, 4 = millièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 3,264, le 2 est au rang des dixièmes, le 6 au rang des centièmes et le 4 au rang des millièmes. Le 6 est donc au rang des centièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "rang", "qcm"],
  },

  // =========================
  // DECIMAL_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "decimal_compare_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 0,7 ou 0,65 ?",
    format: "short",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "number_equal",
    hint: "Compare d’abord les dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,7 = 0,70. On compare donc 0,70 et 0,65. Comme 70 centièmes est plus grand que 65 centièmes, la bonne réponse est 0,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus petit : 0,4 ou 0,09 ?",
    format: "short",
    expected: ["0,09", "0.09", "0,090", "0.090"],
    comparator: "number_equal",
    hint: "0,09 a 0 dixième et 9 centièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,4 = 0,40. On compare donc 0,40 et 0,09. Comme 9 centièmes est plus petit que 40 centièmes, la bonne réponse est 0,09.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 0,3 ou 0,27 ?",
    format: "short",
    expected: ["0,3", "0.3", "0,30", "0.30"],
    comparator: "number_equal",
    hint: "Compare 0,30 et 0,27.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,3 = 0,30. On compare 30 centièmes à 27 centièmes. Comme 30 est plus grand que 27, la bonne réponse est 0,3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus petit : 0,52 ou 0,507 ?",
    format: "short",
    expected: ["0,507", "0.507"],
    comparator: "number_equal",
    hint: "Compare 0,520 et 0,507.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,52 = 0,520. On compare donc 520 millièmes et 507 millièmes. Comme 507 est plus petit que 520, la bonne réponse est 0,507.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_trap_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand : 0,5 ou 0,45 ?",
    format: "short",
    expected: ["0,5", "0.5", "0,50", "0.50"],
    comparator: "number_equal",
    hint: "0,50 vs 0,45.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,5 = 0,50. On compare 50 centièmes à 45 centièmes. Comme 50 est plus grand que 45, la bonne réponse est 0,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "comparaison", "piege"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_trap_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus petit : 0,305 ou 0,35 ?",
    format: "short",
    expected: ["0,305", "0.305"],
    comparator: "number_equal",
    hint: "Écris 0,35 sous la forme 0,350.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,35 = 0,350. On compare donc 305 millièmes à 350 millièmes. Comme 305 est plus petit que 350, la bonne réponse est 0,305.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "comparaison", "piege"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["0,54", "0,45", "0,5", "0,49"],
    expected: ["0,54"],
    comparator: "mcq_exact",
    hint: "Compare chiffre par chiffre après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,54 = 54 centièmes. Les autres valent 45 centièmes, 50 centièmes et 49 centièmes. Le plus grand est donc 0,54.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["0,41", "0,401", "0,39", "0,4"],
    expected: ["0,41"],
    comparator: "mcq_exact",
    hint: "0,41 = 0,410.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,41 = 0,410, 0,401 = 0,401, 0,39 = 0,390 et 0,4 = 0,400. Le plus grand est donc 0,41.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un fruit coûte 2,5 € et un autre 2,45 €. Lequel coûte le plus cher ?",
    format: "short",
    expected: ["2,5", "2.5", "2,50", "2.50"],
    comparator: "number_equal",
    hint: "Compare 2,50 et 2,45.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("2,5 € = 2,50 €. En comparant 2,50 € et 2,45 €, on voit que 2,50 € est plus grand. Le fruit à 2,5 € coûte donc le plus cher.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "comparaison", "reunion"],
  },

  // =========================
  // DECIMAL_ADDITIONNER
  // =========================
  {
    kind: "fixed",
    id: "decimal_add_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 1,2 + 0,5",
    format: "short",
    expected: ["1,7", "1.7", "1,70", "1.70"],
    comparator: "number_equal",
    hint: "Aligne bien les virgules.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("1,2 + 0,5 = 12 dixièmes + 5 dixièmes = 17 dixièmes, donc 1,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 2,4 + 1,3",
    format: "short",
    expected: ["3,7", "3.7", "3,70", "3.70"],
    comparator: "number_equal",
    hint: "Additionne les unités puis les dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("2,4 + 1,3 = 24 dixièmes + 13 dixièmes = 37 dixièmes, donc 3,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 3,45 + 1,7",
    format: "short",
    expected: ["5,15", "5.15"],
    comparator: "number_equal",
    hint: "Ajoute un zéro : 1,70.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("On écrit 1,7 sous la forme 1,70. Puis 3,45 + 1,70 = 5,15.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 0,75 + 2,8",
    format: "short",
    expected: ["3,55", "3.55"],
    comparator: "number_equal",
    hint: "Écris 2,8 sous la forme 2,80.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("On écrit 2,8 sous la forme 2,80. Puis 0,75 + 2,80 = 3,55.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 0,6 + 0,9",
    format: "short",
    expected: ["1,5", "1.5", "1,50", "1.50"],
    comparator: "number_equal",
    hint: "6 dixièmes + 9 dixièmes = 15 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,6 + 0,9 = 6 dixièmes + 9 dixièmes = 15 dixièmes, donc 1,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 2,35 + 1,4",
    format: "short",
    expected: ["3,75", "3.75"],
    comparator: "number_equal",
    hint: "Écris 1,4 sous la forme 1,40.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("On écrit 1,4 = 1,40. Puis 2,35 + 1,40 = 3,75.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le résultat de 0,8 + 0,7 ?",
    format: "qcm",
    choices: ["1,5", "0,15", "1,4", "1,6"],
    expected: ["1,5"],
    comparator: "mcq_exact",
    hint: "8 dixièmes + 7 dixièmes = 15 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,8 + 0,7 = 8 dixièmes + 7 dixièmes = 15 dixièmes, donc 1,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_add_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 5,
    theme: "neutral",
    text: "Je pense à un nombre. Si j’ajoute 1,5, j’obtiens 3,2. Quel est ce nombre ?",
    format: "short",
    expected: ["1,7", "1.7"],
    comparator: "number_equal",
    hint: "On peut faire l’opération inverse.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Si x + 1,5 = 3,2, alors x = 3,2 - 1,5 = 1,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "addition", "defi"],
  },

  // =========================
  // DECIMAL_MULTIPLIER
  // =========================
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 0,5 × 4",
    format: "short",
    expected: ["2", "2,0", "2.0"],
    comparator: "number_equal",
    hint: "0,5 c’est la moitié.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,5 est la moitié de 1. Quatre moitiés font 2. Donc 0,5 × 4 = 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 1,5 × 2",
    format: "short",
    expected: ["3", "3,0", "3.0"],
    comparator: "number_equal",
    hint: "1,5 + 1,5 = 3.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Multiplier par 2 revient à doubler. Le double de 1,5 est 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 2,4 × 3",
    format: "short",
    expected: ["7,2", "7.2"],
    comparator: "number_equal",
    hint: "2,4 + 2,4 + 2,4.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("2,4 × 3 = 2,4 + 2,4 + 2,4 = 7,2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 0,25 × 4",
    format: "short",
    expected: ["1", "1,0", "1.0"],
    comparator: "number_equal",
    hint: "Un quart multiplié par 4 donne 1.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,25 représente un quart. Quatre quarts font 1. Donc 0,25 × 4 = 1.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de 2,5 × 2 ?",
    format: "qcm",
    choices: ["4,5", "5", "0,5", "25"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Doubler 2,5 donne 5.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Multiplier par 2 revient à doubler. Le double de 2,5 est 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 5,
    theme: "neutral",
    text: "Un objet coûte 2,5 €. Combien coûtent 6 objets ?",
    format: "short",
    expected: ["15", "15,0", "15.0"],
    comparator: "number_equal",
    hint: "Multiplie 2,5 par 6.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Chaque objet coûte 2,5 €. Pour 6 objets, on calcule 2,5 × 6 = 15. Le total est donc 15 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "multiplication", "defi"],
  },

  // =========================
  // DECIMAL_DIVISER_PAR_ENTIER
  // =========================
  {
    kind: "fixed",
    id: "decimal_divide_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 3,6 ÷ 2",
    format: "short",
    expected: ["1,8", "1.8", "1,80", "1.80"],
    comparator: "number_equal",
    hint: "Partager 3,6 en 2 parts égales.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("3,6 partagé en 2 parts égales donne 1,8 dans chaque part. Donc 3,6 ÷ 2 = 1,8.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 4,8 ÷ 4",
    format: "short",
    expected: ["1,2", "1.2", "1,20", "1.20"],
    comparator: "number_equal",
    hint: "48 dixièmes ÷ 4 = 12 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("4,8 = 48 dixièmes. 48 dixièmes divisés par 4 donnent 12 dixièmes, soit 1,2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 5,6 ÷ 4",
    format: "short",
    expected: ["1,4", "1.4"],
    comparator: "number_equal",
    hint: "56 dixièmes ÷ 4 = 14 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("56 dixièmes divisés par 4 donnent 14 dixièmes, soit 1,4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 9,6 ÷ 3",
    format: "short",
    expected: ["3,2", "3.2"],
    comparator: "number_equal",
    hint: "96 dixièmes ÷ 3 = 32 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("96 dixièmes divisés par 3 donnent 32 dixièmes, soit 3,2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de 2,4 ÷ 2 ?",
    format: "qcm",
    choices: ["1,2", "0,12", "2,2", "1,4"],
    expected: ["1,2"],
    comparator: "mcq_exact",
    hint: "2,4 partagé en 2 fait 1,2.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Partager 2,4 en 2 parts égales donne 1,2 dans chaque part.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 5,
    theme: "neutral",
    text: "On partage 7,5 litres d’eau en 5 bouteilles. Combien dans chaque bouteille ?",
    format: "short",
    expected: ["1,5", "1.5"],
    comparator: "number_equal",
    hint: "Calcule 7,5 ÷ 5.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Si 7,5 litres sont partagés dans 5 bouteilles, on calcule 7,5 ÷ 5 = 1,5. Chaque bouteille contient donc 1,5 litre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "division", "defi"],
  },

  // =========================
  // DECIMAL_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "decimal_calcul_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 1,
    theme: "neutral",
    text: "10 % de 60 = ?",
    format: "qcm",
    choices: ["3", "6", "10", "60"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "10 % = 0,1.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("10 % signifie 10 sur 100, donc 0,1. Ainsi 0,1 × 60 = 6.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "defi", "pourcentage", "calcul"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 1,
    theme: "neutral",
    text: "D’où vient le mot « décimal » ?",
    format: "qcm",
    choices: ["du nombre 2", "du nombre 5", "du nombre 10", "du nombre 100"],
    expected: ["du nombre 10"],
    comparator: "mcq_exact",
    hint: "Décimal vient de « dix ».",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Le mot « décimal » vient du latin lié au nombre dix. Notre système d’écriture usuel est un système en base 10.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "defi", "culture", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 2,
    theme: "neutral",
    text: "La soustraction de deux nombres entiers peut-elle donner un nombre décimal ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Entier - entier = entier.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Quand on soustrait deux nombres entiers, le résultat reste un entier. On n’obtient donc pas de nombre décimal dans ce cas.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_calcul_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Comment partager un gâteau en 6 parts parfaitement égales ?",
    format: "qcm",
    choices: [
      "couper au hasard",
      "faire 3 parts",
      "faire des angles de 60°",
      "faire 2 parts",
    ],
    expected: ["faire des angles de 60°"],
    comparator: "mcq_exact",
    hint: "360 ÷ 6 = 60°.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Un cercle mesure 360°. Pour faire 6 parts égales, on partage 360 par 6, ce qui donne 60°. Il faut donc faire des secteurs de 60°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "defi", "geometrie", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, un sentier fait 2,5 km. Que représente le 0,5 ?",
    format: "qcm",
    choices: ["5 m", "50 m", "500 m", "5 km"],
    expected: ["500 m"],
    comparator: "mcq_exact",
    hint: "1 km = 1000 m.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,5 km signifie la moitié d’un kilomètre. Or 1 km = 1000 m, donc 0,5 km = 500 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "defi", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un requin nage à 2,75 m/s. Pourquoi utilise-t-on 2,75 et pas 2 ou 3 ?",
    format: "qcm",
    choices: [
      "pour faire joli",
      "pour aller plus vite",
      "pour être plus précis",
      "pour simplifier",
    ],
    expected: ["pour être plus précis"],
    comparator: "mcq_exact",
    hint: "Les décimaux permettent une mesure plus fine.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("2,75 est plus précis que 2 ou 3. Les nombres décimaux servent justement à donner une valeur plus exacte.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "defi", "sens", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_calcul_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "L’addition est de 20 €. Tu laisses 5 % de pourboire. Combien vaut le pourboire ?",
    format: "qcm",
    choices: ["0,5 €", "1 €", "5 €", "10 €"],
    expected: ["1 €"],
    comparator: "mcq_exact",
    hint: "5 %, c'est 5 pour cent : 5 centièmes, soit 0,05.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("5 % de 20 €, c’est 0,05 × 20 = 1 €. Le pourboire est donc de 1 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "defi", "pourcentage", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_calcul_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un cercle, combien mesure chaque part si on le coupe en 6 parts égales ?",
    format: "qcm",
    choices: ["30°", "45°", "60°", "90°"],
    expected: ["60°"],
    comparator: "mcq_exact",
    hint: "360 ÷ 6.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Un cercle complet mesure 360°. En le partageant en 6 parts égales, on obtient 360 ÷ 6 = 60°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "defi", "geometrie", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi le système décimal (base 10) est-il utilisé ?",
    format: "qcm",
    choices: [
      "pour compliquer",
      "pour écrire plus",
      "pour simplifier les calculs",
      "pour faire joli",
    ],
    expected: ["pour simplifier les calculs"],
    comparator: "mcq_exact",
    hint: "Le regroupement par 10 est pratique.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Le système décimal est pratique car il permet d’écrire les nombres et de faire les calculs simplement avec des regroupements par 10, 100, 1000, etc.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimal_nombre", "defi", "raisonnement", "qcm"],
  },

  // =========================
  // TEMPLATES - DECIMAL_LIRE_ECRIRE
  // =========================
  {
    kind: "template",
    id: "decimal_lire_ecrire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    hint: "Un dixième se place juste après la virgule : 7/10 = 0,7.",
    tags: ["decimal_nombre", "ecriture", "template"],
    generate: () => genLireEcrire(1),
  },
  {
    kind: "template",
    id: "decimal_lire_ecrire_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Dix dixièmes font une unité ; cent centièmes font une unité.",
    tags: ["decimal_nombre", "ecriture", "template"],
    generate: () => genLireEcrire(2),
  },
  {
    kind: "template",
    id: "decimal_lire_ecrire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère le rang de chaque chiffre : dixièmes juste après la virgule, puis centièmes.",
    tags: ["decimal_nombre", "ecriture", "qcm", "template"],
    generate: () => genLireEcrire(2, true),
  },

  // =========================
  // TEMPLATES - DECIMAL_RANG
  // =========================
  {
    kind: "template",
    id: "decimal_rang_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 1,
    theme: "neutral",
    hint: "Le chiffre des dixièmes est le premier après la virgule.",
    tags: ["decimal_nombre", "rang", "template"],
    generate: () => genRang(1),
  },
  {
    kind: "template",
    id: "decimal_rang_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Pars de la virgule : dixièmes, centièmes, millièmes à droite ; unités, dizaines à gauche.",
    tags: ["decimal_nombre", "rang", "template"],
    generate: () => genRang(2),
  },
  {
    kind: "template",
    id: "decimal_rang_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 3,
    theme: "neutral",
    hint: "Après la virgule : dixièmes, puis centièmes, puis millièmes. Avant : unités, puis dizaines.",
    tags: ["decimal_nombre", "rang", "template"],
    generate: () => genRang(3),
  },

  // =========================
  // TEMPLATES - DECIMAL_COMPARER
  // =========================
  {
    kind: "template",
    id: "decimal_compare_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "Compare d’abord les dixièmes, puis les centièmes.",
    tags: ["decimal_nombre", "comparaison", "template"],
    generate: () => genComparer(1, Math.random() < 0.4),
  },
  {
    kind: "template",
    id: "decimal_compare_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le plus petit n’est pas toujours celui qui a le plus de chiffres.",
    tags: ["decimal_nombre", "comparaison", "template"],
    generate: () => genComparer(2),
  },
  {
    kind: "template",
    id: "decimal_compare_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Si les dixièmes sont identiques, compare les centièmes.",
    tags: ["decimal_nombre", "comparaison", "qcm", "template"],
    generate: () => genComparer(2, true),
  },
  {
    kind: "template",
    id: "decimal_compare_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare rang par rang : partie entière, puis dixièmes, puis centièmes. Le nombre de chiffres ne compte pas.",
    tags: ["decimal_nombre", "comparaison", "template"],
    generate: () => genComparer(3, Math.random() < 0.6),
  },

  // =========================
  // TEMPLATES - DECIMAL_ADDITIONNER
  // =========================
  {
    kind: "template",
    id: "decimal_add_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Aligne les virgules.",
    tags: ["decimal_nombre", "addition", "template"],
    generate: () => genAddition(2),
  },
  {
    kind: "template",
    id: "decimal_add_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Aligne les virgules ; tu peux écrire 2,5 sous la forme 2,50 pour avoir autant de chiffres après la virgule.",
    tags: ["decimal_nombre", "addition", "template"],
    generate: () => genAddition(3),
  },
  {
    kind: "template",
    id: "decimal_add_reunion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 4,
    theme: "neutral",
    hint: "Aligne les virgules, puis additionne rang par rang.",
    // 06/10/2026 : le snack réunionnais reste UN contexte parmi seize (ADDITIONS).
    tags: ["decimal_nombre", "addition", "template"],
    generate: () => genAddition(4),
  },
  {
    kind: "template",
    id: "decimal_add_tpl_et5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche ce qu'il faut ajouter : une soustraction le donne, une addition le vérifie.",
    tags: ["decimal_nombre", "addition", "template"],
    generate: () => genAddition(5),
  },

  // =========================
  // TEMPLATES - DECIMAL_MULTIPLIER
  // =========================
  {
    kind: "template",
    id: "decimal_multiply_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Vois cela comme une addition répétée.",
    tags: ["decimal_nombre", "multiplication", "template"],
    generate: () => genMultiplication(3),
  },
  {
    kind: "template",
    id: "decimal_multiply_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 4,
    theme: "neutral",
    hint: "× 10 : chaque chiffre devient dix fois plus grand. Sinon, compte en dixièmes ou en centièmes.",
    tags: ["decimal_nombre", "multiplication", "template"],
    generate: () => genMultiplication(4),
  },
  {
    kind: "template",
    id: "decimal_multiply_reunion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 5,
    theme: "neutral",
    hint: "Multiplie le prix d'un objet par le nombre d'objets.",
    // 06/10/2026 : l'ananas du marché forain reste UN contexte parmi dix-sept (PRODUITS).
    tags: ["decimal_nombre", "multiplication", "template"],
    generate: () => genMultiplication(5),
  },

  // =========================
  // TEMPLATES - DECIMAL_DIVISER_PAR_ENTIER
  // =========================
  {
    kind: "template",
    id: "decimal_divide_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 3,
    theme: "neutral",
    hint: "On partage en parts égales.",
    tags: ["decimal_nombre", "division", "template"],
    generate: () => genDivision(3),
  },
  {
    kind: "template",
    id: "decimal_divide_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche combien vaut une part.",
    tags: ["decimal_nombre", "division", "template"],
    generate: () => genDivision(4),
  },
  {
    kind: "template",
    id: "decimal_divide_reunion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 5,
    theme: "neutral",
    hint: "On partage la quantité totale en parts égales : c'est une division.",
    tags: ["decimal_nombre", "division", "template"],
    generate: () => genDivision(5),
  },
  // =========================
  // DEFIS — LES GENERATEURS MANQUANTS
  //
  // ⛔ AJOUTES LE 22/08/2026. `decimal_defi` et `decimal_calcul_defi` n'avaient
  // que des items figes : cinq et quatre. La regle d'or de Frederic est qu'un
  // eleve ne doit pas retomber sur la meme question en dix minutes — soit dix
  // variantes minimum par micro, donc un generateur, jamais un item seul.
  //
  // Les deux micros sont CONCEPTUELLES : on parametre la situation et les
  // nombres, le raisonnement ne bouge pas, et la question cesse d'etre
  // reconnaissable.
  // =========================
  {
    kind: "template",
    id: "decimal_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Plus de chiffres après la virgule ne veut pas dire plus grand.",
    tags: ["decimal_nombre", "defi", "template"],
    // Le piège du programme (2,5 > 2,45 alors que 45 > 5), jugé dans la bouche d'un camarade.
    generate: () => genDefi(3),
  },
  {
    kind: "template",
    id: "decimal_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris les nombres avec le même nombre de chiffres après la virgule : 4,3 = 4,30.",
    tags: ["decimal_nombre", "defi", "template"],
    // 06/10/2026 : l'ancienne question ouverte (3 phrases fixes) revenait à
    // l'identique ; on intercale désormais des nombres, ce qui fait raisonner pareil.
    generate: () => genDefi(4),
  },
  {
    kind: "template",
    id: "decimal_defi_tpl_et1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 1,
    theme: "neutral",
    hint: "Place chaque chiffre à son rang : les dixièmes juste après la virgule.",
    tags: ["decimal_nombre", "defi", "template"],
    generate: () => genDefi(1),
  },
  {
    kind: "template",
    id: "decimal_defi_tpl_et2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Le chiffre le plus à gauche compte le plus.",
    tags: ["decimal_nombre", "defi", "template"],
    generate: () => genDefi(2),
  },
  {
    kind: "template",
    id: "decimal_defi_tpl_et5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par l'indice qui donne un chiffre directement.",
    tags: ["decimal_nombre", "defi", "template"],
    generate: () => genDefi(5),
  },
  {
    kind: "template",
    id: "decimal_calcul_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "10 % d'un nombre, c'est ce nombre divisé par 10 ; 50 %, la moitié ; 25 %, le quart.",
    tags: ["decimal_calcul", "defi", "template"],
    generate: () => genCalculDefi(3),
  },
  {
    kind: "template",
    id: "decimal_calcul_defi_tpl_et1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 1,
    theme: "neutral",
    hint: "La moitié, c'est ÷ 2 ; le quart, ÷ 4 ; le double, × 2.",
    tags: ["decimal_calcul", "defi", "template"],
    generate: () => genCalculDefi(1),
  },
  {
    kind: "template",
    id: "decimal_calcul_defi_tpl_et2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "10 %, c'est le dixième ; 50 %, la moitié ; 25 %, le quart.",
    tags: ["decimal_calcul", "defi", "template"],
    generate: () => genCalculDefi(2),
  },
  {
    kind: "template",
    id: "decimal_calcul_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Remplace chaque nombre par l'entier le plus proche, puis calcule de tête.",
    tags: ["decimal_calcul", "defi", "template", "ordre_de_grandeur"],
    // 06/10/2026 : l'ancienne question ouverte (3 phrases fixes) revenait à
    // l'identique ; son troisième cas (l'ordre de grandeur) devient un QCM tiré.
    generate: () => genCalculDefi(4),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DECIMAL_ARRONDIR — la valeur arrondie à l'unité, au dixième, au centième
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-N-entiers-9). Le BO
  // demande « donner la valeur arrondie à l'unité, au dixième, ou au centième
  // d'un nombre décimal » ET « déterminer ou connaître la valeur arrondie de
  // certains nombres non décimaux » : aucune micro de 6e ne le travaillait.
  //
  // ⭐ ARRONDIR N'EST PAS TRONQUER. Couper après le chiffre voulu donne la
  // troncature (12,78 → 12,7) ; arrondir demande de regarder le chiffre SUIVANT
  // et de choisir le plus proche des deux voisins (12,78 → 12,8). C'est la
  // confusion n°1 du chapitre, et elle a son item.
  //
  // ⭐ π EST DANS LE BO, nommément : « il sait que π n'est pas un nombre
  // décimal, et que 3,14 en est la valeur arrondie au centième ». C'est le seul
  // endroit de la 6e où l'élève rencontre un nombre dont l'écriture décimale ne
  // s'arrête jamais.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Donne la valeur arrondie de 12,7 à l'unité.",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Entre quels deux entiers se trouve 12,7 ? Duquel est-il le plus proche ?",
    explanation: explDecimal(
      "12,7 est compris entre les deux entiers 12 et 13. Il est à 0,7 de 12 et à seulement 0,3 de 13 : le plus proche est 13. La valeur arrondie de 12,7 à l'unité est donc 13."
    ),
    tags: ["decimal_nombre", "arrondir", "canvas", "short"],
    canvas: droiteZoom(12, 13, 0.5, [{ value: 12.7, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Donne la valeur arrondie de 4,382 au dixième.",
    format: "short",
    expected: ["4,4", "4.4", "4,40", "4.40"],
    comparator: "number_equal",
    hint: "Les deux dixièmes voisins sont 4,3 et 4,4.",
    explanation: explDecimal(
      "4,382 est compris entre les dixièmes 4,3 et 4,4. Pour choisir, on regarde le chiffre des centièmes : c'est 8, donc 8 ou plus, et on monte au dixième supérieur. La valeur arrondie au dixième est 4,4."
    ),
    tags: ["decimal_nombre", "arrondir", "canvas", "short"],
    canvas: droiteZoom(4.3, 4.4, 0.05, [{ value: 4.38, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Donne la valeur arrondie de 9,146 au centième.",
    format: "short",
    expected: ["9,15", "9.15"],
    comparator: "number_equal",
    hint: "Les deux centièmes voisins sont 9,14 et 9,15.",
    explanation: explDecimal(
      "9,146 est compris entre les centièmes 9,14 et 9,15. Le chiffre des millièmes est 6, donc 5 ou plus : on monte au centième supérieur. La valeur arrondie au centième est 9,15."
    ),
    tags: ["decimal_nombre", "arrondir", "short"],
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre π vaut 3,141592… et son écriture décimale ne s'arrête jamais. Quelle est sa valeur arrondie au centième ?",
    format: "qcm",
    choices: ["3,14", "3,15", "3,1", "3,142"],
    expected: ["3,14"],
    comparator: "mcq_exact",
    hint: "Regarde le chiffre des millièmes de 3,141592…",
    explanation: explDecimal(
      "Arrondir au centième, c'est garder deux chiffres après la virgule. Les centièmes voisins sont 3,14 et 3,15 ; le chiffre des millièmes est 1, donc inférieur à 5, et on reste à 3,14. Attention : 3,1 est l'arrondi au DIXIÈME et 3,142 l'arrondi au MILLIÈME — ils répondent à une autre question. Et π n'est pas un nombre décimal : aucune écriture à virgule ne le donne exactement, 3,14 n'en est qu'une valeur approchée."
    ),
    tags: ["decimal_nombre", "arrondir", "pi", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la valeur arrondie de 3,96 au dixième ?",
    format: "qcm",
    choices: ["4", "3,9", "3,10", "3,96"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Le dixième juste au-dessus de 3,9 n'est pas 3,10.",
    explanation: explDecimal(
      "Les deux dixièmes voisins de 3,96 sont 3,9 et 4,0. Le chiffre des centièmes est 6, donc 5 ou plus : on monte, et 4,0 s'écrit 4. Le piège est d'écrire « 3,10 » en croyant qu'après 3,9 vient 3,10 : dans la partie décimale on ne compte pas comme avec des entiers, 3,10 vaut 3,1 et se trouve en dessous de 3,9."
    ),
    tags: ["decimal_nombre", "arrondir", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi 12,78 arrondi au dixième donne-t-il 12,8, et non 12,7 ?",
    format: "qcm",
    choices: [
      "parce que 12,78 est plus proche de 12,8 que de 12,7",
      "parce qu'on enlève simplement les chiffres après le dixième",
      "parce qu'on arrondit toujours vers le haut",
      "parce que 8 est le dernier chiffre écrit",
    ],
    expected: ["parce que 12,78 est plus proche de 12,8 que de 12,7"],
    comparator: "mcq_exact",
    hint: "Compare les deux écarts : 12,78 − 12,7 et 12,8 − 12,78.",
    explanation: explDecimal(
      "12,78 − 12,7 = 0,08 alors que 12,8 − 12,78 = 0,02 : 12,8 est bien le plus proche. Couper après le dixième donnerait 12,7 — c'est la TRONCATURE, pas l'arrondi. Et on n'arrondit pas toujours vers le haut : 12,73 s'arrondit en 12,7."
    ),
    tags: ["decimal_nombre", "arrondir", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "decimal_arrondir_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère les deux voisins, puis regarde le chiffre juste après le rang demandé.",
    tags: ["decimal_nombre", "arrondir", "template"],
    generate: () => genArrondir(3),
  },
  {
    kind: "template",
    id: "decimal_arrondir_tpl_et2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 2,
    theme: "neutral",
    hint: "Entre quels deux voisins se trouve le nombre ? Duquel est-il le plus proche ?",
    tags: ["decimal_nombre", "arrondir", "canvas", "template"],
    generate: () => genArrondir(2),
  },
  {
    kind: "template",
    id: "decimal_arrondir_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche les deux voisins, puis le chiffre juste après le rang demandé. Couper n'est pas arrondir.",
    tags: ["decimal_nombre", "arrondir", "template", "piege"],
    // 06/10/2026 : l'ancienne question ouverte (4 phrases fixes) revenait à
    // l'identique. Ses pièges (troncature, voisin) sont devenus des QCM tirés.
    generate: () => genArrondir(4),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DECIMAL_ENCADRER — encadrer et intercaler des nombres décimaux
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-N-entiers-10). Le coach
  // avait `entier_encadrer`, qui ne traite que les ENTIERS ; l'encadrement au
  // programme de 6e porte sur les décimaux, et personne ne le couvrait.
  //
  // ⭐ INTERCALER EST LA VRAIE NOUVEAUTÉ. Entre deux entiers consécutifs il n'y
  // a rien ; entre deux décimaux il y en a toujours une infinité. C'est ce qui
  // sépare définitivement les décimaux des entiers dans la tête de l'élève, et
  // c'est ce que le BO vise en demandant d'intercaler. L'erreur « il n'y a rien
  // entre 2,5 et 2,6 » a donc son item.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l'encadrement à l'unité : … < 7,38 < 8. Quel nombre manque ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "C'est la partie entière de 7,38.",
    explanation: explDecimal(
      "La partie entière de 7,38 est 7, et l'entier suivant est 8 : on écrit 7 < 7,38 < 8. Encadrer à l'unité, c'est trouver les deux entiers consécutifs entre lesquels le nombre se place."
    ),
    tags: ["decimal_nombre", "encadrer", "canvas", "short"],
    canvas: droiteZoom(7, 8, 0.5, [{ value: 7.38, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 3,
    theme: "neutral",
    text: "Complète l'encadrement au dixième : 7,3 < 7,38 < … . Quel nombre manque ?",
    format: "short",
    expected: ["7,4", "7.4", "7,40", "7.40"],
    comparator: "number_equal",
    hint: "Après 7,3 vient le dixième suivant, pas le centième suivant.",
    explanation: explDecimal(
      "Encadrer au dixième, c'est trouver les deux dixièmes consécutifs qui entourent le nombre. Après 7,3 vient 7,4 : on écrit 7,3 < 7,38 < 7,4. L'encadrement au dixième est plus serré que celui à l'unité — il donne une meilleure idée de la position du nombre."
    ),
    tags: ["decimal_nombre", "encadrer", "short"],
  },
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 3,
    theme: "neutral",
    text: "Intercale un nombre décimal entre 4,7 et 4,8.",
    format: "short",
    expected: [
      "4,75",
      "4.75",
      "4,71",
      "4,72",
      "4,73",
      "4,74",
      "4,76",
      "4,77",
      "4,78",
      "4,79",
      "4,705",
      "4,725",
      "4,755",
    ],
    comparator: "number_equal",
    hint: "Ajoute un chiffre de plus après la virgule.",
    explanation: explDecimal(
      "4,7 s'écrit aussi 4,70 et 4,8 s'écrit 4,80. Entre 70 centièmes et 80 centièmes, il y a 4,71 ; 4,72 ; … ; 4,79 : neuf réponses possibles rien qu'au centième, et bien d'autres au millième. Le plus simple est de prendre le milieu, 4,75."
    ),
    tags: ["decimal_nombre", "intercaler", "canvas", "short"],
    canvas: droiteZoom(4.7, 4.8, 0.01, []),
  },
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de nombres décimaux peut-on intercaler entre 2,5 et 2,6 ?",
    format: "qcm",
    choices: ["une infinité", "aucun, ils se suivent", "un seul : 2,55", "exactement neuf"],
    expected: ["une infinité"],
    comparator: "mcq_exact",
    hint: "Après les centièmes viennent les millièmes, puis les dix-millièmes…",
    explanation: explDecimal(
      "Au centième, on en trouve déjà neuf : 2,51 à 2,59. Mais on peut continuer au millième — 2,551 ; 2,552 ; … — puis au dix-millième, sans jamais s'arrêter : il y en a une INFINITÉ. C'est la grande différence avec les entiers, où 2 et 3 n'ont rien entre eux."
    ),
    tags: ["decimal_nombre", "intercaler", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 4,
    theme: "neutral",
    text: "Lequel de ces encadrements de 5,206 est CORRECT ?",
    format: "qcm",
    choices: [
      "5,20 < 5,206 < 5,21",
      "5,20 < 5,206 < 5,26",
      "5,2 < 5,206 < 5,3",
      "5,206 < 5,21 < 5,22",
    ],
    expected: ["5,20 < 5,206 < 5,21"],
    comparator: "mcq_exact",
    hint: "Un encadrement au centième utilise deux centièmes qui se suivent.",
    explanation: explDecimal(
      "5,206 se place entre les centièmes 5,20 et 5,21 : c'est l'encadrement au centième, le plus serré des quatre. « 5,20 < 5,206 < 5,26 » est vrai mais bien plus large, ce n'est pas un encadrement au centième. « 5,2 < 5,206 < 5,3 » est l'encadrement au dixième. La dernière ligne n'encadre rien : 5,206 y est en dehors."
    ),
    tags: ["decimal_nombre", "encadrer", "qcm"],
  },
  {
    kind: "template",
    id: "decimal_encadrer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche les deux voisins consécutifs au rang demandé.",
    tags: ["decimal_nombre", "encadrer", "template"],
    generate: () => genEncadrer(3),
  },
  {
    kind: "template",
    id: "decimal_encadrer_tpl_et2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 2,
    theme: "neutral",
    hint: "À l'unité : les deux nombres entiers qui se suivent et entourent le nombre.",
    tags: ["decimal_nombre", "encadrer", "canvas", "template"],
    generate: () => genEncadrer(2),
  },
  {
    kind: "template",
    id: "decimal_encadrer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Un encadrement au dixième utilise deux dixièmes qui se suivent ; entre deux dixièmes, il y a des centièmes.",
    tags: ["decimal_nombre", "encadrer", "intercaler", "template"],
    // 06/10/2026 : l'ancienne question ouverte (3 phrases fixes) revenait à
    // l'identique ; on choisit désormais le bon encadrement, ou on intercale.
    generate: () => genEncadrer(4),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DECIMAL_MULTIPLIER_PAR_01 — multiplier par 0,1 · 0,01 · 0,001
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-N-entiers-12) : « multiplier
  // un nombre entier ou un nombre décimal par 0,1, par 0,01, et par 0,001 »,
  // « connaître le lien avec la division par 10, 100 et par 1 000 ».
  //
  // ⭐ RANGÉE DANS `decimal_calcul`, PAS DANS `decimal_nombre` : c'est un
  // calcul, pas une façon de lire un nombre. Elle vient juste après
  // `decimal_multiplier`, dont elle est le cas particulier le plus utile.
  //
  // ⭐ LES AUTOMATISMES DU BO SONT ICI, mot pour mot : « l'élève restitue de
  // manière automatique les équivalences 1/10 = 0,1 ; 1/100 = 0,01 ;
  // 1/1000 = 0,001 ». Multiplier par 0,1, c'est donc prendre UN DIXIÈME —
  // exactement diviser par 10.
  //
  // ⚠️ L'OBSTACLE EST UNE CROYANCE, pas une technique : « multiplier rend plus
  // grand » est vrai depuis le CP et devient faux ici. Deux items l'attaquent
  // de face.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 37 × 0,1",
    format: "short",
    expected: ["3,7", "3.7", "3,70", "3.70"],
    comparator: "number_equal",
    hint: "0,1 c'est un dixième : prendre 0,1 fois un nombre, c'est en prendre le dixième.",
    explanation: explDecimal(
      "0,1, c'est un dixième. Multiplier par 0,1, c'est donc prendre le dixième du nombre, autrement dit le diviser par 10 : chaque chiffre prend une valeur dix fois plus petite et recule d'un rang (les dizaines deviennent des unités, les unités des dixièmes). 37 ÷ 10 = 3,7. Raccourci : la virgule se déplace d'un rang vers la gauche."
    ),
    tags: ["decimal_calcul", "multiplier_01", "short"],
  },
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 5,2 × 0,01",
    format: "short",
    expected: ["0,052", "0.052"],
    comparator: "number_equal",
    hint: "0,01 c'est un centième : on divise par 100.",
    explanation: explDecimal(
      "0,01, c'est un centième. Multiplier par 0,01, c'est diviser par 100 : 5,2 ÷ 100 = 0,052. Les chiffres 5 et 2 reculent de deux rangs — le 5 passe des unités aux centièmes."
    ),
    tags: ["decimal_calcul", "multiplier_01", "short"],
  },
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 3,
    theme: "neutral",
    text: "Multiplier un nombre par 0,001 revient à…",
    format: "qcm",
    choices: [
      "le diviser par 1 000",
      "le diviser par 100",
      "le multiplier par 1 000",
      "lui ajouter trois zéros",
    ],
    expected: ["le diviser par 1 000"],
    comparator: "mcq_exact",
    hint: "Combien vaut 0,001 sous forme de fraction ?",
    explanation: explDecimal(
      "0,001, c'est un millième. Prendre 0,001 fois un nombre, c'est en prendre un millième, donc le diviser par 1 000 : 4 × 0,001 = 0,004. Multiplier par 0,001 REND PLUS PETIT — c'est l'inverse de multiplier par 1 000."
    ),
    tags: ["decimal_calcul", "multiplier_01", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 0,1 × 0,1",
    format: "qcm",
    choices: ["0,01", "0,2", "0,1", "1"],
    expected: ["0,01"],
    comparator: "mcq_exact",
    hint: "Un dixième d'un dixième, c'est quoi ?",
    explanation: explDecimal(
      "0,1 × 0,1, c'est prendre le dixième de 0,1, soit 0,1 ÷ 10 = 0,01. Autrement dit, un dixième d'un dixième est un centième. Le piège est de répondre 0,2 en ADDITIONNANT les deux nombres au lieu de les multiplier."
    ),
    tags: ["decimal_calcul", "multiplier_01", "automatisme", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 4,
    theme: "neutral",
    text: "Sans poser le calcul : le résultat de 250 × 0,1 est-il plus grand ou plus petit que 250 ?",
    format: "qcm",
    choices: [
      "plus petit, car on prend seulement un dixième de 250",
      "plus grand, car une multiplication agrandit toujours",
      "égal à 250, car multiplier par 0,1 ne change rien",
      "plus grand, car 250 est un grand nombre",
    ],
    expected: ["plus petit, car on prend seulement un dixième de 250"],
    comparator: "mcq_exact",
    hint: "0,1 est plus petit que 1.",
    explanation: explDecimal(
      "250 × 0,1 = 25, dix fois moins que 250. Multiplier par un nombre PLUS PETIT QUE 1 rend le résultat plus petit : c'est vrai pour 0,1 comme pour 0,5, qui donne la moitié. La règle « multiplier agrandit » n'était valable que tant qu'on multipliait par des entiers supérieurs à 1."
    ),
    tags: ["decimal_calcul", "multiplier_01", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "decimal_mult01_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace la multiplication par la division correspondante.",
    tags: ["decimal_calcul", "multiplier_01", "template"],
    // Une fois sur deux un entier, une fois sur deux un décimal : le BO demande les deux.
    generate: () => genFois01(3),
  },
  {
    kind: "template",
    id: "decimal_mult01_tpl_et2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 2,
    theme: "neutral",
    hint: "0,1, c'est un dixième : multiplier par 0,1, c'est diviser par 10.",
    tags: ["decimal_calcul", "multiplier_01", "template"],
    generate: () => genFois01(2),
  },
  {
    kind: "template",
    id: "decimal_mult01_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 4,
    theme: "neutral",
    hint: "0,1 c'est un dixième, 0,01 un centième, 0,001 un millième : le résultat est plus petit.",
    tags: ["decimal_calcul", "multiplier_01", "template", "piege"],
    // 06/10/2026 : l'ancienne question ouverte (4 phrases fixes, avec « 1/100 »)
    // revenait à l'identique ; ses pièges deviennent des QCM tirés.
    generate: () => genFois01(4),
  },
];
