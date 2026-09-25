// ─── Fiche d'exercices : multiples, diviseurs et division euclidienne (4e) ─────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-divisibilite.tsx` et sur
// les sept micros du coach de 4e (notionId divisibilite). On reste dans le
// programme de 4e : multiples et diviseurs, critères par 2, 3, 5, 9 et 10,
// division euclidienne (quotient, reste, et la condition 0 ⩽ r < b), liste des
// diviseurs PAR PAIRES, problèmes de lots et de rendez-vous.
// ⛔ Ni nombres premiers ni décomposition en facteurs : c'est la notion sœur
// `nombre_premier`, qui a sa propre feuille. ⛔ Ni PGCD ni PPCM (3e) : les lots
// et les rendez-vous se résolvent en LISTANT, et les deux sigles ne sont jamais
// écrits. ⛔ Pas de critère par 4 (hors programme), pas même comme leurre : une
// division par 4 se POSE (ex. 17, 19, 20).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 42 = 6 × 7, ni 47, 89,
// 154, 173 ou 95 divisés, ni les paires de 36, 60 ou 40, ni 4 275, 1 234, 3 438,
// 2 025, 3 640, 47?, ni les 48 crayons et 36 gommes, les 24 maillots et 30
// ballons, les bus de 6 et 8 minutes, les phares de 9 et 12 secondes, les
// roues de 12 et 18 dents. ⛔ Ni ceux de la feuille de 3e (104, 28, 96, 52,
// 100 ÷ 7, 1 530, 2 745, 8 124, 34■2, 5■8, 71■, 72, 48 et 80 ; le
// ravitaillement, les dalles, Jupiter et Saturne, les équipes du club).
//
// Les pièges nommés : multiple et diviseur échangés (1), la somme des chiffres
// appliquée à 2, 5, 10 (2), « par 3 donc par 9 » (3, 8), le 0 oublié au
// quotient (4), l'égalité juste prise pour une division euclidienne (5), les
// grands diviseurs oubliés (6), le 0 gardé dans « par 2 mais pas par 5 » (7),
// la somme de 9 cherchée au lieu de 18 (8), « un an plus tard, même jour » (9),
// le diviseur de la paire carrée compté deux fois (10), un exemple pris pour
// une preuve (11), le 0 final sans la somme (12), le reste oublié (13), le
// quotient pris pour la réponse (14), un diviseur d'un seul des deux nombres
// (15), le produit pris pour le premier multiple commun (16, 18, 20), la
// première sortie prise pour une rencontre (17), rangées et panneaux échangés (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - le calendrier : 365 jours, 366 les années bissextiles (calendrier
//   grégorien) ; le 1er janvier 2027 est un vendredi — le script de recalcul le
//   relit dans l'horloge de JavaScript — ex. 9 ;
// - la piste d'athlétisme de 400 m (World Athletics, Track and Field Facilities
//   Manual, piste standard de 400 m) — ex. 16 ; les temps au tour sont inventés,
//   à l'allure d'un bon coureur amateur (20 et 16 km/h) ;
// - les cigales périodiques Magicicada, cycles de 13 et 17 ans (Williams et
//   Simon, « The ecology, behavior, and evolution of periodical cicadas »,
//   Annual Review of Entomology 40, 1995) ; l'hypothèse des prédateurs à cycle
//   court (Goles, Schulz et Markus, « Prime number selection of cycles in a
//   predator-prey model », Complexity 6(4), 2001) : c'est une HYPOTHÈSE, et
//   l'énoncé le dit — ex. 17 ;
// - le vélo de route : plateau de 50 dents (pédalier « compact » 50/34) et
//   cassette 11-28, qui contient des pignons de 15 et de 25 dents (Shimano, gamme
//   105 R7000) — ex. 18 ;
// - le panier d'œufs : problème attribué à Ibn al-Haytham, vers l'an 1000
//   (L. E. Dickson, History of the Theory of Numbers, vol. 2, chap. 2) — ex. 20.
// Inventés, à l'ordre de grandeur réel : les 412 voyageurs et le car de 53
// places (ex. 14), les 90 paires de gants et 75 sacs (ex. 15), les 96 et 106
// panneaux solaires (ex. 19).
//
// Les corrigés sont écrits à la première personne (« je pose »), comme les
// feuilles de 3e.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés en ont
// un. La POTENCE de la division posée (`potence`, un SVG local : le dividende,
// les soustractions chiffre par chiffre, le reste en rouge, le quotient en bleu
// sous le diviseur) — le geste du cahier, là où le canvas du coach met
// seulement quotient et reste en face. La FRISE des multiples (`frise`) pour
// les rendez-vous, les RECTANGLES de carreaux (`rectangles`) pour les paires de
// diviseurs, et des tableaux simples (`grille`). Texte nu (jamais de `$`).
// Le script de recalcul RELIT leurs arguments : les écrire en clair, en JSON
// (guillemets doubles).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-divisibilite-4e.mjs` —
// les quotients par soustractions répétées, les diviseurs par essais de 1 à n,
// les multiples communs par balayage, les jours de la semaine par l'horloge.
//
// Micro-compétences : div_multiple_diviseur (1, 11, 16, 18, 20),
// div_critere_2_5_10 (2, 7, 10, 11, 12), div_critere_3_9 (3, 8, 10, 11, 12),
// div_euclidienne (4, 5, 9, 13, 14, 15, 18, 19, 20), div_lister_diviseurs (6,
// 10, 15, 17, 19), div_probleme (9, 14, 15, 16, 17, 18, 19, 20), div_defi (11,
// 12, 13, 17, 20). 7/7.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#b91c1c";

/** Deux dessins côte à côte : l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier (mesuré à 375 px sur la feuille de Pythagore). */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/** Deux dessins l'un sous l'autre, partout : pour un tableau large ou une frise. */
const pile = (a: ReactNode, b: ReactNode) => (
  <div className="space-y-3">
    {a}
    {b}
  </div>
);

// Un tableau simple : une ligne d'en-tête, des lignes de cases, et les lignes
// à mettre en rouge (numéros à partir de 0).
const grille = (entete: string[], lignes: string[][], surligne: number[] = []) => (
  <div className="mx-auto w-full max-w-[22rem] overflow-x-auto print:max-w-[16rem]">
    <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
      <thead>
        <tr>
          {entete.map((e, i) => (
            <th key={i} className="border border-slate-300 bg-slate-100 px-2 py-1 font-semibold text-slate-700">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i}>
            {l.map((v, j) => (
              <td
                key={j}
                className="border border-slate-300 px-2 py-0.5 text-slate-800"
                style={surligne.includes(i) ? { color: ROUGE, fontWeight: 700 } : undefined}
              >
                {v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * ⭐ LA POTENCE : la division posée comme au cahier. À gauche le dividende, puis
 * chaque soustraction chiffre par chiffre, et le reste en rouge ; à droite le
 * diviseur, la barre, et le quotient en bleu dessous. Les étapes sont CALCULÉES
 * à partir de `a` et `b` ; `q` et `r` sont écrits tels quels — le script de
 * recalcul vérifie que a = b × q + r avec 0 ⩽ r < b.
 */
const potence = (a: number, b: number, q: number, r: number) => {
  const ch = String(a).split("").map(Number);
  const n = ch.length;
  type Ligne = { t: string; fin: number; moins?: boolean; reste?: boolean };
  const lignes: Ligne[] = [{ t: String(a), fin: n - 1 }];
  let i = 0;
  let cur = ch[0];
  while (cur < b && i < n - 1) {
    i++;
    cur = cur * 10 + ch[i];
  }
  for (;;) {
    const d = Math.floor(cur / b);
    if (d === 0) {
      lignes[lignes.length - 1].reste = true;
      break;
    }
    lignes.push({ t: String(b * d), fin: i, moins: true });
    const reste = cur - b * d;
    if (i === n - 1) {
      lignes.push({ t: String(reste), fin: i, reste: true });
      break;
    }
    i++;
    cur = reste * 10 + ch[i];
    while (cur < b && i < n - 1) {
      i++;
      cur = cur * 10 + ch[i];
    }
    lignes.push({ t: String(cur), fin: i });
  }
  const cw = 11;
  const rh = 21;
  const y = (k: number) => 18 + k * rh;
  const droite = (fin: number) => 18 + (fin + 1) * cw;
  const xv = droite(n - 1) + 8;
  const large = Math.max(String(b).length, String(q).length) * cw;
  // ⛔ MESURÉ (25/09) : « diviseur » et « quotient » en 10 tombaient à 10,8 px
  // effectifs. En 12, avec 4 unités de plus pour eux, ils passent à ~12,9 px
  // (dessin de ~192 px pour un viewBox d'au plus 179).
  const W = xv + 12 + large + 66;
  const H = y(lignes.length - 1) + 10;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Division posée de ${a} par ${b} : quotient ${q}, reste ${r}`}
      className="mx-auto w-full max-w-[12rem] print:max-w-[9rem]"
    >
      {lignes.map((l, k) => (
        <g key={k}>
          <text
            x={droite(l.fin)}
            y={y(k)}
            textAnchor="end"
            fontFamily="ui-monospace, monospace"
            fontSize={16}
            fontWeight={l.reste ? 700 : 400}
            fill={l.reste ? ROUGE : k === 0 ? "#0f172a" : "#475569"}
          >
            {l.t}
          </text>
          {l.moins && (
            <>
              <text x={droite(l.fin) - l.t.length * cw - 2} y={y(k)} textAnchor="end" fontSize={15} fill="#475569">
                −
              </text>
              <line x1={droite(l.fin) - l.t.length * cw - 12} y1={y(k) + 5} x2={droite(l.fin) + 2} y2={y(k) + 5} stroke="#475569" strokeWidth={1.2} />
            </>
          )}
          {l.reste && k >= 2 && (
            <text x={xv + 12} y={y(k)} fontSize={12} fontWeight={700} fill={ROUGE}>
              reste
            </text>
          )}
        </g>
      ))}
      <line x1={xv} y1={4} x2={xv} y2={y(Math.max(lignes.length - 1, 1)) + 5} stroke="#0f172a" strokeWidth={2} />
      <line x1={xv} y1={y(0) + 6} x2={xv + 12 + large + 4} y2={y(0) + 6} stroke="#0f172a" strokeWidth={2} />
      <text x={xv + 10} y={y(0)} fontFamily="ui-monospace, monospace" fontSize={16} fill="#0f172a">
        {b}
      </text>
      <text x={xv + 10} y={y(1) + 2} fontFamily="ui-monospace, monospace" fontSize={16} fontWeight={700} fill={BLEU}>
        {q}
      </text>
      <text x={xv + 16 + large} y={y(0)} fontSize={12} fill="#64748b">
        diviseur
      </text>
      <text x={xv + 16 + large} y={y(1) + 2} fontSize={12} fill={BLEU}>
        quotient
      </text>
    </svg>
  );
};

/**
 * ⭐ LA FRISE DES MULTIPLES : de 0 à `max`, les multiples de `a` au-dessus (en
 * bleu), ceux de `b` au-dessous (en orange), et les multiples COMMUNS en rouge,
 * reliés par un trait. Les rendez-vous se LISENT : c'est le premier rouge.
 */
// ⛔ MESURÉ À 375 px (25/09) : le dessin y fait ~235 px de large. Avec un
// viewBox de 320 et des nombres en 10, ils tombaient à 7,3 px. D'où un viewBox
// de 260 et des nombres en 12,5 (≈ 11,3 px effectifs) ; les deux noms longs
// sortent du SVG, en légende HTML dessous ; et quand les multiples sont serrés
// (moins de 26 unités entre deux), leurs nombres s'écrivent sur deux étages.
const frise = (max: number, a: number, b: number, nomA: string, nomB: string) => {
  const W = 260;
  const g = 16;
  const fs = 12.5;
  const X = (v: number) => g + (v / max) * (W - 2 * g);
  const ma = Array.from({ length: Math.floor(max / a) }, (_, k) => (k + 1) * a);
  const mb = Array.from({ length: Math.floor(max / b) }, (_, k) => (k + 1) * b);
  const serreA = X(a) - X(0) < 26;
  const serreB = X(b) - X(0) < 26;
  const y = serreA ? 50 : 36;
  const H = y + (serreB ? 50 : 36);
  const commun = (v: number) => ma.includes(v) && mb.includes(v);
  return (
    <figure className="mx-auto w-full max-w-[22rem] print:max-w-[16rem]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Les multiples de ${a} et de ${b} jusqu'à ${max} ; en commun : ${ma.filter(commun).join(", ") || "aucun"}`}
        className="w-full"
      >
        <line x1={g} y1={y} x2={W - g} y2={y} stroke="#334155" strokeWidth={1.5} />
        <line x1={g} y1={y - 5} x2={g} y2={y + 5} stroke="#334155" strokeWidth={1.5} />
        <text x={g - 4} y={y + 4} textAnchor="end" fontSize={fs} fill="#334155">
          0
        </text>
        {ma.filter(commun).map((v) => (
          <line key={`c${v}`} x1={X(v)} y1={y - 12} x2={X(v)} y2={y + 12} stroke={ROUGE} strokeWidth={2} />
        ))}
        {ma.map((v, k) => (
          <g key={`a${v}`}>
            <circle cx={X(v)} cy={y - 10} r={3.5} fill={commun(v) ? ROUGE : BLEU} />
            <text x={X(v)} y={y - 18 - (serreA && k % 2 === 1 ? 14 : 0)} textAnchor="middle" fontSize={fs} fontWeight={commun(v) ? 700 : 400} fill={commun(v) ? ROUGE : BLEU}>
              {v}
            </text>
          </g>
        ))}
        {mb.map((v, k) => (
          <g key={`b${v}`}>
            <circle cx={X(v)} cy={y + 10} r={3.5} fill={commun(v) ? ROUGE : ORANGE} />
            <text x={X(v)} y={y + 28 + (serreB && k % 2 === 1 ? 14 : 0)} textAnchor="middle" fontSize={fs} fontWeight={commun(v) ? 700 : 400} fill={commun(v) ? ROUGE : ORANGE}>
              {v}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-1 flex flex-wrap justify-center gap-x-4 text-[12px] font-semibold print:text-[9px]">
        <span style={{ color: BLEU }}>● au-dessus : {nomA}</span>
        <span style={{ color: ORANGE }}>● au-dessous : {nomB}</span>
      </figcaption>
    </figure>
  );
};

/**
 * ⭐ LES RECTANGLES DE CARREAUX : une paire de diviseurs, c'est une façon de
 * ranger n carreaux en rectangle — `[rangées, carreaux par rangée]`, carreau de
 * `s` unités. Le premier carreau de chaque rectangle est en orange.
 */
const rectangles = (paires: [number, number][], s = 6) => (
  <div className="mx-auto flex w-full max-w-[24rem] flex-wrap items-end justify-center gap-x-5 gap-y-3 print:max-w-[18rem]">
    {paires.map(([l, c], k) => (
      <figure key={k} className="max-w-full text-center">
        <svg
          viewBox={`0 0 ${c * s + 2} ${l * s + 2}`}
          width={c * s + 2}
          height={l * s + 2}
          role="img"
          aria-label={`${l * c} carreaux en ${l} rangées de ${c}`}
          className="mx-auto max-w-full"
        >
          {Array.from({ length: l * c }, (_, i) => (
            <rect
              key={i}
              x={1 + (i % c) * s}
              y={1 + Math.floor(i / c) * s}
              width={s}
              height={s}
              fill={i === 0 ? "#fed7aa" : "#dbeafe"}
              stroke={BLEU}
              strokeWidth={0.6}
            />
          ))}
        </svg>
        <figcaption className="mt-1 text-[12px] font-semibold text-slate-700 print:text-[9px]">
          {l} {l > 1 ? "rangées" : "rangée"} de {c}
        </figcaption>
      </figure>
    ))}
  </div>
);

export const exercicesDivisibilite4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "divisibilite",
  titre: "Multiples, diviseurs et division euclidienne",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître un multiple et un diviseur, appliquer les critères par 2, 3, 5, 9 et 10, poser une division euclidienne et lire son quotient et son reste, lister tous les diviseurs par paires. Puis le calendrier, les cars d'une sortie, les kits d'un nettoyage de plage, deux coureurs sur une piste, les cigales de 13 ans, la chaîne d'un vélo, des panneaux solaires et le panier d'œufs d'Ibn al-Haytham. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la division posée ou le schéma.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/divisibilite", titre: "Multiples, diviseurs et division euclidienne" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je justifie par une égalité, un critère ou une division posée, jamais par une impression.",
      rappel: [
        "$b$ est un DIVISEUR de $a$ (et $a$ un MULTIPLE de $b$) quand $a = b \\times k$, avec $k$ entier : la division tombe juste, le reste vaut $0$.",
        "Par $2$, $5$ et $10$ : je regarde le chiffre des UNITÉS ($0$, $2$, $4$, $6$ ou $8$ pour $2$ ; $0$ ou $5$ pour $5$ ; $0$ pour $10$). Par $3$ et $9$ : je regarde la SOMME des chiffres.",
        "Division euclidienne de $a$ par $b$ : $a = b \\times q + r$ avec $0 \\leqslant r < b$. Le reste est TOUJOURS plus petit que le diviseur.",
        "Les diviseurs vont par PAIRES : je pars de $1$, et je m'arrête quand les deux nombres de la paire se croisent.",
      ],
      exercices: [
        {
          enonce:
            "a) On sait que $161 = 7 \\times 23$. Compléter par « multiple » ou « diviseur » : $161$ est un … de $7$ ; $23$ est un … de $161$.\nb) $117$ est-il un multiple de $9$ ?\nc) $8$ est-il un diviseur de $68$ ?\nd) Donner les multiples de $15$ compris entre $100$ et $140$.",
          correction:
            "a) L'égalité $161 = 7 \\times 23$ dit que $161$ s'obtient en multipliant $7$ par un entier : $161$ est un multiple de $7$. Elle dit aussi que la division de $161$ par $23$ tombe juste : $23$ est un diviseur de $161$.\nb) Je cherche $117$ dans la table de $9$ : $9 \\times 13 = 117$. Oui, $117$ est un multiple de $9$.\nc) Je pose la division : $68 = 8 \\times 8 + 4$. Il reste $4$, pas $0$ : $8$ n'est pas un diviseur de $68$.\nd) J'écris la table de $15$ autour de $100$ : $15 \\times 6 = 90$ est trop petit, puis $15 \\times 7 = 105$, $15 \\times 8 = 120$, $15 \\times 9 = 135$, et $15 \\times 10 = 150$ dépasse $140$.\n⛔ Le piège : échanger les deux mots. Le MULTIPLE est toujours le plus grand des deux ($161$), le DIVISEUR le plus petit ($7$ ou $23$).\nRéponse : a) multiple, diviseur ; b) oui ; c) non ; d) $105$, $120$ et $135$.",
          schema: pile(
            grille(["le test", "le calcul", "reste", "verdict"], [["117 par 9", "9 × 13 = 117", "0", "oui"], ["68 par 8", "8 × 8 = 64", "4", "non"]]),
            grille(["k", "15 × k", "entre 100 et 140 ?"], [["6", "90", "non"], ["7", "105", "oui"], ["8", "120", "oui"], ["9", "135", "oui"], ["10", "150", "non"]], [1, 2, 3]),
          ),
          micros: ["div_multiple_diviseur"],
        },
        {
          enonce:
            "Chaque nombre est-il divisible par $2$ ? par $5$ ? par $10$ ? Répondre sans poser de division.\n$4\\,370$ ; $8\\,915$ ; $6\\,052$ ; $7\\,001$",
          correction:
            "Pour $2$, $5$ et $10$, je ne regarde QUE le chiffre des unités.\n$4\\,370$ finit par $0$ : il est divisible par $2$, par $5$ et par $10$.\n$8\\,915$ finit par $5$ : divisible par $5$, mais ni par $2$ (le chiffre $5$ est impair) ni par $10$.\n$6\\,052$ finit par $2$, un chiffre pair : divisible par $2$, mais ni par $5$ ni par $10$. Contrôle : $6\\,052 = 2 \\times 3\\,026$.\n$7\\,001$ finit par $1$ : divisible par aucun des trois.\n⭐ Un nombre divisible par $10$ l'est forcément par $2$ et par $5$ : seul le $0$ au chiffre des unités fait tomber les trois ensemble.\n⛔ Le piège : additionner les chiffres. $6 + 0 + 5 + 2 = 13$ est impair, et pourtant $6\\,052$ est pair. La somme des chiffres sert pour $3$ et $9$, jamais pour $2$, $5$ ou $10$.\nRéponse : $4\\,370$ par $2$, $5$ et $10$ ; $8\\,915$ par $5$ seulement ; $6\\,052$ par $2$ seulement ; $7\\,001$ par aucun des trois.",
          schema: grille(
            ["nombre", "unités", "par 2", "par 5", "par 10"],
            [["4 370", "0", "oui", "oui", "oui"], ["8 915", "5", "non", "oui", "non"], ["6 052", "2", "oui", "non", "non"], ["7 001", "1", "non", "non", "non"]],
          ),
          micros: ["div_critere_2_5_10"],
        },
        {
          enonce:
            "Chaque nombre est-il divisible par $3$ ? par $9$ ? Répondre sans poser de division.\n$5\\,742$ ; $2\\,613$ ; $8\\,051$ ; $30\\,033$",
          correction:
            "Pour $3$ et $9$, j'additionne les chiffres, puis je teste la somme, bien plus petite que le nombre.\n$5\\,742$ : $5 + 7 + 4 + 2 = 18$. $18$ est dans la table de $3$ et dans celle de $9$ : $5\\,742$ est divisible par $3$ et par $9$.\n$2\\,613$ : $2 + 6 + 1 + 3 = 12$. $12$ est dans la table de $3$, pas dans celle de $9$ : divisible par $3$ seulement.\n$8\\,051$ : $8 + 0 + 5 + 1 = 14$. $14$ n'est ni dans la table de $3$ ni dans celle de $9$ : divisible par aucun des deux.\n$30\\,033$ : $3 + 0 + 0 + 3 + 3 = 9$ : divisible par $3$ et par $9$. Contrôle : $30\\,033 = 9 \\times 3\\,337$.\n⛔ Le piège : conclure « divisible par $3$, donc par $9$ ». $2\\,613 = 3 \\times 871$, mais $2\\,613 = 9 \\times 290 + 3$ : il reste $3$.\nRéponse : $5\\,742$ et $30\\,033$ par $3$ et par $9$ ; $2\\,613$ par $3$ seulement ; $8\\,051$ par aucun des deux.",
          schema: grille(
            ["nombre", "somme des chiffres", "par 3", "par 9"],
            [["5 742", "18", "oui", "oui"], ["2 613", "12", "oui", "non"], ["8 051", "14", "non", "non"], ["30 033", "9", "oui", "oui"]],
          ),
          micros: ["div_critere_3_9"],
        },
        {
          enonce:
            "Poser chaque division euclidienne, puis écrire l'égalité $a = b \\times q + r$ et vérifier la condition sur le reste.\na) $627$ divisé par $6$\nb) $239$ divisé par $9$",
          correction:
            "a) En $6$, combien de fois $6$ ? $1$ fois, il reste $0$. J'abaisse le $2$ : en $2$, il y a $0$ fois $6$, et j'écris ce $0$ au quotient. J'abaisse le $7$ : en $27$, il y a $4$ fois $6$ ($6 \\times 4 = 24$), il reste $3$.\nDonc $627 = 6 \\times 104 + 3$, et $3 < 6$.\nb) En $2$, pas de $9$ : je prends $23$. En $23$, $2$ fois $9$ ($18$), il reste $5$. J'abaisse le $9$ : en $59$, $6$ fois $9$ ($54$), il reste $5$.\nDonc $239 = 9 \\times 26 + 5$, et $5 < 9$.\n⭐ Contrôle : je remultiplie. $6 \\times 104 + 3 = 624 + 3 = 627$ et $9 \\times 26 + 5 = 234 + 5 = 239$.\n⛔ Le piège au a) : oublier le $0$ du quotient et écrire $14$. Le contrôle le voit tout de suite : $6 \\times 14 + 3 = 87$, très loin de $627$.\nRéponse : $627 = 6 \\times 104 + 3$ ; $239 = 9 \\times 26 + 5$.",
          schema: deux(potence(627, 6, 104, 3), potence(239, 9, 26, 5)),
          micros: ["div_euclidienne"],
        },
        {
          enonce:
            "On veut la division euclidienne de $130$ par $12$. Pour chaque écriture, dire si l'égalité est juste, puis si c'est la division euclidienne demandée.\na) $130 = 12 \\times 10 + 10$\nb) $130 = 12 \\times 9 + 22$\nc) $130 = 12 \\times 11 - 2$\nd) Un élève dit : « $130 = 10 \\times 12 + 10$, c'est donc aussi la division euclidienne de $130$ par $10$. » A-t-il raison ?",
          correction:
            "Une division euclidienne demande DEUX choses : l'égalité $a = b \\times q + r$, ET un reste avec $0 \\leqslant r < b$.\na) $12 \\times 10 = 120$ et $120 + 10 = 130$ : l'égalité est juste. Le reste $10$ est plus petit que $12$ : c'est la division euclidienne de $130$ par $12$.\nb) $12 \\times 9 = 108$ et $108 + 22 = 130$ : l'égalité est juste. Mais $22 > 12$ : avec $22$ restants, on peut encore faire une part de $12$. Ce n'est pas la division euclidienne.\nc) $12 \\times 11 = 132$ et $132 - 2 = 130$ : juste, mais on RETIRE $2$ au lieu d'ajouter un reste. Un reste n'est jamais négatif : non.\nd) Non. Pour une division par $10$, le reste doit être plus petit que $10$, et ici il vaut $10$. La bonne écriture est $130 = 10 \\times 13 + 0$ : la division tombe juste.\n⛔ Le piège : s'arrêter à l'égalité. Les quatre égalités sont justes, une seule est une division euclidienne.\nRéponse : seule l'écriture a) est la division euclidienne de $130$ par $12$ ; par $10$, c'est $130 = 10 \\times 13 + 0$.",
          schema: grille(
            ["écriture", "égalité juste ?", "reste < diviseur ?", "division euclidienne ?"],
            [["130 = 12 × 10 + 10", "oui", "oui", "oui"], ["130 = 12 × 9 + 22", "oui", "non", "non"], ["130 = 12 × 11 − 2", "oui", "non", "non"], ["130 = 10 × 12 + 10", "oui", "non", "non"]],
            [0],
          ),
          micros: ["div_euclidienne"],
        },
        {
          enonce: "Trouver tous les diviseurs de $45$, en les cherchant par paires. Combien y en a-t-il ?",
          correction:
            "Je pars de $1$ et j'avance. Chaque diviseur trouvé m'en donne un second : celui qui complète le produit.\n$1 \\times 45 = 45$ : $1$ et $45$.\n$2$ : non, $45$ est impair.\n$3 \\times 15 = 45$ : $3$ et $15$ (la somme des chiffres, $4 + 5 = 9$, est dans la table de $3$).\n$4$ : non, $45 = 4 \\times 11 + 1$.\n$5 \\times 9 = 45$ : $5$ et $9$ ($45$ finit par $5$).\n$6$ : non, $45 = 6 \\times 7 + 3$.\nJe m'arrête : $7 \\times 7 = 49$ dépasse déjà $45$. Au-delà, je ne retrouverais que les grands diviseurs déjà écrits.\n⛔ Le piège : ne noter que les petits nombres, $1$, $3$ et $5$. Chaque petit diviseur amène son partenaire : $45$, $15$ et $9$.\nRéponse : $1$, $3$, $5$, $9$, $15$ et $45$ : six diviseurs.",
          schema: rectangles([[1, 45], [3, 15], [5, 9]], 5),
          micros: ["div_lister_diviseurs"],
        },
        {
          enonce:
            "Dans le nombre $358\\square$, le chiffre des unités est caché. Donner toutes ses valeurs possibles pour que le nombre soit :\na) divisible par $5$ ;\nb) divisible par $2$ ;\nc) divisible par $10$ ;\nd) divisible par $2$ mais pas par $5$.",
          correction:
            "Les trois critères ne regardent que le chiffre des unités : ici, c'est justement le chiffre caché. Les chiffres $3$, $5$ et $8$ devant ne comptent pas.\na) Divisible par $5$ : le chiffre des unités vaut $0$ ou $5$. Soit $3\\,580$ ou $3\\,585$.\nb) Divisible par $2$ : le chiffre des unités est pair, $0$, $2$, $4$, $6$ ou $8$.\nc) Divisible par $10$ : le chiffre des unités vaut $0$. Soit $3\\,580$.\nd) Je prends les chiffres du b), et j'enlève ceux du a) : le $0$ part, il reste $2$, $4$, $6$ et $8$.\n⛔ Le piège au d) : garder le $0$. $3\\,580$ est divisible par $2$, mais AUSSI par $5$, puisqu'il finit par $0$.\nRéponse : a) $0$ ou $5$ ; b) $0$, $2$, $4$, $6$ ou $8$ ; c) $0$ ; d) $2$, $4$, $6$ ou $8$.",
          schema: grille(
            ["chiffre", "par 2", "par 5", "par 10"],
            [["0", "oui", "oui", "oui"], ["1", "non", "non", "non"], ["2", "oui", "non", "non"], ["3", "non", "non", "non"], ["4", "oui", "non", "non"], ["5", "non", "oui", "non"], ["6", "oui", "non", "non"], ["7", "non", "non", "non"], ["8", "oui", "non", "non"], ["9", "non", "non", "non"]],
            [2, 4, 6, 8],
          ),
          micros: ["div_critere_2_5_10"],
        },
        {
          enonce:
            "Trouver le chiffre caché $\\square$, en donnant toutes les possibilités.\na) $2\\square71$ est divisible par $9$.\nb) $4\\square6$ est divisible par $3$.\nc) Parmi les nombres trouvés au b), lesquels sont divisibles par $3$ mais pas par $9$ ?",
          correction:
            "a) Divisible par $9$ : la somme des chiffres doit être dans la table de $9$. Sans le chiffre caché, $2 + 7 + 1 = 10$. Il faut que $10 + \\square$ vaille $18$, le seul multiple de $9$ entre $10$ et $19$ : $\\square = 8$, et le nombre est $2\\,871$.\nb) Divisible par $3$ : $4 + 6 = 10$, et $10 + \\square$ doit être dans la table de $3$ : $12$, $15$ ou $18$. Donc $\\square = 2$, $5$ ou $8$ : $426$, $456$ ou $486$.\nc) Je regarde les sommes : $12$ et $15$ ne sont pas dans la table de $9$, $18$ l'est. Donc $426$ et $456$ sont divisibles par $3$ mais pas par $9$ ; $486$ l'est par les deux.\n⭐ Contrôle : $2\\,871 = 9 \\times 319$ et $486 = 9 \\times 54$.\n⛔ Le piège au a) : chercher une somme égale à $9$. $10 + \\square = 9$ est impossible, mais la table de $9$ continue : $18$.\nRéponse : a) $2\\,871$ ; b) $426$, $456$ ou $486$ ; c) $426$ et $456$.",
          schema: grille(
            ["chiffre", "4 + chiffre + 6", "par 3", "par 9"],
            [["0", "10", "non", "non"], ["1", "11", "non", "non"], ["2", "12", "oui", "non"], ["3", "13", "non", "non"], ["4", "14", "non", "non"], ["5", "15", "oui", "non"], ["6", "16", "non", "non"], ["7", "17", "non", "non"], ["8", "18", "oui", "oui"], ["9", "19", "non", "non"]],
            [2, 5, 8],
          ),
          micros: ["div_critere_3_9"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je pose la division ou je liste par paires, je relis la question, et je vérifie en remultipliant.",
      rappel: [
        "Si $9$ divise un nombre, $3$ le divise aussi ; si $10$ le divise, $2$ et $5$ aussi. L'inverse est faux, et un seul contre-exemple suffit à le montrer.",
        "Dans un problème, le QUOTIENT compte les groupes complets, le RESTE ce qui n'a pas trouvé sa place : je relis la question avant de choisir.",
        "Faire des lots identiques sans reste : un DIVISEUR commun, le plus grand. Se retrouver ensemble : un MULTIPLE commun, le premier.",
      ],
      exercices: [
        {
          enonce:
            "a) Écrire la division euclidienne de $365$ par $7$. Combien de semaines complètes compte une année de $365$ jours ?\nb) Le 1er janvier 2027 est un vendredi. Quel jour de la semaine sera le 1er janvier 2028 ?\nc) L'année 2028 est bissextile : elle compte $366$ jours. Quel jour sera le 1er janvier 2029 ?",
          correction:
            "a) Je pose la division : en $36$, $5$ fois $7$ ($35$), il reste $1$ ; j'abaisse le $5$ : en $15$, $2$ fois $7$ ($14$), il reste $1$. Donc $365 = 7 \\times 52 + 1$, et $1 < 7$ : une année de $365$ jours compte $52$ semaines complètes et $1$ jour.\nb) Du 1er janvier 2027 au 1er janvier 2028, il y a $365$ jours. Les $52$ semaines complètes ramènent au vendredi ; le jour qui reste fait avancer d'un cran : samedi.\nc) $366 = 7 \\times 52 + 2$ : cette fois, deux jours de décalage. Samedi, puis dimanche, puis lundi.\n⛔ Le piège : croire qu'« un an plus tard » tombe le même jour. Les semaines complètes ramènent au même jour ; c'est le RESTE de la division qui décale.\nRéponse : $365 = 7 \\times 52 + 1$, soit $52$ semaines et $1$ jour ; le 1er janvier 2028 est un samedi, le 1er janvier 2029 un lundi.",
          schema: pile(
            potence(365, 7, 52, 1),
            grille(["1er janvier", "jours dans l'année", "reste par 7", "jour"], [["2027", "365", "1", "vendredi"], ["2028", "366", "2", "samedi"], ["2029", "—", "—", "lundi"]], [2]),
          ),
          micros: ["div_euclidienne", "div_probleme"],
        },
        {
          enonce:
            "a) Trouver tous les diviseurs de $84$, par paires.\nb) Même question pour $100$.\nc) L'un des deux nombres a un nombre impair de diviseurs. Lequel, et pourquoi ?",
          correction:
            "a) Je pars de $1$, et j'utilise les critères pour aller vite.\n$1 \\times 84$, $2 \\times 42$ ($84$ est pair), $3 \\times 28$ ($8 + 4 = 12$), $4 \\times 21$, $6 \\times 14$, $7 \\times 12$.\n$5$ : non, $84$ ne finit ni par $0$ ni par $5$. $8$ : non, $84 = 8 \\times 10 + 4$. $9$ : non, $12$ n'est pas dans la table de $9$.\nJe n'ai pas besoin d'aller plus loin : $10 \\times 10 = 100$ dépasse $84$.\nLes diviseurs de $84$ sont $1$, $2$, $3$, $4$, $6$, $7$, $12$, $14$, $21$, $28$, $42$ et $84$ : il y en a $12$.\nb) $1 \\times 100$, $2 \\times 50$, $4 \\times 25$, $5 \\times 20$, $10 \\times 10$. $3$ et $9$ : non ($1 + 0 + 0 = 1$). $6$ : non, puisque $3$ ne divise pas $100$. $7$ : non, $100 = 7 \\times 14 + 2$. $8$ : non, $100 = 8 \\times 12 + 4$. À $10 \\times 10$, la paire se croise : je m'arrête.\nLes diviseurs de $100$ sont $1$, $2$, $4$, $5$, $10$, $20$, $25$, $50$ et $100$ : il y en a $9$.\nc) C'est $100$. D'habitude, chaque paire apporte DEUX diviseurs. Mais la paire $10 \\times 10$ n'en apporte qu'un : $10$, écrit une seule fois.\n⛔ Le piège : compter $10$ deux fois, et annoncer $10$ diviseurs pour $100$.\nRéponse : $84$ a $12$ diviseurs, $100$ en a $9$ ; c'est $100$, à cause de la paire $10 \\times 10$.",
          schema: deux(
            grille(["paire", "produit"], [["1 × 84", "84"], ["2 × 42", "84"], ["3 × 28", "84"], ["4 × 21", "84"], ["6 × 14", "84"], ["7 × 12", "84"]]),
            grille(["paire", "produit"], [["1 × 100", "100"], ["2 × 50", "100"], ["4 × 25", "100"], ["5 × 20", "100"], ["10 × 10", "100"]], [4]),
          ),
          micros: ["div_lister_diviseurs", "div_critere_2_5_10", "div_critere_3_9"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifier par une preuve ou par un contre-exemple.\na) Un nombre divisible par $10$ est toujours divisible par $5$.\nb) Un nombre divisible par $5$ est toujours divisible par $10$.\nc) Un nombre divisible par $3$ est toujours divisible par $9$.\nd) Un nombre divisible par $9$ est toujours divisible par $3$.\ne) La somme de deux multiples de $7$ est toujours un multiple de $7$.",
          correction:
            "a) VRAI. Si $n = 10 \\times k$, alors $n = 5 \\times 2 \\times k$ : $n$ est un multiple de $5$. Avec le critère : un nombre divisible par $10$ finit par $0$, et $0$ convient pour $5$.\nb) FAUX. Un contre-exemple suffit : $35$ finit par $5$, il est divisible par $5$ ; mais $35 = 10 \\times 3 + 5$, il n'est pas divisible par $10$.\nc) FAUX. $21$ : $2 + 1 = 3$, il est divisible par $3$ ; mais $21 = 9 \\times 2 + 3$, il n'est pas divisible par $9$.\nd) VRAI. Si $n = 9 \\times k$, alors $n = 3 \\times 3 \\times k$ : $n$ est un multiple de $3$.\ne) VRAI. Deux multiples de $7$ s'écrivent $7 \\times a$ et $7 \\times b$ ; leur somme vaut $7 \\times (a + b)$, un multiple de $7$. Exemple : $14 + 21 = 35 = 7 \\times 5$.\n⛔ Le piège au b) : « prouver » avec un exemple qui marche, comme $40$. Un exemple ne prouve pas une règle générale ; un seul contre-exemple la fait tomber.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai ; e) vrai.",
          schema: grille(
            ["si divisible…", "verdict", "preuve ou contre-exemple"],
            [["par 10, alors par 5", "vrai", "10 × k = 5 × 2 × k"], ["par 5, alors par 10", "faux", "35 = 10 × 3 + 5"], ["par 3, alors par 9", "faux", "21 = 9 × 2 + 3"], ["par 9, alors par 3", "vrai", "9 × k = 3 × 3 × k"], ["deux fois par 7, la somme aussi", "vrai", "14 + 21 = 7 × 5"]],
            [1, 2],
          ),
          micros: ["div_defi", "div_multiple_diviseur", "div_critere_2_5_10", "div_critere_3_9"],
        },
        {
          enonce:
            "a) Quel est le plus petit nombre de quatre chiffres divisible à la fois par $2$, $3$, $5$ et $9$ ?\nb) Quel est le plus grand nombre de trois chiffres qui l'est aussi ?\nc) Vérifier le a) en posant la division par $9$.",
          correction:
            "a) Divisible par $2$ ET par $5$ : le chiffre des unités doit être pair ET valoir $0$ ou $5$. Seul $0$ convient.\nDivisible par $9$ : la somme des chiffres est dans la table de $9$. Et alors il est aussi divisible par $3$, sans test de plus.\nJe cherche donc le plus petit nombre de quatre chiffres qui finit par $0$ et dont la somme des chiffres est un multiple de $9$. Je pars de $1\\,000$ et j'avance de dix en dix : les sommes valent $1$, $2$, $3$… et atteignent $9$ pour $1\\,080$ ($1 + 0 + 8 + 0 = 9$).\nb) Je pars du plus grand, $990$ : il finit par $0$ et $9 + 9 + 0 = 18$, dans la table de $9$. C'est lui.\nc) En $10$, $1$ fois $9$, il reste $1$ ; j'abaisse le $8$ : en $18$, $2$ fois $9$, il reste $0$ ; j'abaisse le $0$ : en $0$, $0$ fois. Donc $1\\,080 = 9 \\times 120 + 0$ : la division tombe juste.\n⛔ Le piège : s'arrêter à $1\\,000$ parce qu'il finit par $0$. Il faut AUSSI la somme des chiffres : $1 + 0 + 0 + 0 = 1$ n'est pas dans la table de $9$.\nRéponse : a) $1\\,080$ ; b) $990$.",
          schema: pile(
            grille(
              ["nombre", "somme des chiffres", "par 9 ?"],
              [["1 000", "1", "non"], ["1 010", "2", "non"], ["1 020", "3", "non"], ["1 030", "4", "non"], ["1 040", "5", "non"], ["1 050", "6", "non"], ["1 060", "7", "non"], ["1 070", "8", "non"], ["1 080", "9", "oui"]],
              [8],
            ),
            potence(1080, 9, 120, 0),
          ),
          micros: ["div_defi", "div_critere_2_5_10", "div_critere_3_9"],
        },
        {
          enonce:
            "Dans une division euclidienne, le diviseur est $13$, le quotient $17$ et le reste $9$.\na) Quel est le dividende ?\nb) Un camarade trouve un reste de $15$ dans une autre division par $13$. Est-ce possible ?\nc) Quels sont tous les nombres qui, divisés par $13$, donnent un quotient de $17$ ?",
          correction:
            "a) J'utilise l'égalité $a = b \\times q + r$ : $a = 13 \\times 17 + 9 = 221 + 9 = 230$. Je vérifie la condition : $9 < 13$.\nb) Non. Dans une division par $13$, le reste est plus petit que $13$ : il va de $0$ à $12$. Avec $15$ restants, on pourrait faire une part de $13$ de plus.\nc) Le nombre s'écrit $13 \\times 17 + r = 221 + r$, avec $r$ de $0$ à $12$. Ce sont les $13$ nombres de $221$ à $233$.\n⭐ Contrôle : $234 = 13 \\times 18$ ; à partir de $234$, le quotient passe à $18$.\n⛔ Le piège au a) : oublier le reste et répondre $221$. $221$ divisé par $13$ tombe juste ; il manque les $9$ qui restent.\nRéponse : a) $230$ ; b) non ; c) les nombres de $221$ à $233$.",
          schema: potence(230, 13, 17, 9),
          micros: ["div_euclidienne", "div_defi"],
        },
        {
          enonce:
            "Un collège organise une sortie pour $412$ élèves et accompagnateurs. Un car compte $53$ places.\na) Poser la division euclidienne de $412$ par $53$.\nb) Combien de cars faut-il réserver ?\nc) Combien de places restent libres ?",
          correction:
            "a) En $41$, pas de $53$ : je prends $412$. J'estime : $53$ est proche de $50$, et $412 \\div 50$ fait environ $8$. J'essaie : $53 \\times 8 = 424$, trop grand ; $53 \\times 7 = 371$, et $412 - 371 = 41$. Donc $412 = 53 \\times 7 + 41$, et $41 < 53$.\nb) Le quotient $7$ compte les cars PLEINS. Mais le reste dit que $41$ personnes n'ont pas encore de place : il faut un car de plus. $7 + 1 = 8$ cars.\nc) $8$ cars offrent $53 \\times 8 = 424$ places, et $424 - 412 = 12$ places restent libres.\n⛔ Le piège : répondre $7$ cars, le quotient. $41$ personnes resteraient sur le parking : le reste n'est pas un détail, il décide de la réponse.\nRéponse : $412 = 53 \\times 7 + 41$ ; il faut $8$ cars, et $12$ places restent libres.",
          schema: potence(412, 53, 7, 41),
          micros: ["div_euclidienne", "div_probleme"],
        },
        {
          enonce:
            "Pour une journée de ramassage des déchets sur une plage, une association a $90$ paires de gants et $75$ sacs. Elle veut composer des kits tous identiques, sans qu'il reste rien.\na) Lister les diviseurs de $90$ et ceux de $75$.\nb) Quel est le plus grand nombre de kits possible ? Que contient chaque kit ?\nc) Pourquoi ne peut-on pas faire $10$ kits ?",
          correction:
            "a) Par paires. $90 = 1 \\times 90 = 2 \\times 45 = 3 \\times 30 = 5 \\times 18 = 6 \\times 15 = 9 \\times 10$. Diviseurs de $90$ : $1$, $2$, $3$, $5$, $6$, $9$, $10$, $15$, $18$, $30$, $45$, $90$.\n$75 = 1 \\times 75 = 3 \\times 25 = 5 \\times 15$ ($75$ est impair : ni $2$, ni $4$, ni $6$, ni $8$ ; et $75 = 7 \\times 10 + 5$). Diviseurs de $75$ : $1$, $3$, $5$, $15$, $25$, $75$.\nb) Le nombre de kits doit diviser $90$ ET $75$ : sinon il reste des gants ou des sacs. Les diviseurs communs sont $1$, $3$, $5$ et $15$ ; le plus grand est $15$.\nChaque kit contient $90 \\div 15 = 6$ paires de gants et $75 \\div 15 = 5$ sacs.\nc) $10$ divise $90$, mais $75 = 10 \\times 7 + 5$ : il resterait $5$ sacs.\n⛔ Le piège : prendre un diviseur d'un seul des deux nombres. $45$ divise $90$, mais $75 = 45 \\times 1 + 30$ : il resterait $30$ sacs.\nRéponse : $15$ kits au plus, avec $6$ paires de gants et $5$ sacs chacun.",
          schema: grille(
            ["", "diviseurs"],
            [["de 90", "1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90"], ["de 75", "1, 3, 5, 15, 25, 75"], ["communs", "1, 3, 5, 15"]],
            [2],
          ),
          micros: ["div_probleme", "div_lister_diviseurs", "div_euclidienne"],
        },
        {
          enonce:
            "Sur une piste d'athlétisme de $400$ m, Inès boucle un tour en $72$ secondes et Tom en $90$ secondes. Ils partent ensemble de la ligne d'arrivée et courent à allure régulière.\na) Écrire les multiples de $72$ et ceux de $90$ jusqu'à $400$.\nb) Au bout de combien de secondes repassent-ils ensemble sur la ligne pour la première fois ? Combien de tours chacun a-t-il faits ?\nc) Quelle distance Inès a-t-elle alors parcourue ?",
          correction:
            "a) Inès repasse sur la ligne à chaque multiple de $72$ : $72$, $144$, $216$, $288$, $360$. Tom, à chaque multiple de $90$ : $90$, $180$, $270$, $360$.\nb) Ils repassent ENSEMBLE à un multiple commun, et la première fois au plus petit : $360$ secondes, soit $6$ minutes.\nInès a fait $360 \\div 72 = 5$ tours, Tom $360 \\div 90 = 4$ tours.\nc) $5 \\times 400 = 2\\,000$ m, soit $2$ km.\n⛔ Le piège : multiplier $72 \\times 90 = 6\\,480$ secondes. C'est bien un multiple commun, mais $18$ fois trop loin : $6\\,480 = 360 \\times 18$.\nRéponse : au bout de $360$ secondes ($6$ minutes), après $5$ tours pour Inès et $4$ pour Tom ; Inès a couru $2$ km.",
          schema: frise(400, 72, 90, "Inès : un tour en 72 s", "Tom : un tour en 90 s"),
          micros: ["div_probleme", "div_multiple_diviseur"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je traduis en multiples, en diviseurs ou en division euclidienne, puis j'écris une phrase de réponse.",
      rappel: [
        "Je traduis la situation : partager sans reste, ce sont des DIVISEURS ; revenir ensemble, des MULTIPLES ; ce qui ne tombe pas juste, le RESTE d'une division.",
        "Pour le premier multiple commun, j'avance dans la liste des multiples du plus grand nombre, et je teste chacun dans la table de l'autre.",
        "Je vérifie en remultipliant, et j'écris une phrase de réponse avec l'unité.",
      ],
      exercices: [
        {
          titre: "Les cigales de 13 ans",
          enonce:
            "En Amérique du Nord, des cigales (genre Magicicada) vivent $13$ ou $17$ ans sous terre, puis sortent toutes la même année. Une hypothèse des biologistes : ce cycle les protège de prédateurs qui reviennent en nombre tous les $2$, $3$, $4$, $5$ ou $6$ ans. On compte les années à partir d'une année où cigales et prédateurs sont là ensemble.\na) Une cigale imaginaire aurait un cycle de $12$ ans. Lister les diviseurs de $12$. Quels prédateurs la retrouveraient à CHAQUE sortie ?\nb) Lister les diviseurs de $13$ et de $17$. Même question pour les vraies cigales.\nc) La cigale de $13$ ans et le prédateur de $4$ ans : au bout de combien d'années se retrouvent-ils pour la première fois ? À quelle sortie des cigales ?",
          correction:
            "a) Diviseurs de $12$, par paires : $1 \\times 12$, $2 \\times 6$, $3 \\times 4$. Ce sont $1$, $2$, $3$, $4$, $6$ et $12$.\nUn prédateur de cycle $2$ ans est là les années $2$, $4$, $6$… et $12$ est dans sa liste : il est là à chaque sortie de la cigale. C'est pareil pour tout cycle qui DIVISE $12$ : $2$, $3$, $4$ et $6$ ans. Seul le prédateur de $5$ ans la manque : $12 = 5 \\times 2 + 2$.\nb) $13$ : aucun essai ne tombe juste ($13 = 2 \\times 6 + 1$, $13 = 3 \\times 4 + 1$, $13 = 4 \\times 3 + 1$, $13 = 5 \\times 2 + 3$, $13 = 6 \\times 2 + 1$). Ses seuls diviseurs sont $1$ et $13$. De même, $17$ n'a pour diviseurs que $1$ et $17$. Aucun prédateur ne retrouve les vraies cigales à chaque sortie.\nc) La cigale sort les années $13$, $26$, $39$, $52$… Je teste chaque sortie dans la table de $4$ : $13 = 4 \\times 3 + 1$, $26 = 4 \\times 6 + 2$, $39 = 4 \\times 9 + 3$, $52 = 4 \\times 13$. La première rencontre a lieu au bout de $52$ ans, à la $4$e sortie.\n⛔ Le piège au c) : répondre $13$ ans. À la première sortie, $13 = 4 \\times 3 + 1$ : le prédateur est passé un an plus tôt.\nRéponse : a) $1$, $2$, $3$, $4$, $6$, $12$ : les prédateurs de $2$, $3$, $4$ et $6$ ans ; b) $1$ et $13$, $1$ et $17$ : aucun ; c) au bout de $52$ ans, à la $4$e sortie.",
          schema: frise(52, 13, 4, "cigale : une sortie tous les 13 ans", "prédateur : tous les 4 ans"),
          micros: ["div_probleme", "div_lister_diviseurs", "div_defi"],
        },
        {
          titre: "La chaîne du vélo",
          enonce:
            "Sur un vélo de route, la chaîne relie un plateau de $50$ dents à un pignon de $15$ dents : quand elle avance d'une dent sur le plateau, elle avance d'une dent sur le pignon. Au départ, on marque d'un point rouge la dent la plus haute de chaque roue.\na) Quand le plateau fait un tour complet ($50$ dents), combien de tours complets fait le pignon, et de combien de dents en plus ?\nb) Au bout de combien de dents les deux points rouges sont-ils pour la première fois en haut en même temps ? Combien de tours a fait chaque roue ?\nc) Même question avec un pignon de $25$ dents.",
          correction:
            "a) Je pose la division euclidienne de $50$ par $15$ : $15 \\times 3 = 45$ et $50 - 45 = 5$. Donc $50 = 15 \\times 3 + 5$, avec $5 < 15$ : le pignon fait $3$ tours complets et $5$ dents de plus. Son point rouge n'est pas revenu en haut.\nb) Le point du plateau est en haut toutes les $50$ dents : $50$, $100$, $150$… Celui du pignon toutes les $15$ dents : $15$, $30$, $45$, $60$, $75$, $90$, $105$, $120$, $135$, $150$…\nJ'avance dans la liste du plus grand, et je teste l'autre : $50$ et $100$ ne sont pas dans la table de $15$ ($100 = 15 \\times 6 + 10$), $150 = 15 \\times 10$ y est. Première fois : au bout de $150$ dents.\nLe plateau a fait $150 \\div 50 = 3$ tours, le pignon $150 \\div 15 = 10$ tours.\nc) $50 = 25 \\times 2$ : $25$ divise $50$. Dès que le plateau a fait $1$ tour ($50$ dents), le pignon en a fait exactement $2$ : les points sont ensemble en haut au bout de $50$ dents.\n⛔ Le piège au b) : multiplier $50 \\times 15 = 750$ dents. C'est un multiple commun, mais cinq fois trop loin : $750 = 150 \\times 5$.\nRéponse : a) $3$ tours et $5$ dents ; b) $150$ dents, $3$ tours de plateau et $10$ tours de pignon ; c) $50$ dents, $1$ tour de plateau et $2$ de pignon.",
          schema: pile(potence(50, 15, 3, 5), frise(150, 50, 15, "plateau : 50 dents", "pignon : 15 dents")),
          micros: ["div_euclidienne", "div_probleme", "div_multiple_diviseur"],
        },
        {
          titre: "Les panneaux solaires du gymnase",
          enonce:
            "Sur le toit d'un gymnase, on installe $96$ panneaux solaires, en rangées qui comptent toutes le même nombre de panneaux. Pour tenir sur le toit, une rangée doit compter entre $5$ et $15$ panneaux.\na) Lister les diviseurs de $96$.\nb) Quelles installations sont possibles ? Donner à chaque fois le nombre de rangées.\nc) Le projet passe à $106$ panneaux. Une installation en rangées égales est-elle encore possible ? Sinon, avec des rangées de $12$, combien de rangées complètes, et combien de panneaux sur la dernière ?",
          correction:
            "a) Par paires : $1 \\times 96$, $2 \\times 48$, $3 \\times 32$ ($9 + 6 = 15$), $4 \\times 24$, $6 \\times 16$, $8 \\times 12$. $5$ : non, $96$ finit par $6$. $7$ : non, $96 = 7 \\times 13 + 5$. $9$ : non, $15$ n'est pas dans la table de $9$. Je m'arrête : $10 \\times 10 = 100$ dépasse $96$.\nLes diviseurs de $96$ sont $1$, $2$, $3$, $4$, $6$, $8$, $12$, $16$, $24$, $32$, $48$ et $96$.\nb) Le nombre de panneaux par rangée doit diviser $96$ et être entre $5$ et $15$ : $6$, $8$ ou $12$.\nAvec $6$ panneaux par rangée : $96 \\div 6 = 16$ rangées. Avec $8$ : $12$ rangées. Avec $12$ : $8$ rangées.\nc) Diviseurs de $106$ : $1 \\times 106$, $2 \\times 53$, et aucun autre essai ne tombe juste ($106 = 3 \\times 35 + 1$, $106 = 4 \\times 26 + 2$, $106 = 5 \\times 21 + 1$, $106 = 6 \\times 17 + 4$, $106 = 7 \\times 15 + 1$, $106 = 8 \\times 13 + 2$, $106 = 9 \\times 11 + 7$, $106 = 10 \\times 10 + 6$). Aucun diviseur entre $5$ et $15$ : c'est impossible.\nAvec des rangées de $12$ : $106 = 12 \\times 8 + 10$. On obtient $8$ rangées complètes, et une dernière rangée de $10$ panneaux.\n⛔ Le piège au b) : confondre le nombre de rangées et le nombre de panneaux par rangée. « $6$ rangées de $16$ » ne convient pas : $16$ panneaux, c'est trop pour une rangée.\nRéponse : $16$ rangées de $6$, $12$ rangées de $8$ ou $8$ rangées de $12$ ; avec $106$ panneaux, c'est impossible, et des rangées de $12$ donnent $8$ rangées complètes et une de $10$.",
          schema: rectangles([[16, 6], [12, 8], [8, 12]], 6),
          micros: ["div_lister_diviseurs", "div_probleme", "div_euclidienne"],
        },
        {
          titre: "Le panier d'œufs d'Ibn al-Haytham",
          enonce:
            "Un problème attribué au savant Ibn al-Haytham, vers l'an 1000 : une marchande range ses œufs. Par $2$, par $3$, par $4$, par $5$ ou par $6$, il en reste toujours $1$. Par $7$, il n'en reste aucun. Elle a moins de $400$ œufs.\na) Si on enlève $1$ œuf, que peut-on dire du nombre restant ?\nb) Trouver le plus petit multiple commun de $2$, $3$, $4$, $5$ et $6$, puis tous ses multiples jusqu'à $400$.\nc) Combien la marchande a-t-elle d'œufs ?",
          correction:
            "a) Avec $1$ œuf de moins, les rangements par $2$, $3$, $4$, $5$ et $6$ tombent juste : le nombre restant est un multiple commun de $2$, $3$, $4$, $5$ et $6$.\nb) Un multiple de $2$ et de $5$ finit par $0$. J'avance dans la table de $6$ en ne gardant que ceux qui finissent par $0$ : $30$, puis $60$. $30 = 4 \\times 7 + 2$ ne convient pas ; $60 = 4 \\times 15$ convient, et $60 = 3 \\times 20$. Le plus petit multiple commun est $60$.\nSes multiples jusqu'à $400$ : $60$, $120$, $180$, $240$, $300$, $360$.\nc) Le nombre d'œufs vaut $1$ de plus : $61$, $121$, $181$, $241$, $301$ ou $361$. Je teste chacun par $7$ :\n$61 = 7 \\times 8 + 5$ ; $121 = 7 \\times 17 + 2$ ; $181 = 7 \\times 25 + 6$ ; $241 = 7 \\times 34 + 3$ ; $301 = 7 \\times 43 + 0$ ; $361 = 7 \\times 51 + 4$.\nSeul $301$ tombe juste.\n⭐ Contrôle : $301 = 60 \\times 5 + 1$, et $301 = 7 \\times 43$.\n⛔ Le piège au b) : multiplier $2 \\times 3 \\times 4 \\times 5 \\times 6 = 720$, puis conclure qu'aucun nombre ne convient sous $400$. $720$ est un multiple commun, mais pas le plus petit.\nRéponse : la marchande a $301$ œufs.",
          schema: pile(
            grille(
              ["œufs", "division par 7", "reste"],
              [["61", "7 × 8 + 5", "5"], ["121", "7 × 17 + 2", "2"], ["181", "7 × 25 + 6", "6"], ["241", "7 × 34 + 3", "3"], ["301", "7 × 43 + 0", "0"], ["361", "7 × 51 + 4", "4"]],
              [4],
            ),
            potence(301, 7, 43, 0),
          ),
          micros: ["div_defi", "div_euclidienne", "div_probleme", "div_multiple_diviseur"],
        },
      ],
    },
  ],
};
