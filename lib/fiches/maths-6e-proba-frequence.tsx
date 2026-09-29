// ─── Fiche de cours : la fréquence observée (6e) ──────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/probabilites.bank.ts, notionId proba_frequence).
//
// Micro-compétences 3/3 — mapping micro → blocs :
//   proba_frequence_calculer → définition + figure, propriétés 1 et 2, formule,
//                              méthode 1, usage 1, exemple 1, entraînement 1 et 2,
//                              diapos 1, 3, 4
//   proba_frequence_comparer → propriétés 2 et 3, méthode 2, usage 2, exemple 1,
//                              entraînement 3 et 4, diapos 5 et 8
//   proba_frequence_repeter  → propriété 4, méthode 3, usages 2 et 3,
//                              exemples 2 et 3, entraînement 5 et 6,
//                              diapos 6, 9, 10
//
// ⭐ LES MICROS ET LES ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Les nombres viennent
// de la banque : 20 lancers de deux pièces, 6 « deux piles » → 0,3 ; la
// probabilité 1/4 (PP, PF, FP, FF) ; 5 attendus ; 60 lancers de dé → environ
// 10 six ; « 1,4 » impossible ; la pièce lancée 10, 50, 500, 5 000 fois
// (0,60 · 0,44 · 0,52 · 0,492) ; cinq piles de suite ; 0,30 sur 20 ou sur
// 2 000 lancers ; 3 six sur 6 contre 300 sur 600. Gabarits : un dé 50 fois
// (8 six), la roue à 5 secteurs (25 tours, 30 tours), deux pièces 40 fois,
// probabilité 0,5 avec 0,6 sur 10 essais et 0,508 sur 1 000.
// ⛔ La fiche voisine `maths-6e-probabilites.tsx` pose le vocabulaire (issue,
// certain, impossible, l'échelle de 0 à 1) : ici, on LANCE et on compte.
//
// ⭐⭐ LE DESSIN DE « L'ÉCART SE RÉDUIT » EST UN SVG LOCAL, ET C'EST VOULU.
// Les quatre séries de la banque vont de 10 à 5 000 lancers : sur un axe
// régulier, les trois premières s'écraseraient contre l'origine. Et
// `fonctionGraphique` n'écrit que des graduations ENTIÈRES (0,5 n'y a pas
// d'étiquette). Aucun canvas ne sait donc montrer une fréquence qui se
// resserre autour de 0,5 : les quatre séries sont posées à pas réguliers,
// étiquetées par leur nombre de lancers, et l'écart à 0,5 est tracé en rouge.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

type Face = 1 | 2 | 3 | 4 | 5 | 6;

const ROUGE = "#dc2626";
const BLEU = "#2563eb";
const VERT = "#16a34a";
const VIOLET = "#7c3aed";
const OR = "#f59e0b";
const GRIS = "#94a3b8";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Le dessin local : la fréquence qui se resserre autour de 0,5 ─────────────
//
// ⛔ CADRE 220 × 190, POLICES 13 ET 14 — MESURÉ. Le SVG ne reçoit qu'environ
// 200 px dans le bloc de 226 d'un téléphone : une première version en 240 de
// large et en 12 px y tombait à 10,0 px. Ici, 13 × 200/220 = 11,8 px.
// Échelle verticale : 0,3 → y = 160 et 0,7 → y = 20, soit 350 unités par 1.
// Étiquettes des points placées une à une, au-dessus ou au-dessous, pour ne
// toucher ni la courbe, ni les écarts rouges, ni la ligne de 0,5.
const yFreq = (f: number) => 160 - (f - 0.3) * 350;
const SERIES = [
  { x: 64, f: 0.6, lancers: "10", valeur: "0,60", dessus: true },
  { x: 108, f: 0.44, lancers: "50", valeur: "0,44", dessus: false },
  { x: 152, f: 0.52, lancers: "500", valeur: "0,52", dessus: true },
  { x: 194, f: 0.492, lancers: "5 000", valeur: "0,492", dessus: false },
];

const courbeFrequence = (
  <div className="mx-auto w-full max-w-[340px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
    <svg
      viewBox="0 0 220 190"
      className="block h-auto w-full"
      role="img"
      aria-label="Fréquence de pile après 10, 50, 500 et 5 000 lancers : elle se rapproche de 0,5"
    >
      <text x={42} y={14} fontSize="13" fontWeight="800" fill="#334155">
        fréquence de pile
      </text>
      {/* axes */}
      <line x1={38} y1={20} x2={38} y2={164} stroke="#0f172a" strokeWidth={2} />
      <line x1={38} y1={164} x2={214} y2={164} stroke="#0f172a" strokeWidth={2} />
      {/* graduations 0,4 · 0,5 · 0,6 */}
      {[0.4, 0.5, 0.6].map((g) => (
        <g key={g}>
          <line x1={33} y1={yFreq(g)} x2={38} y2={yFreq(g)} stroke="#0f172a" strokeWidth={2} />
          <text
            x={31}
            y={yFreq(g)}
            textAnchor="end"
            dominantBaseline="central"
            fontSize="13"
            fontWeight={g === 0.5 ? 900 : 600}
            fill={g === 0.5 ? VIOLET : "#334155"}
          >
            {String(g).replace(".", ",")}
          </text>
        </g>
      ))}
      {/* la probabilité : 0,5 */}
      <line x1={38} y1={yFreq(0.5)} x2={214} y2={yFreq(0.5)} stroke={VIOLET} strokeWidth={2} strokeDasharray="6 5" />
      {/* les écarts, en rouge */}
      {SERIES.map((s) => (
        <line key={`e-${s.x}`} x1={s.x} y1={yFreq(s.f)} x2={s.x} y2={yFreq(0.5)} stroke={ROUGE} strokeWidth={3} />
      ))}
      {/* la courbe */}
      <polyline
        points={SERIES.map((s) => `${s.x},${yFreq(s.f)}`).join(" ")}
        fill="none"
        stroke={BLEU}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {SERIES.map((s) => (
        <g key={`p-${s.x}`}>
          <circle cx={s.x} cy={yFreq(s.f)} r={5} fill={BLEU} stroke="white" strokeWidth={1.5} />
          <text
            x={s.x}
            y={s.dessus ? yFreq(s.f) - 10 : yFreq(s.f) + 20}
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill={BLEU}
            stroke="white"
            strokeWidth={3}
            paintOrder="stroke"
          >
            {s.valeur}
          </text>
          <text x={s.x} y={182} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">
            {s.lancers}
          </text>
        </g>
      ))}
    </svg>
  </div>
);
const courbe = legende(courbeFrequence, "En bas, le nombre de lancers. L'écart rouge fond.");

// ─── Les canvas ───────────────────────────────────────────────────────────────

// LA FIGURE : 20 lancers notés d'un bâton, puis comptés.
const tableauLancers = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "20 lancers de deux pièces",
      headers: ["Résultat", "Bâtons", "Effectif"],
      rows: [
        { values: ["deux piles", "||||| |", 6] },
        { values: ["autre chose", "||||| ||||| ||||", 14] },
      ],
      highlight: { cell: { row: 0, col: 2 } },
      caption: "6 + 14 = 20 lancers",
    }}
  />
);

// ENTRE 0 ET 1. Un seul point : 0,3. Le dessin voisin de la fiche des
// probabilités pose « jamais / toujours » aux deux bouts : ici, c'est la
// fréquence d'une vraie série qu'on range sur la droite.
const droiteFrequence = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 1,
      step: 0.5,
      points: [{ value: 0.3, label: "6 sur 20", color: VERT }],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 250, height: 90 },
    }}
  />,
  "0 : jamais sorti · 1 : sorti à chaque fois"
);

// LA PROBABILITÉ SE CALCULE AVANT : les 4 issues de deux pièces (tableau de
// la banque). Une seule donne « deux piles ».
const tableauIssues = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "tableau",
      tableau: {
        entetes: ["Pièce 1", "Pièce 2", "Deux piles ?"],
        lignes: [
          ["Pile", "Pile", "oui"],
          ["Pile", "Face", "non"],
          ["Face", "Pile", "non"],
          ["Face", "Face", "non"],
        ],
        casesSurlignees: [[0, 2]],
      },
    }}
  />,
  "1 issue sur 4 : la probabilité vaut 0,25"
);

// ATTENDU 5, OBTENU 6 : deux barres presque égales.
const barresAttendu = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "« Deux piles » sur 20 lancers",
      data: [
        { label: "attendu", value: 5, color: "#ddd6fe" },
        { label: "obtenu", value: 6, color: "#bfdbfe" },
      ],
      display: { showValues: true, showLabels: true },
      size: { width: 210, height: 180 },
    }}
  />
);

// LA FORMULE, EN IMAGE : 6 cases coloriées sur 20.
const fractionSixVingt = (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "bar",
      fraction: { numerator: 6, denominator: 20, label: "6 sur 20 = 0,3", color: VERT },
      size: { width: 240, height: 150 },
    }}
  />
);

// COMPTER, PUIS DIVISER : les 20 lancers, bout à bout.
const barreLancers = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "20 lancers",
      total: "20",
      parts: [
        { label: "deux piles", value: "6", color: "#bbf7d0" },
        { label: "autre chose", value: "14", color: "#e2e8f0" },
      ],
      questionLabel: "6 ÷ 20 = 0,3",
      size: { width: 212, height: 190 },
    }}
  />
);

// PRÉVOIR : le 6 est une face sur six.
const deSix = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "de",
      de: { faces: [1, 2, 3, 4, 5, 6] as Face[], surligne: [6] as Face[] },
    }}
  />,
  "1 face sur 6 : environ 10 six sur 60 lancers"
);

// L'ÉCART FOND. Les écarts à 0,5 de la banque (0,10 · 0,06 · 0,02 · 0,008),
// en barres. ⚠️ `showValues: false` : le canvas écrirait « 0.1 » avec un point.
const barresEcarts = legende(
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Écart à 0,5",
      data: [
        { label: "10", value: 0.1, color: "#fecaca" },
        { label: "50", value: 0.06, color: "#fecaca" },
        { label: "500", value: 0.02, color: "#fecaca" },
        { label: "5 000", value: 0.008, color: "#fecaca" },
      ],
      display: { showValues: false, showLabels: true },
      size: { width: 210, height: 180 },
    }}
  />,
  "En bas, le nombre de lancers : l'écart fond."
);

// UNE ROUE À 5 SECTEURS PAREILS, DONT UN BLEU.
const roueCinq = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "roue",
      roue: {
        segments: [
          { label: "", poids: 1, couleur: BLEU },
          { label: "", poids: 1, couleur: "#fca5a5" },
          { label: "", poids: 1, couleur: "#86efac" },
          { label: "", poids: 1, couleur: "#fde68a" },
          { label: "", poids: 1, couleur: "#d8b4fe" },
        ],
      },
      size: { width: 230, height: 190 },
    }}
  />,
  "1 secteur bleu sur 5 : probabilité 0,2"
);

// LE DÉ SUSPECT : même fréquence 0,5, mais pas le même nombre de lancers.
const tableauDeTruque = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Lancers", "6 attendus", "6 obtenus"],
      rows: [
        { values: ["6", "1", "3"] },
        { values: ["600", "100", "300"] },
      ],
      highlight: { row: 1 },
      questionLabel: "300 au lieu de 100 : suspect !",
    }}
  />
);

// TOUTE LA CLASSE : tes 20 lancers ne sont qu'un morceau des 600.
const barreClasse = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "Toute la classe",
      total: "600",
      parts: [
        { label: "toi", value: "20", color: "#fde68a" },
        { label: "les 29 autres", value: "580", color: "#bfdbfe" },
      ],
      questionLabel: "20 + 580 = 600 lancers",
      size: { width: 212, height: 190 },
    }}
  />
);

// DEUX PIÈCES, DEUX PILES.
const deuxPiles = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "billes",
      billes: { elements: [{ couleur: OR, label: "P" }, { couleur: OR, label: "P" }] },
    }}
  />,
  "« deux piles » : P et P"
);

// CINQ PILES DE SUITE, ET LE SIXIÈME LANCER.
const cinqPiles = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "billes",
      billes: {
        elements: [
          { couleur: OR, label: "P" },
          { couleur: OR, label: "P" },
          { couleur: OR, label: "P" },
          { couleur: OR, label: "P" },
          { couleur: OR, label: "P" },
          { couleur: GRIS, label: "?" },
        ],
      },
    }}
  />,
  "5 piles… et le 6e lancer ? Toujours 1 chance sur 2"
);

// MÊME FRÉQUENCE, PAS LE MÊME POIDS. ⚠️ Une FONCTION : la diapo « À toi de
// jouer » la veut sans la ligne surlignée, qui donnerait la réponse.
const tableauSeriesAvec = (avecReponse: boolean) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Série", "Lancers", "Fréquence"],
      rows: [
        { values: ["A", "20", "0,30"] },
        { values: ["B", "2 000", "0,30"] },
      ],
      highlight: avecReponse ? { row: 1 } : undefined,
    }}
  />
);
const tableauSeries = tableauSeriesAvec(true);

// L'HISTOIRE, EN TABLEAU : Buffon puis Pearson se rapprochent de 0,5.
const tableauHistoire = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Des savants qui ont lancé des pièces",
      headers: ["Savant", "Lancers", "Fréquence"],
      rows: [
        { values: ["Buffon", "4 040", "0,507"] },
        { values: ["Pearson", "24 000", "0,5005"] },
      ],
      highlight: { col: 2 },
    }}
  />
);

// ─── Les textes courts partagés avec le mode classe ───────────────────────────

const pieges = [
  "Croire que 20 lancers donnent pile le résultat calculé. On attendait 5, on a eu 6 : c'est normal.",
  "Croire que la pièce doit « rattraper ». Après 5 piles, face a toujours 1 chance sur 2.",
  "Trouver une fréquence plus grande que 1. C'est toujours une erreur de calcul.",
];

const aRetenir = [
  "Fréquence = nombre de fois obtenu ÷ nombre d'essais. Elle est entre 0 et 1.",
  "La probabilité se calcule avant de lancer ; la fréquence se compte après.",
  "Plus on répète, plus la fréquence se rapproche de la probabilité.",
];

export const ficheProbaFrequence6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "proba-frequence",
  titre: "La fréquence : lancer pour de vrai",
  accroche:
    "Un dé a 1 chance sur 6 de donner un 6. Mais que se passe-t-il quand on le lance pour de vrai ?",
  identite: [
    { label: "Le mot clé", valeur: "La fréquence observée" },
    { label: "Le calcul", valeur: "Nombre de fois obtenu ÷ nombre d'essais" },
    { label: "La grande idée", valeur: "Plus on lance, plus on se rapproche de la probabilité" },
  ],
  definition: {
    texte:
      "On répète une expérience et on compte ce qui sort. La fréquence observée d'un résultat, c'est le nombre de fois où il est sorti, divisé par le nombre d'essais. Elle est toujours entre 0 et 1.",
  },
  figure: {
    schema: tableauLancers,
    legende: "On note chaque lancer d'un bâton, puis on compte.",
  },
  proprietes: [
    {
      titre: "Toujours entre 0 et 1",
      micros: ["proba_frequence_calculer"],
      texte:
        "Un résultat ne peut pas sortir plus souvent qu'on n'a lancé. Une fréquence de 1,4 est donc une erreur de calcul.",
      schema: droiteFrequence,
    },
    {
      titre: "Avant ou après ?",
      micros: ["proba_frequence_calculer", "proba_frequence_comparer"],
      texte:
        "La probabilité se calcule avant de lancer. La fréquence se compte après, et elle change d'une série à l'autre.",
      schema: tableauIssues,
    },
    {
      titre: "Un petit écart est normal",
      micros: ["proba_frequence_comparer"],
      texte:
        "Sur 20 lancers, on attend environ 5 « deux piles ». En obtenir 6, c'est normal : c'est le hasard.",
      schema: barresAttendu,
    },
    {
      titre: "Répéter réduit l'écart",
      micros: ["proba_frequence_repeter"],
      texte:
        "Plus on lance, plus la fréquence se rapproche de la probabilité. Elle ne tombe presque jamais pile dessus.",
      schema: courbe,
    },
  ],
  reel: {
    texte:
      "Au basket, on compte les tirs réussis sur les tirs tentés : c'est une fréquence. Un fabricant de jouets en teste des centaines, pas trois. Un chercheur compte les oiseaux qui reviennent au nid chaque printemps. Plus on a de résultats, plus on peut leur faire confiance.",
  },
  historique: {
    texte:
      "Vers 1750, le savant français Buffon lance une pièce 4 040 fois. Il obtient 2 048 fois le même côté : une fréquence de 0,507. Plus tard, l'Anglais Karl Pearson la lance 24 000 fois. Il trouve 0,5005 : encore plus près de 0,5 !",
  },
  formule: {
    contexte: "La fréquence observée",
    expression: "fréquence = nombre de fois obtenu ÷ nombre d'essais   ·   $\\dfrac{6}{20} = 0{,}3$",
    legende: "On peut aussi l'écrire en pourcentage : 0,3, c'est 30 %.",
    schema: fractionSixVingt,
  },
  methode: [
    {
      titre: "Compter, puis diviser",
      micros: ["proba_frequence_calculer"],
      texte:
        "On compte combien de fois le résultat est sorti, et combien de fois on a lancé. Puis on divise : 6 ÷ 20 = 0,3.",
      schema: barreLancers,
    },
    {
      titre: "Prévoir ce qu'on attend",
      micros: ["proba_frequence_comparer"],
      texte:
        "Un 6 a 1 chance sur 6. Sur 60 lancers, on attend environ 60 ÷ 6 = 10 six, pas exactement 10.",
      schema: deSix,
    },
    {
      titre: "Regarder le nombre d'essais",
      micros: ["proba_frequence_repeter"],
      texte:
        "Une série courte peut beaucoup s'écarter. Une longue série s'écarte très peu : on lui fait plus confiance.",
      schema: barresEcarts,
    },
  ],
  usages: [
    {
      titre: "Décrire une série",
      micros: ["proba_frequence_calculer"],
      detail:
        "On fait tourner 25 fois une roue à 5 secteurs pareils. Le bleu sort 6 fois : 6 ÷ 25 = 0,24, proche de 0,2.",
      schema: roueCinq,
    },
    {
      titre: "Repérer un dé truqué",
      micros: ["proba_frequence_comparer", "proba_frequence_repeter"],
      detail:
        "3 six sur 6 lancers : le hasard suffit. 300 six sur 600 lancers, au lieu de 100 : là, le dé est suspect.",
      schema: tableauDeTruque,
    },
    {
      titre: "Mettre en commun",
      micros: ["proba_frequence_repeter"],
      detail:
        "Seul, on lance 20 fois. Toute la classe réunie fait 600 lancers : la fréquence est bien plus fiable.",
      schema: barreClasse,
    },
  ],
  exemples: [
    {
      titre: "Deux piles sur 20 lancers",
      micros: ["proba_frequence_calculer", "proba_frequence_comparer"],
      donnees: "Une classe lance 20 fois deux pièces. Elle obtient « deux piles » 6 fois.",
      question: "Quelle est la fréquence observée ? Faut-il s'inquiéter ?",
      schema: deuxPiles,
      solution:
        "La fréquence est 6 ÷ 20 = 0,3. La probabilité vaut 0,25 : on attendait 20 ÷ 4 = 5 fois. On a eu 6 au lieu de 5. Sur 20 lancers, cet écart est normal : rien d'inquiétant.",
    },
    {
      titre: "Cinq piles de suite",
      micros: ["proba_frequence_repeter"],
      donnees: "Une pièce bien équilibrée tombe 5 fois de suite sur pile.",
      question: "Quelle est la chance d'avoir face au lancer suivant ?",
      schema: cinqPiles,
      solution:
        "La pièce n'a pas de mémoire. Chaque lancer est un nouveau départ. Face a toujours 1 chance sur 2, soit 0,5. Face n'est pas « due ».",
    },
    {
      titre: "20 ou 2 000 lancers ?",
      micros: ["proba_frequence_repeter", "proba_frequence_comparer"],
      donnees:
        "Deux séries donnent la même fréquence de « deux piles » : 0,30. La série A a 20 lancers, la série B en a 2 000.",
      question: "Laquelle renseigne le mieux sur la vraie probabilité ?",
      schema: tableauSeries,
      solution:
        "La série B. Sur 20 lancers, un ou deux résultats de plus changent tout. Sur 2 000, le hasard a beaucoup moins de prise. Plus la série est longue, plus on peut lui faire confiance.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "On lance un dé 50 fois. On obtient un 6 huit fois. Quelle est la fréquence observée du 6 ?",
      correction: "On divise le nombre de fois obtenu par le nombre de lancers : 8 ÷ 50 = 0,16, soit 16 %.",
      micros: ["proba_frequence_calculer"],
    },
    {
      question: "Une fréquence observée peut-elle valoir 1,4 ?",
      correction:
        "Non. Un résultat ne peut pas sortir plus souvent qu'on n'a lancé. Une fréquence est toujours entre 0 et 1.",
      micros: ["proba_frequence_calculer"],
    },
    {
      question: "On lance deux pièces 40 fois. À combien de « deux piles » peut-on s'attendre, à peu près ?",
      correction:
        "« Deux piles » a 1 chance sur 4. 40 ÷ 4 = 10. On attend environ 10 « deux piles », sans doute pas exactement 10.",
      micros: ["proba_frequence_comparer"],
    },
    {
      question: "Une roue a 5 secteurs pareils, dont un vert. On la fait tourner 30 fois. Combien de fois le vert, à peu près ?",
      correction: "Le vert a 1 chance sur 5. 30 ÷ 5 = 6. On attend environ 6 fois le vert.",
      micros: ["proba_frequence_comparer"],
    },
    {
      question:
        "La probabilité d'un résultat vaut 0,5. Sur 10 essais, on observe 0,6. Sur 1 000 essais, 0,508. Quelle série s'écarte le moins ?",
      correction:
        "Sur 10 essais, l'écart vaut 0,6 − 0,5 = 0,1. Sur 1 000 essais, il vaut 0,508 − 0,5 = 0,008. La longue série est bien plus proche de 0,5.",
      micros: ["proba_frequence_repeter"],
    },
    {
      question: "Un dé donne 3 fois le 6 sur 6 lancers. Est-il truqué ?",
      correction:
        "On ne peut pas le dire. Sur 6 lancers, le hasard suffit à l'expliquer. Il faudrait lancer beaucoup plus de fois.",
      micros: ["proba_frequence_repeter"],
    },
  ],
  tiMargo: {
    objectif: "On lance, on compte, on divise !",
    definition: "La probabilité ne bouge pas. La fréquence, si !",
    methode: "Plus on lance, plus on s'approche !",
    pieges: "La pièce n'a pas de mémoire !",
    exercice: "Pas truqué : c'est juste le hasard !",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : le mode classe n'a pas de rendu KaTeX.
export const slidesProbaFrequence6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fréquence - 6e",
    teinte: "objectif",
    schema: avecMargo(deuxPiles, "On lance, on compte, on divise !", "joie"),
    section: {
      type: "objectif",
      phrase: "Lancer pour de vrai, et compter ce qui sort",
      sousPhrase: "Puis on compare avec ce qu'on avait calculé avant de lancer.",
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: tableauHistoire,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Au basket, on compte les tirs réussis sur les tirs tentés : c'est une fréquence.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Buffon a lancé une pièce 4 040 fois : 2 048 fois le même côté. Presque la moitié !",
      },
    },
  },
  {
    titre: "La définition",
    badge: "À connaître",
    teinte: "definition",
    schema: fractionSixVingt,
    section: {
      type: "objectif",
      phrase: "Fréquence = nombre de fois obtenu ÷ nombre d'essais",
      sousPhrase: "6 « deux piles » sur 20 lancers : 6 ÷ 20 = 0,3.",
    },
  },
  {
    titre: "Avant ou après ?",
    badge: "Deux nombres différents",
    teinte: "propriete",
    schema: avecMargo(tableauIssues, "La probabilité ne bouge pas. La fréquence, si !"),
    section: {
      type: "cartes",
      cartes: [
        { titre: "La probabilité", texte: "Se calcule AVANT de lancer : 1 issue sur 4 donne « deux piles »." },
        { titre: "La fréquence", texte: "Se compte APRÈS avoir lancé. Elle change d'une série à l'autre." },
      ],
    },
  },
  {
    titre: "Un écart est normal",
    badge: "Comparer",
    teinte: "propriete",
    schema: avecMargo(barresAttendu, "Pas truqué : c'est juste le hasard !"),
    section: {
      type: "objectif",
      phrase: "On attendait 5, on a eu 6 : c'est normal",
      sousPhrase: "Sur 20 lancers, le hasard fait bouger le résultat.",
    },
  },
  {
    titre: "La grande idée",
    badge: "Répéter",
    teinte: "propriete",
    schema: avecMargo(courbe, "Plus on lance, plus on s'approche !", "joie"),
    section: {
      type: "objectif",
      phrase: "Plus on lance, plus la fréquence se rapproche de 0,5",
      sousPhrase: "L'écart fond : 0,10, puis 0,06, puis 0,02, puis 0,008.",
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    teinte: "methode",
    schema: barresEcarts,
    section: {
      type: "etapes",
      etapes: [
        "Compter : combien de fois, sur combien d'essais.",
        "Diviser : on trouve un nombre entre 0 et 1.",
        "Comparer à ce qu'on attendait, sans exiger l'égalité.",
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le 6 du dé",
    teinte: "exemple",
    schema: deSix,
    section: {
      type: "exemple",
      enonce: "On lance 60 fois un dé.",
      question: "Combien de 6 peut-on attendre, à peu près ?",
      correction: "Un 6 a 1 chance sur 6. 60 ÷ 6 = 10. On attend environ 10 six, pas exactement 10.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(cinqPiles, "La pièce n'a pas de mémoire !", "attention"),
    section: {
      type: "cartes",
      cartes: [
        { titre: "Exiger le calcul", texte: "On attendait 5, on a eu 6 : ce n'est pas une erreur." },
        { titre: "Le rattrapage", texte: "Après 5 piles, face a toujours 1 chance sur 2." },
        { titre: "Plus que 1", texte: "Une fréquence plus grande que 1 : erreur de calcul !" },
      ],
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: tableauSeriesAvec(false),
    section: {
      type: "exercice",
      enonce: "Deux séries donnent 0,30 : l'une sur 20 lancers, l'autre sur 2 000 lancers.",
      question: "Laquelle croire le plus ?",
      indice: "Sur laquelle le hasard a-t-il le moins de prise ?",
      correction: "Celle de 2 000 lancers : plus il y a d'essais, plus la fréquence est fiable.",
    },
  },
];
