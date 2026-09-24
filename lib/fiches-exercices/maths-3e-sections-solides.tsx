// ─── Fiche d'exercices : les sections planes de solides (3e) — 20 exercices ───
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-sections-solides.tsx` et
// sur les six micros du coach de 3e (notionId sections_solides). On reste dans
// le programme : NOMMER la section (pavé, cube, cylindre, cône, pyramide,
// boule) puis CALCULER À PLAT dans la section — Pythagore, rayon d'une section
// de boule (r² = R² − d²), coefficient de réduction d'une pyramide ou d'un cône.
// ⛔ Aucun volume : c'est la notion `volume_solide`, une autre feuille.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le cube de 5 cm, ni le
// cylindre de rayon 3 et de hauteur 10, ni la section 6 × 8 et sa diagonale de
// 10, ni le cône de rayon 6 coupé à mi-hauteur.
//
// Les trois pièges qui reviennent :
// - un cylindre coupé parallèlement à son axe donne un RECTANGLE, pas un disque
//   (exercices 4, 5, 11, 15, 16) ;
// - la section d'une boule n'a pas le rayon R de la boule, sauf si le plan passe
//   par le centre (8, 12, 18, 19) ;
// - la section d'une pyramide ou d'un cône est une RÉDUCTION de la base, et le
//   coefficient se compte depuis le SOMMET (6, 7, 13, 14, 17).
//
// Les chiffres du monde, et d'où ils viennent :
// - Rubik's Cube 3 × 3 : 57 mm d'arête (Rubik's Brand, fiche produit) — ex. 2 ;
// - meule de comté : 55 à 75 cm de diamètre, 8 à 13 cm de haut (cahier des
//   charges de l'AOP Comté) ; on prend 70 cm et 10 cm — ex. 4 ;
// - pyramide du Louvre (I. M. Pei, 1989) : base carrée de 35,42 m de côté,
//   21,64 m de haut (musée du Louvre) ; arrondis à 35,4 m et 21,6 m — ex. 17 ;
// - rayon moyen de la Terre : 6 371 km (UGGI) ; Paris est à 48,86° de latitude
//   nord, donc le plan de son parallèle passe à 6 371 × sin 48,86° ≈ 4 797 km du
//   centre (le sinus n'est pas demandé à l'élève) — ex. 18 ;
// - conteneur de 20 pieds : dimensions INTÉRIEURES courantes 5,90 m × 2,35 m ×
//   2,39 m (la norme ISO 668 fixe l'extérieur, 6,058 × 2,438 × 2,591 m ; l'intérieur
//   varie de quelques centimètres selon le fabricant) — ex. 20.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : dans presque chaque
// corrigé, le solide et son plan de coupe (le canvas `section_solide` de la
// fiche de cours, TOUS ses textes éteints) PUIS la section dessinée en vraie
// grandeur relative : rectangles à la même échelle, profil d'un cône ou d'une
// pyramide avec sa coupe, cercle coupé et son triangle rectangle O-H-M.
// ⛔ `showSectionName` reste à `false` PARTOUT, énoncé comme corrigé : le canvas
// écrirait « Section : disque » sur le dessin, c'est-à-dire la réponse. C'est la
// légende HTML sous le dessin qui parle, et elle ne dit jamais la réponse dans
// un énoncé.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-sections-solides-3e.mjs`
// — les sections de pavés et de pyramides sont retrouvées en COUPANT LES ARÊTES
// par le plan (coordonnées), les rayons de boule par dichotomie sur l'équation
// de la sphère, les réductions par les coordonnées d'une génératrice ; les
// dessins sont relus dans ce source.
//
// Micro-compétences : section_reconnaitre (1, 8, 12, 15, 18), section_pave_cube
// (2, 3, 9, 10, 15, 20), section_cylindre (4, 5, 11, 15, 16),
// section_cone_pyramide (6, 7, 13, 14, 15, 17), section_calculer_longueur (8 à
// 14, 16 à 20), section_defi (16 à 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { triangle } from "@/lib/fiches-exercices/figures";

const BLEU_CORPS = "#dbeafe";
const TRAIT = "#0f172a";
const ORANGE_FOND = "#fed7aa";
const ORANGE_TRAIT = "#f97316";
const ROUGE = "#b91c1c";

/**
 * Le solide et son plan de coupe : le canvas de la fiche de cours, cadre 230 ×
 * 215, TOUS les textes du SVG éteints. ⛔ `showSectionName: false` : sinon le
 * canvas écrit le nom de la section, c'est-à-dire la réponse.
 * La légende est du texte NU (pas de `$`), en HTML sous le dessin.
 */
const coupe = (
  solide: "cube" | "pave_droit" | "cylindre" | "cone" | "pyramide",
  section: "parallele_face" | "parallele_base" | "parallele_axe" | "diagonale" | "verticale",
  legende: string,
) => (
  <div className="mx-auto w-full max-w-[15rem] print:max-w-[11rem]">
    <CanvasRenderer
      figure={
        {
          kind: "section_solide",
          solide,
          section,
          size: { width: 230, height: 215 },
          display: { showPlane: true, showLabels: false, showSectionName: false, showCallouts: false },
        } as never
      }
    />
    <p className="mt-1 text-center text-xs font-bold text-slate-600">{legende}</p>
  </div>
);

/**
 * Des rectangles (ou des carrés) À LA MÊME ÉCHELLE : la section en vraie
 * grandeur relative. `bas` s'écrit dessous, `cote` le long du bord gauche,
 * `diag` sur la diagonale tracée en pointillés.
 * ⭐ Le script de recalcul relit `l` et `h` : les écrire en clair.
 */
const rectangles = (liste: { l: number; h: number; bas?: string; cote?: string; diag?: string }[]) => {
  const ech = Math.min(150 / Math.max(...liste.map((r) => r.l)), 90 / Math.max(...liste.map((r) => r.h)));
  const ecart = 30;
  const haut = Math.max(...liste.map((r) => r.h)) * ech;
  const largeur = liste.reduce((s, r) => s + r.l * ech, 0) + ecart * (liste.length + 1);
  let x = ecart;
  // ⛔ MESURÉ À 375 PX (24/09) : trois rectangles côte à côte (≈ 480 unités)
  // tassés dans 288 px mettaient les cotes à 7 px. Plusieurs rectangles gardent
  // donc leur largeur naturelle (cotes à 11 px au moins) dans un cadre qui
  // défile sur téléphone — comme l'arbre de `figures.tsx`. Pas sur papier.
  const plusieurs = liste.length > 1;
  return (
    <div className={plusieurs ? "mx-auto w-full overflow-x-auto print:overflow-visible" : "contents"}>
    <svg
      viewBox={`0 0 ${largeur.toFixed(0)} ${(haut + 44).toFixed(0)}`}
      role="img"
      aria-label={liste.map((r) => `Un rectangle ${r.bas ?? ""} sur ${r.cote ?? ""}`).join(". ")}
      className={plusieurs ? "mx-auto block print:!min-w-0 print:max-w-[13rem]" : "mx-auto w-full max-w-[18rem] print:max-w-[13rem]"}
      style={plusieurs ? { minWidth: `${Math.ceil(largeur)}px`, maxWidth: `${Math.ceil(largeur * 1.2)}px` } : undefined}
    >
      {liste.map((r, i) => {
        const w = r.l * ech;
        const h = r.h * ech;
        const x0 = x;
        x += w + ecart;
        const y0 = 12 + haut - h;
        return (
          <g key={i}>
            <rect x={x0} y={y0} width={w} height={h} fill={ORANGE_FOND} stroke={ORANGE_TRAIT} strokeWidth={2} />
            {r.diag ? (
              <>
                <line x1={x0} y1={y0 + h} x2={x0 + w} y2={y0} stroke={ROUGE} strokeWidth={1.6} strokeDasharray="5 3" />
                <text x={x0 + w / 2} y={y0 + h / 2 - 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={ROUGE} stroke="white" strokeWidth={3} paintOrder="stroke">
                  {r.diag}
                </text>
              </>
            ) : null}
            {r.bas ? (
              <text x={x0 + w / 2} y={12 + haut + 16} textAnchor="middle" fontSize={11} fill={TRAIT}>
                {r.bas}
              </text>
            ) : null}
            {r.cote ? (
              <text
                x={x0 - 5}
                y={y0 + h / 2}
                textAnchor="middle"
                fontSize={11}
                fill={TRAIT}
                transform={`rotate(-90 ${x0 - 5} ${y0 + h / 2})`}
              >
                {r.cote}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
    </div>
  );
};

/**
 * Un cercle coupé par une droite à la distance `d` du centre, en vraies
 * proportions : c'est la boule vue de profil (ou le tronc vu par son bout).
 * O le centre, H le centre de la section, M un point du bord de la section :
 * le triangle OHM est rectangle en H, OM = R, OH = d, HM = r.
 * ⭐ Le script relit `R` et `d`.
 */
const cercleCoupe = (R: number, d: number, t: { R?: string; d?: string; r?: string } = {}) => {
  const s = 80 / R;
  const [cx, cy] = [110, 100];
  const r = Math.sqrt(R * R - d * d);
  const yH = cy - d * s;
  const xM = cx + r * s;
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label="Un cercle de centre O coupé par un plan ; le triangle OHM est rectangle en H" className="mx-auto w-full max-w-[14rem] print:max-w-[11rem]">
      <circle cx={cx} cy={cy} r={R * s} fill={BLEU_CORPS} stroke={TRAIT} strokeWidth={2} />
      <ellipse cx={cx} cy={yH} rx={r * s} ry={Math.max(4, r * s * 0.12)} fill={ORANGE_FOND} stroke={ORANGE_TRAIT} strokeWidth={2.2} opacity={0.9} />
      <line x1={cx} y1={cy} x2={cx} y2={yH} stroke={TRAIT} strokeWidth={1.6} strokeDasharray="4 3" />
      <line x1={cx} y1={yH} x2={xM} y2={yH} stroke={ROUGE} strokeWidth={2.4} />
      <line x1={cx} y1={cy} x2={xM} y2={yH} stroke="#2563eb" strokeWidth={2.2} />
      <polyline points={`${cx + 8},${yH} ${cx + 8},${yH + 8} ${cx},${yH + 8}`} fill="none" stroke={TRAIT} strokeWidth={1.2} />
      <circle cx={cx} cy={cy} r={2.6} fill={TRAIT} />
      <text x={cx - 6} y={cy + 14} fontSize={12} fontWeight={800} fill={TRAIT}>O</text>
      <text x={cx - 14} y={yH - 5} fontSize={12} fontWeight={800} fill={TRAIT}>H</text>
      <text x={xM + 4} y={yH - 4} fontSize={12} fontWeight={800} fill={TRAIT}>M</text>
      {t.d ? (
        <text x={cx - 6} y={(cy + yH) / 2 + 4} textAnchor="end" fontSize={11} fill={TRAIT} stroke="white" strokeWidth={3} paintOrder="stroke">{t.d}</text>
      ) : null}
      {t.r ? (
        <text x={(cx + xM) / 2} y={yH - 8} textAnchor="middle" fontSize={11} fontWeight={700} fill={ROUGE} stroke="white" strokeWidth={3} paintOrder="stroke">{t.r}</text>
      ) : null}
      {t.R ? (
        <text x={(cx + xM) / 2 + 8} y={(cy + yH) / 2 + 12} fontSize={11} fontWeight={700} fill="#2563eb" stroke="white" strokeWidth={3} paintOrder="stroke">{t.R}</text>
      ) : null}
    </svg>
  );
};

/**
 * Le PROFIL d'un cône ou d'une pyramide (coupe verticale par le sommet), en
 * vraies proportions : base de largeur `base`, hauteur `H`, et la coupe
 * horizontale à la distance `h` DU SOMMET, de largeur base × h ÷ H.
 * ⭐ Le script relit `base`, `H` et `h`.
 */
const profil = (base: number, H: number, h: number, t: { base?: string; H?: string; h?: string; coupe?: string } = {}) => {
  const s = Math.min(170 / base, 140 / H);
  const S = { x: 120, y: 18 };
  const yB = S.y + H * s;
  const yC = S.y + h * s;
  const demiB = (base * s) / 2;
  const demiC = ((base * h) / H) * s / 2;
  return (
    <svg viewBox={`0 0 240 ${(yB + 28).toFixed(0)}`} role="img" aria-label="Le profil du solide, coupé parallèlement à sa base" className="mx-auto w-full max-w-[15rem] print:max-w-[11rem]">
      <polygon points={`${S.x},${S.y} ${S.x - demiB},${yB} ${S.x + demiB},${yB}`} fill={BLEU_CORPS} stroke={TRAIT} strokeWidth={2} />
      <line x1={S.x} y1={S.y} x2={S.x} y2={yB} stroke={TRAIT} strokeWidth={1.2} strokeDasharray="4 3" />
      <line x1={S.x - demiC} y1={yC} x2={S.x + demiC} y2={yC} stroke={ORANGE_TRAIT} strokeWidth={3.2} />
      <text x={S.x} y={S.y - 5} textAnchor="middle" fontSize={11} fontWeight={800} fill={TRAIT}>S</text>
      {t.base ? <text x={S.x} y={yB + 16} textAnchor="middle" fontSize={11} fill={TRAIT}>{t.base}</text> : null}
      {t.H ? <text x={S.x + demiB + 4} y={(S.y + yB) / 2 + 20} fontSize={11} fill={TRAIT}>{t.H}</text> : null}
      {t.h ? <text x={S.x + 4} y={(S.y + yC) / 2 + 4} fontSize={11} fill={TRAIT} stroke="white" strokeWidth={3} paintOrder="stroke">{t.h}</text> : null}
      {t.coupe ? <text x={S.x - demiC - 4} y={yC + 4} textAnchor="end" fontSize={11} fontWeight={700} fill={ORANGE_TRAIT} stroke="white" strokeWidth={3} paintOrder="stroke">{t.coupe}</text> : null}
    </svg>
  );
};

/** Deux dessins côte à côte (l'un sous l'autre sur un téléphone). */
const ensemble = (...dessins: ReactNode[]) => (
  <div className="grid items-center gap-3 sm:grid-cols-2 print:grid-cols-2">
    {dessins.map((d, i) => (
      <div key={i}>{d}</div>
    ))}
  </div>
);

export const exercicesSectionsSolides3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "sections-solides",
  titre: "Les sections planes de solides",
  accroche:
    "Vingt exercices, de la tranche de fromage au parallèle de Paris : nommer la section d'un pavé, d'un cylindre, d'un cône, d'une pyramide ou d'une boule, puis calculer à plat dedans. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le dessin du solide coupé et la section en vraie grandeur.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/sections-solides", titre: "Les sections planes de solides" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je repère comment le plan coupe le solide, puis je nomme la figure obtenue et je donne ses dimensions.",
      rappel: [
        "Une SECTION PLANE, c'est la figure qu'on obtient en coupant un solide par un plan. C'est une figure PLANE : elle n'a que deux dimensions.",
        "Pavé droit coupé parallèlement à une face : un rectangle, identique à cette face. Pour un cube, un carré.",
        "Cylindre : parallèlement à la base, un disque de même rayon ; parallèlement à l'axe, un RECTANGLE.",
        "Cône ou pyramide coupés parallèlement à la base : une RÉDUCTION de la base. Boule : toujours un disque, de rayon au plus égal à celui de la boule.",
      ],
      exercices: [
        {
          enonce:
            "On coupe un concombre en rondelles, bien droit, perpendiculairement à sa longueur. On l'assimile à un cylindre.\na) La rondelle est-elle la section plane ? Sinon, qu'est-ce que la section ?\nb) Combien de dimensions a une section plane ?\nc) Quelle est la forme de la section ?",
          correction:
            "a) Non. La rondelle a une épaisseur : c'est un petit cylindre, un solide. La section, c'est la FACE que le couteau vient de créer, la surface plate qu'on voit sur la rondelle.\nb) Une section est une figure plane : deux dimensions, comme une figure tracée sur une feuille. Elle n'a pas d'épaisseur.\nc) Le couteau est perpendiculaire à la longueur, donc parallèle à la base du cylindre. La section est un disque, de même rayon que le concombre.\n⛔ Le piège : confondre la tranche (un solide) et la section (une figure plane). On mesure une section en cm ou en cm², jamais en cm³.\nRéponse : la section est la face coupée, un disque, figure plane à deux dimensions.",
          schema: coupe("cylindre", "parallele_base", "la face coupée : un disque, figure plane"),
          micros: ["section_reconnaitre"],
        },
        {
          enonce:
            "Un Rubik's Cube est un cube de $5{,}7$ cm d'arête. On le coupe par un plan parallèle à l'une de ses faces.\na) Quelle est la nature de la section ?\nb) Donner ses dimensions.\nc) Calculer son périmètre.",
          correction:
            "a) Le plan est parallèle à une face. La section est donc identique à cette face. Les faces d'un cube sont des carrés : la section est un CARRÉ.\nb) Ce carré a le même côté que la face, l'arête du cube : $5{,}7$ cm. Peu importe à quelle hauteur on coupe, la section ne change pas.\nc) Le périmètre d'un carré, c'est $4$ fois le côté : $4 \\times 5{,}7 = 22{,}8$ cm.\n⛔ Le piège : croire que la section rapetisse quand le plan s'éloigne de la face. Ça, c'est la pyramide ; le cube a la même largeur de haut en bas.\nRéponse : un carré de $5{,}7$ cm de côté, de périmètre $22{,}8$ cm.",
          schema: ensemble(
            coupe("cube", "parallele_face", "le plan est parallèle à une face"),
            rectangles([{ l: 5.7, h: 5.7, bas: "5,7 cm", cote: "5,7 cm" }]),
          ),
          micros: ["section_pave_cube"],
        },
        {
          enonce:
            "$ABCDEFGH$ est un pavé droit avec $AB = 8$ cm, $AD = 5$ cm et $AE = 3$ cm. La face $ABCD$ est le fond, $E$ est au-dessus de $A$.\nDonner la nature et les dimensions de la section par un plan parallèle :\na) à la face $ABCD$ ;\nb) à la face $ADHE$ ;\nc) à la face $ABFE$.",
          correction:
            "Chaque fois, la section est un rectangle identique à la face à laquelle le plan est parallèle. Je lis donc les dimensions de cette face.\na) La face $ABCD$ a pour côtés $AB = 8$ cm et $AD = 5$ cm : la section est un rectangle de $8$ cm sur $5$ cm.\nb) La face $ADHE$ a pour côtés $AD = 5$ cm et $AE = 3$ cm : un rectangle de $5$ cm sur $3$ cm.\nc) La face $ABFE$ a pour côtés $AB = 8$ cm et $AE = 3$ cm : un rectangle de $8$ cm sur $3$ cm.\n⛔ Le piège : répondre « un triangle » ou « un carré ». Un pavé coupé parallèlement à une face donne toujours un rectangle, et celui-ci n'est un carré que si la face en est un.\nRéponse : $8$ cm sur $5$ cm ; $5$ cm sur $3$ cm ; $8$ cm sur $3$ cm.",
          schema: rectangles([
            { l: 8, h: 5, bas: "a) 8 cm", cote: "5 cm" },
            { l: 5, h: 3, bas: "b) 5 cm", cote: "3 cm" },
            { l: 8, h: 3, bas: "c) 8 cm", cote: "3 cm" },
          ]),
          micros: ["section_pave_cube"],
        },
        {
          enonce:
            "Une meule de comté est un cylindre de $70$ cm de diamètre et de $10$ cm de hauteur.\na) Le fromager la coupe en deux meules plus fines, par un plan parallèle à ses faces rondes. Quelle est la section ?\nb) Il la coupe ensuite en deux moitiés, par un plan vertical qui passe par l'axe. Quelle est la section ? Donner ses dimensions.",
          correction:
            "a) Le plan est parallèle à la base du cylindre : la section est un disque, de même rayon que la meule. Le rayon est la moitié du diamètre : $70 \\div 2 = 35$ cm.\nb) Cette fois le plan contient l'axe : la section est un RECTANGLE. Sa largeur traverse toute la meule en passant par le centre, c'est le diamètre, $70$ cm. Sa hauteur est celle de la meule, $10$ cm.\n⛔ Le piège : dire « un disque » parce que la meule est ronde. Coupé parallèlement à son axe, un cylindre donne un rectangle.\nRéponse : a) un disque de rayon $35$ cm ; b) un rectangle de $70$ cm sur $10$ cm.",
          schema: ensemble(
            coupe("cylindre", "parallele_axe", "coupe par un plan contenant l'axe"),
            rectangles([{ l: 70, h: 10, bas: "70 cm (le diamètre)", cote: "10 cm" }]),
          ),
          micros: ["section_cylindre"],
        },
        {
          enonce:
            "Une boîte de conserve est un cylindre de rayon $4$ cm et de hauteur $11$ cm. Vrai ou faux ? Justifier.\na) Toute section de cette boîte par un plan est un disque.\nb) Coupée parallèlement à son fond, à $3$ cm du bas, elle donne un disque de rayon $4$ cm.\nc) Coupée par un plan contenant son axe, elle donne un rectangle de $4$ cm sur $11$ cm.",
          correction:
            "a) FAUX. Ça dépend de la coupe. Parallèlement au fond, on obtient un disque ; parallèlement à l'axe, un rectangle.\nb) VRAI. Parallèlement à la base, la section est un disque de même rayon que la base, à n'importe quelle hauteur : $4$ cm.\nc) FAUX. Le plan passe par l'axe, donc la largeur du rectangle traverse toute la boîte : c'est le DIAMÈTRE, $2 \\times 4 = 8$ cm, pas le rayon. La section est un rectangle de $8$ cm sur $11$ cm.\n⛔ Le piège : la question n'est jamais « quelle est la section d'un cylindre », mais « coupé comment ».\nRéponse : faux, vrai, faux.",
          schema: ensemble(
            coupe("cylindre", "parallele_axe", "le plan contient l'axe"),
            rectangles([{ l: 8, h: 11, bas: "8 cm", cote: "11 cm" }]),
          ),
          micros: ["section_cylindre"],
        },
        {
          enonce:
            "Une pyramide a pour base un carré de $6$ cm de côté et pour hauteur $10$ cm. On la coupe à mi-hauteur par un plan parallèle à sa base.\na) Quelle est la nature de la section ?\nb) Quelle est la longueur de son côté ?",
          correction:
            "a) Coupée parallèlement à sa base, une pyramide donne une RÉDUCTION de la base : même forme, taille plus petite. La base est un carré, la section est donc un carré.\nb) Le plan est à mi-hauteur, donc à $5$ cm du sommet sur $10$ cm. Le coefficient de réduction se compte depuis le sommet : $k = 5 \\div 10 = 0{,}5$. Le côté vaut $6 \\times 0{,}5 = 3$ cm.\n⛔ Le piège : répondre $6$ cm, comme pour un pavé. La pyramide se resserre vers le sommet : sa section rapetisse.\nRéponse : un carré de $3$ cm de côté.",
          schema: ensemble(
            coupe("pyramide", "parallele_base", "coupe parallèle à la base"),
            rectangles([
              { l: 6, h: 6, bas: "la base : 6 cm" },
              { l: 3, h: 3, bas: "la section : 3 cm" },
            ]),
          ),
          micros: ["section_cone_pyramide"],
        },
        {
          enonce:
            "Un cône de révolution a une base de rayon $5$ cm et une hauteur de $12$ cm. On le coupe par un plan parallèle à la base, à $3$ cm du sommet.\na) Quelle est la nature de la section ?\nb) Calculer son rayon.",
          correction:
            "a) Coupé parallèlement à sa base, un cône donne un disque plus petit : une réduction de la base.\nb) Le plan est à $3$ cm du sommet, sur une hauteur de $12$ cm. Le coefficient de réduction est $k = 3 \\div 12 = 0{,}25$. Toutes les longueurs de la base sont multipliées par $k$ : le rayon vaut $5 \\times 0{,}25 = 1{,}25$ cm.\n⛔ Le piège : garder le rayon $5$ cm, comme pour un cylindre. Ou calculer $k$ depuis la base, $9 \\div 12$ : le coefficient se compte toujours depuis le SOMMET.\nRéponse : un disque de rayon $1{,}25$ cm.",
          schema: profil(10, 12, 3, { base: "rayon 5 cm", H: "12 cm", h: "3 cm", coupe: "1,25 cm" }),
          micros: ["section_cone_pyramide"],
        },
        {
          enonce:
            "Une orange est assimilée à une boule de centre $O$ et de rayon $4$ cm. On la coupe par un plan situé à $2{,}4$ cm du centre.\na) Quelle est la nature de la section ?\nb) Calculer son rayon.",
          correction:
            "a) Toute section d'une boule par un plan est un DISQUE. Son centre $H$ est le pied de la perpendiculaire menée de $O$ au plan : $OH = 2{,}4$ cm.\nb) Je prends un point $M$ du bord de la section. Le triangle $OHM$ est rectangle en $H$, et $OM = 4$ cm puisque $M$ est sur la boule. Par Pythagore : $HM^2 = OM^2 - OH^2 = 4^2 - 2{,}4^2 = 16 - 5{,}76 = 10{,}24$. Donc $HM = \\sqrt{10{,}24} = 3{,}2$ cm.\n⛔ Le piège : répondre $4$ cm. Le rayon de la section n'est celui de la boule que si le plan passe par le centre.\nRéponse : un disque de rayon $3{,}2$ cm.",
          schema: ensemble(
            cercleCoupe(4, 2.4, { d: "2,4", r: "3,2", R: "4" }),
            triangle(
              { A: [0, 0], B: [0, 2.4], C: [3.2, 2.4] },
              { noms: { A: "O", B: "H", C: "M" }, cotes: { AB: "2,4 cm", BC: "3,2 cm", CA: "4 cm" }, droit: "B" },
            ),
          ),
          micros: ["section_reconnaitre", "section_calculer_longueur"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet. Je nomme la section, je la dessine à plat, puis je calcule dedans.",
      rappel: [
        "Dans la section, on calcule À PLAT : c'est une figure plane ordinaire, on y applique Pythagore, le périmètre, l'aire.",
        "Boule de centre $O$ et de rayon $R$, plan à la distance $d$ de $O$ : la section est un disque de centre $H$ et de rayon $r$, avec $r^2 = R^2 - d^2$ (triangle $OHM$ rectangle en $H$).",
        "Pyramide ou cône de hauteur $h$, coupés parallèlement à la base à la distance $h'$ du SOMMET : réduction de coefficient $k = h' \\div h$. Chaque longueur est multipliée par $k$.",
      ],
      exercices: [
        {
          enonce:
            "$ABCDEFGH$ est un cube d'arête $4$ cm. On le coupe par le plan qui contient les arêtes $[AE]$ et $[CG]$.\na) Quelle est la nature de la section $ACGE$ ?\nb) Calculer la valeur exacte de $AC$, puis son arrondi au centième.\nc) La section est-elle un carré ?\nd) Calculer son aire, arrondie au centième.",
          figure: coupe("cube", "diagonale", "le plan contient les arêtes [AE] et [CG]"),
          correction:
            "a) Les arêtes $[AE]$ et $[CG]$ sont verticales, parallèles et de même longueur $4$ cm. La section $ACGE$ a deux côtés verticaux et deux côtés $[AC]$ et $[EG]$ qui sont les diagonales du fond et du dessus : c'est un RECTANGLE.\nb) $[AC]$ est la diagonale du carré $ABCD$. Le triangle $ABC$ est rectangle en $B$ : $AC^2 = AB^2 + BC^2 = 16 + 16 = 32$. Donc $AC = \\sqrt{32} \\approx 5{,}66$ cm.\nc) Non : ses côtés mesurent $4$ cm et environ $5{,}66$ cm.\nd) L'aire d'un rectangle, c'est longueur × largeur : $4 \\times \\sqrt{32} \\approx 22{,}63$ cm².\n⛔ Le piège : croire que toute section d'un cube est un carré. Parallèlement à une face, oui ; par deux arêtes opposées, c'est un rectangle plus long que haut.\nRéponse : un rectangle de $4$ cm sur $\\sqrt{32} \\approx 5{,}66$ cm, d'aire environ $22{,}63$ cm².",
          schema: ensemble(
            triangle(
              { A: [0, 0], B: [4, 0], C: [4, 4] },
              { cotes: { AB: "4 cm", BC: "4 cm", CA: "√32 ≈ 5,66 cm" }, droit: "B" },
            ),
            rectangles([{ l: 5.66, h: 4, bas: "AC ≈ 5,66 cm", cote: "AE = 4 cm" }]),
          ),
          micros: ["section_pave_cube", "section_calculer_longueur"],
        },
        {
          enonce:
            "Une boîte à chaussures est un pavé droit de $33$ cm de long, $20$ cm de large et $12$ cm de haut. On la coupe par un plan parallèle à la face de $20$ cm sur $12$ cm.\na) Quelle est la nature de la section ? Ses dimensions ?\nb) Calculer la longueur de sa diagonale, arrondie au centième.\nc) Calculer son aire.",
          correction:
            "a) Le plan est parallèle à une face : la section est un rectangle identique à cette face, de $20$ cm sur $12$ cm.\nb) La diagonale partage le rectangle en deux triangles rectangles. Par Pythagore : $d^2 = 20^2 + 12^2 = 400 + 144 = 544$. Donc $d = \\sqrt{544} \\approx 23{,}32$ cm.\nc) $20 \\times 12 = 240$ cm².\n⛔ Le piège : écrire $d = 20 + 12 = 32$ cm. Une diagonale est toujours plus courte que la somme des deux côtés : j'additionne les CARRÉS, puis je prends la racine.\nRéponse : un rectangle de $20$ cm sur $12$ cm, de diagonale environ $23{,}32$ cm et d'aire $240$ cm².",
          schema: ensemble(
            coupe("pave_droit", "parallele_face", "le plan est parallèle à une face"),
            rectangles([{ l: 20, h: 12, bas: "20 cm", cote: "12 cm", diag: "≈ 23,32 cm" }]),
          ),
          micros: ["section_pave_cube", "section_calculer_longueur"],
        },
        {
          enonce:
            "Un tronc d'arbre est assimilé à un cylindre de rayon $25$ cm et de longueur $3$ m. Le scieur le coupe par un plan parallèle à l'axe, situé à $15$ cm de l'axe, pour obtenir une planche.\na) Quelle est la nature de la section ?\nb) Calculer sa largeur.\nc) Donner ses dimensions.",
          correction:
            "a) Le plan est parallèle à l'axe : la section est un RECTANGLE. Sa longueur est celle du tronc, $3$ m.\nb) Je regarde le tronc par son bout : un disque de centre $O$ et de rayon $25$ cm, coupé par une droite à $15$ cm de $O$. $H$ est le milieu de la largeur, $M$ une de ses extrémités. Le triangle $OHM$ est rectangle en $H$ : $HM^2 = OM^2 - OH^2 = 625 - 225 = 400$, donc $HM = 20$ cm. La largeur vaut $2 \\times 20 = 40$ cm.\nc) Un rectangle de $40$ cm sur $3$ m.\n⛔ Le piège : prendre le diamètre, $50$ cm, comme largeur. Ce n'est vrai que si le plan passe PAR l'axe ; ici il est à $15$ cm de lui, la section est plus étroite.\nRéponse : un rectangle de $40$ cm de large et $3$ m de long.",
          schema: ensemble(
            cercleCoupe(25, 15, { d: "15", r: "20", R: "25" }),
            triangle(
              { A: [0, 0], B: [0, 15], C: [20, 15] },
              { noms: { A: "O", B: "H", C: "M" }, cotes: { AB: "15 cm", BC: "20 cm", CA: "25 cm" }, droit: "B" },
            ),
          ),
          micros: ["section_cylindre", "section_calculer_longueur"],
        },
        {
          enonce:
            "Une boule a pour centre $O$ et pour rayon $13$ cm. On la coupe par un plan situé à la distance $d$ de $O$. Décrire la section et donner son rayon quand :\na) $d = 5$ cm ;\nb) $d = 0$ cm ;\nc) $d = 13$ cm ;\nd) $d = 15$ cm.",
          correction:
            "Le rayon $r$ de la section vérifie $r^2 = R^2 - d^2$, dans le triangle $OHM$ rectangle en $H$.\na) $r^2 = 13^2 - 5^2 = 169 - 25 = 144$, donc $r = 12$ cm : un disque de rayon $12$ cm.\nb) Le plan passe par le centre : $r^2 = 169 - 0$, donc $r = 13$ cm. C'est le plus grand disque possible, un « grand cercle » de la boule.\nc) $r^2 = 169 - 169 = 0$ : le plan touche la boule en un seul point. La section est réduite à un point.\nd) $15 > 13$ : le plan passe à côté de la boule. Il n'y a pas de section.\n⛔ Le piège : donner $13$ cm pour toutes les coupes. Plus le plan s'éloigne du centre, plus le disque rapetisse.\nRéponse : $12$ cm ; $13$ cm ; un point ; pas de section.",
          schema: ensemble(
            cercleCoupe(13, 5, { d: "5", r: "12", R: "13" }),
            triangle(
              { A: [0, 0], B: [0, 5], C: [12, 5] },
              { noms: { A: "O", B: "H", C: "M" }, cotes: { AB: "5 cm", BC: "12 cm", CA: "13 cm" }, droit: "B" },
            ),
          ),
          micros: ["section_reconnaitre", "section_calculer_longueur"],
        },
        {
          enonce:
            "Un cornet de glace est un cône de hauteur $12$ cm, dont l'ouverture est un disque de rayon $3$ cm. On le remplit de glace jusqu'à $8$ cm de la pointe, en surface bien plate.\na) Quelle est la forme de la surface de la glace ?\nb) Calculer son rayon.\nc) Calculer son aire, arrondie au centième.",
          correction:
            "a) La surface plate de la glace est la section du cône par un plan parallèle à l'ouverture : un disque, réduction de l'ouverture.\nb) La pointe est le sommet du cône. Le plan est à $8$ cm du sommet sur $12$ cm : $k = 8 \\div 12 = \\dfrac{2}{3}$. Le rayon vaut $3 \\times \\dfrac{2}{3} = 2$ cm.\nc) L'aire d'un disque, c'est $\\pi \\times r^2$ : $\\pi \\times 2^2 = 4\\pi \\approx 12{,}57$ cm².\n⛔ Le piège : calculer $k$ avec les $4$ cm restés vides, $4 \\div 12$. Le coefficient se compte depuis la pointe, là où le cône commence.\nRéponse : un disque de rayon $2$ cm, d'aire environ $12{,}57$ cm².",
          schema: profil(6, 12, 8, { base: "rayon 3 cm", H: "12 cm", h: "8 cm", coupe: "2 cm" }),
          micros: ["section_cone_pyramide", "section_calculer_longueur"],
        },
        {
          enonce:
            "$SABCD$ est une pyramide de hauteur $12$ cm, dont la base $ABCD$ est un carré de $9$ cm de côté. On la coupe par un plan parallèle à la base, situé à $8$ cm AU-DESSUS de la base.\na) À quelle distance du sommet est ce plan ?\nb) Quelle est la nature de la section ? Calculer son côté.\nc) Calculer l'aire de la base et celle de la section. Combien de fois la section est-elle plus petite ?",
          figure: coupe("pyramide", "parallele_base", "le plan est parallèle à la base"),
          correction:
            "a) Le sommet est à $12$ cm de la base, le plan à $8$ cm de la base : il est à $12 - 8 = 4$ cm du sommet.\nb) La section est une réduction de la base, donc un carré. $k = 4 \\div 12 = \\dfrac{1}{3}$, et son côté vaut $9 \\times \\dfrac{1}{3} = 3$ cm.\nc) Aire de la base : $9 \\times 9 = 81$ cm². Aire de la section : $3 \\times 3 = 9$ cm². $81 \\div 9 = 9$ : la section est $9$ fois plus petite en aire, alors que son côté n'est que $3$ fois plus petit.\n⛔ Le piège : prendre $k = 8 \\div 12$. Les $8$ cm sont comptés depuis la BASE ; le coefficient se compte depuis le sommet.\nRéponse : à $4$ cm du sommet ; un carré de $3$ cm de côté ; $81$ cm² contre $9$ cm², $9$ fois moins.",
          schema: ensemble(
            profil(9, 12, 4, { base: "9 cm", H: "12 cm", h: "4 cm", coupe: "3 cm" }),
            rectangles([
              { l: 9, h: 9, bas: "base : 81 cm²" },
              { l: 3, h: 3, bas: "9 cm²" },
            ]),
          ),
          micros: ["section_cone_pyramide", "section_calculer_longueur"],
        },
        {
          enonce:
            "Donner la nature de la section dans chaque cas.\na) Une boule coupée par un plan qui la traverse.\nb) Un cube coupé parallèlement à une face.\nc) Un cylindre coupé par un plan contenant son axe.\nd) Un cône coupé par un plan vertical passant par son sommet et par le centre de sa base.\ne) Une pyramide à base triangulaire coupée parallèlement à sa base.\nf) Un cylindre coupé parallèlement à sa base.",
          correction:
            "Pour chaque cas, je regarde le solide ET l'orientation du plan.\na) Un disque : une boule donne toujours un disque, quelle que soit la coupe.\nb) Un carré, identique à la face.\nc) Un rectangle : diamètre sur hauteur.\nd) Un triangle isocèle : ses deux côtés égaux sont des génératrices du cône, sa base est un diamètre du disque de base.\ne) Un triangle : une réduction de la base triangulaire.\nf) Un disque de même rayon que la base.\n⛔ Le piège : au c), répondre « un disque » parce que le solide est rond. Au c) comme au d), le plan contient l'axe, et la section a des côtés droits.\nRéponse : disque ; carré ; rectangle ; triangle isocèle ; triangle ; disque.",
          schema: ensemble(
            coupe("cone", "verticale", "d) le plan passe par le sommet et l'axe"),
            coupe("cylindre", "parallele_axe", "c) le plan contient l'axe"),
          ),
          micros: ["section_reconnaitre", "section_pave_cube", "section_cylindre", "section_cone_pyramide"],
        },
        {
          enonce:
            "Un cylindre a une base de rayon $3$ cm.\na) Quelle doit être sa hauteur pour que sa section par un plan contenant l'axe soit un carré ?\nb) Calculer alors la diagonale de ce carré, arrondie au centième.\nc) Un autre cylindre de rayon $3$ cm a une hauteur de $10$ cm. Peut-on le couper parallèlement à son axe de façon à obtenir un carré ?",
          correction:
            "a) Coupé par un plan contenant l'axe, le cylindre donne un rectangle : le diamètre sur la hauteur. Le diamètre vaut $2 \\times 3 = 6$ cm. Pour un carré, il faut une hauteur de $6$ cm.\nb) Par Pythagore dans le carré : $d^2 = 6^2 + 6^2 = 72$, donc $d = \\sqrt{72} \\approx 8{,}49$ cm.\nc) Parallèlement à l'axe, la section est un rectangle de hauteur $10$ cm. Sa largeur est au plus le diamètre, $6$ cm, atteint quand le plan passe par l'axe. Or $6 < 10$ : la largeur n'atteint jamais la hauteur. Impossible.\n⛔ Le piège : chercher un plan « bien placé ». S'éloigner de l'axe rend le rectangle plus ÉTROIT, jamais plus large.\nRéponse : $6$ cm ; environ $8{,}49$ cm ; non, c'est impossible.",
          schema: ensemble(
            coupe("cylindre", "parallele_axe", "le plan contient l'axe"),
            triangle(
              { A: [0, 0], B: [6, 0], C: [6, 6] },
              { cotes: { AB: "6 cm", BC: "6 cm", CA: "√72 ≈ 8,49 cm" }, droit: "B" },
            ),
          ),
          micros: ["section_cylindre", "section_calculer_longueur", "section_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des solides réels. Je dessine la section à plat, je calcule, puis une phrase de réponse.",
      rappel: [
        "D'abord nommer la section (coupé COMMENT ?), puis la dessiner à plat, puis calculer dedans.",
        "Boule : $r^2 = R^2 - d^2$. Pyramide ou cône : $k = $ distance au sommet $\\div$ hauteur, et chaque longueur est multipliée par $k$.",
      ],
      exercices: [
        {
          titre: "La pyramide du Louvre",
          enonce:
            "La pyramide du Louvre a pour base un carré d'environ $35{,}4$ m de côté et pour hauteur $21{,}6$ m. On imagine un plancher horizontal qui la traverse à $10{,}8$ m du sol.\na) Quelle est la forme de la section ?\nb) Calculer son côté.\nc) Calculer la diagonale de cette section, arrondie au centimètre.\nd) À quelle hauteur du sol faudrait-il placer le plancher pour que la section ait $8{,}85$ m de côté ?",
          correction:
            "a) Le plancher est parallèle à la base : la section est une réduction de la base carrée, donc un CARRÉ.\nb) Le plancher est à $21{,}6 - 10{,}8 = 10{,}8$ m du sommet. $k = 10{,}8 \\div 21{,}6 = 0{,}5$. Le côté vaut $35{,}4 \\times 0{,}5 = 17{,}7$ m.\nc) La diagonale partage le carré en deux triangles rectangles : $d^2 = 17{,}7^2 + 17{,}7^2 = 626{,}58$. Donc $d = \\sqrt{626{,}58} \\approx 25{,}03$ m.\nd) Je cherche $k$ : $8{,}85 \\div 35{,}4 = 0{,}25$. Le plancher doit être à $21{,}6 \\times 0{,}25 = 5{,}4$ m du SOMMET, donc à $21{,}6 - 5{,}4 = 16{,}2$ m du sol.\n⛔ Le piège au d) : répondre $5{,}4$ m. C'est la distance au sommet ; la question demande la hauteur depuis le sol.\nRéponse : un carré de $17{,}7$ m de côté, de diagonale environ $25{,}03$ m ; pour $8{,}85$ m de côté, le plancher est à $16{,}2$ m du sol.",
          schema: ensemble(
            profil(35.4, 21.6, 10.8, { base: "35,4 m", H: "21,6 m", h: "10,8 m", coupe: "17,7 m" }),
            rectangles([
              { l: 35.4, h: 35.4, bas: "base : 35,4 m" },
              { l: 17.7, h: 17.7, bas: "17,7 m", diag: "≈ 25,03 m" },
            ]),
          ),
          micros: ["section_cone_pyramide", "section_calculer_longueur", "section_defi"],
        },
        {
          titre: "Le parallèle de Paris",
          enonce:
            "On assimile la Terre à une boule de centre $O$ et de rayon $6\\,371$ km. Le parallèle qui passe par Paris est le bord de la section de la Terre par un plan parallèle à l'équateur, situé à environ $4\\,797$ km du centre.\na) Quelle est la nature de cette section ?\nb) Calculer son rayon, arrondi au kilomètre.\nc) Calculer la longueur du parallèle de Paris, arrondie au kilomètre.\nd) L'équateur est la section par le plan qui passe par $O$. Calculer sa longueur. Pourquoi est-ce le plus long des parallèles ?",
          correction:
            "a) Toute section d'une boule est un disque : ici un disque de centre $H$, sur l'axe des pôles. Le parallèle en est le bord, un cercle.\nb) Dans le triangle $OHM$ rectangle en $H$ : $r^2 = 6\\,371^2 - 4\\,797^2 = 40\\,589\\,641 - 23\\,011\\,209 = 17\\,578\\,432$. Donc $r = \\sqrt{17\\,578\\,432} \\approx 4\\,193$ km.\nc) La longueur d'un cercle est $2 \\times \\pi \\times r$ : $2 \\times \\pi \\times 4\\,192{,}66 \\approx 26\\,343$ km.\nd) Pour l'équateur, $d = 0$ et $r = 6\\,371$ km : $2 \\times \\pi \\times 6\\,371 \\approx 40\\,030$ km. Plus le plan s'éloigne du centre, plus $d$ grandit et plus $r^2 = R^2 - d^2$ diminue : le plan qui passe par le centre donne le plus grand rayon.\n⛔ Le piège : calculer le parallèle de Paris avec $6\\,371$ km. Ce rayon-là n'est que celui de l'équateur.\nRéponse : un disque de rayon environ $4\\,193$ km ; le parallèle de Paris mesure environ $26\\,343$ km, l'équateur $40\\,030$ km.",
          schema: ensemble(
            cercleCoupe(6371, 4797, { d: "4 797", r: "≈ 4 193", R: "6 371" }),
            triangle(
              { A: [0, 0], B: [0, 4797], C: [4192.66, 4797] },
              { noms: { A: "O", B: "H", C: "M" }, cotes: { AB: "4 797 km", BC: "≈ 4 193 km", CA: "6 371 km" }, droit: "B" },
            ),
          ),
          micros: ["section_reconnaitre", "section_calculer_longueur", "section_defi"],
        },
        {
          titre: "La tranche de pastèque",
          enonce:
            "Une pastèque est assimilée à une boule de $30$ cm de diamètre.\na) À quelle distance du centre faut-il la couper pour que la face coupée soit un disque de $24$ cm de diamètre ?\nb) Combien de coupes parallèles donnent exactement ce disque ?\nc) Si on la coupe à $12$ cm du centre, quel est le diamètre de la face coupée ?",
          correction:
            "a) Le rayon de la boule est $R = 30 \\div 2 = 15$ cm, celui du disque voulu $r = 24 \\div 2 = 12$ cm. Dans le triangle $OHM$ rectangle en $H$ : $d^2 = R^2 - r^2 = 225 - 144 = 81$, donc $d = 9$ cm.\nb) Deux : une à $9$ cm du centre d'un côté, une à $9$ cm de l'autre côté. La boule est symétrique.\nc) $r^2 = 15^2 - 12^2 = 225 - 144 = 81$, donc $r = 9$ cm. Le diamètre de la face vaut $18$ cm.\n⛔ Le piège : travailler avec les diamètres dans Pythagore. Le triangle $OHM$ relie le centre à un point du BORD : ses côtés sont des RAYONS.\nRéponse : à $9$ cm du centre, de chaque côté ; à $12$ cm, la face mesure $18$ cm de diamètre.",
          schema: ensemble(
            cercleCoupe(15, 9, { d: "9", r: "12", R: "15" }),
            triangle(
              { A: [0, 0], B: [0, 9], C: [12, 9] },
              { noms: { A: "O", B: "H", C: "M" }, cotes: { AB: "9 cm", BC: "12 cm", CA: "15 cm" }, droit: "B" },
            ),
          ),
          micros: ["section_calculer_longueur", "section_defi"],
        },
        {
          titre: "La perche dans le conteneur",
          enonce:
            "L'intérieur d'un conteneur maritime de $20$ pieds est un pavé droit de $5{,}90$ m de long, $2{,}35$ m de large et $2{,}39$ m de haut. Un déménageur veut y ranger une perche rigide de $6{,}5$ m.\na) Peut-il la poser à plat sur le plancher, en diagonale ?\nb) On coupe le conteneur par le plan vertical qui contient deux arêtes verticales opposées. Quelle est la nature de la section ? Donner ses dimensions.\nc) La perche tient-elle en biais dans cette section ?",
          correction:
            "a) La plus grande longueur du plancher est sa diagonale. Par Pythagore : $5{,}90^2 + 2{,}35^2 = 34{,}81 + 5{,}522\\,5 = 40{,}332\\,5$, donc la diagonale mesure $\\sqrt{40{,}332\\,5} \\approx 6{,}35$ m. C'est moins que $6{,}5$ m : la perche ne tient pas à plat.\nb) Les deux arêtes sont verticales, parallèles, de $2{,}39$ m. La section est un RECTANGLE : sa largeur est la diagonale du plancher, environ $6{,}35$ m, sa hauteur $2{,}39$ m.\nc) Dans ce rectangle, la plus grande longueur est sa diagonale : $40{,}332\\,5 + 2{,}39^2 = 40{,}332\\,5 + 5{,}712\\,1 = 46{,}044\\,6$, donc elle mesure $\\sqrt{46{,}044\\,6} \\approx 6{,}79$ m. $6{,}5 < 6{,}79$ : la perche tient en biais.\n⛔ Le piège : arrondir $6{,}35$ trop tôt, ou additionner les longueurs. Je garde $40{,}332\\,5$ exact d'un calcul à l'autre.\nRéponse : non à plat (environ $6{,}35$ m), oui en biais dans la section de $6{,}35$ m sur $2{,}39$ m (environ $6{,}79$ m).",
          schema: ensemble(
            coupe("pave_droit", "diagonale", "le plan contient deux arêtes verticales opposées"),
            triangle(
              { A: [0, 0], B: [6.35, 0], C: [6.35, 2.39] },
              { cotes: { AB: "≈ 6,35 m", BC: "2,39 m", CA: "≈ 6,79 m" }, droit: "B" },
            ),
          ),
          micros: ["section_pave_cube", "section_calculer_longueur", "section_defi"],
        },
      ],
    },
  ],
};
