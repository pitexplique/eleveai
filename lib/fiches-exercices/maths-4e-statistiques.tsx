// ─── Fiche d'exercices : les statistiques (4e) — 20 exercices corrigés ────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-statistiques.tsx` et sur
// les six micros du coach de 4e (notionId stat_statistique). ⛔ La notion a été
// SCINDÉE le 28/08/2026 : lire un tableau ou un graphique, compter des
// effectifs, calculer des fréquences, c'est `stat_donnee`, qui a sa propre
// feuille. Celle-ci garde les INDICATEURS : moyenne (simple et pondérée),
// médiane, étendue, et ce qu'ils disent. ⛔ Ni quartiles, ni boîte, ni écart
// type (seconde) ; aucune micro de `stat_donnee` n'est citée, même quand un
// exercice part d'un tableau d'effectifs.
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 4 ; 7 ; 10 ; 15, ni les
// notes 8 / 12 / 16 d'effectifs 3 / 5 / 2, ni 3 ; 8 ; 8 ; 9 ; 12, ni 5 ; 10 ;
// 15, ni 4 ; 8 ; 10 ; 14, ni les deux séries de moyenne 9, ni les 135 élèves et
// leurs moyens de transport. ⛔ Ni ceux de la feuille de 3e (buts d'une équipe,
// pluie et températures de Paris, basketteuses, frères et sœurs, coureurs du
// 10 km, volley, médailles de Paris 2024, podomètre, livres de l'été, orage,
// cycliste, classe de 24, Kipchoge, salaires, portrait-robot de cinq notes).
//
// ⭐ LE FIL : la moyenne PARTAGE, la médiane COUPE EN DEUX, l'étendue MESURE
// L'ÉCART — et une valeur à l'écart ne pèse pas pareil sur les trois (8, 12,
// 14, 17, 18).
// Les pièges nommés : une valeur répétée comptée une seule fois (1), la médiane
// lue sans ranger (2, 3, 9), l'étendue « dernière moins première » (4), diviser
// par le nombre de valeurs DIFFÉRENTES (5, 10), les signes oubliés dans une
// moyenne de relatifs (6), l'étendue retranchée du minimum (7), croire que la
// moyenne coupe le groupe en deux (8), viser la note qu'on veut au lieu du
// total (11), « en moyenne » pris pour « d'habitude » (12), la médiane cherchée
// parmi les valeurs et non parmi les rangs (13, 15), la faute de frappe qui ne
// « changerait presque rien » (14), la moyenne de deux moyennes (16), un
// indicateur « typique » sur une série à deux familles (17), deux séries de même
// moyenne jugées pareilles (18), l'ancienne médiane gardée après un ajout (19),
// chercher des valeurs au hasard au lieu de partir du total (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - diamètres équatoriaux des planètes, NASA Planetary Fact Sheet (NSSDCA) :
//   Mercure 4 879 km, Vénus 12 104, Terre 12 756, Mars 6 792, Jupiter 142 984,
//   Saturne 120 536, Uranus 51 118, Neptune 49 528 — arrondis au millier de km
//   dans la feuille (5, 12, 13, 7, 143, 121, 51, 50) — ex. 17 ;
// - la durée des mois du calendrier grégorien (28, 30 ou 31 jours ; 29 pour
//   février d'une année bissextile, dont 2028) — ex. 10.
// Le reste (nageur, chênes, chats, pointures, températures de Strasbourg,
// course d'orientation, ruches, notes, maisons, voitures, trajets en bus, QCM,
// devoir commun, panneaux solaires, cigognes, randonnées) est INVENTÉ, à des
// ordres de grandeur vraisemblables, et dit comme tel quand il le faut.
//
// ⭐ LES VINGT CORRIGÉS SONT DESSINÉS (« les élèves adorent les schémas ») :
//   · `barres` — un diagramme en barres en SVG local, avec la MOYENNE en ligne
//     pointillée rouge (on voit qu'elle égalise) et l'ÉTENDUE en crochet orange
//     entre la plus petite et la plus grande barre ; il sait les relatifs (ex. 6) ;
//   · `rangee` — la série RANGÉE en cases numérotées par leur rang, la ou les
//     cases du milieu en orange, la coupure en deux moitiés et la médiane
//     écrite dessous : le geste de la médiane, dessiné ;
//   · `grille` — le tableau valeur / effectif / produit (ou cumul) de la
//     moyenne pondérée et de la médiane par les rangs, en HTML.
// ⛔ MESURÉ À 375 PX (consigne du 25/09) : le `diagramme` partagé de figures.tsx
// (viewBox 300, texte en 12) tombait à 9,4 px. `barres` et `rangee` ont un
// viewBox de 230-232 pour un dessin rendu à ~235 px : texte en 12-13 → 12 à
// 13 px, rangs en 11 → 11,1 px. D'où huit barres au plus, neuf cases au plus,
// étiquettes de trois signes. Le script de recalcul le contrôle.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-statistiques-4e.mjs`.
//
// Micro-compétences : stat_moyenne (1, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16,
// 17, 18, 19, 20), stat_mediane (2, 3, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19,
// 20), stat_etendue (4, 7, 9, 10, 14, 15, 17, 18, 20), stat_interpreter (8, 12,
// 13, 14, 17, 18), stat_probleme (7, 16, 17, 18, 20), stat_defi (11, 19, 20).
// 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";

/** 18.5 → « 18,5 », −4 → « −4 » : le texte NU d'un dessin (SVG, pas de KaTeX). */
const fr = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",").replace("-", "−");

type Barre = { label: string; value: number };

/**
 * Un diagramme en barres, en SVG local (viewBox 230, voir l'en-tête).
 * `moyenne` : la ligne pointillée rouge ; `etendue` : le crochet orange de la
 * plus petite à la plus grande barre ; `surligne` : une barre en orange.
 * ⭐ Le script de recalcul RELIT `{ label, value }` et `moyenne` : en clair.
 */
const barres = (data: Barre[], opts: { moyenne?: number; etendue?: boolean; surligne?: number } = {}) => {
  const W = 230;
  const G = 14;
  const D = opts.etendue ? 34 : 10;
  const HAUT = 24;
  const BAS = 128;
  const vals = data.map((d) => d.value);
  const vmax = Math.max(0, ...vals, opts.moyenne ?? 0);
  const vmin = Math.min(0, ...vals, opts.moyenne ?? 0);
  const k = (BAS - HAUT) / (vmax - vmin || 1);
  const y = (v: number) => HAUT + (vmax - v) * k;
  const negatif = vmin < 0;
  const slot = (W - G - D) / data.length;
  const bw = Math.min(26, slot * 0.62);
  const yLabels = BAS + (negatif ? 30 : 17);
  const [mini, maxi] = [Math.min(...vals), Math.max(...vals)];
  const xCrochet = W - D + 18;
  const legendes: { texte: string; couleur: string; trait: "tirets" | "crochet" }[] = [];
  if (opts.moyenne !== undefined) legendes.push({ texte: `moyenne : ${fr(opts.moyenne)}`, couleur: ROUGE, trait: "tirets" });
  if (opts.etendue) legendes.push({ texte: `étendue : ${fr(maxi)} − ${fr(mini)} = ${fr(maxi - mini)}`, couleur: ORANGE, trait: "crochet" });
  const H = yLabels + 10 + legendes.length * 18;
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres">
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        <line x1="10" y1={HAUT - 8} x2="10" y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1="10" y1={y(0)} x2={W - D + 4} y2={y(0)} stroke="#0f172a" strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          const actif = opts.surligne === i;
          const haut = Math.min(y(d.value), y(0));
          return (
            <g key={i}>
              <rect x={x} y={haut} width={bw} height={Math.abs(y(d.value) - y(0))} rx="3" fill={actif ? "#fed7aa" : "#bfdbfe"} stroke={actif ? ORANGE : BLEU} strokeWidth={actif ? 2.5 : 1.5} />
              <text x={x + bw / 2} y={d.value >= 0 ? y(d.value) - 5 : y(d.value) + 14} textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                {fr(d.value)}
              </text>
              <text x={x + bw / 2} y={yLabels} textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">
                {d.label}
              </text>
            </g>
          );
        })}
        {opts.moyenne !== undefined ? (
          <line x1="10" y1={y(opts.moyenne)} x2={W - D + 4} y2={y(opts.moyenne)} stroke={ROUGE} strokeWidth="2" strokeDasharray="6 4" />
        ) : null}
        {opts.etendue ? (
          <g stroke={ORANGE} strokeWidth="2">
            <line x1={G} y1={y(maxi)} x2={xCrochet} y2={y(maxi)} strokeDasharray="2 3" strokeWidth="1.2" />
            <line x1={G} y1={y(mini)} x2={xCrochet} y2={y(mini)} strokeDasharray="2 3" strokeWidth="1.2" />
            <line x1={xCrochet} y1={y(maxi)} x2={xCrochet} y2={y(mini)} />
            <line x1={xCrochet - 5} y1={y(maxi)} x2={xCrochet + 5} y2={y(maxi)} />
            <line x1={xCrochet - 5} y1={y(mini)} x2={xCrochet + 5} y2={y(mini)} />
          </g>
        ) : null}
        {legendes.map((l, j) => {
          const yl = yLabels + 20 + j * 18;
          return (
            <g key={j}>
              {l.trait === "tirets" ? (
                <line x1="14" y1={yl - 4} x2="34" y2={yl - 4} stroke={l.couleur} strokeWidth="2" strokeDasharray="6 4" />
              ) : (
                <path d={`M 19 ${yl - 10} H 29 M 24 ${yl - 10} V ${yl + 2} M 19 ${yl + 2} H 29`} stroke={l.couleur} strokeWidth="2" fill="none" />
              )}
              <text x="40" y={yl} fontSize="12" fontWeight="800" fill={l.couleur}>
                {l.texte}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * La série RANGÉE, case par case, pour la médiane (viewBox 232) : le rang au-
 * dessus de chaque case, la ou les cases du milieu en orange, la coupure en
 * deux moitiés, et la médiane écrite dessous.
 * ⭐ Le script de recalcul vérifie que `valeurs` est bien la série de l'énoncé
 * RANGÉE, et que `mediane` est la sienne.
 */
const rangee = (valeurs: number[], mediane: number) => {
  const W = 232;
  const n = valeurs.length;
  const bw = Math.min(34, Math.floor(208 / n));
  const x0 = (W - n * bw) / 2;
  const milieu = n % 2 ? [(n - 1) / 2] : [n / 2 - 1, n / 2];
  const larg = Math.max(...valeurs.map((v) => fr(v).length));
  const police = larg * 8 + 4 <= bw ? 13 : 12;
  const coupe = x0 + (n / 2) * bw;
  const cote = Math.floor(n / 2);
  const [gFin, dDebut] = n % 2 ? [x0 + cote * bw, x0 + (cote + 1) * bw] : [coupe, coupe];
  const crochet = (a: number, b: number) => `M ${a + 2} 60 V 66 H ${b - 2} V 60`;
  const nb = `${cote} valeur${cote > 1 ? "s" : ""}`;
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} 110`} className="block h-auto w-full" role="img" aria-label="Série rangée et médiane">
        <rect x="0" y="0" width={W} height="110" rx="10" fill="#fff" />
        {valeurs.map((v, i) => {
          const actif = milieu.includes(i);
          const x = x0 + i * bw;
          return (
            <g key={i}>
              <text x={x + bw / 2} y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">
                {i + 1}
              </text>
              <rect x={x} y="22" width={bw} height="30" fill={actif ? "#fed7aa" : "#eff6ff"} stroke={actif ? ORANGE : BLEU} strokeWidth={actif ? 2.5 : 1.2} />
              <text x={x + bw / 2} y="42" textAnchor="middle" fontSize={police} fontWeight="800" fill="#0f172a">
                {fr(v)}
              </text>
            </g>
          );
        })}
        <line x1={coupe} y1="18" x2={coupe} y2="58" stroke={ROUGE} strokeWidth="2" strokeDasharray="4 3" />
        <path d={`${crochet(x0, gFin)} ${crochet(dDebut, x0 + n * bw)}`} stroke="#64748b" strokeWidth="1.5" fill="none" />
        <text x={(x0 + gFin) / 2} y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">
          {nb}
        </text>
        <text x={(dDebut + x0 + n * bw) / 2} y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">
          {nb}
        </text>
        <text x={W / 2} y="101" textAnchor="middle" fontSize="13" fontWeight="900" fill={ORANGE}>
          {`médiane : ${fr(mediane)}`}
        </text>
      </svg>
    </div>
  );
};

/**
 * Le tableau d'un corrigé, plusieurs lignes : valeur, effectif, produit ou
 * cumul. Du HTML — lisible à toutes les largeurs. `total` met la dernière ligne
 * en gras ; `surligne` met une ligne en orange (celle de la médiane).
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

/** Deux dessins côte à côte (empilés sur téléphone). */
const DEUX = "grid grid-cols-1 gap-3 sm:grid-cols-2 print:grid-cols-2 print:items-start";

export const exercicesStatistiques4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "stat-statistique",
  titre: "Statistiques : moyenne, médiane, étendue",
  accroche:
    "Vingt exercices, du geste seul au problème : la moyenne qui partage (avec des effectifs, avec des nombres négatifs), la médiane qu'on trouve en rangeant d'abord, l'étendue qui mesure l'écart, puis le vrai travail : dire ce que ces nombres racontent. Des chênes, des chats, des ruches, des cigognes, des panneaux solaires, et les huit planètes du Système solaire. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi, le piège nommé et un dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/stat-statistique", titre: "Les statistiques" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : additionner puis partager, ranger puis couper, mesurer l'écart.",
      rappel: [
        "MOYENNE : j'additionne toutes les valeurs, puis je divise par leur NOMBRE. Elle tombe toujours entre la plus petite et la plus grande valeur.",
        "MÉDIANE : je RANGE d'abord. Nombre impair de valeurs : celle du milieu. Nombre pair : la moyenne des deux valeurs du milieu.",
        "ÉTENDUE : la plus grande valeur moins la plus petite. C'est un écart, pas un maximum.",
      ],
      exercices: [
        {
          enonce: "Un nageur chronomètre ses cinq longueurs de $50$ m, en secondes : $42$, $45$, $44$, $47$, $42$. Calculer son temps moyen pour une longueur.",
          correction:
            "J'additionne les cinq temps, puis je divise par le nombre de longueurs, $5$.\n$42 + 45 + 44 + 47 + 42 = 220$, et $\\dfrac{220}{5} = 44$.\n⭐ Contrôle : $44$ est bien entre le temps le plus court, $42$ s, et le plus long, $47$ s. Sur le dessin, la ligne rouge de la moyenne passe au milieu des barres : ce qui dépasse au-dessus comble ce qui manque en dessous.\n⛔ Le piège : ne compter qu'une fois le temps $42$, qui revient deux fois : $\\dfrac{42 + 45 + 44 + 47}{4} = 44{,}5$. Chaque longueur compte, même si son temps se répète.\nRéponse : il nage une longueur en $44$ s en moyenne.",
          schema: barres([{ label: "L1", value: 42 }, { label: "L2", value: 45 }, { label: "L3", value: 44 }, { label: "L4", value: 47 }, { label: "L5", value: 42 }], { moyenne: 44 }),
          micros: ["stat_moyenne"],
        },
        {
          enonce: "Une classe a planté sept jeunes chênes. Un an plus tard, elle mesure leur hauteur, en cm, arbre par arbre : $64$, $81$, $58$, $90$, $72$, $69$, $77$. Déterminer la hauteur médiane.",
          correction:
            "Je RANGE d'abord, du plus petit au plus grand : $58$, $64$, $69$, $72$, $77$, $81$, $90$.\nIl y a $7$ valeurs, un nombre impair : la médiane est la valeur du milieu, la $4^e$, avec $3$ valeurs de chaque côté.\nDonc la médiane est $72$ cm.\n⛔ Le piège : prendre la $4^e$ valeur de la liste non rangée, $90$ : c'est le plus grand chêne, pas celui du milieu.\nRéponse : la hauteur médiane est $72$ cm : au moins la moitié des chênes mesure $72$ cm ou moins.",
          schema: rangee([58, 64, 69, 72, 77, 81, 90], 72),
          micros: ["stat_mediane"],
        },
        {
          enonce: "Une station météo relève la température à midi pendant six jours de mai, en °C : $17$, $21$, $15$, $19$, $24$, $18$. Déterminer la température médiane.",
          correction:
            "Je range : $15$, $17$, $18$, $19$, $21$, $24$.\nIl y a $6$ valeurs, un nombre pair : aucune n'est au milieu. La médiane est la moyenne des deux valeurs centrales, la $3^e$ et la $4^e$ : $\\dfrac{18 + 19}{2} = 18{,}5$.\n⭐ $18{,}5$ n'est aucune des valeurs, et ce n'est pas grave : $3$ jours sont en dessous, $3$ au-dessus.\n⛔ Le piège : prendre les deux valeurs du milieu SANS ranger, la $3^e$ et la $4^e$ de la liste : $\\dfrac{15 + 19}{2} = 17$.\nRéponse : la température médiane est $18{,}5$ °C.",
          schema: rangee([15, 17, 18, 19, 21, 24], 18.5),
          micros: ["stat_mediane"],
        },
        {
          enonce: "Une vétérinaire pèse les six chats d'un refuge, de C1 à C6, en kg : $4{,}2$ ; $3{,}6$ ; $5{,}1$ ; $4{,}8$ ; $3{,}9$ ; $4{,}5$. Calculer l'étendue de cette série.",
          correction:
            "L'étendue mesure l'écart entre les deux extrêmes : la plus grande valeur moins la plus petite.\nLe chat le plus lourd pèse $5{,}1$ kg (C3), le plus léger $3{,}6$ kg (C2).\nÉtendue : $5{,}1 - 3{,}6 = 1{,}5$ kg.\n⛔ Le piège : faire « dernière moins première » dans la liste, $4{,}5 - 4{,}2 = 0{,}3$. Les extrêmes ne sont ni au début ni à la fin : je les cherche.\nRéponse : l'étendue est $1{,}5$ kg : entre le chat le plus léger et le plus lourd, il y a $1{,}5$ kg.",
          schema: barres([{ label: "C1", value: 4.2 }, { label: "C2", value: 3.6 }, { label: "C3", value: 5.1 }, { label: "C4", value: 4.8 }, { label: "C5", value: 3.9 }, { label: "C6", value: 4.5 }], { etendue: true }),
          micros: ["stat_etendue"],
        },
        {
          enonce: "Le tableau donne les pointures des $20$ joueuses d'un club de handball. Calculer la pointure moyenne.",
          figure: tableau(["Pointure", "37", "38", "39", "40"], ["Joueuses", 3, 6, 7, 4]),
          correction:
            "Chaque pointure compte autant de fois qu'il y a de joueuses qui la portent : je multiplie chaque pointure par son effectif, j'additionne, puis je divise par le nombre TOTAL de joueuses.\nEffectif total : $3 + 6 + 7 + 4 = 20$ joueuses.\nSomme : $37 \\times 3 + 38 \\times 6 + 39 \\times 7 + 40 \\times 4 = 111 + 228 + 273 + 160 = 772$.\nMoyenne : $\\dfrac{772}{20} = 38{,}6$.\n⭐ Contrôle : $38{,}6$ est bien entre $37$ et $40$.\n⛔ Le piège : diviser par $4$, le nombre de pointures DIFFÉRENTES : $\\dfrac{772}{4} = 193$, une pointure de géant.\nRéponse : la pointure moyenne est $38{,}6$.",
          schema: grille(["Pointure", "Joueuses", "Pointure × joueuses"], [[37, 3, 111], [38, 6, 228], [39, 7, 273], [40, 4, 160], ["Total", 20, 772]], { total: true }),
          micros: ["stat_moyenne"],
        },
        {
          enonce: "À Strasbourg, un élève relève la température à $7$ h du matin pendant une semaine d'école de janvier, en °C : lundi $-4$, mardi $-1$, mercredi $2$, jeudi $-3$, vendredi $1$. Calculer la température moyenne.",
          correction:
            "J'additionne les cinq températures AVEC leurs signes, puis je divise par $5$.\n$(-4) + (-1) + 2 + (-3) + 1 = -5$.\n$\\dfrac{-5}{5} = -1$.\n⭐ Contrôle : $-1$ est bien entre la plus basse, $-4$, et la plus haute, $2$.\n⛔ Le piège : oublier les signes « moins » : $\\dfrac{4 + 1 + 2 + 3 + 1}{5} = 2{,}2$. Une moyenne au-dessus de zéro alors que trois matins sur cinq ont gelé : impossible.\nRéponse : la température moyenne est $-1$ °C.",
          schema: barres([{ label: "Lun", value: -4 }, { label: "Mar", value: -1 }, { label: "Mer", value: 2 }, { label: "Jeu", value: -3 }, { label: "Ven", value: 1 }], { moyenne: -1 }),
          micros: ["stat_moyenne"],
        },
        {
          enonce: "Lors d'une course d'orientation, le coureur le plus rapide a mis $38$ min. L'étendue des temps est de $12$ min.\na) Quel est le temps du coureur le plus lent ?\nb) Un coureur dit avoir mis $52$ min. Est-ce possible ?",
          correction:
            "a) L'étendue est le plus grand temps moins le plus petit. Le plus petit temps, c'est celui du plus rapide, $38$ min. Donc le plus lent a mis $38 + 12 = 50$ min.\nb) Non : aucun temps ne dépasse celui du plus lent, $50$ min. D'ailleurs $52 - 38 = 14$, plus que l'étendue.\n⛔ Le piège : calculer $38 - 12 = 26$ min. Le plus rapide a le PLUS PETIT temps : le plus lent est au-dessus, pas en dessous.\nRéponse : le plus lent a mis $50$ min ; $52$ min est impossible.",
          schema: barres([{ label: "rapide", value: 38 }, { label: "lent", value: 50 }], { etendue: true }),
          micros: ["stat_etendue", "stat_probleme"],
        },
        {
          enonce: "Dans un groupe de cinq élèves, les notes d'un devoir sont : $14$, $2$, $13$, $12$, $14$. La moyenne du groupe est $11$. Léa a eu $12$ et dit : « J'ai plus que la moyenne, donc je suis dans la meilleure moitié du groupe. » A-t-elle raison ?",
          correction:
            "Je vérifie d'abord la moyenne : $\\dfrac{14 + 2 + 13 + 12 + 14}{5} = \\dfrac{55}{5} = 11$.\nCe qui coupe le groupe en deux moitiés, ce n'est pas la moyenne, c'est la MÉDIANE. Je range : $2$, $12$, $13$, $14$, $14$. $5$ valeurs : la médiane est la $3^e$, $13$.\nLéa, avec $12$, est SOUS la médiane : elle est l'avant-dernière du groupe.\nPourquoi la moyenne est-elle si basse ? La note $2$, très à l'écart, la tire vers le bas.\n⛔ Le piège : croire que la moyenne coupe le groupe en deux. Ici, $4$ élèves sur $5$ ont plus que la moyenne.\nRéponse : non, Léa n'est pas dans la meilleure moitié : la médiane est $13$.",
          schema: rangee([2, 12, 13, 14, 14], 13),
          micros: ["stat_interpreter", "stat_mediane", "stat_moyenne"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme en devoir : diagramme, tableau d'effectifs, valeur manquante, erreur de saisie.",
      rappel: [
        "Avec un tableau d'effectifs : je multiplie chaque valeur par son effectif, j'additionne, puis je divise par l'effectif TOTAL.",
        "La médiane avec des effectifs : j'additionne les effectifs au fur et à mesure (les effectifs cumulés) pour trouver le rang du milieu.",
        "Une moyenne connue donne le TOTAL : moyenne × nombre de valeurs.",
      ],
      exercices: [
        {
          enonce:
            "Un apiculteur a récolté du miel dans ses sept ruches. Le diagramme donne la masse récoltée dans chaque ruche, en kg.\na) Calculer la masse moyenne récoltée par ruche.\nb) Déterminer la médiane.\nc) Calculer l'étendue.\nd) Combien de ruches ont donné plus que la moyenne ?",
          figure: barres([{ label: "R1", value: 18 }, { label: "R2", value: 25 }, { label: "R3", value: 12 }, { label: "R4", value: 30 }, { label: "R5", value: 21 }, { label: "R6", value: 16 }, { label: "R7", value: 25 }]),
          correction:
            "a) Total : $18 + 25 + 12 + 30 + 21 + 16 + 25 = 147$ kg. Moyenne : $\\dfrac{147}{7} = 21$ kg.\nb) Je range : $12$, $16$, $18$, $21$, $25$, $25$, $30$. $7$ valeurs : la médiane est la $4^e$, $21$ kg.\nc) $30 - 12 = 18$ kg.\nd) Plus de $21$ kg : R2 ($25$), R4 ($30$) et R7 ($25$). Cela fait $3$ ruches. R5 donne exactement $21$ kg : ce n'est pas « plus ».\n⭐ Ici, la moyenne et la médiane sont égales : aucune ruche n'est très à l'écart, la série est équilibrée.\n⛔ Le piège au b) : prendre la $4^e$ ruche du diagramme, R4, qui vaut $30$. Le diagramme suit l'ordre des ruches, pas l'ordre des masses.\nRéponse : $21$ kg en moyenne, médiane $21$ kg, étendue $18$ kg, $3$ ruches au-dessus de la moyenne.",
          schema: (
            <div className={DEUX}>
              {rangee([12, 16, 18, 21, 25, 25, 30], 21)}
              {barres([{ label: "R1", value: 18 }, { label: "R2", value: 25 }, { label: "R3", value: 12 }, { label: "R4", value: 30 }, { label: "R5", value: 21 }, { label: "R6", value: 16 }, { label: "R7", value: 25 }], { moyenne: 21, etendue: true })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_etendue"],
        },
        {
          enonce:
            "Dans une année qui n'est pas bissextile, les douze mois, de janvier à décembre, ont $31$, $28$, $31$, $30$, $31$, $30$, $31$, $31$, $30$, $31$, $30$ et $31$ jours.\na) Combien de mois ont $28$ jours ? $30$ jours ? $31$ jours ?\nb) Calculer le nombre moyen de jours par mois, arrondi au dixième.\nc) Déterminer la médiane et l'étendue.\nd) En 2028, année bissextile, février aura $29$ jours. Que deviennent la moyenne, la médiane et l'étendue ?",
          correction:
            "a) $1$ mois de $28$ jours (février), $4$ mois de $30$ jours (avril, juin, septembre, novembre) et $7$ mois de $31$ jours. Contrôle : $1 + 4 + 7 = 12$.\nb) Chaque durée compte autant de fois que son effectif : $28 \\times 1 + 30 \\times 4 + 31 \\times 7 = 28 + 120 + 217 = 365$, le nombre de jours de l'année. Moyenne : $\\dfrac{365}{12} \\approx 30{,}4$ jours.\nc) $12$ valeurs : la médiane est la moyenne des $6^e$ et $7^e$. J'additionne les effectifs dans l'ordre : $1$, puis $5$, puis $12$. Les rangs $6$ à $12$ ont $31$ jours : la $6^e$ et la $7^e$ valeur valent $31$, la médiane est $31$ jours. Étendue : $31 - 28 = 3$ jours.\nd) Le total passe à $366$ jours : moyenne $\\dfrac{366}{12} = 30{,}5$ jours. La médiane ne bouge pas, $31$ jours. L'étendue devient $31 - 29 = 2$ jours.\n⛔ Le piège au c) : répondre $30$, la valeur « du milieu » parmi $28$, $30$ et $31$. La médiane se cherche dans les RANGS des $12$ mois, pas parmi les $3$ valeurs différentes.\nRéponse : $30{,}4$ jours en moyenne, médiane $31$ jours, étendue $3$ jours ; en 2028 : $30{,}5$ jours, $31$ jours et $2$ jours.",
          schema: (
            <div className={DEUX}>
              {grille(["Jours", "Mois", "Cumul", "Jours × mois"], [[28, 1, 1, 28], [30, 4, 5, 120], [31, 7, 12, 217], ["Total", 12, "", 365]], { total: true })}
              {barres([{ label: "28 j", value: 1 }, { label: "30 j", value: 4 }, { label: "31 j", value: 7 }], { surligne: 2 })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_etendue"],
        },
        {
          enonce:
            "Tom a eu $11$, $14$, $9$ et $14$ à ses quatre premiers contrôles de maths. Il reste un contrôle avant le bulletin.\na) Calculer sa moyenne actuelle.\nb) Quelle note doit-il avoir au cinquième contrôle pour finir avec $13$ de moyenne ?\nc) Peut-il finir avec $15$ de moyenne ? (Les notes sont sur $20$.)",
          correction:
            "a) $11 + 14 + 9 + 14 = 48$, et $\\dfrac{48}{4} = 12$.\nb) Une moyenne de $13$ sur $5$ contrôles, c'est un total de $13 \\times 5 = 65$ points. Il en a déjà $48$ : il lui faut $65 - 48 = 17$.\nJe vérifie : $\\dfrac{48 + 17}{5} = \\dfrac{65}{5} = 13$.\nc) Il faudrait un total de $15 \\times 5 = 75$ points, donc $75 - 48 = 27$ au dernier contrôle. Impossible : la note maximale est $20$.\n⛔ Le piège : répondre $13$, la moyenne qu'il vise. Avec $13$ au dernier contrôle, sa moyenne serait $\\dfrac{48 + 13}{5} = 12{,}2$ : la dernière note doit aussi rattraper le retard des quatre premières.\nRéponse : $12$ de moyenne aujourd'hui ; il lui faut $17$ ; $15$ de moyenne est impossible.",
          schema: barres([{ label: "C1", value: 11 }, { label: "C2", value: 14 }, { label: "C3", value: 9 }, { label: "C4", value: 14 }, { label: "C5", value: 17 }], { moyenne: 13, surligne: 4 }),
          micros: ["stat_moyenne", "stat_defi"],
        },
        {
          enonce:
            "Dans une rue, sept maisons ont été vendues cette année. Leurs prix, en milliers d'euros : $180$, $195$, $210$, $200$, $190$, $205$ et $920$ (une grande villa avec piscine).\na) Calculer le prix moyen.\nb) Déterminer le prix médian.\nc) Combien de maisons ont été vendues moins cher que le prix moyen ?\nd) Une agence affiche : « Dans cette rue, une maison se vend en moyenne $300\\,000$ € ». Quel nombre décrit mieux le prix d'une maison ordinaire ?",
          correction:
            "a) $180 + 195 + 210 + 200 + 190 + 205 + 920 = 2\\,100$, et $\\dfrac{2\\,100}{7} = 300$ milliers d'euros, soit $300\\,000$ €.\nb) Je range : $180$, $190$, $195$, $200$, $205$, $210$, $920$. $7$ valeurs : la médiane est la $4^e$, $200$ milliers d'euros.\nc) $6$ maisons sur $7$ : toutes, sauf la villa.\nd) La médiane, $200\\,000$ €. La villa, très à l'écart, tire la moyenne vers le haut. La médiane, elle, ne regarde que le rang du milieu : la villa pourrait valoir le double, la médiane ne bougerait pas.\n⛔ Le piège : croire que « en moyenne » veut dire « d'habitude ». Ici, aucune maison ne s'est vendue près de $300\\,000$ €.\nRéponse : moyenne $300\\,000$ €, médiane $200\\,000$ € ; la médiane décrit mieux une maison ordinaire.",
          schema: (
            <div className={DEUX}>
              {rangee([180, 190, 195, 200, 205, 210, 920], 200)}
              {barres([{ label: "M1", value: 180 }, { label: "M2", value: 195 }, { label: "M3", value: 210 }, { label: "M4", value: 200 }, { label: "M5", value: 190 }, { label: "M6", value: 205 }, { label: "M7", value: 920 }], { moyenne: 300 })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_interpreter"],
        },
        {
          enonce:
            "Un matin, des élèves comptent les personnes à bord de $40$ voitures qui passent devant le collège, conducteur compris. Le diagramme donne le nombre de voitures pour $1$, $2$, $3$ ou $4$ personnes à bord.\na) Calculer le nombre moyen de personnes par voiture.\nb) Déterminer la médiane.\nc) Le maire dit : « En moyenne, il y a une personne et demie par voiture : le covoiturage marche bien. » Que lui répondre, avec la médiane ?",
          figure: barres([{ label: "1", value: 27 }, { label: "2", value: 8 }, { label: "3", value: 3 }, { label: "4", value: 2 }]),
          correction:
            "a) Chaque valeur compte autant de fois que son effectif : $1 \\times 27 + 2 \\times 8 + 3 \\times 3 + 4 \\times 2 = 27 + 16 + 9 + 8 = 60$ personnes, dans $27 + 8 + 3 + 2 = 40$ voitures. Moyenne : $\\dfrac{60}{40} = 1{,}5$ personne par voiture.\nb) $40$ valeurs : la médiane est la moyenne des $20^e$ et $21^e$. Les $27$ premières voitures, rangées, n'ont qu'une personne : la $20^e$ et la $21^e$ valent $1$, donc la médiane est $1$.\nc) La médiane dit l'inverse du maire : plus de la moitié des voitures, $27$ sur $40$, roulent avec le conducteur SEUL. La moyenne de $1{,}5$ vient de quelques voitures pleines.\n⛔ Le piège au b) : prendre le milieu des valeurs $1$, $2$, $3$, $4$, soit $2{,}5$. La médiane se cherche parmi les $40$ voitures, avec les effectifs cumulés.\nRéponse : $1{,}5$ personne en moyenne, médiane $1$ : la plupart des voitures ne transportent que le conducteur.",
          schema: (
            <div className={DEUX}>
              {grille(["Personnes", "Voitures", "Cumul"], [[1, 27, 27], [2, 8, 35], [3, 3, 38], [4, 2, 40]], { surligne: 0 })}
              {barres([{ label: "1", value: 27 }, { label: "2", value: 8 }, { label: "3", value: 3 }, { label: "4", value: 2 }], { surligne: 0 })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_interpreter"],
        },
        {
          enonce:
            "Mehdi note dans un tableur la durée de ses cinq trajets en bus de la semaine, en minutes : $14$, $9$, $81$, $11$, $13$. Il s'est trompé de touche : le $81$ était un $18$.\na) Calculer la moyenne, la médiane et l'étendue de la série fausse.\nb) Recommencer avec la série corrigée.\nc) Quel indicateur n'a pas bougé ? Pourquoi ?",
          correction:
            "a) Série fausse : $14 + 9 + 81 + 11 + 13 = 128$, moyenne $\\dfrac{128}{5} = 25{,}6$ min. Rangée : $9$, $11$, $13$, $14$, $81$ : médiane $13$ min. Étendue : $81 - 9 = 72$ min.\nb) Série corrigée : $14 + 9 + 18 + 11 + 13 = 65$, moyenne $\\dfrac{65}{5} = 13$ min. Rangée : $9$, $11$, $13$, $14$, $18$ : médiane $13$ min. Étendue : $18 - 9 = 9$ min.\nc) La médiane n'a pas bougé : elle ne dépend que de la valeur du MILIEU, et le $81$ comme le $18$ restent à la dernière place. La moyenne et l'étendue, elles, utilisent la plus grande valeur : l'erreur les fausse.\n⛔ Le piège : croire qu'une seule faute de frappe ne change presque rien. Ici, elle double presque la moyenne et multiplie l'étendue par $8$.\nRéponse : série fausse : $25{,}6$ ; $13$ ; $72$. Série corrigée : $13$ ; $13$ ; $9$. Seule la médiane résiste à l'erreur.",
          schema: (
            <div className={DEUX}>
              {barres([{ label: "T1", value: 14 }, { label: "T2", value: 9 }, { label: "T3", value: 81 }, { label: "T4", value: 11 }, { label: "T5", value: 13 }], { moyenne: 25.6, surligne: 2 })}
              {barres([{ label: "T1", value: 14 }, { label: "T2", value: 9 }, { label: "T3", value: 18 }, { label: "T4", value: 11 }, { label: "T5", value: 13 }], { moyenne: 13, surligne: 2 })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_etendue", "stat_interpreter"],
        },
        {
          enonce: "Les $25$ élèves d'une classe ont répondu à un QCM de $5$ questions. Le tableau donne le nombre d'élèves pour chaque nombre de bonnes réponses.\na) Déterminer la médiane.\nb) Calculer la moyenne.\nc) Calculer l'étendue.",
          figure: tableau(["Bonnes réponses", "0", "1", "2", "3", "4", "5"], ["Élèves", 1, 2, 4, 6, 5, 7], true),
          correction:
            "a) $25$ valeurs, un nombre impair : la médiane est la $13^e$ valeur, avec $12$ élèves avant et $12$ après. J'additionne les effectifs au fur et à mesure : $1$, $3$, $7$, $13$. Les rangs $8$ à $13$ ont $3$ bonnes réponses : la $13^e$ valeur est $3$, la médiane est $3$.\nb) $0 \\times 1 + 1 \\times 2 + 2 \\times 4 + 3 \\times 6 + 4 \\times 5 + 5 \\times 7 = 0 + 2 + 8 + 18 + 20 + 35 = 83$, et $\\dfrac{83}{25} = 3{,}32$ bonnes réponses.\nc) $5 - 0 = 5$ bonnes réponses.\n⛔ Le piège au a) : répondre $5$, parce que c'est la valeur qui a le plus d'élèves, ou $2{,}5$, le milieu entre $0$ et $5$. La médiane se trouve par les RANGS.\nRéponse : médiane $3$, moyenne $3{,}32$, étendue $5$.",
          schema: grille(["Réponses", "Élèves", "Cumul"], [[0, 1, 1], [1, 2, 3], [2, 4, 7], [3, 6, 13], [4, 5, 18], [5, 7, 25]], { surligne: 3 }),
          micros: ["stat_mediane", "stat_moyenne", "stat_etendue"],
        },
        {
          enonce: "Deux classes de 4e ont passé le même devoir commun. En 4e A, les $20$ élèves ont une moyenne de $12{,}5$. En 4e B, les $30$ élèves ont une moyenne de $10$. Quelle est la moyenne des $50$ élèves réunis ?",
          correction:
            "Je ne peux pas faire la moyenne des deux moyennes : les classes n'ont pas le même nombre d'élèves. Je repasse par les TOTAUX de points.\n4e A : $12{,}5 \\times 20 = 250$ points. 4e B : $10 \\times 30 = 300$ points.\nTotal : $250 + 300 = 550$ points pour $20 + 30 = 50$ élèves.\nMoyenne : $\\dfrac{550}{50} = 11$.\n⭐ Contrôle : $11$ est entre $10$ et $12{,}5$, et plus près de $10$ : la 4e B, plus nombreuse, pèse plus lourd.\n⛔ Le piège : $\\dfrac{12{,}5 + 10}{2} = 11{,}25$. Ce serait juste si les deux classes avaient le même effectif.\nRéponse : la moyenne des $50$ élèves est $11$.",
          schema: (
            <div className={DEUX}>
              {grille(["Classe", "Élèves", "Moyenne", "Points"], [["4e A", 20, 12.5, 250], ["4e B", 30, 10, 300], ["Total", 50, 11, 550]], { total: true })}
              {barres([{ label: "4e A", value: 12.5 }, { label: "4e B", value: 10 }, { label: "Tous", value: 11 }], { surligne: 2 })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_probleme"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des séries du monde réel : je calcule, je compare, et je dis ce que les nombres racontent.",
      rappel: [
        "Une valeur très à l'écart TIRE la moyenne, pas la médiane.",
        "Pour décrire une série : un centre (la moyenne ou la médiane) ET un écart (l'étendue).",
        "Je conclus par une phrase qui répond à la question : un nombre seul n'est pas une réponse.",
      ],
      exercices: [
        {
          titre: "Les huit planètes",
          enonce:
            "Voici le diamètre des huit planètes du Système solaire, en milliers de km, arrondi à l'unité (NASA) : Mercure $5$, Vénus $12$, Terre $13$, Mars $7$, Jupiter $143$, Saturne $121$, Uranus $51$, Neptune $50$.\na) Calculer le diamètre moyen.\nb) Déterminer le diamètre médian.\nc) Calculer l'étendue.\nd) La moyenne ou la médiane décrivent-elles une planète « typique » ? Que faudrait-il dire plutôt ?",
          correction:
            "a) $5 + 12 + 13 + 7 + 143 + 121 + 51 + 50 = 402$, et $\\dfrac{402}{8} = 50{,}25$ milliers de km, soit environ $50\\,000$ km.\nb) Je range : $5$, $7$, $12$, $13$, $50$, $51$, $121$, $143$. $8$ valeurs : la médiane est la moyenne des $4^e$ et $5^e$, $\\dfrac{13 + 50}{2} = 31{,}5$ milliers de km.\nc) $143 - 5 = 138$ milliers de km : Jupiter est presque $30$ fois plus large que Mercure.\nd) Non. La médiane, $31{,}5$, tombe dans le vide : aucune planète ne mesure entre $13$ et $50$ milliers de km. La série forme DEUX familles : quatre petites planètes rocheuses, de $5$ à $13$, et quatre géantes, de $50$ à $143$. Je décris plutôt chaque famille : $\\dfrac{5 + 7 + 12 + 13}{4} = 9{,}25$ pour les rocheuses, $\\dfrac{50 + 51 + 121 + 143}{4} = 91{,}25$ pour les géantes.\n⛔ Le piège : croire qu'un indicateur décrit toujours une valeur « typique ». Quand la série a deux groupes, la médiane tombe entre les deux.\nRéponse : moyenne $50{,}25$, médiane $31{,}5$, étendue $138$ (en milliers de km) ; il faut décrire les deux familles séparément.",
          schema: (
            <div className={DEUX}>
              {rangee([5, 7, 12, 13, 50, 51, 121, 143], 31.5)}
              {barres([{ label: "Me", value: 5 }, { label: "V", value: 12 }, { label: "T", value: 13 }, { label: "Ma", value: 7 }, { label: "J", value: 143 }, { label: "S", value: 121 }, { label: "U", value: 51 }, { label: "N", value: 50 }], { moyenne: 50.25 })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_etendue", "stat_interpreter", "stat_probleme"],
        },
        {
          titre: "Deux toits solaires",
          enonce:
            "Deux familles, dans deux régions différentes, ont installé les mêmes panneaux solaires. Voici leur production d'électricité, en kWh, chaque jour d'une même semaine de mai (du lundi au dimanche) :\nfamille A : $14$, $15$, $13$, $14$, $16$, $15$, $11$ ;\nfamille B : $18$, $6$, $19$, $17$, $5$, $18$, $15$.\na) Calculer la production de chaque famille sur la semaine, puis sa moyenne par jour.\nb) Déterminer la médiane de chaque série.\nc) Calculer l'étendue de chaque série.\nd) Quelle installation a la production la plus régulière ? Un jour « ordinaire », laquelle produit le plus ?",
          correction:
            "a) A : $14 + 15 + 13 + 14 + 16 + 15 + 11 = 98$ kWh, soit $\\dfrac{98}{7} = 14$ kWh par jour. B : $18 + 6 + 19 + 17 + 5 + 18 + 15 = 98$ kWh, soit $14$ kWh par jour aussi. Même total, même moyenne.\nb) A rangée : $11$, $13$, $14$, $14$, $15$, $15$, $16$ : médiane $14$ kWh. B rangée : $5$, $6$, $15$, $17$, $18$, $18$, $19$ : médiane $17$ kWh.\nc) A : $16 - 11 = 5$ kWh. B : $19 - 5 = 14$ kWh.\nd) La plus régulière est A : son étendue est bien plus petite. Mais un jour ordinaire, B produit plus : sa médiane, $17$ kWh, dépasse $14$. Ce sont deux jours très nuageux, à $5$ et $6$ kWh, qui font tomber sa moyenne.\n⛔ Le piège : conclure « les deux se valent » parce que les moyennes sont égales. La moyenne cache ici deux histoires différentes.\nRéponse : $98$ kWh, soit $14$ kWh par jour, pour les deux ; médianes $14$ et $17$ kWh ; étendues $5$ et $14$ kWh ; A est la plus régulière, B produit plus un jour ordinaire.",
          schema: (
            <div className={DEUX}>
              {barres([{ label: "Lu", value: 14 }, { label: "Ma", value: 15 }, { label: "Me", value: 13 }, { label: "Je", value: 14 }, { label: "Ve", value: 16 }, { label: "Sa", value: 15 }, { label: "Di", value: 11 }], { moyenne: 14, etendue: true })}
              {barres([{ label: "Lu", value: 18 }, { label: "Ma", value: 6 }, { label: "Me", value: 19 }, { label: "Je", value: 17 }, { label: "Ve", value: 5 }, { label: "Sa", value: 18 }, { label: "Di", value: 15 }], { moyenne: 14, etendue: true })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_etendue", "stat_interpreter", "stat_probleme"],
        },
        {
          titre: "Les cigognes du marais",
          enonce:
            "Au printemps, un ornithologue compte chaque jour les cigognes posées dans un marais. Sur cinq jours, il en compte : $6$, $9$, $11$, $14$ et $15$.\na) Calculer la moyenne et la médiane.\nb) Combien de cigognes doit-il compter le sixième jour pour que la moyenne des six jours soit $12$ ?\nc) Avec ce sixième jour, quelle est la nouvelle médiane ?\nd) Quel nombre de cigognes, le sixième jour, laisserait la médiane à $11$ ? Y en a-t-il un seul ?",
          correction:
            "a) $6 + 9 + 11 + 14 + 15 = 55$, et $\\dfrac{55}{5} = 11$. La série est déjà rangée : $5$ valeurs, la médiane est la $3^e$, $11$.\nb) Une moyenne de $12$ sur $6$ jours, c'est un total de $12 \\times 6 = 72$ cigognes. Il en a déjà compté $55$ : il faut $72 - 55 = 17$ cigognes le sixième jour.\nc) Je range : $6$, $9$, $11$, $14$, $15$, $17$. $6$ valeurs : la médiane est la moyenne des $3^e$ et $4^e$, $\\dfrac{11 + 14}{2} = 12{,}5$.\nd) Avec $6$ valeurs, la médiane est la moyenne des $3^e$ et $4^e$. Si le sixième nombre vaut $9$ ou moins, les deux valeurs du milieu sont $9$ et $11$ : médiane $10$. S'il vaut $14$ ou plus, ce sont $11$ et $14$ : médiane $12{,}5$. Entre les deux, les valeurs du milieu sont $11$ et ce nombre : il faut qu'il vaille $11$. Il n'y a donc qu'une possibilité : $11$ cigognes.\n⛔ Le piège au c) : garder l'ancienne médiane, $11$. Ajouter une valeur change le nombre de valeurs, donc le rang du milieu.\nRéponse : moyenne et médiane $11$ ; $17$ cigognes ; nouvelle médiane $12{,}5$ ; seul le nombre $11$ garde la médiane à $11$.",
          schema: (
            <div className={DEUX}>
              {rangee([6, 9, 11, 14, 15, 17], 12.5)}
              {barres([{ label: "J1", value: 6 }, { label: "J2", value: 9 }, { label: "J3", value: 11 }, { label: "J4", value: 14 }, { label: "J5", value: 15 }, { label: "J6", value: 17 }], { moyenne: 12, surligne: 5 })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_defi"],
        },
        {
          titre: "Les randonnées oubliées",
          enonce:
            "Pendant l'été, Chloé a fait quatre randonnées. Elle a oublié les distances, mais se souvient de trois résultats : la plus courte faisait $6$ km, la distance médiane est $10$ km et la distance moyenne $11$ km.\na) Quelle distance a-t-elle parcourue en tout ?\nb) Que vaut la somme des deux distances du milieu ?\nc) En déduire la plus longue randonnée, puis l'étendue.\nd) Proposer quatre distances possibles.\ne) Si les distances sont des nombres entiers de km, combien de séries sont possibles ?",
          correction:
            "a) Une moyenne de $11$ km sur $4$ randonnées : $11 \\times 4 = 44$ km en tout.\nb) $4$ valeurs : la médiane est la moyenne des $2^e$ et $3^e$ distances rangées. Si leur moyenne vaut $10$, leur somme vaut $10 \\times 2 = 20$ km.\nc) La plus longue : $44 - 6 - 20 = 18$ km. Étendue : $18 - 6 = 12$ km.\nd) Il faut deux distances rangées entre $6$ et $18$, de somme $20$ : par exemple $8$ et $12$. Série : $6$, $8$, $12$, $18$. Je vérifie : $6 + 8 + 12 + 18 = 44$, et $\\dfrac{8 + 12}{2} = 10$.\ne) La $2^e$ distance vaut au moins $6$ (la plus courte) et au plus $10$ (sinon elle dépasserait la $3^e$, qui vaut $20$ moins elle). Cela fait $5$ séries : au milieu, $6$ et $14$, $7$ et $13$, $8$ et $12$, $9$ et $11$, ou $10$ et $10$.\n⛔ Le piège : chercher les quatre distances au hasard. Je pars du TOTAL, que donne la moyenne, puis de la somme du milieu, que donne la médiane : la plus longue tombe toute seule.\nRéponse : $44$ km ; $20$ km ; $18$ km et une étendue de $12$ km ; par exemple $6$, $8$, $12$, $18$ ; $5$ séries possibles.",
          schema: (
            <div className={DEUX}>
              {rangee([6, 8, 12, 18], 10)}
              {barres([{ label: "R1", value: 6 }, { label: "R2", value: 8 }, { label: "R3", value: 12 }, { label: "R4", value: 18 }], { moyenne: 11, etendue: true })}
            </div>
          ),
          micros: ["stat_moyenne", "stat_mediane", "stat_etendue", "stat_probleme", "stat_defi"],
        },
      ],
    },
  ],
};
