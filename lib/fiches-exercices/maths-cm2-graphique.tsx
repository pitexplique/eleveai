// ─── Fiche d'exercices : lire un graphique (CM2) — 20 exercices corrigés ─────
//
// Lot CM du 21/10/2026 : une des PREMIÈRES feuilles d'exercices de maths du CM
// (avec CM1 tableau, CM1 graphique, CM2 tableau). Sur le modèle de la feuille
// de 6e `maths-6e-stat-donnee.tsx` (aides de dessin reprises et adaptées).
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-graphiques.tsx` (« Lire
// un graphique ») et sur la banque `lib/tutor-v4/questionBank/cm2/maths/
// graphiques.bank.ts`, notionId graphique : lire, compléter, interpréter un
// graphique, défis (total, moitié, quart, valeur manquante).
// ⭐ L'AXE GRADUÉ (comme le coach depuis le 21/10, canvas `stat_graph` avec
// `showAxis`) : aucune valeur écrite sur une barre ou un point quand la
// question demande de la LIRE. Pas de 1, 2 ou 10. Quelques valeurs tombent AU
// MILIEU de deux graduations : le corrigé le dit chaque fois (« au milieu,
// entre 30 et 40 »).
// ⭐ LES COURBES (programme du cycle 3 : « lire et interpréter des courbes ») :
// cinq exercices (2, 9, 13, 17, 18), dans des décors que le coach n'a pas.
// ⛔ LIMITES DU CM2, lues dans la banque : ni moyenne ni pourcentage ; le
// camembert se lit par la moitié et le quart d'un total DONNÉ. Nombres entiers.
// ⛔ Aucun exemple de la fiche de cours (Foot 12 / Danse 9 / Nage 7 / Basket
// 10, Ananas 24 / Bananes 28 / Mangues 15 / Letchis 18, températures 25 à 28,
// Cari 16 / Rougail 14 / Salade 8 / Sandwich 12), ni des décors du coach
// (sports, fruits du marché, livres, pluie, oiseaux, plage, tortues,
// instruments, cinéma, venir à l'école, cantine, glaces, tombola, billes,
// basket, volcan, graines, exposés, musique ; courbes : pluie de Saint-Denis,
// Maïdo, plant de tomate, musée, population, baleines, baguettes).
// ⭐ Des CM2 qui lisent difficilement : une idée par phrase, 10 mots en
// moyenne. Texte simple, sans KaTeX : « ÷ », « × », « − » écrits en clair.
//
// Les pièges nommés : la graduation voisine (1, 7), lire l'heure pour la
// valeur (2), oublier la barre qu'on vient de dessiner (3), chercher un nombre
// sur un disque muet (4), « deux fois plus » à l'œil (5, 10), compter les
// cases au lieu de lire l'axe (6), oublier une catégorie dans le total (8),
// la graduation voisine au lieu du milieu (9), oublier une part dans la
// soustraction (11), la plus haute barre DÉJÀ dessinée (12), la plus forte
// montée confondue avec le point le plus haut (13), la plus haute barre prise
// pour la seule (14), la plus haute barre qui « suffit » (15), un total qui ne
// colle pas (16), s'arrêter au premier maximum (17), un point au milieu oublié
// au-dessus d'un seuil (18), le plus grand secteur pris pour la moitié (19),
// comparer à un seul au lieu de tous les autres réunis (20).
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 14 — médailles d'or aux Jeux olympiques de Paris 2024 : États-Unis
//     40, Chine 40, Japon 20, Pays-Bas 15, France 16 (tableau officiel des
//     médailles du CIO, olympics.com, août 2024) ;
//   · ex. 17 — durée du jour à Paris le 15 de chaque mois, arrondie à
//     l'heure : 9, 10, 12, 14, 15, 16 h de janvier à juin (éphémérides de
//     l'IMCCE, lever et coucher du Soleil ; 8 h 35 le 15/01, 16 h 10 le 15/06) ;
//   · et un repère : 9 à 12 heures de sommeil conseillées de 6 à 12 ans
//     (American Academy of Sleep Medicine, 2016 ; repris par l'INSV) — ex. 19.
// Tout le reste (vétérinaire, marée, théâtre, fromagerie, trains, miel,
// voitures, ludothèque, bol d'eau, refuge, fleuriste, paniers, neige, poules,
// mairie, rivière, pièces de monnaie) est un MODÈLE, à des ordres de grandeur
// vraisemblables.
// Métiers des problèmes : astronome (17), hydrologue (18), pédiatre (19),
// archéologue (20) ; et dans les autres : vétérinaire, apicultrice, fromagère,
// fleuriste, maraîchère, pisteur.
//
// ⭐ LES DESSINS : trois aides locales, en SVG, sans largeur minimale (⛔
// `diagramme()` de figures.tsx défile à 375 px) — `barres` (viewBox 300,
// police 14, axe gradué, barres manquantes `manque`), `courbe` (points reliés
// sur un axe gradué, sans valeurs, ligne de seuil en option) et `camembert`
// (repris de la 6e). 14 dessins imprimés ; les schémas qui redisent le corrigé
// sont `ecranSeulement`, leurs données sont alors dans l'énoncé.
//
// Les corrigés sont écrits à la première personne (« je pars du haut de la
// barre »), avec le pourquoi et le piège nommé.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-cm2-graphique.mjs` —
// chaque valeur relue dans le dessin ou l'énoncé, chaque total, écart,
// double, moitié, quart refait ; chaque valeur au milieu de deux graduations
// annoncée dans le corrigé.
//
// Micro-compétences : graphique_lire (1, 2, 3, 4, 6, 9, 11, 12, 13, 14, 16,
// 17, 18), graphique_completer (3, 7, 12, 14, 20), graphique_interpreter (5,
// 9, 10, 13, 14, 16, 17, 18, 19, 20), graphique_defi (8, 11, 15, 16, 17, 18,
// 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const NUIT = "#1e3a8a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type Barre = { label: string; value: number };

/** Les graduations 0, pas, 2 × pas… jusqu'à `vmax`. */
const graduationsDe = (vmax: number, pas: number) => Array.from({ length: Math.round(vmax / pas) + 1 }, (_, k) => k * pas);

/**
 * Un diagramme en BARRES, en SVG local : viewBox 300, police 14, aucune
 * largeur minimale. Avec `pas`, l'axe est gradué et AUCUNE valeur n'est écrite :
 * on LIT la hauteur (une valeur peut tomber au milieu de deux graduations).
 * Sans `pas`, la valeur est écrite au-dessus de chaque barre (schémas d'écran).
 * `manque` : les barres à dessiner par l'élève (un « ? » à leur place ; l'axe
 * tient compte de leur valeur). `surligne` : une barre en orange. `unite` :
 * le nom de l'axe, en haut à gauche. ⭐ Le script relit `{ label, value }`.
 */
const barres = (data: Barre[], opts: { pas?: number; surligne?: number; manque?: number[]; unite?: string } = {}) => {
  const W = 300;
  const G = opts.pas ? 44 : 16;
  const D = 10;
  const HAUT = 32;
  const BAS = 154;
  const max = Math.max(1, ...data.map((d) => d.value));
  const vmax = opts.pas ? Math.ceil(max / opts.pas) * opts.pas : max;
  const y = (v: number) => BAS - (v / vmax) * (BAS - HAUT);
  const slot = (W - G - D) / data.length;
  const bw = Math.min(40, slot * 0.6);
  const H = BAS + 30;
  const graduations = opts.pas ? graduationsDe(vmax, opts.pas) : [];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres">
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        {opts.unite ? (
          <text x="6" y="16" fontSize="14" fontWeight="700" fill="#475569">
            {opts.unite}
          </text>
        ) : null}
        {graduations.map((g) => (
          <g key={g}>
            <line x1={G - 4} y1={y(g)} x2={W - D} y2={y(g)} stroke="#cbd5e1" strokeWidth="1" />
            <text x={G - 8} y={y(g) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill="#334155">
              {g}
            </text>
          </g>
        ))}
        <line x1={G - 4} y1={HAUT - 8} x2={G - 4} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G - 4} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          const actif = opts.surligne === i;
          const absente = opts.manque?.includes(i);
          return (
            <g key={i}>
              {absente ? (
                <text x={x + bw / 2} y={BAS - 10} textAnchor="middle" fontSize="18" fontWeight="900" fill={ORANGE}>
                  ?
                </text>
              ) : (
                <rect x={x} y={y(d.value)} width={bw} height={BAS - y(d.value)} rx="3" fill={actif ? "#fed7aa" : "#bfdbfe"} stroke={actif ? ORANGE : BLEU} strokeWidth={actif ? 2.5 : 1.5} />
              )}
              {opts.pas || absente ? null : (
                <text x={x + bw / 2} y={y(d.value) - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                  {d.value}
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

/**
 * Une COURBE (une évolution), en SVG local : viewBox 300 × 206, police 14.
 * Une colonne par étiquette, l'axe vertical gradué tous les `pas` depuis 0,
 * les points reliés, AUCUNE valeur écrite : on suit la ligne jusqu'à l'axe.
 * `seuil` : une ligne rouge en tirets (une alerte). `surligne` : un point en
 * orange. `unite` : le nom de l'axe, en haut à gauche.
 * ⭐ Le script relit etiquettes, valeurs, pas.
 */
const courbe = (etiquettes: string[], valeurs: number[], pas: number, opts: { unite?: string; seuil?: number; surligne?: number } = {}) => {
  const [G, D, HAUT, BAS] = [44, 14, 32, 170];
  const W = 300;
  const vmax = Math.ceil(Math.max(...valeurs, opts.seuil ?? 0) / pas) * pas;
  const y = (v: number) => BAS - (v / vmax) * (BAS - HAUT);
  const slot = (W - G - D) / etiquettes.length;
  const x = (i: number) => G + slot * (i + 0.5);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 206`} className="block h-auto w-full" role="img" aria-label="Courbe">
        <rect x="0" y="0" width={W} height="206" rx="10" fill="#fff" />
        {opts.unite ? (
          <text x="6" y="16" fontSize="14" fontWeight="700" fill="#475569">
            {opts.unite}
          </text>
        ) : null}
        {graduationsDe(vmax, pas).map((g) => (
          <g key={g}>
            <line x1={G} y1={y(g)} x2={W - D} y2={y(g)} stroke="#cbd5e1" strokeWidth="1" />
            <text x={G - 6} y={y(g) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill="#334155">
              {g}
            </text>
          </g>
        ))}
        {etiquettes.map((_, i) => (
          <line key={`v${i}`} x1={x(i)} y1={HAUT} x2={x(i)} y2={BAS} stroke="#e2e8f0" strokeWidth="1" />
        ))}
        {opts.seuil !== undefined ? <line x1={G} y1={y(opts.seuil)} x2={W - D} y2={y(opts.seuil)} stroke={ROUGE} strokeWidth="2" strokeDasharray="6 4" /> : null}
        <line x1={G} y1={HAUT - 8} x2={G} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <polyline points={valeurs.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")} fill="none" stroke={BLEU} strokeWidth="2.5" strokeLinejoin="round" />
        {valeurs.map((v, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r={opts.surligne === i ? 6 : 4.5} fill={opts.surligne === i ? ORANGE : NUIT} />
            <text x={x(i)} y={BAS + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
              {etiquettes[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const TEINTES = ["#93c5fd", "#fdba74", "#86efac", "#fde68a", "#c4b5fd", "#fca5a5"];

/**
 * Un DIAGRAMME CIRCULAIRE (repris de la 6e) : le disque (viewBox 300), les
 * secteurs dans l'ordre des aiguilles d'une montre à partir du haut, et une
 * LÉGENDE en dessous, sur deux colonnes. `valeurs` : le nombre écrit dans
 * chaque secteur (false : disque muet, on part du total). ⛔ Noms de 12 signes
 * au plus ; deux petits secteurs jamais voisins (le script le vérifie).
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
                {data[i].value}
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

export const exercicesGraphiqueCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "graphique",
  titre: "Lire un graphique",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire une barre sur un axe gradué, même au milieu de deux graduations. Lire une courbe qui monte et qui descend. Lire un diagramme circulaire avec la moitié et le quart. Compléter une barre, trouver une erreur, vérifier un total. Des animaux soignés, la marée, du miel, de la neige, les Jeux olympiques, une rivière en crue, la durée du jour. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/graphique", titre: "Lire un graphique" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je lis le titre, puis je cherche la bonne valeur.",
      rappel: [
        "Je regarde d'abord de combien en combien va l'axe.",
        "Je pars du haut de la barre. Je suis la ligne jusqu'à l'axe.",
        "Si la barre s'arrête entre deux lignes, je prends le nombre du milieu.",
        "Diagramme circulaire : le disque entier, c'est le total.",
      ],
      exercices: [
        {
          enonce:
            "Une vétérinaire compte les animaux soignés en une semaine.\na) Combien de chats a-t-elle soignés ?\nb) Combien de chiens ?\nc) Combien de lapins ? Regarde bien où s'arrête la barre.\nd) Quel animal a-t-elle soigné le moins ?",
          figure: barres([
            { label: "chiens", value: 12 },
            { label: "chats", value: 14 },
            { label: "lapins", value: 7 },
            { label: "furets", value: 4 },
          ], { pas: 2, unite: "animaux" }),
          correction:
            "Les nombres de l'axe vont de 2 en 2.\na) Je pars du haut de la barre des chats.\nJe suis la ligne vers la gauche jusqu'à l'axe. Je lis 14.\nb) Le haut de la barre des chiens est sur la ligne 12. Je lis 12.\nc) La barre des lapins s'arrête au milieu, entre 6 et 8.\nLe nombre du milieu entre 6 et 8, c'est 7. Il y a 7 lapins.\nd) La barre la plus basse est celle des furets : 4.\n⛔ Le piège : lire la graduation voisine. Je suis la ligne avec ma règle.\nRéponse : a) 14 chats ; b) 12 chiens ; c) 7 lapins ; d) les furets.",
          micros: ["graphique_lire"],
        },
        {
          enonce:
            "Dans un port de Bretagne, la mer monte et descend chaque jour : c'est la marée. La courbe donne la hauteur de l'eau dans le port, en mètres.\na) Quelle est la hauteur de l'eau à 8 h ?\nb) À quelle heure l'eau est-elle la plus haute ?\nc) À quelle heure l'eau est-elle la plus basse ?\nd) Entre 12 h et 16 h, la mer monte-t-elle ou descend-elle ?",
          figure: courbe(["6 h", "8 h", "10 h", "12 h", "14 h", "16 h"], [1, 3, 5, 6, 5, 3], 1, { unite: "mètres" }),
          correction:
            "En bas, je lis l'heure. Sur l'axe de gauche, je lis la hauteur.\na) Je pars du point de 8 h. Je suis la ligne vers la gauche : je lis 3.\nÀ 8 h, l'eau monte à 3 mètres.\nb) Le point le plus haut est celui de 12 h : 6 mètres.\nc) Le point le plus bas est celui de 6 h : 1 mètre.\nd) Après 12 h, la ligne descend : de 6 mètres à 3 mètres. La mer descend.\n⛔ Le piège : lire l'heure à la place de la hauteur. « 8 h » est l'heure, pas la réponse.\nRéponse : a) 3 mètres ; b) à 12 h ; c) à 6 h ; d) elle descend.",
          micros: ["graphique_lire"],
        },
        {
          enonce:
            "Une troupe de théâtre joue quatre soirs. Le diagramme donne le nombre de spectateurs. La barre du lundi n'est pas encore dessinée.\na) Combien de spectateurs le vendredi ?\nb) Combien de spectateurs le samedi ?\nc) Le lundi, 25 spectateurs sont venus. Jusqu'où doit monter la barre du lundi ?\nd) Quel soir y a-t-il eu le moins de spectateurs ?",
          figure: barres([
            { label: "ven", value: 30 },
            { label: "sam", value: 45 },
            { label: "dim", value: 40 },
            { label: "lun", value: 25 },
          ], { pas: 10, manque: [3], unite: "spectateurs" }),
          correction:
            "Les nombres de l'axe vont de 10 en 10.\na) Le haut de la barre du vendredi est sur la ligne 30. Je lis 30.\nb) La barre du samedi s'arrête au milieu, entre 40 et 50. Je lis 45.\nc) 25 est au milieu, entre 20 et 30.\nJe dessine une barre qui s'arrête au milieu, entre la ligne 20 et la ligne 30.\nd) Je compare 30, 45, 40 et 25. Le plus petit est 25 : c'est le lundi.\n⛔ Le piège au d) : oublier la barre que je viens de dessiner. Le lundi compte aussi.\nRéponse : a) 30 ; b) 45 ; c) au milieu, entre 20 et 30 ; d) le lundi.",
          schema: ecranSeulement(
            barres([
              { label: "ven", value: 30 },
              { label: "sam", value: 45 },
              { label: "dim", value: 40 },
              { label: "lun", value: 25 },
            ], { pas: 10, surligne: 3, unite: "spectateurs" }),
          ),
          micros: ["graphique_lire", "graphique_completer"],
        },
        {
          enonce:
            "Une fromagère a vendu 40 fromages ce matin. Le diagramme circulaire montre les sortes de fromage.\na) Quel fromage occupe la moitié du disque ? Combien en a-t-elle vendu ?\nb) Le brie occupe le quart du disque. Combien de bries ?\nc) Combien de chèvres et de roqueforts en tout ?\nd) Elle a vendu 6 chèvres. Combien de roqueforts ?",
          figure: camembert([
            { label: "comté", value: 20 },
            { label: "chèvre", value: 6 },
            { label: "brie", value: 10 },
            { label: "roquefort", value: 4 },
          ], false),
          correction:
            "Le disque entier, c'est les 40 fromages.\na) Le comté occupe la moitié du disque.\nLa moitié de 40 : 40 ÷ 2 = 20 comtés.\nb) Le quart de 40 : 40 ÷ 4 = 10 bries.\nc) J'enlève le comté et le brie : 40 − 20 − 10 = 10.\nIl reste 10 fromages : les chèvres et les roqueforts réunis.\nd) 10 − 6 = 4 roqueforts.\n⛔ Le piège : chercher un nombre sur le disque. Il n'y en a pas. Je pars du total, 40.\nRéponse : a) le comté, 20 ; b) 10 bries ; c) 10 fromages ; d) 4 roqueforts.",
          schema: ecranSeulement(
            camembert([
              { label: "comté", value: 20 },
              { label: "chèvre", value: 6 },
              { label: "brie", value: 10 },
              { label: "roquefort", value: 4 },
            ]),
          ),
          micros: ["graphique_lire"],
        },
        {
          enonce:
            "Une gare note les trains en retard pendant quatre jours. Lundi : 8 trains. Mardi : 3 trains. Mercredi : 5 trains. Jeudi : 10 trains.\na) Quel jour y a-t-il eu le plus de retards ?\nb) Combien de retards de plus le jeudi que le mardi ?\nc) Vrai ou faux : « Le jeudi, il y a eu deux fois plus de retards que le mercredi. »\nd) Vrai ou faux : « Le lundi, il y a eu deux fois plus de retards que le mardi. »",
          correction:
            "a) Le plus grand nombre est 10 : c'est le jeudi.\nb) Je fais le grand moins le petit : 10 − 3 = 7 retards de plus.\nc) Deux fois le mercredi : 2 × 5 = 10. C'est bien le jeudi : vrai.\nd) Deux fois le mardi : 2 × 3 = 6. Le lundi en a 8, pas 6 : faux.\n⛔ Le piège : juger « deux fois plus » à l'œil. Je fais toujours la multiplication.\nRéponse : a) le jeudi ; b) 7 retards ; c) vrai ; d) faux.",
          schema: ecranSeulement(
            barres([
              { label: "lun", value: 8 },
              { label: "mar", value: 3 },
              { label: "mer", value: 5 },
              { label: "jeu", value: 10 },
            ], { surligne: 3 }),
          ),
          micros: ["graphique_interpreter"],
        },
        {
          enonce:
            "Une apicultrice a quatre ruches, dans quatre endroits. Le diagramme donne le miel récolté dans chaque ruche, en kilos.\na) De combien en combien l'axe est-il gradué ?\nb) Combien de kilos de miel pour la ruche du verger ?\nc) Combien de kilos pour la ruche de la prairie ?\nd) Combien de kilos pour la ruche de la forêt ?",
          figure: barres([
            { label: "lavande", value: 25 },
            { label: "forêt", value: 15 },
            { label: "prairie", value: 35 },
            { label: "verger", value: 20 },
          ], { pas: 10, unite: "kilos" }),
          correction:
            "a) Les nombres de l'axe sont 0, 10, 20, 30, 40. L'axe va de 10 en 10.\nb) Le haut de la barre du verger est sur la ligne 20. Je lis 20 kilos.\nc) La barre de la prairie s'arrête au milieu, entre 30 et 40. Je lis 35 kilos.\nd) La barre de la forêt s'arrête au milieu, entre 10 et 20. Je lis 15 kilos.\n⛔ Le piège : compter les cases. La barre de la forêt monte d'une case et demie.\nMais chaque case vaut 10 kilos. Je lis le nombre sur l'axe, je ne compte pas les cases.\nRéponse : a) de 10 en 10 ; b) 20 kilos ; c) 35 kilos ; d) 15 kilos.",
          micros: ["graphique_lire"],
        },
        {
          enonce:
            "Des élèves comptent les voitures garées devant l'école. Blanches : 30. Grises : 25. Noires : 15. Rouges : 10. Sami a dessiné le diagramme. Il a fait une erreur.\na) Quelle barre est fausse ?\nb) Jusqu'où doit-elle monter ?\nc) Combien de voitures en tout ?",
          figure: barres([
            { label: "blanc", value: 30 },
            { label: "gris", value: 25 },
            { label: "noir", value: 20 },
            { label: "rouge", value: 10 },
          ], { pas: 10, unite: "voitures" }),
          correction:
            "Je lis chaque barre et je la compare au texte. L'axe va de 10 en 10.\na) Blanc : 30, c'est juste.\nGris : la barre s'arrête au milieu, entre 20 et 30. Elle vaut 25, c'est juste.\nNoir : la barre monte jusqu'à 20. Le texte dit 15 : elle est fausse.\nRouge : 10, c'est juste.\nb) 15 est au milieu, entre 10 et 20. La barre noire doit s'arrêter là.\nc) 30 + 25 + 15 + 10 = 80 voitures.\n⛔ Le piège : monter jusqu'à la graduation voisine. 15 n'est pas sur une ligne : la barre s'arrête entre deux lignes.\nRéponse : a) la barre noire ; b) au milieu, entre 10 et 20 ; c) 80 voitures.",
          schema: ecranSeulement(
            barres([
              { label: "blanc", value: 30 },
              { label: "gris", value: 25 },
              { label: "noir", value: 15 },
              { label: "rouge", value: 10 },
            ], { pas: 10, surligne: 2, unite: "voitures" }),
          ),
          micros: ["graphique_completer"],
        },
        {
          enonce:
            "Une ludothèque prête des jeux. Ce mois-ci : 15 jeux de cartes, 25 jeux de plateau, 10 puzzles et 20 jeux de briques.\na) Combien de jeux prêtés en tout ?\nb) Combien de jeux prêtés, sans compter les puzzles ?\nc) Combien de jeux de plateau de plus que de puzzles ?",
          correction:
            "a) J'additionne les quatre nombres : 15 + 25 + 10 + 20 = 70 jeux.\nJe coche chaque nombre quand je l'ajoute.\nb) J'enlève les puzzles du total : 70 − 10 = 60 jeux.\nContrôle : 15 + 25 + 20 = 60. Le compte est bon.\nc) 25 − 10 = 15 jeux de plateau de plus.\n⛔ Le piège au a) : oublier une sorte de jeu. Il y en a quatre : j'additionne quatre nombres.\nRéponse : a) 70 jeux ; b) 60 jeux ; c) 15 jeux.",
          schema: ecranSeulement(
            barres([
              { label: "cartes", value: 15 },
              { label: "plateau", value: 25 },
              { label: "puzzles", value: 10 },
              { label: "briques", value: 20 },
            ]),
          ),
          micros: ["graphique_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur les mêmes données. Je lis, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Une courbe qui monte : la valeur augmente. Qui descend : elle diminue.",
        "Un écart : le grand nombre moins le petit.",
        "« Deux fois plus » : je multiplie par 2, puis je compare.",
        "La moitié : total ÷ 2. Le quart : total ÷ 4.",
      ],
      exercices: [
        {
          enonce:
            "En sciences, la classe laisse refroidir un bol d'eau chaude. Elle mesure la température toutes les 10 minutes. En bas, ce sont les minutes.\na) Quelle est la température au départ ?\nb) Quelle est la température au bout de 20 minutes ?\nc) De combien l'eau refroidit-elle pendant les 10 premières minutes ?\nd) De combien refroidit-elle entre 40 et 50 minutes ?\ne) L'eau refroidit-elle plus vite au début ou à la fin ?",
          figure: courbe(["0", "10", "20", "30", "40", "50"], [80, 60, 45, 35, 30, 25], 10, { unite: "°C" }),
          correction:
            "L'axe va de 10 en 10.\na) Au départ, c'est le point de 0 minute. Je lis 80 °C.\nb) Le point de 20 minutes est au milieu, entre 40 et 50. Je lis 45 °C.\nc) À 0 minute, 80 °C. À 10 minutes, 60 °C.\n80 − 60 = 20 °C de moins.\nd) À 40 minutes, je lis 30. À 50 minutes, le point est au milieu, entre 20 et 30 : 25.\n30 − 25 = 5 °C de moins.\ne) Au début, l'eau perd 20 °C en 10 minutes. À la fin, seulement 5 °C.\nElle refroidit plus vite au début : la ligne y descend plus fort.\n⛔ Le piège au b) : répondre 40 ou 50, la graduation voisine. Le point est entre les deux : 45.\nRéponse : a) 80 °C ; b) 45 °C ; c) 20 °C ; d) 5 °C ; e) au début.",
          micros: ["graphique_lire", "graphique_interpreter"],
        },
        {
          enonce:
            "Un refuge note les chiens adoptés chaque mois. Janvier : 6. Février : 9. Mars : 12. Avril : 4.\nVrai ou faux ? Explique avec les nombres.\na) « En mars, il y a eu deux fois plus d'adoptions qu'en janvier. »\nb) « En février, il y a eu deux fois plus d'adoptions qu'en avril. »\nc) « En quatre mois, plus de 30 chiens ont été adoptés. »\nd) « Mars est le seul mois avec plus de 10 adoptions. »",
          correction:
            "a) Deux fois janvier : 2 × 6 = 12. C'est bien mars : vrai.\nb) Deux fois avril : 2 × 4 = 8. Février en a 9, pas 8 : faux.\nc) J'additionne les quatre mois : 6 + 9 + 12 + 4 = 31.\n31 est plus grand que 30 : vrai.\nd) Je regarde chaque mois. Seul mars dépasse 10 : vrai.\n⛔ Le piège au b) : les barres se ressemblent, alors on dit vrai. Je calcule : 8 n'est pas 9.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) vrai.",
          schema: ecranSeulement(
            barres([
              { label: "janv", value: 6 },
              { label: "févr", value: 9 },
              { label: "mars", value: 12 },
              { label: "avril", value: 4 },
            ]),
          ),
          micros: ["graphique_interpreter"],
        },
        {
          enonce:
            "Pour la fête des mères, un fleuriste a vendu 120 fleurs. Le diagramme montre les sortes de fleurs.\na) Les roses occupent la moitié du disque. Combien de roses ?\nb) Les tulipes occupent le quart du disque. Combien de tulipes ?\nc) Combien de lys et d'iris en tout ?\nd) Il a vendu 18 lys. Combien d'iris ?",
          figure: camembert([
            { label: "roses", value: 60 },
            { label: "lys", value: 18 },
            { label: "tulipes", value: 30 },
            { label: "iris", value: 12 },
          ], false),
          correction:
            "Le disque entier, c'est les 120 fleurs.\na) La moitié de 120 : 120 ÷ 2 = 60 roses.\nb) Le quart de 120 : 120 ÷ 4 = 30 tulipes.\nc) J'enlève les roses et les tulipes : 120 − 60 − 30 = 30 fleurs.\nLys et iris réunis font donc aussi un quart du disque.\nd) 30 − 18 = 12 iris.\nContrôle : 60 + 30 + 18 + 12 = 120. Le compte est bon.\n⛔ Le piège au c) : enlever seulement les roses. 120 − 60 = 60 compte encore les tulipes.\nRéponse : a) 60 roses ; b) 30 tulipes ; c) 30 fleurs ; d) 12 iris.",
          schema: ecranSeulement(
            camembert([
              { label: "roses", value: 60 },
              { label: "lys", value: 18 },
              { label: "tulipes", value: 30 },
              { label: "iris", value: 12 },
            ]),
          ),
          micros: ["graphique_lire", "graphique_defi"],
        },
        {
          enonce:
            "Une maraîchère vend des paniers de légumes chaque semaine. Elle a commencé le diagramme. Il manque les semaines 3 et 4.\na) Combien de paniers la semaine 1 ? Et la semaine 2 ?\nb) Semaine 3 : 25 paniers. Semaine 4 : 45 paniers. Où s'arrête chaque barre ?\nc) Quelle semaine a-t-elle vendu le plus de paniers ?\nd) Combien de paniers en quatre semaines ?",
          figure: barres([
            { label: "S1", value: 35 },
            { label: "S2", value: 40 },
            { label: "S3", value: 25 },
            { label: "S4", value: 45 },
          ], { pas: 10, manque: [2, 3], unite: "paniers" }),
          correction:
            "L'axe va de 10 en 10.\na) La barre S1 s'arrête au milieu, entre 30 et 40 : 35 paniers.\nLa barre S2 s'arrête sur la ligne 40 : 40 paniers.\nb) 25 est au milieu, entre 20 et 30. La barre S3 s'arrête là.\n45 est au milieu, entre 40 et 50. La barre S4 s'arrête là.\nc) Je compare 35, 40, 25 et 45. La semaine 4 gagne, avec 45 paniers.\nd) 35 + 40 + 25 + 45 = 145 paniers.\n⛔ Le piège au c) : choisir S2, la plus haute barre déjà dessinée. Je compare aussi les barres que j'ai ajoutées.\nRéponse : a) 35 et 40 ; b) entre 20 et 30, puis entre 40 et 50 ; c) la semaine 4 ; d) 145 paniers.",
          schema: ecranSeulement(
            barres([
              { label: "S1", value: 35 },
              { label: "S2", value: 40 },
              { label: "S3", value: 25 },
              { label: "S4", value: 45 },
            ], { pas: 10, surligne: 3, unite: "paniers" }),
          ),
          micros: ["graphique_lire", "graphique_completer"],
        },
        {
          enonce:
            "Dans une station de ski, un pisteur mesure la neige au sol chaque mois. La courbe donne la hauteur de neige, en centimètres.\na) Quelle hauteur de neige en janvier ?\nb) Quelle hauteur de neige en mars ?\nc) Quel mois la neige est-elle la plus haute ?\nd) De combien la neige baisse-t-elle entre février et avril ?\ne) D'un mois au suivant, quand la neige monte-t-elle le plus ?",
          figure: courbe(["nov", "déc", "jan", "fév", "mar", "avr"], [10, 30, 60, 80, 55, 20], 10, { unite: "cm" }),
          correction:
            "L'axe va de 10 en 10.\na) Je pars du point de janvier. Je suis la ligne jusqu'à l'axe : 60 cm.\nb) Le point de mars est au milieu, entre 50 et 60. Je lis 55 cm.\nc) Le point le plus haut est celui de février : 80 cm.\nd) Février : 80 cm. Avril : 20 cm. 80 − 20 = 60 cm de moins.\ne) Je calcule chaque montée. De novembre à décembre : 30 − 10 = 20.\nDe décembre à janvier : 60 − 30 = 30. De janvier à février : 80 − 60 = 20.\nLa plus forte montée est 30 cm : de décembre à janvier.\n⛔ Le piège au e) : répondre février, le point le plus haut. La plus forte montée, c'est là où la ligne monte le plus raide.\nRéponse : a) 60 cm ; b) 55 cm ; c) février ; d) 60 cm ; e) de décembre à janvier.",
          micros: ["graphique_lire", "graphique_interpreter"],
        },
        {
          enonce:
            "Aux Jeux olympiques de Paris, en 2024, des pays ont gagné des médailles d'or. Le diagramme en montre quatre.\na) Combien de médailles d'or pour les États-Unis (USA) ?\nb) Léo dit : « Les USA ont gagné le plus de médailles d'or. » A-t-il tout dit ?\nc) Combien de médailles d'or de plus pour le Japon que pour les Pays-Bas ?\nd) La France a gagné 16 médailles d'or. Où s'arrêterait sa barre ?\ne) Combien de fois plus de médailles d'or pour la Chine que pour le Japon ?",
          figure: barres([
            { label: "USA", value: 40 },
            { label: "Chine", value: 40 },
            { label: "Japon", value: 20 },
            { label: "P.-Bas", value: 15 },
          ], { pas: 10, unite: "médailles d'or" }),
          correction:
            "L'axe va de 10 en 10.\na) Le haut de la barre des USA est sur la ligne 40. Je lis 40.\nb) La barre de la Chine monte aussi jusqu'à 40.\nLes USA et la Chine sont à égalité, avec 40 médailles d'or chacun.\nc) La barre des Pays-Bas s'arrête au milieu, entre 10 et 20 : 15.\n20 − 15 = 5 médailles d'or de plus pour le Japon.\nd) 16 est entre 15 et 20, tout près de 15.\nLa barre s'arrêterait un peu au-dessus du milieu, entre 10 et 20.\ne) 2 × 20 = 40 : la Chine en a 2 fois plus que le Japon.\n⛔ Le piège au b) : voir une barre haute et croire qu'elle est seule. Je regarde toutes les barres.\nRéponse : a) 40 ; b) non, la Chine aussi en a 40 ; c) 5 ; d) un peu au-dessus du milieu, entre 10 et 20 ; e) 2 fois plus.",
          micros: ["graphique_lire", "graphique_interpreter", "graphique_completer"],
        },
        {
          enonce:
            "Dans une ferme, cinq poules ont pondu 100 œufs en un mois. Lili : 30 œufs. Zoé : 15. Nina : 25. Pia : 10. Ana : 20.\na) Vérifie le total de 100 œufs.\nb) Quelle poule a pondu le quart des œufs ?\nc) Lili et Pia, à elles deux, ont-elles pondu la moitié des œufs ?\nd) Combien d'œufs manque-t-il à Zoé pour égaler Lili ?",
          correction:
            "a) 30 + 15 + 25 + 10 + 20 = 100. Le total est juste.\nb) Le quart de 100 : 100 ÷ 4 = 25. C'est Nina.\nc) Lili et Pia : 30 + 10 = 40. La moitié de 100 : 100 ÷ 2 = 50.\n40 est plus petit que 50 : non, ce n'est pas la moitié.\nd) 30 − 15 = 15 œufs.\n⛔ Le piège au c) : Lili a la plus haute barre, alors on croit qu'elle suffit. Je calcule toujours.\nRéponse : a) oui, 100 œufs ; b) Nina ; c) non, 40 seulement ; d) 15 œufs.",
          schema: ecranSeulement(
            barres([
              { label: "Lili", value: 30 },
              { label: "Zoé", value: 15 },
              { label: "Nina", value: 25 },
              { label: "Pia", value: 10 },
              { label: "Ana", value: 20 },
            ], { surligne: 2 }),
          ),
          micros: ["graphique_defi"],
        },
        {
          enonce:
            "Une mairie affiche ce diagramme : « Comment nos 50 employés viennent au travail ». Lis-le avec soin.\na) Combien d'employés viennent en voiture ? Et à vélo ?\nb) Combien viennent en bus ? Et à pied ?\nc) Calcule le total du diagramme.\nd) L'affiche dit « 50 employés ». Le diagramme est-il d'accord ?",
          figure: barres([
            { label: "voiture", value: 25 },
            { label: "vélo", value: 15 },
            { label: "bus", value: 5 },
            { label: "à pied", value: 10 },
          ], { pas: 10, unite: "employés" }),
          correction:
            "L'axe va de 10 en 10.\na) La barre voiture s'arrête au milieu, entre 20 et 30 : 25.\nLa barre vélo s'arrête au milieu, entre 10 et 20 : 15.\nb) La barre bus s'arrête au milieu, entre 0 et 10 : 5.\nLa barre à pied est sur la ligne 10 : 10.\nc) 25 + 15 + 5 + 10 = 55 employés.\nd) Non. Le diagramme compte 55 employés. L'affiche en annonce 50.\nIl y a 55 − 50 = 5 employés de trop : une barre est fausse, ou bien le titre.\n⛔ Le piège : croire le titre sans vérifier. Je refais toujours l'addition.\nRéponse : a) 25 et 15 ; b) 5 et 10 ; c) 55 ; d) non, 5 de trop.",
          micros: ["graphique_lire", "graphique_interpreter", "graphique_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des données du monde réel. Je lis, je calcule, puis je réponds par une phrase qui cite les nombres.",
      rappel: [
        "Je lis le titre, l'axe et chaque question en entier.",
        "Pour comparer d'un point au suivant, je calcule chaque écart.",
        "Pour dire « vrai », je montre le calcul qui le prouve.",
      ],
      exercices: [
        {
          titre: "La durée du jour",
          enonce:
            "Une astronome étudie la durée du jour à Paris. C'est le temps entre le lever et le coucher du Soleil. Elle la note le 15 de chaque mois, arrondie à l'heure.\na) Combien d'heures dure le jour en janvier ?\nb) Combien d'heures en juin ? Combien d'heures de plus qu'en janvier ?\nc) D'un mois au suivant, quand le jour gagne-t-il le plus d'heures ?\nd) Une journée entière dure 24 heures. En juin, fait-il jour plus de la moitié du temps ? Et en janvier ?",
          figure: courbe(["jan", "fév", "mar", "avr", "mai", "juin"], [9, 10, 12, 14, 15, 16], 2, { unite: "heures" }),
          correction:
            "L'axe va de 2 en 2.\na) Le point de janvier est au milieu, entre 8 et 10. Je lis 9 heures.\nb) Le point de juin est sur la ligne 16 : 16 heures.\n16 − 9 = 7 heures de plus qu'en janvier.\nc) Le point de mai est au milieu, entre 14 et 16 : 15.\nJe calcule chaque gain. Janvier à février : 10 − 9 = 1. Février à mars : 12 − 10 = 2.\nMars à avril : 14 − 12 = 2. Avril à mai : 15 − 14 = 1. Mai à juin : 16 − 15 = 1.\nDeux gains sont à égalité, 2 heures chacun : de février à mars, et de mars à avril.\nd) La moitié de 24 heures : 24 ÷ 2 = 12 heures.\nEn juin, 16 heures, c'est plus que 12 : oui.\nEn janvier, 9 heures, c'est moins que 12 : non. La nuit est plus longue que le jour.\n⭐ L'astronome le sait : le jour le plus long de l'année tombe vers le 21 juin.\n⛔ Le piège au c) : s'arrêter au premier gain de 2. Je relis toute la liste.\nRéponse : a) 9 heures ; b) 16 heures, 7 de plus ; c) de février à mars et de mars à avril ; d) oui en juin, non en janvier.",
          micros: ["graphique_lire", "graphique_interpreter", "graphique_defi"],
        },
        {
          titre: "La rivière après l'orage",
          enonce:
            "Un hydrologue surveille une rivière après un gros orage. Il relève la hauteur de l'eau toutes les deux heures, en centimètres. Au-dessus de 60 cm, la rivière peut déborder : c'est la ligne rouge.\na) Quelle est la hauteur de l'eau à 10 h ?\nb) À quelle heure l'eau est-elle la plus haute ? Combien ?\nc) Entre deux relevés qui se suivent, quand l'eau monte-t-elle le plus ?\nd) Combien de relevés sont au-dessus de la ligne rouge ?\ne) À 18 h, de combien l'eau doit-elle encore baisser pour revenir à sa hauteur de 8 h ?",
          figure: courbe(["8 h", "10 h", "12 h", "14 h", "16 h", "18 h"], [20, 35, 70, 80, 65, 45], 10, { unite: "cm", seuil: 60 }),
          correction:
            "L'axe va de 10 en 10.\na) Le point de 10 h est au milieu, entre 30 et 40. Je lis 35 cm.\nb) Le point le plus haut est celui de 14 h : 80 cm.\nc) Je calcule chaque montée. De 8 h à 10 h : 35 − 20 = 15.\nDe 10 h à 12 h : 70 − 35 = 35. De 12 h à 14 h : 80 − 70 = 10.\nAprès 14 h, l'eau baisse. La plus forte montée est 35 cm, de 10 h à 12 h.\nd) Le point de 16 h est au milieu, entre 60 et 70 : 65.\nAu-dessus de 60 : 70 à 12 h, 80 à 14 h, 65 à 16 h. Cela fait 3 relevés.\ne) À 18 h, le point est au milieu, entre 40 et 50 : 45 cm. À 8 h : 20 cm.\n45 − 20 = 25 cm.\n⛔ Le piège au d) : oublier 16 h. Son point est entre deux lignes, mais bien au-dessus de la ligne rouge.\nRéponse : a) 35 cm ; b) à 14 h, 80 cm ; c) de 10 h à 12 h ; d) 3 relevés ; e) 25 cm.",
          micros: ["graphique_lire", "graphique_interpreter", "graphique_defi"],
        },
        {
          titre: "Une journée de 24 heures",
          enonce:
            "Une pédiatre est une médecin des enfants. Elle demande à Inès, 10 ans, comment se passe sa journée d'école. Sommeil : 10 heures. École : 6 heures. Loisirs : 4 heures. Repas : 2 heures. Trajets : 2 heures.\na) Vérifie que la journée fait bien 24 heures.\nb) Quelle activité occupe le quart de la journée ?\nc) Le sommeil occupe-t-il la moitié de la journée ?\nd) La pédiatre conseille de dormir de 9 à 12 heures à cet âge. Inès dort-elle assez ?\ne) Dans un diagramme circulaire, quelle activité aurait le plus grand secteur ?",
          correction:
            "a) 10 + 6 + 4 + 2 + 2 = 24 heures. Le compte est bon.\nb) Le quart de 24 : 24 ÷ 4 = 6. C'est l'école.\nc) La moitié de 24 : 24 ÷ 2 = 12. Inès dort 10 heures.\n10 est plus petit que 12 : non, un peu moins de la moitié.\nd) 10 heures, c'est entre 9 et 12 heures : oui, elle dort assez.\ne) Le plus grand nombre est 10 : le sommeil a le plus grand secteur.\n⛔ Le piège au c) : le sommeil a le plus grand secteur, alors on dit « la moitié ». Le plus grand n'est pas forcément la moitié : je calcule.\nRéponse : a) oui, 24 heures ; b) l'école ; c) non ; d) oui ; e) le sommeil.",
          schema: ecranSeulement(
            camembert([
              { label: "sommeil", value: 10 },
              { label: "repas", value: 2 },
              { label: "école", value: 6 },
              { label: "trajets", value: 2 },
              { label: "loisirs", value: 4 },
            ]),
          ),
          micros: ["graphique_interpreter", "graphique_defi"],
        },
        {
          titre: "Les pièces de l'archéologue",
          enonce:
            "Une archéologue fouille un ancien village. Elle trouve 80 pièces de monnaie. Bronze : 35 pièces. Argent : 25 pièces. Or : 5 pièces. Les autres sont en cuivre.\na) Combien de pièces en cuivre ?\nb) Elle dessine un diagramme en barres, gradué de 10 en 10. Où s'arrête la barre du cuivre ? Et celle de l'or ?\nc) Vrai ou faux : « Il y a 7 fois plus de pièces en bronze qu'en or. »\nd) Vrai ou faux : « Le bronze a plus de pièces que tous les autres métaux réunis. »",
          correction:
            "a) J'additionne les pièces connues : 35 + 25 + 5 = 65.\n80 − 65 = 15 pièces en cuivre.\nContrôle : 35 + 25 + 5 + 15 = 80. Le compte est bon.\nb) 15 est au milieu, entre 10 et 20 : la barre du cuivre s'arrête là.\n5 est au milieu, entre 0 et 10 : la barre de l'or s'arrête là.\nc) 7 × 5 = 35. C'est le bronze : vrai.\nd) Les autres réunis : 25 + 5 + 15 = 45.\n35 est plus petit que 45 : faux.\n⛔ Le piège au d) : comparer le bronze à un seul métal. « Tous les autres », c'est trois métaux ensemble.\nRéponse : a) 15 pièces ; b) au milieu entre 10 et 20, et au milieu entre 0 et 10 ; c) vrai ; d) faux.",
          schema: ecranSeulement(
            barres([
              { label: "bronze", value: 35 },
              { label: "argent", value: 25 },
              { label: "or", value: 5 },
              { label: "cuivre", value: 15 },
            ], { pas: 10, surligne: 3, unite: "pièces" }),
          ),
          micros: ["graphique_completer", "graphique_interpreter", "graphique_defi"],
        },
      ],
    },
  ],
};
