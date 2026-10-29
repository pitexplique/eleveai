// ─── Fiche d'exercices : lire et interpréter des données (4e) — 20 exercices ──
//
// Lot de 4e du 21/10/2026. Sur le modèle de la feuille de CM2
// `maths-cm2-graphique.tsx` (aides de dessin reprises : axe gradué, valeurs au
// milieu de deux graduations) et de la feuille sœur `maths-4e-statistiques.tsx`
// (ton, KaTeX, `grille`).
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-donnees.tsx` (« Lire et
// interpréter des données ») et sur la banque `lib/tutor-v4/questionBank/4e/
// maths/statistiques.bank.ts`, notionId stat_donnee : lire un tableau (simple
// ou à double entrée), lire un diagramme en barres, en bâtons ou circulaire,
// compter des effectifs (liste brute, effectif total, effectif manquant, « au
// moins »), calculer une fréquence en fraction, en décimal et en pourcentage,
// défis (fréquence regroupée, pourcentage → effectif, barre effacée, écart).
// ⛔ Les INDICATEURS (moyenne, médiane, étendue) sont la notion stat_statistique,
// qui a sa feuille : aucune de ses micros n'est citée ici.
// ⭐ L'AXE GRADUÉ (comme le coach depuis le 21/10) : aucune valeur écrite sur
// une barre quand la question demande de la LIRE ; quelques valeurs tombent AU
// MILIEU de deux graduations, et le corrigé le dit (« au milieu, entre 8 et 10 »).
// ⭐ L'AXE TRONQUÉ (ex. 14) : un axe qui ne part pas de 0 grossit les écarts.
//
// ⛔ Aucun exemple de la fiche de cours (135 élèves : 20 à pied, 25 à vélo, 40
// en bus, 50 en voiture ; la valeur 12 qui apparaît 7 fois sur 40 ; 10 sur 25
// à vélo ; 14,8 / 18,5 / 29,6 / 37,0 %), ni des décors de la banque (sport
// préféré, venir au collège, instruments, oiseaux, plage, menus, voyages, CDI,
// animaux de compagnie, véhicules, LV2, fruits, chauffage, arbres, boisson,
// festival, insectes ; fratrie, notes, livres de l'été, pointures, logements,
// œufs, péage, basket, théâtre, buts, écrans, dictée).
//
// Les pièges nommés : la graduation voisine (2, 3, 10), la valeur prise pour
// l'effectif (3, 10), deux lettres à égalité (4), oublier une catégorie du
// total (5, 7), la fraction non simplifiée (6), diviser par une autre catégorie
// (7), le pourcentage pris pour l'effectif (8, 11, 18), une ligne d'un tableau
// à double entrée prise pour une colonne (1, 13), le mauvais total (13), « au
// plus 5 » qui oublie le 5 (15), la plus grande quantité prise pour la plus
// forte fréquence (16), la moyenne de deux pourcentages (16), l'axe tronqué lu
// à l'œil (14), additionner les valeurs au lieu des effectifs (10), la part des
// pièces confondue avec la part de l'argent (20).
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 1 — titres du Grand Chelem à la fin de 2025 (palmarès officiels de
//     l'ATP et des quatre tournois) : Djokovic 10 Open d'Australie, 3
//     Roland-Garros, 7 Wimbledon, 4 US Open (24) ; Nadal 2, 14, 2, 4 (22) ;
//     Federer 6, 1, 8, 5 (20) ;
//   · ex. 4 — le proverbe « Petit à petit, l'oiseau fait son nid », et le fait
//     que le e est la lettre la plus fréquente d'un long texte français ;
//   · ex. 9 — départements par région de la France métropolitaine (INSEE, code
//     officiel géographique) : 96 en métropole, 101 avec les cinq d'outre-mer ;
//   · ex. 11 — production d'électricité en France en 2023 (RTE, Bilan
//     électrique 2023 : 494,7 TWh, dont nucléaire 320,4, hydraulique 58,8,
//     éolien 50,7, solaire 21,6) ; parts arrondies : 65 / 12 / 15 / 8 % ;
//   · ex. 15 — l'examen du code de la route : 40 questions, réussi avec 35
//     bonnes réponses au moins, donc 5 fautes au plus (Sécurité routière) ;
//   · ex. 17 — les 206 os du squelette adulte : 27 par main, 26 par pied, 22
//     au crâne, 26 à la colonne (24 vertèbres, sacrum, coccyx), 25 à la cage
//     thoracique (24 côtes, sternum) ; le reste : 4 (épaules) + 6 (bras) + 2
//     (bassin) + 8 (jambes, rotules comprises) + 1 (hyoïde) + 6 (osselets) = 27 ;
//   · ex. 18 — groupes sanguins en France (Établissement français du sang) :
//     A 45 %, O 42 %, B 9 %, AB 4 % ; compatibilités ABO, sans le rhésus ;
//   · ex. 19 — le piano : 88 touches, 52 blanches, 36 noires ; une octave de
//     12 touches, 7 blanches et 5 noires ; 7 octaves pleines + la, la dièse,
//     si graves + le do aigu.
// Le reste (boutique de mode, sorties en montagne, qualité de l'air, manchots,
// macarons, jouets, pompiers, testeurs de jeu, trajets d'une ville, abonnés,
// candidats au code, champs malades, pièces d'une cagnotte) est un MODÈLE, à
// des ordres de grandeur vraisemblables.
// Domaines et métiers, un par exercice : sport (journaliste sportive), mode
// (gérante de boutique), montagne (guide), codes secrets (cryptographe), air
// (technicienne de la qualité de l'air), zoo (soigneur), pâtisserie (chef),
// industrie (contrôleuse qualité), géographie (cartographe), secours
// (sapeur-pompier), énergie (ingénieure du réseau), jeu vidéo (game designer),
// urbanisme (urbaniste), médias (journaliste de données), sécurité routière
// (monitrice d'auto-école), agriculture (agronome), préhistoire
// (paléoanthropologue), don du sang (infirmier de collecte), musique
// (accordeuse de piano), économie (conseillère bancaire).
//
// ⭐ LES DESSINS : trois aides locales, sans largeur minimale (⛔ `diagramme()`
// de figures.tsx défile à 375 px) — `barres` (SVG, viewBox 300, police 14, axe
// gradué, bâtons, axe tronqué `debut`), `camembert` (SVG, légende en dessous,
// pourcentages dans la légende en option) et `grille` (tableau HTML, reprise
// de la feuille sœur). 14 dessins imprimés ; les schémas qui redisent le
// corrigé sont `ecranSeulement`, leurs données sont alors dans l'énoncé.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-4e-stat-donnee.mjs` —
// chaque valeur relue dans le dessin ou l'énoncé, chaque total, effectif,
// fréquence (fraction, décimal, pourcentage), angle et compatibilité refaits.
//
// Micro-compétences : stat_lire_tableau (1, 5, 7, 9, 13, 15, 17, 20),
// stat_lire_graphique (2, 3, 10, 11, 14, 18), stat_effectif (4, 5, 9, 10, 12,
// 15, 17, 19, 20), stat_frequence (6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 19,
// 20), stat_donnee_defi (11, 14, 16, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** 37.5 → « 37,5 » : le texte NU d'un dessin (SVG, pas de KaTeX). */
const fr = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",").replace("-", "−");

type Barre = { label: string; value: number };

/** Les graduations debut, debut + pas… jusqu'à `vmax`. */
const graduationsDe = (debut: number, vmax: number, pas: number) =>
  Array.from({ length: Math.round((vmax - debut) / pas) + 1 }, (_, k) => debut + k * pas);

/**
 * Un diagramme en BARRES (ou en BÂTONS), en SVG local : viewBox 300, police
 * 14, aucune largeur minimale. Avec `pas`, l'axe est gradué et AUCUNE valeur
 * n'est écrite : on LIT la hauteur (une valeur peut tomber au milieu de deux
 * graduations). Sans `pas`, la valeur est écrite au-dessus de chaque barre
 * (schémas d'écran). `debut` : l'axe part de ce nombre et non de 0 (l'axe
 * TRONQUÉ). `batons` : des traits fins, pour des valeurs numériques.
 * `surligne` : une barre en orange. `unite` : le nom de l'axe, en haut à gauche.
 * ⭐ Le script relit `{ label, value }` et les options.
 */
const barres = (
  data: Barre[],
  opts: { pas?: number; debut?: number; batons?: boolean; surligne?: number; unite?: string } = {},
) => {
  const W = 300;
  const G = opts.pas ? 44 : 16;
  const D = 10;
  const HAUT = 32;
  const BAS = 154;
  const debut = opts.debut ?? 0;
  const max = Math.max(1, ...data.map((d) => d.value));
  const vmax = opts.pas ? debut + Math.ceil((max - debut) / opts.pas) * opts.pas : max;
  const y = (v: number) => BAS - ((v - debut) / (vmax - debut)) * (BAS - HAUT);
  const slot = (W - G - D) / data.length;
  const bw = opts.batons ? 8 : Math.min(40, slot * 0.6);
  const H = BAS + 30;
  const graduations = opts.pas ? graduationsDe(debut, vmax, opts.pas) : [];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={opts.batons ? "Diagramme en bâtons" : "Diagramme en barres"}>
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        {opts.unite ? (
          <text x="6" y="16" fontSize="14" fontWeight="700" fill="#475569">
            {opts.unite}
          </text>
        ) : null}
        {graduations.map((g) => (
          <g key={g}>
            <line x1={G - 4} y1={y(g)} x2={W - D} y2={y(g)} stroke="#cbd5e1" strokeWidth="1" />
            <text x={G - 8} y={y(g) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill={debut && g === debut ? ROUGE : "#334155"}>
              {g}
            </text>
          </g>
        ))}
        <line x1={G - 4} y1={HAUT - 8} x2={G - 4} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G - 4} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          const actif = opts.surligne === i;
          return (
            <g key={i}>
              <rect x={x} y={y(d.value)} width={bw} height={BAS - y(d.value)} rx={opts.batons ? 1 : 3} fill={actif ? "#fed7aa" : "#bfdbfe"} stroke={actif ? ORANGE : BLEU} strokeWidth={actif ? 2.5 : 1.5} />
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
 * Un DIAGRAMME CIRCULAIRE (repris du CM2) : le disque (viewBox 300), les
 * secteurs dans l'ordre des aiguilles d'une montre à partir du haut, et une
 * LÉGENDE en dessous. `valeurs` : le nombre écrit dans chaque secteur (false :
 * disque muet). `pourcent` : le pourcentage écrit dans la LÉGENDE, une ligne
 * par secteur (« A : 45 % ») — jamais dans un petit secteur.
 * ⛔ Légende de 12 signes au plus (18 avec le pourcentage) ; le script le vérifie.
 */
const camembert = (data: Barre[], valeurs = true, pourcent = false) => {
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
  const parLigne = pourcent ? 1 : 2;
  const H = 196 + Math.ceil(data.length / parLigne) * 20;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme circulaire">
        <rect x="0" y="0" width="300" height={H} rx="10" fill="#fff" />
        {parts.map((p, i) => (
          <path key={i} d={p.d} fill={p.couleur} stroke="#ffffff" strokeWidth={2} />
        ))}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f172a" strokeWidth={1.5} />
        {valeurs && !pourcent
          ? parts.map((p, i) => (
              <text key={`v${i}`} x={p.lx} y={p.ly + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a" stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
                {fr(data[i].value)}
              </text>
            ))
          : null}
        {data.map((d, i) => {
          const x = pourcent ? 70 : i % 2 === 0 ? 24 : 162;
          const yy = 204 + Math.floor(i / parLigne) * 20;
          return (
            <g key={`l${i}`}>
              <rect x={x} y={yy - 12} width="14" height="14" rx="3" fill={parts[i].couleur} stroke="#0f172a" strokeWidth="1" />
              <text x={x + 20} y={yy} fontSize="14" fontWeight="700" fill="#334155">
                {pourcent ? `${d.label} : ${fr(d.value)} %` : d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Le tableau d'un corrigé, plusieurs lignes : valeur, effectif, produit ou
 * fréquence. Du HTML — lisible à toutes les largeurs. `total` met la dernière ligne
 * en gras ; `surligne` met une ligne en orange (la case lue).
 * ⛔ Texte NU dans les cases (pas de KaTeX) ; le produit s'écrit « × ».
 */
const grille = (entetes: string[], lignes: (string | number)[][], opts: { total?: boolean; surligne?: number } = {}) => (
  <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[15rem] print:overflow-visible">
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
        {lignes.map((l, i) => {
          const total = opts.total && i === lignes.length - 1;
          const sur = opts.surligne === i;
          return (
            <tr key={i} className={sur ? "bg-orange-100 font-bold text-orange-800" : total ? "bg-slate-50 font-bold" : ""}>
              {l.map((c, j) => (
                <td key={j} className="border border-slate-300 px-1.5 py-0.5 text-slate-800">
                  {typeof c === "number" ? fr(c) : c}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);


export const exercicesStatDonnee4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "stat-donnee",
  titre: "Lire et interpréter des données",
  accroche:
    "Vingt exercices, du geste seul au problème : lire un tableau, même à double entrée, lire un diagramme en barres ou en bâtons sur un axe gradué, même au milieu de deux graduations, compter des effectifs, puis calculer une fréquence en fraction, en décimal et en pourcentage. Le palmarès du tennis, les départements de France, l'électricité du pays, les 206 os du squelette, les groupes sanguins et les 88 touches du piano. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/stat-donnee", titre: "Lire et interpréter des données" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire une case, lire une barre, compter, ou diviser par le total.",
      rappel: [
        "Tableau à double entrée : je choisis la ligne, puis la colonne. La case lue est à leur croisement.",
        "Axe gradué : je regarde de combien en combien il va. Une barre qui s'arrête entre deux lignes vaut le nombre du milieu.",
        "L'EFFECTIF d'une valeur : le nombre de fois où elle apparaît. L'effectif TOTAL : la somme de tous les effectifs.",
        "La FRÉQUENCE : effectif ÷ effectif total. Elle s'écrit en fraction, en décimal ou en pourcentage.",
      ],
      exercices: [
        {
          enonce:
            "Une journaliste sportive prépare un article sur trois légendes du tennis. Le tableau donne leurs titres du Grand Chelem, tournoi par tournoi, à la fin de 2025.\na) Combien de fois Nadal a-t-il gagné Roland-Garros ?\nb) Combien de fois Federer a-t-il gagné Wimbledon ?\nc) Quel tournoi Djokovic a-t-il gagné le plus souvent ?\nd) Lequel des trois a gagné le plus d'US Open ?",
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: ["Open d'Australie", "l'Open d'Australie", "Australie"] },
            { question: "d)", attendu: ["Federer"] },
          ],
          figure: grille(["tournoi", "Djokovic", "Nadal", "Federer"], [
            ["Open d'Australie", 10, 2, 6],
            ["Roland-Garros", 3, 14, 1],
            ["Wimbledon", 7, 2, 8],
            ["US Open", 4, 4, 5],
          ]),
          correction:
            "Chaque case croise une ligne (le tournoi) et une colonne (le joueur).\na) Ligne « Roland-Garros », colonne « Nadal » : je lis 14.\nb) Ligne « Wimbledon », colonne « Federer » : je lis 8.\nc) Je lis toute la colonne « Djokovic » : 10, 3, 7 et 4. Le plus grand est 10 : l'Open d'Australie.\nd) Je lis toute la ligne « US Open » : 4, 4 et 5. Le plus grand est 5 : Federer.\n⛔ Le piège au b) : lire 7, la case de Djokovic sur la même ligne. Je pose le doigt sur la ligne, puis je glisse jusqu'à la bonne colonne.\nRéponse : a) 14 fois ; b) 8 fois ; c) l'Open d'Australie, 10 fois ; d) Federer, avec 5 US Open.",
          micros: ["stat_lire_tableau"],
        },
        {
          enonce:
            "La gérante d'une boutique de vêtements compte les T-shirts vendus en un mois, taille par taille.\na) Combien de T-shirts de taille M a-t-elle vendus ?\nb) Combien de taille S ?\nc) Combien de taille XL ?\nd) Combien de T-shirts L de plus que de XS ?",
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "35" },
            { question: "c)", attendu: "15" },
            { question: "d)", attendu: "25" },
          ],
          figure: barres([
            { label: "XS", value: 20 },
            { label: "S", value: 35 },
            { label: "M", value: 50 },
            { label: "L", value: 45 },
            { label: "XL", value: 15 },
          ], { pas: 10, unite: "T-shirts" }),
          correction:
            "L'axe va de 10 en 10.\na) Le haut de la barre M est sur la ligne 50 : 50 T-shirts.\nb) La barre S s'arrête au milieu, entre 30 et 40 : 35 T-shirts.\nc) La barre XL s'arrête au milieu, entre 10 et 20 : 15 T-shirts.\nd) La barre L s'arrête au milieu, entre 40 et 50 : 45. La barre XS est sur la ligne 20.\n$45 - 20 = 25$ T-shirts de plus.\n⛔ Le piège : lire la graduation voisine, 30 ou 40 pour la taille S. La barre s'arrête entre les deux lignes : c'est le nombre du milieu.\nRéponse : a) 50 ; b) 35 ; c) 15 ; d) 25 de plus.",
          micros: ["stat_lire_graphique"],
        },
        {
          enonce:
            "Une guide de haute montagne a fait 30 sorties cet été. À chaque sortie, elle note le nombre de clients encordés avec elle. Le diagramme en bâtons donne le nombre de sorties pour chaque nombre de clients.\na) Combien de sorties avec exactement 2 clients ?\nb) Combien de sorties avec 3 clients ?\nc) Combien de sorties avec 4 clients ?\nd) Quel nombre de clients revient le plus souvent ?",
          reponses: [
            { question: "a)", attendu: "11" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "2" },
          ],
          figure: barres([
            { label: "1", value: 6 },
            { label: "2", value: 11 },
            { label: "3", value: 9 },
            { label: "4", value: 4 },
          ], { pas: 2, batons: true, unite: "sorties" }),
          correction:
            "En bas, je lis la VALEUR : le nombre de clients. Sur l'axe gradué de 2 en 2, je lis l'EFFECTIF : le nombre de sorties.\na) Le bâton de 2 clients s'arrête au milieu, entre 10 et 12 : 11 sorties.\nb) Le bâton de 3 clients s'arrête au milieu, entre 8 et 10 : 9 sorties.\nc) Le bâton de 4 clients est sur la ligne 4 : 4 sorties.\nd) Le bâton le plus haut est celui de 2 clients.\nContrôle : $6 + 11 + 9 + 4 = 30$ sorties. Le compte est bon.\n⛔ Le piège au d) : répondre 11. 11 est l'effectif, le nombre de sorties ; la question demande la valeur, le nombre de clients.\nRéponse : a) 11 sorties ; b) 9 ; c) 4 ; d) 2 clients.",
          micros: ["stat_lire_graphique"],
        },
        {
          enonce:
            "Un cryptographe casse des codes secrets en comptant les lettres. Il s'entraîne sur un proverbe : « Petit à petit, l'oiseau fait son nid. » Le « à » compte comme un a.\na) Combien de lettres la phrase compte-t-elle en tout ?\nb) Quel est l'effectif de la lettre t ?\nc) Quelle lettre a le plus grand effectif ?\nd) Quel est l'effectif de la lettre e ?",
          reponses: [
            { question: "a)", attendu: "28" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: ["t ; i", "t et i"] },
            { question: "d)", attendu: "3" },
          ],
          correction:
            "a) Je compte mot par mot : petit (5), à (1), petit (5), l (1), oiseau (6), fait (4), son (3), nid (3).\n$5 + 1 + 5 + 1 + 6 + 4 + 3 + 3 = 28$ lettres : c'est l'effectif total.\nb) Deux t dans chaque « petit », un dans « fait » : $2 + 2 + 1 = 5$.\nc) Je compte aussi les i : un dans chaque « petit », un dans « oiseau », « fait » et « nid » : $1 + 1 + 1 + 1 + 1 = 5$.\nLe t et le i sont à égalité, avec 5 chacun. Aucune autre lettre n'en a autant.\nd) Un e dans chaque « petit », un dans « oiseau » : 3.\n⭐ Dans un long texte en français, la lettre la plus fréquente est le e. Ici, la phrase est trop courte pour le montrer : le cryptographe a besoin d'un grand effectif total.\n⛔ Le piège au c) : s'arrêter au t. Je compte toutes les lettres avant de conclure.\nRéponse : a) 28 lettres ; b) 5 ; c) le t et le i, 5 chacun ; d) 3.",
          schema: ecranSeulement(
            barres([
              { label: "p", value: 2 },
              { label: "e", value: 3 },
              { label: "t", value: 5 },
              { label: "i", value: 5 },
              { label: "a", value: 3 },
              { label: "l", value: 1 },
              { label: "o", value: 2 },
              { label: "s", value: 2 },
              { label: "u", value: 1 },
              { label: "f", value: 1 },
              { label: "n", value: 2 },
              { label: "d", value: 1 },
            ], { surligne: 2 }),
          ),
          micros: ["stat_effectif"],
        },
        {
          enonce:
            "Une technicienne de la qualité de l'air relève chaque jour l'indice ATMO d'une ville, pendant les 30 jours d'avril. Une case du tableau a été effacée.\na) Combien de jours la qualité de l'air a-t-elle été « mauvaise » ?\nb) Combien de jours a-t-elle été « dégradée » ou pire ?\nc) Combien de jours a-t-elle été « bonne » ou « moyenne » ?",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "21" },
          ],
          figure: grille(["indice ATMO", "nombre de jours"], [
            ["bon", 12],
            ["moyen", 9],
            ["dégradé", 5],
            ["mauvais", "?"],
            ["très mauvais", 1],
          ]),
          correction:
            "L'effectif total est connu : les 30 jours d'avril.\na) J'additionne les jours connus : $12 + 9 + 5 + 1 = 27$.\nJe les retire du total : $30 - 27 = 3$ jours « mauvais ».\nb) « Dégradé ou pire », ce sont trois lignes : dégradé, mauvais et très mauvais.\n$5 + 3 + 1 = 9$ jours.\nc) $12 + 9 = 21$ jours.\nContrôle : $21 + 9 = 30$. Le compte est bon.\n⛔ Le piège au a) : oublier la ligne « très mauvais » dans l'addition, et trouver 4. Je coche chaque ligne quand je l'ajoute.\nRéponse : a) 3 jours ; b) 9 jours ; c) 21 jours.",
          micros: ["stat_lire_tableau", "stat_effectif"],
        },
        {
          enonce:
            "Un soigneur animalier s'occupe de 24 manchots dans un zoo. 9 d'entre eux sont des jeunes, nés dans l'année.\na) Quelle est la fréquence des jeunes ? Donne-la en fraction simplifiée.\nb) Écris-la en nombre décimal.\nc) Écris-la en pourcentage.\nd) Quelle est la fréquence des adultes, en nombre décimal ?",
          reponses: [
            { question: "a)", attendu: ["3/8"], exact: true },
            { question: "b)", attendu: ["0,375"], exact: true },
            { question: "c)", attendu: "37,5 %" },
            { question: "d)", attendu: ["0,625"], exact: true },
          ],
          correction:
            "La fréquence, c'est l'effectif divisé par l'effectif total, ici 24 manchots.\na) $\\dfrac{9}{24}$. Je simplifie par 3 : $\\dfrac{9}{24} = \\dfrac{3}{8}$.\nb) $9 \\div 24 = 0{,}375$.\nc) $0{,}375 = \\dfrac{37{,}5}{100}$, soit 37,5 %.\nd) Les adultes : $24 - 9 = 15$ manchots. $15 \\div 24 = 0{,}625$.\nContrôle : $0{,}375 + 0{,}625 = 1$. La somme des fréquences fait toujours 1.\n⛔ Le piège : diviser 9 par 15, le nombre d'adultes. $\\dfrac{9}{15}$ compare les jeunes aux adultes ; la fréquence compare les jeunes au TOTAL.\nRéponse : a) $\\dfrac{3}{8}$ ; b) $0{,}375$ ; c) 37,5 % ; d) $0{,}625$.",
          schema: ecranSeulement(
            camembert([
              { label: "jeunes", value: 9 },
              { label: "adultes", value: 15 },
            ]),
          ),
          micros: ["stat_frequence"],
        },
        {
          enonce:
            "Un chef pâtissier remplit une grande boîte de macarons. Le tableau donne le nombre de macarons de chaque parfum.\na) Combien de macarons la boîte contient-elle ?\nb) Quelle est la fréquence des macarons à la framboise ? Donne-la en fraction simplifiée, en décimal et en pourcentage.\nc) Quelle est la fréquence des macarons à la pistache, en pourcentage ?",
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b) frac.", attendu: ["1/4"], exact: true },
            { question: "b) déc.", attendu: ["0,25"], exact: true },
            { question: "b) %", attendu: "25 %" },
            { question: "c)", attendu: "22,5 %" },
          ],
          figure: grille(["parfum", "macarons"], [
            ["chocolat", 14],
            ["framboise", 10],
            ["pistache", 9],
            ["citron", 7],
          ]),
          correction:
            "a) L'effectif total est la somme des quatre lignes : $14 + 10 + 9 + 7 = 40$ macarons.\nb) $\\dfrac{10}{40} = \\dfrac{1}{4}$, et $10 \\div 40 = 0{,}25$, soit 25 %.\nUn macaron sur quatre est à la framboise.\nc) $9 \\div 40 = 0{,}225$, soit 22,5 %.\n⛔ Le piège : diviser par 14, le nombre de macarons au chocolat, ou par 30, les macarons qui ne sont pas à la framboise. Une fréquence se calcule TOUJOURS sur le total, 40.\nRéponse : a) 40 macarons ; b) $\\dfrac{1}{4}$, $0{,}25$, 25 % ; c) 22,5 %.",
          micros: ["stat_lire_tableau", "stat_frequence"],
        },
        {
          enonce:
            "Une contrôleuse qualité teste 50 jouets d'un lot, sortis d'une usine. 3 jouets ont un défaut.\na) Quelle est la fréquence des jouets avec un défaut, en fraction ?\nb) En nombre décimal ?\nc) En pourcentage ?\nd) Le lot est refusé si plus de 5 % des jouets ont un défaut. Ce lot est-il refusé ?",
          reponses: [
            { question: "a)", attendu: ["3/50", "6/100"], exact: true },
            { question: "b)", attendu: ["0,06"], exact: true },
            { question: "c)", attendu: "6 %" },
            { question: "d)", attendu: ["oui", "vrai"] },
          ],
          correction:
            "L'effectif total est 50 jouets ; l'effectif des jouets avec un défaut est 3.\na) $\\dfrac{3}{50}$.\nb) $3 \\div 50 = 0{,}06$.\nc) $0{,}06 = \\dfrac{6}{100}$, soit 6 %.\nd) 6 % est plus que 5 % : oui, le lot est refusé.\n⛔ Le piège : écrire 3 %. 3 est un effectif, pas un pourcentage. « 3 sur 50 » fait 6 sur 100.\nRéponse : a) $\\dfrac{3}{50}$ ; b) $0{,}06$ ; c) 6 % ; d) oui, il est refusé.",
          schema: ecranSeulement(
            barres([
              { label: "défaut", value: 3 },
              { label: "sans défaut", value: 47 },
            ], { surligne: 0 }),
          ),
          micros: ["stat_frequence"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur les mêmes données. Je lis, je calcule l'effectif total, puis je réponds par une phrase.",
      rappel: [
        "L'effectif total est la somme des EFFECTIFS, pas des valeurs, ni le nombre de lignes du tableau.",
        "Fréquence = effectif ÷ effectif total. Pour un pourcentage, je multiplie le décimal par 100.",
        "Un pourcentage d'un total donne un effectif : 65 % de 495, c'est $0{,}65 \\times 495$.",
        "La somme de toutes les fréquences fait 1, c'est-à-dire 100 % : c'est mon contrôle.",
      ],
      exercices: [
        {
          enonce:
            "Un cartographe dessine la carte des régions de France métropolitaine. Le tableau donne le nombre de départements de chaque région.\na) Combien de départements compte la Bretagne ?\nb) Quelle région en compte le plus ?\nc) Combien de régions comptent exactement 5 départements ?\nd) Combien de départements compte la France métropolitaine ?\ne) La France compte 101 départements en tout. Combien sont en outre-mer ?\nf) Quelle est la fréquence des départements d'Île-de-France parmi ceux de la métropole ? Donne une fraction simplifiée.",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: ["Occitanie", "l'Occitanie"] },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: "96" },
            { question: "e)", attendu: "5" },
            { question: "f)", attendu: ["1/12"], exact: true },
          ],
          figure: grille(["région", "départements"], [
            ["Auvergne-Rhône-Alpes", 12],
            ["Bourgogne-Franche-Comté", 8],
            ["Bretagne", 4],
            ["Centre-Val de Loire", 6],
            ["Corse", 2],
            ["Grand Est", 10],
            ["Hauts-de-France", 5],
            ["Île-de-France", 8],
            ["Normandie", 5],
            ["Nouvelle-Aquitaine", 12],
            ["Occitanie", 13],
            ["Pays de la Loire", 5],
            ["Provence-Alpes-Côte d'Azur", 6],
          ]),
          correction:
            "a) Ligne « Bretagne » : 4 départements.\nb) Le plus grand nombre de la colonne est 13 : l'Occitanie.\nc) Je cherche les 5 : Hauts-de-France, Normandie, Pays de la Loire. Cela fait 3 régions.\nd) J'additionne les treize lignes : $12 + 8 + 4 + 6 + 2 + 10 + 5 + 8 + 5 + 12 + 13 + 5 + 6 = 96$ départements.\ne) $101 - 96 = 5$ départements d'outre-mer : Guadeloupe, Martinique, Guyane, La Réunion et Mayotte.\nf) $\\dfrac{8}{96}$. Je simplifie par 8 : $\\dfrac{8}{96} = \\dfrac{1}{12}$. Un département de métropole sur douze est en Île-de-France.\n⛔ Le piège au d) : répondre 13. 13 est le nombre de LIGNES, c'est-à-dire de régions. L'effectif total des départements est la somme de la colonne.\nRéponse : a) 4 ; b) l'Occitanie, 13 ; c) 3 régions ; d) 96 ; e) 5 ; f) $\\dfrac{1}{12}$.",
          micros: ["stat_lire_tableau", "stat_effectif", "stat_frequence"],
        },
        {
          enonce:
            "Un sapeur-pompier note, chaque jour de juin, le nombre d'interventions de sa caserne. Le diagramme en bâtons donne le nombre de jours pour chaque nombre d'interventions.\na) Combien de jours la caserne a-t-elle fait exactement 4 interventions ?\nb) Combien de jours a-t-elle fait 5 interventions ?\nc) Vérifie que le diagramme compte bien les 30 jours de juin.\nd) Combien de jours a-t-elle fait au moins 6 interventions ?\ne) Combien d'interventions la caserne a-t-elle faites en tout, en juin ?",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: "7" },
            { question: "e)", attendu: "132" },
          ],
          figure: barres([
            { label: "2", value: 3 },
            { label: "3", value: 5 },
            { label: "4", value: 8 },
            { label: "5", value: 7 },
            { label: "6", value: 5 },
            { label: "7", value: 2 },
          ], { pas: 2, batons: true, unite: "jours" }),
          correction:
            "En bas, la valeur : le nombre d'interventions dans la journée. Sur l'axe, gradué de 2 en 2, l'effectif : le nombre de jours.\na) Le bâton de 4 est sur la ligne 8 : 8 jours.\nb) Le bâton de 5 s'arrête au milieu, entre 6 et 8 : 7 jours.\nc) Je lis tous les bâtons : 3, 5, 8, 7, 5 et 2. Les bâtons de 2, de 3, de 5 et de 6 s'arrêtent au milieu de deux graduations.\n$3 + 5 + 8 + 7 + 5 + 2 = 30$ jours. Le compte est bon.\nd) « Au moins 6 », c'est 6 ou 7 interventions. Le bâton de 6 s'arrête au milieu, entre 4 et 6 : 5. Celui de 7 est sur la ligne 2.\n$5 + 2 = 7$ jours.\ne) Les 3 jours à 2 interventions en font $2 \\times 3 = 6$. Je fais de même pour chaque bâton :\n$2 \\times 3 + 3 \\times 5 + 4 \\times 8 + 5 \\times 7 + 6 \\times 5 + 7 \\times 2 = 6 + 15 + 32 + 35 + 30 + 14 = 132$ interventions.\n⛔ Le piège au e) : répondre 30, le nombre de JOURS, ou additionner les valeurs $2 + 3 + 4 + 5 + 6 + 7 = 27$. Chaque valeur compte autant de fois que son effectif.\nRéponse : a) 8 jours ; b) 7 jours ; c) oui, 30 jours ; d) 7 jours ; e) 132 interventions.",
          micros: ["stat_lire_graphique", "stat_effectif"],
        },
        {
          enonce:
            "Une ingénieure du réseau électrique présente la production d'électricité de la France en 2023 : environ 495 TWh (térawattheures). Le diagramme circulaire donne la part de chaque source.\na) Quelle est la fréquence du nucléaire, en nombre décimal ?\nb) Combien de TWh le nucléaire a-t-il produits ? Arrondis à l'unité.\nc) L'hydraulique, l'éolien et le solaire sont des énergies renouvelables. Quelle part de l'électricité produisent-elles ensemble ?\nd) Dans le disque, quel est l'angle du secteur du nucléaire ?",
          reponses: [
            { question: "a)", attendu: ["0,65"], exact: true },
            { question: "b)", attendu: "322", tolerance: 0.5 },
            { question: "c)", attendu: "27 %" },
            { question: "d)", attendu: "234" },
          ],
          figure: camembert([
            { label: "nucléaire", value: 65 },
            { label: "hydraulique", value: 12 },
            { label: "éolien, solaire", value: 15 },
            { label: "autres", value: 8 },
          ], false, true),
          correction:
            "Le disque entier, c'est toute la production : 100 %.\na) 65 % $= \\dfrac{65}{100} = 0{,}65$.\nb) 65 % de 495 TWh : $0{,}65 \\times 495 = 321{,}75$, soit environ 322 TWh.\n⭐ RTE, qui gère le réseau, a mesuré 320,4 TWh : notre calcul, fait avec des pourcentages arrondis, tombe tout près.\nc) J'additionne les deux parts : $12 + 15 = 27$, soit 27 %. Un peu plus d'un quart.\nd) Le disque entier fait 360°. Le secteur du nucléaire en prend 65 % : $0{,}65 \\times 360 = 234$°.\n⛔ Le piège au b) : répondre 65 TWh. 65 est un pourcentage ; l'effectif se calcule à partir du total, 495.\nRéponse : a) $0{,}65$ ; b) environ 322 TWh ; c) 27 % ; d) 234°.",
          micros: ["stat_lire_graphique", "stat_frequence", "stat_donnee_defi"],
        },
        {
          enonce:
            "Un game designer fait tester son nouveau jeu vidéo par 20 joueurs. Chacun choisit un personnage : G (guerrier), M (mage), A (archère) ou S (soigneuse). Voici les choix, dans l'ordre : G, M, A, G, S, M, G, A, M, G, S, A, G, M, M, G, A, G, S, M.\na) Donne l'effectif de chaque personnage.\nb) Calcule la fréquence de chaque personnage, en pourcentage.\nc) Vérifie que la somme des fréquences fait 100 %.\nd) Le game designer veut rendre plus attirant le personnage le moins choisi. Lequel ?",
          reponses: [
            { question: "a) G", attendu: "7" },
            { question: "a) M", attendu: "6" },
            { question: "a) A", attendu: "4" },
            { question: "a) S", attendu: "3" },
            { question: "b) G", attendu: "35 %" },
            { question: "b) M", attendu: "30 %" },
            { question: "b) A", attendu: "20 %" },
            { question: "b) S", attendu: "15 %" },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: ["la soigneuse", "soigneuse", "S"] },
          ],
          correction:
            "a) Je barre chaque lettre quand je la compte. G : 7. M : 6. A : 4. S : 3.\nContrôle : $7 + 6 + 4 + 3 = 20$ joueurs. Le compte est bon.\nb) Je divise chaque effectif par 20.\nG : $7 \\div 20 = 0{,}35$, soit 35 %. M : $6 \\div 20 = 0{,}3$, soit 30 %.\nA : $4 \\div 20 = 0{,}2$, soit 20 %. S : $3 \\div 20 = 0{,}15$, soit 15 %.\n⭐ Sur 20 joueurs, un joueur vaut $100 \\div 20 = 5$ %.\nc) $35 + 30 + 20 + 15 = 100$, soit 100 %.\nd) Le plus petit effectif est 3 : la soigneuse.\n⛔ Le piège au a) : compter trop vite et perdre une lettre. Le contrôle par le total, 20, le montre tout de suite.\nRéponse : a) G : 7, M : 6, A : 4, S : 3 ; b) 35 %, 30 %, 20 %, 15 % ; c) oui, 100 % ; d) la soigneuse.",
          schema: ecranSeulement(
            grille(["personnage", "effectif", "fréquence"], [
              ["G", 7, "35 %"],
              ["M", 6, "30 %"],
              ["A", 4, "20 %"],
              ["S", 3, "15 %"],
              ["total", 20, "100 %"],
            ], { total: true }),
          ),
          micros: ["stat_effectif", "stat_frequence"],
        },
        {
          enonce:
            "Une urbaniste étudie les trajets domicile-travail de 500 habitants d'une ville. Le tableau à double entrée croise la longueur du trajet et le moyen de transport.\na) Combien d'habitants font moins de 5 km à vélo ?\nb) Combien d'habitants vont au travail à vélo, en tout ?\nc) Quelle est la fréquence de la voiture parmi les 500 habitants, en pourcentage ?\nd) Parmi les trajets de moins de 5 km, quelle est la fréquence de la voiture, en pourcentage ?\ne) Vrai ou faux : « Près de la moitié des trajets de moins de 5 km se font en voiture. »",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "40" },
            { question: "c)", attendu: "62 %" },
            { question: "d)", attendu: "48 %" },
            { question: "e)", attendu: ["oui", "vrai"] },
          ],
          figure: grille(["trajet", "voiture", "bus, tram", "vélo", "à pied"], [
            ["moins de 5 km", 120, 40, 30, 60],
            ["5 km ou plus", 190, 50, 10, 0],
          ]),
          correction:
            "a) Ligne « moins de 5 km », colonne « vélo » : 30 habitants.\nb) Toute la colonne « vélo » : $30 + 10 = 40$ habitants.\nc) Toute la colonne « voiture » : $120 + 190 = 310$. Le total est 500.\n$310 \\div 500 = 0{,}62$, soit 62 %.\nd) Le total change : ce sont les trajets de moins de 5 km seulement, toute la première ligne.\n$120 + 40 + 30 + 60 = 250$ trajets. $120 \\div 250 = 0{,}48$, soit 48 %.\ne) 48 %, c'est un peu moins de 50 % : près de la moitié. Vrai.\n⛔ Le piège au d) : diviser 120 par 500. La question parle des trajets de moins de 5 km : le total, c'est cette ligne, 250.\nRéponse : a) 30 ; b) 40 ; c) 62 % ; d) 48 % ; e) vrai.",
          micros: ["stat_lire_tableau", "stat_frequence"],
        },
        {
          enonce:
            "Une appli de vélos en libre-service publie ce graphique, avec le titre : « Nos abonnés explosent ! ». Un journaliste de données le vérifie. L'axe compte les abonnés en milliers.\na) De combien en combien l'axe est-il gradué ? Par quel nombre commence-t-il ?\nb) Combien d'abonnés en 2022 ? Et en 2025 ?\nc) Sur le dessin, la barre de 2025 est combien de fois plus haute que celle de 2022 ?\nd) En vrai, le nombre d'abonnés a-t-il doublé entre 2022 et 2025 ?",
          reponses: [
            { question: "a) pas", attendu: "5" },
            { question: "a) début", attendu: "60" },
            { question: "b) 2022", attendu: "70000" },
            { question: "b) 2025", attendu: "85000" },
            { question: "c)", attendu: "2,5" },
            { question: "d)", attendu: ["non", "faux"] },
          ],
          figure: barres([
            { label: "2022", value: 70 },
            { label: "2023", value: 75 },
            { label: "2024", value: 80 },
            { label: "2025", value: 85 },
          ], { pas: 5, debut: 60, unite: "milliers d'abonnés" }),
          correction:
            "a) Les nombres de l'axe sont 60, 65, 70, 75, 80, 85 : il va de 5 en 5, et il commence à 60, pas à 0.\nb) La barre de 2022 s'arrête sur la ligne 70 : 70 000 abonnés. Celle de 2025 sur la ligne 85 : 85 000 abonnés.\nc) Sur le dessin, chaque barre part de 60.\nLa barre de 2022 monte de $70 - 60 = 10$ ; celle de 2025, de $85 - 60 = 25$.\n$25 \\div 10 = 2{,}5$ : sur le dessin, elle paraît 2,5 fois plus haute.\nd) Doubler 70 000 donnerait $2 \\times 70 = 140$ milliers. On n'en a que 85 : non.\nL'appli a gagné $85 - 70 = 15$ milliers d'abonnés, une hausse réelle mais modeste.\n⭐ Avec un axe qui part de 0, la barre de 2025 ne serait qu'environ 1,2 fois plus haute : $85 \\div 70 \\approx 1{,}2$.\n⛔ Le piège : juger à l'œil. Un axe qui ne part pas de 0 (on dit « tronqué ») grossit les écarts. Je lis toujours le premier nombre de l'axe.\nRéponse : a) de 5 en 5, à partir de 60 ; b) 70 000 et 85 000 ; c) 2,5 fois ; d) non, 15 000 abonnés de plus seulement.",
          micros: ["stat_lire_graphique", "stat_donnee_defi"],
        },
        {
          enonce:
            "Une monitrice d'auto-école relève le nombre de fautes de ses 50 candidats à l'examen du code de la route. L'examen compte 40 questions. Il est réussi avec 5 fautes au plus.\na) Combien de candidats ont fait exactement 3 fautes ?\nb) Vérifie l'effectif total.\nc) Combien de candidats ont réussi l'examen ?\nd) Quelle est la fréquence de réussite, en pourcentage ?\ne) Quelle est la fréquence d'échec, en pourcentage ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "50" },
            { question: "c)", attendu: "36" },
            { question: "d)", attendu: "72 %" },
            { question: "e)", attendu: "28 %" },
          ],
          figure: grille(["fautes", "candidats"], [
            [0, 2],
            [1, 4],
            [2, 6],
            [3, 9],
            [4, 8],
            [5, 7],
            [6, 6],
            [7, 5],
            [8, 3],
          ]),
          correction:
            "La valeur : le nombre de fautes. L'effectif : le nombre de candidats.\na) Ligne « 3 fautes » : 9 candidats.\nb) $2 + 4 + 6 + 9 + 8 + 7 + 6 + 5 + 3 = 50$ candidats. Le compte est bon.\nc) « 5 fautes au plus », c'est 0, 1, 2, 3, 4 ou 5 fautes.\n$2 + 4 + 6 + 9 + 8 + 7 = 36$ candidats.\nd) $36 \\div 50 = 0{,}72$, soit 72 %.\ne) Les autres ont échoué : $50 - 36 = 14$ candidats. $14 \\div 50 = 0{,}28$, soit 28 %.\nContrôle : $72 + 28 = 100$. Le compte est bon.\n⛔ Le piège au c) : oublier les candidats à 5 fautes. « Au plus 5 », c'est 5 compris : 36 et non 29.\nRéponse : a) 9 ; b) 50 ; c) 36 candidats ; d) 72 % ; e) 28 %.",
          micros: ["stat_lire_tableau", "stat_effectif", "stat_frequence"],
        },
        {
          enonce:
            "Une agronome surveille une maladie des plants de tomates dans deux serres. Serre A : 300 plants, dont 45 malades. Serre B : 200 plants, dont 36 malades.\na) Quelle serre a le plus de plants malades ?\nb) Calcule la fréquence des plants malades dans chaque serre, en pourcentage.\nc) Quelle serre est la plus touchée par la maladie ?\nd) Quelle est la fréquence des plants malades dans les deux serres réunies, en pourcentage ?",
          reponses: [
            { question: "a)", attendu: ["A", "la serre A", "serre A"] },
            { question: "b) A", attendu: "15 %" },
            { question: "b) B", attendu: "18 %" },
            { question: "c)", attendu: ["B", "la serre B", "serre B"] },
            { question: "d)", attendu: "16,2 %" },
          ],
          correction:
            "a) 45 malades contre 36 : la serre A en a le plus.\nb) Serre A : $45 \\div 300 = 0{,}15$, soit 15 %.\nSerre B : $36 \\div 200 = 0{,}18$, soit 18 %.\nc) 18 % est plus que 15 % : la serre B est la plus touchée, alors qu'elle a moins de plants malades.\nPour comparer deux groupes de tailles différentes, je compare les FRÉQUENCES, pas les effectifs.\nd) Je réunis les deux serres : $45 + 36 = 81$ malades sur $300 + 200 = 500$ plants.\n$81 \\div 500 = 0{,}162$, soit 16,2 %.\n⛔ Le piège au d) : faire la moyenne des deux pourcentages, $(15 + 18) \\div 2 = 16{,}5$. La serre A, plus grande, pèse plus : je repars des effectifs.\nRéponse : a) la serre A ; b) 15 % et 18 % ; c) la serre B ; d) 16,2 %.",
          schema: ecranSeulement(
            barres([
              { label: "serre A", value: 15 },
              { label: "serre B", value: 18 },
            ], { surligne: 1, unite: "% de malades" }),
          ),
          micros: ["stat_frequence", "stat_donnee_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des données du monde réel, plusieurs étapes. Je lis, je calcule, je contrôle, puis je réponds par une phrase qui cite les nombres.",
      rappel: [
        "Je repère l'effectif total AVANT de calculer une fréquence.",
        "Un pourcentage d'un total : je multiplie le total par le décimal (42 % de 400 : $0{,}42 \\times 400$).",
        "Pour dire « vrai », je montre le calcul qui le prouve.",
      ],
      exercices: [
        {
          titre: "Les 206 os du squelette",
          enonce:
            "Une paléoanthropologue reconstitue le squelette d'un être humain adulte, trouvé lors d'une fouille. Un squelette adulte compte 206 os. Le tableau les range par partie du corps.\na) Combien d'os compte « le reste du corps » (épaules, bras, bassin, jambes, oreilles…) ?\nb) Quelle est la fréquence des os des deux mains ? Donne un décimal arrondi au centième.\nc) Vrai ou faux : « Plus d'un quart des os du corps sont dans les mains. »\nd) Vrai ou faux : « Plus de la moitié des os du corps sont dans les mains et les pieds. »",
          reponses: [
            { question: "a)", attendu: "27" },
            { question: "b)", attendu: "0,26", tolerance: 0.005 },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: ["oui", "vrai"] },
          ],
          figure: grille(["partie du corps", "os"], [
            ["les deux mains", 54],
            ["les deux pieds", 52],
            ["la colonne vertébrale", 26],
            ["la cage thoracique", 25],
            ["le crâne", 22],
            ["le reste du corps", "?"],
          ]),
          correction:
            "a) J'additionne les os connus : $54 + 52 + 26 + 25 + 22 = 179$.\nJe les retire du total : $206 - 179 = 27$ os pour le reste du corps.\nb) $54 \\div 206 \\approx 0{,}262$, soit environ $0{,}26$.\nc) Un quart, c'est $0{,}25$. Et $0{,}26$ est plus grand : vrai.\nAutre preuve : le quart de 206 est $206 \\div 4 = 51{,}5$, et 54 dépasse $51{,}5$.\nd) Mains et pieds : $54 + 52 = 106$ os. La moitié de 206 est $206 \\div 2 = 103$.\n106 dépasse 103 : vrai. Plus de la moitié de nos os sont dans les mains et les pieds.\n⭐ Ce sont aussi les os les plus petits : les plus difficiles à retrouver dans une fouille.\n⛔ Le piège au a) : oublier une ligne dans l'addition. Contrôle : $179 + 27 = 206$.\nRéponse : a) 27 os ; b) environ $0{,}26$ ; c) vrai ; d) vrai.",
          micros: ["stat_lire_tableau", "stat_effectif", "stat_frequence", "stat_donnee_defi"],
        },
        {
          titre: "La collecte de sang",
          enonce:
            "Un infirmier de l'Établissement français du sang prépare une collecte. Le diagramme donne la répartition des groupes sanguins en France. Il attend 400 donneurs, répartis comme dans toute la France.\na) Quel est le groupe sanguin le plus répandu ?\nb) Combien de donneurs du groupe O peut-il attendre ?\nc) Combien de donneurs du groupe AB ?\nd) Sans tenir compte du rhésus, un malade du groupe B peut recevoir du sang B ou O. Quelle part des donneurs lui convient ? Est-ce plus de la moitié ?\ne) Quel est l'angle du secteur du groupe A ?",
          reponses: [
            { question: "a)", attendu: ["A", "le groupe A", "groupe A"] },
            { question: "b)", attendu: "168" },
            { question: "c)", attendu: "16" },
            { question: "d) part", attendu: "51 %" },
            { question: "d) moit.", attendu: ["oui", "vrai"] },
            { question: "e)", attendu: "162" },
          ],
          figure: camembert([
            { label: "A", value: 45 },
            { label: "O", value: 42 },
            { label: "B", value: 9 },
            { label: "AB", value: 4 },
          ], false, true),
          correction:
            "a) La plus grande part est 45 % : le groupe A.\nb) 42 % de 400 : $0{,}42 \\times 400 = 168$ donneurs.\nc) 4 % de 400 : $0{,}04 \\times 400 = 16$ donneurs.\nd) Groupes B et O réunis : $9 + 42 = 51$, soit 51 %. C'est plus de 50 % : oui, plus de la moitié.\nSur 400 donneurs : $0{,}51 \\times 400 = 204$ donneurs lui conviennent.\ne) $0{,}45 \\times 360 = 162$°.\nContrôle des effectifs : A, $0{,}45 \\times 400 = 180$ ; B, $0{,}09 \\times 400 = 36$. $180 + 168 + 36 + 16 = 400$.\n⛔ Le piège au b) : répondre 42 donneurs. 42 est un pourcentage : 42 sur 100, pas 42 sur 400.\nRéponse : a) le groupe A ; b) 168 ; c) 16 ; d) 51 %, oui ; e) 162°.",
          micros: ["stat_lire_graphique", "stat_frequence", "stat_donnee_defi"],
        },
        {
          titre: "Les 88 touches du piano",
          enonce:
            "Une accordeuse de piano règle les 88 touches d'un piano. Une octave compte 12 touches : 7 blanches et 5 noires. Le piano compte 7 octaves entières, plus 4 touches : 3 blanches et 1 noire.\na) Combien de touches dans les 7 octaves entières ? Vérifie qu'on trouve bien 88 touches en tout.\nb) Combien de touches blanches compte le piano ? Combien de noires ?\nc) Quelle est la fréquence des touches noires dans une octave ? Et sur le piano entier ? Donne des fractions simplifiées.\nd) Arrondis ces deux fréquences au centième. Sont-elles égales ?",
          reponses: [
            { question: "a) 7 oct", attendu: "84" },
            { question: "a) total", attendu: "88" },
            { question: "b) blan.", attendu: "52" },
            { question: "b) noir.", attendu: "36" },
            { question: "c) oct.", attendu: ["5/12"], exact: true },
            { question: "c) piano", attendu: ["9/22"], exact: true },
            { question: "d) oct.", attendu: "0,42", tolerance: 0.005 },
            { question: "d) piano", attendu: "0,41", tolerance: 0.005 },
            { question: "d) égal?", attendu: ["non", "faux"] },
          ],
          correction:
            "a) $7 \\times 12 = 84$ touches. Avec les 4 autres : $84 + 4 = 88$. Le compte est bon.\nb) Blanches : $7 \\times 7 + 3 = 52$. Noires : $7 \\times 5 + 1 = 36$.\nContrôle : $52 + 36 = 88$.\nc) Dans une octave : $\\dfrac{5}{12}$ (on ne peut pas simplifier).\nSur le piano : $\\dfrac{36}{88}$. Je simplifie par 4 : $\\dfrac{36}{88} = \\dfrac{9}{22}$.\nd) $5 \\div 12 \\approx 0{,}417$, soit environ $0{,}42$.\n$9 \\div 22 \\approx 0{,}409$, soit environ $0{,}41$.\nElles sont proches, mais pas égales : les 4 touches du bout ont moins de noires qu'une octave.\n⛔ Le piège au c) : croire que la fréquence du piano est celle d'une octave. Le piano n'est pas fait que d'octaves entières.\nRéponse : a) 84, puis 88 ; b) 52 blanches, 36 noires ; c) $\\dfrac{5}{12}$ et $\\dfrac{9}{22}$ ; d) $0{,}42$ et $0{,}41$, pas égales.",
          schema: ecranSeulement(
            grille(["touches", "blanches", "noires", "total"], [
              ["une octave", 7, 5, 12],
              ["7 octaves", 49, 35, 84],
              ["4 du bout", 3, 1, 4],
              ["le piano", 52, 36, 88],
            ], { total: true }),
          ),
          micros: ["stat_effectif", "stat_frequence", "stat_donnee_defi"],
        },
        {
          titre: "La cagnotte de l'association",
          enonce:
            "Une conseillère bancaire aide une association à déposer sa cagnotte. Elle trie les pièces : le tableau donne le nombre de pièces de chaque sorte.\na) Combien de pièces la cagnotte contient-elle ?\nb) Quelle est la fréquence des pièces de 2 €, en pourcentage ?\nc) Calcule ce que vaut chaque sorte de pièces, puis le montant total de la cagnotte.\nd) Quelle part de l'argent les pièces de 2 € représentent-elles ? Arrondis au pour cent.\ne) Léa dit : « Les pièces de 2 € sont 13 % des pièces, donc 13 % de l'argent. » A-t-elle raison ?",
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "13 %" },
            { question: "c)", attendu: "58,40" },
            { question: "d)", attendu: "45 %", tolerance: 0.5 },
            { question: "e)", attendu: ["non", "faux"] },
          ],
          figure: grille(["pièce", "nombre"], [
            ["10 c", 24],
            ["20 c", 30],
            ["50 c", 18],
            ["1 €", 15],
            ["2 €", 13],
          ]),
          correction:
            "a) $24 + 30 + 18 + 15 + 13 = 100$ pièces.\nb) $13 \\div 100 = 0{,}13$, soit 13 %.\nc) 10 c : $24 \\times 0{,}10 = 2{,}40$ €. 20 c : $30 \\times 0{,}20 = 6$ €. 50 c : $18 \\times 0{,}50 = 9$ €.\n1 € : $15 \\times 1 = 15$ €. 2 € : $13 \\times 2 = 26$ €.\nTotal : $2{,}40 + 6 + 9 + 15 + 26 = 58{,}40$ €.\nd) $26 \\div 58{,}40 \\approx 0{,}445$, soit environ 45 %.\ne) Non. Les pièces de 2 € sont 13 % des PIÈCES, mais elles valent environ 45 % de l'ARGENT : chacune vaut beaucoup plus qu'une pièce de 10 c.\n⛔ Le piège : confondre deux totaux. Une fréquence dépend de ce qu'on compte : des pièces (100) ou des euros ($58{,}40$).\nRéponse : a) 100 pièces ; b) 13 % ; c) $58{,}40$ € ; d) environ 45 % ; e) non.",
          schema: ecranSeulement(
            barres([
              { label: "10 c", value: 2.4 },
              { label: "20 c", value: 6 },
              { label: "50 c", value: 9 },
              { label: "1 €", value: 15 },
              { label: "2 €", value: 26 },
            ], { surligne: 4, unite: "euros" }),
          ),
          micros: ["stat_lire_tableau", "stat_effectif", "stat_frequence", "stat_donnee_defi"],
        },
      ],
    },
  ],
};
