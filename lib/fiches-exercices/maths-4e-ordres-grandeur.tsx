// ─── Fiche d'exercices : ordres de grandeur et préfixes (4e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-ordres-grandeur.tsx` et sur
// les cinq micros du coach de 4e (notionId ordre_grandeur). Le périmètre est
// celui du programme de 4e : les six préfixes de nano à giga (ni téra, ni pico),
// l'ordre de grandeur d'un objet et d'un calcul, et le jugement d'un résultat.
// ⛔ L'ÉCRITURE d'un nombre (notation scientifique, règles des exposants pour
// elles-mêmes) est la notion sœur `puissance_ecriture`, qui a sa propre feuille :
// ici, une puissance de dix sert toujours à MESURER le monde.
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni l'atome, ni la
// bactérie, ni le Piton des Neiges, ni Terre-Lune, ni 480 × 21, ni 9 800 × 96,
// ni 5 km en mm, ni le chat de 4 t, ni 3 Go. ⛔ Ni ceux de la feuille de 3e des
// puissances (la lumière jusqu'à Neptune, le disque de photos, les fourmis, la
// feuille pliée, le globule rouge).
//
// ⭐ L'ORDRE DE GRANDEUR EST LA PUISSANCE DE DIX LA PLUS PROCHE. Deux
// conventions coexistent (la plus proche en distance, comme le cours ; la plus
// proche « en rangs », comme le coach) : elles ne diffèrent que pour un nombre
// qui commence par 3, 4 ou 5. Aucun nombre de la feuille dont on demande l'ordre
// de grandeur ne tombe dans cette zone — le script de recalcul le vérifie.
//
// Les pièges nommés : « micro » lu comme « très petit » (1), le nombre devant
// perdu en convertissant (2), un saut de préfixe oublié (3, 16), l'ordre donné
// sans convertir (4, 10), compter les chiffres au lieu de regarder le plus proche
// (5), multiplier les exposants (6), soustraire un exposant négatif (7, 15), le
// produit toujours plus grand que ses facteurs (8), diviser des MW par des W
// (9), 60 au lieu de 3 600 secondes par heure (11), ppm lu comme % (12), méga et
// giga confondus (13, 16), million et milliard confondus (14, 19), micro et
// milli confondus (18), une conversion oubliée dans une chaîne (20), le Soleil
// dessiné à côté de la Terre (17).
//
// Les chiffres du monde, et d'où ils viennent (arrondis pour le calcul) :
// - carte bancaire : 0,76 mm d'épaisseur (norme ISO/CEI 7810, format ID-1) — ex. 4 ;
// - Everest : 8 849 m (mesure conjointe Chine-Népal, décembre 2020) — ex. 4 ;
// - double hélice d'ADN : environ 2 nm de large (Watson et Crick, 1953 ; tout
//   manuel de biologie) — ex. 4 ;
// - terrain de football : 105 m de long (Lois du jeu IFAB, dimensions
//   recommandées pour les matchs internationaux) — ex. 4 ;
// - diamètre de la Terre : 12 742 km en moyenne (NASA, Earth Fact Sheet) — ex. 4, 17 ;
// - LED de 9 W, équivalente à une ampoule classique de 60 W (ADEME) ; éolienne
//   terrestre récente, 2 à 3 MW (France Renouvelables) ; réacteur du palier
//   900 MWe, le plus nombreux du parc (EDF, 32 réacteurs) — ex. 9 ;
// - abeille ouvrière ≈ 0,1 g (INRAE) ; colibri d'Hélène ≈ 2 g, le plus petit
//   oiseau du monde ; éléphant d'Afrique jusqu'à ≈ 6 t (WWF) ; baleine bleue
//   jusqu'à ≈ 150 t (NOAA Fisheries) — ex. 10 ;
// - CO₂ de l'air : 422,8 ppm en moyenne annuelle 2024 (NOAA, Global Monitoring
//   Laboratory) ; 4 % de CO₂ (40 000 ppm) est le seuil « danger immédiat » du
//   NIOSH — ex. 12 ;
// - streaming ultra HD : jusqu'à 7 Go par heure (Netflix, centre d'aide,
//   « consommation de données ») — ex. 13 ;
// - cœur au repos : 60 à 100 battements par minute chez l'adulte (Fédération
//   française de cardiologie) ; 70 est une HYPOTHÈSE de l'énoncé — ex. 14 ;
// - cheveu : 50 à 100 µm d'épaisseur, 70 µm pris ici ; virus de la grippe : 80 à
//   120 nm (Institut Pasteur, fiche grippe) — ex. 15 ;
// - Soleil : 1 392 000 km de diamètre (NASA, Sun Fact Sheet) ; Terre-Soleil :
//   1 ua = 149 597 870,7 km (UAI, 2012) — ex. 17 ;
// - vitesse de la lumière : 299 792 458 m/s (BIPM, définition du mètre) ; les
//   « nanosecondes » de Grace Hopper, fils de 11,8 pouces ≈ 30 cm (Smithsonian,
//   National Museum of American History) — ex. 18 ;
// - 3,04 × 10¹² arbres sur Terre, environ 15 × 10⁹ abattus par an (Crowther et
//   al., Nature 525, 2015) ; 8 × 10⁹ humains (ONU, 15/11/2022) — ex. 19 ;
// - bassin olympique : 50 m × 25 m, profondeur minimale 2 m (World Aquatics,
//   règles FR 2) ; compte-gouttes normalisé : 20 gouttes d'eau pour 1 g, soit
//   1 mL (Pharmacopée européenne, 2.1.1) — ex. 20.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés
// dessinent. Onze placent leurs grandeurs sur une ÉCHELLE DE PUISSANCES DE DIX
// (`echelle()` ci-dessous, SVG local : `figures.tsx` n'a pas d'axe logarithmique),
// chaque objet à sa VRAIE place — le point d'un colibri de 2 g est à
// log₁₀(0,002) = −2,70, pas « vers −3 » —, et les arcs orange disent le facteur
// entre deux points. Les autres ont leur tableau d'arrondis, de conversions ou
// de verdicts. Les positions, les facteurs des arcs, les cases des tableaux, et
// même le chevauchement des étiquettes, sont RELUS par le script de recalcul.
//
// Les corrigés sont écrits à la première personne (« je remplace »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-ordres-grandeur-4e.mjs`.
//
// Micro-compétences : ordre_prefixe (1, 2, 3, 9, 12, 13, 18), ordre_associer (4,
// 5, 9, 10, 15, 17, 19), ordre_estimer (6, 7, 11, 14, 15, 17, 18, 19, 20),
// ordre_vraisemblance (8, 12, 13, 14, 16, 18, 19, 20), ordre_defi (10, 11, 12,
// 13, 16, 17, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/* ── L'échelle des puissances de dix ──────────────────────────────────────── */
//
// Un axe où l'on ne lit pas les nombres mais leurs EXPOSANTS : un point placé en
// `e` vaut 10^e. Chaque rang a la même largeur, si bien qu'un facteur 1 000 est
// toujours le même saut de trois graduations — c'est ce que l'élève doit VOIR.
// ⛔ Texte NU dans les étiquettes (SVG : KaTeX n'y passe pas) ; exposants en
// Unicode (10⁻⁹).
// ⚠️ MESURES (navigateur, 25/09) : à 375 px de large, le dessin se rend sur
// ≈ 235 px. Un cadre de 320 avec des polices de 9 à 11 tombait à 6,6-7,3 px
// effectifs. Le cadre fait donc 240 de large (axe de 18 à 222) et TOUT le texte
// est en 12 : 12 × 235 ÷ 240 ≈ 11,75 px à l'écran, au-dessus du plancher de 11.
// Étiquettes en gras (≈ 7,44 px par signe), sur DEUX étages alternés, dans
// l'ordre des exposants ; le script vérifie la taille effective, que deux
// étiquettes du même étage ne se touchent pas, et que le trait d'une étiquette
// du haut ne traverse pas une étiquette du bas.

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const dixPuissance = (n: number) => "10" + [...String(n)].map((c) => SUP[c]).join("");

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const L = 240;
const X0 = 18;
const X1 = 222;
const AXE = 64;
const POLICE = 12;

type Repere = { e: number; label: string; faux?: boolean };
type Saut = { de: number; a: number; label: string };

const echelle = (min: number, max: number, points: Repere[], opts: { unite: string; pas?: number; sauts?: Saut[] }) => {
  const x = (e: number) => X0 + ((e - min) * (X1 - X0)) / (max - min);
  const pas = opts.pas ?? 1;
  const graduations: number[] = [];
  for (let n = Math.ceil(min); n <= max; n++) graduations.push(n);
  const sauts = opts.sauts ?? [];
  const H = sauts.length ? 130 : 94;
  const tri = [...points].sort((p, q) => p.e - q.e);
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[16rem]">
      <svg viewBox={`0 0 ${L} ${H}`} className="h-auto w-full" role="img" aria-label={`Échelle des puissances de dix, en ${opts.unite}`}>
        <text x={2} y={12} fontSize={POLICE} fill="#64748b">
          {`en ${opts.unite}`}
        </text>
        <line x1={X0 - 10} x2={X1 + 8} y1={AXE} y2={AXE} stroke="#334155" strokeWidth={1.5} />
        <polygon points={`${X1 + 14},${AXE} ${X1 + 6},${AXE - 4} ${X1 + 6},${AXE + 4}`} fill="#334155" />
        {graduations.map((n) => (
          <g key={n}>
            <line x1={x(n)} x2={x(n)} y1={AXE - 4} y2={AXE + 4} stroke="#334155" />
            {n % pas === 0 && (
              <text x={x(n)} y={AXE + 18} fontSize={POLICE} textAnchor="middle" fill="#334155">
                {dixPuissance(n)}
              </text>
            )}
          </g>
        ))}
        {tri.map((p, i) => {
          const haut = i % 2 === 1;
          const y = haut ? 30 : 46;
          const w = p.label.length * 7.44;
          const cx = Math.min(Math.max(x(p.e), 2 + w / 2), L - 2 - w / 2);
          const couleur = p.faux ? ORANGE : BLEU;
          return (
            <g key={p.label}>
              <line x1={x(p.e)} x2={x(p.e)} y1={y + 4} y2={AXE} stroke={couleur} strokeDasharray="2 2" />
              <circle cx={x(p.e)} cy={AXE} r={4} fill={couleur} />
              <text x={cx} y={y} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={couleur}>
                {p.label}
              </text>
            </g>
          );
        })}
        {sauts.map((s) => {
          const [a, b] = [x(s.de), x(s.a)];
          return (
            <g key={s.label + s.de}>
              <path d={`M ${a} ${AXE + 26} Q ${(a + b) / 2} ${AXE + 52} ${b} ${AXE + 26}`} fill="none" stroke={ORANGE} strokeWidth={1.5} />
              <text x={(a + b) / 2} y={AXE + 58} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={ORANGE}>
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Le tableau d'un corrigé, en HTML (comme la feuille de 3e des puissances) :
// la première case de chaque ligne est son en-tête.
// ⚠️ Pas de formule dans les cases : exposants en Unicode (10⁻⁶).
const tableau = (lignes: [string, ...string[]][]) => (
  <div className="overflow-x-auto">
    <table className="mx-auto border-collapse text-sm">
      <tbody>
        {lignes.map(([entete, ...cases]) => (
          <tr key={entete}>
            <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">{entete}</th>
            {cases.map((c, i) => (
              <td key={i} className="border border-slate-400 px-3 py-1 text-center text-slate-900">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Deux dessins l'un sous l'autre (exercices 17 et 20). */
const pile = (...blocs: ReactNode[]) => (
  <div className="space-y-3">
    {blocs.map((b, i) => (
      <div key={i}>{b}</div>
    ))}
  </div>
);

/** Les six préfixes et l'unité, de trois rangs en trois rangs. */
const PREFIXES: Repere[] = [
  { e: -9, label: "nano" },
  { e: -6, label: "micro" },
  { e: -3, label: "milli" },
  { e: 0, label: "unité" },
  { e: 3, label: "kilo" },
  { e: 6, label: "méga" },
  { e: 9, label: "giga" },
];

export const exercicesOrdresGrandeur4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "ordre-grandeur",
  titre: "Ordres de grandeur et préfixes",
  accroche:
    "Vingt exercices, du préfixe seul au problème : nano, micro, milli, kilo, méga, giga, l'ordre de grandeur d'un objet et d'un calcul, et l'art de juger un résultat sans le refaire. La taille d'un virus, la masse d'une baleine, le CO₂ de l'air, un fil d'une nanoseconde, les arbres de la Terre. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et chaque grandeur placée sur l'échelle des puissances de dix.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/ordre-grandeur", titre: "Ordres de grandeur et préfixes" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je remplace chaque préfixe ou chaque nombre par sa puissance de dix, puis je compte les rangs.",
      rappel: [
        "Un préfixe est une puissance de dix écrite en un mot : nano $10^{-9}$, micro $10^{-6}$, milli $10^{-3}$, kilo $10^{3}$, méga $10^{6}$, giga $10^{9}$. De trois rangs en trois rangs.",
        "Pour convertir, je garde le nombre devant et je remplace le préfixe : $8$ km $= 8 \\times 10^{3}$ m.",
        "L'ordre de grandeur d'un nombre est la puissance de dix la plus proche : $0{,}8$ est entre $10^{-1}$ et $10^{0}$, bien plus près de $10^{0} = 1$.",
        "Pour estimer, j'arrondis PUIS je calcule : $10^{a} \\times 10^{b} = 10^{a+b}$ et $10^{a} \\div 10^{b} = 10^{a-b}$.",
      ],
      exercices: [
        {
          enonce:
            "Écris chaque grandeur avec une puissance de dix, dans l'unité demandée.\na) $1$ km en mètres\nb) $1$ ns (une nanoseconde) en secondes\nc) $1$ MW (un mégawatt) en watts\nd) $1$ µg (un microgramme) en grammes",
          correction:
            "Je remplace chaque préfixe par sa puissance de dix ; l'unité reste la même.\na) Kilo vaut mille : $1$ km $= 10^{3}$ m.\nb) Nano vaut un milliardième : $1$ ns $= 10^{-9}$ s.\nc) Méga vaut un million : $1$ MW $= 10^{6}$ W.\nd) Micro vaut un millionième : $1$ µg $= 10^{-6}$ g.\n⛔ Le piège : lire « micro » comme « très petit » et répondre au hasard. En maths, micro vaut EXACTEMENT $10^{-6}$, ni plus ni moins.\nRéponse : $10^{3}$ m ; $10^{-9}$ s ; $10^{6}$ W ; $10^{-6}$ g.",
          schema: echelle(-10, 10, PREFIXES, { unite: "unités", pas: 3 }),
          micros: ["ordre_prefixe"],
        },
        {
          enonce:
            "Convertis dans l'unité sans préfixe, d'abord avec une puissance de dix, puis en écriture décimale.\na) $7$ GW en watts\nb) $25$ µm en mètres\nc) $0{,}4$ mg en grammes",
          correction:
            "Je garde le nombre devant, et je remplace seulement le préfixe par sa puissance de dix.\na) Giga vaut $10^{9}$ : $7$ GW $= 7 \\times 10^{9}$ W $= 7\\,000\\,000\\,000$ W, sept milliards de watts.\nb) Micro vaut $10^{-6}$ : $25$ µm $= 25 \\times 10^{-6}$ m $= 0{,}000025$ m.\nc) Milli vaut $10^{-3}$ : $0{,}4$ mg $= 0{,}4 \\times 10^{-3}$ g $= 0{,}0004$ g.\n⛔ Le piège : perdre le nombre devant, et écrire $10^{9}$ W pour $7$ GW. Le $7$ reste : seul le préfixe devient une puissance de dix.\nRéponse : $7\\,000\\,000\\,000$ W ; $0{,}000025$ m ; $0{,}0004$ g.",
          schema: tableau([
            ["Grandeur", "Préfixe", "Sans préfixe"],
            ["7 GW", "× 10⁹", "7 000 000 000 W"],
            ["25 µm", "× 10⁻⁶", "0,000025 m"],
            ["0,4 mg", "× 10⁻³", "0,0004 g"],
          ]),
          micros: ["ordre_prefixe"],
        },
        {
          enonce:
            "a) Combien de micromètres y a-t-il dans un millimètre ?\nb) Combien de mégaoctets dans un gigaoctet ?\nc) Combien de milligrammes dans un kilogramme ?",
          correction:
            "Pour passer d'un préfixe à l'autre, je soustrais leurs exposants : l'écart dit combien de rangs les séparent.\na) Milli $10^{-3}$, micro $10^{-6}$ : écart $-3 - (-6) = 3$. Un millimètre contient $10^{3} = 1\\,000$ micromètres.\nb) Giga $10^{9}$, méga $10^{6}$ : écart $9 - 6 = 3$. Un gigaoctet contient $10^{3} = 1\\,000$ mégaoctets.\nc) Kilo $10^{3}$, milli $10^{-3}$ : écart $3 - (-3) = 6$. Un kilogramme contient $10^{6} = 1\\,000\\,000$ milligrammes.\n⛔ Le piège : au c), s'arrêter à $1\\,000$. Du kilo au milli, il y a DEUX sauts de mille, en passant par l'unité : $10^{3} \\times 10^{3} = 10^{6}$.\nRéponse : $1\\,000$ µm ; $1\\,000$ Mo ; $1\\,000\\,000$ mg.",
          schema: echelle(-10, 10, PREFIXES, {
            unite: "unités",
            pas: 3,
            sauts: [
              { de: -3, a: 3, label: "× 1 000 000" },
              { de: 6, a: 9, label: "× 1 000" },
            ],
          }),
          micros: ["ordre_prefixe"],
        },
        {
          enonce:
            "Associe à chaque longueur son ordre de grandeur, en mètres, parmi : $10^{-9}$ ; $10^{-3}$ ; $10^{2}$ ; $10^{4}$ ; $10^{7}$.\na) l'épaisseur d'une carte bancaire : $0{,}76$ mm\nb) la hauteur de l'Everest : $8\\,849$ m\nc) la largeur de la double hélice d'ADN : environ $2$ nm\nd) la longueur d'un terrain de football : $105$ m\ne) le diamètre de la Terre : environ $12\\,700$ km",
          correction:
            "Je convertis d'abord en mètres, puis j'encadre entre deux puissances de dix et je prends la plus proche.\na) $0{,}76$ mm $= 0{,}00076$ m, entre $10^{-4}$ et $10^{-3}$, plus près de $0{,}001$ : $10^{-3}$ m.\nb) $8\\,849$ m est entre $10^{3}$ et $10^{4}$, bien plus près de $10\\,000$ : $10^{4}$ m.\nc) $2$ nm $= 2 \\times 10^{-9}$ m : $10^{-9}$ m.\nd) $105$ m est tout près de $100$ : $10^{2}$ m.\ne) $12\\,700$ km $= 12\\,700\\,000$ m, entre $10^{7}$ et $10^{8}$, tout près de dix millions : $10^{7}$ m.\n⛔ Le piège : oublier de convertir. Le diamètre de la Terre n'est pas « de l'ordre de $10^{4}$ » : ça, ce sont des kilomètres. Un ordre de grandeur se donne dans UNE unité.\nRéponse : a) $10^{-3}$ m ; b) $10^{4}$ m ; c) $10^{-9}$ m ; d) $10^{2}$ m ; e) $10^{7}$ m.",
          schema: echelle(-10, 9, [
            { e: -8.7, label: "ADN" },
            { e: -3.12, label: "carte" },
            { e: 2.02, label: "foot" },
            { e: 3.95, label: "Everest" },
            { e: 7.1, label: "Terre" },
          ], { unite: "m", pas: 3 }),
          micros: ["ordre_associer"],
        },
        {
          enonce: "Donne l'ordre de grandeur de chaque nombre.\na) $9\\,600$\nb) $0{,}0012$\nc) $1\\,850\\,000$\nd) $0{,}09$",
          correction:
            "J'encadre chaque nombre entre deux puissances de dix qui se suivent, puis je prends la plus proche.\na) $10^{3} < 9\\,600 < 10^{4}$, et $9\\,600$ n'est qu'à $400$ de $10\\,000$ : l'ordre de grandeur est $10^{4}$.\nb) $10^{-3} < 0{,}0012 < 10^{-2}$, et $0{,}0012$ est tout près de $0{,}001$ : $10^{-3}$.\nc) $10^{6} < 1\\,850\\,000 < 10^{7}$, et $1\\,850\\,000$ est bien plus près d'un million que de dix millions : $10^{6}$.\nd) $10^{-2} < 0{,}09 < 10^{-1}$, et $0{,}09$ est tout près de $0{,}1$ : $10^{-1}$.\n⛔ Le piège : compter les chiffres sans regarder, et répondre $10^{3}$ pour $9\\,600$ parce qu'il a quatre chiffres « comme mille ». $9\\,600$, c'est presque dix mille.\nRéponse : $10^{4}$ ; $10^{-3}$ ; $10^{6}$ ; $10^{-1}$.",
          schema: tableau([
            ["Nombre", "Entre", "et", "Le plus proche"],
            ["9 600", "10³", "10⁴", "10⁴"],
            ["0,0012", "10⁻³", "10⁻²", "10⁻³"],
            ["1 850 000", "10⁶", "10⁷", "10⁶"],
            ["0,09", "10⁻²", "10⁻¹", "10⁻¹"],
          ]),
          micros: ["ordre_associer"],
        },
        {
          enonce: "Donne l'ordre de grandeur de chaque produit, sans calculatrice.\na) $2\\,100 \\times 89\\,000$\nb) $0{,}012 \\times 980$\nc) $1\\,200\\,000 \\times 0{,}0009$",
          correction:
            "J'arrondis chaque facteur à sa puissance de dix, PUIS j'ajoute les exposants.\na) $2\\,100 \\approx 10^{3}$ et $89\\,000 \\approx 10^{5}$, donc $10^{3} \\times 10^{5} = 10^{3+5} = 10^{8}$.\nb) $0{,}012 \\approx 10^{-2}$ et $980 \\approx 10^{3}$, donc $10^{-2} \\times 10^{3} = 10^{-2+3} = 10^{1}$.\nc) $1\\,200\\,000 \\approx 10^{6}$ et $0{,}0009 \\approx 10^{-3}$, donc $10^{6} \\times 10^{-3} = 10^{6+(-3)} = 10^{3}$.\n⭐ Contrôle à la calculatrice : les produits exacts valent $186\\,900\\,000$, $11{,}76$ et $1\\,080$ ; chacun est bien du rang annoncé.\n⛔ Le piège : MULTIPLIER les exposants, et trouver $10^{15}$ au a). Pour un produit de puissances de dix, on les AJOUTE.\nRéponse : $10^{8}$ ; $10^{1}$ ; $10^{3}$.",
          schema: tableau([
            ["Calcul", "Arrondis", "Ordre", "Exact"],
            ["a)", "10³ × 10⁵", "10⁸", "186 900 000"],
            ["b)", "10⁻² × 10³", "10¹", "11,76"],
            ["c)", "10⁶ × 10⁻³", "10³", "1 080"],
          ]),
          micros: ["ordre_estimer"],
        },
        {
          enonce: "Donne l'ordre de grandeur de chaque quotient, sans calculatrice.\na) $8\\,900\\,000 \\div 1\\,100$\nb) $0{,}0021 \\div 0{,}0009$\nc) $12\\,000 \\div 0{,}011$",
          correction:
            "Pour un quotient, j'arrondis, puis je SOUSTRAIS les exposants : celui du haut moins celui du bas.\na) $8\\,900\\,000 \\approx 10^{7}$ et $1\\,100 \\approx 10^{3}$, donc $10^{7} \\div 10^{3} = 10^{7-3} = 10^{4}$.\nb) $0{,}0021 \\approx 10^{-3}$ et $0{,}0009 \\approx 10^{-3}$, donc $10^{-3} \\div 10^{-3} = 10^{0} = 1$.\nc) $12\\,000 \\approx 10^{4}$ et $0{,}011 \\approx 10^{-2}$, donc $10^{4} \\div 10^{-2} = 10^{4-(-2)} = 10^{6}$.\n⭐ Diviser par un centième, c'est multiplier par cent : le résultat du c) est PLUS GRAND que $12\\,000$.\n⛔ Le piège : au c), calculer $4 - 2 = 2$ et répondre $10^{2}$. Soustraire $-2$, c'est ajouter $2$.\nRéponse : $10^{4}$ ; $10^{0}$, soit $1$ ; $10^{6}$.",
          schema: tableau([
            ["Calcul", "Arrondis", "Ordre", "Exact"],
            ["a)", "10⁷ ÷ 10³", "10⁴", "≈ 8 091"],
            ["b)", "10⁻³ ÷ 10⁻³", "10⁰", "≈ 2,33"],
            ["c)", "10⁴ ÷ 10⁻²", "10⁶", "≈ 1 090 909"],
          ]),
          micros: ["ordre_estimer"],
        },
        {
          enonce:
            "Sans poser l'opération, dis si chaque résultat annoncé est plausible. Arrondis chaque nombre à un seul chiffre non nul.\na) $312 \\times 29 = 90\\,480$\nb) $4\\,870 \\div 52 = 9{,}4$\nc) $0{,}21 \\times 0{,}48 = 0{,}1008$",
          correction:
            "J'arrondis chaque nombre à un seul chiffre non nul : le calcul se fait de tête, et il suffit pour repérer un facteur $10$.\na) $312 \\times 29 \\approx 300 \\times 30 = 9\\,000$. L'annonce, $90\\,480$, est environ $10$ fois trop grande : NON plausible. Le vrai résultat est $9\\,048$ : un zéro de trop.\nb) $4\\,870 \\div 52 \\approx 5\\,000 \\div 50 = 100$. L'annonce, $9{,}4$, est environ $10$ fois trop petite : NON plausible. Le vrai résultat est environ $93{,}7$ : une virgule mal placée.\nc) $0{,}21 \\times 0{,}48 \\approx 0{,}2 \\times 0{,}5 = 0{,}1$. L'annonce, $0{,}1008$, est du même rang : plausible, et même exacte.\n⛔ Le piège : croire qu'un produit est toujours plus grand que ses facteurs. Au c), multiplier par $0{,}48$, c'est prendre à peu près la moitié : le résultat est plus PETIT que $0{,}21$.\nRéponse : a) non ; b) non ; c) oui.",
          schema: tableau([
            ["Calcul", "Estimation", "Annoncé", "Verdict"],
            ["a)", "9 000", "90 480", "faux, × 10"],
            ["b)", "100", "9,4", "faux, ÷ 10"],
            ["c)", "0,1", "0,1008", "plausible"],
          ]),
          micros: ["ordre_vraisemblance"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Je convertis dans une seule unité, j'estime le rang, puis je compare au résultat exact.",
      rappel: [
        "Comparer deux grandeurs, c'est les diviser. Je les écris d'abord dans la MÊME unité, sinon la division ne veut rien dire.",
        "Entre deux préfixes, je soustrais les exposants : de méga ($10^{6}$) à giga ($10^{9}$), il y a $3$ rangs, un facteur $1\\,000$.",
        "Pour une estimation plus fine qu'un rang, j'arrondis chaque nombre à un seul chiffre non nul : $365 \\approx 400$.",
        "Pour juger un résultat, je cherche le FACTEUR entre mon estimation et l'annonce : $10$, $100$ ou $1\\,000$ désigne l'erreur.",
      ],
      exercices: [
        {
          enonce:
            "Une ampoule LED consomme $9$ W. Une éolienne terrestre récente a une puissance d'environ $3$ MW. Un réacteur nucléaire du modèle le plus répandu en France a une puissance de $900$ MW.\na) Écris ces trois puissances en watts, avec une puissance de dix.\nb) Combien d'éoliennes de $3$ MW faut-il pour égaler un réacteur ?\nc) Combien d'ampoules de $9$ W le réacteur pourrait-il allumer en même temps ?",
          correction:
            "a) Je remplace chaque préfixe : l'ampoule reste à $9$ W ; $3$ MW $= 3 \\times 10^{6}$ W ; $900$ MW $= 900 \\times 10^{6}$ W $= 9 \\times 10^{8}$ W.\nb) Même préfixe des deux côtés : je divise directement, $900 \\div 3 = 300$. Il faut $300$ éoliennes, quand le vent souffle à plein.\nc) Je divise en watts : $\\dfrac{9 \\times 10^{8}}{9} = 10^{8}$. Le réacteur alimente cent millions d'ampoules.\n⭐ Sur l'échelle, huit rangs séparent l'ampoule du réacteur : c'est le facteur $10^{8}$ du c).\n⛔ Le piège : diviser $900$ par $9$ sans convertir, et répondre $100$ ampoules. Des mégawatts et des watts ne se divisent pas entre eux : j'écris tout en watts d'abord.\nRéponse : a) $9$ W, $3 \\times 10^{6}$ W et $9 \\times 10^{8}$ W ; b) $300$ éoliennes ; c) $10^{8}$ ampoules.",
          schema: echelle(-1, 11, [
            { e: 0.95, label: "LED" },
            { e: 6.48, label: "éolienne" },
            { e: 8.95, label: "réacteur" },
          ], { unite: "W", pas: 2, sauts: [{ de: 0.95, a: 8.95, label: "× 10⁸" }] }),
          micros: ["ordre_prefixe", "ordre_associer"],
        },
        {
          enonce:
            "Quatre masses du monde vivant : une abeille ouvrière, environ $0{,}1$ g ; le colibri d'Hélène, le plus petit oiseau du monde, environ $2$ g ; un éléphant d'Afrique, environ $6$ t ; une baleine bleue, environ $150$ t.\na) Écris chaque masse en kilogrammes, puis donne son ordre de grandeur.\nb) Avec les ordres de grandeur, combien de fois la baleine est-elle plus lourde que le colibri ?\nc) Vérifie avec les valeurs de l'énoncé.",
          correction:
            "a) $1$ g $= 10^{-3}$ kg et $1$ t $= 10^{3}$ kg.\nAbeille : $0{,}1$ g $= 0{,}0001$ kg $= 10^{-4}$ kg.\nColibri : $2$ g $= 0{,}002$ kg, tout près de $0{,}001$ : ordre de grandeur $10^{-3}$ kg.\nÉléphant : $6$ t $= 6\\,000$ kg, plus près de $10\\,000$ que de $1\\,000$ : $10^{4}$ kg.\nBaleine : $150$ t $= 150\\,000$ kg, tout près de $100\\,000$ : $10^{5}$ kg.\nb) $10^{5} \\div 10^{-3} = 10^{5-(-3)} = 10^{8}$ : environ cent millions de fois.\nc) $150\\,000 \\div 0{,}002 = 75\\,000\\,000$, soit $7{,}5 \\times 10^{7}$ : c'est bien le rang de $10^{8}$.\n⛔ Le piège : comparer $150$ et $2$ sans convertir, et répondre $75$ fois. Des tonnes et des grammes ne se comparent pas : une seule unité d'abord.\nRéponse : la baleine est environ $10^{8}$ fois plus lourde que le colibri, exactement $75$ millions de fois avec ces valeurs.",
          schema: echelle(-3.5, 6, [
            { e: -2.7, label: "colibri" },
            { e: 3.78, label: "éléphant" },
            { e: 5.18, label: "baleine" },
          ], { unite: "kg", pas: 2, sauts: [{ de: -2.7, a: 5.18, label: "× 7,5 × 10⁷" }] }),
          micros: ["ordre_associer", "ordre_defi"],
        },
        {
          enonce:
            "a) Estime le nombre de secondes dans une année de $365$ jours, en arrondissant chaque nombre à un seul chiffre non nul.\nb) Calcule le nombre exact, et compare.\nc) Un milliard de secondes, c'est environ combien d'années ?",
          correction:
            "a) Une heure compte $60 \\times 60 = 3\\,600$ secondes. Une année compte donc $365 \\times 24 \\times 3\\,600$ secondes. J'arrondis : $365 \\approx 400$, $24 \\approx 20$, $3\\,600 \\approx 4\\,000$.\n$400 \\times 20 \\times 4\\,000 = 32\\,000\\,000$, environ $3 \\times 10^{7}$ secondes.\nb) $365 \\times 24 = 8\\,760$ heures, puis $8\\,760 \\times 3\\,600 = 31\\,536\\,000$ secondes. L'estimation, $32$ millions, est à moins de $2$ % du résultat exact.\nc) Un milliard, c'est $10^{9}$. $10^{9} \\div 31\\,536\\,000 \\approx 31{,}7$ : un milliard de secondes, c'est environ $32$ ans.\n⭐ Un million de secondes, mille fois moins, dure environ $11{,}6$ jours. Du million au milliard, on passe de deux semaines à une vie d'adulte.\n⛔ Le piège : compter $60$ secondes par heure. $365 \\times 24 \\times 60 = 525\\,600$ : c'est le nombre de MINUTES d'une année, soixante fois moins.\nRéponse : environ $3 \\times 10^{7}$ s dans une année, $31\\,536\\,000$ exactement ; un milliard de secondes, c'est environ $32$ ans.",
          schema: tableau([
            ["Facteur", "Exact", "Arrondi"],
            ["jours", "365", "400"],
            ["heures", "24", "20"],
            ["secondes", "3 600", "4 000"],
            ["produit", "31 536 000", "32 000 000"],
          ]),
          micros: ["ordre_estimer", "ordre_defi"],
        },
        {
          enonce:
            "En 2024, l'air contenait en moyenne environ $420$ ppm de dioxyde de carbone, le CO₂. « ppm » veut dire « partie par million » : $1$ ppm $= 10^{-6}$, un millionième.\na) Écris $420$ ppm avec une puissance de dix, puis en écriture décimale.\nb) Écris cette proportion en pourcentage.\nc) Un exposé affirme : « l'air contient $4{,}2$ % de CO₂ ». Est-ce plausible ? De quel facteur se trompe-t-il ?",
          correction:
            "a) $420$ ppm $= 420 \\times 10^{-6} = 0{,}00042$. Une partie par million, c'est le « micro » des préfixes.\nb) Un pourcentage compte en centièmes : $0{,}00042 \\times 100 = 0{,}042$, donc $420$ ppm $= 0{,}042$ %.\nc) $4{,}2 \\div 0{,}042 = 100$ : l'exposé annonce $100$ fois trop, deux rangs. Ce n'est PAS plausible : à $4$ % de CO₂, l'air devient dangereux à respirer.\n⛔ Le piège : lire « par million » comme « par cent ». $1$ % $= 10^{-2}$ et $1$ ppm $= 10^{-6}$ : quatre rangs d'écart.\nRéponse : $420$ ppm $= 420 \\times 10^{-6} = 0{,}00042$, soit $0{,}042$ % ; l'exposé se trompe d'un facteur $100$.",
          schema: echelle(-7, 0, [
            { e: -6, label: "1 ppm" },
            { e: -3.38, label: "réel" },
            { e: -2, label: "1 %" },
            { e: -1.38, label: "annoncé", faux: true },
          ], { unite: "part de l'air", sauts: [{ de: -3.38, a: -1.38, label: "× 100" }] }),
          micros: ["ordre_prefixe", "ordre_vraisemblance", "ordre_defi"],
        },
        {
          enonce:
            "Regarder un film en streaming en ultra haute définition consomme environ $7$ Go de données par heure.\na) Écris la consommation d'un film de $2$ h en octets, avec une puissance de dix.\nb) Combien d'heures de film tiennent sur une clé USB de $64$ Go ?\nc) Un camarade affirme qu'un film de $2$ h en ultra HD pèse $14$ Mo. Quel facteur le sépare de la bonne valeur ? D'où vient l'erreur ?",
          correction:
            "a) $2 \\times 7 = 14$ Go. Giga vaut $10^{9}$ : $14$ Go $= 14 \\times 10^{9}$ octets, soit $1{,}4 \\times 10^{10}$ octets.\nb) Même unité des deux côtés : $64 \\div 7 \\approx 9{,}1$. Environ $9$ heures de film.\nc) $14$ Go et $14$ Mo ont le même nombre devant ; seul le préfixe change. Giga $10^{9}$, méga $10^{6}$ : écart $9 - 6 = 3$ rangs, un facteur $1\\,000$. Le camarade a confondu giga et méga.\n⭐ Contrôle du sens : à $7$ Go par heure, $14$ Mo ne dureraient qu'environ $7$ secondes.\n⛔ Le piège : croire que Mo et Go, « c'est pareil, en gros ». Entre les deux, il y a exactement mille.\nRéponse : $1{,}4 \\times 10^{10}$ octets ; environ $9$ heures ; un facteur $1\\,000$, méga pris pour giga.",
          schema: echelle(6, 11, [
            { e: 7.15, label: "14 Mo", faux: true },
            { e: 10.15, label: "14 Go" },
          ], { unite: "octets", sauts: [{ de: 7.15, a: 10.15, label: "× 1 000" }] }),
          micros: ["ordre_prefixe", "ordre_vraisemblance", "ordre_defi"],
        },
        {
          enonce:
            "Au repos, le cœur d'un adulte bat environ $70$ fois par minute. On garde cette valeur pour toute la vie.\na) Calcule le nombre de battements en un jour.\nb) Estime le nombre de battements en $80$ ans, en arrondissant à chaque étape.\nc) Une affiche annonce : « votre cœur battra $3$ millions de fois dans votre vie ». Est-ce plausible ?",
          correction:
            "a) Une journée compte $24 \\times 60 = 1\\,440$ minutes. $70 \\times 1\\,440 = 100\\,800$ battements par jour, environ $10^{5}$.\nb) En un an : $10^{5} \\times 365$. J'arrondis $365 \\approx 400$ : environ $4 \\times 10^{7}$ battements.\nEn $80$ ans : $4 \\times 10^{7} \\times 80 = 320 \\times 10^{7} = 3{,}2 \\times 10^{9}$ battements, environ trois milliards.\n⭐ Le calcul exact, $100\\,800 \\times 365 \\times 80 = 2\\,943\\,360\\,000$, tombe bien dans le même rang : quelques milliards.\nc) $3$ millions, c'est $3 \\times 10^{6}$ ; l'estimation dit $3 \\times 10^{9}$. Écart : $9 - 6 = 3$ rangs, un facteur $1\\,000$. L'affiche n'est PAS plausible : trois millions de battements, c'est à peine un mois de vie.\n⛔ Le piège : confondre million et milliard. Ils se ressemblent à l'oreille, mais il y a mille entre eux.\nRéponse : $100\\,800$ battements par jour, environ $3 \\times 10^{9}$ en $80$ ans ; l'affiche se trompe d'un facteur $1\\,000$.",
          schema: tableau([
            ["Durée", "Estimation", "Exact"],
            ["1 jour", "10⁵", "100 800"],
            ["1 an", "4 × 10⁷", "36 792 000"],
            ["80 ans", "3,2 × 10⁹", "2 943 360 000"],
          ]),
          micros: ["ordre_estimer", "ordre_vraisemblance"],
        },
        {
          enonce:
            "Un cheveu a une épaisseur d'environ $70$ µm. Le virus de la grippe mesure environ $100$ nm.\na) Écris ces deux longueurs en mètres, avec une puissance de dix, et donne leur ordre de grandeur.\nb) Avec les ordres de grandeur, combien de virus côte à côte faudrait-il pour couvrir l'épaisseur du cheveu ?\nc) Fais le calcul avec les valeurs de l'énoncé.",
          correction:
            "a) Cheveu : $70$ µm $= 70 \\times 10^{-6}$ m $= 7 \\times 10^{-5}$ m, plus près de $10^{-4}$ que de $10^{-5}$ : ordre de grandeur $10^{-4}$ m.\nVirus : $100$ nm $= 100 \\times 10^{-9}$ m $= 10^{-7}$ m.\nb) Je divise : $10^{-4} \\div 10^{-7} = 10^{-4-(-7)} = 10^{3}$. Environ mille virus.\nc) $\\dfrac{7 \\times 10^{-5}}{10^{-7}} = 7 \\times 10^{-5+7} = 7 \\times 10^{2} = 700$ virus.\n⭐ $700$ et $1\\,000$ sont du même rang : l'ordre de grandeur donne le rang, le calcul donne le chiffre.\n⛔ Le piège : calculer $-4 - 7 = -11$ et trouver un nombre minuscule. Un cheveu est PLUS GROS qu'un virus : le résultat doit dépasser $1$. Soustraire $-7$, c'est ajouter $7$.\nRéponse : environ $700$ virus, de l'ordre de $10^{3}$.",
          schema: echelle(-8, -3, [
            { e: -7, label: "virus" },
            { e: -4.15, label: "cheveu" },
          ], { unite: "m", sauts: [{ de: -7, a: -4.15, label: "× 700" }] }),
          micros: ["ordre_associer", "ordre_estimer"],
        },
        {
          enonce:
            "Trois élèves ont converti une grandeur. Pour chacun, trouve le facteur entre sa réponse et la bonne, puis l'erreur probable.\na) $3{,}5$ kg en mg : Léa trouve $3\\,500$ mg.\nb) $45$ µs en s : Noé trouve $0{,}045$ s.\nc) $2$ GW en W : Inès trouve $2 \\times 10^{6}$ W.",
          correction:
            "Je fais la conversion juste, puis je compare les deux réponses : le facteur dit combien de rangs ont été perdus.\na) Du kilo au milli : $3 - (-3) = 6$ rangs. $3{,}5$ kg $= 3{,}5 \\times 10^{6}$ mg $= 3\\,500\\,000$ mg. Facteur : $3\\,500\\,000 \\div 3\\,500 = 1\\,000$. Léa s'est arrêtée aux grammes : une conversion sur deux.\nb) Micro vaut $10^{-6}$ : $45$ µs $= 45 \\times 10^{-6}$ s $= 0{,}000045$ s. Facteur : $0{,}045 \\div 0{,}000045 = 1\\,000$. Noé a pris micro pour milli.\nc) Giga vaut $10^{9}$ : $2$ GW $= 2 \\times 10^{9}$ W. Facteur : $10^{9} \\div 10^{6} = 1\\,000$. Inès a pris giga pour méga.\n⭐ Trois fois le facteur $1\\,000$ : c'est la signature d'un préfixe voisin confondu, ou d'une conversion oubliée, puisque les préfixes vont de trois rangs en trois rangs.\n⛔ Le piège : tout recommencer sans chercher le facteur. Le facteur montre OÙ est l'erreur.\nRéponse : les trois réponses sont fausses d'un facteur $1\\,000$.",
          schema: tableau([
            ["Élève", "Réponse", "Juste", "Facteur"],
            ["Léa", "3 500 mg", "3 500 000 mg", "× 1 000"],
            ["Noé", "0,045 s", "0,000045 s", "÷ 1 000"],
            ["Inès", "2 × 10⁶ W", "2 × 10⁹ W", "× 1 000"],
          ]),
          micros: ["ordre_vraisemblance", "ordre_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je convertis, j'estime le rang, je calcule, puis je juge si le résultat est vraisemblable.",
      rappel: [
        "J'écris toutes les grandeurs dans la MÊME unité, avec une puissance de dix.",
        "J'estime d'abord le rang, je calcule ensuite : si le calcul tombe loin de l'estimation, je cherche l'erreur avant d'aller plus loin.",
        "Une maquette à l'échelle divise TOUTES les longueurs par le même nombre.",
      ],
      exercices: [
        {
          titre: "Le système solaire dans la cour",
          enonce:
            "Diamètre de la Terre : environ $1{,}3 \\times 10^{4}$ km. Diamètre du Soleil : environ $1{,}4 \\times 10^{6}$ km. Distance de la Terre au Soleil : environ $1{,}5 \\times 10^{8}$ km. On construit une maquette où $1$ cm représente $10^{4}$ km.\na) Donne l'ordre de grandeur de ces trois longueurs. Que remarques-tu ?\nb) Calcule chaque longueur sur la maquette.\nc) La maquette tient-elle dans une salle de classe d'environ $10$ m ? Sur un terrain de football d'environ $100$ m ?",
          correction:
            "a) $1{,}3 \\times 10^{4}$ : ordre $10^{4}$ km. $1{,}4 \\times 10^{6}$ : ordre $10^{6}$ km. $1{,}5 \\times 10^{8}$ : ordre $10^{8}$ km.\nDeux rangs à chaque fois : le Soleil est environ $100$ fois plus large que la Terre, et la distance vaut environ $100$ diamètres du Soleil.\nb) Je divise chaque longueur par $10^{4}$ km, la longueur que représente $1$ cm.\nTerre : $\\dfrac{1{,}3 \\times 10^{4}}{10^{4}} = 1{,}3$ cm, une bille.\nSoleil : $\\dfrac{1{,}4 \\times 10^{6}}{10^{4}} = 1{,}4 \\times 10^{2} = 140$ cm, une boule de la taille d'un enfant de dix ans.\nDistance : $\\dfrac{1{,}5 \\times 10^{8}}{10^{4}} = 1{,}5 \\times 10^{4} = 15\\,000$ cm, soit $150$ m.\nc) $150 \\div 10 = 15$ : il faudrait $15$ salles de classe bout à bout. Et $150$ m, c'est un terrain de football et demi.\n⛔ Le piège : imaginer le Soleil et la Terre côte à côte, comme sur les images des livres. À l'échelle, une bille à $150$ m d'une boule de $1{,}4$ m : le système solaire, c'est surtout du VIDE.\nRéponse : Terre $1{,}3$ cm, Soleil $140$ cm, distance $150$ m ; la maquette ne tient pas dans la classe, il faut un terrain et demi.",
          schema: pile(
            echelle(3, 9, [
              { e: 4.11, label: "Terre" },
              { e: 6.15, label: "Soleil" },
              { e: 8.18, label: "distance" },
            ], {
              unite: "km",
              sauts: [
                { de: 4.11, a: 6.15, label: "≈ × 100" },
                { de: 6.15, a: 8.18, label: "≈ × 100" },
              ],
            }),
            tableau([
              ["Longueur", "Réelle", "Maquette"],
              ["Terre", "1,3 × 10⁴ km", "1,3 cm"],
              ["Soleil", "1,4 × 10⁶ km", "140 cm"],
              ["Distance", "1,5 × 10⁸ km", "15 000 cm"],
            ]),
          ),
          micros: ["ordre_associer", "ordre_estimer", "ordre_defi"],
        },
        {
          titre: "Un fil d'une nanoseconde",
          enonce:
            "La lumière parcourt environ $3 \\times 10^{8}$ mètres par seconde. L'informaticienne Grace Hopper distribuait à ses élèves des bouts de fil électrique d'une trentaine de centimètres, en disant : « voici une nanoseconde ».\na) Quelle distance la lumière parcourt-elle en $1$ ns ? Explique le fil de Grace Hopper.\nb) Un processeur cadencé à $3$ GHz effectue $3 \\times 10^{9}$ cycles par seconde. Quelle distance la lumière parcourt-elle pendant un cycle ?\nc) Un élève affirme : « en une microseconde, la lumière parcourt $300$ km ». Vrai ou faux ? Corrige.",
          correction:
            "a) Distance $=$ vitesse $\\times$ durée, avec $1$ ns $= 10^{-9}$ s : $3 \\times 10^{8} \\times 10^{-9} = 3 \\times 10^{8+(-9)} = 3 \\times 10^{-1}$ m $= 0{,}3$ m, soit $30$ cm. Le fil a la longueur que parcourt la lumière en une nanoseconde : Grace Hopper faisait TOUCHER une durée.\nb) En une seconde, $3 \\times 10^{9}$ cycles : pendant un cycle, la lumière parcourt $\\dfrac{3 \\times 10^{8}}{3 \\times 10^{9}} = 10^{8-9} = 10^{-1}$ m, soit $10$ cm. Pendant un cycle, même la lumière n'a pas le temps de traverser l'ordinateur.\nc) $1$ µs $= 10^{-6}$ s : $3 \\times 10^{8} \\times 10^{-6} = 3 \\times 10^{2} = 300$ m. L'élève annonce $300$ km, mille fois trop : c'est FAUX. $300$ km, c'est la distance parcourue en une MILLIseconde.\n⛔ Le piège : confondre micro et milli. Ils se suivent sur l'échelle des préfixes, à trois rangs l'un de l'autre : un facteur $1\\,000$.\nRéponse : $30$ cm en une nanoseconde ; $10$ cm pendant un cycle ; en une microseconde, $300$ m et non $300$ km.",
          schema: tableau([
            ["Durée", "En secondes", "Distance de la lumière"],
            ["1 ns", "10⁻⁹ s", "30 cm"],
            ["1 µs", "10⁻⁶ s", "300 m"],
            ["1 ms", "10⁻³ s", "300 km"],
            ["1 s", "10⁰ s", "300 000 km"],
          ]),
          micros: ["ordre_prefixe", "ordre_estimer", "ordre_vraisemblance"],
        },
        {
          titre: "Les arbres de la Terre",
          enonce:
            "En 2015, une équipe de chercheurs a estimé qu'il y a environ $3 \\times 10^{12}$ arbres sur Terre, et que l'humanité en abat environ $1{,}5 \\times 10^{10}$ chaque année. On compte environ $8 \\times 10^{9}$ êtres humains.\na) Donne l'ordre de grandeur de ces trois nombres, puis estime le nombre d'arbres par être humain.\nb) Calcule-le avec les valeurs de l'énoncé.\nc) Si aucun arbre ne repoussait, en combien d'années toutes les forêts auraient-elles disparu ?\nd) Un site titre : « $15$ millions d'arbres abattus chaque année dans le monde ». Est-ce vraisemblable ?",
          correction:
            "a) $3 \\times 10^{12}$ : ordre $10^{12}$. $1{,}5 \\times 10^{10}$ : ordre $10^{10}$. $8 \\times 10^{9}$, huit milliards, est plus près de dix milliards que d'un milliard : ordre $10^{10}$.\nArbres par humain : $10^{12} \\div 10^{10} = 10^{2}$, de l'ordre de la centaine.\nb) $\\dfrac{3 \\times 10^{12}}{8 \\times 10^{9}} = \\dfrac{3}{8} \\times 10^{12-9} = 0{,}375 \\times 10^{3} = 375$ arbres par être humain : des centaines, comme prévu.\nc) $\\dfrac{3 \\times 10^{12}}{1{,}5 \\times 10^{10}} = 2 \\times 10^{2} = 200$ ans.\n⭐ En vrai, des arbres repoussent et on en plante : $200$ ans n'est pas une prévision. C'est une MESURE de la vitesse de l'abattage.\nd) $15$ millions $= 1{,}5 \\times 10^{7}$. Les chercheurs disent $1{,}5 \\times 10^{10}$ : écart $10 - 7 = 3$ rangs, un facteur $1\\,000$. Le titre n'est pas vraisemblable : il a écrit millions au lieu de milliards.\n⛔ Le piège : comparer « $15$ » et « $1{,}5$ » en oubliant les puissances de dix. Deux nombres ne se comparent qu'écrits de la même façon.\nRéponse : environ $375$ arbres par humain ; $200$ ans sans repousse ; le titre se trompe d'un facteur $1\\,000$.",
          schema: echelle(6, 13, [
            { e: 7.18, label: "le titre", faux: true },
            { e: 10.18, label: "abattus/an" },
            { e: 12.48, label: "arbres" },
          ], {
            unite: "arbres",
            sauts: [
              { de: 7.18, a: 10.18, label: "× 1 000" },
              { de: 10.18, a: 12.48, label: "× 200" },
            ],
          }),
          micros: ["ordre_associer", "ordre_estimer", "ordre_vraisemblance", "ordre_defi"],
        },
        {
          titre: "Les gouttes d'un bassin olympique",
          enonce:
            "Un bassin olympique mesure $50$ m de long, $25$ m de large et au moins $2$ m de profondeur. Un compte-gouttes de pharmacie délivre $20$ gouttes d'eau par millilitre.\na) Calcule le volume d'un bassin de $2$ m de profondeur, en m³, puis en litres. On rappelle que $1$ m³ $= 1\\,000$ L.\nb) Combien de gouttes d'eau contient-il ? Écris le résultat avec une puissance de dix, puis en mots.\nc) Un élève trouve $5 \\times 10^{7}$ gouttes. Quel facteur le sépare du bon résultat ? Quelle conversion a-t-il oubliée ?",
          correction:
            "a) $V = 50 \\times 25 \\times 2 = 2\\,500$ m³. Puis $2\\,500 \\times 1\\,000 = 2\\,500\\,000$ L, soit $2{,}5 \\times 10^{6}$ L.\nb) Un litre vaut $1\\,000$ mL, donc $1\\,000 \\times 20 = 20\\,000$ gouttes par litre, soit $2 \\times 10^{4}$.\nNombre de gouttes : $2{,}5 \\times 10^{6} \\times 2 \\times 10^{4} = 5 \\times 10^{10}$, cinquante milliards de gouttes.\nc) $\\dfrac{5 \\times 10^{10}}{5 \\times 10^{7}} = 10^{3}$ : un facteur $1\\,000$. L'élève a compté $20$ gouttes par LITRE au lieu de $20$ par millilitre : il a oublié le passage des litres aux millilitres.\n⭐ Pour sentir ce nombre : à une goutte par seconde, vider le bassin prendrait $5 \\times 10^{10}$ secondes, plus de $1\\,500$ ans.\n⛔ Le piège : enchaîner les conversions sans les écrire. Chaque « milli » oublié coûte trois rangs d'un coup.\nRéponse : $2\\,500$ m³, soit $2{,}5 \\times 10^{6}$ L ; $5 \\times 10^{10}$ gouttes, cinquante milliards ; l'élève se trompe d'un facteur $1\\,000$.",
          schema: pile(
            tableau([
              ["Étape", "Calcul", "Résultat"],
              ["volume", "50 × 25 × 2", "2 500 m³"],
              ["en litres", "2 500 × 1 000", "2,5 × 10⁶ L"],
              ["gouttes par litre", "1 000 × 20", "2 × 10⁴"],
              ["gouttes", "2,5 × 10⁶ × 2 × 10⁴", "5 × 10¹⁰"],
            ]),
            echelle(6, 12, [
              { e: 7.7, label: "l'élève", faux: true },
              { e: 10.7, label: "juste" },
            ], { unite: "gouttes", sauts: [{ de: 7.7, a: 10.7, label: "× 1 000" }] }),
          ),
          micros: ["ordre_estimer", "ordre_vraisemblance", "ordre_defi"],
        },
      ],
    },
  ],
};
