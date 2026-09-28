// ─── Fiche d'exercices : représenter deux caractères (1re, sans spécialité) ───
//                              20 exercices corrigés
//
// Chapitre « Analyse de l'information chiffrée » (BOP1IC), troisième notion du
// coach (28/09/2026) : barres croisant deux caractères, diagrammes circulaires
// et semi-circulaires, choisir la représentation, commenter. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/information-chiffree.bank.ts`
// (info_rep_barres, info_rep_circulaire, info_rep_choisir, info_rep_commenter).
//
// ⭐⭐ LE FIL : EFFECTIFS OU POURCENTAGES ? Des barres groupées en effectifs
// comparent des NOMBRES de personnes ; des barres empilées à 100 % comparent des
// RÉPARTITIONS. Deux groupes de tailles différentes se comparent par leurs
// répartitions (9, 12, 17, 19). Et une part qui ne bouge pas peut cacher une
// quantité qui grandit (10, 18).
//
// ⭐ Deux dessins LOCAUX (le canvas `stat_graph` du coach ne fait qu'une série) :
// `barresCroisees` (groupées ou empilées) et `demiCercle` (l'hémicycle d'une
// assemblée). SVG simple, texte NU, lettres de 12 dans un viewBox de 300 rendu
// à 19rem au moins (≥ 11,4 px à 375, comme `diagramme()`), légende en haut.
// ⛔ Libellés de 9 signes au plus (groupes et légende).
//
// ⭐ Contextes : sport (licences), écologie (chauffage, tri, mix électrique),
// physique (énergie d'une maison, 11 ; production électrique, 10 et 17),
// histoire-géo (occupation des sols, 3 ; assemblées et élections, 5, 13, 20),
// économie (budget, ventes de vélos), nature (temps dehors, castor). Les
// chiffres sont des MODÈLES, jamais des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-info-representations-croisees.mjs`.
//
// Micro-compétences : info_rep_barres (1, 2, 7, 8, 9, 10, 12, 14, 17, 19),
// info_rep_circulaire (3, 4, 5, 11, 13, 18, 20), info_rep_choisir (6, 9, 11,
// 12, 15, 17, 18, 19), info_rep_commenter (7, 9, 10, 12, 13, 14, 16, 17, 18,
// 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (il redit le corrigé). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

const COULEURS = ["#2563eb", "#ea580c", "#16a34a", "#9333ea"];
const virgule = (n: number) => String(n).replace(".", ",");
/* Comme `diagramme()` : largeur minimale sur téléphone (le dessin défile), pas sur papier. */
const CADRE = "mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible";

/**
 * Des barres qui croisent deux caractères : un GROUPE par valeur du premier,
 * une SÉRIE (une couleur) par valeur du second. `groupees` : les barres côte à
 * côte, valeur au-dessus. `empilees` : une barre par groupe, découpée ;
 * quand chaque groupe fait 100, c'est la barre « empilée à 100 % ».
 * ⭐ Le script de recalcul relit groupes, séries et valeurs : en clair.
 */
const barresCroisees = (
  groupes: string[],
  series: { nom: string; valeurs: number[] }[],
  mode: "groupees" | "empilees" = "groupees",
  suffixe = "",
) => {
  const W = 300, H = 236, marge = 12, haut = 44, bas = 30;
  const zone = H - haut - bas;
  const base = H - bas;
  const totaux = groupes.map((_, i) => series.reduce((s, se) => s + se.valeurs[i], 0));
  const max = mode === "empilees" ? Math.max(...totaux) : Math.max(...series.flatMap((s) => s.valeurs)) * 1.12;
  const k = zone / max;
  const lg = (W - 2 * marge) / groupes.length;
  return (
    <div className={CADRE}>
      <div className="min-w-[19rem] print:min-w-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres croisant deux caractères">
          {series.map((s, j) => {
            const x = marge + (j * (W - 2 * marge)) / series.length;
            return (
              <g key={j}>
                <rect x={x} y={10} width={12} height={12} rx={2} fill={COULEURS[j]} />
                <text x={x + 16} y={20.5} fontSize="12" fontWeight="700" fill="#0f172a">
                  {s.nom}
                </text>
              </g>
            );
          })}
          <line x1={marge} x2={W - marge} y1={base} y2={base} stroke="#475569" strokeWidth="1.5" />
          {groupes.map((g, i) => {
            const x0 = marge + i * lg;
            const nomGroupe = (
              <text x={x0 + lg / 2} y={base + 19} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
                {g}
              </text>
            );
            if (mode === "empilees") {
              const bw = lg * 0.56;
              const xb = x0 + (lg - bw) / 2;
              let y = base;
              return (
                <g key={i}>
                  {series.map((s, j) => {
                    const h = s.valeurs[i] * k;
                    y -= h;
                    return (
                      <g key={j}>
                        <rect x={xb} y={y} width={bw} height={h} fill={COULEURS[j]} stroke="#fff" strokeWidth="1" />
                        {h >= 15 ? (
                          <text x={xb + bw / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
                            {virgule(s.valeurs[i])}
                            {suffixe}
                          </text>
                        ) : null}
                      </g>
                    );
                  })}
                  {nomGroupe}
                </g>
              );
            }
            const bw = (lg * 0.8) / series.length;
            return (
              <g key={i}>
                {series.map((s, j) => {
                  const h = s.valeurs[i] * k;
                  const x = x0 + lg * 0.1 + j * bw;
                  return (
                    <g key={j}>
                      <rect x={x + 1} y={base - h} width={bw - 2} height={h} fill={COULEURS[j]} />
                      <text x={x + bw / 2} y={base - h - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
                        {virgule(s.valeurs[i])}
                        {suffixe}
                      </text>
                    </g>
                  );
                })}
                {nomGroupe}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

/**
 * Le diagramme SEMI-CIRCULAIRE : l'hémicycle d'une assemblée. Le demi-disque
 * vaut 180° : chaque part a un angle proportionnel à sa valeur. La valeur est
 * écrite dans son secteur, les noms dans la légende (dessous).
 */
const demiCercle = (parts: { label: string; value: number }[]) => {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const cx = 150, cy = 140, r = 120;
  const pt = (t: number, rr = r) => `${(cx + rr * Math.cos(t)).toFixed(1)},${(cy - rr * Math.sin(t)).toFixed(1)}`;
  let cumul = 0;
  return (
    <div className={CADRE}>
      <div className="min-w-[19rem] print:min-w-0">
        <svg viewBox="0 0 300 204" className="block h-auto w-full" role="img" aria-label="Diagramme semi-circulaire">
          {parts.map((p, i) => {
            const t1 = Math.PI - (cumul / total) * Math.PI;
            cumul += p.value;
            const t2 = Math.PI - (cumul / total) * Math.PI;
            const [mx, my] = pt((t1 + t2) / 2, r * 0.72).split(",");
            return (
              <g key={i}>
                <path d={`M${cx},${cy} L${pt(t1)} A${r},${r} 0 0 1 ${pt(t2)} Z`} fill={COULEURS[i]} stroke="#fff" strokeWidth="2" />
                <text x={mx} y={Number(my) + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
                  {virgule(p.value)}
                </text>
              </g>
            );
          })}
          {parts.map((p, i) => {
            const x = i % 2 === 0 ? 30 : 165;
            const y = 162 + Math.floor(i / 2) * 22;
            return (
              <g key={`l${i}`}>
                <rect x={x} y={y} width={12} height={12} rx={2} fill={COULEURS[i]} />
                <text x={x + 16} y={y + 10.5} fontSize="12" fontWeight="700" fill="#0f172a">
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const exercicesInfoRepresentationsCroiseesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "info-representations-croisees",
  titre: "Représenter deux caractères",
  accroche:
    "Vingt exercices pour lire et choisir le bon graphique quand on croise deux caractères : barres groupées, barres empilées à 100 %, diagrammes circulaires et semi-circulaires. Licences sportives, chauffage, mix électrique, énergie d'une maison, hémicycle d'une assemblée, budget de deux familles. Un rappel de cours avant chaque niveau, une correction étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Lire le graphique, ou calculer un angle. Une règle par exercice.",
      rappel: [
        "Barres GROUPÉES : pour chaque groupe, une barre par valeur de l'autre caractère ; on compare des hauteurs.",
        "Barres EMPILÉES à $100$ % : chaque barre est un groupe entier, découpé selon l'autre caractère. On lit l'ÉPAISSEUR d'un morceau.",
        "Diagramme circulaire : $100$ % correspondent à $360°$, donc $1$ % à $3{,}6°$.",
        "Diagramme semi-circulaire : $100$ % correspondent à $180°$, donc $1$ % à $1{,}8°$.",
      ],
      exercices: [
        {
          enonce:
            "Le diagramme donne le nombre de licenciés de trois sports dans une région, en MILLIERS (modèle).\na) Combien de garçons font du basket ?\nb) Quel sport compte le plus de filles ?\nc) Dans quel sport l'écart entre filles et garçons est-il le plus grand ?",
          figure: barresCroisees(
            ["Football", "Basket", "Tennis"],
            [
              { nom: "Filles", valeurs: [4, 6, 5] },
              { nom: "Garçons", valeurs: [16, 7, 6] },
            ],
          ),
          correction:
            "a) Groupe « Basket », barre orange (garçons) : $7$ milliers, soit $7\\,000$ garçons.\nb) On compare les trois barres bleues : $4$, $6$, $5$. C'est le basket, avec $6\\,000$ filles.\nc) Les écarts : football $16 - 4 = 12$ ; basket $7 - 6 = 1$ ; tennis $6 - 5 = 1$. C'est le football : $12\\,000$ licenciés d'écart.\n⚠️ Ne pas oublier l'unité : « $7$ » sur le dessin veut dire $7$ MILLIERS.",
          micros: ["info_rep_barres"],
        },
        {
          enonce:
            "Ce diagramme en barres empilées à $100$ % donne le mode de chauffage des maisons et des appartements d'une commune (modèle).\na) Quelle part des maisons est chauffée au bois ?\nb) Quelle part des appartements est chauffée au gaz ?\nc) Peut-on savoir s'il y a plus de maisons ou d'appartements chauffés à l'électricité ?",
          figure: barresCroisees(
            ["Maisons", "Apparts"],
            [
              { nom: "Élec.", valeurs: [40, 60] },
              { nom: "Gaz", valeurs: [30, 35] },
              { nom: "Bois", valeurs: [30, 5] },
            ],
            "empilees",
            " %",
          ),
          correction:
            "a) Le morceau vert (bois) de la barre « Maisons » vaut $30$ % : $30$ % des maisons sont chauffées au bois.\nb) Le morceau orange de la barre « Apparts » : $35$ %.\n⚠️ On lit l'ÉPAISSEUR du morceau ($35$ %), pas la hauteur de son sommet ($60 + 35 = 95$).\nc) Non. On sait que $60$ % des appartements et $40$ % des maisons sont à l'électricité, mais pas COMBIEN il y a de maisons et d'appartements.\n⭐ Une barre à $100$ % donne des parts, jamais des effectifs.",
          micros: ["info_rep_barres"],
        },
        {
          enonce:
            "Le territoire d'une commune de campagne se partage ainsi (modèle) : forêts $45$ %, cultures $30$ %, prairies $15$ %, bâti $10$ %. Calculer l'angle de chaque secteur d'un diagramme circulaire.",
          correction:
            "$1$ % correspond à $360° \\div 100 = 3{,}6°$.\nForêts : $45 \\times 3{,}6 = 162°$. Cultures : $30 \\times 3{,}6 = 108°$.\nPrairies : $15 \\times 3{,}6 = 54°$. Bâti : $10 \\times 3{,}6 = 36°$.\n✔️ Contrôle : $162 + 108 + 54 + 36 = 360°$, un tour complet.",
          schema: ecranSeulement(
            diagramme("camembert", [
              { label: "Forêts", value: 45 },
              { label: "Cultures", value: 30 },
              { label: "Prairies", value: 15 },
              { label: "Bâti", value: 10 },
            ]),
          ),
          micros: ["info_rep_circulaire"],
        },
        {
          enonce:
            "Sur le diagramme circulaire du budget mensuel d'un étudiant, le secteur « Logement » mesure $144°$ et le secteur « Courses » $90°$. Son budget est de $800$ € par mois.\na) Quelle part du budget va au logement ? aux courses ?\nb) Combien d'euros cela représente-t-il ?",
          correction:
            "a) Le tour complet, $360°$, c'est $100$ % du budget.\nLogement : $\\dfrac{144}{360} = 0{,}4$, soit $40$ %. Courses : $\\dfrac{90}{360} = 0{,}25$, soit $25$ %.\nb) Logement : $0{,}4 \\times 800 = 320$ €. Courses : $0{,}25 \\times 800 = 200$ €.\n⭐ Un angle droit, $90°$, c'est toujours un quart du disque.",
          schema: ecranSeulement(
            diagramme("camembert", [
              { label: "Logement", value: 40 },
              { label: "Courses", value: 25 },
              { label: "Transport", value: 15 },
              { label: "Loisirs", value: 20 },
            ]),
          ),
          micros: ["info_rep_circulaire"],
        },
        {
          enonce:
            "Ce diagramme semi-circulaire représente les $200$ sièges d'une assemblée régionale (modèle), répartis entre quatre groupes.\na) Quelle part des sièges a le groupe $A$ ?\nb) Quel angle mesure son secteur ? Et celui du groupe $D$ ?",
          figure: demiCercle([
            { label: "Groupe A", value: 90 },
            { label: "Groupe B", value: 60 },
            { label: "Groupe C", value: 30 },
            { label: "Groupe D", value: 20 },
          ]),
          correction:
            "a) $\\dfrac{90}{200} = 0{,}45$ : $45$ % des sièges.\nb) Sur un DEMI-disque, $100$ % valent $180°$, donc $1$ % vaut $1{,}8°$.\nGroupe $A$ : $45 \\times 1{,}8 = 81°$.\nGroupe $D$ : $\\dfrac{20}{200} = 10$ %, soit $10 \\times 1{,}8 = 18°$.\n⚠️ Avec $3{,}6°$, on trouverait $162°$ : c'est l'angle d'un disque ENTIER.",
          micros: ["info_rep_circulaire"],
        },
        {
          enonce:
            "Pour chaque situation, choisir la représentation la plus adaptée : diagramme circulaire, barres groupées, barres empilées à $100$ %, ou nuage de points.\na) La répartition du budget d'une commune entre ses dépenses.\nb) Le nombre de filles et de garçons licenciés dans quatre sports.\nc) La répartition des modes de transport dans deux villes de tailles très différentes.\nd) La taille et la masse de $30$ élèves.",
          correction:
            "a) Diagramme circulaire : un TOUT (le budget) partagé en parts.\nb) Barres groupées : on compare des EFFECTIFS, sport par sport.\nc) Barres empilées à $100$ % : les villes n'ont pas la même taille, on compare leurs RÉPARTITIONS.\nd) Nuage de points : deux caractères NUMÉRIQUES pour chaque élève, un point par élève.\n⭐ La question à se poser : que veut-on faire VOIR ? Une répartition, une comparaison d'effectifs, un lien entre deux nombres ?",
          schema: ecranSeulement(
            tableauProba(
              ["On veut voir…", "Graphique"],
              [
                ["un tout partagé", "circulaire"],
                ["des effectifs", "barres groupées"],
                ["des répartitions", "empilées à 100 %"],
                ["un lien entre deux nombres", "nuage de points"],
              ],
            ),
          ),
          micros: ["info_rep_choisir"],
        },
        {
          enonce:
            "Le diagramme donne le temps d'écran quotidien moyen de deux tranches d'âge, en heures (modèle). Dire si chaque phrase est justifiée par le diagramme.\na) Les $15$–$17$ ans passent plus de temps devant un écran que les $12$–$14$ ans, en semaine comme le week-end.\nb) Le week-end, le temps d'écran double.\nc) Dans les deux tranches d'âge, on passe $2$ h de plus devant un écran le week-end.\nd) Les $15$–$17$ ans sont plus nombreux que les $12$–$14$ ans.",
          figure: barresCroisees(
            ["12–14 ans", "15–17 ans"],
            [
              { nom: "Semaine", valeurs: [3, 4] },
              { nom: "Week-end", valeurs: [5, 6] },
            ],
          ),
          correction:
            "a) Justifiée : $4 > 3$ en semaine, $6 > 5$ le week-end.\nb) Non justifiée : de $3$ à $5$ h et de $4$ à $6$ h, ce n'est pas le double ($2 \\times 3 = 6$, $2 \\times 4 = 8$).\nc) Justifiée : $5 - 3 = 2$ et $6 - 4 = 2$.\nd) Non justifiée : le diagramme donne des temps MOYENS, il ne dit rien du nombre de jeunes.\n⭐ Commenter, c'est citer des nombres lus… et ne rien affirmer que le graphique ne montre pas.",
          micros: ["info_rep_commenter", "info_rep_barres"],
        },
        {
          enonce:
            "Le diagramme donne, pour trois formations, le nombre de candidats admis et refusés, en CENTAINES (modèle).\na) Dresser le tableau croisé des effectifs, avec ses marges.\nb) Quelle formation a admis le plus de candidats ?",
          figure: barresCroisees(
            ["BTS", "BUT", "Licence"],
            [
              { nom: "Admis", valeurs: [4, 3, 9] },
              { nom: "Refusés", valeurs: [8, 6, 6] },
            ],
          ),
          correction:
            "a) On lit chaque barre, et on multiplie par $100$.\nBTS : $400$ admis, $800$ refusés, $1\\,200$ candidats.\nBUT : $300$ admis, $600$ refusés, $900$ candidats.\nLicence : $900$ admis, $600$ refusés, $1\\,500$ candidats.\nTotaux : $1\\,600$ admis, $2\\,000$ refusés, $3\\,600$ candidats.\nb) La licence, avec $900$ admis.\n⭐ Un diagramme en barres groupées, c'est un tableau croisé dessiné : on passe de l'un à l'autre.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Admis", "Refusés", "Total"],
              [
                ["BTS", "400", "800", "1200"],
                ["BUT", "300", "600", "900"],
                ["Licence", "900", "600", "1500"],
                ["Total", "1600", "2000", "3600"],
              ],
            ),
          ),
          micros: ["info_rep_barres"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Choisir entre effectifs et pourcentages, lire, puis commenter avec des nombres.",
      rappel: [
        "Pour comparer des groupes de tailles différentes, on représente des POURCENTAGES par groupe : barres empilées à $100$ %, ou un diagramme circulaire par groupe.",
        "Angle d'un secteur : part $\\times 360°$ (ou $\\times 180°$ pour un demi-disque).",
        "Un commentaire cite des nombres lus : « parmi les …, … % ».",
        "Une part qui ne change pas peut cacher une quantité qui change : il faut aussi le total.",
      ],
      exercices: [
        {
          titre: "Le tri dans deux villes",
          enonce:
            "On a relevé combien de foyers trient leurs déchets dans deux villes (modèle).\na) Dans quelle ville y a-t-il le plus de foyers qui trient ?\nb) Calculer la part des foyers qui trient dans chaque ville.\nc) Quelle représentation choisir pour comparer les deux villes ? La construire.\nd) Commenter.",
          figure: tableauProba(
            ["", "Trient", "Ne trient pas", "Total"],
            [
              ["Ville A", "300", "100", "400"],
              ["Ville B", "720", "480", "1200"],
            ],
          ),
          correction:
            "a) En effectif : la ville $B$, avec $720$ foyers contre $300$.\nb) Ville $A$ : $\\dfrac{300}{400} = 0{,}75$, soit $75$ %. Ville $B$ : $\\dfrac{720}{1\\,200} = 0{,}6$, soit $60$ %.\nc) Les villes n'ont pas la même taille : on choisit des barres empilées à $100$ %, une barre par ville.\nVille $A$ : $75$ % / $25$ %. Ville $B$ : $60$ % / $40$ %.\nd) La ville $B$ compte plus de foyers qui trient, parce qu'elle est trois fois plus grande. Mais en proportion, on trie davantage dans la ville $A$ : $75$ % contre $60$ %.",
          schema: ecranSeulement(
            barresCroisees(
              ["Ville A", "Ville B"],
              [
                { nom: "Tri", valeurs: [75, 60] },
                { nom: "Sans tri", valeurs: [25, 40] },
              ],
              "empilees",
              " %",
            ),
          ),
          micros: ["info_rep_choisir", "info_rep_barres", "info_rep_commenter"],
        },
        {
          titre: "L'électricité d'un pays",
          enonce:
            "Le diagramme donne la répartition de la production d'électricité d'un pays (modèle) en $2000$ et en $2020$. La production totale était de $400$ TWh en $2000$ et de $500$ TWh en $2020$.\na) Quelle part de l'électricité était renouvelable en $2000$ ? en $2020$ ?\nb) Calculer la production renouvelable, en TWh, à chaque date.\nc) La part du nucléaire n'a pas changé. Sa production non plus ?\nd) Commenter.",
          figure: barresCroisees(
            ["2000", "2020"],
            [
              { nom: "Renouv.", valeurs: [10, 20] },
              { nom: "Nucléaire", valeurs: [40, 40] },
              { nom: "Fossiles", valeurs: [50, 40] },
            ],
            "empilees",
            " %",
          ),
          correction:
            "a) $10$ % en $2000$, $20$ % en $2020$ : la part a doublé.\nb) $2000$ : $0{,}1 \\times 400 = 40$ TWh. $2020$ : $0{,}2 \\times 500 = 100$ TWh.\nLa production renouvelable a été multipliée par $\\dfrac{100}{40} = 2{,}5$.\nc) Non : $0{,}4 \\times 400 = 160$ TWh, puis $0{,}4 \\times 500 = 200$ TWh. Même part, mais d'un total plus grand.\nd) La part du renouvelable double, et sa production fait plus que doubler, car la production totale a augmenté.\n⚠️ Un diagramme à $100$ % cache le total : il faut le connaître pour parler de quantités.",
          micros: ["info_rep_barres", "info_rep_commenter"],
        },
        {
          titre: "L'énergie d'une maison",
          enonce:
            "Une maison consomme $15\\,000$ kWh d'énergie par an (modèle) : $7\\,500$ kWh pour le chauffage, $3\\,000$ kWh pour l'eau chaude, et le reste pour les autres usages électriques (éclairage, appareils…).\na) Quelle représentation montre le mieux comment se partage cette énergie ?\nb) Calculer la part de chaque usage, puis l'angle de son secteur.",
          correction:
            "a) Un diagramme circulaire : un tout ($15\\,000$ kWh) partagé en trois usages.\nb) Autres usages : $15\\,000 - 7\\,500 - 3\\,000 = 4\\,500$ kWh.\nChauffage : $\\dfrac{7\\,500}{15\\,000} = 0{,}5$, soit $50$ %, et $0{,}5 \\times 360 = 180°$.\nEau chaude : $\\dfrac{3\\,000}{15\\,000} = 0{,}2$, soit $20$ %, et $0{,}2 \\times 360 = 72°$.\nAutres : $\\dfrac{4\\,500}{15\\,000} = 0{,}3$, soit $30$ %, et $0{,}3 \\times 360 = 108°$.\n✔️ $180 + 72 + 108 = 360°$.\n⭐ Le chauffage prend la moitié du disque : c'est là qu'une meilleure isolation économise le plus.",
          schema: ecranSeulement(
            diagramme("camembert", [
              { label: "Chauffage", value: 50 },
              { label: "Eau chaude", value: 20 },
              { label: "Autres", value: 30 },
            ]),
          ),
          micros: ["info_rep_circulaire", "info_rep_choisir"],
        },
        {
          titre: "Venir au lycée",
          enonce:
            "Le diagramme donne, en EFFECTIFS, le moyen de transport des élèves de deux lycées : un lycée urbain de $600$ élèves, un lycée rural de $200$ élèves (modèle).\na) Combien d'élèves du lycée rural viennent en bus ?\nb) Un élève affirme : « Le bus est plus utilisé au lycée urbain. » Est-ce vrai en effectif ? en proportion ?\nc) Quelle représentation aurait mieux permis de comparer les deux lycées ?",
          figure: barresCroisees(
            ["Urbain", "Rural"],
            [
              { nom: "Bus", valeurs: [300, 140] },
              { nom: "Vélo", valeurs: [180, 10] },
              { nom: "Voiture", valeurs: [120, 50] },
            ],
          ),
          correction:
            "a) Barre bleue du groupe « Rural » : $140$ élèves.\nb) En effectif, oui : $300 > 140$.\nEn proportion, non : urbain $\\dfrac{300}{600} = 0{,}5$, soit $50$ % ; rural $\\dfrac{140}{200} = 0{,}7$, soit $70$ %.\nAu lycée rural, le bus est proportionnellement le plus utilisé.\nc) Des barres empilées à $100$ % : urbain $50$ / $30$ / $20$ %, rural $70$ / $5$ / $25$ %.\n⚠️ Des barres en effectifs favorisent toujours le plus gros groupe.",
          schema: ecranSeulement(
            barresCroisees(
              ["Urbain", "Rural"],
              [
                { nom: "Bus", valeurs: [50, 70] },
                { nom: "Vélo", valeurs: [30, 5] },
                { nom: "Voiture", valeurs: [20, 25] },
              ],
              "empilees",
              " %",
            ),
          ),
          micros: ["info_rep_choisir", "info_rep_commenter", "info_rep_barres"],
        },
        {
          titre: "Le conseil municipal des jeunes",
          enonce:
            "Trois listes se partagent les $40$ sièges d'un conseil municipal des jeunes (modèle), représentés par ce diagramme semi-circulaire.\na) Calculer l'angle de chaque secteur.\nb) Une liste a-t-elle seule la majorité absolue (plus de la moitié des sièges) ?\nc) Quelles alliances de deux listes ont la majorité ?",
          figure: demiCercle([
            { label: "Verte", value: 18 },
            { label: "Bleue", value: 14 },
            { label: "Orange", value: 8 },
          ]),
          correction:
            "a) $180°$ pour $40$ sièges : $180 \\div 40 = 4{,}5°$ par siège.\nVerte : $18 \\times 4{,}5 = 81°$. Bleue : $14 \\times 4{,}5 = 63°$. Orange : $8 \\times 4{,}5 = 36°$.\n✔️ $81 + 63 + 36 = 180°$.\nb) La majorité absolue demande plus de $20$ sièges, soit au moins $21$. Aucune liste ne l'a : la plus grande en a $18$.\nc) Verte + Bleue $= 32$, Verte + Orange $= 26$, Bleue + Orange $= 22$ : les trois alliances ont la majorité.\n⭐ Même la plus petite liste peut faire basculer la majorité : c'est tout l'enjeu d'une coalition.",
          micros: ["info_rep_circulaire", "info_rep_commenter"],
        },
        {
          titre: "Les vélos électriques",
          enonce:
            "Un magasin a vendu des vélos électriques et classiques. Les ventes sont données en CENTAINES de vélos (modèle).\na) Combien de vélos le magasin a-t-il vendus en $2024$ ?\nb) Quelle part des ventes étaient des vélos électriques en $2022$ ? en $2024$ ?\nc) Commenter l'évolution.",
          figure: barresCroisees(
            ["2022", "2023", "2024"],
            [
              { nom: "Élec.", valeurs: [2, 4, 6] },
              { nom: "Classique", valeurs: [6, 5, 4] },
            ],
            "empilees",
          ),
          correction:
            "a) La barre de $2024$ : $6 + 4 = 10$ centaines, soit $1\\,000$ vélos.\nb) $2022$ : $\\dfrac{2}{8} = 0{,}25$, soit $25$ %. $2024$ : $\\dfrac{6}{10} = 0{,}6$, soit $60$ %.\nc) Les ventes totales augmentent : $800$, $900$, puis $1\\,000$ vélos.\nLes ventes d'électriques triplent ($200$ puis $600$), celles des classiques baissent ($600$ puis $400$).\nEn $2024$, plus de la moitié des vélos vendus sont électriques.\n⭐ Ces barres empilées ne sont PAS à $100$ % : leur hauteur montre aussi le total.",
          micros: ["info_rep_barres", "info_rep_commenter"],
        },
        {
          titre: "Le camembert impossible",
          enonce:
            "Dans une classe, $40$ % des élèves font du football, $35$ % de la natation et $50$ % du vélo. Un élève veut représenter ces données par un diagramme circulaire.\na) Additionner les trois pourcentages. Que remarque-t-on ?\nb) Pourquoi le diagramme circulaire est-il impossible ? Que choisir à la place ?",
          correction:
            "a) $40 + 35 + 50 = 125$ %. On dépasse $100$ %.\nb) Un élève peut pratiquer plusieurs sports : il est compté plusieurs fois. Les trois pourcentages ne sont pas les parts d'un même tout.\nOr un diagramme circulaire partage UN tout : ses parts font toujours $100$ %.\nOn choisit un diagramme en barres : une barre par sport, chacune lue séparément.\n⛔ Un diagramme circulaire exige des catégories qui ne se chevauchent pas, et qui font le tout.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Football", value: 40 },
              { label: "Natation", value: 35 },
              { label: "Vélo", value: 50 },
            ]),
          ),
          micros: ["info_rep_choisir"],
        },
        {
          titre: "Le temps passé dehors",
          enonce:
            "Le diagramme donne le temps passé dehors, dans la nature, chaque semaine, selon l'âge (modèle). Dire si chaque phrase est vraie, fausse, ou si on ne peut pas savoir.\na) La moitié des adolescents passent moins de $2$ h dehors par semaine.\nb) Il y a plus d'adultes que d'enfants qui passent plus de $5$ h dehors.\nc) En proportion, ce sont les enfants qui passent le plus de temps dehors.\nd) $80$ % des adultes passent au plus $5$ h dehors.",
          figure: barresCroisees(
            ["Enfants", "Ados", "Adultes"],
            [
              { nom: "< 2 h", valeurs: [20, 50, 40] },
              { nom: "2 à 5 h", valeurs: [40, 30, 40] },
              { nom: "> 5 h", valeurs: [40, 20, 20] },
            ],
            "empilees",
            " %",
          ),
          correction:
            "a) Vraie : le morceau « < 2 h » de la barre « Ados » vaut $50$ %.\nb) On ne peut pas savoir : on connaît des PARTS ($20$ % des adultes, $40$ % des enfants), pas le nombre d'enfants et d'adultes.\nc) Vraie : $40$ % des enfants passent plus de $5$ h dehors, contre $20$ % des ados et des adultes.\nd) Vraie : $40 + 40 = 80$ %, ou $100 - 20 = 80$ %.\n⚠️ Le b) est le piège : une barre à $100$ % ne dit jamais combien de personnes elle représente.",
          micros: ["info_rep_commenter"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Calculer les parts, choisir et construire la représentation, puis commenter avec des nombres.",
      rappel: [
        "On calcule d'abord les parts (en %) de chaque groupe.",
        "On choisit la représentation selon ce qu'on veut faire voir, puis on la construit.",
        "On commente avec des nombres, en distinguant les parts et les quantités.",
      ],
      exercices: [
        {
          titre: "Le mix électrique de deux pays",
          enonce:
            "Deux pays imaginaires produisent leur électricité ainsi (modèle).\nPays $A$ : $500$ TWh en tout, dont $100$ TWh renouvelables, $350$ TWh nucléaires, $50$ TWh fossiles.\nPays $B$ : $600$ TWh en tout, dont $240$ TWh renouvelables, $60$ TWh nucléaires, $300$ TWh fossiles.\na) Quelle représentation choisir pour comparer la RÉPARTITION de leur production ?\nb) Calculer les pourcentages, et construire cette représentation.\nc) Quel pays produit le plus d'électricité renouvelable, en TWh ? en part ?\nd) Quel pays dépend le plus des énergies fossiles ?",
          correction:
            "a) Deux barres empilées à $100$ % : les deux totaux sont différents, on compare des répartitions.\nb) Pays $A$ : $\\dfrac{100}{500} = 0{,}2$ ; $\\dfrac{350}{500} = 0{,}7$ ; $\\dfrac{50}{500} = 0{,}1$. Soit $20$ %, $70$ %, $10$ %.\nPays $B$ : $\\dfrac{240}{600} = 0{,}4$ ; $\\dfrac{60}{600} = 0{,}1$ ; $\\dfrac{300}{600} = 0{,}5$. Soit $40$ %, $10$ %, $50$ %.\nc) Le pays $B$, dans les deux sens : $240$ TWh contre $100$, et $40$ % contre $20$ %.\nd) Le pays $B$ : la moitié de son électricité ($50$ %, $300$ TWh) vient des fossiles, contre $10$ % pour $A$.\n⭐ Le pays $B$ est à la fois le plus « vert » et le plus « fossile » : c'est le nucléaire qui fait la différence.",
          schema: barresCroisees(
            ["Pays A", "Pays B"],
            [
              { nom: "Renouv.", valeurs: [20, 40] },
              { nom: "Nucléaire", valeurs: [70, 10] },
              { nom: "Fossiles", valeurs: [10, 50] },
            ],
            "empilees",
            " %",
          ),
          micros: ["info_rep_choisir", "info_rep_barres", "info_rep_commenter"],
        },
        {
          titre: "Le budget de deux familles",
          enonce:
            "Le diagramme circulaire donne, en %, la répartition du budget de la famille $1$, qui dispose de $2\\,000$ € par mois (modèle) : loyer (logement), repas (courses), trajets (transport), autres. La famille $2$ dispose de $4\\,000$ € : logement $800$ €, courses $600$ €, transport $400$ €, autres $2\\,200$ €.\na) Calculer l'angle de chaque secteur pour la famille $1$, et le montant en euros.\nb) Calculer la répartition en % du budget de la famille $2$.\nc) « La famille $2$ dépense plus pour se loger. » Vrai ou faux ?\nd) Quelle représentation choisir pour comparer les deux budgets ?",
          figure: diagramme("camembert", [
            // ⛔ Mesuré à 375 px : « Courses » touchait « Transport » : libellés courts.
            { label: "Loyer", value: 30 },
            { label: "Repas", value: 20 },
            { label: "Trajets", value: 15 },
            { label: "Autres", value: 35 },
          ]),
          correction:
            "a) $1$ % vaut $3{,}6°$. Logement $30 \\times 3{,}6 = 108°$ ; courses $72°$ ; transport $54°$ ; autres $126°$.\nMontants : $0{,}3 \\times 2\\,000 = 600$ € ; $400$ € ; $300$ € ; $700$ €.\nb) Logement $\\dfrac{800}{4\\,000} = 0{,}2$ ; courses $\\dfrac{600}{4\\,000} = 0{,}15$ ; transport $\\dfrac{400}{4\\,000} = 0{,}1$ ; autres $\\dfrac{2\\,200}{4\\,000} = 0{,}55$.\nSoit $20$ %, $15$ %, $10$ %, $55$ %.\nc) En euros, vrai : $800$ € contre $600$ €. En part du budget, faux : $20$ % contre $30$ %.\nd) Deux diagrammes circulaires, ou deux barres empilées à $100$ % : on compare des répartitions.\n⭐ « Dépenser plus » est ambigu : en euros, ou en part du budget ? Un bon commentaire le précise.",
          micros: ["info_rep_circulaire", "info_rep_choisir", "info_rep_commenter"],
        },
        {
          titre: "Le retour du castor",
          enonce:
            "Avant de réintroduire le castor dans une vallée, on a interrogé $300$ habitants de la ville et $200$ habitants de la campagne (modèle). Le diagramme donne les effectifs.\na) Combien d'habitants de la campagne sont contre ?\nb) Calculer la répartition des avis, en %, dans chaque groupe.\nc) « Les habitants de la campagne sont majoritairement contre. » Vrai ou faux ?\nd) Quelle représentation aurait mieux montré la différence d'avis ? La construire.",
          figure: barresCroisees(
            ["Ville", "Campagne"],
            [
              { nom: "Pour", valeurs: [180, 80] },
              { nom: "Contre", valeurs: [60, 100] },
              { nom: "Sans avis", valeurs: [60, 20] },
            ],
          ),
          correction:
            "a) Barre orange du groupe « Campagne » : $100$ habitants.\nb) Ville : $\\dfrac{180}{300} = 0{,}6$, $\\dfrac{60}{300} = 0{,}2$, $\\dfrac{60}{300} = 0{,}2$. Soit $60$ % pour, $20$ % contre, $20$ % sans avis.\nCampagne : $\\dfrac{80}{200} = 0{,}4$, $\\dfrac{100}{200} = 0{,}5$, $\\dfrac{20}{200} = 0{,}1$. Soit $40$ %, $50$ %, $10$ %.\nc) Faux : $50$ % est exactement la moitié. « Majoritairement » demanderait PLUS de la moitié.\nd) Des barres empilées à $100$ % : les deux groupes n'ont pas la même taille.\n⭐ À la campagne, les « contre » sont deux fois et demie plus fréquents qu'en ville ($50$ % contre $20$ %).",
          schema: ecranSeulement(
            barresCroisees(
              ["Ville", "Campagne"],
              [
                { nom: "Pour", valeurs: [60, 40] },
                { nom: "Contre", valeurs: [20, 50] },
                { nom: "Sans avis", valeurs: [20, 10] },
              ],
              "empilees",
              " %",
            ),
          ),
          micros: ["info_rep_barres", "info_rep_choisir", "info_rep_commenter"],
        },
        {
          titre: "L'hémicycle",
          enonce:
            "Une assemblée de $300$ sièges (modèle) compte quatre groupes : $A$ a $120$ sièges, $B$ en a $90$, $C$ $60$ et $D$ $30$.\na) Calculer la part de chaque groupe, puis l'angle de son secteur dans un diagramme semi-circulaire.\nb) Une loi est votée à la majorité absolue : au moins $151$ voix. Quelles alliances de DEUX groupes peuvent la voter ?\nc) Un journaliste écrit : « $A$ et $D$ ensemble ont la moitié des sièges, ils font voter ce qu'ils veulent. » Qu'en penser ?",
          correction:
            "a) $A$ : $\\dfrac{120}{300} = 0{,}4$, soit $40$ %, et $40 \\times 1{,}8 = 72°$.\n$B$ : $30$ %, soit $54°$. $C$ : $20$ %, soit $36°$. $D$ : $10$ %, soit $18°$.\n✔️ $72 + 54 + 36 + 18 = 180°$.\nb) $A + B = 210$ et $A + C = 180$ : ces deux alliances ont la majorité.\n$A + D = 150$ et $B + C = 150$ : c'est la moitié, pas la majorité. $B + D = 120$ et $C + D = 90$ : non plus.\nc) Il a tort : $150$ voix sur $300$, c'est exactement la moitié. La majorité absolue demande au moins $151$ voix.\n⭐ Sur un hémicycle, la majorité se voit : il faut dépasser la verticale du milieu, à $90°$.",
          schema: ecranSeulement(
            demiCercle([
              { label: "Groupe A", value: 120 },
              { label: "Groupe B", value: 90 },
              { label: "Groupe C", value: 60 },
              { label: "Groupe D", value: 30 },
            ]),
          ),
          micros: ["info_rep_circulaire", "info_rep_commenter"],
        },
      ],
    },
  ],
};
