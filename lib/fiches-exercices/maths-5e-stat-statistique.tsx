// ─── Fiche d'exercices : les statistiques (5e) — 20 exercices corrigés ──────────
//
// Lot de 5e du 29/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin écrites EN CLAIR, relues par
// le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-statistiques.tsx` et sur la
// banque `lib/tutor-v4/questionBank/5e/maths/statistiques.bank.ts`, notionId
// stat_statistique : recueillir et organiser (liste brute → tableau
// d'effectifs), lire un tableau, lire un diagramme (barres, bâtons,
// circulaire), effectif et fréquence (fraction, décimal, pourcentage),
// représenter (bâtons, barres, circulaire avec ses angles sur 360°, points
// reliés), choisir une représentation, moyenne simple, défis.
// ⛔ LIMITES DE LA 5e : ni médiane ni étendue (la banque ne cite « l'étendue »
// que comme mauvaise réponse d'un QCM), ni moyenne pondérée : toutes les
// moyennes sont celles d'une liste de valeurs écrites une à une.
// ⛔ Aucun exemple de la fiche de cours de 5e (foot 12 / basket 8 / natation 5 /
// dessin 7, plastique 12 / verre 8 / papier 10, foot 8 / basket 6 / natation 4,
// 10 élèves à vélo sur 25, la moyenne de 10 ; 12 ; 14, sport 8 / musique 6 /
// dessin 4, 5 sur 20, 8 ; 10 ; 12 ; 14), ni de la feuille de 4e (planètes,
// toits solaires, cigognes, randonnées, pointures, QCM…).
//
// Les pièges nommés : relire la liste une fois par catégorie (1), lire la
// mauvaise ligne ou colonne (2, 10), le total oublié (3), diviser dans le mauvais
// sens (4), s'arrêter à la somme (5), oublier la valeur 0 (6, 15), une
// représentation choisie au goût plutôt qu'à la question (7), lire l'angle
// sans le total (8), des fréquences qui ne font pas 100 % (9), la moyenne
// « au-dessus » confondue avec « la plus haute » (11), viser la note qu'on veut
// au lieu du total (12), l'angle pris égal au pourcentage (13), comparer des
// effectifs au lieu de fréquences (14, 18), la croissance lue au lieu de la
// hauteur (16), « un sur quatre » vérifié sans calcul (17), même moyenne =
// mêmes joueurs (19), un mois au-dessus de la moyenne pris pour le plus
// pluvieux (20).
//
// Aucun fait réel : les trajets des élèves, les adoptions du refuge, le comptage
// d'oiseaux, les clubs, les voitures devant le collège, le budget du club, le
// temps d'écran, les arbres plantés, le tournesol, les petits-déjeuners, les
// matchs et la pluie des six mois sont des MODÈLES, à des ordres de grandeur
// vraisemblables.
//
// ⭐ LES DESSINS : `diagramme` et `tableau` de figures.tsx (barres, bâtons,
// circulaire ; libellés de 9 signes au plus dès 4 barres ; tableau long en
// vertical sur téléphone), et trois aides locales : `pointsRelies` (ex. 16,
// une ligne brisée graduée ; `repere` sortait ses graduations du cadre à
// 375 px), puis, reprises de la feuille de 4e, `barres` (viewBox 230, avec la
// MOYENNE en ligne pointillée rouge — on voit qu'elle égalise) et `grille` (un
// tableau HTML de trois colonnes au plus, tally compris). 13 dessins imprimés ;
// les schémas qui redisent le corrigé sont `ecranSeulement` (PDF ≤ 12 pages),
// et leurs données sont alors écrites dans l'énoncé.
//
// Les corrigés sont écrits à la première personne (« je compte »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-stat-statistique.mjs`
// — les listes brutes recomptées lettre par lettre, chaque effectif, total,
// fréquence, angle et moyenne refait depuis l'énoncé ou le dessin.
//
// Micro-compétences : stat_donnee_organiser (1, 9, 17), stat_lire_tableau (2,
// 10, 18), stat_lire_graphique (3, 8, 11, 14, 16, 19), stat_effectif_frequence
// (4, 8, 9, 10, 13, 14, 17, 18), stat_representer (6, 13, 16, 17, 20),
// stat_representation_choisir (7, 14, 17, 20), stat_moyenne (5, 11, 12, 15, 16,
// 19, 20), stat_defi (12, 15, 17, 18, 19). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, diagramme, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** 18.5 → « 18,5 » : le texte NU d'un dessin (SVG, pas de KaTeX). */
const fr = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",").replace("-", "−");

type Barre = { label: string; value: number };

/**
 * Un diagramme en barres, en SVG local (viewBox 230 : texte en 12, rendu à
 * ~12 px dans une correction de 235 px). `moyenne` : la ligne pointillée
 * rouge ; `surligne` : une barre en orange. Huit barres au plus, libellés de
 * trois signes. ⭐ Le script de recalcul RELIT `{ label, value }` et `moyenne`.
 */
const barres = (data: Barre[], opts: { moyenne?: number; surligne?: number } = {}) => {
  const W = 230;
  const G = 14;
  const D = 10;
  const HAUT = 24;
  const BAS = 128;
  const vals = data.map((d) => d.value);
  const vmax = Math.max(0, ...vals, opts.moyenne ?? 0);
  const k = (BAS - HAUT) / (vmax || 1);
  const y = (v: number) => HAUT + (vmax - v) * k;
  const slot = (W - G - D) / data.length;
  const bw = Math.min(26, slot * 0.62);
  const yLabels = BAS + 17;
  const H = yLabels + 10 + (opts.moyenne !== undefined ? 18 : 0);
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres">
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        <line x1="10" y1={HAUT - 8} x2="10" y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1="10" y1={y(0)} x2={W - D + 4} y2={y(0)} stroke="#0f172a" strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          const actif = opts.surligne === i;
          return (
            <g key={i}>
              <rect x={x} y={y(d.value)} width={bw} height={y(0) - y(d.value)} rx="3" fill={actif ? "#fed7aa" : "#bfdbfe"} stroke={actif ? ORANGE : BLEU} strokeWidth={actif ? 2.5 : 1.5} />
              <text x={x + bw / 2} y={y(d.value) - 5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                {fr(d.value)}
              </text>
              <text x={x + bw / 2} y={yLabels} textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">
                {d.label}
              </text>
            </g>
          );
        })}
        {opts.moyenne !== undefined ? (
          <g>
            <line x1="10" y1={y(opts.moyenne)} x2={W - D + 4} y2={y(opts.moyenne)} stroke={ROUGE} strokeWidth="2" strokeDasharray="6 4" />
            <line x1="14" y1={yLabels + 16} x2="34" y2={yLabels + 16} stroke={ROUGE} strokeWidth="2" strokeDasharray="6 4" />
            <text x="40" y={yLabels + 20} fontSize="12" fontWeight="800" fill={ROUGE}>
              {`moyenne : ${fr(opts.moyenne)}`}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
};

/**
 * Des POINTS RELIÉS (ex. 16), en SVG local, viewBox 300 × 204, police 14 :
 * une colonne par `etiquettes` (les semaines), l'axe vertical gradué tous les
 * `pas` depuis 0, la valeur écrite au-dessus de chaque point. Tout le texte
 * reste dans le cadre (mesuré le 29/09 : `repere` sortait ses graduations
 * quand l'axe des x commence à 0). ⭐ Le script relit etiquettes, valeurs, pas.
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
 * Un tableau HTML de plusieurs lignes (le `tableau()` commun n'en a qu'une) :
 * TROIS colonnes au plus, textes courts — il tient dans 235 px sans défiler.
 * La dernière ligne en gras si `total`. ⛔ Texte NU dans les cases.
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

export const exercicesStatStatistique5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "stat-statistique",
  titre: "Les statistiques",
  accroche:
    "Vingt exercices, du geste seul au problème : ranger une liste de réponses dans un tableau d'effectifs, lire un tableau et un diagramme, calculer une fréquence en fraction, en décimal et en pourcentage, construire un diagramme en bâtons, en barres ou circulaire, choisir la bonne représentation, calculer une moyenne et viser une moyenne. Des trajets d'élèves, un refuge, des oiseaux, un budget de club, le temps d'écran, un tournesol, des petits-déjeuners, des matchs, la pluie. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le tableau ou le diagramme dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/stat-statistique", titre: "Les statistiques" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je lis les données avec soin, je compte ou je calcule, et je vérifie avec le total.",
      rappel: [
        "L'effectif d'une catégorie, c'est le nombre de fois qu'elle apparaît. L'effectif total, c'est la somme de tous les effectifs.",
        "La fréquence, c'est effectif ÷ effectif total : une part, toujours entre 0 et 1, ou entre 0 % et 100 %.",
        "La moyenne d'une liste : j'additionne toutes les valeurs, puis je divise par le nombre de valeurs.",
        "Barres ou bâtons pour comparer ; diagramme circulaire pour montrer les parts d'un total.",
      ],
      exercices: [
        {
          enonce:
            "Au collège, on a demandé à $20$ élèves comment ils viennent le matin : B pour le bus, V pour le vélo, M pour la marche, C pour la voiture. Voici les réponses, dans l'ordre :\nB V M B B C M V B M B B V C B M B V M B\na) Range ces réponses dans un tableau d'effectifs.\nb) Vérifie ton total.\nc) Quel est le moyen de transport le plus utilisé ?",
          correction:
            "a) Je lis la liste une seule fois, et je fais un trait dans la bonne ligne à chaque réponse. Puis je compte les traits.\nBus : $9$. Vélo : $4$. Marche : $5$. Voiture : $2$.\nb) $9 + 4 + 5 + 2 = 20$ : c'est bien le nombre d'élèves interrogés. Aucune réponse n'est oubliée ni comptée deux fois.\nc) Le plus grand effectif est $9$ : le bus.\n⛔ Le piège : relire toute la liste une fois pour chaque lettre. On en saute une facilement ; un total qui ne tombe pas sur $20$ le signale.\nRéponse : bus $9$, vélo $4$, marche $5$, voiture $2$ ; total $20$ ; le bus.",
          schema: grille(["moyen", "traits", "effectif"], [
            ["bus", "||||| ||||", "9"],
            ["vélo", "||||", "4"],
            ["marche", "|||||", "5"],
            ["voiture", "||", "2"],
            ["total", "", "20"],
          ], true),
          micros: ["stat_donnee_organiser"],
        },
        {
          enonce:
            "Ce tableau donne le nombre de chats adoptés dans un refuge, de janvier à juin.\na) Combien de chats ont été adoptés en avril ?\nb) Quel mois en compte le plus ? Le moins ?\nc) Combien de chats ont été adoptés en six mois ?\nd) Combien de chats de plus en mai qu'en février ?",
          figure: tableau(["mois", "janv.", "févr.", "mars", "avr.", "mai", "juin"], ["chats", 8, 5, 11, 14, 17, 9], true),
          correction:
            "a) Je cherche la colonne « avr. » et je lis la case des chats : $14$.\nb) Le plus grand nombre est $17$ : c'est mai. Le plus petit est $5$ : c'est février.\nc) J'additionne les six effectifs : $8 + 5 + 11 + 14 + 17 + 9 = 64$ chats.\nd) $17 - 5 = 12$ chats de plus.\n⛔ Le piège : lire la case d'à côté. Je pose le doigt sur le mois, puis je descends (ou je glisse) jusqu'au nombre.\nRéponse : a) $14$ ; b) mai, février ; c) $64$ chats ; d) $12$ de plus.",
          micros: ["stat_lire_tableau"],
        },
        {
          enonce:
            "Pendant une heure, une famille a compté les oiseaux venus dans son jardin (nombres inventés). Voici le diagramme de ses résultats.\na) Quelle espèce a été la plus observée ?\nb) Combien d'oiseaux ont été comptés en tout ?\nc) Combien de mésanges de plus que de merles ?\nd) Quelle espèce représente exactement le quart des oiseaux comptés ?",
          figure: diagramme("barres", [
            { label: "Moineau", value: 16 },
            { label: "Merle", value: 5 },
            { label: "Mésange", value: 9 },
            { label: "Pigeon", value: 10 },
          ]),
          correction:
            "a) La barre la plus haute est celle du moineau : $16$ oiseaux.\nb) J'additionne les hauteurs des quatre barres : $16 + 5 + 9 + 10 = 40$ oiseaux.\nc) $9 - 5 = 4$ mésanges de plus.\nd) Le quart de $40$ : $40 \\div 4 = 10$. C'est la barre du pigeon.\n⛔ Le piège : répondre à la d) sans calculer le total d'abord. Un quart, c'est un quart du TOTAL.\nRéponse : a) le moineau ; b) $40$ oiseaux ; c) $4$ ; d) le pigeon.",
          micros: ["stat_lire_graphique"],
        },
        {
          enonce:
            "Dans un groupe de $40$ élèves de 5e, $14$ pratiquent un sport en club. Donne la fréquence de ces élèves :\na) sous forme de fraction simplifiée ;\nb) sous forme décimale ;\nc) en pourcentage.",
          correction:
            "La fréquence, c'est la part du total : effectif ÷ effectif total.\na) $\\dfrac{14}{40}$. Je simplifie par $2$ : $\\dfrac{14}{40} = \\dfrac{7}{20}$.\nb) $14 \\div 40 = 0{,}35$.\nc) $0{,}35 = \\dfrac{35}{100}$, soit $35$ %.\n⛔ Le piège : diviser dans le mauvais sens, $40 \\div 14 \\approx 2{,}86$. Une fréquence est une part : elle est toujours entre $0$ et $1$.\nRéponse : $\\dfrac{7}{20}$ ; $0{,}35$ ; $35$ %.",
          schema: ecranSeulement(
            diagramme("camembert", [
              { label: "en club", value: 14 },
              { label: "hors club", value: 26 },
            ]),
          ),
          micros: ["stat_effectif_frequence"],
        },
        {
          enonce: "Une équipe de basket a marqué $64$, $71$, $58$, $80$ et $67$ points lors de ses cinq derniers matchs. Calcule sa moyenne de points par match.",
          correction:
            "La moyenne partage le total en parts égales : j'additionne, puis je divise par le nombre de valeurs.\nLa somme : $64 + 71 + 58 + 80 + 67 = 340$ points.\nIl y a $5$ matchs : $340 \\div 5 = 68$.\nContrôle : $68$ est entre la plus petite valeur, $58$, et la plus grande, $80$.\n⛔ Le piège : s'arrêter à la somme, $340$. C'est le total des cinq matchs, pas le score d'un match moyen.\nRéponse : l'équipe marque en moyenne $68$ points par match.",
          schema: ecranSeulement(
            barres([
              { label: "M1", value: 64 },
              { label: "M2", value: 71 },
              { label: "M3", value: 58 },
              { label: "M4", value: 80 },
              { label: "M5", value: 67 },
            ], { moyenne: 68 }),
          ),
          micros: ["stat_moyenne"],
        },
        {
          enonce:
            "Dans une classe, on a compté les animaux de compagnie de chaque élève : $7$ élèves n'en ont aucun, $9$ en ont $1$, $5$ en ont $2$, $2$ en ont $3$ et $1$ élève en a $4$.\na) Représente ces données par un diagramme en bâtons.\nb) Combien d'élèves ont été interrogés ?\nc) Combien d'élèves ont au moins $2$ animaux ?",
          correction:
            "a) En bas, sur l'axe horizontal, le nombre d'animaux : $0$, $1$, $2$, $3$, $4$. Pour chacun, un bâton aussi haut que l'effectif, avec $1$ carreau pour $1$ élève.\nb) $7 + 9 + 5 + 2 + 1 = 24$ élèves.\nc) « Au moins $2$ », c'est $2$, $3$ ou $4$ animaux : $5 + 2 + 1 = 8$ élèves.\n⛔ Le piège : oublier le bâton du $0$. Les élèves sans animal font partie de l'enquête : ce sont même les deuxièmes plus nombreux.\nRéponse : b) $24$ élèves ; c) $8$ élèves.",
          schema: diagramme("batons", [
            { label: "0", value: 7 },
            { label: "1", value: 9 },
            { label: "2", value: 5 },
            { label: "3", value: 2 },
            { label: "4", value: 1 },
          ]),
          micros: ["stat_representer"],
        },
        {
          enonce:
            "Pour chaque situation, choisis la représentation la plus adaptée : un tableau, un diagramme en barres, un diagramme circulaire, ou des points reliés.\na) Suivre la taille d'un tournesol, semaine après semaine.\nb) Montrer la part de chaque activité dans une journée de $24$ h.\nc) Comparer le nombre d'inscrits dans quatre clubs du collège.\nd) Garder toutes les réponses exactes d'une enquête, pour pouvoir les recompter.",
          correction:
            "Je me demande d'abord : quelle question le dessin doit-il faire voir ?\na) Une évolution dans le temps : des points reliés. La ligne monte quand le tournesol grandit.\nb) Des parts d'un tout, les $24$ heures : un diagramme circulaire. Le disque entier, c'est la journée.\nc) Comparer des effectifs : un diagramme en barres. La barre la plus haute se voit d'un coup d'œil.\nd) Garder les nombres exacts : un tableau.\n⛔ Le piège : choisir le dessin « le plus joli ». Un diagramme circulaire pour une évolution dans le temps ne montrerait rien du tout.\nRéponse : a) points reliés ; b) circulaire ; c) barres ; d) tableau.",
          schema: ecranSeulement(
            diagramme("camembert", [
              { label: "sommeil", value: 9 },
              { label: "repas", value: 2 },
              { label: "collège", value: 8 },
              { label: "loisirs", value: 5 },
            ]),
          ),
          micros: ["stat_representation_choisir"],
        },
        {
          enonce:
            "Pour choisir le nom du club de sport du collège, $200$ élèves ont voté. Le Hibou a obtenu $30$ votes. Voici le diagramme circulaire des votes.\na) Le secteur de l'Aigle occupe la moitié du disque. Combien de votes a-t-il obtenus ? Quel pourcentage ?\nb) Celui du Faucon occupe un quart du disque. Même question.\nc) Calcule le pourcentage du Hibou, puis le nombre de votes et le pourcentage du Milan.\nd) Vérifie que les pourcentages font $100$ %.",
          figure: diagramme("camembert", [
            { label: "Aigle", value: 100 },
            { label: "Hibou", value: 30 },
            { label: "Faucon", value: 50 },
            { label: "Milan", value: 20 },
          ]),
          correction:
            "Le disque entier représente les $200$ votes, soit $100$ %.\na) La moitié : $200 \\div 2 = 100$ votes, soit $50$ %.\nb) Un quart : $200 \\div 4 = 50$ votes, soit $25$ %.\nc) Le Hibou : $30 \\div 200 = 0{,}15$, soit $15$ %.\nLe Milan a les votes qui restent : $200 - 100 - 50 - 30 = 20$ votes. Et $20 \\div 200 = 0{,}1$, soit $10$ %.\nd) $50 + 25 + 15 + 10 = 100$ : les quatre secteurs remplissent tout le disque.\n⛔ Le piège : lire un secteur sans le total. « Un quart du disque » ne donne un nombre de votes que si l'on sait que le disque vaut $200$ votes.\nRéponse : a) $100$ votes, $50$ % ; b) $50$ votes, $25$ % ; c) Hibou $15$ %, Milan $20$ votes et $10$ %.",
          micros: ["stat_lire_graphique", "stat_effectif_frequence"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur les mêmes données. Je fais le tableau, je vérifie le total, puis je calcule les fréquences ou la moyenne demandées.",
      rappel: [
        "Avec un total de 25, je passe en pourcentage en multipliant par 4 : 25 × 4 = 100.",
        "Les fréquences de toutes les catégories font 100 % en tout : c'est mon contrôle.",
        "Diagramme circulaire : le disque entier, 360°, représente le total. Un angle se calcule comme une fréquence de 360°.",
        "Une moyenne se situe toujours entre la plus petite et la plus grande valeur.",
      ],
      exercices: [
        {
          enonce:
            "Devant le collège, Tom note la couleur des $25$ premières voitures qui passent : G (gris), B (blanc), N (noir), R (rouge), U (bleu).\nG B N G G B R G N B G U B G N G B R G B N G U G B\na) Fais le tableau des effectifs.\nb) Calcule la fréquence de chaque couleur, en pourcentage.\nc) Vérifie que la somme des fréquences fait bien $100$ %.\nd) Tom dit : « Plus d'une voiture sur trois est grise. » A-t-il raison ?",
          correction:
            "a) Je lis la liste une seule fois, un trait par voiture : gris $10$, blanc $7$, noir $4$, rouge $2$, bleu $2$. Contrôle : $10 + 7 + 4 + 2 + 2 = 25$.\nb) Le total est $25$ : pour avoir des centièmes, je multiplie en haut et en bas par $4$.\nGris : $\\dfrac{10}{25} = \\dfrac{40}{100}$, soit $40$ %. Blanc : $\\dfrac{7}{25} = \\dfrac{28}{100}$, soit $28$ %. Noir : $16$ %. Rouge : $8$ %. Bleu : $8$ %.\nc) $40 + 28 + 16 + 8 + 8 = 100$ : le compte est bon.\nd) Une voiture sur trois, c'est $\\dfrac{1}{3}$, environ $33$ %. Les grises font $40$ %, plus que $33$ % : Tom a raison.\n⛔ Le piège : des fréquences qui ne font pas $100$ % au total. Le plus souvent, une lettre a été oubliée ou comptée deux fois.\nRéponse : gris $40$ %, blanc $28$ %, noir $16$ %, rouge $8$ %, bleu $8$ % ; Tom a raison.",
          schema: grille(["couleur", "effectif", "fréquence"], [
            ["gris", "10", "40 %"],
            ["blanc", "7", "28 %"],
            ["noir", "4", "16 %"],
            ["rouge", "2", "8 %"],
            ["bleu", "2", "8 %"],
            ["total", "25", "100 %"],
          ], true),
          micros: ["stat_donnee_organiser", "stat_effectif_frequence"],
        },
        {
          enonce:
            "Voici le nombre de licenciés d'un club omnisports, par sport, filles et garçons.\na) Combien de garçons font du judo ?\nb) Combien de licenciés font de la danse ?\nc) Combien de filles le club compte-t-il ?\nd) Quelle fraction des licenciés de football sont des filles ? Donne-la aussi en pourcentage.\ne) Dans quel sport les filles sont-elles plus nombreuses que les garçons ?",
          figure: grille(["sport", "filles", "garçons"], [
            ["judo", "12", "18"],
            ["danse", "25", "5"],
            ["football", "9", "21"],
          ]),
          correction:
            "Chaque case croise une ligne (le sport) et une colonne (filles ou garçons).\na) Ligne « judo », colonne « garçons » : $18$.\nb) La danse : $25$ filles et $5$ garçons, soit $25 + 5 = 30$ licenciés.\nc) J'additionne la colonne « filles » : $12 + 25 + 9 = 46$ filles.\nd) Le football compte $9 + 21 = 30$ licenciés, dont $9$ filles : $\\dfrac{9}{30} = \\dfrac{3}{10}$, soit $30$ %.\ne) En danse : $25$ filles contre $5$ garçons.\n⛔ Le piège : lire la mauvaise colonne, ou calculer la fraction sur tout le club au d). La question parle des licenciés de football seulement : le total est $30$.\nRéponse : a) $18$ ; b) $30$ ; c) $46$ ; d) $\\dfrac{3}{10}$, soit $30$ % ; e) la danse.",
          micros: ["stat_lire_tableau", "stat_effectif_frequence"],
        },
        {
          enonce:
            "Voici les températures relevées à midi pendant une semaine de mai (en °C).\na) Quel jour a-t-il fait le plus chaud ? Le plus froid ?\nb) Calcule la température moyenne de la semaine.\nc) Combien de jours la température a-t-elle dépassé la moyenne ?",
          figure: barres([
            { label: "lun", value: 12 },
            { label: "mar", value: 15 },
            { label: "mer", value: 9 },
            { label: "jeu", value: 14 },
            { label: "ven", value: 18 },
            { label: "sam", value: 16 },
            { label: "dim", value: 14 },
          ]),
          correction:
            "a) La barre la plus haute est vendredi, $18$ °C ; la plus basse mercredi, $9$ °C.\nb) La somme des sept températures : $12 + 15 + 9 + 14 + 18 + 16 + 14 = 98$.\nIl y a $7$ jours : $98 \\div 7 = 14$ °C.\nc) Au-dessus de $14$ °C : mardi ($15$), vendredi ($18$) et samedi ($16$), soit $3$ jours. Jeudi et dimanche sont juste à $14$ : ils ne dépassent pas.\n⭐ Sur le schéma, la ligne rouge de la moyenne coupe les barres : ce qui dépasse en haut comble ce qui manque en bas.\n⛔ Le piège : compter les jours « chauds » à l'œil, sans calculer la moyenne d'abord.\nRéponse : a) vendredi et mercredi ; b) $14$ °C ; c) $3$ jours.",
          schema: ecranSeulement(
            barres([
              { label: "lun", value: 12 },
              { label: "mar", value: 15 },
              { label: "mer", value: 9 },
              { label: "jeu", value: 14 },
              { label: "ven", value: 18 },
              { label: "sam", value: 16 },
              { label: "dim", value: 14 },
            ], { moyenne: 14 }),
          ),
          micros: ["stat_moyenne", "stat_lire_graphique"],
        },
        {
          enonce:
            "Lina a eu $12$, $9$ et $15$ à ses trois premiers contrôles de maths.\na) Quelle est sa moyenne ?\nb) Quelle note doit-elle avoir au quatrième contrôle pour que sa moyenne soit $13$ ?",
          correction:
            "a) $12 + 9 + 15 = 36$, et $36 \\div 3 = 12$. Sa moyenne est $12$.\nb) Je pars du total. Une moyenne de $13$ sur $4$ contrôles, c'est un total de $4 \\times 13 = 52$ points.\nElle a déjà $36$ points : il lui manque $52 - 36 = 16$.\nContrôle : $12 + 9 + 15 + 16 = 52$ et $52 \\div 4 = 13$.\n⛔ Le piège : croire qu'un $13$ suffit. Avec $13$, le total ferait $49$, et $49 \\div 4 = 12{,}25$.\nRéponse : a) $12$ ; b) il lui faut $16$.",
          schema: ecranSeulement(
            barres([
              { label: "1", value: 12 },
              { label: "2", value: 9 },
              { label: "3", value: 15 },
              { label: "4", value: 16 },
            ], { moyenne: 13, surligne: 3 }),
          ),
          micros: ["stat_moyenne", "stat_defi"],
        },
        {
          enonce:
            "Le club de voile a dépensé $1\\,200$ € cette année : $600$ € de matériel, $300$ € de trajets, $180$ € de goûters et $120$ € d'affiches.\na) Calcule la fréquence de chaque dépense, en pourcentage.\nb) On veut un diagramme circulaire. Calcule l'angle de chaque secteur.\nc) Trace le diagramme.",
          correction:
            "a) Fréquence = dépense ÷ total. Matériel : $600 \\div 1\\,200 = 0{,}5$, soit $50$ %. Trajets : $300 \\div 1\\,200 = 0{,}25$, soit $25$ %. Goûters : $180 \\div 1\\,200 = 0{,}15$, soit $15$ %. Affiches : $120 \\div 1\\,200 = 0{,}1$, soit $10$ %.\nb) Le disque entier, $360$°, représente les $1\\,200$ €. Chaque angle est la même part de $360$° :\nmatériel $0{,}5 \\times 360 = 180$° ; trajets $0{,}25 \\times 360 = 90$° ; goûters $0{,}15 \\times 360 = 54$° ; affiches $0{,}1 \\times 360 = 36$°.\nContrôle : $180 + 90 + 54 + 36 = 360$°.\nc) Au rapporteur, je trace les secteurs les uns après les autres, à partir d'un rayon.\n⛔ Le piège : prendre le pourcentage pour l'angle, $50$° pour le matériel. $50$ %, c'est la MOITIÉ du disque : $180$°.\nRéponse : $50$ %, $25$ %, $15$ %, $10$ % ; angles $180$°, $90$°, $54$° et $36$°.",
          schema: ecranSeulement(
            diagramme("camembert", [
              { label: "matériel", value: 600 },
              { label: "goûters", value: 180 },
              { label: "trajets", value: 300 },
              { label: "affiches", value: 120 },
            ]),
          ),
          micros: ["stat_representer", "stat_effectif_frequence"],
        },
        {
          enonce:
            "Voici le temps d'écran de Noé pendant un samedi, en minutes, représenté de deux façons.\na) Sur quel diagramme voit-on le plus vite quelle activité dure le plus longtemps ?\nb) Sur lequel voit-on le mieux la part de chaque activité dans son temps d'écran ?\nc) Calcule la part des vidéos, en fraction puis en pourcentage.\nd) Quelle activité occupe exactement un quart de son temps d'écran ?",
          figure: (
            <div className="grid grid-cols-1 min-w-0 gap-3 print:grid-cols-2">
              {diagramme("barres", [
                { label: "Vidéos", value: 90 },
                { label: "Jeux", value: 60 },
                { label: "Réseaux", value: 45 },
                { label: "Devoirs", value: 45 },
              ])}
              {diagramme("camembert", [
                { label: "Vidéos", value: 90 },
                { label: "Jeux", value: 60 },
                { label: "Réseaux", value: 45 },
                { label: "Devoirs", value: 45 },
              ])}
            </div>
          ),
          correction:
            "a) Le diagramme en barres : on compare les hauteurs, la plus haute saute aux yeux. Ce sont les vidéos.\nb) Le diagramme circulaire : le disque est tout le temps d'écran, chaque secteur en est une part.\nc) Le total : $90 + 60 + 45 + 45 = 240$ minutes, soit $4$ heures.\nLes vidéos : $\\dfrac{90}{240} = \\dfrac{3}{8}$, et $3 \\div 8 = 0{,}375$, soit $37{,}5$ %.\nd) Un quart de $240$ : $240 \\div 4 = 60$ minutes. Ce sont les jeux : leur secteur est un quart de disque.\n⛔ Le piège : chercher la part sur le diagramme en barres sans calculer le total. Une barre montre un effectif, pas une part.\nRéponse : a) les barres ; b) le circulaire ; c) $\\dfrac{3}{8}$, soit $37{,}5$ % ; d) les jeux.",
          micros: ["stat_representation_choisir", "stat_lire_graphique", "stat_effectif_frequence"],
        },
        {
          enonce:
            "Pendant cinq jours, des bénévoles ont planté des arbres : $8$ le lundi, $12$ le mardi, $0$ le mercredi (il pleuvait), $10$ le jeudi et $15$ le vendredi.\na) Calcule le nombre moyen d'arbres plantés par jour.\nb) Sacha ne compte pas le mercredi et trouve $11{,}25$. Explique son erreur.\nc) Le groupe voulait planter $60$ arbres en six jours. Combien doit-il en planter le samedi ?",
          correction:
            "a) La somme : $8 + 12 + 0 + 10 + 15 = 45$ arbres, en $5$ jours : $45 \\div 5 = 9$ arbres par jour.\nb) Sacha a divisé par $4$ : $45 \\div 4 = 11{,}25$. Mais le mercredi est un jour de la série : sa valeur est $0$, elle compte comme les autres.\nc) Il en faut $60$ en tout, il y en a déjà $45$ : $60 - 45 = 15$ arbres le samedi.\nAlors la moyenne sur six jours serait $60 \\div 6 = 10$ arbres par jour.\n⛔ Le piège : oublier la valeur $0$. Un $0$ n'ajoute rien à la somme, mais il compte dans le nombre de valeurs : il fait baisser la moyenne.\nRéponse : a) $9$ arbres par jour ; b) il a oublié le $0$ ; c) $15$ arbres.",
          schema: ecranSeulement(
            barres([
              { label: "lun", value: 8 },
              { label: "mar", value: 12 },
              { label: "mer", value: 0 },
              { label: "jeu", value: 10 },
              { label: "ven", value: 15 },
            ], { moyenne: 9 }),
          ),
          micros: ["stat_moyenne", "stat_defi"],
        },
        {
          enonce:
            "Emma mesure son tournesol chaque semaine. Semaine $1$ : $10$ cm ; semaine $2$ : $25$ cm ; semaine $3$ : $45$ cm ; semaine $4$ : $70$ cm ; semaine $5$ : $100$ cm ; semaine $6$ : $125$ cm.\na) Représente ces mesures par des points reliés : en abscisse les semaines, en ordonnée la hauteur, graduée de $25$ cm en $25$ cm.\nb) De combien le tournesol a-t-il grandi entre la semaine $3$ et la semaine $4$ ?\nc) Entre quelles semaines a-t-il le plus grandi ?\nd) De combien a-t-il grandi en moyenne chaque semaine ?",
          correction:
            "a) Pour chaque semaine, je place un point à la hauteur mesurée : $10$ cm au-dessus de la semaine $1$, $25$ cm au-dessus de la semaine $2$, et ainsi de suite jusqu'à $125$ cm. Puis je les relie, dans l'ordre des semaines.\nb) $70 - 45 = 25$ cm.\nc) Les pousses d'une semaine à l'autre : $15$, $20$, $25$, $30$ et $25$ cm. La plus grande, $30$ cm, est entre la semaine $4$ et la semaine $5$ : c'est là que la ligne monte le plus fort.\nd) La moyenne des cinq pousses : $15 + 20 + 25 + 30 + 25 = 115$, et $115 \\div 5 = 23$ cm par semaine.\n⭐ Contrôle : de $10$ cm à $125$ cm, il a grandi de $125 - 10 = 115$ cm en $5$ semaines.\n⛔ Le piège : lire la plus grande HAUTEUR ($125$ cm, semaine $6$) au lieu de la plus grande POUSSE. La pousse, c'est la pente de la ligne.\nRéponse : b) $25$ cm ; c) entre les semaines $4$ et $5$ ; d) $23$ cm par semaine.",
          schema: pointsRelies(["s1", "s2", "s3", "s4", "s5", "s6"], [10, 25, 45, 70, 100, 125], 25),
          micros: ["stat_lire_graphique", "stat_representer", "stat_moyenne"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une enquête, plusieurs questions qui s'enchaînent. J'organise, je calcule, je représente, puis je réponds par une phrase qui cite les nombres.",
      rappel: [
        "Liste brute → tableau d'effectifs → fréquences → diagramme : chaque étape se vérifie avec le total.",
        "Pour comparer deux groupes de tailles différentes, je compare des FRÉQUENCES, pas des effectifs.",
        "Pour viser une moyenne, je pars du total qu'il faut atteindre.",
      ],
      exercices: [
        {
          titre: "L'enquête sur le petit-déjeuner",
          enonce:
            "Pour le journal du collège, on demande à $25$ élèves ce qu'ils mangent le matin : T (tartines), C (céréales), F (fruit), B (brioche), R (rien).\nT C R T F C T R B C T R T C F R T C B R T C T F R\na) Fais le tableau des effectifs.\nb) Calcule la fréquence de chaque réponse, en pourcentage.\nc) Représente les résultats par un diagramme en barres.\nd) Le journal titre : « Près d'un élève sur quatre part sans petit-déjeuner. » Est-ce juste ?\ne) Quel diagramme faudrait-il pour montrer la part de chaque réponse dans l'ensemble ?",
          correction:
            "a) Un trait par réponse, en lisant la liste une seule fois : tartines $8$, céréales $6$, rien $6$, fruit $3$, brioche $2$. Contrôle : $8 + 6 + 6 + 3 + 2 = 25$.\nb) Le total est $25$ : je multiplie chaque effectif par $4$ pour avoir des pourcentages. Tartines $32$ %, céréales $24$ %, rien $24$ %, fruit $12$ %, brioche $8$ %.\nContrôle : $32 + 24 + 24 + 12 + 8 = 100$.\nc) Cinq barres, une par réponse, hautes de $8$, $6$, $6$, $3$ et $2$ (un carreau par élève).\nd) Un élève sur quatre, c'est $\\dfrac{1}{4}$, soit $25$ %. Les élèves sans petit-déjeuner font $24$ %, un tout petit peu moins : « près d'un sur quatre » est juste.\ne) Un diagramme circulaire : le disque représente les $25$ élèves.\n⛔ Le piège : vérifier le titre « à l'œil ». Il faut calculer la fréquence et la comparer à $25$ %.\nRéponse : $8$, $6$, $6$, $3$, $2$ ; $32$ %, $24$ %, $24$ %, $12$ %, $8$ % ; le titre est juste ; un diagramme circulaire.",
          schema: grille(["réponse", "effectif", "fréquence"], [
            ["tartines", "8", "32 %"],
            ["céréales", "6", "24 %"],
            ["rien", "6", "24 %"],
            ["fruit", "3", "12 %"],
            ["brioche", "2", "8 %"],
            ["total", "25", "100 %"],
          ], true),
          micros: ["stat_donnee_organiser", "stat_effectif_frequence", "stat_representer", "stat_defi", "stat_representation_choisir"],
        },
        {
          titre: "Deux jardins, deux comptages",
          enonce:
            "Deux familles comptent les oiseaux de leur jardin pendant la même heure (nombres inventés).\na) Dans quel jardin a-t-on vu le plus de moineaux ?\nb) Calcule la fréquence des moineaux dans chaque jardin, en pourcentage.\nc) Dans quel jardin les moineaux sont-ils, en proportion, les plus nombreux ?\nd) Même question pour les mésanges.",
          figure: grille(["espèce", "jardin A", "jardin B"], [
            ["moineau", "12", "9"],
            ["mésange", "10", "6"],
            ["merle", "8", "4"],
            ["autres", "10", "6"],
            ["total", "40", "25"],
          ], true),
          correction:
            "a) Jardin A : $12$ moineaux ; jardin B : $9$. On en a vu le plus dans le jardin A.\nb) Jardin A : $12 \\div 40 = 0{,}3$, soit $30$ %. Jardin B : $9 \\div 25 = 0{,}36$, soit $36$ %.\nc) $36$ % $> 30$ % : en proportion, les moineaux sont plus nombreux dans le jardin B, alors qu'on y en a vu moins !\nd) Mésanges : jardin A, $10 \\div 40 = 0{,}25$, soit $25$ % ; jardin B, $6 \\div 25 = 0{,}24$, soit $24$ %. Cette fois, c'est le jardin A, de très peu.\n⛔ Le piège : comparer les effectifs, $12$ contre $9$. Le jardin A a reçu plus d'oiseaux en tout, $40$ contre $25$ : pour comparer, il faut des fréquences.\nRéponse : a) le jardin A ; b) $30$ % et $36$ % ; c) le jardin B ; d) le jardin A, $25$ % contre $24$ %.",
          micros: ["stat_effectif_frequence", "stat_defi", "stat_lire_tableau"],
        },
        {
          titre: "Deux joueuses, une même moyenne",
          enonce:
            "Au basket, Anaïs a marqué $12$, $18$, $9$ et $21$ points lors de ses quatre matchs. Bérénice a marqué $15$, $14$, $16$ et $15$ points.\na) Calcule la moyenne de chacune.\nb) Laquelle est la plus régulière ? Explique avec le diagramme.\nc) Anaïs joue un cinquième match. Combien doit-elle marquer pour que sa moyenne passe à $16$ ?\nd) Bérénice joue aussi un cinquième match, et ne marque que $10$ points. Quelle est sa nouvelle moyenne ?",
          figure: ecranSeulement(
            barres([
              { label: "A1", value: 12 },
              { label: "A2", value: 18 },
              { label: "A3", value: 9 },
              { label: "A4", value: 21 },
              { label: "B1", value: 15 },
              { label: "B2", value: 14 },
              { label: "B3", value: 16 },
              { label: "B4", value: 15 },
            ], { moyenne: 15 }),
          ),
          correction:
            "a) Anaïs : $12 + 18 + 9 + 21 = 60$, et $60 \\div 4 = 15$. Bérénice : $15 + 14 + 16 + 15 = 60$, et $60 \\div 4 = 15$. Même moyenne : $15$ points.\nb) Les barres de Bérénice collent toutes à la ligne de la moyenne : ses scores vont de $14$ à $16$. Celles d'Anaïs s'en écartent beaucoup, de $9$ à $21$. Bérénice est la plus régulière.\nc) Pour une moyenne de $16$ sur $5$ matchs, il faut un total de $5 \\times 16 = 80$ points. Anaïs en a $60$ : il lui faut $80 - 60 = 20$ points.\nd) Nouveau total : $60 + 10 = 70$ points en $5$ matchs, et $70 \\div 5 = 14$ points.\n⛔ Le piège : croire que deux joueuses de même moyenne jouent pareil. La moyenne ne dit pas si les scores sont réguliers ou dispersés.\nRéponse : a) $15$ chacune ; b) Bérénice ; c) $20$ points ; d) $14$ points.",
          micros: ["stat_moyenne", "stat_defi", "stat_lire_graphique"],
        },
        {
          titre: "La pluie de six mois",
          enonce:
            "Une station météo a relevé la pluie tombée chaque mois (en mm) : janvier $60$, février $48$, mars $45$, avril $54$, mai $72$, juin $39$.\na) Représente ces données par un diagramme en barres.\nb) Calcule la pluie moyenne par mois.\nc) Quels mois ont été plus pluvieux que la moyenne ?\nd) Pour montrer la part de chaque mois dans la pluie des six mois, quel diagramme choisir ? Et pour voir comment la pluie change d'un mois à l'autre ?",
          correction:
            "a) Six barres, une par mois, dans l'ordre du calendrier, hautes de $60$, $48$, $45$, $54$, $72$ et $39$ mm.\nb) La somme : $60 + 48 + 45 + 54 + 72 + 39 = 318$ mm, en $6$ mois : $318 \\div 6 = 53$ mm par mois.\nc) Au-dessus de $53$ : janvier ($60$), avril ($54$) et mai ($72$), soit $3$ mois.\nd) La part de chaque mois dans le total : un diagramme circulaire. L'évolution d'un mois à l'autre : des barres dans l'ordre des mois, ou des points reliés.\n⛔ Le piège : confondre « plus pluvieux que la moyenne » et « le plus pluvieux ». Mai est le plus pluvieux, mais trois mois dépassent la moyenne.\nRéponse : b) $53$ mm ; c) janvier, avril et mai ; d) circulaire pour les parts, barres ou points reliés pour l'évolution.",
          schema: ecranSeulement(
            barres([
              { label: "jan", value: 60 },
              { label: "fév", value: 48 },
              { label: "mar", value: 45 },
              { label: "avr", value: 54 },
              { label: "mai", value: 72 },
              { label: "jun", value: 39 },
            ], { moyenne: 53 }),
          ),
          micros: ["stat_representer", "stat_moyenne", "stat_representation_choisir"],
        },
      ],
    },
  ],
};
