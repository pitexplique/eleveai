// ─── Fiche d'exercices : dépendance entre deux grandeurs (4e) — 20 exercices ───
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-fonctions.tsx` et sur les
// sept micros du coach de 4e (notionId fonction_dependance).
//
// ⛔⛔ LA LIMITE DU PROGRAMME (commentaire de la notion dans
// `lib/tutor-v4/knowledge/maths/4e/notions.ts`) : « La notation et le
// vocabulaire fonctionnels ne sont pas formalisés en 4e. » Cette feuille
// n'écrit donc NULLE PART la notation f(x), ni la flèche x ↦, ni les mots
// « fonction », « image », « antécédent », « affine », « linéaire ». Elle ne
// parle que de DÉPENDANCE entre deux grandeurs, décrite par une phrase, un
// programme de calcul, un tableau ou un graphique, et lue dans les deux sens.
// Le script de recalcul REFUSE ces mots dans tout le texte élève.
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le taxi (4 € + 2 €/km),
// ni les letchis, ni le côté du carré, ni la couleur des yeux, ni le maillot, ni
// × 3 puis + 2, ni × 4 puis + 7, ni 5 ; 8 ; 11 ; 14, ni 9 ; 14 ; 19 ; 24, ni le
// club de Malik, ni la salle d'escalade, ni les offres A et B à 6 € ou 5 €. ⛔ Ni
// ceux de la feuille de 3e (gel en montagne, marée, dégagement du gardien,
// randonnée, boîte sans couvercle, crue, 2x² − 5, 3x − 7, (x + 2)² − 9).
//
// ⭐ L'IDÉE DE LA FEUILLE : une dépendance a un SENS. La puissance des panneaux
// dépend de l'heure, mais l'heure ne dépend pas de la puissance (11) ; le prix
// dépend de la masse des melons, pas de leur nombre (15). Et dépendre n'est pas
// être proportionnel (7, 12, 14, 18, 19).
//
// Les pièges nommés : le mois pris pour l'âge (1), l'ordre des étapes (2, 9),
// remonter dans le mauvais ordre (3, 16), chercher dans la mauvaise ligne
// (4, 10), partir du mauvais axe (5, 6), « dépendre, c'est être
// proportionnel » (7, 14), tester une seule colonne (8), s'arrêter au premier
// point trouvé (11), ce qui reste pris pour ce qui a brûlé (12), remonter une
// soustraction à l'envers (13), un seul contre-exemple suffit (15), la baisse
// comptée depuis 0 °C (17), le comptage pas ramené à 8 s (18), « vitesse
// double, distance double » (19), la formule la moins chère « en soi » (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - CO₂ au Mauna Loa (Hawaï), moyennes annuelles : 316,9 ppm en 1960, 338,8 en
//   1980, 369,7 en 2000, 414,2 en 2020 (NOAA Global Monitoring Laboratory,
//   série « Mauna Loa CO2 annual mean data ») — arrondis à l'unité, ex. 10 ;
// - fréquence cardiaque maximale ≈ 220 − âge : formule de Fox et Haskell
//   (1971), une estimation grossière mais la plus répandue — ex. 13 ;
// - la baisse de 6,5 °C par kilomètre d'altitude : atmosphère type de l'OACI
//   (jusqu'à 11 km) ; les 13 °C au sol sont ceux « de ce jour-là » ; le mont
//   Blanc à 4 805 m (mesure de 2023), arrondi à 4,8 km — ex. 17 ;
// - la loi de Dolbear (A. E. Dolbear, « The Cricket as a Thermometer », The
//   American Naturalist, 1897) : pour le grillon arboricole Oecanthus fultoni,
//   température en °C ≈ nombre de chants en 8 secondes + 5 — ex. 18 ;
// - distance de freinage sur route sèche ≈ (vitesse en km/h ÷ 10)², la règle
//   approchée enseignée pour le code de la route — ex. 19 ;
// - les panneaux solaires (ex. 11), la trottinette (1 € + 0,25 €/min, ex. 14),
//   le gîte, le four, le tournesol, la patinoire sont imaginés, à l'ordre de
//   grandeur réel.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés ont
// leur dessin. Trois aides locales, relues par le script de recalcul :
//   · `machine(départ, étapes, retour)` : le programme de calcul en boîtes et
//     flèches, étape par étape ; en orange quand on le REMONTE ;
//   · `tab(lignes, lus)` : le tableau de valeurs, avec la colonne lue en bleu
//     (je pars du haut) ou en orange (je pars du bas) ;
//   · `graphe(axeX, axeY, noms, séries, lectures)` : un repère SVG gradué
//     comme on veut (des prix, des années, des altitudes négatives), et chaque
//     lecture tracée en pointillés rouges — on monte puis on va à gauche, ou
//     l'inverse. ⚠️ `repere()` de figures.tsx ne gradue que les entiers, un par
//     un : illisible pour 0 à 100 € ou 1960 à 2020.
// ⛔ LISIBLE À 375 PX : le SVG a un viewBox de 260 et une police de 13, soit
// 11,75 px sur les 235 px d'un dessin de corrigé.
//
// Les corrigés sont écrits à la première personne (« je repère »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-dependance-4e.mjs`.
//
// Micro-compétences : fonction_reconnaitre (1, 7, 11, 15, 18),
// fonction_programme (2, 3, 9, 12, 13, 16, 18), fonction_tableau_lire (4, 10,
// 13, 15, 19), fonction_graphique_lire (5, 6, 11, 12, 14, 17, 20),
// fonction_changer_mode (8, 10, 12, 14, 17, 20), fonction_probleme (13, 17,
// 18, 19, 20), fonction_defi (9, 11, 15, 16, 19, 20). 7/7.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";

/** Deux dessins côte à côte : l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier. Une légende courte au-dessus de chacun. */
const deux = (a: ReactNode, b: ReactNode, legendes?: [string, string]) => (
  <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 print:grid-cols-2">
    {[a, b].map((d, i) => (
      <div key={i}>
        {legendes && <p className="mb-1 text-center text-sm font-bold text-slate-700">{legendes[i]}</p>}
        {d}
      </div>
    ))}
  </div>
);

/**
 * LE PROGRAMME DE CALCUL DESSINÉ : le nombre de départ, puis chaque étape
 * (« + 5 », « × 3 ») sur une flèche, et le nombre obtenu dans sa boîte ; le
 * dernier en rouge. `retour` : on REMONTE le programme (orange), en défaisant
 * les étapes de la dernière à la première.
 * Du HTML : les boîtes passent à la ligne sur téléphone, rien à mesurer.
 * ⚠️ Écrire les nombres en clair (« −10 ») : le script refait chaque étape.
 */
const machine = (depart: string, etapes: [string, string][], retour = false) => {
  const teinte = retour ? "border-orange-400 bg-orange-50 text-orange-800" : "border-blue-400 bg-blue-50 text-blue-800";
  return (
    <div className="mx-auto w-full max-w-[22rem]">
      {retour && <p className="mb-1 text-center text-xs font-semibold text-orange-700">je remonte : de la dernière étape à la première</p>}
      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm print:text-xs">
        <span className="rounded-lg border-2 border-slate-400 bg-white px-2 py-1 font-bold text-slate-900">{depart}</span>
        {etapes.map(([op, res], i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="flex flex-col items-center leading-tight">
              <span className={`whitespace-nowrap rounded-full border px-2 text-xs font-bold ${teinte}`}>{op}</span>
              <span aria-hidden className="text-slate-500">⟶</span>
            </span>
            <span
              className={`whitespace-nowrap rounded-lg border-2 bg-white px-2 py-1 font-bold ${i === etapes.length - 1 ? "border-red-500 text-red-600" : "border-slate-400 text-slate-900"}`}
            >
              {res}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * LE TABLEAU DE VALEURS d'un exercice : une ligne par grandeur, la première
 * case est le nom de la grandeur. `lus` colore une colonne (numérotée à partir
 * de 1, après le nom) : « bas » = je pars du haut et je descends (bleu),
 * « haut » = je pars du bas et je remonte (orange), « conflit » = même départ,
 * résultats différents (rouge), « accord » = même départ, même résultat (vert).
 * Une ligne dont le nom est « écart » dit de combien on avance d'une case à
 * l'autre. Du HTML : lisible à toutes les largeurs, défile s'il le faut.
 */
type Lu = { col: number; sens: "bas" | "haut" | "conflit" | "accord" };
const TEINTE: Record<Lu["sens"], string> = {
  bas: "bg-blue-100 font-bold text-blue-800",
  haut: "bg-orange-100 font-bold text-orange-800",
  conflit: "bg-red-100 font-bold text-red-700",
  accord: "bg-green-100 font-bold text-green-800",
};
const SIGNE: Record<Lu["sens"], string> = { bas: "↓", haut: "↑", conflit: "✗", accord: "✓" };
const LEGENDE: Record<Lu["sens"], string> = {
  bas: "↓ je pars du haut",
  haut: "↑ je pars du bas",
  conflit: "✗ même départ, résultats différents",
  accord: "✓ même départ, même résultat",
};
const tab = (lignes: string[][], lus: Lu[] = []) => {
  const sens = (j: number) => lus.find((l) => l.col === j)?.sens;
  const presents = [...new Set(lus.map((l) => l.sens))];
  return (
    <div className="mx-auto w-full max-w-[24rem] overflow-x-auto print:max-w-[16rem] print:overflow-visible">
      <table className="mx-auto border-collapse text-sm print:text-xs">
        <tbody>
          {lignes.map((l, i) => {
            const ecart = l[0] === "écart";
            return (
              <tr key={i}>
                {l.map((c, j) => {
                  if (j === 0)
                    return (
                      <th key={j} className={`border border-slate-400 px-2 py-1 text-left font-semibold ${ecart ? "bg-white italic text-slate-500" : "bg-slate-100 text-slate-800"}`}>
                        {c}
                      </th>
                    );
                  const s = sens(j);
                  return (
                    <td
                      key={j}
                      className={`whitespace-nowrap border border-slate-400 px-2 py-1 text-center ${ecart ? "italic text-blue-700" : s ? TEINTE[s] : "text-slate-900"}`}
                    >
                      {c}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {lus.length > 0 && (
            <tr>
              <td />
              {lignes[0].slice(1).map((_, j) => {
                const s = sens(j + 1);
                return (
                  <td key={j} className="pt-0.5 text-center text-base font-bold text-slate-700">
                    {s ? SIGNE[s] : ""}
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>
      {presents.length > 0 && <p className="mt-1 text-center text-xs text-slate-600">{presents.map((s) => LEGENDE[s]).join(" · ")}</p>}
    </div>
  );
};

/**
 * UN GRAPHIQUE GRADUÉ À LA DEMANDE. Chaque axe : `[min, max, pas du quadrillage,
 * une étiquette tous les combien de traits]`. `noms` : [axe du bas, axe de
 * gauche]. Une série est une ligne brisée (`relie`, par défaut) ou des points
 * seuls (`relie: false`). Chaque LECTURE `[x, y]` est tracée en pointillés
 * rouges depuis l'axe du bas jusqu'au point, puis jusqu'à l'axe de gauche.
 * ⛔ viewBox 260, police 13 : 11,75 px dans les 235 px d'un corrigé à 375.
 * ⛔ Texte NU (SVG) : « 1,6 », « −30 », jamais de `$`.
 * ⭐ Le script de recalcul RELIT les axes, les points et les lectures : les
 * écrire en clair dans l'appel.
 */
type Serie = { pts: [number, number][]; relie?: boolean; couleur?: string };
const graphe = (
  ax: [number, number, number, number],
  ay: [number, number, number, number],
  noms: [string, string],
  series: Serie[],
  lectures: [number, number][] = [],
) => {
  const [x0, x1, px, ex] = ax;
  const [y0, y1, py, ey] = ay;
  const W = 260;
  const H = 234;
  const L = 42;
  const R = 240;
  const T = 28;
  const B = 194;
  const sx = (x: number) => +(L + ((x - x0) / (x1 - x0)) * (R - L)).toFixed(2);
  const sy = (y: number) => +(B - ((y - y0) / (y1 - y0)) * (B - T)).toFixed(2);
  const traits = (a: number, b: number, p: number) => Array.from({ length: Math.round((b - a) / p) + 1 }, (_, i) => +(a + i * p).toFixed(4));
  const ecrit = (v: number) => String(v).replace("-", "−").replace(".", ",");
  const gx = traits(x0, x1, px);
  const gy = traits(y0, y1, py);
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Graphique : ${noms[1]} selon ${noms[0]}`}>
        <rect x={0} y={0} width={W} height={H} fill="#ffffff" />
        {gx.map((x) => (
          <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={T} y2={B} stroke="#e2e8f0" strokeWidth={1} />
        ))}
        {gy.map((y) => (
          <line key={`gy${y}`} x1={L} x2={R} y1={sy(y)} y2={sy(y)} stroke="#e2e8f0" strokeWidth={1} />
        ))}
        <line x1={L} x2={R} y1={B} y2={B} stroke="#334155" strokeWidth={1.5} />
        <line x1={L} x2={L} y1={T} y2={B} stroke="#334155" strokeWidth={1.5} />
        {y0 < 0 && y1 > 0 ? <line x1={L} x2={R} y1={sy(0)} y2={sy(0)} stroke="#334155" strokeWidth={1.2} /> : null}
        {gx
          .filter((_, i) => i % ex === 0)
          .map((x) => (
            <text key={`tx${x}`} x={sx(x)} y={B + 17} textAnchor="middle" fontSize={13} fill="#334155">
              {ecrit(x)}
            </text>
          ))}
        {gy
          .filter((_, i) => i % ey === 0)
          .map((y) => (
            <text key={`ty${y}`} x={L - 5} y={sy(y) + 4.5} textAnchor="end" fontSize={13} fill="#334155">
              {ecrit(y)}
            </text>
          ))}
        <text x={4} y={15} fontSize={13} fontWeight={700} fill="#0f172a">
          {noms[1]}
        </text>
        <text x={W - 4} y={H - 4} textAnchor="end" fontSize={13} fontWeight={700} fill="#0f172a">
          {noms[0]}
        </text>
        {series.map((s, i) => {
          const c = s.couleur ?? BLEU;
          return s.relie === false ? (
            <g key={`s${i}`}>
              {s.pts.map(([x, y], j) => (
                <circle key={j} cx={sx(x)} cy={sy(y)} r={3.5} fill={c} />
              ))}
            </g>
          ) : (
            <polyline key={`s${i}`} points={s.pts.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ")} fill="none" stroke={c} strokeWidth={2.5} strokeLinejoin="round" />
          );
        })}
        {lectures.map(([x, y], i) => (
          <g key={`l${i}`}>
            <polyline points={`${sx(x)},${B} ${sx(x)},${sy(y)} ${L},${sy(y)}`} fill="none" stroke={ROUGE} strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={sx(x)} cy={sy(y)} r={4} fill={ROUGE} />
          </g>
        ))}
      </svg>
    </div>
  );
};

export const exercicesDependance4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "fonction-dependance",
  titre: "Dépendance entre deux grandeurs : programme, tableau, graphique",
  accroche:
    "Vingt exercices, du geste seul au problème : suivre un programme de calcul et le remonter, lire un tableau et un graphique dans les deux sens, reconnaître quand une grandeur dépend d'une autre, et quand elle ne lui est pas proportionnelle. Des panneaux solaires, le CO₂ mesuré au Mauna Loa, un ballon-sonde, un grillon qui donne la température, la distance de freinage d'une voiture. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé et la lecture dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/fonction-dependance", titre: "Dépendance entre deux grandeurs" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : suivre un programme, lire un tableau ou un graphique. Je repère d'abord ce qu'on me donne.",
      rappel: [
        "Une grandeur DÉPEND d'une autre quand connaître la première SUFFIT pour trouver la seconde, sans hésiter.",
        "Un programme de calcul se suit dans l'ORDRE écrit. Pour le remonter, je défais les étapes à l'envers, en commençant par la dernière.",
        "Un tableau se lit dans les deux sens : de haut en bas quand on me donne le départ, de bas en haut quand on me donne le résultat.",
        "Sur un graphique : je pars de l'axe du bas, je monte jusqu'à la courbe, je lis à gauche. Dans l'autre sens : je pars de l'axe de gauche, je vais à droite, je descends.",
      ],
      exercices: [
        {
          enonce:
            "Pour chaque situation, la seconde grandeur dépend-elle de la première ? Autrement dit : si je connais la première, puis-je trouver la seconde, sans hésiter ?\na) Le nombre de vélos garés → le nombre de roues.\nb) Le mois de naissance d'une personne → sa taille.\nc) Le côté d'un triangle équilatéral → son périmètre.\nd) Le nombre de passagers d'un bus → l'âge du chauffeur.\ne) La durée d'une marche à $5$ km/h → la distance parcourue.",
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: ["non", "faux"] },
            { question: "e)", attendu: ["oui", "vrai"] },
          ],
          correction:
            "Pour chaque cas, je me pose une seule question : deux résultats différents pourraient-ils aller avec la MÊME valeur de départ ? Si oui, il n'y a pas de dépendance.\na) Oui. $7$ vélos ont toujours $7 \\times 2 = 14$ roues : le nombre de vélos fixe le nombre de roues.\nb) Non. Deux personnes nées en mars peuvent mesurer $1{,}20$ m et $1{,}85$ m : connaître le mois ne suffit pas.\nc) Oui. Un côté de $4$ cm donne toujours un périmètre de $3 \\times 4 = 12$ cm.\nd) Non. Avec $30$ passagers, le chauffeur peut avoir $25$ ans comme $58$ ans.\ne) Oui. En $2$ heures à $5$ km/h, on parcourt toujours $2 \\times 5 = 10$ km.\n⛔ Le piège au b) : répondre « oui » parce que la taille change avec l'âge. On connaît le MOIS de naissance, pas l'âge : un bébé et son grand-père peuvent être nés en mars.\nRéponse : oui pour a), c) et e) ; non pour b) et d).",
          schema: tableau(["situation", "a)", "b)", "c)", "d)", "e)"], ["dépend ?", "oui", "non", "oui", "non", "oui"]),
          micros: ["fonction_reconnaitre"],
        },
        {
          enonce:
            "Voici un programme de calcul :\n« Choisir un nombre. Lui ajouter $5$. Multiplier le résultat par $3$. »\nQuel résultat obtient-on en choisissant :\na) $2$ ?\nb) $0$ ?\nc) $-4$ ?\nd) $1{,}5$ ?",
          reponses: [
            { question: "a)", attendu: "21" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: "19,5" },
          ],
          correction:
            "Je fais les étapes dans l'ORDRE écrit : d'abord ajouter $5$, ensuite multiplier par $3$.\na) $2 + 5 = 7$, puis $7 \\times 3 = 21$.\nb) $0 + 5 = 5$, puis $5 \\times 3 = 15$.\nc) $-4 + 5 = 1$, puis $1 \\times 3 = 3$.\nd) $1{,}5 + 5 = 6{,}5$, puis $6{,}5 \\times 3 = 19{,}5$.\nÀ chaque nombre choisi correspond UN seul résultat : le résultat dépend du nombre choisi.\n⛔ Le piège : multiplier d'abord. $2 \\times 3 + 5 = 11$, ce n'est pas le même programme : l'ordre des étapes fait partie de la règle.\nRéponse : $21$ ; $15$ ; $3$ ; $19{,}5$.",
          schema: deux(
            machine("2", [["+ 5", "7"], ["× 3", "21"]]),
            tab([["nombre choisi", "2", "0", "−4", "1,5"], ["résultat", "21", "15", "3", "19,5"]]),
          ),
          micros: ["fonction_programme"],
        },
        {
          enonce:
            "Programme de calcul : « Choisir un nombre. Le multiplier par $2$. Soustraire $7$. »\na) Nadia obtient $15$. Quel nombre a-t-elle choisi ?\nb) Tom obtient $-1$. Quel nombre a-t-il choisi ?",
          reponses: [
            { question: "a)", attendu: "11" },
            { question: "b)", attendu: "3" },
          ],
          correction:
            "Je connais le RÉSULTAT et je cherche le départ : je remonte le programme. Je défais chaque étape par l'opération contraire, en commençant par la DERNIÈRE.\nLa dernière étape est « soustraire $7$ » : je la défais en ajoutant $7$. Puis je défais « multiplier par $2$ » en divisant par $2$.\na) $15 + 7 = 22$, puis $22 \\div 2 = 11$. Vérification : $11 \\times 2 - 7 = 15$.\nb) $-1 + 7 = 6$, puis $6 \\div 2 = 3$. Vérification : $3 \\times 2 - 7 = -1$.\n⛔ Le piège : défaire dans le mauvais ordre. $15 \\div 2 = 7{,}5$, puis $7{,}5 + 7 = 14{,}5$ ; la vérification le démasque : $14{,}5 \\times 2 - 7 = 22$, pas $15$.\nRéponse : Nadia a choisi $11$ ; Tom a choisi $3$.",
          schema: deux(machine("15", [["+ 7", "22"], ["÷ 2", "11"]], true), machine("−1", [["+ 7", "6"], ["÷ 2", "3"]], true), ["Nadia", "Tom"]),
          micros: ["fonction_programme"],
        },
        {
          enonce:
            "Un gîte de montagne affiche le prix d'une nuit selon le nombre de personnes.\na) Combien paie un groupe de $4$ personnes ?\nb) Un groupe a payé $170$ €. Combien de personnes compte-t-il ?\nc) Un groupe peut-il payer $120$ € ?",
          reponses: [
            { question: "a)", attendu: "150" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          figure: tab([["personnes", "1", "2", "3", "4", "5", "6"], ["prix (€)", "90", "110", "130", "150", "170", "190"]]),
          correction:
            "Je repère d'abord ce que la question me DONNE : le nombre de personnes (ligne du haut) ou le prix (ligne du bas).\na) On me donne $4$ personnes : je pars de $4$ dans la ligne du haut et je DESCENDS. Je lis $150$ €.\nb) On me donne le prix, $170$ € : je le cherche dans la ligne du BAS, puis je MONTE. Au-dessus de $170$, je lis $5$ personnes.\nc) Je cherche $120$ dans la ligne du bas : il n'y est pas. $2$ personnes paient $110$ € et $3$ personnes paient $130$ € : aucun groupe ne paie $120$ €.\n⛔ Le piège au b) : chercher $170$ dans la ligne du haut. Le nombre $170$ est un PRIX : il se cherche dans la ligne des prix.\nRéponse : $150$ € ; $5$ personnes ; non, aucun groupe ne paie $120$ €.",
          schema: tab(
            [["personnes", "1", "2", "3", "4", "5", "6"], ["prix (€)", "90", "110", "130", "150", "170", "190"]],
            [{ col: 4, sens: "bas" }, { col: 5, sens: "haut" }],
          ),
          micros: ["fonction_tableau_lire"],
        },
        {
          enonce:
            "Le graphique donne la hauteur d'un tournesol (en cm) selon le nombre de semaines après sa sortie de terre.\na) Quelle est sa hauteur au bout de $4$ semaines ?\nb) Au bout de $6$ semaines ?\nc) Au bout de $10$ semaines ?\nd) De combien a-t-il grandi entre la semaine $4$ et la semaine $6$ ?",
          reponses: [
            { question: "a)", attendu: "80", unite: "cm" },
            { question: "b)", attendu: "140", unite: "cm" },
            { question: "c)", attendu: "200", unite: "cm" },
            { question: "d)", attendu: "60", unite: "cm" },
          ],
          figure: graphe([0, 10, 1, 2], [0, 220, 20, 2], ["semaines", "hauteur (cm)"], [{ pts: [[0, 10], [2, 30], [4, 80], [6, 140], [8, 180], [10, 200]] }]),
          correction:
            "On me donne un nombre de SEMAINES, qui se lit sur l'axe du bas. Pour chaque question, je pars de l'axe du bas, je MONTE jusqu'à la courbe, puis je vais à GAUCHE lire la hauteur.\na) Je pars de $4$ : je lis $80$ cm.\nb) Je pars de $6$ : je lis $140$ cm.\nc) Je pars de $10$ : je lis $200$ cm, soit $2$ m.\nd) Il est passé de $80$ cm à $140$ cm : $140 - 80 = 60$ cm en deux semaines.\n⛔ Le piège : partir de $6$ sur l'axe de GAUCHE. Le $6$ est un nombre de semaines, il se trouve sur l'axe du bas ; l'axe de gauche porte les hauteurs.\nRéponse : $80$ cm ; $140$ cm ; $200$ cm ; il a grandi de $60$ cm.",
          schema: graphe([0, 10, 1, 2], [0, 220, 20, 2], ["semaines", "hauteur (cm)"], [{ pts: [[0, 10], [2, 30], [4, 80], [6, 140], [8, 180], [10, 200]] }], [[4, 80], [6, 140], [10, 200]]),
          micros: ["fonction_graphique_lire"],
        },
        {
          enonce:
            "Le graphique donne la température d'un four (en °C) selon le temps écoulé depuis qu'on l'a allumé (en minutes).\na) Au bout de combien de temps le four atteint-il $140$ °C ?\nb) Et $180$ °C ?\nc) La recette dit : « enfourner à $200$ °C ». À partir de quand peut-on enfourner ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "8" },
          ],
          figure: graphe([0, 10, 1, 2], [0, 220, 20, 2], ["minutes", "température (°C)"], [{ pts: [[0, 20], [2, 80], [4, 140], [6, 180], [8, 200], [10, 200]] }]),
          correction:
            "Cette fois, on me donne une TEMPÉRATURE : elle se lit sur l'axe de gauche. Je fais donc le trajet inverse : je pars de l'axe de gauche, je vais à DROITE jusqu'à la courbe, puis je DESCENDS lire le temps.\na) Je pars de $140$ : j'arrive sur la courbe au-dessus de $4$. Il faut $4$ minutes.\nb) Je pars de $180$ : je descends sur $6$. Il faut $6$ minutes.\nc) La courbe atteint $200$ au-dessus de $8$, puis reste plate : le four est à $200$ °C à partir de $8$ minutes.\n⛔ Le piège : partir de $140$ sur l'axe du bas. Le $140$ est une température : il se cherche sur l'axe des températures.\nRéponse : $4$ minutes ; $6$ minutes ; à partir de $8$ minutes.",
          schema: graphe([0, 10, 1, 2], [0, 220, 20, 2], ["minutes", "température (°C)"], [{ pts: [[0, 20], [2, 80], [4, 140], [6, 180], [8, 200], [10, 200]] }], [[4, 140], [6, 180], [8, 200]]),
          micros: ["fonction_graphique_lire"],
        },
        {
          enonce:
            "Deux sites impriment des photos. Site A : $0{,}20$ € la photo. Site B : $0{,}15$ € la photo, plus $2$ € de frais d'envoi.\na) Pour chaque site, le prix dépend-il du nombre de photos ?\nb) Pour quel site le prix est-il proportionnel au nombre de photos ? Justifier par le calcul.",
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["A", "site A", "le site A"] },
          ],
          figure: tab([["photos", "10", "20", "40"], ["prix A (€)", "2", "4", "8"], ["prix B (€)", "3,50", "5", "8"]]),
          correction:
            "a) Oui pour les deux : un nombre de photos donné fixe UN seul prix, sur chaque site.\nb) Je divise chaque prix par le nombre de photos.\nSite A : $2 \\div 10 = 0{,}2$ ; $4 \\div 20 = 0{,}2$ ; $8 \\div 40 = 0{,}2$. Toujours $0{,}2$ : le prix A est proportionnel au nombre de photos.\nSite B : $3{,}5 \\div 10 = 0{,}35$ ; $5 \\div 20 = 0{,}25$. Les quotients sont différents : le prix B n'est PAS proportionnel.\nSur le graphique (A en bleu, B en orange), les points de A sont alignés avec l'origine. Ceux de B sont alignés aussi, mais leur droite part de $2$ sur l'axe de gauche : même avec $0$ photo, on paierait les $2$ € d'envoi.\n⛔ Le piège : croire que « dépendre » veut dire « être proportionnel ». Le prix B dépend bien du nombre de photos, sans lui être proportionnel.\nRéponse : les deux prix dépendent du nombre de photos ; seul le prix A lui est proportionnel.",
          schema: graphe(
            [0, 40, 5, 2],
            [0, 10, 1, 2],
            ["photos", "prix (€)"],
            [
              { pts: [[0, 0], [40, 8]] },
              { pts: [[10, 2], [20, 4], [40, 8]], relie: false },
              { pts: [[0, 2], [40, 8]], couleur: ORANGE },
              { pts: [[10, 3.5], [20, 5], [40, 8]], relie: false, couleur: ORANGE },
            ],
          ),
          micros: ["fonction_reconnaitre"],
        },
        {
          enonce: "Voici un tableau de valeurs. Trouver un programme de calcul qui le donne, puis le vérifier sur toutes les colonnes.",
          figure: tab([["nombre choisi", "1", "2", "3", "4"], ["résultat", "7", "10", "13", "16"]]),
          correction:
            "Je regarde de combien le résultat augmente quand le nombre choisi augmente de $1$ : $10 - 7 = 3$, $13 - 10 = 3$, $16 - 13 = 3$. Toujours $3$ : le programme MULTIPLIE par $3$.\nPour $1$, multiplier par $3$ donne $3$, mais il faut $7$ : il manque $7 - 3 = 4$. Le programme AJOUTE ensuite $4$.\nProgramme : « Choisir un nombre. Le multiplier par $3$. Ajouter $4$. »\nJe vérifie TOUTES les colonnes : $2 \\times 3 + 4 = 10$ ; $3 \\times 3 + 4 = 13$ ; $4 \\times 3 + 4 = 16$. ✓\n⛔ Le piège : ne tester qu'une colonne. « Multiplier par $7$ » marche pour $1$, mais $2 \\times 7 = 14$, pas $10$.\nRéponse : multiplier par $3$, puis ajouter $4$.",
          schema: tab([["nombre choisi", "1", "2", "3", "4"], ["résultat", "7", "10", "13", "16"], ["écart", "", "+3", "+3", "+3"]]),
          micros: ["fonction_changer_mode"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions, comme en devoir. Je justifie chaque lecture et chaque calcul par une phrase, avec l'unité.",
      rappel: [
        "Je repère d'abord ce que l'énoncé DONNE : la valeur de départ (je lis ou je calcule dans le sens direct) ou le résultat (je cherche, je remonte).",
        "Dépendre n'est pas être proportionnel. Pour le savoir, je regarde ce que donne $0$ : si ce n'est pas $0$, ce n'est pas proportionnel.",
        "Du tableau au programme : je regarde de combien la valeur augmente à chaque pas, puis ce qu'il faut ajouter, et je vérifie TOUTES les colonnes.",
      ],
      exercices: [
        {
          enonce:
            "Deux programmes de calcul.\nProgramme A : « Choisir un nombre. Lui ajouter $4$. Multiplier par $2$. »\nProgramme B : « Choisir un nombre. Le multiplier par $2$. Lui ajouter $4$. »\na) Appliquer les deux programmes au nombre $3$.\nb) Les appliquer à $0$, puis à $10$.\nc) Que remarque-t-on ? L'expliquer en appelant $n$ le nombre choisi.\nd) Avec le programme A, quel nombre faut-il choisir pour obtenir $20$ ?",
          reponses: [
            { question: "a) A", attendu: "14" },
            { question: "a) B", attendu: "10" },
            { question: "b) A(0)", attendu: "8" },
            { question: "b) B(0)", attendu: "4" },
            { question: "b) A(10)", attendu: "28" },
            { question: "b) B(10)", attendu: "24" },
            { question: "d)", attendu: "6" },
          ],
          correction:
            "a) Programme A : $3 + 4 = 7$, puis $7 \\times 2 = 14$. Programme B : $3 \\times 2 = 6$, puis $6 + 4 = 10$.\nb) Avec $0$ : A donne $(0 + 4) \\times 2 = 8$ et B donne $0 \\times 2 + 4 = 4$. Avec $10$ : A donne $(10 + 4) \\times 2 = 28$ et B donne $10 \\times 2 + 4 = 24$.\nc) A donne toujours $4$ de plus que B. Avec le nombre $n$ : A donne $(n + 4) \\times 2 = 2n + 8$ et B donne $2n + 4$. Dans A, le $4$ est multiplié par $2$ ; dans B, il ne l'est pas.\nd) Je remonte A, en commençant par la dernière étape : $20 \\div 2 = 10$, puis $10 - 4 = 6$. Vérification : $(6 + 4) \\times 2 = 20$.\n⛔ Le piège : croire que les deux programmes sont les mêmes parce qu'ils utilisent les mêmes nombres. L'ORDRE des étapes change le résultat.\nRéponse : $14$ et $10$ ; $8$ et $4$, puis $28$ et $24$ ; A donne toujours $4$ de plus ; il faut choisir $6$.",
          schema: deux(machine("3", [["+ 4", "7"], ["× 2", "14"]]), machine("3", [["× 2", "6"], ["+ 4", "10"]]), ["programme A", "programme B"]),
          micros: ["fonction_programme", "fonction_defi"],
        },
        {
          enonce:
            "Au sommet du volcan Mauna Loa, à Hawaï, on mesure depuis 1958 la quantité de dioxyde de carbone (CO₂) dans l'air, en ppm (parties par million). Voici quatre moyennes annuelles.\na) Quelle était la quantité de CO₂ en $2000$ ?\nb) En quelle année était-elle de $339$ ppm ?\nc) Calculer la hausse entre deux mesures successives. Que remarque-t-on ?\nd) Placer les points dans un repère.",
          reponses: [
            { question: "a)", attendu: "370" },
            { question: "b)", attendu: "1980" },
            { question: "c)", attendu: "22 ; 31 ; 44" },
          ],
          figure: tab([["année", "1960", "1980", "2000", "2020"], ["CO₂ (ppm)", "317", "339", "370", "414"]]),
          correction:
            "a) On me donne l'année : je pars de $2000$ dans la ligne du haut et je descends. Je lis $370$ ppm.\nb) On me donne la quantité : je cherche $339$ dans la ligne du bas et je monte. C'était en $1980$.\nc) De $1960$ à $1980$ : $339 - 317 = 22$ ppm. De $1980$ à $2000$ : $370 - 339 = 31$ ppm. De $2000$ à $2020$ : $414 - 370 = 44$ ppm. Les durées sont les mêmes, $20$ ans, mais les hausses grandissent : le CO₂ augmente de plus en plus vite.\nd) Chaque colonne donne un point : $(1960\\,;\\,317)$, $(1980\\,;\\,339)$, etc. Sur le dessin, l'axe de gauche commence à $300$, sinon les quatre points seraient tassés tout en haut.\n⛔ Le piège au b) : répondre « $339$ ». Le $339$ est dans la question ; la réponse est une ANNÉE, lue dans la ligne du haut.\nRéponse : $370$ ppm ; en $1980$ ; $22$, $31$ puis $44$ ppm : la hausse accélère.",
          schema: graphe([1960, 2020, 10, 2], [300, 420, 10, 2], ["année", "CO₂ (ppm)"], [{ pts: [[1960, 317], [1980, 339], [2000, 370], [2020, 414]], relie: false }], [[2000, 370], [1980, 339]]),
          micros: ["fonction_tableau_lire", "fonction_changer_mode"],
        },
        {
          enonce:
            "Des panneaux solaires sur un toit, un jour d'été sans nuages. Le graphique donne la puissance produite (en kW) selon l'heure de la journée.\na) Quelle puissance produisent-ils à $10$ h ?\nb) À quelles heures produisent-ils $1{,}6$ kW ?\nc) À quelles heures produisent-ils $0{,}8$ kW ?\nd) La puissance dépend-elle de l'heure ? Et l'heure dépend-elle de la puissance ?",
          reponses: [
            { question: "a)", attendu: "1,6" },
            { question: "b)", attendu: "10 ; 16" },
            { question: "c)", attendu: "8 ; 18" },
            { question: "d) 1re", attendu: ["oui", "vrai"] },
            { question: "d) 2e", attendu: ["non", "faux"] },
          ],
          figure: graphe([6, 20, 1, 2], [0, 2.8, 0.2, 2], ["heure (h)", "puissance (kW)"], [{ pts: [[6, 0], [8, 0.8], [10, 1.6], [12, 2.4], [14, 2.4], [16, 1.6], [18, 0.8], [20, 0]] }]),
          correction:
            "a) On me donne l'heure : je pars de $10$ sur l'axe du bas, je monte jusqu'à la courbe, je lis à gauche : $1{,}6$ kW.\nb) On me donne la puissance : je pars de $1{,}6$ sur l'axe de gauche et je vais vers la droite. Je rencontre la courbe DEUX fois : au-dessus de $10$ et au-dessus de $16$. Donc à $10$ h et à $16$ h.\nc) Même trajet depuis $0{,}8$ : je rencontre la courbe au-dessus de $8$ et de $18$. Donc à $8$ h et à $18$ h.\nd) La puissance dépend de l'heure : à une heure donnée, je lis UNE seule puissance. Mais l'heure ne dépend pas de la puissance : $1{,}6$ kW va avec deux heures, $10$ h et $16$ h. Connaître la puissance ne suffit pas pour trouver l'heure.\n⛔ Le piège au b) : s'arrêter au premier point trouvé. Je suis la ligne jusqu'au bout du graphique : l'après-midi, le soleil redescend et la puissance repasse par $1{,}6$ kW.\nRéponse : $1{,}6$ kW ; à $10$ h et à $16$ h ; à $8$ h et à $18$ h ; la puissance dépend de l'heure, mais pas l'inverse.",
          schema: graphe([6, 20, 1, 2], [0, 2.8, 0.2, 2], ["heure (h)", "puissance (kW)"], [{ pts: [[6, 0], [8, 0.8], [10, 1.6], [12, 2.4], [14, 2.4], [16, 1.6], [18, 0.8], [20, 0]] }], [[10, 1.6], [16, 1.6], [8, 0.8], [18, 0.8]]),
          micros: ["fonction_graphique_lire", "fonction_reconnaitre", "fonction_defi"],
        },
        {
          enonce:
            "Une bougie neuve mesure $15$ cm. Allumée, elle raccourcit de $2$ cm par heure.\na) Écrire un programme de calcul qui donne sa hauteur (en cm) à partir du nombre d'heures.\nb) Calculer sa hauteur après $0$, $1$, $2$, $3$, $4$ et $5$ heures, dans un tableau.\nc) Placer les points dans un repère. Que remarque-t-on ?\nd) La hauteur est-elle proportionnelle au temps ?\ne) Au bout de combien de temps la bougie mesure-t-elle $6$ cm ?",
          reponses: [
            { question: "a)", attendu: ["-2t+15", "-2x+15", "-2h+15"] },
            { question: "b)", attendu: "15 ; 13 ; 11 ; 9 ; 7 ; 5" },
            { question: "d)", attendu: ["non", "faux"] },
            { question: "e)", attendu: ["4,5", "4h30", "4h30min"] },
          ],
          correction:
            "a) Chaque heure, la bougie perd $2$ cm : je multiplie le nombre d'heures par $2$, puis je retire le résultat de $15$. Avec $t$ heures : hauteur $= 15 - 2 \\times t$.\nb) $15 - 2 \\times 0 = 15$ ; $15 - 2 \\times 1 = 13$ ; $15 - 2 \\times 2 = 11$ ; $15 - 2 \\times 3 = 9$ ; $15 - 2 \\times 4 = 7$ ; $15 - 2 \\times 5 = 5$.\nc) Les points sont alignés, sur une droite qui descend.\nd) Non. Au départ, après $0$ heure, la hauteur vaut déjà $15$ cm, et pas $0$. D'ailleurs, en deux fois plus de temps, la bougie ne mesure pas deux fois plus : $13$ cm après $1$ h, $11$ cm après $2$ h.\ne) Je remonte : de $15$ cm à $6$ cm, elle a perdu $15 - 6 = 9$ cm. À $2$ cm par heure : $9 \\div 2 = 4{,}5$ heures. Sur le graphique, je pars de $6$ à gauche, je vais jusqu'à la droite, je descends sur $4{,}5$.\n⛔ Le piège au e) : calculer $6 \\div 2 = 3$ heures. Les $6$ cm sont ce qui RESTE, pas ce qui a brûlé.\nRéponse : hauteur $= 15 - 2 \\times t$ ; $15$, $13$, $11$, $9$, $7$ et $5$ cm ; les points sont alignés ; non ; au bout de $4{,}5$ heures, soit $4$ h $30$ min.",
          schema: deux(
            tab([["heures", "0", "1", "2", "3", "4", "5"], ["hauteur (cm)", "15", "13", "11", "9", "7", "5"]]),
            graphe([0, 8, 1, 1], [0, 16, 1, 2], ["heures", "hauteur (cm)"], [{ pts: [[0, 15], [7.5, 0]] }, { pts: [[0, 15], [1, 13], [2, 11], [3, 9], [4, 7], [5, 5]], relie: false }], [[4.5, 6]]),
          ),
          micros: ["fonction_changer_mode", "fonction_programme", "fonction_graphique_lire"],
        },
        {
          enonce:
            "Pour un sportif, on estime souvent la fréquence cardiaque maximale (en battements par minute) par le programme : « prendre $220$ et lui soustraire l'âge, en années ».\na) Calculer la fréquence maximale d'une joueuse de $14$ ans, puis celle d'un entraîneur de $40$ ans.\nb) Un coureur a une fréquence maximale de $190$ battements par minute. Quel âge a-t-il, d'après ce programme ?\nc) Calculer la fréquence maximale à $10$, $20$, $30$, $40$ et $50$ ans, dans un tableau.\nd) La fréquence maximale est-elle proportionnelle à l'âge ?",
          reponses: [
            { question: "a) jou.", attendu: "206" },
            { question: "a) entr.", attendu: "180" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "210 ; 200 ; 190 ; 180 ; 170" },
            { question: "d)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) $220 - 14 = 206$ battements par minute pour la joueuse ; $220 - 40 = 180$ pour l'entraîneur.\nb) Je connais le résultat, je cherche l'âge : quel nombre faut-il retirer à $220$ pour obtenir $190$ ? C'est l'écart $220 - 190 = 30$. Il a $30$ ans. Vérification : $220 - 30 = 190$.\nc) $220 - 10 = 210$ ; $220 - 20 = 200$ ; $220 - 30 = 190$ ; $220 - 40 = 180$ ; $220 - 50 = 170$.\nd) Non. De $20$ à $40$ ans, l'âge double, mais la fréquence passe de $200$ à $180$ : elle ne double pas, elle baisse. Chaque année de plus retire $1$ battement par minute.\n⛔ Le piège au b) : calculer $190 + 220$, comme pour « défaire une soustraction ». Ici, c'est l'ÂGE qu'on a soustrait : l'âge est donc l'écart entre $220$ et $190$.\nRéponse : $206$ et $180$ battements par minute ; $30$ ans ; $210$, $200$, $190$, $180$ et $170$ ; non.",
          schema: deux(
            tab([["âge (ans)", "10", "20", "30", "40", "50"], ["fréquence max", "210", "200", "190", "180", "170"]], [{ col: 3, sens: "haut" }]),
            graphe([0, 60, 5, 2], [150, 230, 10, 2], ["âge (ans)", "battements par min"], [{ pts: [[10, 210], [60, 160]] }, { pts: [[10, 210], [20, 200], [30, 190], [40, 180], [50, 170]], relie: false }], [[30, 190]]),
          ),
          micros: ["fonction_programme", "fonction_tableau_lire", "fonction_probleme"],
        },
        {
          enonce:
            "Dans une ville, une trottinette électrique se loue avec un prix de déblocage, puis un prix à la minute. Le graphique donne le prix payé (en €) selon la durée du trajet (en minutes).\na) Combien coûte un trajet de $12$ minutes ?\nb) Combien de temps peut-on rouler pour $6$ € ?\nc) Lire le prix du déblocage (pour $0$ minute), puis calculer le prix d'une minute.\nd) En déduire un programme de calcul qui donne le prix à partir de la durée. Calculer le prix d'un trajet de $30$ minutes.",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "20" },
            { question: "c) débl.", attendu: "1" },
            { question: "c) min", attendu: "0,25" },
            { question: "d) 30min", attendu: "8,5" },
          ],
          figure: graphe([0, 32, 2, 2], [0, 10, 0.5, 4], ["durée (min)", "prix (€)"], [{ pts: [[0, 1], [32, 9]] }]),
          correction:
            "a) Je pars de $12$ sur l'axe du bas, je monte jusqu'à la droite, je lis à gauche : $4$ €.\nb) Je pars de $6$ sur l'axe de gauche, je vais jusqu'à la droite, je descends : $20$ minutes.\nc) Pour $0$ minute, la droite part de $1$ : le déblocage coûte $1$ €. De $0$ à $12$ minutes, le prix passe de $1$ € à $4$ € : $3$ € pour $12$ minutes, soit $3 \\div 12 = 0{,}25$ € par minute.\nd) Programme : « Multiplier la durée par $0{,}25$. Ajouter $1$. » Je le vérifie sur le graphique : $12 \\times 0{,}25 + 1 = 4$ et $20 \\times 0{,}25 + 1 = 6$. ✓ Pour $30$ minutes : $30 \\times 0{,}25 + 1 = 8{,}5$, soit $8{,}50$ €.\n⛔ Le piège : croire que le prix est proportionnel à la durée, et doubler les $4$ € de $12$ minutes pour $24$ minutes. Le déblocage ne se paie qu'une fois : $24 \\times 0{,}25 + 1 = 7$ €, pas $8$ €.\nRéponse : $4$ € ; $20$ minutes ; $1$ € de déblocage et $0{,}25$ € la minute ; $8{,}50$ € pour $30$ minutes.",
          schema: deux(
            graphe([0, 32, 2, 2], [0, 10, 0.5, 4], ["durée (min)", "prix (€)"], [{ pts: [[0, 1], [32, 9]] }], [[12, 4], [20, 6], [30, 8.5]]),
            tab([["durée (min)", "0", "12", "20", "30"], ["prix (€)", "1", "4", "6", "8,50"]]),
          ),
          micros: ["fonction_graphique_lire", "fonction_changer_mode"],
        },
        {
          enonce:
            "Au marché, Inès note ce que paient ses clients pour des melons.\nTableau 1 : le nombre de melons achetés et le prix payé.\nTableau 2 : la masse achetée et le prix payé.\na) Le prix dépend-il du nombre de melons ?\nb) D'après le tableau 2, le prix dépend-il de la masse ? Quel est le prix d'un kilogramme ?\nc) Combien paiera un client qui achète $3{,}5$ kg de melons ?",
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: ["oui", "vrai"] },
            { question: "b) 1 kg", attendu: "2" },
            { question: "c)", attendu: "7" },
          ],
          figure: deux(
            tab([["melons", "2", "3", "2", "4"], ["prix (€)", "6", "9", "5", "12"]]),
            tab([["masse (kg)", "1,5", "2", "2,5", "1,5"], ["prix (€)", "3", "4", "5", "3"]]),
            ["tableau 1", "tableau 2"],
          ),
          correction:
            "a) Non. Deux clients ont acheté $2$ melons : l'un a payé $6$ €, l'autre $5$ €. Pour la même valeur de départ, deux prix différents : connaître le nombre de melons ne suffit pas. Les melons n'ont pas tous la même masse.\nb) Oui, dans ce tableau : les deux clients qui ont acheté $1{,}5$ kg ont payé le même prix, $3$ €. Et $3 \\div 1{,}5 = 2$ ; $4 \\div 2 = 2$ ; $5 \\div 2{,}5 = 2$ : le kilogramme coûte $2$ €.\nc) $3{,}5 \\times 2 = 7$ : le client paiera $7$ €.\n⛔ Le piège au a) : répondre « oui » parce qu'en général, plus on achète de melons, plus on paie. Il suffit d'UN contre-exemple, deux prix pour $2$ melons, pour répondre non.\nRéponse : non ; oui, $2$ € le kilogramme ; $7$ €.",
          schema: deux(
            tab([["melons", "2", "3", "2", "4"], ["prix (€)", "6", "9", "5", "12"]], [{ col: 1, sens: "conflit" }, { col: 3, sens: "conflit" }]),
            tab([["masse (kg)", "1,5", "2", "2,5", "1,5"], ["prix (€)", "3", "4", "5", "3"]], [{ col: 1, sens: "accord" }, { col: 4, sens: "accord" }]),
            ["tableau 1", "tableau 2"],
          ),
          micros: ["fonction_reconnaitre", "fonction_tableau_lire", "fonction_defi"],
        },
        {
          enonce:
            "Programme de calcul : « Choisir un nombre. Lui soustraire $6$. Multiplier par $5$. Ajouter $12$. »\na) Quel résultat obtient-on en choisissant $10$ ? Et en choisissant $6$ ?\nb) Le résultat est $47$. Quel nombre a-t-on choisi ?\nc) Le résultat est $2$. Quel nombre a-t-on choisi ?",
          reponses: [
            { question: "a) 10", attendu: "32" },
            { question: "a) 6", attendu: "12" },
            { question: "b)", attendu: "13" },
            { question: "c)", attendu: "4" },
          ],
          correction:
            "a) $10 - 6 = 4$, puis $4 \\times 5 = 20$, puis $20 + 12 = 32$. Avec $6$ : $6 - 6 = 0$, puis $0 \\times 5 = 0$, puis $0 + 12 = 12$.\nb) Je remonte, en défaisant de la DERNIÈRE étape à la première : $47 - 12 = 35$, puis $35 \\div 5 = 7$, puis $7 + 6 = 13$. Vérification : $13 - 6 = 7$, $7 \\times 5 = 35$, $35 + 12 = 47$. ✓\nc) Même chemin : $2 - 12 = -10$, puis $(-10) \\div 5 = -2$, puis $-2 + 6 = 4$. Vérification : $4 - 6 = -2$, $(-2) \\times 5 = -10$, $-10 + 12 = 2$. ✓\n⛔ Le piège : défaire les étapes dans l'ordre où elles sont écrites, en ajoutant $6$ d'abord. On défait d'abord ce qui a été fait EN DERNIER, comme on retire ses chaussures avant ses chaussettes.\nRéponse : $32$ et $12$ ; on a choisi $13$ ; on a choisi $4$.",
          schema: deux(
            machine("47", [["− 12", "35"], ["÷ 5", "7"], ["+ 6", "13"]], true),
            machine("2", [["− 12", "−10"], ["÷ 5", "−2"], ["+ 6", "4"]], true),
            ["résultat 47", "résultat 2"],
          ),
          micros: ["fonction_programme", "fonction_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je passe de la phrase au programme, au tableau ou au graphique, puis je réponds par une phrase.",
      rappel: [
        "Je traduis la phrase de l'énoncé en programme de calcul : chaque étape, dans l'ordre. Le tableau et le graphique viennent ensuite.",
        "Quand on me donne le résultat, je remonte le programme, ou je pars de l'axe de gauche du graphique.",
        "Comparer deux tarifs n'a de sens que pour un nombre donné : je cherche le nombre où ils coûtent pareil.",
      ],
      exercices: [
        {
          titre: "Le ballon-sonde",
          enonce:
            "Un ballon-sonde météo monte dans le ciel. Ce jour-là, il fait $13$ °C au sol, et la température baisse d'environ $6{,}5$ °C chaque fois que l'on monte de $1$ km.\na) Écrire un programme de calcul qui donne la température (en °C) à partir de l'altitude (en km).\nb) Calculer la température à $0$, $1$, $2$, $3$ et $4$ km, dans un tableau.\nc) À quelle altitude l'air est-il à $0$ °C ?\nd) Quelle température le ballon mesure-t-il en passant à l'altitude du sommet du mont Blanc, environ $4{,}8$ km ?\ne) Le ballon mesure $-26$ °C. À quelle altitude est-il ?",
          reponses: [
            { question: "a)", attendu: ["-6,5h+13", "-6,5x+13", "-6,5a+13"] },
            { question: "b)", attendu: "13 ; 6,5 ; 0 ; -6,5 ; -13" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "-18,2", tolerance: 0.5 },
            { question: "e)", attendu: "6" },
          ],
          correction:
            "a) Je multiplie l'altitude par $6{,}5$ : c'est la baisse. Puis je retire cette baisse de $13$. Avec $h$ km : température $= 13 - 6{,}5 \\times h$.\nb) $13 - 6{,}5 \\times 0 = 13$ ; $13 - 6{,}5 \\times 1 = 6{,}5$ ; $13 - 6{,}5 \\times 2 = 0$ ; $13 - 6{,}5 \\times 3 = -6{,}5$ ; $13 - 6{,}5 \\times 4 = -13$.\nc) Le tableau le montre : $0$ °C à $2$ km. Sur le graphique, la droite croise la ligne du $0$ au-dessus de $2$.\nd) $13 - 6{,}5 \\times 4{,}8 = 13 - 31{,}2 = -18{,}2$. Il fait environ $-18$ °C.\ne) Je remonte : de $13$ °C à $-26$ °C, la température a baissé de $13 + 26 = 39$ °C. À $6{,}5$ °C par km : $39 \\div 6{,}5 = 6$ km.\n⛔ Le piège au e) : calculer $26 \\div 6{,}5 = 4$ km. On part de $13$ °C, pas de $0$ °C : la baisse totale est de $39$ °C.\nRéponse : température $= 13 - 6{,}5 \\times h$ ; $13$, $6{,}5$, $0$, $-6{,}5$ et $-13$ °C ; à $2$ km ; environ $-18$ °C ; à $6$ km d'altitude.",
          schema: deux(
            tab([["altitude (km)", "0", "1", "2", "3", "4"], ["température (°C)", "13", "6,5", "0", "−6,5", "−13"]]),
            graphe([0, 6, 0.5, 2], [-30, 15, 5, 1], ["altitude (km)", "température (°C)"], [{ pts: [[0, 13], [6, -26]] }], [[2, 0], [4.8, -18.2], [6, -26]]),
          ),
          micros: ["fonction_probleme", "fonction_changer_mode", "fonction_graphique_lire"],
        },
        {
          titre: "Le grillon thermomètre",
          enonce:
            "Certains grillons chantent plus vite quand il fait chaud. Pour l'une de ces espèces, on estime la température (en °C) par le programme : « compter les chants pendant $8$ secondes, puis ajouter $5$ ».\na) Un soir, Hugo compte $20$ chants en $8$ secondes. Quelle température fait-il ?\nb) Il fait $18$ °C. Combien de chants Hugo devrait-il compter en $8$ secondes ?\nc) Calculer la température pour $10$, $15$, $20$ et $25$ chants, dans un tableau.\nd) Si le nombre de chants double, la température double-t-elle ?\ne) Plus tard, Hugo compte $51$ chants en $24$ secondes. Quelle température fait-il ?",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "13" },
            { question: "c)", attendu: "15 ; 20 ; 25 ; 30" },
            { question: "d)", attendu: ["non", "faux"] },
            { question: "e)", attendu: "22" },
          ],
          correction:
            "a) Je suis le programme : $20 + 5 = 25$. Il fait environ $25$ °C.\nb) Je connais le résultat, je remonte : je défais « ajouter $5$ » en retirant $5$. $18 - 5 = 13$ chants.\nc) $10 + 5 = 15$ ; $15 + 5 = 20$ ; $20 + 5 = 25$ ; $25 + 5 = 30$.\nd) Non. $10$ chants donnent $15$ °C ; $20$ chants, deux fois plus, donnent $25$ °C et non $30$ °C. La température dépend du nombre de chants, mais ne lui est pas proportionnelle : sur le graphique, la droite part de $5$, pas de $0$.\ne) $24$ secondes, c'est $3$ fois $8$ secondes : en $8$ secondes, Hugo aurait compté $51 \\div 3 = 17$ chants. Puis $17 + 5 = 22$ : il fait environ $22$ °C.\n⛔ Le piège au e) : calculer $51 + 5 = 56$ °C. Le programme demande les chants de $8$ secondes : je ramène d'abord le comptage à $8$ secondes.\nRéponse : environ $25$ °C ; $13$ chants ; $15$, $20$, $25$ et $30$ °C ; non ; environ $22$ °C.",
          schema: deux(
            tab([["chants en 8 s", "10", "15", "20", "25"], ["température (°C)", "15", "20", "25", "30"]]),
            graphe([0, 30, 5, 1], [0, 35, 5, 1], ["chants en 8 s", "température (°C)"], [{ pts: [[0, 5], [30, 35]] }, { pts: [[10, 15], [15, 20], [20, 25], [25, 30]], relie: false }], [[20, 25], [13, 18], [17, 22]]),
          ),
          micros: ["fonction_probleme", "fonction_programme", "fonction_reconnaitre"],
        },
        {
          titre: "Freiner à temps",
          enonce:
            "Sur route sèche, on estime la distance de freinage d'une voiture (en mètres) par une règle apprise au code de la route : « diviser la vitesse (en km/h) par $10$, puis multiplier le résultat par lui-même ».\na) Vérifier la valeur du tableau pour $90$ km/h.\nb) À quelle vitesse roulait une voiture qui a freiné sur $49$ m ?\nc) Calculer les distances à $50$ km/h et à $100$ km/h. La distance est-elle proportionnelle à la vitesse ?\nd) Sur autoroute, combien de mètres de freinage gagne-t-on en roulant à $110$ km/h au lieu de $130$ km/h ?",
          reponses: [
            { question: "a)", attendu: "81" },
            { question: "b)", attendu: "70" },
            { question: "c) 50", attendu: "25" },
            { question: "c) 100", attendu: "100" },
            { question: "c) prop.", attendu: ["non", "faux"] },
            { question: "d)", attendu: "48", unite: "m" },
          ],
          figure: tab([["vitesse (km/h)", "30", "50", "70", "90", "110", "130"], ["freinage (m)", "9", "25", "49", "81", "121", "169"]]),
          correction:
            "a) $90 \\div 10 = 9$, puis $9 \\times 9 = 81$ : $81$ m, c'est bien la valeur du tableau.\nb) On me donne la distance : je cherche $49$ dans la ligne du bas, et je monte : $70$ km/h. Vérification : $70 \\div 10 = 7$ et $7 \\times 7 = 49$. ✓\nc) À $50$ km/h : $5 \\times 5 = 25$ m. À $100$ km/h : $10 \\times 10 = 100$ m. La vitesse double, mais la distance est multipliée par $4$ : elle n'est pas proportionnelle à la vitesse. Sur le graphique, les points ne sont pas alignés : ils montent de plus en plus vite.\nd) $169 - 121 = 48$ m de freinage en moins, presque la moitié d'un terrain de football.\n⛔ Le piège au c) : croire qu'à vitesse double, la distance double et vaut $50$ m. Elle est multipliée par QUATRE : c'est pour cela que quelques km/h de trop coûtent cher.\nRéponse : $81$ m ; $70$ km/h ; $25$ m et $100$ m, donc pas proportionnel ; $48$ m de moins.",
          schema: graphe(
            [0, 140, 10, 2],
            [0, 180, 20, 2],
            ["vitesse (km/h)", "freinage (m)"],
            [{ pts: [[30, 9], [50, 25], [70, 49], [90, 81], [110, 121], [130, 169]], relie: false }, { pts: [[100, 100]], relie: false, couleur: ORANGE }],
            [[90, 81], [70, 49]],
          ),
          micros: ["fonction_tableau_lire", "fonction_probleme", "fonction_defi"],
        },
        {
          titre: "La carte de patinoire",
          enonce:
            "À la patinoire, l'entrée coûte $4{,}50$ €. On peut aussi acheter une carte à $30$ € pour l'année : l'entrée ne coûte alors plus que $2$ €. Sur le graphique : sans carte en bleu, avec la carte en orange.\na) Combien coûtent $8$ entrées sans carte ? Et avec la carte ?\nb) Et $20$ entrées ?\nc) Lire sur le graphique pour quel nombre d'entrées les deux formules coûtent le même prix. Le vérifier par le calcul.\nd) Chloé a $100$ € pour l'année. Combien d'entrées peut-elle faire au plus sans carte ? Et avec la carte ?",
          reponses: [
            { question: "a) sans", attendu: "36" },
            { question: "a) carte", attendu: "46" },
            { question: "b) sans", attendu: "90" },
            { question: "b) carte", attendu: "70" },
            { question: "c)", attendu: "12" },
            { question: "d) sans", attendu: "22" },
            { question: "d) carte", attendu: "35" },
          ],
          figure: graphe([0, 20, 1, 4], [0, 100, 5, 4], ["entrées", "prix (€)"], [{ pts: [[0, 0], [20, 90]] }, { pts: [[0, 30], [20, 70]], couleur: ORANGE }]),
          correction:
            "a) Sans carte : $8 \\times 4{,}5 = 36$ €. Avec la carte : $30 + 8 \\times 2 = 46$ €. Pour $8$ entrées, mieux vaut ne pas prendre la carte.\nb) Sans carte : $20 \\times 4{,}5 = 90$ €. Avec la carte : $30 + 20 \\times 2 = 70$ €. Pour $20$ entrées, la carte fait gagner $20$ €.\nc) Les deux droites se croisent au-dessus de $12$ entrées, à la hauteur de $54$ €. Vérification : $12 \\times 4{,}5 = 54$ et $30 + 12 \\times 2 = 54$. ✓ Avant $12$ entrées, la droite bleue est en dessous : c'est moins cher sans carte. Après, c'est l'orange : la carte devient rentable à partir de $13$ entrées.\nd) Sans carte : $100 \\div 4{,}5$ donne $22$ et un reste, donc $22$ entrées au plus ($22 \\times 4{,}5 = 99$). Avec la carte : il reste $100 - 30 = 70$ € après l'achat de la carte, et $70 \\div 2 = 35$ entrées.\n⛔ Le piège : chercher LA formule la moins chère. Il n'y en a pas en soi : la réponse dépend du nombre d'entrées, et elle change à $12$.\nRéponse : $36$ € et $46$ € ; $90$ € et $70$ € ; $12$ entrées, pour $54$ € ; $22$ entrées sans carte, $35$ avec la carte.",
          schema: graphe([0, 20, 1, 4], [0, 100, 5, 4], ["entrées", "prix (€)"], [{ pts: [[0, 0], [20, 90]] }, { pts: [[0, 30], [20, 70]], couleur: ORANGE }], [[12, 54]]),
          micros: ["fonction_defi", "fonction_probleme", "fonction_graphique_lire", "fonction_changer_mode"],
        },
      ],
    },
  ],
};
