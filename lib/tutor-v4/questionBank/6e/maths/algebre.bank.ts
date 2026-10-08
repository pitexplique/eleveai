// ─── Algèbre : problèmes à nombres inconnus et motifs (6e) ─────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). « Algèbre » est une section du
// domaine « Nombres, calcul et résolution de problèmes » du programme de 6e, et
// le coach n'en avait AUCUNE micro. C'est pourtant le chapitre qui prépare tout
// le calcul littéral de 5e : c'est ici que l'élève rencontre pour la première
// fois un nombre qu'il ne connaît pas.
//
// Les objectifs, mot pour mot (Exemples pour la mise en œuvre des programmes,
// 6e, 2025, p. 8) :
//   · « Utiliser des modèles pré-algébriques pour résoudre des problèmes
//     algébriques » ;
//   · « Identifier la structure d'un motif évolutif en repérant une régularité
//     et en identifiant une structure ».
//
// ⭐ « PRÉ-ALGÉBRIQUE » VEUT DIRE : SANS LETTRE. En 6e on ne pose pas d'équation
// et on n'écrit pas x. On DESSINE la relation — c'est le schéma en barres — ou
// on l'échange contre une autre. La lettre viendra en 5e, et elle viendra plus
// facilement si le dessin a été fait avant.
//
// Les deux exemples de réussite du BO sont ici :
//   · la prime de 320 € répartie entre trois coureurs, l'or valant 70 € de plus
//     que l'argent et le bronze 80 € de moins ;
//   · les maisons en allumettes — 6 pour la première, puis 5 de plus à chaque
//     fois — dont on demande le nombre pour 25 maisons.
//
// ⚠️ `SuiteCanvas` imprime « Suite » en titre EN DUR et étiquette ses cases
// « terme 1, terme 2 ». C'est un défaut partout ailleurs ; ici c'est exact, un
// motif évolutif EST une suite. C'est le seul chapitre de 6e où ce canvas est
// à sa place.

// ⚠️ `SuiteCanvasData` n'est PAS réexporté par `types.ts` (il ne vit que dans
// `types_canvas.ts`) : le type du motif se déduit donc de l'objet littéral.
import type {
  TutorBankItemV4,
  SchemaBarreCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, tirer, deuxPrenoms, il, Il, deP, Maj } from "./fractions.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : un problème à nombres inconnus se traduit par un SCHÉMA avant de se calculer — en 6e, sans lettre.\n\n" +
    "Méthode : on dessine ce qu'on sait, on repère la part qui se répète, puis on retire ou on ajoute ce qui déséquilibre.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/** Le schéma en barres : le modèle pré-algébrique du programme. */
function barres(
  total: string,
  parts: { label: string; value?: string; unknown?: boolean }[],
  question: string
): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total,
    parts,
    questionLabel: question,
    size: { width: 320, height: 190 },
  };
}

/** Le motif évolutif, terme après terme, avec ses flèches de passage. */
function motif(termes: (number | string)[], pas: string, regle?: string) {
  return {
    kind: "suite" as const,
    theme: "nombre" as const,
    terms: termes,
    arrows: Array(Math.max(0, termes.length - 1)).fill(pas),
    rule: regle,
    display: { showArrows: true, showRule: Boolean(regle), showLabels: true },
  };
}

/** Le tableau du BO : on organise ses calculs pour voir la structure. */
function tableauMotif(lignes: [string, string][]): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    headers: ["Nombre de maisons", "Nombre d’allumettes"],
    rows: lignes.map(([a, b]) => ({ values: [a, b] })),
  };
}

/* ⭐ 06/10/2026 — VARIER LA PHRASE (situation × tournure × prénom), pas
   seulement les nombres. Mesuré le 05/10 : 6 à 23 squelettes par micro. Chaque
   gabarit a son correcteur dans correcteurs/algebre.ts.
   ⛔ Ici on n'est PAS dans les fractions : une division s'écrit « ÷ », jamais
   « a/b » (Frédéric : « les élèves ne savent pas que 5/2 signifie 5 : 2 »). */
type Qui = (typeof PRENOMS)[number];
/** Des choses qu'on possède et qu'on compte : « ont ensemble 48 billes ». */
const COLLECTIONS_ALG: { pl: string; u?: string }[] = [
  { pl: "billes" }, { pl: "cartes" }, { pl: "timbres" }, { pl: "autocollants" }, { pl: "perles" },
  { pl: "coquillages" }, { pl: "livres" }, { pl: "figurines" }, { pl: "bonbons" }, { pl: "graines" },
  { pl: "photos" }, { pl: "badges" }, { pl: "€", u: "€" }, { pl: "points" }, { pl: "crayons" },
];
/** « que Tom », « qu’Inès ». */
const que = (t: string) => (/^[AEIOUÉÈÊÂÎÔ]/.test(t) ? `qu’${t}` : `que ${t}`);
/** « 12 billes », « 12 € ». */
const quantite = (n: number, c: { pl: string }) => `${n} ${c.pl}`;
/** « Combien de billes », « Combien d’autocollants », « Combien d’euros ». */
const combienDe = (c: { pl: string; u?: string }) =>
  c.u ? "Combien d’euros" : /^[aeiouéè]/.test(c.pl) ? `Combien d’${c.pl}` : `Combien de ${c.pl}`;
/** La réponse : « 15 € » si la situation parle d'euros, sinon le nombre. */
const reponse = (n: number, c: { u?: string }) => (c.u ? [`${n} ${c.u}`, String(n)] : [String(n)]);
/** Des articles de magasin, avec un prix unitaire plausible (en euros entiers). */
const ARTICLES: { un: string; pl: string; f: boolean; prix: [number, number] }[] = [
  { un: "un cahier", pl: "cahiers", f: false, prix: [2, 5] },
  { un: "un stylo", pl: "stylos", f: false, prix: [1, 4] },
  { un: "une place de cinéma", pl: "places de cinéma", f: true, prix: [6, 12] },
  { un: "un ballon", pl: "ballons", f: false, prix: [8, 25] },
  { un: "un livre", pl: "livres", f: false, prix: [6, 18] },
  { un: "une boîte de crayons", pl: "boîtes de crayons", f: true, prix: [3, 9] },
  { un: "un pot de peinture", pl: "pots de peinture", f: false, prix: [4, 15] },
  { un: "un plant de tomate", pl: "plants de tomate", f: false, prix: [2, 5] },
  { un: "un billet de musée", pl: "billets de musée", f: false, prix: [5, 12] },
  { un: "une gourde", pl: "gourdes", f: true, prix: [6, 15] },
  { un: "un jeu de cartes", pl: "jeux de cartes", f: false, prix: [3, 10] },
  { un: "une corde à sauter", pl: "cordes à sauter", f: true, prix: [4, 9] },
  { un: "un ticket de manège", pl: "tickets de manège", f: false, prix: [2, 6] },
  { un: "une paire de chaussettes", pl: "paires de chaussettes", f: true, prix: [3, 8] },
  { un: "un melon", pl: "melons", f: false, prix: [2, 5] },
  { un: "un ananas", pl: "ananas", f: false, prix: [2, 5] },
];
/**
 * Les anciennes questions d'explication (gabarits « _tpl_ouverte »).
 * 08/10/2026 : question ouverte rendue précise (Frédéric : « les questions open
 * doivent être précises », puis « précises ET SIMPLES »). Avant : « Explique… »
 * corrigé par UN mot-clé, qui laissait tout passer. Désormais chaque cas est un
 * calcul précis à réponse unique : une réponse courte (nombre), ou un QCM dont
 * les leurres sont de vraies erreurs d'élève.
 */
function precise(c: {
  q: string;
  r: string;
  qcm?: { bonne: string; pieges: string[] };
  rep?: number;
  u?: string;
  canvas?: SchemaBarreCanvasData;
}) {
  const fig = c.canvas ? { canvas: c.canvas } : {};
  if (c.qcm)
    return { text: c.q, format: "qcm" as const, choices: shuffle([c.qcm.bonne, ...c.qcm.pieges]), expected: [c.qcm.bonne], comparator: "mcq_exact" as const, explanation: expl(c.r), ...fig };
  const rep = c.rep as number;
  return {
    text: c.q,
    format: "short" as const,
    expected: c.u ? [`${rep} ${c.u}`, String(rep)] : [String(rep)],
    comparator: "number_equal" as const,
    explanation: expl(c.r),
    ...fig,
  };
}
/** « de cubes », « d’allumettes ». */
const deM = (m: { unite: string }) => (/^[aeiouéè]/.test(m.unite) ? `d’${m.unite}` : `de ${m.unite}`);
/** « un cahier » → « cahier ». */
const sing = (a: { un: string }) => a.un.replace(/^une? /, "");
/** Des motifs qui grandissent d'étape en étape. */
const MOTIFS: { nom: string; unite: string }[] = [
  { nom: "maisons en allumettes", unite: "allumettes" },
  { nom: "carrés en bâtonnets", unite: "bâtonnets" },
  { nom: "tours de cubes", unite: "cubes" },
  { nom: "tables mises bout à bout", unite: "chaises" },
  { nom: "triangles en pailles", unite: "pailles" },
  { nom: "murets de briques", unite: "briques" },
  { nom: "colliers de perles", unite: "perles" },
  { nom: "frises de carreaux", unite: "carreaux" },
  { nom: "rangées de jetons", unite: "jetons" },
  { nom: "guirlandes de fanions", unite: "fanions" },
  { nom: "barrières de piquets", unite: "piquets" },
  { nom: "pyramides de gobelets", unite: "gobelets" },
];

export const algebreBank: TutorBankItemV4[] = [
  // =========================
  // ALGEBRE_BARRES — dessiner la relation avant de calculer
  // =========================
  {
    kind: "fixed",
    id: "algebre_barres_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 3,
    theme: "neutral",
    text: "Deux nombres ont pour somme 48, et le plus grand dépasse le plus petit de 12. Quel est le plus petit ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Retire d'abord l'écart de 12 : il reste deux parts égales.",
    explanation: expl(
      "On dessine deux barres : la seconde dépasse la première de 12. Si on retire ces 12 du total, il reste 48 − 12 = 36 à partager en deux parts ÉGALES : 36 ÷ 2 = 18. Le plus petit vaut 18, le plus grand 18 + 12 = 30. Vérification : 18 + 30 = 48."
    ),
    tags: ["algebre_probleme", "barres", "canvas", "short"],
    canvas: barres(
      "48",
      [
        { label: "petit", unknown: true },
        { label: "petit + 12", unknown: true },
      ],
      "Le grand dépasse le petit de 12."
    ),
  },
  {
    kind: "fixed",
    id: "algebre_barres_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 5,
    theme: "neutral",
    text: "Pour une course cycliste, une prime totale de 320 € est répartie entre les trois premiers. La prime d'or vaut 70 € de plus que la prime d'argent, et la prime de bronze 80 € de moins que la prime d'argent. Quelle est la prime d'argent ?",
    format: "short",
    expected: ["110"],
    comparator: "number_equal",
    hint: "Enlève les 70 € en trop, remets les 80 € manquants : il reste trois parts égales.",
    explanation: expl(
      "Les trois barres valent chacune la prime d'argent, sauf que l'une dépasse de 70 et l'autre manque de 80. On corrige le total : 320 − 70 + 80 = 330. Il reste trois parts égales : 330 ÷ 3 = 110 €. La prime d'argent vaut 110 €, l'or 180 € et le bronze 30 €. Vérification : 180 + 110 + 30 = 320 €."
    ),
    tags: ["algebre_probleme", "barres", "canvas", "short"],
    canvas: barres(
      "320 €",
      [
        { label: "Or", unknown: true },
        { label: "Argent", unknown: true },
        { label: "Bronze", unknown: true },
      ],
      "Or = Argent + 70 · Bronze = Argent − 80"
    ),
  },
  {
    kind: "fixed",
    id: "algebre_barres_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 4,
    theme: "neutral",
    text: "Deux nombres ont pour somme 90, et le plus grand vaut le double du plus petit. Quel est le plus grand ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Le total vaut trois parts identiques.",
    explanation: expl(
      "Le petit fait une part, le grand en fait deux : le total vaut donc 3 parts. Une part vaut 90 ÷ 3 = 30, et le plus grand en vaut deux : 2 × 30 = 60. Vérification : 30 + 60 = 90."
    ),
    tags: ["algebre_probleme", "barres", "canvas", "short"],
    canvas: barres(
      "90",
      [
        { label: "petit", unknown: true },
        { label: "grand (2 parts)", unknown: true },
      ],
      "Le grand vaut le double du petit."
    ),
  },
  {
    kind: "fixed",
    id: "algebre_barres_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert un schéma en barres dans un problème à nombres inconnus ?",
    format: "qcm",
    choices: [
      "à voir les relations entre les nombres avant de calculer",
      "à mesurer les longueurs de l'énoncé",
      "à remplacer la réponse par un dessin",
      "à trouver le résultat sans faire aucun calcul",
    ],
    expected: ["à voir les relations entre les nombres avant de calculer"],
    comparator: "mcq_exact",
    hint: "Il traduit l'énoncé, il ne le remplace pas.",
    explanation: expl(
      "Le schéma en barres traduit les relations de l'énoncé — « plus grand de 12 », « le double », « il en reste » — en longueurs qu'on peut comparer. Il rend le raisonnement visible ; le calcul vient après, et il devient facile."
    ),
    tags: ["algebre_probleme", "barres", "qcm"],
  },
  {
    kind: "template",
    id: "algebre_barres_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 4,
    theme: "neutral",
    hint: "Retire l'écart du total : il reste deux parts égales.",
    tags: ["algebre_probleme", "barres", "template"],
    generate: () => {
      const petit = randomInt(5, 40);
      const ecart = randomInt(4, 30);
      const total = 2 * petit + ecart;
      const [x, y] = deuxPrenoms();
      const c = tirer(COLLECTIONS_ALG);
      const grand = Math.random() < 0.4;
      // y a l'écart de plus que x.
      const cas = randomInt(0, 3);
      const text =
        cas === 0
          ? `Deux nombres ont pour somme ${total}, et le plus grand dépasse le plus petit de ${ecart}. Quel est le plus ${grand ? "grand" : "petit"} ? ${x.p} dessine deux barres.`
          : cas === 1
            ? `${x.p} et ${y.p} ont ensemble ${quantite(total, c)}. ${y.p} en a ${ecart} de plus ${que(x.p)}. ${combienDe(c)} ${grand ? y.p : x.p} a-t-${il(grand ? y : x)} ?`
            : cas === 2
              ? `À eux deux, ${x.p} et ${y.p} ont ${quantite(total, c)}. ${x.p} en a ${ecart} de moins ${que(y.p)}. ${combienDe(c)} a ${grand ? y.p : x.p} ?`
              : `${y.p} a ${ecart} ${c.pl} de plus ${que(x.p)}. Ensemble, ${x.f && y.f ? "elles" : "ils"} ont ${quantite(total, c)}. Trouve combien en a ${grand ? y.p : x.p}.`;
      const qui = (p: Qui) => (cas === 0 ? (p === x ? "le petit" : "le grand") : p.p);
      return {
        text,
        format: "short",
        expected: reponse(grand ? petit + ecart : petit, c),
        comparator: "number_equal",
        explanation: expl(
          `On retire l'écart du total : ${total} − ${ecart} = ${2 * petit}. Il reste deux parts égales : ${2 * petit} ÷ 2 = ${petit}. ` +
            `${Maj(qui(x))} : ${petit}. ${Maj(qui(y))} : ${petit} + ${ecart} = ${petit + ecart}. Vérification : ${petit} + ${petit + ecart} = ${total}.`
        ),
        canvas: barres(
          `${total}${c.u && cas ? " €" : ""}`,
          [
            { label: qui(x), unknown: true },
            { label: `${qui(x)} + ${ecart}`, unknown: true },
          ],
          `${Maj(qui(y))} a ${ecart} de plus ${que(qui(x))}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_barres_tpl_multiple",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les parts : le petit en fait une, le grand plusieurs.",
    tags: ["algebre_probleme", "barres", "template"],
    generate: () => {
      const k = randomInt(2, 4);
      const part = randomInt(3, 25);
      const total = part * (k + 1);
      const [x, y] = deuxPrenoms();
      const c = tirer(COLLECTIONS_ALG);
      const fois = k === 2 ? `le double ${deP(x)}` : k === 3 ? `le triple ${deP(x)}` : `quatre fois plus ${que(x.p)}`;
      const kMot = ["", "", "deux", "trois", "quatre"][k];
      const grand = Math.random() < 0.5;
      const qui = grand ? y : x;
      const tournures = [
        `${x.p} et ${y.p} ont ensemble ${quantite(total, c)}. ${y.p} en a ${fois}. ${combienDe(c)} a ${qui.p} ?`,
        `À eux deux, ${x.p} et ${y.p} ont ${quantite(total, c)}. ${y.p} en a ${kMot} fois plus ${que(x.p)}. ${combienDe(c)} ${qui.p} a-t-${il(qui)} ?`,
        `${y.p} a ${kMot} fois plus ${c.u ? "d’euros" : /^[aeiouéè]/.test(c.pl) ? `d’${c.pl}` : `de ${c.pl}`} ${que(x.p)}. Ensemble, ${x.f && y.f ? "elles" : "ils"} ont ${quantite(total, c)}. Trouve la part ${deP(qui)}.`,
        `${x.p} dessine deux barres : la sienne, et celle ${deP(y)}, ${kMot} fois plus longue. Le total vaut ${quantite(total, c)}. ${combienDe(c)} pour ${qui.p} ?`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: reponse(grand ? k * part : part, c),
        comparator: "number_equal",
        explanation: expl(
          `${x.p} fait 1 part, ${y.p} en fait ${k} : le total vaut ${k + 1} parts égales. Une part : ${total} ÷ ${k + 1} = ${part}. ` +
            `${x.p} : ${part} ; ${y.p} : ${k} × ${part} = ${k * part}. Vérification : ${part} + ${k * part} = ${total}.`
        ),
        canvas: barres(
          `${total}${c.u ? " €" : ""}`,
          [
            { label: x.p, unknown: true },
            { label: `${y.p} (${k} parts)`, unknown: true },
          ],
          `${y.p} a ${k} fois plus ${que(x.p)}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_barres_tpl_trois_parts",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 5,
    theme: "neutral",
    hint: "Rends les trois barres égales : retire ce qui dépasse, remets ce qui manque.",
    tags: ["algebre_probleme", "barres", "template"],
    generate: () => {
      // Le problème des trois primes du BO, avec d'autres nombres et d'autres situations.
      const milieu = randomInt(20, 120);
      const plus = randomInt(5, 40);
      const moins = randomInt(5, milieu - 5);
      const total = 3 * milieu + plus - moins;
      const [x, y, z] = [tirer(PRENOMS), tirer(PRENOMS), tirer(PRENOMS)];
      const amis = Array.from(new Set([x.p, y.p, z.p])).length === 3 ? [x.p, y.p, z.p] : ["Léo", "Nina", "Sami"];
      const sit = tirer([
        { intro: `Une course cycliste partage une prime de ${total} € entre l’or, l’argent et le bronze.`, a: "l’or", b: "l’argent", c: "le bronze", u: "€", tout: `${total} €` },
        { intro: `Un tournoi partage ${total} points entre l’équipe bleue, l’équipe verte et l’équipe rouge.`, a: "l’équipe bleue", b: "l’équipe verte", c: "l’équipe rouge", u: "", tout: `${total} points` },
        { intro: `${amis[0]}, ${amis[1]} et ${amis[2]} se partagent ${total} billes.`, a: amis[0], b: amis[1], c: amis[2], u: "", tout: `${total} billes` },
        { intro: `La mairie partage ${total} € entre le club de foot, le club de judo et le club de danse.`, a: "le club de foot", b: "le club de judo", c: "le club de danse", u: "€", tout: `${total} €` },
        { intro: `Le collège partage ${total} livres entre la 6e A, la 6e B et la 6e C.`, a: "la 6e A", b: "la 6e B", c: "la 6e C", u: "", tout: `${total} livres` },
        { intro: `Une kermesse partage ${total} € de bénéfices entre trois associations : la chorale, le théâtre et la bibliothèque.`, a: "la chorale", b: "le théâtre", c: "la bibliothèque", u: "€", tout: `${total} €` },
      ]);
      const cible = randomInt(0, 2);
      const noms = [sit.a, sit.b, sit.c];
      const valeurs = [milieu + plus, milieu, milieu - moins];
      const question = tirer([
        `Combien reçoit ${noms[cible]} ?`,
        `Trouve la part de ${noms[cible]}.`,
        `Quelle est la part de ${noms[cible]} ? Fais un schéma en barres.`,
        `${x.p} cherche la part de ${noms[cible]}. Aide-${x.f ? "la" : "le"}.`,
      ]);
      return {
        text: `${sit.intro} ${Maj(sit.a)} reçoit ${plus} de plus ${que(sit.b)}, et ${sit.c} ${moins} de moins ${que(sit.b)}. ${question}`,
        format: "short",
        expected: sit.u ? [`${valeurs[cible]} ${sit.u}`, String(valeurs[cible])] : [String(valeurs[cible])],
        comparator: "number_equal",
        explanation: expl(
          `Trois barres de la taille de ${sit.b}, sauf que ${sit.a} dépasse de ${plus} et que ${sit.c} manque de ${moins}. ` +
            `On corrige le total : ${total} − ${plus} + ${moins} = ${3 * milieu}. Trois parts égales : ${3 * milieu} ÷ 3 = ${milieu}. ` +
            `${Maj(sit.a)} : ${milieu} + ${plus} = ${milieu + plus} ; ${sit.c} : ${milieu} − ${moins} = ${milieu - moins}. Vérification : ${milieu + plus} + ${milieu} + ${milieu - moins} = ${total}.`
        ),
        canvas: barres(
          sit.tout,
          [
            { label: Maj(sit.a), unknown: true },
            { label: Maj(sit.b), unknown: true },
            { label: Maj(sit.c), unknown: true },
          ],
          `${Maj(sit.a)} = ${sit.b} + ${plus} · ${Maj(sit.c)} = ${sit.b} − ${moins}`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_barres_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 5,
    theme: "neutral",
    hint: "Dessine les barres, puis retire ce qui dépasse.",
    tags: ["algebre_probleme", "barres", "template", "qcm"],
    // 08/10/2026 : question ouverte rendue précise (Frédéric : « les questions open doivent être précises »).
    // Avant : « Explique comment un schéma aide… », « Explique pourquoi on ajoute… »,
    // « pourquoi pas d'équation ? ». Désormais : le plus petit des deux nombres
    // (leurres : oublier l'écart, oublier de diviser, donner le plus grand), le
    // montant de la prime d'argent (réponse courte), une barre d'un schéma.
    // ⛔ Aucun QCM dont les choix sont des formules : l'élève calcule le NOMBRE.
    generate: () => {
      const cas = [
        () => {
          // Écart pair : S ÷ 2 (le leurre « oublier l'écart ») reste entier.
          const petit = randomInt(8, 40);
          let ecart = 2 * randomInt(2, 10);
          while (ecart === petit || ecart === 2 * petit) ecart = 2 * randomInt(2, 10);
          const S = 2 * petit + ecart;
          // Leurres : oublier de diviser, donner le plus grand, oublier l'écart (tous distincts).
          const pieges = [S - ecart, petit + ecart, S / 2].map(String);
          return {
            q: `Deux nombres ont pour somme ${S}. Le plus grand dépasse le plus petit de ${ecart}. Quel est le plus petit ?`,
            qcm: { bonne: String(petit), pieges },
            r: `On dessine deux barres. La grande dépasse de ${ecart}. On retire ce morceau : ${S} − ${ecart} = ${2 * petit}. Il reste deux barres égales : ${2 * petit} ÷ 2 = ${petit}. Le plus petit est ${petit}.`,
          };
        },
        () => {
          const argent = randomInt(40, 150);
          const plus = randomInt(10, 60);
          let moins = randomInt(10, argent - 10);
          while (moins === plus) moins = randomInt(10, argent - 10);
          const T = 3 * argent + plus - moins;
          return {
            q: `Une prime de ${T} € est partagée entre l’or, l’argent et le bronze. L’or a ${plus} € de plus que l’argent, le bronze ${moins} € de moins. Combien reçoit l’argent ?`,
            rep: argent,
            u: "€",
            r: `On rend les trois barres égales à celle de l’argent. On retire les ${plus} € de trop de l’or. On rajoute les ${moins} € qui manquent au bronze. ${T} − ${plus} + ${moins} = ${3 * argent}. Puis ${3 * argent} ÷ 3 = ${argent}. L’argent reçoit ${argent} €.`,
          };
        },
        () => {
          const n = randomInt(2, 5);
          const part = randomInt(3, 20);
          const T = n * part;
          return {
            q: `Le schéma montre ${n} barres égales. Elles font ${T} en tout. Combien vaut une barre ?`,
            rep: part,
            r: `${n} barres égales font ${T}. Une barre vaut ${T} ÷ ${n} = ${part}. En 6e, le schéma remplace l’équation. En 5e, on écrira une lettre à la place de la barre.`,
            canvas: barres(
              String(T),
              Array.from({ length: n }, () => ({ label: "?", unknown: true })),
              "Combien vaut une barre ?"
            ),
          };
        },
      ];
      return precise(cas[randomInt(0, cas.length - 1)]());
    },
  },

  // =========================
  // ALGEBRE_INCONNUES — deux objets, deux prix
  // =========================
  {
    kind: "fixed",
    id: "algebre_inconnues_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 2,
    theme: "neutral",
    text: "Trois ananas identiques coûtent 12 €. Combien coûte un ananas ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Trois parts identiques.",
    explanation: expl("12 ÷ 3 = 4. Un ananas coûte 4 €."),
    tags: ["algebre_probleme", "inconnues", "short"],
  },
  {
    kind: "fixed",
    id: "algebre_inconnues_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 4,
    theme: "neutral",
    text: "Un ananas coûte 4 €. Deux pastèques et un ananas coûtent 20 € en tout. Combien coûte une pastèque ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Enlève d'abord le prix de l'ananas du total.",
    explanation: expl(
      "On retire l'ananas du total : 20 − 4 = 16 €, qui est le prix de deux pastèques. Donc une pastèque coûte 16 ÷ 2 = 8 €."
    ),
    tags: ["algebre_probleme", "inconnues", "canvas", "short"],
    canvas: barres(
      "20 €",
      [
        { label: "pastèque", unknown: true },
        { label: "pastèque", unknown: true },
        { label: "ananas", value: "4" },
      ],
      "Un ananas coûte 4 €."
    ),
  },
  {
    kind: "fixed",
    id: "algebre_inconnues_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 5,
    theme: "neutral",
    text: "Un panier de 3 mangues et 2 letchis coûte 19 €. Un panier de 3 mangues et 5 letchis coûte 28 €. Combien coûte un letchi ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compare les deux paniers : qu'est-ce qui change entre eux ?",
    explanation: expl(
      "Les deux paniers contiennent les mêmes 3 mangues. La différence de prix ne vient donc que des letchis : 28 − 19 = 9 € pour 5 − 2 = 3 letchis de plus. Un letchi coûte 9 ÷ 3 = 3 €."
    ),
    tags: ["algebre_probleme", "inconnues", "974", "short"],
  },
  {
    kind: "fixed",
    id: "algebre_inconnues_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 4,
    theme: "neutral",
    text: "On sait seulement qu'un ananas et une pastèque coûtent 15 € ensemble. Peut-on trouver le prix de chacun ?",
    format: "qcm",
    choices: [
      "non : une seule information ne suffit pas pour deux prix inconnus",
      "oui : chacun coûte 7,50 €",
      "oui : l'ananas coûte toujours moins cher",
      "non, sauf si les deux prix sont des nombres entiers",
    ],
    expected: ["non : une seule information ne suffit pas pour deux prix inconnus"],
    comparator: "mcq_exact",
    hint: "Combien de couples de prix donnent 15 € ?",
    explanation: expl(
      "Beaucoup de couples conviennent : 5 et 10, 6 et 9, 7 et 8… Rien ne permet de choisir. Pour déterminer deux prix inconnus, il faut deux informations différentes — c'est exactement ce que donnent les deux paniers d'un problème d'échange."
    ),
    tags: ["algebre_probleme", "inconnues", "raisonnement", "qcm"],
  },
  {
    kind: "template",
    id: "algebre_inconnues_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 4,
    theme: "neutral",
    hint: "Retire du total ce dont tu connais déjà le prix.",
    tags: ["algebre_probleme", "inconnues", "template"],
    generate: () => {
      const connu = tirer(ARTICLES);
      let inconnu = tirer(ARTICLES);
      while (inconnu === connu) inconnu = tirer(ARTICLES);
      const prixConnu = randomInt(connu.prix[0], connu.prix[1]);
      const nbInconnus = randomInt(2, 5);
      const prixInconnu = randomInt(inconnu.prix[0], inconnu.prix[1]);
      const total = prixConnu + nbInconnus * prixInconnu;
      const x = tirer(PRENOMS);
      const unIn = inconnu.f ? "une" : "un";
      const tournures = [
        `${Maj(connu.un)} coûte ${prixConnu} €. ${x.p} achète ${connu.un} et ${nbInconnus} ${inconnu.pl} identiques : ${il(x)} paie ${total} €. Combien coûte ${unIn} de ces ${inconnu.pl} ?`,
        `${x.p} paie ${total} € pour ${connu.un} à ${prixConnu} € et ${nbInconnus} ${inconnu.pl} identiques. Quel est le prix ${inconnu.f ? "d’une" : "d’un"} de ces ${inconnu.pl} ?`,
        `Au magasin, ${x.p} prend ${nbInconnus} ${inconnu.pl} identiques et ${connu.un}, qui coûte ${prixConnu} €. Le total est de ${total} €. Combien coûte ${unIn} de ces ${inconnu.pl} ?`,
        `Le ticket de caisse ${deP(x)} indique ${total} € pour ${nbInconnus} ${inconnu.pl} identiques et ${connu.un} à ${prixConnu} €. Trouve le prix ${inconnu.f ? "d’une" : "d’un"} de ces ${inconnu.pl}.`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: [`${prixInconnu} €`, String(prixInconnu)],
        comparator: "number_equal",
        explanation: expl(
          `On retire du total ce qu'on connaît : ${total} − ${prixConnu} = ${nbInconnus * prixInconnu} € pour ${nbInconnus} ${inconnu.pl}. Chacun coûte donc ${nbInconnus * prixInconnu} ÷ ${nbInconnus} = ${prixInconnu} €.`
        ),
        canvas: barres(
          `${total} €`,
          [
            ...Array.from({ length: nbInconnus }, () => ({ label: sing(inconnu), unknown: true })),
            { label: connu.un.replace(/^une? /, ""), value: `${prixConnu} €` },
          ],
          `${Maj(connu.un)} coûte ${prixConnu} €.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_inconnues_tpl_identiques",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 2,
    theme: "neutral",
    hint: "Des objets identiques : le total se partage en parts égales.",
    tags: ["algebre_probleme", "inconnues", "template"],
    generate: () => {
      const a = tirer(ARTICLES);
      const prix = randomInt(a.prix[0], a.prix[1]);
      const n = randomInt(2, 8);
      const total = n * prix;
      const x = tirer(PRENOMS);
      const unA = a.f ? "une" : "un";
      const tournures = [
        `${x.p} achète ${n} ${a.pl} identiques pour ${total} €. Combien coûte ${unA} de ces ${a.pl} ?`,
        `${n} ${a.pl} identiques coûtent ${total} € en tout. Quel est le prix ${a.f ? "d’une" : "d’un"} de ces ${a.pl} ? ${x.p} fait un schéma.`,
        `${x.p} paie ${total} € pour ${n} ${a.pl}, tous au même prix. Combien coûte ${unA} de ces ${a.pl} ?`,
        `Pour la classe, ${x.p} commande ${n} ${a.pl} identiques. La facture est de ${total} €. Trouve le prix ${a.f ? "d’une" : "d’un"} de ces ${a.pl}.`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: [`${prix} €`, String(prix)],
        comparator: "number_equal",
        explanation: expl(`${n} parts égales font ${total} € : une part vaut ${total} ÷ ${n} = ${prix} €. Vérification : ${n} × ${prix} = ${total}.`),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_inconnues_tpl_deux_paniers",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les deux achats : ce qui est pareil s’annule.",
    tags: ["algebre_probleme", "inconnues", "template"],
    generate: () => {
      const A = tirer(ARTICLES);
      let B = tirer(ARTICLES);
      while (B === A) B = tirer(ARTICLES);
      const pa = randomInt(A.prix[0], A.prix[1]);
      const pb = randomInt(B.prix[0], B.prix[1]);
      const na = randomInt(1, 4);
      const nb1 = randomInt(1, 3);
      const nb2 = nb1 + randomInt(1, 3);
      const t1 = na * pa + nb1 * pb;
      const t2 = na * pa + nb2 * pb;
      const [x, y] = deuxPrenoms();
      const lot = (n: number, art: typeof A) => (n === 1 ? art.un : `${n} ${art.pl}`);
      return {
        text:
          `${x.p} achète ${lot(na, A)} et ${lot(nb1, B)} pour ${t1} €. ${y.p} achète ${lot(na, A)} et ${lot(nb2, B)} pour ${t2} €. ` +
          tirer([`Combien coûte ${B.un} ?`, `Quel est le prix ${B.f ? "d’une" : "d’un"} ${sing(B)} ?`, `Trouve le prix ${B.f ? "d’une" : "d’un"} ${sing(B)}.`]),
        format: "short",
        expected: [`${pb} €`, String(pb)],
        comparator: "number_equal",
        explanation: expl(
          `Les deux achats ont la même partie (${lot(na, A)}) : elle s'annule. La différence de prix vient seulement des ${B.pl} en plus : ${t2} − ${t1} = ${t2 - t1} € pour ${nb2} − ${nb1} = ${nb2 - nb1} de plus. Un${B.f ? "e" : ""} seul${B.f ? "e" : ""} coûte ${t2 - t1} ÷ ${nb2 - nb1} = ${pb} €.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_inconnues_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 5,
    theme: "neutral",
    hint: "Ce qui est pareil des deux côtés ne compte pas : regarde ce qui change.",
    tags: ["algebre_probleme", "inconnues", "template", "short"],
    // 08/10/2026 : question ouverte rendue précise (Frédéric : « les questions open doivent être précises »).
    // Avant : « Quelle méthode est la bonne ? », « Explique pourquoi cela ne suffit
    // pas », « Explique la stratégie de l'échange ». Désormais : le prix d'un objet
    // par la différence de deux paniers, « peut-on trouver les deux prix ? » avec
    // une seule information (leurre : couper le total en deux), et le prix d'un
    // objet quand on connaît l'autre.
    generate: () => {
      const A = tirer(ARTICLES);
      let B = tirer(ARTICLES);
      while (B === A) B = tirer(ARTICLES);
      const cas = [
        () => {
          const n = randomInt(2, 5);
          const p = randomInt(B.prix[0], B.prix[1]);
          return {
            q: `Deux paniers contiennent les mêmes ${A.pl}. Le second a ${n} ${B.pl} de plus et coûte ${n * p} € de plus. Combien coûte ${B.un} ?`,
            rep: p,
            u: "€",
            r: `Les ${A.pl} sont les mêmes : on n’en tient pas compte. La différence de prix vient des ${n} ${B.pl} en plus. ${n * p} ÷ ${n} = ${p}. ${Maj(B.un)} coûte ${p} €.`,
          };
        },
        () => {
          const S = 2 * randomInt(6, 15);
          return {
            q: `${Maj(A.un)} et ${B.un} coûtent ${S} € ensemble. Peut-on trouver le prix de chacun ?`,
            qcm: {
              bonne: "non",
              pieges: [`oui : ${S / 2} € chacun`, `oui : ${S} € chacun`],
            },
            r: `Beaucoup de prix sont possibles : 5 + ${S - 5} = ${S}, 6 + ${S - 6} = ${S}, 7 + ${S - 7} = ${S}… Rien ne dit que les deux prix sont égaux. Il faut une autre information pour trouver les prix.`,
          };
        },
        () => {
          const P = randomInt(A.prix[0], A.prix[1]);
          const n = randomInt(2, 5);
          const pb = randomInt(B.prix[0], B.prix[1]);
          const T = P + n * pb;
          return {
            q: `${Maj(A.un)} coûte ${P} €. ${Maj(A.un)} et ${n} ${B.pl} coûtent ${T} €. Combien coûte ${B.un} ?`,
            rep: pb,
            u: "€",
            r: `On connaît le prix ${A.f ? "d’une" : "d’un"} ${sing(A)} : on le retire du total. ${T} − ${P} = ${n * pb}. Il reste ${n} ${B.pl} pour ${n * pb} €. ${n * pb} ÷ ${n} = ${pb}. ${Maj(B.un)} coûte ${pb} €.`,
          };
        },
      ];
      return precise(cas[randomInt(0, cas.length - 1)]());
    },
  },

  // =========================
  // ALGEBRE_MOTIF — la régularité, puis la structure
  // =========================
  {
    kind: "fixed",
    id: "algebre_motif_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "On fabrique des maisons avec des allumettes : la première en demande 6, et chaque maison suivante 5 de plus. Combien d'allumettes pour 4 maisons ?",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "6 pour la première, puis 5 pour chacune des suivantes.",
    explanation: expl(
      "6 allumettes pour la première maison, puis 3 maisons de plus à 5 allumettes chacune : 6 + 3 × 5 = 6 + 15 = 21 allumettes."
    ),
    tags: ["algebre_probleme", "motif", "canvas", "short"],
    canvas: motif([6, 11, 16, "?"], "+5", "6 pour la première, puis +5 par maison"),
  },
  {
    kind: "fixed",
    id: "algebre_motif_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "neutral",
    text: "Même motif de maisons en allumettes (6, puis 5 de plus à chaque fois). Quelle est la régularité entre deux maisons consécutives ?",
    format: "qcm",
    choices: [
      "on ajoute 5 allumettes",
      "on ajoute 6 allumettes",
      "on multiplie par 2",
      "on ajoute 5 puis on retire 1",
    ],
    expected: ["on ajoute 5 allumettes"],
    comparator: "mcq_exact",
    hint: "Compare 6 et 11, puis 11 et 16.",
    explanation: expl(
      "11 − 6 = 5 et 16 − 11 = 5 : on ajoute toujours 5 allumettes. La maison suivante partage un mur avec la précédente, ce qui économise une allumette sur les 6 du début."
    ),
    tags: ["algebre_probleme", "motif", "qcm"],
  },
  {
    kind: "fixed",
    id: "algebre_motif_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 5,
    theme: "neutral",
    text: "Combien d'allumettes faut-il pour 25 maisons ?",
    format: "short",
    expected: ["126"],
    comparator: "number_equal",
    hint: "Ne compte pas une par une : cherche la structure.",
    explanation: expl(
      "La première maison coûte 6 allumettes, et chacune des 24 suivantes en coûte 5 : 6 + 24 × 5 = 6 + 120 = 126 allumettes. C'est cette écriture — 6 + (nombre de maisons − 1) × 5 — qu'on appelle la STRUCTURE du motif."
    ),
    tags: ["algebre_probleme", "motif", "canvas", "short"],
    canvas: tableauMotif([
      ["1", "6"],
      ["2", "11 = 6 + 1 × 5"],
      ["3", "16 = 6 + 2 × 5"],
      ["4", "21 = 6 + 3 × 5"],
      ["…", "…"],
      ["25", "6 + 24 × 5 = ?"],
    ]),
  },
  {
    kind: "fixed",
    id: "algebre_motif_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi écrit-on 6 + 24 × 5 pour 25 maisons, et non 25 × 5 + 6 ?",
    format: "qcm",
    choices: [
      "parce que la première maison est déjà comptée dans le 6 : il ne reste que 24 ajouts",
      "parce que 24 est plus petit que 25",
      "parce qu'on ne peut pas multiplier 25 par 5",
      "les deux écritures donnent le même résultat",
    ],
    expected: [
      "parce que la première maison est déjà comptée dans le 6 : il ne reste que 24 ajouts",
    ],
    comparator: "mcq_exact",
    hint: "Combien de fois ajoute-t-on 5 pour passer de la première à la vingt-cinquième ?",
    explanation: expl(
      "Le 6 correspond à la première maison. Pour arriver à la vingt-cinquième, on ajoute 5 vingt-quatre fois seulement — pas vingt-cinq. 25 × 5 + 6 donnerait 131, soit 5 allumettes de trop : c'est l'erreur la plus fréquente sur les motifs."
    ),
    tags: ["algebre_probleme", "motif", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "algebre_motif_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "neutral",
    hint: "Le premier terme, puis le pas répété.",
    tags: ["algebre_probleme", "motif", "template"],
    generate: () => {
      const debut = randomInt(3, 9);
      const pas = randomInt(2, 7);
      const rang = randomInt(4, 12);
      const total = debut + (rang - 1) * pas;
      const m = tirer(MOTIFS);
      const x = tirer(PRENOMS);
      const tournures = [
        `${x.p} fabrique des ${m.nom}. L'étape 1 demande ${debut} ${m.unite}, et chaque étape suivante ${pas} de plus. Combien ${deM(m)} à l'étape ${rang} ?`,
        `Un motif de ${m.nom} commence par ${debut} ${m.unite}. À chaque étape, on ajoute ${pas} ${m.unite}. Combien en faut-il à l'étape ${rang} ? Aide ${x.p}.`,
        `Pour ses ${m.nom}, ${x.p} utilise ${debut} ${m.unite} à l'étape 1, puis ${pas} de plus à chaque étape. Combien ${deM(m)} à l'étape ${rang} ?`,
        `${x.p} veut construire l'étape ${rang} d'un motif de ${m.nom} : ${debut} ${m.unite} au départ, ${pas} de plus à chaque étape. Combien ${deM(m)} lui faut-il ?`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: expl(
          `L'étape 1 demande ${debut} ${m.unite}, puis on ajoute ${pas} à chaque étape. De l'étape 1 à l'étape ${rang}, on ajoute ${rang - 1} fois : ${debut} + ${rang - 1} × ${pas} = ${total}.`
        ),
        canvas: motif(
          [debut, debut + pas, debut + 2 * pas, "?"],
          `+${pas}`,
          `${debut} au départ, puis +${pas}`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_motif_tpl_suivant",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare deux étapes qui se suivent : de combien augmente-t-on ?",
    tags: ["algebre_probleme", "motif", "template"],
    generate: () => {
      const debut = randomInt(2, 12);
      const pas = randomInt(2, 8);
      const t = [debut, debut + pas, debut + 2 * pas];
      const m = tirer(MOTIFS);
      const x = tirer(PRENOMS);
      const tournures = [
        `${x.p} fabrique des ${m.nom}. Étape 1 : ${t[0]} ${m.unite}. Étape 2 : ${t[1]} ${m.unite}. Étape 3 : ${t[2]} ${m.unite}. Combien ${deM(m)} à l'étape 4 ?`,
        `Pour ses ${m.nom}, ${x.p} utilise ${t[0]}, puis ${t[1]}, puis ${t[2]} ${m.unite}. Le motif continue pareil. Combien ${deM(m)} à l'étape suivante ?`,
        `Un motif de ${m.nom} : ${t[0]} ${m.unite}, puis ${t[1]}, puis ${t[2]}. ${x.p} construit l'étape 4. Combien ${deM(m)} lui faut-il ?`,
        `Voici les trois premières étapes ${deP(x)} : ${t[0]}, ${t[1]} et ${t[2]} ${m.unite}. Trouve le nombre ${deM(m)} de l'étape 4.`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: [String(debut + 3 * pas)],
        comparator: "number_equal",
        explanation: expl(
          `${t[1]} − ${t[0]} = ${pas} et ${t[2]} − ${t[1]} = ${pas} : on ajoute toujours ${pas}. Étape 4 : ${t[2]} + ${pas} = ${debut + 3 * pas}.`
        ),
        canvas: motif([...t, "?"], `+${pas}`),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_motif_tpl_grand_rang",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 4,
    theme: "neutral",
    hint: "Le départ ne compte qu'une fois : on ajoute le pas (étape − 1) fois.",
    tags: ["algebre_probleme", "motif", "piege", "template"],
    generate: () => {
      const debut = randomInt(3, 9);
      let pas = randomInt(2, 7);
      while (pas === debut) pas = randomInt(2, 7);
      const rang = randomInt(15, 40);
      const bon = debut + (rang - 1) * pas;
      // Les pièges : multiplier par le rang (un ajout de trop), oublier le départ…
      const pieges = [rang * pas + debut, rang * pas, (rang - 1) * pas, debut * rang, bon + pas]
        .filter((v, i, a) => v !== bon && a.indexOf(v) === i);
      const choix = [bon, ...pieges.slice(0, 3)];
      const m = tirer(MOTIFS);
      const x = tirer(PRENOMS);
      const tournures = [
        `Un motif de ${m.nom} : ${debut} ${m.unite} à l'étape 1, puis ${pas} de plus à chaque étape. Combien ${deM(m)} à l'étape ${rang} ?`,
        `${x.p} veut savoir combien ${deM(m)} il faut pour l'étape ${rang} de ses ${m.nom} (${debut} au départ, ${pas} de plus à chaque étape). Quel calcul donne la bonne réponse ?`,
        `Sans dessiner : ${m.nom}, ${debut} ${m.unite} à l'étape 1, +${pas} à chaque étape. ${x.p} cherche l'étape ${rang}. Combien ${deM(m)} ?`,
      ];
      const parCalcul = (v: number) =>
        v === bon ? `${debut} + ${rang - 1} × ${pas} = ${bon}` :
        v === rang * pas + debut ? `${debut} + ${rang} × ${pas} = ${v}` :
        v === rang * pas ? `${rang} × ${pas} = ${v}` :
        v === (rang - 1) * pas ? `${rang - 1} × ${pas} = ${v}` :
        v === debut * rang ? `${debut} × ${rang} = ${v}` : `${debut} + ${rang - 1} × ${pas} + ${pas} = ${v}`;
      const text = tirer(tournures);
      const enCalcul = /Quel calcul/.test(text);
      return {
        text,
        format: "qcm",
        choices: choix.map((v) => (enCalcul ? parCalcul(v) : String(v))),
        expected: [enCalcul ? parCalcul(bon) : String(bon)],
        comparator: "mcq_exact",
        explanation: expl(
          `L'étape 1 compte ${debut}. Pour aller jusqu'à l'étape ${rang}, on ajoute ${pas} seulement ${rang - 1} fois : ${debut} + ${rang - 1} × ${pas} = ${bon}. Multiplier par ${rang} compterait un ajout de trop.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_motif_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 5,
    theme: "neutral",
    hint: "Le départ est compté une seule fois. Ensuite, on ajoute le même nombre.",
    tags: ["algebre_probleme", "motif", "template", "qcm"],
    // 08/10/2026 : question ouverte rendue précise (Frédéric : « les questions open doivent être précises »).
    // Avant : « Explique pourquoi multiplier par (étape − 1) », « Explique comment
    // repérer la régularité » (un mot-clé suffisait). Désormais : le nombre
    // d'allumettes pour n maisons (réponse courte), la valeur d'une étape (QCM de
    // nombres ; leurre : « départ + étape × pas », l'ajout de trop), et l'écart
    // entre deux termes. ⛔ Aucun QCM dont les choix sont des formules.
    generate: () => {
      const cas = [
        () => {
          const d = randomInt(4, 9);
          const p = randomInt(2, d - 1);
          const n = randomInt(15, 40);
          return {
            q: `Des maisons en allumettes : la première en demande ${d}, chaque maison ajoutée ${p} de plus. Combien d’allumettes faut-il pour ${n} maisons ?`,
            rep: d + (n - 1) * p,
            r: `La première maison demande ${d} allumettes. Ensuite, chaque maison ajoute ${p} allumettes. Pour ${n} maisons, il y a la première et ${n - 1} maisons ajoutées : ${d} + ${n - 1} × ${p} = ${d + (n - 1) * p}.`,
          };
        },
        () => {
          const a = randomInt(3, 12);
          let p = randomInt(2, 9);
          while (p === a) p = randomInt(2, 9);
          const k = randomInt(8, 15);
          const bon = a + (k - 1) * p;
          return {
            q: `Un motif vaut ${a} à l’étape 1. On ajoute ${p} à chaque étape. Combien vaut l’étape ${k} ?`,
            qcm: { bonne: String(bon), pieges: [String(a + k * p), String(k * p)] },
            r: `À l’étape 1, on a déjà ${a}. Pour aller à l’étape ${k}, on ajoute ${p} seulement ${k - 1} fois : ${a} + ${k - 1} × ${p} = ${bon}. Calculer ${a} + ${k} × ${p} compterait un ajout de trop.`,
          };
        },
        () => {
          const a = randomInt(2, 12);
          const p = randomInt(2, 9);
          return {
            q: `Un motif commence par ${a}, ${a + p}, ${a + 2 * p}… De combien augmente-t-il à chaque étape ?`,
            rep: p,
            r: `On calcule l’écart entre deux nombres qui se suivent : ${a + p} − ${a} = ${p} et ${a + 2 * p} − ${a + p} = ${p}. L’écart est toujours le même : le motif augmente de ${p} à chaque étape.`,
          };
        },
      ];
      return precise(cas[randomInt(0, cas.length - 1)]());
    },
  },

  // =========================
  // ALGEBRE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "algebre_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Toujours les maisons en allumettes (6, puis 5 de plus à chaque fois). On dispose de 51 allumettes. Combien de maisons complètes peut-on faire ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Retire d'abord les 6 de la première maison.",
    explanation: expl(
      "On met de côté les 6 allumettes de la première maison : il reste 51 − 6 = 45 allumettes, à 5 par maison supplémentaire, soit 45 ÷ 5 = 9 maisons de plus. Au total : 1 + 9 = 10 maisons. Vérification : 6 + 9 × 5 = 51."
    ),
    tags: ["algebre_probleme", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "algebre_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois enfants se partagent 60 billes. Le deuxième en a deux fois plus que le premier, et le troisième trois fois plus que le premier. Combien le premier en a-t-il ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Compte en parts : 1 part, 2 parts, 3 parts.",
    explanation: expl(
      "Le premier fait 1 part, le deuxième 2 parts, le troisième 3 parts : le total vaut 1 + 2 + 3 = 6 parts. Une part vaut 60 ÷ 6 = 10 billes. Le premier en a donc 10, le deuxième 20 et le troisième 30."
    ),
    tags: ["algebre_probleme", "defi", "canvas", "short"],
    canvas: barres(
      "60 billes",
      [
        { label: "1er", unknown: true },
        { label: "2e (×2)", unknown: true },
        { label: "3e (×3)", unknown: true },
      ],
      "Le 2e a le double du 1er, le 3e le triple."
    ),
  },
  {
    kind: "template",
    id: "algebre_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Retire le terme de départ, puis divise par le pas.",
    tags: ["algebre_probleme", "defi", "template"],
    generate: () => {
      const debut = randomInt(4, 9);
      const pas = randomInt(3, 6);
      const etapes = randomInt(5, 14);
      const total = debut + (etapes - 1) * pas;
      const m = tirer(MOTIFS);
      const x = tirer(PRENOMS);
      const tournures = [
        `Un motif de ${m.nom} commence par ${debut} ${m.unite}, puis en demande ${pas} de plus à chaque étape. ${x.p} a ${total} ${m.unite}. Jusqu'à quelle étape peut-${il(x)} aller ?`,
        `${x.p} a exactement ${total} ${m.unite} pour ses ${m.nom} : ${debut} pour l'étape 1, puis ${pas} de plus à chaque étape. Quelle étape atteint-${il(x)} ?`,
        `Avec ${total} ${m.unite}, ${x.p} construit des ${m.nom} : ${debut} au départ, ${pas} de plus à chaque étape. Quel est le numéro de la dernière étape construite ?`,
        `Il faut ${debut} ${m.unite} pour l'étape 1 d'un motif de ${m.nom}, et ${pas} de plus à chaque étape. ${x.p} utilise ${total} ${m.unite} en tout. À quelle étape s'arrête-t-${il(x)} ?`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: [String(etapes)],
        comparator: "number_equal",
        explanation: expl(
          `On met de côté les ${debut} ${m.unite} de la première étape : il reste ${total} − ${debut} = ${(etapes - 1) * pas}, à ${pas} par étape supplémentaire, soit ${(etapes - 1) * pas} ÷ ${pas} = ${etapes - 1} étapes de plus. Au total : 1 + ${etapes - 1} = ${etapes} étapes.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais le chemin à l’envers : retire le départ, puis divise.",
    tags: ["algebre_probleme", "defi", "template", "qcm"],
    // 08/10/2026 : question ouverte rendue précise (Frédéric : « les questions open doivent être précises »).
    // Avant : « Explique comment faire le chemin à l'envers », « Explique en quoi
    // ces problèmes préparent les lettres ». Désormais, trois réponses courtes :
    // le numéro de l'étape (chemin à l'envers), le nombre de parts (6), et une
    // part quand « n parts et encore k font T ». ⛔ Aucun QCM de formules.
    generate: () => {
      const x = tirer(PRENOMS);
      const cas = [
        () => {
          const m = tirer(MOTIFS);
          const d = randomInt(4, 9);
          let p = randomInt(3, 6);
          while (p === d) p = randomInt(3, 6);
          const k = randomInt(5, 14);
          const T = d + (k - 1) * p;
          return {
            q: `Un motif de ${m.nom} : ${d} ${m.unite} à l’étape 1, puis ${p} de plus à chaque étape. ${x.p} a utilisé ${T} ${m.unite}. À quelle étape est-${il(x)} arrivé${x.f ? "e" : ""} ?`,
            rep: k,
            r: `On fait le chemin à l’envers. On retire les ${d} ${m.unite} de l’étape 1 : ${T} − ${d} = ${T - d}. On divise par ${p} pour compter les ajouts : ${T - d} ÷ ${p} = ${k - 1}. On ajoute 1 pour l’étape 1 : ${k - 1} + 1 = ${k}. C’est l’étape ${k}.`,
          };
        },
        () => {
          const part = randomInt(4, 20);
          const T = 6 * part;
          const c = tirer(COLLECTIONS_ALG.filter((k) => !k.u));
          return {
            q: `Trois enfants se partagent ${T} ${c.pl}. Le deuxième a le double du premier, le troisième le triple. En combien de parts égales faut-il couper le total ?`,
            rep: 6,
            r: `Le premier a 1 part, le deuxième 2 parts, le troisième 3 parts. Le total vaut 1 + 2 + 3 = 6 parts égales. Une part vaut ${T} ÷ 6 = ${part} ${c.pl}.`,
          };
        },
        () => {
          const n = randomInt(2, 5);
          const part = randomInt(3, 15);
          const k = randomInt(2, 12);
          const T = n * part + k;
          return {
            q: `Sur un schéma, ${n} parts égales et encore ${k} font ${T} en tout. Combien vaut une part ?`,
            rep: part,
            r: `On retire d’abord ${k} : ${T} − ${k} = ${n * part}. Puis on partage en ${n} : ${n * part} ÷ ${n} = ${part}. En 5e, la part deviendra une lettre.`,
            canvas: barres(
              String(T),
              [...Array.from({ length: n }, () => ({ label: "?", unknown: true })), { label: String(k), value: String(k) }],
              "Combien vaut une part ?"
            ),
          };
        },
      ];
      return precise(cas[randomInt(0, cas.length - 1)]());
    },
  },
];

void shuffle;
