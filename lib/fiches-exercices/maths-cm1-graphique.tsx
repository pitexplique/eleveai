// ─── Fiche d'exercices : lire un graphique (CM1) — 20 exercices ───────────────
//
// 21/10/2026 : une des PREMIÈRES feuilles d'exercices de maths du CM (avec
// CM1 tableau, CM2 tableau, CM2 graphique). Sur le modèle de la 6e
// `maths-6e-stat-donnee.tsx` (aides de dessin locales, `ecranSeulement`,
// corrigés à la première personne, piège nommé).
//
// Alignée sur la banque `lib/tutor-v4/questionBank/cm1/maths/graphiques.bank.ts`,
// notionId graphique : lire (sur l'AXE GRADUÉ depuis le 20/10), compléter
// (barre effacée, valeur manquante d'un total, nombre de graduations à
// tracer), interpréter (le plus, le moins, ranger, écart), défi (total,
// objectif, deux barres contre une, deux groupes, chaque barre qui monte).
// ⛔ LIMITES DU CM1, lues dans la banque : un pas de 1, 2, 5 ou 10 ; six
// graduations au plus ; chaque barre s'arrête SUR une graduation ; la valeur
// n'est pas écrite sur la barre qu'on doit lire. Le camembert du CM1 écrit
// ses valeurs dans les parts. Ni courbe, ni moyenne, ni pourcentage, ni
// « la moitié d'un disque ».
// ⛔ Pas de fiche de cours de CM1 (fichesCours: []) : l'esprit de celle du CM2
// (`lib/fiches/maths-cm2-graphiques.tsx`), en plus simple, sans aucun de ses
// exemples (foot 12 / danse 9 / nage 7 / basket 10, ananas 24 / bananes 28 /
// mangues 15 / letchis 18, températures 25 à 28, cari 16 / rougail 14…).
// ⭐ Des CM1 qui lisent difficilement : une idée par phrase, 10 mots en
// moyenne, nombres entiers, texte simple (aucune formule KaTeX).
//
// Les pièges nommés : la graduation voisine (1, 11), compter les graduations
// au lieu de lire le nombre (2, 10, 12), la plus haute barre prise pour la
// seule (3), oublier une part dans le total (4, 8, 13), une graduation prise
// pour une unité (5), comparer à l'œil sans lire les nombres (6, 11), l'écart
// confondu avec une valeur (7), « deux fois plus » à l'œil (9), deux barres
// contre une (14), un total qui ne colle pas (15), oublier une barre en
// enlevant (16), oublier le nombre d'animaux (17), un pas qui ne convient pas
// (18), ajouter une seule fois au lieu de chaque barre (19), la plus haute
// barre prise pour « plus que tout le reste » (20).
//
// Les décors (les maths sont transversales) : oiseaux de la mangeoire,
// bibliothèque, école de musique, cinéma, piste d'athlétisme, marché,
// étoiles filantes, trajets de l'école, théâtre, vétérinaire, plantes du
// jardin, caserne de pompiers, bouchons solidaires, kermesse, vote de la
// classe, apiculteur, vivarium, météo, musée d'histoire, cantine. Les métiers
// des problèmes : biologiste, météorologue, guide de musée, cheffe de cantine
// (et, plus tôt, vétérinaire, pompière, apiculteur).
//
// ⭐ UN SEUL FAIT RÉEL, ex. 17 : un insecte (la fourmi) a 6 pattes, une
// araignée 8, un oiseau (la poule) 2. Source : classification du vivant du
// programme de sciences du cycle 3 (insectes : 3 paires de pattes ;
// arachnides : 4 paires). Tout le reste est un MODÈLE, à des ordres de
// grandeur vraisemblables.
//
// ⭐ LES DESSINS : deux aides locales en SVG, sans largeur minimale (⛔
// `diagramme()` de figures.tsx défile à 375 px) — `barres` (viewBox 300,
// police 14, axe gradué, bâtons en option, barre suivie jusqu'à l'axe en
// option) et `camembert` (repris de la 6e, valeurs écrites dans les parts).
// 14 dessins imprimés ; les schémas qui redisent le corrigé sont
// `ecranSeulement`, leurs données sont alors dans l'énoncé.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-cm1-graphique.mjs`.
//
// Micro-compétences : graphique_lire (1, 2, 3, 4, 6, 8, 9, 10, 11, 13, 15,
// 17, 19), graphique_completer (5, 10, 12, 16, 18, 20), graphique_interpreter
// (6, 7, 9, 11, 14, 17, 18, 19, 20), graphique_defi (8, 13, 14, 15, 16, 17,
// 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type Barre = { label: string; value: number };

type OptsBarres = {
  /** L'écart entre deux graduations : 1, 2, 5 ou 10. */
  pas: number;
  /** Une barre en orange. */
  surligne?: number;
  /** La barre suivie jusqu'à l'axe : un pointillé orange (dessin du corrigé). */
  suivi?: number;
  /** Le haut de l'axe, s'il dépasse la plus haute barre (barre à tracer). */
  haut?: number;
  /** Des bâtons fins au lieu de barres. */
  batons?: boolean;
  /** La valeur écrite au-dessus de chaque barre (schéma du corrigé seulement). */
  valeurs?: boolean;
};

/**
 * Un diagramme en BARRES sur un AXE GRADUÉ, en SVG local : viewBox 300,
 * police 14, aucune largeur minimale. L'axe part de 0 et monte de `pas` en
 * `pas` (six intervalles au plus, le script le vérifie). Par défaut, AUCUNE
 * valeur n'est écrite : on LIT la hauteur. Une barre de valeur 0 n'est pas
 * dessinée (barre à tracer), son nom reste sous l'axe.
 * ⛔ Libellés courts (le script vérifie qu'ils tiennent dans leur colonne).
 * ⭐ Le script relit `{ label, value }` et les options.
 */
const barres = (data: Barre[], opts: OptsBarres) => {
  const W = 300;
  const G = 44;
  const D = 10;
  const HAUT = 28;
  const BAS = 150;
  const max = Math.max(opts.pas, opts.haut ?? 0, ...data.map((d) => d.value));
  const vmax = Math.ceil(max / opts.pas) * opts.pas;
  const y = (v: number) => BAS - (v / vmax) * (BAS - HAUT);
  const slot = (W - G - D) / data.length;
  const bw = opts.batons ? 10 : Math.min(40, slot * 0.6);
  const H = BAS + 30;
  const graduations = Array.from({ length: vmax / opts.pas + 1 }, (_, k) => k * opts.pas);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres sur un axe gradué">
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        {graduations.map((g) => (
          <g key={g}>
            <line x1={G - 8} y1={y(g)} x2={W - D} y2={y(g)} stroke="#cbd5e1" strokeWidth="1" />
            <text x={G - 12} y={y(g) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill="#334155">
              {g}
            </text>
          </g>
        ))}
        <line x1={G - 4} y1={HAUT - 14} x2={G - 4} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G - 4} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          const actif = opts.surligne === i || opts.suivi === i;
          return (
            <g key={i}>
              {d.value > 0 ? (
                <rect x={x} y={y(d.value)} width={bw} height={BAS - y(d.value)} rx={opts.batons ? 2 : 3} fill={actif ? "#fed7aa" : "#bfdbfe"} stroke={actif ? ORANGE : BLEU} strokeWidth={actif ? 2.5 : 1.5} />
              ) : null}
              {opts.valeurs && d.value > 0 ? (
                <text x={x + bw / 2} y={y(d.value) - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                  {d.value}
                </text>
              ) : null}
              {opts.suivi === i ? (
                <g>
                  <line x1={x} y1={y(d.value)} x2={G - 4} y2={y(d.value)} stroke={ORANGE} strokeWidth="2.5" strokeDasharray="5 4" />
                  <circle cx={G - 4} cy={y(d.value)} r="4.5" fill={ORANGE} />
                </g>
              ) : null}
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
 * Un DIAGRAMME CIRCULAIRE (repris de la 6e) : le disque, les parts dans
 * l'ordre des aiguilles d'une montre à partir du haut, la valeur écrite
 * dans chaque part (CM1), et une LÉGENDE en dessous, sur deux colonnes.
 * ⛔ Noms de 12 signes au plus ; deux petites parts jamais voisines.
 */
const camembert = (data: Barre[]) => {
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
        {parts.map((p, i) => (
          <text key={`v${i}`} x={p.lx} y={p.ly + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a" stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
            {data[i].value}
          </text>
        ))}
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

export const exercicesGraphiqueCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "graphique",
  titre: "Lire un graphique",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire une barre sur un axe gradué. Lire un diagramme circulaire. Compléter une barre effacée. Comparer, ranger, calculer un écart ou un total. Des oiseaux, des livres, de la musique, des étoiles filantes, des pompiers, des abeilles, des araignées. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je lis le titre, puis l'axe.",
      rappel: [
        "Je lis le titre : il dit ce que l'on compte.",
        "Je lis le pas : c'est l'écart entre deux graduations voisines.",
        "Je pars du haut de la barre. Je suis la ligne jusqu'à l'axe. Je lis le nombre.",
        "La barre la plus haute montre le plus grand nombre.",
      ],
      exercices: [
        {
          enonce:
            "Une classe observe la mangeoire de l'école pendant une heure. Le diagramme donne les oiseaux venus.\na) Sur l'axe, une graduation vaut combien d'oiseaux ?\nb) Combien de merles sont venus ?\nc) Combien de mésanges sont venues ?\nd) Quel oiseau est venu 6 fois ?",
          figure: barres([
            { label: "mésange", value: 8 },
            { label: "merle", value: 4 },
            { label: "pinson", value: 10 },
            { label: "moineau", value: 6 },
          ], { pas: 2 }),
          correction:
            "a) Je lis l'axe : 0, 2, 4, 6… Je compte de 2 en 2. Une graduation vaut 2 oiseaux.\nb) Je pars du haut de la barre « merle ». Je suis la ligne jusqu'à l'axe : je lis 4.\nc) Je pars du haut de la barre « mésange ». La ligne arrive sur 8.\nd) Je cherche 6 sur l'axe. Je suis sa ligne : elle touche le haut de la barre « moineau ».\n⛔ Le piège : lire la graduation voisine, 6 ou 10, pour la mésange. Je suis la ligne bien droite, sans monter ni descendre.\nRéponse : a) 2 oiseaux ; b) 4 merles ; c) 8 mésanges ; d) le moineau.",
          schema: ecranSeulement(
            barres([
              { label: "mésange", value: 8 },
              { label: "merle", value: 4 },
              { label: "pinson", value: 10 },
              { label: "moineau", value: 6 },
            ], { pas: 2, suivi: 0 }),
          ),
          micros: ["graphique_lire"],
        },
        {
          enonce:
            "La bibliothèque de l'école compte les livres empruntés chaque jour.\na) Combien de livres le mardi ?\nb) Combien de livres le jeudi ?\nc) Quel jour a-t-on emprunté 30 livres ?\nd) Quel jour a-t-on emprunté le moins de livres ?",
          figure: barres([
            { label: "lun", value: 15 },
            { label: "mar", value: 25 },
            { label: "jeu", value: 10 },
            { label: "ven", value: 30 },
          ], { pas: 5 }),
          correction:
            "Je lis l'axe : 0, 5, 10, 15… Une graduation vaut 5 livres.\na) Du haut de la barre « mar », je suis la ligne jusqu'à l'axe : je lis 25.\nb) La barre « jeu » s'arrête sur 10.\nc) Je cherche 30 sur l'axe. Sa ligne touche le haut de la barre « ven » : le vendredi.\nd) La barre la plus basse est celle du jeudi : 10 livres.\n⛔ Le piège : compter les graduations au lieu de lire le nombre. La barre du jeudi monte de 2 graduations. Mais elle vaut 10 livres, pas 2.\nRéponse : a) 25 livres ; b) 10 livres ; c) le vendredi ; d) le jeudi.",
          micros: ["graphique_lire"],
        },
        {
          enonce:
            "L'école de musique compte ses élèves pour chaque instrument.\na) Combien d'élèves jouent de la guitare ?\nb) Combien d'élèves jouent du violon ?\nc) Quel instrument a 30 élèves ?\nd) Tom dit : « Seule la guitare dépasse 30 élèves. » A-t-il raison ?",
          figure: barres([
            { label: "piano", value: 40 },
            { label: "guitare", value: 60 },
            { label: "violon", value: 20 },
            { label: "flûte", value: 30 },
          ], { pas: 10, batons: true }),
          correction:
            "Je lis l'axe : 0, 10, 20… Une graduation vaut 10 élèves.\na) Du haut du bâton « guitare », je suis la ligne jusqu'à l'axe : je lis 60.\nb) Le bâton « violon » s'arrête sur 20.\nc) Je cherche 30 sur l'axe. Sa ligne touche le haut du bâton « flûte ».\nd) Le bâton « piano » s'arrête sur 40. Or 40 est plus grand que 30.\nLe piano dépasse donc 30 élèves, lui aussi. Tom a tort.\n⛔ Le piège : regarder seulement le bâton le plus haut. Je lis TOUS les bâtons avant de dire « seul ».\nRéponse : a) 60 élèves ; b) 20 élèves ; c) la flûte ; d) non, le piano aussi.",
          micros: ["graphique_lire"],
        },
        {
          enonce:
            "La classe choisit un film pour sa sortie au cinéma. Chaque élève vote une fois. Le diagramme circulaire montre les votes.\na) Combien d'élèves ont voté pour la comédie ?\nb) Quel film a la plus grande part ?\nc) Quel film a la plus petite part ?\nd) Combien d'élèves ont voté en tout ?",
          figure: camembert([
            { label: "animation", value: 12 },
            { label: "aventure", value: 7 },
            { label: "documentaire", value: 3 },
            { label: "comédie", value: 6 },
          ]),
          correction:
            "Je cherche d'abord la couleur de chaque film dans la légende.\na) La part de la comédie porte 6 : 6 élèves.\nb) La plus grande part porte 12 : c'est le film d'animation.\nc) La plus petite part porte 3 : c'est le documentaire.\nd) J'additionne toutes les parts : 12 + 7 + 3 + 6 = 28 élèves.\n⛔ Le piège : oublier une part dans le total. Je coche chaque part quand je l'ajoute.\nRéponse : a) 6 élèves ; b) l'animation ; c) le documentaire ; d) 28 élèves.",
          micros: ["graphique_lire"],
        },
        {
          enonce:
            "Inès trace le graphique des tours de piste. Sur son axe, une graduation vaut 2 tours.\na) Zoé a fait 8 tours. Sa barre monte de combien de graduations ?\nb) Noah a fait 12 tours. Sa barre monte de combien de graduations ?\nc) La barre d'Enzo monte de 5 graduations. Combien de tours a-t-il faits ?",
          correction:
            "Une graduation vaut 2 tours. Je compte donc de 2 en 2.\na) Pour Zoé : 2, 4, 6, 8. J'ai compté 4 graduations.\nJe vérifie : 4 × 2 = 8 tours.\nb) Pour Noah : 2, 4, 6, 8, 10, 12. Cela fait 6 graduations.\nJe vérifie : 6 × 2 = 12 tours.\nc) Pour Enzo : 5 graduations de 2 tours. 5 × 2 = 10 tours.\n⛔ Le piège : tracer la barre de Zoé sur 8 graduations. Une graduation vaut 2 tours, pas 1.\nRéponse : a) 4 graduations ; b) 6 graduations ; c) 10 tours.",
          schema: ecranSeulement(
            barres([
              { label: "Zoé", value: 8 },
              { label: "Noah", value: 12 },
              { label: "Enzo", value: 10 },
            ], { pas: 2, valeurs: true }),
          ),
          micros: ["graphique_completer"],
        },
        {
          enonce:
            "Au marché, une maraîchère compte les kilos de fruits vendus le samedi.\na) Quel fruit s'est le plus vendu ?\nb) Quel fruit s'est le moins vendu ?\nc) Range les fruits, du plus vendu au moins vendu.",
          figure: barres([
            { label: "pomme", value: 20 },
            { label: "poire", value: 10 },
            { label: "prune", value: 30 },
            { label: "kiwi", value: 15 },
          ], { pas: 5 }),
          correction:
            "Une graduation vaut 5 kilos. Je lis chaque barre sur l'axe.\nPomme : 20. Poire : 10. Prune : 30. Kiwi : 15.\na) Le plus grand nombre est 30 : la prune.\nb) Le plus petit nombre est 10 : la poire.\nc) Je range les nombres : 30, puis 20, puis 15, puis 10.\nL'ordre est : prune, pomme, kiwi, poire.\n⛔ Le piège : ranger à l'œil. La pomme et le kiwi ont des barres proches. Je lis leurs nombres : 20 et 15.\nRéponse : a) la prune ; b) la poire ; c) prune, pomme, kiwi, poire.",
          micros: ["graphique_interpreter", "graphique_lire"],
        },
        {
          enonce:
            "En août, Noé compte les étoiles filantes, chaque soir, pendant une heure.\na) Combien d'étoiles filantes le mardi ?\nb) Combien d'étoiles de plus le mardi que le mercredi ?\nc) Combien d'étoiles de moins le lundi que le mardi ?",
          figure: barres([
            { label: "lun", value: 2 },
            { label: "mar", value: 5 },
            { label: "mer", value: 1 },
            { label: "jeu", value: 4 },
          ], { pas: 1 }),
          correction:
            "Une graduation vaut 1 étoile.\na) La barre « mar » s'arrête sur 5 : 5 étoiles filantes.\nb) Mardi : 5. Mercredi : 1. Je fais l'écart, le grand moins le petit : 5 − 1 = 4.\nc) Lundi : 2. Mardi : 5. L'écart : 5 − 2 = 3.\n⛔ Le piège : au b), répondre 1, le nombre du mercredi. La question demande un ÉCART : je soustrais.\nRéponse : a) 5 étoiles ; b) 4 de plus ; c) 3 de moins.",
          micros: ["graphique_interpreter"],
        },
        {
          enonce:
            "La maîtresse demande à chaque élève comment il vient à l'école.\na) Combien d'élèves sont sur le graphique, en tout ?\nb) La classe compte 30 élèves. Combien d'élèves manquent sur le graphique ?",
          figure: barres([
            { label: "à pied", value: 10 },
            { label: "car", value: 6 },
            { label: "voiture", value: 8 },
            { label: "vélo", value: 4 },
          ], { pas: 2 }),
          correction:
            "Une graduation vaut 2 élèves. Je lis les quatre barres.\nÀ pied : 10. Car : 6. Voiture : 8. Vélo : 4.\na) J'additionne les quatre barres : 10 + 6 + 8 + 4 = 28 élèves.\nb) La classe compte 30 élèves : 30 − 28 = 2 élèves manquent.\nIls étaient peut-être absents ce jour-là.\n⛔ Le piège : oublier une barre. Je compte les barres avant d'additionner : il y en a 4.\nRéponse : a) 28 élèves ; b) 2 élèves.",
          micros: ["graphique_defi", "graphique_lire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur le même graphique. Je lis, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Un écart : le grand nombre moins le petit.",
        "Un total : j'additionne toutes les barres, sans en oublier.",
        "« Deux fois plus » : je multiplie par 2, puis je compare.",
        "Pour tracer une barre, je calcule sa valeur, puis je compte les graduations.",
      ],
      exercices: [
        {
          enonce:
            "La troupe de théâtre de l'école joue cinq soirs. Le diagramme donne les spectateurs de chaque soir.\na) Combien de spectateurs le mercredi ?\nb) Quel soir a eu le moins de spectateurs ?\nc) Combien de spectateurs de plus le mercredi que le jeudi ?\nd) Vrai ou faux : « Mardi, il y a eu deux fois plus de spectateurs que jeudi. »",
          figure: barres([
            { label: "lun", value: 30 },
            { label: "mar", value: 50 },
            { label: "mer", value: 60 },
            { label: "jeu", value: 20 },
            { label: "ven", value: 40 },
          ], { pas: 10 }),
          correction:
            "Une graduation vaut 10 spectateurs.\na) La barre « mer » s'arrête sur 60 : 60 spectateurs.\nb) La barre la plus basse est celle du jeudi : 20 spectateurs.\nc) Mercredi : 60. Jeudi : 20. L'écart : 60 − 20 = 40 spectateurs.\nd) Deux fois le jeudi : 2 × 20 = 40.\nMardi, la barre s'arrête sur 50, pas sur 40. C'est faux.\n⛔ Le piège : juger « deux fois plus » à l'œil. La barre de mardi a l'air deux fois plus haute. Je fais le calcul.\nRéponse : a) 60 ; b) le jeudi ; c) 40 de plus ; d) faux.",
          micros: ["graphique_lire", "graphique_interpreter"],
        },
        {
          enonce:
            "Une vétérinaire note les animaux soignés cette semaine. La barre des lapins a été effacée.\na) Combien de chats a-t-elle soignés ?\nb) Combien d'oiseaux ?\nc) Elle a soigné deux fois plus de lapins que d'oiseaux. Combien de lapins ?\nd) La barre des lapins doit monter de combien de graduations ?",
          figure: barres([
            { label: "chien", value: 6 },
            { label: "chat", value: 10 },
            { label: "lapin", value: 0 },
            { label: "oiseau", value: 4 },
          ], { pas: 2 }),
          correction:
            "Une graduation vaut 2 animaux.\na) La barre « chat » s'arrête sur 10 : 10 chats.\nb) La barre « oiseau » s'arrête sur 4 : 4 oiseaux.\nc) Deux fois plus que 4 : 2 × 4 = 8 lapins.\nd) Je compte de 2 en 2 jusqu'à 8 : 2, 4, 6, 8. La barre monte de 4 graduations.\n⛔ Le piège : compter les graduations au lieu de lire le nombre. La barre des oiseaux monte de 2 graduations, mais elle vaut 4. Je double 4, pas 2.\nRéponse : a) 10 chats ; b) 4 oiseaux ; c) 8 lapins ; d) 4 graduations.",
          schema: ecranSeulement(
            barres([
              { label: "chien", value: 6 },
              { label: "chat", value: 10 },
              { label: "lapin", value: 8 },
              { label: "oiseau", value: 4 },
            ], { pas: 2, surligne: 2, valeurs: true }),
          ),
          micros: ["graphique_completer", "graphique_lire"],
        },
        {
          enonce:
            "La classe mesure ses plantes du jardin, un mois après les semis (en centimètres).\nVrai ou faux ? Explique avec les nombres.\na) « Le haricot est la plante la plus haute. »\nb) « Le radis mesure 15 cm. »\nc) « Le haricot mesure 3 fois la hauteur du radis. »\nd) « La tomate et le maïs, mis bout à bout, dépassent le haricot. »",
          figure: barres([
            { label: "tomate", value: 25 },
            { label: "haricot", value: 30 },
            { label: "radis", value: 10 },
            { label: "maïs", value: 20 },
          ], { pas: 5 }),
          correction:
            "Une graduation vaut 5 cm. Je lis chaque barre.\nTomate : 25. Haricot : 30. Radis : 10. Maïs : 20.\na) Vrai : 30 est le plus grand nombre.\nb) Faux : la barre du radis s'arrête sur 10, pas sur 15.\nc) 3 fois le radis : 3 × 10 = 30. C'est le haricot : vrai.\nd) Tomate et maïs : 25 + 20 = 45 cm.\n45 est plus grand que 30 : vrai.\n⛔ Le piège : au b), lire la graduation voisine. Je suis la ligne du haut de la barre jusqu'à l'axe.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) vrai.",
          micros: ["graphique_interpreter", "graphique_lire"],
        },
        {
          enonce:
            "Une pompière trace le graphique des sorties de sa caserne. Son axe va de 2 en 2. Lundi : 6 sorties. Mardi : 10 sorties. Mercredi : 2 sorties de plus que lundi.\na) Combien de sorties le mercredi ?\nb) La barre du lundi monte de combien de graduations ?\nc) Et celle du mardi ?\nd) La barre du jeudi monte de 2 graduations. Combien de sorties le jeudi ?",
          correction:
            "a) Mercredi : 2 de plus que lundi. 6 + 2 = 8 sorties.\nb) Je compte de 2 en 2 jusqu'à 6 : 2, 4, 6. Cela fait 3 graduations.\nc) Jusqu'à 10 : 2, 4, 6, 8, 10. Cela fait 5 graduations.\nd) 2 graduations de 2 sorties : 2 × 2 = 4 sorties.\n⛔ Le piège : confondre le nombre de graduations et la valeur. La barre du lundi monte de 3 graduations, mais elle vaut 6 sorties.\nRéponse : a) 8 sorties ; b) 3 graduations ; c) 5 graduations ; d) 4 sorties.",
          schema: ecranSeulement(
            barres([
              { label: "lun", value: 6 },
              { label: "mar", value: 10 },
              { label: "mer", value: 8 },
              { label: "jeu", value: 4 },
            ], { pas: 2, valeurs: true }),
          ),
          micros: ["graphique_completer"],
        },
        {
          enonce:
            "L'école collecte des bouchons pour une association. Le diagramme donne les bouchons apportés chaque semaine (en kilos). L'objectif est de 100 kilos.\na) Combien de kilos la semaine 2 ?\nb) Quelle semaine a rapporté le plus ?\nc) Combien de kilos en tout, en quatre semaines ?\nd) Combien de kilos manque-t-il pour l'objectif ?",
          figure: barres([
            { label: "S1", value: 15 },
            { label: "S2", value: 25 },
            { label: "S3", value: 20 },
            { label: "S4", value: 30 },
          ], { pas: 5 }),
          correction:
            "Une graduation vaut 5 kilos. Je lis les quatre barres.\nS1 : 15. S2 : 25. S3 : 20. S4 : 30.\na) La barre « S2 » s'arrête sur 25 : 25 kilos.\nb) La barre la plus haute est « S4 » : 30 kilos.\nc) 15 + 25 + 20 + 30 = 90 kilos.\nd) 100 − 90 = 10 kilos manquent.\n⛔ Le piège : oublier une semaine dans le total. Je coche chaque barre quand je l'ajoute.\nRéponse : a) 25 kilos ; b) la semaine 4 ; c) 90 kilos ; d) 10 kilos.",
          micros: ["graphique_defi", "graphique_lire"],
        },
        {
          enonce:
            "À la kermesse, le stand de crêpes compte ses crêpes vendues à chaque heure.\na) À quelle heure a-t-on vendu le plus de crêpes ? Combien ?\nb) On réunit 14 h et 15 h. Font-elles plus que 16 h ?\nc) On réunit 17 h et 18 h. Combien de crêpes de plus qu'à 16 h ?\nd) Combien de crêpes en tout dans l'après-midi ?",
          figure: barres([
            { label: "14 h", value: 15 },
            { label: "15 h", value: 5 },
            { label: "16 h", value: 25 },
            { label: "17 h", value: 10 },
            { label: "18 h", value: 20 },
          ], { pas: 5 }),
          correction:
            "Une graduation vaut 5 crêpes. Je lis chaque barre.\n14 h : 15. 15 h : 5. 16 h : 25. 17 h : 10. 18 h : 20.\na) La barre la plus haute est celle de 16 h : 25 crêpes.\nb) 14 h et 15 h : 15 + 5 = 20 crêpes. 20 est plus petit que 25 : non.\nc) 17 h et 18 h : 10 + 20 = 30 crêpes. Puis 30 − 25 = 5 crêpes de plus.\nd) 15 + 5 + 25 + 10 + 20 = 75 crêpes.\n⛔ Le piège : comparer deux barres à une seule, à l'œil. J'additionne d'abord les deux barres, puis je compare.\nRéponse : a) à 16 h, 25 crêpes ; b) non ; c) 5 de plus ; d) 75 crêpes.",
          micros: ["graphique_interpreter", "graphique_defi"],
        },
        {
          enonce:
            "La classe vote pour le nom de sa mascotte. 30 élèves ont voté une fois. Zoé a lu le graphique et a écrit : Pirate 12, Comète 6, Biscuit 10.\na) Fais le total des nombres de Zoé.\nb) Ce total colle-t-il avec les 30 votes ?\nc) Zoé s'est trompée sur une seule barre : celle de Comète. Combien de votes pour Comète, en vrai ?",
          correction:
            "a) J'additionne les nombres de Zoé : 12 + 6 + 10 = 28.\nb) Non : 28 votes, ce n'est pas 30. Il manque 30 − 28 = 2 votes.\nUne barre a donc été mal lue.\nc) J'enlève les deux autres barres du total : 30 − 12 − 10 = 8 votes pour Comète.\nJe vérifie : 12 + 8 + 10 = 30. Le compte est bon.\nSur l'axe, une graduation vaut 2. Zoé a lu la graduation juste en dessous : 6 au lieu de 8.\n⛔ Le piège : croire ses lectures sans vérifier. Si je connais le total, je refais l'addition.\nRéponse : a) 28 ; b) non, il manque 2 votes ; c) 8 votes.",
          schema: ecranSeulement(
            barres([
              { label: "Pirate", value: 12 },
              { label: "Comète", value: 8 },
              { label: "Biscuit", value: 10 },
            ], { pas: 2, surligne: 1, valeurs: true }),
          ),
          micros: ["graphique_lire", "graphique_defi"],
        },
        {
          enonce:
            "Un apiculteur a récolté 60 pots de miel en quatre mois. Avril : 10 pots. Mai : 20 pots. Juin : 5 pots. Il doit encore tracer la barre de juillet.\na) Combien de pots en juillet ?\nb) Son axe va de 5 en 5. La barre de juillet monte de combien de graduations ?\nc) Quel mois aura la barre la plus haute ?",
          correction:
            "a) J'additionne les trois mois connus : 10 + 20 + 5 = 35 pots.\nIl reste 60 − 35 = 25 pots pour juillet.\nJe vérifie : 10 + 20 + 5 + 25 = 60. Le compte est bon.\nb) Je compte de 5 en 5 jusqu'à 25 : 5, 10, 15, 20, 25. Cela fait 5 graduations.\nc) Le plus grand nombre est 25 : juillet.\n⛔ Le piège : oublier un mois quand j'enlève. J'additionne d'abord TOUS les mois connus, puis j'enlève ce total.\nRéponse : a) 25 pots ; b) 5 graduations ; c) juillet.",
          schema: ecranSeulement(
            barres([
              { label: "avril", value: 10 },
              { label: "mai", value: 20 },
              { label: "juin", value: 5 },
              { label: "juil.", value: 25 },
            ], { pas: 5, surligne: 3, valeurs: true }),
          ),
          micros: ["graphique_completer", "graphique_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un métier, une vraie question. Je lis, je calcule, puis je réponds par une phrase avec les nombres.",
      rappel: [
        "Je lis le titre, l'axe et son pas.",
        "J'écris chaque calcul sur une ligne.",
        "Je vérifie un total en refaisant l'addition.",
      ],
      exercices: [
        {
          titre: "Les pattes du vivarium",
          enonce:
            "Une biologiste s'occupe du vivarium de l'école. Son graphique donne le nombre de pattes de trois animaux.\na) Combien de pattes a une araignée ?\nb) Combien de pattes de plus qu'une fourmi ?\nc) Le vivarium abrite 2 araignées et 3 fourmis. Combien de pattes en tout ?\nd) Noah dit : « Une araignée a 4 fois plus de pattes qu'une poule. » A-t-il raison ?",
          figure: barres([
            { label: "fourmi", value: 6 },
            { label: "araignée", value: 8 },
            { label: "poule", value: 2 },
          ], { pas: 2 }),
          correction:
            "Une graduation vaut 2 pattes. Fourmi : 6. Araignée : 8. Poule : 2.\na) La barre « araignée » s'arrête sur 8 : 8 pattes.\nb) 8 − 6 = 2 pattes de plus.\nc) Les araignées : 2 × 8 = 16 pattes. Les fourmis : 3 × 6 = 18 pattes.\nEn tout : 16 + 18 = 34 pattes.\nd) 4 fois la poule : 4 × 2 = 8. C'est bien l'araignée : il a raison.\n⭐ Un insecte a toujours 6 pattes. Une araignée n'est pas un insecte : elle en a 8.\n⛔ Le piège au c) : compter les pattes d'un seul animal. Il y a 2 araignées et 3 fourmis : je multiplie.\nRéponse : a) 8 pattes ; b) 2 de plus ; c) 34 pattes ; d) oui.",
          micros: ["graphique_lire", "graphique_interpreter", "graphique_defi"],
        },
        {
          titre: "Le bon pas",
          enonce:
            "Un météorologue compte les jours de pluie de quatre mois. Mars : 15 jours. Avril : 10 jours. Mai : 20 jours. Juin : 5 jours. Il veut un graphique en barres. Son axe aura 6 graduations au plus. Chaque barre doit s'arrêter sur une graduation.\na) Quel pas choisir : 1, 2, 5 ou 10 ?\nb) La barre de mars montera de combien de graduations ?\nc) Combien de jours de pluie en tout, sur les quatre mois ?\nd) Juin compte 30 jours. Combien de jours sans pluie en juin ?",
          correction:
            "a) J'essaie chaque pas.\nPas de 1 : il faudrait 20 graduations pour mai. C'est trop.\nPas de 2 : 15 et 5 ne sont pas dans la table de 2.\nPas de 10 : 15 et 5 tombent entre deux graduations.\nPas de 5 : 5, 10, 15 et 20 tombent tous sur une graduation. Et 20 demande 4 graduations.\nJe choisis le pas de 5.\nb) De 5 en 5 jusqu'à 15 : 5, 10, 15. Cela fait 3 graduations.\nc) 15 + 10 + 20 + 5 = 50 jours de pluie.\nd) 30 − 5 = 25 jours sans pluie.\n⛔ Le piège : choisir un pas sans tester TOUTES les valeurs. Le pas de 10 va pour 10 et 20, mais pas pour 15.\nRéponse : a) le pas de 5 ; b) 3 graduations ; c) 50 jours ; d) 25 jours.",
          schema: ecranSeulement(
            barres([
              { label: "mars", value: 15 },
              { label: "avril", value: 10 },
              { label: "mai", value: 20 },
              { label: "juin", value: 5 },
            ], { pas: 5, valeurs: true }),
          ),
          micros: ["graphique_completer", "graphique_interpreter", "graphique_defi"],
        },
        {
          titre: "Le musée d'histoire",
          enonce:
            "Une guide de musée compte les visiteurs de chaque salle, un dimanche.\na) Quelle salle a reçu le plus de visiteurs ?\nb) Combien de visiteurs en tout, dans les quatre salles ?\nc) Elle forme deux groupes : Gaulois et Romains, puis Égypte et Vikings. Quel écart entre les deux groupes ?\nd) Le dimanche suivant, chaque salle reçoit 10 visiteurs de plus. Quel sera le nouveau total ?",
          figure: barres([
            { label: "Gaulois", value: 40 },
            { label: "Égypte", value: 60 },
            { label: "Romains", value: 30 },
            { label: "Vikings", value: 50 },
          ], { pas: 10 }),
          correction:
            "Une graduation vaut 10 visiteurs. Je lis les quatre barres.\nGaulois : 40. Égypte : 60. Romains : 30. Vikings : 50.\na) La barre la plus haute est « Égypte » : 60 visiteurs.\nb) 40 + 60 + 30 + 50 = 180 visiteurs.\nc) Groupe 1 : 40 + 30 = 70. Groupe 2 : 60 + 50 = 110.\nL'écart : 110 − 70 = 40 visiteurs.\nd) Il y a 4 salles. Chacune gagne 10 visiteurs : 4 × 10 = 40.\nNouveau total : 180 + 40 = 220 visiteurs.\n⛔ Le piège au d) : ajouter 10 une seule fois. Chaque barre monte de 10 : j'ajoute 10 quatre fois.\nRéponse : a) l'Égypte ; b) 180 visiteurs ; c) 40 visiteurs ; d) 220 visiteurs.",
          micros: ["graphique_lire", "graphique_interpreter", "graphique_defi"],
        },
        {
          titre: "Le menu de la cheffe",
          enonce:
            "Une cheffe de cantine demande leur dessert préféré à 50 élèves. Yaourt : 10. Fruit : 15. Gâteau : 20. Les autres choisissent la compote.\na) Combien d'élèves choisissent la compote ?\nb) Elle trace un graphique. Son axe va de 5 en 5. La barre du gâteau monte de combien de graduations ?\nc) Vrai ou faux : « Le fruit et la compote réunis font autant que le gâteau. »\nd) Vrai ou faux : « Le gâteau a plus de votes que tous les autres desserts réunis. »",
          correction:
            "a) J'additionne les desserts connus : 10 + 15 + 20 = 45.\nIl y a 50 élèves : 50 − 45 = 5 compotes.\nJe vérifie : 10 + 15 + 20 + 5 = 50. Le compte est bon.\nb) De 5 en 5 jusqu'à 20 : 5, 10, 15, 20. Cela fait 4 graduations.\nc) 15 + 5 = 20. C'est le gâteau : vrai.\nd) Tous les autres : 10 + 15 + 5 = 30 votes.\n30 est plus grand que 20 : faux.\n⛔ Le piège au d) : la plus haute barre n'est pas « plus que tout le reste ». J'additionne les autres barres avant de comparer.\nRéponse : a) 5 élèves ; b) 4 graduations ; c) vrai ; d) faux.",
          schema: ecranSeulement(
            barres([
              { label: "yaourt", value: 10 },
              { label: "fruit", value: 15 },
              { label: "gâteau", value: 20 },
              { label: "compote", value: 5 },
            ], { pas: 5, valeurs: true }),
          ),
          micros: ["graphique_completer", "graphique_interpreter", "graphique_defi"],
        },
      ],
    },
  ],
};
