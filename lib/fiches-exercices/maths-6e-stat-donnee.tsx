// ─── Fiche d'exercices : lire et interpréter des données (6e) — 20 exercices ────
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` et de la feuille voisine
// `maths-5e-stat-statistique.tsx` (aides de dessin reprises, mesurées à 375 px).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-donnees.tsx` (« Lire et
// interpréter des données ») et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/donnees.bank.ts`, notionId stat_donnee :
// lire un graphique, lire un diagramme circulaire, prélever une information,
// comparer, interpréter, défis (totaux, ce qui manque, ce qui n'est pas).
// ⛔ LIMITES DE LA 6e, lues dans la banque : ni moyenne ni médiane (la banque
// ne cite la moyenne que comme mauvaise réponse), ni fréquence ni pourcentage.
// Le diagramme circulaire se lit par la moitié, le quart, le tiers d'un total
// DONNÉ. Une « fraction de la classe » se dit « un sur huit », « la moitié ».
// ⛔ La lecture d'un tableau simple est la micro `stat_donnee_lire_tableau`,
// rangée dans la notion stat_enquete : ici, on PRÉLÈVE dans un tableau à double
// entrée (micro stat_donnee_prelever).
// ⛔ Aucun exemple de la fiche de cours de 6e (chien 10 / chat 6 / oiseau 4,
// football 5-9 / natation 6-7 / danse 8-3, sport 16 / lecture 9 / jeux 12,
// pomme 7 / banane 15 / kiwi 4, bus 10 / à pied 5 / voiture 5, équipes 12 et
// 11, livres 5 / 9 / 6, 8 à pied / 12 en bus / 5 en voiture), ni de la feuille
// de 5e (trajets, refuge, oiseaux du jardin, clubs, voitures, voile, tournesol…).
// ⭐ Phrases courtes (Frédéric, 30/09) : des 6e qui lisent parfois mal. Une
// idée par phrase, 12 mots en moyenne.
//
// Les pièges nommés : lire la graduation voisine (1), lire un secteur sans le
// total (2, 10, 16), la ligne pour la colonne (3, 11), soustraire à l'envers
// (4), « deux fois plus » à l'œil (5, 15), une étiquette prise pour la valeur
// (6), oublier une catégorie dans le total (7, 8), le plus grand prendre pour
// le seul (9), « plus de la moitié » pour « la moitié » (13), la plus forte
// hausse confondue avec le point le plus haut (14), comparer des hauteurs sans
// lire les nombres (12), conclure pour tout le monde (5, 13, 18), comparer un
// jour à cinq jours (17), un écart confondu avec une valeur (19), oublier de
// partir du début (20).
//
// Aucun fait réel : les hérissons, les arbres du parc, les livres du CDI, les
// sacs de déchets, le sondage des sports, les températures, la poubelle, le
// goûter, les buts, la sortie scolaire, la sortie nature, les vélos vendus, les
// heures de coucher, les nids de faucons, l'eau d'une famille, les médailles,
// le compteur de vélos, les desserts, les deux villes et le gaspillage sont des
// MODÈLES, à des ordres de grandeur vraisemblables. Seule idée générale : la mer
// adoucit les écarts de température au fil de l'année (ex. 19).
//
// ⭐ LES DESSINS : cinq aides locales, en SVG ou en HTML, sans largeur
// minimale (⛔ `diagramme()` de figures.tsx en a une : il défile à 375 px) —
// `barres` (viewBox 300, police 14, graduations en option), `camembert`
// (légende en dessous, valeurs dans les secteurs en option), `pointsRelies`
// (reprise de la 5e), `grille` (tableau HTML de trois colonnes au plus, reprise
// de la 5e), et `tableau` de figures.tsx. 14 dessins imprimés ; les schémas qui
// redisent le corrigé sont `ecranSeulement`, leurs données sont alors dans
// l'énoncé.
//
// Les corrigés sont écrits à la première personne (« je lis »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-stat-donnee.mjs` —
// chaque valeur relue dans le dessin ou l'énoncé, chaque total, écart, moitié,
// quart et tiers refait.
//
// Micro-compétences : stat_donnee_lire_graphique (1, 6, 12, 14, 17, 20),
// stat_donnee_lire_circulaire (2, 7, 10, 16, 18), stat_donnee_prelever (3, 7,
// 11, 15, 19), stat_donnee_comparer (4, 9, 11, 12, 14, 16, 17, 19, 20),
// stat_donnee_interpreter (5, 12, 13, 15, 18, 19, 20), stat_donnee_defi (8, 9,
// 10, 13, 16, 17, 18, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** 18.5 → « 18,5 » : le texte NU d'un dessin (SVG, pas de KaTeX). */
const fr = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",").replace("-", "−");

type Barre = { label: string; value: number };

/**
 * Un diagramme en BARRES, en SVG local : viewBox 300, police 14 (≈ 11 px dans
 * une correction de 235 px), aucune largeur minimale. Sans `pas`, la valeur est
 * écrite au-dessus de chaque barre ; avec `pas`, l'axe est gradué (six
 * intervalles au plus : 20 d'écart entre deux nombres) et on LIT la hauteur.
 * `surligne` : une barre en orange. ⛔ Libellés courts : le script vérifie
 * qu'ils tiennent dans leur colonne. ⭐ Le script relit `{ label, value }`.
 */
const barres = (data: Barre[], opts: { pas?: number; surligne?: number } = {}) => {
  const W = 300;
  const G = opts.pas ? 44 : 16;
  const D = 10;
  const HAUT = 28;
  const BAS = 150;
  const max = Math.max(1, ...data.map((d) => d.value));
  const vmax = opts.pas ? Math.ceil(max / opts.pas) * opts.pas : max;
  const y = (v: number) => BAS - (v / vmax) * (BAS - HAUT);
  const slot = (W - G - D) / data.length;
  const bw = Math.min(40, slot * 0.6);
  const H = BAS + 30;
  const graduations = opts.pas ? Array.from({ length: vmax / opts.pas + 1 }, (_, k) => k * (opts.pas ?? 1)) : [];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres">
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        {graduations.map((g) => (
          <g key={g}>
            <line x1={G - 4} y1={y(g)} x2={W - D} y2={y(g)} stroke="#e2e8f0" strokeWidth="1" />
            <text x={G - 8} y={y(g) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill="#334155">
              {fr(g)}
            </text>
          </g>
        ))}
        <line x1={G - 4} y1={HAUT - 14} x2={G - 4} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G - 4} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          const actif = opts.surligne === i;
          return (
            <g key={i}>
              <rect x={x} y={y(d.value)} width={bw} height={BAS - y(d.value)} rx="3" fill={actif ? "#fed7aa" : "#bfdbfe"} stroke={actif ? ORANGE : BLEU} strokeWidth={actif ? 2.5 : 1.5} />
              {opts.pas ? null : (
                <text x={x + bw / 2} y={y(d.value) - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                  {fr(d.value)}
                </text>
              )}
              <text x={x + bw / 2} y={BAS + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const TEINTES = ["#93c5fd", "#fdba74", "#86efac", "#fde68a", "#c4b5fd", "#fca5a5"];

/**
 * Un DIAGRAMME CIRCULAIRE, en SVG local : le disque (viewBox 300), les secteurs
 * dans l'ordre des aiguilles d'une montre à partir du haut, et une LÉGENDE en
 * dessous, sur deux colonnes (20 d'écart vertical) : les noms ne se chevauchent
 * jamais. `valeurs` : le nombre écrit dans chaque secteur. ⛔ Noms de 12 signes
 * au plus ; deux petits secteurs jamais voisins (le script le vérifie).
 * ⭐ Le script relit `{ label, value }`.
 */
const camembert = (data: Barre[], valeurs = true) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const [cx, cy, r] = [150, 94, 84];
  const pt = (a: number, rr: number) => [cx + rr * Math.cos((a * Math.PI) / 180), cy + rr * Math.sin((a * Math.PI) / 180)];
  let a0 = -90;
  const parts = data.map((d, i) => {
    const da = (d.value / total) * 360;
    const [a, b] = [a0, a0 + da];
    a0 = b;
    const [x1, y1] = pt(a, r);
    const [x2, y2] = pt(b, r);
    const [lx, ly] = pt((a + b) / 2, r * 0.6);
    return {
      d: `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${da > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      lx,
      ly,
      couleur: TEINTES[i % TEINTES.length],
    };
  });
  const H = 196 + Math.ceil(data.length / 2) * 20;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme circulaire">
        <rect x="0" y="0" width="300" height={H} rx="10" fill="#fff" />
        {parts.map((p, i) => (
          <path key={i} d={p.d} fill={p.couleur} stroke="#ffffff" strokeWidth={2} />
        ))}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f172a" strokeWidth={1.5} />
        {valeurs
          ? parts.map((p, i) => (
              <text key={`v${i}`} x={p.lx} y={p.ly + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a" stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
                {fr(data[i].value)}
              </text>
            ))
          : null}
        {data.map((d, i) => {
          const x = i % 2 === 0 ? 24 : 162;
          const yy = 204 + Math.floor(i / 2) * 20;
          return (
            <g key={`l${i}`}>
              <rect x={x} y={yy - 12} width="14" height="14" rx="3" fill={parts[i].couleur} stroke="#0f172a" strokeWidth="1" />
              <text x={x + 20} y={yy} fontSize="14" fontWeight="700" fill="#334155">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Des POINTS RELIÉS (reprise de la feuille de 5e), viewBox 300 × 204, police
 * 14 : une colonne par étiquette, l'axe vertical gradué tous les `pas` depuis
 * 0, la valeur écrite au-dessus de chaque point. Tout le texte reste dans le
 * cadre. ⭐ Le script relit etiquettes, valeurs, pas.
 */
const pointsRelies = (etiquettes: string[], valeurs: number[], pas: number) => {
  const [G, D, HAUT, BAS] = [44, 14, 26, 168];
  const W = 300;
  const vmax = Math.ceil(Math.max(...valeurs) / pas) * pas;
  const y = (v: number) => BAS - (v / vmax) * (BAS - HAUT);
  const slot = (W - G - D) / etiquettes.length;
  const x = (i: number) => G + slot * (i + 0.5);
  const graduations = Array.from({ length: vmax / pas + 1 }, (_, k) => k * pas);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 204`} className="block h-auto w-full" role="img" aria-label="Points reliés">
        <rect x="0" y="0" width={W} height="204" rx="10" fill="#fff" />
        {graduations.map((g) => (
          <g key={g}>
            <line x1={G} y1={y(g)} x2={W - D} y2={y(g)} stroke="#e2e8f0" strokeWidth="1" />
            <text x={G - 6} y={y(g) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill="#334155">
              {fr(g)}
            </text>
          </g>
        ))}
        <line x1={G} y1={HAUT - 12} x2={G} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <polyline points={valeurs.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")} fill="none" stroke={BLEU} strokeWidth="2.5" strokeLinejoin="round" />
        {valeurs.map((v, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r="4.5" fill={ROUGE} />
            <text x={x(i)} y={y(v) - 9} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
              {fr(v)}
            </text>
            <text x={x(i)} y={BAS + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
              {etiquettes[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Un tableau HTML de plusieurs lignes (reprise de la 5e) : TROIS colonnes au
 * plus, textes courts — il tient dans 235 px sans défiler. La dernière ligne
 * en gras si `total`. ⛔ Texte NU dans les cases.
 */
const grille = (entetes: string[], lignes: string[][], total = false) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[14rem]">
    <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
      <thead>
        <tr>
          {entetes.map((e, i) => (
            <th key={i} className="border border-slate-300 bg-slate-100 px-1.5 py-1 font-bold text-slate-700">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i} className={total && i === lignes.length - 1 ? "bg-slate-50 font-bold" : ""}>
            {l.map((c, j) => (
              <td key={j} className="border border-slate-300 px-1.5 py-0.5 text-slate-800">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Un dessin nommé (titre au-dessus), pour mettre deux diagrammes côte à côte. */
const nomme = (nom: string, dessin: ReactNode) => (
  <div className="min-w-0">
    <p className="mb-1 text-center text-sm font-black text-slate-700">{nom}</p>
    {dessin}
  </div>
);

export const exercicesStatDonnee6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "stat-donnee",
  titre: "Lire et interpréter des données",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire un diagramme en barres, un graphique, un diagramme circulaire. Prendre une valeur dans un tableau à double entrée. Comparer, calculer un total ou un écart. Dire si une phrase est vraie, fausse ou exagérée. Des hérissons, un parc, une poubelle, des vélos, des médailles, des faucons, la cantine, la météo. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/stat-donnee", titre: "Lire et interpréter des données" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je lis le titre, puis je cherche la bonne valeur.",
      rappel: [
        "Je lis d'abord le titre : il dit ce que comptent les nombres.",
        "Diagramme en barres : la hauteur de la barre donne la valeur.",
        "Diagramme circulaire : le disque entier, c'est le total. La moitié du disque, c'est la moitié du total.",
        "Le total, c'est la somme de toutes les valeurs.",
      ],
      exercices: [
        {
          enonce:
            "Un centre de soins accueille des hérissons blessés. Le diagramme donne le nombre de hérissons reçus chaque mois.\na) Combien de hérissons en avril ?\nb) Quel mois en a reçu le plus ?\nc) Quel mois en a reçu le moins ?\nd) Combien de hérissons en tout, sur les quatre mois ?",
          figure: barres([
            { label: "mars", value: 4 },
            { label: "avril", value: 10 },
            { label: "mai", value: 12 },
            { label: "juin", value: 6 },
          ], { pas: 2 }),
          correction:
            "a) Je pose le doigt en haut de la barre d'avril.\nJe suis la ligne jusqu'à l'axe : je lis $10$.\nb) La barre la plus haute est celle de mai : $12$ hérissons.\nc) La barre la plus basse est celle de mars : $4$ hérissons.\nd) J'additionne les quatre barres : $4 + 10 + 12 + 6 = 32$.\n⛔ Le piège : lire la graduation d'à côté. Je suis bien la ligne grise, sans monter ni descendre.\nRéponse : a) $10$ ; b) mai ; c) mars ; d) $32$ hérissons.",
          micros: ["stat_donnee_lire_graphique"],
        },
        {
          enonce:
            "Un parc compte $40$ arbres. Le diagramme circulaire montre les espèces.\na) Quelle espèce occupe la moitié du disque ? Combien d'arbres ?\nb) Les érables occupent un quart du disque. Combien d'érables ?\nc) Les pins et les tilleuls ont des secteurs de même taille. Combien de pins ?",
          figure: camembert([
            { label: "chênes", value: 20 },
            { label: "pins", value: 5 },
            { label: "érables", value: 10 },
            { label: "tilleuls", value: 5 },
          ], false),
          correction:
            "Le disque entier, c'est les $40$ arbres.\na) Le secteur des chênes fait la moitié du disque.\nLa moitié de $40$ : $40 \\div 2 = 20$ chênes.\nb) Un quart de $40$ : $40 \\div 4 = 10$ érables.\nc) Il reste $40 - 20 - 10 = 10$ arbres.\nPins et tilleuls se partagent ces $10$ arbres en deux parts égales : $10 \\div 2 = 5$ pins.\n⛔ Le piège : chercher un nombre sur le disque. Il n'y en a pas : je pars du total, $40$.\nRéponse : a) les chênes, $20$ ; b) $10$ érables ; c) $5$ pins.",
          schema: ecranSeulement(
            camembert([
              { label: "chênes", value: 20 },
              { label: "pins", value: 5 },
              { label: "érables", value: 10 },
              { label: "tilleuls", value: 5 },
            ]),
          ),
          micros: ["stat_donnee_lire_circulaire"],
        },
        {
          enonce:
            "Ce tableau donne les livres empruntés au CDI par deux classes, en septembre.\na) Combien de BD la 6e B a-t-elle empruntées ?\nb) Combien de romans la 6e A a-t-elle empruntés ?\nc) Quel nombre est dans la ligne « albums », colonne « 6e A » ?\nd) Quelle case contient le nombre $9$ ?",
          figure: grille(["livres", "6e A", "6e B"], [
            ["romans", "14", "9"],
            ["BD", "21", "25"],
            ["albums", "6", "11"],
          ]),
          correction:
            "Chaque case est au croisement d'une ligne et d'une colonne.\na) Ligne « BD », colonne « 6e B » : je lis $25$.\nb) Ligne « romans », colonne « 6e A » : je lis $14$.\nc) Ligne « albums », colonne « 6e A » : je lis $6$.\nd) Le $9$ est sur la ligne « romans », dans la colonne « 6e B ».\nC'est le nombre de romans empruntés par la 6e B.\n⛔ Le piège : prendre la bonne ligne, mais la mauvaise colonne. Je glisse mon doigt sur la ligne, puis je descends la colonne.\nRéponse : a) $25$ ; b) $14$ ; c) $6$ ; d) les romans de la 6e B.",
          micros: ["stat_donnee_prelever"],
        },
        {
          enonce:
            "Quatre classes ont ramassé des déchets dans la nature. La 6e A a rempli $12$ sacs. La 6e B, $17$ sacs. La 6e C, $9$ sacs. La 6e D, $14$ sacs.\na) Quelle classe a rempli le plus de sacs ?\nb) Combien de sacs de plus pour la 6e B que pour la 6e C ?\nc) Range les classes, de celle qui a le plus de sacs à celle qui en a le moins.\nd) Combien de sacs manquait-il à la 6e C pour égaler la 6e D ?",
          correction:
            "a) Le plus grand nombre est $17$ : c'est la 6e B.\nb) Je fais la différence, le grand moins le petit : $17 - 9 = 8$ sacs.\nc) Je range les nombres : $17$, puis $14$, puis $12$, puis $9$.\nL'ordre est : 6e B, 6e D, 6e A, 6e C.\nd) $14 - 9 = 5$ sacs.\n⛔ Le piège : écrire $9 - 17$. Pour un écart, j'enlève toujours le petit nombre du grand.\nRéponse : a) la 6e B ; b) $8$ sacs ; c) B, D, A, C ; d) $5$ sacs.",
          schema: ecranSeulement(
            barres([
              { label: "6e A", value: 12 },
              { label: "6e B", value: 17 },
              { label: "6e C", value: 9 },
              { label: "6e D", value: 14 },
            ], { surligne: 1 }),
          ),
          micros: ["stat_donnee_comparer"],
        },
        {
          enonce:
            "On a demandé leur sport préféré à $30$ élèves. Hand : $9$. Foot : $12$. Tennis : $6$. Judo : $3$.\nPour chaque phrase, dis si elle est vraie ou fausse. Explique avec les nombres.\na) « Le foot est le sport le plus choisi. »\nb) « Le hand est choisi deux fois plus que le tennis. »\nc) « La moitié des élèves préfère le foot. »\nd) « Le tennis est choisi deux fois plus que le judo. »",
          correction:
            "a) Vrai : $12$ est le plus grand nombre.\nb) Deux fois le tennis : $2 \\times 6 = 12$.\nLe hand a $9$ élèves, pas $12$ : c'est faux.\nc) La moitié de $30$ : $30 \\div 2 = 15$.\nLe foot a $12$ élèves, moins que $15$ : c'est faux.\nd) Deux fois le judo : $2 \\times 3 = 6$. C'est le tennis : vrai.\n⛔ Le piège : juger « deux fois plus » à l'œil. Je fais toujours le calcul.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai.",
          schema: ecranSeulement(
            barres([
              { label: "hand", value: 9 },
              { label: "foot", value: 12 },
              { label: "tennis", value: 6 },
              { label: "judo", value: 3 },
            ]),
          ),
          micros: ["stat_donnee_interpreter"],
        },
        {
          enonce:
            "Un jour de printemps, une station météo relève la température toutes les deux heures (en °C).\na) Quelle température à $12$ h ?\nb) À quelle heure fait-il le plus chaud ?\nc) De combien la température monte-t-elle entre $8$ h et $14$ h ?\nd) Entre $14$ h et $16$ h, la température monte-t-elle ou baisse-t-elle ?",
          figure: pointsRelies(["8 h", "10 h", "12 h", "14 h", "16 h"], [12, 15, 19, 21, 18], 5),
          correction:
            "En bas, je lis l'heure. Au-dessus du point, je lis la température.\na) Au-dessus de « 12 h », le point porte $19$ : il fait $19$ °C.\nb) Le point le plus haut est à $14$ h : $21$ °C.\nc) À $8$ h, $12$ °C. À $14$ h, $21$ °C.\n$21 - 12 = 9$ : elle monte de $9$ °C.\nd) La ligne descend : de $21$ °C à $18$ °C, elle baisse de $3$ °C.\n⛔ Le piège : lire l'heure à la place de la température. « 12 h » est l'heure, pas la réponse.\nRéponse : a) $19$ °C ; b) à $14$ h ; c) $9$ °C ; d) elle baisse.",
          micros: ["stat_donnee_lire_graphique"],
        },
        {
          enonce:
            "Une famille pèse ses déchets pendant une semaine (en kg). Voici le diagramme circulaire.\na) Combien de kg de verre ?\nb) Quel déchet pèse le plus lourd ?\nc) Combien pèsent tous les déchets de la semaine ?\nd) Quel déchet fait exactement le quart du total ?",
          figure: camembert([
            { label: "épluchures", value: 6 },
            { label: "papier", value: 3 },
            { label: "emballages", value: 4 },
            { label: "verre", value: 2 },
            { label: "autres", value: 5 },
          ]),
          correction:
            "a) Je cherche la couleur du verre dans la légende. Son secteur porte $2$ : $2$ kg.\nb) Le plus grand secteur porte $6$ : ce sont les épluchures.\nc) J'additionne tous les secteurs : $6 + 3 + 4 + 2 + 5 = 20$ kg.\nd) Le quart de $20$ : $20 \\div 4 = 5$.\nLe secteur qui porte $5$, ce sont les « autres ».\n⛔ Le piège : oublier un secteur dans le total. Je coche chaque secteur quand je l'ajoute.\nRéponse : a) $2$ kg ; b) les épluchures ; c) $20$ kg ; d) les autres.",
          micros: ["stat_donnee_lire_circulaire", "stat_donnee_prelever"],
        },
        {
          enonce:
            "Au goûter, $28$ élèves choisissent un fruit. $11$ prennent une pomme. $4$ prennent une banane. $8$ prennent une poire. Les autres prennent une orange.\na) Combien d'élèves prennent une orange ?\nb) Combien d'élèves ne prennent pas de pomme ?",
          correction:
            "a) J'additionne les fruits connus : $11 + 4 + 8 = 23$.\nIl y a $28$ élèves en tout : $28 - 23 = 5$ oranges.\nContrôle : $11 + 4 + 8 + 5 = 28$. Le compte est bon.\nb) Tous les élèves, moins ceux qui prennent une pomme : $28 - 11 = 17$.\n⛔ Le piège au b) : répondre seulement les poires. « Pas de pomme », c'est banane, poire OU orange : $4 + 8 + 5 = 17$.\nRéponse : a) $5$ élèves ; b) $17$ élèves.",
          schema: ecranSeulement(tableau(["fruit", "pomme", "banane", "poire", "orange"], ["élèves", 11, 4, 8, 5], true)),
          micros: ["stat_donnee_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur les mêmes données. Je lis, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Un écart : le grand nombre moins le petit.",
        "« Deux fois plus » : je multiplie par 2, puis je compare.",
        "Une phrase est vraie seulement si les nombres la prouvent.",
      ],
      exercices: [
        {
          enonce:
            "Une équipe de hand a joué cinq matchs. Elle a marqué $24$, $31$, $19$, $27$ et $31$ buts.\na) Dans quel match a-t-elle marqué le moins ?\nb) Dans quels matchs a-t-elle marqué le plus ?\nc) Quel est l'écart entre son meilleur et son moins bon match ?\nd) Combien de buts en tout ?",
          correction:
            "Je numérote les matchs de $1$ à $5$, dans l'ordre.\na) Le plus petit nombre est $19$ : c'est le match $3$.\nb) Le plus grand nombre est $31$. Il apparaît deux fois : matchs $2$ et $5$.\nc) $31 - 19 = 12$ buts d'écart.\nd) $24 + 31 + 19 + 27 + 31 = 132$ buts.\n⛔ Le piège au b) : s'arrêter au premier $31$. Je relis toute la liste.\nRéponse : a) le match $3$ ; b) les matchs $2$ et $5$ ; c) $12$ buts ; d) $132$ buts.",
          schema: ecranSeulement(
            barres([
              { label: "M1", value: 24 },
              { label: "M2", value: 31 },
              { label: "M3", value: 19 },
              { label: "M4", value: 27 },
              { label: "M5", value: 31 },
            ], { surligne: 2 }),
          ),
          micros: ["stat_donnee_comparer", "stat_donnee_defi"],
        },
        {
          enonce:
            "Une classe prépare une sortie. Le budget total est de $600$ €. Les entrées du musée coûtent $100$ €.\na) Quelle dépense occupe la moitié du disque ? Combien coûte-t-elle ?\nb) Le repas occupe un quart du disque. Combien coûte-t-il ?\nc) Combien coûte le goûter ?\nd) Le goûter est-il la plus petite dépense ?",
          figure: camembert([
            { label: "car", value: 300 },
            { label: "entrées", value: 100 },
            { label: "repas", value: 150 },
            { label: "goûter", value: 50 },
          ], false),
          correction:
            "Le disque entier, c'est les $600$ €.\na) Le car occupe la moitié : $600 \\div 2 = 300$ €.\nb) Un quart de $600$ : $600 \\div 4 = 150$ €.\nc) J'enlève tout ce que je connais : $600 - 300 - 150 - 100 = 50$ €.\nd) Oui : $50$ € est plus petit que $100$, $150$ et $300$. Son secteur est le plus fin.\n⛔ Le piège : lire un secteur sans le total. « Un quart » ne donne un prix que si je connais les $600$ €.\nRéponse : a) le car, $300$ € ; b) $150$ € ; c) $50$ € ; d) oui.",
          schema: ecranSeulement(
            camembert([
              { label: "car", value: 300 },
              { label: "entrées", value: 100 },
              { label: "repas", value: 150 },
              { label: "goûter", value: 50 },
            ]),
          ),
          micros: ["stat_donnee_lire_circulaire", "stat_donnee_defi"],
        },
        {
          enonce:
            "Lors de deux sorties nature, une classe a compté les animaux vus.\na) Combien de papillons le soir ?\nb) Combien d'écureuils en tout ?\nc) Quel moment a vu le plus d'animaux ? Combien de plus ?\nd) Quel animal a été vu plus souvent le soir que le matin ?",
          figure: grille(["animal", "matin", "soir"], [
            ["oiseaux", "23", "15"],
            ["papillons", "12", "4"],
            ["écureuils", "2", "5"],
          ]),
          correction:
            "a) Ligne « papillons », colonne « soir » : $4$.\nb) Ligne « écureuils » : $2 + 5 = 7$ écureuils.\nc) J'additionne chaque colonne.\nMatin : $23 + 12 + 2 = 37$ animaux. Soir : $15 + 4 + 5 = 24$ animaux.\nLe matin gagne : $37 - 24 = 13$ animaux de plus.\nd) Je compare les deux cases de chaque ligne. Seuls les écureuils : $5$ le soir, $2$ le matin.\n⛔ Le piège au b) : lire une seule case. « En tout » veut dire : toute la ligne.\nRéponse : a) $4$ ; b) $7$ ; c) le matin, $13$ de plus ; d) les écureuils.",
          micros: ["stat_donnee_prelever", "stat_donnee_comparer"],
        },
        {
          enonce:
            "Deux magasins vendent des vélos. Voici leurs ventes de janvier à mars.\na) Les deux diagrammes se ressemblent. Les deux magasins vendent-ils autant ?\nb) En février, combien de vélos le magasin B a-t-il vendus de plus que le A ?\nc) Combien de vélos chaque magasin a-t-il vendus en trois mois ?\nd) Pourquoi les barres ont-elles la même forme ?",
          figure: (
            <div className="grid grid-cols-1 min-w-0 gap-3 sm:grid-cols-2 print:grid-cols-2">
              {nomme("Magasin A", barres([
                { label: "janv.", value: 10 },
                { label: "févr.", value: 20 },
                { label: "mars", value: 15 },
              ]))}
              {nomme("Magasin B", barres([
                { label: "janv.", value: 30 },
                { label: "févr.", value: 60 },
                { label: "mars", value: 45 },
              ]))}
            </div>
          ),
          correction:
            "a) Non. Je lis les nombres, pas la forme.\nEn janvier, A vend $10$ vélos et B en vend $30$.\nb) $60 - 20 = 40$ vélos de plus.\nc) A : $10 + 20 + 15 = 45$ vélos. B : $30 + 60 + 45 = 135$ vélos.\nd) Chaque diagramme a sa propre échelle.\nChaque mois, B vend $3$ fois plus que A : $3 \\times 10 = 30$, $3 \\times 20 = 60$, $3 \\times 15 = 45$.\nAlors les barres ont les mêmes hauteurs, mais pas les mêmes nombres.\n⛔ Le piège : comparer des hauteurs de barres sur deux dessins différents. Je compare les NOMBRES écrits.\nRéponse : a) non ; b) $40$ ; c) A : $45$, B : $135$ ; d) les échelles sont différentes.",
          micros: ["stat_donnee_comparer", "stat_donnee_interpreter", "stat_donnee_lire_graphique"],
        },
        {
          enonce:
            "On a demandé à $24$ élèves l'heure de leur coucher, un soir d'école. À $20$ h $30$ : $3$ élèves. À $21$ h : $9$. À $21$ h $30$ : $8$. À $22$ h : $4$.\nVrai ou faux ? Explique.\na) « $21$ h est l'heure la plus citée. »\nb) « Plus de la moitié des élèves se couche après $21$ h. »\nc) « Un élève sur huit se couche à $20$ h $30$. »\nd) « Tous les élèves de 6e de France se couchent vers $21$ h. »",
          correction:
            "a) Vrai : $9$ est le plus grand nombre.\nb) Après $21$ h : à $21$ h $30$ ou à $22$ h. Cela fait $8 + 4 = 12$ élèves.\nLa moitié de $24$ : $24 \\div 2 = 12$.\n$12$ élèves, c'est la moitié tout juste, pas plus : faux.\nc) Un sur huit : $24 \\div 8 = 3$. Il y a bien $3$ élèves à $20$ h $30$ : vrai.\nd) Faux : on a interrogé $24$ élèves, pas toute la France.\n⛔ Le piège au b) : « plus de la moitié » veut dire plus que $12$. Égal à $12$ ne suffit pas.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          schema: ecranSeulement(
            barres([
              { label: "20h30", value: 3 },
              { label: "21h", value: 9 },
              { label: "21h30", value: 8 },
              { label: "22h", value: 4 },
            ]),
          ),
          micros: ["stat_donnee_interpreter", "stat_donnee_defi"],
        },
        {
          enonce:
            "Des naturalistes comptent chaque année les nids de faucons dans une région.\na) Combien de nids en $2022$ ?\nb) Quelle année le nombre de nids a-t-il baissé ?\nc) Combien de nids de plus en $2024$ qu'en $2020$ ?\nd) Entre quelles années la hausse est-elle la plus forte ?",
          figure: pointsRelies(["2020", "2021", "2022", "2023", "2024"], [6, 9, 15, 13, 17], 5),
          correction:
            "a) Au-dessus de $2022$, je lis $15$ nids.\nb) La ligne descend une seule fois : de $15$ en $2022$ à $13$ en $2023$.\nc) $17 - 6 = 11$ nids de plus.\nd) Je calcule chaque hausse, d'une année à l'autre.\nDe $2020$ à $2021$ : $9 - 6 = 3$. De $2021$ à $2022$ : $15 - 9 = 6$.\nDe $2023$ à $2024$ : $17 - 13 = 4$.\nLa plus forte hausse est $6$ : de $2021$ à $2022$. C'est là que la ligne monte le plus raide.\n⛔ Le piège au d) : répondre $2024$, le point le plus haut. La plus forte HAUSSE, c'est la montée la plus raide.\nRéponse : a) $15$ ; b) en $2023$ ; c) $11$ ; d) de $2021$ à $2022$.",
          micros: ["stat_donnee_lire_graphique", "stat_donnee_comparer"],
        },
        {
          enonce:
            "Une famille note l'eau utilisée en un jour (en litres). Douche : $80$ L. WC : $40$ L. Linge : $30$ L. Cuisine : $30$ L.\na) Quel usage consomme le plus ?\nb) Combien de litres en tout dans la journée ?\nc) Vrai ou faux : « La douche consomme deux fois plus que les WC. »\nd) Vrai ou faux : « La douche consomme plus que tout le reste réuni. »",
          correction:
            "a) Le plus grand nombre est $80$ : c'est la douche.\nb) $80 + 40 + 30 + 30 = 180$ litres.\nc) Deux fois les WC : $2 \\times 40 = 80$. C'est la douche : vrai.\nd) Tout le reste : $40 + 30 + 30 = 100$ litres.\n$80$ est plus petit que $100$ : faux.\n⛔ Le piège au d) : comparer la douche à un seul usage. « Tout le reste », ce sont les trois autres réunis.\nRéponse : a) la douche ; b) $180$ L ; c) vrai ; d) faux.",
          schema: ecranSeulement(
            barres([
              { label: "douche", value: 80 },
              { label: "WC", value: 40 },
              { label: "linge", value: 30 },
              { label: "cuisine", value: 30 },
            ]),
          ),
          micros: ["stat_donnee_prelever", "stat_donnee_interpreter"],
        },
        {
          enonce:
            "Un club d'athlétisme a gagné $24$ médailles cette saison. $4$ sont en or.\na) Quelle couleur occupe la moitié du disque ? Combien de médailles ?\nb) Combien de médailles d'argent ?\nc) L'argent occupe-t-il le tiers du disque ?\nd) Combien de fois plus de bronze que d'or ?",
          figure: camembert([
            { label: "or", value: 4 },
            { label: "argent", value: 8 },
            { label: "bronze", value: 12 },
          ], false),
          correction:
            "Le disque entier, c'est les $24$ médailles.\na) Le bronze occupe la moitié : $24 \\div 2 = 12$ médailles.\nb) J'enlève le bronze et l'or : $24 - 12 - 4 = 8$ médailles d'argent.\nc) Le tiers de $24$ : $24 \\div 3 = 8$. Oui, l'argent en occupe le tiers.\nd) $3 \\times 4 = 12$ : il y a $3$ fois plus de bronze que d'or.\n⛔ Le piège : chercher les nombres sur le dessin. Ils ne sont pas écrits : je pars du total, $24$.\nRéponse : a) le bronze, $12$ ; b) $8$ ; c) oui ; d) $3$ fois plus.",
          schema: ecranSeulement(
            camembert([
              { label: "or", value: 4 },
              { label: "argent", value: 8 },
              { label: "bronze", value: 12 },
            ]),
          ),
          micros: ["stat_donnee_lire_circulaire", "stat_donnee_defi", "stat_donnee_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des données du monde réel. Je lis, je calcule, puis je réponds par une phrase qui cite les nombres.",
      rappel: [
        "Je lis le titre et chaque question en entier.",
        "Pour dire « vrai », je montre le calcul qui le prouve.",
        "Une petite enquête ne dit rien sur tout le pays.",
      ],
      exercices: [
        {
          titre: "Le compteur de vélos",
          enonce:
            "Une ville a installé un compteur sur une piste cyclable. Voici les vélos comptés pendant une semaine.\na) Quel jour passe-t-il le plus de vélos ?\nb) Combien de vélos de plus le dimanche que le mercredi ?\nc) Combien de vélos pendant le week-end ?\nd) Vrai ou faux : « Il passe plus de vélos le week-end que du lundi au vendredi. »",
          figure: barres([
            { label: "lun", value: 320 },
            { label: "mar", value: 350 },
            { label: "mer", value: 280 },
            { label: "jeu", value: 340 },
            { label: "ven", value: 360 },
            { label: "sam", value: 510 },
            { label: "dim", value: 540 },
          ]),
          correction:
            "a) La barre la plus haute est celle du dimanche : $540$ vélos.\nb) $540 - 280 = 260$ vélos de plus.\nc) Samedi et dimanche : $510 + 540 = 1\\,050$ vélos.\nd) Du lundi au vendredi : $320 + 350 + 280 + 340 + 360 = 1\\,650$ vélos.\n$1\\,650$ est plus grand que $1\\,050$ : la phrase est fausse.\n⭐ Pourtant, chaque jour du week-end dépasse chaque jour de la semaine. Mais la semaine compte cinq jours, et le week-end deux.\n⛔ Le piège : comparer un jour à un jour, au lieu de comparer les totaux.\nRéponse : a) le dimanche ; b) $260$ ; c) $1\\,050$ ; d) faux.",
          micros: ["stat_donnee_lire_graphique", "stat_donnee_comparer", "stat_donnee_interpreter", "stat_donnee_defi"],
        },
        {
          titre: "Le dessert de la cantine",
          enonce:
            "À la cantine, on demande leur dessert préféré aux $40$ élèves de deux classes de 6e. Gâteau : $20$. Yaourt : $8$. Fruit : $10$. Fromage : $2$.\na) Quel dessert est choisi par la moitié des élèves ?\nb) Le cuisinier dit : « Un élève sur quatre choisit un fruit. » A-t-il raison ?\nc) « Fruits et yaourts réunis, c'est presque la moitié. » Est-ce juste ?\nd) Peut-on dire : « Au collège, la moitié des élèves préfère le gâteau » ?",
          correction:
            "a) La moitié de $40$ : $40 \\div 2 = 20$. C'est le gâteau.\nb) Un sur quatre : $40 \\div 4 = 10$. Il y a bien $10$ fruits : il a raison.\nc) $10 + 8 = 18$. La moitié, c'est $20$.\nIl manque seulement $2$ élèves : « presque la moitié » est juste.\nd) Non. On a interrogé deux classes de 6e seulement.\nLes autres classes du collège peuvent avoir d'autres goûts.\n⛔ Le piège au d) : conclure pour tout le collège avec deux classes.\nRéponse : a) le gâteau ; b) oui ; c) oui ; d) non, on ne peut pas le dire.",
          schema: ecranSeulement(
            camembert([
              { label: "gâteau", value: 20 },
              { label: "yaourt", value: 8 },
              { label: "fruit", value: 10 },
              { label: "fromage", value: 2 },
            ]),
          ),
          micros: ["stat_donnee_lire_circulaire", "stat_donnee_interpreter", "stat_donnee_defi"],
        },
        {
          titre: "La mer et l'intérieur des terres",
          enonce:
            "Voici la température moyenne de quatre mois, dans deux villes (en °C). La première est au bord de la mer. La seconde est loin de la mer.\na) En juillet, quelle ville est la plus chaude ? De combien ?\nb) En janvier, quel est l'écart entre les deux villes ?\nc) Pour chaque ville, calcule l'écart entre le mois le plus chaud et le plus froid.\nd) Vrai ou faux : « Au bord de la mer, la température change moins dans l'année. »",
          figure: grille(["mois", "mer", "intérieur"], [
            ["janvier", "7", "1"],
            ["avril", "11", "10"],
            ["juillet", "18", "21"],
            ["octobre", "13", "10"],
          ]),
          correction:
            "a) Ligne « juillet » : $18$ au bord de la mer, $21$ à l'intérieur.\nL'intérieur est plus chaud de $21 - 18 = 3$ °C.\nb) Ligne « janvier » : $7 - 1 = 6$ °C d'écart.\nc) Au bord de la mer : le plus chaud $18$, le plus froid $7$. Écart : $18 - 7 = 11$ °C.\nÀ l'intérieur : le plus chaud $21$, le plus froid $1$. Écart : $21 - 1 = 20$ °C.\nd) Vrai : $11$ °C d'écart contre $20$ °C.\n⭐ La mer garde sa chaleur l'hiver et reste fraîche l'été.\n⛔ Le piège au c) : répondre avec une seule température. Un écart, c'est toujours une soustraction.\nRéponse : a) l'intérieur, de $3$ °C ; b) $6$ °C ; c) $11$ °C et $20$ °C ; d) vrai.",
          micros: ["stat_donnee_prelever", "stat_donnee_comparer", "stat_donnee_interpreter"],
        },
        {
          titre: "Le défi anti-gaspi",
          enonce:
            "La cantine pèse chaque semaine la nourriture jetée (en kg). Voici les cinq premières semaines.\na) Combien de kg jetés la semaine $3$ ?\nb) De combien le poids a-t-il baissé entre la semaine $1$ et la semaine $5$ ?\nc) Entre quelles semaines la baisse est-elle la plus forte ?\nd) Le défi est réussi si le poids baisse d'au moins un tiers. Est-il réussi ?",
          figure: pointsRelies(["S1", "S2", "S3", "S4", "S5"], [42, 38, 30, 26, 24], 10),
          correction:
            "a) Au-dessus de « S3 », je lis $30$ kg.\nb) Semaine $1$ : $42$ kg. Semaine $5$ : $24$ kg. Baisse : $42 - 24 = 18$ kg.\nc) Je calcule chaque baisse, d'une semaine à l'autre.\n$42 - 38 = 4$, puis $38 - 30 = 8$, puis $30 - 26 = 4$, puis $26 - 24 = 2$.\nLa plus forte baisse est $8$ kg : entre la semaine $2$ et la semaine $3$.\nd) Le tiers du départ : $42 \\div 3 = 14$ kg.\nLe poids a baissé de $18$ kg, plus que $14$ kg : le défi est réussi.\n⛔ Le piège au d) : prendre le tiers de $24$. Le défi se compte à partir du DÉBUT, $42$ kg.\nRéponse : a) $30$ kg ; b) $18$ kg ; c) entre S2 et S3 ; d) oui.",
          micros: ["stat_donnee_lire_graphique", "stat_donnee_comparer", "stat_donnee_interpreter", "stat_donnee_defi"],
        },
      ],
    },
  ],
};
