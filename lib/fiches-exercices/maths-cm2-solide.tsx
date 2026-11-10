// ─── Fiche d'exercices : les solides (CM2) — 20 exercices corrigés ────────────
//
// 10/11/2026 (session fiches-cm2), sur le modèle des feuilles CM2 du tableau et
// du graphique : texte simple, sans KaTeX, « × » et « ÷ », phrases courtes.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-solides` (« Les
// solides »), sur la banque `lib/tutor-v4/questionBank/cm2/maths/solides.bank.ts`
// et sur la carte mentale remplie (`cm2/solide`), notionId solide : reconnaître
// les solides usuels (cube, pavé droit, cylindre, cône, pyramide, boule, prisme),
// compter faces, arêtes et sommets, dire la forme des faces, reconnaître un
// patron, compléter un patron de cube, défis (compter des cubes, le cube peint,
// ranger des boîtes).
// ⛔ CM2 = AUCUNE question ouverte : un nombre, un mot (le nom du solide), une
// lettre de QCM, vrai/faux. « Construire un patron de cube » se travaille en
// CHOISISSANT la case qui complète un patron, ou la face d'en face.
// ⛔ Aucun exemple de la carte mentale n'est repris (le dé, la boîte à
// chaussures, la croix de 6 carrés, le cube de 3 cm, les arêtes du pavé
// « 4 + 4 + 4 »).
//
// Les pièges nommés : le cône pris pour une pyramide (1), le pavé appelé
// « rectangle » (2), les arêtes cachées oubliées (3, 16), la face crue toujours
// carrée (4), la base de la pyramide oubliée (5, 19), 6 carrés qui ne font pas
// toujours un cube (6, 9), le disque du cylindre compté une fois (7), le prisme
// compté comme une pyramide (8), deux faces voisines prises pour des faces
// d'en face (10), les arêtes comptées 4 fois au lieu de 3 groupes de 4 (11),
// le sommet du cylindre (12), la face courbe comptée comme face plate (13, 15),
// les cubes cachés (14), le cube du centre oublié (17), le patron fermé au lieu
// d'ouvert (18), additionner au lieu de multiplier (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1), épicerie (2), jouets (3),
// cuisine (4), musée (5), atelier de bricolage (6), emballage (7), camping
// (8), cadeau (9), jeu de société (10), chocolaterie (11), quiz (12),
// devinettes (13), escalier de jeu (14), arts plastiques (15), sciences (16),
// sculpture (17), poterie (18), kiosque à musique (19), pâtisserie (20).
// Aucun décor de La Réunion sur cette feuille.
// Les métiers : épicière (2), cuisinier (4), guide de musée (5), chocolatière
// (11), sculptrice (17), potier (18), pâtissière (20).
// ⭐ UN FAIT RÉEL : sur un dé à jouer, deux faces opposées font toujours 7 (ex. 10).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : deux aides locales. `solide3` projette un solide à faces
// planes en perspective cavalière (fuyantes vers le haut à droite, rapport
// 0,4) ; les faces vues et les arêtes cachées (en pointillés) sont CALCULÉES
// à partir des normales des faces, pas dessinées à la main. `patron` trace des
// carrés sur une grille (case [colonne, ligne]) ; le script de contrôle
// (scratchpad) PLIE chaque patron de cube et vérifie qu'il donne 6 faces
// distinctes (5 pour la boîte ouverte) et quelle face est en face de quelle.
//
// Micro-compétences : solide_reconnaitre (1, 2, 8, 13), solide_sommet_arete_face
// (3, 5, 8, 12, 16), solide_face (4, 5, 11, 13, 15), solide_patron (6, 7, 9,
// 10, 18), solide_patron_construire (9, 10, 18), solide_defi (14, 16, 17, 19,
// 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const NOIR = "#0f172a";
const BLEU = "#2563eb";
const GRIS = "#64748b";
const ROUGE = "#dc2626";
const FOND = "#dbeafe";

type P = [number, number];
type V3 = [number, number, number];
type Solide = { v: V3[]; faces: number[][] };

const f = (x: number) => Math.round(x * 10) / 10;
const K = 0.4;
/** La perspective cavalière : la profondeur z part vers le haut à droite. */
const proj = (p: V3, o: P, s: number): P => [o[0] + s * (p[0] + K * p[2]), o[1] - s * (p[1] + K * p[2])];
/** On regarde de face, d'un peu au-dessus et d'un peu à droite. */
const VUE: V3 = [K, K, -1];
const moins = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const vect = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const scal = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/* Les solides à faces planes, en coordonnées 3D (y vers le haut, z vers le fond). */
const pave = (w: number, h: number, d: number): Solide => ({
  v: [[0, 0, 0], [w, 0, 0], [w, h, 0], [0, h, 0], [0, 0, d], [w, 0, d], [w, h, d], [0, h, d]],
  faces: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]],
});
const pyramideCarree = (c: number, h: number): Solide => ({
  v: [[0, 0, 0], [c, 0, 0], [c, 0, c], [0, 0, c], [c / 2, h, c / 2]],
  faces: [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]],
});
const prisme = (w: number, h: number, d: number): Solide => ({
  v: [[0, 0, 0], [w, 0, 0], [w / 2, h, 0], [0, 0, d], [w, 0, d], [w / 2, h, d]],
  faces: [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]],
});
const pyramideHexa = (r: number, h: number): Solide => {
  const base: V3[] = Array.from({ length: 6 }, (_, k) => [f(r + r * Math.cos((k * Math.PI) / 3)), 0, f(r + r * Math.sin((k * Math.PI) / 3))]);
  return {
    v: [...base, [r, h, r]],
    faces: [[0, 1, 2, 3, 4, 5], ...base.map((_, k) => [k, (k + 1) % 6, 6])],
  };
};

/**
 * Un SOLIDE À FACES PLANES dessiné en perspective cavalière, en `o` (le coin
 * avant gauche du bas), `s` pixels par unité. Les faces vues sont teintées ;
 * une arête est en pointillés quand TOUTES ses faces sont cachées.
 * `cachees: false` : sans les arêtes cachées (cubes empilés).
 */
const solide3 = (sol: Solide, o: P, s: number, opts: { cachees?: boolean; fond?: string } = {}): ReactNode[] => {
  const c: V3 = [0, 1, 2].map((k) => sol.v.reduce((t, p) => t + p[k], 0) / sol.v.length) as V3;
  const vue = sol.faces.map((fc) => {
    const [a, b, d] = fc.map((i) => sol.v[i]);
    let n = vect(moins(b, a), moins(d, a));
    const g: V3 = [0, 1, 2].map((k) => fc.reduce((t, i) => t + sol.v[i][k], 0) / fc.length) as V3;
    if (scal(n, moins(g, c)) < 0) n = [-n[0], -n[1], -n[2]];
    return scal(n, VUE) > 1e-9;
  });
  const aretes = new Map<string, { a: number; b: number; vue: boolean }>();
  sol.faces.forEach((fc, j) =>
    fc.forEach((a, k) => {
      const b = fc[(k + 1) % fc.length];
      const cle = a < b ? `${a}-${b}` : `${b}-${a}`;
      const e = aretes.get(cle) ?? { a, b, vue: false };
      e.vue ||= vue[j];
      aretes.set(cle, e);
    }),
  );
  const pt = (i: number) => proj(sol.v[i], o, s);
  const out: ReactNode[] = [];
  sol.faces.forEach((fc, j) => {
    if (vue[j]) out.push(<polygon key={`f${out.length}`} points={fc.map((i) => pt(i).map(f).join(",")).join(" ")} fill={opts.fond ?? FOND} stroke="none" />);
  });
  for (const e of aretes.values()) {
    if (!e.vue && opts.cachees === false) continue;
    const [p, q] = [pt(e.a), pt(e.b)];
    out.push(
      <line key={`e${out.length}`} x1={f(p[0])} y1={f(p[1])} x2={f(q[0])} y2={f(q[1])} stroke={e.vue ? NOIR : GRIS} strokeWidth={e.vue ? 2.5 : 2} strokeDasharray={e.vue ? undefined : "5 4"} strokeLinecap="round" />,
    );
  }
  return out;
};

/** Un CYLINDRE debout : centre du bas (cx, yb), rayon rx (ellipse de demi-hauteur ry), hauteur h. */
const cylindre = (cx: number, yb: number, rx: number, ry: number, h: number): ReactNode => (
  <g>
    <path d={`M ${cx - rx} ${yb - h} L ${cx - rx} ${yb} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yb} L ${cx + rx} ${yb - h} Z`} fill={FOND} />
    <ellipse cx={cx} cy={yb - h} rx={rx} ry={ry} fill={FOND} stroke={NOIR} strokeWidth={2.5} />
    <line x1={cx - rx} y1={yb - h} x2={cx - rx} y2={yb} stroke={NOIR} strokeWidth={2.5} />
    <line x1={cx + rx} y1={yb - h} x2={cx + rx} y2={yb} stroke={NOIR} strokeWidth={2.5} />
    <path d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yb}`} fill="none" stroke={NOIR} strokeWidth={2.5} />
    <path d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yb}`} fill="none" stroke={GRIS} strokeWidth={2} strokeDasharray="5 4" />
  </g>
);
/** Un CÔNE : base de centre (cx, yb), sommet h plus haut. */
const cone = (cx: number, yb: number, rx: number, ry: number, h: number): ReactNode => (
  <g>
    <path d={`M ${cx - rx} ${yb} L ${cx} ${yb - h} L ${cx + rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx - rx} ${yb} Z`} fill={FOND} />
    <path d={`M ${cx - rx} ${yb} L ${cx} ${yb - h} L ${cx + rx} ${yb}`} fill="none" stroke={NOIR} strokeWidth={2.5} strokeLinejoin="round" />
    <path d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yb}`} fill="none" stroke={NOIR} strokeWidth={2.5} />
    <path d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yb}`} fill="none" stroke={GRIS} strokeWidth={2} strokeDasharray="5 4" />
  </g>
);

const cadre = (h: number, label: string, enfants: ReactNode) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <svg viewBox={`0 0 300 ${h}`} className="block h-auto w-full" role="img" aria-label={label}>
      <rect x="0" y="0" width="300" height={h} rx="10" fill="#fff" />
      {enfants}
    </svg>
  </div>
);
const texte = (x: number, y: number, t: string, couleur = NOIR) => (
  <text key={`t${x}-${y}-${t}`} x={x} y={y} textAnchor="middle" fontSize="14" fontWeight="800" fill={couleur} stroke="white" strokeWidth="3" paintOrder="stroke">
    {t}
  </text>
);

type Case = { c: number; r: number; t?: string; tirets?: boolean; couleur?: string };
/**
 * Un PATRON fait de carrés sur une grille : chaque case [colonne, ligne] (ligne
 * vers le bas), en `o`, de côté `a`. `t` : ce qui est écrit dans la case ;
 * `tirets` : une case proposée (en pointillés).
 * ⭐ Le script de contrôle relit ces cases et plie le patron : les écrire en clair.
 */
const patron = (cases: Case[], o: P, a: number): ReactNode[] =>
  cases.map((k, i) => (
    <g key={`c${i}`}>
      <rect
        x={o[0] + k.c * a}
        y={o[1] + k.r * a}
        width={a}
        height={a}
        fill={k.tirets ? "#fff7ed" : (k.couleur ?? FOND)}
        stroke={k.tirets ? "#ea580c" : NOIR}
        strokeWidth={k.tirets ? 2 : 2.2}
        strokeDasharray={k.tirets ? "5 4" : undefined}
      />
      {k.t ? (
        <text x={o[0] + k.c * a + a / 2} y={o[1] + k.r * a + a / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={k.tirets ? "#c2410c" : NOIR}>
          {k.t}
        </text>
      ) : null}
    </g>
  ));

/** Les petits cubes, du fond vers l'avant, du bas vers le haut, de gauche à droite. */
const cubes = (liste: V3[], o: P, s: number): ReactNode[] =>
  [...liste]
    .sort((p, q) => q[2] - p[2] || p[1] - q[1] || p[0] - q[0])
    .flatMap((p, i) => solide3(pave(1, 1, 1), proj(p, o, s), s, { cachees: false }).map((el, j) => <g key={`k${i}-${j}`}>{el}</g>));

export const exercicesSolideCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "solide",
  titre: "Les solides",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître un cube, un pavé, un cylindre, un cône, une pyramide. Compter les faces, les arêtes et les sommets, même ceux qu'on ne voit pas. Trouver le bon patron, la case qui manque, la face d'en face. Une épicerie, une tente, un dé, une chocolaterie, un cube peint, des cartons de pâtissière. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/solide", titre: "Les solides" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je regarde le solide, et je compte avec méthode.",
      rappel: [
        "Une face est une partie plate. Une arête est un bord entre 2 faces. Un sommet est un coin.",
        "Sur un dessin, les traits en pointillés sont les arêtes cachées, derrière.",
        "Un patron, c'est le solide déplié à plat.",
        "Le cube a 6 faces carrées. Le pavé droit a 6 faces rectangulaires.",
      ],
      exercices: [
        {
          enonce:
            "Voici quatre solides, numérotés de 1 à 4.\na) Quel numéro porte le cylindre ?\nb) Quel numéro porte le cône ?\nc) Un glaçon a la forme d'un cube. Quel numéro ?",
          figure: cadre(
            135,
            "Quatre solides numérotés : un cylindre, un cube, un cône, une pyramide",
            <>
              {cylindre(42, 95, 25, 9, 60)}
              {solide3(pave(1, 1, 1), [92, 100], 50)}
              {cone(198, 95, 25, 9, 65)}
              {solide3(pyramideCarree(1, 1.3), [233, 100], 40)}
              {texte(42, 126, "1")}
              {texte(120, 126, "2")}
              {texte(198, 126, "3")}
              {texte(260, 126, "4")}
            </>,
          ),
          correction:
            "Je regarde les faces de chaque solide.\nLe solide 1 a deux disques, en haut et en bas : c'est le cylindre.\nLe solide 2 a des faces carrées, toutes pareilles : c'est le cube.\nLe solide 3 a un disque et une pointe : c'est le cône.\nLe solide 4 a une base carrée et des triangles : c'est une pyramide.\na) Le cylindre porte le numéro 1.\nb) Le cône porte le numéro 3.\nc) Le glaçon est un cube : numéro 2.\n⛔ Le piège : confondre le cône et la pyramide. Le cône a une base ronde ; la pyramide, une base à côtés droits.\nRéponse : a) 1 ; b) 3 ; c) 2.",
          micros: ["solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["1", "solide 1"] },
            { question: "b)", attendu: ["3", "solide 3"] },
            { question: "c)", attendu: ["2", "solide 2"] },
          ],
        },
        {
          enonce:
            "Une épicière range ses produits. Quel solide a la forme de chaque objet ?\na) Une boîte de sucre en morceaux.\nb) Une boîte de petits pois.\nc) Une orange.\nRéponds par un nom de solide : cube, pavé, cylindre, cône, pyramide ou boule.",
          correction:
            "Je regarde les faces de chaque objet.\na) La boîte de sucre a 6 faces plates, en rectangles. C'est un pavé droit.\nb) La boîte de petits pois a 2 disques plats et elle roule. C'est un cylindre.\nc) L'orange est toute ronde, sans face plate. C'est une boule.\n⛔ Le piège : dire « rectangle » pour la boîte. Le rectangle est une figure plate ; la boîte est un solide : un pavé.\nRéponse : a) pavé droit ; b) cylindre ; c) boule.",
          micros: ["solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["pavé", "pavé droit", "un pavé", "un pavé droit"] },
            { question: "b)", attendu: ["cylindre", "un cylindre"] },
            { question: "c)", attendu: ["boule", "une boule", "sphère"] },
          ],
        },
        {
          enonce:
            "Voici un cube en bois, pour un jeu de construction.\na) Combien a-t-il de faces ?\nb) Combien a-t-il d'arêtes ?\nc) Combien a-t-il de sommets ?\nd) Sur le dessin, combien d'arêtes sont en pointillés ?",
          figure: cadre(150, "Un cube dessiné en perspective, ses arêtes cachées en pointillés", <>{solide3(pave(1, 1, 1), [100, 135], 85)}</>),
          correction:
            "Je compte avec méthode, sans oublier ce qui est derrière.\na) Faces : devant et derrière, dessus et dessous, gauche et droite. 6 faces.\nb) Arêtes : 4 autour de la face de devant, 4 autour de celle de derrière, et 4 qui les relient. 4 + 4 + 4 = 12.\nc) Sommets : 4 devant et 4 derrière. 8 sommets.\nd) Les pointillés partent du coin caché, en bas à gauche, au fond. J'en compte 3.\n⛔ Le piège : compter seulement les arêtes qu'on voit (9). Les 3 en pointillés existent aussi.\nRéponse : a) 6 ; b) 12 ; c) 8 ; d) 3.",
          micros: ["solide_sommet_arete_face"],
          reponses: [
            { question: "a)", attendu: ["6", "6 faces"] },
            { question: "b)", attendu: ["12", "12 arêtes"] },
            { question: "c)", attendu: ["8", "8 sommets"] },
            { question: "d)", attendu: ["3", "3 arêtes"] },
          ],
        },
        {
          enonce:
            "Un cuisinier ouvre une brique de lait. Elle a la forme d'un pavé droit.\na) Combien a-t-elle de faces ?\nb) Ses faces sont : A : des triangles ; B : des disques ; C : des rectangles. Réponds A, B ou C.\nc) Les faces sont pareilles 2 par 2. Combien y a-t-il de paires de faces pareilles ?",
          figure: cadre(170, "Un pavé droit dessiné en perspective", <>{solide3(pave(1, 1.8, 0.8), [115, 158], 70)}</>),
          correction:
            "a) Je compte : devant, derrière, dessus, dessous, gauche, droite. 6 faces.\nb) Chaque face a 4 côtés et 4 angles droits : ce sont des rectangles. Réponse C.\nc) Devant et derrière sont pareilles. Dessus et dessous aussi. Gauche et droite aussi.\nCela fait 3 paires : 3 × 2 = 6 faces.\n⛔ Le piège : croire que les faces d'un pavé sont des carrés. Ce sont des rectangles ; seul le cube a 6 carrés.\nRéponse : a) 6 ; b) C ; c) 3.",
          micros: ["solide_face"],
          reponses: [
            { question: "a)", attendu: ["6", "6 faces"] },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: ["3", "3 paires"] },
          ],
        },
        {
          enonce:
            "Un guide de musée montre une pyramide en verre, à base carrée.\na) Combien a-t-elle de faces en tout ?\nb) Combien de ses faces sont des triangles ?\nc) Combien a-t-elle de sommets ?",
          figure: cadre(160, "Une pyramide à base carrée dessinée en perspective", <>{solide3(pyramideCarree(1, 1.1), [95, 150], 95)}</>),
          correction:
            "a) Je compte les triangles qui montent vers la pointe : 4.\nJ'ajoute la face du dessous, la base carrée : 1.\n4 + 1 = 5 faces.\nb) Les triangles : 4 faces.\nc) Sommets : les 4 coins de la base, plus la pointe. 4 + 1 = 5 sommets.\n⛔ Le piège : oublier la base, posée sur le sol. Elle compte : c'est une face.\nRéponse : a) 5 ; b) 4 ; c) 5.",
          micros: ["solide_face", "solide_sommet_arete_face"],
          reponses: [
            { question: "a)", attendu: ["5", "5 faces"] },
            { question: "b)", attendu: ["4", "4 faces"] },
            { question: "c)", attendu: ["5", "5 sommets"] },
          ],
        },
        {
          enonce:
            "À l'atelier de bricolage, on veut fabriquer une boîte en forme de cube.\na) Quel patron se plie en cube ? Réponds A, B ou C.\nb) Combien de carrés faut-il pour un patron de cube ?",
          figure: cadre(
            118,
            "Trois patrons de 6 carrés, A, B et C",
            <>
              {patron([{ c: 0, r: 0 }, { c: 1, r: 0 }, { c: 0, r: 1 }, { c: 1, r: 1 }, { c: 2, r: 1 }, { c: 3, r: 1 }], [8, 18], 20)}
              {patron([{ c: 0, r: 0 }, { c: 1, r: 0 }, { c: 1, r: 1 }, { c: 2, r: 1 }, { c: 3, r: 1 }, { c: 3, r: 2 }], [104, 18], 20)}
              {patron([{ c: 0, r: 0 }, { c: 1, r: 0 }, { c: 2, r: 0 }, { c: 0, r: 1 }, { c: 1, r: 1 }, { c: 2, r: 1 }], [216, 18], 20)}
              {texte(48, 108, "A")}
              {texte(144, 108, "B")}
              {texte(246, 108, "C")}
            </>,
          ),
          correction:
            "J'imagine le pliage. Chaque carré doit aller sur une face différente.\nA : les 2 carrés du haut se plient tous les deux sur le dessus. Ils se recouvrent : pas de cube.\nC : un bloc de 2 lignes de 3 carrés. En pliant, des carrés se recouvrent : pas de cube.\nB : je plie l'escalier. Les 6 carrés vont sur 6 faces différentes : c'est un cube.\na) Le patron B.\nb) Un cube a 6 faces : il faut 6 carrés.\n⛔ Le piège : croire que 6 carrés font toujours un cube. Deux faces peuvent se recouvrir.\nRéponse : a) B ; b) 6.",
          micros: ["solide_patron"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: ["6", "6 carrés"] },
          ],
        },
        {
          enonce:
            "Pour un emballage, on découpe deux patrons.\na) Quel solide donne le patron 1 ?\nb) Quel solide donne le patron 2 ?\nc) Combien de disques faut-il dans le patron 1 ?",
          figure: cadre(
            185,
            "Patron 1 : un rectangle et deux disques. Patron 2 : un carré et quatre triangles",
            <>
              <rect x={25} y={55} width={95} height={70} fill={FOND} stroke={NOIR} strokeWidth={2.2} />
              <circle cx={72.5} cy={37} r={18} fill={FOND} stroke={NOIR} strokeWidth={2.2} />
              <circle cx={72.5} cy={143} r={18} fill={FOND} stroke={NOIR} strokeWidth={2.2} />
              <polygon points="185,60 235,60 235,110 185,110" fill={FOND} stroke={NOIR} strokeWidth={2.2} />
              <polygon points="185,60 235,60 210,18" fill={FOND} stroke={NOIR} strokeWidth={2.2} />
              <polygon points="235,60 235,110 277,85" fill={FOND} stroke={NOIR} strokeWidth={2.2} />
              <polygon points="235,110 185,110 210,152" fill={FOND} stroke={NOIR} strokeWidth={2.2} />
              <polygon points="185,110 185,60 143,85" fill={FOND} stroke={NOIR} strokeWidth={2.2} />
              {texte(72.5, 178, "1")}
              {texte(210, 178, "2")}
            </>,
          ),
          correction:
            "J'imagine le pliage de chaque patron.\na) Patron 1 : le rectangle s'enroule pour faire le tour. Les 2 disques ferment le haut et le bas. C'est un cylindre.\nb) Patron 2 : le carré est la base. Les 4 triangles se relèvent et se rejoignent en haut, en une pointe. C'est une pyramide.\nc) Le cylindre a 2 faces plates : 2 disques.\n⛔ Le piège : oublier un disque. Le cylindre est fermé en haut ET en bas.\nRéponse : a) un cylindre ; b) une pyramide ; c) 2.",
          micros: ["solide_patron"],
          reponses: [
            { question: "a)", attendu: ["cylindre", "un cylindre"] },
            { question: "b)", attendu: ["pyramide", "une pyramide"] },
            { question: "c)", attendu: ["2", "2 disques"] },
          ],
        },
        {
          enonce:
            "Cette tente de camping a la forme d'un prisme. Ses deux bouts sont des triangles.\na) Combien a-t-elle de faces ?\nb) Combien a-t-elle de sommets ?\nc) Combien a-t-elle d'arêtes ?",
          figure: cadre(140, "Un prisme à base triangulaire, comme une tente, dessiné en perspective", <>{solide3(prisme(1.3, 1, 1.4), [60, 128], 75)}</>),
          correction:
            "Je compte avec méthode.\na) Les 2 triangles des bouts, plus 3 rectangles : le sol et les 2 pans du toit. 2 + 3 = 5 faces.\nb) Les 3 coins du triangle de devant, et les 3 de derrière. 3 + 3 = 6 sommets.\nc) 3 arêtes autour du triangle de devant, 3 autour de celui de derrière, et 3 qui les relient. 3 + 3 + 3 = 9 arêtes.\n⛔ Le piège : croire que c'est une pyramide parce qu'il y a des triangles. Une pyramide a une seule pointe.\nRéponse : a) 5 ; b) 6 ; c) 9.",
          micros: ["solide_reconnaitre", "solide_sommet_arete_face"],
          reponses: [
            { question: "a)", attendu: ["5", "5 faces"] },
            { question: "b)", attendu: ["6", "6 sommets"] },
            { question: "c)", attendu: ["9", "9 arêtes"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. J'imagine le solide, ou je plie le patron dans ma tête.",
      rappel: [
        "Patron de cube : 6 carrés pareils, reliés par un côté. Jamais 5 carrés en ligne.",
        "Deux carrés qui se plient sur la même face : ce n'est pas un patron.",
        "Dans 4 carrés en ligne, le 1er et le 3e sont en face l'un de l'autre. Le 2e et le 4e aussi.",
        "Un cylindre et un cône ont une face courbe : elle n'est pas plate.",
      ],
      exercices: [
        {
          enonce:
            "Maël fabrique une boîte cadeau en cube. Il a déjà découpé 5 carrés. Il peut coller le 6e en A, en B ou en C.\na) Où doit-il coller le 6e carré pour obtenir un cube ? Réponds A, B ou C.\nb) Combien d'arêtes aura le cube ?",
          figure: cadre(
            120,
            "Un patron de 5 carrés et trois places proposées, A, B et C",
            <>{patron([{ c: 0, r: 1 }, { c: 1, r: 1 }, { c: 2, r: 1 }, { c: 3, r: 1 }, { c: 1, r: 0 }, { c: 4, r: 1, t: "A", tirets: true }, { c: 2, r: 2, t: "B", tirets: true }, { c: 0, r: 0, t: "C", tirets: true }], [55, 8], 34)}</>,
          ),
          correction:
            "Les 4 carrés en ligne font le tour du cube. Le carré du haut sera le dessus.\nIl manque le dessous.\nA : 5 carrés en ligne. Le 5e recouvre le 1er : pas de cube.\nC : il se plie sur le dessus, comme le carré voisin. Ils se recouvrent : pas de cube.\nB : il se plie sous la ligne : c'est le dessous. Le cube est fermé.\na) Réponse B.\nb) Un cube a 12 arêtes.\n⛔ Le piège : choisir C parce qu'il complète un joli rectangle. Deux carrés sur la même face, ça ne ferme pas.\nRéponse : a) B ; b) 12.",
          micros: ["solide_patron_construire", "solide_patron"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: ["12", "12 arêtes"] },
          ],
        },
        {
          enonce:
            "Voici le patron d'un dé à jouer. Sur un vrai dé, deux faces opposées font toujours 7 au total.\na) Quelle face sera en face de la face 1 ?\nb) Quel nombre faut-il écrire à la place du « ? » ?\nc) Quelle face sera en face de la face 2 ?",
          figure: cadre(
            130,
            "Le patron d'un dé : une ligne de 4 carrés 3, 1, ?, 6, le 2 au-dessus du 1 et le 5 en dessous",
            <>{patron([{ c: 0, r: 1, t: "3" }, { c: 1, r: 1, t: "1" }, { c: 2, r: 1, t: "?", couleur: "#fef3c7" }, { c: 3, r: 1, t: "6" }, { c: 1, r: 0, t: "2" }, { c: 1, r: 2, t: "5" }], [82, 5], 40)}</>,
          ),
          correction:
            "Dans la ligne de 4 carrés, le 1er et le 3e sont en face. Le 2e et le 4e aussi.\na) La face 1 est la 2e de la ligne. La 4e est le 6. En face de 1, il y a 6.\nVérification : 1 + 6 = 7.\nb) Le « ? » est le 3e de la ligne. Il est en face du 3, le 1er.\n3 + ? = 7, donc ? = 4.\nc) Le 2 est au-dessus du 1, le 5 est en dessous. Pliés, l'un fait le dessus, l'autre le dessous.\nEn face de 2, il y a 5. Vérification : 2 + 5 = 7.\n⛔ Le piège : croire que deux carrés voisins sur le patron seront en face. Voisins, ils se touchent sur le dé.\nRéponse : a) 6 ; b) 4 ; c) 5.",
          micros: ["solide_patron_construire", "solide_patron"],
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "5" },
          ],
        },
        {
          enonce:
            "Une chocolatière fabrique une boîte en pavé droit : 4 cm de long, 3 cm de large et 2 cm de haut.\na) Combien de faces mesurent 4 cm sur 3 cm ?\nb) Combien de faces mesurent 4 cm sur 2 cm ?\nc) Elle colle un ruban doré sur toutes les arêtes. Quelle longueur de ruban lui faut-il ?",
          figure: cadre(
            155,
            "Un pavé droit de 4 cm de long, 3 cm de large et 2 cm de haut",
            <>
              {solide3(pave(4, 2, 3), [50, 125], 32)}
              {texte(114, 145, "4 cm", BLEU)}
              {texte(28, 98, "2 cm", BLEU)}
              {texte(222, 112, "3 cm", BLEU)}
            </>,
          ),
          correction:
            "Le pavé a 6 faces, pareilles 2 par 2.\na) Le dessus et le dessous mesurent 4 cm sur 3 cm : 2 faces.\nb) Le devant et le derrière mesurent 4 cm sur 2 cm : 2 faces.\n(Les 2 côtés mesurent 3 cm sur 2 cm.)\nc) Le pavé a 12 arêtes : 4 de 4 cm, 4 de 3 cm et 4 de 2 cm.\n4 × 4 = 16 ; 4 × 3 = 12 ; 4 × 2 = 8.\n16 + 12 + 8 = 36. Il faut 36 cm de ruban.\n⛔ Le piège : additionner seulement 4 + 3 + 2 = 9. Chaque longueur revient 4 fois.\nRéponse : a) 2 ; b) 2 ; c) 36 cm.",
          micros: ["solide_face", "solide_sommet_arete_face"],
          reponses: [
            { question: "a)", attendu: ["2", "2 faces"] },
            { question: "b)", attendu: ["2", "2 faces"] },
            { question: "c)", attendu: ["36", "36 cm"] },
          ],
        },
        {
          enonce:
            "Quiz de la classe. Vrai ou faux ?\na) Un cylindre a des sommets.\nb) Une boule a une face plate.\nc) Un cône a un seul sommet.",
          figure: cadre(
            125,
            "Un cylindre, une boule et un cône",
            <>
              {cylindre(55, 100, 30, 10, 65)}
              <circle cx={150} cy={65} r={42} fill={FOND} stroke={NOIR} strokeWidth={2.5} />
              <path d="M 108 65 A 42 12 0 0 0 192 65" fill="none" stroke={GRIS} strokeWidth={1.8} />
              {cone(245, 100, 30, 10, 80)}
            </>,
          ),
          correction:
            "Un sommet est un coin pointu. Une face est une partie plate.\na) Le cylindre a 2 disques plats et une face courbe. Il n'a aucun coin pointu. Faux.\nb) La boule est toute ronde. Elle n'a aucune partie plate. Faux.\nc) Le cône a une pointe, en haut. C'est son seul sommet. Vrai.\n⛔ Le piège : voir des sommets au bord des disques du cylindre. Ce bord est rond : il n'a pas de coin.\nRéponse : a) faux ; b) faux ; c) vrai.",
          micros: ["solide_sommet_arete_face"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
        },
        {
          enonce:
            "Devinettes. Qui suis-je ? Réponds par un nom de solide.\na) J'ai 6 faces. Ce sont des carrés, tous pareils.\nb) J'ai 2 faces plates en forme de disque, et je roule.\nc) J'ai 5 faces : un carré et 4 triangles.",
          correction:
            "Je compte les faces et je regarde leur forme.\na) 6 faces carrées, toutes pareilles : c'est un cube.\nb) 2 disques plats, et une face courbe qui roule : c'est un cylindre.\nc) Une base carrée et 4 triangles qui montent en pointe : c'est une pyramide.\n⛔ Le piège : au b), répondre « cône ». Le cône n'a qu'un seul disque.\nRéponse : a) cube ; b) cylindre ; c) pyramide.",
          micros: ["solide_reconnaitre", "solide_face"],
          reponses: [
            { question: "a)", attendu: ["cube", "un cube"] },
            { question: "b)", attendu: ["cylindre", "un cylindre"] },
            { question: "c)", attendu: ["pyramide", "une pyramide"] },
          ],
        },
        {
          enonce:
            "Lou empile des cubes pour faire un escalier. Tous les cubes sont sur une seule rangée.\na) Combien de cubes a-t-elle utilisés ?\nb) Elle veut remplir l'escalier pour obtenir un pavé de 3 cubes de haut et 3 cubes de large. Combien de cubes doit-elle ajouter ?",
          figure: cadre(
            175,
            "Un escalier de cubes : 3 cubes, puis 2, puis 1, sur une rangée",
            <>{cubes([[0, 0, 0], [0, 1, 0], [0, 2, 0], [1, 0, 0], [1, 1, 0], [2, 0, 0]], [70, 160], 45)}</>,
          ),
          correction:
            "Je compte colonne par colonne.\na) La colonne de gauche : 3 cubes. Celle du milieu : 2. Celle de droite : 1.\n3 + 2 + 1 = 6 cubes.\nb) Un pavé de 3 cubes de haut et 3 de large : 3 × 3 = 9 cubes.\nIl en a 6. 9 − 6 = 3 cubes à ajouter.\nVérification : 1 en haut au milieu, et 2 à droite.\n⛔ Le piège : chercher des cubes cachés derrière. Ici, il n'y a qu'une rangée : tout se voit.\nRéponse : a) 6 ; b) 3.",
          micros: ["solide_defi", "solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["6", "6 cubes"] },
            { question: "b)", attendu: ["3", "3 cubes"] },
          ],
        },
        {
          enonce:
            "En arts plastiques, on trempe chaque face plate d'un solide dans la peinture. Puis on la pose sur une feuille.\na) Avec un cylindre, combien d'empreintes rondes obtient-on ?\nb) Avec une pyramide à base carrée, combien d'empreintes en triangle obtient-on ?\nc) Quel solide ne laisse que des carrés ?",
          correction:
            "Une empreinte, c'est la forme d'une face plate.\na) Le cylindre a 2 faces plates : 2 disques. 2 empreintes rondes.\nSa face courbe ne laisse pas d'empreinte plate.\nb) La pyramide à base carrée a 4 triangles et 1 carré. 4 empreintes en triangle.\nc) Le cube a 6 faces, toutes carrées. Il ne laisse que des carrés.\n⛔ Le piège : compter la face courbe du cylindre. Elle n'est pas plate.\nRéponse : a) 2 ; b) 4 ; c) le cube.",
          micros: ["solide_face"],
          reponses: [
            { question: "a)", attendu: ["2", "2 empreintes"] },
            { question: "b)", attendu: ["4", "4 empreintes"] },
            { question: "c)", attendu: ["cube", "le cube", "un cube"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème en plusieurs étapes. Je dessine, je compte avec méthode, je vérifie.",
      rappel: [
        "Cube : 6 faces, 12 arêtes, 8 sommets.",
        "Pour compter des cubes, je compte couche par couche.",
        "Un patron de boîte ouverte a 5 carrés : il manque le couvercle.",
        "Une pyramide a une base, et autant de triangles que la base a de côtés.",
      ],
      exercices: [
        {
          titre: "Le cube en pailles",
          enonce:
            "En sciences, Inès fabrique le squelette d'un cube. Chaque arête est une paille de 10 cm. Aux sommets, elle met une boule de pâte à modeler.\na) Combien de pailles lui faut-il ?\nb) Combien de boules de pâte ?\nc) Quelle longueur de paille utilise-t-elle en tout ?",
          correction:
            "Le squelette, ce sont les arêtes et les sommets du cube.\na) Une paille par arête. Le cube a 12 arêtes : 12 pailles.\nb) Une boule par sommet. Le cube a 8 sommets : 8 boules.\nc) 12 pailles de 10 cm : 12 × 10 = 120 cm.\n⛔ Le piège : compter seulement les arêtes qu'on voit sur un dessin (9). Le squelette a toutes ses arêtes.\nRéponse : a) 12 ; b) 8 ; c) 120 cm.",
          micros: ["solide_defi", "solide_sommet_arete_face"],
          reponses: [
            { question: "a)", attendu: ["12", "12 pailles"] },
            { question: "b)", attendu: ["8", "8 boules"] },
            { question: "c)", attendu: ["120", "120 cm"] },
          ],
        },
        {
          titre: "Le cube peint",
          enonce:
            "Une sculptrice assemble des petits cubes pour faire un grand cube : 3 cubes de long, 3 de large, 3 de haut. Elle peint tout l'extérieur en rouge.\na) Combien de petits cubes y a-t-il ?\nb) Les petits cubes des coins ont 3 faces peintes. Combien y en a-t-il ?\nc) Combien de petits cubes n'ont aucune face peinte ?",
          figure: cadre(
            175,
            "Un grand cube fait de 3 × 3 × 3 petits cubes",
            <>
              {cubes(
                [0, 1, 2].flatMap((x) => [0, 1, 2].flatMap((y) => [0, 1, 2].map((z) => [x, y, z] as V3))),
                [85, 165],
                35,
              )}
            </>,
          ),
          correction:
            "a) Une couche : 3 × 3 = 9 petits cubes. Il y a 3 couches : 9 × 3 = 27.\nb) Un petit cube de coin est peint sur 3 faces. Le grand cube a 8 coins : 8 petits cubes.\nc) Un petit cube sans peinture ne touche aucune face du grand cube.\nIl est caché au centre, au milieu de la couche du milieu. Il y en a 1.\n⛔ Le piège : oublier le cube du centre. On ne le voit pas, mais il est bien là.\nRéponse : a) 27 ; b) 8 ; c) 1.",
          micros: ["solide_defi"],
          reponses: [
            { question: "a)", attendu: ["27", "27 cubes"] },
            { question: "b)", attendu: ["8", "8 cubes"] },
            { question: "c)", attendu: ["1", "1 cube"] },
          ],
        },
        {
          titre: "La boîte du potier",
          enonce:
            "Un potier veut une boîte en carton, en cube, SANS couvercle. Il dessine trois patrons de 5 carrés.\na) Quel patron donne la boîte ouverte ? Réponds A, B ou C.\nb) Combien de carrés faudrait-il pour une boîte fermée ?",
          figure: cadre(
            122,
            "Trois patrons de 5 carrés, A, B et C",
            <>
              {patron([{ c: 1, r: 0 }, { c: 0, r: 1 }, { c: 1, r: 1 }, { c: 2, r: 1 }, { c: 1, r: 2 }], [12, 12], 22)}
              {patron([{ c: 0, r: 0 }, { c: 1, r: 0 }, { c: 0, r: 1 }, { c: 1, r: 1 }, { c: 2, r: 1 }], [102, 23], 22)}
              {patron([{ c: 0, r: 0 }, { c: 1, r: 0 }, { c: 2, r: 0 }, { c: 3, r: 0 }, { c: 4, r: 0 }], [186, 34], 22)}
              {texte(45, 112, "A")}
              {texte(135, 112, "B")}
              {texte(241, 112, "C")}
            </>,
          ),
          correction:
            "La boîte ouverte a 5 faces : un fond et 4 côtés.\nA : le carré du milieu est le fond. Les 4 carrés autour se relèvent : ce sont les 4 côtés. La boîte est faite.\nB : 4 carrés en bloc, 2 sur 2. En pliant, ils se recouvrent : pas de boîte.\nC : 5 carrés en ligne. Le 5e recouvre le 1er : pas de boîte.\na) Le patron A.\nb) Une boîte fermée a 6 faces : 6 carrés, avec le couvercle.\n⛔ Le piège : chercher 6 carrés. Sans couvercle, la boîte n'a que 5 faces.\nRéponse : a) A ; b) 6.",
          micros: ["solide_patron", "solide_patron_construire"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: ["6", "6 carrés"] },
          ],
        },
        {
          titre: "Le toit du kiosque",
          enonce:
            "Le toit d'un kiosque à musique est une pyramide. Sa base a 6 côtés : c'est un hexagone.\na) Combien de faces en triangle a cette pyramide ?\nb) Combien a-t-elle de faces en tout, base comprise ?\nc) Combien a-t-elle de sommets ?\nd) Combien a-t-elle d'arêtes ?",
          figure: cadre(150, "Une pyramide à base hexagonale dessinée en perspective", <>{solide3(pyramideHexa(1, 2), [75, 140], 48)}</>),
          correction:
            "La pyramide a autant de triangles que sa base a de côtés.\na) La base a 6 côtés : 6 triangles.\nb) 6 triangles + 1 base = 7 faces.\nc) Les 6 coins de la base, plus la pointe : 6 + 1 = 7 sommets.\nd) 6 arêtes autour de la base, et 6 qui montent à la pointe : 6 + 6 = 12 arêtes.\n⛔ Le piège : oublier la base dans le compte des faces. Elle ferme le dessous.\nRéponse : a) 6 ; b) 7 ; c) 7 ; d) 12.",
          micros: ["solide_defi", "solide_face", "solide_sommet_arete_face"],
          reponses: [
            { question: "a)", attendu: ["6", "6 faces"] },
            { question: "b)", attendu: ["7", "7 faces"] },
            { question: "c)", attendu: ["7", "7 sommets"] },
            { question: "d)", attendu: ["12", "12 arêtes"] },
          ],
        },
        {
          titre: "Les cartons de la pâtissière",
          enonce:
            "Une pâtissière range des boîtes à gâteaux en forme de cube, de 10 cm de côté. Son carton est un pavé : 40 cm de long, 30 cm de large et 20 cm de haut.\na) Combien de boîtes tiennent au fond du carton, sur une couche ?\nb) Combien de couches peut-elle empiler ?\nc) Combien de boîtes tiennent dans le carton ?",
          correction:
            "Je compte combien de boîtes de 10 cm tiennent dans chaque sens.\nLongueur : 40 ÷ 10 = 4 boîtes. Largeur : 30 ÷ 10 = 3 boîtes. Hauteur : 20 ÷ 10 = 2 boîtes.\na) Au fond : 4 rangées de 3, soit 4 × 3 = 12 boîtes.\nb) 2 couches.\nc) 12 boîtes par couche, 2 couches : 12 × 2 = 24 boîtes.\n⛔ Le piège : additionner 4 + 3 + 2 = 9. Il faut multiplier : 4 × 3 × 2.\nRéponse : a) 12 ; b) 2 ; c) 24.",
          micros: ["solide_defi"],
          reponses: [
            { question: "a)", attendu: ["12", "12 boîtes"] },
            { question: "b)", attendu: ["2", "2 couches"] },
            { question: "c)", attendu: ["24", "24 boîtes"] },
          ],
        },
      ],
    },
  ],
};
